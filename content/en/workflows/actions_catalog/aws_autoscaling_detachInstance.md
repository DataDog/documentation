---
bundle: com.datadoghq.aws.autoscaling
bundle_title: AWS Autoscaling
description: Removes one or more instances from the specified auto scaling group.
icon:
  integration_id: amazon-auto-scaling
  type: integration_logo
input: '#/$defs/DetachInstanceInputs'
inputFieldOrder:
- region
- autoScalingGroupName
- instanceId
output: '#/$defs/DetachInstanceOutputs'
permissions:
- autoscaling:DetachInstances
source: amazon-auto-scaling
title: Detach instance
---

Removes one or more instances from the specified auto scaling group.

{{< workflows >}}
