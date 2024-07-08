---
title: Java Compatibility Requirements
description: 'Compatibility Requirements for the Java tracer'
code_lang: java
type: multi-code-lang
code_lang_weight: 0
aliases:
    - /tracing/compatibility_requirements/
    - /tracing/compatibility_requirements/java
    - /tracing/setup_overview/compatibility_requirements/java
further_reading:
    - link: 'tracing/trace_collection/dd_libraries/java'
      tag: 'Documentation'
      text: 'Instrument Your Application'
---

## Compatibility

The Java Datadog Trace library is open source - view the [GitHub repository][1] for more information.

### Supported Java runtimes

The Java Tracer supports automatic instrumentation for the following Oracle JDK, OpenJDK JVM, and [GraalVM](#graalvm-native-image-support) runtimes.

#### Java Tracer v1 (latest)

<table>
  <thead>
    <th>Java versions</th>
    <th>Operating Systems</th>
    <th>Support level</th>
  </thead>
  <tr>
    <td>from 22 and upward</td>
    <td>Windows (x86, x86-64)<br>Linux (x86, x86-64, arm64)<br>Mac (x86, x86-64, arm64)</td>
    <td><a href="#levels-of-support">Beta</a></td>
  </tr>
  <tr>
    <td>from 18 to 21</td>
    <td>Windows (x86, x86-64)<br>Linux (x86, x86-64, arm64)<br>Mac (x86, x86-64, arm64)</td>
    <td><a href="#levels-of-support">GA</a></td>
  </tr>
  <tr>
    <td rowspan="2">from 8 to 17</td>
    <td>Windows (x86, x86-64)<br>Linux (x86, x86-64)<br>Mac (x86, x86-64)</td>
    <td><a href="#levels-of-support">GA</a></td>
  </tr>
  <tr>
    <td>Linux (arm64)<br>Mac (arm64)</td>
    <td><a href="#levels-of-support">Beta</a></td>
  </tr>
</table>

Datadog does not officially support any early-access versions of Java.

#### Java Tracer v0 (maintenance)

| Java versions      | Operating Systems                                                               | Support level                     |
|--------------------|---------------------------------------------------------------------------------|-----------------------------------|
| 7 only             | Windows (x86, x86-64)<br>Linux (x86, x86-64)<br>Mac (x86, x86-64)               | [Maintenance](#levels-of-support) |
| 7 only             | Linux (arm64)<br>Mac (arm64)                                                    | [End-of-life](#levels-of-support) |

### Levels of support

| **Level**                                              | **Support provided**                                                                                                                                |
|--------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------|
| <span id="support-unsupported">Unsupported</span>      |  No implementation. Contact [Datadog support][2] for special requests.                                                                              |
| <span id="support-beta">Beta</span>                    |  Initial implementation. May not yet contain all features. Support for new features and bug and security fixes are provided on a best-effort basis. |
| <span id="support-ga">General Availability (GA)</span> |  Full implementation of all features. Full support for new features and bug and security fixes.                                                     |
| <span id="support-maintenance">Maintenance</span>      |  Full implementation of existing features. Does not receive new features. Support for bug and security fixes only.                                  |
| <span id="support-eol">End-of-life (EOL)</span>        |  No support.                                                                                                                                        |

## Integrations

Beta integrations are disabled by default but can be enabled individually:

- System Property: `-Ddd.integration.<INTEGRATION_NAME>.enabled=true`
- Environment Variable: `DD_INTEGRATION_<INTEGRATION_NAME>_ENABLED=true`

### Web framework compatibility

`dd-java-agent` includes support for automatically tracing the following web frameworks.

**Web Framework tracing provides:**

- timing HTTP request to response
- tags for the HTTP request (status code, method, etc.)
- error and stacktrace capturing
- linking work created within a web request and Distributed Tracing

| Server                  | Versions   | Support Type                                        | Instrumentation Names (used for configuration)           |
|-------------------------|------------|-----------------------------------------------------|----------------------------------------------------------|
| Akka-Http Server        | 10.0+      | Fully Supported                                     | `akka-http`, `akka-http-server`                          |
| Finatra Web             | 2.9+       | Fully Supported                                     | `finatra`                                                |
| Grizzly                 | 2.0+       | Fully Supported                                     | `grizzly`                                                |
| Grizzly-HTTP            | 2.3.20+    | Fully Supported                                     | `grizzly-filterchain`                                    |
| Java Servlet Compatible | 2.3+, 3.0+ | Fully Supported                                     | `servlet`, `servlet-2`, `servlet-3`                      |
| Jax-RS Annotations      | JSR311-API | Fully Supported                                     | `jax-rs`, `jaxrs`, `jax-rs-annotations`, `jax-rs-filter` |
| Jetty                   | 7.0-12.x   | Fully Supported                                     | `jetty`                                                  |
| Micronaut HTTP Server   | 2.x        | Fully Supported                                     | `micronaut`                                              |
| Mulesoft                | 4          | Fully Supported                                     | `mule`                                                   |
| Netty HTTP Server       | 3.8+       | Fully Supported                                     | `netty`, `netty-3.8`, `netty-4.0`, `netty-4.1`           |
| Play                    | 2.3-2.8    | Fully Supported                                     | `play`, `play-action`                                    |
| Ratpack                 | 1.5+       | Fully Supported                                     | `ratpack`                                                |
| Restlet HTTP Server     | 2.2 - 2.4  | Fully Supported                                     | `restlet-http`.                                          |
| Spark Java              | 2.3+       | [Beta](#framework-integrations-disabled-by-default) | `sparkjava` (requires `jetty`)                           |
| Spring Boot             | 1.5+       | Fully Supported                                     | `spring-web` or `spring-webflux`                         |
| Spring Web (MVC)        | 4.0+       | Fully Supported                                     | `spring-web`                                             |
| Spring WebFlux          | 5.0+       | Fully Supported                                     | `spring-webflux`                                         |
| Tomcat                  | 5.5+       | Fully Supported                                     | `tomcat`                                                 |
| Vert.x                  | 3.4+       | Fully Supported                                     | `vertx`, `vertx-3.4`, `vertx-3.9`, `vertx-4.0`           |

**Note**: Many application servers are Servlet compatible and are automatically covered by that instrumentation, such as Websphere, Weblogic, and JBoss.
Also, frameworks like Spring Boot (version 3) inherently work because they usually use a supported embedded application server, such as Tomcat, Jetty, or Netty.

### Framework Integrations Disabled By Default

The following instrumentations are disabled by default and can be enabled with the following settings:

| Instrumentation     | To Enable 									                                                                                                              |
|---------------------|-------------------------------------------------------------------------------------------------------------------------------------------|
| JAX-WS		          | `-Ddd.integration.jax-ws.enabled=true`                                                                                                    |
| Mulesoft		        | `-Ddd.integration.mule.enabled=true`, `-Ddd.integration.grizzly-client.enabled=true`, `-Ddd.integration.grizzly-filterchain.enabled=true` |
| Grizzly             | `-Ddd.integration.grizzly-client.enabled=true`                                                                                            |
| Grizzly-HTTP        | `-Ddd.integration.grizzly-filterchain.enabled=true`                                                                                       |
| Ning                | `-Ddd.integration.ning.enabled=true`                                                                                                      |
| Spark Java          | `-Ddd.integration.sparkjava.enabled=true`                                                                                                 |
| Hazelcast           | `-Ddd.integration.hazelcast.enabled=true` </br> `-Ddd.integration.hazelcast_legacy.enabled=true`                                          |
| Tibco BusinessWorks | `-Ddd.integration.tibco.enabled=true`                                                                                                     |


**Note**: JAX-WS integration instruments endpoints annotated with @WebService (JAX-WS 1.x) and @WebServiceProvider (JAX-WS 2.x).

Don't see your desired web frameworks? Datadog is continually adding additional support. Contact [Datadog support][2] if you need help.

### Networking framework compatibility

`dd-java-agent` includes support for automatically tracing the following networking frameworks.

**Networking tracing provides:**

- timing request to response
- tags for the request (for example, response code)
- error and stacktrace capturing
- distributed tracing

| Framework                          | Versions    | Support Type                                        | Instrumentation Names (used for configuration)          |
|------------------------------------|-------------|-----------------------------------------------------|---------------------------------------------------------|
| Apache HTTP Client                 | 4.0+        | Fully Supported                                     | `httpclient`, `apache-httpclient`, `apache-http-client` |
| Apache HTTP Async Client           | 4.0+        | Fully Supported                                     | `httpasyncclient`, `apache-httpasyncclient`             |
| AWS Java SDK                       | 1.11+, 2.2+ | Fully Supported                                     | `aws-sdk`                                               |
| Camel-OpenTelemetry                | 3.12.0+     | Beta                                                | [opentelemetry-1][5]                                    |
| Commons HTTP Client                | 2.0+        | Fully Supported                                     | `commons-http-client`                                   |
| Google HTTP Client                 | 1.19.0+     | Fully Supported                                     | `google-http-client`                                    |
| Google Pub/Sub                     | 1.116.0+    | Fully Supported                                     | `google-pubsub`                                         |
| Grizzly HTTP Client                | 1.9+        | [Beta](#framework-integrations-disabled-by-default) | `grizzly-client`                                        |
| gRPC                               | 1.5+        | Fully Supported                                     | `grpc`, `grpc-client`, `grpc-server`                    |
| HttpURLConnection                  | all         | Fully Supported                                     | `httpurlconnection`, `urlconnection`                    |
| Kafka-Clients                      | 0.11+       | Fully Supported                                     | `kafka`                                                 |
| Kafka-Streams                      | 0.11+       | Fully Supported                                     | `kafka`, `kafka-streams`                                |
| Java RMI                           | all         | Distributed Tracing Not Supported                   | `rmi`, `rmi-client`, `rmi-server`                       |
| Jax RS Clients                     | 2.0+        | Fully Supported                                     | `jax-rs`, `jaxrs`, `jax-rs-client`                      |
| Jersey Client                      | 1.9-2.29    | Fully Supported                                     | `jax-rs`, `jaxrs`, `jax-rs-client`                      |
| JMS / Jakarta JMS                  | 1-3.0+      | Fully Supported                                     | `jms`, `jms-1`, `jms-2`, `jakarta-jms`                  |
| Netty HTTP Client                  | 4.0+        | Fully Supported                                     | `netty`, `netty-4.0`, `netty-4.1`                       |
| Ning HTTP Client                   | 1.9.0+      | [Beta](#framework-integrations-disabled-by-default) | `ning`                                                  |
| OkHTTP                             | 2.2+        | Fully Supported                                     | `okhttp`, `okhttp-2`,`okhttp-3`                         |
| Play WSClient                      | 1.0+        | Fully Supported                                     | `play-ws`                                               |
| Rabbit AMQP                        | 2.7+        | Fully Supported                                     | `amqp`, `rabbitmq`                                      |
| Spring SessionAwareMessageListener | 3.1+        | Fully Supported                                     | `spring-jms-3.1`                                        |
| Spring WebClient                   | 5.0+        | Fully Supported                                     | `spring-webflux`, `spring-webflux-client`               |

**Kafka Note**: Datadog's Kafka integration works with Kafka version `0.11+`, which supports the Header API. This API is used to inject and extract trace context. If you are running a mixed version environment, the Kafka broker can incorrectly report the newer version of Kafka. This causes an issue when the tracer tries to inject headers that are not supported by the local producer. Additionally, older consumers are unable to consume the message because of the presence of headers. To prevent these issues, if you are running a mixed version Kafka environment with versions older than 0.11, disable context propagation with the environment variable: `DD_KAFKA_CLIENT_PROPAGATION_ENABLED=false`.

**JMS Note**: Datadog's JMS integration automatically adds and reads message object properties `x__dash__datadog__dash__trace__dash__id` and `x__dash__datadog__dash__parent__dash__id` to maintain context propagation between consumer and producer services.

**Camel Note**: Distributed trace propagation over Camel routes is not supported.

Don't see your desired networking framework? Datadog is continually adding additional support. Contact [Datadog support][2] if you need help.

### Data store compatibility

`dd-java-agent` includes support for automatically tracing the following database frameworks/drivers.

**Datastore tracing provides:**

- timing request to response
- query info (for example, a sanitized query string)
- error and stacktrace capturing

| Database                | Versions | Support Type    | Instrumentation Names (used for configuration)                                             |
|-------------------------|----------|-----------------|--------------------------------------------------------------------------------------------|
| Aerospike               | 4.0+     | Fully Supported | `aerospike`                                                                                |
| Couchbase               | 2.0+     | Fully Supported | `couchbase`                                                                                |
| Cassandra               | 3.0+     | Fully Supported | `cassandra`                                                                                |
| Elasticsearch Transport | 2.0+     | Fully Supported | `elasticsearch`, `elasticsearch-transport`, `elasticsearch-transport-{2,5,6,7}` (pick one) |
| Elasticsearch Rest      | 5.0+     | Fully Supported | `elasticsearch`, `elasticsearch-rest`, `elasticsearch-rest-{5,6,7}` (pick one)             |
| JDBC                    | N/A      | Fully Supported | `jdbc`, `jdbc-datasource`                                                                  |
| Jedis                   | 1.4+     | Fully Supported | `jedis`, `redis`                                                                           |
| Lettuce                 | 4.0+     | Fully Supported | `lettuce`, `lettuce-4-async`, `lettuce-5-rx`                                               |
| MongoDB                 | 3.0-4.0+ | Fully Supported | `mongo`                                                                                    |
| OpenSearch Rest         | 1.x-2.x  | Fully Supported | `opensearch`, `opensearch-rest`                                                            |
| OpenSearch Transport    | 1.x-2.x  | Fully Supported | `opensearch`, `opensearch-transport`                                                       |
| RediScala               | 1.5+     | Fully Supported | `rediscala`, `redis`                                                                       |
| Redisson                | 2.x-3.x  | Fully Supported | `redisson`, `redis`                                                                        |
| SpyMemcached            | 2.12+    | Fully Supported | `spymemcached`                                                                             |
| Vert.x Cassandra Client | 3.9+		   | Fully Supported | `cassandra`																			                                                             |
| Vert.x Redis Client     | 3.9      | Fully Supported | `vertx-redis-client`                                                                       |
| Vert.x MySQL Client     | 3.9+     | Fully Supported | `vertx-sql-client`																		                                                       |

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
- ScalikeJDBC

### Database Integrations Disabled By Default

The following instrumentations are disabled by default and can be enabled with the following settings:

| Instrumentation   | To Enable 									                             |
|-------------------|-------------------------------------------------|
| JDBC-Datasource		 | `-Ddd.integration.jdbc-datasource.enabled=true` |

Don't see your desired datastores? Datadog is continually adding additional support. Contact [Datadog support][2] if you need help.

### Additional framework compatibility

`dd-java-agent` includes support for automatically tracing the following frameworks.

| Framework         | Versions   | Support Type                                                     | Instrumentation Names (used for configuration) |
|-------------------|------------|------------------------------------------------------------------|------------------------------------------------|
| Datanucleus JDO     | 4.0+       | Fully Supported                                                  | `datanucleus`                                  |
| Dropwizard Views    | 0.7+       | Fully Supported                                                  | `dropwizard`, `dropwizard-view`                |
| GraphQL             | 14.0+      | Fully Supported                                                  | `graphql-java`                                 |
| Hazelcast           | 3.6+       | [Beta](#framework-integrations-disabled-by-default)              | `hazelcast`, `hazelcast_legacy`                |
| Hibernate           | 3.5+       | Fully Supported                                                  | `hibernate`, `hibernate-core`                  |
| Hystrix             | 1.4+       | Fully Supported                                                  | `hystrix`                                      |
| JSP Rendering       | 2.3+       | Fully Supported                                                  | `jsp`, `jsp-render`, `jsp-compile`             |
| JUnit               | 4.1+, 5.3+ | Fully Supported                                                  | `junit`, `junit-4`, `junit-5`                  |
| Project Reactor     | 3.1+       | Fully Supported                                                  | `reactor-core`                                 |
| Quartz              | 2.x        | Fully Supported                                                  | `quartz`                                       |
| RxJava              | 2.x        | Fully Supported                                                  | `rxjava`                                       |
| Spring Data         | 1.8+       | Fully Supported                                                  | `spring-data`                                  |
| Spring Scheduling   | 3.1+       | Fully Supported                                                  | `spring-scheduling`                            |
| Tibco BusinessWorks | 5.14.0+    | [Beta](#framework-integrations-disabled-by-default)              | `tibco`, `tibco_bw`                            |
| Twilio SDK          | < 8.0      | Fully Supported                                                  | `twilio-sdk`                                   |

Don't see your desired frameworks? Datadog is continually adding additional support. To request a framework, contact our awesome [support team][2].

To improve visibility into applications using unsupported frameworks, consider:

- [Adding custom instrumentation][3].
- [Submitting a pull request][4] with instrumentation for inclusion in a future release.
- Contacting [Datadog support][2] and submitting a feature request.

### Disabling integrations

Most integrations are enabled by default. The following setting can change the default to disabled.

- System Property: `-Ddd.integrations.enabled=false`
- Environment Variable: `DD_INTEGRATIONS_ENABLED=false`

Integrations can be enabled or disabled individually (overriding the default above).

- System Property: `-Ddd.integration.<INTEGRATION_NAME>.enabled=true`
- Environment Variable: `DD_INTEGRATION_<INTEGRATION_NAME>_ENABLED=true`

(See above for each integration's name.)

### Known issues

- Running the Java tracer in Bitbucket is not supported.
- Loading multiple Java Agents that perform APM/tracing functions is not a recommended or supported configuration.

## GraalVM Native Image support

GraalVM Native Image is a technology that allows you to compile Java applications into native executables. The Datadog Java tracer supports GraalVM Native Image. This allows you to compile your applications into native executables while still benefiting from the tracing capabilities offered by the library.

### Requirements

Use the latest versions of:

- [GraalVM][7]
- [Datadog Java tracer][1]

### Setup

{{< tabs >}}
{{% tab "GraalVM" %}}
To set up the Datadog Java tracer with GraalVM Native Image, follow these steps:

1. Instrument your application, following the steps described on [Tracing Java Applications][6].
2. When you build a native executable with the `native-image` command, add the `-J-javaagent:/path/to/dd-java-agent.jar` argument. For example:
   ```shell
   native-image -J-javaagent:/path/to/dd-java-agent.jar -jar App.jar
   ```
3. (Optional) Enable the profiler integration by adding the following argument:
`-J-Ddd.profiling.enabled=true –enable-monitoring=jfr`.

[6]: /tracing/trace_collection/automatic_instrumentation/dd_libraries/java/
{{% /tab %}}

{{% tab "Quarkus Native" %}}
To set up the Datadog Java tracer with Quarkus Native, follow these steps:

1. Instrument your application, following the steps described in [Tracing Java Applications][6].
2. When you build a native executable, use the `quarkus.native.additional-build-args` property. For example:
   ```shell
   ./mvnw package -Dnative -Dquarkus.native.additional-build-args='-J-javaagent:/path/to/dd-java-agent.jar'
   ```
3. (Optional) Enable the profiler integration by adding the following argument:
`-J-Ddd.profiling.enabled=true –enable-monitoring=jfr`.

[6]: /tracing/trace_collection/automatic_instrumentation/dd_libraries/java/
{{% /tab %}}

{{% tab "Spring Native" %}}
To set up the Datadog Java tracer with Spring Native, follow these steps:

1. Instrument your application, following the steps described on [Tracing Java Applications][6].
2. For Spring Native builds based on Buildpacks, enable the [Paketo Buildpack for Datadog][8] using `BP_DATADOG_ENABLED=true`.
   - You can do this at the build tool level, like Maven:
     ```yaml
     <build>
     <plugins>
       <plugin>
         <groupId>org.springframework.boot</groupId>
         <artifactId>spring-boot-maven-plugin</artifactId>
         <configuration>
           <image>
             ...
             <env>
               ...
               <BP_DATADOG_ENABLED>true</BP_DATADOG_ENABLED>
               ...
             </env>
           </image>
         </configuration>
       </plugin>
     </plugins>
     </build>
     ```
   - Alternatively, you can use the `pack build` command with `--env BP_DATADOG_ENABLED=true` option to enable the Datadog buildpack.
3. (Optional) Enable the profiler integration by setting the environment variable `BP_NATIVE_IMAGE_BUILD_ARGUMENTS=’-J-Ddd.profiling.enabled=true –enable-monitoring=jfr’`.

[6]: /tracing/trace_collection/automatic_instrumentation/dd_libraries/java/
[8]: https://github.com/paketo-buildpacks/datadog
{{% /tab %}}

{{< /tabs >}}

#### Usage

After completing the setup, the service should send traces to Datadog.

You can view traces using the [Trace Explorer][9].

{{% collapse-content title="Troubleshooting" level="h4" %}}
##### Native-image buildpack versions older than 5.12.2

Older native-image buildpack versions expose the following option: `USE_NATIVE_IMAGE_JAVA_PLATFORM_MODULE_SYSTEM`.

When this option is `false`, exceptions like the following can occur:

```text
Caused by: org.graalvm.compiler.java.BytecodeParser$BytecodeParserError: 
com.oracle.graal.pointsto.constraints.UnsupportedFeatureException: 
No instances of datadog.trace.bootstrap.DatadogClassLoader are allowed in the image heap 
as this class should be initialized at image runtime. To see how this object got 
instantiated use --trace-object-instantiation=datadog.trace.bootstrap.DatadogClassLoader.
```

Solutions to this issue are:

- Set `USE_NATIVE_IMAGE_JAVA_PLATFORM_MODULE_SYSTEM` explicitly to true in the image env configuration,
- Or upgrade the `native-image` buildpack to version 5.12.2 or later. The best way to do this is by upgrading the `java-native-image` buildpack to 8.13.0 or later.

##### Paketo buildpack for Datadog versions older than 4.6.0

Paketo buildpack for Datadog had a bug in older versions that materialized with the following error message:

```text
disabling Datadog at launch time is unsupported for Node
ERROR: failed to launch: exec.d: failed to execute exec.d file at path '/layers
paketo-buildpacks_datadog/helper/exec.d/toggle': exit status 1
```

The solution to this issue is to upgrade to version 4.6.0 or later.

{{% /collapse-content %}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/dd-trace-java
[2]: https://www.datadoghq.com/support/
[3]: /tracing/manual_instrumentation/java
[4]: https://github.com/DataDog/documentation#outside-contributors
[5]: /tracing/trace_collection/otel_instrumentation/java/
[7]: https://www.graalvm.org/downloads/
[9]: /tracing/trace_explorer/
