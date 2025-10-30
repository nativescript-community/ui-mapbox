/**
 * Android Implementation
 *
 * @todo FIXME: The gcFix() implementation currently assumes only one map visible at a time.
 */

import { check, request } from '@nativescript-community/perms';
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
    ControlPosition,
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
    ShowResult,
    TrackUserOptions,
    UpdateSourceOptions,
    UserLocation,
    UserLocationCameraMode,
    Viewport,
    telemetryProperty
} from './common';
import { transformValue } from './layers/parser/property-parser.android';
import { MarkerManager } from './markers/MarkerManager.android';
import { AndroidMarker } from './markers/Marker.android';

// Export the enums for devs not using TS

export * from './common';

function bitmapFromDrawableResource(resourceId: string): android.graphics.Bitmap {
    // 1. Get the Drawable
    const context = Utils.android.getApplicationContext();
    const identifier = context.getResources().getIdentifier(resourceId, 'drawable', Utils.android.getApplication().getPackageName());
    // if (identifier !== 0) {
    if (0 < identifier) {
        const drawable = androidx.core.content.ContextCompat.getDrawable(context, identifier);

        // 2. Create a Bitmap with the same dimensions
        const width = drawable.getIntrinsicWidth();
        const height = drawable.getIntrinsicHeight();
        const bitmap = android.graphics.Bitmap.createBitmap(width, height, android.graphics.Bitmap.Config.ARGB_8888);

        // 3. Create a Canvas to draw onto the Bitmap
        const canvas = new android.graphics.Canvas(bitmap);
        drawable.setBounds(0, 0, canvas.getWidth(), canvas.getHeight());
        drawable.draw(canvas);

        return bitmap;
    }
}

// let libraryLoadedOverloaded = false;
// function overrideLibraryLoader() {
//     try {
//         if (true && !libraryLoadedOverloaded) {
//             @NativeClass
//             class LibraryLoader extends com.mapbox.maps.LibraryLoader {
//                 load(name) {
//                     java.lang.System.loadLibrary(name);
//                 }
//             }
//             com.mapbox.maps.LibraryLoader.setLibraryLoader(new LibraryLoader());
//             libraryLoadedOverloaded = true;
//         }
//     } catch (error) {
//         console.error(error);
//     }
// }

// overrideLibraryLoader();

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
    //TODO: Logger
    // const Logger = com.mapbox.maps.log.Logger;
    // let loggingLevel: number;
    // switch (level) {
    //     case 'none':
    //         loggingLevel = Logger.NONE;
    //         break;
    //     case 'info':
    //         loggingLevel = Logger.INFO;
    //         break;
    //     case 'debug':
    //         loggingLevel = Logger.DEBUG;
    //         break;
    //     case 'verbose':
    //         loggingLevel = Logger.VERBOSE;
    //         break;
    //     case 'fault':
    //     case 'error':
    //         loggingLevel = Logger.ERROR;
    //         break;
    // }
    // Logger.setVerbosity(loggingLevel);
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

    private nativeMapView: com.mapbox.maps.MapView;

    mapbox: Mapbox;

    private settings: ShowOptions = null;

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
    setConfig(settings: ShowOptions) {
        if (Trace.isEnabled()) {
            CLog(CLogTypes.info, 'setConfig()');
        }
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
    public getMapboxApi() {
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
    public createNativeView(): object {
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
        // Application.android.on(Application.android.activityPausedEvent, this.onPause, this);
        // Application.android.on(Application.android.activityResumedEvent, this.onResume, this);
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

        this.mapbox?.destroy();
        this.mapbox = null;
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
    async initMap() {
        const accessToken = this.config?.accessToken ?? this.settings?.accessToken;
        if (Trace.isEnabled()) {
            CLog(CLogTypes.info, "MapboxView:initMap(): top - accessToken is '" + accessToken + "'", this.config);
        }
        if (!accessToken) {
            throw new Error('missing accessToken');
        }

        if (!this.nativeMapView) {
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
                onMapReady: (map: com.mapbox.maps.MapboxMap, view: com.mapbox.maps.MapView) => {
                    this.nativeMapView = view;
                    if (this.telemetry === false) {
                        com.nativescript.mapbox.Telemetry.setUserTelemetryRequestState(this.nativeMapView, false);
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
                        CLog(CLogTypes.info, 'initMap(): onScrollEvent event:' + JSON.stringify(event));
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

            await this.mapbox.show(this.settings);

            if (Trace.isEnabled()) {
                CLog(CLogTypes.info, 'initMap(): bottom.');
            }
        }
    }

    [telemetryProperty.setNative](value: boolean) {
        com.nativescript.mapbox.Telemetry.setUserTelemetryRequestState(this.nativeMapView, false);
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
    private _mapboxMapInstance: com.mapbox.maps.MapboxMap;
    private _mapboxViewInstance: com.mapbox.maps.MapView;

    // private _locationComponent: com.mapbox.maps.plugin.locationcomponent.LocationComponent;

    private _accessToken: string = '';

    // private circleManager: any = null;
    private lineManager: com.mapbox.maps.plugin.annotation.generated.PolylineAnnotationManager = null;
    private polygonManager: com.mapbox.maps.plugin.annotation.generated.PolygonAnnotationManager = null;
    // private symbolManager: com.mapbox.maps.plugin.annotation.SymbolManager = null;

    private _offlineManager: com.mapbox.maps.OfflineManager;
    private _tileStore: com.mapbox.common.TileStore;

    private markerManager: MarkerManager;
    private customMarker: AndroidMarker = null;

    // event listeners
    // private onDidFailLoadingMapListener;
    // private onDidFinishLoadingMapListener;
    // private onMapReadyCallback;
    // private onDidFinishLoadingStyleListener;
    private onAnnotationClickListener;
    // private onMarkerClickListener;
    // private onInfoWindowClickListener;
    private onMapClickListener;
    private onMapLongClickListener;
    private onMoveEndListener;
    private onMoveBeginListener;
    private onScrollListener;
    private onFlingListener;
    private onCameraMoveListener: com.mapbox.common.Cancelable;
    private onCameraMoveCancelListener;
    private onMapIdleListener: com.mapbox.common.Cancelable;
    // private onLocationClickListener;

    onIndicatorPositionChangedListener: com.mapbox.maps.plugin.locationcomponent.OnIndicatorPositionChangedListener;
    lastKnownLocation: com.mapbox.geojson.Point;

    // private iconFactory;

    private _markers: MapboxMarker[] = [];
    private _polylines: { [k: string]: com.mapbox.maps.plugin.annotation.generated.PolylineAnnotation } = {};
    private _polygons: { [k: string]: com.mapbox.maps.plugin.annotation.generated.PolygonAnnotation } = {};

    // list of polylines

    private lines: {
        id: string | number;
        android;
    }[] = [];

    // registered callbacks.

    private eventCallbacks: { [key: string]: any[] } = {};

    _markerIconDownloadCache: { [k: string]: ImageSource } = {};

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
    async show(options: ShowOptions): Promise<ShowResult> {
        return new Promise((resolve, reject) => {
            try {
                const settings = Mapbox.merge(options, Mapbox.defaults);

                // const showIt = () => {
                if (Trace.isEnabled()) {
                    CLog(CLogTypes.info, 'show(): ' + JSON.stringify(settings.center));
                }

                // if no accessToken was set the app may crash.
                //
                // FIXME: Even if using a local server add some string.

                if (settings.accessToken === undefined) {
                    throw new Error('mapbox_accesstoken_missing');
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

                let context = Utils.android.getApplicationContext();

                if (settings.context) {
                    context = settings.context;
                }

                const mapboxMapOptions = this._getMapboxMapOptions(context, settings);

                // unlike the Mapbox Android Native samples, we are not laying the map out
                // using the Android XML layout features. Instead, we are creating the map
                // programmatically.

                this._mapboxViewInstance = new com.mapbox.maps.MapView(context, mapboxMapOptions);

                // define some listeners to inform in case the map does not
                // load.

                this._mapboxMapInstance = this._mapboxViewInstance.getMapboxMap();

                const gesturePlugin = this._getGesturesPlugin();
                gesturePlugin.setPitchEnabled(!settings.disableTilt);
                gesturePlugin.setScrollEnabled(!settings.disableScroll);
                gesturePlugin.setRotateEnabled(!settings.disableRotation);
                gesturePlugin.setPinchToZoomDecelerationEnabled(!settings.disableZoom);

                const attributionPlugin = this._getPlugin<com.mapbox.maps.plugin.attribution.AttributionPlugin>('MAPBOX_ATTRIBUTION_PLUGIN_ID');

                attributionPlugin.setEnabled(!settings.hideAttribution);
                attributionPlugin.setPosition(Mapbox.mapPositionToGravity(settings.attributionPosition));

                const compassPlugin = this._getPlugin<com.mapbox.maps.plugin.compass.CompassPlugin>('MAPBOX_COMPASS_PLUGIN_ID');
                compassPlugin.setEnabled(!settings.hideCompass);
                compassPlugin.setPosition(Mapbox.mapPositionToGravity(settings.compassPosition));

                const logoPlugin = this._getPlugin<com.mapbox.maps.plugin.logo.LogoPlugin>('MAPBOX_LOGO_PLUGIN_ID');
                logoPlugin.setEnabled(!settings.hideLogo);
                logoPlugin.setPosition(Mapbox.mapPositionToGravity(settings.logoPosition));

                if (Trace.isEnabled()) {
                    CLog(CLogTypes.info, 'show(): onMapReady() with instance:', this._mapboxMapInstance);
                }

                // Android SDK 7.0.0 and on requires that the style be set separately after the map
                // is initialized. We do not consider the map ready until the style has successfully
                // loaded.
                const mapStyle = this._getMapStyle(settings.style);
                if (Trace.isEnabled()) {
                    CLog(CLogTypes.info, 'show(): loadStyleUri:', mapStyle);
                }
                this._mapboxMapInstance.loadStyle(
                    mapStyle,
                    new com.mapbox.maps.Style.OnStyleLoaded({
                        onStyleLoaded: (param0: com.mapbox.maps.Style) => {
                            try {
                                if (Trace.isEnabled()) {
                                    CLog(CLogTypes.info, 'show(): style loaded.');
                                }
                                // initialize the event handlers now that we have a constructed view.

                                this.markerManager = new MarkerManager(
                                    this._mapboxMapInstance,
                                    this._mapboxViewInstance,
                                    (marker: AndroidMarker) => {
                                        if (Trace.isEnabled()) {
                                            CLog(CLogTypes.info, 'MarkerManager.onMarkerClicked():');
                                        }
                                        const cachedMarker = this._getClickedMarkerDetails(marker);
                                        if (cachedMarker?.onTap) {
                                            const result = cachedMarker.onTap(cachedMarker);
                                            return !!result;
                                        }
                                        return false;
                                    },
                                    (marker: AndroidMarker) => {
                                        const cachedMarker = this._getClickedMarkerDetails(marker);
                                        if (cachedMarker?.onCalloutTap) {
                                            const result = cachedMarker.onCalloutTap(cachedMarker);
                                            return !!result;
                                        }
                                        return false;
                                    }
                                );
                                this._addMarkers(settings.markers, this._mapboxViewInstance);
                                this.initEventHandlerShim(settings, this._mapboxViewInstance);

                                const annotationPlugin = this._getPlugin<com.mapbox.maps.plugin.annotation.AnnotationPlugin>('MAPBOX_ANNOTATION_PLUGIN_ID');
                                this.lineManager = annotationPlugin.createAnnotationManager(
                                    com.mapbox.maps.plugin.annotation.AnnotationType.PolylineAnnotation,
                                    new com.mapbox.maps.plugin.annotation.AnnotationConfig()
                                ) as com.mapbox.maps.plugin.annotation.generated.PolylineAnnotationManager;

                                this.onAnnotationClickListener = new com.mapbox.maps.plugin.annotation.generated.OnPolylineAnnotationClickListener({
                                    onAnnotationClick: (line: com.mapbox.maps.plugin.annotation.generated.PolylineAnnotation) => {
                                        if (Trace.isEnabled()) {
                                            CLog(CLogTypes.info, 'Mapbox:setMapStyle(): click on line:', line);
                                        }

                                        this.handleLineClickEvent(line);

                                        return true;
                                    }
                                });

                                this.lineManager.addClickListener(this.onAnnotationClickListener);

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
                                    settings.onMapReady(this._mapboxMapInstance, this._mapboxViewInstance);
                                }

                                resolve({ android: this._mapboxMapInstance, ios: null });
                            } catch (ex) {
                                if (Trace.isEnabled()) {
                                    CLog(CLogTypes.error, 'Error in mapbox.show.loadStyle: ' + ex);
                                }
                                console.error(ex, ex.stack);
                                reject(ex);
                            }
                        }
                    })
                );

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
                // };

                // FIXME: There is some initialization error. A short delay works around this.

                // setTimeout(showIt, settings.delay ? settings.delay : 200);
            } catch (ex) {
                if (Trace.isEnabled()) {
                    CLog(CLogTypes.error, 'Error in mapbox.show: ' + ex);
                }
                console.error(ex, ex.stack);
                reject(ex);
            }
        });
    }

    /**
     * hide the map
     */
    async hide() {
        try {
            if (this._mapboxViewInstance) {
                const viewGroup = this._mapboxViewInstance.getParent() as android.view.ViewGroup;
                if (viewGroup !== null) {
                    viewGroup.setVisibility(android.view.View.INVISIBLE);
                }
            }
        } catch (ex) {
            if (Trace.isEnabled()) {
                CLog(CLogTypes.info, 'Error in mapbox.hide: ' + ex);
            }
            throw ex;
        }
    }

    async unhide() {
        try {
            if (this._mapboxViewInstance) {
                (this._mapboxViewInstance.getParent() as android.view.ViewGroup).setVisibility(android.view.View.VISIBLE);
            } else {
                throw new Error('No map found');
            }
        } catch (ex) {
            if (Trace.isEnabled()) {
                CLog(CLogTypes.info, 'Error in mapbox.unhide: ' + ex);
            }
            throw ex;
        }
    }

    /**
     * destroy the map programmatically
     *
     * Destroy the map instance.
     */
    clear(nativeMap?: any) {
        this.clearEventListeners();
        this._markerIconDownloadCache = {};
        if (Trace.isEnabled()) {
            CLog(CLogTypes.info, 'destroy(): destroying mapbox view.');
        }

        if (this.lineManager) {
            this.lineManager.onDestroy();
            this.lineManager = null;
        }
        if (this.polygonManager) {
            this.polygonManager.onDestroy();
            this.polygonManager = null;
        }
        if (this.markerManager) {
            this.markerManager.destroy();
            this.markerManager = null;
        }

        // if (this.circleManager) {
        //     this.circleManager.onDestroy();
        //     this.circleManager = null;
        // }

        // if (this.symbolManager) {
        //     this.symbolManager.onDestroy();
        //     this.symbolManager = null;
        // }

        // if we have a location marker we need to disable it before destroying the map
        //
        // This is here to prevent a crash. The user code should disable/re-enable the
        // location marker.

        // if (this._locationComponent) {
        //     if (Trace.isEnabled()) {
        //         CLog(CLogTypes.info, 'destroy(): Location marker not disabled before destroy() called.');
        //     }

        const locationPlugin = this._getPlugin<com.mapbox.maps.plugin.locationcomponent.LocationComponentPlugin>('MAPBOX_LOCATION_COMPONENT_PLUGIN_ID');
        locationPlugin.setEnabled(false);
        // }

        if (this._mapboxViewInstance) {
            const viewGroup = this._mapboxViewInstance.getParent() as android.view.ViewGroup;
            if (viewGroup !== null) {
                if (Trace.isEnabled()) {
                    CLog(CLogTypes.info, 'destroy(): removing _mapboxViewInstance view.');
                }
                viewGroup.removeView(this._mapboxViewInstance);
            }

            // this._mapboxViewInstance.onPause();
            this._mapboxViewInstance.onStop();
            this._mapboxViewInstance.destroyDrawingCache();

            // let the API know that we're programmatically destroying the map.

            this._mapboxViewInstance.onDestroy();

            this._mapboxViewInstance = null;
            this._mapboxMapInstance = null;
        }
    }
    async destroy(nativeMap?: any) {
        this.clear();
    }

    // private enableUserLocationPlugin() {
    //     if (!this.map) {
    //         return;
    //     }
    //     try {
    //         const locationPlugin = this.mapView.getPlugin(com.mapbox.maps.plugin.locationcomponent.LocationComponentPlugin.class);

    //         locationPlugin.updateSettings((settings: any) => {
    //             settings.enabled = this._showUserLocation;
    //             if (this._showUserLocation) {
    //                 settings.puckBearingEnabled = true;
    //                 settings.locationPuck = com.mapbox.maps.plugin.LocationPuck2D.builder()
    //                     .bearingImage(
    //                         com.mapbox.maps.plugin.locationcomponent.ImageHolder.fromDrawable(
    //                             this._context // you may need context
    //                             /* your drawable resource id */
    //                         )
    //                     )
    //                     .build();
    //             }
    //             return settings;
    //         });
    //     } catch (e) {
    //         console.log('Error enabling user location plugin:', e);
    //     }
    // }

    /**
     * Clear Event Listeners
     *
     * Explicitly clear all registered event listeners. It's not clear to me whether or not this
     * is strictly necessary as I imagine these should all get cleaned up when the map is destroyed
     * but given the complication of NativeScript's garbage collection scheme it seems like a good
     * idea to remove these handlers explicitly.
     */
    private clearEventListeners() {
        // if (this.onDidFailLoadingMapListener) {
        //     this._mapboxViewInstance.removeOnDidFailLoadingMapListener(this.onDidFailLoadingMapListener);
        //     this.onDidFailLoadingMapListener = null;
        // }

        // if (this.onDidFinishLoadingMapListener) {
        //     this._mapboxViewInstance.removeOnDidFinishLoadingMapListener(this.onDidFinishLoadingMapListener);
        //     this.onDidFinishLoadingMapListener = null;
        // }

        // if (this.onDidFinishLoadingStyleListener) {
        //     this._mapboxViewInstance.removeOnDidFinishLoadingStyleListener(this.onDidFinishLoadingStyleListener);
        //     this.onDidFinishLoadingStyleListener = null;
        // }

        if (this.onIndicatorPositionChangedListener) {
            const locationPlugin = this._getPlugin<com.mapbox.maps.plugin.locationcomponent.LocationComponentPlugin>('MAPBOX_LOCATION_COMPONENT_PLUGIN_ID');
            locationPlugin.removeOnIndicatorPositionChangedListener(this.onIndicatorPositionChangedListener);
            this.onIndicatorPositionChangedListener = null;
        }

        if (this.onAnnotationClickListener && this.lineManager) {
            this.lineManager.removeClickListener(this.onAnnotationClickListener);
            this.onAnnotationClickListener = null;
        }
        // if (this.onMarkerClickListener) {
        //     this._mapboxMapInstance.setOnMarkerClickListener(null);
        //     this.onMarkerClickListener = null;
        // }
        // if (this.onInfoWindowClickListener) {
        //     this._mapboxMapInstance.setOnInfoWindowClickListener(null);
        //     this.onInfoWindowClickListener = null;
        // }

        // if (this.onDidFailLoadingMapListener) {
        //     this._mapboxViewInstance.removeOnDidFailLoadingMapListener(this.onDidFailLoadingMapListener);
        //     this.onDidFailLoadingMapListener = null;
        // }

        if (this.onMapClickListener) {
            com.mapbox.maps.plugin.gestures.GesturesUtils.removeOnMapClickListener(this._mapboxMapInstance, this.onMapClickListener);
            this.onMapClickListener = null;
        }

        if (this.onMapLongClickListener) {
            com.mapbox.maps.plugin.gestures.GesturesUtils.removeOnMapLongClickListener(this._mapboxMapInstance, this.onMapLongClickListener);
            this.onMapLongClickListener = null;
        }

        if (this.onMoveBeginListener) {
            com.mapbox.maps.plugin.gestures.GesturesUtils.removeOnMoveListener(this._mapboxMapInstance, this.onMoveBeginListener);
            this.onMoveBeginListener = null;
        }
        if (this.onMoveEndListener) {
            com.mapbox.maps.plugin.gestures.GesturesUtils.removeOnMoveListener(this._mapboxMapInstance, this.onMoveEndListener);
            this.onMoveEndListener = null;
        }
        if (this.onScrollListener) {
            com.mapbox.maps.plugin.gestures.GesturesUtils.removeOnMoveListener(this._mapboxMapInstance, this.onScrollListener);
            this.onScrollListener = null;
        }

        if (this.onFlingListener) {
            com.mapbox.maps.plugin.gestures.GesturesUtils.removeOnFlingListener(this._mapboxMapInstance, this.onFlingListener);
            this.onFlingListener = null;
        }

        // const cameraPlugin = this._getPlugin<com.mapbox.maps.plugin.animation.CameraAnimationsPlugin>("MAPBOX_CAMERA_PLUGIN_ID");
        if (this.onCameraMoveListener) {
            this.onCameraMoveListener.cancel();
            this.onCameraMoveListener = null;
        }

        // if (this.onCameraMoveCancelListener) {
        //     cameraPlugin.removeOnCameraMoveCancelListener(this.onCameraMoveCancelListener);
        //     this.onCameraMoveCancelListener = null;
        // }

        if (this.onMapIdleListener) {
            this.onMapIdleListener.cancel();
            this.onMapIdleListener = null;
        }

        // if (this.onLocationClickListener) {
        //     this._locationComponent.removeOnLocationClickListener(this.onLocationClickListener);
        //     this.onLocationClickListener = null;
        // }
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

    // async onResume(nativeMapViewInstance?: any) {
    //     if (Trace.isEnabled()) {
    //         CLog(CLogTypes.info, 'onResume()');
    //     }
    //     this._mapboxViewInstance.onResume();
    // }

    // async onPause(nativeMapViewInstance?: any) {
    //     if (Trace.isEnabled()) {
    //         CLog(CLogTypes.info, 'onPause()');
    //     }

    //     this._mapboxViewInstance.onPause();
    // }

    async onStop(nativeMap?: any) {
        if (Trace.isEnabled()) {
            CLog(CLogTypes.info, 'onStop()');
        }
        this._mapboxViewInstance.onStop();
    }

    // async onLowMemory(nativeMap?: any) {
    //     if (Trace.isEnabled()) {
    //         CLog(CLogTypes.info, 'onLowMemory()');
    //     }
    //     this._mapboxViewInstance.onLowMemory();
    // }

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
    private handleLineClickEvent(clickOverlay: com.mapbox.maps.plugin.annotation.generated.PolylineAnnotation) {
        const lineEntryId = Object.keys(this._polylines).find((key) => this._polylines[key] === clickOverlay);

        if (!lineEntryId) {
            console.error('Mapbox:handleLineClick(): click on overlay without an underlying line layer');
            return false;
        }

        for (let x = 0; x < this.eventCallbacks['click'].length; x++) {
            const entry = this.eventCallbacks['click'][x];

            if (Trace.isEnabled()) {
                CLog(CLogTypes.info, "Mapbox:handleLineClickEvent(): checking entry id '" + entry.id + "' against lineEnty id '" + lineEntryId + "'");
            }

            if (entry.id === lineEntryId) {
                if (Trace.isEnabled()) {
                    CLog(CLogTypes.info, "Mapbox:handleLineClickEvent(): calling callback for '" + entry.id + "'");
                }

                return entry.callback({ id: lineEntryId, android: clickOverlay });
            }
        } // end of for loop over events.

        return false;
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
     * @param {any} nativeMapViewInstance - native map view (com.mapbox.maps.MapView)
     *
     * @see MapboxViewCommonBase:setMapStyle()
     *
     * @link https://docs.mapbox.com/android/api/map-sdk/7.1.2/com/mapbox/mapboxsdk/maps/Style.Builder.html
     * @link https://docs.mapbox.com/android/api/map-sdk/7.1.2/com/mapbox/mapboxsdk/maps/MapboxMap.html#setStyle-java.lang.String-com.mapbox.maps.Style.OnStyleLoaded-
     */

    setMapStyle(style: string | MapStyle, nativeMapViewInstance?: any): Promise<void> {
        return new Promise((resolve, reject) => {
            try {
                const mapStyle = this._getMapStyle(style);

                if (Trace.isEnabled()) {
                    CLog(CLogTypes.info, 'setMapStyle(): with style:', style);
                }

                this._mapboxMapInstance.loadStyle(
                    mapStyle,
                    new com.mapbox.maps.Style.OnStyleLoaded({
                        onStyleLoaded: (param0: com.mapbox.maps.Style) => {
                            if (Trace.isEnabled()) {
                                CLog(CLogTypes.info, 'Mapbox:setMapStyle(): style loaded');
                            }

                            resolve();
                        }
                    })
                );
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

    /**
     *
     * @deprecated
     * @link https://github.com/mapbox/mapbox-plugins-android/tree/master/plugin-annotation
     */
    async addMarkers(markers: MapboxMarker[], nativeMap?: any) {
        try {
            await this._addMarkers(markers, this._mapboxViewInstance);
        } catch (ex) {
            if (Trace.isEnabled()) {
                CLog(CLogTypes.error, 'Error in mapbox.addMarkers: ' + ex + ex.stack);
            }
            throw ex;
        }
    }

    /**
     *
     * @deprecated
     * @link https://github.com/mapbox/mapbox-plugins-android/tree/master/plugin-annotation
     */
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

    iconCache: { [k: string]: ImageSource } = {};

    async _addMarkers(markers: MapboxMarker[], nativeMap?) {
        if (!markers) {
            if (Trace.isEnabled()) {
                CLog(CLogTypes.error, 'No markers passed');
            }
            return;
        }

        if (!Array.isArray(markers)) {
            if (Trace.isEnabled()) {
                CLog(CLogTypes.error, "markers must be passed as an Array: [{title:'foo'}]");
            }
            return;
        }

        if (!this._mapboxMapInstance) {
            return;
        }
        // if any markers need to be downloaded from the web they need to be available synchronously, so fetch them first before looping
        if (Trace.isEnabled()) {
            CLog(CLogTypes.log, 'adding markers');
        }
        const updatedMarkers = await this._downloadMarkerImages(markers);
        if (Trace.isEnabled()) {
            CLog(CLogTypes.log, 'adding updatedMarkers: ' + JSON.stringify(updatedMarkers));
        }
        for (let index = 0; index < updatedMarkers.length; index++) {
            const marker = updatedMarkers[index];
            // const markerOptions = new com.mapbox.maps.annotations.MarkerOptions();
            // markerOptions.setTitle(marker.title);
            // markerOptions.setSnippet(marker.subtitle);
            // markerOptions.setPosition(new com.mapbox.maps.geometry.LatLng(marker.lat, marker.lng));
            let icon: ImageSource;
            marker.icon = marker.icon || 'res://ic_red_marker';
            if (marker.icon) {
                // for markers from url see UrlMarker in https://github.com/mapbox/mapbox-gl-native/issues/5370
                if (marker.icon.startsWith(Utils.RESOURCE_PREFIX)) {
                    let cached = this.iconCache[marker.icon];
                    if (!cached) {
                        const bitmap = bitmapFromDrawableResource(marker.icon.substring(Utils.RESOURCE_PREFIX.length));

                        if (bitmap) {
                            cached = this.iconCache[marker.icon] = new ImageSource(bitmap);
                        }
                    }
                    if (cached) {
                        icon = cached;
                    } else {
                        console.warn(`No icon found for this device density for icon ' ${marker.icon}'. Falling back to the default icon.`);
                    }
                } else if (marker.icon.startsWith('http')) {
                    if (marker.downloadedIcon !== null) {
                        icon = marker.downloadedIcon;

                        // markerOptions.setIcon(iconFactory.fromBitmap(marker.iconDownloaded));
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
                        cached = this.iconCache[marker.iconPath] = ImageSource.fromFileSync(iconFullPath);
                    }
                }
                if (cached) {
                    icon = cached;
                } else {
                    console.warn(`Marker icon not found, using the default instead. Requested path: '" + ${marker.iconPath}'.`);
                }
            }
            marker.android = this.markerManager.addMarker(
                new AndroidMarker({
                    position: com.mapbox.geojson.Point.fromLngLat(marker.lng, marker.lat),
                    title: marker.title,
                    id: marker.id,
                    snippet: marker.subtitle,
                    icon: icon?.android
                })
            );
            this._markers.push(marker);

            if (marker.selected) {
                this.markerManager.selectMarker(marker.android as AndroidMarker);
            }

            marker.update = (newSettings: MapboxMarker) => {
                const theMarker = this._markers.find((m) => m.id === marker.id);
                if (theMarker) {
                    if (newSettings.onTap) {
                        theMarker.onTap = newSettings.onTap;
                    }
                    if (newSettings.onCalloutTap) {
                        theMarker.onCalloutTap = newSettings.onCalloutTap;
                    }
                    if (newSettings.title) {
                        theMarker.title = newSettings.title;
                        theMarker.android.title = newSettings.title;
                    }
                    if (newSettings.subtitle) {
                        theMarker.subtitle = newSettings.subtitle;
                        theMarker.android.snippet = newSettings.subtitle;
                    }
                    if (newSettings.lat && newSettings.lng) {
                        theMarker.lat = newSettings.lat;
                        theMarker.lng = newSettings.lng;
                        theMarker.android.position = com.mapbox.geojson.Point.fromLngLat(theMarker.lng, theMarker.lat);
                    }
                    this.markerManager.updateMarker(theMarker.android);
                    if (newSettings.selected) {
                        this.markerManager.selectMarker(theMarker.android, false, true);
                    }
                }
            };
        }
    }

    /**
     *
     * @deprecated
     */

    _removeMarkers(ids?, nativeMap?) {
        if (!this._mapboxMapInstance) {
            return;
        }
        if (Trace.isEnabled()) {
            CLog(CLogTypes.info, '_removeMarkers: ', ids);
        }
        this._markers.forEach((marker) => {
            if (!ids || (marker && marker.id && ids.indexOf(marker.id) > -1)) {
                if (marker && marker.android) {
                    this.markerManager.removeMarker(marker.android);
                }
            }
        });
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
                const cameraPosition = new com.mapbox.maps.CameraOptions.Builder().center(com.mapbox.geojson.Point.fromLngLat(options.lng, options.lat)).build();

                if (options.animated === true) {
                    const animationOptions = new com.mapbox.maps.plugin.animation.MapAnimationOptions.Builder().duration(1000).build();
                    com.nativescript.mapbox.Camera.flyTo(this._mapboxViewInstance, cameraPosition, animationOptions, null);
                } else {
                    this._mapboxMapInstance.setCamera(cameraPosition);
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
                const coordinate = this._mapboxMapInstance.getCameraState().getCenter();

                resolve({
                    lat: coordinate.latitude(),
                    lng: coordinate.longitude()
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
                    const cameraPosition = new com.mapbox.maps.CameraOptions.Builder().zoom(java.lang.Double.valueOf(level)).build();

                    if (animated) {
                        const animationOptions = new com.mapbox.maps.plugin.animation.MapAnimationOptions.Builder().build();
                        com.nativescript.mapbox.Camera.flyTo(this._mapboxViewInstance, cameraPosition, animationOptions, null);
                    } else {
                        this._mapboxMapInstance.setCamera(cameraPosition);
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
                const level = this._mapboxMapInstance.getCameraState().getZoom();
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

                const cameraPosition = new com.mapbox.maps.CameraOptions.Builder().pitch(java.lang.Double.valueOf(tilt)).build();
                const animated = options.animated === undefined || options.animated;

                if (animated) {
                    const animationOptions = new com.mapbox.maps.plugin.animation.MapAnimationOptions.Builder().duration(options.duration ? options.duration : 5000).build();

                    com.nativescript.mapbox.Camera.flyTo(
                        this._mapboxViewInstance,
                        cameraPosition,
                        animationOptions,
                        new android.animation.Animator.AnimatorListener({
                            onAnimationCancel: () => resolve(),
                            onAnimationEnd: () => resolve(),
                            onAnimationStart: () => {},
                            onAnimationRepeat: () => {}
                        })
                    );
                } else {
                    this._mapboxMapInstance.setCamera(cameraPosition);
                    resolve();
                }
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
                const tilt = this._mapboxMapInstance.getCameraState().getPitch();
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
                // const locationPlugin = this._getPlugin<com.mapbox.maps.plugin.locationcomponent.LocationComponentPlugin>("MAPBOX_LOCATION_COMPONENT_PLUGIN_ID");
                //     const loc = this._locationComponent ? this._locationComponent.getLastKnownLocation() : null;

                if (this.lastKnownLocation === null) {
                    reject('Location not available');
                } else {
                    resolve({
                        location: {
                            lat: this.lastKnownLocation.latitude(),
                            lng: this.lastKnownLocation.longitude()
                        }
                    } as UserLocation);
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
                if (!this._mapboxMapInstance) {
                    reject('No map has been loaded');
                    return;
                }
                if (!options) {
                    options = {};
                }
                if (Trace.isEnabled()) {
                    CLog(CLogTypes.info, 'Mapbox:queryRenderedFeatures(): ', JSON.stringify(options));
                }
                const mapboxPoint = com.mapbox.geojson.Point.fromLngLat(options.point.lng, options.point.lat);
                const screenLocation = this._mapboxMapInstance.pixelForCoordinate(mapboxPoint);
                const queryFilter = options.filter ? ExpressionParser.parseJson(options.filter) : null;
                const queryOptions = new com.mapbox.maps.RenderedQueryOptions(java.util.Arrays.asList(options.layers), queryFilter);
                this._mapboxMapInstance.queryRenderedFeatures(
                    com.mapbox.maps.RenderedQueryGeometry.valueOf(screenLocation),
                    queryOptions,
                    new com.mapbox.maps.QueryRenderedFeaturesCallback({
                        run: (result) => {
                            if (result.isError()) {
                                reject(new Error(result.getError()));
                            } else {
                                const features = result.getValue();
                                const jsFeatures = [];
                                for (let i = 0; i < features.size(); i++) {
                                    const feature = features.get(i);
                                    jsFeatures.push(JSON.parse(feature.getQueriedFeature().getFeature().toJson()));
                                }
                                resolve(jsFeatures);
                            }
                        }
                    })
                );
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

                const source = this.getSource(sourceId);
                if (!source) {
                    throw new Error(`Source with id "${sourceId}" not found.`);
                }

                const queryFilter = options.filter ? ExpressionParser.parseJson(options.filter) : null;

                this._mapboxMapInstance.querySourceFeatures(
                    sourceId,
                    new com.mapbox.maps.SourceQueryOptions(
                        null, // source layer IDs
                        queryFilter
                    ),
                    new com.mapbox.maps.QuerySourceFeaturesCallback({
                        run(result: com.mapbox.bindgen.Expected<string, java.util.List<com.mapbox.maps.QueriedSourceFeature>>) {
                            if (result.isError()) {
                                reject(new Error(result.getError()));
                            } else {
                                const lineFeatures = result.getValue();
                                if (lineFeatures.size() === 0) {
                                    reject(new Error('no line string feature found'));
                                } else {
                                    const features = result.getValue();
                                    const jsFeatures = [];
                                    for (let i = 0; i < features.size(); i++) {
                                        const feature = features.get(i);
                                        jsFeatures.push(JSON.parse(feature.getQueriedFeature().getFeature().toJson()));
                                    }
                                    resolve(jsFeatures);
                                }
                            }
                        }
                    })
                );
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
                if (!this.polygonManager) {
                    const annotationPlugin = this._getPlugin<com.mapbox.maps.plugin.annotation.AnnotationPlugin>('MAPBOX_ANNOTATION_PLUGIN_ID');
                    this.polygonManager = annotationPlugin.createAnnotationManager(
                        com.mapbox.maps.plugin.annotation.AnnotationType.PolygonAnnotation,
                        new com.mapbox.maps.plugin.annotation.AnnotationConfig()
                    ) as com.mapbox.maps.plugin.annotation.generated.PolygonAnnotationManager;
                }
                const polygonOptions = new com.mapbox.maps.plugin.annotation.generated.PolygonAnnotationOptions();
                const nPoints = java.util.Arrays.asList([java.util.Arrays.asList(points.map((p) => com.mapbox.geojson.Point.fromLngLat(p.lng, p.lat)))]);
                polygonOptions.withPoints(nPoints);

                polygonOptions.withFillColor(Mapbox.getAndroidColor(options.fillColor));
                polygonOptions.withFillOpacity(options.fillOpacity === undefined ? 1 : options.fillOpacity);

                // Note that the stroke is barely visible, see https://github.com/mapbox/mapbox-gl-native/issues/5676
                if (options.strokeColor) {
                    polygonOptions.withFillOutlineColor(Mapbox.getAndroidColor(options.strokeColor));
                }

                this._polygons[options.id || new Date().getTime()] = this.polygonManager.create(polygonOptions);
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
                if (!this.lineManager) {
                    const annotationPlugin = this._getPlugin<com.mapbox.maps.plugin.annotation.AnnotationPlugin>('MAPBOX_ANNOTATION_PLUGIN_ID');
                    this.lineManager = annotationPlugin.createAnnotationManager(
                        com.mapbox.maps.plugin.annotation.AnnotationType.PolylineAnnotation,
                        new com.mapbox.maps.plugin.annotation.AnnotationConfig()
                    ) as com.mapbox.maps.plugin.annotation.generated.PolylineAnnotationManager;
                }
                const polylineOptions = new com.mapbox.maps.plugin.annotation.generated.PolylineAnnotationOptions();
                polylineOptions.withLineWidth(options.width || 5); // default 5
                polylineOptions.withLineColor(Mapbox.getAndroidColor(options.color));
                polylineOptions.withLineOpacity(options.opacity === undefined ? 1 : options.opacity);
                polylineOptions.withPoints(java.util.Arrays.asList(points.map((p) => com.mapbox.geojson.Point.fromLngLat(p.lng, p.lat))));

                this._polylines[options.id || new Date().getTime()] = this.lineManager.create(polylineOptions);

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
                if (!ids) {
                    this.polygonManager.deleteAll();
                    this._polygons = {};
                }
                ids.forEach((id) => {
                    if (this._polygons[id]) {
                        this.polygonManager.delete(this._polygons[id]);
                        delete this._polygons[id];
                    }
                });

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
                if (!ids) {
                    this.lineManager.deleteAll();
                    this._polylines = {};
                }
                ids.forEach((id) => {
                    if (this._polylines[id]) {
                        this.lineManager.delete(this._polylines[id]);
                        delete this._polylines[id];
                    }
                });
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
                    const defaultPadding = 0;

                    // ensure padding is an object and assign default values
                    const {
                        bottom = defaultPadding,
                        left = defaultPadding,
                        right = defaultPadding,
                        top = defaultPadding
                    } = typeof padding === 'object' ? padding : { top: padding, left: padding, bottom: padding, right: padding };

                    const cameraForBounds = this._mapboxMapInstance.cameraForCoordinates(
                        java.util.Arrays.asList([
                            com.mapbox.geojson.Point.fromLngLat(options.bounds.west, options.bounds.north),
                            com.mapbox.geojson.Point.fromLngLat(options.bounds.east, options.bounds.south)
                        ]),
                        new com.mapbox.maps.EdgeInsets(top, left, bottom, right),
                        java.lang.Double.valueOf(options.bearing ?? 0), // bearing
                        java.lang.Double.valueOf(options.tilt ?? 0) // pitch
                    );
                    const cameraOptionsBuilder = new com.mapbox.maps.CameraOptions.Builder();
                    cameraOptionsBuilder.center(cameraForBounds.getCenter());
                    cameraOptionsBuilder.zoom(cameraForBounds.getZoom());
                    cameraOptionsBuilder.bearing(cameraForBounds.getBearing());
                    cameraOptionsBuilder.pitch(cameraForBounds.getPitch());

                    com.nativescript.mapbox.Camera.flyTo(
                        this._mapboxViewInstance,
                        cameraOptionsBuilder.build(),
                        new com.mapbox.maps.plugin.animation.MapAnimationOptions.Builder().duration(durationMs).build(),
                        null
                    );
                } else {
                    const target = options.target;
                    if (target === undefined) {
                        reject("Please set the 'target' parameter");
                        return;
                    }

                    const cameraOptionsBuilder = new com.mapbox.maps.CameraOptions.Builder();
                    cameraOptionsBuilder.center(com.mapbox.geojson.Point.fromLngLat(target.lng, target.lat));

                    if (options.bearing) {
                        cameraOptionsBuilder.bearing(java.lang.Double.valueOf(options.bearing));
                    }

                    if (options.tilt) {
                        cameraOptionsBuilder.pitch(java.lang.Double.valueOf(options.tilt));
                    }

                    if (options.zoomLevel) {
                        cameraOptionsBuilder.zoom(java.lang.Double.valueOf(options.zoomLevel));
                    }

                    com.nativescript.mapbox.Camera.flyTo(
                        this._mapboxViewInstance,
                        cameraOptionsBuilder.build(),
                        new com.mapbox.maps.plugin.animation.MapAnimationOptions.Builder().duration(durationMs).build(),
                        null
                    );
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

    setOnMapClickListener(listener: (data: LatLng) => boolean, nativeMap?: any): Promise<void> {
        return new Promise((resolve, reject) => {
            try {
                if (!this._mapboxMapInstance) {
                    reject('No map has been loaded');
                    return;
                }

                this.onMapClickListener = new com.mapbox.maps.plugin.gestures.OnMapClickListener({
                    onMapClick: (point) => {
                        if (Trace.isEnabled()) {
                            CLog(CLogTypes.info, 'Mapbox:setOnMapClickListener(): click event at point:', point);
                        }
                        return (
                            listener({
                                lat: point.latitude(),
                                lng: point.longitude()
                            }) ?? true
                        );
                    }
                });
                com.mapbox.maps.plugin.gestures.GesturesUtils.addOnMapClickListener(this._mapboxMapInstance, this.onMapClickListener);

                resolve();
            } catch (ex) {
                if (Trace.isEnabled()) {
                    CLog(CLogTypes.info, 'Error in mapbox.setOnMapLongClickListener: ' + ex);
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

                this.onMapLongClickListener = new com.mapbox.maps.plugin.gestures.OnMapLongClickListener({
                    onMapLongClick: (point) =>
                        listener({
                            lat: point.latitude(),
                            lng: point.longitude()
                        })
                });

                com.mapbox.maps.plugin.gestures.GesturesUtils.addOnMapLongClickListener(this._mapboxMapInstance, this.onMapLongClickListener);

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

                this.onMoveBeginListener = new com.mapbox.maps.plugin.gestures.OnMoveListener({
                    onMoveBegin: (detector: com.mapbox.android.gestures.MoveGestureDetector) => {
                        const coordinate = this._mapboxMapInstance.getCameraState().getCenter();
                        return listener({
                            lat: coordinate.latitude(),
                            lng: coordinate.longitude()
                        });
                    },
                    onMove: (detector: com.mapbox.android.gestures.MoveGestureDetector) => false,
                    onMoveEnd: (detector: com.mapbox.android.gestures.MoveGestureDetector) => {}
                });

                com.mapbox.maps.plugin.gestures.GesturesUtils.addOnMoveListener(this._mapboxMapInstance, this.onMoveBeginListener);

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

                this.onMoveEndListener = new com.mapbox.maps.plugin.gestures.OnMoveListener({
                    onMoveBegin: (detector: any /* MoveGestureDetector */) => {},
                    onMove: (detector: com.mapbox.android.gestures.MoveGestureDetector) => false,
                    onMoveEnd: (detector: any /* MoveGestureDetector */) => {
                        const coordinate = this._mapboxMapInstance.getCameraState().getCenter();
                        return listener({
                            lat: coordinate.latitude(),
                            lng: coordinate.longitude()
                        });
                    }
                });

                com.mapbox.maps.plugin.gestures.GesturesUtils.addOnMoveListener(this._mapboxMapInstance, this.onMoveEndListener);

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

                this.onScrollListener = new com.mapbox.maps.plugin.gestures.OnMoveListener({
                    onMoveBegin: (detector: any /* MoveGestureDetector */) => {},
                    onMove: (detector: any /* MoveGestureDetector */) => {
                        const coordinate = this._mapboxMapInstance.getCameraState().getCenter();
                        listener({
                            lat: coordinate.latitude(),
                            lng: coordinate.longitude()
                        });
                        return false;
                    },
                    onMoveEnd: (detector: any /* MoveGestureDetector */) => {}
                });

                com.mapbox.maps.plugin.gestures.GesturesUtils.addOnMoveListener(this._mapboxMapInstance, this.onScrollListener);

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

                this.onFlingListener = new com.mapbox.maps.plugin.gestures.OnFlingListener({
                    onFling: () => listener()
                });
                com.mapbox.maps.plugin.gestures.GesturesUtils.addOnFlingListener(this._mapboxMapInstance, this.onFlingListener);

                resolve();
            } catch (ex) {
                if (Trace.isEnabled()) {
                    CLog(CLogTypes.info, 'Error in mapbox.setOnFlingListener: ' + ex);
                }
                reject(ex);
            }
        });
    }

    setOnCameraChangeListener(listener: (reason, animated?) => void, nativeMap?): Promise<void> {
        return new Promise((resolve, reject) => {
            try {
                if (!this._mapboxMapInstance) {
                    reject('No map has been loaded');
                    return;
                }

                this.onCameraMoveListener = this._mapboxMapInstance.subscribeCameraChanged(
                    new com.mapbox.maps.CameraChangedCallback({
                        run(param: com.mapbox.maps.CameraChanged) {
                            listener(0, false);
                        }
                    })
                );

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
            reject('No conCameraMoveCancel event');
        });
    }

    setOnMapIdleListener(listener: () => void, nativeMap?): Promise<void> {
        return new Promise((resolve, reject) => {
            try {
                if (!this._mapboxMapInstance) {
                    reject('No map has been loaded');
                    return;
                }

                this.onMapIdleListener = this._mapboxMapInstance.subscribeMapIdle(
                    new com.mapbox.maps.MapIdleCallback({
                        run: () => listener()
                    })
                );

                resolve();
            } catch (ex) {
                if (Trace.isEnabled()) {
                    CLog(CLogTypes.info, 'Error in mapbox.setOnCameraIdleListener: ' + ex);
                }
                reject(ex);
            }
        });
    }

    async getViewport(nativeMap?): Promise<Viewport> {
        // return new Promise((resolve, reject) => {
        try {
            if (!this._mapboxMapInstance) {
                throw new Error('No map has been loaded');
            }
            const cameraState = this._mapboxMapInstance.getCameraState();
            // Get the screen coordinate bounds
            // Get the map view size
            const width = this._mapboxViewInstance.getWidth();
            const height = this._mapboxViewInstance.getHeight();

            // Top-left (NW)
            const nw = this._mapboxMapInstance.coordinateForPixel(new com.mapbox.maps.ScreenCoordinate(0, 0));

            // Bottom-right (SE)
            const se = this._mapboxMapInstance.coordinateForPixel(new com.mapbox.maps.ScreenCoordinate(width, height));

            return {
                bounds: {
                    north: nw.latitude(),
                    east: se.longitude(),
                    south: se.latitude(),
                    west: nw.longitude()
                },
                zoomLevel: cameraState.getZoom()
            };
        } catch (ex) {
            if (Trace.isEnabled()) {
                CLog(CLogTypes.info, 'Error in mapbox.getViewport: ' + ex);
            }
            throw ex;
        }
        // });
    }

    setViewport(options: SetViewportOptions, nativeMap?): Promise<void> {
        return new Promise((resolve, reject) => {
            try {
                if (!this._mapboxMapInstance) {
                    reject('No map has been loaded');
                    return;
                }
                const defaultPadding = 25;
                const padding = options.padding ?? defaultPadding;
                const animated = options.animated === undefined || options.animated;
                const durationMs = animated ? 1000 : 0;

                // ensure padding is an object and assign default values
                const {
                    bottom = defaultPadding,
                    left = defaultPadding,
                    right = defaultPadding,
                    top = defaultPadding
                } = typeof padding === 'object' ? padding : { top: padding, left: padding, bottom: padding, right: padding };
                const cameraForBounds = this._mapboxMapInstance.cameraForCoordinates(
                    java.util.Arrays.asList([
                        com.mapbox.geojson.Point.fromLngLat(options.bounds.west, options.bounds.north),
                        com.mapbox.geojson.Point.fromLngLat(options.bounds.east, options.bounds.south)
                    ]),
                    new com.mapbox.maps.EdgeInsets(top, left, bottom, right),
                    java.lang.Double.valueOf(0), // bearing
                    java.lang.Double.valueOf(0) // pitch
                );
                const cameraOptionsBuilder = new com.mapbox.maps.CameraOptions.Builder();
                cameraOptionsBuilder.center(cameraForBounds.getCenter());
                cameraOptionsBuilder.zoom(cameraForBounds.getZoom());
                cameraOptionsBuilder.bearing(cameraForBounds.getBearing());
                cameraOptionsBuilder.pitch(cameraForBounds.getPitch());
                const cameraOptions = cameraOptionsBuilder.build();
                if (animated) {
                    com.nativescript.mapbox.Camera.flyTo(
                        this._mapboxViewInstance,
                        cameraOptions,
                        new com.mapbox.maps.plugin.animation.MapAnimationOptions.Builder().duration(durationMs).build(),
                        null
                    );
                } else {
                    this._mapboxMapInstance.setCamera(cameraOptions);
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
                if (!this._accessToken && !options.accessToken) {
                    reject("First show a map, or pass in an 'accessToken' param");
                    return;
                }
                if (!this._accessToken) {
                    this._accessToken = options.accessToken;
                    com.mapbox.common.MapboxOptions.setAccessToken(this._accessToken);
                }
                const styleURL = this._getMapStyle(options.style);
                const regionId = `${options.regionId || Date.now()}`;

                // Optional: download style pack (the style JSON, sprites, fonts)
                // const stylePackLoadOptions = new com.mapbox.maps.StylePackLoadOptions.Builder().metadata(Value.fromJson(`{"regionId": "${options.regionId || Date.now()}"}`)).build();
                const descriptorOptionsBuilder = new com.mapbox.maps.TilesetDescriptorOptions.Builder().styleURI(styleURL);
                if (options.minZoom !== undefined) {
                    descriptorOptionsBuilder.minZoom(options.minZoom);
                }
                if (options.maxZoom !== undefined) {
                    descriptorOptionsBuilder.maxZoom(options.maxZoom);
                }
                const descriptorOptions = descriptorOptionsBuilder.build();

                const tilesetDescriptor = this._getOfflineManager().createTilesetDescriptor(descriptorOptions);
                const Point = com.mapbox.geojson.Point;
                const bbox = com.mapbox.geojson.Polygon.fromLngLats(
                    java.util.Arrays.asList([
                        java.util.Arrays.asList([
                            Point.fromLngLat(options.bounds.west, options.bounds.south), // SW
                            Point.fromLngLat(options.bounds.east, options.bounds.south), // SE
                            Point.fromLngLat(options.bounds.east, options.bounds.north), // NE
                            Point.fromLngLat(options.bounds.west, options.bounds.north), // NW
                            Point.fromLngLat(options.bounds.west, options.bounds.south) // close ring
                        ])
                    ])
                );

                const info = {
                    name: options.name,
                    regionId,
                    styleUrl: styleURL,
                    minZoom: options.minZoom,
                    maxZoom: options.maxZoom,
                    bounds: options.bounds,
                    ...options.metadata
                };
                const regionOptions = new com.mapbox.common.TileRegionLoadOptions.Builder()
                    .geometry(bbox)
                    .descriptors(java.util.Collections.singletonList(tilesetDescriptor))
                    .metadata(new com.mapbox.bindgen.Value(JSON.stringify(info)))
                    .networkRestriction(options['networkRestriction'] ?? com.mapbox.common.NetworkRestriction.NONE)
                    .acceptExpired(options['acceptExpired'] ?? true)
                    .build();
                this._getTileStore().loadTileRegion(
                    regionId,
                    regionOptions,
                    new com.mapbox.common.TileRegionLoadProgressCallback({
                        run(progress: com.mapbox.common.TileRegionLoadProgress) {
                            const percentage = progress.getRequiredResourceCount() >= 0 ? (100.0 * progress.getCompletedResourceCount()) / progress.getRequiredResourceCount() : 0.0;

                            if (options.onProgress) {
                                options.onProgress({
                                    name: options.name,
                                    completedSize: progress.getCompletedResourceSize(),
                                    completed: progress.getCompletedResourceCount(),
                                    expected: progress.getRequiredResourceCount(),
                                    percentage: Math.round(percentage * 100) / 100,
                                    // downloading: status.getDownloadState() == com.mapbox.maps.offline.OfflineRegion.STATE_ACTIVE,
                                    complete: percentage === 1
                                });
                            }
                        }
                    }),
                    new com.mapbox.common.TileRegionCallback({
                        run(expected: com.mapbox.bindgen.Expected<com.mapbox.common.TileRegionError, com.mapbox.common.TileRegion>) {
                            if (expected.isValue()) {
                                // if (options.onProgress) {
                                //     options.onProgress({
                                //         name: options.name,
                                //         percentage: 100,
                                //         complete: true
                                //     });
                                // }
                                resolve(expected.getValue());
                            } else {
                                reject(expected.getError());
                            }
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
                    com.mapbox.common.MapboxOptions.setAccessToken(this._accessToken);
                }

                const tileStore = this._getTileStore();
                tileStore.getAllTileRegions(
                    new com.mapbox.common.TileRegionsCallback({
                        run: async (result: com.mapbox.bindgen.Expected<com.mapbox.common.TileRegionError, java.util.List<com.mapbox.common.TileRegion>>) => {
                            try {
                                if (result.isError()) {
                                    reject(result.isError());
                                } else {
                                    const offlineRegions = result.getValue();
                                    const regions = [];
                                    if (offlineRegions !== null) {
                                        for (let i = 0; i < offlineRegions.size(); i++) {
                                            const offlineRegion = offlineRegions.get(i);
                                            // const bounds = offlineRegionDefinition.getBounds();
                                            const { bounds, maxZoom, minZoom, name, regionId, styleUrl, ...metadata } = await this._getRegionMetadata(offlineRegion);

                                            regions.push({
                                                id: regionId,
                                                name,
                                                style: styleUrl,
                                                minZoom,
                                                maxZoom,
                                                bounds,
                                                metadata
                                                // pixelRatio: offlineRegionDefinition.getPixelRatio(),
                                                // type: offlineRegionDefinition.getType()
                                            });
                                        }
                                    }
                                    resolve(regions);
                                }
                            } catch (error) {
                                reject(error);
                            }
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
                const tileStore = this._getTileStore();
                tileStore.getAllTileRegions(
                    new com.mapbox.common.TileRegionsCallback({
                        run: async (result: com.mapbox.bindgen.Expected<com.mapbox.common.TileRegionError, java.util.List<com.mapbox.common.TileRegion>>) => {
                            try {
                                if (result.isError()) {
                                    reject(result.isError());
                                } else {
                                    const offlineRegions = result.getValue();
                                    let found = false;
                                    if (offlineRegions !== null) {
                                        for (let i = 0; i < offlineRegions.size(); i++) {
                                            const offlineRegion = offlineRegions.get(i);
                                            const regionId = options.id ? offlineRegion.getId() : await this._getRegionName(offlineRegion);
                                            if (regionId === (options.id || options.name)) {
                                                found = true;
                                                await new Promise<void>((resolve, reject) => {
                                                    tileStore.removeTileRegion(
                                                        offlineRegion.getId(),
                                                        new com.mapbox.common.TileRegionCallback({
                                                            run(result: com.mapbox.bindgen.Expected<com.mapbox.common.TileRegionError, com.mapbox.common.TileRegion>) {
                                                                if (result.isError()) {
                                                                    reject(result.getError());
                                                                } else {
                                                                    resolve();
                                                                }
                                                            }
                                                        })
                                                    );
                                                });

                                                // don't break the loop as there may be multiple packs with the same name
                                            }
                                        }
                                    }
                                    if (!found) {
                                        reject('Region not found');
                                    } else {
                                        resolve();
                                    }
                                }
                            } catch (error) {
                                reject(error);
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
            this._offlineManager = new com.mapbox.maps.OfflineManager();
        }

        return this._offlineManager;
    }

    _getTileStore() {
        if (!this._tileStore) {
            this._tileStore = com.mapbox.common.TileStore.create();
        }

        return this._tileStore;
    }

    addExtrusion(options: AddExtrusionOptions, nativeMap?): Promise<void> {
        return new Promise((resolve, reject) => {
            try {
                // Create fill extrusion layer
                const fillExtrusionLayer = new com.mapbox.maps.extension.style.layers.generated.FillExtrusionLayer('3d-buildings', 'composite');
                fillExtrusionLayer.sourceLayer('building');
                fillExtrusionLayer.minZoom(15);

                LayerFactory.applyLayerProperties(fillExtrusionLayer, {
                    'fill-extrusion-color': android.graphics.Color.LTGRAY,
                    'fill-extrusion-height': '["get", "height]',
                    'fill-extrusion-base': '["get", "min_height]',
                    'fill-extrusion-opacity': 0.6,
                    filter: '["==", ["get", "extrude"], true]'
                });

                // TODO: missing extension typings
                //@ts-ignore
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
                const theMap: com.mapbox.maps.MapboxMap = nativeMap || this._mapboxMapInstance;
                if (!theMap) {
                    reject('No map has been loaded');
                    return;
                }

                const source = this.getSource(id, theMap);
                if (!source) {
                    reject('Source does not exists: ' + id);
                    return;
                }
                switch (options.type) {
                    case 'geojson':
                        const geoJsonString = JSON.stringify(options.data);
                        (source as com.mapbox.maps.extension.style.sources.generated.GeoJsonSource).data(geoJsonString);
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

    addSource(id: string, options: AddSourceOptions, nativeMap?: com.mapbox.maps.MapboxMap): Promise<void> {
        return new Promise((resolve, reject) => {
            try {
                const theMap = nativeMap || this._mapboxMapInstance;
                let source;

                if (!theMap) {
                    reject('No map has been loaded');
                    return;
                }

                if (this.getSource(id, theMap)) {
                    reject('Source exists: ' + id);
                    return;
                }
                switch (options.type) {
                    case 'vector': {
                        const builder = new com.mapbox.maps.extension.style.sources.generated.VectorSource.Builder(id);

                        if (options.url) {
                            builder.url(options.url);
                        } else {
                            builder.tiles(java.util.Arrays.asList(options.tiles));
                        }
                        if (options.minzoom) {
                            builder.minzoom(options.minzoom);
                        }

                        if (options.maxzoom) {
                            builder.maxzoom(options.maxzoom);
                        }

                        if (options.scheme) {
                            switch (options.scheme) {
                                case 'tms':
                                    builder.scheme(com.mapbox.maps.extension.style.sources.generated.Scheme.TMS);
                                    break;
                                default:
                                    builder.scheme(com.mapbox.maps.extension.style.sources.generated.Scheme.XYZ);
                                    break;
                            }
                        }

                        if (options.bounds) {
                            builder.bounds(java.util.Arrays.asList(options.bounds.map((val) => java.lang.Float.valueOf(val))));
                        }

                        source = builder.build();

                        break;
                    }

                    case 'geojson': {
                        if (Trace.isEnabled()) {
                            CLog(CLogTypes.info, 'Mapbox:addSource(): before addSource with geojson');
                            CLog(CLogTypes.info, 'Mapbox:addSource(): before adding geoJSON to GeoJsonSource');
                        }

                        let builder = new com.mapbox.maps.extension.style.sources.generated.GeoJsonSource.Builder(id);
                        // if (options.minzoom) {
                        //     builder.minzoom(options.minzoom);
                        // }

                        if (options.maxzoom) {
                            builder.maxzoom(options.maxzoom);
                        }

                        if (options.lineMetrics !== undefined) {
                            builder.lineMetrics(options.lineMetrics);
                        }

                        if (options.cluster) {
                            builder = builder
                                .cluster(true)
                                .clusterMaxZoom(options.cluster.maxZoom || 13)
                                .clusterRadius(options.cluster.radius || 40);

                            if (options.cluster.properties) {
                                for (const property of Object.keys(options.cluster.properties)) {
                                    const propertyValues = options.cluster.properties[property];
                                    let operator = propertyValues[0];
                                    if (!Array.isArray(operator)) {
                                        operator = [operator];
                                    }
                                    builder.clusterProperty(property, ExpressionParser.parseJson(operator), ExpressionParser.parseJson(propertyValues[1]));
                                }
                            }
                        }

                        if (options.data) {
                            const geoJsonString = JSON.stringify(options.data);
                            builder.data(geoJsonString);
                        }
                        const geoJsonSource = builder.build();
                        source = geoJsonSource;
                        break;
                    }

                    case 'raster':
                        const builder = new com.mapbox.maps.extension.style.sources.generated.RasterSource.Builder(id);
                        builder.tiles(java.util.Arrays.asList(options.tiles));
                        if (options.minzoom) {
                            builder.minzoom(options.minzoom);
                        }

                        if (options.maxzoom) {
                            builder.maxzoom(options.maxzoom);
                        }

                        if (options.scheme) {
                            switch (options.scheme) {
                                case 'tms':
                                    builder.scheme(com.mapbox.maps.extension.style.sources.generated.Scheme.TMS);
                                    break;
                                default:
                                    builder.scheme(com.mapbox.maps.extension.style.sources.generated.Scheme.XYZ);
                                    break;
                            }
                        }

                        if (options.bounds) {
                            builder.bounds(java.util.Arrays.asList(options.bounds.map((val) => java.lang.Float.valueOf(val))));
                        }
                        builder.tileSize(options.tileSize || 256);

                        source = builder.build();
                        break;
                    default:
                        reject('Invalid source type: ' + (options as any)['type']);
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

                // TODO: missing extension typings
                //@ts-ignore
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
     * @param {any} nativeMapView - native map view (com.mapbox.maps.MapView)
     *
     * @link https://docs.mapbox.com/mapbox-gl-js/style-spec/#layers
     */

    public async addLayer(style, belowLayerId?: string, nativeMap?: com.mapbox.maps.MapboxMap): Promise<void> {
        const theMap = nativeMap || this._mapboxMapInstance;
        if (!theMap) {
            return Promise.reject('No map has been loaded');
        }
        let source: com.mapbox.maps.extension.style.sources.Source = null;
        if (typeof style.source !== 'string') {
            await this.addSource(style.id + '_source', style.source);
            source = this.getSource(style.id + '_source', theMap);
        } else {
            source = this.getSource(style.source, theMap);
        }

        const layer = await LayerFactory.createLayer(style, source);
        if (belowLayerId) {
            // TODO: missing extension typings
            //@ts-ignore
            this._mapboxMapInstance.getStyle().addLayerBelow(layer.getNativeInstance(), belowLayerId);
        } else {
            // TODO: missing extension typings
            //@ts-ignore
            this._mapboxMapInstance.getStyle().addLayer(layer.getNativeInstance());
        }
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

    private getSource<T = com.mapbox.maps.extension.style.sources.Source>(sId: string, mapboxInstance: com.mapbox.maps.MapboxMap = this._mapboxMapInstance) {
        // TODO: missing extension typings
        //@ts-ignore
        return mapboxInstance.getStyle().getSource(sId) as T;
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
        return new Promise((resolve, reject) => {
            try {
                const sId = !!sourceId ? sourceId : id + '_source';

                const lineSource = this.getSource<com.mapbox.maps.extension.style.sources.generated.GeoJsonSource>(sId);

                if (!lineSource) {
                    throw new Error(`no source found with id: ${sId}`);
                }

                this._mapboxMapInstance.querySourceFeatures(
                    sId,
                    new com.mapbox.maps.SourceQueryOptions(
                        null, // source layer IDs
                        ExpressionParser.parseJson(['==', '$type', 'LineString'])
                    ),
                    new com.mapbox.maps.QuerySourceFeaturesCallback({
                        run(result: com.mapbox.bindgen.Expected<string, java.util.List<com.mapbox.maps.QueriedSourceFeature>>) {
                            if (result.isError()) {
                                reject(new Error(result.getError()));
                            } else {
                                const lineFeatures = result.getValue();
                                if (lineFeatures.size() === 0) {
                                    reject(new Error('no line string feature found'));
                                } else {
                                    const feature = lineFeatures.get(0).getQueriedFeature().getFeature();

                                    const newPoints = new java.util.ArrayList<com.mapbox.geojson.Point>((feature.geometry() as com.mapbox.geojson.LineString).coordinates());
                                    newPoints.add(com.mapbox.geojson.Point.fromLngLat(lnglat[0], lnglat[1]));

                                    const newFeature = com.mapbox.geojson.LineString.fromLngLats(newPoints);
                                    lineSource.geometry(newFeature);
                                }
                            }
                        }
                    })
                );
            } catch (error) {
                reject(error);
            }
        });
    }

    addGeoJsonClustered(options: AddGeoJsonClusteredOptions, nativeMap?): Promise<void> {
        return new Promise((resolve, reject) => {
            try {
                const geoJsonSource = new com.mapbox.maps.extension.style.sources.generated.GeoJsonSource.Builder(options.name)
                    .data(options.data)
                    .cluster(true) // enable clustering
                    .clusterMaxZoom(options.clusterMaxZoom || 13) // maximum zoom to cluster points
                    .clusterRadius(options.clusterRadius || 40) // radius of each cluster in pixels
                    .build();

                // TODO: missing extension typings
                //@ts-ignore
                this._mapboxMapInstance.getStyle().addSource(geoJsonSource);

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

                const unclustered = new com.mapbox.maps.extension.style.layers.generated.SymbolLayer('unclustered-points', options.name);
                LayerFactory.applyLayerProperties(unclustered, {
                    'circle-color': 'red',
                    'circle-radius': 16,
                    'circle-blur': 0.2,
                    filter: `["!=", ["get", "cluster"], true]`
                });
                // unclustered.setFilter(com.mapbox.maps.style.expressions.Expression.neq(com.mapbox.maps.style.expressions.Expression.get('cluster'), true));

                // TODO: missing extension typings
                //@ts-ignore
                this._mapboxMapInstance.getStyle().addLayer(unclustered); // , "building");

                for (let i = 0; i < layers.length; i++) {
                    // Add some nice circles
                    const circles = new com.mapbox.maps.extension.style.layers.generated.CircleLayer('cluster-' + i, options.name);
                    const properties = {
                        'circle-color': layers[i][1],
                        'circle-radius': 22,
                        'circle-blur': 0.2
                    };
                    if (i === 0) {
                        properties['filter'] = `[">=", ["get", "point_count"], ${layers[i][0]}]`;
                        // circles.setFilter(com.mapbox.maps.style.expressions.Expression.gte(pointCount, com.mapbox.maps.style.expressions.Expression.literal(java.lang.Integer.valueOf(layers[i][0]))));
                    } else {
                        properties['filter'] = `["all", [">=", ["get", "point_count"], ${layers[i][0]}], ["<", ["get", "point_count"], ${layers[i - 1][0]}]]`;
                        // (
                        // com.mapbox.maps.style.expressions.Expression.all([
                        //     com.mapbox.maps.style.expressions.Expression.gte(pointCount, com.mapbox.maps.style.expressions.Expression.literal(java.lang.Integer.valueOf(layers[i][0]))),
                        //     com.mapbox.maps.style.expressions.Expression.lt(pointCount, com.mapbox.maps.style.expressions.Expression.literal(java.lang.Integer.valueOf(layers[i - 1][0])))
                        // ])
                        // );
                    }
                    LayerFactory.applyLayerProperties(circles, properties);

                    // const pointCount = com.mapbox.maps.style.expressions.Expression.toNumber(com.mapbox.maps.style.expressions.Expression.get('point_count'));

                    // TODO: missing extension typings
                    //@ts-ignore
                    this._mapboxMapInstance.getStyle().addLayer(circles); // , "building");
                }

                // Add the count labels (note that this doesn't show.. #sad)
                const count = new com.mapbox.maps.extension.style.layers.generated.SymbolLayer('count', options.name);
                LayerFactory.applyLayerProperties(count, {
                    'text-field': '["get", "point_count"]',
                    'text-size': 12,
                    'text-color': 'white'
                });
                // count.setProperties([
                //     com.mapbox.maps.extension.style.layers.generated.PropertyFactory.textField(com.mapbox.maps.style.expressions.Expression.get('point_count')),
                //     com.mapbox.maps.extension.style.layers.generated.PropertyFactory.textSize(new java.lang.Float(12.0)),
                //     com.mapbox.maps.extension.style.layers.generated.PropertyFactory.textColor(new Color('white').android)
                // ]);
                // TODO: missing extension typings
                //@ts-ignore
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

        return new Promise(async (resolve, reject) => {
            try {
                if (!this._mapboxMapInstance) {
                    reject('No map has been loaded');
                    return;
                }

                await this.requestFineLocationPermission();
                this.showUserLocationMarker(options, nativeMap);

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
        const temp = color instanceof Color ? color : new Color(color);
        if (Color.isValid(temp)) {
            return temp.android;
        } else {
            return android.graphics.Color.BLACK;
        }
    }

    _getMapStyle(input: any): any {
        if (Trace.isEnabled()) {
            CLog(CLogTypes.info, '_getMapStyle(): top with input:', input);
        }
        const Style = com.mapbox.maps.Style;

        // allow for a style URL to be passed

        if (input.startsWith('mapbox://styles') || input.startsWith('http://') || input.startsWith('https://')) {
            return input;
        } else if (input.startsWith('~/')) {
            return 'file://' + path.join(knownFolders.currentApp().path, input.replace('~/', ''));
        } else {
            let key = Object.keys(MapStyle)[Object.values(MapStyle).indexOf(input)];
            // on android STREETS is defined as MAPBOX_STREETS field
            if (key === 'STREETS') {
                key = 'MAPBOX_STREETS';
            }
            // fix because MAPBOX_STREETS and others are not exposed by the
            const field = Style.class.getDeclaredField(key) || Style.class.getDeclaredField('MAPBOX_STREETS');
            field.setAccessible(true);
            return field.get(null);
        }
    }

    /**
     * Mapbox Map Options
     *
     * @link https://github.com/mapbox/mapbox-gl-native/wiki/Android-6.x-to-7.x-migration-guide
     * @link https://github.com/mapbox/mapbox-gl-native/blob/master/platform/android/MapboxGLAndroidSDK/src/main/java/com/mapbox/mapboxsdk/maps/MapboxMapOptions.java
     * @link https://docs.mapbox.com/android/api/map-sdk/7.1.2/com/mapbox/mapboxsdk/maps/MapboxMapOptions.html
     */

    _getMapboxMapOptions(context: android.content.Context, settings: ShowOptions) {
        const mapOptions = new com.mapbox.maps.MapOptions.Builder().pixelRatio(context.getResources().getDisplayMetrics().density).build();
        // zoomlevel is not applied unless center is set
        if (settings.zoomLevel && !settings.center) {
            // Eiffel tower, Paris
            settings.center = {
                lat: 48.858093,
                lng: 2.294694
            };
        }
        let initialCameraOptions: com.mapbox.maps.CameraOptions;
        if (settings.center && settings.center.lat && settings.center.lng) {
            initialCameraOptions = new com.mapbox.maps.CameraOptions.Builder()
                .zoom(java.lang.Double.valueOf(settings.zoomLevel))
                .center(com.mapbox.geojson.Point.fromLngLat(settings.center.lng, settings.center.lat))
                .build();
        }

        com.mapbox.common.MapboxOptions.setAccessToken(this._accessToken);
        return new com.mapbox.maps.MapInitOptions(context, mapOptions, com.mapbox.maps.MapInitOptions.Companion.getDefaultPluginList(), initialCameraOptions, false);
    }

    private static mapPositionToGravity(position: ControlPosition) {
        switch (position) {
            case ControlPosition.TOP_LEFT:
                return android.view.Gravity.TOP | android.view.Gravity.START;
            case ControlPosition.TOP_RIGHT:
                return android.view.Gravity.TOP | android.view.Gravity.END;
            case ControlPosition.BOTTOM_LEFT:
                return android.view.Gravity.BOTTOM | android.view.Gravity.START;
            case ControlPosition.BOTTOM_RIGHT:
                return android.view.Gravity.BOTTOM | android.view.Gravity.END;
        }
    }

    /**
     * convert string to camera mode constant.
     *
     * @link https://docs.mapbox.com/android/api/map-sdk/8.1.0/com/mapbox/mapboxsdk/location/modes/CameraMode.html
     */
    // _stringToCameraMode(mode: UserLocationCameraMode): any {
    //     const modeRef = com.mapbox.maps.location.modes.CameraMode;

    //     switch (mode) {
    //         case 'NONE':
    //             return modeRef.NONE;

    //         case 'NONE_COMPASS':
    //             return modeRef.NONE_COMPASS;

    //         case 'NONE_GPS':
    //             return modeRef.NONE_GPS;

    //         case 'TRACKING':
    //             return modeRef.TRACKING;

    //         case 'TRACKING_COMPASS':
    //             return modeRef.TRACKING_COMPASS;

    //         case 'TRACKING_GPS':
    //             return modeRef.TRACKING_GPS;

    //         case 'TRACKING_GPS_NORTH':
    //             return modeRef.TRACKING_GPS_NORTH;
    //     }
    // }

    // /**
    //  * convert string to render mode
    //  */
    // _stringToRenderMode(mode): any {
    //     let renderMode: any;

    //     switch (mode) {
    //         case 'NORMAL':
    //             renderMode = com.mapbox.maps.location.modes.RenderMode.NORMAL;
    //             break;

    //         case 'COMPASS':
    //             renderMode = com.mapbox.maps.location.modes.RenderMode.COMPASS;
    //             break;

    //         case 'GPS':
    //             renderMode = com.mapbox.maps.location.modes.RenderMode.GPS;
    //             break;
    //     }

    //     return renderMode;
    // }

    // _convertCameraMode(mode: any): UserLocationCameraMode {
    //     const modeRef = com.mapbox.maps.plugin.locationcomponent.camera.CameraMode;

    //     switch (mode) {
    //         case modeRef.NONE:
    //             return 'NONE';

    //         case modeRef.NONE_COMPASS:
    //             return 'NONE_COMPASS';

    //         case modeRef.NONE_GPS:
    //             return 'NONE_GPS';

    //         case modeRef.TRACKING:
    //             return 'TRACKING';

    //         case modeRef.TRACKING_COMPASS:
    //             return 'TRACKING_COMPASS';

    //         case modeRef.TRACKING_GPS:
    //             return 'TRACKING_GPS';

    //         case modeRef.TRACKING_GPS_NORTH:
    //             return 'TRACKING_GPS_NORTH';
    //     }

    //     return 'NONE';
    // }

    _fineLocationPermissionGranted() {
        let hasPermission = android.os.Build.VERSION.SDK_INT < 23; // Android M. (6.0)

        if (!hasPermission) {
            hasPermission = com.mapbox.android.core.permissions.PermissionsManager.areLocationPermissionsGranted(Utils.android.getApplicationContext());
        }

        return hasPermission;
    }

    async _getRegionName(offlineRegion: com.mapbox.common.TileRegion) {
        return (await this._getRegionMetadata(offlineRegion))?.name;
    }

    _getRegionMetadata(offlineRegion: com.mapbox.common.TileRegion) {
        return new Promise<Record<string, any>>((resolve, reject) => {
            this._getTileStore().getTileRegionMetadata(
                offlineRegion.getId(),
                new com.mapbox.common.TileRegionMetadataCallback({
                    run(result: com.mapbox.bindgen.Expected<com.mapbox.common.TileRegionError, com.mapbox.bindgen.Value>) {
                        if (result.isError()) {
                            reject(result.getError());
                        } else {
                            try {
                                resolve(JSON.parse(result.getValue().toString() || '{}') || {});
                            } catch (error) {
                                resolve(JSON.parse(result.getValue().toJson() || '{}') || {});
                            }
                        }
                    }
                })
            );
        });
    }

    _plugins: { [k: string]: com.mapbox.maps.plugin.MapPlugin } = {};
    _getPlugin<T extends com.mapbox.maps.plugin.MapPlugin>(pluginId: string) {
        if (this._plugins[pluginId]) {
            return this._plugins[pluginId] as T;
        }
        const plugin = (this._plugins[pluginId] = this._mapboxViewInstance.getPlugin(pluginId) as T);
        return plugin;
    }
    _getGesturesPlugin() {
        return this._getPlugin<com.mapbox.maps.plugin.gestures.GesturesPlugin>('MAPBOX_GESTURES_PLUGIN_ID');
        // return this._mapboxMapInstance.getGestures() as com.mapbox.maps.plugin.gestures.GesturesPlugin;
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
    async showUserLocationMarker(
        options: Partial<
            TrackUserOptions & {
                accuracyColor?;
                accuracyRingColor?;
                pulsingColor?;
            }
        >,
        nativeMap?
    ) {
        try {
            if (Trace.isEnabled()) {
                CLog(CLogTypes.info, 'showUserLocationMarker()');
            }

            if (!this._mapboxMapInstance) {
                throw new Error('No map has been loaded');
            }

            if (!com.mapbox.android.core.permissions.PermissionsManager.areLocationPermissionsGranted(Utils.android.getApplicationContext())) {
                if (Trace.isEnabled()) {
                    CLog(CLogTypes.info, 'showUserLocationMarker(): location permissions are not granted.');
                }

                throw new Error('Location permissions not granted.');
            }

            const locationPlugin = this._getPlugin<com.mapbox.maps.plugin.locationcomponent.LocationComponentPlugin>('MAPBOX_LOCATION_COMPONENT_PLUGIN_ID');
            if (this.onIndicatorPositionChangedListener) {
                locationPlugin.removeOnIndicatorPositionChangedListener(this.onIndicatorPositionChangedListener);
            }
            this.onIndicatorPositionChangedListener = new com.mapbox.maps.plugin.locationcomponent.OnIndicatorPositionChangedListener({
                onIndicatorPositionChanged: (point) => {
                    this.lastKnownLocation = point;
                    if (!options.cameraMode || options.cameraMode?.indexOf('TRACKING') !== -1) {
                        this._mapboxMapInstance.setCamera(new com.mapbox.maps.CameraOptions.Builder().center(point).build());
                    }
                }
            });
            locationPlugin.addOnIndicatorPositionChangedListener(this.onIndicatorPositionChangedListener);
            locationPlugin.updateSettings(
                //@ts-ignore
                new kotlin.jvm.functions.Function1({
                    invoke: (settings: com.mapbox.maps.plugin.locationcomponent.generated.LocationComponentSettings.Builder) => {
                        settings.setEnabled(true);
                        settings.setPulsingEnabled(true);

                        settings.setLocationPuck(com.mapbox.maps.plugin.locationcomponent.LocationComponentUtils.createDefault2DPuck(true));

                        settings.setPuckBearingEnabled(options.renderMode !== 'NORMAL');
                        settings.setPuckBearing(options.cameraMode?.indexOf('COMPASS') !== -1 ? com.mapbox.maps.plugin.PuckBearing.HEADING : com.mapbox.maps.plugin.PuckBearing.COURSE);
                        if (options.accuracyColor !== undefined) {
                            settings.setAccuracyRingColor(Mapbox.getAndroidColor(options.accuracyColor));
                        }
                        if (options.accuracyRingColor !== undefined) {
                            settings.setAccuracyRingBorderColor(Mapbox.getAndroidColor(options.accuracyRingColor));
                        }
                        if (options.pulsingColor !== undefined) {
                            settings.setPulsingColor(Mapbox.getAndroidColor(options.pulsingColor));
                        }
                        return settings;
                    }
                })
            );
        } catch (ex) {
            if (Trace.isEnabled()) {
                CLog(CLogTypes.info, 'Error in mapbox.showUserLocationMarker: ' + ex);
            }
            throw ex;
        }
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

                const locationPlugin = this._getPlugin<com.mapbox.maps.plugin.locationcomponent.LocationComponentPlugin>('MAPBOX_LOCATION_COMPONENT_PLUGIN_ID');
                if (!locationPlugin) {
                    if (Trace.isEnabled()) {
                        CLog(CLogTypes.info, 'hideUserLocationMarker(): no location component is loaded.');
                    }

                    resolve();
                    return;
                }
                locationPlugin.setEnabled(false);
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
    changeUserLocationMarkerMode(renderMode, cameraMode: UserLocationCameraMode, nativeMap?): Promise<void> {
        return new Promise((resolve, reject) => {
            try {
                if (Trace.isEnabled()) {
                    CLog(CLogTypes.info, 'changeUserLocationMarkerMode()');
                }

                if (!this._mapboxMapInstance) {
                    throw new Error('No map has been loaded');
                }
                if (!this.onIndicatorPositionChangedListener) {
                    throw new Error('showUserLocationMarker must be used first');
                }

                const locationPlugin = this._getPlugin<com.mapbox.maps.plugin.locationcomponent.LocationComponentPlugin>('MAPBOX_LOCATION_COMPONENT_PLUGIN_ID');
                if (this.onIndicatorPositionChangedListener) {
                    locationPlugin.removeOnIndicatorPositionChangedListener(this.onIndicatorPositionChangedListener);
                }
                this.onIndicatorPositionChangedListener = new com.mapbox.maps.plugin.locationcomponent.OnIndicatorPositionChangedListener({
                    onIndicatorPositionChanged: (point) => {
                        this.lastKnownLocation = point;
                        if (!cameraMode || cameraMode?.indexOf('TRACKING')) {
                            this._mapboxMapInstance.setCamera(new com.mapbox.maps.CameraOptions.Builder().center(point).build());
                        }
                    }
                });
                locationPlugin.addOnIndicatorPositionChangedListener(this.onIndicatorPositionChangedListener);
                locationPlugin.updateSettings(
                    //@ts-ignore
                    new kotlin.jvm.functions.Function1({
                        invoke: (settings: com.mapbox.maps.plugin.locationcomponent.generated.LocationComponentSettings.Builder) => {
                            settings.setEnabled(true);
                            settings.setPulsingEnabled(true);
                            settings.setPuckBearingEnabled(renderMode !== 'NORMAL');
                            return settings;
                        }
                    })
                );
            } catch (ex) {
                if (Trace.isEnabled()) {
                    CLog(CLogTypes.info, 'Error in mapbox.changeUserLocationMarkerMode: ' + ex);
                }
                throw ex;
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
            //TODO: is it possible?
            reject('Not supported anymore');
            // try {
            //     if (Trace.isEnabled()) {
            //         CLog(CLogTypes.info, 'forceUserLocation(): top');
            //     }

            //     if (!this._locationComponent) {
            //         reject('No location component has been loaded');
            //         return;
            //     }

            //     // the location object needs to be converted into an android location

            //     const nativeLocation = new android.location.Location('background');

            //     nativeLocation.setLatitude(location.latitude);
            //     nativeLocation.setLongitude(location.longitude);
            //     nativeLocation.setAltitude(location.altitude);

            //     this._locationComponent.forceLocationUpdate(nativeLocation);

            //     resolve();
            // } catch (ex) {
            //     if (Trace.isEnabled()) {
            //         CLog(CLogTypes.info, 'Error in mapbox.forceUserLocationUpdate: ' + ex);
            //     }
            //     reject(ex);
            // }
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

                const styleLoadedCallback = new com.mapbox.maps.Style.OnStyleLoaded({
                    onStyleLoaded: (style) => {
                        //TODO: fix declaration which is missing extension for this
                        //@ts-ignore
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

                const styleLoadedCallback = new com.mapbox.maps.Style.OnStyleLoaded({
                    onStyleLoaded: (style) => {
                        const layers = style.getStyleLayers();
                        const result: Layer[] = [];

                        for (let i = 0; i < layers.size(); i++) {
                            const id = layers.get(i).getId();
                            //TODO: fix declaration which is missing extension for this
                            //@ts-ignore
                            result.push(new Layer(style.getLayer(id)));
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

    _getClickedMarkerDetails(clicked: AndroidMarker) {
        for (let index = 0; index < this._markers.length; index++) {
            const cached = this._markers[index];
            if (
                // eslint-disable-next-line eqeqeq
                cached.lat == clicked.position.latitude() &&
                // eslint-disable-next-line eqeqeq
                cached.lng == clicked.position.longitude() &&
                // eslint-disable-next-line eqeqeq
                cached.title == clicked.title && // == because of null vs undefined
                // eslint-disable-next-line eqeqeq
                cached.subtitle == clicked.snippet
            ) {
                return cached;
            }
        }
    }

    async _downloadImage(marker: MapboxMarker) {
        // to cache..
        if (this._markerIconDownloadCache[marker.icon]) {
            marker.downloadedIcon = this._markerIconDownloadCache[marker.icon];
            return marker;
        }
        // ..or not to cache
        try {
            const output = await Http.getImage(marker.icon);
            this._markerIconDownloadCache[marker.icon] = marker.downloadedIcon = output;
            return marker;
        } catch (error) {
            console.error(error);
        }
    }

    async _downloadMarkerImages(markers: MapboxMarker[]) {
        const result: MapboxMarker[] = [];
        for (let i = 0; i < markers.length; i++) {
            const marker = markers[i];
            if (marker.icon && marker.icon.startsWith('http')) {
                const mark = await this._downloadImage(marker);
                result.push(mark);
            } else {
                result.push(marker);
            }
        }
        return result;
    }
    project(data: LatLng) {
        const mapboxPoint = com.mapbox.geojson.Point.fromLngLat(data.lng, data.lat);
        const screenLocation = this._mapboxMapInstance.pixelForCoordinate(mapboxPoint);
        return { x: Utils.layout.toDeviceIndependentPixels(screenLocation.getX()), y: Utils.layout.toDeviceIndependentPixels(screenLocation.getY()) };
    }
    projectBack(screenCoordinate: { x: number; y: number }): LatLng {
        const pointf = new com.mapbox.maps.ScreenCoordinate(screenCoordinate.x, screenCoordinate.y);
        const coordinate = this._mapboxMapInstance.coordinateForPixel(pointf);
        return {
            lat: coordinate.latitude(),
            lng: coordinate.longitude()
        };
    }

    // getUserLocationCameraMode(nativeMap?: any): UserLocationCameraMode {
    //     if (!this._mapboxMapInstance) {
    //         return 'NONE';
    //     }

    //     if (!this._locationComponent) {
    //         return 'NONE';
    //     }

    //     return this._convertCameraMode(this._locationComponent.getCameraMode());
    // }
}
