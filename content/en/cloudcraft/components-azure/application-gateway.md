---
title: "Component: Application gateway"
kind: guide
---

{{< img src="cloudcraft/components-azure/application-gateway/component-application-gateway-diagram.png" alt="Screenshot of an isometric Cloudcraft diagram showing web app components interconnected to an Azure application gateway component." responsive="true" style="width:100%;">}}

You can use the **Application Gateway** component to represent and visualize application gateways from your Azure environment with Cloudcraft.

## Toolbar

To configure or customize how your application gateway looks in a diagram, you can use the toolbar that appears when selecting a component inside the application.

### Option

{{< img src="cloudcraft/components-azure/application-gateway/component-application-gateway-toolbar.png" alt="Screenshot of a Cloudcraft interface showing application gateway configuration options, including region, VNet, and subnet settings with pricing information." responsive="true" style="width:100%;">}}

For the **Application Gateway** component, the following options are available:

- **Color**. Select accent and fill colors for the body of the component in 3D view.
- **Tier**. Select the service level tier for your application gateway.
- **Size**. Select the size of your application gateway. This option is only available for the Standard and WAF tiers.
- **Instances**. Enter the number of instances for high-availability scenarios. This option is only available for the Standard and WAF tiers.
- **Compute units**. Enter the measure of compute capacity consumed by your application gateway. This option is only available for the Standard V2 and WAF V2 tiers.
- **Persistent connections**. Enter the number of persistent connections to your application gateway. This option is only available for the Standard V2 and WAF V2 tiers.
- **Throughput (Mbps)**. Enter the throughput of your application gateway in megabits per second. This option is only available for the Standard V2 and WAF V2 tiers.
- **Data processed (GB)**. Enter the total volume of data processed per month by your application gateway in gigabytes.
- **Outbound data processed (GB)**. Enter the total volume of outbound data processed per month by your application gateway in gigabytes.

## API

Suppose you need programmatic access and remote rendering of architecture diagrams. In that case, [the Cloudcraft API](https://developers.cloudcraft.co/) provides an interface for you to interact with your Azure account within Cloudcraft by sending and receiving data as JSON objects.

### Schema

```json
{
	"type": "azureappgw",
	"id": "900c9832-31d6-460a-9065-762fe63ec83c",
	"resourceId": "/subscriptions/c74c5de5-0170-405b-954a-e6491cf0c838/resourceGroups/CLOUDCRAFT/providers/Microsoft.Network/applicationGateways/DocTeamGateway",
	"region": "eastus",
	"mapPos": [1, 8],
	"tier": "Standard",
	"size": "Small",
	"instances": 2,
	"computeUnits": 0,
	"persistentConnections": 0,
	"throughput": 0,
	"dataProcessed": 0,
	"outboundDataTransfer": 0,
	"color": {
		"isometric": "#CEE0F5",
		"2d": null
	},
	"accentColor": {
		"isometric": "#0078D4",
		"2d": null
	},
	"link": "https://azure.microsoft.com/products/application-gateway",
	"locked": true
}
```

The **Application Gateway** component schema representation follows the format above and defines all fields within a diagram for this component.

- **type: string**. The type of component. Must be a string of value `azureappgw` for this component.
- **id: string, uuid**. The unique identifier for the component. The API uses a UUID v4 internally but accepts any unique string.
- **resourceId: string**. The globally unique identifier for the component within Azure.
- **region: string**. The Azure region for the component. The API supports all global regions, except China.
- **mapPos: array**. The position of the component in the blueprint. The API uses a unique X and Y coordinate pair to express positioning.
- **tier: string**. The service level tier for the application gateway. Accepts one of four values, `Standard`, `Standard V2`, `WAF`, or `WAF V2`. Defaults to `Standard V2`.
- **size: string**. The size of the application gateway. Accepts one of three values, `Small`, `Medium`, or `Large`. Defaults to `Medium`.
- **instances: number**. The number of application gateway instances. Defaults to `2`.
- **computeUnits: number**. The measure of compute capacity consumed by the application gateway. Defaults to `0`.
- **persistentConnections: number**. The number of persistent connections to your application gateway. Defaults to `0`.
- **throughput: number**. The throughput of the application gateway in megabits per second. Defaults to `0`.
- **dataProcessed: number**. The total volume of monthly data processed by the application gateway in gigabytes. Defaults to `0`.
- **outboundDataTransfer: number**. The total volume of monthly outbound data processed by the application gateway in gigabytes. Defaults to `0`.
- **color: object**. The fill color for the component body.
  - **isometric: string**. A hexadecimal color for the component body in 3D view. Defaults to `#CEE0F5`.
  - **2d: string**. A hexadecimal color for the component body in 2D view. Defaults to `null`.
- **accentColor: object**. The accent color for the component logo.
  - **isometric: string**. A hexadecimal color for the component logo in 3D view. Defaults to `#0078D4`.
  - **2d: string**. A hexadecimal color for the component logo in 2D view. Defaults to `null`.
- **link: string, uri**. A URI that links the component to another diagram or an external website. Accepts one of two formats, `blueprint://` or `https://`.
- **locked: boolean**. Whether to allow changes to the position of the component through the web interface. Defaults to `false`.
