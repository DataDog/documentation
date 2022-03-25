---
title: Trace Ingestion
kind: documentation
aliases:
    - /tracing/ingestion/
    - /tracing/trace_retention_and_ingestion/
description: "Learn how to control span ingestion"
further_reading:
- link: "/tracing/trace_retention/"
  tag: "Documentation"
  text: "Trace Retention"
- link: "/tracing/trace_retention/usage_metrics/"
  tag: "Documentation"
  text: "Usage Metrics"
---

{{< img src="tracing/live_search_and_analytics/tracing_without_limits_lifecycle-2.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Trace Journey: Ingestion" >}}

With APM, the ingestion of traces to Datadog is fully customizable.

## Ingestion mechanisms

Set up tracing to gain end-to-end visibility into your applications with fine-grained [ingestion configuration][1]. Make sure to capture complete traces, including all error and high-latency traces to never miss performance issues such as an application outage or an unresponsive service.

{{< img src="tracing/trace_indexing_and_ingestion/service_setup.png" style="width:80%;" alt="Service Setup" >}}


## Ingestion controls

The [Ingestion Control page][2] provides an overview of ingestion volumes and configuration settings across your services.

{{< img src="tracing/trace_indexing_and_ingestion/IngestionControls.png" style="width:80%;" alt="Retention Filters" >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/trace_ingestion/mechanisms
[2]: /tracing/trace_ingestion/ingestion_controls
