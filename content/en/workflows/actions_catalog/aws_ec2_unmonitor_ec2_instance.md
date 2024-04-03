---
bundle: com.datadoghq.aws.ec2
bundle_title: AWS EC2
description: Disable detailed monitoring for a running instance.
icon:
  integration_id: amazon-ec2
  type: integration_logo
input: '#/$defs/UnmonitorEc2InstanceInputs'
inputFieldOrder:
- region
- instanceId
output: '#/$defs/UnmonitorEc2InstanceOutputs'
permissions:
- ec2:UnmonitorInstances
source: amazon-ec2
title: Unmonitor EC2 instance
---

Disable detailed monitoring for a running instance.

{{< workflows >}}
