---
title: セットアップと構成
kind: documentation
further_reading:
  - link: /security_platform/application_security/
    tag: ドキュメント
    text: Datadog アプリケーションセキュリティによる脅威の監視
  - link: /security_platform/application_security/getting_started/
    tag: ドキュメント
    text: サービスのアプリケーションセキュリティモニタリングの有効化を始める
  - link: /security_platform/default_rules/#cat-application-security
    tag: ドキュメント
    text: すぐに使えるアプリケーションセキュリティルール
  - link: /security_platform/application_security/troubleshooting
    tag: ドキュメント
    text: アプリケーションセキュリティモニタリングのトラブルシューティング
---
<div class="alert alert-warning">
アプリケーションセキュリティは非公開ベータ版です。開始するには、<a href="https://app.datadoghq.com/security/appsec?instructions=all">アプリ内の説明</a>をご覧ください。
</div>

## 互換性

{{< programming-lang-wrapper langs="java,dotnet,go,ruby,php,nodejs" >}}

{{< programming-lang lang="java" >}}

### サポートされている Java バージョン

Datadog ライブラリは、Oracle JDK と OpenJDK の両方の Java JRE 1.8 以降をサポートし、以下のアーキテクチャに対応しています。
- Linux (GNU) x86、x86-64
- Alpine Linux (musl) x86、x86-64
- macOS (Darwin) x86、x86-64
- Windows (msvc) x86、x86-64

Datadog は、Java の早期アクセスバージョンを公式にサポートしていません。

### サポートされているフレームワーク

| Framework Web Server    | フレームワークの最小バージョン   |
| ----------------------- | --------------------------- |
| Servlet 互換      | 2.3+、3.0+                  |
| Spring                  | 3.1                         |
**注**: WebSphere、WebLogic、JBoss など、多くのアプリケーションサーバーは Servlet と互換性があり、アプリケーションセキュリティでサポートされています。また、Spring Boot などのフレームワークは、サポートされている組み込みアプリケーションサーバー (Tomcat、Jetty、Netty など) を使用することでサポートされます。


{{< /programming-lang >}}

{{< programming-lang lang="dotnet" >}}

### サポートされている .NET バージョン

以下の .NET バージョンに対応しています。
- .NET Core 6
- .NET Core 5
- .NET Framework 4.8
- .NET Framework 4.7.2
- .NET Framework 4.7
- .NET Framework 4.6.2
- .NET Framework 4.6.1

これらは、以下のアーキテクチャでサポートされています。
- Linux (GNU) x86、x86-64
- Alpine Linux (musl) x86、x86-64
- macOS (Darwin) x86、x86-64
- Windows (msvc) x86、x86-64

### サポートされているフレームワーク

.NET トレーサーは .NET ベースのすべての言語 (C#、F#、Visual Basic など) をサポートしています。

| Framework Web Server    | フレームワークの最小バージョン   |
| ----------------------- | --------------------------- |
| ASP.NET                 | 4.6                         |
| ASP.NET Core            | 2.1                         |


{{< /programming-lang >}}

{{< programming-lang lang="go" >}}

### サポートされている Go バージョン

Datadog Go トレーシングライブラリは、以下のアーキテクチャの Go バージョン 1.14 以降をサポートしています。
- Linux (GNU) x86-64
- Alpine Linux (musl) x86-64
- macOS (Darwin) x86-64

### サポートされているフレームワーク

以下の Web フレームワークのリストにある APM トレーサーのインテグレーションを使用して、Go トレーサーを統合します。[インテグレーションのドキュメント][1]をクリックすると、サポートされているパッケージとその API の詳細な概要、および使用例が記載されています。

- [gRPC][2]
- [net/http][3]
- [Gorilla Mux][4]
- [Echo][5]
- [Chi][6]
- [HttpRouter][7]

### CGO の有効化

アプリケーションセキュリティを有効にしてコードをコンパイルすることは、[CGO][8] を伴うため、以下が必要です。

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

[1]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/contrib
[2]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/contrib/google.golang.org/grpc#example-package-Server
[3]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/contrib/net/http#example-package
[4]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/contrib/gorilla/mux#example-package
[5]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/contrib/labstack/echo.v4#example-package
[6]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/contrib/go-chi/chi.v5#example-package
[7]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/contrib/julienschmidt/httprouter#example-package
[8]: https://github.com/golang/go/wiki/cgo
{{< /programming-lang >}}

{{< programming-lang lang="ruby" >}}

### サポートされている Ruby バージョン

Datadog Ruby ライブラリは、以下の Ruby インタプリターの最新 gem をサポートしています。

- MRI (https://www.ruby-lang.org/) バージョン 2.7、2.6、2.5、2.4、2.3、2.2、2.1

これらは、以下のアーキテクチャでサポートされています。
- Linux (GNU) x86-64、aarch64
- Alpine Linux (musl) x86-64、aarch64
- macOS (Darwin) x86-64、arm64

### 対応フレームワーク

| Framework Web Server    | フレームワークの最小バージョン   |
| ----------------------- | --------------------------- |
| Rack                    | 1.1                         |
| Rails                   | 3.2 (Ruby のバージョンにも依存します) |
| Sinatra                 | 1.4                         |

{{< /programming-lang >}}

{{< programming-lang lang="php" >}}

Datadog PHP ライブラリは、以下のアーキテクチャの PHP バージョン 7.0 以降をサポートしています。

- Linux (GNU) x86-64
- Alpine Linux (musl) x86-64

すべての PHP フレームワークの使用をサポートし、またフレームワークなしの使用も可能です。

{{< /programming-lang >}}

{{< programming-lang lang="nodejs" >}}

### サポートされている NodeJS バージョン

Datadog NodeJS ライブラリは、以下の NodeJS のバージョンをサポートしています。

- NodeJS 13.10.0 以降
- NodeJS 12.17.0 以降

これらは、以下のアーキテクチャでサポートされています。

- Linux (GNU) x86-64
- Alpine Linux (musl) x86-64
- macOS (Darwin) x86-64
- Windows (msvc) x86、x86-64

### 対応フレームワーク

| Framework Web Server    | フレームワークの最小バージョン   |
| ----------------------- | --------------------------- |
| Express                 | 4.0                         |

{{< /programming-lang >}}

{{< /programming-lang-wrapper >}}

## データセキュリティへの配慮

Datadog で収集しているデータには、除外、難読化、フィルタリング、修正したり、収集しないことを選択したりするべき機密情報が含まれることがあります。さらに、脅威検出が不正確になったり、サービスのセキュリティが Datadog で正確にされないという問題の原因となるシンセティックトラフィックを含む場合もあります。

Datadog Agent と一部のトレーシングライブラリには、これらの状況に対応し、スパンを修正または破棄するためのオプションが用意されています。アプリケーションセキュリティにも適用される詳細については、[APM Data Security][1] を参照してください。

## 除外フィルター

アプリケーションセキュリティのシグナル、つまり不審なリクエストが誤検出される場合があります。例えば、アプリケーションセキュリティが同じ不審なリクエストを繰り返し検出し、シグナルが発生したが、そのシグナルは確認され、脅威ではないことがあります。

ルールからイベントを無視する除外フィルターを設定することで、このようなノイズの多いシグナルパターンを排除し、正当な疑わしいリクエストに焦点を当てることができます。

除外フィルターを作成するには、次のいずれかを行います。

- [Application Security Signals][2] のシグナルをクリックし、左上にある **Create Exclusion Filter** ボタンをクリックします。この方法では、対象となるサービスに対するフィルタークエリが自動的に生成されます。
- [Exclusion Filters Configuration][3] に移動し、独自のフィルタークエリに基づいて新しい除外フィルターを手動で構成します。

**注**: 除外フィルターに一致するリクエスト (トレース) は請求されません。

## アプリケーションセキュリティを無効にする

アプリケーションセキュリティを無効にするには、アプリケーションの構成から `DD_APPSEC_ENABLED=true` 環境変数を削除します。削除したら、サービスを再起動します。

さらにサポートが必要な場合は、[Datadog サポート][4]にお問い合わせください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/tracing/setup_overview/configure_data_security/
[2]: https://app.datadoghq.com/security/appsec/signals
[3]: https://app.datadoghq.com/security/appsec/exclusions
[4]: /ja/help/