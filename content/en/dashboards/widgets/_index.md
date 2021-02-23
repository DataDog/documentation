---
title: Widgets
kind: documentation
aliases:
    - /graphing/dashboards/widgets
    - /graphing/faq/widgets
    - /graphing/widgets
---

## Overview

{{< whatsnext desc="Choose a widget to learn how to use it in Datadog and through the API:">}}
    {{< nextlink href="/dashboards/widgets/alert_graph" >}}Alert Graph{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/alert_value" >}}Alert Value{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/change" >}}Change{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/check_status" >}}Check Status{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/distribution" >}}Distribution{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/event_stream" >}}Event Stream{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/event_timeline" >}}Event Timeline{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/free_text" >}}Free Text{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/geomap" >}}Geomap{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/group" >}}Group{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/heat_map" >}}Heat Map{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/hostmap" >}}Hostmap{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/iframe" >}}Iframe{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/image" >}}Image{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/log_stream" >}}Log Stream{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/monitor_summary" >}}Monitor Summary{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/network" >}}Network{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/note" >}}Notes and Links{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/query_value" >}}Query Value{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/scatter_plot" >}}Scatter Plot{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/slo" >}}Service Level Objective (SLO){{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/service_map" >}}Service Map{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/service_summary" >}}Service Summary{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/table" >}}Table{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/timeseries" >}}Timeseries{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/top_list" >}}Top List{{< /nextlink >}}
{{< /whatsnext >}}

## Full screen

Most widgets have a full screen mode. To access this view, click on the full-screen button in the upper right-hand side of the widget.

In full screen mode, you can:

* Change time frames
* Move backward or forward by the time frame selected
* Pause the graph at the current time or view the live graph
* Reset the time frame
* Export the graph to a dashboard, notebook, or copy the query
* Download the data producing the graph in a CSV format

Additional options are available for [timeseries widgets][1].

## Custom links
Most widgets have the custom link option in the on-click context menu. To add this functionality, edit your widget and select the **Custom Links** tab or choose **New custom link** from the on-click context menu.

Custom links help you connect a data value to a URL, like a Datadog page or your AWS console. They support template variables and tags or attributes used in the `group by` field.

### Examples

View related logs for a graph grouped by `region`:
```text
http://app.datadoghq.com/logs?query={{region}}
```

View related logs for a graph on a dashboard with the template variable `region`:
```text
http://app.datadoghq.com/logs?query={{$region.value}}
```

## Copy / paste widgets

Widgets can be copied on [Dashboards][2], [Notebooks][3], [APM Service][4], and the [APM resource][5] page by using `Ctrl + C` (`Cmd + C` for Mac), or by selecting the share icon and choosing "Copy".

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

To download a widget in PNG format, click the export button in the upper right hand side of the widget, and select “Download as PNG”.

### CSV

To download data from a timeseries, table, or toplist widget in CSV format, click the export button in the upper right hand side of the widget, and select “Download as CSV”.

[1]: /dashboards/widgets/timeseries/#full-screen
[2]: /dashboards/
[3]: /notebooks/
[4]: /tracing/visualization/service/
[5]: /tracing/visualization/resource/
