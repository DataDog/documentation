---
title: Network ACL
---

## Overview

Use the Network ACL component to visualize network access control lists from your Amazon Web Services architecture.

{{< img src="cloudcraft/components-aws/network-acl/component-network-acl-diagram.png" alt="Screenshot of an isometric Cloudcraft diagram showing the 'Network ACL' AWS component." responsive="true" style="width:60%;">}}

## Toolbar

Use the toolbar to configure and customize the component. The following options are available:

- **Visibility**. Toggle the visibility of the component on the diagram.
- **Color**. Select a fill color for the body of the component and an accent color for its symbol. You can use the same colors on 2D and 3D views or different colors for each.
- **Name**. Give the NACL a name.
- **Shape**. Select a shape for the component.
- **Padding**. Increase or decrease the amount of space inside the component.
- **Rules**. Add, edit, or remove inbound and outbound rules for the NACL.

## API

Use the [Cloudcraft API][1] to programmatically access and render your architecture diagrams as JSON objects.

### Schema

The following is an example JSON of a Region component:

```json
{
    "type": "networkacl",
    "id": "acl-0mqj0d4dxpmf9iru3",
    "arn": "arn:aws:ec2:us-east-1:762056483071:network-acl/acl-0mqj0d4dxpmf9iru3",
    "region": "us-east-1",
    "visible": true,
    "name": "acl-0mqj0d4dxpmf9iru3",
    "shape": "rectangular",
    "padding": 2,
    "nodes": [
        "1ae68ef4-f3cb-4e07-8660-2a4a4bc30e36",
        "subnet-0752f314ffbf0126e"
    ],
    "inboundRules": [
        {
            "ruleNumber": 100,
            "protocol": "-1",
            "portRange": "0",
            "target": "0.0.0.0/0",
            "targetType": "ip",
            "access": "allow"
        },
        {
            "ruleNumber": 32767,
            "protocol": "-1",
            "portRange": "0",
            "target": "0.0.0.0/0",
            "targetType": "ip",
            "access": "deny"
        }
    ],
    "outboundRules": [
        {
            "ruleNumber": 100,
            "protocol": "-1",
            "portRange": "0",
            "target": "0.0.0.0/0",
            "targetType": "ip",
            "access": "allow"
        },
        {
            "ruleNumber": 32767,
            "protocol": "-1",
            "portRange": "0",
            "target": "0.0.0.0/0",
            "targetType": "ip",
            "access": "deny"
        }
    ],
    "color": {
        "isometric": "#5698ff",
        "2d": "#5698ff"
    },
    "link": "https://aws.amazon.com/",
    "locked": true
}
```

- **type: string**: The type of component.
- **id: string**: A unique identifier for the component consisting of the string `acl-` followed by a random 17-character alphanumeric string.
- **arn: string**: The globally unique identifier for the component within AWS, known as [Amazon Resource Names](https://docs.aws.amazon.com/general/latest/gr/aws-arns-and-namespaces.html).
- **region: string**: The AWS region for the component. All global regions are supported except `cn-` regions.
- **visible: boolean**: If `false`, the component becomes semi-transparent on the diagram. Defaults to `true`.
- **name: string**: The name for the NACL.
- **shape: string**: The shape of the component. Accepts either `dynamic` or `rectangular`. Defaults to `retangular`.
- **padding: number**: The padding value for the component. Defaults to `2`.
- **nodes: array**: An array of component IDs that are inside the NACL.
- **inboundRules: array**: The rules for incoming traffic for components inside the NACL.
  - **ruleNumber: number**: The rule number for the NACL.
  - **protocol: string**: The protocol for the rule. Accepts either `-1`, meaning "All," or a specific protocol.
  - **portRange: string**: The listening port or port range for the traffic.
  - **target: string**: The source of the traffic (CIDR range).
  - **targetType: string**: The target type for the rule. Accepts either `ip` or `ipv6`.
  - **access: string**: The type of access for the rule. Accepts either `allow` or `deny`.
- **outboundRules: array**: The rules for outgoing traffic for components inside the NACL.
  - **ruleNumber: number**: The rule number for the NACL.
  - **protocol: string**: The protocol for the rule. Accepts either `-1`, meaning "All," or a specific protocol.
  - **portRange: string**: The listening port or port range for the traffic.
  - **target: string**: The destination for the traffic (CIDR range).
  - **targetType: string**: The target type for the rule. Accepts either `ip` or `ipv6`.
  - **access: string**: The type of access for the rule. Accepts either `allow` or `deny`.
- **color: object**: The fill color for the component body.
  - **isometric: string**: The fill color for the component in the 3D view. Must be a hexadecimal color. Defaults to `#ECECED`.
  - **2d: string**: The fill color for the component in the 2D view. Must be a hexadecimal color. Defaults to `#CC2264`.
- **link: uri**: Link the component to another diagram using the `blueprint://ID` format or to an external website using the `https://LINK` format.
- **locked: boolean**: If `true`, changes made to the component using the application are disabled until unlocked.
