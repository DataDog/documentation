---
title: Tracing Java Applications
kind: documentation
aliases:
    - /tracing/java
    - /tracing/languages/java
    - /agent/apm/java/
further_reading:
    - link: 'https://github.com/DataDog/dd-trace-java'
      tag: 'GitHub'
      text: 'Datadog Java APM source code'
    - link: 'tracing/visualization/'
      tag: 'Documentation'
      text: 'Explore your services, resources and traces'
---
## Compatibility requirements

The Java Tracer requires Java JRE 1.7 and higher for either Oracle JDK and OpenJDK. Datadog does not officially support any early-access versions of Java. For a full list of supported libraries, visit the [Compatibility Requirements][1] page.

## Installation and Getting Started

If you already have a Datadog account you can find [step-by-step instructions][2] in our in-app guides for either host-based or container-based set ups.

Otherwise, to begin tracing applications written in any language, first [install and configure the Datadog Agent][3], see the additional documentation for [tracing Docker applications][4] or [Kubernetes applications][5].

Next, download `dd-java-agent.jar` that contains the Agent class files:

```shell
wget -O dd-java-agent.jar https://dtdg.co/latest-java-tracer
```

Finally, add the following JVM argument when starting your application in your IDE, Maven or Gradle application script, or `java -jar` command:

```text
-javaagent:/path/to/the/dd-java-agent.jar
```

**Note**:

- The `-javaagent` needs to be run before the `-jar` file, adding it as a JVM option, not as an application argument. For more information, see the [Oracle documentation][6].

- `dd-trace-java`'s artifacts (`dd-java-agent.jar`, `dd-trace-api.jar`, `dd-trace-ot.jar`) support all JVM-based languages, i.e. Scala, Groovy, Kotlin, Clojure, etc. If you need support for a particular framework, consider making an [open-source contribution][7].

## Automatic Instrumentation

Automatic instrumentation for Java uses the `java-agent` instrumentation capabilities [provided by the JVM][8]. When a `java-agent` is registered, it has the ability to modify class files at load time.
The `java-agent` uses the [Byte Buddy framework][9] to find the classes defined for instrumentation and modify those class bytes accordingly.

Instrumentation may come from auto-instrumentation, the OpenTracing api, or a mixture of both. Instrumentation generally captures the following info:

- Timing duration is captured using the JVM's nanotime clock unless a timestamp is provided from the OpenTracing API
- Key/value tag pairs
- Errors and stacktraces which are unhandled by the application
- A total count of traces (requests) flowing through the system

## Configuration

All configuration options below have system property and environment variable equivalents.
If the same key type is set for both, the system property configuration takes priority.
System properties can be set as JVM flags.

### Tagging

| System Property                        | Environment Variable                   | Default                           | Description                                                                                                                                                                                                                                                           |
| -------------------------------------- | -------------------------------------- | --------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `dd.service`                      | `DD_SERVICE`                      | `unnamed-java-app`                | The name of a set of processes that do the same job. Used for grouping stats for your application. Available for versions 0.50.1+.                                                                                                                                                                    |
| `dd.tags`                              | `DD_TAGS`                              | `null`                            | (Example: `layer:api,team:intake`) A list of default tags to be added to every span, profile, and JMX metric. If DD_ENV or DD_VERSION is used, it will override any env or version tag defined in DD_TAGS. Available for versions 0.50.1+.  |
|`dd.env`                              | `DD_ENV`                              | `none`                            | Your application environment (e.g. production, staging, etc.). Available for versions 0.48+.                                                    |
| `dd.version`                              | `DD_VERSION`                              | `null`                            | Your application version (e.g. 2.5, 202003181415, 1.3-alpha, etc.). Available for versions 0.48+.             |
| `dd.logs.injection`                    | `DD_LOGS_INJECTION`                    | false                             | Enabled automatic MDC key injection for Datadog trace and span ids. See [Advanced Usage][10] for details.  It is recommended to use version 0.57+ to add `env`, `service` and `version` tags to your [logs][11].   |
| `dd.trace.config`                      | `DD_TRACE_CONFIG`                      | `null`                            | Optional path to a file where configuration properties are provided one per each line. For instance, the file path can be provided as via `-Ddd.trace.config=<FILE_PATH>.properties`, with setting the service name in the file with `dd.service.name=<SERVICE_NAME>` |
| `dd.service.mapping`                   | `DD_SERVICE_MAPPING`                   | `null`                            | (Example: `mysql:my-mysql-service-name-db, postgres:my-postgres-service-name-db`) Dynamically rename services via configuration. Useful for making databases have distinct names across different services.                                                                                                       |
| `dd.writer.type`                       | `DD_WRITER_TYPE`                       | `DDAgentWriter`                   | Default value sends traces to the Agent. Configuring with `LoggingWriter` instead writes traces out to the console.                       |
| `dd.agent.host`                        | `DD_AGENT_HOST`                        | `localhost`                       | Hostname for where to send traces to. If using a containerized environment, configure this to be the host IP. See [Tracing Docker Applications][4] for more details.                                                                                                  |
| `dd.trace.agent.port`                  | `DD_TRACE_AGENT_PORT`                  | `8126`                            | Port number the Agent is listening on for configured host.                                                                                |
| `dd.trace.agent.unix.domain.socket`    | `DD_TRACE_AGENT_UNIX_DOMAIN_SOCKET`    | `null`                            | This can be used to direct trace traffic to a proxy, to later be sent to a remote Datadog Agent.                                                            |
| `dd.trace.agent.timeout`               | `DD_TRACE_AGENT_TIMEOUT`               | `10`                              | Timeout in seconds for network interactions with the Datadog Agent.                                                                                                                                                                                                   |
| `dd.trace.header.tags`                 | `DD_TRACE_HEADER_TAGS`                 | `null`                            | (Example: `CASE-insensitive-Header:my-tag-name,User-ID:userId`) A map of header keys to tag names. Automatically apply header values as tags on traces.                                                                                                               |
| `dd.trace.annotations`                 | `DD_TRACE_ANNOTATIONS`                 | ([listed here][12])               | (Example: `com.some.Trace;io.other.Trace`) A list of method annotations to treat as `@Trace`.                                            |
| `dd.trace.methods`                     | `DD_TRACE_METHODS`                     | `null`                            | (Example: `package.ClassName[method1,method2,...];AnonymousClass$1[call]`) List of class/interface and methods to trace. Similar to adding `@Trace`, but without changing code.                                                                                       |
| `dd.trace.partial.flush.min.spans`     | `DD_TRACE_PARTIAL_FLUSH_MIN_SPANS`     | `1000`                            | Set a number of partial spans to flush on. Useful to reduce memory overhead when dealing with heavy traffic or long running traces.     |
| `dd.trace.split-by-tags`               | `DD_TRACE_SPLIT_BY_TAGS`               | `null`                            | (Example: `aws.service`) Used to rename spans to be identified with the corresponding service tag                                       |
| `dd.trace.db.client.split-by-instance` | `DD_TRACE_DB_CLIENT_SPLIT_BY_INSTANCE` | `false`                           | When set to `true` db spans get assigned the instance name as the service name                                                                     |
| `dd.trace.health.metrics.enabled`      | `DD_TRACE_HEALTH_METRICS_ENABLED`      | `false`                           | When set to `true` sends tracer health metrics                                                                                             |
| `dd.trace.health.metrics.statsd.host`  | `DD_TRACE_HEALTH_METRICS_STATSD_HOST`  | same as `dd.jmxfetch.statsd.host` | Statsd host to send health metrics to                                                                                                     |
| `dd.trace.health.metrics.statsd.port`  | `DD_TRACE_HEALTH_METRICS_STATSD_PORT`  | same as `dd.jmxfetch.statsd.port` | Statsd port to send health metrics to                                                                                                    |
| `dd.http.client.tag.query-string`      | `DD_HTTP_CLIENT_TAG_QUERY_STRING`      | `false`                           | When set to `true` query string parameters and fragment get added to web client spans                                                    |
| `dd.http.client.error.statuses`        | `DD_HTTP_CLIENT_ERROR_STATUSES`        | `400-499`                           | A range of errors can be accepted. By default 4xx errors are reported as errors for http clients. This configuration overrides that. Ex. `dd.http.client.error.statuses=400-499`                                                                                                    |
| `dd.http.server.error.statuses`        | `DD_HTTP_SERVER_ERROR_STATUSES`        | `500-599`                           | A range of errors can be accepted. By default 5xx status codes are reported as errors for http servers. This configuration overrides that. Ex. `dd.http.server.error.statuses=500-599`                                                                                                    |
| `dd.http.server.tag.query-string`      | `DD_HTTP_SERVER_TAG_QUERY_STRING`      | `false`                           | When set to `true` query string parameters and fragment get added to web server spans                                                     |
| `dd.trace.enabled`                     | `DD_TRACE_ENABLED`                     | `true`                            | When `false` tracing agent is disabled.                                                                                                 |
| `dd.jmxfetch.enabled`                  | `DD_JMXFETCH_ENABLED`                  | `true`                            | Enable collection of JMX metrics by Java Tracing Agent.                                                                                  |
| `dd.jmxfetch.config.dir`               | `DD_JMXFETCH_CONFIG_DIR`               | `null`                            | (Example: `/opt/datadog-agent/etc/conf.d`) Additional configuration directory for JMX metrics collection. The Java Agent looks for `jvm_direct:true` in the `instance` section in the `yaml` file to change configuration.                                            |
| `dd.jmxfetch.config`                   | `DD_JMXFETCH_CONFIG`                   | `null`                            | (Example: `activemq.d/conf.yaml,jmx.d/conf.yaml`) Additional metrics configuration file for JMX metrics collection. The Java Agent looks for `jvm_direct:true` in the `instance` section in the `yaml` file to change configuration.                                  |
| `dd.jmxfetch.check-period`             | `DD_JMXFETCH_CHECK_PERIOD`             | `1500`                            | How often to send JMX metrics (in ms).                                                                                                   |
| `dd.jmxfetch.refresh-beans-period`     | `DD_JMXFETCH_REFRESH_BEANS_PERIOD`     | `600`                             | How often to refresh list of avalable JMX beans (in seconds).                                                                             |
| `dd.jmxfetch.statsd.host`              | `DD_JMXFETCH_STATSD_HOST`              | same as `agent.host`              | Statsd host to send JMX metrics to. If you are using Unix Domain Sockets, use an argument like 'unix://PATH_TO_UDS_SOCKET'. Example: `unix:///var/datadog-agent/dsd.socket`                                                                                                            |
| `dd.jmxfetch.statsd.port`              | `DD_JMXFETCH_STATSD_PORT`              | 8125                              | StatsD port to send JMX metrics to. If you are using Unix Domain Sockets, input 0.                                                                                                                                                                                                                              |

**Note**:

- If the same key type is set for both, the system property configuration takes priority.
- System properties can be used as JVM parameters.
- By default, JMX metrics from your application are sent to the Datadog Agent thanks to DogStatsD over port `8125`. Make sure that [DogStatsD is enabled for the Agent][13].

  - If you are running the Agent as a container, ensure that `DD_DOGSTATSD_NON_LOCAL_TRAFFIC` [is set to `true`][14], and that port `8125` is open on the Agent container.
  - In Kubernetes, [bind the DogStatsD port to a host port][15]; in ECS, [set the appropriate flags in your task definition][16].

### Integrations

See how to disable integrations in the [integrations][17] compatability section.

### Examples

#### `dd.service.mapping`

**Example with system property**:

```shell
java -javaagent:/path/to/dd-java-agent.jar -Ddd.service.name=web-app -Ddd.service.mapping=postgresql:web-app-pg -jar path/to/application.jar
```

{{< img src="tracing/setup/java/service_mapping.png" alt="service mapping"  >}}

#### `dd.tags`

**Setting a global env for spans and JMX metrics**:

```shell
java -javaagent:/path/to/dd-java-agent.jar -Ddd.service.name=web-app -Ddd.tags=env:dev -jar path/to/application.jar
```

{{< img src="tracing/setup/java/trace_global_tags.png" alt="trace global tags"  >}}

#### `dd.trace.span.tags`

**Example with adding project:test to every span**:

```shell
java -javaagent:/path/to/dd-java-agent.jar -Ddd.service.name=web-app -Ddd.trace.global.tags=env:dev -Ddd.trace.span.tags=project:test -jar path/to/application.jar
```

{{< img src="tracing/setup/java/trace_span_tags.png" alt="trace span tags"  >}}

#### `dd.trace.jmx.tags`

**Setting custom.type:2 on a JMX metric**:

```shell
java -javaagent:/path/to/dd-java-agent.jar -Ddd.service.name=web-app -Ddd.trace.global.tags=env:dev -Ddd.trace.span.tags=project:test -Ddd.trace.jmx.tags=custom.type:2 -jar path/to/application.jar
```

{{< img src="tracing/setup/java/trace_jmx_tags.png" alt="trace JMX tags"  >}}

#### `dd.trace.methods`

**Example with system property**:

```shell
java -javaagent:/path/to/dd-java-agent.jar -Ddd.trace.global.tags=env:dev -Ddd.service.name=web-app -Ddd.trace.methods=notes.app.NotesHelper[customMethod3] -jar path/to/application.jar
```

{{< img src="tracing/setup/java/trace_methods.png" alt="trace methods"  >}}

#### `dd.trace.db.client.split-by-instance`

Example with system property:

```shell
java -javaagent:/path/to/dd-java-agent.jar -Ddd.trace.global.tags=env:dev -Ddd.service.name=web-app -Ddd.trace.db.client.split-by-instance=TRUE -jar path/to/application.jar
```

DB Instance 1, `webappdb`, now gets its own service name that is the same as the `db.instance` span metadata:

{{< img src="tracing/setup/java/split_by_instance_1.png" alt="instance 1"  >}}

DB Instance 2, `secondwebappdb`, now gets its own service name that is the same as the `db.instance` span metadata:

{{< img src="tracing/setup/java/split_by_instance_2.png" alt="instance 2"  >}}

Similarly on the service map, you would now see one web app making calls to two different Postgres databases.

#### `dd.http.server.tag.query-string`

Example with system property:

```shell
java -javaagent:/path/to/dd-java-agent.jar -Ddd.service.name=web-app -Ddd.trace.global.tags=env:dev -Ddd.http.server.tag.query-string=TRUE -jar path/to/application.jar
```

{{< img src="tracing/setup/java/query_string.png" alt="query string"  >}}

#### `dd.trace.enabled`

**Example with system property and debug app mode**:

```shell
java -javaagent:/path/to/dd-java-agent.jar -Ddd.trace.enabled=false -Ddatadog.slf4j.simpleLogger.defaultLogLevel=debug -jar path/to/application.jar
```

Debug app logs show that `Tracing is disabled, not installing instrumentations.`

#### `dd.jmxfetch.config.dir` and `dd.jmxfetch.config`

Example configuration:

- Either the combination of: `DD_JMXFETCH_CONFIG_DIR=<DIRECTORY_PATH>` + `DD_JMXFETCH_CONFIG=conf.yaml`
- Or directly: `DD_JMXFETCH_CONFIG=<DIRECTORY_PATH>/conf.yaml`

With the following content for `conf.yaml`:

```yaml
init_config:
instances:
    - jvm_direct: true
      port: '<PORT>'
      conf:
          - include:
                bean:
                    - java.lang:type=MemoryPool,name=Metaspace
                attribute:
                    Usage.used:
                        metric_type: gauge
                        alias: sb.usage.used
```

Would produce the following result:

{{< img src="tracing/setup/java/jmxfetch_example.png" alt="JMX fetch example"  >}}

See the [Java integration documentation][18] to learn more about Java metrics collection with JMX fetch.

### B3 Headers Extraction and Injection

Datadog APM tracer supports [B3 headers extraction][19] and injection for distributed tracing.

Distributed headers injection and extraction is controlled by configuring injection/extraction styles. Currently two styles are supported:

- Datadog: `Datadog`
- B3: `B3`

Injection styles can be configured using:

- System Property: `-Ddd.propagation.style.inject=Datadog,B3`
- Environment Variable: `DD_PROPAGATION_STYLE_INJECT=Datadog,B3`

The value of the property or environment variable is a comma (or space) separated list of header styles that are enabled for injection. By default only Datadog injection style is enabled.

Extraction styles can be configured using:

- System Property: `-Ddd.propagation.style.extract=Datadog,B3`
- Environment Variable: `DD_PROPAGATION_STYLE_EXTRACT=Datadog,B3`

The value of the property or environment variable is a comma (or space) separated list of header styles that are enabled for extraction. By default only Datadog extraction style is enabled.

If multiple extraction styles are enabled extraction attempt is done on the order those styles are configured and first successful extracted value is used.

## Trace Reporting

To report a trace to Datadog the following happens:

- Trace completes
- Trace is pushed to an asynchronous queue of traces
    - Queue is size-bound and doesn't grow past a set limit of 7000 traces
    - Once the size limit is reached, traces are discarded
    - A count of the total traces is captured to ensure accurate throughput
- In a separate reporting thread, the trace queue is flushed and traces are encoded via msgpack then sent to the Datadog Agent via http
- Queue flushing happens on a schedule of once per second

To see the actual code, documentation, and usage examples for any of the libraries and frameworks that Datadog supports, check the full list of auto-instrumented components for Java applications in the [Integrations](#integrations) section.

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

Now add `@Trace` to methods to have them be traced when running with `dd-java-agent.jar`. If the Agent is not attached, this annotation has no effect on your application.

`@Trace` annotations have the default operation name `trace.annotation`, while the method traced have the resource by default.

## Performance

Java APM has minimal impact on the overhead of an application:

- No collections maintained by Java APM grow unbounded in memory
- Reporting traces does not block the application thread
- Java APM loads additional classes for trace collection and library instrumentation
- Java APM typically adds no more than a 3% increase in CPU usage
- Java APM typically adds no more than a 3% increase in JVM heap usage

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

[1]: /tracing/compatibility_requirements/java
[2]: https://app.datadoghq.com/apm/install
[3]: /tracing/send_traces/
[4]: /tracing/setup/docker/
[5]: /agent/kubernetes/apm/
[6]: https://docs.oracle.com/javase/7/docs/technotes/tools/solaris/java.html
[7]: https://github.com/DataDog/dd-trace-java/blob/master/CONTRIBUTING.md
[8]: https://docs.oracle.com/javase/8/docs/api/java/lang/instrument/package-summary.html
[9]: http://bytebuddy.net
[10]: /tracing/connect_logs_and_traces/java/
[11]: /getting_started/tagging/unified_service_tagging/?tab=logs
[12]: https://github.com/DataDog/dd-trace-java/blob/master/dd-java-agent/instrumentation/trace-annotation/src/main/java/datadog/trace/instrumentation/trace_annotation/TraceAnnotationsInstrumentation.java#L37
[13]: /developers/dogstatsd/#setup
[14]: /agent/docker/#dogstatsd-custom-metrics
[15]: /developers/dogstatsd/
[16]: /integrations/amazon_ecs/?tab=python#create-an-ecs-task
[17]: /tracing/compatibility_requirements/java#disabling-integrations
[18]: /integrations/java/?tab=host#metric-collection
[19]: https://github.com/openzipkin/b3-propagation
