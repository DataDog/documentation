---
title: Alert Graph Widget
kind: documentation
description: "Graph the current status of any monitor defined on your system."
aliases:
    - /graphing/widgets/alert_graph/
further_reading:
- link: "graphing/dashboards/screenboard/"
  tag: "Documentation"
  text: "Screenboard"
- link: "graphing/dashboards/timeboard/"
  tag: "Documentation"
  text: "Timeboards"
- link: "graphing/graphing_json/"
  tag: "Documentation"
  text: "Building Dashboard using JSON"
---

Alert graphs are timeseries graphs showing the current status of any monitor defined on your system:

{{< img src="graphing/widgets/alert_graph/alert_graph.png" alt="Alert Graph" responsive="true">}}

## Setup

{{< img src="graphing/widgets/alert_graph/alert_graph_setup.png" alt="Alert Graph Setup" responsive="true" style="width:80%;">}}

### Configuration

1. Choose a previously created monitor to graph.
2. Select a timeframe.
3. Select your visualization:
    * Timeseries
    * Top list

### Options
#### Display preference

{{< img src="graphing/widgets/options/display_preferences.png" alt="Display preferences" responsive="true" style="width:80%;">}}

##### Global time

On screenboards only, choose whether your widget has a custom timeframe or the screenboard's global timeframe.

##### Legend

Use *Show legend on graph* to toggle the legend display on your widget. Optionally, select the number of entries to display.

#### Title

Display a custom title for your widget by activating the `Show a Title` check box:

{{< img src="graphing/widgets/options/title.png" alt="Widget title" responsive="true" style="width:80%;">}}

Optionally define its size and alignment.

## API

The dedicated [widget JSON schema definition][1] for the alert graph widget is:

```
ALERT_GRAPH_SCHEMA = {
    "type": "object",
    "properties": {
        "type": {"enum": ["alert_graph"]},
        "alert_id": {"type": "string"},
        "viz_type": {"enum": ["timeseries", "toplist"]},
        "title": {"type": "string"}
    },
    "required": ["type", "alert_id", "viz_type"],
    "additionalProperties": false
}
```

| Parameter  | Type            | Required | Description                                                                                                                                                  |
| ------     | -----           | -----    | -----                                                                                                                                                        |
| `type`     | string          | yes      | Type of the widget, for the alert graph widget use `alert_graph`|
| `alert_id`     | string          | yes      | ID of the alert to use in the widget|
|`viz_type`|string|yes|Whether to display the Alert Graph as a timeseries or a top list. Available values are: `timeseries` or `toplist`
|`title`|string|no|Title of the widget|

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /graphing/graphing_json/widget_json
