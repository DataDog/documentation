---
title: "Area Component"
---
## Overview

The Area component is one of the best components available to design and organize large diagrams. Along with the Text label component, it can be used to visually represent subnet and IP addresses, separate public and private cloud architectures, among others uses.

{{< img src="cloudcraft/components-common/area/component-area.png" alt="Screenshot of a 3D representation of the area component in Cloudcraft" responsive="true" style="width:60%;">}}

## Toolbar

Use the toolbar to configure and customize the component. The following options are available:

- **Fill color**: Select a predefined color to fill the center of the area component, or enter the hexadecimal value for the color. Accepts the same color for both 2D and 3D view, or different colors for each.
- **Raise**: Raise the area component above other areas.
- **Lower**: Lower the area component below other areas.
- **Edge color**: Select a predefined color to fill the edges of the area component, or enter the hexadecimal value for the color. Accepts the same color for both 2D and 3D view, or different colors for each.
- **Add shadow**: Add or remove shadow from the edges to increase contrast.

## API

Use [the Cloudcraft API][1] to programmatically access and render your architecture diagrams as JSON objects. The following is an example JSON object of a Area component:

```json
{
  "type": "area",
  "id": "09659366-c3b1-479f-9b4d-37c5753e1674",
  "mapPos": [2, 9],
  "points": [
    [0, 0],
    [4, 0],
    [4, 3],
    [0, 3]
  ],
  "shadow": true,
  "color": {
    "2d": "#e6e7e8",
    "isometric": "#e6e7e8"
  },
  "borderColor": {
    "2d": "#ffffff",
    "isometric": "#ffffff"
  },
  "link": "blueprint://6f6b20d9-1332-4141-bb74-0e3af3f61801",
  "locked": true
}
```

- **type: area**: The type of component.
- **id: string**: A unique identifier for the component in the `uuid` format.
- **mapPos: [number, number]**: The position of the component in the blueprint, expressed as a x,y coordinate pair.
- **shadow: boolean**: If true, add a shadow to the edge of the area to increase contrast. Defaults to false.
- **points: [number, number]**: The position of the points used to create the edges of the area.
- **color: object**: The fill color for the component body.
  - **isometric: string**: Fill color for the component in 3D view. Must be an hexadecimal color.
  - **2d: string**: Fill color for the component in 2D view. Must be an hexadecimal color.
- **borderColor: object**: The color for the edge of the area.
  - **isometric: string**: Edge color for the area in 3D view. Must be an hexadecimal color.
  - **2d: string**: Edge color for the area in 2D view. Must be an hexadecimal color.
- **link: uri**: Link component to another diagram in the `blueprint://ID` format or to external website in the `https://LINK` format.
- **locked: boolean**: If true, changes to the component through the application are disabled until unlocked.

[1]: https://developers.cloudcraft.co/
