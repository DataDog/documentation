---
aliases:
- /ja/security_platform/application_security/add-user-info
- /ja/security/application_security/add-user-info
- /ja/security/application_security/threats/add-user-info/
title: ユーザーのモニターと保護
---
## 概要

サービスをインスツルメンテーションし、ユーザーのアクティビティを追跡することで、悪質なユーザーを検出、ブロックします。

[認証されたユーザー情報をトレースに追加](#addingauthenticateduserinformationtotracesandenablinguserblockingcapability) し、認証された攻撃面を狙う悪意のある行為者を特定しブロックします。これを行うには、実行中の APM トレースにユーザー ID タグを設定し、認証された攻撃者を AAP がブロックするために必要なインスツルメンテーションを提供します。これにより、AAP は攻撃とビジネスロジックイベントをユーザーに関連付けることができます。

[ユーザーログインとアクティビティを追跡](#addingbusinesslogicinformationloginsuccessloginfailureanybusinesslogictotraces) し、すぐに使える検出ルールを使用してアカウント乗っ取りやビジネスロジックの悪用を検出して最終的に攻撃者をブロックします。

すぐに使える検出ルールが利用可能なカスタムユーザーアクティビティは以下の通りです。

|組み込みイベント名   | 必要なメタデータ                                    | 関連ルール                                                                                                                                                                                                       |
||||
| `activity.sensitive`   | `{ "name": "coupon_use", "required_role": "user" }`  | [IP からのレート制限対象アクティビティ][4]<br>[未承認のアクティビティが検出されました][5] |
| `users.login.success`  | ユーザー ID は必須であり、オプションのメタデータを追加できます | [クレデンシャルスタッフィング攻撃][6]<br>[ブルートフォース攻撃][12]<br>[分散クレデンシャルスタッフィング][13]               |
| `users.login.failure`  | ユーザー ID と `usr.exists` は必須であり、オプションのメタデータを追加できます | [クレデンシャルスタッフィング攻撃][6]<br>[ブルートフォース攻撃][12]<br>[分散クレデンシャルスタッフィング][13]  |
| `users.signup`         | `{ "usr.id": "12345" }`                              | [IP からの過剰なアカウント作成][7]                                                                                                    |
| `users.delete`         | `{ "usr.id": "12345" }`                              | [IP からの過剰なアカウント削除][8]                                                                                           |
| `users.password_reset` | `{ "usr.id": "12345", "usr.login": "user@email.com", "exists": true }` | [パスワードリセットのブルートフォース試行][9]                                                                                                         |
| `payment.failure`      | なし                                                 | [IP からの支払いエラーが頻発している][10]                                                                                                        |

##認証済みユーザー情報のトレース追加とユーザーブロック機能の有効化

<div class="alert alert-info">
<strong>ユーザーアクティビティの自動検出:</strong> Datadog トレースライブラリは、ユーザーアクティビティイベントを自動的に検出し報告しようとします。詳細については、<a href="/security/application_security/how-it-works/add-user-info/?tab=set_user#disabling-automatic-user-activity-event-tracking">自動ユーザーアクティビティイベントトラッキングの無効化</a>を参照してください。
</div>

[ルートスパンにカスタムタグを追加する][3] 方法と、後述のインスツルメンテーション関数を利用する方法があります。

{{< programming-lang-wrapper langs="java,dotnet,go,ruby,php,nodejs,python" >}}

{{< programming-lang lang="java" >}}

ルートスパンにカスタムタグを追加するための Java トレーサーの API を使用し、アプリケーションで認証されたリクエストを監視できるように、ユーザー情報を追加します。

ユーザー監視タグはルートスパンに適用され、プレフィックス `usr` の後にフィールド名が続きます。たとえば、`usr.name` はユーザーの名前を追跡するユーザー監視タグです。

**注**: アプリケーションに [必要な依存関係][1] が追加されていることを確認してください。

以下の例では、ルートスパンを取得し、関連するユーザー監視タグを追加し、ユーザーブロック機能を有効にする方法を示しています。

```java
import io.opentracing.Span;
import io.opentracing.util.GlobalTracer;
import datadog.appsec.api.blocking.Blocking;
import datadog.trace.api.interceptor.MutableSpan;

// Get the active span
final Span span = GlobalTracer.get().activeSpan();
if ((span instanceof MutableSpan)) {
   MutableSpan localRootSpan = ((MutableSpan) span).getLocalRootSpan();
   // Setting the mandatory user id tag
   localRootSpan.setTag("usr.id", "d131dd02c56eec4");
   // Setting optional user monitoring tags
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
        // the systems internal identifier for the users
        Id = "d41452f2-483d-4082-8728-171a3570e930",
        // the email address of the user
        Email = "test@adventure-works.com",
        // the user's name, as displayed by the system
        Name = "Jane Doh",
        // the user's session id
        SessionId = "d0632156-132b-4baa-95b2-a492c5f9cb16",
        // the role the user is making the request under
        Role = "standard",
    };
    Tracer.Instance.ActiveScope?.Span.SetUser(userDetails);
```

情報およびオプションについては、[.NET トレーサーのドキュメント][1] をお読みください。

[1]: https://github.com/DataDog/ddtracedotnet/tree/master/docs/Datadog.Trace#useridentification

{{< /programming-lang >}}

{{< programming-lang lang="go" >}}

Go トレーサーパッケージは `SetUser()` 関数を提供し、トレースにユーザー情報を追加することで認証されたリクエストを監視できるようにします。他のオプションについては、[Go トレーサーのドキュメント][2] (または [v1 ドキュメント][1]) をご覧ください。

この例では、現在のトレーサースパンを取得し、それを使用してユーザー監視タグを設定し、ユーザーのブロック機能を有効にする方法を示します。{{% tracing-go-v2 %}}

```go
import (
  "github.com/DataDog/dd-trace-go/v2/appsec"
)

func handler(w http.ResponseWriter, r *http.Request) {
  if appsec.SetUser(r.Context(), "my-uid") != nil {
    // The user must be blocked by aborting the request handler asap.
    // The blocking response is automatically handled and sent by the appsec middleware.
    return
  }
}
```

[1]: https://pkg.go.dev/gopkg.in/DataDog/ddtracego.v1/ddtrace/tracer#SetUser
[2]: https://pkg.go.dev/github.com/DataDog/ddtracego/v2/ddtrace/tracer#SetUser

{{< /programming-lang >}}

{{< programming-lang lang="ruby" >}}

以下の API のいずれかを使用して、トレースにユーザー情報を追加し、アプリケーションで認証されたリクエストを監視できるようにします。

{{% collapse-content title="set_user" level="h4" expanded="true" %}}

`ddtrace` 1.1.0 以降、`Datadog::Kit::Identity.set_user` メソッドが利用可能です。これは、トレースにユーザー情報を追加するための推奨 API です：

```ruby
# Get the active trace
trace = Datadog::Tracing.active_trace

# Set mandatory user id tag
Datadog::Kit::Identity.set_user(trace, id: 'd131dd02c56eeec4')

# Or set any of these optional user monitoring tags
Datadog::Kit::Identity.set_user(
  trace,

  # mandatory id
  id: 'd131dd02c56eeec4',

  # optional tags with known semantics
  name: 'Jean Example',
  email:, 'jean.example@example.com',
  session_id:, '987654321',
  role: 'admin',
  scope: 'read:message, write:files',

  # optional free-form tags
  another_tag: 'another_value',
)
```
{{% /collapse-content %}}

{{% collapse-content title="set_tag" level="h4" expanded="false" id="ruby-set-tag" %}}

`Datadog::Kit::Identity.set_user` がニーズに合わない場合は、代わりに `set_tag` を使用することができます。

ユーザー監視タグはトレースに適用され、プレフィックス `usr.` の後にフィールド名が続きます。たとえば、`usr.name` はユーザーの名前を追跡するユーザー監視タグです。

以下の例では、アクティブトレースを取得し、関連するユーザー監視タグを追加する方法を示しています。

**注**:
 タグの値は文字列でなければなりません。
`usr.id` タグは必須です。

```ruby
# Get the active trace
trace = Datadog::Tracing.active_trace

# Set mandatory user id tag
trace.set_tag('usr.id', 'd131dd02c56eeec4')

# Set optional user monitoring tags with known sematics
trace.set_tag('usr.name', 'Jean Example')
trace.set_tag('usr.email', 'jean.example@example.com')
trace.set_tag('usr.session_id', '987654321')
trace.set_tag('usr.role', 'admin')
trace.set_tag('usr.scope', 'read:message, write:files')

# Set free-form tags:
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
// Blocking is performed internally through the set_user call.
\DDTrace\set_user(
    // A unique identifier of the user is required.
    '123456789',

    // All other fields are optional.
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
    id: '123456789', // *REQUIRED* Unique identifier of the user.

    // All other fields are optional.
    email: 'jane.doe@example.com', // Email of the user.
    name: 'Jane Doe', // User-friendly name of the user.
    session_id: '987654321', // Session ID of the user.
    role: 'admin', // Role the user is making the request under.
    scope: 'read:message, write:files', // Scopes or granted authorizations the user currently possesses.

    // Arbitrary fields are also accepted to attach custom data to the user (RBAC, Oauth, etc…)
    custom_tag: 'custom data'
  })

// Set the currently authenticated user and check whether they are blocked
if (tracer.appsec.isUserBlocked(user)) {  // also set the currently authenticated user
  return tracer.appsec.blockRequest(req, res) // blocking response is sent
  }

}
```

情報およびオプションについては、[Node.js トレーサーのドキュメント][1] をお読みください。



[1]: https://datadoghq.dev/ddtracejs/#setuser
{{< /programming-lang >}}

{{< programming-lang lang="python" >}}

ddtracepy v3.7 からは、新しい Python トレーサーの SDK を使用してユーザーおよびユーザーイベントを追跡することができます。

以前のバージョンでは、Python トレーサーパッケージが提供する `set_user` 関数を用いて、トレースにユーザー情報を追加することで認証されたリクエストを監視できます。

{{% collapse-content title="ユーザー追跡 SDK" level="h4" expanded="true" id="python-user-info-sdk" %}}

ddtracepy v3.7 からは、この例ではユーザー監視タグを設定し、ユーザーブロック機能を有効にする方法を示します。

```python
from ddtrace.appsec.track_user_sdk import track_user

# starting in dd-trace-py v3.17, you can use track_user_id
# without login information, but user_id is required
# this is the recommended API since it enables best product functionality with least room for mistakes
track_user_id(
    "some_user_id",
    session_id="session_id",
    metadata={
        "name": "John",
        "email": "test@test.com",
        "scope": "some_scope",
        "role": "manager",
    },
)

# Alternatively, you can use track_user
user_login = "some_login"
# to enable all features (user_id and/or session_id monitoring and blocking), 
# make sure you provide the corresponding optional arguments
track_user(
    user_login,
    user_id="some_user_id",
    session_id="session_id",
    metadata={
        "name": "John",
        "email": "test@test.com",
        "scope": "some_scope",
        "role": "manager",
    },
)
```

{{% /collapse-content %}}

{{% collapse-content title="レガシー API" level="h4" expanded="false" id="python-user-info-legacy" %}}

この例では、レガシー API を使用してユーザー監視タグを設定し、ユーザーブロック機能を有効にする方法を示します。ただし、上記で説明した新しいユーザートラッキング SDK の使用が推奨されます。

```python
from ddtrace.contrib.trace_utils import set_user
from ddtrace import tracer
# Call set_user() to trace the currently authenticated user id
user_id = "some_user_id"
set_user(tracer, user_id, name="John", email="test@test.com", scope="some_scope",
         role="manager", session_id="session_id", propagate=True)
```

{{% /collapse-content %}}

{{< /programming-lang >}}

{{< /programming-lang-wrapper >}}

## ビジネスロジック情報 (ログイン成功、ログイン失敗、任意のビジネスロジック) のトレース追加

<div class="alert alert-info">
<strong> usr.id と usr.login に関する注意事項: </strong>ログインの悪用調査は、似て非なる 2 つの概念に基づいています。usr.id にはデータベース内のユーザーアカウントの一意の識別子が含まれています。それは一意で不変です。存在しないアカウントにログインしようとする際には利用できません。ユーザーブロックは usr.id を対象とします。</br>
ユーザーは一般的に自分のユーザー ID を認識していません。代わりに、可変の識別子 (電話番号、ユーザー名、メールアドレスなど) を利用します。ユーザーがアカウントにログインするために使用する文字列は、ログインイベントで usr.login として報告されるべきです。</br>
usr.login が提供されない場合は、代わりに usr.id が使用されます。</a>
</div>

{{< programming-lang-wrapper langs="java,dotnet,go,ruby,php,nodejs,python" >}}
{{< programming-lang lang="java" >}}

ddtracejava v1.8.0 からは、Java トレーサーの API を使用してユーザーイベントを追跡することができます。

次の例は、ログインイベントやカスタムイベント (サインアップを例とする) を追跡する方法を示しています。

{{% collapse-content title="ログイン成功" level="h4" expanded="true" %}}

```java
import datadog.trace.api.EventTracker;
import datadog.trace.api.GlobalTracer;

public class LoginController {

    private User doLogin(String userName, String password) {
        // this is where you get User based on userName/password credentials
        User user = checkLogin(userName, password);

        Map<String, String> metadata = new HashMap<>();
        metadata.put("email", user.getEmail());
        metadata.put("usr.login", userName);

        // If your system has multiple "tenants", please provide it. A tenant is an environment/group of user
        metadata.put("usr.org", usr.getTenant());

        // track user authentication success events
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
        // this is where you get User based on userName/password credentials
        User user = checkLogin(userName, password);

        // if function returns null - user doesn't exist
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

        // track user authentication error events
        GlobalTracer
            .getEventTracker()
            .trackLoginFailureEvent(userId, userExists, metadata);
    }
}
```
{{% /collapse-content %}}

{{% collapse-content title="カスタムビジネスロジック" level="h4" expanded="false" id="java-custom-business" %}}

```java
import datadog.trace.api.EventTracker;
import datadog.trace.api.GlobalTracer;

public class LoginController {

    private User doSignup(String userId, String email) {
        // this is where you create your user account
        User user = createUser(userId, email);

        Map<String, String> metadata = new HashMap<>();
        metadata.put("usr.id", user.getId());

        // track user signup events
        GlobalTracer
            .getEventTracker()
            .trackCustomEvent("users.signup", metadata);
    }
}

```
{{% /collapse-content %}}

{{< /programming-lang >}}

{{< programming-lang lang="dotnet" >}}

ddtracedotnet v2.23.0 からは、.NET トレーサーの API を使用してユーザーイベントを追跡することができます。

次の例は、ログインイベントやカスタムイベント (サインアップを例とする) を追跡する方法を示しています。

{{% collapse-content title="ログイン成功" level="h4" expanded="true" %}}

```csharp
using Datadog.Trace.AppSec;

void OnLogonSuccess(string userId, string login...)
{
    // metadata is optional
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
    // If no userId can be provided, any unique user identifier (username, email...) may be used
    // metadata is optional
    var metadata = new Dictionary<string, string>()
    {
        { "usr.login", login }
    };
    EventTrackingSdk.TrackUserLoginFailureEvent(userId, userExists, metadata);

    // ...
}
```
{{% /collapse-content %}}

{{% collapse-content title="カスタムビジネスロジック" level="h4" expanded="false" id="dotnet-custom-business" %}}

```csharp
void OnUserSignupComplete(string userId, ...)
{
    // the metadata parameter is optional, but adding the "usr.id"
    var metadata = new Dictionary<string, string>()
    {
        { "usr.id", userId }
    };
    // Leveraging custom business logic tracking to track user signups
    EventTrackingSdk.TrackCustomEvent("users.signup", metadata);

    // ...
}
```
{{% /collapse-content %}}

{{< /programming-lang >}}
{{< programming-lang lang="go" >}}

ddtracego v1.47.0 からは、Go トレーサーの API を使用してユーザーイベントを追跡することができます。

次の例は、ログインイベントやカスタムイベント (サインアップを例とする) を追跡する方法を示しています。{{% tracing-go-v2 %}}

{{% collapse-content title="ログイン成功" level="h4" expanded="true" %}}

```go
import (
  "github.com/DataDog/dd-trace-go/v2/appsec"
)

func handler(w http.ResponseWriter, r *http.Request) {
  metadata := make(map[string]string) /* optional extra event metadata */
  userdata := /* optional extra user data */

  metadata["usr.login"] = "user-email"

  // Track login success, replace `my-uid` by a unique identifier of the user (such as numeric, username, and email)
  if appsec.TrackUserLoginSuccessEvent(r.Context(), "my-uid", metadata, userdata) != nil {
    // The given user id is blocked and the handler should be aborted asap.
    // The blocking response will be sent by the appsec middleware.
    return
  }
}
```
{{% /collapse-content %}}
{{% collapse-content title="ログイン失敗" level="h4" expanded="false" id="go-login-failure" %}}

```go
import (
  "github.com/DataDog/dd-trace-go/v2/appsec"
)

func handler(w http.ResponseWriter, r *http.Request) {
  exists := /* whether the given user id exists or not */
  metadata := make(map[string]string) /* optional extra event metadata */
  metadata["usr.login"] = "user-email"

  // Replace `my-uid` by a unique identifier of the user (numeric, username, email...)
  appsec.TrackUserLoginFailureEvent(r.Context(), "my-uid", exists, metadata)
}
```
{{% /collapse-content %}}

{{% collapse-content title="カスタムビジネスロジック" level="h4" expanded="false" id="go-custom-business" %}}

```go
import (
  "github.com/DataDog/dd-trace-go/v2/appsec"
)

func handler(w http.ResponseWriter, r *http.Request) {
  metadata := map[string]string{"usr.id": "my-uid"}

  // Leveraging custom business logic tracking to track user signups
  appsec.TrackCustomEvent(r.Context(), "users.signup", metadata)
}
```
{{% /collapse-content %}}

{{< /programming-lang >}}
{{< programming-lang lang="ruby" >}}

ddtracerb v1.9.0 からは、Ruby トレーサーの API を使用してユーザーイベントを追跡することができます。ddtracerb v2.19.0 のバージョンでは、`Datadog::Kit::AppSec::Events::V2` ネームスペースの下に新しいメソッドが導入されました。既存のイベント追跡メソッドは互換性のために保持されています。

次の例は、ログインイベントやカスタムイベント (サインアップを例とする) を追跡する方法を示しています。

{{% collapse-content title="ログイン成功" level="h4" expanded="true" %}}

```ruby
require 'datadog/kit/appsec/events/v2'

login = 'user@some.com'
user = 'some-user-id'    # any unique string identifier (i.e. id, username or email)
user = {                 # or user could be a Hash with an id and other fields
  id: 'some-user-id',    # id is mandatory
  email: 'user@some.com' # other fields are optional
}
metadata = { 'some.key': 'value' } # any arbitrary key-value pairs

Datadog::Kit::AppSec::Events::V2.track_user_login_success(login, user, metadata)
```
{{% /collapse-content %}}

{{% collapse-content title="ログイン失敗" level="h4" expanded="false" id="ruby-login-failure" %}}

```ruby
require 'datadog/kit/appsec/events/v2'

login = 'user@some.com' # the string used by the user to log in
user_exists = true      # if the user login exists in database for example
metadata = { 'some.key': 'value' } # any arbitrary key-value pairs

Datadog::Kit::AppSec::Events::V2.track_user_login_failure(login, user_exists, metadata)
```
{{% /collapse-content %}}

{{% collapse-content title="カスタムビジネスロジック" level="h4" expanded="false" id="ruby-custom-business" %}}

```ruby
require 'datadog/kit/appsec/events'

span = nil
trace = Datadog::Tracing.active_trace
metadata = { 'usr.id': 'some-user-id' }
event_name = 'users.signup'

Datadog::Kit::AppSec::Events.track(event_name, trace, span, metadata)
```
{{% /collapse-content %}}

####新しいログイン成功および失敗メソッドへの移行

`Datadog::Kit::AppSec::Events::V2` に追加された新しいメソッドは、パラメーターの順序がより直感的で、関心の分離もより明確になっています。主な変更点は以下の通りです。

1. ログイン識別子 (メールアドレス、ユーザー名) が最初のパラメーターであり、必須です。
2. ユーザーオブジェクト/ID は成功イベントでは任意であり、失敗イベントからは削除されています。
3. メタデータは簡素化され、`usr.login` フィールドは不要になりました。
4. トレースおよびスパンパラメーターは不要になり、自動的に推測されます。

**注意**: 従来のメソッド `track_login_success` と `track_login_failure` は非推奨となり、それぞれ新しいメソッド `track_user_login_success` と `track_user_login_failure` が推奨されます。

以下の例では、コメントされたコードは不要になりました。

{{% collapse-content title="ログイン成功" level="h4" expanded="true" id="ruby-v2-migration-login-success" %}}

```ruby
require 'datadog/kit/appsec/events/v2'

login = 'user@some.com' # new mandatory argument
user = {                # same as before, but now the Hash is optional
  id: 'some-user-id',   # providing a user ID will nonetheless help with post-compromised activity correlation
  email: 'user@some.com'
}
metadata = {
# 'usr.login': 'user@some.com', this is no longer necessary in metadata, but became the required first parameter
  'some.key': 'value'
}

# deprecated
# Datadog::Kit::AppSec::Events.track_login_success(trace, span, user: user, **metadata)

Datadog::Kit::AppSec::Events::V2.track_user_login_success(login, user, metadata)
```
{{% /collapse-content %}}

{{% collapse-content title="ログイン失敗" level="h4" expanded="false" id="ruby-v2-migration-login-failure" %}}

```ruby
require 'datadog/kit/appsec/events/v2'

login = 'user@some.com' # new mandatory argument
user_exists = true      # if the user login exists in database for example
metadata = {
# 'usr.login': 'user@some.com', this is no longer necessary in metadata, but became the required first parameter
  'some.key': 'value'
}

# deprecated
# Datadog::Kit::AppSec::Events.track_login_failure(trace, span, user_exists: user_exists, user_id: login, **metadata)

Datadog::Kit::AppSec::Events::V2.track_user_login_failure(login, user_exists, metadata)
```
{{% /collapse-content %}}

{{< /programming-lang >}}

{{< programming-lang lang="php" >}}
ddtracephp v0.84.0 からは、PHP トレーサーの API を使用してユーザーイベントを追跡することができます。ddtracephp v1.11.0 では、`\datadog\appsec\v2\` ネームスペースの下に新しいメソッドが導入されました。既存のイベント追跡メソッドは互換性のために保持されています。

次の例は、ログインイベントやカスタムイベント (サインアップを例とする) を追跡する方法を示しています。

{{% collapse-content title="ログイン成功" level="h4" expanded="true" %}}

```php
<?php
$user = [
    'id' => 'user-id', // id is mandatory. If no ID is available, any unique identifier works (username, email...)
    'email' => 'user@email.com' // other fields are optional
]; //User data can be provided as an array
$user = 'user-id'; //or user could be just an ID
$login = 'user@email.com';
$metadata = [ 'key' => 'value' ]; // you can add arbitrary fields to metadata

// Log a successful user authentication event
// user and metadata are optional
\datadog\appsec\v2\track_user_login_success($login, $user, $metadata);
?>
```
{{% /collapse-content %}}

{{% collapse-content title="ログイン失敗" level="h4" expanded="false" id="php-login-failure" %}}

```php
<?php
$login = 'user-id'; // the string used by the user to log in
$userExists = true; // if the user login exists in database or not
$metadata = [ 'key' => 'value' ]; // you can add arbitrary fields to metadata

// Log a failed user authentication event
// userExists is optional and it defaults to false
// metadata is optional
\datadog\appsec\v2\track_user_login_failure($login, $userExists, $metadata);
?>
```
{{% /collapse-content %}}

{{% collapse-content title="カスタムビジネスロジック" level="h4" expanded="false" id="php-custom-business" %}}

```php
<?php
$eventName = 'users.signup'; // custom event name
$metadata = ['usr.id' => $id]; // you can add arbitrary fields to metadata
\datadog\appsec\track_custom_event($eventName, $metadata);
?>
```
{{% /collapse-content %}}

####新しいログイン成功および失敗メソッドへの移行

`\datadog\appsec\v2\` ネームスペースの新しいメソッドは、パラメーターの順序がより直感的で、関心の分離もより明確になっています。主な変更点は以下の通りです。

1. ログイン識別子 (メールアドレス、ユーザー名) が最初のパラメーターであり、必須です。
2. ユーザー配列/ID は成功イベントでは任意であり、失敗イベントからは削除されています。
3. メタデータは簡素化され、`usr.login` フィールドは不要になりました。

**注意**: 従来のメソッド `\datadog\appsec\track_user_login_success_event` と `\datadog\appsec\track_user_login_failure_event` は非推奨となり、それぞれ新しいメソッド `\datadog\appsec\v2\track_user_login_success` と `\datadog\appsec\v2\track_user_login_failure` が推奨されます。

以下の例では、コメントされたコードは不要になりました。

{{% collapse-content title="ログイン成功" level="h4" expanded="true" %}}

```php
<?php
// in a controller:
$user = [
    'id' => 'user-id', // id is mandatory. If no ID is available, any unique identifier works (username, email...)
    'email' => 'user@email.com' // other fields are optional
]; // same as before, but now the array is optional. Providing a user ID nonetheless helps with post-compromised activity correlation

$login = 'user@email.com'; // new mandatory argument

$metadata = [
//  'usr.login' => 'user@email.com', this is no longer necessary in metadata. Must be the first argument
  'key' => 'value'
];

// \datadog\appsec\track_user_login_success_event($user, $metadata) // deprecated
\datadog\appsec\v2\track_user_login_success($login, $user, $metadata);
?>
```
{{% /collapse-content %}}

{{% collapse-content title="ログイン失敗" level="h4" expanded="false" id="php-migration-login-failure" %}}

```php
<?php

$userId = 'user-id'; // No longer mandatory, but helpful when available
$login = 'user@email.com'; // new mandatory argument
$userExists = true;
$metadata = [
//  'usr.login' => 'user@email.com', this is no longer necessary in metadata. Must be the first argument
  'usr.id' => 'user-id', // Helps with correlating login failures with the rest of the user activity
  'key' => 'value'
];

// \datadog\appsec\track_user_login_failure_event($userId, $exists, $metadata); // deprecated
\datadog\appsec\v2\track_user_login_failure($login, $userExists, $metadata);
```
{{% /collapse-content %}}
{{< /programming-lang >}}

{{< programming-lang lang="nodejs" >}}

ddtracejs v3.13.1 からは、Node.js トレーサー API を使用してユーザーイベントを追跡することができます。ddtracejs のバージョン v5.48.0 では、`eventTrackingV2` ネームスペースの下に新しいメソッドが導入されています。既存のイベント追跡メソッドは互換性のために保持されています。


次の例は、ログインイベントやカスタムイベント (サインアップを例とする) を追跡する方法を示しています。

{{% collapse-content title="ログイン成功" level="h4" expanded="true" %}}

```javascript
const tracer = require('dd-trace')

// in a controller:
const user = {
id: 'user-id', // id is mandatory. If no ID is available, any unique identifier works (username, email...)
  email: 'user@email.com' // other fields are optional
}
const user = 'user-id' // user could be just the ID
const login = 'user@email.com'
const metadata = { 'key': 'value' } // you can add arbitrary fields

// Log a successful user authentication event
// user and metadata are optional
tracer.appsec.eventTrackingV2.trackUserLoginSuccess(login, user, metadata)
```
{{% /collapse-content %}}

{{% collapse-content title="ログイン失敗" level="h4" expanded="false" id="nodejs-login-failure" %}}

```javascript
const tracer = require('dd-trace')

// in a controller:
const login = 'user-id' // the string used by the user to log in
const userExists = true // if the user login exists in database for example
const metadata = { 'key': 'value' } // you can add arbitrary fields

// Log a failed user authentication event
// userExists is optional and it is defaulted to false
// metadata is optional
tracer.appsec.eventTrackingV2.trackUserLoginFailure(login, userExists, metadata)
```
{{% /collapse-content %}}

{{% collapse-content title="カスタムビジネスロジック" level="h4" expanded="false" id="nodejs-custom-business" %}}

```javascript
const tracer = require('dd-trace')

// in a controller:
const eventName = 'users.signup'
const metadata = { 'usr.id': 'user-id' }

tracer.appsec.trackCustomEvent(eventName, metadata)
```
{{% /collapse-content %}}

####新しいログイン成功および失敗メソッドへの移行

`eventTrackingV2` の新しいメソッドは、パラメーターの順序がより直感的で、関心の分離もより明確になっています。主な変更点は以下の通りです。

1. ログイン識別子 (メールアドレス、ユーザー名) が最初のパラメーターであり、必須です。
2. ユーザーオブジェクト/ID は成功イベントでは任意であり、失敗イベントからは削除されています。
3. メタデータは簡素化され、`usr.login` フィールドは不要になりました。

**注意**: 従来のメソッド `trackUserLoginSuccessEvent` と `trackUserLoginFailureEvent` は非推奨となり、それぞれ新しいメソッド `eventTrackingV2.trackUserLoginSuccess` と `eventTrackingV2.trackUserLoginFailure` が推奨されます。

以下の例では、コメントされたコードは不要になりました。

{{% collapse-content title="ログイン成功" level="h4" expanded="true" %}}

```javascript
const tracer = require('dd-trace')

// in a controller:
const user = {
  id: 'user-id',
  email: 'user@email.com'
} // same as before, but now the object is optional. Providing a user ID will nonetheless help with post-compromised activity correlation

const login = 'user@email.com' // new mandatory argument

const metadata = {
//  'usr.login': 'user@email.com', this is no longer necessary in metadata. Must be the main argument
  'key': 'value'
}

// tracer.appsec.trackUserLoginSuccessEvent(user, metadata) // deprecated
tracer.appsec.eventTrackingV2.trackUserLoginSuccess(login, user, metadata)
```
{{% /collapse-content %}}

{{% collapse-content title="ログイン失敗" level="h4" expanded="false" id="nodejs-migration-login-failure" %}}

```javascript
const tracer = require('dd-trace')

// in a controller with the deprecated method:
const userId = 'user-id' // No longer mandatory, but helpful when available
const login = 'user@email.com' // new mandatory argument
const userExists = true
const metadata = {
//  'usr.login': 'user@email.com', this is no longer necessary in metadata. Must be the first argument
  'usr.id': userId, // Helps with correlating login failures with the rest of the user activity
  'key': 'value'
}

// tracer.appsec.trackUserLoginFailureEvent(userId, userExists, metadata) // deprecated
tracer.appsec.eventTrackingV2.trackUserLoginFailure(login, userExists, metadata)
```
{{% /collapse-content %}}

{{< /programming-lang >}}

{{< programming-lang lang="python" >}}


ddtracepy v1.9.0 からは、Python トレーサーの API を使用してユーザーイベントを追跡することができます。

ddtracepy v3.7 からは、新しい Python トレーサーの SDK を使用してユーザーおよびユーザーイベントを追跡することができます。

次の例は、ログインイベント、サインアップイベント、またはカスタムイベントを追跡する方法を示しています。

{{% collapse-content title="ユーザー追跡 SDK" level="h4" expanded="true" id="python-business-logic-sdk" %}}

ddtracepy v3.7 以降、`track_user_sdk` は以下に示す 5 つの関数を提供します。

 `track_login_success`
 `track_login_failure`
 `track_signup`
 `track_custom_event`
 `track_user`

ddtracepy v3.17 以降、`track_user_sdk` はこの追加の関数を提供します。

 `tracker_user_id`


```python
from ddtrace.appsec import track_user_sdk

## This function should be called when a user successfully logs in to the
# application.

# user_id and metadata are optional
metadata = {"usr.email": "user@email.com"}
track_user_sdk.track_login_success(
    "some_user_login",
    user_id="some_user_id",
    metadata=metadata,
)


## This function should be called when a user fails to log in to the
# application.

# user_id and metadata are optional
metadata = {"usr.error": "login failure"}

# If you want to track the login failure as a "login do not exists"
exists = False
track_user_sdk.track_login_failure(
    "some_user_login",
    exists,
    metadata=metadata,
)

# If you want to track the login failure as a "login exists but
# authentification failed
exists = True
track_user_sdk.track_login_failure(
    "some_user_login",
    exists,
    user_id="some_user_id",
    metadata=metadata,
)


## This function should be called when a user successfully signs up for
# the application.

# user_id, success and metadata are optional, success is True by default.
metadata = {"usr.email": "user@email.com"}
track_user_sdk.track_signup(
    "some_user_login",
    user_id="some_user_id",
    success=True,
    metadata=metadata,
)


## This function should be called when a custom user event occurs in the
# application.

# metadata is required
metadata = {
    "usr.address": {"line1": "221b Baker Street", "city": "London"},
    "phone": "0123456789",
}
track_user_sdk.track_custom_event("my_event_name", metadata)

```
{{% /collapse-content %}}

{{% collapse-content title="FastAPI トイアプリケーションと SDK" level="h4" expanded="false" id="python-business-logic-example" %}}

次の例は、メモリベースのユーザーデータベースを使用してユーザートラッキング SDK を利用する、フル機能を備えたトイアプリケーションです。この例は SDK の可能な使用法を示しています。ただし、永続的なデータモデルや安全な認証システムなど、実際のアプリケーションに必要な要件を提供していません。

```python
from uuid import uuid4

import ddtrace.auto  # noqa: F401
from ddtrace.appsec.track_user_sdk import (
    track_custom_event,
    track_login_failure,
    track_login_success,
    track_signup,
    track_user,
)
from fastapi import FastAPI, HTTPException, Request
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from starlette.middleware.sessions import SessionMiddleware


class User(BaseModel):
    user_id: str
    username: str
    password: str


users: dict[str, User] = {}

app = FastAPI()


@app.middleware("http")
async def track_user_middleware(request: Request, call_next):
    user = request.session.get("username")
    session_id = request.session.get("session_id")
    if user and session_id and user in users:
        track_user(user, users[user].user_id, session_id=session_id)
    return await call_next(request)


session_secret = "just-a-test"
app.add_middleware(SessionMiddleware, secret_key=session_secret)


@app.post("/signup")
async def signup(username: str, password: str):
    if username in users:
        return JSONResponse(
            {"error": "User already exists"},
            status_code=400,
        )

    user_id = str(uuid4())
    users[username] = User(
        user_id=user_id,
        username=username,
        password=password,
    )

    track_signup(username, user_id, success=True)
    return {"message": "User created successfully"}


@app.post("/login")
async def login(username: str, password: str, request: Request):
    if username not in users:
        track_login_failure(username, False)
        return JSONResponse(
            {"error": "Invalid user password combination"},
            status_code=403,
        )

    if users[username].password != password:
        track_login_failure(username, True, users[username].user_id)
        return JSONResponse(
            {"error": "Invalid user password combination"},
            status_code=403,
        )

    track_login_success(username, users[username].user_id)
    request.session["username"] = username
    request.session["session_id"] = str(uuid4())

    return {"message": "Login successful"}


@app.get("/whoami")
async def whoami(request: Request) -> User:
    if (
        "username" not in request.session
        or request.session["username"] not in users
    ):
        raise HTTPException(status_code=403, detail="User not logged in")

    track_custom_event(
        "user_has_forgotten_who_they_are",
        metadata={
            "username": request.session["username"],
            "session_id": request.session["session_id"],
        },
    )
    return users[request.session["username"]]
```

{{% /collapse-content %}}


{{% collapse-content title="レガシー API" level="h4" expanded="false" id="python-business-logic-legacy" %}}

推奨される方法は、従来の API の代わりに新しいユーザートラッキング SDK (ddtracepy v1.9 以降利用可能) を使用することです。

```python
from ddtrace.appsec.trace_utils import track_user_login_success_event
from ddtrace.appsec.trace_utils import track_user_login_failure_event
from ddtrace.appsec.trace_utils import track_custom_event
from ddtrace import tracer
metadata = {"usr.login": "user@email.com"}
# name, email, scope, role, session_id and propagate are optional arguments which
# default to None except propagate that defaults to True. They'll be
# passed to the set_user() function
track_user_login_success_event(tracer, "userid", metadata)


# exists indicates if the failed login user exists in the system
exists = False
# if no numeric userId is available, any unique identifier will do (username, email...)
track_user_login_failure_event(tracer, "userid", exists, metadata)


metadata = {"usr.id": "userid"}
event_name = "users.signup"
track_custom_event(tracer, event_name, metadata)
```
{{% /collapse-content %}}

{{< /programming-lang >}}

{{< /programming-lang-wrapper >}}

###コードを変更せずにビジネスロジック情報を追跡

サービスに AAP が有効で、[リモート構成][1] が有効な場合、カスタムビジネスロジックタグで一致するリクエストをフラグ付けするカスタム WAF ルールを作成できます。これにはアプリケーションの変更は必要なく、Datadog のみで完結します。

まず、[Custom WAF Rule ページ][2] に移動し、"Create New Rule" をクリックします。

{{< img src="security/application_security/threats/custom-waf-rule-menu.png" alt="AAP ホームページから保護をクリックし、次に InApp WAF とカスタムルールを選択してカスタム WAF ルールメニューにアクセスします。" style="width:100%;" >}}

これにより、カスタム WAF ルールを定義できるメニューが開きます。「ビジネスロジック」カテゴリを選択することで、イベントタイプを設定できるようになります (たとえば、`users.password_reset`)。その後、追跡したいサービスと特定のエンドポイントを選択できます。ルール条件を使用して、特定のパラメーターをターゲットにし、_インスツルメント_ したいコードフローを特定することもできます。条件が一致すると、ライブラリはトレースにタグを付け、AAP に転送されるようにフラグを立てます。条件が不要な場合は、すべてに一致する広範な条件を設定できます。

{{< img src="security/application_security/threats/custom-waf-rule-form.png" alt="新しいルールを作成するボタンをクリックしたときに表示されるフォームのスクリーンショット" style="width:50%;" >}}

ルールが保存されると、リモート構成が有効になっているサービスのインスタンスにデプロイされます。


[1]: /ja/tracing/guide/remote_config
[2]: https://app.datadoghq.com/security/appsec/inappwaf?config_by=customrules

##ユーザーアクティビティイベントの自動追跡

AAP が有効になると、Datadog トレーシングライブラリはユーザーアクティビティイベントを自動的に検出しようとします。

自動検出できるイベントは以下の通りです。

 `users.login.success`
 `users.login.failure`
 `users.signup`

###ユーザーアクティビティイベント追跡モード

ユーザーアクティビティ追跡には、以下のモードがあります。

 `identification` モード (短縮名: `ident`):
   このモードはデフォルトで有効となっており、ユーザー ID、もしくは可能な範囲で最適な識別情報を常に収集します。
   ユーザー ID は、ログイン成功時とログイン失敗時に収集されます。失敗時には、ユーザーが存在するかどうかに関わらずユーザー ID が収集されます。
  インスツルメンテーション済みのフレームワークが明確なユーザー ID を提供しない場合、代わりに構造化されたユーザーオブジェクトが提示され、そのフィールド名に基づいてユーザー ID が可能な限りで決定されます。このフィールド名のリストは、以下の優先順位に従って考慮されます。
     `id`
     `email`
     `username`
     `login`
     `user`
   ユーザー ID が利用できない場合、ユーザーイベントは発生しません。
`anonymization` モード (短縮名: `anon`):
   このモードは `identification` と同じですが、ユーザー ID をハッシュ化 (SHA256) して結果のハッシュを切り取ることで匿名化します。
`disabled` モード:
   AAP ライブラリは *ユーザー ID を*自動インスツルメンテーションから収集しません。
   ユーザーログインイベントは発生しません。

<div class="alert alert-info">すべてのモードは自動インスツルメンテーションにのみ影響します。手動収集には適用されません。手動収集は SDK を使用して設定され、自動インスツルメンテーションによってその設定は上書きされません。</div>

###手動構成

Datadog ライブラリでは、`DD_APPSEC_AUTO_USER_INSTRUMENTATION_MODE` 環境変数にモードの短縮名 (`ident`|`anon`|`disabled`) を指定することで、自動インスツルメンテーションを設定できます。

デフォルトモードは、`identification` モード (短縮名: `ident`) です。

例: `DD_APPSEC_AUTO_USER_INSTRUMENTATION_MODE=anon`

###非推奨のモード

<div class="alert alert-info">以前のモードは廃止されましたが、次のメジャーリリースまで互換性は維持されます。</div>

以下のモードは廃止されています。

 `safe`モード: トレースライブラリはイベントメタデータに PII 情報を含めません。トレーサーライブラリはユーザー ID を収集しようとし、ユーザー ID が有効な [GUID][10] である場合のみ収集します。
 `extended`モード: トレースライブラリはユーザー ID とユーザーのメールアドレスを収集しようとします。このモードでは、Datadog はユーザー ID のタイプが GUID であるかどうかを確認しません。トレースライブラリはイベントから抽出できる値を報告します。

**注意**: トレースライブラリがユーザーイベントから情報を抽出できない場合があります。イベントは空のメタデータで報告されます。その場合は、[SDK](#addingbusinesslogicinformationloginsuccessloginfailureanybusinesslogictotraces) を使用してユーザーイベントを手動でインスツルメンテーションしてください。

##ユーザーアクティビティイベント追跡の無効化

自動ユーザーアクティビティ検出を無効にするには、[AAP ソフトウェアカタログ][14] を通じて、無効にしたいサービスの自動追跡モード環境変数 `DD_APPSEC_AUTO_USER_INSTRUMENTATION_MODE` を`disabled` に変更します。すべてのモードは自動インスツルメンテーションにのみ影響し、[Remote Configuration][15] が有効である必要があります。

手動で設定する場合は、サービス上で環境変数 `DD_APPSEC_AUTOMATED_USER_EVENTS_TRACKING_ENABLED` を `false` に設定し、再起動してください。これは Datadog トレーシングライブラリをホストしているアプリケーションで設定する必要があり、Datadog Agent では設定しないでください。

[3]: /ja/tracing/trace_collection/custom_instrumentation/
[4]: /ja/security/default_rules/blratelimiting/
[5]: /ja/security/default_rules/blprivilegeviolationuser/
[6]: /ja/security/default_rules/appsecatogroupbyip/
[7]: /ja/security/default_rules/blsignupratelimit/
[8]: /ja/security/default_rules/blaccountdeletionratelimit/
[9]: /ja/security/default_rules/blpasswordreset/
[10]: /ja/security/default_rules/blpaymentfailures/
[11]: https://guid.one/guid
[12]: /ja/security/default_rules/appsecatobf/
[13]: /ja/security/default_rules/distributedatouaasn/
[14]: https://app.datadoghq.com/security/appsec/inventory/services?tab=capabilities
[15]: /ja/tracing/guide/remote_config