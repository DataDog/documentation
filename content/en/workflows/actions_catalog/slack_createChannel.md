---
bundle: com.datadoghq.slack
bundle_title: Slack
description: Create a slack channel.
icon:
  integration_id: slack
  type: integration_logo
input: '#/$defs/CreateChannelInputs'
inputFieldOrder:
- teamId
- channelName
- isPrivate
output: '#/$defs/CreateChannelOutputs'
source: slack
title: Create channel
---

Create a slack channel.

{{< workflows >}}
