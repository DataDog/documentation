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
---

## Compatibility

We officially support the Java JRE 1.7 and higher of both Oracle JDK and OpenJDK.  Other JVM compatible languages (Scala, Groovy, Kotlin, etc) should work, but may be missing the instrumentation needed to be useful.  To see what web frameworks, libraries, and datastores we support, see the [Integrations section](#integrations).

To improve visibility into applications using unsupported frameworks, consider:

* Adding custom instrumentation (with OpenTracing or the `@Trace` annotation).
* [Submitting a pull request][1] with instrumentation for inclusion in a future release.
* [Contact support][2] and submit a feature request.

## Installation and Getting Started

To begin tracing applications written in any language, first [install and configure the Datadog Agent][3] (see additional documentation for [tracing Docker applications](/tracing/setup/docker/)).

Next, download `dd-java-agent.jar` that contains the Agent class files:

```shell
wget -O dd-java-agent.jar 'https://search.maven.org/remote_content?g=com.datadoghq&a=dd-java-agent&v=LATEST'
```

Finally, add the following JVM argument when starting your application in your IDE, your Maven or Gradle application script, or your `java -jar` command:

```
-javaagent:/path/to/the/dd-java-agent.jar
```

## Configuration

The tracer is configured using System Properties and Environment Variables as follows:

| Config             | System Property       | Environment Variable      | Default            | Description |
| :----------------- | :-------------------- | :------------------------ | :----------------- | :---------- |
| service.name       | dd.service.name       | DD_SERVICE_NAME           | `unnamed-java-app` | The name of a set of processes that do the same job. Used for grouping stats for your application. |
| service.mapping    | dd.service.mapping    | DD_SERVICE_MAPPING        | `null`             | (Example: `key1:value1,key2:value2`) Dynamically rename services via configuration. Useful for making databases have distinct names across different services. |
| writer.type        | dd.writer.type        | DD_WRITER_TYPE            | `DDAgentWriter`    | Default value sends traces to the trace Agent. Configuring with `LoggingWriter` instead writes traces out to the console. |
| agent.host         | dd.agent.host         | DD_AGENT_HOST             | `localhost`        | Hostname for where to send traces to. If using a containerized environment, configure this to be the host ip.  See our [docker docs][4] for additional detail. |
| agent.port         | dd.agent.port         | DD_AGENT_PORT             | `8126`             | Port number the Agent is listening on for configured host. |
| priority.sampling  | dd.priority.sampling  | DD_PRIORITY_SAMPLING      | `false`            | Enable priority sampling to ensure distributed traces are complete or to require sampling of specific traces. See [Sampling / distributed tracing](#sampling-distributed-tracing) section for details. |
| trace.span.tags    | dd.trace.span.tags    | DD_TRACE_SPAN_TAGS        | `null`             | (Example: `key1:value1,key2:value2`) A list of default tags to be added to every span. Tags of the same name added directly to a span will overwrite the defaults provided here. |
| trace.header.tags  | dd.trace.header.tags  | DD_TRACE_HEADER_TAGS      | `null`             | (Example: `CASE-insensitive-Header:my-tag-name,User-ID:userId`) A map of header keys to tag names.  Automatically apply header values as tags on traces. |
| trace.annotations  | dd.trace.annotations  | DD_TRACE_ANNOTATIONS      | ([listed](https://github.com/DataDog/dd-trace-java/blob/master/dd-java-agent/instrumentation/trace-annotation/src/main/java/datadog/trace/instrumentation/trace_annotation/TraceAnnotationsInstrumentation.java#L37)) | (Example: `com.some.Trace;io.other.Trace`) A list of method annotations to treat as `@Trace`. |
| trace.methods      | dd.trace.methods      | DD_TRACE_METHODS          | `null`              | (Example: `package.ClassName[method1,method2,...];AnonymousClass$1[call]`) List of class/interface and methods to trace.  Similar to adding `@Trace`, but without changing code. |

**Note**:

* If the same key type is set for both, the system property configuration takes priority.
* System properties can be used as JVM parameters.

## Manual Instrumentation

Before instrumenting your application, review Datadog’s [APM Terminology][5] and familiarize yourself with the core concepts of Datadog APM. If you aren't using a [supported framework instrumentation](#integrations), or you would like additional depth in your application’s traces, you may want to to manually instrument your code.

Do this either using the [Trace annotation](#trace-annotation) for simple method call tracing or with the [OpenTracing API](#opentracing-api) for complex tracing.

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

### OpenTracing API

Use the [OpenTracing API][6] and the Datadog Tracer (dd-trace-ot) library to measure execution times for specific pieces of code. This lets you trace your application more precisely than you can with the Java Agent alone.

#### Setup

For Maven, add this to `pom.xml`:

```xml
<!-- OpenTracing API -->
<dependency>
    <groupId>io.opentracing</groupId>
    <artifactId>opentracing-api</artifactId>
    <version>0.31.0</version>
</dependency>

<!-- OpenTracing Util -->
<dependency>
    <groupId>io.opentracing</groupId>
    <artifactId>opentracing-util</artifactId>
    <version>0.31.0</version>
</dependency>

<!-- Datadog Tracer (only needed if you do not use dd-java-agent) -->
<dependency>
    <groupId>com.datadoghq</groupId>
    <artifactId>dd-trace-ot</artifactId>
    <version>${dd-trace-java.version}</version>
</dependency>
```

For Gradle, add:

```
compile group: 'io.opentracing', name: 'opentracing-api', version: "0.31.0"
compile group: 'io.opentracing', name: 'opentracing-util', version: "0.31.0"
compile group: 'com.datadoghq', name: 'dd-trace-ot', version: "${dd-trace-java.version}"
```

Configure your application using environment variables or system properties as discussed in the [configuration](#configuration) section.

#### Custom Instrumentation Examples

Use a combination of these if the automatic instrumentation isn’t providing you enough depth or detail.

Using try-finally:

```java
import datadog.trace.api.DDTags;

import io.opentracing.Scope;
import io.opentracing.Tracer;
import io.opentracing.util.GlobalTracer;

class InstrumentedClass {

    void method0() {
        /*
         * 1. Configure your application using environment variables or system properties
         * 2. Using dd-java-agent (-javaagent:/path/to/dd-java-agent.jar),
         *    GlobalTracer is automatically instantiated.
         */
        Tracer tracer = GlobalTracer.get();

        Scope scope = tracer.buildSpan("operation-name").startActive(true);
        try {
            scope.span().setTag(DDTags.SERVICE_NAME, "my-new-service");

            // The code you're tracing
            Thread.sleep(1000);

        // If you don't call close(), the span data will NOT make it to Datadog!
        } finally {
            scope.close();
        }
    }
}
```

Alternatively, wrap the code you want to trace in a `try-with-resources` statement:

```java
import datadog.trace.api.DDTags;

import io.opentracing.Scope;
import io.opentracing.Tracer;
import io.opentracing.util.GlobalTracer;

class InstrumentedClass {

    void method0() {
        Tracer tracer = GlobalTracer.get();

        try (Scope scope = tracer.buildSpan("operation-name").startActive(true)) {
            scope.span().setTag(DDTags.SERVICE_NAME, "my-new-service");
            Thread.sleep(1000);
        }
    }
}
```

In this case, you dont need to call `scope.close()`.

If you’re not using `dd-java-agent.jar`, you must register a configured tracer with `GlobalTracer`. This can be easily done by calling `GlobalTracer.register(new DDTracer())` early on in your application startup (ie, main method).

```java
import datadog.opentracing.DDTracer;
import datadog.trace.api.sampling.AllSampler;
import datadog.trace.common.writer.DDAgentWriter;

import io.opentracing.Tracer;
import io.opentracing.util.GlobalTracer;

public class Application {

    public static void main(String[] args) {

        // Initialize the tracer from environment variables or system properties
        Tracer tracer = new DDTracer();
        GlobalTracer.register(tracer);

        // OR from the API
        Writer writer = new DDAgentWriter();
        Sampler sampler = new AllSampler();
        Tracer tracer = new DDTracer(writer, sampler);
        GlobalTracer.register(tracer);

        // ...
    }
}
```

Notice the above examples only use the OpenTracing classes. Please reference the [OpenTracing API][6] for more details and information.

## Sampling / Distributed Tracing

Enable priority sampling to ensure that distributed traces are complete.  Priority sampling achieves this by automatically assigning and propagating a priority value along all traces, depending on their service and volume.  Priorities can also be set manually to either drop non-interesting traces or to keep important ones.

Priority sampling is disabled by default. To enable it, configure the `priority.sampling` flag to `true` ([see how to configure the client above](#configuration)).

Current Priority Values (more may be added in the future):

| Sampling Value  | Effect                                                                                                      |
| --------------- | :---------------------------------------------------------------------------------------------------------- |
| SAMPLER_DROP    | The sampler automatically decided to not keep the trace. The Agent will drop it.                            |
| SAMPLER_KEEP    | The sampler automatically decided to keep the trace. The Agent will keep it. Might be sampled server-side.  |
| USER_DROP       | The user asked to not keep the trace. The Agent will drop it.                                               |
| USER_KEEP       | The user asked to keep the trace. The Agent will keep it. The server will keep it too.                      |

Manually set trace priority:
```java
import datadog.trace.api.Trace;
import datadog.trace.api.interceptor.MutableSpan;
import datadog.trace.common.sampling.PrioritySampling;
import io.opentracing.util.GlobalTracer;

public class MyClass {
    @Trace
    public static void myMethod() {
        // grab the active span out of the traced method
        MutableSpan ddspan = (MutableSpan) GlobalTracer.get().activeSpan();
        // ask the sampler to keep the current trace
        ddspan.setSamplingPriority(PrioritySampling.USER_KEEP);
        // method impl follows
    }
}
```

## Debugging

To return debug level application logs, enable debug mode with the flag `-Ddatadog.slf4j.simpleLogger.defaultLogLevel=debug` when starting the JVM.

## JMX Metrics

Datadog's [JMX Integration][7] monitors additional metrics around: JVM heap memory, thread count, and garbage collection. Use it in conjunction with APM for an even broader view into your Java app's performance.

## Integrations

### Web Frameworks

`dd-java-agent` includes support for automatically tracing the following web frameworks.

| Server                  | Versions   |
| :---------------------- | :--------- |
| Java Servlet Compatible | 2.3+, 3.0+ |
| Play                    | 2.4-2.6    |
| Jax-RS Annotations      | JSR311-API |
| Spring-Web              | 4.0+       |

*Note:* Many application servers are Servlet compatible, such as Tomcat, Jetty, Websphere, Weblogic, etc.
Also, frameworks like Spring Boot and Dropwizard inherently work because they use a Servlet compatible embedded application server.

Don't see your desired web frameworks? We're continually adding additional support, [check with our team][2] to see if we can help.

### Networking Frameworks

`dd-java-agent` includes support for automatically tracing the following networking frameworks.

| Framework           | Versions |
| :------------------ | :------- |
| Jax RS Client       | 1.11+    |
| OkHTTP              | 3.0+     |
| Apache HTTP Client  | 4.3+     |
| JMS                 | 1 and 2  |
| AWS Java SDK        | 1.11+    |
| Kafka-Clients       | 0.11+    |
| Kafka-Streams       | 0.11+    |

Don't see your desired networking framework? We're continually adding additional support, [check with our team][2] to see if we can help.

### Datastores

`dd-java-agent` includes support for automatically tracing the following database frameworks/drivers.

| Database        | Versions       |
| :-------------  | :------------- |
| JDBC            | N/A            |
| MongoDB         | 3.0+           |
| Cassandra       | 3.2+           |
| Jedis           | 1.4+           |

`dd-java-agent` is also compatible with common JDBC drivers including:

*  Apache Derby
*  Firebird SQL
*  H2 Database Engine
*  HSQLDB
*  IBM DB2
*  MSSQL (Microsoft SQL Server)
*  MySQL
*  MariaDB
*  Oracle
*  Postgres SQL

Don't see your desired datastores? We're continually adding additional support, [check with our team][2] to see if we can help.

### Other Frameworks

`dd-java-agent` includes support for automatically tracing the following other frameworks.

| Framework               | Versions |
| :---------------------- | :------- |
| Hystrix                 | 1.4+     |

Don't see your desired framework? We're continually adding additional support, [check with our team][2] to see if we can help.

### Beta Instrumentation

`dd-java-agent` ships with some newer instrumentation disabled by default.

| Instrumentation | Versions | JVM Arg to enable                                                                  |
| :-------------- | :------- | :----------------                                                                  |
| Elasticsearch Rest Client   | 5.0+   | `-Ddd.integration.elasticsearch.enabled=true`                            |
| Elasticsearch Transport Client   | 2.0+   | `-Ddd.integration.elasticsearch.enabled=true`                       |
| Ratpack         | 1.4+     | `-Ddd.integration.ratpack.enabled=true`                                            |
| Spark Java      | 2.4+     | `-Ddd.integration.sparkjava.enabled=true -Ddd.integration.jetty.enabled=true`      |

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/documentation#outside-contributors
[2]: /help
[3]: https://docs.datadoghq.com/tracing/setup
[4]: https://docs.datadoghq.com/tracing/setup/docker/
[5]: /tracing/visualization/services_list/
[6]: https://github.com/opentracing/opentracing-java
[7]: https://docs.datadoghq.com/integrations/java/
