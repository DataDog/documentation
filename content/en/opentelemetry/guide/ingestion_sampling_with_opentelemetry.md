---
title: Ingestion Sampling with OpenTelemetry
kind: guide
further_reading:
- link: "/tracing/guide/trace_ingestion_volume_control"
  tag: "Guide"
  text: "Trace Ingestion Volume Control"
- link: "/tracing/trace_pipeline/ingestion_controls"
  tag: "Documentation"
  text: "Ingestion Controls"
- link: "/opentelemetry/"
  tag: "Documentation"
  text: "OpenTelemetry Support in Datadog"
---

## Overview

If your applications and services are instrumented with OpenTelemetry libraries, you can: 
- Send traces to the **[OpenTelemetry collector][1]**, and use the Datadog exporter to forward them to Datadog
- Send traces to the **[OpenTelemetry collector alongside the Datadog Agent][2]**, which then forwards them to Datadog.
- Send traces to the **[Datadog Agent OTLP ingest][3]**, which forwards them to Datadog.

In the first and second scenario, [APM RED metrics][4] (request/errors counts and latency distributions by service, operation and resource) are computed in the Datadog Exporter. In the third case, the Datadog Agent computes these metrics.

{{< img src="/opentelemetry/guide/ingestion_otel/otel_apm_metrics_computation.png" alt="Otel APM Metrics computation" style="width:100%;" >}}

Both APM metrics and distributed traces are useful for you to monitor your application performance. Metrics are useful to spot increases in latency or error rates for specific resources while distributed traces allow you to drill down to the individual request level.

### Why sampling is useful

The Datadog tracing libraries, the Datadog Agent, the OpenTelemetry SDKs, and the OpenTelemetry Collector all provide sampling capabilities because for most services, ingesting 100% of the traces is unnecessary in order to gain visibility into the health of your applications. 

Configuring sampling rates before sending traces to Datadog allows you to: 
- Ingest the data that is most relevant to your business and your observability goals.
- Reduce network costs by avoiding sending unused trace data to the Datadog platform.
- Control and manage your overall costs.

## Reducing your ingestion volume

With OpenTelemetry, you can configure sampling both in the OpenTelemetry libraries and in the OpenTelemetry collector: 
- **Head-based Sampling** in the OpenTelemetry SDKs
- **Tail-based Sampling** in the OpenTelemetry Collector

{{< img src="/opentelemetry/guide/ingestion_otel/otel_head_tail_based_sampling.png" alt="Otel APM Metrics computation" style="width:100%;" >}}

### SDK-level sampling

At the SDK level, you can implement _head-based sampling_, which is when the sampling decision is made at the beginning of the trace. This type of sampling is particularly useful for high throughput applications, for which you know that you do not need visibility over 100% of the traffic to monitor the application health. It can also help control the overhead introduced by OpenTelemetry.

[TraceIdRatioBased][5] and [ParentBased][6] are the SDK's built-in samplers that allow you to implement deterministic head-based sampling based on the `trace_id` at the SDK level.

With head-based sampling, the APM metrics are computed **on the sampled traffic**, since only the sampled traffic is sent to the OpenTelemetry Collector or Datadog Agent, which is where the metrics calculation is done.

To get accurate stats, you can upscale the metrics by using [formulas and functions][7] in Datadog dashboards and monitors, provided that you know the configured sampling rate in the SDK.

Use the [ingestion volume control guide][8] to read more about the implications of setting up trace sampling on trace analytics monitors and metrics from spans.

### Collector-level sampling

At the OpenTelemetry collector level, you can do _tail-based sampling_, which allows you to define more advanced rules to keep accrued visibility over error or high latency traces.

The [Tail Sampling Processor][9] and [Probabilistic Sampling Processor][10] allow you to sample traces based on a set of rules at the collector level.

**Note**: Tail sampling's main limitation is that all spans for a given trace must be received by the same collector instance for effective sampling decisions. If the trace is distributed across multiple collector instances, there’s a risk that some parts of a trace are dropped whereas some other parts of the same trace are sent to Datadog.

With collector-level tail-based sampling, the APM metrics are computed on the sampled traffic that the Datadog Exporter sees. Use the [ingestion volume control guide][11] to read more about the implications of setting up trace sampling on trace analytics monitors and metrics from spans.

## Monitor ingested volumes from Datadog UI

You can leverage the [APM Estimated Usage dashboard][12] and the estimated usage metric `datadog.estimated_usage.apm.ingested_bytes` to get visibility into your ingested volumes for a specific time period. Filter the dashboard to specific environments and services to see which services are responsible for the largest shares of the ingested volume.


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /opentelemetry/otel_collector_datadog_exporter
[2]: /opentelemetry/otel_collector_datadog_exporter/?tab=alongsidetheagent#4-run-the-collector
[3]: /opentelemetry/otlp_ingest_in_the_agent
[4]: /tracing/metrics/metrics_namespace/
[5]: https://github.com/open-telemetry/opentelemetry-specification/blob/main/specification/trace/sdk.md#traceidratiobased
[6]: https://github.com/open-telemetry/opentelemetry-specification/blob/main/specification/trace/sdk.md#parentbased
[7]: /dashboards/functions/#add-a-function
[8]: /tracing/guide/trace_ingestion_volume_control/#effects-of-reducing-trace-ingestion-volume
[9]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/processor/tailsamplingprocessor/README.md
[10]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/processor/probabilisticsamplerprocessor/README.md
[11]: /tracing/guide/trace_ingestion_volume_control/#effects-of-reducing-trace-ingestion-volume
[12]: https://app.datadoghq.com/dash/integration/apm_estimated_usage