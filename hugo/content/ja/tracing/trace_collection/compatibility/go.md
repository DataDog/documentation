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

Go 向け Datadog Trace Library には、Go バージョンに関する [サポート方針][2] が定められています。最新 2 リリースの Go は完全サポートの対象で、3 番目に新しいリリースはメンテナンス対象です。それより古いバージョンでも動作することはありますが、標準ではサポートされません。個別の要望がある場合は、[サポートに連絡][4] してください。

### 要件

- Datadog Agent v5.21.1+。
- インテグレーションを設定する前に、次のいずれかの方法でアプリケーションにインスツルメンテーションを組み込みます:
  * [`orchestrion` を使ってコンパイル時に自動インスツルメンテーションする][78]
  * [Datadog Go tracer を手動で追加して初期化する][77]

### Go Tracer のサポート

Datadog では、すべてのユーザーに Go Tracer の v2 を推奨しています。v1 を利用している場合は、[移行ガイド][79] を参照して v2 へアップグレードしてください。

| バージョン   | プレビュー      | 一般提供 (GA)  | メンテナンス   | サポート終了 (EOL) |
|---------|------------|----------------------------|-------------|-------------------|
| v1      | 2024-11-27 | 2025-06-04                 | TBD         | TBD               |
| v1      | 2018-06-06 | 2018-06-06                 | 2025-06-04  | 2025-12-31        |
| v0      | 2016-12-12 | 2016-12-12                 | 2018-06-06  | 2019-06-06        |

| Level                     |  サポート内容                                       |
|---------------------------|---------------------------------------------------------|
| 非サポート                 | 実装していません。特別なご要望は [Datadog サポート][2]にお問い合わせください。 |
| プレビュー                     | 初期実装です。まだすべての機能が含まれていない可能性があります。新機能のサポート、バグやセキュリティの修正は、ベストエフォートで提供されます。|
| 一般提供 (GA) | 全機能の完全実装。新機能、バグやセキュリティの修正を完全サポート。|
| メンテナンス                 | 既存機能の完全実装。新機能は受けません。バグフィックス、セキュリティフィックスのみの対応となります。|
| サポート終了 (EOL)         | サポートはありません。 |

### インテグレーション

#### フレームワークの互換性

次のヘルパーパッケージのいずれかを使用して、Go トレーサーと次のリストのウェブフレームワークを統合します。

{{% tracing-go-v2 %}}

Go Tracer の v1 と v2 では、サポート対象のフレームワークが異なります。

{{< tabs >}}
{{% tab "v2" %}}

**注**: [インテグレーション ドキュメント][79] には、サポート対象パッケージとその API の詳細な一覧に加え、使用例も掲載されています。

| フレームワーク         | サポートの種類    | GoDoc Datadog ドキュメント                                              |
|-------------------|-----------------|--------------------------------------------------------------------------|
| [Gin][6]          | 完全対応 | [github.com/DataDog/dd-trace-go/contrib/gin-gonic/gin/v2][80]               |
| [Gorilla Mux][8] | 完全対応 | [github.com/DataDog/dd-trace-go/contrib/gorilla/mux/v2][81]                |
| [gRPC][10]        | 完全対応 | [github.com/DataDog/dd-trace-go/contrib/google.golang.org/grpc/v2][82]     |
| [chi][13]         | 完全対応 | [github.com/DataDog/dd-trace-go/contrib/go-chi/chi/v2][83] |
| [echo v4][15]     | 完全対応 | [github.com/DataDog/dd-trace-go/contrib/labstack/echo.v4/v2][84]           |
| [Fiber][18]     | 完全対応 | [github.com/DataDog/dd-trace-go/contrib/gofiber/fiber.v2/v2][85]              |

#### ライブラリの互換性

Go トレーサーには、次のデータストアとライブラリのサポートが含まれています。

| ライブラリ                 | サポートの種類    | 例とドキュメント                                                      |
|-------------------------|-----------------|---------------------------------------------------------------------------------|
| [AWS SDK][20]           | 完全対応 | [github.com/DataDog/dd-trace-go/contrib/aws/aws-sdk-go/aws/v2][86]                |
| [AWS SDK v2][75]        | 完全対応 | [github.com/DataDog/dd-trace-go/contrib/aws/aws-sdk-go-v2/aws/v2][113]                |
| [Elasticsearch][22]     | 完全対応 | [github.com/DataDog/dd-trace-go/contrib/olivere/elastic.v5/v2][87]                   |
| [Cassandra][24]         | 完全対応 | [github.com/DataDog/dd-trace-go/contrib/gocql/gocql/v2][88]                       |
| [GraphQL][26]           | 完全対応 | [github.com/DataDog/dd-trace-go/contrib/graph-gophers/graphql-go/v2][89]          |
| [HTTP][28]              | 完全対応 | [github.com/DataDog/dd-trace-go/contrib/net/http/v2][90]                          |
| [HTTP router][30]       | 完全対応 | [github.com/DataDog/dd-trace-go/contrib/julienschmidt/httprouter/v2][91]          |
| [Redis (go-redis)][32]  | 完全対応 | [github.com/DataDog/dd-trace-go/contrib/go-redis/redis/v2][92]                    |
| [Redis (go-redis-v8)][34]| 完全対応 | [github.com/DataDog/dd-trace-go/contrib/go-redis/redis.v8/v2][93]                |
| [Redis (redigo)][36]    | 完全対応 | [github.com/DataDog/dd-trace-go/contrib/garyburd/redigo/v2][94]                   |
| [Redis (new redigo)][38]| 完全対応 | [github.com/DataDog/dd-trace-go/contrib/gomodule/redigo/v2][95]                   |
| [SQL][40]               | 完全対応 | [github.com/DataDog/dd-trace-go/contrib/database/sql/v2][96]                      |
| [SQLx][42]              | 完全対応 | [github.com/DataDog/dd-trace-go/contrib/jmoiron/sqlx/v2][97]                      |
| [MongoDB][44]           | 完全対応 | [github.com/DataDog/dd-trace-go/contrib/go.mongodb.org/mongo-driver/mongo/v2][98] |
| [MongoDB (mgo)][114]      | 完全対応 | [github.com/DataDog/dd-trace-go/contrib/globalsign/mgo/v2][99]                    |
| [BuntDB][47]            | 完全対応 | [github.com/DataDog/dd-trace-go/contrib/tidwall/buntdb/v2][100]                    |
| [LevelDB][49]           | 完全対応 | [github.com/DataDog/dd-trace-go/contrib/syndtr/goleveldb/leveldb/v2][101]          |
| [miekg/dns][51]         | 完全対応 | [github.com/DataDog/dd-trace-go/contrib/miekg/dns/v2][102]                         |
| [Kafka (confluent)][53] | 完全対応 | [github.com/DataDog/dd-trace-go/contrib/confluentinc/confluent-kafka-go/v2][103]   |
| [Kafka (sarama)][55]    | 完全対応 | [github.com/DataDog/dd-trace-go/contrib/IBM/sarama/v2][104]                     |
| [Google API][57]        | 完全対応 | [github.com/DataDog/dd-trace-go/contrib/google.golang.org/api/v2][105]             |
| [go-restful][59]        | 完全対応 | [github.com/DataDog/dd-trace-go/contrib/emicklei/go-restful.v3/v2][106]               |
| [Twirp][61]             | 完全対応 | [github.com/DataDog/dd-trace-go/contrib/twitchtv/twirp/v2][107]                    |
| [Vault][63]             | 完全対応 | [github.com/DataDog/dd-trace-go/contrib/hashicorp/vault/v2][108]                   |
| [Consul][65]            | 完全対応 | [github.com/DataDog/dd-trace-go/contrib/hashicorp/consul/v2][109]                  |
| [Gorm v2][69]           | 完全対応 | [github.com/DataDog/dd-trace-go/contrib/gorm.io/gorm.v1/v2][110]                   |
| [Kubernetes][71]        | 完全対応 | [github.com/DataDog/dd-trace-go/contrib/k8s.io/client-go/kubernetes/v2][111]       |
| [Memcache][73]          | 完全対応 | [github.com/DataDog/dd-trace-go/contrib/bradfitz/gomemcache/memcache/v2][112]      |

**注**: Redis 6.0+ では、`HELLO`、`MIGRATE`、`ACL SETUSER` などのコマンドでインライン認証がサポートされています。

  - **Datadog Trace Agent**: 認証パラメーターが trace メタデータ内で自動的に難読化されるようにするには、`7.76.1` が最低要件かつ推奨バージョンです。
  - **Datadog Lambda Extension** (サーバーレス環境): 最低要件バージョンは `v28.0.0` です。

次でパッケージをインポートする必要があります。

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
**注**: [インテグレーション ドキュメント][5] には、サポート対象パッケージとその API の詳細な一覧に加え、使用例も掲載されています。

| フレームワーク         | サポートの種類                                         | GoDoc Datadog ドキュメント                                              |
|-------------------|------------------------------------------------------|--------------------------------------------------------------------------|
| [Gin][6]          | 手動またはコンパイル時                               | [gopkg.in/DataDog/dd-trace-go.v1/contrib/gin-gonic/gin][7]               |
| [Gorilla Mux][8]  | 手動またはコンパイル時<sup>[🔹](#library-side)</sup> | [gopkg.in/DataDog/dd-trace-go.v1/contrib/gorilla/mux][9]                 |
| [gRPC][10]        | 手動またはコンパイル時                               | [gopkg.in/DataDog/dd-trace-go.v1/contrib/google.golang.org/grpc][11]     |
| [gRPC v1.2][10]   | 手動                                               | [gopkg.in/DataDog/dd-trace-go.v1/contrib/google.golang.org/grpc.v12][12] |
| [chi][13]         | 手動またはコンパイル時                               | [gopkg.in/DataDog/dd-trace-go.v1/contrib/go-chi/chi][14]                 |
| [echo v4][15]     | 手動またはコンパイル時                               | [gopkg.in/DataDog/dd-trace-go.v1/contrib/labstack/echo.v4][16]           |
| [echo v3][15]     | 手動                                               | [gopkg.in/DataDog/dd-trace-go.v1/contrib/labstack/echo][17]              |
| [Fiber][18]       | 手動またはコンパイル時                               | [gopkg.in/DataDog/dd-trace-go.v1/contrib/gofiber/fiber.v2][19]           |

<a id="library-side"></a>
<sup>🔹</sup> コンパイル時のインスツルメンテーション組み込みはライブラリ内で直接行われるため、`//orchestrion:ignore` ディレクティブを使ってローカルに無効化することはできません。

#### ライブラリの互換性

Go トレーサーには、次のデータストアとライブラリのサポートが含まれています。

| ライブラリ                 | サポートの種類    | 例とドキュメント                                                      |
|-------------------------|-----------------|---------------------------------------------------------------------------------|
| [AWS SDK][20]           | 完全対応 | [gopkg.in/DataDog/dd-trace-go.v1/contrib/aws/aws-sdk-go/aws][21]                |
| [AWS SDK v2][75]        | 完全対応 | [gopkg.in/DataDog/dd-trace-go.v1/contrib/aws/aws-sdk-go-v2/aws][76]                |
| [Elasticsearch][22]     | 完全対応 | [gopkg.in/DataDog/dd-trace-go.v1/contrib/olivere/elastic][23]                   |
| [Cassandra][24]         | 完全対応 | [gopkg.in/DataDog/dd-trace-go.v1/contrib/gocql/gocql][25]                       |
| [GraphQL][26]           | 完全対応 | [gopkg.in/DataDog/dd-trace-go.v1/contrib/graph-gophers/graphql-go][27]          |
| [HTTP][28]              | 完全対応 | [gopkg.in/DataDog/dd-trace-go.v1/contrib/net/http][29]                          |
| [HTTP router][30]       | 完全対応 | [gopkg.in/DataDog/dd-trace-go.v1/contrib/julienschmidt/httprouter][31]          |
| [Redis (go-redis)][32]  | 完全対応 | [gopkg.in/DataDog/dd-trace-go.v1/contrib/go-redis/redis][33]                    |
| [Redis (go-redis-v8)][34]| 完全対応 | [gopkg.in/DataDog/dd-trace-go.v1/contrib/go-redis/redis.v8][35]                |
| [Redis (redigo)][36]    | 完全対応 | [gopkg.in/DataDog/dd-trace-go.v1/contrib/garyburd/redigo][37]                   |
| [Redis (new redigo)][38]| 完全対応 | [gopkg.in/DataDog/dd-trace-go.v1/contrib/gomodule/redigo][39]                   |
| [SQL][40]               | 完全対応 | [gopkg.in/DataDog/dd-trace-go.v1/contrib/database/sql][41]                      |
| [SQLx][42]              | 完全対応 | [gopkg.in/DataDog/dd-trace-go.v1/contrib/jmoiron/sqlx][43]                      |
| [MongoDB][44]           | 完全対応 | [gopkg.in/DataDog/dd-trace-go.v1/contrib/go.mongodb.org/mongo-driver/mongo][45] |
| [MongoDB (mgo)][114]    | 完全対応 | [gopkg.in/DataDog/dd-trace-go.v1/contrib/globalsign/mgo][46]                    |
| [BuntDB][47]            | 完全対応 | [gopkg.in/DataDog/dd-trace-go.v1/contrib/tidwall/buntdb][48]                    |
| [LevelDB][49]           | 完全対応 | [gopkg.in/DataDog/dd-trace-go.v1/contrib/syndtr/goleveldb/leveldb][50]          |
| [miekg/dns][51]         | 完全対応 | [gopkg.in/DataDog/dd-trace-go.v1/contrib/miekg/dns][52]                         |
| [Kafka (confluent)][53] | 完全対応 | [gopkg.in/DataDog/dd-trace-go.v1/contrib/confluentinc/confluent-kafka-go][54]   |
| [Kafka (sarama)][55]    | 完全対応 | [gopkg.in/DataDog/dd-trace-go.v1/contrib/Shopify/sarama][56]                    |
| [Google API][57]        | 完全対応 | [gopkg.in/DataDog/dd-trace-go.v1/contrib/google.golang.org/api][58]             |
| [go-restful][59]        | 完全対応 | [gopkg.in/DataDog/dd-trace-go.v1/contrib/emicklei/go-restful][60]               |
| [Twirp][61]             | 完全対応 | [gopkg.in/DataDog/dd-trace-go.v1/contrib/twitchtv/twirp][62]                    |
| [Vault][63]             | 完全対応 | [gopkg.in/DataDog/dd-trace-go.v1/contrib/hashicorp/vault][64]                   |
| [Consul][65]            | 完全対応 | [gopkg.in/DataDog/dd-trace-go.v1/contrib/hashicorp/consul][66]                  |
| [Gorm][67]              | 完全対応 | [gopkg.in/DataDog/dd-trace-go.v1/contrib/jinzhu/gorm][68]                       |
| [Gorm v2][69]           | 完全対応 | [gopkg.in/DataDog/dd-trace-go.v1/contrib/gorm.io/gorm.v1][70]                   |
| [Kubernetes][71]        | 完全対応 | [gopkg.in/DataDog/dd-trace-go.v1/contrib/k8s.io/client-go/kubernetes][72]       |
| [Memcache][73]          | 完全対応 | [gopkg.in/DataDog/dd-trace-go.v1/contrib/bradfitz/gomemcache/memcache][74]      |


次でパッケージをインポートする必要があります。

```go
import "gopkg.in/DataDog/dd-trace-go.v1/contrib/<パッケージディレクトリ>/<パッケージ名>"
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

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/dd-trace-go
[2]: https://github.com/DataDog/dd-trace-go?tab=readme-ov-file#go-support-policy
[4]: https://www.datadoghq.com/support/
[77]: /ja/tracing/trace_collection/library_config/go/
[78]: /ja/tracing/trace_collection/automatic_instrumentation/dd_libraries/go/?tab=manualinstrumentation#activate-go-integrations-to-create-spans
[79]: /ja/tracing/trace_collection/custom_instrumentation/go/migration