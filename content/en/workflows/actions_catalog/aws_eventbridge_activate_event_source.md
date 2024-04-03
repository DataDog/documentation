---
bundle: com.datadoghq.aws.eventbridge
bundle_title: AWS EventBridge
description: Activate a partner event source that was previously deactivated. Once
  activated, the matching event bus starts receiving events from the event source.
icon:
  integration_id: amazon-event-bridge
  type: integration_logo
input: '#/$defs/ActivateEventSourceInputs'
inputFieldOrder:
- region
- name
output: '#/$defs/ActivateEventSourceOutputs'
permissions:
- events:ActivateEventSource
source: amazon-event-bridge
title: Activate event source
---

Activate a partner event source that was previously deactivated. Once activated, the matching event bus starts receiving events from the event source.

{{< workflows >}}
