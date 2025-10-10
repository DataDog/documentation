---
aliases:
- /ko/tracing/trace_collection/otel_instrumentation/python/
- /ko/tracing/trace_collection/custom_instrumentation/otel_instrumentation/python
code_lang: otel
code_lang_weight: 2
description: OpenTelemetry API를 사용하여 파이썬 애플리케이션을 계측하고 트레이스를 Datadog로 전송하세요.
further_reading:
- link: tracing/glossary/
  tag: 설명서
  text: 서비스, 리소스, 트레이스 탐색
- link: /opentelemetry/guide/otel_api_tracing_interoperability
  tag: 설명서
  text: OpenTelemetry API 상호 운용성 및 Datadog의 계측된 트레이스
title: OpenTelemetry API를 사용한 파이썬(Python) 커스텀 계측
type: multi-code-lang
---

{{% otel-custom-instrumentation-lang %}}


## 설정

OpenTelemetry를 설정하여 Datadog 트레이스 공급자를 사용하려면,

1. 자동-계측 및 설정에 대한 지침을 아직 읽지 않았다면 [파이썬 설정 지침][1]부터 시작하세요.

1. `DD_TRACE_OTEL_ENABLED` 환경 변수를 `true`로 설정합니다.

### 커스텀 스팬(span) 생성하기

기존 트레이스 컨텍스트 내에서 커스텀 스팬을 생성하려면 다음을 수행하세요.

{{< highlight python "hl_lines=6" >}}
from opentelemetry import trace

tracer = trace.get_tracer(__name__)

def do_work():
    with tracer.start_as_current_span("operation_name") as span:
        # Perform the work that you want to track with the span
        print("Doing work...")
        # When the 'with' block ends, the span is automatically closed
{{< /highlight >}}

## 활성 스팬에 액세스(스팬(span))

현재 활성화된 스팬(span)에 액세스하려면 `get_current_span()` 함수를 사용합니다:

```python
from opentelemetry import trace

current_span = trace.get_current_span()
# enrich 'current_span' with information
```

## 스팬(span) 태그 추가하기

스팬에 속성을 추가해 추가 컨텍스트 또는 메타데이터를 제공합니다.

현재 스팬에 속성을 추가하는 방법에 대한 예시를 제공합니다.

```python
from opentelemetry import trace

current_span = trace.get_current_span()

current_span.set_attribute("attribute_key1", 1)
```

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/tracing/setup/python/