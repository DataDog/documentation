---
title: "Component: Cache for Redis"
kind: guide
---

{{< img src="cloudcraft/components-azure/cache-for-redis/component-cache-for-redis-diagram.png" alt="Screenshot of an isometric Cloudcraft diagram showing interconnected Azure components." responsive="true" style="width:100%;">}}

You can use the **Cache for Redis** component to represent and visualize the Redis caches from your Azure environment with Cloudcraft.

## Toolbar

To configure or customize how your Cache for Redis looks in a diagram, you can use the toolbar that appears when selecting a component inside the application.

### Option

{{< img src="cloudcraft/components-azure/cache-for-redis/component-cache-for-redis-toolbar.png" alt="Screenshot of a Cloudcraft interface showing configuration options for the 'Cache for Redis' component with pricing information." responsive="true" style="width:100%;">}}

For the **Cache for Redis** component, the following options are available:

- **Color**. Select accent and fill colors for the body of the component in 3D view.
- **Tier**. Select the performance tier for your Redis cache.
- **Type**. Select the instance type of your Redis cache. Changing the instance type changes the hardware details shown in the toolbar to reflect what is used by the hypervisor.

## API

Suppose you need programmatic access and remote rendering of architecture diagrams. In that case, [the Cloudcraft API](https://developers.cloudcraft.co/) provides an interface for you to interact with your Azure account within Cloudcraft by sending and receiving data as JSON objects.

### Schema

```json
{
	"type": "azureredis",
	"id": "e73c3831-83bf-4bbc-98e9-f5731cb0e437",
	"region": "northcentralus",
	"mapPos": [5,0],
	"tier": "Basic",
	"instance": "C0"
	"color": {
		"isometric": null,
		"2d": null
	},
	"accentColor": {
		"isometric": null,
		"2d": null
	},
	"link": "https://azure.microsoft.com/products/cache",
	"locked": true
}
```

The **Cache for Redis** component schema representation follows the format above and defines all fields within a diagram for this component.

- **type: string**. The type of component. Must be a string of value `azureredis` for this component.
- **id: string, uuid**. The unique identifier for the component. The API uses a UUID v4 internally but accepts any unique string.
- **resourceId: string**. The globally unique identifier for the component within Azure.
- **region: string**. The Azure region for the component. The API supports all global regions, except China.
- **mapPos: array**. The position of the component in the blueprint. The API uses a unique X and Y coordinate pair to express positioning.
- **tier: string**. The performance tier of the Redis cache.  Accepts one of three values, `Basic`, `Standard`,or `Premium`. Defaults to `Basic`.
- **instance: string**. The instance type of the Redis cache. Defaults to `C0`.
- **color: object**. The fill color for the component body.
  - **isometric: string**. A hexadecimal color for the component body in 3D view. Defaults to `#D82F27`.
  - **2d: string**. A hexadecimal color for the component body in 2D view. Defaults to `null`.
- **accentColor: object**. The accent color for the component logo.
  - **isometric: string**. A hexadecimal color for the component logo in 3D view. Defaults to `#FFFFFF`.
  - **2d: string**. A hexadecimal color for the component logo in 2D view. Defaults to `null`.
- **link: string, uri**. A URI that links the component to another diagram or an external website. Accepts one of two formats, `blueprint://` or `https://`.
- **locked: boolean**. Whether to allow changes to the position of the component through the web interface. Defaults to `false`.
