---
bundle: com.datadoghq.dd.dashboard
bundle_title: Datadog Dashboard
description: Get a dashboard with widgets using the specified ID.
icon:
  icon_name: Dashboard
  type: icon
input: '#/$defs/GetDashboardInputs'
inputFieldOrder:
- dashboard_id
keywords:
- describe
- get
- lookup
output: '#/$defs/GetDashboardOutputs'
source: _datadog
title: Get dashboard details
---

Get a dashboard with widgets using the specified ID.

{{< workflows >}}
