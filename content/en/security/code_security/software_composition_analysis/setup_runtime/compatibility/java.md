---
title: Java Compatibility Requirements
code_lang: java
type: multi-code-lang
code_lang_weight: 0
---

## Code Security capabilities

The following code security capabilities are supported in the Java library, for the specified tracer version:

| Application Security capability  | Minimum Java tracer version |
| -------------------------------- | ----------------------------|
| Runtime Software Composition Analysis (SCA) | 1.1.4 |
| Runtime Code Analysis (IAST)  | 1.15.0|

The minimum tracer version to get all supported code security capabilities for Java is 1.15.0.

**Note**: **Static Software Composition Analysis (SCA)** and **Static Code Analysis (SAST)** capabilities do not require Datadog's tracing library. Therefore, the requirements listd above do not apply to these two Code Security capabilities.

### Supported deployment types
| Type              | Runtime Software Composition Analysis (SCA) | Runtime Code Analysis (IAST) |
|-------------------|---------------------------------------------|------------------------------|
| Docker            | {{< X >}}                                   | {{< X >}}                    |   
| Kubernetes        | {{< X >}}                                   | {{< X >}}                    |   
| Amazon ECS        | {{< X >}}                                   | {{< X >}}                    |   
| AWS Fargate       | {{< X >}}                                   | Preview (1.15.0)             |
| AWS Lambda        | not supported                               | not supported                |
| Azure App Service | {{< X >}}                                   | {{< X >}}                    |   

**Note**: Azure App Service is supported for **web applications only**. Code Security doesn't support Azure Functions.

## Language and framework compatibility

### Supported Java versions
The Java Tracer supports automatic instrumentation for the following Oracle JDK and OpenJDK JVM runtimes.

| JVM versions | Operating Systems                                                                     | Support level                       | Tracer version |
| -------------| ------------------------------------------------------------------------------------- | ----------------------------------- | -------------- |
| 8 to 17      | Windows (x86-64)<br>Linux (glibc, musl) (arm64, x86-64)<br>MacOS (arm64, x86-64)      | Supported                           | Latest         |


Datadog does not officially support any early-access versions of Java.

### Web framework compatibility

- Tags for the HTTP request (status code, method, etc)
- Distributed Tracing to see attack flows through your applications

##### Code Security Capability Notes
- **Runtime Software Composition Analysis (SCA)** is supported on all frameworks
- If **Runtime Code Analysis (IAST)** does not support your framework, it will still detect Weak Cipher, Weak Hashing, Insecure Cookie, Cookie without HttpOnly Flag, and Cookie without SameSite Flag vulnerabilities.

| Framework                   | Versions         | Runtime Code Analysis (IAST)      |
| --------------------------- | ---------------- | --------------------------------- |
| Grizzly                     | 2.0+             | <i class="icon-check-bold"></i>   |
| Glassfish                   |                  | <i class="icon-check-bold"></i>   |
| Java Servlet                | 2.3+, 3.0+       | <i class="icon-check-bold"></i>   |
| Jetty                       | 7.0-9.x, 10.x    | <i class="icon-check-bold"></i>   |
| Spring Boot                 | 1.5              | <i class="icon-check-bold"></i>   |
| Spring Web (MVC)            | 4.0+             | <i class="icon-check-bold"></i>   |
| Spring WebFlux              | 5.0+             | <i class="icon-check-bold"></i>   |
| Tomcat                      | 5.5+             | <i class="icon-check-bold"></i>   |
| Vert.x                      | 3.4-3.9.x        | <i class="icon-check-bold"></i>   |

**Note**: Many application servers are Servlet compatible and are automatically covered by that instrumentation, such as Websphere, Weblogic, and JBoss. Also, frameworks like Spring Boot (version 3) inherently work because they usually use a supported embedded application server, such as Tomcat, Jetty, or Netty.

<div class="alert alert-info">If you don't see your framework of choice listed, let us know! Fill out <a href="https://forms.gle/gHrxGQMEnAobukfn7">this short form to send details</a>.</div>

### Networking framework compatibility

`dd-java-agent` includes support for automatically tracing the following networking frameworks.

**Networking tracing provides:**

##### Code Security Capability Notes
- **Runtime Software Composition Analysis (SCA)** is supported on all frameworks
- If **Runtime Code Analysis (IAST)** does not support your framework, it will still detect Weak Cipher, Weak Hashing, Insecure Cookie, Cookie without HttpOnly Flag, and Cookie without SameSite Flag vulnerabilities.


| Framework                              | Versions    | Runtime Code Analysis (IAST)                   |
| -------------------------------------- | ----------- | ---------------------------------------------- |
| Apache HTTP Client                     | 4.0+        |                                                |
| gRPC                                   | 1.5+        |                                                |
| HttpURLConnection                      | all         |                                                |
| Jax RS Clients                         | 2.0+        |  <i class="icon-check-bold"></i>               |
| Jersey Server                          | 1.9-2.29    |  <i class="icon-check-bold"></i>               |
| Netty HTTP Server                      |  3.8+       |                                                |
| RESTEasy                               |  3.0.x      |                                                |
| Spring SessionAwareMessageListener     | 3.1+        |                                                |

<div class="alert alert-info">If you don't see your framework of choice listed, let us know! Fill out <a href="https://forms.gle/gHrxGQMEnAobukfn7">this short form to send details</a>.</div>

### Data store compatibility

`dd-java-agent` includes support for automatically tracing the following database frameworks/drivers.

**Datastore tracing provides:**

- Query info (for example, a sanitized query string)
- Error and stacktrace capturing

##### Code Security Capability Notes
- **Runtime Software Composition Analysis (SCA)** is supported on all frameworks
- If your framework is not supported below, **Runtime Code Analysis (IAST)** won’t detect SQL Injection vulnerabilities, but will still detect the rest of vulnerability types listed [here][3].

| Database                | Versions | Runtime Code Analysis (IAST)     |
| ----------------------- | -------- | -------------------------------- |
| Aerospike               | 4.0+     |                                  |
| Couchbase               | 2.0+     |                                  |
| JDBC                    | N/A      | <i class="icon-check-bold"></i>  |
| MongoDB                 | 3.0-4.0+ |                                  |

[1]: /tracing/trace_collection/compatibility/java/
[2]: /remote_configuration
[3]: /security/code_security/software_composition_analysis/
