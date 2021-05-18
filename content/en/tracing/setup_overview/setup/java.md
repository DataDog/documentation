---
title: Tracing Java Applications
kind: documentation
aliases:
    - /tracing/java
    - /tracing/languages/java
    - /agent/apm/java/
    - /tracing/setup/java
    - /tracing/setup_overview/java
code_lang: java
type: multi-code-lang
code_lang_weight: 0
further_reading:
    - link: 'https://github.com/DataDog/dd-trace-java'
      tag: 'GitHub'
      text: 'Datadog Java APM source code'
    - link: 'tracing/visualization/'
      tag: 'Documentation'
      text: 'Explore your services, resources and traces'
---
## Compatibility Requirements

The Java Tracing Library supports all JVMs on all platforms version 7 and higher. To utilize tracing with the [Continuous Profiler][1], OpenJDK 11+, Oracle Java 11+, OpenJDK 8 for most vendors (version 8u262+) and Zulu Java 8+ (minor version 1.8.0_212+) are supported. Starting in version 8u272+, all vendors will be supported for the Profiler.

All JVM-based languages, such as Scala (versions 2.10.x - 2.13.x), Groovy, Kotlin, and Clojure are supported in the Java tracer and profiler. For a full list of supported libraries, visit the [Compatibility Requirements][2] page.

## Installation and Getting Started

### Follow the in-app Documentation (Recommended)

Follow the [Quickstart instructions][3] within the Datadog app for the best experience, including:

- Step-by-step instructions scoped to your deployment configuration (hosts, Docker, Kubernetes, or Amazon ECS).
- Dynamically set `service`, `env` and `version` tags.
- Enable the Continuous Profiler, ingesting 100% of traces, and Trace ID injection into logs during setup.

### Java Installation Steps

Otherwise, to begin tracing your applications:

1. Download `dd-java-agent.jar` that contains the latest Agent class files:

   ```shell
   wget -O dd-java-agent.jar https://dtdg.co/latest-java-tracer
   ```
   To access a specific version of the tracer, visit Datadog's [Maven repository][4].

2. Add the following JVM argument when starting your application in your IDE, Maven or Gradle application script, or `java -jar` command:

   ```text
    -javaagent:/path/to/the/dd-java-agent.jar
   ```

3. Add [configuration options](#configuration) for tracing and ensure you are setting environment variables or passing system properties as JVM arguments, particularly for service, environment, logs injection, profiling, and optionally runtime metrics-all the metrics you intend to use. See the examples below. Note that using the in-app quickstart instructions generates these for you.

### Configure the Datadog Agent for APM

Install and configure the Datadog Agent to receive traces from your now instrumented application. By default the Datadog Agent is enabled in your `datadog.yaml` file under `apm_enabled: true` and listens for trace traffic at `localhost:8126`. For containerized environments, follow the links below to enable trace collection within the Datadog Agent.

{{< tabs >}}
{{% tab "Containers" %}}

1. Set `apm_non_local_traffic: true` in your main [`datadog.yaml` configuration file][1]

2. See the specific setup instructions to ensure that the Agent is configured to receive traces in a containerized environment:

{{< partial name="apm/apm-containers.html" >}}
</br>

3. After having instrumented your application, the tracing client sends traces to `localhost:8126` by default.  If this is not the correct host and port, change it by setting the below env variables:

`DD_AGENT_HOST` and `DD_TRACE_AGENT_PORT`.

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


[1]: /agent/guide/agent-configuration-files/#agent-main-configuration-file
{{% /tab %}}
{{% tab "AWS Lambda" %}}

To set up Datadog APM in AWS Lambda, see the [Tracing Serverless Functions][1] documentation.


[1]: /tracing/serverless_functions/
{{% /tab %}}
{{% tab "Other Environments" %}}

Tracing is available for a number of other environments, such as  [Heroku][1], [Cloud Foundry][2], [AWS Elastic Beanstalk][3], and [Azure App Services Extension][4].

For other environments, please refer to the [Integrations][5] documentation for that environment and [contact support][6] if you are encountering any setup issues.

[1]: /agent/basic_agent_usage/heroku/#installation
[2]: /integrations/cloud_foundry/#trace-collection
[3]: /integrations/amazon_elasticbeanstalk/
[4]: /infrastructure/serverless/azure_app_services/#overview
[5]: /integrations/
[6]: /help/
{{% /tab %}}
{{< /tabs >}}

### Add the Java Tracer to the JVM

Use the documentation for your application server to figure out the right way to pass in `-javaagent` and other JVM arguments. Here are instructions for some commonly used frameworks:

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

Open your Tomcat startup script file, for example `setenv.sh` on Linux, and add:

```text
CATALINA_OPTS="$CATALINA_OPTS -javaagent:/path/to/dd-java-agent.jar"
```

Or on Windows, `setenv.bat`:

```text
set CATALINA_OPTS_OPTS=%CATALINA_OPTS_OPTS% -javaagent:"c:\path\to\dd-java-agent.jar"
```
If a `setenv` file does not exist, create it in the `./bin` directory of the Tomcat project folder.

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

**Note**

- If you're adding the `-javaagent` argument to your `java -jar` command, it needs to be added _before_ the `-jar` argument, that is as a JVM option, not as an application argument. For example:

   ```text
   java -javaagent:/path/to/dd-java-agent.jar -jar my_app.jar
   ```

     For more information, see the [Oracle documentation][5].

- Never add `dd-java-agent` to your classpath. It can cause unexpected behavior.

## Automatic Instrumentation

Automatic instrumentation for Java uses the `java-agent` instrumentation capabilities [provided by the JVM][6]. When a `java-agent` is registered, it has the ability to modify class files at load time.

Instrumentation may come from auto-instrumentation, the OpenTracing api, or a mixture of both. Instrumentation generally captures the following info:

- Timing duration is captured using the JVM's nanotime clock unless a timestamp is provided from the OpenTracing API
- Key/value tag pairs
- Errors and stacktraces which are unhandled by the application
- A total count of traces (requests) flowing through the system

## Configuration

All configuration options below have system property and environment variable equivalents.
If the same key type is set for both, the system property configuration takes priority.
System properties can be set as JVM flags.

Note: When using the java tracer’s system properties, make sure that they are listed before `-jar` so they get read in as JVM options.


`dd.service`
: **Environment Variable**: `DD_SERVICE`<br>
**Default**: `unnamed-java-app`<br>
The name of a set of processes that do the same job. Used for grouping stats for your application. Available for versions 0.50.0+.

`dd.tags`
: **Environment Variable**: `DD_TAGS`<br>
**Default**: `null`<br>
**Example**: `layer:api,team:intake`<br>
A list of default tags to be added to every span, profile, and JMX metric. If DD_ENV or DD_VERSION is used, it will override any env or version tag defined in DD_TAGS. Available for versions 0.50.0+.

`dd.env`
: **Environment Variable**: `DD_ENV`<br>
**Default**: `none`<br>
Your application environment (e.g. production, staging, etc.). Available for versions 0.48+.

`dd.version`
: **Environment Variable**: `DD_VERSION`<br>
**Default**: `null`<br>
Your application version (e.g. 2.5, 202003181415, 1.3-alpha, etc.). Available for versions 0.48+.

`dd.logs.injection`
: **Environment Variable**: `DD_LOGS_INJECTION`<br>
**Default**: `false`<br>
Enabled automatic MDC key injection for Datadog trace and span IDs. See [Advanced Usage][7] for details.

`dd.trace.config`
: **Environment Variable**: `DD_TRACE_CONFIG`<br>
**Default**: `null`<br>
Optional path to a file where configuration properties are provided one per each line. For instance, the file path can be provided as via `-Ddd.trace.config=<FILE_PATH>.properties`, with setting the service name in the file with `dd.service=<SERVICE_NAME>`

`dd.service.mapping`
: **Environment Variable**: `DD_SERVICE_MAPPING`<br>
**Default**: `null`<br>
**Example**: `mysql:my-mysql-service-name-db, postgres:my-postgres-service-name-db`<br>
Dynamically rename services via configuration. Useful for making databases have distinct names across different services.

`dd.writer.type`
: **Environment Variable**: `DD_WRITER_TYPE`<br>
**Default**: `DDAgentWriter`<br>
Default value sends traces to the Agent. Configuring with `LoggingWriter` instead writes traces out to the console.

`dd.agent.host`
: **Environment Variable**: `DD_AGENT_HOST`<br>
**Default**: `localhost`<br>
Hostname for where to send traces to. If using a containerized environment, configure this to be the host IP. See [Tracing Docker Applications][8] for more details.

`dd.trace.agent.port`
: **Environment Variable**: `DD_TRACE_AGENT_PORT`<br>
**Default**: `8126`<br>
Port number the Agent is listening on for configured host.

`dd.trace.agent.unix.domain.socket`
: **Environment Variable**: `DD_TRACE_AGENT_UNIX_DOMAIN_SOCKET`<br>
**Default**: `null`<br>
This can be used to direct trace traffic to a proxy, to later be sent to a remote Datadog Agent.

`dd.trace.agent.url`
: **Environment Variable**: `DD_TRACE_AGENT_URL`<br>
**Default**: `null`<br>
The URL to send traces to. This can start with `http://` to connect using HTTP or with `unix://` to use a Unix Domain Socket. When set this takes precedence over `DD_AGENT_HOST` and `DD_TRACE_AGENT_PORT`. Available for versions 0.65+.

`dd.trace.agent.timeout`
: **Environment Variable**: `DD_TRACE_AGENT_TIMEOUT`<br>
**Default**: `10`<br>
Timeout in seconds for network interactions with the Datadog Agent.

`dd.trace.header.tags`
: **Environment Variable**: `DD_TRACE_HEADER_TAGS`<br>
**Default**: `null`<br>
**Example**: `CASE-insensitive-Header:my-tag-name,User-ID:userId`<br>
A map of header keys to tag names. Automatically apply header values as tags on traces.

`dd.trace.annotations`
: **Environment Variable**: `DD_TRACE_ANNOTATIONS`<br>
**Default**: ([listed here][9])<br>
**Example**: `com.some.Trace;io.other.Trace`<br>
A list of method annotations to treat as `@Trace`.

`dd.trace.methods`
: **Environment Variable**: `DD_TRACE_METHODS`<br>
**Default**: `null`<br>
**Example**: `"package.ClassName[method1,method2,...];AnonymousClass$1[call];package.ClassName[*]"`<br>
List of class/interface and methods to trace. Similar to adding `@Trace`, but without changing code. **Note:** The wildcard method support (`[*]`) does not accommodate constructors, getters, setters, synthetic, toString, equals, hashcode, or finalizer method calls

`dd.trace.classes.exclude`
: **Environment Variable**: `DD_TRACE_CLASSES_EXCLUDE`<br>
**Default**: `null`<br>
**Example**: `package.ClassName,package.ClassName$Nested,package.Foo*,package.other.*`<br>
A list of fully qualified classes (that may end with a wildcard to denote a prefix) which will be ignored (not modified) by the tracer. Must use the jvm internal representation for names (eg package.ClassName$Nested and not package.ClassName.Nested)

`dd.trace.partial.flush.min.spans`
: **Environment Variable**: `DD_TRACE_PARTIAL_FLUSH_MIN_SPANS`<br>
**Default**: `1000`<br>
Set a number of partial spans to flush on. Useful to reduce memory overhead when dealing with heavy traffic or long running traces.

`dd.trace.split-by-tags`
: **Environment Variable**: `DD_TRACE_SPLIT_BY_TAGS`<br>
**Default**: `null`<br>
**Example**: `aws.service`<br>
Used to rename spans to be identified with the corresponding service tag

`dd.trace.db.client.split-by-instance` 
: **Environment Variable**: `DD_TRACE_DB_CLIENT_SPLIT_BY_INSTANCE` <br>
**Default**: `false`<br>
When set to `true` db spans get assigned the instance name as the service name

`dd.trace.health.metrics.enabled`
: **Environment Variable**: `DD_TRACE_HEALTH_METRICS_ENABLED`<br>
**Default**: `false`<br>
When set to `true` sends tracer health metrics

`dd.trace.health.metrics.statsd.host`
: **Environment Variable**: `DD_TRACE_HEALTH_METRICS_STATSD_HOST`<br>
**Default**: Same as `dd.jmxfetch.statsd.host` <br>
Statsd host to send health metrics to

`dd.trace.health.metrics.statsd.port`
: **Environment Variable**: `DD_TRACE_HEALTH_METRICS_STATSD_PORT`<br>
**Default**: Same as `dd.jmxfetch.statsd.port` <br>
Statsd port to send health metrics to

`dd.http.client.tag.query-string`
: **Environment Variable**: `DD_HTTP_CLIENT_TAG_QUERY_STRING`<br>
**Default**: `false`<br>
When set to `true` query string parameters and fragment get added to web client spans

`dd.http.client.error.statuses`
: **Environment Variable**: `DD_HTTP_CLIENT_ERROR_STATUSES`<br>
**Default**: `400-499`<br>
A range of errors can be accepted. By default 4xx errors are reported as errors for http clients. This configuration overrides that. Ex. `dd.http.client.error.statuses=400-403,405,410-499`

`dd.http.server.error.statuses`
: **Environment Variable**: `DD_HTTP_SERVER_ERROR_STATUSES`<br>
**Default**: `500-599`<br>
A range of errors can be accepted. By default 5xx status codes are reported as errors for http servers. This configuration overrides that. Ex. `dd.http.server.error.statuses=500,502-599`

`dd.http.server.tag.query-string`
: **Environment Variable**: `DD_HTTP_SERVER_TAG_QUERY_STRING`<br>
**Default**: `false`<br>
When set to `true` query string parameters and fragment get added to web server spans

`dd.trace.enabled`
: **Environment Variable**: `DD_TRACE_ENABLED`<br>
**Default**: `true`<br>
When `false` tracing agent is disabled.

`dd.jmxfetch.enabled`
: **Environment Variable**: `DD_JMXFETCH_ENABLED`<br>
**Default**: `true`<br>
Enable collection of JMX metrics by Java Tracing Agent.

`dd.jmxfetch.config.dir`
: **Environment Variable**: `DD_JMXFETCH_CONFIG_DIR`<br>
**Default**: `null`<br>
**Example**: `/opt/datadog-agent/etc/conf.d`<br>
Additional configuration directory for JMX metrics collection. The Java Agent looks for `jvm_direct:true` in the `instance` section in the `yaml` file to change configuration.

`dd.jmxfetch.config`
: **Environment Variable**: `DD_JMXFETCH_CONFIG`<br>
**Default**: `null`<br>
**Example**: `activemq.d/conf.yaml,jmx.d/conf.yaml`<br>
Additional metrics configuration file for JMX metrics collection. The Java Agent looks for `jvm_direct:true` in the `instance` section in the `yaml` file to change configuration.

`dd.jmxfetch.check-period`
: **Environment Variable**: `DD_JMXFETCH_CHECK_PERIOD`<br>
**Default**: `1500`<br>
How often to send JMX metrics (in ms).

`dd.jmxfetch.refresh-beans-period`
: **Environment Variable**: `DD_JMXFETCH_REFRESH_BEANS_PERIOD`<br>
**Default**: `600`<br>
How often to refresh list of available JMX beans (in seconds).

`dd.jmxfetch.statsd.host`
: **Environment Variable**: `DD_JMXFETCH_STATSD_HOST`<br>
**Default**: Same as `agent.host`<br>
Statsd host to send JMX metrics to. If you are using Unix Domain Sockets, use an argument like 'unix://PATH_TO_UDS_SOCKET'. Example: `unix:///var/datadog-agent/dsd.socket`

`dd.jmxfetch.statsd.port`
: **Environment Variable**: `DD_JMXFETCH_STATSD_PORT`<br>
**Default**: `8125`<br>
StatsD port to send JMX metrics to. If you are using Unix Domain Sockets, input 0.

`dd.integration.opentracing.enabled`
: **Environment Variable**: `DD_INTEGRATION_OPENTRACING_ENABLED`<br>
**Default**: `true`<br>
By default the tracing client detects if a GlobalTracer is being loaded and dynamically registers a tracer into it. By turning this to false, this removes any tracer dependency on OpenTracing.

`dd.hystrix.tags.enabled`
: **Environment Variable**: `DD_HYSTRIX_TAGS_ENABLED`<br>
**Default**: `false`<br>
By default the Hystrix group, command, and circuit state tags are not enabled. This property enables them.

`dd.trace.servlet.async-timeout.error` 
: **Environment Variable**: `DD_TRACE_SERVLET_ASYNC_TIMEOUT_ERROR` <br>
**Default**: `true`<br>
By default, long running asynchronous requests will be marked as an error, setting this value to false allows to mark all timeouts as successful requests.

`dd.trace.startup.logs`
: **Environment Variable**: `DD_TRACE_STARTUP_LOGS`<br>
**Default**: `true`<br>
When `false`, informational startup logging is disabled. Available for versions 0.64+.

`dd.trace.servlet.principal.enabled`
: **Environment Variable**: `DD_TRACE_SERVLET_PRINCIPAL_ENABLED`<br>
**Default**: `false`<br>
When `true`, user principal is collected. Available for versions 0.61+.


**Note**:

- If the same key type is set for both, the system property configuration takes priority.
- System properties can be used as JVM parameters.
- By default, JMX metrics from your application are sent to the Datadog Agent thanks to DogStatsD over port `8125`. Make sure that [DogStatsD is enabled for the Agent][10].

  - If you are running the Agent as a container, ensure that `DD_DOGSTATSD_NON_LOCAL_TRAFFIC` [is set to `true`][11], and that port `8125` is open on the Agent container.
  - In Kubernetes, [bind the DogStatsD port to a host port][12]; in ECS, [set the appropriate flags in your task definition][13].

### Integrations

See how to disable integrations in the [integrations][14] compatibility section.

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

See the [Java integration documentation][15] to learn more about Java metrics collection with JMX fetch.

### B3 Headers Extraction and Injection

Datadog APM tracer supports [B3 headers extraction][16] and injection for distributed tracing.

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
implementation group: 'com.datadoghq', name: 'dd-trace-api', version: {version}
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


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/profiler/getting_started/?tab=java
[2]: /tracing/compatibility_requirements/java
[3]: https://app.datadoghq.com/apm/docs
[4]: https://repo1.maven.org/maven2/com/datadoghq/dd-java-agent
[5]: https://docs.oracle.com/javase/7/docs/technotes/tools/solaris/java.html
[6]: https://docs.oracle.com/javase/8/docs/api/java/lang/instrument/package-summary.html
[7]: /tracing/connect_logs_and_traces/java/
[8]: /tracing/setup/docker/
[9]: https://github.com/DataDog/dd-trace-java/blob/master/dd-java-agent/instrumentation/trace-annotation/src/main/java/datadog/trace/instrumentation/trace_annotation/TraceAnnotationsInstrumentation.java#L37
[10]: /developers/dogstatsd/#setup
[11]: /agent/docker/#dogstatsd-custom-metrics
[12]: /developers/dogstatsd/
[13]: /integrations/amazon_ecs/?tab=python#create-an-ecs-task
[14]: /tracing/compatibility_requirements/java#disabling-integrations
[15]: /integrations/java/?tab=host#metric-collection
[16]: https://github.com/openzipkin/b3-propagation
