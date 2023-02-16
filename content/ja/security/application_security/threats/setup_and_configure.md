---
aliases:
- /ja/security_platform/application_security/setup_and_configure
- /ja/security/application_security/setup_and_configure
further_reading:
- link: /security/application_security/
  tag: ドキュメント
  text: Datadog Application Security Management で脅威から守る
- link: /security/application_security/getting_started/
  tag: ドキュメント
  text: サービスの ASM の有効化を始める
- link: /security/default_rules/#cat-application-security
  tag: ドキュメント
  text: すぐに使える Application Security Management ルール
- link: /security/application_security/add-user-info/
  tag: ドキュメント
  text: トレースへのユーザー情報追加
- link: /security/application_security/troubleshooting
  tag: ドキュメント
  text: ASM のトラブルシューティング
- link: /security/application_security/how-appsec-works/
  tag: ドキュメント
  text: Datadog における Application Security Management の仕組み
kind: documentation
title: セットアップと構成
---

## 互換性

{{< programming-lang-wrapper langs="java,dotnet,go,ruby,php,nodejs,python" >}}

{{< programming-lang lang="java" >}}

### サポートされている Java バージョン

Datadog ライブラリは、Oracle JDK と OpenJDK の両方の Java JRE 1.8 以降をサポートし、以下のアーキテクチャに対応しています。
- Linux (GNU) x86、x86-64
- Alpine Linux (musl) x86、x86-64
- macOS (Darwin) x86、x86-64
- Windows (msvc) x86、x86-64

Datadog は、Java の早期アクセスバージョンを公式にサポートしていません。

Docker、Kubernetes、AWS ECS、AWS Fargate で動作する Java アプリのアプリケーションセキュリティを監視することができます。

### サポートされているフレームワーク

| Framework Web Server    | フレームワークの最小バージョン   |
| ----------------------- | --------------------------- |
| Servlet 互換      | 2.3+、3.0+                  |
| Spring                  | 3.1                         |

**注**: WebSphere、WebLogic、JBoss など、多くのアプリケーションサーバーは Servlet と互換性があり、ASM でサポートされています。また、Spring Boot などのフレームワークは、サポートされている組み込みアプリケーションサーバー (Tomcat、Jetty、Netty など) を使用することでサポートされます。


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

Docker、Kubernetes、AWS ECS、AWS Fargate で動作する .NET アプリのアプリケーションセキュリティを監視することができます。

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

Docker、Kubernetes、AWS ECS で動作する Go アプリのアプリケーションセキュリティを監視することができます。


### サポートされているフレームワーク

以下の Web フレームワークのリストにある APM トレーサーのインテグレーションを使用して、Go トレーサーを統合します。[インテグレーションのドキュメント][1]をクリックすると、サポートされているパッケージとその API の詳細な概要、および使用例が記載されています。

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

[1]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/contrib
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

- MRI (https://www.ruby-lang.org/) バージョン 2.1～3.1

これらは、以下のアーキテクチャでサポートされています。
- Linux (GNU) x86-64、aarch64
- Alpine Linux (musl) x86-64、aarch64
- macOS (Darwin) x86-64、arm64

Docker、Kubernetes、AWS ECS、AWS Fargate で動作する Ruby アプリのアプリケーションセキュリティを監視することができます。

### サポートされているフレームワーク

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

Docker、Kubernetes、AWS ECS で動作する PHP アプリのアプリケーションセキュリティを監視することができます。

すべての PHP フレームワークの使用をサポートし、またフレームワークなしの使用も可能です。

{{< /programming-lang >}}

{{< programming-lang lang="nodejs" >}}

### サポートされている Node.js バージョン

Datadog Node.js ライブラリは、以下の Node.js のバージョンをサポートしています。

- Node.js 14 以降

これらは、以下のアーキテクチャでサポートされています。

- Linux (GNU) x86-64
- Alpine Linux (musl) x86-64
- macOS (Darwin) x86-64
- Windows (msvc) x86、x86-64

Docker、Kubernetes、AWS ECS、AWS Fargate で動作する Node.js アプリのアプリケーションセキュリティを監視することができます。

### サポートされているフレームワーク

| Framework Web Server    | フレームワークの最小バージョン   |
| ----------------------- | --------------------------- |
| Express                 | 4.0                         |

{{< /programming-lang >}}

{{< programming-lang lang="python" >}}

### サポート対象の Python バージョン

Datadog Python ライブラリは、以下の Python のバージョンをサポートしています。

- Python 2.7、3.5、またはそれ以上

これらは、以下のアーキテクチャでサポートされています。

- Linux (GNU) x86-64
- Alpine Linux (musl) x86-64
- macOS (Darwin) x86-64
- Windows (msvc) x86、x86-64

Docker、Kubernetes、AWS ECS、AWS Fargate で動作する Python アプリのアプリケーションセキュリティを監視することができます。

### サポートされているフレームワーク

| Framework Web Server | フレームワークの最小バージョン |
|----------------------|---------------------------|
| Django               | 1.8                       |
| Flask                | 0.10                      |

Flask では、クエリ文字列のサポートはありません。

{{< /programming-lang >}}

{{< /programming-lang-wrapper >}}

## クライアント IP ヘッダーの構成

ASM は自動的に、`X-Forwarded-For` のようなよく知られたヘッダーから、`http.client_ip` を解決しようとします。もし、このフィールドにカスタムヘッダーを使用したり、解決アルゴリズムをバイパスしたい場合は、`DD_TRACE_CLIENT_IP_HEADER` 環境変数を設定すると、ライブラリはクライアント IP の指定されたヘッダーのみをチェックします。

## 認証された悪質なユーザーの追跡

多くの重大な攻撃は、最も機密性の高いエンドポイントにアクセスできる認証されたユーザーによって実行されます。疑わしいセキュリティアクティビティを生成している悪質なユーザーを特定するには、標準化されたユーザータグを使用してサービスをインスツルメンテーションすることにより、ユーザー情報をトレースに追加します。ルートスパンにカスタムタグを追加したり、インスツルメンテーション関数を使用したりすることができます。詳細については、[ユーザーアクティビティの追跡][1]を参照してください。

## 特定の値を検出のトリガーから除外する

ASM のシグナル、つまり不審なリクエストが誤検出される場合があります。例えば、ASM が同じ不審なリクエストを繰り返し検出し、シグナルが発生したが、そのシグナルは確認され、脅威ではないことがあります。

ルールからイベントを無視する除外フィルターを設定することで、このようなノイズの多いシグナルパターンを排除し、正当な疑わしいリクエストに焦点を当てることができます。

除外フィルターを作成するには、次のいずれかを行います。

- [ASM Signals][4] のシグナルをクリックし、左上にある **Create Exclusion Filter** ボタンをクリックします。この方法では、対象となるサービスに対するフィルタークエリが自動的に生成されます。
- [Exclusion Filters Configuration][5] に移動し、独自のフィルタークエリに基づいて新しい除外フィルターを手動で構成します。

**注**: 除外フィルターに一致するリクエスト (トレース) は請求されません。

## データセキュリティへの配慮

Datadog で収集するデータには、除外、難読化、フィルタリング、修正したり、収集しないことを選択したりするべき機密情報が含まれることがあります。さらに、脅威検出が不正確になったり、サービスのセキュリティが Datadog で正確にされないという問題の原因となるシンセティックトラフィックを含む場合もあります。

デフォルトでは、ASM は疑わしいリクエストから情報を収集し、そのリクエストが疑わしいと判定された理由を理解するのに役立ちます。データを送信する前に、ASM はデータが機密であることを示すパターンとキーワードをスキャンします。データが機密であると判断された場合、それは `<redacted>` フラグに置き換えられるので、リクエストは疑わしいが、データセキュリティの懸念からリクエストデータを収集できなかったことがわかります。

ユーザーのデータを保護するために、ASM では機密データスキャンがデフォルトで有効になっています。以下の環境変数を使用することで、構成をカスタマイズすることができます。スキャンは [RE2 構文][2]に基づいているため、スキャンをカスタマイズするには、これらの環境変数の値を有効な RE2 パターンに設定します。

* `DD_APPSEC_OBFUSCATION_PARAMETER_KEY_REGEXP` - 値が一般的に機密データを含むキーをスキャンするためのパターン。見つかった場合、そのキーと関連する値およびすべての子ノードが編集されます。
* `DD_APPSEC_OBFUSCATION_PARAMETER_VALUE_REGEXP` - 機密データを示す可能性のある値をスキャンするためのパターン。見つかった場合、その値とすべての子ノードが編集されます。

<div class="alert alert-info"><strong>Ruby のみ、ddtrace バージョン 1.1.0 から</strong>

<p>また、コードでスキャンパターンを構成することも可能です。</p>

```ruby
Datadog.configure do |c|
  # ...

  # カスタム RE2 正規表現を設定する
  c.appsec.obfuscator_key_regex = '...'
  c.appsec.obfuscator_value_regex = '...'
end
```

</div>


以下は、デフォルトで機密と判定されるデータの例です。

* `pwd`、`password`、`ipassword`、`pass_phrase`
* `secret`
* `key`、`api_key`、`private_key`、`public_key`
* `token`
* `consumer_id`、`consumer_key`、`consumer_secret`
* `sign`、`signed`、`signature`
* `bearer`
* `authorization`
* `BEGIN PRIVATE KEY`
* `ssh-rsa`

Datadog Agent やライブラリの他のメカニズムで、機密データを削除するために使用できるものについては、[APM データセキュリティ][3]を参照してください。

## Application Security Management を無効にする

ASM を無効にするには、アプリケーションの構成から `DD_APPSEC_ENABLED=true` 環境変数を削除します。削除したら、サービスを再起動します。

さらにサポートが必要な場合は、[Datadog サポート][6]にお問い合わせください。

## カスタムブロッキングページまたはペイロードの構成

{{% asm-protection-page-configuration %}}

{{< img src="/security/application_security/asm-blocking-page-html.png" alt="ASM がブロックされた IP からのリクエストをブロックする際に表示されるページ" width="75%" >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/security/application_security/add-user-info/
[2]: https://github.com/google/re2/wiki/Syntax
[3]: /ja/tracing/configure_data_security/
[4]: https://app.datadoghq.com/security/appsec/signals
[5]: https://app.datadoghq.com/security/appsec/exclusions
[6]: /ja/help/