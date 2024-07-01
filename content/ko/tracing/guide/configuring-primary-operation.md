---
aliases:
- /ko/tracing/faq/resource-trace-doesn-t-show-up-under-correct-service/
further_reading:
- link: /tracing/trace_collection/
  tag: 설명서
  text: 애플리케이션에서 애플리케이션 성능 모니터링(APM) 추적 설정 방법 알아보기
- link: /tracing/service_catalog/
  tag: 설명서
  text: Datadog에 보고하는 서비스 검색 및 카탈로그 작성
- link: /tracing/services/service_page/
  tag: 설명서
  text: Datadog 서비스에 대해 자세히 알아보기
- link: /tracing/services/resource_page/
  tag: 설명서
  text: 리소스 성능 및 트레이스 자세히 살펴보기
- link: /tracing/trace_explorer/trace_view/
  tag: 설명서
  text: Datadog 트레이스 읽는 법 알아보기
kind: 지침
title: 서비스 주요 작업
---

## 애플리케이션 성능 모니터링(APM) 서비스

애플리케이션 성능 모니터링(APM) 서비스는 추적 메트릭의 오류, 처리량, 레이턴시를 계산합니다. 이는 기본 작업으로 간주되는 단일 스팬(span) 이름과 매칭되는 리소스를 기준으로 계산됩니다. 서비스 메트릭은 기본 서비스(현황) 페이지, 서비스 카탈로그 및 서비스 맵 등, 프로덕트 전반의 기본값으로 사용됩니다.

**참고**: 추적 메트릭은 `trace.*` [네임스페이스][1]를 기준으로 쿼링됩니다.

## 기본 작업
### 정의

서비스의 기본 작업 이름에 따라 UI에 서비스가 표시되는 방식이 결정됩니다. Datadog 백엔드는 요청 처리량을 기반으로 서비스의 엔트리 포인트로 간주되는 작업 이름을 자동 선택합니다.

예를 들어, 리소스로 계측되는 `web-store` 서비스에는 다중 엔드포인트가 있을 수 있습니다. 이러한 리소스의 경우, 리소스 엔트리 포인트가 일관되기에 동일한 기본 작업을 공유합니다. 예를 들어, `/user/home` 및 `/user/new` 리소스에는 둘 다 동일한 기본 작업 `web.request`이 있습니다. 다른 언어에서는 서비스 기본 작업이 다음과 같이 표시될 수도 있습니다.

| 서비스 유형           | 기본 작업                                 |
|------------------------|---------------------------------------------------|
| 웹                    | `servlet.request`, `flask.request`, `web.request` |
| db                     | `postgres.query`, `db.query`                      |
| 커스텀-계측 | `trace.annotation`, `method.call`                 |

### 설정

서비스에 정의된 기본 작업이 여러 개 존재하는 경우, 요청 처리량이 가장 높은 작업이 서비스 엔트리 포인트로 자동 선택됩니다. 관리자는 다음에 따라 이를 수동으로 설정할 수 있습니다.

1. [애플리케이션 성능 모니터링(APM) 설정 페이지][2]로 이동합니다.
2. **기본 작업 이름** 탭을 선택합니다.
3. 수동으로 설정하려는 서비스의 편집 아이콘을 클릭합니다.
4. **수동으로 설정** 탭을 클릭합니다.
5. 서비스 엔트리 포인트로 반영할 작업을 선택합니다.
6. **저장**을 클릭합니다.

{{< img src="tracing/guide/primary_operation/configuring-primary-option.png" alt="APM 저장" >}}

## 추가 스팬(span) 이름 통계 보기

계측을 제외한 모든 트레이스가 Datadog에 정확하게 전송되고 있는지 확인하려면, 드롭다운 메뉴를 사용하여 보조 작업으로 간주되는 스팬(span) 이름을 추가로 지정하여 리소스를 살펴볼 수 있습니다. 그러나 이는 서비스 수준 통계를 계산하는 데 사용되지 않습니다.

{{< img src="tracing/guide/primary_operation/dropdown.mp4" alt="APM 저장" video=true >}}

## 수동 계측

커스텀 스팬(span) 작성 시 리소스가 동일한 기본 작업(예: `web.request`)으로 그룹화되도록 스팬(span) 이름을 정적 설정합니다. 스팬(span) 이름을 동적 설정하는 경우 이를 리소스로 설정합니다(예: `/user/profile`).

자세한 내용을 확인하려면 프로그래밍 언어용 [커스텀 계측][3] 항목을 참조하세요.

## OpenTracing

Datadog을 사용하는 경우, OpenTracing 작업 이름은 리소스이고 OpenTracing "구성 요소" 태그는 Datadog 스팬(span) 이름입니다. 리소스가 "/user/profile"이고 스팬(span) 이름이 "http.request"인 스팬(span)을 OpenTracing 용어로 정의하는 경우의 예시는 다음과 같습니다.

{{< programming-lang-wrapper langs="java,python,ruby,go,nodejs,.NET,php,cpp" >}}
{{< programming-lang lang="java" >}}



```java
Span span = tracer.buildSpan("http.request").start();

try (Scope scope = tracer.activateSpan(span)) {
    span.setTag("service.name", "service_name");
    span.setTag("resource.name", "/user/profile");
    // 추적되는 코드
} finally {
    span.finish();
}

```

자세한 정보를 확인하려면 [Java 및 OpenTracing 설정][1]을 참조하세요.


[1]: /ko/tracing/trace_collection/opentracing/java/#opentracing
{{< /programming-lang >}}
{{< programming-lang lang="python" >}}

```python
from ddtrace.opentracer.tags import Tags
import opentracing
span = opentracing.tracer.start_span('http.request')
span.set_tag(Tags.RESOURCE_NAME, '/user/profile')
span.set_tag(Tags.SPAN_TYPE, 'web')

# ...
span.finish()

```

자세한 정보를 확인하려면 [파이썬(Python) 및 OpenTracing 설정][1]을 참조하세요.


[1]: /ko/tracing/trace_collection/opentracing/python/#opentracing
{{< /programming-lang >}}
{{< programming-lang lang="ruby" >}}


```ruby
OpenTracing.start_active_span('http.request') do |scope|
  scope.span.datadog_span.resource = '/user/profile'
  # 추적되는 코드
end
```
자세한 정보를 확인하려면 [루비(Ruby) 및 OpenTracing 설정][1]을 참조하세요.


[1]: /ko/tracing/trace_collection/opentracing/ruby/#opentracing
{{< /programming-lang >}}
{{< programming-lang lang="go" >}}


```go
opentracing.StartSpan("http.request", opentracer.ResourceName("/user/profile"))
```

자세한 정보를 확인하려면 [Go 및 OpenTracing 설정][1]을 참조하세요.


[1]: /ko/tracing/trace_collection/opentracing/go/#opentracing
{{< /programming-lang >}}
{{< programming-lang lang="nodejs" >}}


```javascript
const span = tracer.startSpan('http.request');
span.setTag('resource.name',  '/user/profile')
span.setTag('span.type', 'web')
// 추적되는 코드
span.finish();
```

자세한 정보를 확인하려면 [Node.js 및 OpenTracing 설정][1]을 참조하세요.


[1]: /ko/tracing/trace_collection/opentracing/nodejs/#opentracing
{{< /programming-lang >}}
{{< programming-lang lang=".NET" >}}


```csharp
using OpenTracing;
using OpenTracing.Util;

using (var scope = GlobalTracer.Instance.BuildSpan("http.request").StartActive(finishSpanOnDispose: true))
{
    scope.Span.SetTag("resource.name", "/user/profile");
    // 추적되는 코드
}

```

자세한 정보를 확인하려면 [.NET 및 OpenTracing 설정][1]을 참조하세요.


[1]: /ko/tracing/trace_collection/opentracing/dotnet/#opentracing
{{< /programming-lang >}}
{{< programming-lang lang="php" >}}


```php
// 컴포저의 오토로더 불러오기 직후 index.php 시작 시 한 번
// For OpenTracing <= 1.0-beta6
$otTracer = new \DDTrace\OpenTracer\Tracer(\DDTrace\GlobalTracer::get());
// For OpenTracing >= 1.0
$otTracer = new \DDTrace\OpenTracer1\Tracer(\DDTrace\GlobalTracer::get());
// 글로벌 트레이서 래퍼(wrapper) 등록
 \OpenTracing\GlobalTracer::set($otTracer);

// 애플리케이션 코드의 어느 곳이든
$otTracer = \OpenTracing\GlobalTracer::get();
$scope = $otTracer->startActiveSpan('http.request');
$span = $scope->getSpan();
$span->setTag('service.name', 'service_name');
$span->setTag('resource.name', '/user/profile');
$span->setTag('span.type', 'web');
// ...예측대로 OpenTracing 사용
$scope->close();
```

자세한 정보를 확인하려면 [PHP 및 OpenTracing 설정][1]을 참조하세요.


[1]: /ko/tracing/trace_collection/opentracing/php/#opentracing
{{< /programming-lang >}}
{{< programming-lang lang="cpp" >}}


```cpp
// 현재 요청에 대한 루트 스팬을 생성합니다.
auto root_span = tracer->StartSpan("web.request");
// 루트 스팬의 리소스 이름을 설정합니다.
root_span->SetTag(datadog::tags::resource_name, "/user/profile");
```

자세한 정보를 확인하려면 [C++ 및 커스텀 계측 설정][1]을 참조하세요.


[1]: /ko/tracing/trace_collection/custom_instrumentation/cpp/#manually-instrument-a-method
{{< /programming-lang >}}
{{< /programming-lang-wrapper >}}


## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}


[1]: /ko/tracing/metrics/metrics_namespace/
[2]: https://app.datadoghq.com/apm/settings
[3]: /ko/tracing/trace_collection/custom_instrumentation/