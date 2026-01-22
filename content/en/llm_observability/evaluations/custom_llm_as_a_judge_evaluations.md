---
title: Custom LLM-as-a-Judge Evaluations
description: How to create custom LLM-as-a-judge evaluations, and how to use these evaluation results across LLM Observability.
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
  text: "Learn about LLM Observability terms and concepts"
- link: "/llm_observability/setup"
  tag: "Documentation"
  text: "Learn how to set up LLM Observability"
- link: "/llm_observability/evaluations/managed_evaluations"
  tag: "Documentation"
  text: "Learn about managed evaluations"
- link: "https://huggingface.co/learn/cookbook/llm_judge"
  tag: "Hugging Face"
  text: "Using LLM-as-a-judge for an automated and versatile evaluation"
---

Custom LLM-as-a-judge evaluations use an LLM to judge the performance of another LLM. You can define evaluation logic with natural language prompts, capture subjective or objective criteria (like tone, helpfulness, or factuality), and run these evaluations at scale across your traces and spans.

## Create a custom LLM-as-a-judge evaluation

You can create and manage custom evaluations from the [Evaluations page][1] in LLM Observability.

Learn more about the [compatibility requirements][6].

### Configure the prompt

1. In Datadog, navigate to the LLM Observability [Evaluations page][1]. Select **Create Evaluation**, then select **Create your own**.
   {{< img src="llm_observability/evaluations/custom_llm_judge_1-2.png" alt="The LLM Observability Evaluations page with the Create Evaluation side panel opened. The first item, 'Create your own,' is selected. " style="width:100%;" >}}
1. Provide a clear, descriptive **evaluation name** (for example, `factuality-check` or `tone-eval`). You can use this name when querying evaluation results. The name must be unique within your application.
1. Use the **Account** drop-down menu to select the LLM provider and corresponding account to use for your LLM judge. To connect a new account, see [connect an LLM provider][2].
    - If you select an **Amazon Bedrock** account, choose a region the account is configured for.
    - If you select a **Vertex** account, choose a project and location.
1. Use the **Model** drop-down menu to select a model to use for your LLM judge.
1. Under **Evaluation Scope**, select the application you want to evaluate.
1. Under **Evaluation Prompt** section, use the **Prompt Template** drop-down menu:
   - **Create from scratch**: Use your own custom prompt (defined in the next step).
   - **Failure to Answer**, **Prompt Injection**, **Sentiment**, etc.: Populate a pre-existing prompt template. You can use these templates as-is, or modify them to match your specific evaluation logic.
1. In the **System Prompt** field, enter your custom prompt or modify a prompt template.
   For custom prompts, provide clear instructions describing what the evaluator should assess.
   - Focus on a single evaluation goal
   - Include 2–3 few-shot examples showing input/output pairs, expected results, and reasoning.

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

8. In the **User** field, provide your user prompt. Explicitly specify what parts of the span to evaluate. Usually this is the Span Input (`{{span_input}}`) and/or Span Output (`{{span_output}}`). There are other variables available, which you can see when you type `{{`.

### Define the evaluation output

For OpenAI or Azure OpenAI models, configure [Structured Output](#structured-output).

For Anthropic or Amazon Bedrock models, configure [Keyword Search Output](#keyword-search-output).

For AI Gateway, both [Structured Output](#structured-output) and [Keyword Search Output](#keyword-search-output) are supported. Datadog recommends using Structured Output when your model supports it, and falling back to Keyword Search Output otherwise.

{{% collapse-content title="Structured Output (OpenAI, Azure OpenAI, AI Gateway)" level="h4" expanded="true" id="structured-output" %}}
1. Select an evaluation output type:

   - **Boolean**: True/false results (for example, "Did the model follow instructions?")
   - **Score**: Numeric ratings (for example, a 1–5 scale for helpfulness)
   - **Categorical**: Discrete labels (for example, "Good", "Bad", "Neutral")

2. Optionally, select **Enable Reasoning**. This configures the LLM judge to provide a short justification for its decision (for example, why a score of 8 was given). Reasoning helps you understand how and why evaluations are made, and is particularly useful for auditing subjective metrics like tone, empathy, or helpfulness. Adding reasoning can also [make the LLM judge more accurate](https://arxiv.org/abs/2504.00050).

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
{{< /tabs >}}


4. Configure **Assessment Criteria**.
   This flexibility allows you to align evaluation outcomes with your team’s quality bar. Pass/fail mapping also powers automation across Datadog LLM Observability, enabling monitors and dashboards to flag regressions or track overall health.

{{< tabs >}}
{{% tab "Boolean" %}}
Select **True** to mark a result as "Pass", or **False** to mark a result as "Fail".
{{% /tab %}}

{{% tab "Score" %}}
Define numerical thresholds to determine passing performance.
{{% /tab %}}
{{% tab "Categorical" %}}
Select the categories that should map to a passing state. For example, if you have the categories `Excellent`, `Good`, and `Poor`, where only `Poor` should correspond to a failing state, select `Excellent` and `Good`.
{{% /tab %}}
{{< /tabs >}}


{{% /collapse-content %}}

{{% collapse-content title="Keyword Search Output (Anthropic, Amazon Bedrock, AI Gateway)" level="h4" expanded="true" id="keyword-search-output" %}}
1. Select the **Boolean** output type.
   <div class="alert alert-info">For Anthropic and Amazon Bedrock models, only the <strong>Boolean</strong> output type is available.</div>

2. Provide **True keywords** and **False keywords** that define when the evaluation result is true or false, respectively.

   Datadog searches the LLM-as-a-judge's response text for your defined keywords and provides the appropriate results for the evaluation. For this reason, you should instruct the LLM to respond with your chosen keywords.

   For example, if you set:

   - **True keywords**: Yes, yes
   - **False keywords**: No, no

   Then your system prompt should include something like `Respond with "yes" or "no"`.

3. For **Assessment Criteria**:
   - Select **True** to mark a result as "Pass"
   - Select **False** to mark a result as "Fail"

   This flexibility allows you to align evaluation outcomes with your team’s quality bar. Pass/fail mapping also powers automation across Datadog LLM Observability, enabling monitors and dashboards to flag regressions or track overall health.
{{% /collapse-content %}}

{{< img src="llm_observability/evaluations/custom_llm_judge_5-2.png" alt="Configuring the custom evaluation output under Structured Output, including reasoning and assessment criteria." style="width:100%;" >}}

### Define the evaluation scope: Filtering and sampling

Under **Evaluation Scope**, define where and how your evaluation runs. This helps control coverage (which spans are included) and cost (how many spans are sampled).
   - **Application**: Select the application you want to evaluate.
   - **Evaluate On**: Choose one of the following:
      - **Traces**: Evaluate only root spans
      - **All Spans**: Evaluate both root and child spans
   - **Span Names**: (Optional) Limit evaluation to spans with certain names.
   - **Tags**: (Optional) Limit evaluation to spans with certain tags.
   - **Sampling Rate**: (Optional) Apply sampling (for example, 10%) to control evaluation cost.

### Test and preview

The pane on the right shows **Filtered Spans** (or traces) corresponding to the configured evaluation scope.

Select a span to show JSON data available for use in an evaluation. Then, click **Test Evaluation** to pre-fill inputs to your evaluation with data from the span, and click **Run** to test.

To add a JSON data as a variable in your user message, use the three-dots menu to the left of each JSON row JSON  and select **Add variable to message**. 

{{< img src="llm_observability/evaluations/custom_llm_judge_2-4.png" alt="The menu contents of the JSON view in the custom evaluation configuration right pane, displaying the option to Add variable to message." style="width:40%;" >}}

Refine your prompt and schema until outputs are consistent and interpretable.

## Viewing and using results

After you **Save and Publish** your evaluation, Datadog automatically runs your evaluation on targeted spans. Alternatively, you can **Save as Draft** and edit or enable your evaluation later.

Results are available across LLM Observability in near-real-time for published evaluations. You can find your custom LLM-as-a-judge results for a specific span in the **Evaluations** tab, alongside other evaluations.

{{< img src="llm_observability/evaluations/custom_llm_judge_3-2.png" alt="The Evaluations tab of a trace, displaying custom evaluation results alongside managed evaluations." style="width:100%;" >}}

Each evaluation result includes:

- The evaluated value (for example `True`, `9`, or `Neutral`)
- The reasoning (when enabled)
- The pass/fail indicator (based on your assessment criteria)

Use the syntax `@evaluations.custom.<evaluation_name>` to query or visualize results.

For example:
```
@evaluations.custom.helpfulness-check
```

{{< img src="llm_observability/evaluations/custom_llm_judge_4.png" alt="The LLM Observability Traces view. In the search box, the user has entered `@evaluations.custom.budget-guru-intent-classifier:budgeting_question` and results are populated below." style="width:100%;" >}}


You can:
- Filter traces by evaluation results (example, `@evaluations.custom.helpfulness-check`)
- Filter by pass/fail assessment status (example, `@evaluations.assessment.custom.helpfulness-check:fail`)
- Use evaluation results as [facets][3]
- View aggregate results in the LLM Observability Overview page's Evaluation section
- Create [monitors][4] to alert on performance changes or regression

## Best practices for reliable custom evaluations

- **Start small**: Target a single, well-defined failure mode before scaling.
- **Enable reasoning** when you need explainable decisions and to improve the accuracy on complex reasoning tasks.
- **Iterate**: Run, inspect outputs, and refine your prompt.
- **Validate**: Periodically check evaluator accuracy using sampled traces.
- **Document your rubric**: Clearly define what "Pass" and "Fail" mean to avoid drift over time.
- **Re-align your evaluator**: Reassess prompt and few-shot examples when the underlying LLM updates.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/llm/evaluations
[2]: /llm_observability/evaluations/managed_evaluations#connect-your-llm-provider-account
[3]: /events/explorer/facets/
[4]: /monitors/
[5]: https://arxiv.org/abs/2504.00050
[6]: /llm_observability/evaluations/evaluation_compatibility
