---
title: Service Summary Widget
kind: documentation
description: "Displays the graphs of a chosen service in your screenboard."
aliases:
    - /graphing/widgets/service_summary/
further_reading:
- link: "graphing/dashboards/screenboard/"
  tag: "Documentation"
  text: "Screenboard"
- link: "graphing/graphing_json/"
  tag: "Documentation"
  text: "Building Dashboard using JSON"
---

The service summary displays the graphs of a chosen [service][1] in your screenboard.

{{< img src="graphing/widgets/service_summary/service_summary.png" alt="service summary" responsive="true">}}

## Setup

{{< img src="graphing/widgets/service_summary/service_summary_setup.png" alt="service summary setup" responsive="true" style="width:80%;">}}

### Configuration

1. Select an [environment][2] and a [service][1].
2. Select a widget size.
3. Select the information to display:
    * Hits
    * Errors
    * Latency
    * Breakdown
    * Distribution
    * Resource
4. Choose your display preference by selecting a timeframe and the number of column to display your graphs across.
5. Enter a title for your graph.

## API

The dedicated [widget JSON schema definition][2] for the service summary widget is:

```text
TRACE_SERVICE_SCHEMA = {
    "type": "object",
    "properties": {
        "type": {"enum": ["trace_service"]},
        "env": {"type": "string"},
        "service": {"type": "string"},
        "span_name": {"type": "string"},
        "show_hits": {"type": "boolean"},
        "show_errors": {"type": "boolean"},
        "show_latency": {"type": "boolean"},
        "show_breakdown": {"type": "boolean"},
        "show_distribution": {"type": "boolean"},
        "show_resource_list": {"type": "boolean"},
        "size_format": {"enum": ["small", "medium", "large"]},
        "display_format": {"enum": ["one_column", "two_column", "three_column"]},
        "title": {"type": "string"},
        "title_size": {"type": "string"},
        "title_align": {"enum": ["center", "left", "right"]},
        "time": TIME_SCHEMA
    },
    "required": ["type", "env", "service", "span_name"],
    "additionalProperties": false
}
```

| Parameter            | Type    | Required | Description                                                                                                                |
|----------------------|---------|----------|----------------------------------------------------------------------------------------------------------------------------|
| `type`               | string  | yes      | Type of the widget, for the service summary widget use `trace_service`                                                     |
| `env`                | string  | yes      | APM environment                                                                                                            |
| `service`            | string  | yes      | APM service                                                                                                                |
| `span_name`          | string  | yes      | APM span name                                                                                                              |
| `show_hits`          | Boolean | no       | Whether to show the hits metrics or not                                                                                    |
| `show_errors`        | Boolean | no       | Whether to show the error metrics or not                                                                                   |
| `show_latency`       | Boolean | no       | Whether to show the latency metrics or not                                                                                 |
| `show_breakdown`     | Boolean | no       | Whether to show the latency breakdown or not                                                                               |
| `show_distribution`  | Boolean | no       | Whether to show the latency distribution or not                                                                            |
| `show_resource_list` | Boolean | no       | Whether to show the resource list or not                                                                                   |
| `size_format`        | string  | no       | Size of the widget. Available values are: `small`, `medium`, or `large`                                                    |
| `display_format`     | string  | no       | Number of columns to display. Available values are: `one_column`, `two_column`, or `three_column`                          |
| `title`              | string  | no       | Title of the widget                                                                                                        |
| `title_size`         | string  | no       | Size of the title                                                                                                          |
| `title_align`        | string  | no       | How to align the title. Available values are: `center`, `left`, or `right`                                                 |
| `time`               | object  | no       | Time setting for the widget. See the dedicated [Time JSON schema documentation][3] to learn how to build the `TIME_SCHEMA` |
## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/visualization/service
[2]: /tracing/send_traces
[3]: /graphing/graphing_json/widget_json/#time-schema
