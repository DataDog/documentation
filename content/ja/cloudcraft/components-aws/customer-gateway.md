---
title: Customer Gateway コンポーネント
---
## 概要

Amazon Web Services アーキテクチャのカスタマーゲートウェイデバイスを表現するために、Customer Gateway コンポーネントを使用します。

{{< img src="cloudcraft/components-aws/customer-gateway/component-customer-gateway-diagram.png" alt="「Customer gateway」AWS コンポーネントを表示するアイソメトリックな Cloudcraft ダイアグラムのスクリーンショット。" responsive="true" style="width:60%;">}}

## ツールバー

ツールバーを使用して、コンポーネントの構成とカスタマイズを行います。以下のオプションがあります。

- **Color**: 定義済みの色を選択するか、コンポーネントとそのアクセントの色の 16 進値を入力します。コンポーネントは、2D ビューと 3D ビューの両方に同じ色を使用することも、それぞれに異なる色を使用することもできます。
- **Rotate**: コンポーネントを回転させ、その方向を変更します。
- **Connections**: このゲートウェイへの VPN 接続を表示、削除、または追加します。

## API

[Cloudcraft API][1] を使用して、プログラムでアーキテクチャ図にアクセスし、JSON オブジェクトとしてレンダリングします。

### スキーマ

以下は Customer Gateway コンポーネントの JSON オブジェクトの例です。

```json
{
  "type": "customergateway",
  "id": "677145c5-aeb4-4560-8459-112bcfc21ce3",
  "region": "us-east-1",
  "mapPos": [20,10],
  "color": {
    "isometric": "#000000",
    "2d": "#000000"
  },
  "accentColor": {
    "isometric": "#ffeb3b",
    "2d": "#ffeb3b"
  },
  "direction": "down",
  "link": " blueprint://58c2aeae-d5b7-4a50-83ea-b3fa9d17d3f5",
  "locked": true
}
```

- **type: customergateway**: コンポーネントの種類。
- **id: 文字列**: `uuid` 形式のコンポーネントの一意な識別子。
- **region: 文字列**: このゲートウェイがデプロイされる AWS リージョン。`cn-` リージョン以外のすべてのグローバルリージョンがサポートされています。
- **mapPos: [数値, 数値]**: x 座標と y 座標のペアで表される、ブループリント内のコンポーネントの位置。
- **color: オブジェクト**: コンポーネント本体の塗りつぶし色。
  - **isometric: 文字列**: 3D ビューでのコンポーネントの塗りつぶし色。16 進数で指定します。
  - **2d: 文字列**: 2D ビューでのコンポーネントの塗りつぶし色。16 進数で指定します。
- **accentColor: オブジェクト**: ブロック上のコンポーネントロゴを表示するために使用されるアクセントカラー。
  - **isometric: 文字列**: 3D ビューでのコンポーネントのアクセントカラー。16 進数で指定します。
  - **2d: 文字列**: 2D ビューでのコンポーネントのアクセントカラー。16 進数で指定します。
- **direction: 文字列**: コンポーネントの回転または方向。`down` または `right` を指定します。デフォルトは `down` です。
- **link: uri**: コンポーネントを、`blueprint://ID` フォーマットを使用して別の図にリンクするか、`https://LINK` フォーマットを使用して外部の Web サイトにリンクします。
- **locked: ブール値**: Web インターフェイスを通じたコンポーネントの位置の変更を許可するかどうか。`true` の場合、ロックが解除されるまでアプリケーションを使用してコンポーネントに加えられた変更は無効になります。

Customer Gateway コンポーネントは [VPC][2] にのみ追加できます。

[1]: https://developers.cloudcraft.co/
[2]: /ja/cloudcraft/components-aws/vpc