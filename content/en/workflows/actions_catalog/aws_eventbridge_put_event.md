---
bundle: com.datadoghq.aws.eventbridge
bundle_title: AWS EventBridge
description: Send a single event to Amazon EventBridge.
icon:
  integration_id: amazon-event-bridge
  type: integration_logo
input: '#/$defs/PutEventInputs'
inputFieldOrder:
- region
- source
- resources
- detailType
- detail
- eventBusName
- traceHeader
keywords:
- modify
- put
- set
- update
output: '#/$defs/PutEventOutputs'
permissions:
- events:PutEvents
source: amazon-event-bridge
title: Put event
---

Send a single event to Amazon EventBridge.

{{< workflows >}}
