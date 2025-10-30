import { Application, Color, Label, StackLayout, Trace, Utils } from '@nativescript/core';
import { AndroidMarker } from './Marker.android';
import { CLog, CLogTypes } from '../common';
import { createInfoWindowView } from './Marker.common';

/**
 * MarkerManager (Native Android Mapbox SDK version)
 */
export class MarkerManager {
    private static readonly MARKER_PADDING_PX = 10;
    private mapView: com.mapbox.maps.MapView;
    private map: com.mapbox.maps.MapboxMap;
    private pointAnnotationManager: com.mapbox.maps.plugin.annotation.generated.PointAnnotationManager;
    private markerList: AndroidMarker[] = [];
    private static readonly LAYER_ID = 'annotation-layer';
    private static readonly ADDITIONAL_EDGE_PADDING_PX = 20.0;

    private selectedMarker: AndroidMarker;
    private onInfoWindowTapped;
    private _reusableCalloutView: StackLayout;
    private _reusableCalloutNativeView: android.widget.FrameLayout;

    private onMapClickListener: com.mapbox.maps.plugin.gestures.OnMapClickListener;
    private onPointClickListener: com.mapbox.maps.plugin.annotation.generated.OnPointAnnotationClickListener;
    onViewAnnotationUpdatedListener: com.mapbox.maps.viewannotation.OnViewAnnotationUpdatedListener;

    constructor(map: com.mapbox.maps.MapboxMap, mapView: com.mapbox.maps.MapView, onMarkerClick, onInfoWindowClick) {
        this.map = map;
        this.mapView = mapView;
        this.onInfoWindowTapped = onInfoWindowClick;
        const AnnotationConfig = com.mapbox.maps.plugin.annotation.AnnotationConfig;
        const layerConfig = new AnnotationConfig(MarkerManager.LAYER_ID);
        const annotationPlugin = mapView.getPlugin('MAPBOX_ANNOTATION_PLUGIN_ID') as com.mapbox.maps.plugin.annotation.AnnotationPlugin;
        this.pointAnnotationManager = annotationPlugin.createAnnotationManager(
            com.mapbox.maps.plugin.annotation.AnnotationType.PointAnnotation,
            layerConfig
        ) as com.mapbox.maps.plugin.annotation.generated.PointAnnotationManager;

        // add click listeners
        this.onPointClickListener = new com.mapbox.maps.plugin.annotation.generated.OnPointAnnotationClickListener({
            onAnnotationClick: (annotation) => {
                const index = this.markerList.findIndex((m) => m.pointAnnotation === annotation);

                if (Trace.isEnabled()) {
                    CLog(
                        CLogTypes.info,
                        'MarkerManager.onAnnotationClick():',
                        annotation,
                        index,
                        this.markerList.map((m) => m.id)
                    );
                }
                if (index !== -1) {
                    const marker = this.markerList[index];
                    if (Trace.isEnabled()) {
                        CLog(CLogTypes.info, 'MarkerManager.onAnnotationClick(): found', annotation);
                    }
                    if (onMarkerClick(marker)) {
                        return true;
                    }
                    this.selectMarker(marker, true);
                }
                return true;
            }
        });
        this.pointAnnotationManager.addClickListener(this.onPointClickListener);
        // Map click listener to deselect all markers
        this.onMapClickListener = new com.mapbox.maps.plugin.gestures.OnMapClickListener({
            onMapClick: (point) => {
                if (Trace.isEnabled()) {
                    CLog(CLogTypes.log, 'MarkerManager onMapClick: ', !!this.selectedMarker);
                }
                return this.deselectMarker(this.selectedMarker);
            }
        });
        com.mapbox.maps.plugin.gestures.GesturesUtils.addOnMapClickListener(map, this.onMapClickListener);
    }

    deselectAll() {
        this.deselectMarker(this.selectedMarker);
        // this.markerList.forEach((marker: AndroidMarker) => this.deselectMarker(marker));
    }

    adjustViewAnnotationXOffset(marker: AndroidMarker) {
        const listener = new com.mapbox.maps.viewannotation.OnViewAnnotationUpdatedListener({
            onViewAnnotationPositionUpdated: (view, leftTopCoordinate, width) => {
                if (view === marker.viewAnnotation) {
                    this.updateOffsetX(marker, leftTopCoordinate, width);
                }
                com.nativescript.mapbox.ViewAnnotationManager.removeOnViewAnnotationUpdatedListener(this.mapView, listener);
            },
            onViewAnnotationVisibilityUpdated(view: globalAndroid.view.View, visible: boolean) {},
            onViewAnnotationAnchorCoordinateUpdated(param0: globalAndroid.view.View, param1: com.mapbox.geojson.Point) {},
            onViewAnnotationAnchorUpdated(param0: globalAndroid.view.View, param1: com.mapbox.maps.ViewAnnotationAnchorConfig) {}
        });

        com.nativescript.mapbox.ViewAnnotationManager.addOnViewAnnotationUpdatedListener(this.mapView, listener);
    }
    updateMarker(marker: AndroidMarker) {
        // this.adjustViewAnnotationXOffset(marker);
        marker.update(this.pointAnnotationManager);
        if (marker.viewAnnotation) {
            com.nativescript.mapbox.ViewAnnotationManager.updateViewAnnotation(
                this.mapView,
                marker.viewAnnotation,
                new com.mapbox.maps.ViewAnnotationOptions.Builder().annotatedFeature(com.mapbox.maps.AnnotatedFeature.valueOf(marker.pointAnnotation.getGeometry())).build()
            );
        }
    }
    addMarker(marker: AndroidMarker) {
        if (Trace.isEnabled()) {
            CLog(CLogTypes.log, 'MarkerManager addMarker: ', marker, !!this.selectedMarker);
        }
        if (!marker.pointAnnotation || this.markerList.findIndex((m) => m.pointAnnotation === marker.pointAnnotation) === -1) {
            marker.prepareAnnotationMarker(this.pointAnnotationManager, MarkerManager.LAYER_ID);
            this.deselectMarker(this.selectedMarker);
            this.markerList.push(marker);
            // this.selectMarker(marker);
        }
        return marker;
    }

    /**
     * Build a NativeScript view to use as info window.
     * Then attach it to Mapbox via ViewAnnotationManager.
     */
    prepareViewAnnotation(marker: AndroidMarker, onInfoWindowClick) {
        // --- Step 1: Create a NativeScript view tree
        if (Trace.isEnabled()) {
            CLog(CLogTypes.info, 'MarkerManager:prepareViewAnnotation():', this._reusableCalloutView);
        }
        if (this._reusableCalloutView) {
            const title = this._reusableCalloutView.getViewById<Label>('title');
            title.text = marker?.title || '';
            const subtitle = this._reusableCalloutView.getViewById<Label>('subtitle');
            subtitle.text = marker?.snippet;
            subtitle.visibility = marker?.snippet ? 'visible' : 'collapse';
        } else {
            this._reusableCalloutView = createInfoWindowView(marker.title, marker.snippet);
            this._reusableCalloutView._setupAsRootView(Utils.android.getApplicationContext());
            this._reusableCalloutView.parent = Application.getRootView();
            this._reusableCalloutView._isAddedToNativeVisualTree = true;
            this._reusableCalloutView.callLoaded();
        }
        if (!this._reusableCalloutNativeView) {
            const nativeView = this._reusableCalloutView.nativeViewProtected as android.view.View;
            const frameLayout = new android.widget.FrameLayout(this._reusableCalloutView._context);
            const layoutParams = new android.widget.FrameLayout.LayoutParams(android.view.ViewGroup.LayoutParams.WRAP_CONTENT, android.view.ViewGroup.LayoutParams.WRAP_CONTENT);
            frameLayout.addView(nativeView);
            frameLayout.setLayoutParams(layoutParams);
            frameLayout.measure(
                android.view.View.MeasureSpec.makeMeasureSpec(0, android.view.View.MeasureSpec.UNSPECIFIED),
                android.view.View.MeasureSpec.makeMeasureSpec(0, android.view.View.MeasureSpec.UNSPECIFIED)
            );
            frameLayout.layout(0, 0, this._reusableCalloutView.getMeasuredWidth(), this._reusableCalloutView.getMeasuredHeight());
            this._reusableCalloutNativeView = frameLayout;
        }

        if (this._reusableCalloutNativeView.getParent()) {
            if (Trace.isEnabled()) {
                CLog(CLogTypes.info, 'MarkerManager:prepareViewAnnotation(): remove from parent', this._reusableCalloutNativeView.getParent());
            }
            (this._reusableCalloutNativeView.getParent() as android.view.ViewGroup).removeView(this._reusableCalloutNativeView);
        }

        this._reusableCalloutView.removeEventListener('tap');
        this._reusableCalloutView.on('tap', onInfoWindowClick);

        // frameLayout.setLayoutParams(new android.widget.FrameLayout.LayoutParams(nativeView.getMeasuredWidth(), nativeView.getMeasuredHeight()));
        // --- Step 3: Prepare view annotation options

        const ViewAnnotationAnchor = com.mapbox.maps.ViewAnnotationAnchor;
        const ViewAnnotationAnchorConfigBuilder = com.mapbox.maps.ViewAnnotationAnchorConfig.Builder;
        const offsetY = (marker.pointAnnotation.getIconImageBitmap()?.getHeight() ?? 0) + MarkerManager.MARKER_PADDING_PX;
        const anchor = new ViewAnnotationAnchorConfigBuilder().anchor(ViewAnnotationAnchor.BOTTOM).offsetY(offsetY).build();
        // marker.anchor = anchor;
        const viewAnnotationOptions = new com.mapbox.maps.ViewAnnotationOptions.Builder()
            .visible(java.lang.Boolean.valueOf(true))
            // .allowOverlap(java.lang.Boolean.valueOf(true))
            // .width(java.lang.Double.valueOf(frameLayout.getMeasuredWidth()))
            // .height(java.lang.Double.valueOf(frameLayout.getMeasuredHeight()))
            .allowOverlapWithPuck(java.lang.Boolean.valueOf(true))
            .ignoreCameraPadding(java.lang.Boolean.valueOf(true))
            // .priority(java.lang.Long.valueOf(0))
            .selected(java.lang.Boolean.valueOf(true))
            .annotatedFeature(com.mapbox.maps.AnnotatedFeature.valueOf(marker.pointAnnotation.getGeometry()))
            // TODO: variableAnchors is broken for now
            .variableAnchors(
                java.util.Arrays.asList([
                    anchor
                    // new ViewAnnotationAnchorConfigBuilder().anchor(ViewAnnotationAnchor.BOTTOM_RIGHT).offsetY(offsetY).build(),
                    // new ViewAnnotationAnchorConfigBuilder().anchor(ViewAnnotationAnchor.BOTTOM_LEFT).offsetY(offsetY).build()
                ])
            )
            .build();
        // --- Step 4: Add the view to Mapbox’s ViewAnnotationManager
        com.nativescript.mapbox.ViewAnnotationManager.addViewAnnotation(this.mapView, this._reusableCalloutNativeView, viewAnnotationOptions);

        // --- Step 5: Store references
        marker.viewAnnotation = this._reusableCalloutNativeView;
        marker.view = this._reusableCalloutView;
    }

    removeMarker(marker: AndroidMarker) {
        if (Trace.isEnabled()) {
            CLog(CLogTypes.info, '_removeMarkers: ', marker.id, marker.pointAnnotation);
        }
        if (!marker.pointAnnotation) return;
        const index = this.markerList.findIndex((m) => m.pointAnnotation === marker.pointAnnotation);
        if (index !== -1) {
            this.markerList.splice(index, 1);
        }
        if (marker.viewAnnotation) {
            com.nativescript.mapbox.ViewAnnotationManager.removeViewAnnotation(this.mapView, marker.viewAnnotation);
            marker.viewAnnotation = null;
        }
        this.pointAnnotationManager.delete(marker.pointAnnotation);
        marker.destroy();
    }

    selectMarker(marker: AndroidMarker, deselectIfSelected: boolean = false, update = false) {
        if (this.isSelected(marker) && !update) {
            if (deselectIfSelected) this.deselectMarker(marker);
            return;
        }

        if (this.selectedMarker && !this.isSelected(marker)) {
            this.deselectMarker(this.selectedMarker);
        }
        this.selectedMarker = marker;

        this.prepareViewAnnotation(marker, (e) => {
            // info Window tapped.
            if (!this.onInfoWindowTapped(marker)) {
                this.deselectMarker(marker);
            }
        });
    }

    deselectMarker(marker: AndroidMarker) {
        if (!this.selectedMarker || marker.pointAnnotation !== this.selectedMarker.pointAnnotation) {
            return false;
        }
        if (Trace.isEnabled()) {
            CLog(CLogTypes.log, 'MarkerManager deselectMarker: ', marker, !!this.selectedMarker);
        }
        this.selectedMarker = null;
        // const View = android.view.View;
        // const viewAnnotationOptionsBuilder = new com.mapbox.maps.ViewAnnotationOptions.Builder().selected(java.lang.Boolean.valueOf(false)).visible(java.lang.Boolean.valueOf(false));

        // if (marker.anchor) {
        //     const anchorBuilder = marker.anchor.toBuilder().offsetX(0.0).build();
        //     viewAnnotationOptionsBuilder.variableAnchors(java.util.Collections.singletonList(anchorBuilder));
        // }
        if (marker.viewAnnotation) {
            com.nativescript.mapbox.ViewAnnotationManager.removeViewAnnotation(this.mapView, marker.viewAnnotation);
            marker.viewAnnotation = null;
        }

        // com.nativescript.mapbox.ViewAnnotationManager.updateViewAnnotation(this.mapView, marker.viewAnnotation, viewAnnotationOptionsBuilder.build());

        // marker.viewAnnotation.setVisibility(View.INVISIBLE);
        return true;
    }

    destroy() {
        this.markerList.forEach((m: AndroidMarker) => this.removeMarker(m));
        this.pointAnnotationManager.removeClickListener(this.onPointClickListener);
        this.onPointClickListener = null;
        const gesturePlugin = this.mapView.getPlugin('MAPBOX_GESTURES_PLUGIN_ID') as com.mapbox.maps.plugin.gestures.GesturesPlugin;

        com.mapbox.maps.plugin.gestures.GesturesUtils.removeOnMapClickListener(this.map, this.onMapClickListener);
        this.onMapClickListener = null;

        if (this.onViewAnnotationUpdatedListener) {
            com.nativescript.mapbox.ViewAnnotationManager.removeOnViewAnnotationUpdatedListener(this.mapView, this.onViewAnnotationUpdatedListener);
            this.onViewAnnotationUpdatedListener = null;
        }

        if (this._reusableCalloutView) {
            this._reusableCalloutView._tearDownUI();
            this._reusableCalloutView = null;
        }
        this.map = null;
        this.mapView = null;
    }

    updateOffsetX(marker: AndroidMarker, leftTop: any, width: number) {
        return;
        // if (marker.preventNextUpdateOffsetX) {
        //     marker.preventNextUpdateOffsetX = false;
        //     return;
        // }
        // const mapSize = this.mapView.getMapboxMap().getSize();
        // let resultOffsetX = 0.0;

        // if (leftTop.getX() < 0 && leftTop.getX() + width > 0) {
        //     resultOffsetX = Math.abs(leftTop.getX()) + MarkerManager.ADDITIONAL_EDGE_PADDING_PX;
        // } else if (leftTop.getX() + width > mapSize.getWidth() && leftTop.getX() < width) {
        //     resultOffsetX = mapSize.getWidth() - leftTop.getX() - width - MarkerManager.ADDITIONAL_EDGE_PADDING_PX;
        // }

        // const anchor = marker.anchor ? marker.anchor.toBuilder().offsetX(resultOffsetX).build() : null;

        // if (anchor) {
        //     const options = new com.mapbox.maps.ViewAnnotationOptions.Builder().variableAnchors(java.util.Collections.singletonList(anchor)).build();
        //     // marker.preventNextUpdateOffsetX = true;
        //     com.nativescript.mapbox.ViewAnnotationManager.updateViewAnnotation(this.mapView, marker.viewAnnotation, options);
        // }
    }

    isSelected(marker: AndroidMarker): boolean {
        return this.selectedMarker?.pointAnnotation === marker.pointAnnotation;
    }
}
