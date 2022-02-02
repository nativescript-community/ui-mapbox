import { Component, OnInit ,Inject } from '@angular/core';
import { RouterExtensions } from '@nativescript/angular';
import { MAPBOX_API_KEY } from '../common';

@Component({
    selector: 'ns-geojson-url',
    templateUrl: './geojson-url.component.html'
})
export class GeoJSONURLComponent implements OnInit {
    constructor(@Inject(MAPBOX_API_KEY) public accessToken: string, private router: RouterExtensions) {}

    ngOnInit(): void {}

    goBack(): void {
        this.router.back();
    }

    onMapReady(args): void {
        console.log('map is ready');

        const map = args.map;

        map.addSource('earthquakes', {
            type: 'geojson',
            // Use a URL for the value for the `data` property.
            data: 'https://docs.mapbox.com/mapbox-gl-js/assets/earthquakes.geojson'
        });

        map.addLayer({
            'id': 'earthquakes-layer',
            'type': 'circle',
            'source': 'earthquakes',
            'paint': {
                'circle-radius': 8,
                'circle-stroke-width': 2,
                'circle-color': 'red',
                'circle-stroke-color': 'white'
            }
        });

    }
}
