---
title: "Service bus topic Component"
---

## Overview

You can use the Service Bus Topic component to represent and visualize cloud messaging as a service integrations from your Azure environment.

{{< img src="cloudcraft/components-azure/service-bus-topic/component-service-bus-topic-diagram.png" alt="Screenshot of an isometric Cloudcraft diagram showing interconnected Azure components." responsive="true" style="width:60%;">}}

## Toolbar

Use the toolbar to configure and customize the component. The following options are available:

- **Color**: Select accent and fill colors for the body of the component in 3D view.
- **Tier**: Select the service tier for your service bus topic.
- **Operations (M/month)**: Enter the number of monthly operations in millions. Not available for service tier Premium.
- **Brokered connections**: Enter the number of brokered connections for your topic. Only available on service tier Standard.
- **Hybrid connections**: Enter the number of hybrid connections for your topic. Only available on service tier Standard.
- **Data transfer (GB)**: Enter the total volume of data transfered monthly in gigabytes. Only available on service tier Standard.
- **Relay hours**: Enter the number of relay hours for your topic. Only available on service tier Standard.
- **Relay messages (K/mo)**: Enter the number of monthly relayed messages in thousands. Only available on service tier Standard.

## API

Use [the Cloudcraft API][1] to programmatically access and render your architecture diagrams as JSON objects. The following is an example JSON object of a Service bus topic component:

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

- **type: string**: The type of component. Must be a string of value `azuresbtopic` for this component.
- **id: string, uuid**: The unique identifier for the component. The API uses a UUID v4 internally but accepts any unique string.
- **resourceId: string**: The globally unique identifier for the component within Azure.
- **region: string**: The Azure region for the component. The API supports all global regions, except China.
- **mapPos: array**: The position of the component in the blueprint. The API uses a unique X and Y coordinate pair to express positioning.
- **tier: string**: The service tier for the topic. Accepts one of two values, `Standard` or `Premium`. Defaults to `Standard`.
- **operationsPerMonth: number**: The number of operations per month in millions. Defaults to `0`.
- **brokeredConnections: number**: The number of brokered connections for the topic. Defaults to `0`.
- **hybridConnections: number**: The number of hybrid connections for the topic. Defaults to `0`.
- **dataTransferGb: number**: The total volume of data transfered monthly in gigabytes. Defaults to `0`.
- **relayHours: number**: The number of relayed hours for the topic. Defaults to `0`.
- **relayMessages: number**: The number of relayed messages per month in thousands. Defaults to `0`.
- **color: object**: The fill color for the component body.
  - **isometric: string**: A hexadecimal color for the component body in 3D view. Defaults to `#CEE0F5`.
  - **2d: string**: A hexadecimal color for the component body in 2D view. Defaults to `null`.
- **accentColor: object**: The accent color for the component logo.
  - **isometric: string**: A hexadecimal color for the component logo in 3D view. Defaults to `#0078D4`.
  - **2d: string**: A hexadecimal color for the component logo in 2D view. Defaults to `null`.
- **link: string, uri**: A URI that links the component to another diagram or an external website. Accepts one of two formats, `blueprint://` or `https://`.
- **locked: boolean**: Whether to allow changes to the position of the component through the web interface. Defaults to `false`.

[1]: https://developers.cloudcraft.co/
