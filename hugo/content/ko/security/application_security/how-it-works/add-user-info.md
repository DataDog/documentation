---
aliases:
- /ko/security_platform/application_security/add-user-info
- /ko/security/application_security/add-user-info
- /ko/security/application_security/threats/add-user-info/
further_reading:
- link: https://www.datadoghq.com/blog/app-api-protection-python-lambda-monitoring/
  tag: 블로그
  text: Datadog AAP를 사용하여 Python Lambda 함수의 런타임 위협 탐지하기
title: 사용자 모니터링 및 보호
---
## 개요 {#overview}

서비스에 계측을 적용하고 사용자 활동을 추적하여 악성 행위자를 탐지하고 차단하세요.

[트레이스에 인증된 사용자 정보를 추가하여](#adding-authenticated-user-information-to-traces-and-enabling-user-blocking-capability) 인증된 공격 표면을 노리는 악성 행위자를 식별하고 차단하세요. 이를 위해 실행 중인 APM 트레이스에 사용자 ID 태그를 설정하여 AAP가 인증된 공격자를 차단하는 데 필요한 계측을 제공하세요. 이 기능을 통해 AAP는 공격과 비즈니스 로직 이벤트를 사용자와 연결할 수 있습니다.

[사용자 로그인 및 활동을 추적하여](#adding-business-logic-information-login-success-login-failure-any-business-logic-to-traces) 기본 제공 탐지 규칙으로 계정 탈취 및 비즈니스 로직 오용을 탐지하고, 궁극적으로 공격자를 차단하세요.

기본 제공 탐지 규칙을 사용할 수 있는 사용자 지정 활동은 다음과 같습니다.

| 내장 이벤트 이름   | 필수 메타데이터                                    | 관련 규칙                                                                                                                                                                                                       |
|------------------------|------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `activity.sensitive`   | `{ "name": "coupon_use", "required_role": "user" }`  | [IP 기반 속도 제한이 적용된 활동][4]<br>[승인되지 않은 활동 탐지][5] |
| `users.login.success`  | 사용자 ID는 필수이며, 선택적 메타데이터를 추가할 수 있습니다 | [크리덴셜 스터핑 공격][6]<br>[무차별 대입 공격][12]<br>[분산 크리덴셜 스터핑][13]               |
| `users.login.failure`  | 사용자 ID와 `usr.exists`는 필수이며, 선택적 메타데이터를 추가할 수 있습니다 | [크리덴셜 스터핑 공격][6]<br>[무차별 대입 공격][12]<br>[분산 크리덴셜 스터핑][13]  |
| `users.signup`         | `{ "usr.id": "12345" }`                              | [IP에서 과도한 계정 생성][7]                                                                                                    |
| `users.delete`         | `{ "usr.id": "12345" }`                              | [IP에서 과도한 계정 삭제][8]                                                                                           |
| `users.password_reset` | `{ "usr.id": "12345", "usr.login": "user@email.com", "exists": true }` | [암호 재설정 무차별 대입 시도][9]                                                                                                         |
| `payment.failure`      | 없음                                                 | [IP에서 과도한 결제 실패][10]                                                                                                        |

## 인증된 사용자 정보를 트레이스에 추가하고 사용자 차단 기능 활성화 {#adding-authenticated-user-information-to-traces-and-enabling-user-blocking-capability}

<div class="alert alert-info">
<strong>사용자 활동 자동 탐지:</strong> Datadog SDK는 사용자 활동 이벤트를 자동으로 탐지하고 보고하려고 시도합니다. 자세한 내용은 <a href="/security/application_security/how-it-works/add-user-info/?tab=set_user#disabling-automatic-user-activity-event-tracking">자동 사용자 활동 이벤트 추적 비활성화</a>를 참조하세요.
</div>

[루트 스팬][3]에 사용자 지정 태그를 추가하거나 아래 설명된 계측 함수를 사용할 수 있습니다.

{{< programming-lang-wrapper langs="java,dotnet,go,ruby,php,nodejs,python" >}}

{{< programming-lang lang="java" >}}

Java 트레이서 API를 사용하여 루트 스팬에 사용자 지정 태그와 사용자 정보를 추가하면 애플리케이션에서 인증된 요청을 모니터링할 수 있습니다.

사용자 모니터링 태그는 루트 스팬에 적용되며, `usr` 접두사로 시작하고 그 뒤에 필드 이름이 옵니다. 예를 들어, `usr.name`은 사용자의 이름을 추적하는 사용자 모니터링 태그입니다.

**참고**: [애플리케이션에 필요한 종속성][1]이 추가되었는지 검사하세요.

아래 예시에서는 루트 스팬을 가져오고, 관련 사용자 모니터링 태그를 추가하고, 사용자 차단 기능을 활성화하는 방법을 보여줍니다.

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

[1]: /ko/tracing/trace_collection/custom_instrumentation/opentracing/java#setup
{{< /programming-lang >}}

{{< programming-lang lang="dotnet" >}}

.NET 트레이스 패키지는 사용자 정보를 트레이스에 추가하여 인증된 요청을 모니터링할 수 있는 `SetUser()` 함수를 제공합니다.

아래 예시에서는 관련 사용자 모니터링 태그를 추가하고 사용자 차단 기능을 활성화하는 방법을 보여줍니다.

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

자세한 내용과 옵션은 [.NET 트레이서 문서][1]를 참조하세요.

[1]: https://github.com/DataDog/dd-trace-dotnet/tree/master/docs/Datadog.Trace#user-identification

{{< /programming-lang >}}

{{< programming-lang lang="go" >}}

Go 트레이스 패키지는 사용자 정보를 트레이스에 추가하여 인증된 요청을 모니터링할 수 있는 `SetUser()` 함수를 제공합니다. 더 많은 옵션은 [Go 트레이서 설명서][2](또는 [v1 설명서][1])를 참조하세요.

이 예시에서는 현재 트레이서 스팬을 검색하고 이를 사용하여 사용자 모니터링 태그를 설정하고 사용자 차단 기능을 활성화하는 방법을 보여줍니다. {{% tracing-go-v2 %}}

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

[1]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer#SetUser
[2]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/v2/ddtrace/tracer#SetUser

{{< /programming-lang >}}

{{< programming-lang lang="ruby" >}}

다음 API 중 하나를 사용하여 트레이스에 사용자 정보를 추가하면 애플리케이션에서 인증된 요청을 모니터링할 수 있습니다.

{{% collapse-content title="set_user" level="h3" expanded="true" %}}

`ddtrace` 1.1.0부터 `Datadog::Kit::Identity.set_user` 메서드를 사용할 수 있습니다. 트레이스에 사용자 정보를 추가할 때 권장되는 API입니다.

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
  email: 'jean.example@example.com',
  session_id: '987654321',
  role: 'admin',
  scope: 'read:message, write:files',

  # optional free-form tags
  another_tag: 'another_value',
)
```
{{% /collapse-content %}}

{{% collapse-content title="set_tag" level="h3" expanded="false" id="ruby-set-tag" %}}

`Datadog::Kit::Identity.set_user`가 요구 사항을 충족하지 않는 경우 대신 `set_tag`를 사용할 수 있습니다.

사용자 모니터링 태그는 트레이스에 적용되며 `usr.` 접두사로 시작하고 그 뒤에 필드 이름이 옵니다. 예를 들어, `usr.name`은 사용자의 이름을 추적하는 사용자 모니터링 태그입니다.

아래 예시에서는 활성화된 트레이스를 얻고 관련 사용자 모니터링 태그를 추가하는 방법을 보여줍니다.

**참고**:
- 태그 값은 문자열이어야 합니다.
- `usr.id` 태그는 필수입니다.

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

PHP 트레이서는 인증된 요청을 모니터링하고 차단할 수 있는 `\DDTrace\set_user()` 함수를 제공합니다.

`\DDTrace\set_user()` 트레이스에 관련 사용자 태그와 메타데이터를 추가하고 자동으로 사용자를 차단합니다.

다음 예시에서는 사용자 모니터링 태그를 설정하고 사용자 차단을 활성화하는 방법을 보여줍니다.

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

Node 트레이서 패키지는 사용자 정보를 트레이스에 추가하여 인증된 요청을 모니터링할 수 있는 `tracer.setUser(user)` 함수를 제공합니다.

아래 예시에서는 관련 사용자 모니터링 태그를 추가하고 사용자 차단 기능을 활성화하는 방법을 보여줍니다.

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

자세한 내용과 옵션은 [Node.js 트레이서 설명서][1]를 참조하세요.



[1]: https://datadoghq.dev/dd-trace-js/#set-user
{{< /programming-lang >}}

{{< programming-lang lang="python" >}}

dd-trace-py v3.7 이상에서는 새로운 Python 트레이서 SDK를 사용하여 사용자 및 사용자 이벤트를 추적할 수 있습니다.

이전 버전에서는 Python 트레이스 패키지가 제공하는 `set_user` 함수를 사용하여 트레이스에 사용자 정보를 추가함으로써 인증된 요청을 모니터링할 수 있습니다.

{{% collapse-content title="User Tracking SDK" level="h3" expanded="true" id="python-user-info-sdk" %}}

dd-trace-py v3.7 이상에서 사용자 모니터링 태그를 설정하고 사용자 차단 기능을 활성화하는 방법을 아래 예시에서 보여줍니다.

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

{{% collapse-content title="레거시 API" level="h3" expanded="false" id="python-user-info-legacy" %}}

이 예시는 레거시 API를 사용하여 사용자 모니터링 태그를 설정하고 사용자 차단 기능을 활성화하는 방법을 보여줍니다. 그러나 위에서 설명한 새로운 User Tracking SDK를 사용하는 것이 권장됩니다.

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

## 트레이스에 비즈니스 로직 정보(로그인 성공, 로그인 실패, 모든 비즈니스 로직) 추가 {#adding-business-logic-information-login-success-login-failure-any-business-logic-to-traces}

<div class="alert alert-info">
<strong> usr.id 및 usr.login 관련 참고 사항: </strong> 로그인 남용 조사는 서로 유사하지만 다른 두 가지 개념을 바탕으로 합니다. usr.id는 데이터베이스에서 사용자 계정의 고유 식별자를 포함합니다. 고유하며 변경할 수 없습니다. 존재하지 않는 계정에 로그인 시도 시 사용할 수 없습니다. 사용자 차단은 usr.id를 대상으로 합니다.</br>
사용자는 일반적으로 자신의 사용자 ID를 알지 못하며, 대신 변경 가능한 식별자(전화번호, 사용자 이름, 이메일 주소 등)를 사용합니다. 계정 로그인 시 사용자가 입력한 문자열은 로그인 이벤트에서 `usr.login`으로 보고해야 합니다.</br>
usr.login이 제공되지 않으면 대신 usr.id가 사용됩니다.</a>
</div>

{{< programming-lang-wrapper langs="java,dotnet,go,ruby,php,nodejs,python" >}}
{{< programming-lang lang="java" >}}

dd-trace-java v1.8.0부터 Java 트레이서 API를 사용하여 사용자 이벤트를 추적할 수 있습니다.

다음 예시는 로그인 이벤트나 사용자 정의 이벤트(예: 회원가입)를 추적하는 방법을 보여줍니다.

{{% collapse-content title="로그인 성공" level="h3" expanded="true" %}}

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

{{% collapse-content title="로그인 실패" level="h3" expanded="false" id="java-login-failure" %}}

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
        if (userExists) {
            userId = getUserId(userName);
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

{{% collapse-content title="사용자 지정 비즈니스 로직" level="h3" expanded="false" id="java-custom-business" %}}

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

dd-trace-dotnet v2.23.0부터 .NET 트레이서 API를 사용하여 사용자 이벤트를 추적할 수 있습니다.

다음 예시는 로그인 이벤트나 사용자 정의 이벤트(예: 회원가입)를 추적하는 방법을 보여줍니다.

{{% collapse-content title="로그인 성공" level="h3" expanded="true" %}}

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
{{% collapse-content title="로그인 실패" level="h3" expanded="false" id="dotnet-login-failure" %}}

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

{{% collapse-content title="사용자 지정 비즈니스 로직" level="h3" expanded="false" id="dotnet-custom-business" %}}

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

dd-trace-go v1.47.0부터 Go 트레이서 API를 사용하여 사용자 이벤트를 추적할 수 있습니다.

다음 예시는 로그인 이벤트나 사용자 정의 이벤트(예: 회원가입)를 추적하는 방법을 보여줍니다. {{% tracing-go-v2 %}}

{{% collapse-content title="로그인 성공" level="h3" expanded="true" %}}

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
{{% collapse-content title="로그인 실패" level="h3" expanded="false" id="go-login-failure" %}}

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

{{% collapse-content title="사용자 지정 비즈니스 로직" level="h3" expanded="false" id="go-custom-business" %}}

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

dd-trace-rb v1.9.0부터 Ruby 트레이서 API를 사용하여 사용자 이벤트를 추적할 수 있습니다. dd-trace-rb 버전 v2.19.0에서는 `Datadog::Kit::AppSec::Events::V2` 네임스페이스 아래에 새로운 메서드가 도입되었습니다. 기존 이벤트 추적 메서드는 호환성을 위해 유지됩니다.

다음 예시는 로그인 이벤트나 사용자 정의 이벤트(예: 회원가입)를 추적하는 방법을 보여줍니다.

{{% collapse-content title="로그인 성공" level="h3" expanded="true" %}}

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

{{% collapse-content title="로그인 실패" level="h3" expanded="false" id="ruby-login-failure" %}}

```ruby
require 'datadog/kit/appsec/events/v2'

login = 'user@some.com' # the string used by the user to log in
user_exists = true      # if the user login exists in database for example
metadata = { 'some.key': 'value' } # any arbitrary key-value pairs

Datadog::Kit::AppSec::Events::V2.track_user_login_failure(login, user_exists, metadata)
```
{{% /collapse-content %}}

{{% collapse-content title="사용자 지정 비즈니스 로직" level="h3" expanded="false" id="ruby-custom-business" %}}

```ruby
require 'datadog/kit/appsec/events'

span = nil
trace = Datadog::Tracing.active_trace
metadata = { 'usr.id': 'some-user-id' }
event_name = 'users.signup'

Datadog::Kit::AppSec::Events.track(event_name, trace, span, metadata)
```
{{% /collapse-content %}}

#### 새로운 로그인 성공 및 실패 메서드로 마이그레이션 {#migrating-to-the-new-login-success-and-failure-methods}

`Datadog::Kit::AppSec::Events::V2`의 새로운 메서드는 파라미터 순서를 더욱 직관적으로 구성하고 책임을 더욱 명확하게 구분합니다. 주요 변경 사항은 다음과 같습니다.

1. 로그인 식별자(이메일, 사용자 이름)는 첫 번째 파라미터이며 필수입니다.
2. 성공 이벤트에서는 사용자 객체/ID가 선택 사항이며 실패 이벤트에서는 제거되었습니다.
3. 메타데이터가 간소화되어 더 이상 `usr.login` 필드가 필요하지 않습니다.
4. 트레이스 및 스팬 파라미터는 더 이상 필요하지 않으며 자동으로 추론됩니다.

**참고**: 레거시 메서드인 `track_login_success` 및 `track_login_failure`는 각각 새로운 메서드인 `track_user_login_success` 및 `track_user_login_failure`로 대체되어 지원이 중단되었습니다.

아래 예시에서는 주석 처리된 코드가 더 이상 필요하지 않습니다.

{{% collapse-content title="로그인 성공" level="h5" expanded="true" id="ruby-v2-migration-login-success" %}}

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

{{% collapse-content title="로그인 실패" level="h5" expanded="false" id="ruby-v2-migration-login-failure" %}}

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
dd-trace-php v0.84.0부터 PHP 트레이서 API를 사용하여 사용자 이벤트를 추적할 수 있습니다. dd-trace-php v1.11.0 버전에서는 `\datadog\appsec\v2\` 네임스페이스 하위에 새로운 메서드가 도입되었습니다. 기존 이벤트 추적 메서드는 호환성을 위해 유지됩니다.

다음 예시는 로그인 이벤트나 사용자 정의 이벤트(예: 회원가입)를 추적하는 방법을 보여줍니다.

{{% collapse-content title="로그인 성공" level="h3" expanded="true" %}}

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

{{% collapse-content title="로그인 실패" level="h3" expanded="false" id="php-login-failure" %}}

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

{{% collapse-content title="사용자 지정 비즈니스 로직" level="h3" expanded="false" id="php-custom-business" %}}

```php
<?php
$eventName = 'users.signup'; // custom event name
$metadata = ['usr.id' => $id]; // you can add arbitrary fields to metadata
\datadog\appsec\track_custom_event($eventName, $metadata);
?>
```
{{% /collapse-content %}}

#### 새로운 로그인 성공 및 실패 메서드로 마이그레이션 {#migrating-to-the-new-login-success-and-failure-methods-1}

`\datadog\appsec\v2\` 네임스페이스의 새로운 메서드는 파라미터 순서를 더욱 직관적으로 구성하고 책임을 더욱 명확하게 구분합니다. 주요 변경 사항은 다음과 같습니다.

1. 로그인 식별자(이메일, 사용자 이름)는 첫 번째 파라미터이며 필수입니다.
2. 성공 이벤트에서는 사용자 배열/ID가 선택 사항이며 실패 이벤트에서는 제거되었습니다.
3. 메타데이터가 간소화되어 더 이상 `usr.login` 필드가 필요하지 않습니다.

**참고**: 레거시 메서드인 `\datadog\appsec\track_user_login_success_event` 및 `\datadog\appsec\track_user_login_failure_event`는 각각 새로운 메서드인 `\datadog\appsec\v2\track_user_login_success` 및 `\datadog\appsec\v2\track_user_login_failure`로 대체되어 지원이 중단되었습니다.

아래 예시에서는 주석 처리된 코드가 더 이상 필요하지 않습니다.

{{% collapse-content title="로그인 성공" level="h5" expanded="true" %}}

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

{{% collapse-content title="로그인 실패" level="h5" expanded="false" id="php-migration-login-failure" %}}

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

dd-trace-js v3.13.1부터 Node.js 트레이서 API를 사용하여 사용자 이벤트를 추적할 수 있습니다. dd-trace-js v5.48.0 버전에서는 `eventTrackingV2` 네임스페이스 하위에 새로운 메서드가 도입되었습니다. 기존 이벤트 추적 메서드는 호환성을 위해 유지됩니다.


다음 예시는 로그인 이벤트나 사용자 정의 이벤트(예: 회원가입)를 추적하는 방법을 보여줍니다.

{{% collapse-content title="로그인 성공" level="h3" expanded="true" %}}

```javascript
const tracer = require('dd-trace')

// in a controller:
const user = {
  id: 'user-id', // id is mandatory. If no ID is available, any unique identifier works (username, email...)
  email: 'user@email.com' // other fields are optional
}
// Alternatively: const user = 'user-id' (user can be just the ID string)
const login = 'user@email.com'
const metadata = { 'key': 'value' } // you can add arbitrary fields

// Log a successful user authentication event
// user and metadata are optional
tracer.appsec.eventTrackingV2.trackUserLoginSuccess(login, user, metadata)
```
{{% /collapse-content %}}

{{% collapse-content title="로그인 실패" level="h3" expanded="false" id="nodejs-login-failure" %}}

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

{{% collapse-content title="사용자 지정 비즈니스 로직" level="h3" expanded="false" id="nodejs-custom-business" %}}

```javascript
const tracer = require('dd-trace')

// in a controller:
const eventName = 'users.signup'
const metadata = { 'usr.id': 'user-id' }

tracer.appsec.trackCustomEvent(eventName, metadata)
```
{{% /collapse-content %}}

#### 새로운 로그인 성공 및 실패 메서드로 마이그레이션 {#migrating-to-the-new-login-success-and-failure-methods-2}

`eventTrackingV2`의 새로운 메서드는 파라미터 순서를 더욱 직관적으로 구성하고 책임을 더욱 명확하게 구분합니다. 주요 변경 사항은 다음과 같습니다.

1. 로그인 식별자(이메일, 사용자 이름)는 첫 번째 파라미터이며 필수입니다.
2. 성공 이벤트에서는 사용자 객체/ID가 선택 사항이며 실패 이벤트에서는 제거되었습니다.
3. 메타데이터가 간소화되어 더 이상 `usr.login` 필드가 필요하지 않습니다.

**참고**: 레거시 메서드인 `trackUserLoginSuccessEvent` 및 `trackUserLoginFailureEvent`는 각각 새로운 메서드인 `eventTrackingV2.trackUserLoginSuccess` 및 `eventTrackingV2.trackUserLoginFailure`로 대체되어 지원이 중단되었습니다.

아래 예시에서는 주석 처리된 코드가 더 이상 필요하지 않습니다.

{{% collapse-content title="로그인 성공" level="h5" expanded="true" %}}

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

{{% collapse-content title="로그인 실패" level="h5" expanded="false" id="nodejs-migration-login-failure" %}}

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


dd-trace-py v1.9.0부터 Python 트레이서 API를 사용하여 사용자 이벤트를 추적할 수 있습니다.

dd-trace-py v3.7 이상에서는 새로운 Python 트레이서 SDK를 사용하여 사용자 및 사용자 이벤트를 추적할 수 있습니다.

다음 예시는 로그인 이벤트, 가입 이벤트 또는 사용자 지정 이벤트를 추적하는 방법을 보여줍니다.

{{% collapse-content title="User Tracking SDK" level="h3" expanded="true" id="python-business-logic-sdk" %}}

dd-trace-py v3.7부터 사용할 수 있는`track_user_sdk`는 5가지 기능을 제공합니다.

- `track_login_success`
- `track_login_failure`
- `track_signup`
- `track_custom_event`
- `track_user`

dd-trace-py v3.17부터 사용할 수 있는 `track_user_sdk`는 다음과 같은 추가 기능을 제공합니다.

- `track_user_id`


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

{{% collapse-content title="SDK가 포함된 FastAPI 예시 앱" level="h3" expanded="false" id="python-business-logic-example" %}}

다음은 메모리 기반 사용자 데이터베이스와 함께 User Tracking SDK를 사용하며 완전히 작동하는 예시 애플리케이션입니다. 이 예시는 SDK 사용 방법을 보여주지만, 실제 애플리케이션에서 필요한 지속적 데이터 모델이나 안전한 인증 시스템과 같은 요구 사항은 포함하지 않습니다.

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


{{% collapse-content title="레거시 API" level="h3" expanded="false" id="python-business-logic-legacy" %}}

권장 방법은 레거시 API 대신 새로운 User Tracking SDK(dd-trace-py v1.9부터 사용 가능)를 사용하는 것입니다.

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

### 코드를 수정하지 않고 비즈니스 로직 정보 추적 {#tracking-business-logic-information-without-modifying-the-code}

서비스에 AAP와 [Remote Configuration][1]이 활성화되어 있다면, 사용자 지정 WAF 규칙을 생성하여 일치하는 요청에 사용자 지정 비즈니스 로직 태그로 플래그를 지정할 수 있습니다. 애플리케이션을 수정할 필요 없이 Datadog에서만 수행할 수 있습니다.

시작하려면 [Custom WAF Rule 페이지][2]로 이동하여 {{< ui >}}Create New Rule{{< /ui >}}을 클릭하세요.

{{< img src="security/application_security/threats/custom-waf-rule-menu.png" alt="AAP 홈페이지에서 Protection, In-App WAF, Custom Rules를 차례로 클릭하면 Custom WAF Rule 메뉴에 접근할 수 있습니다." style="width:100%;" >}}

이 메뉴에서 사용자 지정 WAF 규칙을 정의할 수 있습니다. {{< ui >}}Business Logic{{< /ui >}} 카테고리를 선택하면 이벤트 유형(예: `users.password_reset`)을 구성할 수 있습니다. 그런 다음 추적하려는 서비스와 특정 엔드포인트를 선택할 수 있습니다. 규칙 조건을 사용하여 특정 파라미터를 대상으로 지정하고 _계측_하려는 코드 흐름을 식별할 수도 있습니다. 조건이 일치하면 라이브러리가 트레이스에 태그를 추가하고 AAP로 전달되도록 플래그를 지정합니다. 조건이 필요하지 않은 경우, 모든 요청과 일치하도록 광범위한 조건을 설정할 수 있습니다.

{{< img src="security/application_security/threats/custom-waf-rule-form.png" alt="Create New Rule 버튼을 클릭할 때 나타나는 양식의 스크린샷" style="width:50%;" >}}

저장된 규칙은 Remote Configuration이 활성화된 서비스 인스턴스에 배포됩니다.


[1]: /ko/tracing/guide/remote_config
[2]: https://app.datadoghq.com/security/appsec/in-app-waf?config_by=custom-rules

## 자동 사용자 활동 이벤트 추적 {#automatic-user-activity-event-tracking}

AAP가 활성화되면 Datadog SDK는 사용자 활동 이벤트를 자동으로 탐지하려고 시도합니다.

자동으로 탐지할 수 있는 이벤트는 다음과 같습니다.

- `users.login.success`
- `users.login.failure`
- `users.signup`

### 자동 사용자 활동 이벤트 추적 모드 {#automatic-user-activity-event-tracking-modes}

자동 사용자 활동 추적은 다음과 같은 모드를 제공합니다.

- `identification` 모드(약칭: `ident`):
  - 이 모드는 기본 모드이며, 사용자 ID를 항상 수집하거나 가능한 범위 내에서 최대한 수집합니다.
  - 로그인 성공 및 실패 시 사용자 ID를 수집합니다. 실패 이벤트에서는 사용자의 존재 여부와 관계없이 사용자 ID를 수집합니다.
  - 계측된 프레임워크가 사용자 ID를 명확하게 제공하지 않고 구조화된 사용자 객체를 제공하는 경우, 객체 필드 이름을 기반으로 가능한 한 사용자 ID를 결정합니다. 다음은 우선 순위에 따라 고려되는 필드 목록입니다.
    - `id`
    - `email`
    - `username`
    - `login`
    - `user`
  - 사용자 ID를 사용할 수 없거나 찾을 수 없는 경우 사용자 이벤트가 생성되지 않습니다.
- `anonymization` 모드(약칭: `anon`):
  - 이 모드는 `identification`과 동일하지만 사용자 ID를 해싱(SHA256)하고 해시 결과를 잘라 익명화합니다.
- `disabled` 모드:
  - AAP 라이브러리는 자동화된 계측을 통해 사용자 ID를 수집하지 *않습니다*.
  - 사용자 로그인 이벤트는 생성되지 않습니다.

<div class="alert alert-info">모든 모드는 자동 계측에만 영향을 미치며, 수동 수집에는 적용되지 않습니다. 수동 수집은 SDK를 사용하여 구성하며, 자동 계측에 의해 설정이 재정의되지 않습니다.</div>

### 수동 구성 {#manual-configuration}

Datadog 라이브러리를 사용하면 `DD_APPSEC_AUTO_USER_INSTRUMENTATION_MODE` 환경 변수에 모드의 약칭을 사용하여 자동 계측을 구성할 수 있습니다(`ident`|`anon`|`disabled`).

기본 모드는 `identification` 모드(약칭: `ident`)입니다.

예를 들어, `DD_APPSEC_AUTO_USER_INSTRUMENTATION_MODE=anon`입니다.

### 지원이 중단된 모드 {#deprecated-modes}

<div class="alert alert-info">이전 모드는 지원이 중단되었지만 다음 주요 릴리스까지 호환성이 유지됩니다.</div>

다음 모드는 지원이 중단되었습니다.

- `safe` 모드: 트레이스 라이브러리는 이벤트 메타데이터에 PII 정보를 포함하지 않습니다. 트레이서는 사용자 ID를 수집하려고 시도하며, 사용자 ID가 유효한 [GUID][11]인 경우에만 수집합니다.
- `extended` 모드: 트레이스 라이브러리는 사용자 ID와 사용자 이메일 수집을 시도합니다. 이 모드에서 Datadog은 사용자 ID의 유형이 GUID인지 확인하지 않습니다. 트레이스 라이브러리는 이벤트에서 추출 가능한 모든 값을 보고합니다.

**참고**: 경우에 따라 트레이스 라이브러리가 사용자 이벤트에서 정보를 추출하지 못할 수 있습니다. 이벤트는 빈 메타데이터로 보고됩니다. 이러한 경우에는 [SDK](#adding-business-logic-information-login-success-login-failure-any-business-logic-to-traces)를 사용하여 사용자 이벤트를 수동으로 계측하세요.

## 사용자 활동 이벤트 추적 비활성화 {#disabling-user-activity-event-tracking}

[AAP Catalog][14]를 통해 자동 사용자 활동 탐지를 비활성화하려면, 비활성화할 서비스에서 자동 추적 모드 환경 변수 `DD_APPSEC_AUTO_USER_INSTRUMENTATION_MODE`를 `disabled`로 변경하세요. 모든 모드는 자동 계측에만 영향을 미치며, [Remote Configuration][15]이 활성화되어 있어야 합니다.

수동 구성의 경우 서비스에서 환경 변수 `DD_APPSEC_AUTOMATED_USER_EVENTS_TRACKING_ENABLED`를 `false`로 설정하고 서비스를 다시 시작할 수 있습니다. 이 설정은 Datadog SDK가 호스팅되는 애플리케이션에 적용해야 하며, Datadog Agent에는 적용하지 않습니다.

[3]: /ko/tracing/trace_collection/custom_instrumentation/
[4]: /ko/security/default_rules/bl-rate-limiting/
[5]: /ko/security/default_rules/bl-privilege-violation-user/
[6]: /ko/security/default_rules/appsec-ato-groupby-ip/
[7]: /ko/security/default_rules/bl-signup-ratelimit/
[8]: /ko/security/default_rules/bl-account-deletion-ratelimit/
[9]: /ko/security/default_rules/bl-password-reset/
[10]: /ko/security/default_rules/bl-payment-failures/
[11]: https://guid.one/guid
[12]: /ko/security/default_rules/appsec-ato-bf/
[13]: /ko/security/default_rules/distributed-ato-ua-asn/
[14]: https://app.datadoghq.com/security/appsec/inventory/services?tab=capabilities
[15]: /ko/tracing/guide/remote_config

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}