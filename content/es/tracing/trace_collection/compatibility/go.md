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
| [Gin] [6]          | Totalmente compatible | [github.com/DataDog/dd-trace-go/contrib/gin-gonic/gin][7]               |/v2
| [Gorilla Mux][8] | Totalmente compatible | [github.com/DataDog/dd-trace-go/contrib/gorilla/mux][9]                |/v2
| [gRPC][10]        | Totalmente compatible | [github.com/DataDog/dd-trace-go/contrib/google.golang.org/grpc][11]     |/v2
| [gRPC v1.2][10]   | Totalmente compatible | [github.com/DataDog/dd-trace-go/contrib/google.golang.org/grpc.v12][12] |/v2
| [chi][13]         | Totalmente compatible | [github.com/DataDog/dd-trace-go/contrib/go-chi/chi][14] |/v2
| [echo v4][15]     | Totalmente compatible | [github.com/DataDog/dd-trace-go/contrib/labstack/echo.v4][16]           |/v2
| [echo v3][15]     | Totalmente compatible | [github.com/DataDog/dd-trace-go/contrib/labstack/echo][17]              |/v2
| [Fiber][18]     | Totalmente compatible | [github.com/DataDog/dd-trace-go/contrib/gofiber/fiber.v2][19]              |/v2

#### Compatibilidad de biblioteca

El rastreador Go incluye compatibilidad con los siguientes almacenes de datos y bibliotecas.

| Biblioteca                 | Tipo de soporte    | Ejemplos y documentación                                                      |
|-------------------------|-----------------|---------------------------------------------------------------------------------|
| [AWS SDK][20]           | Totalmente compatible | [github.com/DataDog/dd-trace-go/contrib/aws/aws-sdk-go/aws][21]                |/v2
| [AWS SDK v2][75]        | Totalmente compatible | [github.com/DataDog/dd-trace-go/contrib/aws/aws-sdk-go-v2/aws][76]                |/v2
| [Elasticsearch][22]     | Totalmente compatible | [github.com/DataDog/dd-trace-go/contrib/olivere/elastic][23]                   |/v2
| [Cassandra][24]         | Totalmente compatible | [github.com/DataDog/dd-trace-go/contrib/gocql/gocql][25]                       |/v2
| [GraphQL][26]           | Totalmente compatible | [github.com/DataDog/dd-trace-go/contrib/graph-gophers/graphql-go][27]          |/v2
| [HTTP][28]              | Totalmente compatible | [github.com/DataDog/dd-trace-go/contrib/net/http][29]                          |/v2
| [Enrutador HTTP][30]       | Totalmente compatible | [github.com/DataDog/dd-trace-go/contrib/julienschmidt/httprouter][31]          |/v2
| [Redis (go-redis)][32]  | Totalmente compatible | [github.com/DataDog/dd-trace-go/contrib/go-redis/redis][33]                    |/v2
| [Redis (go-redis-v8)][34]| Totalmente compatible | [github.com/DataDog/dd-trace-go/contrib/go-redis/redis.v8][35]                |/v2
| [Redis (redigo)][36]    | Totalmente compatible | [github.com/DataDog/dd-trace-go/contrib/garyburd/redigo][37]                   |/v2
| [Redis (nuevo redigo)][38]| Totalmente compatible | [github.com/DataDog/dd-trace-go/contrib/gomodule/redigo][39]                   |/v2
| [SQL][40]               | Totalmente compatible | [github.com/DataDog/dd-trace-go/contrib/database/sql][41]                      |/v2
| [SQLx][42]              | Totalmente compatible | [github.com/DataDog/dd-trace-go/contrib/jmoiron/sqlx][43]                      |/v2
| [MongoDB][44]           | Totalmente compatible | [github.com/DataDog/dd-trace-go/contrib/go.mongodb.org/mongo-driver/mongo][45] |/v2
| [MongoDB (mgo)[73]      | Totalmente compatible | [github.com/DataDog/dd-trace-go/contrib/globalsign/mgo][46]                    |/v2
| [BuntDB][47]            | Totalmente compatible | [github.com/DataDog/dd-trace-go/contrib/tidwall/buntdb][48]                    |/v2
| [LevelDB][49]           | Totalmente compatible | [github.com/DataDog/dd-trace-go/contrib/syndtr/goleveldb/leveldb][50]          |/v2
| [miekg/dns][51]         | Totalmente compatible | [github.com/DataDog/dd-trace-go/contrib/miekg/dns][52]                         |/v2
| [Kafka (confluente)][53] | Totalmente compatible | [github.com/DataDog/dd-trace-go/contrib/confluentinc/confluent-kafka-go][54]   |/v2
| [Kafka (sarama)][55]    | Totalmente compatible | [github.com/DataDog/dd-trace-go/contrib/Shopify/sarama][56]                    |/v2
| [API de Google][57]        | Totalmente compatible | [github.com/DataDog/dd-trace-go/contrib/google.golang.org/api][58]             |/v2
| [go-restful][59]        | Totalmente compatible | [github.com/DataDog/dd-trace-go/contrib/emicklei/go-restful][60]               |/v2
| [Twirp][61]             | Totalmente compatible | [github.com/DataDog/dd-trace-go/contrib/twitchtv/twirp][62]                    |/v2
| [Vault][63]             | Totalmente compatible | [github.com/DataDog/dd-trace-go/contrib/hashicorp/vault][64]                   |/v2
| [Consul][65]            | Totalmente compatible | [github.com/DataDog/dd-trace-go/contrib/hashicorp/consul][66]                  |/v2
| [Gorm][67]              | Totalmente compatible | [github.com/DataDog/dd-trace-go/contrib/jinzhu/gorm][68]                       |/v2
| [Gorm v2][69]           | Totalmente compatible | [github.com/DataDog/dd-trace-go/contrib/gorm.io/gorm.v1][70]                   |/v2
| [Kubernetes][71]        | Totalmente compatible | [github.com/DataDog/dd-trace-go/contrib/k8s.io/client-go/kubernetes][72]       |/v2
| [Memcache][73]          | Totalmente compatible | [github.com/DataDog/dd-trace-go/contrib/bradfitz/gomemcache/memcache][74]      |/v2


Los paquetes deben importarse con:

```go
import "github.com/DataDog/dd-trace-go/contrib/<PACKAGE_DIR>/<PACKAGE_NAME>/v2"
```

## Leer más

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
[12]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/contrib/google.golang.org/grpc.v12/v2
[13]: https://github.com/go-chi/chi
[14]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/contrib/go-chi/chi/v2
[15]: https://github.com/labstack/echo
[16]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/contrib/labstack/echo.v4/v2
[17]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/contrib/labstack/echo/v2
[18]: https://github.com/gofiber/fiber
[19]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/contrib/gofiber/fiber.v2/v2
[20]: https://aws.amazon.com/sdk-for-go
[21]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/contrib/aws/aws-sdk-go/aws/v2
[22]: https://github.com/olivere/elastic
[23]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/contrib/olivere/elastic/v2
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
[60]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/contrib/emicklei/go-restful/v2
[61]: https://github.com/twitchtv/twirp
[62]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/contrib/twitchtv/twirp/v2
[63]: https://github.com/hashicorp/vault
[64]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/contrib/hashicorp/vault/v2
[65]: https://github.com/hashicorp/consul
[66]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/contrib/hashicorp/consul/v2
[67]: https://github.com/jinzhu/gorm
[68]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/contrib/jinzhu/gorm/v2
[69]: https://gorm.io/
[70]: https://github.com/DataDog/dd-trace-go/contrib/gorm.io/gorm.v1/v2
[71]: https://github.com/kubernetes/client-go
[72]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/contrib/k8s.io/client-go/kubernetes/v2
[73]: https://github.com/bradfitz/gomemcache/memcache
[74]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/contrib/bradfitz/gomemcache/memcache/v2
[75]: https://aws.github.io/aws-sdk-go-v2/docs/
[76]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/contrib/aws/aws-sdk-go-v2/aws/v2
[77]: /es/tracing/trace_collection/library_config/go/