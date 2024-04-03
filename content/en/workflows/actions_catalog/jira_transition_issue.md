---
bundle: com.datadoghq.jira
bundle_title: Jira
description: Perform a transition on an issue. When performing the transition you
  can update or set other issue fields.
icon:
  integration_id: jira-software
  type: integration_logo
input: '#/$defs/TransitionIssueInputs'
inputFieldOrder:
- accountId
- issueKey
- newStatus
output: '#/$defs/TransitionIssueOutputs'
source: jira-software
title: Transition issue
---

Perform a transition on an issue. When performing the transition you can update or set other issue fields.

{{< workflows >}}
