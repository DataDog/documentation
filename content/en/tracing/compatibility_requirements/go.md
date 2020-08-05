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

The Go Datadog Trace library is open source - view the [Github repository][1] for more information.

To begin tracing your Go applications, your environment must first meet the following requirements:

* Running the Datadog Agent `>= 5.21.1`
* Using Go `1.12+`

### Integrations

#### Framework Compatibility

Integrate the Go tracer with the following list of web frameworks using one of the following helper packages.

**Note**: The [integrations documentation][2] provides a detailed overview of the supported packages and their APIs, along with usage examples.

| Framework         | Support Type    | GoDoc Datadog Documentation                                              |
|-------------------|-----------------|--------------------------------------------------------------------------|
| [Gin][3]          | Fully Supported | [gopkg.in/DataDog/dd-trace-go.v1/contrib/gin-gonic/gin][4]               |
| [Gorilla Mux][5] | Fully Supported | [gopkg.in/DataDog/dd-trace-go.v1/contrib/gorilla/mux][6]                |
| [gRPC][7]        | Fully Supported | [gopkg.in/DataDog/dd-trace-go.v1/contrib/google.golang.org/grpc][8]     |
| [gRPC v1.2][7]   | Fully Supported | [gopkg.in/DataDog/dd-trace-go.v1/contrib/google.golang.org/grpc.v12][9] |
| [chi][10]         | Fully Supported | [gopkg.in/DataDog/dd-trace-go.v1/contrib/google.golang.org/grpc.v12][11] |
| [echo][12]        | Fully Supported | [gopkg.in/DataDog/dd-trace-go.v1/contrib/labstack/echo][13]              |

#### Library Compatibility

The Go tracer includes support for the following data stores and libraries.

| Library                 | Support Type    | Examples and Documentation                                                      |
|-------------------------|-----------------|---------------------------------------------------------------------------------|
| [AWS SDK][14]           | Fully Supported | [gopkg.in/DataDog/dd-trace-go.v1/contrib/aws/aws-sdk-go/aws][15]                |
| [Elasticsearch][16]     | Fully Supported | [gopkg.in/DataDog/dd-trace-go.v1/contrib/olivere/elastic][17]                   |
| [Cassandra][18]         | Fully Supported | [gopkg.in/DataDog/dd-trace-go.v1/contrib/gocql/gocql][19]                       |
| [GraphQL][20]           | Fully Supported | [gopkg.in/DataDog/dd-trace-go.v1/contrib/graph-gophers/graphql-go][21]          |
| [HTTP][22]              | Fully Supported | [gopkg.in/DataDog/dd-trace-go.v1/contrib/net/http][23]                          |
| [HTTP router][24]       | Fully Supported | [gopkg.in/DataDog/dd-trace-go.v1/contrib/julienschmidt/httprouter][25]          |
| [Redis (go-redis)][26]  | Fully Supported | [gopkg.in/DataDog/dd-trace-go.v1/contrib/go-redis/redis][27]                    |
| [Redis (redigo)][28]    | Fully Supported | [gopkg.in/DataDog/dd-trace-go.v1/contrib/garyburd/redigo][29]                   |
| [Redis (new redigo)][30]| Fully Supported | [gopkg.in/DataDog/dd-trace-go.v1/contrib/gomodule/redigo][31]                   |
| [SQL][32]               | Fully Supported | [gopkg.in/DataDog/dd-trace-go.v1/contrib/database/sql][33]                      |
| [SQLx][34]              | Fully Supported | [gopkg.in/DataDog/dd-trace-go.v1/contrib/jmoiron/sqlx][35]                      |
| [MongoDB][36]           | Fully Supported | [gopkg.in/DataDog/dd-trace-go.v1/contrib/go.mongodb.org/mongo-driver/mongo][37] |
| [MongoDB (mgo)[73]      | Fully Supported | [gopkg.in/DataDog/dd-trace-go.v1/contrib/globalsign/mgo][38]                    |
| [BuntDB][39]            | Fully Supported | [gopkg.in/DataDog/dd-trace-go.v1/contrib/tidwall/buntdb][40]                    |
| [LevelDB][41]           | Fully Supported | [gopkg.in/DataDog/dd-trace-go.v1/contrib/syndtr/goleveldb/leveldb][42]          |
| [miekg/dns][43]         | Fully Supported | [gopkg.in/DataDog/dd-trace-go.v1/contrib/miekg/dns][44]                         |
| [Kafka (confluent)][45] | Fully Supported | [gopkg.in/DataDog/dd-trace-go.v1/contrib/confluentinc/confluent-kafka-go][46]   |
| [Kafka (sarama)][47]    | Fully Supported | [gopkg.in/DataDog/dd-trace-go.v1/contrib/Shopify/sarama][48]                    |
| [Google API][49]        | Fully Supported | [gopkg.in/DataDog/dd-trace-go.v1/contrib/google.golang.org/api][50]             |
| [go-restful][51]        | Fully Supported | [gopkg.in/DataDog/dd-trace-go.v1/contrib/emicklei/go-restful][52]               |
| [Twirp][53]             | Fully Supported | [gopkg.in/DataDog/dd-trace-go.v1/contrib/twitchtv/twirp][54]                    |
| [Vault][55]             | Fully Supported | [gopkg.in/DataDog/dd-trace-go.v1/contrib/hashicorp/vault][56]                   |
| [Consul][57]            | Fully Supported | [gopkg.in/DataDog/dd-trace-go.v1/contrib/hashicorp/consul][58]                  |
| [Gorm][59]              | Fully Supported | [gopkg.in/DataDog/dd-trace-go.v1/contrib/jinzhu/gorm][60]                       |
| [Kubernetes][61]        | Fully Supported | [gopkg.in/DataDog/dd-trace-go.v1/contrib/k8s.io/client-go/kubernetes][62]       |
| [Memcache][63]          | Fully Supported | [gopkg.in/DataDog/dd-trace-go.v1/contrib/bradfitz/gomemcache/memcache][64]      |


Packages must be imported, i.e.:

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
[13]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib/labstack/echo
[14]: https://aws.amazon.com/sdk-for-go
[15]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib/aws/aws-sdk-go/aws
[16]: https://github.com/olivere/elastic
[17]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib/olivere/elastic
[18]: https://github.com/gocql/gocql
[19]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib/gocql/gocql
[20]: https://github.com/graph-gophers/graphql-go
[21]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib/graph-gophers/graphql-go
[22]: https://golang.org/pkg/net/http
[23]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib/net/http
[24]: https://github.com/julienschmidt/httprouter
[25]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib/julienschmidt/httprouter
[26]: https://github.com/go-redis/redis
[27]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib/go-redis/redis
[28]: https://github.com/garyburd/redigo
[29]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib/garyburd/redigo
[30]: https://github.com/gomodule/redigo
[31]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib/gomodule/redigo
[32]: https://golang.org/pkg/database/sql
[33]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib/database/sql
[34]: https://github.com/jmoiron/sqlx
[35]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib/jmoiron/sqlx
[36]: https://github.com/mongodb/mongo-go-driver
[37]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib/go.mongodb.org/mongo-driver/mongo
[38]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib/globalsign/mgo
[39]: https://github.com/tidwall/buntdb
[40]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib/tidwall/buntdb
[41]: https://github.com/syndtr/goleveldb
[42]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib/syndtr/goleveldb/leveldb
[43]: https://github.com/miekg/dns
[44]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib/miekg/dns
[45]: https://github.com/confluentinc/confluent-kafka-go
[46]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib/confluentinc/confluent-kafka-go
[47]: https://github.com/Shopify/sarama
[48]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib/Shopify/sarama
[49]: https://github.com/googleapis/google-api-go-client
[50]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib/google.golang.org/api
[51]: https://github.com/emicklei/go-restful
[52]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib/emicklei/go-restful
[53]: https://github.com/twitchtv/twirp
[54]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib/twitchtv/twirp
[55]: https://github.com/hashicorp/vault
[56]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib/hashicorp/vault
[57]: https://github.com/hashicorp/consul
[58]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib/hashicorp/consul
[59]: https://github.com/jinzhu/gorm
[60]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib/jinzhu/gorm
[61]: https://github.com/kubernetes/client-go
[62]: https://godoc.org/k8s.io/client-go/kubernetes
[63]: https://github.com/bradfitz/gomemcache/memcache
[64]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib/bradfitz/gomemcache/memcache
