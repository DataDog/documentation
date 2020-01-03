---
title: Scatter Plot Widget
kind: documentation
description: "Graph a chosen scope over two different metrics with their respective aggregation"
aliases:
    - /graphing/widgets/scatter_plot/
further_reading:
- link: "/dashboards/timeboard/"
  tag: "Documentation"
  text: "Timeboards"
- link: "/dashboards/graphing_json/"
  tag: "Documentation"
  text: "Building Dashboard using JSON"
---

The scatter plot visualization allows you to graph a chosen scope over two different metrics with their respective aggregation:

{{< img src="graphing/widgets/scatterplot/scatterplot.png" alt="Scatter Plot" >}}

## Setup

{{< img src="graphing/widgets/scatterplot/scatterplot_setup.png" alt="Scatter Plot Setup"  style="width:80%;">}}

### Configuration

1. Select a metric and an aggregation for the X and Y axis.
2. Define the scope for each point of the scatter plot, such as `host`, `service`, `app`, `region`, etc.
3. Optional: enable a color-by tag.
4. Optional: set X and Y axis controls.

## Options

#### Global time

On screenboards only, choose whether your widget has a custom timeframe or the screenboard's global timeframe.

#### Title

Display a custom title for your widget by activating the `Show a Title` check box:

{{< img src="graphing/widgets/options/title.png" alt="Widget title"  style="width:80%;">}}

Optionally define its size and alignment.

## API

The dedicated [widget JSON schema definition][1] for the scatter plot widget is:

```text
SCATTERPLOT_SCHEMA = {
    "type": "object",
    "properties": {
        "type": {"enum": ["scatterplot"]},
        "requests": {
            "type": "object",
            "properties": {
                "x": REQUEST_SCHEMA,
                "y": REQUEST_SCHEMA
            },
            "required": ["x", "y"],
            "additionalProperties": false
        },
        "xaxis": AXIS_SCHEMA,
        "yaxis": AXIS_SCHEMA,
        "color_by_groups": {"type": "array", "items": {"type": "string"}},
        "title": {"type": "string"}
    },
    "required": ["type", "requests"],
    "additionalProperties": false
}
```

| Parameter         | Type             | Required | Description                                                                                                                                        |
|-------------------|------------------|----------|----------------------------------------------------------------------------------------------------------------------------------------------------|
| `type`            | string           | yes      | Type of widget, for the scatter plot widget use `scatterplot`.                                                                                     |
| `requests`        | object           | yes      | A `requests` object to display in the widget. See the dedicated [Request JSON schema documentation][2] to learn how to build the `REQUEST_SCHEMA`. |
| `yaxis`           | object           | no       | Y-axis control options. See the dedicated [Y-axis JSON schema documentation][3] to learn how to build the `AXIS_SCHEMA`.                           |
| `xaxis`           | object           | no       | Y-axis control options. See the dedicated [X-axis JSON schema documentation][3] to learn how to build the `AXIS_SCHEMA`.                           |
| `color_by_groups` | array of strings | no       | List of groups used for colors.                                                                                                                    |
| `title`           | string           | no       | Title of your widget.                                                                                                                              |

Additional properties allowed in the `request` object:

```json
{"aggregator": {"enum": ["avg", "last", "max", "min", "sum"]}}
```

| Parameter    | Type   | Required | Description                                                                                   |
|--------------|--------|----------|-----------------------------------------------------------------------------------------------|
| `aggregator` | string | no       | Aggregator used for the request, available values are: `avg`, `last`, `max`, `min`, or `sum`. |

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /dashboards/graphing_json/widget_json
[2]: /dashboards/graphing_json/request_json
[3]: /dashboards/graphing_json/widget_json/#y-axis-schema
