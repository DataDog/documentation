---
title: "Load Balancer Component"
---

## Overview

You can use the Load Balancer component to represent and visualize load balancers from your Azure environment.

{{< img src="cloudcraft/components-azure/load-balancer/component-load-balancer-diagram.png" alt="Screenshot of an isometric Cloudcraft diagram showing virtual machine components interconnected to an Azure load balancer component." responsive="true" style="width:60%;">}}

## Toolbar

Use the toolbar to configure and customize the component. The following options are available:

- **Color**: Select accent and fill colors for the body of the component in 3D view.
- **SKU**: Select the service level tier for your load balancer.
- **Tier**: Select the network tier for your load balancer. This option is not available for Basic and Gateway SKUs.
- **Number of rules**: Enter the number of configured load-balancing rules. This option is not available for Gateway SKUs.
- **Chains**: Enter the number of chain hours for the load balancer. This option is not available for Basic and Standard SKUs.
- **Data processed (GB)**: Enter the total volume of data processed per month by your load balancer in gigabytes.

## API

Use [the Cloudcraft API][1] to programmatically access and render your architecture diagrams as JSON objects. The following is an example JSON object of a Load Balancer component:

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

- **type: string**: The type of component. Must be a string of value `azurelb` for this component.
- **id: string, uuid**: The unique identifier for the component. The API uses a UUID v4 internally but accepts any unique string.
- **resourceId: string**: The globally unique identifier for the component within Azure.
- **region: string**: The Azure region for the component. The API supports all global regions, except China.
- **mapPos: array**: The position of the component in the blueprint. The API uses a unique X and Y coordinate pair to express positioning.
- **skuName: string**: The service level for the load balancer. Accepts one of three values, `Basic`, `Standard`, or `Gateway`. Defaults to `Standard`.
- **tier: string**: The network tier for the load balancer. Accepts one of two values, `Regional` or `Global`. Defaults to `Regional`.
- **numberOfRules: number**: The number of rules for the load balancer. Defaults to `1`.
- **chains: number**: The number of chain hours for the load balancer. Defaults to `0`.
- **dataGb: number**: The total volume of monthly data processed by the load balancer in gigabytes. Defaults to `0`.
- **color: object**: The fill color for the component body.
  - **isometric: string**: A hexadecimal color for the component body in 3D view. Defaults to `#ececed`.
  - **2d: string**: A hexadecimal color for the component body in 2D view. Defaults to `null`.
- **accentColor: object**: The accent color for the component logo.
  - **isometric: string**: A hexadecimal color for the component logo in 3D view. Defaults to `#0078d4`.
  - **2d: string**: A hexadecimal color for the component logo in 2D view. Defaults to `null`.
- **link: string, uri**: A URI that links the component to another diagram or an external website. Accepts one of two formats, `blueprint://` or `https://`.
- **locked: boolean**: Whether to allow changes to the position of the component through the web interface. Defaults to `false`.

[1]: https://developers.cloudcraft.co/
