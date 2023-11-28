---
aliases:
- /ja/workflows/actions_catalog/aws_autoscaling_setDesiredCapacity
bundle: com.datadoghq.aws.autoscaling
bundle_title: AWS Autoscaling
description: 指定したオートスケーリンググループのサイズを設定します。
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
title: 希望する容量を設定
---

指定したオートスケーリンググループのサイズを設定します。

{{< workflows >}}