---
bundle: com.datadoghq.dd.monitor
bundle_title: Datadog Monitor
description: Create a monitor using the specified options.
icon:
  icon_name: Monitor
  type: icon
input: '#/$defs/CreateMonitorInputs'
inputFieldOrder:
- query
- type
- message
- name
- tags
- options
- overall_state
- priority
- restricted_roles
output: '#/$defs/CreateMonitorOutputs'
source: _datadog
stability: dev
title: Create monitor
---

Create a monitor using the specified options.

{{< workflows >}}
