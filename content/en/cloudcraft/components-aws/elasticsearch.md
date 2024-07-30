---
title: "Elasticsearch Component"
---
## Overview

Use the Elasticsearch component to represent Elasticsearch clusters from your Amazon Web Services architecture.

{{< img src="cloudcraft/components-aws/elasticsearch/component-elasticsearch-diagram.png" alt="Screenshot of an isometric Cloudcraft diagram showing the 'Elasticsearch' AWS component." responsive="true" style="width:60%;">}}

## Toolbar

Use the toolbar to configure and customize the component. The following options are available:

- **Color**: Select a predefined color or enter the hexadecimal value of the color for the component and its accent. The component can use the same color for both the 2D and 3D view, or different colors for each.
- **Role**: Select the role of the Elasticsearch instance.
- **Instance count**: Enter the number of instances for the Elasticsearch cluster.
- **Instance type**: Select the type of instance. Changing the instance type changes the hardware details shown in the toolbar to reflect what is used by the hypervisor.
- **Size**: Select the size of the instance. As with instance type, the hardware details shown in the toolbar change to reflect the size.
- **Billing option**: The pricing model used for the instance.

## API

Use the [Cloudcraft API][1] to programmatically access and render your architecture diagrams as JSON objects.

### Schema

The following is an example JSON object of a Elasticsearch component:

```json
{
  "type": "es",
  "id": "5f8df311-0641-410e-b427-89b7dc5e5b84",
  "region": "us-west-2",
  "mapPos": [0,10],
  "role": "data",
  "instanceCount": 2,
  "instanceType": "t3",
  "instanceSize": "medium",
  "billingOptions": {
    "type": "ri",
    "leaseContractLength": 36,
    "purchaseOption": "Partial Upfront"
  },
  "color": {
    "isometric": "#ececed",
    "2d": "#693cc5"
  },
  "accentColor": {
    "isometric": "#4286c5",
    "2d": "#ffffff"
  },
  "link": "https://aws.amazon.com/elasticsearch-service/",
  "locked": true
}
```

- **type: es**: The type of component.
- **id: string**: A unique identifier for the component in the `uuid` format.
- **region: string**: The AWS region the Elasticsearch instance is deployed in. All global regions are supported except `cn-` regions.
- **mapPos: [number, number]**: The position of the component in the blueprint, expressed as an x- and y-coordinate pair.
- **role: string**: The role used for the Elasticsearch instance. Accepted values are `data` and `master`.
- **instanceCount: number**: The number of instances in the Elasticsearch cluster. Defaults to `1`.
- **instanceType: string**: The type of instance. [See [Accepted values for `instanceType`](#accepted-values-for-instancetype) for more information.
- **instanceSize: string**: The size of the instance. See [Accepted values for `instanceSize`](#accepted-values-for-instancesize) for more information.
- **billingOptions: object**: The pricing model used for the instance. See [Accepted values for `billingOptions`](#accepted-values-for-billingoptions) for more information.
- **color: object**: The fill color for the component body.
  - **isometric: string**: The fill color for the component in the 3D view. Must be a hexadecimal color.
  - **2d: string**: The fill color for the component in the 2D view. Must be a hexadecimal color.
- **accentColor: object**: The accent color used to display the component logo on the block.
  - **isometric: string**: The accent color for the component in the 3D view. Must be a hexadecimal color.
  - **2d: string**: The accent color for the component in the 2D view. Must be a hexadecimal color.
- **link: uri**: Link the component to another diagram using the `blueprint://ID` format or to external website using the `https://LINK` format.
- **locked: boolean**: If `true`, changes made to the component using the application are disabled until unlocked.

The Elasticsearch component can be added to [VPCs][2], [security groups][3], and [subnets][4].

## Accepted values for `instanceType`

The `instanceType` key accepts the following values:

```
c4, c5, i2, i3, m3, m4, m5, r3, r4, r5, t2, t3, ultrawarm1
```

## Accepted values for `instanceSize`

The `instanceSize` key accepts the following values:

```
micro, small, medium, large, xlarge, 2xlarge, 4xlarge, 8xlarge, 9xlarge, 10xlarge, 12xlarge, 16xlarge, 18xlarge, 24xlarge, 32xlarge
```

## Accepted values for `billingOptions`

The `billingOptions` key supports all billing options accepted by the Cloudcraft web application:

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
