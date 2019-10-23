---
title: Widgets
kind: documentation
aliases:
    - /graphing/dashboards/widgets
    - /graphing/faq/widgets
---

## Overview

{{< whatsnext desc="Choose a widget to learn how to use it in Datadog and through the API:">}}
    {{< nextlink href="/graphing/widgets/alert_graph" >}}Alert Graph{{< /nextlink >}}
    {{< nextlink href="/graphing/widgets/alert_value" >}}Alert Value{{< /nextlink >}}
    {{< nextlink href="/graphing/widgets/change" >}}Change{{< /nextlink >}}
    {{< nextlink href="/graphing/widgets/check_status" >}}Check Status{{< /nextlink >}}
    {{< nextlink href="/graphing/widgets/distribution" >}}Distribution{{< /nextlink >}}
    {{< nextlink href="/graphing/widgets/event_stream" >}}Event Stream{{< /nextlink >}}
    {{< nextlink href="/graphing/widgets/event_timeline" >}}Event Timeline{{< /nextlink >}}
    {{< nextlink href="/graphing/widgets/free_text" >}}Free Text{{< /nextlink >}}
    {{< nextlink href="/graphing/widgets/group" >}}Group{{< /nextlink >}}
    {{< nextlink href="/graphing/widgets/heat_map" >}}Heat Map{{< /nextlink >}}
    {{< nextlink href="/graphing/widgets/hostmap" >}}Hostmap{{< /nextlink >}}
    {{< nextlink href="/graphing/widgets/iframe" >}}Iframe{{< /nextlink >}}
    {{< nextlink href="/graphing/widgets/image" >}}Image{{< /nextlink >}}
    {{< nextlink href="/graphing/widgets/log_stream" >}}Log Stream{{< /nextlink >}}
    {{< nextlink href="/graphing/widgets/monitor_summary" >}}Monitor Summary{{< /nextlink >}}
    {{< nextlink href="/graphing/widgets/network" >}}Network{{< /nextlink >}}
    {{< nextlink href="/graphing/widgets/note" >}}Notes and Links{{< /nextlink >}}
    {{< nextlink href="/graphing/widgets/query_value" >}}Query Value{{< /nextlink >}}
    {{< nextlink href="/graphing/widgets/scatter_plot" >}}Scatter Plot{{< /nextlink >}}
    {{< nextlink href="/graphing/widgets/slo" >}}Service Level Objective (SLO){{< /nextlink >}}
    {{< nextlink href="/graphing/widgets/service_map" >}}Service Map{{< /nextlink >}}
    {{< nextlink href="/graphing/widgets/service_summary" >}}Service Summary{{< /nextlink >}}
    {{< nextlink href="/graphing/widgets/table" >}}Table{{< /nextlink >}}
    {{< nextlink href="/graphing/widgets/timeseries" >}}Timeseries{{< /nextlink >}}
    {{< nextlink href="/graphing/widgets/top_list" >}}Top List{{< /nextlink >}}
{{< /whatsnext >}}

## Full screen

Most widgets have a full screen mode. To access this view, click on the full-screen button in the upper right-hand side of the widget.

In full screen mode, you can:

* Change time frames
* Move backward or forward by the time frame selected
* Pause the graph at the current time or view the live graph
* Reset the time frame
* Export the graph to a dashboard, notebook, or copy the query

Additional options are available for [timeseries widgets][1].

## Copy / paste widgets

Widgets can be copied on [Dashboards][2], [Notebooks][3], [APM Service][4], and the [APM resource][5] page by using `Ctrl + C` (`Cmd + C` for Mac).

The copied widget can be pasted within Datadog by using `Ctrl + V` (`Cmd + V` for Mac) on:

* **Dashboards**: Adds a new widget positioned under your mouse cursor.
* **Notebooks**: Adds a new cell at the end of the notebook.

A copied widget can also be shared outside of Datadog as a static image stored in the same Datadog datacenter as your Datadog site (US or EU).

[1]: /graphing/widgets/timeseries#full-screen
[2]: /graphing/dashboards
[3]: /graphing/notebooks
[4]: /tracing/visualization/service
[5]: /tracing/visualization/resource
