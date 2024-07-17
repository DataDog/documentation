---
title: Service Bus トピックコンポーネント
---

## Overview

Service Bus トピックコンポーネントを使用すると、Azure 環境のクラウドメッセージングをサービスインテグレーションとして表現して視覚化できます。

{{< img src="cloudcraft/components-azure/service-bus-topic/component-service-bus-topic-diagram.png" alt="相互接続された Azure コンポーネントを示す、等角投影された Cloudcraft 図のスクリーンショット。" responsive="true" style="width:60%;">}}

## Toolbar

Use the toolbar to configure and customize the component. The following options are available:

- **Color**: Select accent and fill colors for the body of the component in 3D view.
- **Tier**: Service Bus トピックのサービス階層を選択します。
- **Operations (M/month)**: Enter the number of monthly operations in millions. Not available for service tier Premium.
- **Brokered connections**: トピックで仲介された接続数を入力します。Standard のサービス階層でのみ利用できます。
- **Hybrid connections**: トピックのハイブリッド接続数を入力します。Standard のサービス階層でのみ利用できます。
- **Data transfer (GB)**: Enter the total volume of data transfered monthly in gigabytes. Only available on service tier Standard.
- **Relay hours**: トピックの中継時間数を入力します。Standard のサービス階層でのみ利用できます。
- **Relay messages (K/mo)**: Enter the number of monthly relayed messages in thousands. Only available on service tier Standard.

## API

[Cloudcraft API][1] を使用して、プログラムでアーキテクチャ図にアクセスし、JSON オブジェクトとしてレンダリングします。以下は、Service Bus トピックコンポーネントの JSON オブジェクトの例です。

### スキーマ

```json
{
    "type": "azuresbtopic",
    "id": "3c9f4d24-3653-4da5-a6a5-e375448aff4e",
    "region": "northcentralus",
    "mapPos": [4,2],
    "tier": "Standard",
    "operationsPerMonth": 0,
    "brokeredConnections": 0,
    "hybridConnections": 0,
    "dataTransferGb": 0,
    "relayHours": 0,
    "relayMessages": 0,
    "color": {
        "isometric": null,
        "2d": null
    },
    "accentColor": {
        "isometric": null,
        "2d": null
    },
    "link": "https://azure.microsoft.com/products/service-bus",
    "locked": true
}
```

- **type: 文字列**: コンポーネントのタイプ。このコンポーネントの値 `azuresbtopic` の文字列でなければなりません。
- **id: string, uuid**: The unique identifier for the component. The API uses a UUID v4 internally but accepts any unique string.
- **resourceId: string**: The globally unique identifier for the component within Azure.
- **region: string**: The Azure region for the component. The API supports all global regions, except China.
- **mapPos: array**: The position of the component in the blueprint. The API uses a unique X and Y coordinate pair to express positioning.
- **tier: 文字列**: トピックのサービス階層。`Standard` または `Premium` の 2 つの値のいずれかを指定します。デフォルトは `Standard` です。
- **operationsPerMonth: number**: The number of operations per month in millions. Defaults to `0`.
- **brokeredConnections: 数値**: トピックで仲介された接続数。デフォルトは `0` です。
- **hybridConnections: 数値**: トピックのハイブリッド接続数。デフォルトは `0` です。
- **dataTransferGb: number**: The total volume of data transfered monthly in gigabytes. Defaults to `0`.
- **relayHours: 数値**: トピックで中継された時間数。デフォルトは `0` です。
- **relayMessages: number**: The number of relayed messages per month in thousands. Defaults to `0`.
- **color: object**: The fill color for the component body.
  - **isometric: string**: A hexadecimal color for the component body in 3D view. Defaults to `#CEE0F5`.
  - **2d: string**: A hexadecimal color for the component body in 2D view. Defaults to `null`.
- **accentColor: object**: The accent color for the component logo.
  - **isometric: string**: A hexadecimal color for the component logo in 3D view. Defaults to `#0078D4`.
  - **2d: string**: A hexadecimal color for the component logo in 2D view. Defaults to `null`.
- **link: string, uri**: A URI that links the component to another diagram or an external website. Accepts one of two formats, `blueprint://` or `https://`.
- **locked: boolean**: Whether to allow changes to the position of the component through the web interface. Defaults to `false`.

[1]: https://developers.cloudcraft.co/