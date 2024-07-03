---
code_lang: nodejs
code_lang_weight: 50
kind: documentation
title: Node.js Compatibility Requirements
type: multi-code-lang
---

## Application Security capabilities

The following application security capabilities are supported in the Node.js library, for the specified tracer version:

| Application Security capability                         | Minimum NodeJS tracer version                      |
|----------------------------------------|----------------------------------------------------|
| Threat Detection                       | 4.0.0                                              |
| Threat Protection                      | 4.0.0                                              |
| Customize response to blocked requests | 4.1.0                                              |
| Software Composition Analysis (SCA)    | 4.0.0                                              |
| コードセキュリティ                          | 4.18.0 for Node.js 16+, or 5.0.0 for Node.js 18+   |
| Automatic user activity event tracking | 4.4.0 for Node.js 16+                              |
| API Security                           | 4.30.0 for Node.js 16+, or 5.6.0 for Node.js 18+   |

The minimum tracer version to get all supported application security capabilities for Node.js is 4.30.0.


**Note**:
- Threat Protection requires enabling [Remote Configuration][2], which is included in the listed minimum tracer version.

### Supported deployment types
| Type        | Threat Detection support | Software Composition Analysis |
|-------------|--------------------------|-------------------------------|
| Docker      | {{< X >}}                | {{< X >}}                     |
| Kubernetes  | {{< X >}}                | {{< X >}}                     |
| Amazon ECS  | {{< X >}}                | {{< X >}}                     |
| AWS Fargate | {{< X >}}                | {{< X >}}                     |
| AWS Lambda  | {{< X >}}                | beta                          |

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

- Attacker source HTTP request details
- Tags for the HTTP request (status code, method, etc)
- Distributed Tracing to see attack flows through your applications

##### Application Security Capability Notes
- **Software Composition Analysis** is supported on all frameworks
- If your framework is not listed below, **Code Security** will still detect Weak Cipher, Weak Hashing, Insecure Cookie, Cookie without HttpOnly Flag, and Cookie without SameSite Flag vulnerabilities.


| Framework | Versions | Threat Detection supported? | Threat Protection supported? | Code Security? |
|-----------|----------|-----------------------------|------------------------------|----------------------------------------------------|
| express   | >=4      | {{< X >}}                   | {{< X >}}                    | {{< X >}}                                          |
| nextjs    | >=11.1   | {{< X >}}                   |                              |                                                    |





<div class="alert alert-info">If you would like to see support added for any of the unsupported capabilities or for your Node.js framework, let us know! Fill out <a href="https://forms.gle/gHrxGQMEnAobukfn7">this short form to send details</a>.</div>


### Networking framework compatibility


**Networking tracing provides:**

- Distributed tracing through your applications
- Request-based blocking

##### Application Security Capability Notes
- **Software Composition Analysis**  is supported on all frameworks



| Framework | Threat Detection supported? | Threat Protection supported? | Code Security? |
|-----------|-----------------------------|------------------------------|----------------------------------------------------|
| http      | {{< X >}}                   | {{< X >}}                    | {{< X >}}                                          |
| https     | {{< X >}}                   | {{< X >}}                    | {{< X >}}                                          |


<div class="alert alert-info">If you don't see your framework of choice listed, let us know! Fill out <a href="https://forms.gle/gHrxGQMEnAobukfn7">this short form to send details</a>.</div>

### Data store compatibility


**Datastore tracing provides:**

- Timing request to response
- Query info (for example, a sanitized query string)
- Error and stacktrace capturing

##### Application Security Capability Notes
- **Software Composition Analysis**  is supported on all frameworks
- **Threat Protection** also works at the HTTP request (input) layer, and so works for all databases by default, even those not listed in the table below.


| Framework                | Versions  | Threat Detection supported? | Threat Protection supported? | Code Security? |
|--------------------------|-----------|-----------------------------|------------------------------|----------------------------------------------------|
| [@apollo/server][43]     | `>=4`     | {{< X >}}                   | {{< X >}}                    |                                                    |
| [apollo-server-core][44] | `>=3`     | {{< X >}}                   | {{< X >}}                    |                                                    |
| [cassandra-driver][28]   | `>=3`     | {{< X >}}                   | {{< X >}}                    |                                                    |
| [couchbase][29]          | `^2.4.2`  | {{< X >}}                   | {{< X >}}                    |                                                    |
| [elasticsearch][30]      | `>=10`    | {{< X >}}                   | {{< X >}}                    |                                                    |
| [ioredis][31]            | `>=2`     | {{< X >}}                   | {{< X >}}                    |                                                    |
| [knex][32]               | `>=0.8`   | {{< X >}}                   | {{< X >}}                    |                                                    |
| [mariadb][5]             | `>=3`     | {{< X >}}                   | {{< X >}}                    |                                                    |
| [memcached][33]          | `>=2.2`   | {{< X >}}                   | {{< X >}}                    |                                                    |
| [mongodb-core][34]       | `>=2`     | {{< X >}}                   | {{< X >}}                    | {{< X >}}                                          |
| [mysql][35]              | `>=2`     | {{< X >}}                   | {{< X >}}                    | {{< X >}}                                          |
| [mysql2][36]             | `>=1`     | {{< X >}}                   | {{< X >}}                    | {{< X >}}                                          |
| [oracledb][37]           | `>=5`     | {{< X >}}                   | {{< X >}}                    |                                                    |
| [pg][38]                 | `>=4`     | {{< X >}}                   | {{< X >}}                    | {{< X >}}                                          |
| [redis][39]              | `>=0.12`  | {{< X >}}                   | {{< X >}}                    |                                                    |
| [sharedb][40]            | `>=1`     | {{< X >}}                   | {{< X >}}                    |                                                    |
| [tedious][41]            | `>=1`     | {{< X >}}                   | {{< X >}}                    |                                                    |
| [sequelize][42]          | `>=4`     | {{< X >}}                   | {{< X >}}                    | {{< X >}}                                          |


### User Authentication Frameworks compatibility

**Integrations to User Authentication Frameworks provide:**

- User login events, including the user IDs
- The Account Takeover detection monitoring the user login events

| Framework       | Minimum Framework Version |
|-----------------|---------------------------|
| passport-local  | 1.0.0                     |
| passport-http   | 0.3.0                     |

[1]: /ja/tracing/trace_collection/compatibility/nodejs/
[2]: /ja/agent/remote_config/#enabling-remote-configuration
[4]: https://github.com/nodejs/release#release-schedule
[5]: https://github.com/mariadb-corporation/mariadb-connector-nodejs
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
[42]: https://github.com/sequelize/sequelize
[43]: https://github.com/apollographql/apollo-server
[44]: https://www.npmjs.com/package/apollo-server-core