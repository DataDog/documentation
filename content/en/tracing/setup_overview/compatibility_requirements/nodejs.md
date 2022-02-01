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
## Releases

### Versioning

Versioning of the Datadog Node.js tracing library follows [semver][1]. When a new major version is released it becomes the primary release line, where all new features, bug fixes and security patches land. Here’s an outline of what constitutes each type of semver change:

| Major          | Minor                                                          | Patch    |
|---------------------------------|-------------------------------------------------------------------------|----------------------|
| Changes that are incompatible with previous versions.                  | Adding anything that is compatible with previous versions (does not break them). | Security fixes        |
| API changes incompatible with previous versions.                         | API additions                   | Bug fixes             |
| Functionality changes incompatible with previous versions. | Functionality additions                                                 | |
| Dropping support for anything such as Node.js versions, supported libraries, or other features.     | Adding tested support for anything, such as Node.js versions, supported libraries, or other features.   |  |

When a release has changes that could go in multiple semver categories, the highest one is chosen.  [Release notes][2] are posted with each GitHub release.

### Maintenance

_Maintenance mode_ is a period during which a release gets only security and bug fixes whenever possible, but not new features except on a case-by-case basis. Major versions of `dd-trace` enter maintenance mode upon the release of the subsequent major version of dd-trace. The maintenance mode period lasts for one year after the release date of that subsequent version.

For example, if version 5.0.0 of `dd-trace` is released on May 4, 2023, the 4.x.x release line is supported on a maintenance mode basis until May 4, 2024. During this maintenance mode period, security and bug patches will be applied whenever possible.

If you have any questions or concerns about our support for a particular version of `dd-trace-js`, [contact Support][3] to discuss.

### Node.js Version Support

When the Node.js project drops support for an LTS major release line (when it goes EOL), support for it is dropped in the next major version of `dd-trace`.
The last major supporting release line of `dd-trace` library supports that EOL version of Node.js for at least another year on a maintenance mode basis.

Some issues cannot be solved in `dd-trace` and instead must be solved in Node.js. When this happens and the Node.js release in question is EOL, it’s not possible to solve the issue without moving to another non-EOL release.
Datadog does not make new releases of `dd-trace` to provide specific support for non-LTS Node.js major release lines (odd numbered versions).

For the best level of support, always run the latest LTS release of Node.js, and the latest major version of `dd-trace`. Whatever release line of Node.js you use, also use the latest version of Node.js on that release line, to ensure you have the latest security fixes.

For more information about Node.js release, see the [official Node.js documentation][4].

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
| [sharedb][39]          | `>=1`    | Fully supported |                                                  |
| [tedious][40]          | `>=1`    | Fully supported | SQL Server driver for `mssql` and `sequelize`    |

### Worker compatibility

| Module                     | Versions | Support Type    | Notes                                                  |
| -------------------------- | -------- | --------------- | ------------------------------------------------------ |
| [@google-cloud/pubsub][41] | `>=1.2`  | Fully supported |                                                        |
| [amqp10][42]               | `>=3`    | Fully supported | Supports AMQP 1.0 brokers (such as ActiveMQ, or Apache Qpid) |
| [amqplib][43]              | `>=0.5`  | Fully supported | Supports AMQP 0.9 brokers (such as RabbitMQ, or Apache Qpid) |
| [generic-pool][44]         | `>=2`    | Fully supported |                                                        |
| [kafkajs][45]         | `>=1.4`    | Fully supported |                                                        |
| [kafka-node][46]           |          | Coming Soon     |                                                        |
| [rhea][47]                 | `>=1`    | Fully supported |                                                        |

### SDK compatibility

| Module             | Versions   | Support Type    | Notes                                                  |
| ------------------ | ---------- | --------------- | ------------------------------------------------------ |
| [aws-sdk][48]      | `>=2.1.35` | Fully supported | CloudWatch, DynamoDB, Kinesis, Redshift, S3, SNS, SQS, and generic requests. |

### Promise library compatibility

| Module           | Versions  | Support Type    |
| ---------------- | --------- | --------------- |
| [bluebird][49]   | `>=2`     | Fully supported |
| [promise][50]    | `>=7`     | Fully supported |
| [promise-js][51] | `>=0.0.3` | Fully supported |
| [q][52]          | `>=1`     | Fully supported |
| [when][53]       | `>=3`     | Fully supported |

### Logger compatibility

| Module           | Versions  | Support Type    |
| ---------------- | --------- | --------------- |
| [bunyan][54]     | `>=1`     | Fully supported |
| [paperplane][55] | `>=2.3.2` | Fully supported |
| [pino][56]       | `>=2`     | Fully supported |
| [winston][57]    | `>=1`     | Fully supported |

## Unsupported libraries

### Fibers

[`fibers`][58] is incompatible with `async_hooks`, a Node.js [module][59] that is used by `dd-trace-js` to track asynchronous contexts thereby ensuring accurate tracing. Interactions between `fibers` and `async_hooks` may lead to unpreventable crashes and undefined behavior. So, the use of `dd-trace-js` with applications that invoke `fibers` directly or indirectly through frameworks such as [Meteor][60] may result in instability (crashes) or incorrect tracing.

For additional information or to discuss [leave a comment on this github issue][61] or [reach out to support][3] to discuss further.

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
[39]: https://share.github.io/sharedb/
[40]: http://tediousjs.github.io/tedious
[41]: https://github.com/googleapis/nodejs-pubsub
[42]: https://github.com/noodlefrenzy/node-amqp10
[43]: https://github.com/squaremo/amqp.node
[44]: https://github.com/coopernurse/node-pool
[45]: https://github.com/tulios/kafkajs
[46]: https://github.com/SOHU-Co/kafka-node
[47]: https://github.com/amqp/rhea
[48]: https://github.com/aws/aws-sdk-js
[49]: https://github.com/petkaantonov/bluebird
[50]: https://github.com/then/promise
[51]: https://github.com/kevincennis/promise
[52]: https://github.com/kriskowal/q
[53]: https://github.com/cujojs/when
[54]: https://github.com/trentm/node-bunyan
[55]: https://github.com/articulate/paperplane/blob/master/docs/API.md#logger
[56]: http://getpino.io
[57]: https://github.com/winstonjs/winston
[58]: https://github.com/laverdet/node-fibers
[59]: https://nodejs.org/api/async_hooks.html
[60]: https://www.meteor.com/
[61]: https://github.com/DataDog/dd-trace-js/issues/1229
