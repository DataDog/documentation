---
bundle: com.datadoghq.aws.ec2
bundle_title: AWS EC2
description: Describe the specified security group.
icon:
  integration_id: amazon-ec2
  type: integration_logo
input: '#/$defs/DescribeSecurityGroupInputs'
inputFieldOrder:
- region
- groupName
keywords:
- describe
- get
- lookup
output: '#/$defs/DescribeSecurityGroupOutputs'
permissions:
- ec2:DescribeSecurityGroup
source: amazon-ec2
title: Describe security group
---

Describe the specified security group.

{{< workflows >}}
