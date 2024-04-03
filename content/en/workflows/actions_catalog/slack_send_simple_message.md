---
bundle: com.datadoghq.slack
bundle_title: Slack
description: Sends a simple fire-and-forget Slack message containing plain text.
hideCompletionGate: true
icon:
  integration_id: slack
  type: integration_logo
input: '#/$defs/SendMessageInputs'
inputFieldOrder:
- channel
- teamId
- text
- mentionTargets
- header
output: '#/$defs/SendMessageOutputs'
source: slack
title: Send message
---

Sends a simple fire-and-forget Slack message containing plain text.

{{< workflows >}}
