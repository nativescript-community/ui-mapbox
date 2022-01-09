import { NO_ERRORS_SCHEMA, NgModule } from '@angular/core';

import { registerElement } from '@nativescript/angular';
registerElement('Mapbox', () => require('@nativescript-community/ui-mapbox').MapboxView);

import { BasicMapComponent } from './basic-map/basic-map.component';

export const COMPONENTS = [BasicMapComponent];
@NgModule({
    imports: [],
    exports: [],
    schemas: [NO_ERRORS_SCHEMA]
})
export class InstallModule {}

export function installPlugin() {}

export const demos = [{ name: 'Basic Map', path: 'basic-map', component: BasicMapComponent }];
