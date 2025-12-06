---
title: Go Custom Instrumentation using the OpenTelemetry API
description: Datadog, the leading service for cloud-scale monitoring.
breadcrumbs: >-
  Docs > OpenTelemetry in Datadog > Instrument Your Applications > OpenTelemetry
  API Support > Go Custom Instrumentation using the OpenTelemetry API
sourceUrl: https://docs.datadoghq.com/opentelemetry/instrument/api_support/go/index.html
---

# Go Custom Instrumentation using the OpenTelemetry API

{% alert level="info" %}
Unsure when to use OpenTelemetry with Datadog? Start with [Custom Instrumentation with the OpenTelemetry API](https://docs.datadoghq.com/tracing/trace_collection/custom_instrumentation/otel_instrumentation/) to learn more.
{% /alert %}

## Overview{% #overview %}

There are a few reasons to manually instrument your applications with the OpenTelemetry API:

- You are not using Datadog [supported library instrumentation](https://docs.datadoghq.com/tracing/trace_collection/compatibility/).
- You want to extend the `ddtrace` library's functionality.
- You need finer control over instrumenting your applications.

The `ddtrace` library provides several techniques to help you achieve these goals. The following sections demonstrate how to use the OpenTelemetry API for custom instrumentation to use with Datadog.

## Imports{% #imports %}

Import the following packages to setup the Datadog trace provider and use cases demonstrated below. **Note**: This documentation uses v2 of the Go tracer, which Datadog recommends for all users. If you are using v1, see the [migration guide](https://docs.datadoghq.com/tracing/trace_collection/compatibility/) to upgrade to v2.

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

## Setup{% #setup %}

To configure OpenTelemetry to use the Datadog trace provider:

1. Add your desired manual OpenTelemetry instrumentation to your Go code following the [OpenTelemetry Go Manual Instrumentation documentation](https://opentelemetry.io/docs/instrumentation/go/manual/). **Important!** Where those instructions indicate that your code should call the OpenTelemetry SDK, call the Datadog tracing library instead.

1. Install the OpenTelemetry package `go.opentelemetry.io/otel` using the command:

   ```shell
   go get go.opentelemetry.io/otel
   ```

1. Install the Datadog OpenTelemetry wrapper package using the command:

   ```shell
   go get github.com/DataDog/dd-trace-go/v2/ddtrace/opentelemetry
   ```

1. Import packages in the code:

   ```go
   import (
      "go.opentelemetry.io/otel"
      ddotel "github.com/DataDog/dd-trace-go/v2/ddtrace/opentelemetry"
   )
   ```

1. Create a TracerProvider, optionally providing a set of options, that are specific to Datadog APM, and defer the Shutdown method, which stops the tracer:

   ```go
   provider := ddotel.NewTracerProvider()
   defer provider.Shutdown()
   ```

1. Use the Tracer Provider instance with the OpenTelemetry API to set the global TracerProvider:

   ```go
   otel.SetTracerProvider(provider)
   ```

1. Run your application.

Datadog combines these OpenTelemetry spans with other Datadog APM spans into a single trace of your application.

## Adding span tags{% #adding-span-tags %}

Add custom tags to your spans to attach additional metadata and context to your traces.

```go
// Can only be done after the setup steps, such as initialising the tracer.

// Start a span.
ctx, span := t.Start(ctx, "read.file")
// Set an attribute, or a tag in Datadog terminology, on a span.
span.SetAttributes(attribute.String(ext.ResourceName, "test.json"))
```

### Adding tags globally to all spans{% #adding-tags-globally-to-all-spans %}

Add tags to all spans by configuring the tracer with the `WithGlobalTag` option:

```go
// Here we can leverage the Datadog tracer options by passing them into the 
// NewTracerProvider function.
provider := ddotel.NewTracerProvider(
	ddtracer.WithGlobalTag("datacenter", "us-1"),
	ddtracer.WithGlobalTag("env", "dev"),
)
defer provider.Shutdown()

// Use it with the OpenTelemetry API to set the global TracerProvider.
otel.SetTracerProvider(provider)

// Start the Tracer with the OpenTelemetry API.
t := otel.Tracer("")
```

### Setting errors on a span{% #setting-errors-on-a-span %}

To set an error on a span, use the otel SetAttributes or ddtrace WithError options.

```go
// Start a span.
ctx, span := t.Start(context.Background(), "spanName") // where `t` refers to otel/trace

...
// Set an error on a span with 'span.SetAttributes'.
span.SetAttributes(attribute.String(ext.ErrorMsg, "errorMsg"))

// ALternatively, it is possible to set an error on a span via end span options. 
EndOptions(span, tracer.WithError(errors.New("myErr"))) // where `tracer` refers to ddtrace/tracer
span.End()
```

## Adding spans{% #adding-spans %}

Unlike other Datadog tracing libraries, when tracing Go applications, Datadog recommends that you explicitly manage and pass the Go context of your spans. This approach ensures accurate span relationships and meaningful tracing. For more information, see the [Go context library documentation](https://pkg.go.dev/context) or documentation for any third-party libraries integrated with your application.

```go
// Can only be done after the setup steps.

// Here we can leverage context.Context to pass in Datadog-specifc start span options,
// like 'ddtracer.Measured()'
ctx, span := t.Start(
	ddotel.ContextWithStartOptions(context.Background(), ddtracer.Measured()), "span_name")

span.End()
```

## Adding span events{% #adding-span-events %}

{% alert level="info" %}
Adding span events requires SDK version 1.67.0 or higher.
{% /alert %}

You can add span events using the `AddEvent` API. This method requires a `name` parameter and optionally accepts `attributes` and `timestamp` parameters. The method creates a new span event with the specified properties and associates it with the corresponding span.

- **Name** [*required*]: A string representing the event's name.
- **Attributes** [*optional*]: Zero or more key-value pairs with the following properties:
  - The key must be a non-empty string.
  - The value can be either:
    - A primitive type: string, Boolean, or number.
    - A homogeneous array of primitive type values (for example, an array of strings).
  - Nested arrays and arrays containing elements of different data types are not allowed.
- **Timestamp** [*optional*]: A UNIX timestamp representing the event's occurrence time. Expects a `Time` object.

In the following example, `oteltrace` is an alias for the go.opentelemetry.io/otel/trace package and `attribute` refers to the go.opentelemetry.io/otel/attribute package. These packages must be imported in order to use this example.

```go
// Start a span.
ctx, span := tracer.StartSpan(context.Background(), "span_name")
span.AddEvent("Event With No Attributes")
span.AddEvent("Event With Some Attributes", oteltrace.WithAttributes(attribute.Int("int_val", 1), attribute.String("string_val", "two"), attribute.Int64Slice("int_array", []int64{3, 4}), attribute.StringSlice("string_array", []string{"5", "6"}), attribute.BoolSlice("bool_array", []bool{false, true})))
span.Finish()
```

Read the [OpenTelemetry](https://opentelemetry.io/docs/specs/otel/trace/api/#add-events) specification for more information.

## Trace client and Agent configuration{% #trace-client-and-agent-configuration %}

There are additional configurations to consider for both the tracing client and Datadog Agent:

- Context propagation with B3 Headers
- Exclude specific resources from sending traces to Datadog if you do not want to include these traces in metrics calculated, such as Health Checks.

### Propagating context with headers extraction and injection{% #propagating-context-with-headers-extraction-and-injection %}

You can configure the propagation of context for distributed traces by injecting and extracting headers. Read [Trace Context Propagation](https://docs.datadoghq.com/tracing/trace_collection/trace_context_propagation/) for information.

### Resource filtering{% #resource-filtering %}

Traces can be excluded based on their resource name, to remove synthetic traffic such as health checks from reporting traces to Datadog. This and other security and fine-tuning configurations can be found on the [Security](https://docs.datadoghq.com/tracing/security) page.
