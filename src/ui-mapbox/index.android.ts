/**
 * Android Implementation
 *
 * @todo FIXME: The gcFix() implementation currently assumes only one map visible at a time.
 */

import { request } from '@nativescript-community/perms';
import { AndroidApplication, Application, Color, File, Http, ImageSource, Trace, Utils, knownFolders, path } from '@nativescript/core';
import { ExpressionParser } from './expression/expression-parser';
import { Layer, LayerFactory } from './layers/layer-factory';
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
    Viewport,
    telemetryProperty
} from './common';

// Export the enums for devs not using TS

export * from './common';

let libraryLoadedOverloaded = false;
function overrideLibraryLoader() {
    try {
        if (true && !libraryLoadedOverloaded) {
            @NativeClass
            class LibraryLoader extends com.mapbox.mapboxsdk.LibraryLoader {
                load(name) {
                    java.lang.System.loadLibrary(name);
                }
            }
            com.mapbox.mapboxsdk.LibraryLoader.setLibraryLoader(new LibraryLoader());
            libraryLoadedOverloaded = true;
        }
    } catch (error) {
        console.error(error);
    }
}

overrideLibraryLoader();

function _getLocation(loc: globalAndroid.location.Location) {
    if (loc === null) {
        return null;
    } else {
        return {
            location: {
                lat: loc.getLatitude(),
                lng: loc.getLongitude()
            },
            speed: loc.getSpeed()
        } as UserLocation;
    }
}

export function setLogLevel(level: 'none' | 'info' | 'debug' | 'error' | 'fault' | 'verbose') {
    const Logger = com.mapbox.mapboxsdk.log.Logger;
    let loggingLevel: number;
    switch (level) {
        case 'none':
            loggingLevel = Logger.NONE;
            break;
        case 'info':
            loggingLevel = Logger.INFO;
            break;
        case 'debug':
            loggingLevel = Logger.DEBUG;
            break;
        case 'verbose':
            loggingLevel = Logger.VERBOSE;
            break;
        case 'fault':
        case 'error':
            loggingLevel = Logger.ERROR;
            break;
    }
    Logger.setVerbosity(loggingLevel);
}

/**
 * A map view created in XML.
 *
 * This is the class that is created when the Mapbox XML tag
 * is encountered while parsing a view.
 *
 * Angular components need to register the Mapbox tag as follows:
 *
 * import { registerElement } from "nativescript-angular/element-registry";
 * registerElement( "Mapbox", () => require("nativescript-mapbox").MapboxView);
 *
 * The registerElement call is what binds the XML tag to the class that creates it.
 *
 * @see MapboxViewBase
 */
export class MapboxView extends MapboxViewBase {
    // reference to the map view inside the frame.

    private nativeMapView: any; // com.mapbox.mapboxsdk.maps.MapView

    private settings: any = null;

    // whether or not the view has already been initialized.
    // see initNativeView()

    private initialized: boolean = false;

    constructor() {
        super();

        if (Trace.isEnabled()) {
            CLog(CLogTypes.info, 'constructor(): building new MapboxView object.');
        }
    }

    /**
     * programmatically include settings
     */
    setConfig(settings: any) {
        // zoom level is not applied unless center is set

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

    /**
     * Return the Mapbox() API Shim instance
     *
     * This returns a reference to the Mapbox API shim class instance.
     * See class Mapbox below.
     *
     * @see Mapbox
     */
    public getMapboxApi(): any {
        return this.mapbox;
    }

    /**
     * Creates the native view.
     *
     * This method is supposed to create the native view. NativeScript caches
     * and re-uses views to save on memory and increase performance. Unfortunately,
     * the inner details of exactly how this is done is challenging to tease apart.
     *
     * The problem is that in order to create the Mapbox view we need the access token from
     * the XML, but in the case of a pure NativeScript app with property binding
     * (see the demo), the properties don't seem to be available until the page is loaded.
     *
     * As a workaround, I wait until the page is loaded to configure the map. See initNativeView.
     *
     * It seems to me there should be a better way.
     *
     * @link https://docs.nativescript.org/core-concepts/properties#views-lifecycle-and-recycling
     *
     * @todo check this.
     */
    public createNativeView(): Object {
        if (Trace.isEnabled()) {
            CLog(CLogTypes.info, 'createNativeView(): top');
        }

        const nativeView = new android.widget.FrameLayout(this._context);

        if (Trace.isEnabled()) {
            CLog(CLogTypes.info, 'createNativeView(): bottom');
        }

        return nativeView;
    }

    public onLoaded() {
        super.onLoaded();
        if (Trace.isEnabled()) {
            CLog(CLogTypes.info, 'onLoaded()');
        }

        if (!this.initialized) {
            this.initMap();
            this.initialized = true;
        }
    }

    public initNativeView(): void {
        if (Trace.isEnabled()) {
            CLog(CLogTypes.info, 'initNativeView(): top');
        }
        this.nativeView.owner = this;
        // Application.android.on(AndroidApplication.activityStartedEvent, this.onStart, this);
        Application.android.on(AndroidApplication.activityPausedEvent, this.onPause, this);
        Application.android.on(AndroidApplication.activityResumedEvent, this.onResume, this);
        // Application.android.on(AndroidApplication.activityStartedEvent, this.onStop, this);

        super.initNativeView();
    }

    /**
     * when the view is destroyed.
     *
     * This is called by the framework when the view is actually destroyed.
     * NativeScript, by design, tries to cache native views because
     * creating native views is expensive.
     *
     * @link https://docs.nativescript.org/plugins/ui-plugin-custom
     */
    disposeNativeView() {
        if (Trace.isEnabled()) {
            CLog(CLogTypes.info, 'disposeNativeView(): top');
        }

        this.nativeView.owner = null;

        // Application.android.off(AndroidApplication.activityStartedEvent, this.onStart, this);
        Application.android.off(AndroidApplication.activityPausedEvent, this.onPause, this);
        Application.android.off(AndroidApplication.activityResumedEvent, this.onResume, this);
        // Application.android.off(AndroidApplication.activityStartedEvent, this.onStop, this);
        if (this.mapbox) {
            this.mapbox.destroy();
        }
        super.disposeNativeView();
    }

    /**
     * initialize the map
     *
     * This method creates a new mapbox API instance and, through the show() method of the Mapbox API,
     * creates a Mapbox native map view.
     *
     * @see show()
     *
     * @link https://docs.nativescript.org/core-concepts/events
     *
     * @todo FIXME: this.nativeMapView is unused and never actually set to anything.
     */
    private initMap(): void {
        if (Trace.isEnabled()) {
            CLog(CLogTypes.info, "MapboxView:initMap(): top - accessToken is '" + this.config.accessToken + "'", this.config);
        }

        if (!this.nativeMapView && ((this.config && this.config.accessToken) || (this.settings && this.settings.accessToken))) {
            this.mapbox = new Mapbox(this);
            // the NativeScript contentview class extends from Observable to provide the notify method
            // which is the glue that joins this code with whatever callbacks are set in the Mapbox XML
            // tag describing the map.

            const options = {
                context: this._context,
                parentView: this.nativeView,
                onLocationPermissionGranted: (event) => {
                    this.notify({
                        eventName: MapboxViewBase.locationPermissionGrantedEvent,
                        object: this,
                        map: this,
                        android: this.nativeMapView
                    });
                },
                onLocationPermissionDenied: (event) => {
                    this.notify({
                        eventName: MapboxViewBase.locationPermissionDeniedEvent,
                        object: this,
                        map: this,
                        android: this.nativeMapView
                    });
                },
                onMapReady: (map) => {
                    if (this.telemetry === false) {
                        try {
                            com.mapbox.mapboxsdk.Mapbox.getTelemetry().setUserTelemetryRequestState(false);
                        } catch (err) {
                            console.error('telemtry', err);
                        }
                    }
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
                        android: this.nativeMapView
                    });
                },
                onScrollEvent: (event) => {
                    if (Trace.isEnabled()) {
                        CLog(CLogTypes.info, 'initMap(): onScrollEvent event');
                    }

                    this.notify({
                        eventName: MapboxViewBase.scrollEvent,
                        object: this,
                        event,
                        map: this,
                        android: this.nativeMapView
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
                        android: this.nativeMapView
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
                        android: this.nativeMapView
                    });
                }
            };

            if (Trace.isEnabled()) {
                CLog(CLogTypes.info, 'initMap(): this.config is:', this.config);
            }

            if (!this.settings) {
                this.settings = Mapbox.merge(this.config, Mapbox.defaults);
            } else {
                this.settings = Mapbox.merge(this.settings, Mapbox.defaults);
            }

            this.settings = Mapbox.merge(this.settings, options);

            if (Trace.isEnabled()) {
                CLog(CLogTypes.info, 'initMap(): before show.');
            }

            this.mapbox.show(this.settings);

            if (Trace.isEnabled()) {
                CLog(CLogTypes.info, 'initMap(): bottom.');
            }
        }
    }

    [telemetryProperty.setNative](value: boolean) {
        if (com.mapbox.mapboxsdk.Mapbox.getTelemetry()) {
            com.mapbox.mapboxsdk.Mapbox.getTelemetry().setUserTelemetryRequestState(value);
        }
    }
}

/**
 * A NativeScript shim for the Mapbox API.
 *
 * This implements a Typescript shim over the Native Mapbox GL Android API.
 *
 * It is created in one of two ways:
 *
 * - directly via let mapbox = new Mapbox(); mapbox.show( ... )
 * - via the Mapbox XML tag in which case a MapboxView object is created which hosts a reference to this class. (See MapboxView::getMapboxAPI())
 */
export class Mapbox extends MapboxCommon implements MapboxApi {
    // reference to the native mapbox API
    private _mapboxMapInstance: com.mapbox.mapboxsdk.maps.MapboxMap;
    private _mapboxViewInstance: com.mapbox.mapboxsdk.maps.MapView;

    private _locationComponent: com.mapbox.mapboxsdk.location.LocationComponent;

    private _accessToken: string = '';

    private circleManager: any = null;
    private lineManager: any = null;
    private symbolManager: com.mapbox.mapboxsdk.plugins.annotation.SymbolManager = null;

    private _offlineManager: any;

    // event listeners
    private onDidFailLoadingMapListener;
    private onDidFinishLoadingMapListener;
    private onMapReadyCallback;
    private onDidFinishLoadingStyleListener;
    private onAnnotationClickListener;
    private onMarkerClickListener;
    private onInfoWindowClickListener;
    private onMapClickListener;
    private onMapLongClickListener;
    private onMoveListener;
    private onScrollListener;
    private onFlingListener;
    private onCameraMoveListener;
    private onCameraMoveCancelListener;
    private onCameraIdleListener;
    private onLocationClickListener;

    private iconFactory;

    private _markers = [];
    private _polylines = [];
    private _polygons = [];

    // list of polylines

    private lines: any = [];

    // registered callbacks.

    private eventCallbacks: { [key: string]: any[] } = {};

    _markerIconDownloadCache = [];

    constructor(view) {
        super(view);

        if (Trace.isEnabled()) {
            CLog(CLogTypes.info, 'constructor(): building new Mapbox object.');
        }

        this.eventCallbacks['click'] = [];

        if (Trace.isEnabled()) {
            CLog(CLogTypes.info, 'constructor(): end of Mapbox constructor.');
        }
    }

    /**
     * not used
     */
    setMapboxViewInstance(mapboxViewInstance: any): void {}

    /**
     * show the map programmatically.
     *
     * This method is used to programmatically display a map. It is also called
     * by the MapboxView::init() method which initializes the map when the Mapbox
     * XML tags is encountered
     *
     * options may additionally include:
     *
     * - context
     * - parentView
     * - onLocationPermissionGranted
     * - onLocationPermissionDenied
     * - onMapReady
     *
     * @see MapboxView::init()
     *
     * @todo FIXME: the timeout delay before showing the map works around some race condition. The source error needs to be figured out.
     */
    show(options: ShowOptions): Promise<any> {
        return new Promise((resolve, reject) => {
            try {
                const settings = Mapbox.merge(options, Mapbox.defaults);

                const showIt = () => {
                    if (Trace.isEnabled()) {
                        CLog(CLogTypes.info, 'show()');
                    }

                    // if no accessToken was set the app may crash.
                    //
                    // FIXME: Even if using a local server add some string.

                    if (settings.accessToken === undefined) {
                        reject('mapbox_accesstoken_missing');
                        return;
                    }

                    // if already added, make sure it's removed first

                    if (this._mapboxViewInstance) {
                        if (Trace.isEnabled()) {
                            CLog(CLogTypes.info, 'show(): view already created. Removing it.');
                        }

                        const viewGroup = this._mapboxViewInstance.getParent() as android.view.ViewGroup;
                        if (viewGroup !== null) {
                            if (Trace.isEnabled()) {
                                CLog(CLogTypes.info, 'show(): view already created. Removing _mapboxViewInstance child of view parent.');
                            }

                            viewGroup.removeView(this._mapboxViewInstance);
                        }
                    }

                    this._accessToken = settings.accessToken;

                    let context = Application.android.context;

                    if (settings.context) {
                        context = settings.context;
                    }

                    // Per the Mapbox Android Native samples:
                    //
                    // "Mapbox access token is configured here. This needs to be called either in your application
                    // object or in the same activity which contains the mapview."

                    com.mapbox.mapboxsdk.Mapbox.getInstance(context, this._accessToken);

                    const mapboxMapOptions = this._getMapboxMapOptions(settings);

                    // unlike the Mapbox Android Native samples, we are not laying the map out
                    // using the Android XML layout features. Instead, we are creating the map
                    // programmatically.

                    this._mapboxViewInstance = new com.mapbox.mapboxsdk.maps.MapView(context, mapboxMapOptions);

                    // required per the Mapbox Android API.

                    this._mapboxViewInstance.onCreate(null);

                    // define some listeners to inform in case the map does not
                    // load.

                    if (Trace.isEnabled()) {
                        this.onDidFailLoadingMapListener = new com.mapbox.mapboxsdk.maps.MapView.OnDidFailLoadingMapListener({
                            onDidFailLoadingMap: (error) => CLog(CLogTypes.error, 'Mapbox::show(): failed to load map:', error)
                        });
                        this._mapboxViewInstance.addOnDidFailLoadingMapListener(this.onDidFailLoadingMapListener);
                    }

                    if (Trace.isEnabled()) {
                        this.onDidFinishLoadingMapListener = new com.mapbox.mapboxsdk.maps.MapView.OnDidFinishLoadingMapListener({
                            onDidFinishLoadingMap: () => CLog(CLogTypes.info, 'show(): finished loading map')
                        });
                        this._mapboxViewInstance.addOnDidFinishLoadingMapListener(this.onDidFinishLoadingMapListener);
                    }

                    this.onMapReadyCallback = new com.mapbox.mapboxsdk.maps.OnMapReadyCallback({
                        onMapReady: (mbMap) => {
                            this._mapboxMapInstance = mbMap;

                            if (Trace.isEnabled()) {
                                CLog(CLogTypes.info, 'show(): onMapReady() with instance:', this._mapboxMapInstance);
                            }

                            // Android SDK 7.0.0 and on requires that the style be set separately after the map
                            // is initialized. We do not consider the map ready until the style has successfully
                            // loaded.

                            this.setMapStyle(settings.style).then((style) => {
                                if (Trace.isEnabled()) {
                                    CLog(CLogTypes.info, 'show(): style loaded.');
                                }

                                // initialize the event handlers now that we have a constructed view.

                                this.initEventHandlerShim(settings, this._mapboxViewInstance);

                                this._addMarkers(settings.markers, this._mapboxViewInstance);

                                if (settings.showUserLocation) {
                                    this.requestFineLocationPermission()
                                        .then(() => {
                                            this.showUserLocationMarker(settings.locationComponentOptions);

                                            // if we have a callback defined, call it.

                                            if (settings.onLocationPermissionGranted) {
                                                settings.onLocationPermissionGranted(this._mapboxMapInstance);
                                            }
                                        })
                                        .catch((err) => {
                                            if (settings.onLocationPermissionDenied) {
                                                settings.onLocationPermissionDenied(this._mapboxMapInstance);
                                            }
                                        });
                                }

                                // if we have an onMapReady callback fire it.

                                if (settings.onMapReady) {
                                    settings.onMapReady(this._mapboxMapInstance);
                                }

                                resolve({
                                    android: this._mapboxViewInstance
                                });
                            });
                        }
                    });

                    this._mapboxViewInstance.getMapAsync(this.onMapReadyCallback);

                    if (Trace.isEnabled()) {
                        CLog(CLogTypes.info, 'show(): after getMapAsync()');
                    }

                    // we either have been given a view to add the map to or we
                    // add it to the top making it full screen.

                    if (settings.parentView) {
                        if (Trace.isEnabled()) {
                            CLog(CLogTypes.info, 'show(): adding map to passed in view');
                        }

                        settings.parentView.addView(this._mapboxViewInstance);
                    } else if (settings.container) {
                        if (Trace.isEnabled()) {
                            CLog(CLogTypes.info, 'show(): adding map to passed in container');
                        }

                        // Application.android.currentContext has been removed.

                        context = Application.android.foregroundActivity;

                        if (!context) {
                            context = Application.android.startActivity;
                        }

                        const mapViewLayout = new android.widget.FrameLayout(context);

                        if (Trace.isEnabled()) {
                            CLog(CLogTypes.info, 'show(): before adding mapboxViewInstance to FrameLayout');
                        }

                        mapViewLayout.addView(this._mapboxViewInstance);

                        if (Trace.isEnabled()) {
                            CLog(CLogTypes.info, 'show(): before adding FrameLayout to container');
                        }

                        settings.container.addChild(mapViewLayout);
                    }

                    if (Trace.isEnabled()) {
                        CLog(CLogTypes.info, 'show(): showIt() bottom');
                    }
                };

                // FIXME: There is some initialization error. A short delay works around this.

                setTimeout(showIt, settings.delay ? settings.delay : 200);
            } catch (ex) {
                if (Trace.isEnabled()) {
                    CLog(CLogTypes.info, 'Error in mapbox.show: ' + ex);
                }
                reject(ex);
            }
        });
    }

    /**
     * hide the map
     */
    hide(): Promise<void> {
        return new Promise((resolve, reject) => {
            try {
                if (this._mapboxViewInstance) {
                    const viewGroup = this._mapboxViewInstance.getParent() as android.view.ViewGroup;
                    if (viewGroup !== null) {
                        viewGroup.setVisibility(android.view.View.INVISIBLE);
                    }
                }
                resolve();
            } catch (ex) {
                if (Trace.isEnabled()) {
                    CLog(CLogTypes.info, 'Error in mapbox.hide: ' + ex);
                }
                reject(ex);
            }
        });
    }

    unhide(): Promise<void> {
        return new Promise((resolve, reject) => {
            try {
                if (this._mapboxViewInstance) {
                    (this._mapboxViewInstance.getParent() as android.view.ViewGroup).setVisibility(android.view.View.VISIBLE);
                    resolve();
                } else {
                    reject('No map found');
                }
            } catch (ex) {
                if (Trace.isEnabled()) {
                    CLog(CLogTypes.info, 'Error in mapbox.unhide: ' + ex);
                }
                reject(ex);
            }
        });
    }

    /**
     * destroy the map programmatically
     *
     * Destroy the map instance.
     */
    destroy(nativeMap?: any): Promise<void> {
        return new Promise(async (resolve, reject) => {
            this.clearEventListeners();
            this.iconFactory = null;
            if (Trace.isEnabled()) {
                CLog(CLogTypes.info, 'destroy(): destroying mapbox view.');
            }

            if (this.lineManager) {
                this.lineManager.onDestroy();
                this.lineManager = null;
            }

            if (this.circleManager) {
                this.circleManager.onDestroy();
                this.circleManager = null;
            }

            if (this.symbolManager) {
                this.symbolManager.onDestroy();
                this.symbolManager = null;
            }

            // if we have a location marker we need to disable it before destroying the map
            //
            // This is here to prevent a crash. The user code should disable/re-enable the
            // location marker.

            if (this._locationComponent) {
                if (Trace.isEnabled()) {
                    CLog(CLogTypes.info, 'destroy(): Location marker not disabled before destroy() called.');
                }

                await this.hideUserLocationMarker();
            }

            if (this._mapboxViewInstance) {
                const viewGroup = this._mapboxViewInstance.getParent() as android.view.ViewGroup;
                if (viewGroup !== null) {
                    if (Trace.isEnabled()) {
                        CLog(CLogTypes.info, 'destroy(): removing _mapboxViewInstance view.');
                    }
                    viewGroup.removeView(this._mapboxViewInstance);
                }

                this._mapboxViewInstance.onPause();
                this._mapboxViewInstance.onStop();
                this._mapboxViewInstance.destroyDrawingCache();

                // let the API know that we're programmatically destroying the map.

                this._mapboxViewInstance.onDestroy();

                this._mapboxViewInstance = null;
                this._mapboxMapInstance = null;
            }

            resolve();
        });
    }

    /**
     * Clear Event Listeners
     *
     * Explicitly clear all registered event listeners. It's not clear to me whether or not this
     * is strictly necessary as I imagine these should all get cleaned up when the map is destroyed
     * but given the complication of NativeScript's garbage collection scheme it seems like a good
     * idea to remove these handlers explicitly.
     */
    private clearEventListeners() {
        if (this.onDidFailLoadingMapListener) {
            this._mapboxViewInstance.removeOnDidFailLoadingMapListener(this.onDidFailLoadingMapListener);
            this.onDidFailLoadingMapListener = null;
        }

        if (this.onDidFinishLoadingMapListener) {
            this._mapboxViewInstance.removeOnDidFinishLoadingMapListener(this.onDidFinishLoadingMapListener);
            this.onDidFinishLoadingMapListener = null;
        }

        if (this.onDidFinishLoadingStyleListener) {
            this._mapboxViewInstance.removeOnDidFinishLoadingStyleListener(this.onDidFinishLoadingStyleListener);
            this.onDidFinishLoadingStyleListener = null;
        }

        if (this.onAnnotationClickListener) {
            this.lineManager.removeClickListener(this.onAnnotationClickListener);
            this.onAnnotationClickListener = null;
        }
        if (this.onMarkerClickListener) {
            this._mapboxMapInstance.setOnMarkerClickListener(null);
            this.onMarkerClickListener = null;
        }
        if (this.onInfoWindowClickListener) {
            this._mapboxMapInstance.setOnInfoWindowClickListener(null);
            this.onInfoWindowClickListener = null;
        }

        if (this.onDidFailLoadingMapListener) {
            this._mapboxViewInstance.removeOnDidFailLoadingMapListener(this.onDidFailLoadingMapListener);
            this.onDidFailLoadingMapListener = null;
        }

        if (this.onMapClickListener) {
            this._mapboxMapInstance.removeOnMapClickListener(this.onMapClickListener);
            this.onMapClickListener = null;
        }

        if (this.onMapLongClickListener) {
            this._mapboxMapInstance.removeOnMapLongClickListener(this.onMapLongClickListener);
            this.onMapLongClickListener = null;
        }

        if (this.onMoveListener) {
            this._mapboxMapInstance.removeOnMoveListener(this.onMoveListener);
            this.onMoveListener = null;
        }

        if (this.onScrollListener) {
            this._mapboxMapInstance.removeOnMoveListener(this.onScrollListener);
            this.onScrollListener = null;
        }

        if (this.onFlingListener) {
            this._mapboxMapInstance.removeOnFlingListener(this.onFlingListener);
            this.onFlingListener = null;
        }

        if (this.onCameraMoveListener) {
            this._mapboxMapInstance.removeOnCameraMoveListener(this.onCameraMoveListener);
            this.onCameraMoveListener = null;
        }

        if (this.onCameraMoveCancelListener) {
            this._mapboxMapInstance.removeOnCameraMoveCancelListener(this.onCameraMoveCancelListener);
            this.onCameraMoveCancelListener = null;
        }

        if (this.onCameraIdleListener) {
            this._mapboxMapInstance.removeOnCameraIdleListener(this.onCameraIdleListener);
            this.onCameraIdleListener = null;
        }

        if (this.onLocationClickListener) {
            this._locationComponent.removeOnLocationClickListener(this.onLocationClickListener);
            this.onLocationClickListener = null;
        }
    }

    // ------------------------------------------------
    // Life Cycle Hooks
    // ------------------------------------------------
    async onStart(nativeMap?: any) {
        if (Trace.isEnabled()) {
            CLog(CLogTypes.info, 'onStart()');
        }
        this._mapboxViewInstance.onStart();
    }

    async onResume(nativeMapViewInstance?: any) {
        if (Trace.isEnabled()) {
            CLog(CLogTypes.info, 'onResume()');
        }
        this._mapboxViewInstance.onResume();
    }

    async onPause(nativeMapViewInstance?: any) {
        if (Trace.isEnabled()) {
            CLog(CLogTypes.info, 'onPause()');
        }

        this._mapboxViewInstance.onPause();
    }

    async onStop(nativeMap?: any) {
        if (Trace.isEnabled()) {
            CLog(CLogTypes.info, 'onStop()');
        }
        this._mapboxViewInstance.onStop();
    }

    async onLowMemory(nativeMap?: any) {
        if (Trace.isEnabled()) {
            CLog(CLogTypes.info, 'onLowMemory()');
        }
        this._mapboxViewInstance.onLowMemory();
    }

    async onDestroy(nativeMap?: any) {
        if (Trace.isEnabled()) {
            CLog(CLogTypes.info, 'onDestroy()');
        }
        this._mapboxViewInstance.onDestroy();
    }

    /**
     * event handler shim
     *
     * Initialize our event handler shim so that we can intercept events here.
     *
     * @param { any } settings
     * @param { MapboxView } mapboxView
     */
    initEventHandlerShim(settings, mapboxNativeViewInstance: any) {
        if (Trace.isEnabled()) {
            CLog(CLogTypes.info, 'Mapbox:initEventHandlerShim(): top');
        }

        this.setOnMapClickListener((point: LatLng) => this.checkForClickEvent(point), mapboxNativeViewInstance);

        this.setOnMoveBeginListener((point: LatLng) => {
            if (Trace.isEnabled()) {
                CLog(CLogTypes.info, 'Mapbox:initEventHandlerShim(): moveBegin:', point);
            }

            if (typeof settings.onMoveBeginEvent != 'undefined') {
                settings.onMoveBeginEvent(point);
            }
        }, mapboxNativeViewInstance);

        this.setOnMoveEndListener((point: LatLng) => {
            if (Trace.isEnabled()) {
                CLog(CLogTypes.info, 'Mapbox:initEventHandlerShim(): moveEnd:', point);
            }

            if (typeof settings.onMoveEndEvent != 'undefined') {
                settings.onMoveEndEvent(point);
            }
        }, mapboxNativeViewInstance);

        this.setOnScrollListener((point: LatLng) => {
            if (Trace.isEnabled()) {
                CLog(CLogTypes.info, 'Mapbox:initEventHandlerShim(): move:', point);
            }

            if (typeof settings.onScrollEvent != 'undefined') {
                settings.onScrollEvent(point);
            }
        }, mapboxNativeViewInstance);
    }

    /**
     * register on click handlers.
     *
     * The native mapbox API does not, apparently, support click handlers
     * on circles, but it does for markers and polylines. WTF?
     *
     * Here we attempt to replicate the mapbox-gl-js behaviour of being
     * able to assign an onClick handler to a layer by it's layer id.
     *
     * @param {string} event - the event to subscribe to. i.e. 'click'.
     * @param {string} id - the id of the layer
     * @param {function} callback - the callback to invoke when the layer is clicked on.
     * @param {object] nativeMapView - reference to the native Map view.
     *
     * @link https://github.com/mapbox/mapbox-android-demo/issues/540
     */
    public onMapEvent(eventName, id, callback, nativeMapView?): void {
        if (typeof this.eventCallbacks[eventName] == 'undefined') {
            this.eventCallbacks[eventName] = [];
        }

        this.eventCallbacks[eventName].push({
            id,
            callback
        });
    }

    /**
     * remove an event handler for a layer
     *
     * This will remove all event handlers (that we manage here) for
     * the given layer id and event.
     */
    public offMapEvent(eventName, id, nativeMapView?) {
        if (typeof this.eventCallbacks[eventName] == 'undefined') {
            return;
        }

        this.eventCallbacks[eventName] = this.eventCallbacks[eventName].filter((entry) => entry.id !== id);
    }

    /**
     * If click events registered and a feature found for the event, then fire listener.
     */
    private checkForClickEvent(point: LatLng, nativeMap?) {
        if (Trace.isEnabled()) {
            CLog(CLogTypes.info, 'Mapbox:checkForClickEvent(): got click event with point:', JSON.stringify(point));
        }

        this.eventCallbacks['click'] &&
            this.eventCallbacks['click'].forEach((eventListener) => {
                this.queryRenderedFeatures({ point, layers: [eventListener.id] }).then((response) => {
                    if (response.length > 0) {
                        eventListener.callback(response);
                    }
                });
            });
        this.view && this.view.notify({ eventName: 'mapClick', object: this.view, point });

        return false;
    }

    /**
     * handles a line click event
     *
     * Given a click on a line overlay, find the id of the underlying line layer
     * an invoke any registered callbacks.
     */
    private handleLineClickEvent(clickOverlay) {
        const lineEntry = this.lines.find((entry) => {
            if (Trace.isEnabled()) {
                CLog(CLogTypes.info, "Mapbox:handleLineClickEvent(): checking lineEntry clickOverlay id '" + entry.clickOverlay + "' against clickOverlay '" + clickOverlay + "'");
            }

            return entry.clickOverlay === clickOverlay;
        });

        if (!lineEntry) {
            console.error('Mapbox:handleLineClick(): click on overlay without an underlying line layer');
            return false;
        }

        for (let x = 0; x < this.eventCallbacks['click'].length; x++) {
            const entry = this.eventCallbacks['click'][x];

            if (Trace.isEnabled()) {
                CLog(CLogTypes.info, "Mapbox:handleLineClickEvent(): checking entry id '" + entry.id + "' against lineEnty id '" + lineEntry.id + "'");
            }

            if (entry.id === lineEntry.id) {
                if (Trace.isEnabled()) {
                    CLog(CLogTypes.info, "Mapbox:handleLineClickEvent(): calling callback for '" + entry.id + "'");
                }

                return entry.callback(lineEntry);
            }
        } // end of for loop over events.

        return false;
    }

    hasFineLocationPermission(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            try {
                resolve(this._fineLocationPermissionGranted());
            } catch (ex) {
                if (Trace.isEnabled()) {
                    CLog(CLogTypes.info, 'Error in mapbox.hasFineLocationPermission: ' + ex);
                }
                reject(ex);
            }
        });
    }

    /**
     * Request fine locaion permission
     *
     * @link https://docs.mapbox.com/android/core/overview/#permissionsmanager
     */
    async requestFineLocationPermission() {
        return request('location');
    }

    /**
     * set the map style
     *
     * The 7.X version of the SDK uses a builder class for forming
     * URLs.
     *
     * NOTE: The style must be explicitly set using this method in the onMapReady() handler.
     *
     * @param {string | MapStyle } style - a style following the Mapbox style specification or a URL to a style.
     * @param {any} nativeMapViewInstance - native map view (com.mapbox.mapboxsdk.maps.MapView)
     *
     * @see MapboxViewCommonBase:setMapStyle()
     *
     * @link https://docs.mapbox.com/android/api/map-sdk/7.1.2/com/mapbox/mapboxsdk/maps/Style.Builder.html
     * @link https://docs.mapbox.com/android/api/map-sdk/7.1.2/com/mapbox/mapboxsdk/maps/MapboxMap.html#setStyle-java.lang.String-com.mapbox.mapboxsdk.maps.Style.OnStyleLoaded-
     */

    setMapStyle(style: string | MapStyle, nativeMapViewInstance?: any): Promise<void> {
        return new Promise((resolve, reject) => {
            try {
                const mapStyle = this._getMapStyle(style);

                if (Trace.isEnabled()) {
                    CLog(CLogTypes.info, 'setMapStyle(): with style:', style);
                }

                // callback for when the style is successfully loaded.
                this.onDidFinishLoadingStyleListener = new com.mapbox.mapboxsdk.maps.MapView.OnDidFinishLoadingStyleListener({
                    onDidFinishLoadingStyle: () => {
                        if (Trace.isEnabled()) {
                            CLog(CLogTypes.info, 'Mapbox:setMapStyle(): style loaded');
                        }

                        // FIXME: now that the map is initialized and the style is loaded we can
                        // create the annotation managers that allow us to (hopefully) reliably
                        // receive events on lines
                        const nMapbox = this._mapboxMapInstance;
                        const nMapView = this._mapboxViewInstance;
                        const nStyle = nMapbox.getStyle();
                        this.lineManager = new com.mapbox.mapboxsdk.plugins.annotation.LineManager(nMapView, nMapbox, nStyle);
                        // this.symbolManager = new com.mapbox.mapboxsdk.plugins.annotation.SymbolManager(nMapView, nMapbox, nStyle);
                        // this.symbolManager.addClickListener(
                        //     new com.mapbox.mapboxsdk.plugins.annotation.OnSymbolClickListener({
                        //         onAnnotationClick: (marker: com.mapbox.mapboxsdk.plugins.annotation.Symbol) => {
                        //             const cachedMarker = this._getClickedMarkerDetails(marker);
                        //             if (cachedMarker && cachedMarker.onTap) {
                        //                 cachedMarker.onTap(cachedMarker);
                        //             }
                        //             return false;
                        //         },
                        //     })
                        // );
                        this.onAnnotationClickListener = new com.mapbox.mapboxsdk.plugins.annotation.OnAnnotationClickListener({
                            onAnnotationClick: (line) => {
                                if (Trace.isEnabled()) {
                                    CLog(CLogTypes.info, 'Mapbox:setMapStyle(): click on line:', line);
                                }

                                this.handleLineClickEvent(line);

                                return true;
                            }
                        });

                        this.lineManager.addClickListener(this.onAnnotationClickListener);

                        resolve();
                    }
                });

                this._mapboxViewInstance.addOnDidFinishLoadingStyleListener(this.onDidFinishLoadingStyleListener);

                // callback if loading the style fails.

                this.onDidFailLoadingMapListener = new com.mapbox.mapboxsdk.maps.MapView.OnDidFailLoadingMapListener({
                    onDidFailLoadingMap: (error) => {
                        if (Trace.isEnabled()) {
                            CLog(CLogTypes.error, 'Mapbox:setMapStyle(): style failed', mapStyle, error);
                        }
                        reject(error);
                    }
                });

                this._mapboxViewInstance.addOnDidFailLoadingMapListener(this.onDidFailLoadingMapListener);

                const builder = new com.mapbox.mapboxsdk.maps.Style.Builder();
                this._mapboxMapInstance.setStyle(builder.fromUri(mapStyle));
            } catch (ex) {
                if (Trace.isEnabled()) {
                    CLog(CLogTypes.error, 'Error in mapbox.setMapStyle', style, ex);
                }
                reject(ex);
            }
        });
    }

    async getImage(imageId: string, nativeMap?: any): Promise<ImageSource> {
        return new Promise((resolve, reject) => {
            const theMap = nativeMap || this._mapboxMapInstance;

            if (!theMap) {
                reject('No map has been loaded');
                return;
            }

            try {
                const nativeImage = theMap.getStyle().getImage(imageId);
                const img = new ImageSource(nativeImage);

                resolve(img);
            } catch (ex) {
                reject('Error during getImage: ' + ex);

                if (Trace.isEnabled()) {
                    CLog(CLogTypes.info, 'Error in mapbox.getImage: ' + ex);
                }
                throw ex;
            }
        });
    }

    async addImage(imageId: string, imagePath: string, nativeMap?: any): Promise<void> {
        return new Promise(async (resolve, reject) => {
            const theMap = nativeMap || this._mapboxMapInstance;

            if (!theMap) {
                reject('No map has been loaded');
                return;
            }

            try {
                const imageSource = await this.fetchImageSource(imagePath);
                theMap.getStyle().addImage(imageId, imageSource.android);
                resolve();
            } catch (ex) {
                reject('Error during addImage: ' + ex);

                if (Trace.isEnabled()) {
                    CLog(CLogTypes.info, 'Error in mapbox.addImage: ' + ex);
                }
                throw ex;
            }
        });
    }

    async removeImage(imageId: string, nativeMap?: any): Promise<void> {
        return new Promise((resolve, reject) => {
            const theMap = nativeMap || this._mapboxMapInstance;

            if (!theMap) {
                reject('No map has been loaded');
                return;
            }

            try {
                theMap.getStyle().removeImage(imageId);
                resolve();
            } catch (ex) {
                reject('Error during removeImage: ' + ex);

                if (Trace.isEnabled()) {
                    CLog(CLogTypes.info, 'Error in mapbox.removeImage: ' + ex);
                }
                throw ex;
            }
        });
    }

    async addMarkers(markers: MapboxMarker[], nativeMap?: any) {
        try {
            this._addMarkers(markers, this._mapboxViewInstance);
        } catch (ex) {
            if (Trace.isEnabled()) {
                CLog(CLogTypes.info, 'Error in mapbox.addMarkers: ' + ex);
            }
            throw ex;
        }
    }

    async removeMarkers(ids?: any, nativeMap?: any) {
        try {
            this._removeMarkers(ids, this._mapboxViewInstance);
        } catch (ex) {
            if (Trace.isEnabled()) {
                CLog(CLogTypes.info, 'Error in mapbox.removeMarkers: ' + ex);
            }
            throw ex;
        }
    }

    iconCache: { [k: string]: com.mapbox.mapboxsdk.annotations.Icon } = {};
    /**
     *
     * @deprecated
     * @link https://github.com/mapbox/mapbox-plugins-android/tree/master/plugin-annotation
     */
    _addMarkers(markers: MapboxMarker[], nativeMap?) {
        if (!markers) {
            if (Trace.isEnabled()) {
                CLog(CLogTypes.info, 'No markers passed');
            }
            return;
        }

        if (!Array.isArray(markers)) {
            if (Trace.isEnabled()) {
                CLog(CLogTypes.info, "markers must be passed as an Array: [{title:'foo'}]");
            }
            return;
        }

        if (!this._mapboxMapInstance) {
            return;
        }
        if (!this.onMarkerClickListener) {
            this.onMarkerClickListener = new com.mapbox.mapboxsdk.maps.MapboxMap.OnMarkerClickListener({
                onMarkerClick: (marker) => {
                    const cachedMarker = this._getClickedMarkerDetails(marker);
                    if (cachedMarker && cachedMarker.onTap) {
                        cachedMarker.onTap(cachedMarker);
                    }
                    return false;
                }
            });
            this._mapboxMapInstance.setOnMarkerClickListener(this.onMarkerClickListener);
        }
        if (!this.onInfoWindowClickListener) {
            this.onInfoWindowClickListener = new com.mapbox.mapboxsdk.maps.MapboxMap.OnInfoWindowClickListener({
                onInfoWindowClick: (marker) => {
                    const cachedMarker = this._getClickedMarkerDetails(marker);
                    if (cachedMarker && cachedMarker.onCalloutTap) {
                        cachedMarker.onCalloutTap(cachedMarker);
                    }
                    return true;
                }
            });
            this._mapboxMapInstance.setOnInfoWindowClickListener(this.onInfoWindowClickListener);
        }
        if (!this.iconFactory) {
            this.iconFactory = com.mapbox.mapboxsdk.annotations.IconFactory.getInstance(Application.android.context);
        }
        const iconFactory = this.iconFactory;

        // if any markers need to be downloaded from the web they need to be available synchronously, so fetch them first before looping

        this._downloadMarkerImages(markers).then((updatedMarkers) => {
            for (const m in updatedMarkers) {
                const marker: any = updatedMarkers[m];
                this._markers.push(marker);
                const markerOptions = new com.mapbox.mapboxsdk.annotations.MarkerOptions();
                markerOptions.setTitle(marker.title);
                markerOptions.setSnippet(marker.subtitle);
                markerOptions.setPosition(new com.mapbox.mapboxsdk.geometry.LatLng(parseFloat(marker.lat), parseFloat(marker.lng)));

                if (marker.icon) {
                    // for markers from url see UrlMarker in https://github.com/mapbox/mapbox-gl-native/issues/5370
                    if (marker.icon.startsWith('res://')) {
                        let cached = this.iconCache[marker.icon];
                        if (!cached) {
                            const resourcename = marker.icon.substring(6);
                            const res = Utils.ad.getApplicationContext().getResources();
                            const identifier = res.getIdentifier(resourcename, 'drawable', Utils.ad.getApplication().getPackageName());
                            if (identifier !== 0) {
                                cached = this.iconCache[marker.icon] = iconFactory.fromResource(identifier);
                            }
                        }
                        if (cached) {
                            markerOptions.setIcon(cached);
                        } else {
                            console.warn(`No icon found for this device density for icon ' ${marker.icon}'. Falling back to the default icon.`);
                        }
                    } else if (marker.icon.startsWith('http')) {
                        if (marker.iconDownloaded !== null) {
                            markerOptions.setIcon(iconFactory.fromBitmap(marker.iconDownloaded));
                        }
                    } else {
                        if (Trace.isEnabled()) {
                            CLog(CLogTypes.info, 'Please use res://resourcename, http(s)://imageurl or iconPath to use a local path');
                        }
                    }
                } else if (marker.iconPath) {
                    let cached = this.iconCache[marker.iconPath];
                    if (!cached) {
                        const iconFullPath = path.join(knownFolders.currentApp().path, marker.iconPath.replace('~/', ''));
                        // if the file doesn't exist the app will crash, so checking it
                        if (File.exists(iconFullPath)) {
                            // could set width, height, retina, see https://github.com/Telerik-Verified-Plugins/Mapbox/pull/42/files?diff=unified&short_path=1c65267, but that's what the marker.icon param is for..
                            cached = this.iconCache[marker.iconPath] = iconFactory.fromPath(iconFullPath);
                        }
                    }
                    if (cached) {
                        markerOptions.setIcon(cached);
                    } else {
                        console.warn(`Marker icon not found, using the default instead. Requested path: '" + ${marker.iconPath}'.`);
                    }
                }
                marker.android = this._mapboxMapInstance.addMarker(markerOptions);

                if (marker.selected) {
                    this._mapboxMapInstance.selectMarker(marker.android);
                }

                marker.update = (newSettings: MapboxMarker) => {
                    for (const m in this._markers) {
                        const _marker: MapboxMarker = this._markers[m];
                        if (marker.id === _marker.id) {
                            if (newSettings.onTap !== undefined) {
                                _marker.onTap = newSettings.onTap;
                            }
                            if (newSettings.onCalloutTap !== undefined) {
                                _marker.onCalloutTap = newSettings.onCalloutTap;
                            }
                            if (newSettings.title !== undefined) {
                                _marker.title = newSettings.title;
                                _marker.android.setTitle(newSettings.title);
                            }
                            if (newSettings.subtitle !== undefined) {
                                _marker.subtitle = newSettings.title;
                                _marker.android.setSnippet(newSettings.subtitle);
                            }
                            if (newSettings.lat && newSettings.lng) {
                                _marker.lat = newSettings.lat;
                                _marker.lng = newSettings.lng;
                                _marker.android.setPosition(new com.mapbox.mapboxsdk.geometry.LatLng(parseFloat((newSettings as any).lat), parseFloat((newSettings as any).lng)));
                            }
                            if (newSettings.selected) {
                                this._mapboxMapInstance.selectMarker(_marker.android);
                            }
                        }
                    }
                };
            }
        });
    }

    /**
     *
     * @deprecated
     */

    _removeMarkers(ids?, nativeMap?) {
        if (!this._mapboxMapInstance) {
            return;
        }

        for (const m in this._markers) {
            const marker = this._markers[m];
            if (!ids || (marker && marker.id && ids.indexOf(marker.id) > -1)) {
                if (marker && marker.android) {
                    this._mapboxMapInstance.removeAnnotation(marker.android);
                }
            }
        }
        // remove markers from cache
        if (ids) {
            this._markers = this._markers.filter((marker) => ids.indexOf(marker.id) === -1);
        } else {
            this._markers = [];
        }
    }

    setCenter(options: SetCenterOptions, nativeMap?): Promise<void> {
        return new Promise((resolve, reject) => {
            try {
                const cameraPosition = new com.mapbox.mapboxsdk.camera.CameraPosition.Builder().target(new com.mapbox.mapboxsdk.geometry.LatLng(options.lat, options.lng)).build();

                if (options.animated === true) {
                    const newCameraPosition = com.mapbox.mapboxsdk.camera.CameraUpdateFactory.newCameraPosition(cameraPosition);

                    this._mapboxMapInstance.animateCamera(newCameraPosition, 1000, null);
                } else {
                    this._mapboxMapInstance.setCameraPosition(cameraPosition);
                }

                resolve();
            } catch (ex) {
                if (Trace.isEnabled()) {
                    CLog(CLogTypes.info, 'Error in mapbox.setCenter: ' + ex);
                }
                reject(ex);
            }
        });
    }

    getCenter(nativeMap?): Promise<LatLng> {
        return new Promise((resolve, reject) => {
            try {
                const coordinate = this._mapboxMapInstance.getCameraPosition().target;

                resolve({
                    lat: coordinate.getLatitude(),
                    lng: coordinate.getLongitude()
                });
            } catch (ex) {
                if (Trace.isEnabled()) {
                    CLog(CLogTypes.info, 'Error in mapbox.getCenter: ' + ex);
                }
                reject(ex);
            }
        });
    }

    setZoomLevel(options: SetZoomLevelOptions, nativeMap?): Promise<void> {
        return new Promise((resolve, reject) => {
            try {
                const animated = options.animated === undefined || options.animated;
                const level = options.level;

                if (level >= 0 && level <= 20) {
                    const cameraUpdate = com.mapbox.mapboxsdk.camera.CameraUpdateFactory.zoomTo(level);

                    if (animated) {
                        this._mapboxMapInstance.easeCamera(cameraUpdate);
                    } else {
                        this._mapboxMapInstance.moveCamera(cameraUpdate);
                    }
                    resolve();
                } else {
                    reject('invalid zoomlevel, use any double value from 0 to 20 (like 8.3)');
                }
            } catch (ex) {
                if (Trace.isEnabled()) {
                    CLog(CLogTypes.info, 'Error in mapbox.setZoomLevel: ' + ex);
                }
                reject(ex);
            }
        });
    }

    getZoomLevel(nativeMap?): Promise<number> {
        return new Promise((resolve, reject) => {
            try {
                const level = this._mapboxMapInstance.getCameraPosition().zoom;
                resolve(level);
            } catch (ex) {
                if (Trace.isEnabled()) {
                    CLog(CLogTypes.info, 'Error in mapbox.getZoomLevel: ' + ex);
                }
                reject(ex);
            }
        });
    }

    setTilt(options: SetTiltOptions, nativeMap?): Promise<void> {
        return new Promise((resolve, reject) => {
            try {
                const tilt = options.tilt ? options.tilt : 30;

                const cameraPositionBuilder = new com.mapbox.mapboxsdk.camera.CameraPosition.Builder().tilt(tilt);
                const cameraUpdate = com.mapbox.mapboxsdk.camera.CameraUpdateFactory.newCameraPosition(cameraPositionBuilder.build());
                const durationMs = options.duration ? options.duration : 5000;

                this._mapboxMapInstance.easeCamera(cameraUpdate, durationMs);

                setTimeout(() => {
                    resolve();
                }, durationMs);
            } catch (ex) {
                if (Trace.isEnabled()) {
                    CLog(CLogTypes.info, 'Error in mapbox.setTilt: ' + ex);
                }
                reject(ex);
            }
        });
    }

    getTilt(nativeMap?): Promise<number> {
        return new Promise((resolve, reject) => {
            try {
                const tilt = this._mapboxMapInstance.getCameraPosition().tilt;
                resolve(tilt);
            } catch (ex) {
                if (Trace.isEnabled()) {
                    CLog(CLogTypes.info, 'Error in mapbox.getTilt: ' + ex);
                }
                reject(ex);
            }
        });
    }

    /**
     * get users current location
     *
     * @link https://docs.mapbox.com/android/api/map-sdk/9.0.0/com/mapbox/mapboxsdk/location/LocationComponent.html#getLastKnownLocation--
     */
    getUserLocation(): Promise<UserLocation> {
        return new Promise((resolve, reject) => {
            try {
                const loc = this._locationComponent ? this._locationComponent.getLastKnownLocation() : null;

                if (loc === null) {
                    reject('Location not available');
                } else {
                    resolve(_getLocation(loc));
                }
            } catch (ex) {
                if (Trace.isEnabled()) {
                    CLog(CLogTypes.info, 'Error in mapbox.getUserLocation: ' + ex);
                }
                reject(ex);
            }
        });
    }

    /**
     * @link https://www.mapbox.com/android-docs/api/mapbox-java/libjava-geojson/3.4.1/com/mapbox/geojson/Feature.html
     */
    queryRenderedFeatures(options: QueryRenderedFeaturesOptions): Promise<Feature[]> {
        return new Promise((resolve, reject) => {
            try {
                if (options.point === undefined) {
                    reject("Please set the 'point' parameter");
                    return;
                }
                if (!options) {
                    options = {};
                }

                const mapboxPoint = new com.mapbox.mapboxsdk.geometry.LatLng(options.point.lat, options.point.lng);
                const screenLocation = this._mapboxMapInstance.getProjection().toScreenLocation(mapboxPoint);

                if (this._mapboxMapInstance.queryRenderedFeatures) {
                    const queryFilter = options.filter ? ExpressionParser.parseJson(options.filter) : null;
                    const features = this._mapboxMapInstance.queryRenderedFeatures(screenLocation, queryFilter, options.layers);
                    const result = [];
                    for (let i = 0; i < features.size(); i++) {
                        const feature: com.mapbox.geojson.Feature = features.get(i);
                        result.push(JSON.parse(feature.toJson()));
                    }
                    resolve(result);
                } else {
                    reject('Feature not supported by this Mapbox version');
                }
            } catch (ex) {
                if (Trace.isEnabled()) {
                    CLog(CLogTypes.info, 'Error in mapbox.queryRenderedFeatures: ' + ex);
                }
                reject(ex);
            }
        });
    }

    querySourceFeatures(sourceId: string, options?: QuerySourceFeaturesOptions): Promise<Feature[]> {
        return new Promise((resolve, reject) => {
            try {
                if (!options) {
                    options = {};
                }

                const source = this._mapboxMapInstance.getStyle().getSource(sourceId);
                if (!source) {
                    throw new Error(`Source with id "${sourceId}" not found.`);
                }

                let features;
                const queryFilter = options.filter ? ExpressionParser.parseJson(options.filter) : null;
                if (source instanceof com.mapbox.mapboxsdk.style.sources.GeoJsonSource) {
                    features = source.querySourceFeatures(queryFilter);
                } else if (source instanceof com.mapbox.mapboxsdk.style.sources.VectorSource) {
                    if (!options.sourceLayer) {
                        throw new Error('The option "sourceLayer" is required for vector sources.');
                    }
                    features = source.querySourceFeatures([options.sourceLayer], queryFilter);
                } else {
                    throw new Error('Only sources from type "vector" or "geojson" are supported.');
                }

                const result = [];
                for (let i = 0; i < features.size(); i++) {
                    const feature: com.mapbox.geojson.Feature = features.get(i);
                    result.push(JSON.parse(feature.toJson()));
                }
                resolve(result);
            } catch (ex) {
                if (Trace.isEnabled()) {
                    CLog(CLogTypes.info, 'Error in mapbox.querySourceFeatures: ' + ex);
                }
                reject(ex);
            }
        });
    }

    /**
     *
     * @deprecated
     */
    addPolygon(options: AddPolygonOptions, nativeMap?): Promise<void> {
        return new Promise((resolve, reject) => {
            try {
                const points = options.points;
                if (points === undefined) {
                    reject("Please set the 'points' parameter");
                    return;
                }

                const polygonOptions = new com.mapbox.mapboxsdk.annotations.PolygonOptions();
                for (const p in points) {
                    const point = points[p];
                    polygonOptions.add(new com.mapbox.mapboxsdk.geometry.LatLng(point.lat, point.lng));
                }

                polygonOptions.fillColor(Mapbox.getAndroidColor(options.fillColor));
                polygonOptions.alpha(options.fillOpacity === undefined ? 1 : options.fillOpacity);

                // Note that the stroke is barely visible, see https://github.com/mapbox/mapbox-gl-native/issues/5676
                if (options.strokeColor) {
                    polygonOptions.strokeColor(Mapbox.getAndroidColor(options.strokeColor));
                }
                this._polygons.push({
                    id: options.id || new Date().getTime(),
                    android: this._mapboxMapInstance.addPolygon(polygonOptions)
                });
                resolve();
            } catch (ex) {
                if (Trace.isEnabled()) {
                    CLog(CLogTypes.info, 'Error in mapbox.addPolygon: ' + ex);
                }
                reject(ex);
            }
        });
    }

    /**
     *
     * @deprecated
     */
    addPolyline(options: AddPolylineOptions, nativeMap?): Promise<void> {
        return new Promise((resolve, reject) => {
            try {
                const points = options.points;
                if (points === undefined) {
                    reject("Please set the 'points' parameter");
                    return;
                }

                const polylineOptions = new com.mapbox.mapboxsdk.annotations.PolylineOptions();
                polylineOptions.width(options.width || 5); // default 5
                polylineOptions.color(Mapbox.getAndroidColor(options.color));
                polylineOptions.alpha(options.opacity === undefined ? 1 : options.opacity);
                for (const p in points) {
                    const point = points[p];
                    polylineOptions.add(new com.mapbox.mapboxsdk.geometry.LatLng(point.lat, point.lng));
                }
                this._polylines.push({
                    id: options.id || new Date().getTime(),
                    android: this._mapboxMapInstance.addPolyline(polylineOptions)
                });
                resolve();
            } catch (ex) {
                if (Trace.isEnabled()) {
                    CLog(CLogTypes.info, 'Error in mapbox.addPolyline: ' + ex);
                }
                reject(ex);
            }
        });
    }

    removePolygons(ids?: any[], nativeMap?): Promise<void> {
        return new Promise((resolve, reject) => {
            try {
                for (const p in this._polygons) {
                    const polygon = this._polygons[p];
                    if (!ids || (polygon.id && ids.indexOf(polygon.id) > -1)) {
                        this._mapboxMapInstance.removePolygon(polygon.android);
                    }
                }
                resolve();
            } catch (ex) {
                if (Trace.isEnabled()) {
                    CLog(CLogTypes.info, 'Error in mapbox.removePolygons: ' + ex);
                }
                reject(ex);
            }
        });
    }

    removePolylines(ids?: any[], nativeMap?): Promise<void> {
        return new Promise((resolve, reject) => {
            try {
                for (const p in this._polylines) {
                    const polyline = this._polylines[p];
                    if (!ids || (polyline.id && ids.indexOf(polyline.id) > -1)) {
                        this._mapboxMapInstance.removePolyline(polyline.android);
                    }
                }
                resolve();
            } catch (ex) {
                if (Trace.isEnabled()) {
                    CLog(CLogTypes.info, 'Error in mapbox.removePolylines: ' + ex);
                }
                reject(ex);
            }
        });
    }

    animateCamera(options: AnimateCameraOptions, nativeMap?): Promise<void> {
        return new Promise((resolve, reject) => {
            try {
                const durationMs = options.duration ? options.duration : 10000;
                if (options.bounds) {
                    const padding = options.padding || 0;
                    const bounds = new com.mapbox.mapboxsdk.geometry.LatLngBounds.Builder()
                        .include(new com.mapbox.mapboxsdk.geometry.LatLng(options.bounds.north, options.bounds.east))
                        .include(new com.mapbox.mapboxsdk.geometry.LatLng(options.bounds.south, options.bounds.west))
                        .build();
                    this._mapboxMapInstance.animateCamera(com.mapbox.mapboxsdk.camera.CameraUpdateFactory.newLatLngBounds(bounds, padding), durationMs, null);
                } else {
                    const target = options.target;
                    if (target === undefined) {
                        reject("Please set the 'target' parameter");
                        return;
                    }

                    const cameraPositionBuilder = new com.mapbox.mapboxsdk.camera.CameraPosition.Builder(this._mapboxMapInstance.getCameraPosition()).target(
                        new com.mapbox.mapboxsdk.geometry.LatLng(target.lat, target.lng)
                    );

                    if (options.bearing) {
                        cameraPositionBuilder.bearing(options.bearing);
                    }

                    if (options.tilt) {
                        cameraPositionBuilder.tilt(options.tilt);
                    }

                    if (options.zoomLevel) {
                        cameraPositionBuilder.zoom(options.zoomLevel);
                    }
                    this._mapboxMapInstance.animateCamera(com.mapbox.mapboxsdk.camera.CameraUpdateFactory.newCameraPosition(cameraPositionBuilder.build()), durationMs, null);
                }

                setTimeout(() => {
                    resolve();
                }, durationMs);
            } catch (ex) {
                if (Trace.isEnabled()) {
                    CLog(CLogTypes.info, 'Error in mapbox.animateCamera: ' + ex);
                }
                reject(ex);
            }
        });
    }

    /**
     * set an on map click listener.
     *
     * The new Mapbox Native SDK allows for multiple listeners on an event and follows the standard
     * pattern of returning 'true' when a handler has handled the event and others shouldn't.
     *
     * Not returning a boolean from the listener function will cause a crash.
     */
    setOnMapClickListener(listener: (data: LatLng) => boolean, nativeMap?: MapboxView): Promise<void> {
        return new Promise((resolve, reject) => {
            try {
                if (!this._mapboxMapInstance) {
                    reject('No map has been loaded');
                    return;
                }

                this.onMapClickListener = new com.mapbox.mapboxsdk.maps.MapboxMap.OnMapClickListener({
                    onMapClick: (point) => {
                        if (Trace.isEnabled()) {
                            CLog(CLogTypes.info, 'Mapbox:setOnMapClickListener(): click event at point:', point);
                        }

                        return listener({
                            lat: point.getLatitude(),
                            lng: point.getLongitude()
                        });
                    }
                });

                this._mapboxMapInstance.addOnMapClickListener(this.onMapClickListener);

                resolve();
            } catch (ex) {
                if (Trace.isEnabled()) {
                    CLog(CLogTypes.info, 'Error in mapbox.setOnMapClickListener: ' + ex);
                }
                reject(ex);
            }
        });
    }

    setOnMapLongClickListener(listener: (data: LatLng) => boolean, nativeMap?): Promise<void> {
        return new Promise((resolve, reject) => {
            try {
                if (!this._mapboxMapInstance) {
                    reject('No map has been loaded');
                    return;
                }

                this.onMapLongClickListener = new com.mapbox.mapboxsdk.maps.MapboxMap.OnMapLongClickListener({
                    onMapLongClick: (point) =>
                        listener({
                            lat: point.getLatitude(),
                            lng: point.getLongitude()
                        })
                });

                this._mapboxMapInstance.addOnMapLongClickListener(this.onMapLongClickListener);

                resolve();
            } catch (ex) {
                if (Trace.isEnabled()) {
                    CLog(CLogTypes.info, 'Error in mapbox.setOnMapLongClickListener: ' + ex);
                }
                reject(ex);
            }
        });
    }

    setOnMoveBeginListener(listener: (data?: LatLng) => void, nativeMap?): Promise<void> {
        return new Promise((resolve, reject) => {
            try {
                if (!this._mapboxMapInstance) {
                    reject('No map has been loaded');
                    return;
                }

                if (Trace.isEnabled()) {
                    CLog(CLogTypes.info, 'setOnMoveBeginListener():');
                }

                this.onMoveListener = new com.mapbox.mapboxsdk.maps.MapboxMap.OnMoveListener({
                    onMoveBegin: (detector: any /* MoveGestureDetector */) => {
                        const coordinate = this._mapboxMapInstance.getCameraPosition().target;
                        return listener({
                            lat: coordinate.getLatitude(),
                            lng: coordinate.getLongitude()
                        });
                    },
                    onMove: (detector: any /* MoveGestureDetector */) => {},
                    onMoveEnd: (detector: any /* MoveGestureDetector */) => {}
                });

                this._mapboxMapInstance.addOnMoveListener(this.onMoveListener);

                resolve();
            } catch (ex) {
                if (Trace.isEnabled()) {
                    CLog(CLogTypes.info, 'Error in mapbox.setOnMoveBeginListener: ' + ex);
                }
                reject(ex);
            }
        });
    }

    setOnMoveEndListener(listener: (data?: LatLng) => void, nativeMap?): Promise<void> {
        return new Promise((resolve, reject) => {
            try {
                if (!this._mapboxMapInstance) {
                    reject('No map has been loaded');
                    return;
                }

                if (Trace.isEnabled()) {
                    CLog(CLogTypes.info, 'setOnMoveEndListener():');
                }

                this.onMoveListener = new com.mapbox.mapboxsdk.maps.MapboxMap.OnMoveListener({
                    onMoveBegin: (detector: any /* MoveGestureDetector */) => {},
                    onMove: (detector: any /* MoveGestureDetector */) => {},
                    onMoveEnd: (detector: any /* MoveGestureDetector */) => {
                        const coordinate = this._mapboxMapInstance.getCameraPosition().target;
                        return listener({
                            lat: coordinate.getLatitude(),
                            lng: coordinate.getLongitude()
                        });
                    }
                });

                this._mapboxMapInstance.addOnMoveListener(this.onMoveListener);

                resolve();
            } catch (ex) {
                if (Trace.isEnabled()) {
                    CLog(CLogTypes.info, 'Error in mapbox.setOnMoveEndListener: ' + ex);
                }
                reject(ex);
            }
        });
    }

    setOnScrollListener(listener: (data?: LatLng) => void, nativeMap?): Promise<void> {
        return new Promise((resolve, reject) => {
            try {
                if (!this._mapboxMapInstance) {
                    reject('No map has been loaded');
                    return;
                }

                if (Trace.isEnabled()) {
                    CLog(CLogTypes.info, 'setOnScrollListener():');
                }

                // the 'onMove' event seems like the one closest to the iOS implementation

                this.onScrollListener = new com.mapbox.mapboxsdk.maps.MapboxMap.OnMoveListener({
                    onMoveBegin: (detector: any /* MoveGestureDetector */) => {},
                    onMove: (detector: any /* MoveGestureDetector */) => {
                        const coordinate = this._mapboxMapInstance.getCameraPosition().target;
                        return listener({
                            lat: coordinate.getLatitude(),
                            lng: coordinate.getLongitude()
                        });
                    },
                    onMoveEnd: (detector: any /* MoveGestureDetector */) => {}
                });

                this._mapboxMapInstance.addOnMoveListener(this.onScrollListener);

                resolve();
            } catch (ex) {
                if (Trace.isEnabled()) {
                    CLog(CLogTypes.info, 'Error in mapbox.setOnScrollListener: ' + ex);
                }
                reject(ex);
            }
        });
    }

    setOnFlingListener(listener: () => void, nativeMap?): Promise<void> {
        return new Promise((resolve, reject) => {
            try {
                if (!this._mapboxMapInstance) {
                    reject('No map has been loaded');
                    return;
                }

                this.onFlingListener = new com.mapbox.mapboxsdk.maps.MapboxMap.OnFlingListener({
                    onFling: () => listener()
                });

                this._mapboxMapInstance.addOnFlingListener(this.onFlingListener);

                resolve();
            } catch (ex) {
                if (Trace.isEnabled()) {
                    CLog(CLogTypes.info, 'Error in mapbox.setOnFlingListener: ' + ex);
                }
                reject(ex);
            }
        });
    }

    setOnCameraMoveListener(listener: (reason, animated?) => void, nativeMap?): Promise<void> {
        return new Promise((resolve, reject) => {
            try {
                if (!this._mapboxMapInstance) {
                    reject('No map has been loaded');
                    return;
                }

                this.onCameraMoveListener = new com.mapbox.mapboxsdk.maps.MapboxMap.OnCameraMoveListener({
                    onCameraMove: () => listener(0, false)
                });

                this._mapboxMapInstance.addOnCameraMoveListener(this.onCameraMoveListener);

                resolve();
            } catch (ex) {
                if (Trace.isEnabled()) {
                    CLog(CLogTypes.info, 'Error in mapbox.setOnCameraMoveListener: ' + ex);
                }
                reject(ex);
            }
        });
    }

    setOnCameraMoveCancelListener(listener: () => void, nativeMap?): Promise<void> {
        return new Promise((resolve, reject) => {
            try {
                if (!this._mapboxMapInstance) {
                    reject('No map has been loaded');
                    return;
                }

                this.onCameraMoveCancelListener = new com.mapbox.mapboxsdk.maps.MapboxMap.OnCameraMoveCanceledListener({
                    onCameraMoveCanceled: () => listener()
                });

                this._mapboxMapInstance.addOnCameraMoveCancelListener(this.onCameraMoveCancelListener);

                resolve();
            } catch (ex) {
                if (Trace.isEnabled()) {
                    CLog(CLogTypes.info, 'Error in mapbox.setOnCameraMoveCancelListener: ' + ex);
                }
                reject(ex);
            }
        });
    }

    setOnCameraIdleListener(listener: () => void, nativeMap?): Promise<void> {
        return new Promise((resolve, reject) => {
            try {
                if (!this._mapboxMapInstance) {
                    reject('No map has been loaded');
                    return;
                }

                this.onCameraIdleListener = new com.mapbox.mapboxsdk.maps.MapboxMap.OnCameraIdleListener({
                    onCameraIdle: () => listener()
                });

                this._mapboxMapInstance.addOnCameraIdleListener(this.onCameraIdleListener);

                resolve();
            } catch (ex) {
                if (Trace.isEnabled()) {
                    CLog(CLogTypes.info, 'Error in mapbox.setOnCameraIdleListener: ' + ex);
                }
                reject(ex);
            }
        });
    }

    getViewport(nativeMap?): Promise<Viewport> {
        return new Promise((resolve, reject) => {
            try {
                if (!this._mapboxMapInstance) {
                    reject('No map has been loaded');
                    return;
                }

                const bounds = this._mapboxMapInstance.getProjection().getVisibleRegion().latLngBounds;

                resolve({
                    bounds: {
                        north: bounds.getLatNorth(),
                        east: bounds.getLonEast(),
                        south: bounds.getLatSouth(),
                        west: bounds.getLonWest()
                    },
                    zoomLevel: this._mapboxMapInstance.getCameraPosition().zoom
                });
            } catch (ex) {
                if (Trace.isEnabled()) {
                    CLog(CLogTypes.info, 'Error in mapbox.getViewport: ' + ex);
                }
                reject(ex);
            }
        });
    }

    setViewport(options: SetViewportOptions, nativeMap?): Promise<void> {
        return new Promise((resolve, reject) => {
            try {
                if (!this._mapboxMapInstance) {
                    reject('No map has been loaded');
                    return;
                }

                const bounds = new com.mapbox.mapboxsdk.geometry.LatLngBounds.Builder()
                    .include(new com.mapbox.mapboxsdk.geometry.LatLng(options.bounds.north, options.bounds.east))
                    .include(new com.mapbox.mapboxsdk.geometry.LatLng(options.bounds.south, options.bounds.west))
                    .build();

                const padding = options.padding !== undefined ? options.padding : 25,
                    animated = options.animated === undefined || options.animated,
                    durationMs = animated ? 1000 : 0;

                if (animated) {
                    this._mapboxMapInstance.easeCamera(com.mapbox.mapboxsdk.camera.CameraUpdateFactory.newLatLngBounds(bounds, padding), durationMs);
                } else {
                    this._mapboxMapInstance.moveCamera(com.mapbox.mapboxsdk.camera.CameraUpdateFactory.newLatLngBounds(bounds, padding));
                }

                setTimeout(() => {
                    resolve();
                }, durationMs);
            } catch (ex) {
                if (Trace.isEnabled()) {
                    CLog(CLogTypes.info, 'Error in mapbox.setViewport: ' + ex);
                }
                reject(ex);
            }
        });
    }

    downloadOfflineRegion(options: DownloadOfflineRegionOptions): Promise<any> {
        return new Promise((resolve, reject) => {
            try {
                const styleURL = this._getMapStyle(options.style);

                const bounds = new com.mapbox.mapboxsdk.geometry.LatLngBounds.Builder()
                    .include(new com.mapbox.mapboxsdk.geometry.LatLng(options.bounds.north, options.bounds.east))
                    .include(new com.mapbox.mapboxsdk.geometry.LatLng(options.bounds.south, options.bounds.west))
                    .build();

                const retinaFactor = Utils.layout.getDisplayDensity();

                const offlineRegionDefinition = new com.mapbox.mapboxsdk.offline.OfflineTilePyramidRegionDefinition(styleURL, bounds, options.minZoom, options.maxZoom, retinaFactor);

                const info = {
                    name: options.name,
                    ...options.metadata
                };
                const infoStr = new java.lang.String(JSON.stringify(info));
                const encodedMetadata = infoStr.getBytes();

                if (!this._accessToken && !options.accessToken) {
                    reject("First show a map, or pass in an 'accessToken' param");
                    return;
                }
                if (!this._accessToken) {
                    this._accessToken = options.accessToken;
                    com.mapbox.mapboxsdk.Mapbox.getInstance(Application.android.context, this._accessToken);
                }

                this._getOfflineManager().createOfflineRegion(
                    offlineRegionDefinition,
                    encodedMetadata,
                    new com.mapbox.mapboxsdk.offline.OfflineManager.CreateOfflineRegionCallback({
                        onError: (error: string) => {
                            reject(error);
                        },

                        onCreate: (offlineRegion) => {
                            // if (options.onCreate) {
                            //   options.onCreate(offlineRegion);
                            // }

                            offlineRegion.setDownloadState(com.mapbox.mapboxsdk.offline.OfflineRegion.STATE_ACTIVE);

                            // Monitor the download progress using setObserver
                            offlineRegion.setObserver(
                                new com.mapbox.mapboxsdk.offline.OfflineRegion.OfflineRegionObserver({
                                    onStatusChanged: (status) => {
                                        // Calculate the download percentage and update the progress bar
                                        const percentage = status.getRequiredResourceCount() >= 0 ? (100.0 * status.getCompletedResourceCount()) / status.getRequiredResourceCount() : 0.0;

                                        if (options.onProgress) {
                                            options.onProgress({
                                                name: options.name,
                                                completedSize: status.getCompletedResourceSize(),
                                                completed: status.getCompletedResourceCount(),
                                                expected: status.getRequiredResourceCount(),
                                                percentage: Math.round(percentage * 100) / 100,
                                                // downloading: status.getDownloadState() == com.mapbox.mapboxsdk.offline.OfflineRegion.STATE_ACTIVE,
                                                complete: status.isComplete()
                                            });
                                        }

                                        if (status.isComplete()) {
                                            resolve(status);
                                        } else if (status.isRequiredResourceCountPrecise()) {
                                        }
                                    },

                                    onError: (error) => {
                                        reject(`${error.getMessage()}, reason: ${error.getReason()}`);
                                    },

                                    mapboxTileCountLimitExceeded: (limit) => {
                                        console.warn(`dl mapboxTileCountLimitExceeded: ${limit}`);
                                    }
                                })
                            );
                        }
                    })
                );
            } catch (ex) {
                if (Trace.isEnabled()) {
                    CLog(CLogTypes.info, 'Error in mapbox.downloadOfflineRegion: ' + ex);
                }
                reject(ex);
            }
        });
    }

    listOfflineRegions(options?: ListOfflineRegionsOptions): Promise<OfflineRegion[]> {
        return new Promise((resolve, reject) => {
            try {
                if (!this._accessToken && !options.accessToken) {
                    reject("First show a map, or pass in an 'accessToken' param");
                    return;
                }
                if (!this._accessToken) {
                    this._accessToken = options.accessToken;
                    com.mapbox.mapboxsdk.Mapbox.getInstance(Application.android.context, this._accessToken);
                }

                this._getOfflineManager().listOfflineRegions(
                    new com.mapbox.mapboxsdk.offline.OfflineManager.ListOfflineRegionsCallback({
                        onError: (error: string) => {
                            reject(error);
                        },
                        onList: (offlineRegions) => {
                            const regions = [];
                            if (offlineRegions !== null) {
                                for (let i = 0; i < offlineRegions.length; i++) {
                                    const offlineRegion = offlineRegions[i];
                                    const name = this._getRegionName(offlineRegion);
                                    const offlineRegionDefinition = offlineRegion.getDefinition();
                                    const bounds = offlineRegionDefinition.getBounds();
                                    const metadata = this._getRegionMetadata(offlineRegion);

                                    regions.push({
                                        id: offlineRegion.getID(),
                                        name,
                                        style: offlineRegionDefinition.getStyleURL(),
                                        minZoom: offlineRegionDefinition.getMinZoom(),
                                        maxZoom: offlineRegionDefinition.getMaxZoom(),
                                        bounds: {
                                            north: bounds.getLatNorth(),
                                            east: bounds.getLonEast(),
                                            south: bounds.getLatSouth(),
                                            west: bounds.getLonWest()
                                        },
                                        metadata,
                                        pixelRatio: offlineRegionDefinition.getPixelRatio(),
                                        type: offlineRegionDefinition.getType()
                                    });
                                }
                            }
                            resolve(regions);
                        }
                    })
                );
            } catch (ex) {
                if (Trace.isEnabled()) {
                    CLog(CLogTypes.info, 'Error in mapbox.listOfflineRegions: ' + ex);
                }
                reject(ex);
            }
        });
    }

    deleteOfflineRegion(options: DeleteOfflineRegionOptions): Promise<void> {
        return new Promise((resolve, reject) => {
            try {
                if (!options || (!options.id && !options.name)) {
                    reject("Pass in the 'id' or 'name' param");
                    return;
                }

                this._getOfflineManager().listOfflineRegions(
                    new com.mapbox.mapboxsdk.offline.OfflineManager.ListOfflineRegionsCallback({
                        onError: (error: string) => {
                            reject(error);
                        },
                        onList: (offlineRegions) => {
                            const regions = [];
                            let found = false;
                            if (offlineRegions !== null) {
                                for (let i = 0; i < offlineRegions.length; i++) {
                                    const offlineRegion = offlineRegions[i];
                                    const regionId = options.id ? offlineRegion.getID() : this._getRegionName(offlineRegion);
                                    if (regionId === (options.id || options.name)) {
                                        found = true;
                                        offlineRegion.delete(
                                            new com.mapbox.mapboxsdk.offline.OfflineRegion.OfflineRegionDeleteCallback({
                                                onError: (error: string) => {
                                                    reject(error);
                                                },
                                                onDelete: () => {
                                                    resolve();
                                                    // don't return, see note below
                                                }
                                            })
                                        );
                                        // don't break the loop as there may be multiple packs with the same name
                                    }
                                }
                            }
                            if (!found) {
                                reject('Region not found');
                            }
                        }
                    })
                );
            } catch (ex) {
                if (Trace.isEnabled()) {
                    CLog(CLogTypes.info, 'Error in mapbox.deleteOfflineRegion: ' + ex);
                }
                reject(ex);
            }
        });
    }

    _getOfflineManager() {
        if (!this._offlineManager) {
            this._offlineManager = com.mapbox.mapboxsdk.offline.OfflineManager.getInstance(Application.android.context);
        }

        return this._offlineManager;
    }

    addExtrusion(options: AddExtrusionOptions, nativeMap?): Promise<void> {
        return new Promise((resolve, reject) => {
            try {
                // Create fill extrusion layer
                const fillExtrusionLayer = new com.mapbox.mapboxsdk.style.layers.FillExtrusionLayer('3d-buildings', 'composite');
                fillExtrusionLayer.setSourceLayer('building');
                fillExtrusionLayer.setFilter(com.mapbox.mapboxsdk.style.expressions.Expression.eq(com.mapbox.mapboxsdk.style.expressions.Expression.get('extrude'), 'true'));
                fillExtrusionLayer.setMinZoom(15);
                const props = [];
                props[0] = com.mapbox.mapboxsdk.style.layers.PropertyFactory.fillExtrusionColor(android.graphics.Color.LTGRAY);
                props[1] = com.mapbox.mapboxsdk.style.layers.PropertyFactory.fillExtrusionHeight(com.mapbox.mapboxsdk.style.expressions.Expression.get('height'));
                props[2] = com.mapbox.mapboxsdk.style.layers.PropertyFactory.fillExtrusionBase(com.mapbox.mapboxsdk.style.expressions.Expression.get('min_height'));
                props[3] = com.mapbox.mapboxsdk.style.layers.PropertyFactory.fillExtrusionOpacity(com.mapbox.mapboxsdk.style.expressions.Expression.literal(0.6));
                // Set data-driven styling properties
                fillExtrusionLayer.setProperties(props);

                this._mapboxMapInstance.getStyle().addLayer(fillExtrusionLayer);
                resolve();
            } catch (ex) {
                if (Trace.isEnabled()) {
                    CLog(CLogTypes.info, 'Error in mapbox.addExtrusion: ' + ex);
                }
                reject(ex);
            }
        });
    }

    /**
     * update a geojson source
     *
     */
    updateSource(id: string, options: UpdateSourceOptions, nativeMap?) {
        return new Promise<void>((resolve, reject) => {
            try {
                const theMap: com.mapbox.mapboxsdk.maps.MapboxMap = nativeMap || this._mapboxMapInstance;
                if (!theMap) {
                    reject('No map has been loaded');
                    return;
                }

                const source = theMap.getStyle().getSource(id);
                if (!source) {
                    reject('Source does not exists: ' + id);
                    return;
                }
                switch (options.type) {
                    case 'geojson':
                        const geoJsonString = JSON.stringify(options.data);
                        (source as com.mapbox.mapboxsdk.style.sources.GeoJsonSource).setGeoJson(geoJsonString);
                        resolve();
                        break;
                    default:
                        reject('Invalid source type: ' + options['type']);
                        return;
                }
            } catch (ex) {
                if (Trace.isEnabled()) {
                    CLog(CLogTypes.info, 'Error in mapbox.updateSource: ' + ex);
                }
                reject(ex);
            }
        });
    }
    /**
     * add a geojson or vector source
     *
     * Add a source that can then be referenced in the style specification
     * passed to addLayer().
     *
     * @link https://docs.mapbox.com/mapbox-gl-js/api/#map#addsource
     */

    addSource(id: string, options: AddSourceOptions, nativeMap?): Promise<void> {
        return new Promise((resolve, reject) => {
            try {
                const theMap = nativeMap || this._mapboxMapInstance;
                let source;

                if (!theMap) {
                    reject('No map has been loaded');
                    return;
                }

                if (theMap.getStyle().getSource(id)) {
                    reject('Source exists: ' + id);
                    return;
                }
                switch (options.type) {
                    case 'vector': {
                        if (options.url) {
                            source = new com.mapbox.mapboxsdk.style.sources.VectorSource(id, options.url);
                        } else {
                            const tiles = Array.create(java.lang.String, options.tiles.length);
                            options.tiles.forEach((val, i) => (tiles[i] = val));
                            const tileSet = new com.mapbox.mapboxsdk.style.sources.TileSet('2.0.0', tiles);
                            if (options.minzoom) {
                                tileSet.setMinZoom(options.minzoom);
                            }

                            if (options.maxzoom) {
                                tileSet.setMaxZoom(options.maxzoom);
                            }

                            if (options.scheme) {
                                tileSet.setScheme(options.scheme);
                            }

                            if (options.bounds) {
                                tileSet.setBounds(options.bounds.map((val) => new java.lang.Float(val)));
                            }
                            source = new com.mapbox.mapboxsdk.style.sources.VectorSource(id, tileSet);
                        }
                        break;
                    }

                    case 'geojson': {
                        if (Trace.isEnabled()) {
                            CLog(CLogTypes.info, 'Mapbox:addSource(): before addSource with geojson');
                            CLog(CLogTypes.info, 'Mapbox:addSource(): before adding geoJSON to GeoJsonSource');
                        }
                        const geojsonOptions = new com.mapbox.mapboxsdk.style.sources.GeoJsonOptions();
                        if (options.minzoom) {
                            geojsonOptions.withMinZoom(options.minzoom);
                        }

                        if (options.maxzoom) {
                            geojsonOptions.withMaxZoom(options.maxzoom);
                        }

                        if (options.lineMetrics !== undefined) {
                            geojsonOptions.withLineMetrics(options.lineMetrics);
                        }

                        if (options.cluster) {
                            geojsonOptions
                                .withCluster(true)
                                .withClusterMaxZoom(options.cluster.maxZoom || 13)
                                .withClusterRadius(options.cluster.radius || 40);

                            if (options.cluster.properties) {
                                for (const property of Object.keys(options.cluster.properties)) {
                                    const propertyValues = options.cluster.properties[property];
                                    let operator = propertyValues[0];
                                    if (!Array.isArray(operator)) {
                                        operator = [operator];
                                    }
                                    geojsonOptions.withClusterProperty(property, ExpressionParser.parseJson(operator), ExpressionParser.parseJson(propertyValues[1]));
                                }
                            }
                        }

                        const geoJsonSource = new com.mapbox.mapboxsdk.style.sources.GeoJsonSource(id, geojsonOptions);
                        if (options.data) {
                            const geoJsonString = JSON.stringify(options.data);
                            geoJsonSource.setGeoJson(geoJsonString);
                        }

                        source = geoJsonSource;

                        break;
                    }

                    case 'raster':
                        // use Array.create because a marshal error throws on TileSet if options.tiles directly passed.
                        const tiles = Array.create(java.lang.String, options.tiles.length);
                        options.tiles.forEach((val, i) => (tiles[i] = val));
                        const tileSet = new com.mapbox.mapboxsdk.style.sources.TileSet('2.0.0', tiles);

                        if (options.minzoom) {
                            tileSet.setMinZoom(options.minzoom);
                        }

                        if (options.maxzoom) {
                            tileSet.setMaxZoom(options.maxzoom);
                        }

                        if (options.scheme) {
                            tileSet.setScheme(options.scheme);
                        }

                        if (options.bounds) {
                            tileSet.setBounds(options.bounds.map((val) => new java.lang.Float(val)));
                        }

                        source = new com.mapbox.mapboxsdk.style.sources.RasterSource(id, tileSet, options.tileSize || 256);
                        break;
                    default:
                        reject('Invalid source type: ' + options['type']);
                        return;
                }

                if (!source) {
                    const ex = 'No source to add';
                    if (Trace.isEnabled()) {
                        CLog(CLogTypes.info, 'Error in mapbox.addSource: ' + ex);
                    }
                    reject(ex);
                    return;
                }

                theMap.getStyle().addSource(source);
                resolve();
            } catch (ex) {
                if (Trace.isEnabled()) {
                    CLog(CLogTypes.info, 'Error in mapbox.addSource: ' + ex);
                }
                reject(ex);
            }
        });
    }

    /**
     * remove source by id
     */
    removeSource(id: string, nativeMap?): Promise<void> {
        return new Promise((resolve, reject) => {
            try {
                const theMap = nativeMap || this._mapboxMapInstance;

                if (!theMap) {
                    reject('No map has been loaded');
                    return;
                }

                const isRemoved = theMap.getStyle().removeSource(id);
                if (!isRemoved) {
                    reject(`Could not remove source with id: ${id}`);
                }

                resolve();
            } catch (ex) {
                if (Trace.isEnabled()) {
                    CLog(CLogTypes.info, 'Error in mapbox.removeSource: ' + ex);
                }
                reject(ex);
            }
        });
    }

    /**
     * a rough analogue to the mapbox-gl-js addLayer() method
     *
     * It would be nice if this {N} API matched the mapbox-gl-js API which
     * would make it much easier to share mapping applications between the web
     * and {N} apps.
     *
     * This method accepts a Mapbox-GL-JS style specification JSON object with some
     * limitations:
     *
     * - the source: must be a GeoJSON object, vector source definition, or an id of a source added via addSource()
     * - only a subset of paint properties are available.
     *
     * @param {object} style - a style following the Mapbox style specification.
     * @param {any} nativeMapView - native map view (com.mapbox.mapboxsdk.maps.MapView)
     *
     * @link https://docs.mapbox.com/mapbox-gl-js/style-spec/#layers
     */

    public async addLayer(style, belowLayerId?: string, nativeMap?): Promise<void> {
        const theMap = nativeMap || this._mapboxMapInstance;
        if (!theMap) {
            return Promise.reject('No map has been loaded');
        }
        let source = null;
        if (typeof style.source != 'string') {
            await this.addSource(style.id + '_source', style.source);
            source = theMap.getStyle().getSource(style.id + '_source');
        } else {
            source = theMap.getStyle().getSource(style.source);
        }

        const layer = await LayerFactory.createLayer(style, source);
        if (belowLayerId) {
            this._mapboxMapInstance.getStyle().addLayerBelow(layer.getNativeInstance(), belowLayerId);
            return;
        }
        this._mapboxMapInstance.getStyle().addLayer(layer.getNativeInstance());
    }

    /**
     * remove layer by ID
     *
     * Removes a layer given a layer id
     *
     * @param {string} id
     */
    public async removeLayer(id: string, nativeMap?) {
        const theMap = nativeMap || this._mapboxMapInstance;

        theMap.getStyle().removeLayer(id);

        if (Trace.isEnabled()) {
            CLog(CLogTypes.info, 'Mapbox:removeLayer(): after removing layer');
        }
    }

    /**
     * @deprecated
     * Add a point to a line
     *
     * This method appends a point to a line and is useful for drawing a users track.
     *
     * @param {id} id - id of line to add a point to.
     * @param {array} lnglat - [lng,lat] to append to the line.
     *
     * @link https://github.com/mapbox/mapbox-gl-native/issues/13983
     * @link https://docs.mapbox.com/android/api/mapbox-java/libjava-geojson/3.0.1/com/mapbox/geojson/Feature.html#Feature--
     * @link https://docs.oracle.com/javase/8/docs/api/java/util/List.html
     */
    public async addLinePoint(id: string, lnglat, sourceId?: string, nativeMapView?): Promise<void> {
        try {
            const sId = !!sourceId ? sourceId : id + '_source';
            const lineSource = this._mapboxMapInstance.getStyle().getSource(sId) as com.mapbox.mapboxsdk.style.sources.GeoJsonSource;

            if (!lineSource) {
                throw new Error(`no source found with id: ${sId}`);
            }

            const lineFeatures = lineSource.querySourceFeatures(ExpressionParser.parseJson(['==', '$type', 'LineString']));

            if (lineFeatures.size() === 0) {
                throw new Error('no line string feature found');
            }

            const feature = lineFeatures.get(0);

            const newPoints = new java.util.ArrayList<com.mapbox.geojson.Point>(feature.geometry().coordinates());
            newPoints.add(com.mapbox.geojson.Point.fromLngLat(lnglat[0], lnglat[1]));

            const newFeature = com.mapbox.geojson.LineString.fromLngLats(newPoints);
            lineSource.setGeoJson(newFeature);
        } catch (error) {
            return error;
        }
    }

    addGeoJsonClustered(options: AddGeoJsonClusteredOptions, nativeMap?): Promise<void> {
        return new Promise((resolve, reject) => {
            try {
                this._mapboxMapInstance.getStyle().addSource(
                    new com.mapbox.mapboxsdk.style.sources.GeoJsonSource(
                        options.name,
                        new java.net.URL(options.data),
                        new com.mapbox.mapboxsdk.style.sources.GeoJsonOptions()
                            .withCluster(true)
                            .withClusterMaxZoom(options.clusterMaxZoom || 13)
                            .withClusterRadius(options.clusterRadius || 40)
                    )
                );

                const layers = [];
                if (options.clusters) {
                    for (let i = 0; i < options.clusters.length; i++) {
                        // TODO also allow Color object
                        layers.push([options.clusters[i].points, new Color(options.clusters[i].color).android]);
                    }
                } else {
                    layers.push([150, new Color('red').android]);
                    layers.push([20, new Color('green').android]);
                    layers.push([0, new Color('blue').android]);
                }

                const unclustered = new com.mapbox.mapboxsdk.style.layers.SymbolLayer('unclustered-points', options.name);
                unclustered.setProperties([
                    com.mapbox.mapboxsdk.style.layers.PropertyFactory.circleColor(new Color('red').android),
                    com.mapbox.mapboxsdk.style.layers.PropertyFactory.circleRadius(new java.lang.Float(16.0)),
                    com.mapbox.mapboxsdk.style.layers.PropertyFactory.circleBlur(new java.lang.Float(0.2))
                ]);
                unclustered.setFilter(com.mapbox.mapboxsdk.style.expressions.Expression.neq(com.mapbox.mapboxsdk.style.expressions.Expression.get('cluster'), true));
                this._mapboxMapInstance.getStyle().addLayer(unclustered); // , "building");

                for (let i = 0; i < layers.length; i++) {
                    // Add some nice circles
                    const circles = new com.mapbox.mapboxsdk.style.layers.CircleLayer('cluster-' + i, options.name);
                    circles.setProperties([
                        // com.mapbox.mapboxsdk.style.layers.PropertyFactory.iconImage("icon")
                        com.mapbox.mapboxsdk.style.layers.PropertyFactory.circleColor(layers[i][1]),
                        com.mapbox.mapboxsdk.style.layers.PropertyFactory.circleRadius(new java.lang.Float(22.0)),
                        com.mapbox.mapboxsdk.style.layers.PropertyFactory.circleBlur(new java.lang.Float(0.2))
                    ]);

                    const pointCount = com.mapbox.mapboxsdk.style.expressions.Expression.toNumber(com.mapbox.mapboxsdk.style.expressions.Expression.get('point_count'));
                    if (i === 0) {
                        circles.setFilter(
                            com.mapbox.mapboxsdk.style.expressions.Expression.gte(pointCount, com.mapbox.mapboxsdk.style.expressions.Expression.literal(java.lang.Integer.valueOf(layers[i][0])))
                        );
                    } else {
                        circles.setFilter(
                            com.mapbox.mapboxsdk.style.expressions.Expression.all([
                                com.mapbox.mapboxsdk.style.expressions.Expression.gte(pointCount, com.mapbox.mapboxsdk.style.expressions.Expression.literal(java.lang.Integer.valueOf(layers[i][0]))),
                                com.mapbox.mapboxsdk.style.expressions.Expression.lt(pointCount, com.mapbox.mapboxsdk.style.expressions.Expression.literal(java.lang.Integer.valueOf(layers[i - 1][0])))
                            ])
                        );
                    }

                    this._mapboxMapInstance.getStyle().addLayer(circles); // , "building");
                }

                // Add the count labels (note that this doesn't show.. #sad)
                const count = new com.mapbox.mapboxsdk.style.layers.SymbolLayer('count', options.name);
                count.setProperties([
                    com.mapbox.mapboxsdk.style.layers.PropertyFactory.textField(com.mapbox.mapboxsdk.style.expressions.Expression.get('point_count')),
                    com.mapbox.mapboxsdk.style.layers.PropertyFactory.textSize(new java.lang.Float(12.0)),
                    com.mapbox.mapboxsdk.style.layers.PropertyFactory.textColor(new Color('white').android)
                ]);
                this._mapboxMapInstance.getStyle().addLayer(count);

                resolve();
            } catch (ex) {
                if (Trace.isEnabled()) {
                    CLog(CLogTypes.info, 'Error in mapbox.addGeoJsonClustered: ' + ex);
                }
                reject(ex);
            }
        });
    }

    /**
     * constantly center the map on the users location.
     */
    trackUser(options: TrackUserOptions, nativeMap?): Promise<void> {
        if (Trace.isEnabled()) {
            CLog(CLogTypes.info, 'trackUser(): top');
        }

        return new Promise((resolve, reject) => {
            try {
                if (!this._mapboxMapInstance) {
                    reject('No map has been loaded');
                    return;
                }

                this.requestFineLocationPermission()
                    .then(() => {
                        if (this._locationComponent) {
                            this.changeUserLocationMarkerMode(options.renderMode || 'COMPASS', options.cameraMode || 'TRACKING');
                        } else {
                            this.showUserLocationMarker({
                                useDefaultLocationEngine: true
                            });
                        }
                    })
                    .catch((err) => {
                        console.error('Location permission denied. error:', err);
                    });

                resolve();
            } catch (ex) {
                if (Trace.isEnabled()) {
                    CLog(CLogTypes.info, 'Error in mapbox.trackUser: ' + ex);
                }
                reject(ex);
            }
        });
    }

    private static getAndroidColor(color: string | Color): any {
        let androidColor;

        if (color && Color.isValid(color)) {
            androidColor = new Color('' + color).android;
        } else {
            androidColor = new Color('#000').android;
        }

        return androidColor;
    }

    _getMapStyle(input: any): any {
        if (Trace.isEnabled()) {
            CLog(CLogTypes.info, '_getMapStyle(): top with input:', input);
        }

        const Style = com.mapbox.mapboxsdk.maps.Style;

        // allow for a style URL to be passed

        if (input.startsWith('mapbox://styles') || input.startsWith('http://') || input.startsWith('https://')) {
            return input;
        } else if (input.startsWith('~/')) {
            return 'file://' + path.join(knownFolders.currentApp().path, input.replace('~/', ''));
        } else if (input === MapStyle.LIGHT) {
            return Style.LIGHT;
        } else if (input === MapStyle.DARK) {
            return Style.DARK;
        } else if (input === MapStyle.OUTDOORS) {
            return Style.OUTDOORS;
        } else if (input === MapStyle.SATELLITE) {
            return Style.SATELLITE;
        } else if (input === MapStyle.SATELLITE_STREETS) {
            return Style.SATELLITE_STREETS;
        } else if (input === MapStyle.TRAFFIC_DAY) {
            return Style.TRAFFIC_DAY;
        } else if (input === MapStyle.TRAFFIC_NIGHT) {
            return Style.TRAFFIC_NIGHT;
        } else {
            // default
            return Style.MAPBOX_STREETS;
        }
    }

    /**
     * Mapbox Map Options
     *
     * @link https://github.com/mapbox/mapbox-gl-native/wiki/Android-6.x-to-7.x-migration-guide
     * @link https://github.com/mapbox/mapbox-gl-native/blob/master/platform/android/MapboxGLAndroidSDK/src/main/java/com/mapbox/mapboxsdk/maps/MapboxMapOptions.java
     * @link https://docs.mapbox.com/android/api/map-sdk/7.1.2/com/mapbox/mapboxsdk/maps/MapboxMapOptions.html
     */

    _getMapboxMapOptions(settings) {
        const mapboxMapOptions = new com.mapbox.mapboxsdk.maps.MapboxMapOptions()
            .compassEnabled(!settings.hideCompass)
            .rotateGesturesEnabled(!settings.disableRotation)
            .scrollGesturesEnabled(!settings.disableScroll)
            .tiltGesturesEnabled(!settings.disableTilt)
            .zoomGesturesEnabled(!settings.disableZoom)
            .attributionEnabled(!settings.hideAttribution)
            .logoEnabled(!settings.hideLogo);

        // zoomlevel is not applied unless center is set
        if (settings.zoomLevel && !settings.center) {
            // Eiffel tower, Paris
            settings.center = {
                lat: 48.858093,
                lng: 2.294694
            };
        }

        if (settings.center && settings.center.lat && settings.center.lng) {
            const cameraPositionBuilder = new com.mapbox.mapboxsdk.camera.CameraPosition.Builder()
                .zoom(settings.zoomLevel)
                .target(new com.mapbox.mapboxsdk.geometry.LatLng(settings.center.lat, settings.center.lng));
            mapboxMapOptions.camera(cameraPositionBuilder.build());
        }

        return mapboxMapOptions;
    }

    /**
     * convert string to camera mode constant.
     *
     * @link https://docs.mapbox.com/android/api/map-sdk/8.1.0/com/mapbox/mapboxsdk/location/modes/CameraMode.html
     */
    _stringToCameraMode(mode: UserLocationCameraMode): any {
        const modeRef = com.mapbox.mapboxsdk.location.modes.CameraMode;

        switch (mode) {
            case 'NONE':
                return modeRef.NONE;

            case 'NONE_COMPASS':
                return modeRef.NONE_COMPASS;

            case 'NONE_GPS':
                return modeRef.NONE_GPS;

            case 'TRACKING':
                return modeRef.TRACKING;

            case 'TRACKING_COMPASS':
                return modeRef.TRACKING_COMPASS;

            case 'TRACKING_GPS':
                return modeRef.TRACKING_GPS;

            case 'TRACKING_GPS_NORTH':
                return modeRef.TRACKING_GPS_NORTH;
        }
    }

    /**
     * convert string to render mode
     */
    _stringToRenderMode(mode): any {
        let renderMode: any;

        switch (mode) {
            case 'NORMAL':
                renderMode = com.mapbox.mapboxsdk.location.modes.RenderMode.NORMAL;
                break;

            case 'COMPASS':
                renderMode = com.mapbox.mapboxsdk.location.modes.RenderMode.COMPASS;
                break;

            case 'GPS':
                renderMode = com.mapbox.mapboxsdk.location.modes.RenderMode.GPS;
                break;
        }

        return renderMode;
    }

    _convertCameraMode(mode: any): UserLocationCameraMode {
        const modeRef = com.mapbox.mapboxsdk.location.modes.CameraMode;

        switch (mode) {
            case modeRef.NONE:
                return 'NONE';

            case modeRef.NONE_COMPASS:
                return 'NONE_COMPASS';

            case modeRef.NONE_GPS:
                return 'NONE_GPS';

            case modeRef.TRACKING:
                return 'TRACKING';

            case modeRef.TRACKING_COMPASS:
                return 'TRACKING_COMPASS';

            case modeRef.TRACKING_GPS:
                return 'TRACKING_GPS';

            case modeRef.TRACKING_GPS_NORTH:
                return 'TRACKING_GPS_NORTH';
        }

        return 'NONE';
    }

    _fineLocationPermissionGranted() {
        let hasPermission = android.os.Build.VERSION.SDK_INT < 23; // Android M. (6.0)

        if (!hasPermission) {
            hasPermission = com.mapbox.android.core.permissions.PermissionsManager.areLocationPermissionsGranted(Application.android.context);
        }

        return hasPermission;
    }

    _getRegionName(offlineRegion: com.mapbox.mapboxsdk.offline.OfflineRegion) {
        const metadata = offlineRegion.getMetadata();
        const jsonStr = new java.lang.String(metadata, 'UTF-8');
        const jsonObj = new org.json.JSONObject(jsonStr as any as string);
        try {
            return jsonObj.getString('name');
        } catch (error) {
            return '';
        }
    }

    _getRegionMetadata(offlineRegion: com.mapbox.mapboxsdk.offline.OfflineRegion) {
        const metadata = offlineRegion.getMetadata();
        const jsonStr = new java.lang.String(metadata, 'UTF-8');
        const jsonObj = new org.json.JSONObject(jsonStr as any as string);
        return JSON.parse(jsonObj.toString());
    }

    /**
     * show a user location marker
     *
     * This method must not be called before location permissions have been granted.
     *
     * Supported options are:
     *
     * - foregroundTintColor
     * - foregroundStaleTintColor
     * - backgroundTintColor
     * - bearingTintColor
     * - elevation
     * - accuracyColor
     * - accuracyAlpha
     * - useDefaultLocationEngine
     * - renderMode
     * - cameraMode
     * - clickListener
     * - cameraTrackingChangeListener
     *
     * @param {object} options
     *
     * @link https://github.com/mapbox/mapbox-android-demo/blob/master/MapboxAndroidDemo/src/main/java/com/mapbox/mapboxandroiddemo/examples/location/LocationComponentOptionsActivity.java
     * @link https://developer.android.com/reference/android/graphics/Color
     *
     * @todo at least with simulated data, the location is only updated once hence adding support for forceLocation method.
     */
    showUserLocationMarker(options: any, nativeMap?): Promise<void> {
        return new Promise((resolve, reject) => {
            try {
                if (Trace.isEnabled()) {
                    CLog(CLogTypes.info, 'showUserLocationMarker()');
                }

                if (!this._mapboxMapInstance) {
                    reject('No map has been loaded');
                    return;
                }

                if (!com.mapbox.android.core.permissions.PermissionsManager.areLocationPermissionsGranted(Application.android.context)) {
                    if (Trace.isEnabled()) {
                        CLog(CLogTypes.info, 'showUserLocationMarker(): location permissions are not granted.');
                    }

                    reject('Location permissions not granted.');
                    return;
                }

                let componentOptionsBuilder = com.mapbox.mapboxsdk.location.LocationComponentOptions.builder(Application.android.context);

                if (typeof options.elevation != 'undefined') {
                    componentOptionsBuilder = componentOptionsBuilder.elevation(options.elevation);
                }

                if (typeof options.accuracyColor != 'undefined') {
                    componentOptionsBuilder = componentOptionsBuilder.accuracyColor(android.graphics.Color.parseColor(options.accuracyColor));
                }

                if (typeof options.accuracyAlpha != 'undefined') {
                    componentOptionsBuilder = componentOptionsBuilder.accuracyAlpha(options.accuracyAlpha);
                }

                if (typeof options.foregroundTintColor != 'undefined') {
                    const foregroundTintColor = new java.lang.Integer(android.graphics.Color.parseColor(options.foregroundTintColor));
                    componentOptionsBuilder = componentOptionsBuilder.foregroundTintColor(foregroundTintColor);
                }

                if (typeof options.foregroundStaleTintColor != 'undefined') {
                    const foregroundStaleTintColor = new java.lang.Integer(android.graphics.Color.parseColor(options.foregroundStaleTintColor));
                    componentOptionsBuilder = componentOptionsBuilder.foregroundStaleTintColor(foregroundStaleTintColor);
                }

                if (typeof options.backgroundTintColor != 'undefined') {
                    const backgroundTintColor = new java.lang.Integer(android.graphics.Color.parseColor(options.backgroundTintColor));
                    componentOptionsBuilder = componentOptionsBuilder.backgroundTintColor(backgroundTintColor);
                }

                if (typeof options.bearingTintColor != 'undefined') {
                    const bearingTintColor = new java.lang.Integer(android.graphics.Color.parseColor(options.bearingTintColor));
                    componentOptionsBuilder = componentOptionsBuilder.bearingTintColor(bearingTintColor);
                }

                const componentOptions = componentOptionsBuilder.build();

                this._locationComponent = this._mapboxMapInstance.getLocationComponent();

                const activationOptionsBuilder = com.mapbox.mapboxsdk.location.LocationComponentActivationOptions.builder(Application.android.context, this._mapboxMapInstance.getStyle());

                activationOptionsBuilder.locationComponentOptions(componentOptions);

                let useDefaultEngine = true;

                if (typeof options.useDefaultLocationEngine != 'undefined') {
                    useDefaultEngine = options.useDefaultLocationEngine;
                }
                activationOptionsBuilder.useDefaultLocationEngine(useDefaultEngine);

                const locationComponentActivationOptions = activationOptionsBuilder.build();

                this._locationComponent.activateLocationComponent(locationComponentActivationOptions);
                this._locationComponent.setLocationComponentEnabled(true);

                let cameraMode = this._stringToCameraMode('TRACKING');

                if (typeof options.cameraMode != 'undefined') {
                    cameraMode = this._stringToCameraMode(options.cameraMode);
                }

                this._locationComponent.setCameraMode(cameraMode);

                let renderMode = com.mapbox.mapboxsdk.location.modes.RenderMode.COMPASS;

                if (typeof options.renderMode != 'undefined') {
                    renderMode = this._stringToRenderMode(options.renderMode);
                }

                this._locationComponent.setRenderMode(renderMode);

                if (Trace.isEnabled()) {
                    CLog(CLogTypes.info, 'showUserLocationMarker(): after renderMode');
                }

                if (typeof options.clickListener != 'undefined') {
                    this.onLocationClickListener = new com.mapbox.mapboxsdk.location.OnLocationClickListener({
                        onLocationComponentClick: () => {
                            options.clickListener();
                        }
                    });

                    this._locationComponent.addOnLocationClickListener(this.onLocationClickListener);
                }

                if (typeof options.cameraTrackingChangedListener != 'undefined') {
                    this._locationComponent.addOnCameraTrackingChangedListener(options.cameraTrackingChangedListener);
                }

                resolve();
            } catch (ex) {
                if (Trace.isEnabled()) {
                    CLog(CLogTypes.info, 'Error in mapbox.showUserLocationMarker: ' + ex);
                }
                reject(ex);
            }
        });
    }

    /**
     * hide (destroy) the user location marker
     *
     * This method destroys the user location marker.
     */
    hideUserLocationMarker(nativeMap?): Promise<void> {
        return new Promise((resolve, reject) => {
            try {
                if (Trace.isEnabled()) {
                    CLog(CLogTypes.info, 'hideUserLocationMarker(): top');
                }

                if (!this._mapboxMapInstance) {
                    reject('No map has been loaded');
                    return;
                }

                if (!this._locationComponent) {
                    if (Trace.isEnabled()) {
                        CLog(CLogTypes.info, 'hideUserLocationMarker(): no location component is loaded.');
                    }

                    resolve();
                    return;
                }

                this._locationComponent.setLocationComponentEnabled(false);

                resolve();
            } catch (ex) {
                if (Trace.isEnabled()) {
                    CLog(CLogTypes.info, 'Error in mapbox.hideUserLocationMarker: ' + ex);
                }
                reject(ex);
            }
        });
    }

    /**
     * Change the mode of the user location marker
     *
     * Used to change the camera tracking and render modes of an existing
     * marker.
     *
     * The marker must be configured using showUserLocationMarker before this method
     * can called.
     */
    changeUserLocationMarkerMode(renderModeString, cameraModeString: UserLocationCameraMode, nativeMap?): Promise<void> {
        return new Promise((resolve, reject) => {
            try {
                if (!this._locationComponent) {
                    reject('No location component has been loaded');
                    return;
                }

                if (cameraModeString) {
                    const cameraMode = this._stringToCameraMode(cameraModeString);
                    if (Trace.isEnabled()) {
                        CLog(CLogTypes.info, `Mapbox::changeUserLocationMarkerMode(): current camera mode is: ${this._locationComponent.getCameraMode()}`);
                        CLog(CLogTypes.info, `Mapbox::changeUserLocationMarkerMode(): changing camera mode to: ${cameraMode}`);
                    }

                    this._locationComponent.setCameraMode(cameraMode);

                    if (Trace.isEnabled()) {
                        CLog(CLogTypes.info, `Mapbox::changeUserLocationMarkerMode(): new camera mode is: ${this._locationComponent.getCameraMode()}`);
                    }
                }

                if (renderModeString) {
                    const renderMode = this._stringToRenderMode(renderModeString);
                    if (Trace.isEnabled()) {
                        CLog(CLogTypes.info, `Mapbox::changeUserLocationMarkerMode(): current render mode is: ${this._locationComponent.getRenderMode()}`);
                        CLog(CLogTypes.info, `Mapbox::changeUserLocationMarkerMode(): changing render mode to: '${renderMode}'`);
                    }

                    this._locationComponent.setRenderMode(renderMode);

                    if (Trace.isEnabled()) {
                        CLog(CLogTypes.info, 'changeUserLocationMarkerMode(): new render mode is:', this._locationComponent.getRenderMode());
                    }
                }
            } catch (ex) {
                if (Trace.isEnabled()) {
                    CLog(CLogTypes.info, 'Error in mapbox.changeUserLocationMarkerMode: ' + ex);
                }
                reject(ex);
            }
        });
    }

    /**
     * force updating of user location
     *
     * This method forces the user location marker, if displayed, to move to a new location
     *
     * @todo figure out why the user location marker is not updating.
     */
    forceUserLocationUpdate(location: any, nativeMap?): Promise<void> {
        return new Promise((resolve, reject) => {
            try {
                if (Trace.isEnabled()) {
                    CLog(CLogTypes.info, 'forceUserLocation(): top');
                }

                if (!this._locationComponent) {
                    reject('No location component has been loaded');
                    return;
                }

                // the location object needs to be converted into an android location

                const nativeLocation = new android.location.Location('background');

                nativeLocation.setLatitude(location.latitude);
                nativeLocation.setLongitude(location.longitude);
                nativeLocation.setAltitude(location.altitude);

                this._locationComponent.forceLocationUpdate(nativeLocation);

                resolve();
            } catch (ex) {
                if (Trace.isEnabled()) {
                    CLog(CLogTypes.info, 'Error in mapbox.forceUserLocationUpdate: ' + ex);
                }
                reject(ex);
            }
        });
    }

    getLayer(name: string, nativeMap?: any): Promise<LayerCommon> {
        return new Promise((resolve, reject) => {
            try {
                const theMap = nativeMap || this._mapboxMapInstance;

                if (!theMap) {
                    reject('No map has been loaded');
                    return;
                }

                const styleLoadedCallback = new com.mapbox.mapboxsdk.maps.Style.OnStyleLoaded({
                    onStyleLoaded: (style) => {
                        const layer = style.getLayer(name);
                        resolve(layer ? new Layer(layer) : null);
                    }
                });

                theMap.getStyle(styleLoadedCallback);
            } catch (ex) {
                if (Trace.isEnabled()) {
                    CLog(CLogTypes.info, 'Error in mapbox.getLayer: ' + ex);
                }
                reject(ex);
            }
        });
    }

    getLayers(nativeMap?: any): Promise<LayerCommon[]> {
        return new Promise((resolve, reject) => {
            try {
                const theMap = nativeMap || this._mapboxMapInstance;

                if (!theMap) {
                    reject('No map has been loaded');
                    return;
                }

                const styleLoadedCallback = new com.mapbox.mapboxsdk.maps.Style.OnStyleLoaded({
                    onStyleLoaded: (style) => {
                        const layers = style.getLayers();
                        const result: Layer[] = [];

                        for (let i = 0; i < layers.size(); i++) {
                            result.push(new Layer(layers.get(i)));
                        }

                        resolve(result);
                    }
                });

                theMap.getStyle(styleLoadedCallback);
            } catch (ex) {
                if (Trace.isEnabled()) {
                    CLog(CLogTypes.info, 'Error in mapbox.getLayers: ' + ex);
                }
                reject(ex);
            }
        });
    }

    _getClickedMarkerDetails(clicked) {
        for (const m in this._markers) {
            const cached = this._markers[m];
            if (
                // eslint-disable-next-line eqeqeq
                cached.lat == clicked.getPosition().getLatitude() &&
                // eslint-disable-next-line eqeqeq
                cached.lng == clicked.getPosition().getLongitude() &&
                // eslint-disable-next-line eqeqeq
                cached.title == clicked.getTitle() && // == because of null vs undefined
                // eslint-disable-next-line eqeqeq
                cached.subtitle == clicked.getSnippet()
            ) {
                return cached;
            }
        }
    }

    _downloadImage(marker) {
        return new Promise((resolve, reject) => {
            // to cache..
            if (this._markerIconDownloadCache[marker.icon]) {
                marker.iconDownloaded = this._markerIconDownloadCache[marker.icon];
                resolve(marker);
                return;
            }
            // ..or not to cache
            Http.getImage(marker.icon).then(
                (output) => {
                    marker.iconDownloaded = output.android;
                    this._markerIconDownloadCache[marker.icon] = marker.iconDownloaded;
                    resolve(marker);
                },
                (e) => {
                    console.error(`Download failed for ' ${marker.icon}' with error: ${e}`);
                    resolve(marker);
                }
            );
        });
    }

    _downloadMarkerImages(markers) {
        const iterations = [];
        const result = [];
        for (let i = 0; i < markers.length; i++) {
            const marker = markers[i];
            if (marker.icon && marker.icon.startsWith('http')) {
                const p = this._downloadImage(marker).then((mark) => {
                    result.push(mark);
                });
                iterations.push(p);
            } else {
                result.push(marker);
            }
        }
        return Promise.all(iterations).then((output) => result);
    }
    project(data: LatLng) {
        const mapboxPoint = new com.mapbox.mapboxsdk.geometry.LatLng(data.lat, data.lng);
        const screenLocation = this._mapboxMapInstance.getProjection().toScreenLocation(mapboxPoint);
        return { x: Utils.layout.toDeviceIndependentPixels(screenLocation.x), y: Utils.layout.toDeviceIndependentPixels(screenLocation.y) };
    }
    projectBack(screenCoordinate: { x: number; y: number }): LatLng {
        const pointf = new android.graphics.PointF(screenCoordinate.x, screenCoordinate.y);
        const coordinate = this._mapboxMapInstance.getProjection().fromScreenLocation(pointf);
        return {
            lat: coordinate.getLatitude(),
            lng: coordinate.getLongitude()
        };
    }

    getUserLocationCameraMode(nativeMap?: any): UserLocationCameraMode {
        if (!this._mapboxMapInstance) {
            return 'NONE';
        }

        if (!this._locationComponent) {
            return 'NONE';
        }

        return this._convertCameraMode(this._locationComponent.getCameraMode());
    }
}
