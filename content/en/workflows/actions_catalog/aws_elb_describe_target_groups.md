---
bundle: com.datadoghq.aws.elb
bundle_title: AWS ELB
description: Describe the specified target groups. You can specify either their ARNs
  or their names.
icon:
  integration_id: amazon-elb
  type: integration_logo
input: '#/$defs/DescribeTargetGroupsInputs'
inputFieldOrder:
- region
- loadBalancerARN
- targetGroupARNs
- pageSize
keywords:
- describe
- get
- lookup
output: '#/$defs/DescribeTargetGroupsOutputs'
permissions:
- elasticloadbalancing:DescribeTargetGroups
source: amazon-elb
title: List target groups
---

Describe the specified target groups. You can specify either their ARNs or their names.

{{< workflows >}}
