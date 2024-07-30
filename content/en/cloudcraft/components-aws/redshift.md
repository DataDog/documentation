---
title: "Redshift Component"
---
## Overview

Use the Redshift component to represent data warehouses from your Amazon Web Services architecture.

{{< img src="cloudcraft/components-aws/redshift/component-redshift-diagram.png" alt="Screenshot of an isometric Cloudcraft diagram showing the 'Redshift' AWS component." responsive="true" style="width:60%;">}}

## Toolbar

Use the toolbar to configure and customize the component. The following options are available:

- **Color**: Select a predefined color or enter the hexadecimal value of the color for the component and its accent. The component can use the same color for both the 2D and 3D view, or different colors for each.
- **Nodes**: Enter the number of nodes for the Redshift cluster.
- **Instance type**: Select the Redshift instance type. Changing the instance type changes the hardware details shown in the toolbar to reflect what is used by the hypervisor.
- **Size**: Select the size of the Redshift instance. As with instance type, the hardware details shown in the toolbar change to reflect the size.

## API

Use the [Cloudcraft API][1] to programmatically access and render your architecture diagrams as JSON objects.

### Schema

The following is an example JSON of a Redshift component:

```json
{
  "type": "redshift",
  "id": "c1aa0ae1-8e0d-466d-a8a8-51cc9b8a6b35",
  "region": "us-west-2",
  "mapPos": [1,2],
  "nodeCount": 2,
  "instanceType": "ra3",
  "instanceSize": "xlplus",
  "color": {
    "isometric": "#80b1dc",
    "2d": "#000000"
  },
  "accentColor": {
    "isometric": "#03a9f4",
    "2d": "#03a9f4"
  },
  "link": "https://aws.amazon.com/redshift/",
  "locked": true
}
```

- **type: redshift**: The type of component.
- **id: string**: A unique identifier for the component in the `uuid` format.
- **region: string**: The AWS region the Redshift instance is deployed in. All global regions are supported except `cn-` regions.
- **mapPos: [number, number]**: TThe position of the component in the blueprint, expressed as an x- and y-coordinate pair.
- **nodeCount: number**: The number of nodes for the Redshift cluster. Defaults to `1`.
- **instanceType: string**: The type of the instance. See [Accepted values for `instanceType`](#accepted-values-for-instancetype) for more information.
- **instanceSize: string**: The size of the instance. See [Accepted values for `instanceSize`](#accepted-values-for-instancesize) for more information.
- **color: object**: The fill color for the component body.
  - **isometric: string**: The fill color for the component in the 3D view. Must be a hexadecimal color.
  - **2d: string**: The fill color for the component in the 2D view. Must be a hexadecimal color.
- **accentColor: object**: The accent color used to display the component logo on the block.
  - **isometric: string**: The accent color for the component in the 3D view. Must be a hexadecimal color.
  - **2d: string**: The accent color for the component in the 2D view. Must be a hexadecimal color.
- **link: uri**: Link the component to another diagram using the `blueprint://ID` format or to an external website using the `https://LINK` format.
- **locked: boolean**: If `true`, changes made to the component through the application are disabled until unlocked.

The Redshift component can be added to [VPCs][2], [security groups][3], and [subnets][4].

## Accepted values for `instanceType`

The `instanceType` key accepts the following values:

```
dc1, dc2, ds1, ds2, ra3
```

## Accepted values for `instanceSize`

The `instanceSize` key accepts the following values:

```
large, xlarge, xlplus, 4xlarge, 8xlarge, 16xlarge
```

[1]: https://developers.cloudcraft.co/
[2]: /cloudcraft/components-aws/vpc/
[3]: /cloudcraft/components-aws/security-group/
[4]: /cloudcraft/components-aws/subnet/
