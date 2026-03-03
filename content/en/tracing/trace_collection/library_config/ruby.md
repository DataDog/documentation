---
title: Configuring the Ruby Tracing Library
code_lang: ruby
type: multi-code-lang
code_lang_weight: 30
further_reading:
- link: "https://github.com/DataDog/dd-trace-rb/"
  tag: "Source Code"
  text: "Source code"
- link: "/tracing/trace_collection/trace_context_propagation/"
  tag: "Documentation"
  text: "Propagating trace context"
- link: "/opentelemetry/interoperability/environment_variable_support"
  tag: "Documentation"
  text: "OpenTelemetry Environment Variable Configurations"
---

After you set up the tracing library with your code and configure the Agent to collect APM data, optionally configure the tracing library as desired, including setting up [Unified Service Tagging][1].

{{% apm-config-visibility %}}

For information about configuring the Ruby tracing library, see [Additional Ruby configuration][2].

<!-- FEATURE_PARITY_AUTOGEN_START -->
{{% collapse-content title="Application Security" level="h4" expanded=false id="feature-parity-ruby-application_security" %}}
{{< include-markdown "tracing/trace_collection/library_config/ruby/application_security" >}}
{{% /collapse-content %}}

{{% collapse-content title="Continuous Integration Visibility" level="h4" expanded=false id="feature-parity-ruby-tests" %}}
{{< include-markdown "tracing/trace_collection/library_config/ruby/tests" >}}
{{% /collapse-content %}}

{{% collapse-content title="Data Streams" level="h4" expanded=false id="feature-parity-ruby-data_streams" %}}
{{< include-markdown "tracing/trace_collection/library_config/ruby/data_streams" >}}
{{% /collapse-content %}}

{{% collapse-content title="Dynamic Instrumentation" level="h4" expanded=false id="feature-parity-ruby-dynamic_instrumentation" %}}
{{< include-markdown "tracing/trace_collection/library_config/ruby/dynamic_instrumentation" >}}
{{% /collapse-content %}}

{{% collapse-content title="Profiler" level="h4" expanded=false id="feature-parity-ruby-profiler" %}}
{{< include-markdown "tracing/trace_collection/library_config/ruby/profiler" >}}
{{% /collapse-content %}}

{{% collapse-content title="Runtime Metrics" level="h4" expanded=false id="feature-parity-ruby-runtime_metrics" %}}
{{< include-markdown "tracing/trace_collection/library_config/ruby/runtime_metrics" >}}
{{% /collapse-content %}}

{{% collapse-content title="Tracing" level="h4" expanded=false id="feature-parity-ruby-tracing" %}}
{{< include-markdown "tracing/trace_collection/library_config/ruby/tracing" >}}
{{% /collapse-content %}}

{{% collapse-content title="OpenTelemetry" level="h4" expanded=false id="feature-parity-ruby-opentelemetry" %}}
{{< include-markdown "tracing/trace_collection/library_config/ruby/opentelemetry" >}}
{{% /collapse-content %}}

{{% collapse-content title="Other" level="h4" expanded=false id="feature-parity-ruby-other" %}}
{{< include-markdown "tracing/trace_collection/library_config/ruby/other" >}}
{{% /collapse-content %}}
<!-- FEATURE_PARITY_AUTOGEN_END -->

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /getting_started/tagging/unified_service_tagging/
[2]: /tracing/trace_collection/dd_libraries/ruby/#additional-configuration
[3]: /opentelemetry/interoperability/environment_variable_support

