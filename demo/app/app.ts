import * as application from '@nativescript/core/application';
import { Trace } from '@nativescript/core';
import { MapboxTraceCategory } from '@nativescrit-community/ui-mapbox';
console.log('MapboxTraceCategory', MapboxTraceCategory);
Trace.addCategories(MapboxTraceCategory);
Trace.enable();
application.run({ moduleName: 'main-page' });
