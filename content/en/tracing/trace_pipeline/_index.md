---
title: The Trace Pipeline
kind: documentation
aliases:
    - /tracing/ingestion/
    - /tracing/trace_ingestion/
    - /tracing/trace_retention_and_ingestion/
description: "Learn how to control span ingestion"
---

{{< img src="tracing/live_search_and_analytics/tracing_without_limits_lifecycle-0.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Trace Journey: Ingestion" >}}

With APM, both the **ingestion** of traces as well as the **retention** of those traces for 15 days are fully customizable.

## Ingestion mechanisms

Set up tracing to gain end-to-end visibility into your applications with fine-grained [ingestion configuration][1]. Make sure to capture complete traces, including all error and high-latency traces to never miss performance issues such as an application outage or an unresponsive service.

{{< img src="tracing/trace_indexing_and_ingestion/service_setup.png" style="width:80%;" alt="Service Setup" >}}


## Ingestion controls

The [Ingestion Control page][2] provides an overview of ingestion volumes and configuration settings across your services.

{{< img src="tracing/trace_indexing_and_ingestion/ingestion_control_page.png" style="width:100%;" alt="Ingestion Control Page Overview" >}}

## Trace retention

After spans have been ingested by Datadog, some are kept for 15 days according to the [Retention Filters][3] that have been set on your account. The Datadog Intelligent Retention Filter indexes a proportion of traces to help you monitor the health of your applications. Plus, you can define your own custom retention filters to index trace data you want to keep in support your organization's goals.

{{< img src="tracing/trace_indexing_and_ingestion/retention_filters/retention_filter_page.png" style="width:100%;" alt="Retention Filters Page" >}}

## Trace pipeline metrics

Learn about how to track and monitor your volume of ingested and indexed data, including using the APM Estimated Usage and Ingestion Reasons dashboards, by reading [Trace Pipeline Metrics][4].

{{< img src="tracing/trace_indexing_and_ingestion/usage_metrics/dashboard_apm_usage.png" style="width:100%;" alt="APM Estimated Usage Dashboard" >}}



[1]: /tracing/trace_ingestion/mechanisms
[2]: /tracing/trace_ingestion/ingestion_controls
[3]: /tracing/trace_retention
[4]: /tracing/trace_retention/usage_metrics
