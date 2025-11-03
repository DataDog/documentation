---
title: Custom LLM-as-a-Judge Evaluations
description: How to create custom LLM-as-a-judge evaluations, and how to use these evaluation results across LLM Observability.
further_reading:
- link: "/llm_observability/terms/"
  tag: "Documentation"
  text: "Learn about LLM Observability terms and concepts"
- link: "/llm_observability/setup"
  tag: "Documentation"
  text: "Learn how to set up LLM Observability"
- link: "/llm_observability/evaluations/managed_evaluations"
  tag: "Documentation"
  text: "Learn about managed evaluations"
- link: "https://www.datadoghq.com/blog/llm-evaluation-framework-best-practices/"
  tag: "Blog"
  text: "Building an LLM evaluation framework: best practices"
- link: "https://huggingface.co/learn/cookbook/llm_judge"
  tag: "Hugging Face"
  text: "Using LLM-as-a-judge for an automated and versatile evaluation"
---

Custom LLM-as-a-judge evaluations use an LLM to judge the performance of another LLM. You can define evaluation logic with natural language prompts, capture subjective or objective criteria (like tone, helpfulness, or factuality), and run these evaluations at scale across your traces and spans. 

## Create a custom LLM-as-a-judge evaluation

You can create and manage custom evaluations from the [Evaluations page][1] in LLM Observability.

1. In Datadog, navigate to the LLM Observability [Evaluations page][1]. Select **Create Evaluation**, then select **Create your own**.
   {{< img src="llm_observability/evaluations/custom_llm_judge_1.png" alt="The LLM Observability Evaluations page with the Create Evaluation side panel opened. The first item, 'Create your own,' is selected. " style="width:100%;" >}}

1. Provide a clear, descriptive **evaluation name** (for example, `factuality-check` or `tone-eval`). You will use this name when querying evaluation results. The name must be unique within your application.

1. Use the **Account** drop-down menu to select the LLM provider and corresponding account to use for your LLM judge. To connect a new account, see [connect an LLM provider][2].

1. Use the **Model** drop-down menu to select a model to use for your LLM judge.

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

7. In the **User** field, provide your user prompt. Explicitly specify what parts of the span to evaluate: Span Input (`{{span_input}}`), Output (`{{span_output}}`), or both.

7. Select an evaluation output type:

   - **Boolean**: True/false results (for example, "Did the model follow instructions?")
   - **Score**: Numeric ratings (for example, a 1–5 scale for helpfulness)
   - **Categorical**: Discrete labels (for example, "Good", "Bad", "Neutral")
   <div class="alert alert-info">For Anthropic and Amazon Bedrock models, only the <strong>Boolean</strong> output type is available.</div>

7. Define the structure of your output.

   {{< tabs >}}
   {{% tab "OpenAI" %}}
   {{% llm-eval-output-json %}}
   {{% /tab %}}

   {{% tab "Azure OpenAI" %}}
   {{% llm-eval-output-json %}}
   {{% /tab %}}

   {{% tab "Anthropic" %}}
   {{% llm-eval-output-keyword %}}
   {{% /tab %}}

   {{% tab "Amazon Bedrock" %}}
   {{% llm-eval-output-keyword %}}
   {{% /tab %}}
   {{< /tabs >}}

7. Under **Evaluation Scope**, define the scope of your evaluation:
   - **Application**: Select the application you want to evaluate.
   - **Evaluate On**: Choose one of the following:
      - **Traces**: Evaluate only root spans
      - **All Spans**: Evaluate both root and child spans
   - **Span Names**: (Optional) Limit evaluation to spans with certain names.
   - **Tags**: (Optional) Limit evaluation to spans with certain tags.
   - **Sampling Rate**: (Optional) Apply sampling (for example, 10%) to control evaluation cost.

7. Use the **Test Evaluation** panel on the right to preview how your evaluator performs. You can input sample `{{span_input}}` and `{{span_output}}` values, then click **Run Evaluation** to see the LLM-as-a-Judge's output before saving. Modify your evaluation until you are satisfied with the results.

{{< img src="llm_observability/evaluations/custom_llm_judge_2.png" alt="Creation flow for a custom LLM-as-a-judge evaluation. On the right, under Test Evaluation, sample span_input and span_output have been provided. An Evaluation Result textbox below displays a sample result." style="width:100%;" >}}


## Viewing and using results

After you save your evaluation, Datadog automatically runs your evaluation on targeted spans. Results are available across LLM Observability in near-real-time. You can find your custom LLM-as-a-judge results for a specific span in the **Evaluations** tab, next to all other evaluations.

{{< img src="llm_observability/evaluations/custom_llm_judge_3.png" alt="The Evaluations tab of a trace, displaying custom evaluation results alongside managed evaluations." style="width:100%;" >}}

Use the syntax `@evaluations.custom.<evaluation_name>` to query or visualize results.

For example:
```
@evaluations.custom.helpfulness-check
```

{{< img src="llm_observability/evaluations/custom_llm_judge_4.png" alt="The LLM Observability Traces view. In the search box, the user has entered `@evaluations.custom.budget-guru-intent-classifier:budgeting_question` and results are populated below." style="width:100%;" >}}


You can:
- Filter traces by evaluation results
- Use evaluation results as [facets][3]
- View aggregate results in the LLM Observability Overview page's Evaluation section
- Create [monitors][4] to alert on performance changes or regression

## Best practices for reliable custom evaluations

- **Start small**: Target a single, well-defined failure mode before scaling.
- **Iterate**: Run, inspect outputs, and refine your prompt.
- **Validate**: Periodically check evaluator accuracy using sampled traces.
- **Document your rubric**: Clearly define what "Pass" and "Fail" mean to avoid drift over time.
- **Re-align your evaluator**: Reassess prompt and few-shot examples when the underlying LLM updates.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/llm/settings/evaluations
[2]: /llm_observability/evaluations/managed_evaluations#connect-your-llm-provider-account
[3]: /service_management/events/explorer/facets/
[4]: /monitors/

