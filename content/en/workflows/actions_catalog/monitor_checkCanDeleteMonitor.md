---
bundle: com.datadoghq.dd.monitor
bundle_title: Datadog Monitor
description: Check if the given monitors can be deleted.
icon:
  icon_name: Monitor
  type: icon
input: '#/$defs/CheckCanDeleteMonitorInputs'
inputFieldOrder:
- monitorId
output: '#/$defs/CheckCanDeleteMonitorOutputs'
source: _datadog
title: Check can delete monitor
---

Check if the given monitors can be deleted.

{{< workflows >}}
