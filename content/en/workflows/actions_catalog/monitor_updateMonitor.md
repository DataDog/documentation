---
bundle: com.datadoghq.dd.monitor
bundle_title: Datadog Monitor
description: Edit the specified monitor.
icon:
  icon_name: Monitor
  type: icon
input: '#/$defs/UpdateMonitorInputs'
inputFieldOrder:
- monitor_id
- message
- name
- tags
- options
- query
- type
- priority
- restricted_roles
keywords:
- modify
- put
- set
- update
output: '#/$defs/UpdateMonitorOutputs'
source: _datadog
stability: dev
title: Update monitor
---

Edit the specified monitor.

{{< workflows >}}
