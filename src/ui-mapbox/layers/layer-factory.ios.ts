// src/ui-mapbox/layer-factory.ios.ts
// TypeScript shim that exports LayerFactory (TS API) while delegating to native NativeLayerFactory when available.
// This preserves the TS export name 'LayerFactory' as requested.

import { Trace } from '@nativescript/core';
import { CLog, CLogTypes, LayerCommon, LayerType } from '../common';

export class Layer implements LayerCommon {
    constructor(
        public mapboxView: MapView,
        public id: string
    ) {}

    visibility(): boolean {
        return true;
    }

    show(): void {
        NativeLayerFactory.setLayerVisibility(this.mapboxView, this.id, true);
    }

    hide(): void {
        NativeLayerFactory.setLayerVisibility(this.mapboxView, this.id, false);
    }

    getNativeInstance(): any {
        return null;
    }

    setFilter(filter: any[]): void {
        // Not implemented here - recommend using addLayer with JSON via Mapbox.addLayer
    }

    getFilter(): any[] {
        return null;
    }

    setProperty(name: string, value: any): void {
        NativeLayerFactory.setLayerProperty(this.mapboxView, this.id, name, value);
    }

    getProperty(name: string): any {
        return NativeLayerFactory.getLayerProperty(this.mapboxView, this.id, name);
    }
    type(): LayerType {
        return NativeLayerFactory.getLayerType(this.mapboxView, this.id) as LayerType;
    }
}

// Export a TS LayerFactory that matches the old TS API but delegates to NativeLayerFactory
export class LayerFactory {
    static async createLayer(mapboxView: MapView, style: any, belowLayerId: string): Promise<LayerCommon> {
        const styleJson = typeof style === 'string' ? style : JSON.stringify(style);
        if (Trace.isEnabled()) {
            CLog(CLogTypes.info, 'createLayer:', belowLayerId, JSON.stringify(style));
        }
        const id = style.id || 'layer_' + Date.now();
        if (NativeLayerFactory.createLayer(mapboxView, id, styleJson, belowLayerId)) {
            return new Layer(mapboxView, id);
        } else {
            throw new Error('failed to create layer');
        }
    }

    static applyLayerProperties(mapboxView: MapView, layer: any, properties: Record<string, any>) {
        try {
            // NativeLayerFactory.applyLayerProperties(layer.id, properties);
            // if ((global as any).NativeLayerFactory && (global as any).NativeLayerFactory.setLayerProperty) {
            for (const k of Object.keys(properties)) {
                NativeLayerFactory.setLayerProperty(mapboxView, layer.id, k, properties[k]);
            }
            // }
        } catch (e) {}
    }
}
