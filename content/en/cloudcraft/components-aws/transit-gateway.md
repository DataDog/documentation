---
title: "Component: Transit gateway"
kind: guide
---

{{< img src="cloudcraft/components-aws/transit-gateway/component-transit-gateway-diagram.png" alt="Screenshot of an isometric Cloudcraft diagram showing the 'Transit gateway' AWS component." responsive="true" style="width:100%;">}}

The **Transit gateway** component is used to represent transit gateway attachments from your Amazon Web Services architecture with Cloudcraft.

## Toolbar

The toolbar is displayed when selecting a component. It allows you to customize parts of your component and its visual to your liking.

- **Color**. Select a predefined color or enter the hexadecimal value of the color for the component and its accent. The component can use the same color for both 2D and 3D view, or different colors for each.
- **Connections**. Number of attachments connected to the transit gateway.
- **Data processed**. Total volume of data processed per month in gigabytes.
- **Rotate**. Rotate the component and change its direction.

## API

In [the Cloudcraft API](https://developers.cloudcraft.co/), the transit gateway component is represented in JSON.

```json
{
  "type": "transitgateway",
  "id": "72a56c65-c453-41c4-85d5-e6bda4b03275",
  "region": "us-east-1",
  "mapPos": [-0.5,14],
  "connections": 2,
  "dataGb": "10",
  "color": {
    "isometric": "#000000",
    "2d": "#000000"
  },
  "accentColor": {
    "isometric": "#ffffff",
    "2d": "#ffffff"
  },
  "direction": "down",
  "link":"blueprint://1127e451-7e09-44bd-9dac-12eef90775c6",
  "locked":true
}
```

- **type: transitgateway**. The type of component.
- **id: string**. A unique identifier for the component in the `uuid` format.
- **region: string**. The AWS region this gateway is deployed in. With the exception of `cn-` regions, all global regions are supported.
- **mapPos: [number, number]**. The position of the component in the blueprint, expressed as a x,y coordinate pair.
- **connections: number**. Number of attachments connected to the transit gateway.
- **dataGb: number**. Volume of data processed per month by the gateway, in gigabytes.
- **color: object**. The fill color for the component body.
  - **isometric: string**. Fill color for the component in 3D view. Must be an hexadecimal color.
  - **2d: string**. Fill color for the component in 2D view. Must be an hexadecimal color.
- **accentColor: object**. The accent color used to display the component logo on the block.
  - **isometric: string**. Accent color for the component in 3D view. Must be an hexadecimal color.
  - **2d: string**. Accent color for the component in 2D view. Must be an hexadecimal color.
- **direction: string**. The rotation or direction of the component. Accepts `down` or `right` as value, with `down` as the default.
- **link: uri**. Link component to another diagram in the `blueprint://ID` format or to external website in the `https://LINK` format.
- **locked: boolean**. If true, changes to the component through the application are disabled until unlocked.
