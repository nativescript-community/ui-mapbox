import { Component, OnInit, Inject } from '@angular/core';
import { RouterExtensions } from '@nativescript/angular';
import { MAPBOX_API_KEY } from '../common';

@Component({
    selector: 'ns-basic-map',
    templateUrl: './basic-map.component.html'
})
export class BasicMapComponent implements OnInit {
    constructor(@Inject(MAPBOX_API_KEY) public accessToken: string, private router: RouterExtensions) {}

    ngOnInit(): void {}

    goBack(): void {
        this.router.back();
    }

    onMapReady(args): void {
        console.log('map is ready');
    }
}
