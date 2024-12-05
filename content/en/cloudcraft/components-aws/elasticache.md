---
title: "ElastiCache Component"
---
## Overview

Use the ElastiCache component to represent in-memory cache or data stores from your Amazon Web Services architecture.

{{< img src="cloudcraft/components-aws/elasticache/component-elasticache-diagram.png" alt="Screenshot of an isometric Cloudcraft diagram showing the 'ElastiCache' AWS component." responsive="true" style="width:60%;">}}

## Toolbar

Use the toolbar to configure and customize the component. The following options are available:

- **Colors**: Select a predefined color or enter the hexadecimal value of the color for the component and its accent. The component can use the same color for both the 2D and 3D view, or different colors for each.
- **Engine**: Select the engine used to power the ElastiCache instance.
- **Instance type**: Select the type of instance. Changing the instance type changes the hardware details shown in the toolbar to reflect what is used by the hypervisor.
- **Size**: Select the size of ElastiCache instance. As with instance type, the hardware details shown in the toolbar change to reflect the size.
- **Billing option**: The pricing model used for the instance.

## API

Use the [Cloudcraft API][1] to programmatically access and render your architecture diagrams as JSON objects. 

### Schema

The following is an example JSON object of a ElastiCache component:

```json
{
  "type": "elasticache",
  "id": "a1cebccc-d9ed-481f-b5e6-1088818ab2c6",
  "region": "us-east-1",
  "mapPos": [-1,12],
  "engine": "memcached",
  "instanceType": "m4",
  "instanceSize": "large",
  "billingOptions": {
    "type": "ri",
    "leaseContractLength": 36,
    "purchaseOption": "Heavy Utilization"
  },
  "color": {
    "isometric": "#d82f27",
    "2d": "#3b48cc"
  },
  "accentColor": {
    "isometric": "#ffffff",
    "2d": "#ffffff"
  },
  "link": "https://aws.amazon.com/elasticache/",
  "locked": true
}
```

- **type: elasticache**: The type of component.
- **id: string**: A unique identifier for the component in the `uuid` format.
- **region: string**: The AWS region the RDS instance is deployed in. All global regions are supported except `cn-` regions.
- **mapPos: [number, number]**: The position of the component in the blueprint, expressed as an x- and y-coordinate pair.
- **engine: string**: The database engine used for the ElastiCache instance. Accepted values are `redis` and `memcached`.
- **instanceType: string**: The type of the instance. See [Accepted values for `instanceType`](#accepted-values-for-instancetype) for more information.
- **instanceSize: string**: The size of the instance. See [Accepted values for `instanceSize`](#accepted-values-for-instancesize) for more information.
- **billingOptions: object**: The pricing model used for the instance. See [Accepted values for `instanceSize`](#accepted-values-for-billingoptions) for more information.
- **color: object**: The fill color for the component body.
  - **isometric: string**: The fill color for the component in the 3D view. Must be a hexadecimal color.
  - **2d: string**: The fill color for the component in the 2D view. Must be a hexadecimal color.
- **accentColor: object**: The accent color used to display the component logo on the block.
  - **isometric: string**: The accent color for the component in the 3D view. Must be a hexadecimal color.
  - **2d: string**: The accent color for the component in the 2D view. Must be a hexadecimal color.
- **link: uri**: Link the component to another diagram using the `blueprint://ID` format or to an external website using the `https://LINK` format.
- **locked: boolean**: If true, changes to the component through the application are disabled until unlocked.

The ElastiCache component can be added to [VPCs][2], [security groups][3], and [subnets][4].

## Accepted values for `instanceType`

The `instanceType` key accepts the following values:

```
c1, m1, m2, m3, m4, m5, m6g, r3, r4, r5, r6g, t1, t2, t3
```

## Accepted values for `instanceSize`

The `instanceSize` key accepts the following values:

```
micro, small, medium, large, xlarge, 2xlarge, 4xlarge, 8xlarge, 10xlarge, 12xlarge, 16xlarge, 24xlarge, 32xlarge
```

## Accepted values for `billingOptions`

The `billingOptions` key supports all billing options that are accepted by the Cloudcraft web application:

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
    "purchaseOption": "Heavy Utilization"
  }
}
```

- **type: ri**: The billing option value for a reserved instance is always `ri`.
- **leaseContractLength: number**: The length of time the instance is reserved. Accepted values are `12` or `36`.
- **purchaseOption: string**: The purchase option for the instance. Accepted values are `Heavy Utilization`, `No Upfront`, `Partial Upfront`, and `All Upfront`.

[1]: https://developers.cloudcraft.co/
[2]: /cloudcraft/components-aws/vpc/
[3]: /cloudcraft/components-aws/security-group/
[4]: /cloudcraft/components-aws/subnet/
