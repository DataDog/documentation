---
code_lang: cpp
code_lang_weight: 50
further_reading:
- link: https://github.com/DataDog/dd-opentracing-cpp
  tag: 깃허브(Githun)
  text: 소스 코드
- link: /tracing/glossary/
  tag: 설명서
  text: 서비스, 리소스, 트레이스 탐색
- link: /tracing/trace_collection/trace_context_propagation/cpp/
  tag: 설명서
  text: 트레이스 컨텍스트 전파
title: C++ 추적 라이브러리 설정하기
type: multi-code-lang
---

코드로 추적 라이브러리를 설정한 다음 에이전트를 설정하여 애플리케이션 성능 모니터링(APM) 데이터를 수집합니다. 옵션으로 [통합 서비스 태깅][1] 설정 등, 원하는 대로 추적 라이브러리를 설정합니다.
## 환경 변수

`DD_AGENT_HOST` 
: **버전**: v0.3.6 <br>
**기본값**: `localhost` <br>
트레이스를 전송할 호스트를 설정합니다(에이전트를 실행하는 호스트). 이는 호스트 이름 또는 IP 주소일 수 있습니다. `DD_TRACE_AGENT_URL`이 설정되어 있는 경우 무시됩니다.

`DD_TRACE_AGENT_PORT` 
: **버전**: v0.3.6 <br>
**기본값**: `8126` <br>
트레이스가 전송되는 포트(에이전트가 연결 대기하는 포트)를 설정합니다. `DD_TRACE_AGENT_URL`이 설정되어 있으면 무시됩니다. [에이전트 설정][3]이 `receiver_port` 또는 `DD_APM_RECEIVER_PORT`을 기본값 `8126`이 아닌 다른 값으로 설정한 경우 `DD_TRACE_AGENT_PORT` 또는 `DD_TRACE_AGENT_URL`이 반드시 일치해야 합니다.

`DD_TRACE_AGENT_URL` 
: **버전**: v1.1.4 <br>
트레이스가 전송되는 URL 엔드포인트를 설정합니다. 설정되어 있는 경우 `DD_AGENT_HOST` 및 `DD_TRACE_AGENT_PORT`를 덮어씁니다. URL은 HTTP, HTTPS, Unix address scheme을 지원합니다. [에이전트 설정][3]이 `receiver_port` 또는 `DD_APM_RECEIVER_PORT`을 기본값 `8126`이 아닌 다른 값으로 설정한 경우 `DD_TRACE_AGENT_PORT` 또는 `DD_TRACE_AGENT_URL`이 반드시 일치해야 합니다.

`DD_ENV` 
: **버전**: v1.0.0 <br>
지정한 경우 생성된 모든 스팬(span)에 특정 값의 `env` 태그를 설정합니다.

`DD_SERVICE` 
: **버전**: v1.1.4 <br>
지정한 경우 기본값인 서비스 이름을 설정합니다. 그렇지 않은 경우, 서비스 이름을 TracerOptions 또는 JSON 설정을 통해 반드시 제공해야 합니다.

`DD_TRACE_ANALYTICS_ENABLED` 
: ***지원 중단*** <br>
**기본값**: `false` <br>
애플리케이션에 대한 글로벌 앱 분석을 활성화합니다.

`DD_TRACE_ANALYTICS_SAMPLE_RATE` 
: ***지원 중단*** <br>
애플리케이션 분석 샘플링 속도를 설정합니다. 설정된 경우 `DD_TRACE_ANALYTICS_ENABLED`을 덮어씁니다. `0.0`과 `1.0` 사이의 부동 소수점 숫자입니다.

`DD_TRACE_SAMPLING_RULES` 
: **버전**: v1.1.4 <br>
**기본값**: `[{"sample_rate": 1.0}]` <br>
오브젝트의 JSON 배열입니다. 각 오브젝트에는 반드시 `sample_rate`가 있어야 하며, `name` 및 `service` 필드는 옵션입니다. `sample_rate` 값은 반드시 0.0 ~ 1.0 사이여야 합니다(포함). 규칙은 트레이스 샘플 속도를 결정하기 위해 설정된 순서대로 적용됩니다.

`DD_SPAN_SAMPLING_RULES`
: **버전**: v1.3.3 <br>
**기본값**: `nil`<br>
오브젝트의 JSON 배열입니다. 규칙은 스팬(span)의 샘플 속도를 결정하기 위해 설정된 순서대로 적용됩니다. `sample_rate` 값은 반드시 0.0 ~ 1.0 사이여야 합니다(포함).
자세한 내용을 확인하려면 [수집 메커니즘][2]을 참조하세요.<br>
**예시:**<br>
  - 다음과 같이 서비스 `my-service` 및 작업 이름 `http.request`의 스팬(span) 샘플 속도를 50%로 설정하고, 최대 초당 50 트레이스로 설정합니다: `'[{"service": "my-service", "name": "http.request", "sample_rate":0.5, "max_per_second": 50}]'`

`DD_VERSION`
: **버전**: v1.1.4 <br>
지정한 경우 생성된 모든 스팬(span)에 특정 값의 `version` 태그를 설정합니다.

`DD_TAGS` 
: **버전**: v1.1.4 <br>
지정한 경우 생성된 모든 스팬(span)에 태그를 설정합니다. 쉼표로 구분된 `key:value` 쌍의 목록입니다.

`DD_TRACE_PROPAGATION_STYLE_INJECT` 
: **버전**: v0.4.1 <br>
**기본값**: `Datadog` <br>
추적 헤더를 삽입할 때 사용할 전파 스타일입니다. `Datadog`, `B3`, 또는 `Datadog B3`입니다.

`DD_TRACE_PROPAGATION_STYLE_EXTRACT` 
: **버전**: v0.4.1 <br>
**기본값**: `Datadog` <br>
추적 헤더를 추출할 때 사용하는 전파 스타일입니다. `Datadog`, `B3`, 또는 `Datadog B3`입니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/getting_started/tagging/unified_service_tagging/
[2]: /ko/tracing/trace_pipeline/ingestion_mechanisms/
[3]: /ko/agent/configuration/network/#configure-ports