---
title: Widgets
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
    {{< nextlink href="/dashboards/widgets/change" 
        img="dashboards/widgets/icons/change_light_large.png">}} Change {{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/distribution"
        img="dashboards/widgets/icons/distribution_light_large.png">}} Distribution{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/funnel"
        img="dashboards/widgets/icons/funnel_light_large.png">}} Funnel{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/geomap" 
        img="dashboards/widgets/icons/geomap_light_large.png">}} Geomap{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/heat_map"
        img="dashboards/widgets/icons/heatmap_light_large.png">}} Heatmap{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/pie_chart"
        img="dashboards/widgets/icons/pie_light_large.png">}} Pie Chart{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/query_value"
        img="dashboards/widgets/icons/query-value_light_large.png">}} Query Value{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/scatter_plot"
        img="dashboards/widgets/icons/scatter-plot_light_large.png">}} Scatter Plot{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/table"
        img="dashboards/widgets/icons/table_light_large.png">}} Table{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/treemap"
        img="dashboards/widgets/icons/treemap_light_large.png">}} Treemap{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/timeseries"
        img="dashboards/widgets/icons/timeseries_light_large.png">}} Timeseries{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/top_list"
        img="dashboards/widgets/icons/top-list_light_large.png">}} Top List{{< /nextlink >}}
{{< /whatsnext >}}

### Groups
{{< whatsnext desc="Display your widgets under groups: ">}}
    {{< nextlink href="/dashboards/widgets/group"
        img="dashboards/widgets/icons/group_default_light_large.svg">}} Group{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/powerpack"
        img="dashboards/widgets/icons/group_powerpack_light_large.svg">}} Powerpack{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/split_graph"
        img="dashboards/widgets/icons/group-split_light_small.svg">}} Split Graph{{< /nextlink >}}
{{< /whatsnext >}}

### Annotations and embeds
{{< whatsnext desc="Decoration widgets to visually structure and annotate dashboards: ">}}
    {{< nextlink href="/dashboards/widgets/free_text" 
        img="dashboards/widgets/icons/free-text_light_large.png">}} Free Text{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/iframe" 
        img="dashboards/widgets/icons/iframe_light_large.png">}} Iframe{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/image" 
        img="dashboards/widgets/icons/image_light_large.png">}} Image{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/note" 
        img="dashboards/widgets/icons/notes_light_large.png">}} Notes and Links{{< /nextlink >}}
{{< /whatsnext >}}

### Lists and streams
{{< whatsnext desc="Display a list of events and issues coming from different sources: ">}}
    {{< nextlink href="/dashboards/widgets/list"
        img="dashboards/widgets/icons/change_light_large.png">}} List{{< /nextlink >}}
{{< /whatsnext >}}

### Alerting and response
{{< whatsnext desc="Summary widgets to display Monitoring information: ">}}
    {{< nextlink href="/dashboards/widgets/alert_graph" 
        img="dashboards/widgets/icons/alert-graph_light_large.png">}} Alert Graph{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/alert_value" 
        img="dashboards/widgets/icons/alert-value_light_large.png">}}Alert Value{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/check_status" 
        img="dashboards/widgets/icons/check-status_light_large.png">}} Check Status{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/monitor_summary" 
        img="dashboards/widgets/icons/monitor-summary_light_large.png">}} Monitor Summary{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/run_workflow" 
        img="dashboards/widgets/icons/run-workflow_light_small.svg">}} Run Workflow{{< /nextlink >}}
{{< /whatsnext >}}

### Architecture
{{< whatsnext desc="Visualize infrastructure and architecture data: ">}}
    {{< nextlink href="/dashboards/widgets/hostmap" 
        img="dashboards/widgets/icons/host-map_light_large.png">}} Hostmap{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/topology_map" 
        img="dashboards/widgets/icons/service-map_light_large.png">}} Topology Map{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/service_summary" 
        img="dashboards/widgets/icons/service-summary_light_large.png">}} Service Summary{{< /nextlink >}}
{{< /whatsnext >}}

### Performance and reliability
{{< whatsnext desc="Site reliability visualizations: ">}}
    {{< nextlink href="/dashboards/widgets/profiling_flame_graph"
        img="dashboards/widgets/icons/profiling_flame_graph.svg">}} Profiling Flame Graph{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/slo" 
        img="dashboards/widgets/icons/slo-summary_light_large.png">}} Service Level Objective (SLO) Summary{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/slo_list" 
        img="dashboards/widgets/icons/slo-list_light_large.png">}} Service Level Objective (SLO){{< /nextlink >}}
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

## Unit override

Customize unit values displayed on widgets to add context to your data. For more use cases and information, see the [Customize your visualizations with unit overrides][3].
- **Unit override**: choose to display units in the family of 'memory', and have Datadog take care of displaying the appropriate scale depending on data (such as megabytes or gigabytes).
- **Unit and scale override**: fix units to a single scale (display data in megabytes regardless of value).
- **Define custom units**: define completely custom units (like 'tests' instead of a generic count).

This is not an alternative for assigning units to your data.
{{< whatsnext desc="Set units at the organization level: ">}}
    {{< nextlink href="/metrics/units/">}} Set Metrics Units{{< /nextlink >}}
    {{< nextlink href="/logs/explorer/facets/#units">}} Set units for Event-based queries{{< /nextlink >}}
{{< /whatsnext >}}

## Global time selector

To use the global time selector, at least one time-based widget must be set to use `Global Time`. Make the selection in the widget editor under **Set display preferences**, or add a widget (global time is the default time setting).

The global time selector sets the same time frame for all widgets using the `Global Time` option on the same dashboard. Select a moving window in the past (for example, `Past 1 Hour` or `Past 1 Day`) or a fixed period with the `Select from calendar…` option or [enter a custom time frame][11]. If a moving window is chosen, the widgets are updated to move along with the time window.

Widgets not linked to global time show the data for their local time frame as applied to the global window. For example, if the global time selector is set to January 1, 2019 through January 2, 2019, a widget set with the local time frame for `Past 1 Minute` shows the last minute of January 2, 2019 from 11:59 pm.

## Copy and paste widgets

<div class="alert alert-warning">You must have <a href="https://docs.datadoghq.com/account_management/rbac/permissions/#dashboards"><code>dashboard_public_share</code> permissions</a> and enable <a href="https://app.datadoghq.com/organization-settings/public-sharing/settings"><strong>Static Public Data Sharing</strong></a> in your Organization Settings to use this feature.</div>

Widgets can be copied on [Dashboards][4], [Notebooks][5], [APM Service][6], and the [APM resource][7] page by using `Ctrl + C` (`Cmd + C` for Mac), or by selecting the share icon and choosing "Copy".

The copied widgets can be pasted within Datadog by using `Ctrl + V` (`Cmd + V` for Mac) on:

* **Dashboards**: Adds a new widget positioned under your mouse cursor.
* **Notebooks**: Adds a new cell at the end of the notebook.

You can also paste the widget into your favorite chat program that displays link previews (like Slack or Microsoft Teams). This displays a snapshot image of your graph along with a direct link to your widget.

### Groups of widgets

Timeboard group widgets can be copied by hovering over the group widget area and using `Ctrl + C` (`Cmd + C` for Mac) or by selecting the share icon and choosing "Copy".

**Note**: When pasting graphs to screenboards or notebooks, individual widgets within the group are pasted.

To copy multiple screenboard widgets (edit mode only), `shift + click` on the widgets and use `Ctrl + C` (`Cmd + C` for Mac).

**Note**: This only works when sharing within Datadog. It does not generate a preview image.

## Widget graphs

### Export

| Format | Instructions            |
| -----  | ----------------------- |
| PNG    | To download a widget in PNG format, click the export button in the upper right hand side of the widget, and select **Download as PNG**. |
| CSV    | To download data from a timeseries, table, or top list widget in CSV format, click the export button in the upper right hand side of the widget, and select **Download as CSV**.|

### Graph menu

Click on any dashboard graph to open an options menu:

| Option                 | Description                                                        |
|------------------------|--------------------------------------------------------------------|
| Send snapshot          | Create and send a snapshot of your graph.                          |
| Find correlated metrics| Find correlations from APM services, integrations, and dashboards. |
| View in full screen    | View the graph in [full screen mode][5].                           |
| Lock cursor            | Lock the cursor in place on the page.                              |
| View related processes | Jump to the [Live Processes][6] page scoped to your graph.         |
| View related hosts     | Jump to the [Host Map][7] page scoped to your graph.               |
| View related logs      | Jump to the [Log Explorer][8] page scoped to your graph.           |
| View related traces    | Populate a [Traces][9] panel scoped to your graph.                 |
| View related profiles  | Jump to the [Profiling][10] page scoped to your graph.             |

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /dashboards/widgets/timeseries/#full-screen
[2]: /dashboards/guide/context-links/
[3]: /dashboards/guide/unit-override
[4]: /dashboards/
[5]: /notebooks/
[6]: /tracing/services/service_page/
[7]: /tracing/services/resource_page/
[8]: /logs/explorer/
[9]: /tracing/trace_explorer/
[10]: /profiler/profile_visualizations/
[11]: /dashboards/guide/custom_time_frames/
