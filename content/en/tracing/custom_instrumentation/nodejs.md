---
title: NodeJS Custom Instrumentation
kind: documentation
aliases:
    - /tracing/opentracing/nodejs
    - /tracing/manual_instrumentation/nodejs
description: 'Manually instrument your NodeJS application to send custom traces to Datadog.'
further_reading:
    - link: 'tracing/connect_logs_and_traces'
      tag: 'Documentation'
      text: 'Connect your Logs and Traces together'
    - link: 'tracing/visualization/'
      tag: 'Documentation'
      text: 'Explore your services, resources, and traces'
---

<div class="alert alert-info">
If you have not yet read the instructions for auto-instrumentation and setup, please start with the <a href="https://docs.datadoghq.com/tracing/setup/nodejs/">NodeJS Setup Instructions</a>.
</div>

If you aren’t using supported library instrumentation (see [library compatibility][1]), you may want to manually instrument your code.

You may also want to extend the functionality of the `dd-trace` library or gain finer control over instrumenting your application. Several techniques are provided by the library to accomplish this.

## Creating Spans

The `dd-trace` library creates [spans][2] automatically with `tracer.init()` for [many libraries and frameworks][1]. However, you may want to gain visibility into your own code and this is achieved using spans.

Within your web request (for example, `/make-sandwich`), you may perform several operations, like `getIngredients()` and `assembleSandwich()`, which are useful to measure.

{{< tabs >}}
{{% tab "Synchronous" %}}

Synchronous code can be traced with `tracer.trace()` which will automatically finish the span when its callback returns and capture any thrown error automatically.

```javascript
app.get('/make-sandwich', (req, res) => {
  const sandwich = tracer.trace('sandwich.make', () => {
    const ingredients = tracer.trace('get_ingredients', () => {
      return getIngredients()
    })

    return tracer.trace('assemble_sandwich', () => {
      assembleSandwich(ingredients)
    })
  })

  res.end(sandwich)
})
```

API details for `tracer.trace()` can be found [here][1].


[1]: https://datadoghq.dev/dd-trace-js/interfaces/tracer.html#trace
{{% /tab %}}

{{% tab "Promises" %}}

Promises can be traced with `tracer.trace()` which will automatically finish the span when the returned promise resolves and capture any rejection error automatically.

```javascript
app.get('/make-sandwich', (req, res) => {
  return tracer.trace('sandwich.make', () => {
    return tracer.trace('get_ingredients', () => getIngredients())
      .then(() => {
        return tracer.trace('assemble_sandwich', () => {
          return assembleSandwich(ingredients)
        })
      })
  }).then(sandwich => res.end(sandwich))
})
```

API details for `tracer.trace()` can be found [here][1].


[1]: https://datadoghq.dev/dd-trace-js/interfaces/tracer.html#trace
{{% /tab %}}

{{% tab "Async/await" %}}

Async/await can be traced with `tracer.trace()` which will automatically finish the span when the returned promise resolves and capture any rejection error automatically.

```javascript
app.get('/make-sandwich', async (req, res) => {
  const sandwich = await tracer.trace('sandwich.make', async () => {
    const ingredients = await tracer.trace('get_ingredients', () => {
      return getIngredients()
    })

    return tracer.trace('assemble_sandwich', () => {
      return assembleSandwich(ingredients)
    })
  })

  res.end(sandwich)
})
```

API details for `tracer.trace()` can be found [here][1].


[1]: https://datadoghq.dev/dd-trace-js/interfaces/tracer.html#trace
{{% /tab %}}

{{% tab "Wrapper" %}}

It's also possible to wrap an existing function without changing its code. This is useful to trace functions for which you don't control the code. This can be done with `tracer.wrap()` which takes the same arguments as `tracer.trace()` except its last argument which is the function to wrap instead of a callback.

```javascript
app.get('/make-sandwich', (req, res) => {
  getIngredients = tracer.wrap('get_ingredients', getIngredients)
  assembleSandwich = tracer.wrap('assemble_sandwich', assembleSandwich)

  const sandwich = tracer.trace('sandwich.make', () => {
    const ingredients = getIngredients()

    return assembleSandwich(ingredients))
  })

  res.end(sandwich)
})
```

API details for `tracer.trace()` can be found [here][1].


[1]: https://datadoghq.dev/dd-trace-js/interfaces/tracer.html#wrap
{{% /tab %}}

{{% tab "Manual" %}}

If the other methods are still not enough to satisfy your tracing needs, a manual API is provided which allows you to start and finish spans however you may require:

```javascript
app.get('/make-sandwich', (req, res) => {
  const sandwichSpan = tracer.startSpan('sandwich.make')

  const ingredientsSpan = tracer.startSpan('get_ingredients')
  const ingredients = getIngredients()
  ingredientsSpan.finish()

  const assembleSpan = tracer.startSpan('assemble_sandwich')
  const assemble = assembleSandwich()
  assembleSpan.finish()

  sandwichSpan.finish()

  res.end(sandwich)
})
```

API details for `tracer.startSpan()` can be found [here][1].


[1]: https://datadoghq.dev/dd-trace-js/interfaces/tracer.html#startspan
{{% /tab %}}
{{< /tabs >}}

## Accessing active spans

The built-in instrumentation and your own custom instrumentation will create spans around meaningful operations. You can access the active span in order to include meaningful data. It's also possible to set the active span on a new scope by using the `activate` method of the scope manager.

```javascript
tracer.trace('sandwich.make', () => {
  const span = tracer.scope().active() // the sandwich.make span
  const child = tracer.startSpan('get_ingredients')

  tracer.scope().activate(child, () => {
    const span = tracer.scope().active() // the get_ingredients span
  })
})
```

API details for `Scope` can be found [here][3].

## Adding tags

{{< tabs >}}
{{% tab "Locally" %}}

Tags can be added to a span using the `setTag` or `addTags` method on a span. Supported value types are string, number and object.

```javascript
// add a foo:bar tag
span.setTag('foo', 'bar')

// add a user_id:5 tag
span.setTag('user_id', 5)

// add a obj.first:foo and obj.second:bar tags
span.setTag('obj', { first: 'foo', second: 'bar' })

// add a foo:bar and baz:qux tags
span.addTags({
  foo: 'bar',
  baz: 'qux'
})
```

{{% /tab %}}

{{% tab "Globally" %}}

Tags can be added to every span by configuring them directly on the tracer. This can be done with the comma-separated `DD_TAGS` environment variable or with the `tags` option on the tracer initialization.

```javascript
// equivalent to DD_TAGS=foo:bar,baz:qux
tracer.init({
  tags: {
    foo: 'bar',
    baz: 'qux'
  }
})

// this span will have the above tags
const span = tracer.startSpan()
```

{{% /tab %}}

{{% tab "Component" %}}

Some of our integrations support span hooks that can be used to update the span right before it's finished. This is useful to modify or add tags to a span that is otherwise inaccessible from your code.

```javascript
// at the top of the entry point right after tracer.init()
tracer.use('express', {
  // hook will be executed right before the request span is finished
  hooks: {
    request: (span, req, res) => {
      span.setTag('customer.id', req.query.customer_id)
    }
  }
})
```

API details for individual plugins can be found [here][1].


[1]: https://datadoghq.dev/dd-trace-js/modules/plugins.html
{{% /tab %}}

{{% tab "Errors" %}}

Errors can be added to a span with the special `error` tag that supports error objects. This will split the error in 3 different tags: `error.type`, `error.msg` and `error.stack`.

```javascript
try {
  getIngredients()
} catch (e) {
  span.setTag('error', e)
}

```

When using `tracer.trace()` or `tracer.wrap()` this is done automatically when an error is thrown.

{{% /tab %}}
{{< /tabs >}}

## Request filtering

In most applications, some of the requests should not be instrumented. A common case would be health checks. These can be ignored by using the `blacklist` or `whitelist` option on the `http` plugin.

```javascript
// at the top of the entry point right after tracer.init()
tracer.use('http', {
  blacklist: ['/health', '/ping']
})
```

Additionally, traces can also be discarded at the Datadog Agent hecks from reporting traces to Datadog.  This and other security and fine-tuning Agent configurations can be found on the [Security][4] page.

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

See [opentracing.io][5] for OpenTracing NodeJS usage.

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

- See [npm][6] or [github][7] for more OpenTelemetry NodeJS Datadog Exporter usage.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/compatibility_requirements/nodejs/
[2]: /tracing/visualization/#spans
[3]: https://datadoghq.dev/dd-trace-js/interfaces/scope.html
[4]: /tracing/security
[5]: https://opentracing.io/guides/javascript/
[6]: https://www.npmjs.com/package/opentelemetry-exporter-datadog
[7]: https://github.com/Datadog/dd-opentelemetry-exporter-js
