---
title: Node.js Compatibility Requirements 
kind: documentation
code_lang: nodejs
type: multi-code-lang
code_lang_weight: 50
---

## ASM capabilities 

The following ASM capabilities are supported in the Node.js library, for the specified tracer version:

| ASM capability                   | Minimum NodeJS tracer version |
| -------------------------------- | ----------------------------|
| Threat Detection  | 3.13.1|
| Threat Protection  | 3.19.0  |
| Open Source Vulnerability detection |  2.23.0 for NodeJS 12+, or 3.10.0 for NodeJS 14+ |
| Custom Code Vulnerability detection  | 2.32.0 for NodeJS 12+, or 3.19.1 for NodeJS 14+ |

The minimum tracer version to get all supported ASM capabilities for Node.js is 3.19.1.

**Note**: Threat Protection requires enabling [Remote Configuration][2], which is included in the listed minimum tracer version.  

## Language and framework compatibility

### Node.js Version Support

When the Node.js project drops support for an LTS major release line (when it goes End of Life), support for it is dropped in the next major version of `dd-trace`.
The last major supporting release line of `dd-trace` library supports that EOL version of Node.js for at least another year on a maintenance mode basis.

Some issues cannot be solved in `dd-trace` and instead must be solved in Node.js. When this happens and the Node.js release in question is EOL, it's not possible to solve the issue without moving to another non-EOL release.
Datadog does not make new releases of `dd-trace` to provide specific support for non-LTS Node.js major release lines (odd numbered versions).

For the best level of support, always run the latest LTS release of Node.js, and the latest major version of `dd-trace`. Whatever release line of Node.js you use, also use the latest version of Node.js on that release line, to ensure you have the latest security fixes.

For more information about Node.js release, see the [official Node.js documentation][4].



### Operating system support

The following operating systems are officially supported by `dd-trace`. Any operating system not listed is still likely to work, but with some features missing, for example ASM, profiling, and runtime metrics. Generally speaking, operating systems that are actively maintained at the time of initial release for a major version are supported.

You can monitor application security for Node.js apps running in Docker, Kubernetes, AWS ECS, and AWS Fargate.

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


## Integrations

### Web framework compatibility

- Attacker source HTTP request details
- Tags for the HTTP request (status code, method, etc)
- Distributed Tracing to see attack flows through your applications

##### ASM Capability Notes
- Open Source Vulnerability Detections is supported on all frameworks


| Framework                  | Versions   | Threat Detection supported? | Threat Protection supported? | Custom Code Vulnerability Detection supported? |
| ----------------------- | ---------- | --------------- | ---------------------------------------------- | ---------------------------------------------- |
| express | >=4| {{< X >}}  |{{< X >}}  | {{< X >}} |
| next | >=9.5| {{< X >}} | | |
| microgateway-core |>=2.1 | {{< X >}}  | | |
| moleculer |>=0.14 | {{< X >}} | | |
| paperplane | >=2.3| {{< X >}} | | |




<div class="alert alert-info">If you would like to see support added for any of the unsupported capabilities or for your Node.js framework, let us know! Fill out <a href="https://forms.gle/gHrxGQMEnAobukfn7">this short form to send details</a>.</div>


### Networking framework compatibility


**Networking tracing provides:**

- Distributed tracing through your applications
- Request-based blocking

##### ASM Capability Notes
- Open Source Vulnerability Detection is supported on all frameworks



| Framework                | Threat Detection supported? | Threat Protection supported? | Custom Code Vulnerability Detection supported? |
| ------------------------ | ----------- | --------------- | ---------------------------------------------- | ---------------------------------------------- |
| dns     | {{< X >}} |  |  |
| fs      |  {{< X >}} |  |  {{< X >}}  |
| http    |  {{< X >}} |  {{< X >}}  |  {{< X >}}  |
| https   |  {{< X >}} |  {{< X >}} |  |
| http2   |  {{< X >}} |  {{< X >}} |  |


<div class="alert alert-info">If you don't see your framework of choice listed, let us know! Fill out <a href="https://forms.gle/gHrxGQMEnAobukfn7">this short form to send details</a>.</div>

### Data store compatibility


**Datastore tracing provides:**

- Timing request to response
- Query info (for example, a sanitized query string)
- Error and stacktrace capturing

##### ASM Capability Notes
- Open Source Vulnerability Detection is supported on all frameworks
- Threat Protection works at the HTTP request (input) layer, and so works for all databases by default

### Data store compatibility

| Framework                 | Versions | Threat Detection supported? | Threat Protection supported? | Custom Code Vulnerability Detection supported? |
| ----------------------- | ---------- | --------------- | ---------------------------------------------- | ---------------------------------------------- |
| [cassandra-driver][28] | `>=3`    |{{< X >}}|{{< X >}} |          |
| [couchbase][29]        | `^2.4.2` |{{< X >}}|          |          |
| [elasticsearch][30]    | `>=10`   |{{< X >}}|          |          |
| [ioredis][31]          | `>=2`    |{{< X >}}|{{< X >}} |          |
| [knex][32]             | `>=0.8`  |{{< X >}}|{{< X >}} |          |
| [mariadb][63]          | `>=3`    |{{< X >}}|{{< X >}} |          |
| [memcached][33]        | `>=2.2`  |{{< X >}}|{{< X >}} |          |
| [mongodb-core][34]     | `>=2`    |{{< X >}}|{{< X >}} |          |
| [mysql][35]            | `>=2`    |{{< X >}}|          |{{< X >}} |
| [mysql2][36]           | `>=1`    |{{< X >}}|{{< X >}} |{{< X >}} |
| [oracledb][37]         | `>=5`    |{{< X >}}|{{< X >}} |          |
| [pg][38]               | `>=4`    |{{< X >}}|{{< X >}} |{{< X >}} |
| [redis][39]            | `>=0.12` |{{< X >}}|{{< X >}} |          |
| [sharedb][40]          | `>=1`    |{{< X >}}|{{< X >}} |          |
| [tedious][41]          | `>=1`    |{{< X >}}|{{< X >}} |          |


[1]: /tracing/trace_collection/compatibility/nodejs/
[2]: /agent/remote_config/#enabling-remote-configuration
[4]: https://nodejs.org/en/docs
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