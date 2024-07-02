---
code_lang: go
code_lang_weight: 20
title: Go 互換性要件
type: multi-code-lang
---

## ASM の機能

Go ライブラリでは、指定されたトレーサーのバージョンで、以下の ASM 機能がサポートされています。

| ASM の機能                   | Go トレーサーの最小バージョン |
| -------------------------------- | ----------------------------|
| Threat Detection| 1.47.0  |
| Threat Protection |  1.50.0   |
| Vulnerability Management for Open Source Software (OSS) | 1.49.0 |
| Vulnerability Management for Code-level (ベータ版) | 非対応 |

Go でサポートされるすべての ASM 機能を得るためのトレーサーの最小バージョンは 1.50.0 です。

**注**: Threat Protection では、[リモート構成][1]を有効にする必要があり、これは記載のトレーサーの最小バージョンに含まれています。

### サポートされるデプロイメントタイプ
|タイプ | Threat Detection のサポート | OSS の脆弱性管理のサポート |
| ---           |   ---             |           ----            |
| Docker        | {{< X >}}         | {{< X >}}                 |
| Kubernetes    | {{< X >}}         | {{< X >}}                 | 
| AWS ECS       | {{< X >}}         | {{< X >}}                 |
| AWS Fargate   | {{< X >}}         | {{< X >}}                 |
| AWS Lambda    | {{< X >}}         |                           |  

## 言語とフレームワークの互換性

### サポートされている Go バージョン

Go Datadog Trace ライブラリはオープンソースです。詳細については、[GitHub リポジトリ][2]をご覧ください。

Go Datadog トレースライブラリは、Go のバージョンに対して[バージョンサポートポリシー][3]が定義されています。Go の 2 つの最新リリースは完全にサポートされ、3 つ目の最新リリースは[メンテナンス][4]中と見なされています。古いバージョンも機能する可能性はありますが、デフォルトではサポートは提供されません。特別なリクエストは、[サポートに連絡][5]してください。

Datadog Agent v5.21.1+ を実行している必要があります


## インテグレーション


### Web フレームワークの互換性

- 攻撃元の HTTP リクエストの詳細
- HTTP リクエスト用のタグ (ステータスコード、メソッドなど)
- アプリケーション内の攻撃フローを確認するための分散型トレーシング

##### ASM の機能に関する備考
- **Vulnerability Management for Code-level** はサポートされていません


| フレームワーク         | Threat Detection のサポートの有無    | Threat Detection のサポートの有無                                              |
|-------------------|-----------------|--------------------------------------------------------------------------|
| [Gin][6]          | {{< X >}} | {{< X >}}               |
| [Gorilla Mux][8] | {{< X >}} | {{< X >}}        |
| [echo v4][9]     | {{< X >}}  | {{< X >}}    |
| [echo v3][10]     | {{< X >}} | {{< X >}}             |

### ネットワーキングフレームワークの互換性

**ネットワーキングのトレーシングでは以下の確認が可能です**

- アプリケーションの分散型トレーシング
- リクエストベースのブロッキング

##### ASM の機能に関する備考
- **Vulnerability Management for Code-level** はサポートされていません

| フレームワーク         | Threat Detection のサポートの有無    | Threat Detection のサポートの有無                                              |
|-------------------|-----------------|--------------------------------------------------------------------------|
| [gRPC][11]          | {{< X >}} |       |
| [chi][12] | {{< X >}} | {{< X >}}        |
| [http][13]     | {{< X >}}  | {{< X >}}    |

<div class="alert alert-info">ご希望のフレームワークが掲載されていない場合は、お知らせください！<a href="https://forms.gle/gHrxGQMEnAobukfn7">この短いフォーム</a>に必要事項を記入して、詳細を送信してください。</div>

### データストアの互換性

**データストアのトレーシングでは以下の確認が可能です**

- SQL 攻撃の検知
- クエリ情報 (サニタイジングされたクエリ文字列など)
- エラーとスタックトレースの取得

##### ASM の機能に関する備考
- **Vulnerability Management for Code-level** はサポートされていません
- **Threat Protection** は HTTP リクエスト (input) レイヤーでも機能するため、下表に掲載されていなくても、デフォルトですべてのデータベースで機能します。

| フレームワーク         | Threat Detection のサポートの有無    | Threat Detection のサポートの有無                                              |
|-------------------|-----------------|--------------------------------------------------------------------------|
| [sql][14]          | {{< X >}} |   {{< X >}}    |



### CGO の有効化

ASM を有効にしてコードをコンパイルすることは、[CGO][15] を伴うため、以下が必要です。

- ターゲット `GOOS` と `GOARCH` 用の `gcc` コンパイラ。
- C ライブラリのヘッダー。
- CGO バインディングが有効であること。これは環境変数 `CGO_ENABLED` によって制御され、ネイティブコンパイル時にはデフォルトで有効になっています。

上記の要件をインストールするには

| オペレーティングシステム     | コンソールコマンド |
|----------------------|-----------------|
| Debian、Ubuntu       | `$ apt install gcc libc6-dev`   |
| Alpine               | `$ apk add gcc musl-dev`        |
| RHEL、CentOS、Fedora | `$ yum install gcc glibc-devel` |
| macOS                | `$ xcode-select --install`      |

**注**: Go ツールチェーンは、クロスコンパイル時に CGO を無効にするので、CGO を明示的に有効にする必要があります。


[1]: /ja/agent/remote_config/#enabling-remote-configuration
[2]: https://github.com/DataDog/dd-trace-go
[3]: https://github.com/DataDog/dd-trace-go#support-policy
[4]: https://github.com/DataDog/dd-trace-go#support-maintenance
[5]: https://www.datadoghq.com/support/
[6]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/contrib
[7]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/contrib/gin-gonic/gin
[8]: http://www.gorillatoolkit.org/pkg/mux
[9]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/contrib/labstack/echo.v4
[10]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/contrib/labstack/echo
[11]: https://github.com/grpc/grpc-go
[12]: https://github.com/go-chi/chi
[13]: https://golang.org/pkg/net/http
[14]: https://golang.org/pkg/database/sql
[15]: https://github.com/golang/go/wiki/cgo