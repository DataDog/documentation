---
aliases:
- /ko/llm_observability/experiments_preview
- /ko/llm_observability/experiments/
description: Agent Observability 실험 기능 개요.
further_reading:
- link: /llm_observability/improve/experiments/setup
  tag: 설명서
  text: Agent Observability 실험 설정 및 사용
- link: https://www.datadoghq.com/blog/llm-experiments/
  tag: 블로그
  text: Datadog을 사용하여 LLM 실험을 생성하고 모니터링하기
- link: https://www.datadoghq.com/blog/llm-otel-semantic-convention
  tag: 블로그
  text: Datadog LLM Observability에서 OpenTelemetry GenAI 시맨틱 규칙 기본 지원하기
- link: https://www.datadoghq.com/blog/manage-ai-cost-and-performance-with-datadog/
  tag: 블로그
  text: 'AI ROI 향상하기: Datadog으로 비용, 성능 및 인프라를 연결하여 책임감 있게 확장하기'
- link: https://www.datadoghq.com/blog/llm-observability-at-datadog-nlq
  tag: 블로그
  text: LLM Observability로 NLQ 에이전트 디버깅 시간을 몇 시간에서 몇 분으로 단축하기
- link: https://www.datadoghq.com/blog/offline-llm-evaluations/
  tag: 블로그
  text: 'AI 에이전트 오프라인 평가하기: 모범 사례'
- link: https://www.datadoghq.com/blog/datadog-google-cloud-ai-stack/
  tag: 블로그
  text: Datadog을 통한 Google Cloud AI 스택 평가, 최적화 및 보안 강화하기
- link: https://www.datadoghq.com/blog/llm-experimentation-autoresearch/
  tag: 블로그
  text: autoresearch와 Agent Observability로 SQL 쿼리 최적화 에이전트의 정확도 59% 향상하기
- link: https://www.datadoghq.com/blog/from-traces-to-experiments-a-loop-for-improving-ai-agents/
  tag: 블로그
  text: '트레이스에서 실험까지: 반복적인 개선을 통해 AI 에이전트 성능 향상하기'
title: 실험
---
{{< img src="llm_observability/experiments/Experiments_LLMO.png" alt="Agent Observability, Experiment 보기. 제목: '9개 필드에 걸친 6개 실험 비교'. 여러 실험의 정확도, 정답 여부, 소요 시간, 예상 비용 및 기타 메트릭을 나타내는 선 그래프" style="width:100%;" >}}

Agent Observability [Experiments][1]는 LLM 애플리케이션 및 에이전트 구축의 전체 수명 주기를 지원합니다. 프롬프트, 모델, 공급자 또는 시스템 아키텍처의 변경 사항이 성능에 어떤 영향을 미치는지 이해하도록 돕습니다. 이 기능을 사용하면 다음을 수행할 수 있습니다.

- 데이터세트 생성 및 버전 관리
- 실험 실행 및 관리
- 결과 비교를 통한 영향 평가

## Cookbooks {#cookbooks}

LLM 실험으로 수행할 수 있는 작업에 대한 자세한 예시는 Datadog에서 제공하는 [Jupyter 노트북][2]을 참조하세요.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/llm/testing/experiments
[2]: https://github.com/DataDog/llm-observability/tree/main/experiments/notebooks