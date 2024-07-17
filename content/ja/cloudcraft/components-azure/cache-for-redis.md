---
title: Cache for Redis コンポーネント
---

## Overview

Cache for Redis コンポーネントを使用すると、Azure 環境の Redis キャッシュを表現して視覚化できます。

{{< img src="cloudcraft/components-azure/cache-for-redis/component-cache-for-redis-diagram.png" alt="相互接続された Azure コンポーネントを示す、等角投影された Cloudcraft 図のスクリーンショット。" responsive="true" style="width:60%;">}}

## Toolbar

Use the toolbar to configure and customize the component. The following options are available:

- **Color**: Select accent and fill colors for the body of the component in 3D view.
- **Tier**: Redis キャッシュのパフォーマンス階層を選択します。
- **Type**: Redis キャッシュのインスタンスタイプを選択します。インスタンスのタイプを変更すると、ツールバーに表示されるハードウェアの詳細も変更され、ハイパーバイザーによって使用されるものが反映されます。

## API

[Cloudcraft API][1] を使用して、プログラムでアーキテクチャ図にアクセスし、JSON オブジェクトとしてレンダリングします。以下は、Cache for Redis コンポーネントの JSON オブジェクトの例です。

### Schema

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

- **type: 文字列**: コンポーネントのタイプ。このコンポーネントの値 `azureredis` の文字列でなければなりません。
- **id: string, uuid**: The unique identifier for the component. The API uses a UUID v4 internally but accepts any unique string.
- **resourceId: string**: The globally unique identifier for the component within Azure.
- **region: string**: The Azure region for the component. The API supports all global regions, except China.
- **mapPos: array**: The position of the component in the blueprint. The API uses a unique X and Y coordinate pair to express positioning.
- **tier: 文字列**: Redis キャッシュのパフォーマンス階層。 `Basic`、`Standard`、`Premium` の 3 つの値のいずれかを指定します。デフォルトは `Basic` です。
- **instance: 文字列**: Redis キャッシュのインスタンスタイプ。デフォルトは `C0` です。
- **color: object**: The fill color for the component body.
  - **isometric: 文字列**: 3D ビューでのコンポーネント本体の 16 進数カラー。デフォルトは `#D82F27` です。
  - **2d: string**: A hexadecimal color for the component body in 2D view. Defaults to `null`.
- **accentColor: object**: The accent color for the component logo.
  - **isometric: 文字列**: 3D ビューでのコンポーネントロゴの 16 進数カラー。デフォルトは `#FFFFFF` です。
  - **2d: string**: A hexadecimal color for the component logo in 2D view. Defaults to `null`.
- **link: string, uri**: A URI that links the component to another diagram or an external website. Accepts one of two formats, `blueprint://` or `https://`.
- **locked: boolean**: Whether to allow changes to the position of the component through the web interface. Defaults to `false`.

[1]: https://developers.cloudcraft.co/