import { Component, OnInit } from '@angular/core';
import { RouterExtensions } from '@nativescript/angular';

@Component({
    selector: 'ns-basic-map',
    templateUrl: './basic-map.component.html'
})
export class BasicMapComponent implements OnInit {
    constructor(private router: RouterExtensions) {}

    ngOnInit(): void {}

    goBack(): void {
        this.router.back();
    }

    onMapReady(args): void {
        console.log('map is ready');
    }
}
