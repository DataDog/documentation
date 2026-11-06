---
aliases:
- /ko/llm_observability/evaluations/custom_llm_as_a_judge_evaluations/trace_level_evaluations/
- /ko/llm_observability/configure/evaluations/llm_as_a_judge_evaluations/trace_level_evaluations/
description: 전체 트레이스에서 사용자 지정 LLM-as-a-judge를 실행하며, 스팬 범위 대신 트레이스 범위를 사용해야 하는 경우의
  예시를 제공합니다.
further_reading:
- link: /llm_observability/investigate/evaluations/llm_as_a_judge_evaluations
  tag: 문서
  text: 사용자 지정 LLM-as-a-Judge 평가자
- link: /llm_observability/investigate/evaluations/llm_as_a_judge_evaluations/prompt_templating
  tag: 문서
  text: 프롬프트 템플릿화
- link: /llm_observability/quickstart/terms/
  tag: 문서
  text: Agent Observability 용어 및 개념
title: 트레이스 수준 평가자
---
트레이스 수준 평가자는 트레이스당 한 번 실행되며, 트레이스의 모든 스팬을 단일 프롬프트에서 LLM 평가자가 사용할 수 있습니다. 이는 질문에 대한 답변이 스팬 간의 상호 작용에 따라 달라질 때 적합한 선택입니다. 예를 들어, 에이전트가 목표를 달성했는지, 도구가 올바른 순서로 호출되었는지, 또는 멀티턴 대화가 주제를 벗어나지 않았는지 등을 확인할 때 사용합니다.

반면, 스팬 수준 평가자는 일치하는 스팬마다 한 번씩 실행되며 해당 스팬의 입력과 출력만 확인합니다.

## 스팬 범위가 아니라 트레이스 범위를 사용해야 하는 경우 {#when-to-use-trace-scope-over-span-scope}

평가에 둘 이상의 스팬에서 얻은 컨텍스트가 필요한 경우 {{< ui >}}Trace{{< /ui >}} 범위를 사용하세요.

- 답변은 일련의 단계(도구의 출력을 사용하는 LLM 응답이 따라오는 도구 호출)에 따라 달라집니다.
- 평가자는 중간 추론의 맥락에서 최종 답변을 확인해야 합니다.
- '통과' 여부는 트레이스 내 앞서 발생한 작업(검색, 가드레일, 거부 등)에 따라 달라집니다.

평가가 단일 스팬만으로 독립적으로 수행될 수 있는 경우, {{< ui >}}Span{{< /ui >}} 범위를 사용하세요. 예를 들어, 하나의 LLM 응답의 품질을 점수화하거나, 루트 스팬에서 사용자 의도를 분류하거나, 도구가 올바른 형식의 인수를 수신했는지 검사합니다.

## 사용 사례 및 예시 {#use-cases-and-examples}

### 1. 다단계 Agent의 목표 달성 여부 {#1-goal-completion-for-a-multi-step-agent}

전체 도구 호출 및 추론 단계 시퀀스를 고려하여 Agent가 사용자가 요청한 작업을 완료했는지 점수를 매깁니다.

**시스템 프롬프트**

```
You are evaluating an AI agent that helps users complete tasks. You will see the full trace of an agent run, including every LLM call, tool invocation, and intermediate response.

Your job is to decide whether the agent achieved the user's goal. Consider:
- Did the agent understand the user's request?
- Did the tool calls and reasoning steps actually progress toward the goal?
- Is the final response a complete answer, or does it leave the request unfinished?

Respond with one of: completed, partially_completed, failed.
```

**사용자**

```
// {{spans[0].meta.input.value}} → input of the trace's first span (the user goal).
User goal: {{spans[0].meta.input.value}}

// {{spans}} → JSON of every span in the trace, in order.
Agent steps:
{{spans}}
```

### 2. 도구 사용 정확성 {#2-tool-use-correctness}

Agent가 사용자의 질문에 대해 올바른 인수를 사용하여 올바른 도구를 호출했는지 확인합니다.

**시스템 프롬프트**

```
You will see a trace where an LLM agent decides which tool to call and with what arguments. Decide whether the chosen tool and its arguments were appropriate for the user's request.

Score from 1 (clearly wrong tool or arguments) to 5 (perfect tool choice and arguments).
```

**사용자**

```
// First span's input—the user's original question.
User question: {{spans[0].meta.input.value}}

// `[meta.span.kind:tool]` filter → keeps only spans whose kind is "tool".
// `.meta.input.parameters` → the arguments passed to each matching tool call.
Tool calls made during this trace:
{{spans[meta.span.kind:tool].meta.input.parameters}}

// `[*]` wildcard → fan out across every span; outputs are joined with newlines.
Final response:
{{spans[*].meta.output.value}}
```

### 3. RAG 워크플로의 충실도 {#3-faithfulness-in-a-rag-workflow}

최종 답변이 트레이스 내 앞서 검색된 문서에 근거하고 있는지 확인합니다.

**시스템 프롬프트**

```
You will see a trace from a retrieval-augmented generation pipeline. The retrieval step provides context documents, and a downstream LLM step produces an answer.

Decide whether the final answer is supported by the retrieved documents. Mark `true` only if every factual claim in the answer can be traced back to one of the documents.
```

**사용자**

```
// `[meta.span.kind:retrieval]` filter → only retrieval spans (the documents fetched).
// `.meta.output.documents[*].text` → the text of every document the retrieval returned,
//                                     joined with newlines.
Retrieved context:
{{spans[meta.span.kind:retrieval].meta.output.documents[*].text}}

// `[meta.span.kind:llm]` filter → outputs of the LLM call(s) that produced the answer.
Final answer:
{{spans[meta.span.kind:llm].meta.output.value}}
```

### 4. 턴 간 대화 품질 평가 {#4-conversation-quality-across-turns}

단일 응답의 품질보다는 턴 간의 일관성을 고려하여 멀티턴 대화의 전반적인 품질을 평가합니다.

**시스템 프롬프트**

```
You will see a multi-turn conversation between a user and an assistant. Evaluate the conversation as a whole on:
- Coherence across turns
- Whether the assistant remembered relevant context from earlier turns
- Whether the assistant's tone stayed consistent

Output one of: excellent, good, mixed, poor.
```

**사용자**

```
// `meta.input.messages[*].content` → fans out over each LLM span's input messages
//                                     and joins their content with newlines.
Conversation:
{{spans[meta.span.kind:llm].meta.input.messages[*].content}}

// Same pattern, but on the LLM output messages—the assistant's replies.
Assistant responses:
{{spans[meta.span.kind:llm].meta.output.messages[*].content}}
```

## 트레이스 완료 방식 {#how-trace-completion-works}

트레이스 수준 평가는 Datadog이 트레이스가 완료되었다고 판단한 후에 실행됩니다. 트레이스는 **3분** 동안 활동이 없는 상태 즉, 해당 트레이스에 대해 새로운 스팬이 도착하지 않은 채 3분이 경과하면 **완료**된 것으로 간주됩니다.

트레이스에서 이전 스팬 이후 3분이 지난 후에 도착하는 스팬은 트레이스 수준 평가에 포함되지 않습니다. 만약 애플리케이션이 3분보다 간격이 긴 단계로 동작하는 장기 실행 Agent를 내보내는 경우 해당 늦은 스팬이 제외된다는 점을 고려해 계획하세요.

## 트레이스 수준 평가자 구성 {#configure-a-trace-level-evaluator}

아래 안내에서는 구성 중 트레이스 범위와 관련된 부분을 강조합니다. 나머지 구성(계정, 모델, 출력 유형, 평가 기준)은 스팬 범위의 평가자와 동일합니다.

1. Agent Observability [평가자 페이지][1]로 이동하여 {{< ui >}}Create Evaluator{{< /ui >}}를 선택한 다음 `Evaluate On`에서 {{< ui >}}Trace{{< /ui >}}를 선택합니다. ([평가자 템플릿][2]에서 시작할 수도 있습니다.)
1. 다른 사용자 지정 LLM-as-a-judge 평가자와 동일하게 {{< ui >}}evaluator name{{< /ui >}}, {{< ui >}}account{{< /ui >}}, {{< ui >}}model{{< /ui >}}을 입력합니다.
1. {{< ui >}}Evaluation Type{{< /ui >}} >에서 {{< ui >}}Trace{{< /ui >}}를 선택합니다.

   {{< img src="llm_observability/evaluations/trace_level_evaluation_scope.png" alt="트레이스가 선택되고 스팬이 대안으로 표시된 Evaluate On 범위 선택기입니다." style="width:100%;" >}}

   <div class="alert alert-info">트레이스는 <strong>3분</strong> 동안 활동이 없으면(해당 트레이스에 대한 새 스팬 없음) 완료된 것으로 간주되고, 이때 평가가 실행됩니다. 이전 스팬 이후 3분이 지난 후에 도착한 스팬은 평가에 포함되지 않습니다.</div>

1. {{< ui >}}Query{{< /ui >}}와 {{< ui >}}Sampling Rate{{< /ui >}}를 추가하여 평가할 트레이스를 제어합니다. 쿼리는 트레이스의 루트 스팬과 매칭됩니다. 예를 들어 `@name:agent.workflow`는 루트 스팬 이름이 `agent.workflow`인 트레이스만 평가합니다.
1. {{< ui >}}System Prompt{{< /ui >}} 필드에 LLM 평가자에 대한 정적 지침(예: 평가자가 사용해야 할 기준 및 생성해야 할 출력)을 입력합니다. 시스템 프롬프트는 `{{ ... }}` 자리표시자를 해석하지 않습니다.
1. {{< ui >}}User{{< /ui >}} 메시지에서 대신 `{{spans...}}` paths. The autocomplete dropdown adapts to trace scope and lists every field available on the selected sample trace. The `{{span_input}}` and `{{span_output}}` aliases are not available in trace scope—reference span data through the `spans` 배열을 사용하여 트레이스 데이터를 주입하는 프롬프트를 작성합니다. 일반적인 패턴:

   ```
   {{spans}}                                         # 트레이스 내 모든 스팬의 JSON
   {{spans[0].meta.input.value}}                     # 첫 번째 스팬만
   {{spans[*].name}}                                 # 모든 스팬 이름, 줄 바꿈으로 연결됨
   {{spans[name:my-span].meta.input.value}}          # 속성별로 스팬 필터링
   {{spans[meta.span.kind:llm].meta.output.value}}   # 모든 LLM 유형 스팬의 출력
   {{*}}                                             # JSON 형태의 전체 트레이스 페이로드
   ```

   See [Prompt Templating][3] for the full reference.

   {{< img src="llm_observability/evaluations/trace_level_prompt_editor.png" alt="트레이스 수준 평가자를 위한 사용자 프롬프트 편집기이며, 여는 중괄호 2개를 입력하면 스팬 접두사가 붙은 필드가 자동 완성 드롭다운에 나열됩니다." style="width:100%;" >}}

1. 오른쪽 패널에서 샘플 트레이스를 선택합니다. 창 제목이 {{< ui >}}Spans in Selected Trace{{< /ui >}}로 변경되고 해당 트레이스의 스팬이 렌더링되며, 프롬프트에서 참조된 필드가 강조 표시됩니다.

   {{< img src="llm_observability/evaluations/trace_level_filtered_traces.png" alt="오른쪽의 Selected Trace 창에 하나의 스팬 입력 및 출력 값이 강조 표시되어 있는 트레이스 범위의 구성 페이지입니다." style="width:100%;" >}}

1. {{< ui >}}Test Evaluator{{< /ui >}}를 클릭하여 선택한 트레이스에 대해 프롬프트를 실행하고 저장하기 전에 LLM 평가자의 결과를 미리 봅니다.
1. 나머지 [평가자 구성][5](출력 유형, 평가 기준)을 계속 진행하고 {{< ui >}}Save and Publish{{< /ui >}}를 클릭하여 새 트레이스에 대한 평가자 실행을 시작합니다.

## 결과 조회 {#viewing-results}

트레이스가 완료되면 평가 결과가 트레이스 자체에 첨부되며 Agent Observability 전반에서 실시간에 가깝게 확인할 수 있습니다. 트레이스가 3분 비활성 기간 이내에 있는 동안에는 결과가 사이드 패널에 {{< ui >}}Pending{{< /ui >}}으로 표시되며, 트레이스가 완료되면 보류 중 행이 최종 결과로 대체됩니다.

### 쿼리 결과 {#query-results}

트레이스 수준 평가 결과는 스팬 수준 평가와 동일한 쿼리 구문을 사용합니다. Agent Observability 트레이스 탐색기, 대시보드 및 모니터 쿼리에서 이러한 패턴을 사용하세요.

| 쿼리 | 용도 |
|---|---|
| `@evaluation.<evaluation_name>.value:complete` | 특정 평가 값이 있는 트레이스로 필터링 |
| `@evaluation.<evaluation_name>.assessment:fail` | 평가자의 통과 기준을 충족하지 못한 트레이스로 필터링 |
| `@evaluation.<evaluation_name>.value:*` | 이 평가자에 대한 결과가 있는 모든 트레이스(보류 중인 항목 제외) |

`<evaluation_name>`은 평가자를 생성할 때 설정한 이름으로 대체하세요. 평가 값은 대시보드 및 모니터에서 그룹화하기 위한 [패싯][6]으로도 사용할 수 있습니다.

### 결과 디버그 {#debug-results}

구성 시점에 {{< ui >}}Enable Reasoning{{< /ui >}}을 켜두었을 경우 트레이스에서 {{< ui >}}Evaluations{{< /ui >}} 탭을 열면 LLM 평가자의 추론과 함께 실행된 모든 평가를 확인할 수 있습니다. 추론은 평가자가 *왜* 해당 값을 생성했는지 설명하고, 의존한 특정 스팬 필드를 참조합니다. 이를 사용하여 개별 실패를 분류하고 프롬프트를 개선할지 또는 판정을 수용할지 결정합니다.

{{< img src="llm_observability/evaluations/trace_level_results_sidepanel.png" alt="완료된 트레이스의 Evaluations 탭으로, LLM 평가자의 추론이 펼쳐진 상태로 트레이스 수준의 평가 결과를 보여줍니다." style="width:100%;" >}}

### 모니터링 결과 {#monitor-results}

트레이스 수준의 평가 결과를 [모니터링][7] 및 [주석 대기열][8]에 연동하여 성능 저하 시 알리고 인적 검토를 위해 실패를 라우팅합니다.

- **통과율이 떨어지는 경우를 모니터링합니다.** 롤링 통과율이 떨어질 때 알림을 받으려면 다음과 같은 쿼리를 사용하여 모니터링을 생성합니다.

  ```
  formula(100 * a / b) < 80
    where a = count(@evaluation.<evaluation_name>.assessment:pass) by {ml_app}
          b = count(@evaluation.<evaluation_name>.value:*) by {ml_app}
  over last_15m
  ```

- **실패를 주석 대기열로 라우팅합니다.** `@evaluation.<evaluation_name>.assessment:fail`과 일치하고 인적 검토를 위해 트레이스를 주석 대기열에 추가하는 [자동화 규칙][8]을 구성합니다. 이는 실패한 트레이스를 검토하고 잘못된 레이블을 수정하여 평가자의 실수를 보완하며 이러한 수정 사항은 평가자 프롬프트를 개선하는 데 사용하는 데이터세트가 됩니다.

## 권한 {#permissions}

평가자를 구성하려면 `Agent Observability Write` [권한][4]이 필요합니다.

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