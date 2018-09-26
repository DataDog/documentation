---
title: Using tags
kind: documentation
aliases:
- /getting_started/tagging/using_tags/using_tags
further_reading:
- link: "tagging"
  tag: "Documentation"
  text: Getting started with tags
- link: "tagging/using_tags/assigning_tags"
  tag: "Documentation"
  text: Learn how to assign tags
---

After [assigning tags][14], you can start using them to filter and group in interesting ways.

## Events

The [Events Stream][2] shows all the events that have occurred in your environment over the time period specified. This can be overwhelming so you can use tags to filter down the list. Enter `tags:` followed by a tag to see all the events that come from a host or [integration][1] with that tag. The example below is used to search for the tag `service:coffee-house` using `tags:service:coffee-house`. To search multiple tags, separate each tag by a comma - `tags:service:coffee-house,host:coffeehouseprod`.

{{< img src="tagging/using_tags/eventtags.png" alt="Events List and Tags" responsive="true" style="width:80%;">}}

## Dashboards

You can use tags to narrow down the metrics to display on a [dashboard graph][3], or to create groups of metrics to display.
To narrow down the metrics to display, enter the tag in the **from** textbox. You are now looking at a chosen metric over all the hosts that have that particular tag assigned.

{{< img src="tagging/using_tags/dashboardtags_1.png" alt="Tags in Dashboards from textbox" responsive="true" style="width:80%;">}}

To group using tags, enter the key part of the tag in the **avg by** textbox. For example, if you have a timeseries graph showing a metric tagged with the key value `service`, such as `service:coffee-house`, enter `service` in the **avg by** textbox to show one line for each `service`. Each line represents the average metric value across all hosts that share that `service`.

{{< img src="tagging/using_tags/dashboardtags.png" alt="Tags in Dashboards avg by textbox" responsive="true" style="width:80%;">}}

You can also use tags to overlay events on the dashboard. This works the same way as in the [Events Stream][2].
Enter `tags:` followed by the tag. The matching events are overlaid as vertical bars on the graph. The example below uses `tags:service:coffee-house`.

{{< img src="tagging/using_tags/dashboardeventtags.png" alt="Event Overlays in Dashboards" responsive="true" style="width:80%;">}}

Use [template variables][4] to save time switching the **from** tag on graphs in your dashboard. In the example below, `service` is used to represent the `service` tag group. To use, replace any tag listed in the **from** textbox with `$service`.

{{< img src="tagging/using_tags/dashboardtemplatevariables.png" alt="Dashboard Template Variables" responsive="true" style="width:80%;">}}

## Infrastructure

To filter the [Host Map][5], [Infrastructure List][6], [Containers][7], and [Processes][8] enter a tag in the **Filter by** textbox at the top of the page. You can also group hosts / containers by entering the key portion of the tag in the **Group by** textbox. So, if you enter `service` in the group box, you see each service as a group heading. 

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

To filter monitors by [assigned tags][1], use the search bar or facet checkboxes. The search bar format is `tag:key:value`, for example `tag:service:coffee-house`.

{{< img src="tagging/using_tags/managemonitorstags.png" alt="Manage Monitors Tags" responsive="true" style="width:80%;">}}

[1]: /tagging/assigning_tags/

{{% /tab %}}

{{% tab "New Monitor" %}}

When creating a [monitor][1], use tags in the:

* **from** textbox to limit the monitor scope to only metrics that have those tags.

* **excluding** textbox to remove the corresponding metrics from the monitor scope.

* **avg by** textbox to transform the monitor into a multi-alert monitor on each tag value.

{{< img src="tagging/using_tags/newmonitortags.png" alt="New Monitor Tags" responsive="true" style="width:80%;">}}

[1]: /monitors/monitor_types/

{{% /tab %}}
{{% tab "Manage Downtime" %}}

To filter downtimes by tag, type the tag name in the search bar, for example `service:coffee-house`.

{{< img src="tagging/using_tags/managedowntimetags.png" alt="Manage Monitors Tags" responsive="true" style="width:80%;">}}

{{% /tab %}}
{{< /tabs >}}

## Metrics

Use tags in the [Metrics Explorer][9] to filter metrics over tags or display multiple graphs by tag key. The example below graphs a metric over `service:coffee-house` and displays one graph per `host`.

{{< img src="tagging/using_tags/metricsexplorertags.png" alt="Manage Monitors Tags" responsive="true" style="width:80%;">}}

## Integrations

Some integrations such as [AWS][10], [Google Cloud][11], and [Azure][12] allow you to optionally limit metrics using tags. In the specific integration tile, use a comma separated list of tags in the form `key:value`.

{{< img src="tagging/using_tags/integrationtags.png" alt="Optionally limit metrics collection" responsive="true" style="width:80%;">}}

This defines a filter used while collecting metrics. Wildcards, such as `?` (for single characters) and `*` (for multiple characters) can also be used. Only hosts that match one of the defined tags are imported into Datadog. The rest are ignored. Hosts matching a given tag can also be excluded by adding `!` before the tag.

Example - `datadog:monitored,env:production,instance-type:c1.*,!region:us-east-1`

## APM

{{< tabs >}}
{{% tab "Trace Search & Analytics" %}}

For [Trace Search][1], filter traces with tags using the search bar or facet checkboxes. The search bar format is `key:value`, for example `service:coffee-house`. For advanced search, see the [trace search][2] page.

{{< img src="tagging/using_tags/tracesearchtags.png" alt="Trace Search Tags" responsive="true" style="width:80%;">}}

[1]: /tracing/visualization/search/
[2]: /tracing/visualization/search/#search-bar

{{% /tab %}}
{{% tab "Service Map" %}}

After [assigning tags][1], you can use the Service Map to jump to different areas of the application by clicking on a particular service. In the example below, you can view [Trace Search & Analytics][2], [Monitors][3], [Logs][4], and the [Host Map][5] filtered by the tag `service:coffee-house`.

{{< img src="tagging/using_tags/servicemaptags.png" alt="Service Map Tags" responsive="true" style="width:80%;">}}

[1]: /tagging/using_tags/assigning_tags/
[2]: /tracing/visualization/search/
[3]: /monitors/manage_monitor/
[4]: /logs/explorer/search/
[5]: /graphing/infrastructure/hostmap/

{{% /tab %}}

{{< /tabs >}}

## Notebooks

When creating a [Notebook][13] graph, limit metrics by using tags in the **from** textbox. Additionally, you can group metrics by using tags in the **avg by** textbox. In the example below, metrics are limited to `service:coffee-house` and grouped by `host`.

{{< img src="tagging/using_tags/notebooktags.png" alt="Notebook Tags" responsive="true" style="width:80%;">}}

To exclude tags, use `</>` to edit the text then add the tag in the form `!key:value`. In the example below, `service:coffeehouse` is excluded using `!service:coffeehouse`.

{{< img src="tagging/using_tags/notebooktagsexclude.gif" alt="Notebook Exclude Tags" responsive="true" style="width:80%;">}}

## Logs

For Logs [Search][15], [Analytics][16], [Patterns][17], and [Live Tail][18] filter logs with tags using the search bar or facet checkboxes. The search bar format is `key:value`, for example `service:coffee-house`. For advanced search, see the [log search][15] page.

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

Additionally, tags are used to filter logs a [Pipeline][19] applies to. In the example below, the pipeline filters logs by the tag `service:coffee-house`.

{{< img src="tagging/using_tags/logpipelinetags.png" alt="Pipeline Tags" responsive="true" style="width:80%;">}}

## Developers

Tags can be used in various ways with the [API][20]. See the list below for links to those sections:

- [Query the event stream][21]
- [Search hosts][22]
- [Querying timeseries points][23]
- [Get all monitor details][24]
- [Mute a monitor][25]
- [Create a Screenboard][26]
- [Create a Timeboard][27]

## Examples

Here is an example of tags using the time-series chart editor. For the first screenshot, no tags have been applied, and we're observing average CPU across all hosts:

{{< img src="tagging/using_tags/Tags_1.png" alt="Tags_1" responsive="true" style="width:75%;">}}

Next, we've updated the editor to include a tag (`region:eastus`) in the **from** textbox that enables Datadog to look at CPU across the US East Region. We've used region as an example, but you could use any arbitrary tag, including application, service, environment, etc.

{{< img src="tagging/using_tags/Tags_2.png" alt="Tags_2" responsive="true" style="width:75%;">}}

Finally, we've used the second empty field (the **avg by** textbox) to show an individual timeseries line for each `host`. Now we're seeing server CPU for individual hosts running in the US East Region.

{{< img src="tagging/using_tags/Tags_3.png" alt="Tags_3" responsive="true" style="width:75%;">}}

If needed, you can add additional tags to narrow down the scope even further - for example, hosts in `region:eastus` and `env:production`. Tags are extremely powerful, and they are used throughout Datadog. They can be applied to all core elements.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /integrations
[2]: /graphing/event_stream/
[3]: /graphing/dashboards/
[4]: /graphing/dashboards/template_variables/
[5]: /graphing/infrastructure/hostmap
[6]: /graphing/infrastructure/
[7]: /graphing/infrastructure/livecontainers/
[8]: /graphing/infrastructure/process/
[9]: /graphing/metrics/explorer/
[10]: /integrations/amazon_web_services/
[11]: /integrations/google_cloud_platform/
[12]: /integrations/azure/
[13]: /graphing/notebooks/
[14]: /tagging/assigning_tags/
[15]: /logs/explorer/search/
[16]: /logs/explorer/analytics/
[17]: /logs/explorer/patterns/
[18]: /logs/live_tail/
[19]: /logs/processing/pipelines/
[20]: /api/
[21]: /api/?lang=python#query-the-event-stream
[22]: /api/?lang=python#search-hosts
[23]: /api/?lang=python#query-timeseries-points
[24]: /api/?lang=python#get-all-monitor-details
[25]: /api/?lang=python#mute-a-monitor
[26]: /api/?lang=python#create-a-screenboard
[27]: /api/?lang=python#create-a-timeboard

