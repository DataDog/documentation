---
aliases:
- /ja/workflows/actions_catalog/aws_autoscaling_describeScalingActivity
bundle: com.datadoghq.aws.autoscaling
bundle_title: AWS Autoscaling
description: アカウントとリージョンにおけるスケーリングアクティビティに関する情報を取得します。
icon:
  integration_id: amazon-auto-scaling
  type: integration_logo
input: '#/$defs/DescribeScalingActivityInputs'
inputFieldOrder:
- region
- activityId
keywords:
- describe
- get
- lookup
output: '#/$defs/DescribeScalingActivityOutputs'
permissions:
- autoscaling:DescribeScalingActivities
source: amazon-auto-scaling
title: アクティビティの記述
---

アカウントとリージョンにおけるスケーリングアクティビティに関する情報を取得します。

{{< workflows >}}