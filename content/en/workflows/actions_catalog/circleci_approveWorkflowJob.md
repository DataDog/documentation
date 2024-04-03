---
bundle: com.datadoghq.circleci
bundle_title: CircleCI
description: Approves a pending approval job in a workflow.
icon:
  integration_id: circleci
  type: integration_logo
input: '#/$defs/ApproveWorkflowJobInputs'
inputFieldOrder:
- workflowId
- approvalRequestId
output: '#/$defs/ApproveWorkflowJobOutputs'
source: circleci
title: Approve workflow job
---

Approves a pending approval job in a workflow.

{{< workflows >}}
