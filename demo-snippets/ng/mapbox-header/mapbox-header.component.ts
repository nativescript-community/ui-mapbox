import { ChangeDetectionStrategy, Component, Input, NO_ERRORS_SCHEMA, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { AddPolylineOptions, LatLng, MapStyle, MapboxApi, MapboxMarker } from '@nativescript-community/ui-mapbox';
import { Color } from '@nativescript/core';
import { AddPolygonOptions } from '@nativescript-community/ui-mapbox/common';

@Component({
    selector: 'app-mapbox-header',
    templateUrl: './mapbox-header.component.html',
    schemas: [NO_ERRORS_SCHEMA],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MapboxHeaderComponent implements OnDestroy, OnChanges {
    @Input({ required: true }) mapbox!: MapboxApi;
    markers: MapboxMarker[] = [];
    polygons: AddPolygonOptions[] = [];
    polylines: AddPolygonOptions[] = [];

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['mapbox'] && this.mapbox) {
            this.click();
            this.longClick();
            this.scroll();
            this.setOnMoveEndListener();
            this.setOnFlingListener();
            this.setOnCameraChangeListener();
            this.setOnCameraMoveCancelListener();
            this.setOnMapIdleListener();
        }
    }

    addMarker() {
        const latOffset = (Math.random() - 0.5) * 0.02;
        const lngOffset = (Math.random() - 0.5) * 0.02;

        const baseLat = 50.681466;
        const baseLng = 17.8687037;

        const markerID = this.markers.length + 1;
        const marker: MapboxMarker = {
            id: markerID,
            title: `Marker ${markerID}`,
            subtitle: `This is marker ${markerID}`,
            icon: 'https://developer.skycms.netk.pl/download/thumbnailCircleA/181/siec-wodna',
            selected: false,
            lat: baseLat + latOffset,
            lng: baseLng + lngOffset,
            // onTap: (marker: MapboxMarker) => console.log(`Marker ${marker.id} tapped`),
            // onCalloutTap: (marker) => console.log(`Marker ${marker.id} callout tapped`)
        };

        this.mapbox.addMarkers([marker]).then();
        console.log('Added marker:', marker.id);
        this.markers.push(marker);
        this.fitBounds();
    }

    updateMarker() {
        if (this.markers.length === 0) {
            console.warn('No markers to update. Please add a marker first.');
            return;
        }

        const markerToUpdate = this.markers[this.markers.length - 1];

        const latOffset = (Math.random() - 0.5) * 0.02;
        const lngOffset = (Math.random() - 0.5) * 0.02;

        markerToUpdate.update({
            lat: markerToUpdate.lat + latOffset,
            lng: markerToUpdate.lng + lngOffset,
            subtitle: `Updated position: (${markerToUpdate.lat.toFixed(5)}, ${markerToUpdate.lng.toFixed(5)})`
        });

        this.fitBounds();
    }

    removeMarker() {
        if (this.markers.length === 0) {
            console.warn('No markers to remove.');
            return;
        }

        const markerToRemove = this.markers.pop();
        this.mapbox.removeMarkers([markerToRemove.id]).then();
        console.log('Removing marker:', markerToRemove.id);
    }

    addPolygon() {
        const latOffset = (Math.random() - 0.5) * 0.02;
        const lngOffset = (Math.random() - 0.5) * 0.02;

        const baseLat = 50.681466;
        const baseLng = 17.8687037;

        const polygonID = this.polygons.length + 1;
        const polygon: AddPolygonOptions = {
            id: `polygon-${polygonID}`,
            fillColor: new Color('blue'),
            fillOpacity: 0.5,

            strokeColor: new Color('yellow'),
            strokeWidth: 5,
            strokeOpacity: 1,

            points: [
                {
                    lat: baseLat + latOffset,
                    lng: baseLng + lngOffset
                },
                {
                    lat: baseLat + latOffset + 0.01,
                    lng: baseLng + lngOffset + 0.01
                },
                {
                    lat: baseLat + latOffset - 0.01,
                    lng: baseLng + lngOffset + 0.01
                }
            ]
        };
        this.mapbox.addPolygon(polygon).then();
        console.log('Added polygon:', polygon.id);
        this.polygons.push(polygon);
        this.fitBounds();
    }

    removePolygon() {
        if (this.polygons.length === 0) {
            console.warn('No polygons to remove.');
            return;
        }

        const polygonToRemove = this.polygons.pop();
        console.log('Removing polygon:', polygonToRemove.id);
        this.mapbox.removePolygons([polygonToRemove.id]).then();
    }

    addPolyline() {
        const latOffset = (Math.random() - 0.5) * 0.015;
        const lngOffset = (Math.random() - 0.5) * 0.01;

        const baseLat = 50.683466;
        const baseLng = 17.8647037;

        const polylineID = this.polylines.length + 1;

        const polyline: AddPolylineOptions = {
            id: `polyline-${polylineID}`, // optional, can be used in 'removePolylines'
            color: '#336699', // Set the color of the line (default black)
            width: 7, // Set the width of the line (default 5)
            opacity: 0.6, //Transparency / alpha, ranging 0-1. Default fully opaque (1).
            points: [
                {
                    lat: baseLat + latOffset,
                    lng: baseLng + lngOffset
                },
                {
                    lat: baseLat + latOffset + 0.01,
                    lng: baseLng + lngOffset + 0.01
                },
                {
                    lat: baseLat + latOffset - 0.01,
                    lng: baseLng + lngOffset + 0.01
                }
            ]
        };

        this.mapbox.addPolyline(polyline).then();
        console.log('Added polyline:', polyline.id);
        this.polylines.push(polyline);
        this.fitBounds();
    }

    removePolyline() {
        if (this.polylines.length === 0) {
            console.warn('No polylines to remove.');
            return;
        }

        const polylineToRemove = this.polylines.pop();
        console.log('Removing polyline:', polylineToRemove.id);
        this.mapbox.removePolylines([polylineToRemove.id]).then();
    }

    getViewport() {
        this.mapbox.getViewport().then((result) => {
            console.log('Current viewport bounds:', result);
        });
    }

    getZoom() {
        this.mapbox.getZoomLevel().then((zoomLevel) => {
            console.log('Current zoom level:', zoomLevel);
        });
    }

    cameraAnimate() {
        this.mapbox.animateCamera({
            // this is where we animate to
            target: {
                lat: 50.651466,
                lng: 17.8487037
            },
            zoomLevel: 17, // Android
            altitude: 2000, // iOS (meters from the ground)
            bearing: 270, // Where the camera is pointing, 0-360 (degrees)
            tilt: 50,
            duration: 5000 // default 10000 (milliseconds)
        });
    }

    tilt() {
        this.mapbox.setTilt({
            tilt: 40, // default 30 (degrees angle)
            duration: 4000 // default 5000 (milliseconds)
        });
    }

    userTrackLocation() {
        this.mapbox.showUserLocationMarker({
            markerColor: '#ff0000',
            markerScale: 1.5,
            accuracyCircleColor: '#0000ff',
            accuracyCircleScale: 2.0
        });
        this.mapbox.getUserLocation().then(function (userLocation) {
            console.log('Current user location: ' + userLocation.location.lat + ', ' + userLocation.location.lng);
            console.log('Current user speed: ' + userLocation.speed);
        });

        this.mapbox.trackUser({
            // @ts-ignore
            cameraMode: 'FOLLOW_WITH_HEADING',
            renderMode: 'COMPASS',
            animated: true
        });
    }

    fineLocation() {
        this.mapbox.hasFineLocationPermission().then((granted) => {
            if (!granted) {
                this.mapbox.requestFineLocationPermission().then(function () {
                    console.log('Location permission requested');
                });
            }
            console.log('Has Location Permission? ' + granted);
        });
    }

    setCenter() {
        this.mapbox.setCenter({
            lat: 50.681466, // mandatory
            lng: 17.8687037, // mandatory
            animated: true // default true
        });
    }

    changeStyle() {
        // TODO: uncomment
        this.mapbox.setMapStyle(MapStyle.STREETS).then();
        // this.mapbox.setMapStyle(MapStyle.SATELLITE).then();
    }

    private fitBounds(markers: MapboxMarker[] = this.markers, polygons: AddPolygonOptions[] = this.polygons, polylines: AddPolylineOptions[] = this.polylines) {
        const allPoints: LatLng[] = [];

        // Dodaj punkty z markerów
        markers.forEach((marker) => {
            allPoints.push({ lat: marker.lat, lng: marker.lng });
        });

        // Dodaj punkty z poligonów
        polygons.forEach((polygon) => {
            allPoints.push(...polygon.points);
        });

        // Dodaj punkty z polilinii
        polylines.forEach((polyline) => {
            allPoints.push(...polyline.points);
        });

        if (allPoints.length === 0) {
            return null;
        }

        let north = allPoints[0].lat;
        let south = allPoints[0].lat;
        let east = allPoints[0].lng;
        let west = allPoints[0].lng;

        allPoints.forEach((point) => {
            if (point.lat > north) north = point.lat;
            if (point.lat < south) south = point.lat;
            if (point.lng > east) east = point.lng;
            if (point.lng < west) west = point.lng;
        });

        this.mapbox.setViewport({
            bounds: { north, east, south, west },
            padding: 500
        });
    }

    click(): void {
        this.mapbox
            .setOnMapClickListener((point) => {
                console.log(`>> Map clicked: ${JSON.stringify(point)}`);
                return true;
            })
            .then((r) => {});
    }

    longClick(): void {
        this.mapbox
            .setOnMapLongClickListener((point) => {
                console.log(`>> Map longpressed: ${JSON.stringify(point)}`);
                return true;
            })
            .then((r) => {});
    }

    scroll(): void {
        this.mapbox
            .setOnScrollListener((point: LatLng) => {
                console.log(`>> Map scrolled: `, point);
            })
            .then((r) => {});
    }

    setOnMoveEndListener(): void {
        this.mapbox
            .setOnMoveEndListener((point: LatLng) => {
                console.log(`>> Map move ended at: ${JSON.stringify(point)}`);
            })
            .then((r) => {});
    }

    setOnFlingListener(): void {
        this.mapbox
            .setOnFlingListener(() => {
                console.log(`>> Map fling detected`);
            })
            .then((r) => {});
    }

    setOnCameraChangeListener(): void {
        this.mapbox
            .setOnCameraChangeListener((reason: any, animated?: boolean) => {
                // console.log(`>> Camera changed - reason: ${reason}, animated: ${animated}`);
            })
            .then((r) => {});
    }

    setOnCameraMoveCancelListener(): void {
        this.mapbox
            .setOnCameraMoveCancelListener(() => {
                console.log(`>> Camera move cancelled`);
            })
            .then((r) => {});
    }

    setOnMapIdleListener(): void {
        this.mapbox
            .setOnMapIdleListener(() => {
                console.log(`>> Map is idle`);
            })
            .then((r) => {});
    }

    ngOnDestroy(): void {
        if (this.mapbox) {
            this.mapbox.destroy();
        }
    }
}
