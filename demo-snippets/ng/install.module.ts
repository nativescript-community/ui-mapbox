import { NO_ERRORS_SCHEMA, NgModule } from '@angular/core';

import { registerElement } from '@nativescript/angular';
import { MAPBOX_API_KEY } from './common';
registerElement('Mapbox', () => require('@nativescript-community/ui-mapbox').MapboxView);

import { BasicMapComponent } from './basic-map/basic-map.component';
import { GeoJSONURLComponent } from './geojson-url/geojson-url.component';

export const COMPONENTS = [BasicMapComponent, GeoJSONURLComponent];
@NgModule({
    imports: [],
    exports: [],
    schemas: [NO_ERRORS_SCHEMA],
    providers: [
        {
            provide: MAPBOX_API_KEY,
            useValue: "YOUR_ACCESS_TOKEN",
        },
    ]
})

export class InstallModule {}

export function installPlugin() {}

export const demos = [
    { name: 'Basic Map', path: 'basic-map', component: BasicMapComponent },
    { name: 'GeoJSON URL', path: 'geojson-url', component: GeoJSONURLComponent }
];
