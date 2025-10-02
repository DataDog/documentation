---
title: Node.js Custom Instrumentation using the OpenTelemetry API
description: Datadog, the leading service for cloud-scale monitoring.
breadcrumbs: >-
  Docs > OpenTelemetry in Datadog > Instrument Your Applications > OpenTelemetry
  API Support > Node.js Custom Instrumentation using the OpenTelemetry API
sourceUrl: >-
  https://docs.datadoghq.com/opentelemetry/instrument/api_support/nodejs/index.html
---

# Node.js Custom Instrumentation using the OpenTelemetry API

{% alert level="info" %}
Unsure when to use OpenTelemetry with Datadog? Start with [Custom Instrumentation with the OpenTelemetry API](https://docs.datadoghq.com/tracing/trace_collection/custom_instrumentation/otel_instrumentation/) to learn more.
{% /alert %}

## Overview{% #overview %}

There are a few reasons to manually instrument your applications with the OpenTelemetry API:

- You are not using Datadog [supported library instrumentation](https://docs.datadoghq.com/tracing/trace_collection/compatibility/).
- You want to extend the `ddtrace` library's functionality.
- You need finer control over instrumenting your applications.

The `ddtrace` library provides several techniques to help you achieve these goals. The following sections demonstrate how to use the OpenTelemetry API for custom instrumentation to use with Datadog.

## Setup{% #setup %}

To configure OpenTelemetry to use the Datadog trace provider:

1. Add your desired manual OpenTelemetry instrumentation to your Node.js code following the [OpenTelemetry Node.js Manual Instrumentation documentation](https://opentelemetry.io/docs/instrumentation/js/instrumentation/). **Note**: Where those instructions indicate that your code should call the OpenTelemetry SDK, call the Datadog tracing library instead.

1. Add the `dd-trace` module to your package.json:

   ```sh
   npm install dd-trace
   ```

1. Initialize the `dd-trace` module in your application:

   ```js
   const tracer = require('dd-trace').init({
     // ...
   })
   ```

1. Get `TracerProvider` from `tracer`:

   ```js
   const { TracerProvider } = tracer
   ```

1. Construct and register a `TracerProvider`:

   ```js
   const provider = new TracerProvider()
   provider.register()
   ```

1. Import the OpenTelemetry API and create an OpenTelemetry tracer instance:

   ```js
   const ot = require('@opentelemetry/api')
   const otelTracer = ot.trace.getTracer(
     'my-service'
   )
   ```

1. Run your application.

Datadog combines these OpenTelemetry spans with other Datadog APM spans into a single trace of your application. It also supports [integration instrumentation](https://docs.datadoghq.com/tracing/trace_collection/dd_libraries/nodejs#integration-instrumentation) and [OpenTelemetry automatic instrumentation](https://opentelemetry.io/docs/instrumentation/js/automatic/).

## Adding span tags{% #adding-span-tags %}

Add custom attributes to your spans to provide additional context:

```js
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

## Creating spans{% #creating-spans %}

To create a new span and properly close it, use the `startActiveSpan` method:

```js
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

## Adding span events{% #adding-span-events %}

{% alert level="info" %}
Adding span events requires SDK version 5.17.0/4.41.0 or higher.
{% /alert %}

You can add span events using the `addEvent` API. This method requires a `name` parameter and optionally accepts `attributes` and `timestamp` parameters. The method creates a new span event with the specified properties and associates it with the corresponding span.

- **Name** [*required*]: A string representing the event's name.
- **Attributes** [*optional*]: Zero or more key-value pairs with the following properties:
  - The key must be a non-empty string.
  - The value can be either:
    - A primitive type: string, Boolean, or number.
    - A homogeneous array of primitive type values (for example, an array of strings).
  - Nested arrays and arrays containing elements of different data types are not allowed.
- **Timestamp** [*optional*]: A UNIX timestamp representing the event's occurrence time. Expects a `TimeInput` object.

The following examples demonstrate different ways to add events to a span:

```js
span.addEvent('Event With No Attributes')
span.addEvent('Event With Some Attributes', {"int_val": 1, "string_val": "two", "int_array": [3, 4], "string_array": ["5", "6"], "bool_array": [true, false]})
```

Read the [OpenTelemetry](https://opentelemetry.io/docs/specs/otel/trace/api/#add-events) specification for more information.

### Recording exceptions{% #recording-exceptions %}

To record exceptions, use the `recordException` API. This method requires an `exception` parameter and optionally accepts a UNIX `timestamp` parameter. It creates a new span event that includes standardized exception attributes and associates it with the corresponding span.

The following examples demonstrate different ways to record exceptions:

```js
span.recordException(new TestError())
```

Read the [OpenTelemetry](https://opentelemetry.io/docs/specs/otel/trace/api/#record-exception) specification for more information.

## Filtering requests{% #filtering-requests %}

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

Additionally, you can exclude traces based on their resource name to prevent the Agent from sending them to Datadog. For more information on security and fine-tuning Agent configurations, read the [Security](https://docs.datadoghq.com/tracing/security) or [Ignoring Unwanted Resources](https://docs.datadoghq.com/tracing/guide/ignoring_apm_resources/).

## Further Reading{% #further-reading %}

- [Explore your services, resources, and traces](https://docs.datadoghq.com/tracing/glossary/)
- [Interoperability of OpenTelemetry API and Datadog instrumented traces](https://docs.datadoghq.com/opentelemetry/guide/otel_api_tracing_interoperability)
