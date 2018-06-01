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

## Getting started

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
go get gopkg.in/DataDog/dd-trace-go.v1/...
```

If you see errors related to the integrations folder (`contrib`), simply ignore them, they are there only due to our support for older versions of modern libraries (such as our gRPC integration).

You are now ready to import the tracer and start instrumenting your code!

## Manual instrumentation

To make use of manual instrumentation, use the `tracer` package which is documented on our [godoc page][tracer godoc]. One simplistic example would be:

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

Consult the official [API documentation][tracer godoc] to discover all options for starting the tracer or creating and finishing spans.

## Automatic instrumentation

We have built a series of pluggable packages which provide out-of-the-box support for instrumenting a series of libraries and frameworks. Find below the list of currently supported integrations. 

**Note**: The [official documentation][contrib godoc] also provides a good overview of the supported packages, their APIs, along with usage examples.

### Frameworks

Integrate the Go tracer with the following list of web frameworks using one of our helper packages.


| Framework     | Framework Documentation                 | GoDoc Datadog Documentation                                                          |
| ------------- | --------------------------------------- | ------------------------------------------------------------------------------------ |
| Gin           | https://gin-gonic.github.io/gin/        | https://godoc.org/github.com/DataDog/dd-trace-go/contrib/gin-gonic/gin               |
| Gorilla Mux   | http://www.gorillatoolkit.org/pkg/mux   | https://godoc.org/github.com/DataDog/dd-trace-go/contrib/gorilla/mux                 |
| gRPC          | https://github.com/grpc/grpc-go         | https://godoc.org/github.com/DataDog/dd-trace-go/contrib/google.golang.org/grpc      |
| gRPC v1.2     | https://github.com/grpc/grpc-go         | https://godoc.org/github.com/DataDog/dd-trace-go/contrib/google.golang.org/grpc.v12  |

### Library Compatibility

The Go tracer includes support for the following data stores and libraries:


| Library             | Library Documentation                                                 | GoDoc Datadog Documentation                                                                |
| ------------------- | --------------------------------------------------                    | ------------------------------------------------------------------------------------------ |
| Elasticsearch       | https://github.com/olivere/elastic                                    | https://godoc.org/github.com/DataDog/dd-trace-go/contrib/olivere/elastic                   |
| gocql               | https://github.com/gocql/gocql                                        | https://godoc.org/github.com/DataDog/dd-trace-go/contrib/gocql/gocql                       |
| Go Redis            | https://github.com/go-redis/redis                                     | https://godoc.org/github.com/DataDog/dd-trace-go/contrib/go-redis/redis                    |
| HTTP                | https://godoc.org/github.com/DataDog/dd-trace-go/contrib/net/http     | https://godoc.org/github.com/DataDog/dd-trace-go/contrib/net/http                          |
| HTTP router         | https://github.com/julienschmidt/httprouter                           | https://godoc.org/github.com/DataDog/dd-trace-go/contrib/julienschmidt/httprouter          |
| Redigo Redis        | https://github.com/garyburd/redigo                                    | https://godoc.org/github.com/DataDog/dd-trace-go/contrib/garyburd/redigo                   |
| SQL                 | https://godoc.org/github.com/DataDog/dd-trace-go/contrib/database/sql | https://godoc.org/github.com/DataDog/dd-trace-go/contrib/database/sql                      |
| SQLx                | https://github.com/jmoiron/sqlx                                       | https://godoc.org/github.com/DataDog/dd-trace-go/contrib/jmoiron/sqlx                      |

___

Make sure to take a look at our integrations package [godoc page][contrib godoc] for an in-depth look.

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
    // Start the regular tracer and return it as an opentracing.Tracer. You may use
    // the same set of options as you normally would with the Datadog tracer.
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

## Further Reading

Find more information in the [package documentation][tracer godoc] about distributed tracing and sampling priority.

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
