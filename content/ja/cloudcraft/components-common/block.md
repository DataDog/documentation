---
title: "Block Component"
---
## 概要

ブロックは、利用可能なコンポーネントの中で最も基本的なものです。画像やアイコンと共に、まだ利用可能でないクラウドコンポーネントを表現するために使用することができます。

{{< img src="cloudcraft/components-common/block/component-block.png" alt="Cloudcraft のブロックコンポーネントの 3D 表現のスクリーンショット" responsive="true" style="width:60%;">}}

## ツールバー

ツールバーを使用して、コンポーネントの構成とカスタマイズを行います。以下のオプションがあります。

- **Color**: 定義済みの色を選択するか、希望する色の 16 進値を入力します。2D ビューと 3D ビューの両方に同じ色を使用することも、それぞれで異なる色を選択することもできます。
- **Width**: ブロックコンポーネントの幅を選択します。
- **Height**: ブロックコンポーネントの高さを選択します。
- **Depth**: ブロックコンポーネントの奥行を選択します。

## API

[Cloudcraft API][1] を使用して、プログラムでアーキテクチャ図にアクセスし、JSON オブジェクトとしてレンダリングします。以下は、ブロックコンポーネントの JSON オブジェクトの例です。

```json
{
  "type": "block",
  "id": "76cddb57-6368-4e8b-805f-1306f558812b",
  "mapPos": [3, 9],
  "width": 2,
  "height": 1,
  "depth": 2,
  "color": {
    "isometric": "#ececed",
    "2d": "#4286c5"
  },
  "locked": true,
  "link": "blueprint://34b7a049-e92b-4146-b937-7eee9ae788b5"
}
```

- **type: ブロック**: コンポーネントのタイプ。
- **id: 文字列**: `uuid` 形式のコンポーネントの一意な識別子。
- **mapPos: [数値, 数値]**: x 座標と y 座標のペアで表される、ブループリント内のコンポーネントの位置。
- **width: 数値**: ブロックコンポーネントの幅。デフォルトは 2 です。
- **height: 数値**: ブロックコンポーネントの高さ。デフォルトは 1 です。
- **depth: 数値**: ブロックコンポーネントの奥行。デフォルトは 2 です。
- **color: オブジェクト**: コンポーネント本体の塗りつぶし色。
  - **isometric: 文字列**: 3D ビューでのコンポーネントの塗りつぶし色。16 進数で指定します。
  - **2d: 文字列**: 2D ビューでのコンポーネントの塗りつぶし色。16 進数で指定します。
- **link: uri**: コンポーネントを、`blueprint://ID` フォーマットで別の図にリンクするか、`https://LINK` フォーマットで外部の Web サイトにリンクします。
- **locked: ブール値**: true の場合、アプリケーション通じたコンポーネントへの変更は、ロックが解除されるまで無効になります。

ブロックコンポーネントは [VPCs][2]、[セキュリティグループ][3]、[サブネット][4]に追加することができます。

[1]: https://developers.cloudcraft.co/
[2]: https://help.cloudcraft.co/article/118-component-vpc
[3]: https://help.cloudcraft.co/article/119-component-security-group
[4]: /cloudcraft/components-aws/subnet/
