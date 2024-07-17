---
title: SQS コンポーネント
---
## Overview

SQS コンポーネントを使用して、Amazon Web Services アーキテクチャのメッセージキューを表現します。

{{< img src="cloudcraft/components-aws/sqs/component-sqs-diagram.png" alt="'SQS' AWS コンポーネントを示す、等角投影された Cloudcraft 図のスクリーンショット。" responsive="true" style="width:60%;">}}

## Toolbar

Use the toolbar to configure and customize the component. The following options are available:

- **Color**: Select a predefined color or enter the hexadecimal value of the color for the component and its accent. The component can use the same color for both the 2D and 3D view, or different colors for each.
- **Rotate item**: Rotate the component and change its direction.
- **Type**: SQS インスタンスのメッセージキュータイプを選択します。
- **Req./month (M)**: ひと月ごとに送信されるリクエスト数を百万単位で入力します。

## API

Use the [Cloudcraft API][1] to programmatically access and render your architecture diagrams as JSON objects.

### Schema

以下は、SQS コンポーネントの JSON の例です。

```json
{
  "type": "sqs",
  "id": "c671ec0c-3103-4312-9c85-286a58dbc457",
  "region": "us-east-1",
  "mapPos": [0,10],
  "direction": "down",
  "queueType": "standard",
  "requests": 1,
  "color": {
    "isometric": "#ececed",
    "2d": "#cc2264"
  },
  "accentColor": {
    "isometric": "#f4b934",
    "2d": "#ffffff"
  },
  "link": "https://aws.amazon.com/sqs/",
  "locked": true
}
```

- **type: sqs**: コンポーネントのタイプ。
- **id: string**: A unique identifier for the component in the `uuid` format.
- **region: 文字列**: SQS がデプロイされる AWS リージョン。`cn-` リージョン以外のすべてのグローバルリージョンがサポートされています。
- **mapPos: [number, number]**: The position of the component in the blueprint, expressed as an x- and y-coordinate pair.
- **direction: string**: The rotation or direction of the component. Accepted values are `down`, `up`, `right`, or `left`. Defaults to `down`.
- **queueType: 文字列**: SQS インスタンスのメッセージキュータイプ。指定できる値は `standard` または `fifo` です。
- **requests: 数値**: 1 か月間に送信されるリクエスト数 (百万件単位)。デフォルトは `1` です。
- **color: object**: The fill color for the component body.
  - **isometric: string**: The fill color for the component in the 3D view. Must be a hexadecimal color.
  - **2d: string**: The fill color for the component in the 2D view. Must be a hexadecimal color.
- **accentColor: object**: The accent color used to display the component logo on the block.
  - **isometric: string**: The accent color for the component in the 3D view. Must be a hexadecimal color.
  - **2d: string**: The accent color for the component in the 2D view. Must be a hexadecimal color.
- **link: uri**: Link the component to another diagram using the `blueprint://ID` format or to an external website using the `https://LINK` format.
- **locked: boolean**: If `true`, changes made to the component using the application are disabled until unlocked.

[1]: https://developers.cloudcraft.co/