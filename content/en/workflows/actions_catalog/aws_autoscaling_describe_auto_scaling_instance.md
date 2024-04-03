---
bundle: com.datadoghq.aws.autoscaling
bundle_title: AWS Autoscaling
description: Get information about the auto scaling instances in an account and region.
icon:
  integration_id: amazon-auto-scaling
  type: integration_logo
input: '#/$defs/DescribeAutoScalingInstanceInputs'
inputFieldOrder:
- region
- instanceId
keywords:
- describe
- get
- lookup
output: '#/$defs/DescribeAutoScalingInstanceOutputs'
permissions:
- autoscaling:DescribeAutoScalingInstances
source: amazon-auto-scaling
title: Describe auto scaling instance
---

Get information about the auto scaling instances in an account and region.

{{< workflows >}}
