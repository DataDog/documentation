---
aliases:
- /ko/llm_observability/evaluations/ootb_evaluations
- /ko/llm_observability/configure/evaluations/ootb_evaluations
- /ko/llm_observability/evaluations/managed_evaluations/
- /ko/llm_observability/configure/evaluations/managed_evaluations/
description: LLM 애플리케이션에 대한 관리형 평가를 구성하는 방법을 알아보세요.
further_reading:
- link: https://www.datadoghq.com/blog/llm-aws-strands
  tag: 블로그
  text: Datadog LLM Observability를 통해 Strands Agents 워크플로에 대한 가시성 확보하기
- link: /llm_observability/quickstart/terms/
  tag: 설명서
  text: Agent Observability 용어 및 개념에 대해 알아보기
- link: /llm_observability/setup
  tag: 설명서
  text: Agent Observability 설정 방법 알아보기
title: 관리형 평가
---
## 개요 {#overview}

관리형 평가는 LLM 애플리케이션을 평가하기 위한 내장 도구입니다. Agent Observability는 평가를 개별 스팬과 연결하여
특정 평가로 이어진 입력 및 출력을 확인할 수 있도록 합니다.

[호환성 요구 사항][2]에 대해 자세히 알아보세요.

## 새로운 평가 생성 {#create-new-evaluations}

1. [{{< ui >}}AI Observability{{< /ui >}} > {{< ui >}}Evaluations{{< /ui >}}][1]로 이동합니다.
1. 오른쪽 상단 모서리에 있는 {{< ui >}}Create Evaluation{{< /ui >}} 버튼을 클릭합니다.
1. 특정 관리형 평가를 선택합니다. 그러면 평가 편집기 창이 열립니다.

{{< ui >}}Save and Publish{{< /ui >}}를 클릭하면 평가가 활성화됩니다. 또는 {{< ui >}}Save as Draft{{< /ui >}}를 통해 나중에 편집하거나 활성화할 수도 있습니다.

## 기존 평가 편집 {#edit-existing-evaluations}

1. [{{< ui >}}AI Observability{{< /ui >}} > {{< ui >}}Evaluations{{< /ui >}}][1]로 이동합니다.
1. 편집하려는 평가 위로 마우스를 가져간 다음 {{< ui >}}Edit{{< /ui >}} 버튼을 클릭합니다.

### 지원되는 관리형 평가 {#supported-managed-evaluations}

- [언어 불일치][3] - 사용자 입력과 다른 언어로 작성된 응답을 플래그 지정합니다.
- [민감한 데이터 스캔][4] - 모델 입력 또는 출력에 민감한 정보나 규제 대상인 정보가 있는지 여부를 플래그 지정합니다.


## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/llm/evaluations
[2]: /ko/llm_observability/investigate/evaluations/compatibility
[3]: /ko/llm_observability/investigate/evaluations/language_mismatch
[4]: /ko/llm_observability/investigate/evaluations/managed_evaluations/security_and_safety_evaluations