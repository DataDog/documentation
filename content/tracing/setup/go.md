---
title: Tracing Go Applications
kind: Documentation
aliases:
- /tracing/go/
- /tracing/languages/go
further_reading:
- link: "https://github.com/DataDog/dd-trace-go/tree/v1"
  tag: "Github"
  text: Source code
- link: "https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/ddtrace"
  tag: "GoDoc"
  text: Package page
- link: "tracing/visualization/"
  tag: "Documentation"
  text: "Explore your services, resources and traces"
---

## Getting Started

For configuration instructions and details about using the API, check out our [API documentation][api docs] for manual instrumentation, and our [integrations section][contrib docs] for Go libraries and frameworks supporting automatic instrumentation.

For a description of the terminology used in APM, take a look at the [Getting started with APM section][getting started]. For details about contributing, check the official repository [README.md file][repo readme].

Consult our [migration document][migrating] if you need to migrate from an older version of the tracer (e.g. v<0.6.x) to newest version.

### Requirements

To begin tracing your Go applications, your environment must first meet the following requirements:

* Runing the Datadog Agent >= 5.21.1. See ["Install and configure the Datadog Agent"][1] (additional documentation for [tracing Docker applications](/tracing/setup/docker/)).
* Using Go 1.9+

### Installation

Next, install the Go tracer from its canonical import path:

```go
go get gopkg.in/DataDog/dd-trace-go.v1/ddtrace
```

You are now ready to import the tracer and start instrumenting your code!

## Automatic Instrumentation

We have built a series of pluggable packages which provide out-of-the-box support for instrumenting a series of libraries and frameworks. Find below the list of currently supported integrations.

**Note**: The [official documentation][contrib godoc] also provides a detailed overview of the supported packages and their APIs, along with usage examples.

### Frameworks

Integrate the Go tracer with the following list of web frameworks using one of our helper packages.

| Framework     | Framework Documentation                                             | GoDoc Datadog Documentation                                                                                                                                |
| ------------- | ------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Gin           | [gin-gonic.github.io/gin](https://gin-gonic.github.io/gin/)         | [gopkg.in/DataDog/dd-trace-go.v1/contrib/gin-gonic/gin](https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib/gin-gonic/gin)                           |
| Gorilla Mux   | [gorillatoolkit.org/pkg/mux](http://www.gorillatoolkit.org/pkg/mux) | [gopkg.in/DataDog/dd-trace-go.v1/contrib/gorilla/mux](https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib/gorilla/mux)                               |
| gRPC          | [github.com/grpc/grpc-go](https://github.com/grpc/grpc-go)          | [gopkg.in/DataDog/dd-trace-go.v1/contrib/google.golang.org/grpc](https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib/google.golang.org/grpc)         |
| gRPC v1.2     | [github.com/grpc/grpc-go](https://github.com/grpc/grpc-go)          | [gopkg.in/DataDog/dd-trace-go.v1/contrib/google.golang.org/grpc.v12](https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib/google.golang.org/grpc.v12) |

### Library Compatibility

The Go tracer includes support for the following data stores and libraries. Make sure to visit our integrations package [godoc page][contrib godoc] for an in-depth look.

| Library             | Library Documentation                                                              | GoDoc Datadog Documentation                                                                                                                            |
| ------------------- | ---------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------|
| AWS SDK             | [github.com/aws/aws-sdk-go](https://aws.amazon.com/sdk-for-go/)                    | [gopkg.in/DataDog/dd-trace-go.v1/contrib/aws/aws-sdk-go/aws](https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib/aws/aws-sdk-go/aws)             |
| Elasticsearch       | [github.com/olivere/elastic](https://github.com/olivere/elastic)                   | [gopkg.in/DataDog/dd-trace-go.v1/contrib/olivere/elastic](https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib/olivere/elastic)                   |
| Cassandra           | [github.com/gocql/gocql](https://github.com/gocql/gocql)                           | [gopkg.in/DataDog/dd-trace-go.v1/contrib/gocql/gocql](https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib/gocql/gocql)                           |
| GraphQL             | [github.com/graph-gophers/graphql-go](https://github.com/graph-gophers/graphql-go) | [gopkg.in/DataDog/dd-trace-go.v1/contrib/graph-gophers/graphql-go](https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib/graph-gophers/graphql-go) |
| HTTP                | [golang.org/pkg/net/http](https://golang.org/pkg/net/http/)                        | [gopkg.in/DataDog/dd-trace-go.v1/contrib/net/http](https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib/net/http)                                 |
| HTTP router         | [github.com/julienschmidt/httprouter](https://github.com/julienschmidt/httprouter) | [gopkg.in/DataDog/dd-trace-go.v1/contrib/julienschmidt/httprouter](https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib/julienschmidt/httprouter) |
| Redis (go-redis)    | [github.com/go-redis/redis](https://github.com/go-redis/redis)                     | [gopkg.in/DataDog/dd-trace-go.v1/contrib/go-redis/redis](https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib/go-redis/redis)                     |
| Redis (redigo)      | [github.com/garyburd/redigo](https://github.com/garyburd/redigo)                   | [gopkg.in/DataDog/dd-trace-go.v1/contrib/garyburd/redigo](https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib/garyburd/redigo)                   |
| SQL                 | [golang.org/pkg/database/sql](https://golang.org/pkg/database/sql)                 | [gopkg.in/DataDog/dd-trace-go.v1/contrib/database/sql](https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib/database/sql)                         |
| SQLx                | [github.com/jmoiron/sqlx](https://github.com/jmoiron/sqlx)                         | [gopkg.in/DataDog/dd-trace-go.v1/contrib/jmoiron/sqlx](https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib/jmoiron/sqlx)                         |

## Manual Instrumentation

To make use of manual instrumentation, use the `tracer` package which is documented on our [godoc page][tracer godoc]. One simple example would be:

```go
package main

import "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer"

func main() {
    // Start the tracer with zero or more options.
    tracer.Start(tracer.WithServiceName("my-service"))
    defer tracer.Stop()

    // Create a span for a web request at the /posts URL.
    span := tracer.StartSpan("web.request", tracer.ResourceName("/posts"))
    defer span.Finish()

    // Set metadata
    span.SetTag("my_tag", "my_value")
}
```

## OpenTracing Support

Import the [`opentracer` package][opentracing godoc] to expose the Datadog tracer as an [OpenTracing][3] compatible tracer.

### Example

A basic usage would be:

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
    t := opentracer.Start(tracer.WithServiceName("my-service"))

    // Stop it using the regular Stop call.
    defer tracer.Stop()

    // Set the global OpenTracing tracer.
    opentracing.SetGlobalTracer(t)

    // Use the OpenTracing API as usual.
}
```

**Note**: Using the [OpenTracing API][4] in parallel with the regular API or our integrations is fully supported. Under the hood, all of them
make use of the same tracer. Make sure to check out the [API documentation][opentracing godoc] for more examples and details.

## Sampling / Distributed Tracing

Propagate a single trace across multiple services with distributed tracing. For more details about how to use and configure distributed tracing, check out the [godoc page][tracer godoc].

Make use of priority sampling to ensure that distributed traces are complete. Set the sampling priority of a trace by adding the `sampling.priority` tag to its root span. This is then propagated throughout the entire stack. For example:

```go
span.SetTag(ext.SamplingPriority, ext.PriorityUserKeep)
```

Possible values for the sampling priority tag are:

| Sampling Value             | Effect                                                                                                      |
| -------------------------- | :---------------------------------------------------------------------------------------------------------- |
| ext.PriorityAutoReject     | The sampler automatically decided to not keep the trace. The Agent will drop it.                            |
| ext.PriorityAutoKeep       | The sampler automatically decided to keep the trace. The Agent will keep it. Might be sampled server-side.  |
| ext.PriorityUserReject     | The user asked to not keep the trace. The Agent will drop it.                                               |
| ext.PriorityUserKeep       | The user asked to keep the trace. The Agent will keep it. The server will keep it too.                      |

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/setup
[3]: http://opentracing.io
[4]: https://github.com/opentracing/opentracing-go
[tracer godoc]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer
[contrib godoc]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib
[opentracing godoc]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/ddtrace/opentracer
[api docs]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/ddtrace
[contrib docs]: #automatic-instrumentation
[getting started]: https://docs.datadoghq.com/tracing/visualization/
[repo readme]: https://github.com/DataDog/dd-trace-go/tree/v1#contributing
[migrating]: https://github.com/DataDog/dd-trace-go/tree/v1/MIGRATING.md
