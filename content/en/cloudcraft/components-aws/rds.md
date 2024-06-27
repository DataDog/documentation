---
title: "RDS Component"
---
## Overview

Use the RDS component to represent relational databases from your Amazon Web Services architecture.

{{< img src="cloudcraft/components-aws/rds/component-rds-diagram.png" alt="Screenshot of an isometric Cloudcraft diagram showing the 'RDS' AWS component." responsive="true" style="width:60%;">}}

## Toolbar
Use the toolbar to configure and customize the component. The following options are available:

- **Color**: Select a predefined color or enter the hexadecimal value of the color for the component and its accent. The component can use the same color for both the 2D and 3D view, or different colors for each.
- **Role**: The role of the RDS instance.
- **Engine**: Select the database engine used for the RDS instance.
- **Min capacity unit**: The minimum amount of Aurora capacity units. Only available for the serverless role.
- **Max capacity unit**: The maximum amount of Aurora capacity units. Only available for the serverless role.
- **Instance type**: The type of the instance. Changing the instance type changes the hardware details shown in the toolbar to reflect what is used by the hypervisor.
- **Size**: The size of the instance. As with instance type, the hardware details shown in the toolbar change to reflect the size.
- **Deployment option**: The type of deployment for the instance, Single-AZ or Multi-AZ Standby.
- **Billing option**: The pricing model used for the instance.

## API

Use the [Cloudcraft API][1] to programmatically access and render your architecture diagrams as JSON objects.

### Schema

The following is an example JSON of a RDS component:

```json
{
  "type": "rds",
  "id": "f184b0b6-c732-4881-841c-68477f7eb365",
  "region": "us-east-1",
  "mapPos": [-3,3],
  "role": "primary",
  "engine": "mariadb",
  "instanceType": "r6g",
  "instanceSize": "large",
  "multiAZ": false,
  "minimumCapacityUnit": 2,
  "maximumCapacityUnit": 2,
  "billingOptions": {
    "type": "ri",
    "leaseContractLength": 12,
    "purchaseOption": "No Upfront"
  },
  "color": {
    "isometric": "#ececed",
    "2d": "#3b48cc"
  },
  "accentColor": {
    "isometric": "#4286c5",
    "2d": "#ffffff"
  },
  "link": "https://aws.amazon.com/rds/",
  "locked": true
}
```

- **type: rds**: The type of component.
- **id: string**: A unique identifier for the component in the `uuid` format.
- **region: string**: The AWS region the RDS instance is deployed in. All global regions are supported except `cn-` regions.
- **mapPos: [number, number]**: The position of the component in the blueprint, expressed as an x- and y-coordinate pair.
- **role: string**: The role used for the RDS instance. Accepted values are `primary`, `standby`, `readReplica`, and `serverless`.
- **engine: string**: The database engine used for the RDS instance. See [Accepted values for `engine`](#accepted-values-for-engine) for more information.
- **instanceType: string**: The type of the instance. See [Accepted values for `instanceType`](#accepted-values-for-instancetype) for more information.
- **instanceSize: string**: The size of the instance. See [Accepted values for `instanceSize`](#accepted-values-for-instancesize) for more information.
- **multiAZ: boolean**: If `true`, the database is deployed in multiple AWS availability zones. Not available if `role` is set to `serverless`.
- **minimumCapacityUnit: number**: The minimum amount of Aurora capacity units. Only applicable if `role` is set to `serverless`.
- **maximumCapacityUnit: number**: The maximum amount of Aurora capacity units. Only applicable if `role` is set to `serverless`.
- **billingOptions: object**: The pricing model used for the instance. See [Accepted values for `billingOptions`](#accepted-values-for-billingoptions) for more information.
- **color: object**: The fill color for the component body.
  - **isometric: string**: The fill color for the component in the 3D view. Must be a hexadecimal color.
  - **2d: string**: The fill color for the component in the 2D view. Must be a hexadecimal color.
- **accentColor: object**: The accent color used to display the component logo on the block.
  - **isometric: string**: The accent color for the component in the 3D view. Must be a hexadecimal color.
  - **2d: string**: The accent color for the component in the 2D view. Must be a hexadecimal color.
- **link: uri**: Link the component to another diagram using the `blueprint://ID` format or to an external website using the `https://LINK` format.
- **locked: boolean**: If `true`, changes made to the component using the application are disabled until unlocked.

The RDS component can be added to [VPCs][2], [security groups][3], and [subnets][4].

## Accepted values for `engine`

The `engine` key accepts the following values:

```
none, aurora-mysql, aurora-postgresql, mysql, mariadb, postgresql, oracle, sqlserver-ex, sqlserver-web, sqlserver-se, sqlserver-ee
```

**Note**: If `role` is set to `serverless`, the `engine` key only accepts `none`, `aurora-mysql`, and `aurora-postgresql`.

## Accepted values for `instanceType`

The `instanceType` key accepts the following values:

```
m1, m2, m3, m4, m6g, r5, r5b, r6g, t1, t2, t3, x1, x1e, z1d
```

## Accepted values for `instanceSize`

The `instanceSize` key accepts the following values:

```
micro, small, medium, large, xlarge, 2xlarge, 4xlarge, 8xlarge, 12xlarge, 16xlarge, 24xlarge, 32xlarge
```

## Accepted values for `billingOptions`

The `billingOptions` key accepts all billing options currently accepted by the Cloudcraft web application:

- On-demand
- Reserved instance

Each option is represented differently inside the `billingOptions` object.

### On-demand

```json
{
  "billingOptions": {
    "type": "od",
    "utilization": 1
  }
}
```

- **type: od**: The billing option value for on-demand is always `od`.
- **utilization: number**: A floating number representing how much the instance is used in a given month.

### Reserved instance

```json
{
  "billingOptions": {
    "type": "ri",
    "leaseContractLength": 36,
    "purchaseOption": "Partial Upfront"
  }
}
```

- **type: ri**: The billing option value for a reserved instance is always `ri`.
- **leaseContractLength: number**: The length of time the instance is reserved. Accepted values are `12` or `36`.
- **purchaseOption: string**: The purchase option for the instance. Accepted values are `No Upfront`, `Partial Upfront`, and `All Upfront`.

[1]: https://developers.cloudcraft.co/
[2]: /cloudcraft/components-aws/vpc/
[3]: /cloudcraft/components-aws/security-group/
[4]: /cloudcraft/components-aws/subnet/
