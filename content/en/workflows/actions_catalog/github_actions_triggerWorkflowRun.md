---
bundle: com.datadoghq.github.actions
bundle_title: GitHub Actions
description: Manually trigger a Github Actions workflow run. You must configure your
  GitHub Actions workflow to run when the workflow_dispatch webhook event occurs.
icon:
  integration_id: github-actions
  type: integration_logo
input: '#/$defs/TriggerWorkflowRunInputs'
inputFieldOrder:
- workflowId
- repository
- ref
- inputs
output: '#/$defs/TriggerWorkflowRunOutputs'
source: github-actions
title: Trigger github actions workflow run
---

Manually trigger a Github Actions workflow run. You must configure your GitHub Actions workflow to run when the workflow_dispatch webhook event occurs.

{{< workflows >}}
