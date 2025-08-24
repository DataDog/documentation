---
title: Enabling Code Security for Java
code_lang: java
type: multi-code-lang
code_lang_weight: 0
aliases:
  - /security_platform/application_security/getting_started/java
  - /security/application_security/getting_started/java
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

You can detect code-level vulnerabilities and monitor application security in Java applications running in Docker, Kubernetes, Amazon ECS, and AWS Fargate.

## How to Enable Runtime Code Analysis (IAST)

1. **Update your Datadog Agent** to at least version 7.41.1.
2. **Update your Datadog Tracing Library** to at least the minimum version needed to turn on Runtime Code Analysis (IAST). For details, see the Compatibility Requirements below.
3. **Add the `DD_IAST_ENABLED=true` environment variable** to your application configuration.

{{< tabs >}}
{{% tab "From the command line" %}}
```sh
java -javaagent:/path/to/dd-java-agent.jar -Ddd.iast.enabled=true -Ddd.service=<MY_SERVICE> -Ddd.env=<MY_ENV> -jar path/to/app.jar
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

> **Note:** Read-only file systems are not supported. The application must have access to a writable `/tmp` directory.

---

To see Runtime Code Analysis (IAST) in action, browse your service and find code-level vulnerabilities in the [Vulnerability Explorer](https://app.datadoghq.com/security/appsec/vm).

{{< img src="/security/application_security/Code-Level-Vulnerability-Details-New.mp4" alt="Video showing Code Vulnerabilities" video="true" >}}

If you need additional assistance, contact [Datadog support](https://docs.datadoghq.com/help).

---

## Code Security Capabilities Support

| Code Security capability                    | Minimum Java tracer version |
|---------------------------------------------|----------------------------|
| Runtime Software Composition Analysis (SCA) | 1.10.0                     |
| Runtime Code Analysis (IAST)                | 1.15.0                     |

The minimum tracer version to get all supported code security capabilities for Java is **1.15.0**.

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
{{% tab "Supported Java Versions" %}}
The Java Tracer supports automatic instrumentation for the following Oracle JDK and OpenJDK JVM runtimes. Datadog does not officially support any early-access versions of Java. Versions 22 and above are supported as in Preview.
{{% /tab %}}
{{% tab "Web Framework Compatibility" %}}
- Runtime Software Composition Analysis (SCA) is supported on all frameworks.
- If Runtime Code Analysis (IAST) does not support your framework, it continues to detect Weak Cipher, Weak Hashing, Weak Randomness, Insecure Cookie, Cookie without HttpOnly Flag, and Cookie without SameSite Flag vulnerabilities.
> **Note:** Many application servers are Servlet compatible and are automatically covered by that instrumentation, such as Websphere, Weblogic, and JBoss. Also, frameworks like Spring Boot (version 3) inherently work because they usually use a supported embedded application server, such as Tomcat, Jetty, or Netty.
If you don't see your framework of choice listed, let us know! Fill out [this short form](https://forms.gle/gHrxGQMEnAobukfn7) to send details.
{{% /tab %}}
{{% tab "Networking Framework Compatibility" %}}
The dd-java-agent includes support for automatically tracing the following networking frameworks.
- Runtime Software Composition Analysis (SCA) is supported on all frameworks.
- If Runtime Code Analysis (IAST) does not support your framework, it continues to detect Weak Cipher, Weak Hashing, Insecure Cookie, Cookie without HttpOnly Flag, Cookie without SameSite Flag, HSTS Header Missing, and X-Content-Type-Options Header Missing vulnerabilities.
If you don't see your framework of choice listed, let us know! Fill out [this short form](https://forms.gle/gHrxGQMEnAobukfn7) to send details.
{{% /tab %}}
{{% tab "Data Store Compatibility" %}}
The dd-java-agent includes support for automatically tracing the following database frameworks/drivers.
Datastore tracing provides:
- Timing request to response
- Query info (for example, a sanitized query string)
- Error and stacktrace capturing
- Runtime Software Composition Analysis (SCA) is supported on all frameworks.
- If your framework is not supported below, Runtime Code Analysis (IAST) won’t detect SQL Injection vulnerabilities, but it continues to detect the remaining vulnerability types listed [here](https://docs.datadoghq.com/security/code_security/iast/setup/).
If you don't see your framework of choice listed, let us know! Fill out [this short form](https://forms.gle/gHrxGQMEnAobukfn7) to send details.
{{% /tab %}}
{{< /tabs >}}
