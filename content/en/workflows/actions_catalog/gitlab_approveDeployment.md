---
bundle: com.datadoghq.gitlab
bundle_title: GitLab
description: Approve or reject a blocked deployment
icon:
  integration_id: gitlab
  type: integration_logo
input: '#/$defs/ApproveDeploymentInputs'
inputFieldOrder:
- projectId
- deploymentId
- status
- comment
- representedAs
output: '#/$defs/ApproveDeploymentOutputs'
source: gitlab
stability: dev
title: Approve deployment
---

Approve or reject a blocked deployment

{{< workflows >}}
