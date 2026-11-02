---
title: Configuring the Python SDK
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

After you set up the SDK with your code and configure the Agent to collect APM data, optionally configure the SDK as desired, including setting up [Unified Service Tagging][1].

{{% apm-config-visibility %}}

## Agentless mode

Starting with `ddtrace` v4.15.0, you can send data directly to Datadog without a Datadog Agent. To enable agentless mode, set the following environment variables:

- `DD_AGENTLESS_ENABLED`: `true`
- `DD_API_KEY`: Your Datadog [API key][3]
- `DD_SITE`: Your [Datadog site][4]

```shell
export DD_AGENTLESS_ENABLED=true
export DD_API_KEY=<YOUR_API_KEY>
export DD_SITE={{< region-param key="dd_site" >}}
```

If `DD_AGENTLESS_ENABLED` is `true` and `DD_API_KEY` is not set, the SDK raises an error at startup.

In agentless mode, the SDK sends the following data directly to Datadog:

- Traces
- [Remote Configuration][5]
- [Dynamic Instrumentation][6]
- [Test Optimization][7]
- [LLM Observability][8]

The following features require an Agent and have no effect in agentless mode:

- [Runtime metrics][9]
- [Profiling][10]
- Tracer flares

`DD_CIVISIBILITY_AGENTLESS_ENABLED` and `DD_LLMOBS_AGENTLESS_ENABLED` default to the value of `DD_AGENTLESS_ENABLED`. Set either one explicitly to override agentless mode for that product.

When using **ddtrace-run**, the following [environment variable options][2] can be used:

## Configuration keys

{{< partial name="apm/registry-config-list.html" >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /getting_started/tagging/unified_service_tagging
[2]: https://ddtrace.readthedocs.io/en/stable/advanced_usage.html#ddtracerun
[3]: /account_management/api-app-keys/#api-keys
[4]: /getting_started/site/
[5]: /remote_configuration/
[6]: /tracing/trace_collection/dynamic_instrumentation/
[7]: /tests/
[8]: /llm_observability/
[9]: /tracing/metrics/runtime_metrics/
[10]: /profiler/
