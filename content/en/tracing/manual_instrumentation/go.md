---
title: Go Custom Instrumentation
kind: documentation
aliases:
    - /tracing/opentracing/go
description: 'Implement the OpenTracing standard with the Datadog Go APM tracer.'
further_reading:
    - link: 'tracing/connect_logs_and_traces'
      tag: 'Documentation'
      text: 'Connect your Logs and Traces together'
    - link: 'tracing/visualization/'
      tag: 'Documentation'
      text: 'Explore your services, resources, and traces'
---
<div class="alert alert-info">
If you have not yet read the instructions for auto-instrumentation and setup, start with the <a href="https://docs.datadoghq.com/tracing/setup/go/">Go Setup Instructions</a>.
</div>

This page details common use cases for adding and customizing observability with Datadog APM.

## Adding Tags

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
    tracer.Start(tracer.WithServiceName("<SERVICE_NAME>"))
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

### Manually creating a new span

To make use of manual instrumentation, use the `tracer` package which is documented on Datadog's [godoc page][4]:

There are two functions available to create spans. API details are available for `StartSpan` [here][5] and for `StartSpanFromContext` [here][6].

```go
//Create a span
span := tracer.StartSpan(“mainOp”, tracer.ResourceName("/user"), tracer.ChildOf(parentSpan))

//Create a span with a resource name, which is the child of parentSpan.
span := tracer.StartSpan(“mainOp”, tracer.ResourceName("/user"), tracer.ChildOf(parentSpan))

// Create a span which will be the child of the span in the Context ctx, if there is a span in the context.
// Returns the new span, and a new context containing the new span.
span, ctx := tracer.StartSpanFromContext(ctx, “mainOp”, tracer.ResourceName("/user"))
```

### Asynchronous Traces

```go
func main() {
	span, ctx := tracer.StartSpanFromContext(context.Background(), “mainOp”)
	defer span.Finish()

	go func() {
		asyncSpan := tracer.StartSpanFromContext(ctx, “asyncOp”)
		defer asyncSpan.Finish()
		performOp()
	}()
}
```

### Distributed Tracing

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

## Trace Client & Agent Configuration

There are additional configurations possible for both the tracing client and Datadog Agent for context propagation with B3 Headers, as well as excluding specific resources from sending traces to Datadog in the event these traces are not wanted in metrics calculated, such as Health Checks.

### B3 Headers Extraction and Injection

The Datadog APM tracer supports [B3 headers extraction][8] and injection for distributed tracing.

Distributed headers injection and extraction is controlled by
configuring injection/extraction styles. Two styles are
supported: `Datadog` and `B3`.

Configure injection styles using the environment variable:
`DD_PROPAGATION_STYLE_INJECT=Datadog,B3`

Configure extraction styles using the environment variable:
`DD_PROPAGATION_STYLE_EXTRACT=Datadog,B3`

The values of these environment variables are comma separated lists of
header styles that are enabled for injection or extraction. By default,
the `Datadog` extraction style is enabled.

If multiple extraction styles are enabled, extraction attempts are made
in the order that those styles are specified. The first successfully
extracted value is used.

### Resource filtering

The Agent can be configured to exclude a specific resource from traces sent by the Agent to the Datadog application. To prevent the submission of specific resources, use the `ignore_resources` setting in the `datadog.yaml` file . This setting enables the creation of a list containing one or more regular expressions, which instructs the Agent to filter out traces based on their resource name.

If you are running in a containerized environment, set `DD_APM_IGNORE_RESOURCES` on the container with the Datadog Agent instead. To learn more, [view the documentation here][13].

This can be useful for excluding any Health Checks or otherwise simulated traffic from the calculation of metrics for your services.

```text
## @param ignore_resources - list of strings - optional
## A list regular expressions can be provided to disable certain traces based on their resource name
## all entries must be surrounded by double quotes and separated by commas.
# ignore_resources: ["(GET|POST) /healthcheck"]
```

## OpenTracing

Datadog also supports the OpenTracing standard.  For more details and information, view the [OpenTracing API][9], or see the setup information below.

### Setup

Import the [`opentracer` package][10] to expose the Datadog tracer as an [OpenTracing][11] compatible tracer.

A basic usage example:

```go
package main

import (
    "github.com/opentracing/opentracing-go"

    "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/opentracer"
    "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer"
)

func main() {
    // Start the regular tracer and return it as an opentracing.Tracer interface. You
    // may use the same set of options as you normally would with the Datadog tracer.
    t := opentracer.New(tracer.WithServiceName("<SERVICE_NAME>"))

    // Stop it using the regular Stop call for the tracer package.
    defer tracer.Stop()

    // Set the global OpenTracing tracer.
    opentracing.SetGlobalTracer(t)

    // Use the OpenTracing API as usual.
}
```

**Note**: Using the [OpenTracing API][9] in parallel with the regular API or Datadog integrations is fully supported. Under the hood, all of them make use of the same tracer. See the [API documentation][10] for more examples and details.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/visualization/#span-tags
[2]: /tracing/visualization/#spans
[3]: /tracing/setup/go/#compatibility
[4]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer
[5]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer#StartSpan
[6]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer#StartSpanFromContext
[7]: /tracing/visualization/#trace
[8]: https://github.com/openzipkin/b3-propagation
[9]: https://github.com/opentracing/opentracing-go
[10]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/ddtrace/opentracer
[11]: http://opentracing.io
