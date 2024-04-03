---
bundle: com.datadoghq.aws.ec2
bundle_title: AWS EC2
description: Release an on-demand dedicated host.
icon:
  integration_id: amazon-ec2
  type: integration_logo
input: '#/$defs/ReleaseHostInputs'
inputFieldOrder:
- region
- hostId
output: '#/$defs/ReleaseHostOutputs'
permissions:
- ec2:ReleaseHosts
source: amazon-ec2
title: Release host
---

Release an on-demand dedicated host.

{{< workflows >}}
