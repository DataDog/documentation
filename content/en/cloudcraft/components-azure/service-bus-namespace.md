---
title: "Component: Service bus namespace"
kind: guide
---

{{< img src="cloudcraft/components-azure/service-bus-namespace/component-service-bus-namespace-diagram.png" alt="Screenshot of an isometric Cloudcraft diagram showing interconnected Azure components." responsive="true" style="width:100%;">}}

You can use the **Service Bus Namespace** component to represent and visualize cloud messaging as a service integrations from your Azure environment with Cloudcraft.

## Toolbar

To configure or customize how your Service Bus Namespace looks in a diagram, you can use the toolbar that appears when selecting a component inside the application.

### Option

{{< img src="cloudcraft/components-azure/service-bus-namespace/component-service-bus-namespace-toolbar.png" alt="Screenshot of a Cloudcraft interface showing configuration options for the 'Service Bus Namespace' component with pricing information." responsive="true" style="width:100%;">}}

For the **Service Bus Namespace** component, the following options are available:

- **Color**. Select accent and fill colors for the body of the component in 3D view.
- **Name**. Enter the name of your namespace.
- **Tier**. Select the service tier for your service bus namespace.
- **Messaging units**. Select the number of messaging units available for your namespace. Only available for the **Premium** tier.

## API

Suppose you need programmatic access and remote rendering of architecture diagrams. In that case, [the Cloudcraft API](https://developers.cloudcraft.co/) provides an interface for you to interact with your Azure account within Cloudcraft by sending and receiving data as JSON objects.

### Schema

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

The **Service Bus Namespace** component schema representation follows the format above and defines all fields within a diagram for this component.

- **type: string**. The type of component. Must be a string of value `azuresbnamespace` for this component.
- **id: string, uuid**. The unique identifier for the component. The API uses a UUID v4 internally but accepts any unique string.
- **resourceId: string**. The globally unique identifier for the component within Azure.
- **region: string**. The Azure region for the component. The API supports all global regions, except China.
- **mapPos: array**. The position of the component in the blueprint. The API uses a unique X and Y coordinate pair to express positioning.
- **mapSize: array**. The size of the component in the blueprint. The API uses a unique X and Y coordinate pair to express size.
- **nodes: array**. The services running inside the namespace. Accepts an array of unique identifiers for the [Service Bus Queue](https://help.cloudcraft.co/article/189-component-service-bus-queue) and [Service Bus Topic](https://help.cloudcraft.co/article/190-component-service-bus-topic) components.
- **name: string**. The name of the namespace. Defaults to `Namespace`.
- **tier: string**. The service tier for the namespace. Accepts one of three values, `Basic`, `Standard`, and `Premium`. Defaults to `Basic`.
- **messagingUnits: number**. The number of messaging units available for the namespace. Accepts a number from `1` to `16`. Defaults to `1`.
- **color: object**. The fill color for the component body.
  - **isometric: string**. A hexadecimal color for the component body in 3D view. Defaults to `#CEE0F5`.
  - **2d: string**. A hexadecimal color for the component body in 2D view. Defaults to `null`.
- **accentColor: object**. The accent color for the component logo.
  - **isometric: string**. A hexadecimal color for the component logo in 3D view. Defaults to `#0078D4`.
  - **2d: string**. A hexadecimal color for the component logo in 2D view. Defaults to `null`.
- **link: string, uri**. A URI that links the component to another diagram or an external website. Accepts one of two formats, `blueprint://` or `https://`.
- **locked: boolean**. Whether to allow changes to the position of the component through the web interface. Defaults to `false`.
