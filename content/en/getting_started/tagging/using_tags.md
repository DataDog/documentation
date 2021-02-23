---
title: Using Tags
kind: documentation
aliases:
- /tagging/using_tags/
further_reading:
- link: "/getting_started/tagging/"
  tag: "Documentation"
  text: "Getting started with tags"
- link: "/getting_started/tagging/assigning_tags/"
  tag: "Documentation"
  text: "Learn how to assign tags"
- link: "https://www.datadoghq.com/blog/tagging-best-practices/"
  tag: "Blog"
  text: "Best practices for tagging your infrastructure and applications"
---

After [assigning tags][1], start using them to filter and group your data in your Datadog platform. Tags can be used to include or exclude data. When including or excluding multiple tags:

* Include uses `AND` logic
* Exclude uses `OR` logic

## Events

The [Events stream][2] shows the events from your environment over a specified time period. Use tags to filter the events list and focus on a subset of events. Enter `tags:` followed by a tag to see all the events coming from a host, [integration][3], or service with that tag. In the example below, `tags:service:coffee-house` is used to search for the tag `service:coffee-house`. To search multiple tags inclusively, separate each tag with OR: `tags:service:coffee-house OR host:coffeehouseprod`. To search multiple tags exclusively, separate each tag using commas: `tags:service:coffee-house,host:coffeehouseprod.`

{{< img src="tagging/using_tags/eventtags.png" alt="Events List and Tags" style="width:80%;">}}

## Dashboards

{{< tabs >}}
{{% tab "Assignment" %}}

Use tags to filter metrics to display in a [dashboard graph][1], or to create aggregated groups of metrics to display. To filter the metrics to display, enter the tag in the **from** textbox. You are now looking at a chosen metric over all sources that have that particular tag assigned (`service:coffee-house` in the example below).

{{< img src="tagging/using_tags/dashboardtags_1.png" alt="Tags in Dashboards from textbox"  style="width:80%;">}}

Advanced tag value filtering is also available with boolean filters. The following boolean syntax is supported:

* `NOT`, `!`
* `AND`, `,`
* `OR`
* `key IN (tag_value1, tag_value2,...)`
* `key NOT IN (tag_value1, tag_value2,...)`

Use `AND`, `ORs` to look at a metric across specific tags:

{{< img src="tagging/using_tags/dashboard_boolean_1.png" alt="Boolean Filter with AND/OR"  style="width:80%;">}}

Use `IN`, `NOT IN` to quickly filter a metric down to specific tags:

{{< img src="tagging/using_tags/dashboards_boolean_2.png" alt="Boolean Filter with IN/NOT IN"  style="width:80%;">}}

To create an aggregated group using tags, enter the key part of the tag in the **avg by** textbox. For example, if you have a timeseries graph showing a metric tagged with the key `service`, such as `service:coffee-house`, enter `service` in the **avg by** textbox to show one line for each `service` tag value. Each line represents the average metric value across all sources that share that `service` tag value.

{{< img src="tagging/using_tags/dashboardtags.png" alt="Tags in Dashboards avg by textbox"  style="width:80%;">}}

Tags can also be used to overlay events on the dashboard. This works the same way as in the [Events Stream][2].
Enter `tags:` followed by the tag. The matching events are overlaid as vertical bars on the graph. The example below uses `tags:service:coffee-house`.

{{< img src="tagging/using_tags/dashboardeventtags.png" alt="Event Overlays in Dashboards"  style="width:80%;">}}

Use [template variables][3] to save time switching the **from** tag on graphs in your dashboard. In the example below, `service` is used to represent the `service` tag key. To use the template variable, add the `$service` template variable in the **from** textbox of your graph query.

{{< img src="tagging/using_tags/dashboardtemplatevariables.png" alt="Dashboard Template Variables"  style="width:80%;">}}

[1]: /dashboards/
[2]: /events/
[3]: /dashboards/template_variables/
{{% /tab %}}
{{% tab "Examples" %}}

Here is an example of tags using the timeseries chart editor. For the first screenshot, no tags have been applied, and the average CPU usage across all hosts is displayed:

{{< img src="tagging/using_tags/Tags_1.png" alt="Tags_1"  style="width:75%;">}}

Next, the editor is updated to include a tag (`region:eastus`) in the **from** textbox that enables Datadog to look at CPU usage across the US East region. The `region` tag is used as an example here, but you could use any arbitrary tag sent to your Datadog platform, including `application`, `service`, `environment`, etc.

{{< img src="tagging/using_tags/Tags_2.png" alt="Tags_2"  style="width:75%;">}}

Finally, the second empty field (the **avg by** textbox) is used to show an individual timeseries line for each `host`. Server CPU is displayed for individual hosts running in the US East region.

{{< img src="tagging/using_tags/Tags_3.png" alt="Tags_3"  style="width:75%;">}}

If needed, add additional tags to narrow down the scope even further—for example, hosts in `region:eastus` and `env:production`. Tags can be used throughout Datadog and be applied to all core elements (metrics, traces, and logs).

{{% /tab %}}
{{< /tabs >}}

## Infrastructure

To filter the [Host Map][4], [Infrastructure List][5], [Containers][6], and [Processes][7], enter a tag in the **Filter by** textbox at the top of the page. Hosts and containers can be grouped by tag key using the **Group by** textbox. If you enter `service` in the group box, you see each service as a group heading.

{{< tabs >}}
{{% tab "Host Map" %}}

Under this section, use tags to filter or group Hosts:

{{< img src="tagging/using_tags/hostmaptags.png" alt="Host Map Tags"  style="width:80%;">}}

Or Containers:

{{< img src="tagging/using_tags/containermaptags.png" alt="Container Map Tags"  style="width:80%;">}}
{{% /tab %}}

{{% tab "Infrastructure List" %}}

Here are the filter and group by textboxes on the Infrastructure List page:

{{< img src="tagging/using_tags/infrastructuretags.png" alt="Tags in the Infrastructure List"  style="width:80%;">}}
{{% /tab %}}

{{% tab "Containers" %}}

Here are the filter and group by textboxes on the Live Containers page:

{{< img src="tagging/using_tags/livecontainertags.png" alt="Live Container Tags"  style="width:80%;">}}
{{% /tab %}}

{{% tab "Processes" %}}

Here are the filter and group by textboxes on the Live Processes page:

{{< img src="tagging/using_tags/liveprocessestags.png" alt="Live Process Tags"  style="width:80%;">}}
{{% /tab %}}
{{< /tabs >}}

## Monitors

{{< tabs >}}
{{% tab "Manage Monitors" %}}

To filter monitors by [assigned tags][1], use the search bar or facet checkboxes. The search bar format is `tag:<KEY>:<VALUE>`, for example `tag:service:coffee-house`. To exclude monitors with a specific tag from your search, use `-`, for example `tag:-service:coffee-house`. **Note**: Monitor tags are different and separate from metric tags.

{{< img src="tagging/using_tags/managemonitorstags.png" alt="Manage Monitors Tags"  style="width:80%;">}}

[1]: /getting_started/tagging/assigning_tags/
{{% /tab %}}

{{% tab "New Monitor" %}}

When creating a [monitor][1], use metric tags in the:

* **from** textbox to limit the monitor scope to only metrics that have those tags.

* **excluding** textbox to remove the corresponding metrics from the monitor scope.

* **avg by** textbox to transform the monitor into a multi-alert monitor on each tag value.

{{< img src="tagging/using_tags/newmonitortags.png" alt="New Monitor Tags"  style="width:80%;">}}

[1]: /monitors/monitor_types/
{{% /tab %}}
{{% tab "Manage Downtime" %}}

To filter [downtimes][1] by monitor tag, type the tag name in the search bar, for example `service:coffee-house`.

{{< img src="tagging/using_tags/managedowntimetags.png" alt="Manage Monitors Tags"  style="width:80%;">}}

[1]: /monitors/downtimes/
{{% /tab %}}
{{< /tabs >}}

## Metrics

Use tags in the [Metrics Explorer][8] to filter metrics over tags or display multiple graphs by tag key. The example below graphs a metric over `service:coffee-house` and displays one graph per `host`.

{{< img src="tagging/using_tags/metricsexplorertags.png" alt="Manage Monitors Tags"  style="width:80%;">}}

## Integrations

Some integrations allow you to optionally limit metrics using tags.

{{< tabs >}}
{{% tab "AWS" %}}

The [AWS integration tile][1] has the tag filters `to hosts with tag` and `to Lambdas with tag`.

These fields accept a comma separated list of tags (in the form `<KEY>:<VALUE>`) that defines a filter, which is used for collecting your EC2 or Lambda resources. You can use these `<KEY>:<VALUE>` to both include and exclude functions based from monitoring based on tags. To specify that tag should be excluded, add a `!` before the tag key. You can also use wildcards, such as `?` (for single characters) and `*` (for multiple characters).

The filters include resources where any inclusion tag is present by using an `OR` statement. The following example filter collects EC2 instances that contain the tag `datadog:monitored` OR `env:production`:

```text
datadog:monitored,env:production
```

If you specified an exclusion a tag, it takes precedence and forms an `AND` statement. The following example filter collects EC2 instances that contain the tag `datadog:monitored`, OR `env:production`, OR an `instance-type` tag with a `c1.*` value AND NOT a `region:us-east-1` tag:

```text
datadog:monitored,env:production,instance-type:c1.*,!region:us-east-1
```

Read more about AWS tagging in the [EC2][2] and [Lambda][3] documentation.

[1]: https://app.datadoghq.com/account/settings#integrations/amazon-web-services
[2]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/Using_Tags.html
[3]: https://docs.aws.amazon.com/lambda/latest/dg/tagging.html
{{% /tab %}}
{{% tab "Azure" %}}

The [Azure integration tile][1] has the tag filter `Optionally filter to VMs with tag`.

This field accepts a comma separated list of tags (in the form `<KEY>:<VALUE>`) that defines a filter, which is used for collecting metrics from Azure VMs. You can also use wildcards, such as `?` (for single characters) and `*` (for multiple characters). Only VMs that match one of the defined tags are imported into Datadog. The rest are ignored.

VMs matching a given tag can also be excluded by adding `!` before the tag, for example:

```text
datadog:monitored,env:production,!env:staging,instance-type:c1.*
```

[1]: https://app.datadoghq.com/account/settings#integrations/azure
{{% /tab %}}
{{% tab "Google Cloud" %}}

The [Google Cloud integration tile][1] has the tag filter `to hosts with tag`.

This field accepts a comma separated list of GCP labels (in the form `<KEY>:<VALUE>`) that defines a filter, which is used for collecting metrics from GCP. You can also use wildcards, such as `?` (for single characters) and `*` (for multiple characters). Only hosts that match one of the defined labels are imported into Datadog. The rest are ignored.

You can exclude hosts matching a given label by adding `!` before the tag, for example:

```text
datadog:monitored,env:production,!env:staging,instance-type:c1.*
```

Read more about GCP labeling in the [GCP documentation][2].

[1]: https://app.datadoghq.com/account/settings#integrations/google-cloud-platform
[2]: https://cloud.google.com/compute/docs/labeling-resources
{{% /tab %}}
{{< /tabs >}}

## APM

{{< tabs >}}
{{% tab "Analytics" %}}

For [Trace Search][1], filter traces with tags using the search bar or facet checkboxes. The search bar format is `<KEY>:<VALUE>`, for example `service:coffee-house`. For advanced search, see the [trace search][2] page.

{{< img src="tagging/using_tags/tracesearchtags.png" alt="Trace Search Tags"  style="width:80%;">}}

[1]: /tracing/app_analytics/search/
[2]: /tracing/app_analytics/search/#search-bar
{{% /tab %}}
{{% tab "Service Map" %}}

After [assigning tags][1], use the Service Map to jump to different areas of the application by clicking on a particular service. In the example below, view [Analytics][2], [Monitors][3], [Logs][4], and the [Host Map][5] filtered by the tag `service:coffee-house`.

{{< img src="tagging/using_tags/servicemaptags.png" alt="Service Map Tags"  style="width:80%;">}}

[1]: /getting_started/tagging/assigning_tags/
[2]: /tracing/app_analytics/search/
[3]: /monitors/manage_monitor/
[4]: /logs/explorer/search/
[5]: /infrastructure/hostmap/
{{% /tab %}}

{{< /tabs >}}

## Notebooks

When creating a [Notebook][9] graph, limit metrics by using tags in the **from** textbox. Additionally, group metrics by using tags in the **avg by** textbox. In the example below, metrics are limited to `service:coffee-house` and grouped by `host`.

{{< img src="tagging/using_tags/notebooktags.png" alt="Notebook Tags"  style="width:80%;">}}

To exclude tags, use `</>` to edit the text then add the tag in the form `!<KEY>:<VALUE>`. In the example below, `service:coffeehouse` is excluded using `!service:coffeehouse`.

{{< img src="tagging/using_tags/notebooktagsexclude.mp4" alt="Notebook Exclude Tags" video="true"  width="80%">}}

## Logs

For Logs [Search][10], [Analytics][11], [Patterns][12], and [Live Tail][13] filter logs with tags using the search bar or facet checkboxes. The search bar format is `<KEY>:<VALUE>`, for example `service:coffee-house`. For advanced search, see the [log search][10] page.

{{< tabs >}}
{{% tab "Search" %}}

{{< img src="tagging/using_tags/logsearchtags.png" alt="Log Search Tags"  style="width:80%;">}}

{{% /tab %}}
{{% tab "Analytics" %}}

{{< img src="tagging/using_tags/loganalyticstags.png" alt="Log Analytics Tabs"  style="width:80%;">}}

{{% /tab %}}
{{% tab "Patterns" %}}

{{< img src="tagging/using_tags/logpatternstags.png" alt="Log Patterns Tags"  style="width:80%;">}}

{{% /tab %}}
{{% tab "Live Tail" %}}

{{< img src="tagging/using_tags/livetailtags.mp4" alt="Live Tail Tags" video="true"  width="80%">}}

{{% /tab %}}
{{< /tabs >}}

Additionally, tags are used to filter a logs [Pipeline][14]. In the example below, the pipeline filters logs by the tag `service:coffee-house`.

{{< img src="tagging/using_tags/logpipelinetags.png" alt="Pipeline Tags"  style="width:80%;">}}


## Service level objectives

{{< tabs >}}
{{% tab "Manage SLOs" %}}

To filter SLOs by [assigned tags][1], use the search bar or facet checkboxes. The search bar format is `<KEY>:<VALUE>`, for example `journey:add_item`. To exclude SLOs with a specific tag from your search, use `-`, for example `-journey:add_item`. **Note**: SLO tags are different and separate from metric or monitor tags used in the underlying metrics or monitors of an SLO.

{{< img src="tagging/using_tags/manage_slo_tags.png" alt="SLO Tags"  style="width:80%;">}}

[1]: /getting_started/tagging/assigning_tags/?tab=servicelevelobjectives#ui
{{% /tab %}}

{{% tab "Metric-based SLOs" %}}

When creating a [metric-based SLO][1], use metric tags in the SLO's success ratio metric queries (all metrics must use the same set of metric tags):

* **from** textbox to limit the metric scope to only those tags.
* **sum by** textbox to create a grouped metric-based SLO that display a status percentage and remaining error budget for both the overall SLO and for each tag value.

{{< img src="tagging/using_tags/metric_based_slo_tags.png" alt="Metric-based SLO Tags"  style="width:80%;">}}

[1]: /monitors/service_level_objectives/metric/
{{% /tab %}}
{{% tab "Monitor-based SLOs" %}}

When creating a [monitor-based SLO][1] using a single [grouped monitor][2], use the **Calculate on selected groups** toggle to select up to 20 tag values from the underlying monitor to display a status percentage and remaining error budget for both the overall SLO and for each tag value:

{{< img src="tagging/using_tags/monitor_based_slo_tags.png" alt="Monitor-based SLO Tags"  style="width:80%;">}}

[1]: /monitors/service_level_objectives/monitor/
[2]: /getting_started/tagging/using_tags/?tab=newmonitor#monitors
{{% /tab %}}
{{< /tabs >}}

## Developers

Tags can be used in various ways with the [API][15]. See the list below for links to those sections:

* [Schedule monitor downtime][16]
* [Query the event stream][17]
* [Search hosts][18]
* Integrations for [AWS][19] and [Google Cloud][20]
* [Querying timeseries points][21]
* [Get all monitor details][22]
* [Mute a monitor][23]
* [Monitors search][22]
* [Monitors group search][22]
* [Create a Screenboard][24]
* [Create a Timeboard][24]
* [Create a SLO][25]
* [Get a SLO's details][26]
* [Update a SLO][27]

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /getting_started/tagging/assigning_tags/
[2]: /events/
[3]: /integrations/
[4]: /infrastructure/hostmap/
[5]: /infrastructure/
[6]: /infrastructure/livecontainers/
[7]: /infrastructure/process/
[8]: /metrics/explorer/
[9]: /notebooks/
[10]: /logs/explorer/search/
[11]: /logs/explorer/analytics/
[12]: /logs/explorer/patterns/
[13]: /logs/live_tail/
[14]: /logs/processing/pipelines/
[15]: /api/
[16]: /api/v1/downtimes/#schedule-a-downtime
[17]: /api/v1/events/#query-the-event-stream
[18]: /api/v1/hosts/
[19]: /api/v1/aws-integration/
[20]: /api/v1/gcp-integration/
[21]: /api/v1/metrics/#query-timeseries-points
[22]: /api/v1/monitors/#get-all-monitor-details
[23]: /api/v1/monitors/#mute-a-monitor
[24]: /api/v1/dashboards/#create-a-new-dashboard
[25]: /api/v1/service-level-objectives/#create-a-slo-object
[26]: /api/v1/service-level-objectives/#get-a-slos-details
[27]: /api/v1/service-level-objectives/#update-a-slo
