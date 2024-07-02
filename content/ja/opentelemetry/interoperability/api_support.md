---
title: OpenTelemetry API Support
further_reading:
    - link: tracing/guide/instrument_custom_method
      text: Instrument a custom method to get deep visibility into your business logic
    - link: tracing/connect_logs_and_traces
      text: Connect your Logs and Traces together
    - link: tracing/visualization/
      text: Explore your services, resources, and traces
    - link: "https://www.datadoghq.com/blog/opentelemetry-instrumentation/"
      text: Learn More about Datadog and the OpenTelemetry initiative
algolia:
  tags: [otel custom instrumentation]
---

Datadog tracing libraries provide an implementation of the OpenTelemetry API for instrumenting your code. This means you can maintain vendor-neutral instrumentation of all your services, while still taking advantage of Datadog's native implementation, features, and products. You can configure it to generate Datadog-style spans and traces to be processed by the Datadog tracing library for your language, and send those to Datadog.

To learn more, follow the link for your language:

{{< partial name="apm/otel-instrumentation.html" >}}

<br>

## Further reading

{{< partial name="whats-next/whats-next.html" >}}