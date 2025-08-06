---
title: Continuous Profiler
type: documentation
further_reading:
- link: "/getting_started/profiler/"
  tag: "Documentation"
  text: "Getting started with Continuous Profiler."
- link: "/integrations/guide/source-code-integration/"
  tag: "Documentation"
  text: "Learn about Source Code Integration."
---

## Overview
The **Continuous Profiler** highlights resource consumption (such as CPU, memory allocation, and thrown exceptions) using profiling data collected from deployed services.  This information helps developers eliminate bottlenecks and write more efficient code.

## Profiler tab

The Continuous Profiler tab shows profiling information for the service in a selected environment, aggregated over a specific time frame. Available views are:
- [Top list](#top-list): Displays a list of the most resource intensive methods for the current profiling measure.
- [Flame graph](#flame-graph): A flame graph representing stack traces in the profiles.

You can specify the following parameters for the profiling data:
- The profile type to be displayed
- The environment in which the service is running
- The time frame for the profile samples to be aggregated

The available profiling types usually include options like **CPU Time** and **Allocated Memory**, but are determined by the platform and vary by language.

## Top list

The **Top List** sub-tab shows the methods that consume the most resources based on the aggregated profile data loaded from the Datadog servers. These are the methods that are most likely candidates for optimization.

{{< img src="/developers/ide_plugins/idea/continuous_profiler/top-list.png" alt="The Top-list view" style="width:100%;" >}}

- Double-click an item in the list (or selecting **Jump to Source** from the context menu) to open a source code editor showing where the method is defined.
- To see a flame graph visualization of a method, select **Search in Flame Graph** from the context menu.

### Call tree

The call tree to the right of the **Top List** shows the paths that lead to (and from) the selected method.

The default **Caller Hierarchy** view shows the callers (or predecessors) of the target method and the frequency with which they appear in the call stack. To view the callees (or successors), click the **Callee Hierarchy** button on the toolbar.

Right-click on a method in the call tree to see options to navigate to the source editor or flame graph.

## Flame graph

A flame graph is a visualization of profiling samples that shows stack traces and their relative frequency during the sample period. The Datadog plugin collects multiple individual profiles from the requested time frame and aggregates them. Each individual profile covers a 60 second interval within the requested time frame.

{{< img src="/developers/ide_plugins/idea/continuous_profiler/flamegraph.png" alt="A flame graph showing CPU Time over the past hour" style="width:100%;" >}}

Each time you change the profile type, the time frame, or the environment, the Datadog plugin generates a new flame graph.

You can navigate the flame graph in several ways:
- Double-click any frame to focus on that method and all the methods that it has called during the sampling period.
- Use the minimap to pan around the graph.
- Right-click a method and select **Jump to Source** to go to the corresponding point in the source code.

Hovering over a method displays a tooltip with the following information:
- The class name and method signature
- The package name
- The profiling metric value and percentage breakdown.

Profiling samples include stack trace and line number information. Use the **Separate Flame Graph by** button to switch between separating frames by method or line number.

{{< img src="/developers/ide_plugins/idea/separate-flamegraph-by.png" alt="Use the tooltip button to separate frames by method or line number" style="width:40%;" >}}

## Source highlighting

When the Continuous Profiler tab is active, the plugin adds code highlights to the source code editor margin. For Top Methods, an icon appears in the editor margin, and line-level highlights appear in the code based on the active Profiling data.
- Hover over the icon to see more information.
- Click the icon to open the top list Profiling tab or open Profiling in Datadog.
  {{< img src="/developers/ide_plugins/idea/interest-options.png" alt="Click the Datadog icon to open the Profiling data in a tab or in Datadog" style="width:100%;" >}}

The active Profiling tab also affects the project tree view, which is annotated with the selected profile's metrics:
{{< img src="/developers/ide_plugins/idea/project-tree-view.png" alt="The project tree annotated with profile metrics from a profile tab" style="width:60%;" >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}
