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
    id?: string | number;

    pointAnnotation: com.mapbox.maps.plugin.annotation.generated.PointAnnotation;
    viewAnnotation: android.view.View;
    view: StackLayout;
    anchor: com.mapbox.maps.ViewAnnotationAnchorConfig;
    layerId: string;

    constructor(opts: { id: string | number; position: com.mapbox.geojson.Point; icon: android.graphics.Bitmap; title?: string; snippet?: string }) {
        if (!opts.title && !opts.snippet) {
            throw new Error('Marker should have either title or snippet!');
        }

        this.position = opts.position;
        this.id = opts.id;
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
            CLog(CLogTypes.log, 'MarkerManager prepareAnnotationMarker: ' + layerId, this.id, this.pointAnnotation);
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
            const title = this.view.getViewById<Label>('title');
            title.text = this?.title || '';
            const subtitle = this.view.getViewById<Label>('subtitle');
            subtitle.text = this?.snippet;
            subtitle.visibility = this?.snippet ? 'visible' : 'collapse';
        }
    }

    destroy() {
        this.view = null;
        this.viewAnnotation = null;
        this.icon = null;
    }
}
