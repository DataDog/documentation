---
title: Node.js Compatibility Requirements
code_lang: nodejs
type: multi-code-lang
code_lang_weight: 50
---

## Code Security capabilities

The following code security capabilities are supported in the Node.js library, for the specified tracer version:

| Code Security capability                       | Minimum Node.js tracer version                     |
|------------------------------------------------|----------------------------------------------------|
| Runtime Software Composition Analysis (SCA)    | 4.0.0                                              |
| Runtime Code Analysis (IAST)                   | 4.18.0 for Node.js 16+, or 5.0.0 for Node.js 18+   |

The minimum tracer version to get all supported application security capabilities is 4.18.0 for Node.js 16+ and 5.0.0 for Node.js 18+.

### Supported deployment types
| Type        | Threat Detection support | Software Composition Analysis |
|-------------|--------------------------|-------------------------------|
| Docker      | {{< X >}}                | {{< X >}}                     |
| Kubernetes  | {{< X >}}                | {{< X >}}                     |
| Amazon ECS  | {{< X >}}                | {{< X >}}                     |
| AWS Fargate | {{< X >}}                | {{< X >}}                     |
| AWS Lambda  | {{< X >}}                | {{< X >}}                     |

| Type              | Runtime Software Composition Analysis (SCA) | Runtime Code Analysis (IAST)                                |
|------------------ | ------------------------------------------- | ----------------------------------------------------------- |
| Docker            | {{< X >}}                                   | {{< X >}}                                                   |
| Kubernetes        | {{< X >}}                                   | {{< X >}}                                                   |
| Amazon ECS        | {{< X >}}                                   | {{< X >}}                                                   |
| AWS Fargate       | {{< X >}}                                   | Preview (4.18.0 for Node.js 16+, or 5.0.0 for Node.js 18+)  |
| AWS Lambda        |                                             |                                                             |

## Language and framework compatibility

### Node.js Version Support

When the Node.js project drops support for an LTS major release line (when it goes End of Life), support for it is dropped in the next major version of `dd-trace`.
The last major supporting release line of `dd-trace` library supports that EOL version of Node.js for at least another year on a maintenance mode basis.

Some issues cannot be solved in `dd-trace` and instead must be solved in Node.js. When this happens and the Node.js release in question is EOL, it's not possible to solve the issue without moving to another non-EOL release.
Datadog does not make new releases of `dd-trace` to provide specific support for non-LTS Node.js major release lines (odd numbered versions).

For the best level of support, always run the latest LTS release of Node.js, and the latest major version of `dd-trace`. Whatever release line of Node.js you use, also use the latest version of Node.js on that release line, to ensure you have the latest security fixes.

For more information about Node.js release, see the [official Node.js documentation][4].



### Operating system support

The following operating systems are officially supported by `dd-trace`. Any operating system not listed is still likely to work, but with some features missing, for example application security capabilities, profiling, and runtime metrics. Generally speaking, operating systems that are actively maintained at the time of initial release for a major version are supported.


| Operating System | Architectures | Minimum Versions                         |
|------------------|---------------|------------------------------------------|
| Linux (glibc)    | arm64, x64    | CentOS 7, Debian 9, RHEL 7, Ubuntu 14.04 |
| Linux (musl)     | arm64, x64    | Alpine 3.13                              |
| macOS            | arm64, x64    | Catalina (10.15)                         |
| Windows          | x64           | Windows 8.1, Windows Server 2012         |





### Web framework compatibility

- Tags for the HTTP request (status code, method, etc)
- Distributed Tracing to see attack flows through your applications

##### Code Security Capability Notes
- **Runtime Software Composition Analysis (SCA)** is supported on all frameworks
- If your framework is not listed below, **Runtime Code Analysis (IAST)** will still detect Weak Cipher, Weak Hashing, Insecure Cookie, Cookie without HttpOnly Flag, and Cookie without SameSite Flag vulnerabilities.


| Framework | Versions | Runtime Code Analysis (IAST) |
|-----------|----------|------------------------------|
| express   | >=4      | {{< X >}}                    |
| nextjs    | >=11.1   |                              |

<div class="alert alert-info">If you would like to see support added for any of the unsupported capabilities or for your Node.js framework, let us know! Fill out <a href="https://forms.gle/gHrxGQMEnAobukfn7">this short form to send details</a>.</div>


### Networking framework compatibility


**Networking tracing provides:**

- Distributed tracing through your applications
- Request-based blocking

##### Code Security Capability Notes
- **Runtime Software Composition Analysis (SCA)** is supported on all frameworks

| Framework | Runtime Code Analysis (IAST) | 
|-----------|------------------------------|
| http      | {{< X >}}                    |
| https     | {{< X >}}                    |

<div class="alert alert-info">If you don't see your framework of choice listed, let us know! Fill out <a href="https://forms.gle/gHrxGQMEnAobukfn7">this short form to send details</a>.</div>

### Data store compatibility

**Datastore tracing provides:**

- Query info (for example, a sanitized query string)
- Error and stacktrace capturing

##### Code Security Capability Notes
- **Runtime Software Composition Analysis (SCA)** is supported on all frameworks

| Framework                | Versions  | Runtime Code Analysis (IAST) |
|--------------------------|-----------|------------------------------|
| [@apollo/server][43]     | `>=4`     |                              |
| [apollo-server-core][44] | `>=3`     |                              |
| [cassandra-driver][28]   | `>=3`     |                              |
| [couchbase][29]          | `^2.4.2`  |                              |
| [elasticsearch][30]      | `>=10`    |                              |
| [ioredis][31]            | `>=2`     |                              |
| [knex][32]               | `>=0.8`   |                              |
| [mariadb][5]             | `>=3`     |                              |
| [memcached][33]          | `>=2.2`   |                              |
| [mongodb-core][34]       | `>=2`     | {{< X >}}                    |
| [mysql][35]              | `>=2`     | {{< X >}}                    |
| [mysql2][36]             | `>=1`     | {{< X >}}                    |
| [oracledb][37]           | `>=5`     |                              |
| [pg][38]                 | `>=4`     | {{< X >}}                    |
| [redis][39]              | `>=0.12`  |                              |
| [sharedb][40]            | `>=1`     |                              |
| [tedious][41]            | `>=1`     |                              |
| [sequelize][42]          | `>=4`     | {{< X >}}                    |


[1]: /tracing/trace_collection/compatibility/nodejs/
[2]: /remote_configuration#enabling-remote-configuration
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
