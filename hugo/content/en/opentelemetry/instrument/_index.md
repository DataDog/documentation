---
title: Instrument Your Applications
description: "Choose an SDK to instrument your applications with OpenTelemetry: a Datadog SDK, set up as a DDOT SDK or with the Datadog Agent, or an OpenTelemetry SDK."
aliases:
    - /opentelemetry/guide/otel_api_tracing_interoperability
further_reading:
    - link: 'https://opentelemetry.io/docs/concepts/instrumentation/'
      text: 'OpenTelemetry Instrumentation'
      tag: 'External Site'
---

## Overview

Choose the SDK that instruments your application. Both options support the OpenTelemetry API. Support varies by language and signal. See [OpenTelemetry API Support][4].

| SDK | Sends data to | Best for |
|---|---|---|
| [DDOT SDKs](#ddot-sdks) | Your OpenTelemetry Collector (Preview), or the Datadog Agent | Teams that want Datadog to build and support their SDK |
| [OpenTelemetry SDKs](#opentelemetry-sdks) | Your OpenTelemetry Collector, the Datadog Agent, or the Datadog OTLP intake | Teams that use only OpenTelemetry project components |

To check which Datadog features each setup supports, see [Feature Compatibility][3].

## DDOT SDKs

A Datadog SDK sends data in one of two ways:

- **As a DDOT SDK** (Preview): A Datadog OpenTelemetry (DDOT) SDK is the Datadog SDK for your language, set to send OpenTelemetry data to your Collector. On Kubernetes, the OpenTelemetry Operator injects it into your pods.
- **With the Datadog Agent**: The Datadog SDK sends data to the Datadog Agent, and you add custom instrumentation with the OpenTelemetry API.

{{< whatsnext desc=" " >}}
    {{< nextlink href="/opentelemetry/instrument/dd_sdks/" >}}Set up DDOT SDKs{{< /nextlink >}}
    {{< nextlink href="/opentelemetry/instrument/dd_sdks/api_support" >}}Use the Datadog SDK with the OpenTelemetry API{{< /nextlink >}}
{{< /whatsnext >}}

For all Datadog SDK pages, including instrumentation libraries and environment variables, see [DDOT SDKs][2].

## OpenTelemetry SDKs

{{% opentelemetry/otel-sdks %}}

{{< whatsnext desc=" " >}}
    {{< nextlink href="/opentelemetry/instrument/otel_sdks/" >}}Use OpenTelemetry SDKs with Datadog{{< /nextlink >}}
{{< /whatsnext >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[2]: /opentelemetry/instrument/dd_sdks/
[3]: /opentelemetry/compatibility/
[4]: /opentelemetry/instrument/dd_sdks/api_support/
