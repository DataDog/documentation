---
bundle: com.datadoghq.aws.autoscaling
bundle_title: AWS Autoscaling
description: Executes the specified policy. This can be useful for testing the design
  of your scaling policy.
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
title: Execute policy
---

Executes the specified policy. This can be useful for testing the design of your scaling policy.

{{< workflows >}}
