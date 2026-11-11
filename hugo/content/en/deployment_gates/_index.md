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
algolia:
  tags: ["cd gates"]
---

A Deployment Gate is an automated checkpoint between your deployment stages. When performing a production rollout, it checks service health from signals Datadog already collects, and pauses the workflow when a required check fails. This prevents errors and other issues from reaching a wider user base.

When a gate fails, the Evaluations page shows the deployed version, the failed rules, and why each rule failed. You can follow the associated traces to start investigating the problem.

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

Rules can watch health indicators over a configurable period ranging from 1 minute to 2 hours.

### Monitor rules

A monitor rule checks the state of one or more [monitors][1] you have already set up in Datadog. The rule fails if a monitor enters an `Alert` or `No Data` status.

### Watchdog Faulty Deployment Detection rules

A [Watchdog Faulty Deployment Detection][2] rule compares the deployed version against previous versions of the same service. The rule fails if the analysis detects new types of errors or a significant increase in error rates.

## Evaluations

An evaluation is a single run of a gate's rules against a specific deployment. Your pipeline requests a gate evaluation, and Datadog immediately returns an evaluation ID. The evaluation eventually resolves to `pass` or `fail`.

Evaluations for both inline and preconfigured gates appear on the [{{< ui >}}Deployment Gates Evaluations{{< /ui >}}][5] page.

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
[5]: https://app.datadoghq.com/ci/deployment-gates/evaluations
[8]: /deployment_gates/setup/inline
[9]: /deployment_gates/setup/preconfigured
