---
bundle: com.datadoghq.aws.autoscaling
bundle_title: AWS Autoscaling
description: Attaches one or more EC2 instances to the specified Auto Scaling group.
icon:
  integration_id: amazon-auto-scaling
  type: integration_logo
input: '#/$defs/AttachInstanceInputs'
inputFieldOrder:
- region
- autoScalingGroupName
- instanceId
output: '#/$defs/AttachInstanceOutputs'
permissions:
- autoscaling:AttachInstances
source: amazon-auto-scaling
title: Attach instance
---

Attaches one or more EC2 instances to the specified Auto Scaling group.

{{< workflows >}}
