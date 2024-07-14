---
aliases:
- /ko/tracing/connect_logs_and_traces/python
code_lang: 파이썬(Python)
code_lang_weight: 20
description: 파이썬(Python) 로그 과 트레이스를 연결하여 Datadog에서 상호 연결합니다.
further_reading:
- link: /tracing/manual_instrumentation/
  tag: 설명서
  text: 애플리케이션을 수동 계측하여 트레이스를 생성합니다.
- link: /tracing/opentracing/
  tag: 문서
  text: 애플리케이션 전반에 걸쳐 오픈트레이싱을 구현하세요.
- link: /tracing/glossary/
  tag: 문서
  text: 서비스, 리소스 및 트레이스
- link: https://www.datadoghq.com/blog/request-log-correlation/
  tag: 블로그
  text: 로그 요청을 트레이스와 자동 연결
- link: /logs/guide/ease-troubleshooting-with-cross-product-correlation/
  tag: 가이드
  text: 제품 간 상관관계를 활용한 쉬운 트러블슈팅
kind: 설명서
title: 파이썬(Python) 로그 및 트레이스 상호연결
type: multi-code-lang
---

## 주입

### 표준 라이브러리 로깅

[트레이스][1]를 로그와 연결하려면 다음 단계를 완료하세요.

  1. [자동 활성화 계측](#step-1---activate-automatic-계측).
  2. [로그 레코드에서 필수 속성 포함](#step-2---include-required-attributes).

#### 1단계 - 자동 활성화 계측

다음 옵션 중 하나를 사용하여 자동 계측을 활성화합니다.

옵션 1: [라이브러리 주입][5]:
  1. 애플리케이션 `deployment/manifest` 파일에 환경 변수 `DD_LOGS_INJECTION=true`를 설정합니다.
  2. [라이브러리 주입][5]의 지침에 따라 추적을 설정합니다.

옵션 2: `ddtrace-run`:
  1. 애플리케이션이 실행 중인 환경 에서 환경 변수 `DD_LOGS_INJECTION=true`를 설정합니다.
  2. 애플리케이션으로 **ddtrace**를 가져옵니다.
  3. `ddtrace-run` (예: `ddtrace-run python appname.py`)로 애플리케이션을 실행합니다.

옵션 3: `patch`:
  1. 애플리케이션으로 **ddtrace**를 가져옵니다.
  2. 애플리케이션 코드의 시작 부분에 `ddtrace.patch(logging=True)`을 추가합니다.

#### 2단계 - 필수 속성 포함

로그 레코드의 필수 속성을 포함하도록 로그 형식을 업데이트합니다.


``dd.env``, ``dd.service``, ``dd.version``, ``dd.trace_id`` 및
``dd.span_id`` 속성을 로그를 남기다 레코드의 형식 문자열에 포함하세요.

다음은 `logging.basicConfig`를 사용해 로그 주입을 설정하는 예제입니다:

``` python
import logging
from ddtrace import tracer

FORMAT = ('%(asctime)s %(levelname)s [%(name)s] [%(filename)s:%(lineno)d] '
          '[dd.service=%(dd.service)s dd.env=%(dd.env)s dd.version=%(dd.version)s dd.trace_id=%(dd.trace_id)s dd.span_id=%(dd.span_id)s] '
          '- %(message)s')
logging.basicConfig(format=FORMAT)
log = logging.getLogger(__name__)
log.level = logging.INFO

@tracer.wrap()
def hello():
    log.info('Hello, World!')

hello()
```

로그 주입에 대해 자세히 알아보려면 [ddtrace 설명서][6]를 참조하세요.

### 표준 라이브러리 로깅 없음

표준 라이브러리 `logging` 모듈을 사용하지 않는 경우 다음 코드 스니펫을 사용하여 로그 에 추적자 정보를 삽입할 수 있습니다:

```python
from ddtrace import tracer

span = tracer.current_span()
correlation_ids = (str((1 << 64) - 1 & span.trace_id), span.span_id) if span else (None, None)
```
이 접근 방식을 설명하기 위해 다음 예제에서는 `structlog`에서 함수를 *프로세서*로 정의하여 로그 출력에 추적자 필드를 추가합니다:

``` python
import ddtrace
from ddtrace import tracer

import structlog

def tracer_injection(logger, log_method, event_dict):
    # get correlation ids from current tracer context
    span = tracer.current_span()
    trace_id, span_id = (str((1 << 64) - 1 & span.trace_id), span.span_id) if span else (None, None)

    # add ids to structlog event dictionary
    event_dict['dd.trace_id'] = str(trace_id or 0)
    event_dict['dd.span_id'] = str(span_id or 0)

    # add the env, service, and version configured for the tracer
    event_dict['dd.env'] = ddtrace.config.env or ""
    event_dict['dd.service'] = ddtrace.config.service or ""
    event_dict['dd.version'] = ddtrace.config.version or ""

    return event_dict

structlog.configure(
    processors=[
        tracer_injection,
        structlog.processors.JSONRenderer()
    ]
)
log = structlog.get_logger()
```

로거가 구성되면 함수 로그 이벤트를 실행해 삽입된 추적 정보를 얻을 수 있습니다.

```text
>>> traced_func()
{"event": "In tracer context", "dd.trace_id": 9982398928418628468, "dd.span_id": 10130028953923355146, "dd.env": "dev", "dd.service": "hello", "dd.version": "abc123"}
```

**참고**: [Datadog 로그 통합][2]을 사용하지 않고 로그, 커스텀 로그를 파싱하는 경우 규칙이 `dd.trace_id`와 `dd.span_id` 문자열로 파싱되고 [트레이스 리매퍼][3]를 사용하여 리매핑되고 있는지 확인해야 합니다. 자세한 내용은 [트레이스 ID 패널에 연결된 로그 표시되지 않음][4]을 참조하세요.

[파이썬(Python) 로깅 문서][2]를 참조하여 파이썬(Python) 로그 통합이 적절하게 설정되어 파이썬(Python) 로그가 자동으로 파싱되는지 확인할 수 있습니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/tracing/glossary/#trace
[2]: /ko/logs/log_collection/python/#configure-the-datadog-agent
[3]: /ko/logs/log_configuration/processors/#trace-remapper
[4]: /ko/tracing/troubleshooting/correlated-logs-not-showing-up-in-the-trace-id-panel/?tab=custom
[5]: /ko/tracing/trace_collection/library_injection_local/
[6]: https://ddtrace.readthedocs.io/en/stable/advanced_usage.html#logs-injection