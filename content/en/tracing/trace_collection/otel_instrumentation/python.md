---
title: Custom Instrumentation of Python Applications with the OpenTelemetry API
kind: documentation
description: 'Instrument your Python application with OTel API to send traces to Datadog.'
code_lang: python
type: multi-code-lang
code_lang_weight: 10
further_reading:
    - link: 'tracing/glossary/'
      tag: 'Documentation'
      text: 'Explore your services, resources, and traces'
---

{{% otel-custom-instrumentation %}}

## Requirements and limitations

- Datadog python tracing library `dd-trace-py` version 1.12.0 or greater
- Python version 3.7 or greater

The following OTel features implemented in the Datadog library as noted:

| Feature                               | Support notes                       |
|---------------------------------------|-------------|-----------------------------|
| [OTel Context propagation][1]         | [Datadog distributed header format][9] is used instead. | 
| [Span processors][2]                  | Unsupported                                          | 
| [Span Exporters][3]                   | Unsupported                                            |
| Trace/span [ID generators][4]         | ID generation is performed by `ddtrace`.           |


## Configuring OTel to use the Datadog Tracer Provider

1. Add your desired manual OTel instrumentation to your Python code following the [OTel Python Manual Instrumentation documentation][5].
2. Install the python tracer:

    ```
    pip install "ddtrace>=1.12.0"
    ```

3. Set `DD_TRACE_OTEL_ENABLED` enviornment variable to `True`.
4. Run your application with `ddtrace-run`. This will automatically configure the `Datadog Tracer Provider`. If your application can not use `ddttrace-run` refer to the following [doc][11] for additional configurations.

Datadog combines these OpenTelemetry spans with other Datadog APM spans into a single trace of your application. It supports [OpenTelemetry Automatic instrumentation][8] also.


[1]: https://opentelemetry.io/docs/instrumentation/python/manual/#change-the-default-propagation-format
[2]: https://opentelemetry.io/docs/reference/specification/trace/sdk/#span-processor
[3]: https://opentelemetry.io/docs/reference/specification/trace/sdk/#span-exporter
[4]: https://opentelemetry.io/docs/reference/specification/trace/sdk/#id-generators
[5]: https://opentelemetry.io/docs/instrumentation/python/manual/
[8]: https://opentelemetry.io/docs/instrumentation/python/automatic/
[9]: /tracing/trace_collection/trace_context_propagation/python/
[10]: /tracing/trace_collection/dd_libraries/python/#custom-logging
[11]: https://ddtrace.readthedocs.io/en/stable/api.html##opentelemetry-api
