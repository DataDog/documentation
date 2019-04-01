---
title: Tracing Java Applications
kind: Documentation
aliases:
- /tracing/java
- /tracing/languages/java
- /agent/apm/java/
further_reading:
- link: "https://github.com/DataDog/dd-trace-java"
  tag: "GitHub"
  text: "Datadog Java APM source code"
- link: "tracing/visualization/"
  tag: "Documentation"
  text: "Explore your services, resources and traces"
- link: "tracing/advanced_usage/?tab=java"
  tag: "Advanced Usage"
  text: "Advanced Usage"
---

## Installation and Getting Started

To begin tracing applications written in any language, first [install and configure the Datadog Agent][1], see the additional documentation for [tracing Docker applications][2] or [Kubernetes applications][3].

Next, download `dd-java-agent.jar` that contains the Agent class files:

```shell
wget -O dd-java-agent.jar 'https://search.maven.org/classic/remote_content?g=com.datadoghq&a=dd-java-agent&v=LATEST'
```

Finally, add the following JVM argument when starting your application in your IDE, Maven or Gradle application script, or `java -jar` command:

```
-javaagent:/path/to/the/dd-java-agent.jar
```

Note that `dd-trace-java`'s artifacts (`dd-java-agent.jar`, `dd-trace-api.jar`, `dd-trace-ot.jar`) support all JVM-based languages, i.e. Scala, Groovy, Kotlin, Clojure, etc. If you need support for a particular framework, consider making an [open-source contribution][4].

## Automatic Instrumentation

Automatic instrumentation for Java uses the `java-agent` instrumentation capabilities [provided by the JVM][5]. When a `java-agent` is registered, it has the ability to modify class files at load time.
The `java-agent` uses the [Byte Buddy framework][6] to find the classes defined for instrumentation and modify those class bytes accordingly.

Instrumentation may come from auto-instrumentation, the OpenTracing api, or a mixture of both. Instrumentation generally captures the following info:

* Timing duration is captured using the JVM's nanotime clock unless a timestamp is provided from the OpenTracing api
* Key/value tag pairs
* Errors and stacktraces which are unhandled by the application
* A total count of traces (requests) flowing through the system

## Compatibility

Datadog officially supports the Java JRE 1.7 and higher of both Oracle JDK and OpenJDK.

### Integrations

Most integrations are enabled by default. The following setting can change the default to disabled.
* System Property: `-Ddd.integrations.enabled=false`
* Environment Variable: `DD_INTEGRATIONS_ENABLED=false`

Integrations can be enabled or disabled individually (overriding the default above).
* System Property: `-Ddd.integration.<integration-name>.enabled=true`
* Environment Variable: `DD_INTEGRATION_<INTEGRATION_NAME>_ENABLED=true`

(See below for each integration's name.)

Beta integrations are disabled by default but can be enabled individually.

#### Web Framework Compatibility

`dd-java-agent` includes support for automatically tracing the following web frameworks.

| Server                       | Versions   | Support Type    | Instrumentation Names (used for configuration)   |
|------------------------------|------------|-----------------|--------------------------------------------------|
| Akka-Http Server             | 10.0+      | Fully Supported | `akka-http`, `akka-http-server`                  |
| Java Servlet Compatible      | 2.3+, 3.0+ | Fully Supported | `servlet`, `servlet-2`, `servlet-3`              |
| Jax-RS Annotations           | JSR311-API | Fully Supported | `jax-rs`, `jaxrs`, `jax-rs-annotations`          |
| Jetty (non-Servlet)          | 8+         | [Beta][7]  | `jetty`, `jetty-8`                               |
| Netty Http Server and Client | 4.0+       | Fully Supported | `netty`, `netty-4.0`, `netty-4.1`                |
| Play                         | 2.4-2.6    | Fully Supported | `play`                                           |
| Ratpack                      | 1.4+       | [Beta][7]  | `ratpack`                                        |
| Spark Java                   | 2.3+       | [Beta][7]  | `sparkjava` (requires `jetty`)                   |
| Spring Web (MVC)             | 4.0+       | Fully Supported | `spring-web`                                     |
| Spring WebFlux               | 5.0+       | Fully Supported | `spring-webflux`                                 |
| Vert.x-Web                   | 4.1.0+     | Fully Supported | (requires `netty`)                               |

**Web Framework tracing provides:** timing HTTP request to response, tags for the HTTP request (status code, method, etc), error and stacktrace capturing, linking work created within a web request and Distributed Tracing.

*Note:* Many application servers are Servlet compatible and are automatically covered by that instrumentation, such as Tomcat, Jetty, Websphere, Weblogic, etc.
Also, frameworks like Spring Boot inherently work because it uses a Servlet compatible embedded application server.

Don't see your desired web frameworks? Datadog is continually adding additional support. Contact [Datadog support][8] if you need help.

#### Networking Framework Compatibility

`dd-java-agent` includes support for automatically tracing the following networking frameworks.

| Framework          | Versions    | Support Type    | Instrumentation Names (used for configuration) |
|--------------------|-------------|-----------------|------------------------------------------------|
| Apache HTTP Client | 4.3+        | Fully Supported | `httpclient`                                   |
| AWS Java SDK       | 1.11+, 2.2+ | Fully Supported | `aws-sdk`                                      |
| gRPC               | 1.5+        | Fully Supported | `grpc`, `grpc-client`, `grpc-server`           |
| HttpURLConnection  | all         | Fully Supported | `httpurlconnection`, `urlconnection`           |
| Kafka-Clients      | 0.11+       | Fully Supported | `kafka`                                        |
| Kafka-Streams      | 0.11+       | Fully Supported | `kafka`, `kafka-streams`                       |
| Jax RS Clients     | 1.11+       | Fully Supported | `jax-rs`, `jaxrs`, `jax-rs-client`             |
| JMS                | 1 and 2     | Fully Supported | `jms`                                          |
| Rabbit AMQP        | 2.7+        | Fully Supported | `amqp`, `rabbitmq`                             |
| OkHTTP             | 3.0+        | Fully Supported | `okhttp`, `okhttp-3`                           |

**Networking tracing provides:** timing request to response, tags for the request (e.g. response code), error and stacktrace capturing, and distributed tracing.

Don't see your desired networking framework? Datadog is continually adding additional support. Contact [Datadog support][8] if you need help.

#### Data Store Compatibility

`dd-java-agent` includes support for automatically tracing the following database frameworks/drivers.

| Database                | Versions | Support Type    | Instrumentation Names (used for configuration)                                           |
|---------------          |----------|-----------------|------------------------------------------------------------------------------------------|
| Couchbase               | 2.0+     | Fully Supported | `couchbase`                                                                              |
| Cassandra               | 3.X      | Fully Supported | `cassandra`                                                                              |
| Elasticsearch Transport | 2.0+     | Fully Supported | `elasticsearch`, `elasticsearch-transport`, `elasticsearch-transport-{2,5,6}` (pick one) |
| Elasticsearch Rest      | 5.0+     | Fully Supported | `elasticsearch`, `elasticsearch-rest`, `elasticsearch-rest-5`, `elasticsearch-rest-6`    |
| Hibernate               | 3.5+     | Fully Supported | `hibernate`                                                                              |
| JDBC                    | N/A      | Fully Supported | `jdbc`                                                                                   |
| Jedis                   | 1.4+     | Fully Supported | `redis`                                                                                  |
| Lettuce                 | 5.0+     | Fully Supported | `lettuce`                                                                                |
| MongoDB                 | 3.0+     | Fully Supported | `mongo`                                                                                  |
| SpyMemcached            | 2.12+    | Fully Supported | `spymemcached`                                                                           |

`dd-java-agent` is also compatible with common JDBC drivers including:

*  Apache Derby
*  Firebird SQL
*  H2 Database Engine
*  HSQLDB
*  IBM DB2
*  MariaDB
*  MSSQL (Microsoft SQL Server)
*  MySQL
*  Oracle
*  Postgres SQL

**Datastore tracing provides:** timing request to response, query info (e.g. a sanitized query string), and error and stacktrace capturing.

Don't see your desired datastores? Datadog is continually adding additional support. Contact [Datadog support][8] if you need help.

#### Other Framework Compatibility

`dd-java-agent` includes support for automatically tracing the following other frameworks.

| Framework        | Versions | Support Type    | Instrumentation Names (used for configuration) |
|------------------|----------|-----------------|------------------------------------------------|
| Slf4J MDC        | 1+       | Fully Supported | `mdc` (See also `dd.logs.injection` config)    |
| JSP Rendering    | 2.3+     | Fully Supported | `jsp`, `jsp-render`                            |
| Dropwizard Views | 0.7+     | Fully Supported | `dropwizard`, `dropwizard-view`                |
| Hystrix          | 1.4+     | Fully Supported | `hystrix`                                      |

Don't see your desired framework? Datadog is continually adding additional support. Contact [Datadog support][8] if you need help.

To improve visibility into applications using unsupported frameworks, consider:

* Adding custom instrumentation (with OpenTracing or the `@Trace` annotation).
* [Submitting a pull request][9] with instrumentation for inclusion in a future release.
* Contacting [Datadog support][8] and submitting a feature request.

## Configuration

The tracer is configured using System Properties and Environment Variables as follows:
(See integration specific config in the [integrations][7] section above.)

{{% table responsive="true" %}}

| System Property                    | Environment Variable               | Default              | Description                                                                                                                                                                                                             |
|------------------------------------|------------------------------------|----------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `dd.service.name`                  | `DD_SERVICE_NAME`                  | `unnamed-java-app`   | The name of a set of processes that do the same job. Used for grouping stats for your application.                                                                                                                      |
| `dd.service.mapping`               | `DD_SERVICE_MAPPING`               | `null`               | (Example: `key1:value1,key2:value2`) Dynamically rename services via configuration. Useful for making databases have distinct names across different services.                                                          |
| `dd.writer.type`                   | `DD_WRITER_TYPE`                   | `DDAgentWriter`      | Default value sends traces to the Agent. Configuring with `LoggingWriter` instead writes traces out to the console.                                                                                                     |
| `dd.agent.host`                    | `DD_AGENT_HOST`                    | `localhost`          | Hostname for where to send traces to. If using a containerized environment, configure this to be the host IP.  See [Tracing Docker Applications][1] for more details.                                                   |
| `dd.trace.agent.port`              | `DD_TRACE_AGENT_PORT`              | `8126`               | Port number the Agent is listening on for configured host.                                                                                                                                                              |
| `dd.priority.sampling`             | `DD_PRIORITY_SAMPLING`             | `true`               | Enable priority sampling to ensure distributed traces are complete or to require sampling of specific traces. See [Distributed Tracing][2] for more details.                                                            |
| `dd.trace.global.tags`             | `DD_TRACE_GLOBAL_TAGS`             | `null`               | (Example: `key1:value1,key2:value2`) A list of default tags to be added to every span and every JMX metric. This value is merged into `trace.span.tags` and `trace.jmx.tags` to provide single place to configure both. |
| `dd.trace.span.tags`               | `DD_TRACE_SPAN_TAGS`               | `null`               | (Example: `key1:value1,key2:value2`) A list of default tags to be added to every span. Tags of the same name added directly to a span overwrite the defaults provided here.                                        |
| `dd.trace.jmx.tags`                | `DD_TRACE_JMX_TAGS`                | `null`               | (Example: `key1:value1,key2:value2`) A list of default tags to be added to every JMX metric. Tags of the same name added in JMX metrics configuration overwrite the defaults provided here.                        |
| `dd.trace.header.tags`             | `DD_TRACE_HEADER_TAGS`             | `null`               | (Example: `CASE-insensitive-Header:my-tag-name,User-ID:userId`) A map of header keys to tag names.  Automatically apply header values as tags on traces.                                                                |
| `dd.trace.annotations`             | `DD_TRACE_ANNOTATIONS`             | ([listed here][3])   | (Example: `com.some.Trace;io.other.Trace`) A list of method annotations to treat as `@Trace`.                                                                                                                           |
| `dd.trace.methods`                 | `DD_TRACE_METHODS`                 | `null`               | (Example: `package.ClassName[method1,method2,...];AnonymousClass$1[call]`) List of class/interface and methods to trace.  Similar to adding `@Trace`, but without changing code.                                        |
| `dd.jmxfetch.enabled`              | `DD_JMXFETCH_ENABLED`              | `false`              | Enable collection of JMX metrics by Java Tracing Agent.                                                                                                                                                                 |
| `dd.jmxfetch.metrics-configs`      | `DD_JMXFETCH_METRICS_CONFIGS`      | `null`               | (Example: `/file/loction1,/file/location2`) Additional metrics configuration file for JMX metrics collection.                                                                                                           |
| `dd.jmxfetch.check-period`         | `DD_JMXFETCH_CHECK_PERIOD`         | `1500`               | How often to send JMX metrics (in ms).                                                                                                                                                                                  |
| `dd.jmxfetch.refresh-beans-period` | `DD_JMXFETCH_REFRESH_BEANS_PERIOD` | `600`                | How often to refresh list of avalable JMX beans (in seconds).                                                                                                                                                           |
| `dd.jmxfetch.statsd.host`          | `DD_JMXFETCH_STATSD_HOST`          | same as `agent.host` | Statsd host to send JMX metrics to.                                                                                                                                                                                     |
| `dd.jmxfetch.statsd.port`          | `DD_JMXFETCH_STATSD_PORT`          | 8125                 | Statsd port to send JMX metrics to.                                                                                                                                                                                     |
| `dd.logs.injection`                | `DD_LOGS_INJECTION`                | false                | Enabled automatic MDC key injection for Datadog trace and span ids. See [Advanced Usage][4] for details                                                                                                                 |

[1]: /tracing/setup/docker
[2]: /tracing/guide/distributed_tracing
[3]: https://github.com/DataDog/dd-trace-java/blob/master/dd-java-agent/instrumentation/trace-annotation/src/main/java/datadog/trace/instrumentation/trace_annotation/TraceAnnotationsInstrumentation.java#L37
[4]: /tracing/enrich_tracing/connect_log_and_traces/?tab=java
{{% /table %}}

**Note**:

* If the same key type is set for both, the system property configuration takes priority.
* System properties can be used as JVM parameters.

### B3 Headers Extraction and Injection

Datadog APM tracer supports [B3 headers extraction][10] and injection for
distributed tracing.

Distributed headers injection and extraction is controlled by
configuring injection/extraction styles. Currently two styles are
supported:

* Datadog: `Datadog`
* B3: `B3`

Injection styles can be configured using:

* System Property: `-Ddd.propagation.style.inject=Datadog,B3`
* Environment Variable: `DD_PROPAGATION_STYLE_INJECTION=Datadog,B3`

The value of the property or environment variable is a comma (or
space) separated list of header styles that are enabled for
injection. By default only Datadog injection style is enabled.

Extraction styles can be configured using:

* System Property: `-Ddd.propagation.style.extraction=Datadog,B3`
* Environment Variable: `DD_PROPAGATION_STYLE_EXTRACTION=Datadog,B3`

The value of the property or environment variable is a comma (or
space) separated list of header styles that are enabled for
extraction. By default only Datadog extraction style is enabled.

If multiple extraction styles are enabled extraction attempt is done
on the order those styles are configured and first successful
extracted value is used.


## Trace Reporting

To report a trace to Datadog the following happens:

* Trace completes
* Trace is pushed to an asynchronous queue of traces
  * Queue is size-bound and doesn't grow past a set limit of 7000 traces
  * Once the size limit is reached, traces are discarded
  * A count of the total traces is captured to ensure accurate throughput
* In a separate reporting thread, the trace queue is flushed and traces are encoded via msgpack then sent to the Datadog Agent via http
* Queue flushing happens on a schedule of once per second

To see the actual code, documentation, and usage examples for any of the
libraries and frameworks that Datadog supports, check the full list of auto-
instrumented components for Java applications in the [Integrations](#integrations) section.

### Trace Annotation

Add the `dd-trace-api` dependency to your project. For Maven, add this to `pom.xml`:

```xml
<dependency>
    <groupId>com.datadoghq</groupId>
    <artifactId>dd-trace-api</artifactId>
    <version>{version}</version>
</dependency>
```

For Gradle, add:

```gradle
compile group: 'com.datadoghq', name: 'dd-trace-api', version: {version}
```

Now add `@Trace` to methods to have them be traced when running with `dd-java-agent.jar`.  If the Agent is not attached, this annotation has no effect on your application.

## Performance

Java APM has minimal impact on the overhead of an application:

* No collections maintained by Java APM grow unbounded in memory
* Reporting traces does not block the application thread
* Java APM typically adds no more than a 3% increase in CPU usage
* Java APM typically adds no more than a 3% increase in JVM heap usage

## Change Agent Hostname

Configure your application level tracers to submit traces to a custom Agent hostname:

The Java Tracing Module automatically looks for and initializes with the ENV variables `DD_AGENT_HOST` and `DD_TRACE_AGENT_PORT`.

```bash
java -javaagent:<DD-JAVA-AGENT-PATH>.jar -jar <YOUR_APPLICATION_PATH>.jar
```

You can also use system properties:

```bash
java -javaagent:<DD-JAVA-AGENT-PATH>.jar \
     -Ddd.agent.host=$DD_AGENT_HOST \
     -Ddd.agent.port=$DD_TRACE_AGENT_PORT \
     -jar <YOUR_APPLICATION_PATH>.jar
```

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/setup
[2]: /tracing/setup/docker
[3]: /agent/kubernetes/daemonset_setup/#trace-collection
[4]: https://github.com/DataDog/dd-trace-java/blob/master/CONTRIBUTING.md
[5]: https://docs.oracle.com/javase/8/docs/api/java/lang/instrument/package-summary.html
[6]: http://bytebuddy.net
[7]: /help
[8]: /help
[9]: https://github.com/DataDog/documentation#outside-contributors
[10]: https://github.com/openzipkin/b3-propagation
