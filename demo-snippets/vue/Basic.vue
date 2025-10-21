<template>
    <Page>
        <GridLayout rows="*,auto">
            <MapboxView
                accessToken="pk.eyJ1IjoiYWt5bGFzIiwiYSI6ImNtaDBhNGp4ajBhbjQ1dnM4dzIwYXh1NjcifQ.iQt8KEQ2YfulTZuA1BQp2w"
                mapStyle="traffic_day"
                latitude="50.467735"
                longitude="13.427718"
                hideCompass="true"
                zoomLevel="13"
                showUserLocation="false"
                disableZoom="false"
                disableRotation="false"
                disableScroll="false"
                disableTilt="false"
                rowSpan="2"
                @mapReady="onMapReady($event)"
            />
            <StackLayout orientation="horizontal" row="1">
                <button text="marker" @tap="addMarker($event)" />
            </StackLayout>
        </GridLayout>
    </Page>
</template>

<script lang="ts">
import { MapboxView } from '@nativescript-community/ui-mapbox';
export default {
    data() {
        return {
            map: null
        };
    },
    methods: {
        onMapReady({ map }: { map: MapboxView }): void {
            this.map = map;
            console.log('map is ready', map);
        },
        addMarker(event) {
            console.log('addMarker', this.map);
            this.map.addMarkers([
                {
                    lat: 50.467735,
                    lng: 13.427718,
                    title: 'One-line title here',
                    subtitle: 'Really really nice location',
                    selected: true, // makes the callout show immediately when the marker is added (note: only 1 marker can be selected at a time)
                    onCalloutTap() {
                        console.log("'Nice location' marker callout tapped");
                    }
                }
            ]);
        }
    }
};
</script>

<style scoped>
ActionBar {
    background-color: #53ba82;
    color: #ffffff;
}

.message {
    vertical-align: center;
    text-align: center;
    font-size: 20;
    color: #333333;
}
</style>
