import { NO_ERRORS_SCHEMA, NgModule } from '@angular/core';

import { registerElement } from '@nativescript/angular';
registerElement('Mapbox', () => require('@nativescript-community/ui-mapbox').MapboxView);

import { BasicMapComponent } from './basic-map/basic-map.component';

import { MapboxDemoComponent } from './mapbox-demo/mapbox-demo.component';
import { MapboxDemo2Component } from './mapbox-demo2/mapbox-demo2.component';
import { Trace } from '@nativescript/core';
import { MapboxTraceCategory } from '@nativescript-community/ui-mapbox';

export const COMPONENTS = [BasicMapComponent, MapboxDemoComponent, MapboxDemo2Component];
@NgModule({
    imports: [],
    exports: [],
    schemas: [NO_ERRORS_SCHEMA]
})
export class InstallModule {}

export function installPlugin() {}

export const demos = [
    { name: 'Basic Map', path: 'basic-map', component: BasicMapComponent },
    { name: 'Demo1', path: 'demo-map', component: MapboxDemoComponent },
    { name: 'Demo2', path: 'demo2-map', component: MapboxDemo2Component }
    // {
    //     path: 'mapbox3',
    //     loadChildren: () => import('./mapbox-demo3/mapbox-demo3.module').then((m) => m.MapboxDemo3Module)
    // }
];

Trace.addCategories(MapboxTraceCategory);
// Trace.addCategories(Trace.categories.Layout);
Trace.enable();
