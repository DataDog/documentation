---
aliases:
- /ja/workflows/actions_catalog/aws_autoscaling_describeInstanceRefreshes
bundle: com.datadoghq.aws.autoscaling
bundle_title: AWS Autoscaling
description: 指定したオートスケーリンググループのインスタンスリフレッシュに関する情報を取得します。
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
title: インスタンスリフレッシュの記述
---

指定したオートスケーリンググループのインスタンスリフレッシュに関する情報を取得します。

{{< workflows >}}