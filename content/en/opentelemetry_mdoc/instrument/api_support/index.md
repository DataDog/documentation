---
title: OpenTelemetry API Support
description: Datadog, the leading service for cloud-scale monitoring.
breadcrumbs: >-
  Docs > OpenTelemetry in Datadog > Instrument Your Applications > OpenTelemetry
  API Support
sourceUrl: https://docs.datadoghq.com/opentelemetry/instrument/api_support/index.html
---

# OpenTelemetry API Support

Datadog tracing libraries provide an implementation of the [OpenTelemetry API](https://opentelemetry.io/docs/specs/otel/trace/api/) for instrumenting your code. This means you can maintain vendor-neutral instrumentation of your services, while still taking advantage of Datadog's native implementation, features, and products.

{% image
   source="https://datadog-docs.imgix.net/images/opentelemetry/setup/otel-api-dd-sdk.18116c7846ecc6686abb7940964c4c5b.png?auto=format"
   alt="Diagram: OpenTelemetry API with DD tracing libraries sends data through OTLP protocol to the Datadog Agent, which forwards to Datadog's platform." /%}

**Note:** You can also send your OpenTelemetry API instrumented traces to Datadog using the [OTel Collector](https://docs.datadoghq.com/opentelemetry/setup/collector_exporter/).

By [instrumenting your code with OpenTelemetry APIs](https://docs.datadoghq.com/tracing/trace_collection/otel_instrumentation/), your code:

- Remains free of vendor-specific API calls.
- Does not depend on Datadog tracing libraries at compile time (only runtime).

Replace the OpenTelemetry SDK with the Datadog tracing library in the instrumented application, and the traces produced by your running code can be processed, analyzed, and monitored alongside Datadog traces and in Datadog proprietary products such as [Continuous Profiler](https://docs.datadoghq.com/profiler/), [Data Streams Monitoring](https://docs.datadoghq.com/data_streams/), [App and API Protection](https://docs.datadoghq.com/security/application_security/), and [Live Processes](https://docs.datadoghq.com/infrastructure/process).

To learn more, follow the link for your language:

- [Java](https://docs.datadoghq.com/opentelemetry/instrument/api_support/java)
- [Python](https://docs.datadoghq.com/opentelemetry/instrument/api_support/python)
- [Ruby](https://docs.datadoghq.com/opentelemetry/instrument/api_support/ruby)
- [go](https://docs.datadoghq.com/opentelemetry/instrument/api_support/go)
- [Node.js](https://docs.datadoghq.com/opentelemetry/instrument/api_support/nodejs)
- [PHP](https://docs.datadoghq.com/opentelemetry/instrument/api_support/php)
- [.Net](https://docs.datadoghq.com/opentelemetry/instrument/api_support/dotnet)

{% alert level="info" %}
To see which Datadog features are supported with this setup, see the [feature compatibility table](https://docs.datadoghq.com/opentelemetry/compatibility/) under OTel API with Datadog SDK and Agent.
{% /alert %}

## Further reading{% #further-reading %}

- [Instrument a custom method to get deep visibility into your business logic](https://docs.datadoghq.com/tracing/guide/instrument_custom_method)
- [Connect your Logs and Traces together](https://docs.datadoghq.com/tracing/connect_logs_and_traces)
- [Explore your services, resources, and traces](https://docs.datadoghq.com/tracing/visualization/)
- [Learn More about Datadog and the OpenTelemetry initiative](https://www.datadoghq.com/blog/opentelemetry-instrumentation/)
