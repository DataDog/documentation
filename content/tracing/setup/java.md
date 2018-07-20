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

## Automatic Instrumentation

Automatic instrumentation for Java utilizes the `java-agent` instrumentation capabilities [provided by the JVM][8]. When a `java-agent` is registered, it has the ability to modify class files at load time.
The `java-agent` uses the popular [Byte Buddy framework][9] to find the classes defined for instrumentation and modify those class bytes accordingly.

Instrumentation may come from auto-instrumentation, the OpenTracing api, or a mixture of both. Instrumentation generally captures the following info:

* Method execution time
* Timing duration is captured using the JVM's nanotime clock unless a timestamp is provided from the OpenTracing api
* Key/value tag pairs
* Errors and stacktraces which are unhanded by the application
* A total count of traces (requests) flowing through the system

### Integrations

#### Web Frameworks

Web Framework tracing provides:
* Timing HTTP request to response
* Tags for the HTTP request (status code, method, etc)
* Error and stacktrace capturing
* Linking work created within a web request
* Distributed Tracing

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

#### Networking Frameworks

Networking tracing provides:
* Timing request to response
* Tags for the request (e.g. response code)
* Error and stacktrace capturing
* Distributed Tracing

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

#### Datastores

Datastore tracing provides:
* Timing request to response
* Query info (e.g. a sanitized query string)
* Error and stacktrace capturing

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

#### Other Frameworks

`dd-java-agent` includes support for automatically tracing the following other frameworks.

| Framework               | Versions |
| :---------------------- | :------- |
| Hystrix                 | 1.4+     |

Don't see your desired framework? We're continually adding additional support, [check with our team][2] to see if we can help.

#### Beta Instrumentation

`dd-java-agent` ships with some newer instrumentation disabled by default.

| Instrumentation                | Versions | JVM Arg to enable                                                             |
| :--------------                | :------- | :----------------                                                             |
| Elasticsearch Client           | 5.0+     | `-Ddd.integration.elasticsearch.enabled=true`                                 |
| Netty Http Server and Client   | 4.0+     | `-Ddd.integration.netty.enabled=true`                                         |
| HttpURLConnection              | all      | `-Ddd.integration.httpurlconnection.enabled=true`                             |
| JSP Rendering                  | 2.3+     | `-Ddd.integration.jsp.enabled=true`                                           |
| Akka-Http Server               | 10.0+    | `-Ddd.integration.akka-http.enabled=true`                                     |
| Lettuce                        | 5.0+     | `-Ddd.integration.lettuce.enabled=true`                                       |
| SpyMemcached                   | 2.12+    | `-Ddd.integration.spymemcached.enabled=true`                                  |
| Ratpack                        | 1.4+     | `-Ddd.integration.ratpack.enabled=true`                                       |
| Spark Java                     | 2.4+     | `-Ddd.integration.sparkjava.enabled=true -Ddd.integration.jetty.enabled=true` |


## Manual Instrumentation

Before instrumenting your application, review Datadog’s [APM Terminology][5] and familiarize yourself with the core concepts of Datadog APM. If you aren't using a [supported framework instrumentation](#integrations), or you would like additional depth in your application’s traces, you may want to to manually instrument your code.

Do this either using the [Trace annotation](#trace-annotation) for simple method call tracing or with the [OpenTracing API](#opentracing-api) for complex tracing.


### Tagging

Tags are key-value pairs attached to spans. All tags share a single namespace.

The Datadog UI uses specific tags to set UI properties, such as an application's service name. A full list of these tags can be found in the [Datadog](https://github.com/DataDog/dd-trace-java/blob/master/dd-trace-api/src/main/java/datadog/trace/api/DDTags.java) and [OpenTracing](https://github.com/opentracing/opentracing-java/blob/master/opentracing-api/src/main/java/io/opentracing/tag/Tags.java) APIs.

#### Custom Tags

Custom tags are set using the OpenTracing API.

Custom tags may be set for auto-instrumentation by grabbing the active span out of the global tracer.

```java
import io.opentracing.Tracer;
import io.opentracing.util.GlobalTracer;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet
class ServletImpl extends AbstractHttpServlet {
  @Override
  void doGet(HttpServletRequest req, HttpServletResponse resp) {
    final Tracer tracer = GlobalTracer.get();
    if (tracer != null && tracer.activeSpan() != null) {
      tracer.activeSpan().setTag("org.id", 12345);
      tracer.activeSpan().setTag("http.url", "/login");
    }
    // servlet impl
  }
}
```

### Trace Reporting

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

##### Custom Async Instrumentation

Create asynchronous traces in custom instrumentation using the OpenTracing API.

```java
// Step 1: start the Scope/Span on the work submission thread
try (Scope scope = tracer.buildSpan("ServiceHandlerSpan").startActive(false)) {
    final Span span = scope.span();
    doAsyncWork(new Runnable() {
        @Override
        public void run() {
            // Step 2: reactivate the Span in the worker thread
            try (Scope scope = tracer.scopeManager().activate(span, false)) {
              // worker thread impl...
            }
        }
    });
    // submission thread impl...
}
```


Notice the above examples only use the OpenTracing classes. Please reference the [OpenTracing API][6] for more details and information.

## Distributed Tracing

Distributed Tracing links traces across multiple hosts. Linking is implemented by injecting Datadog Metadata into the request headers.

Distributed Tracing headers are language agnostic. A trace started in one language may propagate to another (for example, from Python to Java).

### Custom Distributed Tracing

Create a distributed trace in custom instrumentation using OpenTracing:

```java
// Step 1: Inject the Datadog headers in the client code
try (Scope scope = tracer.buildSpan("httpClientSpan").startActive(true)) {
    final Span span = scope.span();
    HttpRequest request = /* your code here */;

    tracer.inject(span.context(),
                  Format.Builtin.HTTP_HEADERS,
                  new MyHttpHeadersInjectAdapter(request));

    // http request impl...
}

public static class MyHttpHeadersInjectAdapter implements TextMap {
  private final HttpRequest httpRequest;

  public HttpHeadersInjectAdapter(final HttpRequest httpRequest) {
    this.httpRequest = httpRequest;
  }

  @Override
  public void put(final String key, final String value) {
    httpRequest.addHeader(key, value);
  }

  @Override
  public Iterator<Map.Entry<String, String>> iterator() {
    throw new UnsupportedOperationException("This class should be used only with tracer#inject()");
  }
}

// Step 2: Extract the Datadog headers in the server code
HttpRequest request = /* your code here */;

final SpanContext extractedContext =
  GlobalTracer.get().extract(Format.Builtin.HTTP_HEADERS,
                             new MyHttpRequestExtractAdapter(request));

try (Scope scope = tracer.buildSpan("httpServerSpan").asChildOf(extractedContext).startActive(true)) {
    final Span span = scope.span(); // will be a child of http client span in step 1
    // http server impl...
}

public class MyHttpRequestExtractAdapter implements TextMap {
  private final HttpRequest request;

  public HttpRequestExtractAdapter(final HttpRequest request) {
    this.request = request;
  }

  @Override
  public Iterator<Map.Entry<String, String>> iterator() {
    return request.headers().iterator();
  }

  @Override
  public void put(final String key, final String value) {
    throw new UnsupportedOperationException("This class should be used only with Tracer.extract()!");
  }
}
```

### Priority Sampling

Distributed Traces may sample inconsistently when the linked traces run on different hosts. To ensure that distributed traces are complete, enable priority sampling. Priority sampling automatically assigns and propagates a priority value along all traces, depending on their service and volume. Priorities can also be set manually to drop non-interesting traces or keep important ones.

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

## Logging and MDC

The Java tracer exposes two API calls to allow printing trace and span identifiers along with log statements, `CorrelationIdentifier#getTraceId()`, and `CorrelationIdentifier#getSpanId()`.

log4j2:

```java
import org.apache.logging.log4j.ThreadContext;
import datadog.trace.api.CorrelationIdentifier;

// there must be spans started and active before this block.
try {
    ThreadContext.put("ddTraceID", "ddTraceID:" + String.valueOf(CorrelationIdentifier.getTraceId()));
    ThreadContext.put("ddSpanID", "ddSpanID:" + String.valueOf(CorrelationIdentifier.getSpanId()));
} finally {
    ThreadContext.remove("ddTraceID");
    ThreadContext.remove("ddSpanID");
}
```

slf4j/logback:

```java
import org.slf4j.MDC;
import datadog.trace.api.CorrelationIdentifier;

// there must be spans started and active before this block.
try {
    MDC.put("ddTraceID", "ddTraceID:" + String.valueOf(CorrelationIdentifier.getTraceId()));
    MDC.put("ddSpanID", "ddSpanID:" + String.valueOf(CorrelationIdentifier.getSpanId()));
} finally {
    MDC.remove("ddTraceID");
    MDC.remove("ddSpanID");
}
```

log4j2 XML Pattern:

```
<PatternLayout pattern="%clr{%d{yyyy-MM-dd HH:mm:ss.SSS}}{faint} %clr{%5p} %clr{${sys:PID}}{magenta} %clr{---}{faint} %X{ddTraceID} %X{ddSpanID} %m%n%xwEx" />
```

Logback XML Pattern:
```
<Pattern>
    %d{yyyy-MM-dd HH:mm:ss} [%thread] %-5level %logger{36} %X{ddTraceID} %X{ddSpanID} - %msg%n
</Pattern>
```


## Debugging

To return debug level application logs, enable debug mode with the flag `-Ddatadog.slf4j.simpleLogger.defaultLogLevel=debug` when starting the JVM.

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
[5]: /tracing/visualization/services_list/
[6]: https://github.com/opentracing/opentracing-java
[7]: https://docs.datadoghq.com/integrations/java/
[8]: https://docs.oracle.com/javase/8/docs/api/java/lang/instrument/package-summary.html
[9]: http://bytebuddy.net/
