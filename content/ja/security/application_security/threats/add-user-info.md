---
aliases:
- /ja/security_platform/application_security/add-user-info
- /ja/security/application_security/add-user-info
further_reading:
- link: /security/application_security/
  tag: Documentation
  text: Protect against threats with Datadog Application Security Management
- link: /security/application_security/threats/library_configuration/
  tag: Documentation
  text: Other setup considerations and configuration options
title: User Monitoring and Protection
---

## 概要

サービスをインスツルメンテーションし、ユーザーのアクティビティを追跡することで、悪質なユーザーを検出・ブロックします。

[Add authenticated user information on traces](#adding-authenticated-user-information-to-traces-and-enabling-user-blocking-capability) to identify and block bad actors targeting your authenticated attack surface. To do this, set the user ID tag on the running APM trace, providing the necessary instrumentation for ASM to block authenticated attackers. This allows ASM to associate attacks and business logic events to users.

[Track user logins and activity](#adding-business-logic-information-login-success-login-failure-any-business-logic-to-traces) to detect account takeovers and business logic abuse with out-of-the-box detection rules, and to ultimately block attackers.

<div class="alert alert-info">
<strong>ユーザーアクティビティの自動検出:</strong> Datadog トレーシングライブラリは、ユーザーアクティビティイベントを自動的に検出してレポートしようとします。詳細については、<a href="/security/application_security/threats/add-user-info/?tab=set_user#disabling-automatic-user-activity-event-tracking">ユーザーアクティビティイベントの自動追跡を無効にする</a>を参照してください。
</div>

すぐに使える検出ルールとして、以下のようなカスタムユーザーアクティビティがあります。

| 内蔵のイベント名   | 必要なメタデータ                                    | 関連ルール                                                                                                                                                                                                       |
|------------------------|------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `activity.sensitive`   | `{ "name": "coupon_use", "required_role": "user" }`  | [IP からのレート制限アクティビティ][4]<br>[不正なアクティビティの検出][5] |
| `users.login.success`  | ユーザー ID は必須で、オプションでメタデータを追加できます | [Credential Stuffing attack][6]<br>[Bruteforce attack][12]<br>[Distributed Credential Stuffing][13]               |
| `users.login.failure`  | User ID and `usr.exists` are mandatory, optional metadata can be added | [Credential Stuffing attack][6]<br>[Bruteforce attack][12]<br>[Distributed Credential Stuffing][13]  |
| `users.signup`         | `{ "usr.id": "12345" }`                              | [IP からの過剰なアカウント作成][7]                                                                                                    |
| `users.delete`         | `{ "usr.id": "12345" }`                              | [IP からの過剰なアカウント削除][8]                                                                                           |
| `users.password_reset` | `{ "usr.id": "12345", "exists": true }`              | [パスワードリセットのブルートフォース試行][9]                                                                                                         |
| `payment.attempt`      | `{ "status": "failed" }`                             | [IP からの過剰な支払い失敗][10]                                                                                                        |

## 認証されたユーザー情報をトレースに追加し、ユーザーブロック機能を有効にする

[ルートスパンにカスタムタグを追加する][3]方法と、後述のインスツルメンテーション関数を利用する方法があります。

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

Go トレーサーパッケージは `SetUser()` 関数を提供し、トレースにユーザー情報を追加することで認証されたリクエストを監視できるようにします。他のオプションについては、[Go トレーサーのドキュメント][1]をご覧ください。

この例では、現在のトレーサースパンを取得し、それを使用してユーザー監視タグを設定し、ユーザーブロック機能を有効にする方法を説明します。

```go
import "gopkg.in/DataDog/dd-trace-go.v1/appsec"
func handler(w http.ResponseWriter, r *http.Request) {
  if appsec.SetUser(r.Context(), "my-uid") != nil {
    // 早急にリクエストハンドラーを中止して、ユーザーをブロックする必要があります。
    // ブロック応答は、appsec ミドルウェアによって自動的に処理され、送信されます。
    return 
  }
}
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

{{< programming-lang-wrapper langs="java,dotnet,go,ruby,php,nodejs,python" >}}
{{< programming-lang lang="java" >}}

dd-trace-java v1.8.0 からは、Java トレーサーの API を使用してユーザーイベントを追跡することができます。

次の例は、ログインイベントやカスタムイベント (サインアップを例とする) を追跡する方法を示しています。

{{< tabs >}}
{{% tab "ログイン成功" %}}
```java
import datadog.trace.api.EventTracker;
import datadog.trace.api.GlobalTracer;

public class LoginController {

    private User doLogin(String userName, String password) {
        // this is where you get User based on userName/password credentials
        User user = checkLogin(userName, password);

        Map<String, String> metadata = new HashMap<>();
        metadata.put("email", user.getEmail());

        // track user authentication success events
        GlobalTracer
            .getEventTracker()
            .trackLoginSuccessEvent(user.getId(), metadata);

    }
}

```
{{% /tab %}}

{{% tab "ログイン失敗" %}}
```java
import datadog.trace.api.EventTracker;
import datadog.trace.api.GlobalTracer;

public class LoginController {

    private User doLogin(String userName, String password) {
        // this is where you get User based on userName/password credentials
        User user = checkLogin(userName, password);

        // if function returns null - user doesn't exist
        boolean userExists = (user != null);
        String userId = null;
        Map<String, String> metadata = new HashMap<>();
        if (userExists != null) {
            userId = getUserId(userName)
            metadata.put("email", user.getEmail());
        } else {
            userId = user.getEmail();
        }

        // track user authentication error events
        GlobalTracer
            .getEventTracker()
            .trackLoginFailureEvent(userId, userExists, metadata);
    }
}
```
{{% /tab %}}

{{% tab "カスタムビジネスロジック" %}}
```java
import datadog.trace.api.EventTracker;
import datadog.trace.api.GlobalTracer;

public class LoginController {

    private User doSignup(String userId, String email) {
        // ここで、ユーザーアカウントを作成します
        User user = createUser(userId, email);

        Map<String, String> metadata = new HashMap<>();
        metadata.put("email", user.getEmail());
        metadata.put("id", user.getId());

        // ユーザーサインアップイベントを追跡します
        GlobalTracer
            .getEventTracker()
            .trackCustomEvent("users.signup", metadata);
    }
}

```
{{% /tab %}}

{{< /tabs >}}

{{< /programming-lang >}}

{{< programming-lang lang="dotnet" >}}

dd-trace-dotnet v2.23.0 からは、.NET トレーサーの API を使用してユーザーイベントを追跡することができます。

次の例は、ログインイベントやカスタムイベント (サインアップを例とする) を追跡する方法を示しています。

{{< tabs >}}
{{% tab "ログイン成功" %}}
```csharp
using Datadog.Trace.AppSec;

void OnLogonSuccess(string userId, ...)
{
    // metadata はオプションです
    var metadata = new Dictionary<string, string>()
    {
        { "customKey", "customValue" }
    };
    EventTrackingSdk.TrackUserLoginSuccessEvent(userId, metadata);

    // ...
}

```
{{% /tab %}}
{{% tab "ログイン失敗" %}}
```csharp
using Datadog.Trace.AppSec;

void OnLogonFailure(string userId, bool userExists, ...)
{
    // If no userId can be provided, any unique user identifier (username, email...) may be used
    // metadata is optional
    var metadata = new Dictionary<string, string>()
    {
        { "customKey", "customValue" }
    };
    EventTrackingSdk.TrackUserLoginFailureEvent(userId, userExists, metadata);

    // ...
}
```

{{% /tab %}}

{{% tab "カスタムビジネスロジック" %}}
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
{{% /tab %}}

{{< /tabs >}}


{{< /programming-lang >}}
{{< programming-lang lang="go" >}}

dd-trace-go v1.47.0 からは、Go トレーサーの API を使用してユーザーイベントを追跡することができます。

次の例は、ログインイベントやカスタムイベント (サインアップを例とする) を追跡する方法を示しています。

{{< tabs >}}
{{% tab "ログイン成功" %}}
```go
import "gopkg.in/DataDog/dd-trace-go.v1/appsec"

func handler(w http.ResponseWriter, r *http.Request) {
  metadata := /* optional extra event metadata */
  userdata := /* optional extra user data */

  // Track login success, replace `my-uid` by a unique identifier of the user (such as numeric, username, and email)
  if appsec.TrackUserLoginSuccessEvent(r.Context(), "my-uid", metadata, userdata) != nil {
    // The given user id is blocked and the handler should be aborted asap.
    // The blocking response will be sent by the appsec middleware.
    return
  }
}
```
{{% /tab %}}
{{% tab "ログイン失敗" %}}
```go
import "gopkg.in/DataDog/dd-trace-go.v1/appsec"

func handler(w http.ResponseWriter, r *http.Request) {
  exists := /* whether the given user id exists or not */
  metadata := /* optional extra event metadata */ 
  // Replace `my-uid` by a unique identifier of the user (numeric, username, email...)
  appsec.TrackUserLoginFailureEvent(r.Context(), "my-uid", exists, metadata)
}
```
{{% /tab %}}

{{% tab "カスタムビジネスロジック" %}}
```go
import "gopkg.in/DataDog/dd-trace-go.v1/appsec"

func handler(w http.ResponseWriter, r *http.Request) {
  metadata := map[string]string{"usr.id": "my-uid"}

  // カスタムビジネスロジックの追跡を活用し、ユーザーのサインアップを追跡します
  appsec.TrackCustomEvent(r.Context(), "users.signup", metadata)
}
```
{{% /tab %}}

{{< /tabs >}}

{{< /programming-lang >}}
{{< programming-lang lang="ruby" >}}

dd-trace-rb v1.9.0 からは、Ruby トレーサーの API を使用してユーザーイベントを追跡することができます。

次の例は、ログインイベントやカスタムイベント (サインアップを例とする) を追跡する方法を示しています。

ログインの成功/失敗イベントを含むトレースは、以下のクエリ `@appsec.security_activity:business_logic.users.login.success` または `@appsec.security_activity:business_logic.users.login.failure` を使用してクエリすることができます。

{{< tabs >}}
{{% tab "ログイン成功" %}}
```ruby
require 'datadog/kit/appsec/events'

trace = Datadog::Tracing.active_trace
# Replace `my_user_id` by a unique identifier of the user (numeric, username, email...)
Datadog::Kit::AppSec::Events.track_login_success(trace, user: { id: 'my_user_id' })
```
{{% /tab %}}

{{% tab "ログイン失敗" %}}
```ruby
require 'datadog/kit/appsec/events'
trace = Datadog::Tracing.active_trace

# Replace `my_user_id` by a unique identifier of the user (numeric, username, email...)

# if the user exists
Datadog::Kit::AppSec::Events.track_login_failure(trace, user_id: 'my_user_id', user_exists: true)

# if the user doesn't exist
Datadog::Kit::AppSec::Events.track_login_failure(trace, user_id: 'my_user_id', user_exists: false)
```
{{% /tab %}}

{{% tab "カスタムビジネスロジック" %}}
```ruby
require 'datadog/kit/appsec/events'
trace = Datadog::Tracing.active_trace

# カスタムビジネスロジックの追跡を活用し、ユーザーのサインアップを追跡します
Datadog::Kit::AppSec::Events.track('users.signup', trace)
```
{{% /tab %}}
{{< /tabs >}}

{{< /programming-lang >}}

{{< programming-lang lang="php" >}}
dd-trace-php v0.84.0 からは、PHP トレーサーの API を使用してユーザーイベントを追跡することができます。

次の例は、ログインイベントやカスタムイベント (サインアップを例とする) を追跡する方法を示しています。

{{< tabs >}}
{{% tab "ログイン成功" %}}
```php
<?php
\datadog\appsec\track_user_login_success_event($id, ['email' => $email])
?>
```
{{% /tab %}}

{{% tab "ログイン失敗" %}}
```php
<?php
// If no numeric userId is available, you may use any unique string as userId instead (username, email...)
// Make sure that the value is unique per user (and not per attacker/IP)
\datadog\appsec\track_user_login_failure_event($id, $exists, ['email' => $email])
?>
```
{{% /tab %}}

{{% tab "カスタムビジネスロジック" %}}
```php
<?php
\datadog\appsec\track_custom_event('users.signup', ['id' => $id, 'email' => $email]);
?>
```
{{% /tab %}}

{{< /tabs >}}


{{< /programming-lang >}}
{{< programming-lang lang="nodejs" >}}
dd-trace-js v3.13.1 からは、NodeJS トレーサーの API を使用してユーザーイベントを追跡することができます。

次の例は、ログインイベントやカスタムイベント (サインアップを例とする) を追跡する方法を示しています。

{{< tabs >}}
{{% tab "ログイン成功" %}}
```javascript
const tracer = require('dd-trace')

// in a controller:
const user = {
  id: 'user-id', // id is mandatory, if no numeric ID is available, any unique identifier will do (username, email...)
  email: 'user@email.com' // other fields are optional
}
const metadata = { custom: 'value' } // optional metadata with arbitrary fields

// Log a successful user authentication event
tracer.appsec.trackUserLoginSuccessEvent(user, metadata) // metadata is optional
```
{{% /tab %}}

{{% tab "ログイン失敗" %}}
```javascript
const tracer = require('dd-trace')

// in a controller:
const userId = 'user-id' // if no numeric ID is available, any unique identifier will do (username, email...)
const userExists = true // if the user login exists in database for example
const metadata = { custom: 'value' } // optional metadata with arbitrary fields

// metadata is optional
tracer.appsec.trackUserLoginFailureEvent(userId, userExists, metadata)
```
{{% /tab %}}

{{% tab "カスタムビジネスロジック" %}}
```javascript
const tracer = require('dd-trace')

// コントローラーで
const eventName = 'users.signup'
const metadata = { 'usr.id': 'user-id' }

tracer.appsec.trackCustomEvent(eventName, metadata)
```
{{% /tab %}}

{{< /tabs >}}


{{< /programming-lang >}}

{{< programming-lang lang="python" >}}

dd-trace-py v1.9.0 からは、Python トレーサーの API を使用してユーザーイベントを追跡することができます。

次の例は、ログインイベントやカスタムイベント (サインアップを例とする) を追跡する方法を示しています。

{{< tabs >}}

{{% tab "ログイン成功" %}}

```python
from ddtrace.appsec.trace_utils import track_user_login_success_event
from ddtrace import tracer
metadata = {"custom": "customvalue"}
# name、email、scope、role、session_id、propagate はオプションの引数で、
# デフォルトは None ですが propagate はデフォルトが True になります。
# これらは set_user() 関数に渡されます
track_user_login_success_event(tracer, "userid", metadata)
```
{{% /tab %}}
{{% tab "ログイン失敗" %}}
```python
from ddtrace.appsec.trace_utils import track_user_login_failure_event
from ddtrace import tracer
metadata = {"custom": "customvalue"}
# exists indicates if the failed login user exists in the system
exists = False
# if no numeric userId is available, any unique identifier will do (username, email...)
track_user_login_failure_event(tracer, "userid", exists, metadata)
```
{{% /tab %}}

{{% tab "カスタムビジネスロジック" %}}

```python
from ddtrace.appsec.trace_utils import track_custom_event
from ddtrace import tracer
metadata = {"usr.id": "userid"}
event_name = "users.signup"
track_custom_event(tracer, event_name, metadata)
```
{{% /tab %}}

{{< /tabs >}}

{{< /programming-lang >}}

{{< /programming-lang-wrapper >}}

### コードを変更せずにビジネスロジック情報を追跡する

サービスで ASM が有効になっており、[リモート構成][1]が有効になっている場合、カスタムのビジネスロジックタグと一致するリクエストにフラグを立てるカスタム WAF ルールを作成することができます。この場合、アプリケーションを変更する必要はなく、すべて Datadog から行うことができます。

まず、[Custom WAF Rule ページ][2]に移動し、"Create New Rule" をクリックします。

{{< img src="security/application_security/threats/custom-waf-rule-menu.png" alt="ASM ホームページから Protection、In-App WAF、Custom Rules の順にクリックして、Custom WAF Rule メニューにアクセス" style="width:100%;" >}}

カスタム WAF ルールを定義するためのメニューが開きます。"Business Logic" カテゴリーを選択すると、イベントタイプ (例: `users.password_reset`) を構成できるようになります。次に、追跡したいサービスと特定のエンドポイントを選択します。また、ルール条件を使用して特定のパラメーターをターゲットにし、_インスツルメント_したいコードフローを特定することもできます。条件が一致すると、ライブラリがトレースにタグを付け、それを ASM に転送するフラグを立てます。条件が不要な場合は、すべてに一致する大まかな条件を設定することもできます。

{{< img src="security/application_security/threats/custom-waf-rule-form.png" alt="Create New Rule ボタンをクリックした際に表示されるフォームのスクリーンショット" style="width:50%;" >}}

ルールが保存されると、リモート構成が有効になっているサービスのインスタンスにデプロイされます。


[1]: /ja/agent/remote_config?tab=configurationyamlfile#application-security-management-asm
[2]: https://app.datadoghq.com/security/appsec/in-app-waf?config_by=custom-rules

## ユーザーアクティビティイベントの自動追跡

ASM を有効にすると、最近の Datadog トレーシングライブラリは、ユーザーアクティビティイベントの自動検出を試みます。

自動検出できるイベントは以下の通りです。

- `users.login.success`
- `users.login.failure`
- `users.signup`

### ユーザーアクティビティイベント自動追跡モード

ユーザーアクティビティの自動追跡には、<code>safe</code> モードと <code>extended</code> モードの 2 種類があります

<code>safe</code> モードでは、トレースライブラリはイベントのメタデータに PII 情報を含めません。トレーサーライブラリはユーザー ID の収集を試みますが、ユーザー ID が有効な [GUID][10] である場合のみです

<code>extended</code> モードでは、トレースライブラリはユーザー ID とユーザーのメールアドレスを収集しようとします。このモードでは、ユーザー ID のタイプが GUID であるかどうかをチェックしません。トレースライブラリは、イベントから抽出できる値であれば何でもレポートします。

ユーザーイベント自動追跡モードを構成するには、環境変数 <code>DD_APPSEC_AUTOMATED_USER_EVENTS_TRACKING</code> を <code>safe</code> または <code>extended</code> に設定します。デフォルトでは、トレーサーライブラリは <code>safe</code> モードを使用します。

**注**: トレースライブラリがユーザーイベントから情報を抽出できない場合があります。イベントは空のメタデータでレポートされます。そのような場合は、[SDK](#adding-business-logic-information-login-success-login-failure-any-business-logic-to-traces) を使用して、ユーザーイベントを手動でインスツルメンテーションすることをお勧めします。

## ユーザーアクティビティイベントの自動追跡を無効にする

これらのイベントの検出を無効にするには、環境変数 <code>DD_APPSEC_AUTOMATED_USER_EVENTS_TRACKING</code> を <code>disabled</code> に設定します。これは、Datadog Agent ではなく、Datadog トレーシングライブラリをホストするアプリケーションで設定する必要があります。

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