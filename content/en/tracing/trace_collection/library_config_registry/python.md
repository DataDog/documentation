---
title: Configuring the Python Tracing Library
code_lang: python
type: multi-code-lang
code_lang_weight: 20
further_reading:
    - link: 'https://github.com/DataDog/dd-trace-py'
      tag: "Source Code"
      text: 'Source code'
    - link: 'https://ddtrace.readthedocs.io/en/stable/'
      tag: 'External Site'
      text: 'API Docs'
    - link: "/tracing/trace_collection/trace_context_propagation/"
      tag: "Documentation"
      text: "Propagating trace context"
    - link: 'tracing/glossary/'
      tag: 'Documentation'
      text: 'Explore your services, resources and traces'
    - link: 'tracing/'
      tag: 'Documentation'
      text: 'Advanced Usage'
    - link: "/opentelemetry/interoperability/environment_variable_support"
      tag: "Documentation"
      text: "OpenTelemetry Environment Variable Configurations"
---

After you set up the tracing library with your code and configure the Agent to collect APM data, optionally configure the tracing library as desired, including setting up [Unified Service Tagging][1].

{{% apm-config-visibility %}}

When using **ddtrace-run**, the following [environment variable options][2] can be used.

It is recommended to use `DD_ENV`, `DD_SERVICE`, and `DD_VERSION` to set `env`, `service`, and `version` for your services. Refer to the [Unified Service Tagging][1] documentation for recommendations on how to configure these environment variables.

## Configurations keys

The previous version of this configuration documentation is still available at [Configuring the Python Tracing Library (legacy)][16].

{{< partial name="apm/registry-config-list.html" >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /getting_started/tagging/unified_service_tagging
[2]: https://ddtrace.readthedocs.io/en/stable/advanced_usage.html#ddtracerun
[3]: /tracing/guide/setting_primary_tags_to_scope/
[4]: https://ddtrace.readthedocs.io/en/stable/integrations.html#django
[5]: /tracing/trace_pipeline/ingestion_mechanisms/
[6]: /tracing/other_telemetry/connect_logs_and_traces/python/
[13]: /agent/configuration/network/#configure-ports
[14]: /opentelemetry/interoperability/environment_variable_support
[15]: /tracing/trace_collection/library_config/#traces
[16]: /tracing/trace_collection/library_config/python/
