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

### Versioning

We follow [semver][1]. When a new major version is released it becomes our primary release line, where all new features, bug fixes and security patches land. Here’s an outline of what constitutes each type of semver change:

| Major          | Minor                                                          | Patch    |
|---------------------------------|-------------------------------------------------------------------------|----------------------|
| Changes that are incompatible with previous versions.                  | Adding anything that is compatible with previous versions (i.e. does not break them). | Security fixes        |
| API changes incompatible with previous versions.                         | API additions                   | Bug fixes             |
| Functionality changes incompatible with previous versions. | Functionality additions                                                 | |
| Dropping support for anything such as Node.js versions, supported libraries or other features.     | Adding tested support for anything, such as Node.js versions, supported libraries or other features.   |  |

When a release has changes that could go in multiple semver categories, the highest one is chosen.  [Release notes][2] are posted with each github release.

### Maintenance

Maintenance mode is a period during which a release gets only security and bug fixes whenever possible, but not new features except on a case-by-case basis. Major versions of dd-trace enter maintenance mode upon the release of the subsequent major version of dd-trace. This lasts for one year after the release date of that subsequent version.

For example, if version 5.0.0 of `dd-trace` is released on May 4, 2023, then the 4.x.x release line is supported on a maintenance mode basis until May 4, 2024. During this maintenance mode period, security and bug patches will be applied whenever possible.

If you have any questions or concerns about our support for a particular version of dd-trace-js, please [reach out to support][3] to discuss.

### Node.js Version Support

When the Node.js project drops support for an LTS major release line (i.e. when it goes EOL), we will drop support in the next major version of dd-trace we release.
We will support that EOL version of Node.js for at least another year on a maintenance mode basis in the last major release line of dd-trace that supports it.

Some issues cannot be solved in dd-trace and instead must be solved in Node.js. When this happens and the Node.js release in question is EOL, it’s not possible to solve the issue.
We will not make new releases of dd-trace providing specific support for Non-LTS Node.js major release lines (i.e. odd numbered versions)

For the best level of support, we recommend always running the latest LTS release of Node.js, and the latest major version of dd-trace. Whatever release line of Node.js you use, we also encourage using the latest version of Node.js on that release line, to ensure you have the latest security fixes.

For more information about Node.js release, refer to the [official Node.js documentation][4].

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
| [next][17]              | `>=9.5`  | Fully supported | CLI usage requires `NODE_OPTIONS='-r dd-trace/init'`. |
| [paperplane][18]        | `>=2.3`  | Fully supported | Not supported in [serverless-mode][19]     |
| [restify][20]           | `>=3`    | Fully supported |                                            |

### Native module compatibility

| Module      | Support Type        | Notes |
| ----------- | ------------------- | ------------------------------------------ |
| [dns][21]   | Fully supported     |       |
| [fs][22]    | Fully supported     |       |
| [http][23]  | Fully supported     |       |
| [https][24] | Fully supported     |       |
| [http2][25] | Partially supported | Only HTTP2 clients are currently supported and not servers. |
| [net][26]   | Fully supported     |       |

### Data store compatibility

| Module                 | Versions | Support Type    | Notes                                            |
| ---------------------- | -------- | --------------- | ------------------------------------------------ |
| [cassandra-driver][27] | `>=3`    | Fully supported |                                                  |
| [couchbase][28]        | `^2.4.2` | Fully supported |                                                  |
| [elasticsearch][29]    | `>=10`   | Fully supported | Supports `@elastic/elasticsearch` versions `>=5` |
| [ioredis][30]          | `>=2`    | Fully supported |                                                  |
| [knex][31]             | `>=0.8`  | Fully supported | This integration is only for context propagation |
| [memcached][32]        | `>=2.2`  | Fully supported |                                                  |
| [mongodb-core][33]     | `>=2`    | Fully supported | Supports Mongoose                                |
| [mysql][34]            | `>=2`    | Fully supported |                                                  |
| [mysql2][35]           | `>=1`    | Fully supported |                                                  |
| [oracledb][36]         | `>=5`    | Fully supported |                                                  |
| [pg][37]               | `>=4`    | Fully supported | Supports `pg-native` when used with `pg`         |
| [redis][38]            | `>=0.12` | Fully supported |                                                  |
| [tedious][39]          | `>=1`    | Fully supported | SQL Server driver for `mssql` and `sequelize`    |

### Worker compatibility

| Module                     | Versions | Support Type    | Notes                                                  |
| -------------------------- | -------- | --------------- | ------------------------------------------------------ |
| [@google-cloud/pubsub][40] | `>=1.2`  | Fully supported |                                                        |
| [amqp10][41]               | `>=3`    | Fully supported | Supports AMQP 1.0 brokers (i.e. ActiveMQ, Apache Qpid) |
| [amqplib][42]              | `>=0.5`  | Fully supported | Supports AMQP 0.9 brokers (i.e. RabbitMQ, Apache Qpid) |
| [generic-pool][43]         | `>=2`    | Fully supported |                                                        |
| [kafkajs][44]         | `>=1.4`    | Fully supported |                                                        |
| [kafka-node][45]           |          | Coming Soon     |                                                        |
| [rhea][46]                 | `>=1`    | Fully supported |                                                        |

### SDK compatibility

| Module             | Versions   | Support Type    | Notes                                                  |
| ------------------ | ---------- | --------------- | ------------------------------------------------------ |
| [aws-sdk][47]      | `>=2.1.35` | Fully supported | CloudWatch, DynamoDB, Kinesis, Redshift, S3, SNS, SQS, and generic requests. |

### Promise library compatibility

| Module           | Versions  | Support Type    |
| ---------------- | --------- | --------------- |
| [bluebird][48]   | `>=2`     | Fully supported |
| [promise][49]    | `>=7`     | Fully supported |
| [promise-js][50] | `>=0.0.3` | Fully supported |
| [q][51]          | `>=1`     | Fully supported |
| [when][52]       | `>=3`     | Fully supported |

### Logger compatibility

| Module           | Versions  | Support Type    |
| ---------------- | --------- | --------------- |
| [bunyan][53]     | `>=1`     | Fully supported |
| [paperplane][54] | `>=2.3.2` | Fully supported |
| [pino][55]       | `>=2`     | Fully supported |
| [winston][56]    | `>=1`     | Fully supported |

## Unsupported libraries

### Fibers

[`fibers`][57] is incompatible with `async_hooks`, a Node.js [module][58] that is used by `dd-trace-js` to track asynchronous contexts thereby ensuring accurate tracing. Interactions between `fibers` and `async_hooks` may lead to unpreventable crashes and undefined behavior. So, the use of `dd-trace-js` with applications that invoke `fibers` directly or indirectly through frameworks such as [Meteor][59] may result in instability (crashes) or incorrect tracing.

For additional information or to discuss [leave a comment on this github issue][60] or [reach out to support][3] to discuss further.

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
[17]: https://nextjs.org/
[18]: https://github.com/articulate/paperplane
[19]: https://github.com/articulate/paperplane/blob/master/docs/API.md#serverless-deployment
[20]: http://restify.com
[21]: https://nodejs.org/api/dns.html
[22]: https://nodejs.org/api/fs.html
[23]: https://nodejs.org/api/http.html
[24]: https://nodejs.org/api/https.html
[25]: https://nodejs.org/api/http2.html
[26]: https://nodejs.org/api/net.html
[27]: https://github.com/datastax/nodejs-driver
[28]: https://github.com/couchbase/couchnode
[29]: https://github.com/elastic/elasticsearch-js
[30]: https://github.com/luin/ioredis
[31]: https://knexjs.org
[32]: https://github.com/3rd-Eden/memcached
[33]: http://mongodb.github.io/node-mongodb-native/core
[34]: https://github.com/mysqljs/mysql
[35]: https://github.com/sidorares/node-mysql2
[36]: https://oracle.github.io/node-oracledb/
[37]: https://node-postgres.com
[38]: https://github.com/NodeRedis/node_redis
[39]: http://tediousjs.github.io/tedious
[40]: https://github.com/googleapis/nodejs-pubsub
[41]: https://github.com/noodlefrenzy/node-amqp10
[42]: https://github.com/squaremo/amqp.node
[43]: https://github.com/coopernurse/node-pool
[44]: https://github.com/tulios/kafkajs
[45]: https://github.com/SOHU-Co/kafka-node
[46]: https://github.com/amqp/rhea
[47]: https://github.com/aws/aws-sdk-js
[48]: https://github.com/petkaantonov/bluebird
[49]: https://github.com/then/promise
[50]: https://github.com/kevincennis/promise
[51]: https://github.com/kriskowal/q
[52]: https://github.com/cujojs/when
[53]: https://github.com/trentm/node-bunyan
[54]: https://github.com/articulate/paperplane/blob/master/docs/API.md#logger
[55]: http://getpino.io
[56]: https://github.com/winstonjs/winston
[57]: https://github.com/laverdet/node-fibers
[58]: https://nodejs.org/api/async_hooks.html
[59]: https://www.meteor.com/
[60]: https://github.com/DataDog/dd-trace-js/issues/1229
