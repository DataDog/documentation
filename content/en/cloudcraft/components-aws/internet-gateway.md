---
title: "Component: Internet gateway"
kind: guide
---

{{< img src="cloudcraft/components-aws/internet-gateway/component-internet-gateway-diagram.png" alt="Screenshot of an isometric Cloudcraft diagram showing the 'Internet gateway' AWS component." responsive="true" style="width:100%;">}}

The **Internet gateway** component is used to represent gateways to the internet in your Amazon Web Services architecture with Cloudcraft.

## Toolbar

The toolbar is displayed when selecting a component. It allows you customize parts of your component and its visual to your liking.

- **Color**. Select a predefined color or enter the hexadecimal value of the color for the component and its accent. The component can use the same color for both 2D and 3D view, or different colors for each.
- **Rotate**. Rotate the component and change its direction.

## API

In [the Cloudcraft API](https://developers.cloudcraft.co/), the internet gateway component is represented in JSON.

```json
{
  "type": "internetgateway",
  "id": "aacf299e-1336-46a3-98d7-3ef75eef8116",
  "region": "us-east-1",
  "mapPos": [-4.25,9],
  "color": {
    "isometric": "#4286c5",
    "2d": "#4286c5"
  },
  "accentColor": {
    "isometric": "#ffffff",
    "2d": "#ffffff"
  },
  "direction": "down",
  "link": "blueprint://b07827f7-2ead-4911-bb78-ddc02dc07b24",
  "locked": true
}
```

- **type: internetgateway**. The type of component.
- **id: string**. A unique identifier for the component in the `uuid` format.
- **region: string**. The AWS region this gateway is deployed in. With the exception of `cn-` regions, all global regions are supported.
- **mapPos: [number, number]**. The position of the component in the blueprint, expressed as a x,y coordinate pair.
- **color: object**. The fill color for the component body.
  - **isometric: string**. Fill color for the component in 3D view. Must be an hexadecimal color.
  - **2d: string**. Fill color for the component in 2D view. Must be an hexadecimal color.
- **accentColor: obect**. The accent color used to display the component logo on the block.
  - **isometric: string**. Accent color for the component in 3D view. Must be an hexadecimal color.
  - **2d: string**. Accent color for the component in 2D view. Must be an hexadecimal color.
- **direction: string**. The rotation or direction of the component. Accepts `down` or `right` as value, with `down` as the default.
- **link: uri**. Link component to another diagram in the `blueprint://ID` format or to external website in the `https://LINK` format.
- **locked: boolean**. If true, changes to the component through the application are disabled until unlocked.

The internet gateway component can only be added to [VPCs](https://help.cloudcraft.co/article/118-component-vpc).
