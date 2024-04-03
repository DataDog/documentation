---
bundle: com.datadoghq.aws.ec2
bundle_title: AWS EC2
description: Replaces current set of Security Groups associated with a specific EC2
  instance with the Security Groups specified.
icon:
  integration_id: amazon-ec2
  type: integration_logo
input: '#/$defs/UpdateInstanceSecurityGroupsInputs'
inputFieldOrder:
- region
- instanceId
- groups
keywords:
- modify
- put
- set
- update
output: '#/$defs/UpdateInstanceSecurityGroupsOutputs'
permissions:
- ec2:ModifyInstanceAttribute
source: amazon-ec2
title: Update EC2 instance security groups
---

Replaces current set of Security Groups associated with a specific EC2 instance with the Security Groups specified.

{{< workflows >}}
