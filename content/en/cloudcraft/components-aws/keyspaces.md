---
title: "Keyspaces Component"
---
## Overview

Use the Keyspaces component to visualize Apache Cassandra-compatible database services from your Amazon Web Services architecture.

{{< img src="cloudcraft/components-aws/keyspaces/component-keyspaces-diagram.png" alt="Screenshot of an isometric Cloudcraft diagram showing interconnected AWS components." responsive="true" style="width:60%;">}}

## Toolbar

Use the toolbar to configure and customize the component. The following options are available:

- **Color**: Select a fill color for the body of the component and an accent color for its symbol. You can use the same colors for the 2D and 3D view or different colors for each.
- **Capacity mode**: Select the capacity mode of your Keyspaces database.
- **Writes (millions)**: Enter the total volume of writes to the database, in millions.
- **Reads (millions)**: Enter the total volume of reads to the database, in millions.
- **Quorum %**: Enter the percentage of your reads that uses `LOCAL_QUORUM` consistency.
- **Dataset (GB)**: Enter the total volume of data in your database in gigabytes.
- **TTL Deletes (millions)**: Enter the total volume of `DELETE` operations triggered by the TTL process, in millions.
- **Point-in-time recovery**: Whether or not to use point-in-time recovery for your database.

## API

Use the [Cloudcraft API][1] to programmatically access and render your architecture diagrams as JSON objects.

### Schema

The following is an example JSON of a Keyspaces component:

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

- **type: string**: The type of component. Must be a string of value `keyspaces` for this component.
- **id: string, uuid**: The unique identifier for the component. The API uses a UUID v4 internally but accepts any unique string.
- **arn: string**: The globally unique identifier for the component within AWS, known as the [Amazon Resource Names][2].
- **region: string**: The AWS region for the component. All global regions are supported, [except for AWS China][3].
- **mapPos: array**: The position of the component in the blueprint, expressed as an x- and y-coordinate pair.
- **capacityMode: string**: The capacity mode of the Keyspaces database. Accepts one of the following values: `on-demand` or `provisioned`. Defaults to `on-demand`.
- **writeUnits: number**: The total volume of writes to the database, in millions. Defaults to `5`.
- **readUnits: number**: The total volume of reads to the database, in millions. Defaults to `5`.
- **quorumPercentage: number**: The percentage of reads that uses `LOCAL_QUORUM` consistency. Defaults to `0`.
- **datasetGb: number**: The total volume of data in the database in gigabytes. Defaults to `10`.
- **ttlDeletes: number**: The total volume of `DELETE` operations triggered by the TTL process, in millions. Defaults to `0`.
- **pointInTimeRecoveryEnabled: boolean**: Whether or not to use point-in-time recovery for the database. Defaults to `false`.
- **color: object**: The fill color for the component body.
  - **isometric: string**: A hexadecimal color for the component body in the 3D view. Defaults to `#ECECED`.
  - **2d: string**: A hexadecimal color for the component body in the 2D view. Defaults to `##3B48CC`.
- **accentColor: object**: The accent color for the component logo.
  - **isometric: string**: A hexadecimal color for the component logo in the 3D view. Defaults to `#4286C5`.
  - **2d: string**: A hexadecimal color for the component logo in the 2D view. Defaults to `#FFFFFF`.
- **link: string, uri**: A URI that links the component to another diagram or an external website. Accepts one of the following formats, `blueprint://` or `https://`.
- **locked: boolean**: Whether to allow changes to the position of the component through the web interface. Defaults to `false`.

[1]: https://developers.cloudcraft.co/
[2]: https://docs.aws.amazon.com/general/latest/gr/aws-arns-and-namespaces.html
[3]: /cloudcraft/faq/scan-error-aws-china-region/
