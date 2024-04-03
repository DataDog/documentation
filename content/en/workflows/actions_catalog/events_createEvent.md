---
bundle: com.datadoghq.dd.events
bundle_title: Datadog Events
description: This endpoint allows you to post events to the stream.
icon:
  icon_name: Events
  type: icon
input: '#/$defs/CreateEventInputs'
inputFieldOrder:
- title
- text
- date_happened
- priority
- host
- tags
- alert_type
- aggregation_key
- source_type_name
- related_event_id
- device_name
output: '#/$defs/CreateEventOutputs'
source: _datadog
stability: dev
title: Create event
---

This endpoint allows you to post events to the stream.

{{< workflows >}}
