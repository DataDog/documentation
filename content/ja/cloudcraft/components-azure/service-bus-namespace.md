---
title: "Service bus namespace Component"
---

## 概要

You can use the Service Bus Namespace component to represent and visualize cloud messaging as a service integrations from your Azure environment.

{{< img src="cloudcraft/components-azure/service-bus-namespace/component-service-bus-namespace-diagram.png" alt="Screenshot of an isometric Cloudcraft diagram showing interconnected Azure components." responsive="true" style="width:60%;">}}

## ツールバー

ツールバーを使用して、コンポーネントの構成とカスタマイズを行います。以下のオプションがあります。

- **Color**: 3D ビューでコンポーネント本体のアクセントカラーと塗りつぶしカラーを選択します。
- **Name**: Enter the name of your namespace.
- **Tier**: Select the service tier for your service bus namespace.
- **Messaging units**: Select the number of messaging units available for your namespace. Only available for the **Premium** tier.

## API

Use [the Cloudcraft API][1] to programmatically access and render your architecture diagrams as JSON objects. The following is an example JSON object of a Service bus namespace component:

### スキーマ

```json
{
    "type": "azuresbnamespace",
    "id": "5a5b710a-2a36-421b-9ac9-f94f545f8c46",
    "region": "northcentralus",
    "mapPos": [3,-1],
    "mapSize": [5,5],
    "nodes": [
        "3c9f4d24-3653-4da5-a6a5-e375448aff4e",
        "7f836b25-2a69-4be4-8b35-c0f67480eafd",
        "6bf0b7c5-20c4-46ac-8afb-48ea207c3961",
        "afb6e41c-32c6-4e6f-b11d-6606957e4588"
    ],
    "name": "Namespace",
    "tier": "Basic",
    "messagingUnits": 1,
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

- **type: string**: The type of component. Must be a string of value `azuresbnamespace` for this component.
- **id: 文字列、uuid**: コンポーネントの一意な識別子。API は内部的に UUID v4 を使用しますが、任意の一意な文字列を受け付けます。
- **resourceId: 文字列**: Azure 内のコンポーネントのグローバルに一意な識別子。
- **region: 文字列**: コンポーネントの Azure リージョン。API は、中国を除くすべてのグローバルリージョンをサポートしています。
- **mapPos: 配列**: ブループリント内のコンポーネントの位置。API では、一意の X 座標と Y 座標のペアを使用して位置を表現します。
- **mapSize: array**: The size of the component in the blueprint. The API uses a unique X and Y coordinate pair to express size.
- **nodes: array**: The services running inside the namespace. Accepts an array of unique identifiers for the [Service Bus Queue][2] and [Service Bus Topic][3] components.
- **name: string**: The name of the namespace. Defaults to `Namespace`.
- **tier: string**: The service tier for the namespace. Accepts one of three values, `Basic`, `Standard`, and `Premium`. Defaults to `Basic`.
- **messagingUnits: number**: The number of messaging units available for the namespace. Accepts a number from `1` to `16`. Defaults to `1`.
- **color: オブジェクト**: コンポーネント本体の塗りつぶし色。
  - **isometric: 文字列**: 3D ビューでのコンポーネント本体の 16 進数カラー。デフォルトは `#CEE0F5` です。
  - **2d: 文字列**: 2D ビューでのコンポーネント本体の 16 進数カラー。デフォルトは `null` です。
- **accentColor: オブジェクト**: コンポーネントロゴのアクセントカラー。
  - **isometric: 文字列**: 3D ビューでのコンポーネントロゴの 16 進数カラー。デフォルトは `#0078D4` です。
  - **2d: 文字列**: 2D ビューでのコンポーネントロゴの 16 進数カラー。デフォルトは `null` です。
- **link: 文字列、uri**: コンポーネントを別の図や外部の Web サイトにリンクする URI。`blueprint://` または `https://` の 2 つの形式のどちらかを指定します。
- **locked: ブール値**: Web インターフェイスを通してコンポーネントの位置の変更を許可するかどうか。デフォルトは `false` です。

[1]: https://developers.cloudcraft.co/
[2]: https://help.cloudcraft.co/article/189-component-service-bus-queue
[3]: https://help.cloudcraft.co/article/190-component-service-bus-topic
