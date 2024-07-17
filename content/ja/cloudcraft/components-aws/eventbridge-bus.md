---
title: EventBridge Bus コンポーネント
---

## Overview

EventBridge Bus コンポーネントを使用して、Amazon Web Services アーキテクチャのサーバーレスイベントバスを表現します。

{{< img src="cloudcraft/components-aws/eventbridge-bus/component-eventbridge-bus-diagram.png" alt="'EventBridge Bus' AWS コンポーネントを示す、等角投影された Cloudcraft 図のスクリーンショット。" responsive="true" style="width:60%;">}}

## Toolbar

Use the toolbar to configure and customize the component. The following options are available:

- **Color**: コンポーネント本体の塗りつぶし色とシンボルのアクセントカラーを選択します。2D ビューと 3D ビューで同じ色を使用することも、それぞれ異なる色を使用することもできます。
- **Type**: イベントバスのタイプを選択します。
- **Event size**: イベントのサイズをキロバイト単位で入力します。
- **Custom evnt./mo**: カスタムイベントの月間処理数を百万件単位で入力します。
- **Partner evnt./mo**: パートナーイベントの月間処理数を百万件単位で入力します。
- **Cross-region evnt./mo**: クロスリージョンイベントの月間処理数を百万件単位で入力します。
- **Bus-2-bus evnt./mo**: バス間イベントの月間処理数を百万件単位で入力します。
- **Rotate item**: コンポーネントを回転させ、その方向を変更します。

## API

Use the [Cloudcraft API][1] to programmatically access and render your architecture diagrams as JSON objects.

### Schema

以下は、EventBridge Bus コンポーネントの JSON の例です。

```json
{
    "type": "eventbus",
    "id": "2791cea2-f727-428f-a504-3358bfcba66f",
    "region": "us-east-1",
    "mapPos": [-2,11],
    "direction": "down",
    "eventBusType": "default",
    "eventSize": 1,
    "numCustomEvents": 0,
    "numPartnerEvents": 0,
    "numCrossRegionEvents": 0,
    "numBus2BusEvents": 0,
    "color": {
        "isometric": "#ECECED",
        "2d": "#CC2264"
    },
    "accentColor": {
        "isometric": "#4286C5",
        "2d": "#FFFFFF"
    },
    "link": "https://aws.amazon.com/eventbridge/",
    "locked": true
}
```

- **type: 文字列**: コンポーネントのタイプ。
- **id: string**: A unique identifier for the component in the `uuid` format.
- **arn: 文字列**: [Amazon Resource Name](https://docs.aws.amazon.com/general/latest/gr/aws-arns-and-namespaces.html) として知られる、AWS 内のコンポーネントのグローバルに一意な識別子。
- **region: 文字列**: ロードバランサーがデプロイされている AWS リージョン。`cn-` リージョン以外のすべてのグローバルリージョンがサポートされています。
- **mapPos: [number, number]**: The position of the component in the blueprint, expressed as an x- and y-coordinate pair.
- **direction: 文字列**: ブループリント内のデバイスの回転。`down` と `right` の 2 つの値のどちらかを指定します。デフォルトは `down` です。
- **eventBusType: 文字列**: イベントバスのタイプ。`default` と `custom` の 2 つの値のどちらかを指定します。デフォルトは `default` です。
- **eventSize: 数値**: イベントのサイズ (キロバイト単位)。デフォルトは `1` です。
- **numCustomEvents: 数値**: ひと月に処理されるカスタムイベントの数 (百万件単位)。デフォルトは `0` です。
- **numPartnerEvents: 数値**: ひと月に処理されるパートナーイベントの数 (百万件単位)。デフォルトは `0` です。
- **numCrossRegionEvents: 数値**: ひと月に処理されるクロスリージョンイベントの数 (百万件単位)。デフォルトは `0` です。
- **numBus2BusEvents: 数値**: ひと月に処理されるバス間イベントの数 (百万件単位)。デフォルトは `0` です。
- **color: object**: The fill color for the component body.
  - **isometric: 文字列**: 3D ビューでのコンポーネントの塗りつぶし色。16 進数で指定します。デフォルトは `#ECECED` です。
  - **2d: 文字列**: 2D ビューでのコンポーネントの塗りつぶし色。16 進数で指定します。デフォルトは `#CC2264` です。
- **accentColor: オブジェクト**: ブロック上にコンポーネントロゴを表示するために使用されるアクセントカラー。
  - **isometric: 文字列**: 3D ビューでのコンポーネントのアクセント色。16 進数で指定します。デフォルトは `#4286C5` です。
  - **2d: 文字列**: 2D ビューでのコンポーネントのアクセント色。16 進数で指定します。デフォルトは `#FFFFFF` です。
- **link: uri**: Link the component to another diagram using the `blueprint://ID` format or to an external website using the `https://LINK` format.
- **locked: boolean**: If `true`, changes made to the component using the application are disabled until unlocked.