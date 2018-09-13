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
- link: "tracing/advanced_usage/?tab=go"
  tag: "Advanced Usage"
  text: "Advanced Usage"
---
## Installation and Getting Started

For configuration instructions and details about using the API, check out the Datadog [API documentation][api docs] for manual instrumentation, and the [integrations section][contrib docs] for Go libraries and frameworks supporting automatic instrumentation.

For a description of the terminology used in APM, take a look at the [Getting started with APM section][getting started]. For details about contributing, check the official repository [README.md file][repo readme].

Consult the [migration document][migrating] if you need to migrate from an older version of the tracer (e.g. v<0.6.x) to newest version.

### Installation
First [install and configure the Datadog Agent][1] (see additional documentation for [tracing Docker applications](/tracing/setup/docker/)).

Next, install the Go tracer from its canonical import path:

```go
go get gopkg.in/DataDog/dd-trace-go.v1/ddtrace
```

You are now ready to import the tracer and start instrumenting your code!

## Automatic Instrumentation

We have built a series of pluggable packages which provide out-of-the-box support for instrumenting a series of libraries and frameworks. Find below the list of supported [integrations][ootb integrations].

[ootb integrations]: #integrations

## Compatibility
To begin tracing your Go applications, your environment must first meet the following requirements:

* Runing the Datadog Agent `>= 5.21.1`.
* Using Go `1.9+`


### Integrations

#### Framework Compatibility

Integrate the Go tracer with the following list of web frameworks using one of the following helper packages.

| Framework                                            | Support Type    | GoDoc Datadog Documentation                                                                                                                                |
| ---------------------------------------------------- | --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Gin](https://gin-gonic.github.io/gin/)              | Fully Supported | [gopkg.in/DataDog/dd-trace-go.v1/contrib/gin-gonic/gin](https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib/gin-gonic/gin)                           |
| [Gorilla Mux](http://www.gorillatoolkit.org/pkg/mux) | Fully Supported | [gopkg.in/DataDog/dd-trace-go.v1/contrib/gorilla/mux](https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib/gorilla/mux)                               |
| [gRPC](https://github.com/grpc/grpc-go)              | Fully Supported | [gopkg.in/DataDog/dd-trace-go.v1/contrib/google.golang.org/grpc](https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib/google.golang.org/grpc)         |
| [gRPC v1.2](https://github.com/grpc/grpc-go)         | Fully Supported | [gopkg.in/DataDog/dd-trace-go.v1/contrib/google.golang.org/grpc.v12](https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib/google.golang.org/grpc.v12) |

#### Library Compatibility

The Go tracer includes support for the following data stores and libraries.

| Library                                                    | Support Type     | GoDoc Datadog Documentation                                                                                                                            |
| ---------------------------------------------------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [AWS SDK](https://aws.amazon.com/sdk-for-go/)              | Fully Supported  | [gopkg.in/DataDog/dd-trace-go.v1/contrib/aws/aws-sdk-go/aws](https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib/aws/aws-sdk-go/aws)             |
| [Elasticsearch](https://github.com/olivere/elastic)        | Fully Supported  | [gopkg.in/DataDog/dd-trace-go.v1/contrib/olivere/elastic](https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib/olivere/elastic)                   |
| [Cassandra](https://github.com/gocql/gocql)                | Fully Supported  | [gopkg.in/DataDog/dd-trace-go.v1/contrib/gocql/gocql](https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib/gocql/gocql)                           |
| [GraphQL](https://github.com/graph-gophers/graphql-go)     | Fully Supported  | [gopkg.in/DataDog/dd-trace-go.v1/contrib/graph-gophers/graphql-go](https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib/graph-gophers/graphql-go) |
| [HTTP](https://golang.org/pkg/net/http/)                   | Fully Supported  | [gopkg.in/DataDog/dd-trace-go.v1/contrib/net/http](https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib/net/http)                                 |
| [HTTP router](https://github.com/julienschmidt/httprouter) | Fully Supported  | [gopkg.in/DataDog/dd-trace-go.v1/contrib/julienschmidt/httprouter](https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib/julienschmidt/httprouter) |
| [Redis (go-redis)](https://github.com/go-redis/redis)      | Fully Supported  | [gopkg.in/DataDog/dd-trace-go.v1/contrib/go-redis/redis](https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib/go-redis/redis)                     |
| [Redis (redigo)](https://github.com/garyburd/redigo)       | Fully Supported  | [gopkg.in/DataDog/dd-trace-go.v1/contrib/garyburd/redigo](https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib/garyburd/redigo)                   |
| [SQL](https://golang.org/pkg/database/sql)                 | Fully Supported  | [gopkg.in/DataDog/dd-trace-go.v1/contrib/database/sql](https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib/database/sql)                         |
| [SQLx](https://github.com/jmoiron/sqlx)                    | Fully Supported  | [gopkg.in/DataDog/dd-trace-go.v1/contrib/jmoiron/sqlx](https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib/jmoiron/sqlx)                         |

**Note**: The [integrations documentation][contrib godoc] also provides a detailed overview of the supported packages and their APIs, along with usage examples.

## Configuration

The tracer is configured with options parameters when the `Start` function is called. A list of available options are:

```go
package main

import "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer"

func main() {
    // Start the tracer with zero or more options.
    tracer.Start(tracer.WithServiceName("my-service"))
    defer tracer.Stop()
}
```

For more tracer settings, see available options in the [configuration documentation][config docs].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/setup
[contrib godoc]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib
[api docs]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/ddtrace
[config docs]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer#StartOption
[contrib docs]: #automatic-instrumentation
[getting started]: https://docs.datadoghq.com/tracing/visualization/
[repo readme]: https://github.com/DataDog/dd-trace-go/tree/v1#contributing
[migrating]: https://github.com/DataDog/dd-trace-go/tree/v1/MIGRATING.md
