---
title: "Component: Security group"
kind: guide
---

{{< img src="cloudcraft/components-aws/security-group/component-security-group-diagram.png" alt="Screenshot of an isometric Cloudcraft diagram showing the 'Security group' AWS component." responsive="true" style="width:100%;">}}

The **Security group** component is used to represent security groups from your Amazon Web Services architecture with Cloudcraft.

## Toolbar

The toolbar is displayed when selecting a component. It allows you to customize parts of your component and its visual to your liking.

- **Color**. Select a predefined color or enter the hexadecimal value of the color for the component and its accent. The component can use the same color for both 2D and 3D view, or different colors for each.
- **Name**. Give the security group a name.
- **Shape**. Select a shape for the security group, dynamic or rectangular.
- **Padding**. Increase or decrease the amount of space inside the security group.
- **Inbound/Outbound**. View, remove, or add, inbound and outbound rules for components inside this security group.

## API

In [the Cloudcraft API](https://developers.cloudcraft.co/), the security group component is represented in JSON.

```json
{
  "type": "sg",
  "id": "a699dbeb-2fe5-49a5-beea-b24695c247e4",
  "region": "us-east-1",
  "name": "cloudcraft-sg-example",
  "shape": "dynamic",
  "padding": 1.5,
  "nodes": [
    "e99bad32-82f6-49a7-b145-11963a3d7775"
  ],
  "inboundRules": [
    {
      "portRange": "80",
      "protocol": "tcp",
      "target": "bc883fec-e97c-4c27-b9a7-64e3d154452b",
      "targetType": "sg",
      "description": "HTTP Traffic",
      "hidden": false
    },
    {
      "portRange": "443",
      "protocol": "tcp",
      "target": "bc883fec-e97c-4c27-b9a7-64e3d154452b",
      "targetType": "sg",
      "description": "HTTPS Traffic",
      "hidden": false
    },
    {
      "portRange": "22",
      "protocol": "tcp",
      "target": "65e16268-d9ee-440a-9a4d-29b92520572e",
      "targetType": "sg",
      "description": "Bastion server",
      "hidden": false
    }
  ],
  "outboundRules": [
    {
      "portRange": "25",
      "protocol": "tcp",
      "target": "199.255.192.0/22",
      "targetType": "ip",
      "description": "AWS SES",
      "hidden": false
    }
  ],
  "color": {
    "isometric": "#4286c5",
    "2d": "#4286c5"
  },
  "link": "blueprint://33a8bf46-7326-4999-ba0a-789bcd94f0a2",
  "locked": true
}
```

- **type: sg**. The type of component.
- **id: string**. A unique identifier for the component in the `uuid` format.
- **region: string**. The AWS region this security group is deployed in. With the exception of `cn-` regions, all global regions are supported.
- **name: string**. The name for the security group.
- **shape: string**. The shape of the security group. Accepted values are `dynamic` or `rectangular`.
- **padding: number**. The internal padding for the security group. Defaults to 1.5.
- **nodes: array**. The components inside the security group. [See below for more information](#accepted-values-for-nodes).
- **inboundRules: array**. The rules for incoming traffic for the components inside this security group. [See below for more information](#accepted-values-for-inboundrules-and-outboundrules).
- **outboundRules: array**. The rules for outgoing traffic for the components inside this security group. [See below for more information](#accepted-values-for-inboundrules-and-outboundrules).
- **color: object**. The fill color for the component.
  - **isometric: string**. Fill color for the component in 3D view. Must be an hexadecimal color.
  - **2d: string**. Fill color for the component in 2D view. Must be an hexadecimal color.
- **link: uri**. Link component to another diagram in the `blueprint://ID` format or to external website in the `https://LINK` format.
- **locked: boolean**. If true, changes to the component through the application are disabled until unlocked.

### Accepted values for nodes

The `nodes` key accepts an array of unique identifiers for the components inside the security group.

The following AWS components can be added to a security group:

```
asg, ec2, lambda, efs, fsx, elb, rds, docdb, elasticache, redshift, es
```

In addition to the AWS components, the following common components can be added to security groups as well:

```
block, isotext, icon, image, area
```

### Accepted values for inboundRules and outboundRules

The `inboundRules` and `outboundRules` keys accept an array with rule represented by JSON objects.

```json
{
  "inboundRules": [
    {
      "portRange": "22",
      "protocol": "tcp",
      "target": "192.0.2.0/24",
      "targetType": "ip",
      "description": "RFC 5737",
      "hidden": false
    }
  ],
  "outboundRules": [
    {
      "portRange": "25",
      "protocol": "tcp",
      "target": "199.255.192.0/22",
      "targetType": "ip",
      "description": "AWS SES",
      "hidden": false
    }
  ]
}

```

- **portRange: number**. The number of the port affected by this rule. Accepts a single port or a range of ports, e.g. 42000-42222.
- **protocol: string**. The network protocol affected by this rule.
- **target: string**. The CIDR or `id` of a security group that is the source of traffic to the components.
- **targetType: string**. The type of source used for `target`. Accepted values are `ip` or `sg`.
- **description: string**. A short description for the inbound or outbound rule.
- **hidden: boolean**. If true, the inbound or outbound rule is not displayed in the diagram. Refer to the feature image at the top to see how it is displayed. Defaults to false.
