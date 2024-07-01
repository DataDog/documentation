---
title: "Transit Gateway Component"
---
## Overview

Use the Transit Gateway component to represent transit gateway attachments from your Amazon Web Services architecture.

{{< img src="cloudcraft/components-aws/transit-gateway/component-transit-gateway-diagram.png" alt="Screenshot of an isometric Cloudcraft diagram showing the 'Transit gateway' AWS component." responsive="true" style="width:60%;">}}

## Toolbar

Use the toolbar to configure and customize the component. The following options are available:

- **Color**: Select a predefined color or enter the hexadecimal value of the color for the component and its accent. The component can use the same color for both the 2D and 3D view, or different colors for each.
- **Connections**: The number of attachments connected to the transit gateway.
- **Data processed**: The total volume of data processed per month, in gigabytes.
- **Rotate**: Rotate the component and change its direction.

## API

Use the [Cloudcraft API][1] to programmatically access and render your architecture diagrams as JSON objects.

### Schema

The following is an example JSON of a Transit Gateway component:

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

- **type: transitgateway**: The type of component.
- **id: string**: A unique identifier for the component in the `uuid` format.
- **region: string**: The AWS region this gateway is deployed in. All global regions are supported except `cn-` regions.
- **mapPos: [number, number]**: The position of the component in the blueprint, expressed as an x- and y-coordinate pair.
- **connections: number**: The number of attachments connected to the transit gateway.
- **dataGb: number**: The volume of data processed per month by the gateway, in gigabytes.
- **color: object**: The fill color for the component body.
  - **isometric: string**: The fill color for the component in the 3D view. Must be a hexadecimal color.
  - **2d: string**: The fill color for the component in the 2D view. Must be a hexadecimal color.
- **accentColor: object**: The accent color used to display the component logo on the block.
  - **isometric: string**: The accent color for the component in the 3D view. Must be a hexadecimal color.
  - **2d: string**: The accent color for the component in the 2D view. Must be a hexadecimal color.
- **direction: string**: The rotation or direction of the component. Accepts `down` or `right`. Default is `down`.
- **link: uri**: Link the component to another diagram using the `blueprint://ID` format or to an external website using the `https://LINK` format.
- **locked: boolean**: If `true`, changes made to the component using the application are disabled until unlocked.

[1]: https://developers.cloudcraft.co/
