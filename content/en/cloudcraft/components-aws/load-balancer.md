---
title: "Load Balancer Component"
---
## Overview

Use the Load Balancer component to represent application and network load balancers from your Amazon Web Services architecture.

{{< img src="cloudcraft/components-aws/load-balancer/component-load-balancer-diagram.png" alt="Screenshot of an isometric Cloudcraft diagram showing the 'Load balancer' AWS component." responsive="true" style="width:60%;">}}

## Toolbar

Use the toolbar to configure and customize the component. The following options are available:

- **Color**: Select a predefined color or enter the hexadecimal value of the color for the component and its accent. The component can use the same color for both the 2D and 3D view, or different colors for each.
- **Type**: Select the elastic load balancer type, classic, application, or network.
- **Data processed**: The total volume of data processed per hour, in gigabytes. Only available for type `classic`.
- **LCUs**: The number of load balancer capacity units. Only available for application and network types of load balancers.

## API

Use the [Cloudcraft API][1] to programmatically access and render your architecture diagrams as JSON objects.

### Schema

The following is an example JSON of a Load Balancer component:

```json
{
  "type": "elb",
  "id": "811ac6d8-bd6b-4d19-8504-d68d6c8381a9",
  "region": "us-east-2",
  "mapPos": [0,10],
  "elbType": "application",
  "dataGb": 10,
  "lcu": 1,
  "color": {
    "2d": "#693cc5",
    "isometric": "#ececed"
  },
  "accentColor": {
    "2d": "#ffffff",
    "isometric": "#4286c5"
  },
  "link": "blueprint://e2fd00f6-84d9-4a40-acf0-ff2ea01ae59c",
  "locked": true
}
```

- **type: elb**: The type of component.
- **id: string**: A unique identifier for the component in the `uuid` format.
- **region: string**: The AWS region the load balancer is deployed in. All global regions are supported except `cn-` regions.
- **mapPos: [number, number]**: The position of the component in the blueprint, expressed as an x- and y-coordinate pair.
- **elbType: string**: Type of elastic load balancer. Accepts `classic`, `application`, or `network` as values.
- **dataGb: number**: The volume of data processed per hour by the load balancer, in gigabytes. Only applicable to load balancers of type `classic`.
- **lcu: number**: The number of load balancer capacity units. Only applicable to application or network types of load balancers.
- **color: object**: The fill color for the component body.
  - **isometric: string**: The fill color for the component in the 3D view. Must be a hexadecimal color.
  - **2d: string**: The fill color for the component in the 2D view. Must be a hexadecimal color.
- **accentColor: obect**: The accent color used to display the component logo on top of the block.
  - **isometric: string**: The accent color for the component in the 3D view. Must be a hexadecimal color.
  - **2d: string**: The accent color for the component in the 2D view. Must be a hexadecimal color.
- **link: uri**: Link the component to another diagram using the `blueprint://ID` format or to an external website using the `https://LINK` format.
- **locked: boolean**: If `true`, changes made to the component using the application are disabled until unlocked.

[1]: https://developers.cloudcraft.co/
