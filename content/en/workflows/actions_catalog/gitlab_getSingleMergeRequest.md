---
bundle: com.datadoghq.gitlab
bundle_title: GitLab
description: Shows information about a single merge request.
icon:
  integration_id: gitlab
  type: integration_logo
input: '#/$defs/GetSingleMergeRequestInputs'
inputFieldOrder:
- projectId
- mergeRequestIid
- includeDivergedCommitsCount
- includeRebaseInProgress
- renderHtml
keywords:
- describe
- get
- lookup
output: '#/$defs/GetSingleMergeRequestOutputs'
source: gitlab
title: Get merge request
---

Shows information about a single merge request.

{{< workflows >}}
