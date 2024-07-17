---
title: Kinesis Stream コンポーネント
---
## Overview

Kinesis Stream コンポーネントを使用して、Amazon Web Services アーキテクチャのリアルタイムのデータストリームを表現します。

{{< img src="cloudcraft/components-aws/kinesis-stream/component-kinesis-stream-diagram.png" alt="'Kinesis Stream' AWS コンポーネントを示す、等角投影された Cloudcraft 図のスクリーンショット。" responsive="true" style="width:60%;">}}

## Toolbar

Use the toolbar to configure and customize the component. The following options are available:

- **Color**: Select a predefined color or enter the hexadecimal value of the color for the component and its accent. The component can use the same color for both the 2D and 3D view, or different colors for each.
- **Rotate item**: Kinesis コンポーネントを回転させ、その方向を変更します。
- **Shards**: Kinesis データストリームのシャード数を入力します。
- **PUT units (M)**: Kinesis データストリームの `PUT` ペイロードユニット数を百万単位で入力します。
- **Extended data retention**: Kinesis データストリームの保存期間を 24 時間以上に延長します。

## API

Use the [Cloudcraft API][1] to programmatically access and render your architecture diagrams as JSON objects.

### Schema

以下は、Kinesis Stream コンポーネントの JSON の例です。

```json
{
  "type": "kinesisstream",
  "id": "cc3c417b-3b09-4dff-bc22-52398b86adb6",
  "region": "us-west-2",
  "mapPos": [0,10],
  "direction": "down",
  "shards": 1,
  "putUnits": 500,
  "extendedRetention": true,
  "color": {
    "isometric": "#ececed",
    "2d": "#693cc5"
  },
  "accentColor": {
    "isometric": "#4286c5",
    "2d": "#ffffff"
  },
  "link": "https://aws.amazon.com/kinesis/data-streams/",
  "locked": true
}
```

- **type: kinesisstream**: コンポーネントのタイプ。
- **id: string**: A unique identifier for the component in the `uuid` format.
- **region: 文字列**: この Kinesis ストリームインスタンスがデプロイされる AWS リージョン。`cn-` リージョン以外のすべてのグローバルリージョンがサポートされています。
- **mapPos: [number, number]**: The position of the component in the blueprint, expressed as an x- and y-coordinate pair.
- **direction: 文字列**: コンポーネントの回転または方向。指定できる値は、`down` と `right` です。デフォルトは `down` です。
- **shards: 数値**: Kinesis データストリームのシャードの数。デフォルトは `1` です。
- **putUnits: 数値**: Kinesis データストリームの `PUT` ペイロードユニットの数 (百万単位)。デフォルトは `500` です。
- **extendedRetention: ブール値**: `true` の場合、Kinesis データストリームを 24 時間以上保存します。デフォルトは `false` です。
- **color: object**: The fill color for the component body.
  - **isometric: string**: The fill color for the component in the 3D view. Must be a hexadecimal color.
  - **2d: string**: The fill color for the component in the 2D view. Must be a hexadecimal color.
- **accentColor: object**: The accent color used to display the component logo on the block.
  - **isometric: string**: The accent color for the component in the 3D view. Must be a hexadecimal color.
  - **2d: string**: The accent color for the component in the 2D view. Must be a hexadecimal color.
- **link: uri**: Link the component to another diagram using the `blueprint://ID` format or to an external website using the `https://LINK` format.
- **locked: boolean**: If `true`, changes made to the component using the application are disabled until unlocked.

[1]: https://developers.cloudcraft.co/