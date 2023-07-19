---
title: Quality Gates
kind: documentation
description: Learn how to use Quality Gates in your pipeline.
is_beta: true
further_reading:
- link: "/continuous_integration/tests"
  tag: "Documentation"
  text: "Learn about Test Visibility"
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">CI Visibility is not available in the selected site ({{< region-param key="dd_site_name" >}}) at this time.</div>
{{< /site-region >}}

{{< callout url="#" header="false" >}}
Quality Gates are in beta.
{{< /callout >}}

Quality Gates allows you to gate your workflows based on signals in Datadog.  You can create two types of rules types: Static Analysis and Tests.
For example, you can block code from being merged if it introduces new [flaky tests][8], even if the tests are passing.

Using Quality Gates, you have control over what is merged into the default branch, and ultimately on what is deployed.
This allows you to ensure that the code running in production is meeting high quality standards, reducing incidents and unwanted behaviors.

## Set up Quality Gates

There are two main steps required to set up Quality Gates:
1. Create one or more rules.
2. Add the `datadog-ci gate evaluate` command in your CI pipeline.

## Create a rule

To create Quality Gates rules for your organization, your user account must have the `quality_gate_rules_write` [permission][1].

1. In Datadog, navigate to [**CI** > **Quality Gate Rules**][2] and click **+ New Rule**.
2. Select the rule type. You can choose between `Static Analysis` and `Test`.
3. Define the rule scope. The rule scope defines when the rule should be evaluated. For example, you can create a rule that it is evaluated only on specific repositories and branches. To define the scope for a rule, switch to `select when to evaluate` and add included or excluded values for the scope. More information on [rule scopes](#rule-scope).
4. Define the rule condition. The rule condition states in which scenario the rule fails, failing the related pipeline (if the rule is blocking). You can select one of the existing rule conditions for the rule type you have selected.

   The following example shows how to create a static analysis rule that will fail when there are one or more static analysis violations with "error" status and "security" category being introduced in a specific commit:

   {{< img src="ci/qg_rule_condition_sa_errors_security.png" alt="Rule for static analysis security errors" style="width:80%;">}}

5. Select whether the rule should block the pipeline or not when it fails. Non-blocking rules are still evaluated, but
they do not block the pipeline when they fail.
6. Select a rule name that describes the rule that you are creating.
7. Click **Save Rule**.

A rule starts being evaluated as soon as it is created.

## Datadog-ci gate evaluate

To use quality gates, [`datadog-ci`][7] version should be higher or equal than `2.16.0`.

You can invoke the Quality Gates evaluation by calling the [`datadog-ci gate evaluate`][4] command.

This command:

1. Retrieves all the rules that have [rules scopes](#rule-scope) and [custom scopes](#custom-scope) matching the current pipeline context (repository, branch, or custom scope passed in the command).
2. Evaluates all the matching rules.
3. If one or more blocking rules fail, the command fails as well, blocking the pipeline.

<div class="alert alert-danger"><strong>Note:</strong> for the command to work properly, it's important that the events (tests, static analysis violations)
are sent to Datadog <strong>before</strong> the <code>datadog-ci gate evaluate</code> command is executed.
Otherwise, the rules might have an incorrect behavior due to the absence of the events.
</div>

The command requires the `DATADOG_API_KEY` and `DATADOG_APP_KEY` environment variables to point to your [Datadog API Key][5]
and [Datadog Application Key][6]. Also, you need to set the `DD_BETA_COMMANDS_ENABLED` environment
variable as `true`. Optionally, you can specify the `DATADOG_SITE` environment variable to point to a specific datadog site.
The default site is US1 (datadoghq.com).

{{< code-block lang="shell" >}}
DD_BETA_COMMANDS_ENABLED=true DATADOG_API_KEY=<API_KEY> DATADOG_APP_KEY=<APP_KEY> datadog-ci gate evaluate
{{< /code-block >}}

The behavior of the command can be modified using the following flags:
- **--fail-on-empty**: when this flag is specified, the command fails if no matching rules were found in Datadog
based on the current command scope. By default, the command succeeds.
- **--fail-if-unavailable**: when this flag is specified, the command fails if one or more rules could not be evaluated because of an internal issue.
By default, the command succeeds.
- **--no-wait**: by default, the command waits a certain amount of time for the events (tests, static analysis violations) to arrive to Datadog.
This step is important as it makes sure that the events are queryable in Datadog before the rules are executed,
avoiding incorrect evaluation. If, in your pipeline, the job containing the `datadog-ci gate evaluate` command is
called several minutes after the related events are sent to Datadog, you could skip this waiting time by specifying the `--no-wait` flag.
Note that, if used incorrectly, this flag might result in inaccurate rule evaluations.

[Custom scopes](#custom-scope) can be added by using the following option one or more times: **--scope**:

{{< code-block lang="shell" >}}
datadog-ci gate evaluate --scope team:backend --scope team:frontend
{{< /code-block >}}

The command logs can be examined to understand what was the overall gate evaluation status, along with information
about all the rules that were evaluated.

{{< img src="ci/datadog_ci_gate_evaluate_logs.png" alt="Datadog-ci gate evaluate logs" style="width:90%;">}}

## Rule scope

When creating a rule, you can define a scope, which states when the rule should be evaluated. 
The rules, which have a matching scope to the context of the `datadog-ci gate evaluate` command, are evaluated. 

For each scope (for example, `branch`), you can either select included or excluded values.
When included values are selected, the rule is evaluated if one or more included values are part of the command context.
When excluded values are selected, the rule is evaluated if the excluded values are not part of the command context.

For example, to create a rule that is evaluated in all branches but `main` of the `example-repository` repository, you can define the following scope:

{{< img src="ci/scope_not_main_example_repository.png" alt="Rule scope for example-repository and not main branch" style="width:90%;">}}

If a rule does not contain a scope, it is evaluated for all values for that scope.
For example, if a rule does not contain the `repository` scope, it is evaluated for all repositories. If the rule scope is
set to `always evaluate`, the rule is evaluated on all repositories and branches.

{{< img src="ci/rule_scope_always_evaluate.png" alt="Rule scope for rules always evaluated" style="width:90%;">}}

### Custom scope

In addition to branch and repository, you can define a custom scope to filter rules that are evaluated for a specific CI pipeline.

To add a custom scope when creating a rule:

1. Click **+ Add Filter** and select **Custom Scope**.
2. Define the scope name, for example, `team`.
3. Define the scope's included or excluded values.

Unliked the `branch` and `repository` scopes, custom scopes need to be provided in the `datadog-ci gate evaluate` command using the **--scope** option.
For example, you can create a rule that is evaluated for the `example-repository` repository, but only when the team is `backend`:

{{< img src="ci/rule_scope_example_repository_team_backend.png" alt="Rule scope for example-repository and team backend" style="width:90%;">}}

The rule would be evaluated when this command is invoked in a CI pipeline of the `example-repository` repository:
- `datadog-ci gate evaluate --scope team:backend`

The rule would **not** be evaluated when the following commands are invoked instead:
- `datadog-ci gate evaluate`, as it does not define any team.
- `datadog-ci gate evaluate --scope team:api --scope team:frontend`, as it defines teams different from `backend`.

## Manage rules

To edit a Quality Gate rule, click the **Edit** icon to the right of the **Creator** avatar on the [Quality Gate Rules page][2].

{{< img src="ci/edit_quality_gate_rule.png" alt="Edit a Quality Gates rule" style="width:90%;">}}

To delete a Quality Gate rule, click the **Delete** icon next to the **Edit** button on the [Quality Gate Rules page][2]. Alternatively, you can edit the rule and click **Delete Rule**.

{{< img src="ci/delete_quality_gate_rule.png" alt="Delete a Quality Gates rule" style="width:90%;">}}

## Permissions

The [`quality_gate_rules_write` permission][1] is required to create and edit Quality Gate rules.
The [`quality_gate_rules_read` permission][1] is required to view Quality Gate rules.

## Track changes in rules

You can view information about who created, modified, and deleted Quality Gates rules in [Audit Trail][3].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /account_management/rbac/permissions
[2]: https://app.datadoghq.com/ci/quality-gates
[3]: https://app.datadoghq.com/audit-trail
[4]: https://github.com/DataDog/datadog-ci/blob/master/src/commands/gate/README.md
[5]: https://app.datadoghq.com/organization-settings/api-keys
[6]: https://app.datadoghq.com/organization-settings/application-keys
[7]: https://github.com/DataDog/datadog-ci/blob/master/README.md
[8]: https://docs.datadoghq.com/continuous_integration/guides/flaky_test_management/
