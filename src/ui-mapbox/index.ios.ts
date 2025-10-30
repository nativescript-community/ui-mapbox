// src/ui-mapbox/index.ios.ts
// Full iOS TypeScript bridge for MapboxBridge (MapboxMaps + TileStore).
// - Adds addGeoJsonClustered and addExtrusion (ported behavior).
// - querySourceFeatures now passes filter JSON to native bridge so the native SDK can apply filtering.
// - Uses LayerFactory and ExpressionParser TS shims (delegate to native helpers when available).
//
// Replace your existing file with this full implementation.

import { Application, Color, ContentView, GestureTypes, Http, ImageSource, Label, Screen, StackLayout, Trace, Utils, View } from '@nativescript/core';
import {
    AddExtrusionOptions,
    AddGeoJsonClusteredOptions,
    AddPolygonOptions,
    AddPolylineOptions,
    AddSourceOptions,
    AnimateCameraOptions,
    CLog,
    CLogTypes,
    DeleteOfflineRegionOptions,
    DownloadOfflineRegionOptions,
    Feature,
    LatLng,
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
    SetViewportOptions,
    SetZoomLevelOptions,
    ShowOptions,
    TrackUserOptions,
    UpdateSourceOptions,
    UserLocation,
    telemetryProperty
} from './common';
import { Layer, LayerFactory } from './layers//layer-factory.ios';
import { createInfoWindowView } from './markers/Marker.common';

export * from './common';

// Notification names (must match Swift constants)
const MAPBOX_BRIDGE_MAP_LOADED = 'MapboxBridgeMapLoaded';
const MAPBOX_BRIDGE_STYLE_LOADED = 'MapboxBridgeStyleLoaded';
const MAPBOX_BRIDGE_MAP_CLICK = 'MapboxBridgeMapClick';
const MAPBOX_BRIDGE_MAP_LONGPRESS = 'MapboxBridgeMapLongPress';
const MAPBOX_BRIDGE_ANNOTATION_TAP = 'MapboxBridgeAnnotationTap';
const MAPBOX_BRIDGE_CAMERA_CHANGED = 'MapboxBridgeCameraChanged';
const MAPBOX_BRIDGE_CAMERA_IDLE = 'MapboxBridgeCameraIdle';
const MAPBOX_BRIDGE_MAP_SCROLL = 'MapboxBridgeMapScroll';
const MAPBOX_BRIDGE_MAP_MOVE_BEGIN = 'MapboxBridgeMapMoveBegin';
const MAPBOX_BRIDGE_MAP_MOVE_END = 'MapboxBridgeMapMoveEnd';
const MAPBOX_BRIDGE_MAP_FLING = 'MapboxBridgeMapFling';
const MAPBOX_BRIDGE_CAMERA_MOVE_CANCEL = 'MapboxBridgeCameraMoveCancel';
const MAPBOX_BRIDGE_OFFLINE_PROGRESS = 'MapboxBridgeOfflineProgress';
const MAPBOX_BRIDGE_OFFLINE_COMPLETE = 'MapboxBridgeOfflineComplete';

type ObserverToken = any;

@NativeClass
class UIViewAutoSizeUIViewAutoSize extends UIView {
    _view: WeakRef<View>;
    systemLayoutSizeFittingSize(boundsSize: CGSize) {
        const view = this._view?.get();
        if (!view) {
            return CGSizeZero;
        }
        const widthSpec = Utils.layout.makeMeasureSpec(Math.max(Screen.mainScreen.widthPixels, Utils.layout.toDevicePixels(boundsSize.width)), Utils.layout.AT_MOST);
        const heighthSpec = Utils.layout.makeMeasureSpec(Math.max(Screen.mainScreen.widthPixels, Utils.layout.toDevicePixels(boundsSize.height)), Utils.layout.AT_MOST);
        const measuredSize = View.measureChild(null, view, widthSpec, heighthSpec);
        view.setMeasuredDimension(measuredSize.measuredWidth, measuredSize.measuredHeight);
        const size = CGSizeMake(Utils.layout.toDeviceIndependentPixels(measuredSize.measuredWidth), Utils.layout.toDeviceIndependentPixels(measuredSize.measuredHeight));
        return size;
    }
    layoutSubviews() {
        const view = this._view?.get();
        if (!view) {
            return;
        }
        const frame = this.frame;
        const size = this.frame.size;
        View.layoutChild(null, view, 0, 0, Utils.layout.toDevicePixels(size.width), Utils.layout.toDevicePixels(size.height));
        // this.frame = frame;
    }
}

function createUIViewAutoSizeUIViewAutoSize(view: View) {
    const self = UIViewAutoSizeUIViewAutoSize.new() as UIViewAutoSizeUIViewAutoSize;
    view['iosIgnoreSafeArea'] = true;
    view._setupAsRootView({});
    view.parent = Application.getRootView();
    view._isAddedToNativeVisualTree = true;
    view.callLoaded();
    self._view = new WeakRef(view);
    self.addSubview(view.nativeViewProtected);
    (view.nativeViewProtected as UIView).autoresizingMask = UIViewAutoresizing.FlexibleWidth | UIViewAutoresizing.FlexibleHeight;
    return self;
}

// Local caches and helpers
let _markers: MapboxMarker[] = [];
const _markerIconDownloadCache: any = {};

function getIosColor(color: string | Color): number {
    const temp = color instanceof Color ? color : new Color(color);
    if (Color.isValid(temp)) {
        return temp.argb;
    } else {
        return new Color('black').argb;
    }
}

async function fetchImageIOS(imagePath: string): Promise<any> {
    try {
        if (!imagePath) return null;
        if (_markerIconDownloadCache[imagePath]) return _markerIconDownloadCache[imagePath];
        const img = await Http.getImage(imagePath);
        if (img?.ios) {
            _markerIconDownloadCache[imagePath] = img.ios;
            return img.ios;
        }
    } catch (e) {
        // ignore
    }
    return null;
}

function convertToJSON(data: NSDictionary<string, any>) {
    return data ? JSON.parse(data.objectForKey?.('data') ?? data) : {};
}

// ---------------------- MapboxView ----------------------

export class MapboxView extends MapboxViewBase {
    private nativeMapView: any = null;
    mapbox: Mapbox;
    private settings: any = null;
    private initialized = false;
    private initCountHack = 50;

    setConfig(settings: any) {
        if (settings.zoomLevel && !settings.center) {
            // Eiffel tower, Paris
            settings.center = {
                lat: 48.858093,
                lng: 2.294694
            };
        }
        this.settings = settings;
    }
    getNativeMapView(): any {
        return this.nativeMapView;
    }

    public createNativeView(): object {
        if (Trace.isEnabled()) {
            CLog(CLogTypes.info, 'createNativeView(): top');
        }
        return super.createNativeView();
    }

    public onLoaded() {
        super.onLoaded();
        // if (this.telemetry === false) NSUserDefaults.standardUserDefaults.setBoolForKey(false, 'MGLMapboxMetricsEnabled');
        if (!this.initialized) {
            this.initMap();
            this.initialized = true;
        }
    }

    public initNativeView(): void {
        super.initNativeView();
        if (Trace.isEnabled()) {
            CLog(CLogTypes.info, 'initNativeView(): on - loaded');
        }
        this.nativeView.owner = this;
    }

    async disposeNativeView(): Promise<void> {
        this.nativeView.owner = null;
        if (this.mapbox) await this.mapbox.destroy();
        super.disposeNativeView();
    }

    getMapboxApi(): any {
        return this.mapbox;
    }

    initMap(): void {
        if (Trace.isEnabled()) {
            CLog(CLogTypes.info, 'initMap() top');
        }

        if (!this.settings && !this.config.accessToken) {
            if (this.initCountHack > 50) return;
            setTimeout(() => this.initMap(), 50);
            this.initCountHack++;
            return;
        }
        if (!this.settings) this.settings = Mapbox.merge(this.config, Mapbox.defaults);
        else this.settings = Mapbox.merge(this.settings, Mapbox.defaults);

        if (!this.nativeMapView) {
            this.mapbox = new Mapbox(this);
            const options = {
                parentView: this.nativeView,
                onLocationPermissionGranted: (event) => {
                    this.notify({
                        eventName: MapboxViewBase.locationPermissionGrantedEvent,
                        object: this,
                        map: this,
                        ios: this.nativeMapView
                    });
                },
                onLocationPermissionDenied: (event) => {
                    this.notify({
                        eventName: MapboxViewBase.locationPermissionDeniedEvent,
                        object: this,
                        map: this,
                        ios: this.nativeMapView
                    });
                },
                onMapReady: (view: MapView) => {
                    this.nativeMapView = view;
                    // if (this.telemetry === false) {
                    //     com.nativescript.mapbox.Telemetry.setUserTelemetryRequestState(this.nativeMapView, false);
                    // }
                    if (Trace.isEnabled()) {
                        CLog(CLogTypes.info, 'initMap(): onMapReady event - calling notify with the MapboxViewBase.mapReadyEvent');
                    }

                    if (this.hasListeners(MapboxViewBase.mapReadyEvent)) {
                        if (Trace.isEnabled()) {
                            CLog(CLogTypes.info, 'initMap(): onMapReady has listeners.');
                        }
                    } else {
                        if (Trace.isEnabled()) {
                            CLog(CLogTypes.info, 'initMap(): onMapReady DOES NOT HAVE listeners.');
                        }
                    }

                    this.notify({
                        eventName: MapboxViewBase.mapReadyEvent,
                        object: this,
                        map: this,
                        ios: this.nativeMapView
                    });
                },
                onScrollEvent: (event) => {
                    if (Trace.isEnabled()) {
                        CLog(CLogTypes.info, 'initMap(): onScrollEvent event:' + JSON.stringify(event));
                    }

                    this.notify({
                        eventName: MapboxViewBase.scrollEvent,
                        object: this,
                        event,
                        map: this,
                        ios: this.nativeMapView
                    });
                },
                onMoveBeginEvent: (event) => {
                    if (Trace.isEnabled()) {
                        CLog(CLogTypes.info, 'initMap(): onMoveBeginEvent event');
                    }

                    this.notify({
                        eventName: MapboxViewBase.moveBeginEvent,
                        object: this,
                        event,
                        map: this,
                        ios: this.nativeMapView
                    });
                },
                onMoveEndEvent: (event) => {
                    if (Trace.isEnabled()) {
                        CLog(CLogTypes.info, 'initMap(): onMoveEndEvent event');
                    }

                    this.notify({
                        eventName: MapboxViewBase.moveEndEvent,
                        object: this,
                        event,
                        map: this,
                        ios: this.nativeMapView
                    });
                }
            };
            this.settings = Mapbox.merge(this.settings, options);
            const drawMap = () => {
                if (Trace.isEnabled()) {
                    CLog(CLogTypes.info, 'drawMap()');
                }
                this.mapbox.show(this.settings);

                // _setMapboxMapOptions(this.nativeMapView, this.settings);
                // _markers = [];
                // this.nativeView.addSubview(this.nativeMapView);
                // this.mapbox.setMapboxViewInstance(this.nativeMapView);
            };

            setTimeout(drawMap, this.settings.delay ? this.settings.delay : 0);
        }
    }

    public onLayout(left: number, top: number, right: number, bottom: number): void {
        super.onLayout(left, top, right, bottom);
        if (this.nativeMapView) this.nativeMapView.layer.frame = this.ios.layer.bounds;
    }

    [telemetryProperty.setNative](value: boolean) {
        NSUserDefaults.standardUserDefaults.setBoolForKey(false, 'MGLMapboxMetricsEnabled');
    }
}

// ----------------------- Mapbox TS API -----------------------

export class Mapbox extends MapboxCommon implements MapboxApi {
    private _mapboxViewInstance: any;
    private bridgeInstance: MapboxBridge;
    private eventCallbacks: { [key: string]: any[] } = {};
    private _markers: MapboxMarker[] = [];
    private _observerTokens: ObserverToken[] = [];
    _reusableCalloutView: StackLayout = null;

    private _programmaticMapView: UIView = null;

    setMapboxViewInstance(m: any) {
        this._mapboxViewInstance = m;
    }

    onMapEvent(eventName: string, id: string, callback: any, nativeMapView?: any) {
        if (typeof this.eventCallbacks[eventName] === 'undefined') this.eventCallbacks[eventName] = [];
        this.eventCallbacks[eventName].push({ id, callback });
    }

    offMapEvent(eventName: string, id: string, nativeMapView?: any) {
        if (typeof this.eventCallbacks[eventName] === 'undefined') return;
        this.eventCallbacks[eventName] = this.eventCallbacks[eventName].filter((entry) => entry.id !== id);
    }

    private checkForClickEvent(point: LatLng & { x: number; y: number }, nativeMap?: any) {
        if (Trace.isEnabled()) {
            CLog(CLogTypes.info, 'setOnMapClickListener(): click event at point:', point);
        }
        this.eventCallbacks['click'] &&
            this.eventCallbacks['click'].forEach((eventListener) => {
                if (Trace.isEnabled()) {
                    CLog(CLogTypes.info, 'checkForClickEvent():', eventListener.id);
                }
                this.queryRenderedFeatures({ point, layers: [eventListener.id] }, nativeMap)
                    .then((response) => {
                        if (Trace.isEnabled()) {
                            CLog(CLogTypes.info, 'checkForClickEvent: queryRenderedFeatures:', response);
                        }
                        if (response.length > 0) eventListener.callback(response);
                    })
                    .catch((err) => console.error('click error ', eventListener.id, err, err.stack));
            });
        this.view && this.view.notify({ eventName: 'mapClick', object: this.view, point });
        return false;
    }

    // ---------------- lifecycle & programmatic ----------------

    initEventHandlerShim(settings, mapboxNativeViewInstance: any) {
        if (Trace.isEnabled()) {
            CLog(CLogTypes.info, 'initEventHandlerShim(): top');
        }
        this.setOnMapClickListener((point: LatLng & { x: number; y: number }) => {
            if (this.selectedMarker) {
                this.deselectMarker(this.selectedMarker);
                return;
            }
            this.checkForClickEvent(point);
        }, mapboxNativeViewInstance);

        this.addNotificationCenterObserver(MAPBOX_BRIDGE_ANNOTATION_TAP, mapboxNativeViewInstance, (e) => this.onNativeAnnotationTap(e));

        this.setOnMoveBeginListener((point: LatLng) => {
            if (Trace.isEnabled()) {
                CLog(CLogTypes.info, 'initEventHandlerShim(): moveBegin:', point);
            }

            if (typeof settings.onMoveBeginEvent != 'undefined') {
                settings.onMoveBeginEvent(point);
            }
        }, mapboxNativeViewInstance);

        this.setOnMoveEndListener((point: LatLng) => {
            if (Trace.isEnabled()) {
                CLog(CLogTypes.info, 'initEventHandlerShim(): moveEnd:', point);
            }

            if (typeof settings.onMoveEndEvent != 'undefined') {
                settings.onMoveEndEvent(point);
            }
        }, mapboxNativeViewInstance);

        this.setOnScrollListener((point: LatLng) => {
            if (Trace.isEnabled()) {
                CLog(CLogTypes.info, 'initEventHandlerShim(): move:', point);
            }

            if (typeof settings.onScrollEvent != 'undefined') {
                settings.onScrollEvent(point);
            }
        }, mapboxNativeViewInstance);
    }

    async show(options: ShowOptions): Promise<any> {
        // Implementation same as earlier merged file; create programmatic map instance
        return new Promise((resolve, reject) => {
            try {
                if (Trace.isEnabled()) {
                    CLog(CLogTypes.info, 'show');
                }
                const settings: ShowOptions = Mapbox.merge(options, Mapbox.defaults);
                if (!settings.accessToken) {
                    reject("Please set the 'accessToken' parameter");
                    return;
                }

                if (this._programmaticMapView) {
                    try {
                        this._programmaticMapView.removeFromSuperview();
                    } catch (e) {
                        console.error(e, e.stack);
                    }
                    this._programmaticMapView = null;
                }

                const bridge = (this.bridgeInstance = MapboxBridge.alloc().init());
                const view = options.parentView || UIApplication.sharedApplication.keyWindow.rootViewController.view;
                const frameRect = view.frame;
                const mapFrame = CGRectMake(
                    settings.margins?.left ?? 0,
                    settings.margins?.top ?? 0,
                    frameRect.size.width - (settings.margins?.left ?? 0) - (settings.margins?.right ?? 0),
                    frameRect.size.height - (settings.margins?.top ?? 0) - (settings.margins?.bottom ?? 0)
                );
                const style = typeof settings.style === 'string' ? settings.style : settings.style || 'streets';
                const { center, disableRotation, disableScroll, disableTilt, disableZoom, hideAttribution, hideLogo, showUserLocation, zoomLevel, ...others } = settings;

                const nativeMap = bridge.createMap(
                    mapFrame.origin.x,
                    mapFrame.origin.y,
                    mapFrame.size.width,
                    mapFrame.size.height,
                    settings.accessToken,
                    style,
                    JSON.stringify({
                        zoomLevel,
                        center,
                        hideLogo,
                        hideAttribution,
                        disableRotation,
                        disableScroll,
                        disableZoom,
                        disableTilt,
                        showUserLocation
                    })
                );
                nativeMap.autoresizingMask = UIViewAutoresizing.FlexibleWidth | UIViewAutoresizing.FlexibleHeight;

                _markers = [];
                this.addMarkers(settings.markers);
                // setTimeout(() => view.addSubview(nativeMap), 0);
                view.addSubview(nativeMap);
                this.setMapboxViewInstance(nativeMap);

                if (settings.showUserLocation) {
                    this.showUserLocationMarker({ cameraMode: 'NONE' });
                }

                this.initEventHandlerShim(settings, this._mapboxViewInstance);
                if (settings.onMapReady) {
                    settings.onMapReady(this._mapboxViewInstance);
                }
                resolve({ ios: nativeMap });
            } catch (ex) {
                if (Trace.isEnabled()) {
                    CLog(CLogTypes.error, 'show:', ex, ex.stack);
                }
                reject(ex);
            }
        });
    }

    hide(): Promise<void> {
        return new Promise((resolve, reject) => {
            try {
                if (this._programmaticMapView) {
                    this._programmaticMapView.hidden = true;
                }
                resolve();
            } catch (ex) {
                reject(ex);
            }
        });
    }

    unhide(): Promise<void> {
        return new Promise((resolve, reject) => {
            try {
                if (this._programmaticMapView) {
                    this._programmaticMapView.hidden = false;
                    resolve();
                } else reject('No map found');
            } catch (ex) {
                reject(ex);
            }
        });
    }

    destroy(nativeMap?: any): Promise<void> {
        return new Promise((resolve, reject) => {
            try {
                const theMap: any = nativeMap || this._mapboxViewInstance || this._programmaticMapView;
                if (theMap) {
                    try {
                        theMap.removeFromSuperview();
                    } catch (e) {
                        console.error(e, e.stack);
                    }
                }
                if (this._programmaticMapView) {
                    this._programmaticMapView = null;
                }
                const bridge = MapboxBridge.bridgeFor(theMap);
                bridge.destroy();
                if (bridge === this.bridgeInstance) {
                    this.bridgeInstance = null;
                }
                try {
                    this._observerTokens.forEach((t) => {
                        try {
                            NSNotificationCenter.defaultCenter.removeObserver(t);
                        } catch (e) {
                            console.error(e, e.stack);
                        }
                    });
                    this._observerTokens = [];
                } catch (e) {
                    console.error(e, e.stack);
                }

                if (this._reusableCalloutView) {
                    this._reusableCalloutView._tearDownUI();
                    this._reusableCalloutView = null;
                }
                resolve();
            } catch (ex) {
                reject(ex);
            }
        });
    }

    // ---------------- Images ----------------

    async addImage(imageId: string, imagePath: string, nativeMap?: any): Promise<void> {
        return new Promise(async (resolve, reject) => {
            try {
                const b = nativeMap ? MapboxBridge.bridgeFor(nativeMap) : this.bridgeInstance;
                if (!b) {
                    reject('No bridge available');
                    return;
                }
                let imageSource: ImageSource | null = null;
                try {
                    imageSource = ImageSource.fromFileOrResourceSync(imagePath);
                } catch (e) {
                    console.error('error adding image:', e, e.stack);
                    imageSource = null;
                }
                if (!imageSource) {
                    const httpImg = await Http.getImage(imagePath).catch(() => null);
                    if (!httpImg || !httpImg.ios) {
                        reject('Unable to fetch image');
                        return;
                    }
                    b.addImage(imageId, httpImg.ios);
                    resolve();
                    return;
                }
                b.addImage(imageId, imageSource.ios);
                resolve();
            } catch (ex) {
                reject(ex);
            }
        });
    }

    async removeImage(imageId: string, nativeMap?: any): Promise<void> {
        return new Promise((resolve, reject) => {
            try {
                const b = nativeMap ? MapboxBridge.bridgeFor(nativeMap) : this.bridgeInstance;
                if (!b) {
                    reject('No bridge available');
                    return;
                }
                b.removeImage(imageId);
                resolve();
            } catch (ex) {
                reject(ex);
            }
        });
    }

    // ---------------- Markers ----------------

    async addMarkers(markers: MapboxMarker[], nativeMap?: any): Promise<void> {
        return new Promise(async (resolve, reject) => {
            try {
                const b = nativeMap ? MapboxBridge.bridgeFor(nativeMap) : this.bridgeInstance;
                if (!b) {
                    reject('No bridge available');
                    return;
                }

                const updated = await Promise.all(
                    markers.map(async (m) => {
                        if (m.icon && typeof m.icon === 'string' && m.icon.startsWith('http')) {
                            (m as any).iconDownloaded = await fetchImageIOS(m.icon);
                        }
                        return m;
                    })
                );

                updated.forEach((m) => {
                    if (typeof m?.icon === 'string' && (m as any).iconDownloaded) {
                        try {
                            b.addImage(m.icon, (m as any).iconDownloaded);
                            delete (m as any).iconDownloaded;
                        } catch (e) {
                            console.error(e, e.stack);
                        }
                    }
                });
                let firstId = Date.now() * 1000;
                let markerToSelect: MapboxMarker;
                updated.forEach((marker) => {
                    marker.id = marker.id ?? firstId++;
                    if (marker.id && !this._markers.find((mm) => mm.id === marker.id)) this._markers.push(marker);
                    if (marker.selected) {
                        markerToSelect = marker;
                    }
                    marker.update = (newSettings: MapboxMarker) => {
                        const _marker = this._markers.find((m) => m.id === marker.id);
                        if (_marker) {
                            if (newSettings.onTap !== undefined) {
                                _marker.onTap = newSettings.onTap;
                            }
                            if (newSettings.onCalloutTap !== undefined) {
                                _marker.onCalloutTap = newSettings.onCalloutTap;
                            }
                            if (newSettings.title !== undefined) {
                                _marker.title = newSettings.title;
                            }
                            if (newSettings.subtitle !== undefined) {
                                _marker.subtitle = newSettings.subtitle;
                            }
                            if (newSettings.lat && newSettings.lng) {
                                _marker.lat = newSettings.lat;
                                _marker.lng = newSettings.lng;
                                b.updateMarkerPosition(_marker.id + '', newSettings.lat, newSettings.lng);
                            }
                            if (newSettings.selected || this.isMarkerSelected(_marker)) {
                                // this will also update callout position
                                this.selectMarker(_marker);
                            }
                        }
                    };
                });

                b.addMarkers(JSON.stringify(updated));
                if (markerToSelect) {
                    this.selectMarker(markerToSelect);
                }
                resolve();
            } catch (ex) {
                reject(ex);
            }
        });
    }
    selectedMarker: MapboxMarker;

    isMarkerSelected(marker: MapboxMarker) {
        return this.selectedMarker === marker || this.selectedMarker?.id === marker.id;
    }
    async deselectMarker(marker: MapboxMarker) {
        if (this.isMarkerSelected(marker)) {
            this.hideCalloutForMarkerById(marker.id + '');
            this.selectedMarker = null;
        }
    }
    selectMarker(marker: MapboxMarker) {
        return new Promise<void>(async (resolve, reject) => {
            try {
                if (Trace.isEnabled()) {
                    CLog(CLogTypes.info, 'selectMarker():', marker.id);
                }
                if (this.selectedMarker && !this.isMarkerSelected(marker)) {
                    this.deselectMarker(this.selectedMarker);
                }
                await this.showCalloutForMarkerById(marker.id + '');
                resolve();
            } catch (ex) {
                if (Trace.isEnabled()) {
                    CLog(CLogTypes.error, 'selectMarker():', ex, ex.stack);
                }
                reject(ex);
            }
        });
    }

    removeMarkers(ids?: any, nativeMap?: any): Promise<void> {
        return new Promise((resolve, reject) => {
            try {
                const b = nativeMap ? MapboxBridge.bridgeFor(nativeMap) : this.bridgeInstance;
                if (!b) {
                    reject('No bridge available');
                    return;
                }
                b.removeMarkers(ids ? JSON.stringify(ids.map((id) => id + '')) : null);
                resolve();
            } catch (ex) {
                reject(ex);
            }
        });
    }

    updateMarkerPosition(markerId: string, lat: number, lng: number, nativeMap?: any): Promise<void> {
        return new Promise((resolve, reject) => {
            try {
                const b = nativeMap ? MapboxBridge.bridgeFor(nativeMap) : this.bridgeInstance;
                if (!b) {
                    reject('No bridge available');
                    return;
                }
                const ok = b.updateMarkerPosition ? b.updateMarkerPosition(markerId, lat, lng) : false;
                try {
                    if (b.updateViewAnnotationForMarker) b.updateViewAnnotationForMarker(markerId, lat, lng);
                } catch {}
                if (ok) resolve();
                else reject('Marker not found or failed to update');
            } catch (ex) {
                reject(ex);
            }
        });
    }

    // ---------------- Polylines ----------------

    addPolyline(options: AddPolylineOptions, nativeMap?: any): Promise<void> {
        return new Promise((resolve, reject) => {
            try {
                const b = nativeMap ? MapboxBridge.bridgeFor(nativeMap) : this.bridgeInstance;
                if (!b) {
                    reject('No bridge available');
                    return;
                }
                if (!options.points) {
                    reject("Please set the 'points' parameter");
                    return;
                }
                // const coords = options.points.map((p) => [p.lng, p.lat]);
                const coordsJSON = JSON.stringify(options.points.map((p) => [p.lng, p.lat]));
                const opts: any = { strokeColor: getIosColor(options.color), strokeWidth: options.width, strokeOpacity: options.opacity };
                const id = (options.id ?? new Date().getTime()) + '';
                const ok = b.addPolyline(id, coordsJSON, JSON.stringify(opts));
                if (ok) resolve();
                else reject('Failed to add polyline');
            } catch (ex) {
                reject(ex);
            }
        });
    }

    public async addLinePoint(id: string, lnglat, sourceId?: string, nativeMap?): Promise<void> {
        return new Promise((resolve, reject) => {
            try {
                const b = nativeMap ? MapboxBridge.bridgeFor(nativeMap) : this.bridgeInstance;
                if (!b) {
                    reject('No bridge available');
                    return;
                }
                const ok = b.addLinePoint(id, JSON.stringify(lnglat), sourceId);
                if (ok) resolve();
                else reject('Failed to add line point');
            } catch (ex) {
                reject(ex);
            }
        });
    }

    removePolylines(ids?: string[], nativeMap?: any): Promise<void> {
        return new Promise((resolve, reject) => {
            try {
                const b = nativeMap ? MapboxBridge.bridgeFor(nativeMap) : this.bridgeInstance;
                if (!b || !b.removePolylines) {
                    reject('No bridge available');
                    return;
                }
                const ok = b.removePolylines(ids ? ids.map((s) => s + '') : null);
                if (ok) resolve();
                else reject('Failed to remove polylines');
            } catch (ex) {
                reject(ex);
            }
        });
    }

    // ---------------- Polygons ----------------

    addPolygon(options: AddPolygonOptions, nativeMap?: any): Promise<void> {
        return new Promise((resolve, reject) => {
            try {
                const b = nativeMap ? MapboxBridge.bridgeFor(nativeMap) : this.bridgeInstance;
                if (!b) {
                    reject('No bridge available');
                    return;
                }
                if (!options.points) {
                    reject("Please set the 'points' parameter");
                    return;
                }
                // const coords = options.points.map((p) => [p.lng, p.lat]);
                const coordsJSON = JSON.stringify(options.points.map((p) => [p.lng, p.lat]));
                const opts: any = {
                    fillColor: getIosColor(options.fillColor),
                    fillOpacity: options.fillOpacity,
                    strokeColor: getIosColor(options.strokeColor),
                    strokeWidth: options.strokeWidth,
                    strokeOpacity: options.strokeOpacity
                };
                const id = (options.id ?? new Date().getTime()) + '';
                if (Trace.isEnabled()) {
                    CLog(CLogTypes.info, 'addPolygon:', id, coordsJSON, JSON.stringify(opts));
                }
                const ok = b.addPolygon(id, coordsJSON, JSON.stringify(opts));
                if (ok) resolve();
                else reject('Failed to add polygon');
            } catch (ex) {
                reject(ex);
            }
        });
    }

    // removePolygons / removePolylines (TS wrappers)
    removePolygons(ids?: string[], nativeMap?: any): Promise<void> {
        return new Promise((resolve, reject) => {
            try {
                const b = nativeMap ? MapboxBridge.bridgeFor(nativeMap) : this.bridgeInstance;
                if (!b) {
                    reject('No bridge available');
                    return;
                }
                const ok = b.removePolygons(ids ? ids.map((s) => s + '') : null);
                if (ok) resolve();
                else reject('Failed to remove polygons');
            } catch (ex) {
                reject(ex);
            }
        });
    }

    // ---------------- GeoJSON Clustered source helper ----------------
    // Adds a clustered GeoJSON source + layers for clusters and unclustered points.
    addGeoJsonClustered(options: AddGeoJsonClusteredOptions, nativeMap?: any): Promise<void> {
        return new Promise(async (resolve, reject) => {
            try {
                // options: id, data (geojson object or url), clusterRadius?, clusterMaxZoom?, clusterProperties?, layers styling...
                const b = nativeMap ? MapboxBridge.bridgeFor(nativeMap) : this.bridgeInstance;
                if (!b) {
                    reject('No bridge available');
                    return;
                }
                if (!options.id) {
                    reject("Please provide 'id'");
                    return;
                }

                const sourceId = options.id;
                let geojsonString: string | null = null;
                if (options.data) {
                    geojsonString = typeof options.data === 'string' ? options.data : JSON.stringify(options.data);
                } else if (options.url) {
                    // pass URL string as source (bridge.addSourceGeoJSON expects geojson text or url; uses same param)
                    geojsonString = options.url;
                } else {
                    reject("Please pass 'data' or 'url' in addGeoJsonClustered options");
                    return;
                }

                // Build source JSON for clustering
                const sourceObj: any = {
                    type: 'geojson',
                    data: options.data ? options.data : options.url,
                    cluster: true,
                    clusterRadius: typeof options.clusterRadius !== 'undefined' ? options.clusterRadius : 50,
                    clusterMaxZoom: typeof options.clusterMaxZoom !== 'undefined' ? options.clusterMaxZoom : 14
                };

                // use addSource (bridge.addSourceGeoJSON expects a geojson string, for clarity we'll add via bridge.addSourceGeoJSON)
                // Some bridge implementations expect raw geojson string; if url, pass as string url
                const sourceOk = b.addSourceGeoJSON(sourceId, JSON.stringify(sourceObj));
                if (!sourceOk) {
                    // fallback: try addSource with just data
                    try {
                        const ok2 = b.addSourceGeoJSON(sourceId, geojsonString || '');
                        if (!ok2) {
                            reject('Failed to add clustered source');
                            return;
                        }
                    } catch (e) {
                        reject('Failed to add clustered source: ' + e);
                        return;
                    }
                }

                // Create cluster layer (circle layer)
                const clusterLayer = {
                    id: sourceId + '_clusters',
                    type: 'circle',
                    source: sourceId,
                    filter: ['has', 'point_count'],
                    paint: {
                        'circle-color': ['step', ['get', 'point_count'], '#51bbd6', 100, '#f1f075', 750, '#f28cb1'],
                        'circle-radius': ['step', ['get', 'point_count'], 20, 100, 30, 750, 40]
                    }
                };

                // Count label for clusters
                const clusterCountLayer = {
                    id: sourceId + '_cluster-count',
                    type: 'symbol',
                    source: sourceId,
                    filter: ['has', 'point_count'],
                    layout: {
                        'text-field': '{point_count_abbreviated}',
                        'text-font': ['Open Sans Bold', 'Arial Unicode MS Bold'],
                        'text-size': 12
                    }
                };

                // Unclustered points layer
                const unclusteredLayer = {
                    id: sourceId + '_unclustered',
                    type: 'circle',
                    source: sourceId,
                    filter: ['!', ['has', 'point_count']],
                    paint: {
                        'circle-color': options.pointColor || '#11b4da',
                        'circle-radius': options.pointRadius || 6
                    }
                };

                // Add layers via LayerFactory / bridge
                const mapboxView: any = b.getMapView();
                if (!mapboxView) return { x: 0, y: 0 };
                // prefer native LayerFactory to create typed layers from JSON
                await LayerFactory.createLayer(mapboxView, clusterLayer, null);
                await LayerFactory.createLayer(mapboxView, clusterCountLayer, null);
                await LayerFactory.createLayer(mapboxView, unclusteredLayer, null);

                resolve();
            } catch (ex) {
                reject(ex);
            }
        });
    }

    // ---------------- Extrusion (3D buildings) ----------------
    // Ports the Android approach: add a FillExtrusion layer showing 3D buildings.
    addExtrusion(options: AddExtrusionOptions, nativeMap?: any): Promise<void> {
        return new Promise(async (resolve, reject) => {
            try {
                const b = nativeMap ? MapboxBridge.bridgeFor(nativeMap) : this.bridgeInstance;
                // Build a layer JSON representing the fill-extrusion layer similar to Android sample
                // Default values
                const layerId = options.id || '3d-buildings';
                const source = options.source || 'composite';
                const sourceLayer = options.sourceLayer || 'building';
                const minZoom = typeof options.minZoom !== 'undefined' ? options.minZoom : 15;

                // Build layer JSON
                const layerJson: any = {
                    id: layerId,
                    type: 'fill-extrusion',
                    source,
                    'source-layer': sourceLayer,
                    minzoom: minZoom,
                    filter: ['==', ['get', 'extrude'], true],
                    paint: {
                        'fill-extrusion-color': options.color || '#d3d3d3',
                        // Use a data-driven expression to read properties height/min_height
                        'fill-extrusion-height': ['get', 'height'],
                        'fill-extrusion-base': ['get', 'min_height'],
                        'fill-extrusion-opacity': typeof options.opacity !== 'undefined' ? options.opacity : 0.6
                    }
                };

                // Use LayerFactory to apply properties / add layer if possible
                try {
                    await LayerFactory.createLayer(b.getMapView(), layerJson, null);
                    resolve();
                    return;
                } catch (e) {
                    reject('Failed to add extrusion layer');
                }
            } catch (ex) {
                reject(ex);
            }
        });
    }

    // ---------------- Camera ----------------

    setCenter(options: SetCenterOptions, nativeMap?): Promise<void> {
        return new Promise((resolve, reject) => {
            try {
                const b = nativeMap ? MapboxBridge.bridgeFor(nativeMap) : this.bridgeInstance;
                if (!b) {
                    reject('No bridge available');
                    return;
                }
                const animated = options.animated === undefined || options.animated;
                b.setCenter(options.lat, options.lng, animated);
                resolve();
            } catch (ex) {
                reject(ex);
            }
        });
    }

    getCenter(nativeMap?): Promise<LatLng> {
        return new Promise((resolve, reject) => {
            try {
                const b = nativeMap ? MapboxBridge.bridgeFor(nativeMap) : this.bridgeInstance;
                if (!b) {
                    reject('No bridge available');
                    return;
                }
                const c = b.getCenter();
                if (!c) {
                    reject('No center found');
                    return;
                }
                resolve(JSON.parse(c));
            } catch (ex) {
                reject(ex);
            }
        });
    }

    setZoomLevel(options: SetZoomLevelOptions, nativeMap?): Promise<void> {
        return new Promise((resolve, reject) => {
            try {
                const b = nativeMap ? MapboxBridge.bridgeFor(nativeMap) : this.bridgeInstance;
                if (!b) {
                    reject('No bridge available');
                    return;
                }
                const animated = options.animated === undefined || options.animated;
                b.setZoom(options.level, animated);
                resolve();
            } catch (ex) {
                reject(ex);
            }
        });
    }

    getZoomLevel(nativeMap?): Promise<number> {
        return new Promise((resolve, reject) => {
            try {
                const b = nativeMap ? MapboxBridge.bridgeFor(nativeMap) : this.bridgeInstance;
                if (!b) {
                    reject('No bridge available');
                    return;
                }
                const z = b.getZoom();
                resolve(z);
            } catch (ex) {
                reject(ex);
            }
        });
    }

    setMapStyle(style: string | MapStyle, nativeMap?: any): Promise<void> {
        return new Promise((resolve, reject) => {
            try {
                const b = nativeMap ? MapboxBridge.bridgeFor(nativeMap) : this.bridgeInstance;
                if (!b) {
                    reject('No bridge available');
                    return;
                }
                const styleStr = typeof style === 'string' ? style : (style as any).toString();
                b.setStyle(styleStr, (success: boolean, error?: any) => {
                    if (success) resolve();
                    else reject(error && error.localizedDescription ? error.localizedDescription : error || 'Error setting style');
                });
            } catch (ex) {
                reject(ex);
            }
        });
    }

    animateCamera(options: AnimateCameraOptions, nativeMap?): Promise<void> {
        return new Promise((resolve, reject) => {
            try {
                const b = nativeMap ? MapboxBridge.bridgeFor(nativeMap) : this.bridgeInstance;
                if (!b) {
                    reject('No bridge available');
                    return;
                }

                options.duration = options.duration || 1000;
                b.animateCamera(JSON.stringify(options));
                setTimeout(() => {
                    resolve();
                }, options.duration);
            } catch (ex) {
                reject(ex);
            }
        });
    }

    // ---------------- Queries ----------------

    queryRenderedFeatures(options: QueryRenderedFeaturesOptions, nativeMap?): Promise<Feature[]> {
        return new Promise((resolve, reject) => {
            try {
                const b = nativeMap ? MapboxBridge.bridgeFor(nativeMap) : this.bridgeInstance;
                if (!b) {
                    reject('No bridge available');
                    return;
                }
                if (!options.point) {
                    reject("Please set the 'point' parameter");
                    return;
                }
                const screen = this.project({ lat: options.point.lat, lng: options.point.lng });
                if (Trace.isEnabled()) {
                    CLog(CLogTypes.info, 'queryRenderedFeatures:', options.point, screen);
                }
                b.queryRenderedFeaturesAtPoint(JSON.stringify(screen), options.layers, (ret) => {
                    if (ret) {
                        resolve(JSON.parse(ret));
                    } else {
                        resolve([]);
                    }
                });
            } catch (ex) {
                reject(ex);
            }
        });
    }

    // ---------------- Events, filters, queries ----------------

    // querySourceFeatures now calls native bridge querySourceFeatures which uses MapboxMaps native async API
    querySourceFeatures(sourceId: string, options?: QuerySourceFeaturesOptions, nativeMap?): Promise<Feature[]> {
        return new Promise((resolve, reject) => {
            try {
                const b = nativeMap ? MapboxBridge.bridgeFor(nativeMap) : this.bridgeInstance;
                if (!b) {
                    reject('No bridge available');
                    return;
                }

                if (Trace.isEnabled()) {
                    CLog(CLogTypes.info, 'querySourceFeatures:', sourceId, JSON.stringify(options));
                }

                const payload: any = {};
                if (options && options.filter) payload.filter = options.filter;
                if (options && options.sourceLayer) payload.sourceLayer = options.sourceLayer;

                // call native async method which returns a Cancelable token
                const cancelable = b.querySourceFeatures(sourceId, JSON.stringify(payload), (retJson: string | null) => {
                    if (!retJson) {
                        resolve([]);
                        return;
                    }
                    try {
                        const arr = JSON.parse(retJson) as Feature[];
                        resolve(arr);
                    } catch (err) {
                        reject(err);
                    }
                });

                // Optionally return cancelable to caller via resolved value? we keep the Promise focused on features.
                // If you want cancellation, you can expose the cancelable on another API or return { promise, cancelable }.
            } catch (ex) {
                reject(ex);
            }
        });
    }

    // ---------------- Sources / Layers / Geometry ----------------

    addSource(id: string, options: AddSourceOptions, nativeMap?: any): Promise<void> {
        return new Promise((resolve, reject) => {
            try {
                const b = nativeMap ? MapboxBridge.bridgeFor(nativeMap) : this.bridgeInstance;
                if (!b) {
                    reject('No bridge available');
                    return;
                }

                if (Trace.isEnabled()) {
                    CLog(CLogTypes.info, 'addSource:', id, JSON.stringify(options));
                }
                if (options.type === 'geojson') {
                    const geojson = options.data ? JSON.stringify(options.data) : options.url;
                    if (!geojson) {
                        reject('geojson source requires data or url');
                        return;
                    }
                    const ok = b.addSourceGeoJSON(id, geojson);
                    if (ok) resolve();
                    else reject('Failed to add source');
                } else reject('Only geojson source supported in bridge.addSource');
            } catch (ex) {
                reject(ex);
            }
        });
    }

    updateSource(id: string, options: UpdateSourceOptions, nativeMap?): Promise<void> {
        return new Promise((resolve, reject) => {
            try {
                const b = nativeMap ? MapboxBridge.bridgeFor(nativeMap) : this.bridgeInstance;
                if (!b) {
                    reject('No bridge available');
                    return;
                }
                if (options.type === 'geojson') {
                    const data = JSON.stringify(options.data);
                    const ok = b.updateSourceGeoJSON(id, data);
                    if (ok) resolve();
                    else reject('Failed to update source');
                } else reject('Only geojson supported for updateSource');
            } catch (ex) {
                reject(ex);
            }
        });
    }

    removeSource(id: string, nativeMap?): Promise<void> {
        return new Promise((resolve, reject) => {
            try {
                const b = nativeMap ? MapboxBridge.bridgeFor(nativeMap) : this.bridgeInstance;
                if (!b) {
                    reject('No bridge available');
                    return;
                }
                const ok = b.removeSource(id);
                if (ok) resolve();
                else reject('Failed to remove source');
            } catch (ex) {
                reject(ex);
            }
        });
    }

    async addLayer(style: any, belowLayerId?: string, nativeMap?: any): Promise<void> {
        const b = nativeMap ? MapboxBridge.bridgeFor(nativeMap) : this.bridgeInstance;
        // delegate to LayerFactory (TS shim -> native when available)
        if (Trace.isEnabled()) {
            CLog(CLogTypes.info, 'addLayer:', belowLayerId, JSON.stringify(style));
        }
        await LayerFactory.createLayer(b.getMapView(), style, belowLayerId);
    }

    async removeLayer(id: string, nativeMap?): Promise<void> {
        return new Promise((resolve, reject) => {
            try {
                const b = nativeMap ? MapboxBridge.bridgeFor(nativeMap) : this.bridgeInstance;
                if (!b) {
                    reject('No bridge available');
                    return;
                }
                const ok = b.removeLayer(id);
                if (ok) resolve();
                else reject('Failed to remove layer');
            } catch (ex) {
                reject(ex);
            }
        });
    }

    getLayer(layerId: string, nativeMap?): Promise<any | null> {
        return new Promise((resolve, reject) => {
            const b = nativeMap ? MapboxBridge.bridgeFor(nativeMap) : this.bridgeInstance;
            const found = NativeLayerFactory.getLayer(b.getMapView(), layerId);
            resolve(found ? new Layer(b.getMapView(), layerId) : null);
        });
    }

    getLayers(nativeMap?): Promise<any[]> {
        return new Promise((resolve, reject) => {
            try {
                const b = nativeMap ? MapboxBridge.bridgeFor(nativeMap) : this.bridgeInstance;
                const layersIds = JSON.parse(NativeLayerFactory.getLayers(b.getMapView())) || [];
                resolve(layersIds.map((id) => new Layer(b.getMapView(), id)));
            } catch (ex) {
                reject(ex);
            }
        });
    }

    // returns base64 PNG string for the image or null
    getImage(imageId: string, nativeMap?): Promise<ImageSource | null> {
        return new Promise((resolve, reject) => {
            try {
                const b = nativeMap ? MapboxBridge.bridgeFor(nativeMap) : this.bridgeInstance;
                if (!b || !b.getImage) {
                    resolve(null);
                    return;
                }
                // The native bridge now returns a UIImage (native iOS object) or null.
                const nativeImage: any = b.getImage(imageId);
                if (!nativeImage) {
                    resolve(null);
                    return;
                }

                // Wrap the native UIImage into a NativeScript ImageSource
                try {
                    // ImageSource.fromNativeSource accepts a native UIImage on iOS
                    const imgSrc = new ImageSource(nativeImage);
                    resolve(imgSrc || null);
                } catch (err) {
                    // As a fallback, if the bridge returns base64 string (older fallback), try decode
                    try {
                        const maybeBase64 = nativeImage as string;
                        if (typeof maybeBase64 === 'string') {
                            const src = ImageSource.fromBase64Sync ? ImageSource.fromBase64Sync(maybeBase64) : ImageSource.fromBase64(maybeBase64);
                            resolve(src || null);
                        } else {
                            resolve(null);
                        }
                    } catch (e) {
                        resolve(null);
                    }
                }
            } catch (ex) {
                reject(ex);
            }
        });
    }

    // ---------------- Callouts ----------------

    createCalloutView(marker: MapboxMarker) {
        if (Trace.isEnabled()) {
            CLog(CLogTypes.info, 'createCalloutView():', marker.id, marker.title, !!this._reusableCalloutView);
        }
        if (this._reusableCalloutView) {
            const title = this._reusableCalloutView.getViewById<Label>('title');
            title.text = marker?.title || '';
            const subtitle = this._reusableCalloutView.getViewById<Label>('subtitle');
            subtitle.text = marker?.subtitle;
            subtitle.visibility = marker?.subtitle ? 'visible' : 'collapse';
        } else {
            this._reusableCalloutView = createInfoWindowView(marker.title, marker.subtitle);
        }
        if (Trace.isEnabled()) {
            CLog(CLogTypes.info, 'createCalloutView1():', marker.id, marker.title, !!this._reusableCalloutView);
        }
        return this._reusableCalloutView;
    }

    async showCalloutForMarkerById(markerId: string): Promise<void> {
        const m = this._markers.find((x) => `${x.id}` === markerId);
        if (!m) {
            return;
        }
        if (Trace.isEnabled()) {
            CLog(CLogTypes.info, 'showCalloutForMarkerById():', typeof markerId, markerId);
        }
        const callout = this.createCalloutView(m);
        if (this.bridgeInstance.hasViewAnnotationForMarker(markerId)) {
            // let s Update
            this.bridgeInstance.removeViewAnnotationForMarker(markerId);
            // return;
        }
        callout.on('tap', () => {
            try {
                const res = m.onCalloutTap ? m.onCalloutTap(m) : undefined;
                if (res === false) this.deselectMarker(m);
            } catch (e) {
                console.error('callout tap handler error', e);
            }
        });
        this._reusableCalloutView.removeEventListener('tap');
        (this._reusableCalloutView.nativeViewProtected as UIView)?.removeFromSuperview();
        try {
            const nativeView = createUIViewAutoSizeUIViewAutoSize(callout);
            if (Trace.isEnabled()) {
                CLog(CLogTypes.info, 'showCalloutForMarkerById1():', markerId, nativeView);
            }
            m.ios = nativeView;
            const ok = this.bridgeInstance.addViewAnnotationForMarker(markerId, nativeView, m.lat, m.lng);
            if (!ok) {
                console.warn('addViewAnnotationForMarker failed for', markerId);
            }
            this.selectedMarker = m;
        } catch (e) {
            console.error('Failed to add native view annotation', e);
        }
    }

    hideCalloutForMarkerById(markerId: string): void {
        const m = this._markers.find((x) => `${x.id}` === markerId);
        if (!m) return;
        try {
            this.bridgeInstance.removeViewAnnotationForMarker(markerId);
        } catch (e) {
            console.error(e, e.stack);
        }
        // const cv = this._calloutViews[m.id];
        // if (cv) {
        //     cv.off('tap');
        //     delete this._calloutViews[m.id];
        // }
    }

    toggleCalloutForMarkerById(markerId: string): void {
        const m = this._markers.find((x) => `${x.id}` === markerId);
        if (!m || !m.id) return;
        const exists = this.bridgeInstance.hasViewAnnotationForMarker(markerId);
        if (exists) this.hideCalloutForMarkerById(markerId);
        else this.showCalloutForMarkerById(markerId);
    }

    onNativeAnnotationTap(userInfo: any) {
        if (Trace.isEnabled()) {
            CLog(CLogTypes.info, 'onNativeAnnotationTap:', JSON.stringify(userInfo));
        }
        const markerId = userInfo.id;
        if (!markerId) return;
        const marker = this._markers.find((m) => `${m.id}` === markerId);
        if (!marker) return;
        if (marker === this.selectedMarker) {
            this.deselectMarker(marker);
        } else {
            this.selectMarker(marker);
        }
    }

    // ---------------- Events wiring helpers ----------------
    // Event listeners (setOnCameraChangeListener)

    pushToken = (t) => this._observerTokens.push(t);
    addNotificationCenterObserver(event, map, callback) {
        this.pushToken(
            NSNotificationCenter.defaultCenter.addObserverForNameObjectQueueUsingBlock(event, map, NSOperationQueue.mainQueue, (notification: NSNotification) => {
                callback(convertToJSON(notification.userInfo));
            })
        );
    }

    setOnEventChangeListener(event: string, listener: (info) => void, nativeMap?: any): Promise<void> {
        return new Promise((resolve, reject) => {
            try {
                const map = nativeMap || this._mapboxViewInstance;
                if (!map) {
                    reject('No map has been loaded');
                    return;
                }
                this.addNotificationCenterObserver(event, map, listener);
                resolve();
            } catch (ex) {
                reject(ex);
            }
        });
    }

    setOnCameraChangeListener(listener: (info, animated?) => void, nativeMap?: any): Promise<void> {
        return this.setOnEventChangeListener(MAPBOX_BRIDGE_CAMERA_CHANGED, listener, nativeMap);
    }

    setOnMapClickListener(listener: (data: LatLng) => void, nativeMap?): Promise<void> {
        return this.setOnEventChangeListener(MAPBOX_BRIDGE_MAP_CLICK, listener, nativeMap);
    }

    setOnMapLongClickListener(listener: (data: LatLng) => void, nativeMap?): Promise<void> {
        return this.setOnEventChangeListener(MAPBOX_BRIDGE_MAP_LONGPRESS, listener, nativeMap);
    }

    setOnScrollListener(listener: (info: any) => void, nativeMap?): Promise<void> {
        return this.setOnEventChangeListener(MAPBOX_BRIDGE_MAP_SCROLL, listener, nativeMap);
    }

    setOnMoveBeginListener(listener: (info: any) => void, nativeMap?): Promise<void> {
        return this.setOnEventChangeListener(MAPBOX_BRIDGE_MAP_MOVE_BEGIN, listener, nativeMap);
    }

    setOnMoveEndListener(listener: (info: any) => void, nativeMap?): Promise<void> {
        return this.setOnEventChangeListener(MAPBOX_BRIDGE_MAP_MOVE_END, listener, nativeMap);
    }

    setOnFlingListener(listener: (info: any) => void, nativeMap?): Promise<void> {
        return this.setOnEventChangeListener(MAPBOX_BRIDGE_MAP_FLING, listener, nativeMap);
    }

    setOnCameraMoveCancelListener(listener: (info: any) => void, nativeMap?): Promise<void> {
        return this.setOnEventChangeListener(MAPBOX_BRIDGE_CAMERA_MOVE_CANCEL, listener, nativeMap);
    }

    setOnMapIdleListener(listener: () => void, nativeMap?): Promise<void> {
        return this.setOnEventChangeListener(MAPBOX_BRIDGE_CAMERA_IDLE, listener, nativeMap);
    }

    // ---------------- Offline helpers ----------------

    downloadOfflineRegion(options: DownloadOfflineRegionOptions, nativeMap?: any): Promise<void> {
        return new Promise((resolve, reject) => {
            try {
                const b = nativeMap ? MapboxBridge.bridgeFor(nativeMap) : this.bridgeInstance;
                if (!b) {
                    reject('No bridge available');
                    return;
                }

                const progressCb = (info: any) => {
                    options.onProgress?.(JSON.parse(info));
                };

                b.downloadOfflineRegion(JSON.stringify(options), progressCb, (success: boolean, error?: any) => {
                    if (success) resolve();
                    else {
                        const msg = error && error.localizedDescription ? error.localizedDescription : error || 'Failed to download offline region';
                        reject(msg);
                    }
                });
            } catch (ex) {
                reject(ex);
            }
        });
    }

    listOfflineRegions(options?: ListOfflineRegionsOptions, nativeMap?: any): Promise<OfflineRegion[]> {
        return new Promise((resolve, reject) => {
            try {
                const b = nativeMap ? MapboxBridge.bridgeFor(nativeMap) : this.bridgeInstance;
                if (!b) {
                    reject('No bridge available');
                    return;
                }
                b.listOfflineRegions((res) => {
                    resolve(JSON.parse(res));
                });
            } catch (ex) {
                reject(ex);
            }
        });
    }

    deleteOfflineRegion(options: DeleteOfflineRegionOptions, nativeMap?: any): Promise<void> {
        return new Promise((resolve, reject) => {
            try {
                const b = nativeMap ? MapboxBridge.bridgeFor(nativeMap) : this.bridgeInstance;
                if (!b) {
                    reject('No bridge available');
                    return;
                }
                const idOrName = options.id || options.name;
                if (!idOrName) {
                    reject("Pass in the 'id' or 'name' param");
                    return;
                }
                b.deleteOfflineRegion(idOrName);
                resolve();
            } catch (ex) {
                reject(ex);
            }
        });
    }

    // ---------------- User location & tilt ----------------

    showUserLocationMarker(options: Partial<TrackUserOptions>): Promise<void> {
        return new Promise((resolve, reject) => {
            try {
                const b = this.bridgeInstance;
                if (!b) {
                    reject('No bridge available');
                    return;
                }
                b.showUserLocationMarker(JSON.stringify(options));
                resolve();
            } catch (ex) {
                reject(ex);
            }
        });
    }

    hideUserLocationMarker(nativeMap?): Promise<void> {
        return new Promise((resolve, reject) => {
            try {
                const b = nativeMap ? MapboxBridge.bridgeFor(nativeMap) : this.bridgeInstance;
                if (!b) {
                    reject('No bridge available');
                    return;
                }
                b.stopTrackingUser();
                resolve();
            } catch (ex) {
                reject(ex);
            }
        });
    }

    forceUserLocationUpdate(nativeMap?): Promise<boolean> {
        return new Promise((resolve, reject) => {
            try {
                const b = nativeMap ? MapboxBridge.bridgeFor(nativeMap) : this.bridgeInstance;
                if (!b) {
                    reject('No bridge available');
                    return;
                }
                const ok = b.forceUserLocationUpdate ? b.forceUserLocationUpdate() : false;
                resolve(!!ok);
            } catch (ex) {
                reject(ex);
            }
        });
    }

    trackUser(options: TrackUserOptions, nativeMap?): Promise<void> {
        return new Promise((resolve, reject) => {
            try {
                const b = nativeMap ? MapboxBridge.bridgeFor(nativeMap) : this.bridgeInstance;
                if (!b) {
                    reject('No bridge available');
                    return;
                }
                if (Trace.isEnabled()) {
                    CLog(CLogTypes.info, 'trackUser():', JSON.stringify(options));
                }
                const ok = b.showUserLocationMarker(JSON.stringify(options));
                if (ok) {
                    resolve();
                } else {
                    reject();
                }
            } catch (ex) {
                reject(ex);
            }
        });
    }

    getTilt(nativeMap?): Promise<number> {
        return new Promise((resolve, reject) => {
            try {
                const b = nativeMap ? MapboxBridge.bridgeFor(nativeMap) : this.bridgeInstance;
                if (!b) {
                    reject('No bridge available');
                    return;
                }
                resolve(b.getTilt());
            } catch (ex) {
                reject(ex);
            }
        });
    }

    setTilt(options: { tilt: number; animated?: boolean }, nativeMap?): Promise<void> {
        return new Promise((resolve, reject) => {
            try {
                const b = nativeMap ? MapboxBridge.bridgeFor(nativeMap) : this.bridgeInstance;
                if (!b) {
                    reject('No bridge available');
                    return;
                }
                const animated = options.animated === undefined ? true : options.animated;
                b.setTilt(options.tilt, animated);
                resolve();
            } catch (ex) {
                reject(ex);
            }
        });
    }

    getUserLocation(nativeMap?): Promise<UserLocation> {
        return new Promise((resolve, reject) => {
            try {
                const b = nativeMap ? MapboxBridge.bridgeFor(nativeMap) : this.bridgeInstance;
                if (!b) {
                    reject('No bridge available');
                    return;
                }
                const loc = b.getUserLocation();
                if (!loc) {
                    reject('No user location');
                    return;
                }
                resolve(JSON.parse(loc));
            } catch (ex) {
                reject(ex);
            }
        });
    }

    // ---------------- Viewport ----------------
    setViewport(options: SetViewportOptions, nativeMap?): Promise<boolean> {
        return new Promise((resolve, reject) => {
            try {
                const b = nativeMap ? MapboxBridge.bridgeFor(nativeMap) : this.bridgeInstance;
                if (!b || !b.setViewport) {
                    reject('No bridge available');
                    return;
                }
                const payload = typeof options === 'string' ? options : JSON.stringify(options);
                const ok = b.setViewport(payload);
                resolve(!!ok);
            } catch (ex) {
                reject(ex);
            }
        });
    }

    getViewport(nativeMap?): Promise<any> {
        return new Promise((resolve, reject) => {
            try {
                const b = nativeMap ? MapboxBridge.bridgeFor(nativeMap) : this.bridgeInstance;
                if (!b || !b.getViewport) {
                    resolve(null);
                    return;
                }
                const vp = b.getViewport();
                if (!vp) {
                    reject('viewport could not be determined');
                    return;
                }
                resolve(JSON.parse(vp));
            } catch (ex) {
                reject(ex);
            }
        });
    }

    // ---------------- Project helpers ----------------

    project(data: LatLng, nativeMap?) {
        const b = nativeMap ? MapboxBridge.bridgeFor(nativeMap) : this.bridgeInstance;
        if (!b) return { x: 0, y: 0 };
        try {
            if (Trace.isEnabled()) {
                CLog(CLogTypes.info, 'project:', JSON.stringify(data));
            }
            const pt = b.coordinateToPoint(data.lat, data.lng);
            return JSON.parse(pt);
        } catch (e) {
            return { x: 0, y: 0 };
        }
    }

    projectBack(screenCoordinate: { x: number; y: number }, nativeMap?): LatLng {
        const b = nativeMap ? MapboxBridge.bridgeFor(nativeMap) : this.bridgeInstance;
        if (!b) return { lat: 0, lng: 0 };
        try {
            if (Trace.isEnabled()) {
                CLog(CLogTypes.info, 'projectBack:', JSON.stringify(screenCoordinate));
            }
            const coord = b.pointToCoordinate(screenCoordinate.x, screenCoordinate.y);
            return JSON.parse(coord);
        } catch (e) {
            return { lat: 0, lng: 0 };
        }
    }

    // ---------------- Lifecycle stubs ----------------

    onStart(nativeMap?: any): Promise<void> {
        return Promise.resolve();
    }
    // onResume(nativeMap?: any): Promise<void> {
    //     return Promise.resolve();
    // }
    // onPause(nativeMap?: any): Promise<void> {
    //     return Promise.resolve();
    // }
    onStop(nativeMap?: any): Promise<void> {
        return Promise.resolve();
    }
    onLowMemory(nativeMap?: any): Promise<void> {
        return Promise.resolve();
    }
    onDestroy(nativeMap?: any): Promise<void> {
        return Promise.resolve();
    }
}
