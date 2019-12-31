---
title: Change Widget
kind: documentation
description: "Graph the change in a value over a chosen time period."
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
- link: "graphing/graphing_json/widget_json"
  tag: "Documentation"
  text: "Widget JSON schema"
- link: "graphing/graphing_json/request_json"
  tag: "Documentation"
  text: "Request JSON schema"
---
The Change graph shows you the change in a value over the time period chosen:

{{< img src="graphing/widgets/change/change.png" alt="Change graph" responsive="true">}}

## Setup

{{< img src="graphing/widgets/change/change_setup.png" alt="Change graph Setup" responsive="true" style="width:80%;">}}

### Configuration

1. Choose a metric to graph.
2. Choose an aggregation function.
3. Optional: choose a specific context for your widget.
4. Break down your aggregation on a tag key i.e `host`, `service`...
5. Choose the "Compared" period from:
    * an hour before
    * a day before
    * a week before
    * a month before
6. Select to show the `relative` or `absolute` change between the two periods.
7. Select your ranking by sorting your result by:
    * `change`
    * `name`
    * `present value`
    * `past value`
8. Indicate whether `increases` or `decreases` changes is better. The better one is highlighted in green; the other one in red.
9. Optional: display current value.

### Options

#### Display preference

{{< img src="graphing/widgets/options/display_preferences.png" alt="Display preferences" responsive="true" style="width:80%;">}}

##### Global time

On screenboards only, choose whether your widget has a custom timeframe or the screenboard's global timeframe.

###### Legend

Use *Show legend on graph* to toggle the legend display on your widget. Optionally, select the number of entries to display.

#### Title

Display a custom title for your widget by activating the `Show a Title` check box:

{{< img src="graphing/widgets/options/title.png" alt="Widget title" responsive="true" style="width:80%;">}}

Optionally define its size and alignment.

## API

The dedicated [widget JSON schema definition][1] for the change widget is:

```text
CHANGE_SCHEMA = {
    "type": "object",
    "properties": {
        "type": {"enum": ["change"]},
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

| Parameter  | Type             | Required | Description                                                                                                                                                  |
|------------|------------------|----------|--------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `type`     | string           | yes      | Type of widget. For the change widget, use `change`.                                                                                                         |
| `requests` | array of objects | yes      | Array of one `request` object to display in the widget. See the dedicated [Request JSON schema documentation][2] to learn how to build the `REQUEST_SCHEMA`. |
| `title`    | string           | no       | Title of your widget.                                                                                                                                        |

Additional properties allowed in the `request` object:

```json
{
    "change_type":   {"enum": ["absolute", "relative"]},
    "compare_to":    {"enum": ["hour_before", "day_before", "week_before", "month_before"]},
    "increase_good": {"type": "boolean"},
    "order_by":      {"enum": ["change", "name", "present", "past"]},
    "order_dir":     {"enum": ["asc", "desc"]},
    "show_present":  {"type": "boolean"}
}
```

| Parameter       | Type    | Required | Description                                                                                                                    |
|-----------------|---------|----------|--------------------------------------------------------------------------------------------------------------------------------|
| `change_type`   | string  | no       | Show the absolute or the relative change; values available are: `absolute` or `relative`                                       |
| `compare_to`    | string  | no       | Timeframe used for the change comparison; values available are: `hour_before`, `day_before`, `week_before`, or `month_before`. |
| `increase_good` | Boolean | no       | Whether to show increase as good.                                                                                              |
| `order_by`      | string  | no       | What to order by; values available are: `change`, `name`, `present`, or `past`.                                                |
| `order_dir`     | string  | no       | Order direction; values available are: `asc` or `desc`.                                                                        |
| `show_present`  | Boolean | no       | Whether to show the present value.                                                                                             |
## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /graphing/graphing_json/widget_json
[2]: /graphing/graphing_json/request_json
