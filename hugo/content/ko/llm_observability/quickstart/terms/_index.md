---
aliases:
- /ko/tracing/llm_observability/core_concepts
- /ko/llm_observability/core_concepts
- /ko/tracing/llm_observability/span_kinds
- /ko/llm_observability/span_kinds
- /ko/llm_observability/terms/
description: 스팬, 트레이스, 평가를 포함한 Agent Observability 핵심 용어 및 개념에 대한 참조 가이드입니다.
further_reading:
- link: /llm_observability/setup
  tag: 설명서
  text: Agent Observability 설정 방법 알아보기
- link: /llm_observability/investigate/evaluations
  tag: 가이드
  text: Agent Observability에 대한 평가 옵션
title: Agent Observability 용어 및 개념
---
## 개요 {#overview}

Agent Observability UI는 대화 성능 문제 해결과 제품 전반 데이터의 상호 연관 분석을 위한 다양한 도구를 제공하여, 대규모 언어 모델(LLM)에서 발생하는 문제를 찾아 해결할 수 있도록 지원합니다.

| 개념 | 설명 |
|---|---|
| [스팬](#spans) | 스팬은 LLM 애플리케이션의 작업을 나타내는 작업 단위이며, 트레이스의 구성 요소입니다. |
| [트레이스](#traces) | 트레이스는 LLM 애플리케이션에서 요청을 처리하는 것과 관련된 작업을 나타내며, 하나 이상의 중첩된 스팬으로 구성됩니다. 루트 스팬은 트레이스의 첫 번째 스팬이며, 트레이스의 시작과 끝을 표시합니다. |
| [평가](#evaluations) | 평가는 LLM 애플리케이션의 성능을 측정하는 방법입니다. 예를 들어, 답변 실패나 주제 관련성과 같은 품질 검사는 LLM 애플리케이션에 대해 추적할 수 있는 다양한 유형의 평가입니다. |

## 스팬 {#spans}

스팬은 다음과 같은 특성으로 구성됩니다.

- 이름
- 시작 시간 및 지속 시간
- 오류 유형, 메시지 및 트레이스백
- LLM 프롬프트 및 완성과 같은 입력 및 출력
- 메타데이터(예: `temperature`, `max_tokens`와 같은 LLM 파라미터)
- 메트릭(예: `input_tokens` 및 `output_tokens`)
- 태그

### 스팬 종류 {#span-kinds}

Agent Observability는 스팬이 수행하는 작업 유형을 정의하는 *스팬 종류*별로 스팬을 분류합니다. 이를 통해 LLM 애플리케이션이 어떤 작업을 수행하고 있는지에 대한 더 세부적인 인사이트를 얻을 수 있습니다.

Agent Observability는 다음 스팬 종류를 지원합니다.

| 종류      | 의미   | 유효한 루트 스팬 여부   | 예시 |
|-----------|--------------|--------------|-------------|
| [LLM](#llm-span)      | LLM에 대한 호출입니다. | 예 | OpenAI GPT-4와 같은 모델에 대한 호출 |
| [워크플로](#workflow-span)  | LLM 호출 및 주변의 모든 컨텍스트 작업을 포함하는 미리 결정된 작업 시퀀스입니다. | 예 | URL을 받아 페이지 요약을 반환하는 서비스로, 페이지를 가져오기 위한 도구 호출, 일부 텍스트 처리 작업, 그리고 LLM 요약이 필요한 서비스 |
| [Agent](#agent-span)     | 일반적으로 중첩된 워크플로, LLM, 도구 및 작업 호출로 구성되는 자율 에이전트가 내리는 일련의 결정 및 작업입니다. | 예 | 고객 질문에 답변하는 챗봇
| [도구](#tool-span)      | LLM이 호출 인수를 생성하는 프로그램 또는 서비스에 대한 호출입니다. | 아니요 | 웹 검색 API 또는 계산기에 대한 호출 |
| [작업](#task-span)      | 외부 서비스 호출을 포함하지 않는 독립형 단계입니다. | 아니요 | 데이터 전처리 단계 |
| [임베딩](#embedding-span) | 임베딩을 반환하는 모델 또는 함수에 대한 호출입니다. | 아니요 | text-embedding-ada-002에 대한 호출 |
| [검색](#retrieval-span) | 외부 지식 베이스에서 데이터를 검색하는 작업입니다. | 아니요 | 순위가 지정된 문서 배열을 반환하는 벡터 데이터베이스에 대한 호출 |

코드 예시를 포함하여 애플리케이션에서 스팬을 생성하는 방법에 대한 지침은 Agent Observability SDK for Python 설명서의 [트레이싱 스팬][2]을 참조하세요.

#### LLM 스팬 {#llm-span}

LLM 스팬은 입력과 출력이 텍스트로 표현되는 LLM에 대한 호출을 나타냅니다.

트레이스에는 단일 LLM 스팬이 포함될 수 있으며, 이 경우 트레이스는 LLM 추론 작업을 나타냅니다.

LLM 스팬은 LLM에 대한 직접적인 호출을 나타내는 독립형 작업이므로 일반적으로 하위 스팬을 갖지 않습니다.

#### 워크플로 스팬 {#workflow-span}

워크플로 스팬은 *정적* 작업 시퀀스를 나타냅니다. 워크플로를 사용하여 LLM 호출을 도구 호출, 데이터 검색 및 기타 작업과 같은 지원 컨텍스트 작업과 함께 그룹화하세요.

워크플로 스팬은 표준 시퀀스로 구성된 트레이스의 루트 스팬인 경우가 많습니다. 예를 들어, 함수가 arXiv 논문 링크를 가져와 요약을 반환할 수 있습니다. 이 프로세스에는 논문을 가져오기 위한 도구 호출, 일부 텍스트 처리 작업 및 LLM 요약이 포함될 수 있습니다.

워크플로 스팬은 모든 스팬을 워크플로 시퀀스의 하위 단계를 나타내는 하위 스팬으로 가질 수 있습니다.

#### 에이전트 스팬 {#agent-span}

에이전트 스팬은 대규모 언어 모델이 입력에 기반하여 작업을 결정하고 실행하는 동적 작업 시퀀스를 나타냅니다. 예를 들어, 에이전트 스팬은 [ReAct Agent][1]에 의해 제어되는 일련의 추론 단계를 나타낼 수 있습니다.

에이전트 스팬은 자율 에이전트나 추론 에이전트를 나타내는 트레이스의 루트 스팬인 경우가 많습니다.

에이전트 스팬은 모든 스팬을 추론 엔진에 의해 조정되는 하위 단계를 나타내는 하위 스팬으로 가질 수 있습니다.

#### 도구 스팬 {#tool-span}

도구 스팬은 웹 API나 데이터베이스와 같은 외부 프로그램 또는 서비스를 호출하는 워크플로 또는 에이전트의 독립형 단계를 나타냅니다.

도구 스팬은 도구 실행을 나타내는 독립형 작업이므로 일반적으로 하위 스팬을 갖지 않습니다.

#### 작업 스팬 {#task-span}

작업 스팬은 LLM에 프롬프트가 제출되기 전의 데이터 새니타이징 단계와 같이 외부 서비스를 호출하지 않는 워크플로 또는 에이전트의 독립형 단계를 나타냅니다.

작업 스팬은 워크플로 또는 에이전트 내의 독립형 단계이므로 일반적으로 하위 스팬을 갖지 않습니다.

#### 임베딩 스팬 {#embedding-span}

임베딩 스팬은 도구 스팬의 하위 카테고리이며, 임베딩을 생성하기 위한 임베딩 모델 또는 함수에 대한 독립형 호출을 나타냅니다. 예를 들어, 임베딩 스팬을 사용하여 OpenAI의 임베딩 엔드포인트에 대한 호출을 추적할 수 있습니다.

임베딩 스팬은 작업 스팬을 하위 스팬으로 가질 수 있지만 일반적으로 하위 스팬을 갖지 않습니다.

#### 검색 스팬 {#retrieval-span}

검색 스팬은 도구 스팬의 하위 카테고리이며, 외부 지식 베이스에서 반환되는 문서 목록과 관련된 벡터 검색 작업을 나타냅니다. 예를 들어, 검색 스팬을 사용하여 벡터 저장소에 대한 유사도 검색을 추적함으로써 특정 주제에 대한 사용자 프롬프트를 보강하기 위한 관련 문서를 수집할 수 있습니다.

임베딩 스팬과 함께 사용하면 검색 스팬을 통해 검색 증강 생성(RAG) 작업에 대한 가시성을 확보할 수 있습니다.

검색 스팬은 독립형 검색 단계를 나타내므로 일반적으로 하위 스팬을 갖지 않습니다.

## 트레이스 {#traces}

Agent Observability는 다양한 복잡성을 가진 LLM 애플리케이션에 대한 관측 가능성을 지원합니다. 트레이스의 구조와 복잡성에 따라 Agent Observability의 다음 기능을 사용할 수 있습니다.

### LLM 추론 모니터링 {#llm-inference-monitoring}

LLM 추론 트레이스는 단일 LLM 스팬으로 구성됩니다.

{{< img src="llm_observability/llm-observability-llm-span.png" alt="단일 LLM 스팬" style="width:100%;" >}}

개별 LLM 추론을 트레이싱하면 기본적인 Agent Observability 기능을 활성화할 수 있으며, 다음 작업이 가능해집니다.

1. LLM 호출에 대한 입력 및 출력을 추적합니다.
2. LLM 호출에 대한 토큰 사용량, 오류율 및 지연 시간을 추적합니다.
3. 모델 및 모델 공급자별로 중요한 메트릭을 분석합니다.


자세한 예시는 LLM 호출을 생성하고 추적하는 방법을 보여주는 [LLM Monitoring Jupyter 노트북][7]을 참조하세요.

SDK는 특정 공급자에 대한 LLM 호출을 자동으로 캡처하는 통합 기능을 제공합니다. 자세한 내용은 [자동 계측][3]을 참조하세요. 지원되지 않는 LLM 공급자를 사용하는 경우 [애플리케이션을 수동으로 계측][4]해야 합니다.

### LLM 워크플로 모니터링 {#llm-workflow-monitoring}

워크플로 트레이스는 루트 워크플로 스팬과 그 안에 중첩된 LLM, 작업, 도구, 임베딩 및 검색 스팬으로 구성됩니다.

{{< img src="llm_observability/llm-observability-workflow-trace.png" alt="더 복잡한 LLM 워크플로를 시각화하는 트레이스" style="width:100%;" >}}

대부분의 LLM 애플리케이션에는 LLM 호출을 둘러싸고 전체 애플리케이션 성능에 큰 역할을 하는 작업(예: 외부 API에 대한 도구 호출 또는 전처리 작업 단계)이 포함되어 있습니다.

LLM 호출과 컨텍스트 작업 또는 도구 작업을 워크플로 스팬 아래에서 함께 트레이싱하면 더 세부적인 인사이트와 LLM 애플리케이션에 대한 더 전체적인 시야를 확보할 수 있습니다.

자세한 예시는 도구 호출과 LLM 호출을 포함하는 복잡한 정적 단계 시리즈를 생성하고 추적하는 방법을 보여주는 [LLM Monitoring Jupyter 노트북][8]을 참조하거나, RAG 워크플로를 생성, 추적 및 평가하는 방법을 보여주는 [LLM Monitoring Jupyter 노트북][10]을 참조하세요.

### LLM 에이전트 모니터링 {#llm-agent-monitoring}

에이전트 모니터링 트레이스는 루트 에이전트 스팬과 그 안에 중첩된 LLM, 작업, 도구, 임베딩, 검색 및 워크플로 스팬으로 구성됩니다.

{{< img src="llm_observability/llm-observability-agent-trace.png" alt="LLM 에이전트를 시각화하는 트레이스" style="width:100%;" >}}

LLM 애플리케이션에 정적 워크플로로는 캡처할 수 없는 의사 결정과 같은 복잡한 자율 로직이 있는 경우, LLM 에이전트를 사용하고 있을 가능성이 높습니다. 에이전트는 사용자 입력에 따라 여러 가지 다른 워크플로를 실행할 수 있습니다.

LLM 애플리케이션을 계측하여 단일 LLM 에이전트가 실행하는 모든 워크플로와 컨텍스트 작업을 에이전트 트레이스로 추적하고 그룹화할 수 있습니다.

자세한 예시는 도구를 호출하고 데이터를 기반으로 의사 결정을 내리는 LLM 기반 에이전트를 생성하고 추적하는 방법을 보여주는 [LLM Monitoring Jupyter 노트북][9]을 참조하세요.

## 평가 {#evaluations}

Agent Observability는 LLM 대화의 품질, 안전성 및 효과를 평가하기 위한 관리형 평가 및 품질 검사를 제공합니다. [평가][11]를 통해 대화 성능을 파악하고 LLM 애플리케이션의 응답을 향상시킬 수 있습니다. 이는 사용자 경험을 개선하고 가치 있고 정확한 출력을 보장합니다.

Datadog은 평가를 위한 다양한 옵션을 제공합니다.
- 트레이스에 [관리형 평가][12]를 사용합니다.
- Agent Observability에 [사용자 지정 평가를 제출][6]합니다.
- [NeMo][13]와 같은 프레임워크와 통합합니다.

또한 Datadog의 [Sensitive Data Scanner][5]는 Agent Observability와 기본적으로 통합되어 있어 입력 및 출력의 민감한 데이터가 스캔되고 수정되도록 보장할 수 있습니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://react-lm.github.io/
[2]: /ko/llm_observability/setup/sdk/?tab=model#tracing-spans
[3]: /ko/llm_observability/setup/auto_instrumentation/
[4]: /ko/llm_observability/setup/?tab=decorators#instrument-your-llm-application
[5]: /ko/security/sensitive_data_scanner/
[6]: /ko/llm_observability/investigate/evaluations/external_evaluations
[7]: https://github.com/DataDog/llm-observability/blob/main/1-llm-span.ipynb
[8]: https://github.com/DataDog/llm-observability/blob/main/2-workflow-span.ipynb
[9]: https://github.com/DataDog/llm-observability/blob/main/3-agent-span.ipynb
[10]: https://github.com/DataDog/llm-observability/blob/main/4-custom-evaluations.ipynb
[11]: /ko/llm_observability/investigate/evaluations/
[12]: /ko/llm_observability/investigate/evaluations/managed_evaluations
[13]: /ko/llm_observability/investigate/evaluations/external_evaluations/nemo