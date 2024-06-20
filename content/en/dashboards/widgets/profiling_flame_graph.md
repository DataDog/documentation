---
title: Profiling Flame Graph Widget
description: "Graph a breakdown of top consuming lines of code (CPU, Memory, ...)"
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

{{< img src="dashboards/widgets/profiling_flame_graph/profiling_flame_graph.png" alt="Profiling Flame Graph" >}}

The [profiling flame graph visualization][1] represents a breakdown of top consuming lines of code such as CPU and Memory. Add this widget to visualize stack traces of your profiled applications and accurately identify frequent resource requests. 

## Setup
 
 {{< img src="dashboards/widgets/profiling_flame_graph/profiling_flame_graph_config.png" alt="Graph your data section in the profiling flame graph widget configuration" style="width:100%;" >}}

### Configuration

1. Scope your profiling data with tags. For example, `host`, `container_name`, `service`, `env`, or `version`.
2. To select the resource click the dropdown menu next to **Show**. Options can include `CPU Time`, `Allocated Memory`, or `Thrown Exceptions`.
3. Click the dropdown menu next to **by** and **for** to select the frame granularity and code provenance, respectively.
4. Give your graph a title or leave the box blank for the suggested title.
5. Click **Save**.

### Options

#### Advanced options and filtering

Click the three dot ellipsis to open Advanced options to specify coloring and resolution.

Customize your flame graph. Add graphing actions or filters in the *Filter flame graph* field.

#### Scope to endpoints

Filter on a specific endpoint, for total consumption (`per Minute by Endpoint`) or per request (`per Endpoint Call`).

#### Scope to functions

Filter on other criteria such as `Method`, `Package`, `Thread name` or `Trace Operation`.

#### Global time

Choose whether your widget has a custom timeframe or the dashboard's global timeframe.

## API

This widget can be used with the **[Dashboards API][2]**. See the [widget JSON schema definition][3].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /profiler/profile_visualizations/#flame-graph
[2]: /api/latest/dashboards/
[3]: /dashboards/graphing_json/widget_json/
