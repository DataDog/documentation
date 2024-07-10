---
title: Transit Gateway コンポーネント
---
## 概要

Transit Gateway コンポーネントを使用して、Amazon Web Services アーキテクチャのトランジットゲートウェイアタッチメントを表現します。

{{< img src="cloudcraft/components-aws/transit-gateway/component-transit-gateway-diagram.png" alt="'Transit gateway' AWS コンポーネントを示す、等角投影された Cloudcraft 図のスクリーンショット。" responsive="true" style="width:60%;">}}

## ツールバー

ツールバーを使用して、コンポーネントの構成とカスタマイズを行います。以下のオプションがあります。

- **Color**: 定義済みの色を選択するか、コンポーネントとそのアクセントの色の 16 進値を入力します。コンポーネントは、2D ビューと 3D ビューの両方に同じ色を使用することも、それぞれに異なる色を使用することもできます。
- **Connections**: トランジットゲートウェイに接続されているアタッチメントの数。
- **Data processed**: ひと月に処理されたデータの総量 (ギガバイト単位)。
- **Rotate**: コンポーネントを回転させ、その方向を変更します。

## ヘルプ

[Cloudcraft API][1] を使用して、プログラムでアーキテクチャ図にアクセスし、JSON オブジェクトとしてレンダリングします。

### スキーマ

以下は、Transit Gateway コンポーネントの JSON の例です。

```json
{
  "type": "transitgateway",
  "id": "72a56c65-c453-41c4-85d5-e6bda4b03275",
  "region": "us-east-1",
  "mapPos": [-0.5,14],
  "connections": 2,
  "dataGb": "10",
  "color": {
    "isometric": "#000000",
    "2d": "#000000"
  },
  "accentColor": {
    "isometric": "#ffffff",
    "2d": "#ffffff"
  },
  "direction": "down",
  "link":"blueprint://1127e451-7e09-44bd-9dac-12eef90775c6",
  "locked":true
}
```

- **type: transitgateway**: コンポーネントのタイプ。
- **id: 文字列**: `uuid` 形式のコンポーネントの一意な識別子。
- **region: 文字列**: このゲートウェイがデプロイされる AWS リージョン。`cn-` リージョン以外のすべてのグローバルリージョンがサポートされています。
- **mapPos: [数値, 数値]**: x 座標と y 座標のペアで表される、ブループリント内のコンポーネントの位置。
- **connections: 数値**: トランジットゲートウェイに接続されているアタッチメントの数。
- **dataGb: 数値**: ゲートウェイがひと月に処理するデータ量 (ギガバイト単位)。
- **color: オブジェクト**: コンポーネント本体の塗りつぶし色。
  - **isometric: 文字列**: 3D ビューでのコンポーネントの塗りつぶし色。16 進数で指定します。
  - **2d: 文字列**: 2D ビューでのコンポーネントの塗りつぶし色。16 進数で指定します。
- **accentColor: オブジェクト**: ブロック上のコンポーネントロゴを表示するために使用されるアクセントカラー。
  - **isometric: 文字列**: 3D ビューでのコンポーネントのアクセントカラー。16 進数で指定します。
  - **2d: 文字列**: 2D ビューでのコンポーネントのアクセントカラー。16 進数で指定します。
- **direction: 文字列**: コンポーネントの回転または方向。`down` または `right` を指定します。デフォルトは `down` です。
- **link: uri**: コンポーネントを、`blueprint://ID` フォーマットを使用して別の図にリンクするか、`https://LINK` フォーマットを使用して外部の Web サイトにリンクします。
- **locked: ブール値**: `true` の場合、アプリケーションを使用してコンポーネントに加えられた変更は、ロックが解除されるまで無効になります。

[1]: https://developers.cloudcraft.co/