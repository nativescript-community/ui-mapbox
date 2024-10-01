import Vue from 'nativescript-vue';
import Basic from './Basic.vue';
import { MapboxView } from '@nativescript-community/ui-mapbox';

export function installPlugin() {
    Vue.registerElement('MapboxView', () => MapboxView);
}

export const demos = [{ name: 'Basic', path: 'Basic', component: Basic }];
