export interface IFilterParser {
    parseJson(json: Array<any>): any;
    toJson(filter: any): Array<any>;
}