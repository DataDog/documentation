---
title: Go Custom Instrumentation using the OpenTelemetry API
description: 'Instrument your Go application with the OpenTelemetry API to send traces to Datadog.'
code_lang: otel
type: multi-code-lang
code_lang_weight: 1
aliases:
- /tracing/trace_collection/otel_instrumentation/go/
- /tracing/trace_collection/custom_instrumentation/otel_instrumentation/go
further_reading:
    - link: 'tracing/glossary/'
      tag: 'Documentation'
      text: 'Explore your services, resources, and traces'
    - link: '/opentelemetry/guide/otel_api_tracing_interoperability'
      tag: 'Documentation'
      text: 'Interoperability of OpenTelemetry API and Datadog instrumented traces'
---

## Overview

There are a few reasons to manually instrument your applications with the OpenTelemetry API:

- You are not using Datadog supported library instrumentation.
- You want to extend the Datadog SDK's functionality.
- You need finer control over instrumenting your applications.

The Datadog SDK provides several techniques to help you achieve these goals. The following sections demonstrate how to use the OpenTelemetry API for custom instrumentation to use with Datadog.

## Imports

Import the following packages to setup the Datadog trace provider:

```go
import (
	"context"
	"log"
	"os"

   "github.com/DataDog/dd-trace-go/v2/ddtrace/ext"
   "github.com/DataDog/dd-trace-go/v2/ddtrace/opentelemetry"
   "github.com/DataDog/dd-trace-go/v2/ddtrace/tracer"

	"go.opentelemetry.io/otel"
	"go.opentelemetry.io/otel/attribute"
)
```

## Setup

To configure OpenTelemetry to use the Datadog trace provider:

1. Add your desired manual OpenTelemetry instrumentation to your Go code following the [OpenTelemetry Go Manual Instrumentation documentation][130]. **Important!** Where those instructions indicate that your code should call the OpenTelemetry SDK, call the Datadog tracing library instead.

2. Install the OpenTelemetry package:
   ```shell
   go get go.opentelemetry.io/otel
   ```

3. Install the Datadog OpenTelemetry wrapper package:
   ```shell
   go get github.com/DataDog/dd-trace-go/v2/ddtrace/opentelemetry
   ```

4. Import packages:
   ```go
   import (
      "go.opentelemetry.io/otel"
      ddotel "github.com/DataDog/dd-trace-go/v2/ddtrace/opentelemetry"
   )
   ```

5. Create a TracerProvider and defer the Shutdown method:
   ```go
   provider := ddotel.NewTracerProvider()
   defer provider.Shutdown()
   ```

6. Set the global TracerProvider:
   ```go
   otel.SetTracerProvider(provider)
   ```

7. Run your application.

## Adding span tags

Add custom tags to your spans to attach additional metadata and context:

```go
// Start a span.
ctx, span := t.Start(ctx, "read.file")
// Set an attribute, or a tag in Datadog terminology, on a span.
span.SetAttributes(attribute.String(ext.ResourceName, "test.json"))
```

### Adding tags globally to all spans

Add tags to all spans by configuring the tracer with the `WithGlobalTag` option:

```go
provider := ddotel.NewTracerProvider(
	ddtracer.WithGlobalTag("datacenter", "us-1"),
	ddtracer.WithGlobalTag("env", "dev"),
)
defer provider.Shutdown()

otel.SetTracerProvider(provider)
t := otel.Tracer("")
```

### Setting errors on a span

To set an error on a span:

```go
// Start a span.
ctx, span := t.Start(context.Background(), "spanName")

// Set an error on a span with 'span.SetAttributes'.
span.SetAttributes(attribute.String(ext.ErrorMsg, "errorMsg"))

// Alternatively, set an error via end span options.
EndOptions(span, tracer.WithError(errors.New("myErr")))
span.End()
```

## Adding spans

Unlike other Datadog tracing libraries, when tracing Go applications, Datadog recommends that you explicitly manage and pass the Go context of your spans.

```go
ctx, span := t.Start(
	ddotel.ContextWithStartOptions(context.Background(), ddtracer.Measured()), "span_name")

span.End()
```

## Adding span events

<div class="alert alert-info">Adding span events requires SDK version 1.67.0 or higher.</div>

You can add span events using the `AddEvent` API:

```go
ctx, span := tracer.StartSpan(context.Background(), "span_name")
span.AddEvent("Event With No Attributes")
span.AddEvent("Event With Some Attributes", oteltrace.WithAttributes(attribute.Int("int_val", 1), attribute.String("string_val", "two")))
span.Finish()
```

Read the [OpenTelemetry specification for adding events][103] for more information.

## Trace client and Agent configuration

### Propagating context with headers extraction and injection

You can configure the propagation of context for distributed traces by injecting and extracting headers. Read [Trace Context Propagation][105] for information.

### Resource filtering

Traces can be excluded based on their resource name, to remove synthetic traffic such as health checks from reporting traces to Datadog. This and other security and fine-tuning configurations can be found on the [Security][106] page.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[103]: https://opentelemetry.io/docs/specs/otel/trace/api/#add-events
[105]: /tracing/trace_collection/trace_context_propagation/
[106]: /tracing/security
[130]: https://opentelemetry.io/docs/instrumentation/go/manual/
