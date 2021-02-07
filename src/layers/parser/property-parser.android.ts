import { Color } from '@nativescript/core';

function toCamelCase(s) {
    return s.replace(/([-_][a-z])/gi, ($1) => $1.toUpperCase().replace('-', '').replace('_', ''));
}
export class PropertyParser {
    static parsePropertiesForLayer(propertiesObject) {
        const nProperties = [];

        const PropertyFactory = com.mapbox.mapboxsdk.style.layers.PropertyFactory;
        const Expression = com.mapbox.mapboxsdk.style.expressions.Expression;
        if (propertiesObject) {
            Object.keys(propertiesObject).forEach((k) => {
                const actualKey = toCamelCase(k);
                const value = propertiesObject[k];
                let nValue = value;
                if (Array.isArray(value)) {
                    nValue = Expression.Converter.convert(JSON.stringify(value));
                } else if (typeof value === 'number') {
                    nValue = new java.lang.Float(value);
                }
                nProperties.push(PropertyFactory[actualKey](nValue));
            });
        }

        return nProperties;
    }
}
