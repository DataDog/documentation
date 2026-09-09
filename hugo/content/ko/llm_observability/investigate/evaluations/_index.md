---
aliases:
- /ko/tracing/llm_observability/evaluations/
- /ko/llm_observability/configuration/
- /ko/llm_observability/evaluations/
- /ko/llm_observability/configure/evaluations/
description: LLM 애플리케이션에 대한 평가를 구성하는 방법을 알아보세요.
further_reading:
- link: https://www.datadoghq.com/blog/llm-prompt-tracking
  tag: 블로그
  text: Datadog LLM Observability를 통해 LLM 프롬프트를 추적, 비교 및 최적화하기
title: 평가
---
## 개요 {#overview}

Agent Observability는 평가를 지원하는 여러 가지 방법을 제공합니다. [{{< ui >}}AI Observability{{< /ui >}} > {{< ui >}}Evaluations{{< /ui >}}][8]로 이동하여 구성할 수 있습니다.

### 사용자 지정 LLM-as-a-judge 평가 {#custom-llm-as-a-judge-evaluations}

[사용자 지정 LLM-as-a-judge 평가][1]를 사용하면 자연어 프롬프트를 사용하여 고유한 평가 로직을 정의할 수 있습니다. 사용자 지정 평가를 생성하여 주관적 또는 객관적 기준(어조, 유용성, 사실성 등)을 평가하고 트레이스 및 스팬 전반에서 대규모로 실행할 수 있습니다.

### 관리형 평가 {#managed-evaluations}

Datadog은 일반적인 사용 사례를 지원하기 위해 [관리형 평가][2]를 구축하고 지원합니다. Agent Observability 애플리케이션 내에서 이를 활성화하고 구성할 수 있습니다.

### 최종 사용자 피드백 제출 {#submit-end-user-feedback}

[최종 사용자 피드백][13]을 사용하면 '좋아요' 또는 '싫어요' 평가, 수락된 변경 사항, 자유 텍스트 코멘트 및 기타 사용자 또는 에이전트 피드백을 Datadog에 제출할 수 있습니다. 피드백은 피드백 조인 키를 사용하여 스팬, 트레이스, 세션 또는 고객 정의 엔터티에 연결할 수 있습니다.

### 외부 평가 제출 {#submit-external-evaluations}

Datadog API를 사용하여 [외부 평가][3]를 제출할 수도 있습니다. 자체 평가 시스템이 있지만 평가 결과를 Datadog 내에서 중앙 집중화하려는 경우 이 접근 방식을 사용하세요.

### 사용자 지정 평가자 구축 {#building-custom-evaluators}

사용자 지정 평가자를 구축하는 개발자의 경우 [평가 개발자 가이드][10]를 참조하세요.

### 평가 통합 {#evaluation-integrations}

Datadog은 [NeMo][5]와 같은 일부 타사 평가 프레임워크와의 통합도 지원합니다.

### 주석 대기열 {#annotation-queues}

[주석 대기열][11]은 LLM 트레이스에 대한 체계적인 인간 검토를 위한 구조화된 워크플로를 제공합니다.

### Sensitive Data Scanner 통합 {#sensitive-data-scanner-integration}

LLM 요청, 에이전트, 워크플로 또는 애플리케이션의 입력 및 출력을 평가하는 것 외에도, Agent Observability는 [Sensitive Data Scanner][6]와 통합되어 민감한 정보를 식별하고 수정함으로써 데이터 유출을 방지합니다. Sensitive Data Scanner에 포함된 기본 제공 규칙 목록은 [라이브러리 규칙][12]을 참조하세요.

### 보안 {#security}

{{< learning-center-callout header="AI 앱 및 에이전트를 위한 실시간 보안 안전 장치 활용" btn_title="미리 보기에 참여하기" hide_image="true" btn_url="https://www.datadoghq.com/product-preview/ai-security/">}}
  AI Guard는 프롬프트 주입, 탈옥, 도구 오용 및 민감한 데이터 추출 공격으로부터 실시간으로 AI 앱 및 에이전트를 보호하는 데 도움이 됩니다. 지금 바로 사용해 보세요!
{{< /learning-center-callout >}}

### 권한 {#permissions}

평가를 구성하려면 [`Agent Observability Write` 권한][7]이 필요합니다.

### 스팬 검색 중 {#retrieving-spans}

Agent Observability는 외부 평가를 실행하기 위한 스팬을 검색할 수 있도록 [내보내기 API][9]를 제공합니다. 이를 통해 실행 시점에 평가 관련 데이터를 추적할 필요가 없습니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/llm_observability/investigate/evaluations/llm_as_a_judge_evaluations
[2]: /ko/llm_observability/investigate/evaluations/managed_evaluations
[3]: /ko/llm_observability/investigate/evaluations/external_evaluations
[5]: /ko/llm_observability/investigate/evaluations/external_evaluations/nemo
[6]: /ko/security/sensitive_data_scanner/
[7]: /ko/account_management/rbac/permissions/#llm-observability
[8]: https://app.datadoghq.com/llm/evaluations
[9]: /ko/llm_observability/investigate/export_api
[10]: /ko/llm_observability/investigate/evaluations/evaluation_developer_guide
[11]: /ko/llm_observability/investigate/annotation_queues
[12]: /ko/security/sensitive_data_scanner/scanning_rules/library_rules/
[13]: /ko/llm_observability/investigate/evaluations/end_user_feedback