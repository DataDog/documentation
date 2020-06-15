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
    - link: 'https://github.com/DataDog/dd-trace-js'
      tag: 'GitHub'
      text: 'Source code'
    - link: 'https://datadog.github.io/dd-trace-js'
      tag: 'Documentation'
      text: 'API documentation'
    - link: 'tracing/visualization/'
      tag: 'Use the APM UI'
      text: 'Explore your services, resources and traces'
    - link: 'tracing/'
      tag: 'Advanced Usage'
      text: 'Advanced Usage'
---

## Installation And Getting Started

If you already have a Datadog account you can find [step-by-step instructions][1] in our in-app guides for either host-based or container-based set ups.

For descriptions of terminology used in APM, take a look at the [official documentation][2].

For details about configuration and using the API, see Datadog's [API documentation][3].

For details about contributing, check out the [development guide][4].

### Quickstart

<div class="alert alert-warning">
This library <strong>MUST</strong> be imported and initialized before any instrumented module. When using a transpiler, you <strong>MUST</strong> import and initialize the tracer library in an external file and then import that file as a whole when building your application. This prevents hoisting and ensures that the tracer library gets imported and initialized before importing any other instrumented module.
</div>

To begin tracing Node.js applications, first [install and configure the Datadog Agent][5], see the additional documentation for [tracing Docker applications][6] or [Kubernetes applications][7].

Next, install the Datadog Tracing library using npm:

```sh
npm install --save dd-trace
```

Finally, import and initialize the tracer:

##### JavaScript

```js
// This line must come before importing any instrumented module.
const tracer = require('dd-trace').init();
```

##### TypeScript

```typescript
// server.ts
import './tracer'; // must come before importing any instrumented module.

// tracer.ts
import tracer from 'dd-trace';
tracer.init(); // initialized in a different file to avoid hoisting.
export default tracer;
```

See the [tracer settings][8] for the list of initialization options.

## Configuration

Tracer settings can be configured as a parameter to the `init()` method or as environment variables.

### Tagging

| Config         | Environment Variable         | Default     | Description                                                                                                                                                                                                                                                                |
| -------------- | ---------------------------- | ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| env            | `DD_ENV`                     | `null`      | Set an application's environment e.g. `prod`, `pre-prod`, `stage`, etc.                                                                                                                                                                                                    |
| service        | `DD_SERVICE`            | `null`      | The service name to be used for this program.                                                                                                                                                                                                                              |
| version        | `DD_VERSION`            | `null`      | The version number of the application. Defaults to value of the version field in package.json.
| tags           | `DD_TAGS`                    | `{}`        | Set global tags that should be applied to all spans and metrics. When passed as an environment variable, the format is `key:value, key:value`.                                                                                                                             |

It is recommended that you use `DD_ENV`, `DD_SERVICE`, and `DD_VERSION` to set `env`, `service`, and `version` for your services. Review the [Unified Service Tagging][9] documentation for recommendations on how to configure these environment variables.

### Instrumentation

| Config         | Environment Variable         | Default     | Description                                                                                                                                                                                                                                                                |
| -------------- | ---------------------------- | ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| enabled        | `DD_TRACE_ENABLED`           | `true`      | Whether to enable the tracer.                                                                                                                                                                                                                                              |
| debug          | `DD_TRACE_DEBUG`             | `false`     | Enable debug logging in the tracer.                                                                                                                                                                                                                                        |
                                                                               |
| url            | `DD_TRACE_AGENT_URL`         | `null`      | The URL of the Trace Agent that the tracer submits to. Takes priority over hostname and port, if set. Supports Unix Domain Sockets in combination with the `apm_config.receiver_socket` in your `datadog.yaml` file, or the `DD_APM_RECEIVER_SOCKET` environment variable. |
| hostname       | `DD_TRACE_AGENT_HOSTNAME`    | `localhost` | The address of the Agent that the tracer submits to.                                                                                                                                                                                                                       |
| port           | `DD_TRACE_AGENT_PORT`        | `8126`      | The port of the Trace Agent that the tracer submits to.                                                                                                                                                                                                                    |
| dogstatsd.port | `DD_DOGSTATSD_PORT`          | `8125`      | The port of the DogStatsD Agent that metrics are submitted to.                                                                                                                                                                                                             |
| logInjection   | `DD_LOGS_INJECTION`          | `false`     | Enable automatic injection of trace IDs in logs for supported logging libraries.                                                                                                                                                                                           |
| sampleRate     | -                            | `1`         | Percentage of spans to sample as a float between `0` and `1`.                                                                                                                                                                                                              |
| flushInterval  | -                            | `2000`      | Interval (in milliseconds) at which the tracer submits traces to the Agent.                                                                                                                                                                                                |
| runtimeMetrics | `DD_RUNTIME_METRICS_ENABLED` | `false`     | Whether to enable capturing runtime metrics. Port `8125` (or configured with `dogstatsd.port`) must be opened on the Agent for UDP.                                                                                                                                        |
| reportHostname | `DD_TRACE_REPORT_HOSTNAME`   | `false`     | Whether to report the system's hostname for each trace. When disabled, the hostname of the Agent is used instead.                                                                                                                                                          |
| experimental   | -                            | `{}`        | Experimental features can be enabled all at once using Boolean true or individually using key/value pairs. [Contact support][10] to learn more about the available experimental features.                                                                                   |
| plugins        | -                            | `true`      | Whether or not to enable automatic instrumentation of external libraries using the built-in plugins.                                                                                                                                                                       |
| clientToken    | `DD_CLIENT_TOKEN`            | `null`      | Client token for browser tracing. Can be generated in Datadog in **Integrations** -> **APIs**.                                                                                                                                                                             |
| logLevel       | `DD_TRACE_LOG_LEVEL`         | `debug`     | A string for the minimum log level for the tracer to use when debug logging is enabled, e.g. `error`, `debug`.                                                                                                                                                             |

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

APM provides out-of-the-box instrumentation for many popular frameworks and libraries by using a plugin system. If you would like support for a module that is not listed, [contact support][10] to share a request.

For details about how to how to toggle and configure plugins, check out the [API documentation][11].

#### Web Framework Compatibility

| Module                  | Versions | Support Type    | Notes                                      |
| ----------------------- | -------- | --------------- | ------------------------------------------ |
| [connect][12]           | `>=2`    | Fully supported |                                            |
| [express][13]           | `>=4`    | Fully supported | Supports Sails, Loopback, and [more][14]   |
| [fastify][15]           | `>=1`    | Fully supported |                                            |
| [graphql][16]           | `>=0.10` | Fully supported | Supports Apollo Server and express-graphql |
| [gRPC][17]              | `>=1.13` | Fully supported |                                            |
| [hapi][18]              | `>=2`    | Fully supported | Supports [@hapi/hapi] versions `>=17.9`    |
| [koa][19]               | `>=2`    | Fully supported |                                            |
| [microgateway-core][20] | `>=2.1`  | Fully supported | Core library for Apigee Edge. Support for the [edgemicro][21] CLI requires static patching using [@datadog/cli][22]. |
| [paperplane][23]        | `>=2.3`  | Fully supported | Not supported in [serverless-mode][24]     |
| [restify][25]           | `>=3`    | Fully supported |                                            |

#### Native Module Compatibility

| Module      | Support Type        | Notes |
| ----------- | ------------------- | ------------------------------------------ |
| [dns][26]   | Fully supported     |       |
| [fs][27]    | Fully supported     |       |
| [http][28]  | Fully supported     |       |
| [https][29] | Fully supported     |       |
| [http2][30] | Partially supported | Only HTTP2 clients are currently supported and not servers. |
| [net][31]   | Fully supported     |       |

#### Data Store Compatibility

| Module                 | Versions | Support Type    | Notes                                            |
| ---------------------- | -------- | --------------- | ------------------------------------------------ |
| [cassandra-driver][32] | `>=3`    | Fully supported |                                                  |
| [couchbase][33]        | `^2.4.2` | Fully supported |                                                  |
| [elasticsearch][34]    | `>=10`   | Fully supported | Supports `@elastic/elasticsearch` versions `>=5` |
| [ioredis][35]          | `>=2`    | Fully supported |                                                  |
| [knex][36]             | `>=0.8`  | Fully supported | This integration is only for context propagation |
| [memcached][37]        | `>=2.2`  | Fully supported |                                                  |
| [mongodb-core][38]     | `>=2`    | Fully supported | Supports Mongoose                                |
| [mysql][39]            | `>=2`    | Fully supported |                                                  |
| [mysql2][40]           | `>=1`    | Fully supported |                                                  |
| [pg][41]               | `>=4`    | Fully supported | Supports `pg-native` when used with `pg`         |
| [redis][42]            | `>=0.12` | Fully supported |                                                  |
| [tedious][43]          | `>=1`    | Fully supported | SQL Server driver for `mssql` and `sequelize`    |

#### Worker Compatibility

| Module                     | Versions | Support Type    | Notes                                                  |
| -------------------------- | -------- | --------------- | ------------------------------------------------------ |
| [@google-cloud/pubsub][44] | `>=1.2`  | Fully supported |                                                        |
| [amqp10][45]               | `>=3`    | Fully supported | Supports AMQP 1.0 brokers (i.e. ActiveMQ, Apache Qpid) |
| [amqplib][46]              | `>=0.5`  | Fully supported | Supports AMQP 0.9 brokers (i.e. RabbitMQ, Apache Qpid) |
| [generic-pool][47]         | `>=2`    | Fully supported |                                                        |
| [kafka-node][48]           |          | Coming Soon     |                                                        |
| [rhea][49]                 | `>=1`    | Fully supported |                                                        |

#### SDK Compatibility

| Module             | Versions   | Support Type    | Notes                                                  |
| ------------------ | ---------- | --------------- | ------------------------------------------------------ |
| [aws-sdk][50]      | `>=2.1.35` | Fully supported | CloudWatch, DynamoDB, Kinesis, Redshift, S3, SNS, SQS, and generic requests. |

#### Promise Library Compatibility

| Module           | Versions  | Support Type    |
| ---------------- | --------- | --------------- |
| [bluebird][51]   | `>=2`     | Fully supported |
| [promise][52]    | `>=7`     | Fully supported |
| [promise-js][53] | `>=0.0.3` | Fully supported |
| [q][54]          | `>=1`     | Fully supported |
| [when][55]       | `>=3`     | Fully supported |

#### Logger Compatibility

| Module           | Versions  | Support Type    |
| ---------------- | --------- | --------------- |
| [bunyan][56]     | `>=1`     | Fully supported |
| [paperplane][57] | `>=2.3.2` | Fully supported |
| [pino][58]       | `>=2`     | Fully supported |
| [winston][59]    | `>=1`     | Fully supported |

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/apm/install
[2]: /tracing/visualization/
[3]: https://datadog.github.io/dd-trace-js
[4]: https://github.com/DataDog/dd-trace-js/blob/master/README.md#development
[5]: /tracing/send_traces/
[6]: /tracing/setup/docker/
[7]: /agent/kubernetes/apm/
[8]: https://datadog.github.io/dd-trace-js/#tracer-settings
[9]: /getting_started/tagging/unified_service_tagging
[10]: /help/
[11]: https://datadog.github.io/dd-trace-js/#integrations
[12]: https://github.com/senchalabs/connect
[13]: https://expressjs.com
[14]: https://expressjs.com/en/resources/frameworks.html
[15]: https://www.fastify.io
[16]: https://github.com/graphql/graphql-js
[17]: https://grpc.io/
[18]: https://hapijs.com
[19]: https://koajs.com
[20]: https://github.com/apigee/microgateway-core
[21]: https://github.com/apigee-internal/microgateway
[22]: https://www.npmjs.com/package/@datadog/cli
[23]: https://github.com/articulate/paperplane
[24]: https://github.com/articulate/paperplane/blob/master/docs/API.md#serverless-deployment
[25]: http://restify.com
[26]: https://nodejs.org/api/dns.html
[27]: https://nodejs.org/api/fs.html
[28]: https://nodejs.org/api/http.html
[29]: https://nodejs.org/api/https.html
[30]: https://nodejs.org/api/http2.html
[31]: https://nodejs.org/api/net.html
[32]: https://github.com/datastax/nodejs-driver
[33]: https://github.com/couchbase/couchnode
[34]: https://github.com/elastic/elasticsearch-js
[35]: https://github.com/luin/ioredis
[36]: https://knexjs.org
[37]: https://github.com/3rd-Eden/memcached
[38]: http://mongodb.github.io/node-mongodb-native/core
[39]: https://github.com/mysqljs/mysql
[40]: https://github.com/sidorares/node-mysql2
[41]: https://node-postgres.com
[42]: https://github.com/NodeRedis/node_redis
[43]: http://tediousjs.github.io/tedious
[44]: https://github.com/googleapis/nodejs-pubsub
[45]: https://github.com/noodlefrenzy/node-amqp10
[46]: https://github.com/squaremo/amqp.node
[47]: https://github.com/coopernurse/node-pool
[48]: https://github.com/SOHU-Co/kafka-node
[49]: https://github.com/amqp/rhea
[50]: https://github.com/aws/aws-sdk-js
[51]: https://github.com/petkaantonov/bluebird
[52]: https://github.com/then/promise
[53]: https://github.com/kevincennis/promise
[54]: https://github.com/kriskowal/q
[55]: https://github.com/cujojs/when
[56]: https://github.com/trentm/node-bunyan
[57]: https://github.com/articulate/paperplane/blob/master/docs/API.md#logger
[58]: http://getpino.io
[59]: https://github.com/winstonjs/winston
