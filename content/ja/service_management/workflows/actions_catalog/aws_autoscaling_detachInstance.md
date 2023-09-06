---
aliases:
- /ja/workflows/actions_catalog/aws_autoscaling_detachInstance
bundle: com.datadoghq.aws.autoscaling
bundle_title: AWS Autoscaling
description: 指定したオートスケーリンググループから 1 つまたは複数のインスタンスを削除します。
icon:
  integration_id: amazon-auto-scaling
  type: integration_logo
input: '#/$defs/DetachInstanceInputs'
inputFieldOrder:
- region
- autoScalingGroupName
- instanceId
output: '#/$defs/DetachInstanceOutputs'
permissions:
- autoscaling:DetachInstances
source: amazon-auto-scaling
title: インスタンスのデタッチ
---

指定したオートスケーリンググループから 1 つまたは複数のインスタンスを削除します。

{{< workflows >}}