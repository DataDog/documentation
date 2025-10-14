---
title: Node.js Custom Instrumentation using the Datadog API
aliases:
    - /tracing/opentracing/nodejs
    - /tracing/manual_instrumentation/nodejs
    - /tracing/custom_instrumentation/nodejs
    - /tracing/setup_overview/custom_instrumentation/nodejs
    - /tracing/trace_collection/custom_instrumentation/nodejs
    - /tracing/trace_collection/custom_instrumentation/dd_libraries/nodejs
description: 'Manually instrument your Node.js application to send custom traces to Datadog.'
code_lang: dd-api
code_lang_weight: 1
type: multi-code-lang
further_reading:
    - link: "/tracing/trace_collection/trace_context_propagation/"
      tag: "Documentation"
      text: "Propagating trace context"
    - link: 'tracing/other_telemetry/connect_logs_and_traces'
      tag: 'Documentation'
      text: 'Connect your Logs and Traces together'
    - link: 'tracing/glossary/'
      tag: 'Documentation'
      text: 'Explore your services, resources, and traces'
---

<div class="alert alert-info">
If you have not yet read the instructions for auto-instrumentation and setup, start with the <a href="/tracing/setup/nodejs/">Node.js Setup Instructions</a>.
</div>

If you aren't using supported library instrumentation (see [library compatibility][1]), you may want to manually instrument your code.

You may also want to extend the functionality of the `dd-trace` library or gain finer control over instrumenting your application. Several techniques are provided by the library to accomplish this.

## Adding tags

The built-in instrumentation and your own custom instrumentation create
spans around meaningful operations.

{{< tabs >}}
{{% tab "Locally" %}}

You can access the active span in order to include meaningful data by adding tags.

```javascript
const span = tracer.scope().active()
```

To learn more, read [API details for `Scope`][1].

You can add tags to a span using the `setTag` or `addTags` method on a span. Supported value types are string, number, and object.

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


[1]: https://datadoghq.dev/dd-trace-js/interfaces/Scope.html
{{% /tab %}}

{{% tab "Globally" %}}

You can add tags to every span by configuring them directly on the tracer, either with with the comma-separated `DD_TAGS` environment variable or with the `tags` option on the tracer initialization:

```javascript
// equivalent to DD_TAGS=foo:bar,baz:qux
tracer.init({
  tags: {
    foo: 'bar',
    baz: 'qux'
  }
})

// All spans will now have these tags
```

{{% /tab %}}

{{% tab "Component" %}}

Some Datadog integrations support span hooks that can be used to update the span right before it's finished. This is useful to modify or add tags to a span that is otherwise inaccessible from your code.

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

To learn more, read [API details for individual plugins][1].


[1]: https://datadoghq.dev/dd-trace-js/modules/plugins.html
{{% /tab %}}

{{% tab "Errors" %}}

Errors can be added to a span with the special `error` tag that supports error objects. This splits the error into three tags: `error.type`, `error.message`, and `error.stack`.

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

## Creating spans

The `dd-trace` library creates [spans][2] automatically with `tracer.init()` for [many libraries and frameworks][1]. However, you may want to gain visibility into your own code and this is achieved using spans.

Within your web request (for example, `/make-sandwich`), you may perform several operations, like `getIngredients()` and `assembleSandwich()`, which are useful to measure.

{{< tabs >}}
{{% tab "Synchronous" %}}

Synchronous code can be traced with `tracer.trace()` which automatically finishes the span when its callback returns and captures any thrown error automatically.

```javascript
app.get('/make-sandwich', (req, res) => {
  const sandwich = tracer.trace('sandwich.make', { resource: 'resource_name' }, () => {
    const ingredients = tracer.trace('get_ingredients', { resource: 'resource_name' }, () => {
      return getIngredients()
    })

    return tracer.trace('assemble_sandwich', { resource: 'resource_name' }, () => {
      assembleSandwich(ingredients)
    })
  })

  res.end(sandwich)
})
```

To learn more, read [API details for `tracer.trace()`][1].


[1]: https://datadoghq.dev/dd-trace-js/interfaces/Tracer.html#trace
{{% /tab %}}

{{% tab "Promises" %}}

Promises can be traced with `tracer.trace()` which automatically finishes the span when the returned promise resolves, and captures any rejection error automatically.

```javascript
const getIngredients = () => {
    return new Promise((resolve, reject) => {
        resolve('Salami');
    });
};

app.get('/make-sandwich', (req, res) => {
  return tracer.trace('sandwich.make', { resource: 'resource_name' }, () => {
    return tracer.trace('get_ingredients', { resource: 'resource_name' }, () => getIngredients())
      .then((ingredients) => {
        return tracer.trace('assemble_sandwich', { resource: 'resource_name' }, () => {
          return assembleSandwich(ingredients)
        })
      })
  }).then(sandwich => res.end(sandwich))
})
```

To learn more, read [API details for `tracer.trace()`][1].


[1]: https://datadoghq.dev/dd-trace-js/interfaces/Tracer.html#trace
{{% /tab %}}

{{% tab "Async/await" %}}

Async/await can be traced with `tracer.trace()` which automatically finishes the span when the returned promise resolves, and captures any rejection error automatically.

```javascript
app.get('/make-sandwich', async (req, res) => {
  const sandwich = await tracer.trace('sandwich.make', { resource: 'resource_name' }, async () => {
    const ingredients = await tracer.trace('get_ingredients', { resource: 'resource_name' }, () => {
      return getIngredients()
    })

    return tracer.trace('assemble_sandwich', { resource: 'resource_name' }, () => {
      return assembleSandwich(ingredients)
    })
  })

  res.end(sandwich)
})
```

To learn more, read [API details for `tracer.trace()`][1].


[1]: https://datadoghq.dev/dd-trace-js/interfaces/Tracer.html#trace
{{% /tab %}}

{{% tab "Wrapper" %}}

You can wrap an existing function without changing its code. This is useful to trace functions for which you don't control the code. This can be done with `tracer.wrap()` which takes the same arguments as `tracer.trace()` except its last argument which is the function to wrap instead of a callback.

```javascript

// After the functions are defined
getIngredients = tracer.wrap('get_ingredients', { resource: 'resource_name' }, getIngredients)
assembleSandwich = tracer.wrap('assemble_sandwich', { resource: 'resource_name' }, assembleSandwich)

// Where routes are defined
app.get('/make-sandwich', (req, res) => {

  const sandwich = tracer.trace('sandwich.make', { resource: 'resource_name' }, () => {
    const ingredients = getIngredients()

    return assembleSandwich(ingredients)
  })

  res.end(sandwich)
})
```

To learn more, read [API details for `tracer.trace()`][1].


[1]: https://datadoghq.dev/dd-trace-js/interfaces/Tracer.html#wrap
{{% /tab %}}
{{< /tabs >}}

## Request filtering

You may not want some requests of an application to be instrumented. A common case would be health checks or other synthetic traffic. These can be ignored by using the `blocklist` or `allowlist` option on the `http` plugin.

```javascript
// at the top of the entry point right after tracer.init()
tracer.use('http', {
  blocklist: ['/health', '/ping']
})
```

This configuration can be split between client and server if needed. For example,

```javascript
tracer.use('http', {
  server: {
    blocklist: ['/ping']
  }
})
```

Additionally, traces can be excluded based on their resource name, so that the Agent doesn't send them to Datadog. This and other security and fine-tuning Agent configurations can be found on the [Security][3] page or in [Ignoring Unwanted Resources][4].

## dd-trace-api

{{< callout btn_hidden="true" header="ddtrace-api is in Preview!">}}
The <code>dd-trace-api</code> packages is in Preview and may not include all the API calls you need. If you need more complete functionality, use the API as described in the previous sections.
<br><br>The following steps are only necessary if you want to experiment with the in-Preview <code>ddtrace-api</code> package.{{< /callout >}}

The [dd-trace-api package][5] provides a stable public API for Datadog APM's custom Node.js instrumentation. This package implements only the API interface, not the underlying functionality that creates and sends spans to Datadog.

This separation between interface (`dd-trace-api`) and implementation (`dd-trace`) offers several benefits:

- You can rely on an API that changes less frequently and more predictably for your custom instrumentation
- If you only use automatic instrumentation, you can ignore API changes entirely
- If you implement both single-step and custom instrumentation, you avoid depending on multiple copies of the `dd-trace` package

To use `dd-trace-api`:

1. Install the `dd-trace` and `dd-trace-api` libraries in your app. **Note**: `dd-trace` is installed for you with single-step instrumentation, but you need to install `dd-trace-api` manually in your app.
   ```shell
   npm install dd-trace dd-trace-api
   ```

2. Instrument your Node.js application using `dd-trace`. If you're using single-step instrumentation, you can skip this step.
   ```shell
    node --require dd-trace/init app.js
   ```

3. After this is set up, you can write custom instrumentation exactly like the examples in the previous sections, but you require `dd-trace-api` instead of `dd-trace`.

   For example:
```javascript
const tracer = require('dd-trace-api')
const express = require('express')
const app = express()

app.get('/make-sandwich', (req, res) => {
  const sandwich = tracer.trace('sandwich.make', { resource: 'resource_name' }, () => {
    const ingredients = tracer.trace('get_ingredients', { resource: 'resource_name' }, () => {
      return getIngredients()
    })

    return tracer.trace('assemble_sandwich', { resource: 'resource_name' }, () => {
      assembleSandwich(ingredients)
    })
  })

  res.end(sandwich)
})
```

See that package's [API definition][6] for the full list of supported API calls.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/compatibility_requirements/nodejs/
[2]: /tracing/glossary/#spans
[3]: /tracing/security
[4]: /tracing/guide/ignoring_apm_resources/
[5]: https://npm.im/dd-trace-api
[6]: https://github.com/DataDog/dd-trace-api-js/blob/master/index.d.ts
