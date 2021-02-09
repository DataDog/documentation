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

## Supported Integrations

APM provides out-of-the-box instrumentation for many popular frameworks and libraries by using a plugin system. To request support for a module that is not listed, contact our awesome [support team][2].

For details about how to how to toggle and configure plugins, check out the [API documentation][3].

### Web Framework Compatibility

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
| [paperplane][15]        | `>=2.3`  | Fully supported | Not supported in [serverless-mode][16]     |
| [restify][17]           | `>=3`    | Fully supported |                                            |

### Native Module Compatibility

| Module      | Support Type        | Notes |
| ----------- | ------------------- | ------------------------------------------ |
| [dns][18]   | Fully supported     |       |
| [fs][19]    | Fully supported     |       |
| [http][20]  | Fully supported     |       |
| [https][21] | Fully supported     |       |
| [http2][22] | Partially supported | Only HTTP2 clients are currently supported and not servers. |
| [net][23]   | Fully supported     |       |

### Data Store Compatibility

| Module                 | Versions | Support Type    | Notes                                            |
| ---------------------- | -------- | --------------- | ------------------------------------------------ |
| [cassandra-driver][24] | `>=3`    | Fully supported |                                                  |
| [couchbase][25]        | `^2.4.2` | Fully supported |                                                  |
| [elasticsearch][26]    | `>=10`   | Fully supported | Supports `@elastic/elasticsearch` versions `>=5` |
| [ioredis][27]          | `>=2`    | Fully supported |                                                  |
| [knex][28]             | `>=0.8`  | Fully supported | This integration is only for context propagation |
| [memcached][29]        | `>=2.2`  | Fully supported |                                                  |
| [mongodb-core][30]     | `>=2`    | Fully supported | Supports Mongoose                                |
| [mysql][31]            | `>=2`    | Fully supported |                                                  |
| [mysql2][32]           | `>=1`    | Fully supported |                                                  |
| [pg][33]               | `>=4`    | Fully supported | Supports `pg-native` when used with `pg`         |
| [redis][34]            | `>=0.12` | Fully supported |                                                  |
| [tedious][35]          | `>=1`    | Fully supported | SQL Server driver for `mssql` and `sequelize`    |

### Worker Compatibility

| Module                     | Versions | Support Type    | Notes                                                  |
| -------------------------- | -------- | --------------- | ------------------------------------------------------ |
| [@google-cloud/pubsub][36] | `>=1.2`  | Fully supported |                                                        |
| [amqp10][37]               | `>=3`    | Fully supported | Supports AMQP 1.0 brokers (i.e. ActiveMQ, Apache Qpid) |
| [amqplib][38]              | `>=0.5`  | Fully supported | Supports AMQP 0.9 brokers (i.e. RabbitMQ, Apache Qpid) |
| [generic-pool][39]         | `>=2`    | Fully supported |                                                        |
| [kafkajs][52]         | `>=1.4`    | Fully supported |                                                        |
| [kafka-node][40]           |          | Coming Soon     |                                                        |
| [rhea][41]                 | `>=1`    | Fully supported |                                                        |

### SDK Compatibility

| Module             | Versions   | Support Type    | Notes                                                  |
| ------------------ | ---------- | --------------- | ------------------------------------------------------ |
| [aws-sdk][42]      | `>=2.1.35` | Fully supported | CloudWatch, DynamoDB, Kinesis, Redshift, S3, SNS, SQS, and generic requests. |

### Promise Library Compatibility

| Module           | Versions  | Support Type    |
| ---------------- | --------- | --------------- |
| [bluebird][43]   | `>=2`     | Fully supported |
| [promise][44]    | `>=7`     | Fully supported |
| [promise-js][45] | `>=0.0.3` | Fully supported |
| [q][46]          | `>=1`     | Fully supported |
| [when][47]       | `>=3`     | Fully supported |

### Logger Compatibility

| Module           | Versions  | Support Type    |
| ---------------- | --------- | --------------- |
| [bunyan][48]     | `>=1`     | Fully supported |
| [paperplane][49] | `>=2.3.2` | Fully supported |
| [pino][50]       | `>=2`     | Fully supported |
| [winston][51]    | `>=1`     | Fully supported |

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
[15]: https://github.com/articulate/paperplane
[16]: https://github.com/articulate/paperplane/blob/master/docs/API.md#serverless-deployment
[17]: http://restify.com
[18]: https://nodejs.org/api/dns.html
[19]: https://nodejs.org/api/fs.html
[20]: https://nodejs.org/api/http.html
[21]: https://nodejs.org/api/https.html
[22]: https://nodejs.org/api/http2.html
[23]: https://nodejs.org/api/net.html
[24]: https://github.com/datastax/nodejs-driver
[25]: https://github.com/couchbase/couchnode
[26]: https://github.com/elastic/elasticsearch-js
[27]: https://github.com/luin/ioredis
[28]: https://knexjs.org
[29]: https://github.com/3rd-Eden/memcached
[30]: http://mongodb.github.io/node-mongodb-native/core
[31]: https://github.com/mysqljs/mysql
[32]: https://github.com/sidorares/node-mysql2
[33]: https://node-postgres.com
[34]: https://github.com/NodeRedis/node_redis
[35]: http://tediousjs.github.io/tedious
[36]: https://github.com/googleapis/nodejs-pubsub
[37]: https://github.com/noodlefrenzy/node-amqp10
[38]: https://github.com/squaremo/amqp.node
[39]: https://github.com/coopernurse/node-pool
[40]: https://github.com/SOHU-Co/kafka-node
[41]: https://github.com/amqp/rhea
[42]: https://github.com/aws/aws-sdk-js
[43]: https://github.com/petkaantonov/bluebird
[44]: https://github.com/then/promise
[45]: https://github.com/kevincennis/promise
[46]: https://github.com/kriskowal/q
[47]: https://github.com/cujojs/when
[48]: https://github.com/trentm/node-bunyan
[49]: https://github.com/articulate/paperplane/blob/master/docs/API.md#logger
[50]: http://getpino.io
[51]: https://github.com/winstonjs/winston
[52]: https://github.com/tulios/kafkajs
