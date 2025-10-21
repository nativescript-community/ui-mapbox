import { Trace } from '@nativescript/core';
import Vue from 'nativescript-vue';
import Basic from './Basic.vue';
import { MapboxTraceCategory, MapboxView } from '@nativescript-community/ui-mapbox';

export function installPlugin() {
    Vue.registerElement('MapboxView', () => MapboxView);
}

export const demos = [{ name: 'Basic', path: 'Basic', component: Basic }];

Trace.addCategories(MapboxTraceCategory);
Trace.enable();
