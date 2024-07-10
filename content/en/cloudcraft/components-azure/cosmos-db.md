---
title: "Cosmos DB Component"
---

## Overview

You can use the Cosmos DB component to represent and visualize serverless databases from your Azure environment.

{{< img src="cloudcraft/components-azure/cosmos-db/component-cosmos-db-diagram.png" alt="Screenshot of an isometric Cloudcraft diagram showing interconnected Azure components." responsive="true" style="width:60%;">}}

## Toolbar

Use the toolbar to configure and customize the component. The following options are available:

- **Color**: Select accent and fill colors for the body of the component in 3D view.
- **API**: Select your database API.
- **Capacity mode**: Select the capacity mode for your database operations. No available for PostgreSQL.
- **Replicate mode**: Select the replication mode for your database. Not available for PostgreSQL.
- **Request units**: Enter the number of request units per second. Not available for PostgreSQL.
- **Storage (GiB)**: Enter the total volume of transactional storage for your database in gibibytes. Not available for PostgreSQL.
- **Node Count**: Select the number of worker nodes available for your workload. Only available for PostgreSQL.
- **Node vCores**: Select the number of virtual cores available for each node. Only available for PostgreSQL.
- **Node Storage**: Select the amount of storage available for each node. Only available for PostgreSQL.
- **HA**: Choose whether the database runs in high availability mode. Only available for PostgreSQL.

## API

Use [the Cloudcraft API][1] to programmatically access and render your architecture diagrams as JSON objects. The following is an example JSON object of a Cosmos DB component:

### Schema

```json
{
	"type": "azurecosmosdb",
	"id": "c7fcbf73-87b1-48fd-886b-1ccdd38e0076",
	"region": "centralus",
	"mapPos": [-5,11],
	"api": "sql",
	"capacityMode": "provisioned",
	"replicationMode": "standard",
	"requestUnits": 400,
	"storageGb": 1,
	"postgresqlNodes": 1,
	"postgresqlCoordinatorCores": 4,
	"postgresqlCoordinatorStorage": 512,
	"postgresqlWorkerCores": 2,
	"postgresqlWorkerStorage": 128,
	"postgresqlHighAvailability": false,
	"color": {
		"isometric": null,
		"2d": null
	},
	"accentColor": {
		"isometric": null,
		"2d": null
	},
	"link": "https://azure.microsoft.com/products/cosmos-db/",
	"locked": true
}

```

- **type: string**: The type of component. Must be a string of value `azurecosmosdb` for this component.
- **id: string, uuid**: The unique identifier for the component. The API uses a UUID v4 internally but accepts any unique string.
- **resourceId: string**: The globally unique identifier for the component within Azure.
- **region: string**: The Azure region for the component. The API supports all global regions, except China.
- **mapPos: array**: The position of the component in the blueprint. The API uses a unique X and Y coordinate pair to express positioning.
- **api: string**: The database API. [See Azure's Cosmos DB documentation for more information][2]. Defaults to `sql`.
- **capacityMode: string**: The capacity mode for database operations. Accepts one of two values, `provisioned` or `serverless`. Defaults to `provisioned`.
- **replicationMode: string**: The database replication mode. Accepts one of three values, `standard`, `with-zones`, and `multi-master`. Defaults to `standard`.
- **requestUnits: number**: The number of request units per second. Defaults to `400`.
- **storageGb: string**: The total volume of transactional storage for the database in gibibytes. Defaults to `1`.
- **postgresqlNodes: number**: The number of worker nodes available for the workload. Defaults to `1`.
- **postgresqlCoordinatorCores: number**: The number of virtual cores available for the coordinator. Defaults to `4`.
- **postgresqlCoordinatorStorage: number**: The amount of storage available for the coordinator. Defaults to `512`.
- **postgreesqlWorkerCores: number**: The number of virtual cores available for each node. Defaults to `2`.
- **postgreesqlWorkerStorage: number**: The amount of storage available for each node. Defaults to `128`.
- **postgresqlHighAvailability: boolean**: Whether the database runs in high availability mode. Defaults to `false`.
- **color: object**: The fill color for the component body.
  - **isometric: string**: A hexadecimal color for the component body in 3D view. Defaults to `#CEE0F5`.
  - **2d: string**: A hexadecimal color for the component body in 2D view. Defaults to `null`.
- **accentColor: object**: The accent color for the component logo.
  - **isometric: string**: A hexadecimal color for the component logo in 3D view. Defaults to `#0078D4`.
  - **2d: string**: A hexadecimal color for the component logo in 2D view. Defaults to `null`.
- **link: string, uri**: A URI that links the component to another diagram or an external website. Accepts one of two formats, `blueprint://` or `https://`.
- **locked: boolean**: Whether to allow changes to the position of the component through the web interface. Defaults to `false`.

[1]: https://developers.cloudcraft.co/
[2]: https://learn.microsoft.com/azure/cosmos-db/
