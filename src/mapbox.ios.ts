import { Color, File, ImageSource, Trace, Utils, knownFolders, path } from '@nativescript/core';

import {
    AddExtrusionOptions,
    AddGeoJsonClusteredOptions,
    AddLayerOptions,
    AddPolygonOptions,
    AddPolylineOptions,
    AddSourceOptions,
    AnimateCameraOptions,
    CLog,
    CLogTypes,
    DeleteOfflineRegionOptions,
    DownloadOfflineRegionOptions,
    LatLng,
    ListOfflineRegionsOptions,
    MapStyle,
    MapboxApi,
    MapboxCommon,
    MapboxMarker,
    MapboxTraceCategory,
    MapboxViewBase,
    OfflineRegion,
    QueryRenderedFeaturesOptions,
    SetCenterOptions,
    SetTiltOptions,
    SetViewportOptions,
    SetZoomLevelOptions,
    ShowOptions,
    TrackUserOptions,
    UserLocation,
    UserLocationCameraMode,
    Viewport,
    telemetryProperty,
    LayerCommon,
} from './mapbox.common';

import { GeoUtils } from './geo.utils';
import { iOSNativeHelper } from '@nativescript/core/utils';
import { getImage } from '@nativescript/core/http';
import { FilterParser } from './filter/filter-parser.ios';

// Export the enums for devs not using TS

export { MapboxTraceCategory, MapStyle };

let _markers = [];
const _markerIconDownloadCache = [];

// let _mapView: MGLMapView;

const _setMapboxMapOptions = (mapView: MGLMapView, settings) => {
    mapView.logoView.hidden = settings.hideLogo;
    mapView.attributionButton.hidden = settings.hideAttribution;
    mapView.compassView.hidden = settings.hideCompass;
    mapView.rotateEnabled = !settings.disableRotation;
    mapView.scrollEnabled = !settings.disableScroll;
    mapView.zoomEnabled = !settings.disableZoom;
    mapView.allowsTilting = !settings.disableTilt;

    // mapView.showsScale = settings.showScale; // TODO, default false
    // mapView.showsHeading = true;
    // mapView.showsUserHeadingIndicator = true;

    if (settings.center && settings.center.lat && settings.center.lng) {
        const centerCoordinate = CLLocationCoordinate2DMake(settings.center.lat, settings.center.lng);
        mapView.setCenterCoordinateZoomLevelAnimated(centerCoordinate, settings.zoomLevel, false);
    } else {
        mapView.setZoomLevelAnimated(settings.zoomLevel, false);
    }

    mapView.showsUserLocation = settings.showUserLocation;

    mapView.autoresizingMask = UIViewAutoresizing.FlexibleWidth | UIViewAutoresizing.FlexibleHeight;
};

const _getMapStyle = (input: any): NSURL => {
    if (input.startsWith('mapbox://styles') || input.startsWith('http://') || input.startsWith('https://')) {
        return NSURL.URLWithString(input);
    } else if (input.startsWith('~/')) {
        return NSURL.URLWithString( 'file://' + path.join(knownFolders.currentApp().path, input.replace('~/', '')));
    } else if (input === MapStyle.LIGHT) {
        return MGLStyle.lightStyleURL;
    } else if (input === MapStyle.DARK) {
        return MGLStyle.darkStyleURL;
    } else if (input === MapStyle.OUTDOORS) {
        return MGLStyle.outdoorsStyleURL;
    } else if (input === MapStyle.SATELLITE) {
        return MGLStyle.satelliteStyleURL;
    } else if (input === MapStyle.SATELLITE_STREETS) {
        return MGLStyle.satelliteStreetsStyleURL;
    } else if (input === MapStyle.TRAFFIC_DAY) {
        return NSURL.URLWithString('mapbox://styles/mapbox/traffic-day-v2');
    } else if (input === MapStyle.TRAFFIC_NIGHT) {
        return NSURL.URLWithString('mapbox://styles/mapbox/traffic-night-v2');
    } else {
        return MGLStyle.streetsStyleURL;
    }
};

function _getTrackingMode(input: UserLocationCameraMode): MGLUserTrackingMode {
    /*
  if (input === "FOLLOW") {
    return MGLUserTrackingMode.Follow;
  } else if (input === "FOLLOW_WITH_HEADING") {
    return MGLUserTrackingMode.FollowWithHeading;
  } else if (input === "FOLLOW_WITH_COURSE") {
    return MGLUserTrackingMode.FollowWithCourse;
  } else {
    return MGLUserTrackingMode.None;
  }
*/
    return MGLUserTrackingMode.None;
}

function _getLocation (loc: MGLUserLocation) {
    if (loc === null) {
        return null;
    } else {
        return {
            location: {
                lat: loc.coordinate.latitude,
                lng: loc.coordinate.longitude,
            },
            speed: loc.location ? loc.location.speed : 0,
        } as UserLocation;
    }
}

// ------------------------------------------------------------------------

/**
 * Map View Class instantiated from XML
 *
 * This class is created by the NativeScript XML view parsing
 * code.
 */

export class MapboxView extends MapboxViewBase {
    private nativeMapView: MGLMapView = null;
    private delegate: MGLMapViewDelegate = null;

    private settings: any = null;

    private initialized: boolean = false;

    // see initMap. Count of how many times we've
    // tried to init the map.

    private initCountHack: number = 50;

    // ------------------------------------------------------

    /**
     * programmatically include settings
     */

    setConfig(settings: any) {
        if (Trace.isEnabled()) {
            CLog(CLogTypes.info, 'setConfig(): settings:', settings);
        }

        this.settings = settings;
    }

    // ------------------------------------------------------

    getNativeMapView(): any {
        return this.nativeMapView;
    }

    // ---------------------------------------------------------

    public createNativeView(): Object {
        if (Trace.isEnabled()) {
            CLog(CLogTypes.info, 'createNativeView(): top');
        }

        const v = super.createNativeView();
        return v;
    }

    // -------------------------------------------------------

    /**
     * init the native view.
     *
     * FIXME: It appears that the order of events is different between iOS and Android.
     * In the demo under Android, the main-page event handler is called first then the one
     * in the plugin. Under iOS it's the reverse.
     *
     * The symptom is that any properties that reference a binding aren't available
     * at the time this method is called. For example {{access_token}}.
     *
     * I'm sure there is something I do not understand about how this is supposed to work
     * and that the handstands below are not necessary.
     */

    public onLoaded() {
        super.onLoaded();
        if (Trace.isEnabled()) {
            CLog(CLogTypes.info, 'initNativeView(): on - loaded');
        }
        if (this.telemetry === false) {
            NSUserDefaults.standardUserDefaults.setBoolForKey(false, "MGLMapboxMetricsEnabled");
        }
        if (!this.initialized) {
            this.initMap();
            this.initialized = true;
        }
    }
    public initNativeView(): void {
        super.initNativeView();
        this.nativeView.owner = this;
    }

    // -------------------------------------------------------

    /**
     * when the view is destroyed.
     *
     * This is called by the framework when the view is destroyed (made not visible).
     *
     * However, it does not seem to be called when the page is unloaded.
     *
     * @link https://docs.nativescript.org/plugins/ui-plugin-custom
     */

    async disposeNativeView(): Promise<void> {
        if (Trace.isEnabled()) {
            CLog(CLogTypes.info, 'disposeNativeView(): top');
        }

        this.nativeView.owner = null;

        await this.mapbox.destroy();

        if (Trace.isEnabled()) {
            CLog(CLogTypes.info, 'disposeNativeView(): after mapbox.destroy()');
        }

        super.disposeNativeView();

        if (Trace.isEnabled()) {
            CLog(CLogTypes.info, 'disposeNativeView(): bottom');
        }
    }

    // ---------------------------------------------------

    /**
     * returns a reference to the class Mapbox API shim instance
     *
     * @see Mapbox
     */

    getMapboxApi(): any {
        return this.mapbox;
    }

    // ----------------------------------------------------

    /**
     * initialize the map
     *
     * @see MGLMapViewDelegateImpl
     *
     * @todo FIXME: figure out why the accessToken property (which is using a binding in the demo XML) isn't set before we arrive here.
     */

    initMap(): void {
        if (Trace.isEnabled()) {
            CLog(CLogTypes.info, 'initMap() top with settings:', this.settings);
        }

        // FIXME: HACK: if we are arriving here because of an XML parse the property evaluations may not have
        // happened yet. This needs to be redone, but for the moment we'll assume the accessToken is done
        // via a property eval (since it really shouldn't be hard coded in XML).
        //
        // settings will only be set here if we are programmatically showing a map.

        if (!this.settings && !this.config.accessToken) {
            if (Trace.isEnabled()) {
                CLog(CLogTypes.info, 'initMap() no access token. Race condition on XML property evaluation?');
            }

            // If the user didn't specify an accessToken we don't want to loop forever

            if (this.initCountHack > 50) {
                return;
            }

            // FIXME: super ugly.

            setTimeout(() => {
                this.initMap();
            }, 50);

            this.initCountHack++;

            return;
        }

        if (!this.settings) {
            this.settings = Mapbox.merge(this.config, Mapbox.defaults);
        } else {
            this.settings = Mapbox.merge(this.settings, Mapbox.defaults);
        }

        if (!this.nativeMapView) {
            this.mapbox = new Mapbox();

            if (Trace.isEnabled()) {
                CLog(CLogTypes.info, 'initMap(): after new Mapbox()');
            }

            // called in a setTimeout call at the bottom.

            const drawMap = () => {
                MGLAccountManager.accessToken = this.settings.accessToken;

                this.nativeMapView = MGLMapView.alloc().initWithFrameStyleURL(CGRectMake(0, 0, this.nativeView.frame.size.width, this.nativeView.frame.size.height), _getMapStyle(this.settings.style));

                // this delegate class is defined later in this file and is where, in Obj-C land,
                // callbacks are delivered and handled.

                this.nativeMapView.delegate = this.delegate = MGLMapViewDelegateImpl.new().initWithCallback(() => {
                    if (Trace.isEnabled()) {
                        CLog(CLogTypes.info, 'initMap(): MLMapViewDeleteImpl onMapReady callback');
                    }

                    // FIXME: on the Android side the view is created in Mapbox::show(). On the iOS side it's created
                    // here in MapboxView, however the mapbox api still needs a reference to it.

                    this.mapbox.setMapboxViewInstance(this.nativeMapView);
                    this.mapbox.initEventHandlerShim(this.settings, this.nativeMapView);

                    this.notify({
                        eventName: MapboxViewBase.mapReadyEvent,
                        object: this,
                        map: this,
                        ios: this.nativeMapView,
                    });

                    // no permission required, but to align with Android we fire the event anyway

                    this.notify({
                        eventName: MapboxViewBase.locationPermissionGrantedEvent,
                        object: this,
                        map: this,
                        ios: this.nativeMapView,
                    });
                });

                _setMapboxMapOptions(this.nativeMapView, this.settings);
                _markers = [];

                this.nativeView.addSubview(this.nativeMapView);

                // this.notify will notify an event listener specified
                // in the XML, in this case (onMoveBegin)="..."

                this.mapbox.setOnMoveBeginListener((data?: LatLng) => {
                    if (Trace.isEnabled()) {
                        CLog(CLogTypes.info, 'initMap(): onMoveBegin listener');
                    }

                    this.notify({
                        eventName: MapboxViewBase.moveBeginEvent,
                        object: this,
                        map: this,
                        ios: this.nativeMapView,
                    });
                }, this.nativeMapView);
            };

            // draw the map after a timeout

            setTimeout(drawMap, this.settings.delay ? this.settings.delay : 0);
        }
    } // end of initMap()

    // ----------------------------------

    public onLayout(left: number, top: number, right: number, bottom: number): void {
        super.onLayout(left, top, right, bottom);
        if (this.nativeMapView) {
            this.nativeMapView.layer.frame = this.ios.layer.bounds;
        }
    }

    [telemetryProperty.setNative](value:boolean) {
        NSUserDefaults.standardUserDefaults.setBoolForKey(false, "MGLMapboxMetricsEnabled");
    }
}

// -----------------------------------------------------------------------------------------------------------------------

/**
 * a custom user location marker
 *
 * We want to add some behavior to the user location marker to visibly
 * show the user when locations are being stored and when they are not.
 *
 * Sadly, it's not as easy under iOS as it is on Android. It involves
 * creating a custom annotation view.
 *
 * @link https://docs.mapbox.com/ios/maps/examples/user-location-annotation/
 */

@NativeClass
export class CustomUserLocationAnnotationView extends MGLUserLocationAnnotationView implements MGLUserLocationAnnotationView {
    public size: number;
    public dot: CALayer;
    public arrow: CAShapeLayer;

    // may be NORMAL, COMPASS, or GPS.

    private userLocationRenderMode: string;
    private renderModeChanged: boolean;

    /**
     * init
     *
     * @link https://docs.nativescript.org/core-concepts/ios-runtime/HelloWorld
     */

    public init() {
        this.size = 48;
        super.initWithFrame(CGRectMake(0, 0, this.size, this.size));

        this.renderModeChanged = true;
        this.userLocationRenderMode = 'NORMAL';

        return this;
    }

    /**
     * update
     *
     * The note from the Objective-C sample indicates this method may be called quite
     * often so it needs to be kept lightweight.
     */

    update() {
        if (CLLocationCoordinate2DIsValid(this.userLocation.coordinate)) {
            // if it's the first time here, setup the layers that make up the
            // location marker.

            if (!this.dot) {
                this.drawNonTrackingLocationMarker();
            }

            if (this.userLocationRenderMode === 'GPS') {
                this.updateHeading();
            }
        }
    }

    /**
     * Draw the GPS tracking arrow.
     *
     * @link https://docs.nativescript.org/ns-framework-modules/color
     */

    drawTrackingLocationMarker() {
        if (Trace.isEnabled()) {
            CLog(CLogTypes.info, 'CustomerUserLocationAnnotatinView::drawTrackingLocationMarker()');
        }

        this.drawTrackingDot();
        this.drawArrow();
    } // end of setupLayers()

    /**
     * draw the non-tracking marker
     */

    drawNonTrackingLocationMarker() {
        if (Trace.isEnabled()) {
            CLog(CLogTypes.info, 'CustomerUserLocationAnnotatinView::drawNonTrackingLocationMarker()');
        }

        this.drawNonTrackingDot();

        if (this.arrow) {
            this.arrow.removeFromSuperlayer();
            this.arrow = null;
        }
    }

    /**
     * draw the tracking dot.
     */

    drawTrackingDot() {
        this.size = 48;

        // we need to adjust the size of the bounds of the marker. The Tracking marker
        // is larger than the non tracking marker.

        this.bounds = CGRectMake(0, 0, this.size, this.size);

        const dot = CALayer.layer();

        dot.frame = this.bounds;

        // user corner radius to turn the layer into a circle

        dot.cornerRadius = this.size / 2;
        dot.backgroundColor = this.tintColor.CGColor;
        dot.borderWidth = 4;

        const whiteColor = new Color('#FFFFFF');
        dot.borderColor = whiteColor.ios.CGColor;

        if (!this.dot) {
            this.layer.addSublayer(dot);
        } else {
            this.layer.replaceSublayerWith(this.dot, dot);
        }

        // QUESTION: does GC catch this?

        this.dot = dot;
    }

    /**
     * draw the non-tracking dot.
     */

    drawNonTrackingDot() {
        this.size = 24;
        this.bounds = CGRectMake(0, 0, this.size, this.size);
        const dot = CALayer.layer();

        dot.frame = this.bounds;

        // user corner radius to turn the layer into a circle

        dot.cornerRadius = this.size / 2;
        dot.backgroundColor = this.tintColor.CGColor;

        dot.borderWidth = 1;

        const whiteColor = new Color('#FFFFFF');
        dot.borderColor = whiteColor.ios.CGColor;

        if (!this.dot) {
            this.layer.addSublayer(dot);
        } else {
            this.layer.replaceSublayerWith(this.dot, dot);
        }

        // QUESTION: does GC catch this?

        this.dot = dot;
    }

    /**
     * draw an arrow
     */

    drawArrow() {
        const arrow = CAShapeLayer.layer();

        arrow.path = this.arrowPath();
        arrow.frame = CGRectMake(0, 0, this.size / 2, this.size / 2);
        arrow.position = CGPointMake(CGRectGetMidX(this.dot.frame), CGRectGetMidY(this.dot.frame));
        arrow.fillColor = this.dot.borderColor;

        if (!this.arrow) {
            this.layer.addSublayer(arrow);
        } else {
            this.layer.replaceSublayerWith(this.arrow, arrow);
        }

        // QUESTION: Does GC catch this?

        this.arrow = arrow;
    }

    /**
     * update arrow heading
     *
     * @link https://docs.nativescript.org/core-concepts/ios-runtime/types/C-Functions
     */

    updateHeading() {
        // just to avoid a possible race condition where the arrow isnt' drawn yet

        if (!this.arrow) {
            return;
        }

        if (typeof this.userLocation == 'undefined') {
            return;
        }

        if (typeof this.userLocation.heading == 'undefined' || this.userLocation.heading === null) {
            return;
        }

        if (typeof this.userLocation.heading.trueHeading == 'undefined' || this.userLocation.heading.trueHeading === null) {
            return;
        }

        if (this.userLocation.heading.trueHeading > 0) {
            this.arrow.hidden = false;

            // get the difference between the map's current direction and the
            // user's heading, then convert it from degrees to radians
            //
            // The original Objective-C example uses the inline C function MGLRadiansFromDegrees but because
            // it's declared as inline it is not available for NativeScript. See linked article above.

            // let rotation : number = MGLRadiansFromDegrees( this.mapView.direction - this.userLocation.heading.trueHeading );

            const degrees: number = this.mapView.direction - this.userLocation.heading.trueHeading;

            // in radians

            let rotation: number = (degrees * Math.PI) / 180;

            rotation = -rotation;

            // if the difference would be perceptible, rotate the arrow.

            if (fabs(rotation) > 0.01) {
                // Disable implicit animations of this rotation, which reduces lag between updates

                CATransaction.begin();
                CATransaction.setDisableActions(true);

                this.arrow.setAffineTransform(CGAffineTransformRotate(CGAffineTransformIdentity, rotation));

                CATransaction.commit();
            }
        } else {
            this.arrow.hidden = true;
        }
    }

    /**
     * Calculate the vector path for an arrow
     */

    arrowPath() {
        const max: number = this.size / 2;
        const pad: number = 3;

        const top: CGPoint = CGPointMake(max * 0.5, 0);
        const left: CGPoint = CGPointMake(0 + pad, max - pad);
        const right: CGPoint = CGPointMake(max - pad, max - pad);
        const center: CGPoint = CGPointMake(max * 0.5, max * 0.6);

        const bezierPath = UIBezierPath.bezierPath();
        bezierPath.moveToPoint(top);
        bezierPath.addLineToPoint(left);
        bezierPath.addLineToPoint(center);

        bezierPath.addLineToPoint(right);
        bezierPath.addLineToPoint(top);
        bezierPath.closePath();

        return bezierPath.CGPath;
    }

    /**
     * change Render mode
     *
     * @param {string} renderMode
     */

    changeUserLocationRenderMode(renderMode) {
        if (Trace.isEnabled()) {
            CLog(CLogTypes.info, "CustomUserLocationAnnotatinView::changeUserLocationRenderMode(): changing mode to '" + renderMode + "'");
        }

        this.userLocationRenderMode = renderMode;

        if (renderMode === 'GPS') {
            this.drawTrackingLocationMarker();
        } else {
            this.drawNonTrackingLocationMarker();
        }
    }
} // end of class CustomUserLocationAnnotationView

// ----------------------------------------------------------------------

export class Mapbox extends MapboxCommon implements MapboxApi {
    // reference to the native mapbox API

    private _mapboxMapInstance: any;
    private _mapboxViewInstance: any;

    // list of circle layers

    private circles: any = [];

    // list of polylines

    private lines: any = [];

    // registered callbacks.

    private eventCallbacks: { [key: string]: any[] } = {};

    // user location marker render mode

    private userLocationRenderMode: string;

    // --------------------------------------------------------------------

    /**
     * set the mapboxMapInstance
     *
     * @see MapboxView::initMap()
     */

    setMapboxMapInstance(mapboxMapInstance: any) {
        this._mapboxMapInstance = mapboxMapInstance;
    }

    // --------------------------------------------------------------------

    /**
     * set the mapboxViewInstance
     *
     * @see MapboxView::initMap();
     */

    setMapboxViewInstance(mapboxViewInstance: any) {
        this._mapboxViewInstance = mapboxViewInstance;
    }

    // --------------------------------------------------------------------

    /**
     * event handler shim
     *
     * Initialize our event handler shim so that we can intercept events here.
     *
     * @param { MapboxView } mapboxView
     */

    initEventHandlerShim(settings: any, mapboxNativeViewInstance: any) {
        if (Trace.isEnabled()) {
            CLog(CLogTypes.info, 'Mapbox:initEventHandlerShim(): top');
        }

        this.setOnMapClickListener((point: LatLng) => this.checkForClickEvent(point), mapboxNativeViewInstance);
    }

    // --------------------------------------------------------------------------------

    /**
     * register a map event handler
     *
     * The NativeScript ContentView base class as on() and off() methods.
     */

    onMapEvent(eventName, id, callback, nativeMapView?): void {
        if (typeof this.eventCallbacks[eventName] == 'undefined') {
            this.eventCallbacks[eventName] = [];
        }

        this.eventCallbacks[eventName].push({
            id,
            callback,
        });
    }

    // -------------------------------------------------------------------------------

    offMapEvent(eventName, id, nativeMapView?): void {
        if (typeof this.eventCallbacks[eventName] == 'undefined') {
            return;
        }

        this.eventCallbacks[eventName] = this.eventCallbacks[eventName].filter((entry) => entry.id !== id);
    }

    // ------------------------------------------------------------------------

    /**
     * If click events registered and a feature found for the event, then fire listener.
     */
    private checkForClickEvent(point: LatLng, nativeMap?) {
        if (Trace.isEnabled()) {
            CLog(CLogTypes.info, 'Mapbox:checkForClickEvent(): got click event with point:', point);
        }

        this.eventCallbacks['click'].forEach((eventListener) => {
            this.queryRenderedFeatures({ layerIds: [eventListener.id], point }, nativeMap).then((response) => {
                if (response.length > 0) {
                    eventListener.callback(response);
                }
            });
        });

        return false;
    }

    // -------------------------------------------------------------------------------
    private _addMarkers(markers: MapboxMarker[], nativeMap?) {
        if (!markers) {
            if (Trace.isEnabled()) {
                CLog(CLogTypes.info, 'No markers passed');
            }
            return;
        }
        if (!Array.isArray(markers)) {
            if (Trace.isEnabled()) {
                CLog(CLogTypes.info, "markers must be passed as an Array: [{title: 'foo'}]");
            }
            return;
        }
        const theMap: MGLMapView = nativeMap || this._mapboxViewInstance;

        _downloadMarkerImages(markers).then((updatedMarkers: MapboxMarker[]) => {
            updatedMarkers.forEach((marker) => {
                const lat = marker.lat;
                const lng = marker.lng;
                const point = MGLPointAnnotation.new();
                point.coordinate = CLLocationCoordinate2DMake(lat, lng);
                point.title = marker.title;
                point.subtitle = marker.subtitle;
                // needs to be done before adding to the map, otherwise the delegate method 'mapViewImageForAnnotation' can't use it
                _markers.push(marker);
                theMap.addAnnotation(point);

                if (marker.selected) {
                    theMap.selectAnnotationAnimated(point, false);
                }

                marker.ios = point;

                marker.update = (newSettings: MapboxMarker) => {
                    _markers.forEach((_marker) => {
                        if (marker.id === _marker.id) {
                            if (newSettings.onTap !== undefined) {
                                _marker.onTap = newSettings.onTap;
                            }
                            if (newSettings.onCalloutTap !== undefined) {
                                _marker.onCalloutTap = newSettings.onCalloutTap;
                            }
                            if (newSettings.title !== undefined) {
                                _marker.ios.title = _marker.title = newSettings.title;
                            }
                            if (newSettings.subtitle !== undefined) {
                                _marker.ios.subtitle = _marker.subtitle = newSettings.subtitle;
                            }
                            if (newSettings.lat && newSettings.lng) {
                                _marker.lat = newSettings.lat;
                                _marker.lng = newSettings.lng;
                                _marker.ios.coordinate = CLLocationCoordinate2DMake(newSettings.lat, newSettings.lng);
                            }
                            if (newSettings.selected) {
                                theMap.selectAnnotationAnimated(_marker.ios, false);
                            }
                        }
                    });
                };
            });
        });
    }
    /**
     * create an display the map
     *
     * @todo FIXME: This method is not called. See MapboxView::initMap().
     */

    show(options: ShowOptions): Promise<any> {
        if (Trace.isEnabled()) {
            CLog(CLogTypes.info, 'show(): top with options:', options);
        }

        return new Promise((resolve, reject) => {
            try {
                const settings: ShowOptions = Mapbox.merge(options, Mapbox.defaults);

                // let directions = MBDirections.alloc().initWithAccessToken(arg.accessToken);
                // alert("directions: " + directions);

                // if no accessToken was set the app may crash

                if (settings.accessToken === undefined) {
                    reject("Please set the 'accessToken' parameter");
                    return;
                }

                // if already added, make sure it's removed first

                if (this._mapboxViewInstance) {
                    this._mapboxViewInstance.removeFromSuperview();
                }

                const view = UIApplication.sharedApplication.keyWindow.rootViewController.view,
                    frameRect = view.frame,
                    mapFrame = CGRectMake(
                        settings.margins.left,
                        settings.margins.top,
                        frameRect.size.width - settings.margins.left - settings.margins.right,
                        frameRect.size.height - settings.margins.top - settings.margins.bottom
                    ),
                    styleURL = _getMapStyle(settings.style);

                MGLAccountManager.accessToken = settings.accessToken;
                this._mapboxViewInstance = MGLMapView.alloc().initWithFrameStyleURL(mapFrame, styleURL);
                _setMapboxMapOptions(this._mapboxViewInstance, settings);

                this._mapboxViewInstance.delegate = MGLMapViewDelegateImpl.new().initWithCallback((mapView: MGLMapView) => {
                    resolve({
                        ios: mapView,
                    });
                });

                _markers = [];
                this._addMarkers(settings.markers);

                // wrapping in a little timeout since the map area tends to flash black a bit initially

                setTimeout(() => {
                    view.addSubview(this._mapboxViewInstance);
                }, 500);
            } catch (ex) {
                if (Trace.isEnabled()) {
                    CLog(CLogTypes.info, 'Error in mapbox.show: ' + ex);
                }
                reject(ex);
            }
        });
    }

    hide(): Promise<void> {
        return new Promise((resolve, reject) => {
            try {
                if (this._mapboxViewInstance) {
                    this._mapboxViewInstance.removeFromSuperview();
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
                    const view = UIApplication.sharedApplication.keyWindow.rootViewController.view;
                    view.addSubview(this._mapboxViewInstance);
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

    destroy(nativeMap?: any): Promise<void> {
        return new Promise((resolve, reject) => {
            const theMap: MGLMapView = nativeMap || this._mapboxViewInstance;
            if (theMap) {
                theMap.removeFromSuperview();
                theMap.delegate = null;
            }
            resolve();
        });
    }

    // ----------------------------------------
    // Life Cycle Hooks - Required on Android
    // ----------------------------------------

    /**
     * on Start
     */

    onStart(nativeMap?: any): Promise<void> {
        return Promise.resolve();
    }

    // ----------------------------------------------

    /**
     * on Resume
     */

    onResume(nativeMap?: any): Promise<void> {
        return Promise.resolve();
    }

    // ----------------------------------------------

    /**
     * on Pause
     */

    onPause(nativeMap?: any): Promise<void> {
        return Promise.resolve();
    }

    // ----------------------------------------------

    /**
     * on Stop
     */

    onStop(nativeMap?: any): Promise<void> {
        return Promise.resolve();
    }

    // ----------------------------------------------

    /**
     * on Low Memory
     */

    onLowMemory(nativeMap?: any): Promise<void> {
        return Promise.resolve();
    }

    // ----------------------------------------------

    /**
     * on Destroy
     */

    onDestroy(nativeMap?: any): Promise<void> {
        return Promise.resolve();
    }

    // ---------------------------------------------

    // onSaveInstanceState( Bundle outState)

    // ----------------------------------------

    /**
     * explicitly set a map style
     */

    setMapStyle(style: string | MapStyle, nativeMap?: any): Promise<void> {
        return new Promise((resolve, reject) => {
            try {
                const theMap: MGLMapView = nativeMap || this._mapboxViewInstance;

                // the style takes some time to load so we have to set a callback
                // to wait for the style to finish loading

                const delegate: MGLMapViewDelegateImpl = theMap.delegate as MGLMapViewDelegateImpl;

                delegate.setStyleLoadedCallback((mapView) => {
                    if (Trace.isEnabled()) {
                        CLog(CLogTypes.info, 'Mapbox:setMapStyle(): style loaded callback returned.');
                    }

                    resolve();
                });

                theMap.styleURL = _getMapStyle(style);
            } catch (ex) {
                if (Trace.isEnabled()) {
                    CLog(CLogTypes.info, 'Error in mapbox.setMapStyle: ' + ex);
                }
                reject(ex);
            }
        });
    }

    // --------------------------------------------

    addMarkers(markers: MapboxMarker[], nativeMap?: any): Promise<void> {
        return new Promise((resolve, reject) => {
            try {
                const theMap: MGLMapView = nativeMap || this._mapboxViewInstance;
                this._addMarkers(markers, theMap);
                resolve();
            } catch (ex) {
                if (Trace.isEnabled()) {
                    CLog(CLogTypes.info, 'Error in mapbox.addMarkers: ' + ex);
                }
                reject(ex);
            }
        });
    }

    removeMarkers(ids?: any, nativeMap?: any): Promise<void> {
        return new Promise((resolve, reject) => {
            try {
                const theMap = nativeMap || this._mapboxViewInstance;
                const markersToRemove: MGLAnnotation[] = [];
                _markers.forEach((marker) => {
                    if (!ids || (marker.id && ids.indexOf(marker.id) > -1)) {
                        markersToRemove.push(marker.ios);
                    }
                });

                // remove markers from cache
                if (ids) {
                    _markers = _markers.filter((marker) => ids.indexOf(marker.id) < 0);
                } else {
                    _markers = [];
                }

                if (markersToRemove.length > 0) {
                    theMap.removeAnnotations(markersToRemove);
                }
                resolve();
            } catch (ex) {
                if (Trace.isEnabled()) {
                    CLog(CLogTypes.info, 'Error in mapbox.removeMarkers: ' + ex);
                }
                reject(ex);
            }
        });
    }

    setCenter(options: SetCenterOptions, nativeMap?): Promise<void> {
        return new Promise((resolve, reject) => {
            try {
                const theMap: MGLMapView = nativeMap || this._mapboxViewInstance;
                const animated = options.animated === undefined || options.animated;
                const coordinate = CLLocationCoordinate2DMake(options.lat, options.lng);
                theMap.setCenterCoordinateAnimated(coordinate, animated);
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
                const theMap: MGLMapView = nativeMap || this._mapboxViewInstance;
                const coordinate = theMap.centerCoordinate;
                resolve({
                    lat: coordinate.latitude,
                    lng: coordinate.longitude,
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
                const theMap: MGLMapView = nativeMap || this._mapboxViewInstance;
                const animated = options.animated === undefined || options.animated;
                const level = options.level;
                if (level >= 0 && level <= 20) {
                    theMap.setZoomLevelAnimated(level, animated);
                    resolve();
                } else {
                    reject('invalid ZoomLevel, use any double value from 0 to 20 (like 8.3)');
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
                const theMap: MGLMapView = nativeMap || this._mapboxViewInstance;
                resolve(theMap.zoomLevel);
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
                const theMap: MGLMapView = nativeMap || this._mapboxViewInstance;

                const cam = theMap.camera;

                cam.pitch = options.tilt;

                const durationMs = options.duration ? options.duration : 5000;

                theMap.setCameraWithDurationAnimationTimingFunction(cam, durationMs / 1000, CAMediaTimingFunction.functionWithName(kCAMediaTimingFunctionEaseInEaseOut));

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
                const theMap: MGLMapView = nativeMap || this._mapboxViewInstance;
                resolve(theMap.camera.pitch);
            } catch (ex) {
                if (Trace.isEnabled()) {
                    CLog(CLogTypes.info, 'Error in mapbox.getTilt: ' + ex);
                }
                reject(ex);
            }
        });
    }

    getUserLocation(nativeMap?): Promise<UserLocation> {
        return new Promise((resolve, reject) => {
            try {
                const theMap: MGLMapView = nativeMap || this._mapboxViewInstance;
                const loc: MGLUserLocation = theMap.userLocation;
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
     * convert string to camera mode constant.
     *
     * Supported modes on iOS are different than on Android.
     *
     * @todo come up with a reasonable set of cross platform defaults.
     */

    _stringToCameraMode(mode: UserLocationCameraMode): any {
        switch (mode) {
            case 'NONE':
                return MGLUserTrackingMode.None;

            case 'NONE_COMPASS':
                if (Trace.isEnabled()) {
                    CLog(CLogTypes.info, '_stringToCameraMode(): NONE_COMPASS unsupported on iOS');
                }
                return MGLUserTrackingMode.None;

            case 'NONE_GPS':
                if (Trace.isEnabled()) {
                    CLog(CLogTypes.info, '_stringToCameraMode(): NONE_GPS unsupported on iOS');
                }
                return MGLUserTrackingMode.None;

            case 'TRACKING':
                return MGLUserTrackingMode.Follow;

            case 'TRACK_COMPASS':
                return MGLUserTrackingMode.FollowWithHeading;

            case 'TRACKING_GPS':
                // a reasonable approximation.

                return MGLUserTrackingMode.Follow;

            case 'TRACK_GPS_NORTH':
                return MGLUserTrackingMode.FollowWithCourse;
        }
    }

    /**
     * convert string to render mode
     */

    _stringToRenderMode(mode): any {
        let renderMode: any;

        switch (mode) {
            case 'NORMAL':
                return 'NORMAL';

            case 'COMPASS':
                return 'COMPASS';

            case 'GPS':
                return 'GPS';
        }
    }

    /**
     * show a user location marker
     *
     * This method must not be called before location permissions have been granted.
     *
     * Supported options under iOS are:
     *
     * - renderMode
     * - cameraMode
     * - clickListener
     *
     * Other options are ignored. Compare with the android version that supports a
     * different set of options.
     *
     * @param {object} options
     */

    showUserLocationMarker(options, nativeMap?): Promise<void> {
        return new Promise((resolve, reject) => {
            try {
                const theMap: MGLMapView = nativeMap || this._mapboxViewInstance;

                // userLocation marker.

                theMap.showsUserLocation = true;

                theMap.userTrackingMode = this._stringToCameraMode(options.cameraMode);

                theMap.showsUserHeadingIndicator = true;

                this.userLocationRenderMode = this._stringToRenderMode(options.renderMode);

                // the "delegate" needs to know the modes

                const delegate = theMap.delegate as MGLMapViewDelegateImpl;

                // tell the delegate to tell the CustomerLocationAnnotationView to change the
                // appearance of the marker.

                delegate.changeUserLocationRenderMode(this.userLocationRenderMode);

                if (typeof options.clickListener != 'undefined') {
                    delegate.setUserLocationClickListener(options.clickListener);
                }

                resolve();
            } catch (ex) {
                if (Trace.isEnabled()) {
                    CLog(CLogTypes.info, 'Error in mapbox.getUserLocation: ' + ex);
                }
                reject(ex);
            }
        });
    }

    // ------------------------------------------------------------------------------

    /**
     * hide the user location marker
     *
     * @todo unfinished
     */

    hideUserLocationMarker(nativeMap?): Promise<void> {
        return new Promise((resolve, reject) => {
            try {
                resolve();
            } catch (ex) {
                if (Trace.isEnabled()) {
                    CLog(CLogTypes.info, 'Error in mapbox.getUserLocation: ' + ex);
                }
                reject(ex);
            }
        });
    }

    // --------------------------------------------------------------------------------

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
                const theMap: MGLMapView = nativeMap || this._mapboxViewInstance;

                if (Trace.isEnabled()) {
                    CLog(CLogTypes.info, "Mapbox::changeUserLocationMarkerMode(): changing renderMode to '" + renderModeString + "' cameraMode '" + cameraModeString + "'");
                }

                theMap.userTrackingMode = this._stringToCameraMode(cameraModeString);

                const delegate: MGLMapViewDelegateImpl = theMap.delegate as MGLMapViewDelegateImpl;
                const renderMode = this._stringToRenderMode(renderModeString);
                delegate.changeUserLocationRenderMode(renderMode);
            } catch (ex) {
                if (Trace.isEnabled()) {
                    CLog(CLogTypes.info, 'Error in mapbox.showUserLocationMarker: ' + ex);
                }
                reject(ex);
            }
        });
    }

    /**
     * ignored on iOS
     */

    forceUserLocationUpdate(location: any, nativeMap?: any): void {}

    // --------------------------------------------------------------

    queryRenderedFeatures(options: QueryRenderedFeaturesOptions, nativeMap?): Promise<any[]> {
        return new Promise((resolve, reject) => {
            try {
                const theMap: MGLMapView = nativeMap || this._mapboxViewInstance;
                const point = options.point;
                if (point === undefined) {
                    reject("Please set the 'point' parameter");
                    return;
                }

                const { x, y } = theMap.convertCoordinateToPointToView({ latitude: point.lat, longitude: point.lng }, theMap);
                let features = null;
                if (options.layerIds) {
                    const nativeLayerIds = NSSet.setWithArray<string>(iOSNativeHelper.collections.jsArrayToNSArray(options.layerIds));
                    features = theMap.visibleFeaturesAtPointInStyleLayersWithIdentifiers({ x, y }, nativeLayerIds);
                } else {
                    features = theMap.visibleFeaturesAtPoint({ x, y });
                }

                const result = [];
                for (let i = 0; i < features.count; i++) {
                    const feature: MGLFeature = features.objectAtIndex(i);
                    const featureJson = NSJSONSerialization.dataWithJSONObjectOptionsError(feature.geoJSONDictionary(), 0);
                    result.push(JSON.parse(NSString.alloc().initWithDataEncoding(featureJson, NSUTF8StringEncoding) as any));
                }

                resolve(result);
            } catch (ex) {
                if (Trace.isEnabled()) {
                    CLog(CLogTypes.info, 'Error in mapbox.queryRenderedFeatures: ' + ex);
                }
                reject(ex);
            }
        });
    }

    addPolygon(options: AddPolygonOptions, nativeMap?): Promise<void> {
        return new Promise((resolve, reject) => {
            const theMap = nativeMap || this._mapboxViewInstance;
            const points = options.points;

            if (points === undefined) {
                reject("Please set the 'points' parameter");
                return;
            }

            const coordinateArray = [];
            points.forEach((point) => coordinateArray.push([point.lng, point.lat]));

            const polygonID = `polygon_${options.id || new Date().getTime()}`;

            if (theMap.style.sourceWithIdentifier(polygonID)) {
                reject("Remove the polygon with this id first with 'removePolygons': " + polygonID);
                return;
            }

            const geoJSON = `{
        "type": "FeatureCollection",
        "features": [
          {
            "id": ${JSON.stringify(polygonID)},
            "type": "Feature",
            "properties": {
            },
            "geometry": {
              "type": "Polygon",
              "coordinates": [${JSON.stringify(coordinateArray)}]
            }
          }
        ]
      }`;
            const geoDataStr = NSString.stringWithString(geoJSON);
            const geoData = geoDataStr.dataUsingEncoding(NSUTF8StringEncoding);
            const geoDataBase64Enc = geoData.base64EncodedStringWithOptions(0);
            const geo = NSData.alloc().initWithBase64EncodedStringOptions(geoDataBase64Enc, null);
            const shape = MGLShape.shapeWithDataEncodingError(geo, NSUTF8StringEncoding);
            const source = MGLShapeSource.alloc().initWithIdentifierShapeOptions(polygonID, shape, null);

            theMap.style.addSource(source);

            if (options.strokeColor || options.strokeWidth || options.strokeOpacity) {
                const strokeLayer = MGLLineStyleLayer.alloc().initWithIdentifierSource(polygonID + '_stroke', source);
                strokeLayer.lineColor = NSExpression.expressionForConstantValue(
                    !options.strokeColor ? UIColor.blackColor : options.strokeColor instanceof Color ? options.strokeColor.ios : new Color(options.strokeColor).ios
                );
                strokeLayer.lineWidth = NSExpression.expressionForConstantValue(options.strokeWidth || 5);
                strokeLayer.lineOpacity = NSExpression.expressionForConstantValue(options.strokeOpacity === undefined ? 1 : options.strokeOpacity);
                theMap.style.addLayer(strokeLayer);
            }

            const layer = MGLFillStyleLayer.alloc().initWithIdentifierSource(polygonID, source);
            layer.fillColor = NSExpression.expressionForConstantValue(
                !options.fillColor ? UIColor.blackColor : options.fillColor instanceof Color ? options.fillColor.ios : new Color(options.fillColor).ios
            );
            layer.fillOpacity = NSExpression.expressionForConstantValue(options.fillOpacity === undefined ? 1 : options.fillOpacity);
            theMap.style.addLayer(layer);

            resolve();
        });
    }

    // --------------------------------------------------------------------

    addPolyline(options: AddPolylineOptions, nativeMap?): Promise<void> {
        return new Promise((resolve, reject) => {
            const theMap: MGLMapView = nativeMap || this._mapboxViewInstance;
            const points = options.points;
            if (points === undefined) {
                reject("Please set the 'points' parameter");
                return;
            }

            const coordinateArray = [];
            points.forEach((point) => coordinateArray.push([point.lng, point.lat]));

            const polylineID = 'polyline_' + (options.id || new Date().getTime());

            // this would otherwise crash the app
            if (theMap.style.sourceWithIdentifier(polylineID)) {
                reject("Remove the polyline with this id first with 'removePolylines': " + polylineID);
                return;
            }

            const geoJSON = `{"type": "FeatureCollection", "features": [{"type": "Feature","properties": {},"geometry": {"type": "LineString", "coordinates": ${JSON.stringify(coordinateArray)}}}]}`;
            const geoDataStr = NSString.stringWithString(geoJSON);
            const geoData = geoDataStr.dataUsingEncoding(NSUTF8StringEncoding);
            const geoDataBase64Enc = geoData.base64EncodedStringWithOptions(0);

            const geo = NSData.alloc().initWithBase64EncodedStringOptions(geoDataBase64Enc, null);
            const shape = MGLShape.shapeWithDataEncodingError(geo, NSUTF8StringEncoding);
            const source = MGLShapeSource.alloc().initWithIdentifierShapeOptions(polylineID, shape, null);
            theMap.style.addSource(source);

            const layer = MGLLineStyleLayer.alloc().initWithIdentifierSource(polylineID, source);
            layer.lineColor = NSExpression.expressionForConstantValue(!options.color ? UIColor.blackColor : options.color instanceof Color ? options.color.ios : new Color(options.color).ios);
            layer.lineWidth = NSExpression.expressionForConstantValue(options.width || 5);
            layer.lineOpacity = NSExpression.expressionForConstantValue(options.opacity === undefined ? 1 : options.opacity);

            theMap.style.addLayer(layer);
            resolve();
        });
    }

    // --------------------------------------------------------------------

    private removePolyById(theMap, id: string): void {
        let layer = theMap.style.layerWithIdentifier(id);
        if (layer !== null) {
            theMap.style.removeLayer(layer);
        }
        // polygons may have a 'stroke' layer
        layer = theMap.style.layerWithIdentifier(id + '_stroke');
        if (layer !== null) {
            theMap.style.removeLayer(layer);
        }
        const source = theMap.style.sourceWithIdentifier(id);
        if (source !== null) {
            theMap.style.removeSource(source);
        }
    }

    private removePolys(polyType: string, ids?: any[], nativeMap?: any): Promise<void> {
        return new Promise((resolve) => {
            const theMap: MGLMapView = nativeMap || this._mapboxViewInstance;
            ids.forEach((id) => this.removePolyById(theMap, polyType + id));
            resolve();
        });
    }

    removePolygons(ids?: any[], nativeMap?: any): Promise<void> {
        return this.removePolys('polygon_', ids, nativeMap);
    }

    removePolylines(ids?: any[], nativeMap?: any): Promise<void> {
        return this.removePolys('polyline_', ids, nativeMap);
    }

    animateCamera(options: AnimateCameraOptions, nativeMap?): Promise<void> {
        return new Promise((resolve, reject) => {
            try {
                const theMap: MGLMapView = nativeMap || this._mapboxViewInstance;

                const target = options.target;
                if (target === undefined) {
                    reject("Please set the 'target' parameter");
                    return;
                }

                const cam = theMap.camera;

                cam.centerCoordinate = CLLocationCoordinate2DMake(target.lat, target.lng);

                if (options.altitude) {
                    cam.altitude = options.altitude;
                }

                if (options.bearing) {
                    cam.heading = options.bearing;
                }

                if (options.tilt) {
                    cam.pitch = options.tilt;
                }

                const durationMs = options.duration ? options.duration : 10000;

                theMap.setCameraWithDurationAnimationTimingFunction(cam, durationMs / 1000, CAMediaTimingFunction.functionWithName(kCAMediaTimingFunctionEaseInEaseOut));

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

    // ------------------------------------------------------------------------------

    /**
     * sets a map level click listener
     *
     */

    setOnMapClickListener(listener: (data: LatLng) => void, nativeMap?): Promise<void> {
        return new Promise((resolve, reject) => {
            try {
                const theMap: MGLMapView = nativeMap || this._mapboxViewInstance;

                if (!theMap) {
                    reject('No map has been loaded');
                    return;
                }

                // adding the tap handler to the map object so it's not garbage collected.
                theMap['mapTapHandler'] = MapTapHandlerImpl.initWithOwnerAndListenerForMap(new WeakRef(this), listener, theMap);
                const tapGestureRecognizer = UITapGestureRecognizer.alloc().initWithTargetAction(theMap['mapTapHandler'], 'tap');

                // cancel the default tap handler
                for (let i = 0; i < theMap.gestureRecognizers.count; i++) {
                    const recognizer: UIGestureRecognizer = theMap.gestureRecognizers.objectAtIndex(i);
                    if (recognizer instanceof UITapGestureRecognizer) {
                        tapGestureRecognizer.requireGestureRecognizerToFail(recognizer);
                    }
                }

                theMap.addGestureRecognizer(tapGestureRecognizer);

                resolve();
            } catch (ex) {
                if (Trace.isEnabled()) {
                    CLog(CLogTypes.info, 'Error in mapbox.setOnMapClickListener: ' + ex);
                }
                reject(ex);
            }
        });
    }

    setOnMapLongClickListener(listener: (data: LatLng) => void, nativeMap?): Promise<void> {
        return new Promise((resolve, reject) => {
            try {
                const theMap: MGLMapView = nativeMap || this._mapboxViewInstance;

                if (!theMap) {
                    reject('No map has been loaded');
                    return;
                }

                // adding the longPress handler to the map oject so it's not GC'd
                theMap['mapLongPressHandler'] = MapLongPressHandlerImpl.initWithOwnerAndListenerForMap(new WeakRef(this), listener, theMap);
                const longPressGestureRecognizer = UILongPressGestureRecognizer.alloc().initWithTargetAction(theMap['mapLongPressHandler'], 'longPress');

                // cancel the default longPress handler
                for (let i = 0; i < theMap.gestureRecognizers.count; i++) {
                    const recognizer: UIGestureRecognizer = theMap.gestureRecognizers.objectAtIndex(i);
                    if (recognizer instanceof UILongPressGestureRecognizer) {
                        longPressGestureRecognizer.requireGestureRecognizerToFail(recognizer);
                    }
                }

                theMap.addGestureRecognizer(longPressGestureRecognizer);

                resolve();
            } catch (ex) {
                if (Trace.isEnabled()) {
                    CLog(CLogTypes.info, 'Error in mapbox.setOnMapClickListener: ' + ex);
                }
                reject(ex);
            }
        });
    }

    setOnScrollListener(listener: (data?: LatLng) => void, nativeMap?: any): Promise<void> {
        return new Promise((resolve, reject) => {
            try {
                const theMap: MGLMapView = nativeMap || this._mapboxViewInstance;

                if (!theMap) {
                    reject('No map has been loaded');
                    return;
                }

                // adding the pan handler to the map oject so it's not GC'd
                theMap['mapPanHandler'] = MapPanHandlerImpl.initWithOwnerAndListenerForMap(new WeakRef(this), listener, theMap);

                // there's already a pan recognizer, so find it and attach a target action
                for (let i = 0; i < theMap.gestureRecognizers.count; i++) {
                    const recognizer: UIGestureRecognizer = theMap.gestureRecognizers.objectAtIndex(i);
                    if (recognizer instanceof UIPanGestureRecognizer) {
                        recognizer.addTargetAction(theMap['mapPanHandler'], 'pan');
                        break;
                    }
                }

                resolve();
            } catch (ex) {
                if (Trace.isEnabled()) {
                    CLog(CLogTypes.info, 'Error in mapbox.setOnScrollListener: ' + ex);
                }
                reject(ex);
            }
        });
    }

    /**
     * simulates onMoveBegin single event callback
     *
     * This will call the listener provided once per pan akin to the way
     * onMoveBegin on the Android side works.
     */

    setOnMoveBeginListener(listener: (data?: LatLng) => void, nativeMap?: any): Promise<void> {
        return new Promise((resolve, reject) => {
            try {
                const theMap: MGLMapView = nativeMap || this._mapboxViewInstance;

                if (!theMap) {
                    reject('No map has been loaded');
                    return;
                }

                // adding the pan handler to the map oject so it's not GC'd
                theMap['mapOnMoveBeginHandler'] = MapPanHandlerImpl.initWithOwnerAndListenerForMap(new WeakRef(this), listener, theMap);

                // tell the panHandler that we're only interested in the first pan per pan gesture

                theMap['mapOnMoveBeginHandler'].setOnMoveBegin();

                // there's already a pan recognizer, so find it and attach a target action

                for (let i = 0; i < theMap.gestureRecognizers.count; i++) {
                    const recognizer: UIGestureRecognizer = theMap.gestureRecognizers.objectAtIndex(i);

                    if (recognizer instanceof UIPanGestureRecognizer) {
                        recognizer.addTargetAction(theMap['mapOnMoveBeginHandler'], 'pan');
                        break;
                    }
                }

                resolve();
            } catch (ex) {
                if (Trace.isEnabled()) {
                    CLog(CLogTypes.info, 'Error in mapbox.setOnScrollListener: ' + ex);
                }
                reject(ex);
            }
        });
    }

    setOnFlingListener(listener: () => void, nativeMap?: any): Promise<void> {
        // there's no swipe event we can bind to
        return Promise.reject("'setOnFlingListener' is not supported on iOS");
    }

    setOnCameraMoveListener(listener: () => void, nativeMap?: any): Promise<void> {
        return Promise.reject("'setOnCameraMoveListener' not currently supported on iOS");
    }

    setOnCameraMoveCancelListener(listener: () => void, nativeMap?: any): Promise<void> {
        return Promise.reject("'setOnCameraMoveCancelListener' not currently supported on iOS");
    }

    setOnCameraIdleListener(listener: () => void, nativeMap?: any): Promise<void> {
        return Promise.reject("'setOnCameraIdleListener' not currently supported on iOS");
    }

    getViewport(nativeMap?): Promise<Viewport> {
        return new Promise((resolve, reject) => {
            try {
                const theMap: MGLMapView = nativeMap || this._mapboxViewInstance;

                if (!theMap) {
                    reject('No map has been loaded');
                    return;
                }

                const visibleBounds = theMap.visibleCoordinateBounds;
                const bounds = {
                    north: visibleBounds.ne.latitude,
                    east: visibleBounds.ne.longitude,
                    south: visibleBounds.sw.latitude,
                    west: visibleBounds.sw.longitude,
                };
                resolve({
                    bounds,
                    zoomLevel: theMap.zoomLevel,
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
                const theMap: MGLMapView = nativeMap || this._mapboxViewInstance;

                if (!theMap) {
                    reject('No map has been loaded');
                    return;
                }

                const bounds: MGLCoordinateBounds = {
                    sw: CLLocationCoordinate2DMake(options.bounds.south, options.bounds.west),
                    ne: CLLocationCoordinate2DMake(options.bounds.north, options.bounds.east),
                };

                const animated = options.animated === undefined || options.animated;

                // support defined padding
                const padding: UIEdgeInsets = Mapbox.merge(options.padding === undefined ? {} : options.padding, {
                    top: 25,
                    left: 25,
                    bottom: 25,
                    right: 25,
                });

                theMap.setVisibleCoordinateBoundsEdgePaddingAnimated(bounds, padding, animated);
                resolve();
            } catch (ex) {
                if (Trace.isEnabled()) {
                    CLog(CLogTypes.info, 'Error in mapbox.setViewport: ' + ex);
                }
                reject(ex);
            }
        });
    }

    downloadOfflineRegion(options: DownloadOfflineRegionOptions): Promise<void> {
        return new Promise((resolve, reject) => {
            try {
                const styleURL = _getMapStyle(options.style);
                const swCoordinate = CLLocationCoordinate2DMake(options.bounds.south, options.bounds.west);
                const neCoordinate = CLLocationCoordinate2DMake(options.bounds.north, options.bounds.east);

                const bounds: MGLCoordinateBounds = {
                    sw: swCoordinate,
                    ne: neCoordinate,
                };

                const region = MGLTilePyramidOfflineRegion.alloc().initWithStyleURLBoundsFromZoomLevelToZoomLevel(styleURL, bounds, options.minZoom, options.maxZoom);

                if (options.accessToken) {
                    MGLAccountManager.accessToken = options.accessToken;
                }

                // TODO there's more observers, see https://www.mapbox.com/ios-sdk/examples/offline-pack/
                if (options.onProgress) {
                    _addObserver(MGLOfflinePackProgressChangedNotification, (notification: NSNotification) => {
                        const offlinePack = notification.object;
                        const offlinePackProgress = offlinePack.progress;
                        const userInfo = NSKeyedUnarchiver.unarchiveObjectWithData(offlinePack.context);
                        const complete = offlinePackProgress.countOfResourcesCompleted === offlinePackProgress.countOfResourcesExpected;

                        options.onProgress({
                            name: userInfo.objectForKey('name'),
                            completed: offlinePackProgress.countOfResourcesCompleted,
                            expected: offlinePackProgress.countOfResourcesExpected,
                            percentage: Math.round((offlinePackProgress.countOfResourcesCompleted / offlinePackProgress.countOfResourcesExpected) * 10000) / 100,
                            complete,
                        });

                        if (complete) {
                            resolve();
                        }
                    });
                }

                _addObserver(MGLOfflinePackErrorNotification, (notification: NSNotification) => {
                    const offlinePack = notification.object;
                    const userInfo = NSKeyedUnarchiver.unarchiveObjectWithData(offlinePack.context);
                    const error = notification.userInfo[MGLOfflinePackUserInfoKeyError];
                    reject({
                        name: userInfo.objectForKey('name'),
                        error: 'Download error. ' + error,
                    });
                });

                _addObserver(MGLOfflinePackMaximumMapboxTilesReachedNotification, (notification: NSNotification) => {
                    const offlinePack = notification.object;
                    const userInfo = NSKeyedUnarchiver.unarchiveObjectWithData(offlinePack.context);
                    const maximumCount = notification.userInfo[MGLOfflinePackUserInfoKeyMaximumCount];
                    console.log(`Offline region '${userInfo.objectForKey('name')}' reached the tile limit of ${maximumCount}`);
                });

                // Store some data for identification purposes alongside the downloaded resources.
                const userInfo = { name: options.name };
                const context = NSKeyedArchiver.archivedDataWithRootObject(userInfo);

                // Create and register an offline pack with the shared offline storage object.
                MGLOfflineStorage.sharedOfflineStorage.addPackForRegionWithContextCompletionHandler(region, context, (pack, error: NSError) => {
                    if (error) {
                        // The pack couldn’t be created for some reason.
                        reject(error.localizedFailureReason);
                    } else {
                        // Start downloading.
                        pack.resume();
                    }
                });
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
                const packs = MGLOfflineStorage.sharedOfflineStorage.packs;
                if (!packs) {
                    reject('No packs found or Mapbox not ready yet');
                    return;
                }

                const regions = [];
                for (let i = 0; i < packs.count; i++) {
                    const pack: MGLOfflinePack = packs.objectAtIndex(i);
                    const region: MGLTilePyramidOfflineRegion = pack.region as MGLTilePyramidOfflineRegion;
                    const userInfo = NSKeyedUnarchiver.unarchiveObjectWithData(pack.context);
                    regions.push({
                        name: userInfo.objectForKey('name'),
                        style: '' + region.styleURL,
                        minZoom: region.minimumZoomLevel,
                        maxZoom: region.maximumZoomLevel,
                        bounds: {
                            north: region.bounds.ne.latitude,
                            east: region.bounds.ne.longitude,
                            south: region.bounds.sw.latitude,
                            west: region.bounds.sw.longitude,
                        },
                    });
                }
                resolve(regions);
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
                if (!options || !options.name) {
                    reject("Pass in the 'name' param");
                    return;
                }

                const packs = MGLOfflineStorage.sharedOfflineStorage.packs;
                let found = false;
                for (let i = 0; i < packs.count; i++) {
                    const pack = packs.objectAtIndex(i);
                    const userInfo = NSKeyedUnarchiver.unarchiveObjectWithData(pack.context);
                    const name = userInfo.objectForKey('name');
                    if (name === options.name) {
                        found = true;
                        MGLOfflineStorage.sharedOfflineStorage.removePackWithCompletionHandler(pack, (error: NSError) => {
                            if (error) {
                                // The pack couldn’t be deleted for some reason.
                                reject(error.localizedFailureReason);
                            } else {
                                resolve();
                                // don't return, see note below
                            }
                        });
                        // don't break the loop as there may be multiple packs with the same name
                    }
                }
                if (!found) {
                    reject('Region not found');
                }
            } catch (ex) {
                if (Trace.isEnabled()) {
                    CLog(CLogTypes.info, 'Error in mapbox.deleteOfflineRegion: ' + ex);
                }
                reject(ex);
            }
        });
    }

    addExtrusion(options: AddExtrusionOptions, nativeMap?): Promise<void> {
        return new Promise((resolve, reject) => {
            try {
                const theMap: MGLMapView = nativeMap || this._mapboxViewInstance;

                if (!theMap) {
                    reject('No map has been loaded');
                    return;
                }

                resolve();
            } catch (ex) {
                if (Trace.isEnabled()) {
                    CLog(CLogTypes.info, 'Error in mapbox.deleteOfflineRegion: ' + ex);
                }
                reject(ex);
            }
        });
    }

    /**
     * add a vector or geojson source
     *
     * Add a source that can then be referenced in the style specification
     * passed to addLayer().
     *
     * @link https://docs.mapbox.com/mapbox-gl-js/api/#map#addsource
     */

    addSource(id: string, options: AddSourceOptions, nativeMap?): Promise<void> {
        return new Promise((resolve, reject) => {
            try {
                const { url, type } = options;
                const theMap: MGLMapView = nativeMap || this._mapboxViewInstance;
                let source;

                if (!theMap) {
                    reject('No map has been loaded');
                    return;
                }

                if (theMap.style.sourceWithIdentifier(id)) {
                    reject('Source exists: ' + id);
                    return;
                }

                switch (type) {
                    case 'vector':
                        source = MGLVectorTileSource.alloc().initWithIdentifierConfigurationURL(id, NSURL.URLWithString(url));
                        break;

                    case 'geojson':
                        if (theMap.style.sourceWithIdentifier(id)) {
                            reject("Remove the layer with this id first with 'removeLayer': " + id);
                            return;
                        }

                        const content: NSString = NSString.stringWithString(JSON.stringify(options.data));
                        const nsData: NSData = content.dataUsingEncoding(NSUTF8StringEncoding);
                        const geoJsonShape = MGLShape.shapeWithDataEncodingError(nsData, NSUTF8StringEncoding);
                        
                        source = MGLShapeSource.alloc().initWithIdentifierShapeOptions(id, geoJsonShape, null);

                        break;

                    default:
                        reject('Invalid source type: ' + type);
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

                theMap.style.addSource(source);
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
                const theMap: MGLMapView = nativeMap || this._mapboxViewInstance;

                if (!theMap) {
                    reject('No map has been loaded');
                    return;
                }

                const source = theMap.style.sourceWithIdentifier(id);
                if (!source) {
                    reject('Source does not exist');
                    return;
                }

                theMap.style.removeSource(source);

                resolve();
            } catch (ex) {
                if (Trace.isEnabled()) {
                    CLog(CLogTypes.info, 'Error in mapbox.removeSource: ' + ex);
                }
                reject(ex);
            }
        });
    }

    // -------------------------------------------------------------------------------------

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
     * - the source: must be a GeoJSON object.
     * - only a subset of paint properties are available.
     *
     * @param {object} style - a style following the Mapbox style specification.
     * @param {any} nativeMapView - native map view (com.mapbox.mapboxsdk.maps.MapView)
     *
     * @link https://docs.mapbox.com/mapbox-gl-js/style-spec/#layers
     */
    public addLayer(style, nativeMapView?): Promise<void> {
        let retval;

        switch (style.type) {
            case 'line':
                retval = this.addLineLayer(style, nativeMapView);
                break;

            case 'circle':
                retval = this.addCircleLayer(style, nativeMapView);
                break;

            default:
                retval = Promise.reject("Mapbox:addLayer() Unsupported geometry type '" + style.type + "'");

                break;
        }

        return retval;
    }

    /**
     * remove layer by ID
     *
     * Removes a layer given a layer id
     *
     * @param {string} id
     */
    public async removeLayer(id: string, nativeMapViewInstance?) {
        const theMap: MGLMapView = nativeMapViewInstance || this._mapboxViewInstance;

        if (Trace.isEnabled()) {
            CLog(CLogTypes.info, "Mapbox::removeLayer(): attempting to remove layer '" + id + "'");
        }

        const layer = theMap.style.layerWithIdentifier(id);

        if (Trace.isEnabled()) {
            CLog(CLogTypes.info, 'Mapbox:removeLayer(): got layer object: ', layer);
        }

        if (!layer) {
            throw new Error("Layer '" + id + "' not found when attempting to remove it.");
        }

        theMap.style.removeLayer(layer);

        if (Trace.isEnabled()) {
            CLog(CLogTypes.info, 'Mapbox:removeLayer(): after removing layer ' + id);
        }
    } // end of removeLayer()

    // -------------------------------------------------------------------------------------

    /**
     * add a line layer
     *
     * Draws a line layer based on a mapbox-gl-js Mapbox Style.
     *
     * What sucks about this is that there is apparently no facility to add an event listener to a layer.
     *
     * The idea for this method is to make sharing code between mapbox-gl-js Typescript web applications
     * and {N} native applications easier.
     *
     * For the moment this method only supports a source type of 'geojson'.
     *
     * Example style for a line:
     *
     * {
     * 'id': someid,
     * 'type': 'line',
     * 'source': {
     *   'type': 'geojson',
     *   'data': {
     *     "type": "Feature",
     *       "geometry": {
     *       "type": "LineString",
     *         "coordinates": [ [ lng, lat ], [ lng, lat ], ..... ]
     *       }
     *     }
     *   }
     * },
     * 'layout': {
     *   'line-cap': 'round',
     *   'line-join': 'round'
     * },
     * 'paint': {
     *   'line-color': '#ed6498',
     *   'line-width': 5,
     *   'line-opacity': .8,
     *   'line-dash-array': [ 1, 1, 1, ..]
     * }
     *
     * Do not call this method directly. Use addLayer().
     *
     * 'source' may also refer to a vector source
     *
     * 'source': {
     *    'type': 'vector',
     *    'url': '<url of vector source>'
     *  }
     *
     * or it may be a string referring to the id of an already added source as in
     *
     * 'source': '<id of source>'
     *
     * To enable catching of click events on a line, when a click handler is added
     * to a line (using the onMapEvent() method above), the Annotations plugin is used to
     * draw an invisible clickable line over the line layer. Sadly, the Annotations
     * plugin does not support all the nice styling options of the line Layer so we're
     * pushed into this compromise of drawing two lines, one for it's styling and the
     * other for it's click handling.
     *
     * @param {object} style - a style following the Mapbox style specification.
     * @param {any} nativeMapView - native map view (com.mapbox.mapboxsdk.maps.MapView)
     *
     * @return {Promise<void>}
     *
     * @see addLineAnnotation()
     * @see onMapEvent()
     *
     * @link https://docs.mapbox.com/mapbox-gl-js/style-spec/#layers
     * @link https://docs.mapbox.com/android/api/map-sdk/7.1.2/com/mapbox/mapboxsdk/maps/Style.html#addSource-com.mapbox.mapboxsdk.style.sources.Source-
     * @link https://docs.nativescript.org/core-concepts/android-runtime/marshalling/java-to-js#array-of-primitive-types
     */

    private addLineLayer(style, nativeMapViewInstance?): Promise<void> {
        return new Promise((resolve, reject) => {
            try {
                const theMap: MGLMapView = nativeMapViewInstance || this._mapboxViewInstance;

                if (style.type !== 'line') {
                    reject('Non line style passed to addLineLayer()');
                }

                // the source may be of type geojson or it may be the id of a source added by addSource().

                let sourceId = null;

                if (typeof style.source != 'string') {
                    sourceId = style.id + '_source';
                    this.addSource(sourceId, style.source);
                } else {
                    sourceId = style.source;
                }

                const layer = MGLLineStyleLayer.alloc().initWithIdentifierSource(style.id, theMap.style.sourceWithIdentifier(sourceId));

                // color

                let color = 'black';

                if (style.paint && style.paint['line-color']) {
                    color = style.paint['line-color'];
                }

                layer.lineColor = NSExpression.expressionForConstantValue(new Color(color).ios);

                if (Trace.isEnabled()) {
                    CLog(CLogTypes.info, 'Mapbox:addLineLayer(): after line color');
                }

                // line width

                let width = 5;

                if (style.paint && style.paint['line-width']) {
                    width = style.paint['line-width'];
                }

                layer.lineWidth = NSExpression.expressionForConstantValue(width);

                if (Trace.isEnabled()) {
                    CLog(CLogTypes.info, 'Mapbox:addLineLayer(): after line width');
                }

                let opacity = 1;

                if (style.paint && style.paint['line-opacity']) {
                    opacity = style.paint['line-opacity'];
                }

                layer.lineOpacity = NSExpression.expressionForConstantValue(opacity);

                if (Trace.isEnabled()) {
                    CLog(CLogTypes.info, 'Mapbox:addLineLayer(): after opacity');
                }

                // line dash array

                if (style.paint && style.paint['line-dash-array']) {
                    const dashArray = [];

                    for (let i = 0; i < style.paint['line-dash-array'].length; i++) {
                        dashArray[i] = NSExpression.expressionForConstantValue(style.paint['line-dash-array'][i]);
                    }

                    layer.lineDashPattern = NSExpression.expressionForConstantValue(dashArray);
                }

                theMap.style.addLayer(layer);

                if (Trace.isEnabled()) {
                    CLog(CLogTypes.info, 'Mapbox:addLineLayer(): after adding layer.');
                }

                const lineEntry = this.lines.find((entry) => entry.id === sourceId);

                if (lineEntry) {
                    lineEntry.layer = layer;
                }

                if (Trace.isEnabled()) {
                    CLog(CLogTypes.info, 'Mapbox:addLineLayer(): pushed line:', this.lines[this.lines.length - 1]);
                }

                resolve();
            } catch (ex) {
                if (Trace.isEnabled()) {
                    CLog(CLogTypes.info, 'Mapbox:addLineLayer() Error : ' + ex);
                }
                reject(ex);
            }
        }); // end of Promise()
    } // end of addLineLayer

    // -------------------------------------------------------------------------------------

    /**
     * Add a point to a line
     *
     * This method appends a point to a line and is useful for drawing a users track.
     *
     * The process for adding a point to a line is different in the iOS sdk than in
     * the Android java sdk.
     *
     * @param {id} id - id of line to add a point to.
     * @param {array} lnglat - [lng,lat] to append to the line.
     *
     * @link https://github.com/mapbox/mapbox-gl-native/issues/13983
     * @link https://docs.mapbox.com/ios/maps/examples/runtime-animate-line/
     *
     * @todo this does not update the invisible clickable overlay.
     */

    public addLinePoint(id: string, lnglat, nativeMapView?): Promise<void> {
        return new Promise((resolve, reject) => {
            try {
                // The original thought was to query the source to get the points that make up the line
                // and then add a point to it. Unfortunately, it seems that the points in the source
                // are modified and do not match the original set of points that make up the map. I kept
                // adding a LineString and after querying it it would be returned as a MultiLineString
                // with more points.
                //
                // As a result of this, we keep the original feature in the lines list and use that
                // as the data source for the line. As each point is added, we append it to the
                // feature and reset the json source for the displayed line.

                const lineEntry = this.lines.find((entry) => entry.id === id);

                if (!lineEntry) {
                    reject("No such line layer '" + id + "'");
                    return;
                }

                // we carry a pointer to the raw buffer of CLLocationCoordinate2D structures.
                // since we are managing the buffer ourselves we need to allocate space for
                // the new location entry.
                //
                // I originally tried realloc here but as soon as I try to add an entry an exception is thrown
                // indicating it's a read only property; hence the alloc, copy, and free here.

                const bytes = lineEntry.numCoords * 2 * interop.sizeof(interop.types.double);

                const buffer = malloc(bytes + 2 * interop.sizeof(interop.types.double));
                const newCoordsArray = new interop.Reference(CLLocationCoordinate2D, buffer);

                for (let i = 0; i < lineEntry.numCoords; i++) {
                    newCoordsArray[i] = lineEntry.clCoordsArray[i];
                }

                lineEntry.numCoords++;

                newCoordsArray[lineEntry.numCoords - 1] = CLLocationCoordinate2DMake(lnglat[1], lnglat[0]);

                free(lineEntry.clCoordsArray);

                const polyline = MGLPolylineFeature.polylineWithCoordinatesCount(new interop.Reference(CLLocationCoordinate2D, newCoordsArray), lineEntry.numCoords);

                lineEntry.clCoordsArray = newCoordsArray;

                // now update the source

                lineEntry.source.shape = polyline;

                resolve();
            } catch (ex) {
                if (Trace.isEnabled()) {
                    CLog(CLogTypes.info, 'Mapbox:addLinePoint() Error : ' + ex);
                }
                reject(ex);
            }
        });
    } // end of addLinePoint()

    // -------------------------------------------------------------------------------------

    /**
     * add a circle Layer
     *
     * Draw a circle based on a Mapbox style.
     *
     * Mapbox Native Android layers do not support click handlers. Unfortunately, we cannot use
     * the same Annotations approach that we do for lines to get a click handler because
     * circles drawn by the Annotations plugin do not support stops so there's no making them
     * smaller as we zoom out. Instead, we have our own click handler (see handleClickEvent() above)
     * to determine when a click has occured inside a circle.
     *
     * In order to support the click handler an additional circle-radius property, in meters, must
     * be included.
     *
     * {
     *  "id": someid,
     *  "type": 'circle',
     *  "radius-meters": 500,   // FIXME: radius in meters used for in-circle click detection.
     *  "source": {
     *    "type": 'geojson',
     *    "data": {
     *      "type": "Feature",
     *      "geometry": {
     *        "type": "Point",
     *        "coordinates": [ lng, lat ]
     *      }
     *    }
     *  },
     *  "paint": {
     *    "circle-radius": {
     *      "stops": [
     *        [0, 0],
     *        [20, 8000 ]
     *      ],
     *      "base": 2
     *    },
     *    'circle-opacity': 0.05,
     *    'circle-color': '#ed6498',
     *    'circle-stroke-width': 2,
     *    'circle-stroke-color': '#ed6498'
     *  }
     *
     * @param {object} style a Mapbox style describing the circle draw.
     * @param {object} nativeMap view.
     *
     * @link https://github.com/NativeScript/NativeScript/issues/6971
     * @link https://stackoverflow.com/questions/54890753/how-to-call-objective-c-nsexpression-format-from-nativescript/54913932#54913932
     */

    private addCircleLayer(style, nativeMapViewInstance?): Promise<void> {
        return new Promise((resolve, reject) => {
            try {
                const theMap: MGLMapView = nativeMapViewInstance || this._mapboxViewInstance;

                if (style.type !== 'circle') {
                    reject('Non circle style passed to addCircleLayer()');
                }

                // the source may be of type geojson, vector,  or it may be the id of a source added by addSource().

                let sourceId = null;

                if (typeof style.source != 'string') {
                    sourceId = style.id + '_source';

                    this.addSource(sourceId, style.source);
                } else {
                    sourceId = style.source;
                }

                if (Trace.isEnabled()) {
                    CLog(CLogTypes.info, 'Mapbox:addCircleLayer(): after adding source');
                }

                const layer = MGLCircleStyleLayer.alloc().initWithIdentifierSource(style.id, theMap.style.sourceWithIdentifier(sourceId));

                // color

                let color = 'black';

                if (style.paint && style.paint['circle-color']) {
                    color = style.paint['circle-color'];
                }

                layer.circleColor = NSExpression.expressionForConstantValue(new Color(color).ios);

                if (Trace.isEnabled()) {
                    CLog(CLogTypes.info, 'Mapbox:addCircleLayer(): after circle color');
                }

                // stroke color

                let strokeColor = 'black';

                if (style.paint && style.paint['circle-stroke-color']) {
                    strokeColor = style.paint['circle-stroke-color'];
                }

                layer.circleStrokeColor = NSExpression.expressionForConstantValue(new Color(strokeColor).ios);

                // stroke width

                let width = 5;

                if (style.paint && style.paint['circle-stroke-width']) {
                    width = style.paint['circle-stroke-width'];
                }

                layer.circleStrokeWidth = NSExpression.expressionForConstantValue(width);

                if (Trace.isEnabled()) {
                    CLog(CLogTypes.info, 'Mapbox:addCircleLayer(): after stroke width');
                }

                let opacity = 1;

                if (style.paint && style.paint['circle-opacity']) {
                    opacity = style.paint['circe-opacity'];
                }

                layer.circleOpacity = NSExpression.expressionForConstantValue(opacity);

                if (Trace.isEnabled()) {
                    CLog(CLogTypes.info, 'Mapbox:addCircleLayer(): after opacity');
                }

                // we have two options for a radius. We might have a fixed float or an expression

                const radius = 15;

                if (style.paint && typeof style.paint['circle-radius'] == 'number') {
                    layer.circleRadius = NSExpression.expressionForConstantValue(style.paint['circle-radius']);
                } else {
                    if (!style.paint['circle-radius'].stops) {
                        reject('No radius or stops provided to addCircleLayer.');
                        return;
                    }

                    // for the moment we assume we have a set of stops and a base.

                    const stopKeys = [];
                    const stopValues = [];

                    if (Trace.isEnabled()) {
                        CLog(CLogTypes.info, "Mapbox:addCircleLayer(): adding '" + style.paint['circle-radius'].stops.length + "' stops");
                    }

                    // this took forever to figure out. There is some NativeScript bug and the type definition for
                    // NSExpression is not clear. We have to create an NSDictionary with two arrays. The first array is the
                    // values and the second one is the keys. They have to be in ascending order. Once an NSDictionary is created
                    // we have to create an NSArray with that.

                    for (let i = 0; i < style.paint['circle-radius'].stops.length; i++) {
                        stopKeys[i] = style.paint['circle-radius'].stops[i][0];
                        stopValues[i] = style.paint['circle-radius'].stops[i][1];
                    }

                    let base = 2;

                    if (style.paint['circle-radius'].stops.base) {
                        base = style.paint['circle-radius'].stops.base;
                    }

                    if (Trace.isEnabled()) {
                        CLog(CLogTypes.info, 'Mapbox:addCircleLayer(): pushing circleRadius with base:', base);
                    }

                    const nsDict = new (NSDictionary as any)(stopValues, stopKeys);

                    const nsArray = NSArray.arrayWithArray([nsDict]);

                    layer.circleRadius = NSExpression.expressionWithFormatArgumentArray("mgl_interpolate:withCurveType:parameters:stops:( $zoomLevel, 'exponential', 2, %@)", nsArray);

                    if (Trace.isEnabled()) {
                        CLog(CLogTypes.info, 'Mapbox:addCircleLayer(): after setting circle radius expression');
                    }
                }

                theMap.style.addLayer(layer);

                const circleEntry = this.circles.find((entry) => entry.id === sourceId);

                if (circleEntry) {
                    circleEntry.radius = style['circle-radius'];
                    circleEntry.layer = layer;
                }

                resolve();
            } catch (ex) {
                if (Trace.isEnabled()) {
                    CLog(CLogTypes.info, 'Mapbox:addCircleLayer() Error : ' + ex);
                }
                reject(ex);
            }
        }); // end of Promise()
    } // end of addCircleLayer()

    // ---------------------------------------------------------------------

    addGeoJsonClustered(options: AddGeoJsonClusteredOptions, nativeMapViewInstance?): Promise<void> {
        throw new Error('Method not implemented.');
        // return new Promise((resolve, reject) => {
        //     const theMap: MGLMapView = nativeMapViewInstance || this._mapboxViewInstance;
        //     try {
        //         const source = MGLShapeSource.alloc().initWithIdentifierURLOptions(options.name, NSURL.URLWithString(options.data), null);
        //         theMap.style.addSource(source);

        //         const layers = [];
        //         if (options.clusters) {
        //             for (let i = 0; i < options.clusters.length; i++) {
        //                 // TODO also allow Color object
        //                 layers.push([options.clusters[i].points, new Color(options.clusters[i].color).ios]);
        //             }
        //         } else {
        //             layers.push([150, new Color('red').ios]);
        //             layers.push([20, new Color('green').ios]);
        //             layers.push([0, new Color('blue').ios]);
        //         }

        //         const unclustered = MGLCircleStyleLayer.alloc().initWithIdentifierSource(options.name, source);
        //         unclustered.circleColor = NSExpression.expressionWithFormatArgumentArray('%@', new Color('red').ios);
        //         unclustered.circleRadius = NSExpression.expressionWithFormatArgumentArray('16', null);
        //         unclustered.circleBlur = NSExpression.expressionWithFormatArgumentArray('0.2', null);
        //         // unclustered.setFilter(com.mapbox.mapboxsdk.style.expressions.Expression.neq(com.mapbox.mapboxsdk.style.expressions.Expression.get('cluster'), true));
        //         // theMap.style.addLayer(unclustered); // , "building");

        //         for (let i = 0; i < layers.length; i++) {
        //             // Add some nice circles
        //             const circles = MGLCircleStyleLayer.alloc().initWithIdentifierSource(options.name, source);
        //             const circles = new com.mapbox.mapboxsdk.style.layers.CircleLayer('cluster-' + i, options.name);
        //         //     circles.setProperties([
        //         //         // com.mapbox.mapboxsdk.style.layers.PropertyFactory.iconImage("icon")
        //         //         com.mapbox.mapboxsdk.style.layers.PropertyFactory.circleColor(layers[i][1]),
        //         //         com.mapbox.mapboxsdk.style.layers.PropertyFactory.circleRadius(new java.lang.Float(22.0)),
        //         //         com.mapbox.mapboxsdk.style.layers.PropertyFactory.circleBlur(new java.lang.Float(0.2)),
        //         //     ]);

        //         //     const pointCount = com.mapbox.mapboxsdk.style.expressions.Expression.toNumber(com.mapbox.mapboxsdk.style.expressions.Expression.get('point_count'));
        //         //     if (i === 0) {
        //         //         circles.setFilter(
        //         //             com.mapbox.mapboxsdk.style.expressions.Expression.gte(pointCount, com.mapbox.mapboxsdk.style.expressions.Expression.literal(java.lang.Integer.valueOf(layers[i][0])))
        //         //         );
        //         //     } else {
        //         //         circles.setFilter(
        //         //             com.mapbox.mapboxsdk.style.expressions.Expression.all([
        //         //                 com.mapbox.mapboxsdk.style.expressions.Expression.gte(pointCount, com.mapbox.mapboxsdk.style.expressions.Expression.literal(java.lang.Integer.valueOf(layers[i][0]))),
        //         //                 com.mapbox.mapboxsdk.style.expressions.Expression.lt(
        //         //                     pointCount,
        //         //                     com.mapbox.mapboxsdk.style.expressions.Expression.literal(java.lang.Integer.valueOf(layers[i - 1][0]))
        //         //                 ),
        //         //             ])
        //         //         );
        //         //     }

        //         //     this._mapboxMapInstance.getStyle().addLayer(circles); // , "building");
        //         }

        //         // // Add the count labels (note that this doesn't show.. #sad)
        //         // const count = new com.mapbox.mapboxsdk.style.layers.SymbolLayer('count', options.name);
        //         // count.setProperties([
        //         //     com.mapbox.mapboxsdk.style.layers.PropertyFactory.textField(com.mapbox.mapboxsdk.style.expressions.Expression.get('point_count')),
        //         //     com.mapbox.mapboxsdk.style.layers.PropertyFactory.textSize(new java.lang.Float(12.0)),
        //         //     com.mapbox.mapboxsdk.style.layers.PropertyFactory.textColor(new Color('white').android),
        //         // ]);
        //         // this._mapboxMapInstance.getStyle().addLayer(count);

        //         resolve();
        //     } catch (ex) {
        //         if (Trace.isEnabled()) {
        //             CLog(CLogTypes.info, 'Error in mapbox.addGeoJsonClustered: ' + ex);
        //         }
        //         reject(ex);
        //     }
        // });
    }

    /**
*
* @todo CHECK THIS

  addLayer(options: AddLayerOptions, nativeMap?): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        const { id, source, sourceLayer, type } = options;
        let theMap: MGLMapView = nativeMap || this._mapboxViewInstance;
        let layer;

        if (!theMap) {
          reject("No map has been loaded");
          return;
        }

        if (theMap.style.layerWithIdentifier(id)) {
          reject("Layer exists: " + id);
          return;
        }

        switch (type) {
          case "circle":
            const circleColor = !options.circleColor ? UIColor.blackColor : (options.circleColor instanceof Color ? options.circleColor.ios : new Color(options.circleColor).ios);
            const circleOpacity = options.circleOpacity === undefined ? 1 : options.circleOpacity;
            const circleRadius = options.circleRadius || 5;
            const circleStrokeColor = !options.circleStrokeColor ? UIColor.blackColor : (options.circleStrokeColor instanceof Color ? options.circleStrokeColor.ios : new Color(options.circleStrokeColor).ios);
            const circleStrokeWidth = options.circleStrokeWidth === undefined ? 2 : options.circleStrokeWidth;

            layer = MGLCircleStyleLayer.alloc().initWithIdentifierSource(id, theMap.style.sourceWithIdentifier(source));
            layer.sourceLayerIdentifier = sourceLayer;

            layer.circleColor = NSExpression.expressionForConstantValue(circleColor);
            layer.circleOpacity = NSExpression.expressionForConstantValue(circleOpacity);
            layer.circleRadius = NSExpression.expressionForConstantValue(circleRadius);
            layer.circleStrokeColor = NSExpression.expressionForConstantValue(circleStrokeColor);
            layer.circleStrokeWidth = NSExpression.expressionForConstantValue(circleStrokeWidth);
            break;
          case "fill":
            const fillColor = !options.fillColor ? UIColor.blackColor : (options.fillColor instanceof Color ? options.fillColor.ios : new Color(options.fillColor).ios);
            const fillOpacity = options.fillOpacity === undefined ? 1 : options.fillOpacity;

            layer = MGLFillStyleLayer.alloc().initWithIdentifierSource(id, theMap.style.sourceWithIdentifier(source));
            layer.sourceLayerIdentifier = sourceLayer;

            layer.fillColor = NSExpression.expressionForConstantValue(fillColor);
            layer.fillOpacity = NSExpression.expressionForConstantValue(fillOpacity);
            break;
          case "line":
            const lineCap = options.lineCap === undefined ? 'round' : options.lineCap;
            const lineJoin = options.lineJoin === undefined ? 'round' : options.lineJoin;

            const lineColor = options.lineColor === undefined ? UIColor.blackColor : (options.lineColor instanceof Color ? options.lineColor.ios : new Color(options.lineColor).ios);
            const lineOpacity = options.lineOpacity === undefined ? 1 : options.lineOpacity;
            const lineWidth = options.lineWidth === undefined ? 2 : options.lineWidth;

            layer = MGLLineStyleLayer.alloc().initWithIdentifierSource(id, theMap.style.sourceWithIdentifier(source));
            layer.sourceLayerIdentifier = sourceLayer;

            layer.lineCap = NSExpression.expressionForConstantValue(lineCap);
            layer.lineJoin = NSExpression.expressionForConstantValue(lineJoin);
            layer.lineColor = NSExpression.expressionForConstantValue(lineColor);
            layer.lineOpacity = NSExpression.expressionForConstantValue(lineOpacity);
            layer.lineWidth = NSExpression.expressionForConstantValue(lineWidth);
            break;
          default:
            reject("Invalid layer type: " + options.type);
            break;
        }

        if (!layer) {
          const ex = "No layer to add";
          if (Trace.isEnabled()) {
    CLog(CLogTypes.info, "Error in mapbox.addLayer: " + ex);
}
          reject(ex);
        }
        if (Trace.isEnabled()) {
    CLog(CLogTypes.info, 'adding the layer!');
}
        console.log(layer);
        theMap.style.addLayer(layer);
        resolve();
      } catch (ex) {
        if (Trace.isEnabled()) {
    CLog(CLogTypes.info, "Error in mapbox.addLayer: " + ex);
}
        reject(ex);
      }
    });
  }

  removeLayer(id: string, nativeMap?): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        let theMap: MGLMapView = nativeMap || this._mapboxViewInstance;

        if (!theMap) {
          reject("No map has been loaded");
          return;
        }

        const layer = theMap.style.layerWithIdentifier(id);
        if (!layer) {
          reject("Layer does not exist");
          return;
        }

        theMap.style.removeLayer(layer);
        resolve();
      } catch (ex) {
        if (Trace.isEnabled()) {
    CLog(CLogTypes.info, "Error in mapbox.removeLayer: " + ex);
}
        reject(ex);
      }
    });
  }
*/

    trackUser(options: TrackUserOptions, nativeMap?): Promise<void> {
        return new Promise((resolve, reject) => {
            try {
                const theMap: MGLMapView = nativeMap || this._mapboxViewInstance;

                if (!theMap) {
                    reject('No map has been loaded');
                    return;
                }

                if (!theMap.showsUserLocation) {
                    reject('The map is not currently showing the user location');
                    return;
                }

                theMap.setUserTrackingModeAnimated(_getTrackingMode(options.mode), options.animated !== false);

                resolve();
            } catch (ex) {
                if (Trace.isEnabled()) {
                    CLog(CLogTypes.info, 'Error in mapbox.trackUser: ' + ex);
                }
                reject(ex);
            }
        });
    }

    getLayer(name: string, nativeMap?: any): Promise<LayerCommon> {
        return new Promise((resolve, reject) => {
            try {
                const theMap: MGLMapView = nativeMap || this._mapboxViewInstance;

                if (!theMap) {
                    reject('No map has been loaded');
                    return;
                }

                const layer = theMap.style.layerWithIdentifier(name);

                resolve(new Layer(layer));
            } catch (ex) {
                if (Trace.isEnabled()) {
                    CLog(CLogTypes.info, 'Error in mapbox.getLayer: ' + ex);
                }
                reject(ex);
            }
        });
    }

    getLayers(nativeMap?: any): Promise<Array<LayerCommon>> {
        return new Promise((resolve, reject) => {
            try {
                const theMap: MGLMapView = nativeMap || this._mapboxViewInstance;

                if (!theMap) {
                    reject('No map has been loaded');
                    return;
                }

                const layers = theMap.style.layers;
                const result: Layer[] = [];

                for (let i = 0; i < layers.count; i++) {
                    result.push(new Layer(layers[i]));
                }

                resolve(result);
            } catch (ex) {
                if (Trace.isEnabled()) {
                    CLog(CLogTypes.info, 'Error in mapbox.getLayers: ' + ex);
                }
                reject(ex);
            }
        });
    }
}

const _addObserver = (eventName, callback) => NSNotificationCenter.defaultCenter.addObserverForNameObjectQueueUsingBlock(eventName, null, NSOperationQueue.mainQueue, callback);

function _downloadImage(marker) {
    return new Promise((resolve, reject) => {
        if (Trace.isEnabled()) {
            CLog(CLogTypes.info, '>> _downloadImage');
        }
        // to cache..
        if (_markerIconDownloadCache[marker.icon]) {
            marker.iconDownloaded = _markerIconDownloadCache[marker.icon];
            if (Trace.isEnabled()) {
                CLog(CLogTypes.info, '>> marker.iconDownloaded: ' + marker.iconDownloaded);
            }
            resolve(marker);
            return;
        }
        // ..or not to cache
        getImage(marker.icon).then(
            (output) => {
                marker.iconDownloaded = output.ios;
                _markerIconDownloadCache[marker.icon] = marker.iconDownloaded;
                resolve(marker);
            },
            (ignoredError) => {
                console.log(`Download failed for ${marker.icon} with error: ${ignoredError}`);
                resolve(marker);
            }
        );
    });

}

const _downloadMarkerImages = (markers: MapboxMarker[]) => {
    const iterations = [];
    const result = [];
    markers.forEach((marker) => {
        if (marker.icon && marker.icon.startsWith('http')) {
            const p = _downloadImage(marker).then((mark) => result.push(mark));
            iterations.push(p);
        } else {
            result.push(marker);
        }
    });

    return Promise.all(iterations).then(() => result);
};

// -------------------------------------------------------------------------------------------------

/**
 * "Delegate" for catching mapview events
 *
 * @link https://docs.nativescript.org/core-concepts/ios-runtime/how-to/ObjC-Subclassing#typescript-delegate-example
 */

@NativeClass
class MGLMapViewDelegateImpl extends NSObject implements MGLMapViewDelegate {
    public static ObjCProtocols = [MGLMapViewDelegate];

    static new() {
        return super.new() as MGLMapViewDelegateImpl;
    }

    private mapLoadedCallback: (mapView: MGLMapView) => void;
    private styleLoadedCallback: (mapView: MGLMapView) => void;

    private mapboxApi: any;

    private userLocationClickListener: (annotation: MGLAnnotation)=>void;
    private userLocationChangedListener: (location: UserLocation)=>void;
    private userLocationRenderMode: any;
    private userLocationAnnotationView: CustomUserLocationAnnotationView;

    // -----------------------

    /**
     * initialize with the mapReady callback
     */

    public initWithCallback(mapLoadedCallback: (mapView: MGLMapView) => void): MGLMapViewDelegateImpl {
        if (Trace.isEnabled()) {
            CLog(CLogTypes.info, 'MGLMapViewDelegateImpl::initWithCallback()');
        }

        this.mapLoadedCallback = mapLoadedCallback;
        return this;
    }

    // -----------------------

    /**
     * set a reference to the mapboxAPI instance
     */

    setMapboxApi(api) {
        this.mapboxApi = api;
    }

    // -----------------------

    /**
     * set the user location click listener callback
     */

    setUserLocationClickListener(callback) {
        this.userLocationClickListener = callback;
    }
    /**
     * set the user location click listener callback
     */

    setUserLocationChangedistener(callback) {
        this.userLocationChangedListener = callback;
    }

    // -----------------------

    /**
     * set user location marker modes
     */

    changeUserLocationRenderMode(userLocationRenderMode) {
        this.userLocationAnnotationView.changeUserLocationRenderMode(userLocationRenderMode);
    }

    // -----------------------

    /**
     * set style loaded callback.
     *
     * set an optional callback to be invoked when a style set with
     * setMapStyle() is finished loading
     *
     * @param {function} callback function with loaded style as parameter.
     *
     * @see Mapbox:setMapStyle()
     */

    setStyleLoadedCallback(callback) {
        this.styleLoadedCallback = callback;
    }

    // -----------------------

    /**
     * map ready callback
     */

    mapViewDidFinishLoadingMap(mapView: MGLMapView): void {
        if (Trace.isEnabled()) {
            CLog(CLogTypes.info, 'MGLMapViewDelegateImpl:mapViewDidFinishLoadingMap(): top');
        }

        if (this.mapLoadedCallback !== undefined) {
            this.mapLoadedCallback(mapView);

            // this should be fired only once, but it's also fired when the style changes, so just remove the callback

            this.mapLoadedCallback = undefined;
        }
    }

    // ------------------------

    mapViewDidFinishRenderingMapFullyRendered(mapView: MGLMapView, fullyRendered: boolean): void {
        if (Trace.isEnabled()) {
            CLog(CLogTypes.info, 'MGLMapViewDelegateImpl:mapViewDidFinishRenderingMapFullyRendered(): rendered is:', fullyRendered);
        }
    }

    // ------------------------

    /**
     * Callback when the style has been loaded.
     *
     * Based on my testing, it looks like this callback is invoked multiple times.
     *
     * @see Mapbox:setMapStyle()
     *
     * @link https://mapbox.github.io/mapbox-gl-native/macos/0.3.0/Protocols/MGLMapViewDelegate.html#/c:objc(pl)MGLMapViewDelegate(im)mapView:didFinishLoadingStyle:
     */

    mapViewDidFinishLoadingStyle(mapView: MGLMapView): void {
        if (Trace.isEnabled()) {
            CLog(CLogTypes.info, 'MGLMapViewDelegateImpl:mapViewDidFinishLoadingStyle(): callback called.');
        }

        if (this.styleLoadedCallback !== undefined) {
            this.styleLoadedCallback(mapView);

            // to avoid multiple calls. This is only invoked from setMapStyle().

            this.styleLoadedCallback = undefined;
        }
    }

    // ------------------------

    /**
     * disable the default user location callout
     *
     * This took forever to find. The default iOS click handler for the user location
     * marker is about useless. It just displays "You Are Here". The examples do not
     * show how to disable it.
     */

    mapViewAnnotationCanShowCallout(mapView: MGLMapView, annotation: MGLAnnotation): boolean {
        if (annotation.isKindOfClass(MGLUserLocation.class())) {
            return false;
        } else {
            return true;
        }
    }

    // -------------------------

    mapViewDidFailLoadingMapWithError(mapView: MGLMapView, error: NSError): void {
        if (Trace.isEnabled()) {
            CLog(CLogTypes.info, 'mapViewDidFailLoadingMapWithError: ' + error);
        }
    }

    // ---------------------------------------

    mapViewDidChangeUserTrackingModeAnimated(mapView: MGLMapView, mode: MGLUserTrackingMode, animated: boolean): void {
        if (Trace.isEnabled()) {
            CLog(CLogTypes.info, 'mapViewDidChangeUserTrackingModeAnimated: ' + mode);
        }
    }

    // ----------------------------------------

    /**
     * fired when the marker icon is about to be rendered - return null for the default icon
     */

    mapViewImageForAnnotation(mapView: MGLMapView, annotation: MGLAnnotation): MGLAnnotationImage {
        const cachedMarker = this.getTappedMarkerDetails(annotation);
        if (cachedMarker) {
            if (cachedMarker.reuseIdentifier) {
                const reusedImage = mapView.dequeueReusableAnnotationImageWithIdentifier(cachedMarker.reuseIdentifier);
                if (reusedImage) {
                    return reusedImage;
                }
            }

            // TODO try adding .rotatesToMatchCamera = true;
            // .. for instance in the mapViewDidDeselectAnnotationView / mapViewDidSelectAnnotationView / mapViewViewForAnnotation delegate

            if (cachedMarker.icon) {
                if (cachedMarker.icon.startsWith('res://')) {
                    const resourceName = cachedMarker.icon.substring('res://'.length);
                    const imageSource = ImageSource.fromResourceSync(resourceName);
                    if (imageSource === null) {
                        console.log(`Unable to locate ${resourceName}`);
                    } else {
                        cachedMarker.reuseIdentifier = cachedMarker.icon;
                        return MGLAnnotationImage.annotationImageWithImageReuseIdentifier(imageSource.ios, cachedMarker.reuseIdentifier);
                    }
                } else if (cachedMarker.icon.startsWith('http')) {
                    if (cachedMarker.iconDownloaded !== null) {
                        cachedMarker.reuseIdentifier = cachedMarker.icon;
                        return MGLAnnotationImage.annotationImageWithImageReuseIdentifier(cachedMarker.iconDownloaded, cachedMarker.reuseIdentifier);
                    }
                } else {
                    if (Trace.isEnabled()) {
                        CLog(CLogTypes.info, 'Please use res://resourceName, http(s)://imageUrl or iconPath to use a local path');
                    }
                }
            } else if (cachedMarker.iconPath) {
                const appPath = knownFolders.currentApp().path;
                const iconFullPath = appPath + '/' + cachedMarker.iconPath.replace('~/', '');
                if (File.exists(iconFullPath)) {
                    const image = ImageSource.fromFileSync(iconFullPath).ios;
                    // perhaps add resize options for nice retina rendering (although you can now use the 'icon' param instead)
                    cachedMarker.reuseIdentifier = cachedMarker.iconPath;
                    return MGLAnnotationImage.annotationImageWithImageReuseIdentifier(image, cachedMarker.reuseIdentifier);
                }
            }
        }
        return null;
    }

    // ---------------------------------------------

    /**
     * fired when one of the callout's accessoryviews is tapped (not currently used)
     */

    mapViewAnnotationCalloutAccessoryControlTapped(mapView: MGLMapView, annotation: MGLAnnotation, control: UIControl): void {}

    // --------------------------------------------

    /**
     * fired when a marker is tapped
     */

    mapViewDidSelectAnnotation(mapView: MGLMapView, annotation: MGLAnnotation): void {
        if (Trace.isEnabled()) {
            CLog(CLogTypes.info, 'MGLMapViewDelegateImpl::mapViewDidSelectAnntation()');
        }

        if (annotation.isKindOfClass(MGLUserLocation.class())) {
            if (Trace.isEnabled()) {
                CLog(CLogTypes.info, 'MGLMapViewDelegateImpl::mapViewDidSelectAnnotation(): tapped the user location button');
            }

            if (typeof this.userLocationClickListener != 'undefined') {
                this.userLocationClickListener(annotation);
                return;
            }

            mapView.deselectAnnotationAnimated(annotation, false);
        }

        const cachedMarker = this.getTappedMarkerDetails(annotation);
        if (cachedMarker && cachedMarker.onTap) {
            cachedMarker.onTap(cachedMarker);
        }
    }

    // ----------------------------------------------------------------------------------

    /**
     * fired when a callout is tapped
     */

    mapViewTapOnCalloutForAnnotation(mapView: MGLMapView, annotation: MGLAnnotation): void {
        const cachedMarker = this.getTappedMarkerDetails(annotation);
        if (cachedMarker && cachedMarker.onCalloutTap) {
            cachedMarker.onCalloutTap(cachedMarker);
        }
    }

    // -----------------------------------------------------------------------------------

    private getTappedMarkerDetails(tapped): any {
        for (const m in _markers) {
            const cached = _markers[m];
            // don't compare lat/lng types as they're not the same (same for (sub)title, they may be null vs undefined)
            if (
                // eslint-disable-next-line eqeqeq
                cached.lat == tapped.coordinate.latitude &&
                // eslint-disable-next-line eqeqeq
                cached.lng == tapped.coordinate.longitude &&
                // eslint-disable-next-line eqeqeq
                cached.title == tapped.title &&
                // eslint-disable-next-line eqeqeq
                cached.subtitle == tapped.subtitle
            ) {
                return cached;
            }
        }
    }

    // ------------------------------------------------------------------------------------

    /**
     * override the standard location marker
     */

    mapViewViewForAnnotation(mapView: MGLMapView, annotation: MGLAnnotation): MGLAnnotationView {
        if (Trace.isEnabled()) {
            CLog(CLogTypes.info, 'MGLMapViewDelegateImpl::mapViewViewForAnnotation() top');
        }

        if (annotation.isKindOfClass(MGLUserLocation.class())) {
            this.userLocationAnnotationView = CustomUserLocationAnnotationView.alloc().init() as CustomUserLocationAnnotationView;

            return this.userLocationAnnotationView;
        }

        return null;
    }

    mapViewDidUpdateUserLocation(mapView: MGLMapView, userLocation: MGLUserLocation) {
        if (Trace.isEnabled()) {
            CLog(CLogTypes.info, 'MGLMapViewDelegateImpl::mapViewDidUpdateUserLocation() top');
        }
        if (this.userLocationChangedListener) {
            this.userLocationChangedListener(_getLocation(userLocation));
        }

    }
} // end of MGLMapViewDelegateImpl

// --------------------------------------------------------------------------------------

@NativeClass
class MapTapHandlerImpl extends NSObject {
    private _owner: WeakRef<Mapbox>;
    private _listener: (data: LatLng) => void;
    private _mapView: MGLMapView;

    public static initWithOwnerAndListenerForMap(owner: WeakRef<Mapbox>, listener: (data: LatLng) => void, mapView: MGLMapView): MapTapHandlerImpl {
        const handler = MapTapHandlerImpl.new() as MapTapHandlerImpl;
        handler._owner = owner;
        handler._listener = listener;
        handler._mapView = mapView;
        return handler;
    }

    public tap(recognizer: UITapGestureRecognizer): void {
        const tapPoint = recognizer.locationInView(this._mapView);

        const tapCoordinate = this._mapView.convertPointToCoordinateFromView(tapPoint, this._mapView);
        this._listener({
            lat: tapCoordinate.latitude,
            lng: tapCoordinate.longitude,
        });
    }

    public static ObjCExposedMethods = {
        tap: { returns: interop.types.void, params: [interop.types.id] },
    };
}

@NativeClass
class MapLongPressHandlerImpl extends NSObject {
    private _owner: WeakRef<Mapbox>;
    private _listener: (data?: LatLng) => void;
    private _mapView: MGLMapView;

    public static initWithOwnerAndListenerForMap(owner: WeakRef<Mapbox>, listener: (data?: LatLng) => void, mapView: MGLMapView): MapLongPressHandlerImpl {
        const handler = MapLongPressHandlerImpl.new() as MapLongPressHandlerImpl;
        handler._owner = owner;
        handler._listener = listener;
        handler._mapView = mapView;
        return handler;
    }

    public longPress(recognizer: UILongPressGestureRecognizer): void {
        const longPressPoint = recognizer.locationInView(this._mapView);
        const longPressCoordinate = this._mapView.convertPointToCoordinateFromView(longPressPoint, this._mapView);
        this._listener({
            lat: longPressCoordinate.latitude,
            lng: longPressCoordinate.longitude,
        });
    }

    public static ObjCExposedMethods = {
        longPress: { returns: interop.types.void, params: [interop.types.id] },
    };
}

/**
 * pan handler
 *
 * This is used by the OnScrollListener
 */

@NativeClass
class MapPanHandlerImpl extends NSObject {
    private _owner: WeakRef<Mapbox>;
    private _listener: (data?: LatLng) => void;
    private onMoveBegin: boolean;
    private _mapView: MGLMapView;

    public static initWithOwnerAndListenerForMap(owner: WeakRef<Mapbox>, listener: (data?: LatLng) => void, mapView: MGLMapView): MapPanHandlerImpl {
        const handler = MapPanHandlerImpl.new() as MapPanHandlerImpl;
        handler._owner = owner;
        handler._listener = listener;
        handler._mapView = mapView;

        handler.onMoveBegin = false;

        return handler;
    }

    public setOnMoveBegin() {
        this.onMoveBegin = true;
    }

    public pan(recognizer: UIPanGestureRecognizer): void {
        const panPoint = recognizer.locationInView(this._mapView);
        const panCoordinate = this._mapView.convertPointToCoordinateFromView(panPoint, this._mapView);

        if (Trace.isEnabled()) {
            CLog(CLogTypes.info, 'MapPanHandlerImpl::pan(): top with state:', recognizer.state);
        }

        // if this is the beginning of the pan simulate the Android onMoveBegin
        //
        // See the objc platform declarations in objc!UIKit.d.ts. It doesn't quite match the apple documention

        if (this.onMoveBegin) {
            if (recognizer.state === UIGestureRecognizerState.Began) {
                if (Trace.isEnabled()) {
                    CLog(CLogTypes.info, 'MapPanHandlerImpl::pan(): calling onMoveBegin listener');
                }

                this._listener({
                    lat: panCoordinate.latitude,
                    lng: panCoordinate.longitude,
                });
            }

            return;
        }

        this._listener({
            lat: panCoordinate.latitude,
            lng: panCoordinate.longitude,
        });
    }

    public static ObjCExposedMethods = {
        pan: { returns: interop.types.void, params: [interop.types.id] },
    };
}

/**
 * swipe handler
 *
 * Current unused
 */

@NativeClass
class MapSwipeHandlerImpl extends NSObject {
    private _owner: WeakRef<Mapbox>;
    private _listener: (data?: LatLng) => void;
    private _mapView: MGLMapView;

    public static initWithOwnerAndListenerForMap(owner: WeakRef<Mapbox>, listener: (data?: LatLng) => void, mapView: MGLMapView): MapSwipeHandlerImpl {
        const handler = MapSwipeHandlerImpl.new() as MapSwipeHandlerImpl;
        handler._owner = owner;
        handler._listener = listener;
        handler._mapView = mapView;
        return handler;
    }

    public swipe(recognizer: UISwipeGestureRecognizer): void {
        const swipePoint = recognizer.locationInView(this._mapView);
        const swipeCoordinate = this._mapView.convertPointToCoordinateFromView(swipePoint, this._mapView);
        this._listener({
            lat: swipeCoordinate.latitude,
            lng: swipeCoordinate.longitude,
        });
    }

    public static ObjCExposedMethods = {
        swipe: { returns: interop.types.void, params: [interop.types.id] },
    };
}

export class Layer implements LayerCommon {
    public id: string;
    private instance;

    constructor(instance) {
        this.instance = instance;
        this.id = instance.identifier;
    }

    visibility(): boolean {
        return this.instance.visible;
    }

    show(): void {
        this.instance.visible = true;
    }

    hide(): void {
        this.instance.visible = false;
    }

    setFilter(filter: any[]) {
        if (this.instance instanceof MGLVectorStyleLayer) {
            // MGLVectorStyleLayer is the base type of many layer types. Predicates only supported on vector style layers.
            // See https://docs.mapbox.com/ios/maps/api/6.3.0/Classes/MGLVectorStyleLayer.html

            this.instance.predicate = FilterParser.parseJson(filter);
        } else {
            throw new Error('Set filter only support for vector layer.');
        }
    }

    getFilter(): any[] {
        return FilterParser.toJson(this.instance.predicate);
    }
}
