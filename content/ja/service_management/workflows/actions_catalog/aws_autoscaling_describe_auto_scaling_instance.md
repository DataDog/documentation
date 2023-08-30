---
aliases:
- /ja/workflows/actions_catalog/aws_autoscaling_describe_auto_scaling_instance
bundle: com.datadoghq.aws.autoscaling
bundle_title: AWS Autoscaling
description: アカウントおよびリージョン内のオートスケーリングインスタンスに関する情報を取得します。
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
title: オートスケーリングインスタンスの記述
---

アカウントおよびリージョン内のオートスケーリングインスタンスに関する情報を取得します。

{{< workflows >}}