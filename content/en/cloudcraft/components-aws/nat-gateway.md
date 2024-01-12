---
title: "Component: NAT gateway"
kind: guide
---

{{< img src="cloudcraft/components-aws/nat-gateway/component-nat-gateway-diagram.png" alt="Screenshot of an isometric Cloudcraft diagram showing the 'NAT gateway' AWS component." responsive="true" style="width:100%;">}}

The **NAT gateway** component is used to represent network address translation (NAT) gateways from your Amazon Web Services architecture with Cloudcraft.

## Toolbar

The toolbar is displayed when selecting a component. It allows you customize parts of your component and its visual to your liking.

- **Color**. Select a predefined color or enter the hexadecimal value of the color for the component and its accent. The component can use the same color for both 2D and 3D view, or different colors for each.
- **Data processed**. Total volume of data processed per month in gigabytes.
- **Rotate**. Rotate the component and change its direction.

## API

In [the Cloudcraft API](https://developers.cloudcraft.co/), the NAT gateway component is represented in JSON.

```json
{
  "type": "natgateway",
  "id": "8f15adc1-da34-4f6b-b69c-cdfc240f694a",
  "region": "us-east-1",
  "mapPos": [-1.5,2],
  "dataGb": 10,
  "color": {
    "isometric": "#e91e63",
    "2d": "#e91e63"
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

- **type: natgateway**. The type of component.
- **id: string**. A unique identifier for the component in the `uuid` format.
- **region: string**. The AWS region this gateway is deployed in. With the exception of `cn-` regions, all global regions are supported.
- **mapPos: [number, number]**. The position of the component in the blueprint, expressed as a x,y coordinate pair.
- **dataGb: number**. Volume of data processed per month by the gateway, in gigabytes.
- **color: object**. The fill color for the component body.
  - **isometric: string**. Fill color for the component in 3D view. Must be an hexadecimal color.
  - **2d: string**. Fill color for the component in 2D view. Must be an hexadecimal color.
- **accentColor: obect**. The accent color used to display the component logo on the block.
  - **isometric: string**. Accent color for the component in 3D view. Must be an hexadecimal color.
  - **2d: string**. Accent color for the component in 2D view. Must be an hexadecimal color.
- **direction: string**. The rotation or direction of the component. Accepts `down` or `right` as value, with `down` as the default.
- **link: uri**. Link component to another diagram in the `blueprint://ID` format or to external website in the `https://LINK` format.
- **locked: boolean**. If true, changes to the component through the application are disabled until unlocked.

The NAT gateway component can be added to [VPCs](https://help.cloudcraft.co/article/118-component-vpc) and [subnets](https://help.cloudcraft.co/article/120-component-subnet).
