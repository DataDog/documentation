---
title: Configuring the Node.js Tracing Library
code_lang: nodejs
type: multi-code-lang
code_lang_weight: 30
further_reading:
    - link: 'https://github.com/DataDog/dd-trace-js'
      tag: "Source Code"
      text: 'Source code'
    - link: 'https://datadog.github.io/dd-trace-js'
      tag: 'Documentation'
      text: 'API documentation'
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

It is recommended that you use `DD_ENV`, `DD_SERVICE`, and `DD_VERSION` to set `env`, `service`, and `version` for your services. Review the [Unified Service Tagging][1] documentation for recommendations on configuring these environment variables.

For more examples of how to work with the library see [API documentation][2].

## Configurations keys

The previous version of this configuration documentation is still available at [Configuring the Node.js Tracing Library (legacy)][17].

{{< partial name="apm/registry-config-list.html" >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /getting_started/tagging/unified_service_tagging/
[2]: https://datadog.github.io/dd-trace-js/
[3]: /tracing/trace_pipeline/ingestion_mechanisms/
[4]: /help/
[5]: /tracing/trace_collection/trace_context_propagation/
[6]: /tracing/guide/aws_payload_tagging/?code-lang=nodejs
[13]: /agent/configuration/network/#configure-ports
[14]: /opentelemetry/interoperability/environment_variable_support
[15]: /tracing/trace_collection/custom_instrumentation/nodejs/otel/
[16]: /tracing/trace_collection/library_config/#traces
[17]: /tracing/trace_collection/library_config/nodejs/
