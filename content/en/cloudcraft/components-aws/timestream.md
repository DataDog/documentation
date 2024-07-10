---
title: "Timestream Component"
---
## Overview

Use the Timestream component to represent visualize serverless time-series databases from your Amazon Web Services architecture.

{{< img src="cloudcraft/components-aws/timestream/component-timestream-diagram.png" alt="Screenshot of an isometric Cloudcraft diagram showing interconnected AWS components." responsive="true" style="width:60%;">}}

## Toolbar

Use the toolbar to configure and customize the component. The following options are available:

- **Color**: Select a fill color for the body of the component and an accent color for its symbol. You can use the same colors for the 2D and 3D views or different colors for each.
- **Written Data (GB)**: Enter the total volume of written data, in gigabytes.
- **Queried Data (GB)**: Enter the total volume of queried data, in gigabytes.
- **Memory Storage/hr (GB)**: Enter the total amount of memory storage per hour for your Timestream database, in gigabytes.
- **Magnetic Storage/mo (GB)**: Enter the total amount of monthly magnetic storage provisioned for your Timestream database, in gigabytes.

## API

Use the [Cloudcraft API][1] to programmatically access and render your architecture diagrams as JSON objects.

### Schema

The following is an example JSON object of a Timestream component:

```json
{
    "type": "timestream",
    "id": "1d939183-0078-440a-bcf6-6418c9c2e419",
    "region": "us-east-1",
    "mapPos": [6, 6],
    "writeDataGb": 1,
    "scanDataGb": 1,
    "memoryDataGbHr": 10,
    "magneticDataGbMo": 10,
    "color": {
        "isometric": "#ECECED",
        "2d": "#3B48CC"
    },
    "accentColor": {
        "isometric": "#4286C5",
        "2d": "#FFFFFF"
    },
    "link": "https://aws.amazon.com/timestream/",
    "locked": true
}
```

- **type: string**: The type of component. Must be a string of value `timestream` for this component.
- **id: string, uuid**: The unique identifier for the component. The API uses a UUID v4 internally but accepts any unique string.
- **arn: string**: The globally unique identifier for the component within AWS, known as the [Amazon Resource Names][2].
- **region: string**: The AWS region for the component. All global regions are supported, [except for AWS China][3].
- **mapPos: array**: The position of the component in the blueprint, expressed as an x- and y-coordinate pair.
- **writeDataGb: number**: The total volume of written data, in gigabytes. Defaults to `100`.
- **scanDataGb: number**: The total volume of queried data, in gigabytes. Defaults `100`.
- **memoryDataGbHr: number**: The total amount of memory storage available per hour for the database, in gigabytes. Defaults to `1`.
- **magneticDataGbMo: number**: The total amount of monthly magnetic storage available for the database, in gigabytes. Defaults to `1000`.
- **color: object**: The fill color for the component body.
  - **isometric: string**: A hexadecimal color for the component body in the 3D view. Defaults to `#ECECED`.
  - **2d: string**: A hexadecimal color for the component body in the 2D view. Defaults to `##3B48CC`.
- **accentColor: object**: The accent color for the component logo.
  - **isometric: string**: A hexadecimal color for the component logo in the 3D view. Defaults to `#4286C5`.
  - **2d: string**: A hexadecimal color for the component logo in the 2D view. Defaults to `#FFFFFF`.
- **link: string, uri**: A URI that links the component to another diagram or an external website. Accepts one of the following formats: `blueprint://` or `https://`.
- **locked: boolean**: Whether to allow changes to the position of the component through the web interface. Defaults to `false`.

[1]: https://developers.cloudcraft.co/
[2]: https://docs.aws.amazon.com/general/latest/gr/aws-arns-and-namespaces.html
[3]: /cloudcraft/faq/scan-error-aws-china-region/
