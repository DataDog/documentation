---
bundle: com.datadoghq.slack
bundle_title: Slack
description: Invite users to a channel.
icon:
  integration_id: slack
  type: integration_logo
input: '#/$defs/InviteUsersToChannelInputs'
inputFieldOrder:
- teamId
- channel
- users
output: '#/$defs/InviteUsersToChannelOutputs'
source: slack
title: Invite users to channel
---

Invite users to a channel.

{{< workflows >}}
