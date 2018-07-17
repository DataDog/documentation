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

For details about configuration and using the API, check out our [API documentation][2].

For details about contributing, check out the [development guide][development docs].

### Requirements

Node `^4.7`, `^6.9` and `>=8` are supported by this library. However, it benefits significantly from the performance improvements introduced in Node `>=8.3`.

### Installation

To begin tracing Node.js applications, first [install and configure the Datadog Agent][1] (see additional documentation for [tracing Docker applications][3]).

Next, install the Datadog Tracing library using npm:

```sh
npm install --save dd-trace
```

Finally, import and initialize the tracer:

```js
// This line must come before importing any instrumented module.
const tracer = require('dd-trace').init()
```

See the [tracer settings][4] for the list of initialization options.

**Note**: The tracer must be initialized before importing any instrumented module.

## Manual Instrumentation

If you aren’t using supported library instrumentation (see [Compatibility](#compatibility)), you may want to manually instrument your code.

The following example initializes a Datadog Tracer and creates a Span called `web.request`:

```javascript
const tracer = require('dd-trace').init()
const span = tracer.startSpan('web.request')

span.setTag('http.url', '/login')
span.finish()
```

For more information on manual instrumentation, check out the [API documentation][5].

## Tracer Settings

### Debug Mode

Debug mode is disabled by default, to enable it:

```javascript
const tracer = require('dd-trace').init({
  debug: true
})
```

For more tracer settings, check out the [API documentation][4].

## Distributed Tracing

Distributed tracing allows you to propagate a single trace across multiple services, so you can see performance end-to-end.

Distributed tracing is enabled by default for all supported integrations.

## Integrations

APM provides out-of-the-box instrumentation for many popular frameworks and libraries by using a plugin system.

For details about how to how to toggle and configure plugins, check out the [API documentation][6].

### Compatibility

The `dd-trace` library includes support for a number of modules. If you would like support for a module that is not listed, [contact support][7] to share a request.

#### Web Frameworks

| Module        | Versions    | Support Type    |
| :----------   | :---------- | :-------------- |
| [express][8]  | 4.x         | Beta            |
| [graphql][22] | 0.13.x      | Beta            |
| [hapi][9]     |             | Coming Soon     |
| [koa][10]     |             | Coming Soon     |
| [restify][11] |             | Coming Soon     |

#### Native Modules

| Module               | Support Type    |
| :------------------- | :-------------- |
| [http][12]           | Beta            |
| [https][13]          | Beta            |

#### Data Stores

| Module                 | Versions    | Support Type |
| :----------            | :---------- | :----------- |
| [cassandra-driver][25] |             | Coming Soon  |
| [elasticsearch][14]    | 15.x        | Beta         |
| [ioredis][15]          |             | Coming Soon  |
| [memcached][24]        |             | Coming Soon  |
| [mongodb-core][16]     | 3.x         | Beta         |
| [mysql][17]            | 2.x         | Beta         |
| [mysql2][18]           | ^1.5        | Beta         |
| [pg][19]               | 6.x         | Beta         |
| [redis][20]            | ^2.6        | Beta         |

#### Workers

| Module           | Versions    | Support Type |
| :----------      | :---------- | :----------  |
| [amqplib][21]*   | 0.5.x       | Beta         |
| [kafka-node][26] |             | Coming Soon  |

**Note**: amqplib supports several message brokers including RabbitMQ and ActiveMQ.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[visualization docs]: https://docs.datadoghq.com/tracing/visualization/
[development docs]: https://github.com/DataDog/dd-trace-js/blob/master/README.md#development
[1]: /tracing/setup/
[2]: https://datadog.github.io/dd-trace-js/
[3]: /tracing/setup/docker/
[4]: https://datadog.github.io/dd-trace-js/#tracer-settings
[5]: https://datadog.github.io/dd-trace-js/#manual-instrumentation
[6]: https://datadog.github.io/dd-trace-js/#integrations
[7]: https://docs.datadoghq.com/help
[8]: https://expressjs.com/
[9]: https://hapijs.com/
[10]: https://koajs.com/
[11]: http://restify.com/
[12]: https://nodejs.org/api/http.html
[13]: https://nodejs.org/api/https.html
[14]: https://github.com/elastic/elasticsearch-js
[15]: https://github.com/luin/ioredis
[16]: http://mongodb.github.io/node-mongodb-native/core/
[17]: https://github.com/mysqljs/mysql
[18]: https://github.com/sidorares/node-mysql2
[19]: https://node-postgres.com/
[20]: https://github.com/NodeRedis/node_redis
[21]: https://github.com/squaremo/amqp.node
[22]: https://github.com/graphql/graphql-js
[23]: https://datadog.github.io/dd-trace-js/#amqplib-limitations
[24]: https://github.com/3rd-Eden/memcached
[25]: https://github.com/datastax/nodejs-driver
[26]: https://github.com/SOHU-Co/kafka-node
