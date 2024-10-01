export class ExpressionParser {
    static parseJson(json: any[]): NSPredicate {
        const filterStr = NSString.stringWithString(JSON.stringify(json));
        const filterData = filterStr.dataUsingEncoding(NSUTF8StringEncoding);
        const filterJson = NSJSONSerialization.JSONObjectWithDataOptionsError(filterData, NSJSONReadingOptions.MutableContainers);
        const predicateFilter = (NSPredicate as any).predicateWithMGLJSONObject(filterJson);

        return predicateFilter;
    }

    static toJson(filter: NSPredicate): any[] {
        if (!filter) {
            return null;
        }

        if (!(filter instanceof NSPredicate)) {
            throw new Error('Filter must be a NSPredicate.');
        }

        const expressionObj = (filter as any).mgl_jsonExpressionObject;
        const data = NSJSONSerialization.dataWithJSONObjectOptionsError(expressionObj, 0 as any);
        const expression: any = NSString.alloc().initWithDataEncoding(data, NSUTF8StringEncoding);

        return JSON.parse(expression);
    }
}
