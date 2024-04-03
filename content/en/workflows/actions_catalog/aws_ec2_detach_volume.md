---
bundle: com.datadoghq.aws.ec2
bundle_title: AWS EC2
description: Detach an EBS volume from an instance.
icon:
  integration_id: amazon-ec2
  type: integration_logo
input: '#/$defs/DetachVolumeInputs'
inputFieldOrder:
- region
- volumeId
- instanceId
- device
output: '#/$defs/DetachVolumeOutputs'
permissions:
- ec2:DetachVolume
source: amazon-ec2
title: Detach volume
---

Detach an EBS volume from an instance.

{{< workflows >}}
