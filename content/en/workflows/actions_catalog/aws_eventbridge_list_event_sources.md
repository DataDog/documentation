---
bundle: com.datadoghq.aws.eventbridge
bundle_title: AWS EventBridge
description: List all the partner event sources that have been shared with your AWS
  account. For more information about partner event sources, see [CreateEventBus](https://docs.aws.amazon.com/eventbridge/latest/APIReference/API_CreateEventBus.html
  "{isExternal}") in the EventBridge documentation.
icon:
  integration_id: amazon-event-bridge
  type: integration_logo
input: '#/$defs/ListEventSourcesInputs'
inputFieldOrder:
- region
- namePrefix
- limit
keywords:
- all
- list
output: '#/$defs/ListEventSourcesOutputs'
permissions:
- events:ListEventSources
source: amazon-event-bridge
title: List event source
---

List all the partner event sources that have been shared with your AWS account. For more information about partner event sources, see [CreateEventBus](https://docs.aws.amazon.com/eventbridge/latest/APIReference/API_CreateEventBus.html "{isExternal}") in the EventBridge documentation.

{{< workflows >}}
