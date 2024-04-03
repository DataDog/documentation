---
bundle: com.datadoghq.jira
bundle_title: Jira
description: Returns a full representation of the issue for the given issue key.
icon:
  integration_id: jira-software
  type: integration_logo
input: '#/$defs/GetIssueInputs'
inputFieldOrder:
- accountId
- issueKey
keywords:
- describe
- get
- lookup
output: '#/$defs/GetIssueOutputs'
source: jira-software
title: Get issue
---

Returns a full representation of the issue for the given issue key.

{{< workflows >}}
