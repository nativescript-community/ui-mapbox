import { LayerCommon } from '..';

declare class LayerFactory {
    static createLayer(style, source): Promise<LayerCommon>;
}