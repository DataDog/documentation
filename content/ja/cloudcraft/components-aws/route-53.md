---
title: Route 53 コンポーネント
---
## Overview

Route 53 コンポーネントを使用して、Amazon Web Services アーキテクチャの Route 53 DNS サービスを使用したドメインを表現します。

{{< img src="cloudcraft/components-aws/route-53/component-route-53-diagram.png" alt="'Route 53' AWS コンポーネントを示す、等角投影された Cloudcraft 図のスクリーンショット。" responsive="true" style="width:60%;">}}

## Toolbar

Use the toolbar to configure and customize the component. The following options are available:

- **Color**: 定義済みの色を選択するか、コンポーネントとそのアクセントの色の 16 進値を入力します。コンポーネントは、2D ビューと 3D ビューの両方に同じ色を使用することも、それぞれに異なる色を使用することもできます。

## API

Use the [Cloudcraft API][1] to programmatically access and render your architecture diagrams as JSON objects.

### Schema

以下は、Route 53 コンポーネントの JSON の例です。

```json
{
  "type": "r53",
  "id": "c311184b-2d15-4d29-9a17-bb33778f04c8",
  "mapPos": [5,12],
  "accentColor": {
    "2d": "#ffffff",
    "isometric": "#4286c5"
  },
  "color": {
    "2d": "#693cc5",
    "isometric": "#ececed"
  },
  "link": "https://blog.cloudcraft.co/",
  "locked": true
}
```

- **type: r53**: コンポーネントのタイプ。
- **id: string**: A unique identifier for the component in the `uuid` format.
- **mapPos: [number, number]**: The position of the component in the blueprint, expressed as an x- and y-coordinate pair.
- **accentColor: object**: The accent color used to display the component logo on top of the block.
  - **isometric: string**: The accent color for the component in the 3D view. Must be a hexadecimal color.
  - **2d: string**: The accent color for the component in the 2D view. Must be a hexadecimal color.
- **color: object**: The fill color for the component body.
  - **isometric: string**: The fill color for the component in the 3D view. Must be a hexadecimal color.
  - **2d: string**: The fill color for the component in the 2D view. Must be a hexadecimal color.
- **link: uri**: コンポーネントを、`blueprint://id` フォーマットを使用して別の図にリンクするか、`https://link` フォーマットを使用して外部の Web サイトにリンクします。
- **locked: boolean**: If `true`, changes made to the component using the application are disabled until unlocked.

[1]: https://developers.cloudcraft.co/