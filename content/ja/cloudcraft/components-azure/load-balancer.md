---
title: Load Balancer コンポーネント
---

## Overview

Load Balancer コンポーネントを使用すると、Azure 環境のロードバランサーを表現して視覚化できます。

{{< img src="cloudcraft/components-azure/load-balancer/component-load-balancer-diagram.png" alt="Azure Load Balancer コンポーネントに相互接続された仮想マシンコンポーネントを示す、等角投影された Cloudcraft 図のスクリーンショット。" responsive="true" style="width:60%;">}}

## Toolbar

Use the toolbar to configure and customize the component. The following options are available:

- **Color**: Select accent and fill colors for the body of the component in 3D view.
- **SKU**: ロードバランサーのサービスレベル階層を選択します。
- **Tier**: ロードバランサーのネットワーク階層を選択します。このオプションは Basic SKU と Gateway SKU では利用できません。
- **Number of rules**: 構成された負荷分散ルールの数を入力します。このオプションは Gateway SKU では利用できません。
- **Chains**: ロードバランサーのチェーン時間数を入力します。このオプションは Basic SKU および Standard SKU では利用できません。
- **Data processed (GB)**: ロードバランサーがひと月に処理するデータの総量をギガバイト単位で入力します。

## API

[Cloudcraft API][1] を使用して、プログラムでアーキテクチャ図にアクセスし、JSON オブジェクトとしてレンダリングします。以下は、Load Balancer コンポーネントの JSON オブジェクトの例です。

### Schema

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

- **type: 文字列**: コンポーネントのタイプ。このコンポーネントの値 `azurelb` の文字列でなければなりません。
- **id: string, uuid**: The unique identifier for the component. The API uses a UUID v4 internally but accepts any unique string.
- **resourceId: string**: The globally unique identifier for the component within Azure.
- **region: string**: The Azure region for the component. The API supports all global regions, except China.
- **mapPos: array**: The position of the component in the blueprint. The API uses a unique X and Y coordinate pair to express positioning.
- **skuName: 文字列**: ロードバランサーのサービスレベル。`Basic`、`Standard`、`Gateway` の 3 つの値のいずれかを指定します。デフォルトは `Standard` です。
- **tier: 文字列**: ロードバランサーのネットワーク階層。`Regional` と `Global` の 2 つの値のいずれかを指定します。デフォルトは `Regional` です。
- **numberOfRules: 数値**: ロードバランサーのルール数。デフォルトは `1` です。
- **chains: 数値**: ロードバランサーのチェーン時間数。デフォルトは `0` です。
- **dataGb: 数値**: ロードバランサーが処理したデータの月間総量 (ギガバイト単位)。デフォルトは `0` です。
- **color: object**: The fill color for the component body.
  - **isometric: string**: A hexadecimal color for the component body in 3D view. Defaults to `#ececed`.
  - **2d: string**: A hexadecimal color for the component body in 2D view. Defaults to `null`.
- **accentColor: object**: The accent color for the component logo.
  - **isometric: 文字列**: 3D ビューでのコンポーネントロゴの 16 進数カラー。デフォルトは `#0078d4` です。
  - **2d: string**: A hexadecimal color for the component logo in 2D view. Defaults to `null`.
- **link: string, uri**: A URI that links the component to another diagram or an external website. Accepts one of two formats, `blueprint://` or `https://`.
- **locked: boolean**: Whether to allow changes to the position of the component through the web interface. Defaults to `false`.

[1]: https://developers.cloudcraft.co/