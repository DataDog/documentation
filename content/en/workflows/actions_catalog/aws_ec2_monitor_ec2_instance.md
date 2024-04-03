---
bundle: com.datadoghq.aws.ec2
bundle_title: AWS EC2
description: Enable detailed monitoring for a running instance.
icon:
  integration_id: amazon-ec2
  type: integration_logo
input: '#/$defs/MonitorEc2InstanceInputs'
inputFieldOrder:
- region
- instanceId
output: '#/$defs/MonitorEc2InstanceOutputs'
permissions:
- ec2:MonitorInstances
source: amazon-ec2
title: Monitor EC2 instance
---

Enable detailed monitoring for a running instance.

{{< workflows >}}
