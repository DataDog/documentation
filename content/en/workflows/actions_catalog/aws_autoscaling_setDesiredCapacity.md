---
bundle: com.datadoghq.aws.autoscaling
bundle_title: AWS Autoscaling
description: Sets the size of the specified Auto Scaling group.
icon:
  integration_id: amazon-auto-scaling
  type: integration_logo
input: '#/$defs/SetDesiredCapacityInputs'
inputFieldOrder:
- region
- autoScalingGroupName
- desiredCapacity
- honorCooldown
keywords:
- modify
- put
- set
- update
output: '#/$defs/SetDesiredCapacityOutputs'
permissions:
- autoscaling:SetDesiredCapacity
source: amazon-auto-scaling
title: Set desired capacity
---

Sets the size of the specified Auto Scaling group.

{{< workflows >}}
