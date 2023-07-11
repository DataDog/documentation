---
aliases:
- /ja/workflows/actions_catalog/aws_autoscaling_describe_auto_scaling_group
bundle: com.datadoghq.aws.autoscaling
bundle_title: AWS Autoscaling
description: アカウントおよびリージョン内のオートスケーリンググループに関する情報を取得します。
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
title: オートスケーリンググループの記述
---

アカウントおよびリージョン内のオートスケーリンググループに関する情報を取得します。

{{< workflows >}}