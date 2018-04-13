---
title: Tracing Go Applications
kind: Documentation
aliases:
- /tracing/go/
- /tracing/languages/go
further_reading:
- link: "https://github.com/DataDog/dd-trace-go"
  tag: "Github"
  text: Source code
- link: "https://godoc.org/github.com/DataDog/dd-trace-go/tracer"
  tag: "GoDoc"
  text: Package page
- link: "tracing/visualization/"
  tag: "Documentation"
  text: "Explore your services, resources and traces"
---

## Installation

To begin tracing applications written in Go, first [install and configure the Datadog Agent][1] (see additional documentation for [tracing Docker applications](/tracing/setup/docker/)).

Next, install the Go Tracer from the Github repository:

```go
go get "github.com/DataDog/dd-trace-go/tracer"
```

Finally, import the tracer and instrument your code!

## Example

```go
package main

import (
  "github.com/DataDog/dd-trace-go/tracer"
)

func main {
  span := tracer.NewRootSpan("web.request", "my_service", "resource_name")
  defer span.Finish()
  span.SetMeta("my_tag", "my_value")
}
```

For another example, see the [`example_test.go`][2] file in the Go Tracer package

## Compatibility

Currently, only Go 1.7+ is supported.

### Framework Compatibility

The ddtrace library includes support for a number of web frameworks, including:

___

{{% table responsive="true" %}}
| Framework   | Framework Documentation               | GoDoc Datadog Documentation                                                        |
|-------------|---------------------------------------|------------------------------------------------------------------------------------|
| Gin         | https://gin-gonic.github.io/gin/      | https://godoc.org/github.com/DataDog/dd-trace-go/contrib/gin-gonic/gin |
| Gorilla Mux | http://www.gorillatoolkit.org/pkg/mux | https://godoc.org/github.com/DataDog/dd-trace-go/contrib/gorilla/mux   |
| gRPC        | https://github.com/grpc/grpc-go       | https://godoc.org/github.com/DataDog/dd-trace-go/contrib/google.golang.org/grpc         |
|gRPC v1.2 | https://github.com/grpc/grpc-go | https://godoc.org/github.com/DataDog/dd-trace-go/contrib/google.golang.org/grpc.v12 |
{{% /table %}}

### Library Compatibility

It also includes support for the following data stores and libraries:

___

{{% table responsive="true" %}}
| Library| Library Documentation| GoDoc Datadog Documentation |
|-------------------|--------------------------------------------------|------------------------------------------------------------------------------------------|
|Elasticsearch | https://github.com/olivere/elastic | https://godoc.org/github.com/DataDog/dd-trace-go/contrib/olivere/elastic |
|gocql| https://github.com/gocql/gocql | https://godoc.org/github.com/DataDog/dd-trace-go/contrib/gocql/gocql |
|Go Redis| https://github.com/go-redis/redis |https://godoc.org/github.com/DataDog/dd-trace-go/contrib/go-redis/redis |
|HTTP | https://godoc.org/github.com/DataDog/dd-trace-go/contrib/net/http | https://godoc.org/github.com/DataDog/dd-trace-go/contrib/net/http |
|HTTP router|https://github.com/julienschmidt/httprouter| https://godoc.org/github.com/DataDog/dd-trace-go/contrib/julienschmidt/httprouter |
|Redigo Redis| https://github.com/garyburd/redigo | https://godoc.org/github.com/DataDog/dd-trace-go/contrib/garyburd/redigo |
|SQL| https://godoc.org/github.com/DataDog/dd-trace-go/contrib/database/sql |https://godoc.org/github.com/DataDog/dd-trace-go/contrib/database/sql |
|SQLx | https://github.com/jmoiron/sqlx | https://godoc.org/github.com/DataDog/dd-trace-go/contrib/jmoiron/sqlx |
{{% /table %}}

### OpenTracing API

Datadog APM client that implements an [OpenTracing][3] Tracer.

**Initialization**

To start using the Datadog Tracer with the OpenTracing API, you should first initialize the tracer with a proper `Configuration` object:

```go
import (
  // ddtrace namespace is suggested
  ddtrace "github.com/DataDog/dd-trace-go/opentracing"
  opentracing "github.com/opentracing/opentracing-go"
)

func main() {
  // create a Tracer configuration
  config := ddtrace.NewConfiguration()
  config.ServiceName = "api-intake"
  config.AgentHostname = "ddagent.consul.local"

  // initialize a Tracer and ensure a graceful shutdown
  // using the `closer.Close()`
  tracer, closer, err := ddtrace.NewTracer(config)
  if err != nil {
    // handle the configuration error
  }
  defer closer.Close()

  // set the Datadog tracer as a GlobalTracer
  opentracing.SetGlobalTracer(tracer)
  startWebServer()
}
```

Function `NewTracer(config)` returns an `io.Closer` instance that can be used to gracefully shutdown the `tracer`. It's recommended to always call the `closer.Close(), otherwise internal buffers are not flushed and you may lose some traces.

**Usage**

See [Opentracing documentation][4] for some usage patterns. Legacy documentation is available in [GoDoc format][5].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/setup
[2]: https://github.com/DataDog/dd-trace-go/blob/master/tracer/example_test.go
[3]: http://opentracing.io
[4]: https://github.com/opentracing/opentracing-go
[5]: https://godoc.org/github.com/DataDog/dd-trace-go/tracer
