---
title: Graphing Primer using JSON
kind: documentation
aliases:
  - /graphingjson/
  - /graphing/miscellaneous/graphingjson
  - /graphing/graphing_json
---

There are two ways to interact with the Graphing Editor: using the GUI or  writing JSON directly with the *JSON* tab. This page covers using JSON. To learn more about the GUI editor, visit the main [Graphing Primer Page][1]

{{< img src="graphing/graphing_json/references-graphing-jsoneditor.png" alt="references graphing jsoneditor" responsive="true" style="width:80%;">}}


## Dashboard schema

```
DASHBOARD_SCHEMA = {
    "type": "object",
    "properties": {
        # Title of the dashboard
        "title": {"type": "string"},
        # Description of the dashboard
        "description": {"type": "string"},
        # Layout type of the dashboard (for now, only "ordered" layout - current timeboard layout - is supported)
        "layout_type": {"enum": ["ordered"]},
        # Whether this dashboard is read-only. If True, only the author and admins can make changes to it.
        "is_read_only": {"type": "boolean"},
        # List of template variables for this dashboard
        "template_variables": {"type": "array", "items": TEMPLATE_VARIABLE_SCHEMA},
        # List of handles of users to notify when changes are made to this dashboard
        "notify_list": {"type": "array", "items": {"type": "string"}},
        # List of widgets to display on the dashboard
        "widgets": {
            "type": "array",
            "items": WIDGET_SCHEMA
        }
    },
    "required": ["title", "layout_type", "widgets"],
    "additionalProperties": False
}
```


## Template variable schema

```
TEMPLATE_VARIABLE_SCHEMA = {
    "type": "object",
    "properties": {
        "name": {"type": "string"},
        "default": {"type": "string"},
        "prefix": {"type": "string"},
    },
    "additionalProperties": False,
    "required": ["name"]
}
```

[1]: /graphing/
