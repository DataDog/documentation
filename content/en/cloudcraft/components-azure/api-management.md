---
title: "API Management Component"
---

## Overview

You can use the API Management component to represent and visualize management platforms for APIs from your Azure environment.

{{< img src="cloudcraft/components-azure/api-management/component-api-management-diagram.png" alt="Screenshot of an isometric Cloudcraft diagram showing interconnected Azure components." responsive="true" style="width:60%;">}}

## Toolbar

Use the toolbar to configure and customize the component. The following options are available:

- **Color**: Select accent and fill colors for the body of the component in 3D view.
- **Tier**: Select the service tier for your API management platform.
- **Calls**: Enter the total number of calls to the API. Only available for the **Consumption** tier.
- **Units**: Enter the number of units for the API management platform. Only available for the **Premium** tier.
- **Self-hosted gateways**: Enter the number of self-hosted API gateways. Only available for the **Premium** tier.
- **Rotate item**: Rotate the component relative to the blueprint. Only available in 3D view.

## API

Use [the Cloudcraft API][1] to programmatically access and render your architecture diagrams as JSON objects. The following is an example JSON object of an API Management component:

### Schema

```json
{
	"type": "azureapimanagement",
	"id": "ccff5631-c1cd-4ed6-8d21-bb60e676fedf",
	"region": "northcentralus",
	"mapPos": [5,0.25],
	"tier": "Consumption",
	"calls": 0,
	"units": 1,
	"gateways": 0,
	"direction": "down",
	"color": {
		"isometric": null,
		"2d": null
	},
	"accentColor": {
		"isometric": null,
		"2d": null
	},
	"link": "https://azure.microsoft.com/products/api-management/",
	"locked": true
}
```

- **type: string**: The type of component. Must be a string of value `azureapimanagement` for this component.
- **id: string, uuid**: The unique identifier for the component. The API uses a UUID v4 internally but accepts any unique string.
- **resourceId: string**: The globally unique identifier for the component within Azure.
- **region: string**: The Azure region for the component. The API supports all global regions, except China.
- **mapPos: array**: The position of the component in the blueprint. The API uses a unique X and Y coordinate pair to express positioning.
- **tier: string**: The service tier for the API management platform. [See Azure's documentation for more information][2]. Defaults to `Consumption`.
- **calls: number**: The number of calls to the API. Defaults to `0`.
- **units: number**: The number of units for the API management platform. Defaults to `1`.
- **gateways: number**: The number of self-hosted API gateways. Defaults to `0`.
- **direction: string**: The direction of the component in relation to the blueprint. Accepts one of two values, `down` or `right`. Defaults to `down`.
- **color: object**: The fill color for the component body.
  - **isometric: string**: A hexadecimal color for the component body in 3D view. Defaults to `#075693`.
  - **2d: string**: A hexadecimal color for the component body in 2D view. Defaults to `null`.
- **accentColor: object**: The accent color for the component logo.
  - **isometric: string**: A hexadecimal color for the component logo in 3D view. Defaults to `#2EC8EA`.
  - **2d: string**: A hexadecimal color for the component logo in 2D view. Defaults to `null`.
- **link: string, uri**: A URI that links the component to another diagram or an external website. Accepts one of two formats, `blueprint://` or `https://`.
- **locked: boolean**: Whether to allow changes to the position of the component through the web interface. Defaults to `false`.

[1]: https://developers.cloudcraft.co/
[2]: https://learn.microsoft.com/en-us/azure/api-management/api-management-features
