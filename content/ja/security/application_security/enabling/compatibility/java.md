---
code_lang: java
code_lang_weight: 0
kind: documentation
title: Java Compatibility Requirements
type: multi-code-lang
---

## Application Security capabilities

The following application security capabilities are supported in the Java library, for the specified tracer version:

| Application Security capability  | Minimum Java tracer version |
| -------------------------------- | ----------------------------|
| Threat Detection | 1.8.0  |
| API Security | 1.31.0 |
| Threat Protection| 1.9.0 |
| Customize response to blocked requests | 1.11.0 |
| Software Composition Analysis (SCA) | 1.1.4 |
| コードセキュリティ  | 1.15.0|
| Automatic user activity event tracking | 1.20.0 |

The minimum tracer version to get all supported application security capabilities for Java is 1.31.0.

**Note**: Threat Protection requires enabling [Remote Configuration][2], which is included in the listed minimum tracer version.

### Supported deployment types
| Type              | Threat Detection support | Software Composition Analysis |
|-------------------|--------------------------|-------------------------------|
| Docker            | {{< X >}}                | {{< X >}}                     |
| Kubernetes        | {{< X >}}                | {{< X >}}                     |
| Amazon ECS        | {{< X >}}                | {{< X >}}                     |
| AWS Fargate       | {{< X >}}                | {{< X >}}                     |
| AWS Lambda        | {{< X >}}                |                               |
| Azure App Service | {{< X >}}                | {{< X >}}                     |

**Note**: Azure App Service is supported for **web applications only**. Application Security doesn't support Azure Functions.

## Language and framework compatibility

### Supported Java versions
The Java Tracer supports automatic instrumentation for the following Oracle JDK and OpenJDK JVM runtimes.

| JVM versions | Operating Systems                                                               | Support level                       | Tracer version |
| -------------| ------------------------------------------------------------------------------- | ----------------------------------- | -------------- |
| 8 to 17      | Windows (x86-64)<br>Linux (glibc, musl) (arm64, x86-64)<br>MacOS (arm64, x86-64)               | Supported                | Latest         |


Datadog does not officially support any early-access versions of Java.






### Web framework compatibility

- Attacker source HTTP request details
- Tags for the HTTP request (status code, method, etc)
- Distributed Tracing to see attack flows through your applications

##### Application Security Capability Notes
- **Software Composition Analysis** is supported on all frameworks
- If **Code Security** does not support your framework, it will still detect Weak Cipher, Weak Hashing, Insecure Cookie, Cookie without HttpOnly Flag, and Cookie without SameSite Flag vulnerabilities.



| Framework                  | Versions   | Threat Detection supported? | Threat Protection supported? |Code Security? |
| ----------------------- | ---------- | --------------- | ---------------------------------------------- | ---------------------------------------------- |
| Grizzly                 | 2.0+       |  {{< X >}} |  {{< X >}} |  {{< X >}} |
| Glassfish               |            |  {{< X >}} |  {{< X >}} |  {{< X >}} |
| Java Servlet | 2.3+, 3.0+ |   {{< X >}} |  {{< X >}} |  {{< X >}} |
| Jetty                   | 7.0-9.x, 10.x    |  {{< X >}} |  {{< X >}} |  {{< X >}} |
| Spring Boot             | 1.5        |  {{< X >}} |  {{< X >}} |  {{< X >}} |
| Spring Web (MVC)        | 4.0+       |  {{< X >}} |  {{< X >}} |  {{< X >}} |
| Spring WebFlux          | 5.0+       |            |            |  {{< X >}} |
| Tomcat                  | 5.5+       |   {{< X >}} |  {{< X >}} |  {{< X >}} |
| Vert.x                  | 3.4-3.9.x  |   {{< X >}} |  {{< X >}} |  {{< X >}} |

**Note**: Many application servers are Servlet compatible and are automatically covered by that instrumentation, such as Websphere, Weblogic, and JBoss. Also, frameworks like Spring Boot (version 3) inherently work because they usually use a supported embedded application server, such as Tomcat, Jetty, or Netty.

<div class="alert alert-info">If you don't see your framework of choice listed, let us know! Fill out <a href="https://forms.gle/gHrxGQMEnAobukfn7">this short form to send details</a>.</div>

### Networking framework compatibility

`dd-java-agent` includes support for automatically tracing the following networking frameworks.

**Networking tracing provides:**

- Distributed tracing through your applications
- Request-based blocking

##### Application Security Capability Notes
- **Software Composition Analysis** is supported on all frameworks
- If **Code Security** does not support your framework, it will still detect Weak Cipher, Weak Hashing, Insecure Cookie, Cookie without HttpOnly Flag, and Cookie without SameSite Flag vulnerabilities.


| Framework                | Versions    | Threat Detection supported? | Threat Protection supported? | Code Security? |
| ------------------------ | ----------- | --------------- | ---------------------------------------------- | ---------------------------------------------- |
| Apache HTTP Client       | 4.0+        |  {{< X >}} |  |  |
| gRPC                     | 1.5+        |  {{< X >}} |  |  |
| HttpURLConnection        | all         |  {{< X >}} |  |  |
| Jax RS Clients           | 2.0+        |  {{< X >}} |  {{< X >}} |  {{< X >}}  |
| Jersey Server            | 1.9-2.29    |  {{< X >}} |  {{< X >}} |  {{< X >}} |
| Netty HTTP Server        |  3.8+           |  {{< X >}} |    |  |
| RESTEasy                 |  3.0.x          |  {{< X >}} |    |  |
| Spring SessionAwareMessageListener     | 3.1+            |  {{< X >}} |  |  |

<div class="alert alert-info">If you don't see your framework of choice listed, let us know! Fill out <a href="https://forms.gle/gHrxGQMEnAobukfn7">this short form to send details</a>.</div>

### Data store compatibility

`dd-java-agent` includes support for automatically tracing the following database frameworks/drivers.

**Datastore tracing provides:**

- Timing request to response
- Query info (for example, a sanitized query string)
- Error and stacktrace capturing

##### Application Security Capability Notes
- **Software Composition Analysis** is supported on all frameworks
- **Threat Protection** also works at the HTTP request (input) layer, and so works for all databases by default, even those not listed in the table below.
- If your framework is not supported below, **Code Security** won’t detect SQL Injection vulnerabilities, but will still detect the rest of vulnerability types listed [here][3].

| Database                | Versions | Threat Detection supported? |  Code Security? |
| ----------------------- | -------- |  ------------------------| ---------------------------------------------------------------- |
| Aerospike               | 4.0+     |  {{< X >}} |   |
| Couchbase               | 2.0+     |  {{< X >}} |   |
| JDBC                    | N/A      |  {{< X >}} |   {{< X >}} |
| MongoDB                 | 3.0-4.0+ |  {{< X >}} |   |

`dd-java-agent` is also compatible with common JDBC drivers for Threat Detection, such as:

- Apache Derby
- Firebird SQL
- H2 Database Engine
- HSQLDB
- IBM DB2
- MariaDB
- MSSQL (Microsoft SQL Server)
- MySQL
- Oracle
- Postgres SQL
- ScalikeJDBC

<div class="alert alert-info">If you don't see your framework of choice listed, let us know! Fill out <a href="https://forms.gle/gHrxGQMEnAobukfn7">this short form to send details</a>.</div>

### User Authentication Frameworks compatibility

**Integrations to User Authentication Frameworks provide:**

- User login events, including the user IDs
- Account Takeover detection monitoring for user login events

| Framework         | Minimum Framework Version |
|-------------------|---------------------------|
| Spring Security   | 5.5+                      |


[1]: /ja/tracing/trace_collection/compatibility/java/
[2]: /ja/agent/remote_config/?tab=configurationyamlfile#enabling-remote-configuration
[3]: /ja/security/application_security/vulnerability_management/#manage-code-level-vulnerabilities