---
bundle: com.datadoghq.aws.elb
bundle_title: AWS ELB
description: Modify attributes of a target group.
icon:
  integration_id: amazon-elb
  type: integration_logo
input: '#/$defs/ModifyAlbTargetGroupAttributesInputs'
inputFieldOrder:
- region
- targetGroupARN
- albAttributes
keywords:
- modify
- put
- set
- update
output: '#/$defs/ModifyAlbTargetGroupAttributesOutputs'
permissions:
- elasticloadbalancing:ModifyTargetGroupAttributes
source: amazon-elb
title: Modify ALB target group attributes
---

Modify attributes of a target group.

{{< workflows >}}
