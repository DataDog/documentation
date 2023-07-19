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

## Overview

{{< callout url="#" header="false" >}}
Quality Gates Rules are in beta.
{{< /callout >}}

Quality Gates allows you to gate your workflows based on signals in Datadog.
For example, you can block a Pull Request from being merged if it introduces new flaky tests, even if the tests are passing.

Using Quality Gates, you have control over what is merged into the default branch, and ultimately on what is deployed. ([AM] ADD SENTENCE)

## Set up Quality Gates

There are two main steps required to set up Quality Gates:
1. Create one or more rules.
2. Add the `datadog-ci gate evaluate` command in your CI pipeline.

## Create a rule

To create Quality Gates rules for your organization, your user account must have the `quality_gate_rules_write` [permission][1].

1. In Datadog, navigate to [**CI** > **Quality Gate Rules**][2] and click **+ New Rule**.
2. Select the rule type. You can choose between `Static Analysis` and `Test`.
3. Define the rule scope. The rule scope defines when the rules should be evaluated. For example, you can scope a rule so that it is evaluated only on specific repositories and branches. To define the scope for a rule, switch to `select when to evaluate` and add included or excluded values for the scope name. More information on rule scopes ([AM] ADD LINK TO SECTION BELOW).
4. Define the rule condition. The rule condition states in which scenario the rule fails, failing the related pipeline as well. You can select one of the existing rule conditions for the rule type you have selected.

   The following example shows how to create a static analysis rule that will fail when there are one or more static analysis violations with "error" severity and "security" category being introduced in a specific commit:
   
   {{< img src="ci/qg_rule_condition_sa_errors_security.png" alt="Rule for static analysis security errors" style="width:80%;">}}

5. Select whether the rule should block the pipeline or not when it fails. Non-blocking rules are still evaluated, but
they do not block the pipeline when they fail.
6. Select a rule name that describes the rule that you are creating.
7. Click **Save Rule**.

A rule starts being evaluated as soon as it is created.

## Datadog-ci gate evaluate

Quality Gates evaluation is invoked by calling the [`datadog-ci gate evaluate`][4] command. This command:
1. Retrieves all the impacted rules based on the current pipeline context (branch, repository).
The rules that are retrieved vary based on the pipeline context, the rules scopes and eventual custom scopes (more info in the rule scope section) ([AM] ADD LINK TO SECTION BELOW).
2. Evaluates all the impacted rules.
3. If one or more blocking rules fail, the command fails as well, blocking the pipeline.

<div class="alert alert-danger"><strong>Note:</strong> for the command to work properly, it's important that the events (tests, static analysis violations)
are sent to Datadog **before** the <code>datadog-ci gate evaluate</code> command is executed.
Otherwise, the rules might have an incorrect behavior due to the absence of the events.
</div>

The command requires the `DATADOG_API_KEY` and `DATADOG_APP_KEY` environment variables to point to your [Datadog API Key][5]
and [Datadog Application Key][6]. Also, you need to define the `DD_BETA_COMMANDS_ENABLED` environment
variable as `true`. Optionally, you can specify the `DATADOG_SITE` environment variable to point to a specific datadog site.
The default site is US1 (datadoghq.com).

{{< code-block lang="shell" >}}
DD_BETA_COMMANDS_ENABLED=true DATADOG_API_KEY=<API_KEY> DATADOG_APP_KEY=<APP_KEY> datadog-ci gate evaluate
{{< /code-block >}}

The behavior of the command can be modified using the following flags:
- **--fail-on-empty**: when this flag is specified, the command fails if no matching rules were found in Datadog
based on the current command scope. By default, the command succeeds.
- **--fail-if-unavailable**: when this flag is specified, the command fails if one or more rules could not be evaluated.
By default, the command succeeds.
- **--no-wait**: by default, the command waits 30 seconds for the events (tests, static analysis violations) to arrive to Datadog.
This step is important as it makes sure that the events are queryable in Datadog before the rules are executed,
avoiding incorrect evaluation. If, in your pipeline, the job containing the `datadog-ci gate evaluate` command is
called several minutes after the related events are sent to Datadog, you could skip this waiting time by specifying the `--no-wait` flag.
Note that, if used incorrectly, this flag might result in inaccurate rule evaluations.

Custom scopes ([AM] ADD LINK TO SECTION BELOW) can be added by using the following option one or more times: **--scope**:

{{< code-block lang="shell" >}}
datadog-ci gate evaluate --scope team:backend --scope team:frontend
{{< /code-block >}}

The command logs can be examined to understand what was the overall gate evaluation status, along with information
about all the rules that were evaluated.

{{< img src="ci/datadog_ci_gate_evaluate_logs.png" alt="Datadog-ci gate evaluate logs" style="width:90%;">}}

## Rule scope

When creating a rule, you can define its scope, which states when it should be evaluated.
The rule scope is then checked based on the context passed by the `datadog-ci gate evaluate` command to understand whether the rule should be evaluated or not.

For each scope name (for example, "branch"), you can either select included or excluded values.
When included values are selected, the rule is evaluated if one or more included values are passed as part of the command context.
When excluded values are selected, the rule is evaluated if none of the excluded values are passed as part of the command context.

For example, to create a rule that is evaluated in all branches but `main` of the `example-repository`, you can define the following scope:

{{< img src="ci/scope_not_main_example_repository.png" alt="Rule scope for example-repository and not main branch" style="width:90%;">}}

If a rule does not contain a scope name, it is evaluated for all values of that scope name.
For example, if a rule does not contain the `repository` scope, it is evaluated for all repositories. If the rule scope is
set to `always evaluate`, the rule is evaluated on all repositories and branches.

{{< img src="ci/rule_scope_always_evaluate.png" alt="Rule scope for rules always evaluated" style="width:90%;">}}

### Custom scope

In addition to branch and repository, you can define custom scope names to further filter rules that are evaluated for a specific CI pipeline.

Custom scopes can be added when creating a rule in the following way:
1. Click on **+ Add Filter** and select **Custom Scope**
2. Define the scope name, for example, `team`.
3. Define the scope included or excluded values. This follows the same logic ([AM] ADD LINK TO SECTION ABOVE) defined for branch and repository.

Differently from "branch" and "repository" scopes, custom scopes need to be provided in the `datadog-ci gate evaluate` command using the **--scope** option.
For example, you can create a rule that is evaluated for the repository `example-repository` but only when the team is `backend`:

{{< img src="ci/rule_scope_example_repository_team_backend.png" alt="Rule scope for example-repository and team backend" style="width:90%;">}}

The rule is evaluated when this command is invoked in a CI pipeline of the `example-repository` repository:
- `datadog-ci gate evaluate --scope team:backend`

The rule is not evaluated when the following commands are invoked instead:
- `datadog-ci gate evaluate`, as it does not define any team.
- `datadog-ci gate evaluate --scope team:api --scope team:frontend`, as it defines teams different from "backend".

## Edit a rule

You can edit a Quality Gate rule by clicking on the edit icon in the [rules page][2]:

{{< img src="ci/edit_quality_gate_rule.png" alt="Edit a Quality Gates rule" style="width:90%;">}}

## Delete a rule

You can delete a Quality Gate rule by clicking on the deletion icon in the [rules page][2]:

{{< img src="ci/delete_quality_gate_rule.png" alt="Delete a Quality Gates rule" style="width:90%;">}}

## Permissions

The `quality_gate_rules_write` [permission][1] is required to create and edit Quality Gate rules.
The `quality_gate_rules_read` [permission][1] is required to view Quality Gate rules.

## Track changes in rules

You can view information about who created, modified, and deleted Quality Gates rules in [Audit Trail][3].

## Limitations during beta

There are limitations for the beta version of the Quality Gate product:
1. Currently only two rule types can be selected when creating rules: static analysis and tests.
2. There are some rare cases in which the Quality Gates result are not correct, specifically in case of internal Datadog issues.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /account_management/rbac/permissions
[2]: https://app.datadog.com/ci/quality-gates
[3]: https://app.datadoghq.com/audit-trail
[4]: https://github.com/DataDog/datadog-ci/blob/master/src/commands/gate/README.md
[5]: https://app.datadoghq.com/organization-settings/api-keys
[6]: https://app.datadoghq.com/organization-settings/application-keys
