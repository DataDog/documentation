---
bundle: com.datadoghq.slack
bundle_title: Slack
description: Sends a Slack message with a list of options, and waits for someone to
  select an option before proceeding. Workflow execution flow will branch out depending
  on the user's decision.
hideCompletionGate: true
icon:
  integration_id: slack
  type: integration_logo
input: '#/$defs/SendInteractiveMessageInputs'
inputFieldOrder:
- channel
- promptText
- teamId
- mentionTargets
- actionChoices
- header
- timeoutHours
outbound_branching:
  jsonpath_expression: $.actionChoices.*.outboundBranch
  type: jsonpath
output: '#/$defs/SendInteractiveMessageOutputs'
source: slack
title: Make a decision
---

Sends a Slack message with a list of options, and waits for someone to select an option before proceeding. Workflow execution flow will branch out depending on the user's decision.

{{< workflows >}}
