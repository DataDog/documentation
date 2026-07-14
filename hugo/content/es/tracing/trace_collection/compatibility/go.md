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

La biblioteca de traces (trazas) de Go Datadog tiene una [política de compatibilidad de versiones][2] definida para las versiones de Go. Las dos últimas versiones de Go son totalmente compatibles, mientras que la tercera versión más reciente se considera en mantenimiento. Las versiones más antiguas pueden funcionar, pero no se proporciona compatibilidad predeterminada. Para solicitudes especiales, [ponte en contacto con asistencia técnica][4].

### Requisitos

- Datadog Agent v5.21.1+.
- Instrumenta tu aplicación antes de configurar integraciones utilizando uno de los siguientes métodos:
  * [Automáticamente en el momento de la compilación mediante `orchestrion`][78]
  * [Añadir e inicializar manualmente el rastreador de Datadog Go][77]

### Compatibilidad del rastreador de Go

Datadog recomienda la v2 del rastreador de Go para todos los usuarios. Si utilizas la v1, consulta la [guía de migración][79] para actualizar a la v2.

| Versión   | Vista previa      | Disponibilidad general (GA)  | Mantenimiento   | Fin de vida (EOL) |
|---------|------------|----------------------------|-------------|-------------------|
| v2      | 27-11-2024 | 04-06-2025                 | TBD         | TBD               |
| v1      | 06-06-2018 | 06-06-2018                 | 04-06-2025  | 31-12-2025        |
| v0      | 12-12-2016 | 12-12-2016                 | 06-06-2018  | 06-06-2019        |

| Nivel                     |  Compatibilidad brindada                                       |
|---------------------------|---------------------------------------------------------|
| Sin compatibilidad                 | Sin implementación. Ponte en contacto con [asistencia técnica de Datadog][2] para solicitudes especiales. |
| Vista previa                     | Implementación inicial. Puede que aún no contenga todas las funciones. La compatibilidad con las nuevas funciones y la corrección de errores y problemas de seguridad se realiza en la medida de lo posible.|
| Disponibilidad general (GA) | Implementación completa de todas las funciones. Compatibilidad completa para nuevas funciones y correcciones de errores y seguridad.|
| Mantenimiento                 | Implementación completa de las funciones existentes. No recibe nuevas funciones. Compatibilidad solo para correcciones de errores y seguridad.|
| Fin de vida (EOL)         | Sin compatibilidad. |

### integraciones

#### Compatibilidad del marco

Integra el rastreador de Go con la siguiente lista de marcos web utilizando uno de los siguientes paquetes de ayuda.

{{% tracing-go-v2 %}}

Los marcos admitidos han cambiado entre la v1 y la v2 del rastreador de Go

{{< tabs >}}
{{% tab "v2" %}}

**Nota**: La [documentación de integraciones][79] proporciona una información general detallada de los paquetes admitidos y sus API, junto con ejemplos de uso.

| Framework         | Tipo de soporte técnico    | Documentación de GoDoc Datadog                                              |
|-------------------|-----------------|--------------------------------------------------------------------------|
| [Gin] [6]          | Totalmente compatible | [github.com/DataDog/dd-trace-go/contrib/gin-gonic/gin/v2][80]               |
| [Gorilla Mux][8] | Totalmente compatible | [github.com/DataDog/dd-trace-go/contrib/gorilla/mux/v2][81]                |
| [gRPC][10]        | Totalmente compatible | [github.com/DataDog/dd-trace-go/contrib/google.golang.org/grpc/v2][82]     |
| [chi][13]         | Totalmente compatible | [github.com/DataDog/dd-trace-go/contrib/go-chi/chi/v2][83] |
| [echo v4][15]     | Totalmente compatible | [github.com/DataDog/dd-trace-go/contrib/labstack/echo.v4/v2][84]           |
| [Fiber][18]     | Totalmente compatible | [github.com/DataDog/dd-trace-go/contrib/gofiber/fiber.v2/v2][85]              |

#### Compatibilidad de la biblioteca

El rastreador Go incluye compatibilidad con los siguientes almacenes de datos y bibliotecas.

| Biblioteca                 | Tipo de soporte técnico    | Ejemplos y documentación                                                      |
|-------------------------|-----------------|---------------------------------------------------------------------------------|
| [AWS SDK][20]           | Totalmente compatible | [github.com/DataDog/dd-trace-go/contrib/aws/aws-sdk-go/aws/v2][86]                |
| [AWS SDK v2][75]        | Totalmente compatible | [github.com/DataDog/dd-trace-go/contrib/aws/aws-sdk-go-v2/aws/v2][113]                |
| [Elasticsearch][22]     | Totalmente compatible | [github.com/DataDog/dd-trace-go/contrib/olivere/elastic.v5/v2][87]                   |
| [Cassandra][24]         | Totalmente compatible | [github.com/DataDog/dd-trace-go/contrib/gocql/gocql/v2][88]                       |
| [GraphQL][26]           | Totalmente compatible | [github.com/DataDog/dd-trace-go/contrib/graph-gophers/graphql-go/v2][89]          |
| [HTTP][28]              | Totalmente compatible | [github.com/DataDog/dd-trace-go/contrib/net/http/v2][90]                          |
| [Enrutador HTTP][30]       | Totalmente compatible | [github.com/DataDog/dd-trace-go/contrib/julienschmidt/httprouter/v2][91]          |
| [Redis (go-redis)][32]  | Totalmente compatible | [github.com/DataDog/dd-trace-go/contrib/go-redis/redis/v2][92]                    |
| [Redis (go-redis-v8)][34]| Totalmente compatible | [github.com/DataDog/dd-trace-go/contrib/go-redis/redis.v8/v2][93]                |
| [Redis (redigo)][36]    | Totalmente compatible | [github.com/DataDog/dd-trace-go/contrib/garyburd/redigo/v2][94]                   |
| [Redis (nuevo redigo)][38]| Totalmente compatible | [github.com/DataDog/dd-trace-go/contrib/gomodule/redigo/v2][95]                   |
| [SQL][40]               | Totalmente compatible | [github.com/DataDog/dd-trace-go/contrib/database/sql/v2][96]                      |
| [SQLx][42]              | Totalmente compatible | [github.com/DataDog/dd-trace-go/contrib/jmoiron/sqlx/v2][97]                      |
| [MongoDB][44]           | Totalmente compatible | [github.com/DataDog/dd-trace-go/contrib/go.mongodb.org/mongo-driver/mongo/v2][98] |
| [MongoDB (mgo)][114]      | Totalmente compatible | [github.com/DataDog/dd-trace-go/contrib/globalsign/mgo/v2][99]                    |
| [BuntDB][47]            | Totalmente compatible | [github.com/DataDog/dd-trace-go/contrib/tidwall/buntdb/v2][100]                    |
| [LevelDB][49]           | Totalmente compatible | [github.com/DataDog/dd-trace-go/contrib/syndtr/goleveldb/leveldb/v2][101]          |
| [miekg/dns][51]         | Totalmente compatible | [github.com/DataDog/dd-trace-go/contrib/miekg/dns/v2][102]                         |
| [Kafka (confluente)][53] | Totalmente compatible | [github.com/DataDog/dd-trace-go/contrib/confluentinc/confluent-kafka-go/v2][103]   |
| [Kafka (sarama)][55]    | Totalmente compatible | [github.com/DataDog/dd-trace-go/contrib/IBM/sarama/v2][104]                     |
| [API de Google][57]        | Totalmente compatible | [github.com/DataDog/dd-trace-go/contrib/google.golang.org/api/v2][105]             |
| [go-restful][59]        | Totalmente compatible | [github.com/DataDog/dd-trace-go/contrib/emicklei/go-restful.v3/v2][106]               |
| [Twirp][61]             | Totalmente compatible | [github.com/DataDog/dd-trace-go/contrib/twitchtv/twirp/v2][107]                    |
| [Vault][63]             | Totalmente compatible | [github.com/DataDog/dd-trace-go/contrib/hashicorp/vault/v2][108]                   |
| [Consul][65]            | Totalmente compatible | [github.com/DataDog/dd-trace-go/contrib/hashicorp/consul/v2][109]                  |
| [Gorm v2][69]           | Totalmente compatible | [github.com/DataDog/dd-trace-go/contrib/gorm.io/gorm.v1/v2][110]                   |
| [Kubernetes][71]        | Totalmente compatible | [github.com/DataDog/dd-trace-go/contrib/k8s.io/client-go/kubernetes/v2][111]       |
| [Memcache][73]          | Totalmente compatible | [github.com/DataDog/dd-trace-go/contrib/bradfitz/gomemcache/memcache/v2][112]      |


Los paquetes deben importarse con:

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
[34]: https://github.com/go-redis/redis/v8
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
[103]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/contrib/confluentinc/confluent-kafka-go/kafka.v2/v2
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
[110]: https://github.com/DataDog/dd-trace-go/contrib/gorm.io/gorm.v1/v2
[71]: https://github.com/kubernetes/client-go
[111]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/contrib/k8s.io/client-go/kubernetes/v2
[73]: https://github.com/bradfitz/gomemcache/memcache
[112]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/contrib/bradfitz/gomemcache/memcache/v2
[114]: https://github.com/globalsign/mgo
{{% /tab %}}
{{% tab "v1" %}}
**Nota**: La [documentación de integraciones][5] proporciona una información general detallada de los paquetes admitidos y sus API, junto con ejemplos de uso.

| Framework         | Tipo de soporte técnico                                         | Documentación de GoDoc Datadog                                              |
|-------------------|------------------------------------------------------|--------------------------------------------------------------------------|
| [Gin] [6]          | Manual o en el momento de la compilación                               | [gopkg.in/DataDog/dd-trace-go.v1/contrib/gin-gonic/gin][7]               |
| [Gorilla Mux][8]  | Manual o en el momento de la compilación<sup>[🔹](#library-side)</sup> | [gopkg.in/DataDog/dd-trace-go.v1/contrib/gorilla/mux][9]                 |
| [gRPC][10]        | Manual o en el momento de la compilación                               | [gopkg.in/DataDog/dd-trace-go.v1/contrib/google.golang.org/grpc][11]     |
| [gRPC v1.2][10]   | Manual                                               | [gopkg.in/DataDog/dd-trace-go.v1/contrib/google.golang.org/grpc.v12][12] |
| [chi][13]         | Manual o en el momento de la compilación                               | [gopkg.in/DataDog/dd-trace-go.v1/contrib/go-chi/chi][14]                 |
| [echo v4][15]     | Manual o en el momento de la compilación                               | [gopkg.in/DataDog/dd-trace-go.v1/contrib/labstack/echo.v4][16]           |
| [echo v3][15]     | Manual                                               | [gopkg.in/DataDog/dd-trace-go.v1/contrib/labstack/echo][17]              |
| [Fiber][18]       | Manual o en el momento de la compilación                               | [gopkg.in/DataDog/dd-trace-go.v1/contrib/gofiber/fiber.v2][19]           |

<a id="library-side"></a>
<sup>🔹</sup> La instrumentación en el momento de la compilación se realiza directamente dentro de la biblioteca y no puede excluirse localmente mediante la directiva `//orchestrion:ignore`.

#### Compatibilidad de la biblioteca

El rastreador Go incluye compatibilidad con los siguientes almacenes de datos y bibliotecas.

| Biblioteca                 | Tipo de soporte técnico    | Ejemplos y documentación                                                      |
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
| [MongoDB (mgo)][114]    | Totalmente compatible | [gopkg.in/DataDog/dd-trace-go.v1/contrib/globalsign/mgo][46]                    |
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
[114]: https://github.com/globalsign/mgo
{{% /tab %}}
{{< /tabs >}}

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/dd-trace-go
[2]: https://github.com/DataDog/dd-trace-go?tab=readme-ov-file#go-support-policy
[4]: https://www.datadoghq.com/support/
[77]: /es/tracing/trace_collection/library_config/go/
[78]: /es/tracing/trace_collection/automatic_instrumentation/dd_libraries/go/?tab=manualinstrumentation#activate-go-integrations-to-create-spans
[79]: /es/tracing/trace_collection/custom_instrumentation/go/migration