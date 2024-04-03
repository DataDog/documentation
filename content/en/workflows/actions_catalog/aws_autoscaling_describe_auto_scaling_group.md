---
bundle: com.datadoghq.aws.autoscaling
bundle_title: AWS Autoscaling
description: Get information about the auto scaling groups in an account and region.
icon:
  integration_id: amazon-auto-scaling
  type: integration_logo
input: '#/$defs/DescribeAutoScalingGroupInputs'
inputFieldOrder:
- region
- autoScalingGroupName
keywords:
- describe
- get
- lookup
output: '#/$defs/DescribeAutoScalingGroupOutputs'
permissions:
- autoscaling:DescribeAutoScalingGroups
source: amazon-auto-scaling
title: Describe auto scaling group
---

Get information about the auto scaling groups in an account and region.

{{< workflows >}}
