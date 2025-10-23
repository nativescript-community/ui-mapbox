package com.nativescript.mapbox

import com.mapbox.maps.MapView
import com.mapbox.maps.plugin.animation.CameraAnimationsPlugin
import com.mapbox.maps.plugin.animation.camera
import com.mapbox.maps.plugin.annotation.annotations
import com.mapbox.maps.plugin.annotation.generated.createPointAnnotationManager
import android.util.Log

class Telemetry {
    companion object {
        @JvmStatic
        fun setUserTelemetryRequestState(mapView: MapView, value: Boolean) {
            val fakeManager = mapView.annotations.createPointAnnotationManager()
            fakeManager.delegateProvider.mapAttributionDelegate.telemetry().setUserTelemetryRequestState(value)
        }
    }
}
class Camera {
 	companion object {
        fun getCamera(mapView: MapView): CameraAnimationsPlugin {
            return mapView.camera
        }
        /**
        * Returns the CameraAnimationsPlugin associated with the given MapView.
        *
        * Once you have this object in NativeScript, you can directly call:
        *   camera.flyTo(...)
        *   camera.easeTo(...)
        *   camera.cancelTransitions()
        */
        @JvmStatic
        fun flyTo(mapView: MapView, cameraOptions: com.mapbox.maps.CameraOptions, animationOptions: com.mapbox.maps.plugin.animation.MapAnimationOptions, listener: android.animation.Animator.AnimatorListener?): com.mapbox.common.Cancelable {
            return mapView.camera.flyTo(cameraOptions, animationOptions, listener)
        }
        @JvmStatic
        fun setCamera(mapView: MapView, cameraOptions: com.mapbox.maps.CameraOptions) {
            mapView.mapboxMap.setCamera(cameraOptions)
        }
    }
}

class ViewAnnotationManager {
  	companion object {
        @JvmStatic
        fun addViewAnnotation(map: com.mapbox.maps.MapView, view: android.view.View, options: com.mapbox.maps.ViewAnnotationOptions) {
            map.viewAnnotationManager.addViewAnnotation(view, options)
        }
        @JvmStatic
        fun removeViewAnnotation(map: com.mapbox.maps.MapView, view: android.view.View) {
            map.viewAnnotationManager.removeViewAnnotation(view)
        }
        @JvmStatic
        fun updateViewAnnotation(map: com.mapbox.maps.MapView, view: android.view.View, options: com.mapbox.maps.ViewAnnotationOptions) {
            map.viewAnnotationManager.updateViewAnnotation(view, options)
        }
        @JvmStatic
        fun getViewAnnotationOptions(map: com.mapbox.maps.MapView, view: android.view.View): com.mapbox.maps.ViewAnnotationOptions? {
            return map.viewAnnotationManager.getViewAnnotationOptions(view)
        }
        @JvmStatic
        fun addOnViewAnnotationUpdatedListener(map: com.mapbox.maps.MapView, listener: com.mapbox.maps.viewannotation.OnViewAnnotationUpdatedListener) {
            map.viewAnnotationManager.addOnViewAnnotationUpdatedListener(listener)
        }
        @JvmStatic
        fun removeOnViewAnnotationUpdatedListener(map: com.mapbox.maps.MapView, listener: com.mapbox.maps.viewannotation.OnViewAnnotationUpdatedListener) {
            map.viewAnnotationManager.removeOnViewAnnotationUpdatedListener(listener)
        }
    }
}

class Utils {
    companion object {
        fun getViewAnnotationManager(map: MapView): com.mapbox.maps.viewannotation.ViewAnnotationManager {
            return map.viewAnnotationManager 
        }
        // fun getCamera(map: com.mapbox.maps.MapView): com.mapbox.maps.plugin.animation.CameraAnimationsPlugin {
        //     return map.getPlugin("MAPBOX_CAMERA_PLUGIN_ID") 
        // }
        // fun getTelemetry(map: com.mapbox.maps.MapView): com.mapbox.maps.module.MapTelemetry {
        //     return map.telemetry 
        // }
        fun addViewAnnotation(map: com.mapbox.maps.MapView, view: android.view.View, options: com.mapbox.maps.ViewAnnotationOptions) {
            map.viewAnnotationManager.addViewAnnotation(view, options)
        }
        fun removeViewAnnotation(map: com.mapbox.maps.MapView, view: android.view.View) {
            map.viewAnnotationManager.removeViewAnnotation(view)
        }
        fun updateViewAnnotation(map: com.mapbox.maps.MapView, view: android.view.View, options: com.mapbox.maps.ViewAnnotationOptions) {
            map.viewAnnotationManager.updateViewAnnotation(view, options)
        }
        fun getViewAnnotationOptions(map: com.mapbox.maps.MapView, view: android.view.View): com.mapbox.maps.ViewAnnotationOptions? {
            return map.viewAnnotationManager.getViewAnnotationOptions(view)
        }
        fun addOnViewAnnotationUpdatedListener(map: com.mapbox.maps.MapView, listener: com.mapbox.maps.viewannotation.OnViewAnnotationUpdatedListener) {
            map.viewAnnotationManager.addOnViewAnnotationUpdatedListener(listener)
        }
        fun removeOnViewAnnotationUpdatedListener(map: com.mapbox.maps.MapView, listener: com.mapbox.maps.viewannotation.OnViewAnnotationUpdatedListener) {
            map.viewAnnotationManager.removeOnViewAnnotationUpdatedListener(listener)
        }
    }
}