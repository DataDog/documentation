---
bundle: com.datadoghq.aws.elb
bundle_title: AWS ELB
description: Describe the attributes of a target group.
icon:
  integration_id: amazon-elb
  type: integration_logo
input: '#/$defs/DescribeTargetGroupAttributesInputs'
inputFieldOrder:
- region
- targetGroupARN
keywords:
- describe
- get
- lookup
output: '#/$defs/DescribeTargetGroupAttributesOutputs'
permissions:
- elasticloadbalancing:DescribeTargetGroupAttributes
source: amazon-elb
title: Describe target group attributes
---

Describe the attributes of a target group.

{{< workflows >}}
