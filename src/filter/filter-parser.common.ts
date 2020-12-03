export interface IFilterParser {
    parseJson(json: any[]): any;
    toJson(filter: any): any[];
}
