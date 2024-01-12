---
title: "Component: Glacier"
kind: guide
---

{{< img src="cloudcraft/components-aws/glacier/component-glacier-diagram.png" alt="Screenshot of an isometric Cloudcraft diagram showing interconnected AWS components." responsive="true" style="width:100%;">}}

You can use the **Glacier** component to represent and visualize long-term storage classes from your Amazon Web Services architecture with Cloudcraft.

## Toolbar

To configure or customize how your repository looks in a diagram, you can use the toolbar that appears when selecting a component inside the application.

### Options

{{< img src="cloudcraft/components-aws/glacier/component-glacier-toolbar.png" alt="Screenshot of a Cloudcraft interface showing configuration options for the 'Glacier' component with pricing information." responsive="true" style="width:100%;">}}

For the **Glacier** component, the following options are available:

- **Color**. Select a fill color for the body of the component and an accent color for its symbol. You can use the same colors on 2D and 3D views or different colors for each.
- **Storage (GB)**. Enter the total volume of storage available for your vault in gigabytes.
- **Retrieval Type**. Choose the retrieval type for your vault.
- **Retrieval Req. / mo (K)**. Enter the number of retrieval requests per month in the thousands.
- **Retrieval Data (GB)**. Enter the volume of data retrieved in gigabytes.
- **Upload Req. / mo (K)**. Enter the number of retrieval upload requests per month in the thousands.

## API

Suppose you need programmatic access and remote rendering of architecture diagrams. In that case, [the Cloudcraft API](https://developers.cloudcraft.co/) provides an interface for you to interact with your AWS account within Cloudcraft by sending and receiving data as JSON objects.

### Schema

```json
{
    "type": "glaciervault",
    "id": "a3dd25ed-5508-43f3-9041-8bd480906514",
    "region": "us-east-1",
    "mapPos": [4,6],
    "storageDataGb": 10,
    "retrievalType": "standard",
    "retrievalDataGb": 0,
    "retrievalRequests": 0,
    "uploadRequests": 0,
    "color": {
        "isometric": "#ECECED",
        "2d": "#3F8624"
    },
    "accentColor": {
        "isometric": "#4286C5",
        "2d": "#FFFFFF"
    },
    "link": "https://aws.amazon.com/glacier/",
    "locked": true
}
```

The **Glacier** component schema representation follows the format above and defines all fields within a diagram for this component.

- **type: string**. The type of component. Must be a string of value `glaciervault` for this component.
- **id: string, uuid**. The unique identifier for the component. The API uses a UUID v4 internally but accepts any unique string.
- **arn: string**. The globally unique identifier for the component within AWS, known as [Amazon Resource Names](https://docs.aws.amazon.com/general/latest/gr/aws-arns-and-namespaces.html).
- **region: string**. The AWS region for the component. The API supports all global regions, [except for AWS China](https://help.cloudcraft.co/article/110-scan-error-aws-china-region).
- **mapPos: array**. The position of the component in the blueprint. The API uses a unique X and Y coordinate pair to express positioning.
- **storageDataGb: number**. The total volume of storage available for the Glacier vault in gigabytes. Defaults to `10`.
- **retrievalType: string**. The retrieval type for the Glacier vault. Accepts one of three options, `expedited`, `standard`, or `bulk`. Defaults to `standard`.
- **retrievalDataGb: number**. The volume of data retrieved in gigabytes. Defaults to `0`.
- **retrievalRequests: number**. The number of retrieval requests per month in the thousands. Defaults to `0`.
- **uploadRequests: number**. The number of upload requests per month inthe thousands. Defaults to `0`.
- **color: object**. The fill color for the component body.
  - **isometric: string**. A hexadecimal color for the component body in 3D view. Defaults to `#ECECED`.
  - **2d: string**. A hexadecimal color for the component body in 2D view. Defaults to `#3F8624`.
- **accentColor: object**. The accent color for the component logo.
  - **isometric: string**. A hexadecimal color for the component logo in 3D view. Defaults to `#4286C5`.
  - **2d: string**. A hexadecimal color for the component logo in 2D view. Defaults to `#FFFFFF`.
- **link: string, uri**. A URI that links the component to another diagram or an external website. Accepts one of two formats, `blueprint://` or `https://`.
- **locked: boolean**. Whether to allow changes to the position of the component through the web interface. Defaults to `false`.
