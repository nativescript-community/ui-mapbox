<template>
    <Page>
        <GridLayout rows="*,auto">
            <MapboxView
                :accessToken="accessToken"
                mapStyle="outdoors"
                latitude="50.467735"
                longitude="13.427718"
                hideCompass="true"
                zoomLevel="13"
                showUserLocation="false"
                disableZoom="false"
                disableRotation="false"
                disableScroll="false"
                disableTilt="false"
                rowSpan="2"
                @mapReady="onMapReady($event)"
            />
            <WrapLayout orientation="horizontal" row="1">
                <button text="marker" @tap="addMarker($event)" />
                <button text="updateMarker" @tap="updateMarker($event)" />
                <button text="camera" @tap="animateCamera($event)" />
                <button text="location" @tap="trackUser($event)" @longPress="stopTracking($event)" />
                <button text="source" @tap="addSource($event)" />
                <button text="polygon" @tap="addPolygon($event)" @longPress="removePolygon($event)" />
                <button text="polyline" @tap="addPolyline($event)" @longPress="removePolyline($event)" />
                <button text="offline" @tap="offlineDownload($event)" @longPress="deleteOffline($event)" />
            </WrapLayout>
        </GridLayout>
    </Page>
</template>

<script lang="ts">
import { Color } from '@nativescript/core';
import { LatLng, MapStyle, MapboxView } from '@nativescript-community/ui-mapbox';
export default {
    data() {
        return {
            map: null,
            accessToken: 'pk.eyJ1IjoiYWt5bGFzIiwiYSI6ImNtaDBhNGp4ajBhbjQ1dnM4dzIwYXh1NjcifQ.iQt8KEQ2YfulTZuA1BQp2w'
        };
    },
    methods: {
        onMapReady({ map }: { map: MapboxView }): void {
            this.map = map;
            map.onMapEvent('click', 'test', (features) => {
                console.log('on element click', features);
                map.querySourceFeatures('test', { filter: ['==', ['get', 'querySample'], '2'] })
                    .then((result) => console.log('query source features', result))
                    .catch((error) => console.error(error));
            });
            map.setOnMapLongClickListener((point: LatLng) => {
                console.log('Map longpressed at latitude: ' + point.lat + ', longitude: ' + point.lng);
                return false;
            });
            map.setOnScrollListener((point?: LatLng) => {
                console.log('Map scrolled to latitude: ' + point.lat + ', longitude: ' + point.lng);
            });
            map.setViewport({
                bounds: {
                    north: 50.427735,
                    east: 13.427718,
                    south: 50.467735,
                    west: 13.407718
                },
                animated: true
            });
        },
        addMarker(event) {
            console.log('addMarker', this.map);
            this.firstMarker = {
                id: 2,
                lat: 50.467735,
                lng: 13.427718,
                title: 'One-line title here',
                subtitle: 'Really really nice location',
                selected: true, // makes the callout show immediately when the marker is added (note: only 1 marker can be selected at a time)
                onTap: (marker) => {
                    console.log("Marker tapped with title: '" + marker.title + "'");
                },
                onCalloutTap: () => {
                    console.log("'Nice location' marker callout tapped");
                    this.map.getZoomLevel().then((zoom) => {
                        this.map.setZoomLevel({
                            level: zoom - 1, // mandatory, 0-20
                            animated: true // default true
                        });
                    });
                }
            };
            this.map.addMarkers([this.firstMarker]).catch((error) => console.error(error));
            this.map.setCenter({ ...this.firstMarker, animated: true });
        },
        updateMarker(event) {
            this.firstMarker?.update({
                lat: 50.417735,
                lng: 13.427718,
                title: 'One-line title here (UPDATE)',
                subtitle: 'Updated subtitle',
                selected: true, // this will trigger the callout upon update
                onTap: (marker) => {
                    console.log(`UPDATED Marker tapped with title: ${marker.title}`);
                    this.map
                        .getCenter()
                        .then(function (result) {
                            console.log('Mapbox getCenter done, result: ' + JSON.stringify(result));
                        })
                        .catch((error) => console.error(error, error.stack));
                },
                onCalloutTap: (marker) => {
                    this.firstMarker = null;
                    return this.map.removeMarkers([1, 2]);
                }
            });
            this.map.setCenter({ ...this.firstMarker, animated: false });
        },
        animateCamera(event) {
            this.map.getTilt().then((tilt) => {
                console.log('Current map tilt: ' + tilt);
                this.map.animateCamera({
                    // this is where we animate to
                    target: {
                        lat: 52.373216,
                        lng: 4.894168
                    },
                    zoomLevel: 17, // Android
                    altitude: 2000, // iOS (meters from the ground)
                    bearing: 270, // Where the camera is pointing, 0-360 (degrees)
                    tilt: tilt + 10,
                    duration: 5000 // default 10000 (milliseconds)
                });
            });
        },
        getUserLocation(event) {
            this.map.getUserLocation().then(function (userLocation) {
                console.log('Current user location: ' + userLocation.location.lat + ', ' + userLocation.location.lng);
                console.log('Current user speed: ' + userLocation.speed);
            });
        },
        trackUser(event) {
            this.map.trackUser({
                cameraMode: 'TRACKING',
                renderMode: 'COMPASS',
                animated: true
            });
        },
        stopTracking(event) {
            this.map.hideUserLocationMarker();
        },
        addSource(event) {
            this.map
                .addSource('test', {
                    type: 'geojson',
                    data: {
                        type: 'FeatureCollection',
                        features: [
                            {
                                type: 'Feature',
                                properties: {
                                    querySample: '1'
                                },
                                geometry: {
                                    type: 'LineString',
                                    coordinates: [
                                        [13.427718, 50.467735],
                                        [13.427718, 55.373216]
                                    ]
                                }
                            },
                            {
                                type: 'Feature',
                                properties: {
                                    querySample: '2'
                                },
                                geometry: {
                                    type: 'LineString',
                                    coordinates: [
                                        [13.427718, 50.467735],
                                        [12.427718, 50.467735]
                                    ]
                                }
                            }
                        ]
                    }
                })
                .catch((error) => console.error(error, error.stack))
                .then(() => {
                    console.log('source added')
                    this.map
                        .addLayer({
                            id: 'test',
                            type: 'line',
                            source: 'test',
                            layout: {
                                'line-cap': 'round',
                                'line-join': 'round'
                            },
                            paint: {
                                'line-color': '#ed6498',
                                'line-width': 5,
                                'line-opacity': 0.8,
                                'line-dash-array': [1, 1, 1]
                            }
                        })
                        .catch((error) => console.error(error, error.stack));
                });
        },
        addPolygon(event) {
            this.map
                .addPolygon({
                    id: 1, // optional, can be used in 'removePolygons'
                    fillColor: new Color('red'),
                    fillOpacity: 0.7,

                    // stroke-related properties are only effective on iOS
                    strokeColor: new Color('green'),
                    strokeWidth: 8,
                    strokeOpacity: 0.5,

                    points: [
                        {
                            lat: 52.3923633970718,
                            lng: 4.902648925781249
                        },
                        {
                            lat: 52.35421556258807,
                            lng: 4.9308013916015625
                        },
                        {
                            lat: 52.353796172573944,
                            lng: 4.8799896240234375
                        },
                        {
                            lat: 52.3864966440161,
                            lng: 4.8621368408203125
                        },
                        {
                            lat: 52.3923633970718,
                            lng: 4.902648925781249
                        }
                    ]
                })
                .then(() =>
                    this.map.setCenter({
                        lat: 52.383316,
                        lng: 4.899178,
                        animated: true
                    })
                )
                .then((result) => console.log('Mapbox addPolygon done'))
                .catch((error) => console.error(error, error.stack));
        },
        removePolygon(event) {
            this.map.removePolygons([1, 2]);
        },
        addPolyline(event) {
            this.map
                .addPolyline({
                    id: 1, // optional, can be used in 'removePolylines'
                    color: '#336699ff', // Set the color of the line (default black)
                    width: 7, // Set the width of the line (default 5)
                    opacity: 0.6, //Transparency / alpha, ranging 0-1. Default fully opaque (1).
                    points: [
                        {
                            lat: 52.383316,
                            lng: 4.899178
                        },
                        {
                            lat: 52.383416,
                            lng: 4.899188
                        },
                        {
                            lat: 52.383516,
                            lng: 4.79198
                        }
                    ]
                })
                .then(() => {
                    this.map.setCenter({
                        lat: 52.383316,
                        lng: 4.899178,
                        animated: true
                    });
                });
        },
        removePolyline(event) {
            this.map.removePolylines([1, 2]);
        },
        offlineDownload(event) {
            console.log('offlineDownload');
            this.map.getViewport().then((viewport) => {
                console.log('viewport for download', viewport, this.map);
                this.map
                    .downloadOfflineRegion({
                        name: 'LastViewport', // anything you like really
                        style: MapStyle.OUTDOORS,
                        minZoom: viewport.zoomLevel - 2,
                        maxZoom: viewport.zoomLevel, // higher zoom level is lower to the ground
                        bounds: viewport.bounds,
                        onProgress(progress) {
                            console.log('Download %: ' + progress.percentage);
                        }
                    })
                    .then(() => {
                        this.map
                            .listOfflineRegions({
                                // required for Android in case no map has been shown yet
                                accessToken: this.accessToken
                            })
                            .then(
                                function (regions) {
                                    console.log(JSON.stringify(regions));
                                },
                                function (error) {
                                    console.log('Error while listing offline regions: ' + error);
                                }
                            );
                    })
                    .catch((error) => console.error(error, error.stack));
            });
        },
        deleteOffline(event) {
            console.log('deleteOffline');
            this.map
                .deleteOfflineRegion({
                    name: 'LastViewport'
                })
                .then(function () {
                    console.log('Offline region deleted');
                })
                .catch((error) => console.error(error, error.stack));
        }
    }
};
</script>

<style scoped>
ActionBar {
    background-color: #53ba82;
    color: #ffffff;
}

.message {
    vertical-align: center;
    text-align: center;
    font-size: 20;
    color: #333333;
}
</style>
