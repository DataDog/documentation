---
title: Node.js Compatibility Requirements
kind: documentation
description: 'Compatibility Requirements for the Node.js tracer'
aliases:
  - /tracing/compatibility_requirements/nodejs
  - /tracing/setup_overview/compatibility_requirements/nodejs
code_lang: nodejs
type: multi-code-lang
code_lang_weight: 40
further_reading:
    - link: tracing/trace_collection/dd_libraries/nodejs
      tag: Documentation
      text: Instrument Your Application
---
## Releases

### Versioning

Versioning of the Datadog Node.js tracing library follows [semver][1]. When a new major version is released it becomes the primary release line, where all new features, bug fixes and security patches land. Here's an outline of what constitutes each type of semver change:

| Major          | Minor                                                          | Patch    |
|---------------------------------|-------------------------------------------------------------------------|----------------------|
| Changes that are incompatible with previous versions.                  | Adding anything that is compatible with previous versions (does not break them). | Security fixes        |
| API changes incompatible with previous versions.                         | API additions                   | Bug fixes             |
| Functionality changes incompatible with previous versions. | Functionality additions                                                 | |
| Dropping support for anything such as Node.js versions, supported libraries, or other features.     | Adding tested support for anything, such as Node.js versions, supported libraries, or other features.   |  |

When a release has changes that could go in multiple semver categories, the highest one is chosen. [Release notes][2] are posted with each GitHub release.

### Maintenance

_Maintenance mode_ is a period during which a release gets only security and bug fixes whenever possible, but not new features except on a case-by-case basis. Major versions of `dd-trace` enter maintenance mode upon the release of the subsequent major version of dd-trace. The maintenance mode period lasts for one year after the release date of that subsequent version.

For example, if version 5.0.0 of `dd-trace` is released on May 4, 2023, the 4.x.x release line is supported on a maintenance mode basis until May 4, 2024. During this maintenance mode period, security and bug patches will be applied whenever possible.

If you have any questions or concerns about our support for a particular version of `dd-trace-js`, [contact Support][3] to discuss.

### Node.js Version Support

When the Node.js project drops support for an LTS major release line (when it goes EOL), support for it is dropped in the next major version of `dd-trace`.
The last major supporting release line of `dd-trace` library supports that EOL version of Node.js for at least another year on a maintenance mode basis.

Some issues cannot be solved in `dd-trace` and instead must be solved in Node.js. When this happens and the Node.js release in question is EOL, it's not possible to solve the issue without moving to another non-EOL release.
Datadog does not make new releases of `dd-trace` to provide specific support for non-LTS Node.js major release lines (odd numbered versions).

For the best level of support, always run the latest LTS release of Node.js, and the latest major version of `dd-trace`. Whatever release line of Node.js you use, also use the latest version of Node.js on that release line, to ensure you have the latest security fixes.

For more information about Node.js release, see the [official Node.js documentation][4].

### Operating system support

The following operating systems are officially supported by `dd-trace`. Any operating system not listed is still likely to work, but with some features missing, for example ASM, profiling, and runtime metrics. Generally speaking, operating systems that are actively maintained at the time of initial release for a major version are supported.

| dd-trace Version    | Operating System      | Architectures         | Minimum Versions                         |
| ------------------- | --------------------- | --------------------- | ---------------------------------------- |
| 3.x                 | Linux (glibc)         | arm, arm64, x64       | CentOS 7, Debian 9, RHEL 7, Ubuntu 14.04 |
|                     | Linux (musl)          | arm, arm64, x64       | Alpine 3.13                              |
|                     | macOS                 | arm64, x64            | Catalina (10.15)                         |
|                     | Windows               | ia32, x64             | Windows 8.1, Windows Server 2012         |
| 2.x                 | Linux (glibc)         | arm, arm64, ia32, x64 | CentOS 7, Debian 9, RHEL 7, Ubuntu 14.04 |
|                     | Linux (musl)          | arm, arm64, ia32, x64 | Alpine 3.10                              |
|                     | macOS                 | arm64, x64            | Yosemite (10.10)                         |
|                     | Windows               | ia32, x64             | Windows 8.1, Windows Server 2012         |

## Supported integrations

APM provides out-of-the-box instrumentation for many popular frameworks and libraries by using a plugin system. To request support for a module that is not listed, contact our awesome [support team][3].

For details about how to how to toggle and configure plugins, check out the [API documentation][5].

### Web framework compatibility

| Module                  | Versions | Support Type    | Notes                                      |
| ----------------------- | -------- | --------------- | ------------------------------------------ |
| [connect][6]           | `>=2`    | Fully supported |                                             |
| [express][7]           | `>=4`    | Fully supported | Supports Sails, Loopback, and [more][8]     |
| [fastify][9]           | `>=1`    | Fully supported |                                             |
| [graphql][10]           | `>=0.10` | Fully supported | Supports Apollo Server and express-graphql |
| [gRPC][11]              | `>=1.13` | Fully supported |                                            |
| [hapi][12]              | `>=2`    | Fully supported | Supports [@hapi/hapi] versions `>=17.9`    |
| [koa][13]               | `>=2`    | Fully supported |                                            |
| [microgateway-core][14] | `>=2.1`  | Fully supported | Core library for Apigee Edge. Support for the [edgemicro][15] CLI requires static patching using [@datadog/cli][16]. |
| [moleculer][17]         | `>=0.14` | Fully supported |                                            |
| [next][18]              | `>=9.5`  | Fully supported | See note on Complex framework usage.<br /><br />The tracer supports the following Next.js features: <ul><li>Standalone (`output: 'standalone'`)</li><li>App Router</li><li>Middleware: Not traced, use tracer versions `4.18.0` and `3.39.0` or higher for best experience.</li></ul> |
| [paperplane][19]        | `>=2.3`  | Fully supported | Not supported in [serverless-mode][20]     |
| [restify][21]           | `>=3`    | Fully supported |                                            |

#### Complex framework usage

Some modern complex Node.js frameworks, such as Next.js and Nest.js, provide their own entry-point into an application. For example, instead of running `node app.js`, you may need to run `next start`. In these cases, the entry point is a file that ships in the framework package, not a local application file (`app.js`).

Loading the Datadog tracer early in your application code isn't effective because the framework could have already loaded modules that should be instrumented.

To load the tracer before the framework, use one of the following methods:

Prefix all commands you run with an environment variable:

```shell
NODE_OPTIONS='--require dd-trace/init' npm start

Or, modify the `package.json` file if you typically start an application with npm or yarn run scripts:

```plain
    // existing command
    "start": "next start",

    // suggested command
    "start": "node --require dd-trace/initialize ./node_modules/next start",
    "start": "NODE_OPTIONS='--require dd-trace/initialize' ./node_modules/next start",
```

**Note**: The previous examples use Next.js, but the same approach applies to other frameworks with custom entry points, such as Nest.js. Adapt the commands to fit your specific framework and setup. Either command should work, but using `NODE_OPTIONS`  also applies to any child Node.js processes.


### Native module compatibility

| Module      | Support Type        | Notes |
| ----------- | ------------------- | ------------------------------------------ |
| [dns][22]   | Fully supported     |       |
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
| [mariadb][63]          | `>=3`    | Fully supported |                                                  |
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
| [openai][64]       | `3.x`      | Fully supported |                                                        |

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
[4]: https://github.com/nodejs/release#release-schedule
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
[63]: https://github.com/mariadb-corporation/mariadb-connector-nodejs
[64]: https://github.com/openai/openai-node
