---
bundle: com.datadoghq.aws.elb
bundle_title: AWS ELB
description: Configure a blue-green deployment for the application load balancer using
  the given strategy. This modifies the default actions of the given listener. When
  stickiness is enabled, requests routed to a target group remain in the same group
  for the duration you specify.
icon:
  integration_id: amazon-elb
  type: integration_logo
input: '#/$defs/SetBlueGreenStrategyInputs'
inputFieldOrder:
- region
- listenerARN
- blueTargetARN
- greenTargetARN
- greenWeight
- enableStickiness
- stickinessDuration
keywords:
- modify
- put
- set
- update
output: '#/$defs/SetBlueGreenStrategyOutputs'
permissions:
- elasticloadbalancing:ModifyListener
source: amazon-elb
title: Set blue-green deployment strategy
---

Configure a blue-green deployment for the application load balancer using the given strategy. This modifies the default actions of the given listener. When stickiness is enabled, requests routed to a target group remain in the same group for the duration you specify.

{{< workflows >}}
