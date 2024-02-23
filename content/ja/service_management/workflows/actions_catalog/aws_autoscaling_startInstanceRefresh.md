---
aliases:
- /ja/workflows/actions_catalog/aws_autoscaling_startInstanceRefresh
bundle: com.datadoghq.aws.autoscaling
bundle_title: AWS Autoscaling
description: 新しいインスタンスリフレッシュの操作を開始します。インスタンスリフレッシュは、オートスケーリンググループ内のすべてのインスタンスまたは一部のインスタンスのローリング置換を実行します。各インスタンスは最初に終了してから置き換えられるため、オートスケーリンググループ内で利用できる容量が一時的に減少します。
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
title: インスタンスリフレッシュの開始
---

新しいインスタンスリフレッシュの操作を開始します。インスタンスリフレッシュは、オートスケーリンググループ内のすべてのインスタンスまたは一部のインスタンスのローリング置換を実行します。各インスタンスは最初に終了してから置き換えられるため、オートスケーリンググループ内で利用できる容量が一時的に減少します。

{{< workflows >}}