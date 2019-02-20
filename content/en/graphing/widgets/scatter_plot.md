---
title: Scatter Plot Widget
kind: documentation
further_reading:
- link: "graphing/dashboards/timeboard/"
  tag: "Documentation"
  text: "Timeboards"
---

The scatter plot visualization allows you to graph a chosen scope over 2 different metrics with their respective aggregation:

{{< img src="graphing/widgets/scatterplot/scatterplot.png" alt="Scatter Plot" responsive="true">}}

## Setup

{{< img src="graphing/widgets/scatterplot/scatterplot_setup.png" alt="Scatter Plot Setup" responsive="true" style="width:80%;">}}

### Configuration

1. Select a metric and an aggregation for the X and Y axis.
2. Define the scope for each point of the scatter plot, such as `host`, `service`, `app`, `region`, etc.
3. Optional - Enable a color-by tag.
4. Optional - Set X and Y axis controls.

## Options

#### Global time

On Screenboard only, choose whether your widget has a custom timeframe or the global timeframe of the Screenboard.

#### Title

Display a custom title for your widget by activating the `Show a Title` check box:

{{< img src="graphing/widgets/options/title.png" alt="Widget title" responsive="true" style="width:80%;">}}

Optionally define its size and alignment.

## API

The dedicated [widget JSON schema definition](/graphing/graphing_json/widgets_json) for the change widget is: 

```
  "definition": {
    "type": "scatterplot",
    "requests": {
        "x": "<REQUEST_SCHEMA>",
        "y": "<REQUEST_SCHEMA>"
    },
    "yaxis":  <AXIS_SCHEMA>,
    "xaxis": <AXIS_SCHEMA>,
    "color_by_groups": ["<GROUP_COLOR>"]
    "title": "<WIDGET_TITLE>"
  }
```

| Parameter         | Type             | Description                                                                                                                                                                         |
| ------            | -----            | --------                                                                                                                                                                            |
| `type`            | string           | Type of the widget, for the group widget use `scatterplot`                                                                                                                          |
| `requests`        | array of strings | List of request to display in the widget. See the dedicated [Request JSON schema documentation](/graphing/graphing_json/request_json) to learn how to build the `<REQUEST_SCHEMA>`. |
| `yaxis`           | object           | Y-axis control options. See the dedicated [Y-axis JSON schema documentation](/graphing/graphing_json/widget_json/#y-axis-schema) to learn how to build the `<AXIS_SCHEMA>`.         |
| `xaxis`           | object           | Y-axis control options. See the dedicated [X-axis JSON schema documentation](/graphing/graphing_json/widget_json/#y-axis-schema) to learn how to build the `<AXIS_SCHEMA>`.         |
| `color_by_groups` | array of string  | List of groups used for colors.                                                                                                                                                     |
| `title`           | string           | Title of your widget.                                                                                                                                                               |
Additional properties allowed in a request:

```
{
   "aggregator": "<AGGREGATOR>"
}
```

| Parameter    | Type  | Description                                                                                  |
| ------       | ----- | --------                                                                                     |
| `aggregator` | enum  | Aggregator used for the request, available values are: `avg`, `last`, `max`, `min`, or `sum` |

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}
