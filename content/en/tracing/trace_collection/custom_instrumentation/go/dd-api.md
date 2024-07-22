---
title: Go Custom Instrumentation using Datadog API
aliases:
    - /tracing/opentracing/go
    - /tracing/manual_instrumentation/go
    - /tracing/custom_instrumentation/go
    - /tracing/setup_overview/custom_instrumentation/go
    - /tracing/trace_collection/custom_instrumentation/go
    - /tracing/trace_collection/custom_instrumentation/dd_libraries/go
description: 'Instrument your code with the Datadog Go APM tracer.'
code_lang: dd-api
type: multi-code-lang
code_lang_weight: 1
further_reading:
    - link: 'tracing/other_telemetry/connect_logs_and_traces'
      tag: 'Documentation'
      text: 'Connect your Logs and Traces together'
    - link: 'tracing/glossary/'
      tag: 'Documentation'
      text: 'Explore your services, resources, and traces'
---
<div class="alert alert-info">
If you have not yet read the instructions for auto-instrumentation and setup, start with the <a href="https://docs.datadoghq.com/tracing/setup/go/">Go Setup Instructions</a>.
</div>

This page details common use cases for adding and customizing observability with Datadog APM.

## Adding tags

Add custom [span tags][1] to your [spans][2] to customize your observability within Datadog. The span tags are applied to your incoming traces, allowing you to correlate observed behavior with code-level information such as merchant tier, checkout amount, or user ID.

### Add custom span tags

Add [tags][1] directly to a `Span` interface by calling `SetTag`:

```go
package main

import (
    "log"
    "net/http"

    "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer"
)

func handler(w http.ResponseWriter, r *http.Request) {
    // Create a span for a web request at the /posts URL.
    span := tracer.StartSpan("web.request", tracer.ResourceName("/posts"))
    defer span.Finish()

    // Set tag
    span.SetTag("http.url", r.URL.Path)
    span.SetTag("<TAG_KEY>", "<TAG_VALUE>")
}

func main() {
    tracer.Start(tracer.WithService("<SERVICE_NAME>"))
    defer tracer.Stop()
    http.HandleFunc("/posts", handler)
    log.Fatal(http.ListenAndServe(":8080", nil))
}
```

Datadog's integrations make use of the `Context` type to propagate the current active [span][2].
If you want to add span tags attached to a `Context`, call the `SpanFromContext` function:

```go
package main

import (
    "net/http"

    "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer"
)

func handler(w http.ResponseWriter, r *http.Request) {
    // Retrieve a span for a web request attached to a Go Context.
    if span, ok := tracer.SpanFromContext(r.Context()); ok {
        // Set tag
        span.SetTag("http.url", r.URL.Path)
    }
}
```

### Adding tags globally to all spans

Add [tags][1] to all [spans][2] by configuring the tracer with the `WithGlobalTag` option:

```go
package main

import "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer"

func main() {
    tracer.Start(
        tracer.WithGlobalTag("datacenter", "us-1"),
        tracer.WithGlobalTag("env", "dev"),
    )
    defer tracer.Stop()
}
```

### Set errors on a span

To set an error on one of your spans, use `tracer.WithError` as below:

```go
err := someOperation()
span.Finish(tracer.WithError(err))
```

## Adding spans

If you aren't using supported library instrumentation (see [Library compatibility][3]), you may want to to manually instrument your code.

<div class="alert alert-info">
Unlike other Datadog tracing libraries, when tracing Go applications, it's recommended that you explicitly manage and pass the Go context of your spans. This approach ensures accurate span relationships and meaningful tracing. For more information, see the <a href="https://pkg.go.dev/context">Go context library documentation</a> or documentation for any third-party libraries integrated with your application.
</div>

### Manually creating a new span

To make use of manual instrumentation, use the `tracer` package which is documented on Datadog's [godoc page][4]:

There are two functions available to create spans. API details are available for `StartSpan` [here][5] and for `StartSpanFromContext` [here][6].

```go
//Create a span with a resource name, which is the child of parentSpan.
span := tracer.StartSpan("mainOp", tracer.ResourceName("/user"), tracer.ChildOf(parentSpan))

// Create a span which will be the child of the span in the Context ctx, if there is a span in the context.
// Returns the new span, and a new context containing the new span.
span, ctx := tracer.StartSpanFromContext(ctx, "mainOp", tracer.ResourceName("/user"))
```

### Asynchronous traces

```go
func main() {
	span, ctx := tracer.StartSpanFromContext(context.Background(), "mainOp")
	defer span.Finish()

	go func() {
		asyncSpan := tracer.StartSpanFromContext(ctx, "asyncOp")
		defer asyncSpan.Finish()
		performOp()
	}()
}
```

### Distributed tracing

Create a distributed [trace][7] by manually propagating the tracing context:

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

There are additional configurations possible for both the tracing client and Datadog Agent for context propagation with B3 Headers, as well as excluding specific resources from sending traces to Datadog in the event these traces are not wanted in metrics calculated, such as Health Checks.


### Propagating context with headers extraction and injection

You can configure the propagation of context for distributed traces by injecting and extracting headers. Read [Trace Context Propagation][11] for information.

### Resource filtering

Traces can be excluded based on their resource name, to remove synthetic traffic such as health checks from reporting traces to Datadog. This and other security and fine-tuning configurations can be found on the [Security][9] page.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/glossary/#span-tags
[2]: /tracing/glossary/#spans
[3]: /tracing/setup/go/#compatibility
[4]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer
[5]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer#StartSpan
[6]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer#StartSpanFromContext
[7]: /tracing/glossary/#trace
[9]: /tracing/security
[11]: /tracing/trace_collection/trace_context_propagation/go/