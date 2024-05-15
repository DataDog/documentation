---
aliases:
- /ko/tracing/visualization/search/
- /ko/tracing/trace_search_and_analytics/
- /ko/tracing/advanced_usage/
kind: 설명서
title: 애플리케이션 분석
---

<div class="alert alert-danger">
이 페이지는 사용 중단된 기능과 레거시 애플리케이션 분석과 관련된 설정 정보를 설명합니다. 기존 설정을 수정하거나 트러블슈팅에 유용할 수 있습니다. 트레이스를 완벽히 제어하려면 대신 <a href="/tracing/trace_pipeline">수집 제어 및 보존 필터</a>를 사용하세요.
</div>

## 새로운 설정 옵션으로 이동

[수집 제어 페이지][1]로 이동하여 레거시 설정을 포함하는 서비스를 확인하세요. 이러한 서비스는 `Legacy Setup` 상태로 플래그 지정됩니다. 

새로운 설정 옵션으로 이동하려면 `Legacy Setup`로 플래그 지정된 서비스에서 모든 레거시 애플리케이션 분석[설정 옵션][ingestion control page][1]을 제거합니다. 그런 다음 Datadog 에이전트와 트레이싱 라이브러리 [샘플링 메커니즘][2]을 실행하여 트레이스를 전송합니다.

## 애플리케이션 분석 설정

애플리케이션 분석 설정 옵션은 트레이싱 라이브러리와 Datadog 에이전트에 위치합니다. 서비스의 분석 스팬은 자동(#automatic-configuration)이나 수동(#custom-instrumentation)으로 생성됩니다.

### 트레이싱 라이브러리

#### 자동 설정

{{< programming-lang-wrapper langs="java,python,ruby,go,nodejs,.NET,php,cpp,nginx" >}}
{{< programming-lang lang="java" >}}

애플리케이션 분석은 자바 트레이싱 클라이언트 버전 0.25.0부터 사용할 수 있습니다. 트레이싱 클라이언트에 있는 단일 설정 파라미터를 사용해 모든 **웹 서버** 통합을 글로벌 활성화할 수 있습니다.

* 시스템 속성: `-Ddd.trace.analytics.enabled=true`
* 환경 변수: `DD_TRACE_ANALYTICS_ENABLED=true`

{{< /programming-lang >}}
{{< programming-lang lang="python" >}}

애플리케이션 분석은 파이썬(Python) 트레이싱 클라이언트 버전 0.19.0부터 사용할 수 있습니다. 트레이싱 클라이언트에 있는 단일 설정 파라미터를 사용해 모든 **웹** 통합에 대해 애플리케이션 분석을 글로벌 활성화할 수 있습니다.

* 트레이서 설정: `ddtrace.config.analytics_enabled = True`
* 환경 변수: `DD_TRACE_ANALYTICS_ENABLED=true`

{{< /programming-lang >}}
{{< programming-lang lang="ruby" >}}

애플리케이션 분석은 루비(Ruby) 트레이싱 클라이언트 버전 0.19.0부터 사용할 수 있습니다. 글로벌 플래그를 통해 모든 **웹** 통합에 대해 활성화할 수 있습니다.

그러려면 환경에서 `DD_TRACE_ANALYTICS_ENABLED=true`를 설정하거나 다음을 설정합니다. 

```ruby
Datadog.configure { |c| c.tracing.analytics.enabled = true }
```

* `true`는 모든 웹 프레임워크에 대한 분석을 활성화합니다.
* `false` 또는 `nil`는 명백히 활성화한 통합을 제외하고 분석을 비활성화합니다(기본값).

{{< /programming-lang >}}
{{< programming-lang lang="go" >}}

애플리케이션 분석은 고(Go) 트레이싱 클라이언트 1.11.0 버전부터 사용할 수 있으며 다음을 사용해 모든 **웹** 통합을 글로벌 활성화할 수 있습니다.

* [`WithAnalytics`][1] 트레이서 시작 옵션 예:

  ```go
  tracer.Start(tracer.WithAnalytics(true))
  ```

* `DD_TRACE_ANALYTICS_ENABLED=true` 환경 변수를 사용하는 1.26.0 버전부터

[1]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer#WithAnalytics
{{< /programming-lang >}}
{{< programming-lang lang="nodejs" >}}

애플리케이션 분석은 Node.js 트레이싱 클라이언트 버전 0.10.0부터 사용할 수 있으며 트레이싱 클라이언트에 있는 단일 설정 파라미터를 사용해 모든 웹 통합을 글로벌 활성화할 수 있습니다.

```javascript
tracer.init({
  analytics: true
})
```

또한 다음 설정 파라미터를 사용할 수 있습니다.

* 환경 변수: `DD_TRACE_ANALYTICS_ENABLED=true`

{{< /programming-lang >}}
{{< programming-lang lang=".NET" >}}

애플리케이션 분석은 .NET 트레이싱 클라이언트 버전 1.1.0부터 사용할 수 있으며 트레이싱 클라이언트에 있는 단일 설정 파라미터를 사용해 모든 **웹** 통합을 글로벌 활성화할 수 있습니다.

* 환경 변수 또는 앱 설정: `DD_TRACE_ANALYTICS_ENABLED=true`

이 설정은 또한 코드로 설정할 수 있습니다.

```csharp
Tracer.Instance.Settings.AnalyticsEnabled = true;
```

{{< /programming-lang >}}
{{< programming-lang lang="php" >}}

애플리케이션 분석은 PHP 트레이싱 클라이언트의 버전 0.17.0부터 사용할 수 있으며 트레이싱 클라이언트에 있는 단일 설정 파라미터를 사용해 모든 **웹** 통합을 글로벌 활성화할 수 있습니다.

* 환경 변수: `DD_TRACE_ANALYTICS_ENABLED=true`

{{< /programming-lang >}}
{{< programming-lang lang="cpp" >}}

애플리케이션 분석은 C++ 트레이싱 클라이언트 버전 1.0.0부터 사용할 수 있으며 환경 변수 `DD_TRACE_ANALYTICS_ENABLED`를 `true`로 설정해 모든 서비스 엔트리 스팬을 글로벌 활성화할 수 있습니다. **참고**: 이 설정은 또한 직접 코드로 설정할 수 있습니다.

```csharp
datadog::opentracing::TracerOptions tracer_options;
  tracer_options.agent_host = "dd-agent";
  tracer_options.service = "<SERVICE_NAME>";
  tracer_options.analytics_rate = 1.0;
  auto tracer = datadog::opentracing::makeTracer(tracer_options);
```

{{< /programming-lang >}}
{{< programming-lang lang="nginx" >}}

Nginx용 애플리케이션 분석을 활성화:

1. 환경 변수 `DD_TRACE_ANALYTICS_ENABLED`를 `true`로 설정합니다.

2. `nginx.conf` 파일과 함께 `env DD_TRACE_ANALYTICS_ENABLED;`를 추가합니다.

{{< /programming-lang >}}
{{< /programming-lang-wrapper >}}

#### 추가 서비스 설정(옵션)

##### 통합으로 설정

{{< programming-lang-wrapper langs="java,python,ruby,go,nodejs,.NET,php" >}}
{{< programming-lang lang="java" >}}

글로벌 설정과 더불어, 다음 설정을 사용해 개별 통합에 대한 애플리케이션 분석을 활성화하거나 비활성화할 수 있습니다.

* System Property: `-Ddd.<integration>.analytics.enabled=true`
* 환경 변수: `DD_<INTEGRATION>_ANALYTICS_ENABLED=true`

커스텀 서비스를 제출하는 모든 통합에 대한 글로벌 설정과 더불어 이를 사용하세요. 예를 들어, 커스텀 서비스로 제공되는 JMS 스팬의 경우 다음을 설정하여 애플리케이션 분석에서 모든 JMS 트레이싱을 활성화합니다.

* 시스템 속성: `-Ddd.jms.analytics.enabled=true`
* 환경 변수: `DD_JMS_ANALYTICS_ENABLED=true`

통합 이름은 [통합 표][1]에서 찾을 수 있습니다.

[1]: /ko/tracing/compatibility_requirements/java/#compatibility
{{< /programming-lang >}}
{{< programming-lang lang="python" >}}

전 세계 설정과 더불어, 다음 설정을 사용해 개별 통합에 대한 애플리케이션 분석을 활성화하거나 비활성화할 수 있습니다.

* 트레이서 설정: `ddtrace.config.<INTEGRATION>.analytics_enabled = True`
* 환경 변수: `DD_<INTEGRATION>_ANALYTICS_ENABLED=true`

커스텀 서비스를 제출하는 모든 통합을 위한 글로벌 설정과 더불어 이를 사용하세요. 예를 들어, 커스텀 서비스로 제공되는 보토(Boto) 스팬의 경우 다음을 설정해 애플리케이션 분석에서 모든 보토 트레이싱을 활성화하세요.

* 트레이서 설정: `ddtrace.config.boto.analytics_enabled = True`
* 환경 변수: `DD_BOTO_ANALYTICS_ENABLED=true`

**참고**: 여러 통합의 경우 트레이서의 통합별 구현에 따라 비표준 설정을 필요로 합니다. 자세한 정보는 [애플리케이션 분석][1]에 있는 라이브러리 설명서를 참조하세요.

[1]: https://ddtrace.readthedocs.io/en/stable/advanced_usage.html#trace_search_analytics
{{< /programming-lang >}}
{{< programming-lang lang="ruby" >}}

애플리케이션 분석은 특정 통합에 대해 활성화할 수 있습니다.

그러려면 환경에서 `DD_<INTEGRATION>_ANALYTICS_ENABLED=true`를 설정하거나 다음을 설정하세요.

```ruby
Datadog.configure { |c| c.tracing.instrument :integration, analytics_enabled: true }
```

`integration`이 통합 이름인 경우 옵션으로 [사용 가능한 통합 목록][1]을 참조하세요.

* `true`는 글로벌 설정과 관계없이 이 통합에 대한 분석을 활성화합니다.
* `false`는 글로벌 설정에 관계없이 이 통합에 대한 분석을 비활성화합니다.
* `nil`은 분석에 대한 글로벌 설정을 보류합니다.

[1]: /ko/tracing/setup/ruby/#library-compatibility
{{< /programming-lang >}}
{{< programming-lang lang="go" >}}

글로벌 설정과 더불어 각 통합에 대해 애플리케이션 분석을 각각 활성화하거나 비활성화할 수 있습니다. 예를 들어, 표준 라이브러리의 `net/http` 패키지를 설정하는 경우 다음을 수행할 수 있습니다.

```go
package main

import (
    httptrace "gopkg.in/DataDog/dd-trace-go.v1/contrib/net/http"
    "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer"
)

func main() {
    tracer.Start()
    defer tracer.Stop()

    mux := httptrace.NewServeMux(httptrace.WithAnalytics(true))
    // ...
}
```

{{< /programming-lang >}}
{{< programming-lang lang="nodejs" >}}

글로벌 설정과 더불어 개별 통합에 대한 애플리케이션 분석을 활성화 또는 비활성화할 수 있습니다.

예를 들어 `express`에 대해 애플리케이션 분석을 활성화하는 방법:

```js
tracer.use('express', {
  analytics: true
})
```

통합 이름은 [통합 표][1]에서 찾을 수 있습니다.

[1]: /ko/tracing/setup/nodejs/#integrations
{{< /programming-lang >}}
{{< programming-lang lang=".NET" >}}

글로벌 설정과 더불어 개별 통합에 대한 애플리케이션 분석을 활성화 또는 비활성화할 수 있습니다.

* 환경 변수 또는 앱 설정: `DD_<INTEGRATION>_ANALYTICS_ENABLED=true`

또는 코드: 

```csharp
Tracer.Instance.Settings.Integrations["<INTEGRATION>"].AnalyticsEnabled = true;
```

예를 들어 ASP.NET MVC용 애플리케이션 분석을 활성화하는 방법:

* 환경 변수 또는 앱 설정: `DD_ASPNETMVC_ANALYTICS_ENABLED=true`

또는 코드: 

```csharp
Tracer.Instance.Settings.Integrations["AspNetMvc"].AnalyticsEnabled = true;
```

통합 이름은 [통합 표][1]에서 찾을 수 있습니다. **참고**: 리눅스(Linux)에서 환경 변수의 이름은 대소문자를 구분합니다.

[1]: /ko/tracing/setup/dotnet/#integrations
{{< /programming-lang >}}
{{< programming-lang lang="php" >}}

전 세계 설정과 더불어, 다음 설정을 사용해 개별 통합에 대한 애플리케이션 분석을 활성화하거나 비활성화할 수 있습니다.

* 환경 변수: `DD_<INTEGRATION>_ANALYTICS_ENABLED=true`

커스텀 서비스를 제출하는 통합에 대한 글로벌 설정과 더불어 이를 사용하세요. 예를 들어 커스텀 서비스로 제공하는 Symfony 스팬의 경우 다음을 설정해 애플리케이션 분석에서 모든 Symfony 트레이싱을 활성화할 수 있습니다.

* 환경 변수: `DD_SYMFONY_ANALYTICS_ENABLED=true`

통합 이름은 [통합 표][1]에서 찾을 수 있습니다.

[1]: /ko/tracing/setup/php/#integration-names
{{< /programming-lang >}}
{{< /programming-lang-wrapper >}}

#### 데이터베이스 서비스

{{< programming-lang-wrapper langs="java,python,ruby,go,nodejs,.NET,php" >}}
{{< programming-lang lang="java" >}}


데이터베이스 트레이싱은 기본적으로 애플리케이션 분석으로 수집되지 않습니다. 각 통합에 대해 수동으로 수집을 활성화해야 합니다. 예: 

* 시스템 속성: `-Ddd.jdbc.analytics.enabled=true`
* 환경 변수: `DD_JDBC_ANALYTICS_ENABLED=true`

{{< /programming-lang >}}
{{< programming-lang lang="python" >}}

데이터베이스 트레이싱은 기본적으로 애플리케이션 분석으로 수집되지 않습니다. 각 통합에 대해 수동으로 수집을 활성화해야 합니다. 예: 

* 트레이서 설정: `ddtrace.config.psycopg.analytics_enabled = True`
* 환경 변수: `DD_PSYCOPG_ANALYTICS_ENABLED=true`

{{< /programming-lang >}}
{{< programming-lang lang="ruby" >}}

데이터베이스 트레이싱은 기본적으로 애플리케이션 분석으로 수집되지 않습니다. 각 통합에 대해 수동으로 수집을 활성화해야 합니다. 예: 

```ruby
Datadog.configure { |c| c.tracing.instrument :mongo, analytics_enabled: true }
```

{{< /programming-lang >}}
{{< programming-lang lang="go" >}}

데이터베이스 트레이싱은 기본적으로 애플리케이션 분석으로 수집되지 않습니다. 각 통합에 대해 수동으로 수집을 활성화해야 합니다. 예: 

```go
// Register the database driver with Analytics enabled.
sqltrace.Register("mysql", &mysql.MySQLDriver{}, sqltrace.WithAnalytics(true))
```

{{< /programming-lang >}}
{{< programming-lang lang="nodejs" >}}

데이터베이스 트레이싱은 기본적으로 애플리케이션 분석으로 수집되지 않습니다. 각 통합에 대해 수동으로 수집을 활성화해야 합니다. 예: 

```javascript
tracer.use('mysql', {
  analytics: true
})
```

{{< /programming-lang >}}
{{< programming-lang lang=".NET" >}}

데이터베이스 트레이싱은 기본적으로 애플리케이션 분석으로 수집되지 않습니다. 각 통합에 대해 수동으로 수집을 활성화해야 합니다. 예: ADO.NET을 위해 애플리케이션 분석을 활성화하는 방법: 

* 환경 변수 또는 앱 설정: `DD_AdoNet_ANALYTICS_ENABLED=true`

또는 코드: 

```csharp
Tracer.Instance.Settings.Integrations["AdoNet"].AnalyticsEnabled = true;
```

통합 이름은 [통합 표][1]에서 찾을 수 있습니다. **참고**: 리눅스(Linux)에서 환경 변수의 이름은 대소문자를 구분합니다.

[1]: /ko/tracing/setup/dotnet/#integrations
{{< /programming-lang >}}
{{< programming-lang lang="php" >}}

데이터베이스 트레이싱은 기본적으로 애플리케이션 분석으로 수집되지 않습니다. 다음 설정을 사용해 개별 통합에 대한 애플리케이션 분석을 활성화 또는 비활성화할 수 있습니다.

* 환경 변수: `DD_<INTEGRATION>_ANALYTICS_ENABLED=true`

커스텀 서비스를 제출하는 모든 통합에 대해 글로벌 설정과 함께 이를 사용할 수 있습니다. 예: `mysqli`의 경우:

* 환경 변수: `DD_MYSQLI_ANALYTICS_ENABLED=true`

통합 이름은 [통합 표][1]에서 찾을 수 있습니다.

[1]: /ko/tracing/setup/php/#integrations
{{< /programming-lang >}}
{{< /programming-lang-wrapper >}}

##### 커스텀 계측

{{< programming-lang-wrapper langs="java,python,ruby,go,nodejs,.NET,php,cpp" >}}
{{< programming-lang lang="java" >}}

커스텀 계측을 포함하는 애플리케이션에서 스팬에 `ANALYTICS_SAMPLE_RATE` 태그를 설정하여 애플리케이션 분석을 활성화할 수 있습니다.

```java
import datadog.trace.api.DDTags;
import datadog.trace.api.Trace;
import io.opentracing.Tracer;
import io.opentracing.util.GlobalTracer;

class MyClass {
  @Trace
  void myMethod() {
    final Span span = GlobalTracer.get().activeSpan();
    // Span provided by @Trace annotation.
    if (span != null) {
      span.setTag(DDTags.SERVICE, "<SERVICE_NAME>");
      span.setTag(DDTags.ANALYTICS_SAMPLE_RATE, 1.0);
    }
  }
}
```
**참고:** [dd.trace.methods][1] 또는 [트레이스 주석][2] 스팬에 대한 애플리케이션 분석을 `-Ddd.trace-annotation.analytics.enabled=true`를 설정해 활성화할 수 있습니다.


[1]: https://docs.datadoghq.com/ko/tracing/custom_instrumentation/java/#dd-trace-methods
[2]: https://docs.datadoghq.com/ko/tracing/custom_instrumentation/java/#trace-annotations
{{< /programming-lang >}}
{{< programming-lang lang="python" >}}

커스텀 계측을 포함하는 애플리케이션은 스팬에 `ddtrace.constants.ANALYTICS_SAMPLE_RATE_KEY` 태그를 설정하여 애플리케이션 분석을 활성화할 수 있습니다.

```python
from ddtrace import tracer
from ddtrace.constants import ANALYTICS_SAMPLE_RATE_KEY

@tracer.wrap()
def my_method():
    span = tracer.current_span()
    span.set_tag(ANALYTICS_SAMPLE_RATE_KEY, True)
```

{{< /programming-lang >}}
{{< programming-lang lang="ruby" >}}

커스텀 계측을 포함하는 애플리케이션은 스팬에 `Analytics::TAG_ENABLED` 태그를 설정하여 애플리케이션 분석을 활성화할 수 있습니다.

```ruby
Datadog::Tracing.trace('my.task') do |span|
  # Set the analytics sample rate to 1.0
  span.set_tag(Datadog::Tracing::Metadata::Ext::Analytics::TAG_ENABLED, true)
end
```

{{< /programming-lang >}}
{{< programming-lang lang="go" >}}

커스텀 계측의 경우 특별 태그를 추가해 아래와 같이 애플리케이션 분석을 활성화할 수 있습니다.

```go
span.SetTag(ext.AnalyticsEvent, true)
```

이를 통해 스팬을 애플리케이션 분석 이벤트로 표시할 수 있습니다.

{{< /programming-lang >}}
{{< programming-lang lang="nodejs" >}}

커스텀 계측을 포함하는 애플리케이션의 경우 스팬에 `ANALYTICS` 태그를 설정해 애플리케이션 분석을 활성화할 수 있습니다.

```javascript
const { ANALYTICS } = require('dd-trace/ext/tags')

span.setTag(ANALYTICS, true)
```

{{< /programming-lang >}}
{{< programming-lang lang=".NET" >}}

커스텀 계측을 포함하는 애플리케이션은 스팬에서 `Tags.Analytics` 태그를 설정하여 애플리케이션 분석을 활성화할 수 있습니다.

```csharp
using Datadog.Trace;

using(var scope = Tracer.Instance.StartActive("web.request"))
{
    // enable Analytics on this span
    scope.span.SetTag(Tags.Analytics, "true");
}

```

{{< /programming-lang >}}
{{< programming-lang lang="php" >}}

커스텀 계측을 포함하는 애플리케이션은 스팬에서 `ANALYTICS_KEY` 태그를 설정하여 애플리케이션 분석에서 활성화할 수 있습니다.

```php
<?php
  // ... your existing span that you want to enable for App Analytics
  $span->setTag(Tag::ANALYTICS_KEY, true);
?>
```

{{< /programming-lang >}}
{{< programming-lang lang="cpp" >}}

커스텀 계측을 포함하는 애플리케이션은 스팬에서 `analytics_event` 태그를 설정하여 애플리케이션 분석을 활성화할 수 있습니다.

```cpp
...
#include <datadog/tags.h>
...
auto tracer = ...
auto span = tracer->StartSpan("operation_name");
// A boolean value of true enables App Analytics for the span,
// with a sample rate of 1.0.
span->SetTag(datadog::tags::analytics_event, true);
// A double value between 0.0 and 1.0 enables App Analytics
// and sets the sample rate to the provided value.
span->SetTag(datadog::tags::analytics_event, 0.5);
```

{{< /programming-lang >}}
{{< /programming-lang-wrapper >}}

### Datadog 에이전트

<div class="alert alert-danger">
이 섹션은 레거시 애플리케이션 분석과 관련된 설정 정보와 사용 중단된 기능을 설명합니다.
</div>

스팬 속도를 설정해 서비스별로 분석하도록 하려면 `datadog.yaml` 파일에서 다음을 설정하세요.
```
apm_config:
  analyzed_rate_by_service:
    service_A: 1
    service_B: 0.2
    service_C: 0.05
```

스팬 속도를 설정하여 서비스 및 운영 이름별로 분석하려면 `datadog.yaml` 파일에서 다음을 설정하세요.

```
apm_config:
  analyzed_spans:
    service_A|operation_name_X: 1
    service_A|operation_name_Y: 0.25
    service_B|operation_name_Z: 0.01
```

## 트러블슈팅: 초당 최대 이벤트 제한

에이전트 로그에서 다음 오류 메시지가 나타나면 애플리케이션은 APM에서 허용되는 초당 기본 200개 이상의 트레이스 이벤트를 전송하고 있는 것입니다.

```
초당 최대 이벤트에 도달했습니다(현재=300.00/s, 최대=200.00/s). 일부 이벤트가 이제 줄어드는 중입니다(샘플 속도=0.54). 이벤트 샘플링 속도를 조정하는 것을 고려하세요.

```

**에이전트에 대한 APM 속도 제한을 높이려면 에이전트 설정 파일(`apm_config:` 섹션 아래) 내의 `max_events_per_second` 속성을 설정하세요. 컨테이너화된 구축 환경(예: 도커(Docker) 또는 쿠버네티스(Kubernetes))의 경우 `DD_APM_MAX_EPS` 환경 변수를 사용하세요.

**참고**: APM 속도 제한을 높이면 애플리케이션 분석 비용이 증가할 수 있습니다.


[1]: /ko/tracing/trace_pipeline/ingestion_controls/
[2]: /ko/tracing/trace_pipeline/ingestion_mechanisms/