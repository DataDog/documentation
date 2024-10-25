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
| [Gin][6]          | Prise en charge complète | [github.com/DataDog/dd-trace-go/contrib/gin-gonic/gin/v2][7]               |
| [Gorilla Mux][8] | Prise en charge complète | [github.com/DataDog/dd-trace-go/contrib/gorilla/mux/v2][9]                |
| [gRPC][10]        | Prise en charge complète | [github.com/DataDog/dd-trace-go/contrib/google.golang.org/grpc/v2][11]     |
| [chi][13]         | Prise en charge complète | [github.com/DataDog/dd-trace-go/contrib/go-chi/chi/v2][14] |
| [echo v4][15]     | Prise en charge complète | [github.com/DataDog/dd-trace-go/contrib/labstack/echo.v4/v2][16]           |
| [Fiber][18]     | Prise en charge complète | [github.com/DataDog/dd-trace-go/contrib/gofiber/fiber.v2/v2][19]              |

#### Compatibilité des bibliothèques

Le traceur Go prend en charge les datastores et les bibliothèques suivants.

| Bibliothèque                 | Type de prise en charge    | Exemples et documentation                                                      |
|-------------------------|-----------------|---------------------------------------------------------------------------------|
| [AWS SDK][20]           | Prise en charge complète | [github.com/DataDog/dd-trace-go/contrib/aws/aws-sdk-go/aws/v2][21]                |
| [AWS SDK v2][75]        | Prise en charge complète | [github.com/DataDog/dd-trace-go/contrib/aws/aws-sdk-go-v2/aws/v2][76]                |
| [Elasticsearch][22]     | Prise en charge complète | [github.com/DataDog/dd-trace-go/contrib/olivere/elastic.v5/v2][23]                   |
| [Cassandra][24]         | Prise en charge complète | [github.com/DataDog/dd-trace-go/contrib/gocql/gocql/v2][25]                       |
| [GraphQL][26]           | Prise en charge complète | [github.com/DataDog/dd-trace-go/contrib/graph-gophers/graphql-go/v2][27]          |
| [HTTP][28]              | Prise en charge complète | [github.com/DataDog/dd-trace-go/contrib/net/http/v2][29]                          |
| [HTTP router][30]       | Prise en charge complète | [github.com/DataDog/dd-trace-go/contrib/julienschmidt/httprouter/v2][31]          |
| [Redis (go-redis)][32]  | Prise en charge complète | [github.com/DataDog/dd-trace-go/contrib/go-redis/redis/v2][33]                    |
| [Redis (go-redis-v8)][34]| Prise en charge complète | [github.com/DataDog/dd-trace-go/contrib/go-redis/redis.v8/v2][35]                |
| [Redis (redigo)][36]    | Prise en charge complète | [github.com/DataDog/dd-trace-go/contrib/garyburd/redigo/v2][37]                   |
| [Redis (new redigo)][38]| Prise en charge complète | [github.com/DataDog/dd-trace-go/contrib/gomodule/redigo/v2][39]                   |
| [SQL][40]               | Prise en charge complète | [github.com/DataDog/dd-trace-go/contrib/database/sql/v2][41]                      |
| [SQLx][42]              | Prise en charge complète | [github.com/DataDog/dd-trace-go/contrib/jmoiron/sqlx/v2][43]                      |
| [MongoDB][44]           | Prise en charge complète | [github.com/DataDog/dd-trace-go/contrib/go.mongodb.org/mongo-driver/mongo/v2][45] |
| [MongoDB (mgo)][73]      | Prise en charge complète | [github.com/DataDog/dd-trace-go/contrib/globalsign/mgo/v2][46]                    |
| [BuntDB][47]            | Prise en charge complète | [github.com/DataDog/dd-trace-go/contrib/tidwall/buntdb/v2][48]                    |
| [LevelDB][49]           | Prise en charge complète | [github.com/DataDog/dd-trace-go/contrib/syndtr/goleveldb/leveldb/v2][50]          |
| [miekg/dns][51]         | Prise en charge complète | [github.com/DataDog/dd-trace-go/contrib/miekg/dns/v2][52]                         |
| [Kafka (confluent)][53] | Prise en charge complète | [github.com/DataDog/dd-trace-go/contrib/confluentinc/confluent-kafka-go/v2][54]   |
| [Kafka (sarama)][55]    | Prise en charge complète | [github.com/DataDog/dd-trace-go/contrib/Shopify/sarama/v2][56]                    |
| [API Google][57]        | Prise en charge complète | [github.com/DataDog/dd-trace-go/contrib/google.golang.org/api/v2][58]             |
| [go-restful][59]        | Prise en charge complète | [github.com/DataDog/dd-trace-go/contrib/emicklei/go-restful.v3/v2][60]               |
| [Twirp][61]             | Prise en charge complète | [github.com/DataDog/dd-trace-go/contrib/twitchtv/twirp/v2][62]                    |
| [Vault][63]             | Prise en charge complète | [github.com/DataDog/dd-trace-go/contrib/hashicorp/vault/v2][64]                   |
| [Consul][65]            | Prise en charge complète | [github.com/DataDog/dd-trace-go/contrib/hashicorp/consul/v2][66]                  |
| [Gorm v2][69]           | Prise en charge complète | [github.com/DataDog/dd-trace-go/contrib/gorm.io/gorm.v1/v2][70]                   |
| [Kubernetes][71]        | Prise en charge complète | [github.com/DataDog/dd-trace-go/contrib/k8s.io/client-go/kubernetes/v2][72]       |
| [Memcache][73]          | Prise en charge complète | [github.com/DataDog/dd-trace-go/contrib/bradfitz/gomemcache/memcache/v2][74]      |


Les packages doivent être importés de la façon suivante :

```go
import "github.com/DataDog/dd-trace-go/contrib/<RÉPERTOIRE_PACKAGE>/<NOM_PACKAGE>/v2"
```

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/dd-trace-go
[2]: https://github.com/DataDog/dd-trace-go#support-policy
[3]: https://github.com/DataDog/dd-trace-go#support-maintenance
[4]: https://www.datadoghq.com/support/
[5]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/v2/contrib
[6]: https://gin-gonic.com
[7]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/contrib/gin-gonic/gin/v2
[8]: http://www.gorillatoolkit.org/pkg/mux
[9]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/contrib/gorilla/mux/v2
[10]: https://github.com/grpc/grpc-go
[11]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/contrib/google.golang.org/grpc/v2
[13]: https://github.com/go-chi/chi
[14]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/contrib/go-chi/chi/v2
[15]: https://github.com/labstack/echo
[16]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/contrib/labstack/echo.v4/v2
[18]: https://github.com/gofiber/fiber
[19]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/contrib/gofiber/fiber.v2/v2
[20]: https://aws.amazon.com/sdk-for-go
[21]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/contrib/aws/aws-sdk-go/aws/v2
[22]: https://github.com/olivere/elastic
[23]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/contrib/olivere/elastic.v5/v2
[24]: https://github.com/gocql/gocql
[25]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/contrib/gocql/gocql/v2
[26]: https://github.com/graph-gophers/graphql-go
[27]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/contrib/graph-gophers/graphql-go/v2
[28]: https://golang.org/pkg/net/http
[29]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/contrib/net/http/v2
[30]: https://github.com/julienschmidt/httprouter
[31]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/contrib/julienschmidt/httprouter/v2
[32]: https://github.com/go-redis/redis
[33]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/contrib/go-redis/redis/v2
[34]: https://github.com/go-redis/redis/v8
[35]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/contrib/go-redis/redis.v8/v2
[36]: https://github.com/garyburd/redigo
[37]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/contrib/garyburd/redigo/v2
[38]: https://github.com/gomodule/redigo
[39]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/contrib/gomodule/redigo/v2
[40]: https://golang.org/pkg/database/sql
[41]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/contrib/database/sql/v2
[42]: https://github.com/jmoiron/sqlx
[43]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/contrib/jmoiron/sqlx/v2
[44]: https://github.com/mongodb/mongo-go-driver
[45]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/contrib/go.mongodb.org/mongo-driver/mongo/v2
[46]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/contrib/globalsign/mgo/v2
[47]: https://github.com/tidwall/buntdb
[48]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/contrib/tidwall/buntdb/v2
[49]: https://github.com/syndtr/goleveldb
[50]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/contrib/syndtr/goleveldb/leveldb/v2
[51]: https://github.com/miekg/dns
[52]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/contrib/miekg/dns/v2
[53]: https://github.com/confluentinc/confluent-kafka-go
[54]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/contrib/confluentinc/confluent-kafka-go/v2
[55]: https://github.com/Shopify/sarama
[56]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/contrib/Shopify/sarama/v2
[57]: https://github.com/googleapis/google-api-go-client
[58]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/contrib/google.golang.org/api/v2
[59]: https://github.com/emicklei/go-restful
[60]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/contrib/emicklei/go-restful.v3/v2
[61]: https://github.com/twitchtv/twirp
[62]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/contrib/twitchtv/twirp/v2
[63]: https://github.com/hashicorp/vault
[64]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/contrib/hashicorp/vault/v2
[65]: https://github.com/hashicorp/consul
[66]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/contrib/hashicorp/consul/v2
[69]: https://gorm.io/
[70]: https://github.com/DataDog/dd-trace-go/contrib/gorm.io/gorm.v1/v2
[71]: https://github.com/kubernetes/client-go
[72]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/contrib/k8s.io/client-go/kubernetes/v2
[73]: https://github.com/bradfitz/gomemcache/memcache
[74]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/contrib/bradfitz/gomemcache/memcache/v2
[75]: https://aws.github.io/aws-sdk-go-v2/docs/
[76]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/contrib/aws/aws-sdk-go-v2/aws/v2