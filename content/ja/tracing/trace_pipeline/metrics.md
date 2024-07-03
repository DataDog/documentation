---
aliases:
- /ja/tracing/trace_retention_and_ingestion/usage_metrics/
- /ja/tracing/trace_retention/usage_metrics/
- /ja/tracing/trace_ingestion/usage_metrics/
description: Learn how to monitor your APM usage.
further_reading:
- link: /tracing/trace_pipeline/ingestion_controls/
  tag: Documentation
  text: Trace Ingestion
- link: /tracing/trace_pipeline/trace_retention/
  tag: Documentation
  text: Trace Retention
kind: documentation
title: Usage Metrics
---

## Overview

The following in-app configuration pages allow you to set ingested and indexed volumes for APM:
- Use the **[Ingestion Control Page][1]** to control ingested span volume.
- Use the **[Retention Filters page][2]** to control the number of indexed spans.

Both pages are powered by **usage metrics**.

The following metrics are available in your account:

 - `datadog.estimated_usage.apm.ingested_bytes` (billed dimension)
 - `datadog.estimated_usage.apm.ingested_spans`
 - `datadog.estimated_usage.apm.ingested_traces`
 - `datadog.estimated_usage.apm.indexed_spans` (billed dimension)


Leverage these metrics in dashboards and monitors to visualize and control your usage. Two out-of-the box dashboards are built with these metrics. These dashboards help
 monitor your APM usage as well as your ingested and indexed span volumes.

Datadog APM plans come with indexed and ingested spans included. For more information, see the [Pricing page][3] or some [pricing example scenarios][4].

### Ingested spans volume

The following metrics are associated with ingested spans usage:

 - `datadog.estimated_usage.apm.ingested_bytes`
 - `datadog.estimated_usage.apm.ingested_spans`
 - `datadog.estimated_usage.apm.ingested_traces`

Control the usage with `datadog.estimated_usage.apm.ingested_bytes`. Ingestion is metered as a volume, not as a number of spans or traces. This metric is tagged by `env` and `service` so you can spot which environments and services are contributing to the ingestion volume.

This metric is also tagged by `ingestion_reason`, reflecting which [ingestion mechanisms][5] are responsible for sending spans to Datadog. These mechanisms are nested in the tracing libraries of the Datadog Agent. For more information about this dimension, see the [Ingestion Reasons dashboard][6].

The `datadog.estimated_usage.apm.ingested_traces` metric measures the number of requests sampled per second, and only counts traces sampled by [head-based sampling][7]. This metric is also tagged by `env` and `service` so you can spot which services are starting the most traces.

### Indexed spans

Use the `datadog.estimated_usage.apm.indexed_spans` metric to control the number of spans indexed by [tag-based retention filters][2].

This metric is tagged by `env` and `service` so you can spot which environments and services are contributing to the indexing usage.

## APM Traces Estimated Usage dashboard

The [APM Traces Usage dashboard][8] contains several widget groups displaying high-level KPIs and additional usage information.

{{< img src="tracing/trace_indexing_and_ingestion/usage_metrics/dashboard_apm_usage.png" style="width:100%;" alt="APM Estimated Usage Dashboard" >}}

In this dashboard, you can find information about:

- Global usage metrics
- Infrastructure with APM enabled, including hosts, Fargate, and AWS Lambda
- Ingestion volumes separated by `service`, `env`, and `ingestion_reason`
- Indexing volumes separated by `service` and `env`

## APM Ingestion Reasons dashboard

The [APM Ingestion Reasons dashboard][6] provides insights on each source of ingestion volume. Each ingestion usage metric is tagged with an `ingestion_reason` dimension, so you can see which configuration options (Datadog Agent configuration or tracing library configuration) and products (such as RUM or Synthetic Testing) are generating the most APM data.

{{< img src="tracing/trace_indexing_and_ingestion/usage_metrics/dashboard_ingestion_reasons.png" style="width:100%;" alt="APM Ingestion Reasons Dashboard" >}}

For each ingestion reason, you can find out which environments and services are contributing the most to the overall volume.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/tracing/trace_pipeline/ingestion_controls
[2]: /ja/tracing/trace_pipeline/trace_retention/#retention-filters
[3]: https://www.datadoghq.com/pricing/?product=apm#apm
[4]: /ja/account_management/billing/apm_tracing_profiler/
[5]: /ja/tracing/trace_pipeline/ingestion_mechanisms/
[6]: https://app.datadoghq.com/dash/integration/apm_ingestion_reasons
[7]: /ja/tracing/trace_pipeline/ingestion_mechanisms/#head-based-sampling
[8]: https://app.datadoghq.com/dash/integration/apm_estimated_usage