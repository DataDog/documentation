---
bundle: com.datadoghq.aws.ec2
bundle_title: AWS EC2
description: Describe EBS volumes.
icon:
  integration_id: amazon-ec2
  type: integration_logo
input: '#/$defs/DescribeVolumesInputs'
inputFieldOrder:
- region
- filters
- volumeIds
- maxResults
keywords:
- describe
- get
- lookup
output: '#/$defs/DescribeVolumesOutputs'
permissions:
- ec2:DescribeVolumes
source: amazon-ec2
title: Describe volumes
---

Describe EBS volumes.

{{< workflows >}}
