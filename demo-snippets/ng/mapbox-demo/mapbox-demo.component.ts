import { Component, NO_ERRORS_SCHEMA, OnDestroy, OnInit, inject } from '@angular/core';
import { ActionBarComponent, NavigationButtonDirective, RouterExtensions, registerElement } from '@nativescript/angular';
import { LatLng, MapboxApi, MapboxTraceCategory, MapboxView, MapboxViewApi } from '@nativescript-community/ui-mapbox';
import { Trace } from '@nativescript/core';
import { MapboxHeaderComponent } from '../mapbox-header/mapbox-header.component';
import { MAPBOX_ACCESS_TOKEN } from '../mapbox-token';
import { MapboxFooterComponent } from '../mapbox-footer/mapbox-footer.component';

registerElement('Mapbox', () => require('@nativescript-community/ui-mapbox').MapboxView);

@Component({
    selector: 'app-mapbox-demo',
    templateUrl: './mapbox-demo.component.html',
    schemas: [NO_ERRORS_SCHEMA],
    imports: [ActionBarComponent, NavigationButtonDirective, MapboxHeaderComponent, MapboxFooterComponent]
})
export class MapboxDemoComponent implements OnInit, OnDestroy {
    router: RouterExtensions = inject(RouterExtensions);

    mapboxView: MapboxView | undefined;
    mapbox: MapboxApi | undefined;

    MAPBOX_ACCESS_TOKEN = MAPBOX_ACCESS_TOKEN;

    ngOnInit() {
        console.log('MapboxDemoComponent initialized');
        Trace.addCategories(MapboxTraceCategory);
        // Trace.enable()
    }

    goBack(): void {
        this.router.back();
    }

    onMapReady(args: any): void {
        console.log('map is ready: ', args.map);

        this.mapboxView = args.map;
        this.mapbox = this.mapboxView?.getMapboxApi();

        console.log('mapboxView map is ready:', this.mapboxView);
    }

    ngOnDestroy(): void {
        if (this.mapbox) {
            this.mapbox.destroy();
        }
    }
}
