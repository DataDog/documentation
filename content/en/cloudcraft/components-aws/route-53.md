---
title: "Component: Route 53"
kind: guide
---

{{< img src="cloudcraft/components-aws/route-53/component-route-53-diagram.png" alt="Screenshot of an isometric Cloudcraft diagram showing the 'Route 53' AWS component." responsive="true" style="width:100%;">}}

The **Route 53** component is used to represent domains using the Route 53 DNS service from Amazon Web Services with Cloudcraft.

## Toolbar

The toolbar is displayed when selecting a component. It allows you customize parts of your component and its visual to your liking.

- **Color**. Select a predefined color or enter the hexadecimal value of the color for the component and its accent. The component can use the same color for both 2D and 3D view, or different colors for each.

## API

In [the Cloudcraft API](https://developers.cloudcraft.co/), the Route 53 component is represented in JSON.

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

- **type: r53**. The type of component.
- **id: string**. A unique identifier for the component in the `uuid` format.
- **mapPos: [number, number]**. The position of the component in the blueprint, expressed as a x,y coordinate pair.
- **accentColor: object**. The accent color used to display the component logo on top of the block.
  - **isometric: string**. Accent color for the component in 3D view. Must be an hexadecimal color.
  - **2d: string**. Accent color for the component in 2D view. Must be an hexadecimal color.
- **color: object**. The fill color for the component body.
  - **isometric: string**. Fill color for the component in 3D view. Must be an hexadecimal color.
  - **2d: string**. Fill color for the component in 2D view. Must be an hexadecimal color.
- **link: uri**. Link component to another diagram in the `blueprint://id` format or to external website in the `https://link` format.
- **locked: boolean**. If true, changes to the component through the application are disabled until unlocked.
