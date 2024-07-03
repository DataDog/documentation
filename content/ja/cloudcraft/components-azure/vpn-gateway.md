---
title: VPN gateway Component
---

## 概要

You can use the **VPN Gateway** component to represent and visualize private connections from your Azure environment.

{{< img src="cloudcraft/components-azure/vpn-gateway/component-vpn-gateway-diagram.png" alt="Screenshot of an isometric Cloudcraft diagram showing interconnected Azure components." responsive="true" style="width:60%;">}}


## ツールバー

ツールバーを使用して、コンポーネントの構成とカスタマイズを行います。以下のオプションがあります。

- **Color**: コンポーネント本体の塗りつぶし色とシンボルのアクセントカラーを選択します。2D ビューと 3D ビューで同じ色を使用することも、それぞれ異なる色を使用することもできます。
- **Gateway type**: Select the type of virtual network gateway you want to represent.
- **SKU**: Select the SKU of the virtual network gateway you want to represent.
- **S2S tunnels**: Enter the number of S2S tunnels for the virtual network gateway. Only available for VPN gateways.
- **P2S tunnels**: Enter the number of P2S tunnels for the virtual network gateway. Only available for VPN gateways.
- **Rotate item**: Rotate the component by 90 degrees and change its direction.

## API

Use [the Cloudcraft API][1] to programmatically access and render your architecture diagrams as JSON objects. The following is an example JSON object of a VPN gateway component:

### スキーマ

```json
{
    "type": "azurevngw",
    "id": "817a218d-8556-4e8f-b32c-b13e454b9106",
    "region": "eastus",
    "mapPos": [6,9.25],
    "gatewayType": "Vpn",
    "tier": "Basic",
    "s2sTunnels": 0,
    "p2sTunnels": 0,
    "direction": "down",
    "color": {
        "isometric": "#CEE0F5",
        "2d": null
    },
    "accentColor": {
        "isometric": "#0078D4",
        "2d": null
    },
    "link": "https://azure.microsoft.com/products/vpn-gateway",
    "locked": true
}
```

- **type: string**: The type of component. Must be a string of value `azurevngw` for this component.
- **id: 文字列、uuid**: コンポーネントの一意な識別子。API は内部的に UUID v4 を使用しますが、任意の一意な文字列を受け付けます。
- **resourceId: 文字列**: Azure 内のコンポーネントのグローバルに一意な識別子。
- **region: 文字列**: コンポーネントの Azure リージョン。API は、中国を除くすべてのグローバルリージョンをサポートしています。
- **mapPos: 配列**: ブループリント内のコンポーネントの位置。API では、一意の X 座標と Y 座標のペアを使用して位置を表現します。
- **gatewayType: string**: The type of virtual network gateway you want to represent. Accepts one of two values, `Vpn` or `ExpressRoute`. Defaults to `Vpn`.
- **tier: string**: The tier of the virtual network gateway. [See Microsoft Learn for more information][2]. Defaults to `Basic` or `Standard`, depending on the `gatewayType`.
- **s2sTunnels: number**: The number of S2S tunnels for the virtual network gateway. Defaults to `0`.
- **p2sTunnels: number**: The number of P2S tunnels for the virtual network gateway. Defaults to `0`.
- **direction: string**: The direction of the component. Accepts one of two values, `right` or `down`. Defaults to `down`.
- **color: オブジェクト**: コンポーネント本体の塗りつぶし色。
  - **isometric: 文字列**: 3D ビューでのコンポーネント本体の 16 進数カラー。デフォルトは `#CEE0F5` です。
  - **2d: 文字列**: 2D ビューでのコンポーネント本体の 16 進数カラー。デフォルトは `null` です。
- **accentColor: オブジェクト**: コンポーネントロゴのアクセントカラー。
  - **isometric: 文字列**: 3D ビューでのコンポーネントロゴの 16 進数カラー。デフォルトは `#0078D4` です。
  - **2d: 文字列**: 2D ビューでのコンポーネントロゴの 16 進数カラー。デフォルトは `null` です。
- **link: 文字列、uri**: コンポーネントを別の図や外部の Web サイトにリンクする URI。`blueprint://` または `https://` の 2 つの形式のどちらかを指定します。
- **locked: ブール値**: Web インターフェイスを通してコンポーネントの位置の変更を許可するかどうか。デフォルトは `false` です。

[1]: https://developers.cloudcraft.co/
[2]: https://learn.microsoft.com/en-us/azure/vpn-gateway/vpn-gateway-about-vpn-gateway-settings#gwsku