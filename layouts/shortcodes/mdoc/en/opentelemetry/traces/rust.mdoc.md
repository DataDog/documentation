<!--
This partial contains Rust traces content for the OTel API.
It can be included directly in language-specific pages or wrapped in conditionals.
-->

{% alert level="info" %}
The Datadog Rust SDK is in Preview.
{% /alert %}

Datadog provides support for custom instrumentation in Rust applications through the [`datadog-opentelemetry` crate][170]. This library is built on the OpenTelemetry (OTel) API and SDK, providing a tracer that includes Datadog-specific features and an exporter.

Because this library is built on OpenTelemetry, you use the standard OpenTelemetry API to create traces and spans.

## Setup {% #setup-otel-rust %}

To configure your Rust application to send OpenTelemetry traces to Datadog:

### 1. Add dependencies {% #add-dependencies-otel-rust %}

Add `datadog-opentelemetry` and the core `opentelemetry` crate to your `Cargo.toml`:

```shell
cargo add datadog-opentelemetry opentelemetry
```

### 2. Initialize the Tracer {% #initialize-tracer-otel-rust %}

In your application's main function, initialize the Datadog tracer provider:

{% alert level="info" %}
You must shut down the provider before your application exits to ensure all pending traces are flushed.
{% /alert %}

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

### 3. Ensure Agent is running {% #ensure-agent-running-otel-rust %}

The Datadog exporter sends traces to the Datadog Agent, which must be running and accessible.

## Configuration {% #configuration-otel-rust %}

The Datadog Rust SDK is configured using environment variables. For a complete list of options, see the [Configuration documentation][171].

## Examples {% #examples-otel-rust %}

### Get a Tracer {% #get-a-tracer-otel-rust %}

Get an instance of a `Tracer` from the global provider:

```rust
use opentelemetry::global;

let tracer = global::tracer("my-component");
```

### Create a span {% #create-a-span-otel-rust %}

Use `tracer.in_span` to create a new span. The span is automatically ended when the closure finishes:

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

### Create a child span {% #create-a-child-span-otel-rust %}

To create a child span, nest `in_span` calls:

```rust
use opentelemetry::{global, trace::Tracer};

fn parent_operation() {
    let tracer = global::tracer("my-component");

    tracer.in_span("parent_operation", |_cx| {
        tracer.in_span("child_operation", |_cx| {
            // This span is automatically parented to "parent_operation"
            println!("Doing child work...");
        });
        println!("Doing parent work...");
    });
}
```

### Add span tags {% #add-span-tags-otel-rust %}

Add attributes to a span using the `set_attribute` method:

```rust
use opentelemetry::trace::{Tracer, TraceContextExt};
use opentelemetry::KeyValue;

fn add_tags_to_span() {
    let tracer = opentelemetry::global::tracer("my-component");

    tracer.in_span("operation.with.tags", |cx| {
        let span = cx.span();

        span.set_attribute(KeyValue::new("customer.id", "12345"));
        span.set_attribute(KeyValue::new("http.method", "GET"));
    });
}
```

### Add span events {% #add-span-events-otel-rust %}

Add time-stamped log messages to a span using the `add_event` method:

```rust
use opentelemetry::trace::{Tracer, TraceContextExt};
use opentelemetry::KeyValue;

fn add_events_to_span() {
    let tracer = opentelemetry::global::tracer("my-component");

    tracer.in_span("operation.with.events", |cx| {
        let span = cx.span();

        span.add_event("Data received", vec![]);
        span.add_event(
            "Processing data",
            vec![
                KeyValue::new("data.size_bytes", 1024),
                KeyValue::new("data.format", "json"),
            ],
        );
    });
}
```

## Context propagation {% #context-propagation-otel-rust %}

Because Rust does not have automatic instrumentation, you must manually propagate the trace context when making or receiving remote calls to connect traces across services.

For more information, see [Trace Context Propagation][172].

[170]: https://crates.io/crates/datadog-opentelemetry
[171]: /tracing/trace_collection/library_config/rust
[172]: /tracing/trace_collection/trace_context_propagation/?tab=rust
