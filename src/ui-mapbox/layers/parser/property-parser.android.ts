import { Color } from '@nativescript/core';

function toCamelCase(s) {
    return s.replace(/([-_][a-z])/gi, ($1) => $1.toUpperCase().replace('-', '').replace('_', ''));
}

function toPascalCase(s) {
    return s.replace(/(^[a-z]|[-_][a-z])/gi, ($1) => $1.toUpperCase().replace('-', '').replace('_', ''));
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
        nValue = java.lang.Float.valueOf(value);
    } else if (typeof value === 'boolean') {
        nValue = java.lang.Boolean.valueOf(value);
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

    static propertyValueFromLayer(layer, key: string): any {
        const getterMethodName = `get${toPascalCase(key)}`;

        let nValue: com.mapbox.mapboxsdk.style.layers.PropertyValue<any>;
        try {
            nValue = layer[getterMethodName]();
        } catch (e) {
            // native method seems not exist
            return null;
        }

        if (!nValue || nValue.isNull()) {
            return null;
        }

        if (nValue.isExpression()) {
            return JSON.parse(nValue.getExpression().toString());
        } else if (!!nValue.getColorInt()) {
            return new Color(nValue.getColorInt().intValue());
        } else {
            return nValue.getValue();
        }
    }
}
