---
bundle: com.datadoghq.dd.dashboard
bundle_title: Datadog Dashboard
description: Create a dashboard using the specified options.
icon:
  icon_name: Dashboard
  type: icon
input: '#/$defs/CreateDashboardInputs'
inputFieldOrder:
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
output: '#/$defs/CreateDashboardOutputs'
source: _datadog
stability: dev
title: Create dashboard
---

Create a dashboard using the specified options.

{{< workflows >}}
