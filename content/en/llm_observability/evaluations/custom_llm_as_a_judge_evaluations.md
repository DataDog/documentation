---
title: Custom LLM-as-a-Judge Evaluations
description: Learn how to create Custom LLM-as-a-judge Evaluations.
further_reading:
- link: "/llm_observability/terms/"
  tag: "Documentation"
  text: "Learn about LLM Observability terms and concepts"
- link: "/llm_observability/setup"
  tag: "Documentation"
  text: "Learn how to set up LLM Observability"
- link: "/llm_observability/evaluations/managed_evaluations"
  tag: "Documentation"
  text: "Learn about Managed Evaluations"
- link: "https://www.datadoghq.com/blog/llm-evaluation-framework-best-practices/"
  tag: "Blog"
  text: "Building an LLM evaluation framework: best practices"
---

## Overview

Custom LLM-as-a-Judge Evaluations let you define your own evaluation logic to automatically assess your LLM applications. You can use natural language prompts to capture subjective or objective criteria - like tone, helpfulness, or factuality - and run them at scale across your traces and spans.

This provides a flexible, automated way to monitor model quality, detect regressions, and track improvements over time.

## How it works

Custom LLM-as-a-Judge Evaluations use an LLM to judge the performance of another LLM.

You define:
- The criteria (via prompt text)
- What is evaluated (e.g., a span's output)
- The model (e.g., `GPT-4o`)
- The output type (`boolean`, numeric score, or `categorical` label)

Datadog then runs this evaluation logic automatically against your spans, recording results for you to query, visualize, and monitor.

## Create a custom evaluation

You can create and manage custom evaluations from the [Evaluations page][1] in LLM Observability.

{{< img src="llm_observability/evaluations/custom_llm_judge_1.png" alt="Begin creating your own Custom LLM-as-a-judge Evaluation by opening the Create Evaluation side panel from the Evaluations page" style="width:100%;" >}}


### 1. Name your evaluation

Give your evaluation a clear, descriptive name (e.g., `factuality-check` or `tone-eval`). You will use this name later when querying evaluation results. The name has to be unique within your application.

### 2. Choose an LLM provider and model

Select your LLM account and the model you wish to use for the evaluation. If you do not have an LLM account already integrated with LLM Observability, follow these instructions to [connect an LLM provider][2].

### 3. Define the evaluation prompt

In the **Evaluation Prompt** section, you can either:
- Use preexisting prompt templates, including:
  - Failure to Answer
  - Prompt Injection
  - Sentiment
  - Topic Relevancy
  - Toxicity
- Create an evaluation from scratch by writing your own criteria.

Templates can be used as-is or modified to match your specific evaluation logic.

#### Writing a custom prompt

In the **System Prompt** field, write clear instructions describing what the evaluator should assess.

- Focus on a single evaluation goal
- Include 2–3 few-shot examples showing input/output pairs, expected results, and reasoning.

In the **User Prompt** field, explicitly specify what parts of the span to evaluate: Span Input (`{{span_input}}`), Output (`{{span_output}}`), or both.

**Example System Prompt:**

{{< code-block lang="text" >}}
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
{{< /code-block >}}

**Example User Message:**

{{< code-block lang="text" >}}
Span Input: {{span_input}}
{{< /code-block >}}

### 4. Choose an output type

Define the expected output schema for the evaluator:

- **`boolean`** – True/False results (e.g., "Did the model follow instructions?")
- **`score`** – Numeric rating (e.g., 1–5 scale for helpfulness)
- **`categorical`** – Discrete labels (e.g., "Good", "Bad", "Neutral")

The schema ensures your results are structured for querying and dashboarding. For Anthropic and Bedrock models, only `boolean` output types are allowed.

#### JSON Output Schema

When using OpenAI or Azure OpenAI, you will be prompted to edit a JSON schema that defines your evaluations output type. Use the `description` field to provide further context to the LLM-as-a-judge.

For `boolean` evaluations:
- You can edit the `description` field to further explain what true and false mean in your use case.

For `score` evaluations:
- You can set a `min` and `max` score for your evaluation.
- You can edit the `description` field to further explain the scale of your evaluation.

For `categorical` evaluations:
- You can add or remove categories by editing the JSON schema
- You can edit category names
- You can edit the `description` field of categories to further explain what they mean in the context of your evaluation.

Below is an example of a `categorical` JSON Schema.

{{< code-block lang="json" >}}
{
    "name": "categorical_eval",
    "schema": {
        "type": "object",
        "required": [
            "categorical_eval"
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
            }
        },
        "additionalProperties": false
    },
    "strict": true
}
{{< /code-block >}}

#### Keyword Search
When using other LLM providers, only `boolean` output types are allowed. You will be prompted to provide **True Keywords** and **False Keywords** that define when the evaluation result will be true or false, respectively. Datadog will search the LLM-as-a-judge's response text for those keywords and provide the appropriate results for the evaluation.

For this reason, you should always instruct the LLM to respond with your chosen keywords. For example, if you set

- **True Keywords**: Yes, yes
- **False Keywords**: No, no

You should include something like the following instructions in the System Prompt:

{{< code-block lang="text" >}}
Respond with "yes" or "no".
{{< /code-block >}}

You can preview and refine your logic in the [**Test Evaluation**](#6-test-your-evaluation) panel by providing sample span input/output and clicking **Run Evaluation** to verify outputs.

### 5. Configure filters and sampling

Choose which application and spans to evaluate:

- **Traces** – Evaluate only root spans
- **All Spans** – Include all spans
- **Span Names** – Target spans by name
- **Tags** – Limit evaluation to spans with certain tags

Optionally, apply sampling (for example, 10%) to control evaluation cost.

### 6. Test your evaluation

Use the **Test Evaluation** panel on the right to preview how your evaluator performs.

You can input sample `{{span_input}}` and `{{span_output}}` values, then click **Run Evaluation** to see the LLM-as-a-Judge's output before saving. Modify your evaluation until you are satisfied with the results.

{{< img src="llm_observability/evaluations/custom_llm_judge_2.png" alt="The Test Evaluation panel allows you to preview your evaluation before saving." style="width:100%;" >}}


## Viewing and using results

After an evaluation has been saved, it will automatically run on targeted spans and results will be available across LLM Observability in near-realtime. Custom LLM-as-a-judge results for a specific span can be found in the **Evaluations** tab next to all other evaluations.

{{< img src="llm_observability/evaluations/custom_llm_judge_3.png" alt="View custom evaluation results alongside managed evaluations in the Evaluations tab of a trace" style="width:100%;" >}}

Use the syntax `@evaluations.custom.<evaluation_name>` to query or visualize results.

For example:
```
@evaluations.custom.helpfulness-check
```

{{< img src="llm_observability/evaluations/custom_llm_judge_4.png" alt="Filter and query traces using custom evaluation results in the LLM Observability Traces page" style="width:100%;" >}}


You can:
- Filter traces by evaluation results
- Use evaluation results as [facets][5]
- View aggregate results in the LLM Observability Overview page's Evaluation section
- Create [monitors][6] to alert on performance changes or regression

## Best practices for reliable custom evaluations

- **Start small**: Target a single, well-defined failure mode before scaling.
- **Iterate**: Run, inspect outputs, and refine your prompt.
- **Validate**: Periodically check evaluator accuracy using sampled traces.
- **Document your rubric**: Clearly define what "Pass" and "Fail" mean to avoid drift over time.
- **Re-align your evaluator**: Reassess prompt and few-shot examples when the underlying LLM updates.

For more resources on best practices, check out [Building an LLM evaluation framework: best practices][3] and [Using LLM-as-a-judge for automated and versatile evaluation][4].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/llm/settings/evaluations
[2]: /llm_observability/evaluations/managed_evaluations#connect-your-llm-provider-account
[3]: https://www.datadoghq.com/blog/llm-evaluation-framework-best-practices/
[4]: https://huggingface.co/learn/cookbook/llm_judge
[5]: https://docs.datadoghq.com/service_management/events/explorer/facets/
[6]: https://docs.datadoghq.com/monitors/

