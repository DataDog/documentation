---
bundle: com.datadoghq.dd.downtime
bundle_title: Datadog Downtime
description: Delete all downtimes that match the scope of `X`.
icon:
  icon_name: Wrench
  type: icon
input: '#/$defs/CancelDowntimesByScopeInputs'
inputFieldOrder:
- scope
keywords:
- deactivate
- disable
- cancel
output: '#/$defs/CancelDowntimesByScopeOutputs'
source: _datadog
title: Cancel downtimes by scope
---

Delete all downtimes that match the scope of `X`.

{{< workflows >}}
