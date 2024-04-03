---
bundle: com.datadoghq.aws.ec2
bundle_title: AWS EC2
description: List EC2 instances.
icon:
  integration_id: amazon-ec2
  type: integration_logo
input: '#/$defs/DescribeEc2InstancesInputs'
inputFieldOrder:
- region
- instanceIds
- filters
- maxResults
keywords:
- describe
- get
- lookup
output: '#/$defs/DescribeEc2InstancesOutputs'
permissions:
- ec2:DescribeInstances
source: amazon-ec2
title: List EC2 instances
---

List EC2 instances.

{{< workflows >}}
