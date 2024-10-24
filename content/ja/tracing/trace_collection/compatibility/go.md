---
aliases:
- /ja/tracing/compatibility_requirements/go
- /ja/tracing/setup_overview/compatibility_requirements/go
code_lang: go
code_lang_weight: 30
description: Go トレーサーの互換性要件です。
further_reading:
- link: tracing/trace_collection/dd_libraries/go
  tag: ドキュメント
  text: アプリケーションのインスツルメンテーション
title: Go 互換性要件
type: multi-code-lang
---

## 互換性

Go Datadog Trace ライブラリはオープンソースです。詳細については、[GitHub リポジトリ][1]をご覧ください。

Go Datadog トレースライブラリは、Go のバージョンに対して[バージョンサポートポリシー][2]が定義されています。Go の 2 つの最新リリースは完全にサポートされ、3 つ目の最新リリースは[メンテナンス][3]中と見なされています。古いバージョンも機能しますが、デフォルトではサポートは提供されません。特別なリクエストは、[サポートに連絡][4]してください。

### 要件

- Datadog Agent v5.21.1+。
- インテグレーションを構成する前に、[Datadog Go トレーサーを追加して初期化][77]してください。

### インテグレーション

#### フレームワークの互換性

次のヘルパーパッケージのいずれかを使用して、Go トレーサーと次のリストのウェブフレームワークを統合します。

**注**: [インテグレーションドキュメント][5]は、サポートされているパッケージとその API の詳細な概要を使用例とともに提供します。

| フレームワーク         | サポートの種類    | GoDoc Datadog ドキュメント                                              |
|-------------------|-----------------|--------------------------------------------------------------------------|
| [Gin][6]          | 完全対応 | [github.com/DataDog/dd-trace-go/contrib/gin-gonic/gin][7]               |/v2
| [Gorilla Mux][8] | 完全対応 | [github.com/DataDog/dd-trace-go/contrib/gorilla/mux][9]                |/v2
| [gRPC][10]        | 完全対応 | [github.com/DataDog/dd-trace-go/contrib/google.golang.org/grpc][11]     |/v2
| [gRPC v1.2][10]   | 完全対応 | [github.com/DataDog/dd-trace-go/contrib/google.golang.org/grpc.v12][12] |/v2
| [chi][13]         | 完全対応 | [github.com/DataDog/dd-trace-go/contrib/go-chi/chi][14] |/v2
| [echo v4][15]     | 完全対応 | [github.com/DataDog/dd-trace-go/contrib/labstack/echo.v4][16]           |/v2
| [echo v3][15]     | 完全対応 | [github.com/DataDog/dd-trace-go/contrib/labstack/echo][17]              |/v2
| [Fiber][18]     | 完全対応 | [github.com/DataDog/dd-trace-go/contrib/gofiber/fiber.v2][19]              |/v2

#### ライブラリの互換性

Go トレーサーには、次のデータストアとライブラリのサポートが含まれています。

| ライブラリ                 | サポートの種類    | 例とドキュメント                                                      |
|-------------------------|-----------------|---------------------------------------------------------------------------------|
| [AWS SDK][20]           | 完全対応 | [github.com/DataDog/dd-trace-go/contrib/aws/aws-sdk-go/aws][21]                |/v2
| [AWS SDK v2][75]        | 完全対応 | [github.com/DataDog/dd-trace-go/contrib/aws/aws-sdk-go-v2/aws][76]                |/v2
| [Elasticsearch][22]     | 完全対応 | [github.com/DataDog/dd-trace-go/contrib/olivere/elastic][23]                   |/v2
| [Cassandra][24]         | 完全対応 | [github.com/DataDog/dd-trace-go/contrib/gocql/gocql][25]                       |/v2
| [GraphQL][26]           | 完全対応 | [github.com/DataDog/dd-trace-go/contrib/graph-gophers/graphql-go][27]          |/v2
| [HTTP][28]              | 完全対応 | [github.com/DataDog/dd-trace-go/contrib/net/http][29]                          |/v2
| [HTTP router][30]       | 完全対応 | [github.com/DataDog/dd-trace-go/contrib/julienschmidt/httprouter][31]          |/v2
| [Redis (go-redis)][32]  | 完全対応 | [github.com/DataDog/dd-trace-go/contrib/go-redis/redis][33]                    |/v2
| [Redis (go-redis-v8)][34]| 完全対応 | [github.com/DataDog/dd-trace-go/contrib/go-redis/redis.v8][35]                |/v2
| [Redis (redigo)][36]    | 完全対応 | [github.com/DataDog/dd-trace-go/contrib/garyburd/redigo][37]                   |/v2
| [Redis (new redigo)][38]| 完全対応 | [github.com/DataDog/dd-trace-go/contrib/gomodule/redigo][39]                   |/v2
| [SQL][40]               | 完全対応 | [github.com/DataDog/dd-trace-go/contrib/database/sql][41]                      |/v2
| [SQLx][42]              | 完全対応 | [github.com/DataDog/dd-trace-go/contrib/jmoiron/sqlx][43]                      |/v2
| [MongoDB][44]           | 完全対応 | [github.com/DataDog/dd-trace-go/contrib/go.mongodb.org/mongo-driver/mongo][45] |/v2
| [MongoDB (mgo)[73]      | 完全対応 | [github.com/DataDog/dd-trace-go/contrib/globalsign/mgo][46]                    |/v2
| [BuntDB][47]            | 完全対応 | [github.com/DataDog/dd-trace-go/contrib/tidwall/buntdb][48]                    |/v2
| [LevelDB][49]           | 完全対応 | [github.com/DataDog/dd-trace-go/contrib/syndtr/goleveldb/leveldb][50]          |/v2
| [miekg/dns][51]         | 完全対応 | [github.com/DataDog/dd-trace-go/contrib/miekg/dns][52]                         |/v2
| [Kafka (confluent)][53] | 完全対応 | [github.com/DataDog/dd-trace-go/contrib/confluentinc/confluent-kafka-go][54]   |/v2
| [Kafka (sarama)][55]    | 完全対応 | [github.com/DataDog/dd-trace-go/contrib/Shopify/sarama][56]                    |/v2
| [Google API][57]        | 完全対応 | [github.com/DataDog/dd-trace-go/contrib/google.golang.org/api][58]             |/v2
| [go-restful][59]        | 完全対応 | [github.com/DataDog/dd-trace-go/contrib/emicklei/go-restful][60]               |/v2
| [Twirp][61]             | 完全対応 | [github.com/DataDog/dd-trace-go/contrib/twitchtv/twirp][62]                    |/v2
| [Vault][63]             | 完全対応 | [github.com/DataDog/dd-trace-go/contrib/hashicorp/vault][64]                   |/v2
| [Consul][65]            | 完全対応 | [github.com/DataDog/dd-trace-go/contrib/hashicorp/consul][66]                  |/v2
| [Gorm][67]              | 完全対応 | [github.com/DataDog/dd-trace-go/contrib/jinzhu/gorm][68]                       |/v2
| [Gorm v2][69]           | 完全対応 | [github.com/DataDog/dd-trace-go/contrib/gorm.io/gorm.v1][70]                   |/v2
| [Kubernetes][71]        | 完全対応 | [github.com/DataDog/dd-trace-go/contrib/k8s.io/client-go/kubernetes][72]       |/v2
| [Memcache][73]          | 完全対応 | [github.com/DataDog/dd-trace-go/contrib/bradfitz/gomemcache/memcache][74]      |/v2


次でパッケージをインポートする必要があります。

```go
import "github.com/DataDog/dd-trace-go/contrib/<パッケージディレクトリ>/<パッケージ名>/v2"
```

## その他の参考資料

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
[77]: /ja/tracing/trace_collection/library_config/go/
