---
title: Configuring the Ruby Tracing Library
code_lang: ruby
type: multi-code-lang
code_lang_weight: 30
further_reading:
- link: "https://github.com/DataDog/dd-trace-rb/"
  tag: "Source Code"
  text: "Source code"
- link: "/tracing/trace_collection/trace_context_propagation/ruby/"
  tag: "Documentation"
  text: "Propagating trace context"
- link: "/opentelemetry/interoperability/environment_variable_support"
  tag: "Documentation"
  text: "OTEL Environment Variable Configurations"
---

After you set up the tracing library with your code and configure the Agent to collect APM data, optionally configure the tracing library as desired, including setting up [Unified Service Tagging][1].

For information about configuring the Ruby tracing library, see [Additional Ruby configuration][2].
## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /getting_started/tagging/unified_service_tagging/
[2]: /tracing/trace_collection/dd_libraries/ruby/#advanced-configuration
[3]: /opentelemetry/interoperability/environment_variable_support
