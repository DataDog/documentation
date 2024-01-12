---
title: "Component: ECS service"
kind: guide
---

{{< img src="cloudcraft/components-aws/ecs-service/component-ecs-service-diagram.png" alt="Screenshot of an isometric Cloudcraft diagram showing interconnected AWS components." responsive="true" style="width:100%;">}}

You can use the **ECS Service** component to represent and visualize Amazon ECS services from your Amazon Web Services architecture with Cloudcraft.

## Toolbar

To configure or customize how your service looks in a diagram, you can use the toolbar that appears when selecting a component inside the application.

### Option

{{< img src="cloudcraft/components-aws/ecs-service/component-ecs-service-toolbar.png" alt="Screenshot of a Cloudcraft interface showing configuration options for the 'ECS Service' component with pricing information." responsive="true" style="width:100%;">}}

For the **ECS Service** component, the following options are available:

- **Color**. Select a fill color for the top of the component and an accent color for the bottom. You can use the same colors on 2D and 3D views or different colors for each.
- **Name**. Enter a name for the service.

You can also add the **ECS Service** component to [VPCs](https://help.cloudcraft.co/article/118-component-vpc), [security groups](https://help.cloudcraft.co/article/119-component-security-group), and [subnets](https://help.cloudcraft.co/article/120-component-subnet).

## API

Suppose you need programmatic access and remote rendering of architecture diagrams. In that case, [the Cloudcraft API](https://developers.cloudcraft.co/) provides an interface for you to interact with your AWS account within Cloudcraft by sending and receiving data as JSON objects.

### Schema

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

The **ECS Service** component schema representation follows the format above and defines all fields within a diagram for this component.

- **type: string**. The type of component. Must be a string of value `ecsservice` for this component.
- **id: string, uuid**. The unique identifier for the component. The API uses a UUID v4 internally but accepts any unique string.
- **arn: string**. The globally unique identifier for the component within AWS, known as [Amazon Resource Names](https://docs.aws.amazon.com/general/latest/gr/aws-arns-and-namespaces.html).
- **region: string**. The AWS region for the component. The API supports all global regions, [except for AWS China](https://help.cloudcraft.co/article/110-scan-error-aws-china-region).
- **mapPos: array**. The position of the component in the blueprint. The API uses a unique X and Y coordinate pair to express positioning.
- **name: string**. The name of the service. Defaults to `ECS Service`.
- **nodes: array**. The tasks running inside the service. Accepts an array of unique identifiers for tasks of launch type EC2 or Fargate.
- **color: object**. The fill color for the top of the component body.
  - **isometric: string**. A hexadecimal color for the component body in 3D view. Defaults to `#ffffff`.
  - **2d: string**. A hexadecimal color for the component body in 2D view. Defaults to `#ffffff`.
- **accentColor: object**. The accent color for the bottom of the component body.
  - **isometric: string**. A hexadecimal color for the component logo in 3D view. Defaults to `#4286c5`.
  - **2d: string**. A hexadecimal color for the component logo in 2D view. Defaults to `#693cc5`.
- **link: string, uri**. A URI that links the component to another diagram or an external website. Accepts one of two formats, `blueprint://` or `https://`.
- **locked: boolean**. Whether to allow changes to the position of the component through the web interface. Defaults to `false`.
