import { LayerCommon } from '../common';
import { ExpressionParser } from '../expression/expression-parser';
import { PropertyParser } from './parser/property-parser';

export class Layer implements LayerCommon {
    public id: string;
    private instance: any;

    constructor(instance: any) {
        this.instance = instance;
        this.id = instance.getId();
    }

    public visibility(): boolean {
        return this.instance.getVisibility().getValue() === 'visible' ? true : false;
    }

    public show(): void {
        this.instance.setProperties([new com.mapbox.mapboxsdk.style.layers.PropertyValue('visibility', 'visible')]);
    }

    public hide(): void {
        this.instance.setProperties([new com.mapbox.mapboxsdk.style.layers.PropertyValue('visibility', 'none')]);
    }

    public getNativeInstance() {
        return this.instance;
    }

    public setFilter(filter: any[]) {
        this.instance.setFilter(ExpressionParser.parseJson(filter));
    }

    public getFilter(): any[] {
        return ExpressionParser.toJson(this.instance.getFilter());
    }

    public setProperty(name: string, value: any) {
        const properties = PropertyParser.parsePropertiesForLayer({ [name]: value });
        this.instance.setProperties(properties);
    }

    public getProperty(name: string): any {
        return PropertyParser.propertyValueFromLayer(this.instance, name);
    }
}

export class LayerFactory {
    static async createLayer(style, source): Promise<LayerCommon> {
        const layerProperties = this.parseProperties(style.type, Object.assign(style.paint || {}, style.layout || {})); // TODO: handle defaults

        const sourceId = source.getId();
        let nativeLayer: com.mapbox.mapboxsdk.style.layers.Layer;

        switch (style.type) {
            case 'line':
                nativeLayer = new com.mapbox.mapboxsdk.style.layers.LineLayer(style.id, sourceId).withProperties(layerProperties);

                break;
            case 'circle':
                nativeLayer = new com.mapbox.mapboxsdk.style.layers.CircleLayer(style.id, sourceId).withProperties(layerProperties);
                break;
            case 'fill':
                nativeLayer = new com.mapbox.mapboxsdk.style.layers.FillLayer(style.id, sourceId).withProperties(layerProperties);
                break;
            case 'symbol':
                nativeLayer = new com.mapbox.mapboxsdk.style.layers.SymbolLayer(style.id, sourceId).withProperties(layerProperties);
                break;
            case 'raster':
                nativeLayer = new com.mapbox.mapboxsdk.style.layers.RasterLayer(style.id, sourceId).withProperties(layerProperties);
                break;
            default:
                throw new Error(`Unknown layer type: ${style.type}`);
        }

        const layer = new Layer(nativeLayer);

        if (style.minzoom !== undefined) {
            nativeLayer.setMinZoom(style.minzoom);
        }
        if (style.maxzoom !== undefined) {
            nativeLayer.setMaxZoom(style.maxzoom);
        }
        if (style['source-layer'] && (nativeLayer as any).withSourceLayer) {
            (nativeLayer as any).withSourceLayer(style['source-layer']);
        }
        return layer;
    }

    private static parseProperties(layerType, propertiesObject) {
        return PropertyParser.parsePropertiesForLayer(propertiesObject);
    }
}
