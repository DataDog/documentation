---
bundle: com.datadoghq.aws.eventbridge
bundle_title: AWS EventBridge
description: Cancel a replay.
icon:
  integration_id: amazon-event-bridge
  type: integration_logo
input: '#/$defs/CancelReplayInputs'
inputFieldOrder:
- region
- name
keywords:
- deactivate
- disable
- cancel
output: '#/$defs/CancelReplayOutputs'
permissions:
- events:CancelReplay
source: amazon-event-bridge
title: Cancel replay
---

Cancel a replay.

{{< workflows >}}
