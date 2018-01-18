---
title: Tracing Go Applications
kind: Documentation
aliases:
- /tracing/go/
---

## Installation

To begin tracing applications written in Go, first [install and configure the Datadog Agent](/tracing#installing-the-agent).

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

For another example, see the [`example_test.go`](https://github.com/DataDog/dd-trace-go/blob/master/tracer/example_test.go) file in the Go Tracer package

## Compatibility

Currently, only Go 1.7 is supported.

### Framework Compatibility

The ddtrace library includes support for a number of web frameworks, including:

___

{{% table responsive="true" %}}
| Framework   | Framework Documentation               | GoDoc Datadog Documentation                                                        |
|-------------|---------------------------------------|------------------------------------------------------------------------------------|
| Gin         | https://gin-gonic.github.io/gin/      | https://godoc.org/github.com/DataDog/dd-trace-go/tracer/contrib/gin-gonic/gintrace |
| Gorilla Mux | http://www.gorillatoolkit.org/pkg/mux | https://godoc.org/github.com/DataDog/dd-trace-go/tracer/contrib/gorilla/muxtrace   |
| gRPC        | https://github.com/grpc/grpc-go       | https://godoc.org/github.com/DataDog/dd-trace-go/tracer/contrib/tracegrpc          |
{{% /table %}}

### Library Compatibility

It also includes support for the following data stores and libraries:

___


{{% table responsive="true" %}}
| Library           | Library Documentation                            | GoDoc Datadog Documentation                                                              |
|-------------------|--------------------------------------------------|------------------------------------------------------------------------------------------|
| Elasticsearch     | https://olivere.github.io/elastic/               | https://godoc.org/github.com/DataDog/dd-trace-go/tracer/contrib/elastictraced            |
| Cassandra (gocql) | http://gocql.github.io/                          | https://godoc.org/github.com/DataDog/dd-trace-go/tracer/contrib/gocql                    |
| Redis             | https://godoc.org/github.com/go-redis/redis      | https://godoc.org/github.com/DataDog/dd-trace-go/tracer/contrib/redigo                   |
| MySQL             | https://godoc.org/github.com/go-sql-driver/mysql | https://godoc.org/github.com/DataDog/dd-trace-go/tracer/contrib/sqltraced/parsedsn/mysql |
| Postgres (lib/pq) | https://godoc.org/github.com/lib/pq              | https://godoc.org/github.com/DataDog/dd-trace-go/tracer/contrib/sqltraced/parsedsn/pq    |
{{% /table %}}

## Further Reading

{{< whatsnext >}}
    {{< nextlink href="https://github.com/DataDog/dd-trace-go" tag="Github" >}}Tracing Go integration source code{{< /nextlink >}}
    {{< nextlink href="https://godoc.org/github.com/DataDog/dd-trace-go/tracer" tag="Documentation" >}}GoDoc Package page{{< /nextlink >}}
{{< /whatsnext >}}
