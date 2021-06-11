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
## Compatibility

The NodeJS Datadog Trace library is open source - view the [Github repository][1] for more information.

Node `>=8` is supported by this library. Even numbered versions like 8.x and 10.x are officially supported. Odd versions like 9.x and 11.x should work but are not officially supported.

## Supported integrations

APM provides out-of-the-box instrumentation for many popular frameworks and libraries by using a plugin system. To request support for a module that is not listed, contact our awesome [support team][2].

For details about how to how to toggle and configure plugins, check out the [API documentation][3].

### Web framework compatibility

| Module                  | Versions | Support Type    | Notes                                      |
| ----------------------- | -------- | --------------- | ------------------------------------------ |
| [connect][4]           | `>=2`    | Fully supported |                                            |
| [express][5]           | `>=4`    | Fully supported | Supports Sails, Loopback, and [more][6]   |
| [fastify][7]           | `>=1`    | Fully supported |                                            |
| [graphql][8]           | `>=0.10` | Fully supported | Supports Apollo Server and express-graphql |
| [gRPC][9]              | `>=1.13` | Fully supported |                                            |
| [hapi][10]              | `>=2`    | Fully supported | Supports [@hapi/hapi] versions `>=17.9`    |
| [koa][11]               | `>=2`    | Fully supported |                                            |
| [microgateway-core][12] | `>=2.1`  | Fully supported | Core library for Apigee Edge. Support for the [edgemicro][13] CLI requires static patching using [@datadog/cli][14]. |
| [next][15]              | `>=9.5`  | Fully supported | CLI usage requires `NODE_OPTIONS='-r dd-trace/init'`. |
| [paperplane][16]        | `>=2.3`  | Fully supported | Not supported in [serverless-mode][17]     |
| [restify][18]           | `>=3`    | Fully supported |                                            |

### Native module compatibility

| Module      | Support Type        | Notes |
| ----------- | ------------------- | ------------------------------------------ |
| [dns][19]   | Fully supported     |       |
| [fs][20]    | Fully supported     |       |
| [http][21]  | Fully supported     |       |
| [https][22] | Fully supported     |       |
| [http2][23] | Partially supported | Only HTTP2 clients are currently supported and not servers. |
| [net][24]   | Fully supported     |       |

### Data store compatibility

| Module                 | Versions | Support Type    | Notes                                            |
| ---------------------- | -------- | --------------- | ------------------------------------------------ |
| [cassandra-driver][25] | `>=3`    | Fully supported |                                                  |
| [couchbase][26]        | `^2.4.2` | Fully supported |                                                  |
| [elasticsearch][27]    | `>=10`   | Fully supported | Supports `@elastic/elasticsearch` versions `>=5` |
| [ioredis][28]          | `>=2`    | Fully supported |                                                  |
| [knex][29]             | `>=0.8`  | Fully supported | This integration is only for context propagation |
| [memcached][30]        | `>=2.2`  | Fully supported |                                                  |
| [mongodb-core][31]     | `>=2`    | Fully supported | Supports Mongoose                                |
| [mysql][32]            | `>=2`    | Fully supported |                                                  |
| [mysql2][33]           | `>=1`    | Fully supported |                                                  |
| [oracledb][34]         | `>=5`    | Fully supported |                                                  |
| [pg][35]               | `>=4`    | Fully supported | Supports `pg-native` when used with `pg`         |
| [redis][36]            | `>=0.12` | Fully supported |                                                  |
| [tedious][37]          | `>=1`    | Fully supported | SQL Server driver for `mssql` and `sequelize`    |

### Worker compatibility

| Module                     | Versions | Support Type    | Notes                                                  |
| -------------------------- | -------- | --------------- | ------------------------------------------------------ |
| [@google-cloud/pubsub][38] | `>=1.2`  | Fully supported |                                                        |
| [amqp10][39]               | `>=3`    | Fully supported | Supports AMQP 1.0 brokers (i.e. ActiveMQ, Apache Qpid) |
| [amqplib][40]              | `>=0.5`  | Fully supported | Supports AMQP 0.9 brokers (i.e. RabbitMQ, Apache Qpid) |
| [generic-pool][41]         | `>=2`    | Fully supported |                                                        |
| [kafkajs][42]         | `>=1.4`    | Fully supported |                                                        |
| [kafka-node][43]           |          | Coming Soon     |                                                        |
| [rhea][44]                 | `>=1`    | Fully supported |                                                        |

### SDK compatibility

| Module             | Versions   | Support Type    | Notes                                                  |
| ------------------ | ---------- | --------------- | ------------------------------------------------------ |
| [aws-sdk][45]      | `>=2.1.35` | Fully supported | CloudWatch, DynamoDB, Kinesis, Redshift, S3, SNS, SQS, and generic requests. |

### Promise library compatibility

| Module           | Versions  | Support Type    |
| ---------------- | --------- | --------------- |
| [bluebird][46]   | `>=2`     | Fully supported |
| [promise][47]    | `>=7`     | Fully supported |
| [promise-js][48] | `>=0.0.3` | Fully supported |
| [q][49]          | `>=1`     | Fully supported |
| [when][50]       | `>=3`     | Fully supported |

### Logger compatibility

| Module           | Versions  | Support Type    |
| ---------------- | --------- | --------------- |
| [bunyan][51]     | `>=1`     | Fully supported |
| [paperplane][52] | `>=2.3.2` | Fully supported |
| [pino][53]       | `>=2`     | Fully supported |
| [winston][54]    | `>=1`     | Fully supported |

## Unsupported libraries

### Fibers

[`fibers`][55] is incompatible with `async_hooks`, a Node.js [module][56] that is used by `dd-trace-js` to track asynchronous contexts thereby ensuring accurate tracing. Interactions between `fibers` and `async_hooks` may lead to unpreventable crashes and undefined behavior. So, the use of `dd-trace-js` with applications that invoke `fibers` directly or indirectly through frameworks such as [Meteor][57] may result in instability (crashes) or incorrect tracing.

For additional information or to discuss [leave a comment on this github issue][58] or [reach out to support][2] to discuss further.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/dd-trace-js
[2]: /help/
[3]: https://datadog.github.io/dd-trace-js/#integrations
[4]: https://github.com/senchalabs/connect
[5]: https://expressjs.com
[6]: https://expressjs.com/en/resources/frameworks.html
[7]: https://www.fastify.io
[8]: https://github.com/graphql/graphql-js
[9]: https://grpc.io/
[10]: https://hapijs.com
[11]: https://koajs.com
[12]: https://github.com/apigee/microgateway-core
[13]: https://github.com/apigee-internal/microgateway
[14]: https://www.npmjs.com/package/@datadog/cli
[15]: https://nextjs.org/
[16]: https://github.com/articulate/paperplane
[17]: https://github.com/articulate/paperplane/blob/master/docs/API.md#serverless-deployment
[18]: http://restify.com
[19]: https://nodejs.org/api/dns.html
[20]: https://nodejs.org/api/fs.html
[21]: https://nodejs.org/api/http.html
[22]: https://nodejs.org/api/https.html
[23]: https://nodejs.org/api/http2.html
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
[34]: https://oracle.github.io/node-oracledb/
[35]: https://node-postgres.com
[36]: https://github.com/NodeRedis/node_redis
[37]: http://tediousjs.github.io/tedious
[38]: https://github.com/googleapis/nodejs-pubsub
[39]: https://github.com/noodlefrenzy/node-amqp10
[40]: https://github.com/squaremo/amqp.node
[41]: https://github.com/coopernurse/node-pool
[42]: https://github.com/tulios/kafkajs
[43]: https://github.com/SOHU-Co/kafka-node
[44]: https://github.com/amqp/rhea
[45]: https://github.com/aws/aws-sdk-js
[46]: https://github.com/petkaantonov/bluebird
[47]: https://github.com/then/promise
[48]: https://github.com/kevincennis/promise
[49]: https://github.com/kriskowal/q
[50]: https://github.com/cujojs/when
[51]: https://github.com/trentm/node-bunyan
[52]: https://github.com/articulate/paperplane/blob/master/docs/API.md#logger
[53]: http://getpino.io
[54]: https://github.com/winstonjs/winston
[55]: https://github.com/laverdet/node-fibers
[56]: https://nodejs.org/api/async_hooks.html
[57]: https://www.meteor.com/
[58]: https://github.com/DataDog/dd-trace-js/issues/1229
