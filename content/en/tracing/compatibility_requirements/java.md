---
title: Java Compatibility Requirements
kind: documentation
description: 'Compatibility Requirements for the Java tracer'
further_reading:
    - link: 'tracing/setup/java'
      tag: 'Documentation'
      text: 'Instrument Your Application'
---

## Compatibility

The Java Datadog Trace library is open source - view the [Github repository][1] for more information.

Datadog officially supports the Java JRE 1.7 and higher of both Oracle JDK and OpenJDK. Datadog does not officially support any early-access versions of Java.

Beta integrations are disabled by default but can be enabled individually:

- System Property: `-Ddd.integration.<INTEGRATION_NAME>.enabled=true`
- Environment Variable: `DD_INTEGRATION_<INTEGRATION_NAME>_ENABLED=true`

### Web Framework Compatibility

`dd-java-agent` includes support for automatically tracing the following web frameworks.

**Web Framework tracing provides:**

- timing HTTP request to response
- tags for the HTTP request (status code, method, etc)
- error and stacktrace capturing
- linking work created within a web request and Distributed Tracing

| Server                  | Versions   | Support Type    | Instrumentation Names (used for configuration) |
| ----------------------- | ---------- | --------------- | ---------------------------------------------- |
| Akka-Http Server        | 10.0+      | Fully Supported | `akka-http`, `akka-http-server`                |
| Finatra Web             | 2.9+       | Fully Supported | `finatra`                                      |
| Grizzly                 | 2.0+       | [Beta][2]       | `grizzly`                                      |
| Grizzly-HTTP            | 2.3.20+    | [Beta][2]       | `grizzly-filterchain`                          |
| Java Servlet Compatible | 2.3+, 3.0+ | Fully Supported | `servlet`, `servlet-2`, `servlet-3`            |
| Jax-RS Annotations      | JSR311-API | Fully Supported | `jax-rs`, `jaxrs`, `jax-rs-annotations`, `jax-rs-filter` |
| Jetty (non-Servlet)     | 8+         | [Beta][2]       | `jetty`, `jetty-8`                             |
| Netty HTTP Server       | 3.8+       | Fully Supported | `netty`, `netty-3.8`, `netty-4.0`, `netty-4.1` |
| Play                    | 2.3-2.8    | Fully Supported | `play`, `play-action`                          |
| Ratpack                 | 1.5+       | Fully Supported | `ratpack`                                      |
| Spark Java              | 2.3+       | [Beta][2]       | `sparkjava` (requires `jetty`)                 |
| Spring Web (MVC)        | 4.0+       | Fully Supported | `spring-web`                                   |
| Spring WebFlux          | 5.0+       | Fully Supported | `spring-webflux`                               |

**Note**: Many application servers are Servlet compatible and are automatically covered by that instrumentation, such as Tomcat, Jetty, Websphere, Weblogic, and JBoss.
Also, frameworks like Spring Boot inherently work because it usually uses a supported embedded application server (Tomcat/Jetty/Netty).

Don't see your desired web frameworks? Datadog is continually adding additional support. Contact [Datadog support][2] if you need help.

### Networking Framework Compatibility

`dd-java-agent` includes support for automatically tracing the following networking frameworks.

**Networking tracing provides:**

- timing request to response
- tags for the request (e.g. response code)
- error and stacktrace capturing
- distributed tracing


| Framework                | Versions    | Support Type    | Instrumentation Names (used for configuration) |
| ------------------------ | ----------- | --------------- | ---------------------------------------------- |
| Apache HTTP Client       | 4.0+        | Fully Supported | `httpclient`, `apache-httpclient`, `apache-http-client` |
| Apache HTTP Async Client | 4.0+        | Fully Supported | `httpasyncclient`, `apache-httpasyncclient`    |
| AWS Java SDK             | 1.11+, 2.2+ | Fully Supported | `aws-sdk`                                      |
| Commons HTTP Client      | 2.0+        | Fully Supported | `commons-http-client`                          |
| Google HTTP Client       | 1.19.0+     | Fully Supported | `google-http-client`                           |
| Grizzly HTTP Client      | 1.9+        | [Beta][3]         | `grizzly-client`                               |
| gRPC                     | 1.5+        | Fully Supported | `grpc`, `grpc-client`, `grpc-server`           |
| HttpURLConnection        | all         | Fully Supported | `httpurlconnection`, `urlconnection`           |
| Kafka-Clients            | 0.11+       | Fully Supported | `kafka`                                        |
| Kafka-Streams            | 0.11+       | Fully Supported | `kafka`, `kafka-streams`                       |
| Java RMI                 | all         | Fully Supported | `rmi`, `rmi-client`, `rmi-server`              |
| Jax RS Clients           | 2.0+        | Fully Supported | `jax-rs`, `jaxrs`, `jax-rs-client`             |
| Jersey Client            | 1.9+        | Fully Supported | `jax-rs`, `jaxrs`, `jax-rs-client`             |
| JMS                      | 1 and 2     | Fully Supported | `jms`, `jms-1`, `jms-2`                        |
| Netty HTTP Client        | 4.0+        | Fully Supported | `netty`, `netty-4.0`, `netty-4.1`              |
| Netty HTTP Client        | 4.0+        | Fully Supported | `netty`, `netty-4.0`, `netty-4.1`              |
| Ning HTTP Client         | 1.9.0+      | [Beta][3]         | `ning`                                         |
| OkHTTP                   | 2.2+        | Fully Supported | `okhttp`, `okhttp-2`,`okhttp-3`                |
| Play WSClient            | 1.0+        | Fully Supported | `play-ws`                                      |
| Rabbit AMQP              | 2.7+        | Fully Supported | `amqp`, `rabbitmq`                             |
| Spring WebClient         | 5.0+        | Fully Supported | `spring-webflux`, `spring-webflux-client`      |

Don't see your desired networking framework? Datadog is continually adding additional support. Contact [Datadog support][2] if you need help.

### Data Store Compatibility

`dd-java-agent` includes support for automatically tracing the following database frameworks/drivers.

**Datastore tracing provides:**

- timing request to response
- query info (e.g. a sanitized query string)
- error and stacktrace capturing

| Database                | Versions | Support Type    | Instrumentation Names (used for configuration)                                           |
| ----------------------- | -------- | --------------- | ---------------------------------------------------------------------------------------- |
| Couchbase               | 2.0+     | Fully Supported | `couchbase`                                                                              |
| Cassandra               | 3.X      | Fully Supported | `cassandra`                                                                              |
| Elasticsearch Transport | 2.0-6.x  | Fully Supported | `elasticsearch`, `elasticsearch-transport`, `elasticsearch-transport-{2,5,6}` (pick one) |
| Elasticsearch Rest      | 5.0-6.x  | Fully Supported | `elasticsearch`, `elasticsearch-rest`, `elasticsearch-rest-5`, `elasticsearch-rest-6`    |
| JDBC                    | N/A      | Fully Supported | `jdbc`, `jdbc-datasource`                                                                |
| Jedis                   | 1.4+     | Fully Supported | `jedis`, `redis`                                                                         |
| Lettuce                 | 4.0+     | Fully Supported | `lettuce`, `lettuce-4-async`, `lettuce-5-rx`                                             |
| MongoDB                 | 3.0+     | Fully Supported | `mongo`                                                                                  |
| RediScala               | 1.5+     | Fully Supported | `rediscala`, `redis`                                                                     |
| SpyMemcached            | 2.12+    | Fully Supported | `spymemcached`                                                                           |

`dd-java-agent` is also compatible with common JDBC drivers including:

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

Don't see your desired datastores? Datadog is continually adding additional support. Contact [Datadog support][2] if you need help.

### Other Framework Compatibility

`dd-java-agent` includes support for automatically tracing the following other frameworks.

| Framework         | Versions | Support Type    | Instrumentation Names (used for configuration) |
| ----------------- | -------- | --------------- | ---------------------------------------------- |
| Dropwizard Views  | 0.7+     | Fully Supported | `dropwizard`, `dropwizard-view`                |
| Hibernate         | 3.5+     | Fully Supported | `hibernate`, `hibernate-core`                  |
| Hystrix           | 1.4+     | Fully Supported | `hystrix`                                      |
| JSP Rendering     | 2.3+     | Fully Supported | `jsp`, `jsp-render`, `jsp-compile`             |
| Slf4J MDC         | 1+       | Fully Supported | `mdc` (see also configuration for `dd.logs.injection`) |
| Project Reactor   | 3.1+     | Fully Supported | `reactor-core`                                 |
| Spring Data       | 1.8+     | Fully Supported | `spring-data`                                  |
| Spring Scheduling | 3.1+     | Fully Supported | `spring-scheduling`                            |
| Twilio SDK        | 0+       | Fully Supported | `twilio-sdk`                                   |

Don’t see your desired frameworks? Datadog is continually adding additional support. To request a framework, contact our awesome [support team][2].

To improve visibility into applications using unsupported frameworks, consider:

- [Adding custom instrumentation][4].
- [Submitting a pull request][5] with instrumentation for inclusion in a future release.
- Contacting [Datadog support][2] and submitting a feature request.

### Disabling Integrations

Most integrations are enabled by default. The following setting can change the default to disabled.

- System Property: `-Ddd.integrations.enabled=false`
- Environment Variable: `DD_INTEGRATIONS_ENABLED=false`

Integrations can be enabled or disabled individually (overriding the default above).

- System Property: `-Ddd.integration.<INTEGRATION_NAME>.enabled=true`
- Environment Variable: `DD_INTEGRATION_<INTEGRATION_NAME>_ENABLED=true`

(See above for each integration's name.)


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/dd-trace-java
[2]: /help/
[3]: http://bytebuddy.net
[4]: /tracing/manual_instrumentation/java
[5]: https://github.com/DataDog/documentation#outside-contributors
