---
bundle: com.datadoghq.aws.ec2
bundle_title: AWS EC2
description: Terminate an EC2 instance.
icon:
  integration_id: amazon-ec2
  type: integration_logo
input: '#/$defs/TerminateEc2InstanceInputs'
inputFieldOrder:
- region
- instanceId
- waitForCompletion
keywords:
- stop
- terminate
output: '#/$defs/TerminateEc2InstanceOutputs'
permissions:
- ec2:TerminateInstances
source: amazon-ec2
title: Terminate EC2 instance
---

Terminate an EC2 instance.

{{< workflows >}}
