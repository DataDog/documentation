---
title: Deployment Gates
description: "Reduce deployment incidents by evaluating monitors and Watchdog Faulty Deployment Detection during a rollout, so your pipeline can halt releases when regressions are detected."
aliases:
  - /deployment_gates/explore
further_reading:
- link: "/deployment_gates/setup"
  tag: "Documentation"
  text: "Set up Deployment Gates"
- link: "https://www.datadoghq.com/blog/deployment-gates/"
  tag: "Blog"
  text: "Catch incidents and pause faulty deployments automatically with Deployment Gates"
- link: "continuous_delivery"
  tag: "Documentation"
  text: "Learn about Continuous Delivery Visibility"
- link: "continuous_delivery/deployments"
  tag: "Documentation"
  text: "Learn how to set up CD Visibility"
- link: "https://www.datadoghq.com/blog/deployment-gates/"
  tag: "Blog"
  text: "Catch incidents and pause faulty deployments automatically with Datadog Deployment Gates"
algolia:
  tags: ["cd gates"]
---

A Deployment Gate is an automated checkpoint between your deployment stages. During a production rollout, the gate checks service health using signals Datadog already collects. When a [rule](#rules) fails, the gate returns a failing verdict so your pipeline can pause the rollout. This helps keep errors and other issues from reaching a wider user base.

When a gate fails, the [{{< ui >}}Evaluations{{< /ui >}}][5] page shows the deployed version, the failed rules, and why each rule failed. You can follow the associated traces to start investigating the problem.

{{< img src="/deployment_gates/evaluations_rule_failure.png" alt="The Deployment Gates Evaluations page with a side panel showing a failed monitor rule evaluation." style="width:100%" >}}

For setup instructions, see [Set up Deployment Gates][3].

## How Deployment Gates work

A Deployment Gate evaluates one or more [rules](#rules) to decide whether a deployment should proceed. It is defined for a given service and environment.

After receiving a gate [evaluation](#evaluations) verdict, your deployment pipeline decides what to do next—for example, halting the deployment or performing a rollback.

### Where gate configurations are stored

A Deployment Gate configuration can be:

- **Inline**: The gate is defined in code alongside your deployment configuration. The gate configuration is sent with each evaluation request. There is no setup in Datadog.
  - To create an inline gate, see [Set Up Inline Deployment Gates][8].
- **Preconfigured**: The gate is created and stored in Datadog.
  - To create a preconfigured gate, see [Set Up Preconfigured Deployment Gates][9].

## Rules

There are two types of rules: [monitor rules](#monitor-rules) and [Watchdog Faulty Deployment Detection rules](#watchdog-faulty-deployment-detection-rules). A single gate can combine multiple rules of different types.

Each rule watches health indicators for a configurable evaluation period of up to 2 hours.

To configure each rule type, see the Rules sections of [Set Up Inline Deployment Gates][10] and [Set Up Preconfigured Deployment Gates][11].

### Monitor rules

A monitor rule checks the state of one or more [monitors][1] you have already set up in Datadog. Select monitors with either a [search query](#monitor-search-queries) or a list of specific monitors.

A monitor rule fails if any monitor it evaluates is in `ALERT` or `NO_DATA` state at any time during the evaluation period. It also fails if there's nothing to evaluate (for example, the query matches no monitors, or every matching monitor is muted), a specific monitor ID doesn't exist in your organization, or the rule includes more than 300 monitors.

{{% collapse-content title="Monitor search queries" level="h4" id="monitor-search-queries" %}}
Monitor search queries use the [Search Monitor syntax][4]. You can filter on static tags (`service:transaction-backend`), tags in the monitor's query (`scope:"service:transaction-backend"`), or [monitor grouping][6] tags (`group:"service:transaction-backend"`).

<div class="alert alert-info">Static tag filters (such as <code>env</code> or <code>team</code>) and <code>scope</code> filters select which monitors to evaluate, including all of their groups. A <code>group</code> filter also limits evaluation to the matching groups in each monitor, so alerts on other groups don't fail the rule.</div>

Example queries:

- `env:prod service:transaction-backend`
- `env:prod (service:transaction-backend OR group:"service:transaction-backend" OR scope:"service:transaction-backend")`
- `tag:"use_deployment_gates" team:payment`
- `tag:"use_deployment_gates" AND (NOT group:("team:frontend"))`
{{% /collapse-content %}}

<br>

### Watchdog Faulty Deployment Detection rules

A [Watchdog Faulty Deployment Detection][2] (FDD) rule compares the deployed version against previous versions of the same service. The rule fails if the analysis detects new types of errors or significant increases in error rates on any [resource][7].

FDD rules support APM-instrumented services that set the `version` tag through [Unified Service Tagging][13]. Services marked as `database` or `inferred service` are not supported. To scope the analysis, you can list resources to include or to exclude (such as low-priority endpoints).

The rule runs a separate analysis for each [additional primary tag][12] value, plus an aggregate analysis. To analyze only one primary tag value, specify it as `primary_tag` in the evaluation request attributes.

## Evaluations

An evaluation is a single run of a gate's rules against a specific deployment. Your pipeline requests a gate evaluation, and Datadog immediately returns an evaluation ID. The evaluation eventually resolves to `pass` or `fail`.

Evaluations for both inline and preconfigured gates appear on the [{{< ui >}}Evaluations{{< /ui >}}][5] page.

### Evaluation modes

There are two evaluation modes: [dry run](#dry-run-mode) and [active](#active-mode). You can set the evaluation mode separately on each gate and each rule. The mode determines whether their verdicts affect your deployment.

#### Dry run mode

Use dry run to see which deployments would pause and why, while deployments continue as usual.

The verdict of a gate in dry run mode is recorded on [{{< ui >}}Evaluations{{< /ui >}}][5] but doesn't affect your deployment. That is, a dry run gate always returns `pass` to your pipeline. A dry-run rule's verdict doesn't count toward its associated gate's verdict.

#### Active mode

Use active mode when you're ready for your workflow to pause when a required check fails.

An active gate returns its true verdict (`pass` or `fail`) to your pipeline. An active rule's verdict counts toward the associated gate's verdict.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /monitors/
[2]: /watchdog/faulty_deployment_detection/
[3]: /deployment_gates/setup
[4]: /monitors/manage/search/
[5]: https://app.datadoghq.com/ci/deployment-gates/evaluations
[6]: /monitors/manage/#triggered-monitors
[7]: /tracing/services/resource_page/
[8]: /deployment_gates/setup/inline
[9]: /deployment_gates/setup/preconfigured
[10]: /deployment_gates/setup/inline/#rules
[11]: /deployment_gates/setup/preconfigured/#rules
[12]: /tracing/guide/setting_primary_tags_to_scope/?tab=helm#add-additional-primary-tags-in-datadog
[13]: /getting_started/tagging/unified_service_tagging/
