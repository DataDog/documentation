---
bundle: com.datadoghq.aws.eventbridge
bundle_title: AWS EventBridge
description: List all replays or provide a prefix to match to replay names. Filter
  parameters are exclusive.
icon:
  integration_id: amazon-event-bridge
  type: integration_logo
input: '#/$defs/ListReplaysInputs'
inputFieldOrder:
- region
- eventSourceArn
- limit
- namePrefix
- state
keywords:
- all
- list
output: '#/$defs/ListReplaysOutputs'
permissions:
- events:ListReplays
source: amazon-event-bridge
title: List replays
---

List all replays or provide a prefix to match to replay names. Filter parameters are exclusive.

{{< workflows >}}
