---
title: Instrument Your Applications
description: Instrument your applications with OpenTelemetry and Datadog SDKs to collect, visualize, and analyze traces across your services and infrastructure.
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

### DDOT SDK

The DDOT SDK (Preview) is the Datadog SDK for your language, run in OpenTelemetry mode. It replaces the upstream OpenTelemetry SDK and sends OTLP to your Collector. You can also use the OpenTelemetry API with it to add custom spans, metrics, and logs.

{{< whatsnext desc=" " >}}
    {{< nextlink href="/opentelemetry/instrument/dd_sdks/" >}}Use DDOT SDKs{{< /nextlink >}}
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
