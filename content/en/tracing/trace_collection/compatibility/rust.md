---
title: Rust Compatibility Requirements
description: 'Compatibility Requirements for the Datadog Rust Tracer'
code_lang: rust
type: multi-code-lang
code_lang_weight: 90
further_reading:
    - link: 'tracing/trace_collection/custom_instrumentation/rust'
      tag: 'Documentation'
      text: 'Instrument Your Application'
    - link: 'https://github.com/DataDog/dd-trace-rs'
      tag: "External Site"
      text: 'dd-trace-rs repository'
---

{{< callout btn_hidden="true" >}}
  The Datadog Rust SDK is in Preview. It is not recommended for full production use.
{{< /callout >}} 

The Datadog Rust SDK is open source. For more information, see the [`dd-trace-rs` repository][1].

## Language and library support

The Rust tracer relies on specific versions of the Rust compiler and the OpenTelemetry crate.

| Component | Requirement |
|---|---|
| **Rust Version** | 1.84 (MSRV) or newer |
| **OpenTelemetry Crate** | Version 0.30 |

## Operating systems

The Rust tracer is tested and supported on the following operating systems:
- [TODO]

## Integrations

The Datadog Rust SDK does not provide automatic instrumentation.

You must manually instrument your application using the [OpenTelemetry API][2]. This includes:
- Creating spans for functions or operations.
- Adding attributes (tags) and events to spans.
- Manually propagating trace context for distributed traces.

For examples, see the [Rust Custom Instrumentation][2] documentation.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/dd-trace-rs
[2]: /tracing/trace_collection/custom_instrumentation/rust