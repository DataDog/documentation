---
title: Instrument Your Applications
description: Datadog, the leading service for cloud-scale monitoring.
breadcrumbs: Docs > OpenTelemetry in Datadog > Instrument Your Applications
---

# Instrument Your Applications

## Overview{% #overview %}

Datadog supports several approaches for instrumenting your applications with OpenTelemetry. Choose the method that best fits your needs:

### OpenTelemetry SDK{% #opentelemetry-sdk %}

You can fully instrument your applications with OpenTelemetry SDKs. These SDKs provide complete implementations for creating traces, metrics, and logs in the OpenTelemetry format, which can then be sent to Datadog.

{% alert level="info" %}
If you instrument your applications fully with OTel, some Datadog features are not supported. For more information, see the [Feature Compatibility](http://localhost:1313/opentelemetry/compatibility/) table.
{% /alert %}

- [Use OpenTelemetry SDKs](https://opentelemetry.io/docs/languages/)

### OpenTelemetry API and Datadog SDK{% #opentelemetry-api-and-datadog-sdk %}

Integrating Datadog with OpenTelemetry allows you to use Datadog's comprehensive observability platform while leveraging OpenTelemetry's vendor-agnostic instrumentation. This allows you to collect, visualize, and analyze traces from your applications and infrastructure.

Use the OpenTelemetry Tracing APIs with Datadog's SDK to maintain vendor-neutral instrumentation while accessing Datadog's full feature set.

- [Use the Datadog SDK with OpenTelemetry API](http://localhost:1313/opentelemetry/instrument/api_support)
- [Configure the Datadog SDK with OpenTelemetry SDK environment variables](http://localhost:1313/opentelemetry/config/environment_variable_support/)

### OpenTelemetry instrumentation libraries{% #opentelemetry-instrumentation-libraries %}

Extend your observability with OpenTelemetry [instrumentation libraries](https://opentelemetry.io/docs/specs/otel/overview/#instrumentation-libraries) alongside Datadog's SDK.

Datadog supports OpenTelemetry-compatible instrumentation libraries which provide observability for frameworks and technologies not covered by Datadog's native SDKs. This allows you to instrument additional frameworks and libraries while still sending data to Datadog's backend.

- [Use OpenTelemetry Instrumentation Libraries with the Datadog SDK](http://localhost:1313/opentelemetry/instrument/instrumentation_libraries/)

## Further reading{% #further-reading %}

- [OpenTelemetry Instrumentation](https://opentelemetry.io/docs/concepts/instrumentation/)
