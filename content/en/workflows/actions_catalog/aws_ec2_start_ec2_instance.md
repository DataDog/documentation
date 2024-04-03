---
bundle: com.datadoghq.aws.ec2
bundle_title: AWS EC2
description: Start an Amazon EBS-backed instance that was previously stopped.
icon:
  integration_id: amazon-ec2
  type: integration_logo
input: '#/$defs/StartEc2InstanceInputs'
inputFieldOrder:
- region
- instanceId
- waitForCompletion
output: '#/$defs/StartEc2InstanceOutputs'
permissions:
- ec2:StartInstances
source: amazon-ec2
title: Start EC2 instance
---

Start an Amazon EBS-backed instance that was previously stopped.

{{< workflows >}}
