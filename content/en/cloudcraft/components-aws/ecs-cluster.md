---
title: "Component: ECS cluster"
kind: guide
---

{{< img src="cloudcraft/components-aws/ecs-cluster/component-ecs-cluster-diagram.png" alt="Screenshot of an isometric Cloudcraft diagram showing interconnected AWS components." responsive="true" style="width:100%;">}}

You can use the **ECS Cluster** component to represent and visualize Amazon ECS clusters from your Amazon Web Services architecture with Cloudcraft.

## Toolbar

To configure or customize how your cluster looks in a diagram, you can use the toolbar that appears when selecting a component inside the application.

### Option

{{< img src="cloudcraft/components-aws/ecs-cluster/component-ecs-cluster-toolbar.png" alt="Screenshot of a Cloudcraft interface showing configuration options for the 'ECS Cluster' component with pricing information." responsive="true" style="width:100%;">}}

For the **ECS Cluster** component, the following options are available:

- **Color**. Select a fill color for the top of the component and an accent color for the bottom. You can use the same colors on 2D and 3D views or different colors for each.
- **Name**. Enter a name for the cluster. You can use up to 255 letters, numbers, hyphens, and underscores.

You can also add the **ECS Cluster** component to [VPCs](https://help.cloudcraft.co/article/118-component-vpc) and [subnets](https://help.cloudcraft.co/article/120-component-subnet).

## API

Suppose you need programmatic access and remote rendering of architecture diagrams. In that case, [the Cloudcraft API](https://developers.cloudcraft.co/) provides an interface for you to interact with your AWS account within Cloudcraft by sending and receiving data as JSON objects.

### Schema

```json
{
    "type": "ecscluster",
    "id": "c28296e2-01b1-463c-be6d-fe748a3dba05",
    "arn": "arn:aws:ecs:us-east-1:746399320916:cluster/ecs-cluster",
    "region": "us-east-1",
    "mapPos": [3,-1.75],
    "name": "ECS Cluster",
    "nodes": [
        "35578835-bb50-43f6-b9bc-d9a7ff20f667",
        "adad4f6e-b1dc-4e90-a860-e6c34d1d707a",
        "6321a7c4-db1f-4b47-a2dd-2d4c1a3deaff",
        "bafdae24-a6af-47ad-896d-846d790c8b23",
        "117a0f24-a115-4f12-8627-e8c8b9665d86",
        "c4af84a8-a02d-400e-9277-ad1ed886390f",
        "93a34859-a6ef-451d-96c2-4cfccab86d70",
        "b0e607e8-8b01-492b-b4a0-f4eea35d19f1",
        "085ca535-3b23-420c-a19c-27ae3d11a2ab",
        "eb7cc62b-db25-4ce4-97dd-130bb288512a"
    ],
    "color": {
        "isometric": "#ffeb3b",
        "2d": "#ffeb3b"
    },
    "accentColor": {
        "isometric": "#000000",
        "2d": "#000000"
    },
    "link": "https://aws.amazon.com/ecs/",
    "locked": true
}
```

The **ECS Cluster** component schema representation follows the format above and defines all fields within a diagram for this component.

- **type: string**. The type of component. Must be a string of value `ecscluster` for this component.
- **id: string, uuid**. The unique identifier for the component. The API uses a UUID v4 internally but accepts any unique string.
- **arn: string**. The globally unique identifier for the component within AWS, known as [Amazon Resource Names](https://docs.aws.amazon.com/general/latest/gr/aws-arns-and-namespaces.html).
- **region: string**. The AWS region for the component. The API supports all global regions, [except for AWS China](https://help.cloudcraft.co/article/110-scan-error-aws-china-region).
- **mapPos: array**. The position of the component in the blueprint. The API uses a unique X and Y coordinate pair to express positioning.
- **name: string**. The name of the cluster. Accepts up to 255 letters, numbers, hyphens, and underscores.
- **nodes: array**. The services and tasks running inside the cluster. Accepts an array of unique identifiers for services and tasks components.
- **color: object**. The fill color for the top of the component body.
  - **isometric: string**. A hexadecimal color for the component body in 3D view. Defaults to `#ececed`.
  - **2d: string**. A hexadecimal color for the component body in 2D view. Defaults to `#ececed`.
- **accentColor: object**. The accent color for the bottom of the component body.
  - **isometric: string**. A hexadecimal color for the component logo in 3D view. Defaults to `#4286c5`.
  - **2d: string**. A hexadecimal color for the component logo in 2D view. Defaults to `#693cc5`.
- **link: string, uri**. A URI that links the component to another diagram or an external website. Accepts one of two formats, `blueprint://` or `https://`.
- **locked: boolean**. Whether to allow changes to the position of the component through the web interface. Defaults to `false`.
