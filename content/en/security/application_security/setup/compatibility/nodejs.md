---
title: Node.js Compatibility Requirements
code_lang: nodejs
type: multi-code-lang
code_lang_weight: 50
aliases:
  - /security/application_security/threats/setup/compatibility/nodejs
  - /security/application_security/enabling/compatibility/nodejs
---

## App and API Protection capabilities

The following App and API Protection capabilities are supported in the Node.js library, for the specified tracer version:

| App and API Protection capability        | Minimum Node.js tracer version                     |
|----------------------------------------|----------------------------------------------------|
| Threat Detection                       | 4.0.0                                              |
| Threat Protection                      | 4.0.0                                              |
| Customize response to blocked requests | 4.1.0                                              |
| Automatic user activity event tracking | 4.4.0 for Node.js 16+                              |
| API Security                           | 4.30.0 for Node.js 16+, or 5.6.0 for Node.js 18+   |

The minimum tracer version to get all supported App and API Protection capabilities for Node.js is 4.30.0.


**Note**:
- Threat Protection requires enabling [Remote Configuration][2], which is included in the listed minimum tracer version.

### Supported deployment types
| Type        | Threat Detection support |
|-------------|--------------------------|
| Docker      | {{< X >}}                |
| Kubernetes  | {{< X >}}                |
| Amazon ECS  | {{< X >}}                |
| AWS Fargate | {{< X >}}                |
| AWS Lambda  | {{< X >}}                |

## Language and framework compatibility

### Node.js Version Support

When the Node.js project drops support for an LTS major release line (when it goes End of Life), support for it is dropped in the next major version of `dd-trace`.
The last major supporting release line of `dd-trace` library supports that EOL version of Node.js for at least another year on a maintenance mode basis.

Some issues cannot be solved in `dd-trace` and instead must be solved in Node.js. When this happens and the Node.js release in question is EOL, it's not possible to solve the issue without moving to another non-EOL release.
Datadog does not make new releases of `dd-trace` to provide specific support for non-LTS Node.js major release lines (odd numbered versions).

For the best level of support, always run the latest LTS release of Node.js, and the latest major version of `dd-trace`. Whatever release line of Node.js you use, also use the latest version of Node.js on that release line, to ensure you have the latest security fixes.

For more information about Node.js release, see the [official Node.js documentation][4].



### Operating system support

The following operating systems are officially supported by `dd-trace`. Any operating system not listed is still likely to work, but with some features missing, for example App and API Protection capabilities, profiling, and runtime metrics. Generally speaking, operating systems that are actively maintained at the time of initial release for a major version are supported.


| Operating System | Architectures | Minimum Versions                         |
|------------------|---------------|------------------------------------------|
| Linux (glibc)    | arm64, x64    | CentOS 7, Debian 9, RHEL 7, Ubuntu 14.04 |
| Linux (musl)     | arm64, x64    | Alpine 3.13                              |
| macOS            | arm64, x64    | Catalina (10.15)                         |
| Windows          | x64           | Windows 8.1, Windows Server 2012         |





### Web framework compatibility

- Attacker source HTTP request details
- Tags for the HTTP request (status code, method, etc)
- Distributed Tracing to see attack flows through your applications

##### App and API Protection Capability Notes

Although Threat Protection is available for express >= 4 versions, the blocking of payloads on the body is only supported for applications using either the [`body-parser`][45] or [`multer`][46] libraries.

| Framework | Versions | Threat Detection supported? | Threat Protection supported? |
|-----------|----------|-----------------------------|------------------------------|
| express   | `>=4`      | {{< X >}}                   | {{< X >}}                    |
| fastify   | `>=2`      | {{< X >}}                   | {{< X >}}                    |
| nextjs    | `>=11.1`   | {{< X >}}                   |                              |





<div class="alert alert-info">If you would like to see support added for any of the unsupported capabilities or for your Node.js framework, let us know! Fill out <a href="https://forms.gle/gHrxGQMEnAobukfn7">this short form to send details</a>.</div>


### Networking framework compatibility


**Networking tracing provides:**

- Distributed tracing through your applications
- Request-based blocking

##### App and API Protection Capability Notes


| Framework | Threat Detection supported? | Threat Protection supported? |
|-----------|-----------------------------|------------------------------|
| http      | {{< X >}}                   | {{< X >}}                    |
| https     | {{< X >}}                   | {{< X >}}                    |


<div class="alert alert-info">If you don't see your framework of choice listed, let us know! Fill out <a href="https://forms.gle/gHrxGQMEnAobukfn7">this short form to send details</a>.</div>

### Data store compatibility


**Datastore tracing provides:**

- Timing request to response
- Query info (for example, a sanitized query string)
- Error and stacktrace capturing

##### App and API Protection Capability Notes

- **Threat Protection** also works at the HTTP request (input) layer, and so works for all databases by default, even those not listed in the table below.


| Framework                | Versions  | Threat Detection supported? | Threat Protection supported? |
|--------------------------|-----------|-----------------------------|------------------------------|
| [@apollo/server][43]     | `>=4`     | {{< X >}}                   | {{< X >}}                    |
| [apollo-server-core][44] | `>=3`     | {{< X >}}                   | {{< X >}}                    |
| [cassandra-driver][28]   | `>=3`     | {{< X >}}                   | {{< X >}}                    |
| [couchbase][29]          | `^2.4.2`  | {{< X >}}                   | {{< X >}}                    |
| [elasticsearch][30]      | `>=10`    | {{< X >}}                   | {{< X >}}                    |
| [ioredis][31]            | `>=2`     | {{< X >}}                   | {{< X >}}                    |
| [knex][32]               | `>=0.8`   | {{< X >}}                   | {{< X >}}                    |
| [mariadb][5]             | `>=3`     | {{< X >}}                   | {{< X >}}                    |
| [memcached][33]          | `>=2.2`   | {{< X >}}                   | {{< X >}}                    |
| [mongodb-core][34]       | `>=2`     | {{< X >}}                   | {{< X >}}                    |
| [mysql][35]              | `>=2`     | {{< X >}}                   | {{< X >}}                    |
| [mysql2][36]             | `>=1`     | {{< X >}}                   | {{< X >}}                    |
| [oracledb][37]           | `>=5`     | {{< X >}}                   | {{< X >}}                    |
| [pg][38]                 | `>=4`     | {{< X >}}                   | {{< X >}}                    |
| [redis][39]              | `>=0.12`  | {{< X >}}                   | {{< X >}}                    |
| [sharedb][40]            | `>=1`     | {{< X >}}                   | {{< X >}}                    |
| [tedious][41]            | `>=1`     | {{< X >}}                   | {{< X >}}                    |
| [sequelize][42]          | `>=4`     | {{< X >}}                   | {{< X >}}                    |


### User Authentication Frameworks compatibility

**Integrations to User Authentication Frameworks provide:**

- User login events, including the user IDs
- The Account Takeover detection monitoring the user login events

| Framework       | Minimum Framework Version |
|-----------------|---------------------------|
| passport-local  | 1.0.0                     |
| passport-http   | 0.3.0                     |

[1]: /tracing/trace_collection/compatibility/nodejs/
[2]: /tracing/guide/remote_config
[4]: https://github.com/nodejs/release#release-schedule
[5]: https://github.com/mariadb-corporation/mariadb-connector-nodejs
[28]: https://github.com/datastax/nodejs-driver
[29]: https://github.com/couchbase/couchnode
[30]: https://github.com/elastic/elasticsearch-js
[31]: https://github.com/luin/ioredis
[32]: https://knexjs.org
[33]: https://github.com/3rd-Eden/memcached
[34]: https://www.mongodb.com/docs/drivers/node/current/
[35]: https://github.com/mysqljs/mysql
[36]: https://github.com/sidorares/node-mysql2
[37]: https://oracle.github.io/node-oracledb/
[38]: https://node-postgres.com
[39]: https://github.com/NodeRedis/node_redis
[40]: https://share.github.io/sharedb/
[41]: http://tediousjs.github.io/tedious
[42]: https://github.com/sequelize/sequelize
[43]: https://github.com/apollographql/apollo-server
[44]: https://www.npmjs.com/package/apollo-server-core
[45]: https://www.npmjs.com/package/body-parser
[46]: https://www.npmjs.com/package/multer
