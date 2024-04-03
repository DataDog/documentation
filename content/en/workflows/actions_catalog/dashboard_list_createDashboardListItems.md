---
bundle: com.datadoghq.dd.dashboard_list
bundle_title: Datadog Dashboard List
description: Add dashboards to an existing dashboard list.
icon:
  icon_name: Dashboard
  type: icon
input: '#/$defs/CreateDashboardListItemsInputs'
inputFieldOrder:
- dashboard_list_id
- dashboards
output: '#/$defs/CreateDashboardListItemsOutputs'
source: _datadog
title: Create dashboard list items
---

Add dashboards to an existing dashboard list.

{{< workflows >}}
