---
title: "Component: ECR repository"
kind: guide
---

{{< img src="cloudcraft/components-aws/ecr-repository/component-ecr-repository-diagram.png" alt="Screenshot of an isometric Cloudcraft diagram showing interconnected AWS components." responsive="true" style="width:100%;">}}

You can use the **ECR Repository** component to represent and visualize container repositories from your Amazon Web Services architecture with Cloudcraft.

## Toolbar

To configure or customize how your repository looks in a diagram, you can use the toolbar that appears when selecting a component inside the application.

### Options

{{< img src="cloudcraft/components-aws/ecr-repository/component-ecr-repository-toolbar.png" alt="Screenshot of a Cloudcraft interface showing configuration options for the 'ECR Repository' component with pricing information." responsive="true" style="width:100%;">}}

For the **ECR Repository** component, the following options are available:

- **Color**. Select a fill color for the body of the component and an accent color for its symbol. You can use the same colors on 2D and 3D views or different colors for each.
- **Data stored (GB)**. Enter the amount of data you store in your repositories.
- **Private**. Select if your repository is public or private.

## API

Suppose you need programmatic access and remote rendering of architecture diagrams. In that case, [the Cloudcraft API](https://developers.cloudcraft.co/) provides an interface for you to interact with your AWS account within Cloudcraft by sending and receiving data as JSON objects.

### Schema

```json
{
    "type": "ecr",
    "id": "15e88546-33f3-40d5-b88c-e7cdae335da8",
    "arn": "arn:aws:ecr:us-east-1:728720640411:repository/cloudcraft",
    "region": "us-east-1",
    "mapPos": [7.5,6],
    "storageGB": 1,
    "private": true,
    "color": {
        "isometric": "#ff9800",
        "2d": "#ff9800"
    },
    "accentColor": {
        "isometric": "#ffffff",
        "2d": "#ffffff"
    },
    "link": "https://aws.amazon.com/ecr/",
    "locked": true
}
```

The **ECR Repository** component schema representation follows the format above and defines all fields within a diagram for this component.

- **type: string**. The type of component. Must be a string of value `ecr` for this component.
- **id: string, uuid**. The unique identifier for the component. The API uses a UUID v4 internally but accepts any unique string.
- **arn: string**. The globally unique identifier for the component within AWS, known as [Amazon Resource Names](https://docs.aws.amazon.com/general/latest/gr/aws-arns-and-namespaces.html).
- **region: string**. The AWS region for the component. The API supports all global regions, [except for AWS China](https://help.cloudcraft.co/article/110-scan-error-aws-china-region).
- **mapPos: array**. The position of the component in the blueprint. The API uses a unique X and Y coordinate pair to express positioning.
- **storageGB: number**. The amount of data stored in the repositories inside the registry, in gigabytes. Defaults to `1`.
- **private: boolean**. Whether the repository is private. Defaults to `true`.
- **color: object**. The fill color for the component body.
  - **isometric: string**. A hexadecimal color for the component body in 3D view. Defaults to `#3F7DDE`.
  - **2d: string**. A hexadecimal color for the component body in 2D view. Defaults to `#D86613`.
- **accentColor: object**. The accent color for the component logo.
  - **isometric: string**. A hexadecimal color for the component logo in 3D view. Defaults to `#052048`.
  - **2d: string**. A hexadecimal color for the component logo in 2D view. Defaults to `#FFFFFF`.
- **link: string, uri**. A URI that links the component to another diagram or an external website. Accepts one of two formats, `blueprint://` or `https://`.
- **locked: boolean**. Whether to allow changes to the position of the component through the web interface. Defaults to `false`.
