---
bundle: com.datadoghq.dd.dashboard
bundle_title: Datadog Dashboard
description: Get a dashboard using the specified ID.
icon:
  icon_name: Dashboard
  type: icon
input: '#/$defs/GetDashboardWithoutWidgetsInputs'
inputFieldOrder:
- dashboard_id
- templateVariables
keywords:
- describe
- get
- lookup
output: '#/$defs/GetDashboardWithoutWidgetsOutputs'
source: _datadog
title: Get dashboard
---

Get a dashboard using the specified ID.

{{< workflows >}}
