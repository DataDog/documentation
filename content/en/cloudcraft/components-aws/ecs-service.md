---
title: "ECS Service Component"
---
## Overview

Use the ECS Service component to visualize Amazon ECS services from your Amazon Web Services architecture.

{{< img src="cloudcraft/components-aws/ecs-service/component-ecs-service-diagram.png" alt="Screenshot of an isometric Cloudcraft diagram showing interconnected AWS components." responsive="true" style="width:60%;">}}

## Toolbar

Use the toolbar to configure and customize the component. The following options are available:

- **Color**: Select a fill color for the top of the component and an accent color for the bottom. You can use the same colors on the 2D and 3D views or different colors for each.
- **Name**: Enter a name for the service.

You can also add the **ECS Service** component to [VPCs][1], [security groups][2], and [subnets][3].

## API

Use the [Cloudcraft API][1] to programmatically access and render your architecture diagrams as JSON objects. T

### Schema

The following is an example JSON of a ECS Service component:

```json
{
    "type": "ecsservice",
    "id": "58c88e1f-b9c7-47a0-aed1-ee8324bf0fd0",
    "arn": "arn:aws:ecs:us-east-1:746399320916:service/ecs-service",
    "region": "us-east-1",
    "mapPos": [6,1],
    "name": "ECS Service",
    "nodes": [
        "1005e737-2ccc-4325-abdf-b0f6c5c78ea1",
        "319c40a5-d5f2-4394-8784-f613aa1d313b"
    ],
    "color": {
        "isometric": "#000000",
        "2d": "#000000"
    },
    "accentColor": {
        "isometric": "#03a9f4",
        "2d": "#03a9f4"
    },
    "link": "https://aws.amazon.com/ecs/",
    "locked": true
}
```

- **type: string**: The type of component. Must be a string of value `ecsservice` for this component.
- **id: string, uuid**: The unique identifier for the component. The API uses a UUID v4 internally but accepts any unique string.
- **arn: string**: The globally unique identifier for the component within AWS, known as the [Amazon Resource Names][5].
- **region: string**: The AWS region for the component. The API supports all global regions, [except for AWS China][6].
- **mapPos: array**: The position of the component in the blueprint, expressed as an x- and y-coordinate pair.
- **name: string**: The name of the service. Defaults to `ECS Service`.
- **nodes: array**: The tasks running inside the service. Accepts an array of unique identifiers for tasks of launch type EC2 or Fargate.
- **color: object**: The fill color for the top of the component body.
  - **isometric: string**: A hexadecimal color for the component body in the 3D view. Defaults to `#ffffff`.
  - **2d: string**: A hexadecimal color for the component body in the 2D view. Defaults to `#ffffff`.
- **accentColor: object**: The accent color for the bottom of the component body.
  - **isometric: string**: A hexadecimal color for the component logo in the 3D view. Defaults to `#4286c5`.
  - **2d: string**: A hexadecimal color for the component logo in the 2D view. Defaults to `#693cc5`.
- **link: string, uri**: A URI that links the component to another diagram or an external website. Accepts one of the following formats: `blueprint://` or `https://`.
- **locked: boolean**: Whether to allow changes to the position of the component through the web interface. Defaults to `false`.

[1]: /cloudcraft/components-aws/vpc/
[2]: /cloudcraft/components-aws/security-group/
[3]: /cloudcraft/components-aws/subnet/
[4]: https://developers.cloudcraft.co/
[5]: https://docs.aws.amazon.com/general/latest/gr/aws-arns-and-namespaces.html
[6]: /cloudcraft/faq/scan-error-aws-china-region/
