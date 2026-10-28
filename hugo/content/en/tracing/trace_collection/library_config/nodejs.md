---
title: Configuring the Node.js SDK
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

After you set up the SDK with your code and configure the Agent to collect APM data, optionally configure the SDK as desired, including setting up [Unified Service Tagging][1].

{{% apm-config-visibility %}}

It is recommended that you use `DD_ENV`, `DD_SERVICE`, and `DD_VERSION` to set `env`, `service`, and `version` for your services. Review the [Unified Service Tagging][1] documentation for recommendations on configuring these environment variables.

For more examples of how to work with the library see [API documentation][2].

## Agentless mode

Starting with `dd-trace` v5.125.0 and v6.14.0, you can send data directly to Datadog without a Datadog Agent. To enable agentless mode, set `DD_AGENTLESS_ENABLED` to `true`, set `DD_API_KEY` to a Datadog [API key][7], and set `DD_SITE` to your [Datadog site][8]:

```shell
export DD_AGENTLESS_ENABLED=true
export DD_API_KEY=<YOUR_API_KEY>
export DD_SITE={{< region-param key="dd_site" >}}
```

If `DD_AGENTLESS_ENABLED` is `true` and `DD_API_KEY` is not set, the SDK logs an error and does not send traces, Remote Configuration requests, or Dynamic Instrumentation data.

In agentless mode, the SDK sends the following data directly to Datadog:

- Traces
- Instrumentation telemetry
- [Remote Configuration][9]
- [Dynamic Instrumentation][10]
- Crash reports
- Logs from Bunyan, Pino, and Winston
- OpenTelemetry metrics and logs (v5.127.0 and v6.16.0 and later)
- [Test Optimization][11]
- [LLM Observability][12]
- [Feature Flags][16] configuration

The following features require an Agent and are disabled in agentless mode:

- [Runtime metrics][17]
- [Data Streams Monitoring][18]
- DogStatsD custom metrics
- [Profiling][19], unless `DD_PROFILING_EXPORTERS` includes an exporter other than `agent`

Agentless mode also changes the following behavior:

- Traces are always sent to the Datadog intake, and `OTEL_TRACES_EXPORTER` is ignored.
- `DD_TRACE_SAMPLING_RULES` and `DD_TRACE_RATE_LIMIT` are ignored. `DD_TRACE_SAMPLE_RATE` still applies.
- To stop sending logs directly, set `DD_AGENTLESS_LOG_SUBMISSION_ENABLED` to `false`. To use the OpenTelemetry log exporter instead, set `DD_LOGS_OTEL_ENABLED` to `true`.
- To send OpenTelemetry data to your own collector, set `OTEL_EXPORTER_OTLP_ENDPOINT` or a signal-specific endpoint variable.

## Configuration keys

{{< partial name="apm/registry-config-list.html" >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /getting_started/tagging/unified_service_tagging/
[2]: https://datadog.github.io/dd-trace-js/
[3]: /tracing/trace_pipeline/ingestion_mechanisms/
[4]: /help/
[5]: /tracing/trace_collection/trace_context_propagation/
[6]: /tracing/guide/aws_payload_tagging/?code-lang=nodejs
[7]: /account_management/api-app-keys/#api-keys
[8]: /getting_started/site/
[9]: /remote_configuration/
[10]: /tracing/trace_collection/dynamic_instrumentation/
[11]: /tests/
[12]: /llm_observability/
[13]: /agent/configuration/network/#configure-ports
[14]: /opentelemetry/interoperability/environment_variable_support
[15]: /tracing/trace_collection/custom_instrumentation/nodejs/otel/
[16]: /feature_flags/
[17]: /tracing/metrics/runtime_metrics/
[18]: /data_streams/
[19]: /profiler/
