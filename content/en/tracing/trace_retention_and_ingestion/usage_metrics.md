---
title: Usage Metrics
kind: documentation
description: "Learn how to monitor your Tracing without Limits usage."
---


If, when you monitor your APM and indexed span usage, the numbers are not in line with your expectations, or you want to change your ingestion or retention rates, see the [retention filters][1] or [ingestion control][2] documentation.

This document details the available metrics and default dashboard for monitoring ingested and indexed span consumption.  Datadog APM plans come with included indexed and ingested spans.  For more information, refer to our [pricing documentation][3], or view some [example pricing scenarios][4].

### Trace Analytics Usage Dashboard

{{< img src="tracing/trace_indexing_and_ingestion/usage_metrics/AnalyticsDashboardOverview.png" style="width:100%;" alt="Tracing without Limits Usage Dashboard" >}}

Datadog provides an out-of-the-box [Usage Dashboard][5] for monitoring your APM usage, as well as your ingested and indexed span volumes.

Each metric on this dashboard is powered by one of the below three Datadog standard metrics available in your account.

 - `datadog.estimated_usage.apm.ingested_bytes`
 - `datadog.estimated_usage.apm.ingested_spans`
 - `datadog.estimated_usage.apm.indexed_spans`

These metrics are tagged by `env` and `service` to help you determine if you should fine-tune ingestion or indexing controls for particular environments and services.  Use these metrics within our default dashboard or create your own dashboards and monitors to detect retention filter misconfiguration or set thresholds for monitors.

The default [Trace Analytics Dashboard][5] has several groups of widgets to see at a glance where the most ingested and indexed spans are coming from. This dashboard includes top lists for `env`, `service` and unique `env` and `service` combinations as mentioned above.

 **Note:** Billing is based on bytes, but both bytes and span breakdowns are available on the dashboard.

### Indexed Spans

{{< img src="tracing/trace_indexing_and_ingestion/RetentionFilters.png" style="width:100%;" alt="Span Indexing" >}}

Each retention filter set on your services, including the default [Datadog Intelligent Retention Filter][6], results in an _increase_ to the number of Indexed Spans for your Datadog account.

Because Indexed Spans can impact your bill, the 'Spans Indexed' column appears alongside each filter you set, showing the number of spans indexed based on the timeframe selected for that filter.

**Note:** The Datadog Intelligent Retention Filter on its own will not cause any bill outside of the included Indexed Spans with your APM Host pricing.

**Note**: Admin rights are required to create, modify, or disable retention filters.


[1]: /tracing/trace_retention_and_ingestion/#retention-filters
[2]: /tracing/trace_retention_and_ingestion/#ingestion-controls
[3]: https://www.datadoghq.com/pricing/?product=apm#apm
[4]: /account_management/billing/apm_distributed_tracing/
[5]: https://app.datadoghq.com/dash/integration/30337/app-analytics-usage
[6]: /tracing/trace_retention_and_ingestion/#datadog-intelligent-retention-filter
