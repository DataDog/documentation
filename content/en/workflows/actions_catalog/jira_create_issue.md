---
bundle: com.datadoghq.jira
bundle_title: Jira
description: Creates an issue or a sub-task.
icon:
  integration_id: jira-software
  type: integration_logo
input: '#/$defs/CreateIssueInputs'
inputFieldOrder:
- accountId
- summary
- projectId
- projectKey
- issueTypeId
- issueTypeName
- description
- priorityId
- priorityName
output: '#/$defs/CreateIssueOutputs'
source: jira-software
title: Create issue
---

Creates an issue or a sub-task.

{{< workflows >}}
