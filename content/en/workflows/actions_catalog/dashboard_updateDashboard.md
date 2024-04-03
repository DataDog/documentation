---
bundle: com.datadoghq.dd.dashboard
bundle_title: Datadog Dashboard
description: Update a dashboard using the specified ID.
icon:
  icon_name: Dashboard
  type: icon
input: '#/$defs/UpdateDashboardInputs'
inputFieldOrder:
- dashboard_id
- title
- layout_type
- widgets
- id
- description
- restricted_roles
- url
- created_at
- modified_at
- author_handle
- author_name
- reflow_type
- notify_list
- template_variables
- template_variable_presets
- is_read_only
keywords:
- modify
- put
- set
- update
output: '#/$defs/UpdateDashboardOutputs'
source: _datadog
stability: dev
title: Update dashboard
---

Update a dashboard using the specified ID.

{{< workflows >}}
