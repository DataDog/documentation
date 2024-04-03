---
bundle: com.datadoghq.slack
bundle_title: Slack
description: Add a bookmark to a channel.
icon:
  integration_id: slack
  type: integration_logo
input: '#/$defs/AddBookmarkToChannelInputs'
inputFieldOrder:
- teamId
- channel
- title
- url
output: '#/$defs/AddBookmarkToChannelOutputs'
source: slack
stability: dev
title: Add bookmark to channel
---

Add a bookmark to a channel.

{{< workflows >}}
