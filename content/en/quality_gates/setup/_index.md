---
title: Set up Quality Gate Rules
description: Learn how to set up Quality Gate rules in Datadog.
further_reading:
- link: "/quality_gates"
  tag: "Documentation"
  text: "Learn about Quality Gates"
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">Quality Gates is not available in the selected site ({{< region-param key="dd_site_name" >}}) at this time.</div>
{{< /site-region >}}

## Overview

To use Datadog Quality Gates, you can define one or more rules on the [**Quality Gate Rules** page][2] and integrate them in your CI pipeline with the [`datadog-ci gate evaluate` command][4].

{{< img src="quality_gates/rules_list.png" alt="Quality Gates page in Datadog" style="width:100%" >}}

Quality Gates ensures that only the code that meets your quality standards is deployed, automating your quality assurance processes and enhancing software reliability.

## Create a rule

To create a Quality Gates rule in Datadog:

1. Navigate to [**Software Delivery** > **Quality Gates** > **Quality Gate Rules**][2] and click **+ New Rule**.
1. Select a type of rule: `Test`, `Pipeline`, `Static Analysis`, or `Software Composition Analysis`.
1. Set the rule scope, which defines when the rule should be evaluated, by selecting `Always evaluate` or `Select when to evaluate`. You can add branches or repositories to include or exclude from the rule scope, or add a custom scope.

   {{< img src="quality_gates/setup/custom_scope.png" alt="Adding a custom scope to a rule scope in Quality Gates" style="width:80%;">}}

   You can create a rule that is evaluated only on specific repositories and branches. To customize the rule scope, click `Select when to evaluate` and specify the branch or repository that should be included or excluded.

   To add a custom scope (such as a team name), click **+ Add Filter** and select **Custom scope**. Enter a tag name without spaces (such as `documentation` or `team-documentation`) and click **Add Custom Scope**. Enter values that should be included or excluded. 
   
   When adding a custom scope to a rule, custom scopes must be passed to the `datadog-ci gate evaluate` command using the `--scope` option. For more information, see [Understanding Rule Scopes][13].

1. Define the rule conditions. The rule condition states in which scenario the rule fails, failing the related pipeline (if the rule is blocking). You can select one of the existing rule conditions for the rule type you have selected. If the rule scope is set to `always evaluate`, the rule is evaluated on all repositories and branches.
   
   The following example demonstrates how to create a Static Analysis rule that fails when one or more Static Analysis code vulnerability violations with `error` status are introduced in a specific commit.

   Select **Static Analysis** for the rule type and click `Always evaluate` for the rule scope. 

   {{< img src="quality_gates/explorer/static_analysis_rule.png" alt="A Static Analysis rule that fails when any code vulnerability violations with an error status are introduced in any service" style="width:100%" >}}

   In the **Define rule conditions** section, click **New** and select `code vulnerabilities violations` from the dropdown menu. Then, select the `error` status type, select `above or equal to`, and enter the value of `1`. 

1. Select whether the rule should block the pipeline when it fails. Non-blocking rules are helpful when you roll out a new rule and want to verify its behavior before making it blocking.
1. Select the time window over which the query is evaluated.
1. Specify a rule name that describes the rule that you are creating.
1. Integrate Quality Gates into your build configuration by including the [`datadog-ci gate evaluate` command](#integrate-quality-gates-in-your-cicd-pipeline). 
1. Click **Create Rule**.

### Integrate Quality Gates in your CI/CD pipeline

Invoke the Quality Gates evaluation by calling the [`datadog-ci gate evaluate`][4] command. Quality Gates requires [`datadog-ci`][7] version `2.27.0` or later.

<div class="alert alert-info">For the command to work properly, ensure that events (tests, pipelines, static analysis, and software composition analysis violations) are sent to Datadog <strong>before</strong> the <code>datadog-ci gate evaluate</code> command executes. Otherwise, the rules may demonstrate incorrect behavior due to the absence of these events.
</div>

This command:

1. Retrieves all the rules that have [rule scopes and custom scopes][13] that match the current pipeline context (the repository, branch, or custom scope(s) passed in the command).
2. Evaluates all the matching rules.
3. Fails if one or more blocking rules fail, blocking the pipeline.

| Environment Variables | Description |
|---|---|
| `DD_API_KEY` | Point to your [Datadog API key][5]. |
| `DD_APP_KEY` | Point to your [Datadog application key][6]. |
| `DD_SITE` | (Optional) Point to a specific [Datadog site][12] (default value is {{< region-param key="dd_site" code="true" >}}). |

For example:

```shell
DD_SITE={{< region-param key="dd_site" >}} DD_API_KEY=API_KEY DD_APP_KEY=APP_KEY datadog-ci gate evaluate
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
: Skips the default time that the command waits for the events (for example, tests, static analysis violations) to arrive to Datadog. The default wait time makes sure that the events are queryable in Datadog before the rules are executed, avoiding incorrect evaluations. If, in your pipeline, the job containing the `datadog-ci gate evaluate` command is called several minutes after the related events are sent to Datadog, you can opt to skip this waiting time by specifying the `--no-wait` flag. However, if used incorrectly, this flag may result in inaccurate rule evaluations.

Add [custom scopes][13] to the command by using the `--scope` option one or more times:

```shell
datadog-ci gate evaluate --scope team:backend --scope team:frontend
```

Check the command logs to see the overall gate evaluation status and information about the rules that were evaluated.

{{< img src="ci/datadog_ci_gate_evaluate_logs.png" alt="Datadog-ci gate evaluate logs" style="width:100%;">}}

## Manage rules

You can edit and delete Quality Gates rules by hovering over a rule on the [**Quality Gates Rules** page][2]. 

{{< img src="quality_gates/setup/delete.png" alt="Edit, clone, or delete a Quality Gates rule" style="width:100%;">}}

Alternatively, click on a rule from the list and click the **Edit**, **Clone**, or **Delete** icons.

{{< img src="quality_gates/setup/edit_clone.png" alt="Edit, clone, or delete a Quality Gates rule" style="width:100%;">}}

## Enable GitHub check creation

You can automatically create a [GitHub check][9] for each rule evaluated. The check contains additional information about the rule evaluation, such as the failure reason and the matching events in Datadog. When this feature is enabled, the evaluation results appear directly in GitHub.

To enable GitHub Checks:

1. Navigate to the [GitHub integration tile][10]. If you do not have this integration set up, or you don't have a GitHub app within the integration, follow [the GitHub integration documentation][11] to set one up.
2. Grant `Checks: Write` access to the GitHub application.

After the permission is granted, you can see the checks in GitHub.

**Note**: Re-running a check does not re-run the corresponding Quality Gates rule.

## Permissions

Only users with the `quality_gate_rules_write` permission can create and edit Quality Gate rules. Users with the `quality_gate_rules_read` permission can view Quality Gate rules.

For more information, see the [RBAC Permissions documentation][1].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /account_management/rbac/permissions
[2]: https://app.datadoghq.com/ci/quality-gates
[3]: /account_management/audit_trail/events/#ci-visibility-events
[4]: https://github.com/DataDog/datadog-ci/blob/master/src/commands/gate/README.md
[5]: https://app.datadoghq.com/organization-settings/api-keys
[6]: https://app.datadoghq.com/organization-settings/application-keys
[7]: https://github.com/DataDog/datadog-ci/blob/master/README.md
[8]: /continuous_integration/guides/flaky_test_management/
[9]: https://docs.github.com/en/rest/checks
[10]: https://app.datadoghq.com/integrations/github
[11]: https://docs.datadoghq.com/integrations/github/
[12]: /getting_started/site/
[13]: /quality_gates/guide/understanding_rule_scopes