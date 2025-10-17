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

{{< callout url="#" btn_hidden="true" header="Join the Preview!" >}}
PR Gates are in Preview.
{{< /callout >}}

## Overview

To use Datadog PR Gates, you can define one or more rules on the [**PR Gate Rules**][1] page.

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

### Manage PR checks

PR Gates automatically create PR checks in [GitHub][10] or [Azure DevOps][11] pull requests for each rule type evaluated. The check contains additional information about the rule evaluation, such as the failure reason and the matching events in Datadog.

<div class="alert alert-info"><strong>Note</strong>: Re-running a check in the pull request UI does not re-run the corresponding PR Gates rule.</div>

To ensure PR Gates are able to create PR checks, you must install the integration for your SCM provider. If you do not have the integration installed, follow the [GitHub][14] or [Azure DevOps Source Code][13] integration documentation to set one up.

## Manage rules

You can edit or delete a PR Gates rule by hovering over it on the [**PR Gates Rules**][1] list and clicking the **Edit** or **Delete** icon.

{{< img src="pr_gates/setup/delete_3.png" alt="Edit, clone, or delete a PR Gates rule" style="width:100%;">}}

## Permissions

Only users with the `quality_gate_rules_write` permission can create and edit PR Gate rules. Users with the `quality_gate_rules_read` permission can view PR Gate rules.

For more information, see the [RBAC Permissions documentation][15].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/ci/pr-gates
[2]: https://github.com/DataDog/datadog-ci/blob/master/packages/datadog-ci/src/commands/gate/README.md
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
[14]: /integrations/github/
[15]: /account_management/rbac/permissions
