---
title: Tracing Node.js Applications
kind: Documentation
aliases:
- /tracing/nodejs/
- /tracing/languages/nodejs/
- /tracing/setup/javascript/
further_reading:
- link: "https://github.com/DataDog/dd-trace-js"
  tag: "Github"
  text: "Source code"
- link: "https://datadog.github.io/dd-trace-js"
  tag: "Documentation"
  text: "API documentation"
- link: "tracing/visualization/"
  tag: "Use the APM UI"
  text: "Explore your services, resources and traces"
- link: "tracing/advanced_usage/?tab=nodejs"
  tag: "Advanced Usage"
  text: "Advanced Usage"
---

## Installation And Getting Started

For descriptions of terminology used in APM, take a look at the [official documentation][1].

For details about configuration and using the API, see Datadog's [API documentation][2].

For details about contributing, check out the [development guide][3].

### Quickstart

<div class="alert alert-warning">
This library <strong>MUST</strong> be imported and initialized before any instrumented module. When using a transpiler, you <strong>MUST</strong> import and initialize the tracer library in an external file and then import that file as a whole when building your application. This prevents hoisting and ensures that the tracer library gets imported and initialized before importing any other instrumented module.
</div>

To begin tracing Node.js applications, first [install and configure the Datadog Agent][4] (see additional documentation for [tracing Docker applications][5]).

Next, install the Datadog Tracing library using npm:

```sh
npm install --save dd-trace
```

Finally, import and initialize the tracer:

```js
// This line must come before importing any instrumented module.
const tracer = require('dd-trace').init()
```

See the [tracer settings][6] for the list of initialization options.

## Compatibility

Node `^4.7`, `^6.9` and `>=8` are supported by this library. However, it benefits significantly from the performance improvements introduced in Node `>=8.3`.

### Integrations

APM provides out-of-the-box instrumentation for many popular frameworks and libraries by using a plugin system. If you would like support for a module that is not listed, [contact support][7] to share a request.

For details about how to how to toggle and configure plugins, check out the [API documentation][8].

#### Web Framework Compatibility

| Module        | Versions    | Support Type    | Notes                        |
| :----------   | :---------- | :-------------- | :--------------------------- |
| [express][9]  | 4           | Fully Supported | Supports Sails, Loopback, and [more][10] |
| [graphql][11] | 0.10 - 14   | Fully Supported | Supports Apollo Server and express-graphql |
| [hapi][12]     | 2 - 17      | Fully Supported |                              |
| [koa][13]     | 2           | Fully Supported |                              |
| [restify][14] | 3 - 7       | Fully Supported |                              |

#### Native Module Compatibility

| Module               | Support Type    |
| :------------------- | :-------------- |
| [http][15]           | Fully Supported |
| [https][16]          | Fully Supported |

#### Data Store Compatibility

| Module                 | Versions    | Support Type    |  Notes              |
| :----------            | :---------- | :-------------- | :------------------ |
| [cassandra-driver][17] |             | Coming Soon     |                     |
| [elasticsearch][18]    | 10 - 15     | Fully Supported |                     |
| [ioredis][19]          | 2 - 4       | Fully Supported |                     |
| [memcached][20]        | ^2.2        | Fully Supported |                     |
| [mongodb-core][21]     | 2 - 3       | Fully Supported | Supports Mongoose   |
| [mysql][22]            | 2           | Fully Supported |                     |
| [mysql2][23]           | 1           | Fully Supported |                     |
| [pg][24]               | 4 - 7       | Fully Supported | `pg-native` support coming soon |
| [redis][25]            | 0.12 - 2.6  | Fully Supported |                     |

#### Worker Compatibility

| Module           | Versions    | Support Type    | Notes                     |
| :----------      | :---------- | :-------------- | :------------------------ |
| [amqp10][26]     | 3           | Fully Supported | Supports AMQP 1.0 brokers (i.e. ActiveMQ, Apache Qpid) |
| [amqplib][27]    | 0.5         | Fully Supported | Supports AMQP 0.9 brokers (i.e. RabbitMQ, Apache Qpid) |
| [kafka-node][28] |             | Coming Soon     |                           |
| [rhea][29]       |             | Coming Soon     |                           |

#### Promise Library Compatibility

| Module           | Versions    | Support Type    |
| :----------      | :---------- | :-------------- |
| [bluebird][30]   | 2 - 3       | Fully Supported |
| [q][31]          | 1           | Fully Supported |
| [when][32]       | 3           | Fully Supported |

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/visualization
[2]: https://datadog.github.io/dd-trace-js
[3]: https://github.com/DataDog/dd-trace-js/blob/master/README.md#development
[4]: /tracing/setup
[5]: /tracing/setup/docker
[6]: https://datadog.github.io/dd-trace-js/#tracer-settings
[7]: /help
[8]: https://datadog.github.io/dd-trace-js/#integrations
[9]: https://expressjs.com
[10]: https://expressjs.com/en/resources/frameworks.html
[11]: https://github.com/graphql/graphql-js
[12]: https://hapijs.com
[13]: https://koajs.com
[14]: http://restify.com
[15]: https://nodejs.org/api/http.html
[16]: https://nodejs.org/api/https.html
[17]: https://github.com/datastax/nodejs-driver
[18]: https://github.com/elastic/elasticsearch-js
[19]: https://github.com/luin/ioredis
[20]: https://github.com/3rd-Eden/memcached
[21]: http://mongodb.github.io/node-mongodb-native/core
[22]: https://github.com/mysqljs/mysql
[23]: https://github.com/sidorares/node-mysql2
[24]: https://node-postgres.com
[25]: https://github.com/NodeRedis/node_redis
[26]: https://github.com/noodlefrenzy/node-amqp10
[27]: https://github.com/squaremo/amqp.node
[28]: https://github.com/SOHU-Co/kafka-node
[29]: https://github.com/amqp/rhea
[30]: https://github.com/petkaantonov/bluebird
[31]: https://github.com/kriskowal/q
[32]: https://github.com/cujojs/when
