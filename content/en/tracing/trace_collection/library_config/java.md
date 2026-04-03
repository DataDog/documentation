---
title: Configuring the Java Tracing Library
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
    - link: "/tracing/trace_collection/trace_context_propagation/"
      tag: "Documentation"
      text: "Propagating trace context with headers"
    - link: "/opentelemetry/interoperability/environment_variable_support"
      tag: "Documentation"
      text: "OpenTelemetry Environment Variable Configurations"
---

After you set up the tracing library with your code and configure the Agent to collect APM data, optionally configure the tracing library as desired, including setting up [Unified Service Tagging][1].

{{% apm-config-visibility %}}

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

## Configurations keys

The previous version of this configuration documentation is still available at [Configuring the Java Tracing Library (legacy)][24].

{{< partial name="apm/registry-config-list.html" >}}

**Note**:

- If the same key type is set for both, the system property configuration takes priority.
- System properties can be used as JVM parameters.
- By default, JMX metrics from your application are sent to the Datadog Agent thanks to DogStatsD over port `8125`. Make sure that [DogStatsD is enabled for the Agent][9].

  - If you are running the Agent as a container, ensure that `DD_DOGSTATSD_NON_LOCAL_TRAFFIC` [is set to `true`][10], and that port `8125` is open on the Agent container.
  - In Kubernetes, [bind the DogStatsD port to a host port][11]; in ECS, [set the appropriate flags in your task definition][12].

### Examples

#### `dd.service.mapping`

Example with system property:

```shell
java -javaagent:/path/to/dd-java-agent.jar -Ddd.service=web-app -Ddd.service.mapping=postgresql:web-app-pg -jar path/to/application.jar
```

{{< img src="tracing/setup/java/service_mapping.png" alt="service mapping" >}}

#### `dd.tags`
Setting a global env for spans and JMX metrics:

```shell
java -javaagent:/path/to/dd-java-agent.jar -Ddd.service=web-app -Ddd.env=dev -jar path/to/application.jar
```

{{< img src="tracing/setup/java/trace_global_tags.png" alt="trace global tags" >}}

#### `dd.trace.span.tags`

Example with adding project:test to every span:

```shell
java -javaagent:/path/to/dd-java-agent.jar -Ddd.service=web-app -Ddd.env=dev -Ddd.trace.span.tags=project:test -jar path/to/application.jar
```

{{< img src="tracing/setup/java/trace_span_tags.png" alt="trace span tags" >}}

#### `dd.trace.jmx.tags`

Setting custom.type:2 on a JMX metric:

```shell
java -javaagent:/path/to/dd-java-agent.jar -Ddd.service=web-app -Ddd.env=dev -Ddd.trace.span.tags=project:test -Ddd.trace.jmx.tags=custom.type:2 -jar path/to/application.jar
```

{{< img src="tracing/setup/java/trace_jmx_tags.png" alt="trace JMX tags" >}}

#### `dd.trace.methods`

Example with system property:

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

Example with system property and debug app mode:

```shell
java -javaagent:/path/to/dd-java-agent.jar -Ddd.trace.enabled=false -Ddd.trace.debug=true -jar path/to/application.jar
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

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /getting_started/tagging/unified_service_tagging/
[2]: /agent/logs/advanced_log_collection
[3]: /tracing/guide/remote_config
[4]: https://app.datadoghq.com/services
[5]: /tracing/setup/docker/
[6]: /agent/configuration/network/#configure-ports
[7]: https://github.com/DataDog/dd-trace-java/blob/master/dd-java-agent/instrumentation/trace-annotation/src/main/java/datadog/trace/instrumentation/trace_annotation/TraceAnnotationsInstrumentation.java#L37
[8]: /tracing/configure_data_security/#telemetry-collection
[9]: /extend/dogstatsd/#setup
[10]: /agent/docker/#dogstatsd-custom-metrics
[11]: /extend/dogstatsd/
[12]: /agent/amazon_ecs/#create-an-ecs-task
[13]: /tracing/compatibility_requirements/java#disabling-integrations
[14]: /integrations/java/?tab=host#metric-collection
[15]: /tracing/trace_collection/trace_context_propagation/
[16]: /tracing/trace_collection/custom_instrumentation/java/otel/
[17]: /opentelemetry/interoperability/environment_variable_support
[18]: /tracing/guide/aws_payload_tagging/?code-lang=java
[19]: /security/application_security/setup/threat_detection/java/
[20]: https://ant.apache.org/manual/dirtasks.html#patterns
[21]: /tracing/trace_collection/library_config_legacy/#traces
[22]: /profiler/
[23]: /database_monitoring/connect_dbm_and_apm/?tab=java
[24]: /tracing/trace_collection/library_config_legacy/java/
