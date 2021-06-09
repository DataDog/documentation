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

**MAJOR**
- Changes that are incompatible with previous versions.

**MINOR**
- Adding anything that is compatible with previous versions (i.e. does not break them).

**PATCH**
- Security fixes
- Bug fixes

Both major and minor release criteria include, but are not limited to:
- API changes incompatible with previous versions
- Functionality changes incompatible with previous versions
- Dropping support for anything such as Node.js versions, supported libraries or other features.

When a release has changes that could go in multiple semver categories, the highest one is chosen.  [Release notes][2] are posted with each github release.

### Maintenance

Release lines correspond to semver majors. The latest semver major release line receives all new features. Maintenance mode is a period during which a release gets only security and bug fixes whenever possible, but no new features. Major versions of dd-trace enter maintenance mode upon the release of the subsequent major version of dd-trace. This lasts for one year after the release date of that subsequent version.

For example, if version 5.0.0 of `dd-trace` is released on May 4, 2023, then the 4.x.x release line is supported on a maintenance mode basis until May 4, 2024. During this maintenance mode period, security and bug patches will be applied whenever possible.

If you have any questions or concerns about our support for a particular version of dd-trace-js, please [reach out to support][3] to discuss.

### Node.js Version Support

When the Node.js project drops support for an LTS major release line (i.e. when it goes EOL), we will drop support in the next major version of dd-trace we release.
We will support that EOL version of Node.js for at least another year on a maintenance mode basis in the last major release line of dd-trace that supports it.
Some issues cannot be solved in dd-trace and instead must be solved in Node.js. When this happens and the Node.js release in question is EOL, it’s not possible to solve the issue.
We will not make new releases of dd-trace providing specific support for Non-LTS Node.js major release lines (i.e. odd numbered versions)

For the best level of support, we recommend always running the latest LTS release of Node.js, and the latest major version of dd-trace. Whatever release line of Node.js you use, we encourage using the latest version of Node.js on that release line, to ensure you have the latest security fixes.

## Supported integrations

APM provides out-of-the-box instrumentation for many popular frameworks and libraries by using a plugin system. To request support for a module that is not listed, contact our awesome [support team][3].

For details about how to how to toggle and configure plugins, check out the [API documentation][4].

### Web framework compatibility

| Module                  | Versions | Support Type    | Notes                                      |
| ----------------------- | -------- | --------------- | ------------------------------------------ |
| [connect][5]           | `>=2`    | Fully supported |                                            |
| [express][6]           | `>=4`    | Fully supported | Supports Sails, Loopback, and [more][7]   |
| [fastify][8]           | `>=1`    | Fully supported |                                            |
| [graphql][9]           | `>=0.10` | Fully supported | Supports Apollo Server and express-graphql |
| [gRPC][10]              | `>=1.13` | Fully supported |                                            |
| [hapi][11]              | `>=2`    | Fully supported | Supports [@hapi/hapi] versions `>=17.9`    |
| [koa][12]               | `>=2`    | Fully supported |                                            |
| [microgateway-core][13] | `>=2.1`  | Fully supported | Core library for Apigee Edge. Support for the [edgemicro][14] CLI requires static patching using [@datadog/cli][15]. |
| [next][16]              | `>=9.5`  | Fully supported | CLI usage requires `NODE_OPTIONS='-r dd-trace/init'`. |
| [paperplane][17]        | `>=2.3`  | Fully supported | Not supported in [serverless-mode][18]     |
| [restify][19]           | `>=3`    | Fully supported |                                            |

### Native module compatibility

| Module      | Support Type        | Notes |
| ----------- | ------------------- | ------------------------------------------ |
| [dns][20]   | Fully supported     |       |
| [fs][21]    | Fully supported     |       |
| [http][22]  | Fully supported     |       |
| [https][23] | Fully supported     |       |
| [http2][24] | Partially supported | Only HTTP2 clients are currently supported and not servers. |
| [net][25]   | Fully supported     |       |

### Data store compatibility

| Module                 | Versions | Support Type    | Notes                                            |
| ---------------------- | -------- | --------------- | ------------------------------------------------ |
| [cassandra-driver][26] | `>=3`    | Fully supported |                                                  |
| [couchbase][27]        | `^2.4.2` | Fully supported |                                                  |
| [elasticsearch][28]    | `>=10`   | Fully supported | Supports `@elastic/elasticsearch` versions `>=5` |
| [ioredis][29]          | `>=2`    | Fully supported |                                                  |
| [knex][30]             | `>=0.8`  | Fully supported | This integration is only for context propagation |
| [memcached][31]        | `>=2.2`  | Fully supported |                                                  |
| [mongodb-core][32]     | `>=2`    | Fully supported | Supports Mongoose                                |
| [mysql][33]            | `>=2`    | Fully supported |                                                  |
| [mysql2][34]           | `>=1`    | Fully supported |                                                  |
| [oracledb][35]         | `>=5`    | Fully supported |                                                  |
| [pg][36]               | `>=4`    | Fully supported | Supports `pg-native` when used with `pg`         |
| [redis][37]            | `>=0.12` | Fully supported |                                                  |
| [tedious][38]          | `>=1`    | Fully supported | SQL Server driver for `mssql` and `sequelize`    |

### Worker compatibility

| Module                     | Versions | Support Type    | Notes                                                  |
| -------------------------- | -------- | --------------- | ------------------------------------------------------ |
| [@google-cloud/pubsub][39] | `>=1.2`  | Fully supported |                                                        |
| [amqp10][40]               | `>=3`    | Fully supported | Supports AMQP 1.0 brokers (i.e. ActiveMQ, Apache Qpid) |
| [amqplib][41]              | `>=0.5`  | Fully supported | Supports AMQP 0.9 brokers (i.e. RabbitMQ, Apache Qpid) |
| [generic-pool][42]         | `>=2`    | Fully supported |                                                        |
| [kafkajs][43]         | `>=1.4`    | Fully supported |                                                        |
| [kafka-node][44]           |          | Coming Soon     |                                                        |
| [rhea][45]                 | `>=1`    | Fully supported |                                                        |

### SDK compatibility

| Module             | Versions   | Support Type    | Notes                                                  |
| ------------------ | ---------- | --------------- | ------------------------------------------------------ |
| [aws-sdk][46]      | `>=2.1.35` | Fully supported | CloudWatch, DynamoDB, Kinesis, Redshift, S3, SNS, SQS, and generic requests. |

### Promise library compatibility

| Module           | Versions  | Support Type    |
| ---------------- | --------- | --------------- |
| [bluebird][47]   | `>=2`     | Fully supported |
| [promise][48]    | `>=7`     | Fully supported |
| [promise-js][49] | `>=0.0.3` | Fully supported |
| [q][50]          | `>=1`     | Fully supported |
| [when][51]       | `>=3`     | Fully supported |

### Logger compatibility

| Module           | Versions  | Support Type    |
| ---------------- | --------- | --------------- |
| [bunyan][52]     | `>=1`     | Fully supported |
| [paperplane][53] | `>=2.3.2` | Fully supported |
| [pino][54]       | `>=2`     | Fully supported |
| [winston][55]    | `>=1`     | Fully supported |

## Unsupported libraries

### Fibers

[`fibers`][56] is incompatible with `async_hooks`, a Node.js [module][57] that is used by `dd-trace-js` to track asynchronous contexts thereby ensuring accurate tracing. Interactions between `fibers` and `async_hooks` may lead to unpreventable crashes and undefined behavior. So, the use of `dd-trace-js` with applications that invoke `fibers` directly or indirectly through frameworks such as [Meteor][58] may result in instability (crashes) or incorrect tracing.

For additional information or to discuss [leave a comment on this github issue][59] or [reach out to support][3] to discuss further.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://semver.org/
[2]: https://github.com/DataDog/dd-trace-js/releases
[3]: /help/
[4]: https://datadog.github.io/dd-trace-js/#integrations
[5]: https://github.com/senchalabs/connect
[6]: https://expressjs.com
[7]: https://expressjs.com/en/resources/frameworks.html
[8]: https://www.fastify.io
[9]: https://github.com/graphql/graphql-js
[10]: https://grpc.io/
[11]: https://hapijs.com
[12]: https://koajs.com
[13]: https://github.com/apigee/microgateway-core
[14]: https://github.com/apigee-internal/microgateway
[15]: https://www.npmjs.com/package/@datadog/cli
[16]: https://nextjs.org/
[17]: https://github.com/articulate/paperplane
[18]: https://github.com/articulate/paperplane/blob/master/docs/API.md#serverless-deployment
[19]: http://restify.com
[20]: https://nodejs.org/api/dns.html
[21]: https://nodejs.org/api/fs.html
[22]: https://nodejs.org/api/http.html
[23]: https://nodejs.org/api/https.html
[24]: https://nodejs.org/api/http2.html
[25]: https://nodejs.org/api/net.html
[26]: https://github.com/datastax/nodejs-driver
[27]: https://github.com/couchbase/couchnode
[28]: https://github.com/elastic/elasticsearch-js
[29]: https://github.com/luin/ioredis
[30]: https://knexjs.org
[31]: https://github.com/3rd-Eden/memcached
[32]: http://mongodb.github.io/node-mongodb-native/core
[33]: https://github.com/mysqljs/mysql
[34]: https://github.com/sidorares/node-mysql2
[35]: https://oracle.github.io/node-oracledb/
[36]: https://node-postgres.com
[37]: https://github.com/NodeRedis/node_redis
[38]: http://tediousjs.github.io/tedious
[39]: https://github.com/googleapis/nodejs-pubsub
[40]: https://github.com/noodlefrenzy/node-amqp10
[41]: https://github.com/squaremo/amqp.node
[42]: https://github.com/coopernurse/node-pool
[43]: https://github.com/tulios/kafkajs
[44]: https://github.com/SOHU-Co/kafka-node
[45]: https://github.com/amqp/rhea
[46]: https://github.com/aws/aws-sdk-js
[47]: https://github.com/petkaantonov/bluebird
[48]: https://github.com/then/promise
[49]: https://github.com/kevincennis/promise
[50]: https://github.com/kriskowal/q
[51]: https://github.com/cujojs/when
[52]: https://github.com/trentm/node-bunyan
[53]: https://github.com/articulate/paperplane/blob/master/docs/API.md#logger
[54]: http://getpino.io
[55]: https://github.com/winstonjs/winston
[56]: https://github.com/laverdet/node-fibers
[57]: https://nodejs.org/api/async_hooks.html
[58]: https://www.meteor.com/
[59]: https://github.com/DataDog/dd-trace-js/issues/1229
