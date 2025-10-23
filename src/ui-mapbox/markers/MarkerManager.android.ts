import { Trace } from '@nativescript/core';
import { AndroidMarker } from './Marker.android';
import { CLog, CLogTypes } from '../common';

/**
 * MarkerManager (Native Android Mapbox SDK version)
 */
export class MarkerManager {
    private mapView: com.mapbox.maps.MapView;
    private map: com.mapbox.maps.MapboxMap;
    private pointAnnotationManager: com.mapbox.maps.plugin.annotation.generated.PointAnnotationManager;
    private markerList = new Set<AndroidMarker>();
    private static readonly LAYER_ID = 'annotation-layer';
    private static readonly ADDITIONAL_EDGE_PADDING_PX = 20.0;

    private selectedMarker: AndroidMarker;
    private onInfoWindowTapped;

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
                for (const marker of this.markerList) {
                    if (marker.pointAnnotation === annotation) {
                        if (onMarkerClick(marker)) {
                            return true;
                        }
                        this.selectMarker(marker, true);
                    }
                }
                return true;
            }
        });
        this.pointAnnotationManager.addClickListener(this.onPointClickListener);
        // Map click listener to deselect all markers
        this.onMapClickListener = new com.mapbox.maps.plugin.gestures.OnMapClickListener({
            onMapClick: (point) => {
                if (this.selectedMarker) {
                    this.deselectMarker(this.selectedMarker);
                    return true;
                }
                return false;
            }
        });
        com.mapbox.maps.plugin.gestures.GesturesUtils.addOnMapClickListener(map, this.onMapClickListener);
    }

    deselectAll() {
        this.markerList.forEach((marker: AndroidMarker) => this.deselectMarker(marker));
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
        this.adjustViewAnnotationXOffset(marker);
        marker.update(this.pointAnnotationManager);
        com.nativescript.mapbox.ViewAnnotationManager.updateViewAnnotation(
            this.mapView,
            marker.viewAnnotation,
            new com.mapbox.maps.ViewAnnotationOptions.Builder().annotatedFeature(com.mapbox.maps.AnnotatedFeature.valueOf(marker.pointAnnotation.getGeometry())).build()
        );
    }
    addMarker(marker: AndroidMarker) {
        if (Trace.isEnabled()) {
            CLog(CLogTypes.log, 'MarkerManager addMarker: ' + JSON.stringify(marker));
        }
        marker.prepareAnnotationMarker(this.pointAnnotationManager, MarkerManager.LAYER_ID);
        marker.prepareViewAnnotation(this.mapView, (e) => {
            // info Window tapped.
            if (!this.onInfoWindowTapped(marker)) {
                this.deselectMarker(marker);
            }
        });
        this.markerList.add(marker);
        // this.selectMarker(marker);
        return marker;
    }

    removeMarker(marker: AndroidMarker) {
        if (!marker.prepared) return;

        this.markerList.delete(marker);
        com.nativescript.mapbox.ViewAnnotationManager.removeViewAnnotation(this.mapView, marker.viewAnnotation);
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
        this.adjustViewAnnotationXOffset(marker);
        com.nativescript.mapbox.ViewAnnotationManager.updateViewAnnotation(
            this.mapView,
            marker.viewAnnotation,
            new com.mapbox.maps.ViewAnnotationOptions.Builder().visible(java.lang.Boolean.valueOf(true)).selected(java.lang.Boolean.valueOf(true)).build()
        );

        marker.viewAnnotation.setVisibility(android.view.View.VISIBLE);
    }

    deselectMarker(marker: AndroidMarker) {
        if (!this.selectedMarker || marker.pointAnnotation !== this.selectedMarker.pointAnnotation) {
            return;
        }
        this.selectedMarker = null;
        const View = android.view.View;
        const viewAnnotationOptionsBuilder = new com.mapbox.maps.ViewAnnotationOptions.Builder().selected(java.lang.Boolean.valueOf(false)).visible(java.lang.Boolean.valueOf(false));

        if (marker.anchor) {
            const anchorBuilder = marker.anchor.toBuilder().offsetX(0.0).build();
            viewAnnotationOptionsBuilder.variableAnchors(java.util.Collections.singletonList(anchorBuilder));
        }

        com.nativescript.mapbox.ViewAnnotationManager.updateViewAnnotation(this.mapView, marker.viewAnnotation, viewAnnotationOptionsBuilder.build());

        marker.viewAnnotation.setVisibility(View.INVISIBLE);
    }

    destroy() {
        this.markerList.forEach((m: AndroidMarker) => this.removeMarker(m));
        this.pointAnnotationManager.removeClickListener(this.onPointClickListener);
        this.onPointClickListener = null;
        const gesturePlugin = this.mapView.getPlugin('MAPBOX_GESTURES_PLUGIN_ID') as com.mapbox.maps.plugin.gestures.GesturesPlugin;

        com.mapbox.maps.plugin.gestures.GesturesUtils.removeOnMapClickListener(this.map, this.onMapClickListener);
        this.onMapClickListener = null;

        com.nativescript.mapbox.ViewAnnotationManager.removeOnViewAnnotationUpdatedListener(this.mapView, this.onViewAnnotationUpdatedListener);
        this.onViewAnnotationUpdatedListener = null;
        this.map = null;
        this.mapView = null;
    }

    updateOffsetX(marker: AndroidMarker, leftTop: any, width: number) {
        // if (marker.preventNextUpdateOffsetX) {
        //     marker.preventNextUpdateOffsetX = false;
        //     return;
        // }
        const mapSize = this.mapView.getMapboxMap().getSize();
        let resultOffsetX = 0.0;

        if (leftTop.getX() < 0 && leftTop.getX() + width > 0) {
            resultOffsetX = Math.abs(leftTop.getX()) + MarkerManager.ADDITIONAL_EDGE_PADDING_PX;
        } else if (leftTop.getX() + width > mapSize.getWidth() && leftTop.getX() < width) {
            resultOffsetX = mapSize.getWidth() - leftTop.getX() - width - MarkerManager.ADDITIONAL_EDGE_PADDING_PX;
        }

        const anchor = marker.anchor ? marker.anchor.toBuilder().offsetX(resultOffsetX).build() : null;

        if (anchor) {
            const options = new com.mapbox.maps.ViewAnnotationOptions.Builder().variableAnchors(java.util.Collections.singletonList(anchor)).build();
            // marker.preventNextUpdateOffsetX = true;
            com.nativescript.mapbox.ViewAnnotationManager.updateViewAnnotation(this.mapView, marker.viewAnnotation, options);
        }
    }

    isSelected(marker: AndroidMarker): boolean {
        return this.selectedMarker?.pointAnnotation === marker.pointAnnotation;
    }
}
