---
title: Node.js Custom Instrumentation using the OpenTelemetry API
description: 'Instrument your Node.js application with the OpenTelemetry API to send traces to Datadog.'
code_lang: otel
type: multi-code-lang
code_lang_weight: 1
aliases:
- /tracing/trace_collection/otel_instrumentation/nodejs/
- /tracing/trace_collection/custom_instrumentation/otel_instrumentation/nodejs
further_reading:
    - link: 'tracing/glossary/'
      tag: 'Documentation'
      text: 'Explore your services, resources, and traces'
    - link: '/opentelemetry/guide/otel_api_tracing_interoperability'
      tag: 'Documentation'
      text: 'Interoperability of OpenTelemetry API and Datadog instrumented traces'
---

{{% otel-custom-instrumentation-lang %}}


## Setup

To instrument your application, initialize the Datadog tracer (`dd-trace`) and explicitly register its `TracerProvider` with the OpenTelemetry API. This ensures all OpenTelemetry calls are routed through Datadog.

1. **Add the dependencies**
Install the required packages to your project:
  ```sh
  npm install dd-trace @opentelemetry/api
  ```
2. **Initialize and register the tracer**
In your application's entry file (for example, `index.js`), before any other imports, add the setup code. This involves importing `dd-trace`, initializing it, creating a `TracerProvider` from the main module, and registering it.

### Complete example

This complete example shows the required setup in your application's entry file.

```javascript
// 1. Import the dd-trace library (do not initialize it yet)
const ddtrace = require('dd-trace');

// 2. Initialize the Datadog tracer. This must be the first operation.
const tracer = ddtrace.init({
  // service: 'my-nodejs-app'
  // ... other Datadog configurations
});

// 3. Create and register Datadog's TracerProvider.
const provider = new tracer.TracerProvider();
provider.register(); // This wires the @opentelemetry/api to Datadog

// 4. Import and use the OpenTelemetry API
const otel = require('@opentelemetry/api');
const otelTracer = otel.trace.getTracer(
  'my-custom-instrumentation' // A name for your specific instrumentation
);

// You can now use 'otelTracer' to create spans throughout your application.
```

Datadog combines these OpenTelemetry spans with other Datadog APM spans into a single trace of your application. It also supports [integration instrumentation][2] and [OpenTelemetry automatic instrumentation][3].

## Adding span tags

Add custom attributes to your spans to provide additional context:

{{< highlight js "hl_lines=6" >}}
function processData(i, param1, param2) {
  return otelTracer.startActiveSpan(`processData:${i}`, (span) => {
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
  return otelTracer.startActiveSpan('performTask', (span) => {
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

## Adding span events

<div class="alert alert-info">Adding span events requires SDK version 5.17.0/4.41.0 or higher.</div>

You can add span events using the `addEvent` API. This method requires a `name` parameter and optionally accepts `attributes` and `timestamp` parameters. The method creates a new span event with the specified properties and associates it with the corresponding span.

- **Name** [_required_]: A string representing the event's name.
- **Attributes** [_optional_]: Zero or more key-value pairs with the following properties:
  - The key must be a non-empty string.
  - The value can be either:
    - A primitive type: string, Boolean, or number.
    - A homogeneous array of primitive type values (for example, an array of strings).
  - Nested arrays and arrays containing elements of different data types are not allowed.
- **Timestamp** [_optional_]: A UNIX timestamp representing the event's occurrence time. Expects a `TimeInput` object.

The following examples demonstrate different ways to add events to a span:

```js
span.addEvent('Event With No Attributes')
span.addEvent('Event With Some Attributes', {"int_val": 1, "string_val": "two", "int_array": [3, 4], "string_array": ["5", "6"], "bool_array": [true, false]})
```

Read the [OpenTelemetry][6] specification for more information.

### Recording exceptions

To record exceptions, use the `recordException` API. This method requires an `exception` parameter and optionally accepts a UNIX `timestamp` parameter. It creates a new span event that includes standardized exception attributes and associates it with the corresponding span.

The following examples demonstrate different ways to record exceptions:

```js
span.recordException(new TestError())
```

Read the [OpenTelemetry][7] specification for more information.

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
[6]: https://opentelemetry.io/docs/specs/otel/trace/api/#add-events
[7]: https://opentelemetry.io/docs/specs/otel/trace/api/#record-exception
