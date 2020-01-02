---
title: Heat Map Widget
kind: documentation
description: "Build temporal heat map over a given metric."
aliases:
    - /graphing/widgets/heat_map/
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

The heat map visualization shows metrics aggregated across many tags, such as *hosts*. The more hosts that have a particular value, the darker that square is.

This visualization displays only a single metric query; additional queries are disregarded.

**Note**: Outlier detection cannot be performed for this visualization.

{{< img src="graphing/widgets/heat_map/heat_map.png" alt="Heat Map" responsive="true">}}

## Setup

{{< img src="graphing/widgets/heat_map/heat_map_setup.png" alt="Heat Map setup" responsive="true" style="width:80%;">}}

### Configuration

Configure your metric query as usual. Note that this visualization type is useful only when metrics are aggregated across tag keys , e.g. for each `host`.

Make a selection in the "`avg`/`max`/`min`/`sum by`/etc." control to see your data across the associated tags.

### Options

#### Event Overlay

Add events from related systems to add more context to your graph. For example, you can add GitHub commits, Jenkins deploys, or Docker creation events. Expand the **Event Overlays** section and enter a query to display those events. Use the same query format as for the [Event Stream][1], for example:

| Query                       | Description                                                |
|-----------------------------|------------------------------------------------------------|
| `sources:jenkins`           | Shows all events from the Jenkins source.                  |
| `tag:role:web`              | Shows all events with the tag `role:web`.                  |
| `tags:$<TEMPLATE_VARIABLE>` | Shows all events from the selected [Template Variable][2]. |

#### Y-axis controls

Y-axis controls are available via the UI and the JSON editor. They allow you to:

* Clip the y-axis to specific ranges.
* Automatically change y-axis bounds based on a percentage or an absolute value threshold. This threshold can be applied to one of both ends of the graph (lower and upper) in order to remove "outliers" series.
* Change the y-axis scale from linear to log, pow, or sqrt.

Change the Y-axis scale by expanding the *Y-Axis Controls* button.

The following configuration options are available:

| Option                | Required | Description                                                                                                                                                                                                       |
|-----------------------|----------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `Min`/`Max`           | No       | Specify the minimum and / or maximum value to show on y-axis. It takes a number or `Auto` as the default value.                                                                                                   |
| `Scale`               | No       | Specifies the scale type. Possible values:<br>- *linear*: A linear scale (default)<br>- *log*: A logarithmic scale<br>- *pow*: A Power of 2 scale (2 is default, modify in JSON)<br>- *sqrt*: A square root scale |
| `Always include zero` | No       | Always include zero or fit the axis to the data range. The default is to always include zero.                                                                                                                     |

**Note**: Because the mathematical log function doesn't accept negative values, the Datadog log scale only works if values are of the same sign (everything > 0 or everything < 0). Otherwise an empty graph is returned.

## API

The dedicated [widget JSON schema definition][3] for the heat map widget is:

```text
HEATMAP_SCHEMA = {
    "type": "object",
    "properties": {
        "type": {"enum": ["heatmap"]},
        "requests": {
            "type":     "array",
            "items":    REQUEST_SCHEMA,
            "minItems": 1,
            "maxItems": 1
        },
        "yaxis":  AXIS_SCHEMA,
        "events": EVENTS_SCHEMA,
        "title":   {"type": "string"},
        "show_legend": {"type": "boolean"}
    },
    "required": ["type", "requests"],
    "additionalProperties": false
}
```

| Parameter     | Type             | Required | Description                                                                                                                                                  |
|---------------|------------------|----------|--------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `type`        | string           | yes      | Type of widget, for the heat map widget use `heatmap`                                                                                                        |
| `requests`    | array of objects | yes      | Array of one `request` object to display in the widget. See the dedicated [Request JSON schema documentation][4] to learn how to build the `REQUEST_SCHEMA`. |
| `yaxis`       | object           | no       | Y-axis control options. See the dedicated [Y-axis JSON schema documentation][5] to learn how to build the `<AXIS_SCHEMA>`.                                   |
| `events`      | object           | no       | Event overlay control options. See the dedicated [Events JSON schema documentation][6] to learn how to build the `<EVENTS_SCHEMA>`                           |
| `title`       | string           | no       | Title of your widget.                                                                                                                                        |
| `show_legend` | boolean          | no       | (screenboard only) Show the legend for this widget                                                                                                           |

Additional properties allowed in the `requests` object:

```json
{
  "style": {
    "type": "object",
    "properties": {"palette": {"type": "string"}},
    "additionalProperties": false
  }
}
```

| Parameter       | Type   | Required | Description                           |
|-----------------|--------|----------|---------------------------------------|
| `style.palette` | string | no       | Color palette to apply to the widget. |

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /graphing/event_stream
[2]: /graphing/dashboards/template_variables
[3]: /graphing/graphing_json/widget_json
[4]: /graphing/graphing_json/request_json
[5]: /graphing/graphing_json/widget_json/#y-axis-schema
[6]: /graphing/graphing_json/widget_json/#events-schema
