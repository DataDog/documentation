---
title: Tracing Node.js Applications
kind: Documentation
aliases:
- /tracing/nodejs/
- /tracing/languages/nodejs/
- /agent/apm/javascript/
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
- link: "tracing/advanced_usage/?tab=nodejs"
  tag: "Advanced Usage"
  text: "Advanced Usage"
---

## Installation And Getting Started

For descriptions of terminology used in APM, take a look at the [official documentation][visualization docs].

For details about configuration and using the API, see Datadog's [API documentation][2].

For details about contributing, check out the [development guide][development docs].

### Quickstart

<div class="alert alert-warning">
This library <strong>MUST</strong> be imported and initialized before any instrumented module. When using a transpiler, you <strong>MUST</strong> import and initialize the tracer library in an external file and then import that file as a whole when building your application. This prevents hoisting and ensures that the tracer library gets imported and initialized before importing any other instrumented module.
</div>

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

## Compatibility

Node `^4.7`, `^6.9` and `>=8` are supported by this library. However, it benefits significantly from the performance improvements introduced in Node `>=8.3`.

### Integrations

APM provides out-of-the-box instrumentation for many popular frameworks and libraries by using a plugin system. If you would like support for a module that is not listed, [contact support][7] to share a request.

For details about how to how to toggle and configure plugins, check out the [API documentation][6].

#### Web Framework Compatibility

| Module        | Versions    | Support Type    | Notes                        |
| :----------   | :---------- | :-------------- | :--------------------------- |
| [express][8]  | 4           | Fully Supported | Supports Sails, Loopback, and [more][29] |
| [graphql][22] | 0.10 - 14   | Fully Supported | Supports Apollo Server and express-graphql |
| [hapi][9]     | 2 - 17      | Fully Supported |                              |
| [koa][10]     | 2           | Fully Supported |                              |
| [restify][11] | 3 - 7       | Fully Supported |                              |

[8]: https://expressjs.com/
[22]: https://github.com/graphql/graphql-js
[9]: https://hapijs.com/
[10]: https://koajs.com/
[11]: http://restify.com/
[29]: https://expressjs.com/en/resources/frameworks.html

#### Native Module Compatibility

| Module               | Support Type    |
| :------------------- | :-------------- |
| [http][12]           | Fully Supported |
| [https][13]          | Fully Supported |

[12]: https://nodejs.org/api/http.html
[13]: https://nodejs.org/api/https.html

#### Data Store Compatibility

| Module                 | Versions    | Support Type    |  Notes              |
| :----------            | :---------- | :-------------- | :------------------ |
| [cassandra-driver][25] |             | Coming Soon     |                     |
| [elasticsearch][14]    | 10 - 15     | Fully Supported |                     |
| [ioredis][15]          | 2 - 4       | Fully Supported |                     |
| [memcached][24]        | ^2.2        | Fully Supported |                     |
| [mongodb-core][16]     | 2 - 3       | Fully Supported | Supports Mongoose   |
| [mysql][17]            | 2           | Fully Supported |                     |
| [mysql2][18]           | 1           | Fully Supported |                     |
| [pg][19]               | 4 - 7       | Fully Supported | `pg-native` support coming soon |
| [redis][20]            | 0.12 - 2.6  | Fully Supported |                     |

[14]: https://github.com/elastic/elasticsearch-js
[15]: https://github.com/luin/ioredis
[16]: http://mongodb.github.io/node-mongodb-native/core/
[17]: https://github.com/mysqljs/mysql
[18]: https://github.com/sidorares/node-mysql2
[19]: https://node-postgres.com/
[20]: https://github.com/NodeRedis/node_redis
[24]: https://github.com/3rd-Eden/memcached
[25]: https://github.com/datastax/nodejs-driver

#### Worker Compatibility

| Module           | Versions    | Support Type    | Notes                     |
| :----------      | :---------- | :-------------- | :------------------------ |
| [amqp10][27]     | 3           | Fully Supported | Supports AMQP 1.0 brokers (i.e. ActiveMQ, Apache Qpid) |
| [amqplib][21]    | 0.5         | Fully Supported | Supports AMQP 0.9 brokers (i.e. RabbitMQ, Apache Qpid) |
| [kafka-node][26] |             | Coming Soon     |                           |
| [rhea][28]       |             | Coming Soon     |                           |

[21]: https://github.com/squaremo/amqp.node
[26]: https://github.com/SOHU-Co/kafka-node
[27]: https://github.com/noodlefrenzy/node-amqp10
[28]: https://github.com/amqp/rhea

#### Promise Library Compatibility

| Module           | Versions    | Support Type    |
| :----------      | :---------- | :-------------- |
| [bluebird][30]   | 2 - 3       | Fully Supported |
| [q][31]          | 1           | Fully Supported |
| [when][32]       | 3           | Fully Supported |

[30]: https://github.com/petkaantonov/bluebird
[31]: https://github.com/kriskowal/q
[32]: https://github.com/cujojs/when

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[visualization docs]: https://docs.datadoghq.com/tracing/visualization/
[development docs]: https://github.com/DataDog/dd-trace-js/blob/master/README.md#development
[1]: /agent/apm/
[2]: https://datadog.github.io/dd-trace-js/
[3]: //agent/docker/apm/
[4]: https://datadog.github.io/dd-trace-js/#tracer-settings
[6]: https://datadog.github.io/dd-trace-js/#integrations
[7]: https://docs.datadoghq.com/help
