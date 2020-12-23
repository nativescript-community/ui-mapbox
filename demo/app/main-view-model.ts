import { Button, Color, Observable, Page, ContentView } from '@nativescript/core';
import { setInterval, clearInterval } from '@nativescript/core/timer';
import * as platform from '@nativescript/core/platform';

import { AlertOptions, alert } from '@nativescript/core/ui/dialogs';
import { DownloadProgress, LatLng, MapStyle, Mapbox, MapboxMarker, MapboxView, OfflineRegion, Viewport } from '@nativescript-community/ui-mapbox';
import { SETTINGS } from '../../mapbox_config';
import { AmsterdamHoneyBees } from './sample-data';

const isIOS = platform.Device.os === platform.platformNames.ios;

const ACCESS_TOKEN = SETTINGS.mapbox_access_token;

// -------------------------------------------------------------------------------

export class HelloWorldModel extends Observable {
    private mapboxView: MapboxView;
    private mapbox: Mapbox;

    constructor() {
        super();
        console.log('HelloWorldModel::constructor()');
    }

    // --------------------------------------------------------------------

    /**
     * show a map programmatically
     */

    public doShow(args): void {
        console.log('HelloWorldModel::doShow(): top');

        // the idea is to get a reference to a container component,
        // in this case the StackLayout, and then to add a programmatically created
        // MapboxView as a child of that container.
        //
        // A button click got us here. From that we can get the Button object and that then
        // gives us a reference to the current page from which we can look up components by id.

        const button: Button = args.object;
        const page: Page = button.page;

        const contentView: ContentView = page.getViewById('mapContainer');

        const settings = {
            accessToken: ACCESS_TOKEN,

            // NOTE: passing in the container here.

            container: contentView,
            style: MapStyle.LIGHT,
            margins: {
                left: 18,
                right: 18,
                top: isIOS ? 390 : 454,
                bottom: isIOS ? 50 : 8,
            },
            center: {
                lat: 52.370216,
                lng: 4.895168,
            },
            zoomLevel: 9, // 0 (most of the world) to 20, default 0
            showUserLocation: false, // default false
            hideAttribution: true, // default false
            hideLogo: true, // default false
            hideCompass: false, // default false
            disableRotation: false, // default false
            disableScroll: false, // default false
            disableZoom: false, // default false
            disableTilt: false, // default false
            markers: [
                {
                    id: 1,
                    lat: 52.373216,
                    lng: 4.894168,
                    title: 'Nice location',
                    subtitle: 'Really really nice location',
                    iconPath: '~/assets/markers/green_pin_marker.png',
                    onTap: () => console.log("'Nice location' marker tapped"),
                    onCalloutTap: () => console.log("'Nice location' marker callout tapped"),
                },
            ],
        };

        console.log('main-view-model:: doShow(): creating new MapboxView.');

        const mapView = new MapboxView();

        mapView.setConfig(settings);

        // Bind some event handlers onto our newly created map view.

        mapView.on('mapReady', (args: any) => {
            console.log('main-view-model: onMapReady fired.');

            // this is an instance of class MapboxView

            this.mapboxView = args.map;

            // get a reference to the Mapbox API shim object so we can directly call its methods.

            this.mapbox = this.mapboxView.getMapboxApi();

            this.mapbox.setOnMapClickListener((point) => {
                console.log(`>> Map clicked: ${JSON.stringify(point)}`);
                return true;
            });

            this.mapbox.setOnMapLongClickListener((point) => {
                console.log(`>> Map longpressed: ${JSON.stringify(point)}`);
                return true;
            });

            this.mapbox.setOnScrollListener((point: LatLng) => {
                // console.log(`>> Map scrolled`);
            });

            this.mapbox
                .setOnFlingListener(() => {
                    console.log('>> Map flinged"');
                })
                .catch((err) => console.log(err));
        });

        console.log('main-view-model:: doShow(): adding MapboxView to container.');

        contentView.content = mapView;
    }

    // -------------------------------------------------------------------------------

    public doHide(): void {
        this.mapbox.hide().then(
            () => {
                console.log('HelloWorldModel::doHide(): Mapbox hide done');
            },
            (error: string) => {
                console.log('mapbox hide error: ' + error);
            }
        );
    }

    // -------------------------------------------------------------------------------

    public doDestroy(): void {
        this.mapbox.destroy().then(
            () => {
                console.log('HelloWorldModel::doDestroy(): Mapbox destroyed');
            },
            (error: string) => {
                console.log('mapbox destroy error: ' + error);
            }
        );
    }

    // -------------------------------------------------------------------------------

    public doUnhide(): void {
        this.mapbox.unhide().then(
            () => {
                console.log('HelloWorldModel::doUnHide(): Mapbox doUnhide done');
            },
            (error: string) => {
                console.log('mapbox doUnhide error: ' + error);
            }
        );
    }

    // -------------------------------------------------------------------------------

    public doRemoveAllMarkers(): void {
        this.mapbox.removeMarkers().then(
            () => console.log('Mapbox doRemoveAllMarkers done'),
            (error) => console.log('mapbox doRemoveAllMarkers error: ' + error)
        );
    }

    // -------------------------------------------------------------------------------

    public doRemove2Markers(): void {
        this.mapbox.removeMarkers([2, 3]).then(
            () => console.log('Mapbox doRemove2Markers done'),
            (error) => console.log('mapbox doRemove2Markers error: ' + error)
        );
    }

    // -------------------------------------------------------------------------------

    public doAddMarkers(): void {
        const onTap = (marker: MapboxMarker) => console.log(`Marker tapped with title: ${marker.title}`);

        const onCalloutTap = (marker: MapboxMarker) => alert(`Marker callout tapped with title: ${marker.title}`);

        const firstMarker = {
            id: 2,
            lat: 52.360216,
            lng: 4.889168,
            title: 'One-line title here', // no popup unless set
            subtitle: 'With a res://icon-40 image',
            icon: isIOS ? 'res://icon-40' : 'res://icon',
            selected: false,
            onTap,
            onCalloutTap,
        } as MapboxMarker;

        setTimeout(() => {
            firstMarker.update({
                lat: 52.362216,
                lng: 4.891168,
                title: 'One-line title here (UPDATE)',
                subtitle: 'Updated subtitle',
                selected: true,
                onTap: (marker: MapboxMarker) => console.log(`UPDATED Marker tapped with title: ${marker.title}`),
                onCalloutTap: (marker: MapboxMarker) => alert(`UPDATED Marker callout tapped with title: ${marker.title}`),
            });
        }, 8000);

        this.mapbox
            .addMarkers([
                firstMarker,
                {
                    id: 2,
                    lat: 52.360216,
                    lng: 4.889168,
                    title: 'One-line title here', // no popup unless set
                    subtitle: 'With a res://icon-40 image',
                    icon: isIOS ? 'res://icon-40' : 'res://icon',
                    selected: false,
                    onTap,
                    onCalloutTap,
                },
                {
                    // this is a marker without a popup (because no title/subtitle are set)
                    id: 3,
                    lat: 52.360216,
                    lng: 5,
                    onTap: () => console.log('Titleless marker tapped!'),
                    icon: 'https://www.emojimeaning.com/img/img-google-64/1f35e.png',
                },
                {
                    id: 4,
                    lat: 52.360216,
                    lng: 4.789168,
                    title: 'Home Marker', // no popup unless set
                    subtitle: 'And a one-liner here as well.',
                    iconPath: '~/assets/markers/home_marker.png',
                    selected: true,
                    onTap,
                    onCalloutTap,
                },
                {
                    id: 5,
                    lat: 52.4,
                    lng: 5.1,
                    title: 'This title is cut off on iOS, but multi-line on Android', // no popup unless set
                    subtitle: 'Same for this subtitle. Same for this subtitle. Same for this subtitle. Same for this subtitle. Same for this subtitle.',
                    icon: 'https://www.emojimeaning.com/img/img-google-64/1f420.png',
                    onTap: () => console.log('Marker tapped'),
                    onCalloutTap: () => console.log('Marker callout tapped'),
                },
            ])
            .then(
                () => console.log('Mapbox addMarkers done'),
                (error) => console.log('mapbox addMarkers error: ' + error)
            );
    }

    // -------------------------------------------------------------------------------

    public doGetViewport(): void {
        this.mapbox.getViewport().then(
            (result: Viewport) => {
                const alertOptions: AlertOptions = {
                    title: 'Viewport determined',
                    message: JSON.stringify(result),
                    okButtonText: 'OK',
                };
                alert(alertOptions);
            },
            (error: string) => console.log('mapbox doGetViewport error: ' + error)
        );
    }

    // -------------------------------------------------------------------------------

    public doSetViewport(): void {
        this.mapbox
            .setViewport({
                bounds: {
                    north: 52.482,
                    east: 5.1087,
                    south: 52.2581,
                    west: 4.6816,
                },
                animated: true, // default true
            })
            .then(
                () => console.log('Viewport set'),
                (error: string) => console.log('mapbox doSetViewport error: ' + error)
            );
    }

    // -------------------------------------------------------------------------------

    // Add an option to download the current viewport: https://www.mapbox.com/ios-sdk/examples/offline-pack/ (look for visibleCoordinateBounds)

    public doDownloadAmsterdam(): void {
        this.mapbox
            .downloadOfflineRegion({
                // required for Android in case no map has been shown yet
                accessToken: ACCESS_TOKEN,
                name: 'Amsterdam',
                style: MapStyle.OUTDOORS,
                minZoom: 9,
                maxZoom: 11,
                bounds: {
                    north: 52.482,
                    east: 5.1087,
                    south: 52.2581,
                    west: 4.6816,
                },
                onProgress: (progress: DownloadProgress) => {
                    console.log(`Download progress: ${JSON.stringify(progress)}`);
                },
            })
            .then(
                () => {
                    const alertOptions: AlertOptions = {
                        title: 'Offline region downloaded',
                        message: 'Done! Zoom levels 9-11 have been downloaded. The download progress was reported via console.log',
                        okButtonText: 'OK',
                    };
                    alert(alertOptions);
                },
                (error) => console.log('mapbox doDownloadAmsterdam error: ' + error)
            );

        const alertOptions: AlertOptions = {
            title: 'Be patient',
            message: 'This takes a while, progress is logged via console.log',
            okButtonText: 'Understood',
        };

        alert(alertOptions);
    }

    // -------------------------------------------------------------------------------

    public doDownloadCurrentViewportAsOfflineRegion(): void {
        this.mapbox.getViewport().then(
            (viewport: Viewport) => {
                this.mapbox
                    .downloadOfflineRegion({
                        name: 'LastViewport',
                        style: MapStyle.OUTDOORS,
                        minZoom: viewport.zoomLevel,
                        maxZoom: viewport.zoomLevel + 2,
                        bounds: viewport.bounds,
                        onProgress: (progress: DownloadProgress) => console.log(`Download progress: ${JSON.stringify(progress)}`),
                    })
                    .then(
                        () => {
                            const alertOptions: AlertOptions = {
                                title: 'Viewport downloaded',
                                message: `Downloaded viewport with bounds ${JSON.stringify(viewport.bounds)} at zoom levels ${viewport.zoomLevel} - ${viewport.zoomLevel + 2}`,
                                okButtonText: 'OK :)',
                            };
                            alert(alertOptions);
                        },
                        (error: string) => console.log('mapbox doDownloadCurrentViewportAsOfflineRegion error: ' + error)
                    );
            },
            (error: string) => {
                const alertOptions: AlertOptions = {
                    title: 'Download error',
                    message: error,
                    okButtonText: 'Got it',
                };
                alert(alertOptions);
            }
        );
    }

    public doAddAndClusterGeoJSON(): void {
        this.mapbox
            .addGeoJsonClustered({
                name: 'earthquakes',
                data: 'https://www.mapbox.com/mapbox-gl-js/assets/earthquakes.geojson',
                clusterMaxZoom: 15,
                clusterRadius: 20,
                // clusters: [
                //   {}
                // ]
            })
            .then(
                () => {
                    const alertOptions: AlertOptions = {
                        title: 'GeoJSON added',
                        message: "Moving to the USA as that's where the GeoJson data is drawn",
                        okButtonText: 'OK',
                    };
                    alert(alertOptions).then(() => {
                        this.mapbox.setViewport({
                            animated: true,
                            bounds: {
                                north: 52.9,
                                east: -62.2,
                                south: 22.1,
                                west: -128.2,
                            },
                        });
                    });
                },
                (error: string) => {
                    console.log('mapbox doAddAndClusterGeoJSON error: ' + error);
                }
            );
    }

    public async doAddLayerAndSource(): Promise<void> {
        try {
            this.mapbox
                .addLayer({
                    id: 'circle-with-source-object',
                    type: 'circle',
                    source: {
                        type: 'geojson',
                        data: {
                            type: 'FeatureCollection',
                            features: [
                                {
                                    id: '1',
                                    type: 'Feature',
                                    properties: {
                                        querySample: '1',
                                    },
                                    geometry: {
                                        type: 'Point',
                                        coordinates: [4.823684692382513, 52.3701494345567],
                                    },
                                },
                                {
                                    id: '2',
                                    type: 'Feature',
                                    properties: {
                                        querySample: '2',
                                    },
                                    geometry: {
                                        type: 'Point',
                                        coordinates: [4.823684692382513, 52.3701494345567],
                                    },
                                },
                            ],
                        },
                    },
                    paint: {
                        'circle-blur': 0.2,
                        'circle-radius': 10,
                        'circle-opacity': 0.65,
                        'circle-color': '#ed6498',
                        'circle-stroke-width': 4,
                        'circle-stroke-color': '#3b0619',
                        'circle-stroke-opacity': 0.75,
                    },
                })
                .then(() => {
                    console.log('circle-with-source-object added');
                    this.mapbox.onMapEvent('click', 'circle-with-source-object', (features) => {
                        console.log('clicked', 'circle-with-source-object', features);
                    });

                    setTimeout(() => {
                        this.mapbox
                            .queryRenderedFeatures({
                                point: {
                                    lat: 52.3701494345567,
                                    lng: 4.823684692382513,
                                },
                                layers: ['circle-with-source-object'],
                                filter: ['all', ['==', '$id', '2']],
                            })
                            .then((result) => console.log('query rendered features', JSON.stringify(result)));
                    }, 3000);
                });

            const longLineCoordinates = [
                [4.825401306152344, 52.29105258647392],
                [4.833984374999999, 52.293992398835414],
                [4.843597412109375, 52.29147257161407],
                [4.8566436767578125, 52.29105258647392],
                [4.862480163574219, 52.29084259241063],
                [4.866600036621093, 52.29630211452998],
                [4.871406555175781, 52.30302060261101],
                [4.872779846191406, 52.31057768336975],
                [4.870719909667969, 52.31645452105213],
                [4.8690032958984375, 52.32065178453125],
                [4.868316650390625, 52.327996037736995],
                [4.867973327636719, 52.3342901416433],
                [4.867973327636719, 52.342051636387865],
                [4.865913391113281, 52.34645620310868],
                [4.856300354003906, 52.3447783246691],
                [4.857673645019531, 52.348972901370985],
                [4.854240417480469, 52.35757053943562],
                [4.845657348632812, 52.35840924385213],
                [4.829521179199219, 52.35819956924031],
                [4.8113250732421875, 52.35715118125809],
                [4.810638427734375, 52.354005868078445],
                [4.791755676269531, 52.350440909192635],
                [4.785919189453125, 52.348763181988105],
                [4.77081298828125, 52.35442525610276],
                [4.775276184082031, 52.35694150067703],
                [4.7783660888671875, 52.357360860844295],
                [4.7824859619140625, 52.36176390234046],
                [4.814414978027344, 52.36910132990146],
                [4.8175048828125, 52.373083994540266],
                [4.820594787597656, 52.380629111184575],
            ];
            this.mapbox
                .addLayer({
                    id: 'line-with-source-object',
                    type: 'line',
                    source: {
                        type: 'geojson',
                        data: {
                            type: 'Feature',
                            properties: {},
                            geometry: {
                                type: 'LineString',
                                coordinates: [
                                    [4.8209381103515625, 52.28769256200232],
                                    [4.8085784912109375, 52.27572040360819]
                                ],
                            },
                        },
                    },
                    layout: {
                        'line-cap': 'round',
                        'line-join': 'round',
                        'line-blur': 0.2,
                    },
                    paint: {
                        'line-color': '#ab111b',
                        'line-width': 5,
                        'line-opacity': 0.7,
                        'line-dash-array': [1, 1, 1, 1],
                    },
                })
                .then(() => {
                    console.log('line-with-source-object added');
                    this.mapbox.onMapEvent('click', 'line-with-source-object', (features) => {
                        console.log('clicked', 'line-with-source-object', features);
                    });

                    let i = 0;
                    const intervalId = setInterval(async () => {
                        if (i < longLineCoordinates.length) {
                            const element = longLineCoordinates[i];
                            try {
                                await this.mapbox.addLinePoint('line-with-source-object', element);
                            } catch (error) {
                                console.log('error :', error);
                            }
                            i++;
                        } else {
                            i = 0;
                            clearInterval(intervalId);
                        }
                    }, 100);
                });

            this.mapbox
                .addLayer({
                    id: 'fill-with-source-object',
                    type: 'fill',
                    source: {
                        type: 'geojson',
                        data: {
                            type: 'Feature',
                            properties: {},
                            geometry: {
                                type: 'Polygon',
                                coordinates: [
                                    [
                                        [4.864797592163086, 52.346980527061895],
                                        [4.923677444458008, 52.346980527061895],
                                        [4.923677444458008, 52.36742431104005],
                                        [4.864797592163086, 52.36742431104005],
                                        [4.864797592163086, 52.346980527061895],
                                    ],
                                ],
                            },
                        },
                    },
                    paint: {
                        'fill-antialias': 'true',
                        'fill-color': '#5dbcd2',
                        'fill-opacity': 0.65,
                        'fill-outline-color': '#23474f',
                        'fill-translate': [0, 0],
                        'fill-translate-anchor': 'map',
                    },
                })
                .then(() => {
                    console.log('fill-with-source-object added');
                    this.mapbox.onMapEvent('click', 'fill-with-source-object', (features) => {
                        console.log('clicked', 'fill-with-source-object', features);
                    });
                });

            await this.mapbox.addImage('bee', 'res://bee');
            await this.mapbox.addImage('pizza', '~/assets/pizza-slice.png');

            this.mapbox
                .addLayer({
                    id: 'symbol-with-source-object',
                    type: 'symbol',
                    source: {
                        type: 'geojson',
                        data: AmsterdamHoneyBees,
                    },
                    layout: {
                        'text-field': 'Honey',
                        'icon-size': 0.2,
                        'icon-image': 'bee',
                    },
                    paint: {
                        'text-color': '#d6c80d',
                    },
                })
                .then(() => {
                    console.log('symbol-with-source-object added');
                    this.mapbox.onMapEvent('click', 'symbol-with-source-object', (features) => {
                        console.log('clicked', 'symbol-with-source-object', features);
                    });
                });

            this.mapbox
                .addLayer({
                    id: 'symbol-with-source-object2',
                    type: 'symbol',
                    source: {
                        type: 'geojson',
                        data: {
                            type: 'Feature',
                            properties: {},
                            geometry: {
                                type: 'Point',
                                coordinates: [4.8916793, 52.3690958],
                            },
                        },
                    },
                    layout: {
                        'text-field': 'New York Pizza',
                        'icon-size': 0.99,
                        'icon-image': 'pizza',
                        'icon-rotate': 180,
                    },
                    paint: {
                        'text-color': '#d6c80d',
                    },
                })
                .then(() => console.log('symbol-with-source-object2 added'));
        } catch (error) {
            console.error('Mapbox doAddLayerAndSource error :', error);
        }
    }

    public doRemoveLayerAndSource(): void {
        Promise.all([
            this.mapbox.removeLayer('circle-with-source-object').then(() => this.mapbox.offMapEvent('click', 'circle-with-source-object')),
            this.mapbox.removeLayer('line-with-source-object').then(() => this.mapbox.offMapEvent('click', 'line-with-source-object')),
            this.mapbox.removeLayer('fill-with-source-object').then(() => this.mapbox.offMapEvent('click', 'fill-with-source-object')),
            this.mapbox.removeLayer('symbol-with-source-object').then(() => this.mapbox.offMapEvent('click', 'symbol-with-source-object')),
            this.mapbox.removeLayer('symbol-with-source-object2'),
        ]).then(() => {
            return Promise.all([
                this.mapbox.removeSource('custom-collection-1'),
                this.mapbox.removeSource('line-with-source-object_source'),
                this.mapbox.removeSource('circle-with-source-object_source'),
                this.mapbox.removeSource('fill-with-source-object_source'),
                this.mapbox.removeSource('symbol-with-source-object_source'),
                this.mapbox.removeSource('symbol-with-source-object2_source'),
            ]);
        });
    }

    public doListOfflineRegions(): void {
        this.mapbox
            .listOfflineRegions({
                accessToken: ACCESS_TOKEN,
            })
            .then(
                (regions: OfflineRegion[]) => {
                    const alertOptions: AlertOptions = {
                        title: 'Offline regions',
                        message: JSON.stringify(regions),
                        okButtonText: 'Thanks',
                    };
                    alert(alertOptions);
                },
                (error: string) => {
                    const alertOptions: AlertOptions = {
                        title: 'Offline regions list error',
                        message: error,
                        okButtonText: 'Hmm',
                    };
                    alert(alertOptions);
                }
            );
    }

    public doDeleteOfflineRegion(): void {
        this.mapbox
            .deleteOfflineRegion({
                name: 'Amsterdam',
            })
            .then(
                () => {
                    const alertOptions: AlertOptions = {
                        title: 'Offline region deleted',
                        okButtonText: 'Cool',
                    };
                    alert(alertOptions);
                },
                (error: string) => {
                    const alertOptions: AlertOptions = {
                        title: 'Error deleting offline region',
                        message: error,
                        okButtonText: 'Hmmz',
                    };
                    alert(alertOptions);
                }
            );
    }

    // -------------------------------------------------------------------------------

    public doGetTilt(): void {
        this.mapbox.getTilt().then(
            (result: number) => {
                const alertOptions: AlertOptions = {
                    title: 'Tilt / pitch',
                    message: '' + result,
                    okButtonText: 'OK',
                };
                alert(alertOptions);
            },
            (error: string) => {
                console.log('mapbox getTilt error: ' + error);
            }
        );
    }

    // -------------------------------------------------------------------------------

    public doGetUserLocation(): void {
        this.mapbox.getUserLocation().then(
            (location) => {
                const alertOptions: AlertOptions = {
                    title: 'User location',
                    message: JSON.stringify(location),
                    okButtonText: 'Thanks!',
                };
                alert(alertOptions);
            },
            (error: string) => {
                console.log('mapbox getUserLocation error: ' + error);
            }
        );
    }

    // -------------------------------------------------------------------------------

    public doTrackUser(): void {
        this.mapbox
            .trackUser({
                mode: 'TRACKING_GPS',
                animated: true,
            })
            .then(() => console.log('Following User'));
    }

    // -------------------------------------------------------------------------------

    public doSetTilt(): void {
        this.mapbox
            .setTilt({
                tilt: 35,
                duration: 4000,
            })
            .then(
                () => {
                    console.log('Mapbox doSetTilt done');
                },
                (error: string) => {
                    console.log('mapbox doSetTilt error: ' + error);
                }
            );
    }

    // -------------------------------------------------------------------------------

    public doAnimateCamera(): void {
        this.mapbox
            .animateCamera({
                target: {
                    lat: 52.373216,
                    lng: 4.894168,
                },
                zoomLevel: 17, // Android
                altitude: 500, // iOS
                bearing: 270,
                tilt: 50,
                duration: 7000,
            })
            .then(
                (result) => {
                    console.log('Mapbox doAnimateCamera done');
                },
                (error: string) => {
                    console.log('mapbox doAnimateCamera error: ' + error);
                }
            );
    }

    // -------------------------------------------------------------------------------

    public doSetCenter(): void {
        this.mapbox
            .setCenter({
                lat: 52.360216,
                lng: 4.889168,
                animated: true,
            })
            .then(
                (result) => {
                    console.log('Mapbox setCenter done');
                },
                (error: string) => {
                    console.log('mapbox setCenter error: ' + error);
                }
            );
    }

    // -------------------------------------------------------------------------------

    public doGetCenter(): void {
        this.mapbox.getCenter().then(
            (result: LatLng) => {
                const alertOptions: AlertOptions = {
                    title: 'Center',
                    message: `Lat: ${result.lat}, Lng: ${result.lng}`,
                    okButtonText: 'OK',
                };
                alert(alertOptions);
            },
            (error: string) => {
                console.log('mapbox getCenter error: ' + error);
            }
        );
    }

    // -------------------------------------------------------------------------------

    public doGetZoomLevel(): void {
        this.mapbox.getZoomLevel().then(
            (result: number) => {
                const alertOptions: AlertOptions = {
                    title: 'Zoom Level',
                    message: '' + result,
                    okButtonText: 'OK',
                };
                alert(alertOptions);
            },
            (error: string) => {
                console.log('mapbox getCenter error: ' + error);
            }
        );
    }

    // -------------------------------------------------------------------------------

    public doSetZoomLevel(): void {
        this.mapbox
            .setZoomLevel({
                level: 2, // shows most of the world
                animated: true,
            })
            .then(
                (result) => {
                    console.log('Mapbox setZoomLevel done');
                },
                (error: string) => {
                    console.log('mapbox setZoomLevel error: ' + error);
                }
            );
    }

    // -------------------------------------------------------------------------------

    public doAddPolygon(): void {
        this.mapbox
            .addPolygon({
                id: 1,
                fillColor: new Color('red'),
                fillOpacity: 0.7,

                // 'stroke*' is only effective on iOS
                strokeColor: new Color('green'),
                strokeWidth: 8,
                strokeOpacity: 0.5,

                points: [
                    {
                        lat: 52.3923633970718,
                        lng: 4.902648925781249,
                    },
                    {
                        lat: 52.35421556258807,
                        lng: 4.9308013916015625,
                    },
                    {
                        lat: 52.353796172573944,
                        lng: 4.8799896240234375,
                    },
                    {
                        lat: 52.3864966440161,
                        lng: 4.8621368408203125,
                    },
                    {
                        lat: 52.3923633970718,
                        lng: 4.902648925781249,
                    },
                ],
            })
            .then((result) => console.log('Mapbox addPolygon done'))
            .catch((error: string) => console.log('mapbox addPolygon error: ' + error));
    }

    // -------------------------------------------------------------------------------

    public doAddPolyline(): void {
        this.mapbox
            .addPolyline({
                id: 1,
                color: '#30BCFF',
                width: 5,
                opacity: 0.6,
                points: [
                    {
                        lat: 52.3923633,
                        lng: 4.9026489,
                    },
                    {
                        lat: 52.3709879,
                        lng: 4.9555206,
                    },
                    {
                        lat: 52.3542155,
                        lng: 4.9308013,
                    },
                    {
                        lat: 52.3537961,
                        lng: 4.8799896,
                    },
                    {
                        lat: 52.3701494,
                        lng: 4.8360443,
                    },
                    {
                        lat: 52.3864966,
                        lng: 4.8621368,
                    },
                    {
                        lat: 52.3848202,
                        lng: 4.886856,
                    },
                ],
            })
            .then(
                (result) => {
                    console.log('Mapbox addPolyline done');
                },
                (error: string) => {
                    console.log('mapbox addPolyline error: ' + error);
                }
            );
    }

    // -------------------------------------------------------------------------------

    public doRemovePolyline(): void {
        this.mapbox.removePolylines([1]).then(
            (result) => console.log('Mapbox removePolylines done'),
            (error: string) => console.log('mapbox removePolylines error: ' + error)
        );
    }

    // -------------------------------------------------------------------------------

    public doRemovePolygon(): void {
        this.mapbox.removePolygons([1]).then(
            (result) => console.log('Mapbox removePolygons done'),
            (error: string) => console.log('mapbox removePolygons error: ' + error)
        );
    }

    // -------------------------------------------------------------------------------

    public doCheckHasFineLocationPermission(): void {
        this.mapbox.hasFineLocationPermission().then((granted: boolean) => {
            const alertOptions: AlertOptions = {
                title: 'Permission granted?',
                message: granted ? 'YES' : 'NO',
                okButtonText: 'OK',
            };
            alert(alertOptions);
        });
    }

    // -------------------------------------------------------------------------------

    public doRequestFineLocationPermission(): void {
        this.mapbox.requestFineLocationPermission().then(() => {
            console.log('Fine Location permission requested');
        });
    }

    public doGetLayers(): void {
        this.mapbox.getLayers().then((layers) => {
            layers.map((l) => console.log(l.id));

            const alertOptions: AlertOptions = {
                title: 'All map style layers',
                message: JSON.stringify(layers.map((l) => l.id)),
                okButtonText: 'OK',
            };
            alert(alertOptions);
        });

        this.mapbox.getLayer('waterway').then((waterwayLayer) => {
            if (!!waterwayLayer) {
                console.log(`getLayer("${waterwayLayer.id}") visible?: ${waterwayLayer.visibility()}`);
            }
        });
    }

    public doToggleLayers(): void {
        this.mapbox.getLayers().then((layers) => {
            const everySecondElement = layers.filter((e, i) => i % 2 === 2 - 1);
            everySecondElement.map((layer) => {
                layer.visibility() ? layer.hide() : layer.show();
            });
        });
    }

    public doAddRasterLayer(): void {
        this.mapbox
            .addLayer({
                id: 'raster-layer',
                type: 'raster',
                source: {
                    type: 'raster',
                    tiles: ['https://stamen-tiles.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.jpg'],
                    tileSize: 256,
                },
            })
            .then(() => {
                console.log('raster layer added');
            });
    }

    public doRemoveRasterLayer(): void {
        this.mapbox.removeLayer('raster-layer').then(() => {
            this.mapbox.removeSource('raster-layer_source');
            console.log('layer removed');
        });
    }
}
