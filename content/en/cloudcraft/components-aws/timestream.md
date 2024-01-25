---
title: "Component: Timestream"
kind: guide
---

{{< img src="cloudcraft/components-aws/timestream/component-timestream-diagram.png" alt="Screenshot of an isometric Cloudcraft diagram showing interconnected AWS components." responsive="true" style="width:100%;">}}

You can use the **Timestream** component to represent and visualize serverless time-series database from your Amazon Web Services architecture with Cloudcraft.

## Toolbar

To configure or customize how your repository looks in a diagram, you can use the toolbar that appears when selecting a component inside the application.

### Options

{{< img src="cloudcraft/components-aws/timestream/component-timestream-toolbar.png" alt="Screenshot of a Cloudcraft interface showing configuration options for the 'Timestream' component with pricing information." responsive="true" style="width:100%;">}}

For the **Timestream** component, the following options are available:

- **Color**. Select a fill color for the body of the component and an accent color for its symbol. You can use the same colors on 2D and 3D views or different colors for each.
- **Written Data (GB)**. Enter the total volume of written data in gigabytes.
- **Queried Data (GB)**. Enter the total volume of queried data in gigabytes.
- **Memory Storage/hr (GB)**. Enter the total amount of memory storage per hour for your Timestream database in gigabytes.
- **Magnetic Storage/mo (GB)**. Enter the total amount of monthly magnetic storage provisioned for your Timestream database in gigabytes.

## API

Suppose you need programmatic access and remote rendering of architecture diagrams. In that case, [the Cloudcraft API][1] provides an interface for you to interact with your AWS account within Cloudcraft by sending and receiving data as JSON objects.

### Schema

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

The **Timestream** component schema representation follows the format above and defines all fields within a diagram for this component.

- **type: string**. The type of component. Must be a string of value `timestream` for this component.
- **id: string, uuid**. The unique identifier for the component. The API uses a UUID v4 internally but accepts any unique string.
- **arn: string**. The globally unique identifier for the component within AWS, known as [Amazon Resource Names][2].
- **region: string**. The AWS region for the component. The API supports all global regions, [except for AWS China][3].
- **mapPos: array**. The position of the component in the blueprint. The API uses a unique X and Y coordinate pair to express positioning.
- **writeDataGb: number**. The total volume of written data in gigabytes. Defaults to `100`.
- **scanDataGb: number**. The total volume of queried data in gigabytes. Defaults `100`.
- **memoryDataGbHr: number**. The total amount of memory storage available per hour for the database in gigabytes. Defaults to `1`.
- **magneticDataGbMo: number**. The total amount of monthly magnetic storage available for the database in gigabytes. Defaults to `1000`.
- **color: object**. The fill color for the component body.
  - **isometric: string**. A hexadecimal color for the component body in 3D view. Defaults to `#ECECED`.
  - **2d: string**. A hexadecimal color for the component body in 2D view. Defaults to `##3B48CC`.
- **accentColor: object**. The accent color for the component logo.
  - **isometric: string**. A hexadecimal color for the component logo in 3D view. Defaults to `#4286C5`.
  - **2d: string**. A hexadecimal color for the component logo in 2D view. Defaults to `#FFFFFF`.
- **link: string, uri**. A URI that links the component to another diagram or an external website. Accepts one of two formats, `blueprint://` or `https://`.
- **locked: boolean**. Whether to allow changes to the position of the component through the web interface. Defaults to `false`.

[1]: https://developers.cloudcraft.co/
[2]: https://docs.aws.amazon.com/general/latest/gr/aws-arns-and-namespaces.html
[3]: https://help.cloudcraft.co/article/110-scan-error-aws-china-region
