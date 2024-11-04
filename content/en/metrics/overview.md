---
title: Metrics Overview Page
aliases:
  - /metrics/faq/metrics-without-limits/
  - /metrics/guide/metrics-without-limits-getting-started/
further_reading:
  - link: "https://www.datadoghq.com/blog/metrics-without-limits"
    tag: "Blog"
    text: "Dynamically control custom metrics volume with Metrics without Limits™"
  - link: "https://dtdg.co/fe"
    tag: "Foundation Enablement"
    text: "Join an interactive session to unlock the full potential of metrics"
---

## Overview

The Metrics Overview page provides you with a deeper understanding of your metrics landscape, and is helpful for users of all experience levels. Explore the sources of your metrics, generate additional metrics from Datadog products, and enable Metrics without Limits™ and historical data ingestion.

The sections below detail the different parts of the page and provide guidance on how you can maximize the value of your Datadog metrics.

## How your metrics flow through Datadog

{{< img src="metrics/overview/how_metrics_flow.png" alt="The how your metrics flow through Datadog section of the metrics overview page" >}}

The topmost section of the page shows all of your metric sources, along with any configurable processing and a breakdown of the metrics by type (standard or [custom][1]).

### Metric Sources

The **Metric Sources** column shows a summary of the metric sources reporting to Datadog. Click on any of the sources to open the [Summary page][27] scoped to that source. Your Datadog metrics can originate from the following sources:

{{% collapse-content title="Datadog Agent" level="h4" %}}
The [Datadog Agent][2] collects metrics from the hosts it's installed on, and forwards them to Datadog. These metrics could originate from:

   - Any of the official Datadog integrations that are bundled with the Agent. See the [integrations-core repository][4] for a full listing of the available integrations, and [Integration Management][3] for more information about managing these integrations.
   - [DogStatsD][7], a metrics aggregation service bundled with the Datadog Agent. DogStatsD implements the [StatsD][8] protocol with some Datadog-specific extensions.
   - [Custom checks][5], which are used to collect metrics from custom applications or unique systems. You define the logic for the check yourself in the Agent's configuration files. See [Writing a Custom Agent Check][6] for more information.
   - [Marketplace integrations][9] installed on the Agent. The [Datadog Marketplace][10] is a digital marketplace where Technology Partners can list their paid offerings to Datadog users.
{{% /collapse-content %}}

{{% collapse-content title="Cloud integrations" level="h4" %}}
Also known as authentication-based integrations, these integrations are set up in Datadog. You provide the credentials for obtaining metrics, and Datadog makes API calls on your behalf to collect them. Common examples are cloud provider integrations, Slack, and PagerDuty. See [API-based integrations][28] in the Developers documentation for more information.
{{% /collapse-content %}} 

{{% collapse-content title="Datadog API" level="h4" %}}
You can send metrics directly to the [Metrics API][11].
{{% /collapse-content %}} 

{{% collapse-content title="Metrics from other Datadog products" level="h4" %}}
Some Datadog products, such as Synthetic Testing, provide standard metrics by default. Other products can be configured to generate custom metrics. This section covers the available options and provides links to relevant documentation.

##### Logs

[Generate custom metrics from ingested logs][12] to summarize data from all the logs ingested by Datadog. This allows you to visualize and alert on log data that's important to your environment, even if the logs are not indexed for long-term search.

##### APM

[Generate custom metrics from your ingested spans][15] to visualize anomalies and trends across any parameters that are important to your business context.

##### Real User Monitoring (RUM)

[Generate custom metrics from RUM events][17] to summarize the data from your RUM events, so you can visualize and alert on the user behaviors that are most impactful to your organization.

##### Processes

[Generate custom process-based metrics][19] to monitor the resource consumption of your processes, as well as any other process-related behavior that might be important to your business needs.

##### Events

[Generate custom event-based metrics][20] for visibility into monitor alerts or any other event-based data ingested by Datadog.

### Configurable Processing

The **Configurable Processing** column shows an overview of the configuration options available for your metrics. Click on any of the options for more information and a link to the relevant configuration screen.

{{% collapse-content title="Optimize your custom metrics costs with Metrics without Limits™" level="h4" %}}
[Metrics without Limits™][22] helps you manage custom metric costs by indexing only the metric tags most valuable to your organization.
{{% /collapse-content %}} 

{{% collapse-content title="Enable percentiles on distribution metrics" level="h4" %}}
[Distribution metrics][23] with percentiles enabled show you percentile aggregations of metric values sent from multiple hosts, so you can measure statistical distributions across your entire infrastructure.
{{% /collapse-content %}} 

{{% collapse-content title="Ingest historical metrics" level="h4" %}}
[Historical Metrics Ingestion][24] enables you to ingest metric values with timestamps older than one hour from the time of submission.
{{% /collapse-content %}} 

### Available Metrics

The **Available Metrics** column breaks down your total metric volume by standard and custom metrics over the past month.

## Your metrics by source

This section contains a tree map with a breakdown of your metric sources and their respective volumes.

{{< img src="metrics/overview/metrics_by_source.png" alt="The your metrics by source section of the metrics overview page" >}}

## Metrics available for querying

Use the search bar in this section to view the latest data and configuration options of any of your metrics. You can search all its tags, or click to investigate the metric further in the Metrics Explorer or Summary pages.

{{< img src="metrics/overview/available_metrics.png" alt="The metrics available for querying section of the metrics overview page" >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /metrics/custom_metrics/
[2]: /agent/
[3]: /agent/guide/integration-management/
[4]: https://github.com/DataDog/integrations-core
[5]: /developers/custom_checks/
[6]: /developers/custom_checks/write_agent_check/
[7]: /developers/dogstatsd/
[8]: https://github.com/statsd/statsd
[9]: /integrations/#cat-marketplace
[10]: https://app.datadoghq.com/marketplace
[11]: /api/latest/metrics/
[12]: /logs/log_configuration/logs_to_metrics/
[13]: /tracing/metrics/metrics_namespace/
[14]: /tracing/metrics/runtime_metrics/
[15]: /tracing/trace_pipeline/generate_metrics/
[16]: /real_user_monitoring/#web-and-mobile-vitals
[17]: /real_user_monitoring/platform/generate_metrics/
[18]: /synthetics/platform/metrics/
[19]: /infrastructure/process/increase_process_retention/#generate-a-process-based-metric
[20]: /service_management/events/guides/usage/#custom-metrics
[21]: /account_management/billing/usage_metrics/
[22]: /metrics/metrics-without-limits/
[23]: /metrics/distributions/
[24]: /metrics/custom_metrics/historical_metrics/
[25]: https://app.datadoghq.com/process
[26]: https://app.datadoghq.com/event/settings/generate-metrics
[27]: /metrics/summary/
[28]: /developers/integrations/?tab=integrations#api-based-integrations
[29]: /metrics/advanced-filtering/
