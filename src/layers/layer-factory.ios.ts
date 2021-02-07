import { LayerCommon } from '../mapbox.common';
import { Layer } from '../mapbox.ios';
import { PropertyParser } from './parser/property-parser.ios';

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
        switch (layerType) {
            case 'line':
                return PropertyParser.parsePropertiesForLineLayer(propertiesObject);
            case 'circle':
                return PropertyParser.parsePropertiesForCircleLayer(propertiesObject);
            case 'fill':
                return PropertyParser.parsePropertiesForFillLayer(propertiesObject);
            case 'symbol':
                return PropertyParser.parsePropertiesForSymbolLayer(propertiesObject);
            case 'raster':
                return PropertyParser.parsePropertiesForRasterLayer(propertiesObject);
            default:
                throw new Error(`Unknown layer type: ${layerType}`);
        }
    }    
}
