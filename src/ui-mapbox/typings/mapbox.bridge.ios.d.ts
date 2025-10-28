declare class MapboxBridge extends NSObject {
  coordinateToPoint(lat: number, lng: number): string
  pointToCoordinate(x: number, y: number): string

  static alloc(): MapboxBridge;
  static new(): MapboxBridge;

  static bridgeFor(mapboxView: MapView): MapboxBridge;

  static MapLoadedNotification: string;
  static StyleLoadedNotification: string;
  static MapClickNotification: string;
  static MapLongPressNotification: string;
  static AnnotationTapNotification: string;
  static CameraChangedNotification: string;
  static CameraIdleNotification: string;
  static MapScrollNotification: string;
  static MapMoveBeginNotification: string;
  static MapMoveEndNotification: string;
  static MapFlingNotification: string;
  static CameraMoveCancelNotification: string;
  static OfflineProgressNotification: string;
  static OfflineCompleteNotification: string;
  static UserLocationUpdatedNotification: string;
  static UserTrackingStateChangedNotification: string;

  createMap(x: number, y: number, width: number, height: number, accessToken: string, styleURI?: string, mapOptions: string): UIView;
  getMapView(): MapView;
  show(): void;
  hide(): void;
  destroy(): void;

  setStyle(styleURIOrURL: string, completion: (success: boolean, error?: any) => void): void;

  addImage(imageId: string, image: any): void;
  removeImage(imageId: string): void;

  addMarkers(markers: string): void;
  removeMarkers(ids?: string): void;
  updateMarkerPosition(markerId: string, lat: number, lng: number): boolean;

  setCenter(lat: number, lng: number, animated: boolean): void;
  getCenter(): NSDictionary;
  setZoom(zoom: number, animated: boolean): void;
  getZoom(): number | null;

  animateCamera(optionsJSON: string): void;

  getViewport(): NSDictionary;
  setViewport(optionsJSON: string): boolean;
  setOnCameraChangeListener(callback: (info: any) => void): void;

  queryRenderedFeaturesAtPoint(point: string, layerIds?: NSArray<string> | string[] | null, completion?: (result: string | null) => void);

  /**
   * New async/native call:
   * querySourceFeaturesAsync(sourceId, optionsJSON, completion) -> Cancelable
   * - optionsJSON: optional JSON string containing { filter: <expression-array>, sourceLayer: string, ... }
   * - completion: invoked with JSON string of features or null on error
   * Returns: a Cancelable token (typed as any here)
   */
  querySourceFeatures(sourceId: string, optionsJSON?: string | null, completion?: (result: string | null) => void): any;


  addSourceGeoJSON(sourceId: string, geojson: string): boolean;
  updateSourceGeoJSON(sourceId: string, geojson: string): boolean;
  removeSource(sourceId: string): boolean;

  removeLayer(layerId: string): boolean;

  addPolyline(id: string, coordsJSON: string, optionsJSON?: string | null): boolean;
  addPolygon(id: string, coordsJSON: string, optionsJSON?: string | null): boolean;
  addLinePoint(id: string, latlng: string, sourceId?): boolean;
  removePolygons(ids?: NSArray<string> | string[] | null): boolean;
  removePolylines(ids?: NSArray<string> | string[] | null): boolean;

  addViewAnnotationForMarker(markerId: string, view: UIView, lat: number, lng: number): boolean;
  updateViewAnnotationForMarker(markerId: string, lat: number, lng: number): boolean;
  removeViewAnnotationForMarker(markerId: string): boolean;
  hasViewAnnotationForMarker(markerId: string): boolean;
  showAnnotationForMarker(markerId: string)

  downloadOfflineRegion(optionsJSON: string, progress: (info: any) => void, completion: (success: boolean, error?: any) => void): void;
  listOfflineRegions(callback:(res)=>void): string | null;
  deleteOfflineRegion(idOrName: string): void;

  // user location & tilt
  showUserLocationMarker(optionsJSON: string);
  hideUserLocationMarker(): void;
  forceUserLocationUpdate(): boolean;
  getTilt(): number | null;
  setTilt(tilt: number, animated: boolean): void;
  getUserLocation(): NSDictionary | null;

  stopTrackingUser(): void;

  // added/updated methods
  getLayer(layerId: string): string | null;
  getLayers(): string | null;
  getImage(imageId: string): UIImage | null;
}

/**
 * Native helpers exported by Swift (renamed in Swift to avoid TS naming collisions).
 * These are optional: the TS shims will call into them when present.
 */
declare class NativeLayerFactory extends NSObject {
  static createLayer(mapboxView: MapView, id:string, layerJSON: string, belowLayerId: string): boolean;
  static applyLayerProperties(mapboxView: MapView, layerId: string, properties: NSDictionary<any, any>): boolean;
  static setLayerProperty(mapboxView: MapView, layerId: string, name: string, value: any): boolean;
  static getLayerProperty(mapboxView: MapView, layerId: string, name: string): any;
  static getLayerType(mapboxView: MapView, layerId: string): string;
  static setLayerVisibility(mapboxView: MapView, layerId: string, visible: boolean): boolean;
  static getLayers(mapboxView: MapView): string;
  static getLayer(mapboxView: MapView, layerId): string;
}

declare class NativeExpressionParser extends NSObject {
  /**
   * parseJson: accepts an NSArray (JS array) representing the Mapbox expression JSON.
   * Returns an opaque NSPredicate (any) or null if not available.
   */
  static parseJson(jsonExpression: NSArray<any>): any | null;
  /**
   * toJson: accepts an opaque NSPredicate and returns an NSArray (expression JSON) or null.
   */
  static toJson(predicate: any): NSArray<any> | null;
}