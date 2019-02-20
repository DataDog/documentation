---
title: Graphing Dashboard using JSON
kind: documentation
aliases:
  - /graphingjson/
  - /graphing/miscellaneous/graphingjson
  - /graphing/graphing_json
---

If you query a [Datadog timeboard][1] though the [Dashboard API][2] the result should be a JSON object with the following layout:

```
{
    "title": "<DASHBOARD_TITLE>",
    "description": "<DASHBOARD_DESCRIPTION>",
    "layout_type": "ordered",
    "is_read_only": <READ_ONLY>,
    "template_variables": [
        {
            <TEMPLATE_VARIABLE_SCHEMA>
        }
    ],
    "notify_list": ["<DATADOG_HANDLE>"]
    "widgets": [
        {
            <WIDGET_SCHEMA>
        }
    ]
}
```

| Parameter            | Type             | Description                                                                                                                                                                         |
| ------               | -----            | --------                                                                                                                                                                            |
| `title`              | string           | Title of your Dashboard.                                                                                                                                                            |
| `description`        | string           | Description of the dashboard.                                                                                                                                                       |
| `layout_type`        | enum             | Layout type of the dashboard only `ordered` layout is supported                                                                                                                     |
| `is_read_only`       | boolean          | Whether this dashboard is read-only. If `true`, only the dashboard author and administrators can apply changes to it.                                                               |
| `template_variables` | array of object  | List of template variables for this dashboard. See [the template variable schema documentation](#template-variable-schema) to learn more                                            |
| `notify_list`        | array of strings | List of handles of users to notify when changes are made to this dashboard.                                                                                                         |
| `widgets`            | array of object  | List of widgets to display on the dashboard. See the dedicated [Widget JSON schema documentation][3] to learn how to build the `<WIDGET_SCHEMA>`. |



## Template variable schema

Dashboard template variables apply a new scope to one or more graphs on your dashboard, allowing you to dynamically explore metrics across different sets of tags by using variables instead of specific tags, to configure them through the Dashboard API use the following layout:

```
{
    "template_variables": [
        {
            "name": "<TV_NAME>",
            "default": "<TV_DEFAULT_VALUE>",
            "prefix": "<TV_PREFIX>",
        }
    ]
}
```

| Parameter | Type   | Description                               |
| ------    | -----  | --------                                  |
| `name`    | string | Name of your template variable.           |
| `default` | string | Default value for your template variable. |
| `prefix`  | string |                                           |

[Learn more about template variable in the Datadog UI][4].

[1]: /graphing/dashboards/timboard
[2]: /api/#dashboards
[3]: /graphing/graphing_json/widget_json
[4]: /graphing/dashboards/template_variables
