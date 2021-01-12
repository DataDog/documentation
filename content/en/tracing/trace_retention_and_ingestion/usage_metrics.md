---
title: Usage Metrics
kind: documentation
description: "Learn how to monitor your Tracing without Limits usage."
---


If, when you monitor your APM and Indexing usage, the numbers are not in line with your expectations, or you want to change your ingestion or retention rates, see the [retention filters][1] or [ingestion control][2] documentation.

This document details the available metrics and default dashboard for monitoring ingested and indexed span consumption.  Datadog APM plans come with included indexed and ingested spans.  For more information, refer to our [pricing documentation][3], or view some [example pricing scenarios][4].

### Trace Analytics Usage Dashboard

{{< img src="tracing/trace_indexing_and_ingestion/usage_metrics/AnalyticsDashboardOverview.png" style="width:100%;" alt="Tracing without Limits Usage Dashboard" >}}

Datadog provides an out-of-the-box [Usage Dashboard][5] for monitoring your APM usage, as well as your ingested and indexed span volumes.

Each metric on this dashboard is powered by one of the below three Datadog standard metrics available in your account.

 - `datadog.estimated_usage.apm.ingested_bytes`
 - `datadog.estimated_usage.apm.ingested_spans`
 - `datadog.estimated_usage.apm.indexed_spans`

Each of these metrics is also tagged by `env` and `service` to allow easy detection of what services and in which environment any fine-tuning of ingestion or indexing controls should be done in.

The default [Trace Analytics Dashboard][5] groups are below, including the widgets each contains:

| Group                         | Widgets                                                                                            |
| ------------------------------ | ------------------------------------------------------------------------------------------------------ |
| Summary | Shows the APM Host count currently and as a timeseries, along with ingested and indexed spans for an at-a-glance determination if filters need to be tuned.  |
| Ingestion overview           | Shows a detailed view of ingestion, including bytes per second, total bytes ingested during the time period, and a breakdown of ingestion by `env`.  The same graphs are again available for spans instead of bytes.  **Note:** Billing is based on bytes.|
| Indexing overview          | Shows a detailed view of indexed spans, including a timeseries of spans indexed per second, total spans indexed over the period, and a breakdown of indexed spans by `env`.  |
| Per env breakdown |   For each environment, a top list is provided of the ingested and indexed spans from that environment, as well as a top list of what this ratio is per environment.                                                         |
| Per service breakdown         | For each service, a top list is provided of the ingested and indexed spans from that service, as well as a top list of what this ratio is per service.       |
| Per env and service combination breakdown         | For each unique combination of `env` and `service`, a top list is provided of the ingested and indexed spans from that environment and service, as well as a top list of what this ratio is per combination. |

### Indexed Spans

{{< img src="tracing/trace_indexing_and_ingestion/RetentionFilters.png" style="width:100%;" alt="Span Indexing" >}}

Each retention filter set on your services, including the default [Datadog Intelligent Retention Filter][6], results in an _increase_ to the number of Indexed Spans for your Datadog account.

Because Indexed Spans can impact your bill, the 'Spans Indexed' column appears alongside each filter you set, showing the number of spans indexed based on the timeframe selected for that filter.

**Note:** The Datadog Intelligent Retention Filter on its own will not cause any bill outside of the included Indexed Spans with your APM Host pricing.

**Note**: Admin rights are required to create, modify, or disable retention filters.


[1]: /tracing/trace_retention_and_ingestion/#retention-filters
[2]: /tracing/trace_retention_and_ingestion/#ingestion-controls
[3]: https://www.datadoghq.com/pricing/?product=apm#apm
[4]: /account_management/billing/pricing/apm_distributed_tracing/
[5]: https://app.datadoghq.com/dash/integration/30337/app-analytics-usage
[6]: /tracing/trace_retention_and_ingestion/#datadog-intelligent-retention-filter
