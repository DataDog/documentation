---
title: Datadog Plugin For IntelliJ IDEA
kind: documentation
disable_toc: false
is_beta: true
further_reading:
- link: "/account_management/api-app-keys/"
  tag: "Documentation"
  text: "Find out more about API and application keys."
- link: "/getting_started/profiler/"
  tag: "Documentation"
  text: "Getting started with Continuous Profiler."
---

{{< callout url="#" btn_hidden="true">}}
  The Datadog plugin for IntelliJ IDEA is in public beta. It is intended for Java developers who use the <a href="https://docs.datadoghq.com/profiler/#pagetitle">Continuous Profiler</a> for their Java services. If the plugin stops working unexpectedly, check for plugin updates or <a href=#feedback>reach out to the team</a>.
{{< /callout >}}

## Overview

The Datadog plugin for IntelliJ IDEA helps you to improve software performance by providing meaningful code-level insights in the IDE based on real-time observability data. Together with the Continuous Profiler, the plugin helps you to reduce latency and lower cloud costs by highlighting code lines that:
- consume the most CPU
- allocate the most memory
- spend the most time on locks, disk I/O, socket I/O, and so on

{{< img src="/developers/ide_integrations/idea/overview1.png" alt="The Datadog tool window open in IDEA" style="width:100%;" >}}

In addition to code highlighting, you can use the Datadog plugin for Intellij IDEA to:
- Identify methods that consume the most resources with the **Top List** view.
- Visualize aggregated profile data with the **Flame Graph** view.
- Navigate directly from the top list and flame graph to the relevant lines in your code.
- Find resource consumption broken down by method name and line number.

## Requirements

- **A Datadog account**: The plugin requires a Datadog account. If you're new to Datadog, go to the [Datadog website][3] to learn more about Datadog's observability tools and sign up for a free trial.
- **Continuous Profiling**: To display code-level insights, the plugin requires Continuous Profiling instrumented on your Java Services. For more information, see [Getting Started with the Continuous Profiler][2].

## Setup

### Install the Datadog plugin

1. Click **Plugins** and search for `Datadog`.
1. Click **Install** to download and install the plugin in your IDE.
1. If you receive a prompt notifying you that Datadog is a third-party plugin, click **Accept**.
1. Click **Restart IDE** to restart IDEA.

{{< img src="/developers/ide_integrations/idea/datadog-plugin1.png" alt="The Datadog plugin" style="width:100%;" >}}

Alternatively, you can install the plugin from the [Jetbrains Marketplace][4].

<span id="datadog_plugin_install_button"></span>

### Log in to Datadog

After installing the Datadog plugin and restarting IDEA, log in to Datadog:
1. With a file or project open in IDEA, click the **Datadog** tool window.
1. Click **Log in...**.
1. In the browser window that opens, select your site and organization, then authorize access to the platform.

**Note**: For most users, one login is all that is required. If you're using a multi-org setup, check to ensure that the correct account is active. To find out which login IDEA is using, click **Preferences** -> **Tools** -> **Datadog**, and check which account is active.

### Link a service

To provide relevant data from the Datadog platform, add relevant services to a project:
1. With your project open in IDEA, open the **Datadog** tool window and click the plus icon (**+**).
1. Search for and select the services that you want to add to the current project.

To remove a service, select it in the **Services** table and click the minus icon (**-**).

<div class="alert alert-info">The names of linked services persist with the project when you close it.</div>

## Using the plugin

After you add a service to your project, right-click on the service and click **Open in Profiling** to open a Profiling tab for the service. A profiling tab displays data for only one service, but you can have multiple tabs open simultaneously.

The Profiling tab shows Continuous Profiling information for the service in a selected environment, aggregated over a specific time frame. Available views are:
- [Top list](#top-list): Displays a list of the most resource intensive methods for the current profiling measure.
- [Flame graph](#flame-graph): A flame graph representing stack traces in the profiles.

You can specify the following parameters for the profiling data:
- The profile type to be displayed
- The environment in which the service is running
- The time frame for the profile samples to be aggregated

The available profiling types usually include options like **CPU Time** and **Allocated Memory**, but are determined by the platform and vary by language.

## Top list

The **Top List** sub-tab shows the methods that consume the most resources based on the aggregated profile data loaded from the Datadog servers. **Top List** is designed to show a summary of the methods that are most likely to be interesting from a resource consumption point of view.

{{< img src="/developers/ide_integrations/idea/top-list1.png" alt="The Top-list view" style="width:100%;" >}}

- Double-clicking an item in the list (or selecting **Jump to Source** from the context menu) opens a source code editor showing where the method is defined.
- To see a flame graph visualization of a method, select **Search in Flame Graph** from the context menu.

### Call tree

The call tree to the right of the method list shows the paths that lead to (and from) the selected method.

{{< img src="/developers/ide_integrations/idea/call-tree1.png" alt="The method call tree" style="width:100%;" >}}

The default **Caller Hierarchy** view shows the callers (or predecessors) of the target method and the frequency with which they appear in the call stack.

To view the callees (or successors), click **Callee Hierarchy**.

{{< img src="/developers/ide_integrations/idea/callee-hierarchy.png" alt="The callee hierarchy view" style="width:100%;" >}}

Right-click on a method in the call tree to see options to navigate to the source editor or flame graph.

## Flame graph

A flame graph is a visualization of profiling samples that shows stack traces and their relative frequency during the sample period. The Datadog plugin aggregates data collected over the requested time frame, and multiple individual profiles are aggregated together. Each individual profile covers a 60 second interval within the requested time frame.

{{< img src="/developers/ide_integrations/idea/flamegraph1.png" alt="A flame graph showing CPU Time over the last 4 hours" style="width:100%;" >}}

Each time you change the profile type, the time frame, or the environment, the Datadog plugin generates a new flame graph.

You can navigate the flame graph in several ways:
- Double-click on any frame to focus on that method and all the methods that it has called during the sampling period.
- Use the minimap to pan around the graph.
- Right-click on a method and select **Jump to Source** to go to the corresponding point in the source code.

Hovering over a method displays a tooltip with the following information:
- The class name and method signature
- The package name
- The profiling metric value and percentage breakdown.

Profiling samples include stack trace and line number information. Use the **Separate Flame Graph by** button to switch between separating frames by method or line number.

{{< img src="/developers/ide_integrations/idea/separate-flamegraph-by.png" alt="Use the tooltip button to separate frames by method or line number" style="width:40%;" >}}

## Datadog Insights

When a Profiling tab is active, Datadog Insights adds code highlights to the source code editor margin. The Datadog plugin displays an icon in the editor margin and highlights code based on the active Profiling data.
- Hover over the icon to see more information.
- Click the icon to open the top list Profiling tab or open Profiling in Datadog.
  {{< img src="/developers/ide_integrations/idea/interest-options.png" alt="Click the Datadog icon to open the Profiling data in a tab or in Datadog" style="width:100%;" >}}

The active Profiling tab also affects the IDEA project tree view, which is annotated with the selected profile's metrics:
{{< img src="/developers/ide_integrations/idea/project-tree-view.png" alt="The project tree annotated with profile metrics from a profile tab" style="width:60%;" >}}

## Feedback

Let us know what you think about the plugin! Provide feedback on our [discussion forum][1], or send an e-mail to `team-ide-integration@datadoghq.com`.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

<script src="https://plugins.jetbrains.com/assets/scripts/mp-widget.js"></script>
<script>
  // Please, replace #yourelement with a real element id on your webpage
  MarketplaceWidget.setupMarketplaceWidget('install', 19495, "#datadog_plugin_install_button");
</script>

[1]: https://github.com/DataDog/datadog-for-intellij/discussions
[2]: /getting_started/profiler/
[3]: https://www.datadoghq.com/
[4]: https://plugins.jetbrains.com/plugin/19495-datadog
