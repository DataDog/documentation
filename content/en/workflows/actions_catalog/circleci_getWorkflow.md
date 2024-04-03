---
bundle: com.datadoghq.circleci
bundle_title: CircleCI
description: Returns summary fields of a workflow by ID.
icon:
  integration_id: circleci
  type: integration_logo
input: '#/$defs/GetWorkflowInputs'
inputFieldOrder:
- workflowId
keywords:
- describe
- get
- lookup
output: '#/$defs/GetWorkflowOutputs'
source: circleci
title: Get workflow
---

Returns summary fields of a workflow by ID.

{{< workflows >}}
