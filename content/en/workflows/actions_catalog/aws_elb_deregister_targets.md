---
bundle: com.datadoghq.aws.elb
bundle_title: AWS ELB
description: Deregister targets from a target group. After the targets are deregistered,
  they no longer receive traffic from the load balancer.
icon:
  integration_id: amazon-elb
  type: integration_logo
input: '#/$defs/DeregisterTargetsInputs'
inputFieldOrder:
- region
- targetGroupARN
- targetIds
output: '#/$defs/DeregisterTargetsOutputs'
permissions:
- elasticloadbalancing:DeregisterTargets
source: amazon-elb
title: Deregister targets
---

Deregister targets from a target group. After the targets are deregistered, they no longer receive traffic from the load balancer.

{{< workflows >}}
