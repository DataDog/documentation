---
bundle: com.datadoghq.aws.elb
bundle_title: AWS ELB
description: Register targets with a target group.
icon:
  integration_id: amazon-elb
  type: integration_logo
input: '#/$defs/RegisterTargetsInputs'
inputFieldOrder:
- region
- targetGroupARN
- targetIds
output: '#/$defs/RegisterTargetsOutputs'
permissions:
- elasticloadbalancing:RegisterTargets
source: amazon-elb
title: Register targets
---

Register targets with a target group.

{{< workflows >}}
