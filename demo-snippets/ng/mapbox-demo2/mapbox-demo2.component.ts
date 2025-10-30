import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, NO_ERRORS_SCHEMA, NgZone, OnDestroy, OnInit, ViewChild, inject } from '@angular/core';
import { ActionBarComponent, NavigationButtonDirective, RouterExtensions, registerElement } from '@nativescript/angular';
import { MapStyle, MapboxApi, MapboxMarker, MapboxTraceCategory, MapboxView } from '@nativescript-community/ui-mapbox';
import { Trace } from '@nativescript/core';
import { MapboxHeaderComponent } from '../mapbox-header/mapbox-header.component';
import { MAPBOX_ACCESS_TOKEN } from '../mapbox-token';
import { MapboxFooterComponent } from '../mapbox-footer/mapbox-footer.component';

registerElement('Mapbox', () => require('@nativescript-community/ui-mapbox').MapboxView);

@Component({
    selector: 'app-mapbox-demo2',
    templateUrl: './mapbox-demo2.component.html',
    schemas: [NO_ERRORS_SCHEMA],
    imports: [ActionBarComponent, NavigationButtonDirective, MapboxHeaderComponent, MapboxFooterComponent]
})
export class MapboxDemo2Component implements OnInit, AfterViewInit, OnDestroy {
    router: RouterExtensions = inject(RouterExtensions);
    cd: ChangeDetectorRef = inject(ChangeDetectorRef);
    ngZone: NgZone = inject(NgZone);

    @ViewChild('mapContainer', { static: false }) public mapContainerRef: ElementRef;

    mapboxView: MapboxView;
    mapbox: MapboxApi;

    markers: MapboxMarker[] = [];

    ngOnInit() {
        console.log('----- MapboxDemo2Component initialized');
        Trace.addCategories(MapboxTraceCategory);
        Trace.enable();
    }

    ngAfterViewInit() {
        console.log(' mapContainerRef: ', this.mapContainerRef.nativeElement);

        const contentView = this.mapContainerRef.nativeElement;

        const settings = {
            container: contentView,
            accessToken: MAPBOX_ACCESS_TOKEN,
            style: MapStyle.TRAFFIC_DAY,
            center: {
                lat: 50.681466,
                lng: 17.8687037
            },
            zoomLevel: 12, // 0 (most of the world) to 20, default 0
            showUserLocation: false, // default false
            hideAttribution: true, // default false
            hideLogo: true, // default false
            hideCompass: false, // default false
            disableRotation: false, // default false
            disableScroll: false, // default false
            disableZoom: false, // default false
            disableTilt: false // default false
        };

        const mapView = new MapboxView();
        mapView.setConfig(settings);
        contentView.content = mapView;
        this.mapReady(mapView);
    }

    mapReady(mapView: MapboxView): void {
        mapView.on('mapReady', (args: any) => {
            this.mapboxView = args.map;
            this.mapbox = this.mapboxView.getMapboxApi();
            this.cd.detectChanges();
            console.log('mapboxView map is ready:', this.mapboxView);
        });
    }

    goBack(): void {
        this.router.back();
    }

    ngOnDestroy(): void {
        if (this.mapbox) {
            this.mapbox.destroy();
        }
    }
}
