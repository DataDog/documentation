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

<div class="alert alert-info"><strong>Preview:</strong> Prompt Experimentation is available in Preview. To request access, contact <a href="https://www.datadoghq.com/support/">Datadog Support</a> or your Customer Success Manager. Access to A/B testing and Guarded Rollouts is available separately; you do not need access to Guarded Rollouts to run an A/B test.</div>

| Workflow | Use it to |
|----------|-----------|
| A/B test | Compare prompt versions and measure their effect on an outcome. |
| Guarded Rollout | Deploy a version progressively and pause if Datadog detects a regression in the selected metric. |

## Before you begin

Before using Prompt Experimentation:

- Complete the Prompt Management [prerequisites][5].
- Install `ddtrace[openfeature]` version `4.15.0` or later: `pip install --upgrade "ddtrace[openfeature]>=4.15.0"`.
- Set `DD_ENV` to the environment where you want to experiment.
- [Install and run a Datadog Agent][14] that your application can reach. Prompt Experimentation sends prompt-version assignment data through the Agent and does not support LLM Observability Agentless mode (`DD_LLMOBS_AGENTLESS_ENABLED=1`).
- Confirm that your Datadog user role has the permissions for the actions you want to perform. See [Permissions](#permissions).

### Permissions

Access to a feature does not grant permission to change its configuration. In addition to the Prompt Management prerequisites, check the permissions for your workflow:

| Action | Required permission |
|--------|---------------------|
| Create an A/B test draft from a prompt | Product Analytics **Experiments Write** (`product_analytics_experiments_write`). Configuring and starting the test also requires the applicable Product Analytics and Feature Flags permissions. |
| Deploy a prompt through the guarded-deployment workflow | LLM Observability Write (`llm_observability_write`); the deployment UI also requires Feature Flags Environment Config Read (`feature_flag_environment_config_read`). |
| Pause or resume a Guarded Rollout | Feature Flags Config Write (`feature_flag_config_write`). |
| Stop a Guarded Rollout and restore its baseline | LLM Observability Read and Write (`llm_observability_read`, `llm_observability_write`). This action does not require Feature Flags write permission. |

See [Product Analytics permissions][3] and [Feature Flags permissions][6]. Environments that require approval may need additional serving changes to be approved in Feature Flags before you can proceed.

{{< agent-only >}}
**Note for AI agents:** Prompt Experimentation supports Python managed-prompt retrieval. Use the minimum SDK version listed above, keep a reachable Datadog Agent, and do not enable `DD_LLMOBS_AGENTLESS_ENABLED`.
{{< /agent-only >}}

## Connect prompt versions to outcomes

Prompt Experimentation compares outcomes by subject. Use the same stable, non-empty string identifier when retrieving the prompt and recording outcome events:

```python
from ddtrace.llmobs import LLMObs

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

1. Open a managed prompt and click {{< ui >}}Set up A/B test{{< /ui >}}.
1. Select the environment in which to run the test.
1. Click {{< ui >}}Create draft & continue{{< /ui >}}. Datadog creates a draft and opens the Product Analytics experiment setup with the prompt and environment associated. Creating the draft does not start the test or change serving.
1. Under {{< ui >}}Calculate metrics by{{< /ui >}}, select the subject type that matches the prompt `targeting_key`, then choose the {{< ui >}}Primary metric{{< /ui >}}.
1. Choose the prompt versions to compare, then configure the audience, traffic split, exposure, and optional duration.
1. Start the experiment.
1. Confirm that assignments appear on the {{< ui >}}Flag & Exposures{{< /ui >}} page before analyzing the results.

<!-- SCREENSHOT TODO — A/B test setup: capture the prompt's "Set up an A/B test" modal with a selected environment and "Create draft & continue". Use a public-safe checkout-assistant prompt. -->

Expand {{< ui >}}A/B tests using this prompt{{< /ui >}} on the prompt page to see linked tests, their status, variants, and primary metric. For a draft, use {{< ui >}}Finish setup{{< /ui >}} to continue configuration. Open a test by its name to inspect it in Product Analytics.

Use Product Analytics to start, monitor, conclude, or cancel the experiment. An experiment result does not change prompt serving on its own. To make a selected version the environment default, return to the prompt and deploy that version. Users outside the test's audience continue to follow the environment's other serving rules.

For details about configuration and analysis, see [Plan and Launch Experiments][11] and [Read Experiment Results][12].

<!-- SCREENSHOT TODO — Product Analytics setup: show the associated checkout-assistant prompt, selected environment, version variants, and primary metric. Exclude internal IDs and customer data. -->

## Use a Guarded Rollout

Use a Guarded Rollout when you want to introduce a new version gradually while monitoring an outcome, such as checkout conversion. The environment's existing serving version is the **baseline**; the version you deploy is the **candidate**.

If the prompt has not been deployed to the environment, deploy a version immediately first to establish a baseline. You can then deploy a different version with a Guarded Rollout.

1. Open the candidate prompt version and click {{< ui >}}Deploy Version{{< /ui >}}.
1. Select the environments in {{< ui >}}Deploy to{{< /ui >}} and review the proposed updates.
1. Expand {{< ui >}}Deployment strategy{{< /ui >}}. For each environment, choose {{< ui >}}Deploy immediately{{< /ui >}} or {{< ui >}}Guarded rollout{{< /ui >}}. Review the selection even if you have deployed here before: saved guarded settings may already be selected.
1. For each guarded environment, select a {{< ui >}}Guardrail metric{{< /ui >}}. Use {{< ui >}}Inspect metric{{< /ui >}} to open its definition in a new tab. Confirm that the direction shown below the selector matches the outcome you want to protect.
1. Click the {{< ui >}}Deploy Version{{< /ui >}} confirmation button. Guarded environments start progressive exposure; immediate environments switch without a rollout.

<!-- SCREENSHOT TODO — Deployment strategy: show the expanded deployment modal, one immediate environment and one guarded environment, a selected checkout conversion metric, "Inspect metric", and the confirmation button. -->

### Monitor and control the rollout

Expand {{< ui >}}Active rollouts{{< /ui >}} on the prompt page. Its tabs separate rollouts that need attention, manually paused rollouts, and rolling rollouts. Each row shows the environment, baseline and candidate versions, candidate exposure, and guardrail metric. Open the metric to inspect its definition.

Exposure grows automatically while the rollout is running. Controls act on one environment at a time:

- **Pause** freezes exposure at its current share.
- **Resume** continues the exposure schedule.
- **Stop** ends the rollout and restores eligible traffic to the baseline after confirmation. Other environments and A/B tests are unaffected. Starting again requires a new deployment.

If Datadog detects a regression in the selected metric, the rollout moves to {{< ui >}}Needs attention{{< /ui >}} and pauses. The current traffic split remains in place: a Guarded Rollout does **not** automatically roll back the candidate. Investigate the metric before choosing {{< ui >}}Resume anyway{{< /ui >}}, or choose {{< ui >}}Stop{{< /ui >}} to restore the baseline. Deploying another version can replace an existing rollout; review the replacement warning before confirming.

If the rollout reaches its final step without pausing, the candidate reaches full exposure for traffic eligible for the rollout and no longer appears in {{< ui >}}Active rollouts{{< /ui >}}. Other targeting rules may still serve different versions to their audiences.

<!-- SCREENSHOT TODO — Guardrail pause: show "Active rollouts" on the "Needs attention" tab with a public-safe environment, version exposure, named metric, pause timestamp, "Resume anyway", and "Stop". Do not show the backend-created experiment or internal test-drive banners. -->

<div class="alert alert-warning">Guarded Rollouts can continue when outcome data is sparse, missing, or cannot be matched to prompt assignments. Reaching full exposure means Datadog did not detect a regression in the available data. It does not prove that the candidate improved or is safe.</div>

## Verify and troubleshoot

| Symptom | Check |
|---------|-------|
| A/B testing or Guarded Rollout controls are missing | Confirm that the relevant Preview is enabled for your organization. The two features may be available independently. |
| A/B setup is disabled | Confirm that the managed prompt has at least two versions, is enabled in an environment, and that serving configuration can be loaded. Check your permissions and any required environment approvals. |
| Guarded deployment is unavailable or rejected | Establish a baseline with an immediate deployment first. Review any conflict reported for the selected environment, such as an active experiment serving all users or a forced version override. Resolve that conflict before trying again. |
| The prompt always returns its fallback, or the experiment receives no assignment data | Confirm the supported `ddtrace` version and `ddtrace[openfeature]` installation, `DD_ENV`, Agent connectivity, and that the retrieval does not specify an exact `version`. |
| The A/B test cannot start | Select a primary metric, then review the Product Analytics and Feature Flags permissions and any required approvals. |
| The experiment has no results, or the selected Guarded metric has no usable data | Confirm that prompt exposures and metric events use the same subject identifier, metric events occur after the first exposure, the metric has the correct scope, and enough data has been collected. Review [Experiment Diagnostics][13]. |
| Pause or resume is denied | Confirm the user's Feature Flags permissions and any applicable approval requirements. |
| Stop is unavailable or denied | Confirm that the user has LLM Observability Read and Write permissions. Stop uses different permissions from Pause and Resume. |
| Rollout status is unavailable | Refresh the status. If the error persists, check permissions and the reported serving-state conflict or contact Datadog Support. Do not assume the rollout stopped because its status cannot be loaded. |

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
