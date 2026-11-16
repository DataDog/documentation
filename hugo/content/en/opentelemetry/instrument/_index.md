---
title: Instrument Your Applications
description: Choose an OpenTelemetry instrumentation approach and learn how to deploy it without creating duplicate telemetry.
aliases:
    - /opentelemetry/guide/otel_api_tracing_interoperability
further_reading:
    - link: 'https://opentelemetry.io/docs/concepts/instrumentation/'
      text: 'OpenTelemetry instrumentation'
      tag: 'External Site'
    - link: '/opentelemetry/compatibility/'
      text: 'OpenTelemetry feature compatibility'
      tag: 'Documentation'
---

## Overview

Datadog supports two approaches for application instrumentation with OpenTelemetry. Choose one SDK approach for each process to avoid duplicate instrumentation and spans.

{{< whatsnext desc=" " >}}
    {{< nextlink href="/opentelemetry/instrument/upstream_otel_sdks/" >}}
    <h3>Using Upstream OpenTelemetry SDKs</h3>
    Use the OpenTelemetry API, SDK, and instrumentation maintained by the OpenTelemetry project. Export telemetry to Datadog with OTLP through a Collector, the Datadog Agent, or a supported direct-ingestion path.
    {{< /nextlink >}}
    {{< nextlink href="/opentelemetry/instrument/dd_otel_sdks/" >}}
    <h3>Using Datadog OpenTelemetry SDKs</h3>
    Use OpenTelemetry SDKs maintained by Datadog. They implement OpenTelemetry APIs and support OTLP, with availability varying by language and signal. Choose this approach for Datadog-managed deployment with Single Step Instrumentation or additional Datadog-specific capabilities.
    {{< /nextlink >}}
{{< /whatsnext >}}

The approaches differ in deployment methods, configuration, and feature support. Review the [feature compatibility table][1] before choosing or changing an approach.

## Avoid duplicate instrumentation

Do not attach an upstream OpenTelemetry SDK and a Datadog SDK to the same process unless the language-specific documentation explicitly supports that combination. If Single Step Instrumentation (SSI) already injects a Datadog SDK, keep that SDK and use the Datadog approach. To replace it with an upstream OpenTelemetry SDK, first [exclude the workload from SSI][2] with a workload-scoped method, then recreate its pods.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /opentelemetry/compatibility/#feature-compatibility
[2]: /tracing/trace_collection/single-step-apm/kubernetes/#remove-instrumentation-for-specific-services
