---
title: "ECS Task Component"
---
## Overview

Use the ECS Task component to visualize Amazon ECS tasks from your Amazon Web Services architecture.

{{< img src="cloudcraft/components-aws/ecs-task/component-ecs-task-diagram.png" alt="Screenshot of an isometric Cloudcraft diagram showing interconnected AWS components." responsive="true" style="width:60%;">}}

## Toolbar

Use the toolbar to configure and customize the component. The following options are available:

- **Color**: Select a fill color for the body of the component. You can use the same colors for the 2D and 3D views or different colors for each.
- **Launch type**: Select the launch type for your standalone task. Supported options are Fargate and EC2.
- **CPU**: Select the CPU at the task level. This option is not available for EC2.
- **Memory (GB)**: Select the amount of memory available at the task level. This option is not available for EC2.
- **Storage (GiB)**: Enter the amount of storage provisioned for the task, in gibibytes. This option is not available for EC2.

## API

Use the [Cloudcraft API][1] to programmatically access and render your architecture diagrams as JSON objects. 

### Schema

The following is an example JSON object of a ECS Task component:

```json
{
    "type": "ecstask",
    "id": "d76098b3-0d07-4362-80c9-018e474bb910",
    "arn": "arn:aws:ecs:us-east-1:746399320916:task/ecs-cluster/9790893504785954834",
    "region": "us-west-2",
    "mapPos": [7.5,3],
    "launchType": "fargate",
    "cpu": "256",
    "memoryGB": "0.5",
    "storageGB": 20,
    "color": {
        "isometric": "#ffeb3b",
        "2d": "#ffeb3b"
    },
    "link": "https://aws.amazon.com/ecs/",
    "locked": true
}
```

- **type: string**: The type of component. Must be a string of value `ecstask` for this component.
- **id: string, uuid**: The unique identifier for the component. The API uses a UUID v4 internally but accepts any unique string.
- **arn: string**: The globally unique identifier for the component within AWS, known as the [Amazon Resource Names][2].
- **region: string**: The AWS region for the component. The API supports all global regions, [except for AWS China][3].
- **mapPos: array**: The position of the component in the blueprint, expressed as an x- and y-coordinate pair.
- **launchType: string**: The launch type for the standalone task. Accepts one of the following values: `fargate` or `ec2`. Defaults to `ec2`.
- **cpu: number**: The number of vCPUs at the task level. See [Accepted values for cpu](#accepted-values-for-cpu) for more information. Defaults to `256`.
- **memoryGB: number**: The amount of memory at the task level. See [Accepted values for memoryGB](#accepted-values-for-memorygb) for more information. Defaults to `0.5`.
- **storageGB: number**: The amount of storage provisioned for the task, in gibibytes. Accepts a value between `20` and `200`. Defaults to `20`.
- **color: object**: The fill color for the component body.
  - **isometric: string**: A hexadecimal color for the component body in the 3D view. Defaults to `#ececed` for EC2 and `#3c3c3c` for Fargate.
  - **2d: string**: A hexadecimal color for the component body in the 2D view. Defaults to `#d86613`.
- **link: string, uri**: A URI that links the component to another diagram or an external website. Accepts one of the following formats: `blueprint://` or `https://`.
- **locked: boolean**: Whether to allow changes to the position of the component through the web interface. Defaults to `false`.

## Accepted values for `cpu`

The `cpu` key accepts the following values:

```
256, 512, 1024, 2048, 4096
```

**Note**: This key does not do anything if you set `launchType` to `ec2`.

## Accepted values for `memoryGB`

The `memoryGB` key accepts the following values:

```
0.5, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30
```

**Note**: This key does not do anything if you set `launchType` to `ec2`.

## Valid combinations for `cpu` and `memoryGB`

The `cpu` and `memoryGB` keys together determine the size of your task, but you must provide a valid combination of values.

The table below shows which combinations are valid.

CPU  | memoryGB
---- | ---------
256  | 0.5, 1, 2
512  | {1..4}
1024 | {2..8}
2048 | {4..16}
4096 | {8..30}

[1]: https://developers.cloudcraft.co/
[2]: https://docs.aws.amazon.com/general/latest/gr/aws-arns-and-namespaces.html
[3]: /cloudcraft/faq/scan-error-aws-china-region/
