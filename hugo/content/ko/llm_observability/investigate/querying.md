---
aliases:
- /ko/llm_observability/monitoring/querying/
description: Trace Explorer에서 Agent Observability 스팬과 트레이스를 쿼리하는 방법(특성, 태그, 트레이스 수준
  속성으로 검색하는 방법 포함)을 알아보세요.
further_reading:
- link: tracing/trace_explorer/query_syntax/
  tag: 설명서
  text: Trace Explorer 쿼리 구문
- link: https://learn.datadoghq.com/courses/llm-obs-investigations
  tag: 학습 센터
  text: Agent Observability로 조사
title: 스팬 및 트레이스 쿼리
---
## 개요 {#overview}
이 페이지에서는 Datadog의 [Agent Observability Trace Explorer][1]를 사용하여 LLM 애플리케이션의 스팬과 트레이스를 쿼리하는 방법에 대해 설명합니다.

#### 스팬 쿼리와 트레이스 쿼리 비교{#querying-across-spans-versus-traces}
Agent Observability에서 _스팬_은 LLM 애플리케이션에서 단일 작업을 나타내는 단위입니다. _트레이스_는 LLM 애플리케이션에서 요청을 처리하는 것과 관련된 엔드투엔드 작업을 나타내며, 종종 하나 이상의 중첩된 스팬으로 구성됩니다. 이 용어에 대한 자세한 내용은 [Agent Observability 용어 및 개념][2]을 참조하세요.

[Agent Observability Trace Explorer][1]에서 트레이스 또는 스팬 중에서 검색 대상을 선택합니다.
- 루트 스팬이 쿼리와 일치하는 트레이스를 찾으려면 {{< ui >}}Traces{{< /ui >}}를 선택합니다.
- 중첩된 하위 스팬을 포함한 모든 스팬을 검색하려면 {{< ui >}}Spans{{< /ui >}}를 선택합니다.

일부 검색어는 트레이스에만 적용됩니다. 예시는 [트레이스 수준 쿼리](#trace-level-queries)를 참조하세요.

### 특성으로 쿼리 {#query-by-attribute}
_스팬 특성_은 각 스팬에 직접 연결된 키-값 쌍입니다. 특성은 성능 메트릭, 리소스 식별자, 파라미터 값 등 스팬 실행에 대한 세부 정보를 캡처합니다.

특성 쿼리는 `@key:value` 형식을 취합니다. 모든 특성 키 앞에는 `@` 기호가 붙습니다.

| 쿼리 | 일치 항목 |
| ----- | ----- |
| `@duration:>5s` | 완료하는 데 5초 이상 걸린 스팬 |

### 태그로 쿼리 {#query-by-tag}
_스팬 태그_는 스팬, 서비스, 환경 전반에 걸쳐 텔레메트리 데이터를 그룹화, 분할 및 상호 연관시키는 데 사용되는 키-값 쌍입니다. 태그는 종종 애플리케이션 이름, 환경 또는 배포 지역과 같은 더 넓은 컨텍스트를 나타내며, 효율적인 검색 및 집계를 용이하게 하기 위해 스팬에 연결됩니다.

태그 쿼리는 `key:value` 형식을 취합니다. 특성 키와 달리 태그 키 앞에는 `@` 기호가 붙지 않습니다.

| 쿼리 | 일치 항목 |
| ----- | ----- |
| `ml_app:my_llm_app` | 이름이 `my_llm_app` |인 애플리케이션의 스팬

### LLM 입력 및 출력 쿼리 {#query-llm-input-and-output}
자유 텍스트 쿼리를 사용하여 입력 또는 출력 쌍이 있는 모든 스팬에서 특정 키워드, 구문 또는 문자열을 검색할 수도 있습니다. 자유 텍스트 검색을 사용하려면 쿼리를 `"`로 래핑하세요.

| 쿼리 | 일치 항목 |
| ----- | ----- |
| `"what's the weather"` | 입력 또는 출력에 `what's the weather` 문자열을 포함하는 에이전트, 워크플로 또는 LLM 스팬 |

<div class="alert alert-info">자유 텍스트 쿼리는 스팬 입력 또는 출력의 처음 20,500자로 제한됩니다.</div>

### 연산자 {#operators}

`AND`(교집합), `OR`(합집합) 및 `-`(차집합) 불리언 연산자를 사용하여 여러 검색어를 결합할 수 있습니다.

| 쿼리 | 일치 항목 |
| ----- | ----- |
| `@duration:>5s AND -"foo"` | 완료하는 데 5초 이상 걸렸으며 입력 또는 출력에 `foo` 문자열을 **포함하지 않는** 스팬 |

### 쿼리 구문 {#query-syntax}

Agent Observability Trace Explorer는 Datadog의 [APM Trace Explorer][6]와 동일한 쿼리 구문을 사용합니다. 와일드카드 검색, 숫자 값 처리, 특수 문자 이스케이프 등을 포함한 쿼리 구문에 대한 자세한 내용은 [Trace Explorer 쿼리 구문][6]을 참조하세요.

## 쿼리 예시 {#example-queries}

| 쿼리 | 일치 항목 |
| ----- | ----- |
| `@status:error` | 상태가 `error` |인 스팬 또는 트레이스
| `@meta.error.type:"Max turns exceeded"` | 오류 유형이 `Max turns exceeded` |인 스팬 또는 트레이스
| `@duration:>5s` | 완료하는 데 5초 이상 걸린 스팬 또는 트레이스|
| `@trace.total_tokens:>=1000` | 총 1000개 이상의 토큰을 소비한 트레이스|
| `ml_app:my_llm_app` | 이름이 `my_llm_app` |인 애플리케이션의 스팬 또는 트레이스
| `"what's the weather"` | 입력 또는 출력에 `what's the weather` 문자열을 포함하는 에이전트, 워크플로 또는 LLM 스팬 |

### 평가 쿼리 {#evaluation-queries}

`@evaluation` 특성을 사용하여 [평가][3] 결과별로 스팬 또는 트레이스를 찾으세요.

#### 평가 {#evaluations}
[평가][4] 결과별로 스팬을 검색할 수 있습니다. 예를 들어, `user_mood`라는 평가가 있고, 범주형 값에 `happy`, `sad`, `tired`가 있는 경우, `@evaluation.user_mood.value:happy` 쿼리를 사용할 수 있습니다.

| 쿼리 | 일치 항목 |
| ----- | ----- |
| `@evaluation.user_satisfaction.value:>5` | `user_satisfaction` |이라는 평가에 따라 5점보다 높은 점수를 받은 스팬 또는 트레이스
| `@evaluation.user_mood.value:happy` | `user_mood`라는 평가(범주형 값에 `happy`, `sad`, `tired` |가 있음)에 따라 `happy`로 평가된 스팬 또는 트레이스

### 피드백 쿼리 {#feedback-queries}

`@feedback` 특성을 사용하여 [최종 사용자 피드백][8] 제출별로 스팬 또는 트레이스를 찾으세요. 예를 들어, 사용자가 `user_satisfaction` 레이블에 범주형 값 `thumbs_up` 또는 `thumbs_down`을 사용하여 피드백을 제출하는 경우 `@feedback.user_satisfaction.value:thumbs_down` 쿼리를 사용할 수 있습니다.

| 쿼리 | 일치 항목 |
| ----- | ----- |
| `@feedback.user_satisfaction.value:thumbs_down` | `user_satisfaction` |이라는 피드백 레이블에 대해 '싫어요' 평가를 받은 스팬 또는 트레이스
| `@feedback.user_comment.assessment:fail` | `user_comment` |라는 피드백 레이블에 대해 평가 실패를 기록한 스팬 또는 트레이스
| `@feedback.user_score.value:<2` | `user_score` |라는 피드백 레이블에 대해 2점 미만의 점수를 받은 스팬 또는 트레이스

### 메타데이터 쿼리 {#metadata-queries}

`@meta` 특성을 사용하여 메타데이터 정보별로 스팬을 찾으세요.

| 쿼리 | 일치 항목 |
| ----- | ----- |
| `@meta.span.kind:llm` | `llm` [_스팬 종류_][5]의 스팬. |
| `@meta.model_provider:openai` | 모델 공급자가 OpenAI인 스팬 또는 트레이스 |
| `@meta.model_name:gpt-4.1` | 모델이 GPT-4.1인 스팬 또는 트레이스 |

#### 사용자 지정 메타데이터 {#custom-metadata}

계측 중에 첨부된 [사용자 지정 메타데이터 필드][7]별로 스팬 및 트레이스를 쿼리할 수 있습니다. 사용자 지정 메타데이터 필드는 `@meta.metadata.<key>`에서 액세스할 수 있습니다.

| 쿼리 | 일치 항목 |
| ----- | ----- |
| `@meta.metadata.config.debug_mode:false` | 사용자 지정 메타데이터 필드 `config.debug_mode`가 `false` |로 설정된 스팬 또는 트레이스
| `@meta.metadata.job_id:job_14fb81c3` | 사용자 지정 메타데이터 필드 `job_id`가 `job_14fb81c3` |으로 설정된 스팬 또는 트레이스

### 트레이스 수준 쿼리 {#trace-level-queries}

중첩된 스팬의 특성을 기반으로 트레이스를 검색하려면 `@child` 특성을 사용하세요.

| 쿼리 | 일치 항목 |
| ----- | ----- |
| `@child.@evaluation.hallucination.value:"hallucination found"` | 환각(hallucination) 하위 스팬이 있는 트레이스 |
| `@child.@meta.span.kind:retrieval AND @meta.span.kind:workflow`| 검색 스팬을 포함하는 워크플로 트레이스 |

`@trace` 특성을 사용하여 예상 총 비용, LLM 호출 수 또는 도구 수와 같은 트레이스 수준 정보에 액세스하세요.

| 쿼리 | 일치 항목 |
| ----- | ----- |
| `@trace.llm_calls:>3` | LLM 호출이 3회 이상인 트레이스 |
| `@trace.tool_calls:>=4` | 도구 호출이 4회 이상인 트레이스 |
| `@trace.number_of_tools:<5` | 5개 미만의 서로 다른 도구를 호출하는 트레이스 |

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/llm/traces
[2]: /ko/llm_observability/quickstart/terms/
[3]: /ko/llm_observability/investigate/evaluations/
[4]: /ko/llm_observability/investigate/evaluations/external_evaluations
[5]: /ko/llm_observability/quickstart/terms/#span-kinds
[6]: /ko/tracing/trace_explorer/query_syntax/
[7]: /ko/llm_observability/instrument/sdk/#annotating-metadata
[8]: /ko/llm_observability/investigate/evaluations/end_user_feedback