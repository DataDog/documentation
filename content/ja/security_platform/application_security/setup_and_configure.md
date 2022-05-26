---
further_reading:
- link: /security_platform/application_security/
  tag: ドキュメント
  text: Datadog アプリケーションセキュリティモニタリングによる脅威の監視
- link: /security_platform/application_security/getting_started/
  tag: ドキュメント
  text: サービスの ASM の有効化を始める
- link: /security_platform/default_rules/#cat-application-security
  tag: ドキュメント
  text: すぐに使えるアプリケーションセキュリティモニタリングルール
- link: /security_platform/application_security/troubleshooting
  tag: ドキュメント
  text: ASM のトラブルシューティング
- link: /security_platform/guide/how-appsec-works/
  tag: ドキュメント
  text: Datadog におけるアプリケーションセキュリティモニタリングの仕組み
kind: documentation
title: セットアップと構成
---

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

### サポートされている NodeJS バージョン

Datadog NodeJS ライブラリは、以下の NodeJS のバージョンをサポートしています。

- NodeJS 13.10.0 以降
- NodeJS 12.17.0 以降

これらは、以下のアーキテクチャでサポートされています。

- Linux (GNU) x86-64
- Alpine Linux (musl) x86-64
- macOS (Darwin) x86-64
- Windows (msvc) x86、x86-64

Docker、Kubernetes、AWS ECS、AWS Fargate で動作する NodeJS アプリのアプリケーションセキュリティを監視することができます。

### サポートされているフレームワーク

| Framework Web Server    | フレームワークの最小バージョン   |
| ----------------------- | --------------------------- |
| Express                 | 4.0                         |

{{< /programming-lang >}}

{{< /programming-lang-wrapper >}}

## トレースへのユーザー情報追加

標準化されたユーザータグを使用してサービスをインスツルメントし、アプリケーションのパフォーマンスやアプリケーションのセキュリティを追跡することで、認証されたユーザーのアクティビティを追跡できます。

こうすることで、疑わしいセキュリティ活動を行う悪質なアクターを特定し、この時間帯のすべての活動を確認し、認証済みの攻撃対象領域を狙う最も高度な攻撃やシグナルに優先的に対処することができます。

[ルートスパンにカスタムタグを追加する][1]方法と、後述のインスツルメンテーション関数を利用する方法があります。

{{< programming-lang-wrapper langs="java,dotnet,go,ruby,php,nodejs" >}}

{{< programming-lang lang="java" >}}

ルートスパンにカスタムタグを追加するための Java トレーサーの API を使用し、アプリケーションで認証されたリクエストを監視できるように、ユーザー情報を追加します。

ユーザーモニタリングタグは、ルートスパンに適用され、プレフィックス `usr` の後にフィールド名が続きます。例えば、`usr.name` は、ユーザーの名前を追跡するユーザーモニタリングタグです。

**注**: [アプリケーションに必要な依存関係][1]が追加されていることを確認してください。

以下の例では、ルートスパンを取得し、関連するユーザーモニタリングタグを追加する方法を示しています。

```java
// アクティブスパンの取得
final Span span = GlobalTracer.get().activeSpan();
if ((span instanceof MutableSpan)) {
   MutableSpan localRootSpan = ((MutableSpan) span).getLocalRootSpan();
   // 必須ユーザー ID タグの設定
   localRootSpan.setTag("usr.id", "d131dd02c56eec4");
   // オプションのユーザーモニタリングタグを設定する
   localRootSpan.setTag("usr.name", "Jean Example");
   localRootSpan.setTag("usr.email", "jean.example@example.com");
   localRootSpan.setTag("usr.session_id", "987654321");
   localRootSpan.setTag("usr.role", "admin");
   localRootSpan.setTag("usr.scope", "read:message, write:files");
}
```


[1]: /ja/tracing/setup_overview/open_standards/java/#setup
{{< /programming-lang >}}

{{< programming-lang lang="dotnet" >}}

.NET トレーサーパッケージは `SetUser()` 関数を提供し、トレースにユーザー情報を追加することで認証されたリクエストを監視できるようにします。

以下の例では、関連するユーザーモニタリングタグを追加する方法を示しています。

```csharp

using Datadog.Trace;

// ...

    var userDetails = new UserDetails()
    {
        // ユーザーに対するシステム内部識別子
        Id = "d41452f2-483d-4082-8728-171a3570e930",
        // ユーザーのメールアドレス
        Email = "test@adventure-works.com",
        // システムによって表示されるユーザー名
        Name = "Jane Doh",
        // ユーザーのセッション ID
        SessionId = "d0632156-132b-4baa-95b2-a492c5f9cb16",
        // ユーザーがリクエストしたロール
        Role = "standard",
    };
    Tracer.Instance.ActiveScope?.Span.SetUser(userDetails);
```

情報およびオプションについては、[.NET トレーサーのドキュメント][1]をお読みください。

[1]: https://github.com/DataDog/dd-trace-dotnet/tree/master/docs/Datadog.Trace#user-identification

{{< /programming-lang >}}

{{< programming-lang lang="go" >}}

Go トレーサーパッケージは `SetUser()` 関数を提供し、トレースにユーザー情報を追加することで認証されたリクエストを監視できるようにします。他のオプションについては、[Go トレーサーのドキュメント][1]をご覧ください。

この例では、現在のトレーサースパンを取得し、それを使用してユーザーモニタリングタグを設定する方法を示します。

```go
// HTTP リクエストのコンテキストから現在のトレーサースパンを取得します
if span, ok := tracer.SpanFromContext(request.Context()); ok {
    // スパンが所属するトレースにユーザー情報を記録します
    tracer.SetUser(span, usr.id, tracer.WithUserEmail(usr.email), tracer.WithUserName(usr.name))
```

[1]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer#SetUser
{{< /programming-lang >}}

{{< programming-lang lang="ruby" >}}

トレースにカスタムタグを追加するための Ruby トレーサーの API を使用し、アプリケーションで認証されたリクエストを監視できるように、ユーザー情報を追加します。

ユーザーモニタリングタグは、トレースに適用され、プレフィックス `usr` の後にフィールド名が続きます。例えば、`usr.name` は、ユーザーの名前を追跡するユーザーモニタリングタグです。

以下の例では、ルートスパンを取得し、関連するユーザーモニタリングタグを追加する方法を示しています。

**注**:
- タグの値は文字列でなければなりません。
- `usr.id` タグは必須です。

```ruby
# アクティブトレースの取得
trace = Datadog::Tracing.active_trace

# 必須ユーザー ID タグを設定する
trace.set_tag('usr.id', 'd131dd02c56eeec4')

# オプションのユーザーモニタリングタグを設定する
trace.set_tag('usr.name', 'Jean Example')
trace.set_tag('usr.email', 'jean.example@example.com')
trace.set_tag('usr.session_id', '987654321')
trace.set_tag('usr.role', 'admin')
trace.set_tag('usr.scope', 'read:message, write:files')
```

{{< /programming-lang >}}

{{< programming-lang lang="php" >}}

ルートスパンにカスタムタグを追加するための PHP トレーサーの API を使用し、アプリケーションで認証されたリクエストを監視できるように、ユーザー情報を追加します。

ユーザーモニタリングタグは、ルートスパンの `meta` セクションに適用され、プレフィックス `usr` の後にフィールド名が続きます。例えば、`usr.name` は、ユーザーの名前を追跡するユーザーモニタリングタグです。

以下の例では、ルートスパンを取得し、関連するユーザーモニタリングタグを追加する方法を示しています。

```php
<?php
$rootSpan = \DDTrace\root_span();

 // ユーザーの一意な識別子が必要です。
$rootSpan->meta['usr.id'] = ‘123456789’;

// その他のフィールドはすべてオプションです。
$rootSpan->meta['usr.name'] = ‘Jean Example’;
$rootSpan->meta['usr.email'] = ‘jean.example@example.com’;
$rootSpan->meta['usr.session_id'] = ‘987654321’;
$rootSpan->meta['usr.role'] = ‘admin’;
$rootSpan->meta['usr.scope'] = ‘read:message, write:files’;
?>
```

{{< /programming-lang >}}

{{< programming-lang lang="nodejs" >}}

Node トレーサーパッケージは `tracer.setUser(user)` 関数を提供し、トレースにユーザー情報を追加することで認証されたリクエストを監視できるようにします。

以下の例では、関連するユーザーモニタリングタグを追加する方法を示しています。

```javascript
const tracer = require('dd-trace').init()

function handle () {
  tracer.setUser({
    id: '123456789', // *必須* ユーザーの一意な識別子。

    // その他のフィールドはすべてオプションです。
    email: 'jane.doe@example.com', // ユーザーのメールアドレス。
    name: 'Jane Doe', // ユーザーのユーザーフレンドリーな名前。
    session_id: '987654321', // ユーザーのセッション ID。
    role: 'admin', // ユーザーがリクエストしたロール。
    scope: 'read:message, write:files', // ユーザーが現在持っているスコープまたは付与された権限。

    // ユーザーへのカスタムデータ (RBAC、Oauth など) をアタッチするために、任意のフィールドも受け付けます
    custom_tag: 'custom data'
  })
}
```

情報およびオプションについては、[NodeJS トレーサーのドキュメント][1]をお読みください。



[1]: https://github.com/DataDog/dd-trace-js/blob/master/docs/API.md#user-identification
{{< /programming-lang >}}

{{< /programming-lang-wrapper >}}

## データセキュリティへの配慮

Datadog で収集するデータには、除外、難読化、フィルタリング、修正したり、収集しないことを選択したりするべき機密情報が含まれることがあります。さらに、脅威検出が不正確になったり、サービスのセキュリティが Datadog で正確にされないという問題の原因となるシンセティックトラフィックを含む場合もあります。

デフォルトでは、ASM は疑わしいリクエストから情報を収集し、そのリクエストが疑わしいと判定された理由を理解するのに役立ちます。データを送信する前に、ASM はデータが機密であることを示すパターンとキーワードをスキャンします。データが機密であると判断された場合、それは `<redacted>` フラグに置き換えられるので、リクエストは疑わしいが、データセキュリティの懸念からリクエストデータを収集できなかったことがわかります。

ユーザーのデータを保護するために、ASM では機密データスキャンがデフォルトで有効になっています。以下の環境変数を使用することで、構成をカスタマイズすることができます。スキャンは [RE2 構文][2]に基づいているため、スキャンをカスタマイズするには、これらの環境変数の値を有効な RE2 パターンに設定します。

* `DD_APPSEC_OBFUSCATION_PARAMETER_KEY_REGEXP` - 値が一般的に機密データを含むキーをスキャンするためのパターン。見つかった場合、そのキー、対応するすべての値、およびすべての子ノードが編集されます。
* `DD_APPSEC_OBFUSCATION_PARAMETER_VALUE_REGEXP` - 機密データを示す可能性のある値をスキャンするためのパターン。見つかった場合、その値とすべての子ノードが編集されます。

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

## 除外フィルター

ASM のシグナル、つまり不審なリクエストが誤検出される場合があります。例えば、ASM が同じ不審なリクエストを繰り返し検出し、シグナルが発生したが、そのシグナルは確認され、脅威ではないことがあります。

ルールからイベントを無視する除外フィルターを設定することで、このようなノイズの多いシグナルパターンを排除し、正当な疑わしいリクエストに焦点を当てることができます。

除外フィルターを作成するには、次のいずれかを行います。

- [ASM Signals][4] のシグナルをクリックし、左上にある **Create Exclusion Filter** ボタンをクリックします。この方法では、対象となるサービスに対するフィルタークエリが自動的に生成されます。
- [Exclusion Filters Configuration][5] に移動し、独自のフィルタークエリに基づいて新しい除外フィルターを手動で構成します。

**注**: 除外フィルターに一致するリクエスト (トレース) は請求されません。

## アプリケーションセキュリティモニタリングを無効にする

ASM を無効にするには、アプリケーションの構成から `DD_APPSEC_ENABLED=true` 環境変数を削除します。削除したら、サービスを再起動します。

さらにサポートが必要な場合は、[Datadog サポート][6]にお問い合わせください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/tracing/setup_overview/custom_instrumentation/
[2]: https://github.com/google/re2/wiki/Syntax
[3]: /ja/tracing/setup_overview/configure_data_security/
[4]: https://app.datadoghq.com/security/appsec/signals
[5]: https://app.datadoghq.com/security/appsec/exclusions
[6]: /ja/help/