---
title: Go Compatibility Requirements
description: 'Compatibility Requirements for the Go tracer'
aliases:
  - /tracing/compatibility_requirements/go
  - /tracing/setup_overview/compatibility_requirements/go
code_lang: go
type: multi-code-lang
code_lang_weight: 30
further_reading:
    - link: 'tracing/trace_collection/dd_libraries/go'
      tag: 'Documentation'
      text: 'Instrument Your Application'
---

## Compatibility

The Go Datadog Trace library is open source. View the [GitHub repository][1] for more information.

The Go Datadog Trace Library has a [version support policy][2] defined for Go versions. The two latest releases of Go are fully supported, while the third newest release is considered in maintenance. Older versions may function, but no support is provided by default. For special requests, [contact support][4].

### Requirements

- Datadog Agent v5.21.1+.
- Instrument your application before configuring integrations using one of the following methods:
  * [Automatically at compile time using `orchestrion`][78]
  * [Manually add and initialize the Datadog Go tracer][77]

### Go Tracer support

Datadog recommends v2 of the Go tracer for all users. If you are using v1, see the [migration guide][79] to upgrade to v2.

| Version	| Preview	   | General Availability (GA)	| Maintenance	| End-of-life (EOL) |
|---------|------------|----------------------------|-------------|-------------------|
| v2      | 2024-11-27 | 2025-06-04                 | TBD         | TBD               |
| v1      | 2018-06-06 | 2018-06-06                 | 2025-06-04  | 2025-12-31        |
| v0      | 2016-12-12 | 2016-12-12                 | 2018-06-06  | 2019-06-06        |

| Level	                    |  Support provided                                       |
|---------------------------|---------------------------------------------------------|
| Unsupported	              | No implementation. Contact [Datadog support][2] for special requests. |
| Preview	                  | Initial implementation. May not yet contain all features. Support for new features and bug and security fixes are provided on a best-effort basis.|
| General Availability (GA)	| Full implementation of all features. Full support for new features and bug and security fixes.|
| Maintenance	              | Full implementation of existing features. Does not receive new features. Support for bug and security fixes only.|
| End-of-life (EOL)	        | No support. |

### Integrations

#### Framework compatibility

Integrate the Go tracer with the following list of web frameworks using one of the following helper packages.

{{% tracing-go-v2 %}}

Supported frameworks have changed between v1 and v2 of the Go Tracer

{{< tabs >}}
{{% tab "v2" %}}

**Note**: The [integrations documentation][79] provides a detailed overview of the supported packages and their APIs, along with usage examples.

| Framework         | Support Type    | GoDoc Datadog Documentation                                              |
|-------------------|-----------------|--------------------------------------------------------------------------|
| [Gin][6]          | Fully Supported | [github.com/DataDog/dd-trace-go/contrib/gin-gonic/gin/v2][80]               |
| [Gorilla Mux][8] | Fully Supported | [github.com/DataDog/dd-trace-go/contrib/gorilla/mux/v2][81]                |
| [gRPC][10]        | Fully Supported | [github.com/DataDog/dd-trace-go/contrib/google.golang.org/grpc/v2][82]     |
| [chi][13]      | Fully Supported | [github.com/DataDog/dd-trace-go/contrib/go-chi/chi/v2][83] |
| [chi v5][13]      | Fully Supported | [github.com/DataDog/dd-trace-go/contrib/go-chi/chi.v5/v2][156] |
| [echo v4][15]     | Fully Supported | [github.com/DataDog/dd-trace-go/contrib/labstack/echo.v4/v2][84]           |
| [Fiber v2][18]    | Fully Supported | [github.com/DataDog/dd-trace-go/contrib/gofiber/fiber.v2/v2][85]              |
| [HTTPTreeMux v5][115] | Fully Supported | [github.com/DataDog/dd-trace-go/contrib/dimfeld/httptreemux.v5/v2][116]    |
| [HTTP router][30] | Fully Supported | [github.com/DataDog/dd-trace-go/contrib/julienschmidt/httprouter/v2][91]   |
| [Negroni][117]    | Fully Supported | [github.com/DataDog/dd-trace-go/contrib/urfave/negroni/v2][118]            |
| [Fasthttp][119]   | Fully Supported | [github.com/DataDog/dd-trace-go/contrib/valyala/fasthttp/v2][120]          |

#### Library compatibility

The Go tracer includes support for the following data stores and libraries.

| Library                 | Support Type    | Examples and Documentation                                                      |
|-------------------------|-----------------|---------------------------------------------------------------------------------|
| [AWS SDK][20]           | Fully Supported | [github.com/DataDog/dd-trace-go/contrib/aws/aws-sdk-go/aws/v2][86]                |
| [AWS SDK v2][75]        | Fully Supported | [github.com/DataDog/dd-trace-go/contrib/aws/aws-sdk-go-v2/aws/v2][113]                |
| [Elasticsearch][22]     | Fully Supported | [github.com/DataDog/dd-trace-go/contrib/olivere/elastic.v5/v2][87]                   |
| [Elasticsearch (elastic) v6][125] | Fully Supported | [github.com/DataDog/dd-trace-go/contrib/elastic/go-elasticsearch.v6/v2][126] |
| [Cassandra][24]         | Fully Supported | [github.com/DataDog/dd-trace-go/contrib/gocql/gocql/v2][88]                       |
| [GraphQL (graph-gophers)][26]           | Fully Supported | [github.com/DataDog/dd-trace-go/contrib/graph-gophers/graphql-go/v2][89]          |
| [GraphQL (graphql-go)][154]           | Fully Supported | [github.com/DataDog/dd-trace-go/contrib/graphql-go/graphql/v2][155]          |
| [GraphQL (gqlgen)][129] | Fully Supported | [github.com/DataDog/dd-trace-go/contrib/99designs/gqlgen/v2][130]                 |
| [HTTP][28]              | Fully Supported | [github.com/DataDog/dd-trace-go/contrib/net/http/v2][90]                          |
| [Redis (go-redis) v6][131] | Fully Supported | [github.com/DataDog/dd-trace-go/contrib/go-redis/redis/v2][153]             |
| [Redis (go-redis) v7][131] | Fully Supported | [github.com/DataDog/dd-trace-go/contrib/go-redis/redis.v7/v2][132]             |
| [Redis (go-redis) v8][131]| Fully Supported | [github.com/DataDog/dd-trace-go/contrib/go-redis/redis.v8/v2][93]                |
| [Redis (go-redis) v9][133]| Fully Supported | [github.com/DataDog/dd-trace-go/contrib/redis/go-redis.v9/v2][134]               |
| [Redis (redigo)][36]    | Fully Supported | [github.com/DataDog/dd-trace-go/contrib/garyburd/redigo/v2][94]                   |
| [Redis (new redigo)][38]| Fully Supported | [github.com/DataDog/dd-trace-go/contrib/gomodule/redigo/v2][95]                   |
| [SQL][40]               | Fully Supported | [github.com/DataDog/dd-trace-go/contrib/database/sql/v2][96]                      |
| [SQLx][42]              | Fully Supported | [github.com/DataDog/dd-trace-go/contrib/jmoiron/sqlx/v2][97]                      |
| [PostgreSQL (pgx v5)][135] | Fully Supported | [github.com/DataDog/dd-trace-go/contrib/jackc/pgx.v5/v2][136]                  |
| [MongoDB][44]           | Fully Supported | [github.com/DataDog/dd-trace-go/contrib/go.mongodb.org/mongo-driver/mongo/v2][98] |
| [MongoDB (mgo)][114]      | Fully Supported | [github.com/DataDog/dd-trace-go/contrib/globalsign/mgo/v2][99]                    |
| [Gorm v1][69]           | Fully Supported | [github.com/DataDog/dd-trace-go/contrib/gorm.io/gorm.v1/v2][110]                   |
| [BuntDB][47]            | Fully Supported | [github.com/DataDog/dd-trace-go/contrib/tidwall/buntdb/v2][100]                    |
| [LevelDB][49]           | Fully Supported | [github.com/DataDog/dd-trace-go/contrib/syndtr/goleveldb/leveldb/v2][101]          |
| [miekg/dns][51]         | Fully Supported | [github.com/DataDog/dd-trace-go/contrib/miekg/dns/v2][102]                         |
| [Kafka (confluent)][53] | Fully Supported | [github.com/DataDog/dd-trace-go/contrib/confluentinc/confluent-kafka-go/kafka/v2][103]   |
| [Kafka (confluent v2)][53] | Fully Supported | [github.com/DataDog/dd-trace-go/contrib/confluentinc/confluent-kafka-go/kafka.v2/v2][139] |
| [Kafka (sarama)][55]    | Fully Supported | [github.com/DataDog/dd-trace-go/contrib/IBM/sarama/v2][104]                     |
| [Kafka (sarama v1)][140] | Fully Supported | [github.com/DataDog/dd-trace-go/contrib/IBM/sarama.v1/v2][141]                  |
| [Kafka (Shopify sarama)][142] | Fully Supported | [github.com/DataDog/dd-trace-go/contrib/Shopify/sarama/v2][143]             |
| [Kafka (segmentio)][144] | Fully Supported | [github.com/DataDog/dd-trace-go/contrib/segmentio/kafka-go/v2][145]             |
| [Google API][57]        | Fully Supported | [github.com/DataDog/dd-trace-go/contrib/google.golang.org/api/v2][105]             |
| [Google Pub/Sub v1][147] | Fully Supported | [github.com/DataDog/dd-trace-go/contrib/cloud.google.com/go/pubsub.v1/v2][148]    |
| [Google Pub/Sub v2][158] | Fully Supported | [github.com/DataDog/dd-trace-go/contrib/cloud.google.com/go/pubsub.v2/v2][157]    |
| [go-restful v3][59]     | Fully Supported | [github.com/DataDog/dd-trace-go/contrib/emicklei/go-restful.v3/v2][106]               |
| [Twirp][61]             | Fully Supported | [github.com/DataDog/dd-trace-go/contrib/twitchtv/twirp/v2][107]                    |
| [Vault][63]             | Fully Supported | [github.com/DataDog/dd-trace-go/contrib/hashicorp/vault/v2][108]                   |
| [Consul][65]            | Fully Supported | [github.com/DataDog/dd-trace-go/contrib/hashicorp/consul/v2][109]                  |
| [Kubernetes][71]        | Fully Supported | [github.com/DataDog/dd-trace-go/contrib/k8s.io/client-go/kubernetes/v2][111]       |
| [Memcache][73]          | Fully Supported | [github.com/DataDog/dd-trace-go/contrib/bradfitz/gomemcache/memcache/v2][112]      |
| [Logrus][149]           | Fully Supported | [github.com/DataDog/dd-trace-go/contrib/sirupsen/logrus/v2][150]                   |
| [go-pg v10][151] | Fully Supported | [github.com/DataDog/dd-trace-go/v2/contrib/go-pg/pg.v10][152] |

Packages must be imported with:

```go
import "github.com/DataDog/dd-trace-go/contrib/<PACKAGE_DIR>/<PACKAGE_NAME>/v2"
```

[79]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/v2/contrib
[6]: https://gin-gonic.com
[80]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/contrib/gin-gonic/gin/v2
[8]: http://www.gorillatoolkit.org/pkg/mux
[81]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/contrib/gorilla/mux/v2
[10]: https://github.com/grpc/grpc-go
[82]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/contrib/google.golang.org/grpc/v2
[13]: https://github.com/go-chi/chi
[83]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/contrib/go-chi/chi/v2
[15]: https://github.com/labstack/echo
[84]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/contrib/labstack/echo.v4/v2
[18]: https://github.com/gofiber/fiber
[85]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/contrib/gofiber/fiber.v2/v2
[20]: https://aws.amazon.com/sdk-for-go
[86]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/contrib/aws/aws-sdk-go/aws/v2
[75]: https://aws.github.io/aws-sdk-go-v2/docs/
[113]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/contrib/aws/aws-sdk-go-v2/aws/v2
[22]: https://github.com/olivere/elastic
[87]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/contrib/olivere/elastic.v5/v2
[24]: https://github.com/gocql/gocql
[88]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/contrib/gocql/gocql/v2
[26]: https://github.com/graph-gophers/graphql-go
[89]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/contrib/graph-gophers/graphql-go/v2
[28]: https://golang.org/pkg/net/http
[90]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/contrib/net/http/v2
[30]: https://github.com/julienschmidt/httprouter
[91]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/contrib/julienschmidt/httprouter/v2
[32]: https://github.com/go-redis/redis
[92]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/contrib/go-redis/redis/v2
[93]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/contrib/go-redis/redis.v8/v2
[36]: https://github.com/garyburd/redigo
[94]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/contrib/garyburd/redigo/v2
[38]: https://github.com/gomodule/redigo
[95]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/contrib/gomodule/redigo/v2
[40]: https://golang.org/pkg/database/sql
[96]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/contrib/database/sql/v2
[42]: https://github.com/jmoiron/sqlx
[97]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/contrib/jmoiron/sqlx/v2
[44]: https://github.com/mongodb/mongo-go-driver
[98]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/contrib/go.mongodb.org/mongo-driver/mongo/v2
[73]: https://github.com/bradfitz/gomemcache/memcache
[99]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/contrib/globalsign/mgo/v2
[47]: https://github.com/tidwall/buntdb
[100]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/contrib/tidwall/buntdb/v2
[49]: https://github.com/syndtr/goleveldb
[101]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/contrib/syndtr/goleveldb/leveldb/v2
[51]: https://github.com/miekg/dns
[102]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/contrib/miekg/dns/v2
[53]: https://github.com/confluentinc/confluent-kafka-go
[103]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/contrib/confluentinc/confluent-kafka-go/kafka/v2
[55]: https://github.com/Shopify/sarama
[104]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/contrib/IBM/sarama/v2
[57]: https://github.com/googleapis/google-api-go-client
[105]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/contrib/google.golang.org/api/v2
[59]: https://github.com/emicklei/go-restful
[106]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/contrib/emicklei/go-restful.v3/v2
[61]: https://github.com/twitchtv/twirp
[107]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/contrib/twitchtv/twirp/v2
[63]: https://github.com/hashicorp/vault
[108]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/contrib/hashicorp/vault/v2
[65]: https://github.com/hashicorp/consul
[109]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/contrib/hashicorp/consul/v2
[69]: https://gorm.io/
[110]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/contrib/gorm.io/gorm.v1/v2
[71]: https://github.com/kubernetes/client-go
[111]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/contrib/k8s.io/client-go/kubernetes/v2
[73]: https://github.com/bradfitz/gomemcache/memcache
[112]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/contrib/bradfitz/gomemcache/memcache/v2
[114]: https://github.com/globalsign/mgo
[115]: https://github.com/dimfeld/httptreemux
[116]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/contrib/dimfeld/httptreemux.v5/v2
[117]: https://github.com/urfave/negroni
[118]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/contrib/urfave/negroni/v2
[119]: https://github.com/valyala/fasthttp
[120]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/contrib/valyala/fasthttp/v2
[122]: https://github.com/olivere/elastic
[125]: https://github.com/elastic/go-elasticsearch
[126]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/contrib/elastic/go-elasticsearch.v6/v2
[127]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/contrib/elastic/go-elasticsearch.v7/v2
[128]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/contrib/elastic/go-elasticsearch.v8/v2
[129]: https://github.com/99designs/gqlgen
[130]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/contrib/99designs/gqlgen/v2
[131]: https://github.com/go-redis/redis
[132]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/contrib/go-redis/redis.v7/v2
[133]: https://github.com/redis/go-redis
[134]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/contrib/redis/go-redis.v9/v2
[135]: https://github.com/jackc/pgx
[136]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/contrib/jackc/pgx.v5/v2
[139]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/contrib/confluentinc/confluent-kafka-go/kafka.v2/v2
[140]: https://github.com/IBM/sarama
[141]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/contrib/IBM/sarama.v1/v2
[142]: https://github.com/Shopify/sarama
[143]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/contrib/Shopify/sarama/v2
[144]: https://github.com/segmentio/kafka-go
[145]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/contrib/segmentio/kafka-go/v2
[147]: https://pkg.go.dev/cloud.google.com/go/pubsub
[148]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/contrib/cloud.google.com/go/pubsub.v1/v2
[149]: https://github.com/sirupsen/logrus
[150]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/contrib/sirupsen/logrus/v2
[151]: https://github.com/go-pg/pg
[152]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/v2/contrib/go-pg/pg.v10
[153]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/contrib/go-redis/redis/v2
[154]: https://github.com/graphql-go/graphql
[155]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/contrib/graphql-go/graphql/v2
[156]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/contrib/go-chi/chi.v5
[157]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/contrib/cloud.google.com/go/pubsub.v2/v2
[158]: https://cloud.google.com/pubsub

{{% /tab %}}
{{% tab "v1" %}}
**Note**: The [integrations documentation][5] provides a detailed overview of the supported packages and their APIs, along with usage examples.

| Framework         | Support Type                                         | GoDoc Datadog Documentation                                              |
|-------------------|------------------------------------------------------|--------------------------------------------------------------------------|
| [Gin][6]          | Manual or Compile-Time                               | [gopkg.in/DataDog/dd-trace-go.v1/contrib/gin-gonic/gin][7]               |
| [Gorilla Mux][8]  | Manual or Compile-Time<sup>[🔹](#library-side)</sup> | [gopkg.in/DataDog/dd-trace-go.v1/contrib/gorilla/mux][9]                 |
| [gRPC][10]        | Manual or Compile-Time                               | [gopkg.in/DataDog/dd-trace-go.v1/contrib/google.golang.org/grpc][11]     |
| [gRPC v1.2][10]   | Manual                                               | [gopkg.in/DataDog/dd-trace-go.v1/contrib/google.golang.org/grpc.v12][12] |
| [chi][13]         | Manual or Compile-Time                               | [gopkg.in/DataDog/dd-trace-go.v1/contrib/go-chi/chi][14]                 |
| [chi v5][13]         | Manual or Compile-Time                               | [gopkg.in/DataDog/dd-trace-go.v1/contrib/go-chi/chi.v5][78]                 |
| [echo v4][15]     | Manual or Compile-Time                               | [gopkg.in/DataDog/dd-trace-go.v1/contrib/labstack/echo.v4][16]           |
| [echo v3][15]     | Manual                                               | [gopkg.in/DataDog/dd-trace-go.v1/contrib/labstack/echo][17]              |
| [Negroni][79]    | Manual or Compile-Time                              | [gopkg.in/DataDog/dd-trace-go.v1/contrib/urfave/negroni][80]            |
| [HTTPTreeMux v5][81] | Manual or Compile-Time                         | [gopkg.in/DataDog/dd-trace-go.v1/contrib/dimfeld/httptreemux.v5][82]    |
| [Fiber][18]       | Manual or Compile-Time                               | [gopkg.in/DataDog/dd-trace-go.v1/contrib/gofiber/fiber.v2][19]           |
| [Fasthttp v1][83]   | Manual or Compile-Time                              | [gopkg.in/DataDog/dd-trace-go.v1/contrib/valyala/fasthttp.v1][84]          |

<a id="library-side"></a>
<sup>🔹</sup> Compile-time instrumentation is done directly within the library, and cannot be locally opted out of using the `//orchestrion:ignore` directive.

#### Library compatibility

The Go tracer includes support for the following data stores and libraries.

| Library                 | Support Type    | Examples and Documentation                                                      |
|-------------------------|-----------------|---------------------------------------------------------------------------------|
| [AWS SDK][20]           | Fully Supported | [gopkg.in/DataDog/dd-trace-go.v1/contrib/aws/aws-sdk-go/aws][21]                |
| [AWS SDK v2][75]        | Fully Supported | [gopkg.in/DataDog/dd-trace-go.v1/contrib/aws/aws-sdk-go-v2/aws][76]                |
| [Elasticsearch][22]     | Fully Supported | [gopkg.in/DataDog/dd-trace-go.v1/contrib/olivere/elastic][23]                   |
| [Elasticsearch v6][85] | Fully Supported | [gopkg.in/DataDog/dd-trace-go.v1/contrib/elastic/go-elasticsearch.v6][86]     |
| [Cassandra][24]         | Fully Supported | [gopkg.in/DataDog/dd-trace-go.v1/contrib/gocql/gocql][25]                       |
| [GraphQL (graph-gophers)][26]           | Fully Supported | [gopkg.in/DataDog/dd-trace-go.v1/contrib/graph-gophers/graphql-go][27]          |
| [GraphQL (graphql-go)][87]           | Fully Supported | [gopkg.in/DataDog/dd-trace-go.v1/contrib/graphql-go/graphql][88]          |
| [GraphQL (gqlgen)][89] | Fully Supported | [gopkg.in/DataDog/dd-trace-go.v1/contrib/99designs/gqlgen][90]                 |
| [HTTP][28]              | Fully Supported | [gopkg.in/DataDog/dd-trace-go.v1/contrib/net/http][29]                          |
| [HTTP router][30]       | Fully Supported | [gopkg.in/DataDog/dd-trace-go.v1/contrib/julienschmidt/httprouter][31]          |
| [Redis (go-redis)][32]  | Fully Supported | [gopkg.in/DataDog/dd-trace-go.v1/contrib/go-redis/redis][33]                    |
| [Redis (go-redis-v7)][32]| Fully Supported | [gopkg.in/DataDog/dd-trace-go.v1/contrib/go-redis/redis.v7][91]                |
| [Redis (go-redis-v8)][32]| Fully Supported | [gopkg.in/DataDog/dd-trace-go.v1/contrib/go-redis/redis.v8][35]                |
| [Redis (go-redis-v9)][32]| Fully Supported | [gopkg.in/DataDog/dd-trace-go.v1/contrib/redis/go-redis.v9][92]                |
| [Redis (redigo)][36]    | Fully Supported | [gopkg.in/DataDog/dd-trace-go.v1/contrib/garyburd/redigo][37]                   |
| [Redis (new redigo)][38]| Fully Supported | [gopkg.in/DataDog/dd-trace-go.v1/contrib/gomodule/redigo][39]                   |
| [Redis (rueidis)][93]| Fully Supported | [gopkg.in/DataDog/dd-trace-go.v1/contrib/redis/rueidis][94]                   |
| [SQL][40]               | Fully Supported | [gopkg.in/DataDog/dd-trace-go.v1/contrib/database/sql][41]                      |
| [SQLx][42]              | Fully Supported | [gopkg.in/DataDog/dd-trace-go.v1/contrib/jmoiron/sqlx][43]                      |
| [PostgreSQL (pgx v5)][95] | Fully Supported | [gopkg.in/DataDog/dd-trace-go.v1/contrib/jackc/pgx.v5][96]                  |
| [MongoDB][44]           | Fully Supported | [gopkg.in/DataDog/dd-trace-go.v1/contrib/go.mongodb.org/mongo-driver/mongo][45] |
| [MongoDB (mgo)][114]    | Fully Supported | [gopkg.in/DataDog/dd-trace-go.v1/contrib/globalsign/mgo][46]                    |
| [BuntDB][47]            | Fully Supported | [gopkg.in/DataDog/dd-trace-go.v1/contrib/tidwall/buntdb][48]                    |
| [LevelDB][49]           | Fully Supported | [gopkg.in/DataDog/dd-trace-go.v1/contrib/syndtr/goleveldb/leveldb][50]          |
| [miekg/dns][51]         | Fully Supported | [gopkg.in/DataDog/dd-trace-go.v1/contrib/miekg/dns][52]                         |
| [Kafka (confluent)][53] | Fully Supported | [gopkg.in/DataDog/dd-trace-go.v1/contrib/confluentinc/confluent-kafka-go/kafka][54]   |
| [Kafka (confluent v2)][97] | Fully Supported | [gopkg.in/DataDog/dd-trace-go.v1/contrib/confluentinc/confluent-kafka-go/kafka.v2][98]   |
| [Kafka (sarama)][55]    | Fully Supported | [gopkg.in/DataDog/dd-trace-go.v1/contrib/Shopify/sarama][56]                    |
| [Kafka (segmentio v0)][99] | Fully Supported | [gopkg.in/DataDog/dd-trace-go.v1/contrib/segmentio/kafka.go.v0][100]         |
| [Google API][57]        | Fully Supported | [gopkg.in/DataDog/dd-trace-go.v1/contrib/google.golang.org/api][58]             |
| [Google Pub/Sub v1][101] | Fully Supported | [gopkg.in/DataDog/dd-trace-go.v1/contrib/cloud.google.com/go/pubsub.v1][102]    |
| [go-restful][59]        | Fully Supported | [gopkg.in/DataDog/dd-trace-go.v1/contrib/emicklei/go-restful][60]               |
| [go-restful v3][103]        | Fully Supported | [gopkg.in/DataDog/dd-trace-go.v1/contrib/emicklei/go-restful.v3][104]               |
| [Twirp][61]             | Fully Supported | [gopkg.in/DataDog/dd-trace-go.v1/contrib/twitchtv/twirp][62]                    |
| [Vault][63]             | Fully Supported | [gopkg.in/DataDog/dd-trace-go.v1/contrib/hashicorp/vault][64]                   |
| [Consul][65]            | Fully Supported | [gopkg.in/DataDog/dd-trace-go.v1/contrib/hashicorp/consul][66]                  |
| [Slog][105]            | Fully Supported | [gopkg.in/DataDog/dd-trace-go.v1/contrib/log/slog][106]                  |
| [Gorm (jinzhu)][107]              | Fully Supported | [gopkg.in/DataDog/dd-trace-go.v1/contrib/jinzhu/gorm][108]                       |
| [Gorm][69]           | Fully Supported | [gopkg.in/DataDog/dd-trace-go.v1/contrib/gorm.io/gorm.v1][70]                   |
| [Kubernetes][71]        | Fully Supported | [gopkg.in/DataDog/dd-trace-go.v1/contrib/k8s.io/client-go/kubernetes][72]       |
| [Memcache][73]          | Fully Supported | [gopkg.in/DataDog/dd-trace-go.v1/contrib/bradfitz/gomemcache/memcache][74]      |
| [go-pg v10][109] | Fully Supported | [gopkg.in/DataDog/dd-trace-go.v1/contrib/go-pg/pg.v10][110] |
| [Bun][111] | Fully Supported | [gopkg.in/DataDog/dd-trace-go.v1/contrib/uptrace/bun][112] |
| [Logrus][113]           | Fully Supported | [gopkg.in/DataDog/dd-trace-go.v1/contrib/sirupsen/logrus][119]                   |
| [Valkey-go][115]           | Fully Supported | [gopkg.in/DataDog/dd-trace-go.v1/contrib/valkey-io/valkey-go][116]                   |
| [Goji][117]           | Fully Supported | [gopkg.in/DataDog/dd-trace-go.v1/contrib/zenazn/goji.v1/web][118]                   |

Packages must be imported with:

```go
import "gopkg.in/DataDog/dd-trace-go.v1/contrib/<PACKAGE_DIR>/<PACKAGE_NAME>"
```
[5]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/contrib
[6]: https://gin-gonic.com
[7]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/contrib/gin-gonic/gin
[8]: http://www.gorillatoolkit.org/pkg/mux
[9]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/contrib/gorilla/mux
[10]: https://github.com/grpc/grpc-go
[11]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/contrib/google.golang.org/grpc
[12]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/contrib/google.golang.org/grpc.v12
[13]: https://github.com/go-chi/chi
[14]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/contrib/go-chi/chi
[15]: https://github.com/labstack/echo
[16]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/contrib/labstack/echo.v4
[17]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/contrib/labstack/echo
[18]: https://github.com/gofiber/fiber
[19]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/contrib/gofiber/fiber.v2
[20]: https://aws.amazon.com/sdk-for-go
[21]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/contrib/aws/aws-sdk-go/aws
[22]: https://github.com/olivere/elastic
[23]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/contrib/olivere/elastic
[24]: https://github.com/gocql/gocql
[25]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/contrib/gocql/gocql
[26]: https://github.com/graph-gophers/graphql-go
[27]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/contrib/graph-gophers/graphql-go
[28]: https://golang.org/pkg/net/http
[29]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/contrib/net/http
[30]: https://github.com/julienschmidt/httprouter
[31]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/contrib/julienschmidt/httprouter
[32]: https://github.com/go-redis/redis
[33]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/contrib/go-redis/redis
[35]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/contrib/go-redis/redis.v8
[36]: https://github.com/garyburd/redigo
[37]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/contrib/garyburd/redigo
[38]: https://github.com/gomodule/redigo
[39]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/contrib/gomodule/redigo
[40]: https://golang.org/pkg/database/sql
[41]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/contrib/database/sql
[42]: https://github.com/jmoiron/sqlx
[43]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/contrib/jmoiron/sqlx
[44]: https://github.com/mongodb/mongo-go-driver
[45]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/contrib/go.mongodb.org/mongo-driver/mongo
[46]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/contrib/globalsign/mgo
[47]: https://github.com/tidwall/buntdb
[48]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/contrib/tidwall/buntdb
[49]: https://github.com/syndtr/goleveldb
[50]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/contrib/syndtr/goleveldb/leveldb
[51]: https://github.com/miekg/dns
[52]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/contrib/miekg/dns
[53]: https://github.com/confluentinc/confluent-kafka-go
[54]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/contrib/confluentinc/confluent-kafka-go/kafka
[55]: https://github.com/Shopify/sarama
[56]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/contrib/Shopify/sarama
[57]: https://github.com/googleapis/google-api-go-client
[58]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/contrib/google.golang.org/api
[59]: https://github.com/emicklei/go-restful
[60]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/contrib/emicklei/go-restful
[61]: https://github.com/twitchtv/twirp
[62]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/contrib/twitchtv/twirp
[63]: https://github.com/hashicorp/vault
[64]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/contrib/hashicorp/vault
[65]: https://github.com/hashicorp/consul
[66]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/contrib/hashicorp/consul
[67]: https://github.com/jinzhu/gorm
[69]: https://gorm.io/
[70]: https://gopkg.in/DataDog/dd-trace-go.v1/contrib/gorm.io/gorm.v1
[71]: https://github.com/kubernetes/client-go
[72]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/contrib/k8s.io/client-go/kubernetes
[73]: https://github.com/bradfitz/gomemcache/memcache
[74]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/contrib/bradfitz/gomemcache/memcache
[75]: https://aws.github.io/aws-sdk-go-v2/docs/
[76]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/contrib/aws/aws-sdk-go-v2/aws
[114]: https://github.com/globalsign/mgo
[78]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/contrib/go-chi/chi.v5
[79]: https://github.com/urfave/negroni
[80]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/contrib/urfave/negroni/
[81]: https://github.com/dimfeld/httptreemux
[82]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/contrib/dimfeld/httptreemux.v5
[83]: https://github.com/valyala/fasthttp
[84]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/contrib/valyala/fasthttp.v1
[85]: https://github.com/elastic/go-elasticsearch
[86]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/contrib/elastic/go-elasticsearch.v6
[87]: https://github.com/graphql-go/graphql
[88]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/contrib/graphql-go/graphql
[89]: https://github.com/99designs/gqlgen
[90]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/contrib/99designs/gqlgen
[91]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/contrib/go-redis/redis.v7
[92]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/contrib/redis/go-redis.v9
[93]: https://github.com/redis/rueidis
[94]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/contrib/redis/rueidis
[95]: https://github.com/jackc/pgx
[96]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/contrib/jackc/pgx.v5
[97]: https://github.com/confluentinc/confluent-kafka-go
[98]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/contrib/confluentinc/confluent-kafka-go/kafka.v2
[99]: https://github.com/segmentio/kafka-go
[100]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/contrib/segmentio/kafka.go.v0
[101]: https://github.com/googleapis/google-cloud-go/tree/main/pubsub
[102]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/contrib/cloud.google.com/go/pubsub.v1
[103]: https://github.com/emicklei/go-restful
[104]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/contrib/emicklei/go-restful.v3
[105]: https://github.com/golang/go/tree/master/src/log/slog
[106]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/contrib/log/slog
[107]: https://pkg.go.dev/github.com/jinzhu/gorm
[108]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/contrib/jinzhu/gorm
[109]: https://github.com/go-pg/pg
[110]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/contrib/go-pg/pg.v10
[111]: https://github.com/uptrace/bun
[112]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/contrib/uptrace/bun
[113]: https://github.com/sirupsen/logrus
[119]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/contrib/sirupsen/logrus
[115]: https://github.com/valkey-io/valkey-go
[116]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/contrib/valkey-go
[117]: https://github.com/zenazn/goji/
[118]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/contrib/zenazn/goji.v1/web
{{% /tab %}}
{{< /tabs >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/dd-trace-go
[2]: https://github.com/DataDog/dd-trace-go?tab=readme-ov-file#go-support-policy
[4]: https://www.datadoghq.com/support/
[77]: /tracing/trace_collection/library_config/go/
[78]: /tracing/trace_collection/automatic_instrumentation/dd_libraries/go/?tab=manualinstrumentation#activate-go-integrations-to-create-spans
[79]: /tracing/trace_collection/custom_instrumentation/go/migration
