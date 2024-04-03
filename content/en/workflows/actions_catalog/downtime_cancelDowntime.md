---
bundle: com.datadoghq.dd.downtime
bundle_title: Datadog Downtime
description: Cancel a downtime.
icon:
  icon_name: Wrench
  type: icon
input: '#/$defs/CancelDowntimeInputs'
inputFieldOrder:
- downtime_id
keywords:
- deactivate
- disable
- cancel
output: '#/$defs/CancelDowntimeOutputs'
source: _datadog
title: Cancel downtime
---

Cancel a downtime.

{{< workflows >}}
