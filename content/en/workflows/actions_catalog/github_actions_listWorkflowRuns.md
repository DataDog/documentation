---
bundle: com.datadoghq.github.actions
bundle_title: GitHub Actions
description: Lists runs for a specified github actions workflow
icon:
  integration_id: github-actions
  type: integration_logo
input: '#/$defs/ListWorkflowRunsInputs'
inputFieldOrder:
- workflowId
- repository
keywords:
- all
- list
output: '#/$defs/ListWorkflowRunsOutputs'
source: github-actions
title: List github actions workflow runs
---

Lists runs for a specified github actions workflow

{{< workflows >}}
