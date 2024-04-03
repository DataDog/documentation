---
bundle: com.datadoghq.aws.elb
bundle_title: AWS ELB
description: Deregister instances from a classic load balancer. After an instance
  is deregistered, it no longer receives traffic from the load balancer.
icon:
  integration_id: amazon-elb
  type: integration_logo
input: '#/$defs/DeregisterEndPointsInputs'
inputFieldOrder:
- region
- name
- instanceIds
output: '#/$defs/DeregisterEndPointsOutputs'
permissions:
- elasticloadbalancing:DeregisterInstancesWithLoadBalancer
source: amazon-elb
title: Deregister instances from classic load balancer
---

Deregister instances from a classic load balancer. After an instance is deregistered, it no longer receives traffic from the load balancer.

{{< workflows >}}
