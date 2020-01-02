---
title: Monitor Summary Widget
kind: documentation
description: "Display a summary view of all your Datadog monitors, or a subset based on a query."
aliases:
    - /graphing/widgets/monitor_summary/
further_reading:
- link: "graphing/dashboards/screenboard/"
  tag: "Documentation"
  text: "Screenboard"
- link: "graphing/graphing_json/"
  tag: "Documentation"
  text: "Building Dashboard using JSON"
---

The monitor summary widget displays a summary view of all your Datadog monitors, or a subset based on a query.

{{< img src="graphing/widgets/monitor_summary/monitor-summary-overview.png" alt="monitor summary" >}}

## Setup

{{< img src="graphing/widgets/monitor_summary/monitor-summary-setup.png" alt="monitor summary setup"  style="width:80%;">}}

### Configuration

1. Select one of the three summary types: `Monitor`, `Group` or `Combined`
    - The `Monitor` summary type lists statuses and names of monitors matching the [monitor query][1]. Multi-alert monitors have only one row in the results list and their status is the multi-alert monitor’s overall status. The Status Counts are the number of matching monitors with each status type.

    {{< img src="graphing/widgets/monitor_summary/monitor_summary_type.png" alt="monitor summary type"  style="width:80%;">}}

    - The `Group` summary type lists statuses, names, and groups of monitors matching the monitor query. Multi-alert monitors are broken into several rows in the results list and correspond to each group and that group’s specific status in the multi-alert monitor. The `Group` summary type also supports `group` and `group_status` facets in its monitor query similar to the [Triggered Monitors page][2]. The Status Counts are the number of matching monitor groups with each status type.

    {{< img src="graphing/widgets/monitor_summary/group_summary_type.png" alt="group summary type"  style="width:80%;">}}

    - The `Combined` summary type lists the number of group statuses and names of the monitors matching the monitor query. Multi-alert monitors have only one row in the results list like in the `Monitor` summary type but the groups column displays the number of groups in each status type instead of the monitor’s overall status. Similar to the `Group` summary type, the `Combined` summary type also supports the `group` and `group_status` facets in its monitor query. The Status Counts still show the count of overall monitor statuses like in the `Monitor` summary type.

    {{< img src="graphing/widgets/monitor_summary/combined_summary_type.png" alt="combined summary type"  style="width:80%;">}}

2. Enter a monitor query to display the monitor summary widget over a subset of your monitors.
    - If you have template variables created in your dashboard and wish to include them in your monitor query, type the dollar sign `$` in the search bar followed by the name of the template variable. When `$` is typed in the search bar, an autocomplete list of the template variables available in your current dashboard appears for you to select your desired template variable.

    **Note** In addition to the facets listed in the link above, the `Group` and `Combined` summary types also support the `group` and `group_status` facets for group-level searching, similar to the [Triggered Monitors page][2].

## Options
#### Display preferences

Choose to show only the `Count` of monitors per monitor status type, a `List` of monitors, or `Both`. The `Text` and `Background` options specify whether the status colors should be applied to the text or background of the Status Counts. The `Hide empty Status Counts` option, when enabled, only shows the Status Counts for statuses that have more than zero monitors in the result list.

{{< img src="graphing/widgets/monitor_summary/display-preferences.png" alt="display preferences"  style="width:80%;">}}

Selecting the `Show triggered column` option filters the results to monitors or monitor groups that are in a triggered state (`Alert`, `Warn`, or `No Data`) and sorts them from most recently triggered to least recently triggered. An additional column is added indicating the amount of time that has elapsed since the monitor/group last triggered.

{{< img src="graphing/widgets/monitor_summary/monitor-summary.png" alt="display preferences"  style="width:80%;">}}

#### Title

Display a custom title for your widget by checking the `Show a title` check box:

{{< img src="graphing/widgets/monitor_summary/widget_title.png" alt="widget title"  style="width:80%;">}}

You can optionally define the title’s size and alignment.

## API

The dedicated [widget JSON schema definition][3] for the monitor summary widget is:

```
MANAGE_STATUS_SCHEMA = {
    "type": "object",
    "properties": {
        "type": {"enum": ["manage_status"]},
        "query": {"type": "string"},
        "summary_type": {"enum": ["monitors", "groups", "combined"]},
        "display_format": {"enum": ["counts", "countsAndList", "list"]},
        "color_preference": {"enum": ["background", "text"]},
        "hide_zero_counts": {"type": "boolean"},
        "show_last_triggered": {"type": "boolean"},
        "title": {"type": "string"},
        "title_size": {"type": "string"},
        "title_align": {"enum": ["center", "left", "right"]}
    },
    "required": ["type", "query"],
    "additionalProperties": false
}
```

| Parameter             | Type    | Required | Description                                                                              |
|-----------------------|---------|----------|------------------------------------------------------------------------------------------|
| `type`                | string  | yes      | Type of the widget, for the monitor summary widget use `manage_status`                   |
| `query`               | string  | yes      | Query to filter the monitors with                                                        |
| `summary_type`        | string  | no       | Which summary type should be used                                                        |
| `display_format`      | string  | no       | What to display on the widget. Available values are: `counts`, `countsAndList` or `list` |
| `color_preference`    | string  | no       | Which color to use on the widget. Available values are:`background` or `text`            |
| `hide_zero_counts`    | Boolean | no       | Whether to show counts of 0 or not                                                       |
| `show_last_triggered` | Boolean | no       | Whether to show the time that has elapsed since the monitor/group triggered              |
| `title`               | string  | no       | Title of the widget                                                                      |
| `title_size`          | string  | no       | Size of the title                                                                        |
| `title_align`         | string  | no       | How to align the title. Available values are: `center`, `left`, or `right`               |

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /monitors/manage_monitor
[2]: /monitors/manage_monitor/#manage-triggered-monitors-with-group-level-granularity
[3]: /graphing/graphing_json/widget_json
