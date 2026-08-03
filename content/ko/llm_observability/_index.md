---
aliases:
- /ko/tracing/llm_observability/
further_reading:
- link: https://www.datadoghq.com/blog/llm-observability-at-datadog-dashboards
  tag: 블로그
  text: Datadog LLM Observability로 안정적인 대시보드 에이전트 구축
- link: https://www.datadoghq.com/blog/manage-ai-cost-and-performance-with-datadog/
  tag: 블로그
  text: 'AI ROI 향상: Datadog이 비용, 성능 및 인프라를 연결하여 책임감 있게 확장할 수 있도록 지원하는 방법'
- link: https://www.datadoghq.com/blog/llm-otel-semantic-convention
  tag: 블로그
  text: Datadog LLM Observability는 OpenTelemetry GenAI 시맨틱 규칙을 기본적으로 지원합니다.
- link: https://www.datadoghq.com/blog/llm-aws-strands
  tag: 블로그
  text: Datadog LLM Observability로 Strands Agents 워크플로 가시성 확보
- link: https://www.datadoghq.com/blog/anthropic-integration-datadog-llm-observability/
  tag: 블로그
  text: Datadog LLM Observability로 Anthropic 애플리케이션 모니터링
- link: https://www.datadoghq.com/blog/monitor-llm-prompt-injection-attacks/
  tag: 블로그
  text: 민감한 데이터를 보호하기 위한 LLM 프롬프트 인젝션 공격 모니터링 모범 사례
- link: https://www.datadoghq.com/blog/vllm-integration/
  tag: 블로그
  text: Datadog의 vLLM 통합으로 LLM 애플리케이션 성능 최적화
- link: https://www.datadoghq.com/blog/datadog-gpu-monitoring/
  tag: 블로그
  text: Datadog GPU Monitoring으로 AI 인프라 최적화 및 문제 해결
- link: https://www.datadoghq.com/blog/llm-observability-bedrock-agents/
  tag: 블로그
  text: Datadog LLM Observability로 Amazon Bedrock 기반 에이전트 모니터링
- link: https://www.datadoghq.com/blog/monitor-mcp-servers/
  tag: 블로그
  text: MCP 서버의 일반적인 보안 위험 식별
- link: https://www.datadoghq.com/blog/detect-abuse-ai-infrastructure/
  tag: 블로그
  text: 'AI 인프라 남용: 잘못 관리된 자격 증명과 리소스가 LLM 애플리케이션을 노출시키는 방식'
- link: https://www.datadoghq.com/blog/llm-observability-at-datadog-nlq
  tag: 블로그
  text: LLM Observability를 통해 NLQ 에이전트 디버깅 시간을 몇 시간에서 몇 분으로 단축한 방법
- link: https://learn.datadoghq.com/courses/llm-obs-tracing-llm-applications
  tag: 학습 센터
  text: LLM 애플리케이션 추적
title: LLM Observability
---
{{< learning-center-callout header="학습 센터에서 LLM Observability 시작해 보기" btn_title="지금 등록" btn_url="https://learn.datadoghq.com/courses/llm-obs-getting-started">}}
  LLM 애플리케이션의 성능, 비용, 트레이스, 토큰 사용량 및 오류를 모니터링하여 문제를 식별하고 해결하는 방법을 배웁니다.
{{< /learning-center-callout >}}

## 개요 {#overview}

LLM Observability를 사용하면 챗봇과 같은 LLM 기반 애플리케이션을 모니터링, 문제 해결 및 평가할 수 있습니다. 문제의 근본 원인을 조사하고 운영 성능을 모니터링하며 LLM 애플리케이션의 품질, 개인정보 보호 및 안전성을 평가할 수 있습니다.

애플리케이션이 처리하는 각 요청은 Datadog의 [**LLM Observability** 페이지][1]에서 하나의 트레이스로 표현됩니다.

{{< img src="llm_observability/traces.png" alt="LLM Observability 페이지의 프롬프트-응답 쌍 트레이스 목록" style="width:100%;" >}}

트레이스는 다음 중 하나를 나타낼 수 있습니다.

- 토큰, 오류 정보 및 지연 시간을 포함한 개별 LLM 추론
- LLM 호출과 도구 호출, 전처리 단계 등의 관련 작업을 그룹화한 미리 정해진 LLM 워크플로
- LLM 에이전트가 실행하는 동적 LLM 워크플로

각 트레이스에는 에이전트의 의사결정 또는 워크플로의 각 단계를 나타내는 스팬이 포함됩니다. 주어진 트레이스는 입력 및 출력, 지연 시간, 개인정보 관련 문제, 오류 등을 포함할 수 있습니다. 자세한 내용은 [용어 및 개념][2]을 참조하세요.

## 종단 간 트레이스를 통해 문제 해결 {#troubleshoot-with-end-to-end-tracing}

문제가 있는 요청을 정확히 찾아내고 오류의 근본 원인을 식별하기 위해 LLM 애플리케이션 체인 및 호출 과정을 단계별로 확인하세요.

{{< img src="llm_observability/errors.png" alt="트레이스 사이드 패널의 Errors 탭에 있는 트레이스에서 발생한 오류" style="width:100%;" >}}

## 운영 메트릭 모니터링 및 비용 최적화 {#monitor-operational-metrics-and-optimize-cost}

모든 LLM 애플리케이션의 비용, 지연 시간, 성능 및 사용량 추세를 [기본 제공 대시보드][7]로 모니터링하세요.

{{< img src="llm_observability/dashboard_1.png" alt="Datadog의 기본 제공 LLM Observability 운영 인사이트 대시보드" style="width:100%;" >}}

## LLM 애플리케이션의 품질 및 효과성 평가 {#evaluate-the-quality-and-effectiveness-of-your-llm-applications}

사용자가 LLM 애플리케이션에 무엇을 요청하는지 파악하고, 적용 범위의 공백을 식별하며, 프로덕션 트래픽을 자동으로 계층적 주제 클러스터링하는 [Patterns][10] 기능을 통해 시간 경과에 따른 응답 품질을 모니터링할 수 있습니다.

{{< img src="llm_observability/topic-detail.png" alt="주제 레이블과 신뢰도 점수가 포함된 상호작용 테이블과 함께 상호작용 임베딩의 산점도를 보여주는 주제 세부 정보 보기" style="width:100%;" >}}

## 민감한 데이터를 보호하고 악의적인 사용자 식별 {#safeguard-sensitive-data-and-identify-malicious-users}

AI 애플리케이션에서 민감한 데이터를 자동으로 스캔하고 삭제하며, 프롬프트 주입을 식별하는 등 다양한 평가 기능을 제공합니다.

{{< img src="llm_observability/prompt_injection.png" alt="LLM Observability에 의해 감지된 프롬프트 주입 시도의 예" style="width:100%;" >}}

## 인사이트로 강조 표시된 이상 징후 확인 {#see-anomalies-highlighted-as-insights}

LLM Observability Insights는 실행 시간, 오류율과 같은 운영 메트릭과 [기본 제공(OOTB) 평가][9] 결과의 이상 징후를 사용자가 식별할 수 있도록 지원하는 모니터링 환경을 제공합니다.

이상치는 다음과 같은 주요 차원에서 탐지됩니다.
- 스팬 이름
- 워크플로 유형
- [Patterns 입력/출력 주제][10]

이러한 이상치는 지난 주 동안 분석되며 사용자가 선택한 해당 시간 범위에 자동으로 표시됩니다. 이를 통해 팀은 LLM 애플리케이션에서 성능 저하, 성능 변화 또는 예상치 못한 동작을 사전에 감지할 수 있습니다.

{{< img src="llm_observability/Overview_LLMO.png" alt="LLM Observability Monitor 페이지 상단에 'Insights' 배너가 있습니다. 배너에는 8개의 인사이트가 표시되며, View Insights 버튼을 클릭하면 사이드 패널에서 상세 정보를 확인할 수 있습니다." style="width:100%;" >}}

## LLM Observability와 통합 사용 {#use-integrations-with-llm-observability}

[Python용 LLM Observability SDK][3]는 OpenAI, LangChain, AWS Bedrock 및 Anthropic과 같은 프레임워크와 통합됩니다. 코드 변경 없이 LLM 호출을 자동으로 추적하고 주석을 달아 지연 시간, 오류 및 토큰 사용 메트릭을 수집합니다.

<div class="alert alert-info">Datadog은 다양한 인공지능(AI) 및 머신러닝(ML) 기능을 제공합니다. <a href="/integrations/#cat-aiml">Integrations 페이지와 Datadog Marketplace에 있는 AI/ML 통합</a>은 Datadog 플랫폼 전반에서 사용되는 기능입니다. <br><br> 예를 들어, APM은 OpenAI 사용량 모니터링을 위한 기본 통합을 제공하며, Infrastructure Monitoring은 컴퓨팅 집약적인 AI 워크로드 모니터링을 위한 NVIDIA DCGM Exporter와 통합됩니다. 이러한 통합은 LLM Observability 제품과는 별도로 제공됩니다.</div>

자세한 내용은 [자동 계측 문서][8]를 참조하세요.

## 시작할 준비가 되셨나요? {#ready-to-start}

LLM 애플리케이션을 계측하는 방법에 대한 지침은 [설정 문서][5]를 참조하거나 [LLM 애플리케이션 트레이스 가이드][6]를 따라 [Python용 LLM Observability SDK][3]를 사용하여 트레이스를 생성하세요.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/llm/traces
[2]: /ko/llm_observability/terms
[3]: /ko/llm_observability/setup/sdk
[4]: /ko/llm_observability/setup/api
[5]: /ko/llm_observability/setup
[6]: /ko/llm_observability/quickstart
[7]: https://app.datadoghq.com/dash/integration/llm_operational_insights
[8]: /ko/llm_observability/setup/auto_instrumentation
[9]: /ko/llm_observability/evaluations/managed_evaluations
[10]: /ko/llm_observability/monitoring/patterns