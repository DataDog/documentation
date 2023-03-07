---
aliases:
- /ja/security_platform/application_security/add-user-info
- /ja/security/application_security/add-user-info
further_reading:
- link: /security/application_security/
  tag: ドキュメント
  text: Datadog Application Security Management で脅威から守る
- link: /security/application_security/setup_and_configure/
  tag: ドキュメント
  text: その他のセットアップに関する注意と構成オプション
kind: documentation
title: ユーザーアクティビティの追跡
---

## 概要

標準化されたユーザータグを使用してサービスをインスツルメントし、アプリケーションのパフォーマンスやアプリケーションのセキュリティを追跡することで、認証されたユーザーのアクティビティを追跡できます。

こうすることで、疑わしいセキュリティ活動を行う悪質なアクターを特定し、この時間帯のすべての活動を確認し、認証済みの攻撃対象領域を狙う最も高度な攻撃やシグナルに優先的に対処することができます。

[ルートスパンにカスタムタグを追加する][1]方法と、後述のインスツルメンテーション関数を利用する方法があります。

## トレースへのユーザー情報追加

{{< programming-lang-wrapper langs="java,dotnet,go,ruby,php,nodejs,python" >}}

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


[1]: /ja/tracing/trace_collection/compatibility/java/#setup
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

以下の API のいずれかを使用して、トレースにユーザー情報を追加し、アプリケーションで認証されたリクエストを監視できるようにします。

{{< tabs >}}

{{% tab "set_user" %}}

`ddtrace` 1.1.0 からは、`Datadog::Kit::Identity.set_user` メソッドが使用できるようになりました。これは、トレースにユーザ情報を追加するための推奨 API です。

```ruby
# アクティブトレースを取得する
trace = Datadog::Tracing.active_trace

# 必須ユーザー ID タグを設定する
Datadog::Kit::Identity.set_user(trace, id: 'd131dd02c56eeec4')

# または、オプションのユーザーモニタリングタグを設定する
Datadog::Kit::Identity.set_user(
  trace,

  # 必須 ID
  id: 'd131dd02c56eeec4',

  #セマティクスが分かっているオプションタグ
  name: 'Jean Example',
  email:, 'jean.example@example.com',
  session_id:, '987654321',
  role: 'admin',
  scope: 'read:message, write:files',

  # オプションの自由形式タグ
  another_tag: 'another_value',
)
```

{{% /tab %}}

{{% tab "set_tag" %}}

`Datadog::Kit::Identity.set_user` がニーズに合わない場合は、代わりに `set_tag` を使用することができます。

ユーザーモニタリングタグは、トレースに適用され、プレフィックス `usr.` の後にフィールド名が続きます。例えば、`usr.name` は、ユーザーの名前を追跡するユーザーモニタリングタグです。

以下の例では、アクティブトレースを取得し、関連するユーザーモニタリングタグを追加する方法を示しています。

**注**:
- タグの値は文字列でなければなりません。
- `usr.id` タグは必須です。

```ruby
# アクティブトレースを取得する
trace = Datadog::Tracing.active_trace

# 必須ユーザー ID タグを設定する
trace.set_tag('usr.id', 'd131dd02c56eeec4')

# セマティクスが分かっているユーザーモニタリングタグをオプションで設定する
trace.set_tag('usr.name', 'Jean Example')
trace.set_tag('usr.email', 'jean.example@example.com')
trace.set_tag('usr.session_id', '987654321')
trace.set_tag('usr.role', 'admin')
trace.set_tag('usr.scope', 'read:message, write:files')

# 自由形式のタグを設定する
trace.set_tag('usr.another_tag', 'another_value')
```

{{% /tab %}}

{{< /tabs >}}

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

情報およびオプションについては、[Node.js トレーサーのドキュメント][1]をお読みください。



[1]: https://datadoghq.dev/dd-trace-js/#set-user
{{< /programming-lang >}}

{{< programming-lang lang="python" >}}

Python トレーサーパッケージが提供する `set_user` 関数を用いて、トレースにユーザー情報を追加することで、認証済みリクエストを監視します。

この例では、ユーザー監視タグを設定する方法を説明します。

```python
from ddtrace import tracer
from ddtrace.contrib.trace_utils import set_user

@app.route("/")
def view():
    # スパンが属するトレースにユーザー情報を記録する
    set_user(
        tracer,
        user_id="usr.id",
        email="usr.email",
        name="usr.name",
        session_id="usr.session_id",
        role="usr.role",
        scope="usr.scope"
    )
    return "OK"
```

{{< /programming-lang >}}

{{< /programming-lang-wrapper >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/tracing/trace_collection/custom_instrumentation/