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

## Configuration options

### Traces

`dd.trace.client-ip.enabled`
: **Default**: `false` <br>
Enable client IP collection from relevant IP headers in HTTP request spans. Automatically enabled when `dd.appsec.enabled=true`.

`datadog.slf4j.simpleLogger.jsonEnabled`
: **Environment Variable**: Not available<br>
**Default**: `false`<br>
When `true`, Datadog Java tracer logs are written in JSON. Available for versions 1.48.0+.<br>
**Note**: This setting is specific to the embedded SLF4J simple logger and does not support environment variables. `dd.log.format.json` is the preferred configuration option.

### JMX metrics

`dd.jmxfetch.<integration-name>.enabled`
: **Environment Variable**: `DD_JMXFETCH_<INTEGRATION_NAME>_ENABLED`<br>
**Default**: `false`<br>
JMX integration to enable (for example, Kafka or ActiveMQ).

<!-- FEATURE_PARITY_AUTOGEN_START -->
{{% collapse-content title="Application Security" level="h4" expanded=false id="feature-parity-java-application_security" %}}
{{< include-markdown "tracing/trace_collection/library_config/java/application_security" >}}
{{% /collapse-content %}}

{{% collapse-content title="Continuous Integration Visibility" level="h4" expanded=false id="feature-parity-java-tests" %}}
{{< include-markdown "tracing/trace_collection/library_config/java/tests" >}}
{{% /collapse-content %}}

{{% collapse-content title="Data Streams" level="h4" expanded=false id="feature-parity-java-data_streams" %}}
{{< include-markdown "tracing/trace_collection/library_config/java/data_streams" >}}
{{% /collapse-content %}}

{{% collapse-content title="Dynamic Instrumentation" level="h4" expanded=false id="feature-parity-java-dynamic_instrumentation" %}}
{{< include-markdown "tracing/trace_collection/library_config/java/dynamic_instrumentation" >}}
{{% /collapse-content %}}

{{% collapse-content title="Profiler" level="h4" expanded=false id="feature-parity-java-profiler" %}}
{{< include-markdown "tracing/trace_collection/library_config/java/profiler" >}}
{{% /collapse-content %}}

{{% collapse-content title="Runtime Metrics" level="h4" expanded=false id="feature-parity-java-runtime_metrics" %}}
{{< include-markdown "tracing/trace_collection/library_config/java/runtime_metrics" >}}
{{% /collapse-content %}}

{{% collapse-content title="Tracing" level="h4" expanded=false id="feature-parity-java-tracing" %}}
{{< include-markdown "tracing/trace_collection/library_config/java/tracing" >}}
{{% /collapse-content %}}

{{% collapse-content title="OpenTelemetry" level="h4" expanded=false id="feature-parity-java-opentelemetry" %}}
{{< include-markdown "tracing/trace_collection/library_config/java/opentelemetry" >}}
{{% /collapse-content %}}

{{% collapse-content title="Other" level="h4" expanded=false id="feature-parity-java-other" %}}
{{< include-markdown "tracing/trace_collection/library_config/java/other" >}}
{{% /collapse-content %}}
<!-- FEATURE_PARITY_AUTOGEN_END -->

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
[21]: /tracing/trace_collection/library_config/#traces
[22]: /profiler/
[23]: /database_monitoring/connect_dbm_and_apm/?tab=java
