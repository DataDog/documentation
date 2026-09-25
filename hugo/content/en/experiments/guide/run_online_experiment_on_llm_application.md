---
title: Run an Online Experiment on an LLM Application
description: Compare variants of an LLM application and measure their effect with Agent Observability evaluation scores.
further_reading:
- link: "/getting_started/feature_flags/"
  tag: "Documentation"
  text: "Getting Started with Feature Flags"
- link: "/llm_observability/investigate/evaluations/"
  tag: "Documentation"
  text: "Agent Observability Evaluations"
- link: "/llm_observability/improve/experiments/"
  tag: "Documentation"
  text: "Agent Observability Experiments"
- link: "/experiments/reading_results/"
  tag: "Documentation"
  text: "Reading Experiment Results"
---

## Overview

Use a Datadog online experiment to compare two versions of an LLM application on live traffic. Datadog Feature Flags assigns each experiment subject to a variant, and an Agent Observability evaluation score measures the outcome.

This workflow uses **Datadog Experiments** to run a live A/B test. It is separate from [Agent Observability Experiments][11], which run offline evaluations against datasets.

This guide covers the LLM-specific configuration for the following workflow:

1. Create a Datadog feature flag.
1. Evaluate the flag in your application and run the assigned variant.
1. Report a numeric Agent Observability evaluation score.
1. Link the feature flag and evaluation score to a Datadog experiment.
1. Run the experiment and review the results.

## Prerequisites

Before you begin:

- [Instrument your LLM application with Agent Observability][1].
- Install and initialize a [Datadog Feature Flags SDK][2] in the application.
- Choose the application behavior you want to compare and a numeric evaluation score that measures the outcome.
- Confirm that you have the permissions listed in [Plan and Launch Experiments][3].

## Step 1: Create a feature flag

Follow [Create your first feature flag][4] to create a Boolean flag for the application behavior you want to test. Use one value for the control behavior and the other for the treatment behavior.

Make the flag available in each environment where you plan to run the experiment. Do not add a targeting rule or configure a percentage rollout on the flag. When you start the experiment, Datadog adds an experiment targeting rule that controls the traffic split.

<div class="alert alert-info">
  <strong>Use an AI coding agent</strong>: Connect your agent to the Datadog MCP Server with the <code>feature-flags</code> toolset enabled. The agent can use <code>create_datadog_feature_flag</code> to create the flag. For setup instructions and supported operations, see <a href="/feature_flags/feature_flag_mcp_server/">Feature Flags MCP Server</a>.<br><br>
  <strong>Example prompt</strong>: <code>Create a Boolean Datadog feature flag named &lt;FLAG_NAME&gt; for &lt;APPLICATION_BEHAVIOR&gt;. Use false for the control and true for the treatment. Do not add targeting rules or percentage rollouts.</code>
</div>

<!-- TODO: Add a screenshot of the Boolean feature flag configuration. -->

## Step 2: Evaluate the flag in your application

Follow [Evaluate the flag and write feature code][5] to evaluate the flag and run the control or treatment behavior based on its value.

Set the Feature Flags evaluation context `targetingKey` to a stable identifier for the experiment subject:

- For an application with a human user, use a stable user identifier.
- For an autonomous workflow without a human user, generate a UUID at the start of the run and retain it for the entire run.

You use this same value as the `subject_identifier` when you report the evaluation score in [Step 3](#step-3-report-an-evaluation-score). If the values do not match, Datadog cannot associate the score with the subject's experiment exposure. For more information, see [The targeting key][6].

<div class="alert alert-info">
  <strong>Use an AI coding agent</strong>: Ask the agent to implement the feature flag in your application and preserve one stable subject identifier across the flag evaluation and evaluation score. For React applications, the agent can also use <code>check_datadog_flag_implementation</code> to review the implementation.<br><br>
  <strong>Example prompt</strong>: <code>Implement the Datadog feature flag &lt;FLAG_NAME&gt; in this application. Run the control behavior when the flag is false and the treatment behavior when it is true. Use the user ID as the targetingKey. If there is no user, generate one UUID at the start of the workflow and reuse it for the entire run.</code>
</div>

<!-- TODO: Add a screenshot of the feature flag implementation instructions. -->

## Step 3: Report an evaluation score

Online experiments support Agent Observability evaluations with a `score` metric type. Boolean, categorical, and JSON evaluations are not supported as experiment metrics.

Choose one of the following methods.

### Submit an external evaluation

Follow [External Evaluations][7] to submit an evaluation from your application code. Add a `subject_identifier` tag whose value exactly matches the `targetingKey` used to evaluate the feature flag:

{{< code-block lang="python" >}}
from ddtrace.llmobs import LLMObs

score = 0.42
subject_key = "82a4e675-9cb4-4da6-a91a-819574152a63"
span_context = LLMObs.export_span(span=None)

LLMObs.submit_evaluation(
    span=span_context,
    ml_app="YOUR_ML_APP",
    label="YOUR_EVALUATION_NAME",
    metric_type="score",
    value=score,
    tags={
        "subject_identifier": subject_key,
    },
    assessment="pass" if score > 0.5 else "fail",
)
{{< /code-block >}}

### Use a managed evaluation

Follow [Managed Evaluations][8] to create and publish an evaluation. On the span evaluated by the managed evaluation, add a `subject_identifier` tag whose value exactly matches the `targetingKey` used to evaluate the feature flag:

{{< code-block lang="python" >}}
from ddtrace.llmobs import LLMObs

subject_key = "82a4e675-9cb4-4da6-a91a-819574152a63"

with LLMObs.workflow(name="my_workflow") as span:
    LLMObs.annotate(
        span=span,
        tags={"subject_identifier": subject_key},
    )
    # Run the rest of the instrumented workflow.
{{< /code-block >}}

<div class="alert alert-info">
  <strong>Use an AI coding agent</strong>: Ask the agent to add one of the evaluation methods above to the instrumented workflow.<br><br>
  <strong>Example prompt</strong>: <code>Add an Agent Observability score evaluation named &lt;EVALUATION_NAME&gt; to this workflow. Use the same subject identifier that the feature flag passes as targetingKey, and include it as the subject_identifier tag on the evaluation or evaluated span. Do not use a Boolean, categorical, or JSON evaluation.</code>
</div>

<!-- TODO: Add a screenshot of an evaluation score with its subject_identifier tag. -->

## Step 4: Create and launch the experiment

Follow [Plan and Launch Experiments][3] to create an experiment and configure it with the following values:

- Select the Agent Observability evaluation score from Step 3 as the primary metric.
- Add the feature flag from Step 1.
- Configure how traffic is split between the control and treatment variants.
- Start the experiment.

<div class="alert alert-info">
  <strong>Use an AI coding agent</strong>: Connect your agent to the Datadog MCP Server with the <code>experiments</code> toolset enabled. The agent can create the draft experiment and link the feature flag. Configure and review the traffic split in the Datadog UI before starting the experiment. For setup instructions and supported operations, see <a href="/experiments/mcp_tools/">Experiments MCP Tools</a>.<br><br>
  <strong>Example prompt</strong>: <code>Create a Datadog experiment named &lt;EXPERIMENT_NAME&gt; with the hypothesis &lt;HYPOTHESIS&gt;. Use &lt;EVALUATION_NAME&gt; as the primary metric, link the &lt;FLAG_NAME&gt; feature flag, and return the experiment URL. Do not start the experiment.</code>
</div>

Starting the experiment adds the experiment targeting rule to the selected flag and begins recording exposures. For details about how feature flag assignments become experiment exposures, see [Feature Flags and Experiments][9].

<!-- TODO: Add a screenshot of the experiment configured with an Agent Observability evaluation score and feature flag. -->

## Step 5: Run the experiment and review results

Send traffic through the application. For each subject, the application must evaluate the feature flag and report an evaluation score with the same subject identifier.

As exposures and evaluation scores arrive, Datadog populates the experiment results. Follow [Reading Experiment Results][10] to interpret the metric scorecard and compare the variants.

If the experiment reports missing metric data, confirm that:

- The application evaluated the experiment's feature flag for the subject.
- The evaluation has a numeric `score` value.
- The evaluation's `subject_identifier` exactly matches the feature flag evaluation's `targetingKey`.

<!-- TODO: Add a screenshot of the experiment results populated with the evaluation score. -->

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /llm_observability/instrument/
[2]: /getting_started/feature_flags/#feature-flags-sdks
[3]: /experiments/plan_and_launch_experiments/
[4]: /getting_started/feature_flags/#step-2-create-a-feature-flag
[5]: /getting_started/feature_flags/#step-3-evaluate-the-flag-and-write-feature-code
[6]: /feature_flags/concepts/evaluation_context/#the-targeting-key
[7]: /llm_observability/investigate/evaluations/external_evaluations/
[8]: /llm_observability/investigate/evaluations/managed_evaluations/
[9]: /feature_flags/concepts/experiments/
[10]: /experiments/reading_results/
[11]: /llm_observability/improve/experiments/
