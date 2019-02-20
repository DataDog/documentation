---
title: Query Value Widget
kind: documentation
further_reading:
- link: "graphing/dashboards/screenboard/"
  tag: "Documentation"
  text: "Screenboard"
---

Query values display the current value of a given metric query, with conditional formatting (such as a green/yellow/red background) to convey whether or not the value is in the expected range.
The value displayed by a query value need not represent an instantaneous measurement.

The widget can display the latest value reported, or an aggregate computed from all query values across the time window. These visualizations provide a narrow but unambiguous window into your infrastructure query.

{{< img src="graphing/widgets/query_value/query_value.png" alt="Query value widget" responsive="true" >}}

## Setup

{{< img src="graphing/widgets/query_value/query_value_setup.png" alt="Query value widget setup" responsive="true" style="width:80%;">}}

### Configuration

1. Choose the data to graph:
    * Metric: See [the main graphing documentation][1] to configure a metric query.
    * APM Events: See [the trace search documentation][2] to configure an APM event query.
    * Log Events: See [the log search documentation][3] to configure an APM event query.
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

The dedicated [widget JSON schema definition][4] for the change widget is: 

```
  "definition": {
    "type": "query_value",
    "requests": ["<REQUEST_SCHEMA>"],
    "autoscale":   <AUTOSCALE>,
    "custom_unit": "<CUSTOM_UNIT>",
    "precision":   <PRECISION>,
    "text_align":  "<TEXT_ALIGN>"
    "title": "<WIDGET_TITLE>"
  }
```

| Parameter  | Type             | Description                                                                                                                                                                         |
| ------     | -----            | --------                                                                                                                                                                            |
| `type`     | string           | Type of the widget, for the group widget use `query_value`                                                                                                                          |
| `requests` | array of strings | List of request to display in the widget. See the dedicated [Request JSON schema documentation][5] to learn how to build the `<REQUEST_SCHEMA>`. |
| `autoscale`   | boolean | Whether to use autoscaling or not.                                                     |
| `custom_unit` | string  | Display a unit of your choice on the widget.                                           |
| `precision`   | integer | Number of decimal to show. If not defined, the widget uses the raw value.              |
| `text_align`  | enum    | How to align the value in the widget, value available are `center`, `left`, or `right` |
| `title`       | string  | Title of your widget.                                                                  |

Additional properties allowed in a request:

```
{
   "conditional_formats": <CONDITIONAL_FORMATS_SCHEMA>,
   "aggregator": "<AGGREGATOR>"
}
```

| Parameter             | Type   | Description                                                                                                                                                                                                                    |
| ------                | -----  | --------                                                                                                                                                                                                                       |
| `conditional_formats` | object | Conditional format control options. See the dedicated [Conditional format JSON schema documentation][6] to learn how to build the `<CONDITIONAL_FORMATS_SCHEMA>`. |
| `aggregator`          | enum   | Aggregator used for the request, available values are: `avg`, `last`, `max`, `min`, or `sum`                                                                                                                                   |

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /graphing
[2]: /tracing/visualization/search/#search-bar
[3]: https://docs.datadoghq.com/logs/explorer/search/#search-syntax
[4]: /graphing/graphing_json/widgets_json
[5]: /graphing/graphing_json/request_json
[6]: /graphing/graphing_json/widget_json/#conditional-format-schema
