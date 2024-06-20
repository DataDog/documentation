---
title: "EKS Pod Component"
---
## Overview

<div class="alert alert-info">Scanning Amazon EKS components requires <a href="https://docs.datadoghq.com/cloudcraft/getting-started/connect-amazon-eks-cluster-with-cloudcraft/">authorizing Cloudcraft's IAM role for view-only access</a>.</div>

Use the EKS Pod component to visualize Amazon EKS containers from your Amazon Web Services architecture.

{{< img src="cloudcraft/components-aws/eks-pod/component-eks-pod-diagram.png" alt="Screenshot of an isometric Cloudcraft diagram showing interconnected AWS components." responsive="true" style="width:60%;">}}

## Toolbar

Use the toolbar to configure and customize the component. The following options are available:

- **Color**: Select a fill color for the body of the component and an accent color for the symbol. You can use the same colors for the 2D and 3D views or different colors for each.
- **Compute**: Select the type of worker node. Supported options are Fargate and Node Group.
- **CPU**: Select the vCPU value for your pod. This option is not available for Node Groups.
- **Memory (GB)**: Select the amount of memory available for the pod. This option is not available for Node Groups.

## API

Use the [Cloudcraft API][1] to programmatically access and render your architecture diagrams as JSON objects.

### Schema

The following is an example JSON object of a EKS Pod component:

```
{
    "type": "ekspod",
    "id": "cc5104b0-1747-441c-a7b7-b760796d475b",
    "region": "us-east-1",
    "mapPos": [6.5,2.5],
    "compute": "fargateProfile",
    "cpu": "0.25",
    "memoryGB": "0.5",
    "color": {
        "isometric": "#ff9800",
        "2d": "#ff9800"
    },
    "accentColor": {
        "isometric": "#000000",
        "2d": "#000000"
    },
    "link": "https://aws.amazon.com/eks/",
    "locked": true
}
```

The **EKS Pod** component schema representation follows the format above and defines all fields within a diagram for this component.

- **type: string**: The type of component. Must be a string of value `ekspod` for this component.
- **id: string, uuid**: The unique identifier for the component. The API uses a UUID v4 internally but accepts any unique string.
- **arn: string**: The globally unique identifier for the component within AWS, known as the [Amazon Resource Names][2].
- **region: string**: The AWS region for the component. All global regions are supported, [except for AWS China][3].
- **mapPos: array**: The position of the component in the blueprint, expressed as an x- and y-coordinate pair.
- **compute: string**: The worker node type for the pod. Accepts one of the following values: `fargateProfile` or `nodeGroup`. Defaults to `nodeGroup`.
- **cpu: number**: The number of vCPUs available for the pod. See [Accepted values for `cpu`](#accepted-values-for-cpu) for more information. Defaults to `0.25`.
- **memoryGB: number**: The amount of memory available for the pod. See [Accepted values for `memoryGB`](#accepted-values-for-memorygb) for more information. Defaults to `0.5`.
- **color: object**: The fill color for the component body.
  - **isometric: string**: A hexadecimal color for the component body in the 3D view. Defaults to `#3C3C3C`.
  - **2d: string**: A hexadecimal color for the component body in the 2D view. Defaults to `#D86613`.
- **accentColor: object**: The accent color for the component logo.
  - **isometric: string**: A hexadecimal color for the component logo in the 3D view. Defaults to `#FF9800`.
  - **2d: string**: A hexadecimal color for the component logo in the 2D view. Defaults to `#FFFFFF`.
- **link: string, uri**: A URI that links the component to another diagram or an external website. Accepts one of the following formats: `blueprint://` or `https://`.
- **locked: boolean**: Whether to allow changes to the position of the component through the web interface. Defaults to `false`.

## Accepted values for `cpu`

The `cpu` key accepts the following values:

```
0.25, 0.5, 1, 2, 4
```

**Note**: This key only affects pods when `compute` is set to `fargateProfile`.

## Accepted values for `memoryGB`

The `memoryGB` key accepts the following values:

```
0.5, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30
```

**Note**: This key only affects pods when `compute` is set to `fargateProfile`.

## Valid combinations for `cpu` and `memoryGB`

The `cpu` and `memoryGB` keys together determine the resources allocated to each container in a pod, but you must provide a valid combination of values.

The table below shows which combinations are valid.

cpu   | memoryGB
----  | ---------
0.25  | 0.5, 1, 2
0.5   | {1..4}
1     | {2..8}
2     | {4..16}
4     | {8..30}

[1]: https://developers.cloudcraft.co/
[2]: https://docs.aws.amazon.com/general/latest/gr/aws-arns-and-namespaces.html
[3]: /cloudcraft/faq/scan-error-aws-china-region/
