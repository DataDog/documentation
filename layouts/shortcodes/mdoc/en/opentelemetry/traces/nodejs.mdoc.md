<!--
This partial contains Node.js traces content for the OTel API.
It can be included directly in language-specific pages or wrapped in conditionals.
-->

## Setup

To instrument your application, initialize the Datadog tracer (`dd-trace`) and explicitly register its `TracerProvider` with the OpenTelemetry API. This ensures all OpenTelemetry calls are routed through Datadog.

1. **Add the dependencies**:
   ```sh
   npm install dd-trace @opentelemetry/api
   ```

2. **Initialize and register the tracer** in your application's entry file (for example, `index.js`), before any other imports:

### Complete example

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

Datadog combines these OpenTelemetry spans with other Datadog APM spans into a single trace of your application. It also supports [integration instrumentation][120] and [OpenTelemetry automatic instrumentation][121].

## Adding span tags

Add custom attributes to your spans to provide additional context:

```javascript
function processData(i, param1, param2) {
  return otelTracer.startActiveSpan(`processData:${i}`, (span) => {
    const result = someOperation(param1, param2);

    // Add an attribute to the span
    span.setAttribute('app.processedData', result.toString());
    span.end();
    return result;
    });
}
```

## Creating spans

To create a new span and properly close it, use the `startActiveSpan` method:

```javascript
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
```

## Adding span events

{% alert level="info" %}
Adding span events requires SDK version 5.17.0/4.41.0 or higher.
{% /alert %}

You can add span events using the `addEvent` API:

```javascript
span.addEvent('Event With No Attributes')
span.addEvent('Event With Some Attributes', {"int_val": 1, "string_val": "two", "int_array": [3, 4], "string_array": ["5", "6"], "bool_array": [true, false]})
```

Read the [OpenTelemetry specification for adding events][103] for more information.

### Recording exceptions

To record exceptions, use the `recordException` API:

```javascript
span.recordException(new TestError())
```

Read the [OpenTelemetry specification for recording exceptions][104] for more information.

## Filtering requests

In some cases, you may want to exclude certain requests from being instrumented, such as health checks or synthetic traffic. You can use the `blocklist` or `allowlist` option on the `http` plugin to ignore these requests.

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

Additionally, you can exclude traces based on their resource name to prevent the Agent from sending them to Datadog. For more information on security and fine-tuning Agent configurations, read the [Security][106] or [Ignoring Unwanted Resources][107] documentation.

[103]: https://opentelemetry.io/docs/specs/otel/trace/api/#add-events
[104]: https://opentelemetry.io/docs/specs/otel/trace/api/#record-exception
[106]: /tracing/security
[107]: /tracing/guide/ignoring_apm_resources/
[120]: /tracing/trace_collection/dd_libraries/nodejs#integration-instrumentation
[121]: https://opentelemetry.io/docs/instrumentation/js/automatic/
