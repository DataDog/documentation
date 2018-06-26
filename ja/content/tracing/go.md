---
autotocdepth: 2
customnav: tracingnav
hideguides: true
kind: Documentation
placeholder: true
title: Tracing Go Applications
---

<div class='alert alert-info'><strong>NOTICE:</strong>アクセスいただきありがとうございます。こちらのページは現在英語のみのご用意となっております。引き続き日本語化の範囲を広げてまいりますので、皆様のご理解のほどよろしくお願いいたします。</div>

### Installation

To begin tracing applications written in Go, first [install and configure the Datadog Agent](/tracing).

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

You can find additional documentation on [the GoDoc Package page](https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer).
