---
bundle: com.datadoghq.github.actions
bundle_title: GitHub Actions
description: Get a specified run of a github actions workflow
icon:
  integration_id: github-actions
  type: integration_logo
input: '#/$defs/GetWorkflowRunInputs'
inputFieldOrder:
- runId
- repository
keywords:
- describe
- get
- lookup
output: '#/$defs/GetWorkflowRunOutputs'
source: github-actions
title: Get github actions workflow run
---

Get a specified run of a github actions workflow

{{< workflows >}}
