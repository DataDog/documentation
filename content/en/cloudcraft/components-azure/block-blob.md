---
title: "Block Blob Component"
kind: documentation
---

## Overview

You can use the Block Blob component to represent and visualize block blobs from your Azure environment.

{{< img src="cloudcraft/components-azure/block-blob/component-block-blob-diagram.png" alt="Screenshot of an isometric Cloudcraft diagram showing interconnected Azure components." responsive="true" style="width:60%;">}}

## Toolbar

Use the toolbar to configure and customize the component. The following options are available:

- **Color**: Select accent and fill colors for the body of the component in 3D view.
- **Tier**: Select the storage tier for your blob.
- **Redundancy**: Select how your data is replicated in the primary and secondary regions.
- **Storage (GiB)**: Enter the total volume of data available for the blob in gibibytes.

## API

Use [the Cloudcraft API][1] to programmatically access and render your architecture diagrams as JSON objects. The following is an example JSON object of a Black Blob component:

### Schema

```json
{
	"type": "azureblob",
	"id": "c198aeb5-b774-496d-9802-75e6d2407ab1",
	"region": "eastus",
	"mapPos": [0,7],
	"tier": "Standard",
	"redundancy": "LRS",
	"storageGb": 1,
	"color": {
		"isometric": null,
		"2d": null
	},
	"accentColor": {
		"isometric": null,
		"2d": null
	},
	"link": "https://azure.microsoft.com/products/storage/blobs/",
	"locked": true
}
```

- **type: string**: The type of component. Must be a string of value `azureblob` for this component.
- **id: string, uuid**: The unique identifier for the component. The API uses a UUID v4 internally but accepts any unique string.
- **resourceId: string**: The globally unique identifier for the component within Azure.
- **region: string**: The Azure region for the component. The API supports all global regions, except China.
- **mapPos: array**: The position of the component in the blueprint. The API uses a unique X and Y coordinate pair to express positioning.
- **tier: string**: The storage level tier for the blob. Accepts one of four values, `Premium`, `Hot`, `Cool`, or `Standard`. Defaults to `Standard`.
- **redundancy: string**: The redundancy option for how data is replicated across regions. Accepts one of four values, `LRS`, `ZRS`, `GRS`, and `RA-GRS`. Defaults to `LRS`.
- **storageGb: number**: The total volume of data available for the blob in gibibytes. Defaults to `0`.
- **color: object**: The fill color for the component body.
  - **isometric: string**: A hexadecimal color for the component body in 3D view. Defaults to `#CEE0F5`.
  - **2d: string**: A hexadecimal color for the component body in 2D view. Defaults to `null`.
- **accentColor: object**: The accent color for the component logo.
  - **isometric: string**: A hexadecimal color for the component logo in 3D view. Defaults to `#0078D4`.
  - **2d: string**: A hexadecimal color for the component logo in 2D view. Defaults to `null`.
- **link: string, uri**: A URI that links the component to another diagram or an external website. Accepts one of two formats, `blueprint://` or `https://`.
- **locked: boolean**: Whether to allow changes to the position of the component through the web interface. Defaults to `false`.

[1]: https://developers.cloudcraft.co/
