---
title: Custom Instrumentation of Python Applications with the OpenTelemetry API
kind: documentation
description: 'Instrument your Python application with OpenTelemetry API to send traces to Datadog.'
code_lang: python
type: multi-code-lang
code_lang_weight: 10
aliases:
- /tracing/trace_collection/otel_instrumentation/python/
further_reading:
    - link: 'tracing/glossary/'
      tag: 'Documentation'
      text: 'Explore your services, resources, and traces'
    - link: '/opentelemetry/guide/otel_api_tracing_interoperability'
      tag: 'Documentation'
      text: 'Interoperability of OpenTelemetry API and Datadog instrumented traces'
---

{{% otel-custom-instrumentation %}}

## Requirements and limitations

- Datadog python tracing library `dd-trace-py` version 1.12.0 or greater.
- Python version 3.7 or greater.

The following OpenTelemetry features implemented in the Datadog library as noted:

| Feature                               | Support notes                       |
|---------------------------------------|---------------------------------------|
| [OpenTelemetry Context propagation][1]         | [W3C Trace Context and Datadog header formats][9] are enabled by default. | 
| [Span processors][2]                  | Unsupported                                          | 
| [Span Exporters][3]                   | Unsupported                                            |
| Trace/span [ID generators][4]         | ID generation is performed by the tracing library, with support for [128-bit trace IDs][12].  |


## Configuring OpenTelemetry to use the Datadog Tracer Provider

1. Add your desired manual OpenTelemetry instrumentation to your Python code following the [OpenTelemetry Python Manual Instrumentation documentation][5]. **Important!** Where those instructions indicate that your code should call the OpenTelemetry SDK, call the Datadog tracing library instead.

2. Install the python tracer:

    ```
    pip install "ddtrace>=1.12.0"
    ```

3. Set `DD_TRACE_OTEL_ENABLED` environment variable to `True`.

4. Run your application with `ddtrace-run`. This automatically configures the `Datadog Tracer Provider`. If your application cannot use `ddtrace-run` read [the `dd-trace-py` OpenTelemetry API docs][11] for additional configurations.

Datadog combines these OpenTelemetry spans with other Datadog APM spans into a single trace of your application. It supports [OpenTelemetry Automatic instrumentation][8] also.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://opentelemetry.io/docs/instrumentation/python/manual/#change-the-default-propagation-format
[2]: https://opentelemetry.io/docs/reference/specification/trace/sdk/#span-processor
[3]: https://opentelemetry.io/docs/reference/specification/trace/sdk/#span-exporter
[4]: https://opentelemetry.io/docs/reference/specification/trace/sdk/#id-generators
[5]: https://opentelemetry.io/docs/instrumentation/python/manual/
[8]: https://opentelemetry.io/docs/instrumentation/python/automatic/
[9]: /tracing/trace_collection/trace_context_propagation/python/
[10]: /tracing/trace_collection/dd_libraries/python/#custom-logging
[11]: https://ddtrace.readthedocs.io/en/stable/api.html#opentelemetry-api
[12]: /opentelemetry/guide/otel_api_tracing_interoperability/