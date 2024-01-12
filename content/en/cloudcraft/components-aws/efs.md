---
title: "Component: EFS"
kind: guide
---

{{< img src="cloudcraft/components-aws/efs/component-efs-diagram.png" alt="Screenshot of an isometric Cloudcraft diagram showing the 'EFS' AWS component." responsive="true" style="width:100%;">}}

The **EFS** block component is used to represent elastic file systems from your Amazon Web Services architecture with Cloudcraft.

## Toolbar

The toolbar is displayed when selecting a component. It allows you to customize parts of your component and its visual to your liking.

- **Color**. Select a predefined color or enter the hexadecimal value of the color for the component and its accent. The component can use the same color for both 2D and 3D view, or different colors for each.
- **Storage**. The storage class used for the file system workload.
- **Storage (GiB)**. Amount of data stored per month.
- **Access Requests (GiB)**. Amount of data requested per month. Only available for infrequent access storage classes.
- **Throughput mode**. Select a throughput mode for the file system.
- **Throughput (MiB/s)**. Amount additional of throughput provided. Only available for the provisioned throughput mode.

## API

In [the Cloudcraft API](https://developers.cloudcraft.co/), an EBS volume is represented in JSON.

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

- **type: efs**. The type of component.
- **id: string**. A unique identifier for the component in the `uuid` format.
- **region: string**. The AWS region the EFS component is deployed in. With the exception of `cn-` regions, all global regions are supported.
- **availabilityZone: string**. The AWS availability zone the elastic file system is deployed in. Only applicable for one zone storage.
- **mapPos: [number, number]**. The position of the component in the blueprint, expressed as a x,y coordinate pair.
- **usageGb: number**. Amount of data stored in EFS per month, in gibibytes.
- **readWriteGb: number**. Amount of data requested per month. Only applicable if `infrequentAccess` is set to `true`.
- **infrequentAccess: boolean**. If true, the elastic file system uses the Infrequent Access storage class. Defaults to false.
- **throughputMode: string**. Select a throughput mode for the elastic file system. Accepted values are `bursting` or `provisioned`.
- **throughput: number**. Amount of additional throughput in mebibyte per seconds per month provisioned to the file system, based on its size. Only applicable if `throughputMode` is set to `provisioned`.
- **color: object**. The fill color for the component body.
  - **isometric: string**. Fill color for the component in 3D view. Must be an hexadecimal color.
  - **2d: string**. Fill color for the component in 2D view. Must be an hexadecimal color.
- **accentColor: object**. The accent color used to display the component logo on the block.
  - **isometric: string**. Accent color for the component in 3D view. Must be an hexadecimal color.
  - **2d: string**. Accent color for the component in 2D view. Must be an hexadecimal color.
- **link: uri**. Link component to another diagram in the `blueprint://ID` format or to external website in the `https://LINK` format.
- **locked: boolean**. If true, changes to the component through the application are disabled until unlocked.

The EFS component can be added to [VPCs](https://help.cloudcraft.co/article/118-component-vpc), [security groups](https://help.cloudcraft.co/article/119-component-security-group), and [subnets](https://help.cloudcraft.co/article/120-component-subnet).
