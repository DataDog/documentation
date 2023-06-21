---
code_lang: go
code_lang_weight: 20
kind: documentation
title: Go 互換性要件
type: multi-code-lang
---

## 言語とフレームワークの互換性

### サポートされている Go バージョン

Datadog Go トレーシングライブラリは、以下のアーキテクチャの Go バージョン 1.14 以降をサポートしています。
- Linux (GNU) x86-64
- Alpine Linux (musl) x86-64
- macOS (Darwin) x86-64

Docker、Kubernetes、AWS ECS で動作する Go アプリのアプリケーションセキュリティを監視することができます。

### サポートされているフレームワーク

以下の Web フレームワークのリストにある APM トレーサーのインテグレーションを使用して、Go トレーサーを統合します。サポートされているパッケージとその API の詳細な概要、および使用例については、[Go のインテグレーションのドキュメント][1]を参照してください。

- [gRPC][2]
- [net/http][3]
- [Gorilla Mux][4]
- [Echo][5]
- [Chi][6]
- [HttpRouter][7]

### CGO の有効化

ASM を有効にしてコードをコンパイルすることは、[CGO][8] を伴うため、以下が必要です。

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


## ASM の機能サポート

Go ライブラリでは、指定されたトレーサーのバージョンで、以下の ASM 機能がサポートされています。

| ASM の機能                   | Go トレーサーの最小バージョン |
| -------------------------------- | ----------------------------|
| Threat Detection <br/> --> Business logic API  | 1.47.0 <br/>  |
| Threat Protection <br/> --> IP ブロッキング <br/> --> 不審リクエストブロッキング <br> --> ユーザーブロッキング   |  <br/> --> 1.48.0<br/> --> v1.50.0<br/> --> 1.48.0     |
| Vulnerability Management <br/> --> オープンソースの脆弱性検出 <br/> --> カスタムコードの脆弱性検出 | 非対応<br/><br/> |

Go でサポートされるすべての ASM 機能を得るためのトレーサーの最小バージョンは 1.48.0 です。

**注**: Threat Protection では、[リモート構成][10]を有効にする必要があり、これは記載のトレーサーの最小バージョンに含まれています。

<div class="alert alert-info">サポートされていない機能または Go フレームワークのサポート追加を希望される場合は、お知らせください！<a href="https://forms.gle/gHrxGQMEnAobukfn7">この短いフォーム</a>に必要事項を記入して、詳細を送信してください。</div>


[1]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/contrib
[2]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/contrib/google.golang.org/grpc#example-package-Server
[3]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/contrib/net/http#example-package
[4]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/contrib/gorilla/mux#example-package
[5]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/contrib/labstack/echo.v4#example-package
[6]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/contrib/go-chi/chi.v5#example-package
[7]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/contrib/julienschmidt/httprouter#example-package
[8]: https://github.com/golang/go/wiki/cgo
[9]: /ja/tracing/trace_collection/compatibility/go/
[10]: /ja/agent/remote_config/#enabling-remote-configuration