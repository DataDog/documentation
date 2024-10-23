---
title: "Icon Component"
---

## Overview

The Icon component is one of the basic available components. Along with Images** and Blocks, it can be used to represent cloud components not yet available.

{{< img src="cloudcraft/components-common/icon/component-icon.png" alt="Screenshot of a 3D representation of the icon component in Cloudcraft" responsive="true" style="width:60%;">}}

## Toolbar

Use the toolbar to configure and customize the component. The following options are available:

- **Color**: Select a predefined background and icon color or enter the hexadecimal value for the color. Accepts the same color for both 2D and 3D view, or different colors for each.
- **Icon set**: Select the set of icons containing the icon needed. Available sets are AWS, AWS (Legacy), Azure, and Font Awesome.
- **Icon name**: Name of the icon used in the diagram. The field can be used to search for available icons as well.
- **Toggle 3D/2D projection**: Display the icon in a 3D or 2D view when the diagram itself is in 3D view. Not available for 2D diagrams.
- **Toggle flat/standing projection**: Display the label flat or standing. Not available when 2D projection is toggled or on 2D diagrams.
- **Size**: Increase or decrease the size of an icon.
- **Rotate item**: Rotate an icon and change its direction.
- **Raise**: Raise the icon component above other icons.
- **Lower**: Lower the icon component below other icons.

## API

Use [the Cloudcraft API][1] to programmatically access and render your architecture diagrams as JSON objects. The following is an example JSON object of an Icon component:

```json
{
  "type": "icon",
  "id": "a65bf697-3f17-46dd-8801-d38fcc3827b6",
  "mapPos": [4.5, 13.5],
  "iconSet": "fa",
  "name": "firefox",
  "iconSize": 6,
  "isometric": true,
  "standing": false,
  "direction": "down",
  "color": {
    "2d": "#ffffff",
    "isometric": "#ffffff"
  },
  "background": {
    "2d": "#000000",
    "isometric": "#0e141f"
  },
  "link": "blueprint://5dccf526-bb9b-44ba-abec-3b5e7c8076a6",
  "locked": true
}
```

- **type: icon**. The type of component.
- **id: string**. A unique identifier for the component in the `uuid` format.
- **mapPos: [number, number]**. The position of the component in the blueprint, expressed as a x,y coordinate pair.
- **iconSet: string**. Name of the set of icons used. Accepts one of `aws, aws2, azure, fa` as value.
- **name: string**. Icon name inside the icon set. Names can be found inside the application using the component toolbar.
- **iconSize: number**. Size of the icon. Defaults to 3.
- **isometric: boolean**. If true, the icon is displayed using a 3D projection, while false displays the label in a 2D projection. Defaults to true.
- **standing: boolean**. If true, displays the icon in a standing position instead of flat. Defaults to false.
- **direction: string**. The rotation or direction of the icon. Accepts `down, up, right, left` as value, with `down` as the default.
- **color: object**. The fill color for the component body.
  - **isometric: string**. Fill color for the component in 3D view. Must be an hexadecimal color.
  - **2d: string**. Fill color for the component in 2D view. Must be an hexadecimal color.
- **background: object**. The background color for the component.
  - **isometric: string**. Background color for the icon in 3D view. Must be an hexadecimal color.
  - **2d: string**. Background color for the icon in 2D view. Must be an hexadecimal color.
- **link: uri**. Link component to another diagram in the `blueprint://ID` format or to external website in the `https://LINK` format.
- **locked: boolean**. If true, changes to the component through the application are disabled until unlocked.

[1]: https://developers.cloudcraft.co/
