---
title: Alert Value Widget
kind: documentation
description: "Graph the current value of a metric in any monitor defined on your system."
aliases:
    - /graphing/widgets/alert_value/
further_reading:
- link: "/dashboards/screenboards/"
  tag: "Documentation"
  text: "Screenboard"
- link: "/dashboards/timeboards/"
  tag: "Documentation"
  text: "Timeboards"
- link: "/dashboards/graphing_json/"
  tag: "Documentation"
  text: "Building Dashboard using JSON"
---

Alert values are query values showing the current value of the metric in any monitor defined on your system:

{{< img src="dashboards/widgets/alert_value/alert_value.png" alt="Alert Value" >}}

## Setup
{{< img src="dashboards/widgets/alert_value/alert_value_setup.png" alt="Alert Value Setup"  style="width:80%;">}}

### Configuration

1. Choose a previously created monitor to graph.
2. Select the formating to display:
    * raw value
    * 0/1/2/3 decimals
3. Select to display:
    * `Automatic`
    * `/s` Per Second
    * `b` Bits
    * `B` Bytes
    * `Custom`

### Options

#### Title

Display a custom title for your widget by activating the `Show a Title` check box:

{{< img src="dashboards/widgets/options/title.png" alt="Widget title"  style="width:80%;">}}

Optionally define its size and alignment.

## API

The dedicated [widget JSON schema definition][1] for the alert value widget is:

```text
ALERT_VALUE_SCHEMA = {
    "type": "object",
    "properties": {
        "type": {"enum": ["alert_value"]},
        "alert_id": {"type": "string"},
        "precision": {"type": "integer"},
        "unit": {"type": "string"},
        "text_align": {"enum": ["left", "center", "right"]},
        "title_size": {"type": "string"},
        "title": {"type": "string"}
    },
    "required": ["type", "alert_id"],
    "additionalProperties": false
}
```

| Parameter    | Type    | Required | Description                                                                             |
|--------------|---------|----------|-----------------------------------------------------------------------------------------|
| `type`       | string  | yes      | Type of the widget, for the alert value widget use `alert_value`                        |
| `alert_id`   | string  | yes      | ID of the alert to use in the widget                                                    |
| `precision`  | integer | no       | Number of decimal places to show. If not defined, uses the raw value                    |
| `unit`       | string  | no       | Unit to display with the value                                                          |
| `text_align` | string  | no       | How to align the value in the widget. Available values are: `left`, `center` or `right` |
| `title_size`  | string  | no       | Size of value in the widget                                                             |
| `title`      | string  | no       | Title of the widget                                                                     |

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /dashboards/graphing_json/widget_json
