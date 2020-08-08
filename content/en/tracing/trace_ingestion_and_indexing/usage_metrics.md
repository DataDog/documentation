---
title: Usage Metrics
kind: documentation
---
## Overview

This page details the ways you can monitor your APM and Indexing usage.

If the numbers you are seeing are not in line with your expectations, or you want to change your ingestion or indexing rates, refer to the [Indexing][1] or [Ingestion][2] documentation.

## Usage Dashboard
{{< img src="tracing/trace_indexing_and_ingestion/AppAnalyticsDashboard.png" style="width:100%;" alt="Indexed Span Dashboard" >}}

Datadog provides an out-of-the-box dashboard for monitoring your APM usage, as well as your Ingested and Indexed Spans. You can find this [Usage Dashboard here][3].

This dashboard is powered by several metrics, and if you want to use them for any other custom dashboard or monitor, they are:

`datadog.estimated_usage.apm.ingested_spans` and `datadog.estimated_usage.apm.indexed_spans`

## Indexed Spans

{{< img src="tracing/trace_indexing_and_ingestion/SpanIndexing.png" style="width:100%;" alt="Span Indexing" >}}

Each retention filter set on your services, including the default [Datadog Intelligent Sampling Filter][4] will result in an increase to the number of Indexed Spans for your Datadog account.

As Indexed Spans may impact your bill, the ‘Spans Indexed’ column will appear alongside each filter that is set, alongside a readout of the number of spans indexed based on the timeframe selected for that filter.

**Note:** The Datadog Intelligent Sampling Filter on its own will not cause any bill outside of the included Indexed Spans with your APM Host pricing.

**Note:** Admin rights are required to create, modify or disable Span Indexing Filters.

[1]: /tracing/trace_ingestion_and_indexing/indexing
[2]: /tracing/trace_ingestion_and_indexing/ingestion
[3]: https://app.datadoghq.com/dash/integration/30337/app-analytics-usage
[4]: /tracing/trace_ingestion_and_indexing/Indexing/#
