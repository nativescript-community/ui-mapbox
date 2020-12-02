import { IFilterParser } from "./filter-parser.common";

export class FilterParser implements IFilterParser {
    private static readonly parserInstance = new FilterParser();

    parseJson(json: any[]): com.mapbox.mapboxsdk.style.expressions.Expression {
        const expression = com.mapbox.mapboxsdk.style.expressions.Expression.Converter.convert(JSON.stringify(json));
        return expression;
    }
    toJson(filter: com.mapbox.mapboxsdk.style.expressions.Expression): any[] {
        if (!filter) {
            return null;
        }

        if (!(filter instanceof com.mapbox.mapboxsdk.style.expressions.Expression)) {
            throw "Filter must be a Expression.";
        }

        return JSON.parse(filter.toString());
    }

    static get(): FilterParser {
        return this.parserInstance;
    }
}