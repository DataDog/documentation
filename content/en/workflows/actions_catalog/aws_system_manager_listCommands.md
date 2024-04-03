---
bundle: com.datadoghq.aws.system_manager
bundle_title: AWS System Manager
description: List commands requested by users of the Amazon Web Services account.
icon:
  integration_id: amazon-ssm
  type: integration_logo
input: '#/$defs/ListCommandsInputs'
inputFieldOrder:
- region
- instanceId
- filters
keywords:
- all
- list
output: '#/$defs/ListCommandsOutputs'
permissions:
- ssm:ListCommands
source: amazon-ssm
title: List commands
---

List commands requested by users of the Amazon Web Services account.

{{< workflows >}}
