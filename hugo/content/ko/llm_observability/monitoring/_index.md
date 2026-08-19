---
description: Agent Observability에서 애플리케이션을 더 자세히 탐색하는 방법.
further_reading:
- link: https://learn.datadoghq.com/courses/llm-obs-investigations
  tag: 학습 센터
  text: Agent Observability로 조사
title: 모니터링
---
## 개요 {#overview}

트레이스, 클러스터 및 기타 리소스 전반에서 데이터를 쿼리, 시각화, 상관 분석 및 조사하기 위한 도구를 사용하여 프로덕션 환경의 LLM 애플리케이션을 탐색하고 분석합니다.

트레이스, 메트릭 및 온라인 평가 전반에 걸친 통합 가시성을 통해 LLM 기반 시스템의 성능을 모니터링하고, 이슈를 디버깅하며, 품질을 평가하고, 보안을 유지합니다.

### 실시간 성능 모니터링 {#real-time-performance-monitoring}

기본 제공 메트릭 및 대시보드로 LLM 애플리케이션의 운영 상태를 모니터링합니다.

{{< img src="llm_observability/index/llm_dashboard_light.png" alt="다양한 메트릭과 시각화를 보여주는 Agent Observability Operational Insights 대시보드입니다. 총 트레이스 및 스팬 수, 성공 및 오류율 등을 포함하는 개요 섹션과 모델 사용량의 도넛 차트, 호출당 평균 입력 및 출력 토큰 등을 포함하는 LLM 호출 섹션이 있습니다." style="width:100%">}}

- **요청 볼륨 및 지연 시간**: 다양한 모델, 작업 및 엔드포인트 전반에서 초당 요청 수, 응답 시간 및 성능 병목 현상을 추적합니다.
- **오류 추적**: 상세한 오류 컨텍스트와 함께 HTTP 오류, 모델 시간 초과 및 실패한 요청을 모니터링합니다.
- **토큰 소비**: 비용 최적화를 위해 프롬프트 토큰, 캐시된 토큰, 완료 토큰 및 총 사용량을 추적합니다.
- **모델 사용 분석**: 어떤 모델이 호출되는지, 호출 빈도 및 성능 특성을 모니터링합니다.

기본 제공되는 [Agent Observability Operational Insights 대시보드][6]는 트레이스 수준 및 스팬 수준 메트릭, 오류율, 지연 시간 분석, 토큰 소비 추세 및 트리거된 모니터에 대한 통합 보기를 제공합니다.

### 프로덕션 디버깅 및 문제 해결 {#production-debugging-and-troubleshooting}

상세한 실행 가시성을 통해 복잡한 LLM 워크플로를 디버깅합니다.

{{< img src="llm_observability/index/llm_trace_light.png" alt="각 서비스 호출을 시각적으로 나타내는 플레임 그래프가 포함된 Agent Observability의 트레이스 상세 보기입니다. 'OpenAI.createResponse'가 선택되어 있으며, 입력 메시지와 출력 메시지를 포함한 상세 스팬 보기가 표시됩니다." style="width:100%">}}

- **엔드투엔드 트레이스 분석**: 사용자 입력부터 모델 호출, 도구 호출, 응답 생성에 이르는 전체 요청 흐름을 시각화합니다.
- **스팬 수준 디버깅**: 전처리 단계, 모델 호출 및 후처리 로직을 포함하여 체인 내의 개별 작업을 검사합니다.
- **오류 근본 원인 파악**: 상세한 오류 컨텍스트 및 타이밍 정보를 사용하여 다단계 체인, 워크플로 또는 에이전틱 작업에서 실패 지점을 정확히 찾아냅니다.
- **성능 병목 현상 식별**: 워크플로 구성 요소 전반의 지연 시간 분석을 기반으로 느린 작업을 찾아 최적화합니다.

### 품질 및 안전 평가 {#quality-and-safety-evaluations}

{{< img src="llm_observability/index/llm_example_eval_light.png" alt="Agent Observability의 Evaluations 탭에 있는 스팬의 상세 보기입니다. 'Confirmed Contradiction'이 표시된 평가, 플래그가 지정된 출력, 컨텍스트 인용문, 플래그가 지정된 이유에 대한 설명을 표시합니다." style="width:100%">}}

온라인 평가를 통해 LLM Agent나 애플리케이션이 품질 표준을 충족하는지 확인하세요. Datadog 호스팅 및 관리형 평가, 사용자 지정 평가 수집, 안전 모니터링 기능에 대한 포괄적인 정보는 [평가 문서][5]를 참조하세요.

### LLM 애플리케이션의 트레이스 및 스팬 쿼리 {#query-your-llm-applications-traces-and-spans}

{{< img src="llm_observability/index/llm_query_example_light.png" alt="Agent Observability > Traces 뷰에서 사용자가 ml_app:shopist-chat-v2 'purchase' -'discount' @trace.total_tokens:>=20 쿼리를 입력한 화면 및 여기에 표시된 여러 트레이스." style="width:100%">}}

Agent Observability 쿼리 인터페이스를 사용하여 LLM 애플리케이션에서 생성된 트레이스 및 스팬을 검색, 필터링 및 분석하는 방법을 알아보세요. [쿼리 문서][1]에서는 다음 방법을 다룹니다.

- 검색 창을 사용하여 모델, 사용자 또는 오류 상태와 같은 속성별로 트레이스 및 스팬을 필터링합니다.
- 고급 필터를 적용하여 특정 LLM 작업이나 기간에 집중합니다.
- 트레이스 세부 정보를 시각화하고 검사하여 LLM 워크플로를 문제 해결하고 최적화합니다.

이를 통해 이슈를 신속하게 식별하고, 성능을 모니터링하며, 프로덕션 환경에서 LLM 애플리케이션의 동작에 대한 통찰력을 얻을 수 있습니다.


### APM과 Agent Observability 상관관계 분석 {#correlate-apm-and-agent-observability}

{{< img src="llm_observability/index/llm_apm_example_light.png" alt="Datadog APM의 트레이스입니다. 개요 탭에 LLM Observability라는 섹션이 표시되어 있고, Agent Observability에 스팬을 볼 수 있는 링크와 입력 및 출력 텍스트가 포함되어 있습니다." style="width:100%">}}

Datadog APM으로 계측된 애플리케이션의 경우 SDK를 통해 [APM과 Agent Observability를 상호 연계][2]할 수 있습니다. APM과 Agent Observability를 상호 연계하면 애플리케이션 이슈부터 LLM 관련 근본 원인까지 전 과정을 파악하고 철저한 분석이 가능합니다.

### 패턴 {#patterns}

{{< img src="llm_observability/Patterns.png" alt="계층적 주제와 점수 및 볼륨을 표시하는 패턴 페이지입니다. 클러스터링된 상호작용 수, 식별된 주제 수, 클러스터링된 상호작용의 비율(백분율)을 보여주는 세 개의 KPI도 확인할 수 있습니다." style="width:100%">}}

[패턴][3]은 LLM 애플리케이션의 프로덕션 트래픽을 계층적 주제로 자동 클러스터링하여 사용자가 무엇을 묻는지 파악하고, 평가 데이터 세트의 커버리지 격차를 식별하며, 실패 모드를 진단하도록 돕습니다.

### 에이전틱 시스템 모니터링 {#monitor-your-agentic-sytems}

Datadog의 [Agent Monitoring][4]을 사용하여 여러 도구나 추론 체인을 사용하는 에이전틱 LLM 애플리케이션을 모니터링하는 방법을 알아보세요. 이 기능은 Agent 작업, 도구 사용 및 추론 단계를 추적하여 복잡한 LLM 워크플로에 대한 가시성을 제공하고 에이전틱 시스템을 효과적으로 문제 해결 및 최적화할 수 있도록 지원합니다. 자세한 내용은 [Agent Monitoring 문서][4]를 참조하세요.

### Prompt Management {#prompt-management}

[Prompt Management][7]는 LLM 애플리케이션에서 사용하는 프롬프트를 위한 중앙 집중식 레지스트리를 제공합니다. Datadog, Python SDK 또는 API를 통해 프롬프트를 생성 및 버전 관리하고, 런타임에 SDK로 검색할 수 있습니다. 이를 통해 프롬프트 반복 작업을 애플리케이션 배포 주기와 분리할 수 있습니다. 자세한 내용은 [Prompt Management 문서][7]를 참조하세요.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/llm_observability/monitoring/querying
[2]: /ko/llm_observability/monitoring/llm_observability_and_apm
[3]: /ko/llm_observability/monitoring/patterns/
[4]: /ko/llm_observability/monitoring/agent_monitoring
[5]: /ko/llm_observability/evaluations/
[6]: https://app.datadoghq.com/dash/integration/llm_operational_insights?fromUser=false&refresh_mode=sliding&from_ts=1758905575629&to_ts=1758909175629&live=true
[7]: /ko/llm_observability/monitoring/prompt_management