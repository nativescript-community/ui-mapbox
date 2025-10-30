import { MapboxDemo3Component } from './mapbox-demo3.component';
import { NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { NativeScriptCommonModule, NativeScriptRouterModule } from '@nativescript/angular';
import { Routes } from '@angular/router';

import { MapboxHeaderComponent } from '../mapbox-header/mapbox-header.component';
import { MAPBOX_ACCESS_TOKEN } from '../mapbox-token';
import { MapboxFooterComponent } from '../mapbox-footer/mapbox-footer.component';

const routes: Routes = [{ path: '', component: MapboxDemo3Component }];

@NgModule({
    declarations: [MapboxDemo3Component],
    imports: [NativeScriptCommonModule, NativeScriptRouterModule.forChild(routes), MapboxHeaderComponent, MapboxFooterComponent],
    exports: [NativeScriptCommonModule],
    providers: [],
    schemas: [NO_ERRORS_SCHEMA]
})
export class MapboxDemo3Module {}
