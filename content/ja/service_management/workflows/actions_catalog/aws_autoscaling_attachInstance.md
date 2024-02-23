---
aliases:
- /ja/workflows/actions_catalog/aws_autoscaling_attachInstance
bundle: com.datadoghq.aws.autoscaling
bundle_title: AWS Autoscaling
description: 指定した Auto Scaling グループに 1 つ以上の EC2 インスタンスをアタッチします。
icon:
  integration_id: amazon-auto-scaling
  type: integration_logo
input: '#/$defs/AttachInstanceInputs'
inputFieldOrder:
- region
- autoScalingGroupName
- instanceId
output: '#/$defs/AttachInstanceOutputs'
permissions:
- autoscaling:AttachInstances
source: amazon-auto-scaling
title: インスタンスのアタッチ
---

指定した Auto Scaling グループに 1 つ以上の EC2 インスタンスをアタッチします。

{{< workflows >}}