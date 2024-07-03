---
title: Availability Zone Component
---
## 概要

Availability Zone コンポーネントを使用して、Amazon Web Services アーキテクチャの Availability Zone を表現します。

{{< img src="cloudcraft/components-aws/availability-zone/component-availability-zone-diagram.png" alt="'Availability zone' AWS コンポーネントを示す、等角投影された Cloudcraft 図のスクリーンショット。" responsive="true" style="width:60%;">}}

## ツールバー

ツールバーを使用して、コンポーネントの構成とカスタマイズを行います。以下のオプションがあります。

- **Color**: 定義済みの色を選択するか、コンポーネントの色の 16 進値を入力します。コンポーネントは、2D ビューと 3D ビューの両方に同じ色を使用することも、それぞれに異なる色を使用することもできます。
- **Raise**: Availability Zone コンポーネントを他のアベイラビリティゾーンより高くします。
- **Lower**: Availability Zone コンポーネントを他のアベイラビリティゾーンより低くします。

## API

[Cloudcraft API][1] を使用して、プログラムでアーキテクチャ図にアクセスし、JSON オブジェクトとしてレンダリングします。

### スキーマ

以下は、Availability Zone コンポーネントの JSON オブジェクトの例です。

```json
{
  "type": "zone",
  "id": "a46cfaf2-ce78-4d44-9a41-a55fc7cd4ceb",
  "region": "us-east-2",
  "mapPos": [-6.75, 10.25],
  "mapSize": [2.5, 2.5],
  "color": {
    "2d": "#000000",
    "isometric": "#000000"
  },
  "link": "blueprint://34b7a049-e92b-4146-b937-7eee9ae788b5",
  "locked": true
}
```

- **type: zone**: コンポーネントのタイプ。
- **id: 文字列**: `uuid` 形式のコンポーネントの一意な識別子。
- **region: 文字列**: アベイラビリティゾーンが属する AWS リージョン。`cn-` リージョン以外のすべてのグローバルリージョンがサポートされています。
- **mapPos: [数値, 数値]**: x 座標と y 座標のペアで表される、ブループリント内のコンポーネントの位置。
- **mapSize: [数値, 数値]**: ブループリント内のアベイラビリティゾーンのサイズ。
- **color: オブジェクト**: アベイラビリティゾーンの塗りつぶし色。
  - **isometric: 文字列**: 3D ビューでのコンポーネントの塗りつぶし色。16 進数で指定します。
  - **2d: 文字列**: 2D ビューでのコンポーネントの塗りつぶし色。16 進数で指定します。
- **link: uri**: コンポーネントを、`blueprint://ID` フォーマットを使用して別の図にリンクするか、`https://LINK` フォーマットを使用して外部の Web サイトにリンクします。
- **locked: ブール値**: `true` の場合、アプリケーションを使用してコンポーネントに加えられた変更は、ロックが解除されるまで無効になります。

[1]: https://developers.cloudcraft.co/