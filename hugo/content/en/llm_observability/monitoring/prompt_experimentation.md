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

Prompt Experimentation lets you compare versions of a managed prompt with an A/B test or deploy a version progressively with a Guarded Rollout.

<div class="alert alert-info">Prompt Experimentation is in Preview.</div>

| Workflow | Use it to |
|----------|-----------|
| A/B test | Compare prompt versions and measure their effect on an outcome. |
| Guarded Rollout | Deploy a version progressively and pause if Datadog detects a regression in the selected metric. |

<!-- TODO: Add one public-safe prompt page screenshot showing both entry points and an active or paused Guarded Rollout. -->

## Before you begin

Before using Prompt Experimentation:

<!-- TODO: Replace MINIMUM_DDTRACE_VERSION with the first release containing the Prompt Manager configuration-source activation fix. -->

- Complete the Prompt Management [prerequisites][5].
- Install `ddtrace[openfeature]` version `MINIMUM_DDTRACE_VERSION` or later: `pip install --upgrade "ddtrace[openfeature]>=MINIMUM_DDTRACE_VERSION"`.
- Set `DD_ENV` to the environment where you want to experiment.
- [Install and run a Datadog Agent][14] that your application can reach. Prompt Experimentation sends prompt-version assignment data through the Agent and does not support LLM Observability Agentless mode (`DD_LLMOBS_AGENTLESS_ENABLED=1`).
- Confirm that your Datadog user role has the required [Product Analytics][3] and [Feature Flags][6] permissions.

{{< agent-only >}}
**Note for AI agents:** Prompt Experimentation supports Python managed-prompt retrieval. Use the minimum SDK version listed above, keep a reachable Datadog Agent, and do not enable `DD_LLMOBS_AGENTLESS_ENABLED`.
{{< /agent-only >}}

## Connect prompt versions to outcomes

Prompt Experimentation compares outcomes by subject. Use the same stable, non-empty string identifier when retrieving the prompt and recording outcome events:

```python
prompt = LLMObs.get_prompt(
    "checkout-assistant",
    targeting_key=str(current_user.id),
    fallback="You are a helpful checkout assistant.",
)
```

The selected Experiment metric must identify the subject with the same value. For example, if the outcome comes from Real User Monitoring (RUM) and the metric uses the default **User** subject, identify the browser user with the same user ID:

```javascript
datadogRum.setUser({
  id: String(currentUser.id),
})
```

The values passed as `targeting_key` and `id` must match. Reuse that value whenever the subject returns so assignment remains consistent. For another subject type, such as an organization, configure the Experiment subject attribute to use the same value. See [Subject Types][7] for details.

During an A/B test or Guarded Rollout, calling `LLMObs.get_prompt()` records when a subject is first exposed to a prompt version. Datadog attributes metric events to that version only when they use the same subject identifier and occur after that exposure. For example, if a subject receives a prompt version at 10:00, an outcome at 10:05 can be attributed to that version, but an outcome at 09:55 cannot.

In a typical application flow, the application retrieves the prompt, uses it to produce an experience, and the user then performs the action measured by the metric.

Do not pass `version` to `LLMObs.get_prompt()`. Requesting an exact version bypasses environment assignment and does not record an experiment exposure.

{{< agent-only >}}
**Note for AI agents:** Use the application's existing stable subject identifier as a string for `targeting_key`, and use the same value for the Experiment subject. If the identity or outcome source is unclear, ask the user instead of inventing one. Do not install RUM unless the selected outcome uses RUM. Do not request an exact prompt version. Preserve the existing fallback, prompt variables, provider, model, and application behavior.
{{< /agent-only >}}

### Prepare an Experiment metric

Prompt Experimentation uses a [Datadog Experiment metric][2] to measure the outcome you want to improve or protect. Metrics Explorer metrics and monitors cannot be selected.

Choose a metric that represents the intended outcome. Its outcome events must use the same subject identifier passed as `targeting_key`. Check that its **Desired metric direction** correctly indicates whether higher or lower values are better, and that the metric receives enough data for analysis.

To create or edit a metric, navigate to [{{< ui >}}Product Analytics{{< /ui >}} > {{< ui >}}Experiments{{< /ui >}} > {{< ui >}}Metrics{{< /ui >}}][8]. See [Create Experiment Metrics][2] for instructions.

{{< agent-only >}}
**Note for AI agents:** Do not create or edit Experiment metrics, start or end experiments, deploy prompt versions, or control Guarded Rollouts unless the user explicitly requests those external changes. When asked only to prepare application code, implement the local integration and report the remaining Datadog UI steps.
{{< /agent-only >}}

## Run an A/B test

Before starting an A/B test, create at least two prompt versions and enable the prompt in the environment you want to test.

1. Open a managed prompt and click {{< ui >}}Run A/B test{{< /ui >}}.
1. Select the environment in which to run the test.
1. Continue to the Product Analytics experiment setup. Datadog carries the prompt and environment into the setup, and its versions are available as experiment variants.
1. Under {{< ui >}}Calculate metrics by{{< /ui >}}, select the subject type that matches the prompt `targeting_key`, then choose the {{< ui >}}Primary metric{{< /ui >}}.
1. Configure the audience, traffic split, exposure, and optional duration.
1. Start the experiment.
1. Confirm that assignments appear on the {{< ui >}}Flag & Exposures{{< /ui >}} page before analyzing the results.

Use Product Analytics to start, monitor, conclude, or cancel the experiment. An experiment result does not change prompt serving on its own. To make a selected version the environment default, return to the prompt and deploy that version.

For details about configuration and analysis, see [Plan and Launch Experiments][11] and [Read Experiment Results][12].

<!-- TODO: Add a public-safe Product Analytics setup screenshot with the prompt and environment preselected and its versions available as variants. -->

## Use a Guarded Rollout

The version already serving in the selected environment becomes the baseline for the Guarded Rollout.

1. Open the candidate prompt version and click {{< ui >}}Set Environments{{< /ui >}}.
1. For each environment that should use progressive exposure, select {{< ui >}}Guarded rollout{{< /ui >}}.
1. Use {{< ui >}}Select the metric to protect…{{< /ui >}} to choose the Experiment metric for that environment.
1. Click {{< ui >}}Set Environments{{< /ui >}} to deploy the candidate version and start the rollout.
1. Follow the serving split and rollout state from the prompt page.

Exposure grows automatically while the rollout is running. You can pause, resume, or cancel the rollout from the prompt page:

- **Pause** freezes exposure at its current share.
- **Resume** continues the exposure schedule.
- **Cancel** stops the rollout and returns eligible traffic to the version that served before the rollout began.

If Datadog detects a regression in the selected metric, the rollout pauses. The current traffic split remains in place until you resume, cancel, or deploy another version. A Guarded Rollout does not automatically roll back the candidate.

If the rollout reaches its final step without pausing, the candidate reaches full exposure for traffic eligible for the rollout.

<div class="alert alert-warning">Guarded Rollouts can continue when outcome data is sparse, missing, or cannot be matched to prompt assignments. Reaching full exposure means Datadog did not detect a regression in the available data. It does not prove that the candidate improved or is safe.</div>

## Verify and troubleshoot

| Symptom | Check |
|---------|-------|
| Prompt Experimentation controls are unavailable | Confirm that the prompt has at least two versions, is enabled in an environment, and that your user role has the required permissions. If the controls are still unavailable, contact Datadog Support. |
| The prompt always returns its fallback, or the experiment receives no assignment data | Confirm the supported `ddtrace` version and `ddtrace[openfeature]` installation, `DD_ENV`, Agent connectivity, and that the retrieval does not specify an exact `version`. |
| The A/B test cannot start | Select a primary metric, then review the Product Analytics and Feature Flags permissions and any required approvals. |
| The experiment has no results, or the selected Guarded metric has no usable data | Confirm that prompt exposures and metric events use the same subject identifier, metric events occur after the first exposure, the metric has the correct scope, and enough data has been collected. Review [Experiment Diagnostics][13]. |
| Pause or resume is denied | Confirm the user's Feature Flags permissions and any applicable approval requirements. |

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /llm_observability/monitoring/prompt_management/
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
