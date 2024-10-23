---
title: "Availability Zone Component"
---
## Overview

Use the Availability Zone component to represent Availability Zones from your Amazon Web Services architecture.

{{< img src="cloudcraft/components-aws/availability-zone/component-availability-zone-diagram.png" alt="Screenshot of an isometric Cloudcraft diagram showing the 'Availability zone' AWS component." responsive="true" style="width:60%;">}}

## Toolbar

Use the toolbar to configure and customize your component. The following options are available:

- **Color**: Select a predefined color or enter the hexadecimal value of the color for the component. The component can use the same color for both the 2D and 3D view, or different colors for each.
- **Raise**: Raise the availability zone component above other availability zones.
- **Lower**: Lower the availability zone component below other availability zones.

## API

Use the [Cloudcraft API][1] to programmatically access and render your architecture diagrams as JSON objects.

### Schema

The following is an example JSON object of an Availability Zone component:

```json
{
  "type": "zone",
  "id": "a46cfaf2-ce78-4d44-9a41-a55fc7cd4ceb",
  "region": "us-east-2",
  "mapPos": [-6.75, 10.25],
  "mapSize": [2.5, 2.5],
  "color": {
    "2d": "#000000",
    "isometric": "#000000"
  },
  "link": "blueprint://34b7a049-e92b-4146-b937-7eee9ae788b5",
  "locked": true
}
```

- **type: zone**: The type of component.
- **id: string**: A unique identifier for the component in the `uuid` format.
- **region: string**: The AWS region the availability zone belongs to. All global regions are supported except `cn-` regions.
- **mapPos: [number, number]**. The position of the component in the blueprint, expressed as an x- and y-coordinate pair.
- **mapSize: [number, number]**. The size of the availability zone in the blueprint.
- **color: object**. The fill color for the availability zone.
  - **isometric: string**. The fill color for the component in the 3D view. Must be a hexadecimal color.
  - **2d: string**. The fill color for the component in the 2D view. Must be a hexadecimal color.
- **link: uri**. Link the component to another diagram using the `blueprint://ID` format or to an external website using the `https://LINK` format.
- **locked: boolean**. If `true`, changes made to the component using the application are disabled until unlocked.

[1]: https://developers.cloudcraft.co/
