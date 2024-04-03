---
bundle: com.datadoghq.aws.ec2
bundle_title: AWS EC2
description: Stop an Amazon EBS-backed instance.
icon:
  integration_id: amazon-ec2
  type: integration_logo
input: '#/$defs/StopEc2InstanceInputs'
inputFieldOrder:
- region
- instanceId
- waitForCompletion
- hibernate
- force
keywords:
- stop
- terminate
output: '#/$defs/StopEc2InstanceOutputs'
permissions:
- ec2:StopInstances
source: amazon-ec2
title: Stop EC2 instance
---

Stop an Amazon EBS-backed instance.

{{< workflows >}}
