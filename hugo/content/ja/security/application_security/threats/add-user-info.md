---
aliases:
- /ja/security_platform/application_security/add-user-info
- /ja/security/application_security/add-user-info
further_reading:
- link: /security/application_security/
  tag: ドキュメント
  text: Datadog App and API Protection で脅威から保護する
- link: /security/application_security/threats/library_configuration/
  tag: ドキュメント
  text: その他のセットアップに関する注意と構成オプション
title: ユーザーモニタリングと保護
---

## 概要

サービスをインスツルメンテーションし、ユーザーのアクティビティを追跡することで、悪質なユーザーを検出・ブロックします。

認証済みの攻撃対象領域を狙う悪意のある攻撃者を特定してブロックするには、[トレースに認証済みユーザー情報を追加](#adding-authenticated-user-information-to-traces-and-enabling-user-blocking-capability) します。これを行うには、実行中の APM トレースにユーザー ID タグを設定し、AAP が認証済みの攻撃者をブロックできるように必要なインスツルメンテーションを追加します。これにより、AAP は攻撃やビジネス ロジック イベントをユーザーに関連付けられるようになります。

[ユーザー ログインとアクティビティを追跡する](#adding-business-logic-information-login-success-login-failure-any-business-logic-to-traces) と、すぐに使える検知ルールでアカウント 乗っ取りやビジネス ロジックの悪用を検知でき、最終的には攻撃者をブロックできます。

すぐに使える検出ルールとして、以下のようなカスタムユーザーアクティビティがあります。

| 内蔵のイベント名   | 必要なメタデータ                                    | 関連ルール                                                                                                                                                                                                       |
|------------------------|------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `activity.sensitive`   | `{ "name": "coupon_use", "required_role": "user" }`  | [IP からのレート制限アクティビティ][4]<br>[不正なアクティビティの検出][5] |
| `users.login.success`  | ユーザー ID は必須で、オプションでメタデータを追加できます | [クレデンシャル スタッフィング攻撃][6]<br>[ブルート フォース攻撃][12]<br>[分散クレデンシャル スタッフィング][13]               |
| `users.login.failure`  | ユーザー ID と `usr.exists` は必須で、任意のメタデータを追加できます | [クレデンシャル スタッフィング攻撃][6]<br>[ブルート フォース攻撃][12]<br>[分散クレデンシャル スタッフィング][13]  |
| `users.signup`         | `{ "usr.id": "12345" }`                              | [IP からの過剰なアカウント作成][7]                                                                                                    |
| `users.delete`         | `{ "usr.id": "12345" }`                              | [IP からの過剰なアカウント削除][8]                                                                                           |
| `users.password_reset` | `{ "usr.id": "12345", "usr.login": "user@email.com", "exists": true }` | [パスワードリセットのブルートフォース試行][9]                                                                                                         |
| `payment.failure`      | なし                                                 | [IP からの過剰な支払い失敗][10]                                                                                                        |

## 認証されたユーザー情報をトレースに追加し、ユーザーブロック機能を有効にする

<div class="alert alert-info">
<strong>ユーザー アクティビティの自動検知:</strong> Datadog トレーシング ライブラリは、ユーザー アクティビティ イベントを自動で検知して報告しようとします。詳細は <a href="/security/application_security/how-it-works/add-user-info/?tab=set_user#disabling-automatic-user-activity-event-tracking">ユーザー アクティビティ イベントの自動トラッキングを無効化する</a> を参照してください。
</div>

[ルート スパンにカスタム タグを追加する][3] か、以下で説明するインスツルメンテーション関数を使用できます。

{{< programming-lang-wrapper langs="java,dotnet,go,ruby,php,nodejs,python" >}}

{{< programming-lang lang="java" >}}

ルートスパンにカスタムタグを追加するための Java トレーサーの API を使用し、アプリケーションで認証されたリクエストを監視できるように、ユーザー情報を追加します。

ユーザーモニタリングタグは、ルートスパンに適用され、プレフィックス `usr` の後にフィールド名が続きます。例えば、`usr.name` は、ユーザーの名前を追跡するユーザーモニタリングタグです。

**注**: [アプリケーションに必要な依存関係][1]が追加されていることを確認してください。

以下の例では、ルートスパンを取得し、関連するユーザー監視タグを追加し、ユーザーブロック機能を有効にする方法を示しています。

```java
import io.opentracing.Span;
import io.opentracing.util.GlobalTracer;
import datadog.appsec.api.blocking.Blocking;
import datadog.trace.api.interceptor.MutableSpan;

// アクティブスパンの取得
final Span span = GlobalTracer.get().activeSpan();
if ((span instanceof MutableSpan)) {
   MutableSpan localRootSpan = ((MutableSpan) span).getLocalRootSpan();
   // 必須ユーザー ID タグの設定
   localRootSpan.setTag("usr.id", "d131dd02c56eec4");
   // オプションのユーザーモニタリングタグの設定
   localRootSpan.setTag("usr.name", "Jean Example");
   localRootSpan.setTag("usr.email", "jean.example@example.com");
   localRootSpan.setTag("usr.session_id", "987654321");
   localRootSpan.setTag("usr.role", "admin");
   localRootSpan.setTag("usr.scope", "read:message, write:files");
}

Blocking
    .forUser("d131dd02c56eec4")
    .blockIfMatch();
```

[1]: /ja/tracing/trace_collection/custom_instrumentation/opentracing/java#setup
{{< /programming-lang >}}

{{< programming-lang lang="dotnet" >}}

.NET トレーサーパッケージは `SetUser()` 関数を提供し、トレースにユーザー情報を追加することで認証されたリクエストを監視できるようにします。

以下の例では、関連するユーザー監視タグを追加し、ユーザーブロック機能を有効にする方法を示しています。

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

Go トレーサー パッケージには `SetUser()` 関数があり、トレースにユーザー情報を追加することで認証済みリクエストを監視できます。追加オプションについては、[Go トレーサー ドキュメント][1] (または [v2 ドキュメント][2]) を参照してください。

この例では、現在のトレーサースパンを取得し、それを使用してユーザー監視タグを設定し、ユーザーブロック機能を有効にする方法を説明します。

```go
import (
  "gopkg.in/DataDog/dd-trace-go.v1/appsec" // 1.x
  // "github.com/DataDog/dd-trace-go/v2/appsec // 2.x
)

func handler(w http.ResponseWriter, r *http.Request) {
  if appsec.SetUser(r.Context(), "my-uid") != nil {
    // ユーザーをブロックする場合は、できるだけ早くリクエスト ハンドラーの処理を中断します。
    // ブロッキング レスポンスは appsec ミドルウェアが自動で処理して送信します。
    return
  }
}
```

[1]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer#SetUser
[2]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/v2/ddtrace/tracer#SetUser
{{< /programming-lang >}}

{{< programming-lang lang="ruby" >}}

以下の API のいずれかを使用して、トレースにユーザー情報を追加し、アプリケーションで認証されたリクエストを監視できるようにします。

{{% collapse-content title="set_user" level="h4" expanded="true" %}}

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
{{% /collapse-content %}}

{{% collapse-content title="set_tag" level="h4" expanded="false" id="ruby-set-tag" %}}

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
{{% /collapse-content %}}

{{< /programming-lang >}}

{{< programming-lang lang="php" >}}

PHP トレーサーは `\DDTrace\set_user()` 関数を提供し、認証されたリクエストを監視したりブロックしたりすることができます。

`\DDTrace\set_user()` はトレースに関連するユーザータグとメタデータを追加し、ユーザーブロックを自動的に実行します。

以下の例では、ユーザー監視タグを設定し、ユーザーブロックを有効にする方法を示します。

```php
<?php
// ブロッキングは、set_user コールにより内部で行われます。
\DDTrace\set_user(
    // ユーザーの一意な識別子が必要です。
    '123456789',

    // その他のフィールドはすべてオプションです。
    [
        'name' =>  'Jean Example',
        'email' => 'jean.example@example.com',
        'session_id' => '987654321',
        'role' => 'admin',
        'scope' => 'read:message, write:files',
    ]
);
?>
```

{{< /programming-lang >}}

{{< programming-lang lang="nodejs" >}}

Node トレーサーパッケージは `tracer.setUser(user)` 関数を提供し、トレースにユーザー情報を追加することで認証されたリクエストを監視できるようにします。

以下の例では、関連するユーザー監視タグを追加し、ユーザーブロック機能を有効にする方法を示しています。

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

// 現在認証されているユーザーを設定し、ブロックされているかどうかを確認します
if (tracer.appsec.isUserBlocked(user)) {  // また、現在認証されているユーザーを設定します
  return tracer.appsec.blockRequest(req, res) // ブロック応答が送信されます
  }

}
```

情報およびオプションについては、[Node.js トレーサーのドキュメント][1]をお読みください。



[1]: https://datadoghq.dev/dd-trace-js/#set-user
{{< /programming-lang >}}

{{< programming-lang lang="python" >}}

Python トレーサーパッケージが提供する `set_user` 関数を用いて、トレースにユーザー情報を追加することで、認証済みリクエストを監視します。

この例では、ユーザー監視タグを設定し、ユーザーブロック機能を有効にする方法を示します。

```python
from ddtrace.contrib.trace_utils import set_user
from ddtrace import tracer
# set_user() を呼び出し、現在認証されているユーザー ID をトレースします
user_id = "some_user_id"
set_user(tracer, user_id, name="John", email="test@test.com", scope="some_scope",
         role="manager", session_id="session_id", propagate=True)
```

{{< /programming-lang >}}

{{< /programming-lang-wrapper >}}

## ビジネスロジック情報 (ログイン成功、ログイン失敗、任意のビジネスロジック) のトレースへの追加

<div class="alert alert-info">
<strong>usr.id と usr.login に関する注意:</strong> ログイン悪用の調査では、似ているものの異なる 2 つの概念を扱います。usr.id には、データベース内のユーザー アカウントを一意に識別する ID が入ります。これは一意で不変です。存在しないアカウントに対して誰かがログインを試みる場合、usr.id は取得できません。ユーザー ブロッキングの対象は usr.id です。</br>
一般的に、ユーザーは自分のユーザー ID を意識していません。代わりに、変更可能な識別子 (電話番号、ユーザー名、メール アドレスなど) を使います。ユーザーがアカウントにログインするために入力する文字列は、ログイン イベントでは usr.login として報告してください。</br>
usr.login が指定されていない場合は、代わりに usr.id が使用されます。</a>
</div>

{{< programming-lang-wrapper langs="java,dotnet,go,ruby,php,nodejs,python" >}}
{{< programming-lang lang="java" >}}

dd-trace-java v1.8.0 以降では、Java トレーサーの API を使ってユーザー イベントを追跡できます。

次の例は、ログインイベントやカスタムイベント (サインアップを例とする) を追跡する方法を示しています。

{{% collapse-content title="ログイン成功" level="h4" expanded="true" %}}
```java
import datadog.trace.api.EventTracker;
import datadog.trace.api.GlobalTracer;

public class LoginController {

    private User doLogin(String userName, String password) {
        // ここで userName と password の認証情報を使って User を取得します
        User user = checkLogin(userName, password);

        Map<String, String> metadata = new HashMap<>();
        metadata.put("email", user.getEmail());
        metadata.put("usr.login", userName);

        // システムに複数の "テナント" がある場合は指定してください。テナントはユーザーを区分する環境やグループを指します
        metadata.put("usr.org", usr.getTenant());

        // ユーザー認証の成功イベントを記録します
        GlobalTracer
            .getEventTracker()
            .trackLoginSuccessEvent(user.getId(), metadata);

    }
}

```
{{% /collapse-content %}}

{{% collapse-content title="ログイン失敗" level="h4" expanded="false" id="java-login-failure" %}}
```java
import datadog.trace.api.EventTracker;
import datadog.trace.api.GlobalTracer;

public class LoginController {

    private User doLogin(String userName, String password) {
        // ここで userName と password の認証情報を使って User を取得します
        User user = checkLogin(userName, password);

        // この関数が null を返した場合、ユーザーは存在しません
        boolean userExists = (user != null);
        String userId = null;
        Map<String, String> metadata = new HashMap<>();
        metadata.put("usr.login", userName);
        if (userExists != null) {
            userId = getUserId(userName)
            metadata.put("email", user.getEmail());
        } else {
            userId = userName;
        }

        // ユーザー認証の失敗イベントを記録します
        GlobalTracer
            .getEventTracker()
            .trackLoginFailureEvent(userId, userExists, metadata);
    }
}
```
{{% /collapse-content %}}

{{% collapse-content title="カスタム ビジネス ロジック" level="h4" expanded="false" id="java-custom-business" %}}
```java
import datadog.trace.api.EventTracker;
import datadog.trace.api.GlobalTracer;

public class LoginController {

    private User doSignup(String userId, String email) {
        // ここでユーザー アカウントを作成します
        User user = createUser(userId, email);

        Map<String, String> metadata = new HashMap<>();
        metadata.put("usr.id", user.getId());

        // ユーザー登録イベントを記録します
        GlobalTracer
            .getEventTracker()
            .trackCustomEvent("users.signup", metadata);
    }
}

```
{{% /collapse-content %}}

{{< /programming-lang >}}

{{< programming-lang lang="dotnet" >}}

dd-trace-dotnet v2.23.0 以降では、.NET トレーサーの API を使ってユーザー イベントを追跡できます。

次の例は、ログインイベントやカスタムイベント (サインアップを例とする) を追跡する方法を示しています。

{{% collapse-content title="ログイン成功" level="h4" expanded="true" %}}
```csharp
using Datadog.Trace.AppSec;

void OnLogonSuccess(string userId, string login...)
{
    // metadata は任意です
    var metadata = new Dictionary<string, string>()
    {
        { "usr.login", login }
    };
    EventTrackingSdk.TrackUserLoginSuccessEvent(userId, metadata);

    // ...
}

```
{{% /collapse-content %}}
{{% collapse-content title="ログイン失敗" level="h4" expanded="false" id="dotnet-login-failure" %}}
```csharp
using Datadog.Trace.AppSec;

void OnLogonFailure(string userId, string login, bool userExists, ...)
{
    // userId を指定できない場合は、ユーザー名やメール アドレスなど、一意なユーザー識別子を代わりに使えます
    // metadata は任意です
    var metadata = new Dictionary<string, string>()
    {
        { "usr.login", login }
    };
    EventTrackingSdk.TrackUserLoginFailureEvent(userId, userExists, metadata);

    // ...
}
```
{{% /collapse-content %}}

{{% collapse-content title="カスタム ビジネス ロジック" level="h4" expanded="false" id="dotnet-custom-business" %}}
```csharp
void OnUserSignupComplete(string userId, ...)
{
    // metadata パラメーターはオプションですが、"usr.id" を追加します
    var metadata = new Dictionary<string, string>()
    {
        { "usr.id", userId }
    };
    // カスタムビジネスロジックの追跡を活用し、ユーザーのサインアップを追跡します
    EventTrackingSdk.TrackCustomEvent("users.signup", metadata);

    // ...
}
```
{{% /collapse-content %}}

{{< /programming-lang >}}
{{< programming-lang lang="go" >}}

dd-trace-go v1.47.0 以降では、Go トレーサーの API を使ってユーザー イベントを追跡できます。

次の例は、ログインイベントやカスタムイベント (サインアップを例とする) を追跡する方法を示しています。

{{% collapse-content title="ログイン成功" level="h4" expanded="true" %}}
```go
import (
  "gopkg.in/DataDog/dd-trace-go.v1/appsec" // 1.x
  // "github.com/DataDog/dd-trace-go/v2/appsec" // 2.x
)

func handler(w http.ResponseWriter, r *http.Request) {
  metadata := make(map[string]string) //* 任意の追加のイベント メタデータ */
  userdata := /* 任意の追加ユーザー データ */

  metadata["usr.login"] = "user-email"

  // ログイン成功を追跡します。`my-uid` はユーザーを一意に識別できる値 (数値 ID、ユーザー名、メール アドレスなど) に置き換えてください
  if appsec.TrackUserLoginSuccessEvent(r.Context(), "my-uid", metadata, userdata) != nil {
    // 指定したユーザー ID はブロックされているため、ハンドラーはできるだけ早く中断します。
    // ブロッキング レスポンスは appsec ミドルウェアが送信します。
    return
  }
}
```
{{% /collapse-content %}}
{{% collapse-content title="ログイン失敗" level="h4" expanded="false" id="go-login-failure" %}}
```go
import (
  "gopkg.in/DataDog/dd-trace-go.v1/appsec" // 1.x
  // "github.com/DataDog/dd-trace-go/v2/appsec" // 2.x
)

func handler(w http.ResponseWriter, r *http.Request) {
  exists := /* 指定したユーザー ID が存在するかどうか */
  metadata := make(map[string]string) /* 任意の追加のイベント メタデータ */
  metadata["usr.login"] = "user-email"

  // `my-uid` はユーザーを一意に識別できる値 (数値 ID、ユーザー名、メール アドレスなど) に置き換えてください
  appsec.TrackUserLoginFailureEvent(r.Context(), "my-uid", exists, metadata)
}
```
{{% /collapse-content %}}

{{% collapse-content title="カスタム ビジネス ロジック" level="h4" expanded="false" id="go-custom-business" %}}
```go
import (
  "gopkg.in/DataDog/dd-trace-go.v1/appsec" // 1.x
  // "github.com/DataDog/dd-trace-go/v2/appsec" // 2.x
)

func handler(w http.ResponseWriter, r *http.Request) {
  metadata := map[string]string{"usr.id": "my-uid"}

  // カスタム ビジネス ロジックのトラッキングを利用して、ユーザー登録を追跡します
  appsec.TrackCustomEvent(r.Context(), "users.signup", metadata)
}
```
{{% /collapse-content %}}

{{< /programming-lang >}}
{{< programming-lang lang="ruby" >}}

dd-trace-rb v1.9.0 からは、Ruby トレーサーの API を使用してユーザーイベントを追跡することができます。

次の例は、ログインイベントやカスタムイベント (サインアップを例とする) を追跡する方法を示しています。

ログインの成功/失敗イベントを含むトレースは、以下のクエリ `@appsec.security_activity:business_logic.users.login.success` または `@appsec.security_activity:business_logic.users.login.failure` を使用してクエリすることができます。

{{% collapse-content title="ログイン成功" level="h4" expanded="true" %}}
```ruby
require 'datadog/kit/appsec/events'

trace = Datadog::Tracing.active_trace
# `my_user_id` は、ユーザーを一意に識別できる値 (数値 ID、ユーザー名、メール アドレスなど) に置き換えてください 
Datadog::Kit::AppSec::Events.track_login_success(trace, user: { id: 'my_user_id' }, { 'usr.login': 'my_user_email' })
```
{{% /collapse-content %}}

{{% collapse-content title="ログイン失敗" level="h4" expanded="false" id="ruby-login-failure" %}}
```ruby
require 'datadog/kit/appsec/events'
trace = Datadog::Tracing.active_trace

# `my_user_id` は、ユーザーを一意に識別できる値 (数値 ID、ユーザー名、メール アドレスなど) に置き換えてください

# ユーザーが存在する場合
Datadog::Kit::AppSec::Events.track_login_failure(trace, user_id: 'my_user_id', user_exists: true, { 'usr.login': 'my_user_email' })

# ユーザーが存在しない場合
Datadog::Kit::AppSec::Events.track_login_failure(trace, user_id: 'my_user_id', user_exists: false, { 'usr.login': 'my_user_email' })
```
{{% /collapse-content %}}

{{% collapse-content title="カスタム ビジネス ロジック" level="h4" expanded="false" id="ruby-custom-business" %}}
```ruby
require 'datadog/kit/appsec/events'
trace = Datadog::Tracing.active_trace

# `my_user_id` は、ユーザーを一意に識別できる値 (数値 ID、ユーザー名、メール アドレスなど) に置き換えてください

# カスタム ビジネス ロジックのトラッキングを利用して、ユーザー登録を追跡します
Datadog::Kit::AppSec::Events.track('users.signup', trace, nil, { 'usr.id': 'my_user_id'})
```
{{% /collapse-content %}}

{{< /programming-lang >}}

{{< programming-lang lang="php" >}}
dd-trace-php v0.84.0 からは、PHP トレーサーの API を使用してユーザーイベントを追跡することができます。

次の例は、ログインイベントやカスタムイベント (サインアップを例とする) を追跡する方法を示しています。

{{% collapse-content title="ログイン成功" level="h4" expanded="true" %}}
```php
<?php
\datadog\appsec\track_user_login_success_event($id, ['usr.login' => $email])
?>
```
{{% /collapse-content %}}

{{% collapse-content title="ログイン失敗" level="h4" expanded="false" id="php-login-failure" %}}
```php
<?php
// 数値の userId がない場合でも、userId として一意な文字列 (ユーザー名やメール アドレスなど) を使用できます
// 値はユーザーごとに一意である必要があります (攻撃者や IP ごとではなく)
\datadog\appsec\track_user_login_failure_event($id, $exists, ['usr.login' => $email])
?>
```
{{% /collapse-content %}}

{{% collapse-content title="カスタム ビジネス ロジック" level="h4" expanded="false" id="php-custom-business" %}}
```php
<?php
\datadog\appsec\track_custom_event('users.signup', ['usr.id' => $id]);
?>
```
{{% /collapse-content %}}

{{< /programming-lang >}}

{{< programming-lang lang="nodejs" >}}

dd-trace-js v3.13.1 以降では、Node.js トレーサー API を使ってユーザー イベントを追跡できます。dd-trace-js の v5.48.0 では、`eventTrackingV2` 名前空間の下に新しいメソッドが追加されます。既存のイベント トラッキング メソッドも互換性のために維持されます。


次の例は、ログインイベントやカスタムイベント (サインアップを例とする) を追跡する方法を示しています。

{{% collapse-content title="ログイン成功" level="h4" expanded="true" %}}
```javascript
const tracer = require('dd-trace')

// コントローラー内:
const user = {
id: 'user-id', // id は必須です。ID がない場合でも、一意な識別子 (ユーザー名やメール アドレスなど) が使えます
  email: 'user@email.com' // ほかのフィールドは任意です
}
const user = 'user-id' // user は ID だけでもかまいません
const login = 'user@email.com'
const metadata = { 'key': 'value' } // 任意のフィールドを追加できます

// ユーザー認証の成功イベントを記録します
// user と metadata は任意です
tracer.appsec.eventTrackingV2.trackUserLoginSuccess(login, user, metadata)
```
{{% /collapse-content %}}

{{% collapse-content title="ログイン失敗" level="h4" expanded="false" id="nodejs-login-failure" %}}
```javascript
const tracer = require('dd-trace')

// コントローラー内:
const login = 'user-id' // ユーザーがログインに使う文字列
const userExists = true // 例: データベースにその login が存在するかどうか
const metadata = { 'key': 'value' } // 任意のフィールドを追加できます

// ユーザー認証の失敗イベントを記録します
// userExists は任意で、指定しない場合は false になります
// metadata は任意です
tracer.appsec.eventTrackingV2.trackUserLoginFailure(login, userExists, metadata)
```
{{% /collapse-content %}}

{{% collapse-content title="カスタム ビジネス ロジック" level="h4" expanded="false" id="nodejs-custom-business" %}}
```javascript
const tracer = require('dd-trace')

// コントローラーで
const eventName = 'users.signup'
const metadata = { 'usr.id': 'user-id' }

tracer.appsec.trackCustomEvent(eventName, metadata)
```
{{% /collapse-content %}}

#### 新しいログイン成功/失敗メソッドへの移行

`eventTrackingV2` の新しいメソッドでは、より直感的なパラメータ順になり、責務の分離も明確になっています。主な変更点は次のとおりです:

1. ログイン識別子 (メール、ユーザー名) が第 1 パラメータになり、必須です。
2. 成功イベントではユーザー オブジェクトまたはユーザー ID は任意になり、失敗イベントからは削除されました。
3. メタデータは簡素化され、`usr.login` フィールドを含める必要はなくなりました。

**注**: 旧メソッドの `trackUserLoginSuccessEvent` と `trackUserLoginFailureEvent` は、それぞれ新メソッドの `eventTrackingV2.trackUserLoginSuccess` と `eventTrackingV2.trackUserLoginFailure` の利用が推奨されるため、非推奨です。

次の例では、コメントアウトされているコードは不要になっています。

{{% collapse-content title="ログイン成功" level="h4" expanded="true" %}}
```javascript
const tracer = require('dd-trace')

// コントローラー内:
const user = {
  id: 'user-id',
  email: 'user@email.com'
} // 以前と同じ形式ですが、このオブジェクト自体は任意になりました。ユーザー ID を渡しておくと、侵害後のアクティビティの関連付けに役立ちます 

const login = 'user@email.com' // 新しい必須引数

const metadata = {
// 'usr.login': 'user@email.com', metadata に含める必要はなくなりました。先頭の引数として渡します
  'key': 'value'
}

// tracer.appsec.trackUserLoginSuccessEvent(user, metadata) // 非推奨
tracer.appsec.eventTrackingV2.trackUserLoginSuccess(login, user, metadata)
```

{{% /collapse-content %}}

{{% collapse-content title="ログイン失敗" level="h4" expanded="false" id="nodejs-migration-login-failure" %}}
```javascript
const tracer = require('dd-trace')

// 非推奨メソッドを使うコントローラー内:
const userId = 'user-id' // 必須ではなくなりましたが、取得できるなら渡しておくと便利です
const login = 'user@email.com' // 新しい必須引数
const userExists = true
const metadata = {
// 'usr.login': 'user@email.com', metadata に含める必要はなくなりました。先頭の引数として渡します
  'usr.id': userId, // ログイン失敗を他のユーザー アクティビティと関連付けるのに役立ちます
  'key': 'value'
}

// tracer.appsec.trackUserLoginFailureEvent(userId, userExists, metadata) // 非推奨
tracer.appsec.eventTrackingV2.trackUserLoginFailure(login, userExists, metadata)
```
{{% /collapse-content %}}

{{< /programming-lang >}}

{{< programming-lang lang="python" >}}

dd-trace-py v1.9.0 からは、Python トレーサーの API を使用してユーザーイベントを追跡することができます。

次の例は、ログインイベントやカスタムイベント (サインアップを例とする) を追跡する方法を示しています。

{{% collapse-content title="ログイン成功" level="h4" expanded="true" %}}
```python
from ddtrace.appsec.trace_utils import track_user_login_success_event
from ddtrace import tracer
metadata = {"usr.login": "user@email.com"}
# name、email、scope、role、session_id、propagate は任意の引数です。
# propagate 以外はデフォルトが None、propagate はデフォルトが True です。
# これらは set_user() 関数に渡されます
track_user_login_success_event(tracer, "userid", metadata)
```
{{% /collapse-content %}}

{{% collapse-content title="ログイン失敗" level="h4" expanded="false" id="python-login-failure" %}}
```python
from ddtrace.appsec.trace_utils import track_user_login_failure_event
from ddtrace import tracer
metadata = {"usr.login": "user@email.com"}
# exists は、ログインに失敗したユーザーがシステム内に存在するかどうかを示します
exists = False
# 数値の userId がない場合でも、ユーザー名やメール アドレスなど、一意な識別子で代用できます
track_user_login_failure_event(tracer, "userid", exists, metadata)
```
{{% /collapse-content %}}

{{% collapse-content title="カスタム ビジネス ロジック" level="h4" expanded="false" id="python-custom-business" %}}
```python
from ddtrace.appsec.trace_utils import track_custom_event
from ddtrace import tracer
metadata = {"usr.id": "userid"}
event_name = "users.signup"
track_custom_event(tracer, event_name, metadata)
```
{{% /collapse-content %}}

{{< /programming-lang >}}

{{< /programming-lang-wrapper >}}

### コードを変更せずにビジネスロジック情報を追跡する

サービスで AAP と [Remote Configuration][1] を有効化している場合、カスタム WAF ルールを作成し、条件に一致したリクエストにカスタム ビジネス ロジック タグを付与できます。これはアプリケーションの改修を必要とせず、Datadog 側だけで完結します。

まず、[Custom WAF Rule ページ][2]に移動し、"Create New Rule" をクリックします。

{{< img src="security/application_security/threats/custom-waf-rule-menu.png" alt="AAP ホームページで Protection → In-App WAF → Custom Rules の順にクリックすると、Custom WAF Rule Menu を開けます" style="width:100%;" >}}

これにより、カスタム WAF ルールを定義できるメニューが開きます。"Business Logic" カテゴリを選択すると、イベント タイプ (例: `users.password_reset`) を設定できます。続いて、追跡したいサービスと特定のエンドポイントを選択します。さらに、ルール条件で特定のパラメータをターゲットにし、インスツルメントしたいコード フローを特定することも可能です。条件が一致すると、ライブラリがトレースにタグを付与し、AAP に転送されるようフラグを立てます。条件が不要な場合は、すべてに一致する広い条件を設定できます。

{{< img src="security/application_security/threats/custom-waf-rule-form.png" alt="Create New Rule ボタンをクリックした際に表示されるフォームのスクリーンショット" style="width:50%;" >}}

ルールが保存されると、リモート構成が有効になっているサービスのインスタンスにデプロイされます。


[1]: /ja/agent/remote_config?tab=configurationyamlfile#application-security-management-asm
[2]: https://app.datadoghq.com/security/appsec/in-app-waf?config_by=custom-rules

## ユーザーアクティビティイベントの自動追跡

AAP が有効な場合、Datadog トレーシング ライブラリはユーザー アクティビティ イベントを自動で検知しようとします。

自動検出できるイベントは以下の通りです。

- `users.login.success`
- `users.login.failure`
- `users.signup`

### ユーザー アクティビティ イベントの自動トラッキング モード

ユーザー アクティビティの自動トラッキングには、次のモードがあります:

- `identification` モード (短縮名: `ident`):
  - このモードがデフォルトで、ユーザー ID を常に収集します (または可能な範囲で収集します)。
  - ユーザー ID は、ログイン成功とログイン失敗で収集されます。失敗時は、ユーザーが存在するかどうかに関わらずユーザー ID を収集します。
  - インスツルメント対象のフレームワークがユーザー ID を明確に提供せず、構造化されたユーザー オブジェクトを提供する場合、ユーザー ID はオブジェクトのフィールド名を元に「可能な範囲で」決定されます。考慮されるフィールド名は、優先順位順に次のとおりです:
    - `id`
    - `email`
    - `username`
    - `login`
    - `user`
  - ユーザー ID が利用できない、または見つからない場合は、ユーザー イベントは送出されません。
- `anonymization` モード (短縮名: `anon`):
  - `identification` と同様ですが、ユーザー ID をハッシュ化 (SHA256) してから、生成されたハッシュを切り詰めて匿名化します。
- `disabled` モード:
  - AAP ライブラリは、自動インスツルメンテーションからユーザー ID を収集しません。
  - ユーザー ログイン イベントは送出されません。

<div class="alert alert-info">すべてのモードは自動インスツルメンテーションにのみ影響します。これらのモードは手動収集には適用されません。手動収集は SDK で設定し、その設定は自動インスツルメンテーションによって上書きされません。</div>

### 手動設定

Datadog ライブラリでは、`DD_APPSEC_AUTO_USER_INSTRUMENTATION_MODE` 環境変数にモードの短縮名 `ident`|`anon`|`disabled` を指定して、自動インスツルメンテーションを設定できます。

デフォルトは `identification` モード (短縮名: `ident`) です。

例: `DD_APPSEC_AUTO_USER_INSTRUMENTATION_MODE=anon`

### 非推奨のモード

<div class="alert alert-info">以前のモードは非推奨ですが、次のメジャー リリースまで互換性は維持されます。</div>

次のモードは非推奨です:

- `safe` モード: トレース ライブラリはイベント メタデータに PII 情報を含めません。トレーサー ライブラリはユーザー ID を収集しようとし、ユーザー ID が有効な [GUID][10] の場合にのみ収集します。
- `extended` モード: トレース ライブラリはユーザー ID とユーザー メールを収集しようとします。このモードでは、Datadog はユーザー ID の型が GUID であるかどうかを確認しません。トレース ライブラリはイベントから抽出できた値をそのまま報告します。

**注**: トレース ライブラリがユーザー イベントから情報を抽出できない場合があります。その場合、イベントは空のメタデータで報告されます。該当するケースでは、[SDK](#adding-business-logic-information-login-success-login-failure-any-business-logic-to-traces) を使ってユーザー イベントを手動でインスツルメントしてください。

## ユーザー アクティビティ イベントのトラッキングを無効化する

[AAP Software Catalog][14] からユーザー アクティビティの自動検知を無効化するには、無効化したいサービスで自動トラッキング モードの環境変数 `DD_APPSEC_AUTO_USER_INSTRUMENTATION_MODE` を `disabled` に変更します。すべてのモードは自動インスツルメンテーションにのみ影響し、[Remote Configuration][15] が有効である必要があります。

手動設定としては、サービス側で環境変数 `DD_APPSEC_AUTOMATED_USER_EVENTS_TRACKING_ENABLED` を `false` に設定し、サービスを再起動できます。これは Datadog Tracing Library をホストしているアプリケーション側に設定する必要があり、Datadog Agent に設定しても反映されません。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[3]: /ja/tracing/trace_collection/custom_instrumentation/
[4]: /ja/security/default_rules/bl-rate-limiting/
[5]: /ja/security/default_rules/bl-privilege-violation-user/
[6]: /ja/security/default_rules/appsec-ato-groupby-ip/
[7]: /ja/security/default_rules/bl-signup-ratelimit/
[8]: /ja/security/default_rules/bl-account-deletion-ratelimit/
[9]: /ja/security/default_rules/bl-password-reset/
[10]: /ja/security/default_rules/bl-payment-failures/
[11]: https://guid.one/guid
[12]: /ja/security/default_rules/appsec-ato-bf/
[13]: /ja/security/default_rules/distributed-ato-ua-asn/
[14]: https://app.datadoghq.com/security/appsec/inventory/services?tab=capabilities
[15]: /ja/agent/remote_config/