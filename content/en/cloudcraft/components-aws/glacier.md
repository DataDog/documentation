---
title: "Glacier Component"
---
## Overview

Use the Glacier component to visualize long-term storage classes from your Amazon Web Services architecture.

{{< img src="cloudcraft/components-aws/glacier/component-glacier-diagram.png" alt="Screenshot of an isometric Cloudcraft diagram showing interconnected AWS components." responsive="true" style="width:60%;">}}

## Toolbar

Use the toolbar to configure and customize the component. The following options are available:

- **Color**: Select a fill color for the body of the component and an accent color for its symbol. You can use the same colors for the 2D and 3D view or different colors for each.
- **Storage (GB)**: Enter the total volume of storage available for your vault in gigabytes.
- **Retrieval Type**: Choose the retrieval type for your vault.
- **Retrieval Req. / mo (K)**: Enter the number of retrieval requests per month in the thousands.
- **Retrieval Data (GB)**: Enter the volume of data retrieved in gigabytes.
- **Upload Req. / mo (K)**: Enter the number of retrieval upload requests per month in the thousands.

## API

Use the [Cloudcraft API][1] to programmatically access and render your architecture diagrams as JSON objects. 

### Schema

The following is an example JSON of a Glacier component:

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

- **type: string**: The type of component. Must be a string of value `glaciervault` for this component.
- **id: string, uuid**: The unique identifier for the component. The API uses a UUID v4 internally but accepts any unique string.
- **arn: string**: The globally unique identifier for the component within AWS, known as the [Amazon Resource Names][2].
- **region: string**: The AWS region for the component. All global regions are supported, [except for AWS China][6].
- **mapPos: array**: The position of the component in the blueprint. The API uses a unique X and Y coordinate pair to express positioning.
- **storageDataGb: number**: The total volume of storage available for the Glacier vault in gigabytes. Defaults to `10`.
- **retrievalType: string**: The retrieval type for the Glacier vault. Accepts one of three options, `expedited`, `standard`, or `bulk`. Defaults to `standard`.
- **retrievalDataGb: number**: The volume of data retrieved in gigabytes. Defaults to `0`.
- **retrievalRequests: number**: The number of retrieval requests per month in the thousands. Defaults to `0`.
- **uploadRequests: number**: The number of upload requests per month in the thousands. Defaults to `0`.
- **color: object**: The fill color for the component body.
  - **isometric: string**: A hexadecimal color for the component body in the 3D view. Defaults to `#ECECED`.
  - **2d: string**: A hexadecimal color for the component body in the 2D view. Defaults to `#3F8624`.
- **accentColor: object**: The accent color for the component logo.
  - **isometric: string**: A hexadecimal color for the component logo in the 3D view. Defaults to `#4286C5`.
  - **2d: string**: A hexadecimal color for the component logo in the 2D view. Defaults to `#FFFFFF`.
- **link: string, uri**: A URI that links the component to another diagram or an external website. Accepts one of the following formats: `blueprint://` or `https://`.
- **locked: boolean**: Whether to allow changes to the position of the component through the web interface. Defaults to `false`.

[1]: https://developers.cloudcraft.co/
[2]: https://docs.aws.amazon.com/general/latest/gr/aws-arns-and-namespaces.html
[3]: /cloudcraft/faq/scan-error-aws-china-region/
