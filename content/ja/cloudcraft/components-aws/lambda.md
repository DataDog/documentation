---
title: "Lambda Component"
---
## 概要

Lambda コンポーネントを使用して、Amazon Web Services アーキテクチャの Lambda インスタンスを表現します。

{{< img src="cloudcraft/components-aws/lambda/component-lambda-diagram.png" alt="'Lambda' AWS コンポーネントを示す、等角投影された Cloudcraft 図のスクリーンショット。" responsive="true" style="width:60%;">}}

## ツールバー

ツールバーを使用して、コンポーネントの構成とカスタマイズを行います。以下のオプションがあります。

- **Color**: 定義済みの色を選択するか、コンポーネントとそのアクセントの色の 16 進値を入力します。コンポーネントは、2D ビューと 3D ビューの両方に同じ色を使用することも、それぞれに異なる色を使用することもできます。
- **Architecture**: インスタンスによって使用されるコンピュータープロセッサーのタイプ。
- **Memory**: インスタンスに割り当てられたメモリの量。
- **Requests per month**: ひと月ごとのリクエスト数 (百万単位)。
- **Seconds per request**: 各リクエストの処理時間 (秒単位)。

## API

[Cloudcraft API][1] を使用して、プログラムでアーキテクチャ図にアクセスし、JSON オブジェクトとしてレンダリングします。

### スキーマ

以下は、Lambda コンポーネントの JSON の例です。

```json
{
  "type": "lambda",
  "id": "1bc08394-f884-497b-ae7f-fecc5e23d731",
  "region": "us-east-2",
  "mapPos": [-3, 10],
  "architecture":"x86_64",
  "memory": 128,
  "mRequests": 0.5,
  "computeDuration": 60,
  "color": {
    "2d": "#d86613",
    "isometric": "#3c3c3c"
  },
  "accentColor": {
    "2d": "#4286c5",
    "isometric": "#4286c5"
  },
  "link": "https://aws.amazon.com/lambda/",
  "locked": true
}
```

- **type: lambda**: コンポーネントのタイプ。
- **id: 文字列**: `uuid` 形式のコンポーネントの一意な識別子。
- **region: 文字列**: この Lambda インスタンスがデプロイされる AWS リージョン。`cn-` リージョン以外のすべてのグローバルリージョンがサポートされています。
- **mapPos: [数値, 数値]**: x 座標と y 座標のペアで表される、ブループリント内のコンポーネントの位置。
- **architecture: 文字列**: インスタンスによって使用されるコンピュータープロセッサーのタイプ。`x86_64` または `arm64` のいずれかの値を受け付けます。
- **memory: 数値**: インスタンスに割り当てられたメモリの量 (メガバイト単位)。
- **mRequests: 数値**: ひと月ごとのリクエスト数 (百万単位)。
- **computeDuration: 数値**: 各リクエストの処理時間 (秒単位)。
- **color: オブジェクト**: コンポーネント本体の塗りつぶし色。
  - **isometric: 文字列**: 3D ビューでのコンポーネントの塗りつぶし色。16 進数で指定します。
  - **2d: 文字列**: 2D ビューでのコンポーネントの塗りつぶし色。16 進数で指定します。
- **accentColor: オブジェクト**: ブロック上にコンポーネントロゴを表示するために使用されるアクセントカラー。
  - **isometric: 文字列**: 3D ビューでのコンポーネントのアクセントカラー。16 進数で指定します。
  - **2d: 文字列**: 2D ビューでのコンポーネントのアクセントカラー。16 進数で指定します。
- **link: uri**: コンポーネントを、`blueprint://ID` フォーマットを使用して別の図にリンクするか、`https://LINK` フォーマットを使用して外部の Web サイトにリンクします。
- **locked: ブール値**: `true` の場合、アプリケーションを使用してコンポーネントに加えられた変更は、ロックが解除されるまで無効になります。

[1]: https://developers.cloudcraft.co/
