---
bundle: com.datadoghq.gitlab
bundle_title: GitLab
description: Get a list of merge request reviewers
icon:
  integration_id: gitlab
  type: integration_logo
input: '#/$defs/GetMergeRequestReviewersInputs'
inputFieldOrder:
- projectId
- mergeRequestIid
keywords:
- describe
- get
- lookup
output: '#/$defs/GetMergeRequestReviewersOutputs'
source: gitlab
title: List merge request reviewers
---

Get a list of merge request reviewers

{{< workflows >}}
