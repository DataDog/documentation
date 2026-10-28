---
aliases:
- /ko/llm_observability/instrumentation/
description: Python, Node.js 및 Java용 SDK 기반 및 API 기반 접근 방식을 포함한 Agent Observability를
  위한 계측 옵션 개요입니다.
further_reading:
- link: /llm_observability/auto_instrumentation
  tag: 자동 계측
  text: 자동 계측으로 빠르게 시작하기
- link: https://www.datadoghq.com/blog/llm-otel-semantic-convention
  tag: 블로그
  text: Datadog LLM Observability는 OpenTelemetry GenAI 시맨틱 규칙을 기본적으로 지원합니다.
- link: https://learn.datadoghq.com/courses/llm-obs-getting-started
  tag: 학습 센터
  text: Agent Observability 시작하기
title: Agent Observability 계측
---
Agent Observability를 시작하려면 프로그래밍 언어와 설정에 따라 여러 접근 방식 중 하나를 선택하여 LLM 애플리케이션 또는 에이전트를 계측하세요. Datadog은 최소한의 코드 변경으로 LLM 애플리케이션 및 에이전트에서 상세한 트레이스, 메트릭 및 평가를 캡처하도록 설계된 포괄적인 계측 옵션을 제공합니다.

## 계측 옵션 {#instrumentation-options}
Python, Node.js 또는 Java SDK를 사용하거나 Agent Observability API를 사용하여 애플리케이션을 계측할 수 있습니다.

### SDK 기반 계측(권장) {#sdk-based-instrumentation-recommended}
Datadog은 가장 포괄적인 Agent Observability 기능을 제공하는 네이티브 SDK를 제공합니다.
| 언어 | 사용 가능한 SDK | 자동 계측 | 사용자 지정 계측 |
| -------- | ------------- | -------------------- | ---------------------- |
| Python | Python 3.7+ | {{< X >}} | {{< X >}} |
| Node.js | Node.js 16+ | {{< X >}} | {{< X >}} |
| Java | Java 8+ | {{< X >}} | {{< X >}} |


SDK를 사용하여 LLM 애플리케이션을 계측하려면 다음 단계를 따르세요.
1. Agent Observability SDK를 설치합니다.
2. 애플리케이션 시작 명령에서 [필수 환경 변수][6]를 제공하거나 [코드 내에서][7] 프로그래밍 방식으로 SDK를 구성합니다. Datadog API 키, Datadog 사이트 및 ML(머신러닝) 앱 이름을 구성했는지 확인하세요.

#### 자동 계측 {#auto-instrumentation}
자동 계측은 코드를 변경할 필요 없이 Python, Node.js 및 Java 애플리케이션에 대한 LLM 호출을 캡처합니다. 이를 통해 인기 프레임워크 및 공급자에 대한 즉시 사용 가능한 트레이스와 관측 가능성을 확보할 수 있습니다. 추가 세부 정보 및 지원되는 프레임워크와 공급자의 전체 목록은 [자동 계측 문서][1]를 참조하세요.

자동 계측은 다음을 자동으로 캡처합니다.
- 입력 프롬프트 및 출력 완성
- 토큰 사용량 및 비용
- 지연 시간 및 오류 정보
- 모델 파라미터(temperature, max_tokens 등)
- 프레임워크별 메타데이터

<div class="alert alert-info">지원되는 프레임워크를 사용할 때는 LLM 호출에 대해 수동 스팬 생성이 필요하지 않습니다. SDK는 풍부한 메타데이터와 함께 적절한 스팬을 자동으로 생성합니다.</div>

#### 사용자 지정 계측 {#custom-instrumentation}
지원되는 모든 SDK는 자동 계측 외에도 다음을 포함한 LLM 애플리케이션의 사용자 지정 계측을 위한 고급 기능을 제공합니다.
- 함수 데코레이터 또는 컨텍스트 관리자를 사용한 수동 스팬 생성
- 다단계 LLM 애플리케이션에 대한 복합적인 워크플로 트레이스
- 자율 LLM 에이전트에 대한 Agent 모니터링
- 사용자 지정 평가 및 품질 측정
- 사용자 상호 작용을 위한 세션 추적

자세한 내용은 [SDK 참조 문서][2]를 참조하세요.

### HTTP API 계측 {#http-api-instrumentation}
SDK에서 지원하지 않는 언어를 사용하거나 사용자 지정 통합을 사용하는 경우, Datadog의 HTTP API를 사용하여 애플리케이션을 계측할 수 있습니다.

API를 통해 다음을 수행할 수 있습니다:
- HTTP API 엔드포인트를 통해 직접 스팬 제출
- 스팬과 연결된 사용자 지정 평가 전송
- 복잡한 애플리케이션의 전체 트레이스 계층 구조 포함
- 입력, 출력, 메타데이터 및 메트릭으로 스팬 주석 달기

API 엔드포인트:
- [스팬 API][4]: `POST` `https://api.{{< region-param key="dd_site" code="true" >}}/api/intake/llm-obs/v1/trace/spans`
- [평가 API][5]: `POST` `https://api.{{< region-param key="dd_site" code="true" >}}/api/intake/llm-obs/v2/eval-metric`

자세한 내용은 [HTTP API 문서][3]를 참조하세요.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}


[1]: /ko/llm_observability/auto_instrumentation
[2]: /ko/llm_observability/instrument/sdk
[3]: /ko/llm_observability/setup/api
[4]: /ko/llm_observability/instrument/api/?tab=model#spans-api
[5]: /ko/llm_observability/instrument/api/?tab=model#evaluations-api
[6]: /ko/llm_observability/instrument/sdk#command-line-setup
[7]: /ko/llm_observability/instrument/sdk#in-code-setup