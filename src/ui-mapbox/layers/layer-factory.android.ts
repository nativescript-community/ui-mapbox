import { LayerCommon, LayerType } from '../common';
import { ExpressionParser } from '../expression/expression-parser';
import { PropertyParser } from './parser/property-parser';
import { toCamelCase, transformValue } from './parser/property-parser.android';

type ILayer =
    | com.mapbox.maps.extension.style.layers.generated.FillLayer
    | com.mapbox.maps.extension.style.layers.generated.LineLayer
    | com.mapbox.maps.extension.style.layers.generated.SymbolLayer
    | com.mapbox.maps.extension.style.layers.generated.CircleLayer
    | com.mapbox.maps.extension.style.layers.generated.HeatmapLayer
    | com.mapbox.maps.extension.style.layers.generated.FillExtrusionLayer
    | com.mapbox.maps.extension.style.layers.generated.RasterLayer
    | com.mapbox.maps.extension.style.layers.generated.HillshadeLayer;

export class Layer implements LayerCommon {
    public id: string;
    private instance: ILayer;

    constructor(instance: ILayer) {
        this.instance = instance;
        this.id = instance.getSourceId();
    }

    public visibility(): boolean {
        return this.instance.getVisibility().getValue() === 'visible' ? true : false;
    }

    public show(): void {
        LayerFactory.applyLayerProperties(this.instance, {
            visibility: 'visible'
        });
        // this.instance.setProperties([new com.mapbox.maps.extension.style.layers.generated.PropertyValue('visibility', 'visible')]);
    }

    public hide(): void {
        LayerFactory.applyLayerProperties(this.instance, {
            visibility: 'none'
        });
        // this.instance.setProperties([new com.mapbox.maps.extension.style.layers.generated.PropertyValue('visibility', 'none')]);
    }

    public getNativeInstance() {
        return this.instance;
    }

    public setFilter(filter: any[]) {
        if (this.instance['setFilter']) {
            this.instance['setFilter'](ExpressionParser.parseJson(filter));
        }
    }

    public getFilter(): any[] {
        if (this.instance['getFilter']) {
            return ExpressionParser.toJson(this.instance['getFilter']());
        }
        return [];
    }

    public setProperty(name: string, value: any) {
        LayerFactory.applyLayerProperties(this.instance, {
            [name]: value
        });
    }

    public getProperty(name: string): any {
        return PropertyParser.propertyValueFromLayer(this.instance, name);
    }

    public type(): LayerType {
        if (this.instance instanceof com.mapbox.maps.extension.style.layers.generated.FillLayer) {
            return 'fill';
        }
        if (this.instance instanceof com.mapbox.maps.extension.style.layers.generated.LineLayer) {
            return 'line';
        }
        if (this.instance instanceof com.mapbox.maps.extension.style.layers.generated.SymbolLayer) {
            return 'symbol';
        }
        if (this.instance instanceof com.mapbox.maps.extension.style.layers.generated.CircleLayer) {
            return 'circle';
        }
        if (this.instance instanceof com.mapbox.maps.extension.style.layers.generated.HeatmapLayer) {
            return 'heatmap';
        }
        if (this.instance instanceof com.mapbox.maps.extension.style.layers.generated.FillExtrusionLayer) {
            return 'fill-extrusion';
        }
        if (this.instance instanceof com.mapbox.maps.extension.style.layers.generated.RasterLayer) {
            return 'raster';
        }
        if (this.instance instanceof com.mapbox.maps.extension.style.layers.generated.HillshadeLayer) {
            return 'hillshade';
        }
        // if (this.instance instanceof com.mapbox.maps.extension.style.layers.generated.BackgroundLayer) {
        //     return 'background';
        // }

        // there is no sky layer in the Android Mapbox SDK

        return null;
    }
}

export class LayerFactory {
    static applyLayerProperties(layer: com.mapbox.maps.extension.style.layers.Layer, properties: Record<string, any>) {
        for (const key in properties) {
            if (!properties.hasOwnProperty(key)) continue;

            const value = properties[key];
            const actualKey = toCamelCase(key);
            const nValue = transformValue(actualKey, value);

            // Mapbox v11 setters are named after the property, e.g., circleColor(), circleRadius()
            const setterName = actualKey;

            // Call the setter dynamically
            if (typeof layer[setterName] === 'function') {
                layer[setterName](nValue);
            } else {
                console.warn(`Layer has no setter for ${setterName}`);
            }
        }
    }
    static async createLayer(style, source: com.mapbox.maps.extension.style.sources.Source): Promise<LayerCommon> {
        // const layerProperties = this.parseProperties(style.type, Object.assign(style.paint || {}, style.layout || {})); // TODO: handle defaults
        const layerProperties = Object.assign(style.paint || {}, style.layout || {}); // TODO: handle defaults
        const sourceId = source.getSourceId();
        let nativeLayer: com.mapbox.maps.extension.style.layers.Layer;

        switch (style.type) {
            case 'line':
                nativeLayer = new com.mapbox.maps.extension.style.layers.generated.LineLayer(style.id, sourceId);
                break;
            case 'circle':
                nativeLayer = new com.mapbox.maps.extension.style.layers.generated.CircleLayer(style.id, sourceId);
                break;
            case 'fill':
                nativeLayer = new com.mapbox.maps.extension.style.layers.generated.FillLayer(style.id, sourceId);
                break;
            case 'symbol':
                nativeLayer = new com.mapbox.maps.extension.style.layers.generated.SymbolLayer(style.id, sourceId);
                break;
            case 'raster':
                nativeLayer = new com.mapbox.maps.extension.style.layers.generated.RasterLayer(style.id, sourceId);
                break;
            default:
                throw new Error(`Unknown layer type: ${style.type}`);
        }
        LayerFactory.applyLayerProperties(nativeLayer, layerProperties);

        const layer = new Layer(nativeLayer as ILayer);

        if (style.minzoom !== undefined) {
            nativeLayer.minZoom(style.minzoom);
        }
        if (style.maxzoom !== undefined) {
            nativeLayer.maxZoom(style.maxzoom);
        }
        // if (style['source-layer'] && (nativeLayer as any).withSourceLayer) {
        //     (nativeLayer as any).withSourceLayer(style['source-layer']);
        // }
        return layer;
    }

    // private static parseProperties(layerType, propertiesObject) {
    //     return PropertyParser.parsePropertiesForLayer(propertiesObject);
    // }
}
