---
title: Instrument Your Applications
description: Instrument applications with upstream OpenTelemetry SDKs or DDOT SDKs, Datadog's version of OpenTelemetry SDKs, using standard configuration and deployment tooling.
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

Datadog supports traces, metrics, and logs from upstream OpenTelemetry SDKs maintained by the OpenTelemetry project.

DDOT SDKs are Datadog's version of OpenTelemetry SDKs and are in Preview. They use OpenTelemetry APIs, Semantic Conventions, OTLP, standard configuration, and deployment tooling, and add Datadog-specific capabilities.

{{< whatsnext desc=" " >}}
    {{< nextlink href="/opentelemetry/instrument/upstream_otel_sdks/" >}}
    <h3>Using Upstream OTel SDKs</h3>
    Install SDKs maintained by the OpenTelemetry project and send traces, metrics, and logs to Datadog with OTLP. Use the OpenTelemetry Operator, application builds, or deployment automation.
    {{< /nextlink >}}
    {{< nextlink href="/opentelemetry/instrument/ddot_sdks/" >}}
    <h3>Using DDOT SDKs</h3>
    Deploy Datadog's version of OpenTelemetry SDKs with standard OpenTelemetry tooling. DDOT SDKs add capabilities such as Live Debugger, Dynamic Instrumentation, Database Monitoring, and Data Streams Monitoring. They are available for Java, .NET, Node.js, Python, and Go.
    {{< /nextlink >}}
{{< /whatsnext >}}

Both use standard OpenTelemetry configuration and deployment methods. You can switch SDK packages, auto-instrumentation images, or build-time instrumentation while keeping OpenTelemetry API instrumentation and standard configuration. Switching back to upstream SDKs retains OpenTelemetry telemetry; Datadog-specific capabilities are no longer available. Review [feature compatibility][1] for capability details and Datadog Agent requirements.

## Avoid duplicate instrumentation

Use one SDK per application process to avoid duplicate spans. On Kubernetes, use the OpenTelemetry Operator to deploy and configure the SDK. See the setup guide for your SDK for installation details.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /opentelemetry/compatibility/#feature-compatibility
