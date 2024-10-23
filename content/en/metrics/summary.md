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

{{< img src="metrics/summary/tag_advancedfiltering3.mp4" alt="The metrics summary page with NOT team:* entered in the Tag search bar" video=true style="width:75%;">}}

Tag filtering supports boolean and wildcard syntax so that you can quickly identify: 
* Metrics that are tagged with a particular tag key, for example, `team`: `team:*`
* Metrics that are missing a particular tag key, for example, `team`: `NOT team:*`


## Facet panel

The search bars provide the most comprehensive set of actions to filter the list of metrics. But facets can also filter your metrics by:

- **Configuration**: Metrics with tag configurations
- **Percentiles**: Distribution metrics enabled by percentiles/advanced query capabilities
- **Historical Metrics**: Metrics that have historical metrics ingestion enabled 
- **Query Activity** (Beta): Metrics not queried in the app or by the API in the past 30 days
- **Metric Type**: Differentiate between distribution and non-distribution metrics (counts, gauges, rates)
- **Metric Origin**: The product from which the metric originated (for example, metrics generated from Logs or APM Spans). To learn more about the different metric origin types, see [Metric origin definitions][12].

**Note**: A metric included on a Dashboard that has not been loaded by a user in the last 30 days would not be considered actively queried.

{{< img src="metrics/summary/facets4.png" alt="Metrics Facet Panel" style="width:75%;">}}

## Configuration of multiple metrics 

Clicking on **Configure Metrics** gives you multiple options that you can use to configure more than one metric at a time: 

{{< img src="metrics/summary/configurationbuttons10-11-2024.png" alt="Bulk configuration buttons" style="width:100%;">}}

* **Manage tags**: Configure tags on multiple custom metrics matching a namespace using Metrics without Limits™.

{{< img src="metrics/summary/bulkconfig_new-compressed.mp4" alt="Bulk Metric Tag Configuration" video="true" style="width:100%;" >}}

* **Enable or disable percentiles**: Manage percentile aggregations across multiple distribution metrics. See the [Distributions page][31] for more information.

{{< img src="metrics/summary/percentile_aggregations_toggle.png" alt="Toggle to manage percentile aggregations" style="width:100%;">}}

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

The metric description helps you understand what a metric does. Descriptions are pre-populated for metrics coming from supported [integrations][9]. Use this field to update the descriptions for your [custom metrics][4].

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

## Metrics Related Assets

{{< img src="metrics/summary/related_assets_dashboards.png" alt="Related Assets for a specified metrics name" style="width:80%;">}}

To determine the value of any metric name to your organization, use Metrics Related Assets. Metrics related assets refers to any dashboard, notebook, monitor, or SLO that queries a particular metric. 

1. Scroll to the bottom of the metric's details side panel to the "Related Assets" section.
2. Click the dropdown button to view the type of related asset you are interested in (dashboards, monitors, notebooks, SLOs). You can additionally leverage the search bar to validate specific assets.
   

## Metrics without Limits™
Metrics without Limits™ provides you control over the size of your custom metrics without requiring any agent or code-level changes. 

**Note:** Metrics without Limits™ is only available for custom metrics.

You can configure tags using the bulk metric tag configuration button or the **Manage Tags** button in a metric's details side panel. 

{{< img src="metrics/distributions/managetags.png" alt="Configuring tags on a distribution" style="width:80%;">}}

1. Click on your custom distribution metric name in the **Metrics Summary** table to open the metrics details side panel.
2. Click the **Manage Tags** button to open the tag configuration modal.

3. Select **Include tags...** or **Exclude tags...** to customize the tags you do or don't want to query for. For more information on tag configuration, see the [Metrics without Limits][10] documentation.
4. Preview the effects of your proposed tag configuration with the cardinality estimator before selecting **Save**.

**Note**: The cardinality estimator requires the metric to be older than 48 hours.

### Queryable tags 

Once your metric has been configured with Metrics without Limits™, you can view which tags remain Queryable -- ultimately those that contribute to _Indexed Custom Metrics_ volume. And you can toggle back to all originally submitted and ingested tags that contribute to your _Ingested Custom Metrics_ volume. 

### Optimize your metric with aggregations in Advanced Mode

For custom metrics of the count, gauge, or rate metric type, you can further refine your metric's configurations by optionally including additional aggregations with the advanced mode of Metrics without Limits™. By default, Datadog stores the most frequently queried aggregation combination depending on the metric's type to preserve the mathematical accuracy of your configured metric's query as listed below: 

- Configured counts/rates are queryable with time/space aggregations of `SUM`
- Configured gauges are queryable in time/space aggregations of `AVG`

{{< img src="metrics/summary/customize_aggr_docs.jpg" alt="Refine aggregations on counts, rates, and gauges" style="width:80%;">}}

More aggregations are available should they be valuable to you. You can add or remove aggregations at any time with no required Agent or code-level changes.

**Note**: Configuring your count, rate, or gauge metric and removing an aggregation may impact existing dashboards and monitors.

### Metric origin definitions

This table shows the mapping between the metric origin as seen in the facet and where it was submitted from:

| Metric Origin           | Submitted from                                                                |
| ------------------------| ----------------------------------------------------------------------------- |
| API Catalog             | Standard Metrics sent by the Datadog [API Catalog][13] product from the APIM Endpoint.
| APM                     | Custom Metrics sent by the Datadog APM product for metrics generated from traces and span metrics.
| Agent                   | Standard Metrics sent by the Datadog agent, collected from [Agent integrations][10], or [built-in integrations][9].
| CSM                     | Standard Metrics sent by the Datadog [Cloud Security Monitoring][14] product.
| Cloud Integrations      | Standard Metrics collected from cloud providers like AWS, Azure, and Google Cloud etc. from their respective integrations. 
| DBM                     | Standard Metrics sent by the Datadog [Database Monitoring][15] product, including insights into MySQL, Oracle, and Postgres activities/queries/locks.
| DSM                     | Standard Metrics sent by the Datadog [Data Streams Monitoring][16] product, for metrics generated from the DSM spans and traces.
| Datadog Exporter        | Standard Metrics sent by the [OpenTelemetry Collector][17] or the [Datadog Exporter][18].
| Datadog Platform        | Standard Metrics sent by metrics intake that are used to [report metrics usage][11].
| Events                  | Custom Metrics generated from the Datadog Events platform.
| LLM Observability       | Custom Metrics emitted by the LLM Observability product using the `lmobs_to_metrics` service.
| Logs                    | Custom Metrics generated from the Datadog [Logs][28] platform.
| Metrics API             | Custom Metrics sent using Datadog's [OTLP Ingestion endpoint][21] and OTel receiver with a Datadog integration counterparts or points for estimated usage metrics or Datadog API Client.
| NPM                     | Standard Metrics sent by the Datadog [Network Performance Monitoring][19] product.
| Observability Pipelines | Standard Metrics sent by the Datadog [Observability Pipielines][20] including error and performance metrics.
| Other                   | Custom Metrics that don't have a DD integration counterpart.
| Processes               | Custom Metrics generated from the Datadog [Processes][22] product.
| RUM                     | Standard Metrics generated from the Datadog [Real User Monitoring][23] product.
| SAAS Integrations       | Standard Metrics collected from popular SAAS platforms like Slack, Docker, PagerDuty etc.
| Serverless               | Custom Metrics sent by the Datadog [Serverless][24] platform including Function, App Services, Cloud Run, and Container App Metrics.
| Service Catalog         | Standard Metrics sent by the Datadog [Service Catalog][25] product including [Scorecard][29] metrics.
| Synthetic Monitoring    | Synthetic monitoring and continuous testing metrics generated from the Datadog [Synthetic Monitoring][26] product. 
| USM                     | Custom Metrics generated from the Datadog [Universal Service Monitoring][27] product. 

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
[13]: /api_catalog/
[14]: /security/cloud_security_management/
[15]: /database_monitoring/
[16]: /data_streams/
[17]: /opentelemetry/collector_exporter/otel_collector_datadog_exporter/?tab=onahost
[18]: /opentelemetry/collector_exporter/
[19]: /network_monitoring/performance/
[20]: /observability_pipelines/
[21]: /opentelemetry/interoperability/otlp_ingest_in_the_agent/?tab=host
[22]: /integrations/process/
[23]: /monitors/types/real_user_monitoring/
[24]: /serverless/
[25]: /service_catalog/
[26]: /synthetics/
[27]: /universal_service_monitoring/
[28]: /logs/
[29]: /service_catalog/scorecards/
[30]: /metrics/custom_metrics/historical_metrics/#bulk-configuration-for-multiple-metrics
[31]: /metrics/distributions/#bulk-configuration-for-multiple-metrics
