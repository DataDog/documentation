---
title: Send Data to Datadog
aliases:
further_reading:
- link: "https://www.datadoghq.com/blog/opentelemetry-instrumentation/"
  tag: "Blog"
  text: "Datadog's partnership with OpenTelemetry"
---

## Overview


Cover why you would choose one path over the other here. Link to compatibility table.

### Use the OTLP intake endpoint 

**Best for**: Environments where you need a direct connection without additional infrastructure.

The OTLP Intake Endpoint provides:
- Direct data transmission without additional components
- Simplified setup and maintenance

{{< whatsnext desc=" " >}}
    {{< nextlink href="/opentelemetry/setup/intake_endpoint" >}}Learn more about using the intake endpoint{{< /nextlink >}}
{{< /whatsnext >}}

### Use OpenTelemetry API with Datadog's tracing library

**Best for**: Organizations wanting vendor-neutral instrumentation while accessing Datadog's full feature set.

This approach provides:
- Access to all Datadog's advanced features
- Vendor-neutral code for custom instrumentation
- A migration path for OpenTelemetry-instrumented applications

{{< whatsnext desc=" " >}}
    {{< nextlink href="/tracing/trace_collection/custom_instrumentation/otel_instrumentation" >}}Learn more about using the OpenTelemetry API with Datadog{{< /nextlink >}}
{{< /whatsnext >}}