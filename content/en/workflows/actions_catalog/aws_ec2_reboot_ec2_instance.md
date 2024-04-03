---
bundle: com.datadoghq.aws.ec2
bundle_title: AWS EC2
description: Request a reboot of the specified instance.
icon:
  integration_id: amazon-ec2
  type: integration_logo
input: '#/$defs/RebootEc2InstanceInputs'
inputFieldOrder:
- region
- instanceId
- waitForCompletion
keywords:
- reboot
- restart
- restore
output: '#/$defs/RebootEc2InstanceOutputs'
permissions:
- ec2:RebootInstances
source: amazon-ec2
title: Reboot EC2 instance
---

Request a reboot of the specified instance.

{{< workflows >}}
