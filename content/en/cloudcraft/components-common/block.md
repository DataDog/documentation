---
title: "Block Component"
---
## Overview

The Block is the most basic of the available components. Along with Images and Icons, it can be used to represent cloud components not yet available.

{{< img src="cloudcraft/components-common/block/component-block.png" alt="Screenshot of a 3D representation of the block component in Cloudcraft" responsive="true" style="width:60%;">}}

## Toolbar

Use the toolbar to configure and customize the component. The following options are available:

- **Color**: Select a predefined color or enter the hexadecimal value for the color you want. You can use the same color for both 2D and 3D view, or choose different colors for each.
- **Width**: Choose the width of your block component.
- **Height**: Choose the height of your block component.
- **Depth**: Choose the depth of your block component.

## API

Use [the Cloudcraft API][1] to programmatically access and render your architecture diagrams as JSON objects. The following is an example JSON object of a Block component:

```json
{
  "type": "block",
  "id": "76cddb57-6368-4e8b-805f-1306f558812b",
  "mapPos": [3, 9],
  "width": 2,
  "height": 1,
  "depth": 2,
  "color": {
    "isometric": "#ececed",
    "2d": "#4286c5"
  },
  "locked": true,
  "link": "blueprint://34b7a049-e92b-4146-b937-7eee9ae788b5"
}
```

- **type: block**: The type of component.
- **id: string**: A unique identifier for the component in the `uuid` format.
- **mapPos: [number, number]**: The position of the component in the blueprint, expressed as a x,y coordinate pair.
- **width: number**: The width of the block component. Defaults to 2.
- **height: number**: The height of the block component. Defaults to 1.
- **depth: number**: The depth of the block component. Defaults to 2.
- **color: object**: The fill color for the component body.
  - **isometric: string**: Fill color for the component in 3D view. Must be an hexadecimal color.
  - **2d: string**: Fill color for the component in 2D view. Must be an hexadecimal color.
- **link: uri**: Link component to another diagram in the `blueprint://ID` format or to external website in the `https://LINK` format.
- **locked: boolean**: If true, changes to the component through the application are disabled until unlocked.

The block component can be added to [VPCs][2], [security groups][3], and [subnets][4].

[1]: https://developers.cloudcraft.co/
[2]: https://help.cloudcraft.co/article/118-component-vpc
[3]: https://help.cloudcraft.co/article/119-component-security-group
[4]: /cloudcraft/components-aws/subnet/
