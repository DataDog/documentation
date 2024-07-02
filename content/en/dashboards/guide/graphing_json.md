---
title: Graphing with JSON
aliases:
- /graphingjson/
- /graphing/miscellaneous/graphingjson
- /graphing/graphing_json/
- /dashboards/graphing_json/
- /dashboards/graphing_json/request_json/
- /dashboards/graphing_json/widget_json/
further_reading:
- link: "https://docs.datadoghq.com/api/latest/dashboards/"
  tag: "API"
  text: "Dashboards API"
- link: "/dashboards/widgets/"
  tag: "Documentation"
  text: "Widgets"
---

## Overview

{{< img src="/dashboards/graphing_json/json_editor.png" alt="Configure a timeseries widget with the JSON editor" style="width:100%;" >}}

In addition to the [GUI graph editor][6], you can use the JSON editor in your dashboard widgets to configure your visualizations. The schema displayed in the JSON editor mirrors the request body schema of the Dashboard API. For more information on the JSON parameters and required fields see the [Dashboard API documentation][2]. 

## Widget JSON schema

Find the widget type you want to add to your dashboard and apply the JSON fields listed in the respective documentation. For a full list of widget types, see the [Widget index][7].

### Y-Axis schema

The Datadog y-axis controls allow you to:

*   Clip the y-axis to specific ranges
*   Filter series either by specifying a percentage or an absolute value
*   Change the y-axis scale from linear to log, sqrt, or power scale

### Markers schema

Markers allow you to add visual conditional formatting for your graphs. For example, ALERT, WARNING, or OK.

{{< img src="dashboards/graphing_json/markers.png" alt="Markers" style="width:80%;">}}

## Template variable schema

Dashboard template variables apply a new scope to one or more graphs on your dashboard. This allows you to dynamically explore metrics across different sets of tags by using variables instead of specific tags. Learn more about [template variable in the Datadog UI][4].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /dashboards/#get-started
[2]: /api/v1/dashboards/
[3]: /dashboards/graphing_json/widget_json/
[4]: /dashboards/template_variables/
[6]: /dashboards/querying/#graphing-editor
[7]: /dashboards/widgets/
