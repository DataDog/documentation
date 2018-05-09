---
title: Tracing JavaScript Applications
kind: Documentation
aliases:
- /tracing/javascript/
- /tracing/languages/javascript/
further_reading:
- link: "https://github.com/DataDog/dd-trace-js"
  tag: "Github"
  text: Source code
- link: "tracing/visualization/"
  tag: "Use the APM UI"
  text: "Explore your services, resources and traces"
---

<div class="alert alert-warning">
JavaScript APM is currently in <strong>beta</strong>.
</div>

## Getting started

For descriptions of terminology used in APM, take a look at the [official documentation][visualization docs].

For details about contributing, check out the [development guide][development docs].

[visualization docs]: https://docs.datadoghq.com/tracing/visualization/
[development docs]: https://github.com/DataDog/dd-trace-js/blob/master/README.md#development

### Installation

To begin tracing Node.js applications, first [install and configure the Datadog Agent](/tracing/setup/) (see additional documentation for [tracing Docker applications](/tracing/setup/docker/)).

Next, install the Datadog Tracing library using npm:

```sh
npm install --save dd-trace
```

Finally, import the tracer and instrument your code!

### Manual Instrumentation

If you aren’t using supported library instrumentation (see [Compatibility](#compatibility)), you may want to manually instrument your code. Adding tracing to your code is easy using the tracing method, which you can wrap around your JavaScript code.

The following example initializes a Datadog Tracer and creates a Span called `web.request`:

```js
const tracer = require('dd-trace').init()

tracer
  .trace('web.request', {
    service: 'my_service'
  })
  .then(span => {
    span.setTag('my_tag', 'my_value')
    span.finish()
  })
```

### Configuration Options

Options can be configured as a parameter to the `init()` method or as environment variables.

| Config        | Environment Variable         | Default   | Description |
| ------------- | ---------------------------- | --------- | ----------- |
| debug         | DD_TRACE_DEBUG               | false     | Enable debug logging in the tracer. |
| service       | DD_SERVICE_NAME              |           | The service name to be used for this program. |
| hostname      | DD_TRACE_AGENT_HOSTNAME      | localhost | The address of the trace agent that the tracer will submit to. |
| port          | DD_TRACE_AGENT_PORT          | 8126      | The port of the trace agent that the tracer will submit to. |
| env           | DD_ENV                       |           | Set an application’s environment e.g. `prod`, `pre-prod`, `stage`. |
| tags          |                              | {}        | Set global tags that should be applied to all spans. |
| flushInterval |                              | 2000      | Interval in milliseconds at which the tracer will submit traces to the agent. |
| experimental  |                              | {}        | Experimental features can be enabled all at once using boolean `true` or individually using key/value pairs. Available experimental features: `asyncHooks`. |
| plugins       |                              | true      | Whether or not to enable automatic instrumentation of external libraries using the built-in plugins. |

## OpenTracing

This library is OpenTracing compliant. Use the [OpenTracing API](https://doc.esdoc.org/github.com/opentracing/opentracing-javascript/) and the Datadog Tracer (dd-trace) library to measure execution times for specific pieces of code. In the following example, a Datadog Tracer is initialized and used as a global tracer:

```js
const tracer = require('dd-trace').init()
const opentracing = require('opentracing')

opentracing.initGlobalTracer(tracer)
```

**NOTE: The tracer returned by `opentracing.globalTracer()` only
contains OpenTracing specific methods.**

**NOTE: When using OpenTracing, context propagation is not handled
automatically.**

## Integrations

APM provides out-of-the-box instrumentation for many popular frameworks and libraries by using a plugin system. By default all built-in plugins are enabled. This behavior can be changed by setting the `plugins` option to `false` in the [configuration options](#configuration-options).

Built-in plugins can be enabled by name and configured individually:

```js
const tracer = require('dd-trace').init({ plugins: false })

// enable express integration
tracer.use('express')

// enable and configure postgresql integration
tracer.use('pg', {
  service: 'pg-cluster'
})
```

See [compatibility](#compatibility) for the list of supported integrations.

### Compatibility

The `dd-trace` library includes support for a number of modules.

#### Web Frameworks

___

| Module                                             | Versions | Support Type |
|----------------------------------------------------|----------|--------------|
| [express](https://expressjs.com/)                  | 4.x      | Experimental |
| [hapi](https://hapijs.com/)                        |          | Coming Soon  |
| [koa](https://koajs.com/)                          |          | Coming Soon  |
| [restify](http://restify.com/)                     |          | Coming Soon  |

#### Native Modules

___

| Module                                                        | Support Type |
|---------------------------------------------------------------|--------------|
| [http](https://nodejs.org/api/http.html)                      | Experimental |
| [https](https://nodejs.org/api/https.html)                    | Experimental |

#### Data Stores

___

| Module                                                             | Versions | Support Type |
|--------------------------------------------------------------------|----------|--------------|
| [elasticsearch](https://github.com/elastic/elasticsearch-js)       |          | Coming Soon  |
| [ioredis](https://github.com/luin/ioredis)                         |          | Coming Soon  |
| [mongodb-core](http://mongodb.github.io/node-mongodb-native/core/) |          | Coming Soon  |
| [mysql](https://github.com/mysqljs/mysql)                          | 2.x      | Experimental |
| [pg](https://node-postgres.com/)                                   | 6.x      | Experimental |
| [redis](https://github.com/NodeRedis/node_redis)                   | >=2.6    | Experimental |

### Distributed tracing

Distributed tracing allows you to propagate a single trace across multiple services, so you can see performance end-to-end.

Distributed tracing is enabled by default for all supported integrations.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}