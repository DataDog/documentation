---
bundle: com.datadoghq.dd.monitor
bundle_title: Datadog Monitor
description: Get details about the specified monitor from your organization.
icon:
  icon_name: Monitor
  type: icon
input: '#/$defs/ListMonitorsInputs'
inputFieldOrder:
- name
- tags
- monitor_tags
- with_downtimes
- limit
keywords:
- all
- list
output: '#/$defs/ListMonitorsOutputs'
source: _datadog
title: List monitors
---

Get details about the specified monitor from your organization.

{{< workflows >}}
