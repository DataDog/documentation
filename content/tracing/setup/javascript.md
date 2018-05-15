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
- link: "https://datadog.github.io/dd-trace-js"
  tag: "Documentation"
  text: API documentation
- link: "tracing/visualization/"
  tag: "Use the APM UI"
  text: "Explore your services, resources and traces"
---

<div class="alert alert-warning">
JavaScript APM is currently in <strong>beta</strong>.
</div>

## Getting Started

For descriptions of terminology used in APM, take a look at the [official documentation][visualization docs].

For details about configuration and using the API, check out our [API documentation](https://datadog.github.io/dd-trace-js/).

For details about contributing, check out the [development guide][development docs].

[visualization docs]: https://docs.datadoghq.com/tracing/visualization/
[development docs]: https://github.com/DataDog/dd-trace-js/blob/master/README.md#development

### Requirements

Node 4 is the minimum version supported by this library. However, it benefits significantly from the performance improvements introduced in Node 8.3+.

### Installation

To begin tracing Node.js applications, first [install and configure the Datadog Agent](/tracing/setup/) (see additional documentation for [tracing Docker applications](/tracing/setup/docker/)).

Next, install the Datadog Tracing library using npm:

```sh
npm install --save dd-trace
```

Finally, import and initialize the tracer:

```js
const tracer = require('dd-trace').init()
```

See the [tracer settings](https://datadog.github.io/dd-trace-js/#tracer-settings) for the list of initialization options.

**NOTE: The tracer must be initialized before importing any instrumented module.**

## Manual Instrumentation

If you aren’t using supported library instrumentation (see [Compatibility](#compatibility)), you may want to manually instrument your code.

The following example initializes a Datadog Tracer and creates a Span called `web.request`:

```javascript
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

For more information on manual instrumentation, check out the [API documentation](https://datadog.github.io/dd-trace-js/#manual-instrumentation).

## Distributed Tracing

Distributed tracing allows you to propagate a single trace across multiple services, so you can see performance end-to-end.

Distributed tracing is enabled by default for all supported integrations.

## Integrations

APM provides out-of-the-box instrumentation for many popular frameworks and libraries by using a plugin system.

For details about how to how to toggle and configure plugins, check out the [API documentation](https://datadog.github.io/dd-trace-js/#integrations).

### Compatibility

The `dd-trace` library includes support for a number of modules. If you would like support for a module that is not listed, feel free to open a [GitHub issue](https://github.com/DataDog/dd-trace-js/issues).

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

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}
