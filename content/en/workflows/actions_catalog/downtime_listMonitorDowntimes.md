---
bundle: com.datadoghq.dd.downtime
bundle_title: Datadog Downtime
description: Get all active downtimes for the specified monitor.
icon:
  icon_name: Wrench
  type: icon
input: '#/$defs/ListMonitorDowntimesInputs'
inputFieldOrder:
- monitor_id
keywords:
- all
- list
output: '#/$defs/ListMonitorDowntimesOutputs'
source: _datadog
title: List monitor downtimes
---

Get all active downtimes for the specified monitor.

{{< workflows >}}
