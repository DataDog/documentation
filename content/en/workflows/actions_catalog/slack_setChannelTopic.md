---
bundle: com.datadoghq.slack
bundle_title: Slack
description: Set the topic of a channel.
icon:
  integration_id: slack
  type: integration_logo
input: '#/$defs/SetChannelTopicInputs'
inputFieldOrder:
- teamId
- channel
- topic
keywords:
- modify
- put
- set
- update
output: '#/$defs/SetChannelTopicOutputs'
source: slack
title: Set channel topic
---

Set the topic of a channel.

{{< workflows >}}
