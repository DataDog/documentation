---
title: "EFS Component"
---
## Overview

Use the EFS block component to represent elastic file systems from your Amazon Web Services architecture.

{{< img src="cloudcraft/components-aws/efs/component-efs-diagram.png" alt="Screenshot of an isometric Cloudcraft diagram showing the 'EFS' AWS component." responsive="true" style="width:60%;">}}

## Toolbar

Use the toolbar to configure and customize the component. The following options are available:

- **Color**: Select a predefined color or enter the hexadecimal value of the color for the component and its accent. The component can use the same color for both the 2D and 3D view, or different colors for each.
- **Storage**: The storage class used for the file system workload.
- **Storage (GiB)**: Amount of data stored per month.
- **Access Requests (GiB)**: Amount of data requested per month. Only available for Infrequent Access storage classes.
- **Throughput mode**: Select a throughput mode for the file system.
- **Throughput (MiB/s)**: Amount of additional throughput provided. Only available for the provisioned throughput mode.

## API

Use the [Cloudcraft API][1] to programmatically access and render your architecture diagrams as JSON objects. 

### Schema

The following is an example JSON of a EFS component:

```json
{
  "type": "efs",
  "id": "c7031016-107f-4bc7-a18a-b86321a135b7",
  "region": "us-east-1",
  "availabilityZone": "us-east-1a",
  "mapPos": [1,2],
  "usageGb": 10,
  "readWriteGb": 0,
  "infrequentAccess": false,
  "throughputMode": "bursting",
  "throughput": 0,
  "color": {
    "isometric": "#e05243",
    "2d": "#3f8624"
  },
  "accentColor": {
    "isometric": "#ffffff",
    "2d": "#ffffff"
  },
  "link": "blueprint://33a8bf46-7326-4999-ba0a-789bcd94f0a2",
  "locked": true
}
```

- **type: efs**: The type of component.
- **id: string**: A unique identifier for the component in the `uuid` format.
- **region: string**: The AWS region the EFS component is deployed in. All global regions are supported except `cn-` regions.
- **availabilityZone: string**: The AWS availability zone the elastic file system is deployed in. Only applicable for one zone storage.
- **mapPos: [number, number]**: The position of the component in the blueprint, expressed as an x- and y-coordinate pair.
- **usageGb: number**: The amount of data stored in EFS per month, in gibibytes.
- **readWriteGb: number**: The amount of data requested per month. Only applicable if `infrequentAccess` is set to `true`.
- **infrequentAccess: boolean**: If `true`, the elastic file system uses the Infrequent Access storage class. Defaults to `false`.
- **throughputMode: string**: Select a throughput mode for the elastic file system. Accepted values are `bursting` or `provisioned`.
- **throughput: number**: The amount of additional throughput in mebibyte per seconds per month provisioned to the file system, based on its size. Only applicable if `throughputMode` is set to `provisioned`.
- **color: object**: The fill color for the component body.
  - **isometric: string**: The fill color for the component in the 3D view. Must be a hexadecimal color.
  - **2d: string**: The fill color for the component in the 2D view. Must be a hexadecimal color.
- **accentColor: object**: The accent color used to display the component logo on the block.
  - **isometric: string**: The accent color for the component in the 3D view. Must be a hexadecimal color.
  - **2d: string**: The accent color for the component in the 2D view. Must be a hexadecimal color.
- **link: uri**: Link the component to another diagram using the `blueprint://ID` format or to an external website using the `https://LINK` format.
- **locked: boolean**. If `true`, changes made to the component using the application are disabled until unlocked.

The EFS component can be added to [VPCs][2], [security groups][3], and [subnets][4].

[1]: https://developers.cloudcraft.co/
[2]: /cloudcraft/components-aws/vpc/
[3]: /cloudcraft/components-aws/security-group/
[4]: /cloudcraft/components-aws/subnet/
