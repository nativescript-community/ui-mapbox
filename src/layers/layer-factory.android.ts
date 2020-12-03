import { Layer } from '../mapbox.android';
import { LayerCommon } from '../mapbox.common';

export class LayerFactory  {
    static createLayer(style, source): Promise<LayerCommon> {
        const layerProperties = this.parseProperties(style.type, Object.assign(style.paint, style.layout)); // TODO: handle defaults

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
            default:
                throw new Error(`Unknown layer type: ${style.type}`);
        }

        var layer = new Layer(nativeLayer);

        return Promise.resolve(layer);
    }

    private static parseProperties(layerType, propertiesObject) {
        switch (layerType) {
            case 'line':
                return this.parsePropertiesForLineLayer(propertiesObject);
            case 'circle':
                return this.parsePropertiesForCircleLayer(propertiesObject);
            case 'fill':
                return this.parsePropertiesForFillLayer(propertiesObject);
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
            visibility
        */

        if (propertiesObject['line-blur']) {
            lineProperties.push(com.mapbox.mapboxsdk.style.layers.PropertyFactory.lineBlur(new java.lang.Float(propertiesObject['line-blur'])));
        }

        if (propertiesObject['line-cap']) {
            let property;

            switch (propertiesObject['line-cap']) {
                case 'round':
                    property = com.mapbox.mapboxsdk.style.layers.Property.LINE_CAP_ROUND;
                    break;
                case 'square':
                    property = com.mapbox.mapboxsdk.style.layers.Property.LINE_CAP_SQUARE;
                    break;
                case 'butt':
                    property = com.mapbox.mapboxsdk.style.layers.Property.LINE_CAP_BUTT;
                    break;
                default:
                    throw new Error('Unknown line-cap value');
            }

            lineProperties.push(com.mapbox.mapboxsdk.style.layers.PropertyFactory.lineCap(property));
        }

        if (propertiesObject['line-color']) {
            lineProperties.push(com.mapbox.mapboxsdk.style.layers.PropertyFactory.lineColor(propertiesObject['line-color']));
        }

        if (propertiesObject['line-dash-array']) {
            const dashArray = Array.create('java.lang.Float', propertiesObject['line-dash-array'].length);

            for (let i = 0; i < propertiesObject['line-dash-array'].length; i++) {
                dashArray[i] = new java.lang.Float(propertiesObject['line-dash-array'][i]);
            }

            lineProperties.push(com.mapbox.mapboxsdk.style.layers.PropertyFactory.lineDasharray(dashArray));
        }

        if (propertiesObject['line-gap-width']) {
            lineProperties.push(com.mapbox.mapboxsdk.style.layers.PropertyFactory.lineGapWidth(new java.lang.Float(propertiesObject['line-gap-width'])));
        }

        if (propertiesObject['line-join']) {
            let property;

            switch (propertiesObject['line-join']) {
                case 'bevel':
                    property = com.mapbox.mapboxsdk.style.layers.Property.LINE_JOIN_BEVEL;
                    break;
                case 'miter':
                    property = com.mapbox.mapboxsdk.style.layers.Property.LINE_JOIN_MITER;
                    break;
                case 'round':
                    property = com.mapbox.mapboxsdk.style.layers.Property.LINE_JOIN_ROUND;
                    break;
                default:
                    throw new Error('Unknown line-join value');
            }

            lineProperties.push(com.mapbox.mapboxsdk.style.layers.PropertyFactory.lineJoin(property));
        }

        if (propertiesObject['line-miter-limit']) {
            lineProperties.push(com.mapbox.mapboxsdk.style.layers.PropertyFactory.lineMiterLimit(new java.lang.Float(propertiesObject['line-miter-limit'])));
        }

        if (propertiesObject['line-offset']) {
            lineProperties.push(com.mapbox.mapboxsdk.style.layers.PropertyFactory.lineOffset(new java.lang.Float(propertiesObject['line-offset'])));
        }

        if (propertiesObject['line-opacity']) {
            lineProperties.push(com.mapbox.mapboxsdk.style.layers.PropertyFactory.lineOpacity(new java.lang.Float(propertiesObject['line-opacity'])));
        }

        if (propertiesObject['line-round-limit']) {
            lineProperties.push(com.mapbox.mapboxsdk.style.layers.PropertyFactory.lineRoundLimit(new java.lang.Float(propertiesObject['line-round-limit'])));
        }

        if (propertiesObject['line-translate']) {
            const dashArray = Array.create('java.lang.Float', propertiesObject['line-translate'].length);

            for (let i = 0; i < propertiesObject['line-translate'].length; i++) {
                dashArray[i] = new java.lang.Float(propertiesObject['line-translate'][i]);
            }

            lineProperties.push(com.mapbox.mapboxsdk.style.layers.PropertyFactory.lineTranslate(dashArray));
        }

        if (propertiesObject['line-translate-anchor']) {
            lineProperties.push(com.mapbox.mapboxsdk.style.layers.PropertyFactory.lineTranslateAnchor(propertiesObject['line-translate-anchor']));
        }

        if (propertiesObject['line-width']) {
            lineProperties.push(com.mapbox.mapboxsdk.style.layers.PropertyFactory.lineWidth(new java.lang.Float(propertiesObject['line-width'])));
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
            circle-pitch-alignment
            circle-pitch-scale
            circle-radius ✓
            circle-sort-key
            circle-stroke-color ✓
            circle-stroke-opacity ✓
            circle-stroke-width ✓
            circle-translate
            circle-translate-anchor
            visibility    
        */

        if (propertiesObject['circle-blur']) {
            circleProperties.push(com.mapbox.mapboxsdk.style.layers.PropertyFactory.circleBlur(new java.lang.Float(propertiesObject['circle-blur'])));
        }

        if (propertiesObject['circle-color']) {
            circleProperties.push(com.mapbox.mapboxsdk.style.layers.PropertyFactory.circleColor(propertiesObject['circle-color']));
        }

        if (propertiesObject['circle-opacity']) {
            circleProperties.push(com.mapbox.mapboxsdk.style.layers.PropertyFactory.circleOpacity(new java.lang.Float(propertiesObject['circle-opacity'])));
        }

        if (propertiesObject['circle-radius']) {
            // we have two options for a radius. We might have a fixed float or an expression

            if (typeof propertiesObject['circle-radius'] == 'number') {
                circleProperties.push(com.mapbox.mapboxsdk.style.layers.PropertyFactory.circleRadius(new java.lang.Float(propertiesObject['circle-radius'])));
            } else {
                if (!propertiesObject['circle-radius'].stops) {
                    throw new Error('No radius or stops provided to addCircleLayer.');
                }

                const stopArgs = [];

                for (let i = 0; i < propertiesObject['circle-radius'].stops.length; i++) {
                    const stop = propertiesObject['circle-radius'].stops[i];
                    stopArgs.push(com.mapbox.mapboxsdk.style.expressions.Expression.stop(new java.lang.Float(stop[0]), new java.lang.Float(stop[1])));
                }

                let base = 2;

                if (propertiesObject['circle-radius'].stops.base) {
                    base = propertiesObject['circle-radius'].stops.base;
                }

                circleProperties.push(
                    com.mapbox.mapboxsdk.style.layers.PropertyFactory.circleRadius(
                        com.mapbox.mapboxsdk.style.expressions.Expression.interpolate(
                            com.mapbox.mapboxsdk.style.expressions.Expression.exponential(new java.lang.Float(base)),
                            com.mapbox.mapboxsdk.style.expressions.Expression.zoom(),
                            stopArgs
                        )
                    )
                );
            }
        }

        if (propertiesObject['circle-stroke-color']) {
            circleProperties.push(com.mapbox.mapboxsdk.style.layers.PropertyFactory.circleStrokeColor(propertiesObject['circle-stroke-color']));
        }

        if (propertiesObject['circle-stroke-opacity']) {
            circleProperties.push(com.mapbox.mapboxsdk.style.layers.PropertyFactory.circleStrokeOpacity(new java.lang.Float(propertiesObject['circle-stroke-opacity'])));
        }

        if (propertiesObject['circle-stroke-width']) {
            circleProperties.push(com.mapbox.mapboxsdk.style.layers.PropertyFactory.circleStrokeWidth(new java.lang.Float(propertiesObject['circle-stroke-width'])));
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
            visibility
        */

        if (propertiesObject['fill-color']) {
            fillProperties.push(com.mapbox.mapboxsdk.style.layers.PropertyFactory.fillColor(propertiesObject['fill-color']));
        }

        if (propertiesObject['fill-opacity']) {
            fillProperties.push(com.mapbox.mapboxsdk.style.layers.PropertyFactory.fillOpacity(new java.lang.Float(propertiesObject['fill-opacity'])));
        }

        if (propertiesObject['fill-antialias']) {
            fillProperties.push(com.mapbox.mapboxsdk.style.layers.PropertyFactory.fillAntialias(new java.lang.Boolean(propertiesObject['fill-antialias'])));
        }

        if (propertiesObject['fill-outline-color']) {
            fillProperties.push(com.mapbox.mapboxsdk.style.layers.PropertyFactory.fillOutlineColor(propertiesObject['fill-outline-color']));
        }

        if (propertiesObject['fill-pattern']) {
            // TODO: can be string or string[]
            fillProperties.push(com.mapbox.mapboxsdk.style.layers.PropertyFactory.fillPattern(propertiesObject['fill-pattern']));
        }

        if (propertiesObject['fill-translate']) {
            const fillTranslateArray = Array.create('java.lang.Float', propertiesObject['fill-translate'].length);

            for (let i = 0; i < propertiesObject['fill-translate'].length; i++) {
                fillTranslateArray[i] = new java.lang.Float(propertiesObject['fill-translate'][i]);
            }
            fillProperties.push(com.mapbox.mapboxsdk.style.layers.PropertyFactory.fillTranslate(fillTranslateArray));
        }

        if (propertiesObject['fill-translate-anchor']) {
            fillProperties.push(com.mapbox.mapboxsdk.style.layers.PropertyFactory.fillTranslateAnchor(propertiesObject['fill-translate-anchor']));
        }

        return fillProperties;
    }

    private static parseLayoutProperties(layoutObject) {
        const layoutProperties = [];

        if (!layoutObject) {
            return layoutProperties;
        }

        if (layoutObject['line-cap']) {
            let property;

            switch (layoutObject['line-cap']) {
                case 'round':
                    property = com.mapbox.mapboxsdk.style.layers.Property.LINE_CAP_ROUND;
                    break;
                case 'square':
                    property = com.mapbox.mapboxsdk.style.layers.Property.LINE_CAP_SQUARE;
                    break;
                case 'butt':
                    property = com.mapbox.mapboxsdk.style.layers.Property.LINE_CAP_BUTT;
                    break;
                default:
                    throw new Error('Unknown line-cap value');
            }

            layoutProperties.push(com.mapbox.mapboxsdk.style.layers.PropertyFactory.lineCap(property));
        }

        return layoutProperties;
    }
}
