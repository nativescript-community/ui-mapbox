declare namespace com {
    export namespace nativescript {
        export namespace mapbox {
            export namespace Telemetry {
                function setUserTelemetryRequestState(mapView: com.mapbox.maps.MapView, param0: boolean);

            }
            export namespace Camera {
                function flyTo(mapView: com.mapbox.maps.MapView, param0: com.mapbox.maps.CameraOptions, param1: com.mapbox.maps.plugin.animation.MapAnimationOptions, param2: globalAndroid.animation.Animator.AnimatorListener): com.mapbox.common.Cancelable;
                function setCamera(mapView: com.mapbox.maps.MapView, param0: com.mapbox.maps.CameraOptions);
            }
            export namespace ViewAnnotationManager {
                function getViewAnnotationManager(map: com.mapbox.maps.MapView): com.mapbox.maps.viewannotation.ViewAnnotationManager;
                function addViewAnnotation(map: com.mapbox.maps.MapView, view: android.view.View, options: com.mapbox.maps.ViewAnnotationOptions);
                function updateViewAnnotation(map: com.mapbox.maps.MapView, view: android.view.View, options: com.mapbox.maps.ViewAnnotationOptions);
                function removeViewAnnotation(map: com.mapbox.maps.MapView, view: android.view.View);
                function getViewAnnotationOptions(map: com.mapbox.maps.MapView, view: android.view.View): com.mapbox.maps.ViewAnnotationOptions?;
                function addOnViewAnnotationUpdatedListener(map: com.mapbox.maps.MapView, listener: com.mapbox.maps.viewannotation.OnViewAnnotationUpdatedListener);
                function removeOnViewAnnotationUpdatedListener(map: com.mapbox.maps.MapView, listener: com.mapbox.maps.viewannotation.OnViewAnnotationUpdatedListener);
            }
            export namespace Utils {
                export namespace Companion {
                    function getViewAnnotationManager(map: com.mapbox.maps.MapView): com.mapbox.maps.viewannotation.ViewAnnotationManager;
                    function addViewAnnotation(map: com.mapbox.maps.MapView, view: android.view.View, options: com.mapbox.maps.ViewAnnotationOptions);
                    function updateViewAnnotation(map: com.mapbox.maps.MapView, view: android.view.View, options: com.mapbox.maps.ViewAnnotationOptions);
                    function removeViewAnnotation(map: com.mapbox.maps.MapView, view: android.view.View);
                    function getViewAnnotationOptions(map: com.mapbox.maps.MapView, view: android.view.View): com.mapbox.maps.ViewAnnotationOptions?;
                    function addOnViewAnnotationUpdatedListener(map: com.mapbox.maps.MapView, listener: com.mapbox.maps.viewannotation.OnViewAnnotationUpdatedListener);
                    function removeOnViewAnnotationUpdatedListener(map: com.mapbox.maps.MapView, listener: com.mapbox.maps.viewannotation.OnViewAnnotationUpdatedListener);
                }
            }
        }
    }
}

declare namespace com {
    export namespace mapbox {
        export namespace maps {
            export namespace MapInitOptions {
                export namespace Companion {
                     function getDefaultPluginList(): java.util.List<com.mapbox.maps.plugin.Plugin>;
                }
            }
        }
    }
}
