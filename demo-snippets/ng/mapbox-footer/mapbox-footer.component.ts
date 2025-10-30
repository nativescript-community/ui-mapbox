import { Component, NO_ERRORS_SCHEMA, inject } from '@angular/core';
import { RouterExtensions } from '@nativescript/angular';

@Component({
    selector: 'app-mapbox-footer',
    template: ` <FlexBoxLayout row="2" android:marginBottom="40">
        <Button (tap)="goToMapbox('mapbox')">Goto Mapbox</Button>
        <Button (tap)="goToMapbox('mapbox2')">Goto Mapbox 2</Button>
        <Button (tap)="goToMapbox('mapbox3')">Goto Mapbox 3 module</Button>
    </FlexBoxLayout>`,
    schemas: [NO_ERRORS_SCHEMA]
})
export class MapboxFooterComponent {
    router: RouterExtensions = inject(RouterExtensions);

    goToMapbox(route: string) {
        this.router.navigate([route]).then((r) => {
            console.log(`Navigation to ${route} successful: `, r);
        });
    }
}
