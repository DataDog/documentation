---
title: Usage Metrics
kind: documentation
description: "Learn how to monitor your Tracing without Limits usage."
---


If, when you monitor your APM and Indexing usage, the numbers are not in line with your expectations, or you want to change your ingestion or retention rates, see the [retention filters][1] or [ingestion control][2] documentation.

This document details the available metrics and default dashboard for monitoring ingested and indexed span consumption.  Datadog APM plans come with included Indexed and Ingested Spans.  For more information, refer to our [pricing][3] documentation, or view some [example pricing scenarios][4].

### Trace Analytics Usage Dashboard

{{< img src="tracing/trace_indexing_and_ingestion/AppAnalyticsDashboard.png" style="width:100%;" alt="Indexed span Dashboard" >}}

Datadog provides an out-of-the-box [Usage Dashboard][5] for monitoring your APM usage, as well as your Ingested and Indexed spans.

This dashboard is broken up into several groups, each of which we will describe below.  All of these dashboards can be copied to a custom dashboard or used for monitors.

#### APM Overview

{{< img src="tracing/trace_indexing_and_ingestion/usage_metrics/AnalyticsDashboardOverview.png" style="width:100%;" alt="Overview section of the Trace Analytics Usage Dashboard" >}}

The first section shows a quick summary of your APM Host count over time, as well as timeseries graphs for Ingested and Indexed spans over time.  This can be very useful to see at-a-glance if you are staying within your expected bounds.

#### Ingestion Overview

{{< img src="tracing/trace_indexing_and_ingestion/usage_metrics/AnalyticsDashboardIngestionOverview.png" style="width:100%;" alt="Ingestion for the Trace Analytics Usage Dashboard" >}}

This set of widgets focuses on ingestion, giving a timeseries of bytes ingested per second, total bytes ingested over the time period, as well as breaking the total ingestion down by `env`. The same metrics are repeated for spans.

**Note:** Billing is based on bytes, but spans may be easier to track across your services so these metrics are provided in pairs.

#### Indexing Overview

{{< img src="tracing/trace_indexing_and_ingestion/usage_metrics/AnalyticsDashboardIndexingOverview.png" style="width:100%;" alt="Indexed Spans for the Trace Analytics Usage Dashboard" >}}

This set of widgets focuses on indexed spans from retention filters, giving a timeseries of spans indexed per second, total spans indexed over the time period, as well as breaking the total indexing down by `env`.

#### Indexed Spans by Env

{{< img src="tracing/trace_indexing_and_ingestion/usage_metrics/AnalyticsDashboardIndexedSpansByEnv.png" style="width:100%;" alt="Indexed Spans for the Trace Analytics Usage Dashboard by Env" >}}

This set of widgets focuses on the `env` tag.  For each environment, a top list is provided of the ingested and indexed spans from that environment, as well as a top list of what this ratio is per environment.

#### Indexed Spans by Service

{{< img src="tracing/trace_indexing_and_ingestion/usage_metrics/AnalyticsDashboardIndexedSpansByService.png" style="width:100%;" alt="Indexed Spans for the Trace Analytics Usage Dashboard by Service" >}}

This set of widgets focuses on the `service` tag.  For each environment, a top list is provided of the ingested and indexed spans from that service, as well as a top list of what this ratio is per service.

#### Indexed Spans by Env and Service

{{< img src="tracing/trace_indexing_and_ingestion/usage_metrics/AnalyticsDashboardIndexedSpansByEnvAndService.png" style="width:100%;" alt="Indexed Spans for the Trace Analytics Usage Dashboard by Env and Service" >}}

This set of widgets focuses on the `env` and `service` tag combination.  For each unique combination, a top list is provided of the ingested and indexed spans from that environment and service, as well as a top list of what this ratio is per combination.


### Create your own monitor or dashboard

To create a custom dashboard or monitor, the key metrics to use are:

 - `datadog.estimated_usage.apm.ingested_bytes`
 - `datadog.estimated_usage.apm.ingested_spans`
 - `datadog.estimated_usage.apm.indexed_spans`

Each of these metrics is tagged by `env` and `service` and can be used in as specific or general a monitor or dashboard as you would like.

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
