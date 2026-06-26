import { Color } from '@nativescript/core';

export function toCamelCase(s) {
    return s.replace(/([-_][a-z])/gi, ($1) => $1.toUpperCase().replace('-', '').replace('_', ''));
}

export function toPascalCase(s) {
    return s.replace(/(^[a-z]|[-_][a-z])/gi, ($1) => $1.toUpperCase().replace('-', '').replace('_', ''));
}

const Expression = com.mapbox.maps.extension.style.expressions.generated.Expression;

// Layout/paint properties whose constant value is an enum type in the Mapbox Android
// SDK (e.g. icon-anchor -> IconAnchor, line-cap -> LineCap). These must be converted
// from their style-spec string (e.g. 'bottom') to the matching enum instance via
// valueOf(). Wrapping them in Expression.literal() — as we do for plain string/number/
// boolean constants — is rejected by the typed setters and throws, which previously
// aborted the whole layer creation (e.g. symbol layers using icon-anchor never showed).
let enumPropertyClassCache: Record<string, any>;
function getEnumPropertyClass(camelKey: string): any {
    if (!enumPropertyClassCache) {
        const gen = com.mapbox.maps.extension.style.layers.properties.generated;
        enumPropertyClassCache = {
            iconAnchor: gen.IconAnchor,
            textAnchor: gen.TextAnchor,
            textJustify: gen.TextJustify,
            textTransform: gen.TextTransform,
            symbolPlacement: gen.SymbolPlacement,
            symbolZOrder: gen.SymbolZOrder,
            iconTextFit: gen.IconTextFit,
            iconRotationAlignment: gen.IconRotationAlignment,
            textRotationAlignment: gen.TextRotationAlignment,
            iconPitchAlignment: gen.IconPitchAlignment,
            textPitchAlignment: gen.TextPitchAlignment,
            lineCap: gen.LineCap,
            lineJoin: gen.LineJoin,
            fillTranslateAnchor: gen.FillTranslateAnchor,
            lineTranslateAnchor: gen.LineTranslateAnchor,
            iconTranslateAnchor: gen.IconTranslateAnchor,
            textTranslateAnchor: gen.TextTranslateAnchor,
            circleTranslateAnchor: gen.CircleTranslateAnchor,
            circlePitchAlignment: gen.CirclePitchAlignment,
            circlePitchScale: gen.CirclePitchScale
        };
    }
    return enumPropertyClassCache[camelKey];
}

export function transformValue(key, value) {
    let nValue = value;
    if (Array.isArray(value)) {
        // assume it's a JSON-style expression
        return Expression.fromRaw(JSON.stringify(value));
    }
    // Enum-typed constant properties must use the enum instance, not a literal expression.
    // The SDK exposes them as static constants named after the upper-cased style value
    // (e.g. 'bottom' -> BOTTOM, 'bottom-left' -> BOTTOM_LEFT, 'round' -> ROUND). Note
    // valueOf() expects that constant NAME, not the wire value, so we resolve the static
    // field directly.
    if (typeof value === 'string') {
        const enumClass = getEnumPropertyClass(key);
        if (enumClass) {
            const enumValue = enumClass[value.toUpperCase().replace(/-/g, '_')];
            if (enumValue) {
                return enumValue;
            }
        }
    }
    if (key.indexOf('-color') !== -1) {
        const color = value instanceof Color ? value : new Color(value);
        nValue = color.android;
    } else if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
        nValue = Expression.literal(value as any);
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
