---
bundle: com.datadoghq.aws.elb
bundle_title: AWS ELB
description: Describe the health of specific targets or all targets.
icon:
  integration_id: amazon-elb
  type: integration_logo
input: '#/$defs/DescribeTargetHealthInputs'
inputFieldOrder:
- region
- targetGroupARN
- targetIds
keywords:
- describe
- get
- lookup
output: '#/$defs/DescribeTargetHealthOutputs'
permissions:
- elasticloadbalancing:DescribeTargetHealth
source: amazon-elb
title: Describe target health
---

Describe the health of specific targets or all targets.

{{< workflows >}}
