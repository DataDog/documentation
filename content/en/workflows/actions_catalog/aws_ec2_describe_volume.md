---
bundle: com.datadoghq.aws.ec2
bundle_title: AWS EC2
description: Describe an EBS volume.
icon:
  integration_id: amazon-ec2
  type: integration_logo
input: '#/$defs/DescribeVolumeInputs'
inputFieldOrder:
- region
- volumeId
keywords:
- describe
- get
- lookup
output: '#/$defs/DescribeVolumeOutputs'
permissions:
- ec2:DescribeVolume
source: amazon-ec2
title: Describe volume
---

Describe an EBS volume.

{{< workflows >}}
