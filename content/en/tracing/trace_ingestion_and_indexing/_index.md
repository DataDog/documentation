---
title: Trace Ingestion and Indexing
kind: documentation
aliases:
  - /tracing/visualization/search/
  - /tracing/trace_search_and_analytics/
  - /tracing/advanced_usage/
---
{{< img src="tracing/live_search_and_analytics/SpanJourney.png" style="width:100%;" alt="Trace Journey" >}}

<div class="alert alert-warning">
These features are currently in private beta. <a href="https://docs.datadoghq.com/help/">Reach out to support</a> to be added to the beta.
</div>

## Ingestion Controls

### Overview

{{< img src="tracing/trace_indexing_and_ingestion/DataIngestion.png" style="width:100%;" alt="Data Ingestion" >}}

By default, most or all of your instrumented services will be able to send 100% of their traffic to Datadog.  High-volume services, or services that experience bursts of higher-than-average traffic may pose an exception.

You can see the ingestion rate, as well as requests per second for your services on the above image, available in-app.

### Change the Default Ingestion Rate

{{< img src="tracing/trace_indexing_and_ingestion/ChangeIngestRate.gif" style="width:100%;" alt="Change the Data Ingestion Rate" >}}

For any services that you want to send more traffic than the default percentage this can be configured by adding a generated code snippet to your tracer configuration for that service to ensure that percentage of traffic gets sent, from 0 to 100.

### Legacy Setup

Enable [App Analytics][1] on your Integrations.

## Indexing Controls

### Overview

{{< img src="tracing/trace_indexing_and_ingestion/SpanIndexing.png" style="width:100%;" alt="Span Indexing" >}}

After spans have been ingested by Datadog, they will be retained for 15 days according to the indexing filters that have been set on your account.

### Datadog Intelligent Sampling Filter

- Retain high-value traces (e.g. high-latency traces and error traces are retained by default) (App callout to view docs will link here)

### Create your own filter

{{< img src="tracing/trace_indexing_and_ingestion/SpanIndexingFilter.gif" style="width:100%;" alt="Span Indexing" >}}

To customize what spans are indexed and retained for 15 days, you can create, modify and disable additional filters based on tags, and set a % of spans matching each filter to be retained.  Note that any span that is retained will have its corresponding trace saved as well, so when it is viewed, the full context will be available.



[1]: /tracing/trace_ingestion_and_indexing/app_analytics
