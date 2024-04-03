---
bundle: com.datadoghq.aws.ec2
bundle_title: AWS EC2
description: Create an EBS volume that can be attached to an instance in the same
  availability zone.
icon:
  integration_id: amazon-ec2
  type: integration_logo
input: '#/$defs/CreateVolumeInputs'
inputFieldOrder:
- region
- availabilityZone
- encrypted
- size
- volumeType
output: '#/$defs/CreateVolumeOutputs'
permissions:
- ec2:CreateVolume
source: amazon-ec2
title: Create volume
---

Create an EBS volume that can be attached to an instance in the same availability zone.

{{< workflows >}}
