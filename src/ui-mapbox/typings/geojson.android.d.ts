declare module com {
	export module mapbox {
		export module geojson {
			export abstract class BaseCoordinatesTypeAdapter<T>  extends com.google.gson.TypeAdapter<any> {
				public static class: java.lang.Class<com.mapbox.geojson.BaseCoordinatesTypeAdapter<any>>;
				public writePointList(out: com.google.gson.stream.JsonWriter, value: java.util.List<java.lang.Double>): void;
				public writePoint(out: com.google.gson.stream.JsonWriter, point: com.mapbox.geojson.Point): void;
				public readPoint(in_: com.google.gson.stream.JsonReader): com.mapbox.geojson.Point;
				public readPointList(in_: com.google.gson.stream.JsonReader): java.util.List<java.lang.Double>;
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module geojson {
			export abstract class BaseGeometryTypeAdapter<G, T>  extends com.google.gson.TypeAdapter<any> {
				public static class: java.lang.Class<com.mapbox.geojson.BaseGeometryTypeAdapter<any,any>>;
				public writeCoordinateContainer(boundingBoxAdapter: com.google.gson.stream.JsonWriter, coordinatesAdapter: com.mapbox.geojson.CoordinateContainer<any>): void;
				public readCoordinateContainer(boundingBoxAdapter: com.google.gson.stream.JsonReader): com.mapbox.geojson.CoordinateContainer<any>;
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module geojson {
			export class BoundingBox {
				public static class: java.lang.Class<com.mapbox.geojson.BoundingBox>;
				public static fromJson(json: string): com.mapbox.geojson.BoundingBox;
				public northeast(): com.mapbox.geojson.Point;
				public west(): number;
				/** @deprecated */
				public static fromCoordinates(west: number, south: number, east: number, north: number): com.mapbox.geojson.BoundingBox;
				public static fromPoints(southwest: com.mapbox.geojson.Point, northeast: com.mapbox.geojson.Point): com.mapbox.geojson.BoundingBox;
				public southwest(): com.mapbox.geojson.Point;
				public toString(): string;
				public static typeAdapter(gson: com.google.gson.Gson): com.google.gson.TypeAdapter<com.mapbox.geojson.BoundingBox>;
				public toJson(): string;
				public north(): number;
				public south(): number;
				public equals(this_: any): boolean;
				public east(): number;
				public hashCode(): number;
				public static fromLngLats(west: number, south: number, east: number, north: number): com.mapbox.geojson.BoundingBox;
				public static fromLngLats(west: number, south: number, southwestAltitude: number, east: number, north: number, northEastAltitude: number): com.mapbox.geojson.BoundingBox;
				/** @deprecated */
				public static fromCoordinates(west: number, south: number, southwestAltitude: number, east: number, north: number, northEastAltitude: number): com.mapbox.geojson.BoundingBox;
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
			export class Feature extends com.mapbox.geojson.GeoJson {
				public static class: java.lang.Class<com.mapbox.geojson.Feature>;
				public id(): string;
				public static typeAdapter(gson: com.google.gson.Gson): com.google.gson.TypeAdapter<com.mapbox.geojson.Feature>;
				public getProperty(key: string): com.google.gson.JsonElement;
				public static fromGeometry(geometry: com.mapbox.geojson.Geometry, properties: com.google.gson.JsonObject, id: string): com.mapbox.geojson.Feature;
				public static fromGeometry(geometry: com.mapbox.geojson.Geometry): com.mapbox.geojson.Feature;
				public properties(): com.google.gson.JsonObject;
				public static fromGeometry(geometry: com.mapbox.geojson.Geometry, properties: com.google.gson.JsonObject, bbox: com.mapbox.geojson.BoundingBox): com.mapbox.geojson.Feature;
				public static fromGeometry(geometry: com.mapbox.geojson.Geometry, properties: com.google.gson.JsonObject): com.mapbox.geojson.Feature;
				public hasNonNullValueForProperty(key: string): boolean;
				public addNumberProperty(key: string, value: java.lang.Number): void;
				public hashCode(): number;
				public type(): string;
				public addStringProperty(key: string, value: string): void;
				public removeProperty(key: string): com.google.gson.JsonElement;
				public geometry(): com.mapbox.geojson.Geometry;
				public getNumberProperty(key: string): java.lang.Number;
				public getBooleanProperty(key: string): java.lang.Boolean;
				public addBooleanProperty(key: string, value: java.lang.Boolean): void;
				public getCharacterProperty(key: string): java.lang.Character;
				public toString(): string;
				public static fromGeometry(geometry: com.mapbox.geojson.Geometry, properties: com.google.gson.JsonObject, id: string, bbox: com.mapbox.geojson.BoundingBox): com.mapbox.geojson.Feature;
				public toJson(): string;
				public getStringProperty(key: string): string;
				public hasProperty(key: string): boolean;
				public addProperty(key: string, value: com.google.gson.JsonElement): void;
				public equals(this_: any): boolean;
				public static fromGeometry(geometry: com.mapbox.geojson.Geometry, bbox: com.mapbox.geojson.BoundingBox): com.mapbox.geojson.Feature;
				public static fromJson(json: string): com.mapbox.geojson.Feature;
				public addCharacterProperty(key: string, value: java.lang.Character): void;
				public bbox(): com.mapbox.geojson.BoundingBox;
			}
			export module Feature {
				export class GsonTypeAdapter extends com.google.gson.TypeAdapter<com.mapbox.geojson.Feature> {
					public static class: java.lang.Class<com.mapbox.geojson.Feature.GsonTypeAdapter>;
					public write(boundingBoxTypeAdapter: com.google.gson.stream.JsonWriter, stringTypeAdapter: com.mapbox.geojson.Feature): void;
					public read(boundingBoxTypeAdapter: com.google.gson.stream.JsonReader): com.mapbox.geojson.Feature;
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module geojson {
			export class FeatureCollection extends com.mapbox.geojson.GeoJson {
				public static class: java.lang.Class<com.mapbox.geojson.FeatureCollection>;
				public static fromFeatures(features: androidNative.Array<com.mapbox.geojson.Feature>, bbox: com.mapbox.geojson.BoundingBox): com.mapbox.geojson.FeatureCollection;
				public static fromFeatures(features: androidNative.Array<com.mapbox.geojson.Feature>): com.mapbox.geojson.FeatureCollection;
				public static fromFeatures(features: java.util.List<com.mapbox.geojson.Feature>, bbox: com.mapbox.geojson.BoundingBox): com.mapbox.geojson.FeatureCollection;
				public static fromFeatures(features: java.util.List<com.mapbox.geojson.Feature>): com.mapbox.geojson.FeatureCollection;
				public static fromFeature(feature: com.mapbox.geojson.Feature): com.mapbox.geojson.FeatureCollection;
				public toString(): string;
				public toJson(): string;
				public static fromFeature(feature: com.mapbox.geojson.Feature, bbox: com.mapbox.geojson.BoundingBox): com.mapbox.geojson.FeatureCollection;
				public equals(this_: any): boolean;
				public static typeAdapter(gson: com.google.gson.Gson): com.google.gson.TypeAdapter<com.mapbox.geojson.FeatureCollection>;
				public hashCode(): number;
				public type(): string;
				public static fromJson(json: string): com.mapbox.geojson.FeatureCollection;
				public features(): java.util.List<com.mapbox.geojson.Feature>;
				public bbox(): com.mapbox.geojson.BoundingBox;
			}
			export module FeatureCollection {
				export class GsonTypeAdapter extends com.google.gson.TypeAdapter<com.mapbox.geojson.FeatureCollection> {
					public static class: java.lang.Class<com.mapbox.geojson.FeatureCollection.GsonTypeAdapter>;
					public write(boundingBoxTypeAdapter: com.google.gson.stream.JsonWriter, typeToken: com.mapbox.geojson.FeatureCollection): void;
					public read(boundingBoxAdapter: com.google.gson.stream.JsonReader): com.mapbox.geojson.FeatureCollection;
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module geojson {
			export class GeoJson {
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
			export class Geometry extends com.mapbox.geojson.GeoJson {
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
			export abstract class GeometryAdapterFactory {
				public static class: java.lang.Class<com.mapbox.geojson.GeometryAdapterFactory>;
				public static create(): com.google.gson.TypeAdapterFactory;
				public constructor();
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module geojson {
			export class GeometryCollection extends com.mapbox.geojson.Geometry {
				public static class: java.lang.Class<com.mapbox.geojson.GeometryCollection>;
				public static typeAdapter(gson: com.google.gson.Gson): com.google.gson.TypeAdapter<com.mapbox.geojson.GeometryCollection>;
				public geometries(): java.util.List<com.mapbox.geojson.Geometry>;
				public static fromGeometry(geometry: com.mapbox.geojson.Geometry, bbox: com.mapbox.geojson.BoundingBox): com.mapbox.geojson.GeometryCollection;
				public static fromGeometries(geometries: java.util.List<com.mapbox.geojson.Geometry>, bbox: com.mapbox.geojson.BoundingBox): com.mapbox.geojson.GeometryCollection;
				public toString(): string;
				public toJson(): string;
				public static fromJson(json: string): com.mapbox.geojson.GeometryCollection;
				public equals(this_: any): boolean;
				public static fromGeometry(geometry: com.mapbox.geojson.Geometry): com.mapbox.geojson.GeometryCollection;
				public static fromGeometries(geometries: java.util.List<com.mapbox.geojson.Geometry>): com.mapbox.geojson.GeometryCollection;
				public hashCode(): number;
				public type(): string;
				public bbox(): com.mapbox.geojson.BoundingBox;
			}
			export module GeometryCollection {
				export class GsonTypeAdapter extends com.google.gson.TypeAdapter<com.mapbox.geojson.GeometryCollection> {
					public static class: java.lang.Class<com.mapbox.geojson.GeometryCollection.GsonTypeAdapter>;
					public write(boundingBoxTypeAdapter: com.google.gson.stream.JsonWriter, typeToken: com.mapbox.geojson.GeometryCollection): void;
					public read(boundingBoxTypeAdapter: com.google.gson.stream.JsonReader): com.mapbox.geojson.GeometryCollection;
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module geojson {
			export class LineString extends com.mapbox.geojson.CoordinateContainer<java.util.List<com.mapbox.geojson.Point>> {
				public static class: java.lang.Class<com.mapbox.geojson.LineString>;
				public toPolyline(precision: number): string;
				public toString(): string;
				public static fromJson(json: string): com.mapbox.geojson.LineString;
				public toJson(): string;
				public static typeAdapter(gson: com.google.gson.Gson): com.google.gson.TypeAdapter<com.mapbox.geojson.LineString>;
				public coordinates(): any;
				public static fromPolyline(polyline: string, precision: number): com.mapbox.geojson.LineString;
				public static fromLngLats(points: java.util.List<com.mapbox.geojson.Point>, bbox: com.mapbox.geojson.BoundingBox): com.mapbox.geojson.LineString;
				public equals(this_: any): boolean;
				public static fromLngLats(points: java.util.List<com.mapbox.geojson.Point>): com.mapbox.geojson.LineString;
				public hashCode(): number;
				public type(): string;
				public static fromLngLats(multiPoint: com.mapbox.geojson.MultiPoint): com.mapbox.geojson.LineString;
				public static fromLngLats(multiPoint: com.mapbox.geojson.MultiPoint, bbox: com.mapbox.geojson.BoundingBox): com.mapbox.geojson.LineString;
				public bbox(): com.mapbox.geojson.BoundingBox;
				public coordinates(): java.util.List<com.mapbox.geojson.Point>;
			}
			export module LineString {
				export class GsonTypeAdapter extends com.mapbox.geojson.BaseGeometryTypeAdapter<com.mapbox.geojson.LineString,java.util.List<com.mapbox.geojson.Point>> {
					public static class: java.lang.Class<com.mapbox.geojson.LineString.GsonTypeAdapter>;
					public read(jsonReader: com.google.gson.stream.JsonReader): com.mapbox.geojson.LineString;
					public write(jsonWriter: com.google.gson.stream.JsonWriter, object: com.mapbox.geojson.LineString): void;
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
				public read(in_: com.google.gson.stream.JsonReader): java.util.List<java.lang.Double>;
				public write(out: com.google.gson.stream.JsonWriter, value: java.util.List<java.lang.Double>): void;
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module geojson {
			export class ListOfListOfPointCoordinatesTypeAdapter extends com.mapbox.geojson.BaseCoordinatesTypeAdapter<java.util.List<java.util.List<com.mapbox.geojson.Point>>> {
				public static class: java.lang.Class<com.mapbox.geojson.ListOfListOfPointCoordinatesTypeAdapter>;
				public write(listOfPoints: com.google.gson.stream.JsonWriter, this_: java.util.List<java.util.List<com.mapbox.geojson.Point>>): void;
				public read(points: com.google.gson.stream.JsonReader): java.util.List<java.util.List<com.mapbox.geojson.Point>>;
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module geojson {
			export class ListOfPointCoordinatesTypeAdapter extends com.mapbox.geojson.BaseCoordinatesTypeAdapter<java.util.List<com.mapbox.geojson.Point>> {
				public static class: java.lang.Class<com.mapbox.geojson.ListOfPointCoordinatesTypeAdapter>;
				public write(this_: com.google.gson.stream.JsonWriter, out: java.util.List<com.mapbox.geojson.Point>): void;
				public read(this_: com.google.gson.stream.JsonReader): java.util.List<com.mapbox.geojson.Point>;
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module geojson {
			export class ListofListofListOfPointCoordinatesTypeAdapter extends com.mapbox.geojson.BaseCoordinatesTypeAdapter<java.util.List<java.util.List<java.util.List<com.mapbox.geojson.Point>>>> {
				public static class: java.lang.Class<com.mapbox.geojson.ListofListofListOfPointCoordinatesTypeAdapter>;
				public read(listOfListOfPoints: com.google.gson.stream.JsonReader): java.util.List<java.util.List<java.util.List<com.mapbox.geojson.Point>>>;
				public write(listOfPoints: com.google.gson.stream.JsonWriter, listOfListOfPoints: java.util.List<java.util.List<java.util.List<com.mapbox.geojson.Point>>>): void;
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module geojson {
			export class MultiLineString extends com.mapbox.geojson.CoordinateContainer<java.util.List<java.util.List<com.mapbox.geojson.Point>>> {
				public static class: java.lang.Class<com.mapbox.geojson.MultiLineString>;
				public lineStrings(): java.util.List<com.mapbox.geojson.LineString>;
				public static fromLineString(lineString: com.mapbox.geojson.LineString, bbox: com.mapbox.geojson.BoundingBox): com.mapbox.geojson.MultiLineString;
				public static fromLngLats(points: java.util.List<java.util.List<com.mapbox.geojson.Point>>): com.mapbox.geojson.MultiLineString;
				public toString(): string;
				public static fromJson(json: string): com.mapbox.geojson.MultiLineString;
				public static fromLineString(lineString: com.mapbox.geojson.LineString): com.mapbox.geojson.MultiLineString;
				public toJson(): string;
				public coordinates(): any;
				public static fromLngLats(points: java.util.List<java.util.List<com.mapbox.geojson.Point>>, bbox: com.mapbox.geojson.BoundingBox): com.mapbox.geojson.MultiLineString;
				public equals(this_: any): boolean;
				public static fromLineStrings(lineString: java.util.List<com.mapbox.geojson.LineString>): com.mapbox.geojson.MultiLineString;
				public hashCode(): number;
				public type(): string;
				public coordinates(): java.util.List<java.util.List<com.mapbox.geojson.Point>>;
				public static fromLineStrings(lineString: java.util.List<com.mapbox.geojson.LineString>, lineStrings: com.mapbox.geojson.BoundingBox): com.mapbox.geojson.MultiLineString;
				public static typeAdapter(gson: com.google.gson.Gson): com.google.gson.TypeAdapter<com.mapbox.geojson.MultiLineString>;
				public bbox(): com.mapbox.geojson.BoundingBox;
			}
			export module MultiLineString {
				export class GsonTypeAdapter extends com.mapbox.geojson.BaseGeometryTypeAdapter<com.mapbox.geojson.MultiLineString,java.util.List<java.util.List<com.mapbox.geojson.Point>>> {
					public static class: java.lang.Class<com.mapbox.geojson.MultiLineString.GsonTypeAdapter>;
					public read(jsonReader: com.google.gson.stream.JsonReader): com.mapbox.geojson.MultiLineString;
					public write(jsonWriter: com.google.gson.stream.JsonWriter, object: com.mapbox.geojson.MultiLineString): void;
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module geojson {
			export class MultiPoint extends com.mapbox.geojson.CoordinateContainer<java.util.List<com.mapbox.geojson.Point>> {
				public static class: java.lang.Class<com.mapbox.geojson.MultiPoint>;
				public static fromLngLats(points: java.util.List<com.mapbox.geojson.Point>, bbox: com.mapbox.geojson.BoundingBox): com.mapbox.geojson.MultiPoint;
				public equals(this_: any): boolean;
				public static fromLngLats(points: java.util.List<com.mapbox.geojson.Point>): com.mapbox.geojson.MultiPoint;
				public hashCode(): number;
				public type(): string;
				public static fromJson(json: string): com.mapbox.geojson.MultiPoint;
				public static typeAdapter(gson: com.google.gson.Gson): com.google.gson.TypeAdapter<com.mapbox.geojson.MultiPoint>;
				public toString(): string;
				public toJson(): string;
				public coordinates(): any;
				public bbox(): com.mapbox.geojson.BoundingBox;
				public coordinates(): java.util.List<com.mapbox.geojson.Point>;
			}
			export module MultiPoint {
				export class GsonTypeAdapter extends com.mapbox.geojson.BaseGeometryTypeAdapter<com.mapbox.geojson.MultiPoint,java.util.List<com.mapbox.geojson.Point>> {
					public static class: java.lang.Class<com.mapbox.geojson.MultiPoint.GsonTypeAdapter>;
					public read(jsonReader: com.google.gson.stream.JsonReader): com.mapbox.geojson.MultiPoint;
					public write(jsonWriter: com.google.gson.stream.JsonWriter, object: com.mapbox.geojson.MultiPoint): void;
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module geojson {
			export class MultiPolygon extends com.mapbox.geojson.CoordinateContainer<java.util.List<java.util.List<java.util.List<com.mapbox.geojson.Point>>>> {
				public static class: java.lang.Class<com.mapbox.geojson.MultiPolygon>;
				public coordinates(): java.util.List<java.util.List<java.util.List<com.mapbox.geojson.Point>>>;
				public static typeAdapter(gson: com.google.gson.Gson): com.google.gson.TypeAdapter<com.mapbox.geojson.MultiPolygon>;
				public static fromLngLats(points: java.util.List<java.util.List<java.util.List<com.mapbox.geojson.Point>>>, bbox: com.mapbox.geojson.BoundingBox): com.mapbox.geojson.MultiPolygon;
				public toString(): string;
				public toJson(): string;
				public coordinates(): any;
				public static fromJson(json: string): com.mapbox.geojson.MultiPolygon;
				public static fromPolygon(polygon: com.mapbox.geojson.Polygon): com.mapbox.geojson.MultiPolygon;
				public equals(this_: any): boolean;
				public hashCode(): number;
				public static fromPolygon(polygon: com.mapbox.geojson.Polygon, bbox: com.mapbox.geojson.BoundingBox): com.mapbox.geojson.MultiPolygon;
				public polygons(): java.util.List<com.mapbox.geojson.Polygon>;
				public type(): string;
				public static fromPolygons(polygon: java.util.List<com.mapbox.geojson.Polygon>): com.mapbox.geojson.MultiPolygon;
				public static fromLngLats(points: java.util.List<java.util.List<java.util.List<com.mapbox.geojson.Point>>>): com.mapbox.geojson.MultiPolygon;
				public bbox(): com.mapbox.geojson.BoundingBox;
				public static fromPolygons(polygon: java.util.List<com.mapbox.geojson.Polygon>, polygons: com.mapbox.geojson.BoundingBox): com.mapbox.geojson.MultiPolygon;
			}
			export module MultiPolygon {
				export class GsonTypeAdapter extends com.mapbox.geojson.BaseGeometryTypeAdapter<com.mapbox.geojson.MultiPolygon,java.util.List<java.util.List<java.util.List<com.mapbox.geojson.Point>>>> {
					public static class: java.lang.Class<com.mapbox.geojson.MultiPolygon.GsonTypeAdapter>;
					public read(jsonReader: com.google.gson.stream.JsonReader): com.mapbox.geojson.MultiPolygon;
					public write(jsonWriter: com.google.gson.stream.JsonWriter, object: com.mapbox.geojson.MultiPolygon): void;
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module geojson {
			export class Point extends com.mapbox.geojson.CoordinateContainer<java.util.List<java.lang.Double>> {
				public static class: java.lang.Class<com.mapbox.geojson.Point>;
				public hasAltitude(): boolean;
				public static fromJson(json: string): com.mapbox.geojson.Point;
				public static fromLngLat(longitude: number, latitude: number, altitude: number): com.mapbox.geojson.Point;
				public altitude(): number;
				public coordinates(): java.util.List<java.lang.Double>;
				public longitude(): number;
				public toString(): string;
				public toJson(): string;
				public coordinates(): any;
				public latitude(): number;
				public static fromLngLat(longitude: number, latitude: number): com.mapbox.geojson.Point;
				public equals(this_: any): boolean;
				public hashCode(): number;
				public static fromLngLat(longitude: number, latitude: number, bbox: com.mapbox.geojson.BoundingBox): com.mapbox.geojson.Point;
				public static fromLngLat(longitude: number, latitude: number, altitude: number, bbox: com.mapbox.geojson.BoundingBox): com.mapbox.geojson.Point;
				public type(): string;
				public static typeAdapter(gson: com.google.gson.Gson): com.google.gson.TypeAdapter<com.mapbox.geojson.Point>;
				public bbox(): com.mapbox.geojson.BoundingBox;
			}
			export module Point {
				export class GsonTypeAdapter extends com.mapbox.geojson.BaseGeometryTypeAdapter<com.mapbox.geojson.Point,java.util.List<java.lang.Double>> {
					public static class: java.lang.Class<com.mapbox.geojson.Point.GsonTypeAdapter>;
					public write(jsonWriter: com.google.gson.stream.JsonWriter, object: com.mapbox.geojson.Point): void;
					public read(jsonReader: com.google.gson.stream.JsonReader): com.mapbox.geojson.Point;
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module geojson {
			export class PointAsCoordinatesTypeAdapter extends com.mapbox.geojson.BaseCoordinatesTypeAdapter<com.mapbox.geojson.Point> {
				public static class: java.lang.Class<com.mapbox.geojson.PointAsCoordinatesTypeAdapter>;
				public write(out: com.google.gson.stream.JsonWriter, value: com.mapbox.geojson.Point): void;
				public read(in_: com.google.gson.stream.JsonReader): com.mapbox.geojson.Point;
				public constructor();
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module geojson {
			export class Polygon extends com.mapbox.geojson.CoordinateContainer<java.util.List<java.util.List<com.mapbox.geojson.Point>>> {
				public static class: java.lang.Class<com.mapbox.geojson.Polygon>;
				public static fromOuterInner(lineString: com.mapbox.geojson.LineString, outer: com.mapbox.geojson.BoundingBox, bbox: androidNative.Array<com.mapbox.geojson.LineString>): com.mapbox.geojson.Polygon;
				public static fromJson(json: string): com.mapbox.geojson.Polygon;
				public static fromOuterInner(lineString: com.mapbox.geojson.LineString, outer: java.util.List<com.mapbox.geojson.LineString>): com.mapbox.geojson.Polygon;
				public static typeAdapter(gson: com.google.gson.Gson): com.google.gson.TypeAdapter<com.mapbox.geojson.Polygon>;
				public toString(): string;
				public toJson(): string;
				public coordinates(): any;
				public outer(): com.mapbox.geojson.LineString;
				public inner(): java.util.List<com.mapbox.geojson.LineString>;
				public equals(this_: any): boolean;
				public hashCode(): number;
				public static fromLngLats(coordinates: java.util.List<java.util.List<com.mapbox.geojson.Point>>, bbox: com.mapbox.geojson.BoundingBox): com.mapbox.geojson.Polygon;
				public static fromOuterInner(lineString: com.mapbox.geojson.LineString, outer: androidNative.Array<com.mapbox.geojson.LineString>): com.mapbox.geojson.Polygon;
				public type(): string;
				public static fromOuterInner(lineString: com.mapbox.geojson.LineString, outer: com.mapbox.geojson.BoundingBox, bbox: java.util.List<com.mapbox.geojson.LineString>): com.mapbox.geojson.Polygon;
				public coordinates(): java.util.List<java.util.List<com.mapbox.geojson.Point>>;
				public static fromLngLats(coordinates: java.util.List<java.util.List<com.mapbox.geojson.Point>>): com.mapbox.geojson.Polygon;
				public bbox(): com.mapbox.geojson.BoundingBox;
			}
			export module Polygon {
				export class GsonTypeAdapter extends com.mapbox.geojson.BaseGeometryTypeAdapter<com.mapbox.geojson.Polygon,java.util.List<java.util.List<com.mapbox.geojson.Point>>> {
					public static class: java.lang.Class<com.mapbox.geojson.Polygon.GsonTypeAdapter>;
					public read(jsonReader: com.google.gson.stream.JsonReader): com.mapbox.geojson.Polygon;
					public write(jsonWriter: com.google.gson.stream.JsonWriter, object: com.mapbox.geojson.Polygon): void;
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module geojson {
			export module constants {
				export class GeoJsonConstants {
					public static class: java.lang.Class<com.mapbox.geojson.constants.GeoJsonConstants>;
					public static MIN_LONGITUDE: number = -180.0;
					public static MAX_LONGITUDE: number = 180.0;
					public static MIN_LATITUDE: number = -90.0;
					public static MAX_LATITUDE: number = 90.0;
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module geojson {
			export module exception {
				export class GeoJsonException {
					public static class: java.lang.Class<com.mapbox.geojson.exception.GeoJsonException>;
					public constructor(message: string);
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module geojson {
			export module gson {
				export class BoundingBoxTypeAdapter extends com.google.gson.TypeAdapter<com.mapbox.geojson.BoundingBox> {
					public static class: java.lang.Class<com.mapbox.geojson.gson.BoundingBoxTypeAdapter>;
					public read(in_: com.google.gson.stream.JsonReader): com.mapbox.geojson.BoundingBox;
					public constructor();
					public write(out: com.google.gson.stream.JsonWriter, value: com.mapbox.geojson.BoundingBox): void;
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module geojson {
			export module gson {
				export abstract class GeoJsonAdapterFactory {
					public static class: java.lang.Class<com.mapbox.geojson.gson.GeoJsonAdapterFactory>;
					public static create(): com.google.gson.TypeAdapterFactory;
					public constructor();
				}
				export module GeoJsonAdapterFactory {
					export class GeoJsonAdapterFactoryIml extends com.mapbox.geojson.gson.GeoJsonAdapterFactory {
						public static class: java.lang.Class<com.mapbox.geojson.gson.GeoJsonAdapterFactory.GeoJsonAdapterFactoryIml>;
						public constructor();
						public create(gson: com.google.gson.Gson, type: com.google.gson.reflect.TypeToken): com.google.gson.TypeAdapter;
						public static create(): com.google.gson.TypeAdapterFactory;
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
				export class GeometryGeoJson {
					public static class: java.lang.Class<com.mapbox.geojson.gson.GeometryGeoJson>;
					public constructor();
					public static fromJson(json: string): com.mapbox.geojson.Geometry;
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
					export class RuntimeTypeAdapterFactory<T>  extends com.google.gson.TypeAdapterFactory {
						public static class: java.lang.Class<com.mapbox.geojson.internal.typeadapters.RuntimeTypeAdapterFactory<any>>;
						public static of(baseType: java.lang.Class<any>, typeFieldName: string): com.mapbox.geojson.internal.typeadapters.RuntimeTypeAdapterFactory<any>;
						public static of(baseType: java.lang.Class<any>): com.mapbox.geojson.internal.typeadapters.RuntimeTypeAdapterFactory<any>;
						public create(entry: com.google.gson.Gson, this_: com.google.gson.reflect.TypeToken): com.google.gson.TypeAdapter;
						public registerSubtype(type: java.lang.Class<any>): com.mapbox.geojson.internal.typeadapters.RuntimeTypeAdapterFactory<any>;
						public registerSubtype(type: java.lang.Class<any>, label: string): com.mapbox.geojson.internal.typeadapters.RuntimeTypeAdapterFactory<any>;
						public static of(baseType: java.lang.Class<any>, typeFieldName: string, maintainType: boolean): com.mapbox.geojson.internal.typeadapters.RuntimeTypeAdapterFactory<any>;
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
				export class CoordinateShifter {
					public static class: java.lang.Class<com.mapbox.geojson.shifter.CoordinateShifter>;
					/**
					 * Constructs a new instance of the com.mapbox.geojson.shifter.CoordinateShifter interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
					 */
					public constructor(implementation: {
						shiftLonLat(param0: number, param1: number): java.util.List<java.lang.Double>;
						shiftLonLatAlt(param0: number, param1: number, param2: number): java.util.List<java.lang.Double>;
						unshiftPoint(param0: com.mapbox.geojson.Point): java.util.List<java.lang.Double>;
						unshiftPoint(param0: java.util.List<java.lang.Double>): java.util.List<java.lang.Double>;
					});
					public constructor();
					public shiftLonLatAlt(param0: number, param1: number, param2: number): java.util.List<java.lang.Double>;
					public unshiftPoint(param0: com.mapbox.geojson.Point): java.util.List<java.lang.Double>;
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
				export class CoordinateShifterManager {
					public static class: java.lang.Class<com.mapbox.geojson.shifter.CoordinateShifterManager>;
					public static setCoordinateShifter(coordinateShifter: com.mapbox.geojson.shifter.CoordinateShifter): void;
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
				export class GeoJsonUtils {
					public static class: java.lang.Class<com.mapbox.geojson.utils.GeoJsonUtils>;
					public constructor();
					public static trim(value: number): number;
				}
			}
		}
	}
}

declare module com {
	export module mapbox {
		export module geojson {
			export module utils {
				export class PolylineUtils {
					public static class: java.lang.Class<com.mapbox.geojson.utils.PolylineUtils>;
					/** @deprecated */
					public static simplify(points: java.util.List<com.mapbox.geojson.Point>, tolerance: number): java.util.List<com.mapbox.geojson.Point>;
					/** @deprecated */
					public static simplify(points: java.util.List<com.mapbox.geojson.Point>, highestQuality: boolean): java.util.List<com.mapbox.geojson.Point>;
					public static encode(lat: java.util.List<com.mapbox.geojson.Point>, lng: number): string;
					/** @deprecated */
					public static simplify(points: java.util.List<com.mapbox.geojson.Point>, tolerance: number, highestQuality: boolean): java.util.List<com.mapbox.geojson.Point>;
					/** @deprecated */
					public static simplify(points: java.util.List<com.mapbox.geojson.Point>): java.util.List<com.mapbox.geojson.Point>;
					public static decode(result: string, shift: number): java.util.List<com.mapbox.geojson.Point>;
				}
			}
		}
	}
}

//Generics information:
//com.mapbox.geojson.BaseCoordinatesTypeAdapter:1
//com.mapbox.geojson.BaseGeometryTypeAdapter:2
//com.mapbox.geojson.CoordinateContainer:1
//com.mapbox.geojson.internal.typeadapters.RuntimeTypeAdapterFactory:1

