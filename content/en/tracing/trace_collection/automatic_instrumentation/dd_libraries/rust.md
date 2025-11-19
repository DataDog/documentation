---
title: Tracing Rust Applications
description: "Set up the Datadog Rust SDK to send traces to Datadog."
aliases:
- /tracing/trace_collection/dd_libraries/rust
code_lang: rust
type: multi-code-lang
code_lang_weight: 90
further_reading:
- link: "https://github.com/DataDog/dd-trace-rs"
  tag: "Source Code"
  text: Source code
- link: "/tracing/trace_collection/custom_instrumentation/rust"
  tag: "Documentation"
  text: "Custom Instrumentation"
---

{{< callout header="false" btn_hidden="true"  >}}
    The Datadog Rust SDK is in Preview.
{{< /callout >}}

<div class="alert alert-info">
The Rust SDK does not provide automatic instrumentation. Tracing is achieved by manually instrumenting your application using the OpenTelemetry API.
</div>

## Overview

Datadog provides tracing support for Rust applications through the []`datadog-opentelemetry` crate][5], which is built on the OpenTelemetry (OTel) API and SDK.

To get started, make sure you have [installed and configured the Datadog Agent][4].

## Instrumentation

The Datadog Rust SDK does not provide automatic instrumentation.

You must manually instrument your application using the OpenTelemetry API. This includes:
- Creating spans for functions or operations.
- Adding attributes (tags) and events to spans.
- Manually propagating trace context for distributed traces.

For examples, see the [Rust Custom Instrumentation][2] documentation.

## Configuration

The Rust SDK can be configured using environment variables. For a full list of options, see the [Library Configuration][3] documentation.

## Compatibility

The Rust SDK requires a Minimum Supported Rust Version (MSRV) and specific OpenTelemetry library versions. For a full list of compatibility requirements, see the [Compatibility Requirements][1] page.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/trace_collection/compatibility/rust
[2]: /tracing/trace_collection/custom_instrumentation/rust
[3]: /tracing/trace_collection/library_config/rust
[4]: /tracing/trace_collection/automatic_instrumentation/?tab=datadoglibraries#install-and-configure-the-agent
[5]: https://crates.io/crates/datadog-opentelemetry