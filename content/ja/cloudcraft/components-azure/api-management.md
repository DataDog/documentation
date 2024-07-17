---
title: API Management コンポーネント
---

## Overview

API Management コンポーネントを使用すると、Azure 環境の API の管理プラットフォームを表現して視覚化できます。

{{< img src="cloudcraft/components-azure/api-management/component-api-management-diagram.png" alt="相互接続された Azure コンポーネントを示す、等角投影された Cloudcraft 図のスクリーンショット。" responsive="true" style="width:60%;">}}

## Toolbar

Use the toolbar to configure and customize the component. The following options are available:

- **Color**: Select accent and fill colors for the body of the component in 3D view.
- **Tier**: API 管理プラットフォームのサービス階層を選択します。
- **Calls**: API への合計呼び出し数を入力します。**Consumption** 階層でのみ利用可能です。
- **Units**: API 管理プラットフォームのユニット数を入力します。**Premium** 階層でのみ利用可能です。
- **Self-hosted gateways**: セルフホスト型 API ゲートウェイの数を入力します。**Premium** 階層でのみ利用可能です。
- **Rotate item**: コンポーネントをブループリントに対して相対的に回転します。3D ビューでのみ利用可能です。

## API

[Cloudcraft API][1] を使用して、プログラムでアーキテクチャ図にアクセスし、JSON オブジェクトとしてレンダリングします。以下は、API Management コンポーネントの JSON オブジェクトの例です。

### Schema

```json
{
    "type": "azureapimanagement",
    "id": "ccff5631-c1cd-4ed6-8d21-bb60e676fedf",
    "region": "northcentralus",
    "mapPos": [5,0.25],
    "tier": "Consumption",
    "calls": 0,
    "units": 1,
    "gateways": 0,
    "direction": "down",
    "color": {
        "isometric": null,
        "2d": null
    },
    "accentColor": {
        "isometric": null,
        "2d": null
    },
    "link": "https://azure.microsoft.com/products/api-management/",
    "locked": true
}
```

- **type: 文字列**: コンポーネントのタイプ。このコンポーネントの値 `azureapimanagement` の文字列でなければなりません。
- **id: string, uuid**: The unique identifier for the component. The API uses a UUID v4 internally but accepts any unique string.
- **resourceId: string**: The globally unique identifier for the component within Azure.
- **region: string**: The Azure region for the component. The API supports all global regions, except China.
- **mapPos: array**: The position of the component in the blueprint. The API uses a unique X and Y coordinate pair to express positioning.
- **tier: 文字列**: API 管理プラットフォームのサービス階層。[詳しくは、Azure のドキュメントを参照してください][2]。デフォルトは `Consumption` です。
- **calls: 数値**: API の呼び出し回数。デフォルトは `0` です。
- **units: 数値**: API 管理プラットフォームのユニット数。デフォルトは `1` です。
- **gateways: 数値**: セルフホスト型 API ゲートウェイの数。デフォルトは `0` です。
- **direction: 文字列**: ブループリントに対するコンポーネントの方向。`down` と `right` の 2 つの値のどちらかを指定します。デフォルトは `down` です。
- **color: object**: The fill color for the component body.
  - **isometric: 文字列**: 3D ビューでのコンポーネント本体の 16 進数カラー。デフォルトは `#075693` です。
  - **2d: string**: A hexadecimal color for the component body in 2D view. Defaults to `null`.
- **accentColor: object**: The accent color for the component logo.
  - **isometric: 文字列**: 3D ビューでのコンポーネントロゴの 16 進数カラー。デフォルトは `#2EC8EA` です。
  - **2d: string**: A hexadecimal color for the component logo in 2D view. Defaults to `null`.
- **link: string, uri**: A URI that links the component to another diagram or an external website. Accepts one of two formats, `blueprint://` or `https://`.
- **locked: boolean**: Whether to allow changes to the position of the component through the web interface. Defaults to `false`.

[1]: https://developers.cloudcraft.co/
[2]: https://learn.microsoft.com/en-us/azure/api-management/api-management-features