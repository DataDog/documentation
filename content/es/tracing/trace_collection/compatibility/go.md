---
aliases:
- /es/tracing/compatibility_requirements/go
- /es/tracing/setup_overview/compatibility_requirements/go
code_lang: go
code_lang_weight: 30
description: Requisitos de compatibilidad para el rastreador Go
further_reading:
- link: tracing/trace_collection/dd_libraries/go
  tag: Documentación
  text: Instrumentar tu aplicación
kind: documentación
title: Requisitos de compatibilidad de Go
type: multi-code-lang
---

## Compatibilidad

La biblioteca de rastreo de Go Datadog es de código abierto; consulta el [repositorio GitHub][1] para más información.

La biblioteca de rastreo de Go Datadog tiene una [política de compatibilidad de versiones][2] definida para las versiones de Go. Las dos últimas versiones de Go son totalmente compatibles, mientras que la tercera versión más reciente se considera en [mantenimiento][3]. Las versiones anteriores pueden funcionar, pero no se proporciona soporte por defecto. Para solicitudes especiales, [contacta con soporte][4]. 

### Requisitos

- Datadog Agent v5.21.1+.
- [Añade e inicializa el rastreador Datadog Go][77] antes de configurar integraciones.

### Integraciones

#### Compatibilidad del marco

Integra el rastreador Go con la siguiente lista de marcos web utilizando uno de los siguientes paquetes auxiliares.

**Nota**: La [documentación de integraciones][5] proporciona información detallada de los paquetes compatibles y sus APIs, con ejemplos de uso.

| Marco         | Tipo de soporte    | Documentación de GoDoc Datadog                                              |
|-------------------|-----------------|--------------------------------------------------------------------------|
| [Gin] [6]          | Totalmente compatible | [gopkg.in/DataDog/dd-trace-go.v1/contrib/gin-gonic/gin][7]               |
| [Gorilla Mux][8] | Totalmente compatible | [gopkg.in/DataDog/dd-trace-go.v1/contrib/gorilla/mux][9]                |
| [gRPC][10]        | Totalmente compatible | [gopkg.in/DataDog/dd-trace-go.v1/contrib/google.golang.org/grpc][11]     |
| [gRPC v1.2][10]   | Totalmente compatible | [gopkg.in/DataDog/dd-trace-go.v1/contrib/google.golang.org/grpc.v12][12] |
| [chi][13]         | Totalmente compatible | [gopkg.in/DataDog/dd-trace-go.v1/contrib/go-chi/chi][14] |
| [echo v4][15]     | Totalmente compatible | [gopkg.in/DataDog/dd-trace-go.v1/contrib/labstack/echo.v4][16]           |
| [echo v3][15]     | Totalmente compatible | [gopkg.in/DataDog/dd-trace-go.v1/contrib/labstack/echo][17]              |
| [Fiber][18]     | Totalmente compatible | [gopkg.in/DataDog/dd-trace-go.v1/contrib/gofiber/fiber.v2][19]              |

#### Compatibilidad de biblioteca

El rastreador Go incluye compatibilidad con los siguientes almacenes de datos y bibliotecas.

| Biblioteca                 | Tipo de soporte    | Ejemplos y documentación                                                      |
|-------------------------|-----------------|---------------------------------------------------------------------------------|
| [AWS SDK][20]           | Totalmente compatible | [gopkg.in/DataDog/dd-trace-go.v1/contrib/aws/aws-sdk-go/aws][21]                |
| [AWS SDK v2][75]        | Totalmente compatible | [gopkg.in/DataDog/dd-trace-go.v1/contrib/aws/aws-sdk-go-v2/aws][76]                |
| [Elasticsearch][22]     | Totalmente compatible | [gopkg.in/DataDog/dd-trace-go.v1/contrib/olivere/elastic][23]                   |
| [Cassandra][24]         | Totalmente compatible | [gopkg.in/DataDog/dd-trace-go.v1/contrib/gocql/gocql][25]                       |
| [GraphQL][26]           | Totalmente compatible | [gopkg.in/DataDog/dd-trace-go.v1/contrib/graph-gophers/graphql-go][27]          |
| [HTTP][28]              | Totalmente compatible | [gopkg.in/DataDog/dd-trace-go.v1/contrib/net/http][29]                          |
| [Enrutador HTTP][30]       | Totalmente compatible | [gopkg.in/DataDog/dd-trace-go.v1/contrib/julienschmidt/httprouter][31]          |
| [Redis (go-redis)][32]  | Totalmente compatible | [gopkg.in/DataDog/dd-trace-go.v1/contrib/go-redis/redis][33]                    |
| [Redis (go-redis-v8)][34]| Totalmente compatible | [gopkg.in/DataDog/dd-trace-go.v1/contrib/go-redis/redis.v8][35]                |
| [Redis (redigo)][36]    | Totalmente compatible | [gopkg.in/DataDog/dd-trace-go.v1/contrib/garyburd/redigo][37]                   |
| [Redis (nuevo redigo)][38]| Totalmente compatible | [gopkg.in/DataDog/dd-trace-go.v1/contrib/gomodule/redigo][39]                   |
| [SQL][40]               | Totalmente compatible | [gopkg.in/DataDog/dd-trace-go.v1/contrib/database/sql][41]                      |
| [SQLx][42]              | Totalmente compatible | [gopkg.in/DataDog/dd-trace-go.v1/contrib/jmoiron/sqlx][43]                      |
| [MongoDB][44]           | Totalmente compatible | [gopkg.in/DataDog/dd-trace-go.v1/contrib/go.mongodb.org/mongo-driver/mongo][45] |
| [MongoDB (mgo)[73]      | Totalmente compatible | [gopkg.in/DataDog/dd-trace-go.v1/contrib/globalsign/mgo][46]                    |
| [BuntDB][47]            | Totalmente compatible | [gopkg.in/DataDog/dd-trace-go.v1/contrib/tidwall/buntdb][48]                    |
| [LevelDB][49]           | Totalmente compatible | [gopkg.in/DataDog/dd-trace-go.v1/contrib/syndtr/goleveldb/leveldb][50]          |
| [miekg/dns][51]         | Totalmente compatible | [gopkg.in/DataDog/dd-trace-go.v1/contrib/miekg/dns][52]                         |
| [Kafka (confluente)][53] | Totalmente compatible | [gopkg.in/DataDog/dd-trace-go.v1/contrib/confluentinc/confluent-kafka-go][54]   |
| [Kafka (sarama)][55]    | Totalmente compatible | [gopkg.in/DataDog/dd-trace-go.v1/contrib/Shopify/sarama][56]                    |
| [API de Google][57]        | Totalmente compatible | [gopkg.in/DataDog/dd-trace-go.v1/contrib/google.golang.org/api][58]             |
| [go-restful][59]        | Totalmente compatible | [gopkg.in/DataDog/dd-trace-go.v1/contrib/emicklei/go-restful][60]               |
| [Twirp][61]             | Totalmente compatible | [gopkg.in/DataDog/dd-trace-go.v1/contrib/twitchtv/twirp][62]                    |
| [Vault][63]             | Totalmente compatible | [gopkg.in/DataDog/dd-trace-go.v1/contrib/hashicorp/vault][64]                   |
| [Consul][65]            | Totalmente compatible | [gopkg.in/DataDog/dd-trace-go.v1/contrib/hashicorp/consul][66]                  |
| [Gorm][67]              | Totalmente compatible | [gopkg.in/DataDog/dd-trace-go.v1/contrib/jinzhu/gorm][68]                       |
| [Gorm v2][69]           | Totalmente compatible | [gopkg.in/DataDog/dd-trace-go.v1/contrib/gorm.io/gorm.v1][70]                   |
| [Kubernetes][71]        | Totalmente compatible | [gopkg.in/DataDog/dd-trace-go.v1/contrib/k8s.io/client-go/kubernetes][72]       |
| [Memcache][73]          | Totalmente compatible | [gopkg.in/DataDog/dd-trace-go.v1/contrib/bradfitz/gomemcache/memcache][74]      |


Los paquetes deben importarse con:

```go
import "gopkg.in/DataDog/dd-trace-go.v1/contrib/<PACKAGE_DIR>/<PACKAGE_NAME>"
```

## Leer más

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
[77]: /es/tracing/trace_collection/library_config/go/