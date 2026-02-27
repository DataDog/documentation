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

Tracer settings can be configured with the following environment variables:

<!-- FEATURE_PARITY_AUTOGEN_START -->
{{% collapse-content title="Application Security" level="h4" expanded=false id="feature-parity-nodejs-application_security" %}}
{{< include-markdown "tracing/trace_collection/library_config/nodejs/application_security" >}}
{{% /collapse-content %}}

{{% collapse-content title="Continuous Integration Visibility" level="h4" expanded=false id="feature-parity-nodejs-tests" %}}
{{< include-markdown "tracing/trace_collection/library_config/nodejs/tests" >}}
{{% /collapse-content %}}

{{% collapse-content title="Data Streams" level="h4" expanded=false id="feature-parity-nodejs-data_streams" %}}
{{< include-markdown "tracing/trace_collection/library_config/nodejs/data_streams" >}}
{{% /collapse-content %}}

{{% collapse-content title="Dynamic Instrumentation" level="h4" expanded=false id="feature-parity-nodejs-dynamic_instrumentation" %}}
{{< include-markdown "tracing/trace_collection/library_config/nodejs/dynamic_instrumentation" >}}
{{% /collapse-content %}}

{{% collapse-content title="Profiler" level="h4" expanded=false id="feature-parity-nodejs-profiler" %}}
{{< include-markdown "tracing/trace_collection/library_config/nodejs/profiler" >}}
{{% /collapse-content %}}

{{% collapse-content title="Runtime Metrics" level="h4" expanded=false id="feature-parity-nodejs-runtime_metrics" %}}
{{< include-markdown "tracing/trace_collection/library_config/nodejs/runtime_metrics" >}}
{{% /collapse-content %}}

{{% collapse-content title="Tracing" level="h4" expanded=false id="feature-parity-nodejs-tracing" %}}
{{< include-markdown "tracing/trace_collection/library_config/nodejs/tracing" >}}
{{% /collapse-content %}}

{{% collapse-content title="OpenTelemetry" level="h4" expanded=false id="feature-parity-nodejs-opentelemetry" %}}
{{< include-markdown "tracing/trace_collection/library_config/nodejs/opentelemetry" >}}
{{% /collapse-content %}}

{{% collapse-content title="Other" level="h4" expanded=false id="feature-parity-nodejs-other" %}}
{{< include-markdown "tracing/trace_collection/library_config/nodejs/other" >}}
{{% /collapse-content %}}
<!-- FEATURE_PARITY_AUTOGEN_END -->

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
