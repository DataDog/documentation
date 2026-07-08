---
title: Playground
description: Use the Agent Observability Playground to test prompts interactively against any connected model provider and run experiments with evaluators from a browser-based interface.
further_reading:
  - link: "/llm_observability/experiments"
    tag: "Documentation"
    text: "Agent Observability Experiments"
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

Connect at least one model provider integration in [{{< ui >}}AI Observability{{< /ui >}} > {{< ui >}}Settings{{< /ui >}} > {{< ui >}}Integrations{{< /ui >}}][3] before using the Playground.

Supported providers:
- OpenAI
- Anthropic
- Azure OpenAI
- Amazon Bedrock
- Vertex AI
- AI Gateway

## Test a prompt with arbitrary input

{{< img src="llm_observability/playground/playground-arbitrary-input.png" alt="Agent Observability Playground showing a user message with {{category}} and {{approach}} variable placeholders and the model response in the output panel." style="width:100%;" >}}

Use Prompts mode to iterate on a prompt with a fixed set of inputs.

1. Navigate to [{{< ui >}}AI Observability{{< /ui >}} > {{< ui >}}Playground{{< /ui >}}][1].
1. Write your system and user prompts in the message editor. To parameterize inputs, use `{{variable_name}}` in any message.
1. Open the {{< ui >}}Model configuration{{< /ui >}} panel using the top bar.
1. In the configuration panel, select a {{< ui >}}Provider{{< /ui >}}, an {{< ui >}}Account{{< /ui >}} and a {{< ui >}}Model{{< /ui >}}.
1. (Optional) Click {{< ui >}}Edit Response Structure{{< /ui >}} to request structured output from the model.
1. (Optional) Click {{< ui >}}Model Parameters{{< /ui >}} to specify the parameters of the model.
1. (Optional) Click {{< ui >}}Add New{{< /ui >}} next to {{< ui >}}Tools{{< /ui >}} to add tool definitions in JSON function schema format. Use the provided examples (Weather, Web Search, Email, Stock Price) as starting points.
1. You can enter values for each variable in the {{< ui >}}Variables{{< /ui >}} section to substitute for the parameters you defined in your user and system prompts.
1. Click {{< ui >}}Done{{< /ui >}} to save the configuration and close the modal.
1. Click {{< ui >}}Run{{< /ui >}} to send the prompt and view the model response.

Edit messages, variable values, or model settings, then click {{< ui >}}Run{{< /ui >}} again to iterate.

## Run an experiment from the Playground

{{< img src="llm_observability/playground/playground-experiment-preview.png" alt="Agent Observability Playground in experiment mode with all steps completed and Save and Run as experiment active. The Experiment Preview table shows OUTPUT, EVAL_EXPECTED_OUTPUT, INPUT, and EXPECTEDOUTPUT columns with PASS and FAIL badges per row and a summary banner reading 6 of 20 records passed." style="width:100%;" >}}

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
| {{< ui >}}Input{{< /ui >}} | Columns from the input section of each record, used to fill `{{input.*}}` variables. If the input value is a JSON object, its top-level keys are exposed as individual variables (for example, `{{input.question}}` and `{{input.category}}`). If the input value is a plain string or number, the whole field is available as `{{input}}`. |
| {{< ui >}}Expected Output{{< /ui >}} | Ground truth values used by evaluators to score model output. If the value is a JSON object, top-level keys are exposed individually (for example, `{{expected_output.answer}}`). Available as `{{expected_output}}` for plain values. |
| {{< ui >}}Metadata{{< /ui >}} | Additional context columns. Top-level keys of a JSON object are available as `{{metadata.*}}` variables. |

Click {{< ui >}}Use this dataset{{< /ui >}} to proceed to the preview stage.

<div class="alert alert-warning">If a variable references a path that does not exist in the dataset—for example, <code>{{question}}</code> instead of <code>{{input.question}}</code>—the model receives the literal template string. Go back to your prompt and correct the variable paths to match the columns shown in the table above.</div>

### 3. Add evaluators

Evaluators score each row after a preview run. Click {{< ui >}}Add Evaluators{{< /ui >}} in the toolbar to open the evaluator configuration modal.

The Playground supports {{< ui >}}String Check{{< /ui >}} evaluators. Add multiple evaluators to score different aspects of the output in one run.

{{% collapse-content title="String Check evaluator options" level="h4" expanded=false %}}

| Field | Description |
|-------|-------------|
| {{< ui >}}Operator{{< /ui >}} | The comparison to apply: `equals`, `not equals`, or `contains`. |
| {{< ui >}}Case sensitive{{< /ui >}} | When enabled, the comparison is case-sensitive. |
| {{< ui >}}Strip whitespace{{< /ui >}} | When enabled, leading and trailing whitespace is trimmed before comparing. |
| {{< ui >}}Left operand{{< /ui >}} | The value to evaluate—defaults to the model output (`output`). |
| {{< ui >}}Right operand{{< /ui >}} | The value to compare against—defaults to the expected output. Supports dot notation for nested fields. |
| {{< ui >}}Name{{< /ui >}} | An alias displayed as the column header in the results table. |

{{% /collapse-content %}}

### 4. Run a preview

Click {{< ui >}}Run Preview{{< /ui >}} to execute the prompt on up to 20 dataset records.

After the preview completes:
- Each row shows a {{< ui >}}PASS{{< /ui >}} or {{< ui >}}FAIL{{< /ui >}} badge for each evaluator.
- The column header shows the aggregate pass and fail counts.
- A summary banner displays the overall result.

Click a {{< ui >}}FAIL{{< /ui >}} badge to expand a popover showing the actual output, the operator, the expected value, and a contextual hint. For example, when an `equals` check fails because the output contains the expected value as a substring, the popover suggests switching to `contains`.

### Iterate on prompt and evaluator configuration

{{< img src="llm_observability/playground/playground-stale-preview.png" alt="Agent Observability Playground showing stale preview state after a prompt edit. A warning banner reads 'Prompt or settings changed since the last preview. Run the preview again before running the full dataset.' with a Re-run Preview button. The results table shows PASS and FAIL badges from the previous run." style="width:100%;" >}}

After reviewing results, edit the prompt or evaluator configuration to improve scores. Any edit marks the preview results as stale. Click {{< ui >}}Re-run Preview{{< /ui >}} to run again with the updated configuration.

Common iteration patterns:
- If most rows fail `equals`, check whether `contains` or case-insensitive comparison better reflects the task.
- If variable values appear as literals in the output (for example, `{{input.question}}`), correct the variable path in the prompt.
- Adjust the prompt wording and re-run to observe the effect on pass rates.

### 5. Save the experiment

When the preview results meet your expectations, click {{< ui >}}Save & Run as experiment{{< /ui >}} in the top toolbar to run on the full dataset.

In the dialog:

1. Enter an {{< ui >}}Experiment name{{< /ui >}}.
1. Select a {{< ui >}}Project{{< /ui >}}.
1. Click {{< ui >}}Save{{< /ui >}}.

The experiment runs across all records in the dataset—not only the 20-record preview sample. When complete, view results in [{{< ui >}}AI Observability{{< /ui >}} > {{< ui >}}Experiments{{< /ui >}}][2].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/llm/playground
[2]: https://app.datadoghq.com/llm/testing/experiments
[3]: https://app.datadoghq.com/llm/settings/integrations
[4]: /llm_observability/experiments/datasets
