---
title: Prompt Experimentation
description: Compare managed prompt versions with A/B tests and deploy versions with Guarded Rollouts.

further_reading:
  - link: "/llm_observability/monitoring/prompt_management"
    tag: "Documentation"
    text: "Prompt Management"
  - link: "/experiments/defining_metrics/"
    tag: "Documentation"
    text: "Create Experiment Metrics"
  - link: "/experiments/reading_results/"
    tag: "Documentation"
    text: "Read Experiment Results"

---

## Overview

Test a prompt change on live traffic before making it the default. Use an **A/B test** to compare versions against an outcome, such as checkout conversion. Use a **Guarded Rollout** to introduce a version gradually and pause if Datadog detects a regression.

<div class="alert alert-info"><strong>Preview:</strong> Prompt Experimentation is available in Preview. To request access, contact <a href="https://www.datadoghq.com/support/">Datadog Support</a> or your Customer Success Manager. A/B testing and Guarded Rollouts are available separately.</div>

- **Which prompt performs better?** [Run an A/B test](#run-an-ab-test).
- **How do I introduce a change gradually?** [Use a Guarded Rollout](#use-a-guarded-rollout).

## Before you begin

You need a managed prompt with at least two versions, a version deployed to the environment you want to use, and an [Experiment metric][2] that measures your outcome. Check the [permissions](#permissions) for your workflow.

**First time?** Complete the [one-time application setup](#set-up-your-application) before starting either workflow. It requires Python `ddtrace[openfeature]` 4.15.0 or later, a reachable Datadog Agent, and matching user identifiers in prompt requests and outcome events. Agentless mode is not supported.

## Run an A/B test

For example, compare two versions of a checkout assistant to see which produces a higher checkout conversion rate.

1. Open the prompt and click {{< ui >}}Set up A/B test{{< /ui >}}.
1. Select an environment and click {{< ui >}}Create draft & continue{{< /ui >}}. This opens the test in Product Analytics. Creating a draft does not change live traffic.
1. Choose the prompt versions, audience, traffic split, and {{< ui >}}Primary metric{{< /ui >}}. Under {{< ui >}}Calculate metrics by{{< /ui >}}, choose the subject type that matches your application's `targeting_key`—for example, **User** when you pass a user ID.
1. Start the test. Check {{< ui >}}Flag & Exposures{{< /ui >}} to confirm that it receives assignments, then [compare the results][12].

Return to {{< ui >}}A/B tests using this prompt{{< /ui >}} on the prompt page to open the results or finish a draft. Configure and conclude the test in Product Analytics; see [Plan and Launch Experiments][11] for detailed instructions.

{{< img src="llm_observability/monitoring/prompt-ab-tests.png" alt="A/B tests using a prompt, showing a running test comparing concise and detailed answers, its versions, primary metric and audience, and a draft with a Finish Setup button." style="width:100%;" >}}

**Choosing a winner does not deploy it automatically.** Conclude the test, then return to the prompt and deploy the version you choose. Users outside the test's audience continue to follow the environment's other serving rules.

## Use a Guarded Rollout

For example, introduce an updated checkout assistant while watching checkout conversion. The deployed version is the **baseline**; the new version is the **candidate**. If the environment has no deployed version, deploy one immediately first to establish a baseline.

1. Open the candidate version and click {{< ui >}}Deploy Version{{< /ui >}}.
1. Select the environment in {{< ui >}}Deploy to{{< /ui >}}.
1. Expand {{< ui >}}Deployment strategy{{< /ui >}}, choose {{< ui >}}Guarded rollout{{< /ui >}}, and select a {{< ui >}}Guardrail metric{{< /ui >}}. Use {{< ui >}}Inspect metric{{< /ui >}} to check its definition and confirm whether higher or lower values are better.
1. Review the proposed change and click {{< ui >}}Deploy Version{{< /ui >}} to start the rollout.

{{< img src="llm_observability/monitoring/prompt-guarded-rollout-setup.png" alt="Deploy version 3 dialog with Production selected, Guarded rollout enabled, and Checkout completion rate selected as the guardrail metric, with an Inspect metric link." style="width:80%;" >}}

### Follow its progress

Open {{< ui >}}Active rollouts{{< /ui >}} on the prompt page to follow the candidate's exposure. Exposure increases automatically while the rollout is running. Use **Pause** to hold the current split and **Resume** to continue.

If a guardrail detects a regression, the rollout pauses under {{< ui >}}Needs attention{{< /ui >}}. Open the metric to investigate, then choose:

- **Resume anyway** to continue exposing the candidate.
- **Stop** to end the rollout and restore its eligible traffic to the baseline.

**A pause does not roll back the candidate:** the current traffic split stays in place until you act. Stopping affects only that environment's rollout, not other environments or A/B tests. To start again after stopping, deploy a version again.

{{< img src="llm_observability/monitoring/prompt-guarded-rollout-paused.png" alt="A prompt page showing a Staging rollout under Needs Attention, paused at 25 percent exposure to version 2, with the Checkout Completion Rate metric and Resume Anyway and Stop actions." style="width:100%;" >}}

When the rollout finishes, the candidate receives all traffic eligible for that rollout and disappears from {{< ui >}}Active rollouts{{< /ui >}}. Other targeting rules may still serve different versions.

<div class="alert alert-warning">Guardrails depend on available outcome data. Sparse, missing, or unmatched data may not trigger a pause. Reaching full exposure does not prove that the candidate is better or safe.</div>

## Set up your application

Complete this setup once for either workflow. If your application already sends prompt assignments and matching outcomes, go directly to [A/B testing](#run-an-ab-test) or [Guarded Rollouts](#use-a-guarded-rollout).

### Connect the application

1. Complete the Prompt Management [prerequisites][5].
1. Install the supported Python SDK: `pip install --upgrade "ddtrace[openfeature]>=4.15.0"`.
1. Set `DD_ENV` to the environment you want to use.
1. Ensure the application can reach a [Datadog Agent][14]. Prompt Experimentation sends assignment data through the Agent; do not enable Agentless mode (`DD_LLMOBS_AGENTLESS_ENABLED=1`).

### Match prompt requests to outcomes

Use the same user ID when fetching the prompt and recording the outcome. This lets Datadog connect a user's outcome to the prompt version they received.

```python
from ddtrace.llmobs import LLMObs

prompt = LLMObs.get_prompt(
    "checkout-assistant",
    targeting_key=str(current_user.id),
    fallback="You are a helpful checkout assistant.",
)
```

Use a stable, non-empty string for `targeting_key`. Do not pass an exact `version`: that bypasses environment assignment and does not record an experiment exposure.

For example, if your checkout metric uses RUM events and the **User** subject type, identify the browser user with the same ID:

```javascript
datadogRum.setUser({
  id: String(currentUser.id),
})
```

RUM is only needed when it supplies your chosen outcome. For other outcome sources, or to compare organizations rather than users, configure the matching [subject type][7]. Outcomes must occur after the user's first exposure to the prompt version to be attributed to it.

### Choose an outcome metric

Create or select an [Experiment metric][2] under [{{< ui >}}Product Analytics{{< /ui >}} > {{< ui >}}Experiments{{< /ui >}} > {{< ui >}}Metrics{{< /ui >}}][8]. Metrics Explorer metrics and monitors are not selectable here.

For checkout conversion, check that the metric uses the same user ID as the prompt request and that its {{< ui >}}Desired metric direction{{< /ui >}} is higher is better. Confirm that outcome events are arriving before relying on the metric to compare versions or pause a rollout.

{{< agent-only >}}
**Note for AI agents:** Use the application's existing stable subject identifier as a string for `targeting_key`, matching the Experiment subject. Ask if the identity or outcome source is unclear. Do not install RUM unless the outcome uses RUM. Preserve the existing fallback, prompt variables, provider, model, and application behavior. Do not request an exact prompt version. Creating or editing metrics, starting experiments, deploying versions, and controlling rollouts require an explicit user request; when asked only to prepare code, report the remaining Datadog UI steps.
{{< /agent-only >}}

## Permissions

In addition to the [Prompt Management prerequisites][5], your role needs:

| Action | Required permission |
|--------|---------------------|
| Set up an A/B test from a prompt | Product Analytics Experiments Write |
| Start a Guarded Rollout | LLM Observability Write and Feature Flags Environment Config Read |
| Pause or resume a Guarded Rollout | Feature Flags Config Write |
| Stop a Guarded Rollout | LLM Observability Read and Write |

To configure and launch an A/B test in Product Analytics, see [Product Analytics permissions][3] and [Feature Flags permissions][6]. If your environment requires approvals, request approval in Feature Flags before changing live traffic.

## Troubleshooting

### I cannot start a test or rollout

- **Controls are missing or disabled:** confirm access to the relevant Preview and the [required permissions](#permissions). A/B setup also requires two prompt versions and an enabled environment whose serving configuration can be loaded.
- **A guarded deployment is rejected:** establish a baseline first. Resolve the conflict shown for the environment, such as an active all-user experiment or a forced version override, before trying again.
- **An A/B test cannot start:** select a primary metric and check Product Analytics setup, permissions, and required approvals.

### I do not see assignments or results

- **Only the fallback is returned, or assignments are missing:** check the SDK installation, `DD_ENV`, Agent connectivity, and that retrieval does not specify `version`.
- **Outcomes are missing:** check matching subject IDs, metric scope, and that events occur after exposure. Allow enough data to accumulate; see [Experiment Diagnostics][13].

### I cannot control or inspect a rollout

- **Pause, Resume, or Stop is unavailable:** check the [permissions](#permissions). Stop requires different permissions from Pause and Resume.
- **Status cannot be loaded:** refresh, then check the reported error or contact Datadog Support. An unavailable status does not mean the rollout stopped.

### I am deploying again or to several environments

Review each environment's deployment strategy: saved guarded settings may already be selected. Immediate environments switch without a rollout. Deploying another version can replace an active rollout; review the replacement warning before confirming.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[2]: /experiments/defining_metrics/
[3]: /account_management/rbac/permissions/#product-analytics
[5]: /llm_observability/monitoring/prompt_management/#prerequisites
[6]: /account_management/rbac/permissions/#feature-flags
[7]: /experiments/concepts/subject_types/
[8]: https://app.datadoghq.com/product-analytics/experimentation-metrics
[11]: /experiments/plan_and_launch_experiments/
[12]: /experiments/reading_results/
[13]: /experiments/diagnostics/
[14]: /getting_started/agent/
