---
title: "VPN gateway Component"
---

## Overview

You can use the **VPN Gateway** component to represent and visualize private connections from your Azure environment.

{{< img src="cloudcraft/components-azure/vpn-gateway/component-vpn-gateway-diagram.png" alt="Screenshot of an isometric Cloudcraft diagram showing interconnected Azure components." responsive="true" style="width:60%;">}}


## Toolbar

Use the toolbar to configure and customize the component. The following options are available:

- **Color**: Select a fill color for the body of the component and an accent color for its symbol. You can use the same colors on 2D and 3D views or different colors for each.
- **Gateway type**: Select the type of virtual network gateway you want to represent.
- **SKU**: Select the SKU of the virtual network gateway you want to represent.
- **S2S tunnels**: Enter the number of S2S tunnels for the virtual network gateway. Only available for VPN gateways.
- **P2S tunnels**: Enter the number of P2S tunnels for the virtual network gateway. Only available for VPN gateways.
- **Rotate item**: Rotate the component by 90 degrees and change its direction.

## API

Use [the Cloudcraft API][1] to programmatically access and render your architecture diagrams as JSON objects. The following is an example JSON object of a VPN gateway component:

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

- **type: string**: The type of component. Must be a string of value `azurevngw` for this component.
- **id: string, uuid**: The unique identifier for the component. The API uses a UUID v4 internally but accepts any unique string.
- **resourceId: string**: The globally unique identifier for the component within Azure.
- **region: string**: The Azure region for the component. The API supports all global regions, except China.
- **mapPos: array**: The position of the component in the blueprint. The API uses a unique X and Y coordinate pair to express positioning.
- **gatewayType: string**: The type of virtual network gateway you want to represent. Accepts one of two values, `Vpn` or `ExpressRoute`. Defaults to `Vpn`.
- **tier: string**: The tier of the virtual network gateway. [See Microsoft Learn for more information][2]. Defaults to `Basic` or `Standard`, depending on the `gatewayType`.
- **s2sTunnels: number**: The number of S2S tunnels for the virtual network gateway. Defaults to `0`.
- **p2sTunnels: number**: The number of P2S tunnels for the virtual network gateway. Defaults to `0`.
- **direction: string**: The direction of the component. Accepts one of two values, `right` or `down`. Defaults to `down`.
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
