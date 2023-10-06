---
title: Profiling Flame Graph Widget
kind: documentation
description: "Graph a breakdown of top consuming lines of code (CPU, Memory, ...)"
widget_type: "flame_graph"
aliases:
- /graphing/widgets/profiling_flame_graph/
further_reading:
- link: "/dashboards/graphing_json/"
  tag: "Documentation"
  text: "Building Dashboards using JSON"
---

The [profiling flame graph visualization][1] represents a breakdown of top consuming lines of code (CPU, Memory, ...):

{{< img src="dashboards/widgets/profiling_flame_graph/profiling_flame_graph.png" alt="Profiling Flame Graph" >}}

## Setup

### Configuration

1. Select the scope for profiling data, such as `host`, `container_name`, `service`, `env` or `version`.
2. Select the resource, such as `CPU Time`, `Allocated Memory` or `Thrown Exceptions`.
3. Optional: chose the frame granularity and coloring (`Line`, `Method`, `Class`, `File`, `Package`, ...).
4. Optional: chose the code provenance (`Only My Code` or `All Code`).
5. Optional: filter on a specific endpoint, for total consumption (`per Minute by Endpoint`) or per request (`per Endpoint Call`).
6. Optional: filter on other criteria such as `Method`, `Package`, `Thread name` or `Trace Operation`.
7. Give your graph a title or leave the box blank for the suggested title.

### Options

#### Global time

On screenboards and notebooks, choose whether your widget has a custom timeframe or uses the global timeframe.

## API

This widget can be used with the **[Dashboards API][2]**. See the following table for the [widget JSON schema definition][3]:

{{< dashboards-widgets-api >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /profiler/profile_visualizations/#flame-graph
[2]: /api/latest/dashboards/
[3]: /dashboards/graphing_json/widget_json/
