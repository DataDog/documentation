---
title: Java Compatibility Requirements
code_lang: java
type: multi-code-lang
code_lang_weight: 0
aliases:
  - /security/application_security/threats/setup/compatibility/java
---

## App and API Protection capabilities

The following App and API Protection capabilities are supported in the Java library, for the specified tracer version:

| App and API Protection capability  | Minimum Java tracer version |
| -------------------------------- | ----------------------------|
| Threat Detection | 1.8.0  |
| API Security | 1.31.0 |
| Threat Protection| 1.9.0 |
| Customize response to blocked requests | 1.11.0 |
| Automatic user activity event tracking | 1.20.0 |

The minimum tracer version to get all supported App and API Protection capabilities for Java is 1.31.0.

**Note**: Threat Protection requires enabling [Remote Configuration][2], which is included in the listed minimum tracer version.

### Supported deployment types

Threat Detection is supported in the following deployment types:

- Docker
- Kubernetes
- Amazon ECS
- AWS Fargate
- AWS Lambda
- Azure App Service

**Note**: Azure App Service is supported for **web applications only**. App and API Protection doesn't support Azure Functions.

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



| Framework                  | Versions   | Threat Detection supported? | Threat Protection supported? |
| ----------------------- | ---------- | --------------- | ---------------------------------------------- |
| Grizzly                 | 2.0+       |  {{< X >}} |  {{< X >}} |
| Glassfish               |            |  {{< X >}} |  {{< X >}} |
| gRPC                    | 1.5+       |  {{< X >}} | {{< tooltip text="N/A" tooltip="Blocking not yet available for gRPC" >}} |
| Java Servlet | 2.3+, 3.0+ |   {{< X >}} |  {{< X >}} |
| Jetty                   | 7.0-9.x, 10.x    |  {{< X >}} |  {{< X >}} |
| Spring Boot             | 1.5        |  {{< X >}} |  {{< X >}} |
| Spring Web (MVC)        | 4.0+       |  {{< X >}} |  {{< X >}} |
| Spring WebFlux          | 5.0+       |            |            |
| Tomcat                  | 5.5+       |   {{< X >}} |  {{< X >}} |
| Vert.x                  | 3.4+, 4+   |   {{< X >}} |  {{< X >}} |

**Note**: Many application servers are Servlet compatible and are automatically covered by that instrumentation, such as Websphere, Weblogic, and JBoss. Also, frameworks like Spring Boot (version 3) inherently work because they usually use a supported embedded application server, such as Tomcat, Jetty, or Netty.

<div class="alert alert-info">If you don't see your framework of choice listed, let us know! Fill out <a href="https://forms.gle/gHrxGQMEnAobukfn7">this short form to send details</a>.</div>

### Networking framework compatibility

`dd-java-agent` includes support for automatically tracing the following networking frameworks.

**Networking tracing provides:**

- Distributed tracing through your applications
- Request-based blocking

##### App and API Protection Capability Notes


| Framework                | Versions    | Threat Detection supported? | Threat Protection supported? |
| ------------------------ | ----------- | --------------- | ---------------------------------------------- |
| Apache HTTP Client       | 4.0+        |  {{< X >}} |  |
| gRPC                     | 1.5+        |  {{< X >}} |  |
| HttpURLConnection        | all         |  {{< X >}} |  |
| Jax RS Clients           | 2.0+        |  {{< X >}} |  {{< X >}} |
| Jersey Server            | 1.9-2.29    |  {{< X >}} |  {{< X >}} |
| Netty HTTP Server        |  3.8+           |  {{< X >}} |    |
| RESTEasy                 |  3.0.x          |  {{< X >}} |    |
| Spring SessionAwareMessageListener     | 3.1+            |  {{< X >}} |  |

<div class="alert alert-info">If you don't see your framework of choice listed, let us know! Fill out <a href="https://forms.gle/gHrxGQMEnAobukfn7">this short form to send details</a>.</div>

### Data store compatibility

`dd-java-agent` includes support for automatically tracing the following database frameworks/drivers.

**Datastore tracing provides:**

- Timing request to response
- Query info (for example, a sanitized query string)
- Error and stacktrace capturing

##### App and API Protection capability notes

| Database                | Versions | Threat Detection supported? |
| ----------------------- | -------- |  ------------------------|
| JDBC                    | N/A      |  {{< X >}} |
| Aerospike               | 4.0+     |  {{< X >}} |
| Couchbase               | 2.0+     |  {{< X >}} |
| MongoDB                 | 3.0-4.0+ |  {{< X >}} |

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


[1]: /tracing/trace_collection/compatibility/java/
[2]: /tracing/guide/remote_config
[3]: /security/code_security/software_composition_analysis/

This is new content at line 33
