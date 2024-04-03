---
bundle: com.datadoghq.slack
bundle_title: Slack
description: List all members from a given channel.
icon:
  integration_id: slack
  type: integration_logo
input: '#/$defs/ListChannelMembersInputs'
inputFieldOrder:
- teamId
- channel
keywords:
- all
- list
output: '#/$defs/ListChannelMembersOutput'
source: slack
stability: dev
title: List channel members
---

List all members from a given channel.

{{< workflows >}}
