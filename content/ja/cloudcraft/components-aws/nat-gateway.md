---
title: "NAT Gateway Component"
---
## 概要

Use the NAT Gateway component to represent network address translation (NAT) gateways from your Amazon Web Services architecture.

{{< img src="cloudcraft/components-aws/nat-gateway/component-nat-gateway-diagram.png" alt="Screenshot of an isometric Cloudcraft diagram showing the 'NAT gateway' AWS component." responsive="true" style="width:60%;">}}

## ツールバー

ツールバーを使用して、コンポーネントの構成とカスタマイズを行います。以下のオプションがあります。

- **Color**: 定義済みの色を選択するか、コンポーネントとそのアクセントの色の 16 進値を入力します。コンポーネントは、2D ビューと 3D ビューの両方に同じ色を使用することも、それぞれに異なる色を使用することもできます。
- **Data processed**: The total volume of data processed per month in gigabytes.
- **Rotate**: コンポーネントを回転させ、その方向を変更します。

## API

[Cloudcraft API][1] を使用して、プログラムでアーキテクチャ図にアクセスし、JSON オブジェクトとしてレンダリングします。

### スキーマ

The following is an example JSON of a NAT gateway component:

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

- **type: natgateway**: The type of component.
- **id: 文字列**: `uuid` 形式のコンポーネントの一意な識別子。
- **region: string**: The AWS region the gateway is deployed in. All global regions are supported except `cn-` regions.
- **mapPos: [数値, 数値]**: x 座標と y 座標のペアで表される、ブループリント内のコンポーネントの位置。
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

The NAT gateway component can be added to [VPCs][2] and [subnets][3].

[1]: https://developers.cloudcraft.co/
[2]: /cloudcraft/components-aws/vpc/
[3]: /cloudcraft/components-aws/subnet/
