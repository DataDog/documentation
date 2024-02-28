---
title: Interoperability with Datadog and OpenTelemetry
kind: documentation
further_reading:
    - link: '/opentelemetry/schema_semantics/'
      tag: 'Documentation'
      text: 'Schema and Semantics'
---

## Overview

Integrating Datadog with OpenTelemetry allows you to use Datadog's comprehensive observability platform while leveraging OpenTelemetry's vendor-agnostic instrumentation. This allows you to collect, visualize, and analyze traces, metrics, and logs from your applications and infrastructure.

## Key areas

{{< whatsnext desc=" " >}}
    {{< nextlink href="/opentelemetry/interoperability/otlp_ingest_in_the_agent/" >}}OTLP Ingestion by the Datadog Agent
    {{< /nextlink >}}
    {{< nextlink href="/tracing/trace_collection/trace_context_propagation/" >}}W3C Trace Context Propagation{{< /nextlink >}}
    {{< nextlink href="/tracing/trace_collection/custom_instrumentation/otel_instrumentation/" >}}Custom Instrumentation with the OpenTelemetry API{{< /nextlink >}}
    {{< nextlink href="/real_user_monitoring/connect_rum_and_traces/" >}}Correlate RUM and Traces{{< /nextlink >}}
    {{< nextlink href="/tracing/other_telemetry/connect_logs_and_traces/opentelemetry/" >}}Correlate Logs and Traces{{< /nextlink >}}
{{< /whatsnext >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}