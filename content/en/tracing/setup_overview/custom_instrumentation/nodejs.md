---
title: NodeJS Custom Instrumentation
kind: documentation
aliases:
    - /tracing/opentracing/nodejs
    - /tracing/manual_instrumentation/nodejs
    - /tracing/custom_instrumentation/nodejs
description: 'Manually instrument your NodeJS application to send custom traces to Datadog.'
code_lang: nodejs
code_lang_weight: 40
type: multi-code-lang
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

## Adding tags

The built-in instrumentation and your own custom instrumentation will create
spans around meaningful operations.

{{< tabs >}}
{{% tab "Locally" %}}

You can access the active span in order to include meaningful data by adding tags.

```javascript
const span = tracer.scope().active()
```

API details for `Scope` can be found [here][1].

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


[1]: https://datadoghq.dev/dd-trace-js/interfaces/scope.html
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

Errors can be added to a span with the special `error` tag that supports error objects. This will split the error into three tags: `error.type`, `error.msg` and `error.stack`.

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
{{< /tabs >}}

## Request filtering

You may not want some requests of an application to be instrumented. A common case would be health checks or other synthetic traffic. These can be ignored by using the `blocklist` or `allowlist` option on the `http` plugin.

```javascript
// at the top of the entry point right after tracer.init()
tracer.use('http', {
  blocklist: ['/health', '/ping']
})
```

Additionally, traces can be excluded based on their resource name, so that the Agent doesn't send them to Datadog. This and other security and fine-tuning Agent configurations can be found on the [Security][3] page.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/compatibility_requirements/nodejs/
[2]: /tracing/visualization/#spans
[3]: /tracing/security
