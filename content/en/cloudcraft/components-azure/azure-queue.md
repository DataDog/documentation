---
title: "Azure Queue Component"
kind: documentation
---

## Overview

You can use the Azure Queue component to represent and visualize queue storage from your Azure environment.

{{< img src="cloudcraft/components-azure/azure-queue/component-azure-queue-diagram.png" alt="Screenshot of an isometric Cloudcraft diagram showing interconnected Azure components." responsive="true" style="width:60%;">}}


## Toolbar

Use the toolbar to configure and customize the component. The following options are available:

- **Color**: Select accent and fill colors for the body of the component in 3D view.
- **Kind**: Select the storage account kind.
- **Redundancy**: Select how your data is replicated in the primary and secondary regions.
- **Storage (GiB)**: Enter the total volume of data available for the queue in gibibytes.
- **Class 1 Requests (10k)**: Enter the number of Class 1 requests in 10k request units.
- **Class 2 Requests (10k)**: Enter the number of Class 2 requests in 10k request units.
- **Replication (GiB)**: Enter the total volume of geo-replication data transfer for the queue.

## API

Use [the Cloudcraft API][1] to programmatically access and render your architecture diagrams as JSON objects. The following is an example JSON object of an Azure Queue component:

### Schema

```json
{
	"type": "azurequeue",
	"id": "6cc7f504-a5a5-4354-ad34-0d250b462ce2",
	"region": "westeurope",
	"mapPos": [0,6],
	"kind": "Storage",
	"redundancy": "LRS",
	"storageGb": 1,
	"requestUnitsC1": 0,
	"requestUnitsC2": 0,
	"replicationGb": 0,
	"color": {
		"isometric": null,
		"2d": null
	},
	"accentColor": {
		"isometric": null,
		"2d": null
	},
	"link": "https://azure.microsoft.com/en-us/products/storage/queues/",
	"locked": true
}
```

- **type: string**: The type of component. Must be a string of value `azurequeue` for this component.
- **id: string, uuid**: The unique identifier for the component. The API uses a UUID v4 internally but accepts any unique string.
- **resourceId: string**: The globally unique identifier for the component within Azure.
- **region: string**: The Azure region for the component. The API supports all global regions, except China.
- **mapPos: array**: The position of the component in the blueprint. The API uses a unique X and Y coordinate pair to express positioning.
- **kind: string**: The storage account kind. Accepts one of two values, `Storage` and `StorageV2`. Defaults to `Storage`.
- **redundancy: string**: The redundancy option for how data is replicated across regions. Accepts one of six values, `LRS`, `ZRS`, `GRS`, `GZRS`, `RA-GRS`, and `RA-GZRS`: Defaults to `LRS`.
- **storageGb: number**: The total volume of data available for the queue in gibibytes. Defaults to `0`.
- **requestUnitsC1: number**: The number of Class 1 requests in 10k units. Defaults to `0`.
- **requestUnitsC2: number**: The number of Class 2 requests in 10k units. Defaults to `0`.
- **replicationGb: number**: The total volume of geo-replication data transfer for the queue. Defaults to `0`.
- **color: object**: The fill color for the component body.
  - **isometric: string**: A hexadecimal color for the component body in 3D view. Defaults to `#CEE0F5`.
  - **2d: string**: A hexadecimal color for the component body in 2D view. Defaults to `null`.
- **accentColor: object**: The accent color for the component logo.
  - **isometric: string**: A hexadecimal color for the component logo in 3D view. Defaults to `#0078D4`.
  - **2d: string**: A hexadecimal color for the component logo in 2D view. Defaults to `null`.
- **link: string, uri**: A URI that links the component to another diagram or an external website. Accepts one of two formats, `blueprint://` or `https://`.
- **locked: boolean**: Whether to allow changes to the position of the component through the web interface. Defaults to `false`.

[1]: https://developers.cloudcraft.co/
