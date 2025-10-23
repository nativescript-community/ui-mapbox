import { Application, Color, Label, StackLayout, Trace, Utils } from '@nativescript/core';
import { CLog, CLogTypes } from '../common';

/**
 * Hybrid Marker — uses native Mapbox annotation APIs, but NativeScript view for info window.
 */
export class AndroidMarker {
    position: com.mapbox.geojson.Point;
    icon: android.graphics.Bitmap;
    title?: string;
    snippet?: string;

    preventNextUpdateOffsetX?: boolean;

    pointAnnotation: com.mapbox.maps.plugin.annotation.generated.PointAnnotation;
    viewAnnotation: android.view.View;
    view: StackLayout;
    anchor: com.mapbox.maps.ViewAnnotationAnchorConfig;
    layerId: string;
    prepared = false;

    private static readonly MARKER_PADDING_PX = 10;

    constructor(opts: { position: com.mapbox.geojson.Point; icon: android.graphics.Bitmap; title?: string; snippet?: string }) {
        if (!opts.title && !opts.snippet) {
            throw new Error('Marker should have either title or snippet!');
        }

        this.position = opts.position;
        this.icon = opts.icon;
        this.title = opts.title;
        this.snippet = opts.snippet;
    }

    /**
     * Create the native PointAnnotation
     */
    prepareAnnotationMarker(pointAnnotationManager: com.mapbox.maps.plugin.annotation.generated.PointAnnotationManager, layerId: string) {
        const IconAnchor = com.mapbox.maps.extension.style.layers.properties.generated.IconAnchor;
        const PointAnnotationOptions = com.mapbox.maps.plugin.annotation.generated.PointAnnotationOptions;

        this.pointAnnotation = pointAnnotationManager.create(
            new PointAnnotationOptions().withPoint(this.position).withIconAnchor(IconAnchor.valueOf('BOTTOM')).withIconImage(this.icon)
        ) as com.mapbox.maps.plugin.annotation.generated.PointAnnotation;
        this.layerId = layerId;
        if (Trace.isEnabled()) {
            CLog(CLogTypes.log, 'MarkerManager prepareAnnotationMarker: ' + layerId);
        }
    }

    update(pointAnnotationManager: com.mapbox.maps.plugin.annotation.generated.PointAnnotationManager) {
        if (!this.pointAnnotation) {
            return;
        }
        // const PointAnnotationOptions = com.mapbox.maps.plugin.annotation.generated.PointAnnotationOptions;
        // const IconAnchor = com.mapbox.maps.extension.style.layers.properties.generated.IconAnchor;
        this.pointAnnotation.setGeometry(this.position);
        // this.pointAnnotation.setIconAnchor(IconAnchor.BOTTOM);
        this.pointAnnotation.setIconImageBitmap(this.icon);
        // 2. Update the annotation via the manager
        pointAnnotationManager.update(this.pointAnnotation);
        if (this.view) {
            this.view.getViewById<Label>('title').text = this.title;
            this.view.getViewById<Label>('snippet').text = this.snippet;
        }
    }

    /**
     * Build a NativeScript view to use as info window.
     * Then attach it to Mapbox via ViewAnnotationManager.
     */
    prepareViewAnnotation(mapView: com.mapbox.maps.MapView, onInfoWindowClick) {
        // --- Step 1: Create a NativeScript view tree
        const view = new StackLayout();
        view.className = 'info-window';
        view.padding = AndroidMarker.MARKER_PADDING_PX;
        view.backgroundColor = '#FFFFFF';
        view.width = 'auto'; // WRAP_CONTENT
        view.height = 'auto'; // WRAP_CONTENT
        view.borderRadius = 12;
        view['shadowColor'] = '#000';
        view['shadowOpacity'] = 0.25;
        view['shadowRadius'] = 8;

        if (this.title) {
            const titleLabel = new Label();
            titleLabel.id = 'title';
            titleLabel.text = this.title;
            titleLabel.className = 'info-window-title';
            titleLabel.fontSize = 16;
            titleLabel.fontWeight = 'bold';
            view.addChild(titleLabel);
        }

        if (this.snippet) {
            const snippetLabel = new Label();
            snippetLabel.id = 'snippet';
            snippetLabel.text = this.snippet;
            snippetLabel.className = 'info-window-snippet';
            snippetLabel.fontSize = 14;
            snippetLabel.color = new Color('#555');
            view.addChild(snippetLabel);
        }

        view._setupAsRootView(Utils.android.getApplicationContext());
        view.parent = Application.getRootView();
        view._isAddedToNativeVisualTree = true;
        view.callLoaded();
        const nativeView = view.nativeViewProtected as android.view.View;

        view.on('tap', onInfoWindowClick);

        const frameLayout = new android.widget.FrameLayout(view._context);
        const layoutParams = new android.widget.FrameLayout.LayoutParams(android.view.ViewGroup.LayoutParams.WRAP_CONTENT, android.view.ViewGroup.LayoutParams.WRAP_CONTENT);
        frameLayout.addView(nativeView);
        frameLayout.setLayoutParams(layoutParams);
        frameLayout.measure(
            android.view.View.MeasureSpec.makeMeasureSpec(0, android.view.View.MeasureSpec.UNSPECIFIED),
            android.view.View.MeasureSpec.makeMeasureSpec(0, android.view.View.MeasureSpec.UNSPECIFIED)
        );
        frameLayout.layout(0, 0, nativeView.getMeasuredWidth(), nativeView.getMeasuredHeight());
        // frameLayout.setLayoutParams(new android.widget.FrameLayout.LayoutParams(nativeView.getMeasuredWidth(), nativeView.getMeasuredHeight()));
        // --- Step 3: Prepare view annotation options

        const ViewAnnotationAnchor = com.mapbox.maps.ViewAnnotationAnchor;
        const anchor = new com.mapbox.maps.ViewAnnotationAnchorConfig.Builder()
            .anchor(ViewAnnotationAnchor.BOTTOM)
            .offsetY((this.pointAnnotation.getIconImageBitmap()?.getHeight() ?? 0) + AndroidMarker.MARKER_PADDING_PX)
            .build();
        this.anchor = anchor;
        const viewAnnotationOptions = new com.mapbox.maps.ViewAnnotationOptions.Builder()
            .visible(java.lang.Boolean.valueOf(true))
            // .allowOverlap(java.lang.Boolean.valueOf(true))
            // .width(java.lang.Double.valueOf(frameLayout.getMeasuredWidth()))
            // .height(java.lang.Double.valueOf(frameLayout.getMeasuredHeight()))
            .allowOverlapWithPuck(java.lang.Boolean.valueOf(true))
            .ignoreCameraPadding(java.lang.Boolean.valueOf(true))
            // .priority(java.lang.Long.valueOf(0))
            .selected(java.lang.Boolean.valueOf(true))
            .annotatedFeature(com.mapbox.maps.AnnotatedFeature.valueOf(this.pointAnnotation.getGeometry()))
            .variableAnchors(java.util.Arrays.asList([anchor]))
            .build();
        // --- Step 4: Add the view to Mapbox’s ViewAnnotationManager
        com.nativescript.mapbox.ViewAnnotationManager.addViewAnnotation(mapView, frameLayout, viewAnnotationOptions);

        // --- Step 5: Store references
        this.viewAnnotation = frameLayout;
        this.view = view;
        this.prepared = true;
    }

    destroy() {
        if (this.view) {
            this.view._tearDownUI();
            this.view = null;
        }
        this.viewAnnotation = null;
        this.icon = null;
    }
}
