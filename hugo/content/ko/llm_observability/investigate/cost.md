---
aliases:
- /ko/llm_observability/monitoring/cost/
description: LLM 토큰 및 비용을 모니터링하세요.
title: 비용
---
{{< img src="llm_observability/ao_cost_overview.png" alt="Agent Observability의 Cost Overview." style="width:100%;" >}}

Agent Observability는 공급자의 공개 가격 책정 모델과 LLM/임베딩 스팬에 주석으로 추가된 토큰 수를 사용하여 각 LLM 요청의 예상 비용을 자동으로 계산합니다.

이 정보를 트레이스와 애플리케이션 전반에 걸쳐 집계하면 LLM 모델의 사용자 사용 패턴과 이러한 패턴이 전체 지출에 미치는 영향을 파악할 수 있습니다.

사용 사례:
- 모델, 요청 및 애플리케이션 수준에서 LLM 지출이 어디에서 발생하는지 확인하고 이해합니다.
- 시간에 따른 토큰 사용량 및 비용 변화를 추적하여 향후 청구 금액이 증가하지 않도록 사전에 대비합니다.
- 단일 화면에서 LLM 비용과 전체 애플리케이션 성능, 모델 버전, 모델 공급자 및 프롬프트 세부 정보의 연관성을 파악합니다.

## 비용 모니터링 설정 {#setting-up-cost-monitoring}

Datadog은 LLM 비용을 모니터링하는 두 가지 방법을 제공합니다.
- [자동](#automatic): [지원되는 LLM 공급자](#supported-providers)의 공개 요금 사용
- [수동](#manual): 사용자 지정 요금, 자체 호스팅 모델 또는 지원되지 않는 공급자의 경우 비용 값을 수동으로 입력

### 자동 {#automatic}
LLM 요청에 [지원되는 공급자 목록](#supported-providers)이 포함된 경우, Datadog은 다음을 기반으로 각 요청의 비용을 자동으로 계산합니다.

- [자동 계측][1] 또는 수동 사용자 주석을 통해 제공된 LLM/임베딩 스팬에 첨부된 토큰 수
- 모델 공급자의 공개 요금

### 수동 {#manual}
비용 정보를 수동으로 제공하려면 [SDK 참조][2] 또는 [API][3]에 설명된 계측 단계를 따르세요. 비용을 수동으로 설정할 때(예: `total_cost` 설정) 단위는 달러 단위여야 하지만, 단위는 나노달러로 저장됩니다.

<div class="alert alert-info">부분적인 비용 정보를 제공하면 Datadog은 누락된 정보를 추정하려고 시도합니다. 예를 들어 총비용은 제공하지만 입력/출력 비용 값은 제공하지 않은 경우, Datadog은 공급자의 요금과 스팬에 주석으로 추가된 토큰 값을 사용하여 입력/출력 비용 값을 계산합니다. 이로 인해 수동으로 제공한 총 비용과 Datadog이 계산한 입력/출력 비용의 합계가 일치하지 않을 수 있습니다. Datadog은 이러한 값이 다르더라도 사용자가 제공한 총 비용을 그대로 표시합니다.</div>

#### 토큰 수가 계산되는 방식 {#how-token-counts-are-calculated}
토큰 사용량 필드에는 다음 관계가 적용됩니다.
{{< img src="llm_observability/llm_token_relationships.png" alt="Agent Observability가 토큰 수를 계산하는 방식을 보여주는 다이어그램: total_tokens는 input_tokens와 output_tokens의 합계이며, input_tokens는 non_cached_input_tokens, cache_read_input_tokens 및 cache_write_input_tokens의 합계이고, reasoning_output_tokens는 output_tokens의 하위 집합입니다." style="width:100%;" >}}

토큰 필드의 모든 하위 구성 요소가 제공되면 Datadog이 상위 토큰 필드를 자동으로 계산하므로 별도로 전송할 필요가 없습니다.

예시는 다음과 같습니다.
- `input_tokens`는 `non_cached_input_tokens`, `cache_read_input_tokens` 및 `cache_write_input_tokens`에서 추론할 수 있습니다.
- `total_tokens`는 input_tokens 및 output_tokens에서 추론할 수 있습니다.

Datadog은 캐시 사용 정보가 있는 경우 항상 전체 캐시 토큰 내역을 제공할 것을 권장합니다. Datadog은 캐시된 입력 비용을 계산할 때 공급자별 캐시 읽기 및 캐시 쓰기 요금을 자동으로 적용합니다.

`input_tokens`만 제공되는 경우, Datadog은 모든 입력 토큰을 캐시되지 않은 입력 토큰으로 처리합니다. 캐시 내역의 일부만 제공하면 토큰 수가 부정확해지거나 비용에 불일치가 발생할 수 있습니다.

## 지원되는 공급자 {#supported-providers}
Datadog은 다음 지원되는 공급자에 대한 LLM 요청 비용을 해당 공급자의 공식 문서에 공개된 가격 정보를 사용하여 자동으로 계산합니다.

<div class="alert alert-info">Datadog은 텍스트 기반 모델에 대한 비용 모니터링만 지원합니다.</div>

Datadog은 OpenAI, Hugging Face, Gemini, Anthropic부터 OpenRouter에서 제공하는 모델에 이르기까지 [800개 이상의 모델][4]에 대한 추정 비용을 지원합니다.

## 메트릭 {#metrics}
비용 메트릭은 [Agent Observability 메트릭][5]에서 확인할 수 있습니다. Agent Observability 추정 비용 메트릭의 단위는 **나노달러**입니다. 

비용 메트릭에는 값의 출처를 나타내는 `source` 태그가 포함됩니다.
- `source:auto` — 자동 계산됨
- `source:user` — 수동 제공됨


## 비용 및 토큰 메트릭에 대한 사용자 지정 태그 {#custom-tags-on-cost-and-tokens-metrics}

Datadog의 LLM 비용 및 토큰 메트릭은 `model_name`, `model_provider`, `ml_app`과 같은 기본 제공 태그와 함께 제공됩니다. 애플리케이션 고유의 속성(예: 팀, 고객 등급 또는 기능)별로 LLM 비용을 분석하려면 스팬 태그의 하위 집합을 생성된 비용 및 토큰 메트릭의 사용자 지정 태그로 승격할 수 있습니다.

<div class="alert alert-info">사용자 지정 태그는 LLM <strong>비용</strong>(<code>ml_obs.span.* cost</code>) 및 <strong>토큰</strong>(<code>ml_obs.span.* tokens</code>) 메트릭에만 적용됩니다. 기타 스팬 메트릭(예: <code>ml_obs.span.duration</code>)은 영향을 받지 않습니다.</div>

### 작동 방식 {#how-it-works}

1. SDK의 `tags` 파라미터(또는 자동 계측)를 사용하여 비용을 분석하려는 속성으로 LLM 스팬에 태그를 지정합니다.
2. 동일한 주석에서 해당 태그 키를 `cost_tags`(Python) 또는 `costTags`(Node.js) 파라미터에 전달하여 비용 메트릭으로 전파할 태그 키를 표시합니다. 전체 계측 구문 및 타이밍 규칙은 [SDK 참조][7]에서 확인하세요.
3. 전파되면 해당 태그 키가 LLM 비용 및 토큰 메트릭에 태그로 표시됩니다. 대시보드, 모니터, 노트북, 트레이스 검색 등 Datadog 내에서 이러한 메트릭을 사용하는 모든 곳에서 사용할 수 있습니다.

<div class="alert alert-warning">값이 제한된 태그만 구성하세요(예: <code>team</code>, <code>customer_tier</code> 또는 <code>feature</code>). 값이 제한되지 않거나 카디널리티가 높은 태그(예: 사용자 ID 또는 요청 ID)는 완전히 지원되지 않으며 결과 메트릭에서 잘리거나 생략될 수 있습니다.</div>

### 사용 사례: 애플리케이션 속성별로 비용 필터링 및 그룹화 {#use-case-filter-and-group-spend-by-an-application-attribute}

사용자 지정 태그를 사용하여 기본 제공 메트릭 태그에 포함되지 않은 속성별로 비용을 분석합니다. `ml_obs.span.llm.total.cost`에 대한 대시보드 위젯을 만들고 `team`별로 그룹화하여 시간이 지남에 따라 어떤 팀의 LLM 사용량이 소비를 주도하는지 확인하세요. 또한 사용량이 임계값을 초과할 때 각 팀(또는 고객 등급, 기능, 환경)에 대해 개별적으로 경보가 발생하도록 동일한 쿼리에 메트릭 모니터를 구성하세요.

### 사용 사례: 프롬프트 캐싱 효과 추적 {#use-case-track-prompt-caching-effectiveness}

많은 LLM 공급자는 반복적인 처리를 줄이기 위해 재사용된 프롬프트 접두사를 캐시합니다. "prompt_version" 또는 "prompt_template_id"와 같은 프롬프트 식별자로 스팬에 태그를 지정하고 이러한 태그로 분류하면 다음을 수행할 수 있습니다.

- 프롬프트 변형이 공급자의 캐시를 얼마나 효과적으로 재사용하는지 비교합니다. 예를 들어 `ml_obs.span.llm.input.cache_read.tokens / ml_obs.span.llm.input.cache_write.tokens`  공식을 사용하여 캐시 히트를 추적합니다.
- 캐시를 채우지만 거의 재사용하지 않는 프롬프트를 식별합니다. 이는 일반적으로 불안정한 접두사나 과도한 무효화의 징후입니다.
- 접두사가 캐싱 대상이 되기에는 너무 짧거나 호출할 때마다 변경되어 캐시가 전혀 적용되지 않는 프롬프트를 찾아냅니다.
- 토큰 메트릭의 캐싱 성능 저하가 비용 증가로 이어지기 전에 경보를 받습니다.

{{< img src="llm_observability/cost_tags_cache.png" alt="사용자 지정 prompt_version 태그별로 그룹화된 캐시 읽기, 캐시 쓰기 및 캐시되지 않은 입력 토큰을 비교하는 대시보드입니다." style="width:100%;" >}}

## Agent Observability에서 비용 보기 {#view-costs-in-agent-observability}
Agent Observability에서 왼쪽 탐색 메뉴의 {{< ui >}}Cost{{< /ui >}}를 선택하여 _Cost Overview_를 엽니다. 이 페이지에는 선택한 기간 동안의 모든 LLM 애플리케이션, 공급자 및 모델에 걸친 예상 AI 지출이 표시됩니다.

Cost Overview에는 다음이 포함됩니다.
- {{< ui >}}Spend breakdown{{< /ui >}}: 이전 기간과 비교한 {{< ui >}}Total Estimated Spend{{< /ui >}}의 Sankey 다이어그램입니다. {{< ui >}}By app{{< /ui >}}, {{< ui >}}By provider{{< /ui >}} 또는 {{< ui >}}Custom Tags{{< /ui >}}를 선택하여 어떤 애플리케이션, 공급자 또는 [사용자 지정 태그](#custom-tags-on-cost-and-tokens-metrics)가 지출에 영향을 미치는지 분석할 수 있습니다. 각 항목에는 지출 금액, 전체 지출에서 차지하는 비중, 이전 기간 대비 변화가 표시됩니다.
- {{< ui >}}Cost Savings Opportunity{{< /ui >}}: 공급자의 프롬프트 캐시를 사용하지 않는 프롬프트 등 지출을 줄일 수 있는 구체적인 방법을 파악하는 [인사이트][8]입니다. 각 인사이트에는 영향을 받는 애플리케이션과 예상 절감액이 나열됩니다.
- {{< ui >}}Cost Trend{{< /ui >}}: 하나 또는 모든 애플리케이션에 걸친 지출 시계열입니다. 애플리케이션, 서비스, 모델 이름, 모델 공급자 또는 사용자 지정 태그별로 그룹화하고 필터를 추가하여 결과를 좁힐 수 있습니다.
- {{< ui >}}Wasted Spend{{< /ui >}}: 애플리케이션별로 분류된 실패한 호출, 저품질 응답 및 [인사이트][8]에서 발견된 문제에 대한 지출입니다.
- {{< ui >}}Cache Efficiency{{< /ui >}}: 프롬프트 캐싱으로 인한 순 절감액과 캐시 히트, 캐시 재사용률 및 캐시되지 않은 입력 비용입니다. 정확한 캐시 메트릭을 위해 전체 [캐시 토큰 분석](#how-token-counts-are-calculated) 정보를 제공해 주세요.

단일 애플리케이션의 비용을 조회하려면 Cost Overview Sankey 다이어그램에서 해당 애플리케이션을 클릭하세요. 또는 {{< ui >}}Applications{{< /ui >}}에서 선택하고 {{< ui >}}Cost{{< /ui >}} 탭을 여세요. 애플리케이션의 _Cost view_ 기능에는 다음이 포함됩니다.
- {{< ui >}}Filter{{< /ui >}}: Cost view를 특정 속성으로 범위를 좁히는 옵션
- {{< ui >}}Total Cost (Estimated){{< /ui >}} 및 {{< ui >}}Total Tokens{{< /ui >}}: 출력, 캐시되지 않은 입력, 캐시 읽기 입력, 캐시 쓰기 입력 및 임베딩 토큰을 포함한 토큰 유형별 요약 분석
- {{< ui >}}Cost Trend{{< /ui >}}: 모델, 공급자, 토큰 유형 또는 사용자 지정 태그별로 그룹화한 시간 경과에 따른 지출
- {{< ui >}}Most Expensive LLM Calls{{< /ui >}}: 가장 비용이 많이 드는 요청 목록

{{< img src="llm_observability/cost_tracking_trace_v2.png" alt="트레이스 세부 정보의 비용 데이터입니다." style="width:100%;" >}}

비용 데이터는 애플리케이션의 트레이스와 스팬에서도 제공되므로 요청(트레이스) 및 작업(스팬) 수준 모두에서 비용을 파악할 수 있습니다.
트레이스 또는 스팬을 클릭하면 전체 트레이스 및 각 개별 LLM 호출에 대한 비용 메트릭이 포함된 상세 사이드 패널 보기가 열립니다.
트레이스 보기 상단에 있는 배너에는 예상 비용 및 총 토큰을 포함하여 전체 트레이스에 대한 집계된 비용 정보가 표시됩니다. 이 값 위에 마우스를 올리면 입력 및 출력 토큰/비용의 세부 정보가 표시됩니다.

개별 LLM 스팬을 선택하면 해당 LLM 요청에 대한 유사한 비용 메트릭이 표시됩니다.

Traces 페이지에서 비용 관련 데이터를 쿼리하려면 왼쪽 {{< ui >}}Cost{{< /ui >}} 패싯을 사용하세요. 

또는 다음 스팬 속성을 직접 쿼리하세요.
- `@metrics.input_tokens` / `@metrics.estimated_input_cost`
- `@metrics.output_tokens` / `@metrics.estimated_output_cost`
- `@metrics.total_tokens` / `@metrics.estimated_total_cost`
- `@metrics.non_cached_input_tokens` / `@metrics.estimated_non_cached_input_cost`
- `@metrics.cache_read_input_tokens` / `@metrics.estimated_cache_read_input_cost`
- `@metrics.cache_write_input_tokens` / `@metrics.estimated_cache_write_input_cost`
- `@metrics.reasoning_output_tokens` / `@metrics.estimated_reasoning_output_cost`

## LLM 비용 모니터링 문제 해결 {#troubleshoot-llm-cost-monitoring}

LLM 비용 값이 트레이스에서 누락되었거나 부정확하게 나타나는 경우, 일반적인 원인 및 해결 방법은 다음 섹션을 참조하세요.

### 트레이스에 "PARTIAL COST" 또는 "COST UNAVAILABLE"이 표시됨 {#trace-shows-partial-cost-or-cost-unavailable}

트레이스의 각 LLM 스팬은 독립적으로 가격이 책정됩니다. 이 경고는 트레이스 내 하나 이상의 LLM 스팬에 비용 추정치가 누락된 경우 나타납니다.

- {{< ui >}}PARTIAL COST{{< /ui >}}: Datadog이 트레이스 내 일부 LLM 스팬에 대한 비용은 계산했지만 나머지는 계산하지 못했습니다. {{< ui >}}Estimated Cost{{< /ui >}} 값은 비용이 계산된 스팬의 비용만 합산한 값입니다.
- {{< ui >}}COST UNAVAILABLE{{< /ui >}}: Datadog이 트레이스 내 어떤 LLM 스팬에 대해서도 비용을 계산할 수 없었습니다.

경고 위로 마우스를 가져가면 영향을 받는 스팬의 수, 비용이 누락된 이유, 영향을 받는 스팬의 이름을 확인할 수 있습니다. 이유는 다음 범주 중 하나에 해당합니다.

#### 지원되지 않는 모델 공급자 {#unsupported-model-provider}

스팬의 LLM 모델 공급자가 [지원되는 공급자 목록](#supported-providers)에 없으므로 Datadog에서 적용할 공개 요금 정보가 없습니다.

해결 방법:
- 스팬의 `model_provider` 값이 지원되는 공급자 식별자와 일치하는지 확인합니다. [지원되는 공급자 목록](#supported-providers)을 참조하세요.
- 스팬에 비용 값을 수동으로 입력합니다. [SDK 참조][2] 또는 [API][3]를 참조하세요.

#### 지원되지 않는 모델 이름 {#unsupported-model-name}

LLM 공급자는 지원되지만 스팬의 `model_name` 값이 공급자의 [가격 책정 카탈로그][4]에 있는 어떤 항목과도 일치하지 않습니다. 이는 일반적으로 모델 이름의 철자가 틀렸거나, 약어로 되어 있거나, 내부 별칭을 사용한 경우에 발생합니다.

해결 방법:
- 스팬의 `model_name` 값을 공급자의 [가격 책정 카탈로그][4]에 있는 공식 이름과 일치하도록 업데이트합니다.
- 지원되는 모델의 비공개 배포 또는 사용자 지정 변형의 경우, 스팬에 비용 값을 수동으로 입력합니다. [SDK 참조][2] 또는 [API][3]를 참조하세요.

#### 토큰 수 정보 누락 {#missing-token-counts}

해당 스팬에 `input_tokens` 또는 `output_tokens` 주석이 없으므로 Datadog은 비용 계산을 위한 토큰 값을 가지고 있지 않습니다. (임베딩 스팬의 경우 `input_tokens`만 필요합니다.)

해결 방법:
- [자동 계측][1]의 경우, 사용 중인 공급자와 SDK 버전이 지원되는지 확인합니다.
- 수동 계측의 경우, 스팬에 입력 및 출력 토큰 수를 주석으로 추가합니다. [SDK 참조][2] 또는 [API][3]를 참조하세요.

### 프롬프트 캐싱이 활성화된 경우 비용이 부정확함 {#inaccurate-cost-when-prompt-caching-is-enabled}

스팬에 집계된 `input_tokens` 및 `output_tokens`만 포함되어 있고 `cache_read_input_tokens`, `cache_write_input_tokens` 또는 `non_cached_input_tokens`가 누락된 경우, Datadog은 전체 `input_tokens`에 표준 입력 요금을 적용합니다.

프롬프트 캐싱을 지원하는 공급자의 경우, 캐시 읽기, 캐시 쓰기 및 캐시되지 않은 입력에 대해 서로 다른 요금이 청구됩니다. 이러한 세부 정보가 없으면 입력 비용 계산이 부정확할 수 있습니다.

해결 방법:
- [자동 계측][1]의 경우, 사용 중인 공급자와 SDK 버전이 캐시 관련 토큰 수를 내보내는지 확인합니다.
- 수동 계측의 경우, `input_tokens` 외에도 `cache_read_input_tokens`, `cache_write_input_tokens` 및 `non_cached_input_tokens`를 주석으로 추가합니다. [SDK 참조][2] 또는 [API][3]를 참조하세요.

[1]: /ko/llm_observability/instrument/auto_instrumentation
[2]: /ko/llm_observability/instrument/sdk/?tab=python#monitoring-costs
[3]: /ko/llm_observability/instrument/api/#metrics
[4]: https://github.com/pydantic/genai-prices/tree/main?tab=readme-ov-file#providers
[5]: /ko/llm_observability/investigate/metrics/#llm-cost-metrics
[7]: /ko/llm_observability/instrument/sdk/#adding-custom-tags-to-cost-and-tokens-metrics
[8]: /ko/llm_observability/investigate/insights/