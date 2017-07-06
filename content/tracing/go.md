---
title: Tracing Go Applications
kind: Documentation
autotocdepth: 2
hideguides: true
customnav: tracingnav
---

### Installation

To begin tracing applications written in Go you need to:

 - [Install and configure the Datadog Agent](/tracing#installing-the-agent).

 -  Install the Go Tracer from the Github repository:

~~~
go get "github.com/DataDog/dd-trace-go/tracer"
~~~

This Package contains Datadog's tracing client. It is used to trace requests as they flow across web servers, databases and microservices so that developers have visibility into bottlenecks and troublesome requests.

Package tracer has two core objects: Tracers and Spans. Spans represent a chunk of computation time. They have names, durations, timestamps and other metadata. Tracers are used to create hierarchies of spans in a request, buffer and submit them to the server.

The tracing client can perform trace sampling. While the trace agent already samples traces to reduce bandwidth usage, client sampling reduces performance overhead.

  - Import the tracer and instrument your code!

[Learn more about this package on our go doc](https://godoc.org/github.com/DataDog/dd-trace-go/tracer)

To enable APM and/or tracing of supported integrations, follow the instructions for the appropriate package:

| Path | Synopsis |
| [contrib/elastictraced](https://godoc.org/github.com/DataDog/dd-trace-go/tracer/contrib/elastictraced) | Package elastictraced provides tracing for the Elastic Elasticsearch client. |
| [contrib/gin-gonic/gintrace](https://godoc.org/github.com/DataDog/dd-trace-go/tracer/contrib/gin-gonic/gintrace) | Package gintrace provides tracing middleware for the Gin web framework. |
| [contrib/go-redis](https://godoc.org/github.com/DataDog/dd-trace-go/tracer#pkg-subdirectories) | Package goredistrace provides tracing for the go-redis Redis client (https://github.com/go-redis/redis) |
| [contrib/gorilla/muxtrace](https://godoc.org/github.com/DataDog/dd-trace-go/tracer/contrib/gorilla/muxtrace) | Package muxtrace provides tracing functions for the Gorilla Mux framework. |
| [contrib/redigo](https://godoc.org/github.com/DataDog/dd-trace-go/tracer/contrib/redigo) | Package redigotrace provides tracing for the Redigo Redis client (https://github.com/garyburd/redigo) |
| [contrib/sqltraced](https://godoc.org/github.com/DataDog/dd-trace-go/tracer/contrib/sqltraced) | Package sqltraced provides a traced version of any driver implementing the database/sql/driver interface. |
| [contrib/sqltraced/parsedsn](https://godoc.org/github.com/DataDog/dd-trace-go/tracer/contrib/sqltraced/parsedsn) | Package parsedsn provides functions to parse any kind of DSNs into a map[string]string |
| [contrib/sqltraced/parsedsn/mysql](https://godoc.org/github.com/DataDog/dd-trace-go/tracer/contrib/sqltraced/parsedsn/mysql) | Package mysql is the minimal fork of go-sql-driver/mysql so we can use their code to parse the mysql DSNs |
| [contrib/sqltraced/parsedsn/pq](https://godoc.org/github.com/DataDog/dd-trace-go/tracer/contrib/sqltraced/parsedsn/pq) | Package pq is the minimal fork of lib/pq so we can use their code to parse the postgres DSNs |
| [contrib/sqltraced/sqltest](https://godoc.org/github.com/DataDog/dd-trace-go/tracer/contrib/sqltraced/sqltest) | Package sqltest is used for testing sql packages |
| [contrib/sqltraced/sqlutils](https://godoc.org/github.com/DataDog/dd-trace-go/tracer/contrib/sqltraced/sqlutils) | Package sqlutils share some utils functions for sql testing |
| [contrib/sqlxtraced](https://godoc.org/github.com/DataDog/dd-trace-go/tracer/contrib/sqlxtraced) | Package sqlxtraced provides a traced version of the "jmoiron/sqlx" package For more information about the API, see https://godoc.org/github.com/DataDog/dd-trace-go/tracer/contrib/sqltraced. |
| [contrib/tracegrpc](https://godoc.org/github.com/DataDog/dd-trace-go/tracer/contrib/tracegrpc) | |
{:.table}

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
