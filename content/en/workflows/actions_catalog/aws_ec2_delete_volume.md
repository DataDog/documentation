---
bundle: com.datadoghq.aws.ec2
bundle_title: AWS EC2
description: Delete an EBS volume.
icon:
  integration_id: amazon-ec2
  type: integration_logo
input: '#/$defs/DeleteVolumeInputs'
inputFieldOrder:
- region
- volumeId
keywords:
- delete
- remove
output: '#/$defs/DeleteVolumeOutputs'
permissions:
- ec2:DeleteVolume
source: amazon-ec2
title: Delete volume
---

Delete an EBS volume.

{{< workflows >}}
