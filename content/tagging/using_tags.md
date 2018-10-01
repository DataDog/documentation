---
title: Using tags
kind: documentation
aliases:
- /getting_started/tagging/using_tags/
further_reading:
- link: "tagging"
  tag: "Documentation"
  text: Getting started with tags
- link: "tagging/assigning_tags"
  tag: "Documentation"
  text: Learn how to assign tags
---

After [assigning tags][1], you can start using them to filter and group in interesting ways.

## Events

The [Events Stream][2] shows all the events that have occurred in your environment over the time period specified. Using tags to filter down this list is very beneficial. Enter `tags:` followed by a tag to see all the events that come from a host or [integration][3] with that tag. The example below is used to search for the tag `service:coffee-house` using `tags:service:coffee-house`. To search multiple tags, separate each tag by a comma - `tags:service:coffee-house,host:coffeehouseprod`.

{{< img src="tagging/using_tags/eventtags.png" alt="Events List and Tags" responsive="true" style="width:80%;">}}

## Dashboards

{{< tabs >}}
{{% tab "Assignment" %}}

You can use tags to narrow down the metrics to display on a [dashboard graph][4], or to create groups of metrics to display.
To narrow down the metrics to display, enter the tag in the **from** textbox. You are now looking at a chosen metric over all sources that have that particular tag assigned (`service:coffee-house` in the example below).

{{< img src="tagging/using_tags/dashboardtags_1.png" alt="Tags in Dashboards from textbox" responsive="true" style="width:80%;">}}

To group using tags, enter the key part of the tag in the **avg by** textbox. For example, if you have a timeseries graph showing a metric tagged with the key value `service`, such as `service:coffee-house`, enter `service` in the **avg by** textbox to show one line for each `service`. Each line represents the average metric value across all sources that share that `service`.

{{< img src="tagging/using_tags/dashboardtags.png" alt="Tags in Dashboards avg by textbox" responsive="true" style="width:80%;">}}

You can also use tags to overlay events on the dashboard. This works the same way as in the [Events Stream][2].
Enter `tags:` followed by the tag. The matching events are overlaid as vertical bars on the graph. The example below uses `tags:service:coffee-house`.

{{< img src="tagging/using_tags/dashboardeventtags.png" alt="Event Overlays in Dashboards" responsive="true" style="width:80%;">}}

Use [template variables][5] to save time switching the **from** tag on graphs in your dashboard. In the example below, `service` is used to represent the `service` tag group. To use the template variable, replace any tag listed in the **from** textbox with `$service`.

{{< img src="tagging/using_tags/dashboardtemplatevariables.png" alt="Dashboard Template Variables" responsive="true" style="width:80%;">}}

[2]: /graphing/event_stream/
[4]: /graphing/dashboards/
[5]: /graphing/dashboards/template_variables/

{{% /tab %}}
{{% tab "Examples" %}}

Here is an example of tags using the time-series chart editor. For the first screenshot, no tags have been applied, and we're observing average CPU across all hosts:

{{< img src="tagging/using_tags/Tags_1.png" alt="Tags_1" responsive="true" style="width:75%;">}}

Next, we've updated the editor to include a tag (`region:eastus`) in the **from** textbox that enables Datadog to look at CPU across the US East Region. We've used region as an example, but you could use any arbitrary tag, including application, service, environment, etc.

{{< img src="tagging/using_tags/Tags_2.png" alt="Tags_2" responsive="true" style="width:75%;">}}

Finally, we've used the second empty field (the **avg by** textbox) to show an individual timeseries line for each `host`. Now we're seeing server CPU for individual hosts running in the US East Region.

{{< img src="tagging/using_tags/Tags_3.png" alt="Tags_3" responsive="true" style="width:75%;">}}

If needed, you can add additional tags to narrow down the scope even further - for example, hosts in `region:eastus` and `env:production`. Tags are extremely powerful, and they are used throughout Datadog. They can be applied to all core elements.

{{% /tab %}}
{{< /tabs >}}

## Infrastructure

To filter the [Host Map][6], [Infrastructure List][7], [Containers][8], and [Processes][9] enter a tag in the **Filter by** textbox at the top of the page. You can also group hosts / containers by entering the key portion of the tag in the **Group by** textbox. So, if you enter `service` in the group box, you see each service as a group heading. 

{{< tabs >}}
{{% tab "Host Map" %}}

Under this section, use tags to filter or group Hosts:

{{< img src="tagging/using_tags/hostmaptags.png" alt="Host Map Tags" responsive="true" style="width:80%;">}}

Or Containers:

{{< img src="tagging/using_tags/containermaptags.png" alt="Container Map Tags" responsive="true" style="width:80%;">}}
{{% /tab %}}

{{% tab "Infrastructure List" %}} 

{{< img src="tagging/using_tags/infrastructuretags.png" alt="Tags in the Infrastructure List" responsive="true" style="width:80%;">}}
{{% /tab %}}

{{% tab "Containers" %}}

{{< img src="tagging/using_tags/livecontainertags.png" alt="Live Container Tags" responsive="true" style="width:80%;">}}
{{% /tab %}}

{{% tab "Processes" %}}

{{< img src="tagging/using_tags/liveprocessestags.png" alt="Live Process Tags" responsive="true" style="width:80%;">}}
{{% /tab %}}
{{< /tabs >}}

## Monitors

{{< tabs >}}
{{% tab "Manage Monitors" %}}

To filter monitors by [assigned tags][1], use the search bar or facet checkboxes. The search bar format is `tag:key:value`, for example `tag:service:coffee-house`. **Note** monitor tags are different and separate from metric tags.

{{< img src="tagging/using_tags/managemonitorstags.png" alt="Manage Monitors Tags" responsive="true" style="width:80%;">}}

[1]: /tagging/assigning_tags/

{{% /tab %}}

{{% tab "New Monitor" %}}

When creating a [monitor][10], use metric tags in the:

* **from** textbox to limit the monitor scope to only metrics that have those tags.

* **excluding** textbox to remove the corresponding metrics from the monitor scope.

* **avg by** textbox to transform the monitor into a multi-alert monitor on each tag value.

{{< img src="tagging/using_tags/newmonitortags.png" alt="New Monitor Tags" responsive="true" style="width:80%;">}}

[10]: /monitors/monitor_types/

{{% /tab %}}
{{% tab "Manage Downtime" %}}

To filter [downtimes][11] by monitor tag, type the tag name in the search bar, for example `service:coffee-house`.

{{< img src="tagging/using_tags/managedowntimetags.png" alt="Manage Monitors Tags" responsive="true" style="width:80%;">}}

[11]: /monitors/downtimes/

{{% /tab %}}
{{< /tabs >}}

## Metrics

Use tags in the [Metrics Explorer][12] to filter metrics over tags or display multiple graphs by tag key. The example below graphs a metric over `service:coffee-house` and displays one graph per `host`.

{{< img src="tagging/using_tags/metricsexplorertags.png" alt="Manage Monitors Tags" responsive="true" style="width:80%;">}}

## Integrations

Some integrations such as [AWS][13], [Google Cloud][14], and [Azure][15] allow you to optionally limit metrics using tags. In the specific integration tile, use a comma separated list of tags in the form `key:value`.

{{< img src="tagging/using_tags/integrationtags.png" alt="Optionally limit metrics collection" responsive="true" style="width:80%;">}}

This defines a filter used while collecting metrics. Wildcards, such as `?` (for single characters) and `*` (for multiple characters) can also be used. Only hosts that match one of the defined tags are imported into Datadog. The rest are ignored. Hosts matching a given tag can also be excluded by adding `!` before the tag.

Example - `datadog:monitored,env:production,instance-type:c1.*,!region:us-east-1`

## APM

{{< tabs >}}
{{% tab "Trace Search & Analytics" %}}

For [Trace Search][16], filter traces with tags using the search bar or facet checkboxes. The search bar format is `key:value`, for example `service:coffee-house`. For advanced search, see the [trace search][17] page.

{{< img src="tagging/using_tags/tracesearchtags.png" alt="Trace Search Tags" responsive="true" style="width:80%;">}}

[16]: /tracing/visualization/search/
[17]: /tracing/visualization/search/#search-bar

{{% /tab %}}
{{% tab "Service Map" %}}

After [assigning tags][1], you can use the Service Map to jump to different areas of the application by clicking on a particular service. In the example below, you can view [Trace Search & Analytics][16], [Monitors][18], [Logs][19], and the [Host Map][20] filtered by the tag `service:coffee-house`.

{{< img src="tagging/using_tags/servicemaptags.png" alt="Service Map Tags" responsive="true" style="width:80%;">}}

[1]: /tagging/assigning_tags/
[16]: /tracing/visualization/search/
[18]: /monitors/manage_monitor/
[19]: /logs/explorer/search/
[20]: /graphing/infrastructure/hostmap/

{{% /tab %}}

{{< /tabs >}}

## Notebooks

When creating a [Notebook][21] graph, limit metrics by using tags in the **from** textbox. Additionally, you can group metrics by using tags in the **avg by** textbox. In the example below, metrics are limited to `service:coffee-house` and grouped by `host`.

{{< img src="tagging/using_tags/notebooktags.png" alt="Notebook Tags" responsive="true" style="width:80%;">}}

To exclude tags, use `</>` to edit the text then add the tag in the form `!key:value`. In the example below, `service:coffeehouse` is excluded using `!service:coffeehouse`.

{{< img src="tagging/using_tags/notebooktagsexclude.gif" alt="Notebook Exclude Tags" responsive="true" style="width:80%;">}}

## Logs

For Logs [Search][22], [Analytics][23], [Patterns][24], and [Live Tail][25] filter logs with tags using the search bar or facet checkboxes. The search bar format is `key:value`, for example `service:coffee-house`. For advanced search, see the [log search][22] page.

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

{{< img src="tagging/using_tags/livetailtags.gif" alt="Live Tail Tags" responsive="true" style="width:80%;">}}

{{% /tab %}}
{{< /tabs >}}

Additionally, tags are used to filter a logs [Pipeline][26]. In the example below, the pipeline filters logs by the tag `service:coffee-house`.

{{< img src="tagging/using_tags/logpipelinetags.png" alt="Pipeline Tags" responsive="true" style="width:80%;">}}

## Developers

Tags can be used in various ways with the [API][27]. See the list below for links to those sections:

- [Schedule monitor downtime][28]
- [Query the event stream][29]
- [Search hosts][30]
- [Integrations][31] for [AWS][32] and [Google Cloud][33]
- [Querying timeseries points][34]
- [Get all monitor details][35]
- [Mute a monitor][36]
- [Create a Screenboard][37]
- [Create a Timeboard][38]

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tagging/assigning_tags/
[2]: /graphing/event_stream/
[3]: /integrations
[4]: /graphing/dashboards/
[5]: /graphing/dashboards/template_variables/
[6]: /graphing/infrastructure/hostmap
[7]: /graphing/infrastructure/
[8]: /graphing/infrastructure/livecontainers/
[9]: /graphing/infrastructure/process/
[10]: /monitors/monitor_types/
[11]: /monitors/downtimes/
[12]: /graphing/metrics/explorer/
[13]: /integrations/amazon_web_services/
[14]: /integrations/google_cloud_platform/
[15]: /integrations/azure/
[16]: /tracing/visualization/search/
[17]: /tracing/visualization/search/#search-bar
[18]: /monitors/manage_monitor/
[19]: /logs/explorer/search/
[20]: /graphing/infrastructure/hostmap/
[21]: /graphing/notebooks/
[22]: /logs/explorer/search/
[23]: /logs/explorer/analytics/
[24]: /logs/explorer/patterns/
[25]: /logs/live_tail/
[26]: /logs/processing/pipelines/
[27]: /api/
[28]: /api/?lang=python#schedule-monitor-downtime
[29]: /api/?lang=python#query-the-event-stream
[30]: /api/?lang=python#search-hosts
[31]: /api/?lang=python#integrations
[32]: /api/?lang=python#aws
[33]: /api/?lang=python#google-cloud-platform
[34]: /api/?lang=python#query-timeseries-points
[35]: /api/?lang=python#get-all-monitor-details
[36]: /api/?lang=python#mute-a-monitor
[37]: /api/?lang=python#create-a-screenboard
[38]: /api/?lang=python#create-a-timeboard
