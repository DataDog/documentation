---
title: "Component: Customer gateway"
kind: guide
---

{{< img src="cloudcraft/components-aws/customer-gateway/component-customer-gateway-diagram.png" alt="Screenshot of an isometric Cloudcraft diagram showing the 'Customer gateway' AWS component." responsive="true" style="width:100%;">}}

The **Customer gateway** component is used to represent the customer gateway device in your on-premises network with Cloudcraft.

## Toolbar

The toolbar is displayed when selecting a component. It allows you to customize parts of your component and its visual to your liking.

- **Color**. Select a predefined color or enter the hexadecimal value of the color for the component and its accent. The component can use the same color for both 2D and 3D view, or different colors for each.
- **Rotate**. Rotate the component and change its direction.
- **Connections**. View, remove, or add, VPN connections to this gateway.

## API

In [the Cloudcraft API](https://developers.cloudcraft.co/), the customer gateway component is represented in JSON.

```json
{
  "type": "customergateway",
  "id": "677145c5-aeb4-4560-8459-112bcfc21ce3",
  "region": "us-east-1",
  "mapPos": [20,10],
  "color": {
    "isometric": "#000000",
    "2d": "#000000"
  },
  "accentColor": {
    "isometric": "#ffeb3b",
    "2d": "#ffeb3b"
  },
  "direction": "down",
  "link": " blueprint://58c2aeae-d5b7-4a50-83ea-b3fa9d17d3f5",
  "locked": true
}
```

- **type: customergateway**. The type of component.
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

The customer gateway component can only be added to [VPCs](https://help.cloudcraft.co/article/118-component-vpc).
