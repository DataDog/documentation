---
title: Custom Instrumentation of Node.js Applications with the OpenTelemetry API
kind: documentation
description: 'Instrument your Node.js application with OpenTelemetry API to send traces to Datadog.'
code_lang: nodejs
type: multi-code-lang
code_lang_weight: 40
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

<!-- TODO: version needs to corrected after release -->
- Datadog Node.js tracing library `dd-trace` version 4.2.0+, 3.23.0+, or v2.36.0+.

The following OpenTelemetry features implemented in the Datadog library as noted:

| Feature                               | Support notes                       |
|---------------------------------------|--------------------------------------|
| [OpenTelemetry Context propagation][1]         | [Datadog and W3C Trace Context header formats][9] are enabled by default. | 
| [Span processors][2]                  | Unsupported                                          | 
| [Span Exporters][3]                   | Unsupported                                            |
| Trace/span [ID generators][4]         | ID generation is performed by the tracing library, with support for [128-bit trace IDs][12].   |


## Configuring OpenTelemetry to use the Datadog tracing library

1. Add your desired manual OpenTelemetry instrumentation to your Node.js code following the [OpenTelemetry Node.js Manual Instrumentation documentation][5]. **Important!** Where those instructions indicate that your code should call the OpenTelemetry SDK, call the Datadog tracing library instead.

2. Add the `dd-trace` module to your package.json:

    ```sh
    npm install dd-trace
    ```

3. Initialize the `dd-trace` module in your application:

    ```js
    const tracer = require('dd-trace').init({
      // ...
    })
    ```

4. Get `TracerProvider` from `tracer`:

    ```js
    const { TracerProvider } = tracer
    ```

5. Construct and register a `TracerProvider`:

    ```js
    const provider = new TracerProvider()
    provider.register()
    ```

6. Run your application.

Datadog combines these OpenTelemetry spans with other Datadog APM spans into a single trace of your application. It supports [integration instrumentation][7] and [OpenTelemetry Automatic instrumentation][8] also.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://opentelemetry.io/docs/instrumentation/js/propagation/
[2]: https://opentelemetry.io/docs/reference/specification/trace/sdk/#span-processor
[3]: https://opentelemetry.io/docs/reference/specification/trace/sdk/#span-exporter
[4]: https://opentelemetry.io/docs/reference/specification/trace/sdk/#id-generators
[5]: https://opentelemetry.io/docs/instrumentation/js/instrumentation/
[6]: /tracing/trace_collection/dd_libraries/nodejs/#additional-configuration
[7]: /tracing/trace_collection/dd_libraries/nodejs#integration-instrumentation
[8]: https://opentelemetry.io/docs/instrumentation/js/automatic/
[9]: /tracing/trace_collection/trace_context_propagation/nodejs/
[10]: /tracing/trace_collection/dd_libraries/nodejs/#custom-logging
[12]: /opentelemetry/guide/otel_api_tracing_interoperability/