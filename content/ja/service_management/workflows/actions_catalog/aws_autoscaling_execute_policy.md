---
aliases:
- /ja/workflows/actions_catalog/aws_autoscaling_execute_policy
bundle: com.datadoghq.aws.autoscaling
bundle_title: AWS Autoscaling
description: 指定されたポリシーを実行します。これは、スケーリングポリシーの設計をテストするのに便利です。
icon:
  integration_id: amazon-auto-scaling
  type: integration_logo
input: '#/$defs/ExecutePolicyInputs'
inputFieldOrder:
- region
- policyName
- autoScalingGroupName
- breachThreshold
- honorCooldown
- metricValue
output: '#/$defs/ExecutePolicyOutputs'
permissions:
- autoscaling:ExecutePolicy
source: amazon-auto-scaling
title: ポリシーの実行
---

指定されたポリシーを実行します。これは、スケーリングポリシーの設計をテストするのに便利です。

{{< workflows >}}