---
bundle: com.datadoghq.aws.elb
bundle_title: AWS ELB
description: Add instances to a classic load balancer.
icon:
  integration_id: amazon-elb
  type: integration_logo
input: '#/$defs/RegisterEndPointsInputs'
inputFieldOrder:
- region
- name
- instanceIds
output: '#/$defs/RegisterEndPointsOutputs'
permissions:
- elasticloadbalancing:RegisterInstancesWithLoadBalancer
source: amazon-elb
title: Register instances with classic load balancer
---

Add instances to a classic load balancer.

{{< workflows >}}
