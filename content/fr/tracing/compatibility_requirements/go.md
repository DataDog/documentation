---
title: Exigences de compatibilité Go
kind: documentation
description: 'Exigences de compatibilité pour le traceur Go'
further_reading:
    - link: tracing/setup/go
      tag: Documentation
      text: Instrumenter votre application
---

## Compatibilité

La bibliothèque de tracing Datadog Go est open source. Consultez le [référentiel GitHub][1] pour en savoir plus.

Pour commencer à tracer vos applications Go, votre environnement doit :

* Exécuter l'Agent Datadog `>= 5.21.1`
* Utiliser Go `1.12+`

### Intégrations

#### Compatibilité des frameworks

Intégrez le traceur go avec la liste de frameworks Web ci-dessous via l'un des paquets d'assistance suivants :

**Remarque** : la [documentation sur les intégrations][2] contient une description détaillée des paquets pris en charge et de leurs API, ainsi que des exemples d'utilisation.

| Framework         | Type de prise en charge    | Documentation GoDoc de Datadog                                              |
|-------------------|-----------------|--------------------------------------------------------------------------|
| [Gin][3]          | Prise en charge complète | [gopkg.in/DataDog/dd-trace-go.v1/contrib/gin-gonic/gin][4]               |
| [Gorilla Mux][5] | Prise en charge complète | [gopkg.in/DataDog/dd-trace-go.v1/contrib/gorilla/mux][6]                |
| [gRPC][7]        | Prise en charge complète | [gopkg.in/DataDog/dd-trace-go.v1/contrib/google.golang.org/grpc][8]     |
| [gRPC v1.2][7]   | Prise en charge complète | [gopkg.in/DataDog/dd-trace-go.v1/contrib/google.golang.org/grpc.v12][9] |
| [chi][10]         | Prise en charge complète | [gopkg.in/DataDog/dd-trace-go.v1/contrib/google.golang.org/grpc.v12][11] |
| [echo][12]        | Prise en charge complète | [gopkg.in/DataDog/dd-trace-go.v1/contrib/labstack/echo][13]              |

#### Compatibilité des bibliothèques

Le traceur Go prend en charge les datastores et les bibliothèques suivants.

| Bibliothèque                 | Type de prise en charge    | Exemples et documentation                                                      |
|-------------------------|-----------------|---------------------------------------------------------------------------------|
| [AWS SDK][14]           | Prise en charge complète | [gopkg.in/DataDog/dd-trace-go.v1/contrib/aws/aws-sdk-go/aws][15]                |
| [AWS SDK v2][65]        | Fully Supported | [gopkg.in/DataDog/dd-trace-go.v1/contrib/aws/aws-sdk-go-v2/aws][66]                |
| [Elasticsearch][16]     | Prise en charge complète | [gopkg.in/DataDog/dd-trace-go.v1/contrib/olivere/elastic][17]                   |
| [Cassandra][18]         | Prise en charge complète | [gopkg.in/DataDog/dd-trace-go.v1/contrib/gocql/gocql][19]                       |
| [GraphQL][20]           | Prise en charge complète | [gopkg.in/DataDog/dd-trace-go.v1/contrib/graph-gophers/graphql-go][21]          |
| [HTTP][22]              | Prise en charge complète | [gopkg.in/DataDog/dd-trace-go.v1/contrib/net/http][23]                          |
| [HTTP router][24]       | Prise en charge complète | [gopkg.in/DataDog/dd-trace-go.v1/contrib/julienschmidt/httprouter][25]          |
| [Redis (go-redis)][26]  | Prise en charge complète | [gopkg.in/DataDog/dd-trace-go.v1/contrib/go-redis/redis][27]                    |
| [Redis (redigo)][28]    | Prise en charge complète | [gopkg.in/DataDog/dd-trace-go.v1/contrib/garyburd/redigo][29]                   |
| [Redis (new redigo)][30]| Prise en charge complète | [gopkg.in/DataDog/dd-trace-go.v1/contrib/gomodule/redigo][31]                   |
| [SQL][32]               | Prise en charge complète | [gopkg.in/DataDog/dd-trace-go.v1/contrib/database/sql][33]                      |
| [SQLx][34]              | Prise en charge complète | [gopkg.in/DataDog/dd-trace-go.v1/contrib/jmoiron/sqlx][35]                      |
| [MongoDB][36]           | Prise en charge complète | [gopkg.in/DataDog/dd-trace-go.v1/contrib/go.mongodb.org/mongo-driver/mongo][37] |
| [MongoDB (mgo)][73]      | Prise en charge complète | [gopkg.in/DataDog/dd-trace-go.v1/contrib/globalsign/mgo][38]                    |
| [BuntDB][39]            | Prise en charge complète | [gopkg.in/DataDog/dd-trace-go.v1/contrib/tidwall/buntdb][40]                    |
| [LevelDB][41]           | Prise en charge complète | [gopkg.in/DataDog/dd-trace-go.v1/contrib/syndtr/goleveldb/leveldb][42]          |
| [miekg/dns][43]         | Prise en charge complète | [gopkg.in/DataDog/dd-trace-go.v1/contrib/miekg/dns][44]                         |
| [Kafka (confluent)][45] | Prise en charge complète | [gopkg.in/DataDog/dd-trace-go.v1/contrib/confluentinc/confluent-kafka-go][46]   |
| [Kafka (sarama)][47]    | Prise en charge complète | [gopkg.in/DataDog/dd-trace-go.v1/contrib/Shopify/sarama][48]                    |
| [Google API][49]        | Prise en charge complète | [gopkg.in/DataDog/dd-trace-go.v1/contrib/google.golang.org/api][50]             |
| [go-restful][51]        | Prise en charge complète | [gopkg.in/DataDog/dd-trace-go.v1/contrib/emicklei/go-restful][52]               |
| [Twirp][53]             | Prise en charge complète | [gopkg.in/DataDog/dd-trace-go.v1/contrib/twitchtv/twirp][54]                    |
| [Vault][55]             | Prise en charge complète | [gopkg.in/DataDog/dd-trace-go.v1/contrib/hashicorp/vault][56]                   |
| [Consul][57]            | Prise en charge complète | [gopkg.in/DataDog/dd-trace-go.v1/contrib/hashicorp/consul][58]                  |
| [Gorm][59]              | Prise en charge complète | [gopkg.in/DataDog/dd-trace-go.v1/contrib/jinzhu/gorm][60]                       |
| [Kubernetes][61]        | Prise en charge complète | [gopkg.in/DataDog/dd-trace-go.v1/contrib/k8s.io/client-go/kubernetes][62]       |
| [Memcache][63]          | Prise en charge complète | [gopkg.in/DataDog/dd-trace-go.v1/contrib/bradfitz/gomemcache/memcache][64]      |


Les paquets doivent être importés de la façon suivante :

```go
import "gopkg.in/DataDog/dd-trace-go.v1/contrib/<RÉPERTOIRE_PAQUET>/<NOM_PAQUET>"
```

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/dd-trace-go
[2]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/contrib
[3]: https://gin-gonic.com
[4]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/contrib/gin-gonic/gin
[5]: http://www.gorillatoolkit.org/pkg/mux
[6]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/contrib/gorilla/mux
[7]: https://github.com/grpc/grpc-go
[8]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/contrib/google.golang.org/grpc
[9]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/contrib/google.golang.org/grpc.v12
[10]: https://github.com/go-chi/chi
[11]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/contrib/go-chi/chi
[12]: https://github.com/labstack/echo
[13]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/contrib/labstack/echo
[14]: https://aws.amazon.com/sdk-for-go
[15]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/contrib/aws/aws-sdk-go/aws
[16]: https://github.com/olivere/elastic
[17]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/contrib/olivere/elastic
[18]: https://github.com/gocql/gocql
[19]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/contrib/gocql/gocql
[20]: https://github.com/graph-gophers/graphql-go
[21]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/contrib/graph-gophers/graphql-go
[22]: https://golang.org/pkg/net/http
[23]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/contrib/net/http
[24]: https://github.com/julienschmidt/httprouter
[25]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/contrib/julienschmidt/httprouter
[26]: https://github.com/go-redis/redis
[27]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/contrib/go-redis/redis
[28]: https://github.com/garyburd/redigo
[29]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/contrib/garyburd/redigo
[30]: https://github.com/gomodule/redigo
[31]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/contrib/gomodule/redigo
[32]: https://golang.org/pkg/database/sql
[33]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/contrib/database/sql
[34]: https://github.com/jmoiron/sqlx
[35]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/contrib/jmoiron/sqlx
[36]: https://github.com/mongodb/mongo-go-driver
[37]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/contrib/go.mongodb.org/mongo-driver/mongo
[38]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/contrib/globalsign/mgo
[39]: https://github.com/tidwall/buntdb
[40]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/contrib/tidwall/buntdb
[41]: https://github.com/syndtr/goleveldb
[42]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/contrib/syndtr/goleveldb/leveldb
[43]: https://github.com/miekg/dns
[44]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/contrib/miekg/dns
[45]: https://github.com/confluentinc/confluent-kafka-go
[46]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/contrib/confluentinc/confluent-kafka-go
[47]: https://github.com/Shopify/sarama
[48]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/contrib/Shopify/sarama
[49]: https://github.com/googleapis/google-api-go-client
[50]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/contrib/google.golang.org/api
[51]: https://github.com/emicklei/go-restful
[52]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/contrib/emicklei/go-restful
[53]: https://github.com/twitchtv/twirp
[54]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/contrib/twitchtv/twirp
[55]: https://github.com/hashicorp/vault
[56]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/contrib/hashicorp/vault
[57]: https://github.com/hashicorp/consul
[58]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/contrib/hashicorp/consul
[59]: https://github.com/jinzhu/gorm
[60]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/contrib/jinzhu/gorm
[61]: https://github.com/kubernetes/client-go
[62]: https://pkg.go.dev/k8s.io/client-go/kubernetes
[63]: https://github.com/bradfitz/gomemcache/memcache
[64]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/contrib/bradfitz/gomemcache/memcache
[65]: https://aws.github.io/aws-sdk-go-v2/docs/
[66]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/contrib/aws/aws-sdk-go-v2/aws
