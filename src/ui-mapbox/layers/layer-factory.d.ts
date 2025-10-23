import { LayerCommon, LayerType } from '../common';

declare class LayerFactory {
    static createLayer(style, source): Promise<LayerCommon>;
    static applyLayerProperties(layer: any, properties: Record<string, any>);
}

export declare class Layer implements LayerCommon {
    id: string;
    private instance;
    constructor(instance: any);
    visibility(): boolean;
    show(): void;
    hide(): void;
    getNativeInstance(): any;
    setFilter(filter: any[]): void;
    getFilter(): any[];
    setProperty(name: string, value: any): void;
    getProperty(name: string): any;
    type(): LayerType;
}
