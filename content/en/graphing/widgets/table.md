---
title: Table Widget
kind: documentation
beta: true
further_reading:
- link: "graphing/dashboards/timeboard/"
  tag: "Documentation"
  text: "Timeboards"
- link: "graphing/dashboards/screenboard/"
  tag: "Documentation"
  text: "Screenboards"
- link: "graphing/graphing_json/"
  tag: "Documentation"
  text: "Building Dashboards using JSON"
---

## Overview

The table visualization is available on timeboards and screenboards. It displays columns of metrics grouped by tag key. For example, see `system.cpu.system` and `system.cpu.user` grouped by `service`:

{{< img src="graphing/widgets/table/table_widget.png" alt="Table widget" responsive="true" style="width:80%;">}}

## Setup
### Configuration

* Choose the data to graph (add additional columns as needed):

    * Metric: See the [main graphing documentation][1] to configure a metric query.
    * Log Events: See the [log search documentation][2] to configure a log event query.

* Column headers can be renamed by setting a metric alias.
* For the **Rows**, choose the tag key to **Group by**. The example below displays `service` rows.
* Choose the limit for the number results (defaults to 10).
* Choose the metric for sorting the table (defaults to the first column).
* Optional: Configure conditional formatting depending on the cell values for each column.

{{< img src="graphing/widgets/table/table_setup.png" alt="Table setup" responsive="true" style="width:80%;">}}

## API

The dedicated [widget JSON schema definition][3] for the top list widget is:

```
TOPLIST_SCHEMA = {
    "type": "object",
    "properties": {
        "type": {"enum": ["query_table"]},
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

| Parameter  | Type             | Required | Description                                                                                                                                         |
|------------|------------------|----------|-----------------------------------------------------------------------------------------------------------------------------------------------------|
| `type`     | String           | Yes      | The type of widget, for the table widget use `query_table`.                                                                                         |
| `requests` | Array of objects | Yes      | Array of one `request` object to display in the widget. See the dedicated [Request JSON schema documentation][4] for building the `REQUEST_SCHEMA`. |
| `title`    | String           | No       | Title of your widget                                                                                                                                |


Additional properties allowed in the `request` object:

```
{
   "conditional_formats": CONDITIONAL_FORMATS_SCHEMA
}
```

| Parameter             | Type   | Required | Description                                                                                                                                                     |
|-----------------------|--------|----------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `conditional_formats` | Object | No       | Conditional format control options. See the dedicated [Conditional format JSON schema documentation][5] to learn how to build the `CONDITIONAL_FORMATS_SCHEMA`. |


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /graphing/using_graphs/#configuring-a-graph
[2]: /logs/explorer/search/#search-syntax
[3]: /graphing/graphing_json/widget_json
[4]: /graphing/graphing_json/request_json
[5]: /graphing/graphing_json/widget_json/#conditional-format-schema
