---
title: Ingestion Controls
kind: documentation
aliases:
  - /tracing/visualization/search/
  - /tracing/trace_search_and_analytics/
  - /tracing/advanced_usage/
---
{{< img src="tracing/live_search_and_analytics/SpanJourney.png" style="width:100%;" alt="Trace Journey" >}}

<div class="alert alert-warning">
This feature is currently in private beta. <a href="https://docs.datadoghq.com/help/">Reach out to support</a> to be added to the beta.
</div>

## Overview

{{< img src="tracing/trace_indexing_and_ingestion/DataIngestion.png" style="width:100%;" alt="Data Ingestion" >}}

By default, most or all of your instrumented services will be able to send 100% of their traffic to Datadog.  High-volume services, or services that experience bursts of higher-than-average traffic may pose an exception.

You can see the ingestion rate, as well as requests per second for your services on the above image, available in-app.

## Change the Default Ingestion Rate

{{< img src="tracing/trace_indexing_and_ingestion/ChangeIngestRate.gif" style="width:100%;" alt="Change the Data Ingestion Rate" >}}

For any services that you want to send more traffic than the default percentage this can be configured by adding a generated code snippet to your tracer configuration for that service to ensure that percentage of traffic gets sent, from 0 to 100.

## Legacy Setup

Enable [App Analytics][1] on your Integrations.


[1]: /tracing/trace_ingestion_and_indexing/app_analytics
