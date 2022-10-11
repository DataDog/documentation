---
title: Profiling
kind: documentation
disable_toc: false
is_beta: true
further_reading:
- link: "/getting_started/profiler/"
  tag: "Documentation"
  text: "Getting Started with the Continuous Profiler"
- link: "/getting_started/profiler/"
  tag: "Documentation"
  text: "Getting Started with the Continuous Profiler"
---

{{< beta-callout url="#" >}}
  The Datadog plugin for IntelliJ IDEA is an early access preview release intended for customers that use the <a href="https://docs.datadoghq.com/profiler/#pagetitle">Continuous Profiler</a>. If the plugin stops working unexpectedly, check for plugin updates. To leave feedback, check out our <a href="https://github.com/DataDog/datadog-for-intellij/discussions">GitHub discussions page</a>.
{{< /beta-callout >}}

After you add a service to your project, right-click on the service and click **Open in Profiling** to open a Profiling tab for the service. A profiling tab displays data for only one service, but you can have multiple tabs open simultaneously.

The Profiling tab shows Continuous Profiling information for the service in a selected environment, aggregated over a specific time frame. Available views are:
- [Top list](#top-list): Displays a list of the most resource intensive methods for the current profiling measure.
- [Flame graph](#flame-graph): A flame graph representing stack traces in the profiles.

{{< img src="/developers/ide_integrations/idea/profiling-example.png" alt="An example of the Profiling tab for a service named product-recommendation" style="width:100%;" >}}

You can specify the following parameters for the profiling data:
* The profile type to be displayed
* The environment in which the service is running
* The time frame for the profile samples to be aggregated

The available profiling types usually include options like **CPU Time** and **Allocated Memory**, but are determined by the platform and vary by language.

## Top list

The **Top List** sub-tab shows the methods that consume the most resources based on the aggregated profile data loaded from the Datadog servers. **Top List** is designed to show a summary of the methods that are most likely to be interesting from a resource consumption point of view.

{{< img src="/developers/ide_integrations/idea/top-list.png" alt="The Top-list view" style="width:100%;" >}}

Double-clicking an item in the list, or selecting **Jump to Source** item from the context menu, opens a source code editor showing where the method is defined.

{{< img src="/developers/ide_integrations/idea/jump-to-source.png" alt="Select Jump to Source from the context menu" style="width:100%;" >}}

To see a flame graph visualization of a method, select the **Search in Flamegraph** item from the context menu.

### Call tree

The call tree to the right of the method list shows the paths that lead to (and from) the selected method.

{{< img src="/developers/ide_integrations/idea/call-tree.png" alt="The method call tree" style="width:100%;" >}}

The default **Caller Hierarchy** view shows the callers (or predecessors) of the target method and the frequency with which they appear in the call stack.

To view the callees (or successors), click **Callee Hierarchy**.

{{< img src="/developers/ide_integrations/idea/callee-hierarchy.png" alt="The callee hierarchy view" style="width:100%;" >}}

Right-click on a method in the call tree to see options to navigate to the source editor or flame graph.

## Flame graph

A flame graph is a visualization of profiling samples that shows stack traces and their relative frequency during the sample period. The Datadog plugin aggregates data collected over the requested time frame, which means multiple individual profiles are aggregated together. Each individual profile covers a 60 second interval within the requested time frame.

{{< img src="/developers/ide_integrations/idea/flamegraph.png" alt="A flame graph showing CPU Time over the last 4 hours" style="width:100%;" >}}

Each time you change the profile type, the time frame, or the environment, the Datadog plugin generates a new flame graph.

You can navigate the flame graph in several ways:
* Double-click on any frame to focus on that method and all the methods that it has called during the sampling period.
* Use the minimap to pan around the graph.
* Right-click on a method and select **Jump to Source** to go to the corresponding point in the source code.

Hovering over a method displays a tooltip with the following information:
* The class name and method signature
* The package name
* The profiling metric value and percentage breakdown.

{{< img src="/developers/ide_integrations/idea/flamegraph-tooltip.png" alt="A flame graph hover tooltip" style="width:100%;" >}}

Profiling samples include stack trace and line number information. Use the **Separate Flamegraph by** button to switch between separating frames by method or line number.

{{< img src="/developers/ide_integrations/idea/separate-flamegraph-by.png" alt="Use the tooltip button to separate frames by method or line number" style="width:100%;" >}}

## Items of interest
The Datadog plugin displays an icon in the editor margin and highlights code based on the active Profiling data. - Hover over the icon to see more information.
- Click the icon to open the **Top List** Profiling tab or open Profiling in Datadog.
  {{< img src="/developers/ide_integrations/idea/interest-options.png" alt="Click the Datadog icon to open the Profiling data in a tab or in Datadog" style="width:100%;" >}}

To configure which Profiling data is used for points of interest, see [Code synchronization](#code-synchronization).

## Code synchronization

Some Datadog plugin features require synchronization with a Profiling tab:
- The IDEA project tree view is annotated with the selected profiles metrics.
  {{< img src="/developers/ide_integrations/idea/project-tree-view.png" alt="The project tree annotated with profile metrics from a profile tab" style="width:100%;" >}}
- [Items of interest](#items-of-interest) correspond to whichever profile is selected.

To control which profiling tab contributes data to the IDEA project tree or editor highlights, you can pin a profile, or let IDEA sync data according to whichever plugin is active.

To sync a profile, in the desired Profiling tab, click on the **Sync** icon and:
 - Select **Sync with** and choose the name of the desired profile to pin that profile.
 **OR**
 - Select **Sync with active profile** to allow IDEA to sync data with whichever profile tab is active.

After you select a profile, a yellow dot appears next to the selected tab's title to indicate that it has focus.
{{< img src="/developers/ide_integrations/idea/yellow-dot.png" alt="a yellow dot appears next to the selected tab's title to indicate that it has focus" style="width:100%;" >}}

## What's next?

- [Overview][1]: Return to the overview and setup instructions.
- [Logging][2]: View Continuous Profiling data from within IDEA.
## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /developers/ide_integrations/idea/
[2]: /developers/ide_integrations/idea/logging/
