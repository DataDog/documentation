---
bundle: com.datadoghq.aws.ec2
bundle_title: AWS EC2
description: Describe an EC2 instance.
icon:
  integration_id: amazon-ec2
  type: integration_logo
input: '#/$defs/DescribeEc2InstanceInputs'
inputFieldOrder:
- region
- instanceId
keywords:
- describe
- get
- lookup
output: '#/$defs/DescribeEc2InstanceOutputs'
permissions:
- ec2:DescribeInstances
source: amazon-ec2
title: Describe EC2 instance
---

Describe an EC2 instance.

{{< workflows >}}
