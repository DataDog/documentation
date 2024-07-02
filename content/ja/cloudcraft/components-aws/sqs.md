---
title: "SQS Component"
---
## 概要

Use the SQS component to represent message queues from your Amazon Web Services architecture.

{{< img src="cloudcraft/components-aws/sqs/component-sqs-diagram.png" alt="Screenshot of an isometric Cloudcraft diagram showing the 'SQS' AWS component." responsive="true" style="width:60%;">}}

## ツールバー

ツールバーを使用して、コンポーネントの構成とカスタマイズを行います。以下のオプションがあります。

- **Color**: 定義済みの色を選択するか、コンポーネントとそのアクセントの色の 16 進値を入力します。コンポーネントは、2D ビューと 3D ビューの両方に同じ色を使用することも、それぞれに異なる色を使用することもできます。
- **Rotate item**: コンポーネントを回転させ、その方向を変更します。
- **Type**: Select the message queue type for the SQS instance.
- **Req./month (M)**: Enter the number of requests sent per month, in millions.

## API

[Cloudcraft API][1] を使用して、プログラムでアーキテクチャ図にアクセスし、JSON オブジェクトとしてレンダリングします。

### スキーマ

The following is an example JSON of an SQS component:

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

- **type: sqs**: The type of component.
- **id: 文字列**: `uuid` 形式のコンポーネントの一意な識別子。
- **region: string**: The AWS region where SQS is deployed in. All global regions are supported except `cn-` regions.
- **mapPos: [数値, 数値]**: x 座標と y 座標のペアで表される、ブループリント内のコンポーネントの位置。
- **direction: 文字列**: コンポーネントの回転または方向。指定できる値は、`down`、`up`、`right` または `left` です。デフォルトは `down` です。
- **queueType: string**: The message queue type for the SQS instance. Accepted values are `standard` or `fifo`.
- **requests: number**: The number of requests sent per month, in millions. Defaults to `1`.
- **color: オブジェクト**: コンポーネント本体の塗りつぶし色。
  - **isometric: 文字列**: 3D ビューでのコンポーネントの塗りつぶし色。16 進数で指定します。
  - **2d: 文字列**: 2D ビューでのコンポーネントの塗りつぶし色。16 進数で指定します。
- **accentColor: オブジェクト**: ブロック上のコンポーネントロゴを表示するために使用されるアクセントカラー。
  - **isometric: 文字列**: 3D ビューでのコンポーネントのアクセントカラー。16 進数で指定します。
  - **2d: 文字列**: 2D ビューでのコンポーネントのアクセントカラー。16 進数で指定します。
- **link: uri**: コンポーネントを、`blueprint://ID` フォーマットを使用して別の図にリンクするか、`https://LINK` フォーマットを使用して外部の Web サイトにリンクします。
- **locked: ブール値**: `true` の場合、アプリケーションを使用してコンポーネントに加えられた変更は、ロックが解除されるまで無効になります。

[1]: https://developers.cloudcraft.co/
