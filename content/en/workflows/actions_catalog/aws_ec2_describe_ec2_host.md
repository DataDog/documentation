---
bundle: com.datadoghq.aws.ec2
bundle_title: AWS EC2
description: Describe a dedicated host.
icon:
  integration_id: amazon-ec2
  type: integration_logo
input: '#/$defs/DescribeHostInputs'
inputFieldOrder:
- region
- hostId
keywords:
- describe
- get
- lookup
output: '#/$defs/DescribeHostOutputs'
permissions:
- ec2:DescribeHosts
source: amazon-ec2
title: Describe EC2 host
---

Describe a dedicated host.

{{< workflows >}}
