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
- [Add and initialize the Datadog Go tracer][77] before configuring integrations.

### Integrations

#### Framework compatibility

Integrate the Go tracer with the following list of web frameworks using one of the following helper packages.

**Note**: The [integrations documentation][5] provides a detailed overview of the supported packages and their APIs, along with usage examples.

| Framework         | Support Type    | GoDoc Datadog Documentation                                              |
|-------------------|-----------------|--------------------------------------------------------------------------|
| [Gin][6]          | Fully Supported | [github.com/DataDog/dd-trace-go/contrib/gin-gonic/gin][7]               |
| [Gorilla Mux][8] | Fully Supported | [github.com/DataDog/dd-trace-go/contrib/gorilla/mux][9]                |
| [gRPC][10]        | Fully Supported | [github.com/DataDog/dd-trace-go/contrib/google.golang.org/grpc][11]     |
| [gRPC v1.2][10]   | Fully Supported | [github.com/DataDog/dd-trace-go/contrib/google.golang.org/grpc.v12][12] |
| [chi][13]         | Fully Supported | [github.com/DataDog/dd-trace-go/contrib/go-chi/chi][14] |
| [echo v4][15]     | Fully Supported | [github.com/DataDog/dd-trace-go/contrib/labstack/echo.v4][16]           |
| [Fiber][18]     | Fully Supported | [github.com/DataDog/dd-trace-go/contrib/gofiber/fiber.v2][19]              |

#### Library compatibility

The Go tracer includes support for the following data stores and libraries.

| Library                 | Support Type    | Examples and Documentation                                                      |
|-------------------------|-----------------|---------------------------------------------------------------------------------|
| [AWS SDK][20]           | Fully Supported | [github.com/DataDog/dd-trace-go/contrib/aws/aws-sdk-go/aws][21]                |
| [AWS SDK v2][75]        | Fully Supported | [github.com/DataDog/dd-trace-go/contrib/aws/aws-sdk-go-v2/aws][76]                |
| [Elasticsearch][22]     | Fully Supported | [github.com/DataDog/dd-trace-go/contrib/olivere/elastic][23]                   |
| [Cassandra][24]         | Fully Supported | [github.com/DataDog/dd-trace-go/contrib/gocql/gocql][25]                       |
| [GraphQL][26]           | Fully Supported | [github.com/DataDog/dd-trace-go/contrib/graph-gophers/graphql-go][27]          |
| [HTTP][28]              | Fully Supported | [github.com/DataDog/dd-trace-go/contrib/net/http][29]                          |
| [HTTP router][30]       | Fully Supported | [github.com/DataDog/dd-trace-go/contrib/julienschmidt/httprouter][31]          |
| [Redis (go-redis)][32]  | Fully Supported | [github.com/DataDog/dd-trace-go/contrib/go-redis/redis][33]                    |
| [Redis (go-redis-v8)][34]| Fully Supported | [github.com/DataDog/dd-trace-go/contrib/go-redis/redis.v8][35]                |
| [Redis (new redigo)][38]| Fully Supported | [github.com/DataDog/dd-trace-go/contrib/gomodule/redigo][39]                   |
| [SQL][40]               | Fully Supported | [github.com/DataDog/dd-trace-go/contrib/database/sql][41]                      |
| [SQLx][42]              | Fully Supported | [github.com/DataDog/dd-trace-go/contrib/jmoiron/sqlx][43]                      |
| [MongoDB][44]           | Fully Supported | [github.com/DataDog/dd-trace-go/contrib/go.mongodb.org/mongo-driver/mongo][45] |
| [MongoDB (mgo)[73]      | Fully Supported | [github.com/DataDog/dd-trace-go/contrib/globalsign/mgo][46]                    |
| [BuntDB][47]            | Fully Supported | [github.com/DataDog/dd-trace-go/contrib/tidwall/buntdb][48]                    |
| [LevelDB][49]           | Fully Supported | [github.com/DataDog/dd-trace-go/contrib/syndtr/goleveldb/leveldb][50]          |
| [miekg/dns][51]         | Fully Supported | [github.com/DataDog/dd-trace-go/contrib/miekg/dns][52]                         |
| [Kafka (confluent)][53] | Fully Supported | [github.com/DataDog/dd-trace-go/contrib/confluentinc/confluent-kafka-go][54]   |
| [Kafka (sarama)][55]    | Fully Supported | [github.com/DataDog/dd-trace-go/contrib/Shopify/sarama][56]                    |
| [Google API][57]        | Fully Supported | [github.com/DataDog/dd-trace-go/contrib/google.golang.org/api][58]             |
| [go-restful][59]        | Fully Supported | [github.com/DataDog/dd-trace-go/contrib/emicklei/go-restful.v3/v2][60]               |
| [Twirp][61]             | Fully Supported | [github.com/DataDog/dd-trace-go/contrib/twitchtv/twirp][62]                    |
| [Vault][63]             | Fully Supported | [github.com/DataDog/dd-trace-go/contrib/hashicorp/vault][64]                   |
| [Consul][65]            | Fully Supported | [github.com/DataDog/dd-trace-go/contrib/hashicorp/consul][66]                  |
| [Gorm][67]              | Fully Supported | [github.com/DataDog/dd-trace-go/contrib/jinzhu/gorm][68]                       |
| [Gorm v2][69]           | Fully Supported | [github.com/DataDog/dd-trace-go/contrib/gorm.io/gorm.v1][70]                   |
| [Kubernetes][71]        | Fully Supported | [github.com/DataDog/dd-trace-go/contrib/k8s.io/client-go/kubernetes][72]       |
| [Memcache][73]          | Fully Supported | [github.com/DataDog/dd-trace-go/contrib/bradfitz/gomemcache/memcache][74]      |


Packages must be imported with:

```go
import "github.com/DataDog/dd-trace-go/contrib/<PACKAGE_DIR>/<PACKAGE_NAME>"
```

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/dd-trace-go
[2]: https://github.com/DataDog/dd-trace-go?tab=readme-ov-file#go-support-policy
[4]: https://www.datadoghq.com/support/
[5]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/contrib
[6]: https://gin-gonic.com
[7]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/contrib/gin-gonic/gin
[8]: http://www.gorillatoolkit.org/pkg/mux
[9]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/contrib/gorilla/mux
[10]: https://github.com/grpc/grpc-go
[11]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/contrib/google.golang.org/grpc
[12]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/contrib/google.golang.org/grpc.v12
[13]: https://github.com/go-chi/chi
[14]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/contrib/go-chi/chi
[15]: https://github.com/labstack/echo
[16]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/contrib/labstack/echo.v4
[18]: https://github.com/gofiber/fiber
[19]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/contrib/gofiber/fiber.v2
[20]: https://aws.amazon.com/sdk-for-go
[21]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/contrib/aws/aws-sdk-go/aws
[22]: https://github.com/olivere/elastic
[23]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/contrib/olivere/elastic
[24]: https://github.com/gocql/gocql
[25]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/contrib/gocql/gocql
[26]: https://github.com/graph-gophers/graphql-go
[27]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/contrib/graph-gophers/graphql-go
[28]: https://golang.org/pkg/net/http
[29]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/contrib/net/http
[30]: https://github.com/julienschmidt/httprouter
[31]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/contrib/julienschmidt/httprouter
[32]: https://github.com/go-redis/redis
[33]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/contrib/go-redis/redis
[34]: https://github.com/go-redis/redis/v8
[35]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/contrib/go-redis/redis.v8
[36]: https://github.com/garyburd/redigo
[38]: https://github.com/gomodule/redigo
[39]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/contrib/gomodule/redigo
[40]: https://golang.org/pkg/database/sql
[41]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/contrib/database/sql
[42]: https://github.com/jmoiron/sqlx
[43]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/contrib/jmoiron/sqlx
[44]: https://github.com/mongodb/mongo-go-driver
[45]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/contrib/go.mongodb.org/mongo-driver/mongo
[46]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/contrib/globalsign/mgo
[47]: https://github.com/tidwall/buntdb
[48]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/contrib/tidwall/buntdb
[49]: https://github.com/syndtr/goleveldb
[50]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/contrib/syndtr/goleveldb/leveldb
[51]: https://github.com/miekg/dns
[52]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/contrib/miekg/dns
[53]: https://github.com/confluentinc/confluent-kafka-go
[54]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/contrib/confluentinc/confluent-kafka-go
[55]: https://github.com/Shopify/sarama
[56]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/contrib/Shopify/sarama
[57]: https://github.com/googleapis/google-api-go-client
[58]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/contrib/google.golang.org/api
[59]: https://github.com/emicklei/go-restful
[60]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/contrib/emicklei/go-restful.v3/v2
[61]: https://github.com/twitchtv/twirp
[62]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/contrib/twitchtv/twirp
[63]: https://github.com/hashicorp/vault
[64]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/contrib/hashicorp/vault
[65]: https://github.com/hashicorp/consul
[66]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/contrib/hashicorp/consul
[67]: https://github.com/jinzhu/gorm
[68]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/contrib/jinzhu/gorm
[69]: https://gorm.io/
[70]: https://github.com/DataDog/dd-trace-go/contrib/gorm.io/gorm.v1
[71]: https://github.com/kubernetes/client-go
[72]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/contrib/k8s.io/client-go/kubernetes
[73]: https://github.com/bradfitz/gomemcache/memcache
[74]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/contrib/bradfitz/gomemcache/memcache
[75]: https://aws.github.io/aws-sdk-go-v2/docs/
[76]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/contrib/aws/aws-sdk-go-v2/aws
[77]: /tracing/trace_collection/library_config/go/
