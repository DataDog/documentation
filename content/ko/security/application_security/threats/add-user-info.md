---
aliases:
- /ko/security_platform/application_security/add-user-info
- /ko/security/application_security/add-user-info
further_reading:
- link: /security/application_security/
  tag: 설명서
  text: Datadog App과 API Protection을 사용하여 위협으로부터 보호
- link: /security/application_security/threats/library_configuration/
  tag: 설명서
  text: 기타 고려 사항 및 구성 옵션
title: 사용자 모니터링 및 보호
---

## 개요

서비스를 계측하고 사용자 활동을 추적하여 악성 행위자를 탐지하고 차단하세요.

[트레이스에 인증된 사용자 정보를 추가](#adding-authenticated-user-information-to-traces-and-enabling-user-blocking-capability)하여 인증된 공격 영역을 노리는 악성 공격자를 식별하고 차단합니다. 이를 위해 실행 중인 APM 트레이스에 사용자 ID 태그를 설정하여 AAP가 인증된 공격자를 차단하는 데 필요한 도구를 제공해야 합니다. 이렇게 하면 AAP는 공격 및 비즈니스 로직 이벤트를 사용자와 연결할 수 있습니다.

기본 제공 탐지 규칙을 활용해 [사용자의 로그인 및 활동을 추적](#adding-business-logic-information-login-success-login-failure-any-business-logic-to-traces)함으로써, 계정 탈취나 비즈니스 로직 악용을 탐지하고 궁극적으로 공격자를 차단할 수 있습니다.

기본 탐지 규칙을 적용한 사용자 맞춤 활동은 다음과 같습니다.

| 기본 제공 이벤트 이름   | 필수 메타데이터                                    | 관련 규칙                                                                                                                                                                                                       |
|------------------------|------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `activity.sensitive`   | `{ "name": "coupon_use", "required_role": "user" }`  | [IP 기반 속도 제한이 적용된 활동][4]<br>[승인되지 않은 활동 감지][5] |
| `users.login.success`  | 사용자 ID는 필수이며, 필요시 메타데이터를 추가할 수 있음 | [크리덴셜 스터핑 공격[6]<br>[무차별 대입 공격][12]<br>[분산형 크리덴셜 스터핑 공격][13]               |
| `users.login.failure`  | 사용자 ID와 `usr.exists`는 필수이며, 필요시 메타데이터를 추가할 수 있음 | [크리덴셜 스터핑 공격[6]<br>[무차별 대입 공격][12]<br>[분산형 크리덴셜 스터핑 공격][13]  |
| `users.signup`         | `{ "usr.id": "12345" }`                              | [IP에서 과도한 계정 생성][7]                                                                                                    |
| `users.delete`         | `{ "usr.id": "12345" }`                              | [IP에서 과도한 계정 삭제][8]                                                                                           |
| `users.password_reset` | `{ "usr.id": "12345", "usr.login": "user@email.com", "exists": true }` | [암호 재설정 무차별 대입 시도][9]                                                                                                         |
| `payment.failure`      | 없음                                                 | [IP에서 과도한 결제 실패][10]                                                                                                        |

## 인증된 사용자 정보를 추적에 추가하고 사용자 차단 기능 활성화

<div class="alert alert-info">
<strong>사용자 활동 자동 감지:</strong> Datadog Tracing Libraries는 사용자 활동 이벤트를 자동으로 감지하고 보고합니다. 자세한 내용은 <a href="/security/application_security/how-it-works/add-user-info/?tab=set_user#disabling-automatic-user-activity-event-tracking">자동 사용자 활동 이벤트 추적 비활성화</a>를 참고하세요.
</div>

[루트 스팬에 사용자 정의 태그를 추가][3]하거나 아래 설명된 계측 기능을 사용할 수 있습니다.

{{< programming-lang-wrapper langs="java,dotnet,go,ruby,php,nodejs,python" >}}

{{< programming-lang lang="java" >}}

Java 트레이서 API를 사용하여 루트 스팬에 사용자 정의 태그와 사용자 정보를 추가하면 애플리케이션에서 인증된 요청을 모니터링할 수 있습니다.

사용자 모니터링 태그는 루트 스팬에 적용되며 `usr` 접두사로 시작하고 그 뒤에 필드 이름이 옵니다. 예를 들어, `usr.name`는 사용자 이름을 추적하는 사용자 모니터링 태그입니다.

**참고**: [애플리케이션에 필요한 종속성][1]이 추가되었는지 확인하세요.

아래 예에서는 루트 스팬을 얻고, 관련 사용자 모니터링 태그를 추가하고, 사용자 차단 기능을 활성화하는 방법을 보여줍니다.

```java
import io.opentracing.Span;
import io.opentracing.util.GlobalTracer;
import datadog.appsec.api.blocking.Blocking;
import datadog.trace.api.interceptor.MutableSpan;

// 활성화된 스팬 가져오기
final Span span = GlobalTracer.get().activeSpan();
if ((span instanceof MutableSpan)) {
   MutableSpan localRootSpan = ((MutableSpan) span).getLocalRootSpan();
   // 필수 사용자 ID 태그 설정
   localRootSpan.setTag("usr.id", "d131dd02c56eec4");
   // 선택적 사용자 모니터링 태그 설정
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

.NET 트레이서 패키지는 `SetUser()` 함수를 제공하여 사용자 정보를 트레이스에 추가하고 인증된 요청을 모니터링할 수 있는 기능을 제공합니다.

아래 예에서는 관련 사용자 모니터링 태그를 추가하고 사용자 차단 기능을 활성화하는 방법을 보여줍니다.

```csharp

using Datadog.Trace;

// ...

    var userDetails = new UserDetails()
    {
        // 사용자를 위한 시스템 내부 식별자
        Id = "d41452f2-483d-4082-8728-171a3570e930",
        // 사용자 이메일 주소
        Email = "test@adventure-works.com",
        // 시스템에 표시되는 사용자 이름
        Name = "Jane Doh",
        // 사용자의 세션 ID
        SessionId = "d0632156-132b-4baa-95b2-a492c5f9cb16",
        // 사용자가 요청하는 역할
        Role = "standard",
    };
    Tracer.Instance.ActiveScope?.Span.SetUser(userDetails);
```

자세한 내용과 옵션은 [.NET 트레이서 문서][1]를 참고하세요.

[1]: https://github.com/DataDog/dd-trace-dotnet/tree/master/docs/Datadog.Trace#user-identification

{{< /programming-lang >}}

{{< programming-lang lang="go" >}}

Go 트레이서 패키지는 트레이스에 사용자 정보를 추가하여 인증된 요청을 모니터링할 수 있는 `SetUser()` 함수를 제공합니다. 더 많은 옵션은 [Go 트레이서 문서][1](또는 [v2 문서][2])를 참고하세요.

이 예제에서는 현재 트레이서 스팬을 검색하고 이를 사용하여 사용자 모니터링 태그를 설정하며, 사용자 차단 기능을 활성화하는 방법을 보여줍니다.

```go
import (
  "gopkg.in/DataDog/dd-trace-go.v1/appsec" // 1.x
  // "github.com/DataDog/dd-trace-go/v2/appsec // 2.x
)

func handler(w http.ResponseWriter, r *http.Request) {
  if appsec.SetUser(r.Context(), "my-uid") != nil {
    // 요청 핸들러를 최대한 빨리 중단하여 사용자를 차단해야 합니다.
    // 차단 응답은 AppSec 미들웨어에 의해 자동으로 처리되어 전송됩니다.
    return
  }
}
```

[1]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer#SetUser
[2]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/v2/ddtrace/tracer#SetUser
{{< /programming-lang >}}

{{< programming-lang lang="ruby" >}}

다음 API 중 하나를 사용하여 트레이스에 사용자 정보를 추가하면 애플리케이션에서 인증된 요청을 모니터링할 수 있습니다.

{{% collapse-content title="set_user" level="h4" expanded="true" %}}

`ddtrace` 1.1.0 버전부터 `Datadog::Kit::Identity.set_user` 메서드를 사용할 수 있습니다. 트레이스에 사용자 정보를 추가하려면 다음 API를 사용하는 것이 좋습니다.

```ruby
# 활성화된 트레이스 가져오기
trace = Datadog::Tracing.active_trace

# 필수 사용자 ID 태그 설정
Datadog::Kit::Identity.set_user(trace, id: 'd131dd02c56eeec4')

# 또는 선택적 사용자 모니터링 태그 설정
Datadog::Kit::Identity.set_user(
  trace,

  # 필수 ID
  id: 'd131dd02c56eeec4',

  # 의미가 정해진 선택적 태그들
  name: 'Jean Example',
  email:, 'jean.example@example.com',
  session_id:, '987654321',
  role: 'admin',
  scope: 'read:message, write:files',

  # 선택적인 자유 형식 태그
  another_tag: 'another_value',
)
```
{{% /collapse-content %}}

{{% collapse-content title="set_tag" level="h4" expanded="false" id="ruby-set-tag" %}}

`Datadog::Kit::Identity.set_user`로 충분하지 않으면 `set_tag`를 대신 사용할 수 있습니다.

사용자 모니터링 태그는 트레이스에 적용되며 접두사 `usr.`로 시작하고 그 뒤에 필드 이름이 옵니다. 예를 들어, `usr.name`는 사용자 이름을 추적하는 사용자 모니터링 태그입니다.

아래 예에서는 활성화된 트레이스를 얻고 관련 사용자 모니터링 태그를 추가하는 방법을 보여줍니다.

**참고**:
- 태그 값은 문자열이어야 합니다.
- `usr.id` 태그는 필수입니다.

```ruby
# 활성 추적 가져오기
trace = Datadog::Tracing.active_trace

# 필수 사용자 ID 태그 설정
trace.set_tag('usr.id', 'd131dd02c56eeec4')

# 의미가 정해진 선택적 사용자 모니터링 태그 설정
trace.set_tag('usr.name', 'Jean Example')
trace.set_tag('usr.email', 'jean.example@example.com')
trace.set_tag('usr.session_id', '987654321')
trace.set_tag('usr.role', 'admin')
trace.set_tag('usr.scope', 'read:message, write:files')

# 자유 형식 태그 설정
trace.set_tag('usr.another_tag', 'another_value')
```
{{% /collapse-content %}}

{{< /programming-lang >}}

{{< programming-lang lang="php" >}}

PHP 트레이서는 인증된 요청을 모니터링하고 차단할 수 있는 `\DDTrace\set_user()` 함수를 제공합니다.

`\DDTrace\set_user()`는 트레이스에 관련 사용자 태그와 메타데이터를 추가하고 자동으로 사용자를 차단합니다.

다음 예제에서는 사용자 모니터링 태그를 설정하고 사용자 차단을 활성화하는 방법을 보여줍니다.

```php
<?php
// 차단은 set_user 호출을 통해 내부적으로 수행됩니다.
\DDTrace\set_user(
    // 사용자의 고유 식별자가 필요합니다.
    '123456789',

    // 다른 모든 필드는 선택 사항입니다.
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

아래 예에서는 관련 사용자 모니터링 태그를 추가하고 사용자 차단 기능을 활성화하는 방법을 보여줍니다.

```javascript
const tracer = require('dd-trace').init()

function handle () {
  tracer.setUser({
    id: '123456789', // *필수* 사용자 고유 식별자.

    // 다른 모든 필드는 선택 사항입니다.
    email: 'jane.doe@example.com', // 사용자 이메일 주소
    name: 'Jane Doe', // 사용자 이름
    session_id: '987654321', // 사용자 세션 ID
    role: 'admin', // 사용자가 요청하는 역할
    scope: 'read:message, write:files', // 사용자가 현재 소유하고 있는 범위 또는 부여된 권한

    // 커스텀 데이터를 추가하기 위한 임의의 필드도 허용됩니다(RBAC, Oauth 등).
    custom_tag: 'custom data'
  })

// 현재 인증된 사용자를 설정하고 차단 여부를 확인하세요.
if (tracer.appsec.isUserBlocked(user)) {  // 현재 인증된 사용자도 설정합니다.
  return tracer.appsec.blockRequest(req, res) // 차단 응답이 전송되었습니다.
  }

}
```

자세한 내용과 옵션은 [Node.js 트레이서 문서][1]를 참고하세요.



[1]: https://datadoghq.dev/dd-trace-js/#set-user
{{< /programming-lang >}}

{{< programming-lang lang="python" >}}

Python 트레이서 패키지가 제공하는 `set_user` 함수를 사용하여 트레이스에 사용자 정보를 추가하고 인증된 요청을 모니터링합니다.

이 예제에서는 사용자 모니터링 태그를 설정하고 사용자 차단 기능을 활성화하는 방법을 보여줍니다.

```python
from ddtrace.contrib.trace_utils import set_user
from ddtrace import tracer
# 현재 인증된 사용자 ID를 추적하려면 set_user()를 호출합니다.
user_id = "some_user_id"
set_user(tracer, user_id, name="John", email="test@test.com", scope="some_scope",
         role="manager", session_id="session_id", propagate=True)
```

{{< /programming-lang >}}

{{< /programming-lang-wrapper >}}

## 트레이스에 비즈니스 로직 정보(로그인 성공, 로그인 실패, 모든 비즈니스 로직) 추가

<div class="alert alert-info">
<strong>usr.id 및 usr.login에 대한 참고 사항:</strong> 로그인 악용 조사는 비슷하지만 서로 다른 두 가지 개념에 기반합니다. usr.id는 데이터베이스에 저장된 사용자 계정의 고유 식별자를 포함합니다. 이 값은 고유하며 변경되지 않습니다. 존재하지 않는 계정에 로그인을 시도할 경우 usr.id를 얻을 수 없습니다. 사용자 차단은 usr.id를 대상으로 수행됩니다.</br>

사용자는 일반적으로 자신의 사용자 ID를 알지 못합니다. 대신 변경 가능한 식별자(전화번호, 사용자 이름, 이메일 주소 등)를 사용합니다. 사용자가 계정에 로그인하는 데 사용하는 문자열은 로그인 이벤트에서 usr.login으로 보고되어야 합니다.</br>
usr.login를 제공하지 않으면 usr.id가 대신 사용됩니다.</a>
</div>

{{< programming-lang-wrapper langs="java,dotnet,go,ruby,php,nodejs,python" >}}
{{< programming-lang lang="java" >}}

dd-trace-java v1.8.0부터 Java 트레이서 API를 사용하여 사용자 이벤트를 추적할 수 있습니다.

다음 예제는 로그인 이벤트나 사용자 정의 이벤트(가입을 예로 들어)를 추적하는 방법을 보여줍니다.

{{% collapse-content title="로그인 성공" level="h4" expanded="true" %}}
```java
import datadog.trace.api.EventTracker;
import datadog.trace.api.GlobalTracer;

public class LoginController {

    private User doLogin(String userName, String password) {
        // 여기서 userName과 password 크리덴셜을 기반으로 사용자를 가져옵니다.
        User user = checkLogin(userName, password);

        Map<String, String> metadata = new HashMap<>();
        metadata.put("email", user.getEmail());
        metadata.put("usr.login", userName);

        // 시스템에 여러 "테넌트"가 있는 경우 해당 테넌트를 입력해 주세요. 테넌트는 사용자 환경/그룹입니다
        metadata.put("usr.org", usr.getTenant());

        // 사용자 인증 성공 이벤트를 추적합니다.
        GlobalTracer
            .getEventTracker()
            .trackLoginSuccessEvent(user.getId(), metadata);

    }
}

```
{{% /collapse-content %}}

{{% collapse-content title="로그인 실패" level="h4" expanded="false" id="java-login-failure" %}}
```java
import datadog.trace.api.EventTracker;
import datadog.trace.api.GlobalTracer;

public class LoginController {

    private User doLogin(String userName, String password) {
        // 여기서 userName/password 크리덴셜을 기반으로 사용자를 가져옵니다
        User user = checkLogin(userName, password);

        // 함수가 null을 반환하는 경우 - 사용자가 존재하지 않습니다
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

        // 사용자 인증 오류 이벤트를 추적합니다
        GlobalTracer
            .getEventTracker()
            .trackLoginFailureEvent(userId, userExists, metadata);
    }
}
```
{{% /collapse-content %}}

{{% collapse-content title="사용자 정의 비즈니스 로직" level="h4" expanded="false" id="java-custom-business" %}}
```java
import datadog.trace.api.EventTracker;
import datadog.trace.api.GlobalTracer;

public class LoginController {

    private User doSignup(String userId, String email) {
        // 여기서 사용자 계정을 생성합니다
        User user = createUser(userId, email);

        Map<String, String> metadata = new HashMap<>();
        metadata.put("usr.id", user.getId());

        // 사용자 가입 이벤트를 추적합니다
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

다음 예제는 로그인 이벤트나 사용자 정의 이벤트(가입을 예로 들어)를 추적하는 방법을 보여줍니다.

{{% collapse-content title="로그인 성공" level="h4" expanded="true" %}}
```csharp
using Datadog.Trace.AppSec;

void OnLogonSuccess(string userId, string login...)
{
    // 메타데이터는 선택사항입니다.
    var metadata = new Dictionary<string, string>()
    {
        { "usr.login", login }
    };
    EventTrackingSdk.TrackUserLoginSuccessEvent(userId, metadata);

    // ...
}

```
{{% /collapse-content %}}
{{% collapse-content title="로그인 실패" level="h4" expanded="false" id="dotnet-login-failure" %}}
```csharp
using Datadog.Trace.AppSec;

void OnLogonFailure(string userId, string login, bool userExists, ...)
{
    // 사용자 ID를 제공할 수 없는 경우 고유한 사용자 식별자(사용자 이름, 이메일 등)를 사용할 수 있습니다
    // 메타데이터는 선택사항입니다
    var metadata = new Dictionary<string, string>()
    {
        { "usr.login", login }
    };
    EventTrackingSdk.TrackUserLoginFailureEvent(userId, userExists, metadata);

    // ...
}
```
{{% /collapse-content %}}

{{% collapse-content title="사용자 정의 비즈니스 로직" level="h4" expanded="false" id="dotnet-custom-business" %}}
```csharp
void OnUserSignupComplete(string userId, ...)
{
    // 메타데이터 파라미터는 선택 사항이지만 "usr.id"를 추가합니다
    var metadata = new Dictionary<string, string>()
    {
        { "usr.id", userId }
    };
    // 사용자 가입을 추적하기 위해 사용자 정의 비즈니스 로직 추적을 활용합니다
    EventTrackingSdk.TrackCustomEvent("users.signup", metadata);

    // ...
}
```
{{% /collapse-content %}}

{{< /programming-lang >}}
{{< programming-lang lang="go" >}}

dd-trace-go v1.47.0부터 Go 트레이서 API를 사용하여 사용자 이벤트를 추적할 수 있습니다.

다음 예제는 로그인 이벤트나 사용자 정의 이벤트(가입을 예로 들어)를 추적하는 방법을 보여줍니다.

{{% collapse-content title="로그인 성공" level="h4" expanded="true" %}}
```go
import (
  "gopkg.in/DataDog/dd-trace-go.v1/appsec" // 1.x
  // "github.com/DataDog/dd-trace-go/v2/appsec" // 2.x
)

func handler(w http.ResponseWriter, r *http.Request) {
  metadata := make(map[string]string) /* 선택적 추가 이벤트 메타데이터*/
  userdata := /* 선택적 추가 사용자 데이터 */

  metadata["usr.login"] = "user-email"

  // 로그인 성공 여부를 추적하고 `my-uid`를 사용자의 고유 식별자(숫자, 사용자 이름, 이메일 등)로 바꿉니다
  if appsec.TrackUserLoginSuccessEvent(r.Context(), "my-uid", metadata, userdata) != nil {
    // 해당 사용자 ID가 차단되었으며 핸들러는 최대한 빨리 중단되어야 합니다
    // 차단 응답은 AppSec 미들웨어에 의해 전송됩니다
    return
  }
}
```
{{% /collapse-content %}}
{{% collapse-content title="로그인 실패" level="h4" expanded="false" id="go-login-failure" %}}
```go
import (
  "gopkg.in/DataDog/dd-trace-go.v1/appsec" // 1.x
  // "github.com/DataDog/dd-trace-go/v2/appsec" // 2.x
)

func handler(w http.ResponseWriter, r *http.Request) {
  exists := /* 주어진 사용자 ID가 존재하는지 여부 */
  metadata := make(map[string]string) /* 선택적 추가 이벤트 메타데이터 */
  metadata["usr.login"] = "user-email"

  // `my-uid`를 사용자의 고유 식별자(숫자, 사용자 이름, 이메일...)로 바꿉니다
  appsec.TrackUserLoginFailureEvent(r.Context(), "my-uid", exists, metadata)
}
```
{{% /collapse-content %}}

{{% collapse-content title="사용자 정의 비즈니스 로직" level="h4" expanded="false" id="go-custom-business" %}}
```go
import (
  "gopkg.in/DataDog/dd-trace-go.v1/appsec" // 1.x
  // "github.com/DataDog/dd-trace-go/v2/appsec" // 2.x
)

func handler(w http.ResponseWriter, r *http.Request) {
  metadata := map[string]string{"usr.id": "my-uid"}

  // 사용자 가입을 추적하기 위해 사용자 정의 비즈니스 로직 추적을 활용합니다
  appsec.TrackCustomEvent(r.Context(), "users.signup", metadata)
}
```
{{% /collapse-content %}}

{{< /programming-lang >}}
{{< programming-lang lang="ruby" >}}

dd-trace-rb v1.9.0부터 Ruby 트레이서 API를 사용하여 사용자 이벤트를 추적할 수 있습니다.

다음 예제는 로그인 이벤트나 사용자 정의 이벤트(가입을 예로 들어)를 추적하는 방법을 보여줍니다.

로그인 성공/실패 이벤트가 포함된 트레이스는 `@appsec.security_activity:business_logic.users.login.success` 또는 `@appsec.security_activity:business_logic.users.login.failure` 쿼리를 사용하여 조회할 수 있습니다.

{{% collapse-content title="Login success" level="h4" expanded="true" %}}
```ruby
require 'datadog/kit/appsec/events'

trace = Datadog::Tracing.active_trace
# `my_user_id`를 사용자의 고유 식별자(숫자, 사용자 이름, 이메일...)로 바꾸세요
Datadog::Kit::AppSec::Events.track_login_success(trace, user: { id: 'my_user_id' }, { 'usr.login': 'my_user_email' })
```
{{% /collapse-content %}}

{{% collapse-content title="로그인 실패" level="h4" expanded="false" id="ruby-login-failure" %}}
```ruby
require 'datadog/kit/appsec/events'
trace = Datadog::Tracing.active_trace

# `my_user_id`를 사용자의 고유 식별자(숫자, 사용자 이름, 이메일...)로 바꾸세요

# 사용자가 존재하는 경우
Datadog::Kit::AppSec::Events.track_login_failure(trace, user_id: 'my_user_id', user_exists: true, { 'usr.login': 'my_user_email' })

# 사용자가 존재하지 않는 경우
Datadog::Kit::AppSec::Events.track_login_failure(trace, user_id: 'my_user_id', user_exists: false, { 'usr.login': 'my_user_email' })
```
{{% /collapse-content %}}

{{% collapse-content title="사용자 정의 비즈니스 로직" level="h4" expanded="false" id="ruby-custom-business" %}}
```ruby
require 'datadog/kit/appsec/events'
trace = Datadog::Tracing.active_trace

# `my_user_id`를 사용자의 고유 식별자(숫자, 사용자 이름, 이메일...)로 바꾸세요

# 사용자 가입을 추적하기 위해 사용자 정의 비즈니스 로직 추적을 활용합니다
Datadog::Kit::AppSec::Events.track('users.signup', trace, nil, { 'usr.id': 'my_user_id'})
```
{{% /collapse-content %}}

{{< /programming-lang >}}

{{< programming-lang lang="php" >}}
dd-trace-php v0.84.0부터 PHP 트레이서 API를 사용하여 사용자 이벤트를 추적할 수 있습니다.

다음 예제는 로그인 이벤트나 사용자 정의 이벤트(가입을 예로 들어)를 추적하는 방법을 보여줍니다.

{{% collapse-content title="Login success" level="h4" expanded="true" %}}
```php
<?php
\datadog\appsec\track_user_login_success_event($id, ['usr.login' => $email])
?>
```
{{% /collapse-content %}}

{{% collapse-content title="로그인 실패" level="h4" expanded="false" id="php-login-failure" %}}
```php
<?php
// 숫자로 된 사용자 ID가 없는 경우 대신 고유한 문자열(사용자 이름, 이메일 등)을 사용자 ID로 사용할 수 있습니다
// 값이 공격자나 IP가 아닌, 각 사용자마다 고유하도록 설정해야 합니다
\datadog\appsec\track_user_login_failure_event($id, $exists, ['usr.login' => $email])
?>
```
{{% /collapse-content %}}

{{% collapse-content title="사용자 정의 비즈니스 로직" level="h4" expanded="false" id="php-custom-business" %}}
```php
<?php
\datadog\appsec\track_custom_event('users.signup', ['usr.id' => $id]);
?>
```
{{% /collapse-content %}}

{{< /programming-lang >}}

{{< programming-lang lang="nodejs" >}}

dd-trace-js v3.13.1부터 Node.js 트레이서 API를 사용하여 사용자 이벤트를 추적할 수 있습니다. dd-trace-js v5.48.0 버전에서는 `eventTrackingV2` 네임스페이스에 새로운 메서드가 추가되었습니다. 기존 이벤트 추적 메서드는 호환성을 위해 그대로 유지됩니다.


다음 예제는 로그인 이벤트나 사용자 정의 이벤트(가입을 예로 들어)를 추적하는 방법을 보여줍니다.

{{% collapse-content title="Login success" level="h4" expanded="true" %}}
```javascript
const tracer = require('dd-trace')

// 컨트롤러에서:
const user = {
id: 'user-id', // ID는 필수입니다. ID가 없는 경우, 사용자 이름, 이메일 등 어떤 고유 식별자라도 사용 가능합니다.
  email: 'user@email.com' // 다른 필드는 선택사항입니다
}
const user = 'user-id' // 사용자를 ID 로만 나타낼 수도 있습니다
const login = 'user@email.com'
const metadata = { 'key': 'value' } // 임의의 필드를 추가할 수 있습니다

// 성공적인 사용자 인증 이벤트를 기록합니다
// 사용자 및 메타데이터는 선택 사항입니다
tracer.appsec.eventTrackingV2.trackUserLoginSuccess(login, user, metadata)
```
{{% /collapse-content %}}

{{% collapse-content title="로그인 실패" level="h4" expanded="false" id="nodejs-login-failure" %}}
```javascript
const tracer = require('dd-trace')

// 컨트롤러에서:
const login = 'user-id' // 사용자가 로그인하는 데 사용하는 문자열
const userExists = true // 예를 들어 사용자 로그인이 데이터베이스에 있는 경우
const metadata = { 'key': 'value' } // 임의의 필드를 추가할 수 있습니다

// 실패한 사용자 인증 이벤트를 기록합니다
// userExists는 선택 사항이며, 기본값은 false입니다
// 메타데이터는 선택 사항입니다.
tracer.appsec.eventTrackingV2.trackUserLoginFailure(login, userExists, metadata)
```
{{% /collapse-content %}}

{{% collapse-content title="사용자 정의 비즈니스 로직" level="h4" expanded="false" id="nodejs-custom-business" %}}
```javascript
const tracer = require('dd-trace')

// 컨트롤러에서:
const eventName = 'users.signup'
const metadata = { 'usr.id': 'user-id' }

tracer.appsec.trackCustomEvent(eventName, metadata)
```
{{% /collapse-content %}}

#### 새로운 로그인 성공 및 실패 메서드로 마이그레이션

`eventTrackingV2`에 새롭게 도입된 메서드는 더욱 직관적인 파라미터 순서와 더욱 명확한 책임 분리를 제공합니다. 주요 변경 사항은 다음과 같습니다.

1. 로그인 식별자(이메일, 사용자 이름)는 첫 번째 파라미터이며 필수입니다.
2. 성공 이벤트에서는 사용자 개체/ID가 선택 사항이며 실패 이벤트에서는 제거되었습니다.
3. 메타데이터가 간소화되어 더 이상 `usr.login` 필드가 필요하지 않습니다.

**참고**: 기존 메서드인 `trackUserLoginSuccessEvent` 및 `trackUserLoginFailureEvent`는  더 이상 사용되지 않으며, 새로운 메서드인`eventTrackingV2.trackUserLoginSuccess` 및 `eventTrackingV2.trackUserLoginFailure`가 사용됩니다.

다음 예에서는 주석이 달린 코드가 더 이상 필요하지 않습니다.

{{% collapse-content title="Login success" level="h4" expanded="true" %}}
```javascript
const tracer = require('dd-trace')

// 컨트롤러에서:
const user = {
  id: 'user-id',
  email: 'user@email.com'
} // 이전과 동일하지만 이제 객체는 선택 사항입니다. 그래도 사용자 ID를 제공하면 침해 이후 활동 연관성 파악에 도움이 됩니다

const login = 'user@email.com' // 새로운 필수 인수

const metadata = {
//  'usr.login': 'user@email.com', 더 이상 메타데이터에 포함할 필요가 없습니다. 반드시 메인 인수로 전달되어야 합니다
  'key': 'value'
}

// tracer.appsec.trackUserLoginSuccessEvent(user, metadata) // 더 이상 사용되지 않음
tracer.appsec.eventTrackingV2.trackUserLoginSuccess(login, user, metadata)
```
{{% /collapse-content %}}

{{% collapse-content title="로그인 실패" level="h4" expanded="false" id="nodejs-migration-login-failure" %}}
```javascript
const tracer = require('dd-trace')

// 더 이상 사용되지 않는 메서드가 있는 컨트롤러에서:
const userId = 'user-id' // 더 이상 필수는 아니지만 사용 가능한 경우 도움이 됩니다.
const login = 'user@email.com' // 새로운 필수 인수
const userExists = true
const metadata = {
//  'usr.login': 'user@email.com', 더 이상 메타데이터에 포함할 필요가 없습니다. 반드시 메인 인수로 전달되어야 합니다
  'usr.id': userId, // 로그인 실패를 나머지 사용자 활동과 연관시키는 데 도움이 됩니다.
  'key': 'value'
}

// tracer.appsec.trackUserLoginFailureEvent(userId, userExists, metadata) // 더 이상 사용되지 않음
tracer.appsec.eventTrackingV2.trackUserLoginFailure(login, userExists, metadata)
```
{{% /collapse-content %}}

{{< /programming-lang >}}

{{< programming-lang lang="python" >}}

dd-trace-py v1.9.0부터 Python 트레이서 API를 사용하여 사용자 이벤트를 추적할 수 있습니다.

다음 예제는 로그인 이벤트나 사용자 정의 이벤트(가입을 예로 들어)를 추적하는 방법을 보여줍니다.

{{% collapse-content title="Login success" level="h4" expanded="true" %}}
```python
from ddtrace.appsec.trace_utils import track_user_login_success_event
from ddtrace import tracer
metadata = {"usr.login": "user@email.com"}
# name, email, scope, role, session_id, propagate는 선택 인수이며 
# 기본값은 None입니다(단, propagate 기본값은 True).
# 이 인수들은 set_user() 함수에 전달됩니다.
track_user_login_success_event(tracer, "userid", metadata)
```
{{% /collapse-content %}}

{{% collapse-content title="로그인 실패" level="h4" expanded="false" id="python-login-failure" %}}
```python
from ddtrace.appsec.trace_utils import track_user_login_failure_event
from ddtrace import tracer
metadata = {"usr.login": "user@email.com"}
# exists는 실패한 로그인 사용자가 시스템에 존재하는지 여부를 나타냅니다.
exists = False
# 숫자로 된 사용자 ID를 사용할 수 없는 경우, 고유 식별자(사용자 이름, 이메일 등)를 사용하면 됩니다
track_user_login_failure_event(tracer, "userid", exists, metadata)
```
{{% /collapse-content %}}

{{% collapse-content title="사용자 정의 비즈니스 로직" level="h4" expanded="false" id="python-custom-business" %}}
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

### 코드를 수정하지 않고 비즈니스 로직 정보 추적

서비스에 AAP와 [Remote Configuration][1]이 활성화되어 있는 경우, 사용자 지정 WAF 규칙을 생성하여 일치하는 모든 요청에 ​​사용자 지정 비즈니스 로직 태그를 지정할 수 있습니다. 이 작업은 애플리케이션을 수정할 필요 없이 Datadog에서 모두 수행할 수 있습니다.

시작하려면 [Custom WAF Rule 페이지][2]로 이동하여 "Create New Rule"을 클릭하세요.

{{< img src="security/application_security/threats/custom-waf-rule-menu.png" alt="AAP 홈페이지에서 Protection을 클릭한 다음 In-App WAF 및 Custom Rules를 클릭하여 Custom WAF Rule 메뉴에 액세스합니다." style="width:100%;" >}}

사용자 지정 WAF 규칙을 정의할 수 있는 메뉴가 열립니다. "Business Logic" 카테고리를 선택하면 이벤트 유형(예: `users.password_reset`)을 구성할 수 있습니다. 그런 다음 추적할 서비스와 특정 엔드포인트를 선택합니다. 규칙 조건을 사용하여 _계측할_ 코드 흐름을 식별하는 특정 파라미터를 타게팅할 수도 있습니다. 조건이 일치하면 라이브러리는 트레이스에 태그를 지정하고 AAP로 전달하도록 플래그를 지정합니다. 조건이 필요하지 않은 경우 모든 조건을 일치시키는 광범위한 조건을 설정할 수 있습니다.

{{< img src="security/application_security/threats/custom-waf-rule-form.png" alt="Create New Rule 버튼을 클릭하면 나타나는 양식의 스크린샷" style="width:50%;" >}}

저장된 규칙은 Remote Configuration이 활성화된 서비스 인스턴스에 배포됩니다.


[1]: /ko/agent/remote_config?tab=configurationyamlfile#application-security-management-asm
[2]: https://app.datadoghq.com/security/appsec/in-app-waf?config_by=custom-rules

## 자동 사용자 활동 이벤트 추적

AAP가 활성화되면 Datadog Tracing Libraries는 사용자 활동 이벤트를 자동으로 감지하려고 시도합니다.

자동으로 감지할 수 있는 이벤트는 다음과 같습니다.

- `users.login.success`
- `users.login.failure`
- `users.signup`

### 자동 사용자 활동 이벤트 추적 모드

자동 사용자 활동 추적은 다음과 같은 모드를 제공합니다.

- `identification` 모드 (약어: `ident`):
  - 이 모드는 기본 모드이며, 항상 사용자 ID를 수집하거나 가능한 최대한으로 수집합니다.
  - 사용자 ID는 로그인 성공 및 실패 시 수집됩니다. 실패 시에는 사용자 존재 여부와 관계없이 사용자 ID가 수집됩니다.
  - 계측된 프레임워크가 사용자 ID를 명확하게 제공하지 않고 구조화된 사용자 객체를 제공하는 경우, 객체 필드 이름을 기반으로 가능한 최적의 사용자 ID를 결정합니다. 다음 필드 이름 목록은 우선순위에 따라 정렬되고 고려됩니다.
    - `id`
    - `email`
    - `username`
    - `login`
    - `user`
  - 사용자 ID를 사용할 수 없거나 찾을 수 없는 경우 사용자 이벤트가 발생하지 않습니다.
- `anonymization` 모드(약어: `anon`):
  - 이 모드는 `identification`와 동일하지만 사용자 ID를 해싱(SHA256)하고 결과 해시를 잘라내어 익명화합니다.
- `disabled` 모드:
  - AAP 라이브러리는 자동화된 계측을 통해 사용자 ID를 수집하지 *않습니다*.
  - 사용자 로그인 이벤트가 발생하지 않습니다.

<div class="alert alert-info">모든 모드는 자동 계측에만 영향을 미치며, 수동 수집에는 적용되지 않습니다. 수동 수집은 SDK를 사용하여 구성되며, 해당 설정은 자동 계측에 의해 재정의되지 않습니다.</div>

### 수동 설정

Datadog 라이브러리를 사용하면 모드 약어인 `ident`|`anon`|`disabled`와 함께 `DD_APPSEC_AUTO_USER_INSTRUMENTATION_MODE` 환경 변수를 사용하여 자동 계측을 구성할 수 있습니다.

기본 모드는 `identification`(약어: `ident`)입니다.

예를 들면, `DD_APPSEC_AUTO_USER_INSTRUMENTATION_MODE=anon`입니다.

### 더 이상 사용되지 않는 모드

<div class="alert alert-info">이전 모드는 더 이상 지원되지 않지만, 다음 주요 릴리스까지는 호환성이 유지됩니다.</div>

다음 모드는 더 이상 사용되지 않습니다.

- `safe` 모드: 추적 라이브러리는 이벤트 메타데이터에 개인 식별 정보(PII) 정보를 포함하지 않습니다. 추적 라이브러리는 사용자 ID를 수집하려고 시도하며, 해당 사용자 ID가 유효한 [GUID][10]인 경우에만 수집합니다.
- `extended` 모드: 추적 라이브러리는 사용자 ID와 사용자 이메일을 수집하려고 시도합니다. 이 모드에서 Datadog은 사용자 ID가 GUID인지 유형을 확인하지 않습니다. 추적 라이브러리는 이벤트에서 추출할 수 있는 모든 값을 보고합니다.

**참고**: 추적 라이브러리가 사용자 이벤트에서 정보를 추출하지 못할 수도 있습니다. 이러한 경우 이벤트는 빈 메타데이터로 보고됩니다. 해결하려면 [SDK](#adding-business-logic-information-login-success-login-failure-any-business-logic-to-traces)를 사용하여 사용자 이벤트를 수동으로 계측하세요.

## 사용자 활동 이벤트 추적 비활성화

[AAP Software Catalog][14]를 통해 자동 사용자 활동 감지를 비활성화하려면 비활성화하려는 서비스의 자동 추적 모드 환경 변수 `DD_APPSEC_AUTO_USER_INSTRUMENTATION_MODE`를 `disabled`로 변경하세요. 모든 모드는 자동 계측에만 영향을 미치며, [Remote Configuration][15]을 활성화해야 합니다.

수동 구성에서는 서비스에서 환경 변수 `DD_APPSEC_AUTOMATED_USER_EVENTS_TRACKING_ENABLED`를 `false`로 설정하고 다시 시작할 수 있습니다. 이 설정은 Datadog Agent가 아닌 Datadog Tracing Library를 호스팅하는 애플리케이션에서 설정해야 합니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

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
[15]: /ko/agent/remote_config/