import { Color } from '@nativescript/core';

export function toCamelCase(s) {
    return s.replace(/([-_][a-z])/gi, ($1) => $1.toUpperCase().replace('-', '').replace('_', ''));
}

export function toPascalCase(s) {
    return s.replace(/(^[a-z]|[-_][a-z])/gi, ($1) => $1.toUpperCase().replace('-', '').replace('_', ''));
}

const Expression = com.mapbox.maps.extension.style.expressions.generated.Expression;
export function transformValue(key, value) {
    let nValue = value;
    if (Array.isArray(value)) {
        nValue = Expression.fromRaw(JSON.stringify(value));
    }
    if (key.indexOf('-color') !== -1 && !Array.isArray(value)) {
        const color = value instanceof Color ? value : new Color(value);
        nValue = color.android;
    } else if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
        nValue = Expression.literal(value as any);
    } else if (Array.isArray(value)) {
        // assume it's a JSON-style expression
        nValue = Expression.fromRaw(JSON.stringify(value));
    }
    return nValue;
}
export class PropertyParser {
    // static parsePropertiesForLayer(propertiesObject) {
    //     const nProperties = [];

    //     const PropertyFactory = com.mapbox.maps.extension.style.layers.PropertyFactory;
    //     if (propertiesObject) {
    //         Object.keys(propertiesObject).forEach((k) => {
    //             const actualKey = toCamelCase(k);
    //             const value = propertiesObject[k];
    //             const nValue = transformValue(k, value);
    //             nProperties.push(PropertyFactory[actualKey](nValue));
    //         });
    //     }

    //     return nProperties;
    // }

    static propertyValueFromLayer(layer, key: string): any {
        const getterMethodName = `get${toPascalCase(key)}`;

        let nValue: com.mapbox.maps.extension.style.layers.properties.PropertyValue<any>;
        try {
            nValue = layer[getterMethodName]();
        } catch (e) {
            // native method seems not exist
            return null;
        }

        if (nValue === null || nValue === undefined) {
            return null;
        }

        if (nValue.isExpression()) {
            return JSON.parse(nValue.toString());
        } else if (!!nValue.getColorInt()) {
            return new Color(nValue.getColorInt().intValue());
        } else {
            return nValue.getValue();
        }
    }
}
