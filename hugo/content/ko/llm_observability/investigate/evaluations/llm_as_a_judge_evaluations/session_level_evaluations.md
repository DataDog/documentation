---
aliases:
- /ko/llm_observability/evaluations/custom_llm_as_a_judge_evaluations/session_level_evaluations/
- /ko/llm_observability/configure/evaluations/llm_as_a_judge_evaluations/session_level_evaluations/
description: 전체 사용자 세션에 걸쳐 사용자 지정 LLM-as-a-judge를 실행합니다. 트레이스 범위나 스팬 범위 대신 세션 범위를
  사용해야 하는 경우의 예시를 제공합니다.
further_reading:
- link: /llm_observability/investigate/evaluations/llm_as_a_judge_evaluations
  tag: 설명서
  text: 사용자 지정 LLM-as-a-Judge 평가
- link: /llm_observability/investigate/evaluations/llm_as_a_judge_evaluations/trace_level_evaluations
  tag: 설명서
  text: 트레이스 수준 평가
- link: /llm_observability/investigate/evaluations/llm_as_a_judge_evaluations/prompt_templating
  tag: 설명서
  text: 프롬프트 템플릿화
- link: /llm_observability/instrument/sdk/#tracking-user-sessions
  tag: 설명서
  text: 사용자 세션 추적하기
title: 세션 수준 평가
---
세션 수준 평가는 [사용자 세션][9]당 한 번 실행되며, 모든 트레이스와 해당 트레이스의 모든 스팬이 단일 프롬프트에서 LLM 평가자에게 제공됩니다. 세션은 관련 상호 작용을 공유된 `session_id` 아래로 그룹화하며(예: 채팅 대화), 확장된 상호 작용에 걸쳐 여러 트레이스를 포함할 수 있습니다.

세션 범위는 전체 상호 작용에 걸친 Agent 성능 및 사용자 행동에 대한 질문, 즉 트레이스 수준 및 스팬 수준 평가자가 단일 요청이나 스팬만으로는 답변할 수 없는 질문에 답변합니다.

<div class="alert alert-info">세션 수준 평가를 수행하려면 스팬에 <code>session_id</code>태그가 지정되어 있어야 합니다. 애플리케이션을 계측하려면 <a href="/llm_observability/instrument/sdk/#tracking-user-sessions"> 사용자 세션 추적</a>을 참조하세요.</div>

##  세션 수준 평가 구성 {#configure-a-session-level-evaluation}

아래 안내에서는 세션 범위와 관련된 구성 부분을 강조하여 다룹니다. 나머지 구성(계정, 모델, 출력 유형, 평가 기준)은 스팬 또는 트레이스 범위 평가와 동일합니다.

1. Agent Observability [평가 페이지][1]로 이동하여 {{< ui >}}Create Evaluation{{< /ui >}}을 선택한 다음, `Evaluate On`에서 {{< ui >}}Session{{< /ui >}}을 선택합니다. ([템플릿 평가][2]에서 시작할 수도 있습니다.)
1. 다른 사용자 지정 LLM-as-a-judge 평가와 마찬가지로 {{< ui >}}evaluation name{{< /ui >}}, {{< ui >}}account{{< /ui >}}, {{< ui >}}model{{< /ui >}}을 입력합니다.

   {{< img src="llm_observability/evaluations/session_level_evaluation_scope.png" alt="Session이 선택된 Evaluate On 범위 선택기입니다." style="width:100%;" >}}

   <div class="alert alert-info">세션은 30분 동안 활동이 없으면(가장 최근 스팬부터 측정했을 때, 해당 세션에 새로운 스팬이 없음) 완료된 것으로 간주되며, 이때 평가가 실행됩니다. 이전 스팬 이후 30분이 지나서 도착한 스팬은 평가에 포함되지 않습니다.</div>

1. {{< ui >}}Query{{< /ui >}} 및 {{< ui >}}Sampling Rate{{< /ui >}}를 추가하여 평가할 세션을 제어합니다.
1. {{< ui >}}System Prompt{{< /ui >}} 필드에 LLM 평가자에 대한 정적 지침(예: 평가자가 사용해야 할 기준 및 생성해야 할 출력)을 입력합니다. 시스템 프롬프트는 `{{ ... }}` 자리표시자를 해석하지 않습니다.
1. {{< ui >}}User{{< /ui >}} 메시지에 `{{traces...}} ` 경로를 사용하여 세션 데이터를 주입하는 프롬프트를 작성하세요. 자동 완성 드롭다운이 세션 범위에 맞게 조절되며 선택한 샘플 세션에서 사용할 수 있는 필드 목록을 보여줍니다. `{{span_input}}` 및 `{{span_output}}` 별칭은 세션 범위에서 사용할 수 없으므로 대신에 ` 대신에 traces` 배열을 통해 스팬 데이터를 참조하세요. 일반적인 패턴:

   ```
   {{traces}}                                              # 세션 내 모든 트레이스의 JSON
   {{traces[0].spans[0].meta.input.value}}                 # 첫 번째 트레이스의 첫 번째 스팬
   {{traces[*].spans[*].name}}                             # 모든 스팬 이름, 줄 바꿈으로 연결됨
   {{traces[*].spans[meta.span.kind:llm].meta.output.value}}  # 세션 전체의 LLM 출력
   {{*}}                                                   # JSON 형식의 전체 세션 페이로드
   ```

   See [Prompt Templating][3] for the full reference.

   {{< img src="llm_observability/evaluations/session_level_prompt_editor.png" alt="세션 수준 평가를 위한 사용자 프롬프트 편집기이며, 여는 중괄호 두 개를 입력하면 트레이스 접두사가 붙은 필드가 자동 완성 드롭다운에 나열됩니다." style="width:100%;" >}}

1. 오른쪽 패널에서 샘플 세션을 선택합니다. 이 창에는 해당 세션의 트레이스가 나열되며, 프롬프트에서 참조하는 필드가 강조 표시됩니다.

   {{< img src="llm_observability/evaluations/session_level_sample_session_trace_view.png" alt="세션 범위의 구성 페이지이며, 오른쪽의 샘플 세션 창에 트레이스와 강조 표시된 스팬 필드가 표시됩니다." style="width:100%;" >}}


1. {{< ui >}}Test Evaluation{{< /ui >}}을 클릭하여 선택한 세션에 대해 프롬프트를 실행하고 저장하기 전에 LLM 평가자의 출력을 미리 봅니다.
1. 나머지 [평가 구성][5](출력 유형, 평가 기준)을 계속 진행하고 {{< ui >}}Save and Publish{{< /ui >}}를 클릭하여 새 세션에 대한 평가 실행을 시작하세요.

## 세션 완료 {#session-completion}

세션 수준 평가는 Datadog이 세션이 완료되었다고 판단한 후에 트리거됩니다. 세션은 30분 동안 활동이 없으면 완료된 것으로 간주됩니다. 즉, 해당 세션에 새로운 스팬이 도착하지 않은 상태로 30분이 경과하면(가장 최근 스팬부터 측정) 완료됩니다.

세션이 완료되면 해당 세션의 모든 트레이스와 그 트레이스에 포함된 모든 스팬을 평가자 프롬프트에서 사용할 수 있는 상태로 평가가 한 번 실행됩니다. 세션에서 이전 스팬 이후 30분이 지나서 도착하는 스팬은 세션 수준 평가에 포함되지 않습니다.

## 결과 보기 {#view-results}

세션이 완료되면 평가 결과가 세션에 첨부되며 Agent Observability 전반에서 실시간에 가깝게 확인할 수 있습니다. 세션이 30분 비활성 창 내에 있는 동안에는 결과가 사이드 패널에 {{< ui >}}Pending{{< /ui >}}으로 표시되며, 세션이 완료되면 보류 중인 행이 최종 결과로 대체됩니다.

세션의 {{< ui >}}Session evaluations{{< /ui >}}를 펼치면, 구성 시점에 {{< ui >}}Enable Reasoning{{< /ui >}}을 켜두었을 경우 LLM 평가자의 추론과 함께 실행된 모든 평가를 확인할 수 있습니다. 추론은 평가자가 *왜* 해당 값을 생성했는지 설명하고, 의존한 특정 트레이스 또는 스팬 필드를 참조합니다. 이를 사용하여 개별 실패를 분류하고 프롬프트를 개선할지 또는 판정을 수용할지 결정합니다.

{{< img src="llm_observability/evaluations/session_level_eval_results.png" alt="세션 평가 섹션이 확장된 세션 세부 정보 패널입니다. 표에는 목표 완료도, 유해성, 주제 관련성, 도구 선택, 감정, 프롬프트 주입을 포함한 8가지 평가 항목이 나열되어 있으며, 각 평가 항목에는 색상이 지정된 배지(예: True, Not Toxic, On Topic)로 표시된 결과 값과 LLM 평가자의 추론 미리보기가 표시되어 있습니다." style="width:100%;" >}}

## 프롬프트 예시 {#example-prompts}

### 세션 목표 완료도 {#session-goal-completeness}

별도의 트레이스에 있는 후속 턴을 포함하여 전체 세션에 걸쳐 사용자가 하려고 했던 작업을 달성했는지 점수를 매깁니다.

**시스템 프롬프트**

```
You are evaluating an LLM chatbot session. You will see every trace in the session, including all user messages and assistant responses across turns.

Decide whether the user's goals were fully met by the end of the session. Consider:
- All distinct intents the user expressed during the session
- Whether follow-up questions indicate unresolved needs
- Whether the final state of the conversation leaves the user satisfied

Respond with one of: completed, partially_completed, failed.
```

**사용자**

```
Session traces:
{{traces}}
```

관리형 [목표 완료도][11] 템플릿 평가는 이 패턴을 구현합니다.

### 멀티턴 대화 품질 {#multi-turn-conversation-quality}

단일 교환이 아닌 전체 세션에 걸쳐 일관성, 컨텍스트 유지 및 어조를 평가합니다.

**시스템 프롬프트**

```
You will see a multi-turn chat session between a user and an assistant across multiple traces.

Evaluate the session as a whole on:
- Coherence across turns
- Whether the assistant remembered relevant context from earlier turns
- Whether tone and helpfulness stayed consistent

Output one of: excellent, good, mixed, poor.
```

**사용자**

```
User and assistant messages across the session:
{{traces[*].spans[meta.span.kind:llm].meta.input.messages[*].content}}
{{traces[*].spans[meta.span.kind:llm].meta.output.messages[*].content}}
```

### 사용자 행동 및 불만 신호 {#user-behavior-and-frustration-signals}

전체 세션을 볼 때만 드러나는 행동 패턴을 감지합니다.

**시스템 프롬프트**

```
Analyze this user session for signs of frustration, confusion, or abandonment.

Look for:
- Repeated or rephrased questions on the same topic
- Explicit expressions of dissatisfaction
- The user stopping after an incomplete or unhelpful answer

Output one of: no_issues, mild_frustration, high_frustration, abandoned.
```

**사용자**

```
Full session:
{{traces}}
```

### 세션 전체에서의 Agent 일관성 {#agent-consistency-across-a-session}

Agent가 세션의 모든 턴에서 품질과 정책 준수를 유지했는지 검사합니다.

**시스템 프롬프트**

```
You will see all traces from one agent session. Assess whether the agent performed consistently:

- Did later turns contradict earlier correct answers?
- Did the agent recover from errors, or repeat the same mistake?
- Were safety and policy guidelines followed on every turn?

Respond with: consistent, mixed, inconsistent.
```

**사용자**

```
Session traces (chronological):
{{traces}}
```

## 적절한 범위 선택 {#choosing-the-right-scope}

| 범위 | 평가자가 확인하는 항목 | 일반적인 사각지대 |
|---|---|---|
| 스팬 | 하나의 스팬 입력 및 출력 | 스팬 간 또는 트레이스 간 컨텍스트 없음 |
| 트레이스 | 하나의 트레이스에 있는 모든 스팬 | 동일한 채팅 세션 내 이전 또는 이후 턴 없음 |
| 세션 | 세션 내의 모든 트레이스(및 스팬) | — |

평가에 동일한 사용자 세션 내의 여러 트레이스에서 얻은 컨텍스트가 필요할 때는 {{< ui >}}Session{{< /ui >}} 범위를 사용하세요.

- 사용자 만족도 — 마지막 응답뿐만 아니라 세션 전체가 사용자의 의도를 충족했는지 여부
- 멀티턴 일관성 — 어시스턴트가 주제를 유지하고, 어조를 유지하며, 서로 다른 트레이스에 있는 턴 전반에 걸쳐 관련 컨텍스트를 전달했는지 여부
- 시간에 따른 사용자 행동 — 불만, 혼란, 주제 전환 또는 Agent가 도움을 완료하기 전에 포기하는 등의 패턴
- 세션 전반에 걸친 Agent 성능 — 일관성, 도구 실패 후의 회귀, 또는 Agent가 이후 턴에서 실수로부터 복구했는지 여부

{{< ui >}}Trace{{< /ui >}} 범위는 답변이 단일 요청 내의 단계에 따라 달라질 때에 사용하세요(예: 도구 호출 순서, 하나의 워크플로 실행 내의 RAG 충실도, 또는 하나의 Agent 호출에 대한 목표 완료). [트레이스 수준 평가][10]를 참조하세요.

평가가 하나의 스팬만으로 답변될 수 있을 때(예: 단일 LLM 응답 점수 매기기, 하나의 메시지에 대한 의도 분류, 또는 하나의 호출에 대한 도구 인수 유효성 검사) {{< ui >}}Span{{< /ui >}} 범위를 참조하세요.

## 권한 {#permissions}

평가를 구성하려면 `Agent Observability Write` [권한][4]이 필요합니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/llm/evaluations
[2]: /ko/llm_observability/investigate/evaluations/llm_as_a_judge_evaluations/template_evaluations
[3]: /ko/llm_observability/investigate/evaluations/llm_as_a_judge_evaluations/prompt_templating
[4]: /ko/account_management/rbac/permissions/#llm-observability
[5]: /ko/llm_observability/investigate/evaluations/llm_as_a_judge_evaluations/#define-the-evaluation-output
[6]: /ko/events/explorer/facets/
[7]: /ko/monitors/
[8]: /ko/llm_observability/investigate/annotation_queues
[9]: /ko/llm_observability/instrument/sdk/#tracking-user-sessions
[10]: /ko/llm_observability/investigate/evaluations/llm_as_a_judge_evaluations/trace_level_evaluations
[11]: /ko/llm_observability/investigate/evaluations/llm_as_a_judge_evaluations/template_evaluations/#goal-completeness