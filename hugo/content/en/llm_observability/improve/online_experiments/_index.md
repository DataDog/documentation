---
title: Online Experiments
aliases:
- /experiments/guide/run_online_experiment_on_llm_application/
description: Compare variants of an LLM application on live traffic and measure their effect with Agent Observability evaluations.
further_reading:
- link: "/llm_observability/improve/offline_experiments"
  tag: "Documentation"
  text: "Agent Observability Offline Experiments"
- link: "/llm_observability/investigate/evaluations/"
  tag: "Documentation"
  text: "Agent Observability Evaluations"
- link: "/getting_started/feature_flags/"
  tag: "Documentation"
  text: "Getting Started with Feature Flags"
- link: "/experiments/reading_results/"
  tag: "Documentation"
  text: "Reading Experiment Results"
- link: "/llm_observability/improve/online_experiments/prompt_experimentation"
  tag: "Documentation"
  text: "Prompt Experimentation"
---

## Overview

Online Experiments compare multiple versions of an LLM application or agent on live production traffic. Datadog Feature Flags assigns each [experiment subject][2], such as a user or an autonomous workflow run, to a control or treatment variant. An Agent Observability evaluation measures the outcome for each subject, and [Datadog Experiments][1] determines whether the difference between variants is statistically significant.

Use Online Experiments to validate a change, such as a new model, prompt, or tool, against real users after you test it offline.

If you serve prompts with [Prompt Management][15], you can A/B test prompt versions or roll out a new version with a Guarded Rollout from the prompt page, without writing feature flag code. See [Prompt Experimentation][16].

Setting up an online experiment involves the following steps:

1. Create a [Datadog feature flag][14].
1. Evaluate the flag in your application and run the assigned variant.
1. Report an Agent Observability evaluation.
1. Link the feature flag and evaluation to a Datadog experiment.
1. Run the experiment and review the results.

{{< skill-callout
    title="Start an online experiment with an agent"
    text="Copy this prompt into your AI coding agent to use the `agent-observability-online-experiment` skill for guided setup."
    action_name="copy_agent_observability_online_experiment_prompt"
    lang="text" >}}
Use the skill at https://github.com/datadog-labs/agent-skills/blob/main/agent-observability/agent-observability-online-experiment/SKILL.md to start an online experiment to compare the code in my current Git branch against trunk. Make 10% of the traffic use the code in my branch.
{{< /skill-callout >}}

## Prerequisites

Before you begin:

- [Instrument your LLM application with Agent Observability][3].
- Install and initialize a [Datadog Feature Flags SDK][4] in the application.
- Choose the application behavior you want to compare and an evaluation that measures the outcome. The evaluation must return a numeric score or a pass or fail assessment.
- Confirm that you have the permissions listed in [Plan and Launch Experiments][5].

<div class="alert alert-info"><strong>Using an AI coding agent?</strong> Datadog organizations allow read-only <a href="/llm_observability/build_with_ai/mcp_server/">MCP tools</a> by default. To let an agent create feature flags and experiments, an organization administrator must enable MCP write access, and your role must have the <code>mcp_write</code> permission. See <a href="/mcp_server/setup/#required-permissions">Required permissions</a> for the Datadog MCP Server.</div>

{{< agent-only >}}
**Instruction for AI agents**: Before calling an MCP tool that creates or modifies a Datadog resource, confirm that the required write tool is available. If write access is unavailable, direct the human to [Required permissions](/mcp_server/setup/#required-permissions) and wait for them to enable access.
{{< /agent-only >}}

## Step 1: Create a feature flag

Follow [Create your first feature flag][6] to create a Boolean flag for the application behavior you want to test. Use one value for the control behavior and the other for the treatment behavior.

Make the flag available in each environment where you plan to run the experiment. Do not add a targeting rule or configure a percentage rollout on the flag. When you start the experiment, Datadog adds an experiment targeting rule that controls the traffic split.

{{< img src="/product_analytics/experiment/guide/llm_experiment_create_feature_flag.png" alt="The Create Flag page with the use-latest-frontier-model flag name, Boolean variant type, false and true variants, and Create Flag button." style="width:90%;" >}}

## Step 2: Evaluate the flag in your application

Follow [Evaluate the flag and write feature code][7] to evaluate the flag and run the control or treatment behavior based on its value.

Set the Feature Flags evaluation context `targetingKey` to a stable identifier for the experiment subject:

- For an application with a human user, use a stable user identifier.
- For an autonomous workflow without a human user, generate a UUID at the start of the run and retain it for the entire run.

You use this same value as the `subject_identifier` when you report the evaluation in [Step 3](#step-3-report-an-evaluation). If the values do not match, Datadog cannot associate the evaluation with the subject's experiment exposure. For more information, see [The targeting key][8].

## Step 3: Report an evaluation

<div class="alert alert-warning"><strong>Supported evaluation types</strong>: Experiment metrics can use the average of a <code>score</code> evaluation, or the <strong>pass rate</strong> of any evaluation that returns a pass or fail assessment. Pass rate counts <code>pass</code> as 1 and <code>fail</code> as 0, and excludes evaluations without an assessment. Raw Boolean and categorical values cannot be used directly as experiment metrics.</div>

Choose one of the following methods.

### Submit an external evaluation

Follow [External Evaluations][9] to submit an evaluation from your application code. Add a `subject_identifier` tag whose value exactly matches the `targetingKey` used to evaluate the feature flag:

{{< code-block lang="python" >}}
from ddtrace.llmobs import LLMObs

score = 0.42
subject_key = "82a4e675-9cb4-4da6-a91a-819574152a63"
span_context = LLMObs.export_span(span=None)

LLMObs.submit_evaluation(
    span=span_context,
    ml_app="<ML_APP>",
    label="<EVALUATION_NAME>",
    metric_type="score",
    value=score,
    tags={
        "subject_identifier": subject_key,
    },
    assessment="pass" if score > 0.5 else "fail",
)
{{< /code-block >}}

### Use a managed evaluation

Follow [Managed Evaluations][10] to create and publish an evaluation. On the span evaluated by the managed evaluation, add a `subject_identifier` tag whose value exactly matches the `targetingKey` used to evaluate the feature flag:

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

For trace-level evaluations, add the tag to the root span of the trace. Session-level evaluations do not support experiment metrics.

## Step 4: Create and launch the experiment

Follow [Plan and Launch Experiments][5] to create and start the experiment:

1. Select a metric based on the Agent Observability evaluation from [Step 3](#step-3-report-an-evaluation) as the primary metric. If you have not created the experiment metric, follow [Create a metric from Agent Observability data][13].
1. Add the feature flag from [Step 1](#step-1-create-a-feature-flag).
1. Configure how traffic is split between the control and treatment variants.
1. Start the experiment.

{{< agent-only >}}
**Instruction for AI agents**: After creating the draft experiment, include the full experiment URL returned by Datadog in your final response. The human running the agent needs this link to open the experiment, review its configuration, and configure the traffic split in the Datadog UI.
{{< /agent-only >}}

Starting the experiment adds the experiment targeting rule to the selected flag and begins recording exposures. For details about how feature flag assignments become experiment exposures, see [Feature Flags and Experiments][11].

{{< img src="/product_analytics/experiment/guide/llm_experiment_create_experiment.png" alt="The Create new draft experiment dialog with the latest-frontier-model-experiment name, Start from scratch protocol, and Create Draft Experiment button." style="width:90%;" >}}

## Step 5: Run the experiment and review results

Send traffic through the application. For each subject, the application must evaluate the feature flag and report an evaluation with the same subject identifier.

As exposures and evaluations arrive, Datadog populates the experiment results. Follow [Reading Experiment Results][12] to interpret the metric scorecard and compare the variants.

{{< img src="/product_analytics/experiment/guide/llm_experiment_results.png" alt="A completed LLM application experiment showing the rollout decision and relative lift for quality, token usage, and estimated cost metrics across the control and treatment variants." style="width:90%;" >}}

## Troubleshooting

If the experiment reports missing metric data, confirm that:

- The application evaluated the experiment's feature flag for the subject.
- The evaluation has a numeric `score` value or a `pass` or `fail` assessment.
- The evaluation's `subject_identifier` exactly matches the feature flag evaluation's `targetingKey`.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /experiments/
[2]: /experiments/concepts/subject_types/
[3]: /llm_observability/instrument/
[4]: /getting_started/feature_flags/#feature-flags-sdks
[5]: /experiments/plan_and_launch_experiments/
[6]: /getting_started/feature_flags/#step-2-create-a-feature-flag
[7]: /getting_started/feature_flags/#step-3-evaluate-the-flag-and-write-feature-code
[8]: /feature_flags/concepts/evaluation_context/#the-targeting-key
[9]: /llm_observability/investigate/evaluations/external_evaluations/
[10]: /llm_observability/investigate/evaluations/managed_evaluations/
[11]: /feature_flags/concepts/experiments/
[12]: /experiments/reading_results/
[13]: /experiments/defining_metrics/?tab=agentobservability#create-a-metric-from-agent-observability-data
[14]: /feature_flags/
[15]: /llm_observability/configure/prompt_management/
[16]: /llm_observability/improve/online_experiments/prompt_experimentation/
