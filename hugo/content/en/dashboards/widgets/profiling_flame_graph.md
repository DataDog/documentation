---
title: Profiling Flame Graph Widget
description: "Visualize resource consumption across profiled code paths."
widget_type: "flame_graph"
aliases:
- /video-categories/flamegraph/
further_reading:
- link: "/profiler/profile_visualizations/"
  tag: "Documentation"
  text: Learn about Profile visualizations
- link: "/dashboards/graphing_json/"
  tag: "Documentation"
  text: "Building Dashboards using JSON"
---

## Overview

{{< img src="dashboards/widgets/profiling_flame_graph/profiling_flame_graph_2.png" alt="Profiling Flame Graph" >}}

The [profiling flame graph][1] visualizes stack traces collected by Continuous Profiler. Each frame represents a unit of code, such as a method or line. The width of a frame represents its share of the selected profile metric, and the frames on the next row represent code called by the frame above. Use the widget to identify resource-intensive code paths across your profiled applications.

## Setup
 
 {{< img src="dashboards/widgets/profiling_flame_graph/profiling_flame_graph_config_2.png" alt="Graph your data section in the profiling flame graph widget configuration" style="width:100%;" >}}

### Graph your data

1. In the search field, scope your profiling data with tags. For example, `host`, `container_name`, `service`, `env`, or `version`.
2. In the {{< ui >}}Show{{< /ui >}} menu, select a profile type. The [available profile types][2] depend on the language.
3. In the {{< ui >}}by{{< /ui >}} menu, select the frame granularity, such as method or line.
4. Use the {{< ui >}}color by{{< /ui >}} and {{< ui >}}sort{{< /ui >}} menus to select how the frames are shaded and ordered.
5. Use the scope sections to refine the flame graph:
   - {{< ui >}}Scope to methods{{< /ui >}}: Select the methods to include. The name of this section changes based on the granularity selected in the {{< ui >}}by{{< /ui >}} menu.
   - {{< ui >}}Scope to endpoints{{< /ui >}}: Filter to a specific endpoint. Select `per Minute by Endpoint` to view total resource consumption or `per Endpoint Call` to view resource consumption per request.

### Set time preferences

Select {{< ui >}}Global dashboard time{{< /ui >}} to use the dashboard's timeframe, or select {{< ui >}}Custom time{{< /ui >}} to set a timeframe for the widget.

**Note**: Notebooks retain flame graph data for one year when the widget uses a fixed {{< ui >}}Custom time{{< /ui >}} range. The range must be within the [8-day profiling data retention period][5] when you create the widget.

### Add a title and description

Give your graph a title or leave the box blank for the suggested title. You can also add an optional description. Click {{< ui >}}Save{{< /ui >}}.

## Interact with the widget

Hover over a frame to view its profile values. Select a frame to focus on its code path. To investigate the profile in more detail, click the open in full page icon in the upper-right corner of the flame graph.

## API

This widget can be used with the **[Dashboards API][3]**. See the [widget JSON schema definition][4].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /profiler/profile_visualizations/#flame-graph
[2]: /profiler/profile_types/
[3]: /api/latest/dashboards/
[4]: /dashboards/graphing_json/widget_json/
[5]: /data_security/data_retention_periods/
