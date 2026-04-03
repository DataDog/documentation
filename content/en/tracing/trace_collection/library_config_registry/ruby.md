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

For additional configuration options beyond the environment variables listed below, see [Additional Ruby configuration][2].

## Configurations keys

The previous version of this configuration documentation is still available at [Configuring the Ruby Tracing Library (legacy)][4].

{{< partial name="apm/registry-config-list.html" >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /getting_started/tagging/unified_service_tagging/
[2]: /tracing/trace_collection/dd_libraries/ruby/#additional-configuration
[3]: /opentelemetry/interoperability/environment_variable_support
[4]: /tracing/trace_collection/library_config/ruby/

