---
title: Set up PR Gate Rules
description: Learn how to set up PR Gate rules in Datadog.
aliases:
   - /quality_gates/setup/
further_reading:
- link: "/pr_gates"
  tag: "Documentation"
  text: "Learn about PR Gates"
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">PR Gates is not available in the selected site ({{< region-param key="dd_site_name" >}}) at this time.</div>
{{< /site-region >}}

## Overview

To use Datadog PR Gates, you can define one or more rules on the [**PR Gate Rules**][1] page and integrate them in your CI pipeline with the [`datadog-ci gate evaluate` command][2].

{{< img src="pr_gates/rules_list_3.png" alt="PR Gates page in Datadog" style="width:100%" >}}

PR Gates ensure that only the code that meets your quality standards is deployed, automating your quality assurance processes and enhancing software reliability.

## Create a rule

To create a PR Gates rule in Datadog:

1. Navigate to [**Software Delivery** > **PR Gates** > **PR Gate Rules**][1] and click **New Rule**.

1. Under **Select your source**, select a rule type:
   - Static Code Analysis
   - Software Composition Analysis
   - Code Coverage
   - Infrastructure as Code Scanning

1. Under **Define condition**, set the conditions that will cause the rule to fail, which also fails the related pipeline. Each rule type has its own condition options, and you can use the existing default condition settings when you select a rule type.

1. Under **Define scope**, set which repositories the rule should evaluate:
   - **All repositories**: The rule evaluates all repositories configured for the rule type.
   - **Selected repositories**: The rule evaluates only the repositories you specify. Use `IN` to include only specified repositories, or `NOT IN` to evaluate all configured repositories _except_ the ones you specify.

   The following example illustrates a Static Code Analysis rule that fails when a pull request introduces at least one Static Code Analysis code vulnerability violation with at least `Critical` severity. The rule evaluates all repositories configured for Static Code Analysis:

   {{< img src="pr_gates/setup/static_analysis_3.png" alt="A Static Analysis rule that runs on all repos and fails when a PR has at least one Static Code Analysis code vulnerability with at least `Critical` severity" style="width:100%" >}}

1. Under **Preview checks**, select your CI provider to preview the [status check](#enable-ci-status-checks) to be added to pull requests. To set the check so it blocks the pipeline when it fails, follow your provider's instructions for making a status check _required_:

   - [GitHub][3]
   - [Azure DevOps][4]

   Non-blocking rules can be helpful when you roll out a new rule and want to verify its behavior before making it blocking.

1. Click **Create Rule**.

### Integrate PR Gates in your CI/CD pipeline

Invoke the PR Gates evaluation by calling the [`datadog-ci gate evaluate`][2] command. PR Gates requires [`datadog-ci`][5] version `2.27.0` or later.

<div class="alert alert-info">For the command to work properly, ensure that events (for example, static analysis, software composition analysis violations, or tests) are sent to Datadog <strong>before</strong> the <code>datadog-ci gate evaluate</code> command executes. Otherwise, the rules may demonstrate incorrect behavior due to the absence of these events.
</div>

This command does the following:

1. Retrieves all the rules that have [rule scopes and custom scopes][6] that match the current pipeline context (the repository, branch, or custom scopes passed in the command).
2. Evaluates all the matching rules.
3. Fails if one or more blocking rules fail, blocking the pipeline.

| Environment Variables | Description |
|---|---|
| `DD_API_KEY` | Point to your [Datadog API key][7]. |
| `DD_APP_KEY` | Point to your [Datadog application key][8]. The application key must have the `PR Gates Evaluations` permission enabled.|
| `DD_SITE` | (Optional) Point to a specific [Datadog site][9] (default value is {{< region-param key="dd_site" code="true" >}}).<br/>**Note**: `DATADOG_SITE` is not supported. |

For example:

```shell
DD_SITE={{< region-param key="dd_site" >}} DD_API_KEY=<YOUR_API_KEY> DD_APP_KEY=<YOUR_APP_KEY> datadog-ci gate evaluate
```

Configure the behavior of the `datadog-ci gate evaluate` command using the following flags:

`--fail-on-empty`
: The command fails if no matching rules are found based on the current pipeline context. By default, the command succeeds.

`--fail-if-unavailable`
: The command fails if one or more rules cannot be evaluated because of an internal issue.
By default, the command succeeds.

`--timeout`
: The command stops its execution after the specified timeout in seconds. The default timeout is 10 minutes. The command typically completes within a few minutes, but it could take longer.

`--no-wait`
: Skips the default time that the command waits for the events (for example, static analysis violations or tests) to arrive to Datadog. The default wait time makes sure that the events are queryable in Datadog before the rules are executed, avoiding incorrect evaluations. If, in your pipeline, the job containing the `datadog-ci gate evaluate` command is called several minutes after the related events are sent to Datadog, you can opt to skip this waiting time by specifying the `--no-wait` flag. However, if used incorrectly, this flag may result in inaccurate rule evaluations.

Add [custom scopes][6] to the command by using the `--scope` option one or more times:

```shell
datadog-ci gate evaluate --scope team:backend --scope team:frontend
```

Check the command logs to see the overall gate evaluation status and information about the rules that were evaluated.

{{< img src="ci/datadog_ci_gate_evaluate_logs.png" alt="Datadog-ci gate evaluate logs" style="width:100%;">}}

### Enable CI status checks

You can automatically create a status check in [GitHub][10] or [Azure DevOps][11] for each rule evaluated. The check contains additional information about the rule evaluation, such as the failure reason and the matching events in Datadog. When this feature is enabled, the evaluation results appear directly in pull requests in your CI provider.

<div class="alert alert-info"><strong>Note</strong>: Re-running a check in the CI provider does not re-run the corresponding PR Gates rule.</div>

To enable status checks:

1. Navigate to the integration tile for your CI provider:
   - [GitHub][12]
   - [Azure DevOps Source Code][13]

   If you do not have the integration installed, or you don't have an app set up within the integration (GitHub App or Microsoft Entra App), follow the [GitHub][14] or [Azure DevOps Source Code][13] integration documentation to set one up.

1. Ensure the integration has the permission required to create status checks:

   - GitHub: Grant `Checks: Write` access to the integration.
   - Azure DevOps: Grant `vso.build` and `vso.profile` access to the integration.

1. After the permission is granted, you can see the checks in the CI provider.

## Manage rules

You can edit or delete a PR Gates rule by hovering over it on the [**PR Gates Rules**][1] list and clicking the **Edit** or **Delete** icon.

{{< img src="pr_gates/setup/delete_3.png" alt="Edit, clone, or delete a PR Gates rule" style="width:100%;">}}

## Permissions

Only users with the `quality_gate_rules_write` permission can create and edit PR Gate rules. Users with the `quality_gate_rules_read` permission can view PR Gate rules.

For more information, see the [RBAC Permissions documentation][15].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/ci/pr-gates
[2]: https://github.com/DataDog/datadog-ci/blob/master/src/commands/gate/README.md
[3]: https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches
[4]: https://learn.microsoft.com/en-us/azure/devops/repos/git/pr-status-policy?view=azure-devops
[5]: https://github.com/DataDog/datadog-ci/blob/master/README.md
[6]: /pr_gates/guide/understanding_rule_scopes
[7]: https://app.datadoghq.com/organization-settings/api-keys
[8]: https://app.datadoghq.com/organization-settings/application-keys
[9]: /getting_started/site/
[10]: https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/collaborating-on-repositories-with-code-quality-features/about-status-checks
[11]: https://learn.microsoft.com/en-us/azure/devops/repos/git/pull-request-status?view=azure-devops
[12]: https://app.datadoghq.com/integrations/github
[13]: https://app.datadoghq.com/integrations/azure-devops-source-code
[14]: https://docs.datadoghq.com/integrations/github/
[15]: /account_management/rbac/permissions
