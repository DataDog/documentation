---
title: Deployment Gates
description: "Reduce deployment incidents by evaluating monitors and APM Faulty Deployment Detection during a rollout, so your pipeline can halt releases when regressions are detected."
aliases:
  - /deployment_gates/explore
further_reading:
- link: "/deployment_gates/setup"
  tag: "Documentation"
  text: "Set up Deployment Gates"
- link: "continuous_delivery"
  tag: "Documentation"
  text: "Learn about Continuous Delivery Visibility"
- link: "continuous_delivery/deployments"
  tag: "Documentation"
  text: "Learn how to set up CD Visibility"
algolia:
  tags: ["cd gates"]
---

Deployment Gates allow you to reduce the likelihood and impact of incidents caused by deployments.

When performing a production rollout, you can use Deployment Gates to evaluate the impact of new changes with [monitors][1] and [APM Faulty Deployment Detection][4]. When your gate detects a performance regression, you can automatically halt the release, preventing unstable code from reaching a wider user base. You can then use Deployment Gates as the entry point to investigate the problem.

{{< img src="/deployment_gates/explore/deployment_gates_explorer.png" alt="The Deployment Gate evaluation page in Datadog" style="width:100%" >}}

For setup instructions, see [Set up Deployment Gates][2].

## How Deployment Gates work

A Deployment Gate has two main components:

- **Gate**: A gate, defined for a given service and environment, evaluates one or more rules to decide whether a deployment should proceed.
- **Rule**: A [rule](#rules) checks the status of one or more [monitors][1] or runs [APM Faulty Deployment Detection][4] on the deployed version. The outcome determines whether the associated gate should pass or fail.

Although a gate reports whether a regression is detected, it doesn't stop a deployment on its own. After receiving a gate evaluation result, your deployment pipeline decides what to do next—for example, halting the deployment, performing a rollback, or alerting your team.

### Configuration sources

A gate's configuration source is where the gate is defined: in the evaluation request itself, or in Datadog ahead of time.

- **JIT**: A Just-In-Time (JIT) Deployment Gate is defined in your deployment configuration, such as a JSON configuration file passed to the [`datadog-ci` CLI][5] or the payload of an API call, and sent with each evaluation request. There is no setup in Datadog.
- **Preconfigured**: A preconfigured Deployment Gate is created ahead of time in Datadog, then referenced in an evaluation request.

|  | JIT | Preconfigured |
|---|---|---|
| **Where the gate is defined** | In your deployment configuration or CI step | In Datadog |
| **Setup in Datadog** | None | Create the gate and its rules before the first evaluation |
| **What the evaluation request contains** |  The full gate configuration, including service, environment, and rules | Service, environment, and optionally identifier, which reference the preconfigured gate |
| **Does the gate have an ID?** | No, the gate exists only within each evaluation | Yes, the gate persists between evaluations |
| **Evaluations shown on [Evaluations][6] page?** | Yes | Yes |
| **Best for** | Managing rules as code alongside your pipeline, and teams that own their own gate configuration | Sharing rules across services, managing gates centrally, and editing rules outside of CI |

You can use different configuration sources for different gates. If you're unsure where to start, use JIT gates. They require no setup in Datadog, and you can iterate on rules directly in your deployment configuration.

## Rules

A rule is a check that a Deployment Gate runs to decide whether a deployment can proceed. Each gate contains one or more rules, and all of them must pass for the gate to pass (when the gate and its rules are in [active mode](#evaluation-modes)). When your pipeline requests a gate evaluation, Datadog evaluates each rule against the service, environment, and version being deployed. Each rule resolves to pass or fail, and the gate's result is based on those outcomes. 

Each rule has a [type](#rule-types) and options specific to its type. Rules belong to the gate's [configuration source](#configuration-sources): JIT gates send their rules with each evaluation request, and preconfigured gates keep their rules in Datadog. 

You can set an individual rule's [evaluation mode](#evaluation-modes) to dry run, independently of the gate's evaluation mode. In an active gate, a dry run rule that fails is recorded but doesn't affect the gate's outcome.

### Rule types

Deployment Gates support two rule types:

- [Monitor][1]: Checks the state of one or more [monitors][1] over a configurable period of up to two hours. The rule fails if a monitor enters an `Alert` or `No Data` status during that period. Indicate the monitor(s) to check using a monitor search query or by providing a monitor ID.
- [APM Faulty Deployment Detection][4]: Uses [Watchdog][7] to compare the deployed version against previous versions of the same service. The rule fails if the analysis detects new types of errors or a significant increase in error rates. The analysis runs over a configurable period of up to two hours.

A gate can have one or more rules, including any combination of monitor and APM Faulty Deployment Detection rules.

## Evaluations

An evaluation is a single run of a gate's rules against a specific deployment. Evaluations are asynchronous—your pipeline triggers an evaluation, then checks back for the result while the rules run in the background.

1. **Your pipeline requests a gate evaluation.** The request identifies the service, environment, and version being deployed. For a [JIT](#configuration-sources) gate, the request also contains the gate's rules. For a [preconfigured](#configuration-sources) gate, Datadog uses the service, environment, and optional identifier to find the gate. The version is required if the gate has an APM Faulty Deployment Detection rule.
2. **Datadog starts the evaluation.** The API immediately returns an evaluation ID, and each rule runs for its configured duration.
3. **Your pipeline polls for the result.** Your pipeline uses the evaluation ID to check the evaluation's status, which stays `in_progress` while the rules run. The [`datadog-ci` CLI][5] and the [GitHub Action][8] handle polling for you: they wait until the evaluation completes or a configurable timeout is reached.
4. **The evaluation resolves to `pass` or `fail`.** The gate passes if all of its active rules pass, and fails if any active rule fails. Your pipeline then decides how to proceed based on the result.

Each evaluation and its per-rule results, including the reason a rule failed, are recorded on the [Deployment Gates Evaluations][6] page. Here, you can also identify frequently failing rules and gates and track patterns over time.

### Evaluation modes

Gates and rules each have an evaluation mode, which determines whether their results affect your deployment:

- **Active**: The result counts. An active gate returns its actual result (`pass` or `fail`) to your pipeline, and an active rule's result counts toward the gate's result.
- **Dry run**: The result is recorded on the [Evaluations][6] page, but doesn't affect your deployment. A dry run gate always returns `pass` to your pipeline, and a dry run rule's result is excluded from the gate's result.

Dry run lets you see how a gate or rule behaves against real deployments before it can block one, which is useful when onboarding or adding a new rule. When the results match what you expect, switch to active.

For JIT gates, set the evaluation mode with the `dry_run` field in the evaluation request (`dryRun` in `datadog-ci` configuration files). For preconfigured gates, use the {{< ui >}}Evaluation Mode{{< /ui >}} setting on the gate or rule.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /monitors/
[2]: /deployment_gates/setup
[4]: /watchdog/faulty_deployment_detection/
[5]: https://github.com/DataDog/datadog-ci/tree/master/packages/plugin-deployment#gate
[6]: https://app.datadoghq.com/ci/deployment-gates/evaluations
[7]: /watchdog
[8]: https://github.com/DataDog/deployment-gate-github-action
