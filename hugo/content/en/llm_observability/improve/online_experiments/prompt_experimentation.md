---
title: Prompt Experimentation
aliases:
  - /llm_observability/configure/prompt_experimentation/
  - /llm_observability/monitoring/prompt_experimentation/
description: Compare managed prompt versions with A/B tests and deploy versions with Guarded Rollouts.

further_reading:
  - link: "/llm_observability/improve/online_experiments"
    tag: "Documentation"
    text: "Online Experiments"
  - link: "/llm_observability/configure/prompt_management"
    tag: "Documentation"
    text: "Prompt Management"
  - link: "/experiments/defining_metrics/"
    tag: "Documentation"
    text: "Create Experiment Metrics"
  - link: "/feature_flags/use_cases/progressive_rollouts/"
    tag: "Documentation"
    text: "Progressive Rollouts and Canaries"

---

## Overview

Test a [Prompt Management][1] prompt change on live traffic before making it the default. This is a special case of [Online Experiments][2]: Prompt Management creates and evaluates the feature flag for you, so you do not write feature flag code.

- **Which prompt version performs better?** [Run an A/B test](#run-an-ab-test) to compare versions against an outcome, such as checkout conversion.
- **How do I introduce a change gradually?** [Use a Guarded Rollout](#use-a-guarded-rollout) to increase exposure to a version over time and pause if Datadog detects a regression.

<div class="alert alert-info"><strong>Preview:</strong> A/B testing and Guarded Rollouts for managed prompts are available in Preview. To request access, contact <a href="https://www.datadoghq.com/support/">Datadog Support</a> or your Customer Success Manager. You can request access to A/B testing and Guarded Rollouts independently.</div>

## Before you begin

You need a managed prompt with at least two versions, a version deployed to the environment you want to use, and an [Experiment metric][3] that measures your outcome. Complete the [one-time application setup](#set-up-your-application) and check the [permissions](#permissions) for your workflow.

**Permissions:** A/B testing requires permissions in Product Analytics and Feature Flags, in addition to Agent Observability. Preview access does not grant these permissions. Ask your Datadog administrator to check your role before starting.

## Set up your application

Complete this setup once for either workflow. If your application already sends prompt assignments and matching outcomes, go directly to [A/B testing](#run-an-ab-test) or [Guarded Rollouts](#use-a-guarded-rollout).

### Connect the application

Complete the [Prompt Management setup][4] and set `DD_ENV` to the experiment's environment. Then follow the instructions for your language to configure experiment exposure reporting.

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

### Match prompt requests to outcomes

Pass the user ID as the targeting key when retrieving a prompt, as shown in the following examples. Use a stable, non-empty string that matches the user ID recorded with outcome events. Datadog uses this ID to associate outcomes with the assigned prompt version. This is the same requirement as matching the feature flag `targetingKey` and evaluation `subject_identifier` in [Online Experiments][5].

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

RUM is only needed when it supplies your chosen outcome. For other outcome sources, or to compare organizations rather than users, configure the matching [subject type][6]. Outcomes must occur after the user's first exposure to the prompt version to be attributed to it.

### Choose an outcome metric

Create or select an [Experiment metric][3] under [{{< ui >}}Product Analytics{{< /ui >}} > {{< ui >}}Experiments{{< /ui >}} > {{< ui >}}Metrics{{< /ui >}}][7]. Metrics Explorer metrics and monitors are not selectable here.

For example, for a checkout conversion metric, set {{< ui >}}Desired metric direction{{< /ui >}} to {{< ui >}}Higher is better{{< /ui >}}. Make sure the outcome events use the same user ID as the prompt request. Confirm that outcome events are arriving before relying on the metric to compare versions or pause a rollout.

{{< agent-only >}}
**Note for AI agents:** Use the application's existing stable subject identifier as a string for the targeting key, matching the Experiment subject. Ask if the identity or outcome source is unclear. Do not install RUM unless the outcome uses RUM. Preserve the existing fallback, prompt variables, provider, model, and application behavior. Do not request an exact prompt version. Creating or editing metrics, starting experiments, deploying versions, and controlling rollouts require an explicit user request; when asked only to prepare code, report the remaining Datadog UI steps.
{{< /agent-only >}}

## Run an A/B test

For example, compare two versions of a checkout assistant to see which produces a higher checkout conversion rate.

1. Open the prompt and click {{< ui >}}Set up A/B test{{< /ui >}}.
1. Select an environment and click {{< ui >}}Create draft & continue{{< /ui >}}. This opens the test in Product Analytics. Creating a draft does not change live traffic.
1. Configure and start the test as described in [Create and launch the experiment][8]: choose the prompt versions, audience, traffic split, and {{< ui >}}Primary metric{{< /ui >}}. Under {{< ui >}}Calculate metrics by{{< /ui >}}, choose the subject type that matches your application's targeting key (for example, **User** when you pass a user ID).
1. Check {{< ui >}}Flag & Exposures{{< /ui >}} to confirm that the test receives assignments, then review the results as described in [Run the experiment and review results][9].

Return to {{< ui >}}A/B tests using this prompt{{< /ui >}} on the prompt page to open the results or finish a draft.

{{< img src="llm_observability/monitoring/prompt-ab-tests.png" alt="A/B tests using a prompt, showing a running test comparing concise and detailed answers, its versions, primary metric and audience, and a draft with a Finish Setup button." style="width:100%;" >}}

**Choosing a winner does not deploy it automatically.** Conclude the test, then return to the prompt and deploy the version you choose. Users outside the test's audience continue to follow the environment's other serving rules.

## Use a Guarded Rollout

A Guarded Rollout works like a Feature Flags [canary][10]: it increases exposure to a prompt version over time while monitoring a guardrail metric. For example, introduce an updated checkout assistant while watching checkout conversion. The deployed version is the **baseline**; the new version is the **candidate**. If the environment has no deployed version, deploy one immediately first to establish a baseline.

1. Open the candidate version and click {{< ui >}}Deploy Version{{< /ui >}}.
1. Select the environment in {{< ui >}}Deploy to{{< /ui >}}.
1. Expand {{< ui >}}Deployment strategy{{< /ui >}}, choose {{< ui >}}Guarded rollout{{< /ui >}}, and select a {{< ui >}}Guardrail metric{{< /ui >}}.
1. Use {{< ui >}}Inspect metric{{< /ui >}} to check its definition and confirm whether higher or lower values are better.
1. Review the proposed change and click {{< ui >}}Deploy Version{{< /ui >}} to start the rollout.

{{< img src="llm_observability/monitoring/prompt-guarded-rollout-setup.png" alt="Deploy version 3 dialog with Production selected, Guarded rollout enabled, and Checkout completion rate selected as the guardrail metric, with an Inspect metric link." style="width:80%;" >}}

### Follow its progress

Open {{< ui >}}Active rollouts{{< /ui >}} on the prompt page to follow the candidate's exposure. Exposure increases automatically while the rollout is running. Use {{< ui >}}Pause{{< /ui >}} to hold the current split and {{< ui >}}Resume{{< /ui >}} to continue.

If a guardrail detects a regression, the rollout pauses under {{< ui >}}Needs attention{{< /ui >}}. Open the metric to investigate, then choose:

- {{< ui >}}Resume anyway{{< /ui >}} to continue exposing the candidate.
- {{< ui >}}Stop{{< /ui >}} to end the rollout and restore its eligible traffic to the baseline.

**A pause does not roll back the candidate:** the current traffic split stays in place until you act. Stopping affects only that environment's rollout, not other environments or A/B tests. To start again after stopping, deploy a version again.

{{< img src="llm_observability/monitoring/prompt-guarded-rollout-paused.png" alt="A prompt page showing a Staging rollout under Needs Attention, paused at 25 percent exposure to version 2, with the Checkout Completion Rate metric and Resume Anyway and Stop actions." style="width:100%;" >}}

When the rollout finishes, the candidate receives all traffic eligible for that rollout and disappears from {{< ui >}}Active rollouts{{< /ui >}}. Other targeting rules may still serve different versions.

<div class="alert alert-warning">Guardrails depend on available outcome data. Sparse, missing, or unmatched data may not trigger a pause. Reaching full exposure does not prove that the candidate is better or safe.</div>

## Permissions

In addition to the [Prompt Management prerequisites][11], your role needs:

| Action | Required permission |
|--------|---------------------|
| Set up an A/B test from a prompt | Product Analytics Experiments Write |
| Start a Guarded Rollout | LLM Observability Write and Feature Flags Environment Config Read |
| Pause or resume a Guarded Rollout | Feature Flags Config Write |
| Stop a Guarded Rollout | LLM Observability Read and Write |

To configure and launch an A/B test in Product Analytics, see [Product Analytics permissions][12] and [Feature Flags permissions][13]. If your environment requires approvals, request approval in Feature Flags before changing live traffic.

## Troubleshooting

### I cannot start a test or rollout

- **Controls are missing or disabled:** confirm access to the relevant Preview and the [required permissions](#permissions). A/B setup also requires two prompt versions and an enabled environment whose serving configuration can be loaded.
- **A guarded deployment is rejected:** establish a baseline first. Resolve the conflict shown for the environment, such as an active all-user experiment or a forced version override, before trying again.
- **You can create a draft but cannot configure or launch the test:** check your [Product Analytics permissions][12] and [Feature Flags permissions][13] with your Datadog administrator, along with any required environment approvals. Confirm that the test has a primary metric selected.

### I do not see assignments or results

- **Only the fallback is returned, or assignments are missing:** Check the SDK installation, `DD_ENV`, Agent connectivity, and that retrieval does not specify `version`.
- **The Agent is unavailable:** If you configured an API key and an application key, prompt retrieval can continue directly from Datadog. The Agent-based setup does not automatically switch to agentless exposure reporting.
- **Outcomes are missing:** Check matching subject IDs, metric scope, and that events occur after exposure. Allow enough data to accumulate; see [Experiment Diagnostics][14].

### I cannot control or inspect a rollout

- **Pause, Resume, or Stop is unavailable:** check the [permissions](#permissions). Stop requires different permissions from Pause and Resume.
- **Status cannot be loaded:** refresh, then check the reported error or contact Datadog Support. An unavailable status does not mean the rollout stopped.

### I am deploying again or to several environments

Review each environment's deployment strategy: saved guarded settings may already be selected. Immediate environments switch without a rollout. Deploying another version can replace an active rollout; review the replacement warning before confirming.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /llm_observability/configure/prompt_management/
[2]: /llm_observability/improve/online_experiments/
[3]: /experiments/defining_metrics/
[4]: /llm_observability/configure/prompt_management/#configure-prompt-retrieval
[5]: /llm_observability/improve/online_experiments/#step-2-evaluate-the-flag-in-your-application
[6]: /experiments/concepts/subject_types/
[7]: https://app.datadoghq.com/product-analytics/experimentation-metrics
[8]: /llm_observability/improve/online_experiments/#step-4-create-and-launch-the-experiment
[9]: /llm_observability/improve/online_experiments/#step-5-run-the-experiment-and-review-results
[10]: /feature_flags/use_cases/progressive_rollouts/#canaries
[11]: /llm_observability/configure/prompt_management/#prerequisites
[12]: /account_management/rbac/permissions/#product-analytics
[13]: /account_management/rbac/permissions/#feature-flags
[14]: /experiments/diagnostics/
