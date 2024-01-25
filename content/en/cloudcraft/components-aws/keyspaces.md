---
title: "Component: Keyspaces"
kind: guide
---

{{< img src="cloudcraft/components-aws/keyspaces/component-keyspaces-diagram.png" alt="Screenshot of an isometric Cloudcraft diagram showing interconnected AWS components." responsive="true" style="width:100%;">}}

You can use the **Keyspaces** component to represent and visualize Apache Cassandra–compatible database services from your Amazon Web Services architecture with Cloudcraft.

## Toolbar

To configure or customize how your repository looks in a diagram, you can use the toolbar that appears when selecting a component inside the application.

### Options

{{< img src="cloudcraft/components-aws/keyspaces/component-keyspaces-toolbar.png" alt="Screenshot of a Cloudcraft interface showing configuration options for the 'Keyspaces' component with pricing information." responsive="true" style="width:100%;">}}

For the **Keyspaces** component, the following options are available:

- **Color**. Select a fill color for the body of the component and an accent color for its symbol. You can use the same colors on 2D and 3D views or different colors for each.
- **Capacity mode**. Select the capacity mode of your Keyspaces database.
- **Writes (millions)**. Enter the total volume of writes to the database in the millions.
- **Reads (millions)**. Enter the total volume of reads to the database in the millions.
- **Quorum %**. Enter the percentage of your reads that will use LOCAL_QUORUM consistency.
- **Dataset (GB)**. Enter the total volume of data in your database in gigabytes.
- **TTL Deletes (millions)**. Enter the total volume of DELETE operations triggered by the TTL process in the millions.
- **Point-in-time recovery**. Whether or not to use point-in-time recovery for your database.

## API

Suppose you need programmatic access and remote rendering of architecture diagrams. In that case, [the Cloudcraft API][1] provides an interface for you to interact with your AWS account within Cloudcraft by sending and receiving data as JSON objects.

### Schema

```json
{
    "type": "keyspaces",
    "id": "bd6da627-e07c-497e-bdbc-bec11655112a",
    "region": "us-east-1",
    "mapPos": [6,6],
    "capacityMode": "on-demand",
    "writeUnits": 5,
    "readUnits": 5,
    "quorumPercentage": 0,
    "datasetGb": 10,
    "ttlDeletes": 0,
    "pointInTimeRecoveryEnabled": false,
    "color": {
        "isometric": "#ECECED",
        "2d": "#3B48CC"
    },
    "accentColor": {
        "isometric": "#4286C5",
        "2d": "#FFFFFF"
    },
    "link": "https://aws.amazon.com/keyspaces/",
    "locked": true
}
```

The **Keyspaces** component schema representation follows the format above and defines all fields within a diagram for this component.

- **type: string**. The type of component. Must be a string of value `keyspaces` for this component.
- **id: string, uuid**. The unique identifier for the component. The API uses a UUID v4 internally but accepts any unique string.
- **arn: string**. The globally unique identifier for the component within AWS, known as [Amazon Resource Names][2].
- **region: string**. The AWS region for the component. The API supports all global regions, [except for AWS China][3].
- **mapPos: array**. The position of the component in the blueprint. The API uses a unique X and Y coordinate pair to express positioning.
- **capacityMode: string**. The capacity mode of the Keyspaces database. Accepts one of two values, `on-demand` or `provisioned`. Defaults to `on-demand`.
- **writeUnits: number**. The total volume of writes to the database in the millions. Defaults to `5`.
- **readUnits: number**. The total volume of reads to the database in the millions. Defaults to `5`.
- **quorumPercentage: number**. The percentage of reads that will use LOCAL_QUORUM consistency. Defaults to `0`.
- **datasetGb: number**. The total volume of data in the database in gigabytes. Defaults to `10`.
- **ttlDeletes: number**. The total volume of DELETE operations triggered by the TTL process in the millions. Defaults to `0`.
- **pointInTimeRecoveryEnabled: boolean**. Whether or not to use point-in-time recovery for the database. Defaults to `false`.
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
