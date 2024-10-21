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

The Metrics Overview page provides you with a deeper understanding of your metrics landscape, and is helpful for users of all experience levels. 
   - New users can use its comprehensive overview of Datadog metric offerings to help increase the value of their metrics.
   - Existing users gain a detailed overview into their current metrics' volumes and origins.

The sections below detail the different parts of the page and provide guidance on how you can maximize the value of your Datadog metrics.

## How your metrics flow through Datadog

The topmost section of the page shows all of your metric sources, along with any configurable processing and a breakdown of the metrics by type (standard or [custom][1]).

### Metric Sources

Your Datadog metrics can originate from the following sources:

#### Datadog Agents

The [Datadog Agent][2] collects metrics from the hosts it's installed on, and forwards them to Datadog. These metrics could originate from:

   - Any of the official Datadog integrations that are bundled with the Agent. See [Integration Management][3] for more information about managing these integrations, or the [integrations-core repository][4] for a full listing of the available integrations.
   - [Custom checks][5], which are used to collect metrics from custom applications or unique systems. You define the logic for the check yourself in the Agent's configuration files. See [Writing a Custom Agent Check][6] for more information.
   - [DogStatsD][7], a metrics aggregation service bundled with the Datadog Agent. DogStatsD implements the [StatsD][8] protocol with some Datadog-specific extensions.
   - [Marketplace integrations][9] installed on the Agent. The [Datadog Marketplace][10] is a digital marketplace where Technology Partners can list their paid offerings to Datadog users.

#### Cloud integrations

Also known as authentication-based integrations, these integrations are set up in Datadog. You provide the credentials for obtaining metrics, and Datadog makes API calls on your behalf to collect them. Common examples are cloud provider integrations, Slack, and PagerDuty.

#### Datadog API

You can send metrics directly to the [Metrics API][11].

#### Metrics from other Datadog Services

Some Datadog services, such as Synthetic Testing, provide standard metrics by default. Other services can be configured to generate custom metrics. This section covers the available options and provides links to relevant documentation.

##### Logs

Log-based metrics allow you to generate custom metrics from any logs ingested into Datadog. See [Generate Metrics from Ingested Logs][12] for more information.

##### APM

- [Trace metrics][13] are standard metrics that capture request counts, error counts, and latency measures on your applications instrumented with Datadog APM. You can also [generate custom metrics from your ingested spans][15].
- [Runtime metrics][14] are standard metrics that provide additional insights into an application’s performance.

##### Real User Monitoring (RUM)

- [Web and mobile vitals][16] are standard metrics that provide performance scores for browser and mobile applications, respectively.
- [Custom metrics from RUM events][17] enable you to summarize the data from your RUM events. 

##### Synthetic Monitoring & Continuous Testing Metrics

[Synthetic Monitoring & Continuous Testing Metrics][18]

##### Processes

[Process-based metrics][19] are custom metrics you can generate in the Processes page.

##### Events

[Custom metrics from events][20]
> Generate metrics with 15-month retention from any event search query to create and monitor historical events and alerts. For more information, see Event Analytics.

##### Account Management

[Estimated Usage Metrics][21]
<!-- Datadog calculates your current estimated usage in near real-time. Estimated usage metrics enable you to:

Graph your estimated usage
Create monitors around your estimated usage based on thresholds of your choosing
Get monitor alerts of spikes or drops in your usage
Assess the potential impact of code changes on your usage in near real-time -->

### Configurable Processing

#### Manage tagging

[Configuration of tags][22]
> Metrics without Limits™ provides you with the ability to configure tags on all metric types in-app.

#### Enable percentiles

[Distributions][23]
> Distributions are a metric type that aggregate values sent from multiple hosts during a flush interval to measure statistical distributions across your entire infrastructure.

#### Ingest historical metrics

[Historical Metrics Ingestion][24]
> Enabling Historical Metrics Ingestion allows you to collect metric values with timestamps older than one hour from the time of submission, but no older than your total metric retention period (default of 15 months).

### Available Metrics


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
[22]: /metrics/metrics-without-limits/#configuration-of-tags
[23]: /metrics/distributions/
[24]: /metrics/custom_metrics/historical_metrics/
