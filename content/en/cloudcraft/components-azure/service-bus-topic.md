---
title: "Component: Service bus topic"
kind: guide
---

{{< img src="cloudcraft/components-azure/service-bus-topic/component-service-bus-topic-diagram.png" alt="Screenshot of an isometric Cloudcraft diagram showing interconnected Azure components." responsive="true" style="width:100%;">}}

You can use the **Service Bus Topic** component to represent and visualize cloud messaging as a service integrations from your Azure environment with Cloudcraft.

## Toolbar

To configure or customize how your Service Bus Topic looks in a diagram, you can use the toolbar that appears when selecting a component inside the application.

### Option

{{< img src="cloudcraft/components-azure/service-bus-topic/component-service-bus-topic-toolbar.png" alt="Screenshot of a Cloudcraft interface showing configuration options for the 'Service Bus Topic' component with pricing information." responsive="true" style="width:100%;">}}

For the **Service Bus Topic** component, the following options are available:

- **Color**. Select accent and fill colors for the body of the component in 3D view.
- **Tier**. Select the service tier for your service bus topic.
- **Operations (M/month)**. Enter the number of monthly operations in millions. Not available for service tier Premium.
- **Brokered connections**. Enter the number of brokered connections for your topic. Only available on service tier Standard.
- **Hybrid connections**. Enter the number of hybrid connections for your topic. Only available on service tier Standard.
- **Data transfer (GB)**. Enter the total volume of data transfered monthly in gigabytes. Only available on service tier Standard.
- **Relay hours**. Enter the number of relay hours for your topic. Only available on service tier Standard.
- **Relay messages (K/mo)**. Enter the number of monthly relayed messages in thousands. Only available on service tier Standard.

## API

Suppose you need programmatic access and remote rendering of architecture diagrams. In that case, [the Cloudcraft API][1] provides an interface for you to interact with your Azure account within Cloudcraft by sending and receiving data as JSON objects.

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

The **Service Bus Topic** component schema representation follows the format above and defines all fields within a diagram for this component.

- **type: string**. The type of component. Must be a string of value `azuresbtopic` for this component.
- **id: string, uuid**. The unique identifier for the component. The API uses a UUID v4 internally but accepts any unique string.
- **resourceId: string**. The globally unique identifier for the component within Azure.
- **region: string**. The Azure region for the component. The API supports all global regions, except China.
- **mapPos: array**. The position of the component in the blueprint. The API uses a unique X and Y coordinate pair to express positioning.
- **tier: string**. The service tier for the topic. Accepts one of two values, `Standard` or `Premium`. Defaults to `Standard`.
- **operationsPerMonth: number**. The number of operations per month in millions. Defaults to `0`.
- **brokeredConnections: number**. The number of brokered connections for the topic. Defaults to `0`.
- **hybridConnections: number**. The number of hybrid connections for the topic. Defaults to `0`.
- **dataTransferGb: number**. The total volume of data transfered monthly in gigabytes. Defaults to `0`.
- **relayHours: number**. The number of relayed hours for the topic. Defaults to `0`.
- **relayMessages: number**. The number of relayed messages per month in thousands. Defaults to `0`.
- **color: object**. The fill color for the component body.
  - **isometric: string**. A hexadecimal color for the component body in 3D view. Defaults to `#CEE0F5`.
  - **2d: string**. A hexadecimal color for the component body in 2D view. Defaults to `null`.
- **accentColor: object**. The accent color for the component logo.
  - **isometric: string**. A hexadecimal color for the component logo in 3D view. Defaults to `#0078D4`.
  - **2d: string**. A hexadecimal color for the component logo in 2D view. Defaults to `null`.
- **link: string, uri**. A URI that links the component to another diagram or an external website. Accepts one of two formats, `blueprint://` or `https://`.
- **locked: boolean**. Whether to allow changes to the position of the component through the web interface. Defaults to `false`.

[1]: https://developers.cloudcraft.co/
