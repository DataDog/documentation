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

This is the new page with registry configurations
-> Backport everything needed from the current one.

## All registry configurations

{{< partial name="apm/registry-config-list.html" >}}

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
