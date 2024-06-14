---
title: "DocumentDB Component"
kind: documentation
---
## Overview

Use the DocumentDB component to represent DocumentDB clusters from your Amazon Web Services architecture.

{{< img src="cloudcraft/components-aws/documentdb/component-documentdb-diagram.png" alt="Screenshot of an isometric Cloudcraft diagram showing the 'DocumentDB' AWS component." responsive="true" style="width:60%;">}}

## Toolbar

Use the toolbar to configure and customize the component. The following options are available:

- **Color**: Select a predefined color or enter the hexadecimal value of the color for the component and its accent. The component can use the same color for both the 2D and 3D view, or different colors for each.
- **Role**: Select the role of the DocumentDB instance. Can be writer or reader.
- **Instance type**: The type of the instance. Changing the instance type changes the hardware details shown in the toolbar to reflect what is used by the hypervisor.
- **Size**: The size of the database cluster. As with instance type, the hardware details shown in the toolbar change to reflect the size.
- **Storage (GiB)**: Amount of storage provisioned for the cluster, in gibibytes. Only available for the writer role.
- **Snapshots (GiB)**: Amount of storage provisioned for snapshots, in gibibytes. Only available for the writer role.
- **IOPS (Millions)**: The monthly I/O limit for the cluster, in the millions. Only available for the writer role.

## API

Use the [Cloudcraft API][1] to programmatically access and render your architecture diagrams as JSON objects.

### Schema

The following is an example JSON object of a DocumentDB component:

```json
{
  "type": "docdb",
  "id": "36f18266-2d25-4003-9719-ee64899e2c4e",
  "region": "us-east-1",
  "mapPos": [2,4],
  "role": "writer",
  "instanceType": "t3",
  "instanceSize": "medium",
  "storage": 10,
  "snapshots": 4,
  "iops": "200",
  "color": {
    "isometric": "#ececed",
    "2d": "#3b48cc"
  },
  "accentColor": {
    "isometric": "#4286c5",
    "2d": "#ffffff"
  },
  "link": "blueprint://ae6349e1-fa15-41c8-8e89-d201f9fa3cc9",
  "locked": true
}
```

- **type: docdb**: The type of component.
- **id: string**: A unique identifier for the component in the `uuid` format.
- **region: string**: The AWS region the RDS instance is deployed in. All global regions are supported except `cn-` regions.
- **mapPos: [number, number]**: The position of the component in the blueprint, expressed as an x- and y-coordinate pair.
- **role: string**: The role used for the DocumentDB instance. Accepted values are `writer` and `reader`.
- **instanceType: string**: The type of the instance. Accepted values are `r4`, `r5`, and `t3`.
- **instanceSize: string**: The size of the database cluster. See [Accepted values for instanceSize](#accepted-values-for-instancesize) for more information.
- **storage: number**: Amount of storage provisioned for the cluster, in gibibytes. Only applicable if `role` is set to `writer`.
- **snapshots: number**: Amount of storage provisioned for snapshots, in gibibytes. Only applicable if `role` is set to `writer`.
- **iops: number**: The monthly I/O limit for the cluster, in the millions. Only applicable if `role` is set to `writer`.
- **color: object**. The fill color for the component body.
  - **isometric: string**: The fill color for the component in the 3D view. Must be a hexadecimal color.
  - **2d: string**: The fill color for the component in the 2D view. Must be a hexadecimal color.
- **accentColor: object**: The accent color used to display the component logo on the block.
  - **isometric: string**. The accent color for the component in the 3D view. Must be a hexadecimal color.
  - **2d: string**. The accent color for the component in the 2D view. Must be a hexadecimal color.
- **link: uri**. Link the component to another diagram using the `blueprint://ID` format or to an external website using the `https://LINK` format.
- **locked: boolean**. If `true`, changes made to the component using the application are disabled until unlocked.

The DocumentDB component can be added to [VPCs][2], [security groups][3], and [subnets][4].

## Accepted values for `instanceSize`

The `instanceSize` key accepts the following values:

```
medium, large, xlarge, 2xlarge, 4xlarge, 8xlarge, 12xlarge, 16xlarge, 24xlarge
```

[1]: https://developers.cloudcraft.co/
[2]: /cloudcraft/components-aws/vpc/
[3]: /cloudcraft/components-aws/security-group/
[4]: /cloudcraft/components-aws/subnet/
