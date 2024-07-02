---
title: "Bastion Component"
---

## 概要

You can use the Bastion component to represent and visualize bastion servers from your Azure environment.

{{< img src="cloudcraft/components-azure/bastion/component-bastion-diagram.png" alt="Screenshot of an isometric Cloudcraft diagram showing interconnected Azure components." responsive="true" style="width:60%;">}}

## ツールバー

ツールバーを使用して、コンポーネントの構成とカスタマイズを行います。以下のオプションがあります。

- **Color**: 3D ビューでコンポーネント本体のアクセントカラーと塗りつぶしカラーを選択します。
- **Tier**: Select the service level tier for your bastion server.
- **Scale units**: Enter the number of scale units for your bastion server. This option is only available for the Standard tier.
- **Outbound data transfer (GB)**: Enter the total volume of outbound data transferred by your bastion server in gigabytes.

## API

Use [the Cloudcraft API][1] to programmatically access and render your architecture diagrams as JSON objects. The following is an example JSON object of a Bastian component:

### スキーマ

```json
{
    "type": "azurebastion",
    "id": "efe6a642-dc6d-4ea3-ab3c-465358f10e15",
    "resourceId": "/subscriptions/14cc8259-0159-45d7-801b-2b209bac6e98/resourceGroups/CLOUDCRAFT/providers/Microsoft.Network/bastionHosts/BastionDoc",
    "region": "eastus",
    "mapPos": [2,10],
    "tier": "Basic",
    "scaleUnits": 1,
    "outboundDataTransfer": 0,
    "color": {
        "isometric": "#CEE0F5",
        "2d": "null"
    },
    "accentColor": {
        "isometric": "#0078D4",
        "2d": "null"
    },
    "link": "https://azure.microsoft.com/products/azure-bastion/",
    "locked": true
}
```

- **type: string**: The type of component. Must be a string of value `azurebastion` for this component.
- **id: 文字列、uuid**: コンポーネントの一意な識別子。API は内部的に UUID v4 を使用しますが、任意の一意な文字列を受け付けます。
- **resourceId: 文字列**: Azure 内のコンポーネントのグローバルに一意な識別子。
- **region: 文字列**: コンポーネントの Azure リージョン。API は、中国を除くすべてのグローバルリージョンをサポートしています。
- **mapPos: 配列**: ブループリント内のコンポーネントの位置。API では、一意の X 座標と Y 座標のペアを使用して位置を表現します。
- **tier: string**: The service level tier for the bastion server. Accepts one of two values, `Basic` or `Standard`. Defaults to `Standard`.
- **scaleUnits: number**: The number of scale units for the bastion server.
- **outboundDataTransfer: number**: The total volume of outbound data transferred by the bastion server in gigabytes. Defaults to `0`.
- **color: オブジェクト**: コンポーネント本体の塗りつぶし色。
  - **isometric: 文字列**: 3D ビューでのコンポーネント本体の 16 進数カラー。デフォルトは `#ececed` です。
  - **2d: 文字列**: 2D ビューでのコンポーネント本体の 16 進数カラー。デフォルトは `null` です。
- **accentColor: オブジェクト**: コンポーネントロゴのアクセントカラー。
  - **isometric: 文字列**: 3D ビューでのコンポーネントロゴの 16 進数カラー。デフォルトは `#0078d4` です。
  - **2d: 文字列**: 2D ビューでのコンポーネントロゴの 16 進数カラー。デフォルトは `null` です。
- **link: 文字列、uri**: コンポーネントを別の図や外部の Web サイトにリンクする URI。`blueprint://` または `https://` の 2 つの形式のどちらかを指定します。
- **locked: boolean**:. Whether to allow changes to the position of the component through the web interface. Defaults to `false`.

[1]: https://developers.cloudcraft.co/
