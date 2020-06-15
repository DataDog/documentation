---
title: Tracing Go Applications
kind: documentation
aliases:
- /tracing/go/
- /tracing/languages/go
- /agent/apm/go/
further_reading:
- link: "https://github.com/DataDog/dd-trace-go/tree/v1"
  tag: "GitHub"
  text: "Source code"
- link: "https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/ddtrace"
  tag: "GoDoc"
  text: "Package page"
- link: "/tracing/visualization/"
  tag: "Documentation"
  text: "Explore your services, resources and traces"
- link: "/tracing/"
  tag: "Advanced Usage"
  text: "Advanced Usage"
---
## Installation and Getting Started

For configuration instructions and details about using the API, see the Datadog [API documentation][1]. For manual instrumentation, use the [integrations section](#integrations) below for Go libraries and frameworks supporting automatic instrumentation.

For a description of the terminology used in APM, see the [Getting started with APM section][2]. For details about contributing, check the official repository [README.md][3].

Consult the [migration document][4] if you need to migrate from an older version of the tracer (e.g. v<0.6.x) to the newest version.

### Installation

If you already have a Datadog account you can find [step-by-step instructions][5] in our in-app guides for either host-based or container-based set ups.

First [install and configure the Datadog Agent][6]. See the additional documentation for [tracing Docker applications][7] or [Kubernetes applications][8].

Next, install the Go tracer from its canonical import path:

```go
go get gopkg.in/DataDog/dd-trace-go.v1/ddtrace
```

You are now ready to import the tracer and start instrumenting your code.

## Automatic Instrumentation

Datadog has a series of pluggable packages which provide out-of-the-box support for instrumenting a series of libraries and frameworks. Find the list of supported [integrations](#integrations) below.

## Compatibility

To begin tracing your Go applications, your environment must first meet the following requirements:

* Running the Datadog Agent `>= 5.21.1`.
* Using Go `1.12+`

### Integrations

#### Framework Compatibility

Integrate the Go tracer with the following list of web frameworks using one of the following helper packages.

| Framework         | Support Type    | GoDoc Datadog Documentation                                              |
|-------------------|-----------------|--------------------------------------------------------------------------|
| [Gin][9]          | Fully Supported | [gopkg.in/DataDog/dd-trace-go.v1/contrib/gin-gonic/gin][10]               |
| [Gorilla Mux][11] | Fully Supported | [gopkg.in/DataDog/dd-trace-go.v1/contrib/gorilla/mux][12]                |
| [gRPC][13]        | Fully Supported | [gopkg.in/DataDog/dd-trace-go.v1/contrib/google.golang.org/grpc][14]     |
| [gRPC v1.2][13]   | Fully Supported | [gopkg.in/DataDog/dd-trace-go.v1/contrib/google.golang.org/grpc.v12][15] |
| [chi][16]         | Fully Supported | [gopkg.in/DataDog/dd-trace-go.v1/contrib/go-chi/chi][17] |
| [echo][18]        | Fully Supported | [gopkg.in/DataDog/dd-trace-go.v1/contrib/labstack/echo][19]              |

#### Library Compatibility

The Go tracer includes support for the following data stores and libraries.

| Library                 | Support Type    | Examples and Documentation                                                      |
|-------------------------|-----------------|---------------------------------------------------------------------------------|
| [AWS SDK][20]           | Fully Supported | [gopkg.in/DataDog/dd-trace-go.v1/contrib/aws/aws-sdk-go/aws][21]                |
| [Elasticsearch][22]     | Fully Supported | [gopkg.in/DataDog/dd-trace-go.v1/contrib/olivere/elastic][23]                   |
| [Cassandra][24]         | Fully Supported | [gopkg.in/DataDog/dd-trace-go.v1/contrib/gocql/gocql][25]                       |
| [GraphQL][26]           | Fully Supported | [gopkg.in/DataDog/dd-trace-go.v1/contrib/graph-gophers/graphql-go][27]          |
| [HTTP][28]              | Fully Supported | [gopkg.in/DataDog/dd-trace-go.v1/contrib/net/http][29]                          |
| [HTTP router][30]       | Fully Supported | [gopkg.in/DataDog/dd-trace-go.v1/contrib/julienschmidt/httprouter][31]          |
| [Redis (go-redis)][32]  | Fully Supported | [gopkg.in/DataDog/dd-trace-go.v1/contrib/go-redis/redis][33]                    |
| [Redis (redigo)][34]    | Fully Supported | [gopkg.in/DataDog/dd-trace-go.v1/contrib/garyburd/redigo][35]                   |
| [Redis (new redigo)][36]| Fully Supported | [gopkg.in/DataDog/dd-trace-go.v1/contrib/gomodule/redigo][37]                   |
| [SQL][38]               | Fully Supported | [gopkg.in/DataDog/dd-trace-go.v1/contrib/database/sql][39]                      |
| [SQLx][40]              | Fully Supported | [gopkg.in/DataDog/dd-trace-go.v1/contrib/jmoiron/sqlx][41]                      |
| [MongoDB][42]           | Fully Supported | [gopkg.in/DataDog/dd-trace-go.v1/contrib/go.mongodb.org/mongo-driver/mongo][43] |
| [MongoDB (mgo)      | Fully Supported | [gopkg.in/DataDog/dd-trace-go.v1/contrib/globalsign/mgo][44]                    |
| [BuntDB][45]            | Fully Supported | [gopkg.in/DataDog/dd-trace-go.v1/contrib/tidwall/buntdb][46]                    |
| [LevelDB][47]           | Fully Supported | [gopkg.in/DataDog/dd-trace-go.v1/contrib/syndtr/goleveldb/leveldb][48]          |
| [miekg/dns][49]         | Fully Supported | [gopkg.in/DataDog/dd-trace-go.v1/contrib/miekg/dns][50]                         |
| [Kafka (confluent)][51] | Fully Supported | [gopkg.in/DataDog/dd-trace-go.v1/contrib/confluentinc/confluent-kafka-go][52]   |
| [Kafka (sarama)][53]    | Fully Supported | [gopkg.in/DataDog/dd-trace-go.v1/contrib/Shopify/sarama][54]                    |
| [Google API][55]        | Fully Supported | [gopkg.in/DataDog/dd-trace-go.v1/contrib/google.golang.org/api][56]             |
| [go-restful][57]        | Fully Supported | [gopkg.in/DataDog/dd-trace-go.v1/contrib/emicklei/go-restful][58]               |
| [Twirp][59]             | Fully Supported | [gopkg.in/DataDog/dd-trace-go.v1/contrib/twitchtv/twirp][60]                    |
| [Vault][61]             | Fully Supported | [gopkg.in/DataDog/dd-trace-go.v1/contrib/hashicorp/vault][62]                   |
| [Consul][63]            | Fully Supported | [gopkg.in/DataDog/dd-trace-go.v1/contrib/hashicorp/consul][64]                  |
| [Gorm][65]              | Fully Supported | [gopkg.in/DataDog/dd-trace-go.v1/contrib/jinzhu/gorm][66]                       |
| [Kubernetes][67]        | Fully Supported | [gopkg.in/DataDog/dd-trace-go.v1/contrib/k8s.io/client-go/kubernetes][68]       |
| [Memcache][69]          | Fully Supported | [gopkg.in/DataDog/dd-trace-go.v1/contrib/bradfitz/gomemcache/memcache][70]      |

**Note**: The [integrations documentation][71] provides a detailed overview of the supported packages and their APIs, along with usage examples.

Packages must be imported, i.e.:

```go
import "gopkg.in/DataDog/dd-trace-go.v1/contrib/<PACKAGE_DIR>/<PACKAGE_NAME>"
```

## Configuration

The Go tracer supports additional environment variables and functions for configuration.
See all available options in the [configuration documentation][72].

We highly recommend using `DD_ENV`, `DD_SERVICE`, and `DD_VERSION` to set `env`, `service`, and `version` for your services.
Check out the [Unified Service Tagging][73] documentation for recommendations on how to configure these environment variables.

You may also elect to provide `env`, `service`, and `version` through the tracer's API:

```go
package main

import (
    "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer"
)

func main() {
    tracer.Start(
        tracer.WithEnv("prod"),
        tracer.WithService("test-go"),
        tracer.WithVersion("abc123"),
    )
    defer tracer.Stop()
}
```

### Change Agent Hostname

The Go Tracing Module automatically looks for and initializes with the environment variables `DD_AGENT_HOST` and `DD_AGENT_APM_PORT`.

But you can also set a custom hostname and port in code:

```go
package main

import (
    "net"

    "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer"
)

func main() {
    addr := net.JoinHostPort(
        "custom-hostname",
        "1234",
    )
    tracer.Start(tracer.WithAgentAddr(addr))
    defer tracer.Stop()
}
```

### B3 Headers Extraction and Injection

The Datadog APM tracer supports [B3 headers extraction][74] and injection for distributed tracing.

Distributed headers injection and extraction is controlled by
configuring injection/extraction styles. Two styles are
supported: `Datadog` and `B3`.

Configure injection styles using the environment variable
`DD_PROPAGATION_STYLE_INJECT=Datadog,B3`

Configure extraction styles using the environment variable
`DD_PROPAGATION_STYLE_EXTRACT=Datadog,B3`

The values of these environment variables are comma separated lists of
header styles that are enabled for injection or extraction. By default only
the `Datadog` extraction style is enabled.

If multiple extraction styles are enabled, extraction attempts are made
in the order that those styles are specified. The first successfully
extracted value is used.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/ddtrace
[2]: /tracing/visualization/
[3]: https://github.com/DataDog/dd-trace-go/tree/v1#contributing
[4]: https://github.com/DataDog/dd-trace-go/tree/v1/MIGRATING.md
[5]: /tracing/send_traces/
[6]: https://app.datadoghq.com/apm/install
[7]: /tracing/setup/docker/
[8]: /agent/kubernetes/apm/
[9]: https://gin-gonic.com
[10]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib/gin-gonic/gin
[11]: http://www.gorillatoolkit.org/pkg/mux
[12]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib/gorilla/mux
[13]: https://github.com/grpc/grpc-go
[14]: https://godoc.org/****gopkg****.in/DataDog/dd-trace-go.v1/contrib/google.golang.org/grpc
[15]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib/google.golang.org/grpc.v12
[16]: https://github.com/go-chi/chi
[17]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib/go-chi/chi
[18]: https://github.com/labstack/echo
[19]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib/labstack/echo
[20]: https://aws.amazon.com/sdk-for-go
[21]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib/aws/aws-sdk-go/aws
[22]: https://github.com/olivere/elastic
[23]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib/olivere/elastic
[24]: https://github.com/gocql/gocql
[25]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib/gocql/gocql
[26]: https://github.com/graph-gophers/graphql-go
[27]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib/graph-gophers/graphql-go
[28]: https://golang.org/pkg/net/http
[29]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib/net/http
[30]: https://github.com/julienschmidt/httprouter
[31]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib/julienschmidt/httprouter
[32]: https://github.com/go-redis/redis
[33]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib/go-redis/redis
[34]: https://github.com/garyburd/redigo
[35]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib/garyburd/redigo
[36]: https://github.com/gomodule/redigo
[37]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib/gomodule/redigo
[38]: https://golang.org/pkg/database/sql
[39]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib/database/sql
[40]: https://github.com/jmoiron/sqlx
[41]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib/jmoiron/sqlx
[42]: https://github.com/mongodb/mongo-go-driver
[43]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib/go.mongodb.org/mongo-driver/mongo
[44]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib/globalsign/mgo
[45]: https://github.com/tidwall/buntdb
[46]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib/tidwall/buntdb
[47]: https://github.com/syndtr/goleveldb
[48]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib/syndtr/goleveldb/leveldb
[49]: https://github.com/miekg/dns
[50]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib/miekg/dns
[51]: https://github.com/confluentinc/confluent-kafka-go
[52]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib/confluentinc/confluent-kafka-go
[53]: https://github.com/Shopify/sarama
[54]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib/Shopify/sarama
[55]: https://github.com/googleapis/google-api-go-client
[56]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib/google.golang.org/api
[57]: https://github.com/emicklei/go-restful
[58]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib/emicklei/go-restful
[59]: https://github.com/twitchtv/twirp
[60]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib/twitchtv/twirp
[61]: https://github.com/hashicorp/vault
[62]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib/hashicorp/vault
[63]: https://github.com/hashicorp/consul
[64]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib/hashicorp/consul
[65]: https://github.com/jinzhu/gorm
[66]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib/jinzhu/gorm
[67]: https://github.com/kubernetes/client-go
[68]: https://godoc.org/k8s.io/client-go/kubernetes
[69]: https://github.com/bradfitz/gomemcache/memcache
[70]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib/bradfitz/gomemcache/memcache
[71]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib
[72]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer#StartOption
[73]: /getting_started/tagging/unified_service_tagging
[74]: https://github.com/openzipkin/b3-propagation
