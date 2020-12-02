import { IFilterParser } from "./filter-parser.common";

export class FilterParser implements IFilterParser {
    private static readonly parserInstance = new FilterParser();

    parseJson(json: any[]): NSPredicate {
        const filterStr = NSString.stringWithString(JSON.stringify(json));
        const filterData = filterStr.dataUsingEncoding(NSUTF8StringEncoding);
        const filterJson = NSJSONSerialization.JSONObjectWithDataOptionsError(filterData, NSJSONReadingOptions.MutableContainers);
        const predicateFilter = (NSPredicate as any).predicateWithMGLJSONObject(filterJson);

        return predicateFilter;
    }

    toJson(filter: NSPredicate): Array<any> {
        if (!filter) {
            return null;
        }
        
        if (!(filter instanceof NSPredicate)) {
            throw "Filter must be a NSPredicate.";
        }

        const expressionObj = (filter as any).mgl_jsonExpressionObject;
        const data = NSJSONSerialization.dataWithJSONObjectOptionsError(expressionObj, 0);
        const expression: any = NSString.alloc().initWithDataEncoding(data, NSUTF8StringEncoding);

        return JSON.parse(expression);
    }

    static get(): FilterParser {
        return this.parserInstance;
    }
}