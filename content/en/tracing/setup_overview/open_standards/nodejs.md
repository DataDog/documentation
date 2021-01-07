---
title: NodeJS Open Standards
kind: documentation
description: 'Open Standards for NodeJS'
code_lang: nodejs
type: multi-code-lang
code_lang_weight: 40
---

## OpenTracing

OpenTracing support is included in the `dd-trace` package.

```javascript
const tracer = require('dd-trace').init()
const opentracing = require('opentracing')

opentracing.initGlobalTracer(tracer)
```

The tracer can now be used like in any other OpenTracing application.

The following tags are available to override Datadog specific options:

* `service.name`: The service name to be used for the span. The service name from the tracer will be used if this is not provided.
* `resource.name`: The resource name to be used for the span. The operation name will be used if this is not provided.
* `span.type`: The span type to be used for the span. Will fallback to `custom` if not provided.

See [opentracing.io][1] for OpenTracing NodeJS usage.

## OpenTelemetry

OpenTelemetry support is available by using the `opentelemetry-exporter-datadog` package to export traces from OpenTelemetry to Datadog.

<div class="alert alert-warning">
This feature is currently in beta. <a href="https://docs.datadoghq.com/help/">Reach out to support</a> if it doesn't work as you expect.
</div>

### Installation

To install:

```
npm install --save opentelemetry-exporter-datadog
```

### Usage

Install the Datadog processor and exporter in your application and configure the options. Then use the OpenTelemetry interfaces to produce traces and other information:

```javascript
const opentelemetry = require('@opentelemetry/api');
const { BasicTracerProvider } = require('@opentelemetry/tracing');
const { DatadogSpanProcessor, DatadogExporter, DatadogProbabilitySampler, DatadogPropagator } = require('opentelemetry-exporter-datadog');

const provider = new BasicTracerProvider();

const exporterOptions = {
  serviceName: 'my-service', // optional
  agentUrl: 'http://localhost:8126', // optional
  tags: 'example_key:example_value,example_key_two:value_two', // optional
  env: 'production', // optional
  version: '1.0' // optional
};

const exporter = new DatadogExporter(exporterOptions);
const processor = new DatadogSpanProcessor(exporter);

provider.addSpanProcessor(processor);

// Next, add the Datadog Propagator for distributed tracing
provider.register({
  propagator: new DatadogPropagator()
});

const tracer = opentelemetry.trace.getTracer('example-basic-tracer-node');

// Create a span. A span must be closed.
const parentSpan = tracer.startSpan('main');

doWork(parentSpan);

setTimeout(() => {
  parentSpan.end();

  setTimeout(() => {
    processor.shutdown()
  },4000);
}, 5000);

function doWork(parent) {
  const span = tracer.startSpan('doWork', {
    parent,
  });

  // simulate some random work.
  for (let i = 0; i <= Math.floor(Math.random() * 40000000); i += 1) {
    // empty
  }
  // Set attributes to the span.
  span.setAttribute('key', 'value');
  setTimeout( () => {
    span.end();
  }, 1000)
}
```

### Configuration Options

The Datadog Agent URL and span tag values can be configured if necessary or desired based upon your environment and Agent location.

#### Datadog Agent URL

By default, the OpenTelemetry Datadog Exporter transmits traces to `http://localhost:8126`. Send traces to a different URL by configuring the following environment variables:

- `DD_TRACE_AGENT_URL`: The `<host>:<port>` where Datadog Agent listens for traces. For example, `agent-host:8126`.

You can override these values at the trace exporter level:

```js
// Configure the datadog trace agent url
new DatadogExporter({agentUrl: 'http://dd-agent:8126'});
```

#### Tagging

Configure the application to automatically tag your Datadog exported traces by setting the following environment variables:

- `DD_ENV`: Your application environment, for example, `production`, `staging`.
- `DD_SERVICE`: Your application's default service name, for example, `billing-api`.
- `DD_VERSION`: Your application version, for example, `2.5`, `202003181415`, or `1.3-alpha`.
- `DD_TAGS`: Custom tags in value pairs, separated by commas, for example, `layer:api,team:intake`.
- If `DD_ENV`, `DD_SERVICE`, or `DD_VERSION` is set, it will override any corresponding `env`, `service`, or `version` tag defined in `DD_TAGS`.
- If `DD_ENV`, `DD_SERVICE` and `DD_VERSION` are _not_ set, you can configure environment, service, and version by using corresponding tags in `DD_TAGS`.

Tag values can also be overridden at the trace exporter level. This lets you set values on a per-application basis, so you can have multiple applications reporting for different environments on the same host:

```javascript

new DatadogExporter({
  serviceName: 'my-service', // optional
  agentUrl: 'http://localhost:8126', // optional
  tags: 'example_key:example_value,example_key_two:value_two', // optional
  env: 'production', // optional
  version: '1.1' // optional
});
```

Tags that are set directly on individual spans supersede conflicting tags defined at the application level.

### OpenTelemetry Links

- See [npm][2] or [github][3] for more OpenTelemetry NodeJS Datadog Exporter usage.


[1]: https://opentracing.io/guides/javascript/
[2]: https://www.npmjs.com/package/opentelemetry-exporter-datadog
[3]: https://github.com/Datadog/dd-opentelemetry-exporter-js
