---
title: Tracing Java Applications
kind: Documentation
aliases:
- /tracing/java/
further_reading:
- link: "https://github.com/DataDog/dd-trace-java"
  tag: "Github"
  text: Source code
- link: "/tracing/"
  tag: "Documentation"
  text: APM (Tracing)
---

## Compatibility

We officially support Java 1.7 and higher of both Oracle JDK and OpenJDK.  To see what web frameworks, libraries, and datastores we support, see the Integrations section below.

## Installation and Getting Started

To begin tracing applications written in any language, first [install and configure the Datadog Agent](https://docs.datadoghq.com/tracing#installing-the-agent).

Next, download `dd-java-agent.jar` that contains the agent class files:

```shell
wget -O dd-java-agent.jar 'https://search.maven.org/remote_content?g=com.datadoghq&a=dd-java-agent&v=LATEST'
```

Finally, add the following JVM argument when starting your application—in your IDE, your Maven or Gradle application script, or your `java -jar` command:

```
-javaagent:/path/to/the/dd-java-agent.jar
```

## Configuration

The tracer is configured using System Properties and Environment Variables as follows:

| Config             | System Property       | Environment Variable      |  Default           |
| ------------------ | --------------------- | ------------------------- | ------------------ |
| service.name       | dd.service.name       | DD_SERVICE_NAME           | `unnamed-java-app` |
| writer.type        | dd.writer.type        | DD_WRITER_TYPE            | `DDAgentWriter`    |
| agent.host         | dd.agent.host         | DD_AGENT_HOST             | `localhost`        |
| agent.port         | dd.agent.port         | DD_AGENT_PORT             | `8126`             |
| priority.sampling  | dd.priority.sampling  | DD_PRIORITY_SAMPLING      | `false`            |


* **service.name**: The name of a set of processes that do the same job. Used for grouping stats for your application.
* **writer.type**: Default value sends traces to the trace agent. Configuring with `LoggingWriter` instead write traces out to the console.
* **agent.host**: Hostname for where to send traces to. If using a containerized environment, configure this to be the host ip.  See our [docker docs](https://docs.datadoghq.com/tracing/docker/) for additional detail.
* **agent.port**: Port number the agent is listening on for configured host.
* **priority.sampling**: Changes how the client and agent sample traces. See [Sampling / distributed tracing](#sampling) section below for details.

If the same key type is set for both, the system property configuration takes priority.

## Manual Instrumentation 

Before instrumenting your application, review Datadog’s [APM Terminology](/tracing/terminology/) and familiarize yourself with the core concepts of Datadog APM.

If you aren't using a [supported framework instrumentation](#integrations), or you would like additional depth in your application’s traces, you may want to to manually instrument your code.  
Do this either using the `@Trace` annotation for simple method call tracing or with the `OpenTracing` API for complex tracing.

### @Trace Annotation

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

Now add `@Trace` to methods to have them be traced when running with `dd-java-agent.jar`.  If the agent is not attached, this annotation will have no effect on your application.

### OpenTracing API

Use the Datadog Tracer (`dd-trace-ot`) library to measure execution times for specific pieces of code. This lets you trace your application more precisely than you can with the Java Agent alone.

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
import io.opentracing.util.GlobalTracer;

class InstrumentedClass {

    void method0() {
        // 1. Configure your application using environment variables or system properties
        // 2. Using the Java Agent (-javaagent;/path/to/agent.jar), the GlobalTracer is automatically instantiated.
        Tracer tracer = GlobalTracer.get();

        Scope scope = tracer.buildSpan("operation-name").startActive(true);
        try {
          scope.span().setTag(DDTags.SERVICE_NAME, "my-new-service");

          // The code you're tracing
          Thread.sleep(1000);

          // If you don't call close(), the span data will NOT make it to Datadog!
        finally {
          scope.close();
        }
    }
}
```

Alternatively, wrap the code you want to trace in a `try-with-resources` statement:

```java
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

In this case, you don't need to call `scope.close()`.

If you’re not using `dd-trace-java.jar`, you must provide a configured tracer. This can be easily done by using the `TracerFactory` or manually in the bootstrap method (i.e. `main`).

```java
import datadog.opentracing.DDTracer;
import io.opentracing.util.GlobalTracer;
import datadog.trace.api.sampling.AllSampler;

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

Notice the above examples only use the OpenTracing classes. Please reference the [OpenTracing API](https://github.com/opentracing/opentracing-java) for more details and information. [Additional documentation on the api](docs/opentracing-api.md) is also available.

## Sampling / distributed tracing

Priority sampling ensures that distributed traces are complete by assigning and propagating a priority value along each trace.

Current Priority Values (more may be added in the future):

|Sampling Value | Effect                                                                                                     |
|---------------|:----------------------------------------------------------------------------------------------------------:|
|SAMPLER_DROP   | The sampler automatically decided to not keep the trace. The Agent will drop it.                           |
|SAMPLER_KEEP   | The sampler automatically decided to keep the trace. The Agent will keep it. Might be sampled server-side. |
|USER_DROP      | The user asked to not keep the trace. The Agent will drop it.                                              |
|USER_KEEP      | The user asked to keep the trace. The Agent will keep it. The server will keep it too.                     |


Priority sampling is disabled by default. To enable it, configure the `priority.sampling` flag to `true`. [How to configure the client?](# Configuration).

Once enabled, the sampler automatically assign a priority to traces, depending on their service and volume.

You can also set this priority manually to either drop a non-interesting trace or to keep an important one.
```java
import datadog.opentracing.DDSpan;
import datadog.trace.api.Trace;
import datadog.trace.common.sampling.PrioritySampling;
import io.opentracing.util.GlobalTracer;

public class MyClass {
  @Trace
  public static void myMethod() {
    // grab the active span out of the traced method
    DDSpan ddspan = (DDSpan) GlobalTracer.get().activeSpan();
    // ask the sampler to keep the current trace
    ddspan.setSamplingPriority(PrioritySampling.USER_KEEP);
    // method impl follows
  }
}
```

## Integrations

### Web Frameworks

`dd-java-agent` includes support for automatically tracing the following web frameworks.

| Server | Versions |
| ------------- |:-------------|
| Java Servlet Compatible | 2.3+, 3.0+ |

*Note:* Many application servers are Servlet compatible, such as Tomcat, Jetty, Websphere, Weblogic, etc.
Also, frameworks like Spring Boot and Dropwizard inherently work because they use a Servlet compatible embedded application server.

### Networking Frameworks

`dd-java-agent` includes support for automatically tracing the following networking frameworks.

| Framework        | Versions           |
| ------------- |:-------------:|
| [OkHTTP](https://github.com/opentracing-contrib/java-okhttp) | 3.x |
| [Apache HTTP Client](https://github.com/opentracing-contrib/java-apache-httpclient) | 4.3 + |
| [AWS SDK](https://github.com/opentracing-contrib/java-aws-sdk) | 1.11.0+ |
| [JMS 2](https://github.com/opentracing-contrib/java-jms) | 2.x |

### Datastores

`dd-java-agent` includes support for automatically tracing the following database frameworks/drivers.

| Database      | Versions           |
| ------------- |:-------------:|
| JDBC | 4.x |
| [MongoDB](https://github.com/opentracing-contrib/java-mongo-driver) | 3.x |
| [Cassandra](https://github.com/opentracing-contrib/java-cassandra-driver) | 3.2.x |

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}