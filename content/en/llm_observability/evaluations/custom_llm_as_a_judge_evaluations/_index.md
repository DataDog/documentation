---
title: Custom LLM-as-a-Judge Evaluations
description: How to create custom LLM-as-a-judge evaluations, and how to use these evaluation results across Agent Observability.
further_reading:
- link: "https://www.datadoghq.com/blog/manage-ai-cost-and-performance-with-datadog/"
  tag: "Blog"
  text: "Driving AI ROI: How Datadog connects cost, performance, and infrastructure so you can scale responsibly"
- link: https://www.datadoghq.com/blog/llm-aws-strands
  tag: Blog
  text: Gain visibility into Strands Agents workflows with Datadog LLM Observability
- link: "https://www.datadoghq.com/blog/llm-evaluation-framework-best-practices/"
  tag: "Blog"
  text: "Building an LLM evaluation framework: best practices"
- link: "/llm_observability/terms/"
  tag: "Documentation"
  text: "Learn about Agent Observability terms and concepts"
- link: "/llm_observability/setup"
  tag: "Documentation"
  text: "Learn how to set up Agent Observability"
- link: "/llm_observability/evaluations/managed_evaluations"
  tag: "Documentation"
  text: "Learn about managed evaluations"
- link: "https://huggingface.co/learn/cookbook/llm_judge"
  tag: "Hugging Face"
  text: "Using LLM-as-a-judge for an automated and versatile evaluation"
---

Custom LLM-as-a-judge evaluations use an LLM to judge the performance of another LLM. Define evaluation logic with natural language prompts, capture subjective or objective criteria (like tone, helpfulness, or factuality), and run the evaluations at scale on:

- **Span scope**—score the input and output of one LLM call, agent step, or tool invocation in isolation.
- **Trace scope**—feed every span of a trace to the LLM judge in a single prompt, so the evaluation can reason across steps. See [Trace-Level Evaluations][16] for the full walkthrough, use cases, and prompt examples.
- **Session scope**—feed every trace in a user session (and every span in those traces) to the LLM judge in a single prompt, so the evaluation can reason across an entire multi-turn interaction. See [Session-Level Evaluations][17] for the full walkthrough, use cases, and prompt examples.

## Create a custom LLM-as-a-judge evaluation

You can create and manage custom evaluations from the [Evaluations page][1] in Agent Observability. You can provide an evaluation description to generate an evaluation, use and build on existing [template LLM-as-a-judge evaluations][7] we provide, or start from scratch. You can enable tracing to see traces from your evaluations.

<div class="alert alert-info">If you already have an <code>LLMJudge</code> defined in the SDK, you can publish it directly to Datadog without rebuilding the configuration in the UI. See <a href="/llm_observability/guide/evaluation_developer_guide/#publishing-an-llmjudge-as-a-datadog-managed-evaluation">Publishing an LLMJudge as a Datadog managed evaluation</a>.</div>

Learn more about the [compatibility requirements][6].

### Configure the prompt

1. In Datadog, navigate to the Agent Observability [Evaluations page][1]. Select {{< ui >}}Create Evaluation{{< /ui >}}, then select {{< ui >}}Create your own{{< /ui >}}.
   {{< img src="llm_observability/evaluations/EvalConfig_LLMO_1.png" alt="The Agent Observability Evaluations page after selecting Create Evaluation." style="width:100%;" >}}
1. To enable tracing for evaluations, click the {{< ui >}}Tracing Disabled{{< /ui >}} button, then select the {{< ui >}}Trace Evaluations{{< /ui >}} toggle to enable tracing. When this evaluation runs, its traces appear under `datadog-evaluations`, giving you greater visibility into your evaluations. **Note**: Enabling tracing increases the number of billed spans sent to Datadog.
    {{< img src="llm_observability/evaluations/evaluation_tracing_enabled.png" alt="Trace Evaluations enabled after the toggle to enable evaluation tracing has been selected." >}}
1. Provide a clear, descriptive {{< ui >}}evaluation name{{< /ui >}} (for example, `factuality-check` or `tone-eval`). You can use this name when querying evaluation results. The name must be unique within your application.
1. Configure the model:
    1. Select the {{< ui >}}Account{{< /ui >}} dropdown menu to select the LLM provider and corresponding account to use for your LLM judge. To connect a new account, see [connect an LLM provider][2].
        - If you select an {{< ui >}}Amazon Bedrock{{< /ui >}} account, choose a region the account is configured for. You can then select a model name or provide the inference profile ARN.
        - If you select a {{< ui >}}Vertex{{< /ui >}} account, choose a project and location.
    1. Use the {{< ui >}}Model{{< /ui >}} dropdown menu to select a model.
1. In {{< ui >}}Runs On{{< /ui >}}, select the application you want to evaluate, what you want to evaluate on (span, trace, or session), and the sampling rate. You can add more filtering criteria by selecting the button to the right of the sampling rate.
1. In the {{< ui >}}Template{{< /ui >}} section, use the dropdown menu:
   - {{< ui >}}Create from scratch{{< /ui >}}: Use your own custom prompt (defined in the next step).
   - {{< ui >}}Failure to Answer{{< /ui >}}, {{< ui >}}Prompt Injection{{< /ui >}}, {{< ui >}}Sentiment{{< /ui >}}, etc.: Populate a pre-existing prompt template. You can use these templates as-is, or modify them to match your specific evaluation logic.
1. In the {{< ui >}}System Prompt{{< /ui >}} field, enter your custom prompt or modify a prompt template.
   For custom prompts, provide clear instructions describing what the evaluator should assess.
   - Focus on a single evaluation goal
   - Include 2-3 few-shot examples showing input/output pairs, expected results, and reasoning.

{{% collapse-content title="Example custom prompt" level="h4" expanded=false id="custom-prompt-example" %}}
**System Prompt**
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

**User**

```
Span Input: {{span_input}}
```
{{% /collapse-content %}}

8. In the {{< ui >}}User Prompt{{< /ui >}} field, specify what parts of the span, trace, or session to evaluate by adding variables. You can add any span attribute, such as Span Input (`{{span_input}}`), Output (`{{span_output}}`), or any other span field. For trace-scoped evaluations, use `{{spans...}}` paths to read across spans; for session-scoped evaluations, use `{{traces...}}` paths to read across traces. See [Prompt Templating][15] for the full reference. To edit the user prompt directly, select it and edit the text.

   You may also use the panel on the right ({{< ui >}}Filtered Spans{{< /ui >}} in span scope, {{< ui >}}Filtered Traces{{< /ui >}} in trace scope, {{< ui >}}Filtered Sessions{{< /ui >}} in session scope) to add span data as a variable:
   1. Choose an account and an application so that spans, traces, or sessions show up on the right.
   2. Select one of the spans on the right to view its JSON.
   3. Select {{< ui >}}+{{< /ui >}} to add the JSON to your user prompt.

{{< img src="llm_observability/evaluations/custom_llm_judge_2-5.png" alt="The menu contents of the JSON view in the custom evaluation configuration right pane, displaying the option to Add variable to message." style="width:40%;" >}}

### Define the evaluation output

For OpenAI, Azure OpenAI, Vertex AI, Anthropic, or Amazon Bedrock models, configure [Structured Output](#structured-output).

For Anthropic or Amazon Bedrock models, you can alternatively configure [Keyword Search Output](#keyword-search-output).

For AI Gateway, both [Structured Output](#structured-output) and [Keyword Search Output](#keyword-search-output) are supported. Datadog recommends using Structured Output when your model supports it, and falling back to Keyword Search Output otherwise.

{{% collapse-content title="Structured Output (OpenAI, Azure OpenAI, Anthropic, Amazon Bedrock, AI Gateway, Vertex AI)" level="h4" expanded="true" id="structured-output" %}}
1. Select an evaluation output type:

   - {{< ui >}}Boolean{{< /ui >}}: True/false results (for example, "Did the model follow instructions?")
   - {{< ui >}}Score{{< /ui >}}: Numeric ratings (for example, a 1-5 scale for helpfulness)
   - {{< ui >}}Categorical{{< /ui >}}: Discrete labels (for example, "Good", "Bad", "Neutral")
   - {{< ui >}}JSON{{< /ui >}}: JSON allows free form schemas

2. Optionally, select {{< ui >}}Enable Reasoning{{< /ui >}}. This configures the LLM judge to provide a short justification for its decision (for example, why a score of 8 was given). Reasoning helps you understand how and why evaluations are made, and is particularly useful for auditing subjective metrics like tone, empathy, or helpfulness. Adding reasoning can also [make the LLM judge more accurate](https://arxiv.org/abs/2504.00050).

3. Edit a JSON schema that defines your evaluations output type:

{{< tabs >}}
{{% tab "Boolean" %}}
For the **Boolean** output type, edit the `description` field to further explain what true and false mean in your use case.
{{% /tab %}}

{{% tab "Score" %}}
For the **Score** output type:
- Set a `min` and `max` score for your evaluation.
- Edit the `description` field to further explain the scale of your evaluation.
{{% /tab %}}
{{% tab "Categorical" %}}
For the **Categorical** output type:
- Add or remove categories by editing the JSON schema.
- Edit category names.
- Edit the `description` field of categories to further explain what they mean in the context of your evaluation.


An example schema for a categorical evaluation:

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
For the **JSON** output type, define a free form JSON schema to capture complex, structured evaluation outputs.

An example schema for a JSON evaluation:

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


4. Configure {{< ui >}}Assessment Criteria{{< /ui >}}.
   This flexibility allows you to align evaluation outcomes with your team's quality bar. Pass/fail mapping also powers automation across Datadog Agent Observability, enabling monitors and dashboards to flag regressions or track overall health.

{{< tabs >}}
{{% tab "Boolean" %}}
Select {{< ui >}}True{{< /ui >}} to mark a result as "Pass", or {{< ui >}}False{{< /ui >}} to mark a result as "Fail".
{{% /tab %}}

{{% tab "Score" %}}
Define numerical thresholds to determine passing performance.
{{% /tab %}}
{{% tab "Categorical" %}}
Select the categories that should map to a passing state. For example, if you have the categories `Excellent`, `Good`, and `Poor`, where only `Poor` should correspond to a failing state, select `Excellent` and `Good`.
{{% /tab %}}
{{% tab "JSON" %}}
Supply a JavaScript function to assign an assessment based on the output from the LLM-as-a-Judge evaluator. The function must return a json object of the following format
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
{{% /tab %}}
{{< /tabs >}}


{{% /collapse-content %}}

{{% collapse-content title="Post-Processing (OpenAI, Azure OpenAI, Anthropic, Amazon Bedrock, AI Gateway, Vertex AI)" level="h4" expanded="true" id="post-processing" %}}
1. Select the {{< ui >}}JSON{{< /ui >}} output type.

2. Provide a JavaScript function to identify the evaluator's assessment, value, and reasoning. Post-processing enables you conduct a more complex assessment than just using Boolean, Score, or Categorical structured output.

    The post-processing function must return an object containing an **assessment** of value "pass" or "fail" and optionally, value or reasoning strings. The function must return a json object of the following format:
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


{{% collapse-content title="Keyword Search Output (Anthropic, Amazon Bedrock, AI Gateway)" level="h4" expanded="true" id="keyword-search-output" %}}
1. Select the {{< ui >}}Boolean{{< /ui >}} output type.
   <div class="alert alert-info">For Keyword Search Output, only the <strong>Boolean</strong> output type is available.</div>

2. Provide {{< ui >}}True keywords{{< /ui >}} and {{< ui >}}False keywords{{< /ui >}} that define when the evaluation result is true or false, respectively.

   Datadog searches the LLM-as-a-judge's response text for your defined keywords and provides the appropriate results for the evaluation. For this reason, you should instruct the LLM to respond with your chosen keywords.

   For example, if you set:

   - {{< ui >}}True keywords{{< /ui >}}: Yes, yes
   - {{< ui >}}False keywords{{< /ui >}}: No, no

   Then your system prompt should include something like `Respond with "yes" or "no"`.

3. For {{< ui >}}Assessment Criteria{{< /ui >}}:
   - Select {{< ui >}}True{{< /ui >}} to mark a result as "Pass"
   - Select {{< ui >}}False{{< /ui >}} to mark a result as "Fail"

   This flexibility allows you to align evaluation outcomes with your team’s quality bar. Pass/fail mapping also powers automation across Datadog Agent Observability, enabling monitors and dashboards to flag regressions or track overall health.
{{% /collapse-content %}}

{{< img src="llm_observability/evaluations/custom_llm_judge_5-2.png" alt="Configuring the custom evaluation output under Structured Output, including reasoning and assessment criteria." style="width:100%;" >}}

### Define the evaluation scope: Filtering and sampling

<div class="alert alert-info">Span fields used in evaluations are limited to 250 KB each. Fields exceeding this size are truncated before being sent to the LLM judge.</div>

Under {{< ui >}}Evaluation Scope{{< /ui >}}, define where and how your evaluation runs. This helps control coverage (which spans or traces are included) and cost (how many are sampled).
   - {{< ui >}}Application{{< /ui >}}: Select the application you want to evaluate.
   - {{< ui >}}Evaluate On{{< /ui >}}: Choose one of the following:
      - {{< ui >}}Trace{{< /ui >}}: Evaluate the full trace, including all its spans, as a single unit. Use this when the answer depends on context across multiple spans (agent goal completion, tool-use chains, RAG faithfulness). See [Trace-Level Evaluations][16] for examples and details on how trace completion is determined.
      - {{< ui >}}Span{{< /ui >}}: Evaluate matching spans individually. Use the {{< ui >}}Query{{< /ui >}} field to scope to specific spans (for example, only root spans, only `llm` spans, or spans with a specific tag).
      - {{< ui >}}Session{{< /ui >}}: Evaluate an entire user session, including every trace and its spans, as a single unit. Use this when the answer depends on context across multiple traces in the same session (user satisfaction, multi-turn coherence, or user behavior over time). Requires spans tagged with a `session_id`. See [Session-Level Evaluations][17] for examples and details on how session completion is determined.
   - {{< ui >}}Query{{< /ui >}}: (Optional) Enter a query using Datadog query syntax to filter which spans or traces are evaluated. For example:
      - `@name:agent.workflow` to filter by span name
      - `env:prod` to filter by tag
      - `@parent_id:undefined` to evaluate only root spans (when {{< ui >}}Evaluate On{{< /ui >}} is set to {{< ui >}}Span{{< /ui >}})
      - `@name:agent.workflow AND env:prod` to filter by span name and tag
   - {{< ui >}}Sampling Rate{{< /ui >}}: (Optional) Apply sampling (for example, 10%) to control evaluation cost.

{{< img src="llm_observability/evaluations/evaluation_scope_1.png" alt="Configuring the evaluation scope." style="width:100%;" >}}

### Test and preview

The pane on the right shows {{< ui >}}Filtered Spans{{< /ui >}} (or traces) corresponding to the configured evaluation scope.

Select a span to show JSON data available for use in an evaluation. Then, click {{< ui >}}Test Evaluation{{< /ui >}} to pre-fill inputs to your evaluation with data from the span, and click {{< ui >}}Run{{< /ui >}} to test.

## Viewing and using results

After you {{< ui >}}Save and Publish{{< /ui >}} your evaluation, Datadog automatically runs your evaluation on targeted spans. Alternatively, you can {{< ui >}}Save as Draft{{< /ui >}} and edit or enable your evaluation later.

Results are available across Agent Observability in near-real-time for published evaluations. You can find your custom LLM-as-a-judge results for a specific span in the {{< ui >}}Evaluations{{< /ui >}} tab, alongside other evaluations.

{{< img src="llm_observability/evaluations/custom_llm_judge_3-2.png" alt="The Evaluations tab of a trace, displaying custom evaluation results alongside managed evaluations." style="width:100%;" >}}

Each evaluation result includes:

- The evaluated value (for example `True`, `9`, or `Neutral`)
- The reasoning (when enabled)
- The pass/fail indicator (based on your assessment criteria)

Use the syntax `@evaluation.<evaluation_name>.value` to query or visualize results.

For example:
```
@evaluation.helpfulness-check.value
```

{{< img src="llm_observability/evaluations/custom_llm_judge_4.png" alt="The Agent Observability Traces view. In the search box, the user has entered `@evaluation.budget-guru-intent-classifier.value:budgeting_question` and results are populated below." style="width:100%;" >}}


You can:
- Filter traces by evaluation results (example, `@evaluation.helpfulness-check.value`)
- Filter by pass/fail assessment status (example, `@evaluation.helpfulness-check.assessment:fail`)
- Use evaluation results as [facets][3]
- View aggregate results in the Agent Observability Overview page's Evaluation section
- Create [monitors][4] to alert on performance changes or regression

## Using in experiments

To reuse a custom LLM-as-a-judge evaluation in a local [LLM Experiment][8], reference it by name using `RemoteEvaluator` from the SDK:

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

You can mix `RemoteEvaluator` with other local evaluators in the same experiment. For custom input mapping, error handling, and more options, see [RemoteEvaluator][9] in the Evaluation Developer Guide.

## Best practices for reliable custom evaluations

- **Start small**: Target a single, well-defined failure mode before scaling.
- **Enable reasoning** when you need explainable decisions and to improve the accuracy on complex reasoning tasks.
- **Iterate**: Run, inspect outputs, and refine your prompt.
- **Validate**: Periodically check evaluator accuracy using sampled traces.
- **Document your rubric**: Clearly define what "Pass" and "Fail" mean to avoid drift over time.
- **Re-align your evaluator**: Reassess prompt and few-shot examples when the underlying LLM updates.

## Estimated token usage

You can monitor the token usage of your LLM evaluations using the [LLM Evaluations Token Usage dashboard][10].

If you need more details, the following metrics allow you to track the LLM resources consumed to power evaluations:

- `ml_obs.estimated_usage.llm.input.tokens`
- `ml_obs.estimated_usage.llm.output.tokens`
- `ml_obs.estimated_usage.llm.total.tokens`

Each of these metrics has `ml_app`, `model_server`, `model_provider`, `model_name`, and `evaluation_name` tags, allowing you to pinpoint specific applications, models, and evaluations contributing to your usage.

## Configure LLM-as-a-judge evaluations from the API

You can use basic CRUD operations to manipulate managed evaluation configs, after you have the `DD_API_KEY` [API key][14] specified in your environment.

 - [GET][11] existing evaluation configurations
 - [PUT][12] existing evaluation configurations
 - [DELETE][13] existing evaluation configurations

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/llm/evaluations
[2]: /llm_observability/evaluations/custom_llm_as_a_judge_evaluations/connect_to_account
[3]: /events/explorer/facets/
[4]: /monitors/
[5]: https://arxiv.org/abs/2504.00050
[6]: /llm_observability/evaluations/evaluation_compatibility
[7]: /llm_observability/evaluations/custom_llm_as_a_judge_evaluations/template_evaluations/
[8]: /llm_observability/experiments
[9]: /llm_observability/guide/evaluation_developer_guide/#using-managed-evaluators
[10]: https://app.datadoghq.com/dash/integration/llm_evaluations_token_usage
[11]: /api/latest/llm-observability/#get-a-custom-evaluator-configuration
[12]: /api/latest/llm-observability/#create-or-update-a-custom-evaluator-configuration
[13]: /api/latest/llm-observability/#delete-a-custom-evaluator-configuration
[14]: /account_management/api-app-keys
[15]: /llm_observability/evaluations/custom_llm_as_a_judge_evaluations/prompt_templating
[16]: /llm_observability/evaluations/custom_llm_as_a_judge_evaluations/trace_level_evaluations
[17]: /llm_observability/evaluations/custom_llm_as_a_judge_evaluations/session_level_evaluations

