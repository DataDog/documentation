---
bundle: com.datadoghq.dd.downtime
bundle_title: Datadog Downtime
description: Get downtime detail by `downtime_id`.
icon:
  icon_name: Wrench
  type: icon
input: '#/$defs/GetDowntimeInputs'
inputFieldOrder:
- downtime_id
keywords:
- describe
- get
- lookup
output: '#/$defs/GetDowntimeOutputs'
source: _datadog
title: Get downtime
---

Get downtime detail by `downtime_id`.

{{< workflows >}}
