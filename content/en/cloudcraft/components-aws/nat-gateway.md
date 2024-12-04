---
title: "NAT Gateway Component"
---
## Overview

Use the NAT Gateway component to represent network address translation (NAT) gateways from your Amazon Web Services architecture.

{{< img src="cloudcraft/components-aws/nat-gateway/component-nat-gateway-diagram.png" alt="Screenshot of an isometric Cloudcraft diagram showing the 'NAT gateway' AWS component." responsive="true" style="width:60%;">}}

## Toolbar

Use the toolbar to configure and customize the component. The following options are available:

- **Color**: Select a predefined color or enter the hexadecimal value of the color for the component and its accent. The component can use the same color for both the 2D and 3D view, or different colors for each.
- **Data processed**: The total volume of data processed per month in gigabytes.
- **Rotate**: Rotate the component and change its direction.

## API

Use the [Cloudcraft API][1] to programmatically access and render your architecture diagrams as JSON objects.

### Schema

The following is an example JSON of a NAT gateway component:

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

- **type: natgateway**: The type of component.
- **id: string**: A unique identifier for the component in the `uuid` format.
- **region: string**: The AWS region the gateway is deployed in. All global regions are supported except `cn-` regions.
- **mapPos: [number, number]**: The position of the component in the blueprint, expressed as an x- and y-coordinate pair.
- **dataGb: number**: The volume of data processed per month by the gateway, in gigabytes.
- **color: object**: The fill color for the component body.
  - **isometric: string**: The fill color for the component in the 3D view. Must be a hexadecimal color.
  - **2d: string**: The fill color for the component in the 2D view. Must be a hexadecimal color.
- **accentColor: obect**: The accent color used to display the component logo on the block.
  - **isometric: string**: The accent color for the component in the 3D view. Must be a hexadecimal color.
  - **2d: string**: The accent color for the component in the 2D view. Must be a hexadecimal color.
- **direction: string**: The rotation or direction of the component. Accepts `down` or `right`. Default is `down`.
- **link: uri**: Link the component to another diagram using the `blueprint://ID` format or to an external website using the `https://LINK` format.
- **locked: boolean**: If `true`, changes made to the component using the application are disabled until unlocked.

The NAT gateway component can be added to [VPCs][2] and [subnets][3].

[1]: https://developers.cloudcraft.co/
[2]: /cloudcraft/components-aws/vpc/
[3]: /cloudcraft/components-aws/subnet/
