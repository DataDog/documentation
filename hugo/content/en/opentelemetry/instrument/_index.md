---
title: Instrument Your Applications
description: Instrument your applications with a DDOT SDK, an OpenTelemetry SDK, or a Datadog SDK with the OpenTelemetry API.
aliases:
    - /opentelemetry/guide/otel_api_tracing_interoperability
further_reading:
    - link: 'https://opentelemetry.io/docs/concepts/instrumentation/'
      text: 'OpenTelemetry Instrumentation'
      tag: 'External Site'
---

## Overview

Instrument your applications with a DDOT SDK or an OpenTelemetry SDK. Both export OTLP to your Collector. If you already use a Datadog SDK with the Datadog Agent, you can add the OpenTelemetry API to it instead.

### DDOT SDK

A DDOT SDK (Preview) is the Datadog SDK for your language, set up to export OTLP to your Collector, in place of the upstream OpenTelemetry SDK. It implements the OpenTelemetry API, so you can use the API to add custom spans, metrics, and logs.

{{< whatsnext desc=" " >}}
    {{< nextlink href="/opentelemetry/instrument/dd_sdks/" >}}Use DDOT SDKs{{< /nextlink >}}
{{< /whatsnext >}}

### OpenTelemetry SDK

{{% opentelemetry/otel-sdks %}}

{{< whatsnext desc=" " >}}
    {{< nextlink href="https://opentelemetry.io/docs/languages/" >}}Use OpenTelemetry SDKs{{< /nextlink >}}
{{< /whatsnext >}}

### Datadog SDK with the OpenTelemetry API

If your applications already send data to the Datadog Agent with a Datadog SDK, keep that setup and add custom instrumentation with the OpenTelemetry API. You can also add OpenTelemetry [instrumentation libraries][1] for frameworks that the Datadog SDK doesn't instrument.

{{< whatsnext desc=" " >}}
    {{< nextlink href="/opentelemetry/instrument/dd_sdks/api_support" >}}Use the Datadog SDK with the OpenTelemetry API{{< /nextlink >}}
    {{< nextlink href="/opentelemetry/config/environment_variable_support/" >}}Configure the Datadog SDK with OpenTelemetry SDK environment variables{{< /nextlink >}}
    {{< nextlink href="/opentelemetry/instrument/dd_sdks/instrumentation_libraries/" >}}Use OpenTelemetry instrumentation libraries with the Datadog SDK{{< /nextlink >}}
{{< /whatsnext >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://opentelemetry.io/docs/specs/otel/overview/#instrumentation-libraries
