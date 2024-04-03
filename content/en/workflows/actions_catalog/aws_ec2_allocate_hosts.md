---
bundle: com.datadoghq.aws.ec2
bundle_title: AWS EC2
description: Allocate dedicated hosts to your account.
icon:
  integration_id: amazon-ec2
  type: integration_logo
input: '#/$defs/AllocateHostsInputs'
inputFieldOrder:
- region
- availabilityZone
- quantity
- instanceType
- instanceFamily
output: '#/$defs/AllocateHostsOutputs'
permissions:
- ec2:AllocateHosts
source: amazon-ec2
title: Allocate hosts
---

Allocate dedicated hosts to your account.

{{< workflows >}}
