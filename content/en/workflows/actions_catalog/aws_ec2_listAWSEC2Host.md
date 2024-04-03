---
bundle: com.datadoghq.aws.ec2
bundle_title: AWS EC2
description: Lists hosts.
icon:
  integration_id: amazon-ec2
  type: integration_logo
input: '#/$defs/ListAWSEC2HostInputs'
inputFieldOrder:
- region
keywords:
- all
- list
output: '#/$defs/ListAWSEC2HostOutputs'
permissions:
- ec2:DescribeHosts
source: amazon-ec2
stability: stable
title: List hosts
---

Lists hosts.

{{< workflows >}}
