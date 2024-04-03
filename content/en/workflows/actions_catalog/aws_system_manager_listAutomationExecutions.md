---
bundle: com.datadoghq.aws.system_manager
bundle_title: AWS System Manager
description: Provide details about all active and terminated automation executions.
icon:
  integration_id: amazon-ssm
  type: integration_logo
input: '#/$defs/ListAutomationExecutionsInputs'
inputFieldOrder:
- region
- filters
keywords:
- all
- list
output: '#/$defs/ListAutomationExecutionsOutputs'
permissions:
- ssm:DescribeAutomationExecutions
source: amazon-ssm
title: List automation executions
---

Provide details about all active and terminated automation executions.

{{< workflows >}}
