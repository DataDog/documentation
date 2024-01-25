---
title: "Component: AKS workload"
kind: guide
---

{{< img src="cloudcraft/components-azure/aks-workload/component-aks-workload-diagram.png" alt="Screenshot of an isometric Cloudcraft diagram showing interconnected Azure components." responsive="true" style="width:100%;">}}

You can use the **AKS Workload** component to represent and visualize Kubernetes workloads from your Azure environment with Cloudcraft.

## Toolbar

To configure or customize how your repository looks in a diagram, you can use the toolbar that appears when selecting a component inside the application.

### Options

{{< img src="cloudcraft/components-azure/managed-disk/component-managed-disk-toolbar.png" alt="Screenshot of a Cloudcraft interface showing configuration options for the 'AKS Workload' component with pricing information." responsive="true" style="width:100%;">}}

For the **AKS Workload** component, the following options are available:

- **Color**. Select a fill color for the body of the component and an accent color for its symbol. You can use the same colors on 2D and 3D views or different colors for each.
- **Name**. Enter a name for the AKS Workload.
- **Type**. Select the type of workload inside the cluster.

## API

Suppose you need programmatic access and remote rendering of architecture diagrams. In that case, [the Cloudcraft API][1] provides an interface for you to interact with your AWS account within Cloudcraft by sending and receiving data as JSON objects.

### Schema

```json
{
    "type": "azureaksworkload",
    "id": "2d432a67-4b2b-4040-8e4b-19c513bc2491",
    "resourceId": "/subscriptions/2dedf330-e79d-4b8e-82b9-13f6fa619bbb/resourceGroups/DOC-RESOURCE-GROUP/providers/Microsoft.ContainerService/managedClusters/doc-cluster/workloads/default/deployment/doc-agent",
    "region": "eastus",
    "mapPos": [2,3.25],
    "mapSize": [4,4],
    "nodes": [
        "375083c7-8212-4af6-859b-15fdc9da777d",
        "42062b69-bb14-4e05-87db-fa10cb408d5a",
        "26440a62-c06e-48f0-8c03-c5a3a2004050",
        "28efba36-1f3f-48ef-a1df-0d5473bcbf6e"
    ],
    "name": "AKS Workload",
    "workloadType": "deployment",
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

The **AKS Workload** component schema representation follows the format above and defines all fields within a diagram for this component.

- **type: string**. The type of component. Must be a string of value `azureaksworkload` for this component.
- **id: string, uuid**. The unique identifier for the component. The API uses a UUID v4 internally but accepts any unique string.
- **resourceId: string**. The globally unique identifier for the component within Azure.
- **region: string**. The Azure region for the component. The API supports all global regions, except China.
- **mapPos: array**. The position of the component in the blueprint. The API uses a unique X and Y coordinate pair to express positioning.
- **mapSize: array**. The size of the component in the blueprint. The API uses a unique width and height pair to express sizing.
- **nodes: array**. The application containers inside the workload. Accepts an array of unique identifiers for [the AKS Pod component][2].
- **name: string**. The name of the workload. Defaults to `AKS Workload`.
- **workloadType: string**. The type of workload inside the cluster. [See below for more information](#accepted-values-for-workloadType). Defaults to `deployment`.
- **color: object**. The fill color for the component body.
  - **isometric: string**. A hexadecimal color for the component body in 3D view. Defaults to `#CEE0F5`.
  - **2d: string**. A hexadecimal color for the component body in 2D view. Defaults to `#CEE0F5`.
- **accentColor: object**. The accent color for the component logo.
  - **isometric: string**. A hexadecimal color for the component logo in 3D view. Defaults to `#0078D4`.
  - **2d: string**. A hexadecimal color for the component logo in 2D view. Defaults to `#0078D4`.
- **link: string, uri**. A URI that links the component to another diagram or an external website. Accepts one of two formats, `blueprint://` or `https://`.
- **locked: boolean**. Whether to allow changes to the position of the component through the web interface. Defaults to `false`.

## Accepted values for `workloadType`

The `workloadType` key accepts one of the following string values:

```
deployment, statefulSet, daemonSet, job, cronJob
```

[1]: https://developers.cloudcraft.co/
[2]: https://help.cloudcraft.co/article/218-component-aks-pod
