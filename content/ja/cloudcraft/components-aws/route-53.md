---
title: "Route 53 Component"
---
## 概要

Use the Route 53 component to represent domains using the Route 53 DNS service from your Amazon Web Services architecture.

{{< img src="cloudcraft/components-aws/route-53/component-route-53-diagram.png" alt="Screenshot of an isometric Cloudcraft diagram showing the 'Route 53' AWS component." responsive="true" style="width:60%;">}}

## ツールバー

ツールバーを使用して、コンポーネントの構成とカスタマイズを行います。以下のオプションがあります。

- **Color**. Select a predefined color or enter the hexadecimal value of the color for the component and its accent. The component can use the same color for both the 2D and 3D view, or different colors for each.

## API

[Cloudcraft API][1] を使用して、プログラムでアーキテクチャ図にアクセスし、JSON オブジェクトとしてレンダリングします。

### スキーマ

The following is an example JSON of a Route 53 component:

```json
{
  "type": "r53",
  "id": "c311184b-2d15-4d29-9a17-bb33778f04c8",
  "mapPos": [5,12],
  "accentColor": {
    "2d": "#ffffff",
    "isometric": "#4286c5"
  },
  "color": {
    "2d": "#693cc5",
    "isometric": "#ececed"
  },
  "link": "https://blog.cloudcraft.co/",
  "locked": true
}
```

- **type: r53**: The type of component.
- **id: 文字列**: `uuid` 形式のコンポーネントの一意な識別子。
- **mapPos: [数値, 数値]**: x 座標と y 座標のペアで表される、ブループリント内のコンポーネントの位置。
- **accentColor: オブジェクト**: ブロック上にコンポーネントロゴを表示するために使用されるアクセントカラー。
  - **isometric: 文字列**: 3D ビューでのコンポーネントのアクセントカラー。16 進数で指定します。
  - **2d: 文字列**: 2D ビューでのコンポーネントのアクセントカラー。16 進数で指定します。
- **color: オブジェクト**: コンポーネント本体の塗りつぶし色。
  - **isometric: 文字列**: 3D ビューでのコンポーネントの塗りつぶし色。16 進数で指定します。
  - **2d: 文字列**: 2D ビューでのコンポーネントの塗りつぶし色。16 進数で指定します。
- **link: uri**: Link the component to another diagram using the `blueprint://id` format or to an external website using the `https://link` format.
- **locked: ブール値**: `true` の場合、アプリケーションを使用してコンポーネントに加えられた変更は、ロックが解除されるまで無効になります。

[1]: https://developers.cloudcraft.co/
