---
title: Configuring the C++ Tracing Library
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
- link: "/tracing/trace_collection/trace_context_propagation/cpp/"
  tag: "Documentation"
  text: "Propagating trace context"
---

After you set up the tracing library with your code and configure the Agent to collect APM data, optionally configure the tracing library as desired, including setting up [Unified Service Tagging][1].

It is recommended to use `DD_SERVICE`, `DD_ENV`, and `DD_VERSION` to set `env`, `service` and `version` for your services. Refer to the [Unified Service Tagging][1] docummentation recommendations on which value to set for environment variables.

## Environment variables
To configure the tracer using environment variables, set the variables before launching the instrumented application.

`DD_SERVICE`
: **Since**: v0.1.0 <br>
Sets the service name.

`DD_ENV`
: **Since**: v0.1.0 <br>
**Example**: `prod`, `pre-prod`, or `staging` <br>
Adds the `env` tag with the specified value to all generated spans.

`DD_VERSION`
: **Since**: v0.1.0 <br>
**Example**: `1.2.3`, `6c44da20`, `2020.02.13` <br>
Sets the version of the service.

`DD_TAGS`
: **Since**: v0.1.0 <br>
**Example**: `team:intake,layer:api,foo:bar` <br>
A comma separated list of `key:value` pairs to be added to all generated spans.

`DD_AGENT_HOST`
: **Since**: v0.1.0 <br>
**Default**: `localhost` <br>
Sets the host where traces are sent (the host running the Agent). Can be a hostname or an IP address. Ignored if `DD_TRACE_AGENT_URL` is set.

`DD_TRACE_AGENT_PORT`
: **Since**: v0.1.0 <br>
**Default**: `8126` <br>
Sets the port where traces are sent (the port where the Agent is listening for connections). Ignored if `DD_TRACE_AGENT_URL` is set. If the [Agent configuration][3] sets `receiver_port` or `DD_APM_RECEIVER_PORT` to something other than the default `8126`, then `DD_TRACE_AGENT_PORT` or `DD_TRACE_AGENT_URL` must match it.

`DD_TRACE_AGENT_URL`
: **Since**: v0.1.0 <br>
**Default**: `http://<DD_AGENT_HOST>:<DD_TRACE_AGENT_PORT>` if they are set, or `http://localhost:8126`.
**Examples**: <br>
HTTP URL: `http://localhost:8126` <br>
Unix Domain Socket: `unix:///var/run/datadog/apm.socket` <br><br>
Sets the URL endpoint where traces are sent. Overrides `DD_AGENT_HOST` and `DD_TRACE_AGENT_PORT` if set. This URL supports HTTP, HTTPS, and Unix address schemes. <br>
If the [Agent configuration][3] sets `receiver_port` or `DD_APM_RECEIVER_PORT` to something other than the default `8126`, then `DD_TRACE_AGENT_PORT` or `DD_TRACE_AGENT_URL` must match it.

`DD_TRACE_RATE_LIMIT`
: **Since**: 0.1.0 <br>
**Default**: `200` <br>
Maximum number of traces allowed to be submitted per second.

`DD_TRACE_SAMPLE_RATE`
: **Since**: 0.1.0 <br>
**Default**: The Datadog Agent default rate or `1.0`. <br>
Sets the sampling rate for all generated traces. The value must be between `0.0` and `1.0` (inclusive). By default, the sampling rate is delegated to the Datadog Agent. If no sampling rate is set by the Datadog Agent, then the default is `1.0`.

`DD_TRACE_SAMPLING_RULES`
: **Since**: v0.1.0 <br>
**Default**: `null` <br>
**Examples:**<br>
Set the sample rate to 20%: `[{"sample_rate": 0.2}]` <br>
Set the span sample rate to 50% for the service `my-service` and operation name `http.request`, up to 50 traces per second: `'[{"service": "my-service", "name": "http.request", "sample_rate":0.5, "max_per_second": 50}]'` <br><br>
A JSON array of objects. Each object must have a `sample_rate`, and the `name` and `service` fields are optional. The `sample_rate` value must be between 0.0 and 1.0 (inclusive). Rules are applied in configured order to determine the trace's sample rate. <br>
For more information, see [Ingestion Mechanisms][2].<br>

`DD_SPAN_SAMPLING_RULES`
: **Version**: v0.1.0 <br>
**Default**: `null`<br>
A JSON array of objects. Rules are applied in configured order to determine the span's sample rate. The `sample_rate` value must be between `0.0` and `1.0` (inclusive).

`DD_SPAN_SAMPLING_RULES_FILE`
: **Since**: 0.1.0 <br>
Points to a JSON file that contains the span sampling rules. See `DD_SPAN_SAMPLING_RULES` for the rule format.

`DD_PROPAGATION_STYLE`
: **Since**: 0.1.0 <br>
Comma separated list of propagation styles to use when extracting and injecting tracing context. <br>
When multiple values are given, the order of matching is based on the order of values.

`DD_TRACE_PROPAGATION_STYLE_INJECT`
: **Since**: v0.1.6 <br>
**Default**: `datadog,tracecontext` <br>
**Accepted values**: `datadog`, `tracecontext`, `b3` <br>
Comma separated list of propagation styles to use when injecting tracing context.
When multiple values are given, the order of matching is based on the order of values.

`DD_TRACE_PROPAGATION_STYLE_EXTRACT`
: **Since**: v0.1.6 <br>
**Default**: `datadog,tracecontext` <br>
**Accepted values**: `datadog`, `tracecontext`, `b3` <br>
Comma separated list of propagation styles to use when extracting tracing context.
When multiple values are given, the order of matching is based on the order of values.

`DD_TRACE_ENABLED`
: **Since**: 0.1.0 <br>
**Default**: `true` <br>
Submit or not traces to the Datadog Agent. <br>
When `false`, the library stop sending traces to the Datadog Agent. However, the library continues to generate traces, report telemetry and poll for remote configuration updates.

`DD_TRACE_REPORT_HOSTNAME`
: **Since**: 0.1.0 <br>
**Default**: `false` <br>
Adds the `hostname` tag with the result of `gethostname`.

`DD_TRACE_STARTUP_LOGS`
: **Since**: 0.1.0 <br>
**Default**: `true` <br>
Log the tracer configuration once the tracer is fully initialized. <br>

`DD_TRACE_128_BIT_TRACEID_GENERATION_ENABLED`
: **Since**: 0.1.6 <br>
**Default**: `true` <br>
If `true`, the tracer will generate 128-bit trace IDs. <br>
If `false`, the tracer will generate legacy 64-bit trace IDs.

`DD_INSTRUMENTATION_TELEMETRY_ENABLED`
: **Since**: 0.1.12 <br>
**Default**: `true` <br>
Datadog may collect [environmental and diagnostic information about your system][4] to improve the product. When `false`, telemetry data are not collected.

`DD_REMOTE_CONFIGURATION_ENABLED`
: **Since**: 0.2.0 <br>
**Default**: `true` <br>
Enable the capability that allows to remotely configure and change the behavior of the tracer. <br>
When `false` this feature is disabled. <br>
For more information, see [Remote Configuration][5].

`DD_REMOTE_CONFIG_POLL_INTERVAL_SECONDS`
: **Since**: 0.2.0 <br>
**Default**: `5.0` <br>
Sets how often, in seconds, the Datadog Agent is queried for Remote Configuration updates.

`DD_TRACE_DELEGATE_SAMPLING`
: **Version**: 0.2.0 <br>
**Default**: `false` <br>
If `true`, delegate trace sampling decision to a child service and prefer the resulting decision over its own, if appropriate.


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /getting_started/tagging/unified_service_tagging/
[2]: /tracing/trace_pipeline/ingestion_mechanisms/
[3]: /agent/configuration/network/#configure-ports
[4]: /tracing/configure_data_security#telemetry-collection
[5]: /agent/remote_config
