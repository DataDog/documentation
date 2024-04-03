---
bundle: com.datadoghq.aws.ec2
bundle_title: AWS EC2
description: Attach an EBS volume to a running or stopped instance, and expose it
  to the instance with the specified device name.
icon:
  integration_id: amazon-ec2
  type: integration_logo
input: '#/$defs/AttachVolumeInputs'
inputFieldOrder:
- region
- volumeId
- instanceId
- device
output: '#/$defs/AttachVolumeOutputs'
permissions:
- ec2:AttachVolume
source: amazon-ec2
title: Attach volume
---

Attach an EBS volume to a running or stopped instance, and expose it to the instance with the specified device name.

{{< workflows >}}
