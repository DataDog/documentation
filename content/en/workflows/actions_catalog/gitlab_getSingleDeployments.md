---
bundle: com.datadoghq.gitlab
bundle_title: GitLab
description: Get a specific deployment
icon:
  integration_id: gitlab
  type: integration_logo
input: '#/$defs/GetSingleDeploymentInputs'
inputFieldOrder:
- projectId
- deploymentId
keywords:
- describe
- get
- lookup
output: '#/$defs/GetSingleDeploymentOutputs'
source: gitlab
title: Get deployment
---

Get a specific deployment

{{< workflows >}}
