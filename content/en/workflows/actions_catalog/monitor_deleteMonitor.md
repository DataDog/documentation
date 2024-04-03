---
bundle: com.datadoghq.dd.monitor
bundle_title: Datadog Monitor
description: Delete the specified monitor.
icon:
  icon_name: Monitor
  type: icon
input: '#/$defs/DeleteMonitorInputs'
inputFieldOrder:
- monitor_id
keywords:
- delete
- remove
output: '#/$defs/DeleteMonitorOutputs'
source: _datadog
title: Delete monitor
---

Delete the specified monitor.

{{< workflows >}}
