---
bundle: com.datadoghq.aws.autoscaling
bundle_title: AWS Autoscaling
description: Get information about the instance refreshes for the specified auto scaling
  group.
icon:
  integration_id: amazon-auto-scaling
  type: integration_logo
input: '#/$defs/DescribeInstanceRefreshesInputs'
inputFieldOrder:
- region
- autoScalingGroupName
- instanceRefreshId
keywords:
- describe
- get
- lookup
output: '#/$defs/DescribeInstanceRefreshesOutputs'
permissions:
- autoscaling:DescribeInstanceRefreshes
source: amazon-auto-scaling
title: Describe instance refresh
---

Get information about the instance refreshes for the specified auto scaling group.

{{< workflows >}}
