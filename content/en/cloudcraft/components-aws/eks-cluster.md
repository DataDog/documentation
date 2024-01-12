---
title: "Component: EKS cluster"
kind: guide
---

{{< img src="cloudcraft/components-aws/eks-cluster/component-eks-cluster-diagram.png" alt="Screenshot of an isometric Cloudcraft diagram showing interconnected AWS components." responsive="true" style="width:100%;">}}

You can use the **EKS Cluster** component to represent and visualize Amazon EKS clusters from your Amazon Web Services architecture with Cloudcraft.

<section class="alert alert-info">
  <p>Scanning Amazon EKS components requires <a href="https://help.cloudcraft.co/article/152-connect-amazon-eks-cluster-with-cloudcraft">authorizing our IAM role for view-only access</a>.</p>
</section>

## Toolbar

To configure or customize how your cluster looks in a diagram, you can use the toolbar that appears when selecting a component inside the application.

### Option

{{< img src="cloudcraft/components-aws/eks-cluster/component-eks-cluster-toolbar.png" alt="Screenshot of a Cloudcraft interface showing configuration options for the 'EKS cluster' component with pricing information." responsive="true" style="width:100%;">}}

For the **EKS Cluster** component, the following options are available:

- **Color**. Select a fill color for the top of the component and an accent color for the bottom and logo. You can use the same colors on 2D and 3D views or different colors for each.
- **Name**. Enter a name for the cluster.

You can also add the **EKS Cluster** component to [VPCs](https://help.cloudcraft.co/article/118-component-vpc), [security groups](https://help.cloudcraft.co/article/119-component-security-group), and [subnets](https://help.cloudcraft.co/article/120-component-subnet).

## API

Suppose you need programmatic access and remote rendering of architecture diagrams. In that case, [the Cloudcraft API](https://developers.cloudcraft.co/) provides an interface for you to interact with your AWS account within Cloudcraft by sending and receiving data as JSON objects.

### Schema

```json
{
    "type": "ekscluster",
    "id": "0b9f9ea3-2ba7-46fd-bd40-cd694dc38af6",
    "arn": "arn:aws:eks:us-east-1:987867537671:cluster/eks-cluster",
    "region": "us-east-1",
    "mapPos": [2.5,-1.75],
    "name": "EKS Cluster",
    "nodes": [
        "c00c8af0-d409-4a1c-9db4-e2f96128ad56",
        "3d911e8b-2d8e-4cb7-8eb8-61b2e96c75b3"
    ],
    "color": {
        "isometric": "#000000",
        "2d": "#000000"
    },
    "accentColor": {
        "isometric": "#ff5722",
        "2d": "#ff5722"
    },
    "link": "https://aws.amazon.com/eks/",
    "locked": true
}
```

The **EKS Cluster** component schema representation follows the format above and defines all fields within a diagram for this component.

- **type: string**. The type of component. Must be a string of value `ekscluster` for this component.
- **id: string, uuid**. The unique identifier for the component. The API uses a UUID v4 internally but accepts any unique string.
- **arn: string**. The globally unique identifier for the component within AWS, known as [Amazon Resource Names](https://docs.aws.amazon.com/general/latest/gr/aws-arns-and-namespaces.html).
- **region: string**. The AWS region for the component. The API supports all global regions, [except for AWS China](https://help.cloudcraft.co/article/110-scan-error-aws-china-region).
- **mapPos: array**. The position of the component in the blueprint. The API uses a unique X and Y coordinate pair to express positioning.
- **name: string**. The name of the cluster. Defaults to `EKS Cluster`.
- **nodes: array**. The workloads running inside the cluster. Accepts an array of unique identifiers for [the EKS Workload component](https://help.cloudcraft.co/article/155-component-eks-workload).
- **color: object**. The fill color for the top of the component body.
  - **isometric: string**. A hexadecimal color for the component body in 3D view. Defaults to `#ECECED`.
  - **2d: string**. A hexadecimal color for the component body in 2D view. Defaults to `#ECECED`.
- **accentColor: object**. The accent color for the bottom of the component body and its logo.
  - **isometric: string**. A hexadecimal color for the bottom of the component body and its logo in 3D view. Defaults to `#4286C5`.
  - **2d: string**. A hexadecimal color for the component logo in 2D view. Defaults to `#693CC5`.
- **link: string, uri**. A URI that links the component to another diagram or an external website. Accepts one of two formats, `blueprint://` or `https://`.
- **locked: boolean**. Whether to allow changes to the position of the component through the web interface. Defaults to `false`.
