---
bundle: com.datadoghq.dd.monitor
bundle_title: Datadog Monitor
description: Mute the specified monitor.
icon:
  icon_name: Monitor
  type: icon
input: '#/$defs/MuteMonitorInputs'
inputFieldOrder:
- monitorId
- duration
output: '#/$defs/MuteMonitorOutputs'
source: _datadog
title: Mute monitor
---

Mute the specified monitor.

{{< workflows >}}
