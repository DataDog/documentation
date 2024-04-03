---
bundle: com.datadoghq.aws.ec2
bundle_title: AWS EC2
description: Add new Security Groups to list of already existing Security Groups of
  a EC2 Instance.
icon:
  integration_id: amazon-ec2
  type: integration_logo
input: '#/$defs/AddSecurityGroupsToInstanceInputs'
inputFieldOrder: []
output: '#/$defs/AddSecurityGroupsToInstanceOutputs'
permissions:
- ec2:ModifyInstanceAttribute
source: amazon-ec2
title: Add EC2 instance security groups
---

Add new Security Groups to list of already existing Security Groups of a EC2 Instance.

{{< workflows >}}
