import { Layer } from '../mapbox.android';
import { LayerCommon } from '../mapbox.common';
import { PropertyParser } from './parser/property-parser.android';

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

        return layer;
    }

    private static parseProperties(layerType, propertiesObject) {
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
