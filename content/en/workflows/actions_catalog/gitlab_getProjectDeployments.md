---
bundle: com.datadoghq.gitlab
bundle_title: GitLab
description: Get a list of deployments in a project.
icon:
  integration_id: gitlab
  type: integration_logo
input: '#/$defs/GetProjectDeploymentsInputs'
inputFieldOrder:
- projectId
- environment
- status
keywords:
- describe
- get
- lookup
output: '#/$defs/GetProjectDeploymentsOutputs'
source: gitlab
title: List project deployments
---

Get a list of deployments in a project.

{{< workflows >}}
