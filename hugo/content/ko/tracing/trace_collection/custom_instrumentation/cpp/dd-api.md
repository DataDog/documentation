---
aliases:
- /ko/tracing/manual_instrumentation/cpp
- /ko/tracing/custom_instrumentation/cpp
- /ko/tracing/setup_overview/custom_instrumentation/cpp
- /ko/tracing/trace_collection/custom_instrumentation/cpp
- /ko/tracing/trace_collection/custom_instrumentation/dd_libraries/cpp
description: C++ 애플리케이션을 수동으로 계측하여 Datadog에 커스텀 트레이스를 전송하세요.
further_reading:
- link: 추적/연결_로그_및_트레이스
  tag: 설명서
  text: 로그 및 트레이스를 서로 연결
- link: tracing/visualization/
  tag: 설명서
  text: 서비스, 리소스, 트레이스 탐색
title: Datadog API를 사용한 C++ 사용자 정의 계측
---

<div class="alert alert-info">
아직 설정 가이드를 확인하지 않았다면 <a href="https://docs.datadoghq.com/tracing/setup/cpp/">C++ 설정 가이드</a>부터 확인해 보세요.
</div>

## 스팬(span) 생성하기

메서드를 수동으로 계측하는 방법:

```cpp
{
  // 현재 요청의 루트 스팬을 생성합니다.
  auto root_span = tracer.create_span();
  root_span.set_name("get_ingredients");
  // 루트 스팬의 리소스 이름을 설정합니다.
  root_span.set_resource_name("bologna_sandwich");
  // 루트 스팬을 부모로 하는 자식 스팬을 생성합니다.
  auto child_span = root_span.create_child();
  child_span.set_name("cache_lookup");
  // 자식 스팬의 리소스 이름을 설정합니다.
  child_span.set_resource_name("ingredients.bologna_sandwich");
  // 스팬은 명확한 시간에 완료될 수 있습니다...
  child_span.set_end_time(std::chrono::steady_clock::now());
} // ... 또는 소멸자가 호출될 때 자동으로 완료될 수 있습니다.
  // 예를 들어, root_span은 여기서 완료됩니다.
```

## 태그 추가

Datadog 내에서 옵저버빌리티 기능을 맞춤 설정하려면 [스팬][2]에 사용자 지정 [스팬 태그][1]를 추가하세요. 스팬 태그는 수신 트레이스에 적용되어 관찰된 동작을 가맹점 등급, 결제 금액, 사용자 ID와 같은 코드 수준 정보와 연결 지을 수 있습니다.

일부 Datadog 태그는 [통합 서비스 태깅][3]에 필요합니다.

{{< tabs >}}

{{% tab "지역적" %}}

### 수동

`Span::set_tag`를 호출하여 스팬 객체에 직접 태그를 추가합니다. 예:

```cpp
// `Span::set_tag`를 호출하여 스팬에 직접 태그를 추가합니다.
auto span = tracer.create_span();
span.set_tag("key must be string", "value must also be a string");

// 또는 `SpanConfig`를 설정하여 태그를 추가합니다.
datadog::tracing::SpanConfig opts;
opts.tags.emplace("team", "apm-proxy");
auto span2 = tracer.create_span(opts);
```

{{% /tab %}}

{{% tab "전역적" %}}

### 환경 변수

모든 스팬에 걸쳐 태그를 설정하려면 `DD_TAGS` 환경 변수를 쉼표로 구분된 `key:value` 쌍 목록으로 설정합니다.

```
export DD_TAGS=team:apm-proxy,key:value
```

### 수동

```cpp
datadog::tracing::TracerConfig tracer_config;
tracer_config.tags = {
  {"team", "apm-proxy"},
  {"apply", "on all spans"}
};

const auto validated_config = datadog::tracing::finalize_config(tracer_config);
auto tracer = datadog::tracing::Tracer(*validated_config);

// 모든 새로운 스팬에는 `tracer_config.tags`에 정의된 태그가 포함됩니다.
auto span = tracer.create_span();
```

{{% /tab %}}

{{< /tabs >}}

### 스팬에 대한 오류 설정

스팬을 오류와 연결하려면 스팬에 하나 이상의 오류 관련 태그를 설정하세요.
예:

```cpp
span.set_error(true);
```

`error.message`, `error.stack`, `error.type`를 조합하고 각각 `Span::set_error_message`, `Span::set_error_stack`, `Span::set_error_type`를 사용하여 오류에 관한 구체적인 정보를 추가할 수 있습니다. 오류 태그에 관한 자세한 내용은 [오류 추적][4]을 참고하세요.

오류 태그 조합을 추가하는 예:

```cpp
// 이 스팬을 표준 라이브러리에서 발생하는
// "bad file descriptor" 오류와 연결합니다.
span.set_error_message("error");
span.set_error_stack("[EBADF] invalid file");
span.set_error_type("errno");
```

<div class="alert alert-info">
`Span::set_error_*` 중 하나를 사용하면 기본적으로 `Span::set_error(true)`가 호출됩니다.
</div>

스팬에서 오류를 해제하려면 , `Span::set_error_stack`, `Span::set_error_type`, `Span::set_error_message` 조합을 제거하기 위해 `Span::set_error`를 `false`로 설정합니다.

```cpp
// 이 스팬과 관련된 모든 오류 정보를 지웁니다.
span.set_error(false);
```

## 헤더를 추출 및 삽입하여 컨텍스트 전파

헤더를 삽입하고 추출하여 분산 트레이스의 컨텍스트 전파를 구성할 수 있습니다. 자세한 내용은 [트레이스 컨텍스트 전파][5]를 참고하세요.

## 리소스 필터링

리소스 이름을 기준으로 트레이스를 제외하여 상태 점검과 같은 합성 트래픽이 트레이스를 전송하지 못하게 하고 트레이스 메트릭에 영향을 미치지 않도록 할 수 있습니다. 이 구성과 기타 보안 및 세부 구성에 관한 자세한 내용은 [보안][6] 페이지에서 확인할 수 있습니다. 

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/tracing/glossary/#span-tags
[2]: /ko/tracing/glossary/#spans
[3]: /ko/getting_started/tagging/unified_service_tagging
[4]: /ko/tracing/error_tracking/
[5]: /ko/tracing/trace_collection/trace_context_propagation/
[6]: /ko/tracing/security