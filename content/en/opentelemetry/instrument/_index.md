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

# Instrument Your Applications

## Overview

Datadog supports multiple approaches for instrumenting applications with OpenTelemetry. This guide helps you choose the right instrumentation strategy for your needs.

## Comparison of Methods

| Feature | OTel API + Datadog SDK | Full OpenTelemetry | OTel Instrumentation + DD SDK |
|---------|----------------------|-------------------|----------------------------|
| Best For | Balance of vendor neutrality and Datadog features | Complete vendor neutrality | Extending Datadog SDK coverage |
| Datadog Feature Support | Full | Limited | Full |
| Implementation Complexity | Medium | Medium | Low |
| Vendor Independence | Medium | High | Low |
| Auto-instrumentation | Yes | Yes | Yes |
| Custom Instrumentation | Yes | Yes | Limited |

## Instrumentation Options

### OpenTelemetry API with Datadog SDK

This approach combines OpenTelemetry's standardized instrumentation with Datadog's full feature set.

**Benefits:**
- Access to all Datadog features
- Standardized instrumentation approach
- Future flexibility to switch vendors

**Ideal for:**
- Teams wanting vendor neutrality without sacrificing features
- Organizations standardizing on OpenTelemetry
- Projects requiring Datadog-specific capabilities

{{< whatsnext desc=" " >}}
    {{< nextlink href="/tracing/trace_collection/custom_instrumentation/otel_instrumentation/" >}}Implement OTel API with Datadog SDK{{< /nextlink >}}
{{< /whatsnext >}}

### Full OpenTelemetry

Use OpenTelemetry's complete stack for a vendor-neutral implementation.

**Benefits:**
- Complete vendor independence
- Standard OpenTelemetry ecosystem support
- Simplified vendor transitions

**Considerations:**
- Limited access to Datadog-specific features
- Standard OpenTelemetry capabilities only

<div class="alert alert-info">Some Datadog features are not available with full OpenTelemetry implementation. See the <a href="/opentelemetry/compatibility/">Feature Compatibility</a> table for details.</div>

{{< whatsnext desc=" " >}}
    {{< nextlink href="https://opentelemetry.io/docs/languages/" >}}Implement full OpenTelemetry{{< /nextlink >}}
{{< /whatsnext >}}

### OpenTelemetry Instrumentation with Datadog SDK

Extend Datadog SDK coverage using OpenTelemetry instrumentation libraries.

**Benefits:**
- Expands Datadog SDK coverage
- Simple implementation
- Access to full Datadog feature set

**Ideal for:**
- Existing Datadog users needing additional framework support
- Projects requiring specific library instrumentation
- Gradual adoption of OpenTelemetry

{{< whatsnext desc=" " >}}
    {{< nextlink href="/opentelemetry/instrument/instrumentation_libraries/" >}}Use OpenTelemetry instrumentation libraries{{< /nextlink >}}
{{< /whatsnext >}}

## Next Steps

1. Review the [Feature Compatibility](/opentelemetry/compatibility/) table
2. Choose your instrumentation approach
3. Follow the implementation guide for your selected method

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}