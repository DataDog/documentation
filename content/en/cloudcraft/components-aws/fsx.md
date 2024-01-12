---
title: "Component: FSx"
kind: guide
---

{{< img src="cloudcraft/components-aws/fsx/component-fsx-diagram.png" alt="Screenshot of an isometric Cloudcraft diagram showing the 'FSx' AWS component." responsive="true" style="width:100%;">}}

The **FSx** block component is used to represent FSx file systems from your Amazon Web Services architecture with Cloudcraft.

## Toolbar

The toolbar is displayed when selecting a component. It allows you to customize parts of your component and its visual to your liking.

- **Color**. Select a predefined color or enter the hexadecimal value of the color for the component and its accent. The component can use the same color for both 2D and 3D view, or different colors for each.
- **File system**. The file system used for FSx.
- **Storage (GiB)**. Amount of storage provisioned for the file system.
- **Storage type**. Select a storage type for the file system. Not available for the Lustre file system.
- **Throughput (MiB/s)**. Amount of aggregate throughput capacity. Not available for the Lustre file system.
- **Backup size (GiB)**. Amount of storage provisioned for data deduplication. Not available for the Lustre file system.
- **Deployment type**. The type of deployment for the file system, single or multi AZ. Not available for the Lustre file system.

## API

In [the Cloudcraft API](https://developers.cloudcraft.co/), an FSx file system is represented in JSON.

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

- **type: fsx**. The type of component.
- **id: string**. A unique identifier for the component in the `uuid` format.
- **region: string**. The AWS region the FSx component is deployed in. With the exception of `cn-` regions, all global regions are supported.
- **mapPos: [number, number]**. The position of the component in the blueprint, expressed as a x,y coordinate pair.
- **fileSystemType: string**. The file system used for the FSx component. Accepted values are `windows` and `lustre`.
- **storageCapacity: number**. Amount of data provisioned for the file system in gibibyte.
- **storageType: string**. Select a storage type for the file system. Accepted values are `ssd` and `hdd`. Only applicable if `fileSystemType` is set to `windows`.
- **throughputCapacity: number**. Amount of aggregate throughput capacity in mebibyte per seconds. See below for more information.
- **backupCapacity: number**. Amount of storage provisioned for data deduplication, in gibibytes. Only applicable if `fileSystemType` is set to `windows`.
- **multiAZ: boolean**. If true, the FSx file system is deployed in multiple AWS availability zones. Only applicable if `fileSystemType` is set to `windows`.
- **color: object**. The fill color for the component body.
  - **isometric: string**. Fill color for the component in 3D view. Must be an hexadecimal color.
  - **2d: string**. Fill color for the component in 2D view. Must be an hexadecimal color.
- **accentColor: object**. The accent color used to display the component logo on the block.
  - **isometric: string**. Accent color for the component in 3D view. Must be an hexadecimal color.
  - **2d: string**. Accent color for the component in 2D view. Must be an hexadecimal color.
- **link: uri**. Link component to another diagram in the `blueprint://ID` format or to external website in the `https://LINK` format.
- **locked: boolean**. If true, changes to the component through the application are disabled until unlocked.

The FSx component can be added to VPCs, security groups, and subnets.
The FSx component can be added to [VPCs](https://help.cloudcraft.co/article/118-component-vpc), [security groups](https://help.cloudcraft.co/article/119-component-security-group), and [subnets](https://help.cloudcraft.co/article/120-component-subnet).

## Accepted values for throughputCapacity

The `throughputCapacity` key accepts the following values:

```
8, 16, 32, 64, 128, 256, 512, 1024, 2048
```

The `throughputCapacity` key is only applicable if `fileSystemType` is set to `windows`.
