---
aliases:
- /ko/llm_observability/evaluations/custom_llm_as_a_judge_evaluations/
- /ko/llm_observability/configure/evaluations/llm_as_a_judge_evaluations/
description: 사용자 지정 LLM-as-a-judge 평가를 생성하는 방법과 Agent Observability 전반에서 이러한 평가 결과를
  사용하는 방법입니다.
further_reading:
- link: https://www.datadoghq.com/blog/manage-ai-cost-and-performance-with-datadog/
  tag: 블로그
  text: 'AI ROI 향상: Datadog이 비용, 성능 및 인프라를 연결하여 책임 있는 확장을 지원하는 방법'
- link: https://www.datadoghq.com/blog/llm-aws-strands
  tag: 블로그
  text: Datadog LLM Observability를 통해 Strands Agents 워크플로에 대한 가시성 확보하기
- link: https://www.datadoghq.com/blog/llm-evaluation-framework-best-practices/
  tag: 블로그
  text: 'LLM 평가 프레임워크 구축: 모범 사례'
- link: /llm_observability/quickstart/terms/
  tag: 설명서
  text: Agent Observability 용어 및 개념에 대해 알아보기
- link: /llm_observability/setup
  tag: 설명서
  text: Agent Observability 설정 방법 알아보기
- link: /llm_observability/investigate/evaluations/managed_evaluations
  tag: 설명서
  text: 관리형 평가에 대해 알아보기
- link: https://huggingface.co/learn/cookbook/llm_judge
  tag: Hugging Face
  text: 자동화된 범용 평가에 LLM-as-a-judge 사용하기
title: 사용자 지정 LLM-as-a-Judge 평가
---
사용자 지정 LLM-as-a-judge 평가는 LLM을 사용하여 다른 LLM의 성능을 평가합니다. 자연어 프롬프트로 평가 로직을 정의하고, 주관적 또는 객관적 기준(어조, 유용성, 사실성 등)을 반영하여 다음 항목을 대규모로 평가할 수 있습니다.

- **스팬 범위**—단일 LLM 호출, 에이전트 단계 또는 도구 호출의 입력과 출력을 개별적으로 평가합니다.
- **트레이스 범위**—트레이스의 모든 스팬을 단일 프롬프트로 LLM 평가자에게 전달하여 평가 시 여러 단계에 걸쳐 추론할 수 있도록 합니다. 전체 워크스루, 사용 사례 및 프롬프트 예시는 [트레이스 수준 평가][16]를 참조하세요.
- **세션 범위**—사용자 세션의 모든 트레이스(및 해당 트레이스의 모든 스팬)를 단일 프롬프트로 LLM 평가자에게 전달하여 평가 시 전체 멀티턴 상호작용을 기반으로 추론할 수 있도록 합니다. 전체 워크스루, 사용 사례 및 프롬프트 예시는 [세션 수준 평가][17]를 참조하세요.

## 사용자 지정 LLM-as-a-judge 평가 생성 {#create-a-custom-llm-as-a-judge-evaluation}

Agent Observability의 [평가 페이지][1]에서 사용자 지정 평가를 생성하고 관리할 수 있습니다. 평가 설명을 제공하여 평가를 생성하거나, 당사에서 제공하는 기존 [LLM-as-a-judge 평가 템플릿][7]을 사용 및 확장하거나, 처음부터 직접 만들 수도 있습니다. 트레이싱을 활성화하여 평가에서 트레이스를 확인할 수 있습니다.

<div class="alert alert-info">SDK에 이미 <code>LLMJudge</code> 가 정의되어 있다면 UI에서 구성을 다시 만들지 않고 Datadog에 직접 게시할 수 있습니다. 자세한 내용은 <a href="/llm_observability/investigate/evaluations/evaluation_developer_guide/#publishing-an-llmjudge-as-a-datadog-managed-evaluation">Datadog 관리형 평가로서 LLMJudge 게시하기</a>를 참조하십시오.</div>

[호환성 요구 사항][6]에 대해 자세히 알아보세요.

### 프롬프트 구성 {#configure-the-prompt}

1. Datadog에서 Agent Observability [평가 페이지][1]로 이동합니다. {{< ui >}}Create Evaluation{{< /ui >}}을 선택한 다음 {{< ui >}}Create your own{{< /ui >}}을 선택합니다.
   {{< img src="llm_observability/evaluations/EvalConfig_LLMO_1.png" alt="평가 생성을 선택한 후의 Agent Observability 평가 페이지입니다." style="width:100%;" >}}
1. 평가에 대한 트레이스를 활성화하려면 {{< ui >}}Tracing Disabled{{< /ui >}} 버튼을 클릭한 다음 {{< ui >}}Trace Evaluations{{< /ui >}} 토글을 선택하여 트레이스를 활성화합니다. 이 평가가 실행되면 해당 트레이스가 `datadog-evaluations` 아래에 나타나 평가에 대한 가시성이 향상됩니다. **참고**: 트레이싱을 활성화하면 Datadog으로 전송되는 청구 대상 스팬 수가 증가합니다.
    {{< img src="llm_observability/evaluations/evaluation_tracing_enabled.png" alt="평가 트레이싱 활성화 토글을 선택한 후 트레이스 평가가 활성화됩니다." >}}
1. 명확하고 이름을 알기 쉽게 나타내는 {{< ui >}}evaluation name{{< /ui >}}을 사용하세요(예: `factuality-check` 또는 `tone-eval`). 평가 결과를 쿼리할 때 이 이름을 사용할 수 있습니다. 이 이름은 애플리케이션 내에서 고유해야 합니다.
1. 모델 구성:
    1. 드롭다운 메뉴를 선택하여 {{< ui >}}Account{{< /ui >}} LLM 평가자에 사용할 LLM 공급자와 해당 계정을 선택합니다. 새 계정을 연결하려면 [LLM 공급자 연결][2]을 참조하세요.
        - 계정을 선택하는 경우 {{< ui >}}Amazon Bedrock{{< /ui >}} 계정이 구성된 리전을 선택합니다. 그런 다음 모델 이름을 선택하거나 추론 프로필 ARN을 제공할 수 있습니다.
        - 계정을 선택하는 경우 {{< ui >}}Vertex{{< /ui >}} 프로젝트와 위치를 선택합니다. {{< ui >}}Location{{< /ui >}} 드롭다운에는 단일 리전, 다중 리전 및 글로벌 옵션이 포함되어 있습니다. 각 옵션에 대한 자세한 내용은 [Google Vertex AI 위치 문서][18]를 참조하세요.
    1. 드롭다운 메뉴를 사용하여 {{< ui >}}Model{{< /ui >}} 모델을 선택합니다.
1. 평가할 애플리케이션, 평가 대상(스팬, 트레이스 또는 세션) 및 샘플링 속도를 {{< ui >}}Runs On{{< /ui >}}에서 선택합니다. 샘플링 속도 오른쪽에 있는 버튼을 선택하여 필터링 기준을 더 추가할 수 있습니다.
1. {{< ui >}}Template{{< /ui >}} 섹션에서 드롭다운 메뉴를 사용합니다.
   - {{< ui >}}Create from scratch{{< /ui >}}: 사용자 설정 프롬프트(다음 단계에서 정의됨)를 사용합니다.
   - {{< ui >}}Failure to Answer{{< /ui >}}, {{< ui >}}Prompt Injection{{< /ui >}}, {{< ui >}}Sentiment{{< /ui >}} 등: 기존 프롬프트 템플릿을 채웁니다. 이러한 템플릿을 그대로 사용하거나 특정 평가 로직에 맞게 수정할 수 있습니다.
1.  {{< ui >}}System Prompt{{< /ui >}} 필드에 사용자 지정 프롬프트를 입력하거나 프롬프트 템플릿을 수정합니다.
   사용자 지정 프롬프트의 경우 평가자가 무엇을 평가해야 하는지 설명하는 명확한 지침을 제공하세요.
   - 단일 평가 목표에 집중하세요.
   - 입력/출력 쌍, 예상 결과 및 추론을 보여주는 2~3개의 퓨샷(few-shot) 예시를 포함하세요.

{{% collapse-content title="사용자 정의 프롬프트 예시" level="h4" expanded=false id="custom-prompt-example" %}}
**시스템 프롬프트**

```
You will be looking at interactions between a user and a budgeting AI agent. Your job is to classify the user's intent when it comes to using the budgeting AI agent.

You will be given a Span Input, which represents the user's message to the agent, which you will then classify. Here are some examples.

Span Input: What are the core things I should know about budgeting?
Classification: general_financial_advice

Span Input: Did I go over budget with my grocery bills last month?
Classification: budgeting_question

Span Input: What is the category for which I have the highest budget?
Classification: budgeting_question

Span Input: Based on my past months, what is my ideal budget for subscriptions?
Classification: budgeting_advice

Span Input: Raise my restaurant budget by $50
Classification: budgeting_request

Span Input: Help me plan a trip to the Maldives
Classification: unrelated
```

**사용자**

```
Span Input: {{span_input}}
```
{{% /collapse-content %}}

8. {{< ui >}}User Prompt{{< /ui >}} 필드에서 변수를 추가하여 평가할 스팬, 트레이스 또는 세션의 부분을 지정하세요. Span Input(`{{span_input}}`), Output(`{{span_output}}`), 또는 기타 스팬 필드와 같은 모든 스팬 속성을 추가할 수 있습니다. 트레이스 범위 평가에서 여러 스팬에 걸쳐 값을 읽으려면 `{{spans...}}` 경로를 사용하고, 세션 범위 평가에서 여러 트레이스에 걸쳐 값을 읽으려면 `{{traces...}}` 경로를 사용하세요. 전체 참조 문서는 [프롬프트 템플릿][15]을 확인하세요. 사용자 프롬프트를 직접 수정하려면 해당 프롬프트를 선택하고 텍스트를 수정하세요.

   오른쪽 패널({{< ui >}}Filtered Spans{{< /ui >}}은 스팬 범위, {{< ui >}}Filtered Traces{{< /ui >}}는 트레이스 범위, {{< ui >}}Filtered Sessions{{< /ui >}}은 세션 범위)을 사용하여 스팬 데이터를 변수로 추가할 수도 있습니다.
   1. 스팬, 트레이스 또는 세션이 오른쪽에 표시되도록 계정과 애플리케이션을 선택하세요.
   2. 오른쪽에 있는 스팬 중 하나를 선택하여 해당 JSON을 확인하세요.
   3. 사용자 프롬프트에 JSON을 추가하려면 {{< ui >}}+{{< /ui >}}를 선택하세요.

{{< img src="llm_observability/evaluations/custom_llm_judge_2-5.png" alt="사용자 지정 평가 구성 오른쪽 창에 있는 JSON 뷰의 메뉴 콘텐츠로, '메시지에 변수 추가' 옵션이 표시되어 있습니다." style="width:40%;" >}}

### 평가 출력 정의 {#define-the-evaluation-output}

OpenAI, Azure OpenAI, Vertex AI, Anthropic 또는 Amazon Bedrock 모델의 경우 [구조화된 출력](#structured-output)을 구성하세요.

Anthropic 또는 Amazon Bedrock 모델의 경우, 대신 [키워드 검색 출력](#keyword-search-output)을 구성할 수 있습니다.

AI Gateway의 경우 [구조화된 출력](#structured-output)과 [키워드 검색 출력](#keyword-search-output)이 모두 지원됩니다. Datadog은 모델이 지원하는 경우 구조화된 출력을 사용하고, 그렇지 않은 경우 키워드 검색 출력으로 대체하는 것을 권장합니다.

{{% collapse-content title="구조화된 출력(OpenAI, Azure OpenAI, Anthropic, Amazon Bedrock, AI Gateway, Vertex AI)" level="h4" expanded="true" id="structured-output" %}}
1. 평가 출력 유형을 선택하세요.

   - {{< ui >}}Boolean{{< /ui >}}: True/False 결과(예: '모델이 지침을 따랐습니까?')
   - {{< ui >}}Score{{< /ui >}}: 수치로 나타낸 등급(예: 1~5점 척도로 유용성 평가)
   - {{< ui >}}Categorical{{< /ui >}}: 개별 레이블(예: '좋음', '나쁨', '중립')
   - {{< ui >}}JSON{{< /ui >}}: JSON은 자유 형식 스키마를 허용합니다.

2. {{< ui >}}Enable Reasoning{{< /ui >}}을 선택합니다(선택 사항). 이는 LLM 평가자가 결정에 대한 짧은 근거를 제공하도록 구성합니다(예: 8점이 부여된 이유). 추론은 평가가 어떻게, 그리고 왜 이루어지는지 이해하는 데 도움을 주며, 어조, 공감, 유용성과 같은 주관적인 메트릭을 감사하는 데 특히 유용합니다. 추론을 추가하면 [LLM 평가자의 정확도를 높일 수](https://arxiv.org/abs/2504.00050)도 있습니다.

3. 평가 출력 유형을 정의하는 JSON 스키마를 편집하세요.

{{< tabs >}}
{{% tab "Boolean" %}}
**Boolean** 출력 유형의 경우, `description` 필드를 편집하여 사용 사례에서 true와 false가 무엇을 의미하는지 자세히 설명하세요.
{{% /tab %}}

{{% tab "Score" %}}
**Score** 출력 유형의 경우:
- 평가를 위한 `min` 및 `max` 점수를 설정하세요.
- 평가 척도를 자세히 설명하려면 `description` 필드를 편집하세요.
{{% /tab %}}
{{% tab "Categorical" %}}
**Categorical** 출력 유형의 경우:
- JSON 스키마를 편집하여 카테고리를 추가하거나 제거하세요.
- 카테고리 이름을 편집하세요.
- 카테고리의 `description` 필드를 편집하여 평가 컨텍스트에서 각 카테고리가 무엇을 의미하는지 자세히 설명하세요.


카테고리형 평가를 위한 스키마 예시:

```
{
    "name": "categorical_eval",
    "schema": {
        "type": "object",
        "required": [
            "categorical_eval",
            "reasoning"
        ],
        "properties": {
            "categorical_eval": {
                "type": "string",
                "anyOf": [
                    {
                        "const": "budgeting_question",
                        "description": "The user is asking a question about their budget. The answer can be directly determined by looking at their budget and spending."
                    },
                    {
                        "const": "budgeting_request",
                        "description": "The user is asking to change something about their budget. This should involve an action that changes their budget."
                    },
                    {
                        "const": "budgeting_advice",
                        "description": "The user is asking for advice on their budget. This should not require a change to their budget, but it should require an analysis of their budget and spending."
                    },
                    {
                        "const": "general_financial_advice",
                        "description": "The user is asking for general financial advice which is not directly related to their specific budget. However, this can include advice about budgeting in general."
                    },
                    {
                        "const": "unrelated",
                        "description": "This is a catch-all category for things not related to budgeting or financial advice."
                    }
                ]
            },
            "reasoning": {
                "type": "string",
                "description": "Describe how you decided the category"
            }
        },
        "additionalProperties": false
    },
    "strict": true
}
```
{{% /tab %}}
{{% tab "JSON" %}}
**JSON** 출력 유형의 경우, 복잡하고 구조화된 평가 결과를 캡처할 수 있도록 자유 형식의 JSON 스키마를 정의합니다.

JSON 평가를 위한 스키마 예시:

```
{
    "name": "json_eval",
    "schema": {
        "type": "object",
        "required": [
            "result",
            "reasoning"
        ],
        "properties": {
            "result": {
                "type": "object",
                "description": "The structured evaluation result",
                "properties": {
                    "is_compliant": {
                        "type": "boolean",
                        "description": "Whether the response meets compliance requirements"
                    },
                    "confidence_score": {
                        "type": "number",
                        "description": "Confidence level of the evaluation from 0 to 1"
                    },
                    "issue_count": {
                        "type": "integer",
                        "description": "Number of issues identified in the response"
                    }
                },
                "required": ["is_compliant", "confidence_score", "issue_count"],
                "additionalProperties": false
            },
            "reasoning": {
                "type": "string",
                "description": "Describe the reasoning behind your evaluation"
            }
        },
        "additionalProperties": false
    },
    "strict": true
}
```
{{% /tab %}}
{{< /tabs >}}


4. {{< ui >}}Assessment Criteria{{< /ui >}}를 구성하세요.
   이러한 유연성을 통해 팀의 품질 기준에 맞춰 평가 결과를 조정할 수 있습니다. Pass/Fail 매핑은 Datadog Agent Observability 전반의 자동화에도 활용되며, 모니터와 대시보드가 성능 저하를 플래그하거나 전반적인 상태를 추적할 수 있도록 지원합니다.

{{< tabs >}}
{{% tab "Boolean" %}}
결과를 'Pass'로 표시하려면 {{< ui >}}True{{< /ui >}}를 선택하고, 결과를 'Fail'로 표시하려면 {{< ui >}}False{{< /ui >}}를 선택하세요.
{{% /tab %}}

{{% tab "Score" %}}
Pass 여부를 판단할 수치 임계값을 정의하세요.
{{% /tab %}}
{{% tab "Categorical" %}}
Pass 상태로 매핑할 카테고리를 선택하세요. 예를 들어, `Excellent`, `Good`, `Poor` 범주가 있고 그중 `Poor`만 실패 상태에 해당하는 경우에는 `Excellent`와 `Good`을 선택하세요.
{{% /tab %}}
{{% tab "JSON" %}}
LLM-as-a-Judge 평가자의 출력에 기반하여 평가를 할당하는 JavaScript 함수를 제공하세요. 함수는 다음 형식의 json 객체를 반환해야 합니다.

```
{
    assessment: "pass", // "pass" | "fail" [REQUIRED],
    value: "evaluation_label" // string [OPTIONAL],
    reasoning: "explanation behind the assessment" // string [OPTIONAL]

}
```
함수 서명은 `function __evalPostProcessing(input)`이어야 하며 `input`은 평가자의 json입니다. 아래 함수는 후처리 함수의 예입니다.

```
function __evalPostProcessing(input) {
    /*
     * Expected input shape (from LLM evaluator [this depends on the JSON Structured Output]):
     * {
     *   criteria: {
     *     quality_score: { score: number (0–1), category: "excellent"|"good"|"poor", reasoning: string },
     *     toxicity:      { score: number (0–1), category: "safe"|"unsafe",           reasoning: string },
     *     completeness:  { score: number (0–1), category: "complete"|"incomplete",   reasoning: string },
     *     relevance:     { score: number (0–1), category: "relevant"|"irrelevant",   reasoning: string },
     *   },
     *   overall_reasoning: string  // (optional) top-level summary from LLM evaluator
     * }
     */

    const SCORE_THRESHOLD = 0.7;

    // Category → pass/fail mappings per criterion
    const CATEGORY_PASS_MAP = {
        quality_score: ["excellent", "good"],
        toxicity:      ["safe"],
        completeness:  ["complete"],
        relevance:     ["relevant"],
    };

    const criteriaResults = {};
    const failures = [];
    const passes = [];

    for (const [criterionName, passCategories] of Object.entries(CATEGORY_PASS_MAP)) {
        const criterion = input?.criteria?.[criterionName];

        if (!criterion) {
            failures.push(`[${criterionName}] Missing from evaluator output.`);
            criteriaResults[criterionName] = false;
            continue;
        }

        const { score, category, reasoning } = criterion;

        const scorePass    = typeof score === "number" && score >= SCORE_THRESHOLD;
        const categoryPass = typeof category === "string" && passCategories.includes(category.toLowerCase());

        // Both score AND category must pass
        const criterionPass = scorePass && categoryPass;
        criteriaResults[criterionName] = criterionPass;

        if (criterionPass) {
            passes.push(`[${criterionName}] PASS — score: ${score.toFixed(2)}, category: "${category}". ${reasoning ?? ""}`);
        } else {
            const reasons = [];
            if (!scorePass)    reasons.push(`score ${score?.toFixed(2) ?? "N/A"} below threshold (≥${SCORE_THRESHOLD})`);
            if (!categoryPass) reasons.push(`category "${category}" not in acceptable set [${passCategories.join(", ")}]`);
            failures.push(`[${criterionName}] FAIL — ${reasons.join("; ")}. ${reasoning ?? ""}`);
        }
    }

    // Determine overall assessment
    const passed = Object.values(criteriaResults).every(Boolean);
    const failCount = failures.length;

    const assessment = passed ? "pass" : "fail";

    const label = passed
        ? "high_quality_response"
        : failCount === 1
            ? "minor_quality_issue"
            : failCount === 2
                ? "moderate_quality_issue"
                : "low_quality_response";

    const reasoningParts = [
        passed
            ? "All criteria passed."
            : `${failCount} criterion/criteria failed.`,
        ...failures,
        ...passes,
        input?.overall_reasoning ? `Evaluator summary: ${input.overall_reasoning}` : ""
    ].filter(Boolean);

    return {
        assessment: assessment,
        value: label,
        reasoning: reasoningParts.join(" | ")
    };
}
```
{{% /tab %}}
{{< /tabs >}}


{{% /collapse-content %}}

{{% collapse-content title="후처리(OpenAI, Azure OpenAI, Anthropic, Amazon Bedrock, AI Gateway, Vertex AI)" level="h4" expanded="true" id="post-processing" %}}
1. {{< ui >}}JSON{{< /ui >}} 출력 유형을 선택하세요.

2. 평가자의 평가, 값 및 추론을 식별하는 JavaScript 함수를 제공하세요. 후처리를 사용하면 Boolean, Score 또는 Categorical과 같은 구조화된 출력만 사용하는 것보다 더 복잡한 평가를 수행할 수 있습니다.

    후처리 함수는 값이 'pass' 또는 'fail'인 **평가**와, 선택적으로 값 또는 추론 문자열을 포함하는 객체를 반환해야 합니다. 함수는 다음 형식의 json 객체를 반환해야 합니다.
    ```
    {
        assessment: "pass", // "pass" | "fail" [REQUIRED],
        value: "evaluation_label" // string [OPTIONAL],
        reasoning: "explanation behind the assessment" // string [OPTIONAL]

    }
    ```
    and the function signature must be `function __evalPostProcessing(input)` and the `input` is the json from the evaluator. The function below is an example of a post processing function:
    ```
    function __evalPostProcessing(input) {
        /*
        * Expected input shape (from LLM evaluator [this depends on the JSON Structured Output]):
        * {
        *   criteria: {
        *     quality_score: { score: number (0–1), category: "excellent"|"good"|"poor", reasoning: string },
        *     toxicity:      { score: number (0–1), category: "safe"|"unsafe",           reasoning: string },
        *     completeness:  { score: number (0–1), category: "complete"|"incomplete",   reasoning: string },
        *     relevance:     { score: number (0–1), category: "relevant"|"irrelevant",   reasoning: string },
        *   },
        *   overall_reasoning: string  // (optional) top-level summary from LLM evaluator
        * }
        */

        const SCORE_THRESHOLD = 0.7;

        // Category → pass/fail mappings per criterion
        const CATEGORY_PASS_MAP = {
            quality_score: ["excellent", "good"],
            toxicity:      ["safe"],
            completeness:  ["complete"],
            relevance:     ["relevant"],
        };

        const criteriaResults = {};
        const failures = [];
        const passes = [];

        for (const [criterionName, passCategories] of Object.entries(CATEGORY_PASS_MAP)) {
            const criterion = input?.criteria?.[criterionName];

            if (!criterion) {
                failures.push(`[${criterionName}] Missing from evaluator output.`);
                criteriaResults[criterionName] = false;
                continue;
            }

            const { score, category, reasoning } = criterion;

            const scorePass    = typeof score === "number" && score >= SCORE_THRESHOLD;
            const categoryPass = typeof category === "string" && passCategories.includes(category.toLowerCase());

            // Both score AND category must pass
            const criterionPass = scorePass && categoryPass;
            criteriaResults[criterionName] = criterionPass;

            if (criterionPass) {
                passes.push(`[${criterionName}] PASS — score: ${score.toFixed(2)}, category: "${category}". ${reasoning ?? ""}`);
            } else {
                const reasons = [];
                if (!scorePass)    reasons.push(`score ${score?.toFixed(2) ?? "N/A"} below threshold (≥${SCORE_THRESHOLD})`);
                if (!categoryPass) reasons.push(`category "${category}" not in acceptable set [${passCategories.join(", ")}]`);
                failures.push(`[${criterionName}] FAIL — ${reasons.join("; ")}. ${reasoning ?? ""}`);
            }
        }

        // Determine overall assessment
        const passed = Object.values(criteriaResults).every(Boolean);
        const failCount = failures.length;

        const assessment = passed ? "pass" : "fail";

        const label = passed
            ? "high_quality_response"
            : failCount === 1
                ? "minor_quality_issue"
                : failCount === 2
                    ? "moderate_quality_issue"
                    : "low_quality_response";

        const reasoningParts = [
            passed
                ? "All criteria passed."
                : `${failCount} criterion/criteria failed.`,
            ...failures,
            ...passes,
            input?.overall_reasoning ? `Evaluator summary: ${input.overall_reasoning}` : ""
        ].filter(Boolean);

        return {
            assessment: assessment,
            value: label,
            reasoning: reasoningParts.join(" | ")
        };
    }
    ```
{{% /collapse-content %}}


{{% collapse-content title="키워드 검색 출력(Anthropic, Amazon Bedrock, AI Gateway)" level="h4" expanded="true" id="keyword-search-output" %}}
1. {{< ui >}}Boolean{{< /ui >}} 출력 유형을 선택하세요.
   <div class="alert alert-info">키워드 검색 출력의 경우 <strong>Boolean</strong> 출력 유형만 사용할 수 있습니다.</div>

2. 평가 결과가 각각 True 또는 False가 되는 경우를 정의하는 {{< ui >}}True keywords{{< /ui >}}와 {{< ui >}}False keywords{{< /ui >}}를 제공하세요.

   Datadog은 LLM-as-a-judge의 응답 텍스트에서 정의한 키워드를 검색하여 평가에 적합한 결과를 제공합니다. 이러한 이유로 LLM에 사용자가 선택한 키워드로 응답하도록 지시해야 합니다.

   예를 들어 다음과 같이 설정하는 경우:

   - {{< ui >}}True keywords{{< /ui >}}: Yes, yes
   - {{< ui >}}False keywords{{< /ui >}}: No, no

   그러면 시스템 프롬프트에 `Respond with "yes" or "no"`과 같은 내용이 포함되어야 합니다.

3. {{< ui >}}Assessment Criteria{{< /ui >}}의 경우:
   - {{< ui >}}True{{< /ui >}}를 선택하여 결과를 'Pass'로 표시하세요.
   - {{< ui >}}False{{< /ui >}}를 선택하여 결과를 'Fail'로 표시하세요.

   이러한 유연성을 통해 팀의 품질 기준에 맞춰 평가 결과를 조정할 수 있습니다. Pass/Fail 매핑은 Datadog Agent Observability 전반의 자동화에도 활용되며, 모니터와 대시보드가 성능 저하를 플래그하거나 전반적인 상태를 추적할 수 있도록 지원합니다.
{{% /collapse-content %}}

{{< img src="llm_observability/evaluations/custom_llm_judge_5-2.png" alt="구조화된 출력에서 추론 및 평가 기준을 포함한 사용자 지정 평가 출력을 구성하는 화면." style="width:100%;" >}}

### 평가 범위 정의: 필터링 및 샘플링 {#define-the-evaluation-scope-filtering-and-sampling}

<div class="alert alert-info">평가에 사용되는 스팬 필드는 각각 250KB로 제한됩니다. 이 크기를 초과하는 필드는 LLM 평가자에게 전송되기 전에 잘립니다.</div>

{{< ui >}}Evaluation Scope{{< /ui >}}에서 평가가 어디서 어떻게 실행될지 정의하세요. 이를 통해 범위(어떤 스팬이나 트레이스가 포함되는지)와 비용(얼마나 샘플링되는지)을 제어할 수 있습니다.
   - {{< ui >}}Application{{< /ui >}}: 평가하려는 애플리케이션을 선택하세요.
   - {{< ui >}}Evaluate On{{< /ui >}}: 다음 옵션 중 하나를 선택하세요.
      - {{< ui >}}Trace{{< /ui >}}: 모든 스팬을 포함한 전체 트레이스를 단일 단위로 평가하세요. 답변을 평가할 때 여러 스팬의 컨텍스트를 종합적으로 고려해야 하는 경우(에이전트 목표 완료, 도구 사용 과정, RAG 충실도)에 사용하세요. 트레이스 완료 여부를 판단하는 방법에 대한 예시와 자세한 내용은 [트레이스 수준 평가][16]를 참조하세요.
      - {{< ui >}}Span{{< /ui >}}: 일치하는 스팬을 개별적으로 평가하세요. {{< ui >}}Query{{< /ui >}} 필드를 사용하여 특정 스팬으로 범위를 지정하세요(예: 루트 스팬만, `llm` 스팬만, 또는 특정 태그가 있는 스팬만).
      - {{< ui >}}Session{{< /ui >}}: 모든 트레이스와 해당 스팬을 포함한 전체 사용자 세션을 단일 단위로 평가하세요. 답변을 평가할 때 동일 세션 내 여러 트레이스의 컨텍스트를 종합적으로 고려해야 하는 경우(사용자 만족도, 멀티턴 일관성, 또는 시간 경과에 따른 사용자 행동)에 사용하세요. `session_id`로 태그된 스팬이 필요합니다. 세션 완료 여부를 판단하는 방법에 대한 예시와 자세한 내용은 [세션 수준 평가][17]를 참조하세요.
   - {{< ui >}}Query{{< /ui >}}: (선택 사항) 평가할 스팬이나 트레이스를 필터링하려면 Datadog 쿼리 구문을 사용하여 쿼리를 입력하세요. 예를 들면 다음과 같습니다.
      - `@name:agent.workflow`: 스팬 이름으로 필터링할 때
      - `env:prod`: 태그로 필터링할 때
      - `@parent_id:undefined` 루트 스팬만 평가할 때({{< ui >}}Evaluate On{{< /ui >}}이 {{< ui >}}Span{{< /ui >}}으로 설정된 경우)
      - `@name:agent.workflow AND env:prod`: 스팬 이름 및 태그로 필터링할 때
   - {{< ui >}}Sampling Rate{{< /ui >}}: (선택 사항) 평가 비용을 제어하려면 샘플링(예: 10%)을 적용하세요.

{{< img src="llm_observability/evaluations/evaluation_scope_1.png" alt="평가 범위를 구성하는 화면." style="width:100%;" >}}

### 테스트 및 미리보기 {#test-and-preview}

오른쪽 창에는 구성된 평가 범위에 해당하는 {{< ui >}}Filtered Spans{{< /ui >}}(또는 트레이스)가 표시됩니다.

평가에 사용할 수 있는 JSON 데이터를 표시하려면 스팬을 선택하세요. 그런 다음 {{< ui >}}Test Evaluation{{< /ui >}}을 클릭하여 스팬의 데이터로 평가의 입력란을 미리 채우고, {{< ui >}}Run{{< /ui >}}을 클릭하여 테스트하세요.

## 결과 조회 및 사용 {#viewing-and-using-results}

사용자가 평가를 {{< ui >}}Save and Publish{{< /ui >}}하면, Datadog은 대상 스팬에 대해 평가를 자동으로 실행합니다. 또는 {{< ui >}}Save as Draft{{< /ui >}}하여 나중에 평가를 편집하거나 활성화할 수 있습니다.

게시된 평가에 대한 결과는 Agent Observability 전반에서 실시간에 가깝게 조회할 수 있습니다. 특정 스팬에 대한 사용자 지정 LLM-as-a-judge 결과는 다른 평가와 함께 {{< ui >}}Evaluations{{< /ui >}} 탭에서 찾을 수 있습니다.

{{< img src="llm_observability/evaluations/custom_llm_judge_3-2.png" alt="관리형 평가와 함께 사용자 지정 평가 결과를 표시하는 트레이스의 평가 탭." style="width:100%;" >}}

각 평가 결과에는 다음이 포함됩니다.

- 평가된 값(예: `True`, `9` 또는 `Neutral`)
- 추론(활성화된 경우)
- Pass/Fail 표시(평가 기준 기반)

`@evaluation.<evaluation_name>.value` 구문을 사용하여 결과를 쿼리하거나 시각화하세요.

예를 들면 다음과 같습니다.

```
@evaluation.helpfulness-check.value
```

{{< img src="llm_observability/evaluations/custom_llm_judge_4.png" alt="Agent Observability 트레이스 화면. 검색 상자에 사용자가 `@evaluation.budget-guru-intent-classifier.value:budgeting_question`을 입력했으며, 아래에 결과가 표시되어 있습니다." style="width:100%;" >}}


다음을 수행할 수 있습니다.
- 평가 결과별로 트레이스 필터링(예: `@evaluation.helpfulness-check.value`)
- Pass/Fail 평가 상태별로 필터링(예: `@evaluation.helpfulness-check.assessment:fail`)
- 평가 결과를 [패싯][3]으로 사용하세요.
- Agent Observability 개요 페이지의 평가 섹션에서 집계 결과를 조회하세요.
- [모니터][4]를 생성하여 성능 변화나 회귀에 대해 경고하세요.

## 실험에서 사용하기 {#using-in-experiments}

로컬 [LLM 실험][8]에서 사용자 지정 LLM-as-a-judge 평가를 재사용하려면 SDK에서 `RemoteEvaluator`를 사용하여 이름으로 참조하세요.

{{< code-block lang="python" >}}
from ddtrace.llmobs import LLMObs, RemoteEvaluator

evaluator = RemoteEvaluator(eval_name="quality-assessment")

experiment = LLMObs.experiment(
    name="my-experiment",
    task=my_task,
    dataset=dataset,
    evaluators=[evaluator],
)
experiment.run()
{{< /code-block >}}

동일한 실험에서 `RemoteEvaluator`를 다른 로컬 평가자와 혼합하여 사용할 수 있습니다. 사용자 지정 입력 매핑, 오류 처리 및 기타 옵션에 대한 자세한 내용은 평가 개발자 가이드의 [RemoteEvaluator][9]를 참조하세요.

## 신뢰할 수 있는 사용자 지정 평가를 위한 모범 사례 {#best-practices-for-reliable-custom-evaluations}

- **작은 범위부터 시작하기**: 평가 규모를 확장하기 전에 단일하고 명확하게 정의된 실패 모드를 대상으로 합니다.
- **추론 활성화하기**: 판단 근거를 설명할 수 있어야 하고 복잡한 추론 작업의 정확도를 개선해야 할 때 사용합니다.
- **반복하기**: 실행하고, 출력을 검토한 후 프롬프트를 개선합니다.
- **검증하기**: 샘플링된 트레이스를 사용하여 주기적으로 평가자의 정확도를 검사합니다.
- **평가 기준 문서화하기**: 시간이 지남에 따라 편차가 발생하지 않도록 'Pass'와 'Fail'의 의미를 명확하게 정의합니다.
- **평가자 재조정하기**: 기본 LLM이 업데이트되면 프롬프트와 퓨샷 예시를 다시 검토합니다.

## 예상 토큰 사용량 {#estimated-token-usage}

[LLM 평가 토큰 사용량 대시보드][10]를 사용하여 LLM 평가의 토큰 사용량을 모니터링할 수 있습니다.

자세한 정보가 필요한 경우, 다음 메트릭을 통해 평가를 수행하는 데 소비된 LLM 리소스를 추적할 수 있습니다.

- `ml_obs.estimated_usage.llm.input.tokens`
- `ml_obs.estimated_usage.llm.output.tokens`
- `ml_obs.estimated_usage.llm.total.tokens`

이러한 각 메트릭에는 `ml_app`, `model_server`, `model_provider`, `model_name` 및 `evaluation_name` 태그가 있어 사용량에 영향을 미치는 특정 애플리케이션, 모델 및 평가를 정확하게 파악할 수 있습니다.

## API에서 LLM-as-a-judge 평가 구성 {#configure-llm-as-a-judge-evaluations-from-the-api}

환경에 `DD_API_KEY` [API 키][14]를 지정한 후, 기본적인 CRUD 작업을 사용하여 관리형 평가 구성을 조작할 수 있습니다.

 - [GET][11] 기존 평가 구성
 - [PUT][12] 기존 평가 구성
 - [DELETE][13] 기존 평가 구성

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/llm/evaluations
[2]: /ko/llm_observability/investigate/evaluations/llm_as_a_judge_evaluations/connect_to_account
[3]: /ko/events/explorer/facets/
[4]: /ko/monitors/
[5]: https://arxiv.org/abs/2504.00050
[6]: /ko/llm_observability/investigate/evaluations/compatibility
[7]: /ko/llm_observability/investigate/evaluations/llm_as_a_judge_evaluations/template_evaluations/
[8]: /ko/llm_observability/improve/experiments
[9]: /ko/llm_observability/investigate/evaluations/evaluation_developer_guide/#using-managed-evaluators
[10]: https://app.datadoghq.com/dash/integration/llm_evaluations_token_usage
[11]: /ko/api/latest/agent-observability/#get-a-custom-evaluator-configuration
[12]: /ko/api/latest/agent-observability/#create-or-update-a-custom-evaluator-configuration
[13]: /ko/api/latest/agent-observability/#delete-a-custom-evaluator-configuration
[14]: /ko/account_management/api-app-keys
[15]: /ko/llm_observability/investigate/evaluations/llm_as_a_judge_evaluations/prompt_templating
[16]: /ko/llm_observability/investigate/evaluations/llm_as_a_judge_evaluations/trace_level_evaluations
[17]: /ko/llm_observability/investigate/evaluations/llm_as_a_judge_evaluations/session_level_evaluations
[18]: https://docs.cloud.google.com/gemini-enterprise-agent-platform/resources/locations