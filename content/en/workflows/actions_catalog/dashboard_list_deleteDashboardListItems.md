---
bundle: com.datadoghq.dd.dashboard_list
bundle_title: Datadog Dashboard List
description: Delete dashboards from an existing dashboard list.
icon:
  icon_name: Dashboard
  type: icon
input: '#/$defs/DeleteDashboardListItemsInputs'
inputFieldOrder:
- dashboard_list_id
- dashboards
keywords:
- delete
- remove
output: '#/$defs/DeleteDashboardListItemsOutputs'
source: _datadog
title: Delete dashboard list items
---

Delete dashboards from an existing dashboard list.

{{< workflows >}}
