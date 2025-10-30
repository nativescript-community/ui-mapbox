import { Component, OnInit } from '@angular/core';
import { RouterExtensions } from '@nativescript/angular';
import { MAPBOX_ACCESS_TOKEN } from '../mapbox-token';

@Component({
    selector: 'ns-basic-map',
    templateUrl: './basic-map.component.html'
})
export class BasicMapComponent implements OnInit {
    constructor(private router: RouterExtensions) {}
    MAPBOX_ACCESS_TOKEN = MAPBOX_ACCESS_TOKEN;

    ngOnInit(): void {}

    goBack(): void {
        this.router.back();
    }

    onMapReady(args: any): void {
        console.log('map is ready');
    }
}
