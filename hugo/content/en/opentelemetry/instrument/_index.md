---
title: Instrument Your Applications
description: Instrument your applications with a Datadog SDK, in DDOT setup or with the Datadog Agent, or with an OpenTelemetry SDK.
aliases:
    - /opentelemetry/guide/otel_api_tracing_interoperability
further_reading:
    - link: 'https://opentelemetry.io/docs/concepts/instrumentation/'
      text: 'OpenTelemetry Instrumentation'
      tag: 'External Site'
---

## Overview

Instrument your applications with a Datadog SDK or an OpenTelemetry SDK.

### Datadog SDKs

Use the Datadog SDK for your language in one of two setups:

- **DDOT setup** (Preview): The Datadog SDK runs as a DDOT SDK and exports OTLP to your Collector, in place of the upstream OpenTelemetry SDK.
- **With the Datadog Agent**: The Datadog SDK keeps sending data to the Agent. You add custom instrumentation with the OpenTelemetry API, and OpenTelemetry [instrumentation libraries][1] for frameworks that the Datadog SDK doesn't instrument.

In both setups, you can use the OpenTelemetry API to add custom spans, metrics, and logs. For how the two setups compare, see [Using Datadog SDKs with OpenTelemetry][2].

{{< whatsnext desc=" " >}}
    {{< nextlink href="/opentelemetry/instrument/dd_sdks/ddot_setup/" >}}Set up DDOT SDKs{{< /nextlink >}}
    {{< nextlink href="/opentelemetry/instrument/dd_sdks/api_support" >}}Use the Datadog SDK with the OpenTelemetry API{{< /nextlink >}}
    {{< nextlink href="/opentelemetry/instrument/dd_sdks/instrumentation_libraries/" >}}Use OpenTelemetry instrumentation libraries with the Datadog SDK{{< /nextlink >}}
    {{< nextlink href="/opentelemetry/config/environment_variable_support/" >}}Configure the Datadog SDK with OpenTelemetry SDK environment variables{{< /nextlink >}}
{{< /whatsnext >}}

### OpenTelemetry SDK

{{% opentelemetry/otel-sdks %}}

{{< whatsnext desc=" " >}}
    {{< nextlink href="https://opentelemetry.io/docs/languages/" >}}Use OpenTelemetry SDKs{{< /nextlink >}}
{{< /whatsnext >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://opentelemetry.io/docs/specs/otel/overview/#instrumentation-libraries
[2]: /opentelemetry/instrument/dd_sdks/
