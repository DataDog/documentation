---
title: VPN Gateway コンポーネント
---

## Overview

**VPN Gateway** コンポーネントを使用すると、Azure 環境のプライベート接続を表現して視覚化できます。

{{< img src="cloudcraft/components-azure/vpn-gateway/component-vpn-gateway-diagram.png" alt="相互接続された Azure コンポーネントを示す、等角投影された Cloudcraft 図のスクリーンショット。" responsive="true" style="width:60%;">}}


## Toolbar

Use the toolbar to configure and customize the component. The following options are available:

- **Color**: Select a fill color for the body of the component and an accent color for its symbol. You can use the same colors on 2D and 3D views or different colors for each.
- **Gateway type**: 表現したい仮想ネットワークゲートウェイのタイプを選択します。
- **SKU**: 表現したい仮想ネットワークゲートウェイの SKU を選択します。
- **S2S tunnels**: 仮想ネットワークゲートウェイの S2S トンネルの数を入力します。VPN ゲートウェイの場合のみ利用可能です。
- **P2S tunnels**: 仮想ネットワークゲートウェイの P2S トンネルの数を入力します。VPN ゲートウェイの場合のみ利用可能です。
- **Rotate item**: コンポーネントを 90 度回転させ、その方向を変更します。

## API

[Cloudcraft API][1] を使用して、プログラムでアーキテクチャ図にアクセスし、JSON オブジェクトとしてレンダリングします。以下は、VPN Gateway コンポーネントの JSON オブジェクトの例です。

### Schema

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

- **type: 文字列**: コンポーネントのタイプ。このコンポーネントの値 `azurevngw` の文字列でなければなりません。
- **id: string, uuid**: The unique identifier for the component. The API uses a UUID v4 internally but accepts any unique string.
- **resourceId: string**: The globally unique identifier for the component within Azure.
- **region: string**: The Azure region for the component. The API supports all global regions, except China.
- **mapPos: array**: The position of the component in the blueprint. The API uses a unique X and Y coordinate pair to express positioning.
- **gatewayType: 文字列**: 表現したい仮想ネットワークゲートウェイのタイプ。`Vpn` または `ExpressRoute` のどちらかの値を指定します。デフォルトは `Vpn` です。
- **tier: 文字列**: 仮想ネットワークゲートウェイの階層。[詳細は Microsoft Learn を参照してください][2]。デフォルトは `gatewayType` に応じて `Basic` または `Standard` です。
- **s2sTunnels: 数値**: 仮想ネットワークゲートウェイの S2S トンネルの数。デフォルトは `0` です。
- **p2sTunnels: 数値**: 仮想ネットワークゲートウェイの P2S トンネルの数。デフォルトは `0` です。
- **direction: 文字列**: コンポーネントの方向。`right` と `down` の 2 つの値のどちらかを指定します。デフォルトは `down` です。
- **color: object**: The fill color for the component body.
  - **isometric: string**: A hexadecimal color for the component body in 3D view. Defaults to `#CEE0F5`.
  - **2d: string**: A hexadecimal color for the component body in 2D view. Defaults to `null`.
- **accentColor: object**: The accent color for the component logo.
  - **isometric: string**: A hexadecimal color for the component logo in 3D view. Defaults to `#0078D4`.
  - **2d: string**: A hexadecimal color for the component logo in 2D view. Defaults to `null`.
- **link: string, uri**: A URI that links the component to another diagram or an external website. Accepts one of two formats, `blueprint://` or `https://`.
- **locked: boolean**: Whether to allow changes to the position of the component through the web interface. Defaults to `false`.

[1]: https://developers.cloudcraft.co/
[2]: https://learn.microsoft.com/en-us/azure/vpn-gateway/vpn-gateway-about-vpn-gateway-settings#gwsku