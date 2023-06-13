---
title: Widgets
kind: documentation
aliases:
    - /graphing/dashboards/widgets
    - /graphing/faq/widgets
    - /graphing/widgets
further_reading:
    - link: '/dashboards/guide/context-links/'
      tag: 'Documentation'
      text: 'Custom Links'

---

## Overview

Widgets are building blocks for your dashboards. They allow you to visualize and correlate your data across your infrastructure.

### Graphs
{{< whatsnext desc="Generic widgets to graph data from Datadog products: ">}}
    {{< nextlink href="/dashboards/widgets/change" >}}<img src="/images/dashboards/widgets/icons/change_light_large.png" /> Change{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/distribution" >}}<img src="/images/dashboards/widgets/icons/distribution_light_large.png" /> Distribution{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/funnel" >}}<img src="/images/dashboards/widgets/icons/funnel_light_large.png" /> Funnel{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/geomap" >}}<img src="/images/dashboards/widgets/icons/geomap_light_large.png" /> Geomap{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/heat_map" >}}<img src="/images/dashboards/widgets/icons/heatmap_light_large.png" /> Heatmap{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/pie_chart" >}}<img src="/images/dashboards/widgets/icons/pie_light_large.png" /> Pie Chart{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/query_value" >}}<img src="/images/dashboards/widgets/icons/query-value_light_large.png" /> Query Value{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/scatter_plot" >}}<img src="/images/dashboards/widgets/icons/scatter-plot_light_large.png" /> Scatter Plot{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/table" >}}<img src="/images/dashboards/widgets/icons/table_light_large.png" /> Table{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/treemap" >}}<img src="/images/dashboards/widgets/icons/treemap_light_large.png" /> Treemap{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/timeseries" >}}<img src="/images/dashboards/widgets/icons/timeseries_light_large.png" /> Timeseries{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/top_list" >}}<img src="/images/dashboards/widgets/icons/top-list_light_large.png" /> Top List{{< /nextlink >}}
{{< /whatsnext >}}

### Groups
{{< whatsnext desc="Display your widgets under groups: ">}}
    {{< nextlink href="/dashboards/widgets/group" >}}<img src="/images/dashboards/widgets/icons/placeholder_light_large.png" /> Group{{< /nextlink >}}
{{< /whatsnext >}}

### Annotations and embeds
{{< whatsnext desc="Decoration widgets to visually structure and annotate dashboards: ">}}
    {{< nextlink href="/dashboards/widgets/free_text" >}}<img src="/images/dashboards/widgets/icons/free-text_light_large.png" /> Free Text{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/iframe" >}}<img src="/images/dashboards/widgets/icons/iframe_light_large.png" /> Iframe{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/image" >}}<img src="/images/dashboards/widgets/icons/image_light_large.png" /> Image{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/note" >}}<img src="/images/dashboards/widgets/icons/notes_light_large.png" /> Notes and Links{{< /nextlink >}}
{{< /whatsnext >}}

### Lists and streams
{{< whatsnext desc="Display a list of events and issues coming from different sources: ">}}
    {{< nextlink href="/dashboards/widgets/list" >}}<img src="/images/dashboards/widgets/icons/change_light_large.png" /> List{{< /nextlink >}}
{{< /whatsnext >}}

### Alerting and response
{{< whatsnext desc="Summary widgets to display Monitoring information: ">}}
    {{< nextlink href="/dashboards/widgets/alert_graph" >}}<img src="/images/dashboards/widgets/icons/alert-graph_light_large.png" /> Alert Graph{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/alert_value" >}}<img src="/images/dashboards/widgets/icons/alert-value_light_large.png" /> Alert Value{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/check_status" >}}<img src="/images/dashboards/widgets/icons/check-status_light_large.png" /> Check Status{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/monitor_summary" >}}<img src="/images/dashboards/widgets/icons/monitor-summary_light_large.png" /> Monitor Summary{{< /nextlink >}}
{{< /whatsnext >}}

### Architecture
{{< whatsnext desc="Visualize infrastructure and architecture data: ">}}
    {{< nextlink href="/dashboards/widgets/hostmap" >}}<img src="/images/dashboards/widgets/icons/host-map_light_large.png" /> Hostmap{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/topology_map" >}}<img src="/images/dashboards/widgets/icons/service-map_light_large.png" /> Topology Map{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/service_summary" >}}<img src="/images/dashboards/widgets/icons/service-summary_light_large.png" /> Service Summary{{< /nextlink >}}
{{< /whatsnext >}}

### Performance and reliability
{{< whatsnext desc="Site reliability visualizations: ">}}
    {{< nextlink href="/dashboards/widgets/slo" >}}<img src="/images/dashboards/widgets/icons/slo-summary_light_large.png" /> Service Level Objective (SLO) Summary{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/slo_list" >}}<img src="/images/dashboards/widgets/icons/slo-list_light_large.png" /> Service Level Objective (SLO) List{{< /nextlink >}}
{{< /whatsnext >}}

## Full screen

You can view most widgets in full screen mode and do the following:

* Change time frames
* Move backward or forward by the time frame selected
* Pause the graph at the current time or view the live graph
* Reset the time frame
* Export the graph to a dashboard, notebook, or copy the query
* Download the data producing the graph in a CSV format

To access the widget overview directly, click the full-screen button on the top right-hand corner of the widget.

Additional options are available for [timeseries widgets][1].

## Custom links

Custom links connect data values to URLs such as a Datadog page or your AWS console.

To customize interactions with data inline your generic widgets, see [Custom Links][2].

## Copy and paste widgets

Widgets can be copied on [Dashboards][3], [Notebooks][4], [APM Service][5], and the [APM resource][6] page by using `Ctrl + C` (`Cmd + C` for Mac), or by selecting the share icon and choosing "Copy".

The copied widgets can be pasted within Datadog by using `Ctrl + V` (`Cmd + V` for Mac) on:

* **Dashboards**: Adds a new widget positioned under your mouse cursor.
* **Notebooks**: Adds a new cell at the end of the notebook.

You can also paste the widget into your favorite chat program that displays link previews (like Slack or Microsoft Teams). This displays a snapshot image of your graph along with a direct link to your widget.

### Groups of widgets

Timeboard group widgets can be copied by hovering over the group widget area and using `Ctrl + C` (`Cmd + C` for Mac) or by selecting the share icon and choosing "Copy".

**Note**: When pasting graphs to screenboards or notebooks, individual widgets within the group are pasted.

To copy multiple screenboard widgets (edit mode only), `shift + click` on the widgets and use `Ctrl + C` (`Cmd + C` for Mac).

**Note**: This only works when sharing within Datadog. It does not generate a preview image.

## Export graphs

### PNG

To download a widget in PNG format, click the export button in the upper right hand side of the widget, and select **Download as PNG**.

### CSV

To download data from a timeseries, table, or top list widget in CSV format, click the export button in the upper right hand side of the widget, and select **Download as CSV**.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /dashboards/widgets/timeseries/#full-screen
[2]: /dashboards/guide/context-links/
[3]: /dashboards/
[4]: /notebooks/
[5]: /tracing/services/service_page/
[6]: /tracing/services/resource_page/
