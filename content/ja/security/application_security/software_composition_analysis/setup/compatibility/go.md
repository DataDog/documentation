---
code_lang: go
code_lang_weight: 20
title: Go 互換性要件
type: multi-code-lang
---

## アプリケーションセキュリティ機能

指定されたトレーサーバージョンに対して、Go ライブラリでサポートされるアプリケーションセキュリティ機能は以下のとおりです:

| アプリケーションセキュリティ機能                   | Go トレーサーの最小バージョン |
| -------------------------------- | ----------------------------|
| Threat Detection| 1.47.0  |
| API セキュリティ | 1.59.0 |
| Threat Protection |  1.50.0   |
| ブロックされたリクエストへの対応をカスタマイズする | 1.53.0 |
| Software Composition Analysis (SCA) | 1.49.0 |
| コードセキュリティ  | 非対応 |
| ユーザーアクティビティイベントの自動追跡 | 非対応 |

Go でサポートされるすべてのアプリケーションセキュリティ機能を利用するための最小トレーサーバージョンは 1.59.0 です。

**注**: Threat Protection を利用するには [Remote Configuration][1] を有効にする必要があります。Remote Configuration は上記の最小トレーサーバージョンに含まれています。

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

Datadog Go トレーシングライブラリには、Go のバージョンに対する [バージョンサポートポリシー][3] が定義されています。Go の直近 2 つのリリースは完全にサポートされ、3 番目に新しいリリースは [メンテナンス][4] 中と見なされます。これより古いバージョンも動作する可能性はありますが、デフォルトではサポートは提供されません。特別なリクエストについては、[サポートに連絡][5] してください。

Datadog Agent v5.21.1+ を実行している必要があります

トレーサーバージョン 1.53.0 から、アプリケーションセキュリティ機能は [CGO][15] を必要としません。

## インテグレーション

Go トレーサーには、次のフレームワーク、データストア、ライブラリのサポートが含まれています。

このページに記載の Go パッケージは、Application Security 機能に関連するものです。[APM のトレーシング互換性ページ][16] では、その他のトレーシングのインテグレーションも確認できます。

{{< tabs >}}
{{% tab "v1" %}}

**注**: [Go インテグレーションドキュメント][6]は、サポートされているパッケージとその API の詳細な概要を使用例とともに提供します。

<div class="alert alert-info">ご希望のライブラリが掲載されていない場合は、<a href="https://forms.gle/gHrxGQMEnAobukfn7">このフォーム</a>に必要事項を記入して、詳細を送信してください。</div>

### Web フレームワークの互換性

| フレームワーク         | Threat Detection のサポートの有無 | Threat Protection のサポートの有無 |
|-------------------|-----------------------------|------------------------------|
| [net/http][13]     | <i class="icon-check-bold"></i>  | <i class="icon-check-bold"></i> |
| [Gin][7]          | <i class="icon-check-bold"></i> | <i class="icon-check-bold"></i> |
| [Gorilla Mux][8] | <i class="icon-check-bold"></i> | <i class="icon-check-bold"></i> |
| [gRPC][11]          | <i class="icon-check-bold"></i> | <i class="icon-check-bold"></i> |
| [echo v4][9]     | <i class="icon-check-bold"></i>  | <i class="icon-check-bold"></i> |
| [echo v3][10]     | <i class="icon-check-bold"></i> | <i class="icon-check-bold"></i> |
| [chi][12] | <i class="icon-check-bold"></i> | <i class="icon-check-bold"></i> |
| [graphql-go][17] | <i class="icon-check-bold"></i> | <i class="icon-check-bold"></i> |
| [gqlgen][18] | <i class="icon-check-bold"></i> | <i class="icon-check-bold"></i> |


### ネットワーキングフレームワークの互換性

| フレームワーク             | Threat Detection のサポートの有無 | Threat Protection のサポートの有無 |
|-----------------------|-----------------------------|------------------------------|
| [gRPC クライアント][11]     | <i class="icon-check-bold"></i>                   | <i class="icon-check-bold"></i> |
| [net/http クライアント][13] | <i class="icon-check-bold"></i>                   | <i class="icon-check-bold"></i> |

### データストアの互換性

| フレームワーク         | Threat Detection のサポートの有無    | Threat Protection のサポートの有無                                              |
|-------------------|-----------------|--------------------------------------------------------------------------|
| [sql][14]          | <i class="icon-check-bold"></i> |   <i class="icon-check-bold"></i>    |

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
[17]: https://pkg.go.dev/github.com/graphql-go/graphql
[18]: https://pkg.go.dev/github.com/99designs/gqlgen/graphql

{{% /tab %}}

{{% tab "v2" %}}

**注**: [Go インテグレーションドキュメント][19] では、サポートされているパッケージとその API の詳細な概要が使用例とともに提供されています。

<div class="alert alert-info">ご希望のライブラリが掲載されていない場合は、<a href="https://forms.gle/gHrxGQMEnAobukfn7">このフォーム</a>に必要事項を記入して、詳細を送信してください。</div>

### Web フレームワークの互換性

| フレームワーク         | Threat Detection のサポートの有無 | Threat Protection のサポートの有無 |
|-------------------|-----------------------------|------------------------------|
| [net/http][26]     | <i class="icon-check-bold"></i>  | <i class="icon-check-bold"></i> |
| [Gin][20]          | <i class="icon-check-bold"></i> | <i class="icon-check-bold"></i> |
| [Gorilla Mux][21] | <i class="icon-check-bold"></i> | <i class="icon-check-bold"></i> |
| [gRPC][24]          | <i class="icon-check-bold"></i> | <i class="icon-check-bold"></i> |
| [echo v4][22]     | <i class="icon-check-bold"></i>  | <i class="icon-check-bold"></i> |
| [chi][25] | <i class="icon-check-bold"></i> | <i class="icon-check-bold"></i> |
| [graphql-go][17] | <i class="icon-check-bold"></i> | <i class="icon-check-bold"></i> |
| [gqlgen][18] | <i class="icon-check-bold"></i> | <i class="icon-check-bold"></i> |


### ネットワーキングフレームワークの互換性

| フレームワーク             | Threat Detection のサポートの有無 | Threat Protection のサポートの有無 |
|-----------------------|-----------------------------|------------------------------|
| [gRPC クライアント][24]     | <i class="icon-check-bold"></i>                   | <i class="icon-check-bold"></i> |
| [net/http クライアント][26] | <i class="icon-check-bold"></i>                   | <i class="icon-check-bold"></i> |

### データストアの互換性

| フレームワーク         | Threat Detection のサポートの有無    | Threat Protection のサポートの有無                                              |
|-------------------|-----------------|--------------------------------------------------------------------------|
| [sql][27]          | <i class="icon-check-bold"></i> |   <i class="icon-check-bold"></i>    |

[17]: https://pkg.go.dev/github.com/graphql-go/graphql
[18]: https://pkg.go.dev/github.com/99designs/gqlgen/graphql
[19]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/v2/contrib/
[20]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/contrib/gin-gonic/gin/v2
[21]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/contrib/gorilla/mux/v2
[22]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/contrib/labstack/echo.v4/v2
[23]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/contrib/labstack/echo/v2
[24]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/contrib/google.golang.org/grpc/v2
[25]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/contrib/go-chi/chi/v2
[26]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/contrib/net/http/v2
[27]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/contrib/database/sql/v2

{{% /tab %}}
{{< /tabs >}}

[1]: /ja/agent/remote_config/#enabling-remote-configuration
[2]: https://github.com/DataDog/dd-trace-go
[3]: https://github.com/DataDog/dd-trace-go#support-policy
[4]: https://github.com/DataDog/dd-trace-go#support-maintenance
[5]: https://www.datadoghq.com/support/
[16]: /ja/tracing/compatibility_requirements/go