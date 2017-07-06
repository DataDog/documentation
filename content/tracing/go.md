---
title: Tracing Go Applications
kind: Documentation
autotocdepth: 2
hideguides: true
customnav: tracingnav
---

### Installation

To begin tracing applications written in Go, first [install and configure the Datadog Agent](/tracing#installing-the-agent).

Next, install the Go Tracer from the Github repository:

~~~
go get "github.com/DataDog/dd-trace-go/tracer"
~~~

Finally, import the tracer and instrument your code!

### Example

~~~
package main

import (
  "github.com/DataDog/dd-trace-go/tracer"
)

func main {
  span := tracer.NewRootSpan("web.request", "my_service", "resource_name")
  defer span.Finish()
  span.SetMeta("my_tag", "my_value")
}
~~~

For another example, see the [`example_test.go`](https://github.com/DataDog/dd-trace-go/blob/master/tracer/example_test.go) file in the Go Tracer package


### Compatibility

Currently, only Go 1.7 is supported. The following Go libraries are supported:

- [Gin](https://github.com/gin-gonic/gin)
- [Gorilla Mux](https://github.com/gorilla/mux)
- [gRPC](https://github.com/grpc/grpc-go)

### Additional Information

The Go integration [source code can be found on Github](https://github.com/DataDog/dd-trace-go).

You can find additional documentation on [the GoDoc Package page](https://godoc.org/github.com/DataDog/dd-trace-go/tracer).
