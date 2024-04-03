---
bundle: com.datadoghq.aws.system_manager
bundle_title: AWS System Manager
description: Initiate execution of an Automation runbook.
icon:
  integration_id: amazon-ssm
  type: integration_logo
input: '#/$defs/StartAutomationExecutionInputs'
inputFieldOrder:
- region
- documentName
- parameters
- targets
- maxConcurrency
output: '#/$defs/StartAutomationExecutionOutputs'
permissions:
- ssm:StartAutomationExecution
source: amazon-ssm
title: Start automation execution
---

Initiate execution of an Automation runbook.

{{< workflows >}}
