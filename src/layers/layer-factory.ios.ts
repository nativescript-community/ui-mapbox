import { Color } from '@nativescript/core';

import { LayerCommon } from '../mapbox.common';
import { Layer } from '../mapbox.ios';

export class LayerFactory {
    static createLayer(style, source): Promise<LayerCommon> {
        let nativeLayer;
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
            default:
                throw new Error(`Unknown layer type: ${style.type}`);
        }

        const layerProperties = this.parseProperties(style.type, Object.assign(style.paint, style.layout)); // TODO: handle defaults

        for (const propKey in layerProperties) {
            if (Object.prototype.hasOwnProperty.call(layerProperties, propKey)) {
                nativeLayer[propKey] = layerProperties[propKey];
            }
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
        const lineProperties = {};

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
            lineProperties['lineBlur'] = NSExpression.expressionForConstantValue(propertiesObject['line-blur']);
        }

        if (propertiesObject['line-cap']) {
            lineProperties['lineCap'] = NSExpression.expressionForConstantValue(propertiesObject['line-cap']);
        }

        if (propertiesObject['line-color']) {
            lineProperties['lineColor'] = NSExpression.expressionForConstantValue(new Color(propertiesObject['line-color']).ios);
        }

        if (propertiesObject['line-dash-array']) {
            lineProperties['lineDashPattern'] = NSExpression.expressionForConstantValue(propertiesObject['line-dash-array']);
        }

        if (propertiesObject['line-gap-width']) {
            lineProperties['lineGapWidth'] = NSExpression.expressionForConstantValue(propertiesObject['line-gap-width']);
        }

        if (propertiesObject['line-join']) {
            lineProperties['lineJoin'] = NSExpression.expressionForConstantValue(propertiesObject['line-join']);
        }

        if (propertiesObject['line-miter-limit']) {
            lineProperties['lineMiterLimit'] = NSExpression.expressionForConstantValue(propertiesObject['line-miter-limit']);
        }

        if (propertiesObject['line-offset']) {
            lineProperties['lineOffset'] = NSExpression.expressionForConstantValue(propertiesObject['line-offset']);
        }

        if (propertiesObject['line-opacity']) {
            lineProperties['lineOpacity'] = NSExpression.expressionForConstantValue(propertiesObject['line-opacity']);
        }

        if (propertiesObject['line-round-limit']) {
            lineProperties['lineRoundLimit'] = NSExpression.expressionForConstantValue(propertiesObject['line-round-limit']);
        }

        if (propertiesObject['line-translate']) {
            lineProperties['lineTranslation'] = NSExpression.expressionForConstantValue(propertiesObject['line-translate']);
        }

        if (propertiesObject['line-translate-anchor']) {
            lineProperties['lineTranslationAnchor'] = NSExpression.expressionForConstantValue(propertiesObject['line-translate-anchor']);
        }

        if (propertiesObject['line-width']) {
            lineProperties['lineWidth'] = NSExpression.expressionForConstantValue(propertiesObject['line-width']);
        }

        return lineProperties;
    }

    private static parsePropertiesForCircleLayer(propertiesObject) {
        const circleProperties = {};

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
            circleProperties['circleBlur'] = NSExpression.expressionForConstantValue(propertiesObject['circle-blur']);
        }

        if (propertiesObject['circle-color']) {
            circleProperties['circleColor'] = NSExpression.expressionForConstantValue(new Color(propertiesObject['circle-color']).ios);
        }

        if (propertiesObject['circle-opacity']) {
            circleProperties['circleOpacity'] = NSExpression.expressionForConstantValue(propertiesObject['circle-opacity']);
        }

        if (propertiesObject['circle-radius']) {
            if (typeof propertiesObject['circle-radius'] !== 'number') {
                throw new Error('Unsupported circle-radius type'); // TODO: Implement circle radius with stops
            }
            circleProperties['circleRadius'] = NSExpression.expressionForConstantValue(propertiesObject['circle-radius']);
        }

        if (propertiesObject['circle-stroke-color']) {
            circleProperties['circleStrokeColor'] = NSExpression.expressionForConstantValue(new Color(propertiesObject['circle-stroke-color']).ios);
        }

        if (propertiesObject['circle-stroke-opacity']) {
            circleProperties['circleStrokeOpacity'] = NSExpression.expressionForConstantValue(propertiesObject['circle-stroke-opacity']);
        }

        if (propertiesObject['circle-stroke-width']) {
            circleProperties['circleStrokeWidth'] = NSExpression.expressionForConstantValue(propertiesObject['circle-stroke-width']);
        }

        return circleProperties;
    }

    private static parsePropertiesForFillLayer(propertiesObject) {
        const fillProperties = {};

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

        if (propertiesObject['fill-antialias']) {
            fillProperties['fillAntialiased'] = NSExpression.expressionForConstantValue(propertiesObject['fill-antialias']);
        }

        if (propertiesObject['fill-color']) {
            fillProperties['fillColor'] = NSExpression.expressionForConstantValue(new Color(propertiesObject['fill-color']).ios);
        }

        if (propertiesObject['fill-opacity']) {
            fillProperties['fillOpacity'] = NSExpression.expressionForConstantValue(propertiesObject['fill-opacity']);
        }

        if (propertiesObject['fill-outline-color']) {
            fillProperties['fillOutlineColor'] = NSExpression.expressionForConstantValue(new Color(propertiesObject['fill-outline-color']).ios);
        }

        if (propertiesObject['fill-pattern']) {
            fillProperties['fillPattern'] = NSExpression.expressionForConstantValue(propertiesObject['fill-pattern']);
        }

        if (propertiesObject['fill-translate']) {
            fillProperties['fillTranslation'] = NSExpression.expressionForConstantValue(propertiesObject['fill-translate']);
        }

        if (propertiesObject['fill-translate-anchor']) {
            fillProperties['fillTranslationAnchor'] = NSExpression.expressionForConstantValue(propertiesObject['fill-translate-anchor']);
        }

        return fillProperties;
    }
}
