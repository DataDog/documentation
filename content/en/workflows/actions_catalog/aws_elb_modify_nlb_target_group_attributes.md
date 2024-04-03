---
bundle: com.datadoghq.aws.elb
bundle_title: AWS ELB
description: Modify attributes of a target group.
icon:
  integration_id: amazon-elb
  type: integration_logo
input: '#/$defs/ModifyNlbTargetGroupAttributesInputs'
inputFieldOrder:
- region
- targetGroupARN
- nlbAttributes
keywords:
- modify
- put
- set
- update
output: '#/$defs/ModifyNlbTargetGroupAttributesOutputs'
permissions:
- elasticloadbalancing:ModifyTargetGroupAttributes
source: amazon-elb
title: Modify NLB target group attributes
---

Modify attributes of a target group.

{{< workflows >}}
