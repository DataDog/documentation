---
title: "Component: Managed disk"
kind: guide
---

{{< img src="cloudcraft/components-azure/managed-disk/component-managed-disk-diagram.png" alt="Screenshot of an isometric Cloudcraft diagram showing interconnected Azure components." responsive="true" style="width:100%;">}}

You can use the **Managed Disk** component to represent and visualize managed block store volumes from your Azure environment with Cloudcraft.

## Toolbar

To configure or customize how your managed disk looks in a diagram, you can use the toolbar that appears when selecting a component inside the application.

### Option

{{< img src="cloudcraft/components-azure/managed-disk/component-managed-disk-toolbar.png" alt="Screenshot of a Cloudcraft interface showing configuration options for the managed disk component with pricing information." responsive="true" style="width:100%;">}}

For the **Managed Disk** component, the following options are available:

- **Color**. Select accent and fill colors for the body of the component in 3D view.
- **Type**. Select the type of your disk.
- **Size**. Select the size of your disk.

## API

Suppose you need programmatic access and remote rendering of architecture diagrams. In that case, [the Cloudcraft API][1] provides an interface for you to interact with your Azure account within Cloudcraft by sending and receiving data as JSON objects.

### Schema

```json
{
	"type": "azuredisk",
	"id": "17e69a0d-4632-42bd-a6c1-f3b9213604ea",
	"resourceId": "/subscriptions/b59a176b-3a5d-4cc6-ab8c-585984717c32/resourceGroups/CLOUDCRAFT/providers/Microsoft.Compute/disks/documentation-volume",
	"region": "eastus",
	"mapPos": [-2,12],
	"tier": "P4",
	"diskSizeGb": 32,
	"color": {
		"isometric": "#CEE0F5",
		"2d": "null"
	},
	"accentColor": {
		"isometric": "#0078D4",
		"2d": "null"
	},
	"link": "https://azure.microsoft.com/products/storage/disks",
	"locked": true
}
```

The **Managed Disk** component schema representation follows the format above and defines all fields within a diagram for this component.

- **type: string**. The type of component. Must be a string of value `azuredisk` for this component.
- **id: string, uuid**. The unique identifier for the component. The API uses a UUID v4 internally but accepts any unique string.
- **resourceId: string**. The globally unique identifier for the component within Azure.
- **region: string**. The Azure region for the component. The API supports all global regions, except China.
- **mapPos: array**. The position of the component in the blueprint. The API uses a unique X and Y coordinate pair to express positioning.
- **tier: string**. The tier for the disk type.
- **diskSizeGb: number**. The amount of storage available for use in the disk in gigabytes.
- **color: object**. The fill color for the component body.
  - **isometric: string**. A hexadecimal color for the component body in 3D view. Defaults to `#CEE0F5`.
  - **2d: string**. A hexadecimal color for the component body in 2D view. Defaults to `null`.
- **accentColor: object**. The accent color for the component logo.
  - **isometric: string**. A hexadecimal color for the component logo in 3D view. Defaults to `#0078D4`.
  - **2d: string**. A hexadecimal color for the component logo in 2D view. Defaults to `null`.
- **link: string, uri**. A URI that links the component to another diagram or an external website. Accepts one of two formats, `blueprint://` or `https://`.
- **locked: boolean**. Whether to allow changes to the position of the component through the web interface. Defaults to `false`.

[1]: https://developers.cloudcraft.co/
