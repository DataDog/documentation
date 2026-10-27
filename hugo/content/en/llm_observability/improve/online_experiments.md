---
title: Online Experiments
aliases:
- /experiments/guide/run_online_experiment_on_llm_application/
- /llm_observability/configure/prompt_experimentation/
- /llm_observability/monitoring/prompt_experimentation/
description: Compare variants of an LLM application on live traffic, A/B test managed prompt versions, and roll out prompt versions with Guarded Rollouts.
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
- link: "/llm_observability/configure/prompt_management"
  tag: "Documentation"
  text: "Prompt Management"
- link: "/feature_flags/use_cases/progressive_rollouts/"
  tag: "Documentation"
  text: "Progressive Rollouts and Canaries"
---

## Overview

Online Experiments compare multiple versions of an LLM application or agent on live production traffic. Datadog Feature Flags assigns each [experiment subject][2], such as a user or an autonomous workflow run, to a control or treatment variant. An Agent Observability evaluation measures the outcome for each subject, and [Datadog Experiments][1] determines whether the difference between variants is statistically significant.

Use Online Experiments to validate a change, such as a new model, prompt, or tool, against real users after you test it offline.

If you serve prompts with [Prompt Management][15], you can A/B test prompt versions or roll out a new version with a Guarded Rollout from the prompt page, without writing feature flag code. See [Experiment with managed prompts](#experiment-with-managed-prompts).

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

## Experiment with managed prompts

If you serve prompts with [Prompt Management][15], test a prompt change on live traffic before making it the default. Prompt Management creates and evaluates the feature flag for you, so you do not need to complete [Step 1](#step-1-create-a-feature-flag) or [Step 2](#step-2-evaluate-the-flag-in-your-application).

- **Which prompt version performs better?** [Run an A/B test](#run-an-ab-test) to compare versions against an outcome, such as checkout conversion.
- **How do I introduce a change gradually?** [Use a Guarded Rollout](#use-a-guarded-rollout) to increase exposure to a version over time and pause if Datadog detects a regression.

<div class="alert alert-info"><strong>Preview:</strong> A/B testing and Guarded Rollouts for managed prompts are available in Preview. To request access, contact <a href="https://www.datadoghq.com/support/">Datadog Support</a> or your Customer Success Manager. You can request access to A/B testing and Guarded Rollouts independently.</div>

### Before you begin

You need a managed prompt with at least two versions, a version deployed to the environment you want to use, and an [Experiment metric][16] that measures your outcome. Complete the [one-time application setup](#set-up-your-application) and check the [permissions](#permissions-for-managed-prompts) for your workflow.

**Permissions:** A/B testing requires permissions in Product Analytics and Feature Flags, in addition to Agent Observability. Preview access does not grant these permissions. Ask your Datadog administrator to check your role before starting.

### Set up your application

Complete this setup once for either workflow. If your application already sends prompt assignments and matching outcomes, go directly to [A/B testing](#run-an-ab-test) or [Guarded Rollouts](#use-a-guarded-rollout).

#### Connect the application

Complete the [Prompt Management setup][17] and set `DD_ENV` to the experiment's environment. Then follow the instructions for your language to configure experiment exposure reporting.

{{< tabs >}}
{{% tab "Python" %}}

Install the SDK with experimentation support:

```shell
pip install --upgrade "ddtrace[openfeature]>=4.15.0"
```

This Python setup requires a connection to the Datadog Agent. Check the tracer startup or debug logs for Agent connection errors. See [APM Connection Errors][31] for troubleshooting.

Leave Agentless mode disabled. If your application sets `DD_LLMOBS_AGENTLESS_ENABLED=1`, remove that setting before using this setup.

For application setup, see the [Python SDK guide][30].

[30]: /tracing/trace_collection/dd_libraries/python/#getting-started
[31]: /tracing/troubleshooting/connection_errors/
{{% /tab %}}
{{% tab "Node.js" %}}

Use `dd-trace` 5.128.0 or later in the 5.x release line, or 6.17.0 or later. Set the following before [initializing the tracer][33]:

```shell
export DD_FEATURE_FLAGS_CONFIGURATION_SOURCE=remote_config
```

Make sure the application can reach the Agent and [Remote Configuration][32] is enabled. No additional SDK initialization is needed.

Alternatively, use [agentless delivery][34] to retrieve prompt assignments and report exposures without an Agent. Agentless delivery requires `DD_API_KEY`.

[32]: /remote_configuration/
[33]: /tracing/trace_collection/dd_libraries/nodejs/#import-and-initialize-the-tracer
[34]: /feature_flags/server/nodejs/#configure-agentless-delivery
{{% /tab %}}
{{< /tabs >}}

#### Match prompt requests to outcomes

Pass the user ID as the targeting key when retrieving a prompt, as shown in the following examples. Use a stable, non-empty string that matches the user ID recorded with outcome events. Datadog uses this ID to associate outcomes with the assigned prompt version. This is the same requirement as matching the `targetingKey` and `subject_identifier` in [Step 2](#step-2-evaluate-the-flag-in-your-application).

{{< tabs >}}
{{% tab "Python" %}}

```python
from ddtrace.llmobs import LLMObs

prompt = LLMObs.get_prompt(
    "checkout-assistant",
    targeting_key=current_user.id,
    fallback="You are a helpful checkout assistant.",
)
```

{{% /tab %}}
{{% tab "Node.js" %}}

```javascript
const prompt = await tracer.llmobs.prompts.getPrompt('checkout-assistant', {
  targetingKey: currentUser.id,
  fallback: 'You are a helpful checkout assistant.',
})
```

{{% /tab %}}
{{< /tabs >}}

Do not specify an exact prompt version. Doing so bypasses environment assignment and prevents Datadog from recording an experiment exposure. The SDK reports exposures automatically.

For example, if your checkout metric uses RUM events and the **User** subject type, identify the browser user with the same ID:

```javascript
datadogRum.setUser({
  id: currentUser.id,
})
```

RUM is only needed when it supplies your chosen outcome. For other outcome sources, or to compare organizations rather than users, configure the matching [subject type][2]. Outcomes must occur after the user's first exposure to the prompt version to be attributed to it.

#### Choose an outcome metric

Create or select an [Experiment metric][16] under [{{< ui >}}Product Analytics{{< /ui >}} > {{< ui >}}Experiments{{< /ui >}} > {{< ui >}}Metrics{{< /ui >}}][18]. Metrics Explorer metrics and monitors are not selectable here.

For example, for a checkout conversion metric, set {{< ui >}}Desired metric direction{{< /ui >}} to {{< ui >}}Higher is better{{< /ui >}}. Make sure the outcome events use the same user ID as the prompt request. Confirm that outcome events are arriving before relying on the metric to compare versions or pause a rollout.

{{< agent-only >}}
**Note for AI agents:** Use the application's existing stable subject identifier as a string for the targeting key, matching the Experiment subject. Ask if the identity or outcome source is unclear. Do not install RUM unless the outcome uses RUM. Preserve the existing fallback, prompt variables, provider, model, and application behavior. Do not request an exact prompt version. Creating or editing metrics, starting experiments, deploying versions, and controlling rollouts require an explicit user request; when asked only to prepare code, report the remaining Datadog UI steps.
{{< /agent-only >}}

### Run an A/B test

For example, compare two versions of a checkout assistant to see which produces a higher checkout conversion rate.

1. Open the prompt and click {{< ui >}}Set up A/B test{{< /ui >}}.
1. Select an environment and click {{< ui >}}Create draft & continue{{< /ui >}}. This opens the test in Product Analytics. Creating a draft does not change live traffic.
1. Configure and start the test as described in [Step 4](#step-4-create-and-launch-the-experiment): choose the prompt versions, audience, traffic split, and {{< ui >}}Primary metric{{< /ui >}}. Under {{< ui >}}Calculate metrics by{{< /ui >}}, choose the subject type that matches your application's targeting key (for example, **User** when you pass a user ID).
1. Check {{< ui >}}Flag & Exposures{{< /ui >}} to confirm that the test receives assignments, then review the results as described in [Step 5](#step-5-run-the-experiment-and-review-results).

Return to {{< ui >}}A/B tests using this prompt{{< /ui >}} on the prompt page to open the results or finish a draft.

{{< img src="llm_observability/monitoring/prompt-ab-tests.png" alt="A/B tests using a prompt, showing a running test comparing concise and detailed answers, its versions, primary metric and audience, and a draft with a Finish Setup button." style="width:100%;" >}}

**Choosing a winner does not deploy it automatically.** Conclude the test, then return to the prompt and deploy the version you choose. Users outside the test's audience continue to follow the environment's other serving rules.

### Use a Guarded Rollout

A Guarded Rollout works like a Feature Flags [canary][19]: it increases exposure to a prompt version over time while monitoring a guardrail metric. For example, introduce an updated checkout assistant while watching checkout conversion. The deployed version is the **baseline**; the new version is the **candidate**. If the environment has no deployed version, deploy one immediately first to establish a baseline.

1. Open the candidate version and click {{< ui >}}Deploy Version{{< /ui >}}.
1. Select the environment in {{< ui >}}Deploy to{{< /ui >}}.
1. Expand {{< ui >}}Deployment strategy{{< /ui >}}, choose {{< ui >}}Guarded rollout{{< /ui >}}, and select a {{< ui >}}Guardrail metric{{< /ui >}}.
1. Use {{< ui >}}Inspect metric{{< /ui >}} to check its definition and confirm whether higher or lower values are better.
1. Review the proposed change and click {{< ui >}}Deploy Version{{< /ui >}} to start the rollout.

{{< img src="llm_observability/monitoring/prompt-guarded-rollout-setup.png" alt="Deploy version 3 dialog with Production selected, Guarded rollout enabled, and Checkout completion rate selected as the guardrail metric, with an Inspect metric link." style="width:80%;" >}}

#### Follow its progress

Open {{< ui >}}Active rollouts{{< /ui >}} on the prompt page to follow the candidate's exposure. Exposure increases automatically while the rollout is running. Use {{< ui >}}Pause{{< /ui >}} to hold the current split and {{< ui >}}Resume{{< /ui >}} to continue.

If a guardrail detects a regression, the rollout pauses under {{< ui >}}Needs attention{{< /ui >}}. Open the metric to investigate, then choose:

- {{< ui >}}Resume anyway{{< /ui >}} to continue exposing the candidate.
- {{< ui >}}Stop{{< /ui >}} to end the rollout and restore its eligible traffic to the baseline.

**A pause does not roll back the candidate:** the current traffic split stays in place until you act. Stopping affects only that environment's rollout, not other environments or A/B tests. To start again after stopping, deploy a version again.

{{< img src="llm_observability/monitoring/prompt-guarded-rollout-paused.png" alt="A prompt page showing a Staging rollout under Needs Attention, paused at 25 percent exposure to version 2, with the Checkout Completion Rate metric and Resume Anyway and Stop actions." style="width:100%;" >}}

When the rollout finishes, the candidate receives all traffic eligible for that rollout and disappears from {{< ui >}}Active rollouts{{< /ui >}}. Other targeting rules may still serve different versions.

<div class="alert alert-warning">Guardrails depend on available outcome data. Sparse, missing, or unmatched data may not trigger a pause. Reaching full exposure does not prove that the candidate is better or safe.</div>

### Permissions for managed prompts

In addition to the [Prompt Management prerequisites][20], your role needs:

| Action | Required permission |
|--------|---------------------|
| Set up an A/B test from a prompt | Product Analytics Experiments Write |
| Start a Guarded Rollout | LLM Observability Write and Feature Flags Environment Config Read |
| Pause or resume a Guarded Rollout | Feature Flags Config Write |
| Stop a Guarded Rollout | LLM Observability Read and Write |

To configure and launch an A/B test in Product Analytics, see [Product Analytics permissions][21] and [Feature Flags permissions][22]. If your environment requires approvals, request approval in Feature Flags before changing live traffic.

### Troubleshoot managed prompt experiments

#### I cannot start a test or rollout

- **Controls are missing or disabled:** confirm access to the relevant Preview and the [required permissions](#permissions-for-managed-prompts). A/B setup also requires two prompt versions and an enabled environment whose serving configuration can be loaded.
- **A guarded deployment is rejected:** establish a baseline first. Resolve the conflict shown for the environment, such as an active all-user experiment or a forced version override, before trying again.
- **You can create a draft but cannot configure or launch the test:** check your [Product Analytics permissions][21] and [Feature Flags permissions][22] with your Datadog administrator, along with any required environment approvals. Confirm that the test has a primary metric selected.

#### I do not see assignments or results

- **Only the fallback is returned, or assignments are missing:** Check the SDK installation, `DD_ENV`, Agent connectivity, and that retrieval does not specify `version`.
- **The Agent is unavailable:** If you configured an API key and an application key, prompt retrieval can continue directly from Datadog. The Agent-based setup does not automatically switch to agentless exposure reporting.
- **Outcomes are missing:** Check matching subject IDs, metric scope, and that events occur after exposure. Allow enough data to accumulate; see [Experiment Diagnostics][23].

#### I cannot control or inspect a rollout

- **Pause, Resume, or Stop is unavailable:** check the [permissions](#permissions-for-managed-prompts). Stop requires different permissions from Pause and Resume.
- **Status cannot be loaded:** refresh, then check the reported error or contact Datadog Support. An unavailable status does not mean the rollout stopped.

#### I am deploying again or to several environments

Review each environment's deployment strategy: saved guarded settings may already be selected. Immediate environments switch without a rollout. Deploying another version can replace an active rollout; review the replacement warning before confirming.

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
[16]: /experiments/defining_metrics/
[17]: /llm_observability/configure/prompt_management/#configure-prompt-retrieval
[18]: https://app.datadoghq.com/product-analytics/experimentation-metrics
[19]: /feature_flags/use_cases/progressive_rollouts/#canaries
[20]: /llm_observability/configure/prompt_management/#prerequisites
[21]: /account_management/rbac/permissions/#product-analytics
[22]: /account_management/rbac/permissions/#feature-flags
[23]: /experiments/diagnostics/
