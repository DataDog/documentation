---
title: Instrument Your Applications
description: Choose an OpenTelemetry instrumentation approach and learn how to deploy it without creating duplicate telemetry.
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

Datadog supports upstream OpenTelemetry SDKs maintained by the OpenTelemetry project and Datadog OpenTelemetry SDKs (DDOT SDKs) maintained by Datadog. Both use OpenTelemetry APIs, Semantic Conventions, configuration, and OTLP.

Choose one OpenTelemetry SDK approach for each application process to avoid duplicate instrumentation and spans.

{{< whatsnext desc=" " >}}
    {{< nextlink href="/opentelemetry/instrument/upstream_otel_sdks/" >}}
    <h3>Using Upstream OpenTelemetry SDKs</h3>
    Choose this approach for the upstream release life cycle and community-maintained instrumentation. Export telemetry to Datadog with OTLP through a Collector, the Datadog Agent, or a supported direct-ingestion path.
    {{< /nextlink >}}
    {{< nextlink href="/opentelemetry/instrument/ddot_sdks/" >}}
    <h3>Using Datadog OpenTelemetry SDKs</h3>
    Choose this approach for Datadog-maintained instrumentation and Datadog-specific capabilities such as Live Debugger, Dynamic Instrumentation, Database Monitoring, and Data Streams Monitoring. DDOT SDKs use OpenTelemetry APIs, Semantic Conventions, OTLP, and standard OpenTelemetry configuration and deployment tooling. They are available for Java, .NET, Node.js, Python, and Go.
    {{< /nextlink >}}
{{< /whatsnext >}}

The implementations differ in release life cycle, deployment details, and feature support. Review the [feature compatibility table][1] before choosing or changing an SDK.

## Avoid duplicate instrumentation

Use one SDK per application process to avoid duplicate spans. On Kubernetes, use the OpenTelemetry Operator to deploy and configure the SDK. See the setup guide for your SDK for installation details.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /opentelemetry/compatibility/#feature-compatibility
