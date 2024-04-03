---
bundle: com.datadoghq.aws.ec2
bundle_title: AWS EC2
description: Delete a security group.
icon:
  integration_id: amazon-ec2
  type: integration_logo
input: '#/$defs/DeleteSecurityGroupInputs'
inputFieldOrder:
- region
- groupId
- groupName
keywords:
- delete
- remove
output: '#/$defs/DeleteSecurityGroupOutputs'
permissions:
- ec2:DeleteSecurityGroup
source: amazon-ec2
title: Delete security group
---

Delete a security group.

{{< workflows >}}
