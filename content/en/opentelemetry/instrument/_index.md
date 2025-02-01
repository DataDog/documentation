---
title: Instrument Your Applications
further_reading:
    - link: 'https://opentelemetry.io/docs/concepts/instrumentation/'
      text: 'OpenTelemetry Instrumentation'
      tag: 'External Site'
---

## Overview

Datadog supports several approaches for instrumenting your applications with OpenTelemetry. Choose the method that best fits your needs:

### OpenTelemetry API with Datadog SDK

Integrating Datadog with OpenTelemetry allows you to use Datadog's comprehensive observability platform while leveraging OpenTelemetry's vendor-agnostic instrumentation. This allows you to collect, visualize, and analyze traces, metrics, and logs from your applications and infrastructure.

Use the OpenTelemetry API with Datadog's SDK to maintain vendor-neutral instrumentation while accessing Datadog's full feature set.

{{< whatsnext desc=" " >}}
    {{< nextlink href="/tracing/trace_collection/custom_instrumentation/otel_instrumentation/" >}}Use Datadog SDK with OTel API{{< /nextlink >}}
{{< /whatsnext >}}

### OpenTelemetry instrumentation libraries

Use existing OpenTelemetry auto-instrumentation libraries with Datadog's backend.

Datadog supports OpenTelemetry-compatible instrumentations which provides observability for libraries not covered by Datadog SDKs, without changing SDKs. You can extend Datadog's tracing capabilities to these frameworks.

{{< whatsnext desc=" " >}}
    {{< nextlink href="/opentelemetry/instrument/instrumentation_libraries/" >}}Use OpenTelemetry Instrumentation Libraries with the Datadog SDK{{< /nextlink >}}
{{< /whatsnext >}}

### OpenTelemetry API with OpenTelemetry SDK

The OpenTelemetry Collector enables you to collect, process, and export telemetry data from your applications in a vendor-neutral way. When configured with the Datadog Exporter and Datadog Connector, you can send your traces, logs, and metrics to Datadog without the Datadog Agent.

<div class="alert alert-info">If you instrument your applications fully with OTel, some Datadog features are not supported. For more information, see the <a href="/opentelemetry/compatibility/">Feature Compatibility</a> table.</div>

{{< whatsnext desc=" " >}}
    {{< nextlink href="https://opentelemetry.io/docs/languages/" >}}Use OTel SDK with OTel API{{< /nextlink >}}
{{< /whatsnext >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /opentelemetry/setup/collector_exporter/