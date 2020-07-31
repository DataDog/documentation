---
title: Usage Metrics
kind: documentation
---
## Overview

This page details the ways you can monitor your APM and Indexing usage to ensure

If the numbers you are seeing are not in line with your expectations, or you want to change your ingestion or indexing counts, refer to the [Indexing][1] or [Ingestion][2] documentation.

## Dashboard

Datadog provides an out-of-the-box dashboard for monitoring your APM usage, as well as your Ingested and Indexed Spans. You can find this [Usage Dashboard here][3].

This dashboard is powered by several metrics, and if you want to use them for any other custom dashboard or monitor, they are:

`datadog.estimated_usage.apm.ingested_spans` and `datadog.estimated_usage.apm.indexed_spans`

## Throughput percentage


- Private Beta View showing % of traffic from services that are being sent.
- Gif to be added


[1]: /tracing/trace_ingestion_and_indexing/indexing
[2]: /tracing/trace_ingestion_and_indexing/ingestion
[3]: https://app.datadoghq.com/dash/integration/30337/app-analytics-usage
