---
bundle: com.datadoghq.dd.dashboard
bundle_title: Datadog Dashboard
description: Delete a dashboard using the specified ID.
icon:
  icon_name: Dashboard
  type: icon
input: '#/$defs/DeleteDashboardInputs'
inputFieldOrder:
- dashboard_id
keywords:
- delete
- remove
output: '#/$defs/DeleteDashboardOutputs'
source: _datadog
title: Delete dashboard
---

Delete a dashboard using the specified ID.

{{< workflows >}}
