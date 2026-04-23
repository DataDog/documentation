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

{{% apm-config-visibility %}}

It is recommended to use `DD_ENV`, `DD_SERVICE`, and `DD_VERSION` to set `env`, `service`, and `version` for your services.

## Configurations keys

The previous version of this configuration documentation is still available at [Configuring the Rust Tracing Library (legacy)][3].

{{< partial name="apm/registry-config-list.html" >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/trace_collection/custom_instrumentation/rust
[2]: /tracing/trace_collection/trace_context_propagation
[3]: /tracing/trace_collection/library_config_legacy/rust/
