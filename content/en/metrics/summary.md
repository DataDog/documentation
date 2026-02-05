---
title: Metrics Summary
description: "Consult the full list of metrics reporting to Datadog."
aliases:
  - /graphing/faq/how-can-i-set-up-custom-units-for-custom-metrics
  - /graphing/metrics/summary/
further_reading:
  - link: "/metrics/explorer/"
    tag: "Documentation"
    text: "Metrics Explorer"
  - link: "/metrics/distributions/"
    tag: "Documentation"
    text: "Metrics Distributions"
---

## Overview

The [Metrics Summary page][1] displays a list of your metrics reported to Datadog under a specified time frame: the past hour, day, or week. 

Search your metrics by metric name or tag using the **Metric** or **Tag** search fields:

{{< img src="metrics/summary/tag_advanced_filtering.png" alt="The metrics summary page with NOT team:* entered in the Tag search bar" style="width:75%;">}}

You can also discover relevant metrics using enhanced fuzzy matching support in the Metrics search field:

{{< img src="metrics/summary/metric_advanced_filtering_fuzzy.png" alt="The metrics summary page with fuzzy search searching shopist checkout" style="width:75%;">}}

Tag filtering supports Boolean and wildcard syntax so that you can identify: 
* Metrics that are tagged with a particular tag key, for example, `team`: `team:*`
* Metrics that are missing a particular tag key, for example, `team`: `NOT team:*`

## Facet panel

The search bars provide the most comprehensive set of actions to filter the list of metrics. But facets can also filter your metrics by:

- **Configuration**: Metrics with tag configurations
- **Percentiles**: Distribution metrics enabled by percentiles/advanced query capabilities
- **Historical Metrics**: Metrics that have historical metrics ingestion enabled 
- **Query Activity**: Metrics not queried in Datadog or by the API in the past 30, 60, or 90 days
- **Related Assets**: Metrics that are being used on dashboards, notebooks, monitors, and SLOs
- **Metric Type**: Differentiate between distribution and non-distribution metrics (counts, gauges, rates)
- **Metric Origin**: The product from which the metric originated (for example, metrics generated from Logs or APM Spans). To learn more about the different metric origin types, see [Metric origin definitions][12]

### Definitions

A metric is **unqueried** if it has not been accessed in monitors, SLOs, executed notebooks, opened dashboards, used in Metrics Explorer queries, or accessed through API calls within the past 30, 60, or 90 days.

A metric is considered **used** as long as it exists on an asset, regardless if it has been actively queried.

{{< img src="metrics/summary/facet_panel_2025-02-26.png" alt="Metrics Facet Panel" style="width:75%;">}}

## Configuration of multiple metrics 

Clicking **Configure Metrics** gives you multiple options to configure more than one metric at a time: 

{{< img src="metrics/summary/configurationbuttons10-11-2024.png" alt="Bulk configuration buttons" style="width:100%;">}}

* **Manage tags**: Configure tags on multiple custom metrics matching a namespace using Metrics without Limits™.

{{< img src="metrics/summary/tags-bulk-config.mp4" alt="Bulk Metric Tag Configuration" video="true" style="width:100%;" >}}

* **Enable or disable percentiles**: Manage percentile aggregations across multiple distribution metrics. See the [Distributions page][31] for more information.

{{< img src="metrics/summary/percentile_aggregations_toggle_2025-04-16.png" alt="Toggle to manage percentile aggregations" style="width:100%;">}}

* **Enable or disable historical metrics ingestion**: Manage the ingestion of historical metric data. See the [Historical Metrics Ingestion page][30] for more information.

## Metric details sidepanel

Click on any metric name to display its details sidepanel for more information regarding the metric's metadata and tags: 

{{< img src="metrics/summary/mwl_sidepanel.jpg" alt="Metric panel" style="width:75%;">}}

### Metric name

The name of your metric in the [Metrics Explorer][2], [dashboards][3], etc.

### Ingested custom metrics

A metric name may emit multiple ingested custom metrics depending on its associated tag value combinations. Ingested custom metrics represent all of the data originally submitted with code.

Learn more in the [custom metrics][4] documentation.

### Indexed custom metrics

Unlike ingested custom metrics, indexed custom metrics represent those that remain queryable across the Datadog platform. This number may be impacted by adding or removing percentile aggregations or by use of Metrics without Limits™. Learn more in the [Metrics without Limits™][0] documentation.

### Hosts

The total number of hosts reporting a metric.

### Tag values

The total number of unique tag values attached to a metric.

[Learn more about tagging][5].

### Metrics metadata

The metadata attached to your metric. Most of the metadata can be edited on the metric summary page or with the [Datadog API][6].

#### Metric unit

The unit for your metric (byte, second, request, query, etc.). See the [metric unit][7] page for more details.

When submitting custom metrics to Datadog, it is possible to change the [unit of measurement][1] that displays when hovering over the metric in your graph.

**Note**: This does not change how a metric graph is displayed. It only changes the units of measurement that raw values are considered as when you hover over a metric. Formatting is automatically applied for readability. For example, bytes (`B`) may be displayed as kilobytes (`KiB`).

#### Metric type

The type for your metric (gauge, rate, count, distribution). See the [metric type][8] page for more details.

**Warning**: Editing the metric type changes that metric's behavior for **ALL** your dashboards and monitors.

#### Integration name

If the metric is coming from a supported [integration][9], the metadata lists the integration name. This information cannot be edited.

#### Interval

The collection interval for the metric in seconds.

#### Metric description

The metric description helps you understand what a metric represents, why it exists, and how it is typically used. Descriptions are pre-populated for metrics coming from supported [integrations][9].

For custom metrics with connected source code, Datadog can automatically generate descriptions to provide additional context. These descriptions are fully editable, and any human edits always persist over generated descriptions.

Use this field to update the descriptions for your [custom metrics][4].

## Metric Context Explorer

The Metric Context Explorer provides a centralized view of every Custom Metric and its underlying context. 

{{< callout url="https://www.datadoghq.com/product-preview/metrics-source-code-attribution/" >}} Metric Context Explorer is in Preview. If you're interested in this feature, complete this form. {{< /callout >}}

Use the Metric Context Explorer to identify a metric's source code, understand how it is generated, and determine ownership. It provides visibility into context and ownership, helping you troubleshoot and optimize faster by linking directly to the metric's source file, commit history, and blame data.

{{< img src="metrics/summary/metric_context_explorer_12112025.png" alt="Source Code Example in Metrics sidepanel" style="width:80%;">}}

To ensure full coverage of your metric's source code, ensure that you've installed Datadog's [GitHub][36], [Gitlab][37], or [Azure DevOps][38] integration and that all your [repositories][39] are connected.

### Tags table

The tags table offers multiple ways to explore all of the tag keys and tag values that are actively reporting in your metric's data.

Use the tags table to:

- Sort tag keys by the **Count column** (count of unique tag values).
- Search through the paginated table of tags for a particular tag key.
- Export the tags table as a downloadable CSV.
- Toggle between tags you've configured on your metric vs the metric's originally submitted tags

For any particular tag key, you can:

- Inspect all tag values of that tag key.
- Use a specific tag `key:value` to further filter the list of metrics displayed on the Metrics Summary page.
- Open a graph of this metric filtered by your tag `key:value` pair in the Metrics Explorer.
- Copy any tag `key:value` for filtering across the application.

{{< img src="metrics/summary/updated_tags_table.mp4" alt="Tags Table" video=true style="width:75%;">}}

[Learn more about tagging][5].

### Metrics Related Assets

{{< img src="metrics/summary/related_assets_dashboards_08_05_2025.png" alt="Related Assets for a specified metrics name" style="width:80%;">}}

To determine the value of any metric name to your organization, use Metrics Related Assets. Metrics related assets refers to any dashboard, notebook, monitor, or SLO that queries a particular metric. 

1. Scroll to the bottom of the metric's details side panel to the **Related Assets** section.
2. Click the dropdown button to view the type of related asset you are interested in (dashboards, monitors, notebooks, SLOs). You can additionally use the search bar to validate specific assets.
3. The **Tags** column shows exactly which tags are used in each asset.
   
## Custom Metrics Tags Cardinality Explorer 

{{< img src="metrics/tagsexplorer.png" alt="Custom Metrics Tags Cardinality Explorer for a spiking metric name" style="width:80%;">}}
To determine why a particular metric name is emitting a large number of custom metrics, or spiking, use the Custom Metrics Tags Cardinality Explorer. This helps you pinpoint the tag keys driving the spike, which you can immediately exclude using Metrics without Limits™ for cost savings.

## Metrics without Limits™
Metrics without Limits™ provides you control over the size of your custom metrics without requiring any agent or code-level changes. 

**Note:** Metrics without Limits™ is only available for custom metrics.

You can [configure tags in bulk](#configuration-of-multiple-metrics) by going to **Configure Metrics -> Manage tags** in the [Metrics page][34], or by clicking the **Manage Tags** button in a metric's details side panel. 

{{< img src="metrics/distributions/managetags.png" alt="Configuring tags on a distribution" style="width:80%;">}}

1. Click on your custom distribution metric name in the **Metrics Summary** table to open the metrics details side panel.
2. Click the **Manage Tags** button to open the tag configuration modal.
3. Select **Include tags...** or **Exclude tags...** to customize the tags you do or don't want to query for. For more information on tag configuration, see the [Metrics without Limits][10] documentation.
4. Preview the effects of your proposed tag configuration with the cardinality estimator before selecting **Save**.

**Note**: The cardinality estimator requires the metric to be older than 48 hours.

### Queryable tags 

Once your metric has been configured with Metrics without Limits™, you can view which tags remain Queryable -- ultimately those that contribute to _Indexed Custom Metrics_ volume. And you can toggle back to all originally submitted and ingested tags that contribute to your _Ingested Custom Metrics_ volume. 

### Metric origin definitions

This table shows the mapping between the metric origin as seen in the facet and where it was submitted from:

| Metric Origin           | Submitted from                                                                |
| ------------------------| ----------------------------------------------------------------------------- |
| API Catalog             | Timeseries sent by the Datadog [Software Catalog][13] product from the APIM Endpoint.
| APM                     | Timeseries sent by the Datadog APM product for metrics generated from traces and span metrics.
| Agent                   | Timeseries sent by the Datadog Agent, collected from [Agent integrations][10], [built-in integrations][9], [DogStatsD][32], or [custom Agent checks][33].
| Cloud Security                     | Timeseries sent by the Datadog [Cloud Security][14] product.
| Cloud Integrations      | Timeseries collected from cloud providers like AWS, Azure, and Google Cloud etc. from their respective integrations. 
| DBM                     | Timeseries sent by the Datadog [Database Monitoring][15] product, including insights into MySQL, Oracle, and Postgres activities/queries/locks.
| DSM                     | Timeseries sent by the Datadog [Data Streams Monitoring][16] product, for metrics generated from the DSM spans and traces.
| Datadog Exporter        | Timeseries sent by the [OpenTelemetry Collector][17] or the [Datadog Exporter][18].
| Datadog Platform        | Timeseries sent by metrics intake that are used to [report metrics usage][11].
| Events                  | Timeseries generated from the Datadog Events platform.
| LLM Observability       | Timeseries emitted by the LLM Observability product using the `lmobs_to_metrics` service.
| Logs                    | Timeseries generated from the Datadog [Logs][28] platform.
| Metrics API             | Timeseries sent using Datadog's [OTLP Ingestion endpoint][21] and OTel receiver with a Datadog integration counterparts or points for estimated usage metrics or Datadog API Client.
| CNM                     | Timeseries sent by the Datadog [Cloud Network Monitoring][19] product.
| Observability Pipelines | Timeseries sent by the Datadog [Observability Pipielines][20] including error and performance metrics.
| Other                   | Timeseries that don't have a DD integration counterpart.
| Processes               | Timeseries generated from the Datadog [Processes][22] product.
| RUM                     | Timeseries generated from the Datadog [Real User Monitoring][23] product.
| SAAS Integrations       | Timeseries collected from popular SAAS platforms like Slack, Docker, PagerDuty etc.
| Serverless              | Timeseries sent by the Datadog [Serverless][24] platform including Function, App Services, Cloud Run, and Container App Metrics.
| Software Catalog         | Timeseries sent by the Datadog [Software Catalog][25] product including [Scorecard][29] metrics.
| Synthetic Monitoring    | Synthetic monitoring and continuous testing metrics generated from the Datadog [Synthetic Monitoring][26] product. 
| USM                     | Timeseries generated from the Datadog [Universal Service Monitoring][27] product. 

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[0]: /metrics/metrics-without-limits
[1]: https://app.datadoghq.com/metric/summary
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
[12]: /metrics/summary/#metric-origin-definitions
[13]: /software_catalog/endpoints/
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
[25]: /software_catalog/
[26]: /synthetics/
[27]: /universal_service_monitoring/
[28]: /logs/
[29]: /software_catalog/scorecards/
[30]: /metrics/custom_metrics/historical_metrics/#bulk-configuration-for-multiple-metrics
[31]: /metrics/distributions/#bulk-configuration-for-multiple-metrics
[32]: /metrics/custom_metrics/dogstatsd_metrics_submission/
[33]: /metrics/custom_metrics/agent_metrics_submission/
[34]: https://app.datadoghq.com/metric/overview
[35]: https://app.datadoghq.com/integrations?category=Source%20Control
[36]: https://app.datadoghq.com/integrations/github/configuration
[37]: https://app.datadoghq.com/integrations/gitlab-source-code
[38]: https://app.datadoghq.com/integrations/azure-devops-source-code?subPath=configuration
[39]: https://app.datadoghq.com/source-code/repositories
