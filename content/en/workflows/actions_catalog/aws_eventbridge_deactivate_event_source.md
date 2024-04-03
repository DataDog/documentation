---
bundle: com.datadoghq.aws.eventbridge
bundle_title: AWS EventBridge
description: Temporarily stop receiving events from a partner event source. The matching
  event bus is not deleted. When you deactivate a partner event source, the source
  goes into `PENDING` state. If it remains in `PENDING` state for more than two weeks,
  it is deleted. To activate a deactivated partner event source, use `ActivateEventSource`.
icon:
  integration_id: amazon-event-bridge
  type: integration_logo
input: '#/$defs/DeactivateEventSourceInputs'
inputFieldOrder:
- region
- name
keywords:
- deactivate
- disable
- cancel
output: '#/$defs/DeactivateEventSourceOutputs'
permissions:
- events:DeactivateEventSource
source: amazon-event-bridge
title: Deactivate event source
---

Temporarily stop receiving events from a partner event source. The matching event bus is not deleted. When you deactivate a partner event source, the source goes into `PENDING` state. If it remains in `PENDING` state for more than two weeks, it is deleted. To activate a deactivated partner event source, use `ActivateEventSource`.

{{< workflows >}}
