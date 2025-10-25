import { Application, Color, Label, StackLayout, Utils } from '@nativescript/core';
const MARKER_PADDING_PX = 10;

export function createInfoWindowView(title, snippet) {
    const view = new StackLayout();
    view.className = 'mapbox-info-window';
    view.padding = MARKER_PADDING_PX;
    view.backgroundColor = 'white';
    view.width = 'auto'; // WRAP_CONTENT
    view.height = 'auto'; // WRAP_CONTENT
    view.borderRadius = 12;
    view['shadowColor'] = '#000';
    view['shadowOpacity'] = 0.25;
    view['shadowRadius'] = 8;

    const titleLabel = new Label();
    titleLabel.id = 'title';
    titleLabel.text = title;
    titleLabel.className = 'mapbox-info-window-title';
    titleLabel.fontSize = 16;
    titleLabel.fontWeight = 'bold';
    view.addChild(titleLabel);

    const subtitle = new Label();
    subtitle.id = 'subtitle';
    subtitle.text = snippet;
    subtitle.className = 'mapbox-info-window-snippet';
    subtitle.fontSize = 14;
    // subtitle.visibility = snippet ? 'visible' : 'collapse';
    subtitle.color = new Color('#555');
    view.addChild(subtitle);

    return view;
}
