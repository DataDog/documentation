---
title: Cache for Redis Component
---

## 概要

You can use the Cache for Redis component to represent and visualize the Redis caches from your Azure environment.

{{< img src="cloudcraft/components-azure/cache-for-redis/component-cache-for-redis-diagram.png" alt="Screenshot of an isometric Cloudcraft diagram showing interconnected Azure components." responsive="true" style="width:60%;">}}

## ツールバー

ツールバーを使用して、コンポーネントの構成とカスタマイズを行います。以下のオプションがあります。

- **Color**: 3D ビューでコンポーネント本体のアクセントカラーと塗りつぶしカラーを選択します。
- **Tier**: Select the performance tier for your Redis cache.
- **Type**: Select the instance type of your Redis cache. Changing the instance type changes the hardware details shown in the toolbar to reflect what is used by the hypervisor.

## API

Use [the Cloudcraft API][1] to programmatically access and render your architecture diagrams as JSON objects. The following is an example JSON object of a Cache for Redis component:

### スキーマ

```json
{
    "type": "azureredis",
    "id": "e73c3831-83bf-4bbc-98e9-f5731cb0e437",
    "region": "northcentralus",
    "mapPos": [5,0],
    "tier": "Basic",
    "instance": "C0"
    "color": {
        "isometric": null,
        "2d": null
    },
    "accentColor": {
        "isometric": null,
        "2d": null
    },
    "link": "https://azure.microsoft.com/products/cache",
    "locked": true
}
```

- **type: string**: The type of component. Must be a string of value `azureredis` for this component.
- **id: 文字列、uuid**: コンポーネントの一意な識別子。API は内部的に UUID v4 を使用しますが、任意の一意な文字列を受け付けます。
- **resourceId: 文字列**: Azure 内のコンポーネントのグローバルに一意な識別子。
- **region: 文字列**: コンポーネントの Azure リージョン。API は、中国を除くすべてのグローバルリージョンをサポートしています。
- **mapPos: 配列**: ブループリント内のコンポーネントの位置。API では、一意の X 座標と Y 座標のペアを使用して位置を表現します。
- **tier: string**: The performance tier of the Redis cache.  Accepts one of three values, `Basic`, `Standard`,or `Premium`. Defaults to `Basic`.
- **instance: string**: The instance type of the Redis cache. Defaults to `C0`.
- **color: オブジェクト**: コンポーネント本体の塗りつぶし色。
  - **isometric: string**: A hexadecimal color for the component body in 3D view. Defaults to `#D82F27`.
  - **2d: 文字列**: 2D ビューでのコンポーネント本体の 16 進数カラー。デフォルトは `null` です。
- **accentColor: オブジェクト**: コンポーネントロゴのアクセントカラー。
  - **isometric: string**: A hexadecimal color for the component logo in 3D view. Defaults to `#FFFFFF`.
  - **2d: 文字列**: 2D ビューでのコンポーネントロゴの 16 進数カラー。デフォルトは `null` です。
- **link: 文字列、uri**: コンポーネントを別の図や外部の Web サイトにリンクする URI。`blueprint://` または `https://` の 2 つの形式のどちらかを指定します。
- **locked: ブール値**: Web インターフェイスを通してコンポーネントの位置の変更を許可するかどうか。デフォルトは `false` です。

[1]: https://developers.cloudcraft.co/