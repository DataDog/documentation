---
title: "Route 53 Component"
---
## Overview

Use the Route 53 component to represent domains using the Route 53 DNS service from your Amazon Web Services architecture.

{{< img src="cloudcraft/components-aws/route-53/component-route-53-diagram.png" alt="Screenshot of an isometric Cloudcraft diagram showing the 'Route 53' AWS component." responsive="true" style="width:60%;">}}

## Toolbar

Use the toolbar to configure and customize the component. The following options are available:

- **Color**. Select a predefined color or enter the hexadecimal value of the color for the component and its accent. The component can use the same color for both the 2D and 3D view, or different colors for each.

## API

Use the [Cloudcraft API][1] to programmatically access and render your architecture diagrams as JSON objects.

### Schema

The following is an example JSON of a Route 53 component:

```json
{
  "type": "r53",
  "id": "c311184b-2d15-4d29-9a17-bb33778f04c8",
  "mapPos": [5,12],
  "accentColor": {
    "2d": "#ffffff",
    "isometric": "#4286c5"
  },
  "color": {
    "2d": "#693cc5",
    "isometric": "#ececed"
  },
  "link": "https://blog.cloudcraft.co/",
  "locked": true
}
```

- **type: r53**: The type of component.
- **id: string**: A unique identifier for the component in the `uuid` format.
- **mapPos: [number, number]**: The position of the component in the blueprint, expressed as an x- and y-coordinate pair.
- **accentColor: object**: The accent color used to display the component logo on top of the block.
  - **isometric: string**: The accent color for the component in the 3D view. Must be a hexadecimal color.
  - **2d: string**: The accent color for the component in the 2D view. Must be a hexadecimal color.
- **color: object**: The fill color for the component body.
  - **isometric: string**: The fill color for the component in the 3D view. Must be a hexadecimal color.
  - **2d: string**: The fill color for the component in the 2D view. Must be a hexadecimal color.
- **link: uri**: Link the component to another diagram using the `blueprint://id` format or to an external website using the `https://link` format.
- **locked: boolean**: If `true`, changes made to the component using the application are disabled until unlocked.

[1]: https://developers.cloudcraft.co/
