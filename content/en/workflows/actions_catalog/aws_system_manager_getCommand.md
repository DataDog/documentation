---
bundle: com.datadoghq.aws.system_manager
bundle_title: AWS System Manager
description: Get commands requested by users of the Amazon Web Services account.
icon:
  integration_id: amazon-ssm
  type: integration_logo
input: '#/$defs/GetCommandInputs'
inputFieldOrder:
- region
- commandId
keywords:
- describe
- get
- lookup
output: '#/$defs/GetCommandOutputs'
permissions:
- ssm:ListCommands
source: amazon-ssm
title: Get command
---

Get commands requested by users of the Amazon Web Services account.

{{< workflows >}}
