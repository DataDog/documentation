---
title: "Component: Neptune"
kind: guide
---

{{< img src="cloudcraft/components-aws/neptune/component-neptune-diagram.png" alt="Screenshot of an isometric Cloudcraft diagram showing interconnected AWS components." responsive="true" style="width:100%;">}}

You can use the **Neptune** component to represent and visualize serverless graph databases from your Amazon Web Services architecture with Cloudcraft.

## Toolbar

To configure or customize how your repository looks in a diagram, you can use the toolbar that appears when selecting a component inside the application.

### Options

{{< img src="cloudcraft/components-aws/neptune/component-neptune-toolbar.png" alt="Screenshot of a Cloudcraft interface showing configuration options for the 'Neptune' component with pricing information." responsive="true" style="width:100%;">}}

For the **Neptune** component, the following options are available:

- **Color**. Select a fill color for the body of the component and an accent color for its symbol. You can use the same colors on 2D and 3D views or different colors for each.
- **Role**. Select the role of the Neptune database.
- **Instance type**. Select the Neptune instance type. Changing the instance type changes the hardware details shown in the toolbar to reflect what is used by the hypervisor.
- **Size**. Select the size of the Neptune instance. As with instance type, the hardware details shown in the toolbar change to reflect the size.
- **Storage (GB)**. Enter the total amount of storage available for the database in gigabytes. Not available for role reader.
- **Snapshot (GB)**. Enter the total amount of storage provisioned for snapshots in gigabytes. Not available for role reader.
- **IOPS (Millions)**. Enter the monthly I/O limit for the instance in the millions. Not available for role reader.
- **Instances**. Enter the number of Neptune instances. Only available for role serverless.
- **Min NCUs**. Enter the minimum amount of NCUs available for the database. Only available for role serverless.
- **Max NCUs**. Enter the maximum amount of NCUs available for the database. Only available for role serverless.

## API

Suppose you need programmatic access and remote rendering of architecture diagrams. In that case, [the Cloudcraft API](https://developers.cloudcraft.co/) provides an interface for you to interact with your AWS account within Cloudcraft by sending and receiving data as JSON objects.

### Schema

```json
{
    "type": "neptune",
    "id": "7d2ac4f8-2b7d-4617-98cb-ff792963df6d",
    "region": "us-east-1",
    "mapPos": [-2,12],
    "role": "writer",
    "instanceType": "r5",
    "instanceSize": "large",
    "storage": 10,
    "snapshots": 0,
    "iops": 0,
    "instances": "1",
    "minNCUs": 1,
    "maxNCUs": 2.5,
    "color": {
        "isometric": "#ECECED",
        "2d": "#3B48CC"
    },
    "accentColor": {
        "isometric": "#4286C5",
        "2d": "#FFFFFF"
    },
    "link": "https://aws.amazon.com/neptune/",
    "locked": true
}
```

The **Neptune** component schema representation follows the format above and defines all fields within a diagram for this component.

- **type: string**. The type of component. Must be a string of value `neptune` for this component.
- **id: string, uuid**. The unique identifier for the component. The API uses a UUID v4 internally but accepts any unique string.
- **arn: string**. The globally unique identifier for the component within AWS, known as [Amazon Resource Names](https://docs.aws.amazon.com/general/latest/gr/aws-arns-and-namespaces.html).
- **region: string**. The AWS region for the component. The API supports all global regions, [except for AWS China](https://help.cloudcraft.co/article/110-scan-error-aws-china-region).
- **mapPos: array**. The position of the component in the blueprint. The API uses a unique X and Y coordinate pair to express positioning.
- **role: string**. The role of the Neptune database. Accepts one of three values, `serverless`, `writer`, or `reader`. Defaults to `writer`.
- **instanceType: string**. The Neptune instance type. [See below for more information](#accepted-values-for-instancetype). Defaults to `r5`.
- **instanceSize: string**. The size of the Neptune instance. Not applicable if `role` is `reader`. Defaults to `large`.
- **storage: number**. The total amount of storage available for the database in gigabytes. Not applicable if `role` is `reader`. Defaults to `10`.
- **snapshots: number**. The total amount of storage provisioned for snapshots in gigabytes. Not applicable if `role` is `reader`. Defaults to `0`.
- **iops: number**. The monthly I/O limit for the instance in the millions. Not applicable if `role` is `reader`. Defaults to `0`.
- **instances: number**. The number of Neptune instances. Only applicable if `role` is `serverless. Defaults to `1`.
- **minNCUs: number**. The minimum amount of NCUs available for the database. Only applicable if `role` is `serverless`. Defaults to `1`.
- **maxNCUs: number**. The maximum amount of NCUs available for the database. Only applicable if `role` is `serverless`. Defaults to `2.5`.
- **color: object**. The fill color for the component body.
  - **isometric: string**. A hexadecimal color for the component body in 3D view. Defaults to `#ECECED`.
  - **2d: string**. A hexadecimal color for the component body in 2D view. Defaults to `#3B48CC`.
- **accentColor: object**. The accent color for the component logo.
  - **isometric: string**. A hexadecimal color for the component logo in 3D view. Defaults to `#4286C5`.
  - **2d: string**. A hexadecimal color for the component logo in 2D view. Defaults to `#FFFFFF`.
- **link: string, uri**. A URI that links the component to another diagram or an external website. Accepts one of two formats, `blueprint://` or `https://`.
- **locked: boolean**. Whether to allow changes to the position of the component through the web interface. Defaults to `false`.

## Accepted values for `instanceType`

The `instanceType` key accepts the following values:

```
t4g, t3, x2g, x2iedn, r6g, r6i, r5, r5d, r4
```
