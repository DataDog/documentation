---
title: Go Custom Instrumentation using OpenTelemetry API
kind: documentation
description: 'Instrument your Go application with OpenTelemetry API to send traces to Datadog'
code_lang: otel
type: multi-code-lang
code_lang_weight: 2
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

{{% otel-custom-instrumentation-lang %}}

## Imports
 
Import the following packages to setup the Datadog trace provider and use cases demonstrated below:

```go
import (
	"context"
	"log"
	"os"

	"gopkg.in/DataDog/dd-trace-go.v1/ddtrace/ext"
	ddotel "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/opentelemetry"
	ddtracer "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer"

	"go.opentelemetry.io/otel"
	"go.opentelemetry.io/otel/attribute"
)
```

## Setup

To configure OpenTelemetry to use the Datadog trace provider:

1. Add your desired manual OpenTelemetry instrumentation to your Go code following the [OpenTelemetry Go Manual Instrumentation documentation][5]. **Important!** Where those instructions indicate that your code should call the OpenTelemetry SDK, call the Datadog tracing library instead.

2. Install the OpenTelemetry package `go.opentelemetry.io/otel` using the command:

   ```shell
   go get go.opentelemetry.io/otel
   ```

3. Install the Datadog OpenTelemetry wrapper package `gopkg.in/DataDog/dd-trace-go.v1/ddtrace/opentelemetry` using the command:

   ```shell
   go get gopkg.in/DataDog/dd-trace-go.v1/ddtrace/opentelemetry
   ```

4. Import packages in the code:

   ```go
   import (
     "go.opentelemetry.io/otel"
     ddotel "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/opentelemetry"
   )
   ```

5. Create a TracerProvider, optionally providing a set of options, that are specific to Datadog APM, and defer the Shutdown method, which stops the tracer:

   ```go
   provider := ddotel.NewTracerProvider()
   defer provider.Shutdown()
   ```

6. Use the Tracer Provider instance with the OpenTelemetry API to set the global TracerProvider:

   ```go
   otel.SetTracerProvider(provider)
   ```
   
7. Run your application.

Datadog combines these OpenTelemetry spans with other Datadog APM spans into a single trace of your application.

## Adding span tags

Add custom tags to your spans to attach additional metadata and context to your traces.

```go
// Can only be done after the setup steps, such as initialising the tracer.

// Start a span.
ctx, span := t.Start(ctx, "read.file")
// Set an attribute, or a tag in Datadog terminology, on a span.
span.SetAttributes(attribute.String(ext.ResourceName, "test.json"))
```

### Adding tags globally to all spans

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

### Setting errors on a span

To set an error on a span, use the `setStatus` method like this:

```go
// Start a span.
ctx, span := t.Start(context.Background(), "span_name")

...
// Set an error on a span with 'span.SetAttributes'.
span.SetAttributes(attribute.String(ext.ErrorMsg, "error_message"))

// ALternatively, it is possible to set an error on a span via end span options. 
EndOptions(sp, tracer.WithError(errors.New("persisted_option")))
sp.End()

```

## Adding spans

Unlike other Datadog tracing libraries, when tracing Go applications, Datadog recommends that you explicitly manage and pass the Go context of your spans. This approach ensures accurate span relationships and meaningful tracing. For more information, see the [Go context library documentation][16] or documentation for any third-party libraries integrated with your application.

```go
// Can only be done after the setup steps.

// Here we can leverage context.Context to pass in Datadog-specifc start span options,
// like 'ddtracer.Measured()'
ctx, span := t.Start(
	ddotel.ContextWithStartOptions(context.Background(), ddtracer.Measured()), "span_name")

span.End()
```

### Asynchronous traces

When working with asynchronous or concurrent operations, it's important to ensure that traces are properly propagated and connected across different execution contexts. Here's an example of how to create and manage asynchronous traces:

```go
func main() {
	ctx, span := t.Start(context.Background(), "main_op")
	defer span.End()

	go func() {
		ctx, asyncSpan := t.Start(ctx, "asyncOp")
		defer asyncSpan.End()
		performOp()
	}()
}
```

### Distributed tracing

Create a distributed [trace][15] by manually propagating the tracing context:

```go
package main

import (
    "net/http"

    "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer"
)

func handler(w http.ResponseWriter, r *http.Request) {
    span, ctx := tracer.StartSpanFromContext(r.Context(), "post.process")
    defer span.Finish()

    req, err := http.NewRequest("GET", "http://example.com", nil)
    req = req.WithContext(ctx)
    // Inject the span Context in the Request headers
    err = tracer.Inject(span.Context(), tracer.HTTPHeadersCarrier(req.Header))
    if err != nil {
        // Handle or log injection error
    }
    http.DefaultClient.Do(req)
}
```

Then, on the server side, to continue the trace, start a new [Span][2] from the extracted `Context`:

```go
package main

import (
    "net/http"

    "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer"
)

func handler(w http.ResponseWriter, r *http.Request) {
    // Extract the span Context and continue the trace in this service
    sctx, err := tracer.Extract(tracer.HTTPHeadersCarrier(r.Header))
    if err != nil {
        // Handle or log extraction error
    }

    span := tracer.StartSpan("post.filter", tracer.ChildOf(sctx))
    defer span.Finish()
}
```

## Trace client and Agent configuration

There are additional configurations to consider for both the tracing client and Datadog Agent:
- Context propagation with B3 Headers
- Exclude specific resources from sending traces to Datadog if you do not want to include these traces in metrics calculated, such as Health Checks.


### Propagating context with headers extraction and injection

You can configure the propagation of context for distributed traces by injecting and extracting headers. Read [Trace Context Propagation][13] for information.

### Resource filtering

Traces can be excluded based on their resource name, to remove synthetic traffic such as health checks from reporting traces to Datadog. This and other security and fine-tuning configurations can be found on the [Security][14] page.


[1]: https://opentelemetry.io/docs/instrumentation/go/manual/#propagators-and-context
[2]: https://opentelemetry.io/docs/reference/specification/trace/sdk/#span-processor
[3]: https://opentelemetry.io/docs/reference/specification/trace/sdk/#span-exporter
[4]: https://opentelemetry.io/docs/reference/specification/trace/sdk/#id-generators
[5]: https://opentelemetry.io/docs/instrumentation/go/manual/
[6]: https://opentelemetry.io/docs/instrumentation/go/
[9]: /tracing/trace_collection/trace_context_propagation/go/
[12]: /opentelemetry/guide/otel_api_tracing_interoperability/
[13]: /tracing/trace_collection/trace_context_propagation/go/
[14]: /tracing/security
[15]: /tracing/glossary/#trace
[16]: https://pkg.go.dev/context