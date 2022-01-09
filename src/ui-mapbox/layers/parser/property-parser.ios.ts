import { Color } from '@nativescript/core';

function toCamelCase(s) {
    return s.replace(/([-_][a-z])/gi, ($1) => $1.toUpperCase().replace('-', '').replace('_', ''));
}

const keysMap = {
    'circle-pitch-scale': 'circleScaleAlignment',
    'circle-translate': 'circleTranslation',
    'circle-translate-anchor': 'circleTranslationAnchor',
    'fill-antialias': 'fillAntialiased',
    'fill-translate': 'fillTranslation',
    'fill-translate-anchor': 'fillTranslationAnchor',
    'icon-allow-overlap': 'iconAllowsOverlap',
    'icon-keep-upright': 'keepsIconUpright',
    'icon-ignore-placement': 'iconIgnoresPlacement',
    'icon-image': 'iconImageName',
    'icon-rotate': 'iconRotation',
    'icon-rotate-alignment': 'iconRotationAlignment',
    'icon-translate': 'iconTranslation',
    'icon-translate-anchor': 'iconTranslationAnchor',
    'icon-size': 'iconScale',
    'line-translate': 'lineTranslation',
    'line-translate-anchor': 'lineTranslationAnchor',
    'line-dasharray': 'lineDashPattern',
    'text-allow-overlap': 'textAllowsOverlap',
    'text-field': 'text',
    'text-font': 'textFontNames',
    'text-justify': 'textJustification',
    'text-ignore-placement': 'textIgnoresPlacement',
    'text-keep-upright': 'keepsTextUpright',
    'text-max-angle': 'maximumTextAngle',
    'text-max-width': 'maximumTextWidth',
    'text-rotate': 'textRotation',
    'text-rotate-alignment': 'textRotationAlignment',
    'text-size': 'textFontSize',
    'text-translate': 'textTranslation',
    'text-translate-anchor': 'textTranslationAnchor',
    'raster-hue-rotate': 'rasterHueRotation',
    'raster-resampling': 'rasterResamplingMode',
    'raster-brightness-min': 'maximumRasterBrightness',
    'raster-brightness-max': 'minimumRasterBrightness'
};
function transformValue(key, value) {
    if (key.indexOf('-color') !== -1 && !Array.isArray(value)) {
        const color = value instanceof Color ? value : new Color(value);
        return color.ios;
    }
    switch (key) {
        case 'raster-resampling':
            if (value === 'linear') {
                return MGLRasterResamplingMode.Linear;
            } else if (value === 'nearest') {
                return MGLRasterResamplingMode.Nearest;
            } else {
                return value;
            }
        default:
            return value;
    }
}
export class PropertyParser {
    static parsePropertiesForLayer(propertiesObject) {
        const nProperties = {};

        if (propertiesObject) {
            Object.keys(propertiesObject).forEach((k) => {
                const actualKey = keysMap[k] || toCamelCase(k);
                const value = propertiesObject[k];
                const rValue = transformValue(k, value);
                if (Array.isArray(value)) {
                    nProperties[actualKey] = (NSExpression as any).expressionWithMGLJSONObject(rValue);
                } else {
                    nProperties[actualKey] = NSExpression.expressionForConstantValue(rValue);
                }
            });
        }

        return nProperties;
    }
}
