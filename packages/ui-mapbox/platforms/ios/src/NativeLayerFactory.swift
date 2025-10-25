import Foundation
import UIKit
import MapboxMaps

@objcMembers
public class NativeLayerFactory: NSObject {
    
    // Create a layer from JSON. Returns true on success.
    @objc public static func createLayer(_ mapboxView: MapView, _ layerId: String, _ jsonString: String, _ belowLayerId:  String?) -> Bool {
        guard let mapboxMap = mapboxView.mapboxMap, let data = jsonString.data(using: .utf8) else { return false }
        do {
            // Parse to a JSON dictionary
            guard let jsonObject = try JSONSerialization.jsonObject(with: data, options: []) as? [String: Any] else {
                throw NSError(domain: "LayerError", code: 0, userInfo: [NSLocalizedDescriptionKey: "Invalid JSON"])
            }
            
            guard let typeString = jsonObject["type"] as? String,
                  let type = LayerType(rawValue: typeString).layerType else {
                throw TypeConversionError.invalidObject
            }
            
            let layer = try type.init(jsonObject: jsonObject)
            if (belowLayerId != nil) {
                try mapboxMap.addLayer(layer, layerPosition: .below(belowLayerId!))
            } else {
                try mapboxMap.addLayer(layer)
            }
            return true
        } catch {
            return false
        }
    }
    
    /// Apply a set of properties to an existing layer by calling setLayerProperty for each key.
    /// This avoids removing/adding the layer and uses the style API to set properties in-place.
    @objc public static func applyLayerProperties(_ mapboxView: MapView, _ layerId: String, _ properties: NSDictionary) -> Bool {
        guard mapboxView.mapboxMap != nil else { return false }
        // Iterate keys and call style.setLayerProperty(for:property:value:)
        var succeeded = true
        for (k, v) in properties {
            guard let key = k as? String else { continue }
            let ok = setLayerProperty(mapboxView, layerId, key, v as Any)
            if !ok { succeeded = false }
        }
        return succeeded
    }
    
    /// Set a single layer property in-place using the style API.
    /// Example property paths: "paint.fill-color", "layout.visibility", etc.
    @objc public static func setLayerProperty(_ mapboxView: MapView, _ layerId: String, _ name: String, _ value: Any) -> Bool {
        guard let mapboxMap = mapboxView.mapboxMap else { return false }
        do {
            // MapboxMaps (11.x) exposes setLayerProperty(for:property:value:)
            // Use the API directly and propagate errors.
            try mapboxMap.setLayerProperty(for: layerId, property: name, value: value)
            return true
        } catch {
            // Some SDK variants may expect different types (e.g., NSNumber vs String). Try best-effort conversions for common types.
            // If value is NSString representing a color (e.g. "#ff0000"), it's usually accepted by the SDK.
            return false
        }
    }
    
    // Set layer visibility
    @objc public static func setLayerVisibility(_ mapboxView: MapView, _ layerId: String, _ visible: Bool) -> Bool {
        return setLayerProperty(mapboxView, layerId, "layout.visibility", visible ? "visible" : "none")
    }
    // Set layer visibility
    @objc public static func getLayerProperty(_ mapboxView: MapView, _ layerId: String, _ name: String) -> Any? {
        guard let mapboxMap = mapboxView.mapboxMap else { return nil }
        return mapboxMap.layerProperty(for: layerId, property: name)
    }
    // -------------------------------
    // Native getters for layer ids/info
    // -------------------------------
    
    /// Return the layer id if the layer exists, otherwise nil.
    /// JS can call this to validate layer presence.
    @objc public static func getLayer(_ mapboxView: MapView, _ layerId: String) -> NSString? {
        guard let mapboxMap = mapboxView.mapboxMap else { return nil }
        do {
            // Try to fetch the layer; if it exists return the id string (opaque success marker)
            _ = try mapboxMap.layer(withId: layerId)
            return layerId as NSString
        } catch {
            return nil
        }
    }
    
    /// Return an array (JSON string) of layer ids in the current style.
    @objc public static func getLayers(_ mapboxView: MapView) -> NSString? {
        guard let mapboxMap = mapboxView.mapboxMap else { return nil }
        var ids: [String] = []
        for info in mapboxMap.allLayerIdentifiers {
            ids.append(info.id)
        }
        if let data = try? JSONSerialization.data(withJSONObject: ids, options: []),
           let s = String(data: data, encoding: .utf8) {
            return s as NSString
        }
        return nil
    }
    
    /// Return the layer 'type' string for the given layer id (e.g. "fill", "line", "symbol"), or nil.
    @objc public static func getLayerType(_ mapboxView: MapView, _ layerId: String) -> NSString? {
        return getLayerProperty(mapboxView, layerId, "type") as? NSString
    }
}
