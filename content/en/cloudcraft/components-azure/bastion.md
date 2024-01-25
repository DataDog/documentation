---
title: "Component: Bastion"
kind: guide
---

{{< img src="cloudcraft/components-azure/bastion/component-bastion-diagram.png" alt="Screenshot of an isometric Cloudcraft diagram showing interconnected Azure components." responsive="true" style="width:100%;">}}

You can use the **Bastion** component to represent and visualize bastion servers from your Azure environment with Cloudcraft.

## Toolbar

To configure or customize how your bastion looks in a diagram, you can use the toolbar that appears when selecting a component inside the application.

### Option

{{< img src="cloudcraft/components-azure/bastion/component-bastion-toolbar.png" alt="Screenshot of a Cloudcraft interface showing configuration options for the bastion component, including region, VNet, and subnet settings with pricing information." responsive="true" style="width:100%;">}}

For the **Bastion** component, the following options are available:

- **Color**. Select accent and fill colors for the body of the component in 3D view.
- **Tier**. Select the service level tier for your bastion server.
- **Scale units**. Enter the number of scale units for your bastion server. This option is only available for the Standard tier.
- **Outbound data transfer (GB)**. Enter the total volume of outbound data transferred by your bastion server in gigabytes.

## API

Suppose you need programmatic access and remote rendering of architecture diagrams. In that case, [the Cloudcraft API][1] provides an interface for you to interact with your Azure account within Cloudcraft by sending and receiving data as JSON objects.

### Schema

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

The **Bastion** component schema representation follows the format above and defines all fields within a diagram for this component.

- **type: string**. The type of component. Must be a string of value `azurebastion` for this component.
- **id: string, uuid**. The unique identifier for the component. The API uses a UUID v4 internally but accepts any unique string.
- **resourceId: string**. The globally unique identifier for the component within Azure.
- **region: string**. The Azure region for the component. The API supports all global regions, except China.
- **mapPos: array**. The position of the component in the blueprint. The API uses a unique X and Y coordinate pair to express positioning.
- **tier: string**. The service level tier for the bastion server. Accepts one of two values, `Basic` or `Standard`. Defaults to `Standard`.
- **scaleUnits: number**. The number of scale units for the bastion server.
- **outboundDataTransfer: number**. The total volume of outbound data transferred by the bastion server in gigabytes. Defaults to `0`.
- **color: object**. The fill color for the component body.
  - **isometric: string**. A hexadecimal color for the component body in 3D view. Defaults to `#ececed`.
  - **2d: string**. A hexadecimal color for the component body in 2D view. Defaults to `null`.
- **accentColor: object**. The accent color for the component logo.
  - **isometric: string**. A hexadecimal color for the component logo in 3D view. Defaults to `#0078d4`.
  - **2d: string**. A hexadecimal color for the component logo in 2D view. Defaults to `null`.
- **link: string, uri**. A URI that links the component to another diagram or an external website. Accepts one of two formats, `blueprint://` or `https://`.
- **locked: boolean**. Whether to allow changes to the position of the component through the web interface. Defaults to `false`.

[1]: https://developers.cloudcraft.co/
