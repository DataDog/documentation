---
title: Timeseries Widget
kind: documentation
description: "Display the evolution of one or more metrics, log events, Indexed Spans, or process metrics over time."
aliases:
    - /graphing/widgets/timeseries/
further_reading:
- link: "/dashboards/timeboards/"
  tag: "Documentation"
  text: "Timeboards"
- link: "/dashboards/screenboards/"
  tag: "Documentation"
  text: "Screenboard"
- link: "/dashboards/graphing_json/"
  tag: "Documentation"
  text: "Building Dashboard using JSON"
- link: "https://www.datadoghq.com/blog/full-screen-graphs"
  tag: "Blog"
  text: "Explore your data in full-screen graph mode"
---

The timeseries visualization allows you to display the evolution of one or more metrics, log events, or Indexed Spans over time. The time window depends on what is selected on the [timeboard][1] or [screenboard][2]:

{{< img src="dashboards/widgets/timeseries/timeseries.png" alt="Timeseries" >}}

## Setup

{{< img src="dashboards/widgets/timeseries/timeseries_setup.png" alt="Timeseries setup"  style="width:80%;" >}}

### Configuration

1. Choose the data to graph:
    * Metric: See the documentation [querying][3] to configure a metric query.
    * Indexed Spans: See [the trace search documentation][4] to configure an Indexed Span query.
    * Log Events: See [the log search documentation][5] to configure a log event query.

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

{{< img src="dashboards/querying/metric_alias.png" alt="metric alias"  style="width:75%;" >}}

##### Event overlay

Add events from related systems to add more context to your graph. For example, you can add GitHub commits, Jenkins deploys, or Docker creation events. Expand the **Event Overlays** section and enter a query to display those events. Use the same query format as for the [Event Stream][6], for example:

| Query                       | Description                                                |
|-----------------------------|------------------------------------------------------------|
| `sources:jenkins`           | Shows all events from the Jenkins source.                  |
| `tag:role:web`              | Shows all events with the tag `role:web`.                  |
| `tags:$<TEMPLATE_VARIABLE>` | Shows all events from the selected [Template Variable][7]. |

Once enabled, events are overlayed on your graphs with red bars:

{{< img src="dashboards/widgets/timeseries/event_overlay.png" alt="Event overlay"  style="width:75%;" >}}

##### Y-axis controls

Y-axis controls are available via the UI and the JSON editor. They allow you to:

* Add a second y-axis for visualizations that include more than one data set.
* Clip the y-axis to specific ranges.
* Automatically change y-axis bounds based on a percentage or an absolute value threshold. This threshold can be applied to one of both ends of the graph (lower and upper) in order to remove "outliers" series.
* Change the y-axis scale from linear to log, pow, or sqrt.

If your visualization includes more than one data set, you can add a second y-axis by expanding the *Y-axis controls* button. Click on *+ Add right y-axis* and then specify which side each metric’s y-axis will correspond to under each metric’s configuration options. On the graph, you can isolate which part of the visualization corresponds with which y-axis by hovering over the y-axis of interest.

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

This widget can be used with the **Dashboards API**. Refer to the [Dashboards API][10] documentation for additional reference.

The dedicated [widget JSON schema definition][11] for the timeseries widget is:

{{< dashboards-widgets-api >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /dashboards/timeboard/
[2]: /dashboards/screenboard/
[3]: /dashboards/querying/
[4]: /tracing/app_analytics/search/#search-bar
[5]: /logs/search_syntax/
[6]: /events/
[7]: /dashboards/template_variables/
[8]: /dashboards/widgets/#full-screen
[9]: https://www.datadoghq.com/blog/full-screen-graphs
[10]: /api/v1/dashboards/
[11]: /dashboards/graphing_json/widget_json/
