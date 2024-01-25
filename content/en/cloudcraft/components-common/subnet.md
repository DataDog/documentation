---
title: "Component: Subnet"
kind: guide
---

{{< img src="cloudcraft/components-common/subnet/component-subnet.png" alt="Screenshot of a 3D representation of the subnet AWS component in Cloudcraft" responsive="true" style="width:100%;">}}

The **Subnet** component is used to represent subnets from your Amazon Web Services architecture with Cloudcraft.

## Toolbar

The toolbar is displayed when selecting a component. It allows you to customize parts of your component and its visual to your liking.

- **Color**. Select a predefined color or enter the hexadecimal value of the color for the component and its accent. The component can use the same color for both 2D and 3D view, or different colors for each.
- **Name**. Give the subnet a name.
- **Shape**. Select a shape for the subnet, dynamic or rectangular.
- **Padding**. Increase or decrease the amount of space inside the subnet.

## API

In [the Cloudcraft API][1], the subnet component is represented in JSON.

```json
{
  "type": "subnet",
  "id": "838f6f30-9cdd-4c6b-9eb2-dd71b9c64047",
  "region": "us-east-1",
  "name": "example-cloudcraft-sb",
  "shape": "dynamic",
  "padding": 1.5,
  "nodes": [
    "e99bad32-82f6-49a7-b145-11963a3d7775"
  ],
  "color": {
    "isometric": "#000000",
    "2d": "#000000"
  },
  "link": "blueprint://90fb6b0b-f66e-4196-8d16-d68921448fdb",
  "locked": true
}
```

- **type: subnet**. The type of component.
- **id: string**. A unique identifier for the component in the `uuid` format.
- **region: string**. The AWS region this subnet is deployed in. With the exception of `cn-` regions, all global regions are supported.
- **name: string**. The name for the subnet.
- **shape: string**. The shape of the subnet. Accepted values are `dynamic` or `rectangular`.
- **padding: number**. The internal padding for the subnet. Defaults to 1.5.
- **nodes: array**. The components inside the subnet. [See below for more information](#accepted-values-for-nodes).
- **color: object**. The fill color for the component.
  - **isometric: string**. Fill color for the component in 3D view. Must be an hexadecimal color.
  - **2d: string**. Fill color for the component in 2D view. Must be an hexadecimal color.
- **link: uri**. Link component to another diagram in the `blueprint://ID` format or to external website in the `https://LINK` format.
- **locked: boolean**. If true, changes to the component through the application are disabled until unlocked.

### Accepted values for nodes

The `nodes` key accepts an array of unique identifiers for the components inside the subnet.

The following AWS components can be added inside a subnet:

```
asg, ec2, lambda, efs, fsx, elb, rds, docdb, elasticache, redshift, es, natgateway
```

In addition to the AWS components, the following common components are can also be added inside a subnet:

```
block, isotext, icon, image, area
```

[1]: https://developers.cloudcraft.co/
