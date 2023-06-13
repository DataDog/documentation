---
title: Java Compatibility Requirements 
kind: documentation
code_lang: java
type: multi-code-lang
code_lang_weight: 0
---

## ASM capabilities support

The following ASM capabilities are supported in the Java library, for the specified tracer version:

| ASM capability                   | Minimum Java tracer version |
| -------------------------------- | ----------------------------|
| Threat Detection | 1.8.0  |
| Threat Protection| 1.9.0 |
| Open Source Vulnerability detection | 1.1.4 |
| Custom Code Vulnerability detection | 1.15.0|

The minimum tracer version to get all supported ASM capabilities for Java is 1.15.0.

**Note**: Threat Protection requires enabling [Remote Configuration][2], which is included in the listed minimum tracer version.  

### Levels of framework support

| **Level**                                              | **Support provided**                                                                                                                                |
|--------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------|
| <span id="support-unsupported">Not Supported</span>      |  No implementation. Contact [Datadog support][2] for special requests.                                                                              |
| <span id="full-support">Supported</span>                    |  All capabilities work as intended. ASM can detect threats, block requests and report vulnerabilities. |                                                                                                                                       

## Language and framework compatibility

### Supported Java versions
The Java Tracer supports automatic instrumentation for the following Oracle JDK and OpenJDK JVM runtimes.

| JVM versions | Operating Systems                                                               | Support level                       | Tracer version |
| -------------| ------------------------------------------------------------------------------- | ----------------------------------- | -------------- |
| 18 to 19     | Windows (x86, x86-64)<br>Linux (x86, x86-64, arm64)<br>Mac (x86, x86-64, arm64) | [Beta](#levels-of-support)               | Latest         |
| 8 to 17      | Windows (x86, x86-64)<br>Linux (x86, x86-64)<br>Mac (x86, x86-64)               | [GA](#levels-of-support)                   | Latest         |
| 8 to 17      | Linux (arm64)<br>Mac (arm64)                                                    | [Beta](#levels-of-support)               | Latest         |
| 7            | Windows (x86, x86-64)<br>Linux (x86, x86-64)<br>Mac (x86, x86-64)               | [Maintenance](#levels-of-support) | v0             |
| 7            | Linux (arm64)<br>Mac (arm64)                                                    | [End-of-life](#levels-of-support)         | v0             |

Datadog does not officially support any early-access versions of Java.

You can monitor application security for Java apps running in Docker, Kubernetes, AWS ECS, and AWS Fargate.

## Integrations

### Web framework compatibility

- Attacker source HTTP request details
- Tags for the HTTP request (status code, method, etc)
- Distributed Tracing to see attack flows through your applications

##### ASM Capability Notes
- Open Source Vulnerability Detections is supported on all libraries



| Framework                  | Versions   | Threat Detection supported? | Threat Protection supported? | Custom Code Vulnerability Detection supported? |
| ----------------------- | ---------- | --------------- | ---------------------------------------------- | ---------------------------------------------- |
| Grizzly                 | 2.0+       |  Supported |  Supported |  Supported |
| Glassfish               |            |  Supported |  Supported |  Supported |
| Java Servlet Compatible | 2.3+, 3.0+ |   Supported |  Supported |  Supported |
| Jetty                   | 7.0-9.x    |  Supported |  Supported |  Supported |
| Spring Boot             | 1.5        |  Supported |  Supported |  Supported |
| Spring Web (MVC)        | 4.0+       |  Supported |  Supported |  Supported |
| Spring WebFlux          | 5.0+       |  Not Supported   | Not Supported |  Supported |
| Tomcat                  | 5.5+       |   Supported |  Supported |  Supported |
| Vert.x                  | 3.4-3.9.x  |   Supported |  Supported |  Supported |
| WebLogic                |            |   Supported |  Supported |  Supported |
| Websphere               |            |   Supported |  Supported |  Supported |
| Wildfly                 |            |   Supported |  Supported |  Supported |


<div class="alert alert-info">If you don't see your framework of choice listed, let us know! Fill out <a href="https://forms.gle/gHrxGQMEnAobukfn7">this short form to send details</a>.</div>

### Networking framework compatibility

`dd-java-agent` includes support for automatically tracing the following networking frameworks.

**Networking tracing provides:**

- Distributed tracing through your applications
- Request-based blocking

##### ASM Capability Notes
- Open Source Vulnerability Detection is supported on all libraries



| Framework                | Versions    | Threat Detection supported? | Threat Protection supported? | Custom Code Vulnerability Detection supported? |
| ------------------------ | ----------- | --------------- | ---------------------------------------------- | ---------------------------------------------- |
| Apache HTTP Client       | 4.0+        |  Supported | Not Supported | Not Supported |
| gRPC                     | 1.5+        |  Supported | Not Supported | Not Supported |
| HttpURLConnection        | all         |  Supported | Not Supported | Not Supported |
| Jax RS Clients           | 2.0+        |  Supported |  Supported |  Supported  |
| Jersey Server            | 1.9-2.29    |  Supported |  Supported |  Supported |
| Netty HTTP Server        |      |  Supported | Not Supported   | Not Supported |
| RESTEasy                 |             |  Supported | Not Supported   | Not Supported |
| Spring SessionAwareMessageListener     | 3.1+            |  Supported | Not Supported | Not Supported  |

<div class="alert alert-info">If you don't see your framework of choice listed, let us know! Fill out <a href="https://forms.gle/gHrxGQMEnAobukfn7">this short form to send details</a>.</div>

### Data store compatibility

`dd-java-agent` includes support for automatically tracing the following database frameworks/drivers. 

**Datastore tracing provides:**

- timing request to response
- query info (for example, a sanitized query string)
- error and stacktrace capturing

##### ASM Capability Notes
- Open Source Vulnerability Detection is supported on all libraries
- Threat Protection is at the HTTP request (input) stage, and so works for all databases by default

| Database                | Versions | Threat Detection supported? |  Custom Code Vulnerability Detection supported? |
| ----------------------- | -------- |  ------------------------| ---------------------------------------------------------------- |
| Aerospike               | 4.0+     |  Supported |  Not Supported |
| Couchbase               | 2.0+     |  Supported |  Not Supported |
| JDBC                    | N/A      |  Supported |   Supported |
| MongoDB                 | 3.0-4.0+ |  Supported |  Not Supported |
| MySQL                   |          |  Supported |   Supported |
| Hibernate               |          |  Supported |  Not Supported |
| SQLite JDBC driver      |          |  Supported |   Supported |
| Redis DB                |          |  Supported | Not Supported |
| PostgreSQL JDBC driver  |          |  Supported |  Supported |

<div class="alert alert-info">If you don't see your framework of choice listed, let us know! Fill out <a href="https://forms.gle/gHrxGQMEnAobukfn7">this short form to send details</a>.</div>


[1]: /tracing/trace_collection/compatibility/java/
[2]: /agent/remote_config/#enabling-remote-configuration
