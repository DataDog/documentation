---
bundle: com.datadoghq.dd.dashboard
bundle_title: Datadog Dashboard
description: Restore dashboard with the specified ID.
icon:
  icon_name: Dashboard
  type: icon
input: '#/$defs/RestoreDashboardInputs'
inputFieldOrder:
- dashboardId
keywords:
- reboot
- restart
- restore
output: '#/$defs/RestoreDashboardOutputs'
source: _datadog
title: Restore dashboard
---

Restore dashboard with the specified ID.

{{< workflows >}}
