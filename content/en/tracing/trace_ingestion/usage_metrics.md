---
title: Usage Metrics
kind: documentation
aliases:
    - /tracing/trace_retention_and_ingestion/usage_metrics/
    - /tracing/trace_retention/usage_metrics/
description: "Learn how to monitor your APM usage."
further_reading:
- link: "/tracing/trace_ingestion/"
  tag: "Documentation"
  text: "Trace Ingestion"
- link: "/tracing/trace_retention/"
  tag: "Documentation"
  text: "Trace Retention"
---

## Overview

To control APM Ingested and indexed volumes, use the two dedicated in-app configuration pages:
- The **[Ingestion Control Page][1]** to control the ingested span volume.
- The **[Retention Filters page][2]** to control the number of indexed spans.

Both pages are powered by **usage metrics**. These metrics are available in your account:
 - `datadog.estimated_usage.apm.ingested_bytes` (billed dimension)
 - `datadog.estimated_usage.apm.ingested_spans`
 - `datadog.estimated_usage.apm.ingested_traces`
 - `datadog.estimated_usage.apm.indexed_spans` (billed dimension)


Leverage these metrics in **dashboards** and **monitors** to visualise and control your usage or alert when it goes over a certain limit. Two out-of-the box dashboards are built based on these metrics. These dashboards help you to monitor your APM usage as well as your ingested and indexed span volumes.

Datadog APM plans come with included indexed and ingested spans. For more information, read the [pricing documentation][3], or view some [example pricing scenarios][4].

## Usage Metrics

### Ingested spans volume

3 usage metrics are tied to the ingested spans usage:
 - `datadog.estimated_usage.apm.ingested_bytes`
 - `datadog.estimated_usage.apm.ingested_spans`
 - `datadog.estimated_usage.apm.ingested_traces`

Use `datadog.estimated_usage.apm.ingested_bytes` to control your usage as ingestion is metered as a **volume** and not as a number of spans or traces. This metric is tagged by `env` and `service` to allow you to spot which environments and services are contributing to the ingestion volume.

This metric is also tagged by `ingestion_reason`: this dimension reflects which [ingestion mechanisms][5] are responsible for sending the spans to Datadog. These mechanisms are nested in the tracing libraries of in the Datadog Agent. This dimension is introduced in details in the [Ingestion Reason][6] dashboard.

The `datadog.estimated_usage.apm.ingested_traces` metric measures the number of requests sampled per second. This only counts traces sampled by the [head-based sampling][7]. This metric is also tagged by `env` and `service`. Use this metric to spot which services are starting the most traces.

### Indexed spans

Use the `datadog.estimated_usage.apm.indexed_spans` metric to control the number of spans indexed by [tag-based retention filters][2].

This metric is tagged by `env` and `service` to allow you to spot which environments and services are contributing to the indexing usage.

## APM Traces Estimated Usage dashboard

The [APM Traces Usage dashboard][8] has several groups of widgets to see at a glance high level KPIs, and more detailed information about the usage.

{{< img src="tracing/trace_indexing_and_ingestion/usage_metrics/dashboard_apm_usage.png" style="width:100%;" alt="APM Estimated Usage Dashboard" >}}

Thanks to the dashboard, get visibility over :
- Your **global usage**
- Your **infrastructure** with APM enabled (hosts, Fargate, AWS Lambda)
- Your **ingestion** volumes, with breakdowns by `service`, `env`, and `ingestion_reason`
- Your **indexing** volumes, with breakdowns by `service`, `env`

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/trace_ingestion/ingestion_controls
[2]: /tracing/trace_retention/#retention-filters
[3]: https://www.datadoghq.com/pricing/?product=apm#apm
[4]: /account_management/billing/apm_tracing_profiler/
[5]: /tracing/trace_ingestion/mechanisms
[6]: https://app.datadoghq.com/dash/integration/apm-ingestion-reason-overview
[7]: /tracing/trace_ingestion/mechanisms/#head-based-sampling
[8]: https://app.datadoghq.com/dash/integration/apm-estimated-usage
