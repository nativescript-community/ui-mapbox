import Foundation
import MapboxMaps

@objcMembers
public class NativeExpressionParser: NSObject {

    /// Parse a Mapbox-style expression provided as a JSON string into a native Expression instance.
    /// - Parameter jsonString: NSString containing the JSON array for the expression (e.g. '["==", ["get","foo"], "bar"]')
    /// - Returns: an opaque native Expression (as Any) on success, or nil on failure.
    @objc public static func parseJson(_ jsonString: NSString) -> Any? {
        // Convert string -> Data -> JSON object (NSArray expected)
        guard let data = (jsonString as String).data(using: .utf8) else { return nil }
        do {
            return try JSONDecoder().decode(Exp.self, from: data)
        } catch {
            // parsing or Expression init failed
            return nil
        }
    }

    /// Convert a native Expression (opaque) back into a JSON string.
    /// - Parameter expression: the native Expression (as returned by parseJson) or nil
    /// - Returns: NSString containing the JSON array representation, or nil on failure.
    @objc public static func toJson(_ expression: Any?) -> NSString? {
        guard let expr = expression as? Exp else { return nil }
        do {
            let data = try JSONEncoder().encode(expr)
            return String(data: data, encoding: .utf8) as NSString?
        } catch {
            return nil
        }
    }
}
