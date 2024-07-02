---
title: Node.js Custom Instrumentation using OpenTelemetry API
kind: documentation
description: 'Instrument your Node.js application with OpenTelemetry API to send traces to Datadog.'
code_lang: otel
type: multi-code-lang
code_lang_weight: 2
aliases:
- /tracing/trace_collection/otel_instrumentation/nodejs/
- /tracing/trace_collection/custom_instrumentation/otel_instrumentation/nodejs
further_reading:
    - link: tracing/glossary/
      tag: Documentation
      text: Explore your services, resources, and traces
    - link: /opentelemetry/guide/otel_api_tracing_interoperability
      tag: Documentation
      text: Interoperability of OpenTelemetry API and Datadog instrumented traces
---

{{% otel-custom-instrumentation-lang %}}


## Setup

To configure OpenTelemetry to use the Datadog trace provider:

1. Add your desired manual OpenTelemetry instrumentation to your Node.js code following the [OpenTelemetry Node.js Manual Instrumentation documentation][1]. **Note**: Where those instructions indicate that your code should call the OpenTelemetry SDK, call the Datadog tracing library instead.

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

6. Import the OpenTelemetry API and create an OpenTelemetry tracer instance:

    ```js
    const ot = require('@opentelemetry/api')
    const otelTracer = ot.trace.getTracer(
      'my-service'
    )
    ```

7. Run your application.

Datadog combines these OpenTelemetry spans with other Datadog APM spans into a single trace of your application. It also supports [integration instrumentation][2] and [OpenTelemetry automatic instrumentation][3].

## Adding span tags

Add custom attributes to your spans to provide additional context:

{{< highlight js "hl_lines=6" >}}
function processData(i, param1, param2) {
  return tracer.startActiveSpan(`processData:${i}`, (span) => {
    const result = someOperation(param1, param2);

    // Add an attribute to the span
    span.setAttribute('app.processedData', result.toString());

    span.end();
    return result;
    });
}
{{< /highlight >}}

## Creating spans

To create a new span and properly close it, use the `startActiveSpan` method:

{{< highlight js "hl_lines=3 9" >}}
function performTask(iterations, param1, param2) {
  // Create a span. A span must be closed.
  return tracer.startActiveSpan('performTask', (span) => {
    const results = [];
    for (let i = 0; i < iterations; i++) {
      results.push(processData(i, param1, param2));
    }
    // Be sure to end the span!
    span.end();
    return results;
  });
}
{{< /highlight >}}

## Filtering requests

In some cases, you may want to exclude certain requests from being instrumented, such as health checks or synthetic traffic. You can use the `blocklist` or `allowlist` option on the `http` plugin to ignore these requests.

To exclude requests at the application level, add the following after initializing the tracer:

```javascript
// at the top of the entry point right after tracer.init()
tracer.use('http', {
  blocklist: ['/health', '/ping']
})
```

You can also split the configuration between client and server if needed:

```javascript
tracer.use('http', {
  server: {
    blocklist: ['/ping']
  }
})
```

Additionally, you can exclude traces based on their resource name to prevent the Agent from sending them to Datadog. For more information on security and fine-tuning Agent configurations, read the [Security][4] or [Ignoring Unwanted Resources][5].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://opentelemetry.io/docs/instrumentation/js/instrumentation/
[2]: /tracing/trace_collection/dd_libraries/nodejs#integration-instrumentation
[3]: https://opentelemetry.io/docs/instrumentation/js/automatic/
[4]: /tracing/security
[5]: /tracing/guide/ignoring_apm_resources/
