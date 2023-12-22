---
title: Setup Quality Gate Rules
description: Learn how to setup Quality Gate rules in Datadog.
further_reading:
- link: "/quality_gates"
  tag: "Documentation"
  text: "Learn about Quality Gates"
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">Quality Gates is not available in the selected site ({{< region-param key="dd_site_name" >}}) at this time.</div>
{{< /site-region >}}

{{< callout url="#" btn_hidden="true" >}}
Quality Gates is in public beta.
{{< /callout >}}

## Overview

Generally, to set up Quality Gates:
1. Create one or more rules on the Datadog site.
2. Invoke Quality Gates by using the `datadog-ci gate evaluate` command in your CI pipeline.

## Create a rule

To create Quality Gates rules for your organization, your user account must have the `quality_gate_rules_write` [permission][1].

1. In Datadog, navigate to [**CI** > **Quality Gate Rules**][2] and click **+ New Rule**.
2. Define the rule scope. The rule scope defines when the rule should be evaluated. For example, you can create a rule that it is evaluated only on specific repositories and branches. To define the scope for a rule, switch to `select when to evaluate` and add included or excluded values for the scope. See [rule scopes](#rule-scope) for more information.
3. Select the rule type. You can choose between `Static Analysis` and `Test`.
4. Define the rule condition. The rule condition states in which scenario the rule fails, failing the related pipeline (if the rule is blocking). You can select one of the existing rule conditions for the rule type you have selected.

The following example shows how to create a static analysis rule that fails when there are one or more static analysis violations with "error" status and "security" category being introduced in a specific commit:

   {{< img src="ci/qg_rule_condition_sa_errors_security_2.png" alt="Rule for static analysis security errors" style="width:80%;">}}

5. Select whether the rule should block the pipeline when it fails.
   Non-blocking rules are helpful when you roll out a new rule and want to verify its behavior before making it blocking.
6. Select the time window over which the query is evaluated.
7. Specify a rule name that describes the rule that you are creating.
8. Click **Save Rule**.


## Invoking quality gates

Quality Gates, requires [`datadog-ci`][7] version `2.27.0` or later.

Invoke the Quality Gates evaluation by calling the [`datadog-ci gate evaluate`][4] command.

This command:

1. Retrieves all the rules that have [rule scopes](#rule-scope) and [custom scopes](#custom-scope) that match the current pipeline context (repository, branch, or custom scope passed in the command).
2. Evaluates all the matching rules.
3. Fails if one or more blocking rules fail, thereby blocking the pipeline.

<div class="alert alert-danger">For the command to work properly, it's important that the events (tests, static analysis violations)
are sent to Datadog <strong>before</strong> the <code>datadog-ci gate evaluate</code> command is executed.
Otherwise, the rules might have an incorrect behavior due to the absence of the events.
</div>

| Environment Variables | Description |
|---|---|
| `DD_API_KEY` | Point to your [Datadog API key][5]. |
| `DD_APP_KEY` | Point to your [Datadog application key][6]. |
| `DD_SITE` | (Optional) Point to a specific [Datadog site][12] (default value is `datadoghq.com`). |

For example:

```shell
DD_SITE={{< region-param key="dd_site" >}} DD_API_KEY=API_KEY DD_APP_KEY=APP_KEY datadog-ci gate evaluate
```

Configure the behavior of the `datadog-ci gate evaluate` command using the following flags:

- `--fail-on-empty`: The command fails if no matching rules are found.
based on the current pipeline context. By default, the command succeeds.
- `--fail-if-unavailable`: The command fails if one or more rules cannot be evaluated because of an internal issue.
By default, the command succeeds.
- `--timeout`: The command stops its execution after the specified timeout in seconds. The default timeout is 10 minutes.
The command typically completes within a few minutes, but it could take longer.
- `--no-wait`: Skips the default time that the command waits for the events (e.g. tests, static analysis violations) to arrive to Datadog. The default wait time makes sure that the events are queryable in Datadog before the rules are executed, avoiding incorrect evaluations. If, in your pipeline, the job containing the `datadog-ci gate evaluate` command is called several minutes after the related events are sent to Datadog, you can opt to skip this waiting time by specifying the `--no-wait` flag. However, if used incorrectly, this flag may result in inaccurate rule evaluations.

Add [custom scopes](#custom-scope) to the command by using the `--scope` option one or more times:

```shell
datadog-ci gate evaluate --scope team:backend --scope team:frontend
```

Check the command logs to see the overall gate evaluation status and information about the rules that were evaluated.

{{< img src="ci/datadog_ci_gate_evaluate_logs.png" alt="Datadog-ci gate evaluate logs" style="width:90%;">}}

## Rule scope
Quality Gates allows you to gate your workflows based on signals in Datadog. You can create two types of rules: Static Analysis and Tests. For example, you can block code from being merged if it introduces new [flaky tests][1], code security violations, or other issues that wouldn't normally fail your CI/CD pipelines and end up deployed to production.

When creating a rule, you can define a scope, which states when the rule should be evaluated. If the rule scope is
set to `always evaluate`, the rule is evaluated on all repositories and branches.
With Quality Gates, you have control over what is merged into the default branch, and ultimately on what is deployed. This allows you to ensure that the code running in production is meeting high quality standards, reducing incidents, and minimizing unwanted behaviors.

{{< img src="ci/rule_scope_always_evaluate.png" alt="Rule scope for rules always evaluated" style="width:90%;">}}


When the `datadog-ci gate evaluate` command is invoked, the rules having a scope matching the command context are evaluated.

For each scope (for example, `branch`), you can select included or excluded values.
When included values are selected, the rule is evaluated if one or more included values are part of the command context.

When excluded values are selected, the rule is not evaluated if any of the excluded values are part of the command context.

## Create rules

For example, to create a rule that is evaluated in all branches except `main` of the `example-repository` repository, define the following scope:

{{< img src="ci/scope_not_main_example_repository.png" alt="Rule scope for example-repository and not main branch" style="width:90%;">}}

If a rule does not contain a scope, it is evaluated for all values for that scope.
For example, if a rule does not contain the `repository` scope, it is evaluated for all repositories.

### Custom scope

In addition to branch and repository, you can define custom scopes to filter rules that are evaluated for a specific CI pipeline.

To add a custom scope when creating a rule:

1. Click **+ Add Filter** and select **Custom Scope**.
2. Define the scope name, for example, `team`.
3. Define the scope's included or excluded values.

Unlike the `branch` and `repository` scopes, custom scopes must be passed to the `datadog-ci gate evaluate` command using the `--scope` option.
For example, you can create a rule that is evaluated for the `example-repository` repository, but only when the team is `backend`:

{{< img src="ci/rule_scope_example_repository_team_backend.png" alt="Rule scope for example-repository and team backend" style="width:90%;">}}

The rule is evaluated when the following command is invoked in a CI pipeline of the `example-repository` repository:
- `datadog-ci gate evaluate --scope team:backend`

The rule is **not** evaluated when the following commands are invoked instead:
- `datadog-ci gate evaluate`, which does not specify any team.
- `datadog-ci gate evaluate --scope team:api --scope team:frontend`, which specifies teams other than `backend`.

## Manage rules

To edit a Quality Gates rule, click the **Edit** icon to the right of the **Creator** avatar on the [Quality Gates Rules page][2].

{{< img src="ci/edit_quality_gate_rule.png" alt="Edit a Quality Gates rule" style="width:90%;">}}

To delete a Quality Gates rule, click the **Delete** icon next to the **Edit** button on the [Quality Gates Rules page][2]. Alternatively, you can edit the rule and click **Delete Rule**.

{{< img src="ci/delete_quality_gate_rule.png" alt="Delete a Quality Gates rule" style="width:90%;">}}

## Enable GitHub check creation

You can automatically create a [GitHub check][9] for each rule evaluated. When this feature is enabled, the evaluation results appear directly in GitHub.
The check contains additional information about the rule evaluation, such as the failure reason and the matching events in Datadog.

To enable GitHub Checks:
1. Go to the [GitHub integration tile][10]. If you do not have this integration set up, or you don't have a GitHub app within the integration, follow [the GitHub integration documentation][11] to set one up.
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
