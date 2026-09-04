---
title: Configuring the C++ SDK
code_lang: cpp
type: multi-code-lang
code_lang_weight: 50
further_reading:
- link: "https://github.com/DataDog/dd-trace-cpp"
  tag: "Source Code"
  text: Source code
- link: "/tracing/glossary/"
  tag: "Documentation"
  text: "Explore your services, resources and traces"
- link: "/tracing/trace_collection/trace_context_propagation/"
  tag: "Documentation"
  text: "Propagating trace context"
---

After you set up the SDK with your code and configure the Agent to collect APM data, optionally configure the SDK as desired, including setting up [Unified Service Tagging][1].

{{% apm-config-visibility %}}

It is recommended to use `DD_SERVICE`, `DD_ENV`, and `DD_VERSION` to set `env`, `service` and `version` for your services. Refer to the [Unified Service Tagging][1] documentation for recommendations on which value to set for environment variables.

To configure the SDK using environment variables, set the variables before launching the instrumented application.

## Configuration keys

{{< partial name="apm/registry-config-list.html" >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /getting_started/tagging/unified_service_tagging/
[2]: /tracing/trace_pipeline/ingestion_mechanisms/
[3]: /agent/configuration/network/#configure-ports
[4]: /tracing/configure_data_security#telemetry-collection
[5]: /remote_configuration
