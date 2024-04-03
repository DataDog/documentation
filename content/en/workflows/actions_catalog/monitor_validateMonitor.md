---
bundle: com.datadoghq.dd.monitor
bundle_title: Datadog Monitor
description: Validate the monitor provided in the request.
icon:
  icon_name: Monitor
  type: icon
input: '#/$defs/ValidateMonitorInputs'
inputFieldOrder:
- query
- type
- message
- name
- tags
- options
- priority
- restricted_roles
output: '#/$defs/ValidateMonitorOutputs'
source: _datadog
stability: dev
title: Validate monitor
---

Validate the monitor provided in the request.

{{< workflows >}}
