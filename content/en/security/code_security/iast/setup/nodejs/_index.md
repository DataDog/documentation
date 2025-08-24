---
title: Enabling Code Security for Node.js
code_lang: nodejs
type: multi-code-lang
code_lang_weight: 50
aliases:
  - /security_platform/application_security/getting_started/nodejs
  - /security/application_security/getting_started/nodejs
further_reading:
  - link: "/security/code_security/iast/#code-level-vulnerabilities-list"
    tag: "Documentation"
    text: "Supported code-level vulnerabilities list"
  - link: "https://www.datadoghq.com/blog/iast-datadog-code-security/"
    tag: "Blog"
    text: "Enhance application security in production with Datadog Code Security"
  - link: "https://www.datadoghq.com/blog/application-code-vulnerability-detection/"
    tag: "Blog"
    text: "Find vulnerabilities in your code with Datadog Code Security"
  - link: "https://www.datadoghq.com/blog/code-security-owasp-benchmark/"
    tag: "Blog"
    text: "Datadog Code Security achieves 100 percent accuracy in OWASP Benchmark by using an IAST approach"
  - link: "/security/application_security/troubleshooting"
    tag: "Documentation"
    text: "Troubleshooting Application Security"
---

You can detect code-level vulnerabilities and monitor application security in Node.js applications running in Docker, Kubernetes, Amazon ECS, and AWS Fargate.

## How to Enable Runtime Code Analysis (IAST)

1. **Update your Datadog Agent** to at least version 7.41.1.
2. **Update your Datadog Tracing Library** to at least the minimum version needed to turn on Runtime Code Analysis (IAST). For details, see the [Compatibility Requirements](../compatibility/nodejs/) below.
3. **Add the `DD_IAST_ENABLED=true` environment variable** to your application configuration.

{{< tabs >}}
{{% tab "From the command line" %}}
```sh
node --require dd-trace/init app.js
DD_IAST_ENABLED=true node app.js
```
{{% /tab %}}
{{% tab "Docker CLI" %}}
```sh
docker run [...] -e DD_IAST_ENABLED=true [...]
```
{{% /tab %}}
{{% tab "Dockerfile" %}}
```dockerfile
ENV DD_IAST_ENABLED=true
```
{{% /tab %}}
{{% tab "Kubernetes" %}}
```yaml
spec:
  template:
    spec:
      containers:
        - name: <CONTAINER_NAME>
          image: <CONTAINER_IMAGE>/<TAG>
          env:
            - name: DD_IAST_ENABLED
              value: "true"
```
{{% /tab %}}
{{% tab "Amazon ECS" %}}
```json
"environment": [
  ...,
  { "name": "DD_IAST_ENABLED", "value": "true" }
]
```
{{% /tab %}}
{{< /tabs >}}

---

To see Runtime Code Analysis (IAST) in action, browse your service and find code-level vulnerabilities in the [Vulnerability Explorer](https://app.datadoghq.com/security/appsec/vm).

{{< img src="/security/application_security/Code-Level-Vulnerability-Details-New.mp4" alt="Video showing Code Vulnerabilities" video="true" >}}

If you need additional assistance, contact [Datadog support](https://docs.datadoghq.com/help).

---

## Code Security Capabilities Support

| Code Security capability                    | Minimum Node.js tracer version |
|---------------------------------------------|-------------------------------|
| Runtime Software Composition Analysis (SCA) | 4.30.0 (Node.js 16+)          |
| Runtime Code Analysis (IAST)                | 5.0.0 (Node.js 18+)           |

---

## Supported Deployment Types

| Type               | Runtime IAST |
|--------------------|:------------:|
| Docker             |      ✓       |
| Kubernetes         |      ✓       |
| Amazon ECS         |      ✓       |
| AWS Fargate        |   Preview    |
| AWS Lambda         |              |
| Azure App Service* |      ✓       |

*Azure App Service is supported for web applications only. Code Security doesn’t support Azure Functions.

---

## Language and Framework Compatibility

{{< tabs >}}
{{% tab "Node.js Version Support" %}}
When the Node.js project drops support for an LTS major release line (when it goes End of Life), support for it is dropped in the next major version of dd-trace. The last major supporting release line of dd-trace library supports that EOL version of Node.js for at least another year on a maintenance mode basis.
For the best level of support, always run the latest LTS release of Node.js, and the latest major version of dd-trace. Whatever release line of Node.js you use, also use the latest version of Node.js on that release line, to ensure you have the latest security fixes.
For more information about Node.js release, see the [official Node.js documentation](https://app.datadoghq.com/security/appsec/vm).
{{% /tab %}}
{{% tab "Web Framework Compatibility" %}}
- Runtime Software Composition Analysis (SCA) is supported on all frameworks.
- If your framework is not listed below, Runtime Code Analysis (IAST) continues to detect Weak Cipher, Weak Hashing, Weak Randomness, Insecure Cookie, Cookie without HttpOnly Flag, Cookie without SameSite Flag, HSTS Header Missing, and X-Content-Type-Options Header Missing vulnerabilities.
If you don't see your framework of choice listed, let us know! Fill out [this short form](https://forms.gle/gHrxGQMEnAobukfn7) to send details.
{{% /tab %}}
{{% tab "Data Store Compatibility" %}}
Datastore tracing provides:
- Query info (for example, a sanitized query string)
- Error and stacktrace capturing
- Runtime Software Composition Analysis (SCA) is supported on all frameworks.
| Framework                | Min Version |
|--------------------------|-------------|
| @apollo/server           | >=4         |
| apollo-server-core       | >=3         |
| cassandra-driver         | >=3         |
| couchbase                | ^2.4.2      |
| elasticsearch            | >=10        |
| ioredis                  | >=2         |
| knex                     | >=0.8       |
| mariadb                  | >=3         |
| memcached                | >=2.2       |
| mongodb-core             | >=2         |
| mysql                    | >=2         |
| mysql2                   | >=1         |
| oracledb                 | >=5         |
| pg                       | >=4         |
| redis                    | >=0.12      |
| sharedb                  | >=1         |
| tedious                  | >=1         |
| sequelize                | >=4         |
{{% /tab %}}
{{% tab "Networking Framework Compatibility" %}}
- Runtime Software Composition Analysis (SCA) is supported on all frameworks.
If you don't see your framework of choice listed, let us know! Fill out [this short form](https://forms.gle/gHrxGQMEnAobukfn7) to send details.
{{% /tab %}}
{{% tab "Operating System Support" %}}
The following operating systems are officially supported by dd-trace. Any operating system not listed is still likely to work, but with some features missing, for example application security capabilities, profiling, and runtime metrics. Generally speaking, operating systems that are actively maintained at the time of initial release for a major version are supported.
{{% /tab %}}
{{< /tabs >}}

---

For more details, see [Compatibility Requirements](../compatibility/nodejs/).
