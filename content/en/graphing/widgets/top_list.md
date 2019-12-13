---
title: Top List Widget
kind: documentation
further_reading:
- link: "graphing/dashboards/timeboard/"
  tag: "Documentation"
  text: "Timeboards"
- link: "graphing/dashboards/screenboard/"
  tag: "Documentation"
  text: "Screenboard"
- link: "graphing/graphing_json/"
  tag: "Documentation"
  text: "Building Dashboard using JSON"
---

The top list visualization enables you to display a list of Tag value like `hostname` or `service` with the most or least of any metric value, such as highest consumers of CPU, hosts with the least disk space, etc:

{{< img src="graphing/widgets/toplist/toplist.png" alt="Top List" responsive="true">}}

## Setup

{{< img src="graphing/widgets/toplist/toplist_setup.png" alt="Top List" responsive="true" style="width:80%;">}}

### Configuration

1. Choose the data to graph:
    * Metric: See [the main graphing documentation][1] to configure a metric query.
    * Analyzed Spans: See [the trace search documentation][2] to configure an Analyzed Span query.
    * Log Events: See [the log search documentation][3] to configure an Analyzed Span query.

2. Optional: configure conditional formatting depending on your entries' values.

### Options
#### Global time

On screenboards only, choose whether your widget has a custom timeframe or the screenboard's global timeframe.

#### Title

Display a custom title for your widget by activating the `Show a Title` check box:

{{< img src="graphing/widgets/options/title.png" alt="Widget title" responsive="true" style="width:80%;">}}

Optionally define its size and alignment.

## API

The dedicated [widget JSON schema definition][4] for the top list widget is:

```
TOPLIST_SCHEMA = {
    "type": "object",
    "properties": {
        "type": {"enum": ["toplist"]},
        "requests": {
            "type":     "array",
            "items":    REQUEST_SCHEMA,
            "minItems": 1,
            "maxItems": 1
        },
        "title": {"type": "string"}
    },
    "required": ["type", "requests"],
    "additionalProperties": false
}
```

| Parameter  | Type            | Required | Description                                                                                                                                                  |
| ------     | -----           | -------- | -----                                                                                                                                                        |
| `type`     | string          | yes      | Type of widget, for the top list widget use `toplist`.                                                                                                      |
| `requests` | array of objects | yes      | Array of one `request` object to display in the widget. See the dedicated [Request JSON schema documentation][5] to learn how to build the `REQUEST_SCHEMA`. |
| `title`    | string          | no       | Title of your widget.                                                                                                                                        |


Additional properties allowed in the `request` object:

```
{
   "conditional_formats": CONDITIONAL_FORMATS_SCHEMA
}
```

| Parameter             | Type   | Required | Description                                                                                                                                                     |
| ------                | -----  | ----     | -------                                                                                                                                                         |
| `conditional_formats` | object | no       | Conditional format control options. See the dedicated [Conditional format JSON schema documentation][6] to learn how to build the `CONDITIONAL_FORMATS_SCHEMA`. |


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /graphing
[2]: /tracing/advanced/search/#search-bar
[3]: https://docs.datadoghq.com/logs/explorer/search/#search-syntax
[4]: /graphing/graphing_json/widget_json
[5]: /graphing/graphing_json/request_json
[6]: /graphing/graphing_json/widget_json/#conditional-format-schema
