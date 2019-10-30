---
title: Query Value Widget
kind: documentation
description: "Display an aggregated value for a given metric query"
further_reading:
- link: "graphing/dashboards/screenboard/"
  tag: "Documentation"
  text: "Screenboard"
- link: "graphing/graphing_json/"
  tag: "Documentation"
  text: "Building Dashboard using JSON"
---

Query values display the current value of a given metric, APM, or log query. They come with conditional formatting (such as a green/yellow/red background) to convey whether the value is in the expected range.
The values displayed by a query value need not represent an instantaneous measurement.

The widget can display the latest value reported, or an aggregate computed from all query values across the time window. These visualizations provide a narrow but unambiguous window into your infrastructure query.

{{< img src="graphing/widgets/query_value/query_value.png" alt="Query value widget" responsive="true" >}}

## Setup

{{< img src="graphing/widgets/query_value/query_value_setup.png" alt="Query value widget setup" responsive="true" style="width:80%;">}}

### Configuration

1. Choose the data to graph:
    * Metric: See [the main graphing documentation][1] to configure a metric query.
    * Analyzed Spans: See [the trace search documentation][2] to configure an Analyzed Span query.
    * Log Events: See [the log search documentation][3] to configure a log event query.
2. Choose the units and the formatting.
3. Optional: configure a conditional format depending on the value displayed.

### Options
#### Global time

On screenboards only, choose whether your widget has a custom timeframe or the screenboard's global timeframe.

#### Title

Display a custom title for your widget by activating the `Show a Title` check box:

{{< img src="graphing/widgets/options/title.png" alt="Widget title" responsive="true" style="width:80%;">}}

Optionally define its size and alignment.

## API

The dedicated [widget JSON schema definition][4] for the query value widget is:

```
QUERY_VALUE_SCHEMA = {
    "type": "object",
    "properties": {
        "type": {"enum": ["query_value"]},
        "requests": {
            "type":     "array",
            "items":    REQUEST_SCHEMA,
            "minItems": 1,
            "maxItems": 1
        },
        "autoscale":   {"type": "boolean"},
        "custom_unit": {"type": "string"},
        "precision":   {"type": "integer"},
        "text_align":  {"enum": ["center", "left", "right"]},
        "title":       {"type": "string"}
    },
    "required": ["type", "requests"],
    "additionalProperties": false
}
```

| Parameter     | Type            | Required | Description                                                                                                                                                  |
| ------        | -----           | -----    | --------                                                                                                                                                     |
| `type`        | string          | yes      | Type of widget; for the query value widget use `query_value`                                                                                                   |
| `requests`    | array of objects | yes      | Array of one `request` object to display in the widget. See the dedicated [Request JSON schema documentation][5] to learn how to build the `REQUEST_SCHEMA`. |
| `autoscale`   | Boolean         | no       | Whether to use autoscaling or not.                                                                                                                           |
| `custom_unit` | string          | no       | Display a unit of your choice on the widget.                                                                                                                 |
| `precision`   | integer         | no       | Number of decimals to show. If not defined, the widget uses the raw value.                                                                                    |
| `text_align`  | string            | no       | How to align the value in the widget; values available are `center`, `left`, or `right`.                                                                      |
| `title`       | string          | no       | Title of your widget.                                                                                                                                        |


Additional properties allowed in the `request` object:

```
{
    "conditional_formats": CONDITIONAL_FORMATS_SCHEMA,
    "aggregator": {"enum": ["avg", "last", "max", "min", "sum"]}
}
```

| Parameter             | Type   | Required | Description                                                                                                                                                     |
| ------                | -----  | -------- | ----                                                                                                                                                            |
| `conditional_formats` | object | no       | Conditional format control options. See the dedicated [Conditional format JSON schema documentation][6] to learn how to build the `CONDITIONAL_FORMATS_SCHEMA`. |
| `aggregator`          | enum   | no       | Aggregator used for the request; available values are: `avg`, `last`, `max`, `min`, or `sum`.                                                                   |

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /graphing
[2]: /tracing/advanced/search/#search-bar
[3]: https://docs.datadoghq.com/logs/explorer/search/#search-syntax
[4]: /graphing/graphing_json/widget_json
[5]: /graphing/graphing_json/request_json
[6]: /graphing/graphing_json/widget_json/#conditional-format-schema
