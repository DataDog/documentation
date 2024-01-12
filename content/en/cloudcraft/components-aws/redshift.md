---
title: "Component: Redshift"
kind: guide
---

{{< img src="cloudcraft/components-aws/redshift/component-redshift-diagram.png" alt="Screenshot of an isometric Cloudcraft diagram showing the 'Redshift' AWS component." responsive="true" style="width:100%;">}}

The **Redshift** component is used to represent data warehouses from your Amazon Web Services architecture with Cloudcraft.

## Toolbar

The toolbar is displayed when selecting a component. It allows you to customize parts of your component and its visual to your liking.

- **Color**. Select a predefined color or enter the hexadecimal value of the color for the component and its accent. The component can use the same color for both 2D and 3D view, or different colors for each.
- **Nodes**. Enter the number of nodes for the Redshift cluster.
- **Instance type**. Select the Redshift instance type. Changing the instance type changes the hardware details shown in the toolbar to reflect what is used by the hypervisor.
- **Size**. Select the size of the Redshift instance. As with instance type, the hardware details shown in the toolbar change to reflect the size.

## API

In [the Cloudcraft API](https://developers.cloudcraft.co/), a Redshift instance is represented in JSON.

```json
{
  "type": "redshift",
  "id": "c1aa0ae1-8e0d-466d-a8a8-51cc9b8a6b35",
  "region": "us-west-2",
  "mapPos": [1,2],
  "nodeCount": 2,
  "instanceType": "ra3",
  "instanceSize": "xlplus",
  "color": {
    "isometric": "#80b1dc",
    "2d": "#000000"
  },
  "accentColor": {
    "isometric": "#03a9f4",
    "2d": "#03a9f4"
  },
  "link": "https://aws.amazon.com/redshift/",
  "locked": true
}
```

- **type: redshift**. The type of component.
- **id: string**. A unique identifier for the component in the `uuid` format.
- **region: string**. The AWS region the Redshift instance is deployed in. Except for `cn-` regions, all global regions are supported.
- **mapPos: [number, number]**. The position of the component in the blueprint, expressed as a x,y coordinate pair.
- **nodeCount: number**. The number of nodes for the Redshift cluster. Defaults to `1`.
- **instanceType: string**. The type of the instance. [See below for more information](#accepted-values-for-instancetype).
- **instanceSize: string**. The size of the instance. [See below for more information](#accepted-values-for-instancesize).
- **color: object**. The fill color for the component body.
  - **isometric: string**. Fill color for the component in 3D view. Must be a hexadecimal color.
  - **2d: string**. Fill color for the component in 2D view. Must be a hexadecimal color.
- **accentColor: object**. The accent color used to display the component logo on the block.
  - **isometric: string**. Accent color for the component in 3D view. Must be a hexadecimal color.
  - **2d: string**. Accent color for the component in 2D view. Must be a hexadecimal color.
- **link: uri**. Link component to another diagram in the `blueprint://ID` format or to external website in the `https://LINK` format.
- **locked: boolean**. If true, changes to the component through the application are disabled until unlocked.

The Redshift component can be added to [VPCs](https://help.cloudcraft.co/article/118-component-vpc), [security groups](https://help.cloudcraft.co/article/119-component-security-group), and [subnets](https://help.cloudcraft.co/article/120-component-subnet).

## Accepted values for instanceType

The `instanceType` key accepts the following values:

```
dc1, dc2, ds1, ds2, ra3
```

## Accepted values for instanceSize

The `instanceSize` key accepts the following values:

```
large, xlarge, xlplus, 4xlarge, 8xlarge, 16xlarge
```
