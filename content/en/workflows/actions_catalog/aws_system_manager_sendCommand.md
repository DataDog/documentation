---
bundle: com.datadoghq.aws.system_manager
bundle_title: AWS System Manager
description: Run commands on one or more managed nodes.
icon:
  integration_id: amazon-ssm
  type: integration_logo
input: '#/$defs/SendCommandInputs'
inputFieldOrder:
- region
- documentName
- instanceIds
- targets
- parameters
- outputS3BucketName
- outputS3KeyPrefix
- maxConcurrency
output: '#/$defs/SendCommandOutputs'
permissions:
- ssm:SendCommand
source: amazon-ssm
title: Send command
---

Run commands on one or more managed nodes.

{{< workflows >}}
