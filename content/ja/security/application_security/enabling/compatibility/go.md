---
code_lang: go
code_lang_weight: 20
kind: documentation
title: Go 互換性要件
type: multi-code-lang
---

## Application Security capabilities

The following application security capabilities are supported in the Go library, for the specified tracer version:

| Application Security capability                   | Go トレーサーの最小バージョン |
| -------------------------------- | ----------------------------|
| Threat Detection| 1.47.0  |
| API Security | 1.59.0 |
| Threat Protection |  1.50.0   |
| ブロックされたリクエストへの対応をカスタマイズする | 1.53.0 |
| Software Composition Analysis (SCA) | 1.49.0 |
| Code Security  | 非対応 |
| ユーザーアクティビティイベントの自動追跡 | 非対応 |

The minimum tracer version to get all supported application security capabilities for Go is 1.59.0.

**注**: Threat Protection を使用するには、[リモート構成][1]を有効にする必要があり、これはリストされている最小トレーサーバージョンに含まれています。

### サポートされるデプロイメントタイプ
| タイプ        | Threat Detection のサポート | Software Composition Analysis |
|-------------|--------------------------|-------------------------------|
| Docker      | {{< X >}}                | {{< X >}}                     |
| Kubernetes  | {{< X >}}                | {{< X >}}                     |
| Amazon ECS  | {{< X >}}                | {{< X >}}                     |
| AWS Fargate | {{< X >}}                | {{< X >}}                     |
| AWS Lambda  | {{< X >}}                |                               |

## 言語とフレームワークの互換性

### サポートされている Go バージョン

Datadog Go トレーシングライブラリはオープンソースです。詳細については、[GitHub リポジトリ][2]をご覧ください。

Datadog Go トレーシングライブラリは、Go のバージョンに対して[バージョンサポートポリシー][3]が定義されています。Go の 2 つの最新リリースは完全にサポートされ、3 つ目の最新リリースは[メンテナンス][4]中と見なされています。古いバージョンも機能する可能性はありますが、デフォルトではサポートは提供されません。特別なリクエストは、[サポートに連絡][5]してください。

Datadog Agent v5.21.1+ を実行している必要があります

Starting from tracer version 1.53.0, application security capabilities do not require [CGO][15].

## Integrations

Go トレーサーには、次のフレームワーク、データストア、ライブラリのサポートが含まれています。

The Go packages listed in this page are relevant for Application Security capabilities. You can also find more tracing integrations in [APM's tracing compatibility page][16].

**注**: [Go インテグレーションドキュメント][6]は、サポートされているパッケージとその API の詳細な概要を使用例とともに提供します。

<div class="alert alert-info">ご希望のライブラリが掲載されていない場合は、<a href="https://forms.gle/gHrxGQMEnAobukfn7">このフォーム</a>に必要事項を記入して、詳細を送信してください。</div>

### Web フレームワークの互換性

| フレームワーク         | Threat Detection のサポートの有無 | Threat Protection のサポートの有無 |
|-------------------|-----------------------------|------------------------------|
| [net/http][13]     | {{< X >}}  | {{< X >}} |
| [Gin][7]          | {{< X >}} | {{< X >}} |
| [Gorilla Mux][8] | {{< X >}} | {{< X >}} |
| [gRPC][11]          | {{< X >}} | {{< X >}} |
| [echo v4][9]     | {{< X >}}  | {{< X >}} |
| [echo v3][10]     | {{< X >}} | {{< X >}} |
| [chi][12] | {{< X >}} | {{< X >}} |
| [graphql-go][17] | {{< X >}} | {{< X >}} |
| [gqlgen][18] | {{< X >}} | {{< X >}} |


### ネットワーキングフレームワークの互換性

| フレームワーク             | Threat Detection のサポートの有無 | Threat Protection のサポートの有無 |
|-----------------------|-----------------------------|------------------------------|
| [gRPC クライアント][11]     | {{< X >}}                   | {{< X >}} |
| [net/http クライアント][13] | {{< X >}}                   | {{< X >}} |

### データストアの互換性

| フレームワーク         | Threat Detection のサポートの有無    | Threat Protection のサポートの有無                                              |
|-------------------|-----------------|--------------------------------------------------------------------------|
| [sql][14]          | {{< X >}} |   {{< X >}}    |

[1]: /ja/agent/remote_config/#enabling-remote-configuration
[2]: https://github.com/DataDog/dd-trace-go
[3]: https://github.com/DataDog/dd-trace-go#support-policy
[4]: https://github.com/DataDog/dd-trace-go#support-maintenance
[5]: https://www.datadoghq.com/support/
[6]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/contrib
[7]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/contrib/gin-gonic/gin
[8]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/contrib/gorilla/mux
[9]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/contrib/labstack/echo.v4
[10]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/contrib/labstack/echo
[11]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/contrib/google.golang.org/grpc
[12]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/contrib/go-chi/chi
[13]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/contrib/net/http
[14]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/contrib/database/sql
[15]: https://github.com/golang/go/wiki/cgo
[16]: /ja/tracing/compatibility_requirements/go
[17]: https://pkg.go.dev/github.com/graphql-go/graphql
[18]: https://pkg.go.dev/github.com/99designs/gqlgen/graphql