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

The Playground supports two flows:
- **[Test a prompt with arbitrary input](#test-a-prompt-with-arbitrary-input)**: Send a single prompt with custom input values and inspect the model response.
- **[Run an experiment from the Playground](#run-an-experiment-from-the-playground)**: Run your prompt across a dataset, score each row with evaluators, and save the result as an [experiment][2].

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

{{< img src="llm_observability/playground/playground-arbitrary-input.png" alt="LLM Observability Playground showing a user message with {{category}} and {{approach}} variable placeholders and the model response in the output panel." style="width:100%;" >}}

Use Prompts mode to iterate on a prompt with a fixed set of inputs.

1. Navigate to [**AI Observability > Playground**][1].
1. Write your system and user prompts in the message editor. To parameterize inputs, use `{{variable_name}}` in any message.
1. Open the **Model configuration** panel using the top bar.
1. In the configuration panel, select a **Provider**, an **Account** and a **Model**.
1. (Optional) Click **Edit Response Structure** to request structured output from the model.
1. (Optional) Click **Model Parameters** to specify the parameters of the model.
1. (Optional) Click **Add New** next to **Tools** to add tool definitions in JSON function schema format. Use the provided examples (Weather, Web Search, Email, Stock Price) as starting points.
1. You can enter values for each variable in the **Variables** section to substitute for the parameters you defined in your user and system prompts.
1. Click **Done** to save the configuration and close the modal.
1. Click **Run** to send the prompt and view the model response.

Edit messages, variable values, or model settings, then click **Run** again to iterate.

## Run an experiment from the Playground

{{< img src="llm_observability/playground/playground-experiment-preview.png" alt="LLM Observability Playground in experiment mode with all four steps completed (Add Dataset, Add Variables, Add Evaluators, Run Preview). The Experiment Preview table shows OUTPUT, EVAL_EXPECTED_OUTPUT, INPUT, and EXPECTEDOUTPUT columns with PASS and FAIL badges per row and a summary banner reading 3 of 20 records passed." style="width:100%;" >}}

Use Experiments mode to test your prompt across a dataset, score results with evaluators, and save the configuration as a reproducible experiment.

### Configure your prompt

Write your prompt using `{{variable_name}}` placeholders where dataset values will be substituted. Use dot notation to reference nested dataset fields—for example, `{{input.question}}` to reference a field named `question` in the input section of a record.

### 1. Add a dataset

Select a dataset from your project. The dataset provides the records the Playground runs your prompt against.

To create a dataset, see [Datasets][4].

### 2. Add variables

Map dataset columns to the sections available in your prompt:

| Section | Description |
|---------|-------------|
| **Input** | Columns from the input section of each record, used to fill `{{input.*}}` variables. If the input value is a JSON object, its top-level keys are exposed as individual variables (for example, `{{input.question}}` and `{{input.category}}`). If the input value is a plain string or number, the whole field is available as `{{input}}`. |
| **Expected Output** | Ground truth values used by evaluators to score model output. If the value is a JSON object, top-level keys are exposed individually (for example, `{{expected_output.answer}}`). Available as `{{expected_output}}` for plain values. |
| **Metadata** | Additional context columns. Top-level keys of a JSON object are available as `{{metadata.*}}` variables. |

Click **Use this dataset** to proceed to the preview stage.

<div class="alert alert-warning">If a variable references a path that does not exist in the dataset—for example, <code>{{question}}</code> instead of <code>{{input.question}}</code>—the model receives the literal template string. Go back to your prompt and correct the variable paths to match the columns shown in the table above.</div>

### 3. Add evaluators

Evaluators score each row after a preview run. Click **Add Evaluators** in the toolbar to open the evaluator configuration modal.

The Playground supports **String Check** evaluators. Add multiple evaluators to score different aspects of the output in one run.

{{% collapse-content title="String Check evaluator options" level="h4" expanded=false %}}

| Field | Description |
|-------|-------------|
| **Operator** | The comparison to apply: `equals`, `not equals`, or `contains`. |
| **Case sensitive** | When enabled, the comparison is case-sensitive. |
| **Strip whitespace** | When enabled, leading and trailing whitespace is trimmed before comparing. |
| **Left operand** | The value to evaluate—defaults to the model output (`output`). |
| **Right operand** | The value to compare against—defaults to the expected output. Supports dot notation for nested fields. |
| **Name** | An alias displayed as the column header in the results table. |

{{% /collapse-content %}}

### 4. Run a preview

Click **Run Preview** to execute the prompt on up to 20 dataset records.

After the preview completes:
- Each row shows a **PASS** or **FAIL** badge for each evaluator.
- The column header shows the aggregate pass and fail counts.
- A summary banner displays the overall result.

Click a **FAIL** badge to expand a popover showing the actual output, the operator, the expected value, and a contextual hint. For example, when an `equals` check fails because the output contains the expected value as a substring, the popover suggests switching to `contains`.

### Iterate on prompt and evaluator configuration

{{< img src="llm_observability/playground/playground-stale-preview.png" alt="LLM Observability Playground showing stale preview state after a prompt edit. A warning banner reads 'Prompt or settings changed since the last preview. Run the preview again before running the full dataset.' with a Re-run Preview button. The results table shows PASS and FAIL badges from the previous run." style="width:100%;" >}}

After reviewing results, edit the prompt or evaluator configuration to improve scores. Any edit marks the preview results as stale. Click **Re-run Preview** to run again with the updated configuration.

Common iteration patterns:
- If most rows fail `equals`, check whether `contains` or case-insensitive comparison better reflects the task.
- If variable values appear as literals in the output (for example, `{{input.question}}`), correct the variable path in the prompt.
- Adjust the prompt wording and re-run to observe the effect on pass rates.

### 5. Save the experiment

When the preview results meet your expectations, click **Save & Run as experiment** in the top toolbar to run on the full dataset.

In the dialog:

1. Enter an **Experiment name**.
1. Select a **Project**.
1. Click **Save**.

The experiment runs across all records in the dataset—not only the 20-record preview sample. When complete, view results in [**AI Observability > Experiments**][2].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/llm/playground
[2]: https://app.datadoghq.com/llm/testing/experiments
[3]: https://app.datadoghq.com/llm/settings/integrations
[4]: /llm_observability/experiments/datasets
