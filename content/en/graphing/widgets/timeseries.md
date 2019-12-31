---
title: Timeseries Widget
kind: documentation
description: "Display the evolution of one or more metrics, log events, Analyzed Spans, or process metrics over time."
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
- link: "https://www.datadoghq.com/blog/full-screen-graphs"
  tag: "Blog"
  text: "Explore your data in full-screen graph mode"
---

The timeseries visualization allows you to display the evolution of one or more metrics, log events, or Analyzed Spans over time. The time window depends on what is selected on the [timeboard][1] or [screenboard][2]:

{{< img src="graphing/widgets/timeseries/timeseries.png" alt="Timeseries" responsive="true">}}

## Setup

{{< img src="graphing/widgets/timeseries/timeseries_setup.png" alt="Timeseries setup" responsive="true" style="width:80%;" >}}

### Configuration

1. Choose the data to graph:
    * Metric: See [the main graphing documentation][3] to configure a metric query.
    * Analyzed Spans: See [the trace search documentation][4] to configure an Analyzed Span query.
    * Log Events: See [the log search documentation][5] to configure an Analyzed Span query.

2. Customize your graph with the available [options](#options).

### Options

#### Line graphs

Line graphs include two additional parameters:

| Parameter | Options               |
|-----------|-----------------------|
| Style     | Solid, Dashed, Dotted |
| Stroke    | Normal, Thin, Thick   |

#### Appearance

Graphs can be displayed as areas, bars, or lines. For all graph types, Datadog offers various color options to differentiate multiple metrics displayed on the same graph:

| Palette | Description                                                                                              |
|---------|----------------------------------------------------------------------------------------------------------|
| Classic | The simple colors light blue, dark blue, light purple, purple, light yellow, and yellow (colors repeat). |
| Cool    | A gradient color scheme made from green and blue.                                                        |
| Warm    | A gradient color scheme made from yellow and orange.                                                     |
| Purple  | A gradient color scheme made from purple.                                                                |
| Orange  | A gradient color scheme made from orange.                                                                |
| Gray    | A gradient color scheme made from gray.                                                                  |

For line graphs, different metrics can be assigned specific palettes by separating the queries in JSON.

#### Metric aliasing

Each query or formula can be aliased. The alias overrides the display on the graph and legend, which is useful for long metric names. At the end of the query/formula click on **as...**, then enter your metric alias:

{{< img src="graphing/index/metric_alias.png" alt="metric alias" responsive="true" style="width:75%;" >}}

##### Event Overlay

Add events from related systems to add more context to your graph. For example, you can add GitHub commits, Jenkins deploys, or Docker creation events. Expand the **Event Overlays** section and enter a query to display those events. Use the same query format as for the [Event Stream][6], for example:

| Query                       | Description                                                |
|-----------------------------|------------------------------------------------------------|
| `sources:jenkins`           | Shows all events from the Jenkins source.                  |
| `tag:role:web`              | Shows all events with the tag `role:web`.                  |
| `tags:$<TEMPLATE_VARIABLE>` | Shows all events from the selected [Template Variable][7]. |

##### Y-axis controls

Y-axis controls are available via the UI and the JSON editor. They allow you to:

* Clip the y-axis to specific ranges.
* Automatically change y-axis bounds based on a percentage or an absolute value threshold. This threshold can be applied to one of both ends of the graph (lower and upper) in order to remove "outliers" series.
* Change the y-axis scale from linear to log, pow, or sqrt.

Change the Y-axis scale by expanding the *Y-Axis Controls* button.

The following configuration options are available:

| Option                | Required | Description                                                                                                                                                                                                       |
|-----------------------|----------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `Min`/`Max`           | No       | Specify the minimum and/or maximum value to show on y-axis. It takes a number or `Auto` as the default value.                                                                                                     |
| `Scale`               | No       | Specifies the scale type. Possible values:<br>- *linear*: A linear scale (default)<br>- *log*: A logarithmic scale<br>- *pow*: A Power of 2 scale (2 is default, modify in JSON)<br>- *sqrt*: A square root scale |
| `Always include zero` | No       | Always include zero or fit the axis to the data range. The default is to always include zero.                                                                                                                     |

**Note**: Because the mathematical log function doesn't accept negative values, the Datadog log scale only works if values are of the same sign (everything > 0 or everything < 0). Otherwise an empty graph is returned.

## Full screen

In addition to the [standard full screen options][8], you can apply quick functions, compare to previous time periods, adjust the Y scale, save changes, or save as a new graph.

See [Explore your data in full-screen graph mode][9], to learn more.

## API

The dedicated [widget JSON schema definition][10] for the timeseries widget is:

```text
TIMESERIES_SCHEMA = {
    "type": "object",
    "properties": {
        "type": {"enum": ["timeseries"]},
        "requests": {
            "type":    "array",
            "items":   REQUEST_SCHEMA,
            "minItems": 1
        },
        "yaxis":   AXIS_SCHEMA,
        "events":  EVENTS_SCHEMA,
        "markers": MARKERS_SCHEMA,
        "title":   {"type": "string"},
        "show_legend": {"type": "boolean"}
    },
    "required": ["type", "requests"],
    "additionalProperties": false
}
```

| Parameter     | Type             | Required | Description                                                                                                                                               |
|---------------|------------------|----------|-----------------------------------------------------------------------------------------------------------------------------------------------------------|
| `type`        | string           | yes      | Type of widget, for the timeseries widget use `timeseries`.                                                                                               |
| `requests`    | array of objects | yes      | Array of `request` object to display in the widget. See the dedicated [Request JSON schema documentation][11] to learn how to build the `REQUEST_SCHEMA`. |
| `yaxis`       | object           | no       | Y-axis control options. See the dedicated [Y-axis JSON schema documentation][12] to learn how to build the `AXIS_SCHEMA`.                                 |
| `events`      | object           | no       | Event overlay control options. See the dedicated [Events JSON schema documentation][13] to learn how to build the `EVENTS_SCHEMA`                         |
| `markers`     | object           | no       | Markers overlay control options. See the dedicated [Markers JSON schema documentation][14] to learn how to build the `MARKERS_SCHEMA`                     |
| `title`       | string           | no       | Title of your widget.                                                                                                                                     |
| `show_legend` | boolean          | no       | (screenboard only) Show the legend for this widget                                                                                                        |

Additional properties allowed in each `request` object:

```json
{
    "style": {
        "type": "object",
        "properties": {
            "palette":    {"type": "string"},
            "line_type":  {"enum": ["dashed", "dotted", "solid"]},
            "line_width": {"enum": ["normal", "thick", "thin"]}
        },
        "additionalProperties": false
    },
    "metadata": {
        "type": "array",
        "items": {
            "type": "object",
            "properties": {
                "expression": {"type": "string"},
                "alias_name": {"type": "string"}
            },
            "required": ["expression"],
            "additionalProperties": false
        }
    },
    "display_type": {"enum": ["area", "bars", "line"]}
}
```

| Parameter          | Type   | Required | Description                                                                              |
|--------------------|--------|----------|------------------------------------------------------------------------------------------|
| `style.palette`    | string | no       | Color palette to apply to the widget.                                                    |
| `style.line_type`  | string | no       | Type of lines displayed. Available values are: `dashed`, `dotted`, or `solid`.           |
| `style.line_width` | string | no       | Width of line displayed. Available values are: `normal`, `thick`, or `thin`.             |
| `metadata`         | object | no       | Used to define expression aliases.                                                       |
| `display_type`     | string | no       | Type of display to use for the request. Available values are: `area`, `bars`, or `line`. |

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /graphing/dashboards/timeboard
[2]: /graphing/dashboards/screenboard
[3]: /graphing
[4]: /tracing/app_analytics/search/#search-bar
[5]: https://docs.datadoghq.com/logs/explorer/search/#search-syntax
[6]: /graphing/event_stream
[7]: /graphing/dashboards/template_variables
[8]: /graphing/widgets/#full-screen
[9]: https://www.datadoghq.com/blog/full-screen-graphs
[10]: /graphing/graphing_json/widget_json
[11]: /graphing/graphing_json/request_json
[12]: /graphing/graphing_json/widget_json/#y-axis-schema
[13]: /graphing/graphing_json/widget_json/#events-schema
[14]: /graphing/graphing_json/widget_json/#markers-schema
