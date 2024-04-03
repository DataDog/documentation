---
bundle: com.datadoghq.aws.autoscaling
bundle_title: AWS Autoscaling
description: Start a new instance refresh operation. An instance refresh performs
  a rolling replacement of all or some instances in an auto scaling group. Each instance
  is terminated first and then replaced, which temporarily reduces the capacity available
  within your auto scaling group.
icon:
  integration_id: amazon-auto-scaling
  type: integration_logo
input: '#/$defs/StartInstanceRefreshInputs'
inputFieldOrder:
- region
- autoScalingGroupName
- desiredConfiguration
- preferences
output: '#/$defs/StartInstanceRefreshOutputs'
permissions:
- autoscaling:StartInstanceRefresh
source: amazon-auto-scaling
title: Start instance refresh
---

Start a new instance refresh operation. An instance refresh performs a rolling replacement of all or some instances in an auto scaling group. Each instance is terminated first and then replaced, which temporarily reduces the capacity available within your auto scaling group.

{{< workflows >}}
