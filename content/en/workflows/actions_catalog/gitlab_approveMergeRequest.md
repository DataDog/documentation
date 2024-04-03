---
bundle: com.datadoghq.gitlab
bundle_title: GitLab
icon:
  integration_id: gitlab
  type: integration_logo
input: '#/$defs/ApproveMergeRequestInputs'
inputFieldOrder:
- projectId
- mergeRequestIid
- sha
output: '#/$defs/ApproveMergeRequestOutputs'
source: gitlab
title: Approve merge request
---



{{< workflows >}}
