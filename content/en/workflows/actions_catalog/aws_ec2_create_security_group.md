---
bundle: com.datadoghq.aws.ec2
bundle_title: AWS EC2
description: Create a security group. A security group acts as a virtual firewall
  for your instance to control inbound and outbound traffic.
icon:
  integration_id: amazon-ec2
  type: integration_logo
input: '#/$defs/CreateSecurityGroupInputs'
inputFieldOrder:
- region
- groupName
- groupDescription
- vpcId
output: '#/$defs/CreateSecurityGroupOutputs'
permissions:
- ec2:CreateSecurityGroup
source: amazon-ec2
title: Create security group
---

Create a security group. A security group acts as a virtual firewall for your instance to control inbound and outbound traffic.

{{< workflows >}}
