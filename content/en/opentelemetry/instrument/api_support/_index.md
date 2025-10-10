---
title: OpenTelemetry API Support
aliases:
  - /opentelemetry/interoperability/api_support
  - /opentelemetry/interoperability/otel_api_tracing_interoperability/
further_reading:
    - link: 'tracing/guide/instrument_custom_method'
      text: 'Instrument a custom method to get deep visibility into your business logic'
      tag: 'Documentation'
    - link: 'tracing/connect_logs_and_traces'
      text: 'Connect your Logs and Traces together'
      tag: 'Documentation'
    - link: 'tracing/visualization/'
      text: 'Explore your services, resources, and traces'
      tag: 'Documentation'
    - link: 'https://www.datadoghq.com/blog/opentelemetry-instrumentation/'
      text: 'Learn More about Datadog and the OpenTelemetry initiative'
      tag: 'Blog'
algolia:
  tags: ['otel custom instrumentation']
---

Datadog tracing libraries provide an implementation of the [OpenTelemetry API][1] for instrumenting your code. This means you can maintain vendor-neutral instrumentation of your services, while still taking advantage of Datadog's native implementation, features, and products. 

{{< img src="/opentelemetry/setup/otel-api-dd-sdk.png" alt="Diagram: OpenTelemetry API with DD tracing libraries sends data through OTLP protocol to the Datadog Agent, which forwards to Datadog's platform." style="width:100%;" >}}

**Note:** You can also send your OpenTelemetry API instrumented traces to Datadog using the [OTel Collector][7].

By [instrumenting your code with OpenTelemetry APIs][2], your code:

- Remains free of vendor-specific API calls.
- Does not depend on Datadog tracing libraries at compile time (only runtime).

Replace the OpenTelemetry SDK with the Datadog tracing library in the instrumented application, and the traces produced by your running code can be processed, analyzed, and monitored alongside Datadog traces and in Datadog proprietary products such as [Continuous Profiler][3], [Data Streams Monitoring][4], [App and API Protection][5], and [Live Processes][6].

To learn more, follow the link for your language:

{{< partial name="apm/otel-instrumentation.html" >}}

<br>

<div class="alert alert-info">To see which Datadog features are supported with this setup, see the <a href="/opentelemetry/compatibility/">feature compatibility table</a> under <b>OTel API with Datadog SDK and Agent</b>.</div>



## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://opentelemetry.io/docs/specs/otel/trace/api/
[2]: /tracing/trace_collection/otel_instrumentation/
[3]: /profiler/
[4]: /data_streams/
[5]: /security/application_security/
[6]: /infrastructure/process
[7]: /opentelemetry/setup/collector_exporter/