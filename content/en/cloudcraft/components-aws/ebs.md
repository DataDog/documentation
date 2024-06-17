---
title: "EBS Component"
kind: documentation
---
## Overview

Use the EBS component to represent EBS volumes from your Amazon Web Services architecture.

{{< img src="cloudcraft/components-aws/ebs/component-ebs-diagram.png" alt="Screenshot of an isometric Cloudcraft diagram showing the 'EBS' AWS component." responsive="true" style="width:60%;">}}

## Toolbar

Use the toolbar to configure and customize the component. The following options are available:

- **Color**: Select a predefined color or enter the hexadecimal value of the color for the component and its accent. The component can use the same color for both the 2D and 3D view, or different colors for each.
- **Volume type**: The type of volume used.
- **Storage**: Amount of storage for the volume in gibibytes.
- **IOPS**: IOPS limit for the volume. Only available for SSD volumes.
- **Throughput**: Throughput limit for the volume. Only available for `gp3` volumes.
- **I/O requests per second**: I/O limit for the volume. Only available for older generation magnetic HDD volumes.
- **Snapshot**: Amount of storage for snapshots in gibibytes.


## API

Use the [Cloudcraft API][1] to programmatically access and render your architecture diagrams as JSON objects.

### Schema

The following is an example JSON of an EBS volume component:

```json
{
  "type": "ebs",
  "id": "100b1d12-49e7-4dfb-8948-0e0abf0e5d33",
  "region": "us-east-1",
  "mapPos": [-1,9],
  "volume": "gp3",
  "storage": "200",
  "iops": "4000",
  "throughput": "500",
  "snapshots": "0",
  "color": {
    "isometric": "#000000",
    "2d": "#000000"
  },
  "accentColor": {
    "isometric": "#ffeb3b",
    "2d": "#ffeb3b"
  },
  "link": "blueprint://ae6349e1-fa15-41c8-8e89-d201f9fa3cc9",
  "locked": true
}
```

- **type: ebs**: The type of component.
- **id: string**: A unique identifier for the component in the `uuid` format.
- **region: string**: The AWS region the EBS volume is deployed in. All global regions are supported except `cn-` regions.
- **mapPos: [number, number]**: The position of the component in the blueprint, expressed as an x- and y-coordinate pair.
- **volume: string**: The type of the volume. Accepted values are `gp3`, `gp2`, `io2`, `io1`, `st1`, `sc1`, or `magnetic`.
- **storage: number**: Amount of storage for the volume in gibibytes.
- **iops: number**: IOPS limit for the volume. Not applicable for volume type `st1` and `sc1`.
- **throughput: number**: Throughput limit for the volume. Only applicable for volume type `gp3`.
- **snapshots: number**: Amount of storage for snapshots in gibibytes.
- **color: object**: The fill color for the component body.
  - **isometric: string**: The fill color for the component in the 3D view. Must be a hexadecimal color.
  - **2d: string**. The fill color for the component in the 2D view. Must be a hexadecimal color.
- **accentColor: object**. The accent color used to display the component logo on the block.
  - **isometric: string**. The accent color for the component in the 3D view. Must be a hexadecimal color.
  - **2d: string**. The accent color for the component in the 2D view. Must be a hexadecimal color.
- **link: uri**. Link the component to another diagram in using `blueprint://ID` format or to an external website using the `https://LINK` format.
- **locked: boolean**. If `true`, changes made to the component using the application are disabled until unlocked.

[1]: https://developers.cloudcraft.co/
