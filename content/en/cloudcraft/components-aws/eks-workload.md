---
title: "Component: EKS workload"
kind: guide
---

{{< img src="cloudcraft/components-aws/eks-workload/component-eks-workload-diagram.png" alt="Screenshot of an isometric Cloudcraft diagram showing interconnected AWS components." responsive="true" style="width:100%;">}}

You can use the **EKS Workload** component to represent and visualize Amazon EKS workloads from your Amazon Web Services architecture with Cloudcraft.

<section class="alert alert-info">
  <p>Scanning Amazon EKS components requires <a href="https://help.cloudcraft.co/article/152-connect-amazon-eks-cluster-with-cloudcraft">authorizing our IAM role for view-only access</a>.</p>
</section>

## Toolbar

To configure or customize how your workload looks in a diagram, you can use the toolbar that appears when selecting a component inside the application.

### Option

{{< img src="cloudcraft/components-aws/eks-workload/component-eks-workload-toolbar.png" alt="Screenshot of a Cloudcraft interface showing configuration options for the 'EKS workload' component with pricing information." responsive="true" style="width:100%;">}}

For the **EKS Workload** component, the following options are available:

- **Color**. Select a fill color for the top of the component and an accent color for the bottom. You can use the same colors on 2D and 3D views or different colors for each.
- **Name**. Enter a name for the workload.
- **Type**. Select the type of workload to use.

## API

Suppose you need programmatic access and remote rendering of architecture diagrams. In that case, [the Cloudcraft API][1] provides an interface for you to interact with your AWS account within Cloudcraft by sending and receiving data as JSON objects.

### Schema

```json
{
    "type": "eksworkload",
    "id": "a5cad956-3366-4582-a73a-2709d53e975f",
    "region": "us-east-1",
    "mapPos": [3.5,-0.75],
    "name": "EKS Workload",
    "workloadType": "deployment",
    "nodes": [
        "cadf6a3f-67d2-4df9-ad40-f892030af58b",
        "a9437fdf-56f9-4c3b-8acf-6f0f37f70980",
        "b15e51da-b99b-4072-b4c4-e9e85df7e285",
        "b5878fa9-bf1a-44d0-bc8d-336f99763fce"
    ],
    "color": {
        "isometric": "#f44336",
        "2d": "#f44336"
    },
    "accentColor": {
        "isometric": "#f44336",
        "2d": "#f44336"
    },
    "link": "https://aws.amazon.com/eks/",
    "locked": true
}
```

The **EKS Workload** component schema representation follows the format above and defines all fields within a diagram for this component.

- **type: string**. The type of component. Must be a string of value `eksworkload` for this component.
- **id: string, uuid**. The unique identifier for the component. The API uses a UUID v4 internally but accepts any unique string.
- **arn: string**. The globally unique identifier for the component within AWS, known as [Amazon Resource Names][2].
- **region: string**. The AWS region for the component. The API supports all global regions, [except for AWS China][3].
- **mapPos: array**. The position of the component in the blueprint. The API uses a unique X and Y coordinate pair to express positioning.
- **name: string**. The name of the workload. Defaults to `EKS Workload`.
- **workloadType: string**. The type of the workload on the cluster. [See below for more information](#accepted-values-for-workloadType). Defaults to `deployment`.
- **nodes: array**. The pods running on this workload. Accepts an array of unique identifiers of EKS Pods.
- **color: object**. The fill color for the top of the component body.
  - **isometric: string**. A hexadecimal color for the component body in 3D view. Defaults to `#FFFFFF`.
  - **2d: string**. A hexadecimal color for the component body in 2D view. Defaults to `#FFFFFF`.
- **accentColor: object**. The accent color for the bottom of the component body.
  - **isometric: string**. A hexadecimal color for the component logo in 3D view. Defaults to `#4286C5`.
  - **2d: string**. A hexadecimal color for the component logo in 2D view. Defaults to `#693CC5`.
- **link: string, uri**. A URI that links the component to another diagram or an external website. Accepts one of two formats, `blueprint://` or `https://`.
- **locked: boolean**. Whether to allow changes to the position of the component through the web interface. Defaults to `false`.

## Accepted values for workloadType

The `workloadType` key accepts one of the following string values:

```
deployment, statefulSet, daemonSet, job, cronJob
```

[1]: https://developers.cloudcraft.co/
[2]: https://docs.aws.amazon.com/general/latest/gr/aws-arns-and-namespaces.html
[3]: https://help.cloudcraft.co/article/110-scan-error-aws-china-region
