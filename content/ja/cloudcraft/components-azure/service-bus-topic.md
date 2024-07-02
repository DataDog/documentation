---
title: "Service bus topic Component"
---

## 概要

You can use the Service Bus Topic component to represent and visualize cloud messaging as a service integrations from your Azure environment.

{{< img src="cloudcraft/components-azure/service-bus-topic/component-service-bus-topic-diagram.png" alt="Screenshot of an isometric Cloudcraft diagram showing interconnected Azure components." responsive="true" style="width:60%;">}}

## ツールバー

ツールバーを使用して、コンポーネントの構成とカスタマイズを行います。以下のオプションがあります。

- **Color**: 3D ビューでコンポーネント本体のアクセントカラーと塗りつぶしカラーを選択します。
- **Tier**: Select the service tier for your service bus topic.
- **Operations (M/month)**: 1 か月ごとのオペレーション数を百万単位で入力します。Premium のサービス階層では利用できません。
- **Brokered connections**: Enter the number of brokered connections for your topic. Only available on service tier Standard.
- **Hybrid connections**: Enter the number of hybrid connections for your topic. Only available on service tier Standard.
- **Data transfer (GB)**: 1 か月間で転送されたデータの総量をギガバイト単位で入力します。Standard のサービス階層でのみ利用できます。
- **Relay hours**: Enter the number of relay hours for your topic. Only available on service tier Standard.
- **Relay messages (K/mo)**: 1 か月間で中継されたメッセージ数を千件単位で入力します。Standard のサービス階層でのみ利用できます。

## API

Use [the Cloudcraft API][1] to programmatically access and render your architecture diagrams as JSON objects. The following is an example JSON object of a Service bus topic component:

### Schema

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

- **type: string**: The type of component. Must be a string of value `azuresbtopic` for this component.
- **id: 文字列、uuid**: コンポーネントの一意な識別子。API は内部的に UUID v4 を使用しますが、任意の一意な文字列を受け付けます。
- **resourceId: 文字列**: Azure 内のコンポーネントのグローバルに一意な識別子。
- **region: 文字列**: コンポーネントの Azure リージョン。API は、中国を除くすべてのグローバルリージョンをサポートしています。
- **mapPos: 配列**: ブループリント内のコンポーネントの位置。API では、一意の X 座標と Y 座標のペアを使用して位置を表現します。
- **tier: string**: The service tier for the topic. Accepts one of two values, `Standard` or `Premium`. Defaults to `Standard`.
- **operationsPerMonth: 数値**: ひと月ごとのオペレーション数 (単位は百万)。デフォルトは `0` です。
- **brokeredConnections: number**: The number of brokered connections for the topic. Defaults to `0`.
- **hybridConnections: number**: The number of hybrid connections for the topic. Defaults to `0`.
- **dataTransferGb: 数値**: 1 か月間で転送されたデータの総量 (ギガバイト単位)。デフォルトは `0` です。
- **relayHours: number**: The number of relayed hours for the topic. Defaults to `0`.
- **relayMessages: 数値**: 1 か月間で中継されたメッセージ数 (千件単位)。デフォルトは `0` です。
- **color: オブジェクト**: コンポーネント本体の塗りつぶし色。
  - **isometric: 文字列**: 3D ビューでのコンポーネント本体の 16 進数カラー。デフォルトは `#CEE0F5` です。
  - **2d: 文字列**: 2D ビューでのコンポーネント本体の 16 進数カラー。デフォルトは `null` です。
- **accentColor: オブジェクト**: コンポーネントロゴのアクセントカラー。
  - **isometric: 文字列**: 3D ビューでのコンポーネントロゴの 16 進数カラー。デフォルトは `#0078D4` です。
  - **2d: 文字列**: 2D ビューでのコンポーネントロゴの 16 進数カラー。デフォルトは `null` です。
- **link: 文字列、uri**: コンポーネントを別の図や外部の Web サイトにリンクする URI。`blueprint://` または `https://` の 2 つの形式のどちらかを指定します。
- **locked: ブール値**: Web インターフェイスを通してコンポーネントの位置の変更を許可するかどうか。デフォルトは `false` です。

[1]: https://developers.cloudcraft.co/
