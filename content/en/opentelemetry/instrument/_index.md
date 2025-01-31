---
title: Instrument Your Applications
---

## Overview

Datadog supports several approaches for instrumenting your applications with OpenTelemetry. Choose the method that best fits your needs:

### OpenTelemetry API with Datadog SDK

Integrating Datadog with OpenTelemetry allows you to use Datadog's comprehensive observability platform while leveraging OpenTelemetry's vendor-agnostic instrumentation. This allows you to collect, visualize, and analyze traces, metrics, and logs from your applications and infrastructure.

Use the OpenTelemetry API with Datadog's implementation to maintain vendor-neutral instrumentation while accessing Datadog's full feature set.

{{< whatsnext desc="Get started with the OpenTelemetry API:" >}}
    {{< nextlink href="/tracing/trace_collection/custom_instrumentation/otel_instrumentation/" >}}Set up OpenTelemetry API{{< /nextlink >}}
{{< /whatsnext >}}

### OpenTelemetry instrumentation libraries

Use existing OpenTelemetry auto-instrumentation libraries with Datadog's backend.

{{< whatsnext desc="Get started with OpenTelemetry libraries:" >}}
    {{< nextlink href="/opentelemetry/instrument/instrumentation_libraries/" >}}Set up OpenTelemetry Libraries{{< /nextlink >}}
{{< /whatsnext >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}