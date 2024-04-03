---
bundle: com.datadoghq.dd.dashboard
bundle_title: Datadog Dashboard
description: Clones the specified dashboard.
icon:
  icon_name: Dashboard
  type: icon
input: '#/$defs/CloneDashboardInputs'
inputFieldOrder:
- dashboardId
- title
- description
keywords:
- clone
- duplicate
output: '#/$defs/CloneDashboardOuputs'
source: _datadog
title: Clone dashboard
---

Clones the specified dashboard.

{{< workflows >}}
