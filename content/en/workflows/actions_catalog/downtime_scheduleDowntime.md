---
bundle: com.datadoghq.dd.downtime
bundle_title: Datadog Downtime
description: Schedule a downtime.
icon:
  icon_name: Wrench
  type: icon
input: '#/$defs/ScheduleDowntimeInputs'
inputFieldOrder:
- scope
- duration_seconds
- message
- monitor_id
- monitor_tags
- mute_first_recovery_notification
output: '#/$defs/ScheduleDowntimeOutputs'
source: _datadog
title: Schedule downtime
---

Schedule a downtime.

{{< workflows >}}
