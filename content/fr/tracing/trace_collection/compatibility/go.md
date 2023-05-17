---
aliases:
- /fr/tracing/compatibility_requirements/go
- /fr/tracing/setup_overview/compatibility_requirements/go
code_lang: go
code_lang_weight: 30
description: Exigences de compatibilité pour le traceur Go
further_reading:
- link: tracing/trace_collection/dd_libraries/go
  tag: Documentation
  text: Instrumenter votre application
kind: documentation
title: Exigences de compatibilité Go
type: multi-code-lang
---

## Compatibilité

La bibliothèque de tracing Datadog Go est open source. Consultez le [référentiel GitHub][1] pour en savoir plus.

La bibliothèque de tracing Datadog Go inclut une [stratégie de compatibilité][2] pour les versions de Go. Les deux dernières versions de Go sont entièrement prises en charge, tandis que la troisième version la plus récente est considérée comme en [maintenance][3]. Les versions plus anciennes peuvent fonctionner, mais aucune prise en charge n'est fournie par défaut. Pour toute demande spéciale, [contactez l'assistance][4].

Vous devez exécuter la version 5.21.1 de l'Agent Datadog ou une version plus récente.

### Intégrations

#### Compatibilité des frameworks

Intégrez le traceur go avec la liste de frameworks Web ci-dessous via l'un des packages d'assistance suivants :

**Remarque** : la [documentation sur les intégrations][5] contient une description détaillée des packages pris en charge et de leurs API, ainsi que des exemples d'utilisation.

| Framework         | Type de prise en charge    | Documentation GoDoc de Datadog                                              |
|-------------------|-----------------|--------------------------------------------------------------------------|
| [Gin][6]          | Prise en charge complète | [gopkg.in/DataDog/dd-trace-go.v1/contrib/gin-gonic/gin][7]               |
| [Gorilla Mux][8] | Prise en charge complète | [gopkg.in/DataDog/dd-trace-go.v1/contrib/gorilla/mux][9]                |
| [gRPC][10]        | Prise en charge complète | [gopkg.in/DataDog/dd-trace-go.v1/contrib/google.golang.org/grpc][11]     |
| [gRPC v1.2][10]   | Prise en charge complète | [gopkg.in/DataDog/dd-trace-go.v1/contrib/google.golang.org/grpc.v12][12] |
| [chi][13]         | Prise en charge complète | [gopkg.in/DataDog/dd-trace-go.v1/contrib/go-chi/chi][14] |
| [echo v4][15]     | Prise en charge complète | [gopkg.in/DataDog/dd-trace-go.v1/contrib/labstack/echo.v4][16]           |
| [echo v3][15]     | Prise en charge complète | [gopkg.in/DataDog/dd-trace-go.v1/contrib/labstack/echo][17]              |
| [Fiber][18]     | Prise en charge complète | [gopkg.in/DataDog/dd-trace-go.v1/contrib/gofiber/fiber.v2][19]              |

#### Compatibilité des bibliothèques

Le traceur Go prend en charge les datastores et les bibliothèques suivants.

| Bibliothèque                 | Type de prise en charge    | Exemples et documentation                                                      |
|-------------------------|-----------------|---------------------------------------------------------------------------------|
| [AWS SDK][20]           | Prise en charge complète | [gopkg.in/DataDog/dd-trace-go.v1/contrib/aws/aws-sdk-go/aws][21]                |
| [AWS SDK v2][75]        | Prise en charge complète | [gopkg.in/DataDog/dd-trace-go.v1/contrib/aws/aws-sdk-go-v2/aws][76]                |
| [Elasticsearch][22]     | Prise en charge complète | [gopkg.in/DataDog/dd-trace-go.v1/contrib/olivere/elastic][23]                   |
| [Cassandra][24]         | Prise en charge complète | [gopkg.in/DataDog/dd-trace-go.v1/contrib/gocql/gocql][25]                       |
| [GraphQL][26]           | Prise en charge complète | [gopkg.in/DataDog/dd-trace-go.v1/contrib/graph-gophers/graphql-go][27]          |
| [HTTP][28]              | Prise en charge complète | [gopkg.in/DataDog/dd-trace-go.v1/contrib/net/http][29]                          |
| [HTTP router][30]       | Prise en charge complète | [gopkg.in/DataDog/dd-trace-go.v1/contrib/julienschmidt/httprouter][31]          |
| [Redis (go-redis)][32]  | Prise en charge complète | [gopkg.in/DataDog/dd-trace-go.v1/contrib/go-redis/redis][33]                    |
| [Redis (go-redis-v8)][34]| Prise en charge complète | [gopkg.in/DataDog/dd-trace-go.v1/contrib/go-redis/redis.v8][35]                |
| [Redis (redigo)][36]    | Prise en charge complète | [gopkg.in/DataDog/dd-trace-go.v1/contrib/garyburd/redigo][37]                   |
| [Redis (new redigo)][38]| Prise en charge complète | [gopkg.in/DataDog/dd-trace-go.v1/contrib/gomodule/redigo][39]                   |
| [SQL][40]               | Prise en charge complète | [gopkg.in/DataDog/dd-trace-go.v1/contrib/database/sql][41]                      |
| [SQLx][42]              | Prise en charge complète | [gopkg.in/DataDog/dd-trace-go.v1/contrib/jmoiron/sqlx][43]                      |
| [MongoDB][44]           | Prise en charge complète | [gopkg.in/DataDog/dd-trace-go.v1/contrib/go.mongodb.org/mongo-driver/mongo][45] |
| [MongoDB (mgo)][73]      | Prise en charge complète | [gopkg.in/DataDog/dd-trace-go.v1/contrib/globalsign/mgo][46]                    |
| [BuntDB][47]            | Prise en charge complète | [gopkg.in/DataDog/dd-trace-go.v1/contrib/tidwall/buntdb][48]                    |
| [LevelDB][49]           | Prise en charge complète | [gopkg.in/DataDog/dd-trace-go.v1/contrib/syndtr/goleveldb/leveldb][50]          |
| [miekg/dns][51]         | Prise en charge complète | [gopkg.in/DataDog/dd-trace-go.v1/contrib/miekg/dns][52]                         |
| [Kafka (confluent)][53] | Prise en charge complète | [gopkg.in/DataDog/dd-trace-go.v1/contrib/confluentinc/confluent-kafka-go][54]   |
| [Kafka (sarama)][55]    | Prise en charge complète | [gopkg.in/DataDog/dd-trace-go.v1/contrib/Shopify/sarama][56]                    |
| [API Google][57]        | Prise en charge complète | [gopkg.in/DataDog/dd-trace-go.v1/contrib/google.golang.org/api][58]             |
| [go-restful][59]        | Prise en charge complète | [gopkg.in/DataDog/dd-trace-go.v1/contrib/emicklei/go-restful][60]               |
| [Twirp][61]             | Prise en charge complète | [gopkg.in/DataDog/dd-trace-go.v1/contrib/twitchtv/twirp][62]                    |
| [Vault][63]             | Prise en charge complète | [gopkg.in/DataDog/dd-trace-go.v1/contrib/hashicorp/vault][64]                   |
| [Consul][65]            | Prise en charge complète | [gopkg.in/DataDog/dd-trace-go.v1/contrib/hashicorp/consul][66]                  |
| [Gorm][67]              | Prise en charge complète | [gopkg.in/DataDog/dd-trace-go.v1/contrib/jinzhu/gorm][68]                       |
| [Gorm v2][69]           | Prise en charge complète | [gopkg.in/DataDog/dd-trace-go.v1/contrib/gorm.io/gorm.v1][70]                   |
| [Kubernetes][71]        | Prise en charge complète | [gopkg.in/DataDog/dd-trace-go.v1/contrib/k8s.io/client-go/kubernetes][72]       |
| [Memcache][73]          | Prise en charge complète | [gopkg.in/DataDog/dd-trace-go.v1/contrib/bradfitz/gomemcache/memcache][74]      |


Les packages doivent être importés de la façon suivante :

```go
import "gopkg.in/DataDog/dd-trace-go.v1/contrib/<RÉPERTOIRE_PACKAGE>/<NOM_PACKAGE>"
```

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/dd-trace-go
[2]: https://github.com/DataDog/dd-trace-go#support-policy
[3]: https://github.com/DataDog/dd-trace-go#support-maintenance
[4]: https://www.datadoghq.com/support/
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
[34]: https://github.com/go-redis/redis/v8
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
[54]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/contrib/confluentinc/confluent-kafka-go
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
[68]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/contrib/jinzhu/gorm
[69]: https://gorm.io/
[70]: https://gopkg.in/DataDog/dd-trace-go.v1/contrib/gorm.io/gorm.v1
[71]: https://github.com/kubernetes/client-go
[72]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/contrib/k8s.io/client-go/kubernetes
[73]: https://github.com/bradfitz/gomemcache/memcache
[74]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/contrib/bradfitz/gomemcache/memcache
[75]: https://aws.github.io/aws-sdk-go-v2/docs/
[76]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/contrib/aws/aws-sdk-go-v2/aws