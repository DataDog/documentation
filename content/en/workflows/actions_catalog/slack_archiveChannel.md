---
bundle: com.datadoghq.slack
bundle_title: Slack
description: Archive a channel.
icon:
  integration_id: slack
  type: integration_logo
input: '#/$defs/ArchiveChannelInputs'
inputFieldOrder:
- teamId
- channel
output: '#/$defs/ArchiveChannelOutputs'
source: slack
title: Archive channel
---

Archive a channel.

{{< workflows >}}
