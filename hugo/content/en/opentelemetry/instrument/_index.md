---
title: Instrument Your Applications
description: Instrument applications with OpenTelemetry. DDOT SDKs, Datadog's version of OpenTelemetry SDKs, add Datadog-specific capabilities and support, using standard OpenTelemetry configuration and tooling.
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

DDOT SDKs are Datadog's version of OpenTelemetry SDKs and are in Preview. They use OpenTelemetry APIs, Semantic Conventions, OTLP, standard configuration, and deployment tooling, and add Datadog-specific capabilities.

Datadog supports traces, metrics, and logs from upstream OpenTelemetry SDKs, which are maintained and supported by the OpenTelemetry community. Use upstream OpenTelemetry SDKs if your organization's policy allows only upstream OpenTelemetry components.

Run one SDK per application process to avoid duplicate instrumentation.

{{< whatsnext desc=" " >}}
    {{< nextlink href="/opentelemetry/instrument/ddot_sdks/" >}}
    <h3>Using DDOT SDKs</h3>
    Deploy Datadog's version of OpenTelemetry SDKs with standard OpenTelemetry tooling. DDOT SDKs add capabilities such as Live Debugger, Dynamic Instrumentation, Database Monitoring, and Data Streams Monitoring. They are available for Java, .NET, Node.js, Python, and Go.
    {{< /nextlink >}}
    {{< nextlink href="/opentelemetry/instrument/upstream_otel_sdks/" >}}
    <h3>Using Upstream OpenTelemetry SDKs</h3>
    Install SDKs maintained and supported by the OpenTelemetry community and send traces, metrics, and logs to Datadog with OTLP. Use the OpenTelemetry Operator, application builds, or deployment automation.
    {{< /nextlink >}}
{{< /whatsnext >}}

Both use standard OpenTelemetry configuration and deployment methods. You can switch SDK packages, auto-instrumentation images, or build-time instrumentation while keeping OpenTelemetry API instrumentation and standard configuration. Switching back to upstream SDKs retains OpenTelemetry telemetry; Datadog-specific capabilities are no longer available. Review [feature compatibility][1] for capability details and Datadog Agent requirements.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /opentelemetry/compatibility/#feature-compatibility
