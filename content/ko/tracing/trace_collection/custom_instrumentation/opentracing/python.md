---
aliases:
- /ko/tracing/setup_overview/open_standards/python
- /ko/tracing/trace_collection/open_standards/python
- /ko/tracing/trace_collection/opentracing/python/
code_lang: 파이썬(Python)
code_lang_weight: 10
description: 파이썬(Python)용 OpenTracing 계측
kind: 설명서
title: 파이썬(Python) OpenTracing 계측
type: multi-code-lang
---

<div class="alert alert-info">OpenTracing 지원은 지원 중단된 사양에 기반합니다. 공개 사양으로 코드를 계측하고 싶다면 대신 OpenTelemetry를 사용하세요. <a href="/tracing/trace_collection/otel_instrumentation/python/">Datadog 추적 라이브러에서 OpenTelemetry 계측 데이터 처리</a> 베타 지원을 사용해 보세요.</div>

OpenTracing 지원은 `ddtrace` 패키지에 포함됩니다. `pip`을 사용하여 필요한 `opentracing` 패키지를 설치하세요.

```sh
pip install ddtrace[opentracing]
```

트레이서를 초기화하는 OpenTracing 규칙은 다음과 같이 신규 트레이서를 설정 및 인스턴스화하고 전역 `opentracing.tracer` 참조를 재정의하는 초기화 방법을 정합니다.

```python
import time
import opentracing
from ddtrace.opentracer import Tracer, set_global_tracer

def init_tracer(service_name):
    config = {
      "agent_hostname": "localhost",
      "agent_port": 8126,
    }
    tracer = Tracer(service_name, config=config)
    set_global_tracer(tracer)
    return tracer

def my_operation():
  span = opentracing.tracer.start_span("<OPERATION_NAME>")
  span.set_tag("<TAG_KEY>", "<TAG_VALUE>")
  time.sleep(0.05)
  span.finish()

init_tracer("<SERVICE_NAME>")
my_operation()
```

이제 트레이서를 다른 OpenTracing 애플리케이션처럼 사용할 수 있습니다. OpenTracing 파이썬(Python) 사용법을 확인하려면 [opentracing.io][1]을 참조하세요.


[1]: https://opentracing.io/guides/python/