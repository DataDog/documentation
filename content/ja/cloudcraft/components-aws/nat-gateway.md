---
title: NAT Gateway コンポーネント
---
## Overview

NAT Gateway コンポーネントを使用して、Amazon Web Services アーキテクチャからネットワークアドレス変換 (NAT) ゲートウェイを表現します。

{{< img src="cloudcraft/components-aws/nat-gateway/component-nat-gateway-diagram.png" alt="'NAT gateway' AWS コンポーネントを示す、等角投影された Cloudcraft 図のスクリーンショット。" responsive="true" style="width:60%;">}}

## Toolbar

Use the toolbar to configure and customize the component. The following options are available:

- **Color**: Select a predefined color or enter the hexadecimal value of the color for the component and its accent. The component can use the same color for both the 2D and 3D view, or different colors for each.
- **Data processed**: 月間処理データ量 (ギガバイト単位)。
- **Rotate**: Rotate the component and change its direction.

## API

Use the [Cloudcraft API][1] to programmatically access and render your architecture diagrams as JSON objects.

### Schema

以下は、NAT Gateway コンポーネントの JSON の例です。

```json
{
  "type": "natgateway",
  "id": "8f15adc1-da34-4f6b-b69c-cdfc240f694a",
  "region": "us-east-1",
  "mapPos": [-1.5,2],
  "dataGb": 10,
  "color": {
    "isometric": "#e91e63",
    "2d": "#e91e63"
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

- **type: natgateway**: コンポーネントのタイプ。
- **id: string**: A unique identifier for the component in the `uuid` format.
- **region: 文字列**: ゲートウェイがデプロイされる AWS リージョン。`cn-` リージョン以外のすべてのグローバルリージョンがサポートされています。
- **mapPos: [number, number]**: The position of the component in the blueprint, expressed as an x- and y-coordinate pair.
- **dataGb: number**: The volume of data processed per month by the gateway, in gigabytes.
- **color: object**: The fill color for the component body.
  - **isometric: string**: The fill color for the component in the 3D view. Must be a hexadecimal color.
  - **2d: string**: The fill color for the component in the 2D view. Must be a hexadecimal color.
- **accentColor: obect**: The accent color used to display the component logo on the block.
  - **isometric: string**: The accent color for the component in the 3D view. Must be a hexadecimal color.
  - **2d: string**: The accent color for the component in the 2D view. Must be a hexadecimal color.
- **direction: string**: The rotation or direction of the component. Accepts `down` or `right`. Default is `down`.
- **link: uri**: Link the component to another diagram using the `blueprint://ID` format or to an external website using the `https://LINK` format.
- **locked: boolean**: If `true`, changes made to the component using the application are disabled until unlocked.

NAT Gateway コンポーネントは、[VPC][2] および[サブネット][3]に追加できます。

[1]: https://developers.cloudcraft.co/
[2]: /ja/cloudcraft/components-aws/vpc/
[3]: /ja/cloudcraft/components-aws/subnet/