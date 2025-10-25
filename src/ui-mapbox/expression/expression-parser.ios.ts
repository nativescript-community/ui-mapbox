// src/ui-mapbox/expression-parser.ios.ts
// TypeScript shim that exports ExpressionParser (TS API) while delegating to native NativeExpressionParser when available.

export class ExpressionParser {
    // Return native predicate object (opaque) if native parser available, otherwise return the expression JSON.
    static parseJson(json: any[]): any {
        try {
            if ((global as any).NativeExpressionParser && (global as any).NativeExpressionParser.parseJson) {
                const res = (global as any).NativeExpressionParser.parseJson(json);
                if (res) return res;
            }
        } catch (e) {
            // ignore and fallback
        }
        return json;
    }

    // Try to convert native predicate back to JSON expression. Returns array or null.
    static toJson(filter: any): any[] | null {
        try {
            if (!filter) return null;
            if (Array.isArray(filter)) return filter;
            if ((global as any).NativeExpressionParser && (global as any).NativeExpressionParser.toJson) {
                const res = (global as any).NativeExpressionParser.toJson(filter);
                if (res) return res;
            }
        } catch (e) {
            // ignore
        }
        return null;
    }
}
