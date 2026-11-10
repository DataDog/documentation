---
aliases:
- /ko/llm_observability/monitoring/metrics/
description: Agent Observability 데이터에서 생성할 수 있는 유용한 메트릭에 대해 알아보세요.
further_reading:
- link: llm_observability/
  tag: 설명서
  text: Agent Observability에 대해 더 자세히 알아보세요.
- link: monitors/
  tag: 설명서
  text: 중요할 때 팀에게 알림을 보낼 수 있도록 모니터 생성 및 관리
- link: https://www.datadoghq.com/blog/llm-prompt-tracking
  tag: 블로그
  text: Datadog LLM Observability를 통해 LLM 프롬프트를 추적, 비교 및 최적화하세요.
- link: https://learn.datadoghq.com/courses/llm-obs-investigations
  tag: 학습 센터
  text: LLM Observability로 조사하기
title: Agent Observability 메트릭
---
Agent Observability로 애플리케이션을 계측한 후, 대시보드와 모니터에서 사용할 Agent Observability 메트릭에 액세스할 수 있습니다. 이러한 메트릭은 LLM 애플리케이션의 스팬 수, 오류 수, 토큰 사용량 및 지연 시간 측정값을 캡처합니다. 이 메트릭은 애플리케이션 트래픽의 100%를 기준으로 계산됩니다.

<div class="alert alert-info">
여기에서 <code>ml_obs.*</code> 이 페이지의 항목은 <a href="/metrics/">Datadog 메트릭</a>입니다. 이는 LLM 스팬(비용, 토큰, 지연 시간, 오류의 카운트 및 분포)에서 파생되어 시간 경과에 따른 LLM 애플리케이션의 측면을 설명하는 수치 값입니다. 이 메트릭은 100% 샘플링되며, 표준 <a href="/data_security/data_retention_periods/">Datadog 메트릭 보존</a> 정책(전체 세분성에서 15개월)을 따르고, 다른 Datadog 메트릭과 마찬가지로 대시보드, 모니터 및 노트북에서 쿼리할 수 있습니다.
<br><br>
이는 Agent Observability의 다른 두 가지 항목과는 구별됩니다.
<ul>
<li><strong>스팬별 운영 데이터</strong>(각 개별 트레이스나 스팬의 비용, 토큰, 지연 시간, 오류): 이러한 메트릭이 집계되는 원시 값입니다. 스팬과 함께 저장되며 <a href="/llm_observability/data_governance/#traces-and-spans">Agent Observability 트레이스 보존</a> 정책을 따르고, 메트릭이 아닌 Traces 탐색기에서 쿼리됩니다.</li>
<li><strong><a href="/llm_observability/investigate/evaluations/">평가 점수</a></strong>(\"evals\"라고도 함): 개별 스팬이나 실험 행에 첨부된 품질 및 안전성 판단(예: 환각, 충실도, 사용자 지정 LLM-as-a-judge)입니다. 이는 운영 텔레메트리에서 파생되지 않으며, Datadog 메트릭 보존 정책이 아닌 <a href="/llm_observability/data_governance/">Agent Observability 트레이스 및 실험 보존</a>를 따릅니다.</li>
</ul>
</div>

<div class="alert alert-info">스팬에 설정된 다른 태그는 Agent Observability 메트릭의 태그로 사용할 수 없습니다.</div>

### 스팬 메트릭 {#span-metrics}

| 메트릭 이름 | 설명 | 메트릭 유형 | 태그 |
|-------------|-------------|-------------|------|
| `ml_obs.span` | 특정 스팬 종류의 총 개수 | 개수 | `env`, `error`, `ml_app`, `model_name`, `model_provider`, `service`, `span_kind`, `version` |
| `ml_obs.span.duration` | 스팬의 총 지속 시간(초 단위) | 분포 | `env`, `error`, `ml_app`, `model_name`, `model_provider`, `service`, `span_kind`, `version` |
| `ml_obs.span.error` | 스팬에서 발생한 오류 수 | 개수 | `env`, `error`, `ml_app`, `model_name`, `model_provider`, `service`, `span_kind`, `version` |

### LLM 토큰 메트릭 {#llm-token-metrics}

| 메트릭 이름 | 설명 | 메트릭 유형 | 태그 |
|-------------|-------------|-------------|------|
| `ml_obs.span.llm.input.tokens` | LLM으로 전송된 입력의 토큰 수 | 분포 | `env`, `error`, `ml_app`, `model_name`, `model_provider`, `service`, `version`, `matched_model_name`, `matched_model_provider` |
| `ml_obs.span.llm.output.tokens` | 출력의 토큰 수 | 분포 | `env`, `error`, `ml_app`, `model_name`, `model_provider`, `service`, `version`, `matched_model_name`, `matched_model_provider` |
| `ml_obs.span.llm.output.reasoning.tokens` | 출력의 추론 토큰 수 | 분포 | `env`, `error`, `ml_app`, `model_name`, `model_provider`, `service`, `version`, `matched_model_name`, `matched_model_provider` |
| `ml_obs.span.llm.prompt.tokens` | 프롬프트에 사용된 토큰 수 | 분포 | `env`, `error`, `ml_app`, `model_name`, `model_provider`, `service`, `version`, `matched_model_name`, `matched_model_provider` |
| `ml_obs.span.llm.completion.tokens` | 스팬 동안 완료(completion)로 생성된 토큰 | 분포 | `env`, `error`, `ml_app`, `model_name`, `model_provider`, `service`, `version`, `matched_model_name`, `matched_model_provider` |
| `ml_obs.span.llm.total.tokens` | 스팬 동안 소비된 총 토큰 수(입력+출력+프롬프트) | 분포 | `env`, `error`, `ml_app`, `model_name`, `model_provider`, `service`, `version`, `matched_model_name`, `matched_model_provider` |
| `ml_obs.span.llm.input.cache_write.tokens` | LLM 스팬에서 프롬프트 캐시에 기록된 입력 토큰 수 | 분포 | `env`, `error`, `ml_app`, `model_name`, `model_provider`, `service`, `version`, `matched_model_name`, `matched_model_provider` |
| `ml_obs.span.llm.input.cache_read.tokens` | LLM 스팬에서 프롬프트 캐시로부터 제공된 입력 토큰 수 | 분포 | `env`, `error`, `ml_app`, `model_name`, `model_provider`, `service`, `version`, `matched_model_name`, `matched_model_provider` |
| `ml_obs.span.llm.input.non_cached.tokens` | LLM 스팬에서 프롬프트 캐시와 상호작용하지 않은 입력 토큰 수 | 분포 | `env`, `error`, `ml_app`, `model_name`, `model_provider`, `service`, `version`, `matched_model_name`, `matched_model_provider` |
| `ml_obs.span.llm.input.characters` | LLM으로 전송된 입력의 문자 수 | 분포 | `env`, `error`, `ml_app`, `model_name`, `model_provider`, `service`, `version`, `matched_model_name`, `matched_model_provider` |
| `ml_obs.span.llm.output.characters` | 출력의 문자 수 | 분포 | `env`, `error`, `ml_app`, `model_name`, `model_provider`, `service`, `version`, `matched_model_name`, `matched_model_provider` |

### 임베딩 메트릭 {#embedding-metrics}

| 메트릭 이름 | 설명 | 메트릭 유형 | 태그 |
|-------------|-------------|-------------|------|
| `ml_obs.span.embedding.input.tokens` | 임베딩 생성에 사용된 입력 토큰 수 | 분포 | `env`, `error`, `ml_app`, `model_name`, `model_provider`, `service`, `version`, `matched_model_name`, `matched_model_provider` |

### LLM 비용 메트릭 {#llm-cost-metrics}

<div class="alert alert-info">
Agent Observability 을 위한 추정 비용 메트릭의 단위는 <strong>나노달러</strong>입니다.
</div>

| 메트릭 이름 | 설명 | 메트릭 유형 | 태그 |
|-------------|-------------|-------------|------|
| `ml_obs.span.llm.input.cost` | LLM 스팬 추정 입력 비용 | 분포 | `env`, `error`, `ml_app`, `model_name`, `model_provider`, `service`, `version`, `source`, `matched_model_name`, `matched_model_provider` |
| `ml_obs.span.embedding.input.cost` | 임베딩 스팬 추정 입력 비용 | 분포 | `env`, `error`, `ml_app`, `model_name`, `model_provider`, `service`, `version`, `source`, `matched_model_name`, `matched_model_provider` |
| `ml_obs.span.llm.output.reasoning.cost` | LLM 스팬 예상 추론 출력 비용 | 분포 | `env`, `error`, `ml_app`, `model_name`, `model_provider`, `service`, `version`, `source`, `matched_model_name`, `matched_model_provider` |
| `ml_obs.span.llm.output.cost` | LLM 스팬 예상 출력 비용 | 분포 | `env`, `error`, `ml_app`, `model_name`, `model_provider`, `service`, `version`, `source`, `matched_model_name`, `matched_model_provider` |
| `ml_obs.span.llm.total.cost` | LLM 또는 임베딩 스팬 예상 총 비용 | 분포 | `env`, `error`, `ml_app`, `model_name`, `model_provider`, `service`, `version`, `source`, `matched_model_name`, `matched_model_provider` |
| `ml_obs.span.llm.input.cache_write.cost` | LLM 스팬 예상 캐시 쓰기 입력 비용 | 분포 | `env`, `error`, `ml_app`, `model_name`, `model_provider`, `service`, `version`, `source`, `matched_model_name`, `matched_model_provider` |
| `ml_obs.span.llm.input.cache_read.cost` | LLM 스팬 예상 캐시 읽기 입력 비용 | 분포 | `env`, `error`, `ml_app`, `model_name`, `model_provider`, `service`, `version`, `source`, `matched_model_name`, `matched_model_provider` |
| `ml_obs.span.llm.input.non_cached.cost` | LLM 스팬의 예상 비캐시 입력 비용 | 분포 | `env`, `error`, `ml_app`, `model_name`, `model_provider`, `service`, `version`, `source`, `matched_model_name`, `matched_model_provider` |

### 트레이스 메트릭 {#trace-metrics}

| 메트릭 이름 | 설명 | 메트릭 유형 | 태그 |
|-------------|-------------|-------------|------|
| `ml_obs.trace` | 트레이스 수 | 개수 | `env`, `error`, `ml_app`, `service`, `span_kind`, `version` |
| `ml_obs.trace.duration` | 모든 스팬에 걸친 모든 트레이스의 총 지속 시간 | 분포 | `env`, `error`, `ml_app`, `service`, `span_kind`, `version` |
| `ml_obs.trace.error` | 트레이스 중에 발생한 오류 수 | 개수 | `env`, `error`, `ml_app`, `service`, `span_kind`, `version` |

### 예상 사용량 메트릭 {#estimated-usage-metrics}

| 메트릭 이름 | 설명 | 메트릭 유형 | 태그 |
|-------------|-------------|-------------|------|
| `ml_obs.estimated_usage.llm.input.tokens` | 예상 사용 입력 토큰 수 | 분포 | `evaluation_name`, `ml_app`, `model_name`, `model_provider`, `model_server` |

### 지원 중단 메트릭 {#deprecated-metrics}

<div class="alert alert-warning">
다음 메트릭은 지원이 중단되었으며, 이전 버전과의 호환성을 위해서만 유지됩니다. Datadog은 모든 토큰 사용량 측정 사용 사례에 대해 지원이 중단되지 않은 토큰 메트릭을 사용할 것을 강력히 권장합니다.
</div>

| 메트릭 이름 | 설명 | 메트릭 유형 | 태그 |
|-------------|-------------|-------------|------|
| `ml_obs.estimated_usage.llm.output.tokens` | 예상 생성된 출력 토큰 수 | 분포 | `evaluation_name`, `ml_app`, `model_name`, `model_provider`, `model_server` |
| `ml_obs.estimated_usage.llm.total.tokens` | 총 예상 사용된 토큰(입력+출력) | 분포 | `evaluation_name`, `ml_app`, `model_name`, `model_provider`, `model_server` |

## 다음 단계 {#next-steps}

{{< whatsnext desc="Agent Observability 메트릭을 활용하세요." >}}
    {{< nextlink href="dashboards/" >}}Agent Observability 메트릭을 추적하고 상관관계를 분석할 대시보드를 생성하세요.{{< /nextlink >}}
    {{< nextlink href="monitors/create/" >}}알림 및 통지를 위한 모니터링을 생성하세요.{{< /nextlink >}}
{{< /whatsnext >}}


## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}