---
title: Metrics Overview Page
further_reading:
  - link: "https://www.datadoghq.com/blog/metrics-without-limits"
    tag: "Blog"
    text: "Dynamically control custom metrics volume with Metrics without Limits™"
  - link: "https://dtdg.co/fe"
    tag: "Foundation Enablement"
    text: "Join an interactive session to unlock the full potential of metrics"
  - link: '/metrics/units'
    tag: 'Documentation'
    text: 'Metrics Units'
---

## Overview

The Metrics Overview page provides users of all experience levels with a deeper understanding of their metrics landscape. It provides guidance on how you can maximize the value of your Datadog metrics. 

With the Metrics Overview Page you can learn how to: 
- Explore the sources of your metrics
- Generate additional metrics from Datadog products
- Enable advanced platform capabilities such as percentiles, Metrics without Limits™, and historical metric ingestion

## How your metrics flow through Datadog

{{< img src="metrics/overview/how_metrics_flow.png" alt="The how your metrics flow through Datadog section of the metrics overview page" >}}

This section shows all of your metric sources, the additional processing and configuration that is applied to your metrics data, and a volume breakdown of standard and custom metrics.

**Note**: the Overview page is not dedicated to managing the costs of metrics. See [Best Practices for Custom Metrics Governance][25] for further details on how to optimize costs.

### Metric Sources

The **Metric Sources** column shows a summary of the metric sources reporting to Datadog. Click on any of the sources to open the [Summary page][2] scoped to that source. Your Datadog metrics can originate from the following sources:

{{% collapse-content title="Datadog Agent" level="h4" %}}
The [Datadog Agent][3] collects metrics from the hosts where it's installed and forwards them to Datadog. These metrics could originate from:

   - Any of the official Datadog integrations that are bundled with the Agent. See the [integrations-core repository][4] for a full listing of the available Agent-based integrations.
   - [DogStatsD][6], a metrics aggregation service bundled with the Datadog Agent. DogStatsD implements the [StatsD][7] protocol with some Datadog-specific extensions.
   - [Custom checks][8], which are used to collect metrics from custom applications or unique systems. You define the logic for the check yourself in the Agent's configuration files. See [Writing a Custom Agent Check][9] for more information.
   - [Marketplace integrations][10] installed on the Agent. The [Datadog Marketplace][11] is a digital marketplace where Technology Partners can list their paid offerings to Datadog users.

{{% /collapse-content %}}

{{% collapse-content title="Cloud integrations" level="h4" %}}
Also known as authentication-based integrations, these integrations are set up in Datadog. You provide the credentials for obtaining metrics, and Datadog makes API calls on your behalf to collect them. Common examples are cloud provider integrations, Slack, and PagerDuty. See [API-based integrations][12] in the Developers documentation for more information.
{{% /collapse-content %}} 

{{% collapse-content title="Datadog API" level="h4" %}}
You can send metrics directly to the [Metrics API][13].
{{% /collapse-content %}} 

In total, Datadog has more than {{< translate key="integration_count" >}} integrations. See [Integration Management][5] for more information about managing your integrations.

### Configurable Processing

The **Configurable Processing** column lists the various advanced configuration options that you can use to increase the value of your metrics. Click on any of the options for more information and a link to the relevant configuration screen.

{{% collapse-content title="Optimize your custom metrics costs with Metrics without Limits™" level="h4" %}}
[Metrics without Limits™][19] helps you manage custom metric costs by indexing only the metric tags most valuable to your organization. Your use of Metrics without Limits™ is reflected in the top section of the Overview page as **Selected Metrics**. For more information about managing your custom metrics costs, see [Best Practices for Custom Metrics Governance][22].
{{% /collapse-content %}} 

{{% collapse-content title="Enable percentiles on distribution metrics" level="h4" %}}
[Distribution metrics][20] with percentiles enabled provide you with globally accurate percentiles calculated server-side from all hosts, so you can measure statistical distributions across your entire distributed infrastructure.
{{% /collapse-content %}} 

{{% collapse-content title="Generate metrics from other Datadog products" level="h4" %}}
Some products incorporate standard metrics to surface insights out of the box (for example, APM). 

##### Logs

[Generate custom metrics from ingested logs][14] to summarize data from all the logs ingested by Datadog. This allows you to visualize and alert on log data that's important to your environment, even if the logs are not indexed for long-term search.

##### APM

[Generate custom metrics from your ingested spans][15] to visualize anomalies and trends across any parameters that are important to your business context.

##### Real User Monitoring (RUM)

[Generate custom metrics from RUM events][16] to summarize the data from your RUM events, so you can visualize and alert on the user behaviors that are most impactful to your organization.

##### Processes

[Generate custom process-based metrics][17] to monitor the resource consumption of your processes, as well as any other process-related behavior that might be important to your business needs.

##### Events

[Generate custom event-based metrics][18] for visibility into monitor alerts or any other event-based data ingested by Datadog.
{{% /collapse-content %}} 

{{% collapse-content title="Ingest historical metrics" level="h4" %}}
[Historical Metrics Ingestion][21] enables you to ingest metric values with timestamps older than one hour from the time of submission.
{{% /collapse-content %}} 

### Available Metrics

The **Available Metrics** column breaks down your total metric volume by standard and custom metrics over the past month. If you're interested in managing your custom metrics volume, see the [Best Practices for Custom Metrics Governance page][25] and the [Metrics Volume Management page][26] for more detailed insights.

## Your metrics by source

This section contains a tree map that outlines your metric sources and their respective volumes.

{{< img src="metrics/overview/metrics_by_source.png" alt="The your metrics by source section of the metrics overview page" >}}

## Generate metrics from any source

Clicking on any of the options below brings you to the corresponding product's Generate Metrics page, where you can create custom metrics from that product:
   - [Ingested logs][14]
   - [Ingested spans][15]
   - [RUM events][16]
   - [Processes][17]
   - [Events][18]

## Metrics available for querying

Use the search bar in this section to view the latest data and configuration options of any of your metrics. You can search all its tags, or click to investigate the metric further in the [Metrics Explorer][23] or [Summary][24] pages.

{{< img src="metrics/overview/available_metrics.png" alt="The metrics available for querying section of the metrics overview page" >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /metrics/custom_metrics/
[2]: /metrics/summary/
[3]: /agent/
[4]: https://github.com/DataDog/integrations-core
[5]: /agent/guide/integration-management/
[6]: /developers/dogstatsd/
[7]: https://github.com/statsd/statsd
[8]: /developers/custom_checks/
[9]: /developers/custom_checks/write_agent_check/
[10]: /integrations/#cat-marketplace
[11]: https://app.datadoghq.com/marketplace
[12]: /developers/integrations/?tab=integrations#api-based-integrations
[13]: /api/latest/metrics/#submit-metrics
[14]: /logs/log_configuration/logs_to_metrics/
[15]: /tracing/trace_pipeline/generate_metrics/
[16]: /real_user_monitoring/platform/generate_metrics/
[17]: /infrastructure/process/increase_process_retention/#generate-a-process-based-metric
[18]: /service_management/events/guides/usage/#custom-metrics
[19]: /metrics/metrics-without-limits/
[20]: /metrics/distributions/
[21]: /metrics/custom_metrics/historical_metrics/
[22]: /metrics/guide/custom_metrics_governance
[23]: https://app.datadoghq.com/metric/explorer
[24]: https://app.datadoghq.com/metric/summary
[25]: /metrics/guide/custom_metrics_governance/
[26]: /metrics/volume/
