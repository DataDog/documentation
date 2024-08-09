---
title: "FSx Component"
---
## Overview

Use the FSx component to represent FSx file systems from your Amazon Web Services architecture.

{{< img src="cloudcraft/components-aws/fsx/component-fsx-diagram.png" alt="Screenshot of an isometric Cloudcraft diagram showing the 'FSx' AWS component." responsive="true" style="width:60%;">}}

## Toolbar

Use the toolbar to configure and customize the component. The following options are available:

- **Color**: Select a predefined color or enter the hexadecimal value of the color for the component and its accent. The component can use the same color for both the 2D and 3D view, or different colors for each.
- **File system**: The file system used for FSx.
- **Storage (GiB)**: The amount of storage provisioned for the file system.
- **Storage type**: Select a storage type for the file system. Not available for the Lustre file system.
- **Throughput (MiB/s)**: The amount of aggregate throughput capacity. Not available for the Lustre file system.
- **Backup size (GiB)**: The amount of storage provisioned for data deduplication. Not available for the Lustre file system.
- **Deployment type**: The type of deployment for the file system, single or multi AZ. Not available for the Lustre file system.

## API

Use [the Cloudcraft API][1] to programmatically access and render your architecture diagrams as JSON objects.

### Schema

The following is an example JSON of a FSx component:

```json
{
  "type": "fsx",
  "id": "df89904a-a53e-4c2d-b63c-757c7ad6b4aa",
  "region": "us-east-1",
  "mapPos": [0,10],
  "fileSystemType": "windows",
  "storageCapacity": 32,
  "storageType": "ssd",
  "throughputCapacity": 8,
  "backupCapacity": 600,
  "multiAZ": false,
  "color": {
    "isometric": "#3f8624",
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

- **type: fsx**: The type of component.
- **id: string**: A unique identifier for the component in the `uuid` format.
- **region: string**: The AWS region the FSx component is deployed in. All global regions are supported except `cn-` regions.
- **mapPos: [number, number]**: The position of the component in the blueprint, expressed as an x- and y-coordinate pair.
- **fileSystemType: string**: The file system used for the FSx component. Accepted values are `windows` and `lustre`.
- **storageCapacity: number**: The amount of data provisioned for the file system in gibibyte.
- **storageType: string**: Select a storage type for the file system. Accepted values are `ssd` and `hdd`. Only applicable if `fileSystemType` is set to `windows`.
- **throughputCapacity: number**: The amount of aggregate throughput capacity in mebibyte per seconds. See [Accepted values for `throughputCapacity`](#accepted-values-for-throughputcapacity) for more information.
- **backupCapacity: number**: The amount of storage provisioned for data deduplication, in gibibytes. Only applicable if `fileSystemType` is set to `windows`.
- **multiAZ: boolean**: If `true`, the FSx file system is deployed in multiple AWS availability zones. Only applicable if `fileSystemType` is set to `windows`.
- **color: object**: The fill color for the component body.
  - **isometric: string**: The fill color for the component in the 3D view. Must be a hexadecimal color.
  - **2d: string**: The fill color for the component in the 2D view. Must be a hexadecimal color.
- **accentColor: object**: The accent color used to display the component logo on the block.
  - **isometric: string**: The accent color for the component in the 3D view. Must be a hexadecimal color.
  - **2d: string**: The accent color for the component in the 2D view. Must be a hexadecimal color.
- **link: uri**: Link the component to another diagram using the `blueprint://ID` format or to external website using the `https://LINK` format.
- **locked: boolean**: If `true`, changes made to the component using the application are disabled until unlocked.

The FSx component can be added to [VPCs][2], [security groups][3], and [subnets][4].

## Accepted values for `throughputCapacity`

The `throughputCapacity` key accepts the following values:

```
8, 16, 32, 64, 128, 256, 512, 1024, 2048
```

The `throughputCapacity` key is only applicable if `fileSystemType` is set to `windows`.

[1]: https://developers.cloudcraft.co/
[2]: /cloudcraft/components-aws/vpc/
[3]: /cloudcraft/components-aws/security-group/
[4]: /cloudcraft/components-aws/subnet/
