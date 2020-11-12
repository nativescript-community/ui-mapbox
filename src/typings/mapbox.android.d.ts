declare module com {
	export module mapbox {
		export module android {
			export module accounts {
				export module v1 {
					export class AccountsConstants extends java.lang.Object {
						public static class: java.lang.Class<AccountsConstants>;
						public static MAPBOX_SHARED_PREFERENCES: string;
						public static KEY_PREFERENCE_MAPS_SKU_TOKEN: string;
						public static KEY_META_DATA_MANAGE_SKU: string;
						public static DEFAULT_TOKEN_MANAGE_SKU: boolean;
						public constructor();
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module android {
			export module accounts {
				export module v1 {
					export class MapboxAccounts extends java.lang.Object {
						public static class: java.lang.Class<MapboxAccounts>;
						public static SKU_ID_MAPS_MAUS: string;
						public static SKU_ID_NAVIGATION_MAUS: string;
						public static SKU_ID_NAVIGATION_TRIPS: string;
						public static SKU_ID_VISION_MAUS: string;
						public static SKU_ID_VISION_FLEET_MAUS: string;
						public static obtainNavigationSkuSessionToken(): string;
						public static obtainMapsSkuUserToken(param0: string): string;
						public constructor();
						public static obtainVisionFleetSkuUserToken(param0: string): string;
						public static a(param0: string, param1: native.Array<any>): string;
						public static obtainNavigationSkuUserToken(param0: string): string;
						public static obtainVisionSkuUserToken(param0: string): string;
						public static getNow(): number;
						public static a(): string;
						public static obtainEndUserId(): string;
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module android {
			export module core {
				export class BuildConfig extends java.lang.Object {
					public static class: java.lang.Class<BuildConfig>;
					public static DEBUG: boolean;
					public static LIBRARY_PACKAGE_NAME: string;
					public static BUILD_TYPE: string;
					public static VERSION_CODE: number;
					public static VERSION_NAME: string;
					public constructor();
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module android {
			export module core {
				export class FileUtils extends java.lang.Object {
					public static class: java.lang.Class<FileUtils>;
					public static deleteFile(param0: java.io.File): void;
					public static writeToFile(param0: java.io.File, param1: string): void;
					public static closeQuietly(param0: java.io.Closeable): void;
					public static deleteFirst(param0: native.Array<java.io.File>, param1: java.util.Comparator<java.io.File>, param2: number): void;
					public static getFile(param0: globalAndroid.content.Context, param1: string): java.io.File;
					public static listAllFiles(param0: java.io.File): native.Array<java.io.File>;
					public static readFromFile(param0: java.io.File): string;
				}
				export module FileUtils {
					export class LastModifiedComparator extends java.util.Comparator<java.io.File> {
						public static class: java.lang.Class<LastModifiedComparator>;
						public thenComparing(param0: any /* any*/, param1: java.util.Comparator<any>): java.util.Comparator<any>;
						public constructor();
						public static comparing(param0: any /* any*/, param1: java.util.Comparator<any>): java.util.Comparator<any>;
						public thenComparingLong(param0: any /* any*/): java.util.Comparator<any>;
						public equals(param0: any): boolean;
						public static comparingInt(param0: any /* any*/): java.util.Comparator<any>;
						public static comparingDouble(param0: any /* any*/): java.util.Comparator<any>;
						public static reverseOrder(): java.util.Comparator<any>;
						public static comparing(param0: any /* any*/): java.util.Comparator<any>;
						public thenComparingInt(param0: any /* any*/): java.util.Comparator<any>;
						public reversed(): java.util.Comparator<any>;
						public static nullsFirst(param0: java.util.Comparator<any>): java.util.Comparator<any>;
						public thenComparingDouble(param0: any /* any*/): java.util.Comparator<any>;
						public static nullsLast(param0: java.util.Comparator<any>): java.util.Comparator<any>;
						public thenComparing(param0: any /* any*/): java.util.Comparator<any>;
						public static naturalOrder(): java.util.Comparator<any>;
						public compare(param0: java.io.File, param1: java.io.File): number;
						public compare(param0: any, param1: any): number;
						public thenComparing(param0: java.util.Comparator<any>): java.util.Comparator<any>;
						public static comparingLong(param0: any /* any*/): java.util.Comparator<any>;
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module android {
			export module core {
				export class MapboxSdkInfoForUserAgentGenerator extends java.lang.Object {
					public static class: java.lang.Class<MapboxSdkInfoForUserAgentGenerator>;
					public getSdkInfoForUserAgent(): string;
					public static getInstance(param0: globalAndroid.content.res.AssetManager): MapboxSdkInfoForUserAgentGenerator;
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module android {
			export module core {
				export module connectivity {
					export class ConnectivityListener extends java.lang.Object {
						public static class: java.lang.Class<ConnectivityListener>;
						/**
						 * Constructs a new instance of the ConnectivityListener interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
						 */
						public constructor(implementation: {
							onConnectivityChanged(param0: boolean): void;
						});
						public constructor();
						public onConnectivityChanged(param0: boolean): void;
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module android {
			export module core {
				export module connectivity {
					export class ConnectivityReceiver extends globalAndroid.content.BroadcastReceiver {
						public static class: java.lang.Class<ConnectivityReceiver>;
						public addConnectivityListener(param0: ConnectivityListener): void;
						public removeConnectivityUpdates(): void;
						public onReceive(param0: globalAndroid.content.Context, param1: globalAndroid.content.Intent): void;
						public constructor();
						public static isConnected(param0: globalAndroid.content.Context): boolean;
						public constructor(param0: globalAndroid.content.Context);
						public requestConnectivityUpdates(): void;
						public getConnectedFlag(): java.lang.Boolean;
						public setConnectedFlag(param0: java.lang.Boolean): void;
						public isConnected(): boolean;
						public removeConnectivityListener(param0: ConnectivityListener): boolean;
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module android {
			export module core {
				export module crashreporter {
					export class CrashReport extends java.lang.Object {
						public static class: java.lang.Class<CrashReport>;
						public put(param0: string, param1: string): void;
						public toJson(): string;
						public getDateString(): string;
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module android {
			export module core {
				export module crashreporter {
					export class CrashReportBuilder extends java.lang.Object {
						public static class: java.lang.Class<CrashReportBuilder>;
						public static fromJson(param0: string): CrashReport;
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module android {
			export module core {
				export module crashreporter {
					export class MapboxUncaughtExceptionHanlder extends java.lang.Object implements java.lang.Thread.UncaughtExceptionHandler, globalAndroid.content.SharedPreferences.OnSharedPreferenceChangeListener {
						public static class: java.lang.Class<MapboxUncaughtExceptionHanlder>;
						public static MAPBOX_PREF_ENABLE_CRASH_REPORTER: string;
						public static MAPBOX_CRASH_REPORTER_PREFERENCES: string;
						public uncaughtException(param0: java.lang.Thread, param1: java.lang.Throwable): void;
						public onSharedPreferenceChanged(param0: globalAndroid.content.SharedPreferences, param1: string): void;
						public static install(param0: globalAndroid.content.Context, param1: string, param2: string): void;
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module android {
			export module core {
				export module location {
					export class AndroidLocationEngineImpl extends LocationEngineImpl<globalAndroid.location.LocationListener> {
						public static class: java.lang.Class<AndroidLocationEngineImpl>;
						public createListener(param0: LocationEngineCallback<LocationEngineResult>): any;
						public removeLocationUpdates(param0: any): void;
						public createListener(param0: LocationEngineCallback<LocationEngineResult>): globalAndroid.location.LocationListener;
						public requestLocationUpdates(param0: LocationEngineRequest, param1: any, param2: globalAndroid.os.Looper): void;
						public requestLocationUpdates(param0: LocationEngineRequest, param1: globalAndroid.app.PendingIntent): void;
						public requestLocationUpdates(param0: LocationEngineRequest, param1: globalAndroid.location.LocationListener, param2: globalAndroid.os.Looper): void;
						public getLastLocation(param0: LocationEngineCallback<LocationEngineResult>): void;
						public removeLocationUpdates(param0: globalAndroid.location.LocationListener): void;
						public removeLocationUpdates(param0: globalAndroid.app.PendingIntent): void;
					}
					export module AndroidLocationEngineImpl {
						export class AndroidLocationEngineCallbackTransport extends java.lang.Object implements globalAndroid.location.LocationListener {
							public static class: java.lang.Class<AndroidLocationEngineImpl.AndroidLocationEngineCallbackTransport>;
							public onProviderDisabled(param0: string): void;
							public onStatusChanged(param0: string, param1: number, param2: globalAndroid.os.Bundle): void;
							public onLocationChanged(param0: globalAndroid.location.Location): void;
							public onProviderEnabled(param0: string): void;
						}
					}
				}
			}
		}
	}
}


declare module com {
	export module mapbox {
		export module android {
			export module core {
				export module location {
					export class LocationEngine extends java.lang.Object {
						public static class: java.lang.Class<LocationEngine>;
						/**
						 * Constructs a new instance of the LocationEngine interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
						 */
						public constructor(implementation: {
							getLastLocation(param0: LocationEngineCallback<LocationEngineResult>): void;
							requestLocationUpdates(param0: LocationEngineRequest, param1: LocationEngineCallback<LocationEngineResult>, param2: globalAndroid.os.Looper): void;
							requestLocationUpdates(param0: LocationEngineRequest, param1: globalAndroid.app.PendingIntent): void;
							removeLocationUpdates(param0: LocationEngineCallback<LocationEngineResult>): void;
							removeLocationUpdates(param0: globalAndroid.app.PendingIntent): void;
						});
						public constructor();
						public removeLocationUpdates(param0: LocationEngineCallback<LocationEngineResult>): void;
						public requestLocationUpdates(param0: LocationEngineRequest, param1: globalAndroid.app.PendingIntent): void;
						public getLastLocation(param0: LocationEngineCallback<LocationEngineResult>): void;
						public removeLocationUpdates(param0: globalAndroid.app.PendingIntent): void;
						public requestLocationUpdates(param0: LocationEngineRequest, param1: LocationEngineCallback<LocationEngineResult>, param2: globalAndroid.os.Looper): void;
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module android {
			export module core {
				export module location {
					export class LocationEngineCallback<T>  extends java.lang.Object {
						public static class: java.lang.Class<LocationEngineCallback<any>>;
						/**
						 * Constructs a new instance of the LocationEngineCallback<any> interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
						 */
						public constructor(implementation: {
							onSuccess(param0: T): void;
							onFailure(param0: java.lang.Exception): void;
						});
						public constructor();
						public onFailure(param0: java.lang.Exception): void;
						public onSuccess(param0: T): void;
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module android {
			export module core {
				export module location {
					export class LocationEngineImpl<T>  extends java.lang.Object {
						public static class: java.lang.Class<LocationEngineImpl<any>>;
						/**
						 * Constructs a new instance of the LocationEngineImpl<any> interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
						 */
						public constructor(implementation: {
							createListener(param0: LocationEngineCallback<LocationEngineResult>): T;
							getLastLocation(param0: LocationEngineCallback<LocationEngineResult>): void;
							requestLocationUpdates(param0: LocationEngineRequest, param1: T, param2: globalAndroid.os.Looper): void;
							requestLocationUpdates(param0: LocationEngineRequest, param1: globalAndroid.app.PendingIntent): void;
							removeLocationUpdates(param0: T): void;
							removeLocationUpdates(param0: globalAndroid.app.PendingIntent): void;
						});
						public constructor();
						public requestLocationUpdates(param0: LocationEngineRequest, param1: T, param2: globalAndroid.os.Looper): void;
						public requestLocationUpdates(param0: LocationEngineRequest, param1: globalAndroid.app.PendingIntent): void;
						public removeLocationUpdates(param0: T): void;
						public createListener(param0: LocationEngineCallback<LocationEngineResult>): T;
						public getLastLocation(param0: LocationEngineCallback<LocationEngineResult>): void;
						public removeLocationUpdates(param0: globalAndroid.app.PendingIntent): void;
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module android {
			export module core {
				export module location {
					export class LocationEngineProvider extends java.lang.Object {
						public static class: java.lang.Class<LocationEngineProvider>;
						/** @deprecated */
						public static getBestLocationEngine(param0: globalAndroid.content.Context, param1: boolean): LocationEngine;
						public static getBestLocationEngine(param0: globalAndroid.content.Context): LocationEngine;
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module android {
			export module core {
				export module location {
					export class LocationEngineProxy<T>  extends LocationEngine {
						public static class: java.lang.Class<LocationEngineProxy<any>>;
						public removeLocationUpdates(param0: LocationEngineCallback<LocationEngineResult>): void;
						public requestLocationUpdates(param0: LocationEngineRequest, param1: globalAndroid.app.PendingIntent): void;
						public getLastLocation(param0: LocationEngineCallback<LocationEngineResult>): void;
						public removeLocationUpdates(param0: globalAndroid.app.PendingIntent): void;
						public requestLocationUpdates(param0: LocationEngineRequest, param1: LocationEngineCallback<LocationEngineResult>, param2: globalAndroid.os.Looper): void;
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module android {
			export module core {
				export module location {
					export class LocationEngineRequest extends java.lang.Object {
						public static class: java.lang.Class<LocationEngineRequest>;
						public static PRIORITY_HIGH_ACCURACY: number;
						public static PRIORITY_BALANCED_POWER_ACCURACY: number;
						public static PRIORITY_LOW_POWER: number;
						public static PRIORITY_NO_POWER: number;
						public getDisplacement(): number;
						public getPriority(): number;
						public getInterval(): number;
						public getMaxWaitTime(): number;
						public getFastestInterval(): number;
					}
					export module LocationEngineRequest {
						export class Builder extends java.lang.Object {
							public static class: java.lang.Class<LocationEngineRequest.Builder>;
							public setFastestInterval(param0: number): LocationEngineRequest.Builder;
							public build(): LocationEngineRequest;
							public setDisplacement(param0: number): LocationEngineRequest.Builder;
							public setPriority(param0: number): LocationEngineRequest.Builder;
							public setMaxWaitTime(param0: number): LocationEngineRequest.Builder;
							public constructor(param0: number);
						}
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module android {
			export module core {
				export module location {
					export class LocationEngineResult extends java.lang.Object {
						public static class: java.lang.Class<LocationEngineResult>;
						public static extractResult(param0: globalAndroid.content.Intent): LocationEngineResult;
						public static create(param0: globalAndroid.location.Location): LocationEngineResult;
						public static create(param0: java.util.List<globalAndroid.location.Location>): LocationEngineResult;
						public getLocations(): java.util.List<globalAndroid.location.Location>;
						public getLastLocation(): globalAndroid.location.Location;
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module android {
			export module core {
				export module location {
					export class MapboxFusedLocationEngineImpl extends AndroidLocationEngineImpl {
						public static class: java.lang.Class<MapboxFusedLocationEngineImpl>;
						public createListener(param0: LocationEngineCallback<LocationEngineResult>): any;
						public removeLocationUpdates(param0: any): void;
						public createListener(param0: LocationEngineCallback<LocationEngineResult>): globalAndroid.location.LocationListener;
						public requestLocationUpdates(param0: LocationEngineRequest, param1: any, param2: globalAndroid.os.Looper): void;
						public requestLocationUpdates(param0: LocationEngineRequest, param1: globalAndroid.app.PendingIntent): void;
						public requestLocationUpdates(param0: LocationEngineRequest, param1: globalAndroid.location.LocationListener, param2: globalAndroid.os.Looper): void;
						public getLastLocation(param0: LocationEngineCallback<LocationEngineResult>): void;
						public removeLocationUpdates(param0: globalAndroid.location.LocationListener): void;
						public removeLocationUpdates(param0: globalAndroid.app.PendingIntent): void;
					}
					export module MapboxFusedLocationEngineImpl {
						export class MapboxLocationEngineCallbackTransport extends java.lang.Object implements globalAndroid.location.LocationListener {
							public static class: java.lang.Class<MapboxFusedLocationEngineImpl.MapboxLocationEngineCallbackTransport>;
							public onProviderDisabled(param0: string): void;
							public onStatusChanged(param0: string, param1: number, param2: globalAndroid.os.Bundle): void;
							public onLocationChanged(param0: globalAndroid.location.Location): void;
							public onProviderEnabled(param0: string): void;
						}
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module android {
			export module core {
				export module location {
					export class Utils extends java.lang.Object {
						public static class: java.lang.Class<Utils>;
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module android {
			export module core {
				export module metrics {
					export abstract class AbstractCompositeMetrics extends java.lang.Object {
						public static class: java.lang.Class<AbstractCompositeMetrics>;
						public add(param0: string, param1: number): void;
						public getMetrics(param0: string): Metrics;
						public constructor(param0: number);
						public nextMetrics(param0: number, param1: number): Metrics;
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module android {
			export module core {
				export module metrics {
					export class Metrics extends java.lang.Object {
						public static class: java.lang.Class<Metrics>;
						/**
						 * Constructs a new instance of the Metrics interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
						 */
						public constructor(implementation: {
							add(param0: number): void;
							getValue(): number;
							getStart(): number;
							getEnd(): number;
						});
						public constructor();
						public add(param0: number): void;
						public getStart(): number;
						public getValue(): number;
						public getEnd(): number;
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module android {
			export module core {
				export module metrics {
					export class MetricsImpl extends java.lang.Object implements Metrics {
						public static class: java.lang.Class<MetricsImpl>;
						public add(param0: number): void;
						public getStart(): number;
						public constructor(param0: number, param1: number);
						public getValue(): number;
						public getEnd(): number;
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module android {
			export module core {
				export module permissions {
					export class PermissionsListener extends java.lang.Object {
						public static class: java.lang.Class<PermissionsListener>;
						/**
						 * Constructs a new instance of the PermissionsListener interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
						 */
						public constructor(implementation: {
							onExplanationNeeded(param0: java.util.List<string>): void;
							onPermissionResult(param0: boolean): void;
						});
						public constructor();
						public onExplanationNeeded(param0: java.util.List<string>): void;
						public onPermissionResult(param0: boolean): void;
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module android {
			export module core {
				export module permissions {
					export class PermissionsManager extends java.lang.Object {
						public static class: java.lang.Class<PermissionsManager>;
						public setListener(param0: PermissionsListener): void;
						public static areLocationPermissionsGranted(param0: globalAndroid.content.Context): boolean;
						public getListener(): PermissionsListener;
						public constructor(param0: PermissionsListener);
						public onRequestPermissionsResult(param0: number, param1: native.Array<string>, param2: native.Array<number>): void;
						public static areRuntimePermissionsRequired(): boolean;
						public requestLocationPermissions(param0: globalAndroid.app.Activity): void;
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module android {
			export module gestures {
				export class AndroidGesturesManager extends java.lang.Object {
					public static class: java.lang.Class<AndroidGesturesManager>;
					public static GESTURE_TYPE_SCROLL: number;
					public static GESTURE_TYPE_SCALE: number;
					public static GESTURE_TYPE_ROTATE: number;
					public static GESTURE_TYPE_SHOVE: number;
					public static GESTURE_TYPE_MULTI_FINGER_TAP: number;
					public static GESTURE_TYPE_SINGLE_TAP_UP: number;
					public static GESTURE_TYPE_LONG_PRESS: number;
					public static GESTURE_TYPE_FLING: number;
					public static GESTURE_TYPE_SHOW_PRESS: number;
					public static GESTURE_TYPE_DOWN: number;
					public static GESTURE_TYPE_DOUBLE_TAP: number;
					public static GESTURE_TYPE_DOUBLE_TAP_EVENT: number;
					public static GESTURE_TYPE_SINGLE_TAP_CONFIRMED: number;
					public static GESTURE_TYPE_MOVE: number;
					public static GESTURE_TYPE_SIDEWAYS_SHOVE: number;
					public static GESTURE_TYPE_QUICK_SCALE: number;
					public constructor(param0: globalAndroid.content.Context, param1: native.Array<java.util.Set<java.lang.Integer>>);
					public getSidewaysShoveGestureDetector(): SidewaysShoveGestureDetector;
					public getRotateGestureDetector(): RotateGestureDetector;
					public setShoveGestureListener(param0: ShoveGestureDetector.OnShoveGestureListener): void;
					public setMultiFingerTapGestureListener(param0: MultiFingerTapGestureDetector.OnMultiFingerTapGestureListener): void;
					public removeStandardScaleGestureListener(): void;
					public removeRotateGestureListener(): void;
					public getMultiFingerTapGestureDetector(): MultiFingerTapGestureDetector;
					public setSidewaysShoveGestureListener(param0: SidewaysShoveGestureDetector.OnSidewaysShoveGestureListener): void;
					public removeMultiFingerTapGestureListener(): void;
					public setMutuallyExclusiveGestures(param0: java.util.List<java.util.Set<java.lang.Integer>>): void;
					public removeStandardGestureListener(): void;
					public getStandardGestureDetector(): StandardGestureDetector;
					public removeShoveGestureListener(): void;
					public removeMoveGestureListener(): void;
					public setStandardScaleGestureListener(param0: StandardScaleGestureDetector.StandardOnScaleGestureListener): void;
					public setStandardGestureListener(param0: StandardGestureDetector.StandardOnGestureListener): void;
					public getMutuallyExclusiveGestures(): java.util.List<java.util.Set<java.lang.Integer>>;
					public constructor(param0: globalAndroid.content.Context);
					public constructor(param0: globalAndroid.content.Context, param1: java.util.List<java.util.Set<java.lang.Integer>>, param2: boolean);
					public removeSidewaysShoveGestureListener(): void;
					public getMoveGestureDetector(): MoveGestureDetector;
					public constructor(param0: globalAndroid.content.Context, param1: boolean);
					public setRotateGestureListener(param0: RotateGestureDetector.OnRotateGestureListener): void;
					public onTouchEvent(param0: globalAndroid.view.MotionEvent): boolean;
					public setMutuallyExclusiveGestures(param0: native.Array<java.util.Set<java.lang.Integer>>): void;
					public getDetectors(): java.util.List<BaseGesture<any>>;
					public getStandardScaleGestureDetector(): StandardScaleGestureDetector;
					public setMoveGestureListener(param0: MoveGestureDetector.OnMoveGestureListener): void;
					public getShoveGestureDetector(): ShoveGestureDetector;
				}
				export module AndroidGesturesManager {
					export class GestureType extends java.lang.Object implements java.lang.annotation.Annotation {
						public static class: java.lang.Class<AndroidGesturesManager.GestureType>;
						/**
						 * Constructs a new instance of the AndroidGesturesManager$GestureType interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
						 */
						public constructor(implementation: {
							equals(param0: any): boolean;
							hashCode(): number;
							toString(): string;
							annotationType(): java.lang.Class<any>;
						});
						public constructor();
						public equals(param0: any): boolean;
						public hashCode(): number;
						public toString(): string;
						public annotationType(): java.lang.Class<any>;
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module android {
			export module gestures {
				export abstract class BaseGesture<L>  extends java.lang.Object {
					public static class: java.lang.Class<BaseGesture<any>>;
					public context: globalAndroid.content.Context;
					public windowManager: globalAndroid.view.WindowManager;
					public listener: L;
					public getCurrentEvent(): globalAndroid.view.MotionEvent;
					public setEnabled(param0: boolean): void;
					public getGestureDuration(): number;
					public canExecute(param0: number): boolean;
					public removeListener(): void;
					public getPreviousEvent(): globalAndroid.view.MotionEvent;
					public setListener(param0: L): void;
					public onTouchEvent(param0: globalAndroid.view.MotionEvent): boolean;
					public analyzeEvent(param0: globalAndroid.view.MotionEvent): boolean;
					public constructor(param0: globalAndroid.content.Context, param1: AndroidGesturesManager);
					public isEnabled(): boolean;
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module android {
			export module gestures {
				export class BuildConfig extends java.lang.Object {
					public static class: java.lang.Class<BuildConfig>;
					public static DEBUG: boolean;
					public static APPLICATION_ID: string;
					public static BUILD_TYPE: string;
					public static FLAVOR: string;
					public static VERSION_CODE: number;
					public static VERSION_NAME: string;
					public constructor();
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module android {
			export module gestures {
				export class Constants extends java.lang.Object {
					public static class: java.lang.Class<Constants>;
					public static DEFAULT_ROTATE_ANGLE_THRESHOLD: number;
					public static DEFAULT_SHOVE_MAX_ANGLE: number;
					public static DEFAULT_MULTI_TAP_TIME_THRESHOLD: number;
					public constructor();
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module android {
			export module gestures {
				export class MoveDistancesObject extends java.lang.Object {
					public static class: java.lang.Class<MoveDistancesObject>;
					public getDistanceXSinceLast(): number;
					public addNewPosition(param0: number, param1: number): void;
					public getCurrentX(): number;
					public getInitialY(): number;
					public getDistanceYSinceLast(): number;
					public getInitialX(): number;
					public getPreviousY(): number;
					public getPreviousX(): number;
					public getCurrentY(): number;
					public getDistanceXSinceStart(): number;
					public getDistanceYSinceStart(): number;
					public constructor(param0: number, param1: number);
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module android {
			export module gestures {
				export class MoveGestureDetector extends ProgressiveGesture<MoveGestureDetector.OnMoveGestureListener> {
					public static class: java.lang.Class<MoveGestureDetector>;
					public reset(): void;
					public setMoveThresholdResource(param0: number): void;
					public canExecute(param0: number): boolean;
					public getMoveThreshold(): number;
					public setMoveThresholdRect(param0: globalAndroid.graphics.RectF): void;
					public getLastDistanceY(): number;
					public gestureStopped(): void;
					public constructor(param0: globalAndroid.content.Context, param1: AndroidGesturesManager);
					public setMoveThreshold(param0: number): void;
					public getMoveObject(param0: number): MoveDistancesObject;
					public getMoveThresholdRect(): globalAndroid.graphics.RectF;
					public getRequiredPointersCount(): number;
					public analyzeMovement(): boolean;
					public getLastDistanceX(): number;
					public provideHandledTypes(): java.util.Set<java.lang.Integer>;
					public analyzeEvent(param0: globalAndroid.view.MotionEvent): boolean;
				}
				export module MoveGestureDetector {
					export class OnMoveGestureListener extends java.lang.Object {
						public static class: java.lang.Class<MoveGestureDetector.OnMoveGestureListener>;
						/**
						 * Constructs a new instance of the MoveGestureDetector$OnMoveGestureListener interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
						 */
						public constructor(implementation: {
							onMoveBegin(param0: MoveGestureDetector): boolean;
							onMove(param0: MoveGestureDetector, param1: number, param2: number): boolean;
							onMoveEnd(param0: MoveGestureDetector, param1: number, param2: number): void;
						});
						public constructor();
						public onMoveEnd(param0: MoveGestureDetector, param1: number, param2: number): void;
						public onMove(param0: MoveGestureDetector, param1: number, param2: number): boolean;
						public onMoveBegin(param0: MoveGestureDetector): boolean;
					}
					export class SimpleOnMoveGestureListener extends java.lang.Object implements MoveGestureDetector.OnMoveGestureListener {
						public static class: java.lang.Class<MoveGestureDetector.SimpleOnMoveGestureListener>;
						public onMoveEnd(param0: MoveGestureDetector, param1: number, param2: number): void;
						public onMove(param0: MoveGestureDetector, param1: number, param2: number): boolean;
						public constructor();
						public onMoveBegin(param0: MoveGestureDetector): boolean;
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module android {
			export module gestures {
				export class MultiFingerDistancesObject extends java.lang.Object {
					public static class: java.lang.Class<MultiFingerDistancesObject>;
					public constructor(param0: number, param1: number, param2: number, param3: number);
					public getCurrFingersDiffX(): number;
					public getPrevFingersDiffXY(): number;
					public getPrevFingersDiffY(): number;
					public getPrevFingersDiffX(): number;
					public getCurrFingersDiffXY(): number;
					public getCurrFingersDiffY(): number;
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module android {
			export module gestures {
				export abstract class MultiFingerGesture<L>  extends BaseGesture<any> {
					public static class: java.lang.Class<MultiFingerGesture<any>>;
					public getCurrentSpanY(param0: number, param1: number): number;
					public getCurrentSpan(param0: number, param1: number): number;
					public isSloppyGesture(): boolean;
					public reset(): void;
					public canExecute(param0: number): boolean;
					public getCurrentSpanX(param0: number, param1: number): number;
					public constructor(param0: globalAndroid.content.Context, param1: AndroidGesturesManager);
					public setSpanThreshold(param0: number): void;
					public setSpanThresholdResource(param0: number): void;
					public getPointersCount(): number;
					public getSpanThreshold(): number;
					public getRequiredPointersCount(): number;
					public analyzeMovement(): boolean;
					public getPreviousSpan(param0: number, param1: number): number;
					public getPreviousSpanX(param0: number, param1: number): number;
					public analyzeEvent(param0: globalAndroid.view.MotionEvent): boolean;
					public getPreviousSpanY(param0: number, param1: number): number;
					public getFocalPoint(): globalAndroid.graphics.PointF;
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module android {
			export module gestures {
				export class MultiFingerTapGestureDetector extends MultiFingerGesture<MultiFingerTapGestureDetector.OnMultiFingerTapGestureListener> {
					public static class: java.lang.Class<MultiFingerTapGestureDetector>;
					public setMultiFingerTapMovementThresholdResource(param0: number): void;
					public reset(): void;
					public canExecute(param0: number): boolean;
					public getMultiFingerTapMovementThreshold(): number;
					public getMultiFingerTapTimeThreshold(): number;
					public setMultiFingerTapTimeThreshold(param0: number): void;
					public analyzeEvent(param0: globalAndroid.view.MotionEvent): boolean;
					public setMultiFingerTapMovementThreshold(param0: number): void;
					public constructor(param0: globalAndroid.content.Context, param1: AndroidGesturesManager);
				}
				export module MultiFingerTapGestureDetector {
					export class OnMultiFingerTapGestureListener extends java.lang.Object {
						public static class: java.lang.Class<MultiFingerTapGestureDetector.OnMultiFingerTapGestureListener>;
						/**
						 * Constructs a new instance of the MultiFingerTapGestureDetector$OnMultiFingerTapGestureListener interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
						 */
						public constructor(implementation: {
							onMultiFingerTap(param0: MultiFingerTapGestureDetector, param1: number): boolean;
						});
						public constructor();
						public onMultiFingerTap(param0: MultiFingerTapGestureDetector, param1: number): boolean;
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module android {
			export module gestures {
				export class PermittedActionsGuard extends java.lang.Object {
					public static class: java.lang.Class<PermittedActionsGuard>;
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module android {
			export module gestures {
				export class PointerDistancePair extends globalAndroid.util.Pair<java.lang.Integer,java.lang.Integer> {
					public static class: java.lang.Class<PointerDistancePair>;
					public equals(param0: any): boolean;
					public constructor(param0: java.lang.Integer, param1: java.lang.Integer);
					public constructor(param0: any, param1: any);
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module android {
			export module gestures {
				export abstract class ProgressiveGesture<L>  extends MultiFingerGesture<any> {
					public static class: java.lang.Class<ProgressiveGesture<any>>;
					public setEnabled(param0: boolean): void;
					public isInProgress(): boolean;
					public interrupt(): void;
					public gestureStopped(): void;
					public provideHandledTypes(): java.util.Set<java.lang.Integer>;
					public analyzeEvent(param0: globalAndroid.view.MotionEvent): boolean;
					public constructor(param0: globalAndroid.content.Context, param1: AndroidGesturesManager);
					public gestureStarted(): void;
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module android {
			export module gestures {
				export class RotateGestureDetector extends ProgressiveGesture<RotateGestureDetector.OnRotateGestureListener> {
					public static class: java.lang.Class<RotateGestureDetector>;
					public analyzeMovement(): boolean;
					public reset(): void;
					public canExecute(param0: number): boolean;
					public getAngleThreshold(): number;
					public gestureStopped(): void;
					public provideHandledTypes(): java.util.Set<java.lang.Integer>;
					public getDeltaSinceStart(): number;
					public constructor(param0: globalAndroid.content.Context, param1: AndroidGesturesManager);
					public getDeltaSinceLast(): number;
					public setAngleThreshold(param0: number): void;
				}
				export module RotateGestureDetector {
					export class OnRotateGestureListener extends java.lang.Object {
						public static class: java.lang.Class<RotateGestureDetector.OnRotateGestureListener>;
						/**
						 * Constructs a new instance of the RotateGestureDetector$OnRotateGestureListener interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
						 */
						public constructor(implementation: {
							onRotateBegin(param0: RotateGestureDetector): boolean;
							onRotate(param0: RotateGestureDetector, param1: number, param2: number): boolean;
							onRotateEnd(param0: RotateGestureDetector, param1: number, param2: number, param3: number): void;
						});
						public constructor();
						public onRotateBegin(param0: RotateGestureDetector): boolean;
						public onRotate(param0: RotateGestureDetector, param1: number, param2: number): boolean;
						public onRotateEnd(param0: RotateGestureDetector, param1: number, param2: number, param3: number): void;
					}
					export class SimpleOnRotateGestureListener extends java.lang.Object implements RotateGestureDetector.OnRotateGestureListener {
						public static class: java.lang.Class<RotateGestureDetector.SimpleOnRotateGestureListener>;
						public constructor();
						public onRotateBegin(param0: RotateGestureDetector): boolean;
						public onRotate(param0: RotateGestureDetector, param1: number, param2: number): boolean;
						public onRotateEnd(param0: RotateGestureDetector, param1: number, param2: number, param3: number): void;
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module android {
			export module gestures {
				export class ShoveGestureDetector extends ProgressiveGesture<ShoveGestureDetector.OnShoveGestureListener> {
					public static class: java.lang.Class<ShoveGestureDetector>;
					public setPixelDeltaThreshold(param0: number): void;
					public setMaxShoveAngle(param0: number): void;
					public isSloppyGesture(): boolean;
					public reset(): void;
					public canExecute(param0: number): boolean;
					public getDeltaPixelSinceLast(): number;
					public gestureStopped(): void;
					public getMaxShoveAngle(): number;
					public constructor(param0: globalAndroid.content.Context, param1: AndroidGesturesManager);
					public getDeltaPixelsSinceStart(): number;
					public getPixelDeltaThreshold(): number;
					public analyzeMovement(): boolean;
					public provideHandledTypes(): java.util.Set<java.lang.Integer>;
					public setPixelDeltaThresholdResource(param0: number): void;
				}
				export module ShoveGestureDetector {
					export class OnShoveGestureListener extends java.lang.Object {
						public static class: java.lang.Class<ShoveGestureDetector.OnShoveGestureListener>;
						/**
						 * Constructs a new instance of the ShoveGestureDetector$OnShoveGestureListener interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
						 */
						public constructor(implementation: {
							onShoveBegin(param0: ShoveGestureDetector): boolean;
							onShove(param0: ShoveGestureDetector, param1: number, param2: number): boolean;
							onShoveEnd(param0: ShoveGestureDetector, param1: number, param2: number): void;
						});
						public constructor();
						public onShove(param0: ShoveGestureDetector, param1: number, param2: number): boolean;
						public onShoveBegin(param0: ShoveGestureDetector): boolean;
						public onShoveEnd(param0: ShoveGestureDetector, param1: number, param2: number): void;
					}
					export class SimpleOnShoveGestureListener extends java.lang.Object implements ShoveGestureDetector.OnShoveGestureListener {
						public static class: java.lang.Class<ShoveGestureDetector.SimpleOnShoveGestureListener>;
						public constructor();
						public onShove(param0: ShoveGestureDetector, param1: number, param2: number): boolean;
						public onShoveBegin(param0: ShoveGestureDetector): boolean;
						public onShoveEnd(param0: ShoveGestureDetector, param1: number, param2: number): void;
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module android {
			export module gestures {
				export class SidewaysShoveGestureDetector extends ProgressiveGesture<SidewaysShoveGestureDetector.OnSidewaysShoveGestureListener> {
					public static class: java.lang.Class<SidewaysShoveGestureDetector>;
					public setPixelDeltaThreshold(param0: number): void;
					public setMaxShoveAngle(param0: number): void;
					public isSloppyGesture(): boolean;
					public reset(): void;
					public canExecute(param0: number): boolean;
					public getDeltaPixelSinceLast(): number;
					public gestureStopped(): void;
					public getMaxShoveAngle(): number;
					public constructor(param0: globalAndroid.content.Context, param1: AndroidGesturesManager);
					public getDeltaPixelsSinceStart(): number;
					public getPixelDeltaThreshold(): number;
					public analyzeMovement(): boolean;
					public provideHandledTypes(): java.util.Set<java.lang.Integer>;
					public setPixelDeltaThresholdResource(param0: number): void;
				}
				export module SidewaysShoveGestureDetector {
					export class OnSidewaysShoveGestureListener extends java.lang.Object {
						public static class: java.lang.Class<SidewaysShoveGestureDetector.OnSidewaysShoveGestureListener>;
						/**
						 * Constructs a new instance of the SidewaysShoveGestureDetector$OnSidewaysShoveGestureListener interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
						 */
						public constructor(implementation: {
							onSidewaysShoveBegin(param0: SidewaysShoveGestureDetector): boolean;
							onSidewaysShove(param0: SidewaysShoveGestureDetector, param1: number, param2: number): boolean;
							onSidewaysShoveEnd(param0: SidewaysShoveGestureDetector, param1: number, param2: number): void;
						});
						public constructor();
						public onSidewaysShoveEnd(param0: SidewaysShoveGestureDetector, param1: number, param2: number): void;
						public onSidewaysShove(param0: SidewaysShoveGestureDetector, param1: number, param2: number): boolean;
						public onSidewaysShoveBegin(param0: SidewaysShoveGestureDetector): boolean;
					}
					export class SimpleOnSidewaysShoveGestureListener extends java.lang.Object implements SidewaysShoveGestureDetector.OnSidewaysShoveGestureListener {
						public static class: java.lang.Class<SidewaysShoveGestureDetector.SimpleOnSidewaysShoveGestureListener>;
						public constructor();
						public onSidewaysShoveEnd(param0: SidewaysShoveGestureDetector, param1: number, param2: number): void;
						public onSidewaysShove(param0: SidewaysShoveGestureDetector, param1: number, param2: number): boolean;
						public onSidewaysShoveBegin(param0: SidewaysShoveGestureDetector): boolean;
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module android {
			export module gestures {
				export class StandardGestureDetector extends BaseGesture<StandardGestureDetector.StandardOnGestureListener> {
					public static class: java.lang.Class<StandardGestureDetector>;
					public isLongpressEnabled(): boolean;
					public analyzeEvent(param0: globalAndroid.view.MotionEvent): boolean;
					public constructor(param0: globalAndroid.content.Context, param1: AndroidGesturesManager);
					public setIsLongpressEnabled(param0: boolean): void;
				}
				export module StandardGestureDetector {
					export class SimpleStandardOnGestureListener extends java.lang.Object implements StandardGestureDetector.StandardOnGestureListener {
						public static class: java.lang.Class<StandardGestureDetector.SimpleStandardOnGestureListener>;
						public constructor();
						public onDown(param0: globalAndroid.view.MotionEvent): boolean;
						public onSingleTapConfirmed(param0: globalAndroid.view.MotionEvent): boolean;
						public onDoubleTap(param0: globalAndroid.view.MotionEvent): boolean;
						public onShowPress(param0: globalAndroid.view.MotionEvent): void;
						public onDoubleTapEvent(param0: globalAndroid.view.MotionEvent): boolean;
						public onSingleTapUp(param0: globalAndroid.view.MotionEvent): boolean;
						public onScroll(param0: globalAndroid.view.MotionEvent, param1: globalAndroid.view.MotionEvent, param2: number, param3: number): boolean;
						public onFling(param0: globalAndroid.view.MotionEvent, param1: globalAndroid.view.MotionEvent, param2: number, param3: number): boolean;
						public onLongPress(param0: globalAndroid.view.MotionEvent): void;
					}
					export class StandardOnGestureListener extends java.lang.Object implements globalAndroid.view.GestureDetector.OnGestureListener, globalAndroid.view.GestureDetector.OnDoubleTapListener {
						public static class: java.lang.Class<StandardGestureDetector.StandardOnGestureListener>;
						/**
						 * Constructs a new instance of the StandardGestureDetector$StandardOnGestureListener interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
						 */
						public constructor(implementation: {
							onDown(param0: globalAndroid.view.MotionEvent): boolean;
							onShowPress(param0: globalAndroid.view.MotionEvent): void;
							onSingleTapUp(param0: globalAndroid.view.MotionEvent): boolean;
							onScroll(param0: globalAndroid.view.MotionEvent, param1: globalAndroid.view.MotionEvent, param2: number, param3: number): boolean;
							onLongPress(param0: globalAndroid.view.MotionEvent): void;
							onFling(param0: globalAndroid.view.MotionEvent, param1: globalAndroid.view.MotionEvent, param2: number, param3: number): boolean;
							onSingleTapConfirmed(param0: globalAndroid.view.MotionEvent): boolean;
							onDoubleTap(param0: globalAndroid.view.MotionEvent): boolean;
							onDoubleTapEvent(param0: globalAndroid.view.MotionEvent): boolean;
						});
						public constructor();
						public onDown(param0: globalAndroid.view.MotionEvent): boolean;
						public onSingleTapConfirmed(param0: globalAndroid.view.MotionEvent): boolean;
						public onShowPress(param0: globalAndroid.view.MotionEvent): void;
						public onDoubleTap(param0: globalAndroid.view.MotionEvent): boolean;
						public onSingleTapUp(param0: globalAndroid.view.MotionEvent): boolean;
						public onScroll(param0: globalAndroid.view.MotionEvent, param1: globalAndroid.view.MotionEvent, param2: number, param3: number): boolean;
						public onDoubleTapEvent(param0: globalAndroid.view.MotionEvent): boolean;
						public onFling(param0: globalAndroid.view.MotionEvent, param1: globalAndroid.view.MotionEvent, param2: number, param3: number): boolean;
						public onLongPress(param0: globalAndroid.view.MotionEvent): void;
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module android {
			export module gestures {
				export class StandardScaleGestureDetector extends ProgressiveGesture<StandardScaleGestureDetector.StandardOnScaleGestureListener> {
					public static class: java.lang.Class<StandardScaleGestureDetector>;
					public getCurrentSpan(): number;
					public getCurrentSpanY(param0: number, param1: number): number;
					public getPreviousSpanX(): number;
					public getStartSpan(): number;
					public getCurrentSpanX(param0: number, param1: number): number;
					public gestureStopped(): void;
					public constructor(param0: globalAndroid.content.Context, param1: AndroidGesturesManager);
					public setSpanSinceStartThresholdResource(param0: number): void;
					public getStartSpanY(): number;
					public getStartSpanX(): number;
					public getRequiredPointersCount(): number;
					public getSpanSinceStartThreshold(): number;
					public getPreviousSpan(param0: number, param1: number): number;
					public getScaleFactor(): number;
					public getCurrentSpanX(): number;
					public provideHandledTypes(): java.util.Set<java.lang.Integer>;
					public analyzeEvent(param0: globalAndroid.view.MotionEvent): boolean;
					public setSpanSinceStartThreshold(param0: number): void;
					public getCurrentSpan(param0: number, param1: number): number;
					public reset(): void;
					public isSloppyGesture(): boolean;
					public getCurrentSpanY(): number;
					public isScalingOut(): boolean;
					public analyzeMovement(): boolean;
					public getPreviousSpanX(param0: number, param1: number): number;
					public getPreviousSpan(): number;
					public getPreviousSpanY(): number;
					public getPreviousSpanY(param0: number, param1: number): number;
				}
				export module StandardScaleGestureDetector {
					export class SimpleStandardOnScaleGestureListener extends java.lang.Object implements StandardScaleGestureDetector.StandardOnScaleGestureListener {
						public static class: java.lang.Class<StandardScaleGestureDetector.SimpleStandardOnScaleGestureListener>;
						public onScaleEnd(param0: StandardScaleGestureDetector, param1: number, param2: number): void;
						public constructor();
						public onScaleBegin(param0: StandardScaleGestureDetector): boolean;
						public onScale(param0: StandardScaleGestureDetector): boolean;
					}
					export class StandardOnScaleGestureListener extends java.lang.Object {
						public static class: java.lang.Class<StandardScaleGestureDetector.StandardOnScaleGestureListener>;
						/**
						 * Constructs a new instance of the StandardScaleGestureDetector$StandardOnScaleGestureListener interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
						 */
						public constructor(implementation: {
							onScaleBegin(param0: StandardScaleGestureDetector): boolean;
							onScale(param0: StandardScaleGestureDetector): boolean;
							onScaleEnd(param0: StandardScaleGestureDetector, param1: number, param2: number): void;
						});
						public constructor();
						public onScaleEnd(param0: StandardScaleGestureDetector, param1: number, param2: number): void;
						public onScaleBegin(param0: StandardScaleGestureDetector): boolean;
						public onScale(param0: StandardScaleGestureDetector): boolean;
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module android {
			export module gestures {
				export class Utils extends java.lang.Object {
					public static class: java.lang.Class<Utils>;
					public static dpToPx(param0: number): number;
					public constructor();
					public static determineFocalPoint(param0: globalAndroid.view.MotionEvent): globalAndroid.graphics.PointF;
					public static getRawX(param0: globalAndroid.view.MotionEvent, param1: number): number;
					public static getRawY(param0: globalAndroid.view.MotionEvent, param1: number): number;
					public static pxToDp(param0: number): number;
					public static pxToMm(param0: number, param1: globalAndroid.content.Context): number;
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module android {
			export module telemetry {
				export class AlarmReceiver extends globalAndroid.content.BroadcastReceiver {
					public static class: java.lang.Class<AlarmReceiver>;
					public onReceive(param0: globalAndroid.content.Context, param1: globalAndroid.content.Intent): void;
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module android {
			export module telemetry {
				export class AlarmSchedulerFlusher extends java.lang.Object implements SchedulerFlusher {
					public static class: java.lang.Class<AlarmSchedulerFlusher>;
					public register(): void;
					public schedule(param0: number): void;
					public unregister(): void;
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module android {
			export module telemetry {
				export class AppUserTurnstile extends Event implements globalAndroid.os.Parcelable {
					public static class: java.lang.Class<AppUserTurnstile>;
					public static CREATOR: globalAndroid.os.Parcelable.Creator<AppUserTurnstile>;
					public constructor(param0: string, param1: string);
					public constructor();
					public describeContents(): number;
					public setSkuId(param0: string): void;
					public getSkuId(): string;
					public writeToParcel(param0: globalAndroid.os.Parcel, param1: number): void;
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module android {
			export module telemetry {
				export class Attachment extends Event implements globalAndroid.os.Parcelable {
					public static class: java.lang.Class<Attachment>;
					public static CREATOR: globalAndroid.os.Parcelable.Creator<Attachment>;
					public constructor(param0: globalAndroid.os.Parcel);
					public constructor();
					public describeContents(): number;
					public getAttachments(): java.util.List<FileAttachment>;
					public addAttachment(param0: FileAttachment): void;
					public writeToParcel(param0: globalAndroid.os.Parcel, param1: number): void;
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module android {
			export module telemetry {
				export class AttachmentListener extends java.lang.Object {
					public static class: java.lang.Class<AttachmentListener>;
					/**
					 * Constructs a new instance of the AttachmentListener interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
					 */
					public constructor(implementation: {
						onAttachmentResponse(param0: string, param1: number, param2: java.util.List<string>): void;
						onAttachmentFailure(param0: string, param1: java.util.List<string>): void;
					});
					public constructor();
					public onAttachmentResponse(param0: string, param1: number, param2: java.util.List<string>): void;
					public onAttachmentFailure(param0: string, param1: java.util.List<string>): void;
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module android {
			export module telemetry {
				export class AttachmentMetadata extends java.lang.Object {
					public static class: java.lang.Class<AttachmentMetadata>;
					public constructor(param0: string, param1: string, param2: string, param3: string, param4: string);
					public getCreated(): string;
					public setSize(param0: number): void;
					public getFormat(): string;
					public getEndTime(): string;
					public getName(): string;
					public setEndTime(param0: string): void;
					public getSessionId(): string;
					public setStartTime(param0: string): void;
					public getFileId(): string;
					public getStartTime(): string;
					public getType(): string;
					public getSize(): java.lang.Integer;
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module android {
			export module telemetry {
				export class BuildConfig extends java.lang.Object {
					public static class: java.lang.Class<BuildConfig>;
					public static DEBUG: boolean;
					public static LIBRARY_PACKAGE_NAME: string;
					public static BUILD_TYPE: string;
					public static FLAVOR: string;
					public static VERSION_CODE: number;
					public static VERSION_NAME: string;
					public constructor();
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module android {
			export module telemetry {
				export class CertificateBlacklist extends java.lang.Object implements ConfigurationChangeHandler {
					public static class: java.lang.Class<CertificateBlacklist>;
					public onUpdate(param0: string): void;
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module android {
			export module telemetry {
				export class CertificatePinnerFactory extends java.lang.Object {
					public static class: java.lang.Class<CertificatePinnerFactory>;
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module android {
			export module telemetry {
				export class ChinaCertificatePins extends java.lang.Object {
					public static class: java.lang.Class<ChinaCertificatePins>;
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module android {
			export module telemetry {
				export class ChinaServerInformation extends java.lang.Object implements EnvironmentResolver {
					public static class: java.lang.Class<ChinaServerInformation>;
					public obtainServerInformation(param0: globalAndroid.os.Bundle): ServerInformation;
					public nextChain(param0: EnvironmentResolver): void;
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module android {
			export module telemetry {
				export class Clock extends java.lang.Object {
					public static class: java.lang.Class<Clock>;
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module android {
			export module telemetry {
				export class ComCertificatePins extends java.lang.Object {
					public static class: java.lang.Class<ComCertificatePins>;
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module android {
			export module telemetry {
				export class ComServerInformation extends java.lang.Object implements EnvironmentResolver {
					public static class: java.lang.Class<ComServerInformation>;
					public obtainServerInformation(param0: globalAndroid.os.Bundle): ServerInformation;
					public nextChain(param0: EnvironmentResolver): void;
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module android {
			export module telemetry {
				export class ConcurrentQueue<T>  extends java.lang.Object {
					public static class: java.lang.Class<ConcurrentQueue<any>>;
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module android {
			export module telemetry {
				export class ConfigurationChangeHandler extends java.lang.Object {
					public static class: java.lang.Class<ConfigurationChangeHandler>;
					/**
					 * Constructs a new instance of the ConfigurationChangeHandler interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
					 */
					public constructor(implementation: {
						onUpdate(param0: string): void;
					});
					public constructor();
					public onUpdate(param0: string): void;
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module android {
			export module telemetry {
				export class ConfigurationClient extends java.lang.Object {
					public static class: java.lang.Class<ConfigurationClient>;
					public onResponse(param0: any, param1: any): void;
					public onFailure(param0: any, param1: java.io.IOException): void;
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module android {
			export module telemetry {
				export class CrashEvent extends Event {
					public static class: java.lang.Class<CrashEvent>;
					public constructor(param0: string, param1: string);
					public constructor();
					public isValid(): boolean;
					public describeContents(): number;
					public getHash(): string;
					public writeToParcel(param0: globalAndroid.os.Parcel, param1: number): void;
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module android {
			export module telemetry {
				export class Environment {
					public static class: java.lang.Class<Environment>;
					public static STAGING: Environment;
					public static COM: Environment;
					public static CHINA: Environment;
					public static values(): native.Array<Environment>;
					public static valueOf(param0: string): Environment;
					public static valueOf(param0: java.lang.Class<any>, param1: string): java.lang.Enum<any>;
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module android {
			export module telemetry {
				export class EnvironmentChain extends java.lang.Object {
					public static class: java.lang.Class<EnvironmentChain>;
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module android {
			export module telemetry {
				export class EnvironmentResolver extends java.lang.Object {
					public static class: java.lang.Class<EnvironmentResolver>;
					/**
					 * Constructs a new instance of the EnvironmentResolver interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
					 */
					public constructor(implementation: {
						nextChain(param0: EnvironmentResolver): void;
						obtainServerInformation(param0: globalAndroid.os.Bundle): ServerInformation;
					});
					public constructor();
					public obtainServerInformation(param0: globalAndroid.os.Bundle): ServerInformation;
					public nextChain(param0: EnvironmentResolver): void;
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module android {
			export module telemetry {
				export abstract class Event extends java.lang.Object implements globalAndroid.os.Parcelable {
					public static class: java.lang.Class<Event>;
					public constructor();
					public describeContents(): number;
					public writeToParcel(param0: globalAndroid.os.Parcel, param1: number): void;
				}
				export module Event {
					export class Type {
						public static class: java.lang.Class<Event.Type>;
						public static TURNSTILE: Event.Type;
						public static MAP_LOAD: Event.Type;
						public static MAP_CLICK: Event.Type;
						public static MAP_DRAGEND: Event.Type;
						public static OFFLINE_DOWNLOAD_START: Event.Type;
						public static OFFLINE_DOWNLOAD_COMPLETE: Event.Type;
						public static LOCATION: Event.Type;
						public static NAV_DEPART: Event.Type;
						public static NAV_ARRIVE: Event.Type;
						public static NAV_CANCEL: Event.Type;
						public static NAV_REROUTE: Event.Type;
						public static NAV_FEEDBACK: Event.Type;
						public static NAV_FASTER_ROUTE: Event.Type;
						public static VIS_GENERAL: Event.Type;
						public static VIS_ATTACHMENT: Event.Type;
						public static VIS_OBJ_DETECTION: Event.Type;
						public static NO_OP: Event.Type;
						public static CRASH: Event.Type;
						public static values(): native.Array<Event.Type>;
						public static valueOf(param0: string): Event.Type;
						public static valueOf(param0: java.lang.Class<any>, param1: string): java.lang.Enum<any>;
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module android {
			export module telemetry {
				export class EventsQueue extends java.lang.Object {
					public static class: java.lang.Class<EventsQueue>;
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module android {
			export module telemetry {
				export class FileAttachment extends java.lang.Object {
					public static class: java.lang.Class<FileAttachment>;
					public getFileData(): FileData;
					public getAttachmentMetadata(): AttachmentMetadata;
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module android {
			export module telemetry {
				export class FileData extends java.lang.Object {
					public static class: java.lang.Class<FileData>;
					public getType(): any;
					public getFilePath(): string;
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module android {
			export module telemetry {
				export class FullQueueCallback extends java.lang.Object {
					public static class: java.lang.Class<FullQueueCallback>;
					/**
					 * Constructs a new instance of the FullQueueCallback interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
					 */
					public constructor(implementation: {
						onFullQueue(param0: java.util.List<Event>): void;
					});
					public constructor();
					public onFullQueue(param0: java.util.List<Event>): void;
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module android {
			export module telemetry {
				export class GzipRequestInterceptor extends java.lang.Object {
					public static class: java.lang.Class<GzipRequestInterceptor>;
					public intercept(param0: any): any;
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module android {
			export module telemetry {
				export class LocationEvent extends Event implements globalAndroid.os.Parcelable {
					public static class: java.lang.Class<LocationEvent>;
					public static CREATOR: globalAndroid.os.Parcelable.Creator<LocationEvent>;
					public constructor(param0: string, param1: number, param2: number, param3: string);
					public setAccuracy(param0: java.lang.Float): void;
					public constructor();
					public describeContents(): number;
					public writeToParcel(param0: globalAndroid.os.Parcel, param1: number): void;
					public setAltitude(param0: java.lang.Double): void;
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module android {
			export module telemetry {
				export class Logger extends java.lang.Object {
					public static class: java.lang.Class<Logger>;
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module android {
			export module telemetry {
				export class MapboxTelemetry extends java.lang.Object implements FullQueueCallback, ServiceTaskCallback {
					public static class: java.lang.Class<MapboxTelemetry>;
					public constructor(param0: globalAndroid.content.Context, param1: string, param2: string);
					public enable(): boolean;
					public updateUserAgent(param0: string): void;
					public updateSessionIdRotationInterval(param0: SessionInterval): boolean;
					public addTelemetryListener(param0: TelemetryListener): boolean;
					public addAttachmentListener(param0: AttachmentListener): boolean;
					/** @deprecated */
					public setBaseUrl(param0: string): boolean;
					public isCnRegion(): boolean;
					public push(param0: Event): boolean;
					public onFullQueue(param0: java.util.List<Event>): void;
					public setCnRegion(param0: boolean): void;
					public updateAccessToken(param0: string): boolean;
					public removeAttachmentListener(param0: AttachmentListener): boolean;
					public disable(): boolean;
					public onTaskRemoved(): void;
					public updateDebugLoggingEnabled(param0: boolean): void;
					public removeTelemetryListener(param0: TelemetryListener): boolean;
				}
				export module MapboxTelemetry {
					export class ExecutorServiceFactory extends java.lang.Object {
						public static class: java.lang.Class<MapboxTelemetry.ExecutorServiceFactory>;
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module android {
			export module telemetry {
				export class MapboxTelemetryConstants extends java.lang.Object {
					public static class: java.lang.Class<MapboxTelemetryConstants>;
					public static MAPBOX_SHARED_PREFERENCES: string;
					public static LOCATION_COLLECTOR_ENABLED: string;
					public static SESSION_ROTATION_INTERVAL_MILLIS: string;
					public static ACTION_TOKEN_CHANGED: string;
					public static MAPBOX_TELEMETRY_PACKAGE: string;
					public static DEFAULT_STAGING_EVENTS_HOST: string;
					public static DEFAULT_COM_EVENTS_HOST: string;
					public static DEFAULT_CHINA_EVENTS_HOST: string;
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module android {
			export module telemetry {
				export class SchedulerCallback extends java.lang.Object {
					public static class: java.lang.Class<SchedulerCallback>;
					/**
					 * Constructs a new instance of the SchedulerCallback interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
					 */
					public constructor(implementation: {
						onPeriodRaised(): void;
						onError(): void;
					});
					public constructor();
					public onError(): void;
					public onPeriodRaised(): void;
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module android {
			export module telemetry {
				export class SchedulerFlusher extends java.lang.Object {
					public static class: java.lang.Class<SchedulerFlusher>;
					/**
					 * Constructs a new instance of the SchedulerFlusher interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
					 */
					public constructor(implementation: {
						register(): void;
						schedule(param0: number): void;
						unregister(): void;
					});
					public constructor();
					public register(): void;
					public schedule(param0: number): void;
					public unregister(): void;
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module android {
			export module telemetry {
				export class SchedulerFlusherFactory extends java.lang.Object {
					public static class: java.lang.Class<SchedulerFlusherFactory>;
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module android {
			export module telemetry {
				export class ServerInformation extends java.lang.Object {
					public static class: java.lang.Class<ServerInformation>;
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module android {
			export module telemetry {
				export class ServiceTaskCallback extends java.lang.Object {
					public static class: java.lang.Class<ServiceTaskCallback>;
					/**
					 * Constructs a new instance of the ServiceTaskCallback interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
					 */
					public constructor(implementation: {
						onTaskRemoved(): void;
					});
					public constructor();
					public onTaskRemoved(): void;
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module android {
			export module telemetry {
				export class SessionInterval extends java.lang.Object {
					public static class: java.lang.Class<SessionInterval>;
					public constructor(param0: number);
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module android {
			export module telemetry {
				export class StagingCertificatePins extends java.lang.Object {
					public static class: java.lang.Class<StagingCertificatePins>;
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module android {
			export module telemetry {
				export class StagingServerInformation extends java.lang.Object implements EnvironmentResolver {
					public static class: java.lang.Class<StagingServerInformation>;
					public obtainServerInformation(param0: globalAndroid.os.Bundle): ServerInformation;
					public nextChain(param0: EnvironmentResolver): void;
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module android {
			export module telemetry {
				export class TelemetryCallback extends java.lang.Object {
					public static class: java.lang.Class<TelemetryCallback>;
					/**
					 * Constructs a new instance of the TelemetryCallback interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
					 */
					public constructor(implementation: {
						onBackground(): void;
						onForeground(): void;
					});
					public constructor();
					public onForeground(): void;
					public onBackground(): void;
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module android {
			export module telemetry {
				export class TelemetryClient extends java.lang.Object {
					public static class: java.lang.Class<TelemetryClient>;
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module android {
			export module telemetry {
				export class TelemetryClientFactory extends java.lang.Object {
					public static class: java.lang.Class<TelemetryClientFactory>;
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module android {
			export module telemetry {
				export class TelemetryClientSettings extends java.lang.Object {
					public static class: java.lang.Class<TelemetryClientSettings>;
				}
				export module TelemetryClientSettings {
					export class Builder extends java.lang.Object {
						public static class: java.lang.Class<TelemetryClientSettings.Builder>;
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module android {
			export module telemetry {
				export class TelemetryEnabler extends java.lang.Object {
					public static class: java.lang.Class<TelemetryEnabler>;
					public static retrieveTelemetryStateFromPreferences(): TelemetryEnabler.State;
					public static updateTelemetryState(param0: TelemetryEnabler.State): TelemetryEnabler.State;
				}
				export module TelemetryEnabler {
					export class State {
						public static class: java.lang.Class<TelemetryEnabler.State>;
						public static ENABLED: TelemetryEnabler.State;
						public static DISABLED: TelemetryEnabler.State;
						public static valueOf(param0: string): TelemetryEnabler.State;
						public static valueOf(param0: java.lang.Class<any>, param1: string): java.lang.Enum<any>;
						public static values(): native.Array<TelemetryEnabler.State>;
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module android {
			export module telemetry {
				export class TelemetryListener extends java.lang.Object {
					public static class: java.lang.Class<TelemetryListener>;
					/**
					 * Constructs a new instance of the TelemetryListener interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
					 */
					public constructor(implementation: {
						onHttpResponse(param0: boolean, param1: number): void;
						onHttpFailure(param0: string): void;
					});
					public constructor();
					public onHttpResponse(param0: boolean, param1: number): void;
					public onHttpFailure(param0: string): void;
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module android {
			export module telemetry {
				export class TelemetryResponse extends java.lang.Object {
					public static class: java.lang.Class<TelemetryResponse>;
					public equals(param0: any): boolean;
					public hashCode(): number;
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module android {
			export module telemetry {
				export class TelemetryUtils extends java.lang.Object {
					public static class: java.lang.Class<TelemetryUtils>;
					public static toHumanReadableAscii(param0: string): string;
					public static obtainUniversalUniqueIdentifier(): string;
					public static isPluggedIn(param0: globalAndroid.content.Context): boolean;
					public static obtainCellularNetworkType(param0: globalAndroid.content.Context): string;
					public constructor();
					public static obtainBatteryLevel(param0: globalAndroid.content.Context): number;
					public static generateCreateDateFormatted(param0: java.util.Date): string;
					public static obtainApplicationState(param0: globalAndroid.content.Context): string;
					public static obtainCurrentDate(): string;
					public static retrieveVendorId(): string;
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module android {
			export module telemetry {
				export class VisionBuildEvent extends java.lang.Object {
					public static class: java.lang.Class<VisionBuildEvent>;
					/**
					 * Constructs a new instance of the VisionBuildEvent interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
					 */
					public constructor(implementation: {
						build(): Event;
					});
					public constructor();
					public build(): Event;
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module android {
			export module telemetry {
				export class VisionEvent extends Event implements globalAndroid.os.Parcelable {
					public static class: java.lang.Class<VisionEvent>;
					public static CREATOR: globalAndroid.os.Parcelable.Creator<VisionEvent>;
					public getContents(): java.util.HashMap<string,any>;
					public describeContents(): number;
					public setContents(param0: java.util.HashMap<string,any>): void;
					public writeToParcel(param0: globalAndroid.os.Parcel, param1: number): void;
					public setName(param0: string): void;
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module android {
			export module telemetry {
				export class VisionEventFactory extends java.lang.Object {
					public static class: java.lang.Class<VisionEventFactory>;
					public constructor();
					public createAttachment(param0: Event.Type): Attachment;
					public createFileAttachment(param0: string, param1: any, param2: AttachmentMetadata): FileAttachment;
					public createVisionEvent(param0: Event.Type): Event;
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module android {
			export module telemetry {
				export class VisionObjectDetectionEvent extends Event implements globalAndroid.os.Parcelable {
					public static class: java.lang.Class<VisionObjectDetectionEvent>;
					public static CREATOR: globalAndroid.os.Parcelable.Creator<VisionObjectDetectionEvent>;
					public setObjectSizeHeight(param0: number): void;
					public getObjectLatitude(): number;
					public getCreated(): string;
					public constructor(param0: string);
					public setSignValue(param0: string): void;
					public getEvent(): string;
					public getDistanceFromCamera(): number;
					public setDistanceFromCamera(param0: number): void;
					public getObjectLongitude(): number;
					public setClazz(param0: string): void;
					public constructor();
					public setVehicleLongitude(param0: number): void;
					public setObjectPositionHeight(param0: number): void;
					public getObjectPositionHeight(): number;
					public getSignValue(): string;
					public describeContents(): number;
					public setObjectSizeWidth(param0: number): void;
					public getObjectSizeHeight(): number;
					public setObjectLatitude(param0: number): void;
					public getClazz(): string;
					public setObjectLongitude(param0: number): void;
					public getVehicleLatitude(): number;
					public getObjectSizeWidth(): number;
					public writeToParcel(param0: globalAndroid.os.Parcel, param1: number): void;
					public setVehicleLatitude(param0: number): void;
					public getVehicleLongitude(): number;
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module android {
			export module telemetry {
				export module errors {
					export class ErrorReporterClient extends java.lang.Object {
						public static class: java.lang.Class<errors.ErrorReporterClient>;
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module android {
			export module telemetry {
				export module errors {
					export class ErrorReporterEngine extends java.lang.Object {
						public static class: java.lang.Class<errors.ErrorReporterEngine>;
						public constructor();
						public static sendErrorReports(param0: globalAndroid.content.Context, param1: java.util.concurrent.ExecutorService): void;
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module android {
			export module telemetry {
				export module errors {
					export class ErrorReporterJobIntentService {
						public static class: java.lang.Class<errors.ErrorReporterJobIntentService>;
						public constructor();
						public onHandleWork(param0: globalAndroid.content.Intent): void;
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module android {
			export module telemetry {
				export module errors {
					export class TokenChangeBroadcastReceiver extends globalAndroid.content.BroadcastReceiver {
						public static class: java.lang.Class<errors.TokenChangeBroadcastReceiver>;
						public onReceive(param0: globalAndroid.content.Context, param1: globalAndroid.content.Intent): void;
						public constructor();
						public static register(param0: globalAndroid.content.Context): void;
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module android {
			export module telemetry {
				export module location {
					export class LocationCollectionClient extends java.lang.Object implements globalAndroid.content.SharedPreferences.OnSharedPreferenceChangeListener {
						public static class: java.lang.Class<location.LocationCollectionClient>;
						public static DEFAULT_SESSION_ROTATION_INTERVAL_HOURS: number;
						public static install(param0: globalAndroid.content.Context, param1: number): location.LocationCollectionClient;
						public onSharedPreferenceChanged(param0: globalAndroid.content.SharedPreferences, param1: string): void;
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module android {
			export module telemetry {
				export module location {
					export class LocationEngineController extends java.lang.Object {
						public static class: java.lang.Class<location.LocationEngineController>;
						/**
						 * Constructs a new instance of the location.LocationEngineController interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
						 */
						public constructor(implementation: {
							onPause(): void;
							onResume(): void;
							onDestroy(): void;
						});
						public constructor();
						public onDestroy(): void;
						public onResume(): void;
						public onPause(): void;
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module android {
			export module telemetry {
				export module location {
					export class LocationEngineControllerImpl extends java.lang.Object implements location.LocationEngineController {
						public static class: java.lang.Class<location.LocationEngineControllerImpl>;
						public onDestroy(): void;
						public onResume(): void;
						public onPause(): void;
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module android {
			export module telemetry {
				export module location {
					export class LocationMapper extends java.lang.Object {
						public static class: java.lang.Class<location.LocationMapper>;
						public constructor();
						public from(param0: globalAndroid.location.Location, param1: string): LocationEvent;
						public updateSessionIdentifier(param0: location.SessionIdentifier): void;
						public static create(param0: globalAndroid.location.Location, param1: string): LocationEvent;
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module android {
			export module telemetry {
				export module location {
					export class LocationUpdatesBroadcastReceiver extends globalAndroid.content.BroadcastReceiver {
						public static class: java.lang.Class<location.LocationUpdatesBroadcastReceiver>;
						public onReceive(param0: globalAndroid.content.Context, param1: globalAndroid.content.Intent): void;
						public constructor();
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module android {
			export module telemetry {
				export module location {
					export class SessionIdentifier extends java.lang.Object {
						public static class: java.lang.Class<location.SessionIdentifier>;
						public constructor();
						public constructor(param0: number);
						public getInterval(): number;
						/** @deprecated */
						public constructor(param0: number);
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module android {
			export module telemetry {
				export module metrics {
					export class TelemetryMetrics extends com.mapbox.android.core.metrics.AbstractCompositeMetrics {
						public static class: java.lang.Class<metrics.TelemetryMetrics>;
						public static EVENTS_TOTAL: string;
						public static EVENTS_FAILED: string;
						public constructor(param0: number);
						public addRxBytesForType(param0: number, param1: number): void;
						public addTxBytesForType(param0: number, param1: number): void;
						public nextMetrics(param0: number, param1: number): any;
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module android {
			export module telemetry {
				export module metrics {
					export class TelemetryMetricsClient extends java.lang.Object {
						public static class: java.lang.Class<metrics.TelemetryMetricsClient>;
						public static install(param0: globalAndroid.content.Context): metrics.TelemetryMetricsClient;
						public getMetrics(): metrics.TelemetryMetrics;
						public static getInstance(): metrics.TelemetryMetricsClient;
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module android {
			export module telemetry {
				export module metrics {
					export module network {
						export class NetworkErrorInterceptor extends java.lang.Object {
							public static class: java.lang.Class<metrics.network.NetworkErrorInterceptor>;
							public intercept(param0: any): any;
							public constructor(param0: metrics.TelemetryMetrics, param1: number);
						}
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module android {
			export module telemetry {
				export module metrics {
					export module network {
						export class NetworkUsageInterceptor extends java.lang.Object {
							public static class: java.lang.Class<metrics.network.NetworkUsageInterceptor>;
							public intercept(param0: any): any;
							public constructor(param0: metrics.network.NetworkUsageMetricsCollector);
						}
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module android {
			export module telemetry {
				export module metrics {
					export module network {
						export class NetworkUsageMetricsCollector extends java.lang.Object {
							public static class: java.lang.Class<metrics.network.NetworkUsageMetricsCollector>;
							public constructor(param0: globalAndroid.content.Context, param1: metrics.TelemetryMetrics);
						}
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module android {
			export module telemetry {
				export module provider {
					export class MapboxTelemetryInitProvider extends globalAndroid.content.ContentProvider {
						public static class: java.lang.Class<provider.MapboxTelemetryInitProvider>;
						public constructor();
						public delete(param0: globalAndroid.net.Uri, param1: string, param2: native.Array<string>): number;
						public attachInfo(param0: globalAndroid.content.Context, param1: globalAndroid.content.pm.ProviderInfo): void;
						public query(param0: globalAndroid.net.Uri, param1: native.Array<string>, param2: string, param3: native.Array<string>, param4: string): globalAndroid.database.Cursor;
						public query(param0: globalAndroid.net.Uri, param1: native.Array<string>, param2: string, param3: native.Array<string>, param4: string, param5: globalAndroid.os.CancellationSignal): globalAndroid.database.Cursor;
						public onCreate(): boolean;
						public getType(param0: globalAndroid.net.Uri): string;
						public onTrimMemory(param0: number): void;
						public update(param0: globalAndroid.net.Uri, param1: globalAndroid.content.ContentValues, param2: string, param3: native.Array<string>): number;
						public query(param0: globalAndroid.net.Uri, param1: native.Array<string>, param2: globalAndroid.os.Bundle, param3: globalAndroid.os.CancellationSignal): globalAndroid.database.Cursor;
						public insert(param0: globalAndroid.net.Uri, param1: globalAndroid.content.ContentValues): globalAndroid.net.Uri;
					}
				}
			}
		}
	}
}


declare module com {
	export module mapbox {
		export module api {
			export module directions {
				export module v5 {
					export abstract class DirectionsAdapterFactory extends java.lang.Object {
						public static class: java.lang.Class<DirectionsAdapterFactory>;
						public constructor();
						public static create(): any;
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module api {
			export module directions {
				export module v5 {
					export class DirectionsCriteria extends java.lang.Object {
						public static class: java.lang.Class<DirectionsCriteria>;
						public static PROFILE_DEFAULT_USER: string;
						public static PROFILE_DRIVING_TRAFFIC: string;
						public static PROFILE_DRIVING: string;
						public static PROFILE_WALKING: string;
						public static PROFILE_CYCLING: string;
						public static GEOMETRY_POLYLINE: string;
						public static GEOMETRY_POLYLINE6: string;
						public static OVERVIEW_SIMPLIFIED: string;
						public static OVERVIEW_FULL: string;
						public static OVERVIEW_FALSE: string;
						public static ANNOTATION_DURATION: string;
						public static ANNOTATION_DISTANCE: string;
						public static ANNOTATION_SPEED: string;
						public static ANNOTATION_CONGESTION: string;
						public static ANNOTATION_MAXSPEED: string;
						public static EXCLUDE_TOLL: string;
						public static EXCLUDE_MOTORWAY: string;
						public static EXCLUDE_FERRY: string;
						public static EXCLUDE_TUNNEL: string;
						public static EXCLUDE_RESTRICTED: string;
						public static IMPERIAL: string;
						public static METRIC: string;
						public static SOURCE_FIRST: string;
						public static SOURCE_ANY: string;
						public static DESTINATION_ANY: string;
						public static DESTINATION_LAST: string;
						public static APPROACH_UNRESTRICTED: string;
						public static APPROACH_CURB: string;
					}
					export module DirectionsCriteria {
						export class AnnotationCriteria extends java.lang.Object implements java.lang.annotation.Annotation {
							public static class: java.lang.Class<DirectionsCriteria.AnnotationCriteria>;
							/**
							 * Constructs a new instance of the com.mapbox.api.directions.v5.DirectionsCriteria$AnnotationCriteria interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
							 */
							public constructor(implementation: {
								equals(param0: any): boolean;
								hashCode(): number;
								toString(): string;
								annotationType(): java.lang.Class<any>;
							});
							public constructor();
							public hashCode(): number;
							public annotationType(): java.lang.Class<any>;
							public toString(): string;
							public equals(param0: any): boolean;
						}
						export class ApproachesCriteria extends java.lang.Object implements java.lang.annotation.Annotation {
							public static class: java.lang.Class<DirectionsCriteria.ApproachesCriteria>;
							/**
							 * Constructs a new instance of the com.mapbox.api.directions.v5.DirectionsCriteria$ApproachesCriteria interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
							 */
							public constructor(implementation: {
								equals(param0: any): boolean;
								hashCode(): number;
								toString(): string;
								annotationType(): java.lang.Class<any>;
							});
							public constructor();
							public hashCode(): number;
							public annotationType(): java.lang.Class<any>;
							public toString(): string;
							public equals(param0: any): boolean;
						}
						export class DestinationCriteria extends java.lang.Object implements java.lang.annotation.Annotation {
							public static class: java.lang.Class<DirectionsCriteria.DestinationCriteria>;
							/**
							 * Constructs a new instance of the com.mapbox.api.directions.v5.DirectionsCriteria$DestinationCriteria interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
							 */
							public constructor(implementation: {
								equals(param0: any): boolean;
								hashCode(): number;
								toString(): string;
								annotationType(): java.lang.Class<any>;
							});
							public constructor();
							public hashCode(): number;
							public annotationType(): java.lang.Class<any>;
							public toString(): string;
							public equals(param0: any): boolean;
						}
						export class ExcludeCriteria extends java.lang.Object implements java.lang.annotation.Annotation {
							public static class: java.lang.Class<DirectionsCriteria.ExcludeCriteria>;
							/**
							 * Constructs a new instance of the com.mapbox.api.directions.v5.DirectionsCriteria$ExcludeCriteria interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
							 */
							public constructor(implementation: {
								equals(param0: any): boolean;
								hashCode(): number;
								toString(): string;
								annotationType(): java.lang.Class<any>;
							});
							public constructor();
							public hashCode(): number;
							public annotationType(): java.lang.Class<any>;
							public toString(): string;
							public equals(param0: any): boolean;
						}
						export class GeometriesCriteria extends java.lang.Object implements java.lang.annotation.Annotation {
							public static class: java.lang.Class<DirectionsCriteria.GeometriesCriteria>;
							/**
							 * Constructs a new instance of the com.mapbox.api.directions.v5.DirectionsCriteria$GeometriesCriteria interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
							 */
							public constructor(implementation: {
								equals(param0: any): boolean;
								hashCode(): number;
								toString(): string;
								annotationType(): java.lang.Class<any>;
							});
							public constructor();
							public hashCode(): number;
							public annotationType(): java.lang.Class<any>;
							public toString(): string;
							public equals(param0: any): boolean;
						}
						export class OverviewCriteria extends java.lang.Object implements java.lang.annotation.Annotation {
							public static class: java.lang.Class<DirectionsCriteria.OverviewCriteria>;
							/**
							 * Constructs a new instance of the com.mapbox.api.directions.v5.DirectionsCriteria$OverviewCriteria interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
							 */
							public constructor(implementation: {
								equals(param0: any): boolean;
								hashCode(): number;
								toString(): string;
								annotationType(): java.lang.Class<any>;
							});
							public constructor();
							public hashCode(): number;
							public annotationType(): java.lang.Class<any>;
							public toString(): string;
							public equals(param0: any): boolean;
						}
						export class ProfileCriteria extends java.lang.Object implements java.lang.annotation.Annotation {
							public static class: java.lang.Class<DirectionsCriteria.ProfileCriteria>;
							/**
							 * Constructs a new instance of the com.mapbox.api.directions.v5.DirectionsCriteria$ProfileCriteria interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
							 */
							public constructor(implementation: {
								equals(param0: any): boolean;
								hashCode(): number;
								toString(): string;
								annotationType(): java.lang.Class<any>;
							});
							public constructor();
							public hashCode(): number;
							public annotationType(): java.lang.Class<any>;
							public toString(): string;
							public equals(param0: any): boolean;
						}
						export class SourceCriteria extends java.lang.Object implements java.lang.annotation.Annotation {
							public static class: java.lang.Class<DirectionsCriteria.SourceCriteria>;
							/**
							 * Constructs a new instance of the com.mapbox.api.directions.v5.DirectionsCriteria$SourceCriteria interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
							 */
							public constructor(implementation: {
								equals(param0: any): boolean;
								hashCode(): number;
								toString(): string;
								annotationType(): java.lang.Class<any>;
							});
							public constructor();
							public hashCode(): number;
							public annotationType(): java.lang.Class<any>;
							public toString(): string;
							public equals(param0: any): boolean;
						}
						export class VoiceUnitCriteria extends java.lang.Object implements java.lang.annotation.Annotation {
							public static class: java.lang.Class<DirectionsCriteria.VoiceUnitCriteria>;
							/**
							 * Constructs a new instance of the com.mapbox.api.directions.v5.DirectionsCriteria$VoiceUnitCriteria interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
							 */
							public constructor(implementation: {
								equals(param0: any): boolean;
								hashCode(): number;
								toString(): string;
								annotationType(): java.lang.Class<any>;
							});
							public constructor();
							public hashCode(): number;
							public annotationType(): java.lang.Class<any>;
							public toString(): string;
							public equals(param0: any): boolean;
						}
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module api {
			export module directions {
				export module v5 {
					export class DirectionsResponseFactory extends java.lang.Object {
						public static class: java.lang.Class<DirectionsResponseFactory>;
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module api {
			export module directions {
				export module v5 {
					export class DirectionsService extends java.lang.Object {
						public static class: java.lang.Class<DirectionsService>;
						/**
						 * Constructs a new instance of the com.mapbox.api.directions.v5.DirectionsService interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
						 */
						public constructor(implementation: {
							getCall(param0: string, param1: string, param2: string, param3: string, param4: string, param5: java.lang.Boolean, param6: string, param7: string, param8: string, param9: java.lang.Boolean, param10: string, param11: java.lang.Boolean, param12: string, param13: string, param14: java.lang.Boolean, param15: java.lang.Boolean, param16: java.lang.Boolean, param17: string, param18: string, param19: string, param20: string, param21: string, param22: string, param23: java.lang.Boolean, param24: java.lang.Double, param25: java.lang.Double, param26: java.lang.Double): any;
							postCall(param0: string, param1: string, param2: string, param3: string, param4: string, param5: java.lang.Boolean, param6: string, param7: string, param8: string, param9: java.lang.Boolean, param10: string, param11: java.lang.Boolean, param12: string, param13: string, param14: java.lang.Boolean, param15: java.lang.Boolean, param16: java.lang.Boolean, param17: string, param18: string, param19: string, param20: string, param21: string, param22: string, param23: java.lang.Boolean, param24: java.lang.Double, param25: java.lang.Double, param26: java.lang.Double): any;
						});
						public constructor();
						public postCall(param0: string, param1: string, param2: string, param3: string, param4: string, param5: java.lang.Boolean, param6: string, param7: string, param8: string, param9: java.lang.Boolean, param10: string, param11: java.lang.Boolean, param12: string, param13: string, param14: java.lang.Boolean, param15: java.lang.Boolean, param16: java.lang.Boolean, param17: string, param18: string, param19: string, param20: string, param21: string, param22: string, param23: java.lang.Boolean, param24: java.lang.Double, param25: java.lang.Double, param26: java.lang.Double): any;
						public getCall(param0: string, param1: string, param2: string, param3: string, param4: string, param5: java.lang.Boolean, param6: string, param7: string, param8: string, param9: java.lang.Boolean, param10: string, param11: java.lang.Boolean, param12: string, param13: string, param14: java.lang.Boolean, param15: java.lang.Boolean, param16: java.lang.Boolean, param17: string, param18: string, param19: string, param20: string, param21: string, param22: string, param23: java.lang.Boolean, param24: java.lang.Double, param25: java.lang.Double, param26: java.lang.Double): any;
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module api {
			export module directions {
				export module v5 {
					export abstract class MapboxDirections extends com.mapbox.core.MapboxService<models.DirectionsResponse,DirectionsService> {
						public static class: java.lang.Class<MapboxDirections>;
						public getGsonBuilder(): any;
						public baseUrl(): string;
						public constructor();
						public initializeCall(): any;
						public enqueueCall(param0: any): void;
						public executeCall(): any;
						public initializeCall(): any;
						public executeCall(): any;
						public getOkHttpClient(): any;
						public constructor(param0: java.lang.Class<any>);
						public static builder(): MapboxDirections.Builder;
						public toBuilder(): MapboxDirections.Builder;
						public enqueueCall(param0: any): void;
					}
					export module MapboxDirections {
						export abstract class Builder extends java.lang.Object {
							public static class: java.lang.Class<MapboxDirections.Builder>;
							public exclude(param0: string): Builder;
							public waypointNames(param0: java.util.List<string>): Builder;
							public language(param0: java.util.Locale): Builder;
							public bearings(param0: java.util.List<java.util.List<java.lang.Double>>): Builder;
							public enableRefresh(param0: java.lang.Boolean): Builder;
							public geometries(param0: string): Builder;
							/** @deprecated */
							public addApproaches(param0: native.Array<string>): Builder;
							public roundaboutExits(param0: java.lang.Boolean): Builder;
							public user(param0: string): Builder;
							public profile(param0: string): Builder;
							public addWaypointName(param0: string): Builder;
							public addApproach(param0: string): Builder;
							public waypointTargets(param0: java.util.List<any>): Builder;
							public accessToken(param0: string): Builder;
							public waypointIndices(param0: java.util.List<java.lang.Integer>): Builder;
							public alternatives(param0: java.lang.Boolean): Builder;
							public addWaypointTarget(param0: any): Builder;
							public overview(param0: string): Builder;
							public steps(param0: java.lang.Boolean): Builder;
							public destination(param0: any): Builder;
							public waypoints(param0: java.util.List<any>): Builder;
							public eventListener(param0: any): Builder;
							public clientAppName(param0: string): Builder;
							/** @deprecated */
							public addWaypointIndices(param0: native.Array<java.lang.Integer>): Builder;
							public radiuses(param0: java.util.List<java.lang.Double>): Builder;
							public interceptor(param0: any): Builder;
							public approaches(param0: java.util.List<string>): Builder;
							public get(): Builder;
							public addBearing(param0: java.lang.Double, param1: java.lang.Double): Builder;
							public voiceInstructions(param0: java.lang.Boolean): Builder;
							public annotations(param0: java.util.List<string>): Builder;
							public addAnnotation(param0: string): Builder;
							/** @deprecated */
							public radiuses(param0: native.Array<java.lang.Double>): Builder;
							public bannerInstructions(param0: java.lang.Boolean): Builder;
							public addWaypointIndex(param0: java.lang.Integer): Builder;
							/** @deprecated */
							public addWaypointTargets(param0: native.Array<any>): Builder;
							public constructor();
							public post(): Builder;
							public addRadius(param0: java.lang.Double): Builder;
							/** @deprecated */
							public addWaypointNames(param0: native.Array<string>): Builder;
							public continueStraight(param0: java.lang.Boolean): Builder;
							public voiceUnits(param0: string): Builder;
							public build(): MapboxDirections;
							public addWaypoint(param0: any): Builder;
							/** @deprecated */
							public annotations(param0: native.Array<string>): Builder;
							public networkInterceptor(param0: any): Builder;
							public baseUrl(param0: string): Builder;
							public walkingOptions(param0: WalkingOptions): Builder;
							public origin(param0: any): Builder;
						}
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module api {
			export module directions {
				export module v5 {
					export abstract class WalkingOptions extends java.lang.Object {
						public static class: java.lang.Class<WalkingOptions>;
						public constructor();
						public static fromJson(param0: string): WalkingOptions;
						public walkwayBias(): java.lang.Double;
						public walkingSpeed(): java.lang.Double;
						public static typeAdapter(param0: any): any;
						public static builder(): WalkingOptions.Builder;
						public toJson(): string;
						public alleyBias(): java.lang.Double;
						public toBuilder(): WalkingOptions.Builder;
					}
					export module WalkingOptions {
						export abstract class Builder extends java.lang.Object {
							public static class: java.lang.Class<WalkingOptions.Builder>;
							public constructor();
							public walkwayBias(param0: java.lang.Double): WalkingOptions.Builder;
							public build(): WalkingOptions;
							public walkingSpeed(param0: java.lang.Double): WalkingOptions.Builder;
							public alleyBias(param0: java.lang.Double): WalkingOptions.Builder;
						}
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module api {
			export module directions {
				export module v5 {
					export abstract class WalkingOptionsAdapterFactory extends java.lang.Object {
						public static class: java.lang.Class<WalkingOptionsAdapterFactory>;
						public constructor();
						public static create(): any;
					}
				}
			}
		}
	}
}


declare module com {
	export module mapbox {
		export module api {
			export module directions {
				export module v5 {
					export module models {
						export abstract class BannerComponents extends DirectionsJsonObject implements java.lang.Comparable<BannerComponents>  {
							public static class: java.lang.Class<models.BannerComponents>;
							public static TEXT: string;
							public static ICON: string;
							public static DELIMITER: string;
							public static EXIT_NUMBER: string;
							public static EXIT: string;
							public static LANE: string;
							public static GUIDANCE_VIEW: string;
							public constructor();
							public static fromJson(param0: string): models.BannerComponents;
							public abbreviationPriority(): java.lang.Integer;
							public abbreviation(): string;
							public active(): java.lang.Boolean;
							public text(): string;
							public compareTo(param0: models.BannerComponents): number;
							public type(): string;
							public directions(): java.util.List<string>;
							public imageBaseUrl(): string;
							public imageUrl(): string;
							public static typeAdapter(param0: any): any;
							public toBuilder(): models.BannerComponents.Builder;
							public static builder(): models.BannerComponents.Builder;
						}
						export module BannerComponents {
							export class BannerComponentsType extends java.lang.Object implements java.lang.annotation.Annotation {
								public static class: java.lang.Class<models.BannerComponents.BannerComponentsType>;
								/**
								 * Constructs a new instance of the BannerComponents$BannerComponentsType interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
								 */
								public constructor(implementation: {
									equals(param0: any): boolean;
									hashCode(): number;
									toString(): string;
									annotationType(): java.lang.Class<any>;
								});
								public constructor();
								public toString(): string;
								public equals(param0: any): boolean;
								public annotationType(): java.lang.Class<any>;
								public hashCode(): number;
							}
							export abstract class Builder extends java.lang.Object {
								public static class: java.lang.Class<models.BannerComponents.Builder>;
								public type(param0: string): models.BannerComponents.Builder;
								public abbreviation(param0: string): models.BannerComponents.Builder;
								public active(param0: java.lang.Boolean): models.BannerComponents.Builder;
								public abbreviationPriority(param0: java.lang.Integer): models.BannerComponents.Builder;
								public text(param0: string): models.BannerComponents.Builder;
								public constructor();
								public build(): models.BannerComponents;
								public imageBaseUrl(param0: string): models.BannerComponents.Builder;
								public directions(param0: java.util.List<string>): models.BannerComponents.Builder;
								public imageUrl(param0: string): models.BannerComponents.Builder;
							}
						}
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module api {
			export module directions {
				export module v5 {
					export module models {
						export abstract class BannerInstructions extends DirectionsJsonObject {
							public static class: java.lang.Class<models.BannerInstructions>;
							public constructor();
							public distanceAlongGeometry(): number;
							public sub(): models.BannerText;
							public static builder(): models.BannerInstructions.Builder;
							public view(): models.BannerView;
							public primary(): models.BannerText;
							public static typeAdapter(param0: any): any;
							public toBuilder(): models.BannerInstructions.Builder;
							public static fromJson(param0: string): models.BannerInstructions;
							public secondary(): models.BannerText;
						}
						export module BannerInstructions {
							export abstract class Builder extends java.lang.Object {
								public static class: java.lang.Class<models.BannerInstructions.Builder>;
								public primary(param0: models.BannerText): models.BannerInstructions.Builder;
								public view(param0: models.BannerView): models.BannerInstructions.Builder;
								public constructor();
								public build(): models.BannerInstructions;
								public distanceAlongGeometry(param0: number): models.BannerInstructions.Builder;
								public sub(param0: models.BannerText): models.BannerInstructions.Builder;
								public secondary(param0: models.BannerText): models.BannerInstructions.Builder;
							}
						}
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module api {
			export module directions {
				export module v5 {
					export module models {
						export abstract class BannerText extends DirectionsJsonObject {
							public static class: java.lang.Class<models.BannerText>;
							public constructor();
							public drivingSide(): string;
							public text(): string;
							public static typeAdapter(param0: any): any;
							public modifier(): string;
							public static builder(): models.BannerText.Builder;
							public type(): string;
							public components(): java.util.List<models.BannerComponents>;
							public degrees(): java.lang.Double;
							public toBuilder(): models.BannerText.Builder;
							public static fromJson(param0: string): models.BannerText;
						}
						export module BannerText {
							export abstract class Builder extends java.lang.Object {
								public static class: java.lang.Class<models.BannerText.Builder>;
								public modifier(param0: string): models.BannerText.Builder;
								public drivingSide(param0: string): models.BannerText.Builder;
								public build(): models.BannerText;
								public components(param0: java.util.List<models.BannerComponents>): models.BannerText.Builder;
								public type(param0: string): models.BannerText.Builder;
								public constructor();
								public text(param0: string): models.BannerText.Builder;
								public degrees(param0: java.lang.Double): models.BannerText.Builder;
							}
						}
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module api {
			export module directions {
				export module v5 {
					export module models {
						export abstract class BannerView extends DirectionsJsonObject {
							public static class: java.lang.Class<models.BannerView>;
							public constructor();
							public text(): string;
							public modifier(): string;
							public toBuilder(): models.BannerView.Builder;
							public static typeAdapter(param0: any): any;
							public static fromJson(param0: string): models.BannerView;
							public type(): string;
							public components(): java.util.List<models.BannerComponents>;
							public static builder(): models.BannerView.Builder;
						}
						export module BannerView {
							export abstract class Builder extends java.lang.Object {
								public static class: java.lang.Class<models.BannerView.Builder>;
								public components(param0: java.util.List<models.BannerComponents>): models.BannerView.Builder;
								public type(param0: string): models.BannerView.Builder;
								public text(param0: string): models.BannerView.Builder;
								public build(): models.BannerView;
								public constructor();
								public modifier(param0: string): models.BannerView.Builder;
							}
						}
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module api {
			export module directions {
				export module v5 {
					export module models {
						export abstract class DirectionsError extends java.lang.Object implements java.io.Serializable {
							public static class: java.lang.Class<models.DirectionsError>;
							public constructor();
							public static builder(): models.DirectionsError.Builder;
							public static typeAdapter(param0: any): any;
							public code(): string;
							public toBuilder(): models.DirectionsError.Builder;
							public message(): string;
						}
						export module DirectionsError {
							export abstract class Builder extends java.lang.Object {
								public static class: java.lang.Class<models.DirectionsError.Builder>;
								public message(param0: string): models.DirectionsError.Builder;
								public build(): models.DirectionsError;
								public constructor();
								public code(param0: string): models.DirectionsError.Builder;
							}
						}
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module api {
			export module directions {
				export module v5 {
					export module models {
						export class DirectionsJsonObject extends java.lang.Object implements java.io.Serializable {
							public static class: java.lang.Class<models.DirectionsJsonObject>;
							public constructor();
							public toJson(): string;
						}
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module api {
			export module directions {
				export module v5 {
					export module models {
						export abstract class DirectionsResponse extends DirectionsJsonObject {
							public static class: java.lang.Class<models.DirectionsResponse>;
							public constructor();
							public static typeAdapter(param0: any): any;
							public static builder(): models.DirectionsResponse.Builder;
							public uuid(): string;
							public code(): string;
							public toBuilder(): models.DirectionsResponse.Builder;
							public static fromJson(param0: string): models.DirectionsResponse;
							public waypoints(): java.util.List<models.DirectionsWaypoint>;
							public message(): string;
							public routes(): java.util.List<models.DirectionsRoute>;
						}
						export module DirectionsResponse {
							export abstract class Builder extends java.lang.Object {
								public static class: java.lang.Class<models.DirectionsResponse.Builder>;
								public code(param0: string): models.DirectionsResponse.Builder;
								public uuid(param0: string): models.DirectionsResponse.Builder;
								public waypoints(param0: java.util.List<models.DirectionsWaypoint>): models.DirectionsResponse.Builder;
								public message(param0: string): models.DirectionsResponse.Builder;
								public constructor();
								public routes(param0: java.util.List<models.DirectionsRoute>): models.DirectionsResponse.Builder;
								public build(): models.DirectionsResponse;
							}
						}
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module api {
			export module directions {
				export module v5 {
					export module models {
						export abstract class DirectionsRoute extends DirectionsJsonObject {
							public static class: java.lang.Class<models.DirectionsRoute>;
							public constructor();
							public weightName(): string;
							public routeIndex(): string;
							public static typeAdapter(param0: any): any;
							public durationTypical(): java.lang.Double;
							public weight(): java.lang.Double;
							public duration(): java.lang.Double;
							public geometry(): string;
							public routeOptions(): models.RouteOptions;
							public distance(): java.lang.Double;
							public legs(): java.util.List<models.RouteLeg>;
							public toBuilder(): models.DirectionsRoute.Builder;
							public voiceLanguage(): string;
							public static builder(): models.DirectionsRoute.Builder;
							public static fromJson(param0: string): models.DirectionsRoute;
						}
						export module DirectionsRoute {
							export abstract class Builder extends java.lang.Object {
								public static class: java.lang.Class<models.DirectionsRoute.Builder>;
								public voiceLanguage(param0: string): models.DirectionsRoute.Builder;
								public routeOptions(param0: models.RouteOptions): models.DirectionsRoute.Builder;
								public duration(param0: java.lang.Double): models.DirectionsRoute.Builder;
								public geometry(param0: string): models.DirectionsRoute.Builder;
								public weight(param0: java.lang.Double): models.DirectionsRoute.Builder;
								public legs(param0: java.util.List<models.RouteLeg>): models.DirectionsRoute.Builder;
								public constructor();
								public durationTypical(param0: java.lang.Double): models.DirectionsRoute.Builder;
								public weightName(param0: string): models.DirectionsRoute.Builder;
								public distance(param0: java.lang.Double): models.DirectionsRoute.Builder;
								public build(): models.DirectionsRoute;
							}
						}
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module api {
			export module directions {
				export module v5 {
					export module models {
						export abstract class DirectionsWaypoint extends DirectionsJsonObject {
							public static class: java.lang.Class<models.DirectionsWaypoint>;
							public constructor();
							public static fromJson(param0: string): models.DirectionsWaypoint;
							public static typeAdapter(param0: any): any;
							public toBuilder(): models.DirectionsWaypoint.Builder;
							public name(): string;
							public location(): any;
							public static builder(): models.DirectionsWaypoint.Builder;
						}
						export module DirectionsWaypoint {
							export abstract class Builder extends java.lang.Object {
								public static class: java.lang.Class<models.DirectionsWaypoint.Builder>;
								public name(param0: string): models.DirectionsWaypoint.Builder;
								public rawLocation(param0: native.Array<number>): models.DirectionsWaypoint.Builder;
								public build(): models.DirectionsWaypoint;
								public constructor();
							}
						}
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module api {
			export module directions {
				export module v5 {
					export module models {
						export abstract class IntersectionLanes extends DirectionsJsonObject {
							public static class: java.lang.Class<models.IntersectionLanes>;
							public constructor();
							public static fromJson(param0: string): models.IntersectionLanes;
							public valid(): java.lang.Boolean;
							public indications(): java.util.List<string>;
							public static typeAdapter(param0: any): any;
							public static builder(): models.IntersectionLanes.Builder;
							public toBuilder(): models.IntersectionLanes.Builder;
						}
						export module IntersectionLanes {
							export abstract class Builder extends java.lang.Object {
								public static class: java.lang.Class<models.IntersectionLanes.Builder>;
								public valid(param0: java.lang.Boolean): models.IntersectionLanes.Builder;
								public indications(param0: java.util.List<string>): models.IntersectionLanes.Builder;
								public constructor();
								public build(): models.IntersectionLanes;
							}
						}
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module api {
			export module directions {
				export module v5 {
					export module models {
						export abstract class LegAnnotation extends DirectionsJsonObject {
							public static class: java.lang.Class<models.LegAnnotation>;
							public constructor();
							public maxspeed(): java.util.List<models.MaxSpeed>;
							public congestion(): java.util.List<string>;
							public static builder(): models.LegAnnotation.Builder;
							public toBuilder(): models.LegAnnotation.Builder;
							public duration(): java.util.List<java.lang.Double>;
							public distance(): java.util.List<java.lang.Double>;
							public speed(): java.util.List<java.lang.Double>;
							public static typeAdapter(param0: any): any;
							public static fromJson(param0: string): models.LegAnnotation;
						}
						export module LegAnnotation {
							export abstract class Builder extends java.lang.Object {
								public static class: java.lang.Class<models.LegAnnotation.Builder>;
								public duration(param0: java.util.List<java.lang.Double>): models.LegAnnotation.Builder;
								public congestion(param0: java.util.List<string>): models.LegAnnotation.Builder;
								public constructor();
								public build(): models.LegAnnotation;
								public distance(param0: java.util.List<java.lang.Double>): models.LegAnnotation.Builder;
								public speed(param0: java.util.List<java.lang.Double>): models.LegAnnotation.Builder;
								public maxspeed(param0: java.util.List<models.MaxSpeed>): models.LegAnnotation.Builder;
							}
						}
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module api {
			export module directions {
				export module v5 {
					export module models {
						export abstract class LegStep extends DirectionsJsonObject {
							public static class: java.lang.Class<models.LegStep>;
							public constructor();
							public destinations(): string;
							public drivingSide(): string;
							public duration(): number;
							public static builder(): models.LegStep.Builder;
							public durationTypical(): java.lang.Double;
							public weight(): number;
							public toBuilder(): models.LegStep.Builder;
							public static fromJson(param0: string): models.LegStep;
							public mode(): string;
							public intersections(): java.util.List<models.StepIntersection>;
							public geometry(): string;
							public voiceInstructions(): java.util.List<models.VoiceInstructions>;
							public rotaryPronunciation(): string;
							public distance(): number;
							public bannerInstructions(): java.util.List<models.BannerInstructions>;
							public exits(): string;
							public ref(): string;
							public pronunciation(): string;
							public rotaryName(): string;
							public static typeAdapter(param0: any): any;
							public name(): string;
							public maneuver(): models.StepManeuver;
						}
						export module LegStep {
							export abstract class Builder extends java.lang.Object {
								public static class: java.lang.Class<models.LegStep.Builder>;
								public build(): models.LegStep;
								public pronunciation(param0: string): models.LegStep.Builder;
								public maneuver(param0: models.StepManeuver): models.LegStep.Builder;
								public rotaryPronunciation(param0: string): models.LegStep.Builder;
								public constructor();
								public destinations(param0: string): models.LegStep.Builder;
								public distance(param0: number): models.LegStep.Builder;
								public intersections(param0: java.util.List<models.StepIntersection>): models.LegStep.Builder;
								public drivingSide(param0: string): models.LegStep.Builder;
								public exits(param0: string): models.LegStep.Builder;
								public duration(param0: number): models.LegStep.Builder;
								public geometry(param0: string): models.LegStep.Builder;
								public voiceInstructions(param0: java.util.List<models.VoiceInstructions>): models.LegStep.Builder;
								public mode(param0: string): models.LegStep.Builder;
								public bannerInstructions(param0: java.util.List<models.BannerInstructions>): models.LegStep.Builder;
								public name(param0: string): models.LegStep.Builder;
								public ref(param0: string): models.LegStep.Builder;
								public durationTypical(param0: java.lang.Double): models.LegStep.Builder;
								public weight(param0: number): models.LegStep.Builder;
								public rotaryName(param0: string): models.LegStep.Builder;
							}
						}
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module api {
			export module directions {
				export module v5 {
					export module models {
						export class ManeuverModifier extends java.lang.Object {
							public static class: java.lang.Class<models.ManeuverModifier>;
							public static UTURN: string;
							public static SHARP_RIGHT: string;
							public static RIGHT: string;
							public static SLIGHT_RIGHT: string;
							public static STRAIGHT: string;
							public static SLIGHT_LEFT: string;
							public static LEFT: string;
							public static SHARP_LEFT: string;
							public constructor();
						}
						export module ManeuverModifier {
							export class Type extends java.lang.Object implements java.lang.annotation.Annotation {
								public static class: java.lang.Class<models.ManeuverModifier.Type>;
								/**
								 * Constructs a new instance of the ManeuverModifier$Type interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
								 */
								public constructor(implementation: {
									equals(param0: any): boolean;
									hashCode(): number;
									toString(): string;
									annotationType(): java.lang.Class<any>;
								});
								public constructor();
								public toString(): string;
								public equals(param0: any): boolean;
								public annotationType(): java.lang.Class<any>;
								public hashCode(): number;
							}
						}
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module api {
			export module directions {
				export module v5 {
					export module models {
						export abstract class MapboxStreetsV8 extends DirectionsJsonObject {
							public static class: java.lang.Class<models.MapboxStreetsV8>;
							public constructor();
							public static builder(): models.MapboxStreetsV8.Builder;
							public static typeAdapter(param0: any): any;
							public roadClass(): string;
							public toBuilder(): models.MapboxStreetsV8.Builder;
							public static fromJson(param0: string): models.MapboxStreetsV8;
						}
						export module MapboxStreetsV8 {
							export abstract class Builder extends java.lang.Object {
								public static class: java.lang.Class<models.MapboxStreetsV8.Builder>;
								public build(): models.MapboxStreetsV8;
								public constructor();
								public roadClass(param0: string): models.MapboxStreetsV8.Builder;
							}
						}
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module api {
			export module directions {
				export module v5 {
					export module models {
						export abstract class MaxSpeed extends DirectionsJsonObject {
							public static class: java.lang.Class<models.MaxSpeed>;
							public constructor();
							public none(): java.lang.Boolean;
							public unit(): string;
							public unknown(): java.lang.Boolean;
							public static builder(): models.MaxSpeed.Builder;
							public static typeAdapter(param0: any): any;
							public toBuilder(): models.MaxSpeed.Builder;
							public static fromJson(param0: string): models.MaxSpeed;
							public speed(): java.lang.Integer;
						}
						export module MaxSpeed {
							export abstract class Builder extends java.lang.Object {
								public static class: java.lang.Class<models.MaxSpeed.Builder>;
								public speed(param0: java.lang.Integer): models.MaxSpeed.Builder;
								public none(param0: java.lang.Boolean): models.MaxSpeed.Builder;
								public build(): models.MaxSpeed;
								public constructor();
								public unknown(param0: java.lang.Boolean): models.MaxSpeed.Builder;
								public unit(param0: string): models.MaxSpeed.Builder;
							}
						}
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module api {
			export module directions {
				export module v5 {
					export module models {
						export abstract class RouteLeg extends DirectionsJsonObject {
							public static class: java.lang.Class<models.RouteLeg>;
							public constructor();
							public distance(): java.lang.Double;
							public static builder(): models.RouteLeg.Builder;
							public static typeAdapter(param0: any): any;
							public durationTypical(): java.lang.Double;
							public summary(): string;
							public toBuilder(): models.RouteLeg.Builder;
							public duration(): java.lang.Double;
							public static fromJson(param0: string): models.RouteLeg;
							public steps(): java.util.List<models.LegStep>;
							public annotation(): models.LegAnnotation;
						}
						export module RouteLeg {
							export abstract class Builder extends java.lang.Object {
								public static class: java.lang.Class<models.RouteLeg.Builder>;
								public duration(param0: java.lang.Double): models.RouteLeg.Builder;
								public distance(param0: java.lang.Double): models.RouteLeg.Builder;
								public durationTypical(param0: java.lang.Double): models.RouteLeg.Builder;
								public steps(param0: java.util.List<models.LegStep>): models.RouteLeg.Builder;
								public build(): models.RouteLeg;
								public constructor();
								public annotation(param0: models.LegAnnotation): models.RouteLeg.Builder;
								public summary(param0: string): models.RouteLeg.Builder;
							}
						}
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module api {
			export module directions {
				export module v5 {
					export module models {
						export abstract class RouteOptions extends DirectionsJsonObject {
							public static class: java.lang.Class<models.RouteOptions>;
							public approachesList(): java.util.List<string>;
							public accessToken(): string;
							public annotations(): string;
							public annotationsList(): java.util.List<string>;
							public walkingOptions(): WalkingOptions;
							public radiusesList(): java.util.List<java.lang.Double>;
							public bearings(): string;
							public exclude(): string;
							public waypointNamesList(): java.util.List<string>;
							public static typeAdapter(param0: any): any;
							public approaches(): string;
							public continueStraight(): java.lang.Boolean;
							public user(): string;
							public static builder(): models.RouteOptions.Builder;
							public bannerInstructions(): java.lang.Boolean;
							public waypointIndicesList(): java.util.List<java.lang.Integer>;
							public waypointTargetsList(): java.util.List<any>;
							public radiuses(): string;
							public baseUrl(): string;
							public constructor();
							public profile(): string;
							public roundaboutExits(): java.lang.Boolean;
							public steps(): java.lang.Boolean;
							public waypointTargets(): string;
							public voiceInstructions(): java.lang.Boolean;
							public requestUuid(): string;
							public waypointNames(): string;
							public waypointIndices(): string;
							public geometries(): string;
							public bearingsList(): java.util.List<java.util.List<java.lang.Double>>;
							public coordinates(): java.util.List<any>;
							public alternatives(): java.lang.Boolean;
							public toBuilder(): models.RouteOptions.Builder;
							public overview(): string;
							public voiceUnits(): string;
							public language(): string;
							public static fromJson(param0: string): models.RouteOptions;
						}
						export module RouteOptions {
							export abstract class Builder extends java.lang.Object {
								public static class: java.lang.Class<models.RouteOptions.Builder>;
								public geometries(param0: string): models.RouteOptions.Builder;
								public annotations(param0: string): models.RouteOptions.Builder;
								public approachesList(param0: java.util.List<string>): models.RouteOptions.Builder;
								public waypointIndices(param0: string): models.RouteOptions.Builder;
								public build(): models.RouteOptions;
								public baseUrl(param0: string): models.RouteOptions.Builder;
								public radiusesList(param0: java.util.List<java.lang.Double>): models.RouteOptions.Builder;
								public approaches(param0: string): models.RouteOptions.Builder;
								public exclude(param0: string): models.RouteOptions.Builder;
								public waypointNamesList(param0: java.util.List<string>): models.RouteOptions.Builder;
								public coordinates(param0: java.util.List<any>): models.RouteOptions.Builder;
								public bannerInstructions(param0: java.lang.Boolean): models.RouteOptions.Builder;
								public alternatives(param0: java.lang.Boolean): models.RouteOptions.Builder;
								public annotationsList(param0: java.util.List<string>): models.RouteOptions.Builder;
								public user(param0: string): models.RouteOptions.Builder;
								public radiuses(param0: string): models.RouteOptions.Builder;
								public bearings(param0: string): models.RouteOptions.Builder;
								public profile(param0: string): models.RouteOptions.Builder;
								public requestUuid(param0: string): models.RouteOptions.Builder;
								public accessToken(param0: string): models.RouteOptions.Builder;
								public roundaboutExits(param0: java.lang.Boolean): models.RouteOptions.Builder;
								public constructor();
								public language(param0: string): models.RouteOptions.Builder;
								public continueStraight(param0: java.lang.Boolean): models.RouteOptions.Builder;
								public waypointNames(param0: string): models.RouteOptions.Builder;
								public voiceInstructions(param0: java.lang.Boolean): models.RouteOptions.Builder;
								public walkingOptions(param0: WalkingOptions): models.RouteOptions.Builder;
								public waypointIndicesList(param0: java.util.List<java.lang.Integer>): models.RouteOptions.Builder;
								public waypointTargetsList(param0: java.util.List<any>): models.RouteOptions.Builder;
								public steps(param0: java.lang.Boolean): models.RouteOptions.Builder;
								public voiceUnits(param0: string): models.RouteOptions.Builder;
								public overview(param0: string): models.RouteOptions.Builder;
								public bearingsList(param0: java.util.List<java.util.List<java.lang.Double>>): models.RouteOptions.Builder;
								public waypointTargets(param0: string): models.RouteOptions.Builder;
							}
						}
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module api {
			export module directions {
				export module v5 {
					export module models {
						export abstract class StepIntersection extends DirectionsJsonObject {
							public static class: java.lang.Class<models.StepIntersection>;
							public constructor();
							public entry(): java.util.List<java.lang.Boolean>;
							public rawLocation(): native.Array<number>;
							public mapboxStreetsV8(): models.MapboxStreetsV8;
							public location(): any;
							public out(): java.lang.Integer;
							public static builder(): models.StepIntersection.Builder;
							public static typeAdapter(param0: any): any;
							public geometryIndex(): java.lang.Integer;
							public toBuilder(): models.StepIntersection.Builder;
							public classes(): java.util.List<string>;
							public isUrban(): java.lang.Boolean;
							public lanes(): java.util.List<models.IntersectionLanes>;
							public in(): java.lang.Integer;
							public bearings(): java.util.List<java.lang.Integer>;
							public static fromJson(param0: string): models.StepIntersection;
						}
						export module StepIntersection {
							export abstract class Builder extends java.lang.Object {
								public static class: java.lang.Class<models.StepIntersection.Builder>;
								public in(param0: java.lang.Integer): models.StepIntersection.Builder;
								public isUrban(param0: java.lang.Boolean): models.StepIntersection.Builder;
								public geometryIndex(param0: java.lang.Integer): models.StepIntersection.Builder;
								public bearings(param0: java.util.List<java.lang.Integer>): models.StepIntersection.Builder;
								public classes(param0: java.util.List<string>): models.StepIntersection.Builder;
								public entry(param0: java.util.List<java.lang.Boolean>): models.StepIntersection.Builder;
								public lanes(param0: java.util.List<models.IntersectionLanes>): models.StepIntersection.Builder;
								public rawLocation(param0: native.Array<number>): models.StepIntersection.Builder;
								public out(param0: java.lang.Integer): models.StepIntersection.Builder;
								public constructor();
								public build(): models.StepIntersection;
								public mapboxStreetsV8(param0: models.MapboxStreetsV8): models.StepIntersection.Builder;
							}
						}
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module api {
			export module directions {
				export module v5 {
					export module models {
						export abstract class StepManeuver extends DirectionsJsonObject {
							public static class: java.lang.Class<models.StepManeuver>;
							public static TURN: string;
							public static NEW_NAME: string;
							public static DEPART: string;
							public static ARRIVE: string;
							public static MERGE: string;
							public static ON_RAMP: string;
							public static OFF_RAMP: string;
							public static FORK: string;
							public static END_OF_ROAD: string;
							public static CONTINUE: string;
							public static ROUNDABOUT: string;
							public static ROTARY: string;
							public static ROUNDABOUT_TURN: string;
							public static NOTIFICATION: string;
							public static EXIT_ROUNDABOUT: string;
							public static EXIT_ROTARY: string;
							public constructor();
							public modifier(): string;
							public rawLocation(): native.Array<number>;
							public static builder(): models.StepManeuver.Builder;
							public static typeAdapter(param0: any): any;
							public toBuilder(): models.StepManeuver.Builder;
							public location(): any;
							public static fromJson(param0: string): models.StepManeuver;
							public bearingBefore(): java.lang.Double;
							public instruction(): string;
							public bearingAfter(): java.lang.Double;
							public type(): string;
							public exit(): java.lang.Integer;
						}
						export module StepManeuver {
							export abstract class Builder extends java.lang.Object {
								public static class: java.lang.Class<models.StepManeuver.Builder>;
								public type(param0: string): models.StepManeuver.Builder;
								public rawLocation(param0: native.Array<number>): models.StepManeuver.Builder;
								public bearingAfter(param0: java.lang.Double): models.StepManeuver.Builder;
								public instruction(param0: string): models.StepManeuver.Builder;
								public exit(param0: java.lang.Integer): models.StepManeuver.Builder;
								public modifier(param0: string): models.StepManeuver.Builder;
								public bearingBefore(param0: java.lang.Double): models.StepManeuver.Builder;
								public build(): models.StepManeuver;
								public constructor();
							}
							export class StepManeuverType extends java.lang.Object implements java.lang.annotation.Annotation {
								public static class: java.lang.Class<models.StepManeuver.StepManeuverType>;
								/**
								 * Constructs a new instance of the StepManeuver$StepManeuverType interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
								 */
								public constructor(implementation: {
									equals(param0: any): boolean;
									hashCode(): number;
									toString(): string;
									annotationType(): java.lang.Class<any>;
								});
								public constructor();
								public toString(): string;
								public equals(param0: any): boolean;
								public annotationType(): java.lang.Class<any>;
								public hashCode(): number;
							}
						}
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module api {
			export module directions {
				export module v5 {
					export module models {
						export abstract class VoiceInstructions extends DirectionsJsonObject {
							public static class: java.lang.Class<models.VoiceInstructions>;
							public constructor();
							public toBuilder(): models.VoiceInstructions.Builder;
							public ssmlAnnouncement(): string;
							public static typeAdapter(param0: any): any;
							public static builder(): models.VoiceInstructions.Builder;
							public distanceAlongGeometry(): java.lang.Double;
							public announcement(): string;
							public static fromJson(param0: string): models.VoiceInstructions;
						}
						export module VoiceInstructions {
							export abstract class Builder extends java.lang.Object {
								public static class: java.lang.Class<models.VoiceInstructions.Builder>;
								public build(): models.VoiceInstructions;
								public distanceAlongGeometry(param0: java.lang.Double): models.VoiceInstructions.Builder;
								public ssmlAnnouncement(param0: string): models.VoiceInstructions.Builder;
								public constructor();
								public announcement(param0: string): models.VoiceInstructions.Builder;
							}
						}
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module api {
			export module directions {
				export module v5 {
					export module utils {
						export class FormatUtils extends java.lang.Object {
							public static class: java.lang.Class<utils.FormatUtils>;
							public constructor();
							public static formatDistributions(param0: java.util.List<native.Array<java.lang.Integer>>): string;
							public static formatPointsList(param0: java.util.List<any>): string;
							public static join(param0: string, param1: java.util.List<any>): string;
							public static formatWaypointNames(param0: java.util.List<string>): string;
							public static formatBearings(param0: java.util.List<java.util.List<java.lang.Double>>): string;
							public static formatCoordinates(param0: java.util.List<any>): string;
							public static join(param0: string, param1: java.util.List<any>, param2: boolean): string;
							public static formatCoordinate(param0: number): string;
							public static formatApproaches(param0: java.util.List<string>): string;
							public static formatRadiuses(param0: java.util.List<java.lang.Double>): string;
						}
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module api {
			export module directions {
				export module v5 {
					export module utils {
						export class ParseUtils extends java.lang.Object {
							public static class: java.lang.Class<utils.ParseUtils>;
							public constructor();
							public static parseToStrings(param0: string): java.util.List<string>;
							public static parseToStrings(param0: string, param1: string): java.util.List<string>;
							public static parseToIntegers(param0: string): java.util.List<java.lang.Integer>;
							public static parseToDoubles(param0: string): java.util.List<java.lang.Double>;
							public static parseToPoints(param0: string): java.util.List<any>;
							public static parseToListOfListOfDoubles(param0: string): java.util.List<java.util.List<java.lang.Double>>;
						}
					}
				}
			}
		}
	}
}


declare module com {
	export module mapbox {
		export module api {
			export module directionsrefresh {
				export module v1 {
					export class DirectionsRefreshService extends java.lang.Object {
						public static class: java.lang.Class<DirectionsRefreshService>;
						/**
						 * Constructs a new instance of the com.mapbox.api.directionsrefresh.v1.DirectionsRefreshService interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
						 */
						public constructor(implementation: {
							getCall(param0: string, param1: string, param2: number, param3: number, param4: string): any;
						});
						public constructor();
						public getCall(param0: string, param1: string, param2: number, param3: number, param4: string): any;
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module api {
			export module directionsrefresh {
				export module v1 {
					export abstract class MapboxDirectionsRefresh extends com.mapbox.core.MapboxService<com.mapbox.api.directionsrefresh.v1.models.DirectionsRefreshResponse,DirectionsRefreshService> {
						public static class: java.lang.Class<MapboxDirectionsRefresh>;
						public toBuilder(): MapboxDirectionsRefresh.Builder;
						public initializeCall(): any;
						public baseUrl(): string;
						public getGsonBuilder(): any;
						public constructor();
						public getOkHttpClient(): any;
						public constructor(param0: java.lang.Class<any>);
						public static builder(): MapboxDirectionsRefresh.Builder;
						public initializeCall(): any;
					}
					export module MapboxDirectionsRefresh {
						export abstract class Builder extends java.lang.Object {
							public static class: java.lang.Class<MapboxDirectionsRefresh.Builder>;
							public constructor();
							public interceptor(param0: any): MapboxDirectionsRefresh.Builder;
							public requestId(param0: string): MapboxDirectionsRefresh.Builder;
							public legIndex(param0: number): MapboxDirectionsRefresh.Builder;
							public baseUrl(param0: string): MapboxDirectionsRefresh.Builder;
							public build(): MapboxDirectionsRefresh;
							public routeIndex(param0: number): MapboxDirectionsRefresh.Builder;
							public clientAppName(param0: string): MapboxDirectionsRefresh.Builder;
							public accessToken(param0: string): MapboxDirectionsRefresh.Builder;
						}
					}
				}
			}
		}
	}
}


declare module com {
	export module mapbox {
		export module api {
			export module directionsrefresh {
				export module v1 {
					export module models {
						export abstract class DirectionsRefreshAdapterFactory extends java.lang.Object {
							public static class: java.lang.Class<com.mapbox.api.directionsrefresh.v1.models.DirectionsRefreshAdapterFactory>;
							public constructor();
							public static create(): any;
						}
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module api {
			export module directionsrefresh {
				export module v1 {
					export module models {
						export abstract class DirectionsRefreshResponse extends com.mapbox.api.directions.v5.models.DirectionsJsonObject {
							public static class: java.lang.Class<com.mapbox.api.directionsrefresh.v1.models.DirectionsRefreshResponse>;
							public constructor();
							public static typeAdapter(param0: any): any;
							public code(): string;
							public route(): com.mapbox.api.directions.v5.models.DirectionsRoute;
							public static builder(): com.mapbox.api.directionsrefresh.v1.models.DirectionsRefreshResponse.Builder;
							public message(): string;
							public static fromJson(param0: string): com.mapbox.api.directionsrefresh.v1.models.DirectionsRefreshResponse;
						}
						export module DirectionsRefreshResponse {
							export abstract class Builder extends java.lang.Object {
								public static class: java.lang.Class<com.mapbox.api.directionsrefresh.v1.models.DirectionsRefreshResponse.Builder>;
								public code(param0: string): com.mapbox.api.directionsrefresh.v1.models.DirectionsRefreshResponse.Builder;
								public message(param0: string): com.mapbox.api.directionsrefresh.v1.models.DirectionsRefreshResponse.Builder;
								public constructor();
								public route(param0: com.mapbox.api.directions.v5.models.DirectionsRoute): com.mapbox.api.directionsrefresh.v1.models.DirectionsRefreshResponse.Builder;
								public build(): com.mapbox.api.directionsrefresh.v1.models.DirectionsRefreshResponse;
							}
						}
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module api {
			export module geocoding {
				export module v5 {
					export class GeocodingCriteria extends java.lang.Object {
						public static class: java.lang.Class<com.mapbox.api.geocoding.v5.GeocodingCriteria>;
						public static MODE_PLACES: string;
						public static MODE_PLACES_PERMANENT: string;
						public static TYPE_COUNTRY: string;
						public static TYPE_REGION: string;
						public static TYPE_POSTCODE: string;
						public static TYPE_DISTRICT: string;
						public static TYPE_PLACE: string;
						public static TYPE_LOCALITY: string;
						public static TYPE_NEIGHBORHOOD: string;
						public static TYPE_ADDRESS: string;
						public static TYPE_POI: string;
						public static TYPE_POI_LANDMARK: string;
						public static REVERSE_MODE_DISTANCE: string;
						public static REVERSE_MODE_SCORE: string;
					}
					export module GeocodingCriteria {
						export class GeocodingModeCriteria extends java.lang.Object implements java.lang.annotation.Annotation {
							public static class: java.lang.Class<com.mapbox.api.geocoding.v5.GeocodingCriteria.GeocodingModeCriteria>;
							/**
							 * Constructs a new instance of the com.mapbox.api.geocoding.v5.GeocodingCriteria$GeocodingModeCriteria interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
							 */
							public constructor(implementation: {
								equals(param0: any): boolean;
								hashCode(): number;
								toString(): string;
								annotationType(): java.lang.Class<any>;
							});
							public constructor();
							public hashCode(): number;
							public annotationType(): java.lang.Class<any>;
							public toString(): string;
							public equals(param0: any): boolean;
						}
						export class GeocodingReverseModeCriteria extends java.lang.Object implements java.lang.annotation.Annotation {
							public static class: java.lang.Class<com.mapbox.api.geocoding.v5.GeocodingCriteria.GeocodingReverseModeCriteria>;
							/**
							 * Constructs a new instance of the com.mapbox.api.geocoding.v5.GeocodingCriteria$GeocodingReverseModeCriteria interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
							 */
							public constructor(implementation: {
								equals(param0: any): boolean;
								hashCode(): number;
								toString(): string;
								annotationType(): java.lang.Class<any>;
							});
							public constructor();
							public hashCode(): number;
							public annotationType(): java.lang.Class<any>;
							public toString(): string;
							public equals(param0: any): boolean;
						}
						export class GeocodingTypeCriteria extends java.lang.Object implements java.lang.annotation.Annotation {
							public static class: java.lang.Class<com.mapbox.api.geocoding.v5.GeocodingCriteria.GeocodingTypeCriteria>;
							/**
							 * Constructs a new instance of the com.mapbox.api.geocoding.v5.GeocodingCriteria$GeocodingTypeCriteria interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
							 */
							public constructor(implementation: {
								equals(param0: any): boolean;
								hashCode(): number;
								toString(): string;
								annotationType(): java.lang.Class<any>;
							});
							public constructor();
							public hashCode(): number;
							public annotationType(): java.lang.Class<any>;
							public toString(): string;
							public equals(param0: any): boolean;
						}
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module api {
			export module geocoding {
				export module v5 {
					export class GeocodingService extends java.lang.Object {
						public static class: java.lang.Class<com.mapbox.api.geocoding.v5.GeocodingService>;
						/**
						 * Constructs a new instance of the com.mapbox.api.geocoding.v5.GeocodingService interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
						 */
						public constructor(implementation: {
							getCall(param0: string, param1: string, param2: string, param3: string, param4: string, param5: string, param6: string, param7: java.lang.Boolean, param8: string, param9: string, param10: string, param11: string, param12: java.lang.Boolean): any;
							getBatchCall(param0: string, param1: string, param2: string, param3: string, param4: string, param5: string, param6: string, param7: java.lang.Boolean, param8: string, param9: string, param10: string, param11: string, param12: java.lang.Boolean): any;
						});
						public constructor();
						public getBatchCall(param0: string, param1: string, param2: string, param3: string, param4: string, param5: string, param6: string, param7: java.lang.Boolean, param8: string, param9: string, param10: string, param11: string, param12: java.lang.Boolean): any;
						public getCall(param0: string, param1: string, param2: string, param3: string, param4: string, param5: string, param6: string, param7: java.lang.Boolean, param8: string, param9: string, param10: string, param11: string, param12: java.lang.Boolean): any;
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module api {
			export module geocoding {
				export module v5 {
					export abstract class MapboxGeocoding extends com.mapbox.core.MapboxService<com.mapbox.api.geocoding.v5.models.GeocodingResponse,com.mapbox.api.geocoding.v5.GeocodingService> {
						public static class: java.lang.Class<com.mapbox.api.geocoding.v5.MapboxGeocoding>;
						public getGsonBuilder(): any;
						public enqueueBatchCall(param0: any): void;
						public baseUrl(): string;
						public constructor();
						public static builder(): com.mapbox.api.geocoding.v5.MapboxGeocoding.Builder;
						public constructor(param0: java.lang.Class<any>);
						public initializeCall(): any;
						public cancelBatchCall(): void;
						public initializeCall(): any;
						public cloneBatchCall(): any;
						public executeBatchCall(): any;
					}
					export module MapboxGeocoding {
						export abstract class Builder extends java.lang.Object {
							public static class: java.lang.Class<com.mapbox.api.geocoding.v5.MapboxGeocoding.Builder>;
							public constructor();
							public limit(param0: number): com.mapbox.api.geocoding.v5.MapboxGeocoding.Builder;
							public baseUrl(param0: string): com.mapbox.api.geocoding.v5.MapboxGeocoding.Builder;
							public geocodingTypes(param0: native.Array<string>): com.mapbox.api.geocoding.v5.MapboxGeocoding.Builder;
							public country(param0: string): com.mapbox.api.geocoding.v5.MapboxGeocoding.Builder;
							public bbox(param0: com.mapbox.geojson.BoundingBox): com.mapbox.api.geocoding.v5.MapboxGeocoding.Builder;
							public query(param0: string): com.mapbox.api.geocoding.v5.MapboxGeocoding.Builder;
							public country(param0: native.Array<string>): com.mapbox.api.geocoding.v5.MapboxGeocoding.Builder;
							public bbox(param0: number, param1: number, param2: number, param3: number): com.mapbox.api.geocoding.v5.MapboxGeocoding.Builder;
							public build(): com.mapbox.api.geocoding.v5.MapboxGeocoding;
							public clientAppName(param0: string): com.mapbox.api.geocoding.v5.MapboxGeocoding.Builder;
							public proximity(param0: any): com.mapbox.api.geocoding.v5.MapboxGeocoding.Builder;
							public autocomplete(param0: java.lang.Boolean): com.mapbox.api.geocoding.v5.MapboxGeocoding.Builder;
							public languages(param0: native.Array<java.util.Locale>): com.mapbox.api.geocoding.v5.MapboxGeocoding.Builder;
							public query(param0: any): com.mapbox.api.geocoding.v5.MapboxGeocoding.Builder;
							public country(param0: java.util.Locale): com.mapbox.api.geocoding.v5.MapboxGeocoding.Builder;
							public reverseMode(param0: string): com.mapbox.api.geocoding.v5.MapboxGeocoding.Builder;
							public bbox(param0: any, param1: any): com.mapbox.api.geocoding.v5.MapboxGeocoding.Builder;
							public fuzzyMatch(param0: java.lang.Boolean): com.mapbox.api.geocoding.v5.MapboxGeocoding.Builder;
							public languages(param0: string): com.mapbox.api.geocoding.v5.MapboxGeocoding.Builder;
							public bbox(param0: string): com.mapbox.api.geocoding.v5.MapboxGeocoding.Builder;
							public accessToken(param0: string): com.mapbox.api.geocoding.v5.MapboxGeocoding.Builder;
							public intersectionStreets(param0: string, param1: string): com.mapbox.api.geocoding.v5.MapboxGeocoding.Builder;
							public mode(param0: string): com.mapbox.api.geocoding.v5.MapboxGeocoding.Builder;
						}
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module api {
			export module geocoding {
				export module v5 {
					export class SingleElementSafeListTypeAdapter<E>  extends java.lang.Object {
						public static class: java.lang.Class<com.mapbox.api.geocoding.v5.SingleElementSafeListTypeAdapter<any>>;
						public write(param0: any, param1: java.util.List<any>): void;
						public read(param0: any): java.util.List<any>;
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module api {
			export module geocoding {
				export module v5 {
					export module models {
						export abstract class CarmenContext extends java.lang.Object implements java.io.Serializable {
							public static class: java.lang.Class<com.mapbox.api.geocoding.v5.models.CarmenContext>;
							public constructor();
							public static fromJson(param0: string): com.mapbox.api.geocoding.v5.models.CarmenContext;
							public text(): string;
							public wikidata(): string;
							public static typeAdapter(param0: any): any;
							public shortCode(): string;
							public category(): string;
							public toJson(): string;
							public toBuilder(): com.mapbox.api.geocoding.v5.models.CarmenContext.Builder;
							public static builder(): com.mapbox.api.geocoding.v5.models.CarmenContext.Builder;
							public maki(): string;
							public id(): string;
						}
						export module CarmenContext {
							export abstract class Builder extends java.lang.Object {
								public static class: java.lang.Class<com.mapbox.api.geocoding.v5.models.CarmenContext.Builder>;
								public wikidata(param0: string): com.mapbox.api.geocoding.v5.models.CarmenContext.Builder;
								public maki(param0: string): com.mapbox.api.geocoding.v5.models.CarmenContext.Builder;
								public build(): com.mapbox.api.geocoding.v5.models.CarmenContext;
								public id(param0: string): com.mapbox.api.geocoding.v5.models.CarmenContext.Builder;
								public category(param0: string): com.mapbox.api.geocoding.v5.models.CarmenContext.Builder;
								public shortCode(param0: string): com.mapbox.api.geocoding.v5.models.CarmenContext.Builder;
								public text(param0: string): com.mapbox.api.geocoding.v5.models.CarmenContext.Builder;
								public constructor();
							}
						}
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module api {
			export module geocoding {
				export module v5 {
					export module models {
						export abstract class CarmenFeature extends java.lang.Object implements com.mapbox.geojson.GeoJson {
							public static class: java.lang.Class<com.mapbox.api.geocoding.v5.models.CarmenFeature>;
							public constructor();
							public bbox(): com.mapbox.geojson.BoundingBox;
							public static builder(): com.mapbox.api.geocoding.v5.models.CarmenFeature.Builder;
							public static fromJson(param0: string): com.mapbox.api.geocoding.v5.models.CarmenFeature;
							public toJson(): string;
							public matchingText(): string;
							public static typeAdapter(param0: any): any;
							public text(): string;
							public relevance(): java.lang.Double;
							public properties(): any;
							public placeType(): java.util.List<string>;
							public address(): string;
							public type(): string;
							public geometry(): com.mapbox.geojson.Geometry;
							public context(): java.util.List<com.mapbox.api.geocoding.v5.models.CarmenContext>;
							public center(): any;
							public matchingPlaceName(): string;
							public language(): string;
							public toBuilder(): com.mapbox.api.geocoding.v5.models.CarmenFeature.Builder;
							public id(): string;
							public placeName(): string;
						}
						export module CarmenFeature {
							export abstract class Builder extends java.lang.Object {
								public static class: java.lang.Class<com.mapbox.api.geocoding.v5.models.CarmenFeature.Builder>;
								public placeType(param0: java.util.List<string>): com.mapbox.api.geocoding.v5.models.CarmenFeature.Builder;
								public placeName(param0: string): com.mapbox.api.geocoding.v5.models.CarmenFeature.Builder;
								public constructor();
								public properties(param0: any): com.mapbox.api.geocoding.v5.models.CarmenFeature.Builder;
								public geometry(param0: com.mapbox.geojson.Geometry): com.mapbox.api.geocoding.v5.models.CarmenFeature.Builder;
								public context(param0: java.util.List<com.mapbox.api.geocoding.v5.models.CarmenContext>): com.mapbox.api.geocoding.v5.models.CarmenFeature.Builder;
								public language(param0: string): com.mapbox.api.geocoding.v5.models.CarmenFeature.Builder;
								public id(param0: string): com.mapbox.api.geocoding.v5.models.CarmenFeature.Builder;
								public rawCenter(param0: native.Array<number>): com.mapbox.api.geocoding.v5.models.CarmenFeature.Builder;
								public matchingPlaceName(param0: string): com.mapbox.api.geocoding.v5.models.CarmenFeature.Builder;
								public address(param0: string): com.mapbox.api.geocoding.v5.models.CarmenFeature.Builder;
								public bbox(param0: com.mapbox.geojson.BoundingBox): com.mapbox.api.geocoding.v5.models.CarmenFeature.Builder;
								public relevance(param0: java.lang.Double): com.mapbox.api.geocoding.v5.models.CarmenFeature.Builder;
								public build(): com.mapbox.api.geocoding.v5.models.CarmenFeature;
								public text(param0: string): com.mapbox.api.geocoding.v5.models.CarmenFeature.Builder;
								public matchingText(param0: string): com.mapbox.api.geocoding.v5.models.CarmenFeature.Builder;
							}
						}
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module api {
			export module geocoding {
				export module v5 {
					export module models {
						export abstract class GeocodingAdapterFactory extends java.lang.Object {
							public static class: java.lang.Class<com.mapbox.api.geocoding.v5.models.GeocodingAdapterFactory>;
							public constructor();
							public static create(): any;
						}
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module api {
			export module geocoding {
				export module v5 {
					export module models {
						export abstract class GeocodingResponse extends java.lang.Object implements java.io.Serializable {
							public static class: java.lang.Class<com.mapbox.api.geocoding.v5.models.GeocodingResponse>;
							public constructor();
							public query(): java.util.List<string>;
							public toBuilder(): com.mapbox.api.geocoding.v5.models.GeocodingResponse.Builder;
							public static builder(): com.mapbox.api.geocoding.v5.models.GeocodingResponse.Builder;
							public features(): java.util.List<com.mapbox.api.geocoding.v5.models.CarmenFeature>;
							public static typeAdapter(param0: any): any;
							public toJson(): string;
							public type(): string;
							public attribution(): string;
							public static fromJson(param0: string): com.mapbox.api.geocoding.v5.models.GeocodingResponse;
						}
						export module GeocodingResponse {
							export abstract class Builder extends java.lang.Object {
								public static class: java.lang.Class<com.mapbox.api.geocoding.v5.models.GeocodingResponse.Builder>;
								public attribution(param0: string): com.mapbox.api.geocoding.v5.models.GeocodingResponse.Builder;
								public features(param0: java.util.List<com.mapbox.api.geocoding.v5.models.CarmenFeature>): com.mapbox.api.geocoding.v5.models.GeocodingResponse.Builder;
								public query(param0: java.util.List<string>): com.mapbox.api.geocoding.v5.models.GeocodingResponse.Builder;
								public build(): com.mapbox.api.geocoding.v5.models.GeocodingResponse;
								public constructor();
							}
						}
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module api {
			export module isochrone {
				export class IsochroneCriteria extends java.lang.Object {
					public static class: java.lang.Class<com.mapbox.api.isochrone.IsochroneCriteria>;
					public static PROFILE_DEFAULT_USER: string;
					public static PROFILE_WALKING: string;
					public static PROFILE_DRIVING: string;
					public static PROFILE_CYCLING: string;
					public constructor();
				}
				export module IsochroneCriteria {
					export class IsochroneProfile extends java.lang.Object implements java.lang.annotation.Annotation {
						public static class: java.lang.Class<com.mapbox.api.isochrone.IsochroneCriteria.IsochroneProfile>;
						/**
						 * Constructs a new instance of the com.mapbox.api.isochrone.IsochroneCriteria$IsochroneProfile interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
						 */
						public constructor(implementation: {
							equals(param0: any): boolean;
							hashCode(): number;
							toString(): string;
							annotationType(): java.lang.Class<any>;
						});
						public constructor();
						public equals(param0: any): boolean;
						public hashCode(): number;
						public toString(): string;
						public annotationType(): java.lang.Class<any>;
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module api {
			export module isochrone {
				export class IsochroneService extends java.lang.Object {
					public static class: java.lang.Class<com.mapbox.api.isochrone.IsochroneService>;
					/**
					 * Constructs a new instance of the com.mapbox.api.isochrone.IsochroneService interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
					 */
					public constructor(implementation: {
						getCall(param0: string, param1: string, param2: string, param3: string, param4: string, param5: string, param6: java.lang.Boolean, param7: java.lang.Float, param8: java.lang.Float): any;
					});
					public constructor();
					public getCall(param0: string, param1: string, param2: string, param3: string, param4: string, param5: string, param6: java.lang.Boolean, param7: java.lang.Float, param8: java.lang.Float): any;
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module api {
			export module isochrone {
				export abstract class MapboxIsochrone extends com.mapbox.core.MapboxService<com.mapbox.geojson.FeatureCollection,com.mapbox.api.isochrone.IsochroneService> {
					public static class: java.lang.Class<com.mapbox.api.isochrone.MapboxIsochrone>;
					public initializeCall(): any;
					public constructor(param0: java.lang.Class<any>);
					public initializeCall(): any;
					public constructor();
					public static builder(): com.mapbox.api.isochrone.MapboxIsochrone.Builder;
					public baseUrl(): string;
					public getGsonBuilder(): any;
				}
				export module MapboxIsochrone {
					export abstract class Builder extends java.lang.Object {
						public static class: java.lang.Class<com.mapbox.api.isochrone.MapboxIsochrone.Builder>;
						public build(): com.mapbox.api.isochrone.MapboxIsochrone;
						public constructor();
						public denoise(param0: java.lang.Float): com.mapbox.api.isochrone.MapboxIsochrone.Builder;
						public baseUrl(param0: string): com.mapbox.api.isochrone.MapboxIsochrone.Builder;
						public generalize(param0: java.lang.Float): com.mapbox.api.isochrone.MapboxIsochrone.Builder;
						public addContoursMinutes(param0: native.Array<java.lang.Integer>): com.mapbox.api.isochrone.MapboxIsochrone.Builder;
						public addContoursColors(param0: native.Array<string>): com.mapbox.api.isochrone.MapboxIsochrone.Builder;
						public profile(param0: string): com.mapbox.api.isochrone.MapboxIsochrone.Builder;
						public polygons(param0: java.lang.Boolean): com.mapbox.api.isochrone.MapboxIsochrone.Builder;
						public coordinates(param0: any): com.mapbox.api.isochrone.MapboxIsochrone.Builder;
						public coordinates(param0: string): com.mapbox.api.isochrone.MapboxIsochrone.Builder;
						public accessToken(param0: string): com.mapbox.api.isochrone.MapboxIsochrone.Builder;
						public user(param0: string): com.mapbox.api.isochrone.MapboxIsochrone.Builder;
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module api {
			export module matching {
				export module v5 {
					export class MapMatchingService extends java.lang.Object {
						public static class: java.lang.Class<com.mapbox.api.matching.v5.MapMatchingService>;
						/**
						 * Constructs a new instance of the com.mapbox.api.matching.v5.MapMatchingService interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
						 */
						public constructor(implementation: {
							getCall(param0: string, param1: string, param2: string, param3: string, param4: string, param5: string, param6: string, param7: java.lang.Boolean, param8: string, param9: string, param10: string, param11: string, param12: java.lang.Boolean, param13: java.lang.Boolean, param14: java.lang.Boolean, param15: java.lang.Boolean, param16: string, param17: string, param18: string, param19: string): any;
							postCall(param0: string, param1: string, param2: string, param3: string, param4: string, param5: string, param6: string, param7: java.lang.Boolean, param8: string, param9: string, param10: string, param11: string, param12: java.lang.Boolean, param13: java.lang.Boolean, param14: java.lang.Boolean, param15: java.lang.Boolean, param16: string, param17: string, param18: string, param19: string): any;
						});
						public constructor();
						public postCall(param0: string, param1: string, param2: string, param3: string, param4: string, param5: string, param6: string, param7: java.lang.Boolean, param8: string, param9: string, param10: string, param11: string, param12: java.lang.Boolean, param13: java.lang.Boolean, param14: java.lang.Boolean, param15: java.lang.Boolean, param16: string, param17: string, param18: string, param19: string): any;
						public getCall(param0: string, param1: string, param2: string, param3: string, param4: string, param5: string, param6: string, param7: java.lang.Boolean, param8: string, param9: string, param10: string, param11: string, param12: java.lang.Boolean, param13: java.lang.Boolean, param14: java.lang.Boolean, param15: java.lang.Boolean, param16: string, param17: string, param18: string, param19: string): any;
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module api {
			export module matching {
				export module v5 {
					export abstract class MapboxMapMatching extends com.mapbox.core.MapboxService<models.MapMatchingResponse,com.mapbox.api.matching.v5.MapMatchingService> {
						public static class: java.lang.Class<com.mapbox.api.matching.v5.MapboxMapMatching>;
						public executeCall(): any;
						public getGsonBuilder(): any;
						public executeCall(): any;
						public baseUrl(): string;
						public static builder(): com.mapbox.api.matching.v5.MapboxMapMatching.Builder;
						public constructor();
						public constructor(param0: java.lang.Class<any>);
						public initializeCall(): any;
						public enqueueCall(param0: any): void;
						public enqueueCall(param0: any): void;
						public initializeCall(): any;
					}
					export module MapboxMapMatching {
						export abstract class Builder extends java.lang.Object {
							public static class: java.lang.Class<com.mapbox.api.matching.v5.MapboxMapMatching.Builder>;
							public radiuses(param0: native.Array<java.lang.Double>): com.mapbox.api.matching.v5.MapboxMapMatching.Builder;
							public post(): com.mapbox.api.matching.v5.MapboxMapMatching.Builder;
							public get(): com.mapbox.api.matching.v5.MapboxMapMatching.Builder;
							public roundaboutExits(param0: java.lang.Boolean): com.mapbox.api.matching.v5.MapboxMapMatching.Builder;
							public voiceUnits(param0: string): com.mapbox.api.matching.v5.MapboxMapMatching.Builder;
							public clientAppName(param0: string): com.mapbox.api.matching.v5.MapboxMapMatching.Builder;
							public bannerInstructions(param0: java.lang.Boolean): com.mapbox.api.matching.v5.MapboxMapMatching.Builder;
							public annotations(param0: string): com.mapbox.api.matching.v5.MapboxMapMatching.Builder;
							public coordinates(param0: string): com.mapbox.api.matching.v5.MapboxMapMatching.Builder;
							public accessToken(param0: string): com.mapbox.api.matching.v5.MapboxMapMatching.Builder;
							public annotations(param0: native.Array<string>): com.mapbox.api.matching.v5.MapboxMapMatching.Builder;
							public coordinate(param0: any): com.mapbox.api.matching.v5.MapboxMapMatching.Builder;
							public language(param0: java.util.Locale): com.mapbox.api.matching.v5.MapboxMapMatching.Builder;
							public tidy(param0: java.lang.Boolean): com.mapbox.api.matching.v5.MapboxMapMatching.Builder;
							public user(param0: string): com.mapbox.api.matching.v5.MapboxMapMatching.Builder;
							public constructor();
							public baseUrl(param0: string): com.mapbox.api.matching.v5.MapboxMapMatching.Builder;
							/** @deprecated */
							public waypoints(param0: native.Array<java.lang.Integer>): com.mapbox.api.matching.v5.MapboxMapMatching.Builder;
							public profile(param0: string): com.mapbox.api.matching.v5.MapboxMapMatching.Builder;
							public voiceInstructions(param0: java.lang.Boolean): com.mapbox.api.matching.v5.MapboxMapMatching.Builder;
							public addWaypointNames(param0: native.Array<string>): com.mapbox.api.matching.v5.MapboxMapMatching.Builder;
							public timestamps(param0: native.Array<string>): com.mapbox.api.matching.v5.MapboxMapMatching.Builder;
							public build(): com.mapbox.api.matching.v5.MapboxMapMatching;
							public geometries(param0: string): com.mapbox.api.matching.v5.MapboxMapMatching.Builder;
							public steps(param0: java.lang.Boolean): com.mapbox.api.matching.v5.MapboxMapMatching.Builder;
							public addApproaches(param0: native.Array<string>): com.mapbox.api.matching.v5.MapboxMapMatching.Builder;
							public language(param0: string): com.mapbox.api.matching.v5.MapboxMapMatching.Builder;
							public autoBuild(): com.mapbox.api.matching.v5.MapboxMapMatching;
							public overview(param0: string): com.mapbox.api.matching.v5.MapboxMapMatching.Builder;
							public timestamps(param0: string): com.mapbox.api.matching.v5.MapboxMapMatching.Builder;
							public coordinates(param0: java.util.List<any>): com.mapbox.api.matching.v5.MapboxMapMatching.Builder;
							public waypointIndices(param0: native.Array<java.lang.Integer>): com.mapbox.api.matching.v5.MapboxMapMatching.Builder;
						}
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module api {
			export module matching {
				export module v5 {
					export class MatchingResponseFactory extends java.lang.Object {
						public static class: java.lang.Class<com.mapbox.api.matching.v5.MatchingResponseFactory>;
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module api {
			export module matching {
				export module v5 {
					export module models {
						export abstract class MapMatchingAdapterFactory extends java.lang.Object {
							public static class: java.lang.Class<MapMatchingAdapterFactory>;
							public constructor();
							public static create(): any;
						}
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module api {
			export module matching {
				export module v5 {
					export module models {
						export abstract class MapMatchingError extends java.lang.Object implements java.io.Serializable {
							public static class: java.lang.Class<MapMatchingError>;
							public constructor();
							public static builder(): MapMatchingError.Builder;
							public static typeAdapter(param0: any): any;
							public code(): string;
							public message(): string;
						}
						export module MapMatchingError {
							export abstract class Builder extends java.lang.Object {
								public static class: java.lang.Class<MapMatchingError.Builder>;
								public message(param0: string): MapMatchingError.Builder;
								public code(param0: string): MapMatchingError.Builder;
								public constructor();
								public build(): MapMatchingError;
							}
						}
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module api {
			export module matching {
				export module v5 {
					export module models {
						export abstract class MapMatchingMatching extends java.lang.Object implements java.io.Serializable {
							public static class: java.lang.Class<MapMatchingMatching>;
							public constructor();
							public weightName(): string;
							public duration(): number;
							public toDirectionRoute(): com.mapbox.api.directions.v5.models.DirectionsRoute;
							public weight(): number;
							public toBuilder(): MapMatchingMatching.Builder;
							public geometry(): string;
							public static builder(): MapMatchingMatching.Builder;
							public routeOptions(): com.mapbox.api.directions.v5.models.RouteOptions;
							public distance(): number;
							public confidence(): number;
							public legs(): any;
							public voiceLanguage(): string;
							public static typeAdapter(param0: any): any;
						}
						export module MapMatchingMatching {
							export abstract class Builder extends java.lang.Object {
								public static class: java.lang.Class<MapMatchingMatching.Builder>;
								public weightName(param0: string): MapMatchingMatching.Builder;
								public geometry(param0: string): MapMatchingMatching.Builder;
								public distance(param0: number): MapMatchingMatching.Builder;
								public weight(param0: number): MapMatchingMatching.Builder;
								public confidence(param0: number): MapMatchingMatching.Builder;
								public routeOptions(param0: com.mapbox.api.directions.v5.models.RouteOptions): MapMatchingMatching.Builder;
								public legs(param0: java.util.List<com.mapbox.api.directions.v5.models.RouteLeg>): MapMatchingMatching.Builder;
								public duration(param0: number): MapMatchingMatching.Builder;
								public constructor();
								public build(): MapMatchingMatching;
								public voiceLanguage(param0: string): MapMatchingMatching.Builder;
							}
						}
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module api {
			export module matching {
				export module v5 {
					export module models {
						export abstract class MapMatchingResponse extends java.lang.Object implements java.io.Serializable {
							public static class: java.lang.Class<MapMatchingResponse>;
							public constructor();
							public matchings(): java.util.List<MapMatchingMatching>;
							public static typeAdapter(param0: any): any;
							public code(): string;
							public static fromJson(param0: string): MapMatchingResponse;
							public tracepoints(): java.util.List<MapMatchingTracepoint>;
							public static builder(): MapMatchingResponse.Builder;
							public toBuilder(): MapMatchingResponse.Builder;
							public message(): string;
						}
						export module MapMatchingResponse {
							export abstract class Builder extends java.lang.Object {
								public static class: java.lang.Class<MapMatchingResponse.Builder>;
								public tracepoints(param0: java.util.List<MapMatchingTracepoint>): MapMatchingResponse.Builder;
								public message(param0: string): MapMatchingResponse.Builder;
								public code(param0: string): MapMatchingResponse.Builder;
								public constructor();
								public matchings(param0: java.util.List<MapMatchingMatching>): MapMatchingResponse.Builder;
								public build(): MapMatchingResponse;
							}
						}
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module api {
			export module matching {
				export module v5 {
					export module models {
						export abstract class MapMatchingTracepoint extends java.lang.Object implements java.io.Serializable {
							public static class: java.lang.Class<MapMatchingTracepoint>;
							public constructor();
							public alternativesCount(): java.lang.Integer;
							public waypointIndex(): java.lang.Integer;
							public toBuilder(): MapMatchingTracepoint.Builder;
							public static typeAdapter(param0: any): any;
							public matchingsIndex(): java.lang.Integer;
							public location(): any;
							public name(): string;
							public static builder(): MapMatchingTracepoint.Builder;
						}
						export module MapMatchingTracepoint {
							export abstract class Builder extends java.lang.Object {
								public static class: java.lang.Class<MapMatchingTracepoint.Builder>;
								public alternativesCount(param0: java.lang.Integer): MapMatchingTracepoint.Builder;
								public build(): MapMatchingTracepoint;
								public name(param0: string): MapMatchingTracepoint.Builder;
								public waypointIndex(param0: java.lang.Integer): MapMatchingTracepoint.Builder;
								public constructor();
								public matchingsIndex(param0: java.lang.Integer): MapMatchingTracepoint.Builder;
								public rawLocation(param0: native.Array<number>): MapMatchingTracepoint.Builder;
							}
						}
					}
				}
			}
		}
	}
}


declare module com {
	export module mapbox {
		export module api {
			export module matrix {
				export module v1 {
					export abstract class MapboxMatrix extends core.MapboxService<models.MatrixResponse,MatrixService> {
						public static class: java.lang.Class<MapboxMatrix>;
						public getGsonBuilder(): any;
						public baseUrl(): string;
						public static builder(): MapboxMatrix.Builder;
						public constructor();
						public constructor(param0: java.lang.Class<any>);
						public initializeCall(): any;
						public initializeCall(): any;
					}
					export module MapboxMatrix {
						export abstract class Builder extends java.lang.Object {
							public static class: java.lang.Class<MapboxMatrix.Builder>;
							public constructor();
							public accessToken(param0: string): MapboxMatrix.Builder;
							public build(): MapboxMatrix;
							public coordinates(param0: java.util.List<any>): MapboxMatrix.Builder;
							public clientAppName(param0: string): MapboxMatrix.Builder;
							public addAnnotations(param0: native.Array<string>): MapboxMatrix.Builder;
							public coordinate(param0: any): MapboxMatrix.Builder;
							public profile(param0: string): MapboxMatrix.Builder;
							public sources(param0: native.Array<java.lang.Integer>): MapboxMatrix.Builder;
							public baseUrl(param0: string): MapboxMatrix.Builder;
							public addApproaches(param0: native.Array<string>): MapboxMatrix.Builder;
							public destinations(param0: native.Array<java.lang.Integer>): MapboxMatrix.Builder;
							public coordinateListSizeLimit(param0: java.lang.Integer): MapboxMatrix.Builder;
							public user(param0: string): MapboxMatrix.Builder;
						}
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module api {
			export module matrix {
				export module v1 {
					export abstract class MatrixAdapterFactory extends java.lang.Object {
						public static class: java.lang.Class<MatrixAdapterFactory>;
						public constructor();
						public static create(): any;
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module api {
			export module matrix {
				export module v1 {
					export class MatrixService extends java.lang.Object {
						public static class: java.lang.Class<MatrixService>;
						/**
						 * Constructs a new instance of the MatrixService interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
						 */
						public constructor(implementation: {
							getCall(param0: string, param1: string, param2: string, param3: string, param4: string, param5: string, param6: string, param7: string, param8: string): any;
						});
						public constructor();
						public getCall(param0: string, param1: string, param2: string, param3: string, param4: string, param5: string, param6: string, param7: string, param8: string): any;
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module api {
			export module matrix {
				export module v1 {
					export module models {
						export abstract class MatrixResponse extends java.lang.Object implements java.io.Serializable {
							public static class: java.lang.Class<MatrixResponse>;
							public constructor();
							public destinations(): java.util.List<com.mapbox.api.directions.v5.models.DirectionsWaypoint>;
							public sources(): java.util.List<com.mapbox.api.directions.v5.models.DirectionsWaypoint>;
							public code(): string;
							public durations(): java.util.List<native.Array<java.lang.Double>>;
							public toBuilder(): MatrixResponse.Builder;
							public static builder(): MatrixResponse.Builder;
							public distances(): java.util.List<native.Array<java.lang.Double>>;
							public static typeAdapter(param0: any): any;
						}
						export module MatrixResponse {
							export abstract class Builder extends java.lang.Object {
								public static class: java.lang.Class<MatrixResponse.Builder>;
								public build(): MatrixResponse;
								public durations(param0: java.util.List<native.Array<java.lang.Double>>): MatrixResponse.Builder;
								public constructor();
								public sources(param0: java.util.List<com.mapbox.api.directions.v5.models.DirectionsWaypoint>): MatrixResponse.Builder;
								public code(param0: string): MatrixResponse.Builder;
								public distances(param0: java.util.List<native.Array<java.lang.Double>>): MatrixResponse.Builder;
								public destinations(param0: java.util.List<com.mapbox.api.directions.v5.models.DirectionsWaypoint>): MatrixResponse.Builder;
							}
						}
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module api {
			export module optimization {
				export module v1 {
					export abstract class MapboxOptimization extends com.mapbox.core.MapboxService<com.mapbox.api.optimization.v1.models.OptimizationResponse,com.mapbox.api.optimization.v1.OptimizationService> {
						public static class: java.lang.Class<com.mapbox.api.optimization.v1.MapboxOptimization>;
						public getGsonBuilder(): any;
						public baseUrl(): string;
						public constructor();
						public constructor(param0: java.lang.Class<any>);
						public initializeCall(): any;
						public initializeCall(): any;
						public static builder(): com.mapbox.api.optimization.v1.MapboxOptimization.Builder;
					}
					export module MapboxOptimization {
						export abstract class Builder extends java.lang.Object {
							public static class: java.lang.Class<com.mapbox.api.optimization.v1.MapboxOptimization.Builder>;
							public constructor();
							public bearing(param0: java.lang.Double, param1: java.lang.Double): com.mapbox.api.optimization.v1.MapboxOptimization.Builder;
							public radiuses(param0: native.Array<number>): com.mapbox.api.optimization.v1.MapboxOptimization.Builder;
							public baseUrl(param0: string): com.mapbox.api.optimization.v1.MapboxOptimization.Builder;
							public user(param0: string): com.mapbox.api.optimization.v1.MapboxOptimization.Builder;
							public source(param0: string): com.mapbox.api.optimization.v1.MapboxOptimization.Builder;
							public steps(param0: java.lang.Boolean): com.mapbox.api.optimization.v1.MapboxOptimization.Builder;
							public language(param0: string): com.mapbox.api.optimization.v1.MapboxOptimization.Builder;
							public overview(param0: string): com.mapbox.api.optimization.v1.MapboxOptimization.Builder;
							public build(): com.mapbox.api.optimization.v1.MapboxOptimization;
							public roundTrip(param0: java.lang.Boolean): com.mapbox.api.optimization.v1.MapboxOptimization.Builder;
							public annotations(param0: native.Array<string>): com.mapbox.api.optimization.v1.MapboxOptimization.Builder;
							public coordinates(param0: java.util.List<any>): com.mapbox.api.optimization.v1.MapboxOptimization.Builder;
							public geometries(param0: string): com.mapbox.api.optimization.v1.MapboxOptimization.Builder;
							public language(param0: java.util.Locale): com.mapbox.api.optimization.v1.MapboxOptimization.Builder;
							public profile(param0: string): com.mapbox.api.optimization.v1.MapboxOptimization.Builder;
							public destination(param0: string): com.mapbox.api.optimization.v1.MapboxOptimization.Builder;
							public clientAppName(param0: string): com.mapbox.api.optimization.v1.MapboxOptimization.Builder;
							public coordinate(param0: any): com.mapbox.api.optimization.v1.MapboxOptimization.Builder;
							public accessToken(param0: string): com.mapbox.api.optimization.v1.MapboxOptimization.Builder;
							public distribution(param0: java.lang.Integer, param1: java.lang.Integer): com.mapbox.api.optimization.v1.MapboxOptimization.Builder;
						}
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module api {
			export module optimization {
				export module v1 {
					export class OptimizationService extends java.lang.Object {
						public static class: java.lang.Class<com.mapbox.api.optimization.v1.OptimizationService>;
						/**
						 * Constructs a new instance of the com.mapbox.api.optimization.v1.OptimizationService interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
						 */
						public constructor(implementation: {
							getCall(param0: string, param1: string, param2: string, param3: string, param4: string, param5: java.lang.Boolean, param6: string, param7: string, param8: java.lang.Boolean, param9: string, param10: string, param11: string, param12: string, param13: string, param14: string, param15: string): any;
						});
						public constructor();
						public getCall(param0: string, param1: string, param2: string, param3: string, param4: string, param5: java.lang.Boolean, param6: string, param7: string, param8: java.lang.Boolean, param9: string, param10: string, param11: string, param12: string, param13: string, param14: string, param15: string): any;
					}
				}
			}
		}
	}
}


declare module com {
	export module mapbox {
		export module api {
			export module optimization {
				export module v1 {
					export module models {
						export abstract class OptimizationAdapterFactory extends java.lang.Object {
							public static class: java.lang.Class<com.mapbox.api.optimization.v1.models.OptimizationAdapterFactory>;
							public constructor();
							public static create(): any;
						}
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module api {
			export module optimization {
				export module v1 {
					export module models {
						export abstract class OptimizationResponse extends java.lang.Object implements java.io.Serializable {
							public static class: java.lang.Class<com.mapbox.api.optimization.v1.models.OptimizationResponse>;
							public constructor();
							public waypoints(): java.util.List<com.mapbox.api.optimization.v1.models.OptimizationWaypoint>;
							public code(): string;
							public toBuilder(): com.mapbox.api.optimization.v1.models.OptimizationResponse.Builder;
							public trips(): java.util.List<com.mapbox.api.directions.v5.models.DirectionsRoute>;
							public static builder(): com.mapbox.api.optimization.v1.models.OptimizationResponse.Builder;
							public static typeAdapter(param0: any): any;
						}
						export module OptimizationResponse {
							export abstract class Builder extends java.lang.Object {
								public static class: java.lang.Class<com.mapbox.api.optimization.v1.models.OptimizationResponse.Builder>;
								public waypoints(param0: java.util.List<com.mapbox.api.optimization.v1.models.OptimizationWaypoint>): com.mapbox.api.optimization.v1.models.OptimizationResponse.Builder;
								public trips(param0: java.util.List<com.mapbox.api.directions.v5.models.DirectionsRoute>): com.mapbox.api.optimization.v1.models.OptimizationResponse.Builder;
								public constructor();
								public build(): com.mapbox.api.optimization.v1.models.OptimizationResponse;
								public code(param0: string): com.mapbox.api.optimization.v1.models.OptimizationResponse.Builder;
							}
						}
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module api {
			export module optimization {
				export module v1 {
					export module models {
						export abstract class OptimizationWaypoint extends java.lang.Object implements java.io.Serializable {
							public static class: java.lang.Class<com.mapbox.api.optimization.v1.models.OptimizationWaypoint>;
							public constructor();
							public static builder(): com.mapbox.api.optimization.v1.models.OptimizationWaypoint.Builder;
							public toBuilder(): com.mapbox.api.optimization.v1.models.OptimizationWaypoint.Builder;
							public name(): string;
							public location(): any;
							public waypointIndex(): number;
							public static typeAdapter(param0: any): any;
							public tripsIndex(): number;
						}
						export module OptimizationWaypoint {
							export abstract class Builder extends java.lang.Object {
								public static class: java.lang.Class<com.mapbox.api.optimization.v1.models.OptimizationWaypoint.Builder>;
								public tripsIndex(param0: number): com.mapbox.api.optimization.v1.models.OptimizationWaypoint.Builder;
								public name(param0: string): com.mapbox.api.optimization.v1.models.OptimizationWaypoint.Builder;
								public waypointIndex(param0: number): com.mapbox.api.optimization.v1.models.OptimizationWaypoint.Builder;
								public rawLocation(param0: native.Array<number>): com.mapbox.api.optimization.v1.models.OptimizationWaypoint.Builder;
								public constructor();
								public build(): com.mapbox.api.optimization.v1.models.OptimizationWaypoint;
							}
						}
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module api {
			export module routetiles {
				export module v1 {
					export abstract class MapboxRouteTiles extends com.mapbox.core.MapboxService<any,com.mapbox.api.routetiles.v1.RouteTilesService> {
						public static class: java.lang.Class<com.mapbox.api.routetiles.v1.MapboxRouteTiles>;
						public baseUrl(): string;
						public constructor();
						public getOkHttpClient(): any;
						public constructor(param0: java.lang.Class<any>);
						public initializeCall(): any;
						public toBuilder(): com.mapbox.api.routetiles.v1.MapboxRouteTiles.Builder;
						public initializeCall(): any;
						public static builder(): com.mapbox.api.routetiles.v1.MapboxRouteTiles.Builder;
					}
					export module MapboxRouteTiles {
						export abstract class Builder extends java.lang.Object {
							public static class: java.lang.Class<com.mapbox.api.routetiles.v1.MapboxRouteTiles.Builder>;
							public constructor();
							public interceptor(param0: any): com.mapbox.api.routetiles.v1.MapboxRouteTiles.Builder;
							public clientAppName(param0: string): com.mapbox.api.routetiles.v1.MapboxRouteTiles.Builder;
							public boundingBox(param0: com.mapbox.geojson.BoundingBox): com.mapbox.api.routetiles.v1.MapboxRouteTiles.Builder;
							public baseUrl(param0: string): com.mapbox.api.routetiles.v1.MapboxRouteTiles.Builder;
							public build(): com.mapbox.api.routetiles.v1.MapboxRouteTiles;
							public accessToken(param0: string): com.mapbox.api.routetiles.v1.MapboxRouteTiles.Builder;
							public version(param0: string): com.mapbox.api.routetiles.v1.MapboxRouteTiles.Builder;
							public networkInterceptor(param0: any): com.mapbox.api.routetiles.v1.MapboxRouteTiles.Builder;
						}
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module api {
			export module routetiles {
				export module v1 {
					export class RouteTilesService extends java.lang.Object {
						public static class: java.lang.Class<com.mapbox.api.routetiles.v1.RouteTilesService>;
						/**
						 * Constructs a new instance of the com.mapbox.api.routetiles.v1.RouteTilesService interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
						 */
						public constructor(implementation: {
							getCall(param0: string, param1: string, param2: string, param3: string): any;
						});
						public constructor();
						public getCall(param0: string, param1: string, param2: string, param3: string): any;
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module api {
			export module routetiles {
				export module v1 {
					export module versions {
						export abstract class MapboxRouteTileVersions extends com.mapbox.core.MapboxService<com.mapbox.api.routetiles.v1.versions.models.RouteTileVersionsResponse,com.mapbox.api.routetiles.v1.versions.RouteTileVersionsService> {
							public static class: java.lang.Class<com.mapbox.api.routetiles.v1.versions.MapboxRouteTileVersions>;
							public constructor();
							public static builder(): com.mapbox.api.routetiles.v1.versions.MapboxRouteTileVersions.Builder;
							public constructor(param0: java.lang.Class<any>);
							public getGsonBuilder(): any;
							public initializeCall(): any;
							public initializeCall(): any;
							public baseUrl(): string;
							public toBuilder(): com.mapbox.api.routetiles.v1.versions.MapboxRouteTileVersions.Builder;
						}
						export module MapboxRouteTileVersions {
							export abstract class Builder extends java.lang.Object {
								public static class: java.lang.Class<com.mapbox.api.routetiles.v1.versions.MapboxRouteTileVersions.Builder>;
								public baseUrl(param0: string): com.mapbox.api.routetiles.v1.versions.MapboxRouteTileVersions.Builder;
								public accessToken(param0: string): com.mapbox.api.routetiles.v1.versions.MapboxRouteTileVersions.Builder;
								public build(): com.mapbox.api.routetiles.v1.versions.MapboxRouteTileVersions;
								public constructor();
								public clientAppName(param0: string): com.mapbox.api.routetiles.v1.versions.MapboxRouteTileVersions.Builder;
							}
						}
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module api {
			export module routetiles {
				export module v1 {
					export module versions {
						export class RouteTileVersionsService extends java.lang.Object {
							public static class: java.lang.Class<com.mapbox.api.routetiles.v1.versions.RouteTileVersionsService>;
							/**
							 * Constructs a new instance of the com.mapbox.api.routetiles.v1.versions.RouteTileVersionsService interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
							 */
							public constructor(implementation: {
								getCall(param0: string, param1: string): any;
							});
							public constructor();
							public getCall(param0: string, param1: string): any;
						}
					}
				}
			}
		}
	}
}


declare module com {
	export module mapbox {
		export module api {
			export module routetiles {
				export module v1 {
					export module versions {
						export module models {
							export abstract class RouteTileVersionsAdapterFactory extends java.lang.Object {
								public static class: java.lang.Class<com.mapbox.api.routetiles.v1.versions.models.RouteTileVersionsAdapterFactory>;
								public static create(): any;
								public constructor();
							}
						}
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module api {
			export module routetiles {
				export module v1 {
					export module versions {
						export module models {
							export abstract class RouteTileVersionsResponse extends java.lang.Object {
								public static class: java.lang.Class<com.mapbox.api.routetiles.v1.versions.models.RouteTileVersionsResponse>;
								public static typeAdapter(param0: any): any;
								public constructor();
								public create(param0: java.util.List<string>): com.mapbox.api.routetiles.v1.versions.models.RouteTileVersionsResponse;
								public availableVersions(): java.util.List<string>;
							}
						}
					}
				}
			}
		}
	}
}


declare module com {
	export module mapbox {
		export module api {
			export module speech {
				export module v1 {
					export abstract class MapboxSpeech extends com.mapbox.core.MapboxService<any,com.mapbox.api.speech.v1.SpeechService> {
						public static class: java.lang.Class<com.mapbox.api.speech.v1.MapboxSpeech>;
						public baseUrl(): string;
						public constructor();
						public getOkHttpClient(): any;
						public constructor(param0: java.lang.Class<any>);
						public initializeCall(): any;
						public static builder(): com.mapbox.api.speech.v1.MapboxSpeech.Builder;
						public initializeCall(): any;
					}
					export module MapboxSpeech {
						export abstract class Builder extends java.lang.Object {
							public static class: java.lang.Class<com.mapbox.api.speech.v1.MapboxSpeech.Builder>;
							public constructor();
							public cache(param0: any): com.mapbox.api.speech.v1.MapboxSpeech.Builder;
							public outputType(param0: string): com.mapbox.api.speech.v1.MapboxSpeech.Builder;
							public textType(param0: string): com.mapbox.api.speech.v1.MapboxSpeech.Builder;
							public instruction(param0: string): com.mapbox.api.speech.v1.MapboxSpeech.Builder;
							public interceptor(param0: any): com.mapbox.api.speech.v1.MapboxSpeech.Builder;
							public accessToken(param0: string): com.mapbox.api.speech.v1.MapboxSpeech.Builder;
							public build(): com.mapbox.api.speech.v1.MapboxSpeech;
							public language(param0: string): com.mapbox.api.speech.v1.MapboxSpeech.Builder;
							public baseUrl(param0: string): com.mapbox.api.speech.v1.MapboxSpeech.Builder;
							public networkInterceptor(param0: any): com.mapbox.api.speech.v1.MapboxSpeech.Builder;
						}
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module api {
			export module speech {
				export module v1 {
					export class SpeechService extends java.lang.Object {
						public static class: java.lang.Class<com.mapbox.api.speech.v1.SpeechService>;
						/**
						 * Constructs a new instance of the com.mapbox.api.speech.v1.SpeechService interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
						 */
						public constructor(implementation: {
							getCall(param0: string, param1: string, param2: string, param3: string, param4: string): any;
						});
						public constructor();
						public getCall(param0: string, param1: string, param2: string, param3: string, param4: string): any;
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module api {
			export module staticmap {
				export module v1 {
					export abstract class MapboxStaticMap extends java.lang.Object {
						public static class: java.lang.Class<com.mapbox.api.staticmap.v1.MapboxStaticMap>;
						public constructor();
						public static builder(): com.mapbox.api.staticmap.v1.MapboxStaticMap.Builder;
						public url(): any;
					}
					export module MapboxStaticMap {
						export abstract class Builder extends java.lang.Object {
							public static class: java.lang.Class<com.mapbox.api.staticmap.v1.MapboxStaticMap.Builder>;
							public constructor();
							public beforeLayer(param0: string): com.mapbox.api.staticmap.v1.MapboxStaticMap.Builder;
							public cameraPitch(param0: number): com.mapbox.api.staticmap.v1.MapboxStaticMap.Builder;
							public cameraPoint(param0: any): com.mapbox.api.staticmap.v1.MapboxStaticMap.Builder;
							public cameraBearing(param0: number): com.mapbox.api.staticmap.v1.MapboxStaticMap.Builder;
							public styleId(param0: string): com.mapbox.api.staticmap.v1.MapboxStaticMap.Builder;
							public retina(param0: boolean): com.mapbox.api.staticmap.v1.MapboxStaticMap.Builder;
							public staticPolylineAnnotations(param0: java.util.List<com.mapbox.api.staticmap.v1.models.StaticPolylineAnnotation>): com.mapbox.api.staticmap.v1.MapboxStaticMap.Builder;
							public cameraAuto(param0: boolean): com.mapbox.api.staticmap.v1.MapboxStaticMap.Builder;
							public geoJson(param0: com.mapbox.geojson.GeoJson): com.mapbox.api.staticmap.v1.MapboxStaticMap.Builder;
							public width(param0: number): com.mapbox.api.staticmap.v1.MapboxStaticMap.Builder;
							public baseUrl(param0: string): com.mapbox.api.staticmap.v1.MapboxStaticMap.Builder;
							public accessToken(param0: string): com.mapbox.api.staticmap.v1.MapboxStaticMap.Builder;
							public user(param0: string): com.mapbox.api.staticmap.v1.MapboxStaticMap.Builder;
							public attribution(param0: boolean): com.mapbox.api.staticmap.v1.MapboxStaticMap.Builder;
							public height(param0: number): com.mapbox.api.staticmap.v1.MapboxStaticMap.Builder;
							public precision(param0: number): com.mapbox.api.staticmap.v1.MapboxStaticMap.Builder;
							public logo(param0: boolean): com.mapbox.api.staticmap.v1.MapboxStaticMap.Builder;
							public cameraZoom(param0: number): com.mapbox.api.staticmap.v1.MapboxStaticMap.Builder;
							public build(): com.mapbox.api.staticmap.v1.MapboxStaticMap;
							public staticMarkerAnnotations(param0: java.util.List<com.mapbox.api.staticmap.v1.models.StaticMarkerAnnotation>): com.mapbox.api.staticmap.v1.MapboxStaticMap.Builder;
						}
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module api {
			export module staticmap {
				export module v1 {
					export class StaticMapCriteria extends java.lang.Object {
						public static class: java.lang.Class<com.mapbox.api.staticmap.v1.StaticMapCriteria>;
						public static SMALL_PIN: string;
						public static MEDIUM_PIN: string;
						public static LARGE_PIN: string;
						public static STREET_STYLE: string;
						public static OUTDOORS_STYLE: string;
						public static LIGHT_STYLE: string;
						public static DARK_STYLE: string;
						public static SATELLITE_STYLE: string;
						public static SATELLITE_STREETS_STYLE: string;
						public static NAVIGATION_PREVIEW_DAY: string;
						public static NAVIGATION_PREVIEW_NIGHT: string;
						public static NAVIGATION_GUIDANCE_DAY: string;
						public static NAVIGATION_GUIDANCE_NIGHT: string;
					}
					export module StaticMapCriteria {
						export class MarkerCriteria extends java.lang.Object implements java.lang.annotation.Annotation {
							public static class: java.lang.Class<com.mapbox.api.staticmap.v1.StaticMapCriteria.MarkerCriteria>;
							/**
							 * Constructs a new instance of the com.mapbox.api.staticmap.v1.StaticMapCriteria$MarkerCriteria interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
							 */
							public constructor(implementation: {
								equals(param0: any): boolean;
								hashCode(): number;
								toString(): string;
								annotationType(): java.lang.Class<any>;
							});
							public constructor();
							public hashCode(): number;
							public annotationType(): java.lang.Class<any>;
							public toString(): string;
							public equals(param0: any): boolean;
						}
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module api {
			export module staticmap {
				export module v1 {
					export module models {
						export abstract class StaticMarkerAnnotation extends java.lang.Object {
							public static class: java.lang.Class<com.mapbox.api.staticmap.v1.models.StaticMarkerAnnotation>;
							public constructor();
							public static builder(): com.mapbox.api.staticmap.v1.models.StaticMarkerAnnotation.Builder;
							public url(): string;
							public toBuilder(): com.mapbox.api.staticmap.v1.models.StaticMarkerAnnotation.Builder;
						}
						export module StaticMarkerAnnotation {
							export abstract class Builder extends java.lang.Object {
								public static class: java.lang.Class<com.mapbox.api.staticmap.v1.models.StaticMarkerAnnotation.Builder>;
								public color(param0: string): com.mapbox.api.staticmap.v1.models.StaticMarkerAnnotation.Builder;
								public iconUrl(param0: string): com.mapbox.api.staticmap.v1.models.StaticMarkerAnnotation.Builder;
								public build(): com.mapbox.api.staticmap.v1.models.StaticMarkerAnnotation;
								public name(param0: string): com.mapbox.api.staticmap.v1.models.StaticMarkerAnnotation.Builder;
								public color(param0: number, param1: number, param2: number): com.mapbox.api.staticmap.v1.models.StaticMarkerAnnotation.Builder;
								public constructor();
								public label(param0: string): com.mapbox.api.staticmap.v1.models.StaticMarkerAnnotation.Builder;
								public lnglat(param0: any): com.mapbox.api.staticmap.v1.models.StaticMarkerAnnotation.Builder;
							}
						}
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module api {
			export module staticmap {
				export module v1 {
					export module models {
						export abstract class StaticPolylineAnnotation extends java.lang.Object {
							public static class: java.lang.Class<com.mapbox.api.staticmap.v1.models.StaticPolylineAnnotation>;
							public constructor();
							public static builder(): com.mapbox.api.staticmap.v1.models.StaticPolylineAnnotation.Builder;
							public url(): string;
							public toBuilder(): com.mapbox.api.staticmap.v1.models.StaticPolylineAnnotation.Builder;
						}
						export module StaticPolylineAnnotation {
							export abstract class Builder extends java.lang.Object {
								public static class: java.lang.Class<com.mapbox.api.staticmap.v1.models.StaticPolylineAnnotation.Builder>;
								public strokeColor(param0: string): com.mapbox.api.staticmap.v1.models.StaticPolylineAnnotation.Builder;
								public fillColor(param0: string): com.mapbox.api.staticmap.v1.models.StaticPolylineAnnotation.Builder;
								public build(): com.mapbox.api.staticmap.v1.models.StaticPolylineAnnotation;
								public fillOpacity(param0: java.lang.Float): com.mapbox.api.staticmap.v1.models.StaticPolylineAnnotation.Builder;
								public constructor();
								public fillColor(param0: number, param1: number, param2: number): com.mapbox.api.staticmap.v1.models.StaticPolylineAnnotation.Builder;
								public polyline(param0: string): com.mapbox.api.staticmap.v1.models.StaticPolylineAnnotation.Builder;
								public strokeWidth(param0: java.lang.Double): com.mapbox.api.staticmap.v1.models.StaticPolylineAnnotation.Builder;
								public strokeColor(param0: number, param1: number, param2: number): com.mapbox.api.staticmap.v1.models.StaticPolylineAnnotation.Builder;
								public strokeOpacity(param0: java.lang.Float): com.mapbox.api.staticmap.v1.models.StaticPolylineAnnotation.Builder;
							}
						}
					}
				}
			}
		}
	}
}


declare module com {
	export module mapbox {
		export module api {
			export module tilequery {
				export abstract class MapboxTilequery extends com.mapbox.core.MapboxService<com.mapbox.geojson.FeatureCollection,com.mapbox.api.tilequery.TilequeryService> {
					public static class: java.lang.Class<com.mapbox.api.tilequery.MapboxTilequery>;
					public static builder(): com.mapbox.api.tilequery.MapboxTilequery.Builder;
					public initializeCall(): any;
					public constructor(param0: java.lang.Class<any>);
					public initializeCall(): any;
					public enqueueBatchCall(param0: any): void;
					public constructor();
					public cancelBatchCall(): void;
					public cloneBatchCall(): any;
					public executeBatchCall(): any;
					public baseUrl(): string;
					public getGsonBuilder(): any;
				}
				export module MapboxTilequery {
					export abstract class Builder extends java.lang.Object {
						public static class: java.lang.Class<com.mapbox.api.tilequery.MapboxTilequery.Builder>;
						public limit(param0: java.lang.Integer): com.mapbox.api.tilequery.MapboxTilequery.Builder;
						public dedupe(param0: java.lang.Boolean): com.mapbox.api.tilequery.MapboxTilequery.Builder;
						public constructor();
						public geometry(param0: string): com.mapbox.api.tilequery.MapboxTilequery.Builder;
						public layers(param0: string): com.mapbox.api.tilequery.MapboxTilequery.Builder;
						public accessToken(param0: string): com.mapbox.api.tilequery.MapboxTilequery.Builder;
						public query(param0: string): com.mapbox.api.tilequery.MapboxTilequery.Builder;
						public baseUrl(param0: string): com.mapbox.api.tilequery.MapboxTilequery.Builder;
						public radius(param0: java.lang.Integer): com.mapbox.api.tilequery.MapboxTilequery.Builder;
						public build(): com.mapbox.api.tilequery.MapboxTilequery;
						public query(param0: any): com.mapbox.api.tilequery.MapboxTilequery.Builder;
						public tilesetIds(param0: string): com.mapbox.api.tilequery.MapboxTilequery.Builder;
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module api {
			export module tilequery {
				export class TilequeryCriteria extends java.lang.Object {
					public static class: java.lang.Class<com.mapbox.api.tilequery.TilequeryCriteria>;
					public static TILEQUERY_GEOMETRY_POLYGON: string;
					public static TILEQUERY_GEOMETRY_LINESTRING: string;
					public static TILEQUERY_GEOMETRY_POINT: string;
					public constructor();
				}
				export module TilequeryCriteria {
					export class TilequeryGeometry extends java.lang.Object implements java.lang.annotation.Annotation {
						public static class: java.lang.Class<com.mapbox.api.tilequery.TilequeryCriteria.TilequeryGeometry>;
						/**
						 * Constructs a new instance of the com.mapbox.api.tilequery.TilequeryCriteria$TilequeryGeometry interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
						 */
						public constructor(implementation: {
							equals(param0: any): boolean;
							hashCode(): number;
							toString(): string;
							annotationType(): java.lang.Class<any>;
						});
						public constructor();
						public equals(param0: any): boolean;
						public hashCode(): number;
						public toString(): string;
						public annotationType(): java.lang.Class<any>;
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module api {
			export module tilequery {
				export class TilequeryService extends java.lang.Object {
					public static class: java.lang.Class<com.mapbox.api.tilequery.TilequeryService>;
					/**
					 * Constructs a new instance of the com.mapbox.api.tilequery.TilequeryService interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
					 */
					public constructor(implementation: {
						getCall(param0: string, param1: string, param2: string, param3: java.lang.Integer, param4: java.lang.Integer, param5: java.lang.Boolean, param6: string, param7: string): any;
						getBatchCall(param0: string, param1: string, param2: string, param3: java.lang.Integer, param4: java.lang.Integer, param5: java.lang.Boolean, param6: string, param7: string): any;
					});
					public constructor();
					public getBatchCall(param0: string, param1: string, param2: string, param3: java.lang.Integer, param4: java.lang.Integer, param5: java.lang.Boolean, param6: string, param7: string): any;
					public getCall(param0: string, param1: string, param2: string, param3: java.lang.Integer, param4: java.lang.Integer, param5: java.lang.Boolean, param6: string, param7: string): any;
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module core {
			export class BuildConfig extends java.lang.Object {
				public static class: java.lang.Class<com.mapbox.core.BuildConfig>;
				public static VERSION: string;
				public static NAME: string;
				public static GIT_REVISION: string;
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module core {
			export abstract class MapboxService<T, S>  extends java.lang.Object {
				public static class: java.lang.Class<com.mapbox.core.MapboxService<any,any>>;
				public static MAX_URL_SIZE: number;
				public okHttpClient: any;
				public baseUrl(): string;
				public isEnableDebug(): boolean;
				public getOkHttpClient(): any;
				public executeCall(): any;
				public cancelCall(): void;
				public enableDebug(param0: boolean): void;
				public getService(): S;
				public cloneCall(): any;
				public setCallFactory(param0: any): void;
				public getCall(): any;
				public getRetrofit(): any;
				public constructor(param0: java.lang.Class<S>);
				public initializeCall(): any;
				public getGsonBuilder(): any;
				public enqueueCall(param0: any): void;
				public getCallFactory(): any;
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module core {
			export module constants {
				export class Constants extends java.lang.Object {
					public static class: java.lang.Class<com.mapbox.core.constants.Constants>;
					public static HEADER_USER_AGENT: string;
					public static BASE_API_URL: string;
					public static MAPBOX_USER: string;
					public static PRECISION_6: number;
					public static PRECISION_5: number;
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module core {
			export module exceptions {
				export class ServicesException extends java.lang.RuntimeException {
					public static class: java.lang.Class<com.mapbox.core.exceptions.ServicesException>;
					public constructor(param0: string, param1: java.lang.Throwable, param2: boolean, param3: boolean);
					public constructor(param0: string, param1: java.lang.Throwable);
					public constructor(param0: string);
					public constructor(param0: java.lang.Throwable);
					public constructor();
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module core {
			export module internal {
				export class Preconditions extends java.lang.Object {
					public static class: java.lang.Class<com.mapbox.core.internal.Preconditions>;
					public static checkNotNull(param0: any, param1: string): void;
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module core {
			export module utils {
				export class ApiCallHelper extends java.lang.Object {
					public static class: java.lang.Class<com.mapbox.core.utils.ApiCallHelper>;
					public static getHeaderUserAgent(param0: string, param1: string, param2: string, param3: string): string;
					public static getHeaderUserAgent(param0: string): string;
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module core {
			export module utils {
				export class ColorUtils extends java.lang.Object {
					public static class: java.lang.Class<com.mapbox.core.utils.ColorUtils>;
					public static toHexString(param0: number, param1: number, param2: number): string;
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module core {
			export module utils {
				export class MapboxUtils extends java.lang.Object {
					public static class: java.lang.Class<com.mapbox.core.utils.MapboxUtils>;
					public static isAccessTokenValid(param0: string): boolean;
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module core {
			export module utils {
				export class TextUtils extends java.lang.Object {
					public static class: java.lang.Class<com.mapbox.core.utils.TextUtils>;
					/** @deprecated */
					public static formatApproaches(param0: native.Array<string>): string;
					/** @deprecated */
					public static formatBearing(param0: java.util.List<native.Array<java.lang.Double>>): string;
					/** @deprecated */
					public static formatRadiuses(param0: native.Array<number>): string;
					public static formatCoordinate(param0: number, param1: number): string;
					/** @deprecated */
					public static formatDistributions(param0: java.util.List<native.Array<java.lang.Integer>>): string;
					public static isEmpty(param0: string): boolean;
					public static formatCoordinate(param0: number): string;
					/** @deprecated */
					public static formatWaypointNames(param0: native.Array<string>): string;
					public static join(param0: string, param1: native.Array<any>): string;
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module geojson {
			export abstract class BaseCoordinatesTypeAdapter<T>  extends java.lang.Object {
				public static class: java.lang.Class<com.mapbox.geojson.BaseCoordinatesTypeAdapter<any>>;
				public writePoint(param0: any, param1: any): void;
				public readPointList(param0: any): java.util.List<java.lang.Double>;
				public readPoint(param0: any): any;
				public writePointList(param0: any, param1: java.util.List<java.lang.Double>): void;
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module geojson {
			export abstract class BaseGeometryTypeAdapter<G, T>  extends java.lang.Object {
				public static class: java.lang.Class<com.mapbox.geojson.BaseGeometryTypeAdapter<any,any>>;
				public writeCoordinateContainer(param0: any, param1: com.mapbox.geojson.CoordinateContainer<any>): void;
				public readCoordinateContainer(param0: any): com.mapbox.geojson.CoordinateContainer<any>;
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module geojson {
			export class BoundingBox extends java.lang.Object implements java.io.Serializable {
				public static class: java.lang.Class<com.mapbox.geojson.BoundingBox>;
				public northeast(): any;
				public west(): number;
				/** @deprecated */
				public static fromCoordinates(param0: number, param1: number, param2: number, param3: number, param4: number, param5: number): com.mapbox.geojson.BoundingBox;
				public southwest(): any;
				public toString(): string;
				/** @deprecated */
				public static fromCoordinates(param0: number, param1: number, param2: number, param3: number): com.mapbox.geojson.BoundingBox;
				public toJson(): string;
				public static fromJson(param0: string): com.mapbox.geojson.BoundingBox;
				public north(): number;
				public static fromLngLats(param0: number, param1: number, param2: number, param3: number): com.mapbox.geojson.BoundingBox;
				public south(): number;
				public static fromPoints(param0: any, param1: any): com.mapbox.geojson.BoundingBox;
				public static fromLngLats(param0: number, param1: number, param2: number, param3: number, param4: number, param5: number): com.mapbox.geojson.BoundingBox;
				public east(): number;
				public hashCode(): number;
				public equals(param0: any): boolean;
				public static typeAdapter(param0: any): any;
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module geojson {
			export class CoordinateContainer<T>  extends com.mapbox.geojson.Geometry {
				public static class: java.lang.Class<com.mapbox.geojson.CoordinateContainer<any>>;
				/**
				 * Constructs a new instance of the com.mapbox.geojson.CoordinateContainer<any> interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
				 */
				public constructor(implementation: {
					coordinates(): any;
					type(): string;
					toJson(): string;
					bbox(): com.mapbox.geojson.BoundingBox;
				});
				public constructor();
				public type(): string;
				public coordinates(): any;
				public toJson(): string;
				public bbox(): com.mapbox.geojson.BoundingBox;
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module geojson {
			export class Feature extends java.lang.Object implements com.mapbox.geojson.GeoJson {
				public static class: java.lang.Class<com.mapbox.geojson.Feature>;
				public getNumberProperty(param0: string): java.lang.Number;
				public addNumberProperty(param0: string, param1: java.lang.Number): void;
				public id(): string;
				public removeProperty(param0: string): any;
				public properties(): any;
				public getStringProperty(param0: string): string;
				public hashCode(): number;
				public type(): string;
				public equals(param0: any): boolean;
				public static fromGeometry(param0: com.mapbox.geojson.Geometry, param1: com.mapbox.geojson.BoundingBox): com.mapbox.geojson.Feature;
				public addStringProperty(param0: string, param1: string): void;
				public hasNonNullValueForProperty(param0: string): boolean;
				public geometry(): com.mapbox.geojson.Geometry;
				public addBooleanProperty(param0: string, param1: java.lang.Boolean): void;
				public getCharacterProperty(param0: string): java.lang.Character;
				public static fromJson(param0: string): com.mapbox.geojson.Feature;
				public static fromGeometry(param0: com.mapbox.geojson.Geometry): com.mapbox.geojson.Feature;
				public getBooleanProperty(param0: string): java.lang.Boolean;
				public toString(): string;
				public toJson(): string;
				public static fromGeometry(param0: com.mapbox.geojson.Geometry, param1: any): com.mapbox.geojson.Feature;
				public static fromGeometry(param0: com.mapbox.geojson.Geometry, param1: any, param2: com.mapbox.geojson.BoundingBox): com.mapbox.geojson.Feature;
				public static fromGeometry(param0: com.mapbox.geojson.Geometry, param1: any, param2: string): com.mapbox.geojson.Feature;
				public static typeAdapter(param0: any): any;
				public addProperty(param0: string, param1: any): void;
				public getProperty(param0: string): any;
				public hasProperty(param0: string): boolean;
				public static fromGeometry(param0: com.mapbox.geojson.Geometry, param1: any, param2: string, param3: com.mapbox.geojson.BoundingBox): com.mapbox.geojson.Feature;
				public bbox(): com.mapbox.geojson.BoundingBox;
				public addCharacterProperty(param0: string, param1: java.lang.Character): void;
			}
			export module Feature {
				export class GsonTypeAdapter extends java.lang.Object {
					public static class: java.lang.Class<com.mapbox.geojson.Feature.GsonTypeAdapter>;
					public write(param0: any, param1: com.mapbox.geojson.Feature): void;
					public read(param0: any): com.mapbox.geojson.Feature;
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module geojson {
			export class FeatureCollection extends java.lang.Object implements com.mapbox.geojson.GeoJson {
				public static class: java.lang.Class<com.mapbox.geojson.FeatureCollection>;
				public static fromFeature(param0: com.mapbox.geojson.Feature): com.mapbox.geojson.FeatureCollection;
				public static fromFeatures(param0: java.util.List<com.mapbox.geojson.Feature>): com.mapbox.geojson.FeatureCollection;
				public static typeAdapter(param0: any): any;
				public static fromFeatures(param0: java.util.List<com.mapbox.geojson.Feature>, param1: com.mapbox.geojson.BoundingBox): com.mapbox.geojson.FeatureCollection;
				public toString(): string;
				public toJson(): string;
				public static fromFeatures(param0: native.Array<com.mapbox.geojson.Feature>, param1: com.mapbox.geojson.BoundingBox): com.mapbox.geojson.FeatureCollection;
				public hashCode(): number;
				public static fromJson(param0: string): com.mapbox.geojson.FeatureCollection;
				public type(): string;
				public equals(param0: any): boolean;
				public features(): java.util.List<com.mapbox.geojson.Feature>;
				public static fromFeature(param0: com.mapbox.geojson.Feature, param1: com.mapbox.geojson.BoundingBox): com.mapbox.geojson.FeatureCollection;
				public bbox(): com.mapbox.geojson.BoundingBox;
				public static fromFeatures(param0: native.Array<com.mapbox.geojson.Feature>): com.mapbox.geojson.FeatureCollection;
			}
			export module FeatureCollection {
				export class GsonTypeAdapter extends java.lang.Object {
					public static class: java.lang.Class<com.mapbox.geojson.FeatureCollection.GsonTypeAdapter>;
					public read(param0: any): com.mapbox.geojson.FeatureCollection;
					public write(param0: any, param1: com.mapbox.geojson.FeatureCollection): void;
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module geojson {
			export class GeoJson extends java.lang.Object implements java.io.Serializable {
				public static class: java.lang.Class<com.mapbox.geojson.GeoJson>;
				/**
				 * Constructs a new instance of the com.mapbox.geojson.GeoJson interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
				 */
				public constructor(implementation: {
					type(): string;
					toJson(): string;
					bbox(): com.mapbox.geojson.BoundingBox;
				});
				public constructor();
				public type(): string;
				public toJson(): string;
				public bbox(): com.mapbox.geojson.BoundingBox;
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module geojson {
			export class Geometry extends java.lang.Object implements com.mapbox.geojson.GeoJson {
				public static class: java.lang.Class<com.mapbox.geojson.Geometry>;
				/**
				 * Constructs a new instance of the com.mapbox.geojson.Geometry interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
				 */
				public constructor(implementation: {
					type(): string;
					toJson(): string;
					bbox(): com.mapbox.geojson.BoundingBox;
				});
				public constructor();
				public type(): string;
				public toJson(): string;
				public bbox(): com.mapbox.geojson.BoundingBox;
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module geojson {
			export abstract class GeometryAdapterFactory extends java.lang.Object {
				public static class: java.lang.Class<com.mapbox.geojson.GeometryAdapterFactory>;
				public static create(): any;
				public constructor();
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module geojson {
			export class GeometryCollection extends java.lang.Object implements com.mapbox.geojson.Geometry {
				public static class: java.lang.Class<com.mapbox.geojson.GeometryCollection>;
				public static fromGeometries(param0: java.util.List<com.mapbox.geojson.Geometry>): com.mapbox.geojson.GeometryCollection;
				public geometries(): java.util.List<com.mapbox.geojson.Geometry>;
				public static fromGeometry(param0: com.mapbox.geojson.Geometry): com.mapbox.geojson.GeometryCollection;
				public toString(): string;
				public toJson(): string;
				public static fromJson(param0: string): com.mapbox.geojson.GeometryCollection;
				public static typeAdapter(param0: any): any;
				public hashCode(): number;
				public static fromGeometries(param0: java.util.List<com.mapbox.geojson.Geometry>, param1: com.mapbox.geojson.BoundingBox): com.mapbox.geojson.GeometryCollection;
				public static fromGeometry(param0: com.mapbox.geojson.Geometry, param1: com.mapbox.geojson.BoundingBox): com.mapbox.geojson.GeometryCollection;
				public type(): string;
				public equals(param0: any): boolean;
				public bbox(): com.mapbox.geojson.BoundingBox;
			}
			export module GeometryCollection {
				export class GsonTypeAdapter extends java.lang.Object {
					public static class: java.lang.Class<com.mapbox.geojson.GeometryCollection.GsonTypeAdapter>;
					public write(param0: any, param1: com.mapbox.geojson.GeometryCollection): void;
					public read(param0: any): com.mapbox.geojson.GeometryCollection;
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module geojson {
			export class LineString extends com.mapbox.geojson.CoordinateContainer<java.util.List<any>> {
				public static class: java.lang.Class<com.mapbox.geojson.LineString>;
				public static fromPolyline(param0: string, param1: number): com.mapbox.geojson.LineString;
				public static typeAdapter(param0: any): any;
				public static fromLngLats(param0: com.mapbox.geojson.MultiPoint, param1: com.mapbox.geojson.BoundingBox): com.mapbox.geojson.LineString;
				public toPolyline(param0: number): string;
				public toString(): string;
				public toJson(): string;
				public coordinates(): any;
				public static fromLngLats(param0: java.util.List<any>): com.mapbox.geojson.LineString;
				public static fromLngLats(param0: java.util.List<any>, param1: com.mapbox.geojson.BoundingBox): com.mapbox.geojson.LineString;
				public hashCode(): number;
				public static fromJson(param0: string): com.mapbox.geojson.LineString;
				public type(): string;
				public equals(param0: any): boolean;
				public static fromLngLats(param0: com.mapbox.geojson.MultiPoint): com.mapbox.geojson.LineString;
				public bbox(): com.mapbox.geojson.BoundingBox;
				public coordinates(): java.util.List<any>;
			}
			export module LineString {
				export class GsonTypeAdapter extends com.mapbox.geojson.BaseGeometryTypeAdapter<com.mapbox.geojson.LineString,java.util.List<any>> {
					public static class: java.lang.Class<com.mapbox.geojson.LineString.GsonTypeAdapter>;
					public write(param0: any, param1: com.mapbox.geojson.LineString): void;
					public read(param0: any): com.mapbox.geojson.LineString;
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module geojson {
			export class ListOfDoublesCoordinatesTypeAdapter extends com.mapbox.geojson.BaseCoordinatesTypeAdapter<java.util.List<java.lang.Double>> {
				public static class: java.lang.Class<com.mapbox.geojson.ListOfDoublesCoordinatesTypeAdapter>;
				public write(param0: any, param1: java.util.List<java.lang.Double>): void;
				public read(param0: any): java.util.List<java.lang.Double>;
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module geojson {
			export class ListOfListOfPointCoordinatesTypeAdapter extends com.mapbox.geojson.BaseCoordinatesTypeAdapter<java.util.List<java.util.List<any>>> {
				public static class: java.lang.Class<com.mapbox.geojson.ListOfListOfPointCoordinatesTypeAdapter>;
				public read(param0: any): java.util.List<java.util.List<any>>;
				public write(param0: any, param1: java.util.List<java.util.List<any>>): void;
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module geojson {
			export class ListOfPointCoordinatesTypeAdapter extends com.mapbox.geojson.BaseCoordinatesTypeAdapter<java.util.List<any>> {
				public static class: java.lang.Class<com.mapbox.geojson.ListOfPointCoordinatesTypeAdapter>;
				public read(param0: any): java.util.List<any>;
				public write(param0: any, param1: java.util.List<any>): void;
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module geojson {
			export class ListofListofListOfPointCoordinatesTypeAdapter extends com.mapbox.geojson.BaseCoordinatesTypeAdapter<java.util.List<java.util.List<java.util.List<any>>>> {
				public static class: java.lang.Class<com.mapbox.geojson.ListofListofListOfPointCoordinatesTypeAdapter>;
				public read(param0: any): java.util.List<java.util.List<java.util.List<any>>>;
				public write(param0: any, param1: java.util.List<java.util.List<java.util.List<any>>>): void;
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module geojson {
			export class MultiLineString extends com.mapbox.geojson.CoordinateContainer<java.util.List<java.util.List<any>>> {
				public static class: java.lang.Class<com.mapbox.geojson.MultiLineString>;
				public lineStrings(): java.util.List<com.mapbox.geojson.LineString>;
				public static fromLineString(param0: com.mapbox.geojson.LineString): com.mapbox.geojson.MultiLineString;
				public static fromLngLats(param0: java.util.List<java.util.List<any>>): com.mapbox.geojson.MultiLineString;
				public toString(): string;
				public toJson(): string;
				public coordinates(): any;
				public static fromLineStrings(param0: java.util.List<com.mapbox.geojson.LineString>, param1: com.mapbox.geojson.BoundingBox): com.mapbox.geojson.MultiLineString;
				public static typeAdapter(param0: any): any;
				public static fromLineString(param0: com.mapbox.geojson.LineString, param1: com.mapbox.geojson.BoundingBox): com.mapbox.geojson.MultiLineString;
				public hashCode(): number;
				public static fromLineStrings(param0: java.util.List<com.mapbox.geojson.LineString>): com.mapbox.geojson.MultiLineString;
				public static fromLngLats(param0: java.util.List<java.util.List<any>>, param1: com.mapbox.geojson.BoundingBox): com.mapbox.geojson.MultiLineString;
				public static fromJson(param0: string): com.mapbox.geojson.MultiLineString;
				public type(): string;
				public equals(param0: any): boolean;
				public coordinates(): java.util.List<java.util.List<any>>;
				public bbox(): com.mapbox.geojson.BoundingBox;
			}
			export module MultiLineString {
				export class GsonTypeAdapter extends com.mapbox.geojson.BaseGeometryTypeAdapter<com.mapbox.geojson.MultiLineString,java.util.List<java.util.List<any>>> {
					public static class: java.lang.Class<com.mapbox.geojson.MultiLineString.GsonTypeAdapter>;
					public read(param0: any): com.mapbox.geojson.MultiLineString;
					public write(param0: any, param1: com.mapbox.geojson.MultiLineString): void;
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module geojson {
			export class MultiPoint extends com.mapbox.geojson.CoordinateContainer<java.util.List<any>> {
				public static class: java.lang.Class<com.mapbox.geojson.MultiPoint>;
				public static typeAdapter(param0: any): any;
				public hashCode(): number;
				public type(): string;
				public equals(param0: any): boolean;
				public static fromJson(param0: string): com.mapbox.geojson.MultiPoint;
				public toString(): string;
				public static fromLngLats(param0: java.util.List<any>, param1: com.mapbox.geojson.BoundingBox): com.mapbox.geojson.MultiPoint;
				public toJson(): string;
				public coordinates(): any;
				public bbox(): com.mapbox.geojson.BoundingBox;
				public static fromLngLats(param0: java.util.List<any>): com.mapbox.geojson.MultiPoint;
				public coordinates(): java.util.List<any>;
			}
			export module MultiPoint {
				export class GsonTypeAdapter extends com.mapbox.geojson.BaseGeometryTypeAdapter<com.mapbox.geojson.MultiPoint,java.util.List<any>> {
					public static class: java.lang.Class<com.mapbox.geojson.MultiPoint.GsonTypeAdapter>;
					public write(param0: any, param1: com.mapbox.geojson.MultiPoint): void;
					public read(param0: any): com.mapbox.geojson.MultiPoint;
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module geojson {
			export class MultiPolygon extends com.mapbox.geojson.CoordinateContainer<java.util.List<java.util.List<java.util.List<any>>>> {
				public static class: java.lang.Class<com.mapbox.geojson.MultiPolygon>;
				public static fromPolygons(param0: java.util.List<com.mapbox.geojson.Polygon>): com.mapbox.geojson.MultiPolygon;
				public static typeAdapter(param0: any): any;
				public static fromLngLats(param0: java.util.List<java.util.List<java.util.List<any>>>): com.mapbox.geojson.MultiPolygon;
				public coordinates(): java.util.List<java.util.List<java.util.List<any>>>;
				public static fromPolygon(param0: com.mapbox.geojson.Polygon, param1: com.mapbox.geojson.BoundingBox): com.mapbox.geojson.MultiPolygon;
				public toString(): string;
				public static fromJson(param0: string): com.mapbox.geojson.MultiPolygon;
				public toJson(): string;
				public coordinates(): any;
				public static fromPolygons(param0: java.util.List<com.mapbox.geojson.Polygon>, param1: com.mapbox.geojson.BoundingBox): com.mapbox.geojson.MultiPolygon;
				public static fromPolygon(param0: com.mapbox.geojson.Polygon): com.mapbox.geojson.MultiPolygon;
				public hashCode(): number;
				public polygons(): java.util.List<com.mapbox.geojson.Polygon>;
				public type(): string;
				public equals(param0: any): boolean;
				public static fromLngLats(param0: java.util.List<java.util.List<java.util.List<any>>>, param1: com.mapbox.geojson.BoundingBox): com.mapbox.geojson.MultiPolygon;
				public bbox(): com.mapbox.geojson.BoundingBox;
			}
			export module MultiPolygon {
				export class GsonTypeAdapter extends com.mapbox.geojson.BaseGeometryTypeAdapter<com.mapbox.geojson.MultiPolygon,java.util.List<java.util.List<java.util.List<any>>>> {
					public static class: java.lang.Class<com.mapbox.geojson.MultiPolygon.GsonTypeAdapter>;
					public write(param0: any, param1: com.mapbox.geojson.MultiPolygon): void;
					public read(param0: any): com.mapbox.geojson.MultiPolygon;
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module geojson {
			export class Point extends com.mapbox.geojson.CoordinateContainer<java.util.List<java.lang.Double>> {
				public static class: java.lang.Class<any>;
				public hasAltitude(): boolean;
				public altitude(): number;
				public coordinates(): java.util.List<java.lang.Double>;
				public static fromLngLat(param0: number, param1: number, param2: number, param3: com.mapbox.geojson.BoundingBox): any;
				public longitude(): number;
				public toString(): string;
				public toJson(): string;
				public coordinates(): any;
				public latitude(): number;
				public static typeAdapter(param0: any): any;
				public static fromLngLat(param0: number, param1: number, param2: com.mapbox.geojson.BoundingBox): any;
				public hashCode(): number;
				public type(): string;
				public equals(param0: any): boolean;
				public static fromLngLat(param0: number, param1: number, param2: number): any;
				public static fromLngLat(param0: number, param1: number): any;
				public static fromJson(param0: string): any;
				public bbox(): com.mapbox.geojson.BoundingBox;
			}
			export module Point {
				export class GsonTypeAdapter extends com.mapbox.geojson.BaseGeometryTypeAdapter<any,java.util.List<java.lang.Double>> {
					public static class: java.lang.Class<any>;
					public write(param0: any, param1: any): void;
					public read(param0: any): any;
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module geojson {
			export class PointAsCoordinatesTypeAdapter extends com.mapbox.geojson.BaseCoordinatesTypeAdapter<any> {
				public static class: java.lang.Class<any>;
				public write(param0: any, param1: any): void;
				public read(param0: any): any;
				public constructor();
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module geojson {
			export class Polygon extends com.mapbox.geojson.CoordinateContainer<java.util.List<java.util.List<any>>> {
				public static class: java.lang.Class<com.mapbox.geojson.Polygon>;
				public static fromOuterInner(param0: com.mapbox.geojson.LineString, param1: com.mapbox.geojson.BoundingBox, param2: native.Array<com.mapbox.geojson.LineString>): com.mapbox.geojson.Polygon;
				public static fromJson(param0: string): com.mapbox.geojson.Polygon;
				public static fromOuterInner(param0: com.mapbox.geojson.LineString, param1: com.mapbox.geojson.BoundingBox, param2: java.util.List<com.mapbox.geojson.LineString>): com.mapbox.geojson.Polygon;
				public toString(): string;
				public static fromLngLats(param0: java.util.List<java.util.List<any>>, param1: com.mapbox.geojson.BoundingBox): com.mapbox.geojson.Polygon;
				public toJson(): string;
				public coordinates(): any;
				public outer(): com.mapbox.geojson.LineString;
				public static typeAdapter(param0: any): any;
				public inner(): java.util.List<com.mapbox.geojson.LineString>;
				public static fromLngLats(param0: java.util.List<java.util.List<any>>): com.mapbox.geojson.Polygon;
				public static fromOuterInner(param0: com.mapbox.geojson.LineString, param1: native.Array<com.mapbox.geojson.LineString>): com.mapbox.geojson.Polygon;
				public hashCode(): number;
				public type(): string;
				public equals(param0: any): boolean;
				public coordinates(): java.util.List<java.util.List<any>>;
				public static fromOuterInner(param0: com.mapbox.geojson.LineString, param1: java.util.List<com.mapbox.geojson.LineString>): com.mapbox.geojson.Polygon;
				public bbox(): com.mapbox.geojson.BoundingBox;
			}
			export module Polygon {
				export class GsonTypeAdapter extends com.mapbox.geojson.BaseGeometryTypeAdapter<com.mapbox.geojson.Polygon,java.util.List<java.util.List<any>>> {
					public static class: java.lang.Class<com.mapbox.geojson.Polygon.GsonTypeAdapter>;
					public read(param0: any): com.mapbox.geojson.Polygon;
					public write(param0: any, param1: com.mapbox.geojson.Polygon): void;
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module geojson {
			export module constants {
				export class GeoJsonConstants extends java.lang.Object {
					public static class: java.lang.Class<com.mapbox.geojson.constants.GeoJsonConstants>;
					public static MIN_LONGITUDE: number;
					public static MAX_LONGITUDE: number;
					public static MIN_LATITUDE: number;
					public static MAX_LATITUDE: number;
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module geojson {
			export module exception {
				export class GeoJsonException extends java.lang.RuntimeException {
					public static class: java.lang.Class<com.mapbox.geojson.exception.GeoJsonException>;
					public constructor(param0: string, param1: java.lang.Throwable, param2: boolean, param3: boolean);
					public constructor(param0: string, param1: java.lang.Throwable);
					public constructor(param0: string);
					public constructor(param0: java.lang.Throwable);
					public constructor();
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module geojson {
			export module gson {
				export class BoundingBoxTypeAdapter extends java.lang.Object {
					public static class: java.lang.Class<com.mapbox.geojson.gson.BoundingBoxTypeAdapter>;
					public constructor();
					public read(param0: any): com.mapbox.geojson.BoundingBox;
					public write(param0: any, param1: com.mapbox.geojson.BoundingBox): void;
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module geojson {
			export module gson {
				export abstract class GeoJsonAdapterFactory extends java.lang.Object {
					public static class: java.lang.Class<com.mapbox.geojson.gson.GeoJsonAdapterFactory>;
					public static create(): any;
					public constructor();
				}
				export module GeoJsonAdapterFactory {
					export class GeoJsonAdapterFactoryIml extends com.mapbox.geojson.gson.GeoJsonAdapterFactory {
						public static class: java.lang.Class<com.mapbox.geojson.gson.GeoJsonAdapterFactory.GeoJsonAdapterFactoryIml>;
						public constructor();
						public create(param0: any, param1: any): any;
						public static create(): any;
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module geojson {
			export module gson {
				export class GeometryGeoJson extends java.lang.Object {
					public static class: java.lang.Class<com.mapbox.geojson.gson.GeometryGeoJson>;
					public static fromJson(param0: string): com.mapbox.geojson.Geometry;
					public constructor();
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module geojson {
			export module internal {
				export module typeadapters {
					export class RuntimeTypeAdapterFactory<T>  extends java.lang.Object {
						public static class: java.lang.Class<com.mapbox.geojson.internal.typeadapters.RuntimeTypeAdapterFactory<any>>;
						public registerSubtype(param0: java.lang.Class<any>): com.mapbox.geojson.internal.typeadapters.RuntimeTypeAdapterFactory<any>;
						public static of(param0: java.lang.Class<any>): com.mapbox.geojson.internal.typeadapters.RuntimeTypeAdapterFactory<any>;
						public create(param0: any, param1: any): any;
						public registerSubtype(param0: java.lang.Class<any>, param1: string): com.mapbox.geojson.internal.typeadapters.RuntimeTypeAdapterFactory<any>;
						public static of(param0: java.lang.Class<any>, param1: string, param2: boolean): com.mapbox.geojson.internal.typeadapters.RuntimeTypeAdapterFactory<any>;
						public static of(param0: java.lang.Class<any>, param1: string): com.mapbox.geojson.internal.typeadapters.RuntimeTypeAdapterFactory<any>;
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module geojson {
			export module shifter {
				export class CoordinateShifter extends java.lang.Object {
					public static class: java.lang.Class<com.mapbox.geojson.shifter.CoordinateShifter>;
					/**
					 * Constructs a new instance of the com.mapbox.geojson.shifter.CoordinateShifter interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
					 */
					public constructor(implementation: {
						shiftLonLat(param0: number, param1: number): java.util.List<java.lang.Double>;
						shiftLonLatAlt(param0: number, param1: number, param2: number): java.util.List<java.lang.Double>;
						unshiftPoint(param0: any): java.util.List<java.lang.Double>;
						unshiftPoint(param0: java.util.List<java.lang.Double>): java.util.List<java.lang.Double>;
					});
					public constructor();
					public shiftLonLatAlt(param0: number, param1: number, param2: number): java.util.List<java.lang.Double>;
					public unshiftPoint(param0: any): java.util.List<java.lang.Double>;
					public shiftLonLat(param0: number, param1: number): java.util.List<java.lang.Double>;
					public unshiftPoint(param0: java.util.List<java.lang.Double>): java.util.List<java.lang.Double>;
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module geojson {
			export module shifter {
				export class CoordinateShifterManager extends java.lang.Object {
					public static class: java.lang.Class<com.mapbox.geojson.shifter.CoordinateShifterManager>;
					public static setCoordinateShifter(param0: com.mapbox.geojson.shifter.CoordinateShifter): void;
					public constructor();
					public static isUsingDefaultShifter(): boolean;
					public static getCoordinateShifter(): com.mapbox.geojson.shifter.CoordinateShifter;
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module geojson {
			export module utils {
				export class GeoJsonUtils extends java.lang.Object {
					public static class: java.lang.Class<com.mapbox.geojson.utils.GeoJsonUtils>;
					public constructor();
					public static trim(param0: number): number;
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module geojson {
			export module utils {
				export class PolylineUtils extends java.lang.Object {
					public static class: java.lang.Class<com.mapbox.geojson.utils.PolylineUtils>;
					public static simplify(param0: java.util.List<any>, param1: number, param2: boolean): java.util.List<any>;
					public static encode(param0: java.util.List<any>, param1: number): string;
					public static simplify(param0: java.util.List<any>, param1: number): java.util.List<any>;
					public static decode(param0: string, param1: number): java.util.List<any>;
					public static simplify(param0: java.util.List<any>, param1: boolean): java.util.List<any>;
					public static simplify(param0: java.util.List<any>): java.util.List<any>;
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export class AccountsManager extends java.lang.Object {
				public static class: java.lang.Class<com.mapbox.mapboxsdk.AccountsManager>;
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export class BuildConfig extends java.lang.Object {
				public static class: java.lang.Class<com.mapbox.mapboxsdk.BuildConfig>;
				public static DEBUG: boolean;
				public static LIBRARY_PACKAGE_NAME: string;
				public static APPLICATION_ID: string;
				public static BUILD_TYPE: string;
				public static FLAVOR: string;
				public static VERSION_CODE: number;
				public static VERSION_NAME: string;
				public static GIT_REVISION_SHORT: string;
				public static MAPBOX_EVENTS_USER_AGENT: string;
				public static MAPBOX_SDK_IDENTIFIER: string;
				public static MAPBOX_SDK_VERSION: string;
				public static MAPBOX_VERSION_STRING: string;
				public constructor();
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export abstract class LibraryLoader extends java.lang.Object {
				public static class: java.lang.Class<com.mapbox.mapboxsdk.LibraryLoader>;
				public static setLibraryLoader(param0: com.mapbox.mapboxsdk.LibraryLoader): void;
				public static load(): void;
				public load(param0: string): void;
				public constructor();
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export class LibraryLoaderProvider extends java.lang.Object {
				public static class: java.lang.Class<com.mapbox.mapboxsdk.LibraryLoaderProvider>;
				/**
				 * Constructs a new instance of the com.mapbox.mapboxsdk.LibraryLoaderProvider interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
				 */
				public constructor(implementation: {
					getDefaultLibraryLoader(): com.mapbox.mapboxsdk.LibraryLoader;
				});
				public constructor();
				public getDefaultLibraryLoader(): com.mapbox.mapboxsdk.LibraryLoader;
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export class MapStrictMode extends java.lang.Object {
				public static class: java.lang.Class<com.mapbox.mapboxsdk.MapStrictMode>;
				public static strictModeViolation(param0: string): void;
				public static setStrictModeEnabled(param0: boolean): void;
				public static strictModeViolation(param0: java.lang.Throwable): void;
				public static strictModeViolation(param0: string, param1: java.lang.Throwable): void;
				public constructor();
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export class MapStrictModeException extends java.lang.RuntimeException {
				public static class: java.lang.Class<com.mapbox.mapboxsdk.MapStrictModeException>;
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export class Mapbox extends java.lang.Object {
				public static class: java.lang.Class<com.mapbox.mapboxsdk.Mapbox>;
				public static setConnected(param0: java.lang.Boolean): void;
				public static getApplicationContext(): globalAndroid.content.Context;
				public static getInstance(param0: globalAndroid.content.Context, param1: string): com.mapbox.mapboxsdk.Mapbox;
				public static getAccessToken(): string;
				public static isConnected(): java.lang.Boolean;
				public static setAccessToken(param0: string): void;
				public static getTelemetry(): com.mapbox.mapboxsdk.maps.TelemetryDefinition;
				public static hasInstance(): boolean;
				public static getModuleProvider(): com.mapbox.mapboxsdk.ModuleProvider;
				public static getSkuToken(): string;
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export class ModuleProvider extends java.lang.Object {
				public static class: java.lang.Class<com.mapbox.mapboxsdk.ModuleProvider>;
				/**
				 * Constructs a new instance of the com.mapbox.mapboxsdk.ModuleProvider interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
				 */
				public constructor(implementation: {
					createHttpRequest(): com.mapbox.mapboxsdk.http.HttpRequest;
					obtainTelemetry(): com.mapbox.mapboxsdk.maps.TelemetryDefinition;
					createLibraryLoaderProvider(): com.mapbox.mapboxsdk.LibraryLoaderProvider;
				});
				public constructor();
				public createLibraryLoaderProvider(): com.mapbox.mapboxsdk.LibraryLoaderProvider;
				public createHttpRequest(): com.mapbox.mapboxsdk.http.HttpRequest;
				public obtainTelemetry(): com.mapbox.mapboxsdk.maps.TelemetryDefinition;
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export class ModuleProviderImpl extends java.lang.Object implements com.mapbox.mapboxsdk.ModuleProvider {
				public static class: java.lang.Class<com.mapbox.mapboxsdk.ModuleProviderImpl>;
				public createLibraryLoaderProvider(): com.mapbox.mapboxsdk.LibraryLoaderProvider;
				public createHttpRequest(): com.mapbox.mapboxsdk.http.HttpRequest;
				public obtainTelemetry(): com.mapbox.mapboxsdk.maps.TelemetryDefinition;
				public constructor();
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export module annotations {
				export abstract class Annotation extends java.lang.Comparable<com.mapbox.mapboxsdk.annotations.Annotation> {
					public static class: java.lang.Class<com.mapbox.mapboxsdk.annotations.Annotation>;
					public mapboxMap: com.mapbox.mapboxsdk.maps.MapboxMap;
					public mapView: com.mapbox.mapboxsdk.maps.MapView;
					public setMapView(param0: com.mapbox.mapboxsdk.maps.MapView): void;
					public equals(param0: any): boolean;
					public setId(param0: number): void;
					public constructor();
					public getMapView(): com.mapbox.mapboxsdk.maps.MapView;
					public getId(): number;
					public compareTo(param0: com.mapbox.mapboxsdk.annotations.Annotation): number;
					public setMapboxMap(param0: com.mapbox.mapboxsdk.maps.MapboxMap): void;
					public getMapboxMap(): com.mapbox.mapboxsdk.maps.MapboxMap;
					public hashCode(): number;
					public remove(): void;
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export module annotations {
				export class ArrowDirection extends java.lang.Object {
					public static class: java.lang.Class<com.mapbox.mapboxsdk.annotations.ArrowDirection>;
					public getValue(): number;
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export module annotations {
				export abstract class BaseMarkerOptions<U, T>  extends globalAndroid.os.Parcelable {
					public static class: java.lang.Class<com.mapbox.mapboxsdk.annotations.BaseMarkerOptions<any,any>>;
					public setSnippet(param0: string): any;
					public setTitle(param0: string): any;
					public describeContents(): number;
					public setPosition(param0: com.mapbox.mapboxsdk.geometry.LatLng): any;
					public title(param0: string): any;
					public position(param0: com.mapbox.mapboxsdk.geometry.LatLng): any;
					public getMarker(): any;
					public getThis(): any;
					public setIcon(param0: com.mapbox.mapboxsdk.annotations.Icon): any;
					public constructor();
					public icon(param0: com.mapbox.mapboxsdk.annotations.Icon): any;
					public snippet(param0: string): any;
					public writeToParcel(param0: globalAndroid.os.Parcel, param1: number): void;
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export module annotations {
				export abstract class BasePointCollection extends com.mapbox.mapboxsdk.annotations.Annotation {
					public static class: java.lang.Class<com.mapbox.mapboxsdk.annotations.BasePointCollection>;
					public getAlpha(): number;
					public constructor();
					public addPoint(param0: com.mapbox.mapboxsdk.geometry.LatLng): void;
					public setAlpha(param0: number): void;
					public getPoints(): java.util.List<com.mapbox.mapboxsdk.geometry.LatLng>;
					public setPoints(param0: java.util.List<com.mapbox.mapboxsdk.geometry.LatLng>): void;
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export module annotations {
				export class Bubble extends globalAndroid.graphics.drawable.Drawable {
					public static class: java.lang.Class<com.mapbox.mapboxsdk.annotations.Bubble>;
					public onBoundsChange(param0: globalAndroid.graphics.Rect): void;
					public draw(param0: globalAndroid.graphics.Canvas): void;
					public setColorFilter(param0: number, param1: globalAndroid.graphics.PorterDuff.Mode): void;
					public setColorFilter(param0: globalAndroid.graphics.ColorFilter): void;
					public getIntrinsicHeight(): number;
					public getIntrinsicWidth(): number;
					public setAlpha(param0: number): void;
					public getOpacity(): number;
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export module annotations {
				export class BubbleLayout extends globalAndroid.widget.LinearLayout {
					public static class: java.lang.Class<com.mapbox.mapboxsdk.annotations.BubbleLayout>;
					public static DEFAULT_STROKE_WIDTH: number;
					public focusSearch(param0: number): globalAndroid.view.View;
					public focusableViewAvailable(param0: globalAndroid.view.View): void;
					public createContextMenu(param0: globalAndroid.view.ContextMenu): void;
					public isLayoutRequested(): boolean;
					public getArrowHeight(): number;
					public dispatchDraw(param0: globalAndroid.graphics.Canvas): void;
					public isTextDirectionResolved(): boolean;
					public constructor(param0: globalAndroid.content.Context, param1: globalAndroid.util.AttributeSet);
					public setArrowHeight(param0: number): com.mapbox.mapboxsdk.annotations.BubbleLayout;
					public isLayoutDirectionResolved(): boolean;
					public addView(param0: globalAndroid.view.View, param1: number, param2: number): void;
					public onKeyUp(param0: number, param1: globalAndroid.view.KeyEvent): boolean;
					public setArrowPosition(param0: number): com.mapbox.mapboxsdk.annotations.BubbleLayout;
					public addView(param0: globalAndroid.view.View): void;
					public setCornersRadius(param0: number): com.mapbox.mapboxsdk.annotations.BubbleLayout;
					public addView(param0: globalAndroid.view.View, param1: number, param2: globalAndroid.view.ViewGroup.LayoutParams): void;
					public getArrowPosition(): number;
					public focusSearch(param0: globalAndroid.view.View, param1: number): globalAndroid.view.View;
					public keyboardNavigationClusterSearch(param0: globalAndroid.view.View, param1: number): globalAndroid.view.View;
					public recomputeViewAttributes(param0: globalAndroid.view.View): void;
					public onNestedPreFling(param0: globalAndroid.view.View, param1: number, param2: number): boolean;
					public clearChildFocus(param0: globalAndroid.view.View): void;
					public getStrokeWidth(): number;
					public setBubbleColor(param0: number): com.mapbox.mapboxsdk.annotations.BubbleLayout;
					public getBubbleColor(): number;
					public onNestedScroll(param0: globalAndroid.view.View, param1: number, param2: number, param3: number, param4: number): void;
					public getLayoutDirection(): number;
					/** @deprecated */
					public invalidateChild(param0: globalAndroid.view.View, param1: globalAndroid.graphics.Rect): void;
					public getChildVisibleRect(param0: globalAndroid.view.View, param1: globalAndroid.graphics.Rect, param2: globalAndroid.graphics.Point): boolean;
					public getArrowWidth(): number;
					public startActionModeForChild(param0: globalAndroid.view.View, param1: globalAndroid.view.ActionMode.Callback, param2: number): globalAndroid.view.ActionMode;
					public bringChildToFront(param0: globalAndroid.view.View): void;
					public showContextMenuForChild(param0: globalAndroid.view.View, param1: number, param2: number): boolean;
					public unscheduleDrawable(param0: globalAndroid.graphics.drawable.Drawable, param1: java.lang.Runnable): void;
					public requestTransparentRegion(param0: globalAndroid.view.View): void;
					/** @deprecated */
					public invalidateChildInParent(param0: native.Array<number>, param1: globalAndroid.graphics.Rect): globalAndroid.view.ViewParent;
					public onKeyLongPress(param0: number, param1: globalAndroid.view.KeyEvent): boolean;
					public constructor(param0: globalAndroid.content.Context, param1: globalAndroid.util.AttributeSet, param2: number, param3: number);
					public childDrawableStateChanged(param0: globalAndroid.view.View): void;
					public setStrokeWidth(param0: number): com.mapbox.mapboxsdk.annotations.BubbleLayout;
					public getTextDirection(): number;
					public scheduleDrawable(param0: globalAndroid.graphics.drawable.Drawable, param1: java.lang.Runnable, param2: number): void;
					public requestFitSystemWindows(): void;
					public notifySubtreeAccessibilityStateChanged(param0: globalAndroid.view.View, param1: globalAndroid.view.View, param2: number): void;
					public getParent(): globalAndroid.view.ViewParent;
					public isTextAlignmentResolved(): boolean;
					public startActionModeForChild(param0: globalAndroid.view.View, param1: globalAndroid.view.ActionMode.Callback): globalAndroid.view.ActionMode;
					public setArrowDirection(param0: com.mapbox.mapboxsdk.annotations.ArrowDirection): com.mapbox.mapboxsdk.annotations.BubbleLayout;
					public canResolveTextAlignment(): boolean;
					public childHasTransientStateChanged(param0: globalAndroid.view.View, param1: boolean): void;
					/** @deprecated */
					public requestFitSystemWindows(): void;
					public setStrokeColor(param0: number): com.mapbox.mapboxsdk.annotations.BubbleLayout;
					public onDescendantInvalidated(param0: globalAndroid.view.View, param1: globalAndroid.view.View): void;
					public canResolveTextDirection(): boolean;
					public updateViewLayout(param0: globalAndroid.view.View, param1: globalAndroid.view.ViewGroup.LayoutParams): void;
					public requestChildFocus(param0: globalAndroid.view.View, param1: globalAndroid.view.View): void;
					public onStartNestedScroll(param0: globalAndroid.view.View, param1: globalAndroid.view.View, param2: number): boolean;
					public requestDisallowInterceptTouchEvent(param0: boolean): void;
					public onNestedFling(param0: globalAndroid.view.View, param1: number, param2: number, param3: boolean): boolean;
					public addView(param0: globalAndroid.view.View, param1: number): void;
					public unscheduleDrawable(param0: globalAndroid.graphics.drawable.Drawable): void;
					public addView(param0: globalAndroid.view.View, param1: globalAndroid.view.ViewGroup.LayoutParams): void;
					public onNestedPreScroll(param0: globalAndroid.view.View, param1: number, param2: number, param3: native.Array<number>): void;
					public sendAccessibilityEvent(param0: number): void;
					public requestLayout(): void;
					public requestSendAccessibilityEvent(param0: globalAndroid.view.View, param1: globalAndroid.view.accessibility.AccessibilityEvent): boolean;
					public getParentForAccessibility(): globalAndroid.view.ViewParent;
					public onKeyDown(param0: number, param1: globalAndroid.view.KeyEvent): boolean;
					public canResolveLayoutDirection(): boolean;
					public getTextAlignment(): number;
					public onNestedScrollAccepted(param0: globalAndroid.view.View, param1: globalAndroid.view.View, param2: number): void;
					public constructor(param0: globalAndroid.content.Context, param1: globalAndroid.util.AttributeSet, param2: number);
					public showContextMenuForChild(param0: globalAndroid.view.View): boolean;
					public sendAccessibilityEventUnchecked(param0: globalAndroid.view.accessibility.AccessibilityEvent): void;
					public onKeyMultiple(param0: number, param1: number, param2: globalAndroid.view.KeyEvent): boolean;
					public removeView(param0: globalAndroid.view.View): void;
					public constructor(param0: globalAndroid.content.Context);
					public onStopNestedScroll(param0: globalAndroid.view.View): void;
					public onNestedPrePerformAccessibilityAction(param0: globalAndroid.view.View, param1: number, param2: globalAndroid.os.Bundle): boolean;
					public getArrowDirection(): com.mapbox.mapboxsdk.annotations.ArrowDirection;
					public getCornersRadius(): number;
					public onLayout(param0: boolean, param1: number, param2: number, param3: number, param4: number): void;
					public invalidateDrawable(param0: globalAndroid.graphics.drawable.Drawable): void;
					public setArrowWidth(param0: number): com.mapbox.mapboxsdk.annotations.BubbleLayout;
					public getStrokeColor(): number;
					public requestChildRectangleOnScreen(param0: globalAndroid.view.View, param1: globalAndroid.graphics.Rect, param2: boolean): boolean;
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export module annotations {
				export class BubblePopupHelper extends java.lang.Object {
					public static class: java.lang.Class<com.mapbox.mapboxsdk.annotations.BubblePopupHelper>;
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export module annotations {
				export class Icon extends java.lang.Object {
					public static class: java.lang.Class<com.mapbox.mapboxsdk.annotations.Icon>;
					public equals(param0: any): boolean;
					public getId(): string;
					public getScale(): number;
					public getBitmap(): globalAndroid.graphics.Bitmap;
					public hashCode(): number;
					public toBytes(): native.Array<number>;
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export module annotations {
				export class IconFactory extends java.lang.Object {
					public static class: java.lang.Class<com.mapbox.mapboxsdk.annotations.IconFactory>;
					public fromResource(param0: number): com.mapbox.mapboxsdk.annotations.Icon;
					public fromFile(param0: string): com.mapbox.mapboxsdk.annotations.Icon;
					public fromAsset(param0: string): com.mapbox.mapboxsdk.annotations.Icon;
					public fromBitmap(param0: globalAndroid.graphics.Bitmap): com.mapbox.mapboxsdk.annotations.Icon;
					public static getInstance(param0: globalAndroid.content.Context): com.mapbox.mapboxsdk.annotations.IconFactory;
					public fromPath(param0: string): com.mapbox.mapboxsdk.annotations.Icon;
					public defaultMarker(): com.mapbox.mapboxsdk.annotations.Icon;
					public static recreate(param0: string, param1: globalAndroid.graphics.Bitmap): com.mapbox.mapboxsdk.annotations.Icon;
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export module annotations {
				export class InfoWindow extends java.lang.Object {
					public static class: java.lang.Class<com.mapbox.mapboxsdk.annotations.InfoWindow>;
					public view: java.lang.ref.WeakReference<globalAndroid.view.View>;
					public getView(): globalAndroid.view.View;
					public update(): void;
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export module annotations {
				export class Marker extends com.mapbox.mapboxsdk.annotations.Annotation {
					public static class: java.lang.Class<com.mapbox.mapboxsdk.annotations.Marker>;
					public getTitle(): string;
					public setTitle(param0: string): void;
					public showInfoWindow(param0: com.mapbox.mapboxsdk.maps.MapboxMap, param1: com.mapbox.mapboxsdk.maps.MapView): com.mapbox.mapboxsdk.annotations.InfoWindow;
					public setPosition(param0: com.mapbox.mapboxsdk.geometry.LatLng): void;
					public setIcon(param0: com.mapbox.mapboxsdk.annotations.Icon): void;
					public isInfoWindowShown(): boolean;
					public constructor(param0: com.mapbox.mapboxsdk.annotations.BaseMarkerOptions<any,any>);
					public setSnippet(param0: string): void;
					public setTopOffsetPixels(param0: number): void;
					public getPosition(): com.mapbox.mapboxsdk.geometry.LatLng;
					public getIcon(): com.mapbox.mapboxsdk.annotations.Icon;
					public toString(): string;
					public getSnippet(): string;
					public constructor();
					public setRightOffsetPixels(param0: number): void;
					public hideInfoWindow(): void;
					public getInfoWindow(): com.mapbox.mapboxsdk.annotations.InfoWindow;
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export module annotations {
				export class MarkerOptions extends com.mapbox.mapboxsdk.annotations.BaseMarkerOptions<com.mapbox.mapboxsdk.annotations.Marker,com.mapbox.mapboxsdk.annotations.MarkerOptions> implements globalAndroid.os.Parcelable  {
					public static class: java.lang.Class<com.mapbox.mapboxsdk.annotations.MarkerOptions>;
					public static CREATOR: globalAndroid.os.Parcelable.Creator<com.mapbox.mapboxsdk.annotations.MarkerOptions>;
					public getTitle(): string;
					public getThis(): com.mapbox.mapboxsdk.annotations.MarkerOptions;
					public describeContents(): number;
					public getMarker(): any;
					public getPosition(): com.mapbox.mapboxsdk.geometry.LatLng;
					public getIcon(): com.mapbox.mapboxsdk.annotations.Icon;
					public equals(param0: any): boolean;
					public constructor(param0: globalAndroid.os.Parcel);
					public getThis(): any;
					public getSnippet(): string;
					public constructor();
					public writeToParcel(param0: globalAndroid.os.Parcel, param1: number): void;
					public getMarker(): com.mapbox.mapboxsdk.annotations.Marker;
					public hashCode(): number;
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export module annotations {
				export class Polygon extends com.mapbox.mapboxsdk.annotations.BasePointCollection {
					public static class: java.lang.Class<com.mapbox.mapboxsdk.annotations.Polygon>;
					public getHoles(): java.util.List<java.util.List<com.mapbox.mapboxsdk.geometry.LatLng>>;
					public setHoles(param0: java.util.List<any>): void;
					public setStrokeColor(param0: number): void;
					public getFillColor(): number;
					public getStrokeColor(): number;
					public setFillColor(param0: number): void;
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export module annotations {
				export class PolygonOptions extends java.lang.Object implements globalAndroid.os.Parcelable {
					public static class: java.lang.Class<com.mapbox.mapboxsdk.annotations.PolygonOptions>;
					public static CREATOR: globalAndroid.os.Parcelable.Creator<com.mapbox.mapboxsdk.annotations.PolygonOptions>;
					public add(param0: com.mapbox.mapboxsdk.geometry.LatLng): com.mapbox.mapboxsdk.annotations.PolygonOptions;
					public getPolygon(): com.mapbox.mapboxsdk.annotations.Polygon;
					public getAlpha(): number;
					public addHole(param0: native.Array<java.util.List<com.mapbox.mapboxsdk.geometry.LatLng>>): com.mapbox.mapboxsdk.annotations.PolygonOptions;
					public addAll(param0: java.lang.Iterable<com.mapbox.mapboxsdk.geometry.LatLng>): com.mapbox.mapboxsdk.annotations.PolygonOptions;
					public describeContents(): number;
					public getHoles(): java.util.List<java.util.List<com.mapbox.mapboxsdk.geometry.LatLng>>;
					public strokeColor(param0: number): com.mapbox.mapboxsdk.annotations.PolygonOptions;
					public add(param0: native.Array<com.mapbox.mapboxsdk.geometry.LatLng>): com.mapbox.mapboxsdk.annotations.PolygonOptions;
					public fillColor(param0: number): com.mapbox.mapboxsdk.annotations.PolygonOptions;
					public equals(param0: any): boolean;
					public constructor();
					public addAllHoles(param0: java.lang.Iterable<java.util.List<com.mapbox.mapboxsdk.geometry.LatLng>>): com.mapbox.mapboxsdk.annotations.PolygonOptions;
					public addHole(param0: java.util.List<com.mapbox.mapboxsdk.geometry.LatLng>): com.mapbox.mapboxsdk.annotations.PolygonOptions;
					public alpha(param0: number): com.mapbox.mapboxsdk.annotations.PolygonOptions;
					public writeToParcel(param0: globalAndroid.os.Parcel, param1: number): void;
					public getFillColor(): number;
					public getStrokeColor(): number;
					public getPoints(): java.util.List<com.mapbox.mapboxsdk.geometry.LatLng>;
					public hashCode(): number;
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export module annotations {
				export class Polyline extends com.mapbox.mapboxsdk.annotations.BasePointCollection {
					public static class: java.lang.Class<com.mapbox.mapboxsdk.annotations.Polyline>;
					public setColor(param0: number): void;
					public getColor(): number;
					public setWidth(param0: number): void;
					public getWidth(): number;
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export module annotations {
				export class PolylineOptions extends java.lang.Object implements globalAndroid.os.Parcelable {
					public static class: java.lang.Class<com.mapbox.mapboxsdk.annotations.PolylineOptions>;
					public static CREATOR: globalAndroid.os.Parcelable.Creator<com.mapbox.mapboxsdk.annotations.PolylineOptions>;
					public getAlpha(): number;
					public getColor(): number;
					public describeContents(): number;
					public getWidth(): number;
					public color(param0: number): com.mapbox.mapboxsdk.annotations.PolylineOptions;
					public alpha(param0: number): com.mapbox.mapboxsdk.annotations.PolylineOptions;
					public add(param0: native.Array<com.mapbox.mapboxsdk.geometry.LatLng>): com.mapbox.mapboxsdk.annotations.PolylineOptions;
					public equals(param0: any): boolean;
					public add(param0: com.mapbox.mapboxsdk.geometry.LatLng): com.mapbox.mapboxsdk.annotations.PolylineOptions;
					public constructor();
					public addAll(param0: java.lang.Iterable<com.mapbox.mapboxsdk.geometry.LatLng>): com.mapbox.mapboxsdk.annotations.PolylineOptions;
					public getPolyline(): com.mapbox.mapboxsdk.annotations.Polyline;
					public writeToParcel(param0: globalAndroid.os.Parcel, param1: number): void;
					public getPoints(): java.util.List<com.mapbox.mapboxsdk.geometry.LatLng>;
					public hashCode(): number;
					public width(param0: number): com.mapbox.mapboxsdk.annotations.PolylineOptions;
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export module attribution {
				export class Attribution extends java.lang.Object {
					public static class: java.lang.Class<com.mapbox.mapboxsdk.attribution.Attribution>;
					public getTitle(): string;
					public equals(param0: any): boolean;
					public getUrl(): string;
					public hashCode(): number;
					public getTitleAbbreviated(): string;
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export module attribution {
				export class AttributionLayout extends java.lang.Object {
					public static class: java.lang.Class<com.mapbox.mapboxsdk.attribution.AttributionLayout>;
					public equals(param0: any): boolean;
					public toString(): string;
					public getLogo(): globalAndroid.graphics.Bitmap;
					public constructor(param0: globalAndroid.graphics.Bitmap, param1: globalAndroid.graphics.PointF, param2: boolean);
					public hashCode(): number;
					public getAnchorPoint(): globalAndroid.graphics.PointF;
					public isShortText(): boolean;
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export module attribution {
				export class AttributionMeasure extends java.lang.Object {
					public static class: java.lang.Class<com.mapbox.mapboxsdk.attribution.AttributionMeasure>;
					public getTextView(): globalAndroid.widget.TextView;
					public measure(): com.mapbox.mapboxsdk.attribution.AttributionLayout;
				}
				export module AttributionMeasure {
					export class Builder extends java.lang.Object {
						public static class: java.lang.Class<com.mapbox.mapboxsdk.attribution.AttributionMeasure.Builder>;
						public constructor();
						public setSnapshot(param0: globalAndroid.graphics.Bitmap): com.mapbox.mapboxsdk.attribution.AttributionMeasure.Builder;
						public setMarginPadding(param0: number): com.mapbox.mapboxsdk.attribution.AttributionMeasure.Builder;
						public setLogo(param0: globalAndroid.graphics.Bitmap): com.mapbox.mapboxsdk.attribution.AttributionMeasure.Builder;
						public setLogoSmall(param0: globalAndroid.graphics.Bitmap): com.mapbox.mapboxsdk.attribution.AttributionMeasure.Builder;
						public setTextViewShort(param0: globalAndroid.widget.TextView): com.mapbox.mapboxsdk.attribution.AttributionMeasure.Builder;
						public build(): com.mapbox.mapboxsdk.attribution.AttributionMeasure;
						public setTextView(param0: globalAndroid.widget.TextView): com.mapbox.mapboxsdk.attribution.AttributionMeasure.Builder;
					}
					export class Chain extends java.lang.Object {
						public static class: java.lang.Class<com.mapbox.mapboxsdk.attribution.AttributionMeasure.Chain>;
						public commands: java.util.List<com.mapbox.mapboxsdk.attribution.AttributionMeasure.Command>;
						public start(param0: com.mapbox.mapboxsdk.attribution.AttributionMeasure): com.mapbox.mapboxsdk.attribution.AttributionLayout;
					}
					export class Command extends java.lang.Object {
						public static class: java.lang.Class<com.mapbox.mapboxsdk.attribution.AttributionMeasure.Command>;
						/**
						 * Constructs a new instance of the com.mapbox.mapboxsdk.attribution.AttributionMeasure$Command interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
						 */
						public constructor(implementation: {
							execute(param0: com.mapbox.mapboxsdk.attribution.AttributionMeasure): com.mapbox.mapboxsdk.attribution.AttributionLayout;
						});
						public constructor();
						public execute(param0: com.mapbox.mapboxsdk.attribution.AttributionMeasure): com.mapbox.mapboxsdk.attribution.AttributionLayout;
					}
					export class FullLogoLongTextCommand extends java.lang.Object implements com.mapbox.mapboxsdk.attribution.AttributionMeasure.Command {
						public static class: java.lang.Class<com.mapbox.mapboxsdk.attribution.AttributionMeasure.FullLogoLongTextCommand>;
						public execute(param0: com.mapbox.mapboxsdk.attribution.AttributionMeasure): com.mapbox.mapboxsdk.attribution.AttributionLayout;
					}
					export class FullLogoShortTextCommand extends java.lang.Object implements com.mapbox.mapboxsdk.attribution.AttributionMeasure.Command {
						public static class: java.lang.Class<com.mapbox.mapboxsdk.attribution.AttributionMeasure.FullLogoShortTextCommand>;
						public execute(param0: com.mapbox.mapboxsdk.attribution.AttributionMeasure): com.mapbox.mapboxsdk.attribution.AttributionLayout;
					}
					export class LongTextCommand extends java.lang.Object implements com.mapbox.mapboxsdk.attribution.AttributionMeasure.Command {
						public static class: java.lang.Class<com.mapbox.mapboxsdk.attribution.AttributionMeasure.LongTextCommand>;
						public execute(param0: com.mapbox.mapboxsdk.attribution.AttributionMeasure): com.mapbox.mapboxsdk.attribution.AttributionLayout;
					}
					export class NoTextCommand extends java.lang.Object implements com.mapbox.mapboxsdk.attribution.AttributionMeasure.Command {
						public static class: java.lang.Class<com.mapbox.mapboxsdk.attribution.AttributionMeasure.NoTextCommand>;
						public execute(param0: com.mapbox.mapboxsdk.attribution.AttributionMeasure): com.mapbox.mapboxsdk.attribution.AttributionLayout;
					}
					export class ShortTextCommand extends java.lang.Object implements com.mapbox.mapboxsdk.attribution.AttributionMeasure.Command {
						public static class: java.lang.Class<com.mapbox.mapboxsdk.attribution.AttributionMeasure.ShortTextCommand>;
						public execute(param0: com.mapbox.mapboxsdk.attribution.AttributionMeasure): com.mapbox.mapboxsdk.attribution.AttributionLayout;
					}
					export class SmallLogoLongTextCommand extends java.lang.Object implements com.mapbox.mapboxsdk.attribution.AttributionMeasure.Command {
						public static class: java.lang.Class<com.mapbox.mapboxsdk.attribution.AttributionMeasure.SmallLogoLongTextCommand>;
						public execute(param0: com.mapbox.mapboxsdk.attribution.AttributionMeasure): com.mapbox.mapboxsdk.attribution.AttributionLayout;
					}
					export class SmallLogoShortTextCommand extends java.lang.Object implements com.mapbox.mapboxsdk.attribution.AttributionMeasure.Command {
						public static class: java.lang.Class<com.mapbox.mapboxsdk.attribution.AttributionMeasure.SmallLogoShortTextCommand>;
						public execute(param0: com.mapbox.mapboxsdk.attribution.AttributionMeasure): com.mapbox.mapboxsdk.attribution.AttributionLayout;
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export module attribution {
				export class AttributionParser extends java.lang.Object {
					public static class: java.lang.Class<com.mapbox.mapboxsdk.attribution.AttributionParser>;
					public getAttributions(): java.util.Set<com.mapbox.mapboxsdk.attribution.Attribution>;
					public createAttributionString(param0: boolean): string;
					public createAttributionString(): string;
					public parse(): void;
				}
				export module AttributionParser {
					export class Options extends java.lang.Object {
						public static class: java.lang.Class<com.mapbox.mapboxsdk.attribution.AttributionParser.Options>;
						public constructor(param0: globalAndroid.content.Context);
						public withCopyrightSign(param0: boolean): com.mapbox.mapboxsdk.attribution.AttributionParser.Options;
						public withImproveMap(param0: boolean): com.mapbox.mapboxsdk.attribution.AttributionParser.Options;
						public withMapboxAttribution(param0: boolean): com.mapbox.mapboxsdk.attribution.AttributionParser.Options;
						public build(): com.mapbox.mapboxsdk.attribution.AttributionParser;
						public withAttributionData(param0: native.Array<string>): com.mapbox.mapboxsdk.attribution.AttributionParser.Options;
						public withTelemetryAttribution(param0: boolean): com.mapbox.mapboxsdk.attribution.AttributionParser.Options;
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export module camera {
				export class CameraPosition extends java.lang.Object implements globalAndroid.os.Parcelable {
					public static class: java.lang.Class<com.mapbox.mapboxsdk.camera.CameraPosition>;
					public static DEFAULT: com.mapbox.mapboxsdk.camera.CameraPosition;
					public static CREATOR: globalAndroid.os.Parcelable.Creator<com.mapbox.mapboxsdk.camera.CameraPosition>;
					public bearing: number;
					public target: com.mapbox.mapboxsdk.geometry.LatLng;
					public tilt: number;
					public zoom: number;
					public padding: native.Array<number>;
					public equals(param0: any): boolean;
					public toString(): string;
					public describeContents(): number;
					public writeToParcel(param0: globalAndroid.os.Parcel, param1: number): void;
					public hashCode(): number;
				}
				export module CameraPosition {
					export class Builder extends java.lang.Object {
						public static class: java.lang.Class<com.mapbox.mapboxsdk.camera.CameraPosition.Builder>;
						public constructor();
						public constructor(param0: globalAndroid.content.res.TypedArray);
						public constructor(param0: com.mapbox.mapboxsdk.camera.CameraPosition);
						public padding(param0: native.Array<number>): com.mapbox.mapboxsdk.camera.CameraPosition.Builder;
						public target(param0: com.mapbox.mapboxsdk.geometry.LatLng): com.mapbox.mapboxsdk.camera.CameraPosition.Builder;
						public tilt(param0: number): com.mapbox.mapboxsdk.camera.CameraPosition.Builder;
						public padding(param0: number, param1: number, param2: number, param3: number): com.mapbox.mapboxsdk.camera.CameraPosition.Builder;
						public constructor(param0: com.mapbox.mapboxsdk.camera.CameraUpdateFactory.ZoomUpdate);
						public constructor(param0: com.mapbox.mapboxsdk.camera.CameraUpdateFactory.CameraPositionUpdate);
						public zoom(param0: number): com.mapbox.mapboxsdk.camera.CameraPosition.Builder;
						public build(): com.mapbox.mapboxsdk.camera.CameraPosition;
						public bearing(param0: number): com.mapbox.mapboxsdk.camera.CameraPosition.Builder;
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export module camera {
				export class CameraUpdate extends java.lang.Object {
					public static class: java.lang.Class<com.mapbox.mapboxsdk.camera.CameraUpdate>;
					/**
					 * Constructs a new instance of the com.mapbox.mapboxsdk.camera.CameraUpdate interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
					 */
					public constructor(implementation: {
						getCameraPosition(param0: com.mapbox.mapboxsdk.maps.MapboxMap): com.mapbox.mapboxsdk.camera.CameraPosition;
					});
					public constructor();
					public getCameraPosition(param0: com.mapbox.mapboxsdk.maps.MapboxMap): com.mapbox.mapboxsdk.camera.CameraPosition;
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export module camera {
				export class CameraUpdateFactory extends java.lang.Object {
					public static class: java.lang.Class<com.mapbox.mapboxsdk.camera.CameraUpdateFactory>;
					public static paddingTo(param0: number, param1: number, param2: number, param3: number): com.mapbox.mapboxsdk.camera.CameraUpdate;
					public static newLatLngBounds(param0: com.mapbox.mapboxsdk.geometry.LatLngBounds, param1: number, param2: number, param3: number, param4: number): com.mapbox.mapboxsdk.camera.CameraUpdate;
					public static newLatLngBounds(param0: com.mapbox.mapboxsdk.geometry.LatLngBounds, param1: number, param2: number, param3: number): com.mapbox.mapboxsdk.camera.CameraUpdate;
					public static newLatLngPadding(param0: com.mapbox.mapboxsdk.geometry.LatLng, param1: number, param2: number, param3: number, param4: number): com.mapbox.mapboxsdk.camera.CameraUpdate;
					public static zoomIn(): com.mapbox.mapboxsdk.camera.CameraUpdate;
					public static newLatLngBounds(param0: com.mapbox.mapboxsdk.geometry.LatLngBounds, param1: number, param2: number, param3: number, param4: number, param5: number, param6: number): com.mapbox.mapboxsdk.camera.CameraUpdate;
					public static newLatLngZoom(param0: com.mapbox.mapboxsdk.geometry.LatLng, param1: number): com.mapbox.mapboxsdk.camera.CameraUpdate;
					public static zoomBy(param0: number): com.mapbox.mapboxsdk.camera.CameraUpdate;
					public static zoomOut(): com.mapbox.mapboxsdk.camera.CameraUpdate;
					public static tiltTo(param0: number): com.mapbox.mapboxsdk.camera.CameraUpdate;
					public static zoomTo(param0: number): com.mapbox.mapboxsdk.camera.CameraUpdate;
					public constructor();
					public static newLatLng(param0: com.mapbox.mapboxsdk.geometry.LatLng): com.mapbox.mapboxsdk.camera.CameraUpdate;
					public static bearingTo(param0: number): com.mapbox.mapboxsdk.camera.CameraUpdate;
					public static newLatLngBounds(param0: com.mapbox.mapboxsdk.geometry.LatLngBounds, param1: number): com.mapbox.mapboxsdk.camera.CameraUpdate;
					public static newCameraPosition(param0: com.mapbox.mapboxsdk.camera.CameraPosition): com.mapbox.mapboxsdk.camera.CameraUpdate;
					public static zoomBy(param0: number, param1: globalAndroid.graphics.Point): com.mapbox.mapboxsdk.camera.CameraUpdate;
					public static paddingTo(param0: native.Array<number>): com.mapbox.mapboxsdk.camera.CameraUpdate;
				}
				export module CameraUpdateFactory {
					export class CameraBoundsUpdate extends java.lang.Object implements com.mapbox.mapboxsdk.camera.CameraUpdate {
						public static class: java.lang.Class<com.mapbox.mapboxsdk.camera.CameraUpdateFactory.CameraBoundsUpdate>;
						public getBounds(): com.mapbox.mapboxsdk.geometry.LatLngBounds;
						public getPadding(): native.Array<number>;
						public equals(param0: any): boolean;
						public hashCode(): number;
						public getCameraPosition(param0: com.mapbox.mapboxsdk.maps.MapboxMap): com.mapbox.mapboxsdk.camera.CameraPosition;
						public toString(): string;
					}
					export class CameraMoveUpdate extends java.lang.Object implements com.mapbox.mapboxsdk.camera.CameraUpdate {
						public static class: java.lang.Class<com.mapbox.mapboxsdk.camera.CameraUpdateFactory.CameraMoveUpdate>;
						public equals(param0: any): boolean;
						public hashCode(): number;
						public getCameraPosition(param0: com.mapbox.mapboxsdk.maps.MapboxMap): com.mapbox.mapboxsdk.camera.CameraPosition;
						public toString(): string;
					}
					export class CameraPositionUpdate extends java.lang.Object implements com.mapbox.mapboxsdk.camera.CameraUpdate {
						public static class: java.lang.Class<com.mapbox.mapboxsdk.camera.CameraUpdateFactory.CameraPositionUpdate>;
						public getPadding(): native.Array<number>;
						public getZoom(): number;
						public getBearing(): number;
						public getTilt(): number;
						public equals(param0: any): boolean;
						public hashCode(): number;
						public getCameraPosition(param0: com.mapbox.mapboxsdk.maps.MapboxMap): com.mapbox.mapboxsdk.camera.CameraPosition;
						public getTarget(): com.mapbox.mapboxsdk.geometry.LatLng;
						public toString(): string;
					}
					export class ZoomUpdate extends java.lang.Object implements com.mapbox.mapboxsdk.camera.CameraUpdate {
						public static class: java.lang.Class<com.mapbox.mapboxsdk.camera.CameraUpdateFactory.ZoomUpdate>;
						public getZoom(): number;
						public getX(): number;
						public getY(): number;
						public equals(param0: any): boolean;
						public hashCode(): number;
						public getType(): number;
						public getCameraPosition(param0: com.mapbox.mapboxsdk.maps.MapboxMap): com.mapbox.mapboxsdk.camera.CameraPosition;
						public toString(): string;
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export module constants {
				export class GeometryConstants extends java.lang.Object {
					public static class: java.lang.Class<com.mapbox.mapboxsdk.constants.GeometryConstants>;
					public static RADIUS_EARTH_METERS: number;
					public static MIN_WRAP_LONGITUDE: number;
					public static MAX_WRAP_LONGITUDE: number;
					public static MIN_LONGITUDE: number;
					public static MAX_LONGITUDE: number;
					public static MIN_LATITUDE: number;
					public static LATITUDE_SPAN: number;
					public static LONGITUDE_SPAN: number;
					public static MAX_LATITUDE: number;
					public static MAX_MERCATOR_LATITUDE: number;
					public static MIN_MERCATOR_LATITUDE: number;
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export module constants {
				export class MapboxConstants extends java.lang.Object {
					public static class: java.lang.Class<com.mapbox.mapboxsdk.constants.MapboxConstants>;
					public static MAPBOX_LOCALE: java.util.Locale;
					public static MAPBOX_SHARED_PREFERENCES: string;
					public static KEY_META_DATA_SET_STORAGE_EXTERNAL: string;
					public static DEFAULT_SET_STORAGE_EXTERNAL: boolean;
					public static KEY_META_DATA_MEASURE_TILE_DOWNLOAD_ON: string;
					public static DEFAULT_MEASURE_TILE_DOWNLOAD_ON: boolean;
					public static KEY_PREFERENCE_SKU_TOKEN: string;
					public static KEY_META_DATA_MANAGE_SKU_TOKEN: string;
					public static DEFAULT_MANAGE_SKU_TOKEN: boolean;
					public static DEFAULT_FONT: string;
					public static UNMEASURED: number;
					public static ANIMATION_DURATION: number;
					public static ANIMATION_DURATION_SHORT: number;
					public static ANIMATION_DURATION_FLING_BASE: number;
					public static VELOCITY_THRESHOLD_IGNORE_FLING: number;
					public static ANGLE_THRESHOLD_IGNORE_VERTICAL_FLING: number;
					public static ROTATION_THRESHOLD_INCREASE_WHEN_SCALING: number;
					public static MAX_ABSOLUTE_SCALE_VELOCITY_CHANGE: number;
					public static QUICK_ZOOM_MAX_ZOOM_CHANGE: number;
					public static SCALE_VELOCITY_ANIMATION_DURATION_MULTIPLIER: number;
					public static MINIMUM_ANGULAR_VELOCITY: number;
					public static SCALE_VELOCITY_RATIO_THRESHOLD: number;
					public static ROTATE_VELOCITY_RATIO_THRESHOLD: number;
					public static SCHEDULED_ANIMATION_TIMEOUT: number;
					public static MAXIMUM_ANGULAR_VELOCITY: number;
					public static SHOVE_PIXEL_CHANGE_FACTOR: number;
					public static MINIMUM_ZOOM: number;
					public static MAXIMUM_ZOOM: number;
					public static MAXIMUM_TILT: number;
					public static MINIMUM_TILT: number;
					public static MAXIMUM_DIRECTION: number;
					public static MINIMUM_DIRECTION: number;
					public static MINIMUM_SCALE_FACTOR_CLAMP: number;
					public static MAXIMUM_SCALE_FACTOR_CLAMP: number;
					public static ZOOM_RATE: number;
					public static FRAG_ARG_MAPBOXMAPOPTIONS: string;
					public static LAYER_ID_ANNOTATIONS: string;
					public static STATE_HAS_SAVED_STATE: string;
					public static STATE_CAMERA_POSITION: string;
					public static STATE_ZOOM_ENABLED: string;
					public static STATE_SCROLL_ENABLED: string;
					public static STATE_HORIZONAL_SCROLL_ENABLED: string;
					public static STATE_ROTATE_ENABLED: string;
					public static STATE_TILT_ENABLED: string;
					public static STATE_DOUBLE_TAP_ENABLED: string;
					public static STATE_QUICK_ZOOM_ENABLED: string;
					public static STATE_ZOOM_RATE: string;
					public static STATE_DEBUG_ACTIVE: string;
					public static STATE_COMPASS_ENABLED: string;
					public static STATE_COMPASS_GRAVITY: string;
					public static STATE_COMPASS_MARGIN_LEFT: string;
					public static STATE_COMPASS_MARGIN_TOP: string;
					public static STATE_COMPASS_MARGIN_RIGHT: string;
					public static STATE_COMPASS_MARGIN_BOTTOM: string;
					public static STATE_COMPASS_FADE_WHEN_FACING_NORTH: string;
					public static STATE_COMPASS_IMAGE_BITMAP: string;
					public static STATE_LOGO_GRAVITY: string;
					public static STATE_LOGO_MARGIN_LEFT: string;
					public static STATE_LOGO_MARGIN_TOP: string;
					public static STATE_LOGO_MARGIN_RIGHT: string;
					public static STATE_LOGO_MARGIN_BOTTOM: string;
					public static STATE_LOGO_ENABLED: string;
					public static STATE_ATTRIBUTION_GRAVITY: string;
					public static STATE_ATTRIBUTION_MARGIN_LEFT: string;
					public static STATE_ATTRIBUTION_MARGIN_TOP: string;
					public static STATE_ATTRIBUTION_MARGIN_RIGHT: string;
					public static STATE_ATTRIBUTION_MARGIN_BOTTOM: string;
					public static STATE_ATTRIBUTION_ENABLED: string;
					public static STATE_DESELECT_MARKER_ON_TAP: string;
					public static STATE_USER_FOCAL_POINT: string;
					public static STATE_SCALE_ANIMATION_ENABLED: string;
					public static STATE_ROTATE_ANIMATION_ENABLED: string;
					public static STATE_FLING_ANIMATION_ENABLED: string;
					public static STATE_INCREASE_ROTATE_THRESHOLD: string;
					public static STATE_DISABLE_ROTATE_WHEN_SCALING: string;
					public static STATE_INCREASE_SCALE_THRESHOLD: string;
					public constructor();
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export module constants {
				export class TelemetryConstants extends java.lang.Object {
					public static class: java.lang.Class<com.mapbox.mapboxsdk.constants.TelemetryConstants>;
					public static TWO_FINGER_TAP: string;
					public static DOUBLE_TAP: string;
					public static SINGLE_TAP: string;
					public static PAN: string;
					public static PINCH: string;
					public static ROTATION: string;
					public static PITCH: string;
					public constructor();
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export module exceptions {
				export class CalledFromWorkerThreadException extends java.lang.RuntimeException {
					public static class: java.lang.Class<com.mapbox.mapboxsdk.exceptions.CalledFromWorkerThreadException>;
					public constructor(param0: string, param1: java.lang.Throwable, param2: boolean, param3: boolean);
					public constructor(param0: string, param1: java.lang.Throwable);
					public constructor(param0: string);
					public constructor(param0: java.lang.Throwable);
					public constructor();
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export module exceptions {
				export class ConversionException extends java.lang.RuntimeException {
					public static class: java.lang.Class<com.mapbox.mapboxsdk.exceptions.ConversionException>;
					public constructor(param0: string, param1: java.lang.Throwable, param2: boolean, param3: boolean);
					public constructor(param0: string, param1: java.lang.Throwable);
					public constructor(param0: string);
					public constructor(param0: java.lang.Throwable);
					public constructor();
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export module exceptions {
				export class IconBitmapChangedException extends java.lang.RuntimeException {
					public static class: java.lang.Class<com.mapbox.mapboxsdk.exceptions.IconBitmapChangedException>;
					public constructor(param0: string, param1: java.lang.Throwable, param2: boolean, param3: boolean);
					public constructor(param0: string, param1: java.lang.Throwable);
					public constructor(param0: string);
					public constructor(param0: java.lang.Throwable);
					public constructor();
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export module exceptions {
				export class InvalidLatLngBoundsException extends java.lang.RuntimeException {
					public static class: java.lang.Class<com.mapbox.mapboxsdk.exceptions.InvalidLatLngBoundsException>;
					public constructor(param0: string, param1: java.lang.Throwable, param2: boolean, param3: boolean);
					public constructor(param0: string, param1: java.lang.Throwable);
					public constructor(param0: string);
					public constructor(param0: java.lang.Throwable);
					public constructor();
					public constructor(param0: number);
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export module exceptions {
				export class InvalidMarkerPositionException extends java.lang.RuntimeException {
					public static class: java.lang.Class<com.mapbox.mapboxsdk.exceptions.InvalidMarkerPositionException>;
					public constructor(param0: string, param1: java.lang.Throwable, param2: boolean, param3: boolean);
					public constructor(param0: string, param1: java.lang.Throwable);
					public constructor(param0: string);
					public constructor(param0: java.lang.Throwable);
					public constructor();
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export module exceptions {
				export class MapboxConfigurationException extends java.lang.RuntimeException {
					public static class: java.lang.Class<com.mapbox.mapboxsdk.exceptions.MapboxConfigurationException>;
					public constructor(param0: string, param1: java.lang.Throwable, param2: boolean, param3: boolean);
					public constructor(param0: string, param1: java.lang.Throwable);
					public constructor(param0: string);
					public constructor(param0: java.lang.Throwable);
					public constructor();
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export module exceptions {
				export class TooManyIconsException extends java.lang.RuntimeException {
					public static class: java.lang.Class<com.mapbox.mapboxsdk.exceptions.TooManyIconsException>;
					public constructor(param0: string, param1: java.lang.Throwable, param2: boolean, param3: boolean);
					public constructor(param0: string, param1: java.lang.Throwable);
					public constructor(param0: string);
					public constructor(param0: java.lang.Throwable);
					public constructor();
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export module geometry {
				export class LatLng extends java.lang.Object implements globalAndroid.os.Parcelable {
					public static class: java.lang.Class<com.mapbox.mapboxsdk.geometry.LatLng>;
					public static CREATOR: globalAndroid.os.Parcelable.Creator<com.mapbox.mapboxsdk.geometry.LatLng>;
					public distanceTo(param0: com.mapbox.mapboxsdk.geometry.LatLng): number;
					public setLongitude(param0: number): void;
					public getLatitude(): number;
					public getLongitude(): number;
					public getAltitude(): number;
					public wrap(): com.mapbox.mapboxsdk.geometry.LatLng;
					public describeContents(): number;
					public constructor(param0: globalAndroid.location.Location);
					public equals(param0: any): boolean;
					public constructor(param0: globalAndroid.os.Parcel);
					public setLatitude(param0: number): void;
					public constructor(param0: com.mapbox.mapboxsdk.geometry.LatLng);
					public setAltitude(param0: number): void;
					public toString(): string;
					public constructor();
					public constructor(param0: number, param1: number, param2: number);
					public writeToParcel(param0: globalAndroid.os.Parcel, param1: number): void;
					public hashCode(): number;
					public constructor(param0: number, param1: number);
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export module geometry {
				export class LatLngBounds extends java.lang.Object implements globalAndroid.os.Parcelable {
					public static class: java.lang.Class<com.mapbox.mapboxsdk.geometry.LatLngBounds>;
					public static CREATOR: globalAndroid.os.Parcelable.Creator<com.mapbox.mapboxsdk.geometry.LatLngBounds>;
					public getNorthEast(): com.mapbox.mapboxsdk.geometry.LatLng;
					public union(param0: number, param1: number, param2: number, param3: number): com.mapbox.mapboxsdk.geometry.LatLngBounds;
					public include(param0: com.mapbox.mapboxsdk.geometry.LatLng): com.mapbox.mapboxsdk.geometry.LatLngBounds;
					public isEmptySpan(): boolean;
					public intersect(param0: com.mapbox.mapboxsdk.geometry.LatLngBounds): com.mapbox.mapboxsdk.geometry.LatLngBounds;
					public getLatNorth(): number;
					public getLatSouth(): number;
					public static from(param0: number, param1: number, param2: number): com.mapbox.mapboxsdk.geometry.LatLngBounds;
					public toString(): string;
					public contains(param0: com.mapbox.mapboxsdk.geometry.LatLngBounds): boolean;
					public getNorthWest(): com.mapbox.mapboxsdk.geometry.LatLng;
					public getCenter(): com.mapbox.mapboxsdk.geometry.LatLng;
					public toLatLngs(): native.Array<com.mapbox.mapboxsdk.geometry.LatLng>;
					public hashCode(): number;
					public getSpan(): com.mapbox.mapboxsdk.geometry.LatLngSpan;
					public static from(param0: number, param1: number, param2: number, param3: number): com.mapbox.mapboxsdk.geometry.LatLngBounds;
					public describeContents(): number;
					public getLatitudeSpan(): number;
					public contains(param0: com.mapbox.mapboxsdk.geometry.LatLng): boolean;
					public union(param0: com.mapbox.mapboxsdk.geometry.LatLngBounds): com.mapbox.mapboxsdk.geometry.LatLngBounds;
					public getSouthWest(): com.mapbox.mapboxsdk.geometry.LatLng;
					public equals(param0: any): boolean;
					public getLonEast(): number;
					public intersect(param0: number, param1: number, param2: number, param3: number): com.mapbox.mapboxsdk.geometry.LatLngBounds;
					public static world(): com.mapbox.mapboxsdk.geometry.LatLngBounds;
					public getSouthEast(): com.mapbox.mapboxsdk.geometry.LatLng;
					public getLongitudeSpan(): number;
					public writeToParcel(param0: globalAndroid.os.Parcel, param1: number): void;
					public getLonWest(): number;
				}
				export module LatLngBounds {
					export class Builder extends java.lang.Object {
						public static class: java.lang.Class<com.mapbox.mapboxsdk.geometry.LatLngBounds.Builder>;
						public constructor();
						public include(param0: com.mapbox.mapboxsdk.geometry.LatLng): com.mapbox.mapboxsdk.geometry.LatLngBounds.Builder;
						public includes(param0: java.util.List<com.mapbox.mapboxsdk.geometry.LatLng>): com.mapbox.mapboxsdk.geometry.LatLngBounds.Builder;
						public build(): com.mapbox.mapboxsdk.geometry.LatLngBounds;
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export module geometry {
				export class LatLngQuad extends java.lang.Object implements globalAndroid.os.Parcelable {
					public static class: java.lang.Class<com.mapbox.mapboxsdk.geometry.LatLngQuad>;
					public static CREATOR: globalAndroid.os.Parcelable.Creator<com.mapbox.mapboxsdk.geometry.LatLngQuad>;
					public getBottomRight(): com.mapbox.mapboxsdk.geometry.LatLng;
					public getBottomLeft(): com.mapbox.mapboxsdk.geometry.LatLng;
					public describeContents(): number;
					public constructor(param0: com.mapbox.mapboxsdk.geometry.LatLng, param1: com.mapbox.mapboxsdk.geometry.LatLng, param2: com.mapbox.mapboxsdk.geometry.LatLng, param3: com.mapbox.mapboxsdk.geometry.LatLng);
					public writeToParcel(param0: globalAndroid.os.Parcel, param1: number): void;
					public hashCode(): number;
					public getTopLeft(): com.mapbox.mapboxsdk.geometry.LatLng;
					public getTopRight(): com.mapbox.mapboxsdk.geometry.LatLng;
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export module geometry {
				export class LatLngSpan extends java.lang.Object implements globalAndroid.os.Parcelable {
					public static class: java.lang.Class<com.mapbox.mapboxsdk.geometry.LatLngSpan>;
					public static CREATOR: globalAndroid.os.Parcelable.Creator<com.mapbox.mapboxsdk.geometry.LatLngSpan>;
					public equals(param0: any): boolean;
					public setLatitudeSpan(param0: number): void;
					public describeContents(): number;
					public getLatitudeSpan(): number;
					public setLongitudeSpan(param0: number): void;
					public getLongitudeSpan(): number;
					public writeToParcel(param0: globalAndroid.os.Parcel, param1: number): void;
					public hashCode(): number;
					public constructor(param0: number, param1: number);
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export module geometry {
				export class ProjectedMeters extends java.lang.Object implements globalAndroid.os.Parcelable {
					public static class: java.lang.Class<com.mapbox.mapboxsdk.geometry.ProjectedMeters>;
					public static CREATOR: globalAndroid.os.Parcelable.Creator<com.mapbox.mapboxsdk.geometry.ProjectedMeters>;
					public equals(param0: any): boolean;
					public constructor(param0: com.mapbox.mapboxsdk.geometry.ProjectedMeters);
					public toString(): string;
					public getNorthing(): number;
					public describeContents(): number;
					public getEasting(): number;
					public writeToParcel(param0: globalAndroid.os.Parcel, param1: number): void;
					public hashCode(): number;
					public constructor(param0: number, param1: number);
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export module geometry {
				export class VisibleRegion extends java.lang.Object implements globalAndroid.os.Parcelable {
					public static class: java.lang.Class<com.mapbox.mapboxsdk.geometry.VisibleRegion>;
					public farLeft: com.mapbox.mapboxsdk.geometry.LatLng;
					public farRight: com.mapbox.mapboxsdk.geometry.LatLng;
					public nearLeft: com.mapbox.mapboxsdk.geometry.LatLng;
					public nearRight: com.mapbox.mapboxsdk.geometry.LatLng;
					public latLngBounds: com.mapbox.mapboxsdk.geometry.LatLngBounds;
					public static CREATOR: globalAndroid.os.Parcelable.Creator<com.mapbox.mapboxsdk.geometry.VisibleRegion>;
					public equals(param0: any): boolean;
					public toString(): string;
					public describeContents(): number;
					public constructor(param0: com.mapbox.mapboxsdk.geometry.LatLng, param1: com.mapbox.mapboxsdk.geometry.LatLng, param2: com.mapbox.mapboxsdk.geometry.LatLng, param3: com.mapbox.mapboxsdk.geometry.LatLng, param4: com.mapbox.mapboxsdk.geometry.LatLngBounds);
					public writeToParcel(param0: globalAndroid.os.Parcel, param1: number): void;
					public hashCode(): number;
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export module http {
				export class HttpIdentifier extends java.lang.Object {
					public static class: java.lang.Class<com.mapbox.mapboxsdk.http.HttpIdentifier>;
					public static getIdentifier(): string;
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export module http {
				export class HttpLogger extends java.lang.Object {
					public static class: java.lang.Class<com.mapbox.mapboxsdk.http.HttpLogger>;
					public static logRequestUrl: boolean;
					public static logEnabled: boolean;
					public static log(param0: number, param1: string): void;
					public static logFailure(param0: number, param1: string, param2: string): void;
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export module http {
				export class HttpRequest extends java.lang.Object {
					public static class: java.lang.Class<com.mapbox.mapboxsdk.http.HttpRequest>;
					/**
					 * Constructs a new instance of the com.mapbox.mapboxsdk.http.HttpRequest interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
					 */
					public constructor(implementation: {
						executeRequest(param0: com.mapbox.mapboxsdk.http.HttpResponder, param1: number, param2: string, param3: string, param4: string, param5: boolean): void;
						cancelRequest(): void;
					});
					public constructor();
					public static CONNECTION_ERROR: number;
					public static TEMPORARY_ERROR: number;
					public static PERMANENT_ERROR: number;
					public executeRequest(param0: com.mapbox.mapboxsdk.http.HttpResponder, param1: number, param2: string, param3: string, param4: string, param5: boolean): void;
					public cancelRequest(): void;
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export module http {
				export class HttpRequestUrl extends java.lang.Object {
					public static class: java.lang.Class<com.mapbox.mapboxsdk.http.HttpRequestUrl>;
					public static buildResourceUrl(param0: string, param1: string, param2: number, param3: boolean): string;
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export module http {
				export class HttpResponder extends java.lang.Object {
					public static class: java.lang.Class<com.mapbox.mapboxsdk.http.HttpResponder>;
					/**
					 * Constructs a new instance of the com.mapbox.mapboxsdk.http.HttpResponder interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
					 */
					public constructor(implementation: {
						onResponse(param0: number, param1: string, param2: string, param3: string, param4: string, param5: string, param6: string, param7: native.Array<number>): void;
						handleFailure(param0: number, param1: string): void;
					});
					public constructor();
					public handleFailure(param0: number, param1: string): void;
					public onResponse(param0: number, param1: string, param2: string, param3: string, param4: string, param5: string, param6: string, param7: native.Array<number>): void;
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export module http {
				export class LocalRequestTask extends globalAndroid.os.AsyncTask<string,java.lang.Void,native.Array<number>> {
					public static class: java.lang.Class<com.mapbox.mapboxsdk.http.LocalRequestTask>;
					public onPostExecute(param0: native.Array<number>): void;
					public doInBackground(param0: native.Array<any>): any;
					public onPostExecute(param0: any): void;
					public doInBackground(param0: native.Array<string>): native.Array<number>;
				}
				export module LocalRequestTask {
					export class OnLocalRequestResponse extends java.lang.Object {
						public static class: java.lang.Class<com.mapbox.mapboxsdk.http.LocalRequestTask.OnLocalRequestResponse>;
						/**
						 * Constructs a new instance of the com.mapbox.mapboxsdk.http.LocalRequestTask$OnLocalRequestResponse interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
						 */
						public constructor(implementation: {
							onResponse(param0: native.Array<number>): void;
						});
						public constructor();
						public onResponse(param0: native.Array<number>): void;
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export module http {
				export class NativeHttpRequest extends java.lang.Object implements com.mapbox.mapboxsdk.http.HttpResponder {
					public static class: java.lang.Class<com.mapbox.mapboxsdk.http.NativeHttpRequest>;
					public handleFailure(param0: number, param1: string): void;
					public cancel(): void;
					public onResponse(param0: number, param1: string, param2: string, param3: string, param4: string, param5: string, param6: string, param7: native.Array<number>): void;
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export module location {
				export class AnimatorListenerHolder extends java.lang.Object {
					public static class: java.lang.Class<com.mapbox.mapboxsdk.location.AnimatorListenerHolder>;
					public equals(param0: any): boolean;
					public getListener(): com.mapbox.mapboxsdk.location.MapboxAnimator.AnimationsValueChangeListener<any>;
					public getAnimatorType(): number;
					public hashCode(): number;
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export module location {
				export class CompassEngine extends java.lang.Object {
					public static class: java.lang.Class<com.mapbox.mapboxsdk.location.CompassEngine>;
					/**
					 * Constructs a new instance of the com.mapbox.mapboxsdk.location.CompassEngine interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
					 */
					public constructor(implementation: {
						addCompassListener(param0: com.mapbox.mapboxsdk.location.CompassListener): void;
						removeCompassListener(param0: com.mapbox.mapboxsdk.location.CompassListener): void;
						getLastHeading(): number;
						getLastAccuracySensorStatus(): number;
					});
					public constructor();
					public removeCompassListener(param0: com.mapbox.mapboxsdk.location.CompassListener): void;
					public getLastHeading(): number;
					public getLastAccuracySensorStatus(): number;
					public addCompassListener(param0: com.mapbox.mapboxsdk.location.CompassListener): void;
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export module location {
				export class CompassListener extends java.lang.Object {
					public static class: java.lang.Class<com.mapbox.mapboxsdk.location.CompassListener>;
					/**
					 * Constructs a new instance of the com.mapbox.mapboxsdk.location.CompassListener interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
					 */
					public constructor(implementation: {
						onCompassChanged(param0: number): void;
						onCompassAccuracyChange(param0: number): void;
					});
					public constructor();
					public onCompassAccuracyChange(param0: number): void;
					public onCompassChanged(param0: number): void;
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export module location {
				export class LatLngEvaluator extends globalAndroid.animation.TypeEvaluator<com.mapbox.mapboxsdk.geometry.LatLng> {
					public static class: java.lang.Class<com.mapbox.mapboxsdk.location.LatLngEvaluator>;
					public evaluate(param0: number, param1: com.mapbox.mapboxsdk.geometry.LatLng, param2: com.mapbox.mapboxsdk.geometry.LatLng): com.mapbox.mapboxsdk.geometry.LatLng;
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export module location {
				export class LayerBitmapProvider extends java.lang.Object {
					public static class: java.lang.Class<com.mapbox.mapboxsdk.location.LayerBitmapProvider>;
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export module location {
				export class LayerFeatureProvider extends java.lang.Object {
					public static class: java.lang.Class<com.mapbox.mapboxsdk.location.LayerFeatureProvider>;
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export module location {
				export class LayerSourceProvider extends java.lang.Object {
					public static class: java.lang.Class<com.mapbox.mapboxsdk.location.LayerSourceProvider>;
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export module location {
				export class LocationAnimatorCoordinator extends java.lang.Object {
					public static class: java.lang.Class<com.mapbox.mapboxsdk.location.LocationAnimatorCoordinator>;
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export module location {
				export class LocationCameraController extends java.lang.Object {
					public static class: java.lang.Class<com.mapbox.mapboxsdk.location.LocationCameraController>;
				}
				export module LocationCameraController {
					export class LocationGesturesManager extends com.mapbox.android.gestures.AndroidGesturesManager {
						public static class: java.lang.Class<com.mapbox.mapboxsdk.location.LocationCameraController.LocationGesturesManager>;
						public onTouchEvent(param0: globalAndroid.view.MotionEvent): boolean;
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export module location {
				export class LocationComponent extends java.lang.Object {
					public static class: java.lang.Class<com.mapbox.mapboxsdk.location.LocationComponent>;
					public getCameraMode(): number;
					public zoomWhileTracking(param0: number, param1: number): void;
					public setLocationEngineRequest(param0: com.mapbox.android.core.location.LocationEngineRequest): void;
					public removeOnLocationLongClickListener(param0: com.mapbox.mapboxsdk.location.OnLocationLongClickListener): void;
					public onDestroy(): void;
					public setCameraMode(param0: number): void;
					public onStart(): void;
					public zoomWhileTracking(param0: number, param1: number, param2: com.mapbox.mapboxsdk.maps.MapboxMap.CancelableCallback): void;
					public cancelZoomWhileTrackingAnimation(): void;
					public constructor(param0: com.mapbox.mapboxsdk.maps.MapboxMap, param1: com.mapbox.mapboxsdk.maps.Transform, param2: java.util.List<com.mapbox.mapboxsdk.maps.MapboxMap.OnDeveloperAnimationListener>);
					public forceLocationUpdate(param0: globalAndroid.location.Location): void;
					/** @deprecated */
					public activateLocationComponent(param0: globalAndroid.content.Context, param1: com.mapbox.mapboxsdk.maps.Style, param2: number): void;
					public isLocationComponentEnabled(): boolean;
					/** @deprecated */
					public activateLocationComponent(param0: globalAndroid.content.Context, param1: com.mapbox.mapboxsdk.maps.Style, param2: com.mapbox.android.core.location.LocationEngine, param3: com.mapbox.android.core.location.LocationEngineRequest, param4: com.mapbox.mapboxsdk.location.LocationComponentOptions): void;
					public applyStyle(param0: com.mapbox.mapboxsdk.location.LocationComponentOptions): void;
					/** @deprecated */
					public activateLocationComponent(param0: globalAndroid.content.Context, param1: com.mapbox.mapboxsdk.maps.Style): void;
					public removeRenderModeChangedListener(param0: com.mapbox.mapboxsdk.location.OnRenderModeChangedListener): void;
					public removeOnCameraTrackingChangedListener(param0: com.mapbox.mapboxsdk.location.OnCameraTrackingChangedListener): void;
					public getLocationEngine(): LocationEngine;
					public removeOnLocationStaleListener(param0: com.mapbox.mapboxsdk.location.OnLocationStaleListener): void;
					/** @deprecated */
					public activateLocationComponent(param0: globalAndroid.content.Context, param1: com.mapbox.mapboxsdk.maps.Style, param2: boolean, param3: com.mapbox.android.core.location.LocationEngineRequest): void;
					public setLocationEngine(param0: com.mapbox.android.core.location.LocationEngine): void;
					public getRenderMode(): number;
					public addOnRenderModeChangedListener(param0: com.mapbox.mapboxsdk.location.OnRenderModeChangedListener): void;
					public setCameraMode(param0: number, param1: com.mapbox.mapboxsdk.location.OnLocationCameraTransitionListener): void;
					public tiltWhileTracking(param0: number): void;
					/** @deprecated */
					public activateLocationComponent(param0: globalAndroid.content.Context, param1: com.mapbox.mapboxsdk.maps.Style, param2: boolean): void;
					public getLocationEngineRequest(): com.mapbox.android.core.location.LocationEngineRequest;
					/** @deprecated */
					public activateLocationComponent(param0: globalAndroid.content.Context, param1: com.mapbox.mapboxsdk.maps.Style, param2: com.mapbox.android.core.location.LocationEngine, param3: com.mapbox.mapboxsdk.location.LocationComponentOptions): void;
					public addOnLocationClickListener(param0: com.mapbox.mapboxsdk.location.OnLocationClickListener): void;
					public setCameraMode(param0: number, param1: number, param2: java.lang.Double, param3: java.lang.Double, param4: java.lang.Double, param5: com.mapbox.mapboxsdk.location.OnLocationCameraTransitionListener): void;
					public removeOnLocationClickListener(param0: com.mapbox.mapboxsdk.location.OnLocationClickListener): void;
					public tiltWhileTracking(param0: number, param1: number, param2: com.mapbox.mapboxsdk.maps.MapboxMap.CancelableCallback): void;
					/** @deprecated */
					public activateLocationComponent(param0: globalAndroid.content.Context, param1: com.mapbox.mapboxsdk.maps.Style, param2: com.mapbox.android.core.location.LocationEngine): void;
					public onFinishLoadingStyle(): void;
					/** @deprecated */
					public activateLocationComponent(param0: globalAndroid.content.Context, param1: com.mapbox.mapboxsdk.maps.Style, param2: com.mapbox.android.core.location.LocationEngine, param3: com.mapbox.android.core.location.LocationEngineRequest, param4: number): void;
					public addOnLocationLongClickListener(param0: com.mapbox.mapboxsdk.location.OnLocationLongClickListener): void;
					public onStartLoadingMap(): void;
					public isLocationComponentActivated(): boolean;
					public getLastKnownLocation(): globalAndroid.location.Location;
					public cancelTiltWhileTrackingAnimation(): void;
					public applyStyle(param0: globalAndroid.content.Context, param1: number): void;
					public setLocationComponentEnabled(param0: boolean): void;
					public setMaxAnimationFps(param0: number): void;
					public setCompassEngine(param0: com.mapbox.mapboxsdk.location.CompassEngine): void;
					public activateLocationComponent(param0: com.mapbox.mapboxsdk.location.LocationComponentActivationOptions): void;
					/** @deprecated */
					public activateLocationComponent(param0: globalAndroid.content.Context, param1: com.mapbox.mapboxsdk.maps.Style, param2: com.mapbox.android.core.location.LocationEngine, param3: com.mapbox.android.core.location.LocationEngineRequest): void;
					public addOnCameraTrackingChangedListener(param0: com.mapbox.mapboxsdk.location.OnCameraTrackingChangedListener): void;
					public tiltWhileTracking(param0: number, param1: number): void;
					public getLocationComponentOptions(): com.mapbox.mapboxsdk.location.LocationComponentOptions;
					public addOnLocationStaleListener(param0: com.mapbox.mapboxsdk.location.OnLocationStaleListener): void;
					/** @deprecated */
					public activateLocationComponent(param0: globalAndroid.content.Context, param1: com.mapbox.mapboxsdk.maps.Style, param2: com.mapbox.android.core.location.LocationEngine, param3: number): void;
					public zoomWhileTracking(param0: number): void;
					/** @deprecated */
					public activateLocationComponent(param0: globalAndroid.content.Context, param1: com.mapbox.mapboxsdk.maps.Style, param2: boolean, param3: com.mapbox.android.core.location.LocationEngineRequest, param4: com.mapbox.mapboxsdk.location.LocationComponentOptions): void;
					public getCompassEngine(): com.mapbox.mapboxsdk.location.CompassEngine;
					/** @deprecated */
					public activateLocationComponent(param0: globalAndroid.content.Context, param1: com.mapbox.mapboxsdk.maps.Style, param2: com.mapbox.mapboxsdk.location.LocationComponentOptions): void;
					public onStop(): void;
					public setRenderMode(param0: number): void;
				}
				export module LocationComponent {
					export class CameraTransitionListener extends java.lang.Object implements com.mapbox.mapboxsdk.location.OnLocationCameraTransitionListener {
						public static class: java.lang.Class<com.mapbox.mapboxsdk.location.LocationComponent.CameraTransitionListener>;
						public onLocationCameraTransitionCanceled(param0: number): void;
						public onLocationCameraTransitionFinished(param0: number): void;
					}
					export class CurrentLocationEngineCallback extends com.mapbox.android.core.location.LocationEngineCallback<com.mapbox.android.core.location.LocationEngineResult> {
						public static class: java.lang.Class<com.mapbox.mapboxsdk.location.LocationComponent.CurrentLocationEngineCallback>;
						public onFailure(param0: java.lang.Exception): void;
						public onSuccess(param0: any): void;
						public onSuccess(param0: com.mapbox.android.core.location.LocationEngineResult): void;
					}
					export class InternalLocationEngineProvider extends java.lang.Object {
						public static class: java.lang.Class<com.mapbox.mapboxsdk.location.LocationComponent.InternalLocationEngineProvider>;
					}
					export class LastLocationEngineCallback extends com.mapbox.android.core.location.LocationEngineCallback<com.mapbox.android.core.location.LocationEngineResult> {
						public static class: java.lang.Class<com.mapbox.mapboxsdk.location.LocationComponent.LastLocationEngineCallback>;
						public onFailure(param0: java.lang.Exception): void;
						public onSuccess(param0: any): void;
						public onSuccess(param0: com.mapbox.android.core.location.LocationEngineResult): void;
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export module location {
				export class LocationComponentActivationOptions extends java.lang.Object {
					public static class: java.lang.Class<com.mapbox.mapboxsdk.location.LocationComponentActivationOptions>;
					public context(): globalAndroid.content.Context;
					public locationEngine(): com.mapbox.android.core.location.LocationEngine;
					public locationEngineRequest(): com.mapbox.android.core.location.LocationEngineRequest;
					public style(): com.mapbox.mapboxsdk.maps.Style;
					public static builder(param0: globalAndroid.content.Context, param1: com.mapbox.mapboxsdk.maps.Style): com.mapbox.mapboxsdk.location.LocationComponentActivationOptions.Builder;
					public useDefaultLocationEngine(): boolean;
					public styleRes(): number;
					public locationComponentOptions(): com.mapbox.mapboxsdk.location.LocationComponentOptions;
				}
				export module LocationComponentActivationOptions {
					export class Builder extends java.lang.Object {
						public static class: java.lang.Class<com.mapbox.mapboxsdk.location.LocationComponentActivationOptions.Builder>;
						public build(): com.mapbox.mapboxsdk.location.LocationComponentActivationOptions;
						public locationComponentOptions(param0: com.mapbox.mapboxsdk.location.LocationComponentOptions): com.mapbox.mapboxsdk.location.LocationComponentActivationOptions.Builder;
						public locationEngine(param0: com.mapbox.android.core.location.LocationEngine): com.mapbox.mapboxsdk.location.LocationComponentActivationOptions.Builder;
						public styleRes(param0: number): com.mapbox.mapboxsdk.location.LocationComponentActivationOptions.Builder;
						public useDefaultLocationEngine(param0: boolean): com.mapbox.mapboxsdk.location.LocationComponentActivationOptions.Builder;
						public constructor(param0: globalAndroid.content.Context, param1: com.mapbox.mapboxsdk.maps.Style);
						public locationEngineRequest(param0: com.mapbox.android.core.location.LocationEngineRequest): com.mapbox.mapboxsdk.location.LocationComponentActivationOptions.Builder;
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export module location {
				export class LocationComponentCompassEngine extends java.lang.Object implements com.mapbox.mapboxsdk.location.CompassEngine, globalAndroid.hardware.SensorEventListener {
					public static class: java.lang.Class<com.mapbox.mapboxsdk.location.LocationComponentCompassEngine>;
					public removeCompassListener(param0: com.mapbox.mapboxsdk.location.CompassListener): void;
					public onSensorChanged(param0: globalAndroid.hardware.SensorEvent): void;
					public onAccuracyChanged(param0: globalAndroid.hardware.Sensor, param1: number): void;
					public getLastHeading(): number;
					public getLastAccuracySensorStatus(): number;
					public addCompassListener(param0: com.mapbox.mapboxsdk.location.CompassListener): void;
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export module location {
				export class LocationComponentConstants extends java.lang.Object {
					public static class: java.lang.Class<com.mapbox.mapboxsdk.location.LocationComponentConstants>;
					public static LOCATION_SOURCE: string;
					public static SHADOW_LAYER: string;
					public static FOREGROUND_LAYER: string;
					public static BACKGROUND_LAYER: string;
					public static ACCURACY_LAYER: string;
					public static BEARING_LAYER: string;
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export module location {
				export class LocationComponentNotInitializedException extends java.lang.RuntimeException {
					public static class: java.lang.Class<com.mapbox.mapboxsdk.location.LocationComponentNotInitializedException>;
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export module location {
				export class LocationComponentOptions extends java.lang.Object implements globalAndroid.os.Parcelable {
					public static class: java.lang.Class<com.mapbox.mapboxsdk.location.LocationComponentOptions>;
					public static CREATOR: globalAndroid.os.Parcelable.Creator<com.mapbox.mapboxsdk.location.LocationComponentOptions>;
					public foregroundName(): string;
					public compassAnimationEnabled(): boolean;
					public accuracyColor(): number;
					public gpsDrawable(): number;
					public bearingName(): string;
					public minZoomIconScale(): number;
					public layerBelow(): string;
					public enableStaleState(): boolean;
					public trackingInitialMoveThreshold(): number;
					public toString(): string;
					public accuracyAlpha(): number;
					public backgroundName(): string;
					public foregroundStaleName(): string;
					public gpsName(): string;
					public backgroundDrawable(): number;
					public hashCode(): number;
					public bearingTintColor(): java.lang.Integer;
					public constructor(param0: number, param1: number, param2: number, param3: string, param4: number, param5: string, param6: number, param7: string, param8: number, param9: string, param10: number, param11: string, param12: number, param13: string, param14: java.lang.Integer, param15: java.lang.Integer, param16: java.lang.Integer, param17: java.lang.Integer, param18: java.lang.Integer, param19: number, param20: boolean, param21: number, param22: native.Array<number>, param23: number, param24: number, param25: boolean, param26: number, param27: number, param28: string, param29: string, param30: number, param31: boolean, param32: boolean);
					public trackingMultiFingerMoveThreshold(): number;
					public backgroundStaleName(): string;
					public staleStateTimeout(): number;
					public trackingGesturesManagement(): boolean;
					public describeContents(): number;
					public static createFromAttributes(param0: globalAndroid.content.Context, param1: number): com.mapbox.mapboxsdk.location.LocationComponentOptions;
					public foregroundDrawableStale(): number;
					public accuracyAnimationEnabled(): boolean;
					public toBuilder(): com.mapbox.mapboxsdk.location.LocationComponentOptions.Builder;
					public backgroundDrawableStale(): number;
					public trackingAnimationDurationMultiplier(): number;
					public equals(param0: any): boolean;
					public foregroundTintColor(): java.lang.Integer;
					public foregroundStaleTintColor(): java.lang.Integer;
					public backgroundStaleTintColor(): java.lang.Integer;
					public elevation(): number;
					public static builder(param0: globalAndroid.content.Context): com.mapbox.mapboxsdk.location.LocationComponentOptions.Builder;
					public maxZoomIconScale(): number;
					public bearingDrawable(): number;
					public layerAbove(): string;
					public writeToParcel(param0: globalAndroid.os.Parcel, param1: number): void;
					public padding(): native.Array<number>;
					public foregroundDrawable(): number;
					public backgroundTintColor(): java.lang.Integer;
				}
				export module LocationComponentOptions {
					export class Builder extends java.lang.Object {
						public static class: java.lang.Class<com.mapbox.mapboxsdk.location.LocationComponentOptions.Builder>;
						public backgroundName(param0: string): com.mapbox.mapboxsdk.location.LocationComponentOptions.Builder;
						public foregroundDrawableStale(param0: number): com.mapbox.mapboxsdk.location.LocationComponentOptions.Builder;
						public layerAbove(param0: string): com.mapbox.mapboxsdk.location.LocationComponentOptions.Builder;
						public minZoomIconScale(param0: number): com.mapbox.mapboxsdk.location.LocationComponentOptions.Builder;
						public backgroundDrawable(param0: number): com.mapbox.mapboxsdk.location.LocationComponentOptions.Builder;
						public bearingDrawable(param0: number): com.mapbox.mapboxsdk.location.LocationComponentOptions.Builder;
						public trackingInitialMoveThreshold(param0: number): com.mapbox.mapboxsdk.location.LocationComponentOptions.Builder;
						public compassAnimationEnabled(param0: java.lang.Boolean): com.mapbox.mapboxsdk.location.LocationComponentOptions.Builder;
						public elevation(param0: number): com.mapbox.mapboxsdk.location.LocationComponentOptions.Builder;
						public trackingMultiFingerMoveThreshold(param0: number): com.mapbox.mapboxsdk.location.LocationComponentOptions.Builder;
						public accuracyColor(param0: number): com.mapbox.mapboxsdk.location.LocationComponentOptions.Builder;
						public foregroundTintColor(param0: java.lang.Integer): com.mapbox.mapboxsdk.location.LocationComponentOptions.Builder;
						public foregroundStaleName(param0: string): com.mapbox.mapboxsdk.location.LocationComponentOptions.Builder;
						public gpsName(param0: string): com.mapbox.mapboxsdk.location.LocationComponentOptions.Builder;
						public bearingName(param0: string): com.mapbox.mapboxsdk.location.LocationComponentOptions.Builder;
						public bearingTintColor(param0: java.lang.Integer): com.mapbox.mapboxsdk.location.LocationComponentOptions.Builder;
						public trackingGesturesManagement(param0: boolean): com.mapbox.mapboxsdk.location.LocationComponentOptions.Builder;
						public backgroundStaleTintColor(param0: java.lang.Integer): com.mapbox.mapboxsdk.location.LocationComponentOptions.Builder;
						public backgroundTintColor(param0: java.lang.Integer): com.mapbox.mapboxsdk.location.LocationComponentOptions.Builder;
						public accuracyAnimationEnabled(param0: java.lang.Boolean): com.mapbox.mapboxsdk.location.LocationComponentOptions.Builder;
						public enableStaleState(param0: boolean): com.mapbox.mapboxsdk.location.LocationComponentOptions.Builder;
						public build(): com.mapbox.mapboxsdk.location.LocationComponentOptions;
						public foregroundStaleTintColor(param0: java.lang.Integer): com.mapbox.mapboxsdk.location.LocationComponentOptions.Builder;
						public maxZoomIconScale(param0: number): com.mapbox.mapboxsdk.location.LocationComponentOptions.Builder;
						/** @deprecated */
						public padding(param0: native.Array<number>): com.mapbox.mapboxsdk.location.LocationComponentOptions.Builder;
						public backgroundDrawableStale(param0: number): com.mapbox.mapboxsdk.location.LocationComponentOptions.Builder;
						public foregroundDrawable(param0: number): com.mapbox.mapboxsdk.location.LocationComponentOptions.Builder;
						public gpsDrawable(param0: number): com.mapbox.mapboxsdk.location.LocationComponentOptions.Builder;
						public trackingAnimationDurationMultiplier(param0: number): com.mapbox.mapboxsdk.location.LocationComponentOptions.Builder;
						public layerBelow(param0: string): com.mapbox.mapboxsdk.location.LocationComponentOptions.Builder;
						public foregroundName(param0: string): com.mapbox.mapboxsdk.location.LocationComponentOptions.Builder;
						public backgroundStaleName(param0: string): com.mapbox.mapboxsdk.location.LocationComponentOptions.Builder;
						public staleStateTimeout(param0: number): com.mapbox.mapboxsdk.location.LocationComponentOptions.Builder;
						public accuracyAlpha(param0: number): com.mapbox.mapboxsdk.location.LocationComponentOptions.Builder;
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export module location {
				export class LocationComponentPositionManager extends java.lang.Object {
					public static class: java.lang.Class<com.mapbox.mapboxsdk.location.LocationComponentPositionManager>;
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export module location {
				export class LocationLayerController extends java.lang.Object {
					public static class: java.lang.Class<com.mapbox.mapboxsdk.location.LocationLayerController>;
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export module location {
				export abstract class MapboxAnimator<K>  extends globalAndroid.animation.ValueAnimator implements globalAndroid.animation.ValueAnimator.AnimatorUpdateListener  {
					public static class: java.lang.Class<com.mapbox.mapboxsdk.location.MapboxAnimator<any>>;
					public onAnimationUpdate(param0: globalAndroid.animation.ValueAnimator): void;
				}
				export module MapboxAnimator {
					export class AnimationsValueChangeListener<K>  extends java.lang.Object {
						public static class: java.lang.Class<com.mapbox.mapboxsdk.location.MapboxAnimator.AnimationsValueChangeListener<any>>;
						/**
						 * Constructs a new instance of the com.mapbox.mapboxsdk.location.MapboxAnimator$AnimationsValueChangeListener interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
						 */
						public constructor(implementation: {
							onNewAnimationValue(param0: K): void;
						});
						public constructor();
						public onNewAnimationValue(param0: K): void;
					}
					export class AnimatorListener extends globalAndroid.animation.AnimatorListenerAdapter {
						public static class: java.lang.Class<com.mapbox.mapboxsdk.location.MapboxAnimator.AnimatorListener>;
						public onAnimationEnd(param0: globalAndroid.animation.Animator): void;
						public onAnimationResume(param0: globalAndroid.animation.Animator): void;
						public onAnimationRepeat(param0: globalAndroid.animation.Animator): void;
						public onAnimationPause(param0: globalAndroid.animation.Animator): void;
						public onAnimationStart(param0: globalAndroid.animation.Animator): void;
						public onAnimationCancel(param0: globalAndroid.animation.Animator): void;
						public onAnimationStart(param0: globalAndroid.animation.Animator, param1: boolean): void;
						public onAnimationEnd(param0: globalAndroid.animation.Animator, param1: boolean): void;
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export module location {
				export class MapboxAnimatorProvider extends java.lang.Object {
					public static class: java.lang.Class<com.mapbox.mapboxsdk.location.MapboxAnimatorProvider>;
					public static getInstance(): com.mapbox.mapboxsdk.location.MapboxAnimatorProvider;
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export module location {
				export class MapboxAnimatorSetProvider extends java.lang.Object {
					public static class: java.lang.Class<com.mapbox.mapboxsdk.location.MapboxAnimatorSetProvider>;
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export module location {
				export class MapboxCameraAnimatorAdapter extends com.mapbox.mapboxsdk.location.MapboxFloatAnimator {
					public static class: java.lang.Class<com.mapbox.mapboxsdk.location.MapboxCameraAnimatorAdapter>;
					public onAnimationUpdate(param0: globalAndroid.animation.ValueAnimator): void;
				}
				export module MapboxCameraAnimatorAdapter {
					export class MapboxAnimatorListener extends globalAndroid.animation.AnimatorListenerAdapter {
						public static class: java.lang.Class<com.mapbox.mapboxsdk.location.MapboxCameraAnimatorAdapter.MapboxAnimatorListener>;
						public onAnimationEnd(param0: globalAndroid.animation.Animator): void;
						public onAnimationResume(param0: globalAndroid.animation.Animator): void;
						public onAnimationRepeat(param0: globalAndroid.animation.Animator): void;
						public onAnimationPause(param0: globalAndroid.animation.Animator): void;
						public onAnimationCancel(param0: globalAndroid.animation.Animator): void;
						public onAnimationStart(param0: globalAndroid.animation.Animator): void;
						public onAnimationStart(param0: globalAndroid.animation.Animator, param1: boolean): void;
						public onAnimationEnd(param0: globalAndroid.animation.Animator, param1: boolean): void;
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export module location {
				export class MapboxFloatAnimator extends com.mapbox.mapboxsdk.location.MapboxAnimator<java.lang.Float> {
					public static class: java.lang.Class<com.mapbox.mapboxsdk.location.MapboxFloatAnimator>;
					public onAnimationUpdate(param0: globalAndroid.animation.ValueAnimator): void;
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export module location {
				export class MapboxLatLngAnimator extends com.mapbox.mapboxsdk.location.MapboxAnimator<com.mapbox.mapboxsdk.geometry.LatLng> {
					public static class: java.lang.Class<com.mapbox.mapboxsdk.location.MapboxLatLngAnimator>;
					public onAnimationUpdate(param0: globalAndroid.animation.ValueAnimator): void;
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export module location {
				export class OnCameraMoveInvalidateListener extends java.lang.Object {
					public static class: java.lang.Class<com.mapbox.mapboxsdk.location.OnCameraMoveInvalidateListener>;
					/**
					 * Constructs a new instance of the com.mapbox.mapboxsdk.location.OnCameraMoveInvalidateListener interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
					 */
					public constructor(implementation: {
						onInvalidateCameraMove(): void;
					});
					public constructor();
					public onInvalidateCameraMove(): void;
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export module location {
				export class OnCameraTrackingChangedListener extends java.lang.Object {
					public static class: java.lang.Class<com.mapbox.mapboxsdk.location.OnCameraTrackingChangedListener>;
					/**
					 * Constructs a new instance of the com.mapbox.mapboxsdk.location.OnCameraTrackingChangedListener interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
					 */
					public constructor(implementation: {
						onCameraTrackingDismissed(): void;
						onCameraTrackingChanged(param0: number): void;
					});
					public constructor();
					public onCameraTrackingChanged(param0: number): void;
					public onCameraTrackingDismissed(): void;
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export module location {
				export class OnLocationCameraTransitionListener extends java.lang.Object {
					public static class: java.lang.Class<com.mapbox.mapboxsdk.location.OnLocationCameraTransitionListener>;
					/**
					 * Constructs a new instance of the com.mapbox.mapboxsdk.location.OnLocationCameraTransitionListener interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
					 */
					public constructor(implementation: {
						onLocationCameraTransitionFinished(param0: number): void;
						onLocationCameraTransitionCanceled(param0: number): void;
					});
					public constructor();
					public onLocationCameraTransitionFinished(param0: number): void;
					public onLocationCameraTransitionCanceled(param0: number): void;
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export module location {
				export class OnLocationClickListener extends java.lang.Object {
					public static class: java.lang.Class<com.mapbox.mapboxsdk.location.OnLocationClickListener>;
					/**
					 * Constructs a new instance of the com.mapbox.mapboxsdk.location.OnLocationClickListener interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
					 */
					public constructor(implementation: {
						onLocationComponentClick(): void;
					});
					public constructor();
					public onLocationComponentClick(): void;
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export module location {
				export class OnLocationLongClickListener extends java.lang.Object {
					public static class: java.lang.Class<com.mapbox.mapboxsdk.location.OnLocationLongClickListener>;
					/**
					 * Constructs a new instance of the com.mapbox.mapboxsdk.location.OnLocationLongClickListener interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
					 */
					public constructor(implementation: {
						onLocationComponentLongClick(): void;
					});
					public constructor();
					public onLocationComponentLongClick(): void;
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export module location {
				export class OnLocationStaleListener extends java.lang.Object {
					public static class: java.lang.Class<com.mapbox.mapboxsdk.location.OnLocationStaleListener>;
					/**
					 * Constructs a new instance of the com.mapbox.mapboxsdk.location.OnLocationStaleListener interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
					 */
					public constructor(implementation: {
						onStaleStateChange(param0: boolean): void;
					});
					public constructor();
					public onStaleStateChange(param0: boolean): void;
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export module location {
				export class OnRenderModeChangedListener extends java.lang.Object {
					public static class: java.lang.Class<com.mapbox.mapboxsdk.location.OnRenderModeChangedListener>;
					/**
					 * Constructs a new instance of the com.mapbox.mapboxsdk.location.OnRenderModeChangedListener interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
					 */
					public constructor(implementation: {
						onRenderModeChanged(param0: number): void;
					});
					public constructor();
					public onRenderModeChanged(param0: number): void;
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export module location {
				export class StaleStateManager extends java.lang.Object {
					public static class: java.lang.Class<com.mapbox.mapboxsdk.location.StaleStateManager>;
				}
				export module StaleStateManager {
					export class StaleMessageHandler extends globalAndroid.os.Handler {
						public static class: java.lang.Class<com.mapbox.mapboxsdk.location.StaleStateManager.StaleMessageHandler>;
						public handleMessage(param0: globalAndroid.os.Message): void;
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export module location {
				export class Utils extends java.lang.Object {
					public static class: java.lang.Class<com.mapbox.mapboxsdk.location.Utils>;
					public static normalize(param0: number): number;
					public static shortestRotation(param0: number, param1: number): number;
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export module location {
				export module modes {
					export class CameraMode extends java.lang.Object {
						public static class: java.lang.Class<com.mapbox.mapboxsdk.location.modes.CameraMode>;
						public static NONE: number;
						public static NONE_COMPASS: number;
						public static NONE_GPS: number;
						public static TRACKING: number;
						public static TRACKING_COMPASS: number;
						public static TRACKING_GPS: number;
						public static TRACKING_GPS_NORTH: number;
					}
					export module CameraMode {
						export class Mode extends java.lang.Object implements java.lang.annotation.Annotation {
							public static class: java.lang.Class<com.mapbox.mapboxsdk.location.modes.CameraMode.Mode>;
							/**
							 * Constructs a new instance of the com.mapbox.mapboxsdk.location.modes.CameraMode$Mode interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
							 */
							public constructor(implementation: {
								equals(param0: any): boolean;
								hashCode(): number;
								toString(): string;
								annotationType(): java.lang.Class<any>;
							});
							public constructor();
							public hashCode(): number;
							public annotationType(): java.lang.Class<any>;
							public toString(): string;
							public equals(param0: any): boolean;
						}
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export module location {
				export module modes {
					export class RenderMode extends java.lang.Object {
						public static class: java.lang.Class<com.mapbox.mapboxsdk.location.modes.RenderMode>;
						public static NORMAL: number;
						public static COMPASS: number;
						public static GPS: number;
					}
					export module RenderMode {
						export class Mode extends java.lang.Object implements java.lang.annotation.Annotation {
							public static class: java.lang.Class<com.mapbox.mapboxsdk.location.modes.RenderMode.Mode>;
							/**
							 * Constructs a new instance of the com.mapbox.mapboxsdk.location.modes.RenderMode$Mode interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
							 */
							public constructor(implementation: {
								equals(param0: any): boolean;
								hashCode(): number;
								toString(): string;
								annotationType(): java.lang.Class<any>;
							});
							public constructor();
							public hashCode(): number;
							public annotationType(): java.lang.Class<any>;
							public toString(): string;
							public equals(param0: any): boolean;
						}
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export module log {
				export class Logger extends java.lang.Object {
					public static class: java.lang.Class<com.mapbox.mapboxsdk.log.Logger>;
					public static VERBOSE: number;
					public static DEBUG: number;
					public static INFO: number;
					public static WARN: number;
					public static ERROR: number;
					public static NONE: number;
					public static i(param0: string, param1: string): void;
					public static d(param0: string, param1: string, param2: java.lang.Throwable): void;
					public static e(param0: string, param1: string): void;
					public static log(param0: number, param1: string, param2: string): void;
					public static setVerbosity(param0: number): void;
					public static v(param0: string, param1: string, param2: java.lang.Throwable): void;
					public static setLoggerDefinition(param0: com.mapbox.mapboxsdk.log.LoggerDefinition): void;
					public static e(param0: string, param1: string, param2: java.lang.Throwable): void;
					public constructor();
					public static d(param0: string, param1: string): void;
					public static w(param0: string, param1: string, param2: java.lang.Throwable): void;
					public static v(param0: string, param1: string): void;
					public static w(param0: string, param1: string): void;
					public static i(param0: string, param1: string, param2: java.lang.Throwable): void;
				}
				export module Logger {
					export class LogLevel extends java.lang.Object implements java.lang.annotation.Annotation {
						public static class: java.lang.Class<com.mapbox.mapboxsdk.log.Logger.LogLevel>;
						/**
						 * Constructs a new instance of the com.mapbox.mapboxsdk.log.Logger$LogLevel interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
						 */
						public constructor(implementation: {
							equals(param0: any): boolean;
							hashCode(): number;
							toString(): string;
							annotationType(): java.lang.Class<any>;
						});
						public constructor();
						public equals(param0: any): boolean;
						public hashCode(): number;
						public toString(): string;
						public annotationType(): java.lang.Class<any>;
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export module log {
				export class LoggerDefinition extends java.lang.Object {
					public static class: java.lang.Class<com.mapbox.mapboxsdk.log.LoggerDefinition>;
					/**
					 * Constructs a new instance of the com.mapbox.mapboxsdk.log.LoggerDefinition interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
					 */
					public constructor(implementation: {
						v(param0: string, param1: string): void;
						v(param0: string, param1: string, param2: java.lang.Throwable): void;
						d(param0: string, param1: string): void;
						d(param0: string, param1: string, param2: java.lang.Throwable): void;
						i(param0: string, param1: string): void;
						i(param0: string, param1: string, param2: java.lang.Throwable): void;
						w(param0: string, param1: string): void;
						w(param0: string, param1: string, param2: java.lang.Throwable): void;
						e(param0: string, param1: string): void;
						e(param0: string, param1: string, param2: java.lang.Throwable): void;
					});
					public constructor();
					public d(param0: string, param1: string): void;
					public e(param0: string, param1: string): void;
					public i(param0: string, param1: string, param2: java.lang.Throwable): void;
					public i(param0: string, param1: string): void;
					public w(param0: string, param1: string): void;
					public v(param0: string, param1: string): void;
					public v(param0: string, param1: string, param2: java.lang.Throwable): void;
					public e(param0: string, param1: string, param2: java.lang.Throwable): void;
					public d(param0: string, param1: string, param2: java.lang.Throwable): void;
					public w(param0: string, param1: string, param2: java.lang.Throwable): void;
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export module maps {
				export class AnnotationContainer extends java.lang.Object implements com.mapbox.mapboxsdk.maps.Annotations {
					public static class: java.lang.Class<com.mapbox.mapboxsdk.maps.AnnotationContainer>;
					public removeBy(param0: number): void;
					public removeBy(param0: java.util.List<any>): void;
					public removeAll(): void;
					public obtainBy(param0: number): com.mapbox.mapboxsdk.annotations.Annotation;
					public obtainAll(): java.util.List<com.mapbox.mapboxsdk.annotations.Annotation>;
					public removeBy(param0: com.mapbox.mapboxsdk.annotations.Annotation): void;
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export module maps {
				export class AnnotationManager extends java.lang.Object {
					public static class: java.lang.Class<com.mapbox.mapboxsdk.maps.AnnotationManager>;
				}
				export module AnnotationManager {
					export class MarkerHit extends java.lang.Object {
						public static class: java.lang.Class<com.mapbox.mapboxsdk.maps.AnnotationManager.MarkerHit>;
					}
					export class MarkerHitResolver extends java.lang.Object {
						public static class: java.lang.Class<com.mapbox.mapboxsdk.maps.AnnotationManager.MarkerHitResolver>;
						public execute(param0: com.mapbox.mapboxsdk.maps.AnnotationManager.MarkerHit): number;
					}
					export class ShapeAnnotationHit extends java.lang.Object {
						public static class: java.lang.Class<com.mapbox.mapboxsdk.maps.AnnotationManager.ShapeAnnotationHit>;
					}
					export class ShapeAnnotationHitResolver extends java.lang.Object {
						public static class: java.lang.Class<com.mapbox.mapboxsdk.maps.AnnotationManager.ShapeAnnotationHitResolver>;
						public execute(param0: com.mapbox.mapboxsdk.maps.AnnotationManager.ShapeAnnotationHit): com.mapbox.mapboxsdk.annotations.Annotation;
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export module maps {
				export class Annotations extends java.lang.Object {
					public static class: java.lang.Class<com.mapbox.mapboxsdk.maps.Annotations>;
					/**
					 * Constructs a new instance of the com.mapbox.mapboxsdk.maps.Annotations interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
					 */
					public constructor(implementation: {
						obtainBy(param0: number): com.mapbox.mapboxsdk.annotations.Annotation;
						obtainAll(): java.util.List<com.mapbox.mapboxsdk.annotations.Annotation>;
						removeBy(param0: number): void;
						removeBy(param0: com.mapbox.mapboxsdk.annotations.Annotation): void;
						removeBy(param0: java.util.List<any>): void;
						removeAll(): void;
					});
					public constructor();
					public removeBy(param0: number): void;
					public removeBy(param0: java.util.List<any>): void;
					public removeAll(): void;
					public obtainBy(param0: number): com.mapbox.mapboxsdk.annotations.Annotation;
					public obtainAll(): java.util.List<com.mapbox.mapboxsdk.annotations.Annotation>;
					public removeBy(param0: com.mapbox.mapboxsdk.annotations.Annotation): void;
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export module maps {
				export class AttributionDialogManager extends java.lang.Object implements globalAndroid.view.View.OnClickListener, globalAndroid.content.DialogInterface.OnClickListener {
					public static class: java.lang.Class<com.mapbox.mapboxsdk.maps.AttributionDialogManager>;
					public constructor(param0: globalAndroid.content.Context, param1: com.mapbox.mapboxsdk.maps.MapboxMap);
					public showAttributionDialog(param0: native.Array<string>): void;
					public onClick(param0: globalAndroid.content.DialogInterface, param1: number): void;
					public onClick(param0: globalAndroid.view.View): void;
					public onStop(): void;
				}
				export module AttributionDialogManager {
					export class AttributionBuilder extends java.lang.Object {
						public static class: java.lang.Class<com.mapbox.mapboxsdk.maps.AttributionDialogManager.AttributionBuilder>;
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export module maps {
				export class CameraChangeDispatcher extends java.lang.Object implements com.mapbox.mapboxsdk.maps.MapboxMap.OnCameraMoveStartedListener, com.mapbox.mapboxsdk.maps.MapboxMap.OnCameraMoveListener, com.mapbox.mapboxsdk.maps.MapboxMap.OnCameraMoveCanceledListener, com.mapbox.mapboxsdk.maps.MapboxMap.OnCameraIdleListener {
					public static class: java.lang.Class<com.mapbox.mapboxsdk.maps.CameraChangeDispatcher>;
					public onCameraMoveCanceled(): void;
					public onCameraMove(): void;
					public onCameraIdle(): void;
					public onCameraMoveStarted(param0: number): void;
				}
				export module CameraChangeDispatcher {
					export class CameraChangeHandler extends globalAndroid.os.Handler {
						public static class: java.lang.Class<com.mapbox.mapboxsdk.maps.CameraChangeDispatcher.CameraChangeHandler>;
						public handleMessage(param0: globalAndroid.os.Message): void;
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export module maps {
				export class FocalPointChangeListener extends java.lang.Object {
					public static class: java.lang.Class<com.mapbox.mapboxsdk.maps.FocalPointChangeListener>;
					/**
					 * Constructs a new instance of the com.mapbox.mapboxsdk.maps.FocalPointChangeListener interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
					 */
					public constructor(implementation: {
						onFocalPointChanged(param0: globalAndroid.graphics.PointF): void;
					});
					public constructor();
					public onFocalPointChanged(param0: globalAndroid.graphics.PointF): void;
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export module maps {
				export class IconManager extends java.lang.Object {
					public static class: java.lang.Class<com.mapbox.mapboxsdk.maps.IconManager>;
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export module maps {
				export class Image extends java.lang.Object {
					public static class: java.lang.Class<com.mapbox.mapboxsdk.maps.Image>;
					public constructor(param0: native.Array<number>, param1: number, param2: string, param3: number, param4: number, param5: boolean);
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export module maps {
				export class InfoWindowManager extends java.lang.Object {
					public static class: java.lang.Class<com.mapbox.mapboxsdk.maps.InfoWindowManager>;
					public add(param0: com.mapbox.mapboxsdk.annotations.InfoWindow): void;
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export module maps {
				export class MapChangeReceiver extends java.lang.Object implements com.mapbox.mapboxsdk.maps.NativeMapView.StateCallback {
					public static class: java.lang.Class<com.mapbox.mapboxsdk.maps.MapChangeReceiver>;
					public onWillStartRenderingFrame(): void;
					public onDidBecomeIdle(): void;
					public onSourceChanged(param0: string): void;
					public onDidFinishLoadingMap(): void;
					public onDidFinishRenderingFrame(param0: boolean): void;
					public onDidFailLoadingMap(param0: string): void;
					public onCameraWillChange(param0: boolean): void;
					public onDidFinishRenderingMap(param0: boolean): void;
					public onStyleImageMissing(param0: string): void;
					public onDidFinishLoadingStyle(): void;
					public onCameraDidChange(param0: boolean): void;
					public onWillStartRenderingMap(): void;
					public onCameraIsChanging(): void;
					public onCanRemoveUnusedStyleImage(param0: string): boolean;
					public onWillStartLoadingMap(): void;
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export module maps {
				export class MapFragment extends globalAndroid.app.Fragment implements com.mapbox.mapboxsdk.maps.OnMapReadyCallback {
					public static class: java.lang.Class<com.mapbox.mapboxsdk.maps.MapFragment>;
					public onMapReady(param0: com.mapbox.mapboxsdk.maps.MapboxMap): void;
					public onSaveInstanceState(param0: globalAndroid.os.Bundle): void;
					public onAttach(param0: globalAndroid.content.Context): void;
					public onCreateView(param0: globalAndroid.view.LayoutInflater, param1: globalAndroid.view.ViewGroup, param2: globalAndroid.os.Bundle): globalAndroid.view.View;
					public onDestroyView(): void;
					public onInflate(param0: globalAndroid.content.Context, param1: globalAndroid.util.AttributeSet, param2: globalAndroid.os.Bundle): void;
					public onDestroy(): void;
					/** @deprecated */
					public onInflate(param0: globalAndroid.app.Activity, param1: globalAndroid.util.AttributeSet, param2: globalAndroid.os.Bundle): void;
					public onResume(): void;
					public onLowMemory(): void;
					/** @deprecated */
					public onAttach(param0: globalAndroid.app.Activity): void;
					public onStart(): void;
					public getMapAsync(param0: com.mapbox.mapboxsdk.maps.OnMapReadyCallback): void;
					public onTrimMemory(param0: number): void;
					/** @deprecated */
					public onInflate(param0: globalAndroid.util.AttributeSet, param1: globalAndroid.os.Bundle): void;
					public constructor();
					public static newInstance(): com.mapbox.mapboxsdk.maps.MapFragment;
					public onPause(): void;
					public static newInstance(param0: com.mapbox.mapboxsdk.maps.MapboxMapOptions): com.mapbox.mapboxsdk.maps.MapFragment;
					public onStop(): void;
					public onCreateContextMenu(param0: globalAndroid.view.ContextMenu, param1: globalAndroid.view.View, param2: globalAndroid.view.ContextMenu.ContextMenuInfo): void;
					public onViewCreated(param0: globalAndroid.view.View, param1: globalAndroid.os.Bundle): void;
				}
				export module MapFragment {
					export class OnMapViewReadyCallback extends java.lang.Object {
						public static class: java.lang.Class<com.mapbox.mapboxsdk.maps.MapFragment.OnMapViewReadyCallback>;
						/**
						 * Constructs a new instance of the com.mapbox.mapboxsdk.maps.MapFragment$OnMapViewReadyCallback interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
						 */
						public constructor(implementation: {
							onMapViewReady(param0: com.mapbox.mapboxsdk.maps.MapView): void;
						});
						public constructor();
						public onMapViewReady(param0: com.mapbox.mapboxsdk.maps.MapView): void;
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export module maps {
				export class MapGestureDetector extends java.lang.Object {
					public static class: java.lang.Class<com.mapbox.mapboxsdk.maps.MapGestureDetector>;
				}
				export module MapGestureDetector {
					export class MoveGestureListener extends com.mapbox.android.gestures.MoveGestureDetector.SimpleOnMoveGestureListener {
						public static class: java.lang.Class<com.mapbox.mapboxsdk.maps.MapGestureDetector.MoveGestureListener>;
						public onMoveEnd(param0: com.mapbox.android.gestures.MoveGestureDetector, param1: number, param2: number): void;
						public onMove(param0: com.mapbox.android.gestures.MoveGestureDetector, param1: number, param2: number): boolean;
						public onMoveBegin(param0: com.mapbox.android.gestures.MoveGestureDetector): boolean;
					}
					export class RotateGestureListener extends com.mapbox.android.gestures.RotateGestureDetector.SimpleOnRotateGestureListener {
						public static class: java.lang.Class<com.mapbox.mapboxsdk.maps.MapGestureDetector.RotateGestureListener>;
						public onRotateBegin(param0: com.mapbox.android.gestures.RotateGestureDetector): boolean;
						public onRotate(param0: com.mapbox.android.gestures.RotateGestureDetector, param1: number, param2: number): boolean;
						public onRotateEnd(param0: com.mapbox.android.gestures.RotateGestureDetector, param1: number, param2: number, param3: number): void;
					}
					export class ScaleGestureListener extends com.mapbox.android.gestures.StandardScaleGestureDetector.SimpleStandardOnScaleGestureListener {
						public static class: java.lang.Class<com.mapbox.mapboxsdk.maps.MapGestureDetector.ScaleGestureListener>;
						public onScaleEnd(param0: com.mapbox.android.gestures.StandardScaleGestureDetector, param1: number, param2: number): void;
						public onScaleBegin(param0: com.mapbox.android.gestures.StandardScaleGestureDetector): boolean;
						public onScale(param0: com.mapbox.android.gestures.StandardScaleGestureDetector): boolean;
					}
					export class ShoveGestureListener extends com.mapbox.android.gestures.ShoveGestureDetector.SimpleOnShoveGestureListener {
						public static class: java.lang.Class<com.mapbox.mapboxsdk.maps.MapGestureDetector.ShoveGestureListener>;
						public onShove(param0: com.mapbox.android.gestures.ShoveGestureDetector, param1: number, param2: number): boolean;
						public onShoveBegin(param0: com.mapbox.android.gestures.ShoveGestureDetector): boolean;
						public onShoveEnd(param0: com.mapbox.android.gestures.ShoveGestureDetector, param1: number, param2: number): void;
					}
					export class StandardGestureListener extends com.mapbox.android.gestures.StandardGestureDetector.SimpleStandardOnGestureListener {
						public static class: java.lang.Class<com.mapbox.mapboxsdk.maps.MapGestureDetector.StandardGestureListener>;
						public onDown(param0: globalAndroid.view.MotionEvent): boolean;
						public onSingleTapConfirmed(param0: globalAndroid.view.MotionEvent): boolean;
						public onSingleTapUp(param0: globalAndroid.view.MotionEvent): boolean;
						public onDoubleTapEvent(param0: globalAndroid.view.MotionEvent): boolean;
						public onFling(param0: globalAndroid.view.MotionEvent, param1: globalAndroid.view.MotionEvent, param2: number, param3: number): boolean;
						public onLongPress(param0: globalAndroid.view.MotionEvent): void;
					}
					export class TapGestureListener extends java.lang.Object implements com.mapbox.android.gestures.MultiFingerTapGestureDetector.OnMultiFingerTapGestureListener {
						public static class: java.lang.Class<com.mapbox.mapboxsdk.maps.MapGestureDetector.TapGestureListener>;
						public onMultiFingerTap(param0: com.mapbox.android.gestures.MultiFingerTapGestureDetector, param1: number): boolean;
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export module maps {
				export class MapKeyListener extends java.lang.Object {
					public static class: java.lang.Class<com.mapbox.mapboxsdk.maps.MapKeyListener>;
				}
				export module MapKeyListener {
					export class TrackballLongPressTimeOut extends java.lang.Object implements java.lang.Runnable {
						public static class: java.lang.Class<com.mapbox.mapboxsdk.maps.MapKeyListener.TrackballLongPressTimeOut>;
						public run(): void;
						public cancel(): void;
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export module maps {
				export class MapView extends globalAndroid.widget.FrameLayout implements com.mapbox.mapboxsdk.maps.NativeMapView.ViewCallback {
					public static class: java.lang.Class<com.mapbox.mapboxsdk.maps.MapView>;
					public addOnCanRemoveUnusedStyleImageListener(param0: com.mapbox.mapboxsdk.maps.MapView.OnCanRemoveUnusedStyleImageListener): void;
					public removeOnSourceChangedListener(param0: com.mapbox.mapboxsdk.maps.MapView.OnSourceChangedListener): void;
					public createContextMenu(param0: globalAndroid.view.ContextMenu): void;
					public addOnDidBecomeIdleListener(param0: com.mapbox.mapboxsdk.maps.MapView.OnDidBecomeIdleListener): void;
					public onDestroy(): void;
					public isTextDirectionResolved(): boolean;
					public constructor(param0: globalAndroid.content.Context, param1: globalAndroid.util.AttributeSet);
					public onStart(): void;
					public getPixelRatio(): number;
					public removeOnCameraWillChangeListener(param0: com.mapbox.mapboxsdk.maps.MapView.OnCameraWillChangeListener): void;
					public getMapAsync(param0: com.mapbox.mapboxsdk.maps.OnMapReadyCallback): void;
					public onKeyUp(param0: number, param1: globalAndroid.view.KeyEvent): boolean;
					public static setMapStrictModeEnabled(param0: boolean): void;
					public addView(param0: globalAndroid.view.View): void;
					public addView(param0: globalAndroid.view.View, param1: number, param2: globalAndroid.view.ViewGroup.LayoutParams): void;
					public focusSearch(param0: globalAndroid.view.View, param1: number): globalAndroid.view.View;
					public keyboardNavigationClusterSearch(param0: globalAndroid.view.View, param1: number): globalAndroid.view.View;
					public onNestedPreFling(param0: globalAndroid.view.View, param1: number, param2: number): boolean;
					public clearChildFocus(param0: globalAndroid.view.View): void;
					public getLayoutDirection(): number;
					public getChildVisibleRect(param0: globalAndroid.view.View, param1: globalAndroid.graphics.Rect, param2: globalAndroid.graphics.Point): boolean;
					public addOnDidFinishRenderingMapListener(param0: com.mapbox.mapboxsdk.maps.MapView.OnDidFinishRenderingMapListener): void;
					public addOnDidFailLoadingMapListener(param0: com.mapbox.mapboxsdk.maps.MapView.OnDidFailLoadingMapListener): void;
					public removeOnStyleImageMissingListener(param0: com.mapbox.mapboxsdk.maps.MapView.OnStyleImageMissingListener): void;
					public requestTransparentRegion(param0: globalAndroid.view.View): void;
					/** @deprecated */
					public invalidateChildInParent(param0: native.Array<number>, param1: globalAndroid.graphics.Rect): globalAndroid.view.ViewParent;
					public constructor(param0: globalAndroid.content.Context, param1: globalAndroid.util.AttributeSet, param2: number, param3: number);
					public onSaveInstanceState(): globalAndroid.os.Parcelable;
					public removeOnCanRemoveUnusedStyleImageListener(param0: com.mapbox.mapboxsdk.maps.MapView.OnCanRemoveUnusedStyleImageListener): void;
					public addOnCameraIsChangingListener(param0: com.mapbox.mapboxsdk.maps.MapView.OnCameraIsChangingListener): void;
					public removeOnDidFinishRenderingFrameListener(param0: com.mapbox.mapboxsdk.maps.MapView.OnDidFinishRenderingFrameListener): void;
					public getParent(): globalAndroid.view.ViewParent;
					public isTextAlignmentResolved(): boolean;
					public initialize(param0: globalAndroid.content.Context, param1: com.mapbox.mapboxsdk.maps.MapboxMapOptions): void;
					public canResolveTextAlignment(): boolean;
					public childHasTransientStateChanged(param0: globalAndroid.view.View, param1: boolean): void;
					/** @deprecated */
					public requestFitSystemWindows(): void;
					public onNestedFling(param0: globalAndroid.view.View, param1: number, param2: number, param3: boolean): boolean;
					public addOnWillStartRenderingFrameListener(param0: com.mapbox.mapboxsdk.maps.MapView.OnWillStartRenderingFrameListener): void;
					public unscheduleDrawable(param0: globalAndroid.graphics.drawable.Drawable): void;
					public getRenderView(): globalAndroid.view.View;
					public sendAccessibilityEvent(param0: number): void;
					public requestLayout(): void;
					public onSaveInstanceState(param0: globalAndroid.os.Bundle): void;
					public addOnDidFinishLoadingStyleListener(param0: com.mapbox.mapboxsdk.maps.MapView.OnDidFinishLoadingStyleListener): void;
					public getTextAlignment(): number;
					public addOnStyleImageMissingListener(param0: com.mapbox.mapboxsdk.maps.MapView.OnStyleImageMissingListener): void;
					public sendAccessibilityEventUnchecked(param0: globalAndroid.view.accessibility.AccessibilityEvent): void;
					public initialiseCompassView(): com.mapbox.mapboxsdk.maps.widgets.CompassView;
					public constructor(param0: globalAndroid.content.Context);
					public onGenericMotionEvent(param0: globalAndroid.view.MotionEvent): boolean;
					public addOnWillStartRenderingMapListener(param0: com.mapbox.mapboxsdk.maps.MapView.OnWillStartRenderingMapListener): void;
					public onPause(): void;
					public onStop(): void;
					public requestChildRectangleOnScreen(param0: globalAndroid.view.View, param1: globalAndroid.graphics.Rect, param2: boolean): boolean;
					public addOnCameraWillChangeListener(param0: com.mapbox.mapboxsdk.maps.MapView.OnCameraWillChangeListener): void;
					public removeOnDidFinishRenderingMapListener(param0: com.mapbox.mapboxsdk.maps.MapView.OnDidFinishRenderingMapListener): void;
					public focusSearch(param0: number): globalAndroid.view.View;
					public onCreate(param0: globalAndroid.os.Bundle): void;
					public focusableViewAvailable(param0: globalAndroid.view.View): void;
					public addOnSourceChangedListener(param0: com.mapbox.mapboxsdk.maps.MapView.OnSourceChangedListener): void;
					public removeOnDidBecomeIdleListener(param0: com.mapbox.mapboxsdk.maps.MapView.OnDidBecomeIdleListener): void;
					public isLayoutRequested(): boolean;
					public onLowMemory(): void;
					public isLayoutDirectionResolved(): boolean;
					public constructor(param0: globalAndroid.content.Context, param1: com.mapbox.mapboxsdk.maps.MapboxMapOptions);
					public removeOnCameraIsChangingListener(param0: com.mapbox.mapboxsdk.maps.MapView.OnCameraIsChangingListener): void;
					public addView(param0: globalAndroid.view.View, param1: number, param2: number): void;
					public removeOnDidFailLoadingMapListener(param0: com.mapbox.mapboxsdk.maps.MapView.OnDidFailLoadingMapListener): void;
					public recomputeViewAttributes(param0: globalAndroid.view.View): void;
					public onTrackballEvent(param0: globalAndroid.view.MotionEvent): boolean;
					public addOnDidFinishRenderingFrameListener(param0: com.mapbox.mapboxsdk.maps.MapView.OnDidFinishRenderingFrameListener): void;
					public removeOnWillStartRenderingFrameListener(param0: com.mapbox.mapboxsdk.maps.MapView.OnWillStartRenderingFrameListener): void;
					public onNestedScroll(param0: globalAndroid.view.View, param1: number, param2: number, param3: number, param4: number): void;
					/** @deprecated */
					public invalidateChild(param0: globalAndroid.view.View, param1: globalAndroid.graphics.Rect): void;
					public setMaximumFps(param0: number): void;
					public onResume(): void;
					public startActionModeForChild(param0: globalAndroid.view.View, param1: globalAndroid.view.ActionMode.Callback, param2: number): globalAndroid.view.ActionMode;
					public initialiseLogoView(): globalAndroid.widget.ImageView;
					public isDestroyed(): boolean;
					public bringChildToFront(param0: globalAndroid.view.View): void;
					public initialiseAttributionView(): globalAndroid.widget.ImageView;
					public showContextMenuForChild(param0: globalAndroid.view.View, param1: number, param2: number): boolean;
					public unscheduleDrawable(param0: globalAndroid.graphics.drawable.Drawable, param1: java.lang.Runnable): void;
					public onKeyLongPress(param0: number, param1: globalAndroid.view.KeyEvent): boolean;
					public childDrawableStateChanged(param0: globalAndroid.view.View): void;
					public onTouchEvent(param0: globalAndroid.view.MotionEvent): boolean;
					public getTextDirection(): number;
					public scheduleDrawable(param0: globalAndroid.graphics.drawable.Drawable, param1: java.lang.Runnable, param2: number): void;
					public requestFitSystemWindows(): void;
					public notifySubtreeAccessibilityStateChanged(param0: globalAndroid.view.View, param1: globalAndroid.view.View, param2: number): void;
					public startActionModeForChild(param0: globalAndroid.view.View, param1: globalAndroid.view.ActionMode.Callback): globalAndroid.view.ActionMode;
					public addOnWillStartLoadingMapListener(param0: com.mapbox.mapboxsdk.maps.MapView.OnWillStartLoadingMapListener): void;
					public onDescendantInvalidated(param0: globalAndroid.view.View, param1: globalAndroid.view.View): void;
					public canResolveTextDirection(): boolean;
					public updateViewLayout(param0: globalAndroid.view.View, param1: globalAndroid.view.ViewGroup.LayoutParams): void;
					public requestChildFocus(param0: globalAndroid.view.View, param1: globalAndroid.view.View): void;
					public onStartNestedScroll(param0: globalAndroid.view.View, param1: globalAndroid.view.View, param2: number): boolean;
					public requestDisallowInterceptTouchEvent(param0: boolean): void;
					public addOnDidFinishLoadingMapListener(param0: com.mapbox.mapboxsdk.maps.MapView.OnDidFinishLoadingMapListener): void;
					public removeOnWillStartLoadingMapListener(param0: com.mapbox.mapboxsdk.maps.MapView.OnWillStartLoadingMapListener): void;
					public addView(param0: globalAndroid.view.View, param1: number): void;
					public addView(param0: globalAndroid.view.View, param1: globalAndroid.view.ViewGroup.LayoutParams): void;
					public getViewContent(): globalAndroid.graphics.Bitmap;
					public onNestedPreScroll(param0: globalAndroid.view.View, param1: number, param2: number, param3: native.Array<number>): void;
					public requestSendAccessibilityEvent(param0: globalAndroid.view.View, param1: globalAndroid.view.accessibility.AccessibilityEvent): boolean;
					public getParentForAccessibility(): globalAndroid.view.ViewParent;
					public onKeyDown(param0: number, param1: globalAndroid.view.KeyEvent): boolean;
					public canResolveLayoutDirection(): boolean;
					public onNestedScrollAccepted(param0: globalAndroid.view.View, param1: globalAndroid.view.View, param2: number): void;
					public addOnCameraDidChangeListener(param0: com.mapbox.mapboxsdk.maps.MapView.OnCameraDidChangeListener): void;
					public constructor(param0: globalAndroid.content.Context, param1: globalAndroid.util.AttributeSet, param2: number);
					public showContextMenuForChild(param0: globalAndroid.view.View): boolean;
					public removeOnCameraDidChangeListener(param0: com.mapbox.mapboxsdk.maps.MapView.OnCameraDidChangeListener): void;
					public removeOnDidFinishLoadingStyleListener(param0: com.mapbox.mapboxsdk.maps.MapView.OnDidFinishLoadingStyleListener): void;
					public onSizeChanged(param0: number, param1: number, param2: number, param3: number): void;
					public onKeyMultiple(param0: number, param1: number, param2: globalAndroid.view.KeyEvent): boolean;
					public removeView(param0: globalAndroid.view.View): void;
					public removeOnDidFinishLoadingMapListener(param0: com.mapbox.mapboxsdk.maps.MapView.OnDidFinishLoadingMapListener): void;
					public onStopNestedScroll(param0: globalAndroid.view.View): void;
					public onNestedPrePerformAccessibilityAction(param0: globalAndroid.view.View, param1: number, param2: globalAndroid.os.Bundle): boolean;
					public invalidateDrawable(param0: globalAndroid.graphics.drawable.Drawable): void;
					public removeOnWillStartRenderingMapListener(param0: com.mapbox.mapboxsdk.maps.MapView.OnWillStartRenderingMapListener): void;
				}
				export module MapView {
					export class AttributionClickListener extends java.lang.Object implements globalAndroid.view.View.OnClickListener {
						public static class: java.lang.Class<com.mapbox.mapboxsdk.maps.MapView.AttributionClickListener>;
						public onStop(): void;
						public onClick(param0: globalAndroid.view.View): void;
					}
					export class FocalPointInvalidator extends java.lang.Object implements com.mapbox.mapboxsdk.maps.FocalPointChangeListener {
						public static class: java.lang.Class<com.mapbox.mapboxsdk.maps.MapView.FocalPointInvalidator>;
						public onFocalPointChanged(param0: globalAndroid.graphics.PointF): void;
					}
					export class GesturesManagerInteractionListener extends java.lang.Object implements com.mapbox.mapboxsdk.maps.MapboxMap.OnGesturesManagerInteractionListener {
						public static class: java.lang.Class<com.mapbox.mapboxsdk.maps.MapView.GesturesManagerInteractionListener>;
						public onAddMoveListener(param0: com.mapbox.mapboxsdk.maps.MapboxMap.OnMoveListener): void;
						public onAddMapClickListener(param0: com.mapbox.mapboxsdk.maps.MapboxMap.OnMapClickListener): void;
						public onAddMapLongClickListener(param0: com.mapbox.mapboxsdk.maps.MapboxMap.OnMapLongClickListener): void;
						public onAddShoveListener(param0: com.mapbox.mapboxsdk.maps.MapboxMap.OnShoveListener): void;
						public onRemoveShoveListener(param0: com.mapbox.mapboxsdk.maps.MapboxMap.OnShoveListener): void;
						public setGesturesManager(param0: com.mapbox.android.gestures.AndroidGesturesManager, param1: boolean, param2: boolean): void;
						public onRemoveFlingListener(param0: com.mapbox.mapboxsdk.maps.MapboxMap.OnFlingListener): void;
						public getGesturesManager(): com.mapbox.android.gestures.AndroidGesturesManager;
						public onAddScaleListener(param0: com.mapbox.mapboxsdk.maps.MapboxMap.OnScaleListener): void;
						public onAddRotateListener(param0: com.mapbox.mapboxsdk.maps.MapboxMap.OnRotateListener): void;
						public onRemoveMapClickListener(param0: com.mapbox.mapboxsdk.maps.MapboxMap.OnMapClickListener): void;
						public onRemoveScaleListener(param0: com.mapbox.mapboxsdk.maps.MapboxMap.OnScaleListener): void;
						public cancelAllVelocityAnimations(): void;
						public onRemoveMapLongClickListener(param0: com.mapbox.mapboxsdk.maps.MapboxMap.OnMapLongClickListener): void;
						public onRemoveMoveListener(param0: com.mapbox.mapboxsdk.maps.MapboxMap.OnMoveListener): void;
						public onRemoveRotateListener(param0: com.mapbox.mapboxsdk.maps.MapboxMap.OnRotateListener): void;
						public onAddFlingListener(param0: com.mapbox.mapboxsdk.maps.MapboxMap.OnFlingListener): void;
					}
					export class InitialRenderCallback extends java.lang.Object implements com.mapbox.mapboxsdk.maps.MapView.OnDidFinishRenderingFrameListener {
						public static class: java.lang.Class<com.mapbox.mapboxsdk.maps.MapView.InitialRenderCallback>;
						public onDidFinishRenderingFrame(param0: boolean): void;
					}
					export class MapCallback extends java.lang.Object implements com.mapbox.mapboxsdk.maps.MapView.OnDidFinishLoadingStyleListener, com.mapbox.mapboxsdk.maps.MapView.OnDidFinishRenderingFrameListener, com.mapbox.mapboxsdk.maps.MapView.OnDidFinishLoadingMapListener, com.mapbox.mapboxsdk.maps.MapView.OnCameraIsChangingListener, com.mapbox.mapboxsdk.maps.MapView.OnCameraDidChangeListener, com.mapbox.mapboxsdk.maps.MapView.OnDidFailLoadingMapListener {
						public static class: java.lang.Class<com.mapbox.mapboxsdk.maps.MapView.MapCallback>;
						public onDidFinishRenderingFrame(param0: boolean): void;
						public onDidFailLoadingMap(param0: string): void;
						public onDidFinishLoadingMap(): void;
						public onCameraIsChanging(): void;
						public onDidFinishLoadingStyle(): void;
						public onCameraDidChange(param0: boolean): void;
					}
					export class OnCameraDidChangeListener extends java.lang.Object {
						public static class: java.lang.Class<com.mapbox.mapboxsdk.maps.MapView.OnCameraDidChangeListener>;
						/**
						 * Constructs a new instance of the com.mapbox.mapboxsdk.maps.MapView$OnCameraDidChangeListener interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
						 */
						public constructor(implementation: {
							onCameraDidChange(param0: boolean): void;
						});
						public constructor();
						public onCameraDidChange(param0: boolean): void;
					}
					export class OnCameraIsChangingListener extends java.lang.Object {
						public static class: java.lang.Class<com.mapbox.mapboxsdk.maps.MapView.OnCameraIsChangingListener>;
						/**
						 * Constructs a new instance of the com.mapbox.mapboxsdk.maps.MapView$OnCameraIsChangingListener interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
						 */
						public constructor(implementation: {
							onCameraIsChanging(): void;
						});
						public constructor();
						public onCameraIsChanging(): void;
					}
					export class OnCameraWillChangeListener extends java.lang.Object {
						public static class: java.lang.Class<com.mapbox.mapboxsdk.maps.MapView.OnCameraWillChangeListener>;
						/**
						 * Constructs a new instance of the com.mapbox.mapboxsdk.maps.MapView$OnCameraWillChangeListener interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
						 */
						public constructor(implementation: {
							onCameraWillChange(param0: boolean): void;
						});
						public constructor();
						public onCameraWillChange(param0: boolean): void;
					}
					export class OnCanRemoveUnusedStyleImageListener extends java.lang.Object {
						public static class: java.lang.Class<com.mapbox.mapboxsdk.maps.MapView.OnCanRemoveUnusedStyleImageListener>;
						/**
						 * Constructs a new instance of the com.mapbox.mapboxsdk.maps.MapView$OnCanRemoveUnusedStyleImageListener interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
						 */
						public constructor(implementation: {
							onCanRemoveUnusedStyleImage(param0: string): boolean;
						});
						public constructor();
						public onCanRemoveUnusedStyleImage(param0: string): boolean;
					}
					export class OnDidBecomeIdleListener extends java.lang.Object {
						public static class: java.lang.Class<com.mapbox.mapboxsdk.maps.MapView.OnDidBecomeIdleListener>;
						/**
						 * Constructs a new instance of the com.mapbox.mapboxsdk.maps.MapView$OnDidBecomeIdleListener interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
						 */
						public constructor(implementation: {
							onDidBecomeIdle(): void;
						});
						public constructor();
						public onDidBecomeIdle(): void;
					}
					export class OnDidFailLoadingMapListener extends java.lang.Object {
						public static class: java.lang.Class<com.mapbox.mapboxsdk.maps.MapView.OnDidFailLoadingMapListener>;
						/**
						 * Constructs a new instance of the com.mapbox.mapboxsdk.maps.MapView$OnDidFailLoadingMapListener interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
						 */
						public constructor(implementation: {
							onDidFailLoadingMap(param0: string): void;
						});
						public constructor();
						public onDidFailLoadingMap(param0: string): void;
					}
					export class OnDidFinishLoadingMapListener extends java.lang.Object {
						public static class: java.lang.Class<com.mapbox.mapboxsdk.maps.MapView.OnDidFinishLoadingMapListener>;
						/**
						 * Constructs a new instance of the com.mapbox.mapboxsdk.maps.MapView$OnDidFinishLoadingMapListener interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
						 */
						public constructor(implementation: {
							onDidFinishLoadingMap(): void;
						});
						public constructor();
						public onDidFinishLoadingMap(): void;
					}
					export class OnDidFinishLoadingStyleListener extends java.lang.Object {
						public static class: java.lang.Class<com.mapbox.mapboxsdk.maps.MapView.OnDidFinishLoadingStyleListener>;
						/**
						 * Constructs a new instance of the com.mapbox.mapboxsdk.maps.MapView$OnDidFinishLoadingStyleListener interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
						 */
						public constructor(implementation: {
							onDidFinishLoadingStyle(): void;
						});
						public constructor();
						public onDidFinishLoadingStyle(): void;
					}
					export class OnDidFinishRenderingFrameListener extends java.lang.Object {
						public static class: java.lang.Class<com.mapbox.mapboxsdk.maps.MapView.OnDidFinishRenderingFrameListener>;
						/**
						 * Constructs a new instance of the com.mapbox.mapboxsdk.maps.MapView$OnDidFinishRenderingFrameListener interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
						 */
						public constructor(implementation: {
							onDidFinishRenderingFrame(param0: boolean): void;
						});
						public constructor();
						public onDidFinishRenderingFrame(param0: boolean): void;
					}
					export class OnDidFinishRenderingMapListener extends java.lang.Object {
						public static class: java.lang.Class<com.mapbox.mapboxsdk.maps.MapView.OnDidFinishRenderingMapListener>;
						/**
						 * Constructs a new instance of the com.mapbox.mapboxsdk.maps.MapView$OnDidFinishRenderingMapListener interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
						 */
						public constructor(implementation: {
							onDidFinishRenderingMap(param0: boolean): void;
						});
						public constructor();
						public onDidFinishRenderingMap(param0: boolean): void;
					}
					export class OnSourceChangedListener extends java.lang.Object {
						public static class: java.lang.Class<com.mapbox.mapboxsdk.maps.MapView.OnSourceChangedListener>;
						/**
						 * Constructs a new instance of the com.mapbox.mapboxsdk.maps.MapView$OnSourceChangedListener interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
						 */
						public constructor(implementation: {
							onSourceChangedListener(param0: string): void;
						});
						public constructor();
						public onSourceChangedListener(param0: string): void;
					}
					export class OnStyleImageMissingListener extends java.lang.Object {
						public static class: java.lang.Class<com.mapbox.mapboxsdk.maps.MapView.OnStyleImageMissingListener>;
						/**
						 * Constructs a new instance of the com.mapbox.mapboxsdk.maps.MapView$OnStyleImageMissingListener interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
						 */
						public constructor(implementation: {
							onStyleImageMissing(param0: string): void;
						});
						public constructor();
						public onStyleImageMissing(param0: string): void;
					}
					export class OnWillStartLoadingMapListener extends java.lang.Object {
						public static class: java.lang.Class<com.mapbox.mapboxsdk.maps.MapView.OnWillStartLoadingMapListener>;
						/**
						 * Constructs a new instance of the com.mapbox.mapboxsdk.maps.MapView$OnWillStartLoadingMapListener interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
						 */
						public constructor(implementation: {
							onWillStartLoadingMap(): void;
						});
						public constructor();
						public onWillStartLoadingMap(): void;
					}
					export class OnWillStartRenderingFrameListener extends java.lang.Object {
						public static class: java.lang.Class<com.mapbox.mapboxsdk.maps.MapView.OnWillStartRenderingFrameListener>;
						/**
						 * Constructs a new instance of the com.mapbox.mapboxsdk.maps.MapView$OnWillStartRenderingFrameListener interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
						 */
						public constructor(implementation: {
							onWillStartRenderingFrame(): void;
						});
						public constructor();
						public onWillStartRenderingFrame(): void;
					}
					export class OnWillStartRenderingMapListener extends java.lang.Object {
						public static class: java.lang.Class<com.mapbox.mapboxsdk.maps.MapView.OnWillStartRenderingMapListener>;
						/**
						 * Constructs a new instance of the com.mapbox.mapboxsdk.maps.MapView$OnWillStartRenderingMapListener interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
						 */
						public constructor(implementation: {
							onWillStartRenderingMap(): void;
						});
						public constructor();
						public onWillStartRenderingMap(): void;
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export module maps {
				export class MapboxMap extends java.lang.Object {
					public static class: java.lang.Class<com.mapbox.mapboxsdk.maps.MapboxMap>;
					public setOfflineRegionDefinition(param0: com.mapbox.mapboxsdk.offline.OfflineRegionDefinition, param1: com.mapbox.mapboxsdk.maps.Style.OnStyleLoaded): void;
					/** @deprecated */
					public getPolylines(): java.util.List<com.mapbox.mapboxsdk.annotations.Polyline>;
					public setMaxZoomPreference(param0: number): void;
					public removeOnCameraMoveStartedListener(param0: com.mapbox.mapboxsdk.maps.MapboxMap.OnCameraMoveStartedListener): void;
					public addOnMapClickListener(param0: com.mapbox.mapboxsdk.maps.MapboxMap.OnMapClickListener): void;
					/** @deprecated */
					public setPrefetchesTiles(param0: boolean): void;
					public animateCamera(param0: com.mapbox.mapboxsdk.camera.CameraUpdate, param1: number): void;
					/** @deprecated */
					public getMarkers(): java.util.List<com.mapbox.mapboxsdk.annotations.Marker>;
					public snapshot(param0: com.mapbox.mapboxsdk.maps.MapboxMap.SnapshotReadyCallback): void;
					/** @deprecated */
					public deselectMarkers(): void;
					public getCameraPosition(): com.mapbox.mapboxsdk.camera.CameraPosition;
					/** @deprecated */
					public addMarkers(param0: java.util.List<any>): java.util.List<com.mapbox.mapboxsdk.annotations.Marker>;
					/** @deprecated */
					public isAllowConcurrentMultipleOpenInfoWindows(): boolean;
					public getStyle(param0: com.mapbox.mapboxsdk.maps.Style.OnStyleLoaded): void;
					public removeOnCameraIdleListener(param0: com.mapbox.mapboxsdk.maps.MapboxMap.OnCameraIdleListener): void;
					public setCameraPosition(param0: com.mapbox.mapboxsdk.camera.CameraPosition): void;
					public removeOnMoveListener(param0: com.mapbox.mapboxsdk.maps.MapboxMap.OnMoveListener): void;
					/** @deprecated */
					public addPolygons(param0: java.util.List<com.mapbox.mapboxsdk.annotations.PolygonOptions>): java.util.List<com.mapbox.mapboxsdk.annotations.Polygon>;
					public animateCamera(param0: com.mapbox.mapboxsdk.camera.CameraUpdate): void;
					/** @deprecated */
					public removeAnnotation(param0: com.mapbox.mapboxsdk.annotations.Annotation): void;
					public getHeight(): number;
					public addOnShoveListener(param0: com.mapbox.mapboxsdk.maps.MapboxMap.OnShoveListener): void;
					public getStyle(): com.mapbox.mapboxsdk.maps.Style;
					/** @deprecated */
					public clear(): void;
					public getUiSettings(): com.mapbox.mapboxsdk.maps.UiSettings;
					public queryRenderedFeatures(param0: globalAndroid.graphics.RectF, param1: com.mapbox.mapboxsdk.style.expressions.Expression, param2: native.Array<string>): java.util.List<com.mapbox.geojson.Feature>;
					public setStyle(param0: string, param1: com.mapbox.mapboxsdk.maps.Style.OnStyleLoaded): void;
					/** @deprecated */
					public addPolyline(param0: com.mapbox.mapboxsdk.annotations.PolylineOptions): com.mapbox.mapboxsdk.annotations.Polyline;
					/** @deprecated */
					public updateMarker(param0: com.mapbox.mapboxsdk.annotations.Marker): void;
					public getCameraForLatLngBounds(param0: com.mapbox.mapboxsdk.geometry.LatLngBounds): com.mapbox.mapboxsdk.camera.CameraPosition;
					/** @deprecated */
					public removeAnnotations(): void;
					public getCameraForGeometry(param0: com.mapbox.geojson.Geometry): com.mapbox.mapboxsdk.camera.CameraPosition;
					/** @deprecated */
					public deselectMarker(param0: com.mapbox.mapboxsdk.annotations.Marker): void;
					public setMinZoomPreference(param0: number): void;
					public getCameraForGeometry(param0: com.mapbox.geojson.Geometry, param1: number, param2: number): com.mapbox.mapboxsdk.camera.CameraPosition;
					/** @deprecated */
					public selectMarker(param0: com.mapbox.mapboxsdk.annotations.Marker): void;
					public queryRenderedFeatures(param0: globalAndroid.graphics.PointF, param1: native.Array<string>): java.util.List<com.mapbox.geojson.Feature>;
					public setDebugActive(param0: boolean): void;
					/** @deprecated */
					public setAllowConcurrentMultipleOpenInfoWindows(param0: boolean): void;
					public cancelTransitions(): void;
					public removeOnScaleListener(param0: com.mapbox.mapboxsdk.maps.MapboxMap.OnScaleListener): void;
					public cancelAllVelocityAnimations(): void;
					public getPrefetchZoomDelta(): number;
					public addOnMapLongClickListener(param0: com.mapbox.mapboxsdk.maps.MapboxMap.OnMapLongClickListener): void;
					/** @deprecated */
					public getSelectedMarkers(): java.util.List<com.mapbox.mapboxsdk.annotations.Marker>;
					public removeOnMapLongClickListener(param0: com.mapbox.mapboxsdk.maps.MapboxMap.OnMapLongClickListener): void;
					public animateCamera(param0: com.mapbox.mapboxsdk.camera.CameraUpdate, param1: number, param2: com.mapbox.mapboxsdk.maps.MapboxMap.CancelableCallback): void;
					/** @deprecated */
					public setOnPolylineClickListener(param0: com.mapbox.mapboxsdk.maps.MapboxMap.OnPolylineClickListener): void;
					public removeOnShoveListener(param0: com.mapbox.mapboxsdk.maps.MapboxMap.OnShoveListener): void;
					/** @deprecated */
					public removeAnnotations(param0: java.util.List<any>): void;
					public getProjection(): com.mapbox.mapboxsdk.maps.Projection;
					public getCameraForLatLngBounds(param0: com.mapbox.mapboxsdk.geometry.LatLngBounds, param1: native.Array<number>): com.mapbox.mapboxsdk.camera.CameraPosition;
					/** @deprecated */
					public getPadding(): native.Array<number>;
					public getOnInfoWindowClickListener(): com.mapbox.mapboxsdk.maps.MapboxMap.OnInfoWindowClickListener;
					/** @deprecated */
					public getAnnotations(): java.util.List<com.mapbox.mapboxsdk.annotations.Annotation>;
					public getWidth(): number;
					/** @deprecated */
					public setOnMarkerClickListener(param0: com.mapbox.mapboxsdk.maps.MapboxMap.OnMarkerClickListener): void;
					public addOnMoveListener(param0: com.mapbox.mapboxsdk.maps.MapboxMap.OnMoveListener): void;
					public setFocalBearing(param0: number, param1: number, param2: number, param3: number): void;
					public moveCamera(param0: com.mapbox.mapboxsdk.camera.CameraUpdate, param1: com.mapbox.mapboxsdk.maps.MapboxMap.CancelableCallback): void;
					public removeOnRotateListener(param0: com.mapbox.mapboxsdk.maps.MapboxMap.OnRotateListener): void;
					/** @deprecated */
					public setOnPolygonClickListener(param0: com.mapbox.mapboxsdk.maps.MapboxMap.OnPolygonClickListener): void;
					public getGesturesManager(): com.mapbox.android.gestures.AndroidGesturesManager;
					public getMinZoomLevel(): number;
					/** @deprecated */
					public removePolyline(param0: com.mapbox.mapboxsdk.annotations.Polyline): void;
					public getOnInfoWindowCloseListener(): com.mapbox.mapboxsdk.maps.MapboxMap.OnInfoWindowCloseListener;
					/** @deprecated */
					public getPrefetchesTiles(): boolean;
					/** @deprecated */
					public addMarker(param0: com.mapbox.mapboxsdk.annotations.BaseMarkerOptions<any,any>): com.mapbox.mapboxsdk.annotations.Marker;
					public addOnRotateListener(param0: com.mapbox.mapboxsdk.maps.MapboxMap.OnRotateListener): void;
					public queryRenderedFeatures(param0: globalAndroid.graphics.RectF, param1: native.Array<string>): java.util.List<com.mapbox.geojson.Feature>;
					public getOnInfoWindowLongClickListener(): com.mapbox.mapboxsdk.maps.MapboxMap.OnInfoWindowLongClickListener;
					public setOnFpsChangedListener(param0: com.mapbox.mapboxsdk.maps.MapboxMap.OnFpsChangedListener): void;
					public addOnFlingListener(param0: com.mapbox.mapboxsdk.maps.MapboxMap.OnFlingListener): void;
					public getLocationComponent(): com.mapbox.mapboxsdk.location.LocationComponent;
					public addOnCameraMoveStartedListener(param0: com.mapbox.mapboxsdk.maps.MapboxMap.OnCameraMoveStartedListener): void;
					public setLatLngBoundsForCameraTarget(param0: com.mapbox.mapboxsdk.geometry.LatLngBounds): void;
					public isDebugActive(): boolean;
					public getMaxZoomLevel(): number;
					public easeCamera(param0: com.mapbox.mapboxsdk.camera.CameraUpdate): void;
					public getCameraForLatLngBounds(param0: com.mapbox.mapboxsdk.geometry.LatLngBounds, param1: native.Array<number>, param2: number, param3: number): com.mapbox.mapboxsdk.camera.CameraPosition;
					public setOfflineRegionDefinition(param0: com.mapbox.mapboxsdk.offline.OfflineRegionDefinition): void;
					/** @deprecated */
					public getPolygons(): java.util.List<com.mapbox.mapboxsdk.annotations.Polygon>;
					public easeCamera(param0: com.mapbox.mapboxsdk.camera.CameraUpdate, param1: number, param2: com.mapbox.mapboxsdk.maps.MapboxMap.CancelableCallback): void;
					public removeOnMapClickListener(param0: com.mapbox.mapboxsdk.maps.MapboxMap.OnMapClickListener): void;
					public easeCamera(param0: com.mapbox.mapboxsdk.camera.CameraUpdate, param1: number, param2: boolean): void;
					/** @deprecated */
					public updatePolygon(param0: com.mapbox.mapboxsdk.annotations.Polygon): void;
					public addOnCameraIdleListener(param0: com.mapbox.mapboxsdk.maps.MapboxMap.OnCameraIdleListener): void;
					public getCameraForLatLngBounds(param0: com.mapbox.mapboxsdk.geometry.LatLngBounds, param1: number, param2: number): com.mapbox.mapboxsdk.camera.CameraPosition;
					/** @deprecated */
					public setPadding(param0: number, param1: number, param2: number, param3: number): void;
					public easeCamera(param0: com.mapbox.mapboxsdk.camera.CameraUpdate, param1: com.mapbox.mapboxsdk.maps.MapboxMap.CancelableCallback): void;
					public addOnCameraMoveCancelListener(param0: com.mapbox.mapboxsdk.maps.MapboxMap.OnCameraMoveCanceledListener): void;
					public resetNorth(): void;
					public removeOnCameraMoveListener(param0: com.mapbox.mapboxsdk.maps.MapboxMap.OnCameraMoveListener): void;
					public animateCamera(param0: com.mapbox.mapboxsdk.camera.CameraUpdate, param1: com.mapbox.mapboxsdk.maps.MapboxMap.CancelableCallback): void;
					/** @deprecated */
					public removePolygon(param0: com.mapbox.mapboxsdk.annotations.Polygon): void;
					/** @deprecated */
					public getAnnotation(param0: number): com.mapbox.mapboxsdk.annotations.Annotation;
					public setOnInfoWindowClickListener(param0: com.mapbox.mapboxsdk.maps.MapboxMap.OnInfoWindowClickListener): void;
					public addOnScaleListener(param0: com.mapbox.mapboxsdk.maps.MapboxMap.OnScaleListener): void;
					public setPrefetchZoomDelta(param0: number): void;
					/** @deprecated */
					public removeMarker(param0: com.mapbox.mapboxsdk.annotations.Marker): void;
					/** @deprecated */
					public removeAnnotation(param0: number): void;
					public scrollBy(param0: number, param1: number): void;
					public scrollBy(param0: number, param1: number, param2: number): void;
					/** @deprecated */
					public addPolylines(param0: java.util.List<com.mapbox.mapboxsdk.annotations.PolylineOptions>): java.util.List<com.mapbox.mapboxsdk.annotations.Polyline>;
					public easeCamera(param0: com.mapbox.mapboxsdk.camera.CameraUpdate, param1: number): void;
					public removeOnFlingListener(param0: com.mapbox.mapboxsdk.maps.MapboxMap.OnFlingListener): void;
					/** @deprecated */
					public addPolygon(param0: com.mapbox.mapboxsdk.annotations.PolygonOptions): com.mapbox.mapboxsdk.annotations.Polygon;
					/** @deprecated */
					public getInfoWindowAdapter(): com.mapbox.mapboxsdk.maps.MapboxMap.InfoWindowAdapter;
					public setOnInfoWindowLongClickListener(param0: com.mapbox.mapboxsdk.maps.MapboxMap.OnInfoWindowLongClickListener): void;
					public setOnInfoWindowCloseListener(param0: com.mapbox.mapboxsdk.maps.MapboxMap.OnInfoWindowCloseListener): void;
					/** @deprecated */
					public cycleDebugOptions(): void;
					public setStyle(param0: string): void;
					public getCameraForGeometry(param0: com.mapbox.geojson.Geometry, param1: native.Array<number>): com.mapbox.mapboxsdk.camera.CameraPosition;
					public setStyle(param0: com.mapbox.mapboxsdk.maps.Style.Builder, param1: com.mapbox.mapboxsdk.maps.Style.OnStyleLoaded): void;
					/** @deprecated */
					public setInfoWindowAdapter(param0: com.mapbox.mapboxsdk.maps.MapboxMap.InfoWindowAdapter): void;
					public getCameraForGeometry(param0: com.mapbox.geojson.Geometry, param1: native.Array<number>, param2: number, param3: number): com.mapbox.mapboxsdk.camera.CameraPosition;
					/** @deprecated */
					public addMarker(param0: com.mapbox.mapboxsdk.annotations.MarkerOptions): com.mapbox.mapboxsdk.annotations.Marker;
					public moveCamera(param0: com.mapbox.mapboxsdk.camera.CameraUpdate): void;
					public addOnCameraMoveListener(param0: com.mapbox.mapboxsdk.maps.MapboxMap.OnCameraMoveListener): void;
					public easeCamera(param0: com.mapbox.mapboxsdk.camera.CameraUpdate, param1: number, param2: boolean, param3: com.mapbox.mapboxsdk.maps.MapboxMap.CancelableCallback): void;
					/** @deprecated */
					public updatePolyline(param0: com.mapbox.mapboxsdk.annotations.Polyline): void;
					public setGesturesManager(param0: com.mapbox.android.gestures.AndroidGesturesManager, param1: boolean, param2: boolean): void;
					public removeOnCameraMoveCancelListener(param0: com.mapbox.mapboxsdk.maps.MapboxMap.OnCameraMoveCanceledListener): void;
					public queryRenderedFeatures(param0: globalAndroid.graphics.PointF, param1: com.mapbox.mapboxsdk.style.expressions.Expression, param2: native.Array<string>): java.util.List<com.mapbox.geojson.Feature>;
					public setStyle(param0: com.mapbox.mapboxsdk.maps.Style.Builder): void;
				}
				export module MapboxMap {
					export class CancelableCallback extends java.lang.Object {
						public static class: java.lang.Class<com.mapbox.mapboxsdk.maps.MapboxMap.CancelableCallback>;
						/**
						 * Constructs a new instance of the com.mapbox.mapboxsdk.maps.MapboxMap$CancelableCallback interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
						 */
						public constructor(implementation: {
							onCancel(): void;
							onFinish(): void;
						});
						public constructor();
						public onCancel(): void;
						public onFinish(): void;
					}
					export class InfoWindowAdapter extends java.lang.Object {
						public static class: java.lang.Class<com.mapbox.mapboxsdk.maps.MapboxMap.InfoWindowAdapter>;
						/**
						 * Constructs a new instance of the com.mapbox.mapboxsdk.maps.MapboxMap$InfoWindowAdapter interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
						 */
						public constructor(implementation: {
							getInfoWindow(param0: com.mapbox.mapboxsdk.annotations.Marker): globalAndroid.view.View;
						});
						public constructor();
						public getInfoWindow(param0: com.mapbox.mapboxsdk.annotations.Marker): globalAndroid.view.View;
					}
					export class OnCameraIdleListener extends java.lang.Object {
						public static class: java.lang.Class<com.mapbox.mapboxsdk.maps.MapboxMap.OnCameraIdleListener>;
						/**
						 * Constructs a new instance of the com.mapbox.mapboxsdk.maps.MapboxMap$OnCameraIdleListener interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
						 */
						public constructor(implementation: {
							onCameraIdle(): void;
						});
						public constructor();
						public onCameraIdle(): void;
					}
					export class OnCameraMoveCanceledListener extends java.lang.Object {
						public static class: java.lang.Class<com.mapbox.mapboxsdk.maps.MapboxMap.OnCameraMoveCanceledListener>;
						/**
						 * Constructs a new instance of the com.mapbox.mapboxsdk.maps.MapboxMap$OnCameraMoveCanceledListener interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
						 */
						public constructor(implementation: {
							onCameraMoveCanceled(): void;
						});
						public constructor();
						public onCameraMoveCanceled(): void;
					}
					export class OnCameraMoveListener extends java.lang.Object {
						public static class: java.lang.Class<com.mapbox.mapboxsdk.maps.MapboxMap.OnCameraMoveListener>;
						/**
						 * Constructs a new instance of the com.mapbox.mapboxsdk.maps.MapboxMap$OnCameraMoveListener interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
						 */
						public constructor(implementation: {
							onCameraMove(): void;
						});
						public constructor();
						public onCameraMove(): void;
					}
					export class OnCameraMoveStartedListener extends java.lang.Object {
						public static class: java.lang.Class<com.mapbox.mapboxsdk.maps.MapboxMap.OnCameraMoveStartedListener>;
						/**
						 * Constructs a new instance of the com.mapbox.mapboxsdk.maps.MapboxMap$OnCameraMoveStartedListener interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
						 */
						public constructor(implementation: {
							onCameraMoveStarted(param0: number): void;
						});
						public constructor();
						public static REASON_DEVELOPER_ANIMATION: number;
						public static REASON_API_ANIMATION: number;
						public static REASON_API_GESTURE: number;
						public onCameraMoveStarted(param0: number): void;
					}
					export class OnCompassAnimationListener extends java.lang.Object {
						public static class: java.lang.Class<com.mapbox.mapboxsdk.maps.MapboxMap.OnCompassAnimationListener>;
						/**
						 * Constructs a new instance of the com.mapbox.mapboxsdk.maps.MapboxMap$OnCompassAnimationListener interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
						 */
						public constructor(implementation: {
							onCompassAnimation(): void;
							onCompassAnimationFinished(): void;
						});
						public constructor();
						public onCompassAnimation(): void;
						public onCompassAnimationFinished(): void;
					}
					export class OnDeveloperAnimationListener extends java.lang.Object {
						public static class: java.lang.Class<com.mapbox.mapboxsdk.maps.MapboxMap.OnDeveloperAnimationListener>;
						/**
						 * Constructs a new instance of the com.mapbox.mapboxsdk.maps.MapboxMap$OnDeveloperAnimationListener interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
						 */
						public constructor(implementation: {
							onDeveloperAnimationStarted(): void;
						});
						public constructor();
						public onDeveloperAnimationStarted(): void;
					}
					export class OnFlingListener extends java.lang.Object {
						public static class: java.lang.Class<com.mapbox.mapboxsdk.maps.MapboxMap.OnFlingListener>;
						/**
						 * Constructs a new instance of the com.mapbox.mapboxsdk.maps.MapboxMap$OnFlingListener interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
						 */
						public constructor(implementation: {
							onFling(): void;
						});
						public constructor();
						public onFling(): void;
					}
					export class OnFpsChangedListener extends java.lang.Object {
						public static class: java.lang.Class<com.mapbox.mapboxsdk.maps.MapboxMap.OnFpsChangedListener>;
						/**
						 * Constructs a new instance of the com.mapbox.mapboxsdk.maps.MapboxMap$OnFpsChangedListener interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
						 */
						public constructor(implementation: {
							onFpsChanged(param0: number): void;
						});
						public constructor();
						public onFpsChanged(param0: number): void;
					}
					export class OnGesturesManagerInteractionListener extends java.lang.Object {
						public static class: java.lang.Class<com.mapbox.mapboxsdk.maps.MapboxMap.OnGesturesManagerInteractionListener>;
						/**
						 * Constructs a new instance of the com.mapbox.mapboxsdk.maps.MapboxMap$OnGesturesManagerInteractionListener interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
						 */
						public constructor(implementation: {
							onAddMapClickListener(param0: com.mapbox.mapboxsdk.maps.MapboxMap.OnMapClickListener): void;
							onRemoveMapClickListener(param0: com.mapbox.mapboxsdk.maps.MapboxMap.OnMapClickListener): void;
							onAddMapLongClickListener(param0: com.mapbox.mapboxsdk.maps.MapboxMap.OnMapLongClickListener): void;
							onRemoveMapLongClickListener(param0: com.mapbox.mapboxsdk.maps.MapboxMap.OnMapLongClickListener): void;
							onAddFlingListener(param0: com.mapbox.mapboxsdk.maps.MapboxMap.OnFlingListener): void;
							onRemoveFlingListener(param0: com.mapbox.mapboxsdk.maps.MapboxMap.OnFlingListener): void;
							onAddMoveListener(param0: com.mapbox.mapboxsdk.maps.MapboxMap.OnMoveListener): void;
							onRemoveMoveListener(param0: com.mapbox.mapboxsdk.maps.MapboxMap.OnMoveListener): void;
							onAddRotateListener(param0: com.mapbox.mapboxsdk.maps.MapboxMap.OnRotateListener): void;
							onRemoveRotateListener(param0: com.mapbox.mapboxsdk.maps.MapboxMap.OnRotateListener): void;
							onAddScaleListener(param0: com.mapbox.mapboxsdk.maps.MapboxMap.OnScaleListener): void;
							onRemoveScaleListener(param0: com.mapbox.mapboxsdk.maps.MapboxMap.OnScaleListener): void;
							onAddShoveListener(param0: com.mapbox.mapboxsdk.maps.MapboxMap.OnShoveListener): void;
							onRemoveShoveListener(param0: com.mapbox.mapboxsdk.maps.MapboxMap.OnShoveListener): void;
							getGesturesManager(): com.mapbox.android.gestures.AndroidGesturesManager;
							setGesturesManager(param0: com.mapbox.android.gestures.AndroidGesturesManager, param1: boolean, param2: boolean): void;
							cancelAllVelocityAnimations(): void;
						});
						public constructor();
						public onAddMoveListener(param0: com.mapbox.mapboxsdk.maps.MapboxMap.OnMoveListener): void;
						public onAddMapClickListener(param0: com.mapbox.mapboxsdk.maps.MapboxMap.OnMapClickListener): void;
						public onAddMapLongClickListener(param0: com.mapbox.mapboxsdk.maps.MapboxMap.OnMapLongClickListener): void;
						public onAddShoveListener(param0: com.mapbox.mapboxsdk.maps.MapboxMap.OnShoveListener): void;
						public onRemoveShoveListener(param0: com.mapbox.mapboxsdk.maps.MapboxMap.OnShoveListener): void;
						public setGesturesManager(param0: com.mapbox.android.gestures.AndroidGesturesManager, param1: boolean, param2: boolean): void;
						public onRemoveFlingListener(param0: com.mapbox.mapboxsdk.maps.MapboxMap.OnFlingListener): void;
						public getGesturesManager(): com.mapbox.android.gestures.AndroidGesturesManager;
						public onAddScaleListener(param0: com.mapbox.mapboxsdk.maps.MapboxMap.OnScaleListener): void;
						public onAddRotateListener(param0: com.mapbox.mapboxsdk.maps.MapboxMap.OnRotateListener): void;
						public onRemoveMapClickListener(param0: com.mapbox.mapboxsdk.maps.MapboxMap.OnMapClickListener): void;
						public onRemoveScaleListener(param0: com.mapbox.mapboxsdk.maps.MapboxMap.OnScaleListener): void;
						public cancelAllVelocityAnimations(): void;
						public onRemoveMapLongClickListener(param0: com.mapbox.mapboxsdk.maps.MapboxMap.OnMapLongClickListener): void;
						public onRemoveMoveListener(param0: com.mapbox.mapboxsdk.maps.MapboxMap.OnMoveListener): void;
						public onRemoveRotateListener(param0: com.mapbox.mapboxsdk.maps.MapboxMap.OnRotateListener): void;
						public onAddFlingListener(param0: com.mapbox.mapboxsdk.maps.MapboxMap.OnFlingListener): void;
					}
					export class OnInfoWindowClickListener extends java.lang.Object {
						public static class: java.lang.Class<com.mapbox.mapboxsdk.maps.MapboxMap.OnInfoWindowClickListener>;
						/**
						 * Constructs a new instance of the com.mapbox.mapboxsdk.maps.MapboxMap$OnInfoWindowClickListener interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
						 */
						public constructor(implementation: {
							onInfoWindowClick(param0: com.mapbox.mapboxsdk.annotations.Marker): boolean;
						});
						public constructor();
						public onInfoWindowClick(param0: com.mapbox.mapboxsdk.annotations.Marker): boolean;
					}
					export class OnInfoWindowCloseListener extends java.lang.Object {
						public static class: java.lang.Class<com.mapbox.mapboxsdk.maps.MapboxMap.OnInfoWindowCloseListener>;
						/**
						 * Constructs a new instance of the com.mapbox.mapboxsdk.maps.MapboxMap$OnInfoWindowCloseListener interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
						 */
						public constructor(implementation: {
							onInfoWindowClose(param0: com.mapbox.mapboxsdk.annotations.Marker): void;
						});
						public constructor();
						public onInfoWindowClose(param0: com.mapbox.mapboxsdk.annotations.Marker): void;
					}
					export class OnInfoWindowLongClickListener extends java.lang.Object {
						public static class: java.lang.Class<com.mapbox.mapboxsdk.maps.MapboxMap.OnInfoWindowLongClickListener>;
						/**
						 * Constructs a new instance of the com.mapbox.mapboxsdk.maps.MapboxMap$OnInfoWindowLongClickListener interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
						 */
						public constructor(implementation: {
							onInfoWindowLongClick(param0: com.mapbox.mapboxsdk.annotations.Marker): void;
						});
						public constructor();
						public onInfoWindowLongClick(param0: com.mapbox.mapboxsdk.annotations.Marker): void;
					}
					export class OnMapClickListener extends java.lang.Object {
						public static class: java.lang.Class<com.mapbox.mapboxsdk.maps.MapboxMap.OnMapClickListener>;
						/**
						 * Constructs a new instance of the com.mapbox.mapboxsdk.maps.MapboxMap$OnMapClickListener interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
						 */
						public constructor(implementation: {
							onMapClick(param0: com.mapbox.mapboxsdk.geometry.LatLng): boolean;
						});
						public constructor();
						public onMapClick(param0: com.mapbox.mapboxsdk.geometry.LatLng): boolean;
					}
					export class OnMapLongClickListener extends java.lang.Object {
						public static class: java.lang.Class<com.mapbox.mapboxsdk.maps.MapboxMap.OnMapLongClickListener>;
						/**
						 * Constructs a new instance of the com.mapbox.mapboxsdk.maps.MapboxMap$OnMapLongClickListener interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
						 */
						public constructor(implementation: {
							onMapLongClick(param0: com.mapbox.mapboxsdk.geometry.LatLng): boolean;
						});
						public constructor();
						public onMapLongClick(param0: com.mapbox.mapboxsdk.geometry.LatLng): boolean;
					}
					export class OnMarkerClickListener extends java.lang.Object {
						public static class: java.lang.Class<com.mapbox.mapboxsdk.maps.MapboxMap.OnMarkerClickListener>;
						/**
						 * Constructs a new instance of the com.mapbox.mapboxsdk.maps.MapboxMap$OnMarkerClickListener interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
						 */
						public constructor(implementation: {
							onMarkerClick(param0: com.mapbox.mapboxsdk.annotations.Marker): boolean;
						});
						public constructor();
						public onMarkerClick(param0: com.mapbox.mapboxsdk.annotations.Marker): boolean;
					}
					export class OnMoveListener extends java.lang.Object {
						public static class: java.lang.Class<com.mapbox.mapboxsdk.maps.MapboxMap.OnMoveListener>;
						/**
						 * Constructs a new instance of the com.mapbox.mapboxsdk.maps.MapboxMap$OnMoveListener interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
						 */
						public constructor(implementation: {
							onMoveBegin(param0: com.mapbox.android.gestures.MoveGestureDetector): void;
							onMove(param0: com.mapbox.android.gestures.MoveGestureDetector): void;
							onMoveEnd(param0: com.mapbox.android.gestures.MoveGestureDetector): void;
						});
						public constructor();
						public onMove(param0: com.mapbox.android.gestures.MoveGestureDetector): void;
						public onMoveEnd(param0: com.mapbox.android.gestures.MoveGestureDetector): void;
						public onMoveBegin(param0: com.mapbox.android.gestures.MoveGestureDetector): void;
					}
					export class OnPolygonClickListener extends java.lang.Object {
						public static class: java.lang.Class<com.mapbox.mapboxsdk.maps.MapboxMap.OnPolygonClickListener>;
						/**
						 * Constructs a new instance of the com.mapbox.mapboxsdk.maps.MapboxMap$OnPolygonClickListener interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
						 */
						public constructor(implementation: {
							onPolygonClick(param0: com.mapbox.mapboxsdk.annotations.Polygon): void;
						});
						public constructor();
						public onPolygonClick(param0: com.mapbox.mapboxsdk.annotations.Polygon): void;
					}
					export class OnPolylineClickListener extends java.lang.Object {
						public static class: java.lang.Class<com.mapbox.mapboxsdk.maps.MapboxMap.OnPolylineClickListener>;
						/**
						 * Constructs a new instance of the com.mapbox.mapboxsdk.maps.MapboxMap$OnPolylineClickListener interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
						 */
						public constructor(implementation: {
							onPolylineClick(param0: com.mapbox.mapboxsdk.annotations.Polyline): void;
						});
						public constructor();
						public onPolylineClick(param0: com.mapbox.mapboxsdk.annotations.Polyline): void;
					}
					export class OnRotateListener extends java.lang.Object {
						public static class: java.lang.Class<com.mapbox.mapboxsdk.maps.MapboxMap.OnRotateListener>;
						/**
						 * Constructs a new instance of the com.mapbox.mapboxsdk.maps.MapboxMap$OnRotateListener interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
						 */
						public constructor(implementation: {
							onRotateBegin(param0: com.mapbox.android.gestures.RotateGestureDetector): void;
							onRotate(param0: com.mapbox.android.gestures.RotateGestureDetector): void;
							onRotateEnd(param0: com.mapbox.android.gestures.RotateGestureDetector): void;
						});
						public constructor();
						public onRotateBegin(param0: com.mapbox.android.gestures.RotateGestureDetector): void;
						public onRotate(param0: com.mapbox.android.gestures.RotateGestureDetector): void;
						public onRotateEnd(param0: com.mapbox.android.gestures.RotateGestureDetector): void;
					}
					export class OnScaleListener extends java.lang.Object {
						public static class: java.lang.Class<com.mapbox.mapboxsdk.maps.MapboxMap.OnScaleListener>;
						/**
						 * Constructs a new instance of the com.mapbox.mapboxsdk.maps.MapboxMap$OnScaleListener interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
						 */
						public constructor(implementation: {
							onScaleBegin(param0: com.mapbox.android.gestures.StandardScaleGestureDetector): void;
							onScale(param0: com.mapbox.android.gestures.StandardScaleGestureDetector): void;
							onScaleEnd(param0: com.mapbox.android.gestures.StandardScaleGestureDetector): void;
						});
						public constructor();
						public onScale(param0: com.mapbox.android.gestures.StandardScaleGestureDetector): void;
						public onScaleEnd(param0: com.mapbox.android.gestures.StandardScaleGestureDetector): void;
						public onScaleBegin(param0: com.mapbox.android.gestures.StandardScaleGestureDetector): void;
					}
					export class OnShoveListener extends java.lang.Object {
						public static class: java.lang.Class<com.mapbox.mapboxsdk.maps.MapboxMap.OnShoveListener>;
						/**
						 * Constructs a new instance of the com.mapbox.mapboxsdk.maps.MapboxMap$OnShoveListener interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
						 */
						public constructor(implementation: {
							onShoveBegin(param0: com.mapbox.android.gestures.ShoveGestureDetector): void;
							onShove(param0: com.mapbox.android.gestures.ShoveGestureDetector): void;
							onShoveEnd(param0: com.mapbox.android.gestures.ShoveGestureDetector): void;
						});
						public constructor();
						public onShove(param0: com.mapbox.android.gestures.ShoveGestureDetector): void;
						public onShoveBegin(param0: com.mapbox.android.gestures.ShoveGestureDetector): void;
						public onShoveEnd(param0: com.mapbox.android.gestures.ShoveGestureDetector): void;
					}
					export class SnapshotReadyCallback extends java.lang.Object {
						public static class: java.lang.Class<com.mapbox.mapboxsdk.maps.MapboxMap.SnapshotReadyCallback>;
						/**
						 * Constructs a new instance of the com.mapbox.mapboxsdk.maps.MapboxMap$SnapshotReadyCallback interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
						 */
						public constructor(implementation: {
							onSnapshotReady(param0: globalAndroid.graphics.Bitmap): void;
						});
						public constructor();
						public onSnapshotReady(param0: globalAndroid.graphics.Bitmap): void;
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export module maps {
				export class MapboxMapOptions extends java.lang.Object implements globalAndroid.os.Parcelable {
					public static class: java.lang.Class<com.mapbox.mapboxsdk.maps.MapboxMapOptions>;
					public static CREATOR: globalAndroid.os.Parcelable.Creator<com.mapbox.mapboxsdk.maps.MapboxMapOptions>;
					public isLocalIdeographFontFamilyEnabled(): boolean;
					public quickZoomGesturesEnabled(param0: boolean): com.mapbox.mapboxsdk.maps.MapboxMapOptions;
					public getQuickZoomGesturesEnabled(): boolean;
					public compassMargins(param0: native.Array<number>): com.mapbox.mapboxsdk.maps.MapboxMapOptions;
					public getScrollGesturesEnabled(): boolean;
					public getAttributionEnabled(): boolean;
					public getAttributionMargins(): native.Array<number>;
					public getCompassImage(): globalAndroid.graphics.drawable.Drawable;
					public getTextureMode(): boolean;
					public getMaxZoomPreference(): number;
					public getTiltGesturesEnabled(): boolean;
					public getPixelRatio(): number;
					/** @deprecated */
					public constructor();
					public compassImage(param0: globalAndroid.graphics.drawable.Drawable): com.mapbox.mapboxsdk.maps.MapboxMapOptions;
					public getDebugActive(): boolean;
					/** @deprecated */
					public getApiBaseUrl(): string;
					public compassFadesWhenFacingNorth(param0: boolean): com.mapbox.mapboxsdk.maps.MapboxMapOptions;
					public getCamera(): com.mapbox.mapboxsdk.camera.CameraPosition;
					public horizontalScrollGesturesEnabled(param0: boolean): com.mapbox.mapboxsdk.maps.MapboxMapOptions;
					public getForegroundLoadColor(): number;
					public getAttributionTintColor(): number;
					public getDoubleTapGesturesEnabled(): boolean;
					public attributionTintColor(param0: number): com.mapbox.mapboxsdk.maps.MapboxMapOptions;
					public debugActive(param0: boolean): com.mapbox.mapboxsdk.maps.MapboxMapOptions;
					public minZoomPreference(param0: number): com.mapbox.mapboxsdk.maps.MapboxMapOptions;
					public localIdeographFontFamilyEnabled(param0: boolean): com.mapbox.mapboxsdk.maps.MapboxMapOptions;
					public getCompassGravity(): number;
					public getRotateGesturesEnabled(): boolean;
					public tiltGesturesEnabled(param0: boolean): com.mapbox.mapboxsdk.maps.MapboxMapOptions;
					public getCompassEnabled(): boolean;
					public crossSourceCollisions(param0: boolean): com.mapbox.mapboxsdk.maps.MapboxMapOptions;
					public maxZoomPreference(param0: number): com.mapbox.mapboxsdk.maps.MapboxMapOptions;
					public compassGravity(param0: number): com.mapbox.mapboxsdk.maps.MapboxMapOptions;
					public getCrossSourceCollisions(): boolean;
					public attributionEnabled(param0: boolean): com.mapbox.mapboxsdk.maps.MapboxMapOptions;
					public writeToParcel(param0: globalAndroid.os.Parcel, param1: number): void;
					public logoEnabled(param0: boolean): com.mapbox.mapboxsdk.maps.MapboxMapOptions;
					public logoGravity(param0: number): com.mapbox.mapboxsdk.maps.MapboxMapOptions;
					/** @deprecated */
					public setPrefetchesTiles(param0: boolean): com.mapbox.mapboxsdk.maps.MapboxMapOptions;
					public localIdeographFontFamily(param0: string): com.mapbox.mapboxsdk.maps.MapboxMapOptions;
					public getTranslucentTextureSurface(): boolean;
					public rotateGesturesEnabled(param0: boolean): com.mapbox.mapboxsdk.maps.MapboxMapOptions;
					public camera(param0: com.mapbox.mapboxsdk.camera.CameraPosition): com.mapbox.mapboxsdk.maps.MapboxMapOptions;
					public getMinZoomPreference(): number;
					public scrollGesturesEnabled(param0: boolean): com.mapbox.mapboxsdk.maps.MapboxMapOptions;
					public getAttributionGravity(): number;
					public translucentTextureSurface(param0: boolean): com.mapbox.mapboxsdk.maps.MapboxMapOptions;
					public setPrefetchZoomDelta(param0: number): com.mapbox.mapboxsdk.maps.MapboxMapOptions;
					public getPrefetchZoomDelta(): number;
					public getCompassMargins(): native.Array<number>;
					public getLogoGravity(): number;
					public textureMode(param0: boolean): com.mapbox.mapboxsdk.maps.MapboxMapOptions;
					public getLogoMargins(): native.Array<number>;
					public getHorizontalScrollGesturesEnabled(): boolean;
					public attributionGravity(param0: number): com.mapbox.mapboxsdk.maps.MapboxMapOptions;
					/** @deprecated */
					public apiBaseUrl(param0: string): com.mapbox.mapboxsdk.maps.MapboxMapOptions;
					public hashCode(): number;
					public getCompassFadeFacingNorth(): boolean;
					public static createFromAttributes(param0: globalAndroid.content.Context): com.mapbox.mapboxsdk.maps.MapboxMapOptions;
					public attributionMargins(param0: native.Array<number>): com.mapbox.mapboxsdk.maps.MapboxMapOptions;
					public getZoomGesturesEnabled(): boolean;
					public renderSurfaceOnTop(param0: boolean): void;
					public localIdeographFontFamily(param0: native.Array<string>): com.mapbox.mapboxsdk.maps.MapboxMapOptions;
					public describeContents(): number;
					public getApiBaseUri(): string;
					public pixelRatio(param0: number): com.mapbox.mapboxsdk.maps.MapboxMapOptions;
					public zoomGesturesEnabled(param0: boolean): com.mapbox.mapboxsdk.maps.MapboxMapOptions;
					public getRenderSurfaceOnTop(): boolean;
					public compassEnabled(param0: boolean): com.mapbox.mapboxsdk.maps.MapboxMapOptions;
					public getLocalIdeographFontFamily(): string;
					public equals(param0: any): boolean;
					public foregroundLoadColor(param0: number): com.mapbox.mapboxsdk.maps.MapboxMapOptions;
					public getLogoEnabled(): boolean;
					public logoMargins(param0: native.Array<number>): com.mapbox.mapboxsdk.maps.MapboxMapOptions;
					public apiBaseUri(param0: string): com.mapbox.mapboxsdk.maps.MapboxMapOptions;
					/** @deprecated */
					public getPrefetchesTiles(): boolean;
					public static createFromAttributes(param0: globalAndroid.content.Context, param1: globalAndroid.util.AttributeSet): com.mapbox.mapboxsdk.maps.MapboxMapOptions;
					public doubleTapGesturesEnabled(param0: boolean): com.mapbox.mapboxsdk.maps.MapboxMapOptions;
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export module maps {
				export class MarkerContainer extends java.lang.Object implements com.mapbox.mapboxsdk.maps.Markers {
					public static class: java.lang.Class<com.mapbox.mapboxsdk.maps.MarkerContainer>;
					public update(param0: com.mapbox.mapboxsdk.annotations.Marker, param1: com.mapbox.mapboxsdk.maps.MapboxMap): void;
					public obtainAllIn(param0: globalAndroid.graphics.RectF): java.util.List<com.mapbox.mapboxsdk.annotations.Marker>;
					public addBy(param0: com.mapbox.mapboxsdk.annotations.BaseMarkerOptions<any,any>, param1: com.mapbox.mapboxsdk.maps.MapboxMap): com.mapbox.mapboxsdk.annotations.Marker;
					public reload(): void;
					public obtainAll(): java.util.List<com.mapbox.mapboxsdk.annotations.Marker>;
					public addBy(param0: java.util.List<any>, param1: com.mapbox.mapboxsdk.maps.MapboxMap): java.util.List<com.mapbox.mapboxsdk.annotations.Marker>;
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export module maps {
				export class Markers extends java.lang.Object {
					public static class: java.lang.Class<com.mapbox.mapboxsdk.maps.Markers>;
					/**
					 * Constructs a new instance of the com.mapbox.mapboxsdk.maps.Markers interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
					 */
					public constructor(implementation: {
						addBy(param0: com.mapbox.mapboxsdk.annotations.BaseMarkerOptions<any,any>, param1: com.mapbox.mapboxsdk.maps.MapboxMap): com.mapbox.mapboxsdk.annotations.Marker;
						addBy(param0: java.util.List<any>, param1: com.mapbox.mapboxsdk.maps.MapboxMap): java.util.List<com.mapbox.mapboxsdk.annotations.Marker>;
						update(param0: com.mapbox.mapboxsdk.annotations.Marker, param1: com.mapbox.mapboxsdk.maps.MapboxMap): void;
						obtainAll(): java.util.List<com.mapbox.mapboxsdk.annotations.Marker>;
						obtainAllIn(param0: globalAndroid.graphics.RectF): java.util.List<com.mapbox.mapboxsdk.annotations.Marker>;
						reload(): void;
					});
					public constructor();
					public update(param0: com.mapbox.mapboxsdk.annotations.Marker, param1: com.mapbox.mapboxsdk.maps.MapboxMap): void;
					public obtainAllIn(param0: globalAndroid.graphics.RectF): java.util.List<com.mapbox.mapboxsdk.annotations.Marker>;
					public addBy(param0: com.mapbox.mapboxsdk.annotations.BaseMarkerOptions<any,any>, param1: com.mapbox.mapboxsdk.maps.MapboxMap): com.mapbox.mapboxsdk.annotations.Marker;
					public reload(): void;
					public obtainAll(): java.util.List<com.mapbox.mapboxsdk.annotations.Marker>;
					public addBy(param0: java.util.List<any>, param1: com.mapbox.mapboxsdk.maps.MapboxMap): java.util.List<com.mapbox.mapboxsdk.annotations.Marker>;
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export module maps {
				export class NativeMap extends java.lang.Object {
					public static class: java.lang.Class<com.mapbox.mapboxsdk.maps.NativeMap>;
					/**
					 * Constructs a new instance of the com.mapbox.mapboxsdk.maps.NativeMap interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
					 */
					public constructor(implementation: {
						resizeView(param0: number, param1: number): void;
						onLowMemory(): void;
						destroy(): void;
						isDestroyed(): boolean;
						jumpTo(param0: com.mapbox.mapboxsdk.geometry.LatLng, param1: number, param2: number, param3: number, param4: native.Array<number>): void;
						easeTo(param0: com.mapbox.mapboxsdk.geometry.LatLng, param1: number, param2: number, param3: number, param4: native.Array<number>, param5: number, param6: boolean): void;
						flyTo(param0: com.mapbox.mapboxsdk.geometry.LatLng, param1: number, param2: number, param3: number, param4: native.Array<number>, param5: number): void;
						moveBy(param0: number, param1: number, param2: number): void;
						getCameraPosition(): com.mapbox.mapboxsdk.camera.CameraPosition;
						getCameraForLatLngBounds(param0: com.mapbox.mapboxsdk.geometry.LatLngBounds, param1: native.Array<number>, param2: number, param3: number): com.mapbox.mapboxsdk.camera.CameraPosition;
						getCameraForGeometry(param0: com.mapbox.geojson.Geometry, param1: native.Array<number>, param2: number, param3: number): com.mapbox.mapboxsdk.camera.CameraPosition;
						resetPosition(): void;
						setLatLng(param0: com.mapbox.mapboxsdk.geometry.LatLng, param1: number): void;
						getLatLng(): com.mapbox.mapboxsdk.geometry.LatLng;
						setLatLngBounds(param0: com.mapbox.mapboxsdk.geometry.LatLngBounds): void;
						setVisibleCoordinateBounds(param0: native.Array<com.mapbox.mapboxsdk.geometry.LatLng>, param1: globalAndroid.graphics.RectF, param2: number, param3: number): void;
						setPitch(param0: number, param1: number): void;
						getPitch(): number;
						setZoom(param0: number, param1: globalAndroid.graphics.PointF, param2: number): void;
						getZoom(): number;
						setMinZoom(param0: number): void;
						getMinZoom(): number;
						setMaxZoom(param0: number): void;
						getMaxZoom(): number;
						resetZoom(): void;
						rotateBy(param0: number, param1: number, param2: number, param3: number, param4: number): void;
						setBearing(param0: number, param1: number): void;
						setBearing(param0: number, param1: number, param2: number, param3: number): void;
						getBearing(): number;
						resetNorth(): void;
						cancelTransitions(): void;
						setStyleUri(param0: string): void;
						getStyleUri(): string;
						setStyleJson(param0: string): void;
						getStyleJson(): string;
						isFullyLoaded(): boolean;
						addLayer(param0: com.mapbox.mapboxsdk.style.layers.Layer): void;
						addLayerBelow(param0: com.mapbox.mapboxsdk.style.layers.Layer, param1: string): void;
						addLayerAbove(param0: com.mapbox.mapboxsdk.style.layers.Layer, param1: string): void;
						addLayerAt(param0: com.mapbox.mapboxsdk.style.layers.Layer, param1: number): void;
						getLayers(): java.util.List<com.mapbox.mapboxsdk.style.layers.Layer>;
						getLayer(param0: string): com.mapbox.mapboxsdk.style.layers.Layer;
						removeLayer(param0: string): boolean;
						removeLayer(param0: com.mapbox.mapboxsdk.style.layers.Layer): boolean;
						removeLayerAt(param0: number): boolean;
						addSource(param0: com.mapbox.mapboxsdk.style.sources.Source): void;
						getSources(): java.util.List<com.mapbox.mapboxsdk.style.sources.Source>;
						getSource(param0: string): com.mapbox.mapboxsdk.style.sources.Source;
						removeSource(param0: string): boolean;
						removeSource(param0: com.mapbox.mapboxsdk.style.sources.Source): boolean;
						setTransitionOptions(param0: com.mapbox.mapboxsdk.style.layers.TransitionOptions): void;
						getTransitionOptions(): com.mapbox.mapboxsdk.style.layers.TransitionOptions;
						addImages(param0: native.Array<com.mapbox.mapboxsdk.maps.Image>): void;
						getImage(param0: string): globalAndroid.graphics.Bitmap;
						removeImage(param0: string): void;
						getLight(): com.mapbox.mapboxsdk.style.light.Light;
						setContentPadding(param0: native.Array<number>): void;
						getContentPadding(): native.Array<number>;
						queryRenderedFeatures(param0: globalAndroid.graphics.PointF, param1: native.Array<string>, param2: com.mapbox.mapboxsdk.style.expressions.Expression): java.util.List<com.mapbox.geojson.Feature>;
						queryRenderedFeatures(param0: globalAndroid.graphics.RectF, param1: native.Array<string>, param2: com.mapbox.mapboxsdk.style.expressions.Expression): java.util.List<com.mapbox.geojson.Feature>;
						getMetersPerPixelAtLatitude(param0: number): number;
						projectedMetersForLatLng(param0: com.mapbox.mapboxsdk.geometry.LatLng): com.mapbox.mapboxsdk.geometry.ProjectedMeters;
						latLngForProjectedMeters(param0: com.mapbox.mapboxsdk.geometry.ProjectedMeters): com.mapbox.mapboxsdk.geometry.LatLng;
						pixelForLatLng(param0: com.mapbox.mapboxsdk.geometry.LatLng): globalAndroid.graphics.PointF;
						pixelsForLatLngs(param0: native.Array<number>, param1: native.Array<number>): void;
						getVisibleCoordinateBounds(param0: native.Array<number>): void;
						latLngForPixel(param0: globalAndroid.graphics.PointF): com.mapbox.mapboxsdk.geometry.LatLng;
						latLngsForPixels(param0: native.Array<number>, param1: native.Array<number>): void;
						setOnFpsChangedListener(param0: com.mapbox.mapboxsdk.maps.MapboxMap.OnFpsChangedListener): void;
						setDebug(param0: boolean): void;
						getDebug(): boolean;
						setReachability(param0: boolean): void;
						setApiBaseUrl(param0: string): void;
						setPrefetchTiles(param0: boolean): void;
						getPrefetchTiles(): boolean;
						setPrefetchZoomDelta(param0: number): void;
						getPrefetchZoomDelta(): number;
						setGestureInProgress(param0: boolean): void;
						getPixelRatio(): number;
						addMarker(param0: com.mapbox.mapboxsdk.annotations.Marker): number;
						addMarkers(param0: java.util.List<com.mapbox.mapboxsdk.annotations.Marker>): native.Array<number>;
						addPolyline(param0: com.mapbox.mapboxsdk.annotations.Polyline): number;
						addPolylines(param0: java.util.List<com.mapbox.mapboxsdk.annotations.Polyline>): native.Array<number>;
						addPolygon(param0: com.mapbox.mapboxsdk.annotations.Polygon): number;
						addPolygons(param0: java.util.List<com.mapbox.mapboxsdk.annotations.Polygon>): native.Array<number>;
						updateMarker(param0: com.mapbox.mapboxsdk.annotations.Marker): void;
						updatePolygon(param0: com.mapbox.mapboxsdk.annotations.Polygon): void;
						updatePolyline(param0: com.mapbox.mapboxsdk.annotations.Polyline): void;
						removeAnnotation(param0: number): void;
						removeAnnotations(param0: native.Array<number>): void;
						getTopOffsetPixelsForAnnotationSymbol(param0: string): number;
						addAnnotationIcon(param0: string, param1: number, param2: number, param3: number, param4: native.Array<number>): void;
						removeAnnotationIcon(param0: string): void;
						queryPointAnnotations(param0: globalAndroid.graphics.RectF): native.Array<number>;
						queryShapeAnnotations(param0: globalAndroid.graphics.RectF): native.Array<number>;
						getDensityDependantRectangle(param0: globalAndroid.graphics.RectF): globalAndroid.graphics.RectF;
						getNativePtr(): number;
						addSnapshotCallback(param0: com.mapbox.mapboxsdk.maps.MapboxMap.SnapshotReadyCallback): void;
					});
					public constructor();
					public setPrefetchTiles(param0: boolean): void;
					public latLngForProjectedMeters(param0: com.mapbox.mapboxsdk.geometry.ProjectedMeters): com.mapbox.mapboxsdk.geometry.LatLng;
					public getVisibleCoordinateBounds(param0: native.Array<number>): void;
					public getCameraPosition(): com.mapbox.mapboxsdk.camera.CameraPosition;
					public getPixelRatio(): number;
					public setPitch(param0: number, param1: number): void;
					public resetPosition(): void;
					public removeLayer(param0: com.mapbox.mapboxsdk.style.layers.Layer): boolean;
					public addLayerAbove(param0: com.mapbox.mapboxsdk.style.layers.Layer, param1: string): void;
					public flyTo(param0: com.mapbox.mapboxsdk.geometry.LatLng, param1: number, param2: number, param3: number, param4: native.Array<number>, param5: number): void;
					public addSource(param0: com.mapbox.mapboxsdk.style.sources.Source): void;
					public queryShapeAnnotations(param0: globalAndroid.graphics.RectF): native.Array<number>;
					public addLayerAt(param0: com.mapbox.mapboxsdk.style.layers.Layer, param1: number): void;
					public setContentPadding(param0: native.Array<number>): void;
					public setVisibleCoordinateBounds(param0: native.Array<com.mapbox.mapboxsdk.geometry.LatLng>, param1: globalAndroid.graphics.RectF, param2: number, param3: number): void;
					public addMarkers(param0: java.util.List<com.mapbox.mapboxsdk.annotations.Marker>): native.Array<number>;
					public setLatLngBounds(param0: com.mapbox.mapboxsdk.geometry.LatLngBounds): void;
					public queryRenderedFeatures(param0: globalAndroid.graphics.RectF, param1: native.Array<string>, param2: com.mapbox.mapboxsdk.style.expressions.Expression): java.util.List<com.mapbox.geojson.Feature>;
					public setDebug(param0: boolean): void;
					public getTopOffsetPixelsForAnnotationSymbol(param0: string): number;
					public cancelTransitions(): void;
					public getLayers(): java.util.List<com.mapbox.mapboxsdk.style.layers.Layer>;
					public pixelForLatLng(param0: com.mapbox.mapboxsdk.geometry.LatLng): globalAndroid.graphics.PointF;
					public removeSource(param0: com.mapbox.mapboxsdk.style.sources.Source): boolean;
					public getPrefetchTiles(): boolean;
					public getPrefetchZoomDelta(): number;
					public getImage(param0: string): globalAndroid.graphics.Bitmap;
					public removeAnnotationIcon(param0: string): void;
					public destroy(): void;
					public removeSource(param0: string): boolean;
					public setApiBaseUrl(param0: string): void;
					public removeLayerAt(param0: number): boolean;
					public getTransitionOptions(): com.mapbox.mapboxsdk.style.layers.TransitionOptions;
					public addPolygon(param0: com.mapbox.mapboxsdk.annotations.Polygon): number;
					public getStyleUri(): string;
					public getBearing(): number;
					public addMarker(param0: com.mapbox.mapboxsdk.annotations.Marker): number;
					public resetZoom(): void;
					public getSource(param0: string): com.mapbox.mapboxsdk.style.sources.Source;
					public addPolyline(param0: com.mapbox.mapboxsdk.annotations.Polyline): number;
					public addAnnotationIcon(param0: string, param1: number, param2: number, param3: number, param4: native.Array<number>): void;
					public getSources(): java.util.List<com.mapbox.mapboxsdk.style.sources.Source>;
					public isFullyLoaded(): boolean;
					public addLayer(param0: com.mapbox.mapboxsdk.style.layers.Layer): void;
					public removeImage(param0: string): void;
					public setOnFpsChangedListener(param0: com.mapbox.mapboxsdk.maps.MapboxMap.OnFpsChangedListener): void;
					public setStyleUri(param0: string): void;
					public getDebug(): boolean;
					public addSnapshotCallback(param0: com.mapbox.mapboxsdk.maps.MapboxMap.SnapshotReadyCallback): void;
					public onLowMemory(): void;
					public getMaxZoom(): number;
					public updatePolyline(param0: com.mapbox.mapboxsdk.annotations.Polyline): void;
					public addPolygons(param0: java.util.List<com.mapbox.mapboxsdk.annotations.Polygon>): native.Array<number>;
					public setTransitionOptions(param0: com.mapbox.mapboxsdk.style.layers.TransitionOptions): void;
					public queryPointAnnotations(param0: globalAndroid.graphics.RectF): native.Array<number>;
					public getCameraForLatLngBounds(param0: com.mapbox.mapboxsdk.geometry.LatLngBounds, param1: native.Array<number>, param2: number, param3: number): com.mapbox.mapboxsdk.camera.CameraPosition;
					public setBearing(param0: number, param1: number): void;
					public removeAnnotation(param0: number): void;
					public getLight(): com.mapbox.mapboxsdk.style.light.Light;
					public setReachability(param0: boolean): void;
					public setGestureInProgress(param0: boolean): void;
					public moveBy(param0: number, param1: number, param2: number): void;
					public setZoom(param0: number, param1: globalAndroid.graphics.PointF, param2: number): void;
					public isDestroyed(): boolean;
					public removeLayer(param0: string): boolean;
					public easeTo(param0: com.mapbox.mapboxsdk.geometry.LatLng, param1: number, param2: number, param3: number, param4: native.Array<number>, param5: number, param6: boolean): void;
					public resetNorth(): void;
					public addImages(param0: native.Array<com.mapbox.mapboxsdk.maps.Image>): void;
					public setLatLng(param0: com.mapbox.mapboxsdk.geometry.LatLng, param1: number): void;
					public setPrefetchZoomDelta(param0: number): void;
					public jumpTo(param0: com.mapbox.mapboxsdk.geometry.LatLng, param1: number, param2: number, param3: number, param4: native.Array<number>): void;
					public getMinZoom(): number;
					public getPitch(): number;
					public addPolylines(param0: java.util.List<com.mapbox.mapboxsdk.annotations.Polyline>): native.Array<number>;
					public setMinZoom(param0: number): void;
					public setStyleJson(param0: string): void;
					public updatePolygon(param0: com.mapbox.mapboxsdk.annotations.Polygon): void;
					public pixelsForLatLngs(param0: native.Array<number>, param1: native.Array<number>): void;
					public setBearing(param0: number, param1: number, param2: number, param3: number): void;
					public removeAnnotations(param0: native.Array<number>): void;
					public getDensityDependantRectangle(param0: globalAndroid.graphics.RectF): globalAndroid.graphics.RectF;
					public latLngsForPixels(param0: native.Array<number>, param1: native.Array<number>): void;
					public getMetersPerPixelAtLatitude(param0: number): number;
					public setMaxZoom(param0: number): void;
					public queryRenderedFeatures(param0: globalAndroid.graphics.PointF, param1: native.Array<string>, param2: com.mapbox.mapboxsdk.style.expressions.Expression): java.util.List<com.mapbox.geojson.Feature>;
					public resizeView(param0: number, param1: number): void;
					public getZoom(): number;
					public latLngForPixel(param0: globalAndroid.graphics.PointF): com.mapbox.mapboxsdk.geometry.LatLng;
					public getLayer(param0: string): com.mapbox.mapboxsdk.style.layers.Layer;
					public getContentPadding(): native.Array<number>;
					public getCameraForGeometry(param0: com.mapbox.geojson.Geometry, param1: native.Array<number>, param2: number, param3: number): com.mapbox.mapboxsdk.camera.CameraPosition;
					public projectedMetersForLatLng(param0: com.mapbox.mapboxsdk.geometry.LatLng): com.mapbox.mapboxsdk.geometry.ProjectedMeters;
					public updateMarker(param0: com.mapbox.mapboxsdk.annotations.Marker): void;
					public addLayerBelow(param0: com.mapbox.mapboxsdk.style.layers.Layer, param1: string): void;
					public rotateBy(param0: number, param1: number, param2: number, param3: number, param4: number): void;
					public getStyleJson(): string;
					public getNativePtr(): number;
					public getLatLng(): com.mapbox.mapboxsdk.geometry.LatLng;
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export module maps {
				export class NativeMapView extends java.lang.Object implements com.mapbox.mapboxsdk.maps.NativeMap {
					public static class: java.lang.Class<com.mapbox.mapboxsdk.maps.NativeMapView>;
					public setPrefetchTiles(param0: boolean): void;
					public latLngForProjectedMeters(param0: com.mapbox.mapboxsdk.geometry.ProjectedMeters): com.mapbox.mapboxsdk.geometry.LatLng;
					public getVisibleCoordinateBounds(param0: native.Array<number>): void;
					public constructor(param0: globalAndroid.content.Context, param1: boolean, param2: com.mapbox.mapboxsdk.maps.NativeMapView.ViewCallback, param3: com.mapbox.mapboxsdk.maps.NativeMapView.StateCallback, param4: com.mapbox.mapboxsdk.maps.renderer.MapRenderer);
					public getCameraPosition(): com.mapbox.mapboxsdk.camera.CameraPosition;
					public getPixelRatio(): number;
					public setPitch(param0: number, param1: number): void;
					public resetPosition(): void;
					public removeLayer(param0: com.mapbox.mapboxsdk.style.layers.Layer): boolean;
					public addLayerAbove(param0: com.mapbox.mapboxsdk.style.layers.Layer, param1: string): void;
					public flyTo(param0: com.mapbox.mapboxsdk.geometry.LatLng, param1: number, param2: number, param3: number, param4: native.Array<number>, param5: number): void;
					public queryShapeAnnotations(param0: globalAndroid.graphics.RectF): native.Array<number>;
					public addSource(param0: com.mapbox.mapboxsdk.style.sources.Source): void;
					public constructor(param0: globalAndroid.content.Context, param1: number, param2: boolean, param3: com.mapbox.mapboxsdk.maps.NativeMapView.ViewCallback, param4: com.mapbox.mapboxsdk.maps.NativeMapView.StateCallback, param5: com.mapbox.mapboxsdk.maps.renderer.MapRenderer);
					public addLayerAt(param0: com.mapbox.mapboxsdk.style.layers.Layer, param1: number): void;
					public setContentPadding(param0: native.Array<number>): void;
					public addMarkers(param0: java.util.List<com.mapbox.mapboxsdk.annotations.Marker>): native.Array<number>;
					public setVisibleCoordinateBounds(param0: native.Array<com.mapbox.mapboxsdk.geometry.LatLng>, param1: globalAndroid.graphics.RectF, param2: number, param3: number): void;
					public setLatLngBounds(param0: com.mapbox.mapboxsdk.geometry.LatLngBounds): void;
					public queryRenderedFeatures(param0: globalAndroid.graphics.RectF, param1: native.Array<string>, param2: com.mapbox.mapboxsdk.style.expressions.Expression): java.util.List<com.mapbox.geojson.Feature>;
					public setDebug(param0: boolean): void;
					public getTopOffsetPixelsForAnnotationSymbol(param0: string): number;
					public cancelTransitions(): void;
					public pixelForLatLng(param0: com.mapbox.mapboxsdk.geometry.LatLng): globalAndroid.graphics.PointF;
					public getLayers(): java.util.List<com.mapbox.mapboxsdk.style.layers.Layer>;
					public removeSource(param0: com.mapbox.mapboxsdk.style.sources.Source): boolean;
					public getPrefetchTiles(): boolean;
					public getPrefetchZoomDelta(): number;
					public removeAnnotationIcon(param0: string): void;
					public getImage(param0: string): globalAndroid.graphics.Bitmap;
					public destroy(): void;
					public removeSource(param0: string): boolean;
					public setApiBaseUrl(param0: string): void;
					public removeLayerAt(param0: number): boolean;
					public addPolygon(param0: com.mapbox.mapboxsdk.annotations.Polygon): number;
					public getTransitionOptions(): com.mapbox.mapboxsdk.style.layers.TransitionOptions;
					public getStyleUri(): string;
					public getBearing(): number;
					public addMarker(param0: com.mapbox.mapboxsdk.annotations.Marker): number;
					public resetZoom(): void;
					public getSource(param0: string): com.mapbox.mapboxsdk.style.sources.Source;
					public onSnapshotReady(param0: globalAndroid.graphics.Bitmap): void;
					public addPolyline(param0: com.mapbox.mapboxsdk.annotations.Polyline): number;
					public addAnnotationIcon(param0: string, param1: number, param2: number, param3: number, param4: native.Array<number>): void;
					public getSources(): java.util.List<com.mapbox.mapboxsdk.style.sources.Source>;
					public isFullyLoaded(): boolean;
					public addLayer(param0: com.mapbox.mapboxsdk.style.layers.Layer): void;
					public removeImage(param0: string): void;
					public setOnFpsChangedListener(param0: com.mapbox.mapboxsdk.maps.MapboxMap.OnFpsChangedListener): void;
					public setStyleUri(param0: string): void;
					public getDebug(): boolean;
					public addSnapshotCallback(param0: com.mapbox.mapboxsdk.maps.MapboxMap.SnapshotReadyCallback): void;
					public onLowMemory(): void;
					public getMaxZoom(): number;
					public updatePolyline(param0: com.mapbox.mapboxsdk.annotations.Polyline): void;
					public addPolygons(param0: java.util.List<com.mapbox.mapboxsdk.annotations.Polygon>): native.Array<number>;
					public setTransitionOptions(param0: com.mapbox.mapboxsdk.style.layers.TransitionOptions): void;
					public queryPointAnnotations(param0: globalAndroid.graphics.RectF): native.Array<number>;
					public getCameraForLatLngBounds(param0: com.mapbox.mapboxsdk.geometry.LatLngBounds, param1: native.Array<number>, param2: number, param3: number): com.mapbox.mapboxsdk.camera.CameraPosition;
					public setBearing(param0: number, param1: number): void;
					public removeAnnotation(param0: number): void;
					public getLight(): com.mapbox.mapboxsdk.style.light.Light;
					public setReachability(param0: boolean): void;
					public setGestureInProgress(param0: boolean): void;
					public moveBy(param0: number, param1: number, param2: number): void;
					public setZoom(param0: number, param1: globalAndroid.graphics.PointF, param2: number): void;
					public isDestroyed(): boolean;
					public removeLayer(param0: string): boolean;
					public resetNorth(): void;
					public easeTo(param0: com.mapbox.mapboxsdk.geometry.LatLng, param1: number, param2: number, param3: number, param4: native.Array<number>, param5: number, param6: boolean): void;
					public addImages(param0: native.Array<com.mapbox.mapboxsdk.maps.Image>): void;
					public setLatLng(param0: com.mapbox.mapboxsdk.geometry.LatLng, param1: number): void;
					public setPrefetchZoomDelta(param0: number): void;
					public jumpTo(param0: com.mapbox.mapboxsdk.geometry.LatLng, param1: number, param2: number, param3: number, param4: native.Array<number>): void;
					public getMinZoom(): number;
					public getPitch(): number;
					public addPolylines(param0: java.util.List<com.mapbox.mapboxsdk.annotations.Polyline>): native.Array<number>;
					public setMinZoom(param0: number): void;
					public setStyleJson(param0: string): void;
					public updatePolygon(param0: com.mapbox.mapboxsdk.annotations.Polygon): void;
					public pixelsForLatLngs(param0: native.Array<number>, param1: native.Array<number>): void;
					public setBearing(param0: number, param1: number, param2: number, param3: number): void;
					public removeAnnotations(param0: native.Array<number>): void;
					public getDensityDependantRectangle(param0: globalAndroid.graphics.RectF): globalAndroid.graphics.RectF;
					public latLngsForPixels(param0: native.Array<number>, param1: native.Array<number>): void;
					public getMetersPerPixelAtLatitude(param0: number): number;
					public setMaxZoom(param0: number): void;
					public queryRenderedFeatures(param0: globalAndroid.graphics.PointF, param1: native.Array<string>, param2: com.mapbox.mapboxsdk.style.expressions.Expression): java.util.List<com.mapbox.geojson.Feature>;
					public resizeView(param0: number, param1: number): void;
					public getZoom(): number;
					public latLngForPixel(param0: globalAndroid.graphics.PointF): com.mapbox.mapboxsdk.geometry.LatLng;
					public getLayer(param0: string): com.mapbox.mapboxsdk.style.layers.Layer;
					public getContentPadding(): native.Array<number>;
					public getCameraForGeometry(param0: com.mapbox.geojson.Geometry, param1: native.Array<number>, param2: number, param3: number): com.mapbox.mapboxsdk.camera.CameraPosition;
					public projectedMetersForLatLng(param0: com.mapbox.mapboxsdk.geometry.LatLng): com.mapbox.mapboxsdk.geometry.ProjectedMeters;
					public updateMarker(param0: com.mapbox.mapboxsdk.annotations.Marker): void;
					public addLayerBelow(param0: com.mapbox.mapboxsdk.style.layers.Layer, param1: string): void;
					public getStyleJson(): string;
					public rotateBy(param0: number, param1: number, param2: number, param3: number, param4: number): void;
					public getNativePtr(): number;
					public getLatLng(): com.mapbox.mapboxsdk.geometry.LatLng;
				}
				export module NativeMapView {
					export class StateCallback extends java.lang.Object implements com.mapbox.mapboxsdk.maps.NativeMapView.StyleCallback {
						public static class: java.lang.Class<com.mapbox.mapboxsdk.maps.NativeMapView.StateCallback>;
						/**
						 * Constructs a new instance of the com.mapbox.mapboxsdk.maps.NativeMapView$StateCallback interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
						 */
						public constructor(implementation: {
							onCameraWillChange(param0: boolean): void;
							onCameraIsChanging(): void;
							onCameraDidChange(param0: boolean): void;
							onDidFinishLoadingMap(): void;
							onDidFailLoadingMap(param0: string): void;
							onWillStartRenderingFrame(): void;
							onDidFinishRenderingFrame(param0: boolean): void;
							onWillStartRenderingMap(): void;
							onDidFinishRenderingMap(param0: boolean): void;
							onDidBecomeIdle(): void;
							onSourceChanged(param0: string): void;
							onStyleImageMissing(param0: string): void;
							onCanRemoveUnusedStyleImage(param0: string): boolean;
							onWillStartLoadingMap(): void;
							onDidFinishLoadingStyle(): void;
						});
						public constructor();
						public onDidBecomeIdle(): void;
						public onStyleImageMissing(param0: string): void;
						public onCameraWillChange(param0: boolean): void;
						public onDidFinishRenderingFrame(param0: boolean): void;
						public onDidFinishLoadingMap(): void;
						public onDidFailLoadingMap(param0: string): void;
						public onWillStartRenderingMap(): void;
						public onDidFinishRenderingMap(param0: boolean): void;
						public onCameraDidChange(param0: boolean): void;
						public onWillStartRenderingFrame(): void;
						public onCameraIsChanging(): void;
						public onWillStartLoadingMap(): void;
						public onCanRemoveUnusedStyleImage(param0: string): boolean;
						public onDidFinishLoadingStyle(): void;
						public onSourceChanged(param0: string): void;
					}
					export class StyleCallback extends java.lang.Object {
						public static class: java.lang.Class<com.mapbox.mapboxsdk.maps.NativeMapView.StyleCallback>;
						/**
						 * Constructs a new instance of the com.mapbox.mapboxsdk.maps.NativeMapView$StyleCallback interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
						 */
						public constructor(implementation: {
							onWillStartLoadingMap(): void;
							onDidFinishLoadingStyle(): void;
						});
						public constructor();
						public onWillStartLoadingMap(): void;
						public onDidFinishLoadingStyle(): void;
					}
					export class ViewCallback extends java.lang.Object {
						public static class: java.lang.Class<com.mapbox.mapboxsdk.maps.NativeMapView.ViewCallback>;
						/**
						 * Constructs a new instance of the com.mapbox.mapboxsdk.maps.NativeMapView$ViewCallback interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
						 */
						public constructor(implementation: {
							getViewContent(): globalAndroid.graphics.Bitmap;
						});
						public constructor();
						public getViewContent(): globalAndroid.graphics.Bitmap;
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export module maps {
				export class OnMapReadyCallback extends java.lang.Object {
					public static class: java.lang.Class<com.mapbox.mapboxsdk.maps.OnMapReadyCallback>;
					/**
					 * Constructs a new instance of the com.mapbox.mapboxsdk.maps.OnMapReadyCallback interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
					 */
					public constructor(implementation: {
						onMapReady(param0: com.mapbox.mapboxsdk.maps.MapboxMap): void;
					});
					public constructor();
					public onMapReady(param0: com.mapbox.mapboxsdk.maps.MapboxMap): void;
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export module maps {
				export class PolygonContainer extends java.lang.Object implements com.mapbox.mapboxsdk.maps.Polygons {
					public static class: java.lang.Class<com.mapbox.mapboxsdk.maps.PolygonContainer>;
					public obtainAll(): java.util.List<com.mapbox.mapboxsdk.annotations.Polygon>;
					public update(param0: com.mapbox.mapboxsdk.annotations.Polygon): void;
					public addBy(param0: java.util.List<com.mapbox.mapboxsdk.annotations.PolygonOptions>, param1: com.mapbox.mapboxsdk.maps.MapboxMap): java.util.List<com.mapbox.mapboxsdk.annotations.Polygon>;
					public addBy(param0: com.mapbox.mapboxsdk.annotations.PolygonOptions, param1: com.mapbox.mapboxsdk.maps.MapboxMap): com.mapbox.mapboxsdk.annotations.Polygon;
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export module maps {
				export class Polygons extends java.lang.Object {
					public static class: java.lang.Class<com.mapbox.mapboxsdk.maps.Polygons>;
					/**
					 * Constructs a new instance of the com.mapbox.mapboxsdk.maps.Polygons interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
					 */
					public constructor(implementation: {
						addBy(param0: com.mapbox.mapboxsdk.annotations.PolygonOptions, param1: com.mapbox.mapboxsdk.maps.MapboxMap): com.mapbox.mapboxsdk.annotations.Polygon;
						addBy(param0: java.util.List<com.mapbox.mapboxsdk.annotations.PolygonOptions>, param1: com.mapbox.mapboxsdk.maps.MapboxMap): java.util.List<com.mapbox.mapboxsdk.annotations.Polygon>;
						update(param0: com.mapbox.mapboxsdk.annotations.Polygon): void;
						obtainAll(): java.util.List<com.mapbox.mapboxsdk.annotations.Polygon>;
					});
					public constructor();
					public obtainAll(): java.util.List<com.mapbox.mapboxsdk.annotations.Polygon>;
					public update(param0: com.mapbox.mapboxsdk.annotations.Polygon): void;
					public addBy(param0: java.util.List<com.mapbox.mapboxsdk.annotations.PolygonOptions>, param1: com.mapbox.mapboxsdk.maps.MapboxMap): java.util.List<com.mapbox.mapboxsdk.annotations.Polygon>;
					public addBy(param0: com.mapbox.mapboxsdk.annotations.PolygonOptions, param1: com.mapbox.mapboxsdk.maps.MapboxMap): com.mapbox.mapboxsdk.annotations.Polygon;
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export module maps {
				export class PolylineContainer extends java.lang.Object implements com.mapbox.mapboxsdk.maps.Polylines {
					public static class: java.lang.Class<com.mapbox.mapboxsdk.maps.PolylineContainer>;
					public obtainAll(): java.util.List<com.mapbox.mapboxsdk.annotations.Polyline>;
					public update(param0: com.mapbox.mapboxsdk.annotations.Polyline): void;
					public addBy(param0: com.mapbox.mapboxsdk.annotations.PolylineOptions, param1: com.mapbox.mapboxsdk.maps.MapboxMap): com.mapbox.mapboxsdk.annotations.Polyline;
					public addBy(param0: java.util.List<com.mapbox.mapboxsdk.annotations.PolylineOptions>, param1: com.mapbox.mapboxsdk.maps.MapboxMap): java.util.List<com.mapbox.mapboxsdk.annotations.Polyline>;
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export module maps {
				export class Polylines extends java.lang.Object {
					public static class: java.lang.Class<com.mapbox.mapboxsdk.maps.Polylines>;
					/**
					 * Constructs a new instance of the com.mapbox.mapboxsdk.maps.Polylines interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
					 */
					public constructor(implementation: {
						addBy(param0: com.mapbox.mapboxsdk.annotations.PolylineOptions, param1: com.mapbox.mapboxsdk.maps.MapboxMap): com.mapbox.mapboxsdk.annotations.Polyline;
						addBy(param0: java.util.List<com.mapbox.mapboxsdk.annotations.PolylineOptions>, param1: com.mapbox.mapboxsdk.maps.MapboxMap): java.util.List<com.mapbox.mapboxsdk.annotations.Polyline>;
						update(param0: com.mapbox.mapboxsdk.annotations.Polyline): void;
						obtainAll(): java.util.List<com.mapbox.mapboxsdk.annotations.Polyline>;
					});
					public constructor();
					public obtainAll(): java.util.List<com.mapbox.mapboxsdk.annotations.Polyline>;
					public update(param0: com.mapbox.mapboxsdk.annotations.Polyline): void;
					public addBy(param0: com.mapbox.mapboxsdk.annotations.PolylineOptions, param1: com.mapbox.mapboxsdk.maps.MapboxMap): com.mapbox.mapboxsdk.annotations.Polyline;
					public addBy(param0: java.util.List<com.mapbox.mapboxsdk.annotations.PolylineOptions>, param1: com.mapbox.mapboxsdk.maps.MapboxMap): java.util.List<com.mapbox.mapboxsdk.annotations.Polyline>;
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export module maps {
				export class Projection extends java.lang.Object {
					public static class: java.lang.Class<com.mapbox.mapboxsdk.maps.Projection>;
					/** @deprecated */
					public invalidateContentPadding(): void;
					public getProjectedMetersForLatLng(param0: com.mapbox.mapboxsdk.geometry.LatLng): com.mapbox.mapboxsdk.geometry.ProjectedMeters;
					public getVisibleRegion(): com.mapbox.mapboxsdk.geometry.VisibleRegion;
					public toScreenLocation(param0: com.mapbox.mapboxsdk.geometry.LatLng): globalAndroid.graphics.PointF;
					public getMetersPerPixelAtLatitude(param0: number): number;
					public getVisibleRegion(param0: boolean): com.mapbox.mapboxsdk.geometry.VisibleRegion;
					public getLatLngForProjectedMeters(param0: com.mapbox.mapboxsdk.geometry.ProjectedMeters): com.mapbox.mapboxsdk.geometry.LatLng;
					public fromScreenLocations(param0: native.Array<number>, param1: native.Array<number>): void;
					public getVisibleCoordinateBounds(param0: native.Array<number>): void;
					public toScreenLocations(param0: native.Array<number>, param1: native.Array<number>): void;
					public calculateZoom(param0: number): number;
					public fromScreenLocation(param0: globalAndroid.graphics.PointF): com.mapbox.mapboxsdk.geometry.LatLng;
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export module maps {
				export class ShapeAnnotationContainer extends java.lang.Object implements com.mapbox.mapboxsdk.maps.ShapeAnnotations {
					public static class: java.lang.Class<com.mapbox.mapboxsdk.maps.ShapeAnnotationContainer>;
					public obtainAllIn(param0: globalAndroid.graphics.RectF): java.util.List<com.mapbox.mapboxsdk.annotations.Annotation>;
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export module maps {
				export class ShapeAnnotations extends java.lang.Object {
					public static class: java.lang.Class<com.mapbox.mapboxsdk.maps.ShapeAnnotations>;
					/**
					 * Constructs a new instance of the com.mapbox.mapboxsdk.maps.ShapeAnnotations interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
					 */
					public constructor(implementation: {
						obtainAllIn(param0: globalAndroid.graphics.RectF): java.util.List<com.mapbox.mapboxsdk.annotations.Annotation>;
					});
					public constructor();
					public obtainAllIn(param0: globalAndroid.graphics.RectF): java.util.List<com.mapbox.mapboxsdk.annotations.Annotation>;
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export module maps {
				export class Style extends java.lang.Object {
					public static class: java.lang.Class<com.mapbox.mapboxsdk.maps.Style>;
					public static MAPBOX_STREETS: string;
					public static OUTDOORS: string;
					public static LIGHT: string;
					public static DARK: string;
					public static SATELLITE: string;
					public static SATELLITE_STREETS: string;
					public static TRAFFIC_DAY: string;
					public static TRAFFIC_NIGHT: string;
					public addImage(param0: string, param1: globalAndroid.graphics.Bitmap, param2: boolean): void;
					public getJson(): string;
					public getSourceAs(param0: string): com.mapbox.mapboxsdk.style.sources.Source;
					/** @deprecated */
					public getUrl(): string;
					public getLayers(): java.util.List<com.mapbox.mapboxsdk.style.layers.Layer>;
					public getUri(): string;
					public removeSource(param0: com.mapbox.mapboxsdk.style.sources.Source): boolean;
					public addImages(param0: java.util.HashMap<string,globalAndroid.graphics.Bitmap>): void;
					public addImages(param0: java.util.HashMap<string,globalAndroid.graphics.Bitmap>, param1: boolean): void;
					public getImage(param0: string): globalAndroid.graphics.Bitmap;
					public removeSource(param0: string): boolean;
					public removeLayerAt(param0: number): boolean;
					public setTransition(param0: com.mapbox.mapboxsdk.style.layers.TransitionOptions): void;
					public removeLayer(param0: com.mapbox.mapboxsdk.style.layers.Layer): boolean;
					public addLayerAbove(param0: com.mapbox.mapboxsdk.style.layers.Layer, param1: string): void;
					public addImage(param0: string, param1: globalAndroid.graphics.drawable.Drawable): void;
					public getLight(): com.mapbox.mapboxsdk.style.light.Light;
					public getTransition(): com.mapbox.mapboxsdk.style.layers.TransitionOptions;
					public getLayer(param0: string): com.mapbox.mapboxsdk.style.layers.Layer;
					public getLayerAs(param0: string): com.mapbox.mapboxsdk.style.layers.Layer;
					public addImageAsync(param0: string, param1: globalAndroid.graphics.Bitmap, param2: boolean): void;
					public addImagesAsync(param0: java.util.HashMap<string,globalAndroid.graphics.Bitmap>): void;
					public addImage(param0: string, param1: globalAndroid.graphics.Bitmap): void;
					public removeLayer(param0: string): boolean;
					public addSource(param0: com.mapbox.mapboxsdk.style.sources.Source): void;
					public getSource(param0: string): com.mapbox.mapboxsdk.style.sources.Source;
					public addImageAsync(param0: string, param1: globalAndroid.graphics.drawable.Drawable): void;
					public addImagesAsync(param0: java.util.HashMap<string,globalAndroid.graphics.Bitmap>, param1: boolean): void;
					public addLayerBelow(param0: com.mapbox.mapboxsdk.style.layers.Layer, param1: string): void;
					public addImageAsync(param0: string, param1: globalAndroid.graphics.Bitmap): void;
					public getSources(): java.util.List<com.mapbox.mapboxsdk.style.sources.Source>;
					public addLayerAt(param0: com.mapbox.mapboxsdk.style.layers.Layer, param1: number): void;
					public isFullyLoaded(): boolean;
					public addLayer(param0: com.mapbox.mapboxsdk.style.layers.Layer): void;
					public removeImage(param0: string): void;
				}
				export module Style {
					export class BitmapImageConversionTask extends globalAndroid.os.AsyncTask<com.mapbox.mapboxsdk.maps.Style.Builder.ImageWrapper,java.lang.Void,native.Array<com.mapbox.mapboxsdk.maps.Image>> {
						public static class: java.lang.Class<com.mapbox.mapboxsdk.maps.Style.BitmapImageConversionTask>;
						public onPostExecute(param0: any): void;
						public onPostExecute(param0: native.Array<com.mapbox.mapboxsdk.maps.Image>): void;
						public doInBackground(param0: native.Array<any>): any;
						public doInBackground(param0: native.Array<com.mapbox.mapboxsdk.maps.Style.Builder.ImageWrapper>): native.Array<com.mapbox.mapboxsdk.maps.Image>;
					}
					export class Builder extends java.lang.Object {
						public static class: java.lang.Class<com.mapbox.mapboxsdk.maps.Style.Builder>;
						public constructor();
						/** @deprecated */
						public fromUrl(param0: string): com.mapbox.mapboxsdk.maps.Style.Builder;
						public withLayerBelow(param0: com.mapbox.mapboxsdk.style.layers.Layer, param1: string): com.mapbox.mapboxsdk.maps.Style.Builder;
						public withLayer(param0: com.mapbox.mapboxsdk.style.layers.Layer): com.mapbox.mapboxsdk.maps.Style.Builder;
						public withImage(param0: string, param1: globalAndroid.graphics.Bitmap, param2: boolean): com.mapbox.mapboxsdk.maps.Style.Builder;
						public withSource(param0: com.mapbox.mapboxsdk.style.sources.Source): com.mapbox.mapboxsdk.maps.Style.Builder;
						public withSources(param0: native.Array<com.mapbox.mapboxsdk.style.sources.Source>): com.mapbox.mapboxsdk.maps.Style.Builder;
						public withLayerAbove(param0: com.mapbox.mapboxsdk.style.layers.Layer, param1: string): com.mapbox.mapboxsdk.maps.Style.Builder;
						public withDrawableImages(param0: native.Array<globalAndroid.util.Pair<string,globalAndroid.graphics.drawable.Drawable>>): com.mapbox.mapboxsdk.maps.Style.Builder;
						public withBitmapImages(param0: native.Array<globalAndroid.util.Pair<string,globalAndroid.graphics.Bitmap>>): com.mapbox.mapboxsdk.maps.Style.Builder;
						public fromJson(param0: string): com.mapbox.mapboxsdk.maps.Style.Builder;
						public fromUri(param0: string): com.mapbox.mapboxsdk.maps.Style.Builder;
						public withBitmapImages(param0: boolean, param1: native.Array<globalAndroid.util.Pair<string,globalAndroid.graphics.Bitmap>>): com.mapbox.mapboxsdk.maps.Style.Builder;
						public withTransition(param0: com.mapbox.mapboxsdk.style.layers.TransitionOptions): com.mapbox.mapboxsdk.maps.Style.Builder;
						public withLayers(param0: native.Array<com.mapbox.mapboxsdk.style.layers.Layer>): com.mapbox.mapboxsdk.maps.Style.Builder;
						public withImage(param0: string, param1: globalAndroid.graphics.drawable.Drawable): com.mapbox.mapboxsdk.maps.Style.Builder;
						public withLayerAt(param0: com.mapbox.mapboxsdk.style.layers.Layer, param1: number): com.mapbox.mapboxsdk.maps.Style.Builder;
						public withImage(param0: string, param1: globalAndroid.graphics.Bitmap): com.mapbox.mapboxsdk.maps.Style.Builder;
						public withImage(param0: string, param1: globalAndroid.graphics.drawable.Drawable, param2: boolean): com.mapbox.mapboxsdk.maps.Style.Builder;
						public withDrawableImages(param0: boolean, param1: native.Array<globalAndroid.util.Pair<string,globalAndroid.graphics.drawable.Drawable>>): com.mapbox.mapboxsdk.maps.Style.Builder;
					}
					export module Builder {
						export class ImageWrapper extends java.lang.Object {
							public static class: java.lang.Class<com.mapbox.mapboxsdk.maps.Style.Builder.ImageWrapper>;
						}
						export class LayerAboveWrapper extends com.mapbox.mapboxsdk.maps.Style.Builder.LayerWrapper {
							public static class: java.lang.Class<com.mapbox.mapboxsdk.maps.Style.Builder.LayerAboveWrapper>;
						}
						export class LayerAtWrapper extends com.mapbox.mapboxsdk.maps.Style.Builder.LayerWrapper {
							public static class: java.lang.Class<com.mapbox.mapboxsdk.maps.Style.Builder.LayerAtWrapper>;
						}
						export class LayerBelowWrapper extends com.mapbox.mapboxsdk.maps.Style.Builder.LayerWrapper {
							public static class: java.lang.Class<com.mapbox.mapboxsdk.maps.Style.Builder.LayerBelowWrapper>;
						}
						export class LayerWrapper extends java.lang.Object {
							public static class: java.lang.Class<com.mapbox.mapboxsdk.maps.Style.Builder.LayerWrapper>;
						}
					}
					export class OnStyleLoaded extends java.lang.Object {
						public static class: java.lang.Class<com.mapbox.mapboxsdk.maps.Style.OnStyleLoaded>;
						/**
						 * Constructs a new instance of the com.mapbox.mapboxsdk.maps.Style$OnStyleLoaded interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
						 */
						public constructor(implementation: {
							onStyleLoaded(param0: com.mapbox.mapboxsdk.maps.Style): void;
						});
						public constructor();
						public onStyleLoaded(param0: com.mapbox.mapboxsdk.maps.Style): void;
					}
					export class StyleUrl extends java.lang.Object implements java.lang.annotation.Annotation {
						public static class: java.lang.Class<com.mapbox.mapboxsdk.maps.Style.StyleUrl>;
						/**
						 * Constructs a new instance of the com.mapbox.mapboxsdk.maps.Style$StyleUrl interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
						 */
						public constructor(implementation: {
							equals(param0: any): boolean;
							hashCode(): number;
							toString(): string;
							annotationType(): java.lang.Class<any>;
						});
						public constructor();
						public equals(param0: any): boolean;
						public hashCode(): number;
						public toString(): string;
						public annotationType(): java.lang.Class<any>;
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export module maps {
				export class SupportMapFragment implements com.mapbox.mapboxsdk.maps.OnMapReadyCallback {
					public static class: java.lang.Class<com.mapbox.mapboxsdk.maps.SupportMapFragment>;
					public onMapReady(param0: com.mapbox.mapboxsdk.maps.MapboxMap): void;
					public onSaveInstanceState(param0: globalAndroid.os.Bundle): void;
					public onAttach(param0: globalAndroid.content.Context): void;
					public static newInstance(param0: com.mapbox.mapboxsdk.maps.MapboxMapOptions): com.mapbox.mapboxsdk.maps.SupportMapFragment;
					public onCreateView(param0: globalAndroid.view.LayoutInflater, param1: globalAndroid.view.ViewGroup, param2: globalAndroid.os.Bundle): globalAndroid.view.View;
					public onDestroyView(): void;
					public onInflate(param0: globalAndroid.content.Context, param1: globalAndroid.util.AttributeSet, param2: globalAndroid.os.Bundle): void;
					public onDestroy(): void;
					public static newInstance(): com.mapbox.mapboxsdk.maps.SupportMapFragment;
					public onResume(): void;
					public onLowMemory(): void;
					public onStart(): void;
					public getMapAsync(param0: com.mapbox.mapboxsdk.maps.OnMapReadyCallback): void;
					public constructor();
					public onPause(): void;
					public onStop(): void;
					public onViewCreated(param0: globalAndroid.view.View, param1: globalAndroid.os.Bundle): void;
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export module maps {
				export class TelemetryDefinition extends java.lang.Object {
					public static class: java.lang.Class<com.mapbox.mapboxsdk.maps.TelemetryDefinition>;
					/**
					 * Constructs a new instance of the com.mapbox.mapboxsdk.maps.TelemetryDefinition interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
					 */
					public constructor(implementation: {
						onAppUserTurnstileEvent(): void;
						onGestureInteraction(param0: string, param1: number, param2: number, param3: number): void;
						setUserTelemetryRequestState(param0: boolean): void;
						disableTelemetrySession(): void;
						setDebugLoggingEnabled(param0: boolean): void;
						setSessionIdRotationInterval(param0: number): boolean;
						onCreateOfflineRegion(param0: com.mapbox.mapboxsdk.offline.OfflineRegionDefinition): void;
						onPerformanceEvent(param0: globalAndroid.os.Bundle): void;
					});
					public constructor();
					/** @deprecated */
					public onGestureInteraction(param0: string, param1: number, param2: number, param3: number): void;
					public setDebugLoggingEnabled(param0: boolean): void;
					public onAppUserTurnstileEvent(): void;
					public setUserTelemetryRequestState(param0: boolean): void;
					public onCreateOfflineRegion(param0: com.mapbox.mapboxsdk.offline.OfflineRegionDefinition): void;
					public disableTelemetrySession(): void;
					public setSessionIdRotationInterval(param0: number): boolean;
					public onPerformanceEvent(param0: globalAndroid.os.Bundle): void;
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export module maps {
				export class Transform extends java.lang.Object implements com.mapbox.mapboxsdk.maps.MapView.OnCameraDidChangeListener {
					public static class: java.lang.Class<com.mapbox.mapboxsdk.maps.Transform>;
					public getCameraPosition(): com.mapbox.mapboxsdk.camera.CameraPosition;
					public moveCamera(param0: com.mapbox.mapboxsdk.maps.MapboxMap, param1: com.mapbox.mapboxsdk.camera.CameraUpdate, param2: com.mapbox.mapboxsdk.maps.MapboxMap.CancelableCallback): void;
					public onCameraDidChange(param0: boolean): void;
					public animateCamera(param0: com.mapbox.mapboxsdk.maps.MapboxMap, param1: com.mapbox.mapboxsdk.camera.CameraUpdate, param2: number, param3: com.mapbox.mapboxsdk.maps.MapboxMap.CancelableCallback): void;
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export module maps {
				export class UiSettings extends java.lang.Object {
					public static class: java.lang.Class<com.mapbox.mapboxsdk.maps.UiSettings>;
					public setFocalPoint(param0: globalAndroid.graphics.PointF): void;
					public isCompassFadeWhenFacingNorth(): boolean;
					public setLogoMargins(param0: number, param1: number, param2: number, param3: number): void;
					public setScaleVelocityAnimationEnabled(param0: boolean): void;
					public getLogoMarginLeft(): number;
					public setAttributionEnabled(param0: boolean): void;
					public getCompassImage(): globalAndroid.graphics.drawable.Drawable;
					public setAttributionMargins(param0: number, param1: number, param2: number, param3: number): void;
					public setRotateVelocityAnimationEnabled(param0: boolean): void;
					public getAttributionDialogManager(): com.mapbox.mapboxsdk.maps.AttributionDialogManager;
					public getAttributionMarginTop(): number;
					public isDoubleTapGesturesEnabled(): boolean;
					public isQuickZoomGesturesEnabled(): boolean;
					public isIncreaseScaleThresholdWhenRotating(): boolean;
					public getAttributionMarginBottom(): number;
					public isDeselectMarkersOnTap(): boolean;
					public setQuickZoomGesturesEnabled(param0: boolean): void;
					public setZoomRate(param0: number): void;
					public setAttributionTintColor(param0: number): void;
					public setLogoGravity(param0: number): void;
					public getLogoMarginRight(): number;
					public getHeight(): number;
					public setTiltGesturesEnabled(param0: boolean): void;
					public setDoubleTapGesturesEnabled(param0: boolean): void;
					public getCompassGravity(): number;
					public setLogoEnabled(param0: boolean): void;
					public getAttributionMarginLeft(): number;
					public setScrollGesturesEnabled(param0: boolean): void;
					public setCompassImage(param0: globalAndroid.graphics.drawable.Drawable): void;
					public getFocalPoint(): globalAndroid.graphics.PointF;
					public getCompassMarginBottom(): number;
					public setCompassEnabled(param0: boolean): void;
					public setAllVelocityAnimationsEnabled(param0: boolean): void;
					public invalidate(): void;
					public isCompassEnabled(): boolean;
					public isZoomGesturesEnabled(): boolean;
					public setIncreaseScaleThresholdWhenRotating(param0: boolean): void;
					public setCompassMargins(param0: number, param1: number, param2: number, param3: number): void;
					public getAttributionGravity(): number;
					public setDeselectMarkersOnTap(param0: boolean): void;
					public setFlingVelocityAnimationEnabled(param0: boolean): void;
					public getLogoMarginTop(): number;
					public getLogoGravity(): number;
					public getLogoMarginBottom(): number;
					public setAttributionDialogManager(param0: com.mapbox.mapboxsdk.maps.AttributionDialogManager): void;
					public isFlingVelocityAnimationEnabled(): boolean;
					public getCompassMarginLeft(): number;
					public isScrollGesturesEnabled(): boolean;
					public isRotateGesturesEnabled(): boolean;
					public setZoomGesturesEnabled(param0: boolean): void;
					public setCompassGravity(param0: number): void;
					public setDisableRotateWhenScaling(param0: boolean): void;
					public setCompassFadeFacingNorth(param0: boolean): void;
					public isTiltGesturesEnabled(): boolean;
					public getZoomRate(): number;
					public getCompassMarginRight(): number;
					public setAttributionGravity(param0: number): void;
					/** @deprecated */
					public isIncreaseRotateThresholdWhenScaling(): boolean;
					public isScaleVelocityAnimationEnabled(): boolean;
					public getWidth(): number;
					public isDisableRotateWhenScaling(): boolean;
					public getCompassMarginTop(): number;
					public isAttributionEnabled(): boolean;
					public setRotateGesturesEnabled(param0: boolean): void;
					public isRotateVelocityAnimationEnabled(): boolean;
					public isLogoEnabled(): boolean;
					public setHorizontalScrollGesturesEnabled(param0: boolean): void;
					/** @deprecated */
					public setIncreaseRotateThresholdWhenScaling(param0: boolean): void;
					public getAttributionMarginRight(): number;
					public areAllGesturesEnabled(): boolean;
					public isHorizontalScrollGesturesEnabled(): boolean;
					public setAllGesturesEnabled(param0: boolean): void;
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export module maps {
				export module renderer {
					export abstract class MapRenderer extends java.lang.Object implements com.mapbox.mapboxsdk.maps.renderer.MapRendererScheduler {
						public static class: java.lang.Class<com.mapbox.mapboxsdk.maps.renderer.MapRenderer>;
						public nativeReset(): void;
						public queueEvent(param0: java.lang.Runnable): void;
						public onResume(): void;
						public onSurfaceCreated(param0: javax.microedition.khronos.opengles.GL10, param1: javax.microedition.khronos.egl.EGLConfig): void;
						public setOnFpsChangedListener(param0: com.mapbox.mapboxsdk.maps.MapboxMap.OnFpsChangedListener): void;
						public constructor(param0: globalAndroid.content.Context, param1: string);
						public onStop(): void;
						public setMaximumFps(param0: number): void;
						public onPause(): void;
						public finalize(): void;
						public onSurfaceDestroyed(): void;
						public requestRender(): void;
						public onDestroy(): void;
						public onSurfaceChanged(param0: javax.microedition.khronos.opengles.GL10, param1: number, param2: number): void;
						public onStart(): void;
						public onDrawFrame(param0: javax.microedition.khronos.opengles.GL10): void;
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export module maps {
				export module renderer {
					export class MapRendererRunnable extends java.lang.Object implements java.lang.Runnable {
						public static class: java.lang.Class<com.mapbox.mapboxsdk.maps.renderer.MapRendererRunnable>;
						public run(): void;
						public finalize(): void;
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export module maps {
				export module renderer {
					export class MapRendererScheduler extends java.lang.Object {
						public static class: java.lang.Class<com.mapbox.mapboxsdk.maps.renderer.MapRendererScheduler>;
						/**
						 * Constructs a new instance of the com.mapbox.mapboxsdk.maps.renderer.MapRendererScheduler interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
						 */
						public constructor(implementation: {
							requestRender(): void;
							queueEvent(param0: java.lang.Runnable): void;
						});
						public constructor();
						public queueEvent(param0: java.lang.Runnable): void;
						public requestRender(): void;
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export module maps {
				export module renderer {
					export module egl {
						export class EGLConfigChooser extends java.lang.Object implements globalAndroid.opengl.GLSurfaceView.EGLConfigChooser {
							public static class: java.lang.Class<com.mapbox.mapboxsdk.maps.renderer.egl.EGLConfigChooser>;
							public constructor();
							public constructor(param0: boolean);
							public chooseConfig(param0: javax.microedition.khronos.egl.EGL10, param1: javax.microedition.khronos.egl.EGLDisplay): javax.microedition.khronos.egl.EGLConfig;
						}
						export module EGLConfigChooser {
							export class BufferFormat {
								public static class: java.lang.Class<com.mapbox.mapboxsdk.maps.renderer.egl.EGLConfigChooser.BufferFormat>;
								public static Format16Bit: com.mapbox.mapboxsdk.maps.renderer.egl.EGLConfigChooser.BufferFormat;
								public static Format32BitNoAlpha: com.mapbox.mapboxsdk.maps.renderer.egl.EGLConfigChooser.BufferFormat;
								public static Format32BitAlpha: com.mapbox.mapboxsdk.maps.renderer.egl.EGLConfigChooser.BufferFormat;
								public static Format24Bit: com.mapbox.mapboxsdk.maps.renderer.egl.EGLConfigChooser.BufferFormat;
								public static Unknown: com.mapbox.mapboxsdk.maps.renderer.egl.EGLConfigChooser.BufferFormat;
								public static valueOf(param0: string): com.mapbox.mapboxsdk.maps.renderer.egl.EGLConfigChooser.BufferFormat;
								public static valueOf(param0: java.lang.Class<any>, param1: string): java.lang.Enum<any>;
								public static values(): native.Array<com.mapbox.mapboxsdk.maps.renderer.egl.EGLConfigChooser.BufferFormat>;
							}
							export class DepthStencilFormat {
								public static class: java.lang.Class<com.mapbox.mapboxsdk.maps.renderer.egl.EGLConfigChooser.DepthStencilFormat>;
								public static Format16Depth8Stencil: com.mapbox.mapboxsdk.maps.renderer.egl.EGLConfigChooser.DepthStencilFormat;
								public static Format24Depth8Stencil: com.mapbox.mapboxsdk.maps.renderer.egl.EGLConfigChooser.DepthStencilFormat;
								public static values(): native.Array<com.mapbox.mapboxsdk.maps.renderer.egl.EGLConfigChooser.DepthStencilFormat>;
								public static valueOf(param0: java.lang.Class<any>, param1: string): java.lang.Enum<any>;
								public static valueOf(param0: string): com.mapbox.mapboxsdk.maps.renderer.egl.EGLConfigChooser.DepthStencilFormat;
							}
						}
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export module maps {
				export module renderer {
					export module egl {
						export class EGLConfigException extends java.lang.RuntimeException {
							public static class: java.lang.Class<com.mapbox.mapboxsdk.maps.renderer.egl.EGLConfigException>;
							public constructor();
							public constructor(param0: string);
							public constructor(param0: java.lang.Throwable);
							public constructor(param0: string, param1: java.lang.Throwable, param2: boolean, param3: boolean);
							public constructor(param0: string, param1: java.lang.Throwable);
						}
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export module maps {
				export module renderer {
					export module glsurfaceview {
						export class GLSurfaceViewMapRenderer extends com.mapbox.mapboxsdk.maps.renderer.MapRenderer implements globalAndroid.opengl.GLSurfaceView.Renderer {
							public static class: java.lang.Class<com.mapbox.mapboxsdk.maps.renderer.glsurfaceview.GLSurfaceViewMapRenderer>;
							public onStop(): void;
							public onSurfaceChanged(param0: javax.microedition.khronos.opengles.GL10, param1: number, param2: number): void;
							public onDestroy(): void;
							public onSurfaceCreated(param0: javax.microedition.khronos.opengles.GL10, param1: javax.microedition.khronos.egl.EGLConfig): void;
							public onResume(): void;
							public onDrawFrame(param0: javax.microedition.khronos.opengles.GL10): void;
							public requestRender(): void;
							public onPause(): void;
							public constructor(param0: globalAndroid.content.Context, param1: com.mapbox.mapboxsdk.maps.renderer.glsurfaceview.MapboxGLSurfaceView, param2: string);
							public onStart(): void;
							public onSurfaceDestroyed(): void;
							public queueEvent(param0: java.lang.Runnable): void;
							public constructor(param0: globalAndroid.content.Context, param1: string);
						}
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export module maps {
				export module renderer {
					export module glsurfaceview {
						export class MapboxGLSurfaceView extends globalAndroid.opengl.GLSurfaceView {
							public static class: java.lang.Class<com.mapbox.mapboxsdk.maps.renderer.glsurfaceview.MapboxGLSurfaceView>;
							public invalidateDrawable(param0: globalAndroid.graphics.drawable.Drawable): void;
							public onDetachedFromWindow(): void;
							public onKeyDown(param0: number, param1: globalAndroid.view.KeyEvent): boolean;
							public surfaceRedrawNeeded(param0: globalAndroid.view.SurfaceHolder): void;
							public constructor(param0: globalAndroid.content.Context, param1: globalAndroid.util.AttributeSet, param2: number, param3: number);
							/** @deprecated */
							public surfaceRedrawNeeded(param0: globalAndroid.view.SurfaceHolder): void;
							public onKeyLongPress(param0: number, param1: globalAndroid.view.KeyEvent): boolean;
							public unscheduleDrawable(param0: globalAndroid.graphics.drawable.Drawable, param1: java.lang.Runnable): void;
							public constructor(param0: globalAndroid.content.Context, param1: globalAndroid.util.AttributeSet);
							public scheduleDrawable(param0: globalAndroid.graphics.drawable.Drawable, param1: java.lang.Runnable, param2: number): void;
							public setDetachedListener(param0: com.mapbox.mapboxsdk.maps.renderer.glsurfaceview.MapboxGLSurfaceView.OnGLSurfaceViewDetachedListener): void;
							public onKeyMultiple(param0: number, param1: number, param2: globalAndroid.view.KeyEvent): boolean;
							public sendAccessibilityEvent(param0: number): void;
							public constructor(param0: globalAndroid.content.Context, param1: globalAndroid.util.AttributeSet, param2: number);
							public onKeyUp(param0: number, param1: globalAndroid.view.KeyEvent): boolean;
							public sendAccessibilityEventUnchecked(param0: globalAndroid.view.accessibility.AccessibilityEvent): void;
							public unscheduleDrawable(param0: globalAndroid.graphics.drawable.Drawable): void;
							public constructor(param0: globalAndroid.content.Context);
							public surfaceRedrawNeededAsync(param0: globalAndroid.view.SurfaceHolder, param1: java.lang.Runnable): void;
						}
						export module MapboxGLSurfaceView {
							export class OnGLSurfaceViewDetachedListener extends java.lang.Object {
								public static class: java.lang.Class<com.mapbox.mapboxsdk.maps.renderer.glsurfaceview.MapboxGLSurfaceView.OnGLSurfaceViewDetachedListener>;
								/**
								 * Constructs a new instance of the com.mapbox.mapboxsdk.maps.renderer.glsurfaceview.MapboxGLSurfaceView$OnGLSurfaceViewDetachedListener interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
								 */
								public constructor(implementation: {
									onGLSurfaceViewDetached(): void;
								});
								public constructor();
								public onGLSurfaceViewDetached(): void;
							}
						}
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export module maps {
				export module renderer {
					export module textureview {
						export class TextureViewMapRenderer extends com.mapbox.mapboxsdk.maps.renderer.MapRenderer {
							public static class: java.lang.Class<com.mapbox.mapboxsdk.maps.renderer.textureview.TextureViewMapRenderer>;
							public constructor(param0: globalAndroid.content.Context, param1: globalAndroid.view.TextureView, param2: string, param3: boolean);
							public onDrawFrame(param0: javax.microedition.khronos.opengles.GL10): void;
							public requestRender(): void;
							public onStop(): void;
							public onSurfaceChanged(param0: javax.microedition.khronos.opengles.GL10, param1: number, param2: number): void;
							public onSurfaceDestroyed(): void;
							public onStart(): void;
							public onDestroy(): void;
							public queueEvent(param0: java.lang.Runnable): void;
							public onSurfaceCreated(param0: javax.microedition.khronos.opengles.GL10, param1: javax.microedition.khronos.egl.EGLConfig): void;
							public constructor(param0: globalAndroid.content.Context, param1: string);
							public isTranslucentSurface(): boolean;
						}
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export module maps {
				export module renderer {
					export module textureview {
						export class TextureViewRenderThread extends java.lang.Thread implements globalAndroid.view.TextureView.SurfaceTextureListener {
							public static class: java.lang.Class<com.mapbox.mapboxsdk.maps.renderer.textureview.TextureViewRenderThread>;
							public onSurfaceTextureAvailable(param0: globalAndroid.graphics.SurfaceTexture, param1: number, param2: number): void;
							public onSurfaceTextureUpdated(param0: globalAndroid.graphics.SurfaceTexture): void;
							public onSurfaceTextureSizeChanged(param0: globalAndroid.graphics.SurfaceTexture, param1: number, param2: number): void;
							public onSurfaceTextureDestroyed(param0: globalAndroid.graphics.SurfaceTexture): boolean;
							public run(): void;
						}
						export module TextureViewRenderThread {
							export class EGLHolder extends java.lang.Object {
								public static class: java.lang.Class<com.mapbox.mapboxsdk.maps.renderer.textureview.TextureViewRenderThread.EGLHolder>;
							}
						}
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export module maps {
				export module widgets {
					export class CompassView extends globalAndroid.widget.ImageView implements java.lang.Runnable {
						public static class: java.lang.Class<com.mapbox.mapboxsdk.maps.widgets.CompassView>;
						public static TIME_WAIT_IDLE: number;
						public static TIME_MAP_NORTH_ANIMATION: number;
						public constructor(param0: globalAndroid.content.Context);
						public sendAccessibilityEvent(param0: number): void;
						public sendAccessibilityEventUnchecked(param0: globalAndroid.view.accessibility.AccessibilityEvent): void;
						public isFacingNorth(): boolean;
						public invalidateDrawable(param0: globalAndroid.graphics.drawable.Drawable): void;
						public isAnimating(param0: boolean): void;
						public getCompassImage(): globalAndroid.graphics.drawable.Drawable;
						public isFadeCompassViewFacingNorth(): boolean;
						public constructor(param0: globalAndroid.content.Context, param1: globalAndroid.util.AttributeSet);
						public injectCompassAnimationListener(param0: com.mapbox.mapboxsdk.maps.MapboxMap.OnCompassAnimationListener): void;
						public setCompassImage(param0: globalAndroid.graphics.drawable.Drawable): void;
						public onKeyMultiple(param0: number, param1: number, param2: globalAndroid.view.KeyEvent): boolean;
						public unscheduleDrawable(param0: globalAndroid.graphics.drawable.Drawable, param1: java.lang.Runnable): void;
						public constructor(param0: globalAndroid.content.Context, param1: globalAndroid.util.AttributeSet, param2: number, param3: number);
						public onKeyUp(param0: number, param1: globalAndroid.view.KeyEvent): boolean;
						public resetAnimation(): void;
						public fadeCompassViewFacingNorth(param0: boolean): void;
						public scheduleDrawable(param0: globalAndroid.graphics.drawable.Drawable, param1: java.lang.Runnable, param2: number): void;
						public update(param0: number): void;
						public setEnabled(param0: boolean): void;
						public unscheduleDrawable(param0: globalAndroid.graphics.drawable.Drawable): void;
						public isHidden(): boolean;
						public run(): void;
						public onKeyLongPress(param0: number, param1: globalAndroid.view.KeyEvent): boolean;
						public constructor(param0: globalAndroid.content.Context, param1: globalAndroid.util.AttributeSet, param2: number);
						public onKeyDown(param0: number, param1: globalAndroid.view.KeyEvent): boolean;
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export module module {
				export module http {
					export class HttpRequestImpl extends java.lang.Object implements com.mapbox.mapboxsdk.http.HttpRequest {
						public static class: java.lang.Class<com.mapbox.mapboxsdk.module.http.HttpRequestImpl>;
						public static setOkHttpClient(param0: any): void;
						public static enablePrintRequestUrlOnFailure(param0: boolean): void;
						public constructor();
						public static enableLog(param0: boolean): void;
						public executeRequest(param0: com.mapbox.mapboxsdk.http.HttpResponder, param1: number, param2: string, param3: string, param4: string, param5: boolean): void;
						public cancelRequest(): void;
					}
					export module HttpRequestImpl {
						export class OkHttpCallback extends java.lang.Object {
							public static class: java.lang.Class<com.mapbox.mapboxsdk.module.http.HttpRequestImpl.OkHttpCallback>;
							public onFailure(param0: any, param1: java.io.IOException): void;
							public onResponse(param0: any, param1: any): void;
						}
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export module module {
				export module http {
					export class HttpRequestUtil extends java.lang.Object {
						public static class: java.lang.Class<com.mapbox.mapboxsdk.module.http.HttpRequestUtil>;
						public static setOkHttpClient(param0: any): void;
						public static setLogEnabled(param0: boolean): void;
						public constructor();
						public static setPrintRequestUrlOnFailure(param0: boolean): void;
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export module module {
				export module loader {
					export class LibraryLoaderProviderImpl extends java.lang.Object implements com.mapbox.mapboxsdk.LibraryLoaderProvider {
						public static class: java.lang.Class<com.mapbox.mapboxsdk.module.loader.LibraryLoaderProviderImpl>;
						public constructor();
						public getDefaultLibraryLoader(): com.mapbox.mapboxsdk.LibraryLoader;
					}
					export module LibraryLoaderProviderImpl {
						export class SoLibraryLoader extends com.mapbox.mapboxsdk.LibraryLoader {
							public static class: java.lang.Class<com.mapbox.mapboxsdk.module.loader.LibraryLoaderProviderImpl.SoLibraryLoader>;
							public load(param0: string): void;
							public static load(): void;
						}
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export module module {
				export module telemetry {
					export abstract class MapBaseEvent extends Event {
						public static class: java.lang.Class<com.mapbox.mapboxsdk.module.telemetry.MapBaseEvent>;
						public describeContents(): number;
						public writeToParcel(param0: globalAndroid.os.Parcel, param1: number): void;
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export module module {
				export module telemetry {
					export class MapEventFactory extends java.lang.Object {
						public static class: java.lang.Class<com.mapbox.mapboxsdk.module.telemetry.MapEventFactory>;
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export module module {
				export module telemetry {
					export class MapLoadEvent extends com.mapbox.mapboxsdk.module.telemetry.MapBaseEvent {
						public static class: java.lang.Class<com.mapbox.mapboxsdk.module.telemetry.MapLoadEvent>;
						public describeContents(): number;
						public writeToParcel(param0: globalAndroid.os.Parcel, param1: number): void;
						public equals(param0: any): boolean;
						public hashCode(): number;
						public toString(): string;
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export module module {
				export module telemetry {
					export class OfflineDownloadEndEvent extends com.mapbox.mapboxsdk.module.telemetry.MapBaseEvent {
						public static class: java.lang.Class<com.mapbox.mapboxsdk.module.telemetry.OfflineDownloadEndEvent>;
						public describeContents(): number;
						public writeToParcel(param0: globalAndroid.os.Parcel, param1: number): void;
						public equals(param0: any): boolean;
						public hashCode(): number;
						public toString(): string;
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export module module {
				export module telemetry {
					export class OfflineDownloadStartEvent extends com.mapbox.mapboxsdk.module.telemetry.MapBaseEvent {
						public static class: java.lang.Class<com.mapbox.mapboxsdk.module.telemetry.OfflineDownloadStartEvent>;
						public describeContents(): number;
						public writeToParcel(param0: globalAndroid.os.Parcel, param1: number): void;
						public equals(param0: any): boolean;
						public hashCode(): number;
						public toString(): string;
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export module module {
				export module telemetry {
					export class PerformanceEvent extends com.mapbox.mapboxsdk.module.telemetry.MapBaseEvent {
						public static class: java.lang.Class<com.mapbox.mapboxsdk.module.telemetry.PerformanceEvent>;
						public describeContents(): number;
						public writeToParcel(param0: globalAndroid.os.Parcel, param1: number): void;
						public equals(param0: any): boolean;
						public hashCode(): number;
						public toString(): string;
					}
					export module PerformanceEvent {
						export class PerformanceAttribute<T>  extends java.lang.Object {
							public static class: java.lang.Class<com.mapbox.mapboxsdk.module.telemetry.PerformanceEvent.PerformanceAttribute<any>>;
							public hashCode(): number;
							public equals(param0: any): boolean;
						}
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export module module {
				export module telemetry {
					export class PhoneState extends java.lang.Object {
						public static class: java.lang.Class<com.mapbox.mapboxsdk.module.telemetry.PhoneState>;
					}
					export module PhoneState {
						export class Orientation {
							public static class: java.lang.Class<com.mapbox.mapboxsdk.module.telemetry.PhoneState.Orientation>;
							public static ORIENTATION_PORTRAIT: com.mapbox.mapboxsdk.module.telemetry.PhoneState.Orientation;
							public static ORIENTATION_LANDSCAPE: com.mapbox.mapboxsdk.module.telemetry.PhoneState.Orientation;
							public static values(): native.Array<com.mapbox.mapboxsdk.module.telemetry.PhoneState.Orientation>;
							public static valueOf(param0: java.lang.Class<any>, param1: string): java.lang.Enum<any>;
							public static getOrientation(param0: number): com.mapbox.mapboxsdk.module.telemetry.PhoneState.Orientation;
							public getOrientation(): string;
							public static valueOf(param0: string): com.mapbox.mapboxsdk.module.telemetry.PhoneState.Orientation;
						}
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export module module {
				export module telemetry {
					export class TelemetryImpl extends java.lang.Object implements com.mapbox.mapboxsdk.maps.TelemetryDefinition {
						public static class: java.lang.Class<com.mapbox.mapboxsdk.module.telemetry.TelemetryImpl>;
						public setSessionIdRotationInterval(param0: number): boolean;
						public constructor();
						public setDebugLoggingEnabled(param0: boolean): void;
						/** @deprecated */
						public onGestureInteraction(param0: string, param1: number, param2: number, param3: number): void;
						public onCreateOfflineRegion(param0: com.mapbox.mapboxsdk.offline.OfflineRegionDefinition): void;
						public setUserTelemetryRequestState(param0: boolean): void;
						public onAppUserTurnstileEvent(): void;
						public disableTelemetrySession(): void;
						public onPerformanceEvent(param0: globalAndroid.os.Bundle): void;
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export module net {
				export class ConnectivityListener extends java.lang.Object {
					public static class: java.lang.Class<com.mapbox.mapboxsdk.net.ConnectivityListener>;
					/**
					 * Constructs a new instance of the com.mapbox.mapboxsdk.net.ConnectivityListener interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
					 */
					public constructor(implementation: {
						onNetworkStateChanged(param0: boolean): void;
					});
					public constructor();
					public onNetworkStateChanged(param0: boolean): void;
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export module net {
				export class ConnectivityReceiver extends globalAndroid.content.BroadcastReceiver {
					public static class: java.lang.Class<com.mapbox.mapboxsdk.net.ConnectivityReceiver>;
					public setConnected(param0: java.lang.Boolean): void;
					public activate(): void;
					public isConnected(): boolean;
					public static instance(param0: globalAndroid.content.Context): com.mapbox.mapboxsdk.net.ConnectivityReceiver;
					public deactivate(): void;
					public removeListener(param0: com.mapbox.mapboxsdk.net.ConnectivityListener): void;
					public addListener(param0: com.mapbox.mapboxsdk.net.ConnectivityListener): void;
					public onReceive(param0: globalAndroid.content.Context, param1: globalAndroid.content.Intent): void;
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export module net {
				export class NativeConnectivityListener extends java.lang.Object implements com.mapbox.mapboxsdk.net.ConnectivityListener {
					public static class: java.lang.Class<com.mapbox.mapboxsdk.net.NativeConnectivityListener>;
					public finalize(): void;
					public nativeOnConnectivityStateChanged(param0: boolean): void;
					public onNetworkStateChanged(param0: boolean): void;
					public initialize(): void;
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export module offline {
				export class OfflineGeometryRegionDefinition extends java.lang.Object implements com.mapbox.mapboxsdk.offline.OfflineRegionDefinition {
					public static class: java.lang.Class<com.mapbox.mapboxsdk.offline.OfflineGeometryRegionDefinition>;
					public static CREATOR: globalAndroid.os.Parcelable.Creator<any>;
					public getMinZoom(): number;
					public describeContents(): number;
					public getIncludeIdeographs(): boolean;
					public getGeometry(): com.mapbox.geojson.Geometry;
					public getMaxZoom(): number;
					public constructor(param0: globalAndroid.os.Parcel);
					public getPixelRatio(): number;
					public getStyleURL(): string;
					public constructor(param0: string, param1: com.mapbox.geojson.Geometry, param2: number, param3: number, param4: number, param5: boolean);
					public getBounds(): com.mapbox.mapboxsdk.geometry.LatLngBounds;
					public constructor(param0: string, param1: com.mapbox.geojson.Geometry, param2: number, param3: number, param4: number);
					public writeToParcel(param0: globalAndroid.os.Parcel, param1: number): void;
					public getType(): string;
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export module offline {
				export class OfflineManager extends java.lang.Object {
					public static class: java.lang.Class<com.mapbox.mapboxsdk.offline.OfflineManager>;
					public clearAmbientCache(param0: com.mapbox.mapboxsdk.offline.OfflineManager.FileSourceCallback): void;
					public setMaximumAmbientCacheSize(param0: number, param1: com.mapbox.mapboxsdk.offline.OfflineManager.FileSourceCallback): void;
					public finalize(): void;
					public packDatabase(param0: com.mapbox.mapboxsdk.offline.OfflineManager.FileSourceCallback): void;
					public runPackDatabaseAutomatically(param0: boolean): void;
					public invalidateAmbientCache(param0: com.mapbox.mapboxsdk.offline.OfflineManager.FileSourceCallback): void;
					public mergeOfflineRegions(param0: string, param1: com.mapbox.mapboxsdk.offline.OfflineManager.MergeOfflineRegionsCallback): void;
					public resetDatabase(param0: com.mapbox.mapboxsdk.offline.OfflineManager.FileSourceCallback): void;
					public setOfflineMapboxTileCountLimit(param0: number): void;
					public createOfflineRegion(param0: com.mapbox.mapboxsdk.offline.OfflineRegionDefinition, param1: native.Array<number>, param2: com.mapbox.mapboxsdk.offline.OfflineManager.CreateOfflineRegionCallback): void;
					public putResourceWithUrl(param0: string, param1: native.Array<number>, param2: number, param3: number, param4: string, param5: boolean): void;
					public listOfflineRegions(param0: com.mapbox.mapboxsdk.offline.OfflineManager.ListOfflineRegionsCallback): void;
					public static getInstance(param0: globalAndroid.content.Context): com.mapbox.mapboxsdk.offline.OfflineManager;
				}
				export module OfflineManager {
					export class CreateOfflineRegionCallback extends java.lang.Object {
						public static class: java.lang.Class<com.mapbox.mapboxsdk.offline.OfflineManager.CreateOfflineRegionCallback>;
						/**
						 * Constructs a new instance of the com.mapbox.mapboxsdk.offline.OfflineManager$CreateOfflineRegionCallback interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
						 */
						public constructor(implementation: {
							onCreate(param0: com.mapbox.mapboxsdk.offline.OfflineRegion): void;
							onError(param0: string): void;
						});
						public constructor();
						public onCreate(param0: com.mapbox.mapboxsdk.offline.OfflineRegion): void;
						public onError(param0: string): void;
					}
					export class FileSourceCallback extends java.lang.Object {
						public static class: java.lang.Class<com.mapbox.mapboxsdk.offline.OfflineManager.FileSourceCallback>;
						/**
						 * Constructs a new instance of the com.mapbox.mapboxsdk.offline.OfflineManager$FileSourceCallback interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
						 */
						public constructor(implementation: {
							onSuccess(): void;
							onError(param0: string): void;
						});
						public constructor();
						public onSuccess(): void;
						public onError(param0: string): void;
					}
					export class ListOfflineRegionsCallback extends java.lang.Object {
						public static class: java.lang.Class<com.mapbox.mapboxsdk.offline.OfflineManager.ListOfflineRegionsCallback>;
						/**
						 * Constructs a new instance of the com.mapbox.mapboxsdk.offline.OfflineManager$ListOfflineRegionsCallback interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
						 */
						public constructor(implementation: {
							onList(param0: native.Array<com.mapbox.mapboxsdk.offline.OfflineRegion>): void;
							onError(param0: string): void;
						});
						public constructor();
						public onList(param0: native.Array<com.mapbox.mapboxsdk.offline.OfflineRegion>): void;
						public onError(param0: string): void;
					}
					export class MergeOfflineRegionsCallback extends java.lang.Object {
						public static class: java.lang.Class<com.mapbox.mapboxsdk.offline.OfflineManager.MergeOfflineRegionsCallback>;
						/**
						 * Constructs a new instance of the com.mapbox.mapboxsdk.offline.OfflineManager$MergeOfflineRegionsCallback interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
						 */
						public constructor(implementation: {
							onMerge(param0: native.Array<com.mapbox.mapboxsdk.offline.OfflineRegion>): void;
							onError(param0: string): void;
						});
						public constructor();
						public onMerge(param0: native.Array<com.mapbox.mapboxsdk.offline.OfflineRegion>): void;
						public onError(param0: string): void;
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export module offline {
				export class OfflineRegion extends java.lang.Object {
					public static class: java.lang.Class<com.mapbox.mapboxsdk.offline.OfflineRegion>;
					public static STATE_INACTIVE: number;
					public static STATE_ACTIVE: number;
					public isDeliveringInactiveMessages(): boolean;
					public invalidate(param0: com.mapbox.mapboxsdk.offline.OfflineRegion.OfflineRegionInvalidateCallback): void;
					public getID(): number;
					public getDefinition(): com.mapbox.mapboxsdk.offline.OfflineRegionDefinition;
					public finalize(): void;
					public getStatus(param0: com.mapbox.mapboxsdk.offline.OfflineRegion.OfflineRegionStatusCallback): void;
					public setDeliverInactiveMessages(param0: boolean): void;
					public setObserver(param0: com.mapbox.mapboxsdk.offline.OfflineRegion.OfflineRegionObserver): void;
					public setDownloadState(param0: number): void;
					public updateMetadata(param0: native.Array<number>, param1: com.mapbox.mapboxsdk.offline.OfflineRegion.OfflineRegionUpdateMetadataCallback): void;
					public delete(param0: com.mapbox.mapboxsdk.offline.OfflineRegion.OfflineRegionDeleteCallback): void;
					public getMetadata(): native.Array<number>;
				}
				export module OfflineRegion {
					export class DownloadState extends java.lang.Object implements java.lang.annotation.Annotation {
						public static class: java.lang.Class<com.mapbox.mapboxsdk.offline.OfflineRegion.DownloadState>;
						/**
						 * Constructs a new instance of the com.mapbox.mapboxsdk.offline.OfflineRegion$DownloadState interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
						 */
						public constructor(implementation: {
							equals(param0: any): boolean;
							hashCode(): number;
							toString(): string;
							annotationType(): java.lang.Class<any>;
						});
						public constructor();
						public equals(param0: any): boolean;
						public hashCode(): number;
						public toString(): string;
						public annotationType(): java.lang.Class<any>;
					}
					export class OfflineRegionDeleteCallback extends java.lang.Object {
						public static class: java.lang.Class<com.mapbox.mapboxsdk.offline.OfflineRegion.OfflineRegionDeleteCallback>;
						/**
						 * Constructs a new instance of the com.mapbox.mapboxsdk.offline.OfflineRegion$OfflineRegionDeleteCallback interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
						 */
						public constructor(implementation: {
							onDelete(): void;
							onError(param0: string): void;
						});
						public constructor();
						public onDelete(): void;
						public onError(param0: string): void;
					}
					export class OfflineRegionInvalidateCallback extends java.lang.Object {
						public static class: java.lang.Class<com.mapbox.mapboxsdk.offline.OfflineRegion.OfflineRegionInvalidateCallback>;
						/**
						 * Constructs a new instance of the com.mapbox.mapboxsdk.offline.OfflineRegion$OfflineRegionInvalidateCallback interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
						 */
						public constructor(implementation: {
							onInvalidate(): void;
							onError(param0: string): void;
						});
						public constructor();
						public onInvalidate(): void;
						public onError(param0: string): void;
					}
					export class OfflineRegionObserver extends java.lang.Object {
						public static class: java.lang.Class<com.mapbox.mapboxsdk.offline.OfflineRegion.OfflineRegionObserver>;
						/**
						 * Constructs a new instance of the com.mapbox.mapboxsdk.offline.OfflineRegion$OfflineRegionObserver interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
						 */
						public constructor(implementation: {
							onStatusChanged(param0: com.mapbox.mapboxsdk.offline.OfflineRegionStatus): void;
							onError(param0: com.mapbox.mapboxsdk.offline.OfflineRegionError): void;
							mapboxTileCountLimitExceeded(param0: number): void;
						});
						public constructor();
						public mapboxTileCountLimitExceeded(param0: number): void;
						public onError(param0: com.mapbox.mapboxsdk.offline.OfflineRegionError): void;
						public onStatusChanged(param0: com.mapbox.mapboxsdk.offline.OfflineRegionStatus): void;
					}
					export class OfflineRegionStatusCallback extends java.lang.Object {
						public static class: java.lang.Class<com.mapbox.mapboxsdk.offline.OfflineRegion.OfflineRegionStatusCallback>;
						/**
						 * Constructs a new instance of the com.mapbox.mapboxsdk.offline.OfflineRegion$OfflineRegionStatusCallback interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
						 */
						public constructor(implementation: {
							onStatus(param0: com.mapbox.mapboxsdk.offline.OfflineRegionStatus): void;
							onError(param0: string): void;
						});
						public constructor();
						public onStatus(param0: com.mapbox.mapboxsdk.offline.OfflineRegionStatus): void;
						public onError(param0: string): void;
					}
					export class OfflineRegionUpdateMetadataCallback extends java.lang.Object {
						public static class: java.lang.Class<com.mapbox.mapboxsdk.offline.OfflineRegion.OfflineRegionUpdateMetadataCallback>;
						/**
						 * Constructs a new instance of the com.mapbox.mapboxsdk.offline.OfflineRegion$OfflineRegionUpdateMetadataCallback interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
						 */
						public constructor(implementation: {
							onUpdate(param0: native.Array<number>): void;
							onError(param0: string): void;
						});
						public constructor();
						public onUpdate(param0: native.Array<number>): void;
						public onError(param0: string): void;
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export module offline {
				export class OfflineRegionDefinition extends java.lang.Object implements globalAndroid.os.Parcelable {
					public static class: java.lang.Class<com.mapbox.mapboxsdk.offline.OfflineRegionDefinition>;
					/**
					 * Constructs a new instance of the com.mapbox.mapboxsdk.offline.OfflineRegionDefinition interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
					 */
					public constructor(implementation: {
						getBounds(): com.mapbox.mapboxsdk.geometry.LatLngBounds;
						getStyleURL(): string;
						getMinZoom(): number;
						getMaxZoom(): number;
						getPixelRatio(): number;
						getIncludeIdeographs(): boolean;
						getType(): string;
						describeContents(): number;
						writeToParcel(param0: globalAndroid.os.Parcel, param1: number): void;
					});
					public constructor();
					public static PARCELABLE_WRITE_RETURN_VALUE: number;
					public static CONTENTS_FILE_DESCRIPTOR: number;
					public getMinZoom(): number;
					public getPixelRatio(): number;
					public describeContents(): number;
					public getStyleURL(): string;
					public getIncludeIdeographs(): boolean;
					public getBounds(): com.mapbox.mapboxsdk.geometry.LatLngBounds;
					public writeToParcel(param0: globalAndroid.os.Parcel, param1: number): void;
					public getType(): string;
					public getMaxZoom(): number;
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export module offline {
				export class OfflineRegionError extends java.lang.Object {
					public static class: java.lang.Class<com.mapbox.mapboxsdk.offline.OfflineRegionError>;
					public static REASON_SUCCESS: string;
					public static REASON_NOT_FOUND: string;
					public static REASON_SERVER: string;
					public static REASON_CONNECTION: string;
					public static REASON_OTHER: string;
					public equals(param0: any): boolean;
					public getReason(): string;
					public toString(): string;
					public getMessage(): string;
					public hashCode(): number;
				}
				export module OfflineRegionError {
					export class ErrorReason extends java.lang.Object implements java.lang.annotation.Annotation {
						public static class: java.lang.Class<com.mapbox.mapboxsdk.offline.OfflineRegionError.ErrorReason>;
						/**
						 * Constructs a new instance of the com.mapbox.mapboxsdk.offline.OfflineRegionError$ErrorReason interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
						 */
						public constructor(implementation: {
							equals(param0: any): boolean;
							hashCode(): number;
							toString(): string;
							annotationType(): java.lang.Class<any>;
						});
						public constructor();
						public equals(param0: any): boolean;
						public hashCode(): number;
						public toString(): string;
						public annotationType(): java.lang.Class<any>;
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export module offline {
				export class OfflineRegionStatus extends java.lang.Object {
					public static class: java.lang.Class<com.mapbox.mapboxsdk.offline.OfflineRegionStatus>;
					public getRequiredResourceCount(): number;
					public getCompletedResourceCount(): number;
					public isComplete(): boolean;
					public getCompletedTileSize(): number;
					public getDownloadState(): number;
					public getCompletedResourceSize(): number;
					public getCompletedTileCount(): number;
					public isRequiredResourceCountPrecise(): boolean;
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export module offline {
				export class OfflineTilePyramidRegionDefinition extends java.lang.Object implements com.mapbox.mapboxsdk.offline.OfflineRegionDefinition {
					public static class: java.lang.Class<com.mapbox.mapboxsdk.offline.OfflineTilePyramidRegionDefinition>;
					public static CREATOR: globalAndroid.os.Parcelable.Creator<any>;
					public constructor(param0: globalAndroid.os.Parcel);
					public getMinZoom(): number;
					public getPixelRatio(): number;
					public constructor(param0: string, param1: com.mapbox.mapboxsdk.geometry.LatLngBounds, param2: number, param3: number, param4: number, param5: boolean);
					public describeContents(): number;
					public getStyleURL(): string;
					public getIncludeIdeographs(): boolean;
					public constructor(param0: string, param1: com.mapbox.mapboxsdk.geometry.LatLngBounds, param2: number, param3: number, param4: number);
					public getBounds(): com.mapbox.mapboxsdk.geometry.LatLngBounds;
					public writeToParcel(param0: globalAndroid.os.Parcel, param1: number): void;
					public getType(): string;
					public getMaxZoom(): number;
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export module plugins {
				export module annotation {
					export abstract class Annotation<T>  extends java.lang.Object {
						public static class: java.lang.Class<com.mapbox.mapboxsdk.plugins.annotation.Annotation<any>>;
						public jsonObject: any;
						public geometry: T;
						public getGeometry(): T;
						public setDraggable(param0: boolean): void;
						public equals(param0: any): boolean;
						public hashCode(): number;
						public setData(param0: any): void;
						public setGeometry(param0: T): void;
						public isDraggable(): boolean;
						public getData(): any;
						public toString(): string;
						public getId(): number;
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export module plugins {
				export module annotation {
					export abstract class AnnotationManager<L, T, S, D, U, V>  extends java.lang.Object {
						public static class: java.lang.Class<com.mapbox.mapboxsdk.plugins.annotation.AnnotationManager<any,any,any,any,any,any>>;
						public mapboxMap: com.mapbox.mapboxsdk.maps.MapboxMap;
						public annotations: androidx.collection.LongSparseArray<T>;
						public layer: L;
						public update(param0: T): void;
						public update(param0: java.util.List<T>): void;
						public addLongClickListener(param0: V): void;
						public removeDragListener(param0: D): void;
						public removeClickListener(param0: U): void;
						public create(param0: java.util.List<S>): java.util.List<T>;
						public delete(param0: java.util.List<T>): void;
						public addClickListener(param0: U): void;
						public getLayerId(): string;
						public delete(param0: T): void;
						public constructor(param0: com.mapbox.mapboxsdk.maps.MapView, param1: com.mapbox.mapboxsdk.maps.MapboxMap, param2: com.mapbox.mapboxsdk.maps.Style, param3: com.mapbox.mapboxsdk.plugins.annotation.CoreElementProvider<L>, param4: com.mapbox.mapboxsdk.plugins.annotation.DraggableAnnotationController<T,D>, param5: string, param6: com.mapbox.mapboxsdk.style.sources.GeoJsonOptions);
						public create(param0: S): T;
						public removeLongClickListener(param0: V): void;
						public getAnnotations(): androidx.collection.LongSparseArray<T>;
						public onDestroy(): void;
						public updateSource(): void;
						public setDataDrivenPropertyIsUsed(param0: string): void;
						public deleteAll(): void;
						public addDragListener(param0: D): void;
					}
					export module AnnotationManager {
						export class MapClickResolver extends java.lang.Object implements com.mapbox.mapboxsdk.maps.MapboxMap.OnMapClickListener, com.mapbox.mapboxsdk.maps.MapboxMap.OnMapLongClickListener {
							public static class: java.lang.Class<com.mapbox.mapboxsdk.plugins.annotation.AnnotationManager.MapClickResolver>;
							public onMapLongClick(param0: com.mapbox.mapboxsdk.geometry.LatLng): boolean;
							public onMapClick(param0: com.mapbox.mapboxsdk.geometry.LatLng): boolean;
						}
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export module plugins {
				export module annotation {
					export class BuildConfig extends java.lang.Object {
						public static class: java.lang.Class<com.mapbox.mapboxsdk.plugins.annotation.BuildConfig>;
						public static DEBUG: boolean;
						public static APPLICATION_ID: string;
						public static BUILD_TYPE: string;
						public static FLAVOR: string;
						public static VERSION_CODE: number;
						public static VERSION_NAME: string;
						public constructor();
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export module plugins {
				export module annotation {
					export class Circle extends com.mapbox.mapboxsdk.plugins.annotation.Annotation<any> {
						public static class: java.lang.Class<com.mapbox.mapboxsdk.plugins.annotation.Circle>;
						public getCircleBlur(): java.lang.Float;
						public getCircleStrokeWidth(): java.lang.Float;
						public setCircleStrokeColor(param0: string): void;
						public getCircleOpacity(): java.lang.Float;
						public getCircleColorAsInt(): number;
						public setCircleStrokeWidth(param0: java.lang.Float): void;
						public getCircleStrokeOpacity(): java.lang.Float;
						public setLatLng(param0: com.mapbox.mapboxsdk.geometry.LatLng): void;
						public setCircleColor(param0: number): void;
						public setCircleStrokeOpacity(param0: java.lang.Float): void;
						public getLatLng(): com.mapbox.mapboxsdk.geometry.LatLng;
						public setCircleBlur(param0: java.lang.Float): void;
						public getCircleStrokeColorAsInt(): number;
						public getCircleColor(): string;
						public getCircleStrokeColor(): string;
						public setCircleStrokeColor(param0: number): void;
						public setCircleOpacity(param0: java.lang.Float): void;
						public setCircleColor(param0: string): void;
						public setCircleRadius(param0: java.lang.Float): void;
						public getCircleRadius(): java.lang.Float;
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export module plugins {
				export module annotation {
					export class CircleElementProvider extends com.mapbox.mapboxsdk.plugins.annotation.CoreElementProvider<com.mapbox.mapboxsdk.style.layers.CircleLayer> {
						public static class: java.lang.Class<com.mapbox.mapboxsdk.plugins.annotation.CircleElementProvider>;
						public getLayer(): com.mapbox.mapboxsdk.style.layers.CircleLayer;
						public getSource(param0: com.mapbox.mapboxsdk.style.sources.GeoJsonOptions): com.mapbox.mapboxsdk.style.sources.GeoJsonSource;
						public getLayer(): any;
						public getLayerId(): string;
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export module plugins {
				export module annotation {
					export class CircleManager extends com.mapbox.mapboxsdk.plugins.annotation.AnnotationManager<com.mapbox.mapboxsdk.style.layers.CircleLayer,com.mapbox.mapboxsdk.plugins.annotation.Circle,com.mapbox.mapboxsdk.plugins.annotation.CircleOptions,com.mapbox.mapboxsdk.plugins.annotation.OnCircleDragListener,com.mapbox.mapboxsdk.plugins.annotation.OnCircleClickListener,com.mapbox.mapboxsdk.plugins.annotation.OnCircleLongClickListener> {
						public static class: java.lang.Class<com.mapbox.mapboxsdk.plugins.annotation.CircleManager>;
						public setFilter(param0: com.mapbox.mapboxsdk.style.expressions.Expression): void;
						public constructor(param0: com.mapbox.mapboxsdk.maps.MapView, param1: com.mapbox.mapboxsdk.maps.MapboxMap, param2: com.mapbox.mapboxsdk.maps.Style, param3: com.mapbox.mapboxsdk.plugins.annotation.CoreElementProvider<any>, param4: com.mapbox.mapboxsdk.plugins.annotation.DraggableAnnotationController<any,any>, param5: string, param6: com.mapbox.mapboxsdk.style.sources.GeoJsonOptions);
						public constructor(param0: com.mapbox.mapboxsdk.maps.MapView, param1: com.mapbox.mapboxsdk.maps.MapboxMap, param2: com.mapbox.mapboxsdk.maps.Style, param3: string, param4: com.mapbox.mapboxsdk.style.sources.GeoJsonOptions);
						public setCirclePitchScale(param0: string): void;
						public getCircleTranslateAnchor(): string;
						public create(param0: java.util.List<any>): java.util.List<any>;
						public create(param0: any): any;
						public getCircleTranslate(): native.Array<java.lang.Float>;
						public getFilter(): com.mapbox.mapboxsdk.style.expressions.Expression;
						public setCircleTranslate(param0: native.Array<java.lang.Float>): void;
						public create(param0: com.mapbox.geojson.FeatureCollection): java.util.List<com.mapbox.mapboxsdk.plugins.annotation.Circle>;
						public getCirclePitchAlignment(): string;
						public constructor(param0: com.mapbox.mapboxsdk.maps.MapView, param1: com.mapbox.mapboxsdk.maps.MapboxMap, param2: com.mapbox.mapboxsdk.maps.Style, param3: string);
						public getCirclePitchScale(): string;
						public setCirclePitchAlignment(param0: string): void;
						public setDataDrivenPropertyIsUsed(param0: string): void;
						public create(param0: string): java.util.List<com.mapbox.mapboxsdk.plugins.annotation.Circle>;
						public constructor(param0: com.mapbox.mapboxsdk.maps.MapView, param1: com.mapbox.mapboxsdk.maps.MapboxMap, param2: com.mapbox.mapboxsdk.maps.Style);
						public setCircleTranslateAnchor(param0: string): void;
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export module plugins {
				export module annotation {
					export class CircleOptions extends com.mapbox.mapboxsdk.plugins.annotation.Options<com.mapbox.mapboxsdk.plugins.annotation.Circle> {
						public static class: java.lang.Class<com.mapbox.mapboxsdk.plugins.annotation.CircleOptions>;
						public constructor();
						public getCircleBlur(): java.lang.Float;
						public withCircleStrokeWidth(param0: java.lang.Float): com.mapbox.mapboxsdk.plugins.annotation.CircleOptions;
						public getCircleStrokeWidth(): java.lang.Float;
						public withGeometry(param0: any): com.mapbox.mapboxsdk.plugins.annotation.CircleOptions;
						public withCircleBlur(param0: java.lang.Float): com.mapbox.mapboxsdk.plugins.annotation.CircleOptions;
						public getGeometry(): any;
						public withCircleStrokeColor(param0: string): com.mapbox.mapboxsdk.plugins.annotation.CircleOptions;
						public withLatLng(param0: com.mapbox.mapboxsdk.geometry.LatLng): com.mapbox.mapboxsdk.plugins.annotation.CircleOptions;
						public withCircleColor(param0: string): com.mapbox.mapboxsdk.plugins.annotation.CircleOptions;
						public getCircleOpacity(): java.lang.Float;
						public withCircleStrokeOpacity(param0: java.lang.Float): com.mapbox.mapboxsdk.plugins.annotation.CircleOptions;
						public getDraggable(): boolean;
						public getCircleStrokeOpacity(): java.lang.Float;
						public withCircleOpacity(param0: java.lang.Float): com.mapbox.mapboxsdk.plugins.annotation.CircleOptions;
						public getLatLng(): com.mapbox.mapboxsdk.geometry.LatLng;
						public withCircleRadius(param0: java.lang.Float): com.mapbox.mapboxsdk.plugins.annotation.CircleOptions;
						public withData(param0: any): com.mapbox.mapboxsdk.plugins.annotation.CircleOptions;
						public getCircleColor(): string;
						public getCircleStrokeColor(): string;
						public withDraggable(param0: boolean): com.mapbox.mapboxsdk.plugins.annotation.CircleOptions;
						public getCircleRadius(): java.lang.Float;
						public getData(): any;
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export module plugins {
				export module annotation {
					export class ConvertUtils extends java.lang.Object {
						public static class: java.lang.Class<com.mapbox.mapboxsdk.plugins.annotation.ConvertUtils>;
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export module plugins {
				export module annotation {
					export class CoreElementProvider<L>  extends java.lang.Object {
						public static class: java.lang.Class<com.mapbox.mapboxsdk.plugins.annotation.CoreElementProvider<any>>;
						/**
						 * Constructs a new instance of the com.mapbox.mapboxsdk.plugins.annotation.CoreElementProvider<any> interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
						 */
						public constructor(implementation: {
							getLayerId(): string;
							getLayer(): L;
							getSource(param0: com.mapbox.mapboxsdk.style.sources.GeoJsonOptions): com.mapbox.mapboxsdk.style.sources.GeoJsonSource;
						});
						public constructor();
						public getSource(param0: com.mapbox.mapboxsdk.style.sources.GeoJsonOptions): com.mapbox.mapboxsdk.style.sources.GeoJsonSource;
						public getLayer(): L;
						public getLayerId(): string;
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export module plugins {
				export module annotation {
					export class DraggableAnnotationController<T, D>  extends java.lang.Object {
						public static class: java.lang.Class<com.mapbox.mapboxsdk.plugins.annotation.DraggableAnnotationController<any,any>>;
						public constructor(param0: com.mapbox.mapboxsdk.maps.MapView, param1: com.mapbox.mapboxsdk.maps.MapboxMap, param2: com.mapbox.android.gestures.AndroidGesturesManager, param3: number, param4: number, param5: number, param6: number);
					}
					export module DraggableAnnotationController {
						export class AnnotationMoveGestureListener extends java.lang.Object implements com.mapbox.android.gestures.MoveGestureDetector.OnMoveGestureListener {
							public static class: java.lang.Class<com.mapbox.mapboxsdk.plugins.annotation.DraggableAnnotationController.AnnotationMoveGestureListener>;
							public onMove(param0: com.mapbox.android.gestures.MoveGestureDetector, param1: number, param2: number): boolean;
							public onMoveEnd(param0: com.mapbox.android.gestures.MoveGestureDetector, param1: number, param2: number): void;
							public onMoveBegin(param0: com.mapbox.android.gestures.MoveGestureDetector): boolean;
						}
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export module plugins {
				export module annotation {
					export class Fill extends com.mapbox.mapboxsdk.plugins.annotation.Annotation<com.mapbox.geojson.Polygon> {
						public static class: java.lang.Class<com.mapbox.mapboxsdk.plugins.annotation.Fill>;
						public getFillOpacity(): java.lang.Float;
						public getFillColorAsInt(): number;
						public setFillColor(param0: number): void;
						public getLatLngs(): java.util.List<java.util.List<com.mapbox.mapboxsdk.geometry.LatLng>>;
						public setFillOutlineColor(param0: string): void;
						public setFillColor(param0: string): void;
						public getFillPattern(): string;
						public setLatLngs(param0: java.util.List<java.util.List<com.mapbox.mapboxsdk.geometry.LatLng>>): void;
						public setFillOpacity(param0: java.lang.Float): void;
						public getFillOutlineColor(): string;
						public getFillOutlineColorAsInt(): number;
						public setFillPattern(param0: string): void;
						public setFillOutlineColor(param0: number): void;
						public getFillColor(): string;
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export module plugins {
				export module annotation {
					export class FillElementProvider extends com.mapbox.mapboxsdk.plugins.annotation.CoreElementProvider<com.mapbox.mapboxsdk.style.layers.FillLayer> {
						public static class: java.lang.Class<com.mapbox.mapboxsdk.plugins.annotation.FillElementProvider>;
						public getSource(param0: com.mapbox.mapboxsdk.style.sources.GeoJsonOptions): com.mapbox.mapboxsdk.style.sources.GeoJsonSource;
						public getLayer(): any;
						public getLayerId(): string;
						public getLayer(): com.mapbox.mapboxsdk.style.layers.FillLayer;
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export module plugins {
				export module annotation {
					export class FillManager extends com.mapbox.mapboxsdk.plugins.annotation.AnnotationManager<com.mapbox.mapboxsdk.style.layers.FillLayer,com.mapbox.mapboxsdk.plugins.annotation.Fill,com.mapbox.mapboxsdk.plugins.annotation.FillOptions,com.mapbox.mapboxsdk.plugins.annotation.OnFillDragListener,com.mapbox.mapboxsdk.plugins.annotation.OnFillClickListener,com.mapbox.mapboxsdk.plugins.annotation.OnFillLongClickListener> {
						public static class: java.lang.Class<com.mapbox.mapboxsdk.plugins.annotation.FillManager>;
						public setFilter(param0: com.mapbox.mapboxsdk.style.expressions.Expression): void;
						public constructor(param0: com.mapbox.mapboxsdk.maps.MapView, param1: com.mapbox.mapboxsdk.maps.MapboxMap, param2: com.mapbox.mapboxsdk.maps.Style, param3: com.mapbox.mapboxsdk.plugins.annotation.CoreElementProvider<any>, param4: com.mapbox.mapboxsdk.plugins.annotation.DraggableAnnotationController<any,any>, param5: string, param6: com.mapbox.mapboxsdk.style.sources.GeoJsonOptions);
						public constructor(param0: com.mapbox.mapboxsdk.maps.MapView, param1: com.mapbox.mapboxsdk.maps.MapboxMap, param2: com.mapbox.mapboxsdk.maps.Style, param3: string, param4: com.mapbox.mapboxsdk.style.sources.GeoJsonOptions);
						public create(param0: java.util.List<any>): java.util.List<any>;
						public getFillTranslate(): native.Array<java.lang.Float>;
						public setFillAntialias(param0: java.lang.Boolean): void;
						public create(param0: any): any;
						public setFillTranslate(param0: native.Array<java.lang.Float>): void;
						public setFillTranslateAnchor(param0: string): void;
						public getFilter(): com.mapbox.mapboxsdk.style.expressions.Expression;
						public constructor(param0: com.mapbox.mapboxsdk.maps.MapView, param1: com.mapbox.mapboxsdk.maps.MapboxMap, param2: com.mapbox.mapboxsdk.maps.Style, param3: string);
						public create(param0: string): java.util.List<com.mapbox.mapboxsdk.plugins.annotation.Fill>;
						public setDataDrivenPropertyIsUsed(param0: string): void;
						public getFillAntialias(): java.lang.Boolean;
						public getFillTranslateAnchor(): string;
						public constructor(param0: com.mapbox.mapboxsdk.maps.MapView, param1: com.mapbox.mapboxsdk.maps.MapboxMap, param2: com.mapbox.mapboxsdk.maps.Style);
						public create(param0: com.mapbox.geojson.FeatureCollection): java.util.List<com.mapbox.mapboxsdk.plugins.annotation.Fill>;
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export module plugins {
				export module annotation {
					export class FillOptions extends com.mapbox.mapboxsdk.plugins.annotation.Options<com.mapbox.mapboxsdk.plugins.annotation.Fill> {
						public static class: java.lang.Class<com.mapbox.mapboxsdk.plugins.annotation.FillOptions>;
						public constructor();
						public getFillOpacity(): java.lang.Float;
						public withLatLngs(param0: java.util.List<java.util.List<com.mapbox.mapboxsdk.geometry.LatLng>>): com.mapbox.mapboxsdk.plugins.annotation.FillOptions;
						public getLatLngs(): java.util.List<java.util.List<com.mapbox.mapboxsdk.geometry.LatLng>>;
						public getDraggable(): boolean;
						public withFillOutlineColor(param0: string): com.mapbox.mapboxsdk.plugins.annotation.FillOptions;
						public getFillPattern(): string;
						public withFillColor(param0: string): com.mapbox.mapboxsdk.plugins.annotation.FillOptions;
						public withFillOpacity(param0: java.lang.Float): com.mapbox.mapboxsdk.plugins.annotation.FillOptions;
						public withFillPattern(param0: string): com.mapbox.mapboxsdk.plugins.annotation.FillOptions;
						public getGeometry(): com.mapbox.geojson.Polygon;
						public getFillOutlineColor(): string;
						public withGeometry(param0: com.mapbox.geojson.Polygon): com.mapbox.mapboxsdk.plugins.annotation.FillOptions;
						public getData(): any;
						public getFillColor(): string;
						public withDraggable(param0: boolean): com.mapbox.mapboxsdk.plugins.annotation.FillOptions;
						public withData(param0: any): com.mapbox.mapboxsdk.plugins.annotation.FillOptions;
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export module plugins {
				export module annotation {
					export class Line extends com.mapbox.mapboxsdk.plugins.annotation.Annotation<com.mapbox.geojson.LineString> {
						public static class: java.lang.Class<com.mapbox.mapboxsdk.plugins.annotation.Line>;
						public setLineGapWidth(param0: java.lang.Float): void;
						public setLineColor(param0: string): void;
						public getLineWidth(): java.lang.Float;
						public getLinePattern(): string;
						public setLatLngs(param0: java.util.List<com.mapbox.mapboxsdk.geometry.LatLng>): void;
						public getLatLngs(): java.util.List<com.mapbox.mapboxsdk.geometry.LatLng>;
						public getLineJoin(): string;
						public setLineJoin(param0: string): void;
						public setLineOpacity(param0: java.lang.Float): void;
						public setLineColor(param0: number): void;
						public getLineGapWidth(): java.lang.Float;
						public getLineBlur(): java.lang.Float;
						public getLineOpacity(): java.lang.Float;
						public setLineOffset(param0: java.lang.Float): void;
						public setLinePattern(param0: string): void;
						public setLineBlur(param0: java.lang.Float): void;
						public getLineColor(): string;
						public setLineWidth(param0: java.lang.Float): void;
						public getLineColorAsInt(): number;
						public getLineOffset(): java.lang.Float;
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export module plugins {
				export module annotation {
					export class LineElementProvider extends com.mapbox.mapboxsdk.plugins.annotation.CoreElementProvider<com.mapbox.mapboxsdk.style.layers.LineLayer> {
						public static class: java.lang.Class<com.mapbox.mapboxsdk.plugins.annotation.LineElementProvider>;
						public getSource(param0: com.mapbox.mapboxsdk.style.sources.GeoJsonOptions): com.mapbox.mapboxsdk.style.sources.GeoJsonSource;
						public getLayer(): any;
						public getLayerId(): string;
						public getLayer(): com.mapbox.mapboxsdk.style.layers.LineLayer;
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export module plugins {
				export module annotation {
					export class LineManager extends com.mapbox.mapboxsdk.plugins.annotation.AnnotationManager<com.mapbox.mapboxsdk.style.layers.LineLayer,com.mapbox.mapboxsdk.plugins.annotation.Line,com.mapbox.mapboxsdk.plugins.annotation.LineOptions,com.mapbox.mapboxsdk.plugins.annotation.OnLineDragListener,com.mapbox.mapboxsdk.plugins.annotation.OnLineClickListener,com.mapbox.mapboxsdk.plugins.annotation.OnLineLongClickListener> {
						public static class: java.lang.Class<com.mapbox.mapboxsdk.plugins.annotation.LineManager>;
						public create(param0: com.mapbox.geojson.FeatureCollection): java.util.List<com.mapbox.mapboxsdk.plugins.annotation.Line>;
						public setFilter(param0: com.mapbox.mapboxsdk.style.expressions.Expression): void;
						public setLineCap(param0: string): void;
						public constructor(param0: com.mapbox.mapboxsdk.maps.MapView, param1: com.mapbox.mapboxsdk.maps.MapboxMap, param2: com.mapbox.mapboxsdk.maps.Style, param3: com.mapbox.mapboxsdk.plugins.annotation.CoreElementProvider<any>, param4: com.mapbox.mapboxsdk.plugins.annotation.DraggableAnnotationController<any,any>, param5: string, param6: com.mapbox.mapboxsdk.style.sources.GeoJsonOptions);
						public constructor(param0: com.mapbox.mapboxsdk.maps.MapView, param1: com.mapbox.mapboxsdk.maps.MapboxMap, param2: com.mapbox.mapboxsdk.maps.Style, param3: string, param4: com.mapbox.mapboxsdk.style.sources.GeoJsonOptions);
						public getLineDasharray(): native.Array<java.lang.Float>;
						public create(param0: java.util.List<any>): java.util.List<any>;
						public setLineRoundLimit(param0: java.lang.Float): void;
						public setLineTranslateAnchor(param0: string): void;
						public getLineMiterLimit(): java.lang.Float;
						public create(param0: any): any;
						public getLineTranslate(): native.Array<java.lang.Float>;
						public setLineDasharray(param0: native.Array<java.lang.Float>): void;
						public create(param0: string): java.util.List<com.mapbox.mapboxsdk.plugins.annotation.Line>;
						public getLineCap(): string;
						public getFilter(): com.mapbox.mapboxsdk.style.expressions.Expression;
						public setLineTranslate(param0: native.Array<java.lang.Float>): void;
						public constructor(param0: com.mapbox.mapboxsdk.maps.MapView, param1: com.mapbox.mapboxsdk.maps.MapboxMap, param2: com.mapbox.mapboxsdk.maps.Style, param3: string);
						public getLineRoundLimit(): java.lang.Float;
						public setDataDrivenPropertyIsUsed(param0: string): void;
						public setLineMiterLimit(param0: java.lang.Float): void;
						public getLineTranslateAnchor(): string;
						public constructor(param0: com.mapbox.mapboxsdk.maps.MapView, param1: com.mapbox.mapboxsdk.maps.MapboxMap, param2: com.mapbox.mapboxsdk.maps.Style);
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export module plugins {
				export module annotation {
					export class LineOptions extends com.mapbox.mapboxsdk.plugins.annotation.Options<com.mapbox.mapboxsdk.plugins.annotation.Line> {
						public static class: java.lang.Class<com.mapbox.mapboxsdk.plugins.annotation.LineOptions>;
						public withLineWidth(param0: java.lang.Float): com.mapbox.mapboxsdk.plugins.annotation.LineOptions;
						public getLatLngs(): java.util.List<com.mapbox.mapboxsdk.geometry.LatLng>;
						public getDraggable(): boolean;
						public getLineGapWidth(): java.lang.Float;
						public getLineOpacity(): java.lang.Float;
						public withData(param0: any): com.mapbox.mapboxsdk.plugins.annotation.LineOptions;
						public withLineOpacity(param0: java.lang.Float): com.mapbox.mapboxsdk.plugins.annotation.LineOptions;
						public withLatLngs(param0: java.util.List<com.mapbox.mapboxsdk.geometry.LatLng>): com.mapbox.mapboxsdk.plugins.annotation.LineOptions;
						public withLineGapWidth(param0: java.lang.Float): com.mapbox.mapboxsdk.plugins.annotation.LineOptions;
						public withLineBlur(param0: java.lang.Float): com.mapbox.mapboxsdk.plugins.annotation.LineOptions;
						public withLinePattern(param0: string): com.mapbox.mapboxsdk.plugins.annotation.LineOptions;
						public getLineColor(): string;
						public getLineOffset(): java.lang.Float;
						public getData(): any;
						public withLineJoin(param0: string): com.mapbox.mapboxsdk.plugins.annotation.LineOptions;
						public constructor();
						public getLineWidth(): java.lang.Float;
						public getLinePattern(): string;
						public getLineJoin(): string;
						public withLineColor(param0: string): com.mapbox.mapboxsdk.plugins.annotation.LineOptions;
						public getLineBlur(): java.lang.Float;
						public getGeometry(): com.mapbox.geojson.LineString;
						public withDraggable(param0: boolean): com.mapbox.mapboxsdk.plugins.annotation.LineOptions;
						public withGeometry(param0: com.mapbox.geojson.LineString): com.mapbox.mapboxsdk.plugins.annotation.LineOptions;
						public withLineOffset(param0: java.lang.Float): com.mapbox.mapboxsdk.plugins.annotation.LineOptions;
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export module plugins {
				export module annotation {
					export class OnAnnotationClickListener<T>  extends java.lang.Object {
						public static class: java.lang.Class<com.mapbox.mapboxsdk.plugins.annotation.OnAnnotationClickListener<any>>;
						/**
						 * Constructs a new instance of the com.mapbox.mapboxsdk.plugins.annotation.OnAnnotationClickListener<any> interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
						 */
						public constructor(implementation: {
							onAnnotationClick(param0: T): void;
						});
						public constructor();
						public onAnnotationClick(param0: T): void;
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export module plugins {
				export module annotation {
					export class OnAnnotationDragListener<T>  extends java.lang.Object {
						public static class: java.lang.Class<com.mapbox.mapboxsdk.plugins.annotation.OnAnnotationDragListener<any>>;
						/**
						 * Constructs a new instance of the com.mapbox.mapboxsdk.plugins.annotation.OnAnnotationDragListener<any> interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
						 */
						public constructor(implementation: {
							onAnnotationDragStarted(param0: T): void;
							onAnnotationDrag(param0: T): void;
							onAnnotationDragFinished(param0: T): void;
						});
						public constructor();
						public onAnnotationDrag(param0: T): void;
						public onAnnotationDragStarted(param0: T): void;
						public onAnnotationDragFinished(param0: T): void;
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export module plugins {
				export module annotation {
					export class OnAnnotationLongClickListener<T>  extends java.lang.Object {
						public static class: java.lang.Class<com.mapbox.mapboxsdk.plugins.annotation.OnAnnotationLongClickListener<any>>;
						/**
						 * Constructs a new instance of the com.mapbox.mapboxsdk.plugins.annotation.OnAnnotationLongClickListener<any> interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
						 */
						public constructor(implementation: {
							onAnnotationLongClick(param0: T): void;
						});
						public constructor();
						public onAnnotationLongClick(param0: T): void;
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export module plugins {
				export module annotation {
					export class OnCircleClickListener extends com.mapbox.mapboxsdk.plugins.annotation.OnAnnotationClickListener<com.mapbox.mapboxsdk.plugins.annotation.Circle> {
						public static class: java.lang.Class<com.mapbox.mapboxsdk.plugins.annotation.OnCircleClickListener>;
						/**
						 * Constructs a new instance of the com.mapbox.mapboxsdk.plugins.annotation.OnCircleClickListener interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
						 */
						public constructor(implementation: {
							onAnnotationClick(param0: any): void;
						});
						public constructor();
						public onAnnotationClick(param0: any): void;
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export module plugins {
				export module annotation {
					export class OnCircleDragListener extends com.mapbox.mapboxsdk.plugins.annotation.OnAnnotationDragListener<com.mapbox.mapboxsdk.plugins.annotation.Circle> {
						public static class: java.lang.Class<com.mapbox.mapboxsdk.plugins.annotation.OnCircleDragListener>;
						/**
						 * Constructs a new instance of the com.mapbox.mapboxsdk.plugins.annotation.OnCircleDragListener interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
						 */
						public constructor(implementation: {
							onAnnotationDragStarted(param0: any): void;
							onAnnotationDrag(param0: any): void;
							onAnnotationDragFinished(param0: any): void;
						});
						public constructor();
						public onAnnotationDragStarted(param0: any): void;
						public onAnnotationDrag(param0: any): void;
						public onAnnotationDragFinished(param0: any): void;
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export module plugins {
				export module annotation {
					export class OnCircleLongClickListener extends com.mapbox.mapboxsdk.plugins.annotation.OnAnnotationLongClickListener<com.mapbox.mapboxsdk.plugins.annotation.Circle> {
						public static class: java.lang.Class<com.mapbox.mapboxsdk.plugins.annotation.OnCircleLongClickListener>;
						/**
						 * Constructs a new instance of the com.mapbox.mapboxsdk.plugins.annotation.OnCircleLongClickListener interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
						 */
						public constructor(implementation: {
							onAnnotationLongClick(param0: any): void;
						});
						public constructor();
						public onAnnotationLongClick(param0: any): void;
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export module plugins {
				export module annotation {
					export class OnFillClickListener extends com.mapbox.mapboxsdk.plugins.annotation.OnAnnotationClickListener<com.mapbox.mapboxsdk.plugins.annotation.Fill> {
						public static class: java.lang.Class<com.mapbox.mapboxsdk.plugins.annotation.OnFillClickListener>;
						/**
						 * Constructs a new instance of the com.mapbox.mapboxsdk.plugins.annotation.OnFillClickListener interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
						 */
						public constructor(implementation: {
							onAnnotationClick(param0: any): void;
						});
						public constructor();
						public onAnnotationClick(param0: any): void;
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export module plugins {
				export module annotation {
					export class OnFillDragListener extends com.mapbox.mapboxsdk.plugins.annotation.OnAnnotationDragListener<com.mapbox.mapboxsdk.plugins.annotation.Fill> {
						public static class: java.lang.Class<com.mapbox.mapboxsdk.plugins.annotation.OnFillDragListener>;
						/**
						 * Constructs a new instance of the com.mapbox.mapboxsdk.plugins.annotation.OnFillDragListener interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
						 */
						public constructor(implementation: {
							onAnnotationDragStarted(param0: any): void;
							onAnnotationDrag(param0: any): void;
							onAnnotationDragFinished(param0: any): void;
						});
						public constructor();
						public onAnnotationDragStarted(param0: any): void;
						public onAnnotationDrag(param0: any): void;
						public onAnnotationDragFinished(param0: any): void;
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export module plugins {
				export module annotation {
					export class OnFillLongClickListener extends com.mapbox.mapboxsdk.plugins.annotation.OnAnnotationLongClickListener<com.mapbox.mapboxsdk.plugins.annotation.Fill> {
						public static class: java.lang.Class<com.mapbox.mapboxsdk.plugins.annotation.OnFillLongClickListener>;
						/**
						 * Constructs a new instance of the com.mapbox.mapboxsdk.plugins.annotation.OnFillLongClickListener interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
						 */
						public constructor(implementation: {
							onAnnotationLongClick(param0: any): void;
						});
						public constructor();
						public onAnnotationLongClick(param0: any): void;
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export module plugins {
				export module annotation {
					export class OnLineClickListener extends com.mapbox.mapboxsdk.plugins.annotation.OnAnnotationClickListener<com.mapbox.mapboxsdk.plugins.annotation.Line> {
						public static class: java.lang.Class<com.mapbox.mapboxsdk.plugins.annotation.OnLineClickListener>;
						/**
						 * Constructs a new instance of the com.mapbox.mapboxsdk.plugins.annotation.OnLineClickListener interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
						 */
						public constructor(implementation: {
							onAnnotationClick(param0: any): void;
						});
						public constructor();
						public onAnnotationClick(param0: any): void;
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export module plugins {
				export module annotation {
					export class OnLineDragListener extends com.mapbox.mapboxsdk.plugins.annotation.OnAnnotationDragListener<com.mapbox.mapboxsdk.plugins.annotation.Line> {
						public static class: java.lang.Class<com.mapbox.mapboxsdk.plugins.annotation.OnLineDragListener>;
						/**
						 * Constructs a new instance of the com.mapbox.mapboxsdk.plugins.annotation.OnLineDragListener interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
						 */
						public constructor(implementation: {
							onAnnotationDragStarted(param0: any): void;
							onAnnotationDrag(param0: any): void;
							onAnnotationDragFinished(param0: any): void;
						});
						public constructor();
						public onAnnotationDragStarted(param0: any): void;
						public onAnnotationDrag(param0: any): void;
						public onAnnotationDragFinished(param0: any): void;
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export module plugins {
				export module annotation {
					export class OnLineLongClickListener extends com.mapbox.mapboxsdk.plugins.annotation.OnAnnotationLongClickListener<com.mapbox.mapboxsdk.plugins.annotation.Line> {
						public static class: java.lang.Class<com.mapbox.mapboxsdk.plugins.annotation.OnLineLongClickListener>;
						/**
						 * Constructs a new instance of the com.mapbox.mapboxsdk.plugins.annotation.OnLineLongClickListener interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
						 */
						public constructor(implementation: {
							onAnnotationLongClick(param0: any): void;
						});
						public constructor();
						public onAnnotationLongClick(param0: any): void;
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export module plugins {
				export module annotation {
					export class OnSymbolClickListener extends com.mapbox.mapboxsdk.plugins.annotation.OnAnnotationClickListener<com.mapbox.mapboxsdk.plugins.annotation.Symbol> {
						public static class: java.lang.Class<com.mapbox.mapboxsdk.plugins.annotation.OnSymbolClickListener>;
						/**
						 * Constructs a new instance of the com.mapbox.mapboxsdk.plugins.annotation.OnSymbolClickListener interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
						 */
						public constructor(implementation: {
							onAnnotationClick(param0: any): void;
						});
						public constructor();
						public onAnnotationClick(param0: any): void;
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export module plugins {
				export module annotation {
					export class OnSymbolDragListener extends com.mapbox.mapboxsdk.plugins.annotation.OnAnnotationDragListener<com.mapbox.mapboxsdk.plugins.annotation.Symbol> {
						public static class: java.lang.Class<com.mapbox.mapboxsdk.plugins.annotation.OnSymbolDragListener>;
						/**
						 * Constructs a new instance of the com.mapbox.mapboxsdk.plugins.annotation.OnSymbolDragListener interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
						 */
						public constructor(implementation: {
							onAnnotationDragStarted(param0: any): void;
							onAnnotationDrag(param0: any): void;
							onAnnotationDragFinished(param0: any): void;
						});
						public constructor();
						public onAnnotationDragStarted(param0: any): void;
						public onAnnotationDrag(param0: any): void;
						public onAnnotationDragFinished(param0: any): void;
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export module plugins {
				export module annotation {
					export class OnSymbolLongClickListener extends com.mapbox.mapboxsdk.plugins.annotation.OnAnnotationLongClickListener<com.mapbox.mapboxsdk.plugins.annotation.Symbol> {
						public static class: java.lang.Class<com.mapbox.mapboxsdk.plugins.annotation.OnSymbolLongClickListener>;
						/**
						 * Constructs a new instance of the com.mapbox.mapboxsdk.plugins.annotation.OnSymbolLongClickListener interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
						 */
						public constructor(implementation: {
							onAnnotationLongClick(param0: any): void;
						});
						public constructor();
						public onAnnotationLongClick(param0: any): void;
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export module plugins {
				export module annotation {
					export abstract class Options<T>  extends java.lang.Object {
						public static class: java.lang.Class<com.mapbox.mapboxsdk.plugins.annotation.Options<any>>;
						public constructor();
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export module plugins {
				export module annotation {
					export class Symbol extends com.mapbox.mapboxsdk.plugins.annotation.Annotation<any> {
						public static class: java.lang.Class<com.mapbox.mapboxsdk.plugins.annotation.Symbol>;
						public setIconHaloColor(param0: string): void;
						public setTextSize(param0: java.lang.Float): void;
						public setIconColor(param0: number): void;
						public setSymbolSortKey(param0: java.lang.Float): void;
						public setIconHaloWidth(param0: java.lang.Float): void;
						public getTextHaloColorAsInt(): number;
						public setTextField(param0: string): void;
						public setIconColor(param0: string): void;
						public getLatLng(): com.mapbox.mapboxsdk.geometry.LatLng;
						public setIconOffset(param0: globalAndroid.graphics.PointF): void;
						public getTextSize(): java.lang.Float;
						public setTextOffset(param0: globalAndroid.graphics.PointF): void;
						public getIconRotate(): java.lang.Float;
						public getIconHaloBlur(): java.lang.Float;
						public getTextMaxWidth(): java.lang.Float;
						public setTextLetterSpacing(param0: java.lang.Float): void;
						public getTextColor(): string;
						public getTextOffset(): globalAndroid.graphics.PointF;
						public setTextRotate(param0: java.lang.Float): void;
						public getTextHaloColor(): string;
						public setTextHaloWidth(param0: java.lang.Float): void;
						public setTextOpacity(param0: java.lang.Float): void;
						public getIconOpacity(): java.lang.Float;
						public getIconColorAsInt(): number;
						public setTextHaloColor(param0: string): void;
						public getTextHaloBlur(): java.lang.Float;
						public getTextFont(): native.Array<string>;
						public setIconHaloBlur(param0: java.lang.Float): void;
						public setTextColor(param0: string): void;
						public getTextAnchor(): string;
						public setTextHaloColor(param0: number): void;
						public getIconColor(): string;
						public setTextColor(param0: number): void;
						public getIconHaloColor(): string;
						public setIconSize(param0: java.lang.Float): void;
						public getIconHaloWidth(): java.lang.Float;
						public setIconRotate(param0: java.lang.Float): void;
						public getIconHaloColorAsInt(): number;
						public getIconAnchor(): string;
						public setIconImage(param0: string): void;
						public getTextField(): string;
						public getTextJustify(): string;
						public setTextRadialOffset(param0: java.lang.Float): void;
						public getIconOffset(): globalAndroid.graphics.PointF;
						public setIconOpacity(param0: java.lang.Float): void;
						public getTextColorAsInt(): number;
						public getTextHaloWidth(): java.lang.Float;
						public setLatLng(param0: com.mapbox.mapboxsdk.geometry.LatLng): void;
						public setTextTransform(param0: string): void;
						public getTextRadialOffset(): java.lang.Float;
						public getIconImage(): string;
						public setTextJustify(param0: string): void;
						public setIconAnchor(param0: string): void;
						public getTextLetterSpacing(): java.lang.Float;
						public getTextRotate(): java.lang.Float;
						public getTextTransform(): string;
						public getTextOpacity(): java.lang.Float;
						public setIconHaloColor(param0: number): void;
						public setTextMaxWidth(param0: java.lang.Float): void;
						public setTextAnchor(param0: string): void;
						public getSymbolSortKey(): java.lang.Float;
						public getIconSize(): java.lang.Float;
						public setTextFont(param0: native.Array<string>): void;
						public setTextHaloBlur(param0: java.lang.Float): void;
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export module plugins {
				export module annotation {
					export class SymbolElementProvider extends com.mapbox.mapboxsdk.plugins.annotation.CoreElementProvider<com.mapbox.mapboxsdk.style.layers.SymbolLayer> {
						public static class: java.lang.Class<com.mapbox.mapboxsdk.plugins.annotation.SymbolElementProvider>;
						public getSource(param0: com.mapbox.mapboxsdk.style.sources.GeoJsonOptions): com.mapbox.mapboxsdk.style.sources.GeoJsonSource;
						public getLayer(): any;
						public getLayerId(): string;
						public getLayer(): com.mapbox.mapboxsdk.style.layers.SymbolLayer;
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export module plugins {
				export module annotation {
					export class SymbolManager extends com.mapbox.mapboxsdk.plugins.annotation.AnnotationManager<com.mapbox.mapboxsdk.style.layers.SymbolLayer,com.mapbox.mapboxsdk.plugins.annotation.Symbol,com.mapbox.mapboxsdk.plugins.annotation.SymbolOptions,com.mapbox.mapboxsdk.plugins.annotation.OnSymbolDragListener,com.mapbox.mapboxsdk.plugins.annotation.OnSymbolClickListener,com.mapbox.mapboxsdk.plugins.annotation.OnSymbolLongClickListener> {
						public static class: java.lang.Class<com.mapbox.mapboxsdk.plugins.annotation.SymbolManager>;
						public getTextAllowOverlap(): java.lang.Boolean;
						public getTextMaxAngle(): java.lang.Float;
						public create(param0: java.util.List<any>): java.util.List<any>;
						public getIconRotationAlignment(): string;
						public setTextIgnorePlacement(param0: java.lang.Boolean): void;
						public getIconTextFitPadding(): native.Array<java.lang.Float>;
						public getIconAllowOverlap(): java.lang.Boolean;
						public getIconKeepUpright(): java.lang.Boolean;
						public create(param0: string): java.util.List<com.mapbox.mapboxsdk.plugins.annotation.Symbol>;
						public getIconPitchAlignment(): string;
						public getIconIgnorePlacement(): java.lang.Boolean;
						public setIconTranslate(param0: native.Array<java.lang.Float>): void;
						public setDataDrivenPropertyIsUsed(param0: string): void;
						public constructor(param0: com.mapbox.mapboxsdk.maps.MapView, param1: com.mapbox.mapboxsdk.maps.MapboxMap, param2: com.mapbox.mapboxsdk.maps.Style);
						public create(param0: com.mapbox.geojson.FeatureCollection): java.util.List<com.mapbox.mapboxsdk.plugins.annotation.Symbol>;
						public setIconRotationAlignment(param0: string): void;
						public setTextPitchAlignment(param0: string): void;
						public setTextPadding(param0: java.lang.Float): void;
						public setIconAllowOverlap(param0: java.lang.Boolean): void;
						public getTextPadding(): java.lang.Float;
						public create(param0: any): any;
						public getSymbolSpacing(): java.lang.Float;
						public getTextRotationAlignment(): string;
						public getTextKeepUpright(): java.lang.Boolean;
						public setIconTextFitPadding(param0: native.Array<java.lang.Float>): void;
						public setTextLineHeight(param0: java.lang.Float): void;
						public getIconTextFit(): string;
						public getTextPitchAlignment(): string;
						public setTextOptional(param0: java.lang.Boolean): void;
						public setIconOptional(param0: java.lang.Boolean): void;
						public setTextTranslate(param0: native.Array<java.lang.Float>): void;
						public setIconKeepUpright(param0: java.lang.Boolean): void;
						public getTextVariableAnchor(): native.Array<string>;
						public setIconIgnorePlacement(param0: java.lang.Boolean): void;
						public getTextTranslate(): native.Array<java.lang.Float>;
						public constructor(param0: com.mapbox.mapboxsdk.maps.MapView, param1: com.mapbox.mapboxsdk.maps.MapboxMap, param2: com.mapbox.mapboxsdk.maps.Style, param3: com.mapbox.mapboxsdk.plugins.annotation.CoreElementProvider<any>, param4: com.mapbox.mapboxsdk.plugins.annotation.DraggableAnnotationController<any,any>, param5: string, param6: com.mapbox.mapboxsdk.style.sources.GeoJsonOptions);
						public setTextMaxAngle(param0: java.lang.Float): void;
						public getSymbolPlacement(): string;
						public setIconPadding(param0: java.lang.Float): void;
						public getFilter(): com.mapbox.mapboxsdk.style.expressions.Expression;
						public setTextRotationAlignment(param0: string): void;
						public setTextTranslateAnchor(param0: string): void;
						public setSymbolPlacement(param0: string): void;
						public getIconOptional(): java.lang.Boolean;
						public setSymbolAvoidEdges(param0: java.lang.Boolean): void;
						public setTextKeepUpright(param0: java.lang.Boolean): void;
						public setTextAllowOverlap(param0: java.lang.Boolean): void;
						public setFilter(param0: com.mapbox.mapboxsdk.style.expressions.Expression): void;
						public getTextIgnorePlacement(): java.lang.Boolean;
						public constructor(param0: com.mapbox.mapboxsdk.maps.MapView, param1: com.mapbox.mapboxsdk.maps.MapboxMap, param2: com.mapbox.mapboxsdk.maps.Style, param3: string, param4: com.mapbox.mapboxsdk.style.sources.GeoJsonOptions);
						public getTextOptional(): java.lang.Boolean;
						public setIconTranslateAnchor(param0: string): void;
						public getIconTranslateAnchor(): string;
						public setIconTextFit(param0: string): void;
						public constructor(param0: com.mapbox.mapboxsdk.maps.MapView, param1: com.mapbox.mapboxsdk.maps.MapboxMap, param2: com.mapbox.mapboxsdk.maps.Style, param3: string);
						public getTextTranslateAnchor(): string;
						public getSymbolAvoidEdges(): java.lang.Boolean;
						public getIconPadding(): java.lang.Float;
						public setSymbolSpacing(param0: java.lang.Float): void;
						public setIconPitchAlignment(param0: string): void;
						public getTextLineHeight(): java.lang.Float;
						public getIconTranslate(): native.Array<java.lang.Float>;
						public setTextVariableAnchor(param0: native.Array<string>): void;
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export module plugins {
				export module annotation {
					export class SymbolOptions extends com.mapbox.mapboxsdk.plugins.annotation.Options<com.mapbox.mapboxsdk.plugins.annotation.Symbol> {
						public static class: java.lang.Class<com.mapbox.mapboxsdk.plugins.annotation.SymbolOptions>;
						public getDraggable(): boolean;
						public withTextSize(param0: java.lang.Float): com.mapbox.mapboxsdk.plugins.annotation.SymbolOptions;
						public withTextAnchor(param0: string): com.mapbox.mapboxsdk.plugins.annotation.SymbolOptions;
						public withIconOpacity(param0: java.lang.Float): com.mapbox.mapboxsdk.plugins.annotation.SymbolOptions;
						public withTextJustify(param0: string): com.mapbox.mapboxsdk.plugins.annotation.SymbolOptions;
						public getLatLng(): com.mapbox.mapboxsdk.geometry.LatLng;
						public getTextSize(): java.lang.Float;
						public getIconRotate(): java.lang.Float;
						public withTextHaloBlur(param0: java.lang.Float): com.mapbox.mapboxsdk.plugins.annotation.SymbolOptions;
						public withData(param0: any): com.mapbox.mapboxsdk.plugins.annotation.SymbolOptions;
						public getIconHaloBlur(): java.lang.Float;
						public withTextHaloWidth(param0: java.lang.Float): com.mapbox.mapboxsdk.plugins.annotation.SymbolOptions;
						public getTextMaxWidth(): java.lang.Float;
						public getTextColor(): string;
						public constructor();
						public getIconOffset(): native.Array<java.lang.Float>;
						public withIconColor(param0: string): com.mapbox.mapboxsdk.plugins.annotation.SymbolOptions;
						public getGeometry(): any;
						public getTextHaloColor(): string;
						public getIconOpacity(): java.lang.Float;
						public getTextHaloBlur(): java.lang.Float;
						public withSymbolSortKey(param0: java.lang.Float): com.mapbox.mapboxsdk.plugins.annotation.SymbolOptions;
						public getTextFont(): native.Array<string>;
						public withTextRadialOffset(param0: java.lang.Float): com.mapbox.mapboxsdk.plugins.annotation.SymbolOptions;
						public withTextLetterSpacing(param0: java.lang.Float): com.mapbox.mapboxsdk.plugins.annotation.SymbolOptions;
						public getTextAnchor(): string;
						public withTextOpacity(param0: java.lang.Float): com.mapbox.mapboxsdk.plugins.annotation.SymbolOptions;
						public getIconColor(): string;
						public withIconHaloWidth(param0: java.lang.Float): com.mapbox.mapboxsdk.plugins.annotation.SymbolOptions;
						public getIconHaloColor(): string;
						public getIconHaloWidth(): java.lang.Float;
						public withIconImage(param0: string): com.mapbox.mapboxsdk.plugins.annotation.SymbolOptions;
						public getIconAnchor(): string;
						public getTextField(): string;
						public getTextJustify(): string;
						public withTextField(param0: string): com.mapbox.mapboxsdk.plugins.annotation.SymbolOptions;
						public getTextHaloWidth(): java.lang.Float;
						public withIconSize(param0: java.lang.Float): com.mapbox.mapboxsdk.plugins.annotation.SymbolOptions;
						public withTextOffset(param0: native.Array<java.lang.Float>): com.mapbox.mapboxsdk.plugins.annotation.SymbolOptions;
						public withTextColor(param0: string): com.mapbox.mapboxsdk.plugins.annotation.SymbolOptions;
						public withTextHaloColor(param0: string): com.mapbox.mapboxsdk.plugins.annotation.SymbolOptions;
						public withLatLng(param0: com.mapbox.mapboxsdk.geometry.LatLng): com.mapbox.mapboxsdk.plugins.annotation.SymbolOptions;
						public withIconOffset(param0: native.Array<java.lang.Float>): com.mapbox.mapboxsdk.plugins.annotation.SymbolOptions;
						public getTextRadialOffset(): java.lang.Float;
						public getIconImage(): string;
						public getTextLetterSpacing(): java.lang.Float;
						public getData(): any;
						public getTextRotate(): java.lang.Float;
						public getTextTransform(): string;
						public getTextOffset(): native.Array<java.lang.Float>;
						public withIconAnchor(param0: string): com.mapbox.mapboxsdk.plugins.annotation.SymbolOptions;
						public getTextOpacity(): java.lang.Float;
						public withIconHaloColor(param0: string): com.mapbox.mapboxsdk.plugins.annotation.SymbolOptions;
						public withGeometry(param0: any): com.mapbox.mapboxsdk.plugins.annotation.SymbolOptions;
						public withTextTransform(param0: string): com.mapbox.mapboxsdk.plugins.annotation.SymbolOptions;
						public withIconHaloBlur(param0: java.lang.Float): com.mapbox.mapboxsdk.plugins.annotation.SymbolOptions;
						public withTextRotate(param0: java.lang.Float): com.mapbox.mapboxsdk.plugins.annotation.SymbolOptions;
						public withDraggable(param0: boolean): com.mapbox.mapboxsdk.plugins.annotation.SymbolOptions;
						public withIconRotate(param0: java.lang.Float): com.mapbox.mapboxsdk.plugins.annotation.SymbolOptions;
						public withTextMaxWidth(param0: java.lang.Float): com.mapbox.mapboxsdk.plugins.annotation.SymbolOptions;
						public withTextFont(param0: native.Array<string>): com.mapbox.mapboxsdk.plugins.annotation.SymbolOptions;
						public getSymbolSortKey(): java.lang.Float;
						public getIconSize(): java.lang.Float;
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export module snapshotter {
				export class MapSnaphotUtil extends java.lang.Object {
					public static class: java.lang.Class<com.mapbox.mapboxsdk.snapshotter.MapSnaphotUtil>;
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export module snapshotter {
				export class MapSnapshot extends java.lang.Object {
					public static class: java.lang.Class<com.mapbox.mapboxsdk.snapshotter.MapSnapshot>;
					public latLngForPixel(param0: globalAndroid.graphics.PointF): com.mapbox.mapboxsdk.geometry.LatLng;
					public finalize(): void;
					public getAttributions(): native.Array<string>;
					public pixelForLatLng(param0: com.mapbox.mapboxsdk.geometry.LatLng): globalAndroid.graphics.PointF;
					public getBitmap(): globalAndroid.graphics.Bitmap;
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export module snapshotter {
				export class MapSnapshotter extends java.lang.Object {
					public static class: java.lang.Class<com.mapbox.mapboxsdk.snapshotter.MapSnapshotter>;
					public setStyleUrl(param0: string): void;
					public reset(): void;
					public nativeCancel(): void;
					public finalize(): void;
					public cancel(): void;
					public setStyleJson(param0: string): void;
					public start(param0: com.mapbox.mapboxsdk.snapshotter.MapSnapshotter.SnapshotReadyCallback, param1: com.mapbox.mapboxsdk.snapshotter.MapSnapshotter.ErrorHandler): void;
					public onSnapshotReady(param0: com.mapbox.mapboxsdk.snapshotter.MapSnapshot): void;
					public constructor(param0: globalAndroid.content.Context, param1: com.mapbox.mapboxsdk.snapshotter.MapSnapshotter.Options);
					public setRegion(param0: com.mapbox.mapboxsdk.geometry.LatLngBounds): void;
					public onSnapshotFailed(param0: string): void;
					public nativeStart(): void;
					public setSize(param0: number, param1: number): void;
					public start(param0: com.mapbox.mapboxsdk.snapshotter.MapSnapshotter.SnapshotReadyCallback): void;
					public addOverlay(param0: com.mapbox.mapboxsdk.snapshotter.MapSnapshot): void;
					public setCameraPosition(param0: com.mapbox.mapboxsdk.camera.CameraPosition): void;
					public nativeInitialize(param0: com.mapbox.mapboxsdk.snapshotter.MapSnapshotter, param1: com.mapbox.mapboxsdk.storage.FileSource, param2: number, param3: number, param4: number, param5: string, param6: string, param7: com.mapbox.mapboxsdk.geometry.LatLngBounds, param8: com.mapbox.mapboxsdk.camera.CameraPosition, param9: boolean, param10: string): void;
				}
				export module MapSnapshotter {
					export class ErrorHandler extends java.lang.Object {
						public static class: java.lang.Class<com.mapbox.mapboxsdk.snapshotter.MapSnapshotter.ErrorHandler>;
						/**
						 * Constructs a new instance of the com.mapbox.mapboxsdk.snapshotter.MapSnapshotter$ErrorHandler interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
						 */
						public constructor(implementation: {
							onError(param0: string): void;
						});
						public constructor();
						public onError(param0: string): void;
					}
					export class Logo extends java.lang.Object {
						public static class: java.lang.Class<com.mapbox.mapboxsdk.snapshotter.MapSnapshotter.Logo>;
						public constructor(param0: com.mapbox.mapboxsdk.snapshotter.MapSnapshotter, param1: globalAndroid.graphics.Bitmap, param2: globalAndroid.graphics.Bitmap, param3: number);
						public getScale(): number;
						public getSmall(): globalAndroid.graphics.Bitmap;
						public getLarge(): globalAndroid.graphics.Bitmap;
					}
					export class Options extends java.lang.Object {
						public static class: java.lang.Class<com.mapbox.mapboxsdk.snapshotter.MapSnapshotter.Options>;
						/** @deprecated */
						public getApiBaseUrl(): string;
						public withStyleJson(param0: string): com.mapbox.mapboxsdk.snapshotter.MapSnapshotter.Options;
						public getCameraPosition(): com.mapbox.mapboxsdk.camera.CameraPosition;
						public getHeight(): number;
						public getStyleUri(): string;
						public withStyle(param0: string): com.mapbox.mapboxsdk.snapshotter.MapSnapshotter.Options;
						public getLocalIdeographFontFamily(): string;
						public withApiBaseUri(param0: string): com.mapbox.mapboxsdk.snapshotter.MapSnapshotter.Options;
						/** @deprecated */
						public withApiBaseUrl(param0: string): com.mapbox.mapboxsdk.snapshotter.MapSnapshotter.Options;
						public withPixelRatio(param0: number): com.mapbox.mapboxsdk.snapshotter.MapSnapshotter.Options;
						public withLocalIdeographFontFamily(param0: string): com.mapbox.mapboxsdk.snapshotter.MapSnapshotter.Options;
						public getPixelRatio(): number;
						public getWidth(): number;
						public withCameraPosition(param0: com.mapbox.mapboxsdk.camera.CameraPosition): com.mapbox.mapboxsdk.snapshotter.MapSnapshotter.Options;
						public getRegion(): com.mapbox.mapboxsdk.geometry.LatLngBounds;
						public getApiBaseUri(): string;
						/** @deprecated */
						public getStyleUrl(): string;
						public withLocalIdeographFontFamily(param0: native.Array<string>): com.mapbox.mapboxsdk.snapshotter.MapSnapshotter.Options;
						public withRegion(param0: com.mapbox.mapboxsdk.geometry.LatLngBounds): com.mapbox.mapboxsdk.snapshotter.MapSnapshotter.Options;
						public constructor(param0: number, param1: number);
						public withLogo(param0: boolean): com.mapbox.mapboxsdk.snapshotter.MapSnapshotter.Options;
					}
					export class SnapshotReadyCallback extends java.lang.Object {
						public static class: java.lang.Class<com.mapbox.mapboxsdk.snapshotter.MapSnapshotter.SnapshotReadyCallback>;
						/**
						 * Constructs a new instance of the com.mapbox.mapboxsdk.snapshotter.MapSnapshotter$SnapshotReadyCallback interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
						 */
						public constructor(implementation: {
							onSnapshotReady(param0: com.mapbox.mapboxsdk.snapshotter.MapSnapshot): void;
						});
						public constructor();
						public onSnapshotReady(param0: com.mapbox.mapboxsdk.snapshotter.MapSnapshot): void;
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export module storage {
				export class FileSource extends java.lang.Object {
					public static class: java.lang.Class<com.mapbox.mapboxsdk.storage.FileSource>;
					public activate(): void;
					public setAccessToken(param0: string): void;
					public isActivated(): boolean;
					public setResourceTransform(param0: com.mapbox.mapboxsdk.storage.FileSource.ResourceTransformCallback): void;
					public finalize(): void;
					public deactivate(): void;
					public static setResourcesCachePath(param0: string, param1: com.mapbox.mapboxsdk.storage.FileSource.ResourcesCachePathChangeCallback): void;
					public getAccessToken(): string;
					public static getInternalCachePath(param0: globalAndroid.content.Context): string;
					public static isExternalStorageReadable(): boolean;
					public static getInstance(param0: globalAndroid.content.Context): com.mapbox.mapboxsdk.storage.FileSource;
					public static getResourcesCachePath(param0: globalAndroid.content.Context): string;
					public setApiBaseUrl(param0: string): void;
					/** @deprecated */
					public static setResourcesCachePath(param0: globalAndroid.content.Context, param1: string, param2: com.mapbox.mapboxsdk.storage.FileSource.ResourcesCachePathChangeCallback): void;
					public static initializeFileDirsPaths(param0: globalAndroid.content.Context): void;
				}
				export module FileSource {
					export class FileDirsPathsTask extends globalAndroid.os.AsyncTask<globalAndroid.content.Context,java.lang.Void,native.Array<string>> {
						public static class: java.lang.Class<com.mapbox.mapboxsdk.storage.FileSource.FileDirsPathsTask>;
						public onPostExecute(param0: native.Array<string>): void;
						public onCancelled(): void;
						public doInBackground(param0: native.Array<globalAndroid.content.Context>): native.Array<string>;
						public onPostExecute(param0: any): void;
						public onCancelled(param0: any): void;
						public doInBackground(param0: native.Array<any>): any;
					}
					export class ResourceTransformCallback extends java.lang.Object {
						public static class: java.lang.Class<com.mapbox.mapboxsdk.storage.FileSource.ResourceTransformCallback>;
						/**
						 * Constructs a new instance of the com.mapbox.mapboxsdk.storage.FileSource$ResourceTransformCallback interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
						 */
						public constructor(implementation: {
							onURL(param0: number, param1: string): string;
						});
						public constructor();
						public onURL(param0: number, param1: string): string;
					}
					export class ResourcesCachePathChangeCallback extends java.lang.Object {
						public static class: java.lang.Class<com.mapbox.mapboxsdk.storage.FileSource.ResourcesCachePathChangeCallback>;
						/**
						 * Constructs a new instance of the com.mapbox.mapboxsdk.storage.FileSource$ResourcesCachePathChangeCallback interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
						 */
						public constructor(implementation: {
							onSuccess(param0: string): void;
							onError(param0: string): void;
						});
						public constructor();
						public onSuccess(param0: string): void;
						public onError(param0: string): void;
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export module storage {
				export class Resource extends java.lang.Object {
					public static class: java.lang.Class<com.mapbox.mapboxsdk.storage.Resource>;
					public static UNKNOWN: number;
					public static STYLE: number;
					public static SOURCE: number;
					public static TILE: number;
					public static GLYPHS: number;
					public static SPRITE_IMAGE: number;
					public static SPRITE_JSON: number;
					public constructor();
				}
				export module Resource {
					export class Kind extends java.lang.Object implements java.lang.annotation.Annotation {
						public static class: java.lang.Class<com.mapbox.mapboxsdk.storage.Resource.Kind>;
						/**
						 * Constructs a new instance of the com.mapbox.mapboxsdk.storage.Resource$Kind interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
						 */
						public constructor(implementation: {
							equals(param0: any): boolean;
							hashCode(): number;
							toString(): string;
							annotationType(): java.lang.Class<any>;
						});
						public constructor();
						public equals(param0: any): boolean;
						public hashCode(): number;
						public toString(): string;
						public annotationType(): java.lang.Class<any>;
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export module style {
				export module expressions {
					export class Expression extends java.lang.Object {
						public static class: java.lang.Class<com.mapbox.mapboxsdk.style.expressions.Expression>;
						public static step(param0: com.mapbox.mapboxsdk.style.expressions.Expression, param1: com.mapbox.mapboxsdk.style.expressions.Expression, param2: native.Array<com.mapbox.mapboxsdk.style.expressions.Expression>): com.mapbox.mapboxsdk.style.expressions.Expression;
						public static pow(param0: java.lang.Number, param1: java.lang.Number): com.mapbox.mapboxsdk.style.expressions.Expression;
						public static abs(param0: com.mapbox.mapboxsdk.style.expressions.Expression): com.mapbox.mapboxsdk.style.expressions.Expression;
						public static interpolate(param0: com.mapbox.mapboxsdk.style.expressions.Expression.Interpolator, param1: com.mapbox.mapboxsdk.style.expressions.Expression, param2: native.Array<com.mapbox.mapboxsdk.style.expressions.Expression.Stop>): com.mapbox.mapboxsdk.style.expressions.Expression;
						public static max(param0: native.Array<java.lang.Number>): com.mapbox.mapboxsdk.style.expressions.Expression;
						public static array(param0: com.mapbox.mapboxsdk.style.expressions.Expression): com.mapbox.mapboxsdk.style.expressions.Expression;
						public static round(param0: com.mapbox.mapboxsdk.style.expressions.Expression): com.mapbox.mapboxsdk.style.expressions.Expression;
						public static eq(param0: com.mapbox.mapboxsdk.style.expressions.Expression, param1: com.mapbox.mapboxsdk.style.expressions.Expression, param2: com.mapbox.mapboxsdk.style.expressions.Expression): com.mapbox.mapboxsdk.style.expressions.Expression;
						public static id(): com.mapbox.mapboxsdk.style.expressions.Expression;
						public static neq(param0: com.mapbox.mapboxsdk.style.expressions.Expression, param1: com.mapbox.mapboxsdk.style.expressions.Expression, param2: com.mapbox.mapboxsdk.style.expressions.Expression): com.mapbox.mapboxsdk.style.expressions.Expression;
						public static max(param0: native.Array<com.mapbox.mapboxsdk.style.expressions.Expression>): com.mapbox.mapboxsdk.style.expressions.Expression;
						public static format(param0: native.Array<com.mapbox.mapboxsdk.style.expressions.Expression.FormatEntry>): com.mapbox.mapboxsdk.style.expressions.Expression;
						public static eq(param0: com.mapbox.mapboxsdk.style.expressions.Expression, param1: com.mapbox.mapboxsdk.style.expressions.Expression): com.mapbox.mapboxsdk.style.expressions.Expression;
						public static get(param0: string): com.mapbox.mapboxsdk.style.expressions.Expression;
						public static downcase(param0: string): com.mapbox.mapboxsdk.style.expressions.Expression;
						public static step(param0: com.mapbox.mapboxsdk.style.expressions.Expression, param1: java.lang.Number, param2: native.Array<com.mapbox.mapboxsdk.style.expressions.Expression.Stop>): com.mapbox.mapboxsdk.style.expressions.Expression;
						public static toColor(param0: com.mapbox.mapboxsdk.style.expressions.Expression): com.mapbox.mapboxsdk.style.expressions.Expression;
						public static step(param0: java.lang.Number, param1: com.mapbox.mapboxsdk.style.expressions.Expression, param2: native.Array<com.mapbox.mapboxsdk.style.expressions.Expression>): com.mapbox.mapboxsdk.style.expressions.Expression;
						public static ln2(): com.mapbox.mapboxsdk.style.expressions.Expression;
						public static number(param0: native.Array<com.mapbox.mapboxsdk.style.expressions.Expression>): com.mapbox.mapboxsdk.style.expressions.Expression;
						public static tan(param0: com.mapbox.mapboxsdk.style.expressions.Expression): com.mapbox.mapboxsdk.style.expressions.Expression;
						public static isSupportedScript(param0: com.mapbox.mapboxsdk.style.expressions.Expression): com.mapbox.mapboxsdk.style.expressions.Expression;
						public static collator(param0: com.mapbox.mapboxsdk.style.expressions.Expression, param1: com.mapbox.mapboxsdk.style.expressions.Expression): com.mapbox.mapboxsdk.style.expressions.Expression;
						public static lt(param0: com.mapbox.mapboxsdk.style.expressions.Expression, param1: string, param2: com.mapbox.mapboxsdk.style.expressions.Expression): com.mapbox.mapboxsdk.style.expressions.Expression;
						public static atan(param0: com.mapbox.mapboxsdk.style.expressions.Expression): com.mapbox.mapboxsdk.style.expressions.Expression;
						public static gt(param0: com.mapbox.mapboxsdk.style.expressions.Expression, param1: string, param2: com.mapbox.mapboxsdk.style.expressions.Expression): com.mapbox.mapboxsdk.style.expressions.Expression;
						public static sum(param0: native.Array<java.lang.Number>): com.mapbox.mapboxsdk.style.expressions.Expression;
						public static subtract(param0: com.mapbox.mapboxsdk.style.expressions.Expression): com.mapbox.mapboxsdk.style.expressions.Expression;
						public static gt(param0: com.mapbox.mapboxsdk.style.expressions.Expression, param1: java.lang.Number): com.mapbox.mapboxsdk.style.expressions.Expression;
						public static has(param0: string): com.mapbox.mapboxsdk.style.expressions.Expression;
						public static subtract(param0: java.lang.Number, param1: java.lang.Number): com.mapbox.mapboxsdk.style.expressions.Expression;
						public static acos(param0: java.lang.Number): com.mapbox.mapboxsdk.style.expressions.Expression;
						public static floor(param0: com.mapbox.mapboxsdk.style.expressions.Expression): com.mapbox.mapboxsdk.style.expressions.Expression;
						public static var(param0: string): com.mapbox.mapboxsdk.style.expressions.Expression;
						public static cos(param0: java.lang.Number): com.mapbox.mapboxsdk.style.expressions.Expression;
						public static literal(param0: string): com.mapbox.mapboxsdk.style.expressions.Expression;
						public toString(): string;
						public static color(param0: number): com.mapbox.mapboxsdk.style.expressions.Expression;
						public static match(param0: com.mapbox.mapboxsdk.style.expressions.Expression, param1: com.mapbox.mapboxsdk.style.expressions.Expression, param2: native.Array<com.mapbox.mapboxsdk.style.expressions.Expression.Stop>): com.mapbox.mapboxsdk.style.expressions.Expression;
						public static tan(param0: java.lang.Number): com.mapbox.mapboxsdk.style.expressions.Expression;
						public static image(param0: com.mapbox.mapboxsdk.style.expressions.Expression): com.mapbox.mapboxsdk.style.expressions.Expression;
						public static literal(param0: java.lang.Number): com.mapbox.mapboxsdk.style.expressions.Expression;
						public static let(param0: native.Array<com.mapbox.mapboxsdk.style.expressions.Expression>): com.mapbox.mapboxsdk.style.expressions.Expression;
						public static has(param0: string, param1: com.mapbox.mapboxsdk.style.expressions.Expression): com.mapbox.mapboxsdk.style.expressions.Expression;
						public static at(param0: java.lang.Number, param1: com.mapbox.mapboxsdk.style.expressions.Expression): com.mapbox.mapboxsdk.style.expressions.Expression;
						public constructor(param0: string, param1: native.Array<com.mapbox.mapboxsdk.style.expressions.Expression>);
						public static upcase(param0: string): com.mapbox.mapboxsdk.style.expressions.Expression;
						public static eq(param0: com.mapbox.mapboxsdk.style.expressions.Expression, param1: boolean): com.mapbox.mapboxsdk.style.expressions.Expression;
						public static formatEntry(param0: string, param1: native.Array<com.mapbox.mapboxsdk.style.expressions.Expression.FormatOption>): com.mapbox.mapboxsdk.style.expressions.Expression.FormatEntry;
						public static get(param0: string, param1: com.mapbox.mapboxsdk.style.expressions.Expression): com.mapbox.mapboxsdk.style.expressions.Expression;
						public static pi(): com.mapbox.mapboxsdk.style.expressions.Expression;
						public static heatmapDensity(): com.mapbox.mapboxsdk.style.expressions.Expression;
						public static cubicBezier(param0: com.mapbox.mapboxsdk.style.expressions.Expression, param1: com.mapbox.mapboxsdk.style.expressions.Expression, param2: com.mapbox.mapboxsdk.style.expressions.Expression, param3: com.mapbox.mapboxsdk.style.expressions.Expression): com.mapbox.mapboxsdk.style.expressions.Expression.Interpolator;
						public static get(param0: com.mapbox.mapboxsdk.style.expressions.Expression, param1: com.mapbox.mapboxsdk.style.expressions.Expression): com.mapbox.mapboxsdk.style.expressions.Expression;
						public static eq(param0: com.mapbox.mapboxsdk.style.expressions.Expression, param1: string): com.mapbox.mapboxsdk.style.expressions.Expression;
						public static mod(param0: com.mapbox.mapboxsdk.style.expressions.Expression, param1: com.mapbox.mapboxsdk.style.expressions.Expression): com.mapbox.mapboxsdk.style.expressions.Expression;
						public static resolvedLocale(param0: com.mapbox.mapboxsdk.style.expressions.Expression): com.mapbox.mapboxsdk.style.expressions.Expression;
						public static get(param0: com.mapbox.mapboxsdk.style.expressions.Expression): com.mapbox.mapboxsdk.style.expressions.Expression;
						public static round(param0: java.lang.Number): com.mapbox.mapboxsdk.style.expressions.Expression;
						public static var(param0: com.mapbox.mapboxsdk.style.expressions.Expression): com.mapbox.mapboxsdk.style.expressions.Expression;
						public static has(param0: com.mapbox.mapboxsdk.style.expressions.Expression): com.mapbox.mapboxsdk.style.expressions.Expression;
						public static accumulated(): com.mapbox.mapboxsdk.style.expressions.Expression;
						public static cos(param0: com.mapbox.mapboxsdk.style.expressions.Expression): com.mapbox.mapboxsdk.style.expressions.Expression;
						public static step(param0: java.lang.Number, param1: java.lang.Number, param2: native.Array<com.mapbox.mapboxsdk.style.expressions.Expression.Stop>): com.mapbox.mapboxsdk.style.expressions.Expression;
						public static gt(param0: com.mapbox.mapboxsdk.style.expressions.Expression, param1: string): com.mapbox.mapboxsdk.style.expressions.Expression;
						public static step(param0: java.lang.Number, param1: java.lang.Number, param2: native.Array<com.mapbox.mapboxsdk.style.expressions.Expression>): com.mapbox.mapboxsdk.style.expressions.Expression;
						public static e(): com.mapbox.mapboxsdk.style.expressions.Expression;
						public static concat(param0: native.Array<com.mapbox.mapboxsdk.style.expressions.Expression>): com.mapbox.mapboxsdk.style.expressions.Expression;
						public static formatEntry(param0: com.mapbox.mapboxsdk.style.expressions.Expression): com.mapbox.mapboxsdk.style.expressions.Expression.FormatEntry;
						public static upcase(param0: com.mapbox.mapboxsdk.style.expressions.Expression): com.mapbox.mapboxsdk.style.expressions.Expression;
						public static sqrt(param0: java.lang.Number): com.mapbox.mapboxsdk.style.expressions.Expression;
						public static log2(param0: com.mapbox.mapboxsdk.style.expressions.Expression): com.mapbox.mapboxsdk.style.expressions.Expression;
						public static formatEntry(param0: com.mapbox.mapboxsdk.style.expressions.Expression, param1: native.Array<com.mapbox.mapboxsdk.style.expressions.Expression.FormatOption>): com.mapbox.mapboxsdk.style.expressions.Expression.FormatEntry;
						public static sin(param0: com.mapbox.mapboxsdk.style.expressions.Expression): com.mapbox.mapboxsdk.style.expressions.Expression;
						public static abs(param0: java.lang.Number): com.mapbox.mapboxsdk.style.expressions.Expression;
						public static eq(param0: com.mapbox.mapboxsdk.style.expressions.Expression, param1: string, param2: com.mapbox.mapboxsdk.style.expressions.Expression): com.mapbox.mapboxsdk.style.expressions.Expression;
						public static exponential(param0: java.lang.Number): com.mapbox.mapboxsdk.style.expressions.Expression.Interpolator;
						public static geometryType(): com.mapbox.mapboxsdk.style.expressions.Expression;
						public static typeOf(param0: com.mapbox.mapboxsdk.style.expressions.Expression): com.mapbox.mapboxsdk.style.expressions.Expression;
						public static numberFormat(param0: com.mapbox.mapboxsdk.style.expressions.Expression, param1: native.Array<com.mapbox.mapboxsdk.style.expressions.Expression.NumberFormatOption>): com.mapbox.mapboxsdk.style.expressions.Expression;
						public static sum(param0: native.Array<com.mapbox.mapboxsdk.style.expressions.Expression>): com.mapbox.mapboxsdk.style.expressions.Expression;
						public static isSupportedScript(param0: string): com.mapbox.mapboxsdk.style.expressions.Expression;
						public static literal(param0: any): com.mapbox.mapboxsdk.style.expressions.Expression;
						public static has(param0: com.mapbox.mapboxsdk.style.expressions.Expression, param1: com.mapbox.mapboxsdk.style.expressions.Expression): com.mapbox.mapboxsdk.style.expressions.Expression;
						public static length(param0: com.mapbox.mapboxsdk.style.expressions.Expression): com.mapbox.mapboxsdk.style.expressions.Expression;
						public static toNumber(param0: com.mapbox.mapboxsdk.style.expressions.Expression): com.mapbox.mapboxsdk.style.expressions.Expression;
						public static toBool(param0: com.mapbox.mapboxsdk.style.expressions.Expression): com.mapbox.mapboxsdk.style.expressions.Expression;
						public static lte(param0: com.mapbox.mapboxsdk.style.expressions.Expression, param1: string): com.mapbox.mapboxsdk.style.expressions.Expression;
						public static division(param0: com.mapbox.mapboxsdk.style.expressions.Expression, param1: com.mapbox.mapboxsdk.style.expressions.Expression): com.mapbox.mapboxsdk.style.expressions.Expression;
						public static any(param0: native.Array<com.mapbox.mapboxsdk.style.expressions.Expression>): com.mapbox.mapboxsdk.style.expressions.Expression;
						public static atan(param0: java.lang.Number): com.mapbox.mapboxsdk.style.expressions.Expression;
						public static ln(param0: java.lang.Number): com.mapbox.mapboxsdk.style.expressions.Expression;
						public static product(param0: native.Array<com.mapbox.mapboxsdk.style.expressions.Expression>): com.mapbox.mapboxsdk.style.expressions.Expression;
						public static formatEntry(param0: string): com.mapbox.mapboxsdk.style.expressions.Expression.FormatEntry;
						public static cubicBezier(param0: java.lang.Number, param1: java.lang.Number, param2: java.lang.Number, param3: java.lang.Number): com.mapbox.mapboxsdk.style.expressions.Expression.Interpolator;
						public static rgb(param0: com.mapbox.mapboxsdk.style.expressions.Expression, param1: com.mapbox.mapboxsdk.style.expressions.Expression, param2: com.mapbox.mapboxsdk.style.expressions.Expression): com.mapbox.mapboxsdk.style.expressions.Expression;
						public equals(param0: any): boolean;
						public static interpolate(param0: com.mapbox.mapboxsdk.style.expressions.Expression.Interpolator, param1: com.mapbox.mapboxsdk.style.expressions.Expression, param2: native.Array<com.mapbox.mapboxsdk.style.expressions.Expression>): com.mapbox.mapboxsdk.style.expressions.Expression;
						public static numberFormat(param0: java.lang.Number, param1: native.Array<com.mapbox.mapboxsdk.style.expressions.Expression.NumberFormatOption>): com.mapbox.mapboxsdk.style.expressions.Expression;
						public static object(param0: com.mapbox.mapboxsdk.style.expressions.Expression): com.mapbox.mapboxsdk.style.expressions.Expression;
						public static all(param0: native.Array<com.mapbox.mapboxsdk.style.expressions.Expression>): com.mapbox.mapboxsdk.style.expressions.Expression;
						public static log2(param0: java.lang.Number): com.mapbox.mapboxsdk.style.expressions.Expression;
						public static product(param0: native.Array<java.lang.Number>): com.mapbox.mapboxsdk.style.expressions.Expression;
						public static ceil(param0: java.lang.Number): com.mapbox.mapboxsdk.style.expressions.Expression;
						public static string(param0: native.Array<com.mapbox.mapboxsdk.style.expressions.Expression>): com.mapbox.mapboxsdk.style.expressions.Expression;
						public static lt(param0: com.mapbox.mapboxsdk.style.expressions.Expression, param1: string): com.mapbox.mapboxsdk.style.expressions.Expression;
						public static lte(param0: com.mapbox.mapboxsdk.style.expressions.Expression, param1: com.mapbox.mapboxsdk.style.expressions.Expression, param2: com.mapbox.mapboxsdk.style.expressions.Expression): com.mapbox.mapboxsdk.style.expressions.Expression;
						public static linear(): com.mapbox.mapboxsdk.style.expressions.Expression.Interpolator;
						public static literal(param0: native.Array<any>): com.mapbox.mapboxsdk.style.expressions.Expression;
						public static properties(): com.mapbox.mapboxsdk.style.expressions.Expression;
						public static lte(param0: com.mapbox.mapboxsdk.style.expressions.Expression, param1: com.mapbox.mapboxsdk.style.expressions.Expression): com.mapbox.mapboxsdk.style.expressions.Expression;
						public static gte(param0: com.mapbox.mapboxsdk.style.expressions.Expression, param1: string): com.mapbox.mapboxsdk.style.expressions.Expression;
						public static toString(param0: com.mapbox.mapboxsdk.style.expressions.Expression): com.mapbox.mapboxsdk.style.expressions.Expression;
						public static toRgba(param0: com.mapbox.mapboxsdk.style.expressions.Expression): com.mapbox.mapboxsdk.style.expressions.Expression;
						public static at(param0: com.mapbox.mapboxsdk.style.expressions.Expression, param1: com.mapbox.mapboxsdk.style.expressions.Expression): com.mapbox.mapboxsdk.style.expressions.Expression;
						public static min(param0: native.Array<java.lang.Number>): com.mapbox.mapboxsdk.style.expressions.Expression;
						public static collator(param0: boolean, param1: boolean, param2: java.util.Locale): com.mapbox.mapboxsdk.style.expressions.Expression;
						public static ln(param0: com.mapbox.mapboxsdk.style.expressions.Expression): com.mapbox.mapboxsdk.style.expressions.Expression;
						public static sin(param0: java.lang.Number): com.mapbox.mapboxsdk.style.expressions.Expression;
						public static pow(param0: com.mapbox.mapboxsdk.style.expressions.Expression, param1: com.mapbox.mapboxsdk.style.expressions.Expression): com.mapbox.mapboxsdk.style.expressions.Expression;
						public static log10(param0: com.mapbox.mapboxsdk.style.expressions.Expression): com.mapbox.mapboxsdk.style.expressions.Expression;
						public static asin(param0: java.lang.Number): com.mapbox.mapboxsdk.style.expressions.Expression;
						public static gte(param0: com.mapbox.mapboxsdk.style.expressions.Expression, param1: string, param2: com.mapbox.mapboxsdk.style.expressions.Expression): com.mapbox.mapboxsdk.style.expressions.Expression;
						public static lt(param0: com.mapbox.mapboxsdk.style.expressions.Expression, param1: java.lang.Number): com.mapbox.mapboxsdk.style.expressions.Expression;
						public static collator(param0: boolean, param1: boolean): com.mapbox.mapboxsdk.style.expressions.Expression;
						public static raw(param0: string): com.mapbox.mapboxsdk.style.expressions.Expression;
						public static downcase(param0: com.mapbox.mapboxsdk.style.expressions.Expression): com.mapbox.mapboxsdk.style.expressions.Expression;
						public static switchCase(param0: native.Array<com.mapbox.mapboxsdk.style.expressions.Expression>): com.mapbox.mapboxsdk.style.expressions.Expression;
						public static sqrt(param0: com.mapbox.mapboxsdk.style.expressions.Expression): com.mapbox.mapboxsdk.style.expressions.Expression;
						public static step(param0: com.mapbox.mapboxsdk.style.expressions.Expression, param1: java.lang.Number, param2: native.Array<com.mapbox.mapboxsdk.style.expressions.Expression>): com.mapbox.mapboxsdk.style.expressions.Expression;
						public static gt(param0: com.mapbox.mapboxsdk.style.expressions.Expression, param1: com.mapbox.mapboxsdk.style.expressions.Expression): com.mapbox.mapboxsdk.style.expressions.Expression;
						public static gte(param0: com.mapbox.mapboxsdk.style.expressions.Expression, param1: com.mapbox.mapboxsdk.style.expressions.Expression): com.mapbox.mapboxsdk.style.expressions.Expression;
						public static exponential(param0: com.mapbox.mapboxsdk.style.expressions.Expression): com.mapbox.mapboxsdk.style.expressions.Expression.Interpolator;
						public static rgb(param0: java.lang.Number, param1: java.lang.Number, param2: java.lang.Number): com.mapbox.mapboxsdk.style.expressions.Expression;
						public static neq(param0: com.mapbox.mapboxsdk.style.expressions.Expression, param1: java.lang.Number): com.mapbox.mapboxsdk.style.expressions.Expression;
						public static division(param0: java.lang.Number, param1: java.lang.Number): com.mapbox.mapboxsdk.style.expressions.Expression;
						public static neq(param0: com.mapbox.mapboxsdk.style.expressions.Expression, param1: string, param2: com.mapbox.mapboxsdk.style.expressions.Expression): com.mapbox.mapboxsdk.style.expressions.Expression;
						public static bool(param0: native.Array<com.mapbox.mapboxsdk.style.expressions.Expression>): com.mapbox.mapboxsdk.style.expressions.Expression;
						public static neq(param0: com.mapbox.mapboxsdk.style.expressions.Expression, param1: boolean): com.mapbox.mapboxsdk.style.expressions.Expression;
						public hashCode(): number;
						public static literal(param0: boolean): com.mapbox.mapboxsdk.style.expressions.Expression;
						public static lineProgress(): com.mapbox.mapboxsdk.style.expressions.Expression;
						public static lte(param0: com.mapbox.mapboxsdk.style.expressions.Expression, param1: string, param2: com.mapbox.mapboxsdk.style.expressions.Expression): com.mapbox.mapboxsdk.style.expressions.Expression;
						public static log10(param0: java.lang.Number): com.mapbox.mapboxsdk.style.expressions.Expression;
						public static lt(param0: com.mapbox.mapboxsdk.style.expressions.Expression, param1: com.mapbox.mapboxsdk.style.expressions.Expression): com.mapbox.mapboxsdk.style.expressions.Expression;
						public static concat(param0: native.Array<string>): com.mapbox.mapboxsdk.style.expressions.Expression;
						public static lte(param0: com.mapbox.mapboxsdk.style.expressions.Expression, param1: java.lang.Number): com.mapbox.mapboxsdk.style.expressions.Expression;
						public static gte(param0: com.mapbox.mapboxsdk.style.expressions.Expression, param1: com.mapbox.mapboxsdk.style.expressions.Expression, param2: com.mapbox.mapboxsdk.style.expressions.Expression): com.mapbox.mapboxsdk.style.expressions.Expression;
						public static asin(param0: com.mapbox.mapboxsdk.style.expressions.Expression): com.mapbox.mapboxsdk.style.expressions.Expression;
						public static step(param0: com.mapbox.mapboxsdk.style.expressions.Expression, param1: com.mapbox.mapboxsdk.style.expressions.Expression, param2: native.Array<com.mapbox.mapboxsdk.style.expressions.Expression.Stop>): com.mapbox.mapboxsdk.style.expressions.Expression;
						public static mod(param0: java.lang.Number, param1: java.lang.Number): com.mapbox.mapboxsdk.style.expressions.Expression;
						public static acos(param0: com.mapbox.mapboxsdk.style.expressions.Expression): com.mapbox.mapboxsdk.style.expressions.Expression;
						public static not(param0: com.mapbox.mapboxsdk.style.expressions.Expression): com.mapbox.mapboxsdk.style.expressions.Expression;
						public static ceil(param0: com.mapbox.mapboxsdk.style.expressions.Expression): com.mapbox.mapboxsdk.style.expressions.Expression;
						public static rgba(param0: com.mapbox.mapboxsdk.style.expressions.Expression, param1: com.mapbox.mapboxsdk.style.expressions.Expression, param2: com.mapbox.mapboxsdk.style.expressions.Expression, param3: com.mapbox.mapboxsdk.style.expressions.Expression): com.mapbox.mapboxsdk.style.expressions.Expression;
						public static gt(param0: com.mapbox.mapboxsdk.style.expressions.Expression, param1: com.mapbox.mapboxsdk.style.expressions.Expression, param2: com.mapbox.mapboxsdk.style.expressions.Expression): com.mapbox.mapboxsdk.style.expressions.Expression;
						public static min(param0: native.Array<com.mapbox.mapboxsdk.style.expressions.Expression>): com.mapbox.mapboxsdk.style.expressions.Expression;
						public static floor(param0: java.lang.Number): com.mapbox.mapboxsdk.style.expressions.Expression;
						public static lt(param0: com.mapbox.mapboxsdk.style.expressions.Expression, param1: com.mapbox.mapboxsdk.style.expressions.Expression, param2: com.mapbox.mapboxsdk.style.expressions.Expression): com.mapbox.mapboxsdk.style.expressions.Expression;
						public static subtract(param0: com.mapbox.mapboxsdk.style.expressions.Expression, param1: com.mapbox.mapboxsdk.style.expressions.Expression): com.mapbox.mapboxsdk.style.expressions.Expression;
						public static not(param0: boolean): com.mapbox.mapboxsdk.style.expressions.Expression;
						public static length(param0: string): com.mapbox.mapboxsdk.style.expressions.Expression;
						public static neq(param0: com.mapbox.mapboxsdk.style.expressions.Expression, param1: string): com.mapbox.mapboxsdk.style.expressions.Expression;
						public static subtract(param0: java.lang.Number): com.mapbox.mapboxsdk.style.expressions.Expression;
						public static gte(param0: com.mapbox.mapboxsdk.style.expressions.Expression, param1: java.lang.Number): com.mapbox.mapboxsdk.style.expressions.Expression;
						public static step(param0: java.lang.Number, param1: com.mapbox.mapboxsdk.style.expressions.Expression, param2: native.Array<com.mapbox.mapboxsdk.style.expressions.Expression.Stop>): com.mapbox.mapboxsdk.style.expressions.Expression;
						public static collator(param0: com.mapbox.mapboxsdk.style.expressions.Expression, param1: com.mapbox.mapboxsdk.style.expressions.Expression, param2: com.mapbox.mapboxsdk.style.expressions.Expression): com.mapbox.mapboxsdk.style.expressions.Expression;
						public static match(param0: native.Array<com.mapbox.mapboxsdk.style.expressions.Expression>): com.mapbox.mapboxsdk.style.expressions.Expression;
						public static coalesce(param0: native.Array<com.mapbox.mapboxsdk.style.expressions.Expression>): com.mapbox.mapboxsdk.style.expressions.Expression;
						public static stop(param0: any, param1: any): com.mapbox.mapboxsdk.style.expressions.Expression.Stop;
						public static eq(param0: com.mapbox.mapboxsdk.style.expressions.Expression, param1: java.lang.Number): com.mapbox.mapboxsdk.style.expressions.Expression;
						public static zoom(): com.mapbox.mapboxsdk.style.expressions.Expression;
						public static neq(param0: com.mapbox.mapboxsdk.style.expressions.Expression, param1: com.mapbox.mapboxsdk.style.expressions.Expression): com.mapbox.mapboxsdk.style.expressions.Expression;
						public static rgba(param0: java.lang.Number, param1: java.lang.Number, param2: java.lang.Number, param3: java.lang.Number): com.mapbox.mapboxsdk.style.expressions.Expression;
						public toArray(): native.Array<any>;
					}
					export module Expression {
						export class Array extends java.lang.Object {
							public static class: java.lang.Class<com.mapbox.mapboxsdk.style.expressions.Expression.Array>;
							public constructor();
						}
						export class Converter extends java.lang.Object {
							public static class: java.lang.Class<com.mapbox.mapboxsdk.style.expressions.Expression.Converter>;
							public constructor();
							public static convert(param0: any): com.mapbox.mapboxsdk.style.expressions.Expression;
							public static convert(param0: any): com.mapbox.mapboxsdk.style.expressions.Expression;
							public static convert(param0: string): com.mapbox.mapboxsdk.style.expressions.Expression;
						}
						export class ExpressionLiteral extends com.mapbox.mapboxsdk.style.expressions.Expression implements com.mapbox.mapboxsdk.style.expressions.Expression.ValueExpression {
							public static class: java.lang.Class<com.mapbox.mapboxsdk.style.expressions.Expression.ExpressionLiteral>;
							public literal: any;
							public constructor(param0: string, param1: native.Array<com.mapbox.mapboxsdk.style.expressions.Expression>);
							public hashCode(): number;
							public toArray(): native.Array<any>;
							public toString(): string;
							public toValue(): any;
							public static toString(param0: com.mapbox.mapboxsdk.style.expressions.Expression): com.mapbox.mapboxsdk.style.expressions.Expression;
							public equals(param0: any): boolean;
							public constructor(param0: any);
						}
						export class ExpressionLiteralArray extends com.mapbox.mapboxsdk.style.expressions.Expression.ExpressionLiteral {
							public static class: java.lang.Class<com.mapbox.mapboxsdk.style.expressions.Expression.ExpressionLiteralArray>;
							public toString(): string;
							public toValue(): any;
							public static toString(param0: com.mapbox.mapboxsdk.style.expressions.Expression): com.mapbox.mapboxsdk.style.expressions.Expression;
							public equals(param0: any): boolean;
						}
						export class ExpressionMap extends com.mapbox.mapboxsdk.style.expressions.Expression implements com.mapbox.mapboxsdk.style.expressions.Expression.ValueExpression {
							public static class: java.lang.Class<com.mapbox.mapboxsdk.style.expressions.Expression.ExpressionMap>;
							public hashCode(): number;
							public toString(): string;
							public toValue(): any;
							public static toString(param0: com.mapbox.mapboxsdk.style.expressions.Expression): com.mapbox.mapboxsdk.style.expressions.Expression;
							public equals(param0: any): boolean;
						}
						export class FormatEntry extends java.lang.Object {
							public static class: java.lang.Class<com.mapbox.mapboxsdk.style.expressions.Expression.FormatEntry>;
						}
						export class FormatOption extends com.mapbox.mapboxsdk.style.expressions.Expression.Option {
							public static class: java.lang.Class<com.mapbox.mapboxsdk.style.expressions.Expression.FormatOption>;
							public static formatFontScale(param0: number): com.mapbox.mapboxsdk.style.expressions.Expression.FormatOption;
							public static formatFontScale(param0: com.mapbox.mapboxsdk.style.expressions.Expression): com.mapbox.mapboxsdk.style.expressions.Expression.FormatOption;
							public static formatTextFont(param0: com.mapbox.mapboxsdk.style.expressions.Expression): com.mapbox.mapboxsdk.style.expressions.Expression.FormatOption;
							public static formatTextColor(param0: number): com.mapbox.mapboxsdk.style.expressions.Expression.FormatOption;
							public static formatTextFont(param0: native.Array<string>): com.mapbox.mapboxsdk.style.expressions.Expression.FormatOption;
							public static formatTextColor(param0: com.mapbox.mapboxsdk.style.expressions.Expression): com.mapbox.mapboxsdk.style.expressions.Expression.FormatOption;
						}
						export class Interpolator extends com.mapbox.mapboxsdk.style.expressions.Expression {
							public static class: java.lang.Class<com.mapbox.mapboxsdk.style.expressions.Expression.Interpolator>;
						}
						export class NumberFormatOption extends com.mapbox.mapboxsdk.style.expressions.Expression.Option {
							public static class: java.lang.Class<com.mapbox.mapboxsdk.style.expressions.Expression.NumberFormatOption>;
							public static maxFractionDigits(param0: com.mapbox.mapboxsdk.style.expressions.Expression): com.mapbox.mapboxsdk.style.expressions.Expression.NumberFormatOption;
							public static minFractionDigits(param0: com.mapbox.mapboxsdk.style.expressions.Expression): com.mapbox.mapboxsdk.style.expressions.Expression.NumberFormatOption;
							public static maxFractionDigits(param0: number): com.mapbox.mapboxsdk.style.expressions.Expression.NumberFormatOption;
							public static locale(param0: string): com.mapbox.mapboxsdk.style.expressions.Expression.NumberFormatOption;
							public static currency(param0: com.mapbox.mapboxsdk.style.expressions.Expression): com.mapbox.mapboxsdk.style.expressions.Expression.NumberFormatOption;
							public static currency(param0: string): com.mapbox.mapboxsdk.style.expressions.Expression.NumberFormatOption;
							public static locale(param0: com.mapbox.mapboxsdk.style.expressions.Expression): com.mapbox.mapboxsdk.style.expressions.Expression.NumberFormatOption;
							public static minFractionDigits(param0: number): com.mapbox.mapboxsdk.style.expressions.Expression.NumberFormatOption;
						}
						export class Option extends java.lang.Object {
							public static class: java.lang.Class<com.mapbox.mapboxsdk.style.expressions.Expression.Option>;
						}
						export class Stop extends java.lang.Object {
							public static class: java.lang.Class<com.mapbox.mapboxsdk.style.expressions.Expression.Stop>;
						}
						export class ValueExpression extends java.lang.Object {
							public static class: java.lang.Class<com.mapbox.mapboxsdk.style.expressions.Expression.ValueExpression>;
							/**
							 * Constructs a new instance of the com.mapbox.mapboxsdk.style.expressions.Expression$ValueExpression interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
							 */
							public constructor(implementation: {
								toValue(): any;
							});
							public constructor();
							public toValue(): any;
						}
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export module style {
				export module layers {
					export class BackgroundLayer extends com.mapbox.mapboxsdk.style.layers.Layer {
						public static class: java.lang.Class<com.mapbox.mapboxsdk.style.layers.BackgroundLayer>;
						public getBackgroundColorAsInt(): number;
						public constructor();
						public getBackgroundColorTransition(): com.mapbox.mapboxsdk.style.layers.TransitionOptions;
						public getBackgroundColor(): com.mapbox.mapboxsdk.style.layers.PropertyValue<string>;
						public getBackgroundPattern(): com.mapbox.mapboxsdk.style.layers.PropertyValue<string>;
						public setBackgroundPatternTransition(param0: com.mapbox.mapboxsdk.style.layers.TransitionOptions): void;
						public withProperties(param0: native.Array<com.mapbox.mapboxsdk.style.layers.PropertyValue<any>>): com.mapbox.mapboxsdk.style.layers.BackgroundLayer;
						public setBackgroundColorTransition(param0: com.mapbox.mapboxsdk.style.layers.TransitionOptions): void;
						public finalize(): void;
						public getBackgroundPatternTransition(): com.mapbox.mapboxsdk.style.layers.TransitionOptions;
						public constructor(param0: number);
						public getBackgroundOpacity(): com.mapbox.mapboxsdk.style.layers.PropertyValue<java.lang.Float>;
						public getBackgroundOpacityTransition(): com.mapbox.mapboxsdk.style.layers.TransitionOptions;
						public setBackgroundOpacityTransition(param0: com.mapbox.mapboxsdk.style.layers.TransitionOptions): void;
						public initialize(param0: string): void;
						public constructor(param0: string);
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export module style {
				export module layers {
					export class CannotAddLayerException extends java.lang.RuntimeException {
						public static class: java.lang.Class<com.mapbox.mapboxsdk.style.layers.CannotAddLayerException>;
						public constructor();
						public constructor(param0: java.lang.Throwable);
						public constructor(param0: string, param1: java.lang.Throwable);
						public constructor(param0: string, param1: java.lang.Throwable, param2: boolean, param3: boolean);
						public constructor(param0: string);
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export module style {
				export module layers {
					export class CircleLayer extends com.mapbox.mapboxsdk.style.layers.Layer {
						public static class: java.lang.Class<com.mapbox.mapboxsdk.style.layers.CircleLayer>;
						public getSourceLayer(): string;
						public getCircleStrokeColorTransition(): com.mapbox.mapboxsdk.style.layers.TransitionOptions;
						public setCircleColorTransition(param0: com.mapbox.mapboxsdk.style.layers.TransitionOptions): void;
						public setCircleOpacityTransition(param0: com.mapbox.mapboxsdk.style.layers.TransitionOptions): void;
						public initialize(param0: string, param1: string): void;
						public withFilter(param0: com.mapbox.mapboxsdk.style.expressions.Expression): com.mapbox.mapboxsdk.style.layers.CircleLayer;
						public getCircleBlur(): com.mapbox.mapboxsdk.style.layers.PropertyValue<java.lang.Float>;
						public setCircleStrokeOpacityTransition(param0: com.mapbox.mapboxsdk.style.layers.TransitionOptions): void;
						public getFilter(): com.mapbox.mapboxsdk.style.expressions.Expression;
						public finalize(): void;
						public getCircleColor(): com.mapbox.mapboxsdk.style.layers.PropertyValue<string>;
						public getCircleBlurTransition(): com.mapbox.mapboxsdk.style.layers.TransitionOptions;
						public getCircleRadiusTransition(): com.mapbox.mapboxsdk.style.layers.TransitionOptions;
						public getCircleTranslateAnchor(): com.mapbox.mapboxsdk.style.layers.PropertyValue<string>;
						public getCircleTranslate(): com.mapbox.mapboxsdk.style.layers.PropertyValue<native.Array<java.lang.Float>>;
						public setCircleTranslateTransition(param0: com.mapbox.mapboxsdk.style.layers.TransitionOptions): void;
						public getCircleOpacityTransition(): com.mapbox.mapboxsdk.style.layers.TransitionOptions;
						public constructor(param0: string, param1: string);
						public getCircleStrokeOpacityTransition(): com.mapbox.mapboxsdk.style.layers.TransitionOptions;
						public setCircleBlurTransition(param0: com.mapbox.mapboxsdk.style.layers.TransitionOptions): void;
						public getCircleColorTransition(): com.mapbox.mapboxsdk.style.layers.TransitionOptions;
						public getCircleStrokeWidthTransition(): com.mapbox.mapboxsdk.style.layers.TransitionOptions;
						public getCircleStrokeColor(): com.mapbox.mapboxsdk.style.layers.PropertyValue<string>;
						public setFilter(param0: com.mapbox.mapboxsdk.style.expressions.Expression): void;
						public setCircleRadiusTransition(param0: com.mapbox.mapboxsdk.style.layers.TransitionOptions): void;
						public constructor();
						public getCirclePitchScale(): com.mapbox.mapboxsdk.style.layers.PropertyValue<string>;
						public setSourceLayer(param0: string): void;
						public setCircleStrokeColorTransition(param0: com.mapbox.mapboxsdk.style.layers.TransitionOptions): void;
						public getCircleColorAsInt(): number;
						public withProperties(param0: native.Array<com.mapbox.mapboxsdk.style.layers.PropertyValue<any>>): com.mapbox.mapboxsdk.style.layers.CircleLayer;
						public setCircleStrokeWidthTransition(param0: com.mapbox.mapboxsdk.style.layers.TransitionOptions): void;
						public getSourceId(): string;
						public getCircleTranslateTransition(): com.mapbox.mapboxsdk.style.layers.TransitionOptions;
						public getCircleRadius(): com.mapbox.mapboxsdk.style.layers.PropertyValue<java.lang.Float>;
						public constructor(param0: number);
						public getCircleOpacity(): com.mapbox.mapboxsdk.style.layers.PropertyValue<java.lang.Float>;
						public getCircleStrokeWidth(): com.mapbox.mapboxsdk.style.layers.PropertyValue<java.lang.Float>;
						public getCircleStrokeColorAsInt(): number;
						public withSourceLayer(param0: string): com.mapbox.mapboxsdk.style.layers.CircleLayer;
						public getCircleStrokeOpacity(): com.mapbox.mapboxsdk.style.layers.PropertyValue<java.lang.Float>;
						public getCirclePitchAlignment(): com.mapbox.mapboxsdk.style.layers.PropertyValue<string>;
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export module style {
				export module layers {
					export class CustomLayer extends com.mapbox.mapboxsdk.style.layers.Layer {
						public static class: java.lang.Class<com.mapbox.mapboxsdk.style.layers.CustomLayer>;
						public initialize(param0: string, param1: number): void;
						public constructor();
						public constructor(param0: string, param1: number);
						public constructor(param0: number);
						public update(): void;
						public nativeUpdate(): void;
						public finalize(): void;
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export module style {
				export module layers {
					export class FillExtrusionLayer extends com.mapbox.mapboxsdk.style.layers.Layer {
						public static class: java.lang.Class<com.mapbox.mapboxsdk.style.layers.FillExtrusionLayer>;
						public getFillExtrusionTranslateTransition(): com.mapbox.mapboxsdk.style.layers.TransitionOptions;
						public getSourceLayer(): string;
						public setFillExtrusionHeightTransition(param0: com.mapbox.mapboxsdk.style.layers.TransitionOptions): void;
						public withSourceLayer(param0: string): com.mapbox.mapboxsdk.style.layers.FillExtrusionLayer;
						public initialize(param0: string, param1: string): void;
						public getFilter(): com.mapbox.mapboxsdk.style.expressions.Expression;
						public finalize(): void;
						public getFillExtrusionHeight(): com.mapbox.mapboxsdk.style.layers.PropertyValue<java.lang.Float>;
						public setFillExtrusionPatternTransition(param0: com.mapbox.mapboxsdk.style.layers.TransitionOptions): void;
						public getFillExtrusionOpacity(): com.mapbox.mapboxsdk.style.layers.PropertyValue<java.lang.Float>;
						public getFillExtrusionTranslate(): com.mapbox.mapboxsdk.style.layers.PropertyValue<native.Array<java.lang.Float>>;
						public constructor(param0: string, param1: string);
						public getFillExtrusionBaseTransition(): com.mapbox.mapboxsdk.style.layers.TransitionOptions;
						public getFillExtrusionTranslateAnchor(): com.mapbox.mapboxsdk.style.layers.PropertyValue<string>;
						public getFillExtrusionBase(): com.mapbox.mapboxsdk.style.layers.PropertyValue<java.lang.Float>;
						public setFilter(param0: com.mapbox.mapboxsdk.style.expressions.Expression): void;
						public setFillExtrusionBaseTransition(param0: com.mapbox.mapboxsdk.style.layers.TransitionOptions): void;
						public constructor();
						public getFillExtrusionHeightTransition(): com.mapbox.mapboxsdk.style.layers.TransitionOptions;
						public getFillExtrusionColor(): com.mapbox.mapboxsdk.style.layers.PropertyValue<string>;
						public setSourceLayer(param0: string): void;
						public setFillExtrusionColorTransition(param0: com.mapbox.mapboxsdk.style.layers.TransitionOptions): void;
						public getFillExtrusionPattern(): com.mapbox.mapboxsdk.style.layers.PropertyValue<string>;
						public getFillExtrusionOpacityTransition(): com.mapbox.mapboxsdk.style.layers.TransitionOptions;
						public getSourceId(): string;
						public setFillExtrusionOpacityTransition(param0: com.mapbox.mapboxsdk.style.layers.TransitionOptions): void;
						public getFillExtrusionColorAsInt(): number;
						public getFillExtrusionPatternTransition(): com.mapbox.mapboxsdk.style.layers.TransitionOptions;
						public setFillExtrusionTranslateTransition(param0: com.mapbox.mapboxsdk.style.layers.TransitionOptions): void;
						public constructor(param0: number);
						public withProperties(param0: native.Array<com.mapbox.mapboxsdk.style.layers.PropertyValue<any>>): com.mapbox.mapboxsdk.style.layers.FillExtrusionLayer;
						public getFillExtrusionColorTransition(): com.mapbox.mapboxsdk.style.layers.TransitionOptions;
						public getFillExtrusionVerticalGradient(): com.mapbox.mapboxsdk.style.layers.PropertyValue<java.lang.Boolean>;
						public withFilter(param0: com.mapbox.mapboxsdk.style.expressions.Expression): com.mapbox.mapboxsdk.style.layers.FillExtrusionLayer;
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export module style {
				export module layers {
					export class FillLayer extends com.mapbox.mapboxsdk.style.layers.Layer {
						public static class: java.lang.Class<com.mapbox.mapboxsdk.style.layers.FillLayer>;
						public getFillTranslateAnchor(): com.mapbox.mapboxsdk.style.layers.PropertyValue<string>;
						public getSourceLayer(): string;
						public getFillColorAsInt(): number;
						public setFillColorTransition(param0: com.mapbox.mapboxsdk.style.layers.TransitionOptions): void;
						public initialize(param0: string, param1: string): void;
						public setFillPatternTransition(param0: com.mapbox.mapboxsdk.style.layers.TransitionOptions): void;
						public getFilter(): com.mapbox.mapboxsdk.style.expressions.Expression;
						public finalize(): void;
						public setFillOutlineColorTransition(param0: com.mapbox.mapboxsdk.style.layers.TransitionOptions): void;
						public getFillOutlineColorTransition(): com.mapbox.mapboxsdk.style.layers.TransitionOptions;
						public withSourceLayer(param0: string): com.mapbox.mapboxsdk.style.layers.FillLayer;
						public getFillPatternTransition(): com.mapbox.mapboxsdk.style.layers.TransitionOptions;
						public constructor(param0: string, param1: string);
						public setFilter(param0: com.mapbox.mapboxsdk.style.expressions.Expression): void;
						public getFillOpacity(): com.mapbox.mapboxsdk.style.layers.PropertyValue<java.lang.Float>;
						public withProperties(param0: native.Array<com.mapbox.mapboxsdk.style.layers.PropertyValue<any>>): com.mapbox.mapboxsdk.style.layers.FillLayer;
						public constructor();
						public getFillTranslate(): com.mapbox.mapboxsdk.style.layers.PropertyValue<native.Array<java.lang.Float>>;
						public setSourceLayer(param0: string): void;
						public getFillColorTransition(): com.mapbox.mapboxsdk.style.layers.TransitionOptions;
						public setFillOpacityTransition(param0: com.mapbox.mapboxsdk.style.layers.TransitionOptions): void;
						public getSourceId(): string;
						public getFillOutlineColor(): com.mapbox.mapboxsdk.style.layers.PropertyValue<string>;
						public getFillOpacityTransition(): com.mapbox.mapboxsdk.style.layers.TransitionOptions;
						public getFillAntialias(): com.mapbox.mapboxsdk.style.layers.PropertyValue<java.lang.Boolean>;
						public setFillTranslateTransition(param0: com.mapbox.mapboxsdk.style.layers.TransitionOptions): void;
						public constructor(param0: number);
						public getFillOutlineColorAsInt(): number;
						public withFilter(param0: com.mapbox.mapboxsdk.style.expressions.Expression): com.mapbox.mapboxsdk.style.layers.FillLayer;
						public getFillPattern(): com.mapbox.mapboxsdk.style.layers.PropertyValue<string>;
						public getFillTranslateTransition(): com.mapbox.mapboxsdk.style.layers.TransitionOptions;
						public getFillColor(): com.mapbox.mapboxsdk.style.layers.PropertyValue<string>;
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export module style {
				export module layers {
					export class HeatmapLayer extends com.mapbox.mapboxsdk.style.layers.Layer {
						public static class: java.lang.Class<com.mapbox.mapboxsdk.style.layers.HeatmapLayer>;
						public withSourceLayer(param0: string): com.mapbox.mapboxsdk.style.layers.HeatmapLayer;
						public getSourceLayer(): string;
						public getHeatmapOpacityTransition(): com.mapbox.mapboxsdk.style.layers.TransitionOptions;
						public initialize(param0: string, param1: string): void;
						public getHeatmapOpacity(): com.mapbox.mapboxsdk.style.layers.PropertyValue<java.lang.Float>;
						public getHeatmapRadius(): com.mapbox.mapboxsdk.style.layers.PropertyValue<java.lang.Float>;
						public withProperties(param0: native.Array<com.mapbox.mapboxsdk.style.layers.PropertyValue<any>>): com.mapbox.mapboxsdk.style.layers.HeatmapLayer;
						public getFilter(): com.mapbox.mapboxsdk.style.expressions.Expression;
						public finalize(): void;
						public getHeatmapWeight(): com.mapbox.mapboxsdk.style.layers.PropertyValue<java.lang.Float>;
						public getHeatmapColor(): com.mapbox.mapboxsdk.style.layers.PropertyValue<string>;
						public constructor(param0: string, param1: string);
						public getHeatmapIntensityTransition(): com.mapbox.mapboxsdk.style.layers.TransitionOptions;
						public setFilter(param0: com.mapbox.mapboxsdk.style.expressions.Expression): void;
						public constructor();
						public getHeatmapIntensity(): com.mapbox.mapboxsdk.style.layers.PropertyValue<java.lang.Float>;
						public setHeatmapIntensityTransition(param0: com.mapbox.mapboxsdk.style.layers.TransitionOptions): void;
						public setSourceLayer(param0: string): void;
						public setHeatmapRadiusTransition(param0: com.mapbox.mapboxsdk.style.layers.TransitionOptions): void;
						public withFilter(param0: com.mapbox.mapboxsdk.style.expressions.Expression): com.mapbox.mapboxsdk.style.layers.HeatmapLayer;
						public getSourceId(): string;
						public setHeatmapOpacityTransition(param0: com.mapbox.mapboxsdk.style.layers.TransitionOptions): void;
						public constructor(param0: number);
						public getHeatmapRadiusTransition(): com.mapbox.mapboxsdk.style.layers.TransitionOptions;
						public getHeatmapColorAsInt(): number;
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export module style {
				export module layers {
					export class HillshadeLayer extends com.mapbox.mapboxsdk.style.layers.Layer {
						public static class: java.lang.Class<com.mapbox.mapboxsdk.style.layers.HillshadeLayer>;
						public getHillshadeShadowColorTransition(): com.mapbox.mapboxsdk.style.layers.TransitionOptions;
						public getHillshadeExaggeration(): com.mapbox.mapboxsdk.style.layers.PropertyValue<java.lang.Float>;
						public initialize(param0: string, param1: string): void;
						public getHillshadeIlluminationAnchor(): com.mapbox.mapboxsdk.style.layers.PropertyValue<string>;
						public finalize(): void;
						public getHillshadeIlluminationDirection(): com.mapbox.mapboxsdk.style.layers.PropertyValue<java.lang.Float>;
						public setHillshadeShadowColorTransition(param0: com.mapbox.mapboxsdk.style.layers.TransitionOptions): void;
						public getHillshadeHighlightColor(): com.mapbox.mapboxsdk.style.layers.PropertyValue<string>;
						public constructor(param0: string, param1: string);
						public withProperties(param0: native.Array<com.mapbox.mapboxsdk.style.layers.PropertyValue<any>>): com.mapbox.mapboxsdk.style.layers.HillshadeLayer;
						public setHillshadeHighlightColorTransition(param0: com.mapbox.mapboxsdk.style.layers.TransitionOptions): void;
						public constructor();
						public getHillshadeShadowColor(): com.mapbox.mapboxsdk.style.layers.PropertyValue<string>;
						public setHillshadeExaggerationTransition(param0: com.mapbox.mapboxsdk.style.layers.TransitionOptions): void;
						public setSourceLayer(param0: string): void;
						public getHillshadeAccentColor(): com.mapbox.mapboxsdk.style.layers.PropertyValue<string>;
						public setHillshadeAccentColorTransition(param0: com.mapbox.mapboxsdk.style.layers.TransitionOptions): void;
						public getSourceId(): string;
						public getHillshadeExaggerationTransition(): com.mapbox.mapboxsdk.style.layers.TransitionOptions;
						public withSourceLayer(param0: string): com.mapbox.mapboxsdk.style.layers.HillshadeLayer;
						public getHillshadeAccentColorTransition(): com.mapbox.mapboxsdk.style.layers.TransitionOptions;
						public constructor(param0: number);
						public getHillshadeShadowColorAsInt(): number;
						public getHillshadeHighlightColorTransition(): com.mapbox.mapboxsdk.style.layers.TransitionOptions;
						public getHillshadeAccentColorAsInt(): number;
						public getHillshadeHighlightColorAsInt(): number;
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export module style {
				export module layers {
					export abstract class Layer extends java.lang.Object {
						public static class: java.lang.Class<com.mapbox.mapboxsdk.style.layers.Layer>;
						public getMaxZoom(): number;
						public nativeSetFilter(param0: native.Array<any>): void;
						public getMinZoom(): number;
						public checkThread(): void;
						public nativeGetMaxZoom(): number;
						public nativeSetSourceLayer(param0: string): void;
						public nativeGetSourceLayer(): string;
						public finalize(): void;
						public getNativePtr(): number;
						public setDetached(): void;
						public getVisibility(): com.mapbox.mapboxsdk.style.layers.PropertyValue<string>;
						public setMinZoom(param0: number): void;
						public isDetached(): boolean;
						public getId(): string;
						public nativeGetMinZoom(): number;
						public nativeSetMinZoom(param0: number): void;
						public constructor();
						public nativeSetMaxZoom(param0: number): void;
						public setMaxZoom(param0: number): void;
						public nativeGetVisibility(): any;
						public nativeSetLayoutProperty(param0: string, param1: any): void;
						public constructor(param0: number);
						public nativeSetPaintProperty(param0: string, param1: any): void;
						public nativeGetSourceId(): string;
						public setProperties(param0: native.Array<com.mapbox.mapboxsdk.style.layers.PropertyValue<any>>): void;
						public nativeGetFilter(): any;
						public nativeGetId(): string;
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export module style {
				export module layers {
					export class LayoutPropertyValue<T>  extends com.mapbox.mapboxsdk.style.layers.PropertyValue<any> {
						public static class: java.lang.Class<com.mapbox.mapboxsdk.style.layers.LayoutPropertyValue<any>>;
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export module style {
				export module layers {
					export class LineLayer extends com.mapbox.mapboxsdk.style.layers.Layer {
						public static class: java.lang.Class<com.mapbox.mapboxsdk.style.layers.LineLayer>;
						public getLineOpacity(): com.mapbox.mapboxsdk.style.layers.PropertyValue<java.lang.Float>;
						public getLineOpacityTransition(): com.mapbox.mapboxsdk.style.layers.TransitionOptions;
						public getLinePattern(): com.mapbox.mapboxsdk.style.layers.PropertyValue<string>;
						public getSourceLayer(): string;
						public getLineMiterLimit(): com.mapbox.mapboxsdk.style.layers.PropertyValue<java.lang.Float>;
						public getLineGradientAsInt(): number;
						public getLineCap(): com.mapbox.mapboxsdk.style.layers.PropertyValue<string>;
						public initialize(param0: string, param1: string): void;
						public getLineGradient(): com.mapbox.mapboxsdk.style.layers.PropertyValue<string>;
						public setLineBlurTransition(param0: com.mapbox.mapboxsdk.style.layers.TransitionOptions): void;
						public getFilter(): com.mapbox.mapboxsdk.style.expressions.Expression;
						public setLineOpacityTransition(param0: com.mapbox.mapboxsdk.style.layers.TransitionOptions): void;
						public finalize(): void;
						public getLineGapWidthTransition(): com.mapbox.mapboxsdk.style.layers.TransitionOptions;
						public getLineColorAsInt(): number;
						public withFilter(param0: com.mapbox.mapboxsdk.style.expressions.Expression): com.mapbox.mapboxsdk.style.layers.LineLayer;
						public getLinePatternTransition(): com.mapbox.mapboxsdk.style.layers.TransitionOptions;
						public constructor(param0: string, param1: string);
						public getLineTranslateTransition(): com.mapbox.mapboxsdk.style.layers.TransitionOptions;
						public setLineOffsetTransition(param0: com.mapbox.mapboxsdk.style.layers.TransitionOptions): void;
						public setLineDasharrayTransition(param0: com.mapbox.mapboxsdk.style.layers.TransitionOptions): void;
						public setFilter(param0: com.mapbox.mapboxsdk.style.expressions.Expression): void;
						public getLineRoundLimit(): com.mapbox.mapboxsdk.style.layers.PropertyValue<java.lang.Float>;
						public constructor();
						public getLineJoin(): com.mapbox.mapboxsdk.style.layers.PropertyValue<string>;
						public getLineWidthTransition(): com.mapbox.mapboxsdk.style.layers.TransitionOptions;
						public setLineColorTransition(param0: com.mapbox.mapboxsdk.style.layers.TransitionOptions): void;
						public getLineBlurTransition(): com.mapbox.mapboxsdk.style.layers.TransitionOptions;
						public getLineDasharrayTransition(): com.mapbox.mapboxsdk.style.layers.TransitionOptions;
						public withProperties(param0: native.Array<com.mapbox.mapboxsdk.style.layers.PropertyValue<any>>): com.mapbox.mapboxsdk.style.layers.LineLayer;
						public setLinePatternTransition(param0: com.mapbox.mapboxsdk.style.layers.TransitionOptions): void;
						public getLineOffset(): com.mapbox.mapboxsdk.style.layers.PropertyValue<java.lang.Float>;
						public setSourceLayer(param0: string): void;
						public getSourceId(): string;
						public getLineBlur(): com.mapbox.mapboxsdk.style.layers.PropertyValue<java.lang.Float>;
						public withSourceLayer(param0: string): com.mapbox.mapboxsdk.style.layers.LineLayer;
						public getLineColor(): com.mapbox.mapboxsdk.style.layers.PropertyValue<string>;
						public setLineGapWidthTransition(param0: com.mapbox.mapboxsdk.style.layers.TransitionOptions): void;
						public getLineTranslate(): com.mapbox.mapboxsdk.style.layers.PropertyValue<native.Array<java.lang.Float>>;
						public setLineTranslateTransition(param0: com.mapbox.mapboxsdk.style.layers.TransitionOptions): void;
						public constructor(param0: number);
						public getLineWidth(): com.mapbox.mapboxsdk.style.layers.PropertyValue<java.lang.Float>;
						public getLineGapWidth(): com.mapbox.mapboxsdk.style.layers.PropertyValue<java.lang.Float>;
						public getLineOffsetTransition(): com.mapbox.mapboxsdk.style.layers.TransitionOptions;
						public getLineColorTransition(): com.mapbox.mapboxsdk.style.layers.TransitionOptions;
						public getLineTranslateAnchor(): com.mapbox.mapboxsdk.style.layers.PropertyValue<string>;
						public setLineWidthTransition(param0: com.mapbox.mapboxsdk.style.layers.TransitionOptions): void;
						public getLineDasharray(): com.mapbox.mapboxsdk.style.layers.PropertyValue<native.Array<java.lang.Float>>;
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export module style {
				export module layers {
					export class PaintPropertyValue<T>  extends com.mapbox.mapboxsdk.style.layers.PropertyValue<any> {
						public static class: java.lang.Class<com.mapbox.mapboxsdk.style.layers.PaintPropertyValue<any>>;
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export module style {
				export module layers {
					export class Property extends java.lang.Object {
						public static class: java.lang.Class<com.mapbox.mapboxsdk.style.layers.Property>;
						public static VISIBLE: string;
						public static NONE: string;
						public static LINE_CAP_BUTT: string;
						public static LINE_CAP_ROUND: string;
						public static LINE_CAP_SQUARE: string;
						public static LINE_JOIN_BEVEL: string;
						public static LINE_JOIN_ROUND: string;
						public static LINE_JOIN_MITER: string;
						public static SYMBOL_PLACEMENT_POINT: string;
						public static SYMBOL_PLACEMENT_LINE: string;
						public static SYMBOL_PLACEMENT_LINE_CENTER: string;
						public static SYMBOL_Z_ORDER_AUTO: string;
						public static SYMBOL_Z_ORDER_VIEWPORT_Y: string;
						public static SYMBOL_Z_ORDER_SOURCE: string;
						public static ICON_ROTATION_ALIGNMENT_MAP: string;
						public static ICON_ROTATION_ALIGNMENT_VIEWPORT: string;
						public static ICON_ROTATION_ALIGNMENT_AUTO: string;
						public static ICON_TEXT_FIT_NONE: string;
						public static ICON_TEXT_FIT_WIDTH: string;
						public static ICON_TEXT_FIT_HEIGHT: string;
						public static ICON_TEXT_FIT_BOTH: string;
						public static ICON_ANCHOR_CENTER: string;
						public static ICON_ANCHOR_LEFT: string;
						public static ICON_ANCHOR_RIGHT: string;
						public static ICON_ANCHOR_TOP: string;
						public static ICON_ANCHOR_BOTTOM: string;
						public static ICON_ANCHOR_TOP_LEFT: string;
						public static ICON_ANCHOR_TOP_RIGHT: string;
						public static ICON_ANCHOR_BOTTOM_LEFT: string;
						public static ICON_ANCHOR_BOTTOM_RIGHT: string;
						public static ICON_PITCH_ALIGNMENT_MAP: string;
						public static ICON_PITCH_ALIGNMENT_VIEWPORT: string;
						public static ICON_PITCH_ALIGNMENT_AUTO: string;
						public static TEXT_PITCH_ALIGNMENT_MAP: string;
						public static TEXT_PITCH_ALIGNMENT_VIEWPORT: string;
						public static TEXT_PITCH_ALIGNMENT_AUTO: string;
						public static TEXT_ROTATION_ALIGNMENT_MAP: string;
						public static TEXT_ROTATION_ALIGNMENT_VIEWPORT: string;
						public static TEXT_ROTATION_ALIGNMENT_AUTO: string;
						public static TEXT_JUSTIFY_AUTO: string;
						public static TEXT_JUSTIFY_LEFT: string;
						public static TEXT_JUSTIFY_CENTER: string;
						public static TEXT_JUSTIFY_RIGHT: string;
						public static TEXT_ANCHOR_CENTER: string;
						public static TEXT_ANCHOR_LEFT: string;
						public static TEXT_ANCHOR_RIGHT: string;
						public static TEXT_ANCHOR_TOP: string;
						public static TEXT_ANCHOR_BOTTOM: string;
						public static TEXT_ANCHOR_TOP_LEFT: string;
						public static TEXT_ANCHOR_TOP_RIGHT: string;
						public static TEXT_ANCHOR_BOTTOM_LEFT: string;
						public static TEXT_ANCHOR_BOTTOM_RIGHT: string;
						public static TEXT_TRANSFORM_NONE: string;
						public static TEXT_TRANSFORM_UPPERCASE: string;
						public static TEXT_TRANSFORM_LOWERCASE: string;
						public static FILL_TRANSLATE_ANCHOR_MAP: string;
						public static FILL_TRANSLATE_ANCHOR_VIEWPORT: string;
						public static LINE_TRANSLATE_ANCHOR_MAP: string;
						public static LINE_TRANSLATE_ANCHOR_VIEWPORT: string;
						public static ICON_TRANSLATE_ANCHOR_MAP: string;
						public static ICON_TRANSLATE_ANCHOR_VIEWPORT: string;
						public static TEXT_TRANSLATE_ANCHOR_MAP: string;
						public static TEXT_TRANSLATE_ANCHOR_VIEWPORT: string;
						public static CIRCLE_TRANSLATE_ANCHOR_MAP: string;
						public static CIRCLE_TRANSLATE_ANCHOR_VIEWPORT: string;
						public static CIRCLE_PITCH_SCALE_MAP: string;
						public static CIRCLE_PITCH_SCALE_VIEWPORT: string;
						public static CIRCLE_PITCH_ALIGNMENT_MAP: string;
						public static CIRCLE_PITCH_ALIGNMENT_VIEWPORT: string;
						public static FILL_EXTRUSION_TRANSLATE_ANCHOR_MAP: string;
						public static FILL_EXTRUSION_TRANSLATE_ANCHOR_VIEWPORT: string;
						public static RASTER_RESAMPLING_LINEAR: string;
						public static RASTER_RESAMPLING_NEAREST: string;
						public static HILLSHADE_ILLUMINATION_ANCHOR_MAP: string;
						public static HILLSHADE_ILLUMINATION_ANCHOR_VIEWPORT: string;
						public static ANCHOR_MAP: string;
						public static ANCHOR_VIEWPORT: string;
						public static TEXT_WRITING_MODE_HORIZONTAL: string;
						public static TEXT_WRITING_MODE_VERTICAL: string;
					}
					export module Property {
						export class ANCHOR extends java.lang.Object implements java.lang.annotation.Annotation {
							public static class: java.lang.Class<com.mapbox.mapboxsdk.style.layers.Property.ANCHOR>;
							/**
							 * Constructs a new instance of the com.mapbox.mapboxsdk.style.layers.Property$ANCHOR interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
							 */
							public constructor(implementation: {
								equals(param0: any): boolean;
								hashCode(): number;
								toString(): string;
								annotationType(): java.lang.Class<any>;
							});
							public constructor();
							public hashCode(): number;
							public annotationType(): java.lang.Class<any>;
							public toString(): string;
							public equals(param0: any): boolean;
						}
						export class CIRCLE_PITCH_ALIGNMENT extends java.lang.Object implements java.lang.annotation.Annotation {
							public static class: java.lang.Class<com.mapbox.mapboxsdk.style.layers.Property.CIRCLE_PITCH_ALIGNMENT>;
							/**
							 * Constructs a new instance of the com.mapbox.mapboxsdk.style.layers.Property$CIRCLE_PITCH_ALIGNMENT interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
							 */
							public constructor(implementation: {
								equals(param0: any): boolean;
								hashCode(): number;
								toString(): string;
								annotationType(): java.lang.Class<any>;
							});
							public constructor();
							public hashCode(): number;
							public annotationType(): java.lang.Class<any>;
							public toString(): string;
							public equals(param0: any): boolean;
						}
						export class CIRCLE_PITCH_SCALE extends java.lang.Object implements java.lang.annotation.Annotation {
							public static class: java.lang.Class<com.mapbox.mapboxsdk.style.layers.Property.CIRCLE_PITCH_SCALE>;
							/**
							 * Constructs a new instance of the com.mapbox.mapboxsdk.style.layers.Property$CIRCLE_PITCH_SCALE interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
							 */
							public constructor(implementation: {
								equals(param0: any): boolean;
								hashCode(): number;
								toString(): string;
								annotationType(): java.lang.Class<any>;
							});
							public constructor();
							public hashCode(): number;
							public annotationType(): java.lang.Class<any>;
							public toString(): string;
							public equals(param0: any): boolean;
						}
						export class CIRCLE_TRANSLATE_ANCHOR extends java.lang.Object implements java.lang.annotation.Annotation {
							public static class: java.lang.Class<com.mapbox.mapboxsdk.style.layers.Property.CIRCLE_TRANSLATE_ANCHOR>;
							/**
							 * Constructs a new instance of the com.mapbox.mapboxsdk.style.layers.Property$CIRCLE_TRANSLATE_ANCHOR interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
							 */
							public constructor(implementation: {
								equals(param0: any): boolean;
								hashCode(): number;
								toString(): string;
								annotationType(): java.lang.Class<any>;
							});
							public constructor();
							public hashCode(): number;
							public annotationType(): java.lang.Class<any>;
							public toString(): string;
							public equals(param0: any): boolean;
						}
						export class FILL_EXTRUSION_TRANSLATE_ANCHOR extends java.lang.Object implements java.lang.annotation.Annotation {
							public static class: java.lang.Class<com.mapbox.mapboxsdk.style.layers.Property.FILL_EXTRUSION_TRANSLATE_ANCHOR>;
							/**
							 * Constructs a new instance of the com.mapbox.mapboxsdk.style.layers.Property$FILL_EXTRUSION_TRANSLATE_ANCHOR interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
							 */
							public constructor(implementation: {
								equals(param0: any): boolean;
								hashCode(): number;
								toString(): string;
								annotationType(): java.lang.Class<any>;
							});
							public constructor();
							public hashCode(): number;
							public annotationType(): java.lang.Class<any>;
							public toString(): string;
							public equals(param0: any): boolean;
						}
						export class FILL_TRANSLATE_ANCHOR extends java.lang.Object implements java.lang.annotation.Annotation {
							public static class: java.lang.Class<com.mapbox.mapboxsdk.style.layers.Property.FILL_TRANSLATE_ANCHOR>;
							/**
							 * Constructs a new instance of the com.mapbox.mapboxsdk.style.layers.Property$FILL_TRANSLATE_ANCHOR interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
							 */
							public constructor(implementation: {
								equals(param0: any): boolean;
								hashCode(): number;
								toString(): string;
								annotationType(): java.lang.Class<any>;
							});
							public constructor();
							public hashCode(): number;
							public annotationType(): java.lang.Class<any>;
							public toString(): string;
							public equals(param0: any): boolean;
						}
						export class HILLSHADE_ILLUMINATION_ANCHOR extends java.lang.Object implements java.lang.annotation.Annotation {
							public static class: java.lang.Class<com.mapbox.mapboxsdk.style.layers.Property.HILLSHADE_ILLUMINATION_ANCHOR>;
							/**
							 * Constructs a new instance of the com.mapbox.mapboxsdk.style.layers.Property$HILLSHADE_ILLUMINATION_ANCHOR interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
							 */
							public constructor(implementation: {
								equals(param0: any): boolean;
								hashCode(): number;
								toString(): string;
								annotationType(): java.lang.Class<any>;
							});
							public constructor();
							public hashCode(): number;
							public annotationType(): java.lang.Class<any>;
							public toString(): string;
							public equals(param0: any): boolean;
						}
						export class ICON_ANCHOR extends java.lang.Object implements java.lang.annotation.Annotation {
							public static class: java.lang.Class<com.mapbox.mapboxsdk.style.layers.Property.ICON_ANCHOR>;
							/**
							 * Constructs a new instance of the com.mapbox.mapboxsdk.style.layers.Property$ICON_ANCHOR interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
							 */
							public constructor(implementation: {
								equals(param0: any): boolean;
								hashCode(): number;
								toString(): string;
								annotationType(): java.lang.Class<any>;
							});
							public constructor();
							public hashCode(): number;
							public annotationType(): java.lang.Class<any>;
							public toString(): string;
							public equals(param0: any): boolean;
						}
						export class ICON_PITCH_ALIGNMENT extends java.lang.Object implements java.lang.annotation.Annotation {
							public static class: java.lang.Class<com.mapbox.mapboxsdk.style.layers.Property.ICON_PITCH_ALIGNMENT>;
							/**
							 * Constructs a new instance of the com.mapbox.mapboxsdk.style.layers.Property$ICON_PITCH_ALIGNMENT interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
							 */
							public constructor(implementation: {
								equals(param0: any): boolean;
								hashCode(): number;
								toString(): string;
								annotationType(): java.lang.Class<any>;
							});
							public constructor();
							public hashCode(): number;
							public annotationType(): java.lang.Class<any>;
							public toString(): string;
							public equals(param0: any): boolean;
						}
						export class ICON_ROTATION_ALIGNMENT extends java.lang.Object implements java.lang.annotation.Annotation {
							public static class: java.lang.Class<com.mapbox.mapboxsdk.style.layers.Property.ICON_ROTATION_ALIGNMENT>;
							/**
							 * Constructs a new instance of the com.mapbox.mapboxsdk.style.layers.Property$ICON_ROTATION_ALIGNMENT interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
							 */
							public constructor(implementation: {
								equals(param0: any): boolean;
								hashCode(): number;
								toString(): string;
								annotationType(): java.lang.Class<any>;
							});
							public constructor();
							public hashCode(): number;
							public annotationType(): java.lang.Class<any>;
							public toString(): string;
							public equals(param0: any): boolean;
						}
						export class ICON_TEXT_FIT extends java.lang.Object implements java.lang.annotation.Annotation {
							public static class: java.lang.Class<com.mapbox.mapboxsdk.style.layers.Property.ICON_TEXT_FIT>;
							/**
							 * Constructs a new instance of the com.mapbox.mapboxsdk.style.layers.Property$ICON_TEXT_FIT interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
							 */
							public constructor(implementation: {
								equals(param0: any): boolean;
								hashCode(): number;
								toString(): string;
								annotationType(): java.lang.Class<any>;
							});
							public constructor();
							public hashCode(): number;
							public annotationType(): java.lang.Class<any>;
							public toString(): string;
							public equals(param0: any): boolean;
						}
						export class ICON_TRANSLATE_ANCHOR extends java.lang.Object implements java.lang.annotation.Annotation {
							public static class: java.lang.Class<com.mapbox.mapboxsdk.style.layers.Property.ICON_TRANSLATE_ANCHOR>;
							/**
							 * Constructs a new instance of the com.mapbox.mapboxsdk.style.layers.Property$ICON_TRANSLATE_ANCHOR interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
							 */
							public constructor(implementation: {
								equals(param0: any): boolean;
								hashCode(): number;
								toString(): string;
								annotationType(): java.lang.Class<any>;
							});
							public constructor();
							public hashCode(): number;
							public annotationType(): java.lang.Class<any>;
							public toString(): string;
							public equals(param0: any): boolean;
						}
						export class LINE_CAP extends java.lang.Object implements java.lang.annotation.Annotation {
							public static class: java.lang.Class<com.mapbox.mapboxsdk.style.layers.Property.LINE_CAP>;
							/**
							 * Constructs a new instance of the com.mapbox.mapboxsdk.style.layers.Property$LINE_CAP interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
							 */
							public constructor(implementation: {
								equals(param0: any): boolean;
								hashCode(): number;
								toString(): string;
								annotationType(): java.lang.Class<any>;
							});
							public constructor();
							public hashCode(): number;
							public annotationType(): java.lang.Class<any>;
							public toString(): string;
							public equals(param0: any): boolean;
						}
						export class LINE_JOIN extends java.lang.Object implements java.lang.annotation.Annotation {
							public static class: java.lang.Class<com.mapbox.mapboxsdk.style.layers.Property.LINE_JOIN>;
							/**
							 * Constructs a new instance of the com.mapbox.mapboxsdk.style.layers.Property$LINE_JOIN interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
							 */
							public constructor(implementation: {
								equals(param0: any): boolean;
								hashCode(): number;
								toString(): string;
								annotationType(): java.lang.Class<any>;
							});
							public constructor();
							public hashCode(): number;
							public annotationType(): java.lang.Class<any>;
							public toString(): string;
							public equals(param0: any): boolean;
						}
						export class LINE_TRANSLATE_ANCHOR extends java.lang.Object implements java.lang.annotation.Annotation {
							public static class: java.lang.Class<com.mapbox.mapboxsdk.style.layers.Property.LINE_TRANSLATE_ANCHOR>;
							/**
							 * Constructs a new instance of the com.mapbox.mapboxsdk.style.layers.Property$LINE_TRANSLATE_ANCHOR interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
							 */
							public constructor(implementation: {
								equals(param0: any): boolean;
								hashCode(): number;
								toString(): string;
								annotationType(): java.lang.Class<any>;
							});
							public constructor();
							public hashCode(): number;
							public annotationType(): java.lang.Class<any>;
							public toString(): string;
							public equals(param0: any): boolean;
						}
						export class RASTER_RESAMPLING extends java.lang.Object implements java.lang.annotation.Annotation {
							public static class: java.lang.Class<com.mapbox.mapboxsdk.style.layers.Property.RASTER_RESAMPLING>;
							/**
							 * Constructs a new instance of the com.mapbox.mapboxsdk.style.layers.Property$RASTER_RESAMPLING interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
							 */
							public constructor(implementation: {
								equals(param0: any): boolean;
								hashCode(): number;
								toString(): string;
								annotationType(): java.lang.Class<any>;
							});
							public constructor();
							public hashCode(): number;
							public annotationType(): java.lang.Class<any>;
							public toString(): string;
							public equals(param0: any): boolean;
						}
						export class SYMBOL_PLACEMENT extends java.lang.Object implements java.lang.annotation.Annotation {
							public static class: java.lang.Class<com.mapbox.mapboxsdk.style.layers.Property.SYMBOL_PLACEMENT>;
							/**
							 * Constructs a new instance of the com.mapbox.mapboxsdk.style.layers.Property$SYMBOL_PLACEMENT interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
							 */
							public constructor(implementation: {
								equals(param0: any): boolean;
								hashCode(): number;
								toString(): string;
								annotationType(): java.lang.Class<any>;
							});
							public constructor();
							public hashCode(): number;
							public annotationType(): java.lang.Class<any>;
							public toString(): string;
							public equals(param0: any): boolean;
						}
						export class SYMBOL_Z_ORDER extends java.lang.Object implements java.lang.annotation.Annotation {
							public static class: java.lang.Class<com.mapbox.mapboxsdk.style.layers.Property.SYMBOL_Z_ORDER>;
							/**
							 * Constructs a new instance of the com.mapbox.mapboxsdk.style.layers.Property$SYMBOL_Z_ORDER interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
							 */
							public constructor(implementation: {
								equals(param0: any): boolean;
								hashCode(): number;
								toString(): string;
								annotationType(): java.lang.Class<any>;
							});
							public constructor();
							public hashCode(): number;
							public annotationType(): java.lang.Class<any>;
							public toString(): string;
							public equals(param0: any): boolean;
						}
						export class TEXT_ANCHOR extends java.lang.Object implements java.lang.annotation.Annotation {
							public static class: java.lang.Class<com.mapbox.mapboxsdk.style.layers.Property.TEXT_ANCHOR>;
							/**
							 * Constructs a new instance of the com.mapbox.mapboxsdk.style.layers.Property$TEXT_ANCHOR interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
							 */
							public constructor(implementation: {
								equals(param0: any): boolean;
								hashCode(): number;
								toString(): string;
								annotationType(): java.lang.Class<any>;
							});
							public constructor();
							public hashCode(): number;
							public annotationType(): java.lang.Class<any>;
							public toString(): string;
							public equals(param0: any): boolean;
						}
						export class TEXT_JUSTIFY extends java.lang.Object implements java.lang.annotation.Annotation {
							public static class: java.lang.Class<com.mapbox.mapboxsdk.style.layers.Property.TEXT_JUSTIFY>;
							/**
							 * Constructs a new instance of the com.mapbox.mapboxsdk.style.layers.Property$TEXT_JUSTIFY interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
							 */
							public constructor(implementation: {
								equals(param0: any): boolean;
								hashCode(): number;
								toString(): string;
								annotationType(): java.lang.Class<any>;
							});
							public constructor();
							public hashCode(): number;
							public annotationType(): java.lang.Class<any>;
							public toString(): string;
							public equals(param0: any): boolean;
						}
						export class TEXT_PITCH_ALIGNMENT extends java.lang.Object implements java.lang.annotation.Annotation {
							public static class: java.lang.Class<com.mapbox.mapboxsdk.style.layers.Property.TEXT_PITCH_ALIGNMENT>;
							/**
							 * Constructs a new instance of the com.mapbox.mapboxsdk.style.layers.Property$TEXT_PITCH_ALIGNMENT interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
							 */
							public constructor(implementation: {
								equals(param0: any): boolean;
								hashCode(): number;
								toString(): string;
								annotationType(): java.lang.Class<any>;
							});
							public constructor();
							public hashCode(): number;
							public annotationType(): java.lang.Class<any>;
							public toString(): string;
							public equals(param0: any): boolean;
						}
						export class TEXT_ROTATION_ALIGNMENT extends java.lang.Object implements java.lang.annotation.Annotation {
							public static class: java.lang.Class<com.mapbox.mapboxsdk.style.layers.Property.TEXT_ROTATION_ALIGNMENT>;
							/**
							 * Constructs a new instance of the com.mapbox.mapboxsdk.style.layers.Property$TEXT_ROTATION_ALIGNMENT interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
							 */
							public constructor(implementation: {
								equals(param0: any): boolean;
								hashCode(): number;
								toString(): string;
								annotationType(): java.lang.Class<any>;
							});
							public constructor();
							public hashCode(): number;
							public annotationType(): java.lang.Class<any>;
							public toString(): string;
							public equals(param0: any): boolean;
						}
						export class TEXT_TRANSFORM extends java.lang.Object implements java.lang.annotation.Annotation {
							public static class: java.lang.Class<com.mapbox.mapboxsdk.style.layers.Property.TEXT_TRANSFORM>;
							/**
							 * Constructs a new instance of the com.mapbox.mapboxsdk.style.layers.Property$TEXT_TRANSFORM interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
							 */
							public constructor(implementation: {
								equals(param0: any): boolean;
								hashCode(): number;
								toString(): string;
								annotationType(): java.lang.Class<any>;
							});
							public constructor();
							public hashCode(): number;
							public annotationType(): java.lang.Class<any>;
							public toString(): string;
							public equals(param0: any): boolean;
						}
						export class TEXT_TRANSLATE_ANCHOR extends java.lang.Object implements java.lang.annotation.Annotation {
							public static class: java.lang.Class<com.mapbox.mapboxsdk.style.layers.Property.TEXT_TRANSLATE_ANCHOR>;
							/**
							 * Constructs a new instance of the com.mapbox.mapboxsdk.style.layers.Property$TEXT_TRANSLATE_ANCHOR interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
							 */
							public constructor(implementation: {
								equals(param0: any): boolean;
								hashCode(): number;
								toString(): string;
								annotationType(): java.lang.Class<any>;
							});
							public constructor();
							public hashCode(): number;
							public annotationType(): java.lang.Class<any>;
							public toString(): string;
							public equals(param0: any): boolean;
						}
						export class TEXT_WRITING_MODE extends java.lang.Object implements java.lang.annotation.Annotation {
							public static class: java.lang.Class<com.mapbox.mapboxsdk.style.layers.Property.TEXT_WRITING_MODE>;
							/**
							 * Constructs a new instance of the com.mapbox.mapboxsdk.style.layers.Property$TEXT_WRITING_MODE interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
							 */
							public constructor(implementation: {
								equals(param0: any): boolean;
								hashCode(): number;
								toString(): string;
								annotationType(): java.lang.Class<any>;
							});
							public constructor();
							public hashCode(): number;
							public annotationType(): java.lang.Class<any>;
							public toString(): string;
							public equals(param0: any): boolean;
						}
						export class VISIBILITY extends java.lang.Object implements java.lang.annotation.Annotation {
							public static class: java.lang.Class<com.mapbox.mapboxsdk.style.layers.Property.VISIBILITY>;
							/**
							 * Constructs a new instance of the com.mapbox.mapboxsdk.style.layers.Property$VISIBILITY interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
							 */
							public constructor(implementation: {
								equals(param0: any): boolean;
								hashCode(): number;
								toString(): string;
								annotationType(): java.lang.Class<any>;
							});
							public constructor();
							public hashCode(): number;
							public annotationType(): java.lang.Class<any>;
							public toString(): string;
							public equals(param0: any): boolean;
						}
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export module style {
				export module layers {
					export class PropertyFactory extends java.lang.Object {
						public static class: java.lang.Class<com.mapbox.mapboxsdk.style.layers.PropertyFactory>;
						public static lineWidth(param0: java.lang.Float): com.mapbox.mapboxsdk.style.layers.PropertyValue<java.lang.Float>;
						public static circleOpacity(param0: java.lang.Float): com.mapbox.mapboxsdk.style.layers.PropertyValue<java.lang.Float>;
						public static hillshadeExaggeration(param0: com.mapbox.mapboxsdk.style.expressions.Expression): com.mapbox.mapboxsdk.style.layers.PropertyValue<com.mapbox.mapboxsdk.style.expressions.Expression>;
						public static circleOpacity(param0: com.mapbox.mapboxsdk.style.expressions.Expression): com.mapbox.mapboxsdk.style.layers.PropertyValue<com.mapbox.mapboxsdk.style.expressions.Expression>;
						public static circleStrokeColor(param0: com.mapbox.mapboxsdk.style.expressions.Expression): com.mapbox.mapboxsdk.style.layers.PropertyValue<com.mapbox.mapboxsdk.style.expressions.Expression>;
						public static circleStrokeWidth(param0: java.lang.Float): com.mapbox.mapboxsdk.style.layers.PropertyValue<java.lang.Float>;
						public static fillExtrusionColor(param0: string): com.mapbox.mapboxsdk.style.layers.PropertyValue<string>;
						public static iconKeepUpright(param0: com.mapbox.mapboxsdk.style.expressions.Expression): com.mapbox.mapboxsdk.style.layers.PropertyValue<com.mapbox.mapboxsdk.style.expressions.Expression>;
						public static iconAllowOverlap(param0: java.lang.Boolean): com.mapbox.mapboxsdk.style.layers.PropertyValue<java.lang.Boolean>;
						public static iconHaloWidth(param0: com.mapbox.mapboxsdk.style.expressions.Expression): com.mapbox.mapboxsdk.style.layers.PropertyValue<com.mapbox.mapboxsdk.style.expressions.Expression>;
						public static rasterFadeDuration(param0: com.mapbox.mapboxsdk.style.expressions.Expression): com.mapbox.mapboxsdk.style.layers.PropertyValue<com.mapbox.mapboxsdk.style.expressions.Expression>;
						public static lineGradient(param0: string): com.mapbox.mapboxsdk.style.layers.PropertyValue<string>;
						public static iconSize(param0: java.lang.Float): com.mapbox.mapboxsdk.style.layers.PropertyValue<java.lang.Float>;
						public static textPitchAlignment(param0: string): com.mapbox.mapboxsdk.style.layers.PropertyValue<string>;
						public static rasterSaturation(param0: java.lang.Float): com.mapbox.mapboxsdk.style.layers.PropertyValue<java.lang.Float>;
						public static lineGapWidth(param0: com.mapbox.mapboxsdk.style.expressions.Expression): com.mapbox.mapboxsdk.style.layers.PropertyValue<com.mapbox.mapboxsdk.style.expressions.Expression>;
						public static textColor(param0: string): com.mapbox.mapboxsdk.style.layers.PropertyValue<string>;
						public static iconHaloBlur(param0: java.lang.Float): com.mapbox.mapboxsdk.style.layers.PropertyValue<java.lang.Float>;
						public static hillshadeIlluminationAnchor(param0: com.mapbox.mapboxsdk.style.expressions.Expression): com.mapbox.mapboxsdk.style.layers.PropertyValue<com.mapbox.mapboxsdk.style.expressions.Expression>;
						public static hillshadeShadowColor(param0: com.mapbox.mapboxsdk.style.expressions.Expression): com.mapbox.mapboxsdk.style.layers.PropertyValue<com.mapbox.mapboxsdk.style.expressions.Expression>;
						public static lineJoin(param0: com.mapbox.mapboxsdk.style.expressions.Expression): com.mapbox.mapboxsdk.style.layers.PropertyValue<com.mapbox.mapboxsdk.style.expressions.Expression>;
						public static textTranslate(param0: com.mapbox.mapboxsdk.style.expressions.Expression): com.mapbox.mapboxsdk.style.layers.PropertyValue<com.mapbox.mapboxsdk.style.expressions.Expression>;
						public static iconTextFitPadding(param0: com.mapbox.mapboxsdk.style.expressions.Expression): com.mapbox.mapboxsdk.style.layers.PropertyValue<com.mapbox.mapboxsdk.style.expressions.Expression>;
						public static textHaloBlur(param0: com.mapbox.mapboxsdk.style.expressions.Expression): com.mapbox.mapboxsdk.style.layers.PropertyValue<com.mapbox.mapboxsdk.style.expressions.Expression>;
						public static textMaxWidth(param0: com.mapbox.mapboxsdk.style.expressions.Expression): com.mapbox.mapboxsdk.style.layers.PropertyValue<com.mapbox.mapboxsdk.style.expressions.Expression>;
						public static circlePitchAlignment(param0: com.mapbox.mapboxsdk.style.expressions.Expression): com.mapbox.mapboxsdk.style.layers.PropertyValue<com.mapbox.mapboxsdk.style.expressions.Expression>;
						public static iconRotationAlignment(param0: string): com.mapbox.mapboxsdk.style.layers.PropertyValue<string>;
						public static textLineHeight(param0: com.mapbox.mapboxsdk.style.expressions.Expression): com.mapbox.mapboxsdk.style.layers.PropertyValue<com.mapbox.mapboxsdk.style.expressions.Expression>;
						public static rasterBrightnessMax(param0: com.mapbox.mapboxsdk.style.expressions.Expression): com.mapbox.mapboxsdk.style.layers.PropertyValue<com.mapbox.mapboxsdk.style.expressions.Expression>;
						public static symbolSpacing(param0: com.mapbox.mapboxsdk.style.expressions.Expression): com.mapbox.mapboxsdk.style.layers.PropertyValue<com.mapbox.mapboxsdk.style.expressions.Expression>;
						public static fillOpacity(param0: java.lang.Float): com.mapbox.mapboxsdk.style.layers.PropertyValue<java.lang.Float>;
						public static fillExtrusionBase(param0: java.lang.Float): com.mapbox.mapboxsdk.style.layers.PropertyValue<java.lang.Float>;
						public static textSize(param0: com.mapbox.mapboxsdk.style.expressions.Expression): com.mapbox.mapboxsdk.style.layers.PropertyValue<com.mapbox.mapboxsdk.style.expressions.Expression>;
						public static circleTranslateAnchor(param0: string): com.mapbox.mapboxsdk.style.layers.PropertyValue<string>;
						public static iconTextFit(param0: com.mapbox.mapboxsdk.style.expressions.Expression): com.mapbox.mapboxsdk.style.layers.PropertyValue<com.mapbox.mapboxsdk.style.expressions.Expression>;
						public static heatmapColor(param0: number): com.mapbox.mapboxsdk.style.layers.PropertyValue<string>;
						public static textPadding(param0: java.lang.Float): com.mapbox.mapboxsdk.style.layers.PropertyValue<java.lang.Float>;
						public static backgroundColor(param0: string): com.mapbox.mapboxsdk.style.layers.PropertyValue<string>;
						public static lineDasharray(param0: com.mapbox.mapboxsdk.style.expressions.Expression): com.mapbox.mapboxsdk.style.layers.PropertyValue<com.mapbox.mapboxsdk.style.expressions.Expression>;
						public static fillExtrusionHeight(param0: java.lang.Float): com.mapbox.mapboxsdk.style.layers.PropertyValue<java.lang.Float>;
						public static hillshadeHighlightColor(param0: string): com.mapbox.mapboxsdk.style.layers.PropertyValue<string>;
						public static visibility(param0: string): com.mapbox.mapboxsdk.style.layers.PropertyValue<string>;
						public static circlePitchScale(param0: com.mapbox.mapboxsdk.style.expressions.Expression): com.mapbox.mapboxsdk.style.layers.PropertyValue<com.mapbox.mapboxsdk.style.expressions.Expression>;
						public static textMaxAngle(param0: com.mapbox.mapboxsdk.style.expressions.Expression): com.mapbox.mapboxsdk.style.layers.PropertyValue<com.mapbox.mapboxsdk.style.expressions.Expression>;
						public static lineColor(param0: com.mapbox.mapboxsdk.style.expressions.Expression): com.mapbox.mapboxsdk.style.layers.PropertyValue<com.mapbox.mapboxsdk.style.expressions.Expression>;
						public static fillColor(param0: com.mapbox.mapboxsdk.style.expressions.Expression): com.mapbox.mapboxsdk.style.layers.PropertyValue<com.mapbox.mapboxsdk.style.expressions.Expression>;
						public static textPitchAlignment(param0: com.mapbox.mapboxsdk.style.expressions.Expression): com.mapbox.mapboxsdk.style.layers.PropertyValue<com.mapbox.mapboxsdk.style.expressions.Expression>;
						public static hillshadeHighlightColor(param0: number): com.mapbox.mapboxsdk.style.layers.PropertyValue<string>;
						public static rasterResampling(param0: string): com.mapbox.mapboxsdk.style.layers.PropertyValue<string>;
						public static textLetterSpacing(param0: com.mapbox.mapboxsdk.style.expressions.Expression): com.mapbox.mapboxsdk.style.layers.PropertyValue<com.mapbox.mapboxsdk.style.expressions.Expression>;
						public static circleStrokeOpacity(param0: com.mapbox.mapboxsdk.style.expressions.Expression): com.mapbox.mapboxsdk.style.layers.PropertyValue<com.mapbox.mapboxsdk.style.expressions.Expression>;
						public static iconOpacity(param0: com.mapbox.mapboxsdk.style.expressions.Expression): com.mapbox.mapboxsdk.style.layers.PropertyValue<com.mapbox.mapboxsdk.style.expressions.Expression>;
						public static fillExtrusionPattern(param0: com.mapbox.mapboxsdk.style.expressions.Expression): com.mapbox.mapboxsdk.style.layers.PropertyValue<com.mapbox.mapboxsdk.style.expressions.Expression>;
						public static fillColor(param0: number): com.mapbox.mapboxsdk.style.layers.PropertyValue<string>;
						public static iconSize(param0: com.mapbox.mapboxsdk.style.expressions.Expression): com.mapbox.mapboxsdk.style.layers.PropertyValue<com.mapbox.mapboxsdk.style.expressions.Expression>;
						public static iconTranslate(param0: native.Array<java.lang.Float>): com.mapbox.mapboxsdk.style.layers.PropertyValue<native.Array<java.lang.Float>>;
						public static symbolPlacement(param0: string): com.mapbox.mapboxsdk.style.layers.PropertyValue<string>;
						public static backgroundOpacity(param0: com.mapbox.mapboxsdk.style.expressions.Expression): com.mapbox.mapboxsdk.style.layers.PropertyValue<com.mapbox.mapboxsdk.style.expressions.Expression>;
						public static iconHaloBlur(param0: com.mapbox.mapboxsdk.style.expressions.Expression): com.mapbox.mapboxsdk.style.layers.PropertyValue<com.mapbox.mapboxsdk.style.expressions.Expression>;
						public static lineGradient(param0: number): com.mapbox.mapboxsdk.style.layers.PropertyValue<string>;
						public static fillColor(param0: string): com.mapbox.mapboxsdk.style.layers.PropertyValue<string>;
						public static iconRotate(param0: com.mapbox.mapboxsdk.style.expressions.Expression): com.mapbox.mapboxsdk.style.layers.PropertyValue<com.mapbox.mapboxsdk.style.expressions.Expression>;
						public static iconPitchAlignment(param0: string): com.mapbox.mapboxsdk.style.layers.PropertyValue<string>;
						public static textSize(param0: java.lang.Float): com.mapbox.mapboxsdk.style.layers.PropertyValue<java.lang.Float>;
						public static textLetterSpacing(param0: java.lang.Float): com.mapbox.mapboxsdk.style.layers.PropertyValue<java.lang.Float>;
						public static symbolAvoidEdges(param0: com.mapbox.mapboxsdk.style.expressions.Expression): com.mapbox.mapboxsdk.style.layers.PropertyValue<com.mapbox.mapboxsdk.style.expressions.Expression>;
						public static backgroundColor(param0: com.mapbox.mapboxsdk.style.expressions.Expression): com.mapbox.mapboxsdk.style.layers.PropertyValue<com.mapbox.mapboxsdk.style.expressions.Expression>;
						public static fillOutlineColor(param0: com.mapbox.mapboxsdk.style.expressions.Expression): com.mapbox.mapboxsdk.style.layers.PropertyValue<com.mapbox.mapboxsdk.style.expressions.Expression>;
						public static iconColor(param0: number): com.mapbox.mapboxsdk.style.layers.PropertyValue<string>;
						public static symbolSortKey(param0: java.lang.Float): com.mapbox.mapboxsdk.style.layers.PropertyValue<java.lang.Float>;
						public static circleColor(param0: com.mapbox.mapboxsdk.style.expressions.Expression): com.mapbox.mapboxsdk.style.layers.PropertyValue<com.mapbox.mapboxsdk.style.expressions.Expression>;
						public static hillshadeAccentColor(param0: string): com.mapbox.mapboxsdk.style.layers.PropertyValue<string>;
						public static fillOutlineColor(param0: number): com.mapbox.mapboxsdk.style.layers.PropertyValue<string>;
						public static circleRadius(param0: com.mapbox.mapboxsdk.style.expressions.Expression): com.mapbox.mapboxsdk.style.layers.PropertyValue<com.mapbox.mapboxsdk.style.expressions.Expression>;
						public static hillshadeIlluminationDirection(param0: com.mapbox.mapboxsdk.style.expressions.Expression): com.mapbox.mapboxsdk.style.layers.PropertyValue<com.mapbox.mapboxsdk.style.expressions.Expression>;
						public static hillshadeAccentColor(param0: com.mapbox.mapboxsdk.style.expressions.Expression): com.mapbox.mapboxsdk.style.layers.PropertyValue<com.mapbox.mapboxsdk.style.expressions.Expression>;
						public static lineColor(param0: string): com.mapbox.mapboxsdk.style.layers.PropertyValue<string>;
						public static iconAnchor(param0: string): com.mapbox.mapboxsdk.style.layers.PropertyValue<string>;
						public static textOffset(param0: com.mapbox.mapboxsdk.style.expressions.Expression): com.mapbox.mapboxsdk.style.layers.PropertyValue<com.mapbox.mapboxsdk.style.expressions.Expression>;
						public static textTransform(param0: string): com.mapbox.mapboxsdk.style.layers.PropertyValue<string>;
						public static circlePitchAlignment(param0: string): com.mapbox.mapboxsdk.style.layers.PropertyValue<string>;
						public static heatmapColor(param0: string): com.mapbox.mapboxsdk.style.layers.PropertyValue<string>;
						public static lineTranslateAnchor(param0: com.mapbox.mapboxsdk.style.expressions.Expression): com.mapbox.mapboxsdk.style.layers.PropertyValue<com.mapbox.mapboxsdk.style.expressions.Expression>;
						public static lineCap(param0: com.mapbox.mapboxsdk.style.expressions.Expression): com.mapbox.mapboxsdk.style.layers.PropertyValue<com.mapbox.mapboxsdk.style.expressions.Expression>;
						public static fillTranslateAnchor(param0: string): com.mapbox.mapboxsdk.style.layers.PropertyValue<string>;
						public static textRotationAlignment(param0: com.mapbox.mapboxsdk.style.expressions.Expression): com.mapbox.mapboxsdk.style.layers.PropertyValue<com.mapbox.mapboxsdk.style.expressions.Expression>;
						public static symbolZOrder(param0: com.mapbox.mapboxsdk.style.expressions.Expression): com.mapbox.mapboxsdk.style.layers.PropertyValue<com.mapbox.mapboxsdk.style.expressions.Expression>;
						public static rasterHueRotate(param0: com.mapbox.mapboxsdk.style.expressions.Expression): com.mapbox.mapboxsdk.style.layers.PropertyValue<com.mapbox.mapboxsdk.style.expressions.Expression>;
						public static textMaxWidth(param0: java.lang.Float): com.mapbox.mapboxsdk.style.layers.PropertyValue<java.lang.Float>;
						public static textTranslateAnchor(param0: string): com.mapbox.mapboxsdk.style.layers.PropertyValue<string>;
						public static heatmapRadius(param0: com.mapbox.mapboxsdk.style.expressions.Expression): com.mapbox.mapboxsdk.style.layers.PropertyValue<com.mapbox.mapboxsdk.style.expressions.Expression>;
						public static heatmapWeight(param0: java.lang.Float): com.mapbox.mapboxsdk.style.layers.PropertyValue<java.lang.Float>;
						public static iconKeepUpright(param0: java.lang.Boolean): com.mapbox.mapboxsdk.style.layers.PropertyValue<java.lang.Boolean>;
						public static iconPadding(param0: com.mapbox.mapboxsdk.style.expressions.Expression): com.mapbox.mapboxsdk.style.layers.PropertyValue<com.mapbox.mapboxsdk.style.expressions.Expression>;
						public static lineGapWidth(param0: java.lang.Float): com.mapbox.mapboxsdk.style.layers.PropertyValue<java.lang.Float>;
						public static circleStrokeOpacity(param0: java.lang.Float): com.mapbox.mapboxsdk.style.layers.PropertyValue<java.lang.Float>;
						public static linePattern(param0: string): com.mapbox.mapboxsdk.style.layers.PropertyValue<string>;
						public static iconAllowOverlap(param0: com.mapbox.mapboxsdk.style.expressions.Expression): com.mapbox.mapboxsdk.style.layers.PropertyValue<com.mapbox.mapboxsdk.style.expressions.Expression>;
						public static backgroundOpacity(param0: java.lang.Float): com.mapbox.mapboxsdk.style.layers.PropertyValue<java.lang.Float>;
						public static textAllowOverlap(param0: com.mapbox.mapboxsdk.style.expressions.Expression): com.mapbox.mapboxsdk.style.layers.PropertyValue<com.mapbox.mapboxsdk.style.expressions.Expression>;
						public static fillAntialias(param0: com.mapbox.mapboxsdk.style.expressions.Expression): com.mapbox.mapboxsdk.style.layers.PropertyValue<com.mapbox.mapboxsdk.style.expressions.Expression>;
						public static fillTranslateAnchor(param0: com.mapbox.mapboxsdk.style.expressions.Expression): com.mapbox.mapboxsdk.style.layers.PropertyValue<com.mapbox.mapboxsdk.style.expressions.Expression>;
						public static fillExtrusionTranslateAnchor(param0: string): com.mapbox.mapboxsdk.style.layers.PropertyValue<string>;
						public static iconPadding(param0: java.lang.Float): com.mapbox.mapboxsdk.style.layers.PropertyValue<java.lang.Float>;
						public static iconTranslateAnchor(param0: string): com.mapbox.mapboxsdk.style.layers.PropertyValue<string>;
						public static textHaloColor(param0: string): com.mapbox.mapboxsdk.style.layers.PropertyValue<string>;
						public static fillExtrusionPattern(param0: string): com.mapbox.mapboxsdk.style.layers.PropertyValue<string>;
						public static hillshadeAccentColor(param0: number): com.mapbox.mapboxsdk.style.layers.PropertyValue<string>;
						public static circleTranslate(param0: com.mapbox.mapboxsdk.style.expressions.Expression): com.mapbox.mapboxsdk.style.layers.PropertyValue<com.mapbox.mapboxsdk.style.expressions.Expression>;
						public static iconImage(param0: string): com.mapbox.mapboxsdk.style.layers.PropertyValue<string>;
						public static rasterBrightnessMax(param0: java.lang.Float): com.mapbox.mapboxsdk.style.layers.PropertyValue<java.lang.Float>;
						public static textMaxAngle(param0: java.lang.Float): com.mapbox.mapboxsdk.style.layers.PropertyValue<java.lang.Float>;
						public static symbolSortKey(param0: com.mapbox.mapboxsdk.style.expressions.Expression): com.mapbox.mapboxsdk.style.layers.PropertyValue<com.mapbox.mapboxsdk.style.expressions.Expression>;
						public static iconTextFit(param0: string): com.mapbox.mapboxsdk.style.layers.PropertyValue<string>;
						public static textKeepUpright(param0: com.mapbox.mapboxsdk.style.expressions.Expression): com.mapbox.mapboxsdk.style.layers.PropertyValue<com.mapbox.mapboxsdk.style.expressions.Expression>;
						public static fillExtrusionTranslateAnchor(param0: com.mapbox.mapboxsdk.style.expressions.Expression): com.mapbox.mapboxsdk.style.layers.PropertyValue<com.mapbox.mapboxsdk.style.expressions.Expression>;
						public static lineRoundLimit(param0: com.mapbox.mapboxsdk.style.expressions.Expression): com.mapbox.mapboxsdk.style.layers.PropertyValue<com.mapbox.mapboxsdk.style.expressions.Expression>;
						public static textRadialOffset(param0: com.mapbox.mapboxsdk.style.expressions.Expression): com.mapbox.mapboxsdk.style.layers.PropertyValue<com.mapbox.mapboxsdk.style.expressions.Expression>;
						public static fillAntialias(param0: java.lang.Boolean): com.mapbox.mapboxsdk.style.layers.PropertyValue<java.lang.Boolean>;
						public static lineRoundLimit(param0: java.lang.Float): com.mapbox.mapboxsdk.style.layers.PropertyValue<java.lang.Float>;
						public static textVariableAnchor(param0: com.mapbox.mapboxsdk.style.expressions.Expression): com.mapbox.mapboxsdk.style.layers.PropertyValue<com.mapbox.mapboxsdk.style.expressions.Expression>;
						public static lineColor(param0: number): com.mapbox.mapboxsdk.style.layers.PropertyValue<string>;
						public static circleBlur(param0: com.mapbox.mapboxsdk.style.expressions.Expression): com.mapbox.mapboxsdk.style.layers.PropertyValue<com.mapbox.mapboxsdk.style.expressions.Expression>;
						public static textAllowOverlap(param0: java.lang.Boolean): com.mapbox.mapboxsdk.style.layers.PropertyValue<java.lang.Boolean>;
						public static textRotate(param0: java.lang.Float): com.mapbox.mapboxsdk.style.layers.PropertyValue<java.lang.Float>;
						public static textKeepUpright(param0: java.lang.Boolean): com.mapbox.mapboxsdk.style.layers.PropertyValue<java.lang.Boolean>;
						public static textFont(param0: com.mapbox.mapboxsdk.style.expressions.Expression): com.mapbox.mapboxsdk.style.layers.PropertyValue<com.mapbox.mapboxsdk.style.expressions.Expression>;
						public static fillOutlineColor(param0: string): com.mapbox.mapboxsdk.style.layers.PropertyValue<string>;
						public static textTranslate(param0: native.Array<java.lang.Float>): com.mapbox.mapboxsdk.style.layers.PropertyValue<native.Array<java.lang.Float>>;
						public static rasterOpacity(param0: java.lang.Float): com.mapbox.mapboxsdk.style.layers.PropertyValue<java.lang.Float>;
						public static hillshadeIlluminationDirection(param0: java.lang.Float): com.mapbox.mapboxsdk.style.layers.PropertyValue<java.lang.Float>;
						public static textWritingMode(param0: com.mapbox.mapboxsdk.style.expressions.Expression): com.mapbox.mapboxsdk.style.layers.PropertyValue<com.mapbox.mapboxsdk.style.expressions.Expression>;
						public static circleTranslate(param0: native.Array<java.lang.Float>): com.mapbox.mapboxsdk.style.layers.PropertyValue<native.Array<java.lang.Float>>;
						public static hillshadeIlluminationAnchor(param0: string): com.mapbox.mapboxsdk.style.layers.PropertyValue<string>;
						public static fillTranslate(param0: com.mapbox.mapboxsdk.style.expressions.Expression): com.mapbox.mapboxsdk.style.layers.PropertyValue<com.mapbox.mapboxsdk.style.expressions.Expression>;
						public static fillExtrusionTranslate(param0: com.mapbox.mapboxsdk.style.expressions.Expression): com.mapbox.mapboxsdk.style.layers.PropertyValue<com.mapbox.mapboxsdk.style.expressions.Expression>;
						public static textFont(param0: native.Array<string>): com.mapbox.mapboxsdk.style.layers.PropertyValue<native.Array<string>>;
						public static textTranslateAnchor(param0: com.mapbox.mapboxsdk.style.expressions.Expression): com.mapbox.mapboxsdk.style.layers.PropertyValue<com.mapbox.mapboxsdk.style.expressions.Expression>;
						public static lineCap(param0: string): com.mapbox.mapboxsdk.style.layers.PropertyValue<string>;
						public static textVariableAnchor(param0: native.Array<string>): com.mapbox.mapboxsdk.style.layers.PropertyValue<native.Array<string>>;
						public static fillExtrusionBase(param0: com.mapbox.mapboxsdk.style.expressions.Expression): com.mapbox.mapboxsdk.style.layers.PropertyValue<com.mapbox.mapboxsdk.style.expressions.Expression>;
						public static hillshadeExaggeration(param0: java.lang.Float): com.mapbox.mapboxsdk.style.layers.PropertyValue<java.lang.Float>;
						public static textField(param0: com.mapbox.mapboxsdk.style.expressions.Expression): com.mapbox.mapboxsdk.style.layers.PropertyValue<com.mapbox.mapboxsdk.style.expressions.Expression>;
						public static iconIgnorePlacement(param0: java.lang.Boolean): com.mapbox.mapboxsdk.style.layers.PropertyValue<java.lang.Boolean>;
						public static iconOptional(param0: java.lang.Boolean): com.mapbox.mapboxsdk.style.layers.PropertyValue<java.lang.Boolean>;
						public static textColor(param0: com.mapbox.mapboxsdk.style.expressions.Expression): com.mapbox.mapboxsdk.style.layers.PropertyValue<com.mapbox.mapboxsdk.style.expressions.Expression>;
						public constructor();
						public static heatmapOpacity(param0: java.lang.Float): com.mapbox.mapboxsdk.style.layers.PropertyValue<java.lang.Float>;
						public static rasterHueRotate(param0: java.lang.Float): com.mapbox.mapboxsdk.style.layers.PropertyValue<java.lang.Float>;
						public static textField(param0: string): com.mapbox.mapboxsdk.style.layers.PropertyValue<string>;
						public static lineOffset(param0: com.mapbox.mapboxsdk.style.expressions.Expression): com.mapbox.mapboxsdk.style.layers.PropertyValue<com.mapbox.mapboxsdk.style.expressions.Expression>;
						public static textOpacity(param0: com.mapbox.mapboxsdk.style.expressions.Expression): com.mapbox.mapboxsdk.style.layers.PropertyValue<com.mapbox.mapboxsdk.style.expressions.Expression>;
						public static iconHaloColor(param0: string): com.mapbox.mapboxsdk.style.layers.PropertyValue<string>;
						public static lineOpacity(param0: java.lang.Float): com.mapbox.mapboxsdk.style.layers.PropertyValue<java.lang.Float>;
						public static iconTranslateAnchor(param0: com.mapbox.mapboxsdk.style.expressions.Expression): com.mapbox.mapboxsdk.style.layers.PropertyValue<com.mapbox.mapboxsdk.style.expressions.Expression>;
						public static iconTextFitPadding(param0: native.Array<java.lang.Float>): com.mapbox.mapboxsdk.style.layers.PropertyValue<native.Array<java.lang.Float>>;
						public static textHaloColor(param0: number): com.mapbox.mapboxsdk.style.layers.PropertyValue<string>;
						public static iconOpacity(param0: java.lang.Float): com.mapbox.mapboxsdk.style.layers.PropertyValue<java.lang.Float>;
						public static backgroundPattern(param0: com.mapbox.mapboxsdk.style.expressions.Expression): com.mapbox.mapboxsdk.style.layers.PropertyValue<com.mapbox.mapboxsdk.style.expressions.Expression>;
						public static lineWidth(param0: com.mapbox.mapboxsdk.style.expressions.Expression): com.mapbox.mapboxsdk.style.layers.PropertyValue<com.mapbox.mapboxsdk.style.expressions.Expression>;
						public static rasterFadeDuration(param0: java.lang.Float): com.mapbox.mapboxsdk.style.layers.PropertyValue<java.lang.Float>;
						public static heatmapIntensity(param0: com.mapbox.mapboxsdk.style.expressions.Expression): com.mapbox.mapboxsdk.style.layers.PropertyValue<com.mapbox.mapboxsdk.style.expressions.Expression>;
						public static iconRotationAlignment(param0: com.mapbox.mapboxsdk.style.expressions.Expression): com.mapbox.mapboxsdk.style.layers.PropertyValue<com.mapbox.mapboxsdk.style.expressions.Expression>;
						public static fillTranslate(param0: native.Array<java.lang.Float>): com.mapbox.mapboxsdk.style.layers.PropertyValue<native.Array<java.lang.Float>>;
						public static hillshadeShadowColor(param0: number): com.mapbox.mapboxsdk.style.layers.PropertyValue<string>;
						public static lineMiterLimit(param0: com.mapbox.mapboxsdk.style.expressions.Expression): com.mapbox.mapboxsdk.style.layers.PropertyValue<com.mapbox.mapboxsdk.style.expressions.Expression>;
						public static lineOffset(param0: java.lang.Float): com.mapbox.mapboxsdk.style.layers.PropertyValue<java.lang.Float>;
						public static fillOpacity(param0: com.mapbox.mapboxsdk.style.expressions.Expression): com.mapbox.mapboxsdk.style.layers.PropertyValue<com.mapbox.mapboxsdk.style.expressions.Expression>;
						public static textIgnorePlacement(param0: com.mapbox.mapboxsdk.style.expressions.Expression): com.mapbox.mapboxsdk.style.layers.PropertyValue<com.mapbox.mapboxsdk.style.expressions.Expression>;
						public static symbolZOrder(param0: string): com.mapbox.mapboxsdk.style.layers.PropertyValue<string>;
						public static symbolPlacement(param0: com.mapbox.mapboxsdk.style.expressions.Expression): com.mapbox.mapboxsdk.style.layers.PropertyValue<com.mapbox.mapboxsdk.style.expressions.Expression>;
						public static textHaloWidth(param0: com.mapbox.mapboxsdk.style.expressions.Expression): com.mapbox.mapboxsdk.style.layers.PropertyValue<com.mapbox.mapboxsdk.style.expressions.Expression>;
						public static textAnchor(param0: com.mapbox.mapboxsdk.style.expressions.Expression): com.mapbox.mapboxsdk.style.layers.PropertyValue<com.mapbox.mapboxsdk.style.expressions.Expression>;
						public static rasterContrast(param0: java.lang.Float): com.mapbox.mapboxsdk.style.layers.PropertyValue<java.lang.Float>;
						public static textHaloBlur(param0: java.lang.Float): com.mapbox.mapboxsdk.style.layers.PropertyValue<java.lang.Float>;
						public static textPadding(param0: com.mapbox.mapboxsdk.style.expressions.Expression): com.mapbox.mapboxsdk.style.layers.PropertyValue<com.mapbox.mapboxsdk.style.expressions.Expression>;
						public static hillshadeShadowColor(param0: string): com.mapbox.mapboxsdk.style.layers.PropertyValue<string>;
						public static circleStrokeWidth(param0: com.mapbox.mapboxsdk.style.expressions.Expression): com.mapbox.mapboxsdk.style.layers.PropertyValue<com.mapbox.mapboxsdk.style.expressions.Expression>;
						public static textOpacity(param0: java.lang.Float): com.mapbox.mapboxsdk.style.layers.PropertyValue<java.lang.Float>;
						public static circleStrokeColor(param0: number): com.mapbox.mapboxsdk.style.layers.PropertyValue<string>;
						public static iconColor(param0: string): com.mapbox.mapboxsdk.style.layers.PropertyValue<string>;
						public static circleColor(param0: string): com.mapbox.mapboxsdk.style.layers.PropertyValue<string>;
						public static circlePitchScale(param0: string): com.mapbox.mapboxsdk.style.layers.PropertyValue<string>;
						public static fillExtrusionTranslate(param0: native.Array<java.lang.Float>): com.mapbox.mapboxsdk.style.layers.PropertyValue<native.Array<java.lang.Float>>;
						public static lineDasharray(param0: native.Array<java.lang.Float>): com.mapbox.mapboxsdk.style.layers.PropertyValue<native.Array<java.lang.Float>>;
						public static lineTranslate(param0: com.mapbox.mapboxsdk.style.expressions.Expression): com.mapbox.mapboxsdk.style.layers.PropertyValue<com.mapbox.mapboxsdk.style.expressions.Expression>;
						public static lineBlur(param0: com.mapbox.mapboxsdk.style.expressions.Expression): com.mapbox.mapboxsdk.style.layers.PropertyValue<com.mapbox.mapboxsdk.style.expressions.Expression>;
						public static fillExtrusionColor(param0: com.mapbox.mapboxsdk.style.expressions.Expression): com.mapbox.mapboxsdk.style.layers.PropertyValue<com.mapbox.mapboxsdk.style.expressions.Expression>;
						public static rasterContrast(param0: com.mapbox.mapboxsdk.style.expressions.Expression): com.mapbox.mapboxsdk.style.layers.PropertyValue<com.mapbox.mapboxsdk.style.expressions.Expression>;
						public static iconIgnorePlacement(param0: com.mapbox.mapboxsdk.style.expressions.Expression): com.mapbox.mapboxsdk.style.layers.PropertyValue<com.mapbox.mapboxsdk.style.expressions.Expression>;
						public static circleStrokeColor(param0: string): com.mapbox.mapboxsdk.style.layers.PropertyValue<string>;
						public static iconHaloWidth(param0: java.lang.Float): com.mapbox.mapboxsdk.style.layers.PropertyValue<java.lang.Float>;
						public static fillExtrusionVerticalGradient(param0: java.lang.Boolean): com.mapbox.mapboxsdk.style.layers.PropertyValue<java.lang.Boolean>;
						public static rasterSaturation(param0: com.mapbox.mapboxsdk.style.expressions.Expression): com.mapbox.mapboxsdk.style.layers.PropertyValue<com.mapbox.mapboxsdk.style.expressions.Expression>;
						public static iconImage(param0: com.mapbox.mapboxsdk.style.expressions.Expression): com.mapbox.mapboxsdk.style.layers.PropertyValue<com.mapbox.mapboxsdk.style.expressions.Expression>;
						public static heatmapRadius(param0: java.lang.Float): com.mapbox.mapboxsdk.style.layers.PropertyValue<java.lang.Float>;
						public static heatmapIntensity(param0: java.lang.Float): com.mapbox.mapboxsdk.style.layers.PropertyValue<java.lang.Float>;
						public static lineGradient(param0: com.mapbox.mapboxsdk.style.expressions.Expression): com.mapbox.mapboxsdk.style.layers.PropertyValue<com.mapbox.mapboxsdk.style.expressions.Expression>;
						public static iconTranslate(param0: com.mapbox.mapboxsdk.style.expressions.Expression): com.mapbox.mapboxsdk.style.layers.PropertyValue<com.mapbox.mapboxsdk.style.expressions.Expression>;
						public static circleRadius(param0: java.lang.Float): com.mapbox.mapboxsdk.style.layers.PropertyValue<java.lang.Float>;
						public static heatmapWeight(param0: com.mapbox.mapboxsdk.style.expressions.Expression): com.mapbox.mapboxsdk.style.layers.PropertyValue<com.mapbox.mapboxsdk.style.expressions.Expression>;
						public static iconAnchor(param0: com.mapbox.mapboxsdk.style.expressions.Expression): com.mapbox.mapboxsdk.style.layers.PropertyValue<com.mapbox.mapboxsdk.style.expressions.Expression>;
						public static circleColor(param0: number): com.mapbox.mapboxsdk.style.layers.PropertyValue<string>;
						public static textLineHeight(param0: java.lang.Float): com.mapbox.mapboxsdk.style.layers.PropertyValue<java.lang.Float>;
						public static textOffset(param0: native.Array<java.lang.Float>): com.mapbox.mapboxsdk.style.layers.PropertyValue<native.Array<java.lang.Float>>;
						public static textIgnorePlacement(param0: java.lang.Boolean): com.mapbox.mapboxsdk.style.layers.PropertyValue<java.lang.Boolean>;
						public static iconHaloColor(param0: number): com.mapbox.mapboxsdk.style.layers.PropertyValue<string>;
						public static heatmapColor(param0: com.mapbox.mapboxsdk.style.expressions.Expression): com.mapbox.mapboxsdk.style.layers.PropertyValue<com.mapbox.mapboxsdk.style.expressions.Expression>;
						public static textOptional(param0: com.mapbox.mapboxsdk.style.expressions.Expression): com.mapbox.mapboxsdk.style.layers.PropertyValue<com.mapbox.mapboxsdk.style.expressions.Expression>;
						public static textJustify(param0: string): com.mapbox.mapboxsdk.style.layers.PropertyValue<string>;
						public static textColor(param0: number): com.mapbox.mapboxsdk.style.layers.PropertyValue<string>;
						public static rasterBrightnessMin(param0: com.mapbox.mapboxsdk.style.expressions.Expression): com.mapbox.mapboxsdk.style.layers.PropertyValue<com.mapbox.mapboxsdk.style.expressions.Expression>;
						public static hillshadeHighlightColor(param0: com.mapbox.mapboxsdk.style.expressions.Expression): com.mapbox.mapboxsdk.style.layers.PropertyValue<com.mapbox.mapboxsdk.style.expressions.Expression>;
						public static lineMiterLimit(param0: java.lang.Float): com.mapbox.mapboxsdk.style.layers.PropertyValue<java.lang.Float>;
						public static lineTranslateAnchor(param0: string): com.mapbox.mapboxsdk.style.layers.PropertyValue<string>;
						public static textHaloColor(param0: com.mapbox.mapboxsdk.style.expressions.Expression): com.mapbox.mapboxsdk.style.layers.PropertyValue<com.mapbox.mapboxsdk.style.expressions.Expression>;
						public static lineBlur(param0: java.lang.Float): com.mapbox.mapboxsdk.style.layers.PropertyValue<java.lang.Float>;
						public static backgroundColor(param0: number): com.mapbox.mapboxsdk.style.layers.PropertyValue<string>;
						public static iconOffset(param0: com.mapbox.mapboxsdk.style.expressions.Expression): com.mapbox.mapboxsdk.style.layers.PropertyValue<com.mapbox.mapboxsdk.style.expressions.Expression>;
						public static textWritingMode(param0: native.Array<string>): com.mapbox.mapboxsdk.style.layers.PropertyValue<native.Array<string>>;
						public static fillPattern(param0: com.mapbox.mapboxsdk.style.expressions.Expression): com.mapbox.mapboxsdk.style.layers.PropertyValue<com.mapbox.mapboxsdk.style.expressions.Expression>;
						public static lineOpacity(param0: com.mapbox.mapboxsdk.style.expressions.Expression): com.mapbox.mapboxsdk.style.layers.PropertyValue<com.mapbox.mapboxsdk.style.expressions.Expression>;
						public static textField(param0: com.mapbox.mapboxsdk.style.types.Formatted): com.mapbox.mapboxsdk.style.layers.PropertyValue<com.mapbox.mapboxsdk.style.types.Formatted>;
						public static lineTranslate(param0: native.Array<java.lang.Float>): com.mapbox.mapboxsdk.style.layers.PropertyValue<native.Array<java.lang.Float>>;
						public static fillExtrusionOpacity(param0: com.mapbox.mapboxsdk.style.expressions.Expression): com.mapbox.mapboxsdk.style.layers.PropertyValue<com.mapbox.mapboxsdk.style.expressions.Expression>;
						public static lineJoin(param0: string): com.mapbox.mapboxsdk.style.layers.PropertyValue<string>;
						public static fillPattern(param0: string): com.mapbox.mapboxsdk.style.layers.PropertyValue<string>;
						public static linePattern(param0: com.mapbox.mapboxsdk.style.expressions.Expression): com.mapbox.mapboxsdk.style.layers.PropertyValue<com.mapbox.mapboxsdk.style.expressions.Expression>;
						public static fillExtrusionOpacity(param0: java.lang.Float): com.mapbox.mapboxsdk.style.layers.PropertyValue<java.lang.Float>;
						public static iconRotate(param0: java.lang.Float): com.mapbox.mapboxsdk.style.layers.PropertyValue<java.lang.Float>;
						public static textRotate(param0: com.mapbox.mapboxsdk.style.expressions.Expression): com.mapbox.mapboxsdk.style.layers.PropertyValue<com.mapbox.mapboxsdk.style.expressions.Expression>;
						public static textOptional(param0: java.lang.Boolean): com.mapbox.mapboxsdk.style.layers.PropertyValue<java.lang.Boolean>;
						public static textAnchor(param0: string): com.mapbox.mapboxsdk.style.layers.PropertyValue<string>;
						public static iconOffset(param0: native.Array<java.lang.Float>): com.mapbox.mapboxsdk.style.layers.PropertyValue<native.Array<java.lang.Float>>;
						public static circleTranslateAnchor(param0: com.mapbox.mapboxsdk.style.expressions.Expression): com.mapbox.mapboxsdk.style.layers.PropertyValue<com.mapbox.mapboxsdk.style.expressions.Expression>;
						public static heatmapOpacity(param0: com.mapbox.mapboxsdk.style.expressions.Expression): com.mapbox.mapboxsdk.style.layers.PropertyValue<com.mapbox.mapboxsdk.style.expressions.Expression>;
						public static textRadialOffset(param0: java.lang.Float): com.mapbox.mapboxsdk.style.layers.PropertyValue<java.lang.Float>;
						public static iconPitchAlignment(param0: com.mapbox.mapboxsdk.style.expressions.Expression): com.mapbox.mapboxsdk.style.layers.PropertyValue<com.mapbox.mapboxsdk.style.expressions.Expression>;
						public static fillExtrusionVerticalGradient(param0: com.mapbox.mapboxsdk.style.expressions.Expression): com.mapbox.mapboxsdk.style.layers.PropertyValue<com.mapbox.mapboxsdk.style.expressions.Expression>;
						public static rasterBrightnessMin(param0: java.lang.Float): com.mapbox.mapboxsdk.style.layers.PropertyValue<java.lang.Float>;
						public static fillExtrusionColor(param0: number): com.mapbox.mapboxsdk.style.layers.PropertyValue<string>;
						public static symbolAvoidEdges(param0: java.lang.Boolean): com.mapbox.mapboxsdk.style.layers.PropertyValue<java.lang.Boolean>;
						public static textJustify(param0: com.mapbox.mapboxsdk.style.expressions.Expression): com.mapbox.mapboxsdk.style.layers.PropertyValue<com.mapbox.mapboxsdk.style.expressions.Expression>;
						public static circleBlur(param0: java.lang.Float): com.mapbox.mapboxsdk.style.layers.PropertyValue<java.lang.Float>;
						public static textTransform(param0: com.mapbox.mapboxsdk.style.expressions.Expression): com.mapbox.mapboxsdk.style.layers.PropertyValue<com.mapbox.mapboxsdk.style.expressions.Expression>;
						public static textHaloWidth(param0: java.lang.Float): com.mapbox.mapboxsdk.style.layers.PropertyValue<java.lang.Float>;
						public static rasterOpacity(param0: com.mapbox.mapboxsdk.style.expressions.Expression): com.mapbox.mapboxsdk.style.layers.PropertyValue<com.mapbox.mapboxsdk.style.expressions.Expression>;
						public static iconHaloColor(param0: com.mapbox.mapboxsdk.style.expressions.Expression): com.mapbox.mapboxsdk.style.layers.PropertyValue<com.mapbox.mapboxsdk.style.expressions.Expression>;
						public static fillExtrusionHeight(param0: com.mapbox.mapboxsdk.style.expressions.Expression): com.mapbox.mapboxsdk.style.layers.PropertyValue<com.mapbox.mapboxsdk.style.expressions.Expression>;
						public static textRotationAlignment(param0: string): com.mapbox.mapboxsdk.style.layers.PropertyValue<string>;
						public static backgroundPattern(param0: string): com.mapbox.mapboxsdk.style.layers.PropertyValue<string>;
						public static rasterResampling(param0: com.mapbox.mapboxsdk.style.expressions.Expression): com.mapbox.mapboxsdk.style.layers.PropertyValue<com.mapbox.mapboxsdk.style.expressions.Expression>;
						public static iconOptional(param0: com.mapbox.mapboxsdk.style.expressions.Expression): com.mapbox.mapboxsdk.style.layers.PropertyValue<com.mapbox.mapboxsdk.style.expressions.Expression>;
						public static iconColor(param0: com.mapbox.mapboxsdk.style.expressions.Expression): com.mapbox.mapboxsdk.style.layers.PropertyValue<com.mapbox.mapboxsdk.style.expressions.Expression>;
						public static symbolSpacing(param0: java.lang.Float): com.mapbox.mapboxsdk.style.layers.PropertyValue<java.lang.Float>;
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export module style {
				export module layers {
					export class PropertyValue<T>  extends java.lang.Object {
						public static class: java.lang.Class<com.mapbox.mapboxsdk.style.layers.PropertyValue<any>>;
						public name: string;
						public value: T;
						public getExpression(): com.mapbox.mapboxsdk.style.expressions.Expression;
						public isNull(): boolean;
						public getColorInt(): java.lang.Integer;
						public isExpression(): boolean;
						public constructor(param0: string, param1: T);
						public isValue(): boolean;
						public getValue(): T;
						public toString(): string;
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export module style {
				export module layers {
					export class RasterLayer extends com.mapbox.mapboxsdk.style.layers.Layer {
						public static class: java.lang.Class<com.mapbox.mapboxsdk.style.layers.RasterLayer>;
						public getRasterContrast(): com.mapbox.mapboxsdk.style.layers.PropertyValue<java.lang.Float>;
						public getRasterOpacity(): com.mapbox.mapboxsdk.style.layers.PropertyValue<java.lang.Float>;
						public withSourceLayer(param0: string): com.mapbox.mapboxsdk.style.layers.RasterLayer;
						public initialize(param0: string, param1: string): void;
						public setRasterBrightnessMinTransition(param0: com.mapbox.mapboxsdk.style.layers.TransitionOptions): void;
						public setRasterSaturationTransition(param0: com.mapbox.mapboxsdk.style.layers.TransitionOptions): void;
						public getRasterBrightnessMin(): com.mapbox.mapboxsdk.style.layers.PropertyValue<java.lang.Float>;
						public getRasterBrightnessMinTransition(): com.mapbox.mapboxsdk.style.layers.TransitionOptions;
						public finalize(): void;
						public getRasterResampling(): com.mapbox.mapboxsdk.style.layers.PropertyValue<string>;
						public setRasterHueRotateTransition(param0: com.mapbox.mapboxsdk.style.layers.TransitionOptions): void;
						public setRasterBrightnessMaxTransition(param0: com.mapbox.mapboxsdk.style.layers.TransitionOptions): void;
						public getRasterContrastTransition(): com.mapbox.mapboxsdk.style.layers.TransitionOptions;
						public constructor(param0: string, param1: string);
						public getRasterSaturationTransition(): com.mapbox.mapboxsdk.style.layers.TransitionOptions;
						public constructor();
						public setSourceLayer(param0: string): void;
						public setRasterOpacityTransition(param0: com.mapbox.mapboxsdk.style.layers.TransitionOptions): void;
						public getSourceId(): string;
						public getRasterHueRotateTransition(): com.mapbox.mapboxsdk.style.layers.TransitionOptions;
						public getRasterFadeDuration(): com.mapbox.mapboxsdk.style.layers.PropertyValue<java.lang.Float>;
						public getRasterSaturation(): com.mapbox.mapboxsdk.style.layers.PropertyValue<java.lang.Float>;
						public constructor(param0: number);
						public getRasterHueRotate(): com.mapbox.mapboxsdk.style.layers.PropertyValue<java.lang.Float>;
						public getRasterBrightnessMax(): com.mapbox.mapboxsdk.style.layers.PropertyValue<java.lang.Float>;
						public setRasterContrastTransition(param0: com.mapbox.mapboxsdk.style.layers.TransitionOptions): void;
						public getRasterOpacityTransition(): com.mapbox.mapboxsdk.style.layers.TransitionOptions;
						public getRasterBrightnessMaxTransition(): com.mapbox.mapboxsdk.style.layers.TransitionOptions;
						public withProperties(param0: native.Array<com.mapbox.mapboxsdk.style.layers.PropertyValue<any>>): com.mapbox.mapboxsdk.style.layers.RasterLayer;
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export module style {
				export module layers {
					export class SymbolLayer extends com.mapbox.mapboxsdk.style.layers.Layer {
						public static class: java.lang.Class<com.mapbox.mapboxsdk.style.layers.SymbolLayer>;
						public getIconImage(): com.mapbox.mapboxsdk.style.layers.PropertyValue<string>;
						public getTextRotate(): com.mapbox.mapboxsdk.style.layers.PropertyValue<java.lang.Float>;
						public getTextAllowOverlap(): com.mapbox.mapboxsdk.style.layers.PropertyValue<java.lang.Boolean>;
						public getIconTranslateAnchor(): com.mapbox.mapboxsdk.style.layers.PropertyValue<string>;
						public getTextLetterSpacing(): com.mapbox.mapboxsdk.style.layers.PropertyValue<java.lang.Float>;
						public getTextHaloColorAsInt(): number;
						public getTextHaloColor(): com.mapbox.mapboxsdk.style.layers.PropertyValue<string>;
						public finalize(): void;
						public getTextSize(): com.mapbox.mapboxsdk.style.layers.PropertyValue<java.lang.Float>;
						public getIconOpacity(): com.mapbox.mapboxsdk.style.layers.PropertyValue<java.lang.Float>;
						public getIconTextFit(): com.mapbox.mapboxsdk.style.layers.PropertyValue<string>;
						public getTextColorTransition(): com.mapbox.mapboxsdk.style.layers.TransitionOptions;
						public getSymbolZOrder(): com.mapbox.mapboxsdk.style.layers.PropertyValue<string>;
						public setTextHaloWidthTransition(param0: com.mapbox.mapboxsdk.style.layers.TransitionOptions): void;
						public getTextKeepUpright(): com.mapbox.mapboxsdk.style.layers.PropertyValue<java.lang.Boolean>;
						public getIconOptional(): com.mapbox.mapboxsdk.style.layers.PropertyValue<java.lang.Boolean>;
						public constructor(param0: string, param1: string);
						public getTextMaxWidth(): com.mapbox.mapboxsdk.style.layers.PropertyValue<java.lang.Float>;
						public getIconHaloColor(): com.mapbox.mapboxsdk.style.layers.PropertyValue<string>;
						public getIconAllowOverlap(): com.mapbox.mapboxsdk.style.layers.PropertyValue<java.lang.Boolean>;
						public setIconColorTransition(param0: com.mapbox.mapboxsdk.style.layers.TransitionOptions): void;
						public withSourceLayer(param0: string): com.mapbox.mapboxsdk.style.layers.SymbolLayer;
						public constructor();
						public getSymbolSpacing(): com.mapbox.mapboxsdk.style.layers.PropertyValue<java.lang.Float>;
						public getIconHaloColorTransition(): com.mapbox.mapboxsdk.style.layers.TransitionOptions;
						public setIconOpacityTransition(param0: com.mapbox.mapboxsdk.style.layers.TransitionOptions): void;
						public setTextColorTransition(param0: com.mapbox.mapboxsdk.style.layers.TransitionOptions): void;
						public getTextHaloColorTransition(): com.mapbox.mapboxsdk.style.layers.TransitionOptions;
						public setTextTranslateTransition(param0: com.mapbox.mapboxsdk.style.layers.TransitionOptions): void;
						public setIconHaloColorTransition(param0: com.mapbox.mapboxsdk.style.layers.TransitionOptions): void;
						public getTextJustify(): com.mapbox.mapboxsdk.style.layers.PropertyValue<string>;
						public getTextRadialOffset(): com.mapbox.mapboxsdk.style.layers.PropertyValue<java.lang.Float>;
						public getIconOpacityTransition(): com.mapbox.mapboxsdk.style.layers.TransitionOptions;
						public getIconHaloBlurTransition(): com.mapbox.mapboxsdk.style.layers.TransitionOptions;
						public getTextTransform(): com.mapbox.mapboxsdk.style.layers.PropertyValue<string>;
						public getIconColorAsInt(): number;
						public getTextTranslate(): com.mapbox.mapboxsdk.style.layers.PropertyValue<native.Array<java.lang.Float>>;
						public getTextOffset(): com.mapbox.mapboxsdk.style.layers.PropertyValue<native.Array<java.lang.Float>>;
						public getTextHaloWidth(): com.mapbox.mapboxsdk.style.layers.PropertyValue<java.lang.Float>;
						public setIconTranslateTransition(param0: com.mapbox.mapboxsdk.style.layers.TransitionOptions): void;
						public getIconHaloBlur(): com.mapbox.mapboxsdk.style.layers.PropertyValue<java.lang.Float>;
						public getSymbolAvoidEdges(): com.mapbox.mapboxsdk.style.layers.PropertyValue<java.lang.Boolean>;
						public setIconHaloWidthTransition(param0: com.mapbox.mapboxsdk.style.layers.TransitionOptions): void;
						public getSymbolPlacement(): com.mapbox.mapboxsdk.style.layers.PropertyValue<string>;
						public getIconPadding(): com.mapbox.mapboxsdk.style.layers.PropertyValue<java.lang.Float>;
						public getTextPitchAlignment(): com.mapbox.mapboxsdk.style.layers.PropertyValue<string>;
						public getIconSize(): com.mapbox.mapboxsdk.style.layers.PropertyValue<java.lang.Float>;
						public getIconHaloColorAsInt(): number;
						public getSourceLayer(): string;
						public setIconHaloBlurTransition(param0: com.mapbox.mapboxsdk.style.layers.TransitionOptions): void;
						public initialize(param0: string, param1: string): void;
						public getTextTranslateAnchor(): com.mapbox.mapboxsdk.style.layers.PropertyValue<string>;
						public getTextAnchor(): com.mapbox.mapboxsdk.style.layers.PropertyValue<string>;
						public getFilter(): com.mapbox.mapboxsdk.style.expressions.Expression;
						public getTextColorAsInt(): number;
						public getIconColorTransition(): com.mapbox.mapboxsdk.style.layers.TransitionOptions;
						public getIconHaloWidthTransition(): com.mapbox.mapboxsdk.style.layers.TransitionOptions;
						public getTextHaloBlur(): com.mapbox.mapboxsdk.style.layers.PropertyValue<java.lang.Float>;
						public getTextOptional(): com.mapbox.mapboxsdk.style.layers.PropertyValue<java.lang.Boolean>;
						public getIconOffset(): com.mapbox.mapboxsdk.style.layers.PropertyValue<native.Array<java.lang.Float>>;
						public getTextWritingMode(): com.mapbox.mapboxsdk.style.layers.PropertyValue<native.Array<string>>;
						public getIconRotate(): com.mapbox.mapboxsdk.style.layers.PropertyValue<java.lang.Float>;
						public getTextVariableAnchor(): com.mapbox.mapboxsdk.style.layers.PropertyValue<native.Array<string>>;
						public withProperties(param0: native.Array<com.mapbox.mapboxsdk.style.layers.PropertyValue<any>>): com.mapbox.mapboxsdk.style.layers.SymbolLayer;
						public setTextOpacityTransition(param0: com.mapbox.mapboxsdk.style.layers.TransitionOptions): void;
						public setTextHaloBlurTransition(param0: com.mapbox.mapboxsdk.style.layers.TransitionOptions): void;
						public getTextIgnorePlacement(): com.mapbox.mapboxsdk.style.layers.PropertyValue<java.lang.Boolean>;
						public getTextColor(): com.mapbox.mapboxsdk.style.layers.PropertyValue<string>;
						public getTextMaxAngle(): com.mapbox.mapboxsdk.style.layers.PropertyValue<java.lang.Float>;
						public setTextHaloColorTransition(param0: com.mapbox.mapboxsdk.style.layers.TransitionOptions): void;
						public getIconIgnorePlacement(): com.mapbox.mapboxsdk.style.layers.PropertyValue<java.lang.Boolean>;
						public setFilter(param0: com.mapbox.mapboxsdk.style.expressions.Expression): void;
						public getTextPadding(): com.mapbox.mapboxsdk.style.layers.PropertyValue<java.lang.Float>;
						public getIconKeepUpright(): com.mapbox.mapboxsdk.style.layers.PropertyValue<java.lang.Boolean>;
						public getTextRotationAlignment(): com.mapbox.mapboxsdk.style.layers.PropertyValue<string>;
						public getTextOpacityTransition(): com.mapbox.mapboxsdk.style.layers.TransitionOptions;
						public getIconPitchAlignment(): com.mapbox.mapboxsdk.style.layers.PropertyValue<string>;
						public withFilter(param0: com.mapbox.mapboxsdk.style.expressions.Expression): com.mapbox.mapboxsdk.style.layers.SymbolLayer;
						public getTextLineHeight(): com.mapbox.mapboxsdk.style.layers.PropertyValue<java.lang.Float>;
						public setSourceLayer(param0: string): void;
						public getIconRotationAlignment(): com.mapbox.mapboxsdk.style.layers.PropertyValue<string>;
						public getIconTranslate(): com.mapbox.mapboxsdk.style.layers.PropertyValue<native.Array<java.lang.Float>>;
						public getSymbolSortKey(): com.mapbox.mapboxsdk.style.layers.PropertyValue<java.lang.Float>;
						public getIconColor(): com.mapbox.mapboxsdk.style.layers.PropertyValue<string>;
						public getIconTranslateTransition(): com.mapbox.mapboxsdk.style.layers.TransitionOptions;
						public getTextTranslateTransition(): com.mapbox.mapboxsdk.style.layers.TransitionOptions;
						public getTextField(): com.mapbox.mapboxsdk.style.layers.PropertyValue<com.mapbox.mapboxsdk.style.types.Formatted>;
						public getSourceId(): string;
						public getTextOpacity(): com.mapbox.mapboxsdk.style.layers.PropertyValue<java.lang.Float>;
						public getIconAnchor(): com.mapbox.mapboxsdk.style.layers.PropertyValue<string>;
						public getTextFont(): com.mapbox.mapboxsdk.style.layers.PropertyValue<native.Array<string>>;
						public getIconTextFitPadding(): com.mapbox.mapboxsdk.style.layers.PropertyValue<native.Array<java.lang.Float>>;
						public getIconHaloWidth(): com.mapbox.mapboxsdk.style.layers.PropertyValue<java.lang.Float>;
						public constructor(param0: number);
						public getTextHaloBlurTransition(): com.mapbox.mapboxsdk.style.layers.TransitionOptions;
						public getTextHaloWidthTransition(): com.mapbox.mapboxsdk.style.layers.TransitionOptions;
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export module style {
				export module layers {
					export class TransitionOptions extends java.lang.Object {
						public static class: java.lang.Class<com.mapbox.mapboxsdk.style.layers.TransitionOptions>;
						public constructor(param0: number, param1: number, param2: boolean);
						public getDelay(): number;
						public getDuration(): number;
						/** @deprecated */
						public static fromTransitionOptions(param0: number, param1: number): com.mapbox.mapboxsdk.style.layers.TransitionOptions;
						public equals(param0: any): boolean;
						public hashCode(): number;
						public isEnablePlacementTransitions(): boolean;
						public constructor(param0: number, param1: number);
						public toString(): string;
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export module style {
				export module light {
					export class Light extends java.lang.Object {
						public static class: java.lang.Class<com.mapbox.mapboxsdk.style.light.Light>;
						public setPositionTransition(param0: com.mapbox.mapboxsdk.style.layers.TransitionOptions): void;
						public getColor(): string;
						public getAnchor(): string;
						public setAnchor(param0: string): void;
						public getColorTransition(): com.mapbox.mapboxsdk.style.layers.TransitionOptions;
						public getPositionTransition(): com.mapbox.mapboxsdk.style.layers.TransitionOptions;
						public setColor(param0: number): void;
						public setColorTransition(param0: com.mapbox.mapboxsdk.style.layers.TransitionOptions): void;
						public setPosition(param0: com.mapbox.mapboxsdk.style.light.Position): void;
						public getIntensityTransition(): com.mapbox.mapboxsdk.style.layers.TransitionOptions;
						public setIntensity(param0: number): void;
						public getPosition(): com.mapbox.mapboxsdk.style.light.Position;
						public getIntensity(): number;
						public setColor(param0: string): void;
						public setIntensityTransition(param0: com.mapbox.mapboxsdk.style.layers.TransitionOptions): void;
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export module style {
				export module light {
					export class Position extends java.lang.Object {
						public static class: java.lang.Class<com.mapbox.mapboxsdk.style.light.Position>;
						public static fromPosition(param0: number, param1: number, param2: number): com.mapbox.mapboxsdk.style.light.Position;
						public equals(param0: any): boolean;
						public hashCode(): number;
						public constructor(param0: number, param1: number, param2: number);
						public toString(): string;
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export module style {
				export module sources {
					export class CannotAddSourceException extends java.lang.RuntimeException {
						public static class: java.lang.Class<com.mapbox.mapboxsdk.style.sources.CannotAddSourceException>;
						public constructor();
						public constructor(param0: java.lang.Throwable);
						public constructor(param0: string, param1: java.lang.Throwable);
						public constructor(param0: string, param1: java.lang.Throwable, param2: boolean, param3: boolean);
						public constructor(param0: string);
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export module style {
				export module sources {
					export class CustomGeometrySource extends com.mapbox.mapboxsdk.style.sources.Source {
						public static class: java.lang.Class<com.mapbox.mapboxsdk.style.sources.CustomGeometrySource>;
						public static THREAD_PREFIX: string;
						public static THREAD_POOL_LIMIT: number;
						public constructor(param0: string, param1: com.mapbox.mapboxsdk.style.sources.CustomGeometrySourceOptions, param2: com.mapbox.mapboxsdk.style.sources.GeometryTileProvider);
						public constructor();
						public invalidateRegion(param0: com.mapbox.mapboxsdk.geometry.LatLngBounds): void;
						public constructor(param0: number);
						public invalidateTile(param0: number, param1: number, param2: number): void;
						public setTileData(param0: number, param1: number, param2: number, param3: com.mapbox.geojson.FeatureCollection): void;
						public initialize(param0: string, param1: any): void;
						public constructor(param0: string, param1: com.mapbox.mapboxsdk.style.sources.GeometryTileProvider);
						public querySourceFeatures(param0: com.mapbox.mapboxsdk.style.expressions.Expression): java.util.List<com.mapbox.geojson.Feature>;
						public finalize(): void;
					}
					export module CustomGeometrySource {
						export class GeometryTileRequest extends java.lang.Object implements java.lang.Runnable {
							public static class: java.lang.Class<com.mapbox.mapboxsdk.style.sources.CustomGeometrySource.GeometryTileRequest>;
							public equals(param0: any): boolean;
							public run(): void;
						}
						export class TileID extends java.lang.Object {
							public static class: java.lang.Class<com.mapbox.mapboxsdk.style.sources.CustomGeometrySource.TileID>;
							public z: number;
							public x: number;
							public y: number;
							public hashCode(): number;
							public equals(param0: any): boolean;
						}
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export module style {
				export module sources {
					export class CustomGeometrySourceOptions extends java.util.HashMap<string,any> {
						public static class: java.lang.Class<com.mapbox.mapboxsdk.style.sources.CustomGeometrySourceOptions>;
						public put(param0: any, param1: any): any;
						public remove(param0: any): any;
						public entrySet(): java.util.Set<java.util.Map.Entry<any,any>>;
						public constructor(param0: java.util.Map<any,any>);
						public replace(param0: any, param1: any): any;
						public equals(param0: any): boolean;
						public hashCode(): number;
						public withClip(param0: boolean): com.mapbox.mapboxsdk.style.sources.CustomGeometrySourceOptions;
						public getOrDefault(param0: any, param1: any): any;
						public values(): java.util.Collection<any>;
						public withMaxZoom(param0: number): com.mapbox.mapboxsdk.style.sources.CustomGeometrySourceOptions;
						public putAll(param0: java.util.Map<any,any>): void;
						public isEmpty(): boolean;
						public remove(param0: any, param1: any): boolean;
						public size(): number;
						public constructor(param0: number, param1: number);
						public withTolerance(param0: number): com.mapbox.mapboxsdk.style.sources.CustomGeometrySourceOptions;
						public putIfAbsent(param0: any, param1: any): any;
						public merge(param0: any, param1: any, param2: any /* any<any,any,any>*/): any;
						public forEach(param0: any /* any<any,any>*/): void;
						public constructor();
						public withMinZoom(param0: number): com.mapbox.mapboxsdk.style.sources.CustomGeometrySourceOptions;
						public computeIfAbsent(param0: any, param1: any /* any<any,any>*/): any;
						public get(param0: any): any;
						public withWrap(param0: boolean): com.mapbox.mapboxsdk.style.sources.CustomGeometrySourceOptions;
						public computeIfPresent(param0: any, param1: any /* any<any,any,any>*/): any;
						public containsValue(param0: any): boolean;
						public containsKey(param0: any): boolean;
						public withBuffer(param0: number): com.mapbox.mapboxsdk.style.sources.CustomGeometrySourceOptions;
						public constructor(param0: number);
						public compute(param0: any, param1: any /* any<any,any,any>*/): any;
						public replaceAll(param0: any /* any<any,any,any>*/): void;
						public clear(): void;
						public replace(param0: any, param1: any, param2: any): boolean;
						public keySet(): java.util.Set<any>;
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export module style {
				export module sources {
					export class GeoJsonOptions extends java.util.HashMap<string,any> {
						public static class: java.lang.Class<com.mapbox.mapboxsdk.style.sources.GeoJsonOptions>;
						public put(param0: any, param1: any): any;
						public remove(param0: any): any;
						public entrySet(): java.util.Set<java.util.Map.Entry<any,any>>;
						public constructor(param0: java.util.Map<any,any>);
						public replace(param0: any, param1: any): any;
						public equals(param0: any): boolean;
						public hashCode(): number;
						public getOrDefault(param0: any, param1: any): any;
						public withClusterRadius(param0: number): com.mapbox.mapboxsdk.style.sources.GeoJsonOptions;
						public values(): java.util.Collection<any>;
						public withClusterProperty(param0: string, param1: com.mapbox.mapboxsdk.style.expressions.Expression, param2: com.mapbox.mapboxsdk.style.expressions.Expression): com.mapbox.mapboxsdk.style.sources.GeoJsonOptions;
						public putAll(param0: java.util.Map<any,any>): void;
						public isEmpty(): boolean;
						public remove(param0: any, param1: any): boolean;
						public withMinZoom(param0: number): com.mapbox.mapboxsdk.style.sources.GeoJsonOptions;
						public size(): number;
						public constructor(param0: number, param1: number);
						public withMaxZoom(param0: number): com.mapbox.mapboxsdk.style.sources.GeoJsonOptions;
						public putIfAbsent(param0: any, param1: any): any;
						public withLineMetrics(param0: boolean): com.mapbox.mapboxsdk.style.sources.GeoJsonOptions;
						public merge(param0: any, param1: any, param2: any /* any<any,any,any>*/): any;
						public forEach(param0: any /* any<any,any>*/): void;
						public constructor();
						public withClusterMaxZoom(param0: number): com.mapbox.mapboxsdk.style.sources.GeoJsonOptions;
						public computeIfAbsent(param0: any, param1: any /* any<any,any>*/): any;
						public get(param0: any): any;
						public computeIfPresent(param0: any, param1: any /* any<any,any,any>*/): any;
						public containsValue(param0: any): boolean;
						public containsKey(param0: any): boolean;
						public constructor(param0: number);
						public withCluster(param0: boolean): com.mapbox.mapboxsdk.style.sources.GeoJsonOptions;
						public compute(param0: any, param1: any /* any<any,any,any>*/): any;
						public replaceAll(param0: any /* any<any,any,any>*/): void;
						public clear(): void;
						public replace(param0: any, param1: any, param2: any): boolean;
						public withBuffer(param0: number): com.mapbox.mapboxsdk.style.sources.GeoJsonOptions;
						public withTolerance(param0: number): com.mapbox.mapboxsdk.style.sources.GeoJsonOptions;
						public keySet(): java.util.Set<any>;
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export module style {
				export module sources {
					export class GeoJsonSource extends com.mapbox.mapboxsdk.style.sources.Source {
						public static class: java.lang.Class<com.mapbox.mapboxsdk.style.sources.GeoJsonSource>;
						public constructor(param0: string, param1: java.net.URI, param2: com.mapbox.mapboxsdk.style.sources.GeoJsonOptions);
						public setGeoJson(param0: string): void;
						/** @deprecated */
						public setUrl(param0: string): void;
						public getClusterLeaves(param0: com.mapbox.geojson.Feature, param1: number, param2: number): com.mapbox.geojson.FeatureCollection;
						public nativeGetUrl(): string;
						/** @deprecated */
						public constructor(param0: string, param1: java.net.URL, param2: com.mapbox.mapboxsdk.style.sources.GeoJsonOptions);
						public setUri(param0: string): void;
						public constructor(param0: string, param1: string, param2: com.mapbox.mapboxsdk.style.sources.GeoJsonOptions);
						/** @deprecated */
						public constructor(param0: string, param1: java.net.URL);
						public finalize(): void;
						public setUri(param0: java.net.URI): void;
						public constructor(param0: string, param1: com.mapbox.geojson.Geometry, param2: com.mapbox.mapboxsdk.style.sources.GeoJsonOptions);
						public setGeoJson(param0: com.mapbox.geojson.FeatureCollection): void;
						public getUri(): string;
						public nativeSetUrl(param0: string): void;
						public getClusterExpansionZoom(param0: com.mapbox.geojson.Feature): number;
						public constructor(param0: string, param1: com.mapbox.geojson.FeatureCollection, param2: com.mapbox.mapboxsdk.style.sources.GeoJsonOptions);
						public initialize(param0: string, param1: any): void;
						public constructor(param0: string, param1: string);
						public setGeoJson(param0: com.mapbox.geojson.Geometry): void;
						public constructor(param0: string, param1: java.net.URI);
						public constructor();
						public constructor(param0: string, param1: com.mapbox.geojson.FeatureCollection);
						/** @deprecated */
						public setUrl(param0: java.net.URL): void;
						/** @deprecated */
						public getUrl(): string;
						public constructor(param0: string, param1: com.mapbox.geojson.Feature);
						public constructor(param0: string, param1: com.mapbox.geojson.Geometry);
						public constructor(param0: string, param1: com.mapbox.geojson.Feature, param2: com.mapbox.mapboxsdk.style.sources.GeoJsonOptions);
						public querySourceFeatures(param0: com.mapbox.mapboxsdk.style.expressions.Expression): java.util.List<com.mapbox.geojson.Feature>;
						public setGeoJson(param0: com.mapbox.geojson.Feature): void;
						public constructor(param0: string, param1: com.mapbox.mapboxsdk.style.sources.GeoJsonOptions);
						public constructor(param0: number);
						public getClusterChildren(param0: com.mapbox.geojson.Feature): com.mapbox.geojson.FeatureCollection;
						public constructor(param0: string);
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export module style {
				export module sources {
					export class GeometryTileProvider extends java.lang.Object {
						public static class: java.lang.Class<com.mapbox.mapboxsdk.style.sources.GeometryTileProvider>;
						/**
						 * Constructs a new instance of the com.mapbox.mapboxsdk.style.sources.GeometryTileProvider interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
						 */
						public constructor(implementation: {
							getFeaturesForBounds(param0: com.mapbox.mapboxsdk.geometry.LatLngBounds, param1: number): com.mapbox.geojson.FeatureCollection;
						});
						public constructor();
						public getFeaturesForBounds(param0: com.mapbox.mapboxsdk.geometry.LatLngBounds, param1: number): com.mapbox.geojson.FeatureCollection;
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export module style {
				export module sources {
					export class ImageSource extends com.mapbox.mapboxsdk.style.sources.Source {
						public static class: java.lang.Class<com.mapbox.mapboxsdk.style.sources.ImageSource>;
						public constructor(param0: string, param1: com.mapbox.mapboxsdk.geometry.LatLngQuad, param2: globalAndroid.graphics.Bitmap);
						public constructor();
						public constructor(param0: string, param1: com.mapbox.mapboxsdk.geometry.LatLngQuad, param2: number);
						/** @deprecated */
						public setUrl(param0: string): void;
						/** @deprecated */
						public setUrl(param0: java.net.URL): void;
						/** @deprecated */
						public getUrl(): string;
						public setImage(param0: number): void;
						public nativeGetUrl(): string;
						public constructor(param0: string, param1: com.mapbox.mapboxsdk.geometry.LatLngQuad, param2: java.net.URI);
						/** @deprecated */
						public constructor(param0: string, param1: com.mapbox.mapboxsdk.geometry.LatLngQuad, param2: java.net.URL);
						public setUri(param0: string): void;
						public setCoordinates(param0: com.mapbox.mapboxsdk.geometry.LatLngQuad): void;
						public setImage(param0: globalAndroid.graphics.Bitmap): void;
						public initialize(param0: string, param1: com.mapbox.mapboxsdk.geometry.LatLngQuad): void;
						public finalize(): void;
						public setUri(param0: java.net.URI): void;
						public getUri(): string;
						public nativeSetUrl(param0: string): void;
						public constructor(param0: number);
						public nativeSetImage(param0: globalAndroid.graphics.Bitmap): void;
						public nativeSetCoordinates(param0: com.mapbox.mapboxsdk.geometry.LatLngQuad): void;
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export module style {
				export module sources {
					export class RasterDemSource extends com.mapbox.mapboxsdk.style.sources.Source {
						public static class: java.lang.Class<com.mapbox.mapboxsdk.style.sources.RasterDemSource>;
						public static DEFAULT_TILE_SIZE: number;
						public constructor();
						/** @deprecated */
						public getUrl(): string;
						public nativeGetUrl(): string;
						/** @deprecated */
						public constructor(param0: string, param1: java.net.URL);
						public initialize(param0: string, param1: any, param2: number): void;
						public finalize(): void;
						public getUri(): string;
						public constructor(param0: number);
						public constructor(param0: string, param1: com.mapbox.mapboxsdk.style.sources.TileSet, param2: number);
						public constructor(param0: string, param1: com.mapbox.mapboxsdk.style.sources.TileSet);
						public constructor(param0: string, param1: string);
						public constructor(param0: string, param1: string, param2: number);
						public constructor(param0: string, param1: java.net.URI);
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export module style {
				export module sources {
					export class RasterSource extends com.mapbox.mapboxsdk.style.sources.Source {
						public static class: java.lang.Class<com.mapbox.mapboxsdk.style.sources.RasterSource>;
						public static DEFAULT_TILE_SIZE: number;
						public constructor();
						/** @deprecated */
						public getUrl(): string;
						public nativeGetUrl(): string;
						/** @deprecated */
						public constructor(param0: string, param1: java.net.URL);
						public initialize(param0: string, param1: any, param2: number): void;
						public finalize(): void;
						public getUri(): string;
						public constructor(param0: number);
						public constructor(param0: string, param1: com.mapbox.mapboxsdk.style.sources.TileSet, param2: number);
						public constructor(param0: string, param1: com.mapbox.mapboxsdk.style.sources.TileSet);
						public constructor(param0: string, param1: string);
						public constructor(param0: string, param1: string, param2: number);
						public constructor(param0: string, param1: java.net.URI);
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export module style {
				export module sources {
					export abstract class Source extends java.lang.Object {
						public static class: java.lang.Class<com.mapbox.mapboxsdk.style.sources.Source>;
						public detached: boolean;
						public constructor();
						public getAttribution(): string;
						public getNativePtr(): number;
						public setDetached(): void;
						public constructor(param0: number);
						public nativeGetAttribution(): string;
						public checkThread(): void;
						public getId(): string;
						public nativeGetId(): string;
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export module style {
				export module sources {
					export class TileSet extends java.lang.Object {
						public static class: java.lang.Class<com.mapbox.mapboxsdk.style.sources.TileSet>;
						public constructor(param0: string, param1: native.Array<string>);
						public setData(param0: native.Array<string>): void;
						public getMaxZoom(): number;
						public getVersion(): string;
						public getScheme(): string;
						public getMinZoom(): number;
						public getTilejson(): string;
						public getName(): string;
						public setTemplate(param0: string): void;
						public setBounds(param0: native.Array<java.lang.Float>): void;
						public setLegend(param0: string): void;
						public setMinZoom(param0: number): void;
						public getEncoding(): string;
						public getGrids(): native.Array<string>;
						public setScheme(param0: string): void;
						public setName(param0: string): void;
						public setCenter(param0: native.Array<java.lang.Float>): void;
						public setMaxZoom(param0: number): void;
						public setDescription(param0: string): void;
						public getAttribution(): string;
						public setAttribution(param0: string): void;
						public getBounds(): native.Array<java.lang.Float>;
						public getTemplate(): string;
						public setGrids(param0: native.Array<string>): void;
						public setCenter(param0: com.mapbox.mapboxsdk.geometry.LatLng): void;
						public setVersion(param0: string): void;
						public getLegend(): string;
						public getDescription(): string;
						public getTiles(): native.Array<string>;
						public getCenter(): native.Array<java.lang.Float>;
						public getData(): native.Array<string>;
						public setEncoding(param0: string): void;
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export module style {
				export module sources {
					export class UnknownSource extends com.mapbox.mapboxsdk.style.sources.Source {
						public static class: java.lang.Class<com.mapbox.mapboxsdk.style.sources.UnknownSource>;
						public initialize(): void;
						public finalize(): void;
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export module style {
				export module sources {
					export class VectorSource extends com.mapbox.mapboxsdk.style.sources.Source {
						public static class: java.lang.Class<com.mapbox.mapboxsdk.style.sources.VectorSource>;
						public constructor();
						/** @deprecated */
						public getUrl(): string;
						public getUri(): string;
						public nativeGetUrl(): string;
						public constructor(param0: number);
						public constructor(param0: string, param1: globalAndroid.net.Uri);
						public initialize(param0: string, param1: any): void;
						public constructor(param0: string, param1: com.mapbox.mapboxsdk.style.sources.TileSet);
						public querySourceFeatures(param0: native.Array<string>, param1: com.mapbox.mapboxsdk.style.expressions.Expression): java.util.List<com.mapbox.geojson.Feature>;
						/** @deprecated */
						public constructor(param0: string, param1: java.net.URL);
						public constructor(param0: string, param1: string);
						public finalize(): void;
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export module style {
				export module types {
					export class Formatted extends java.lang.Object {
						public static class: java.lang.Class<com.mapbox.mapboxsdk.style.types.Formatted>;
						public getFormattedSections(): native.Array<com.mapbox.mapboxsdk.style.types.FormattedSection>;
						public constructor(param0: native.Array<com.mapbox.mapboxsdk.style.types.FormattedSection>);
						public equals(param0: any): boolean;
						public hashCode(): number;
						public toString(): string;
						public toArray(): native.Array<any>;
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export module style {
				export module types {
					export class FormattedSection extends java.lang.Object {
						public static class: java.lang.Class<com.mapbox.mapboxsdk.style.types.FormattedSection>;
						public constructor(param0: string, param1: java.lang.Number, param2: native.Array<string>, param3: string);
						/** @deprecated */
						public constructor(param0: string, param1: native.Array<string>);
						public equals(param0: any): boolean;
						public hashCode(): number;
						public getFontScale(): java.lang.Number;
						public getFontStack(): native.Array<string>;
						public getText(): string;
						public setFontStack(param0: native.Array<string>): void;
						public toString(): string;
						public setTextColor(param0: string): void;
						/** @deprecated */
						public constructor(param0: string, param1: java.lang.Number);
						/** @deprecated */
						public constructor(param0: string, param1: java.lang.Number, param2: native.Array<string>);
						public setTextColor(param0: number): void;
						public getTextColor(): string;
						public constructor(param0: string);
						public setFontScale(param0: java.lang.Number): void;
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export module text {
				export class LocalGlyphRasterizer extends java.lang.Object {
					public static class: java.lang.Class<com.mapbox.mapboxsdk.text.LocalGlyphRasterizer>;
					public drawGlyphBitmap(param0: string, param1: boolean, param2: string): globalAndroid.graphics.Bitmap;
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export module utils {
				export class AnimatorUtils extends java.lang.Object {
					public static class: java.lang.Class<com.mapbox.mapboxsdk.utils.AnimatorUtils>;
					public static rotateBy(param0: globalAndroid.view.View, param1: number): void;
					public static animate(param0: globalAndroid.view.View, param1: number, param2: com.mapbox.mapboxsdk.utils.AnimatorUtils.OnAnimationEndListener): void;
					public constructor();
					public static animate(param0: globalAndroid.view.View, param1: number, param2: number, param3: com.mapbox.mapboxsdk.utils.AnimatorUtils.OnAnimationEndListener): void;
					public static animate(param0: globalAndroid.view.View, param1: number): void;
					public static alpha(param0: globalAndroid.view.View, param1: number): void;
					public static rotate(param0: globalAndroid.view.View, param1: number): void;
					public static animate(param0: globalAndroid.view.View, param1: number, param2: number): void;
					public static alpha(param0: globalAndroid.view.View, param1: number, param2: com.mapbox.mapboxsdk.utils.AnimatorUtils.OnAnimationEndListener): void;
				}
				export module AnimatorUtils {
					export class OnAnimationEndListener extends java.lang.Object {
						public static class: java.lang.Class<com.mapbox.mapboxsdk.utils.AnimatorUtils.OnAnimationEndListener>;
						/**
						 * Constructs a new instance of the com.mapbox.mapboxsdk.utils.AnimatorUtils$OnAnimationEndListener interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
						 */
						public constructor(implementation: {
							onAnimationEnd(): void;
						});
						public constructor();
						public onAnimationEnd(): void;
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export module utils {
				export class BitmapUtils extends java.lang.Object {
					public static class: java.lang.Class<com.mapbox.mapboxsdk.utils.BitmapUtils>;
					public static createBitmapFromView(param0: globalAndroid.view.View): globalAndroid.graphics.Bitmap;
					public equals(param0: any): boolean;
					public static getDrawableFromByteArray(param0: globalAndroid.content.Context, param1: native.Array<number>): globalAndroid.graphics.drawable.Drawable;
					public static getDrawableFromRes(param0: globalAndroid.content.Context, param1: number): globalAndroid.graphics.drawable.Drawable;
					public static mergeBitmap(param0: globalAndroid.graphics.Bitmap, param1: globalAndroid.graphics.Bitmap): globalAndroid.graphics.Bitmap;
					public static getBitmapFromDrawable(param0: globalAndroid.graphics.drawable.Drawable): globalAndroid.graphics.Bitmap;
					public constructor();
					public static getDrawableFromRes(param0: globalAndroid.content.Context, param1: number, param2: java.lang.Integer): globalAndroid.graphics.drawable.Drawable;
					public static getByteArrayFromDrawable(param0: globalAndroid.graphics.drawable.Drawable): native.Array<number>;
					public static equals(param0: globalAndroid.graphics.Bitmap, param1: globalAndroid.graphics.Bitmap): boolean;
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export module utils {
				export class ColorUtils extends java.lang.Object {
					public static class: java.lang.Class<com.mapbox.mapboxsdk.utils.ColorUtils>;
					public static colorToRgbaArray(param0: number): native.Array<number>;
					public constructor();
					public static getSelector(param0: number): globalAndroid.content.res.ColorStateList;
					public static colorToRgbaString(param0: number): string;
					public static colorToGlRgbaArray(param0: number): native.Array<number>;
					public static getPrimaryDarkColor(param0: globalAndroid.content.Context): number;
					public static getAccentColor(param0: globalAndroid.content.Context): number;
					public static getPrimaryColor(param0: globalAndroid.content.Context): number;
					public static setTintList(param0: globalAndroid.widget.ImageView, param1: number): void;
					public static rgbaToColor(param0: string): number;
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export module utils {
				export class Compare extends java.lang.Object {
					public static class: java.lang.Class<com.mapbox.mapboxsdk.utils.Compare>;
					public static compare(param0: boolean, param1: boolean): number;
					public constructor();
					public static compare(param0: number, param1: number): number;
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export module utils {
				export class FileUtils extends java.lang.Object {
					public static class: java.lang.Class<com.mapbox.mapboxsdk.utils.FileUtils>;
					public constructor();
					public static deleteFile(param0: string): void;
				}
				export module FileUtils {
					export class CheckFileReadPermissionTask extends globalAndroid.os.AsyncTask<java.io.File,java.lang.Void,java.lang.Boolean> {
						public static class: java.lang.Class<com.mapbox.mapboxsdk.utils.FileUtils.CheckFileReadPermissionTask>;
						public constructor();
						public constructor(param0: com.mapbox.mapboxsdk.utils.FileUtils.OnCheckFileReadPermissionListener);
						public onCancelled(): void;
						public onPostExecute(param0: java.lang.Boolean): void;
						public doInBackground(param0: native.Array<java.io.File>): java.lang.Boolean;
						public onPostExecute(param0: any): void;
						public doInBackground(param0: native.Array<any>): any;
						public onCancelled(param0: any): void;
					}
					export class CheckFileWritePermissionTask extends globalAndroid.os.AsyncTask<java.io.File,java.lang.Void,java.lang.Boolean> {
						public static class: java.lang.Class<com.mapbox.mapboxsdk.utils.FileUtils.CheckFileWritePermissionTask>;
						public constructor(param0: com.mapbox.mapboxsdk.utils.FileUtils.OnCheckFileWritePermissionListener);
						public constructor();
						public onCancelled(): void;
						public onPostExecute(param0: java.lang.Boolean): void;
						public doInBackground(param0: native.Array<java.io.File>): java.lang.Boolean;
						public onPostExecute(param0: any): void;
						public doInBackground(param0: native.Array<any>): any;
						public onCancelled(param0: any): void;
					}
					export class OnCheckFileReadPermissionListener extends java.lang.Object {
						public static class: java.lang.Class<com.mapbox.mapboxsdk.utils.FileUtils.OnCheckFileReadPermissionListener>;
						/**
						 * Constructs a new instance of the com.mapbox.mapboxsdk.utils.FileUtils$OnCheckFileReadPermissionListener interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
						 */
						public constructor(implementation: {
							onReadPermissionGranted(): void;
							onError(): void;
						});
						public constructor();
						public onError(): void;
						public onReadPermissionGranted(): void;
					}
					export class OnCheckFileWritePermissionListener extends java.lang.Object {
						public static class: java.lang.Class<com.mapbox.mapboxsdk.utils.FileUtils.OnCheckFileWritePermissionListener>;
						/**
						 * Constructs a new instance of the com.mapbox.mapboxsdk.utils.FileUtils$OnCheckFileWritePermissionListener interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
						 */
						public constructor(implementation: {
							onWritePermissionGranted(): void;
							onError(): void;
						});
						public constructor();
						public onError(): void;
						public onWritePermissionGranted(): void;
					}
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export module utils {
				export class FontUtils extends java.lang.Object {
					public static class: java.lang.Class<com.mapbox.mapboxsdk.utils.FontUtils>;
					public static extractValidFont(param0: native.Array<string>): string;
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export module utils {
				export class MapFragmentUtils extends java.lang.Object {
					public static class: java.lang.Class<com.mapbox.mapboxsdk.utils.MapFragmentUtils>;
					public constructor();
					public static createFragmentArgs(param0: com.mapbox.mapboxsdk.maps.MapboxMapOptions): globalAndroid.os.Bundle;
					public static resolveArgs(param0: globalAndroid.content.Context, param1: globalAndroid.os.Bundle): com.mapbox.mapboxsdk.maps.MapboxMapOptions;
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export module utils {
				export class MathUtils extends java.lang.Object {
					public static class: java.lang.Class<com.mapbox.mapboxsdk.utils.MathUtils>;
					public static clamp(param0: number, param1: number, param2: number): number;
					public static wrap(param0: number, param1: number, param2: number): number;
					public constructor();
					public static normalize(param0: number, param1: number, param2: number, param3: number, param4: number): number;
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export module utils {
				export class StringUtils extends java.lang.Object {
					public static class: java.lang.Class<com.mapbox.mapboxsdk.utils.StringUtils>;
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module mapboxsdk {
			export module utils {
				export class ThreadUtils extends java.lang.Object {
					public static class: java.lang.Class<com.mapbox.mapboxsdk.utils.ThreadUtils>;
					public static init(param0: globalAndroid.content.Context): com.mapbox.mapboxsdk.utils.ThreadUtils;
					public constructor();
					public static checkThread(param0: string): void;
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module turf {
			export class TurfAssertions extends java.lang.Object {
				public static class: java.lang.Class<com.mapbox.turf.TurfAssertions>;
				/** @deprecated */
				public static getCoord(param0: com.mapbox.geojson.Feature): any;
				public static geojsonType(param0: com.mapbox.geojson.GeoJson, param1: string, param2: string): void;
				public static featureOf(param0: com.mapbox.geojson.Feature, param1: string, param2: string): void;
				public static collectionOf(param0: com.mapbox.geojson.FeatureCollection, param1: string, param2: string): void;
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module turf {
			export class TurfClassification extends java.lang.Object {
				public static class: java.lang.Class<com.mapbox.turf.TurfClassification>;
				public static nearestPoint(param0: any, param1: java.util.List<any>): any;
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module turf {
			export class TurfConstants extends java.lang.Object {
				public static class: java.lang.Class<com.mapbox.turf.TurfConstants>;
				public static UNIT_MILES: string;
				public static UNIT_NAUTICAL_MILES: string;
				public static UNIT_KILOMETERS: string;
				public static UNIT_RADIANS: string;
				public static UNIT_DEGREES: string;
				public static UNIT_INCHES: string;
				public static UNIT_YARDS: string;
				public static UNIT_METERS: string;
				public static UNIT_CENTIMETERS: string;
				public static UNIT_FEET: string;
				public static UNIT_CENTIMETRES: string;
				public static UNIT_METRES: string;
				public static UNIT_KILOMETRES: string;
				public static UNIT_DEFAULT: string;
			}
			export module TurfConstants {
				export class TurfUnitCriteria extends java.lang.Object implements java.lang.annotation.Annotation {
					public static class: java.lang.Class<com.mapbox.turf.TurfConstants.TurfUnitCriteria>;
					/**
					 * Constructs a new instance of the com.mapbox.turf.TurfConstants$TurfUnitCriteria interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
					 */
					public constructor(implementation: {
						equals(param0: any): boolean;
						hashCode(): number;
						toString(): string;
						annotationType(): java.lang.Class<any>;
					});
					public constructor();
					public equals(param0: any): boolean;
					public toString(): string;
					public annotationType(): java.lang.Class<any>;
					public hashCode(): number;
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module turf {
			export class TurfConversion extends java.lang.Object {
				public static class: java.lang.Class<com.mapbox.turf.TurfConversion>;
				public static lengthToRadians(param0: number, param1: string): number;
				public static explode(param0: com.mapbox.geojson.FeatureCollection): com.mapbox.geojson.FeatureCollection;
				public static lengthToRadians(param0: number): number;
				public static convertLength(param0: number, param1: string): number;
				public static degreesToRadians(param0: number): number;
				public static convertLength(param0: number, param1: string, param2: string): number;
				public static polygonToLine(param0: com.mapbox.geojson.Feature): com.mapbox.geojson.Feature;
				public static explode(param0: com.mapbox.geojson.Feature): com.mapbox.geojson.FeatureCollection;
				public static polygonToLine(param0: com.mapbox.geojson.MultiPolygon, param1: any): com.mapbox.geojson.FeatureCollection;
				public static multiPolygonToLine(param0: com.mapbox.geojson.Feature): com.mapbox.geojson.FeatureCollection;
				public static radiansToLength(param0: number, param1: string): number;
				public static polygonToLine(param0: com.mapbox.geojson.Polygon, param1: any): com.mapbox.geojson.Feature;
				public static polygonToLine(param0: com.mapbox.geojson.MultiPolygon): com.mapbox.geojson.FeatureCollection;
				public static combine(param0: com.mapbox.geojson.FeatureCollection): com.mapbox.geojson.FeatureCollection;
				public static radiansToLength(param0: number): number;
				public static polygonToLine(param0: com.mapbox.geojson.Polygon): com.mapbox.geojson.Feature;
				public static lengthToDegrees(param0: number, param1: string): number;
				public static polygonToLine(param0: com.mapbox.geojson.Feature, param1: any): com.mapbox.geojson.Feature;
				public static radiansToDegrees(param0: number): number;
				public static multiPolygonToLine(param0: com.mapbox.geojson.Feature, param1: any): com.mapbox.geojson.FeatureCollection;
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module turf {
			export class TurfException extends java.lang.RuntimeException {
				public static class: java.lang.Class<com.mapbox.turf.TurfException>;
				public constructor(param0: string, param1: java.lang.Throwable);
				public constructor(param0: java.lang.Throwable);
				public constructor(param0: string);
				public constructor();
				public constructor(param0: string, param1: java.lang.Throwable, param2: boolean, param3: boolean);
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module turf {
			export class TurfJoins extends java.lang.Object {
				public static class: java.lang.Class<com.mapbox.turf.TurfJoins>;
				public static inside(param0: any, param1: com.mapbox.geojson.Polygon): boolean;
				public static inside(param0: any, param1: com.mapbox.geojson.MultiPolygon): boolean;
				public static pointsWithinPolygon(param0: com.mapbox.geojson.FeatureCollection, param1: com.mapbox.geojson.FeatureCollection): com.mapbox.geojson.FeatureCollection;
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module turf {
			export class TurfMeasurement extends java.lang.Object {
				public static class: java.lang.Class<com.mapbox.turf.TurfMeasurement>;
				public static EARTH_RADIUS: number;
				public static length(param0: com.mapbox.geojson.MultiLineString, param1: string): number;
				public static bbox(param0: com.mapbox.geojson.Polygon): native.Array<number>;
				public static area(param0: com.mapbox.geojson.Geometry): number;
				public static length(param0: com.mapbox.geojson.MultiPolygon, param1: string): number;
				public static envelope(param0: com.mapbox.geojson.GeoJson): com.mapbox.geojson.Polygon;
				public static bbox(param0: com.mapbox.geojson.Feature): native.Array<number>;
				public static bbox(param0: com.mapbox.geojson.MultiLineString): native.Array<number>;
				public static length(param0: com.mapbox.geojson.Polygon, param1: string): number;
				public static bboxPolygon(param0: com.mapbox.geojson.BoundingBox): com.mapbox.geojson.Feature;
				public static bbox(param0: com.mapbox.geojson.MultiPoint): native.Array<number>;
				public static bearing(param0: any, param1: any): number;
				public static distance(param0: any, param1: any): number;
				public static square(param0: com.mapbox.geojson.BoundingBox): com.mapbox.geojson.BoundingBox;
				public static length(param0: com.mapbox.geojson.LineString, param1: string): number;
				public static distance(param0: any, param1: any, param2: string): number;
				public static bbox(param0: com.mapbox.geojson.LineString): native.Array<number>;
				public static bbox(param0: com.mapbox.geojson.Geometry): native.Array<number>;
				public static destination(param0: any, param1: number, param2: number, param3: string): any;
				public static along(param0: com.mapbox.geojson.LineString, param1: number, param2: string): any;
				public static bbox(param0: com.mapbox.geojson.GeoJson): native.Array<number>;
				public static bbox(param0: com.mapbox.geojson.MultiPolygon): native.Array<number>;
				public static bboxPolygon(param0: native.Array<number>): com.mapbox.geojson.Feature;
				public static bbox(param0: com.mapbox.geojson.FeatureCollection): native.Array<number>;
				public static bboxPolygon(param0: com.mapbox.geojson.BoundingBox, param1: any, param2: string): com.mapbox.geojson.Feature;
				public static area(param0: com.mapbox.geojson.Feature): number;
				public static bboxPolygon(param0: native.Array<number>, param1: any, param2: string): com.mapbox.geojson.Feature;
				public static bbox(param0: any): native.Array<number>;
				public static midpoint(param0: any, param1: any): any;
				public static area(param0: com.mapbox.geojson.FeatureCollection): number;
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module turf {
			export class TurfMeta extends java.lang.Object {
				public static class: java.lang.Class<com.mapbox.turf.TurfMeta>;
				public static coordAll(param0: any): java.util.List<any>;
				public static coordAll(param0: com.mapbox.geojson.MultiPoint): java.util.List<any>;
				public static coordAll(param0: com.mapbox.geojson.LineString): java.util.List<any>;
				public static coordAll(param0: com.mapbox.geojson.Polygon, param1: boolean): java.util.List<any>;
				public static coordAll(param0: com.mapbox.geojson.FeatureCollection, param1: boolean): java.util.List<any>;
				public static getCoord(param0: com.mapbox.geojson.Feature): any;
				public static coordAll(param0: com.mapbox.geojson.Feature, param1: boolean): java.util.List<any>;
				public static coordAll(param0: com.mapbox.geojson.MultiLineString): java.util.List<any>;
				public static coordAll(param0: com.mapbox.geojson.MultiPolygon, param1: boolean): java.util.List<any>;
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module turf {
			export class TurfMisc extends java.lang.Object {
				public static class: java.lang.Class<com.mapbox.turf.TurfMisc>;
				public static lineSlice(param0: any, param1: any, param2: com.mapbox.geojson.Feature): com.mapbox.geojson.LineString;
				public static lineSlice(param0: any, param1: any, param2: com.mapbox.geojson.LineString): com.mapbox.geojson.LineString;
				public static nearestPointOnLine(param0: any, param1: java.util.List<any>): com.mapbox.geojson.Feature;
				public static nearestPointOnLine(param0: any, param1: java.util.List<any>, param2: string): com.mapbox.geojson.Feature;
				public static lineSliceAlong(param0: com.mapbox.geojson.Feature, param1: number, param2: number, param3: string): com.mapbox.geojson.LineString;
				public static lineSliceAlong(param0: com.mapbox.geojson.LineString, param1: number, param2: number, param3: string): com.mapbox.geojson.LineString;
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module turf {
			export class TurfTransformation extends java.lang.Object {
				public static class: java.lang.Class<com.mapbox.turf.TurfTransformation>;
				public static circle(param0: any, param1: number): com.mapbox.geojson.Polygon;
				public static circle(param0: any, param1: number, param2: string): com.mapbox.geojson.Polygon;
				public static circle(param0: any, param1: number, param2: number, param3: string): com.mapbox.geojson.Polygon;
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module turf {
			export module models {
				export class LineIntersectsResult extends java.lang.Object {
					public static class: java.lang.Class<com.mapbox.turf.models.LineIntersectsResult>;
					public equals(param0: any): boolean;
					public horizontalIntersection(): java.lang.Double;
					public toString(): string;
					public verticalIntersection(): java.lang.Double;
					public onLine1(): boolean;
					public static builder(): com.mapbox.turf.models.LineIntersectsResult.Builder;
					public onLine2(): boolean;
					public toBuilder(): com.mapbox.turf.models.LineIntersectsResult.Builder;
					public hashCode(): number;
				}
				export module LineIntersectsResult {
					export class Builder extends java.lang.Object {
						public static class: java.lang.Class<com.mapbox.turf.models.LineIntersectsResult.Builder>;
						public verticalIntersection(param0: java.lang.Double): com.mapbox.turf.models.LineIntersectsResult.Builder;
						public onLine1(param0: boolean): com.mapbox.turf.models.LineIntersectsResult.Builder;
						public build(): com.mapbox.turf.models.LineIntersectsResult;
						public horizontalIntersection(param0: java.lang.Double): com.mapbox.turf.models.LineIntersectsResult.Builder;
						public onLine2(param0: boolean): com.mapbox.turf.models.LineIntersectsResult.Builder;
					}
				}
			}
		}
	}
}

//Generics information:
//LocationEngineCallback:1
//LocationEngineImpl:1
//LocationEngineProxy:1
//BaseGesture:1
//MultiFingerGesture:1
//ProgressiveGesture:1
//ConcurrentQueue:1
//com.mapbox.api.geocoding.v5.SingleElementSafeListTypeAdapter:1
//com.mapbox.core.MapboxService:2
//com.mapbox.geojson.BaseCoordinatesTypeAdapter:1
//com.mapbox.geojson.BaseGeometryTypeAdapter:2
//com.mapbox.geojson.CoordinateContainer:1
//com.mapbox.geojson.internal.typeadapters.RuntimeTypeAdapterFactory:1
//com.mapbox.mapboxsdk.annotations.BaseMarkerOptions:2
//com.mapbox.mapboxsdk.location.MapboxAnimator:1
//com.mapbox.mapboxsdk.location.MapboxAnimator.AnimationsValueChangeListener:1
//com.mapbox.mapboxsdk.module.telemetry.PerformanceEvent.PerformanceAttribute:1
//com.mapbox.mapboxsdk.plugins.annotation.Annotation:1
//com.mapbox.mapboxsdk.plugins.annotation.AnnotationManager:6
//com.mapbox.mapboxsdk.plugins.annotation.CoreElementProvider:1
//com.mapbox.mapboxsdk.plugins.annotation.DraggableAnnotationController:2
//com.mapbox.mapboxsdk.plugins.annotation.OnAnnotationClickListener:1
//com.mapbox.mapboxsdk.plugins.annotation.OnAnnotationDragListener:1
//com.mapbox.mapboxsdk.plugins.annotation.OnAnnotationLongClickListener:1
//com.mapbox.mapboxsdk.plugins.annotation.Options:1
//com.mapbox.mapboxsdk.style.layers.LayoutPropertyValue:1
//com.mapbox.mapboxsdk.style.layers.PaintPropertyValue:1
//com.mapbox.mapboxsdk.style.layers.PropertyValue:1