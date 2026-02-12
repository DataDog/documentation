---
title: Instrument Your Applications
aliases:
    - /opentelemetry/guide/otel_api_tracing_interoperability
further_reading:
    - link: 'https://opentelemetry.io/docs/concepts/instrumentation/'
      text: 'OpenTelemetry Instrumentation'
      tag: 'External Site'
---

## Overview

Datadog supports several approaches for instrumenting your applications with OpenTelemetry. Choose the method that best fits your needs:

### OpenTelemetry SDK

{{% opentelemetry/otel-sdks %}}

{{< whatsnext desc=" " >}}
    {{< nextlink href="https://opentelemetry.io/docs/languages/" >}}Use OpenTelemetry SDKs{{< /nextlink >}}
{{< /whatsnext >}}

### OpenTelemetry API and Datadog SDK

Integrating Datadog with OpenTelemetry allows you to use Datadog's comprehensive observability platform while leveraging OpenTelemetry's vendor-agnostic instrumentation. This allows you to collect, visualize, and analyze traces from your applications and infrastructure.

Use the OpenTelemetry Tracing APIs with Datadog's SDK to maintain vendor-neutral instrumentation while accessing Datadog's full feature set.

{{< whatsnext desc=" " >}}
    {{< nextlink href="/opentelemetry/instrument/api_support" >}}Use the Datadog SDK with OpenTelemetry API{{< /nextlink >}}
    {{< nextlink href="/opentelemetry/config/environment_variable_support/" >}}Configure the Datadog SDK with OpenTelemetry SDK environment variables{{< /nextlink >}}
{{< /whatsnext >}}

### OpenTelemetry instrumentation libraries

Extend your observability with OpenTelemetry [instrumentation libraries][2] alongside Datadog's SDK.

Datadog supports OpenTelemetry-compatible instrumentation libraries which provide observability for frameworks and technologies not covered by Datadog's native SDKs. This allows you to instrument additional frameworks and libraries while still sending data to Datadog's backend.

{{< whatsnext desc=" " >}}
    {{< nextlink href="/opentelemetry/instrument/dd_sdks/instrumentation_libraries/" >}}Use OpenTelemetry Instrumentation Libraries with the Datadog SDK{{< /nextlink >}}
{{< /whatsnext >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /opentelemetry/setup/collector_exporter/
[2]: https://opentelemetry.io/docs/specs/otel/overview/#instrumentation-libraries
