import { LayerCommon, LayerType } from "../common"
import { ExpressionParser } from '../expression/expression-parser';
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
    private instance: MGLStyleLayer;

    constructor(instance: MGLStyleLayer) {
        this.instance = instance;
        this.id = instance.identifier;
    }

    type(): LayerType {
        if (this.instance instanceof MGLFillStyleLayer) {
            return "fill"
        }
        if (this.instance instanceof MGLLineStyleLayer) {
            return "line"
        }
        if (this.instance instanceof MGLSymbolStyleLayer) {
            return "symbol"
        }
        if (this.instance instanceof MGLCircleStyleLayer) {
            return "circle"
        }
        if (this.instance instanceof MGLHeatmapStyleLayer) {
            return "heatmap"
        }
        if (this.instance instanceof MGLFillExtrusionStyleLayer) {
            return "fill-extrusion"
        }
        if (this.instance instanceof MGLRasterStyleLayer) {
            return "raster"
        }
        if (this.instance instanceof MGLHillshadeStyleLayer) {
            return "hillshade"
        }
        if (this.instance instanceof MGLBackgroundStyleLayer) {
            return "background"
        }

        // there is no sky layer in the Mapbox iOS SDK

        return null;
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

            this.instance.predicate = ExpressionParser.parseJson(filter);
        } else {
            throw new Error('Set filter only support for vector layer.');
        }
    }

    getFilter(): any[] {
        return ExpressionParser.toJson(this.instance.predicate);
    }

    setProperty(name: string, value: any) {
        const properties = PropertyParser.parsePropertiesForLayer({ [name]: value });
        for (const propKey in properties) {
            if (Object.prototype.hasOwnProperty.call(properties, propKey)) {
                this.instance[propKey] = properties[propKey];
            }
        }
    }

    getProperty(name: string): any {
        return PropertyParser.propertyValueFromLayer(this.instance, name);
    }
}
