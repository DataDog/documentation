---
bundle: com.datadoghq.dd.events
bundle_title: Datadog Events
description: The event stream can be queried and filtered by time, priority, sources
  and tags. Returns up to 1000 events.
icon:
  icon_name: Events
  type: icon
input: '#/$defs/ListEventsInputs'
inputFieldOrder:
- time
- priority
- sources
- tags
- unaggregated
- exclude_aggregate
keywords:
- all
- list
output: '#/$defs/ListEventsOutputs'
source: _datadog
title: List events
---

The event stream can be queried and filtered by time, priority, sources and tags. Returns up to 1000 events.

{{< workflows >}}
