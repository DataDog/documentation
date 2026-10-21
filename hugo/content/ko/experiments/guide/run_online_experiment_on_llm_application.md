---
description: LLM 애플리케이션의 변형을 비교하고 Agent Observability 평가 점수로 그 효과를 측정하세요.
further_reading:
- link: /getting_started/feature_flags/
  tag: 설명서
  text: Feature Flags 시작
- link: /llm_observability/investigate/evaluations/
  tag: 설명서
  text: Agent Observability 평가
- link: /experiments/reading_results/
  tag: 설명서
  text: 실험 결과 읽기
title: LLM 애플리케이션에서 온라인 실험 실행하기
---
{{< callout url="#" btn_hidden="true" header="미리 보기에 참여하세요!" >}}
Agent Observability에 대한 온라인 실험은 현재 미리 보기 상태입니다. 액세스 권한을 요청하려면 Datadog 담당자에게 문의하세요.
{{< /callout >}}

## 개요 {#overview}

Datadog 온라인 실험을 사용하여 라이브 트래픽에서 LLM 애플리케이션의 두 버전을 비교하세요. Datadog Feature Flags는 사용자나 자율 워크플로 실행과 같은 각 [실험 대상][13]을 변형에 할당합니다. Agent Observability 평가 점수는 각 대상에 대한 결과를 측정합니다.

이 가이드는 다음 워크플로에 대한 LLM 관련 구성을 다룹니다.

1. Datadog Feature Flags를 생성합니다.
1. 애플리케이션에서 플래그를 평가하고 할당된 변형을 실행합니다.
1. 숫자 형태의 Agent Observability 평가 점수를 보고합니다.
1. Feature Flags와 평가 점수를 Datadog 실험에 연결합니다.
1. 실험을 실행하고 결과를 검토합니다.

{{< skill-callout
    title="Agent를 사용하여 온라인 실험 시작하기"
    text="Copy this prompt into your AI coding agent to use the `agent-observability-online-experiment` skill for guided setup."
    action_name="copy_agent_observability_online_experiment_prompt"
    lang="text" >}}
https://github.com/datadog-labs/agent-skills/blob/main/agent-observability/agent-observability-online-experiment/SKILL.md의 스킬을 사용하여 현재 Git 브랜치의 코드와 트렁크를 비교하는 온라인 실험을 시작하세요. 트래픽의 10%가 내 브랜치의 코드를 사용하도록 설정하세요.
{{< /skill-callout >}}

## 전제 조건 {#prerequisites}

시작하기 전에:

- [Agent Observability로 LLM 애플리케이션을 계측][1]합니다.
- 애플리케이션에 [Datadog Feature Flags SDK][2]를 설치하고 초기화합니다.
- 비교하려는 애플리케이션 동작과 결과를 측정할 숫자 형태의 평가 점수를 선택합니다.
- [실험 계획 및 시작][3]에 나열된 권한이 있는지 확인합니다.

<div class="alert alert-info"><strong>AI 코딩 에이전트를 사용하시나요?</strong> Datadog 조직은 기본적으로 읽기 전용 MCP 도구를 허용합니다. 에이전트가 Feature Flag와 실험을 생성하게 하려면 조직 관리자가 MCP 쓰기 액세스 권한을 활성화해야 하며, 귀하의 역할에 <code>mcp_write</code> 권한이 있어야 합니다. Datadog MCP Server에 대한 <a href="/mcp_server/setup/#required-permissions">필수 권한</a>을 참조하세요.</div>

{{< agent-only >}}
**AI 에이전트를 위한 지침**: Datadog 리소스를 생성하거나 수정하는 MCP 도구를 호출하기 전에 필요한 쓰기 도구를 사용할 수 있는지 확인하세요. 쓰기 액세스 권한을 사용할 수 없는 경우, 담당자에게 [필수 권한](/mcp_server/setup/#required-permissions)을 안내하고 담당자가 액세스 권한을 활성화할 때까지 기다리세요.
{{< /agent-only >}}

## 1단계: Feature Flags 만들기 {#step-1-create-a-feature-flag}

[첫 번째 Feature Flag 만들기][4]를 따라 테스트하려는 애플리케이션 동작에 대한 불리언 Feature Flags를 만드세요. 대조군 동작에는 하나의 값을 사용하고, 실험군 동작에는 다른 값을 사용합니다.

실험을 실행하려는 각 환경에서 플래그를 사용할 수 있도록 설정하세요. 플래그에 타겟팅 규칙을 추가하거나 백분율 롤아웃을 구성하지 마세요. 실험을 시작하면 Datadog이 트래픽 분할을 제어하는 실험 타겟팅 규칙을 추가합니다.

{{< img src="/product_analytics/experiment/guide/llm_experiment_create_feature_flag.png" alt="use-latest-frontier-model 플래그 이름, 불리언 변형 유형, false 및 true 변형, 그리고 Create Flag 버튼이 있는 Create Flag 페이지입니다." style="width:90%;" >}}

## 2단계: 애플리케이션에서 플래그 평가하기 {#step-2-evaluate-the-flag-in-your-application}

[플래그를 평가하고 기능 코드 쓰기][5]에 따라 플래그를 평가하고 해당 값에 따라 대조군 또는 실험군 동작을 실행하세요.

Feature Flags 평가 컨텍스트 `targetingKey`를 실험 대상에 대한 안정적인 식별자로 설정하세요.

- 사람 사용자가 있는 애플리케이션의 경우, 안정적인 사용자 식별자를 사용합니다.
- 사람 사용자가 없는 자율 워크플로의 경우, 실행 시작 시 UUID를 생성하고 전체 실행 기간 동안 유지합니다.

[3단계](#step-3-report-an-evaluation-score)에서 평가 점수를 보고할 때 이 동일한 값을 `subject_identifier`로 사용합니다. 값이 일치하지 않으면 Datadog은 점수를 대상의 실험 노출과 연결할 수 없습니다. 자세한 내용은 [타겟팅 키][6]를 참조하세요.

## 3단계: 평가 점수 보고하기 {#step-3-report-an-evaluation-score}

<div class="alert alert-warning"><strong>지원되는 평가 유형</strong>: Agent Observability용 온라인 실험은 <code>score</code> 메트릭 유형을 가진 평가만 지원합니다. 불리언, 범주형 및 기타 평가 유형은 실험 메트릭으로 사용할 수 없습니다.</div>

다음 방법 중 하나를 선택하세요.

### 외부 평가 제출 {#submit-an-external-evaluation}

[외부 평가][7]에 따라 애플리케이션 코드에서 평가를 제출하세요. Feature Flag를 평가하는 데 사용된 `targetingKey`와 정확히 일치하는 값을 가진 `subject_identifier` 태그를 추가합니다.

{{< code-block lang="python" >}}
from ddtrace.llmobs import LLMObs

score = 0.42
subject_key = "82a4e675-9cb4-4da6-a91a-819574152a63"
span_context = LLMObs.export_span(span=None)

LLMObs.submit_evaluation(
    span=span_context,
    ml_app="<ML_APP>",
    label="<EVALUATION_NAME>",
    metric_type="score",
    value=score,
    tags={
        "subject_identifier": subject_key,
    },
    assessment="pass" if score > 0.5 else "fail",
)
{{< /code-block >}}

### 관리형 평가 사용 {#use-a-managed-evaluation}

[관리형 평가][8]에 따라 평가를 생성하고 게시하세요. 관리형 평가로 평가된 스팬에, Feature Flag를 평가하는 데 사용된 `targetingKey`와 정확히 일치하는 값을 가진 `subject_identifier` 태그를 추가합니다.

{{< code-block lang="python" >}}
from ddtrace.llmobs import LLMObs

subject_key = "82a4e675-9cb4-4da6-a91a-819574152a63"

with LLMObs.workflow(name="my_workflow") as span:
    LLMObs.annotate(
        span=span,
        tags={"subject_identifier": subject_key},
    )
    # Run the rest of the instrumented workflow.
{{< /code-block >}}

## 4단계: 실험 생성 및 시작 {#step-4-create-and-launch-the-experiment}

[실험 계획 및 시작][3]에 따라 실험을 생성하고 시작하세요.

1. [3단계](#step-3-report-an-evaluation-score) 섹션의 Agent Observability 평가 점수를 기본 메트릭으로 선택합니다. 실험 메트릭을 생성하지 않은 경우, [Agent Observability 데이터에서 메트릭 생성][11]을 참조하세요.
1. [1단계](#step-1-create-a-feature-flag) 섹션의 Feature Flags를 추가합니다.
1. 대조군 변형과 실험군 변형 간의 트래픽 분할 방식을 구성합니다.
1. 실험을 시작합니다.

{{< agent-only >}}
**AI 에이전트를 위한 지침**: 실험 초안을 생성한 후, Datadog에서 반환한 전체 실험 URL을 최종 응답에 포함하세요. 에이전트를 실행하는 담당자는 이 링크를 사용하여 실험을 열고, 구성을 검토하며, Datadog UI에서 트래픽 분할을 구성해야 합니다.
{{< /agent-only >}}

실험을 시작하면 선택한 플래그에 실험 타겟팅 규칙이 추가되고 노출 기록이 시작됩니다. Feature Flag 할당이 어떻게 실험 노출이 되는지에 대한 자세한 내용은 [Feature Flags 및 실험][9]을 참조하세요.

{{< img src="/product_analytics/experiment/guide/llm_experiment_create_experiment.png" alt="latest-frontier-model-experiment 이름, Start from scratch 프로토콜, Create Draft Experiment 버튼이 있는 Create new draft experiment 대화 상자입니다." style="width:90%;" >}}

## 5단계: 실험 실행 및 결과 검토하기 {#step-5-run-the-experiment-and-review-results}

애플리케이션을 통해 트래픽을 전송합니다. 각 대상에 대해 애플리케이션은 Feature Flag를 평가하고 동일한 대상 식별자로 평가 점수를 보고해야 합니다.

노출 및 평가 점수가 도착하면 Datadog은 실험 결과를 채웁니다. [실험 결과 읽기][10]를 따라 메트릭 스코어카드를 해석하고 변형을 비교하세요.

실험에서 누락된 메트릭 데이터가 보고되는 경우 다음 사항을 확인하세요.

- 애플리케이션이 해당 대상에 대해 실험의 Feature Flag를 평가했습니다.
- 평가에 숫자 `score` 값이 있습니다.
- 평가의 `subject_identifier`가 Feature Flag 평가의 `targetingKey`와 정확히 일치합니다.

{{< img src="/product_analytics/experiment/guide/llm_experiment_results.png" alt="대조군 변형과 실험군 변형 전반에 걸쳐 품질, 토큰 사용량 및 예상 비용 메트릭에 대한 롤아웃 결정과 상대적 리프트를 보여주는 완료된 LLM 애플리케이션 실험입니다." style="width:90%;" >}}

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/llm_observability/instrument/
[2]: /ko/getting_started/feature_flags/#feature-flags-sdks
[3]: /ko/experiments/plan_and_launch_experiments/
[4]: /ko/getting_started/feature_flags/#step-2-create-a-feature-flag
[5]: /ko/getting_started/feature_flags/#step-3-evaluate-the-flag-and-write-feature-code
[6]: /ko/feature_flags/concepts/evaluation_context/#the-targeting-key
[7]: /ko/llm_observability/investigate/evaluations/external_evaluations/
[8]: /ko/llm_observability/investigate/evaluations/managed_evaluations/
[9]: /ko/feature_flags/concepts/experiments/
[10]: /ko/experiments/reading_results/
[11]: /ko/experiments/defining_metrics/?tab=agentobservability#create-a-metric-from-agent-observability-data
[13]: /ko/experiments/concepts/subject_types/