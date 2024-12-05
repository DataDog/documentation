---
title: "EC2 Component"
---
## Overview

Use the EC2 component to represent elastic compute instances from your Amazon Web Services architecture.

{{< img src="cloudcraft/components-aws/ec2/component-ec2-diagram.png" alt="Screenshot of an isometric Cloudcraft diagram showing the EC2 AWS component." responsive="true" style="width:60%;">}}

## Toolbar

Use the toolbar to configure and customize the component. The following options are available:

- **Color**: Select a predefined color or enter the hexadecimal value of the color for the component and its accent color. The component can use the same color for both the 2D and 3D view, or different colors for each.
- **Transparency**: Choose if the EC2 block is solid or semi-transparent.
- **Platform**: Select the platform used in the elastic compute instance. When choosing a platform with a license fee, the cost estimate is included in the fee.
- **Instance type**: The type of the instance. Changing the instance type changes the hardware details shown in the toolbar to reflect what is used by the hypervisor.
- **Size**: The size of the instance. As with instance type, the hardware details shown in the toolbar change to reflect the size.
- **Billing option**: The pricing model used for the instance. Supported options are On-Demand, Reserved Instance, and Spot Instance at the moment.

## API

Use the [Cloudcraft API][1] to programmatically access and render your architecture diagrams as JSON objects.

### Schema

The following is an example JSON of a EC2 block:

```json
{
  "type": "ec2",
  "id": "d2ee1b7c-4368-4384-81dc-19c9c7866623",
  "region": "us-west-1",
  "mapPos": [3, 9],
  "transparent": false,
  "platform": "linux",
  "instanceType": "t3a",
  "instanceSize": "xlarge",
  "billingOptions": {
    "type": "si",
    "utilization": 0.42
  },
  "color": {
    "isometric": "#e6e7e8",
    "2d": "#e6e7e8"
  },
  "accentColor": {
    "isometric": "#4286c5",
    "2d": "#4286c5"
  },
  "link": "blueprint://ae6349e1-fa15-41c8-8e89-d201f9fa3cc9",
  "locked": true
}
```

- **type: ec2**: The type of component.
- **id: string**: A unique identifier for the component in the `uuid` format.
- **region: string**: The AWS region this EC2 instance is deployed in. All global regions are supported except `cn-` regions.
- **mapPos: [number, number]**: The position of the component in the blueprint, expressed as an x- and y-coordinate pair.
- **transparent: boolean**: If `true`, the component is semi-transparent in the 3D view. It has no effect in the 2D view.
- **platform: string**: The platform used for the instance. See [Accepted values for the platform](#accepted-values-for-the-platform) for more information.
- **instanceType: string**: The type of the instance. See [Accepted values for instanceType](#accepted-values-for-instancetype) for more information.
- **instanceSize: string**: The size used for the instance. See [Accepted values for instanceSize](#accepted-values-for-instancesize) for more information.
- **billingOptions: object**: The pricing model used for the instance in AWS. See [Accepted values for billingOptions](#accepted-values-for-billingoptions) for more information.
- **color: object**: The fill color for the component body.
  - **isometric: string**: The fill color for the component in the 3D view. Must be a hexadecimal color.
  - **2d: string**: The fill color for the component in the 2D view. Must be a hexadecimal color.
- **accentColor: object**: The accent color used to display the component logo on top of the block.
  - **isometric: string**: The accent color for the component in the 3D view. Must be a hexadecimal color.
  - **2d: string**: The accent color for the component in the 2D view. Must be a hexadecimal color.
- **link: uri**: Link the component to another diagram using the `blueprint://ID` format or to an external website using the `https://LINK` format.
- **locked: boolean**. If `true`, changes made to the component using the application are disabled until unlocked.

The EC2 component can be added to [VPCs][2], [security groups][3], [auto scaling groups][4], and [subnets][5].

## Accepted values for `platform`

The `platform` key accepts the following values:

```
linux, linuxSQL, linuxSQLWeb, linuxSQLEnterprise, rhel, sles, mswin, mswinSQL, mswinSQLWeb, mswinSQLEnterprise
```

## Accepted values for `instanceType`

The `instanceType` key accepts the following values:

```
a1, c1, c3, c4, c5, c5a, c5ad, c5d, c5n, c6g, c6gd, c6gn, cc2, cr1, d2, d3, d3en, f1, g2, g3, g3s, g4ad, g4dn, h1, hs1, i2, i3, i3en, inf1, m1, m2, m3, m4, m5, m5a, m5ad, m5d, m5dn, m5n, m5zn, m6g, m6gd, p2, p3, p3dn, p4d, r3, r4, r5, r5a, r5ad, r5b, r5d, r5dn, r5n, r6g, r6gd, t1, t2, t3, t3a, t4g, x1, x1e, z1d
```

## Accepted values for `instanceSize`

The `instanceSize` key accepts the following values:

```
micro, nano, small, medium, large, xlarge, 2xlarge, 3xlarge, 4xlarge, 6xlarge, 8xlarge, 9xlarge,  10xlarge, 12xlarge, 16xlarge, 18xlarge, 24xlarge, 32xlarge, metal
```

## Accepted values for `billingOptions`

The `billingOptions` key supports all billing options that are accepted by Cloudcraft:

- On-demand
- Reserved instance
- Spot instance

Each option is represented differently in the `billingOptions` object.

### On-demand

```
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

```
{
  "billingOptions": {
    "type": "ri",
    "leaseContractLength": 36,
    "purchaseOption": "Partial Upfront",
    "offeringClass": "convertible"
  }
}
```

- **type: ri**: The billing option value for a reserved instance is always `ri`.
- **leaseContractLenght: number**: The length of time the instance is reserved. Accepted values are 12 or 36.
- **purchaseOption: string**: The purchase option for the instance. Accepted values are `No Upfront`, `Partial Upfront`, and `All Upfront`.
- **offeringClass: string**: The offering class for the instance. Accepted values are `standard` and `convertible`.

### Spot instance

```
{
  "billingOptions": {
    "type": "si",
    "utilization": 0.42
  }
}
```

- **type: si**: The billing option value for spot instance is always `si`.
- **utilization: number**: A floating number representing how much the instance is used in a given month.

[1]: https://developers.cloudcraft.co/
[2]: /cloudcraft/components-aws/vpc/
[3]: /cloudcraft/components-aws/security-group/
[4]: /cloudcraft/components-aws/auto-scaling-group/
[5]: /cloudcraft/components-aws/subnet/
