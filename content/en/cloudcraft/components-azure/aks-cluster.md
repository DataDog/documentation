---
title: "AKS Cluster Component"
---

## Overview

You can use the AKS Cluster component to represent and visualize Kubernetes clusters from your Azure environment.

{{< img src="cloudcraft/components-azure/aks-cluster/component-aks-cluster-diagram.png" alt="Screenshot of an isometric Cloudcraft diagram showing interconnected Azure components." responsive="true" style="width:60%;">}}

## Toolbar

Use the toolbar to configure and customize the component. The following options are available:

- **Color**: Select a fill color for the body of the component and an accent color for its symbol. You can use the same colors on 2D and 3D views or different colors for each.
- **Name**: Enter a name for the AKS Cluster.
- **Tier**: Select a service tier for your cluster.

## API

Use [the Cloudcraft API][1] to programmatically access and render your architecture diagrams as JSON objects. The following is an example JSON object of an AKS cluster component:

### Schema

```json
{
    "type": "azureakscluster",
    "id": "9f8c8ee5-7828-4efc-8b34-fd26e69d1118",
    "resourceId":"/subscriptions/2dedf330-e79d-4b8e-82b9-13f6fa619bbb/resourceGroups/DOC-RESOURCE-GROUP/providers/Microsoft.ContainerService/managedClusters/doc-cluster",
    "region": "eastus",
    "mapPos": [1,2.25],
    "mapSize": [11,6],
    "nodes": [
        "3511ff78-f94e-4830-88d7-54ffe91ecc28",
        "f0b6c469-26a2-49bd-8707-626cb513ea50"
    ],
    "name": "AKS Cluster",
    "tier": "standard",
    "color": {
        "isometric": "#CEE0F5",
        "2d": "#CEE0F5"
    },
    "accentColor": {
        "isometric": "#0078D4",
        "2d": "#0078D4"
    },
    "link": "https://azure.microsoft.com/products/kubernetes-service",
    "locked": true
}
```

- **type: string**: The type of component. Must be a string of value `azureakscluster` for this component.
- **id: string, uuid**: The unique identifier for the component. The API uses a UUID v4 internally but accepts any unique string.
- **resourceId: string**: The globally unique identifier for the component within Azure.
- **region: string**: The Azure region for the component. The API supports all global regions, except China.
- **mapPos: array**: The position of the component in the blueprint. The API uses a unique X and Y coordinate pair to express positioning.
- **mapSize: array**: The size of the component in the blueprint. The API uses a unique width and height pair to express sizing.
- **nodes: array**: The workloads running inside the cluster. Accepts an array of unique identifiers for [the AKS Workload component][2].
- **name: string**: The name of the cluster. Defaults to `AKS Cluster`.
- **tier: string**: The tier of the cluster. Accepts one of three values, `free`, `standard`, or `premium`. Defaults to `standard`.
- **color: object**: The fill color for the component body.
  - **isometric: string**: A hexadecimal color for the component body in 3D view. Defaults to `#CEE0F5`.
  - **2d: string**: A hexadecimal color for the component body in 2D view. Defaults to `#CEE0F5`.
- **accentColor: object**: The accent color for the component logo.
  - **isometric: string**: A hexadecimal color for the component logo in 3D view. Defaults to `#0078D4`.
  - **2d: string**: A hexadecimal color for the component logo in 2D view. Defaults to `#0078D4`.
- **link: string, uri**: A URI that links the component to another diagram or an external website. Accepts one of two formats, `blueprint://` or `https://`.
- **locked: boolean**: Whether to allow changes to the position of the component through the web interface. Defaults to `false`.

[1]: https://developers.cloudcraft.co/
[2]: https://help.cloudcraft.co/article/217-component-aks-workload
