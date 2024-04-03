---
bundle: com.datadoghq.dd.dashboard_list
bundle_title: Datadog Dashboard List
description: "Fetch the dashboard list\u2019s dashboard definitions."
icon:
  icon_name: Dashboard
  type: icon
input: '#/$defs/GetDashboardListItemsInputs'
inputFieldOrder:
- dashboard_list_id
keywords:
- describe
- get
- lookup
output: '#/$defs/GetDashboardListItemsOutputs'
source: _datadog
title: Get dashboard list items
---

Fetch the dashboard list’s dashboard definitions.

{{< workflows >}}
