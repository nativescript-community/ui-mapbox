<template>
    <Page>
        <GridLayout>
            <MapboxView
                accessToken="pk.eyJ1IjoiYWt5bGFzIiwiYSI6IkVJVFl2OXMifQ.TGtrEmByO3-99hA0EI44Ew"
                mapStyle="traffic_day"
                latitude="50.467735"
                longitude="13.427718"
                hideCompass="true"
                zoomLevel="18"
                showUserLocation="false"
                disableZoom="false"
                disableRotation="false"
                disableScroll="false"
                disableTilt="false"
                @mapReady="onMapReady($event)"
            >
            </MapboxView>
        </GridLayout>
    </Page>
</template>

<script lang="ts">
export default {
    data() {
        return {};
    },
    methods: {
        onMapReady(args): void {
            console.log('map is ready');
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
