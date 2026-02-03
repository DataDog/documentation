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

## Overview

To use Datadog PR Gates, you can define one or more rules on the [**PR Gate Rules**][1] page.

{{< img src="pr_gates/rules_list_3.png" alt="PR Gates page in Datadog" style="width:100%" >}}

PR Gates ensure that only the code changes that meet your security and quality standards is merged.

## Create a rule

To create a PR Gates rule in Datadog:

1. Navigate to [**Software Delivery** > **PR Gates** > **PR Gate Rules**][1] and click **New Rule**.

1. Under **Select your source**, select a rule type:
   - Static Code Analysis (SAST)
   - Software Composition Analysis (SCA)
   - Code Coverage
   - Infrastructure as Code Scanning (IaC)
   - New Flaky Tests

1. Under **Define condition**, set the conditions that will cause the rule to fail. Each rule type has its own condition options, and you can use the existing default condition settings when you select a rule type.

1. Under **Define scope**, set which repositories the rule should evaluate:
   - **All repositories**: The rule evaluates all repositories configured for the rule type.
   - **Selected repositories**: The rule evaluates only the repositories you specify. Use `IN` to include only specified repositories, or `NOT IN` to evaluate all configured repositories _except_ the ones you specify.

   The following example illustrates a Static Code Analysis (SAST) rule that fails when a pull request introduces at least one Static Code Analysis code vulnerability violation with at least `Critical` severity. The rule evaluates all repositories configured for Static Code Analysis:

   {{< img src="pr_gates/setup/static_analysis_3.png" alt="A Static Code Analysis rule that runs on all repos and fails when a PR has at least one Static Code Analysis code vulnerability with at least `Critical` severity" style="width:100%" >}}

1. Under **Preview checks**, select your source code management provider to preview the status check to be added to pull requests. To set the check so it blocks PRs when it fails, follow your provider's instructions for making a status check _required_:

   - [GitHub][2]
   - [Azure DevOps][3]

   Non-blocking rules can be helpful when you roll out a new rule and want to verify its behavior before making it blocking.

1. Click **Create Rule**.

1. It is recommended that you test your PR Gate rule by creating a new branch and PR that purposely introduces code changes that would violate the rule's condition. Please note that PR Gates will not:
   - Retroactively block existing PRs unless new commits are pushed to them after the PR Gate rule has been created
   - Block new PRs that don't introduce violations as part of their modified lines

### Manage PR checks

PR Gates automatically create PR checks in [GitHub][4] or [Azure DevOps][5] pull requests for each rule type evaluated. The check contains additional information about the rule evaluation, such as the failure reason and the matching events in Datadog.

<div class="alert alert-info"><strong>Note</strong>: Re-running a check in the pull request UI does not re-run the corresponding PR Gates rule.</div>

To ensure PR Gates are able to create PR checks, you must install the integration for your SCM provider. If you do not have the integration installed, follow the [GitHub][6] or [Azure DevOps Source Code][7] integration documentation to set one up.

To make these checks blocking, they must be set as required in the branch policies of your source code management provider:

- [GitHub][2]
- [Azure DevOps][3]

## Manage rules

You can edit or delete a PR Gates rule by hovering over it on the [**PR Gates Rules**][1] list and clicking the **Edit** or **Delete** icon.

{{< img src="pr_gates/setup/delete_3.png" alt="Edit, clone, or delete a PR Gates rule" style="width:100%;">}}

## Permissions

Only users with the `quality_gate_rules_write` permission can create and edit PR Gate rules. Users with the `quality_gate_rules_read` permission can view PR Gate rules.

For more information, see the [RBAC Permissions documentation][8].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/ci/pr-gates
[2]: https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches
[3]: https://learn.microsoft.com/en-us/azure/devops/repos/git/pr-status-policy?view=azure-devops
[4]: https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/collaborating-on-repositories-with-code-quality-features/about-status-checks
[5]: https://learn.microsoft.com/en-us/azure/devops/repos/git/pull-request-status?view=azure-devops
[6]: /integrations/github/
[7]: /integrations/azure-devops-source-code/
[8]: /account_management/rbac/permissions
