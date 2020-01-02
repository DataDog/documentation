---
title: Distribution Widget
kind: documentation
description: "Graph a metric distribution aggregated across one or several tags."
aliases:
    - /graphing/widgets/distribution/
further_reading:
- link: "graphing/dashboards/timeboard/"
  tag: "Documentation"
  text: "Timeboards"
- link: "graphing/graphing_json/"
  tag: "Documentation"
  text: "Building Dashboard using JSON"
---

The Distribution visualization is another way of showing metrics aggregated across one or several tags, such as *hosts*. Unlike the [heat map][1], a distribution graph's x-axis is quantity rather than time.

This visualization displays only a single metric query; additional queries are disregarded.

**Note**: Outlier detection cannot be performed for this visualization.

{{< img src="graphing/widgets/distribution/distribution.png" alt="Distribution" responsive="true" >}}

## Setup

{{< img src="graphing/widgets/distribution/distribution_setup.png" alt="Distribution" responsive="true" style="width:80%;">}}

### Configuration

Configure your metric query as usual. Note that this visualization type is useful only when metrics are aggregated across tag keys, e.g. for each `host`.
Make a selection in the "`avg`/`max`/`min`/`sum by`/etc." control to see your data across the associated tags.

### Options
#### Display preference

{{< img src="graphing/widgets/options/display_preferences.png" alt="Display preferences" responsive="true" style="width:80%;">}}

##### Global time

On screenboards only, choose whether your widget has a custom timeframe or the screenboard's global timeframe.

##### Legend

Use *Show legend on graph* to toggle the legend display on your widget. Optionally, select the number of entries to display.

#### Title

Display a custom title for your widget by activating the `Show a Title` check box:

{{< img src="graphing/widgets/options/title.png" alt="Widget title" responsive="true" style="width:80%;">}}

Optionally define its size and alignment.

## API

The dedicated [widget JSON schema definition][2] for the distribution widget is:

```
DISTIBUTION_SCHEMA = {
    "type": "object",
    "properties": {
        "type": {"enum": ["distribution"]},
        "requests": {
            "type":     "array",
            "items":    REQUEST_SCHEMA,
            "minItems": 1,
            "maxItems": 1
        },
        "title":   {"type": "string"},
        "show_legend": {"type": "boolean"}
    },
    "required": ["type", "requests"],
    "additionalProperties": false
}
```

| Parameter  | Type            | Required | Description                                                                                                                                                  |
| ------     | -----           | -----    | -----                                                                                                                                                        |
| `type`     | string          | yes      | Type of widget, for the distribution widget use `distribution`.                                                                                                 |
| `requests` | array of objects | yes      | Array of one `request` object to display in the widget. See the dedicated [Request JSON schema documentation][3] to learn how to build the `REQUEST_SCHEMA`. |
| `title`    | string          | no       | Title of your widget.                                                                                                                                        |
| `show_legend` | boolean | no | (screenboard only) Show the legend for this widget |


Additional properties allowed the `request` object:

```json
{
    "style": {
        "type": "object",
        "properties": {
            "palette": {"type": "string"},
        },
        "additionalProperties": false
    }
}
```

| Parameter       | Type   | Required | Description                           |
| ------          | -----  | -------- | ----                                  |
| `style.palette` | string | no       | Color palette to apply to the widget. |



## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /graphing/widgets/heat_map
[2]: /graphing/graphing_json/widget_json
[3]: /graphing/graphing_json/request_json
