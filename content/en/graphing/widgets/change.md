---
title: Change Widget
kind: documentation
description: Graph the change in a value over a chosen time period .
further_reading:
- link: "graphing/dashboards/timeboard/"
  tag: "Documentation"
  text: "Timeboards"
- link: "graphing/dashboards/screenboard/"
  tag: "Documentation"
  text: "Screenboard"
---
The Change graph shows you the change in a value over the time period chosen:

{{< img src="graphing/widgets/change/change.png" alt="Change graph" responsive="true">}}

## Setup

{{< img src="graphing/widgets/change/change_setup.png" alt="Change graph Setup" responsive="true" style="width:80%;">}}

### Configuration

1. Choose a metric to graph. 
2. Choose an aggregation function.
3. Optional: choose a specific context for your widget.
4. Break down your aggregation on a tag key i.e `host`, `service`..
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
8. Indicate whether `increases` or `decreases` changes are better. The better one is highlighted in green; the other one in red.
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

```
  "definition": {
    "type": "change",
    "requests": ["<REQUEST_SCHEMA>"],
    "title": "<WIDGET_TITLE>"
  }
```

| Parameter  | Type             | Description                                                                                                                                      |
| ------     | -----            | --------                                                                                                                                         |
| `type`     | string           | Type of the widget, for the group widget use `change`                                                                                            |
| `requests` | array of strings | List of request to display in the widget. See the dedicated [Request JSON schema documentation][2] to learn how to build the `<REQUEST_SCHEMA>`. |
| `title`    | string           | Title of your widget.                                                                                                                            |

Additional properties allowed in a request:

```
{
    "change_type": "<CHANGE_TYPE>",
    "compare_to": "<COMPARE_TO>",
    "increase_good": <INCREASE_GOOD>,
    "order_by": "<ORDER_BY>"
    "order_dir": "<ORDER_DIR>",
    "show_present": <SHOW_PRESENT>
}
```

| Parameter       | Type    | Description                                                                                                                    |
| ------          | -----   | --------                                                                                                                       |
| `change_type`   | enum    | Show the absolute or the relative change, values available are: `absolute` or `relative`                                       |
| `compare_to`    | enum    | Timeframe used for the change comparison, values available are: `hour_before`, `day_before`, `week_before`, or `month_before`. |
| `increase_good` | boolean | Whether to show increase as good.                                                                                              |
| `order_by`      | enum    | What to order by, values available are: `change`, `name`, `present`, or `past`.                                                |
| `order_dir`     | enum    | Order direction, values available are: `asc` or `desc`.                                                                        |
| `show_present`  | boolean | Whether to show the present value.                                                                                             |
## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /graphing/graphing_json/widgets_json
[2]: /graphing/graphing_json/request_json
