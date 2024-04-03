---
bundle: com.datadoghq.aws.eventbridge
bundle_title: AWS EventBridge
description: Start a replay. Events may not be replayed in the same order they were
  added to the archive. See [StartReplay](https://docs.aws.amazon.com/eventbridge/latest/APIReference/API_StartReplay.html
  "{isExternal}") in the EventBridge documentation for more information.
icon:
  integration_id: amazon-event-bridge
  type: integration_logo
input: '#/$defs/StartReplayInputs'
inputFieldOrder:
- region
- name
- eventSourceArn
- eventTimeRange
- destinationEventBusName
- ruleNamesToApply
- description
output: '#/$defs/StartReplayOutputs'
permissions:
- events:StartReplay
source: amazon-event-bridge
title: Start replay
---

Start a replay. Events may not be replayed in the same order they were added to the archive. See [StartReplay](https://docs.aws.amazon.com/eventbridge/latest/APIReference/API_StartReplay.html "{isExternal}") in the EventBridge documentation for more information.

{{< workflows >}}
