---
title: Instrument Your Application
kind: documentation
aliases:
    - /tracing/languages
    - /tracing/proxies
disable_toc: true
---

After you have [configured the Datadog Agent][1], set up your application to send [traces][2] using one of the following official Datadog tracing libraries:

To instrument an application written in a language that does not yet have official library support, visit the list of [community tracing libraries][3].

{{< programming-lang-wrapper langs="java,python,ruby,c++,go,nodeJS,.NET,.NET Core,PHP" >}}

{{< programming-lang lang="java" >}}

## Compatibility requirements

The Java Tracer requires Java JRE 1.7 and higher for either Oracle JDK and OpenJDK. Datadog does not officially support any early-access versions of Java. For a full list of supported libraries, visit the [Compatibility Requirements][1] page.

## Installation and Getting Started

### Follow the in-app Documentation (Recommended)

Follow the [Quickstart instructions][2] within the Datadog app for the best experience, including:

- Step-by-step instructions scoped to your deployment configuration (hosts, Docker, Kubernetes, or Amazon ECS).
- Dynamically set `service`, `env` and `version` tags.
- Enable the Continuous Profiler, ingesting 100% of traces, and Trace ID injection into logs during setup.

Otherwise, to begin tracing applications written in any language:

1. [Install and configure the Datadog Agent][3], see the additional documentation for [tracing Docker applications][4] or [Kubernetes applications][5].

2. Download `dd-java-agent.jar` that contains the Agent class files:

   ```shell
   wget -O dd-java-agent.jar https://dtdg.co/latest-java-tracer
   ```

3. Add the following JVM argument when starting your application in your IDE, Maven or Gradle application script, or `java -jar` command:

   ```text
    -javaagent:/path/to/the/dd-java-agent.jar
   ```

4. Add [configuration options](#configuration) for tracing and ensure you are setting environment variables or passing system properties as JVM arguments, particularly for service, environment, logs injection, profiling, and optionally runtime metrics-all the metrics you intend to use. See the examples below. Note that using the in-app quickstart instructions generates these for you.

### JVM notes

- Use the documentation for your IDE to figure out the right way to pass in `-javaagent` and other JVM arguments. Here are instructions for some commonly used frameworks:

    {{< tabs >}}
    {{% tab "Spring Boot" %}}

If your app is called `my_app.jar`, create a `my_app.conf`, containing:

```text
JAVA_OPTS=-javaagent:/path/to/dd-java-agent.jar
```

For more information, see the [Spring Boot documentation][1].


[1]: https://docs.spring.io/spring-boot/docs/current/reference/html/deployment.html#deployment-script-customization-when-it-runs
    {{% /tab %}}
    {{% tab "Tomcat" %}}

Open your Tomcat startup script file, for example `catalina.sh`, and add:

```text
CATALINA_OPTS="$CATALINA_OPTS -javaagent:/path/to/dd-java-agent.jar"
```

Or on Windows, `catalina.bat`:

```text
set CATALINA_OPTS_OPTS=%CATALINA_OPTS_OPTS% -javaagent:"c:\path\to\dd-java-agent.jar"
```

    {{% /tab %}}
    {{% tab "JBoss" %}}

Add the following line to the end of `standalone.sh`:

```text
JAVA_OPTS="$JAVA_OPTS -javaagent:/path/to/dd-java-agent.jar"
```

On Windows, add the following line to the end of `standalone.conf.bat`:

```text
set "JAVA_OPTS=%JAVA_OPTS% -javaagent:X:/path/to/dd-java-agent.jar"
```

For more details, see the [JBoss documentation][1].


[1]: https://access.redhat.com/documentation/en-us/red_hat_jboss_enterprise_application_platform/7.0/html/configuration_guide/configuring_jvm_settings
    {{% /tab %}}
    {{% tab "Jetty" %}}

If you use `jetty.sh` to start Jetty as a service, edit it to add:

```text
JAVA_OPTIONS="${JAVA_OPTIONS} -javaagent:/path/to/dd-java-agent.jar"
```

If you use `start.ini` to start Jetty, add the following line (under `--exec`, or add `--exec` line if it isn't there yet):

```text
-javaagent:/path/to/dd-java-agent.jar
```

    {{% /tab %}}
    {{% tab "WebSphere" %}}

In the administrative console:

1. Select **Servers**. Under **Server Type**, select **WebSphere application servers** and select your server.
2. Select **Java and Process Management > Process Definition**.
3. In the **Additional Properties** section, click **Java Virtual Machine**.
4. In the **Generic JVM arguments** text field, enter:

```text
-javaagent:/path/to/dd-java-agent.jar
```

For additional details and options, see the [WebSphere docs][1].

[1]: https://www.ibm.com/support/pages/setting-generic-jvm-arguments-websphere-application-server
    {{% /tab %}}
    {{< /tabs >}}


- If you're adding the `-javaagent` argument to your `java -jar` command, it needs to be added _before_ the `-jar` argument, that is as a JVM option, not as an application argument. For example:

   ```text
   java -javaagent:/path/to/dd-java-agent.jar -jar my_app.jar
   ```

     For more information, see the [Oracle documentation][6].

- `dd-trace-java`'s artifacts (`dd-java-agent.jar`, `dd-trace-api.jar`, `dd-trace-ot.jar`) support all JVM-based languages, i.e. Scala, Groovy, Kotlin, Clojure, etc. If you need support for a particular framework, consider making an [open-source contribution][7].

## Automatic Instrumentation

Automatic instrumentation for Java uses the `java-agent` instrumentation capabilities [provided by the JVM][8]. When a `java-agent` is registered, it has the ability to modify class files at load time.

Instrumentation may come from auto-instrumentation, the OpenTracing api, or a mixture of both. Instrumentation generally captures the following info:

- Timing duration is captured using the JVM's nanotime clock unless a timestamp is provided from the OpenTracing API
- Key/value tag pairs
- Errors and stacktraces which are unhandled by the application
- A total count of traces (requests) flowing through the system

## Configuration

All configuration options below have system property and environment variable equivalents.
If the same key type is set for both, the system property configuration takes priority.
System properties can be set as JVM flags.


| System Property                        | Environment Variable                   | Default                           | Description                                                                                                                                                                                                                                                           |
| -------------------------------------- | -------------------------------------- | --------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `dd.service`                      | `DD_SERVICE`                      | `unnamed-java-app`                | The name of a set of processes that do the same job. Used for grouping stats for your application. Available for versions 0.50.1+.                                                                                                                                                                    |
| `dd.tags`                              | `DD_TAGS`                              | `null`                            | (Example: `layer:api,team:intake`) A list of default tags to be added to every span, profile, and JMX metric. If DD_ENV or DD_VERSION is used, it will override any env or version tag defined in DD_TAGS. Available for versions 0.50.1+.  |
|`dd.env`                              | `DD_ENV`                              | `none`                            | Your application environment (e.g. production, staging, etc.). Available for versions 0.48+.                                                    |
| `dd.version`                              | `DD_VERSION`                              | `null`                            | Your application version (e.g. 2.5, 202003181415, 1.3-alpha, etc.). Available for versions 0.48+.             |
| `dd.logs.injection`                    | `DD_LOGS_INJECTION`                    | false                             | Enabled automatic MDC key injection for Datadog trace and span IDs. See [Advanced Usage][9] for details.   |
| `dd.trace.config`                      | `DD_TRACE_CONFIG`                      | `null`                            | Optional path to a file where configuration properties are provided one per each line. For instance, the file path can be provided as via `-Ddd.trace.config=<FILE_PATH>.properties`, with setting the service name in the file with `dd.service=<SERVICE_NAME>` |
| `dd.service.mapping`                   | `DD_SERVICE_MAPPING`                   | `null`                            | (Example: `mysql:my-mysql-service-name-db, postgres:my-postgres-service-name-db`) Dynamically rename services via configuration. Useful for making databases have distinct names across different services.                                                                                                       |
| `dd.writer.type`                       | `DD_WRITER_TYPE`                       | `DDAgentWriter`                   | Default value sends traces to the Agent. Configuring with `LoggingWriter` instead writes traces out to the console.                       |
| `dd.agent.host`                        | `DD_AGENT_HOST`                        | `localhost`                       | Hostname for where to send traces to. If using a containerized environment, configure this to be the host IP. See [Tracing Docker Applications][4] for more details.                                                                                                  |
| `dd.trace.agent.port`                  | `DD_TRACE_AGENT_PORT`                  | `8126`                            | Port number the Agent is listening on for configured host.                                                                                |
| `dd.trace.agent.unix.domain.socket`    | `DD_TRACE_AGENT_UNIX_DOMAIN_SOCKET`    | `null`                            | This can be used to direct trace traffic to a proxy, to later be sent to a remote Datadog Agent.                                                            |
| `dd.trace.agent.url`                   | `DD_TRACE_AGENT_URL`                   | `null`                            | The URL to send traces to. This can start with `http://` to connect using HTTP or with `unix://` to use a Unix Domain Socket. When set this takes precedence over `DD_AGENT_HOST` and `DD_TRACE_AGENT_PORT`. Available for versions 0.65+. |
| `dd.trace.agent.timeout`               | `DD_TRACE_AGENT_TIMEOUT`               | `10`                              | Timeout in seconds for network interactions with the Datadog Agent.                                                                                                                                                                                                   |
| `dd.trace.header.tags`                 | `DD_TRACE_HEADER_TAGS`                 | `null`                            | (Example: `CASE-insensitive-Header:my-tag-name,User-ID:userId`) A map of header keys to tag names. Automatically apply header values as tags on traces.                                                                                                               |
| `dd.trace.annotations`                 | `DD_TRACE_ANNOTATIONS`                 | ([listed here][10])               | (Example: `com.some.Trace;io.other.Trace`) A list of method annotations to treat as `@Trace`.                                            |
| `dd.trace.methods`                     | `DD_TRACE_METHODS`                     | `null`                            | (Example: `"package.ClassName[method1,method2,...];AnonymousClass$1[call]"`) List of class/interface and methods to trace. Similar to adding `@Trace`, but without changing code.                                                                                       |
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
| `dd.integration.opentracing.enabled`              | `DD_INTEGRATION_OPENTRACING_ENABLED`              | true                              | By default the tracing client detects if a GlobalTracer is being loaded and dynamically registers a tracer into it. By turning this to false, this removes any tracer dependency on OpenTracing.                                                                                                                                                                                                                              |
| `dd.hystrix.tags.enabled` | `DD_HYSTRIX_TAGS_ENABLED` | False | By default the Hystrix group, command, and circuit state tags are not enabled. This property enables them. |
| `dd.trace.servlet.async-timeout.error` | `DD_TRACE_SERVLET_ASYNC_TIMEOUT_ERROR` | True | By default, long running asynchronous requests will be marked as an error, setting this value to false allows to mark all timeouts as successful requests. |
| `dd.trace.startup.logs`                | `DD_TRACE_STARTUP_LOGS`                | True | When `false`, informational startup logging is disabled. Available for versions 0.64+. |


**Note**:

- If the same key type is set for both, the system property configuration takes priority.
- System properties can be used as JVM parameters.
- By default, JMX metrics from your application are sent to the Datadog Agent thanks to DogStatsD over port `8125`. Make sure that [DogStatsD is enabled for the Agent][11].

  - If you are running the Agent as a container, ensure that `DD_DOGSTATSD_NON_LOCAL_TRAFFIC` [is set to `true`][12], and that port `8125` is open on the Agent container.
  - In Kubernetes, [bind the DogStatsD port to a host port][13]; in ECS, [set the appropriate flags in your task definition][14].

### Integrations

See how to disable integrations in the [integrations][15] compatibility section.

### Examples

#### `dd.service.mapping`

**Example with system property**:

```shell
java -javaagent:/path/to/dd-java-agent.jar -Ddd.service=web-app -Ddd.service.mapping=postgresql:web-app-pg -jar path/to/application.jar
```

{{< img src="tracing/setup/java/service_mapping.png" alt="service mapping"  >}}

#### `dd.tags`

**Setting a global env for spans and JMX metrics**:

```shell
java -javaagent:/path/to/dd-java-agent.jar -Ddd.service=web-app -Ddd.env=dev -jar path/to/application.jar
```

{{< img src="tracing/setup/java/trace_global_tags.png" alt="trace global tags"  >}}

#### `dd.trace.span.tags`

**Example with adding project:test to every span**:

```shell
java -javaagent:/path/to/dd-java-agent.jar -Ddd.service=web-app -Ddd.env=dev -Ddd.trace.span.tags=project:test -jar path/to/application.jar
```

{{< img src="tracing/setup/java/trace_span_tags.png" alt="trace span tags"  >}}

#### `dd.trace.jmx.tags`

**Setting custom.type:2 on a JMX metric**:

```shell
java -javaagent:/path/to/dd-java-agent.jar -Ddd.service=web-app -Ddd.env=dev -Ddd.trace.span.tags=project:test -Ddd.trace.jmx.tags=custom.type:2 -jar path/to/application.jar
```

{{< img src="tracing/setup/java/trace_jmx_tags.png" alt="trace JMX tags"  >}}

#### `dd.trace.methods`

**Example with system property**:

```shell
java -javaagent:/path/to/dd-java-agent.jar -Ddd.service=web-app -Ddd.env=dev -Ddd.trace.methods="hello.GreetingController[doSomeStuff,doSomeOtherStuff];hello.Randomizer[randomize]" -jar path/to/application.jar
```

{{< img src="tracing/setup/java/trace_methods.png" alt="trace methods"  >}}

#### `dd.trace.db.client.split-by-instance`

Example with system property:

```shell
java -javaagent:/path/to/dd-java-agent.jar -Ddd.env=dev -Ddd.service=web-app -Ddd.trace.db.client.split-by-instance=TRUE -jar path/to/application.jar
```

DB Instance 1, `webappdb`, now gets its own service name that is the same as the `db.instance` span metadata:

{{< img src="tracing/setup/java/split_by_instance_1.png" alt="instance 1"  >}}

DB Instance 2, `secondwebappdb`, now gets its own service name that is the same as the `db.instance` span metadata:

{{< img src="tracing/setup/java/split_by_instance_2.png" alt="instance 2"  >}}

Similarly on the service map, you would now see one web app making calls to two different Postgres databases.

#### `dd.http.server.tag.query-string`

Example with system property:

```shell
java -javaagent:/path/to/dd-java-agent.jar -Ddd.service=web-app -Ddd.env=dev -Ddd.http.server.tag.query-string=TRUE -jar path/to/application.jar
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

See the [Java integration documentation][16] to learn more about Java metrics collection with JMX fetch.

### B3 Headers Extraction and Injection

Datadog APM tracer supports [B3 headers extraction][17] and injection for distributed tracing.

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


[1]: /tracing/compatibility_requirements/java
[2]: https://app.datadoghq.com/apm/docs
[3]: /tracing/send_traces/
[4]: /tracing/setup/docker/
[5]: /agent/kubernetes/apm/
[6]: https://docs.oracle.com/javase/7/docs/technotes/tools/solaris/java.html
[7]: https://github.com/DataDog/dd-trace-java/blob/master/CONTRIBUTING.md
[8]: https://docs.oracle.com/javase/8/docs/api/java/lang/instrument/package-summary.html
[9]: /tracing/connect_logs_and_traces/java/
[10]: https://github.com/DataDog/dd-trace-java/blob/master/dd-java-agent/instrumentation/trace-annotation/src/main/java/datadog/trace/instrumentation/trace_annotation/TraceAnnotationsInstrumentation.java#L37
[11]: /developers/dogstatsd/#setup
[12]: /agent/docker/#dogstatsd-custom-metrics
[13]: /developers/dogstatsd/
[14]: /integrations/amazon_ecs/?tab=python#create-an-ecs-task
[15]: /tracing/compatibility_requirements/java#disabling-integrations
[16]: /integrations/java/?tab=host#metric-collection
[17]: https://github.com/openzipkin/b3-propagation


{{< /programming-lang >}}

{{< programming-lang lang="python" >}}

## Compatibility requirements

Python versions `2.7+` and `3.5+` are supported.  For a full list of supported libraries, visit the [Compatibility Requirements][1] page.

## Installation and getting started

### Follow the in-app documentation (Recommended)

Follow the [Quickstart instructions][2] within the Datadog app for the best experience, including:

- Step-by-step instructions scoped to your deployment configuration (hosts, Docker, Kubernetes, or Amazon ECS).
- Dynamically set `service`, `env`, and `version` tags.
- Enable the Continuous Profiler, ingesting 100% of traces, and Trace ID injection into logs during setup.

Otherwise, to begin tracing applications written in Python, first [install and configure the Datadog Agent][3], see the additional documentation for [tracing Docker applications][4] or [Kubernetes applications][5].

Next, install the Datadog Tracing library, `ddtrace`, using pip:

```python
pip install ddtrace
```

Then to instrument your Python application use the included `ddtrace-run` command. To use it, prefix your Python entry-point command with `ddtrace-run`.

For example, if your application is started with `python app.py` then:

```shell
ddtrace-run python app.py
```

For more advanced usage, configuration, and fine-grain control, see Datadog's [API documentation][6].

## Configuration

When using **ddtrace-run**, the following [environment variable options][7] can be used:

| Environment Variable               | Default     | Description                                                                                                                                                                                                                                                                 |
| ---------------------------------- | ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `DATADOG_TRACE_DEBUG`              | `false`     | Enable debug logging in the tracer.                                                                                                                                                                                                                                         |
| `DATADOG_PATCH_MODULES`            |             | Override the modules patched for this application execution. It should follow the format: `DATADOG_PATCH_MODULES=module:patch,module:patch...`.                                                                                                                            |

It is recommended to use `DD_ENV`, `DD_SERVICE`, and `DD_VERSION` to set `env`, `service`, and `version` for your services. Refer to the [Unified Service Tagging][8] documentation for recommendations on how to configure these environment variables.

| Environment Variable               | Default     | Description                                                                                                                                                                                                                                                                 |
| ---------------------------------- | ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `DD_ENV`                           |             | Set the application’s environment, for example: `prod`, `pre-prod`, `staging`. Learn more about [how to setup your environment][9]. Available in version 0.38+.                                                                                                             |
| `DD_SERVICE`                       |             | The service name to be used for this application. The value is passed through when setting up middleware for web framework integrations like Pylons, Flask, or Django. For tracing without a web integration, it is recommended that you [set the service name in code](#integrations). Available in version 0.38+. |
| `DD_VERSION`                       |             | Set the application’s version, for example: `1.2.3`, `6c44da20`, `2020.02.13`. Available in version 0.38+.                                                                                                                                                                  |
| `DD_TAGS`                          |             | A list of default tags to be added to every span, profile, and runtime metric, for example: `layer:api,team:intake`. Available in version 0.38+.                                                                                                                            |
| `DATADOG_TRACE_ENABLED`            | `true`      | Enable web framework and library instrumentation. When `false`, the application code doesn't generate any traces.                                                                                                                                                           |
| `DD_AGENT_HOST`                    | `localhost` | Override the address of the trace Agent host that the default tracer attempts to submit traces to.                                                                                                                                                                          |
| `DATADOG_TRACE_AGENT_PORT`         | `8126`      | Override the port that the default tracer submit traces to.                                                                                                                                                                                                                 |
| `DD_TRACE_AGENT_URL`               |             | The URL of the Trace Agent that the tracer submits to. Takes priority over hostname and port, if set. Supports Unix Domain Sockets in combination with the `apm_config.receiver_socket` in your `datadog.yaml` file, or the `DD_APM_RECEIVER_SOCKET` environment variable.  |
| `DATADOG_PRIORITY_SAMPLING`        | `true`      | Enable [Priority Sampling][10].                                                                                                                                                                                                                                              |
| `DD_LOGS_INJECTION`                | `false`     | Enable [connecting logs and trace injection][11].                                                                                                                                                                                                                           |

## Change Agent Hostname

Configure your application level tracers to submit traces to a custom Agent hostname. The Python Tracing Module automatically looks for and initializes with the ENV variables `DD_AGENT_HOST` and `DD_TRACE_AGENT_PORT`.

But you can also set the hostname and port in code:

```python
import os
from ddtrace import tracer

tracer.configure(
    hostname="custom-hostname",
    port="1234",
)
```

[1]: /tracing/compatibility_requirements/python
[2]: https://app.datadoghq.com/apm/docs
[3]: /tracing/send_traces/
[4]: /tracing/setup/docker/
[5]: /agent/kubernetes/apm/
[6]: https://ddtrace.readthedocs.io/en/stable/
[7]: https://ddtrace.readthedocs.io/en/stable/advanced_usage.html#ddtracerun
[8]: /getting_started/tagging/unified_service_tagging
[9]: /tracing/guide/setting_primary_tags_to_scope/
[10]: https://ddtrace.readthedocs.io/en/stable/advanced_usage.html#priority-sampling
[11]: /tracing/connect_logs_and_traces/python/


{{< /programming-lang >}}

{{< programming-lang lang="ruby" >}}

See [Ruby trace library setup instructions][1].

[1]: https://github.com/DataDog/dd-trace-rb/blob/master/docs/GettingStarted.md

{{< /programming-lang >}}

{{< programming-lang lang="c++" >}}

C++ does not provide integrations for OOTB instrumentation, but it's used by Proxy tracing such as [Envoy][1] and [Nginx][2]. For compatibility requirements for the C++ Tracer, visit the [Compatibility Requirements][3] page.

## Getting Started

If you already have a Datadog account you can find [step-by-step instructions][4] in our in-app guides for either host-based or container-based set ups.

Otherwise, to begin tracing applications written in any language, first [install and configure the Datadog Agent][5].

Compile against [OpenTracing-cpp][6].

## Installation

Datadog tracing can be enabled in one of two ways:

* Compile against dd-opentracing-cpp, where the Datadog lib is compiled in and configured in code
* Dynamic loading, where the Datadog OpenTracing library is loaded at runtime and configured via JSON

### Compile against dd-opentracing-cpp

```bash
# Gets the latest release version number from Github.
get_latest_release() {
  wget -qO- "https://api.github.com/repos/$1/releases/latest" |
    grep '"tag_name":' |
    sed -E 's/.*"([^"]+)".*/\1/';
}
DD_OPENTRACING_CPP_VERSION="$(get_latest_release DataDog/dd-opentracing-cpp)"
# Download and install dd-opentracing-cpp library.
wget https://github.com/DataDog/dd-opentracing-cpp/archive/${DD_OPENTRACING_CPP_VERSION}.tar.gz -O dd-opentracing-cpp.tar.gz
mkdir -p dd-opentracing-cpp/.build
tar zxvf dd-opentracing-cpp.tar.gz -C ./dd-opentracing-cpp/ --strip-components=1
cd dd-opentracing-cpp/.build
# Download and install the correct version of opentracing-cpp, & other deps.
../scripts/install_dependencies.sh
cmake ..
make
make install
```

Include `<datadog/opentracing.h>` and create the tracer:

```cpp
// tracer_example.cpp
#include <datadog/opentracing.h>
#include <iostream>
#include <string>

int main(int argc, char* argv[]) {
  datadog::opentracing::TracerOptions tracer_options{"localhost", 8126, "compiled-in example"};
  auto tracer = datadog::opentracing::makeTracer(tracer_options);

  // Create some spans.
  {
    auto span_a = tracer->StartSpan("A");
    span_a->SetTag("tag", 123);
    auto span_b = tracer->StartSpan("B", {opentracing::ChildOf(&span_a->context())});
    span_b->SetTag("tag", "value");
  }

  tracer->Close();
  return 0;
}
```

Link against `libdd_opentracing` and `libopentracing`, making sure that they are both in your `LD_LIBRARY_PATH`:

```bash
g++ -std=c++14 -o tracer_example tracer_example.cpp -ldd_opentracing -lopentracing
./tracer_example
```

### Dynamic Loading

```bash
get_latest_release() {
  wget -qO- "https://api.github.com/repos/$1/releases/latest" |
    grep '"tag_name":' |
    sed -E 's/.*"([^"]+)".*/\1/';
}
DD_OPENTRACING_CPP_VERSION="$(get_latest_release DataDog/dd-opentracing-cpp)"
OPENTRACING_VERSION="$(get_latest_release opentracing/opentracing-cpp)"
# Download and install OpenTracing-cpp
wget https://github.com/opentracing/opentracing-cpp/archive/${OPENTRACING_VERSION}.tar.gz -O opentracing-cpp.tar.gz
mkdir -p opentracing-cpp/.build
tar zxvf opentracing-cpp.tar.gz -C ./opentracing-cpp/ --strip-components=1
cd opentracing-cpp/.build
cmake ..
make
make install
# Install dd-opentracing-cpp shared plugin.
wget https://github.com/DataDog/dd-opentracing-cpp/releases/download/${DD_OPENTRACING_CPP_VERSION}/linux-amd64-libdd_opentracing_plugin.so.gz
gunzip linux-amd64-libdd_opentracing_plugin.so.gz -c > /usr/local/lib/libdd_opentracing_plugin.so
```

Include `<opentracing/dynamic_load.h>` and load the tracer from `libdd_opentracing_plugin.so`:

```cpp
// tracer_example.cpp
#include <opentracing/dynamic_load.h>
#include <iostream>
#include <string>

int main(int argc, char* argv[]) {
  // Load the tracer library.
  std::string error_message;
  auto handle_maybe = opentracing::DynamicallyLoadTracingLibrary(
      "/usr/local/lib/libdd_opentracing_plugin.so", error_message);
  if (!handle_maybe) {
    std::cerr << "Failed to load tracer library " << error_message << "\n";
    return 1;
  }

  // Read in the tracer's configuration.
  std::string tracer_config = R"({
      "service": "dynamic-load example",
      "agent_host": "localhost",
      "agent_port": 8126
    })";

  // Construct a tracer.
  auto& tracer_factory = handle_maybe->tracer_factory();
  auto tracer_maybe = tracer_factory.MakeTracer(tracer_config.c_str(), error_message);
  if (!tracer_maybe) {
    std::cerr << "Failed to create tracer " << error_message << "\n";
    return 1;
  }
  auto& tracer = *tracer_maybe;

  // Create some spans.
  {
    auto span_a = tracer->StartSpan("A");
    span_a->SetTag("tag", 123);
    auto span_b = tracer->StartSpan("B", {opentracing::ChildOf(&span_a->context())});
    span_b->SetTag("tag", "value");
  }

  tracer->Close();
  return 0;
}
```

Just link against `libopentracing`, making sure that `libopentracing.so` is in your `LD_LIBRARY_PATH`:

```bash
g++ -std=c++11 -o tracer_example tracer_example.cpp -lopentracing
./tracer_example
```

**Note**: OpenTracing requires C++ 11 or higher.

### Environment Variables

| Variable | Version | Default | Note |
|----------|---------|---------|------|
| `DD_AGENT_HOST` | v0.3.6 | `localhost` | Sets the host where traces are sent (the host running the Agent). Can be a hostname or an IP address. Ignored if `DD_TRACE_AGENT_URL` is set. |
| `DD_TRACE_AGENT_PORT` | v0.3.6 | `8126` | Sets the port where traces are sent (the port where the Agent is listening for connections). Ignored if `DD_TRACE_AGENT_URL` is set. |
| `DD_TRACE_AGENT_URL` | v1.1.4 | | Sets the URL endpoint where traces are sent. Overrides `DD_AGENT_HOST` and `DD_TRACE_AGENT_PORT` if set. This URL supports http, https and unix address schemes. |
| `DD_ENV` | v1.0.0 | | If specified, adds the `env` tag with the specified value to all generated spans. |
| `DD_SERVICE` | v1.1.4 | | If specified, sets the default service name. Otherwise the service name must be provided via TracerOptions or JSON configuration. |
| `DD_TRACE_ANALYTICS_ENABLED` | v1.1.3 | `false` | Enable App Analytics globally for the application. |
| `DD_TRACE_ANALYTICS_SAMPLE_RATE` | v1.1.3 | | Sets the App Analytics sampling rate. Overrides `DD_TRACE_ANALYTICS_ENABLED` if set. A floating point number between `0.0` and `1.0`. |
| `DD_TRACE_SAMPLING_RULES` | v1.1.4 | `[{"sample_rate": 1.0}]` | A JSON array of objects. Each object must have a "sample_rate", and the "name" and "service" fields are optional. The "sample_rate" value must be between 0.0 and 1.0 (inclusive). Rules are applied in configured order to determine the trace's sample rate. |
| `DD_VERSION` | v1.1.4 | | If specified, adds the `version` tag with the specified value to all generated spans. |
| `DD_TAGS` | v1.1.4 | | If specified, will add tags to all generated spans. A comma-separated list of `key:value` pairs. |
| `DD_PROPAGATION_STYLE_INJECT` | v0.4.1 | `Datadog` | Propagation style(s) to use when injecting tracing headers. `Datadog`, `B3`, or `Datadog B3`. |
| `DD_PROPAGATION_STYLE_EXTRACT` | v0.4.1 | `Datadog` | Propagation style(s) to use when extracting tracing headers. `Datadog`, `B3`, or `Datadog B3`. |

### Change Agent Hostname

Configure your application level tracers to submit traces to a custom Agent hostname. The C++ Tracing Module automatically looks for and initializes with the ENV variables `DD_AGENT_HOST` and `DD_TRACE_AGENT_PORT`.

To connect to the agent using Unix Domain Sockets, `DD_TRACE_AGENT_URL` can be used instead. The value should match the Agent's value for `DD_APM_RECEIVER_SOCKET`.


[1]: /tracing/setup/envoy/
[2]: /tracing/setup/nginx/
[3]: /tracing/compatibility_requirements/cpp
[4]: https://app.datadoghq.com/apm/install
[5]: /tracing/send_traces/
[6]: https://github.com/opentracing/opentracing-cpp


{{< /programming-lang >}}


{{< programming-lang lang="go" >}}

## Compatibility Requirements

The Go Tracer requires Go `1.12+` and Datadog Agent `>= 5.21.1`.  For a full list of supported libraries, visit the [Compatibility Requirements][1] page.

## Installation and Getting Started

For configuration instructions and details about using the API, see the Datadog [API documentation][2]. For manual instrumentation, use the [integrations section](#integrations) below for Go libraries and frameworks supporting automatic instrumentation.

For a description of the terminology used in APM, see the [Getting started with APM section][3]. For details about contributing, check the official repository [README.md][4].

Consult the [migration document][5] if you need to migrate from an older version of the tracer (e.g. v<0.6.x) to the newest version.

### Installation

#### Follow the in-app documentation (Recommended)

Follow the [Quickstart instructions][6] within the Datadog app for the best experience, including:

- Step-by-step instructions scoped to your deployment configuration (hosts, Docker, Kubernetes, or Amazon ECS).
- Dynamically set `service`, `env`, and `version` tags.
- Enable the Continuous Profiler, ingesting 100% of traces , and Trace ID injection into logs during setup.

Otherwise, [install and configure the Datadog Agent][7]. See the additional documentation for [tracing Docker applications][8] or [Kubernetes applications][9].

Next, install the Go tracer from its canonical import path:

```go
go get gopkg.in/DataDog/dd-trace-go.v1/...
```

You are now ready to import the tracer and start instrumenting your code.

## Automatic Instrumentation

Datadog has a series of pluggable packages which provide out-of-the-box support for instrumenting a series of libraries and frameworks. A list of these packages can be found in the [Compatibility Requirements][1] page.  To trace these integrations, import these packages into your application and follow the configuration instructions listed alongside each [Integration][1].



## Configuration

The Go tracer supports additional environment variables and functions for configuration.
See all available options in the [configuration documentation][10].

We highly recommend using `DD_ENV`, `DD_SERVICE`, and `DD_VERSION` to set `env`, `service`, and `version` for your services.
Check out the [Unified Service Tagging][11] documentation for recommendations on how to configure these environment variables. These variables are available for versions 1.24.0+ of the Go tracer.

You may also elect to provide `env`, `service`, and `version` through the tracer's API:

```go
package main

import (
    "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer"
)

func main() {
    tracer.Start(
        tracer.WithEnv("prod"),
        tracer.WithService("test-go"),
        tracer.WithServiceVersion("abc123"),
    )

    // When the tracer is stopped, it will flush everything it has to the Datadog Agent before quitting.
    // Make sure this line stays in your main function.
    defer tracer.Stop()
}
```

### Change Agent Hostname

The Go Tracing Module automatically looks for and initializes with the environment variables `DD_AGENT_HOST` and `DD_TRACE_AGENT_PORT`.

But you can also set a custom hostname and port in code:

```go
package main

import (
    "net"

    "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer"
)

func main() {
    addr := net.JoinHostPort(
        "custom-hostname",
        "1234",
    )
    tracer.Start(tracer.WithAgentAddr(addr))
    defer tracer.Stop()
}
```

## Configure APM Environment Name

The [APM environment name][12] may be configured [in the agent][13] or using the [WithEnv][10] start option of the tracer.

### B3 Headers Extraction and Injection

The Datadog APM tracer supports [B3 headers extraction][14] and injection for distributed tracing.

Distributed headers injection and extraction is controlled by
configuring injection/extraction styles. Two styles are
supported: `Datadog` and `B3`.

Configure injection styles using the environment variable
`DD_PROPAGATION_STYLE_INJECT=Datadog,B3`

Configure extraction styles using the environment variable
`DD_PROPAGATION_STYLE_EXTRACT=Datadog,B3`

The values of these environment variables are comma separated lists of
header styles that are enabled for injection or extraction. By default only
the `Datadog` extraction style is enabled.

If multiple extraction styles are enabled, extraction attempts are made
in the order that those styles are specified. The first successfully
extracted value is used.


[1]: /tracing/compatibility_requirements/go
[2]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/ddtrace
[3]: /tracing/visualization/
[4]: https://github.com/DataDog/dd-trace-go/tree/v1#contributing
[5]: https://github.com/DataDog/dd-trace-go/tree/v1/MIGRATING.md
[6]: https://app.datadoghq.com/apm/docs
[7]: /tracing/send_traces/
[8]: /tracing/setup/docker/
[9]: /agent/kubernetes/apm/
[10]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer#StartOption
[11]: /getting_started/tagging/unified_service_tagging
[12]: /tracing/advanced/setting_primary_tags_to_scope/#environment
[13]: /getting_started/tracing/#environment-name
[14]: https://github.com/openzipkin/b3-propagation


{{< /programming-lang >}}

{{< programming-lang lang="nodeJS" >}}

## Compatibility Requirements

The NodeJS Tracer officially supports versions `>=8`. Only even versions like 8.x and 10.x are officially supported. Odd versions like 9.x and 11.x should work but are not officially supported. For a full list of supported libraries, visit the [Compatibility Requirements][1] page.

## Installation and getting started

### Follow the in-app documentation (Recommended)

Follow the [Quickstart instructions][2] within the Datadog app for the best experience, including:

- Step-by-step instructions scoped to your deployment configuration (hosts, Docker, Kubernetes, or Amazon ECS).
- Dynamically set `service`, `env`, and `version` tags.
- Enable ingesting 100% of traces and Trace ID injection into logs during setup.

For descriptions of terminology used in APM, take a look at the [official documentation][3].

For details about configuration and using the API, see Datadog's [API documentation][4].

For details about contributing, check out the [development guide][5].

### Quickstart

<div class="alert alert-warning">
This library <strong>MUST</strong> be imported and initialized before any instrumented module. When using a transpiler, you <strong>MUST</strong> import and initialize the tracer library in an external file and then import that file as a whole when building your application. This prevents hoisting and ensures that the tracer library gets imported and initialized before importing any other instrumented module.
</div>

To begin tracing Node.js applications, first [install and configure the Datadog Agent][6], see the additional documentation for [tracing Docker applications][7] or [Kubernetes applications][8].

Next, install the Datadog Tracing library using npm:

```sh
npm install --save dd-trace
```

Finally, import and initialize the tracer:

##### JavaScript

```js
// This line must come before importing any instrumented module.
const tracer = require('dd-trace').init();
```

##### TypeScript

```typescript
// server.ts
import './tracer'; // must come before importing any instrumented module.

// tracer.ts
import tracer from 'dd-trace';
tracer.init(); // initialized in a different file to avoid hoisting.
export default tracer;
```

See the [tracer settings][9] for the list of initialization options.

## Configuration

Tracer settings can be configured as a parameter to the `init()` method or as environment variables.

### Tagging

| Config         | Environment Variable         | Default     | Description                                                                                                                                                                                                                                                                |
| -------------- | ---------------------------- | ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| env            | `DD_ENV`                     | `null`      | Set an application's environment e.g. `prod`, `pre-prod`, `stage`, etc. Available for versions 0.20+                                                                                                                                                                                                     |
| service        | `DD_SERVICE`            | `null`      | The service name to be used for this program. Available for versions 0.20+                                                                                                                                                                                                                              |
| version        | `DD_VERSION`            | `null`      | The version number of the application. Defaults to value of the version field in package.json. Available for versions 0.20+
| tags           | `DD_TAGS`                    | `{}`        | Set global tags that should be applied to all spans and metrics. When passed as an environment variable, the format is `key:value,key:value`. When setting this programmatically: `tracer.init({ tags: { foo: 'bar' } })` Available for versions 0.20+                                                                                                                            |

It is recommended that you use `DD_ENV`, `DD_SERVICE`, and `DD_VERSION` to set `env`, `service`, and `version` for your services. Review the [Unified Service Tagging][10] documentation for recommendations on how to configure these environment variables.

### Instrumentation

| Config         | Environment Variable         | Default     | Description                                                                                                                                                                                                                                                                |
| -------------- | ---------------------------- | ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| enabled        | `DD_TRACE_ENABLED`           | `true`      | Whether to enable the tracer.                                                                                                                                                                                                                                              |
| debug          | `DD_TRACE_DEBUG`             | `false`     | Enable debug logging in the tracer.                                                                                                                                                                                                                                        |
| url            | `DD_TRACE_AGENT_URL`         | `null`      | The URL of the Trace Agent that the tracer submits to. Takes priority over hostname and port, if set. Supports Unix Domain Sockets in combination with the `apm_config.receiver_socket` in your `datadog.yaml` file, or the `DD_APM_RECEIVER_SOCKET` environment variable. |
| hostname       | `DD_TRACE_AGENT_HOSTNAME`    | `localhost` | The address of the Agent that the tracer submits to.                                                                                                                                                                                                                       |
| port           | `DD_TRACE_AGENT_PORT`        | `8126`      | The port of the Trace Agent that the tracer submits to.                                                                                                                                                                                                                    |
| dogstatsd.port | `DD_DOGSTATSD_PORT`          | `8125`      | The port of the DogStatsD Agent that metrics are submitted to.                                                                                                                                                                                                             |
| logInjection   | `DD_LOGS_INJECTION`          | `false`     | Enable automatic injection of trace IDs in logs for supported logging libraries.                                                                                                                                                                                           |
| sampleRate     | -                            | `1`         | Percentage of spans to sample as a float between `0` and `1`.                                                                                                                                                                                                              |
| flushInterval  | -                            | `2000`      | Interval (in milliseconds) at which the tracer submits traces to the Agent.                                                                                                                                                                                                |
| runtimeMetrics | `DD_RUNTIME_METRICS_ENABLED` | `false`     | Whether to enable capturing runtime metrics. Port `8125` (or configured with `dogstatsd.port`) must be opened on the Agent for UDP.                                                                                                                                        |
| experimental   | -                            | `{}`        | Experimental features can be enabled all at once using Boolean true or individually using key/value pairs. [Contact support][11] to learn more about the available experimental features.                                                                                   |
| plugins        | -                            | `true`      | Whether or not to enable automatic instrumentation of external libraries using the built-in plugins.                                                                                                                                                                       |
| - | `DD_TRACE_DISABLED_PLUGINS` | - | A comma-separated string of integration names automatically disabled when tracer is initialized. Environment variable only e.g. `DD_TRACE_DISABLED_PLUGINS=express,dns`. |
| clientToken    | `DD_CLIENT_TOKEN`            | `null`      | Client token for browser tracing. Can be generated in Datadog in **Integrations** -> **APIs**.                                                                                                                                                                             |
| logLevel       | `DD_TRACE_LOG_LEVEL`         | `debug`     | A string for the minimum log level for the tracer to use when debug logging is enabled, e.g. `error`, `debug`.                                                                                                                                                             |

## Change Agent Hostname

Configure your application level tracers to submit traces to a custom Agent hostname:

The NodeJS Tracing Module automatically looks for and initializes with the ENV variables `DD_AGENT_HOST` and `DD_TRACE_AGENT_PORT`

```sh
DD_AGENT_HOST=<HOSTNAME> DD_TRACE_AGENT_PORT=<PORT> node server
```

To use a different protocol such as UDS, specify the entire URL as a single ENV variable `DD_TRACE_AGENT_URL`.

```sh
DD_TRACE_AGENT_URL=unix:<SOCKET_PATH> node server
```

[1]: /tracing/compatibility_requirements/nodejs
[2]: https://app.datadoghq.com/apm/docs
[3]: /tracing/visualization/
[4]: https://datadog.github.io/dd-trace-js
[5]: https://github.com/DataDog/dd-trace-js/blob/master/README.md#development
[6]: /tracing/send_traces/
[7]: /tracing/setup/docker/
[8]: /agent/kubernetes/apm/
[9]: https://datadog.github.io/dd-trace-js/#tracer-settings
[10]: /getting_started/tagging/unified_service_tagging/
[11]: /help/


{{< /programming-lang >}}

{{< programming-lang lang=".NET" >}}

## Compatibility

The .NET Tracer supports automatic instrumentation on .NET Framework 4.5 and above. For a full list of supported libraries, visit the [Compatibility Requirements][1] page.

## Getting started

### Follow the in-app documentation (Recommended)

Follow the [Quickstart instructions][2] within the Datadog app for the best experience, including:

- Step-by-step instructions scoped to your deployment configuration (hosts, Docker, Kubernetes, or Amazon ECS).
- Dynamically set `service`, `env`, and `version` tags.
- Enable ingesting 100% of traces and Trace ID injection into logs during setup.

Otherwise, to begin tracing applications written in any language, first [install and configure the Datadog Agent][3]. The .NET Tracer runs in-process to instrument your applications and sends traces from your application to the Agent.

**Note**: The .NET Tracer supports all .NET-based languages (C#, F#, Visual Basic, etc).

## Automatic Instrumentation

Automatic instrumentation can collect performance data about your application with zero code changes and minimal configuration. The .NET Tracer automatically instruments all [supported libraries][1] out of the box.

Automatic instrumentation captures:

- Execution time of instrumented calls
- Relevant trace data, such as URL and status response codes for web requests or SQL queries for database access
- Unhandled exceptions, including stacktraces if available
- A total count of traces (e.g. web requests) flowing through the system

### Installation

To use automatic instrumentation on Windows, install the .NET Tracer on the host using the [MSI installer for Windows][4]. Choose the installer for the architecture that matches the operating system (x64 or x86).

After installing the .NET Tracer, restart applications so they can read the new environment variables. To restart IIS, run the following commands as administrator:

```cmd
net stop /y was
net start w3svc
```

### Required Environment Variables

If your application runs in IIS, skip the rest of this section.

For Windows applications **not** running in IIS, set these two environment variables before starting your application to enable automatic instrumentation:

**Note:** The .NET runtime tries to load a profiler into _any_ .NET process that is started with these environment variables set. You should limit instrumentation only to the applications that need to be traced. **We do not recommend setting these environment variables globally as this causes _all_ .NET processes on the host to load the profiler.**

| Name                   | Value                                    |
| ---------------------- | ---------------------------------------- |
| `COR_ENABLE_PROFILING` | `1`                                      |
| `COR_PROFILER`         | `{846F5F1C-F9AE-4B07-969E-05C26BC060D8}` |

#### Windows Services

To automatically instrument a Windows Service, set the environment variables for that Service in the Windows Registry. Create a multi-string value called `Environment` in the `HKLM\System\CurrentControlSet\Services\<SERVICE NAME>` key. Then set the key's data to the values in the table:
```text
COR_ENABLE_PROFILING=1
COR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}
```

This can be done either through the Registry Editor as in the image below, or through a PowerShell snippet:

{{< img src="tracing/setup/dotnet/RegistryEditorFramework.png" alt="Registry Editor"  >}}

{{< code-block lang="powershell" filename="add-env-var.ps1" >}}
[String[]] $v = @("COR_ENABLE_PROFILING=1", "COR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}")
Set-ItemProperty HKLM:SYSTEM\CurrentControlSet\Services\<NAME> -Name Environment -Value $v
{{< /code-block >}}

#### Console Apps

Set the environment variables from a batch file before starting your application:

```bat
rem Set environment variables
SET COR_ENABLE_PROFILING=1
SET COR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}

rem Start application
example.exe
```

## Manual Instrumentation

To manually instrument your code, add the `Datadog.Trace` [NuGet package][5] to your application. In your code, access the global tracer through the `Datadog.Trace.Tracer.Instance` property to create new spans.

For more details on manual instrumentation and custom tagging, see [Manual instrumentation documentation][6].

Manual instrumentation is supported on .NET Framework 4.5 and above on Windows and on .NET Core 2.1, 3.0, and 3.1 on Windows and Linux.

**Note:** When using both manual and automatic instrumentation, it is important to keep the MSI installer and NuGet package versions in sync.

## Configuration

There are multiple ways to configure the .NET Tracer:

- setting environment variables
- in .NET code
- editing the application's `app.config`/`web.config` file (.NET Framework only)
- creating a `datadog.json` file

{{< tabs >}}

{{% tab "Environment variables" %}}

To configure the Tracer using environment variables, set the variables before launching the instrumented application.

For example:

```cmd
rem Set environment variables
SET DD_TRACE_AGENT_URL=http://localhost:8126
SET DD_ENV=prod
SET DD_SERVICE=MyService
SET DD_VERSION=abc123

rem Launch application
example.exe
```

**Note:** To set environment variables for a Windows Service, use the multi-string key `HKLM\System\CurrentControlSet\Services\{service name}\Environment` in the Windows Registry.

{{% /tab %}}

{{% tab "Code" %}}

To configure the Tracer in application code, create a `TracerSettings` from the default configuration sources. Set properties on this `TracerSettings` instance before passing it to a `Tracer` constructor. For example:

```csharp
using Datadog.Trace;

// read default configuration sources (env vars, web.config, datadog.json)
var settings = TracerSettings.FromDefaultSources();

// change some settings
settings.Environment = "prod";
settings.ServiceName = "MyService";
settings.ServiceVersion = "abc123";
settings.AgentUri = new Uri("http://localhost:8126/");

// create a new Tracer using these settings
var tracer = new Tracer(settings);

// set the global tracer
Tracer.Instance = tracer;
```

**Note:** Settings must be set on `TracerSettings` _before_ creating the `Tracer`. Changes made to `TracerSettings` properies after the `Tracer` is created are ignored.

{{% /tab %}}

{{% tab "web.config" %}}

To configure the Tracer using an `app.config` or `web.config` file, use the `<appSettings>` section. For example:

```xml
<configuration>
  <appSettings>
    <add key="DD_TRACE_AGENT_URL" value="http://localhost:8126"/>
    <add key="DD_ENV" value="prod"/>
    <add key="DD_SERVICE" value="MyService"/>
    <add key="DD_VERSION" value="abc123"/>
  </appSettings>
</configuration>
```

{{% /tab %}}

{{% tab "JSON file" %}}

To configure the Tracer using a JSON file, create `datadog.json` in the instrumented application's directory. The root JSON object must be a hash with a key/value pair for each setting. For example:

```json
{
    "DD_TRACE_AGENT_URL": "http://localhost:8126",
    "DD_ENV": "prod",
    "DD_SERVICE": "MyService",
    "DD_VERSION": "abc123",
}
```

{{% /tab %}}

{{< /tabs >}}

### Configuration Variables

The following tables list the supported configuration variables. Use the first name (e.g. `DD_TRACE_AGENT_URL`) when setting environment variables or configuration files. The second name, if present (e.g. `AgentUri`), indicates the name the `TracerSettings` propery to use when changing settings in the code.

#### Unified Service Tagging

| Setting Name                                        | Description                                                                                                                                                                                                       |
|-----------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `DD_ENV`<br/><br/>`Environment`                     | If specified, adds the `env` tag with the specified value to all generated spans. See [Agent configuration][8] for more details about the `env` tag. Available for versions 1.17.0+                                                           |
| `DD_SERVICE`<br/><br/>`ServiceName`            | If specified, sets the service name. Otherwise, the .NET Tracer tries to determine service name automatically from application name (e.g. IIS application name, process entry assembly, or process name). Available for versions 1.17.0+  |
| `DD_VERSION`<br/><br/>`ServiceVersion`            | If specified, sets the version of the service. Available for versions 1.17.0+
| `DD_TAGS`<br/><br/>`GlobalTags`       | If specified, adds all of the specified tags to all generated spans (e.g., `layer:api,team:intake`). Available for versions 1.17.0+                                                                                                                                              |

We highly recommend using `DD_ENV`, `DD_SERVICE`, and `DD_VERSION` to set `env`, `service`, and `version` for your services.
Check out the [Unified Service Tagging][7] documentation for recommendations on how to configure these environment variables.

#### Instrumentation

| Setting Name                                        | Description                                                                                                                                                                                                       |
| --------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `DD_TRACE_AGENT_URL`<br/><br/>`AgentUri`            | Sets the URL endpoint where traces are sent. Overrides `DD_AGENT_HOST` and `DD_TRACE_AGENT_PORT` if set. Default value is `http://<DD_AGENT_HOST>:<DD_TRACE_AGENT_PORT>`.                                         |
| `DD_AGENT_HOST`                                     | Sets the host where traces are sent (the host running the Agent). Can be a hostname or an IP address. Ignored if `DD_TRACE_AGENT_URL` is set. Default is value `localhost`.                                       |
| `DD_TRACE_AGENT_PORT`                               | Sets the port where traces are sent (the port where the Agent is listening for connections). Ignored if `DD_TRACE_AGENT_URL` is set. Default value is `8126`.                                                     |
| `DD_LOGS_INJECTION`<br/><br/>`LogsInjectionEnabled` | Enables or disables automatic injection of correlation identifiers into application logs.                                                                                                                         |
| `DD_TRACE_DEBUG`                                    | Enables or disables debug logging. Valid values are: `true` or `false` (default).                                                                                                                                    |
| `DD_TRACE_HEADER_TAGS`                              | Accepts a map of case-insensitive header keys to tag names and automatically applies matching header values as tags on root spans. (e.g. : `CASE-insensitive-Header:my-tag-name,User-ID:userId`). Available for version 1.18.3+      |

The following table lists configuration variables that are available only when using automatic instrumentation.

| Setting Name                                                   | Description                                                                                                                                                                                                                                                                              |
| -------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `DD_TRACE_ENABLED`<br/><br/>`TraceEnabled`                     | Enables or disables all automatic instrumentation. Setting the environment variable to `false` completely disables the CLR profiler. For other configuration methods, the CLR profiler is still loaded, but traces will not be generated. Valid values are: `true` (default) or `false`. |
| `DD_TRACE_LOG_PATH`                                            | Sets the path for the CLR profiler's log file.<br/><br/>Default: `%ProgramData%\Datadog .NET Tracer\logs\dotnet-profiler.log`                                                                                                                                                            |
| `DD_DISABLED_INTEGRATIONS`<br/><br/>`DisabledIntegrationNames` | Sets a list of integrations to disable. All other integrations remain enabled. If not set, all integrations are enabled. Supports multiple values separated with semicolons. Valid values are the integration names listed in the [Integrations][1] section.           |

The following table lists configuration variables that are available only when using automatic instrumentation and can be set for each integration. Use the first name (e.g. `DD_<INTEGRATION>_ENABLED`) when setting environment variables or configuration files. The second name (e.g. `Enabled`), indicates the name the `IntegrationSettings` propery to use when changing settings in the code. Access these properties through the `TracerSettings.Integrations[]` indexer. Integration names are listed in the [Integrations][1] section.

| Setting Name                                                            | Description                                                                                                           |
| ----------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| `DD_TRACE_<INTEGRATION>_ENABLED`<br/><br/>`Enabled`                           | Enables or disables a specific integration. Valid values are: `true` (default) or `false`.                            |


[1]: /tracing/compatibility_requirements/dotnet-framework
[2]: https://app.datadoghq.com/apm/docs
[3]: /tracing/send_traces/
[4]: https://github.com/DataDog/dd-trace-dotnet/releases
[5]: https://www.nuget.org/packages/Datadog.Trace
[6]: /tracing/custom_instrumentation/dotnet/
[7]: /getting_started/tagging/unified_service_tagging/



{{< /programming-lang >}}

{{< programming-lang lang=".NET Core" >}}

## Compatibility

The .NET Tracer supports automatic instrumentation on .NET Core 2.1 and 3.1, as well as Microsoft-deprecated versions 2.0, 2.2 and 3.0.  For a full list of supported libraries, visit the [Compatibility Requirements][1] page.

## Getting started

### Follow the in-app documentation (Recommended)

Follow the [Quickstart instructions][2] within the Datadog app for the best experience, including:

- Step-by-step instructions scoped to your deployment configuration (hosts, Docker, Kubernetes, or Amazon ECS).
- Dynamically set `service`, `env`, and `version` tags.
- Enable ingesting 100% of traces and add Trace ID injection into logs during setup.

Otherwise, to begin tracing applications written in any language, first [install and configure the Datadog Agent][3]. The .NET Tracer runs in-process to instrument your applications and sends traces from your application to the Agent.

**Note**: The .NET Tracer supports all .NET-based languages (C#, F#, Visual Basic, etc).

## Automatic Instrumentation

Automatic instrumentation can collect performance data about your application with zero code changes and minimal configuration. The .NET Tracer automatically instruments all [supported libraries][1] out of the box.

Automatic instrumentation captures:

- Execution time of instrumented calls
- Relevant trace data, such as URL and status response codes for web requests or SQL queries for database access
- Unhandled exceptions, including stacktraces if available
- A total count of traces (e.g. web requests) flowing through the system

### Installation

{{< tabs >}}

{{% tab "Windows" %}}

To use automatic instrumentation on Windows, install the .NET Tracer on the host using the [MSI installer for Windows][1]. Choose the installer for the architecture that matches the operating system (x64 or x86).

After installing the .NET Tracer, restart applications so they can read the new environment variables. To restart IIS, run the following commands as administrator:

```cmd
net stop /y was
net start w3svc
```

**Update:** Starting with .NET Tracer version `1.8.0`, the `Datadog.Trace.ClrProfiler.Managed` NuGet package is no longer required for automatic instrumentation in .NET Core. Remove it from your application when you update the .NET Tracer.


[1]: https://github.com/DataDog/dd-trace-dotnet/releases
{{% /tab %}}

{{% tab "Linux" %}}

To use automatic instrumentation on Linux, follow these three steps:

1. Install the .NET Tracer in the environment where your application is running using one of the packages available from the `dd-trace-dotnet` [releases page][1].

2. Create the required environment variables. See [Required Environment Variables](#required-environment-variables) below for details.

3. Run the `/opt/datadog/createLogPath.sh` script, which creates a directory for the log files and sets appropriate directory permissions. The default directory for log files is `/var/log/datadog/dotnet`.

**Update:** Starting with .NET Tracer version `1.8.0`, the `Datadog.Trace.ClrProfiler.Managed` NuGet package is no longer required for automatic instrumentation in .NET Core and is deprecated. Remove it from your application when you update the .NET Tracer and add the new environment variable, `DD_DOTNET_TRACER_HOME`. See [Required Environment Variables](#required-environment-variables) below for details.

**Update:** .NET Tracer version `1.13.0` adds support for Alpine and other [Musl-based distributions][2].

For Debian or Ubuntu, download and install the Debian package:

```bash
curl -LO https://github.com/DataDog/dd-trace-dotnet/releases/download/v<TRACER_VERSION>/datadog-dotnet-apm_<TRACER_VERSION>_amd64.deb
sudo dpkg -i ./datadog-dotnet-apm_<TRACER_VERSION>_amd64.deb
```

For CentOS or Fedora, download and install the RPM package:

```bash
curl -LO https://github.com/DataDog/dd-trace-dotnet/releases/download/v<TRACER_VERSION>/datadog-dotnet-apm-<TRACER_VERSION>-1.x86_64.rpm
sudo rpm -Uvh datadog-dotnet-apm-<TRACER_VERSION>-1.x86_64.rpm
```

For Alpine or other [Musl-based distributions][2], download the tar archive with the musl-linked binary:

```bash
sudo mkdir -p /opt/datadog
curl -L https://github.com/DataDog/dd-trace-dotnet/releases/download/v<TRACER_VERSION>/datadog-dotnet-apm-<TRACER_VERSION>-musl.tar.gz \
| sudo tar xzf - -C /opt/datadog
```

For other distributions, download the tar archive with the glibc-linked binary:

```bash
sudo mkdir -p /opt/datadog
curl -L https://github.com/DataDog/dd-trace-dotnet/releases/download/v<TRACER_VERSION>/datadog-dotnet-apm-<TRACER_VERSION>.tar.gz \
| sudo tar xzf - -C /opt/datadog
```


[1]: https://github.com/DataDog/dd-trace-dotnet/releases
[2]: https://en.wikipedia.org/wiki/Musl
{{% /tab %}}

{{< /tabs >}}

### Required Environment Variables

{{< tabs >}}

{{% tab "Windows" %}}

If your application runs in IIS, skip the rest of this section.

For Windows applications **not** running in IIS, set these two environment variables before starting your application to enable automatic instrumentation:

**Note:** The .NET runtime tries to load a profiler into _any_ .NET process that is started with these environment variables set. You should limit instrumentation only to the applications that need to be traced. **We do not recommend setting these environment variables globally as this causes _all_ .NET processes on the host to load the profiler.**

Name                       | Value
---------------------------|------
`CORECLR_ENABLE_PROFILING` | `1`
`CORECLR_PROFILER`         | `{846F5F1C-F9AE-4B07-969E-05C26BC060D8}`

#### Windows Services

To automatically instrument a Windows Service, set the environment variables for that Service in the Windows Registry. Create a multi-string value called `Environment` in the `HKLM\System\CurrentControlSet\Services\<SERVICE NAME>` key. Then set the key's data to the values in the table:
```text
CORECLR_ENABLE_PROFILING=1
CORECLR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}
```

This can be done either through the Registry Editor as in the image below, or through a PowerShell snippet:

{{< img src="tracing/setup/dotnet/RegistryEditorCore.png" alt="Registry Editor"  >}}

```powershell
[String[]] $v = @("CORECLR_ENABLE_PROFILING=1", "CORECLR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}")
Set-ItemProperty HKLM:SYSTEM\CurrentControlSet\Services\<NAME> -Name Environment -Value $v
```

#### Console Apps

Set the environment variables from a batch file before starting your application:

```bat
rem Set environment variables
SET CORECLR_ENABLE_PROFILING=1
SET CORECLR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}

rem Start application
dotnet.exe example.dll
```

{{% /tab %}}

{{% tab "Linux" %}}

On Linux, the following environment variables are required to enable automatic instrumentation:

Name                       | Value
---------------------------|------
`CORECLR_ENABLE_PROFILING` | `1`
`CORECLR_PROFILER`         | `{846F5F1C-F9AE-4B07-969E-05C26BC060D8}`
`CORECLR_PROFILER_PATH`    | `/opt/datadog/Datadog.Trace.ClrProfiler.Native.so`
`DD_INTEGRATIONS`          | `/opt/datadog/integrations.json`
`DD_DOTNET_TRACER_HOME`    | `/opt/datadog`

**Note:** You must change the paths above if you install the .NET Tracer into a non-default path.

For example, to set the environment variables them from a bash file before starting your application:

```bash
# Set environment variables
export CORECLR_ENABLE_PROFILING=1
export CORECLR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}
export CORECLR_PROFILER_PATH=/opt/datadog/Datadog.Trace.ClrProfiler.Native.so
export DD_INTEGRATIONS=/opt/datadog/integrations.json
export DD_DOTNET_TRACER_HOME=/opt/datadog

# Start your application
dotnet example.dll
```

To set the environment variables on a Linux Docker container, use [`ENV`][1]:

```docker
# Set environment variables
ENV CORECLR_ENABLE_PROFILING=1
ENV CORECLR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}
ENV CORECLR_PROFILER_PATH=/opt/datadog/Datadog.Trace.ClrProfiler.Native.so
ENV DD_INTEGRATIONS=/opt/datadog/integrations.json
ENV DD_DOTNET_TRACER_HOME=/opt/datadog

# Start your application
CMD ["dotnet", "example.dll"]
```


#### Systemctl (Per Service)

When using `systemctl` to run .NET applications as a service, you can add the required environment variables to be loaded for a specific service.

Create a file called `environment.env` containing:

```bat
CORECLR_ENABLE_PROFILING=1
CORECLR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}
CORECLR_PROFILER_PATH=/opt/datadog/Datadog.Trace.ClrProfiler.Native.so
DD_INTEGRATIONS=/opt/datadog/integrations.json
DD_DOTNET_TRACER_HOME=/opt/datadog
# any other environment variable used by the application
```

In the service configuration file, reference this as an [`EnvironmentFile`][2] in the service block:

```bat
[Service]
EnvironmentFile=/path/to/environment.env
ExecStart=<command used to start the application>
```
After setting these variables, restart the .NET service for the environment variables to take effect.

#### Systemctl (All Services)

When using `systemctl` to run .NET applications as a service, you can also set environment variables to be loaded for all services ran via `systemctl`. To confirm these variables have been set, use [`systemctl show-environment`][2]. Before using this approach, see the note below about this instrumenting all .NET processes.

```bat
systemctl set-environment CORECLR_ENABLE_PROFILING=1
systemctl set-environment CORECLR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}
systemctl set-environment CORECLR_PROFILER_PATH=/opt/datadog/Datadog.Trace.ClrProfiler.Native.so
systemctl set-environment DD_INTEGRATIONS=/opt/datadog/integrations.json
systemctl set-environment DD_DOTNET_TRACER_HOME=/opt/datadog
```

Once this is set, verify that the environment variables were set with `systemctl show-environment`.

[1]: https://docs.docker.com/engine/reference/builder/#env
[2]: https://www.freedesktop.org/software/systemd/man/systemd.exec.html#EnvironmentFile=
{{% /tab %}}

{{< /tabs >}}

**Note:** The .NET runtime tries to load a profiler into _any_ .NET process that is started with these environment variables set. You should limit instrumentation only to the applications that need to be traced. **We do not recommend setting these environment variables globally as this causes _all_ .NET processes on the host to load the profiler.**

## Manual Instrumentation

To manually instrument your code, add the `Datadog.Trace` [NuGet package][4] to your application. In your code, access the global tracer through the `Datadog.Trace.Tracer.Instance` property to create new spans.

For more details on manual instrumentation and custom tagging, see [Manual instrumentation documentation][5].

Manual instrumentation is supported on .NET Framework 4.5 and above on Windows and on .NET Core 2.1, 3.0, and 3.1 on Windows and Linux.

**Note:** When using both manual and automatic instrumentation, it is important to keep the MSI installer and NuGet package versions in sync.

## Configuration

There are multiple ways to configure the .NET Tracer:

* setting environment variables
* in .NET code
* creating a `datadog.json` file

{{< tabs >}}

{{% tab "Environment variables" %}}

To configure the Tracer using environment variables, set the variables before launching the instrumented application.

For example, on Windows:

```cmd
rem Set environment variables
SET DD_TRACE_AGENT_URL=http://localhost:8126
SET DD_ENV=prod
SET DD_SERVICE=MyService
SET DD_VERSION=abc123

rem Launch application
example.exe
```

**Note:** To set environment variables for a Windows Service, use the multi-string key `HKLM\System\CurrentControlSet\Services\{service name}\Environment` in the Windows Registry.

On Linux:

```bash
# Set environment variables
export DD_TRACE_AGENT_URL=http://localhost:8126
export DD_ENV=prod
export DD_SERVICE=MyService
export DD_VERSION=abc123

# Launch application
dotnet example.dll
```

{{% /tab %}}

{{% tab "Code" %}}

To configure the Tracer in application code, create a `TracerSettings` from the default configuration sources. Set properties on this `TracerSettings` instance before passing it to a `Tracer` constructor. For example:

```csharp
using Datadog.Trace;

// read default configuration sources (env vars, web.config, datadog.json)
var settings = TracerSettings.FromDefaultSources();

// change some settings
settings.Environment = "prod";
settings.ServiceName = "MyService";
settings.ServiceVersion = "abc123";
settings.AgentUri = new Uri("http://localhost:8126/");

// disable the AdoNet integration
settings.Integrations["AdoNet"].Enabled = false;

// create a new Tracer using these settings
var tracer = new Tracer(settings);

// set the global tracer
Tracer.Instance = tracer;
```

**Note:** Settings must be set on `TracerSettings` _before_ creating the `Tracer`. Changes made to `TracerSettings` properies after the `Tracer` is created are ignored.

{{% /tab %}}

{{% tab "JSON file" %}}

To configure the Tracer using a JSON file, create `datadog.json` in the instrumented application's directory. The root JSON object must be a hash with a key/value pair for each setting. For example:

```json
{
  "DD_TRACE_AGENT_URL": "http://localhost:8126",
  "DD_ENV": "prod",
  "DD_SERVICE": "MyService",
  "DD_VERSION": "abc123",
}
```

{{% /tab %}}

{{< /tabs >}}

### Configuration Variables

The following tables list the supported configuration variables. Use the first name (e.g. `DD_TRACE_AGENT_URL`) when setting environment variables or configuration files. The second name, if present (e.g. `AgentUri`), indicates the name the `TracerSettings` propery to use when changing settings in the code.

#### Unified Service Tagging

| Setting Name                                        | Description                                                                                                                                                                                                       |
|-----------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `DD_ENV`<br/><br/>`Environment`                     | If specified, adds the `env` tag with the specified value to all generated spans. See [Agent configuration][8] for more details about the `env` tag.  Available for versions 1.17.0+.                                                            |
| `DD_SERVICE`<br/><br/>`ServiceName`            | If specified, sets the service name. Otherwise, the .NET Tracer tries to determine service name automatically from application name (e.g. IIS application name, process entry assembly, or process name). Available for versions 1.17.0+  |
| `DD_VERSION`<br/><br/>`ServiceVersion`            | If specified, sets the version of the service. Available for versions 1.17.0+
| `DD_TAGS`<br/><br/>`GlobalTags`       | If specified, adds all of the specified tags to all generated spans (e.g., `layer:api,team:intake`). Available for versions 1.17.0+                                                                                                                                              |

We highly recommend using `DD_ENV`, `DD_SERVICE`, and `DD_VERSION` to set `env`, `service`, and `version` for your services.
Check out the [Unified Service Tagging][6] documentation for recommendations on how to configure these environment variables.

#### Instrumentation

The following table below lists configuration variables that are available for both automatic and manual instrumentation.

| Setting Name                                        | Description                                                                                                                                                                                                       |
|-----------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `DD_TRACE_AGENT_URL`<br/><br/>`AgentUri`            | Sets the URL endpoint where traces are sent. Overrides `DD_AGENT_HOST` and `DD_TRACE_AGENT_PORT` if set. Default value is `http://<DD_AGENT_HOST>:<DD_TRACE_AGENT_PORT>`.                                         |
| `DD_AGENT_HOST`                                     | Sets the host where traces are sent (the host running the Agent). Can be a hostname or an IP address. Ignored if `DD_TRACE_AGENT_URL` is set. Default is value `localhost`.                                       |
| `DD_TRACE_AGENT_PORT`                               | Sets the port where traces are sent (the port where the Agent is listening for connections). Ignored if `DD_TRACE_AGENT_URL` is set. Default value is `8126`.                                                     |
| `DD_LOGS_INJECTION`<br/><br/>`LogsInjectionEnabled` | Enables or disables automatic injection of correlation identifiers into application logs.                                                                                                                         |
| `DD_TRACE_GLOBAL_TAGS`<br/><br/>`GlobalTags`        | If specified, adds all of the specified tags to all generated spans.                                                                                                                                              |
| `DD_TRACE_DEBUG`                                    | Enables or disables debug logging. Valid values are: `true` or `false` (default).                                                                                                                                 |
| `DD_TRACE_HEADER_TAGS`                              | Accepts a map of case-insensitive header keys to tag names and automatically applies matching header values as tags on root spans. (e.g. : `CASE-insensitive-Header:my-tag-name,User-ID:userId`). Available for version 1.18.3+  |

The following table lists configuration variables that are available only when using automatic instrumentation.

| Setting Name                                                   | Description                                                                                                                                                                                                                                                                              |
|----------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `DD_TRACE_ENABLED`<br/><br/>`TraceEnabled`                     | Enables or disables all automatic instrumentation. Setting the environment variable to `false` completely disables the CLR profiler. For other configuration methods, the CLR profiler is still loaded, but traces will not be generated. Valid values are: `true` (default) or `false`. |
| `DD_TRACE_DEBUG`                                               | Enables or disables debug logs in the Tracer. Valid values are: `true` or `false` (default). Setting this as an environment variable also enabled debug logs in the CLR Profiler.                                                                                                        |
| `DD_TRACE_LOG_PATH`                                            | Sets the path for the CLR profiler's log file.<br/><br/>Windows default: `%ProgramData%\Datadog .NET Tracer\logs\dotnet-profiler.log`<br/><br/>Linux default: `/var/log/datadog/dotnet/dotnet-profiler.log`                                                                              |
| `DD_DISABLED_INTEGRATIONS`<br/><br/>`DisabledIntegrationNames` | Sets a list of integrations to disable. All other integrations remain enabled. If not set, all integrations are enabled. Supports multiple values separated with semicolons. Valid values are the integration names listed in the [Integrations](#integrations) section above.           |

The following table lists configuration variables that are available only when using automatic instrumentation and can be set for each integration. Use the first name (e.g. `DD_<INTEGRATION>_ENABLED`) when setting environment variables or configuration files. The second name (e.g. `Enabled`), indicates the name the `IntegrationSettings` property to use when changing settings in the code. Access these properties through the `TracerSettings.Integrations[]` indexer. Integration names are listed in the [Integrations][1] section. **Note:** On Linux, the names of environment variables are case-sensitive.

| Setting Name                                                                  | Description                                                                                                           |
|-------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------|
| `DD_TRACE_<INTEGRATION>_ENABLED`<br/><br/>`Enabled`                           | Enables or disables a specific integration. Valid values are: `true` (default) or `false`.                            |


[1]: /tracing/compatibility_requirements/dotnet-core
[2]: https://app.datadoghq.com/apm/docs
[3]: /tracing/send_traces/
[4]: https://www.nuget.org/packages/Datadog.Trace
[5]: /tracing/custom_instrumentation/dotnet/
[6]: /getting_started/tagging/unified_service_tagging/


{{< /programming-lang >}}

{{< programming-lang lang="PHP" >}}

## Compatibility Requirements

For a full list of supported libraries and language versions, visit the [Compatibility Requirements][1] page.

## Installation and getting started

### Follow the in-app documentation (Recommended)

Follow the [Quickstart instructions][2] within the Datadog app for the best experience, including:

- Step-by-step instructions scoped to your deployment configuration (hosts, Docker, Kubernetes, or Amazon ECS).
- Dynamically set `service`, `env`, and `version` tags.
- Enable ingesting 100% of traces during setup.

For descriptions of terminology used in APM, take a look at the [official documentation][3].

For details about open-source contributions to the PHP tracer, refer to the [contributing guide][4].

### Setup the Datadog Agent

The PHP APM tracer sends trace data through the Datadog Agent.

[Install and configure the Datadog Agent][5]. See the additional documentation for [tracing Docker applications][6] or [Kubernetes applications][7].

For Agent version [7.18.0][8] and above, APM is enabled by default for all environments without further action.
If you are running an older version of the agent, make sure the Agent has **[APM enabled][5]**.

### Install the extension

Install the PHP extension using one of the [precompiled packages for supported distributions][9].

Once downloaded, install the package with one of the commands below.

```shell
# using RPM package (RHEL/Centos 6+, Fedora 20+)
rpm -ivh datadog-php-tracer.rpm

# using DEB package (Debian Jessie+ , Ubuntu 14.04+ on supported PHP versions)
dpkg -i datadog-php-tracer.deb

# using APK package (Alpine)
apk add datadog-php-tracer.apk --allow-untrusted
```

The extension will be installed for the default PHP version. To install the extension for a specific PHP version, use the `DD_TRACE_PHP_BIN` environment variable to set the location of the target PHP binary before installing.

```shell
export DD_TRACE_PHP_BIN=$(which php-fpm7)
```

Restart PHP (PHP-FPM or the Apache SAPI) and then visit a tracing-enabled endpoint of your application. View the [APM UI][10] to see the traces.

**Note**: It might take a few minutes before traces appear in the UI. If traces still do not appear after a few minutes, [create a `phpinfo()` page][11] from the host machine and scroll down to the "ddtrace" section. Failed diagnostic checks will appear here to help identify any issues.

If you can't find your distribution, you can [manually install][12] the PHP extension.

## Automatic Instrumentation

Tracing is automatically enabled by default. Once the extension is installed, **ddtrace** traces your application and sends traces to the Agent.

Datadog supports all web frameworks out of the box. Automatic instrumentation works by modifying PHP's runtime to wrap certain functions and methods to trace them. The PHP tracer supports automatic instrumentation for several libraries.

Automatic instrumentation captures:

* Method execution time
* Relevant trace data, such as URL and status response codes for web requests or SQL queries for database access
* Unhandled exceptions, including stacktraces if available
* A total count of traces (e.g., web requests) flowing through the system

**Note**: If your application does not use Composer nor an autoloader registered with `spl_autoload_register()`, set the environment variable, `DD_TRACE_NO_AUTOLOADER=true`, to enable automatic instrumentation.

## Change Agent Hostname

Configure your application level tracers to submit traces to a custom Agent hostname:

The PHP tracer automatically looks for and initializes with the ENV variables `DD_AGENT_HOST` and `DD_TRACE_AGENT_PORT`.

See [tracer configuration][13] for more information on how to set these variables.

## Configuration

The PHP tracer can be configured using environment variables.

**Note**: If you use code auto-instrumentation (the recommended approach) be aware that the instrumenting code is executed before any user code. As a result, the environment variables below must be set at the server level and be available to the PHP runtime before any user code is executed. For example, `putenv()` and `.env` files would not work.

### Apache

For Apache with php-fpm, use the `env` directory in your `www.conf` configuration file to configure the php tracer, for example:

```
; Example of passing the host environment variable SOME_ENV
; to the PHP process as DD_AGENT_HOST
env[DD_AGENT_HOST] = $SOME_ENV
; Example of passing the value 'my-app' to the PHP
; process as DD_SERVICE
env[DD_SERVICE] = my-app
```

Alternatively, you can use [`SetEnv`][14] from the server config, virtual host, directory, or `.htaccess` file.

```text
SetEnv DD_TRACE_DEBUG true
```

### NGINX

For NGINX, use the `env` directive in the php-fpm's `www.conf` file, for example:

```
; Example of passing the host environment variable SOME_ENV
; to the PHP process as DD_AGENT_HOST
env[DD_AGENT_HOST] = $SOME_ENV
; Example of passing the value 'my-app' to the PHP
; process as DD_SERVICE
env[DD_SERVICE] = my-app
```

**Note**: If you have enabled APM for your NGINX server, make sure you have properly configured the `opentracing_fastcgi_propagate_context` setting for distributed tracing to properly work. See [NGINX APM configuration][15] for more details.

### PHP CLI server

Set in the command line to start the server.

```text
DD_TRACE_DEBUG=true php -S localhost:8888
```

### Environment Variable Configuration

| Env variable                              | Default     | Note                                                                                                                                           |
|-------------------------------------------|-------------|------------------------------------------------------------------------------------------------------------------------------------------------|
| `DD_AGENT_HOST`                           | `localhost` | The Agent host name                                                                                                                            |
| `DD_AUTOFINISH_SPANS`                     | `false`     | Whether spans are automatically finished when the tracer is flushed                                                                            |
| `DD_DISTRIBUTED_TRACING`                  | `true`      | Whether to enable distributed tracing                                                                                                          |
| `DD_ENV`                                  | `null`      | Set an application’s environment, for example: `prod`, `pre-prod`, `stage`. Added in version `0.47.0`.                                         |
| `DD_PRIORITY_SAMPLING`                    | `true`      | Whether to enable priority sampling                                                                                                            |
| `DD_SERVICE`                              | `null`      | The default app name. For versions <0.47.0 this is `DD_SERVICE_NAME`.                                                                          |
| `DD_SERVICE_MAPPING`                      | `null`      | Change the default name of an APM integration. Rename one or more integrations at a time, for example: `DD_SERVICE_MAPPING=pdo:payments-db,mysqli:orders-db` (see [Integration names](#integration-names)). |
| `DD_TRACE_AGENT_ATTEMPT_RETRY_TIME_MSEC`  | `5000`      | IPC-based configurable circuit breaker retry time (in milliseconds)                                                                            |
| `DD_TRACE_AGENT_CONNECT_TIMEOUT`          | `100`       | Maximum time the allowed for Agent connection setup (in milliseconds)                                                                          |
| `DD_TRACE_AGENT_CONNECT_TIMEOUT`          | `100`       | The Agent connection timeout (in milliseconds)                                                                                                 |
| `DD_TRACE_AGENT_MAX_CONSECUTIVE_FAILURES` | `3`         | IPC-based configurable circuit breaker max consecutive failures                                                                                |
| `DD_TRACE_AGENT_PORT`                     | `8126`      | The Agent port number                                                                                                                          |
| `DD_TRACE_AGENT_TIMEOUT`                  | `500`       | The Agent request transfer timeout (in milliseconds)                                                                                           |
| `DD_TRACE_AGENT_URL`                      | `null`      | The Agent URL; takes precedence over `DD_AGENT_HOST` and `DD_TRACE_AGENT_PORT`; for example: `https://localhost:8126`. Added in version `0.47.1`. |
| `DD_TRACE_AUTO_FLUSH_ENABLED`             | `false`     | Automatically flush the tracer when all the spans are closed; set to `true` in conjunction with `DD_TRACE_GENERATE_ROOT_SPAN=0` to trace long-running processes |
| `DD_TRACE_CLI_ENABLED`                    | `false`     | Enable tracing of PHP scripts from the CLI                                                                                                     |
| `DD_TRACE_DEBUG`                          | `false`     | Enable [debug mode](#custom-url-to-resource-mapping) for the tracer                                                                            |
| `DD_TRACE_ENABLED`                        | `true`      | Enable the tracer globally                                                                                                                     |
| `DD_TRACE_GENERATE_ROOT_SPAN`             | `true`      | Automatically generate a top-level span; set to `false` in conjunction with `DD_TRACE_AUTO_FLUSH_ENABLED=1` to trace long-running processes    |
| `DD_TAGS`                                 | `null`      | Tags to be set on all spans, for example: `key1:value1,key2:value2`. Added in version `0.47.0`                                                 |
| `DD_TRACE_HTTP_CLIENT_SPLIT_BY_DOMAIN`    | `false`     | Set the service name of HTTP requests to `host-<hostname>`, for example a `curl_exec()` call to `https://datadoghq.com` has the service name `host-datadoghq.com` instead of the default service name of `curl`. |
| `DD_TRACE_<INTEGRATION>_ENABLED`          | `true`      | Enable or disable an integration; all integrations are enabled by default (see [Integration names](#integration-names)). For versions < `0.47.1`, this parameter is `DD_INTEGRATIONS_DISABLED` which takes a CSV list of integrations to disable, for example: `curl,mysqli`. |
| `DD_TRACE_MEASURE_COMPILE_TIME`           | `true`      | Record the compile time of the request (in milliseconds) onto the top-level span                                                               |
| `DD_TRACE_NO_AUTOLOADER`                  | `false`     | Set to `true` to enable auto instrumentation for applications that do not use an autoloader                                                    |
| `DD_TRACE_RESOURCE_URI_FRAGMENT_REGEX`    | `null`      | CSV of regexes that identifies path fragments corresponding to IDs (see [Map resource names to normalized URI](#map-resource-names-to-normalized-uri)). |
| `DD_TRACE_RESOURCE_URI_MAPPING_INCOMING`  | `null`      | CSV of URI mappings to normalize resource naming for incoming requests (see [Map resource names to normalized URI](#map-resource-names-to-normalized-uri)). |
| `DD_TRACE_RESOURCE_URI_MAPPING_OUTGOING`  | `null`      | CSV of URI mappings to normalize resource naming for outgoing requests (see [Map resource names to normalized URI](#map-resource-names-to-normalized-uri)). |
| `DD_TRACE_SAMPLE_RATE`                    | `1.0`       | The sampling rate for the traces (defaults to: between `0.0` and `1.0`). For versions < `0.36.0`, this parameter is `DD_SAMPLING_RATE`.           |
| `DD_TRACE_SAMPLING_RULES`                 | `null`      | A JSON encoded string to configure the sampling rate. Examples: Set the sample rate to 20%: `[{"sample_rate": 0.2}]`. Set the sample rate to 10% for services starting with 'a' and span name 'b' and set the sample rate to 20% for all other services: `[{"service": "a.*", "name": "b", "sample_rate": 0.1}, {"sample_rate": 0.2}]` (see [Integration names](#integration-names)). |
| `DD_TRACE_URL_AS_RESOURCE_NAMES_ENABLED`  | `true`      | Enable URL's as resource names (see [Map resource names to normalized URI](#map-resource-names-to-normalized-uri)).                            |
| `DD_VERSION`                              | `null`      | Set an application’s version in traces and logs, for example: `1.2.3`, `6c44da20`, `2020.02.13`. Added in version `0.47.0`.                    |

#### Integration names

The table below specifies the default service names for each integration. Change the service names with `DD_SERVICE_MAPPING`.

Use the name when setting integration-specific configuration such as, `DD_TRACE_<INTEGRATION>_ANALYTICS_ENABLED`, for example: Laravel is `DD_TRACE_LARAVEL_ANALYTICS_ENABLED`.

| Integration       | Service Name      |
|-------------------|-------------------|
| CakePHP           | `cakephp`         |
| CodeIgniter       | `codeigniter`     |
| cURL              | `curl`            |
| ElasticSearch     | `elasticsearch`   |
| Eloquent          | `eloquent`        |
| Guzzle            | `guzzle`          |
| Laravel           | `laravel`         |
| Lumen             | `lumen`           |
| Memcached         | `memcached`       |
| Mongo             | `mongo`           |
| Mysqli            | `mysqli`          |
| PDO               | `pdo`             |
| PhpRedis          | `phpredis`        |
| Predis            | `predis`          |
| Slim              | `slim`            |
| Symfony           | `symfony`         |
| WordPress         | `wordpress`       |
| Yii               | `yii`             |
| ZendFramework     | `zendframework`   |

#### Map resource names to normalized URI

<div class="alert alert-warning">
<strong>Deprecation notice:</strong> As of version <a href="https://github.com/DataDog/dd-trace-php/releases/tag/0.47.0">0.47.0</a> the legacy setting <code>DD_TRACE_RESOURCE_URI_MAPPING</code> is deprecated. It still works for the foreseeable future but it is strongly encouraged that you use the new settings outlined in this paragraph to avoid issues when legacy support is removed.

Note that setting any of the following: <code>DD_TRACE_RESOURCE_URI_FRAGMENT_REGEX</code>, <code>DD_TRACE_RESOURCE_URI_MAPPING_INCOMING</code>, and <code>DD_TRACE_RESOURCE_URI_MAPPING_OUTGOING</code> will opt-in to the new resource normalization approach and any value in <code>DD_TRACE_RESOURCE_URI_MAPPING</code> will be ignored.
</div>

For HTTP server and client integrations, the URL is used to form the trace resource name in the format `<HTTP_REQUEST_METHOD> <NORMALIZED_URL>`, with the query string removed from the URL. This allows better visibility in any custom framework that is not automatically instrumented by normalizing the URLs and grouping together generic endpoints under one resource.

| HTTP Request                       | Resource Name |
|:-----------------------------------|:--------------|
| **GET** request to `/foo?a=1&b=2`  | `GET /foo`    |
| **POST** request to `/bar?foo=bar` | `POST /bar`   |

Numeric IDs, UUIDs (with and without dashes), and 32-to-512-bit hexadecimal hashes are automatically replaced with a `?` character.

| URL (GET request)                              | Resource Name      |
|:-----------------------------------------------|:-------------------|
| `/user/123/show`                               | `GET /user/?/show` |
| `/widget/b7a992e0-3300-4030-8617-84553b11c993` | `GET /widget/?`    |
| `/api/v2/b7a992e033004030861784553b11c993/123` | `GET /api/v2/?/?`  |
| `/book/0dbf3596`                               | `GET /book/?`      |

You can turn this functionality OFF using `DD_TRACE_URL_AS_RESOURCE_NAMES_ENABLED=false`.

##### Custom URL-To-Resource Mapping

There are a few cases that are not covered by the automatic normalization that is applied.

| URL (GET request)                | Expected Resource Name        |
|:---------------------------------|:------------------------------|
| `/using/prefix/id123/for/id`    | `GET /using/prefix/?/for/id`  |
| `/articles/slug-of-title`        | `GET /articles/?`             |
| `/cities/new-york/rivers`        | `GET /cities/?/rivers`        |
| `/nested/cities/new-york/rivers` | `GET /nested/cities/?/rivers` |

There are two classes of scenarios that are not covered by automatic normalization:

  - The path fragment to normalize has a reproducible patter nand can be present in any part of the url, for example `id<number>` in the example above. This scenario is covered by the setting `DD_TRACE_RESOURCE_URI_FRAGMENT_REGEX` below.
  - The path fragment can be anything, and the previous path fragment indicates that a value has to be normalized. For example `/cities/new-york` tells us that `new-york` has to be normalized as it is the name of a city. This scenario is covered by settings `DD_TRACE_RESOURCE_URI_MAPPING_INCOMING` and `DD_TRACE_RESOURCE_URI_MAPPING_OUTGOING` for incoming and outgoing requests respectively.

###### `DD_TRACE_RESOURCE_URI_FRAGMENT_REGEX`

This setting is a CSV of regex that are applied to every path fragment independently. For example setting `DD_TRACE_RESOURCE_URI_FRAGMENT_REGEX` to `^id\d+$` for the first example `/using/prefix/id123/for/id` would apply the regex to all framents `using`, `prefix`, `id123`, `for`, and `id`. The final normalized resorce name would be `GET /using/prefix/?/for/id`.

Note that multiple regular expressions separated by a comma can be added `^id\d+$,code\d+$` and that the comma character `,` is not escaped, hence it cannot be used in the regular expression.

###### `DD_TRACE_RESOURCE_URI_MAPPING_INCOMING` and `DD_TRACE_RESOURCE_URI_MAPPING_OUTGOING`

This setting is a CSV of patterns that can contain a wildcard `*`. For example, adding the pattern `cities/*` means that everytime the fragment `cities` is found while analyzing a URL, then the next fragment, if any, will be replaced with `?`. Patterns are applied at any depth, so applying the following rule will both normalize `/cities/new-york` and `/nested/cities/new-york` in the table above.

Patterns can be applied to a part of a specific fragment. For example `path/*-fix` would normalize the url `/some/path/changing-fix/nested` to `/some/path/?-fix/nested`

Note that `DD_TRACE_RESOURCE_URI_MAPPING_INCOMING` applies to only incoming requests (for example web frameworks) while `DD_TRACE_RESOURCE_URI_MAPPING_OUTGOING` only applies to outgoing requests (for example `curl` and `guzzle` requests).

## Upgrading

To upgrade the PHP tracer, [download the latest release][9] and follow the same steps as [installing the extension](#install-the-extension).

**Note**: If you are using second level caching in OPcache by setting the parameter `opcache.file_cache`, remove the cache folder.

## Removing

To remove the PHP tracer:

1. For php-fpm, stop the php-fpm service, otherwise stop the Apache web server.
2. Unlink files `98-ddtrace.ini` and `99-ddtrace-custom.ini` from your php configuration folder.
3. For php-fpm, restart php-fpm service, otherwise restart the Apache web server.

**Note**: If you are using second level caching in OPcache by setting the parameter `opcache.file_cache`, remove the cache folder.


[1]: /tracing/compatibility_requirements/php
[2]: https://app.datadoghq.com/apm/docs
[3]: /tracing/visualization/
[4]: https://github.com/DataDog/dd-trace-php/blob/master/CONTRIBUTING.md
[5]: /tracing/send_traces/
[6]: /tracing/setup/docker/
[7]: /agent/kubernetes/apm/
[8]: https://github.com/DataDog/datadog-agent/releases/tag/7.18.0
[9]: https://github.com/DataDog/dd-trace-php/releases/latest
[10]: https://app.datadoghq.com/apm/services
[11]: /tracing/troubleshooting/tracer_startup_logs?tab=php#php-info
[12]: /tracing/faq/php-tracer-manual-installation
[13]: /tracing/setup/php/#environment-variable-configuration
[14]: https://httpd.apache.org/docs/2.4/mod/mod_env.html#setenv
[15]: /tracing/setup/nginx/#nginx-and-fastcgi


{{< /programming-lang >}}

{{< /programming-lang-wrapper >}}

<br>

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/send_traces/
[2]: /tracing/visualization/#trace
[3]: /developers/libraries/#apm-tracing-client-libraries
