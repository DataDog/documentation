---
bundle: com.datadoghq.dd.downtime
bundle_title: Datadog Downtime
description: Get all scheduled downtimes.
icon:
  icon_name: Wrench
  type: icon
input: '#/$defs/ListDowntimesInputs'
inputFieldOrder:
- current_only
keywords:
- all
- list
output: '#/$defs/ListDowntimesOutputs'
source: _datadog
title: List downtimes
---

Get all scheduled downtimes.

{{< workflows >}}
