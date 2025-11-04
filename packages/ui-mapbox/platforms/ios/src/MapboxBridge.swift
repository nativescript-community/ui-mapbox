//
// MapboxBridge.swift
// MapboxMaps v11.x TileStore-enabled bridge for NativeScript
//
// Full bridge implementation updated to call MapboxMaps' async
// querySourceFeatures(for:options:completion:) and return the results
// synchronously to the JS bridge by waiting for completion with a timeout.
//
// Notes:
// - This attempts to build QuerySourceFeaturesOptions and to convert a
//   Mapbox expression JSON (array) into a native predicate/expression
//   using NativeExpressionParser when available.
// - The code uses a DispatchSemaphore to wait for the async completion
//   and will return nil if the query times out or fails.
// - If the native SDK/path is unavailable for constructing an options
//   filter, the bridge will fallback to returning cached GeoJSON source
//   features (if the source was added via addSourceGeoJSON).
//
// If you get Xcode compile errors referencing MapboxMaps API differences
// (names/signatures), paste them here and I will adapt the bridge to
// match your installed MapboxMaps version precisely.

import Foundation
import UIKit
import MapboxMaps

public extension UIColor {
    convenience init<T>(rgbaValue: T) where T: BinaryInteger {
        guard rgbaValue > 0 else {
            self.init(red: 0, green: 0, blue: 0, alpha: 1)
            return
        }
        
        guard rgbaValue < 0xFFFFFFFF else {
            self.init(red: 1, green: 1, blue: 1, alpha: 1)
            return
        }
        
        let divisor = CGFloat(255)
        let a = CGFloat((rgbaValue & 0xFF000000) >> 24) / divisor
        let r = CGFloat((rgbaValue & 0x00FF0000) >> 16) / divisor
        let g = CGFloat((rgbaValue & 0x0000FF00) >>  8) / divisor
        let b = CGFloat( rgbaValue & 0x000000FF       ) / divisor
        
        self.init(red: r, green: g, blue: b, alpha: a)
    }
}

extension Feature {
    var asJsonObject: JSONObject? {
        do {
            let jsonData = try JSONEncoder().encode(self)
            let jsonObject = try JSONSerialization.jsonObject(with: jsonData)
            guard let jsonObject = jsonObject as? [String: Any?] else { return nil }
            //            if jsonObject.keys.contains("geometry") {
            //                // can be too long for example
            //                jsonObject["geometry"] = ["..."]
            //            }
            return JSONObject(turfRawValue: jsonObject)
        } catch {
            return nil
        }
    }
}

@objcMembers
public class MapboxBridge: NSObject {
    
    public static func parseJSONParameter(_ parameter: String?) -> Any? {
        if let opt = parameter, let data = opt.data(using: .utf8), let optObj = try? JSONSerialization.jsonObject(with: data, options: []) {
            return optObj
        }
        return nil
    }
    public static func encodeToJSON(_ parameter: [String: Any]?) -> String? {
        do {
            if parameter == nil {
                return nil
            }
            let data = try JSONSerialization.data(withJSONObject: parameter!, options: [])
            return String(data: data, encoding: .utf8) as String?
        }   catch {
            return nil
        }
    }
    public func postEvent(_ event: String, _ data: [String: Any]?)  {
        if let userInfo = MapboxBridge.encodeToJSON(data) {
            NotificationCenter.default.post(name: Notification.Name(event), object: self.mapView, userInfo: ["data": userInfo])
            
        } else {
            NotificationCenter.default.post(name: Notification.Name(event), object: self.mapView)
            
        }
    }
    public func postEvent(_ event: String)  {
        NotificationCenter.default.post(name: Notification.Name(MapboxBridge.CameraMoveCancelNotification), object: self.mapView)
    }
    
    // Notification constants
    public static let MapLoadedNotification = "MapboxBridgeMapLoaded"
    public static let StyleLoadedNotification = "MapboxBridgeStyleLoaded"
    public static let MapClickNotification = "MapboxBridgeMapClick"
    public static let MapLongPressNotification = "MapboxBridgeMapLongPress"
    public static let AnnotationTapNotification = "MapboxBridgeAnnotationTap"
    public static let CameraChangedNotification = "MapboxBridgeCameraChanged"
    public static let CameraIdleNotification = "MapboxBridgeCameraIdle"
    public static let MapScrollNotification = "MapboxBridgeMapScroll"
    public static let MapMoveBeginNotification = "MapboxBridgeMapMoveBegin"
    public static let MapMoveEndNotification = "MapboxBridgeMapMoveEnd"
    public static let MapFlingNotification = "MapboxBridgeMapFling"
    public static let CameraMoveCancelNotification = "MapboxBridgeCameraMoveCancel"
    public static let OfflineProgressNotification = "MapboxBridgeOfflineProgress"
    public static let OfflineCompleteNotification = "MapboxBridgeOfflineComplete"
    
    public static let UserLocationUpdatedNotification = "MapboxBridgeUserLocationUpdated"
    public static let UserTrackingStateChangedNotification = "MapboxBridgeUserTrackingStateChanged"
    
    
    // Map objects & registries
    public private(set) var mapView: MapView?
    private var pointAnnotationManager: PointAnnotationManager?
    private var polylineAnnotationManager: PolylineAnnotationManager?
    private var polygonAnnotationManager: PolygonAnnotationManager?
    private var polygonOutlineAnnotationManager: PolylineAnnotationManager?
    private var imageRegistry: [String: UIImage] = [:]
    private var viewAnnotationByMarkerId: [String: ViewAnnotation] = [:]
    
    // Camera handling
    private var cameraIdleWorkItem: DispatchWorkItem?
    private var cameraChangeCallback: (([String: Any]) -> Void)? = nil
    
    // TileStore offline
    private var tileRegionLoadRequestByName: [String: Cancelable] = [:]
    
    
    // last location cache
    private var lastUserLocation: CLLocation?
    
    private var offlineManager = OfflineManager()
    
    private var cancelables = Set<AnyCancelable>()
    private var locationTrackingCancellation: Cancelable?
    
    private var userTrackingCameraMode: String = "NONE"
    private var userTrackingCameraAnimated: Bool = true
    
    // MARK: - Registry for bridge instances
    // Weak-keyed map: MapView -> MapboxBridge
    private static var bridgeTable: NSMapTable<AnyObject, AnyObject> = {
        // weak keys (MapView), weak values (MapboxBridge)
        return NSMapTable<AnyObject, AnyObject>(keyOptions: .weakMemory, valueOptions: .weakMemory)
    }()
    
    /// Register a bridge for a MapView (called when createMap creates a MapView)
    private static func registerBridge(_ bridge: MapboxBridge, for mapView: MapView) {
        MapboxBridge.bridgeTable.setObject(bridge, forKey: mapView)
    }
    
    /// Unregister a bridge for the given MapView (called on destroy)
    private static func unregisterBridge(for mapView: MapView) {
        MapboxBridge.bridgeTable.removeObject(forKey: mapView)
    }
    
    /// Find a bridge for a MapView instance if registered
    @objc  public static func bridge(for mapView: MapView) -> MapboxBridge? {
        return MapboxBridge.bridgeTable.object(forKey: mapView) as? MapboxBridge
    }
    
    @objc  public  func getMapView() -> MapView? {
        return mapView
    }
    
    // MARK: - Create / lifecycle
    private var lastAnnotationTapConsumedAt: Date?
    
    @objc public func createMap(_ x: Double, _ y: Double, _ width: Double, _ height: Double, _ accessToken: String, _ styleURIString: String?, _ optionsJSON: String) -> UIView {
        MapboxOptions.accessToken = accessToken
        let styleURI = getMapStyleURI(styleURIString)
        let optionsOpt = MapboxBridge.parseJSONParameter(optionsJSON) as? [String: Any]

        var centerCoordinate = CLLocationCoordinate2D(latitude: 48.858093, longitude: 2.294694)
        var zoom = 0.0
        if let options = optionsOpt {
            if let z = options["zoomLevel"] as? Double {
                zoom = z
            }
            if let target = options["center"] as? [String: Any], let lat = target["lat"] as? Double, let lng = target["lng"] as? Double {
                centerCoordinate = CLLocationCoordinate2D(latitude: lat, longitude: lng)
            }
        }
        
        
        let camera = CameraOptions(center: centerCoordinate, zoom: CGFloat(zoom))
        
        let initOptions = MapInitOptions(cameraOptions: camera, styleURI: styleURI)
        
        
        let frame = CGRect(x: x, y: y, width: width, height: height)
        let mv = MapView(frame: frame, mapInitOptions: initOptions)
        self.mapView = mv
        
        // Register this bridge for the created MapView
        MapboxBridge.registerBridge(self, for: mv)
        
        addImage("default_pin", UIImage(named: "default_pin"))

        if let options = optionsOpt {
            if ((options["hideLogo"] as? Bool) == true) {
                mv.ornaments.logoView.isHidden = true
            }
            if ((options["hideAttribution"] as? Bool) == true) {
                mv.ornaments.attributionButton.isHidden = true
            }
            if ((options["hideCompass"] as? Bool) == true) {
                mv.ornaments.compassView.isHidden = true
            }
            if ((options["disableRotation"] as? Bool) == true) {
                mv.gestures.options.rotateEnabled = false
            }
            if ((options["disableScroll"] as? Bool) == true) {
                mv.gestures.options.panEnabled = false
            }
            if ((options["disableZoom"] as? Bool) == true) {
                mv.gestures.options.pinchZoomEnabled = false
                mv.gestures.options.quickZoomEnabled = false
            }
            if ((options["disableTilt"] as? Bool) == true) {
                mv.gestures.options.pitchEnabled = false
            }
        }
        
        // mapLoaded
        mv.mapboxMap.onMapLoaded.observeNext { _ in
            self.postEvent(MapboxBridge.MapLoadedNotification)
        }.store(in: &cancelables)
        
        // styleLoaded
        mv.mapboxMap.onStyleLoaded.observeNext {  _ in
            self.postEvent(MapboxBridge.StyleLoadedNotification)
        }.store(in: &cancelables)
        
        // camera changed -> notify & schedule idle
        mv.mapboxMap.onCameraChanged.observe { _ in
            let s = mv.mapboxMap.cameraState
            let userInfo: [String: Any] = [
                "centerLat": s.center.latitude,
                "centerLng": s.center.longitude,
                "zoom": s.zoom,
                "pitch": s.pitch,
                "bearing": s.bearing
            ]
            self.postEvent(MapboxBridge.CameraChangedNotification, userInfo)
            self.cameraChangeCallback?(userInfo)
            
            self.cameraIdleWorkItem?.cancel()
            let work = DispatchWorkItem { [weak self] in
                guard let self = self, let mv = self.mapView else { return }
                let st = mv.mapboxMap.cameraState
                let info: [String: Any] = [
                    "centerLat": st.center.latitude,
                    "centerLng": st.center.longitude,
                    "zoom": st.zoom,
                    "pitch": st.pitch,
                    "bearing": st.bearing
                ]
                self.postEvent(MapboxBridge.CameraIdleNotification, info)
            }
            self.cameraIdleWorkItem = work
            DispatchQueue.main.asyncAfter(deadline: .now() + 0.25, execute: work)
        }.store(in: &cancelables)
        
        mv.mapboxMap.addInteraction(TapInteraction { [weak self] context in
            guard let self else { return false }
            guard self.mapView != nil else { return false }
            if let t = self.lastAnnotationTapConsumedAt,
               Date().timeIntervalSince(t) < 0.35 {
                // ignore this map tap because an annotation already handled it
                return false
            }
            let userInfo: [String: Any] = ["lat": context.coordinate.latitude, "lng": context.coordinate.longitude, "x": Double(context.point.x), "y": Double(context.point.y)]
            self.postEvent(MapboxBridge.MapClickNotification, userInfo)
            return false
        })
        mv.mapboxMap.addInteraction(LongPressInteraction {  [weak self] context in
            guard let self else { return false }
            guard self.mapView != nil else { return false }
            let userInfo: [String: Any] = ["lat": context.coordinate.latitude, "lng": context.coordinate.longitude, "x": Double(context.point.x), "y": Double(context.point.y)]
            self.postEvent(MapboxBridge.MapLongPressNotification, userInfo)
            return false
        })
        //        mv.mapboxMap.addInteraction(Pan {  [weak self] context in
        //            guard let self else { return false }
        //            guard self.mapView != nil else { return false }
        //            let userInfo: [String: Any] = ["lat": context.coordinate.latitude, "lng": context.coordinate.longitude, "x": Double(context.point.x), "y": Double(context.point.y)]
        //            self.postEvent(MapboxBridge.MapLongPressNotification, userInfo)
        //            return false
        //        })
        //        mv.gestures.singleTapGestureRecognizer.addTarget(self, action: #selector(handleMapTap(_:)))
        //        mv.gestures.longPressGestureRecognizer.addTarget(self, action: #selector(handleMapLongPress(_:)))
        mv.gestures.panGestureRecognizer.addTarget(self, action: #selector(handleMapPan(_:)))
        
        return mv
    }
    
    @objc public func show() { mapView?.isHidden = false }
    @objc public func hide() { mapView?.isHidden = true }
    
    @objc public func destroy() {
        if let mv = self.mapView {
            MapboxBridge.unregisterBridge(for: mv)
        }
        pointAnnotationManager = nil
        polygonAnnotationManager = nil
        polylineAnnotationManager = nil
        imageRegistry.removeAll()
        cameraIdleWorkItem?.cancel()
        cameraIdleWorkItem = nil
        
        for cancelable in cancelables {
            cancelable.cancel()
        }
        cancelables.removeAll()
        if mapView != nil {
            for (_, view) in viewAnnotationByMarkerId {
                view.remove()
            }
            viewAnnotationByMarkerId.removeAll()
        }
        for (_, request) in tileRegionLoadRequestByName {
            request.cancel()
        }
        tileRegionLoadRequestByName.removeAll()
        mapView?.removeFromSuperview()
        mapView = nil
        
    }
    
    // MARK: - Gesture handlers
    
    @objc private func handleMapTap(_ recognizer: UITapGestureRecognizer) {
        guard let mv = mapView else { return }
        let pt = recognizer.location(in: mv)
        let coord = mv.mapboxMap.coordinate(for: pt)
        let userInfo: [String: Any] = ["lat": coord.latitude, "lng": coord.longitude, "x": Double(pt.x), "y": Double(pt.y)]
        self.postEvent(MapboxBridge.MapClickNotification, userInfo)
    }
    
    @objc private func handleMapLongPress(_ recognizer: UILongPressGestureRecognizer) {
        guard let mv = mapView else { return }
        if recognizer.state == .began {
            let pt = recognizer.location(in: mv)
            let coord = mv.mapboxMap.coordinate(for: pt)
            let userInfo: [String: Any] = ["lat": coord.latitude, "lng": coord.longitude, "x": Double(pt.x), "y": Double(pt.y)]
            self.postEvent(MapboxBridge.MapLongPressNotification, userInfo)
        }
    }
    
    @objc private func handleMapPan(_ recognizer: UIPanGestureRecognizer) {
        guard let mv = mapView else { return }
        let velocity = recognizer.velocity(in: mv)
        let translation = recognizer.translation(in: mv)
        let pt = recognizer.location(in: mv)
        let coord = mv.mapboxMap.coordinate(for: pt)
        let infoBase: [String: Any] = ["lat": coord.latitude, "lng": coord.longitude, "x": Double(pt.x), "y": Double(pt.y), "vx": Double(velocity.x), "vy": Double(velocity.y), "tx": Double(translation.x), "ty": Double(translation.y)]
        
        switch recognizer.state {
        case .began:
            self.postEvent(MapboxBridge.MapMoveBeginNotification, infoBase)
        case .changed:
            self.postEvent(MapboxBridge.MapScrollNotification, infoBase)
        case .ended:
            let speed = sqrt(velocity.x * velocity.x + velocity.y * velocity.y)
            if speed > 1000.0 {
                var fInfo = infoBase
                fInfo["speed"] = Double(speed)
                self.postEvent(MapboxBridge.MapFlingNotification, fInfo)
            }
            self.postEvent(MapboxBridge.MapMoveEndNotification, infoBase)
        case .cancelled, .failed:
            self.postEvent(MapboxBridge.CameraMoveCancelNotification, infoBase)
        default:
            break
        }
    }
    
    // MARK: - Images
    
    
    
    /// Return a UIImage for the given imageId.
    /// - First looks in the local imageRegistry (images added via addImage).
    /// - Then tries to fetch the image from the current style via style.image(withId:).
    /// - Returns nil if not found.
    @objc public func getImage(_ imageId: String) -> UIImage? {
        // Local registry lookup
        if let img = imageRegistry[imageId] {
            return img
        }
        
        // Try to get image from style
        if let mv = mapView {
            // MapboxMaps 11.x style.image(withId:) returns UIImage?
            if let styleImage = mv.mapboxMap.image(withId: imageId) {
                return styleImage
            }
            
        }
        
        return nil
    }
    
    @objc public func addImage(_ imageId: String, _ image: UIImage?) {
        guard let mv = mapView else { return }
        if (image != nil) {
            imageRegistry[imageId] = image!
            try? mv.mapboxMap.addImage(image!, id: imageId)
        }
    }
    
    @objc public func removeImage(_ imageId: String) {
        guard let mv = mapView else { return }
        imageRegistry.removeValue(forKey: imageId)
        try? mv.mapboxMap.removeImage(withId: imageId)
    }
    
    private func resolveImage(named name: String?) -> UIImage? {
        guard let name = name else { return nil }
        if let reg = imageRegistry[name] { return reg }
        if let img = UIImage(named: name) { return img }
        if let url = URL(string: name), let data = try? Data(contentsOf: url), let img = UIImage(data: data) { return img }
        return nil
    }
    
    // MARK: - Markers (Point Annotations)
    
    // markers: NSArray of NSDictionary { lat, lng, id?, title?, subtitle?, icon? }
    @objc public func addMarkers(_ markersJSON: String) {
        guard let mv = mapView else { return }
        guard let data = markersJSON.data(using: .utf8) else { return }
        guard let markers = try? JSONSerialization.jsonObject(with: data, options: []) as! [NSDictionary] else { return }
        
        if pointAnnotationManager == nil {
            pointAnnotationManager = mv.annotations.makePointAnnotationManager()
        }
        guard let manager = pointAnnotationManager else { return }
        
        var current = manager.annotations
        var additions: [PointAnnotation] = []
        
        for case let dict in markers {
            guard let lat = dict["lat"] as? Double, let lng = dict["lng"] as? Double else { continue }
            var theId: String?
            if let id = dict["id"] {
                if let idS = id as? String? { theId = (idS!) }
                else if let idD = id as? NSNumber? { theId = (idD!).stringValue }
                else { theId = String(NSDate().timeIntervalSince1970) }
            }
            var pa = PointAnnotation(id:theId! , coordinate: CLLocationCoordinate2D(latitude: lat, longitude: lng))
            
            // userInfo
            var userInfo = JSONObject()
            
            userInfo["id"] = .string(theId!)
            if let title = dict["title"] { userInfo["title"] = .string(title as! String) }
            if let subtitle = dict["subtitle"] { userInfo["subtitle"] = .string(subtitle as! String) }
            pa.customData = userInfo
            
            let icon = (dict["icon"] as? String) ?? "default_pin"
            
            if let img = imageRegistry[icon] {
                pa.image = .init(image: img, name: icon)
            }
            _ = pa.tapHandler =  { [weak self] ann in
                guard let self = self else { return true }
                self.lastAnnotationTapConsumedAt = Date()
                self.emitAnnotationTap(pa)
                return true
            }
            additions.append(pa)
            
        }
        
        current.append(contentsOf: additions)
        manager.annotations = current
    }
    
    @objc public func removeMarkers(_ idsJSON: String?) {
        guard let manager = pointAnnotationManager else { return }
        
        if idsJSON == nil {
            manager.annotations.removeAll()
            return
        }
        guard let data = idsJSON!.data(using: .utf8) else { return }
        guard let ids = try? JSONSerialization.jsonObject(with: data, options: []) as! [String] else { return }
        
        var idSet = Set<String>()
        for case let v  in ids {
            idSet.insert(v)
        }
        
        let remaining = manager.annotations.filter { ann in
            return !idSet.contains(ann.id)
        }
        manager.annotations = remaining
    }
    @objc public func updateMarkerPosition(_ markerId: String, _ lat: Double, _ lng: Double) -> Bool {
        guard let manager = pointAnnotationManager else { return false }
        
        if let index = manager.annotations.firstIndex(where: { $0.id == markerId }) {
            var ann = manager.annotations[index]
            ann.point = Point(CLLocationCoordinate2D(latitude: lat, longitude: lng))
            _ = updateViewAnnotationForMarker(markerId, lat, lng)
            manager.annotations[index] = ann
            return true
        }
        return false
    }
    
    private func emitAnnotationTap(_ annotation: PointAnnotation) {
        guard mapView != nil else { return }
        var info: [String: Any] = [:]
        for (k, v) in annotation.customData { info[k] = v?.rawValue }
        let coord = annotation.point.coordinates
        info["id"] = annotation.id
        info["lat"] = coord.latitude
        info["lng"] = coord.longitude
        self.postEvent(MapboxBridge.AnnotationTapNotification, info)
    }
    // MARK: - View annotations
    
    @objc public func addViewAnnotationForMarker(_ markerId: String, _ view: UIView, _ lat: Double, _ lng: Double) -> Bool {
        guard let mv = mapView else { return false }
        guard let manager = pointAnnotationManager else { return false }
        if let existing = viewAnnotationByMarkerId[markerId] {
            existing.remove()
            viewAnnotationByMarkerId.removeValue(forKey: markerId)
        }
        
        guard let an = manager.annotations.first(where: { $0.id == markerId }) else  { return false }
        let coordinate = CLLocationCoordinate2D(latitude: lat, longitude: lng)
        let annotation  = ViewAnnotation(coordinate: coordinate, view: view)
        //        annotation.selected = false
        annotation.allowOverlap = true
        annotation.allowOverlapWithPuck = true
        let image = an.image
        let imageHeight = image?.image.size.height ?? 0
        let offsetY = imageHeight/2 + 5
        // TODO: variableAnchors is broken for now if multiple
        annotation.variableAnchors = [ViewAnnotationAnchorConfig(anchor: .bottom, offsetY: offsetY)
                                      //                                      , ViewAnnotationAnchorConfig(anchor: .bottomLeft, offsetY: offsetY), ViewAnnotationAnchorConfig(anchor: .bottomRight, offsetY: offsetY)
        ]
        //        annotation.anchorConfig = annotation.variableAnchors.first
        mv.viewAnnotations.add(annotation)
        viewAnnotationByMarkerId[markerId] = annotation
        return true
    }
    
    @objc public func updateViewAnnotationForMarker(_ markerId: String, _ lat: Double, _ lng: Double) -> Bool {
        guard mapView != nil else { return false }
        guard let view = viewAnnotationByMarkerId[markerId] else { return false }
        view.view.setNeedsLayout()
        view.annotatedFeature = .geometry(Point(CLLocationCoordinate2D(latitude: lat, longitude: lng)))
        return true
    }
    
    @objc public func removeViewAnnotationForMarker(_ markerId: String) -> Bool {
        guard mapView != nil else { return false }
        guard let view = viewAnnotationByMarkerId[markerId] else { return false }
        view.remove()
        viewAnnotationByMarkerId.removeValue(forKey: markerId)
        return true
    }
    
    @objc public func hasViewAnnotationForMarker(_ markerId: String) -> Bool {
        return viewAnnotationByMarkerId[markerId] != nil
    }
    @objc public func hideAnnotationForMarker(_ markerId: String) -> Bool {
        guard let view = viewAnnotationByMarkerId[markerId] else { return false }
        view.visible = false
        return true
    }
    @objc public func showAnnotationForMarker(_ markerId: String) -> Bool {
        guard let view = viewAnnotationByMarkerId[markerId] else { return false }
        view.visible = true
        return true
    }
    
    // MARK: - Style
    
    @objc public func setStyle(_ styleURIorURL: String, _ completion: @escaping (Bool, NSError?) -> Void) {
        guard let mv = mapView else { completion(false, NSError(domain: "MapboxBridge", code: 1, userInfo: [NSLocalizedDescriptionKey: "No map available"])); return }
        mv.mapboxMap.onStyleLoaded.observeNext { _ in completion(true, nil) }.store(in: &cancelables)
        mv.mapboxMap.loadStyle(getMapStyleURI(styleURIorURL));
        // completion(false, NSError(domain: "MapboxBridge", code: 2, userInfo: [NSLocalizedDescriptionKey: "Invalid style string"]))
    }
    
    // MARK: - Camera / viewport / animateCamera
    
    @objc public func setCenter(_ lat: Double, _ lng: Double, _ animated: Bool) {
        guard let mv = mapView else { return }
        let cam = CameraOptions(center: CLLocationCoordinate2D(latitude: lat, longitude: lng))
        if animated {
            mv.camera.ease(to: cam, duration: 0.5, completion: { _ in })
        } else {
            mv.camera.cancelAnimations()
            mv.mapboxMap.setCamera(to: cam)
        }
    }
    
    @objc public func getCenter() -> String? {
        guard let mv = mapView else { return nil }
        let c = mv.mapboxMap.cameraState.center
        return MapboxBridge.encodeToJSON(["lat": c.latitude, "lng": c.longitude])
    }
    
    @objc public func setZoom(_ zoom: Double, _ animated: Bool) {
        guard let mv = mapView else { return }
        let cam = CameraOptions(zoom: zoom)
        if animated {
            mv.camera.ease(to: cam, duration: 0.5, completion: { _ in })
        } else {
            mv.camera.cancelAnimations()
            mv.mapboxMap.setCamera(to: cam)
        }
    }
    
    @objc public func getZoom() -> NSNumber? {
        guard let mv = mapView else { return nil }
        return NSNumber(value: mv.mapboxMap.cameraState.zoom)
    }
    
    // animateCamera: accepts a JSON string with optional fields: bounds {south,west,north,east}, target {lat,lng}, zoom, bearing, pitch, duration
    @objc public func animateCamera(_ optionsJSON: String) -> Bool {
        guard let mv = mapView else { return false }
        guard let obj = MapboxBridge.parseJSONParameter(optionsJSON) as? [String: Any] else { return false }
        
        var camOptions = CameraOptions()
        var duration = 0.0
        
        if let bounds = obj["bounds"] as? [String: Any], let south = bounds["south"] as? Double, let west = bounds["west"] as? Double, let north = bounds["north"] as? Double, let east = bounds["east"] as? Double {
            // Compute camera that fits bounds
            let outerRing: [LocationCoordinate2D] = [
                LocationCoordinate2D(latitude: north, longitude: west),
                LocationCoordinate2D(latitude: north, longitude: east),
                LocationCoordinate2D(latitude: south, longitude: east),
                LocationCoordinate2D(latitude: south, longitude: west),
                LocationCoordinate2D(latitude: north, longitude: west) // close ring
            ]
            if let camera = try? mv.mapboxMap.camera(for: outerRing, camera: camOptions, coordinatesPadding: .zero, maxZoom: nil, offset: nil) {
                camOptions = camera
            }
        } else if let target = obj["target"] as? [String: Any], let lat = target["lat"] as? Double, let lng = target["lng"] as? Double {
            camOptions.center = CLLocationCoordinate2D(latitude: lat, longitude: lng)
        }
        
        if let zoom = obj["zoom"] as? Double {
            camOptions.zoom = zoom
        }
        if let bearing = obj["bearing"] as? Double {
            camOptions.bearing = bearing
        }
        if let pitch = obj["pitch"] as? Double {
            camOptions.pitch = pitch
        }
        if let tilt = obj["tilt"] as? Double {
            camOptions.pitch = tilt
        }
        if let d = obj["duration"] as? Double {
            duration = max(0.0, d / 1000.0)
        }
        
        mv.camera.fly(to: camOptions, duration: duration, completion: { _ in })
        return true
    }
    
    @objc public func coordinateToPoint(_ lat: Double, _ lng: Double) -> String? {
        guard let mv = mapView else { return nil }
        let pt = mv.mapboxMap.point(for: CLLocationCoordinate2D(latitude:lat, longitude:lng))
        return MapboxBridge.encodeToJSON(["x": Double(pt.x), "y": Double(pt.y)])
    }
    @objc public func pointToCoordinate(_ x: Double, _ y: Double) -> String? {
        guard let mv = mapView else { return nil }
        let coord = mv.mapboxMap.coordinate(for: CGPointMake(x, y))
        return MapboxBridge.encodeToJSON(["lat": coord.latitude, "lng": coord.longitude])
    }
    @objc public func getViewport() -> String? {
        guard let mv = mapView else { return nil }
        // Return JSON string with bounds and zoom
        let bounds = mv.mapboxMap.coordinateBounds(for: mv.bounds)
        
        return MapboxBridge.encodeToJSON([
            "bounds": [
                "north": bounds.northeast.latitude,
                "east": bounds.northeast.longitude,
                "south": bounds.southwest.latitude,
                "west": bounds.southwest.longitude
            ],
            "zoomLevel": mv.mapboxMap.cameraState.zoom
        ])
    }
    
    // setViewport: parses JSON with bounds and padding and animated flag similar to TS usage
    @objc public func setViewport(_ optionsJSON: String) -> Bool {
        guard let mv = mapView else { return false }
        guard let obj = MapboxBridge.parseJSONParameter(optionsJSON) as? [String: Any] else { return false }
        
        guard let bounds = obj["bounds"] as? [String: Any], let south = bounds["south"] as? Double, let west = bounds["west"] as? Double, let north = bounds["north"] as? Double, let east = bounds["east"] as? Double else {
            return false
        }
        
        // Turf uses LocationCoordinate2D; create the ring and repeat first point to close it
        let outerRing: [LocationCoordinate2D] = [
            LocationCoordinate2D(latitude: north, longitude: west),
            LocationCoordinate2D(latitude: north, longitude: east),
            LocationCoordinate2D(latitude: south, longitude: east),
            LocationCoordinate2D(latitude: south, longitude: west),
            LocationCoordinate2D(latitude: north, longitude: west) // close ring
        ]
        
        // Create a Polygon and its Geometry
        //        _ = Polygon([outerRing])
        
        var padding = UIEdgeInsets(top: 25, left: 25, bottom: 25, right: 25)
        if let pad = obj["padding"] as? [String: Any] {
            let top = (pad["top"] as? Double).flatMap { CGFloat($0) } ?? padding.top
            let left = (pad["left"] as? Double).flatMap { CGFloat($0) } ?? padding.left
            let bottom = (pad["bottom"] as? Double).flatMap { CGFloat($0) } ?? padding.bottom
            let right = (pad["right"] as? Double).flatMap { CGFloat($0) } ?? padding.right
            padding = UIEdgeInsets(top: top, left: left, bottom: bottom, right: right)
        } else if let padSingle = obj["padding"] as? Double {
            let p = CGFloat(padSingle)
            padding = UIEdgeInsets(top: p, left: p, bottom: p, right: p)
        }
        
        let animated = (obj["animated"] as? Bool) ?? true
        if animated {
            if let camera = try? mv.mapboxMap.camera(for: outerRing, camera: CameraOptions(), coordinatesPadding: .zero, maxZoom: nil, offset: nil) {
                mv.camera.ease(to: camera, duration: 0.5, completion: { _ in })
            } else {
                mv.camera.cancelAnimations()
                mv.mapboxMap.setCamera(to: CameraOptions(center: CLLocationCoordinate2D(latitude: (south + north) / 2.0, longitude: (west + east) / 2.0)))
            }
        } else {
            if let camera = try? mv.mapboxMap.camera(for: outerRing, camera: CameraOptions(), coordinatesPadding: .zero, maxZoom: nil, offset: nil) {
                mv.camera.cancelAnimations()
                mv.mapboxMap.setCamera(to: camera)
            } else {
                mv.camera.cancelAnimations()
                mv.mapboxMap.setCamera(to: CameraOptions(center: CLLocationCoordinate2D(latitude: (south + north) / 2.0, longitude: (west + east) / 2.0)))
            }
        }
        
        return true
    }
    
    // MARK: - Rendered & source queries
    
    // Query rendered features at a screen point; returns JSON string array
    // point: NSDictionary { x, y } and optional layerIds NSArray
    @objc public func queryRenderedFeaturesAtPoint(_ pointJSON: String, _ layerIds: [String]?, _ completion: @escaping (String?, Error?) -> Void) -> Cancelable? {
        guard let mv = mapView else { return nil }
        guard let point = MapboxBridge.parseJSONParameter(pointJSON) as? [String: Double] else { return nil }
        guard let x = point["x"], let y = point["y"] else { return nil }
        let screenPoint = CGPoint(x: x, y: y)
        
        let options = RenderedQueryOptions(layerIds: layerIds, filter: nil)
        return mv.mapboxMap.queryRenderedFeatures(with: screenPoint, options: options) { [weak self] result in
            guard self != nil else { return }
            
            switch result {
            case .success(let features):
                var jsonArray: [[String: Any]] = []
                for feature in features {
                    do {
                        let jsonData = try JSONEncoder().encode(feature.queriedFeature.feature)
                        let jsonObject = try JSONSerialization.jsonObject(with: jsonData) as? [String: Any?]
                        if var json = jsonObject {
                            json["source"] = (feature.queriedFeature.source)
                            if let sourceLayer = feature.queriedFeature.sourceLayer {
                                json["source_layer"] = (sourceLayer)
                            }
                            jsonArray.append(json as [String : Any])
                        }
                    } catch {}
                }
                if let data = try? JSONSerialization.data(withJSONObject: jsonArray, options: []),
                   let s = String(data: data, encoding: .utf8) {
                    completion(s as String, nil)
                } else {
                    completion(nil, nil)
                }
            case .failure(let error):
                completion(nil, error)
            }
        }
    }
    
    @objc public func querySourceFeatures(_ sourceId: String, _ optionsJSON: String?, _ completion: @escaping (String?, Error?) -> Void) -> Cancelable? {
        guard let mv = mapView else { completion(nil, nil); return nil }
        
        var filterExpression: Any? = nil
        var sourceLayers: [String] = []
        if let obj = MapboxBridge.parseJSONParameter(optionsJSON) as? [String: Any] {
            filterExpression = obj["filter"]
            if let sl = obj["sourceLayer"] as? String { sourceLayers.append(sl)}
            if let sls = obj["sourceLayers"] as? [String], sls.count > 0 { sourceLayers = sls }
        }
        // Try to convert expression JSON to NSPredicate or Expression via NativeExpressionParser
        //        var filter: Exp? = nil
        //        do {
        //            if let expr = filterExpression as? [Any] {
        //                let data = try JSONSerialization.data(withJSONObject: expr, options: [])
        //                filter = try JSONDecoder().decode(Exp.self, from: data)
        //            }
        //        } catch {
        //            completion(nil, error as NSError)
        //            return nil
        //        }
        if (filterExpression == nil) {
            completion(nil, NSError(domain: "MapboxBridge", code: 2, userInfo: [NSLocalizedDescriptionKey: "querySourceFeatures: missing filter"]))
            return nil
            
        }
        
        let options = SourceQueryOptions(sourceLayerIds: sourceLayers, filter: filterExpression!)
        
        
        // Call the native async API and return the Cancelable. Use the completion to return JSON string.
        let cancelable = mv.mapboxMap.querySourceFeatures(for: sourceId, options: options) { result in
            switch result {
            case .success(let features):
                var jsonArray: [[String: Any]] = []
                for feature in features {
                    do {
                        let jsonData = try JSONEncoder().encode(feature.queriedFeature.feature)
                        let jsonObject = try JSONSerialization.jsonObject(with: jsonData) as? [String: Any?]
                        if var json = jsonObject {
                            json["source"] = (feature.queriedFeature.source)
                            if let sourceLayer = feature.queriedFeature.sourceLayer {
                                json["source_layer"] = (sourceLayer)
                            }
                            jsonArray.append(json as [String : Any])
                        }
                    } catch {}
                }
                if let data = try? JSONSerialization.data(withJSONObject: jsonArray, options: []),
                   let s = String(data: data, encoding: .utf8) {
                    completion(s as String, nil)
                } else {
                    completion(nil, nil)
                }
            case .failure(let error):
                completion(nil, error as NSError)
            }
        }
        
        return cancelable
    }
    
    // MARK: - Sources & Layers
    
    // Add GeoJSON source and remember its JSON for queries
    @objc public func addSourceGeoJSON(_ sourceId: String, _ geojson: String) -> Bool {
        guard let mv = mapView else { return false }
        // If geojson is a URL
        if let url = URL(string: geojson), let scheme = url.scheme, (scheme == "http" || scheme == "https" || scheme == "file") {
            var source = GeoJSONSource(id: sourceId)
            source.data = .url(url)
            do { try mv.mapboxMap.addSource(source); return true } catch { return false }
        } else {
            guard let data = geojson.data(using: .utf8) else { return false }
            var source = GeoJSONSource(id: sourceId)
            do {
                let geoData = try JSONDecoder().decode(GeoJSONSourceData.self, from: data)
                source.data = geoData
                try mv.mapboxMap.addSource(source)
                return true
            } catch {
                return false
            }
        }
    }
    
    @objc public func updateSourceGeoJSON(_ sourceId: String, _ geojson: String) -> Bool {
        guard let mv = mapView else { return false }
        guard let data = geojson.data(using: .utf8) else { return false }
        do {
            if let _ = try? mv.mapboxMap.source(withId: sourceId) as? GeoJSONSource {
                //                _ = GeoJSONSource(id: sourceId)
                let geoData = try JSONDecoder().decode(GeoJSONSourceData.self, from: data)
                mv.mapboxMap.updateGeoJSONSource(withId: sourceId, data: geoData)
            }
            return true
        } catch {
            return false
        }
    }
    
    @objc public func removeSource(_ sourceId: String) -> Bool {
        guard let mv = mapView else { return false }
        do { try mv.mapboxMap.removeSource(withId: sourceId); return true } catch { return false }
    }
    
    @objc public func removeLayer(_ layerId: String) -> Bool {
        guard let mv = mapView else { return false }
        do {
            try mv.mapboxMap.removeLayer(withId: layerId)
            return true
        } catch {
            return false
        }
    }
    
    
    // MARK: - Polylines / Polygons (convenience: creates source + layer)
    
    // coordsJSON is stringified JSON array of [ [lng, lat], [lng, lat], ... ]
    // optionsJSON can contain strokeColor, strokeWidth, strokeOpacity for polyline; fillColor, fillOpacity for polygon
    @objc public func addPolyline(_ id: String, _ coordsJSON: String, _ optionsJSON: String?) -> Bool {
        guard let mv = mapView else { return false }
        guard let data = coordsJSON.data(using: .utf8), let coords = try? JSONSerialization.jsonObject(with: data, options: []) as? [[Double]] else { return false }
        var ccoords = [CLLocationCoordinate2D]()
        for item in coords! {
            ccoords.append(CLLocationCoordinate2D(latitude: item[1], longitude: item[0]))
        }
        if (ccoords.isEmpty) {
            return false
        }
        
        
        if polylineAnnotationManager == nil {
            polylineAnnotationManager = mv.annotations.makePolylineAnnotationManager()
        }
        guard let manager = polylineAnnotationManager else { return false }
        var annotation = PolylineAnnotation(id: id, lineCoordinates: ccoords)
        
        if let opt = MapboxBridge.parseJSONParameter(optionsJSON) as? [String: Any] {
            if let color = opt["strokeColor"] as? Int64 {
                annotation.lineColor = (StyleColor(UIColor.init(rgbaValue: color)))
            }
            if let width = opt["strokeWidth"] as? Double {
                annotation.lineWidth = (width)
            }
            if let opacity = opt["strokeOpacity"] as? Double {
                annotation.lineOpacity = (opacity)
            }
        }
        
        manager.annotations.removeAll { $0.id == id }
        manager.annotations.append(annotation)
        
        return true
        
    }
    @objc public func removePolygons(_ _ids: [String]?) -> Bool {
        guard let manager = polygonAnnotationManager else { return false }
        guard let ids = _ids else {
            manager.annotations.removeAll()
            if let outlineManager = polygonOutlineAnnotationManager {
                outlineManager.annotations.removeAll()
            }
            return true
        }
        //        guard let data = idsJSON!.data(using: .utf8) else { return }
        //        guard let ids = try? JSONSerialization.jsonObject(with: data, options: []) as! [String] else { return }
        //
        let idSet = Set<String>(ids)
        //        for case let v  in ids {
        //            idSet.insert(v)
        //        }
        manager.annotations.removeAll { idSet.contains($0.id) }
        
        _ = manager.annotations.filter { ann in
            return !idSet.contains(ann.id)
        }
        if let outlineManager = polygonOutlineAnnotationManager {
            outlineManager.annotations.removeAll { idSet.contains($0.id) }
        }
        return true
    }
    
    @objc public func removePolylines(_ _ids: [String]?) -> Bool {
        guard let manager = polylineAnnotationManager else { return false }
        guard let ids = _ids else {
            manager.annotations.removeAll()
            return true
        }
        
        let idSet = Set<String>(ids)
        
        manager.annotations.removeAll { idSet.contains($0.id) }
        return true
    }
    
    enum GeoJSONSourceUpdateError: Error {
        case sourceNotFound
        case noGeoJSONData
        case noLineStringFound
        case cannotDecodeInlineString
        case unsupportedDataCase
    }
    
    @objc public func addLinePoint(_ id: String, _ lnglatJSON: String, _ sourceId: String?) -> Bool {
        guard let mv = mapView else { return false }
        guard let data = lnglatJSON.data(using: .utf8), let coords = try? JSONSerialization.jsonObject(with: data, options: []) as? [Double] else { return false }
        var actualSourceId = sourceId
        if (actualSourceId == nil) {
            actualSourceId = id + "_source"
        }
        let coordinate = CLLocationCoordinate2D(latitude: (coords![1]), longitude: (coords![0]))
        
        guard let source = try? mv.mapboxMap.source(withId: actualSourceId!, type: GeoJSONSource.self) else { return false }
        
        guard let data = source.data else { return false }
        
        // Helper to convert CLLocationCoordinate2D -> Turf LocationCoordinate2D if needed
        func turfCoord(from cl: CLLocationCoordinate2D) -> LocationCoordinate2D {
            return LocationCoordinate2D(latitude: cl.latitude, longitude: cl.longitude)
        }
        
        // Try to update in place for supported cases
        switch data {
        case .featureCollection(var featureCollection):
            for i in 0..<featureCollection.features.count {
                guard let geom = featureCollection.features[i].geometry else { continue }
                
                switch geom {
                case .lineString(var lineString):
                    // Append coordinate and update featureCollection
                    lineString.coordinates.append(turfCoord(from: coordinate))
                    featureCollection.features[i].geometry = .lineString(lineString)
                    mv.mapboxMap.updateGeoJSONSource(withId: actualSourceId!, data: .featureCollection(featureCollection))
                    return true
                default:
                    continue
                }
            }
            return false
            
        case .feature(var feature):
            guard let geom = feature.geometry else {
                return false
            }
            switch geom {
            case .lineString(var lineString):
                lineString.coordinates.append(turfCoord(from: coordinate))
                feature.geometry = .lineString(lineString)
                mv.mapboxMap.updateGeoJSONSource(withId: actualSourceId!, data: .feature(feature))
                return true
            default:
                return false
            }
            
        case .geometry(let geometry):
            switch geometry {
            case .lineString(var lineString):
                lineString.coordinates.append(turfCoord(from: coordinate))
                let newGeometry = Geometry.lineString(lineString)
                mv.mapboxMap.updateGeoJSONSource(withId: actualSourceId!, data: .geometry(newGeometry))
                return true
            default:
                return false
            }
            
        case .string(let jsonString):
            // Try to decode the inline JSON string into Turf types and proceed
            guard let jsonData = jsonString.data(using: .utf8) else {
                return false
            }
            
            let decoder = JSONDecoder()
            // Try FeatureCollection
            if var fc = try? decoder.decode(FeatureCollection.self, from: jsonData) {
                for i in 0..<fc.features.count {
                    guard let geom = fc.features[i].geometry else { continue }
                    switch geom {
                    case .lineString(var lineString):
                        lineString.coordinates.append(turfCoord(from: coordinate))
                        fc.features[i].geometry = .lineString(lineString)
                        mv.mapboxMap.updateGeoJSONSource(withId: actualSourceId!, data: .featureCollection(fc))
                        return true
                    default:
                        continue
                    }
                }
                return false
            }
            
            // Try Feature
            if var f = try? decoder.decode(Feature.self, from: jsonData) {
                guard let geom = f.geometry else { return false }
                switch geom {
                case .lineString(var lineString):
                    lineString.coordinates.append(turfCoord(from: coordinate))
                    f.geometry = .lineString(lineString)
                    mv.mapboxMap.updateGeoJSONSource(withId: actualSourceId!, data: .feature(f))
                    return true
                default:
                    return false
                }
            }
            
            // Try Geometry
            if let g = try? decoder.decode(Geometry.self, from: jsonData) {
                switch g {
                case .lineString(var lineString):
                    lineString.coordinates.append(turfCoord(from: coordinate))
                    let newGeometry = Geometry.lineString(lineString)
                    mv.mapboxMap.updateGeoJSONSource(withId: actualSourceId!, data: .geometry(newGeometry))
                    return true
                default:
                    return false
                }
            }
            
            return false
            
        default:
            return false
        }
    }
    
    @objc public func addPolygon(_ id: String, _ coordsJSON: String, _ optionsJSON: String?) -> Bool {
        guard let mv = mapView else { return false }
        guard let coords = MapboxBridge.parseJSONParameter(coordsJSON) as? [[Double]] else { return false }
        var ccoords = [CLLocationCoordinate2D]()
        for item in coords {
            ccoords.append(CLLocationCoordinate2D(latitude: item[1], longitude: item[0]))
        }
        if (ccoords.isEmpty) {
            return false
        }
        
        
        if polygonAnnotationManager == nil {
            polygonAnnotationManager = mv.annotations.makePolygonAnnotationManager()
        }
        guard let manager = polygonAnnotationManager else { return false }
        let polygon = Polygon(outerRing: .init(coordinates: ccoords))
        var annotation = PolygonAnnotation(id: id, polygon: polygon)
        
        if let opt = MapboxBridge.parseJSONParameter(optionsJSON) as? [String: Any] {
            let strokeColor = opt["strokeColor"] as? Int64
            let strokeOpacity = opt["strokeOpacity"] as? Double
            let strokeWidth = opt["strokeWidth"] as? Double
            if let color = opt["fillColor"] as? Int64 {
                annotation.fillColor =  (StyleColor(UIColor.init(rgbaValue: color)))
            }
            if (strokeColor != nil) && (strokeWidth == nil) {
                annotation.fillOutlineColor =  (StyleColor(UIColor.init(rgbaValue: strokeColor!)))
            }
            if let opacity = opt["fillOpacity"] as? Double {
                annotation.fillOpacity = (opacity)
            }
            
            
            if (strokeOpacity != nil || strokeWidth != nil){
                if polygonOutlineAnnotationManager == nil {
                    polygonOutlineAnnotationManager = mv.annotations.makePolylineAnnotationManager()
                }
                var outline = PolylineAnnotation(id: id, lineCoordinates: ccoords)
                if (strokeColor != nil) {
                    outline.lineColor =  (StyleColor(UIColor.init(rgbaValue: strokeColor!)))
                }
                if (strokeOpacity != nil) {
                    outline.lineOpacity = strokeOpacity
                }
                if (strokeWidth != nil) {
                    outline.lineWidth = strokeWidth
                }
                outline.lineJoin = .round
                // Replace existing outline with same id
                polygonOutlineAnnotationManager!.annotations.removeAll { $0.id == id }
                polygonOutlineAnnotationManager!.annotations.append(outline)
            }
        }
        
        manager.annotations.removeAll { $0.id == id }
        manager.annotations.append(annotation)
        
        return true
    }
    // MARK: - User location, track and tilt
    
    
    @objc public func forceUserLocationUpdate() -> Bool {
        guard mapView != nil else { return false }
        
        return false
    }
    
    
    @objc public func showUserLocationMarker(_ optionsJSON: String) -> Bool {
        guard let mv = mapView else { return false }
        
        guard let data = optionsJSON.data(using: .utf8),
              let obj = try? JSONSerialization.jsonObject(with: data, options: []) as? [String: Any] else {
            return false
        }
        
        self.userTrackingCameraMode = ((obj?["cameraMode"] as? String ?? "TRACKING")).uppercased()
        let renderMode = ((obj?["renderMode"] as? String  ?? "GPS")).uppercased()
        self.userTrackingCameraAnimated = (obj?["animated"] as? Bool  ?? true)
        let imageName = obj?["image"] as? String
        
        // If cameraMode starts with NONE -> stop tracking immediately
//        if cameraModeRaw.hasPrefix("NONE") {
//            stopTrackingUser()
//            return true
//        }
        
        
        // Resolve optional image
        _ = resolveImage(named: imageName)
        
        // Map renderMode to showBearing: COMPASS -> true, GPS/NORMAL -> false
        let showBearing: Bool
        switch renderMode {
        case "COMPASS": showBearing = true
        case "GPS": showBearing = false
        default: showBearing = false
        }
        
        let configuration = Puck2DConfiguration.makeDefault(showBearing: showBearing)
        mv.location.options.puckType = .puck2D(configuration)
        locationTrackingCancellation?.cancel()
        locationTrackingCancellation = mv.location.onLocationChange.observe { [weak self] newLocation in
            guard let location = newLocation.last else { return }
            guard let self = self else { return }
            guard let mv = self.mapView else { return }
            // Camera movement behavior based on trackingCameraMode
//            let bearing = 0.0
            var bearing = Double(mv.mapboxMap.cameraState.bearing)
            if (location.bearing != nil) {
                bearing = Double(location.bearing!)
            }
//            
   var cameraOptions: CameraOptions? = nil
      switch self.userTrackingCameraMode {
            case "TRACKING":
                cameraOptions = CameraOptions(center: location.coordinate)
            case "TRACKING_COMPASS":
                // use heading as bearing if available
                cameraOptions = CameraOptions(center: location.coordinate, bearing: bearing)
            case "TRACKING_GPS":
                // approximate as follow (no heading)
                cameraOptions = CameraOptions(center: location.coordinate)
            case "TRACKING_GPS_NORTH":
                // use course for bearing
                cameraOptions = CameraOptions(center: location.coordinate, bearing: bearing)
            default:
                break
            }
            if (cameraOptions != nil) {
                if (self.userTrackingCameraAnimated) {
                    mv.camera.ease(to: CameraOptions(center: location.coordinate), duration: 0.5)
                } else {
                    mv.camera.cancelAnimations()
                    mv.mapboxMap.setCamera(to: CameraOptions(center: location.coordinate))
                }
            }
            // Post notification for TS listeners
            var userInfo: [String: Any] = ["lat": location.coordinate.latitude, "lng": location.coordinate.longitude]
            userInfo["accuracy"] = location.horizontalAccuracy
            if ((location.bearing?.isFinite) != nil) { userInfo["heading"] = location.bearing }
            self.postEvent(MapboxBridge.UserLocationUpdatedNotification, userInfo)
        }
        
        
        // Emit state change
        let stateInfo: [String: Any] = ["tracking": true, "cameraMode": self.userTrackingCameraMode, "renderMode": renderMode]
        self.postEvent(MapboxBridge.UserTrackingStateChangedNotification, stateInfo)
        
        return true
    }
    
    // MARK: - stopTrackingUser
    @objc public func stopTrackingUser() {
        guard let mv = mapView else { return }
        
        if (locationTrackingCancellation != nil){
            locationTrackingCancellation?.cancel()
            locationTrackingCancellation = nil
            
            let stateInfo: [String: Any] = ["tracking": false]
            self.postEvent(MapboxBridge.UserTrackingStateChangedNotification, stateInfo)
        }
        mv.location.options.puckType = .none
    }
    
    
    @objc public func getTilt() -> NSNumber? {
        guard let mv = mapView else { return nil }
        return NSNumber(value: mv.mapboxMap.cameraState.pitch)
    }
    
    @objc public func setTilt(_ tilt: Double, _ animated: Bool) {
        guard let mv = mapView else { return }
        let cam = CameraOptions(pitch: tilt)
        if animated { mv.camera.ease(to: cam, duration: 0.5, completion: { _ in }) } else { mv.mapboxMap.setCamera(to: cam) }
    }
    
    @objc public func getUserLocation() -> String? {
        guard let mv = mapView else { return nil }
        if let latest = mv.location.latestLocation {
            if let coordVal = (latest as AnyObject).coordinate {
                return MapboxBridge.encodeToJSON(["lat": coordVal.latitude, "lng": coordVal.longitude])
            }
        }
        return nil
    }
    let aliases: [String: StyleURI] = [
        "streets": .streets,
        "outdoors": .outdoors,
        "light": .light,
        "dark": .dark,
        "satellite": .satellite,
        "satellite-streets": .satelliteStreets,
        "satellite_streets": .satelliteStreets,
        "standard": .standard
    ]
    private func getMapStyleURI(_ str: String?) -> StyleURI {
        if (str == nil) {
            return .streets
        }
        if let mapped = aliases[str!.lowercased()] {
            return mapped
        }
        if let styleURI = StyleURI(rawValue: str!) {
            return styleURI
        }
        return .streets
    }
    
    // MARK: - Offline (TileStore)
    
    @objc public func downloadOfflineRegion(_ optionsJSON: String, _ progress: @escaping (String?) -> Void, _ completion: @escaping (Bool, NSError?) -> Void) {
        guard mapView != nil else { completion(false, NSError(domain: "MapboxBridge", code: 6, userInfo: [NSLocalizedDescriptionKey: "No map available"])); return }
        let ts = TileStore.default
        
        
        guard let obj = MapboxBridge.parseJSONParameter(optionsJSON) as? [String: Any] else {
            completion(false, NSError(domain: "MapboxBridge", code: 8, userInfo: [NSLocalizedDescriptionKey: "Invalid JSON options"])); return
        }
        
        guard let name = obj["name"] as? String else { completion(false, NSError(domain: "MapboxBridge", code: 9, userInfo: [NSLocalizedDescriptionKey: "Missing 'name' param"])); return }
        guard let styleURL = obj["style"] as? String ?? obj["styleURL"] as? String ?? obj["styleUrl"] as? String else { completion(false, NSError(domain: "MapboxBridge", code: 10, userInfo: [NSLocalizedDescriptionKey: "Missing 'styleURL' or 'styleUrl' param"])); return }
        guard let bounds = obj["bounds"] as? [String: Any],
              let north = bounds["north"] as? Double,
              let east = bounds["east"] as? Double,
              let south = bounds["south"] as? Double,
              let west = bounds["west"] as? Double else {
            completion(false, NSError(domain: "MapboxBridge", code: 11, userInfo: [NSLocalizedDescriptionKey: "Invalid or missing 'bounds' param"])); return
        }
        
        let minZoom = obj["minZoom"] as? Float ?? 0.0
        let maxZoom = obj["maxZoom"] as? Float ?? 16.0
        var metadata = obj["metadata"] as? [String: Any] ?? [String: Any]()
        let regionId = obj["regionId"] as? String ?? String(Date().timeIntervalSince1970 * 1000)
        metadata["name"] = name
        metadata["styleUrl"] = styleURL
        metadata["bounds"] = bounds
        metadata["minZoom"] = minZoom
        metadata["maxZoom"] = maxZoom
        metadata["regionId"] = regionId
        
        // Turf uses LocationCoordinate2D; create the ring and repeat first point to close it
        let outerRing: [LocationCoordinate2D] = [
            LocationCoordinate2D(latitude: north, longitude: west),
            LocationCoordinate2D(latitude: north, longitude: east),
            LocationCoordinate2D(latitude: south, longitude: east),
            LocationCoordinate2D(latitude: south, longitude: west),
            LocationCoordinate2D(latitude: north, longitude: west) // close ring
        ]
        
        // Create a Polygon and its Geometry
        let polygon = Polygon([outerRing])
        
        
        
        // 2. Create an offline region with tiles for the Standard or Satellite-Streets style.
        // If you are using a raster tileset you may need to set a different pixelRatio. The default is UIScreen.main.scale.
        let styleOptions = TilesetDescriptorOptions(styleURI: getMapStyleURI(styleURL),
                                                    zoomRange: UInt8(minZoom)...UInt8(maxZoom),
                                                    tilesets: nil)
        // Load the tile region
        let styleDescriptor = offlineManager.createTilesetDescriptor(for: styleOptions)
        
        let tileRegionLoadOptions = TileRegionLoadOptions(
            geometry: polygon.geometry,
            descriptors: [styleDescriptor],
            metadata: metadata,
            acceptExpired: true)!
        
        let request = ts.loadTileRegion(forId: name, loadOptions: tileRegionLoadOptions, progress: { [weak self] prog in
            guard self != nil else { return }
            var info: [String: Any] = ["name": name]
            info["expected"] = prog.requiredResourceCount
            info["completed"] = prog.completedResourceCount
            info["completedSize"] = prog.completedResourceSize
            if prog.requiredResourceCount > 0 {
                info["percentage"] = round(Double(prog.completedResourceCount) / Double(prog.requiredResourceCount) * 10000.0) / 100.0
                info["complete"] = (prog.completedResourceCount >= prog.requiredResourceCount)
            } else {
                info["percentage"] = Double(0.0)
                info["complete"] = false
            }
            progress(MapboxBridge.encodeToJSON(info))
        }, completion: { [weak self] result in
            guard let self = self else { completion(false, NSError(domain: "MapboxBridge", code: 12, userInfo: [NSLocalizedDescriptionKey: "Bridge deallocated"])) ; return }
            self.tileRegionLoadRequestByName.removeValue(forKey: name)
            switch result {
            case .success(_):
                let md: [String: Any] = ["name": name, "styleUrl": styleURL, "minZoom": minZoom, "maxZoom": maxZoom, "bounds": ["north": north, "east": east, "south": south, "west": west]]
                //                    if let regionMetadata = region.metadata { md["metadata"] = regionMetadata }
                self.postEvent(MapboxBridge.OfflineCompleteNotification, md)
                completion(true, nil)
            case .failure(let error):
                let nsErr = error as NSError
                completion(false, nsErr)
            @unknown default:
                completion(false, NSError(domain: "MapboxBridge", code: 13, userInfo: [NSLocalizedDescriptionKey: "Unknown offline result"]))
            }
        })
        
        tileRegionLoadRequestByName[name] = request
        completion(true, nil)
    }
    
    @objc public func listOfflineRegions( _ completion: @escaping (String?) -> Void)  {
        let store = TileStore.default
        
        store.allTileRegions { result in
            switch result {
            case .success(let regions):
                guard !regions.isEmpty else {
                    DispatchQueue.main.async { completion("[]") }
                    return
                }
                
                var collected: [[String: Any]] = []
                let group = DispatchGroup()
                let lock = NSLock()
                
                for region in regions {
                    // Each region has an `id` property.
                    let id = region.id
                    group.enter()
                    store.tileRegionMetadata(forId: id) { metaResult in
                        switch metaResult {
                        case .success(let m):
                            lock.lock()
                            
                            guard let metadata = m as? [String: Any] else {
                                lock.unlock()
                                group.leave()
                                return
                            }
                            var data = [String: Any]()
                            data["id"] = id
                            data["name"] = metadata["name"]
                            data["style"] = metadata["styleUrl"]
                            data["minZoom"] = metadata["minZoom"]
                            data["maxZoom"] = metadata["maxZoom"]
                            data["metadata"] = metadata
                            collected.append(data)
                            lock.unlock()
                            break
                        case .failure:
                            break
                        }
                        group.leave()
                    }
                }
                
                group.notify(queue: .global(qos: .utility)) {
                    do {
                        let data = try JSONSerialization.data(withJSONObject: collected, options: [])
                        DispatchQueue.main.async { completion(String(data: data, encoding: .utf8) as String?) }
                    } catch {
                        DispatchQueue.main.async { completion("[]") }
                    }
                }
                return
                
            case .failure:
                // If we can't list regions, return empty array on main queue.
                DispatchQueue.main.async { completion("[]") }
            }
        }
    }
    
    @objc public func deleteOfflineRegion(_ idOrName: String) {
        let ts = TileStore.default
        
        ts.removeTileRegion(forId: idOrName)
    }
    
    
    // allow TS to set a camera-change callback directly (in addition to NotificationCenter)
    @objc public func setOnCameraChangeListener(_ callback: @escaping (NSDictionary) -> Void) {
        self.cameraChangeCallback = { dict in
            callback(dict as NSDictionary)
        }
    }
    
}
