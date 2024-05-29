---
title: Using Tags
kind: documentation
description: Learn how to use tags in Datadog products.
aliases:
- /tagging/using_tags/
further_reading:
- link: "https://www.datadoghq.com/blog/tagging-best-practices/"
  tag: "Blog"
  text: "Best practices for tagging your infrastructure and applications"
- link: "/getting_started/tagging/"
  tag: "Documentation"
  text: "Getting started with tags"
- link: "/getting_started/tagging/assigning_tags/"
  tag: "Documentation"
  text: "Learn how to assign tags"
---

## Overview

After [assigning tags][1], start using them to filter and group your data in your Datadog platform. Tags can be used to include or exclude data.

When including or excluding multiple tags:

* Include uses `AND` logic
* Exclude uses `OR` logic

## Events

The [Events Explorer][2] shows the events from your environment over a specified time period. Use tags to filter the events list and focus on a subset of events. Enter `tags:` followed by a tag to see all the events coming from a host, [integration][3], or service with that tag. For example, use `tags:service:coffee-house` to search for the tag `service:coffee-house`.

To search multiple tags inclusively, use parentheses and separate each tag with OR: `tags:(service:coffee-house OR host:coffeehouseprod)`. To search multiple tags exclusively, separate each tag with AND: `tags:(service:coffee-house AND host:coffeehouseprod)`.

## Dashboards

{{< tabs >}}
{{% tab "Assignment" %}}

Use tags to filter metrics to display in a [dashboard graph][1], or to create aggregated groups of metrics to display. To filter the metrics to display, enter the tag in the **from** text box. This metric displays over all sources that have that particular tag assigned (`service:web-store` in the example below).

{{< img src="tagging/using_tags/dashboards_tags_example.png" alt="Filter metrics in dashboards by adding a tag to the 'from' field, in this example the metric is filtered to 'service:web-store'" style="width:80%;">}}

Advanced tag value filtering is also available with boolean filters. The following boolean syntax is supported:

* `NOT`, `!`
* `AND`, `,`
* `OR`
* `key IN (tag_value1, tag_value2,...)`
* `key NOT IN (tag_value1, tag_value2,...)`

Use `AND`, `ORs` to look at a metric across specific tags:

{{< img src="tagging/using_tags/dashboard_advanced_tags_AND_OR.png" alt="Boolean Filter with AND/OR" style="width:80%;">}}

Use `IN`, `NOT IN` to quickly filter a metric down to specific tags:

{{< img src="tagging/using_tags/dashboard_advanced_tags_NOT_IN.png" alt="Boolean Filter with IN/NOT IN" style="width:80%;">}}

To create an aggregated group using tags, enter the key part of the tag in the **avg by** text box. For example, if you have a timeseries graph showing a metric tagged with the key `service`, such as `service:web-store`, enter `service` in the **avg by** text box to show one line for each `service` tag value. Each line represents the average metric value across all sources that share that `service` tag value.

{{< img src="tagging/using_tags/dashboard_group_by_tags.png" alt="Tags in Dashboards avg by text box" style="width:80%;">}}

Tags can also be used to overlay events on the dashboard. This works the same way as in the [Events Explorer][2].
The matching events are overlaid as vertical bars on the graph. The example below uses `service:web-store`.

{{< img src="tagging/using_tags/dashboard_event_overlays.png" alt="Use tags to add Event Overlays in Dashboards" style="width:80%;">}}

Use [template variables][3] to save time switching the **from** tag on graphs in your dashboard. In the example below, `service` is used to represent the `service` tag key. To use the template variable, add the `$service` template variable in the **from** text box of your graph query.

{{< img src="tagging/using_tags/dashboard_dynamic_template_variables.png" alt="Dashboard Template Variables" style="width:80%;">}}

[1]: /dashboards/
[2]: /events/
[3]: /dashboards/template_variables/
{{% /tab %}}
{{% tab "Examples" %}}

Here is an example of tags using the timeseries graph editor. For the first screenshot, no tags have been applied, and the average CPU usage across all hosts is displayed:

{{< img src="tagging/using_tags/dashboard_timeseries_graph_editor_no_tags.png" alt="Timeseries graph editor with no tags added" style="width:75%;">}}

Next, the editor is updated to include a tag (`region:eastus`) in the **from** text box that enables Datadog to look at CPU usage across the US East region. The `region` tag is used as an example here, but you could use any arbitrary tag sent to your Datadog platform, including `application`, `service`, or `environment`.

{{< img src="tagging/using_tags/dashboard_timeseries_graph_editor_from_tag.png" alt="Timeseries graph editor filtered by the 'region:us-east-1' tag" style="width:75%;">}}

Finally, the second empty field (the **avg by** text box) is used to show an individual timeseries line for each `host`. Server CPU is displayed for individual hosts running in the US East region.

{{< img src="tagging/using_tags/dashboard_timeseries_graph_editor_sumby_tag.png" alt="Timeseries graph editor filtered by 'region:us-east-1' and grouped by 'host'" style="width:75%;">}}

If needed, add additional tags to narrow down the scope even further—for example, hosts in `region:eastus` and `env:production`. Tags can be used throughout Datadog and be applied to all core elements (metrics, traces, and logs).

{{% /tab %}}
{{< /tabs >}}

## Infrastructure

To filter the [Host Map][4], [Infrastructure List][5], [Containers][6], and [Processes][7], enter a tag in the **Filter by** text box at the top of the page. Hosts and containers can be grouped by tag key using the **Group by** text box. If you enter `service` in the group box, you see each service as a group heading.

{{< tabs >}}
{{% tab "Host Map" %}}

Under this section, use tags to filter or group Hosts:

{{< img src="tagging/using_tags/hostmaptags.png" alt="Host Map Tags" style="width:80%;">}}

Or Containers:

{{< img src="tagging/using_tags/containermaptags.png" alt="Container Map Tags" style="width:80%;">}}
{{% /tab %}}

{{% tab "Infrastructure List" %}}

Here are the filter and group by text boxes on the Infrastructure List page:

{{< img src="tagging/using_tags/infrastructuretags.png" alt="Tags in the Infrastructure List" style="width:80%;">}}
{{% /tab %}}

{{% tab "Containers" %}}

Here are the filter and group by text boxes on the Live Containers page:

{{< img src="tagging/using_tags/livecontainertags.png" alt="Live Container Tags" style="width:80%;">}}
{{% /tab %}}

{{% tab "Processes" %}}

Here are the filter and group by text boxes on the Live Processes page:

{{< img src="tagging/using_tags/liveprocessestags.png" alt="Live Process Tags" style="width:80%;">}}
{{% /tab %}}
{{< /tabs >}}

## Monitors

To filter monitors and [monitor downtimes][31] by [assigned tags][32], use the search bar or facet checkboxes. The search bar format is `tag:<KEY>:<VALUE>`, for example: `tag:service:coffee-house`. To exclude monitors with a specific tag from your search, use `-`, for example: `tag:-service:coffee-house`.

{{< img src="/tagging/using_tags/manage_monitor_tags.png" alt="Filter monitors in the search bar with tags" style="width:80%;">}}

**Note**: Monitor tags are different and separate from metric tags. For more information, see the documentation on [Monitor tags][30].

When creating a new monitor, use *metric tags* in the:
* **from** text box to limit the monitor scope to only metrics that have those tags.
* **excluding** text box to remove the corresponding metrics from the monitor scope.
* **avg by** text box to transform the monitor into a multi alert monitor on each tag value.

## Metrics

Use tags in the [Metrics Explorer][8] to filter metrics over tags or display multiple graphs by tag key. The example below graphs a metric over `service:web-store`.

{{< img src="tagging/using_tags/metrics_explorer.png" alt="A metric graph scoped to an individual tag" style="width:80%;">}}

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

Read more about [Creating and managing labels][2] in the Google Cloud documentation.

[1]: https://app.datadoghq.com/account/settings#integrations/google-cloud-platform
[2]: https://cloud.google.com/compute/docs/labeling-resources
{{% /tab %}}
{{< /tabs >}}

## APM

{{< tabs >}}
{{% tab "Trace Explorer" %}}

In the [Trace Explorer][1], you can filter traces with tags using the search bar or facet checkboxes. The search bar format is `<KEY>:<VALUE>`, for example: `service:coffee-house`. For advanced search, see [Query Syntax][2].

{{< img src="tagging/using_tags/trace_explorer.png" alt="Trace Explorer Tags" style="width:80%;">}}

[1]: /tracing/trace_explorer/search/
[2]: /tracing/trace_explorer/query_syntax/
{{% /tab %}}
{{% tab "Service Map" %}}

After [assigning tags][1], use the Service Map to navigate to different areas of the application by clicking on a particular service. In the example below, view [Analytics][2], [Monitors][3], [Logs][4], and the [Host Map][5] filtered by the tag `service:coffee-house`.

{{< img src="tagging/using_tags/servicemaptags.png" alt="Service Map Tags" style="width:80%;">}}

[1]: /getting_started/tagging/assigning_tags/
[2]: /tracing/app_analytics/search/
[3]: /monitors/manage/
[4]: /logs/explorer/search/
[5]: /infrastructure/hostmap/
{{% /tab %}}

{{< /tabs >}}

## Notebooks

When creating a [Notebook][9] graph, limit metrics by using tags in the **from** text box. Additionally, group metrics by using tags in the **avg by** text box. In the example below, metrics are limited to `service:coffee-house` and grouped by `host`.

{{< img src="tagging/using_tags/notebooktags.png" alt="Notebook Tags" style="width:80%;">}}

To exclude tags, use `</>` to edit the text then add the tag in the form `!<KEY>:<VALUE>`. In the example below, `service:coffeehouse` is excluded using `!service:coffeehouse`.

{{< img src="tagging/using_tags/notebooktagsexclude.mp4" alt="Notebook Exclude Tags" video="true" width="80%">}}

## Logs

For Logs [Search][10], [Analytics][11], [Patterns][12], and [Live Tail][13], filter logs with tags using the search bar or facet checkboxes. The search bar format is `<KEY>:<VALUE>`, for example: `service:coffee-house`. For advanced search, see [Search Logs][10].

{{< tabs >}}
{{% tab "Search" %}}

{{< img src="tagging/using_tags/logsearchtags.png" alt="Log Search Tags" style="width:80%;">}}

{{% /tab %}}
{{% tab "Analytics" %}}

{{< img src="tagging/using_tags/loganalyticstags.png" alt="Log Analytics Tags" style="width:80%;">}}

{{% /tab %}}
{{% tab "Patterns" %}}

{{< img src="tagging/using_tags/logpatternstags.png" alt="Log Patterns Tags" style="width:80%;">}}

{{% /tab %}}
{{% tab "Live Tail" %}}

{{< img src="tagging/using_tags/livetailtags.mp4" alt="Live Tail Tags" video="true" width="80%">}}

{{% /tab %}}
{{< /tabs >}}

Additionally, tags are used to filter a logs [Pipeline][14]. In the example below, the pipeline filters logs by the tag `service:coffee-house`.

{{< img src="tagging/using_tags/logpipelinetags.png" alt="Pipeline Tags" style="width:80%;">}}

## RUM & Session Replay

The [RUM Explorer][15] visualizes events from your environment over a specified time period.

To filter RUM event data by tags, use the search bar or facet checkboxes. The search bar format is `<KEY>:<VALUE>`, for example: `service:shopist`. For advanced search, see [Search RUM Events][16].

{{< img src="tagging/using_tags/rumtags.png" alt="RUM Tags" style="width:80%;">}}

## Synthetics

{{< tabs >}}
{{% tab "Synthetic Tests" %}}

The [Synthetic Tests][1] page lists your Synthetic tests.

To filter tests by tags, use the search bar or facet checkboxes. The search bar format is `<KEY>:<VALUE>`. For example: `tag:mini-website`. For advanced search, see [Search and Manage Synthetic Tests][2].

{{< img src="tagging/using_tags/syntheticstags.png" alt="Synthetics Tags" style="width:80%;">}}


[1]: https://app.datadoghq.com/synthetics/tests
[2]: /synthetics/search/
{{% /tab %}}
{{% tab "Explorer" %}}

The [Synthetic Monitoring & Testing Results Explorer][1] displays your test runs and batches of runs in a [CI pipeline][2].

To filter test runs by tags, use the search bar or facet checkboxes. The search bar format is `<KEY>:<VALUE>`. For example: `@ci.provider.name:github`. For advanced search, see [Search Test Batches][3].

{{< img src="tagging/using_tags/syntheticscitags.png" alt="Synthetics and CI Tags" style="width:80%;">}}


[1]: https://app.datadoghq.com/synthetics/explorer/
[2]: /continuous_testing/cicd_integrations
[3]: /continuous_testing/explorer/search/
{{% /tab %}}
{{< /tabs >}}

## Service level objectives

{{< tabs >}}
{{% tab "Manage SLOs" %}}

To filter SLOs by [assigned tags][1], use the search bar or facet checkboxes. The search bar format is `<KEY>:<VALUE>`, for example: `journey:add_item`. To exclude SLOs with a specific tag from your search, use `-`, for example: `-journey:add_item`.

{{< img src="tagging/using_tags/manage_slo_tags.png" alt="SLO Tags" style="width:80%;">}}

SLO tags are different and separate from metric or monitor tags used in the underlying metrics or monitors of an SLO.

[1]: /getting_started/tagging/assigning_tags/?tab=servicelevelobjectives#ui
{{% /tab %}}

{{% tab "Metric-based SLOs" %}}

When creating a [metric-based SLO][1], use metric tags in the SLO's success ratio metric queries (all metrics must use the same set of metric tags):

* **from** text box to limit the metric scope to only those tags.
* **sum by** text box to create a grouped metric-based SLO that display a status percentage and remaining error budget for both the overall SLO and for each tag value.

[1]: /service_management/service_level_objectives/metric/
{{% /tab %}}
{{% tab "Monitor-based SLOs" %}}

When creating a [monitor-based SLO][1] using a single [grouped monitor][2], use the **Calculate on selected groups** toggle to select up to 20 tag values from the underlying monitor to display a status percentage and remaining error budget for both the overall SLO and for each tag value:

{{< img src="tagging/using_tags/monitor_based_slo_tags.png" alt="Monitor-based SLO Tags" style="width:80%;">}}

[1]: /service_management/service_level_objectives/monitor/
[2]: /getting_started/tagging/using_tags/?tab=newmonitor#monitors
{{% /tab %}}
{{< /tabs >}}

## CI Visibility

{{< tabs >}}
{{% tab "Test Runs" %}}

The [CI Visibility Explorer][101] displays your test runs run in a CI pipeline.

To filter test runs by tags, use the search bar or facet checkboxes. The search bar format is `<KEY>:<VALUE>`. For example: `@test.status:failed`. For advanced search, see [Search and Manage CI Tests][102].

{{< img src="/continuous_integration/test_runs.png" alt="Test runs in the CI Visibility Explorer" style="width:80%;">}}

[101]: https://app.datadoghq.com/ci/test-runs
[102]: /tests/search/

{{% /tab %}}
{{% tab "Pipeline Executions" %}}

The [CI Visibility Explorer][101] displays your CI pipeline executions.

To filter pipeline executions by tags, use the search bar or facet checkboxes. The search bar format is `<KEY>:<VALUE>`. For example: `@ci.provider.name:gitlab`. For advanced search, see [Search and Manage CI Pipelines][102].

{{< img src="/continuous_integration/pipeline_executions.png" alt="Pipeline executions in the CI Visibility Explorer" style="width:80%;">}}

[101]: https://app.datadoghq.com/ci/pipeline-executions
[102]: /continuous_testing/explorer/search/

{{% /tab %}}
{{< /tabs >}}

## Developers

Tags can be used in various ways with the [API][17].

See this list for links to respective sections:

* [Schedule monitor downtime][18]
* [Query the event explorer][19]
* [Search hosts][20]
* Integrations for [AWS][21] and [Google Cloud][22]
* [Querying timeseries points][23]
* [Get all monitor details][24]
* [Mute a monitor][25]
* [Monitors search][24]
* [Monitors group search][24]
* [Create a Screenboard][26]
* [Create a Timeboard][26]
* [Create a SLO][27]
* [Get a SLO's details][28]
* [Update a SLO][29]

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /getting_started/tagging/assigning_tags/
[2]: /service_management/events/explorer
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
[14]: /logs/log_configuration/pipelines
[15]: /real_user_monitoring/explorer/
[16]: /real_user_monitoring/explorer/search/
[17]: /api/
[18]: /api/v1/downtimes/#schedule-a-downtime
[19]: /api/v1/events/#query-the-event-stream
[20]: /api/v1/hosts/
[21]: /api/v1/aws-integration/
[22]: /api/v1/gcp-integration/
[23]: /api/v1/metrics/#query-timeseries-points
[24]: /api/v1/monitors/#get-all-monitor-details
[25]: /api/v1/monitors/#mute-a-monitor
[26]: /api/v1/dashboards/#create-a-new-dashboard
[27]: /api/v1/service-level-objectives/#create-a-slo-object
[28]: /api/v1/service-level-objectives/#get-a-slos-details
[29]: /api/v1/service-level-objectives/#update-a-slo
[30]: /monitors/manage/#monitor-tags
[31]: /monitors/downtimes/
[32]: /getting_started/tagging/assigning_tags?tab=monitors