---
title: NodeJS Compatibility Requirements
kind: documentation
description: 'Compatibility Requirements for the NodeJS tracer'
further_reading:
    - link: 'tracing/setup/nodejs'
      tag: 'Documentation'
      text: 'Instrument Your Application'
---

Node `>=8` is supported by this library. Only even versions like 8.x and 10.x are officially supported. Odd versions like 9.x and 11.x should work but are not officially supported.

## Supported Integrations

APM provides out-of-the-box instrumentation for many popular frameworks and libraries by using a plugin system. To request support for a module that is not listed, contact our awesome [support team][1].

For details about how to how to toggle and configure plugins, check out the [API documentation][2].

### Web Framework Compatibility

| Module                  | Versions | Support Type    | Notes                                      |
| ----------------------- | -------- | --------------- | ------------------------------------------ |
| [connect][3]           | `>=2`    | Fully supported |                                            |
| [express][4]           | `>=4`    | Fully supported | Supports Sails, Loopback, and [more][5]   |
| [fastify][6]           | `>=1`    | Fully supported |                                            |
| [graphql][7]           | `>=0.10` | Fully supported | Supports Apollo Server and express-graphql |
| [gRPC][8]              | `>=1.13` | Fully supported |                                            |
| [hapi][9]              | `>=2`    | Fully supported | Supports [@hapi/hapi] versions `>=17.9`    |
| [koa][10]               | `>=2`    | Fully supported |                                            |
| [microgateway-core][11] | `>=2.1`  | Fully supported | Core library for Apigee Edge. Support for the [edgemicro][12] CLI requires static patching using [@datadog/cli][13]. |
| [paperplane][14]        | `>=2.3`  | Fully supported | Not supported in [serverless-mode][15]     |
| [restify][16]           | `>=3`    | Fully supported |                                            |

### Native Module Compatibility

| Module      | Support Type        | Notes |
| ----------- | ------------------- | ------------------------------------------ |
| [dns][17]   | Fully supported     |       |
| [fs][18]    | Fully supported     |       |
| [http][19]  | Fully supported     |       |
| [https][20] | Fully supported     |       |
| [http2][21] | Partially supported | Only HTTP2 clients are currently supported and not servers. |
| [net][22]   | Fully supported     |       |

### Data Store Compatibility

| Module                 | Versions | Support Type    | Notes                                            |
| ---------------------- | -------- | --------------- | ------------------------------------------------ |
| [cassandra-driver][23] | `>=3`    | Fully supported |                                                  |
| [couchbase][24]        | `^2.4.2` | Fully supported |                                                  |
| [elasticsearch][25]    | `>=10`   | Fully supported | Supports `@elastic/elasticsearch` versions `>=5` |
| [ioredis][26]          | `>=2`    | Fully supported |                                                  |
| [knex][27]             | `>=0.8`  | Fully supported | This integration is only for context propagation |
| [memcached][28]        | `>=2.2`  | Fully supported |                                                  |
| [mongodb-core][29]     | `>=2`    | Fully supported | Supports Mongoose                                |
| [mysql][30]            | `>=2`    | Fully supported |                                                  |
| [mysql2][31]           | `>=1`    | Fully supported |                                                  |
| [pg][32]               | `>=4`    | Fully supported | Supports `pg-native` when used with `pg`         |
| [redis][33]            | `>=0.12` | Fully supported |                                                  |
| [tedious][34]          | `>=1`    | Fully supported | SQL Server driver for `mssql` and `sequelize`    |

### Worker Compatibility

| Module                     | Versions | Support Type    | Notes                                                  |
| -------------------------- | -------- | --------------- | ------------------------------------------------------ |
| [@google-cloud/pubsub][35] | `>=1.2`  | Fully supported |                                                        |
| [amqp10][36]               | `>=3`    | Fully supported | Supports AMQP 1.0 brokers (i.e. ActiveMQ, Apache Qpid) |
| [amqplib][37]              | `>=0.5`  | Fully supported | Supports AMQP 0.9 brokers (i.e. RabbitMQ, Apache Qpid) |
| [generic-pool][38]         | `>=2`    | Fully supported |                                                        |
| [kafka-node][39]           |          | Coming Soon     |                                                        |
| [rhea][40]                 | `>=1`    | Fully supported |                                                        |

### SDK Compatibility

| Module             | Versions   | Support Type    | Notes                                                  |
| ------------------ | ---------- | --------------- | ------------------------------------------------------ |
| [aws-sdk][41]      | `>=2.1.35` | Fully supported | CloudWatch, DynamoDB, Kinesis, Redshift, S3, SNS, SQS, and generic requests. |

### Promise Library Compatibility

| Module           | Versions  | Support Type    |
| ---------------- | --------- | --------------- |
| [bluebird][42]   | `>=2`     | Fully supported |
| [promise][43]    | `>=7`     | Fully supported |
| [promise-js][44] | `>=0.0.3` | Fully supported |
| [q][45]          | `>=1`     | Fully supported |
| [when][46]       | `>=3`     | Fully supported |

### Logger Compatibility

| Module           | Versions  | Support Type    |
| ---------------- | --------- | --------------- |
| [bunyan][47]     | `>=1`     | Fully supported |
| [paperplane][48] | `>=2.3.2` | Fully supported |
| [pino][49]       | `>=2`     | Fully supported |
| [winston][50]    | `>=1`     | Fully supported |

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /help/
[2]: https://datadog.github.io/dd-trace-js/#integrations
[3]: https://github.com/senchalabs/connect
[4]: https://expressjs.com
[5]: https://expressjs.com/en/resources/frameworks.html
[6]: https://www.fastify.io
[7]: https://github.com/graphql/graphql-js
[8]: https://grpc.io/
[9]: https://hapijs.com
[10]: https://koajs.com
[11]: https://github.com/apigee/microgateway-core
[12]: https://github.com/apigee-internal/microgateway
[13]: https://www.npmjs.com/package/@datadog/cli
[14]: https://github.com/articulate/paperplane
[15]: https://github.com/articulate/paperplane/blob/master/docs/API.md#serverless-deployment
[16]: http://restify.com
[17]: https://nodejs.org/api/dns.html
[18]: https://nodejs.org/api/fs.html
[19]: https://nodejs.org/api/http.html
[20]: https://nodejs.org/api/https.html
[21]: https://nodejs.org/api/http2.html
[22]: https://nodejs.org/api/net.html
[23]: https://github.com/datastax/nodejs-driver
[24]: https://github.com/couchbase/couchnode
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
[35]: https://github.com/googleapis/nodejs-pubsub
[36]: https://github.com/noodlefrenzy/node-amqp10
[37]: https://github.com/squaremo/amqp.node
[38]: https://github.com/coopernurse/node-pool
[39]: https://github.com/SOHU-Co/kafka-node
[40]: https://github.com/amqp/rhea
[41]: https://github.com/aws/aws-sdk-js
[42]: https://github.com/petkaantonov/bluebird
[43]: https://github.com/then/promise
[44]: https://github.com/kevincennis/promise
[45]: https://github.com/kriskowal/q
[46]: https://github.com/cujojs/when
[47]: https://github.com/trentm/node-bunyan
[48]: https://github.com/articulate/paperplane/blob/master/docs/API.md#logger
[49]: http://getpino.io
[50]: https://github.com/winstonjs/winston
