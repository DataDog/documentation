---
title: Tracing Java Applications
kind: Documentation
aliases:
- /tracing/java
- /tracing/languages/java
further_reading:
- link: "https://github.com/DataDog/dd-trace-java"
  tag: "Github"
  text: Source code
- link: "tracing/visualization/"
  tag: "Documentation"
  text: "Explore your services, resources and traces"
- link: "tracing/advanced_usage/"
  tag: "Advanced Usage"
  text: "Advanced Usage"
---

## Installation and Getting Started

To begin tracing applications written in any language, first [install and configure the Datadog Agent][3] (see additional documentation for [tracing Docker applications](/tracing/setup/docker/)).

Next, download `dd-java-agent.jar` that contains the Agent class files:

```shell
wget -O dd-java-agent.jar 'https://search.maven.org/classic/remote_content?g=com.datadoghq&a=dd-java-agent&v=LATEST'
```

Finally, add the following JVM argument when starting your application in your IDE, your Maven or Gradle application script, or your `java -jar` command:

```
-javaagent:/path/to/the/dd-java-agent.jar
```

## Automatic Instrumentation

Automatic instrumentation for Java uses the `java-agent` instrumentation capabilities [provided by the JVM][8]. When a `java-agent` is registered, it has the ability to modify class files at load time.
The `java-agent` uses the popular [Byte Buddy framework][9] to find the classes defined for instrumentation and modify those class bytes accordingly.

Instrumentation may come from auto-instrumentation, the OpenTracing api, or a mixture of both. Instrumentation generally captures the following info:

* Method execution time
* Timing duration is captured using the JVM's nanotime clock unless a timestamp is provided from the OpenTracing api
* Key/value tag pairs
* Errors and stacktraces which are unhanded by the application
* A total count of traces (requests) flowing through the system

## Compatibility

We officially support the Java JRE 1.7 and higher of both Oracle JDK and OpenJDK.

### Integrations

#### Web Framework Compatibility

`dd-java-agent` includes support for automatically tracing the following web frameworks.

| Server                       | Versions   | Support Type    | JVM Arg to enable                                                             |
| :--------------------------- | :--------- | :-------------- | :----------------                                                             |
| Java Servlet Compatible      | 2.3+, 3.0+ | Fully Supported | N/A                                                                           |
| Jax-RS Annotations           | JSR311-API | Fully Supported | N/A                                                                           |
| Play                         | 2.4-2.6    | Fully Supported | N/A                                                                           |
| Spring-Web                   | 4.0+       | Fully Supported | N/A                                                                           |
| Akka-Http Server             | 10.0+      | Beta            | `-Ddd.integration.akka-http.enabled=true`                                     |
| Netty Http Server and Client | 4.0+       | Beta            | `-Ddd.integration.netty.enabled=true`                                         |
| Ratpack                      | 1.4+       | Beta            | `-Ddd.integration.ratpack.enabled=true`                                       |
| Spark Java                   | 2.4+       | Beta            | `-Ddd.integration.sparkjava.enabled=true -Ddd.integration.jetty.enabled=true` |

**Web Framework tracing provides:** timing HTTP request to response, tags for the HTTP request (status code, method, etc), error and stacktrace capturing, linking work created within a web request and Distributed Tracing.

*Note:* Many application servers are Servlet compatible, such as Tomcat, Jetty, Websphere, Weblogic, etc.
Also, frameworks like Spring Boot and Dropwizard inherently work because they use a Servlet compatible embedded application server.

Don't see your desired web frameworks? We're continually adding additional support, [check with the Datadog team][2] to see if we can help.

[2]: /help

#### Networking Framework Compatibility

`dd-java-agent` includes support for automatically tracing the following networking frameworks.

| Framework                    | Versions | Support Type    | JVM Arg to enable                                                             |
| :--------------------------- | :------- | :-------------- | :----------------                                                             |
| Apache HTTP Client           | 4.3+     | Fully Supported | N/A                                                                           |
| AWS Java SDK                 | 1.11+    | Fully Supported | N/A                                                                           |
| Kafka-Clients                | 0.11+    | Fully Supported | N/A                                                                           |
| Kafka-Streams                | 0.11+    | Fully Supported | N/A                                                                           |
| Jax RS Client                | 1.11+    | Fully Supported | N/A                                                                           |
| JMS                          | 1 and 2  | Fully Supported | N/A                                                                           |
| OkHTTP                       | 3.0+     | Fully Supported | N/A                                                                           |
| Elasticsearch Client         | 5.0+     | Beta            | `-Ddd.integration.elasticsearch.enabled=true`                                 |
| HttpURLConnection            | all      | Beta            | `-Ddd.integration.httpurlconnection.enabled=true`                             |
| Lettuce                      | 5.0+     | Beta            | `-Ddd.integration.lettuce.enabled=true`                                       |
| SpyMemcached                 | 2.12+    | Beta            | `-Ddd.integration.spymemcached.enabled=true`                                  |

**Networking tracing provides:** timing request to response, tags for the request (e.g. response code), error and stacktrace capturing, and distributed tracing.

Don't see your desired networking framework? We're continually adding additional support, [check with the Datadog team][2] to see if we can help.

[2]: /help

#### Data Store Compatibility

`dd-java-agent` includes support for automatically tracing the following database frameworks/drivers.

| Database       | Versions       | Support Type    | JVM Arg to enable                                                             |
| :------------- | :------------- | :-------------- | :----------------                                                             |
| Cassandra      | 3.2+           | Fully Supported | N/A                                                                           |
| JDBC           | N/A            | Fully Supported | N/A                                                                           |
| Jedis          | 1.4+           | Fully Supported | N/A                                                                           |
| MongoDB        | 3.0+           | Fully Supported | N/A                                                                           |

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

Don't see your desired datastores? We're continually adding additional support, [check with the Datadog team][2] to see if we can help.

[2]: /help

#### Other Framework Compatibility

`dd-java-agent` includes support for automatically tracing the following other frameworks.

| Framework     | Versions | Support Type    | JVM Arg to enable                                                             |
| :------------ | :------- | :-------------- | :----------------                                                             |
| Hystrix       | 1.4+     | Fully Supported | N/A                                                                           |
| JSP Rendering | 2.3+     | Beta            | `-Ddd.integration.jsp.enabled=true`                                           |

Don't see your desired framework? We're continually adding additional support, [check with the Datadog team][2] to see if we can help.

To improve visibility into applications using unsupported frameworks, consider:

* Adding custom instrumentation (with OpenTracing or the `@Trace` annotation).
* [Submitting a pull request][1] with instrumentation for inclusion in a future release.
* [Contacting support][2] and submitting a feature request.

[1]: https://github.com/DataDog/documentation#outside-contributors
[2]: /help

## Configuration

The tracer is configured using System Properties and Environment Variables as follows:

{{% table responsive="true" %}}

| Config              | System Property        | Environment Variable      | Default            | Description                                                                                                                                                                        |
| :-----------------  | :--------------------  | :------------------------ | :----------------- | :----------                                                                                                                                                                        |
| `service.name`      | `dd.service.name`      | `DD_SERVICE_NAME`         | `unnamed-java-app` | The name of a set of processes that do the same job. Used for grouping stats for your application.                                                                                 |
| `service.mapping`   | `dd.service.mapping`   | `DD_SERVICE_MAPPING`      | `null`             | (Example: `key1:value1,key2:value2`) Dynamically rename services via configuration. Useful for making databases have distinct names across different services.                     |
| `writer.type`       | `dd.writer.type`       | `DD_WRITER_TYPE`          | `DDAgentWriter`    | Default value sends traces to the Agent. Configuring with `LoggingWriter` instead writes traces out to the console.                                                          |
| `agent.host`        | `dd.agent.host`        | `DD_AGENT_HOST`           | `localhost`        | Hostname for where to send traces to. If using a containerized environment, configure this to be the host ip.  See the [docker documentation][4] for additional detail.                     |
| `agent.port`        | `dd.agent.port`        | `DD_AGENT_PORT`           | `8126`             | Port number the Agent is listening on for configured host.                                                                                                                         |
| `priority.sampling` | `dd.priority.sampling` | `DD_PRIORITY_SAMPLING`    | `false`            | Enable priority sampling to ensure distributed traces are complete or to require sampling of specific traces. See [Distributed tracing](#distributed-tracing) section for details. |
| `trace.span.tags`   | `dd.trace.span.tags`   | `DD_TRACE_SPAN_TAGS`      | `null`             | (Example: `key1:value1,key2:value2`) A list of default tags to be added to every span. Tags of the same name added directly to a span will overwrite the defaults provided here.   |
| `trace.header.tags` | `dd.trace.header.tags` | `DD_TRACE_HEADER_TAGS`    | `null`             | (Example: `CASE-insensitive-Header:my-tag-name,User-ID:userId`) A map of header keys to tag names.  Automatically apply header values as tags on traces.                           |
| `trace.annotations` | `dd.trace.annotations` | `DD_TRACE_ANNOTATIONS`    | ([listed][10]      | (Example: `com.some.Trace;io.other.Trace`) A list of method annotations to treat as `@Trace`.                                                                                      |
| `trace.methods`     | `dd.trace.methods`     | `DD_TRACE_METHODS`        | `null`             | (Example: `package.ClassName[method1,method2,...];AnonymousClass$1[call]`) List of class/interface and methods to trace.  Similar to adding `@Trace`, but without changing code.   |
{{% /table %}}

**Note**:

* If the same key type is set for both, the system property configuration takes priority.
* System properties can be used as JVM parameters.

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
instrumented components for Java applications [in the integration section](#integrations).

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

Now add `@Trace` to methods to have them be traced when running with `dd-java-agent.jar`.  If the Agent is not attached, this annotation will have no effect on your application.

## JMX Metrics

Datadog's [JMX Integration][7] monitors additional metrics around: JVM heap memory, thread count, and garbage collection. Use it in conjunction with APM for an even broader view into your Java app's performance.

## Performance

Java APM has minimal impact on the overhead of an application:

* No collections maintained by Java APM grow unbounded in memory
* Reporting traces does not block the application thread
* Java APM typically adds no more than a 3% increase in CPU usage
* Java APM typically adds no more than a 3% increase in JVM heap usage

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/documentation#outside-contributors
[2]: /help
[3]: https://docs.datadoghq.com/tracing/setup
[4]: https://docs.datadoghq.com/tracing/setup/docker/
[6]: https://github.com/opentracing/opentracing-java
[7]: https://docs.datadoghq.com/integrations/java/
[8]: https://docs.oracle.com/javase/8/docs/api/java/lang/instrument/package-summary.html
[9]: http://bytebuddy.net/
[10]: https://github.com/DataDog/dd-trace-java/blob/master/dd-java-agent/instrumentation/trace-annotation/src/main/java/datadog/trace/instrumentation/trace_annotation/TraceAnnotationsInstrumentation.java#L37
