---
title: "EKS Cluster Component"
---
## Overview

<div class="alert alert-info">Scanning Amazon EKS components requires <a href="https://docs.datadoghq.com/cloudcraft/getting-started/connect-amazon-eks-cluster-with-cloudcraft/">authorizing Cloudcraft's IAM role for view-only access</a>.</div>

Use the EKS Cluster component to visualize Amazon EKS clusters from your Amazon Web Services architecture.

{{< img src="cloudcraft/components-aws/eks-cluster/component-eks-cluster-diagram.png" alt="Screenshot of an isometric Cloudcraft diagram showing interconnected AWS components." responsive="true" style="width:60%;">}}

## Toolbar

Use the toolbar to configure and customize the component. The following options are available:

- **Color**: Select a fill color for the top of the component and an accent color for the bottom and logo. You can use the same colors for the 2D and 3D views or different colors for each.
- **Name**: Enter a name for the cluster.

You can also add the **EKS Cluster** component to [VPCs][1], [security groups][2], and [subnets][3].

## API

Use the [Cloudcraft API][1] to programmatically access and render your architecture diagrams as JSON objects.

### Schema

The following is an example JSON object of a EKS Cluster component:

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

- **type: string**: The type of component. Must be a string of value `ekscluster` for this component.
- **id: string, uuid**: The unique identifier for the component. The API uses a UUID v4 internally but accepts any unique string.
- **arn: string**: The globally unique identifier for the component within AWS, known as the [Amazon Resource Names][5].
- **region: string**: The AWS region for the component. All global regions are supported, [except for AWS China][6].
- **mapPos: array**: The position of the component in the blueprint, expressed as an x- and y-coordinate pair.
- **name: string**: The name of the cluster. Defaults to `EKS Cluster`.
- **nodes: array**: The workloads running inside the cluster. Accepts an array of unique identifiers for [the EKS Workload component][7].
- **color: object**: The fill color for the top of the component body.
  - **isometric: string**: A hexadecimal color for the component body in the 3D view. Defaults to `#ECECED`.
  - **2d: string**: A hexadecimal color for the component body in the 2D view. Defaults to `#ECECED`.
- **accentColor: object**: The accent color for the bottom of the component body and its logo.
  - **isometric: string**: A hexadecimal color for the bottom of the component body and its logo in the 3D view. Defaults to `#4286C5`.
  - **2d: string**: A hexadecimal color for the component logo in the 2D view. Defaults to `#693CC5`.
- **link: string, uri**: A URI that links the component to another diagram or an external website. Accepts one of the following formats: `blueprint://` or `https://`.
- **locked: boolean**: Whether to allow changes to the position of the component through the web interface. Defaults to `false`.

[1]: /cloudcraft/components-aws/vpc/
[2]: /cloudcraft/components-aws/security-group/
[3]: /cloudcraft/components-aws/subnet/
[4]: https://developers.cloudcraft.co/
[5]: https://docs.aws.amazon.com/general/latest/gr/aws-arns-and-namespaces.html
[6]: /cloudcraft/faq/scan-error-aws-china-region/
[7]: /cloudcraft/components-aws/eks-workload/
