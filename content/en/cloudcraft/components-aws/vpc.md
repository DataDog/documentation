---
title: "Component: VPC"
kind: guide
---

{{< img src="cloudcraft/components-aws/vpc/component-vpc-diagram.png" alt="Screenshot of an isometric Cloudcraft diagram showing the 'VPC' AWS component." responsive="true" style="width:100%;">}}

The **VPC** component is used to represent isolated virtual networks from your Amazon Web Services architecture with Cloudcraft.

## Toolbar

The toolbar is displayed when selecting a component. It allows you to customize parts of your component and its visual to your liking.

- **Color**. Select a predefined color or enter the hexadecimal value of the color for the component and its accent. The component can use the same color for both 2D and 3D view, or different colors for each.
- **Name**. Give the VPC a name.
- **Shape**. Select a shape for the VPC, dynamic or rectangular.
- **Padding**. Increase or decrease the amount of space inside the VPC.
- **Peering**. View, remove, or add, peering connections to other VPCs.

## API

In [the Cloudcraft API][1], the VPC component is represented in JSON.

```json
{
  "type": "vpc",
  "id": "5631f2ca-3d93-4591-a7d9-85d5f0d011eb",
  "region": "us-east-1",
  "name": "cloudcraft-vpc-example",
  "shape": "rectangular",
  "padding": 1.5,
  "nodes": [
    "e99bad32-82f6-49a7-b145-11963a3d7775"
  ],
  "peeringConnections": [
    {
      "id": "1a367d09-beea-4a87-9740-1831c1809d00",
      "name": "Example Peering",
      "accepterVpc": "f38bc8ae-98c1-45c5-b7ad-54e9bb9ee166",
      "hidden": false
    }
  ],
  "color": {
    "isometric": "#03a9f4",
    "2d": "#03a9f4"
  },
  "locked": true
}
```

- **type: vpc**. The type of component.
- **id: string**. A unique identifier for the component in the `uuid` format.
- **region: string**. The AWS region this VPC is deployed in. With the exception of `cn-` regions, all global regions are supported.
- **name: string**. The name for the VPC.
- **shape: string**. The shape of the VPC. Accepted values are `dynamic` or `rectangular`.
- **padding: number**. The internal padding for the VPC. Defaults to 1.5.
- **nodes: array**. The components inside the VPC. See below for more information.
- **peeringConnections: array**. The VPCs that make peering connections to this VPC. See below for more information.
- **color: object**. The fill color for the component.
  - **isometric: string**. Fill color for the component in 3D view. Must be an hexadecimal color.
  - **2d: string**. Fill color for the component in 2D view. Must be an hexadecimal color.
- **locked: boolean**. If true, changes to the component through the application are disabled until unlocked.

### Accepted values for nodes

The `nodes` key accepts an array of unique identifiers for the components inside the VPC.

The following AWS components can be added inside a VPC:

```
asg, ec2, lambda, efs, fsx, elb, subnet, sg, rds, docdb, elasticache, redshift, es, natgateway, internetgateway, vpngateway, customergateway
```

In addition to the AWS components, the following common components are can also be added inside a VPC:

```
block, isotext, icon, image, area
```

### Accepted values for peeringConnections

The `peeringConnections` key accepts an array, with each peering connection being represented by a JSON object.

```
{
  "peeringConnections": [
    {
      "id": "1a367d09-beea-4a87-9740-1831c1809d00",
      "name": "Example Peering",
      "accepterVpc": "f38bc8ae-98c1-45c5-b7ad-54e9bb9ee166",
      "hidden": false
    }
  ]
}
```

- **id: string**. A unique identifier in the `uuid` format for this peering connection.
- **name: string**. The name of this connection. Refer to the feature image at the top to see how it is displayed.
- **accepterVpc: string**. The `id` of the accepter VPC.
- **hidden: boolean**. If true, the peering connection is not displayed in the diagram. Defaults to false.

[1]: https://developers.cloudcraft.co/
