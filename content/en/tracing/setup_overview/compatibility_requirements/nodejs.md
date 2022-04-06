---
title: NodeJS Compatibility Requirements
kind: documentation
description: 'Compatibility Requirements for the NodeJS tracer'
aliases:
  - /tracing/compatibility_requirements/nodejs
code_lang: nodejs
type: multi-code-lang
code_lang_weight: 40
further_reading:
    - link: 'tracing/setup/nodejs'
      tag: 'Documentation'
      text: 'Instrument Your Application'
---

## Runtime support policy for Node.js APM

Datadog APM for Node.js is built upon dependencies defined in specific versions of the host operating system, Node.js runtime, certain Node.js libraries, and the Datadog Agent/API. When these versions are no longer supported by their maintainers, Datadog APM for Node.js limits its support for these as well.

## Levels of support

| **Level**                                              | **Support provided**                                                                                                                                                          |
|--------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| <span id="support-unsupported">Unsupported</span>      |  No implementation. [Contact our customer support team for special requests.](https://www.datadoghq.com/support/)                                                             |
| <span id="support-ga">General Availability (GA)</span> |  Full implementation of all features. Full support for new features, bug & security fixes.                                                                                    |
| <span id="support-eol">End-of-life (EOL)</span>        |  Support for bug & security fixes for one year after inital EOL date, after which it becomes [Unsupported](#support-unsupported).|

## Package versioning

Datadog APM for Node.js practices [semantic versioning](https://semver.org/).

As this relates to downgrading runtime support, it implies:

  - **Major version updates** (for example `1.0.0` to `2.0.0`) may change support for any runtime from [GA](#support-ga) to [EOL](#support-eol)
  - **Minor version updates** (for example `1.0.0` to `1.1.0`) won't lower our level of support for one runtime but may add support for one.
  - **Patch version updates** (for example `1.0.0` to `1.0.1`) will not change support for any runtime.

## Supported Node.js runtimes

| **Node.js version**| **Support level**                       | **Package version** |
|--------------------|-----------------------------------------|---------------------|
| v17                | [GA](#support-ga)                       | 1.0.0 - 2           |  
| v16                | [GA](#support-ga)                       | 1.0.0 - 2           |
| v14                | [GA](#support-ga)                       | 1.0.0 - 2           |
| v12                | [GA](#support-ga)                       | 1.0.0 - 2           |
| v10                | [EOL](#support-eol)                     | 0.14 - 0.36         |
| v8                 | [Unsupported](#support-unsupported)     | 0.14 - 0.36         |
| v6                 | [Unsupported](#support-unsupported)     | <= 0.13             |
| v4                 | [Unsupported](#support-unsupported)     | <= 0.13             |

## Supported operating systems

| **OS**       | **Support level**     | **Package version** |
|--------------|-----------------------|---------------------|
| Linux        | [GA](#support-ga)     | all                 |
| MacOS        | [GA](#support-ga)     | all                 |
| Windows      | [GA](#support-ga)     | all                 |

## Supported Datadog Agent versions

| **Datadog Agent version**                                                | **Package version** |
|--------------------------------------------------------------------------|---------------------|
| [7.x](https://docs.datadoghq.com/agent/basic_agent_usage/?tab=agentv6v7) | Latest              |
| [6.x](https://docs.datadoghq.com/agent/basic_agent_usage/?tab=agentv6v7) | Latest              |
| [5.x](https://docs.datadoghq.com/agent/basic_agent_usage/?tab=agentv5)   | Latest              |

## Additional resources

- [Datadog Customer support](https://www.datadoghq.com/support/)
- [Datadog APM for Node.js Setup Documentation](https://docs.datadoghq.com/tracing/setup_overview/setup/nodejs/)
- [Datadog APM for Node.js GitHub repository](https://github.com/DataDog/dd-trace-js)

## Supported integrations

APM provides out-of-the-box instrumentation for many popular frameworks and libraries by using a plugin system. To request support for a module that is not listed, contact our awesome [support team][3].

For details about how to how to toggle and configure plugins, check out the [API documentation][5].

### Web framework compatibility

| Module                  | Versions | Support Type    | Notes                                      |
| ----------------------- | -------- | --------------- | ------------------------------------------ |
| [connect][6]           | `>=2`    | Fully supported |                                            |
| [express][7]           | `>=4`    | Fully supported | Supports Sails, Loopback, and [more][8]   |
| [fastify][9]           | `>=1`    | Fully supported |                                            |
| [graphql][10]           | `>=0.10` | Fully supported | Supports Apollo Server and express-graphql |
| [gRPC][11]              | `>=1.13` | Fully supported |                                            |
| [hapi][12]              | `>=2`    | Fully supported | Supports [@hapi/hapi] versions `>=17.9`    |
| [koa][13]               | `>=2`    | Fully supported |                                            |
| [microgateway-core][14] | `>=2.1`  | Fully supported | Core library for Apigee Edge. Support for the [edgemicro][15] CLI requires static patching using [@datadog/cli][16]. |
| [moleculer][17]         | `>=0.14` | Fully supported |                                            |
| [next][18]              | `>=9.5`  | Fully supported | CLI usage requires `NODE_OPTIONS='-r dd-trace/init'`. |
| [paperplane][19]        | `>=2.3`  | Fully supported | Not supported in [serverless-mode][20]     |
| [restify][21]           | `>=3`    | Fully supported |                                            |

### Native module compatibility

| Module      | Support Type        | Notes |
| ----------- | ------------------- | ------------------------------------------ |
| [dns][22]   | Fully supported     |       |
| [fs][23]    | Fully supported     |       |
| [http][24]  | Fully supported     |       |
| [https][25] | Fully supported     |       |
| [http2][26] | Partially supported | Only HTTP2 clients are currently supported and not servers. |
| [net][27]   | Fully supported     |       |

### Data store compatibility

| Module                 | Versions | Support Type    | Notes                                            |
| ---------------------- | -------- | --------------- | ------------------------------------------------ |
| [cassandra-driver][28] | `>=3`    | Fully supported |                                                  |
| [couchbase][29]        | `^2.4.2` | Fully supported |                                                  |
| [elasticsearch][30]    | `>=10`   | Fully supported | Supports `@elastic/elasticsearch` versions `>=5` |
| [ioredis][31]          | `>=2`    | Fully supported |                                                  |
| [knex][32]             | `>=0.8`  | Fully supported | This integration is only for context propagation |
| [memcached][33]        | `>=2.2`  | Fully supported |                                                  |
| [mongodb-core][34]     | `>=2`    | Fully supported | Supports Mongoose                                |
| [mysql][35]            | `>=2`    | Fully supported |                                                  |
| [mysql2][36]           | `>=1`    | Fully supported |                                                  |
| [oracledb][37]         | `>=5`    | Fully supported |                                                  |
| [pg][38]               | `>=4`    | Fully supported | Supports `pg-native` when used with `pg`         |
| [redis][39]            | `>=0.12` | Fully supported |                                                  |
| [sharedb][40]          | `>=1`    | Fully supported |                                                  |
| [tedious][41]          | `>=1`    | Fully supported | SQL Server driver for `mssql` and `sequelize`    |

### Worker compatibility

| Module                     | Versions | Support Type    | Notes                                                  |
| -------------------------- | -------- | --------------- | ------------------------------------------------------ |
| [@google-cloud/pubsub][42] | `>=1.2`  | Fully supported |                                                        |
| [amqp10][43]               | `>=3`    | Fully supported | Supports AMQP 1.0 brokers (such as ActiveMQ, or Apache Qpid) |
| [amqplib][44]              | `>=0.5`  | Fully supported | Supports AMQP 0.9 brokers (such as RabbitMQ, or Apache Qpid) |
| [generic-pool][45]         | `>=2`    | Fully supported |                                                        |
| [kafkajs][46]         | `>=1.4`    | Fully supported |                                                        |
| [kafka-node][47]           |          | Coming Soon     |                                                        |
| [rhea][48]                 | `>=1`    | Fully supported |                                                        |

### SDK compatibility

| Module             | Versions   | Support Type    | Notes                                                  |
| ------------------ | ---------- | --------------- | ------------------------------------------------------ |
| [aws-sdk][49]      | `>=2.1.35` | Fully supported | CloudWatch, DynamoDB, Kinesis, Redshift, S3, SNS, SQS, and generic requests. |

### Promise library compatibility

| Module           | Versions  | Support Type    |
| ---------------- | --------- | --------------- |
| [bluebird][50]   | `>=2`     | Fully supported |
| [promise][51]    | `>=7`     | Fully supported |
| [promise-js][52] | `>=0.0.3` | Fully supported |
| [q][53]          | `>=1`     | Fully supported |
| [when][54]       | `>=3`     | Fully supported |

### Logger compatibility

| Module           | Versions  | Support Type    |
| ---------------- | --------- | --------------- |
| [bunyan][55]     | `>=1`     | Fully supported |
| [paperplane][56] | `>=2.3.2` | Fully supported |
| [pino][57]       | `>=2`     | Fully supported |
| [winston][58]    | `>=1`     | Fully supported |

## Unsupported libraries

### Fibers

[`fibers`][59] is incompatible with `async_hooks`, a Node.js [module][60] that is used by `dd-trace-js` to track asynchronous contexts thereby ensuring accurate tracing. Interactions between `fibers` and `async_hooks` may lead to unpreventable crashes and undefined behavior. So, the use of `dd-trace-js` with applications that invoke `fibers` directly or indirectly through frameworks such as [Meteor][61] may result in instability (crashes) or incorrect tracing.

For additional information or to discuss [leave a comment on this github issue][62] or [reach out to support][3] to discuss further.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://semver.org/
[2]: https://github.com/DataDog/dd-trace-js/releases
[3]: /help/
[4]: https://nodejs.org/en/about/releases/
[5]: https://datadog.github.io/dd-trace-js/#integrations
[6]: https://github.com/senchalabs/connect
[7]: https://expressjs.com
[8]: https://expressjs.com/en/resources/frameworks.html
[9]: https://www.fastify.io
[10]: https://github.com/graphql/graphql-js
[11]: https://grpc.io/
[12]: https://hapijs.com
[13]: https://koajs.com
[14]: https://github.com/apigee/microgateway-core
[15]: https://github.com/apigee-internal/microgateway
[16]: https://www.npmjs.com/package/@datadog/cli
[17]: https://moleculer.services/
[18]: https://nextjs.org/
[19]: https://github.com/articulate/paperplane
[20]: https://github.com/articulate/paperplane/blob/master/docs/API.md#serverless-deployment
[21]: http://restify.com
[22]: https://nodejs.org/api/dns.html
[23]: https://nodejs.org/api/fs.html
[24]: https://nodejs.org/api/http.html
[25]: https://nodejs.org/api/https.html
[26]: https://nodejs.org/api/http2.html
[27]: https://nodejs.org/api/net.html
[28]: https://github.com/datastax/nodejs-driver
[29]: https://github.com/couchbase/couchnode
[30]: https://github.com/elastic/elasticsearch-js
[31]: https://github.com/luin/ioredis
[32]: https://knexjs.org
[33]: https://github.com/3rd-Eden/memcached
[34]: http://mongodb.github.io/node-mongodb-native/core
[35]: https://github.com/mysqljs/mysql
[36]: https://github.com/sidorares/node-mysql2
[37]: https://oracle.github.io/node-oracledb/
[38]: https://node-postgres.com
[39]: https://github.com/NodeRedis/node_redis
[40]: https://share.github.io/sharedb/
[41]: http://tediousjs.github.io/tedious
[42]: https://github.com/googleapis/nodejs-pubsub
[43]: https://github.com/noodlefrenzy/node-amqp10
[44]: https://github.com/squaremo/amqp.node
[45]: https://github.com/coopernurse/node-pool
[46]: https://github.com/tulios/kafkajs
[47]: https://github.com/SOHU-Co/kafka-node
[48]: https://github.com/amqp/rhea
[49]: https://github.com/aws/aws-sdk-js
[50]: https://github.com/petkaantonov/bluebird
[51]: https://github.com/then/promise
[52]: https://github.com/kevincennis/promise
[53]: https://github.com/kriskowal/q
[54]: https://github.com/cujojs/when
[55]: https://github.com/trentm/node-bunyan
[56]: https://github.com/articulate/paperplane/blob/master/docs/API.md#logger
[57]: http://getpino.io
[58]: https://github.com/winstonjs/winston
[59]: https://github.com/laverdet/node-fibers
[60]: https://nodejs.org/api/async_hooks.html
[61]: https://www.meteor.com/
[62]: https://github.com/DataDog/dd-trace-js/issues/1229
