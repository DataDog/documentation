---
title: 오류 추적 트러블슈팅
---

오류 추적에서 예기치 않은 동작이 발생하는 경우 아래의 트러블슈팅 단계에 따라 문제를 빠르게 해결할 수 있습니다. 계속 문제가 발생하면 [Datadog 지원팀][1]으로 문의하세요. 

각 릴리스에 개선 및 수정 사항이 포함되어 있으므로 Datadog에서는 Datadog 추적 라이브러리, 모바일 SDK 및 웹 SDK를 최신 버전으로 정기적으로 업데이트할 것을 권장합니다.

##  오류 추적에서 오류를 찾을 수 없습니다.

### 로그

오류 메시지에 [필수 속성][2]이 있고 로그에 대한 오류 추적이 [활성화][7]되어 있는지 확인합니다. 

이 [예시 쿼리][3]는 오류 추적 포함 기준을 충족하는 로그를 검색합니다.

### APM

오류 추적에서 처리하려면 스팬(span)에 이러한 속성이 있어야 합니다:
- `error.type`
- `error.message`
- `error.stack`

**참고**: 스택에는 최소 두 줄과 하나의 *유의미한* 프레임(대부분의 언어에서 함수와 파일명이 있는 프레임)이 있어야 합니다.

서비스 항목 스팬(span)(최상위 서비스 (스팬(span))의 오류만 오류 추적을 통해 처리됩니다. 오류 추적은 주로 처리되지 않은 예외를 캡처하며, 이 동작은 서비스에서 내부적으로 처리되는 오류를 캡처하지 않기 위해 마련된 것입니다.

이 [예시 쿼리][5]는 오류 추적 포함 기준을 충족하는 스팬(span)을 검색합니다.

#### 스팬(span) 오류를 서비스 입력 스팬으로 버블업하는 문제 해결 방법

일부 추적기는 스팬(span) 루트에 액세스하여 하위에서 루트로 오류를 버블업하는 방법을 제공합니다.

{{< tabs >}}
{{% tab "Java" %}}

```java
final Span span = GlobalTracer.get().activeSpan();
if (span != null && (span instanceof MutableSpan)) {
    MutableSpan localRootSpan = ((MutableSpan) span).getLocalRootSpan();
    // do stuff with root span
    localRootSpan.setTag("<TAG>", "<VALUE>");
}
```

{{% /tab %}}
{{% tab "Python" %}}

```python
context = tracer.get_call_context() 
root_span = context.get_current_root_span() 
root_span.set_tag('<TAG>', '<VALUE>') 
```

{{% /tab %}}
{{% tab "Ruby" %}}

```ruby
current_root_span = Datadog.tracer.active_root_span
current_root_span.set_tag('<TAG>', '<VALUE>') unless current_root_span.nil?
```

{{% /tab %}}

{{< /tabs >}}

### RUM

오류 추적은 소스가 `custom`, `source` 또는 `report`로 설정되어 있고 스택 추적이 포함된 프로세스 오류만 처리합니다. 다른 소스(예: `console`)로 전송되거나 브라우저 확장 프로그램에서 전송된 오류는 오류 추적에서 처리되지 않습니다.

이 [예시 쿼리][6]은 오류 추적 포함 기준을 충족하는 RUM 오류를 보여줍니다.

## 문제에 대한 오류 샘플을 찾을 수 없습니다.

모든 오류는 처리되지만 유지된 오류만 오류 샘플로 문제 패널에서 확인할 수 있습니다.

### APM

오류와 관련된 스팬(span)을 커스텀 보존 필터로 보존해야 해당 오류의 샘플이 문제 패널에 표시됩니다.

[1]: /ko/help/
[2]: /ko/logs/error_tracking/backend/?tab=serilog#attributes-for-error-tracking
[3]: https://app.datadoghq.com/logs?query=status%3A%28emergency%20OR%20alert%20OR%20critical%20OR%20error%29%20AND%20%28%40error.stack%3A%2A%20OR%20%40error.kind%3A%2A%29%20
[4]: /ko/tracing/error_tracking/#use-span-tags-to-track-error-spans
[5]: https://app.datadoghq.com/apm/traces?query=%40_top_level%3A1%20%40error.stack%3A%2A%20AND%20%40error.message%3A%2A%20AND%20error.type%3A%2A%20AND%20%40_top_level%3A1%20
[6]: https://app.datadoghq.com/rum/sessions?query=%40type%3Aerror%20%40error.stack%3A%2A
[7]: https://app.datadoghq.com/error-tracking/settings
[8]: /ko/tracing/trace_collection/custom_instrumentation/java/dd-api/#set-tags--errors-on-a-root-span-from-a-child-span