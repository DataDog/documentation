---
title: "AKS Pod Component"
---

## Overview

You can use the AKS Pod component to represent and visualize application containers from your Azure environment with Cloudcraft.

{{< img src="cloudcraft/components-azure/aks-pod/component-aks-pod-diagram.png" alt="Screenshot of an isometric Cloudcraft diagram showing interconnected Azure components." responsive="true" style="width:60%;">}}

## Toolbar

Use the toolbar to configure and customize the component. The following options are available:

- **Color**: Select a fill color for the body of the component and an accent color for its symbol. You can use the same colors on 2D and 3D views or different colors for each.

## API

Use [the Cloudcraft API][1] to programmatically access and render your architecture diagrams as JSON objects. The following is an example JSON object of an AKS Pod component:

### Schema

```json
{
    "type": "azureakspod",
    "id": "28efba36-1f3f-48ef-a1df-0d5473bcbf6e",
    "resourceId":"/subscriptions/fd182fc4-48dc-4825-88da-1c1c59c7eab5/resourceGroups/DOC-RESOURCE-GROUP/providers/Microsoft.ContainerService/managedClusters/doc-cluster/pods/default/doc-agent-fdf8f8fb7",
    "region": "eastus",
    "mapPos": [4,5.25],
    "color": {
        "isometric": "#075693",
        "2d": "#075693"
    },
    "accentColor": {
        "isometric": "#2EC8EA",
        "2d": "#2EC8EA"
    },
    "link": "https://azure.microsoft.com/products/kubernetes-service",
    "locked": true
}
```

- **type: string**. The type of component. Must be a string of value `azureakspod` for this component.
- **id: string, uuid**. The unique identifier for the component. The API uses a UUID v4 internally but accepts any unique string.
- **resourceId: string**. The globally unique identifier for the component within Azure.
- **region: string**. The Azure region for the component. The API supports all global regions, except China.
- **mapPos: array**. The position of the component in the blueprint. The API uses a unique X and Y coordinate pair to express positioning.
- **color: object**. The fill color for the component body.
  - **isometric: string**. A hexadecimal color for the component body in 3D view. Defaults to `#075693`.
  - **2d: string**. A hexadecimal color for the component body in 2D view. Defaults to `#075693`.
- **accentColor: object**. The accent color for the component logo.
  - **isometric: string**. A hexadecimal color for the component logo in 3D view. Defaults to `#2EC8EA`.
  - **2d: string**. A hexadecimal color for the component logo in 2D view. Defaults to `#2EC8EA`.
- **link: string, uri**. A URI that links the component to another diagram or an external website. Accepts one of two formats, `blueprint://` or `https://`.
- **locked: boolean**. Whether to allow changes to the position of the component through the web interface. Defaults to `false`.

[1]: https://developers.cloudcraft.co/
