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

<!-- FEATURE_PARITY_AUTOGEN_START -->
{{% collapse-content title="Tracing" level="h4" expanded=false id="feature-parity-rust-tracing" %}}
{{< include-markdown "tracing/trace_collection/library_config/rust/tracing" >}}
{{% /collapse-content %}}

{{% collapse-content title="OpenTelemetry" level="h4" expanded=false id="feature-parity-rust-opentelemetry" %}}
{{< include-markdown "tracing/trace_collection/library_config/rust/opentelemetry" >}}
{{% /collapse-content %}}

{{% collapse-content title="Other" level="h4" expanded=false id="feature-parity-rust-other" %}}
{{< include-markdown "tracing/trace_collection/library_config/rust/other" >}}
{{% /collapse-content %}}
<!-- FEATURE_PARITY_AUTOGEN_END -->

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/trace_collection/custom_instrumentation/rust
[2]: /tracing/trace_collection/trace_context_propagation
