---
title: Using tags
kind: documentation
aliases:
- /getting_started/tagging/using_tags/
further_reading:
- link: "tagging"
  tag: "Documentation"
  text: "Getting started with tags"
- link: "tagging/assigning_tags"
  tag: "Documentation"
  text: "Learn how to assign tags"
---

After [assigning tags][1], start using them to filter and group your data in your Datadog platform. Tags can be used to include or exclude data. When including or excluding multiple tags:

* Include uses `AND` logic
* Exclude uses `OR` logic

## Events

The [Events Stream][2] shows all the events that have occurred in your environment over the time period specified. Use tags to filter down the event list and focus on a subset of events. Enter `tags:` followed by a tag to see all the events that come from a host or an [integration][3] with that tag. The example below is used to search for the tag `service:coffee-house` using `tags:service:coffee-house`. To search multiple tags, separate each tag by a comma: `tags:service:coffee-house,host:coffeehouseprod`.

{{< img src="tagging/using_tags/eventtags.png" alt="Events List and Tags" responsive="true" style="width:80%;">}}

## Dashboards

{{< tabs >}}
{{% tab "Assignment" %}}

Use tags to filter metrics to display in a [dashboard graph][1], or to create aggregated groups of metrics to display. To filter the metrics to display, enter the tag in the **from** textbox. You are now looking at a chosen metric over all sources that have that particular tag assigned (`service:coffee-house` in the example below).

{{< img src="tagging/using_tags/dashboardtags_1.png" alt="Tags in Dashboards from textbox" responsive="true" style="width:80%;">}}

To create an aggregated group using tags, enter the key part of the tag in the **avg by** textbox. For example, if you have a timeseries graph showing a metric tagged with the key `service`, such as `service:coffee-house`, enter `service` in the **avg by** textbox to show one line for each `service` tag value. Each line represents the average metric value across all sources that share that `service` tag value.

{{< img src="tagging/using_tags/dashboardtags.png" alt="Tags in Dashboards avg by textbox" responsive="true" style="width:80%;">}}

Tags can also be used to overlay events on the dashboard. This works the same way as in the [Events Stream][2].
Enter `tags:` followed by the tag. The matching events are overlaid as vertical bars on the graph. The example below uses `tags:service:coffee-house`.

{{< img src="tagging/using_tags/dashboardeventtags.png" alt="Event Overlays in Dashboards" responsive="true" style="width:80%;">}}

Use [template variables][3] to save time switching the **from** tag on graphs in your dashboard. In the example below, `service` is used to represent the `service` tag key. To use the template variable, add the `$service` template variable in the **from** textbox of your graph query.

{{< img src="tagging/using_tags/dashboardtemplatevariables.png" alt="Dashboard Template Variables" responsive="true" style="width:80%;">}}


[1]: /graphing/dashboards
[2]: /graphing/event_stream
[3]: /graphing/dashboards/template_variables
{{% /tab %}}
{{% tab "Examples" %}}

Here is an example of tags using the timeseries chart editor. For the first screenshot, no tags have been applied, and the average CPU usage across all hosts is displayed:

{{< img src="tagging/using_tags/Tags_1.png" alt="Tags_1" responsive="true" style="width:75%;">}}

Next, the editor is updated to include a tag (`region:eastus`) in the **from** textbox that enables Datadog to look at CPU usage across the US East region. The `region` tag is used as an example here, but you could use any arbitrary tag sent to your Datadog platform, including `application`, `service`, `environment`, etc.

{{< img src="tagging/using_tags/Tags_2.png" alt="Tags_2" responsive="true" style="width:75%;">}}

Finally, the second empty field (the **avg by** textbox) is used to show an individual timeseries line for each `host`. Server CPU is displayed for individual hosts running in the US East region.

{{< img src="tagging/using_tags/Tags_3.png" alt="Tags_3" responsive="true" style="width:75%;">}}

If needed, add additional tags to narrow down the scope even further—for example, hosts in `region:eastus` and `env:production`. Tags can be used throughout Datadog and be applied to all core elements (metrics, traces, and logs).

{{% /tab %}}
{{< /tabs >}}

## Infrastructure

To filter the [Host Map][4], [Infrastructure List][5], [Containers][6], and [Processes][7], enter a tag in the **Filter by** textbox at the top of the page. Hosts and containers can be grouped by tag key using the **Group by** textbox. If you enter `service` in the group box, you see each service as a group heading.

{{< tabs >}}
{{% tab "Host Map" %}}

Under this section, use tags to filter or group Hosts:

{{< img src="tagging/using_tags/hostmaptags.png" alt="Host Map Tags" responsive="true" style="width:80%;">}}

Or Containers:

{{< img src="tagging/using_tags/containermaptags.png" alt="Container Map Tags" responsive="true" style="width:80%;">}}
{{% /tab %}}

{{% tab "Infrastructure List" %}}

Here are the filter and group by textboxes on the Infrastructure List page:

{{< img src="tagging/using_tags/infrastructuretags.png" alt="Tags in the Infrastructure List" responsive="true" style="width:80%;">}}
{{% /tab %}}

{{% tab "Containers" %}}

Here are the filter and group by textboxes on the Live Containers page:

{{< img src="tagging/using_tags/livecontainertags.png" alt="Live Container Tags" responsive="true" style="width:80%;">}}
{{% /tab %}}

{{% tab "Processes" %}}

Here are the filter and group by textboxes on the Live Processes page:

{{< img src="tagging/using_tags/liveprocessestags.png" alt="Live Process Tags" responsive="true" style="width:80%;">}}
{{% /tab %}}
{{< /tabs >}}

## Monitors

{{< tabs >}}
{{% tab "Manage Monitors" %}}

To filter monitors by [assigned tags][1], use the search bar or facet checkboxes. The search bar format is `tag:<KEY>:<VALUE>`, for example `tag:service:coffee-house`. **Note**: monitor tags are different and separate from metric tags.

{{< img src="tagging/using_tags/managemonitorstags.png" alt="Manage Monitors Tags" responsive="true" style="width:80%;">}}


[1]: /tagging/assigning_tags
{{% /tab %}}

{{% tab "New Monitor" %}}

When creating a [monitor][1], use metric tags in the:

* **from** textbox to limit the monitor scope to only metrics that have those tags.

* **excluding** textbox to remove the corresponding metrics from the monitor scope.

* **avg by** textbox to transform the monitor into a multi-alert monitor on each tag value.

{{< img src="tagging/using_tags/newmonitortags.png" alt="New Monitor Tags" responsive="true" style="width:80%;">}}


[1]: /monitors/monitor_types
{{% /tab %}}
{{% tab "Manage Downtime" %}}

To filter [downtimes][1] by monitor tag, type the tag name in the search bar, for example `service:coffee-house`.

{{< img src="tagging/using_tags/managedowntimetags.png" alt="Manage Monitors Tags" responsive="true" style="width:80%;">}}


[1]: /monitors/downtimes
{{% /tab %}}
{{< /tabs >}}

## Metrics

Use tags in the [Metrics Explorer][8] to filter metrics over tags or display multiple graphs by tag key. The example below graphs a metric over `service:coffee-house` and displays one graph per `host`.

{{< img src="tagging/using_tags/metricsexplorertags.png" alt="Manage Monitors Tags" responsive="true" style="width:80%;">}}

## Integrations

Some integrations such as [AWS][9], [Google Cloud][10], and [Azure][11] allow you to optionally limit metrics using tags. In the specific integration tile, use a comma separated list of tags in the form `<KEY>:<VALUE>`.

{{< img src="tagging/using_tags/integrationtags.png" alt="Optionally limit metrics collection" responsive="true" style="width:80%;">}}

This defines a filter used while collecting metrics. Wildcards such as `?` (for single characters) and `*` (for multiple characters) can also be used. Only hosts that match one of the defined tags are imported into Datadog. The rest are ignored. Hosts matching a given tag can also be excluded by adding `!` before the tag.

Example: `datadog:monitored,env:production,instance-type:c1.*,!region:us-east-1`

## APM

{{< tabs >}}
{{% tab "Trace Search & Analytics" %}}

For [Trace Search][1], filter traces with tags using the search bar or facet checkboxes. The search bar format is `<KEY>:<VALUE>`, for example `service:coffee-house`. For advanced search, see the [trace search][2] page.

{{< img src="tagging/using_tags/tracesearchtags.png" alt="Trace Search Tags" responsive="true" style="width:80%;">}}


[1]: /tracing/trace_search_and_analytics/search
[2]: /tracing/trace_search_and_analytics/search/#search-bar
{{% /tab %}}
{{% tab "Service Map" %}}

After [assigning tags][1], use the Service Map to jump to different areas of the application by clicking on a particular service. In the example below, view [Trace Search & Analytics][2], [Monitors][3], [Logs][4], and the [Host Map][5] filtered by the tag `service:coffee-house`.

{{< img src="tagging/using_tags/servicemaptags.png" alt="Service Map Tags" responsive="true" style="width:80%;">}}


[1]: /tagging/assigning_tags
[2]: /tracing/trace_search_and_analytics/search
[3]: /monitors/manage_monitor
[4]: /logs/explorer/search
[5]: /graphing/infrastructure/hostmap
{{% /tab %}}

{{< /tabs >}}

## Notebooks

When creating a [Notebook][12] graph, limit metrics by using tags in the **from** textbox. Additionally, group metrics by using tags in the **avg by** textbox. In the example below, metrics are limited to `service:coffee-house` and grouped by `host`.

{{< img src="tagging/using_tags/notebooktags.png" alt="Notebook Tags" responsive="true" style="width:80%;">}}

To exclude tags, use `</>` to edit the text then add the tag in the form `!<KEY>:<VALUE>`. In the example below, `service:coffeehouse` is excluded using `!service:coffeehouse`.

{{< img src="tagging/using_tags/notebooktagsexclude.mp4" alt="Notebook Exclude Tags" video="true" responsive="true" width="80%">}}

## Logs

For Logs [Search][13], [Analytics][14], [Patterns][15], and [Live Tail][16] filter logs with tags using the search bar or facet checkboxes. The search bar format is `<KEY>:<VALUE>`, for example `service:coffee-house`. For advanced search, see the [log search][13] page.

{{< tabs >}}
{{% tab "Search" %}}

{{< img src="tagging/using_tags/logsearchtags.png" alt="Log Search Tags" responsive="true" style="width:80%;">}}

{{% /tab %}}
{{% tab "Analytics" %}}

{{< img src="tagging/using_tags/loganalyticstags.png" alt="Log Analytics Tabs" responsive="true" style="width:80%;">}}

{{% /tab %}}
{{% tab "Patterns" %}}

{{< img src="tagging/using_tags/logpatternstags.png" alt="Log Patterns Tags" responsive="true" style="width:80%;">}}

{{% /tab %}}
{{% tab "Live Tail" %}}

{{< img src="tagging/using_tags/livetailtags.mp4" alt="Live Tail Tags" video="true" responsive="true" width="80%">}}

{{% /tab %}}
{{< /tabs >}}

Additionally, tags are used to filter a logs [Pipeline][17]. In the example below, the pipeline filters logs by the tag `service:coffee-house`.

{{< img src="tagging/using_tags/logpipelinetags.png" alt="Pipeline Tags" responsive="true" style="width:80%;">}}

## Developers

Tags can be used in various ways with the [API][18]. See the list below for links to those sections:

- [Schedule monitor downtime][19]
- [Query the event stream][20]
- [Search hosts][21]
- [Integrations][22] for [AWS][23] and [Google Cloud][24]
- [Querying timeseries points][25]
- [Get all monitor details][26]
- [Mute a monitor][27]
- [Monitors search][28]
- [Monitors group search][29]
- [Create a Screenboard][30]
- [Create a Timeboard][31]

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tagging/assigning_tags
[2]: /graphing/event_stream
[3]: /integrations
[4]: /graphing/infrastructure/hostmap
[5]: /graphing/infrastructure
[6]: /graphing/infrastructure/livecontainers
[7]: /graphing/infrastructure/process
[8]: /graphing/metrics/explorer
[9]: /integrations/amazon_web_services
[10]: /integrations/google_cloud_platform
[11]: /integrations/azure
[12]: /graphing/notebooks
[13]: /logs/explorer/search
[14]: /logs/explorer/analytics
[15]: /logs/explorer/patterns
[16]: /logs/live_tail
[17]: /logs/processing/pipelines
[18]: /api
[19]: /api/?lang=python#schedule-monitor-downtime
[20]: /api/?lang=python#query-the-event-stream
[21]: /api/?lang=python#search-hosts
[22]: /api/?lang=python#integrations
[23]: /api/?lang=python#aws
[24]: /api/?lang=python#google-cloud-platform
[25]: /api/?lang=python#query-timeseries-points
[26]: /api/?lang=python#get-all-monitor-details
[27]: /api/?lang=python#mute-a-monitor
[28]: /api/?lang=python#monitors-search
[29]: /api/?lang=python#monitors-group-search
[30]: /api/?lang=python#create-a-screenboard
[31]: /api/?lang=python#create-a-dashboard
