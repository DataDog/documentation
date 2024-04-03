---
bundle: com.datadoghq.dd.monitor
bundle_title: Datadog Monitor
description: Get details about the specified monitor from your organization.
icon:
  icon_name: Monitor
  type: icon
input: '#/$defs/GetMonitorInputs'
inputFieldOrder:
- monitor_id
keywords:
- describe
- get
- lookup
output: '#/$defs/GetMonitorOutputs'
source: _datadog
title: Get monitor
---

Get details about the specified monitor from your organization.

{{< workflows >}}
