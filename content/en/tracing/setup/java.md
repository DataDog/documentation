---
title: Tracing Java Applications
kind: documentation
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
- link: "tracing/advanced/"
  tag: "Advanced Usage"
  text: "Advanced Usage"
---

## Installation and Getting Started

<div class="alert alert-info">If you already have a Datadog account you can find step-by-step instructions in our in-app guides for <a href="https://app.datadoghq.com/apm/docs?architecture=host-based&language=java" target=_blank> host-based</a> and <a href="https://app.datadoghq.com/apm/docs?architecture=container-based&language=java" target=_blank>container-based</a> set ups.</div>

To begin tracing applications written in any language, first [install and configure the Datadog Agent][1], see the additional documentation for [tracing Docker applications][2] or [Kubernetes applications][3].

Next, download `dd-java-agent.jar` that contains the Agent class files:

```shell
wget -O dd-java-agent.jar 'https://search.maven.org/classic/remote_content?g=com.datadoghq&a=dd-java-agent&v=LATEST'
```

Finally, add the following JVM argument when starting your application in your IDE, Maven or Gradle application script, or `java -jar` command:

```text
-javaagent:/path/to/the/dd-java-agent.jar
```

**Note**:

* The `-javaagent` needs to be run before the `-jar` file, adding it as a JVM option, not as an application argument. For more information, see the [Oracle documentation][4].

* `dd-trace-java`'s artifacts (`dd-java-agent.jar`, `dd-trace-api.jar`, `dd-trace-ot.jar`) support all JVM-based languages, i.e. Scala, Groovy, Kotlin, Clojure, etc. If you need support for a particular framework, consider making an [open-source contribution][5].

## Automatic Instrumentation

Automatic instrumentation for Java uses the `java-agent` instrumentation capabilities [provided by the JVM][6]. When a `java-agent` is registered, it has the ability to modify class files at load time.
The `java-agent` uses the [Byte Buddy framework][7] to find the classes defined for instrumentation and modify those class bytes accordingly.

Instrumentation may come from auto-instrumentation, the OpenTracing api, or a mixture of both. Instrumentation generally captures the following info:

* Timing duration is captured using the JVM's nanotime clock unless a timestamp is provided from the OpenTracing api
* Key/value tag pairs
* Errors and stacktraces which are unhandled by the application
* A total count of traces (requests) flowing through the system

## Compatibility

Datadog officially supports the Java JRE 1.7 and higher of both Oracle JDK and OpenJDK. Datadog does not officially support any early-access versions of Java.

### Integrations

Most integrations are enabled by default. The following setting can change the default to disabled.

* System Property: `-Ddd.integrations.enabled=false`
* Environment Variable: `DD_INTEGRATIONS_ENABLED=false`

Integrations can be enabled or disabled individually (overriding the default above).

* System Property: `-Ddd.integration.<INTEGRATION_NAME>.enabled=true`
* Environment Variable: `DD_INTEGRATION_<INTEGRATION_NAME>_ENABLED=true`

(See below for each integration's name.)

Beta integrations are disabled by default but can be enabled individually.

#### Web Framework Compatibility

`dd-java-agent` includes support for automatically tracing the following web frameworks.

| Server                  | Versions   | Support Type    | Instrumentation Names (used for configuration) |
|-------------------------|------------|-----------------|------------------------------------------------|
| Akka-Http Server        | 10.0+      | Fully Supported | `akka-http`, `akka-http-server`                |
| Grizzly                 | 2.0+       | [Beta][8]       | `grizzly`                                      |
| Java Servlet Compatible | 2.3+, 3.0+ | Fully Supported | `servlet`, `servlet-2`, `servlet-3`            |
| Jax-RS Annotations      | JSR311-API | Fully Supported | `jax-rs`, `jaxrs`, `jax-rs-annotations`        |
| Jetty (non-Servlet)     | 8+         | [Beta][8]       | `jetty`, `jetty-8`                             |
| Netty HTTP Server       | 4.0+       | Fully Supported | `netty`, `netty-4.0`, `netty-4.1`              |
| Play                    | 2.4-2.7    | Fully Supported | `play`                                         |
| Ratpack                 | 1.4+       | Fully Supported | `ratpack`                                      |
| Spark Java              | 2.3+       | [Beta][8]       | `sparkjava` (requires `jetty`)                 |
| Spring Web (MVC)        | 4.0+       | Fully Supported | `spring-web`                                   |
| Spring WebFlux          | 5.0+       | Fully Supported | `spring-webflux`                               |

**Web Framework tracing provides:** timing HTTP request to response, tags for the HTTP request (status code, method, etc), error and stacktrace capturing, linking work created within a web request and Distributed Tracing.

*Note:* Many application servers are Servlet compatible and are automatically covered by that instrumentation, such as Tomcat, Jetty, Websphere, Weblogic, etc.
Also, frameworks like Spring Boot inherently work because it usually uses a supported embedded application server (Tomcat/Jetty/Netty).

Beta Instrumentation is disabled by default. Add one of the following configurations to enable it:

* System Property: `-Ddd.integration.<INTEGRATION_NAME>.enabled=true`
* Environment Variable: `DD_INTEGRATION_<INTEGRATION_NAME>_ENABLED=true`

Don't see your desired web frameworks? Datadog is continually adding additional support. Contact [Datadog support][8] if you need help.

#### Networking Framework Compatibility

`dd-java-agent` includes support for automatically tracing the following networking frameworks.

| Framework                | Versions    | Support Type    | Instrumentation Names (used for configuration) |
|--------------------------|-------------|-----------------|------------------------------------------------|
| Apache HTTP Client       | 4.0+        | Fully Supported | `httpclient`                                   |
| Apache HTTP Async Client | 4.0+        | Fully Supported | `httpasyncclient`, `apache-httpasyncclient`    |
| AWS Java SDK             | 1.11+, 2.2+ | Fully Supported | `aws-sdk`                                      |
| Google HTTP Client       | 1.19.0+     | Fully Supported | `google-http-client`                           |
| gRPC                     | 1.5+        | Fully Supported | `grpc`, `grpc-client`, `grpc-server`           |
| HttpURLConnection        | all         | Fully Supported | `httpurlconnection`, `urlconnection`           |
| Kafka-Clients            | 0.11+       | Fully Supported | `kafka`                                        |
| Kafka-Streams            | 0.11+       | Fully Supported | `kafka`, `kafka-streams`                       |
| Java RMI                 | all         | Fully Supported | `rmi`, `rmi-client`, `rmi-server`              |
| Jax RS Clients           | 2.0+        | Fully Supported | `jax-rs`, `jaxrs`, `jax-rs-client`             |
| Jersey Client            | 1.9+        | Fully Supported | `jax-rs`, `jaxrs`, `jax-rs-client`             |
| JMS                      | 1 and 2     | Fully Supported | `jms`                                          |
| Netty HTTP Client        | 4.0+        | Fully Supported | `netty`, `netty-4.0`, `netty-4.1`              |
| OkHTTP                   | 3.0+        | Fully Supported | `okhttp`, `okhttp-3`                           |
| Play WSClient            | 1.0+        | Fully Supported | `play-ws`                                      |
| Rabbit AMQP              | 2.7+        | Fully Supported | `amqp`, `rabbitmq`                             |
| Spring WebClient         | 5.0+        | Fully Supported | `spring-webflux`, `spring-webflux-client`      |

**Networking tracing provides:** timing request to response, tags for the request (e.g. response code), error and stacktrace capturing, and distributed tracing.

Don't see your desired networking framework? Datadog is continually adding additional support. Contact [Datadog support][8] if you need help.

#### Data Store Compatibility

`dd-java-agent` includes support for automatically tracing the following database frameworks/drivers.

| Database                | Versions | Support Type    | Instrumentation Names (used for configuration)                                           |
|-------------------------|----------|-----------------|------------------------------------------------------------------------------------------|
| Couchbase               | 2.0+     | Fully Supported | `couchbase`                                                                              |
| Cassandra               | 3.X      | Fully Supported | `cassandra`                                                                              |
| Elasticsearch Transport | 2.0+     | Fully Supported | `elasticsearch`, `elasticsearch-transport`, `elasticsearch-transport-{2,5,6}` (pick one) |
| Elasticsearch Rest      | 5.0+     | Fully Supported | `elasticsearch`, `elasticsearch-rest`, `elasticsearch-rest-5`, `elasticsearch-rest-6`    |
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
| Dropwizard Views | 0.7+     | Fully Supported | `dropwizard`, `dropwizard-view`                |
| Hibernate        | 3.5+     | Fully Supported | `hibernate`                                    |
| Hystrix          | 1.4+     | Fully Supported | `hystrix`                                      |
| JSP Rendering    | 2.3+     | Fully Supported | `jsp`, `jsp-render`                            |
| Slf4J MDC        | 1+       | Fully Supported | `mdc` (See also `dd.logs.injection` config)    |
| Spring Data      | 1.8+     | Fully Supported | `spring-data`                                  |
| Twilio SDK       | 0+       | Fully Supported | `twilio-sdk`                                   |

Don't see your desired framework? Datadog is continually adding additional support. Contact [Datadog support][8] if you need help.

To improve visibility into applications using unsupported frameworks, consider:

* Adding custom instrumentation (with OpenTracing or the `@Trace` annotation).
* [Submitting a pull request][9] with instrumentation for inclusion in a future release.
* Contacting [Datadog support][8] and submitting a feature request.

## Configuration

The tracer is configured using System Properties and Environment Variables as follows:
(See integration specific config in the [integrations](#integrations) section above.)

{{% table  %}}

| System Property                        | Environment Variable                   | Default                           | Description                                                                                                                                                                                                                                                            |
|----------------------------------------|----------------------------------------|-----------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `dd.trace.enabled`                     | `DD_TRACE_ENABLED`                     | `true`                            | When `false` tracing agent is disabled.                                                                                                                                                                                                                                |
| `dd.trace.config`                      | `DD_TRACE_CONFIG`                      | `null`                            | Optional path to a file where configuration properties are provided one per each line. For instance, the file path can be provided as via `-Ddd.trace.config=<FILE_PATH>.properties`, with setting the service name in the file with `dd.trace.enabled=<SERVICE_NAME>` |
| `dd.service.name`                      | `DD_SERVICE_NAME`                      | `unnamed-java-app`                | The name of a set of processes that do the same job. Used for grouping stats for your application.                                                                                                                                                                     |
| `dd.service.mapping`                   | `DD_SERVICE_MAPPING`                   | `null`                            | (Example: `mysql:my-service-name-db`) Dynamically rename services via configuration. Useful for making databases have distinct names across different services.                                                                                                        |
| `dd.writer.type`                       | `DD_WRITER_TYPE`                       | `DDAgentWriter`                   | Default value sends traces to the Agent. Configuring with `LoggingWriter` instead writes traces out to the console.                                                                                                                                                    |
| `dd.agent.host`                        | `DD_AGENT_HOST`                        | `localhost`                       | Hostname for where to send traces to. If using a containerized environment, configure this to be the host IP.  See [Tracing Docker Applications][1] for more details.                                                                                                  |
| `dd.trace.agent.port`                  | `DD_TRACE_AGENT_PORT`                  | `8126`                            | Port number the Agent is listening on for configured host.                                                                                                                                                                                                             |
| `dd.trace.agent.unix.domain.socket`    | `DD_TRACE_AGENT_UNIX_DOMAIN_SOCKET`    | `null`                            | This can be used to direct trace traffic to a proxy, to later be sent to a remote Datadog Agent.                                                                                                                                                                       |
| `dd.trace.global.tags`                 | `DD_TRACE_GLOBAL_TAGS`                 | `null`                            | (Example: `key1:value1,key2:value2`) A list of default tags to be added to every span and every JMX metric. This value is merged into `trace.span.tags` and `trace.jmx.tags` to provide single place to configure both.                                                |
| `dd.trace.span.tags`                   | `DD_TRACE_SPAN_TAGS`                   | `null`                            | (Example: `key1:value1,key2:value2`) A list of default tags to be added to every span. Tags of the same name added directly to a span overwrite the defaults provided here.                                                                                            |
| `dd.trace.jmx.tags`                    | `DD_TRACE_JMX_TAGS`                    | `null`                            | (Example: `key1:value1,key2:value2`) A list of default tags to be added to every JMX metric. Tags of the same name added in JMX metrics configuration overwrite the defaults provided here.                                                                            |
| `dd.trace.header.tags`                 | `DD_TRACE_HEADER_TAGS`                 | `null`                            | (Example: `CASE-insensitive-Header:my-tag-name,User-ID:userId`) A map of header keys to tag names.  Automatically apply header values as tags on traces.                                                                                                               |
| `dd.trace.annotations`                 | `DD_TRACE_ANNOTATIONS`                 | ([listed here][2])                | (Example: `com.some.Trace;io.other.Trace`) A list of method annotations to treat as `@Trace`.                                                                                                                                                                          |
| `dd.trace.methods`                     | `DD_TRACE_METHODS`                     | `null`                            | (Example: `package.ClassName[method1,method2,...];AnonymousClass$1[call]`) List of class/interface and methods to trace.  Similar to adding `@Trace`, but without changing code.                                                                                       |
| `dd.trace.partial.flush.min.spans`     | `DD_TRACE_PARTIAL_FLUSH_MIN_SPANS`     | `1000`                            | Set a number of partial spans to flush on. Useful to reduce memory overhead when dealing with heavy traffic or long running traces.                                                                                                                                    |
| `dd.trace.report-hostname`             | `DD_TRACE_REPORT_HOSTNAME`             | `false`                           | When enabled, it adds the detected hostname to trace metadata                                                                                                                                                                                                          |
| `dd.trace.split-by-tags`               | `DD_TRACE_SPLIT_BY_TAGS`               | `null`                            | (Example: `aws.service`) Used to rename spans to be identified with the corresponding service tag                                                                                                                                                                      |
| `dd.trace.db.client.split-by-instance` | `DD_TRACE_DB_CLIENT_SPLIT_BY_INSTANCE` | `false`                           | When set to `true` db spans get assigned the instance name as the service name                                                                                                                                                                                         |
| `dd.trace.health.metrics.enabled`      | `DD_TRACE_HEALTH_METRICS_ENABLED`      | `false`                           | When set to `true` sends tracer health metrics                                                                                                                                                                                                                         |
| `dd.trace.health.metrics.statsd.host`  | `DD_TRACE_HEALTH_METRICS_STATSD_HOST`  | same as `dd.jmxfetch.statsd.host` | Statsd host to send health metrics to                                                                                                                                                                                                                                  |
| `dd.trace.health.metrics.statsd.port`  | `DD_TRACE_HEALTH_METRICS_STATSD_PORT`  | same as `dd.jmxfetch.statsd.port` | Statsd port to send health metrics to                                                                                                                                                                                                                                  |
| `dd.http.client.tag.query-string`      | `DD_HTTP_CLIENT_TAG_QUERY_STRING`      | `false`                           | When set to `true` query string parameters and fragment get added to web client spans                                                                                                                                                                                  |
| `dd.http.client.error.statuses`        | `DD_HTTP_CLIENT_ERROR_STATUSES`        | `false`                           | A range of errors can be accepted, by default 4xx errors aren't reported as errors. This configuration overrides that. Ex. `dd.http.client.error.statuses=400-499`                                                                                                     |
| `dd.http.server.tag.query-string`      | `DD_HTTP_SERVER_TAG_QUERY_STRING`      | `false`                           | When set to `true` query string parameters and fragment get added to web server spans                                                                                                                                                                                  |
| `dd.jmxfetch.enabled`                  | `DD_JMXFETCH_ENABLED`                  | `true`                            | Enable collection of JMX metrics by Java Tracing Agent.                                                                                                                                                                                                                |
| `dd.jmxfetch.config.dir`               | `DD_JMXFETCH_CONFIG_DIR`               | `null`                            | (Example: `/opt/datadog-agent/etc/conf.d`) Additional configuration directory for JMX metrics collection. The Java Agent looks for `jvm_direct:true` in the `instance` section in the `yaml` file to change configuration.                                             |
| `dd.jmxfetch.config`                   | `DD_JMXFETCH_CONFIG`                   | `null`                            | (Example: `activemq.d/conf.yaml,jmx.d/conf.yaml`) Additional metrics configuration file for JMX metrics collection. The Java Agent looks for `jvm_direct:true` in the `instance` section in the `yaml` file to change configuration.                                   |
| `dd.jmxfetch.check-period`             | `DD_JMXFETCH_CHECK_PERIOD`             | `1500`                            | How often to send JMX metrics (in ms).                                                                                                                                                                                                                                 |
| `dd.jmxfetch.refresh-beans-period`     | `DD_JMXFETCH_REFRESH_BEANS_PERIOD`     | `600`                             | How often to refresh list of avalable JMX beans (in seconds).                                                                                                                                                                                                          |
| `dd.jmxfetch.statsd.host`              | `DD_JMXFETCH_STATSD_HOST`              | same as `agent.host`              | Statsd host to send JMX metrics to.                                                                                                                                                                                                                                    |
| `dd.jmxfetch.statsd.port`              | `DD_JMXFETCH_STATSD_PORT`              | 8125                              | Statsd port to send JMX metrics to.                                                                                                                                                                                                                                    |
| `dd.logs.injection`                    | `DD_LOGS_INJECTION`                    | false                             | Enabled automatic MDC key injection for Datadog trace and span ids. See [Advanced Usage][3] for details                                                                                                                                                                |

[1]: /agent/docker/apm
[2]: https://github.com/DataDog/dd-trace-java/blob/master/dd-java-agent/instrumentation/trace-annotation/src/main/java/datadog/trace/instrumentation/trace_annotation/TraceAnnotationsInstrumentation.java#L37
[3]: /tracing/advanced/connect_logs_and_traces/?tab=java
{{% /table %}}

**Note**:

* If the same key type is set for both, the system property configuration takes priority.
* System properties can be used as JVM parameters.
* By default, JMX metrics from your application are sent to the Datadog Agent thanks to DogStatsD over port `8125`. Make sure that [DogStatsD is enabled for the Agent][10].
If you are running the Agent as a container, ensure that `DD_DOGSTATSD_NON_LOCAL_TRAFFIC` [is set to `true`][11], and that port `8125` is open on the Agent container.
In Kubernetes, [bind the DogStatsD port to a host port][12]; in ECS, [set the appropriate flags in your task definition][13].

### B3 Headers Extraction and Injection

Datadog APM tracer supports [B3 headers extraction][14] and injection for distributed tracing.

Distributed headers injection and extraction is controlled by
configuring injection/extraction styles. Currently two styles are
supported:

* Datadog: `Datadog`
* B3: `B3`

Injection styles can be configured using:

* System Property: `-Ddd.propagation.style.inject=Datadog,B3`
* Environment Variable: `DD_PROPAGATION_STYLE_INJECT=Datadog,B3`

The value of the property or environment variable is a comma (or
space) separated list of header styles that are enabled for
injection. By default only Datadog injection style is enabled.

Extraction styles can be configured using:

* System Property: `-Ddd.propagation.style.extract=Datadog,B3`
* Environment Variable: `DD_PROPAGATION_STYLE_EXTRACT=Datadog,B3`

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

`@Trace` annotations have the default operation name `trace.annotation`, while the method traced have the resource by default.

## Performance

Java APM has minimal impact on the overhead of an application:

* No collections maintained by Java APM grow unbounded in memory
* Reporting traces does not block the application thread
* Java APM loads additional classes for trace collection and library instrumentation
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

[1]: /agent/docker/apm
[2]: /tracing/setup/docker
[3]: /agent/kubernetes/daemonset_setup/#trace-collection
[4]: https://docs.oracle.com/javase/7/docs/technotes/tools/solaris/java.html
[5]: https://github.com/DataDog/dd-trace-java/blob/master/CONTRIBUTING.md
[6]: https://docs.oracle.com/javase/8/docs/api/java/lang/instrument/package-summary.html
[7]: http://bytebuddy.net
[8]: /help
[9]: https://github.com/DataDog/documentation#outside-contributors
[10]: /developers/dogstatsd/#setup
[11]: /agent/docker/#dogstatsd-custom-metrics
[12]: /agent/kubernetes/dogstatsd/#bind-the-dogstatsd-port-to-a-host-port
[13]: /integrations/amazon_ecs/?tab=python#create-an-ecs-task
[14]: https://github.com/openzipkin/b3-propagation
