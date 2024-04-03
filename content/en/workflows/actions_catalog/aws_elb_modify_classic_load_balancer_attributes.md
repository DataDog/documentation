---
bundle: com.datadoghq.aws.elb
bundle_title: AWS ELB
description: Modify the attributes of a classic load balancer.
icon:
  integration_id: amazon-elb
  type: integration_logo
input: '#/$defs/ModifyClassicLoadBalancerAttributesInputs'
inputFieldOrder:
- region
- name
- accessLog
- idleTimeout
- crossZoneLoadBalancingEnabled
- connectionDrainingEnabled
- connectionDrainingTimeout
keywords:
- modify
- put
- set
- update
output: '#/$defs/ModifyClassicLoadBalancerAttributesOutputs'
permissions:
- elasticloadbalancing:ModifyLoadBalancerAttributes
source: amazon-elb
title: Modify classic load balancer attributes
---

Modify the attributes of a classic load balancer.

{{< workflows >}}
