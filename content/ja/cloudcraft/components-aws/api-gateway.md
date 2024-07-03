---
title: API Gateway Component
---
## 概要

API Gateway コンポーネントを使用して、Amazon Web Services アーキテクチャから RESTful、HTTP、WebSocket API を表現します。

{{< img src="cloudcraft/components-aws/api-gateway/component-api-gateway-diagram.png" alt="'API gateway' AWS コンポーネントを示す、等角投影された Cloudcraft 図のスクリーンショット。" responsive="true" style="width:60%;">}}

## ツールバー

ツールバーを使用して、コンポーネントの構成とカスタマイズを行います。以下のオプションがあります。

- **Color**: 定義済みの色を選択するか、コンポーネントとそのアクセントの色の 16 進値を入力します。コンポーネントは、2D ビューと 3D ビューの両方に同じ色を使用することも、それぞれに異なる色を使用することもできます。
- **Rotate item**: コンポーネントを回転させ、その方向を変更します。
- **API Type**: ゲートウェイの API タイプを選択します。
- **M req./month**: ひと月ごとに送信されるリクエスト数を百万単位で入力します。
- **M min./month**: 1 分ごと送信されるメッセージの数を百万単位で入力します。`websocket` タイプの API でのみ使用可能です。
- **Cache Memory (GB)**: API レスポンスのキャッシュに使用するメモリ量をギガバイト単位で選択します。`rest` タイプの API でのみ使用可能です。

## API

[Cloudcraft API][1] を使用して、プログラムでアーキテクチャ図にアクセスし、JSON オブジェクトとしてレンダリングします。

### スキーマ

以下は、API Gateway の JSON オブジェクトの例です。

```json
{
  "type": "apigateway",
  "id": "5635395f-9441-494d-bcc7-5dd4f5c93ce1",
  "region": "us-east-1",
  "mapPos": [0,10],
  "direction": "down",
  "apiType": "rest",
  "apiCalls": "10",
  "connectionMinutes": 0,
  "cache": 1.6,
  "color": {
    "isometric": "#3c3c3c",
    "2d": "#693cc5"
  },
  "accentColor": {
    "isometric": "#f4b934",
    "2d": "#ffffff"
  },
  "link": "https://aws.amazon.com/api-gateway/",
  "locked": true
}
```

- **type: apigateway**: コンポーネントのタイプ。
- **id: 文字列**: `uuid` 形式のコンポーネントの一意な識別子。
- **region: 文字列**: API Gateway がデプロイされる AWS リージョン。`cn-` リージョン以外のすべてのグローバルリージョンがサポートされています。
- **mapPos: [数値, 数値]**: x 座標と y 座標のペアで表される、ブループリント内のコンポーネントの位置。
- **direction: 文字列**: コンポーネントの回転または方向。指定できる値は、`down` または `right` です。デフォルトは `down` です。
- **apiType: 文字列**: ゲートウェイで使用する API のタイプ。指定できる値は `rest`、`http` および `websocket` です。
- **apiCalls: 数値**: ひと月ごとの API コール数。デフォルトは `5` です。
- **connectionMinutes: 数値**: 1 分ごとに送信されるメッセージの数 (百万単位)。`apiType` が `websocket` に設定されている場合のみ適用可能です。デフォルトは `0` です。
- **cache: 数値**: API レスポンスのキャッシュに使用するメモリの量 (ギガバイト単位)。`apiType` が `rest` に設定されている場合にのみ適用可能です。詳細は [cache で許容される値](#accepted-values-for-cache)を参照してください。
- **color: オブジェクト**: コンポーネント本体の塗りつぶし色。
  - **isometric: 文字列**: 3D ビューでのコンポーネントの塗りつぶし色。16 進数で指定します。
  - **2d: 文字列**: 2D ビューでのコンポーネントの塗りつぶし色。16 進数で指定します。
- **accentColor: オブジェクト**: ブロック上のコンポーネントロゴを表示するために使用されるアクセントカラー。
  - **isometric: 文字列**: 3D ビューでのコンポーネントのアクセントカラー。16 進数で指定します。
  - **2d: 文字列**: 2D ビューでのコンポーネントのアクセントカラー。16 進数で指定します。
- **link: uri**: コンポーネントを、`blueprint://ID` フォーマットを使用して別の図にリンクするか、`https://LINK` フォーマットを使用して外部の Web サイトにリンクします。
- **locked: ブール値**: `true` の場合、アプリケーションを使用してコンポーネントに加えられた変更は、ロックが解除されるまで無効になります。

## cache で許容される値

`cache` キーのデフォルトは `1.6` で、以下の値を指定できます。

```
0, 0.5, 1.6, 6.1, 13.5, 28.4, 58.2, 118.0, 237.0
```

[1]: https://developers.cloudcraft.co/