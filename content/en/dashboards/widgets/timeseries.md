---
title: Timeseries Widget
kind: documentation
widget_type: timeseries
description: "Display the evolution of one or more metrics, log events, indexed spans, or process metrics over time."
aliases:
    - /graphing/widgets/timeseries/
    - /dashboards/widgets/network/
    - /graphing/widgets/network/
further_reading:
- link: "https://www.datadoghq.com/blog/full-screen-graphs"
  tag: "Blog"
  text: "Explore your data in full-screen graph mode"
- link: "/dashboards/graphing_json/"
  tag: "Documentation"
  text: "Building Dashboards using JSON"
- link: "/dashboards/guide/slo_data_source"
  tag: "Guide"
  text: "Graph historical SLO data on Dashboards"
---

The timeseries visualization allows you to display the evolution of one or more metrics, log events, or Indexed Spans over time. The time window depends on what is selected on the [timeboard][1] or [screenboard][2]:

{{< img src="dashboards/widgets/timeseries/timeseries.png" alt="A timeseries widget showing the average system.cpu.user for a host" style="width:90%;" >}}

## Setup

### Configuration

{{< img src="dashboards/widgets/timeseries/timeseries_setup.png" alt="Timeseries setup" style="width:90%;" >}}

1. Choose the data to graph:
   * Metric: See the [Querying documentation][3] to configure a metric query.
   * Indexed Spans: See the [Trace search documentation][4] to configure an Indexed Span query.
   * Log Events: See the [Log search documentation][5] to configure a log event query.

2. Customize your graph with the available [options](#display-options).

## Display options

Graphs can be displayed as lines, areas, and bars. Line graphs contain additional parameters:

| Parameter | Options                  |
|-----------|--------------------------|
| Style     | Solid, dashed, or dotted |
| Stroke    | Normal, thin, or thick   |

### Color

For all graph types, Datadog offers various color options to differentiate multiple metrics displayed on the same graph:

| Palette     | Description                                                                                                 |
|-------------|-------------------------------------------------------------------------------------------------------------|
| Classic     | The simple colors light blue, dark blue, light purple, purple, light yellow, and yellow (colors repeat).    |
| Consistent | Using a set of 16 colors, applies a consistent color for each series of data across all widgets for each tag group. |

For line graphs, different metrics can be assigned specific palettes by separating the queries in JSON. For more information, see the guide for [Selecting the right colors for your graphs][6].

### Sorting

Order the graph by **Tags** or by **Values** to sort timeseries legends and stacked graphs. This only sorts the graph visualization, and does not impact the query. Toggle the **Reverse** option to sort by reverse alphabetical order or by descending values. 

### Metric aliasing

Each query or formula, along with any [filtering tags][7], can be aliased. The alias overrides the display on the graph and legend, which is useful for long metric names or long lists of filters. At the end of your query or formula, click on **as...** and enter your metric alias:

{{< img src="dashboards/widgets/timeseries/metric_alias.png" alt="Adding an alias to a search query in the Timeseries widget editor" style="width:100%;" >}}

### Event overlay

The event overlay supports all data sources. This allows for easier correlation between business events and data from any Datadog service.

With the event overlay, you can see how actions within the organization impact application and infrastructure performance. Here are some example use cases:
- RUM error rates with deployment events overlaid
- Correlating CPU usage with events related to provisioning extra servers
- Correlating egress traffic with suspicious login activity
- Correlating any timeseries data with monitor alerts to ensure that Datadog has been configured with the appropriate alerts

{{< img src="/dashboards/querying/event_overlay_example.png" alt="Timeseries widgets showing RUM error rates with deployment events overlaid" style="width:100%;" >}}

You can add events from related systems to add more context to your graph, such as GitHub commits, Jenkins deploys, and Docker creation events. Click **Add Event Overlay** in the **Event Overlays** section and enter a query to display those events.

Use the same query format as for the [Event Explorer][8], for example:

| Query                       | Description                                                |
|-----------------------------|------------------------------------------------------------|
| `sources:jenkins`           | Shows all events from the Jenkins source.                  |
| `tag:role:web`              | Shows all events with the `role:web` tag.                  |
| `tags:$<TEMPLATE_VARIABLE>` | Shows all events from the selected [template variable][9]. |

### Markers

To add markers for additional data sets, click **Add Marker** in the **Markers** section.

1. Select a Line or Range and input a value or a range or values.
2. In the **Show as** field, select an alerting status/color and choose from a solid, bold, or dashed horizontal line.
3. To add a label that displays on the bottom left of the timeseries widget, define a value for the Y-Axis and click the **Label** checkbox.

### Y-Axis controls

Y-axis controls are available in the UI and in the JSON editor. You can set the value and type of the y-axis to:

* Clip the y-axis to specific ranges.
* Automatically change y-axis bounds based on an absolute value threshold. This threshold can be applied to one or both ends of the graph (lower and upper) to remove the "outlier" series.
* Change the y-axis scale from linear to log, pow, or sqrt.

The following configuration options are available:

| Option                | Required | Description                                                                                                                                                                                                               |
|-----------------------|----------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `Min`                 | No       | Specify the minimum value to show on the y-axis. It takes a number or `Auto` as the default value.                                                                                                                |
| `Max`                 | No       | Specify the maximum value to show on the y-axis. It takes a number or `Auto` as the default value.                                                                                                                        |
| `Scale`               | No       | Specifies the scale type. Possible values include:<br>- *linear*: A linear scale (default).<br>- *log*: A logarithmic scale.<br>- *pow*: A Power of 2 scale (2 is default, modify in JSON).<br>- *sqrt*: A square root scale. |
| `Always include zero` | No       | Always include zero or fit the y-axis to the data range. The default is to always include zero.                                                                                                                             |

Because the mathematical log function does not accept negative values, the Datadog log scale only works if values are of the same sign (everything > 0 or everything < 0). Otherwise, an empty graph is returned.

### Legend configuration

You can add configurable legends to your screenboards by selecting from the following options in the **Legend** section:

* Automatic (default)
* Compact
* Expanded: Configurable columns for value, avg, sum, min, and max
* None

For timeboards, legends display automatically when a dashboard is set to L or XL.

### Context links

To add a context link in the dropdown menu that appears when you click in a dashboard widget, click **Add a Context Link** in the **Context Links** section.

For more information about editing and deleting context links, see [Context Links][10].

### Full screen

In addition to the [standard full screen options][11], you can apply quick functions, compare to previous time periods, adjust the Y scale, save changes, or save as a new graph.

For more information, see [Explore your data in full-screen graph mode][12].

## API

This widget can be used with the **[Dashboards API][13]**. See the following table for the [widget JSON schema definition][14]:

{{< dashboards-widgets-api >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /dashboards/#timeboards
[2]: /dashboards/#screenboards
[3]: /dashboards/querying/
[4]: /tracing/trace_explorer/query_syntax/#search-bar
[5]: /logs/search_syntax/
[6]: /dashboards/guide/widget_colors/
[7]: /dashboards/querying/#filter
[8]: /events/
[9]: /dashboards/template_variables/
[10]: /dashboards/guide/context-links/
[11]: /dashboards/widgets/#full-screen
[12]: https://www.datadoghq.com/blog/full-screen-graphs
[13]: /api/latest/dashboards/
[14]: /dashboards/graphing_json/widget_json/
