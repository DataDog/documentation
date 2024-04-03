---
bundle: com.datadoghq.dd.dashboard_list
bundle_title: Datadog Dashboard List
description: Update dashboards of an existing dashboard list.
icon:
  icon_name: Dashboard
  type: icon
input: '#/$defs/UpdateDashboardListItemsInputs'
inputFieldOrder:
- dashboard_list_id
- dashboards
keywords:
- modify
- put
- set
- update
output: '#/$defs/UpdateDashboardListItemsOutputs'
source: _datadog
title: Update dashboard list items
---

Update dashboards of an existing dashboard list.

{{< workflows >}}
