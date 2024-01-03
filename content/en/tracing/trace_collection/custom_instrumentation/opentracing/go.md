---
title: Go OpenTracing Instrumentation
kind: documentation
aliases:
- /tracing/setup_overview/open_standards/go
- /tracing/trace_collection/open_standards/go
- /tracing/trace_collection/opentracing/go/
description: 'OpenTracing Instrumentation for Go'
code_lang: go
type: multi-code-lang
code_lang_weight: 30
---


Datadog supports the OpenTracing standard. For more details and information, view the [OpenTracing API][1], or see the setup information below.

## Setup

Import the [`opentracer` package][2] to expose the Datadog tracer as an [OpenTracing][3] compatible tracer.

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

[1]: https://github.com/opentracing/opentracing-go
[2]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/ddtrace/opentracer
[3]: http://opentracing.io
