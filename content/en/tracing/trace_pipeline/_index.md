---
title: The Trace Pipeline
aliases:
    - /tracing/ingestion/
    - /tracing/trace_ingestion/
    - /tracing/trace_retention_and_ingestion/
description: "Learn how to control span ingestion"
---

{{< img src="tracing/apm_lifecycle/trace_pipeline.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Trace Pipeline" >}}

Collect traces from your intrumented applications to gain end-to-end visibility into your applications. Query and visualize distributed traces from the [Trace Explorer][1], understand how requests flow through your microservices and easily investigate errors and performance issues.

With APM, both the **ingestion** and the **retention** of traces are fully customizable.

## Ingestion mechanisms

Set up tracing to gain end-to-end visibility into your applications with fine-grained [ingestion configuration][2]. Make sure to capture complete traces, including all error and high-latency traces to never miss performance issues such as an application outage or an unresponsive service.

{{< img src="tracing/trace_indexing_and_ingestion/service_setup.png" style="width:80%;" alt="Service Setup" >}}


## Ingestion controls

The [Ingestion Control page][3] overviews ingestion volumes and configuration settings across your services.

{{< img src="tracing/trace_indexing_and_ingestion/ingestion_controls_page.png" style="width:100%;" alt="Ingestion Control Page Overview" >}}

## Generating metrics from spans

You can generate metrics from ingested spans, and use those custom metrics for queries and comparisons. Learn more in [Generating Metrics from Spans][4].

{{< img src="tracing/span_to_metrics/metrics_from_spans_1.png" style="width:100%;" alt="Graph of a span-based metric" >}}

## Trace retention

After spans have been ingested by Datadog, some are kept for 15 days according to the [Retention Filters][5] that have been set on your account. The Datadog Intelligent Retention Filter indexes a proportion of traces to help you monitor the health of your applications. Plus, you can define your own custom retention filters to index trace data you want to keep in support your organization's goals.

{{< img src="tracing/trace_indexing_and_ingestion/retention_filters/retention_filters.png" style="width:100%;" alt="Retention Filters Page" >}}

## Trace usage metrics

Learn about how to track and monitor your volume of ingested and indexed data, including using the APM Estimated Usage and Ingestion Reasons dashboards, by reading [Usage Metrics][6].

{{< img src="tracing/trace_indexing_and_ingestion/usage_metrics/dashboard_apm_usage.png" style="width:100%;" alt="APM Estimated Usage Dashboard" >}}


[1]: /tracing/trace_explorer
[2]: /tracing/trace_pipeline/ingestion_mechanisms/
[3]: /tracing/trace_pipeline/ingestion_controls
[4]: /tracing/trace_pipeline/generate_metrics
[5]: /tracing/trace_pipeline/trace_retention
[6]: /tracing/trace_pipeline/metrics
