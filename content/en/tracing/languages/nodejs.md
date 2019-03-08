---
title: Tracing Node.js Applications
kind: Documentation
aliases:
- /tracing/nodejs/
- /tracing/setup/nodejs/
- /tracing/languages/javascript/
- /tracing/setup/javascript/
- /agent/apm/nodejs/
further_reading:
- link: "https://github.com/DataDog/dd-trace-js"
  tag: "GitHub"
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

To begin tracing Node.js applications, first [install and configure the Datadog Agent][4], see the additional documentation for [tracing Docker applications][5] or [Kubernetes applications][6].

Next, install the Datadog Tracing library using npm:

```sh
npm install --save dd-trace
```

Finally, import and initialize the tracer:

##### JavaScript

```js
// This line must come before importing any instrumented module.
const tracer = require('dd-trace').init()
```

##### TypeScript

```js
// server.js
import "./tracer"; // must come before importing any instrumented module.

// tracer.js
import tracer from "dd-trace";
tracer.init(); // initialized in a different file to avoid hoisting.
export default tracer;
```

See the [tracer settings][7] for the list of initialization options.

## Compatibility

Node `^4.7`, `^6.9` and `>=8` are supported by this library. However, it benefits significantly from the performance improvements introduced in Node `>=8.3`.

### Integrations

APM provides out-of-the-box instrumentation for many popular frameworks and libraries by using a plugin system. If you would like support for a module that is not listed, [contact support][8] to share a request.

For details about how to how to toggle and configure plugins, check out the [API documentation][9].

#### Web Framework Compatibility

| Module        | Versions    | Support Type    | Notes                        |
| :----------   | :---------- | :-------------- | :--------------------------- |
| [express][10] | `>=4`       | Fully Supported | Supports Sails, Loopback, and [more][11] |
| [graphql][12] | `>=0.10`    | Fully Supported | Supports Apollo Server and express-graphql |
| [hapi][13]    | `>=2`       | Fully Supported |                              |
| [koa][14]     | `>=2`       | Fully Supported |                              |
| [restify][15] | `>=3`       | Fully Supported |                              |

#### Native Module Compatibility

| Module               | Support Type    |
| :------------------- | :-------------- |
| [dns][37]            | Fully Supported |
| [http][16]           | Fully Supported |
| [https][17]          | Fully Supported |
| [net][38]            | Fully Supported |

#### Data Store Compatibility

| Module                 | Versions    | Support Type    |  Notes              |
| :----------            | :---------- | :-------------- | :------------------ |
| [cassandra-driver][18] | `>=3`       | Fully Supported |                     |
| [elasticsearch][19]    | `>=10`      | Fully Supported |                     |
| [ioredis][20]          | `>=2`       | Fully Supported |                     |
| [memcached][21]        | `>=2.2`     | Fully Supported |                     |
| [mongodb-core][22]     | `>=2`       | Fully Supported | Supports Mongoose   |
| [mysql][23]            | `>=2`       | Fully Supported |                     |
| [mysql2][24]           | `>=1`       | Fully Supported |                     |
| [pg][25]               | `>=4`       | Fully Supported | Supports `pg-native` when used with `pg` |
| [redis][26]            | `>=0.12`    | Fully Supported |                     |

#### Worker Compatibility

| Module             | Versions    | Support Type    | Notes                   |
| :----------        | :---------- | :-------------- | :---------------------- |
| [amqp10][27]       | `>=3`       | Fully Supported | Supports AMQP 1.0 brokers (i.e. ActiveMQ, Apache Qpid) |
| [amqplib][28]      | `>=0.5`     | Fully Supported | Supports AMQP 0.9 brokers (i.e. RabbitMQ, Apache Qpid) |
| [generic-pool][39] | `>=2`       | Fully Supported |                         |
| [kafka-node][29]   |             | Coming Soon     |                         |
| [rhea][30]         |             | Coming Soon     |                         |

#### Promise Library Compatibility

| Module           | Versions    | Support Type    |
| :----------      | :---------- | :-------------- |
| [bluebird][31]   | `>=2`       | Fully Supported |
| [q][32]          | `>=1`       | Fully Supported |
| [when][33]       | `>=3`       | Fully Supported |

#### Logger Compatibility

| Module                 | Versions    | Support Type    |
| :----------            | :---------- | :-------------- |
| [bunyan][34]           | `>=1`       | Fully Supported |
| [pino][35]             | `>=2`       | Fully Supported |
| [winston][36]          | `>=1`       | Fully Supported |

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/visualization
[2]: https://datadog.github.io/dd-trace-js
[3]: https://github.com/DataDog/dd-trace-js/blob/master/README.md#development
[4]: /tracing/setup
[5]: /tracing/setup/docker
[6]: /agent/kubernetes/daemonset_setup/#trace-collection
[7]: https://datadog.github.io/dd-trace-js/#tracer-settings
[8]: /help
[9]: https://datadog.github.io/dd-trace-js/#integrations
[10]: https://expressjs.com
[11]: https://expressjs.com/en/resources/frameworks.html
[12]: https://github.com/graphql/graphql-js
[13]: https://hapijs.com
[14]: https://koajs.com
[15]: http://restify.com
[16]: https://nodejs.org/api/http.html
[17]: https://nodejs.org/api/https.html
[18]: https://github.com/datastax/nodejs-driver
[19]: https://github.com/elastic/elasticsearch-js
[20]: https://github.com/luin/ioredis
[21]: https://github.com/3rd-Eden/memcached
[22]: http://mongodb.github.io/node-mongodb-native/core
[23]: https://github.com/mysqljs/mysql
[24]: https://github.com/sidorares/node-mysql2
[25]: https://node-postgres.com
[26]: https://github.com/NodeRedis/node_redis
[27]: https://github.com/noodlefrenzy/node-amqp10
[28]: https://github.com/squaremo/amqp.node
[29]: https://github.com/SOHU-Co/kafka-node
[30]: https://github.com/amqp/rhea
[31]: https://github.com/petkaantonov/bluebird
[32]: https://github.com/kriskowal/q
[33]: https://github.com/cujojs/when
[34]: https://github.com/trentm/node-bunyan
[35]: http://getpino.io
[36]: https://github.com/winstonjs/winston
[37]: https://nodejs.org/api/dns.html
[38]: https://nodejs.org/api/net.html
[39]: https://github.com/coopernurse/node-pool
