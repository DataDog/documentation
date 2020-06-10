---
title: Go Compatibility Requirements
kind: documentation
description: 'Compatibility Requirements for the Go tracer'
further_reading:
    - link: 'tracing/setup/go'
      tag: 'Documentation'
      text: 'Instrument Your Application'
---

## Compatibility

To begin tracing your Go applications, your environment must first meet the following requirements:

* Running the Datadog Agent `>= 5.21.1`
* Using Go `1.12+`

### Integrations

#### Framework Compatibility

Integrate the Go tracer with the following list of web frameworks using one of the following helper packages.

| Framework         | Support Type    | GoDoc Datadog Documentation                                              |
|-------------------|-----------------|--------------------------------------------------------------------------|
| [Gin][1]          | Fully Supported | [gopkg.in/DataDog/dd-trace-go.v1/contrib/gin-gonic/gin][2]               |
| [Gorilla Mux][3] | Fully Supported | [gopkg.in/DataDog/dd-trace-go.v1/contrib/gorilla/mux][4]                |
| [gRPC][5]        | Fully Supported | [gopkg.in/DataDog/dd-trace-go.v1/contrib/google.golang.org/grpc][6]     |
| [gRPC v1.2][5]   | Fully Supported | [gopkg.in/DataDog/dd-trace-go.v1/contrib/google.golang.org/grpc.v12][7] |
| [chi][8]         | Fully Supported | [gopkg.in/DataDog/dd-trace-go.v1/contrib/google.golang.org/grpc.v12][9] |
| [echo][10]        | Fully Supported | [gopkg.in/DataDog/dd-trace-go.v1/contrib/labstack/echo][11]              |

#### Library Compatibility

The Go tracer includes support for the following data stores and libraries.

| Library                 | Support Type    | Examples and Documentation                                                      |
|-------------------------|-----------------|---------------------------------------------------------------------------------|
| [AWS SDK][12]           | Fully Supported | [gopkg.in/DataDog/dd-trace-go.v1/contrib/aws/aws-sdk-go/aws][13]                |
| [Elasticsearch][14]     | Fully Supported | [gopkg.in/DataDog/dd-trace-go.v1/contrib/olivere/elastic][15]                   |
| [Cassandra][16]         | Fully Supported | [gopkg.in/DataDog/dd-trace-go.v1/contrib/gocql/gocql][17]                       |
| [GraphQL][18]           | Fully Supported | [gopkg.in/DataDog/dd-trace-go.v1/contrib/graph-gophers/graphql-go][19]          |
| [HTTP][20]              | Fully Supported | [gopkg.in/DataDog/dd-trace-go.v1/contrib/net/http][21]                          |
| [HTTP router][22]       | Fully Supported | [gopkg.in/DataDog/dd-trace-go.v1/contrib/julienschmidt/httprouter][23]          |
| [Redis (go-redis)][24]  | Fully Supported | [gopkg.in/DataDog/dd-trace-go.v1/contrib/go-redis/redis][25]                    |
| [Redis (redigo)][26]    | Fully Supported | [gopkg.in/DataDog/dd-trace-go.v1/contrib/garyburd/redigo][27]                   |
| [Redis (new redigo)][28]| Fully Supported | [gopkg.in/DataDog/dd-trace-go.v1/contrib/gomodule/redigo][29]                   |
| [SQL][30]               | Fully Supported | [gopkg.in/DataDog/dd-trace-go.v1/contrib/database/sql][31]                      |
| [SQLx][32]              | Fully Supported | [gopkg.in/DataDog/dd-trace-go.v1/contrib/jmoiron/sqlx][33]                      |
| [MongoDB][34]           | Fully Supported | [gopkg.in/DataDog/dd-trace-go.v1/contrib/go.mongodb.org/mongo-driver/mongo][35] |
| [MongoDB (mgo)[73]      | Fully Supported | [gopkg.in/DataDog/dd-trace-go.v1/contrib/globalsign/mgo][36]                    |
| [BuntDB][37]            | Fully Supported | [gopkg.in/DataDog/dd-trace-go.v1/contrib/tidwall/buntdb][38]                    |
| [LevelDB][39]           | Fully Supported | [gopkg.in/DataDog/dd-trace-go.v1/contrib/syndtr/goleveldb/leveldb][40]          |
| [miekg/dns][41]         | Fully Supported | [gopkg.in/DataDog/dd-trace-go.v1/contrib/miekg/dns][42]                         |
| [Kafka (confluent)][43] | Fully Supported | [gopkg.in/DataDog/dd-trace-go.v1/contrib/confluentinc/confluent-kafka-go][44]   |
| [Kafka (sarama)][45]    | Fully Supported | [gopkg.in/DataDog/dd-trace-go.v1/contrib/Shopify/sarama][46]                    |
| [Google API][47]        | Fully Supported | [gopkg.in/DataDog/dd-trace-go.v1/contrib/google.golang.org/api][48]             |
| [go-restful][49]        | Fully Supported | [gopkg.in/DataDog/dd-trace-go.v1/contrib/emicklei/go-restful][50]               |
| [Twirp][51]             | Fully Supported | [gopkg.in/DataDog/dd-trace-go.v1/contrib/twitchtv/twirp][52]                    |
| [Vault][53]             | Fully Supported | [gopkg.in/DataDog/dd-trace-go.v1/contrib/hashicorp/vault][54]                   |
| [Consul][55]            | Fully Supported | [gopkg.in/DataDog/dd-trace-go.v1/contrib/hashicorp/consul][56]                  |
| [Gorm][57]              | Fully Supported | [gopkg.in/DataDog/dd-trace-go.v1/contrib/jinzhu/gorm][58]                       |
| [Kubernetes][59]        | Fully Supported | [gopkg.in/DataDog/dd-trace-go.v1/contrib/k8s.io/client-go/kubernetes][60]       |
| [Memcache][61]          | Fully Supported | [gopkg.in/DataDog/dd-trace-go.v1/contrib/bradfitz/gomemcache/memcache][62]      |

**Note**: The [integrations documentation][63] provides a detailed overview of the supported packages and their APIs, along with usage examples.

Packages must be imported, i.e.:

```go
import "gopkg.in/DataDog/dd-trace-go.v1/contrib/<PACKAGE_DIR>/<PACKAGE_NAME>"
```

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://gin-gonic.com
[2]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib/gin-gonic/gin
[3]: http://www.gorillatoolkit.org/pkg/mux
[4]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib/gorilla/mux
[5]: https://github.com/grpc/grpc-go
[6]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib/google.golang.org/grpc
[7]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib/google.golang.org/grpc.v12
[8]: https://github.com/go-chi/chi
[9]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib/go-chi/chi
[10]: https://github.com/labstack/echo
[11]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib/labstack/echo
[12]: https://aws.amazon.com/sdk-for-go
[13]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib/aws/aws-sdk-go/aws
[14]: https://github.com/olivere/elastic
[15]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib/olivere/elastic
[16]: https://github.com/gocql/gocql
[17]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib/gocql/gocql
[18]: https://github.com/graph-gophers/graphql-go
[19]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib/graph-gophers/graphql-go
[20]: https://golang.org/pkg/net/http
[21]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib/net/http
[22]: https://github.com/julienschmidt/httprouter
[23]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib/julienschmidt/httprouter
[24]: https://github.com/go-redis/redis
[25]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib/go-redis/redis
[26]: https://github.com/garyburd/redigo
[27]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib/garyburd/redigo
[28]: https://github.com/gomodule/redigo
[29]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib/gomodule/redigo
[30]: https://golang.org/pkg/database/sql
[31]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib/database/sql
[32]: https://github.com/jmoiron/sqlx
[33]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib/jmoiron/sqlx
[34]: https://github.com/mongodb/mongo-go-driver
[35]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib/go.mongodb.org/mongo-driver/mongo
[36]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib/globalsign/mgo
[37]: https://github.com/tidwall/buntdb
[38]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib/tidwall/buntdb
[39]: https://github.com/syndtr/goleveldb
[40]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib/syndtr/goleveldb/leveldb
[41]: https://github.com/miekg/dns
[42]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib/miekg/dns
[43]: https://github.com/confluentinc/confluent-kafka-go
[44]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib/confluentinc/confluent-kafka-go
[45]: https://github.com/Shopify/sarama
[46]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib/Shopify/sarama
[47]: https://github.com/googleapis/google-api-go-client
[48]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib/google.golang.org/api
[49]: https://github.com/emicklei/go-restful
[50]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib/emicklei/go-restful
[51]: https://github.com/twitchtv/twirp
[52]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib/twitchtv/twirp
[53]: https://github.com/hashicorp/vault
[54]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib/hashicorp/vault
[55]: https://github.com/hashicorp/consul
[56]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib/hashicorp/consul
[57]: https://github.com/jinzhu/gorm
[58]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib/jinzhu/gorm
[59]: https://github.com/kubernetes/client-go
[60]: https://godoc.org/k8s.io/client-go/kubernetes
[61]: https://github.com/bradfitz/gomemcache/memcache
[62]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib/bradfitz/gomemcache/memcache
[63]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib
