---
bundle: com.datadoghq.dd.monitor
bundle_title: Datadog Monitor
description: Clone the specified monitor.
icon:
  icon_name: Monitor
  type: icon
input: '#/$defs/CloneMonitorInputs'
inputFieldOrder:
- monitorId
- name
keywords:
- clone
- duplicate
output: '#/$defs/CloneMonitorOutputs'
source: _datadog
title: Clone monitor
---

Clone the specified monitor.

{{< workflows >}}
