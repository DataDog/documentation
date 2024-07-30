---
title: "VPN Gateway Component"
---
## Overview

Use the VPN Gateway component to represent site-to-site VPN connections in your Amazon Web Services architecture.

{{< img src="cloudcraft/components-aws/vpn-gateway/component-vpn-gateway-diagram.png" alt="Screenshot of an isometric Cloudcraft diagram showing the 'VPN gateway' AWS component." responsive="true" style="width:60%;">}}

## Toolbar

Use the toolbar to configure and customize the component. The following options are available:

- **Color**: Select a predefined color or enter the hexadecimal value of the color for the component and its accent. The component can use the same color for both the 2D and 3D view, or different colors for each.
- **Rotate**: Rotate the component and change its direction.
- **Connections**: View, remove, or add VPN connections to this gateway.

## API

Use the [Cloudcraft API][1] to programmatically access and render your architecture diagrams as JSON objects.

### Schema

The following is an example JSON of a VPN Gateway component:

```json
{
  "type": "vpngateway",
  "id": "1a4851fe-8357-4896-876b-f2d3040d108c",
  "region": "us-east-1",
  "mapPos": [11.5,12],
  "color": {
    "isometric": "#000000",
    "2d": "#000000"
  },
  "accentColor": {
    "isometric": "#ffeb3b",
    "2d": "#ffeb3b"
  },
  "direction": "down",
  "link":" blueprint://58c2aeae-d5b7-4a50-83ea-b3fa9d17d3f5",
  "locked": true
}
```

- **type: vpngateway**: The type of component.
- **id: string**: A unique identifier for the component in the `uuid` format.
- **region: string**: The AWS region this gateway is deployed in. All global regions are supported except `cn-` regions.
- **mapPos: [number, number]**: The position of the component in the blueprint, expressed as an x- and y-coordinate pair.
- **color: object**: The fill color for the component body.
  - **isometric: string**: The fill color for the component in the 3D view. Must be a hexadecimal color.
  - **2d: string**: The fill color for the component in the 2D view. Must be a hexadecimal color.
- **accentColor: obect**: The accent color used to display the component logo on the block.
  - **isometric: string**: The accent color for the component in the 3D view. Must be a hexadecimal color.
  - **2d: string**: The accent color for the component in the 2D view. Must be a hexadecimal color.
- **direction: string**: The rotation or direction of the component. Accepts `down` or `right`. Default is `down`.
- **link: uri**: Link the component to another diagram using the `blueprint://ID` format or to an external website using the `https://LINK` format.
- **locked: boolean**: If `true`, changes made to the component using the application are disabled until unlocked.

The VPN gateway component can only be added to [VPCs][2].

[1]: https://developers.cloudcraft.co/
[2]: /cloudcraft/components-aws/vpc/
