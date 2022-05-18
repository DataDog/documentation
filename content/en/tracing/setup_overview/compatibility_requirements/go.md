---
title: Go Compatibility Requirements
kind: documentation
description: 'Compatibility Requirements for the Go tracer'
aliases:
  - /tracing/compatibility_requirements/go
code_lang: go
type: multi-code-lang
code_lang_weight: 30
further_reading:
    - link: 'tracing/setup/go'
      tag: 'Documentation'
      text: 'Instrument Your Application'
---

## Compatibility

The Go Datadog Trace library is open source. View the [GitHub repository][1] for more information.

The Go Datadog Trace Library has a [version support policy][70] defined for Go versions. The two latest releases of Go are fully supported, while the third newest release is considered in [maintenance][71]. Older versions may function, but no support is provided by default. For special requests, [contact support][72] for special requests. 

You must be running Datadog Agent v5.21.1+.

### Integrations

#### Framework compatibility

Integrate the Go tracer with the following list of web frameworks using one of the following helper packages.

**Note**: The [integrations documentation][2] provides a detailed overview of the supported packages and their APIs, along with usage examples.

| Framework         | Support Type    | GoDoc Datadog Documentation                                              |
|-------------------|-----------------|--------------------------------------------------------------------------|
| [Gin][3]          | Fully Supported | [gopkg.in/DataDog/dd-trace-go.v1/contrib/gin-gonic/gin][4]               |
| [Gorilla Mux][5] | Fully Supported | [gopkg.in/DataDog/dd-trace-go.v1/contrib/gorilla/mux][6]                |
| [gRPC][7]        | Fully Supported | [gopkg.in/DataDog/dd-trace-go.v1/contrib/google.golang.org/grpc][8]     |
| [gRPC v1.2][7]   | Fully Supported | [gopkg.in/DataDog/dd-trace-go.v1/contrib/google.golang.org/grpc.v12][9] |
| [chi][10]         | Fully Supported | [gopkg.in/DataDog/dd-trace-go.v1/contrib/go-chi/chi][11] |
| [echo v4][12]     | Fully Supported | [gopkg.in/DataDog/dd-trace-go.v1/contrib/labstack/echo.v4][13]           |
| [echo v3][12]     | Fully Supported | [gopkg.in/DataDog/dd-trace-go.v1/contrib/labstack/echo][14]              |
| [Fiber][74]     | Fully Supported | [gopkg.in/DataDog/dd-trace-go.v1/contrib/gofiber/fiber.v2][73]              |

#### Library compatibility

The Go tracer includes support for the following data stores and libraries.

| Library                 | Support Type    | Examples and Documentation                                                      |
|-------------------------|-----------------|---------------------------------------------------------------------------------|
| [AWS SDK][15]           | Fully Supported | [gopkg.in/DataDog/dd-trace-go.v1/contrib/aws/aws-sdk-go/aws][16]                |
| [Elasticsearch][17]     | Fully Supported | [gopkg.in/DataDog/dd-trace-go.v1/contrib/olivere/elastic][18]                   |
| [Cassandra][19]         | Fully Supported | [gopkg.in/DataDog/dd-trace-go.v1/contrib/gocql/gocql][20]                       |
| [GraphQL][21]           | Fully Supported | [gopkg.in/DataDog/dd-trace-go.v1/contrib/graph-gophers/graphql-go][22]          |
| [HTTP][23]              | Fully Supported | [gopkg.in/DataDog/dd-trace-go.v1/contrib/net/http][24]                          |
| [HTTP router][25]       | Fully Supported | [gopkg.in/DataDog/dd-trace-go.v1/contrib/julienschmidt/httprouter][26]          |
| [Redis (go-redis)][27]  | Fully Supported | [gopkg.in/DataDog/dd-trace-go.v1/contrib/go-redis/redis][28]                    |
| [Redis (go-redis-v8)][29]| Fully Supported | [gopkg.in/DataDog/dd-trace-go.v1/contrib/go-redis/redis.v8][30]                |
| [Redis (redigo)][31]    | Fully Supported | [gopkg.in/DataDog/dd-trace-go.v1/contrib/garyburd/redigo][32]                   |
| [Redis (new redigo)][33]| Fully Supported | [gopkg.in/DataDog/dd-trace-go.v1/contrib/gomodule/redigo][34]                   |
| [SQL][35]               | Fully Supported | [gopkg.in/DataDog/dd-trace-go.v1/contrib/database/sql][36]                      |
| [SQLx][37]              | Fully Supported | [gopkg.in/DataDog/dd-trace-go.v1/contrib/jmoiron/sqlx][38]                      |
| [MongoDB][39]           | Fully Supported | [gopkg.in/DataDog/dd-trace-go.v1/contrib/go.mongodb.org/mongo-driver/mongo][40] |
| [MongoDB (mgo)[73]      | Fully Supported | [gopkg.in/DataDog/dd-trace-go.v1/contrib/globalsign/mgo][41]                    |
| [BuntDB][42]            | Fully Supported | [gopkg.in/DataDog/dd-trace-go.v1/contrib/tidwall/buntdb][43]                    |
| [LevelDB][44]           | Fully Supported | [gopkg.in/DataDog/dd-trace-go.v1/contrib/syndtr/goleveldb/leveldb][45]          |
| [miekg/dns][46]         | Fully Supported | [gopkg.in/DataDog/dd-trace-go.v1/contrib/miekg/dns][47]                         |
| [Kafka (confluent)][48] | Fully Supported | [gopkg.in/DataDog/dd-trace-go.v1/contrib/confluentinc/confluent-kafka-go][49]   |
| [Kafka (sarama)][50]    | Fully Supported | [gopkg.in/DataDog/dd-trace-go.v1/contrib/Shopify/sarama][51]                    |
| [Google API][52]        | Fully Supported | [gopkg.in/DataDog/dd-trace-go.v1/contrib/google.golang.org/api][53]             |
| [go-restful][54]        | Fully Supported | [gopkg.in/DataDog/dd-trace-go.v1/contrib/emicklei/go-restful][55]               |
| [Twirp][56]             | Fully Supported | [gopkg.in/DataDog/dd-trace-go.v1/contrib/twitchtv/twirp][57]                    |
| [Vault][58]             | Fully Supported | [gopkg.in/DataDog/dd-trace-go.v1/contrib/hashicorp/vault][59]                   |
| [Consul][60]            | Fully Supported | [gopkg.in/DataDog/dd-trace-go.v1/contrib/hashicorp/consul][61]                  |
| [Gorm][62]              | Fully Supported | [gopkg.in/DataDog/dd-trace-go.v1/contrib/jinzhu/gorm][63]                       |
| [Gorm v2][64]           | Fully Supported | [gopkg.in/DataDog/dd-trace-go.v1/contrib/gorm.io/gorm.v1][65]                   |
| [Kubernetes][66]        | Fully Supported | [gopkg.in/DataDog/dd-trace-go.v1/contrib/k8s.io/client-go/kubernetes][67]       |
| [Memcache][68]          | Fully Supported | [gopkg.in/DataDog/dd-trace-go.v1/contrib/bradfitz/gomemcache/memcache][69]      |


Packages must be imported with:

```go
import "gopkg.in/DataDog/dd-trace-go.v1/contrib/<PACKAGE_DIR>/<PACKAGE_NAME>"
```

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/dd-trace-go
[2]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib
[3]: https://gin-gonic.com
[4]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib/gin-gonic/gin
[5]: http://www.gorillatoolkit.org/pkg/mux
[6]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib/gorilla/mux
[7]: https://github.com/grpc/grpc-go
[8]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib/google.golang.org/grpc
[9]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib/google.golang.org/grpc.v12
[10]: https://github.com/go-chi/chi
[11]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib/go-chi/chi
[12]: https://github.com/labstack/echo
[13]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib/labstack/echo.v4
[14]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib/labstack/echo
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
[29]: https://github.com/go-redis/redis/v8
[30]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/contrib/go-redis/redis.v8
[31]: https://github.com/garyburd/redigo
[32]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib/garyburd/redigo
[33]: https://github.com/gomodule/redigo
[34]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib/gomodule/redigo
[35]: https://golang.org/pkg/database/sql
[36]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib/database/sql
[37]: https://github.com/jmoiron/sqlx
[38]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib/jmoiron/sqlx
[39]: https://github.com/mongodb/mongo-go-driver
[40]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib/go.mongodb.org/mongo-driver/mongo
[41]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib/globalsign/mgo
[42]: https://github.com/tidwall/buntdb
[43]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib/tidwall/buntdb
[44]: https://github.com/syndtr/goleveldb
[45]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib/syndtr/goleveldb/leveldb
[46]: https://github.com/miekg/dns
[47]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib/miekg/dns
[48]: https://github.com/confluentinc/confluent-kafka-go
[49]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib/confluentinc/confluent-kafka-go
[50]: https://github.com/Shopify/sarama
[51]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib/Shopify/sarama
[52]: https://github.com/googleapis/google-api-go-client
[53]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib/google.golang.org/api
[54]: https://github.com/emicklei/go-restful
[55]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib/emicklei/go-restful
[56]: https://github.com/twitchtv/twirp
[57]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib/twitchtv/twirp
[58]: https://github.com/hashicorp/vault
[59]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib/hashicorp/vault
[60]: https://github.com/hashicorp/consul
[61]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib/hashicorp/consul
[62]: https://github.com/jinzhu/gorm
[63]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib/jinzhu/gorm
[64]: https://gorm.io/
[65]: https://gopkg.in/DataDog/dd-trace-go.v1/contrib/gorm.io/gorm.v1
[66]: https://github.com/kubernetes/client-go
[67]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib/k8s.io/client-go/kubernetes
[68]: https://github.com/bradfitz/gomemcache/memcache
[69]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib/bradfitz/gomemcache/memcache
[70]: https://github.com/DataDog/dd-trace-go#support-policy
[71]: https://github.com/DataDog/dd-trace-go#support-maintenance
[72]: https://www.datadoghq.com/support/
[73]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib/gofiber/fiber.v2
[74]: https://github.com/gofiber/fiber
