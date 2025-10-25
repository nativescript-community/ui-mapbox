import { Color } from '@nativescript/core';

export class PropertyParser {
    // static parsePropertiesForLayer(propertiesObject) {
    //     const nProperties = {};
    //     if (propertiesObject) {
    //         Object.keys(propertiesObject).forEach((k) => {
    //             const actualKey = keysMap[k] || toCamelCase(k);
    //             const value = propertiesObject[k];
    //             const rValue = transformValue(k, value, styleExtras[k]?.iosType);
    //             if (Array.isArray(value)) {
    //                 nProperties[actualKey] = (NSExpression as any).expressionWithMGLJSONObject(rValue);
    //             } else {
    //                 nProperties[actualKey] = NSExpression.expressionForConstantValue(rValue);
    //             }
    //         });
    //     }
    //     return nProperties;
    // }
    // static propertyValueFromLayer(layer, key: string): any {
    //     const actualKey = keysMap[key] || toCamelCase(key);
    //     const nValue: NSExpression = layer[actualKey];
    //     if (!nValue) {
    //         return null;
    //     }
    //     if (nValue.expressionType === NSExpressionType.ConstantValueExpressionType) {
    //         if (nValue.constantValue instanceof UIColor) {
    //             return Color.fromIosColor(nValue.constantValue);
    //         } else {
    //             return nValue.constantValue;
    //         }
    //     } else {
    //         const expressionObj = (nValue as any).mgl_jsonExpressionObject;
    //         const data = NSJSONSerialization.dataWithJSONObjectOptionsError(expressionObj, 0 as any);
    //         const expression: any = NSString.alloc().initWithDataEncoding(data, NSUTF8StringEncoding);
    //         return JSON.parse(expression);
    //     }
    // }
}
