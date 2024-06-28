---
title: Configuring the Python Tracing Library
kind: documentation
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
    - link: "/tracing/trace_collection/trace_context_propagation/python/"
      tag: "Documentation"
      text: "Propagating trace context"
    - link: 'tracing/glossary/'
      tag: 'Documentation'
      text: 'Explore your services, resources and traces'
    - link: 'tracing/'
      tag: 'Documentation'
      text: 'Advanced Usage'
---

After you set up the tracing library with your code and configure the Agent to collect APM data, optionally configure the tracing library as desired, including setting up [Unified Service Tagging][1].

When using **ddtrace-run**, the following [environment variable options][2] can be used:

## Unified service tagging

It is recommended to use `DD_ENV`, `DD_SERVICE`, and `DD_VERSION` to set `env`, `service`, and `version` for your services. Refer to the [Unified Service Tagging][1] documentation for recommendations on how to configure these environment variables.

`DD_ENV`
: Set the application's environment, for example: `prod`, `pre-prod`, `staging`. Learn more about [how to setup your environment][3]. Available in version 0.38+.

`DD_SERVICE`
: The service name to be used for this application. The value is passed through when setting up middleware for web framework integrations like Pylons, Flask, or Django. For tracing without a web integration, it is recommended that you set the service name in code ([for example, see these Django docs][4]). Available in version 0.38+.

`DD_VERSION`
: Set the application's version, for example: `1.2.3`, `6c44da20`, `2020.02.13`. Available in version 0.38+.

## Traces

`DD_TRACE_ENABLED`
: **Default**: `true`<br>
Enable web framework and library instrumentation. When `false`, the application code doesn't generate any traces.

`DD_TRACE_SAMPLE_RATE`
: Enable trace volume control

`DD_TRACE_DEBUG`
: **Default**: `false`<br>
Enable debug logging in the tracer.

`DD_SERVICE_MAPPING`
: Define service name mappings to allow renaming services in traces, for example: `postgres:postgresql,defaultdb:postgresql`. Available in version 0.47+.

`DD_TRACE_RATE_LIMIT`
: Maximum number of spans to sample per-second, per-Python process. Defaults to `100` when `DD_TRACE_SAMPLE_RATE` is set. Otherwise, delegates rate limiting to the Datadog Agent.

`DD_TRACE_HEADER_TAGS`
: **Default**: `null`<br>
Comma-separated list of header names that are reported on the root span as tags. For example, `DD_TRACE_HEADER_TAGS="User-Agent:http.user_agent,Referer:http.referer,Content-Type:http.content_type,Etag:http.etag"`.

`DD_TRACE_AGENT_URL`
: The URL of the Trace Agent that the tracer submits to. If set, this takes priority over hostname and port. Supports Unix Domain Sockets (UDS) in combination with the `apm_config.receiver_socket` configuration in your `datadog.yaml` file or the `DD_APM_RECEIVER_SOCKET` environment variable set on the Datadog Agent. For example, `DD_TRACE_AGENT_URL=http://localhost:8126` for HTTP URL and `DD_TRACE_AGENT_URL=unix:///var/run/datadog/apm.socket` for UDS. If the [Agent configuration][13] sets `receiver_port` or `DD_APM_RECEIVER_PORT` to something other than the default `8126`, then `DD_AGENT_PORT` or `DD_TRACE_AGENT_URL` must match it. 

`DD_TRACE_SAMPLING_RULES`
: **Default**: `[]`<br>
A JSON array of objects. Each object must have a `"sample_rate"`. The `"name"` and `"service"` fields are optional. The `"sample_rate"` value must be between `0.0` and `1.0` (inclusive). Rules are applied in configured order to determine the trace's sample rate.

`DD_SPAN_SAMPLING_RULES`
: **Default**: `[]`<br>
A JSON array of objects. Rules are applied in configured order to determine the span's sample rate. The `sample_rate` value must be between 0.0 and 1.0 (inclusive).
For more information, see [Ingestion Mechanisms][5].<br>
**Example:**<br>
  - Set the span sample rate to 50% for the service `my-service` and operation name `http.request`, up to 50 traces per second: `'[{"service": "my-service", "name": "http.request", "sample_rate":0.5, "max_per_second": 50}]'`

## Agent

`DD_PATCH_MODULES`
: Override the modules patched for this application execution. Follow the format: `DD_PATCH_MODULES=module:patch,module:patch...`

`DD_TAGS`
: A list of default tags to be added to every span and profile, for example: `layer:api,team:intake,key:value`. Available in version 0.38+.

`DD_AGENT_HOST`
: **Default**: `localhost`<br>
Override the address of the trace Agent host that the default tracer attempts to submit traces to.

`DD_AGENT_PORT`
: **Default**: `8126`<br>
Overrides the port that the default tracer submit traces to. If the [Agent configuration][13] sets `receiver_port` or `DD_APM_RECEIVER_PORT` to something other than the default `8126`, then `DD_AGENT_PORT` or `DD_TRACE_AGENT_URL` must match it. 

`DD_DOGSTATSD_URL`
: The URL used to connect to the Datadog Agent for DogStatsD metrics. If set, this takes priority over hostname and port. Supports Unix Domain Sockets (UDS) in combination with the `dogstatsd_socket` configuration in your `datadog.yaml` file or the `DD_DOGSTATSD_SOCKET` environment variable set on the Datadog Agent. For example, `DD_DOGSTATSD_URL=udp://localhost:8126` for UDP URL and `DD_DOGSTATSD_URL=unix:///var/run/datadog/dsd.socket` for UDS. If the [Agent configuration][13] sets `dogstatsd_port` or `DD_DOGSTATSD_PORT` to something other than the default `8125`, then this tracing library `DD_DOGSTATSD_URL` or `DD_DOGSTATSD_PORT` must match it.

`DD_DOGSTATSD_HOST`
: **Default**: `localhost`<br>
Override the address of the trace Agent host that the default tracer attempts to submit DogStatsD metrics to. Use `DD_AGENT_HOST` to override `DD_DOGSTATSD_HOST`.

`DD_DOGSTATSD_PORT`
: **Default**: `8125`<br>
Override the port that the default tracer submits DogStatsD metrics to. If the [Agent configuration][13] sets `dogstatsd_port` or `DD_DOGSTATSD_PORT` to something other than the default `8125`, then this tracing library  `DD_DOGSTATSD_PORT` or `DD_DOGSTATSD_URL` must match it.

## Logs

`DD_LOGS_INJECTION`
: **Default**: `false`<br>
Enable [connecting logs and trace injection][6].

## Trace context propagation

`DD_TRACE_PROPAGATION_STYLE_INJECT`
: **Default**: `tracecontext,Datadog`<br>
Propagation styles to use when injecting tracing headers. For example, use `DD_TRACE_PROPAGATION_STYLE_INJECT=Datadog,B3` to inject both Datadog and B3 format headers.

`DD_TRACE_PROPAGATION_STYLE_EXTRACT`
: **Default**: Value of `DD_TRACE_PROPAGATION_STYLE_INJECT` (`tracecontext,Datadog`)<br>
Propagation styles to use when extracting tracing headers. When multiple values are given, it uses the first header match found. The order of matching is based on the order of values given. For example, `DD_TRACE_PROPAGATION_STYLE_EXTRACT=B3,Datadog` looks for `B3` headers first, and only uses `Datadog` headers if those are not available.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /getting_started/tagging/unified_service_tagging
[2]: https://ddtrace.readthedocs.io/en/stable/advanced_usage.html#ddtracerun
[3]: /tracing/guide/setting_primary_tags_to_scope/
[4]: https://ddtrace.readthedocs.io/en/stable/integrations.html#django
[5]: /tracing/trace_pipeline/ingestion_mechanisms/
[6]: /tracing/other_telemetry/connect_logs_and_traces/python/
[13]: /agent/configuration/network/#configure-ports
