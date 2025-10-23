const Expression = com.mapbox.maps.extension.style.expressions.generated.Expression;

export class ExpressionParser {
    static parseJson(json: any[]): com.mapbox.maps.extension.style.expressions.generated.Expression {
        const expression = Expression.fromRaw(JSON.stringify(json));
        return expression;
    }
    static toJson(filter: com.mapbox.maps.extension.style.expressions.generated.Expression): any[] {
        if (!filter) {
            return null;
        }

        if (!(filter instanceof com.mapbox.maps.extension.style.expressions.generated.Expression)) {
            throw new Error('Filter must be a Expression.');
        }

        return JSON.parse(filter.toJson());
    }
}
