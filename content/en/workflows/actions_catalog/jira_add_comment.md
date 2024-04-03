---
bundle: com.datadoghq.jira
bundle_title: Jira
description: Adds a new comment to an issue.
icon:
  integration_id: jira-software
  type: integration_logo
input: '#/$defs/AddCommentInputs'
inputFieldOrder:
- accountId
- issueKey
- comment
output: '#/$defs/AddCommentOutputs'
source: jira-software
title: Add comment
---

Adds a new comment to an issue.

{{< workflows >}}
