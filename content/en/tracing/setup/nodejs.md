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
- link: "tracing/"
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

## Configuration

Tracer settings can be configured as a parameter to the `init()` method or as environment variables.

| Config         | Environment Variable         | Default     | Description                                                                                                                                                                              |
|----------------|------------------------------|-------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| enabled        | `DD_TRACE_ENABLED`           | `true`      | Whether to enable the tracer.                                                                                                                                                            |
| debug          | `DD_TRACE_DEBUG`             | `false`     | Enable debug logging in the tracer.                                                                                                                                                      |
| service        | `DD_SERVICE_NAME`            | `null`      | The service name to be used for this program.                                                                                                                                            |
| url            | `DD_TRACE_AGENT_URL`         | `null`      | The URL of the Trace Agent that the tracer submits to. Takes priority over hostname and port, if set.                                                                                    |
| hostname       | `DD_TRACE_AGENT_HOSTNAME`    | `localhost` | The address of the Agent that the tracer submits to.                                                                                                                                     |
| port           | `DD_TRACE_AGENT_PORT`        | `8126`      | The port of the Trace Agent that the tracer submits to.                                                                                                                                  |
| dogstatsd.port | `DD_DOGSTATSD_PORT`          | `8125`      | The port of the DogStatsD Agent that metrics are submitted to.                                                                                                                           |
| env            | `DD_ENV`                     | `null`      | Set an application's environment e.g. `prod`, `pre-prod`, `stage`, etc.                                                                                                                  |
| logInjection   | `DD_LOGS_INJECTION`          | `false`     | Enable automatic injection of trace IDs in logs for supported logging libraries.                                                                                                         |
| tags           | `DD_TAGS`                    | `{}`        | Set global tags that should be applied to all spans and metrics. When passed as an environment variable, the format is `key:value, key:value`.                                           |
| sampleRate     | -                            | `1`         | Percentage of spans to sample as a float between `0` and `1`.                                                                                                                            |
| flushInterval  | -                            | `2000`      | Interval (in milliseconds) at which the tracer submits traces to the Agent.                                                                                                              |
| runtimeMetrics | `DD_RUNTIME_METRICS_ENABLED` | `false`     | Whether to enable capturing runtime metrics. Port `8125` (or configured with `dogstatsd.port`) must be opened on the Agent for UDP.                                                      |
| reportHostname | `DD_TRACE_REPORT_HOSTNAME`   | `false`     | Whether to report the system's hostname for each trace. When disabled, the hostname of the Agent is used instead.                                                                        |
| experimental   | -                            | `{}`        | Experimental features can be enabled all at once using Boolean true or individually using key/value pairs. [Contact support][8] to learn more about the available experimental features. |
| plugins        | -                            | `true`      | Whether or not to enable automatic instrumentation of external libraries using the built-in plugins.                                                                                     |
| clientToken    | `DD_CLIENT_TOKEN`            | `null`      | Client token for browser tracing. Can be generated in Datadog in **Integrations** -> **APIs**.                                                                                           |
| logLevel       | `DD_TRACE_LOG_LEVEL`         | `debug`     | A string for the minimum log level for the tracer to use when debug logging is enabled, e.g. `error`, `debug`.                                                                           |

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
| [connect][10]    | `>=2`    | Fully supported |                                            |
| [express][11]    | `>=4`    | Fully supported | Supports Sails, Loopback, and [more][12]   |
| [fastify][13]    | `>=1`    | Fully supported |                                            |
| [graphql][14]    | `>=0.10` | Fully supported | Supports Apollo Server and express-graphql |
| [gRPC][15]       | `>=1.13` | Fully supported |                                            |
| [hapi][16]       | `>=2`    | Fully supported |                                            |
| [koa][17]        | `>=2`    | Fully supported |                                            |
| [paperplane][18] | `>=2.3`  | Fully supported | Not supported in [serverless-mode][19]     |
| [restify][20]    | `>=3`    | Fully supported |                                            |

#### Native Module Compatibility

| Module      | Support Type    |
|-------------|-----------------|
| [dns][21]   | Fully supported |
| [http][22]  | Fully supported |
| [https][23] | Fully supported |
| [net][24]   | Fully supported |

#### Data Store Compatibility

| Module                 | Versions | Support Type    | Notes                                            |
|------------------------|----------|-----------------|--------------------------------------------------|
| [cassandra-driver][25] | `>=3`    | Fully supported |                                                  |
| [couchbase][26]        | `^2.4.2` | Fully supported |                                                  |
| [elasticsearch][27]    | `>=10`   | Fully supported | Supports `@elastic/elasticsearch` versions `>=5` |
| [ioredis][28]          | `>=2`    | Fully supported |                                                  |
| [knex][29]             | `>=0.8`  | Fully supported | This integration is only for context propagation |
| [memcached][30]        | `>=2.2`  | Fully supported |                                                  |
| [mongodb-core][31]     | `>=2`    | Fully supported | Supports Mongoose                                |
| [mysql][32]            | `>=2`    | Fully supported |                                                  |
| [mysql2][33]           | `>=1`    | Fully supported |                                                  |
| [pg][34]               | `>=4`    | Fully supported | Supports `pg-native` when used with `pg`         |
| [redis][35]            | `>=0.12` | Fully supported |                                                  |
| [tedious][36]          | `>=1`    | Fully supported | SQL Server driver for `mssql` and `sequelize`    |

#### Worker Compatibility

| Module             | Versions | Support Type    | Notes                                                  |
|--------------------|----------|-----------------|--------------------------------------------------------|
| [amqp10][37]       | `>=3`    | Fully supported | Supports AMQP 1.0 brokers (i.e. ActiveMQ, Apache Qpid) |
| [amqplib][38]      | `>=0.5`  | Fully supported | Supports AMQP 0.9 brokers (i.e. RabbitMQ, Apache Qpid) |
| [generic-pool][39] | `>=2`    | Fully supported |                                                        |
| [kafka-node][40]   |          | Coming Soon     |                                                        |
| [rhea][41]         |          | Coming Soon     |                                                        |

#### Promise Library Compatibility

| Module           | Versions  | Support Type    |
|------------------|-----------|-----------------|
| [bluebird][42]   | `>=2`     | Fully supported |
| [promise][43]    | `>=7`     | Fully supported |
| [promise-js][44] | `>=0.0.3` | Fully supported |
| [q][45]          | `>=1`     | Fully supported |
| [when][46]       | `>=3`     | Fully supported |

#### Logger Compatibility

| Module           | Versions  | Support Type    |
|------------------|-----------|-----------------|
| [bunyan][47]     | `>=1`     | Fully supported |
| [paperplane][48] | `>=2.3.2` | Fully supported |
| [pino][49]       | `>=2`     | Fully supported |
| [winston][50]    | `>=1`     | Fully supported |

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/visualization
[2]: https://datadog.github.io/dd-trace-js
[3]: https://github.com/DataDog/dd-trace-js/blob/master/README.md#development
[4]: /tracing/send_traces
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
[15]: https://grpc.io/
[16]: https://hapijs.com
[17]: https://koajs.com
[18]: https://github.com/articulate/paperplane
[19]: https://github.com/articulate/paperplane/blob/master/docs/API.md#serverless-deployment
[20]: http://restify.com
[21]: https://nodejs.org/api/dns.html
[22]: https://nodejs.org/api/http.html
[23]: https://nodejs.org/api/https.html
[24]: https://nodejs.org/api/net.html
[25]: https://github.com/datastax/nodejs-driver
[26]: https://github.com/couchbase/couchnode
[27]: https://github.com/elastic/elasticsearch-js
[28]: https://github.com/luin/ioredis
[29]: https://knexjs.org
[30]: https://github.com/3rd-Eden/memcached
[31]: http://mongodb.github.io/node-mongodb-native/core
[32]: https://github.com/mysqljs/mysql
[33]: https://github.com/sidorares/node-mysql2
[34]: https://node-postgres.com
[35]: https://github.com/NodeRedis/node_redis
[36]: http://tediousjs.github.io/tedious
[37]: https://github.com/noodlefrenzy/node-amqp10
[38]: https://github.com/squaremo/amqp.node
[39]: https://github.com/coopernurse/node-pool
[40]: https://github.com/SOHU-Co/kafka-node
[41]: https://github.com/amqp/rhea
[42]: https://github.com/petkaantonov/bluebird
[43]: https://github.com/then/promise
[44]: https://github.com/kevincennis/promise
[45]: https://github.com/kriskowal/q
[46]: https://github.com/cujojs/when
[47]: https://github.com/trentm/node-bunyan
[48]: https://github.com/articulate/paperplane/blob/master/docs/API.md#logger
[49]: http://getpino.io
[50]: https://github.com/winstonjs/winston
