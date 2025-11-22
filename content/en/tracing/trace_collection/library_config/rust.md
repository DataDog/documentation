---
title: Configuring the Rust Tracing Library
code_lang: rust
type: multi-code-lang
code_lang_weight: 80
further_reading:
    - link: 'https://github.com/DataDog/dd-trace-rs'
      tag: "Source Code"
      text: 'Source code'
    - link: "/tracing/trace_collection/trace_context_propagation/"
      tag: "Documentation"
      text: "Propagating trace context"
    - link: 'tracing/glossary/'
      tag: 'Documentation'
      text: 'Explore your services, resources and traces'
---

After you [set up the Rust SDK][1] with your application, you can optionally configure it using the following environment variables.

## Unified Service Tagging

It is recommended to use `DD_ENV`, `DD_SERVICE`, and `DD_VERSION` to set `env`, `service`, and `version` for your services.

`DD_ENV`
: **Default**: `(none)`<br>
: Set the application's environment, for example: `prod`, `staging`.

`DD_SERVICE`
: **Default**: `unnamed-rust-service`<br>
: Sets the service name for your application.

`DD_VERSION`
: **Default**: `(none)`<br>
: Set the application's version, for example: `1.2.3` or `6c44da20`.

`DD_TAGS`
: **Default**: `(none)`<br>
: A list of default tags to be added to every span, in `key:value` format, separated by commas. Example: `layer:api,team:intake`.

## Traces

`DD_TRACE_ENABLED`
: **Default**: `true`<br>
: Set to `false` to disable tracing.

`DD_TRACE_STATS_COMPUTATION_ENABLED`
: **Default**: `true`<br>
: Enable computation of trace statistics.

`DD_TRACE_X_DATADOG_TAGS_MAX_LENGTH`
: **Default**: `512`<br>
: Maximum length of the `x-datadog-tags` header in bytes.

`DD_TRACE_PARTIAL_FLUSH_ENABLED`
: **Default**: `false`<br>
: Enable partial flushing of traces.

`DD_TRACE_PARTIAL_FLUSH_MIN_SPANS`
: **Default**: `300`<br>
: Minimum number of spans in a trace before partial flush is triggered.

`DD_REMOTE_CONFIGURATION_ENABLED`
: **Default**: `true`<br>
: Enable or disable remote configuration. Also accepts the alias `DD_REMOTE_CONFIG_ENABLED`.

`DD_REMOTE_CONFIG_POLL_INTERVAL_SECONDS`
: **Default**: `5.0`<br>
: Interval in seconds for polling remote configuration updates.

## Agent

`DD_AGENT_HOST`
: **Default**: `localhost`<br>
: Sets the hostname of the Datadog Agent.

`DD_TRACE_AGENT_PORT`
: **Default**: `8126`<br>
: Sets the port of the Datadog Agent for trace collection.

`DD_TRACE_AGENT_URL`
: **Default**: `(none)`<br>
: Sets the URL of the Datadog Agent. Example: `http://localhost:8126`. This takes precedence over `DD_AGENT_HOST` and `DD_TRACE_AGENT_PORT`.

`DD_DOGSTATSD_HOST`
: **Default**: `localhost`<br>
: Sets the hostname for DogStatsD metric collection.

`DD_DOGSTATSD_PORT`
: **Default**: `8125`<br>
: Sets the port for DogStatsD metric collection.

`DD_DOGSTATSD_URL`
: **Default**: `(none)`<br>
: Sets the URL for DogStatsD. This takes precedence over `DD_DOGSTATSD_HOST` and `DD_DOGSTATSD_PORT`.

`DD_INSTRUMENTATION_TELEMETRY_ENABLED`
: **Default**: `true`<br>
: Enable or disable telemetry data collection and sending.

`DD_TELEMETRY_HEARTBEAT_INTERVAL`
: **Default**: `60.0`<br>
: Interval in seconds for sending telemetry heartbeat messages.

`DD_TELEMETRY_LOG_COLLECTION_ENABLED`
: **Default**: `true`<br>
: Enable or disable log collection for telemetry.

## Logging

`DD_LOG_LEVEL`
: **Default**: `ERROR`<br>
: Sets the internal log level for the tracer. Valid values: `DEBUG`, `INFO`, `WARN`, `ERROR`.

## Sampling

`DD_TRACE_SAMPLING_RULES`
: **Default**: `(none)`<br>
: A JSON array of objects to apply for trace sampling. Each rule must have a `sample_rate` between 0.0 and 1.0 (inclusive).

`DD_TRACE_RATE_LIMIT`
: **Default**: `100`<br>
: Maximum number of traces to sample per second.

## Trace context propagation

`DD_TRACE_PROPAGATION_STYLE`
: **Default**: `datadog,tracecontext`<br>
: A comma-separated list of propagation styles to use for both extraction and injection. Supported values are `datadog` and `tracecontext`. See [Propagating Rust Trace Context][2] for more information.

`DD_TRACE_PROPAGATION_STYLE_EXTRACT`
: **Default**: `(none)`<br>
: A comma-separated list of propagation styles to use for extraction. When set, this overrides `DD_TRACE_PROPAGATION_STYLE` for extraction.

`DD_TRACE_PROPAGATION_STYLE_INJECT`
: **Default**: `(none)`<br>
: A comma-separated list of propagation styles to use for injection. When set, this overrides `DD_TRACE_PROPAGATION_STYLE` for injection.

`DD_TRACE_PROPAGATION_EXTRACT_FIRST`
: **Default**: `false`<br>
: When set to `true`, stops extracting after the first successful trace context extraction.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/trace_collection/custom_instrumentation/rust
[2]: /tracing/trace_collection/trace_context_propagation
