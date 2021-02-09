import { Color } from '@nativescript/core';

function toCamelCase(s) {
    return s.replace(/([-_][a-z])/gi, ($1) => $1.toUpperCase().replace('-', '').replace('_', ''));
}

const Expression = com.mapbox.mapboxsdk.style.expressions.Expression;
function transformValue(key, value) {
    let nValue = value;
    if (Array.isArray(value)) {
        nValue = Expression.Converter.convert(JSON.stringify(value));
    }
    if (key.indexOf('-color') !== -1 && !Array.isArray(value)) {
        const color = value instanceof Color ? value : new Color(value);
        nValue = color.android;
    } else if (typeof value === 'number') {
        nValue = new java.lang.Float(value);
    } else if (typeof value === 'boolean') {
        nValue = new java.lang.Boolean(value);
    }
    return nValue;
}
export class PropertyParser {
    static parsePropertiesForLayer(propertiesObject) {
        const nProperties = [];

        const PropertyFactory = com.mapbox.mapboxsdk.style.layers.PropertyFactory;
        if (propertiesObject) {
            Object.keys(propertiesObject).forEach((k) => {
                const actualKey = toCamelCase(k);
                const value = propertiesObject[k];
                const nValue = transformValue(k, value);
                nProperties.push(PropertyFactory[actualKey](nValue));
            });
        }

        return nProperties;
    }
}
