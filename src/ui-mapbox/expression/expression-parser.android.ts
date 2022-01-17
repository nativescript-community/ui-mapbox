export class ExpressionParser {
    static parseJson(json: any[]): com.mapbox.mapboxsdk.style.expressions.Expression {
        const expression = com.mapbox.mapboxsdk.style.expressions.Expression.Converter.convert(JSON.stringify(json));
        return expression;
    }
    static toJson(filter: com.mapbox.mapboxsdk.style.expressions.Expression): any[] {
        if (!filter) {
            return null;
        }

        if (!(filter instanceof com.mapbox.mapboxsdk.style.expressions.Expression)) {
            throw new Error('Filter must be a Expression.');
        }

        return JSON.parse(filter.toString());
    }
}
