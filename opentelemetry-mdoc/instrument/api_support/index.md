---
title: OpenTelemetry API Support
description: Datadog, the leading service for cloud-scale monitoring.
breadcrumbs: >-
  Docs > OpenTelemetry in Datadog > Instrument Your Applications > OpenTelemetry
  API Support
---

# OpenTelemetry API Support

Datadog tracing libraries provide an implementation of the [OpenTelemetry API](https://opentelemetry.io/docs/specs/otel/trace/api/) for instrumenting your code. This means you can maintain vendor-neutral instrumentation of your services, while still taking advantage of Datadog's native implementation, features, and products.

{% image
   source="http://localhost:1313/images/opentelemetry/setup/otel-api-dd-sdk.18116c7846ecc6686abb7940964c4c5b.png?auto=format"
   alt="Diagram: OpenTelemetry API with DD tracing libraries sends data through OTLP protocol to the Datadog Agent, which forwards to Datadog's platform." /%}

**Note:** You can also send your OpenTelemetry API instrumented traces to Datadog using the [OTel Collector](http://localhost:1313/opentelemetry/setup/collector_exporter/).

By [instrumenting your code with OpenTelemetry APIs](http://localhost:1313/tracing/trace_collection/otel_instrumentation/), your code:

- Remains free of vendor-specific API calls.
- Does not depend on Datadog tracing libraries at compile time (only runtime).

Replace the OpenTelemetry SDK with the Datadog tracing library in the instrumented application, and the traces produced by your running code can be processed, analyzed, and monitored alongside Datadog traces and in Datadog proprietary products such as [Continuous Profiler](http://localhost:1313/profiler/), [Data Streams Monitoring](http://localhost:1313/data_streams/), [App and API Protection](http://localhost:1313/security/application_security/), and [Live Processes](http://localhost:1313/infrastructure/process).

To learn more, follow the link for your language:

- [Java](http://localhost:1313/opentelemetry/instrument/api_support/java)
- [Python](http://localhost:1313/opentelemetry/instrument/api_support/python)
- [Ruby](http://localhost:1313/opentelemetry/instrument/api_support/ruby)
- [go](http://localhost:1313/opentelemetry/instrument/api_support/go)
- [Node.js](http://localhost:1313/opentelemetry/instrument/api_support/nodejs)
- [PHP](http://localhost:1313/opentelemetry/instrument/api_support/php)
- [.Net](http://localhost:1313/opentelemetry/instrument/api_support/dotnet)

{% alert level="info" %}
To see which Datadog features are supported with this setup, see the [feature compatibility table](http://localhost:1313/opentelemetry/compatibility/) under OTel API with Datadog SDK and Agent.
{% /alert %}

## Further reading{% #further-reading %}

- [Instrument a custom method to get deep visibility into your business logic](http://localhost:1313/tracing/guide/instrument_custom_method)
- [Connect your Logs and Traces together](http://localhost:1313/tracing/connect_logs_and_traces)
- [Explore your services, resources, and traces](http://localhost:1313/tracing/visualization/)
- [Learn More about Datadog and the OpenTelemetry initiative](https://www.datadoghq.com/blog/opentelemetry-instrumentation/)
