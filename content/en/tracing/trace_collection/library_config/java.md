---
title: Configuring the Java Tracing Library
kind: documentation
code_lang: java
type: multi-code-lang
code_lang_weight: 0
further_reading:
    - link: 'https://github.com/DataDog/dd-trace-java'
      tag: "Source Code"
      text: 'Datadog Java APM source code'
    - link: 'tracing/glossary/'
      tag: 'Documentation'
      text: 'Explore your services, resources and traces'
    - link: "/tracing/trace_collection/trace_context_propagation/java/"
      tag: "Documentation"
      text: "Propagating trace context with headers"
---

After you set up the tracing library with your code and configure the Agent to collect APM data, optionally configure the tracing library as desired, including setting up [Unified Service Tagging][1].

All configuration options below have system property and environment variable equivalents.
If the same key type is set for both, the system property configuration takes priority.
System properties can be set as JVM flags.

### Converting between system properties and environment variables
Unless otherwise stated, you can convert between system properties and environment variables with the following transformations:

- To set a system property as an environment variable, uppercase the property name and replace `.` or `-` with `_`.
  For example, `dd.service` becomes `DD_SERVICE`.
- To set an environment variable as a system property, lowercase the variable name and replace `_` with `.`
  For example, `DD_TAGS` becomes `dd.tags`.

**Note**: When using the Java tracer's system properties, list the properties before `-jar`. This ensures the properties are read in as JVM options.

## Configuration options

### Unified service tagging

`dd.service`
: **Environment Variable**: `DD_SERVICE`<br>
**Default**: `unnamed-java-app`<br>
The name of a set of processes that do the same job. Used for grouping stats for your application. Available for versions 0.50.0+.

`dd.env`
: **Environment Variable**: `DD_ENV`<br>
**Default**: `none`<br>
Your application environment (for example, production, staging). Available for versions 0.48+.

`dd.version`
: **Environment Variable**: `DD_VERSION`<br>
**Default**: `null`<br>
Your application version (for example, 2.5, 202003181415, 1.3-alpha). Available for versions 0.48+.

### Errors

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

### Traces

`dd.trace.config`
: **Environment Variable**: `DD_TRACE_CONFIG`<br>
**Default**: `null`<br>
Optional path to a file where configuration properties are provided one per each line. For instance, the file path can be provided as via `-Ddd.trace.config=<FILE_PATH>.properties`, with setting the service name in the file with `dd.service=<SERVICE_NAME>`

`dd.service.mapping`
: **Environment Variable**: `DD_SERVICE_MAPPING`<br>
**Default**: `null`<br>
**Example**: `mysql:my-mysql-service-name-db, postgresql:my-postgres-service-name-db`<br>
Dynamically rename services via configuration. Useful for making databases have distinct names across different services.

`dd.writer.type`
: **Environment Variable**: `DD_WRITER_TYPE`<br>
**Default**: `DDAgentWriter`<br>
Default value sends traces to the Agent. Configuring with `LoggingWriter` instead writes traces out to the console.

`dd.trace.agent.port`
: **Environment Variable**: `DD_TRACE_AGENT_PORT`<br>
**Default**: `8126`<br>
The port number the Agent is listening on for configured host. If the [Agent configuration][6] sets `receiver_port` or `DD_APM_RECEIVER_PORT` to something other than the default `8126`, then `dd.trace.agent.port` or `dd.trace.agent.url` must match it.

`dd.trace.agent.unix.domain.socket`
: **Environment Variable**: `DD_TRACE_AGENT_UNIX_DOMAIN_SOCKET`<br>
**Default**: `null`<br>
This can be used to direct trace traffic to a proxy, to later be sent to a remote Datadog Agent.

`dd.trace.agent.url`
: **Environment Variable**: `DD_TRACE_AGENT_URL`<br>
**Default**: `null`<br>
The URL to send traces to. If the [Agent configuration][6] sets `receiver_port` or `DD_APM_RECEIVER_PORT` to something other than the default `8126`, then `dd.trace.agent.port` or `dd.trace.agent.url` must match it. The URL value can start with `http://` to connect using HTTP or with `unix://` to use a Unix Domain Socket. When set this takes precedence over `DD_AGENT_HOST` and `DD_TRACE_AGENT_PORT`. Available for versions 0.65+.

`dd.trace.agent.timeout`
: **Environment Variable**: `DD_TRACE_AGENT_TIMEOUT`<br>
**Default**: `10`<br>
Timeout in seconds for network interactions with the Datadog Agent.

`dd.trace.header.tags`
: **Environment Variable**: `DD_TRACE_HEADER_TAGS`<br>
**Default**: `null`<br>
**Example**: `CASE-insensitive-Header:my-tag-name,User-ID:userId,My-Header-And-Tag-Name`<br>
Accepts a map of case-insensitive header keys to tag names and automatically applies matching header values as tags on traces. Also accepts entries without a specified tag name that are automatically mapped to tags of the form `http.request.headers.<header-name>` and `http.response.headers.<header-name>` respectively.<br><br>
Prior to version 0.96.0 this setting only applied to request header tags. To change back to the old behavior, add the setting `-Ddd.trace.header.tags.legacy.parsing.enabled=true` or the environment variable `DD_TRACE_HEADER_TAGS_LEGACY_PARSING_ENABLED=true`.<br><br>
**Beta**: Starting in version 1.18.3, if [Agent Remote Configuration][3] is enabled where this service runs, you can set `DD_TRACE_HEADER_TAGS` in the [Service Catalog][4] UI.

`dd.trace.request_header.tags`
: **Environment Variable**: `DD_TRACE_REQUEST_HEADER_TAGS`<br>
**Default**: `null`<br>
**Example**: `CASE-insensitive-Header:my-tag-name,User-ID:userId,My-Header-And-Tag-Name`<br>
Accepts a map of case-insensitive header keys to tag names and automatically applies matching request header values as tags on traces. Also accepts entries without a specified tag name that are automatically mapped to tags of the form `http.request.headers.<header-name>`.<br>
Available since version 0.96.0.

`dd.trace.response_header.tags`
: **Environment Variable**: `DD_TRACE_RESPONSE_HEADER_TAGS`<br>
**Default**: `null`<br>
**Example**: `CASE-insensitive-Header:my-tag-name,User-ID:userId,My-Header-And-Tag-Name`<br>
Accepts a map of case-insensitive header keys to tag names and automatically applies matching response header values as tags on traces. Also accepts entries without a specified tag name that are automatically mapped to tags of the form `http.response.headers.<header-name>`.<br>
Available since version 0.96.0.

`dd.trace.header.baggage`
: **Environment Variable**: `DD_TRACE_HEADER_BAGGAGE`<br>
**Default**: `null`<br>
**Example**: `CASE-insensitive-Header:my-baggage-name,User-ID:userId,My-Header-And-Baggage-Name`<br>
Accepts a map of case-insensitive header keys to baggage keys and automatically applies matching request header values as baggage on traces. On propagation the reverse mapping is applied: Baggage is mapped to headers.<br>
Available since version 1.3.0.

`dd.trace.annotations`
: **Environment Variable**: `DD_TRACE_ANNOTATIONS`<br>
**Default**: ([listed here][7])<br>
**Example**: `com.some.Trace;io.other.Trace`<br>
A list of method annotations to treat as `@Trace`.

`dd.trace.methods`
: **Environment Variable**: `DD_TRACE_METHODS`<br>
**Default**: `null`<br>
**Example**: `package.ClassName[method1,method2,...];AnonymousClass$1[call];package.ClassName[*]`<br>
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
Used to rename the service name associated with spans to be identified with the corresponding span tag

`dd.trace.health.metrics.enabled`
: **Environment Variable**: `DD_TRACE_HEALTH_METRICS_ENABLED`<br>
**Default**: `true`<br>
When set to `true` sends tracer health metrics

`dd.trace.health.metrics.statsd.host`
: **Environment Variable**: `DD_TRACE_HEALTH_METRICS_STATSD_HOST`<br>
**Default**: Same as `dd.jmxfetch.statsd.host` <br>
Statsd host to send health metrics to

`dd.trace.health.metrics.statsd.port`
: **Environment Variable**: `DD_TRACE_HEALTH_METRICS_STATSD_PORT`<br>
**Default**: Same as `dd.jmxfetch.statsd.port` <br>
Statsd port to send health metrics to

`dd.trace.obfuscation.query.string.regexp`
: **Environment Variable**: `DD_TRACE_OBFUSCATION_QUERY_STRING_REGEXP`<br>
**Default**: `null`<br>
A regex to redact sensitive data from incoming requests' query string reported in the `http.url` tag (matches are replaced with <redacted>).

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

`dd.trace.propagation.style.inject`
: **Environment Variable**: `DD_TRACE_PROPAGATION_STYLE_INJECT`<br>
**Default**: `datadog,tracecontext`<br>
A comma-separated list of header formats to include to propagate distributed traces between services.<br>
Available since version 1.9.0

`dd.trace.propagation.style.extract`
: **Environment Variable**: `DD_TRACE_PROPAGATION_STYLE_EXTRACT`<br>
**Default**: `datadog,tracecontext`<br>
A comma-separated list of header formats from which to attempt to extract distributed tracing propagation data. The first format found with complete and valid headers is used to define the trace to continue.<br>
Available since version 1.9.0

`dd.trace.propagation.style`
: **Environment Variable**: `DD_TRACE_PROPAGATION_STYLE`<br>
**Default**: `datadog,tracecontext`<br>
A comma-separated list of header formats from which to attempt to inject and extract distributed tracing propagation data. The first format found with complete and valid headers is used to define the trace to continue. The more specific `dd.trace.propagation.style.inject` and `dd.trace.propagation.style.extract` configuration settings take priority when present.<br>
Available since version 1.9.0

`trace.propagation.extract.first`
: **Environment Variable**: `DD_TRACE_PROPAGATION_EXTRACT_FIRST`<br>
**Default**: `false`<br>
When set to `true`, stop extracting trace context when a valid one is found.

`dd.trace.rate.limit`
: **Environment Variable**: `DD_TRACE_RATE_LIMIT`<br>
**Default**: `100`<br>
Maximum number of spans to sample per second, per process, when `DD_TRACE_SAMPLING_RULES` or `DD_TRACE_SAMPLE_RATE` is set. Otherwise, the Datadog Agent controls rate limiting.

`dd.http.server.tag.query-string`
: **Environment Variable**: `DD_HTTP_SERVER_TAG_QUERY_STRING`<br>
**Default**: `true`<br>
When set to `true` query string parameters and fragment get added to web server spans

`dd.http.server.route-based-naming`
: **Environment Variable**: `DD_HTTP_SERVER_ROUTE_BASED_NAMING`<br>
**Default**: `true`<br>
When set to `false` http framework routes are not used for resource names. _This can change resource names and derived metrics if changed._

`dd.trace.128.bit.traceid.generation.enabled`
: **Environment Variable**: `DD_TRACE_128_BIT_TRACEID_GENERATION_ENABLED`<br>
**Default**: `true`<br>
When `true`, the tracer generates 128 bit Trace IDs, and encodes Trace IDs as 32 lowercase hexadecimal characters with zero padding.

`dd.trace.128.bit.traceid.logging.enabled`
: **Environment Variable**: `DD_TRACE_128_BIT_TRACEID_LOGGING_ENABLED`<br>
**Default**: `false`<br>
When `true`, the tracer will inject 128 bit Trace IDs as 32 lowercase hexadecimal characters with zero padding, and 64 bit Trace IDs as decimal numbers. Otherwise, the tracer always injects Trace IDs as decimal numbers.

`dd.trace.otel.enabled`
: **Environment Variable**: `DD_TRACE_OTEL_ENABLED`<br>
**Default**: `false`<br>
When `true`, OpenTelemetry-based tracing for [custom][16] instrumentation is enabled.

### Logs

`dd.logs.injection`
: **Environment Variable**: `DD_LOGS_INJECTION`<br>
**Default**: `true`<br>
Enabled automatic MDC key injection for Datadog trace and span IDs. See [Advanced Usage][2] for details.<br><br>
**Beta**: Starting in version 1.18.3, if [Agent Remote Configuration][3] is enabled where this service runs, you can set `DD_LOGS_INJECTION` in the [Service Catalog][4] UI.

### Database

`dd.trace.db.client.split-by-instance`
: **Environment Variable**: `DD_TRACE_DB_CLIENT_SPLIT_BY_INSTANCE` <br>
**Default**: `false`<br>
When set to `true` db spans get assigned the instance name as the service name

`dd.trace.db.client.split-by-host`
: **Environment Variable**: `DD_TRACE_DB_CLIENT_SPLIT_BY_HOST` <br>
**Default**: `false`<br>
When set to `true` db spans get assigned the remote database hostname as the service name

### ASM

### Agent

`dd.tags`
: **Environment Variable**: `DD_TAGS`<br>
**Default**: `null`<br>
**Example**: `layer:api,team:intake,key:value`<br>
A list of default tags to be added to every span, profile, and JMX metric. If DD_ENV or DD_VERSION is used, it overrides any env or version tag defined in DD_TAGS. Available for versions 0.50.0+.

`dd.agent.host`
: **Environment Variable**: `DD_AGENT_HOST`<br>
**Default**: `localhost`<br>
Hostname for where to send traces to. If using a containerized environment, configure this to be the host IP. See [Tracing Docker Applications][5] for more details.

`dd.trace.enabled`
: **Environment Variable**: `DD_TRACE_ENABLED`<br>
**Default**: `true`<br>
When `false` tracing agent is disabled.

`dd.instrumentation.telemetry.enabled`
: **Environment Variable**: `DD_INSTRUMENTATION_TELEMETRY_ENABLED`<br>
**Default**: `true`<br>
When `true`, the tracer collects [telemetry data][8]. Available for versions 0.104+. Defaults to `true` for versions 0.115+.

### JMX metrics

`dd.jmxfetch.enabled`
: **Environment Variable**: `DD_JMXFETCH_ENABLED`<br>
**Default**: `true`<br>
Enable collection of JMX metrics by Java Tracing Agent.

`dd.jmxfetch.config.dir`
: **Environment Variable**: `DD_JMXFETCH_CONFIG_DIR`<br>
**Default**: `null`<br>
**Example**: `/path/to/directory/etc/conf.d`<br>
Additional configuration directory for JMX metrics collection. The Java Agent looks for `jvm_direct:true` in the `instance` section in the `yaml` file to change configuration.

`dd.jmxfetch.config`
: **Environment Variable**: `DD_JMXFETCH_CONFIG`<br>
**Default**: `null`<br>
**Example**: `path/to/file/conf.yaml,other/path/to/file/conf.yaml`<br>
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

`dd.jmxfetch.<integration-name>.enabled`
: **Environment Variable**: `DD_JMXFETCH_<INTEGRATION_NAME>_ENABLED`<br>
**Default**: `false`<br>
JMX integration to enable (for example, Kafka or ActiveMQ).

### Integrations

See how to disable integrations in the [integrations][13] compatibility section.

`dd.integration.opentracing.enabled`
: **Environment Variable**: `DD_INTEGRATION_OPENTRACING_ENABLED`<br>
**Default**: `true`<br>
By default the tracing client detects if a GlobalTracer is being loaded and dynamically registers a tracer into it. By turning this to false, this removes any tracer dependency on OpenTracing.

`dd.hystrix.tags.enabled`
: **Environment Variable**: `DD_HYSTRIX_TAGS_ENABLED`<br>
**Default**: `false`<br>
By default the Hystrix group, command, and circuit state tags are not enabled. This property enables them.

`dd.trace.elasticsearch.body.enabled`
: **Environment Variable**: `DD_TRACE_ELASTICSEARCH_BODY_ENABLED` <br>
**Default**: `false`<br>
When set to `true`, the body is added to Elasticsearch and OpenSearch spans.

`dd.trace.elasticsearch.params.enabled`
: **Environment Variable**: `DD_TRACE_ELASTICSEARCH_PARAMS_ENABLED` <br>
**Default**: `true`<br>
When set to `true`, the query string parameters are added to Elasticsearch and OpenSearch spans.

**Note**:

- If the same key type is set for both, the system property configuration takes priority.
- System properties can be used as JVM parameters.
- By default, JMX metrics from your application are sent to the Datadog Agent thanks to DogStatsD over port `8125`. Make sure that [DogStatsD is enabled for the Agent][9].

  - If you are running the Agent as a container, ensure that `DD_DOGSTATSD_NON_LOCAL_TRAFFIC` [is set to `true`][10], and that port `8125` is open on the Agent container.
  - In Kubernetes, [bind the DogStatsD port to a host port][11]; in ECS, [set the appropriate flags in your task definition][12].

### Examples

#### `dd.service.mapping`

**Example with system property**:

```shell
java -javaagent:/path/to/dd-java-agent.jar -Ddd.service=web-app -Ddd.service.mapping=postgresql:web-app-pg -jar path/to/application.jar
```

{{< img src="tracing/setup/java/service_mapping.png" alt="service mapping" >}}

#### `dd.tags`

**Setting a global env for spans and JMX metrics**:

```shell
java -javaagent:/path/to/dd-java-agent.jar -Ddd.service=web-app -Ddd.env=dev -jar path/to/application.jar
```

{{< img src="tracing/setup/java/trace_global_tags.png" alt="trace global tags" >}}

#### `dd.trace.span.tags`

**Example with adding project:test to every span**:

```shell
java -javaagent:/path/to/dd-java-agent.jar -Ddd.service=web-app -Ddd.env=dev -Ddd.trace.span.tags=project:test -jar path/to/application.jar
```

{{< img src="tracing/setup/java/trace_span_tags.png" alt="trace span tags" >}}

#### `dd.trace.jmx.tags`

**Setting custom.type:2 on a JMX metric**:

```shell
java -javaagent:/path/to/dd-java-agent.jar -Ddd.service=web-app -Ddd.env=dev -Ddd.trace.span.tags=project:test -Ddd.trace.jmx.tags=custom.type:2 -jar path/to/application.jar
```

{{< img src="tracing/setup/java/trace_jmx_tags.png" alt="trace JMX tags" >}}

#### `dd.trace.methods`

**Example with system property**:

```shell
java -javaagent:/path/to/dd-java-agent.jar -Ddd.service=web-app -Ddd.env=dev -Ddd.trace.methods="hello.GreetingController[doSomeStuff,doSomeOtherStuff];hello.Randomizer[randomize]" -jar path/to/application.jar
```

{{< img src="tracing/setup/java/trace_methods.png" alt="trace methods" >}}

#### `dd.trace.db.client.split-by-instance`

Example with system property:

```shell
java -javaagent:/path/to/dd-java-agent.jar -Ddd.env=dev -Ddd.service=web-app -Ddd.trace.db.client.split-by-instance=TRUE -jar path/to/application.jar
```

DB Instance 1, `webappdb`, now gets its own service name that is the same as the `db.instance` span metadata:

{{< img src="tracing/setup/java/split_by_instance_1.png" alt="instance 1" >}}

DB Instance 2, `secondwebappdb`, now gets its own service name that is the same as the `db.instance` span metadata:

{{< img src="tracing/setup/java/split_by_instance_2.png" alt="instance 2" >}}

Similarly on the service map, you would now see one web app making calls to two different Postgres databases.

#### `dd.http.server.tag.query-string`

Example with system property:

```shell
java -javaagent:/path/to/dd-java-agent.jar -Ddd.service=web-app -Ddd.env=dev -Ddd.http.server.tag.query-string=TRUE -jar path/to/application.jar
```

{{< img src="tracing/setup/java/query_string.png" alt="query string" >}}

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

{{< img src="tracing/setup/java/jmxfetch_example.png" alt="JMX fetch example" >}}

See the [Java integration documentation][14] to learn more about Java metrics collection with JMX fetch.
### Headers extraction and injection

For information about valid values and using the following configuration options, see [Propagating Java Trace Context][15].



#### Deprecated extraction and injection settings

These extraction and injection settings have been deprecated in favor of the `dd.trace.propagation.style.inject`, `dd.trace.propagation.style.extract`, and `dd.trace.propagation.style` settings since version 1.9.0. See [Propagating Java Trace Context][15]. The previous `b3` setting for both B3 multi header and B3 single header has been replaced with the new settings `b3multi` and `b3single`.

`dd.propagation.style.inject`
: **Environment Variable**: `DD_PROPAGATION_STYLE_INJECT`<br>
**Default**: `datadog`<br>
A comma-separated list of header formats to include to propagate distributed traces between services.<br>
Deprecated since version 1.9.0

`dd.propagation.style.extract`
: **Environment Variable**: `DD_PROPAGATION_STYLE_EXTRACT`<br>
**Default**: `datadog`<br>
A comma-separated list of header formats from which to attempt to extract distributed tracing propagation data. The first format found with complete and valid headers is used to define the trace to continue.<br>
Deprecated since version 1.9.0

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /getting_started/tagging/unified_service_tagging/
[2]: /agent/logs/advanced_log_collection
[3]: /agent/remote_config/
[4]: https://app.datadoghq.com/services
[5]: /tracing/setup/docker/
[6]: /agent/configuration/network/#configure-ports
[7]: https://github.com/DataDog/dd-trace-java/blob/master/dd-java-agent/instrumentation/trace-annotation/src/main/java/datadog/trace/instrumentation/trace_annotation/TraceAnnotationsInstrumentation.java#L37
[8]: /tracing/configure_data_security/#telemetry-collection
[9]: /developers/dogstatsd/#setup
[10]: /agent/docker/#dogstatsd-custom-metrics
[11]: /developers/dogstatsd/
[12]: /agent/amazon_ecs/#create-an-ecs-task
[13]: /tracing/compatibility_requirements/java#disabling-integrations
[14]: /integrations/java/?tab=host#metric-collection
[15]: /tracing/trace_collection/trace_context_propagation/java/
[16]: /tracing/trace_collection/custom_instrumentation/java/otel/
