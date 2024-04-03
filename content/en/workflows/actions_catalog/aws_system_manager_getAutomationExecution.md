---
bundle: com.datadoghq.aws.system_manager
bundle_title: AWS System Manager
description: Get detailed information about an automation execution.
icon:
  integration_id: amazon-ssm
  type: integration_logo
input: '#/$defs/GetAutomationExecutionInputs'
inputFieldOrder:
- region
- automationExecutionId
keywords:
- describe
- get
- lookup
output: '#/$defs/GetAutomationExecutionOutputs'
permissions:
- ssm:GetAutomationExecution
source: amazon-ssm
title: Get automation execution
---

Get detailed information about an automation execution.

{{< workflows >}}
