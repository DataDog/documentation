---
title: Internet Gateway コンポーネント
---
## Overview

Internet Gateway コンポーネントを使用して、Amazon Web Services アーキテクチャのインターネットへのゲートウェイを表現します。

{{< img src="cloudcraft/components-aws/internet-gateway/component-internet-gateway-diagram.png" alt="'Internet gateway' AWS コンポーネントを示す、等角投影された Cloudcraft 図のスクリーンショット。" responsive="true" style="width:60%;">}}

## Toolbar

Use the toolbar to configure and customize the component. The following options are available:

- **Color**: Select a predefined color or enter the hexadecimal value of the color for the component and its accent. The component can use the same color for both the 2D and 3D view, or different colors for each.
- **Rotate**: Rotate the component and change its direction.

## API

Use the [Cloudcraft API][1] to programmatically access and render your architecture diagrams as JSON objects.

### Schema

以下は、Internet Gateway コンポーネントの JSON の例です。

```json
{
  "type": "internetgateway",
  "id": "aacf299e-1336-46a3-98d7-3ef75eef8116",
  "region": "us-east-1",
  "mapPos": [-4.25,9],
  "color": {
    "isometric": "#4286c5",
    "2d": "#4286c5"
  },
  "accentColor": {
    "isometric": "#ffffff",
    "2d": "#ffffff"
  },
  "direction": "down",
  "link": "blueprint://b07827f7-2ead-4911-bb78-ddc02dc07b24",
  "locked": true
}
```

- **type: internetgateway**: コンポーネントのタイプ。
- **id: string**: A unique identifier for the component in the `uuid` format.
- **region: string**: The AWS region the gateway is deployed in. All global regions are supported except `cn-` regions.
- **mapPos: [number, number]**: The position of the component in the blueprint, expressed as an x- and y-coordinate pair.
- **color: object**: The fill color for the component body.
  - **isometric: string**: The fill color for the component in the 3D view. Must be a hexadecimal color.
  - **2d: string**: The fill color for the component in the 2D view. Must be a hexadecimal color.
- **accentColor: obect**: The accent color used to display the component logo on the block.
  - **isometric: string**: The accent color for the component in the 3D view. Must be a hexadecimal color.
  - **2d: string**: The accent color for the component in the 2D view. Must be a hexadecimal color.
- **direction: string**: The rotation or direction of the component. Accepts `down` or `right`. Default is `down`.
- **link: uri**: Link the component to another diagram using the `blueprint://ID` format or to external website using the `https://LINK` format.
- **locked: boolean**: If `true`, changes made to the component using the application are disabled until unlocked.

Internet Gateway コンポーネントは、[VPC][2] にのみ追加できます。

[1]: https://developers.cloudcraft.co/
[2]: /ja/cloudcraft/components-aws/vpc/