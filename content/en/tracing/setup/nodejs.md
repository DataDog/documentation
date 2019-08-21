---
title: Tracing Node.js Applications
kind: documentation
aliases:
- /tracing/nodejs/
- /tracing/languages/nodejs/
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
- link: "tracing/advanced/"
  tag: "Advanced Usage"
  text: "Advanced Usage"
---

## Installation And Getting Started

<div class="alert alert-info">If you already have a Datadog account you can find step-by-step instructions in our in-app guides for <a href="https://app.datadoghq.com/apm/docs?architecture=host-based&language=node" target=_blank> host-based</a> and <a href="https://app.datadoghq.com/apm/docs?architecture=container-based&language=node" target=_blank>container-based</a> set ups.</div>

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

## Change Agent Hostname

Configure your application level tracers to submit traces to a custom Agent hostname:

The NodeJS Tracing Module automatically looks for and initializes with the ENV variables `DD_AGENT_HOST` and `DD_TRACE_AGENT_PORT`

```sh
DD_AGENT_HOST=<HOSTNAME> DD_TRACE_AGENT_PORT=<PORT> node server
```

To use a different protocol such as UDS, specify the entire URL as a single ENV variable `DD_TRACE_AGENT_URL`.

```sh
DD_TRACE_AGENT_URL=unix:<SOCKET_PATH> node server
```

## Compatibility

Node `>=8` is supported by this library. Only even versions like 8.x and 10.x are officially supported. Odd versions like 9.x and 11.x should work but are not officially supported.

Node 4 or Node 6 versions are supported by version 0.13 of the `dd-trace-js` tracer. This version will be supported until **April 30th, 2020**, but no new feature will be added.

**Note**: The global policy is that the Datadog JS tracer supports (only for bug fixes) a Node version until 1 year after its release reached its end-of-life.

### Integrations

APM provides out-of-the-box instrumentation for many popular frameworks and libraries by using a plugin system. If you would like support for a module that is not listed, [contact support][8] to share a request.

For details about how to how to toggle and configure plugins, check out the [API documentation][9].

#### Web Framework Compatibility

| Module           | Versions | Support Type    | Notes                                      |
|------------------|----------|-----------------|--------------------------------------------|
| [connect][10]    | `>=2`    | Fully Supported |                                            |
| [express][11]    | `>=4`    | Fully Supported | Supports Sails, Loopback, and [more][12]   |
| [fastify][13]    | `>=1`    | Fully Supported |                                            |
| [graphql][14]    | `>=0.10` | Fully Supported | Supports Apollo Server and express-graphql |
| [hapi][15]       | `>=2`    | Fully Supported |                                            |
| [koa][16]        | `>=2`    | Fully Supported |                                            |
| [paperplane][17] | `>=2.3`  | Fully Supported | Not supported in [serverless-mode][18]     |
| [restify][19]    | `>=3`    | Fully Supported |                                            |

#### Native Module Compatibility

| Module      | Support Type    |
|-------------|-----------------|
| [dns][20]   | Fully Supported |
| [http][21]  | Fully Supported |
| [https][22] | Fully Supported |
| [net][23]   | Fully Supported |

#### Data Store Compatibility

| Module                 | Versions | Support Type    | Notes                                            |
|------------------------|----------|-----------------|--------------------------------------------------|
| [cassandra-driver][24] | `>=3`    | Fully Supported |                                                  |
| [elasticsearch][25]    | `>=10`   | Fully Supported | Supports `@elastic/elasticsearch` versions `>=5` |
| [ioredis][26]          | `>=2`    | Fully Supported |                                                  |
| [knex][27]             | `>=0.8`  | Fully Supported | This integration is only for context propagation |
| [memcached][28]        | `>=2.2`  | Fully Supported |                                                  |
| [mongodb-core][29]     | `>=2`    | Fully Supported | Supports Mongoose                                |
| [mysql][30]            | `>=2`    | Fully Supported |                                                  |
| [mysql2][31]           | `>=1`    | Fully Supported |                                                  |
| [pg][32]               | `>=4`    | Fully Supported | Supports `pg-native` when used with `pg`         |
| [redis][33]            | `>=0.12` | Fully Supported |                                                  |
| [tedious][34]          | `>=1`    | Fully Supported | SQL Server driver for `mssql` and `sequelize`    |

#### Worker Compatibility

| Module             | Versions | Support Type    | Notes                                                  |
|--------------------|----------|-----------------|--------------------------------------------------------|
| [amqp10][35]       | `>=3`    | Fully Supported | Supports AMQP 1.0 brokers (i.e. ActiveMQ, Apache Qpid) |
| [amqplib][36]      | `>=0.5`  | Fully Supported | Supports AMQP 0.9 brokers (i.e. RabbitMQ, Apache Qpid) |
| [generic-pool][37] | `>=2`    | Fully Supported |                                                        |
| [kafka-node][38]   |          | Coming Soon     |                                                        |
| [rhea][39]         |          | Coming Soon     |                                                        |

#### Promise Library Compatibility

| Module           | Versions  | Support Type    |
|------------------|-----------|-----------------|
| [bluebird][40]   | `>=2`     | Fully Supported |
| [promise][41]    | `>=7`     | Fully Supported |
| [promise-js][42] | `>=0.0.3` | Fully Supported |
| [q][43]          | `>=1`     | Fully Supported |
| [when][44]       | `>=3`     | Fully Supported |

#### Logger Compatibility

| Module           | Versions  | Support Type    |
|------------------|-----------|-----------------|
| [bunyan][45]     | `>=1`     | Fully Supported |
| [paperplane][46] | `>=2.3.2` | Fully Supported |
| [pino][47]       | `>=2`     | Fully Supported |
| [winston][48]    | `>=1`     | Fully Supported |

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
[10]: https://github.com/senchalabs/connect
[11]: https://expressjs.com
[12]: https://expressjs.com/en/resources/frameworks.html
[13]: https://www.fastify.io
[14]: https://github.com/graphql/graphql-js
[15]: https://hapijs.com
[16]: https://koajs.com
[17]: https://github.com/articulate/paperplane
[18]: https://github.com/articulate/paperplane/blob/master/docs/API.md#serverless-deployment
[19]: http://restify.com
[20]: https://nodejs.org/api/dns.html
[21]: https://nodejs.org/api/http.html
[22]: https://nodejs.org/api/https.html
[23]: https://nodejs.org/api/net.html
[24]: https://github.com/datastax/nodejs-driver
[25]: https://github.com/elastic/elasticsearch-js
[26]: https://github.com/luin/ioredis
[27]: https://knexjs.org
[28]: https://github.com/3rd-Eden/memcached
[29]: http://mongodb.github.io/node-mongodb-native/core
[30]: https://github.com/mysqljs/mysql
[31]: https://github.com/sidorares/node-mysql2
[32]: https://node-postgres.com
[33]: https://github.com/NodeRedis/node_redis
[34]: http://tediousjs.github.io/tedious
[35]: https://github.com/noodlefrenzy/node-amqp10
[36]: https://github.com/squaremo/amqp.node
[37]: https://github.com/coopernurse/node-pool
[38]: https://github.com/SOHU-Co/kafka-node
[39]: https://github.com/amqp/rhea
[40]: https://github.com/petkaantonov/bluebird
[41]: https://github.com/then/promise
[42]: https://github.com/kevincennis/promise
[43]: https://github.com/kriskowal/q
[44]: https://github.com/cujojs/when
[45]: https://github.com/trentm/node-bunyan
[46]: https://github.com/articulate/paperplane/blob/master/docs/API.md#logger
[47]: http://getpino.io
[48]: https://github.com/winstonjs/winston
