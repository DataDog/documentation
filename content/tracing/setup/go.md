---
title: Tracing Go Applications
kind: Documentation
aliases:
- /tracing/go/
- /tracing/languages/go
further_reading:
- link: "https://github.com/DataDog/dd-trace-go/tree/v1"
  tag: "Github"
  text: "Source code"
- link: "https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/ddtrace"
  tag: "GoDoc"
  text: "Package page"
- link: "tracing/visualization/"
  tag: "Documentation"
  text: "Explore your services, resources and traces"
- link: "tracing/advanced_usage/?tab=go"
  tag: "Advanced Usage"
  text: "Advanced Usage"
---
## Installation and Getting Started

For configuration instructions and details about using the API, check out the Datadog [API documentation][1]. For manual instrumentation, use the [integrations section](#integrations) below for Go libraries and frameworks supporting automatic instrumentation.

For a description of the terminology used in APM, see the [Getting started with APM section][2]. For details about contributing, check the official repository [README.md][3].

Consult the [migration document][4] if you need to migrate from an older version of the tracer (e.g. v<0.6.x) to newest version.

### Installation
First [install and configure the Datadog Agent][5] (see additional documentation for [tracing Docker applications][6]).

Next, install the Go tracer from its canonical import path:

```go
go get gopkg.in/DataDog/dd-trace-go.v1/ddtrace
```

You are now ready to import the tracer and start instrumenting your code.

## Automatic Instrumentation

Datadog built a series of pluggable packages which provide out-of-the-box support for instrumenting a series of libraries and frameworks. Find the list of supported [integrations](#integrations) below.

## Compatibility
To begin tracing your Go applications, your environment must first meet the following requirements:

* Runing the Datadog Agent `>= 5.21.1`.
* Using Go `1.9+`


### Integrations

#### Framework Compatibility

Integrate the Go tracer with the following list of web frameworks using one of the following helper packages.

| Framework        | Support Type    | GoDoc Datadog Documentation                                              |
|------------------|-----------------|--------------------------------------------------------------------------|
| [Gin][7]         | Fully Supported | [gopkg.in/DataDog/dd-trace-go.v1/contrib/gin-gonic/gin][8]               |
| [Gorilla Mux][9] | Fully Supported | [gopkg.in/DataDog/dd-trace-go.v1/contrib/gorilla/mux][10]                |
| [gRPC][11]       | Fully Supported | [gopkg.in/DataDog/dd-trace-go.v1/contrib/google.golang.org/grpc][12]     |
| [gRPC v1.2][13]  | Fully Supported | [gopkg.in/DataDog/dd-trace-go.v1/contrib/google.golang.org/grpc.v12][14] |

#### Library Compatibility

The Go tracer includes support for the following data stores and libraries.

| Library                 | Support Type        | Examples and Documentation                                                    |
|-------------------------|---------------------|-------------------------------------------------------------------------------|
| [AWS SDK][15]           | Fully Supported     | [gopkg.in/DataDog/dd-trace-go.v1/contrib/aws/aws-sdk-go/aws][16]              |
| [Elasticsearch][17]     | Fully Supported     | [gopkg.in/DataDog/dd-trace-go.v1/contrib/olivere/elastic][18]                 |
| [Cassandra][19]         | Fully Supported     | [gopkg.in/DataDog/dd-trace-go.v1/contrib/gocql/gocql][20]                     |
| [GraphQL][21]           | Fully Supported     | [gopkg.in/DataDog/dd-trace-go.v1/contrib/graph-gophers/graphql-go][22]        |
| [HTTP][23]              | Fully Supported     | [gopkg.in/DataDog/dd-trace-go.v1/contrib/net/http][24]                        |
| [HTTP router][25]       | Fully Supported     | [gopkg.in/DataDog/dd-trace-go.v1/contrib/julienschmidt/httprouter][26]        |
| [Redis (go-redis)][27]  | Fully Supported     | [gopkg.in/DataDog/dd-trace-go.v1/contrib/go-redis/redis][28]                  |
| [Redis (redigo)][29]    | Fully Supported     | [gopkg.in/DataDog/dd-trace-go.v1/contrib/garyburd/redigo][30]                 |
| [SQL][31]               | Fully Supported     | [gopkg.in/DataDog/dd-trace-go.v1/contrib/database/sql][32]                    |
| [SQLx][33]              | Fully Supported     | [gopkg.in/DataDog/dd-trace-go.v1/contrib/jmoiron/sqlx][34]                    |
| [MongoDB][35]           | [Alpha 17][36] only | [gopkg.in/DataDog/dd-trace-go.v1/contrib/mongodb/mongo-go-driver/mongo][37]   |
| [BuntDB][38]            | Fully Supported     | [gopkg.in/DataDog/dd-trace-go.v1/contrib/tidwall/buntdb][39]                  |
| [LevelDB][40]           | Fully Supported     | [gopkg.in/DataDog/dd-trace-go.v1/contrib/syndtr/goleveldb/leveldb][41]        |
| [miekg/dns][42]         | Fully Supported     | [gopkg.in/DataDog/dd-trace-go.v1/contrib/miekg/dns][43]                       |
| [Kafka (confluent)][44] | Fully Supported     | [gopkg.in/DataDog/dd-trace-go.v1/contrib/confluentinc/confluent-kafka-go][45] |
| [Kafka (sarama)][46]    | Fully Supported     | [gopkg.in/DataDog/dd-trace-go.v1/contrib/Shopify/sarama][47]                  |
| [Google API][48]        | Fully Supported     | [gopkg.in/DataDog/dd-trace-go.v1/contrib/google.golang.org/api][49]           |
| [go-restful][50]        | Fully Supported     | [gopkg.in/DataDog/dd-trace-go.v1/contrib/emicklei/go-restful][51]             |

**Note**: The [integrations documentation][52] provides a detailed overview of the supported packages and their APIs, along with usage examples.

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

For more tracer settings, see available options in the [configuration documentation][53].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/ddtrace
[2]: /tracing/visualization
[3]: https://github.com/DataDog/dd-trace-go/tree/v1#contributing
[4]: https://github.com/DataDog/dd-trace-go/tree/v1/MIGRATING.md
[5]: /tracing/setup
[6]: /tracing/setup/docker
[7]: https://gin-gonic.github.io/gin
[8]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib/gin-gonic/gin
[9]: http://www.gorillatoolkit.org/pkg/mux
[10]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib/gorilla/mux
[11]: https://github.com/grpc/grpc-go
[12]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib/google.golang.org/grpc
[13]: https://github.com/grpc/grpc-go
[14]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib/google.golang.org/grpc.v12
[15]: https://aws.amazon.com/sdk-for-go
[16]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib/aws/aws-sdk-go/aws
[17]: https://github.com/olivere/elastic
[18]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib/olivere/elastic
[19]: https://github.com/gocql/gocql
[20]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib/gocql/gocql
[21]: https://github.com/graph-gophers/graphql-go
[22]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib/graph-gophers/graphql-go
[23]: https://golang.org/pkg/net/http
[24]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib/net/http
[25]: https://github.com/julienschmidt/httprouter
[26]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib/julienschmidt/httprouter
[27]: https://github.com/go-redis/redis
[28]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib/go-redis/redis
[29]: https://github.com/garyburd/redigo
[30]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib/garyburd/redigo
[31]: https://golang.org/pkg/database/sql
[32]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib/database/sql
[33]: https://github.com/jmoiron/sqlx
[34]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib/jmoiron/sqlx
[35]: https://github.com/mongodb/mongo-go-driver
[36]: https://github.com/mongodb/mongo-go-driver/releases/tag/v0.0.17
[37]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib/mongodb/mongo-go-driver/mongo
[38]: https://github.com/tidwall/buntdb
[39]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib/tidwall/buntdb
[40]: https://github.com/syndtr/goleveldb
[41]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib/syndtr/goleveldb/leveldb
[42]: https://github.com/miekg/dns
[43]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib/miekg/dns
[44]: https://github.com/confluentinc/confluent-kafka-go
[45]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib/confluentinc/confluent-kafka-go
[46]: https://github.com/Shopify/sarama
[47]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib/Shopify/sarama
[48]: https://github.com/googleapis/google-api-go-client
[49]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib/google.golang.org/api
[50]: https://github.com/emicklei/go-restful
[51]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib/emicklei/go-restful
[52]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib
[53]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer#StartOption
