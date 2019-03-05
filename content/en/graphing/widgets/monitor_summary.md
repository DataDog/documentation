---
title: Monitor Summary Widget
kind: documentation
description: "Display a summary view of all your Datadog monitors, or a subset based on a query."
further_reading:
- link: "graphing/dashboards/screenboard/"
  tag: "Documentation"
  text: "Screenboard"
- link: "graphing/graphing_json/"
  tag: "Documentation"
  text: "Building Dashboard using JSON"
---

The monitor summary widget displays a summary view of all your Datadog monitors, or a subset based on a query.

{{< img src="graphing/widgets/monitor_summary/monitor_summary.png" alt="monitor summary " responsive="true">}}

## Setup

{{< img src="graphing/widgets/monitor_summary/monitor_summary_setup.png" alt="monitor summary setup" responsive="true" style="width:80%;">}}

### Configuration

1. Enter a [monitor query][1] to display the monitor summary widget over a subset of your monitors.
2. Choose to display only the `count` of monitors per monitor status type, the full `list` of monitors, or `both`.

## Options
#### Title

Display a custom title for your widget by activating the `Show a Title` check box:

{{< img src="graphing/widgets/options/title.png" alt="Widget title" responsive="true" style="width:80%;">}}

Optionally define its size and alignment.

## API

The dedicated [widget JSON schema definition][2] for the monitor summary widget is:

```
MANAGE_STATUS_SCHEMA = {
    "type": "object",
    "properties": {
        "type": {"enum": ["manage_status"]},
        "query": {"type": "string"},
        "display_format": {"enum": ["counts", "countsAndList", "list"]},
        "color_preference": {"enum": ["background", "text"]},
        "hide_zero_counts": {"type": "boolean"},
        "title": {"type": "string"},
        "title_size": {"type": "string"},
        "title_align": {"enum": ["center", "left", "right"]}
    },
    "required": ["type", "query"],
    "additionalProperties": false
}
```

| Parameter  | Type            | Required | Description                                                                                                                                                  |
| ------     | -----           | -----    | -----                                                                                                                                                        |
| `type`| string|yes|Type of the widget, for the monitor summary widget use `manage_status`|
|`query`|string|yes|Query to filter the monitors with|
|`display_format`|string|no|What to display on the widget. Available values are: `counts`, `countsAndList` or `list`
|`color_preference`|string|no|Which color to use on the widget. Available values are:`background` or `text`
|`hide_zero_counts`|boolean|no|Whether to show counts of 0 or not|
|`title`|string|no|Title of the widget|
|`title_size`|string|no|Size of the title|
|`title_align`|string|no|How to align the title. Available values are: `center`, `left` or `right`


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /monitors/manage_monitor
[2]: /graphing/graphing_json/widget_json
