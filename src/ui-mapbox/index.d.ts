import { ImageSource } from '@nativescript/core';
import {
    AddExtrusionOptions,
    AddGeoJsonClusteredOptions,
    AddPolygonOptions,
    AddPolylineOptions,
    AddSourceOptions,
    AnimateCameraOptions,
    DeleteOfflineRegionOptions,
    DownloadOfflineRegionOptions,
    Feature,
    LatLng,
    LayerCommon,
    ListOfflineRegionsOptions,
    MapStyle,
    MapboxApi,
    MapboxCommon,
    MapboxMarker,
    MapboxViewBase,
    OfflineRegion,
    QueryRenderedFeaturesOptions,
    QuerySourceFeaturesOptions,
    SetCenterOptions,
    SetTiltOptions,
    SetViewportOptions,
    SetZoomLevelOptions,
    ShowOptions,
    TrackUserOptions,
    UpdateSourceOptions,
    UserLocation,
    UserLocationCameraMode,
    Viewport
} from './common';

// Export any shared classes, constants, etc.
export * from './common';

export declare function setLogLevel(level: 'none' | 'info' | 'debug' | 'error' | 'fault' | 'verbose'): void;
export declare class MapboxView extends MapboxViewBase {
    private nativeMapView;
    private delegate;
    private settings;
    private initialized;
    private initCountHack;
    setConfig(settings: any): void;
    getNativeMapView(): any;
    createNativeView(): object;
    onLoaded(): void;
    initNativeView(): void;
    disposeNativeView(): Promise<void>;
    getMapboxApi(): any;
    initMap(): void;
    onLayout(left: number, top: number, right: number, bottom: number): void;
}
export declare class Mapbox extends MapboxCommon implements MapboxApi {
    private _mapboxViewInstance;
    private eventCallbacks;
    private userLocationRenderMode;
    setMapboxViewInstance(mapboxViewInstance: any): void;
    initEventHandlerShim(settings: any, mapboxNativeViewInstance: any): void;
    onMapEvent(eventName: any, id: any, callback: any, nativeMapView?: any): void;
    offMapEvent(eventName: any, id: any, nativeMapView?: any): void;
    private checkForClickEvent;
    private _addMarkers;
    show(options: ShowOptions): Promise<any>;
    hide(): Promise<void>;
    unhide(): Promise<void>;
    destroy(nativeMap?: any): Promise<void>;
    onStart(nativeMap?: any): Promise<void>;
    onResume(nativeMap?: any): Promise<void>;
    onPause(nativeMap?: any): Promise<void>;
    onStop(nativeMap?: any): Promise<void>;
    onLowMemory(nativeMap?: any): Promise<void>;
    onDestroy(nativeMap?: any): Promise<void>;
    setMapStyle(style: string | MapStyle, nativeMap?: any): Promise<void>;
    getImage(imageId: string, nativeMap?: any): Promise<ImageSource>;
    addImage(imageId: string, imagePath: string, nativeMap?: any): Promise<void>;
    removeImage(imageId: string, nativeMap?: any): Promise<void>;
    addMarkers(markers: MapboxMarker[], nativeMap?: any): Promise<void>;
    removeMarkers(ids?: any, nativeMap?: any): Promise<void>;
    setCenter(options: SetCenterOptions, nativeMap?: any): Promise<void>;
    getCenter(nativeMap?: any): Promise<LatLng>;
    setZoomLevel(options: SetZoomLevelOptions, nativeMap?: any): Promise<void>;
    getZoomLevel(nativeMap?: any): Promise<number>;
    setTilt(options: SetTiltOptions, nativeMap?: any): Promise<void>;
    getTilt(nativeMap?: any): Promise<number>;
    getUserLocation(nativeMap?: any): Promise<UserLocation>;
    _stringToCameraMode(mode: UserLocationCameraMode): any;
    _stringToRenderMode(mode: any): any;
    showUserLocationMarker(options: any, nativeMap?: any): Promise<void>;
    hideUserLocationMarker(nativeMap?: any): Promise<void>;
    // changeUserLocationMarkerMode(renderModeString: any, cameraModeString: UserLocationCameraMode, nativeMap?: any): Promise<void>;
    forceUserLocationUpdate(location: any, nativeMap?: any): void;
    queryRenderedFeatures(options: QueryRenderedFeaturesOptions, nativeMap?: any): Promise<Feature[]>;
    querySourceFeatures(sourceId: string, options?: QuerySourceFeaturesOptions, nativeMap?: any): Promise<Feature[]>;
    addPolygon(options: AddPolygonOptions, nativeMap?: any): Promise<void>;
    addPolyline(options: AddPolylineOptions, nativeMap?: any): Promise<void>;
    private removePolyById;
    private removePolys;
    removePolygons(ids?: any[], nativeMap?: any): Promise<void>;
    removePolylines(ids?: any[], nativeMap?: any): Promise<void>;
    animateCamera(options: AnimateCameraOptions, nativeMap?: any): Promise<void>;
    setOnMapClickListener(listener: (data: LatLng) => void, nativeMap?: any): Promise<void>;
    setOnMapLongClickListener(listener: (data: LatLng) => void, nativeMap?: any): Promise<void>;
    setOnScrollListener(listener: (data?: LatLng) => void, nativeMap?: any): Promise<void>;
    setOnMoveBeginListener(listener: (data?: LatLng) => void, nativeMap?: any): Promise<void>;
    setOnFlingListener(listener: () => void, nativeMap?: any): Promise<void>;
    setOnCameraMoveListener(listener: (reason: any, animated?: any) => void, nativeMap?: any): Promise<void>;
    setOnCameraMoveCancelListener(listener: () => void, nativeMap?: any): Promise<void>;
    setOnMapIdleListener(listener: () => void, nativeMap?: any): Promise<void>;
    getViewport(nativeMap?: any): Promise<Viewport>;
    setViewport(options: SetViewportOptions, nativeMap?: any): Promise<void>;
    downloadOfflineRegion(options: DownloadOfflineRegionOptions): Promise<void>;
    listOfflineRegions(options?: ListOfflineRegionsOptions): Promise<OfflineRegion[]>;
    deleteOfflineRegion(options: DeleteOfflineRegionOptions): Promise<void>;
    addExtrusion(options: AddExtrusionOptions, nativeMap?: any): Promise<void>;
    updateSource(id: string, options: UpdateSourceOptions, nativeMap?: any): Promise<unknown>;
    addSource(id: string, options: AddSourceOptions, nativeMap?: any): Promise<void>;
    removeSource(id: string, nativeMap?: any): Promise<void>;
    addLayer(style: any, belowLayerId?: string, nativeMapView?: any): Promise<void>;
    removeLayer(id: string, nativeMapViewInstance?: any): Promise<void>;
    addLinePoint(id: string, lnglat: any, sourceId?: string, nativeMapView?: any): Promise<void>;
    addGeoJsonClustered(options: AddGeoJsonClusteredOptions, nativeMapViewInstance?: any): Promise<void>;
    trackUser(options: TrackUserOptions, nativeMap?: any): Promise<void>;
    getLayer(name: string, nativeMap?: any): Promise<LayerCommon>;
    getLayers(nativeMap?: any): Promise<LayerCommon[]>;
    project(data: LatLng): {
        x: number;
        y: number;
    };
    projectBack(screenCoordinate: { x: number; y: number }): LatLng;
}
