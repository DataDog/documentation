---
title: "Component: EC2"
kind: guide
---

{{< img src="cloudcraft/components-aws/ec2/component-ec2-diagram.png" alt="Screenshot of an isometric Cloudcraft diagram showing the EC2 AWS component." responsive="true" style="width:100%;">}}

The **EC2** block component is used to represent elastic compute instances from your Amazon Web Services architecture with Cloudcraft.

## Toolbar

The toolbar is displayed when selecting a component and allow you to customize the visual of your EC2 block to your liking.

- **Color.** Select a predefined color or enter the hexadecimal value of the color for the component and its accent color. The component can use the same color for both 2D and 3D view, or different colors for each.
- **Transparency.** Choose if the EC2 block will be solid or semi-transparent.
- **Platform.** Select the platform used in the elastic compute instance. When choosing a platform with a license fee, the cost estimate will include the fee.
- **Instance type.** The type of the instance. Changing the instance type changes the hardware details shown in the toolbar to reflect what is used by the hypervisor.
- **Size.** The size of the instance. As with instance type, the hardware details shown in the toolbar change to reflect the size.
- **Billing option.** The pricing model used for the instance. Supported options are On-Demand, Reserved Instance, and Spot Instance at the moment.

## API

In [the Cloudcraft API](https://developers.cloudcraft.co/), an EC2 block is represented in JSON.

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

- **type: ec2**. The type of component.
- **id: string**. A unique identifier for the component in the `uuid` format.
- **region: string**. The AWS region this EC2 instance is deployed in. With the exception of `cn-` regions, all global regions are supported.
- **mapPos: [number, number]**. The position of the component in the blueprint, expressed as a x,y coordinate pair.
- **transparent: boolean**. If true, the component will be semi-transparent in 3D view. Has no effect in 2D view.
- **platform: string**. The platform used for the instance. See below for more information.
- **instanceType: string**. The type of the instance. See below for more information.
- **instanceSize: string**. The size used for the instance. See below for more information.
- **billingOptions: object**. The pricing model used for the instance in AWS. See below for more information.
- **color: object**. The fill color for the component body.
  - **isometric: string**. Fill color for the component in 3D view. Must be an hexadecimal color.
  - **2d: string**. Fill color for the component in 2D view. Must be an hexadecimal color.
- **accentColor: object**. The accent color used to display the component logo on top of the block.
  - **isometric: string**. Accent color for the component in 3D view. Must be an hexadecimal color.
  - **2d: string**. Accent color for the component in 2D view. Must be an hexadecimal color.
- **link: uri**. Link component to another diagram in the `blueprint://ID` format or to external website in the `https://LINK` format.
- **locked: boolean**. If true, changes to the component through the application are disabled until unlocked.

The EC2 component can be added to [VPCs](https://help.cloudcraft.co/article/118-component-vpc), [security groups](https://help.cloudcraft.co/article/119-component-security-group), [auto scaling groups](https://help.cloudcraft.co/article/113-component-auto-scaling), and [subnets](https://help.cloudcraft.co/article/120-component-subnet).

## Accepted values for platform

The `platform` key accepts the following values:

```
linux, linuxSQL, linuxSQLWeb, linuxSQLEnterprise, rhel, sles, mswin, mswinSQL, mswinSQLWeb, mswinSQLEnterprise
```

## Accepted values for instanceType

The `instanceType` key accepts the following values:

```
a1, c1, c3, c4, c5, c5a, c5ad, c5d, c5n, c6g, c6gd, c6gn, cc2, cr1, d2, d3, d3en, f1, g2, g3, g3s, g4ad, g4dn, h1, hs1, i2, i3, i3en, inf1, m1, m2, m3, m4, m5, m5a, m5ad, m5d, m5dn, m5n, m5zn, m6g, m6gd, p2, p3, p3dn, p4d, r3, r4, r5, r5a, r5ad, r5b, r5d, r5dn, r5n, r6g, r6gd, t1, t2, t3, t3a, t4g, x1, x1e, z1d
```

## Accepted values for instanceSize

The `instanceSize` key accepts the following values:

```
micro, nano, small, medium, large, xlarge, 2xlarge, 3xlarge, 4xlarge, 6xlarge, 8xlarge, 9xlarge,  10xlarge, 12xlarge, 16xlarge, 18xlarge, 24xlarge, 32xlarge, metal
```

## Accepted values for billingOptions

The `billingOptions` key accepts all billing options currently accepted by Cloudcraft:

- On-demand
- Reserved instance
- Spot instance

Each option is represented differently inside the `billingOptions` object.

### On-demand

```
{
  "billingOptions": {
    "type": "od",
    "utilization": 1
  }
}
```

- **type: od**. The billing option value for on-demand is always `od`.
- **utilization: number**. A floating number representing how much the instance will be used in a given month.

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

- **type: ri**. The billing option value for a reserved instance is always `ri`.
- **leaseContractLenght: number**. The lenght of time the instance will be reserved. Accepted values are 12 or 36.
- **purchaseOption: string**. The purchase option for the instance. Accepted values are "No Upfront," "Partial Upfront," and "All Upfront."
- **offeringClass: string**. The offering class for the instance. Accepted values are "standard" and "convertible."

### Spot instance

```
{
  "billingOptions": {
    "type": "si",
    "utilization": 0.42
  }
}
```

- **type: si**. The billing option value for spot instance is always `si`.
- **utilization: number**. A floating number representing how much the instance will be used in a given month.
