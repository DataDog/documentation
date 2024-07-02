---
title: "Load Balancer Component"
---

## 概要

You can use the Load Balancer component to represent and visualize load balancers from your Azure environment.

{{< img src="cloudcraft/components-azure/load-balancer/component-load-balancer-diagram.png" alt="Screenshot of an isometric Cloudcraft diagram showing virtual machine components interconnected to an Azure load balancer component." responsive="true" style="width:60%;">}}

## ツールバー

ツールバーを使用して、コンポーネントの構成とカスタマイズを行います。以下のオプションがあります。

- **Color**: 3D ビューでコンポーネント本体のアクセントカラーと塗りつぶしカラーを選択します。
- **SKU**: Select the service level tier for your load balancer.
- **Tier**: Select the network tier for your load balancer. This option is not available for Basic and Gateway SKUs.
- **Number of rules**: Enter the number of configured load-balancing rules. This option is not available for Gateway SKUs.
- **Chains**: Enter the number of chain hours for the load balancer. This option is not available for Basic and Standard SKUs.
- **Data processed (GB)**: Enter the total volume of data processed per month by your load balancer in gigabytes.

## API

Use [the Cloudcraft API][1] to programmatically access and render your architecture diagrams as JSON objects. The following is an example JSON object of a Load Balancer component:

### スキーマ

```json
{
  "type": "azurelb",
  "id": "e0faf7c6-546b-44b3-a9c3-82f1c7f6d58f",
  "resourceId": "/subscriptions/6e0770d5-22cb-476a-98e3-3a46b2b2aa8d/resourceGroups/CLOUDCRAFT/providers/Microsoft.Network/loadBalancers/doc-team-lb",
  "region": "eastus",
  "mapPos": [1, 5],
  "skuName": "Standard",
  "tier": "Regional",
  "numberOfRules": 1,
  "chains": 0,
  "dataGb": 0,
  "color": {
    "isometric": "#ECECED",
    "2d": "null"
  },
  "accentColor": {
    "isometric": "#0078D4",
    "2d": "null"
  },
  "link": "https://azure.microsoft.com/products/load-balancer/",
  "locked": true
}
```

- **type: string**: The type of component. Must be a string of value `azurelb` for this component.
- **id: 文字列、uuid**: コンポーネントの一意な識別子。API は内部的に UUID v4 を使用しますが、任意の一意な文字列を受け付けます。
- **resourceId: 文字列**: Azure 内のコンポーネントのグローバルに一意な識別子。
- **region: 文字列**: コンポーネントの Azure リージョン。API は、中国を除くすべてのグローバルリージョンをサポートしています。
- **mapPos: 配列**: ブループリント内のコンポーネントの位置。API では、一意の X 座標と Y 座標のペアを使用して位置を表現します。
- **skuName: string**: The service level for the load balancer. Accepts one of three values, `Basic`, `Standard`, or `Gateway`. Defaults to `Standard`.
- **tier: string**: The network tier for the load balancer. Accepts one of two values, `Regional` or `Global`. Defaults to `Regional`.
- **numberOfRules: number**: The number of rules for the load balancer. Defaults to `1`.
- **chains: number**: The number of chain hours for the load balancer. Defaults to `0`.
- **dataGb: number**: The total volume of monthly data processed by the load balancer in gigabytes. Defaults to `0`.
- **color: オブジェクト**: コンポーネント本体の塗りつぶし色。
  - **isometric: 文字列**: 3D ビューでのコンポーネント本体の 16 進数カラー。デフォルトは `#ececed` です。
  - **2d: 文字列**: 2D ビューでのコンポーネント本体の 16 進数カラー。デフォルトは `null` です。
- **accentColor: オブジェクト**: コンポーネントロゴのアクセントカラー。
  - **isometric: string**: A hexadecimal color for the component logo in 3D view. Defaults to `#0078d4`.
  - **2d: 文字列**: 2D ビューでのコンポーネントロゴの 16 進数カラー。デフォルトは `null` です。
- **link: 文字列、uri**: コンポーネントを別の図や外部の Web サイトにリンクする URI。`blueprint://` または `https://` の 2 つの形式のどちらかを指定します。
- **locked: ブール値**: Web インターフェイスを通してコンポーネントの位置の変更を許可するかどうか。デフォルトは `false` です。

[1]: https://developers.cloudcraft.co/
