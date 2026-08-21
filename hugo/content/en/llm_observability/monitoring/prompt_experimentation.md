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

## Prerequisites

Before using Prompt Experimentation:

<!-- TODO: Replace MINIMUM_DDTRACE_VERSION with the first release containing the Prompt Manager configuration-source activation fix. -->

- Complete the Prompt Management [prerequisites][5], create at least two versions of a managed prompt, and deploy the current version to an environment.
- Install `ddtrace[openfeature]` version `MINIMUM_DDTRACE_VERSION` or later: `pip install --upgrade "ddtrace[openfeature]>=MINIMUM_DDTRACE_VERSION"`.
- Set `DD_ENV` to the environment where the current prompt version is deployed.
- Choose either [Agent Remote Configuration or Agentless configuration delivery][4] for Feature Flags. `LLMObs.get_prompt()` handles prompt evaluation; you do not need to create an OpenFeature client.
- [Install and run a Datadog Agent][14] that your application can reach. The Agent sends prompt-version assignment data with either Feature Flags configuration delivery option. LLM Observability Agentless mode (`DD_LLMOBS_AGENTLESS_ENABLED=1`) does not support Prompt Experimentation.
- Choose a stable, non-empty string identifier for the experiment subject and create or identify a compatible [Experiment metric][2].
- Confirm that your Datadog user role has the required [Product Analytics][3] and [Feature Flags][6] permissions.

{{< agent-only >}}
**Note for AI agents:** Prompt Experimentation supports Python managed-prompt retrieval. Use the minimum SDK version listed above and preserve the application's existing Feature Flags configuration delivery option. Do not create or register an OpenFeature client; `LLMObs.get_prompt()` manages prompt evaluation. Keep a reachable Datadog Agent, and do not enable `DD_LLMOBS_AGENTLESS_ENABLED`.
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

Retrieve the prompt before recording its outcome. Do not request an exact prompt `version`; exact-version retrieval bypasses environment assignment and does not produce experiment assignment data.

{{< agent-only >}}
**Note for AI agents:** Use the application's existing stable subject identifier as a string for `targeting_key`, and use the same value for the Experiment subject. If the identity or outcome source is unclear, ask the user instead of inventing one. Do not install RUM unless the selected outcome uses RUM. Do not request an exact prompt version. Preserve the existing fallback, prompt variables, provider, model, and application behavior.
{{< /agent-only >}}

### Choose an Experiment metric

Select a compatible **Datadog Experiment metric** available in the workflow's metric selector. These are not generic Datadog metrics or monitors.

To create or edit a metric, navigate to [{{< ui >}}Product Analytics{{< /ui >}} > {{< ui >}}Experiments{{< /ui >}} > {{< ui >}}Metrics{{< /ui >}}][8]. See [Create Experiment Metrics][2] for instructions.

When configuring a metric:

- Select an event that represents the intended outcome and scope it to the relevant application or service.
- Select the subject type whose attribute matches the prompt `targeting_key`.
- Set whether an increase or decrease is the desired change. Guarded Rollouts use this direction to identify regression.

If an existing Experiment metric measures the intended outcome, reuse it. Otherwise, follow [Create Experiment Metrics][2] to configure a supported data source. For browser or mobile outcomes collected with RUM, follow the [RUM setup][9] for your platform and [enable Product Analytics][10].

An A/B test cannot start without a primary metric. A Guarded Rollout uses one selected metric for each prompt environment. Changing or removing that selection affects future deployments; it does not alter an active rollout.

{{< agent-only >}}
**Note for AI agents:** Do not create or edit Experiment metrics, start or end experiments, deploy prompt versions, or control Guarded Rollouts unless the user explicitly requests those external changes. When asked only to prepare application code, implement the local integration and report the remaining Datadog UI steps.
{{< /agent-only >}}

## Run an A/B test

1. Open a managed prompt and click {{< ui >}}Run A/B test{{< /ui >}}.
1. Select the environment in which to run the test.
1. Continue to the Product Analytics experiment setup. Datadog carries the prompt and environment into the setup, and its versions are available as experiment variants.
1. Select the experiment subject and primary metric.
1. Configure the audience, traffic split, exposure, and optional duration.
1. Start the experiment.
1. Confirm that assignments appear on the {{< ui >}}Flag & Exposures{{< /ui >}} page before analyzing the results.

Use Product Analytics to start, monitor, conclude, or cancel the experiment. An experiment result does not change prompt serving on its own. To make a selected version the environment default, return to the prompt and deploy that version.

For details about configuration and analysis, see [Plan and Launch Experiments][11] and [Read Experiment Results][12].

<!-- TODO: Add a public-safe Product Analytics setup screenshot with the prompt and environment preselected and its versions available as variants. -->

## Use a Guarded Rollout

1. Open the candidate prompt version and click {{< ui >}}Set Environments{{< /ui >}}.
1. For each environment that should use progressive exposure, select {{< ui >}}Guarded rollout{{< /ui >}}.
1. Select the Experiment metric to monitor for regressions.
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
| Prompt Experimentation controls are unavailable | Confirm that the prompt has at least two versions and a deployed environment, and that your user role has the required permissions. If the controls are still unavailable, contact Datadog Support. |
| The prompt always returns its fallback, or the experiment receives no assignment data | Confirm the supported `ddtrace` version and `ddtrace[openfeature]` installation, `DD_ENV`, configuration source, Agent connectivity, and that the retrieval does not specify an exact `version`. |
| The A/B test cannot start | Select a primary metric, then review the Product Analytics and Feature Flags permissions and any required approvals. |
| The experiment has no results, or the selected Guarded metric has no usable data | Confirm that prompt retrieval and outcome events use the same subject identifier, outcomes occur after retrieval, the metric has the correct scope, and enough data has been collected. Review [Experiment Diagnostics][13]. |
| Pause or resume is denied | Confirm the user's Feature Flags permissions and any applicable approval requirements. |

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /llm_observability/monitoring/prompt_management/
[2]: /experiments/defining_metrics/
[3]: /account_management/rbac/permissions/#product-analytics
[4]: /feature_flags/concepts/configuration_sources/
[5]: /llm_observability/monitoring/prompt_management/#prerequisites
[6]: /account_management/rbac/permissions/#feature-flags
[7]: /experiments/concepts/subject_types/
[8]: https://app.datadoghq.com/product-analytics/experimentation-metrics
[9]: /real_user_monitoring/#get-started
[10]: /product_analytics/#enable-product-analytics
[11]: /experiments/plan_and_launch_experiments/
[12]: /experiments/reading_results/
[13]: /experiments/diagnostics/
[14]: /getting_started/agent/
