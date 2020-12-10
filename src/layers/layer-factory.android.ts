import { Layer } from '../mapbox.android';
import { LayerCommon } from '../mapbox.common';

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
                return this.parsePropertiesForLineLayer(propertiesObject);
            case 'circle':
                return this.parsePropertiesForCircleLayer(propertiesObject);
            case 'fill':
                return this.parsePropertiesForFillLayer(propertiesObject);
            case 'symbol':
                return this.parsePropertiesForSymbolLayer(propertiesObject);
            case 'raster':
                return this.parsePropertiesForRasterLayer(propertiesObject);
            default:
                throw new Error(`Unknown layer type: ${layerType}`);
        }
    }

    private static parsePropertiesForLineLayer(propertiesObject) {
        const lineProperties = [];

        if (!propertiesObject) {
            return lineProperties;
        }

        /*
            line-blur ✓
            line-cap ✓
            line-color ✓
            line-dasharray ✓
            line-gap-width ✓
            line-gradient
            line-join ✓
            line-miter-limit ✓
            line-offset ✓
            line-opacity ✓
            line-pattern
            line-round-limit ✓
            line-sort-key
            line-translate ✓
            line-translate-anchor ✓
            line-width ✓
            visibility ✓
        */
        const PropertyFactory = com.mapbox.mapboxsdk.style.layers.PropertyFactory;
        const Property = com.mapbox.mapboxsdk.style.layers.Property;

        if (propertiesObject['line-blur']) {
            lineProperties.push(PropertyFactory.lineBlur(new java.lang.Float(propertiesObject['line-blur'])));
        }

        if (propertiesObject['line-cap']) {
            let property;

            switch (propertiesObject['line-cap']) {
                case 'round':
                    property = Property.LINE_CAP_ROUND;
                    break;
                case 'square':
                    property = Property.LINE_CAP_SQUARE;
                    break;
                case 'butt':
                    property = Property.LINE_CAP_BUTT;
                    break;
                default:
                    throw new Error('Unknown line-cap value');
            }

            lineProperties.push(PropertyFactory.lineCap(property));
        }

        if (propertiesObject['line-color']) {
            lineProperties.push(PropertyFactory.lineColor(propertiesObject['line-color']));
        }

        if (propertiesObject['line-dash-array']) {
            const dashArray = Array.create('java.lang.Float', propertiesObject['line-dash-array'].length);

            for (let i = 0; i < propertiesObject['line-dash-array'].length; i++) {
                dashArray[i] = new java.lang.Float(propertiesObject['line-dash-array'][i]);
            }

            lineProperties.push(PropertyFactory.lineDasharray(dashArray));
        }

        if (propertiesObject['line-gap-width']) {
            lineProperties.push(PropertyFactory.lineGapWidth(new java.lang.Float(propertiesObject['line-gap-width'])));
        }

        if (propertiesObject['line-join']) {
            let property;

            switch (propertiesObject['line-join']) {
                case 'bevel':
                    property = Property.LINE_JOIN_BEVEL;
                    break;
                case 'miter':
                    property = Property.LINE_JOIN_MITER;
                    break;
                case 'round':
                    property = Property.LINE_JOIN_ROUND;
                    break;
                default:
                    throw new Error('Unknown line-join value');
            }

            lineProperties.push(PropertyFactory.lineJoin(property));
        }

        if (propertiesObject['line-miter-limit']) {
            lineProperties.push(PropertyFactory.lineMiterLimit(new java.lang.Float(propertiesObject['line-miter-limit'])));
        }

        if (propertiesObject['line-offset']) {
            lineProperties.push(PropertyFactory.lineOffset(new java.lang.Float(propertiesObject['line-offset'])));
        }

        if (propertiesObject['line-opacity']) {
            lineProperties.push(PropertyFactory.lineOpacity(new java.lang.Float(propertiesObject['line-opacity'])));
        }

        if (propertiesObject['line-round-limit']) {
            lineProperties.push(PropertyFactory.lineRoundLimit(new java.lang.Float(propertiesObject['line-round-limit'])));
        }

        if (propertiesObject['line-translate']) {
            const dashArray = Array.create('java.lang.Float', propertiesObject['line-translate'].length);

            for (let i = 0; i < propertiesObject['line-translate'].length; i++) {
                dashArray[i] = new java.lang.Float(propertiesObject['line-translate'][i]);
            }

            lineProperties.push(PropertyFactory.lineTranslate(dashArray));
        }

        if (propertiesObject['line-translate-anchor']) {
            lineProperties.push(PropertyFactory.lineTranslateAnchor(propertiesObject['line-translate-anchor']));
        }

        if (propertiesObject['line-width']) {
            lineProperties.push(PropertyFactory.lineWidth(new java.lang.Float(propertiesObject['line-width'])));
        }

        if (propertiesObject['visibility']) {
            lineProperties.push(PropertyFactory.visibility(propertiesObject['visibility']));
        }

        return lineProperties;
    }

    private static parsePropertiesForCircleLayer(propertiesObject) {
        const circleProperties = [];

        if (!propertiesObject) {
            return circleProperties;
        }

        /*
            circle-blur ✓
            circle-color ✓
            circle-opacity ✓
            circle-pitch-alignment ✓
            circle-pitch-scale ✓
            circle-radius ✓
            circle-sort-key
            circle-stroke-color ✓
            circle-stroke-opacity ✓
            circle-stroke-width ✓
            circle-translate ✓
            circle-translate-anchor ✓
            visibility ✓
        */

        const PropertyFactory = com.mapbox.mapboxsdk.style.layers.PropertyFactory;
        const Expression = com.mapbox.mapboxsdk.style.expressions.Expression;

        if (propertiesObject['circle-blur']) {
            circleProperties.push(PropertyFactory.circleBlur(new java.lang.Float(propertiesObject['circle-blur'])));
        }

        if (propertiesObject['circle-color']) {
            circleProperties.push(PropertyFactory.circleColor(propertiesObject['circle-color']));
        }

        if (propertiesObject['circle-opacity']) {
            circleProperties.push(PropertyFactory.circleOpacity(new java.lang.Float(propertiesObject['circle-opacity'])));
        }

        if (propertiesObject['circle-pitch-alignment']) {
            circleProperties.push(PropertyFactory.circlePitchAlignment(propertiesObject['circle-pitch-alignment']));
        }

        if (propertiesObject['circle-pitch-scale']) {
            circleProperties.push(PropertyFactory.circlePitchScale(propertiesObject['circle-pitch-scale']));
        }

        if (propertiesObject['circle-radius']) {
            // we have two options for a radius. We might have a fixed float or an expression

            if (typeof propertiesObject['circle-radius'] == 'number') {
                circleProperties.push(PropertyFactory.circleRadius(new java.lang.Float(propertiesObject['circle-radius'])));
            } else {
                if (!propertiesObject['circle-radius'].stops) {
                    throw new Error('No radius or stops provided to addCircleLayer.');
                }

                const stopArgs = [];

                for (let i = 0; i < propertiesObject['circle-radius'].stops.length; i++) {
                    const stop = propertiesObject['circle-radius'].stops[i];
                    stopArgs.push(Expression.stop(new java.lang.Float(stop[0]), new java.lang.Float(stop[1])));
                }

                let base = 2;

                if (propertiesObject['circle-radius'].stops.base) {
                    base = propertiesObject['circle-radius'].stops.base;
                }

                circleProperties.push(PropertyFactory.circleRadius(Expression.interpolate(Expression.exponential(new java.lang.Float(base)), Expression.zoom(), stopArgs)));
            }
        }

        if (propertiesObject['circle-stroke-color']) {
            circleProperties.push(PropertyFactory.circleStrokeColor(propertiesObject['circle-stroke-color']));
        }

        if (propertiesObject['circle-stroke-opacity']) {
            circleProperties.push(PropertyFactory.circleStrokeOpacity(new java.lang.Float(propertiesObject['circle-stroke-opacity'])));
        }

        if (propertiesObject['circle-stroke-width']) {
            circleProperties.push(PropertyFactory.circleStrokeWidth(new java.lang.Float(propertiesObject['circle-stroke-width'])));
        }

        if (propertiesObject['circle-translate']) {
            const fillTranslateArray = Array.create('java.lang.Float', propertiesObject['circle-translate'].length);

            for (let i = 0; i < propertiesObject['circle-translate'].length; i++) {
                fillTranslateArray[i] = new java.lang.Float(propertiesObject['circle-translate'][i]);
            }
            circleProperties.push(PropertyFactory.circleTranslate(fillTranslateArray));
        }

        if (propertiesObject['circle-translate-anchor']) {
            circleProperties.push(PropertyFactory.circleTranslateAnchor(propertiesObject['circle-translate-anchor']));
        }

        if (propertiesObject['visibility']) {
            circleProperties.push(PropertyFactory.visibility(propertiesObject['visibility']));
        }

        return circleProperties;
    }

    private static parsePropertiesForFillLayer(propertiesObject) {
        const fillProperties = [];

        if (!propertiesObject) {
            return fillProperties;
        }

        /*
            fill-antialias ✓
            fill-color ✓
            fill-opacity ✓
            fill-outline-color ✓
            fill-pattern ✓
            fill-sort-key
            fill-translate ✓
            fill-translate-anchor ✓
            visibility ✓
        */

        const PropertyFactory = com.mapbox.mapboxsdk.style.layers.PropertyFactory;

        if (propertiesObject['fill-color']) {
            fillProperties.push(PropertyFactory.fillColor(propertiesObject['fill-color']));
        }

        if (propertiesObject['fill-opacity']) {
            fillProperties.push(PropertyFactory.fillOpacity(new java.lang.Float(propertiesObject['fill-opacity'])));
        }

        if (propertiesObject['fill-antialias']) {
            fillProperties.push(PropertyFactory.fillAntialias(new java.lang.Boolean(propertiesObject['fill-antialias'])));
        }

        if (propertiesObject['fill-outline-color']) {
            fillProperties.push(PropertyFactory.fillOutlineColor(propertiesObject['fill-outline-color']));
        }

        if (propertiesObject['fill-pattern']) {
            // TODO: can be string or string[]
            fillProperties.push(PropertyFactory.fillPattern(propertiesObject['fill-pattern']));
        }

        if (propertiesObject['fill-translate']) {
            const fillTranslateArray = Array.create('java.lang.Float', propertiesObject['fill-translate'].length);

            for (let i = 0; i < propertiesObject['fill-translate'].length; i++) {
                fillTranslateArray[i] = new java.lang.Float(propertiesObject['fill-translate'][i]);
            }
            fillProperties.push(PropertyFactory.fillTranslate(fillTranslateArray));
        }

        if (propertiesObject['fill-translate-anchor']) {
            fillProperties.push(PropertyFactory.fillTranslateAnchor(propertiesObject['fill-translate-anchor']));
        }

        if (propertiesObject['visibility']) {
            fillProperties.push(PropertyFactory.visibility(propertiesObject['visibility']));
        }

        return fillProperties;
    }

    private static parsePropertiesForSymbolLayer(propertiesObject) {
        const symbolProperties = [];

        if (!propertiesObject) {
            return symbolProperties;
        }

        /*
            icon-allow-overlap
            icon-anchor
            icon-color
            icon-halo-blur
            icon-halo-color
            icon-halo-width
            icon-ignore-placement
            icon-image ✓
            icon-keep-upright
            icon-offset
            icon-opacity
            icon-optional
            icon-padding
            icon-pitch-alignment
            icon-rotate ✓
            icon-rotation-alignment
            icon-size ✓
            icon-text-fit
            icon-text-fit-padding
            icon-translate
            icon-translate-anchor
            symbol-avoid-edges
            symbol-placement
            symbol-sort-key
            symbol-spacing
            symbol-z-order
            text-allow-overlap
            text-anchor
            text-color ✓
            text-field ✓
            text-font
            text-halo-blur
            text-halo-color
            text-halo-width
            text-ignore-placement
            text-justify
            text-keep-upright
            text-letter-spacing
            text-line-height
            text-max-angle
            text-max-width
            text-offset
            text-opacity
            text-optional
            text-padding
            text-pitch-alignment
            text-radial-offset
            text-rotate
            text-rotation-alignment
            text-size
            text-transform
            text-translate
            text-translate-anchor
            text-variable-anchor
            text-writing-mode
            visibility ✓
        */

        const PropertyFactory = com.mapbox.mapboxsdk.style.layers.PropertyFactory;

        if (propertiesObject['icon-image']) {
            symbolProperties.push(PropertyFactory.iconImage(propertiesObject['icon-image']));
        }

        if (propertiesObject['icon-rotate']) {
            symbolProperties.push(PropertyFactory.iconRotate(new java.lang.Float(propertiesObject['icon-rotate'])));
        }

        if (propertiesObject['icon-size']) {
            symbolProperties.push(PropertyFactory.iconSize(new java.lang.Float(propertiesObject['icon-size'])));
        }

        if (propertiesObject['text-color']) {
            symbolProperties.push(PropertyFactory.textColor(propertiesObject['text-color']));
        }

        if (propertiesObject['text-field']) {
            symbolProperties.push(PropertyFactory.textField(propertiesObject['text-field']));
        }

        if (propertiesObject['visibility']) {
            symbolProperties.push(PropertyFactory.visibility(propertiesObject['visibility']));
        }

        return symbolProperties;
    }

    private static parsePropertiesForRasterLayer(propertiesObject) {
        const rasterProperties = [];

        if (!propertiesObject) {
            return rasterProperties;
        }

        /*
            raster-brightness-max ✓
            raster-brightness-min ✓
            raster-contrast ✓
            raster-fade-duration ✓
            raster-hue-rotate ✓
            raster-opacity ✓
            raster-resampling ✓
            raster-saturation ✓
            visibility ✓
        */

        const PropertyFactory = com.mapbox.mapboxsdk.style.layers.PropertyFactory;

        if (propertiesObject['raster-brightness-max']) {
            rasterProperties.push(PropertyFactory.rasterBrightnessMax(new java.lang.Float(propertiesObject['raster-brightness-max'])));
        }

        if (propertiesObject['raster-brightness-min']) {
            rasterProperties.push(PropertyFactory.rasterBrightnessMin(new java.lang.Float(propertiesObject['raster-brightness-min'])));
        }

        if (propertiesObject['raster-contrast']) {
            rasterProperties.push(PropertyFactory.rasterContrast(new java.lang.Float(propertiesObject['raster-contrast'])));
        }

        if (propertiesObject['raster-fade-duration']) {
            rasterProperties.push(PropertyFactory.rasterFadeDuration(new java.lang.Float(propertiesObject['raster-fade-duration'])));
        }

        if (propertiesObject['raster-hue-rotate']) {
            rasterProperties.push(PropertyFactory.rasterHueRotate(new java.lang.Float(propertiesObject['raster-hue-rotate'])));
        }

        if (propertiesObject['raster-opacity']) {
            rasterProperties.push(PropertyFactory.rasterOpacity(new java.lang.Float(propertiesObject['raster-opacity'])));
        }

        if (propertiesObject['raster-resampling']) {
            switch (propertiesObject['raster-resampling']) {
                case 'linear':
                    rasterProperties.push(com.mapbox.mapboxsdk.style.layers.Property.RASTER_RESAMPLING_LINEAR);
                    break;
                case 'nearest':
                    rasterProperties.push(com.mapbox.mapboxsdk.style.layers.Property.RASTER_RESAMPLING_NEAREST);
                    break;
                default:
                    throw new Error('Unknown raster resampling value.');
            }
        }

        if (propertiesObject['raster-saturation']) {
            rasterProperties.push(PropertyFactory.rasterSaturation(new java.lang.Float(propertiesObject['raster-saturation'])));
        }

        if (propertiesObject['visibility']) {
            rasterProperties.push(PropertyFactory.visibility(propertiesObject['visibility']));
        }

        return rasterProperties;
    }
}
