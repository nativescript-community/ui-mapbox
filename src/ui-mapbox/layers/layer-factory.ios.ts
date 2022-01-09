import { LayerCommon } from '../common';
import { FilterParser } from '../filter/filter-parser';
import { PropertyParser } from './parser/property-parser';

export class LayerFactory {
    static async createLayer(style, source): Promise<LayerCommon> {
        let nativeLayer: MGLStyleLayer;
        switch (style.type) {
            case 'line':
                nativeLayer = MGLLineStyleLayer.alloc().initWithIdentifierSource(style.id, source);
                break;
            case 'circle':
                nativeLayer = MGLCircleStyleLayer.alloc().initWithIdentifierSource(style.id, source);
                break;
            case 'fill':
                nativeLayer = MGLFillStyleLayer.alloc().initWithIdentifierSource(style.id, source);
                break;
            case 'symbol':
                nativeLayer = MGLSymbolStyleLayer.alloc().initWithIdentifierSource(style.id, source);
                break;
            case 'raster':
                nativeLayer = MGLRasterStyleLayer.alloc().initWithIdentifierSource(style.id, source);
                break;
            default:
                throw new Error(`Unknown layer type: ${style.type}`);
        }
        if (style.minzoom !== undefined) {
            nativeLayer.minimumZoomLevel = style.minzoom;
        }
        if (style.maxzoom !== undefined) {
            nativeLayer.maximumZoomLevel = style.maxzoom;
        }
        if (style['source-layer']) {
            (nativeLayer as any).sourceLayerIdentifier = style['source-layer'];
        }
        const layerProperties = this.parseProperties(style.type, Object.assign(style.paint || {}, style.layout || {})); // TODO: handle defaults

        for (const propKey in layerProperties) {
            if (Object.prototype.hasOwnProperty.call(layerProperties, propKey)) {
                nativeLayer[propKey] = layerProperties[propKey];
            }
        }

        const layer = new Layer(nativeLayer);

        return layer;
    }

    private static parseProperties(layerType, propertiesObject): any {
        return PropertyParser.parsePropertiesForLayer(propertiesObject);
    }
}

export class Layer implements LayerCommon {
    public id: string;
    private instance;

    constructor(instance) {
        this.instance = instance;
        this.id = instance.identifier;
    }

    visibility(): boolean {
        return this.instance.visible;
    }

    show(): void {
        this.instance.visible = true;
    }

    hide(): void {
        this.instance.visible = false;
    }

    getNativeInstance() {
        return this.instance;
    }

    setFilter(filter: any[]) {
        if (this.instance instanceof MGLVectorStyleLayer) {
            // MGLVectorStyleLayer is the base type of many layer types. Predicates only supported on vector style layers.
            // See https://docs.mapbox.com/ios/maps/api/6.3.0/Classes/MGLVectorStyleLayer.html

            this.instance.predicate = FilterParser.parseJson(filter);
        } else {
            throw new Error('Set filter only support for vector layer.');
        }
    }

    getFilter(): any[] {
        return FilterParser.toJson(this.instance.predicate);
    }
}