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

`DD_SERVICE`
: **Default**: "unnamed-rust-service"<br>
: Sets the service name for your application.

`DD_ENV`
: **Default**: `(none)`<br>
: Set the application's environment, for example: `prod`, `staging`.

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

## Agent

`DD_TRACE_AGENT_URL`
: **Default**: `(none)`<br>
: Sets the URL of the Datadog Agent. Example: `http://localhost:8126`.

## Logging

`DD_LOG_LEVEL`
: **Default**: `(none)`<br>
: Sets the internal log level for the tracer. Example: `DEBUG`, `INFO`, `WARN`, `ERROR`.

## Sampling

`DD_TRACE_SAMPLING_RULES`
: **Default**: `(none)`<br>
: A list of rules to apply for trace sampling.

`DD_TRACE_RATE_LIMIT`
: **Default**: `(none)`<br>
: An integer setting the maximum number of traces to sample per second.

## Trace context propagation

`DD_TRACE_PROPAGATION_STYLE`
: **Default**: `(none)`<br>
: A comma-separated list of propagation styles to use. Supported values are `datadog` and `tracecontext`. See [Propagating Rust Trace Context][18] for more information.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/trace_collection/custom_instrumentation/rust
[2]: /tracing/trace_collection/trace_context_propagation