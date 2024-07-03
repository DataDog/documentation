---
title: API Management Component
---

## 概要

You can use the API Management component to represent and visualize management platforms for APIs from your Azure environment.

{{< img src="cloudcraft/components-azure/api-management/component-api-management-diagram.png" alt="Screenshot of an isometric Cloudcraft diagram showing interconnected Azure components." responsive="true" style="width:60%;">}}

## ツールバー

ツールバーを使用して、コンポーネントの構成とカスタマイズを行います。以下のオプションがあります。

- **Color**: 3D ビューでコンポーネント本体のアクセントカラーと塗りつぶしカラーを選択します。
- **Tier**: Select the service tier for your API management platform.
- **Calls**: Enter the total number of calls to the API. Only available for the **Consumption** tier.
- **Units**: Enter the number of units for the API management platform. Only available for the **Premium** tier.
- **Self-hosted gateways**: Enter the number of self-hosted API gateways. Only available for the **Premium** tier.
- **Rotate item**: Rotate the component relative to the blueprint. Only available in 3D view.

## API

Use [the Cloudcraft API][1] to programmatically access and render your architecture diagrams as JSON objects. The following is an example JSON object of an API Management component:

### スキーマ

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

- **type: string**: The type of component. Must be a string of value `azureapimanagement` for this component.
- **id: 文字列、uuid**: コンポーネントの一意な識別子。API は内部的に UUID v4 を使用しますが、任意の一意な文字列を受け付けます。
- **resourceId: 文字列**: Azure 内のコンポーネントのグローバルに一意な識別子。
- **region: 文字列**: コンポーネントの Azure リージョン。API は、中国を除くすべてのグローバルリージョンをサポートしています。
- **mapPos: 配列**: ブループリント内のコンポーネントの位置。API では、一意の X 座標と Y 座標のペアを使用して位置を表現します。
- **tier: string**: The service tier for the API management platform. [See Azure's documentation for more information][2]. Defaults to `Consumption`.
- **calls: number**: The number of calls to the API. Defaults to `0`.
- **units: number**: The number of units for the API management platform. Defaults to `1`.
- **gateways: number**: The number of self-hosted API gateways. Defaults to `0`.
- **direction: string**: The direction of the component in relation to the blueprint. Accepts one of two values, `down` or `right`. Defaults to `down`.
- **color: オブジェクト**: コンポーネント本体の塗りつぶし色。
  - **isometric: string**: A hexadecimal color for the component body in 3D view. Defaults to `#075693`.
  - **2d: 文字列**: 2D ビューでのコンポーネント本体の 16 進数カラー。デフォルトは `null` です。
- **accentColor: オブジェクト**: コンポーネントロゴのアクセントカラー。
  - **isometric: string**: A hexadecimal color for the component logo in 3D view. Defaults to `#2EC8EA`.
  - **2d: 文字列**: 2D ビューでのコンポーネントロゴの 16 進数カラー。デフォルトは `null` です。
- **link: 文字列、uri**: コンポーネントを別の図や外部の Web サイトにリンクする URI。`blueprint://` または `https://` の 2 つの形式のどちらかを指定します。
- **locked: ブール値**: Web インターフェイスを通してコンポーネントの位置の変更を許可するかどうか。デフォルトは `false` です。

[1]: https://developers.cloudcraft.co/
[2]: https://learn.microsoft.com/en-us/azure/api-management/api-management-features