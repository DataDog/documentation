---
title: Rust Custom Instrumentation using the OpenTelemetry API
description: 'Instrument your Rust application with the OpenTelemetry API to send traces to Datadog.'
further_reading:
    - link: 'https://www.datadoghq.com/blog/monitor-rust-otel/'
      tag: 'Blog'
      text: 'How to Monitor Your Rust Applications with OpenTelemetry'
    - link: 'tracing/other_telemetry/connect_logs_and_traces'
      tag: 'Documentation'
      text: 'Connect your Logs and Traces together'
    - link: 'tracing/glossary/'
      tag: 'Documentation'
      text: 'Explore your services, resources, and traces'
---

{{< callout header="false" btn_hidden="true"  >}}
  The Datadog Rust SDK is in Preview.
{{< /callout >}}

Datadog provides support for custom instrumentation in Rust applications through the [`datadog-opentelemetry` crate][3]. This library is built on the OpenTelemetry (OTel) API and SDK, providing a tracer that includes Datadog-specific features and an exporter.

Because this library is built on OpenTelemetry, you use the standard OpenTelemetry API to create traces and spans.

## Setup

To configure your Rust application to send OpenTelemetry traces to Datadog, you need to add the correct dependencies and initialize the tracer provider with the Datadog exporter.

### 1. Add dependencies

Add `datadog-opentelemetry` and the core `opentelemetry` crate to your `Cargo.toml`.

```shell
cargo add datadog-opentelemetry opentelemetry
```

### 2. Initialize the Tracer

In your application's main function, initialize the Datadog tracer provider. The `tracing().init()` function automatically configures the tracer from environment variables.

<div class="alert alert-info">You must shut down the provider before your application exits to ensure all pending traces are flushed.</div>

```rust
use datadog_opentelemetry;
use opentelemetry::{global, trace::Tracer};
use std::time::Duration;

fn main() {
    // This picks up env var configuration (like DD_SERVICE)
    // and initializes the global tracer provider
    let tracer_provider = datadog_opentelemetry::tracing()
        .init();

    // --- Your application code starts here ---
    // You can now use the standard OpenTelemetry API
    
    let tracer = global::tracer("my-component");
    
    tracer.in_span("my-operation", |_cx| {
        // ... do work ...
    });

    println!("Doing work...");

    // --- Your application code ends here ---

    // Shut down the tracer provider to flush remaining spans
    tracer_provider.shutdown_with_timeout(Duration::from_secs(5)).expect("tracer shutdown error");
}
```

### 3. Ensure Agent is running

The Datadog exporter sends traces to the Datadog Agent, which must be running and accessible.

## Configuration

The Datadog Rust SDK is configured using environment variables. For a complete list of options, see the [Configuration documentation][1].

## Examples

After initialization, you use the standard OpenTelemetry API to instrument your code.

### Get a Tracer

Get an instance of a `Tracer` from the global provider.

```rust
use opentelemetry::global;

let tracer = global::tracer("my-component");
```

### Create a span

Use `tracer.in_span` (from `opentelemetry::trace::Tracer`) to create a new span. The span is automatically ended when the closure finishes.

```rust
use opentelemetry::{global, trace::Tracer};

fn do_work() {
    let tracer = global::tracer("my-component");
    
    tracer.in_span("operation_name", |_cx| {
        // The span is active within this closure
        println!("Doing work...");
    });
}
```

### Create a child span

To create a child span, nest `in_span` calls. The inner span automatically becomes a child of the span active in the current context.

```rust
use opentelemetry::{global, trace::Tracer};

fn parent_operation() {
    let tracer = global::tracer("my-component");

    tracer.in_span("parent_operation", |_cx| {
        // The "parent_operation" span is now active on this thread
        
        tracer.in_span("child_operation", |_cx| {
            // This span is automatically parented to "parent_operation"
            println!("Doing child work...");
        });

        println!("Doing parent work...");
    });
}
```

### Access the active span

To get the currently active span from the context, use `Span::current()`.

```rust
use opentelemetry::trace::{Span, Tracer};

fn do_work_with_active_span() {
    let tracer = opentelemetry::global::tracer("my-component");

    tracer.in_span("my-operation", |_cx| {
        // A new span "my-operation" is now the active span.
        // You can retrieve it from the active context:
        let current_span = opentelemetry::trace::Span::current();

        // You can now add attributes or events to it
        current_span.set_attribute(
            opentelemetry::KeyValue::new("accessed.from.context", true)
        );
    });
}
```

### Add span tags

Add attributes to a span using the `set_attribute` method. You must retrieve the span from the context `cx` to modify it.

```rust
use opentelemetry::trace::{Tracer, TraceContextExt}; // TraceContextExt is required for cx.span()
use opentelemetry::KeyValue;

fn add_tags_to_span() {
    let tracer = opentelemetry::global::tracer("my-component");

    tracer.in_span("operation.with.tags", |cx| {
        let span = cx.span(); // Retrieve the span from context
        
        // Set attributes (tags) on the active span
        span.set_attribute(KeyValue::new("customer.id", "12345"));
        span.set_attribute(KeyValue::new("http.method", "GET"));
        span.set_attribute(KeyValue::new("is.test", true));
        span.set_attribute(KeyValue::new("team.name", "backend"));
    });
}
```

### Add span events

Add time-stamped log messages to a span using the `add_event` method.

```rust
use opentelemetry::trace::{Tracer, TraceContextExt};
use opentelemetry::KeyValue;

fn add_events_to_span() {
    let tracer = opentelemetry::global::tracer("my-component");

    tracer.in_span("operation.with.events", |cx| {
        let span = cx.span();

        // Add a simple event
        span.add_event("Data received", vec![]);

        // ... some work happens ...

        // Add an event with its own attributes
        span.add_event(
            "Processing data",
            vec![
                KeyValue::new("data.size_bytes", 1024),
                KeyValue::new("data.format", "json"),
            ],
        );

        // ... more work ...

        span.add_event("Processing complete", vec![]);
    });
}
```

## Context propagation

Because Rust does not have automatic instrumentation, you must manually propagate the trace context when making or receiving remote calls (like HTTP requests) to connect traces across services.

For more information, see [Trace Context Propagation][2].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/trace_collection/library_config/rust
[2]: /tracing/trace_collection/trace_context_propagation/?tab=rust
[3]: https://crates.io/crates/datadog-opentelemetry