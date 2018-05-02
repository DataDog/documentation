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

For configuration instructions and details about using the API, check out our [API documentation][api docs] for manual
instrumentation, and our [integrations section][contrib docs] for libraries and frameworks supporting automatic instrumentation.

For descriptions of terminology used in APM, take a look at the [Getting started with APM][getting started] section.

For details about contributing, check the official repository [README.md file][repo readme]. If you are migrating from an older
version of the tracer (e.g. 0.6.x) you can find some more guidance in our [migration document][migrating].

[api docs]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/ddtrace
[contrib docs]: #automatic-instrumentation
[getting started]: https://docs.datadoghq.com/tracing/visualization/
[repo readme]: https://github.com/DataDog/dd-trace-go/tree/v1#contributing
[migrating]: https://github.com/DataDog/dd-trace-go/tree/v1/MIGRATING.md

### Requirements

To begin tracing applications written in Go, your environment must first meet the following requirements:

* Run the Datadog Agent >= 5.21.1. See ["Install and configure the Datadog Agent"][1] (additional documentation for [tracing Docker applications](/tracing/setup/docker/)).
* Go 1.9+

### Installation

Next, install the Go tracer from its canonical import path:

```go
go get gopkg.in/DataDog/dd-trace-go.v1/...
```

If you see errors related to the integrations folder (`contrib`), simply ignore them, they are there only due to our
support for older versions of modern libraries (such as our gRPC integration).

You are now ready to import the tracer and start instrumenting your code!

## Manual instrumentation

To make use of manual instrumentation, use the `tracer` package whch is thoroughly documented on our [godoc page][tracer godoc]. One simplistic example would be:

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

Full documentation regarding the options for starting the tracer or creating and finishing spans can be found in the official [API documentation][tracer godoc].

## Automatic instrumentation

We have built a series of pluggable packages which provide out-of-the-box support for instrumenting a series of libraries
and frameworks. A table listing the currently supported integrations can be seen below. The [official documentation][contrib godoc]
also provides a good overview of the supported packages, their APIs, along with usage examples.

### Frameworks

The following list of web frameworks can be integrated with using one of our helper packages.


| Framework     | Framework Documentation                 | GoDoc Datadog Documentation                                                          |
| ------------- | --------------------------------------- | ------------------------------------------------------------------------------------ |
| Gin           | https://gin-gonic.github.io/gin/        | https://godoc.org/github.com/DataDog/dd-trace-go/contrib/gin-gonic/gin               |
| Gorilla Mux   | http://www.gorillatoolkit.org/pkg/mux   | https://godoc.org/github.com/DataDog/dd-trace-go/contrib/gorilla/mux                 |
| gRPC          | https://github.com/grpc/grpc-go         | https://godoc.org/github.com/DataDog/dd-trace-go/contrib/google.golang.org/grpc      |
| gRPC v1.2     | https://github.com/grpc/grpc-go         | https://godoc.org/github.com/DataDog/dd-trace-go/contrib/google.golang.org/grpc.v12  |

### Library Compatibility

It also includes support for the following data stores and libraries:


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

The repository contains a package which can be used to expose the Datadog tracer as an [OpenTracing][3] compatible tracer. The usage is simple, straight-forward and
can be accomplished by importing the [`opentracer` package][opentracing godoc].

### Example

A basic usage example can be seen below.

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

Note that using the [OpenTracing API][4] in parallel with the regular API or our integrations is fully supported. Under the hood, all of them
make use of the same tracer. Make sure to check out the [API documentation][opentracing godoc] for more examples and details.

## Further Reading

More information on topics such as distributed tracing and sampling priority can be found in the [package documentation][tracer godoc].

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/setup
[3]: http://opentracing.io
[4]: https://github.com/opentracing/opentracing-go
[tracer godoc]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer
[contrib godoc]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib
[opentracing godoc]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/ddtrace/opentracer
