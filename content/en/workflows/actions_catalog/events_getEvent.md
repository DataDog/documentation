---
bundle: com.datadoghq.dd.events
bundle_title: Datadog Events
description: This endpoint allows you to query for event details.
icon:
  icon_name: Events
  type: icon
input: '#/$defs/GetEventInputs'
inputFieldOrder:
- event_id
keywords:
- describe
- get
- lookup
output: '#/$defs/GetEventOutputs'
source: _datadog
title: Get event
---

This endpoint allows you to query for event details.

{{< workflows >}}
