---
bundle: com.datadoghq.aws.eventbridge
bundle_title: AWS EventBridge
description: Send custom events to Amazon EventBridge.
icon:
  integration_id: amazon-event-bridge
  type: integration_logo
input: '#/$defs/PutEventsInputs'
inputFieldOrder:
- region
- entries
keywords:
- modify
- put
- set
- update
output: '#/$defs/PutEventsOutputs'
permissions:
- events:PutEvents
source: amazon-event-bridge
title: Put events
---

Send custom events to Amazon EventBridge.

{{< workflows >}}
