---
aliases:
- /ko/llm_observability/monitoring/prompt_experimentation/
description: A/B 테스트로 관리형 프롬프트 버전을 비교하고 Guarded Rollouts로 버전을 배포합니다.
further_reading:
- link: /llm_observability/configure/prompt_management
  tag: 설명서
  text: Prompt Management
- link: /experiments/defining_metrics/
  tag: 설명서
  text: 실험 메트릭 생성
- link: /experiments/reading_results/
  tag: 설명서
  text: 실험 결과 읽기
title: Prompt Experimentation
---
## 개요 {#overview}

프롬프트 변경 사항을 기본 설정으로 적용하기 전에 실제 트래픽에서 테스트합니다. **A/B 테스트**를 사용하여 결제 전환과 같은 성과 지표를 기준으로 버전을 비교합니다. **Guarded Rollout**을 사용하여 새 버전을 점진적으로 도입하고 Datadog이 성능 저하를 탐지하면 배포를 일시 중지합니다.

<div class="alert alert-info"><strong>미리 보기:</strong> Prompt Experimentation은 미리 보기로 제공되고 있습니다. 액세스를 요청하려면 <a href="https://www.datadoghq.com/support/">Datadog 지원팀</a> 또는 고객 성공 관리자에게 문의하세요. A/B 테스트와 Guarded Rollouts에 대한 액세스는 각각 별도로 요청할 수 있습니다.</div>

- **어떤 프롬프트의 성능이 더 우수하나요?** [A/B 테스트를 실행합니다](#run-an-ab-test).
- **변경 사항을 점진적으로 도입하려면 어떻게 해야 하나요?** [Guarded Rollout을 사용합니다](#use-a-guarded-rollout).

## 시작하기 전에 {#before-you-begin}

버전이 두 개 이상인 관리형 프롬프트, 사용할 환경에 배포된 버전, 성과를 측정하는 [실험 메트릭][2]이 필요합니다. 워크플로에 대한 [권한](#permissions)을 확인합니다.

**권한:** A/B 테스트를 수행하려면 LLM Observability 외에도 Product Analytics 및 Feature Flags 권한이 필요합니다. 미리 보기 액세스만으로는 이러한 권한이 부여되지 않습니다. 시작하기 전에 Datadog 관리자에게 본인의 역할을 확인해 달라고 요청합니다.

**처음 사용하시나요?** 두 워크플로 중 하나를 시작하기 전에 [일회성 애플리케이션 설정](#set-up-your-application)을 완료하세요. Python `ddtrace[openfeature]` 4.15.0 이상, 연결 가능한 Datadog Agent, 그리고 프롬프트 요청과 결과 이벤트에서 일치하는 사용자 식별자가 필요합니다. Agentless 모드는 지원되지 않습니다.

## A/B 테스트 실행 {#run-an-ab-test}

예를 들어, 결제 도우미의 두 버전을 비교하여 어느 쪽이 더 높은 결제 전환율을 보이는지 확인합니다.

1. 프롬프트를 열고 {{< ui >}}Set up A/B test{{< /ui >}}를 클릭합니다.
1. 환경을 선택하고 {{< ui >}}Create draft & continue{{< /ui >}}를 클릭합니다. 그러면 Product Analytics에서 테스트가 열립니다. 초안을 생성해도 실제 트래픽은 변경되지 않습니다.
1. 프롬프트 버전, 대상 사용자, 트래픽 분배 비율 및 {{< ui >}}Primary metric{{< /ui >}}을 선택합니다. {{< ui >}}Calculate metrics by{{< /ui >}} 아래에서 애플리케이션의 `targeting_key`와 일치하는 주체 유형을 선택합니다. 예를 들어, 사용자 ID를 전달하는 경우 **User**를 선택합니다.
1. 테스트를 시작합니다. {{< ui >}}Flag & Exposures{{< /ui >}}를 확인하여 할당 데이터가 수신되는지 검증한 다음 [결과를 비교][12]합니다.

프롬프트 페이지의 {{< ui >}}A/B tests using this prompt{{< /ui >}}로 돌아가 결과를 확인하거나 초안 작성을 완료합니다. Product Analytics에서 테스트를 구성하고 종료합니다. 자세한 지침은 [실험 계획 및 시작][11]을 참조하세요.

{{< img src="llm_observability/monitoring/prompt-ab-tests.png" alt="프롬프트를 사용하는 A/B 테스트 화면으로, 간결한 답변과 상세한 답변을 비교하는 진행 중인 테스트, 버전, 기본 메트릭, 대상 사용자 및 'Finish Setup' 버튼이 있는 초안을 보여줍니다." style="width:100%;" >}}

**우수한 버전을 선택해도 해당 버전이 자동으로 배포되지는 않습니다.** 테스트를 종료한 다음 프롬프트로 돌아가 선택한 버전을 배포합니다. 테스트 대상에 포함되지 않은 사용자에게는 해당 환경의 다른 제공 규칙이 계속 적용됩니다.

## Guarded Rollout 사용 {#use-a-guarded-rollout}

예를 들어, 결제 전환율을 모니터링하면서 업데이트된 결제 도우미를 도입합니다. 배포된 버전은 **기준 버전**이며, 새 버전은 **후보 버전**입니다. 환경에 배포된 버전이 없다면 먼저 버전 하나를 즉시 배포하여 기준 버전을 설정합니다.

1. 후보 버전을 열고 {{< ui >}}Deploy Version{{< /ui >}}을 클릭합니다.
1. {{< ui >}}Deploy to{{< /ui >}}에서 환경을 선택합니다.
1. {{< ui >}}Deployment strategy{{< /ui >}}를 확장하고 {{< ui >}}Guarded rollout{{< /ui >}}을 선택한 다음 {{< ui >}}Guardrail metric{{< /ui >}}을 선택합니다.
1. {{< ui >}}Inspect metric{{< /ui >}}을 사용하여 메트릭의 정의를 확인하고 값이 높을수록 좋은지 낮을수록 좋은지 확인합니다.
1. 제안된 변경 사항을 검토하고 {{< ui >}}Deploy Version{{< /ui >}}을 클릭하여 롤아웃을 시작합니다.

{{< img src="llm_observability/monitoring/prompt-guarded-rollout-setup.png" alt="Production이 선택되고 Guarded rollout이 활성화되어 있으며, Checkout completion rate가 가드레일 메트릭으로 선택되고 Inspect metric 링크가 표시된 버전 3 배포 대화 상자입니다." style="width:80%;" >}}

### 진행 상황 확인 {#follow-its-progress}

후보 버전의 노출 현황을 확인하려면 프롬프트 페이지에서 {{< ui >}}Active rollouts{{< /ui >}}를 엽니다. 롤아웃이 진행되는 동안 노출이 자동으로 증가합니다. {{< ui >}}Pause{{< /ui >}}를 사용하여 현재 트래픽 분배 비율을 유지하고 {{< ui >}}Resume{{< /ui >}}을 사용하여 계속 진행합니다.

가드레일이 성능 저하를 탐지하면 롤아웃이 {{< ui >}}Needs attention{{< /ui >}} 상태로 일시 중지됩니다. 메트릭을 열어 조사한 다음, 다음 중 하나를 선택합니다.

- {{< ui >}}Resume anyway{{< /ui >}}를 선택하여 후보 버전의 노출을 계속합니다.
- {{< ui >}}Stop{{< /ui >}} 을 선택하여 롤아웃을 종료하고 대상 트래픽을 기준 버전으로 되돌립니다.

**일시 중지해도 후보 버전은 롤백되지 않습니다.** 사용자가 조치를 취할 때까지 현재 트래픽 분배 비율이 유지됩니다. 롤아웃을 중지해도 해당 환경의 롤아웃에만 영향을 미치며 다른 환경이나 A/B 테스트에는 영향을 미치지 않습니다. 중지한 후 다시 시작하려면 버전을 다시 배포합니다.

{{< img src="llm_observability/monitoring/prompt-guarded-rollout-paused.png" alt="Needs Attention 상태의 Staging 롤아웃이 버전 2의 노출 비율 25%에서 일시 중지된 프롬프트 페이지로, Checkout Completion Rate 메트릭과 Resume Anyway 및 Stop 액션이 표시됩니다." style="width:100%;" >}}

롤아웃이 완료되면 후보 버전에 해당 롤아웃의 대상 트래픽이 모두 할당되며 {{< ui >}}Active rollouts{{< /ui >}}에서 사라집니다. 다른 타겟팅 규칙에 따라 다른 버전이 계속 제공될 수 있습니다.

<div class="alert alert-warning">가드레일은 사용 가능한 결과 데이터에 의존합니다. 데이터가 부족하거나 없거나 일치하지 않으면 일시 중지가 트리거되지 않을 수 있습니다. 트래픽 노출 비율이 100%에 도달했다고 해서 후보 버전의 성능이 더 우수하거나 안전하다는 의미는 아닙니다.</div>

## 애플리케이션 설정 {#set-up-your-application}

두 워크플로 중 어느 것을 사용하든 이 설정은 한 번만 완료하면 됩니다. 애플리케이션이 이미 프롬프트 할당 데이터와 이에 일치하는 결과를 전송하고 있다면 [A/B testing](#run-an-ab-test) 또는 [Guarded Rollouts](#use-a-guarded-rollout)로 바로 이동합니다.

### 애플리케이션 연결 {#connect-the-application}

1. Prompt Management의 [전제 조건][5]을 충족합니다.
1. 지원되는 Python SDK인 `pip install --upgrade "ddtrace[openfeature]>=4.15.0"`을 설치합니다.
1. `DD_ENV`를 사용하려는 환경으로 설정합니다.
1. 애플리케이션이 [Datadog Agent][14]에 연결할 수 있는지 확인합니다. Prompt Experimentation은 Agent를 통해 할당 데이터를 전송하므로 Agentless 모드(`DD_LLMOBS_AGENTLESS_ENABLED=1`)를 활성화하지 마세요.

### 프롬프트 요청과 결과 연결 {#match-prompt-requests-to-outcomes}

프롬프트를 가져오고 결과를 기록할 때 동일한 사용자 ID를 사용합니다. 이를 통해 Datadog은 사용자의 결과를 해당 사용자에게 제공된 프롬프트 버전과 연결할 수 있습니다.

```python
from ddtrace.llmobs import LLMObs

prompt = LLMObs.get_prompt(
    "checkout-assistant",
    targeting_key=str(current_user.id),
    fallback="You are a helpful checkout assistant.",
)
```

`targeting_key`에 일관되게 유지되는 비어 있지 않은 문자열을 사용합니다. 특정 `version`을 전달하지 마세요. 그러면 환경 할당을 우회하여 실험 노출이 기록되지 않습니다.

예를 들어, 결제 메트릭에서 RUM 이벤트와 **User** 주체 유형을 사용한다면 브라우저 사용자도 동일한 ID로 식별합니다.

```javascript
datadogRum.setUser({
  id: String(currentUser.id),
})
```

RUM은 선택한 결과를 제공할 때만 필요합니다. 다른 결과 소스를 사용하거나 사용자가 아닌 조직을 비교하려면 이에 맞는 [주체 유형][7]을 구성합니다. 결과를 특정 프롬프트 버전에 귀속하려면 사용자가 해당 버전에 처음 노출된 이후에 결과가 발생해야 합니다.

### 결과 메트릭 선택 {#choose-an-outcome-metric}

[{{< ui >}}Product Analytics{{< /ui >}} > {{< ui >}}Experiments{{< /ui >}} > {{< ui >}}Metrics{{< /ui >}}][8]에서 [실험 메트릭][2]을 생성하거나 선택합니다. Metrics Explorer 메트릭 및 모니터링은 여기에서 선택할 수 없습니다.

예를 들어, 결제 전환 메트릭의 경우 {{< ui >}}Desired metric direction{{< /ui >}}을 {{< ui >}}Higher is better{{< /ui >}}로 설정합니다. 결과 이벤트가 프롬프트 요청과 동일한 사용자 ID를 사용하는지 확인합니다. 해당 메트릭을 사용하여 버전을 비교하거나 롤아웃을 일시 중지하기 전에 결과 이벤트가 수신되는지 확인합니다.

{{< agent-only >}}
**AI 에이전트 참고 사항:** 애플리케이션에서 기존에 사용하던 일관된 주체 식별자를 Experiment 주체와 일치하도록 `targeting_key`의 문자열 값으로 사용합니다. ID 또는 결과 소스가 불분명한 경우 확인을 요청합니다. 결과에 RUM을 사용하지 않는 한 RUM을 설치하지 마세요. 기존 폴백, 프롬프트 변수, 공급자, 모델 및 애플리케이션 동작을 유지합니다. 특정 프롬프트 버전을 요청하지 마세요. 메트릭 생성 또는 편집, 실험 시작, 버전 배포 및 롤아웃 제어에는 사용자의 명시적인 요청이 필요합니다. 코드 준비만 요청받은 경우 남은 Datadog UI 단계를 안내합니다.
{{< /agent-only >}}

## 권한 {#permissions}

[프롬프트 관리 전제 조건][5] 외에도 역할에 다음 권한이 필요합니다.

| 액션 | 필수 권한 |
|--------|---------------------|
| 프롬프트에서 A/B 테스트 설정 | Product Analytics Experiments Write |
| Guarded Rollout 시작 | LLM Observability Write 및 Feature Flags Environment Config Read |
| Guarded Rollout 일시 중지 또는 재개 | Feature Flags Config Write |
| Guarded Rollout 중지 | LLM Observability Read and Write |

Product Analytics에서 A/B 테스트를 구성하고 시작하려면 [Product Analytics 권한][3] 및 [Feature Flags 권한][6]을 참조하세요. 환경에서 승인이 필요한 경우, 실제 트래픽을 변경하기 전에 Feature Flags에서 승인을 요청합니다.

## 문제 해결 {#troubleshooting}

### 테스트 또는 롤아웃을 시작할 수 없음 {#i-cannot-start-a-test-or-rollout}

- **컨트롤이 없거나 비활성화됨:** 관련 미리 보기 액세스 권한과 [필수 권한](#permissions)이 있는지 확인합니다. A/B 테스트를 설정하려면 프롬프트 버전 두 개와 제공 구성을 로드할 수 있는 활성화된 환경도 필요합니다.
- **보호된 배포가 거부됨:** 먼저 기준 버전을 설정합니다. 다시 시도하기 전에 모든 사용자를 대상으로 진행 중인 실험이나 강제 버전 재정의 등 해당 환경에 표시된 충돌을 해결합니다.
- **초안은 생성할 수 있지만 테스트를 구성하거나 시작할 수 없음:** Datadog 관리자에게 [Product Analytics 권한][3] 및 [Feature Flags 권한][6]과 필요한 환경 승인 여부를 확인합니다. 테스트에 기본 메트릭이 선택되어 있는지 확인합니다.

### 할당이나 결과가 표시되지 않음 {#i-do-not-see-assignments-or-results}

- **폴백만 반환되거나 할당이 없음:** SDK 설치, `DD_ENV`, Agent 연결 상태를 확인하고 검색 시 `version`이 지정되지 않았는지 확인합니다.
- **결과가 없음:** 주체 ID가 일치하는지, 메트릭 범위가 올바른지, 이벤트가 노출 이후에 발생하는지 확인합니다. 데이터가 충분히 축적되도록 합니다. 자세한 내용은 [Experiment Diagnostics][13]를 참조하세요.

### 롤아웃을 제어하거나 확인할 수 없음 {#i-cannot-control-or-inspect-a-rollout}

- **Pause, Resume 또는 Stop을 사용할 수 없음:** [권한](#permissions)을 확인합니다. Stop에는 Pause 및 Resume과 다른 권한이 필요합니다.
- **상태를 로드할 수 없음:** 새로고침한 후 표시된 오류를 확인하거나 Datadog 지원팀에 문의합니다. 상태를 확인할 수 없다고 해서 롤아웃이 중지된 것은 아닙니다.

### 다시 배포하거나 여러 환경에 배포하는 경우 {#i-am-deploying-again-or-to-several-environments}

각 환경의 배포 전략을 검토합니다. 저장된 보호 설정이 이미 선택되어 있을 수 있습니다. 즉시 배포 환경에서는 롤아웃 없이 버전이 전환됩니다. 다른 버전을 배포하면 진행 중인 롤아웃이 대체될 수 있으므로 확인하기 전에 대체 경고를 검토합니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[2]: /ko/experiments/defining_metrics/
[3]: /ko/account_management/rbac/permissions/#product-analytics
[5]: /ko/llm_observability/configure/prompt_management/#prerequisites
[6]: /ko/account_management/rbac/permissions/#feature-flags
[7]: /ko/experiments/concepts/subject_types/
[8]: https://app.datadoghq.com/product-analytics/experimentation-metrics
[11]: /ko/experiments/plan_and_launch_experiments/
[12]: /ko/experiments/reading_results/
[13]: /ko/experiments/diagnostics/
[14]: /ko/getting_started/agent/