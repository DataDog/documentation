---
bundle: com.datadoghq.circleci
bundle_title: CircleCI
description: Returns a sequence of jobs for a workflow.
icon:
  integration_id: circleci
  type: integration_logo
input: '#/$defs/GetWorkflowJobsInputs'
inputFieldOrder:
- workflowId
keywords:
- describe
- get
- lookup
output: '#/$defs/GetWorkflowJobsOutputs'
source: circleci
title: Get workflow jobs
---

Returns a sequence of jobs for a workflow.

{{< workflows >}}
