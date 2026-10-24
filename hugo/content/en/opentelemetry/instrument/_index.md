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

To send OpenTelemetry data to Datadog, choose an SDK to create telemetry in your applications. Both SDKs support the OpenTelemetry API, so your instrumentation code stays vendor-neutral. The SDK you choose determines which Datadog features are available. For details, see [Feature Compatibility][1].

<!-- TODO: Update the SDK options on this page after instrumentation recommendations and names are finalized. -->

## Choose an SDK

### OpenTelemetry SDK

{{% opentelemetry/otel-sdks %}}

{{< whatsnext desc=" " >}}
    {{< nextlink href="/opentelemetry/instrument/otel_sdks/" >}}Use OpenTelemetry SDKs{{< /nextlink >}}
{{< /whatsnext >}}

### Datadog SDK

Use the Datadog SDK with the OpenTelemetry API to keep vendor-neutral instrumentation and use Datadog features that require the Datadog SDK, such as Continuous Profiler and App and API Protection. The Datadog SDK can also export traces in OpenTelemetry Protocol (OTLP) format.

{{< whatsnext desc=" " >}}
    {{< nextlink href="/opentelemetry/instrument/dd_sdks/api_support" >}}Use the Datadog SDK with the OpenTelemetry API{{< /nextlink >}}
    {{< nextlink href="/opentelemetry/instrument/dd_sdks/otlp_trace_export/" >}}Export traces from the Datadog SDK in OTLP format{{< /nextlink >}}
    {{< nextlink href="/opentelemetry/config/environment_variable_support/" >}}Configure the Datadog SDK with OpenTelemetry SDK environment variables{{< /nextlink >}}
{{< /whatsnext >}}

## Add instrumentation libraries

[Instrumentation libraries][2] add telemetry for frameworks and technologies that your SDK doesn't instrument automatically. You can use them with either SDK:

- **With the OpenTelemetry SDK**: Find libraries in the [OpenTelemetry Registry][3].
- **With the Datadog SDK**: See [Use OpenTelemetry Instrumentation Libraries with the Datadog SDK][4].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /opentelemetry/compatibility/
[2]: https://opentelemetry.io/docs/specs/otel/overview/#instrumentation-libraries
[3]: https://opentelemetry.io/ecosystem/registry/?component=instrumentation
[4]: /opentelemetry/instrument/dd_sdks/instrumentation_libraries/
