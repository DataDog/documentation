---
title: Playground
description: Use the LLM Observability Playground to test prompts interactively against any connected model provider and run experiments with evaluators from a browser-based interface.
further_reading:
  - link: "/llm_observability/experiments"
    tag: "Documentation"
    text: "LLM Observability Experiments"
  - link: "/llm_observability/experiments/datasets"
    tag: "Documentation"
    text: "Datasets"
  - link: "/llm_observability/experiments/analyzing_results"
    tag: "Documentation"
    text: "Analyzing Experiment Results"
---

The [Playground][1] is a browser-based interface for testing and evaluating LLM prompts. You can test a prompt with arbitrary input against any connected model provider, or load a dataset, attach evaluators, preview results, and save the configuration as a reproducible experiment—all without writing code.

The Playground has two modes:
- **Prompts mode**: Send a single prompt with arbitrary input values and inspect the model response.
- **Experiments mode**: Run your prompt across a dataset, score each row with evaluators, and save the result as an [experiment][2].

## Prerequisites

Connect at least one model provider integration in [**AI Observability > Settings > Integrations**][3] before using the Playground.

Supported providers:
- OpenAI
- Anthropic
- Azure OpenAI
- Amazon Bedrock
- Vertex AI
- AI Gateway

## Test a prompt with arbitrary input

Use Prompts mode to iterate on a prompt with a fixed set of inputs.

1. Navigate to [**AI Observability > Playground**][1].
2. In the configuration panel, select a **Provider** and **Model**.
3. (Optional) Click **Parameters** to adjust model settings such as temperature, max tokens, and top-p.
4. Write your prompt in the message editor. A user message is included by default. Click **Add system message** to add a system message.
5. To parameterize inputs, use `{{variable_name}}` in any message. Enter values for each variable in the **Variables** section of the configuration panel.
6. (Optional) Click **Tools** to add tool definitions in JSON function schema format. Use the provided examples (Weather, Web Search, Email, Stock Price) as starting points.
7. (Optional) Click **Parameters > JSON Schema** to request structured output from the model.
8. Click **Run** to send the prompt and view the model response.

Edit messages, variable values, or model settings, then click **Run** again to iterate.

## Run an experiment from the Playground

Use Experiments mode to test your prompt across a dataset, score results with evaluators, and save the configuration as a reproducible experiment.

### 1. Configure your prompt

Write your prompt using `{{variable_name}}` placeholders where dataset values will be substituted. Use dot notation to reference nested dataset fields—for example, `{{input.question}}` to reference a field named `question` in the input section of a record.

<div class="alert alert-warning">If a variable references a path that does not exist in the dataset—for example, <code>{{question}}</code> instead of <code>{{input.question}}</code>—the model receives the literal template string. Verify that variable paths match the column mapping you configure in step 4.</div>

### 2. Switch to Experiments mode

Click **Experiments** in the top toolbar to enter Experiments mode. The right pane switches to the experiment builder.

### 3. Select a dataset

Select a dataset from your project. The dataset provides the records the Playground runs your prompt against.

To create a dataset, see [Datasets][4].

### 4. Map dataset columns

Map dataset columns to the sections available in your prompt:

| Section | Description |
|---------|-------------|
| **Input** | Columns from the input section of each record, used to fill `{{input.*}}` variables. |
| **Expected Output** | Ground truth values used by evaluators to score model output. Available as `{{expected_output.*}}` in evaluator configuration. |
| **Metadata** | Additional context columns, available as `{{metadata.*}}` variables. |

Click **Confirm** to proceed to the preview stage.

### 5. Add evaluators

Evaluators score each row after a preview run. Click **Add Evaluators** in the toolbar to open the evaluator configuration modal.

The Playground supports **String Check** evaluators:

| Field | Description |
|-------|-------------|
| **Operator** | The comparison to apply: `equals`, `not equals`, or `contains`. |
| **Case sensitive** | When enabled, the comparison is case-sensitive. |
| **Strip whitespace** | When enabled, leading and trailing whitespace is trimmed before comparing. |
| **Left operand** | The value to evaluate—defaults to the model output (`output`). |
| **Right operand** | The value to compare against—defaults to the expected output. Supports dot notation for nested fields. |
| **Name** | An alias displayed as the column header in the results table. |

Add multiple evaluators to score different aspects of the output in one run.

### 6. Run a preview

Click **Run Preview** to execute the prompt on up to 20 dataset records.

After the preview completes:
- Each row shows a **PASS** or **FAIL** badge for each evaluator.
- The column header shows the aggregate pass and fail counts.
- A summary banner displays the overall result.

Click a **FAIL** badge to expand a popover showing the actual output, the operator, the expected value, and a contextual hint. For example, when an `equals` check fails because the output contains the expected value as a substring, the popover suggests switching to `contains`.

### 7. Iterate on prompt and evaluator configuration

After reviewing results, edit the prompt or evaluator configuration to improve scores. Any edit marks the preview results as stale. Click **Re-run Preview** to run again with the updated configuration.

Common iteration patterns:
- If most rows fail `equals`, check whether `contains` or case-insensitive comparison better reflects the task.
- If variable values appear as literals in the output (for example, `{{input.question}}`), correct the variable path in the prompt.
- Adjust the prompt wording and re-run to observe the effect on pass rates.

### 8. Save and run as an experiment

When the preview results meet your expectations, click **Save & Run as experiment** to run on the full dataset.

In the dialog:

1. Enter an **Experiment name**.
2. Select a **Project**.
3. Click **Save**.

The experiment runs across all records in the dataset—not only the 20-record preview sample. When complete, view results in [**AI Observability > Experiments**][2].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/llm/playground
[2]: https://app.datadoghq.com/llm/testing/experiments
[3]: https://app.datadoghq.com/llm/settings/integrations
[4]: /llm_observability/experiments/datasets
