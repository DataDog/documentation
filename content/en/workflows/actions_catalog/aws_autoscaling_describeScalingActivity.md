---
bundle: com.datadoghq.aws.autoscaling
bundle_title: AWS Autoscaling
description: Gets information about the scaling activity in the account and region.
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
title: Describe activity
---

Gets information about the scaling activity in the account and region.

{{< workflows >}}
