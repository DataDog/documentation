---
title: Metrics Catalog
description: "Search, filter, and manage all metrics reporting to Datadog, and monitor your custom metrics volume."
aliases:
  - /graphing/faq/how-can-i-set-up-custom-units-for-custom-metrics
  - /graphing/metrics/summary/
  - /metrics/summary/
  - /metrics/volume/
further_reading:
  - link: "/metrics/explorer/"
    tag: "Documentation"
    text: "Metrics Explorer"
  - link: "/metrics/distributions/"
    tag: "Documentation"
    text: "Metrics Distributions"
  - link: "/metrics/metrics-without-limits/"
    tag: "Documentation"
    text: "Metrics without Limits™"
  - link: "/metrics/custom_metrics/"
    tag: "Documentation"
    text: "Custom Metrics"
---

## Overview

The [Metrics Catalog page][1] lists all of your metrics reported to Datadog, both custom and standard, for a specified time frame. The default time frame is the past 4 hours.

{{< img src="metrics/catalog/catalog_overview_2026-11-04.png" alt="The Metrics Catalog page, showing the custom metrics usage graphs, the Metric and Tag search fields, the facet panel, and the metrics table." style="width:100%;" >}}

Use the Metrics Catalog page to discover and understand your metrics, and to manage your custom metrics volume.

To discover and understand your metrics, you can:
- Search for metrics by metric name or tag, with fuzzy matching and Boolean tag filters.
- Filter metrics with facets, such as metric type, metric origin, and query activity.
- View a metric's metadata, tags, source code, and the assets that use it.

To manage your custom metrics volume, you can:
- Monitor your account's estimated indexed and ingested custom metrics usage in real time.
- Find your largest metric names and the metric names with the greatest change in volume.
- Identify metrics that aren't queried or used in any assets.
- Configure tags, percentiles, and historical metrics ingestion for your metrics.

## Discover metrics

Use search, facets, the metrics table, and the metric details side panel to find metrics and understand how they're configured and used.

### Search and filter

Search your metrics by metric name or tag using the {{< ui >}}Metric{{< /ui >}} or {{< ui >}}Tag{{< /ui >}} search fields:

{{< img src="metrics/summary/tag_advanced_filtering.png" alt="The metrics summary page with NOT team:* entered in the Tag search bar" style="width:75%;">}}

**Note**: Tag values are retained in the {{< ui >}}Tag{{< /ui >}} search field for 28 hours. Values not submitted in the past 28 hours do not appear as search options, even if they remain visible in the metric details side panel.

You can also discover relevant metrics using enhanced fuzzy matching support in the Metrics search field:

{{< img src="metrics/summary/metric_advanced_filtering_fuzzy.png" alt="The metrics summary page with fuzzy search searching shopist checkout" style="width:75%;">}}

Tag filtering supports Boolean and wildcard syntax so that you can identify: 
* Metrics that are tagged with a particular tag key, for example, `team`: `team:*`
* Metrics that are missing a particular tag key, for example, `team`: `NOT team:*`

### Facet panel

The search fields provide the most comprehensive set of actions to filter the list of metrics. You can also filter your metrics with facets, which are grouped into {{< ui >}}Core{{< /ui >}}, {{< ui >}}Usage{{< /ui >}}, and {{< ui >}}Configuration{{< /ui >}} sections.

#### Core facets

- {{< ui >}}Metric Category{{< /ui >}}: Whether the metric is a custom metric or a standard integration metric.
- {{< ui >}}Metric Type{{< /ui >}}: Whether the metric is a distribution or a non-distribution metric (count, gauge, or rate).
- {{< ui >}}Metric Origin{{< /ui >}}: The product from which the metric originated (for example, metrics generated from Logs or APM Spans). To learn more about the different metric origin types, see the [Metric origin definitions](#metric-origin-definitions) section.

#### Usage facets

- {{< ui >}}Query Activity{{< /ui >}}: Metrics not queried in Datadog or by the API in the past 30, 60, or 90 days.
- {{< ui >}}Related Assets{{< /ui >}}: Metrics that are used in dashboards, notebooks, monitors, and SLOs.
- {{< ui >}}First Submitted{{< /ui >}}: How long ago the metric was first submitted to Datadog, from {{< ui >}}Less than 1 week ago{{< /ui >}} to {{< ui >}}Over 1 year ago{{< /ui >}}.

A metric is **unqueried** if it has not been accessed in monitors, SLOs, executed notebooks, opened dashboards, used in Metrics Explorer queries, or accessed through API calls within the past 30, 60, or 90 days.

A metric is considered **used** as long as it exists on an asset, regardless if it has been actively queried.

#### Configuration facets

- {{< ui >}}Percentiles{{< /ui >}}: Distribution metrics with percentiles and advanced query capabilities enabled.
- {{< ui >}}Historical Metrics{{< /ui >}}: Metrics that have historical metrics ingestion enabled.
- {{< ui >}}Tag Configuration{{< /ui >}}: Metrics with tag configurations.

{{< img src="metrics/catalog/facet_panel_2026-11-03.png" alt="The facet panel with the Core, Usage, and Configuration facet groups expanded." style="width:40%;" >}}

### Metrics table

The metrics table lists your metrics with their configuration and volume details. You can hide any column except {{< ui >}}Metric Name{{< /ui >}}. By default, the table displays the following columns:

| Column | Description |
|--------|-------------|
| {{< ui >}}Metric Name{{< /ui >}} | The name of the metric. Click a metric name to open its details side panel. For more information, see the [Metric details side panel](#metric-details-sidepanel) section. |
| {{< ui >}}First Submitted{{< /ui >}} | How long ago the metric was first submitted. |
| {{< ui >}}Last Tag Configuration{{< /ui >}} | When the metric's tag configuration was last changed. |
| {{< ui >}}Est. Ingested Metrics{{< /ui >}} | The estimated number of ingested custom metrics that the metric name emits. |
| {{< ui >}}Est. Indexed Metrics{{< /ui >}} | The estimated number of indexed custom metrics that the metric name emits. |
| {{< ui >}}Change in Volume{{< /ui >}} | The change in the metric name's indexed custom metrics volume over the selected time frame. |

Volume columns apply only to custom metrics. For standard metrics, the {{< ui >}}Est. Ingested Metrics{{< /ui >}}, {{< ui >}}Est. Indexed Metrics{{< /ui >}}, and {{< ui >}}Change in Volume{{< /ui >}} columns display a dash (—).

**Note**: For customers on the Metric Name Pricing model, "Points" replaces "Metrics" in the volume column names.

To sort the list, click a column header.

#### Customize columns

You can show, hide, reorder, and resize the columns in the metrics table. Datadog saves your column choices to your user account.

To show, hide, or reorder columns:
1. Click {{< ui >}}Columns{{< /ui >}} above the metrics table.
2. In the {{< ui >}}Manage Columns{{< /ui >}} menu, use the toggles to show or hide columns. The {{< ui >}}Metric Name{{< /ui >}} column is always shown.
3. Drag columns in the menu to reorder them.

To resize a column, drag the edge of its header in the metrics table.

To restore the default columns, click {{< ui >}}Reset default columns{{< /ui >}}.

{{< img src="metrics/catalog/manage_columns_2026-11-04.png" alt="The Manage Columns menu, with toggles to show or hide each column and a Reset default columns option." style="width:40%;" >}}

#### Download as CSV

To download the metrics table, click the download icon ({{< ui >}}Download as CSV{{< /ui >}}) next to {{< ui >}}Columns{{< /ui >}}. The CSV file includes only the columns that are visible in the table.

### Metric details side panel {#metric-details-sidepanel}

Click any metric name to open its details side panel, which shows the metric's metadata and tags:

{{< img src="metrics/summary/mwl_sidepanel.jpg" alt="Metric panel" style="width:75%;">}}

The side panel shows the following details for the metric:

| Field | Description |
|-------|-------------|
| Metric name | The name of your metric in the [Metrics Explorer][2], [dashboards][3], etc. |
| Ingested custom metrics | A metric name may emit multiple ingested custom metrics depending on its associated tag value combinations. Ingested custom metrics represent all of the data originally submitted with code. Learn more in the [custom metrics][4] documentation. |
| Indexed custom metrics | Unlike ingested custom metrics, indexed custom metrics represent those that remain queryable across the Datadog platform. This number may be impacted by adding or removing percentile aggregations or by use of Metrics without Limits™. Learn more in the [Metrics without Limits™][0] documentation. |
| Hosts | The total number of hosts reporting a metric. |
| Tag values | The total number of unique tag values attached to a metric. [Learn more about tagging][5]. |

#### Metrics metadata

The metadata attached to your metric. You can edit most of the metadata on the Metrics Catalog page or with the [Datadog API][6].

##### Metric unit

The unit for your metric (byte, second, request, query, etc.). See the [metric unit][7] page for more details.

When you submit custom metrics to Datadog, you can change the [unit of measurement][7] that displays when you hover over the metric in your graph.

**Note**: This does not change how a metric graph is displayed. It only changes the units of measurement that raw values are considered as when you hover over a metric. Formatting is automatically applied for readability. For example, bytes (`B`) may be displayed as kilobytes (`KiB`).

##### Metric type

The type for your metric (gauge, rate, count, distribution). See the [metric type][8] page for more details.

**Warning**: Editing the metric type changes that metric's behavior for **ALL** your dashboards and monitors.

##### Integration name

If the metric is coming from a supported [integration][9], the metadata lists the integration name. This information cannot be edited.

##### Interval

The collection interval for the metric in seconds.

##### Metric description

The metric description helps you understand what a metric represents, why it exists, and how it is typically used. Use this field to view and update descriptions for your [custom metrics][4]. Descriptions are pre-populated for metrics coming from supported [integrations][9].

##### AI-generated description

{{< site-region region="gov,gov2" >}}
<div class="alert alert-info">AI-generated metric descriptions are not available for your selected Datadog site ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

For custom metrics, Datadog can automatically generate descriptions using available context, including the metric's name, meaningful tags, query activity, and connected source code. To use source code as additional context, install Datadog's [GitHub][36], [GitLab][37], or [Azure DevOps][38] integration and connect your [repositories][39].

{{< img src="metrics/summary/metric_ai_generated_descriptions_03062026.png" alt="An AI-generated metric description in the metric details side panel." style="width:80%;">}}


#### Source Code

{{< site-region region="gov,gov2" >}}
<div class="alert alert-info">Metric Source Code is not available for your selected Datadog site ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

The Source Code section in the metric side panel provides a centralized view of every custom metric and its underlying context.

Use the Source Code section in the metric side panel to identify a metric's source code, understand how it is generated, and determine ownership. It provides visibility into context and ownership, helping you troubleshoot and optimize faster by linking directly to the metric's source file, commit history, and blame data.

{{< img src="metrics/summary/metric_source_code_03262026.png" alt="The Source Code section in the metric details side panel, linking to the metric's source file." style="width:80%;">}}

##### Troubleshooting missing metrics

If a metric doesn't appear in Source Code, it may be due to how it's defined.

Datadog detects metrics best when names are written as explicit strings. Metrics built using variables, constants, or custom helpers may not be detected.

Common reasons for missing metrics:
- Metric name is generated dynamically  
- Metric is emitted through custom wrappers  
- Repository is not fully indexed  

Best practice:
- Define metric names as explicit strings when possible  

Example:

Sending metric using a variable (not recommended)

```java
public static final String METRIC_NAME = "my.metric.name";
statsEmitter.distribution(METRIC_NAME, value, tags);
```

Sending metric as explicit string (recommended):

```java
timer = meterRegistry.timer("my.metric.name");
```

To help ensure full coverage of your metric's source code, install Datadog's [GitHub][36], [GitLab][37], or [Azure DevOps][38] integration and connect all your [repositories][39].

#### Tags table

The tags table offers multiple ways to explore all of the tag keys and tag values that are actively reporting in your metric's data.

Use the tags table to:

- Sort tag keys by the {{< ui >}}Count{{< /ui >}} column (count of unique tag values).
- Search through the paginated table of tags for a particular tag key.
- Export the tags table as a downloadable CSV.
- Toggle between tags you've configured on your metric vs the metric's originally submitted tags

For any particular tag key, you can:

- Inspect all tag values of that tag key.
- Use a specific tag `key:value` to further filter the list of metrics displayed on the Metrics Catalog page.
- Open a graph of this metric filtered by your tag `key:value` pair in the Metrics Explorer.
- Copy any tag `key:value` for filtering across the application.

{{< img src="metrics/summary/updated_tags_table.mp4" alt="Tags Table" video=true style="width:75%;">}}

[Learn more about tagging][5].

#### Metrics Related Assets

{{< img src="metrics/summary/related_assets_dashboards_08_05_2025.png" alt="Related Assets for a specified metrics name" style="width:80%;">}}

To determine the value of any metric name to your organization, use Metrics Related Assets. Metrics related assets refers to any dashboard, notebook, monitor, or SLO that queries a particular metric. 

1. Scroll to the bottom of the metric's details side panel to the {{< ui >}}Related Assets{{< /ui >}} section.
2. Click the dropdown button to view the type of related asset you are interested in (dashboards, monitors, notebooks, SLOs). You can additionally use the search bar to validate specific assets.
3. The {{< ui >}}Tags{{< /ui >}} column shows exactly which tags are used in each asset.
   
## Manage custom metrics volume

Use the following tools to monitor your custom metrics usage, find the metrics that drive it, and reduce their volume.

To see only custom metrics, filter the list with the {{< ui >}}Metric Category{{< /ui >}} facet.

<div class="alert alert-info">For customers on the <a href="/account_management/billing/metric_name_pricing/">Metric Name Pricing model</a>, see the <a href="/metrics/guide/metric_name_pricing_experience/">Metrics Experience Changes for Metric Name Pricing guide</a> to optimize your metric usage.</div>

### Custom metrics usage graphs

The usage graphs at the top of the Metrics Catalog page show your account's estimated custom metrics usage in real time. The graphs display different billing dimensions depending on your pricing model:

- **Cardinality pricing**: {{< ui >}}Total Estimated Indexed Custom Metrics{{< /ui >}} (the metrics and tags that remain queryable in Datadog) and {{< ui >}}Total Estimated Ingested Custom Metrics{{< /ui >}} (the original volume of all metrics configured with Metrics without Limits™).
- **Metric Name Pricing**: Your account's estimated unique metric names, billable indexed point volume, and ingested-to-indexed points ratio. For more information, see the [Metrics Experience Changes for Metric Name Pricing][41] guide.

To explore the query behind a graph, click {{< ui >}}Open in Metrics Explorer{{< /ui >}}.

{{< img src="metrics/catalog/usage_graphs_2026-11-04.png" alt="The Total Estimated Indexed Custom Metrics and Total Estimated Ingested Custom Metrics usage graphs for cardinality pricing." style="width:100%;" >}}

### Sort metrics by volume

Sort the metrics table by a volume column. For example:
- Sort by {{< ui >}}Est. Indexed Metrics{{< /ui >}} to find your largest metric names by indexed custom metrics volume.
- Sort by {{< ui >}}Change in Volume{{< /ui >}} to find the metric names with the greatest change in volume. These metrics may have spiked unintentionally in the selected time frame. If you receive an alert on your account's estimated real-time custom metrics usage, use this view to investigate the spike.

### Compare a metric's volume over time

{{< img src="metrics/catalog/change_in_volume_popover_2026-11-03.png" alt="The Change in Volume popover, showing a graph of a metric's indexed custom metrics over time and the change in volume for the selected time frame." style="width:70%;" >}}

Use the {{< ui >}}Change in Volume{{< /ui >}} column to compare a metric name's number of indexed custom metrics (its cardinality) over time. A single metric name can emit multiple indexed custom metrics. To learn more, see [Custom Metrics Billing][42].

To compare your spiking metric's cardinality over time:
1. Select a time frame in the top-right corner of the page. Datadog recommends {{< ui >}}Past 1 Day{{< /ui >}} or {{< ui >}}Past 4 Weeks{{< /ui >}}.
2. In the row for the metric whose cardinality you want to view, click the value in the {{< ui >}}Change in Volume{{< /ui >}} column. A popover opens with a graph comparing your metric's cardinality over time and the percentage increase in its spike.
3. (Optional) Create a Change monitor for `% change` to alert on this spiking metric. For more information, see the [Change Alert Monitor][43] documentation.

### Identify unqueried metrics

To reduce custom metrics costs, start with your largest metric names that aren't actively queried. To find these metrics, select a time frame in the {{< ui >}}Query Activity{{< /ui >}} facet. The list is filtered to show only metric names that aren't queried in dashboards, notebooks, monitors, SLOs, Metrics Explorer, or the API. Sort by {{< ui >}}Est. Indexed Metrics{{< /ui >}} to see the largest of these metrics first.

To reduce the volume and cost of these metrics, configure their tags in bulk. For more information, see the [Configure multiple metrics](#configuration-of-multiple-metrics) section. For a complete cost-optimization workflow, see [Best Practices for Custom Metrics Governance][44].

### Custom Metrics Tags Cardinality Explorer 

{{< img src="metrics/tagsexplorer.png" alt="Custom Metrics Tags Cardinality Explorer for a spiking metric name" style="width:80%;">}}
To determine why a particular metric name is emitting a large number of custom metrics, or spiking, use the Custom Metrics Tags Cardinality Explorer. This helps you pinpoint the tag keys driving the spike, which you can immediately exclude using Metrics without Limits™ for cost savings.

### Configure multiple metrics {#configuration-of-multiple-metrics}

Click {{< ui >}}Actions{{< /ui >}} above the metrics table to configure more than one metric at a time:

{{< img src="metrics/catalog/actions_menu_2026-11-04.png" alt="The Actions menu, with the Manage Metric Name Filtering Rules, Manage Agent-Side Tag Aggregation Rules, Manage Percentile Aggregations, and Manage Historical Metrics options." style="width:60%;" >}}

* {{< ui >}}Manage Percentile Aggregations{{< /ui >}}: Enable or disable percentile, threshold, and standard deviation queries across multiple distribution metrics. See the [Distributions page][31] for more information.

{{< img src="metrics/summary/percentile_aggregations_toggle_2025-04-16.png" alt="Toggle to manage percentile aggregations" style="width:100%;">}}

* {{< ui >}}Manage Historical Metrics{{< /ui >}}: Enable or disable historical metrics ingestion to backfill or correct past metric data. See the [Historical Metrics Ingestion page][30] for more information.

To configure tags on multiple metrics, use [Tag Indexing Rules][45]. Rules apply to metric names, namespaces, or all custom metrics, and they automatically govern new metrics that match. For example, a rule can unindex tags that aren't queried or used in assets. Unindexed tags are no longer queryable, but Datadog still ingests them. Existing Metrics without Limits™ configurations take precedence over Tag Indexing Rules.

To create a rule, navigate to [{{< ui >}}Metrics → Settings{{< /ui >}}][46] and click {{< ui >}}+ Create Rule{{< /ui >}}. To configure tags on a single metric, see the [Metrics without Limits™](#metrics-without-limits) section.

### Metrics without Limits™
Metrics without Limits™ provides you control over the size of your custom metrics without requiring any agent or code-level changes. 

**Note**: Metrics without Limits™ is only available for custom metrics.

To configure tags on a single metric, follow these steps. To configure tags on multiple metrics, see the [Configure multiple metrics](#configuration-of-multiple-metrics) section.

{{< img src="metrics/distributions/managetags.png" alt="Configuring tags on a distribution" style="width:80%;">}}

1. Click your custom metric name in the metrics table to open the metric's details side panel.
2. Click the {{< ui >}}Manage Tags{{< /ui >}} button to open the tag configuration modal.
3. Select {{< ui >}}Include tags...{{< /ui >}} or {{< ui >}}Exclude tags...{{< /ui >}} to customize the tags you do or don't want to query for. For more information on tag configuration, see the [Metrics without Limits][10] documentation.
4. Preview the effects of your proposed tag configuration with the cardinality estimator before selecting {{< ui >}}Save{{< /ui >}}.

**Note**: The cardinality estimator requires the metric to be older than 48 hours.

#### Queryable tags 

After you configure your metric with Metrics without Limits™, you can view which tags remain queryable. These are the tags that contribute to _Indexed Custom Metrics_ volume. You can also toggle back to all originally submitted and ingested tags that contribute to your _Ingested Custom Metrics_ volume.

## Metric origin definitions

This table shows the mapping between the metric origin as seen in the facet and where it was submitted from:

| Metric Origin           | Submitted from                                                                |
| ------------------------| ----------------------------------------------------------------------------- |
| API Catalog             | Timeseries sent by the Datadog [Catalog][13] product from the APIM Endpoint.
| APM                     | Timeseries sent by the Datadog APM product for metrics generated from traces and span metrics.
| Agent                   | Timeseries sent by the Datadog Agent, collected from [Agent integrations][10], [built-in integrations][9], [DogStatsD][32], or [custom Agent checks][33].
| Cloud Security                     | Timeseries sent by the Datadog [Cloud Security][14] product.
| Cloud Integrations      | Timeseries collected from cloud providers like AWS, Azure, and Google Cloud etc. from their respective integrations. 
| DBM                     | Timeseries sent by the Datadog [Database Monitoring][15] product, including insights into MySQL, Oracle, and Postgres activities/queries/locks.
| DSM                     | Timeseries sent by the Datadog [Data Streams Monitoring][16] product, for metrics generated from the DSM spans and traces.
| Datadog Exporter        | Timeseries sent by the [OpenTelemetry Collector][17] or the [Datadog Exporter][18].
| Datadog Platform        | Timeseries sent by metrics intake that are used to [report metrics usage][11].
| Events                  | Timeseries generated from the Datadog Events platform.
| Agent Observability       | Timeseries emitted by the Agent Observability product using the `lmobs_to_metrics` service.
| Logs                    | Timeseries generated from the Datadog [Logs][28] platform.
| Metrics API             | Timeseries sent using Datadog's [OTLP Ingestion endpoint][21] and OTel receiver with a Datadog integration counterparts or points for estimated usage metrics or Datadog API Client.
| CNM                     | Timeseries sent by the Datadog [Cloud Network Monitoring][19] product.
| Observability Pipelines | Timeseries sent by the Datadog [Observability Pipielines][20] including error and performance metrics.
| Other                   | Timeseries that don't have a DD integration counterpart.
| Processes               | Timeseries generated from the Datadog [Processes][22] product.
| RUM                     | Timeseries generated from the Datadog [Real User Monitoring][23] product.
| SAAS Integrations       | Timeseries collected from popular SAAS platforms like Slack, Docker, PagerDuty etc.
| Serverless              | Timeseries sent by the Datadog [Serverless][24] platform including Function, App Services, Cloud Run, and Container App Metrics.
| Catalog         | Timeseries sent by the Datadog [Catalog][25] product including [Scorecard][29] metrics.
| Synthetic Monitoring    | Synthetic monitoring and continuous testing metrics generated from the Datadog [Synthetic Monitoring][26] product. 
| USM                     | Timeseries generated from the Datadog [Universal Service Monitoring][27] product. 

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[0]: /metrics/metrics-without-limits
[1]: https://app.datadoghq.com/metric/catalog
[2]: /metrics/explorer/
[3]: /dashboards/
[4]: /metrics/custom_metrics/
[5]: /getting_started/tagging/
[6]: /api/v1/metrics/#edit-metric-metadata
[7]: /metrics/units/
[8]: /metrics/types/
[9]: /integrations/
[10]: /integrations/agent_metrics/
[11]: /account_management/billing/usage_metrics/
[13]: /internal_developer_portal/catalog/endpoints/
[14]: /security/cloud_security_management/
[15]: /database_monitoring/
[16]: /data_streams/
[17]: /opentelemetry/setup/collector_exporter/
[18]: /opentelemetry/collector_exporter/
[19]: /network_monitoring/cloud_network_monitoring/
[20]: /observability_pipelines/
[21]: /opentelemetry/setup/otlp_ingest_in_the_agent/
[22]: /integrations/process/
[23]: /monitors/types/real_user_monitoring/
[24]: /serverless/
[25]: /internal_developer_portal/catalog/
[26]: /synthetics/
[27]: /universal_service_monitoring/
[28]: /logs/
[29]: /internal_developer_portal/scorecards/
[30]: /metrics/custom_metrics/historical_metrics/#bulk-configuration-for-multiple-metrics
[31]: /metrics/distributions/#bulk-configuration-for-multiple-metrics
[32]: /metrics/custom_metrics/dogstatsd_metrics_submission/
[33]: /metrics/custom_metrics/agent_metrics_submission/
[36]: https://app.datadoghq.com/integrations/github/configuration
[37]: https://app.datadoghq.com/integrations/gitlab-source-code
[38]: https://app.datadoghq.com/integrations/azure-devops-source-code?subPath=configuration
[39]: https://app.datadoghq.com/source-code/repositories
[41]: /metrics/guide/metric_name_pricing_experience/
[42]: /account_management/billing/custom_metrics/
[43]: /monitors/types/change-alert/
[44]: /metrics/guide/custom_metrics_governance/
[45]: /metrics/guide/tag-indexing-rules/
[46]: https://app.datadoghq.com/metric/settings
