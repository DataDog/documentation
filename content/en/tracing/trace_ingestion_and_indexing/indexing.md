---
title: Indexing Controls
kind: documentation
---
{{< img src="tracing/live_search_and_analytics/SpanJourney.png" style="width:100%;" alt="Trace Journey" >}}

<div class="alert alert-warning">
This feature is currently in private beta. <a href="https://docs.datadoghq.com/help/">Reach out to support</a> to be added to the beta.
</div>

## Overview

{{< img src="tracing/trace_indexing_and_ingestion/SpanIndexing.png" style="width:100%;" alt="Span Indexing" >}}

After spans have been ingested by Datadog, they will be retained for 15 days according to the indexing filters that have been set on your account.

## Datadog Intelligent Sampling Filter

- Retain high-value traces (e.g. high-latency traces and error traces are retained by default) (App callout to view docs will link here)

## Create your own filter

{{< img src="tracing/trace_indexing_and_ingestion/SpanIndexingFilter.gif" style="width:100%;" alt="Span Indexing" >}}

To customize what spans are indexed and retained for 15 days, you can create, modify and disable additional filters based on tags, and set a % of spans matching each filter to be retained.  Note that any span that is retained will have its corresponding trace saved as well, so when it is viewed, the full context will be available.
